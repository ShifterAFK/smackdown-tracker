-- Persist the independent SDI score at approval time and expose a read-only comparison.
CREATE TABLE IF NOT EXISTS public.ss_showdown_draft_predictions (
  match_id uuid PRIMARY KEY REFERENCES public.ss_matches(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  theme_id text NOT NULL,
  played_at timestamptz NOT NULL,
  calculated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  model_version text NOT NULL DEFAULT 'showdown-draft-indicator-v1',
  capture_mode text NOT NULL DEFAULT 'automatic_ingest' CHECK (capture_mode = 'automatic_ingest'),
  winner text NOT NULL CHECK (winner IN ('BLUE','RED')),
  predicted_side text CHECK (predicted_side IN ('BLUE','RED')),
  is_correct boolean,
  score_delta numeric NOT NULL,
  blue_score numeric NOT NULL,
  red_score numeric NOT NULL,
  blue_side_baseline numeric NOT NULL,
  red_side_baseline numeric NOT NULL,
  red12_class_1 text,
  red12_class_2 text,
  red12_appearances integer NOT NULL DEFAULT 0,
  red12_residual numeric NOT NULL DEFAULT 0,
  approved_matches_used integer NOT NULL DEFAULT 0,
  verified_order_matches_used integer NOT NULL DEFAULT 0,
  blue_ids text[] NOT NULL CHECK (cardinality(blue_ids) = 3),
  red_ids text[] NOT NULL CHECK (cardinality(red_ids) = 3),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS ss_showdown_draft_predictions_event_played_idx
  ON public.ss_showdown_draft_predictions (event_id, played_at DESC);

ALTER TABLE public.ss_showdown_draft_predictions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.ss_calculate_showdown_draft_indicator(p_match_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
WITH target AS (
  SELECT m.id, m.event_id, m.theme_id, m.played_at, m.created_at, m.winner
  FROM public.ss_matches m
  WHERE m.id = p_match_id
    AND m.status = 'approved'
    AND m.blue_draft_known
    AND m.red_draft_known
),
all_ordered AS (
  SELECT
    m.*,
    count(*) OVER (
      PARTITION BY m.event_id
      ORDER BY m.played_at, m.created_at, m.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_matches,
    count(*) FILTER (WHERE m.winner = 'BLUE') OVER (
      PARTITION BY m.event_id
      ORDER BY m.played_at, m.created_at, m.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_blue_wins
  FROM public.ss_matches m
  JOIN target t ON t.event_id = m.event_id
  WHERE m.status = 'approved'
),
prior_all AS (
  SELECT a.*
  FROM all_ordered a
  JOIN target t ON t.event_id = a.event_id
  WHERE a.id <> t.id
    AND (a.played_at, a.created_at, a.id) < (t.played_at, t.created_at, t.id)
),
prior_summary AS (
  SELECT
    count(*)::integer AS approved_matches,
    count(*) FILTER (WHERE winner = 'BLUE')::integer AS blue_wins,
    count(*) FILTER (WHERE winner = 'RED')::integer AS red_wins
  FROM prior_all
),
base AS (
  SELECT
    s.approved_matches,
    s.blue_wins,
    s.red_wins,
    CASE WHEN s.approved_matches = 0 THEN 0.5::numeric
         ELSE s.blue_wins::numeric / s.approved_matches END AS blue_rate
  FROM prior_summary s
),
verified AS (
  SELECT a.*
  FROM prior_all a
  WHERE a.blue_draft_known AND a.red_draft_known
),
pick_history AS (
  SELECT
    v.id AS match_id,
    v.winner,
    v.played_at,
    v.created_at,
    h.side,
    h.pick_order,
    h.hero_id,
    he.class AS hero_class,
    count(*) OVER (
      PARTITION BY v.event_id, h.side, h.pick_order, h.hero_id
      ORDER BY v.played_at, v.created_at, v.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_appearances,
    count(*) FILTER (WHERE v.winner = h.side) OVER (
      PARTITION BY v.event_id, h.side, h.pick_order, h.hero_id
      ORDER BY v.played_at, v.created_at, v.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_wins
  FROM verified v
  JOIN public.ss_match_heroes h ON h.match_id = v.id
  JOIN public.ss_heroes he ON he.id = h.hero_id
),
prior_red_features AS (
  SELECT
    p.match_id,
    max(p.hero_class) FILTER (WHERE p.side = 'RED' AND p.pick_order = 1) AS class_1,
    max(p.hero_class) FILTER (WHERE p.side = 'RED' AND p.pick_order = 2) AS class_2,
    max(
      (p.prior_wins + (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                                ELSE ao.prior_blue_wins / ao.prior_matches END) * 10)
        / (p.prior_appearances + 10)
      - (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                  ELSE ao.prior_blue_wins / ao.prior_matches END)
    ) FILTER (WHERE p.side = 'RED' AND p.pick_order = 1) AS red1_lift,
    max(
      (p.prior_wins + (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                                ELSE ao.prior_blue_wins / ao.prior_matches END) * 10)
        / (p.prior_appearances + 10)
      - (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                  ELSE ao.prior_blue_wins / ao.prior_matches END)
    ) FILTER (WHERE p.side = 'RED' AND p.pick_order = 2) AS red2_lift,
    max(
      (p.prior_wins + (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                                ELSE ao.prior_blue_wins / ao.prior_matches END) * 10)
        / (p.prior_appearances + 10)
      - (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                  ELSE ao.prior_blue_wins / ao.prior_matches END)
    ) FILTER (WHERE p.side = 'RED' AND p.pick_order = 3) AS red3_lift
  FROM pick_history p
  JOIN all_ordered ao ON ao.id = p.match_id
  GROUP BY p.match_id
),
prior_red_residuals AS (
  SELECT
    f.class_1,
    f.class_2,
    (CASE WHEN v.winner = 'RED' THEN 1::numeric ELSE 0::numeric END)
      - greatest(0.05::numeric, least(0.95::numeric,
          (1 - CASE WHEN ao.prior_matches = 0 THEN 0.5::numeric
                    ELSE ao.prior_blue_wins / ao.prior_matches END)
          + coalesce(f.red1_lift, 0)
          + coalesce(f.red2_lift, 0)
          + coalesce(f.red3_lift, 0)
        )) AS residual
  FROM prior_red_features f
  JOIN verified v ON v.id = f.match_id
  JOIN all_ordered ao ON ao.id = v.id
  WHERE f.class_1 IS NOT NULL AND f.class_2 IS NOT NULL
),
red_pair AS (
  SELECT
    class_1,
    class_2,
    count(*)::integer AS appearances,
    sum(residual)::numeric AS residual_sum
  FROM prior_red_residuals
  GROUP BY class_1, class_2
),
target_picks AS (
  SELECT h.side, h.pick_order, h.hero_id, he.class
  FROM target t
  JOIN public.ss_match_heroes h ON h.match_id = t.id
  JOIN public.ss_heroes he ON he.id = h.hero_id
),
target_hero_stats AS (
  SELECT
    tp.side,
    tp.pick_order,
    tp.hero_id,
    count(ph.match_id)::numeric AS appearances,
    count(*) FILTER (WHERE ph.winner = tp.side)::numeric AS wins
  FROM target_picks tp
  LEFT JOIN pick_history ph
    ON ph.side = tp.side
   AND ph.pick_order = tp.pick_order
   AND ph.hero_id = tp.hero_id
  GROUP BY tp.side, tp.pick_order, tp.hero_id
),
pick_scores AS (
  SELECT
    s.*,
    CASE WHEN s.side = 'BLUE' THEN b.blue_rate ELSE 1 - b.blue_rate END AS side_base,
    ((s.wins + (CASE WHEN s.side = 'BLUE' THEN b.blue_rate ELSE 1 - b.blue_rate END) * 10)
      / (s.appearances + 10)
      - (CASE WHEN s.side = 'BLUE' THEN b.blue_rate ELSE 1 - b.blue_rate END))
      * CASE WHEN s.pick_order = 1 THEN 1.5 ELSE 0.75 END AS weighted_lift
  FROM target_hero_stats s
  CROSS JOIN base b
),
team_scores AS (
  SELECT
    coalesce(sum(weighted_lift) FILTER (WHERE side = 'BLUE'), 0)::numeric AS blue_score,
    coalesce(sum(weighted_lift) FILTER (WHERE side = 'RED'), 0)::numeric AS red_score
  FROM pick_scores
),
target_red_pair AS (
  SELECT
    max(class) FILTER (WHERE side = 'RED' AND pick_order = 1) AS class_1,
    max(class) FILTER (WHERE side = 'RED' AND pick_order = 2) AS class_2
  FROM target_picks
),
pair_adjustment AS (
  SELECT
    p.class_1,
    p.class_2,
    coalesce(r.appearances, 0)::integer AS appearances,
    coalesce(r.residual_sum, 0)::numeric / (coalesce(r.appearances, 0) + 30)::numeric AS residual
  FROM target_red_pair p
  LEFT JOIN red_pair r ON r.class_1 = p.class_1 AND r.class_2 = p.class_2
),
scored AS (
  SELECT
    b.*,
    ts.blue_score,
    ts.red_score,
    pa.class_1,
    pa.class_2,
    pa.appearances AS red12_appearances,
    pa.residual AS red12_residual,
    b.blue_rate - 0.5 + ts.blue_score - ts.red_score - pa.residual AS score_delta,
    (SELECT count(*)::integer FROM verified) AS verified_matches
  FROM base b
  CROSS JOIN team_scores ts
  CROSS JOIN pair_adjustment pa
)
SELECT jsonb_build_object(
  'model_version', 'showdown-draft-indicator-v1',
  'score_delta', round(s.score_delta, 8),
  'predicted_side', CASE WHEN abs(s.score_delta) < 0.005 THEN NULL
                         WHEN s.score_delta > 0 THEN 'BLUE' ELSE 'RED' END,
  'is_neutral', abs(s.score_delta) < 0.005,
  'blue_score', round(s.blue_score, 8),
  'red_score', round(s.red_score, 8),
  'blue_side_baseline', round(s.blue_rate, 8),
  'red_side_baseline', round(1 - s.blue_rate, 8),
  'red12_class_1', s.class_1,
  'red12_class_2', s.class_2,
  'red12_appearances', s.red12_appearances,
  'red12_residual', round(s.red12_residual, 8),
  'approved_matches_used', s.approved_matches,
  'verified_order_matches_used', s.verified_matches,
  'blue_ids', (SELECT jsonb_agg(tp.hero_id ORDER BY tp.pick_order) FROM target_picks tp WHERE tp.side = 'BLUE'),
  'red_ids', (SELECT jsonb_agg(tp.hero_id ORDER BY tp.pick_order) FROM target_picks tp WHERE tp.side = 'RED')
)
FROM scored s
WHERE s.approved_matches >= 0;
$function$;

CREATE OR REPLACE FUNCTION public.ss_sync_showdown_draft_prediction(p_match_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_match public.ss_matches%rowtype;
  v_payload jsonb;
  v_predicted_side text;
BEGIN
  SELECT * INTO v_match FROM public.ss_matches WHERE id = p_match_id;
  IF NOT FOUND THEN
    DELETE FROM public.ss_showdown_draft_predictions WHERE match_id = p_match_id;
    RETURN;
  END IF;

  IF v_match.status <> 'approved'
     OR NOT v_match.blue_draft_known
     OR NOT v_match.red_draft_known
     OR (SELECT count(*) FROM public.ss_match_heroes WHERE match_id = p_match_id) <> 6 THEN
    DELETE FROM public.ss_showdown_draft_predictions WHERE match_id = p_match_id;
    RETURN;
  END IF;

  v_payload := public.ss_calculate_showdown_draft_indicator(p_match_id);
  IF v_payload IS NULL THEN
    RAISE EXCEPTION 'Could not calculate Showdown Draft Indicator for match %.', p_match_id;
  END IF;
  v_predicted_side := v_payload->>'predicted_side';

  INSERT INTO public.ss_showdown_draft_predictions (
    match_id,event_id,theme_id,played_at,calculated_at,model_version,capture_mode,
    winner,predicted_side,is_correct,score_delta,blue_score,red_score,
    blue_side_baseline,red_side_baseline,red12_class_1,red12_class_2,
    red12_appearances,red12_residual,approved_matches_used,verified_order_matches_used,
    blue_ids,red_ids,payload
  ) VALUES (
    v_match.id,v_match.event_id,v_match.theme_id,v_match.played_at,clock_timestamp(),
    v_payload->>'model_version','automatic_ingest',v_match.winner,v_predicted_side,
    CASE WHEN v_predicted_side IS NULL THEN NULL ELSE v_predicted_side = v_match.winner END,
    (v_payload->>'score_delta')::numeric,(v_payload->>'blue_score')::numeric,
    (v_payload->>'red_score')::numeric,(v_payload->>'blue_side_baseline')::numeric,
    (v_payload->>'red_side_baseline')::numeric,v_payload->>'red12_class_1',
    v_payload->>'red12_class_2',(v_payload->>'red12_appearances')::integer,
    (v_payload->>'red12_residual')::numeric,(v_payload->>'approved_matches_used')::integer,
    (v_payload->>'verified_order_matches_used')::integer,
    ARRAY(SELECT jsonb_array_elements_text(v_payload->'blue_ids')),
    ARRAY(SELECT jsonb_array_elements_text(v_payload->'red_ids')),v_payload
  )
  ON CONFLICT (match_id) DO UPDATE SET
    event_id=EXCLUDED.event_id,theme_id=EXCLUDED.theme_id,played_at=EXCLUDED.played_at,
    calculated_at=EXCLUDED.calculated_at,model_version=EXCLUDED.model_version,
    capture_mode=EXCLUDED.capture_mode,winner=EXCLUDED.winner,
    predicted_side=EXCLUDED.predicted_side,is_correct=EXCLUDED.is_correct,
    score_delta=EXCLUDED.score_delta,blue_score=EXCLUDED.blue_score,red_score=EXCLUDED.red_score,
    blue_side_baseline=EXCLUDED.blue_side_baseline,red_side_baseline=EXCLUDED.red_side_baseline,
    red12_class_1=EXCLUDED.red12_class_1,red12_class_2=EXCLUDED.red12_class_2,
    red12_appearances=EXCLUDED.red12_appearances,red12_residual=EXCLUDED.red12_residual,
    approved_matches_used=EXCLUDED.approved_matches_used,
    verified_order_matches_used=EXCLUDED.verified_order_matches_used,
    blue_ids=EXCLUDED.blue_ids,red_ids=EXCLUDED.red_ids,payload=EXCLUDED.payload;
END;
$function$;

CREATE OR REPLACE FUNCTION public.ss_capture_match_prediction_from_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  PERFORM public.ss_sync_match_prediction(NEW.id, 'automatic_ingest');
  PERFORM public.ss_sync_showdown_draft_prediction(NEW.id);
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.ss_get_model_comparison_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
WITH paired AS (
  SELECT
    old.match_id,
    old.played_at,
    old.winner,
    old.predicted_side AS old_predicted_side,
    old.is_correct AS old_is_correct,
    old.score_delta AS old_score_delta,
    old.blue_ids,
    old.red_ids,
    new.predicted_side AS new_predicted_side,
    new.is_correct AS new_is_correct,
    new.score_delta AS new_score_delta,
    new.approved_matches_used,
    new.verified_order_matches_used
  FROM public.ss_match_predictions old
  JOIN public.ss_showdown_draft_predictions new ON new.match_id = old.match_id
  WHERE old.model_version = 'draft-indicator-rules-v1'
    AND old.capture_mode = 'automatic_ingest'
),
summary AS (
  SELECT
    count(*)::integer AS paired_matches,
    count(*) FILTER (WHERE old_predicted_side IS NOT NULL)::integer AS old_scored,
    count(*) FILTER (WHERE new_predicted_side IS NOT NULL)::integer AS new_scored,
    count(*) FILTER (WHERE old_is_correct IS TRUE)::integer AS old_correct,
    count(*) FILTER (WHERE new_is_correct IS TRUE)::integer AS new_correct,
    count(*) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side <> new_predicted_side
    )::integer AS disagreements,
    count(*) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side <> new_predicted_side AND old_is_correct IS TRUE
    )::integer AS old_disagreement_wins,
    count(*) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side <> new_predicted_side AND new_is_correct IS TRUE
    )::integer AS new_disagreement_wins,
    count(*) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side = new_predicted_side
        AND old_is_correct IS FALSE AND new_is_correct IS FALSE
    )::integer AS both_wrong,
    avg(abs(old_score_delta)) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side = new_predicted_side
        AND old_is_correct IS FALSE AND new_is_correct IS FALSE
    ) AS old_mean_wrong_magnitude,
    avg(abs(new_score_delta)) FILTER (
      WHERE old_predicted_side IS NOT NULL AND new_predicted_side IS NOT NULL
        AND old_predicted_side = new_predicted_side
        AND old_is_correct IS FALSE AND new_is_correct IS FALSE
    ) AS new_mean_wrong_magnitude
  FROM paired
),
recent AS (
  SELECT coalesce(jsonb_agg(to_jsonb(r) ORDER BY r.played_at DESC), '[]'::jsonb) AS rows
  FROM (
    SELECT
      match_id,played_at,winner,
      old_predicted_side,old_is_correct,old_score_delta,
      new_predicted_side,new_is_correct,new_score_delta,
      blue_ids,red_ids,approved_matches_used,verified_order_matches_used
    FROM paired
    ORDER BY played_at DESC,match_id DESC
    LIMIT 100
  ) r
)
SELECT jsonb_build_object(
  'model_version','showdown-draft-indicator-v1',
  'paired_matches',s.paired_matches,
  'old_scored',s.old_scored,
  'new_scored',s.new_scored,
  'old_correct',s.old_correct,
  'new_correct',s.new_correct,
  'disagreements',s.disagreements,
  'old_disagreement_wins',s.old_disagreement_wins,
  'new_disagreement_wins',s.new_disagreement_wins,
  'both_wrong',s.both_wrong,
  'old_mean_wrong_magnitude',s.old_mean_wrong_magnitude,
  'new_mean_wrong_magnitude',s.new_mean_wrong_magnitude,
  'recent_matches',recent.rows
)
FROM summary s CROSS JOIN recent;
$function$;

REVOKE ALL ON FUNCTION public.ss_calculate_showdown_draft_indicator(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ss_sync_showdown_draft_prediction(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ss_get_model_comparison_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ss_get_model_comparison_stats() TO anon, authenticated;

COMMENT ON TABLE public.ss_showdown_draft_predictions IS
  'Immutable-at-capture historical scores for showdown-draft-indicator-v1, calculated from only matches preceding each approved match.';
COMMENT ON FUNCTION public.ss_calculate_showdown_draft_indicator(uuid) IS
  'Walk-forward SDI score for one approved match, using only approved history preceding its played_at/created_at/id order.';
COMMENT ON FUNCTION public.ss_get_model_comparison_stats() IS
  'Paired historical comparison of old Match Indicator and SDI automatic-ingest snapshots; no historical SDI backfill.';
