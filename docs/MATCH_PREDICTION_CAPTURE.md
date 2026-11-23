# Match prediction capture

## Purpose

The Match Indicator is calculated and stored by PostgreSQL, not by the browser. The capture trigger runs after the six rows in `ss_match_heroes` exist, so it covers both the website submission path and the local bot importer. Both currently reach the same database tables even though they use different submission RPC versions.

## Stored data

Each complete approved match has one row in `public.ss_match_predictions`, keyed by `match_id`. It stores:

- the exact BLUE and RED hero IDs in pick order;
- the map, event and match timestamp;
- the indicator score, side baselines and class-synergy contributions;
- the indicated side (or NULL when the score is neutral);
- the actual winner and whether the indicated side was correct;
- the model version and number of earlier approved matches used.

The table has RLS enabled and no browser-role access. The `service_role` can read it; prediction creation is performed by restricted database trigger functions.

## Chronology and leakage prevention

Bot imports include the original local timestamp in notes as `AFK local import: YYYYMMDD_HHMMSS_blue|red`. The migration parses this as `Europe/Warsaw` into `ss_matches.played_at`. Website submissions without a source timestamp use the database insertion time. Existing bot records were backfilled from their source timestamps; other existing records use `created_at`.

For a target match, the calculation only includes approved matches from the same event whose `played_at` is earlier. Equal timestamps are ordered by `created_at` and then match UUID. The target match itself is always excluded, even though its winner is already present when the trigger runs. This makes the saved values chronological, leakage-free historical replays rather than predictions trained on their own result.

## Important interpretation

The bot reads the winner before submitting the match. Therefore `outcome_known_at_calculation = true` is deliberate: these rows are retrospective walk-forward evaluations, not forecasts captured before the battle. They can measure how the indicator would have scored the exact lineup using only earlier match history, but must not be described as live pre-match predictions.

## Model version

`draft-indicator-rules-v1` mirrors the live Draft Indicator rules:

- BLUE and RED hero records are kept separate;
- first picks use 1.5x weight; later picks use 1x;
- hero rates are shrunk toward the side baseline with 10 prior appearances;
- side advantage is the historical BLUE baseline offset from 0.5;
- hero × partner-class synergy uses the pair residual, 30 prior appearances, 0.2 multiplier and a ±0.03 team cap;
- all maps in the event are pooled; no map, Phantimal, H2H, formation, battlefield position or player-skill adjustment is applied.

The score is a relative historical indicator, not a calibrated win probability. A NULL `predicted_side` means the score difference is within the existing neutral threshold.

## Capture behavior

An AFTER trigger on `ss_match_heroes` recalculates the stored prediction whenever the lineup is inserted, changed or removed. It only stores a prediction while the match is approved and has exactly six heroes. A status-change trigger handles later approval/rejection changes. All prediction writes share the match transaction, so a failed match submission cannot leave an orphaned prediction.
