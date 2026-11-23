-- Capture the live draft indicator server-side for every complete approved match.
-- Bot imports include their original Europe/Warsaw timestamp in notes; website submissions
-- use the database insertion timestamp. Predictions are chronological replays and explicitly
-- record that the outcome was already known when the record was ingested.

ALTER TABLE public.ss_matches ADD COLUMN played_at timestamptz;
UPDATE public.ss_matches SET played_at = created_at;

DO $$
DECLARE
  v_match public.ss_matches%rowtype;
  v_parts text[];
BEGIN
  FOR v_match IN
    SELECT * FROM public.ss_matches
    WHERE notes ~ '^AFK local import: [0-9]{8}_[0-9]{6}_(blue|red)$'
  LOOP
    v_parts := pg_catalog.regexp_match(
      v_match.notes,
      '^AFK local import: ([0-9]{4})([0-9]{2})([0-9]{2})_([0-9]{2})([0-9]{2})([0-9]{2})_(blue|red)$'
    );
    UPDATE public.ss_matches
    SET played_at = pg_catalog.make_timestamptz(
      v_parts[1]::integer, v_parts[2]::integer, v_parts[3]::integer,
      v_parts[4]::integer, v_parts[5]::integer, v_parts[6]::double precision,
      'Europe/Warsaw'
    )
    WHERE id = v_match.id;
  END LOOP;
END
$$;

ALTER TABLE public.ss_matches
  ALTER COLUMN played_at SET DEFAULT now(),
  ALTER COLUMN played_at SET NOT NULL;

CREATE OR REPLACE FUNCTION public.ss_set_match_played_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
DECLARE v_parts text[];
BEGIN
  v_parts := pg_catalog.regexp_match(
    NEW.notes,
    '^AFK local import: ([0-9]{4})([0-9]{2})([0-9]{2})_([0-9]{2})([0-9]{2})([0-9]{2})_(blue|red)$'
  );
  IF v_parts IS NOT NULL THEN
    NEW.played_at := pg_catalog.make_timestamptz(
      v_parts[1]::integer, v_parts[2]::integer, v_parts[3]::integer,
      v_parts[4]::integer, v_parts[5]::integer, v_parts[6]::double precision,
      'Europe/Warsaw'
    );
  ELSIF NEW.played_at IS NULL THEN
    NEW.played_at := COALESCE(NEW.created_at, pg_catalog.now());
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER ss_matches_set_played_at
BEFORE INSERT ON public.ss_matches
FOR EACH ROW EXECUTE FUNCTION public.ss_set_match_played_at();

CREATE TABLE public.ss_match_predictions (
  match_id uuid PRIMARY KEY REFERENCES public.ss_matches(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  theme_id text NOT NULL,
  played_at timestamptz NOT NULL,
  calculated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  model_version text NOT NULL,
  capture_mode text NOT NULL CHECK (capture_mode IN ('automatic_ingest', 'historical_replay')),
  outcome_known_at_calculation boolean NOT NULL DEFAULT true,
  winner text NOT NULL CHECK (winner IN ('BLUE', 'RED')),
  predicted_side text CHECK (predicted_side IN ('BLUE', 'RED')),
  is_correct boolean,
  score_delta numeric(12,8) NOT NULL,
  blue_score numeric(12,8) NOT NULL,
  red_score numeric(12,8) NOT NULL,
  blue_side_baseline numeric(12,8) NOT NULL,
  red_side_baseline numeric(12,8) NOT NULL,
  blue_class_synergy numeric(12,8) NOT NULL,
  red_class_synergy numeric(12,8) NOT NULL,
  approved_matches_used integer NOT NULL CHECK (approved_matches_used >= 0),
  blue_ids text[] NOT NULL CHECK (cardinality(blue_ids) = 3),
  red_ids text[] NOT NULL CHECK (cardinality(red_ids) = 3),
  payload jsonb NOT NULL
);

ALTER TABLE public.ss_match_predictions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.ss_match_predictions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.ss_match_predictions TO service_role;

CREATE OR REPLACE FUNCTION public.ss_calculate_draft_indicator(p_match_id uuid)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO ''
AS $function$
WITH target AS (
  SELECT m.id, m.event_id, m.theme_id, m.played_at, m.created_at
  FROM public.ss_matches m
  WHERE m.id = p_match_id AND m.status = 'approved'
),
history_matches AS (
  SELECT m.id, m.winner
  FROM public.ss_matches m
  JOIN target t ON t.event_id = m.event_id
  WHERE m.status = 'approved'
    AND m.id <> t.id
    AND (
      m.played_at < t.played_at
      OR (m.played_at = t.played_at AND
          (m.created_at < t.created_at OR (m.created_at = t.created_at AND m.id < t.id)))
    )
),
entries AS (
  SELECT hm.id AS match_id, mh.side, mh.pick_order, mh.hero_id, (hm.winner = mh.side) AS won
  FROM history_matches hm
  JOIN public.ss_match_heroes mh ON mh.match_id = hm.id
),
summary AS (
  SELECT count(*)::integer AS matches,
         count(*) FILTER (WHERE winner = 'BLUE')::integer AS blue_wins,
         count(*) FILTER (WHERE winner = 'RED')::integer AS red_wins
  FROM history_matches
),
base_rates AS (
  SELECT matches, blue_wins, red_wins,
         CASE WHEN matches = 0 THEN 0.5::numeric ELSE blue_wins::numeric / matches END AS blue_rate,
         CASE WHEN matches = 0 THEN 0.5::numeric ELSE red_wins::numeric / matches END AS red_rate
  FROM summary
),
hero_stats AS (
  SELECT hero_id, count(*)::numeric AS appearances,
         count(*) FILTER (WHERE won)::numeric AS wins
  FROM entries GROUP BY hero_id
),
side_stats AS (
  SELECT hero_id,
    count(*) FILTER (WHERE side = 'BLUE')::numeric AS blue_n,
    count(*) FILTER (WHERE side = 'BLUE' AND won)::numeric AS blue_w,
    count(*) FILTER (WHERE side = 'RED')::numeric AS red_n,
    count(*) FILTER (WHERE side = 'RED' AND won)::numeric AS red_w
  FROM entries GROUP BY hero_id
),
first_stats AS (
  SELECT hero_id,
    count(*) FILTER (WHERE side = 'BLUE' AND pick_order = 1)::numeric AS blue_n,
    count(*) FILTER (WHERE side = 'BLUE' AND pick_order = 1 AND won)::numeric AS blue_w,
    count(*) FILTER (WHERE side = 'RED' AND pick_order = 1)::numeric AS red_n,
    count(*) FILTER (WHERE side = 'RED' AND pick_order = 1 AND won)::numeric AS red_w
  FROM entries GROUP BY hero_id
),
duo_stats AS (
  SELECT a.hero_id AS hero_1_id, b.hero_id AS hero_2_id,
         count(*)::numeric AS appearances,
         count(*) FILTER (WHERE a.won)::numeric AS wins
  FROM entries a
  JOIN entries b ON b.match_id = a.match_id AND b.side = a.side AND a.hero_id < b.hero_id
  GROUP BY a.hero_id, b.hero_id
),
duo_context AS (
  SELECT ds.hero_1_id, ds.hero_2_id, ds.appearances, ds.wins,
         h1.class AS class_1, h2.class AS class_2,
         ds.wins - ds.appearances * greatest(
           0.05::numeric,
           least(0.95::numeric,
             0.5::numeric
             + ((COALESCE(h1s.wins, 0) + 5) / (COALESCE(h1s.appearances, 0) + 10) - 0.5)
             + ((COALESCE(h2s.wins, 0) / 1 + 5) / (COALESCE(h2s.appearances, 0) + 10) - 0.5)
           )
         ) AS residual
  FROM duo_stats ds
  JOIN public.ss_heroes h1 ON h1.id = ds.hero_1_id
  JOIN public.ss_heroes h2 ON h2.id = ds.hero_2_id
  LEFT JOIN hero_stats h1s ON h1s.hero_id = ds.hero_1_id
  LEFT JOIN hero_stats h2s ON h2s.hero_id = ds.hero_2_id
),
partner_group_rows AS (
  SELECT hero_1_id AS hero_id, class_2 AS partner_class, appearances, residual FROM duo_context
  UNION ALL
  SELECT hero_2_id AS hero_id, class_1 AS partner_class, appearances, residual FROM duo_context
),
partner_groups AS (
  SELECT hero_id, partner_class, sum(appearances) AS appearances, sum(residual) AS residual
  FROM partner_group_rows GROUP BY hero_id, partner_class
),
target_picks AS (
  SELECT mh.side, mh.pick_order, mh.hero_id, h.class
  FROM target t
  JOIN public.ss_match_heroes mh ON mh.match_id = t.id
  JOIN public.ss_heroes h ON h.id = mh.hero_id
),
pick_values AS (
  SELECT tp.side, tp.pick_order,
    CASE WHEN tp.side = 'BLUE'
      THEN CASE WHEN tp.pick_order = 1 THEN COALESCE(fs.blue_n, 0) ELSE COALESCE(ss.blue_n, 0) - COALESCE(fs.blue_n, 0) END
      ELSE CASE WHEN tp.pick_order = 1 THEN COALESCE(fs.red_n, 0) ELSE COALESCE(ss.red_n, 0) - COALESCE(fs.red_n, 0) END
    END AS appearances,
    CASE WHEN tp.side = 'BLUE'
      THEN CASE WHEN tp.pick_order = 1 THEN COALESCE(fs.blue_w, 0) ELSE COALESCE(ss.blue_w, 0) - COALESCE(fs.blue_w, 0) END
      ELSE CASE WHEN tp.pick_order = 1 THEN COALESCE(fs.red_w, 0) ELSE COALESCE(ss.red_w, 0) - COALESCE(fs.red_w, 0) END
    END AS wins,
    CASE WHEN tp.side = 'BLUE' THEN br.blue_rate ELSE br.red_rate END AS side_base
  FROM target_picks tp
  CROSS JOIN base_rates br
  LEFT JOIN side_stats ss ON ss.hero_id = tp.hero_id
  LEFT JOIN first_stats fs ON fs.hero_id = tp.hero_id
),
team_scores AS (
  SELECT
    COALESCE(sum(((wins + side_base * 10) / (appearances + 10) - side_base)
      * CASE WHEN pick_order = 1 THEN 1.5 ELSE 1 END) FILTER (WHERE side = 'BLUE'), 0) AS blue_score,
    COALESCE(sum(((wins + side_base * 10) / (appearances + 10) - side_base)
      * CASE WHEN pick_order = 1 THEN 1.5 ELSE 1 END) FILTER (WHERE side = 'RED'), 0) AS red_score
  FROM pick_values
),
target_pairs AS (
  SELECT a.side, a.hero_id AS hero_1_id, b.hero_id AS hero_2_id,
         a.class AS class_1, b.class AS class_2
  FROM target_picks a
  JOIN target_picks b ON b.side = a.side AND a.hero_id < b.hero_id
),
pair_effects AS (
  SELECT p.side,
    (COALESCE(ga.residual, 0) - COALESCE(dc.residual, 0))
      / (greatest(0::numeric, COALESCE(ga.appearances, 0) - COALESCE(dc.appearances, 0)) + 30) AS effect_a,
    (COALESCE(gb.residual, 0) - COALESCE(dc.residual, 0))
      / (greatest(0::numeric, COALESCE(gb.appearances, 0) - COALESCE(dc.appearances, 0)) + 30) AS effect_b
  FROM target_pairs p
  LEFT JOIN duo_context dc ON dc.hero_1_id = p.hero_1_id AND dc.hero_2_id = p.hero_2_id
  LEFT JOIN partner_groups ga ON ga.hero_id = p.hero_1_id AND ga.partner_class = p.class_2
  LEFT JOIN partner_groups gb ON gb.hero_id = p.hero_2_id AND gb.partner_class = p.class_1
),
team_synergy AS (
  SELECT side,
    greatest(-0.03::numeric, least(0.03::numeric, sum((effect_a + effect_b) / 2) * 0.2)) AS score
  FROM pair_effects GROUP BY side
),
scored AS (
  SELECT br.*, ts.blue_score, ts.red_score,
         COALESCE(sb.score, 0) AS blue_synergy,
         COALESCE(sr.score, 0) AS red_synergy,
         ts.blue_score - ts.red_score + (br.blue_rate - 0.5)
           + COALESCE(sb.score, 0) - COALESCE(sr.score, 0) AS score_delta
  FROM base_rates br
  CROSS JOIN team_scores ts
  LEFT JOIN team_synergy sb ON sb.side = 'BLUE'
  LEFT JOIN team_synergy sr ON sr.side = 'RED'
)
SELECT pg_catalog.jsonb_build_object(
  'model_version', 'draft-indicator-rules-v1',
  'score_delta', round(s.score_delta, 8),
  'predicted_side', CASE WHEN abs(s.score_delta) < 0.005 THEN NULL WHEN s.score_delta > 0 THEN 'BLUE' ELSE 'RED' END,
  'is_neutral', abs(s.score_delta) < 0.005,
  'blue_score', round(s.blue_score, 8),
  'red_score', round(s.red_score, 8),
  'blue_side_baseline', round(s.blue_rate, 8),
  'red_side_baseline', round(s.red_rate, 8),
  'blue_class_synergy', round(s.blue_synergy, 8),
  'red_class_synergy', round(s.red_synergy, 8),
  'approved_matches_used', s.matches,
  'blue_ids', COALESCE((SELECT pg_catalog.jsonb_agg(tp.hero_id ORDER BY tp.pick_order) FROM target_picks tp WHERE tp.side = 'BLUE'), '[]'::jsonb),
  'red_ids', COALESCE((SELECT pg_catalog.jsonb_agg(tp.hero_id ORDER BY tp.pick_order) FROM target_picks tp WHERE tp.side = 'RED'), '[]'::jsonb)
)
FROM target t CROSS JOIN scored s;
$function$;

CREATE OR REPLACE FUNCTION public.ss_sync_match_prediction(
  p_match_id uuid, p_capture_mode text DEFAULT 'automatic_ingest'
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
DECLARE
  v_match public.ss_matches%rowtype;
  v_hero_count integer;
  v_payload jsonb;
  v_predicted_side text;
BEGIN
  SELECT * INTO v_match FROM public.ss_matches WHERE id = p_match_id;
  IF NOT FOUND THEN
    DELETE FROM public.ss_match_predictions WHERE match_id = p_match_id;
    RETURN;
  END IF;

  SELECT count(*)::integer INTO v_hero_count
  FROM public.ss_match_heroes WHERE match_id = p_match_id;

  IF v_match.status <> 'approved' OR v_hero_count <> 6 THEN
    DELETE FROM public.ss_match_predictions WHERE match_id = p_match_id;
    RETURN;
  END IF;

  v_payload := public.ss_calculate_draft_indicator(p_match_id);
  IF v_payload IS NULL THEN
    RAISE EXCEPTION 'Could not calculate the draft indicator for match %.', p_match_id;
  END IF;
  v_predicted_side := v_payload->>'predicted_side';

  INSERT INTO public.ss_match_predictions (
    match_id, event_id, theme_id, played_at, calculated_at, model_version,
    capture_mode, outcome_known_at_calculation, winner, predicted_side, is_correct,
    score_delta, blue_score, red_score, blue_side_baseline, red_side_baseline,
    blue_class_synergy, red_class_synergy, approved_matches_used, blue_ids, red_ids, payload
  )
  VALUES (
    v_match.id, v_match.event_id, v_match.theme_id, v_match.played_at, clock_timestamp(),
    v_payload->>'model_version', p_capture_mode, true, v_match.winner, v_predicted_side,
    CASE WHEN v_predicted_side IS NULL THEN NULL ELSE v_predicted_side = v_match.winner END,
    (v_payload->>'score_delta')::numeric, (v_payload->>'blue_score')::numeric,
    (v_payload->>'red_score')::numeric, (v_payload->>'blue_side_baseline')::numeric,
    (v_payload->>'red_side_baseline')::numeric, (v_payload->>'blue_class_synergy')::numeric,
    (v_payload->>'red_class_synergy')::numeric, (v_payload->>'approved_matches_used')::integer,
    ARRAY(SELECT jsonb_array_elements_text(v_payload->'blue_ids')),
    ARRAY(SELECT jsonb_array_elements_text(v_payload->'red_ids')), v_payload
  )
  ON CONFLICT (match_id) DO UPDATE SET
    event_id = EXCLUDED.event_id, theme_id = EXCLUDED.theme_id, played_at = EXCLUDED.played_at,
    calculated_at = EXCLUDED.calculated_at, model_version = EXCLUDED.model_version,
    capture_mode = EXCLUDED.capture_mode, outcome_known_at_calculation = EXCLUDED.outcome_known_at_calculation,
    winner = EXCLUDED.winner, predicted_side = EXCLUDED.predicted_side, is_correct = EXCLUDED.is_correct,
    score_delta = EXCLUDED.score_delta, blue_score = EXCLUDED.blue_score, red_score = EXCLUDED.red_score,
    blue_side_baseline = EXCLUDED.blue_side_baseline, red_side_baseline = EXCLUDED.red_side_baseline,
    blue_class_synergy = EXCLUDED.blue_class_synergy, red_class_synergy = EXCLUDED.red_class_synergy,
    approved_matches_used = EXCLUDED.approved_matches_used, blue_ids = EXCLUDED.blue_ids,
    red_ids = EXCLUDED.red_ids, payload = EXCLUDED.payload;
END;
$function$;

CREATE OR REPLACE FUNCTION public.ss_capture_match_prediction_from_heroes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.ss_sync_match_prediction(OLD.match_id, 'automatic_ingest');
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.match_id IS DISTINCT FROM NEW.match_id THEN
      PERFORM public.ss_sync_match_prediction(OLD.match_id, 'automatic_ingest');
    END IF;
    PERFORM public.ss_sync_match_prediction(NEW.match_id, 'automatic_ingest');
    RETURN NEW;
  ELSE
    PERFORM public.ss_sync_match_prediction(NEW.match_id, 'automatic_ingest');
    RETURN NEW;
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.ss_capture_match_prediction_from_status()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
BEGIN
  PERFORM public.ss_sync_match_prediction(NEW.id, 'automatic_ingest');
  RETURN NEW;
END;
$function$;

CREATE TRIGGER ss_match_heroes_capture_prediction
AFTER INSERT OR UPDATE OR DELETE ON public.ss_match_heroes
FOR EACH ROW EXECUTE FUNCTION public.ss_capture_match_prediction_from_heroes();

CREATE TRIGGER ss_matches_capture_prediction_on_status
AFTER UPDATE OF status ON public.ss_matches
FOR EACH ROW WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION public.ss_capture_match_prediction_from_status();

REVOKE ALL ON FUNCTION public.ss_set_match_played_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.ss_calculate_draft_indicator(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.ss_sync_match_prediction(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.ss_capture_match_prediction_from_heroes() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.ss_capture_match_prediction_from_status() FROM PUBLIC, anon, authenticated;

DO $$
DECLARE v_match_id uuid;
BEGIN
  FOR v_match_id IN
    SELECT id FROM public.ss_matches
    WHERE status = 'approved'
    ORDER BY played_at, created_at, id
  LOOP
    PERFORM public.ss_sync_match_prediction(v_match_id, 'historical_replay');
  END LOOP;
END
$$;
