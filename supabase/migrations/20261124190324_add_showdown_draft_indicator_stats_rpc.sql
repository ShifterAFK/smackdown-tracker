CREATE OR REPLACE FUNCTION public.ss_get_showdown_draft_indicator_stats()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
WITH current_event AS (
  SELECT s.current_event_id AS event_id
  FROM public.ss_settings s
  WHERE s.id = 1
),
match_history AS (
  SELECT
    m.id,
    m.winner,
    m.played_at,
    m.created_at,
    count(*) OVER (
      ORDER BY m.played_at, m.created_at, m.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ) AS prior_matches,
    count(*) FILTER (WHERE m.winner = 'BLUE') OVER (
      ORDER BY m.played_at, m.created_at, m.id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ) AS prior_blue_wins
  FROM public.ss_matches m
  JOIN current_event ce ON ce.event_id = m.event_id
  WHERE m.status = 'approved'
    AND m.blue_draft_known = true
    AND m.red_draft_known = true
),
entries AS (
  SELECT
    mh.id AS match_id,
    mh.winner,
    mh.played_at,
    mh.created_at,
    p.side,
    p.pick_order,
    p.hero_id
  FROM match_history mh
  JOIN public.ss_match_heroes p ON p.match_id = mh.id
),
hero_slot_stats AS (
  SELECT
    e.side,
    e.pick_order,
    e.hero_id,
    h.class,
    count(*)::integer AS appearances,
    count(*) FILTER (WHERE e.winner = e.side)::integer AS wins
  FROM entries e
  JOIN public.ss_heroes h ON h.id = e.hero_id
  GROUP BY e.side, e.pick_order, e.hero_id, h.class
),
slot_history AS (
  SELECT
    e.*,
    count(*) OVER (
      PARTITION BY e.side, e.pick_order, e.hero_id
      ORDER BY e.played_at, e.created_at, e.match_id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ) AS prior_appearances,
    count(*) FILTER (WHERE e.winner = e.side) OVER (
      PARTITION BY e.side, e.pick_order, e.hero_id
      ORDER BY e.played_at, e.created_at, e.match_id
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ) AS prior_wins
  FROM entries e
),
red_lifts AS (
  SELECT
    sh.match_id,
    max(CASE WHEN sh.side = 'RED' AND sh.pick_order = 1 THEN
      (sh.prior_wins + (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      ) * 10) / (sh.prior_appearances + 10)
      - (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      )
    END) AS red1_lift,
    max(CASE WHEN sh.side = 'RED' AND sh.pick_order = 2 THEN
      (sh.prior_wins + (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      ) * 10) / (sh.prior_appearances + 10)
      - (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      )
    END) AS red2_lift,
    max(CASE WHEN sh.side = 'RED' AND sh.pick_order = 3 THEN
      (sh.prior_wins + (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      ) * 10) / (sh.prior_appearances + 10)
      - (
        CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
             ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END
      )
    END) AS red3_lift
  FROM slot_history sh
  JOIN match_history mh ON mh.id = sh.match_id
  WHERE sh.side = 'RED'
  GROUP BY sh.match_id
),
red12_match_residuals AS (
  SELECT
    mh.id AS match_id,
    h1.class AS class_1,
    h2.class AS class_2,
    (CASE WHEN mh.winner = 'RED' THEN 1.0 ELSE 0.0 END)
      - greatest(0.05::numeric, least(0.95::numeric,
          (CASE WHEN mh.prior_matches = 0 THEN 0.5::numeric
                ELSE 1 - mh.prior_blue_wins::numeric / mh.prior_matches END)
          + coalesce(rl.red1_lift, 0)
          + coalesce(rl.red2_lift, 0)
          + coalesce(rl.red3_lift, 0)
        )) AS residual
  FROM match_history mh
  JOIN red_lifts rl ON rl.match_id = mh.id
  JOIN public.ss_match_heroes p1
    ON p1.match_id = mh.id AND p1.side = 'RED' AND p1.pick_order = 1
  JOIN public.ss_match_heroes p2
    ON p2.match_id = mh.id AND p2.side = 'RED' AND p2.pick_order = 2
  JOIN public.ss_heroes h1 ON h1.id = p1.hero_id
  JOIN public.ss_heroes h2 ON h2.id = p2.hero_id
),
red12_class_stats AS (
  SELECT
    class_1,
    class_2,
    count(*)::integer AS appearances,
    sum(residual) AS residual_sum
  FROM red12_match_residuals
  GROUP BY class_1, class_2
),
summary AS (
  SELECT
    count(*)::integer AS approved_matches,
    count(*) FILTER (WHERE winner = 'BLUE')::integer AS blue_wins,
    count(*) FILTER (WHERE winner = 'RED')::integer AS red_wins
  FROM match_history
)
SELECT pg_catalog.jsonb_build_object(
  'model_version', 'showdown-draft-indicator-v1',
  'event_id', (SELECT event_id FROM current_event),
  'generated_at', pg_catalog.now(),
  'summary', pg_catalog.jsonb_build_object(
    'approved_matches', s.approved_matches,
    'blue_wins', s.blue_wins,
    'red_wins', s.red_wins,
    'verified_order_matches', s.approved_matches
  ),
  'hero_slot_stats', coalesce((
    SELECT pg_catalog.jsonb_agg(
      pg_catalog.jsonb_build_object(
        'side', hs.side,
        'pick_order', hs.pick_order,
        'hero_id', hs.hero_id,
        'class', hs.class,
        'appearances', hs.appearances,
        'wins', hs.wins
      )
      ORDER BY hs.side, hs.pick_order, hs.hero_id
    )
    FROM hero_slot_stats hs
  ), '[]'::jsonb),
  'red12_class_stats', coalesce((
    SELECT pg_catalog.jsonb_agg(
      pg_catalog.jsonb_build_object(
        'class_1', rs.class_1,
        'class_2', rs.class_2,
        'appearances', rs.appearances,
        'residual_sum', rs.residual_sum
      )
      ORDER BY rs.class_1, rs.class_2
    )
    FROM red12_class_stats rs
  ), '[]'::jsonb)
)
FROM summary s;
$function$
;

REVOKE ALL ON FUNCTION public.ss_get_showdown_draft_indicator_stats() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ss_get_showdown_draft_indicator_stats() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ss_get_showdown_draft_indicator_stats() TO anon, authenticated;
COMMENT ON FUNCTION public.ss_get_showdown_draft_indicator_stats() IS
  'Returns current-event verified-order slot hero statistics and walk-forward RED1+RED2 class residual aggregates for showdown-draft-indicator-v1.';
