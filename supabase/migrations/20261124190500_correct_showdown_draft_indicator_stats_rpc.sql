-- Read-only, event-scoped aggregate data for the independent Showdown Draft Indicator v1.
-- The function returns only aggregate hero-slot and RED1+RED2 class-pair residual data.

CREATE OR REPLACE FUNCTION public.ss_get_showdown_draft_indicator_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
WITH current_event AS (
  SELECT s.current_event_id AS event_id
  FROM public.ss_settings s
  WHERE s.id = 1
),
approved AS (
  SELECT
    m.id,
    m.event_id,
    m.theme_id,
    m.winner,
    m.played_at,
    m.created_at,
    m.blue_draft_known,
    m.red_draft_known
  FROM public.ss_matches m
  JOIN current_event ce ON ce.event_id = m.event_id
  WHERE m.status = 'approved'
),
ordered_all AS (
  SELECT
    a.*,
    count(*) OVER (
      PARTITION BY a.event_id
      ORDER BY a.played_at, a.created_at, a.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_matches,
    count(*) FILTER (WHERE a.winner = 'BLUE') OVER (
      PARTITION BY a.event_id
      ORDER BY a.played_at, a.created_at, a.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    )::numeric AS prior_blue_wins
  FROM approved a
),
verified AS (
  SELECT
    a.*,
    row_number() OVER (
      ORDER BY a.played_at, a.created_at, a.id
    ) AS sequence
  FROM approved a
  WHERE a.blue_draft_known
    AND a.red_draft_known
),
pick_history AS (
  SELECT
    v.id AS match_id,
    v.event_id,
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
match_features AS (
  SELECT
    v.id,
    v.event_id,
    v.winner,
    v.played_at,
    v.created_at,
    CASE
      WHEN oa.prior_matches = 0 THEN 0.5::numeric
      ELSE oa.prior_blue_wins / oa.prior_matches
    END AS blue_base,
    max(p.hero_class) FILTER (
      WHERE p.side = 'RED' AND p.pick_order = 1
    ) AS red1_class,
    max(p.hero_class) FILTER (
      WHERE p.side = 'RED' AND p.pick_order = 2
    ) AS red2_class,
    max(
      (p.prior_wins + (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END) * 10) / (p.prior_appearances + 10)
      - (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END)
    ) FILTER (
      WHERE p.side = 'RED' AND p.pick_order = 1
    ) AS red1_lift,
    max(
      (p.prior_wins + (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END) * 10) / (p.prior_appearances + 10)
      - (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END)
    ) FILTER (
      WHERE p.side = 'RED' AND p.pick_order = 2
    ) AS red2_lift,
    max(
      (p.prior_wins + (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END) * 10) / (p.prior_appearances + 10)
      - (1 - CASE
        WHEN oa.prior_matches = 0 THEN 0.5::numeric
        ELSE oa.prior_blue_wins / oa.prior_matches
      END)
    ) FILTER (
      WHERE p.side = 'RED' AND p.pick_order = 3
    ) AS red3_lift
  FROM verified v
  JOIN ordered_all oa ON oa.id = v.id
  JOIN pick_history p ON p.match_id = v.id
  GROUP BY
    v.id, v.event_id, v.winner, v.played_at, v.created_at,
    oa.prior_matches, oa.prior_blue_wins
),
red_residuals AS (
  SELECT
    f.event_id,
    f.red1_class,
    f.red2_class,
    CASE WHEN f.winner = 'RED' THEN 1::numeric ELSE 0::numeric END
      - greatest(
          0.05::numeric,
          least(
            0.95::numeric,
            (1 - f.blue_base)
              + f.red1_lift
              + f.red2_lift
              + f.red3_lift
          )
        ) AS residual
  FROM match_features f
  WHERE f.red1_class IS NOT NULL
    AND f.red2_class IS NOT NULL
),
hero_slot_stats AS (
  SELECT
    h.side,
    h.pick_order,
    h.hero_id,
    count(*)::bigint AS appearances,
    count(*) FILTER (WHERE v.winner = h.side)::bigint AS wins
  FROM verified v
  JOIN public.ss_match_heroes h ON h.match_id = v.id
  GROUP BY h.side, h.pick_order, h.hero_id
),
red_class_pair_stats AS (
  SELECT
    r.red1_class AS class_1,
    r.red2_class AS class_2,
    count(*)::bigint AS appearances,
    sum(r.residual)::numeric AS residual_sum
  FROM red_residuals r
  GROUP BY r.red1_class, r.red2_class
),
summary AS (
  SELECT
    count(*)::bigint AS approved_matches,
    count(*) FILTER (WHERE a.winner = 'BLUE')::bigint AS blue_wins,
    count(*) FILTER (WHERE a.winner = 'RED')::bigint AS red_wins,
    (SELECT count(*)::bigint FROM verified) AS verified_order_matches
  FROM approved a
)
SELECT jsonb_build_object(
  'model_version', 'showdown-draft-indicator-v1',
  'generated_at', pg_catalog.statement_timestamp(),
  'event_id', (SELECT event_id FROM current_event),
  'summary', (
    SELECT jsonb_build_object(
      'approved_matches', s.approved_matches,
      'blue_wins', s.blue_wins,
      'red_wins', s.red_wins,
      'verified_order_matches', s.verified_order_matches,
      'blue_baseline', CASE
        WHEN s.approved_matches = 0 THEN 0.5::numeric
        ELSE s.blue_wins::numeric / s.approved_matches
      END,
      'red_baseline', CASE
        WHEN s.approved_matches = 0 THEN 0.5::numeric
        ELSE s.red_wins::numeric / s.approved_matches
      END
    )
    FROM summary s
  ),
  'hero_slots', coalesce(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'side', hs.side,
          'pick_order', hs.pick_order,
          'hero_id', hs.hero_id,
          'appearances', hs.appearances,
          'wins', hs.wins
        )
        ORDER BY hs.side, hs.pick_order, hs.appearances DESC, hs.hero_id
      )
      FROM hero_slot_stats hs
    ),
    '[]'::jsonb
  ),
  'red_class_pairs', coalesce(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'class_1', rp.class_1,
          'class_2', rp.class_2,
          'appearances', rp.appearances,
          'residual_sum', rp.residual_sum
        )
        ORDER BY rp.appearances DESC, rp.class_1, rp.class_2
      )
      FROM red_class_pair_stats rp
    ),
    '[]'::jsonb
  )
);
$function$;

REVOKE ALL ON FUNCTION public.ss_get_showdown_draft_indicator_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ss_get_showdown_draft_indicator_stats() TO anon, authenticated;

COMMENT ON FUNCTION public.ss_get_showdown_draft_indicator_stats()
IS 'Read-only aggregate history for showdown-draft-indicator-v1: exact side/slot hero records and walk-forward RED1+RED2 ordered class residuals.';
