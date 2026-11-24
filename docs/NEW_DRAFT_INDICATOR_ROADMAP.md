# New Draft Indicator — roadmap and work log

**Status:** Phases 0–4 completed; Phase 5 implementation committed — live browser QA pending  
**Last updated:** 2026-11-24  
**Repository:** `ShifterAFK/smackdown-tracker`  
**Purpose:** build a second, independent draft indicator that can be viewed beside the existing Match Indicator without changing the current indicator, Tier List, or TOP Picks.

> **Working rule:** complete one phase at a time. Before starting the next phase, update this document with the work performed, evidence, results, decisions, unresolved questions, and exact next step. Do not silently skip a phase. Do not change the production indicator while developing this one.

---

## 1. Product scope and separation

### New indicator
- A separate indicator/model with its own version identifier, calculation code, UI section/tab, explanation, and validation results.
- It must be possible to view the new indicator independently and compare its output with the existing Match Indicator during the remaining event.
- It must not overwrite, replace, or alter the current indicator.
- Keep the first implementation small: reuse existing match data and RPCs where possible; add database objects only if the audit proves they are needed.
- The new indicator must clearly label its output as an experimental historical score until it has passed prospective validation. Do not call it a win probability.

### Explicitly out of scope
- No changes to Tier List or TOP Picks.
- No refactor or formula change to the current Match Indicator.
- No manual entry of the random 20-hero pool, bans, hidden formations, or player skill.
- No attempt to infer formation/position or Battle Fervor tile occupancy from data that does not record it.
- No large ML system or separate model for every map.

### Current indicator reference
- Current implementation: `assets/js/modules/08-draft-indicator-rules-v1.js`
- Current implementation notes: `docs/MATCH_INDICATOR_CURRENT_IMPLEMENTATION.md`
- Game/data assumptions: `docs/SHOWDOWN_SMACKDOWN_ASSUMPTIONS.md`

Read both documents and inspect the active branch before every implementation phase. The current indicator is a comparison baseline, not a code dependency that the new model must share.

---

## 2. Design intent from the user

The new indicator should test the following hierarchy rather than treating all six picks as equally important:

1. **BLUE 1 and RED 1 are the primary signals.**
   - BLUE 1 opens the draft.
   - RED 1 is selected after seeing BLUE 1 and is therefore a response pick.
   - Keep BLUE 1 and RED 1 separate in analysis. Do not merge them into one undifferentiated first-pick win rate if that hides the asymmetry.
2. **A RED win after BLUE has had first choice may be a particularly informative result.**
   - The hypothesis is that RED has a harder draft position: BLUE has already taken the opening pick, and RED may have fewer strong options.
   - A RED first-pick hero that wins in this situation may be demonstrating value against the opening pick.
   - This is a hypothesis to test, not an automatic multiplier or bonus. RED must not receive a hand-written reward merely for being RED or for winning.
   - Separate the hero's own observed contribution from the fact that the other five heroes and both players also affect the result.
3. **Picks 2 and 3 are supporting context, not equal votes.**
   - They complete the composition and can matter, including through pairings, but should not automatically outweigh the opening picks.
   - A strong later-pick record may be caused by a strong first pick or by the rest of the team. Test whether later-pick information adds predictive value after first-pick information is known.
4. **Map can be a secondary modifier.**
   - First establish a reliable overall model.
   - Test map effects only after checking sample sizes and whether the effect repeats out of sample.
   - Do not infer a side-specific Battle Fervor advantage without formation/occupancy data.
5. **Formation and player execution are unobserved.**
   - Players can place heroes optimally or poorly, but the tracker does not record those placements or execution.
   - State this limitation; do not fabricate a numerical correction.

These are design priorities and hypotheses. Exact formula, shrinkage, weights, and minimum evidence are not yet approved.

---

## 3. Known draft mechanics and available data

### Pick sequence
The actual order is:
1. BLUE 1
2. RED 1
3. RED 2
4. BLUE 2
5. BLUE 3
6. RED 3

The tracker stores team side and `pick_order`, so the sequence can be reconstructed from the six selected heroes. Draft timestamps are not required for this sequence.

### Known limitations
- The random pool of 20 heroes is not recorded.
- Bans are not recorded.
- Hidden formations and battlefield positions are not recorded.
- Player skill/rank may not be consistently available as a trustworthy predictor; audit before considering it.
- Phantimal is auto-assigned from the first eligible faction pick (with the established Dimensional exception), so its effect may be difficult to isolate independently.
- Map and outcome are recorded; map effects may be testable, subject to sample size and confounding.
- Do not confuse the global HP/Vitality rules on maps with the separate Battle Fervor tile effect on Tactical Grounds.

### Existing data paths to inspect
- `ss_matches`: approved match, winner, map/theme, timestamps and any player/rank fields currently present.
- `ss_match_heroes`: hero, side, pick order and match relation.
- Existing RPCs documented in `docs/MATCH_INDICATOR_CURRENT_IMPLEMENTATION.md`: `ss_get_stats`, `ss_get_side_stats`, `ss_get_first_pick_stats`.
- Existing historical prediction table: `ss_match_predictions`. It currently stores historical replay/automatic-ingest calculations after the outcome is known; it is not a genuine pre-battle snapshot. Do not present it as prospective live validation.

Always inspect the live schema, RPC definitions, migrations, current counts, nulls, duplicates, and approved status before relying on this list.

---

## 4. Phased implementation plan

### Phase 0 — Baseline and data audit
**Status: DONE — 2026-11-24**

Tasks:
- Re-read the current indicator implementation and assumptions documents.
- Inspect the active branch and confirm current UI integration points, naming conventions, CSS/module loading, and how draft changes trigger recalculation.
- Inspect current Supabase schema/RPCs and current approved match/pick counts.
- Verify how winner, side, pick order, map/theme, mirror matches, and timestamps are represented.
- Check missing/invalid rows and whether every approved match has the expected six unique picks.
- Produce a clean analytical dataset definition and document any exclusions.
- Confirm whether player rank/identity fields can be used safely and consistently; default to not using them if quality is weak.

Deliverable:
- A concise audit in this file: exact source tables/RPCs, current row counts, data-quality findings, exclusions, and fields usable for each model feature.

Exit gate:
- No formula design based on stale counts or unverified assumptions. Phase 1 starts only after the dataset and limitations are documented.


#### Phase 0 results — live audit (2026-11-24)

**Repository/runtime audit — corrected 2026-11-24**
- The authoritative runtime entry point is `index.html`, which loads the JavaScript modules directly with script tags.
- `index.html` loads `assets/js/modules/08-draft-indicator-rules-v1.js?v=5`. This is the **actual active Match Indicator**.
- `index.html` does **not** reference `assets/js/tracker-app.js` or `assets/js/modules/order.json`. Those files are a legacy/unreferenced bundle path and must not be used to infer the active runtime.
- `assets/js/modules/08-match-estimate-script-v1.js` is not loaded by `index.html`. It is dormant and its `model_snapshots` fallback is not the current UI.
- The earlier conclusion that `08-draft-indicator-rules-v1.js` was orphaned and that the live UI used `08-match-estimate-script-v1.js` was incorrect. It is superseded by this direct inspection of every script tag in `index.html`.
- `docs/MATCH_INDICATOR_CURRENT_IMPLEMENTATION.md` correctly identifies `08-draft-indicator-rules-v1.js` as the active implementation.
- No source code or database object was changed during this audit correction.

**Supabase schema and current data**
- Project: `rwnbxhrkjjlfuljhwdpt`; current event: `showdown-current`.
- `ss_matches` contains: `id`, `submission_id`, `created_at`, `event_id`, `theme_id`, `winner`, `blue_draft_known`, `red_draft_known`, `blue_phantimal`, `red_phantimal`, `notes`, `status`, `submitter_name`, `played_at`.
- `ss_match_heroes` contains `match_id`, `side`, `pick_order`, `hero_id`; primary key is (`match_id`, `side`, `pick_order`). It stores three slots per side.
- `ss_themes` maps event/theme IDs to map names and image URLs. `ss_heroes` contains 131 heroes and all 131 have an official class.
- Current counts: **1,290 approved matches; 7,740 pick rows**.
- Data quality: 0 approved matches missing winner, event/theme, or `played_at`; 0 malformed drafts; every approved match has exactly six picks, three per side, and six unique heroes; 0 hero IDs mirrored across opposing sides; 0 exact same-three-hero rosters on both sides.
- There is one repeated exact BLUE-vs-RED roster matchup across multiple matches; do not treat those repeated games as independent player-level evidence without accounting for repetition.
- Four approved matches have both `blue_draft_known=false` and `red_draft_known=false`. They still have six stored pick rows, but their slot order is explicitly unknown. Exclude these four from all slot-/sequence-specific training and evaluation. They may remain usable for side-level roster/hero analyses where slot order is not required.
- `submitter_name` is populated in only **14/1,290** matches (1,276 missing). There is no player ID, rank, MMR, or reliable player-skill field in `ss_matches`. Do not segment or weight by player rank/skill.
- No random 20-hero pool, bans, formation, battlefield position, or Battle Fervor occupancy columns exist in the audited match/pick tables.
- Phantimal values are recorded for all approved matches and none are `Unknown`/`None`; however, Phantimal is derived from the opening eligible faction pick and is not an independent random treatment. Keep it out of the core first-pick model unless a later phase proves incremental value.

**Map coverage and side baseline**
| Map | Matches | BLUE wins | RED wins |
|---|---:|---:|---:|
| Tranquil Grounds | 115 | 70 | 45 |
| Top Defender | 209 | 110 | 99 |
| Siegebreaker | 191 | 116 | 75 |
| Fierce Duel | 414 | 231 | 183 |
| Tactical Grounds | 361 | 179 | 182 |
| **Total** | **1,290** | **706** | **584** |

Overall BLUE win rate is **54.73%** (706/1,290); RED is **45.27%**. This is descriptive side balance, not evidence that the first pick alone causes the difference.

**Important interpretation of slot counts**
- Each of BLUE 1/2/3 appears in 1,290 matches and has 706 wins; each RED 1/2/3 appears in 1,290 matches and has 584 wins. This is mechanically the same match outcome repeated across all three picks on a side. These aggregate slot win rates do **not** tell us whether pick 1 is more valuable.
- Phase 1 must compare hero-level performance by slot and use leakage-safe match-level modelling; do not infer slot value from raw aggregate win rates.

**Existing RPCs checked**
- `ss_get_stats(p_theme_id, p_exclude_mirrors)`
- `ss_get_side_stats(p_theme_id, p_exclude_mirrors)`
- `ss_get_first_pick_stats()`
- `ss_get_config()`
- `ss_get_first_pick_stats()` has a known status-filter weakness: approved status is in a LEFT JOIN condition rather than a WHERE clause, so picks from a nonapproved match could still be counted if such rows existed. Current database has zero nonapproved matches/picks, so no current impact. For new analysis, use direct approved-match joins or a corrected query rather than relying on this RPC.
- `ss_get_side_stats` supports theme and mirror filtering. Current approved data has no hero mirrored across sides, so mirror exclusion currently removes no rows.

**Analytical dataset definition for Phase 1**
- Base population: `ss_matches.status='approved'` joined to `ss_match_heroes` on `match_id`, scoped to event `showdown-current`.
- Outcome: `winner` (BLUE/RED).
- Features: hero IDs, side, pick order, theme/map, `played_at`, draft-known flags, and recorded Phantimal (the latter only as an audited candidate, not assumed independent).
- For slot-/sequence-specific analyses, require both draft-known flags true; this leaves **1,286 matches**.
- Chronological ordering: `played_at`, with `created_at` and match ID as deterministic tie-breakers.
- Exclude no matches for mirror status at present (none are mirrored). Do not use `submitter_name` as player identity.
- The historical `ss_match_predictions` rows are calculated after outcome is known (`outcome_known_at_calculation=true`); they are not prospective pre-battle forecasts. Use chronological replay with target-match exclusion for offline evaluation, and keep it labelled as replay.

**Phase 0 decisions**
- Phase 1 will use the 1,286 draft-known matches for slot-/sequence-aware work.
- The four unknown-order matches are excluded only where pick-slot truth is required; do not discard them from every possible analysis by default.
- Player rank/skill segmentation is unavailable and out of scope.
- No schema or RPC changes are needed for the initial analytical study; the existing tables contain the fields needed for first-pick and map analysis.
- The actual current UI baseline is the loaded `match-estimate-script-v1` fallback, not the unbundled `draft-indicator-rules-v1` file. Preserve both existing code paths untouched during the new indicator work.

**Files and branches inspected**
- `assets/js/modules/order.json` on `main` and `development`
- `assets/js/tracker-app.js` on `main`
- `assets/js/modules/08-match-estimate-script-v1.js`
- `assets/js/modules/08-draft-indicator-rules-v1.js` (exists, not bundled)
- `assets/js/modules/00-core.js`
- `assets/js/modules/02-tracker-shared-data-v1.js`
- `index.html`
- Supabase migrations through `20261123190906_capture_chronological_draft_predictions`
- Read-only SQL checks against `ss_matches`, `ss_match_heroes`, `ss_themes`, `ss_heroes`, `ss_match_predictions`, and `model_snapshots`.


### Phase 0 audit results — 2026-11-24

#### Live Supabase snapshot

Project: `rwnbxhrkjjlfuljhwdpt`. Inspected public tables, migration history, column metadata, and live function definitions.

- `ss_matches`: 1,303 rows; all 1,303 are `approved`.
- `ss_match_heroes`: 7,818 rows.
- Every approved match has exactly 6 pick rows, exactly 3 BLUE and 3 RED, exactly 6 distinct heroes, and exactly one recorded pick_order=1 per side.
- 131/131 heroes have an official class.
- No mirrored matches found (same hero on both sides).
- One event is configured: `showdown-current`.
- Map distribution:
  - Fierce Duel: 414
  - Tactical Grounds: 374
  - Top Defender: 209
  - Siegebreaker: 191
  - Tranquil Grounds: 115
- Outcomes: BLUE 713 (54.72%), RED 590 (45.28%). This is descriptive baseline only, not proof of a first-pick effect.
- All approved matches are covered by `ss_match_predictions`: 1,303/1,303. All rows have `outcome_known_at_calculation=true`; 1,120 are `historical_replay`, 183 are `automatic_ingest`. History used ranges from 0 to 1,302 matches (median 651). These are not prospective predictions.

#### Draft-order reliability caveat

- 1,299 matches have both `blue_draft_known=true` and `red_draft_known=true`.
- 4 matches have both flags false.
- Those four still contain six heroes with slot values 1–3, but the flags explicitly say the draft order was not known. Do not use their slot 1 rows as verified First Picks in Phase 1. Exclude them from slot/order analyses unless another source independently confirms the order.
- The existing `ss_get_first_pick_stats()` function does not filter on `blue_draft_known` / `red_draft_known`; its first-pick aggregates therefore include these four uncertain records. New analysis must query the source tables with the known-order flags, not blindly reuse this RPC output.
- The four exceptions are:
  - 2026-11-14, Top Defender, Berial / Himmel / Daimon vs Athalia / Ludovic / Peggy (RED won)
  - 2026-11-16, Top Defender, Hodgkin / Salazer / Peggy vs Natsu / Daimon / Rhys (RED won)
  - 2026-11-16, Top Defender, Eironn / Gwyneth / Dunlingr vs Kazim / Brutus / Solise (BLUE won)
  - 2026-11-17, Siegebreaker, Dunlingr / Shemira / Ravion vs Natsu / Aurora / Yamato (BLUE won)
  These are listed in stored slot order, not asserted to be actual pick order.

#### Time ordering and source provenance

- `played_at` is populated for all approved matches.
- 1,046 imported matches have `played_at < created_at`; their notes use the importer format `AFK local import: YYYYMMDD_HHMMSS_blue|red`, and the migration converts that Europe/Warsaw timestamp into `played_at`.
- 257 website submissions have `played_at = created_at`.
- No timestamp collisions were found among the 1,303 approved matches.
- Chronological walk-forward can therefore use `played_at`, with `created_at` and ID as deterministic tie-breakers (although no collisions currently exist).

#### Available and unavailable features

Available and verified:
- outcome, event, map/theme, played_at, created_at, approval status;
- team side and per-side pick_order;
- selected hero IDs, hero names, faction and official class;
- Phantimal values (none of the current approved records have Unknown/None values);
- draft-order-known flags.

Not available as reliable model inputs:
- player IDs, opponent IDs, player rank/MMR or individual skill;
- random 20-hero pool and bans;
- formation, battlefield placement and Battle Fervor tile occupancy.

`submitter_name` is populated in only 14/1,303 records and identifies the submitter field, not a verified player identity. It must not be treated as player-skill data. No separate player/rank columns exist in `ss_matches`.

#### Existing RPCs and implementation points inspected

- `ss_get_stats(p_theme_id, p_exclude_mirrors)`: current-event aggregate hero/duo/Phantimal stats; caches payload for five minutes.
- `ss_get_side_stats(p_theme_id, p_exclude_mirrors)`: side-specific hero stats; filters approved matches.
- `ss_get_first_pick_stats()`: first-pick and later-pick aggregates, but does not filter unknown draft-order flags and does not explicitly scope to current event. Do not use it as the authoritative Phase 1 source.
- `ss_calculate_draft_indicator(uuid)`: chronological replay for the existing v1 indicator, excludes target match and uses earlier approved matches; not a live pre-result capture.
- Current frontend: `index.html` loads `00-core.js`, then `08-draft-indicator-rules-v1.js` as a classic script. The current indicator injects a section next to `#winnerPicker` and listens to `tracker:draft-changed`, `tracker:draft-reset`, catalog/session and submission events. A separate module can be added without changing the current formula or Tier List, using the same draft state/events.
- The draft UI/help documents the sequence BLUE 1 → RED 1 → RED 2 → BLUE 2 → BLUE 3 → RED 3.

#### Phase 0 decisions

- Use direct SQL over `ss_matches` + `ss_match_heroes` as the canonical source for new model analysis; always filter `status='approved'`.
- For any analysis of pick slots, require both side-specific draft-known flags to be true; at minimum exclude all 4 uncertain-order matches from Phase 1.
- Use `played_at` chronology with deterministic tie-breakers.
- Do not attempt player/rank adjustments; the data does not support them.
- Existing prediction rows are useful only as a comparator and must remain labelled outcome-known.
- No code, database schema, RPC, or live data was modified during Phase 0.

#### Phase 0 exit gate

**Passed.** Dataset, fields, quality caveats, chronology, current UI integration point, and exclusions are documented. Phase 1 can now begin using the verified-order subset (1,299 matches).

### Phase 1 — First-pick signal study (core of the new model)
**Status: DONE — 2026-11-24**

Tasks:
- Calculate separate BLUE 1 and RED 1 results for every hero: appearances, wins, losses, win rate, and uncertainty.
- Analyse RED 1 specifically as the response to the actual BLUE 1 hero. Show pairings/conditional outcomes only where sample size is visible; do not call a small-sample association a counter.
- Compare hero performance against the relevant side baseline so a hero is not rewarded merely for appearing more often on the historically stronger side.
- Test whether RED victories after BLUE 1 contain a repeatable signal beyond the general RED baseline and beyond the individual hero's ordinary record.
- Check whether any apparent RED advantage is actually caused by specific BLUE 1 choices, map distribution, repeated players, or other observable confounders.
- Compare simple candidate baselines (always BLUE, side-only, BLUE 1 only, RED 1 only, both first picks) using chronological walk-forward evaluation.

Deliverable:
- Tables and a short interpretation of BLUE 1, RED 1, and RED-as-response evidence.
- A recommended first-pick score design, with explicit uncertainty and no arbitrary RED multiplier.

Exit gate:
- Agree on what information is genuinely predictive and what is merely descriptive before implementing the formula.


#### Phase 1 results — first-pick evidence (snapshot 2026-11-24)

**Dataset and method**
- Snapshot used for this phase: **1,294 approved matches**, of which **1,290** had both draft-order flags known and **4** had unknown order. The 1,290 known-order matches were used.
- Latest `played_at` in the extracted dataset: `2026-11-24 18:05:46.479996+00`.
- Chronological order: `played_at`, `created_at`, match ID.
- First 60 matches were warm-up history; next **1,230 matches** were the test window.
- Each test match was scored before its result was added to history. The model used no target-match result or future match data.
- Side baseline and hero first-pick history were updated only after each evaluated match.
- Candidate lift: smoothed first-pick hero win rate minus the relevant side's prior win rate. Smoothing used 5, 10, or 20 pseudo-appearances in the sensitivity check.
- Candidate score:
  `delta = (prior BLUE win rate - 0.5) + BLUE1_lift - RED1_lift`.
  Positive points to BLUE; negative points to RED. This is a score-direction experiment, not probability.
- BLUE1-only and RED1-only variants remove the opposite hero-lift term. Side-only stayed on BLUE throughout the test window, so it was identical to always-BLUE.

**Chronological walk-forward results**
| Candidate | Correct / test | Accuracy over all test matches | Coverage |
|---|---:|---:|---:|
| Always BLUE / side-only | 668 / 1,230 | 54.31% | 100% |
| BLUE 1 only, k=10 | 666 / 1,230 | 54.15% | 98.13% |
| RED 1 only, k=10 | 638 / 1,230 | 51.87% | 96.59% |
| BLUE 1 + RED 1, k=10 | **679 / 1,230** | **55.20%** | 97.89% |

For the combined k=10 model, accuracy among its 1,204 non-neutral predictions was **56.40%**. It predicted RED 316 times and was correct on 170 of those (53.80%); it predicted BLUE 888 times and was correct on 509 (57.32%). The 26 neutral cases are abstentions, not correct predictions.

**Smoothing sensitivity**
| Combined first-pick model | Correct / test | Accuracy over all test matches | Coverage |
|---|---:|---:|---:|
| k=5 | 681 / 1,230 | 55.37% | 97.56% |
| k=10 | 679 / 1,230 | 55.20% | 97.89% |
| k=20 | 666 / 1,230 | 54.15% | 97.24% |

The small differences are sensitive to the smoothing choice. Do not select k=5 merely because it scored highest on this same test window.

**Paired comparison with always-BLUE**
- For k=10, among matches where the combined model made a directional prediction, it corrected 170 outcomes that always-BLUE missed, but got 146 wrong where always-BLUE was right.
- Exact two-sided McNemar/binomial p-value: **0.1956**. This is not statistically persuasive evidence that the candidate is better than always-BLUE.
- The net gain over always-BLUE is only **11 correct outcomes in 1,230 matches** when neutral outputs are counted as no correct call. Do not claim a proven improvement.

**Stability across time and maps (k=10 combined model; descriptive only)**
| Test segment / map | Matches | Always BLUE | First-pick model |
|---|---:|---:|---:|
| Early chronological third | 410 | 56.10% | 53.66% |
| Middle chronological third | 410 | 57.56% | 56.34% |
| Late chronological third | 410 | 49.27% | 55.61% |
| Tranquil Grounds | 55 | 58.18% | 54.55% |
| Top Defender | 206 | 52.91% | 54.85% |
| Siegebreaker | 190 | 60.53% | 54.74% |
| Fierce Duel | 414 | 55.80% | 56.04% |
| Tactical Grounds | 365 | 49.59% | 54.79% |

The combined first-pick signal did not beat always-BLUE in the early or middle chronological thirds, but did in the late third. By map, it helped on some maps and hurt on others. This is not a stable, map-independent improvement; map and time/meta shifts may explain part of the apparent gain. No map adjustment was fitted in Phase 1.

**Hero-level first-pick observations**
- BLUE1 used **87 distinct heroes**; RED1 used **100**.
- BLUE1 examples (full-event descriptive records; 95% Wilson intervals):
  - Karma: 39/52, **75.0%** (61.8–84.8%)
  - Lamentis: 28/38, **73.7%** (58.0–85.0%)
  - Aurora: 34/51, **66.7%** (53.0–78.0%)
  - Berial: 33/53, **62.3%** (48.8–74.1%)
  - Baelran: 27/67, **40.3%** (29.4–52.3%)
  - Athalia: 24/56, **42.9%** (30.8–55.9%)
- RED1 examples (full-event descriptive records; 95% Wilson intervals):
  - Dionel: 20/30, **66.7%** (48.8–80.8%)
  - Aliceth: 24/39, **61.5%** (45.9–75.1%)
  - Karma: 14/18, **77.8%** (54.8–91.0%)
  - Yamato: 15/24, **62.5%** (42.7–78.8%)
  - Peggy: 6/30, **20.0%** (9.5–37.3%)
  - Hodgkin: 5/21, **23.8%** (10.6–45.1%)
- These are team-result associations, not causal hero values or guaranteed counter strengths. Intervals are broad, especially for RED1 picks with smaller samples.

**RED1 as a response to BLUE1**
- The known-order dataset contains **913 distinct BLUE1→RED1 hero pairings**.
- Only 254 pairings occurred at least twice, 80 at least three times, 23 at least four times, and 12 at least five times.
- The most repeated pairing occurred only eight times. This is too sparse to infer reliable specific counter-pick effects or add a BLUE1×RED1 interaction term.
- RED1 by itself underperformed the side-only baseline in walk-forward testing. Adding RED1's side-specific first-pick lift to BLUE1's lift produced a small gain, but the paired comparison was not significant.
- Therefore, do **not** add a fixed RED response bonus. If a first-pick layer is retained for further testing, use the two side-specific hero lifts symmetrically around the side prior; do not claim that RED has a general counter advantage.

**Phase 1 decision**
- Carry the candidate first-pick layer into Phase 2 as a baseline feature: `side_prior + BLUE1_lift - RED1_lift`.
- Keep k=10 as the provisional comparison setting (not a final tuned parameter); retain k=5 and k=20 as sensitivity checks.
- Do not implement this formula in production yet. Its observed improvement is small, not statistically persuasive, and varies by map/time.
- Do not add direct BLUE1-versus-RED1 counter bonuses: pair evidence is too sparse.
- Phase 2 must test whether picks 2/3 and sequence/composition information add incremental predictive value beyond this first-pick baseline.


### Phase 1 results — First Pick and RED response study

**Frozen analysis cutoff:** `2026-11-24 18:33:53.533213+00`  
**Dataset at cutoff:** 1,305 approved matches; 1,301 have both draft-order-known flags true.  
**Walk-forward test:** first 60 verified-order matches used as warm-up; next **1,241 matches** evaluated. No target match was included in its own historical hero or side statistics.

#### Method

- Canonical source: `ss_matches` joined to `ss_match_heroes`; only `status='approved'`.
- Slot analysis requires both `blue_draft_known=true` and `red_draft_known=true`.
- BLUE and RED first-pick hero history was calculated only from earlier verified-order matches.
- Side baseline used all earlier approved match outcomes.
- Tested candidate shrinkage values (k=5,10,20):
  `smoothed_WR = (hero_first_pick_wins + side_baseline * k) / (hero_first_pick_appearances + k)`.
- Candidate score:
  `BLUE side prior + BLUE 1 lift - RED 1 lift`.
- Neutral threshold: absolute score below 0.005. Directional accuracy excludes neutral predictions; total accuracy counts neutral as misses.
- This is a simple candidate model, not a final approved formula.

#### Walk-forward results

| Candidate | k | Coverage | Correct | Directional accuracy | Total accuracy |
|---|---:|---:|---:|---:|---:|
| Always BLUE | — | 1,241 | 675 | 54.39% | 54.39% |
| Side baseline | — | 1,241 | 675 | 54.39% | 54.39% |
| BLUE 1 only | 5 | 1,223 | 686 | 56.09% | 55.28% |
| RED 1 only | 5 | 1,222 | 665 | 54.42% | 53.59% |
| BLUE 1 + RED 1 | 5 | 1,211 | 689 | 56.90% | 55.52% |
| BLUE 1 + RED 1 | 10 | 1,215 | 687 | 56.54% | 55.36% |
| BLUE 1 + RED 1 | 20 | 1,209 | 674 | 55.75% | 54.31% |

The combined first-pick candidate beats the side baseline by 1.13 percentage points in total accuracy at k=5 and by 0.97 points at k=10. At k=20 it does not beat the baseline. RED 1 alone is weaker than the side baseline. BLUE 1 alone adds some signal, but the incremental value of RED 1 depends on shrinkage.

#### Stability and map confounding

At k=10, the combined first-pick candidate's total accuracy by chronological test third:
- Early: 53.75% vs side baseline 56.17%.
- Middle: 56.76% vs side baseline 57.25%.
- Late: 55.56% vs side baseline 49.76%.

These are not clean independent time regimes: the test thirds align strongly with map rotation:
- Warm-up: 60 Tranquil Grounds matches.
- Early: 152 Siegebreaker, 206 Top Defender, 55 Tranquil Grounds.
- Middle: 376 Fierce Duel, 38 Siegebreaker.
- Late: 38 Fierce Duel, 376 Tactical Grounds.

Per-map comparison of the pooled first-pick candidate (k=10) against the global side baseline showed:
- Fierce Duel: 56.04% vs 55.80% (414 tests).
- Siegebreaker: 54.74% vs 60.53% (190 tests).
- Tactical Grounds: 55.20% vs 50.00% (376 tests).
- Top Defender: 54.85% vs 52.91% (206 tests).
- Tranquil Grounds: 54.55% vs 58.18% (55 tests).

The effect is not uniform across maps. The apparent late-period gain is strongly entangled with the map mix; it must not be interpreted as a stable time trend or a universal first-pick advantage. Map-specific hero adjustments remain Phase 3 work.

A preliminary map-side baseline experiment combined with pooled first-pick lifts did not establish a robust advantage over the global baseline. Do not add a map-side prior to the new indicator based on this experiment alone.

#### Raw first-pick examples (descriptive only; minimum 20 appearances)

BLUE 1:
- Karma: 39/52 (75.0%).
- Lamentis: 29/39 (74.4%).
- Baelran: 27/67 (40.3%).
- Athalia: 24/56 (42.9%).
- Hepler: 7/20 (35.0%).

RED 1:
- Dionel: 20/30 (66.7%).
- Natsu: 15/24 (62.5%).
- Aliceth: 24/39 (61.5%).
- Peggy: 6/30 (20.0%).
- Hodgkin: 5/21 (23.8%).
- Cryonaia: 6/20 (30.0%).

These raw rates are side- and map-mix dependent and are not causal hero ratings. Some same-hero side differences are large (e.g. Dunlingr 61.3% BLUE 1 vs 38.9% RED 1; Aurora 66.7% vs 45.8%), which supports keeping side/slot context separate rather than using one global first-pick win rate.

#### Can we learn direct RED 1 counters to BLUE 1?

At the frozen cutoff:
- 1,301 verified-order matches.
- 87 distinct BLUE 1 heroes and 101 distinct RED 1 heroes.
- 918 distinct BLUE 1 × RED 1 hero pairs.
- 660 pairs appear once; 177 appear twice; 69 appear 3–4 times.
- Only 12 pairs have 5+ appearances; no pair reaches 10; maximum is 8.

This is far too sparse to estimate reliable exact-hero counter bonuses. The combined first-pick model's RED 1 contribution is the RED hero's side-specific historical first-pick lift, not a proven counter interaction against the specific BLUE 1 hero. The random pool and bans are unknown, so we cannot establish which alternative RED responses were available.

#### Phase 1 decisions

1. **Keep BLUE 1 and RED 1 as separate candidate features** for further testing; do not collapse them into one generic first-pick stat.
2. BLUE 1 contains useful historical signal in pooled walk-forward tests, but the gain is modest and varies by map.
3. RED 1 alone is not a strong direction predictor. It may add a small amount of information when combined with BLUE 1, but this is not yet stable enough to approve a production weight.
4. **No direct BLUE 1 → RED 1 hero-counter bonus**: pair samples are too sparse.
5. No fixed RED multiplier, no fixed first-pick weight, and no production formula selected yet.
6. Map composition materially affects observed results. Phase 3 must account for this before the final formula is approved.
7. Player/rank confounding cannot be measured with the current schema; no player skill adjustment.

**Phase 1 exit gate: passed with a constrained conclusion.** We identified first-pick signals worth retaining as candidate inputs, rejected unsupported exact counter bonuses, and documented map confounding. This is enough to move to Phase 2; it is not enough to implement the final indicator formula.

### Phase 2 — Later-pick / composition contribution
**Status: DONE — 2026-11-24**

Tasks:
- Measure pick 2 and pick 3 separately by side and slot.
- Test whether later picks improve predictions after BLUE 1 and RED 1 are already included.
- Check whether the RED 1 + RED 2 sequence and BLUE 2 + BLUE 3 sequence reveal a measurable allocation/composition signal.
- Test hero-pair/class interaction only as residual value beyond individual hero strength; avoid counting the same strong hero signal multiple times.
- Keep later picks as a restrained supporting layer unless out-of-sample results demonstrate otherwise.

Deliverable:
- Evidence showing the incremental value (or lack of value) of later picks and composition.
- A decision on which later-pick signals, if any, enter the new model.

Exit gate:
- No DUO/composition bonus enters the model solely because it sounds strategically plausible.


#### Phase 2 results — later picks and composition (snapshot 2026-11-24)

**Dataset and method**
- Extracted **1,291 matches with both draft-order flags known**; four other approved matches remained excluded because their order flags were unknown.
- Chronological order; first 60 matches were warm-up. Test set: **1,231 matches**.
- For every side and exact pick slot, hero lift was calculated from only earlier appearances in that same side+slot, smoothed toward the prior side win rate with k=10.
- Slot model:
  `delta = side_prior + Σ weight[slot] × (BLUE_slot_lift - RED_slot_lift)`.
- This tests the value of hero identity at each pick slot. It does not simulate the unseen 20-hero pool, bans, or which strong heroes remained available.
- Same target-match exclusion and chronological update rules as Phase 1.

**Walk-forward slot-weight results**
| Slot weights (BLUE/RED symmetric) | Correct / test | Accuracy over all test matches | Coverage |
|---|---:|---:|---:|
| First only [1, 0, 0] | 680 / 1,231 | 55.24% | 97.89% |
| First 1 + later 0.5 [1, 0.5, 0.5] | 693 / 1,231 | 56.30% | 97.32% |
| All equal [1, 1, 1] | 699 / 1,231 | 56.78% | 98.21% |
| Later picks only [0, 0.5, 0.5] | 661 / 1,230 in the immediately preceding 1,290-match snapshot | 53.74% | 96.91% |

The later slots alone are weak. In combination with the first picks, later-slot hero information can add signal. However, paired comparisons on the same 1,231-match test window did **not** show a statistically persuasive improvement over the first-pick model:
- [1, 0.5, 0.5] vs first-only: 90 discordant cases in its favour vs 77 against; exact p=0.3531.
- [1, 1, 1] vs first-only: 157 discordant cases in its favour vs 142 against; exact p=0.4182.

Weight sensitivity was substantial. Additional candidates scored:
- [1.5, 0.5, 0.5]: 697/1,231 (56.62%);
- [1.5, 1, 1]: 701/1,231 (56.95%);
- [2, 1, 1]: 704/1,231 (57.19%).

These are exploratory comparisons on the same test set, not an untouched validation. Do not select the highest weight combination from these results; doing so would tune to the test data.

**Temporal and map stability**
The equal-slot model's apparent gains were concentrated in the late chronological third:
| Segment | Matches | Always BLUE | First-only | First + later 0.5 | All equal |
|---|---:|---:|---:|---:|---:|
| Early | 411 | 56.20% | 53.77% | 54.26% | 55.72% |
| Middle | 410 | 57.56% | 56.34% | 55.61% | 55.12% |
| Late | 410 | 49.27% | 55.61% | 59.02% | 59.51% |

By map (same test window):
| Map | Matches | Always BLUE | First + later 0.5 | All equal |
|---|---:|---:|---:|---:|
| Tranquil Grounds | 55 | 58.18% | 50.91% | 47.27% |
| Top Defender | 206 | 52.91% | 53.40% | 57.77% |
| Siegebreaker | 190 | 60.53% | 58.42% | 56.32% |
| Fierce Duel | 414 | 55.80% | 54.59% | 55.56% |
| Tactical Grounds | 366 | 49.73% | 59.56% | 59.29% |

The signal changes materially by time and map. This supports testing map context in Phase 3; it does not justify a map bonus yet.

**Slot sample breadth**
Distinct heroes seen in each side+slot in the extracted dataset:
- BLUE slots 1/2/3: 87 / 106 / 108.
- RED slots 1/2/3: 100 / 108 / 107.

**Pick-pair / sequence sparsity**
Exact pair counts in the same dataset:
| Pair of slots | Distinct hero pairs | Repeated ≥2 | Repeated ≥3 | Repeated ≥5 | Max appearances |
|---|---:|---:|---:|---:|---:|
| BLUE 2 + BLUE 3 | 1,064 | 189 | 29 | 2 | 6 |
| RED 1 + RED 2 | 962 | 238 | 71 | 6 | 7 |
| BLUE 1 + BLUE 2 | 975 | 225 | 67 | 4 | 5 |
| RED 2 + RED 3 | 1,063 | 192 | 31 | 1 | 5 |

RED 1+2 pairs repeat more often than BLUE 2+3, but exact pairs remain sparse. Because the random pool and bans are unavailable, we cannot calculate which high-value heroes were still available when RED 1+2 or BLUE 2+3 were selected.

**Pair and class residual experiment**
- Tested a conservative online residual beyond slot-specific individual hero lifts. Each pair's expected result was based on the side baseline plus the two heroes' slot-specific lifts; only the historical residual was eligible for a later prediction.
- Compared the all-equal slot model (699/1,231) with:
  - hero × partner-class residual: **697/1,231**;
  - exact-pair residual: **703/1,231**.
- Pairwise comparison of exact-pair residual vs the slot-only model changed only one non-neutral directional call in favour of the pair model and none against; the small apparent gain was mostly coverage/neutral changes. Class residual changed 6 directional calls in its favour and 5 against. Neither demonstrates meaningful incremental pair value.
- Exact-pair history covered 4,715 distinct side+pair keys; class interaction history covered 1,297 side+hero+partner-class groups. Despite more class aggregation, the class residual did not improve the result.
- This supports keeping synergy out of the first release. It avoids counting the same hero strength multiple times and avoids an unsupported composition bonus.

**Phase 2 decisions**
- Later picks contain some additional information when combined with first picks, but later picks alone are not useful enough.
- Keep BLUE1 and RED1 as the primary layer. Keep slots 2 and 3 as supporting candidates; do not give them equal priority by default.
- Do not choose final weights from this exploratory test. Retain [1, 0.5, 0.5] and [1.5, 1, 1] as candidate settings for Phase 3/4 comparison, not approved production weights.
- Do not include exact-pair or hero×partner-class synergy in the initial new model; neither showed convincing incremental value.
- Do not claim that RED1+RED2 has a proven sequence advantage over BLUE2+BLUE3. The pair counts are too sparse and the unseen pool/bans prevent availability modelling.


### Phase 2 results — later picks and class-pair residuals

**Frozen snapshot:** same Phase 1 snapshot, with both `played_at` and `created_at` capped at `2026-11-24 18:33:53.533213+00`: 1,305 approved matches, 1,301 verified-order matches, 4 uncertain-order matches.  
**Walk-forward test:** first 60 verified-order matches as warm-up; 1,241 test matches. All hero-slot history is computed only from earlier verified-order matches. Side baseline uses earlier approved match outcomes.  
**Metric rule:** a prediction with `abs(score) < 0.005` is neutral and is excluded from the directional-accuracy numerator and denominator; it counts as a miss in total accuracy. An intermediate exploratory aggregation initially failed to exclude neutral scores from its correct count; it was discarded and all results below use the corrected filter.

#### 1. Individual later-pick slot value

Hero lifts are calculated separately for each side and exact pick slot, shrunk toward that side's historical win rate with (k=10) or (k=20). Each candidate adds one later-slot lift to the Phase 1 BLUE 1 + RED 1 score.

| Candidate | k | Coverage | Correct | Directional accuracy | Total accuracy |
|---|---:|---:|---:|---:|---:|
| First picks only | 10 | 1,215 | 687 | 56.54% | 55.36% |
| Add RED 2 | 10 | 1,214 | 700 | 57.66% | 56.41% |
| Add BLUE 2 | 10 | 1,223 | 674 | 55.11% | 54.31% |
| Add BLUE 3 | 10 | 1,199 | 689 | 57.46% | 55.52% |
| Add RED 3 | 10 | 1,216 | 685 | 56.33% | 55.20% |
| All later slots, slot-specific | 10 | 1,218 | 704 | 57.80% | 56.73% |
| All later slots, slot-specific | 20 | 1,215 | 703 | 57.86% | 56.65% |

At k=20:
- Add RED 2: 688/1,241 (55.44% total).
- Add BLUE 2: 667/1,241 (53.75%).
- Add BLUE 3: 681/1,241 (54.88%).
- Add RED 3: 684/1,241 (55.12%).

Interpretation:
- RED 2 is the strongest individual later-slot addition in this pooled test.
- BLUE 3 adds a smaller positive signal.
- RED 3 adds a modest/weak signal.
- BLUE 2 does not improve this candidate and is negative in this test.
- All later slots together improve over first picks by 17 correct matches at k=10 (+1.37 percentage points total accuracy). The k=20 result is also positive.
- This is slot-specific historical association, not proof that a slot itself causes the result. The model does not know the unrecorded available hero pool or which alternatives were left.

#### 2. Pool later slots or keep them separate?

A separate candidate pools each hero's appearances across pick_order 2 and 3 on the same side, while still evaluating the current four later picks individually.

- Pooled later history, k=10: 701/1,241 (56.49% total).
- Pooled later history, k=20: 706/1,241 (56.89% total).
- Slot-specific later history, k=10: 704/1,241 (56.73% total).
- Slot-specific later history, k=20: 703/1,241 (56.65% total).

Neither approach dominates at every shrinkage value. Slot-specific history captures the strong RED 2 / weaker BLUE 2 distinction; pooled history has slightly better total accuracy at k=20. Keep both as candidates for Phase 3 comparison; do not pick a final weight yet.

#### 3. Exact hero-pair interactions are too sparse

At the frozen snapshot:
- RED 1 + RED 2: 1,071 distinct hero pairs; 897 appear once, 131 twice, 42 appear 3–4 times, only 1 appears at least 5 times, none reaches 10 (maximum 7).
- BLUE 2 + BLUE 3: 1,171 distinct hero pairs; 1,052 appear once, 110 twice, 9 appear 3–4 times, none reaches 5 (maximum 4).

Do not add exact hero-pair bonuses for these sequences. The sample does not support reliable exact-pair estimates.

#### 4. Test class-pair residual beyond individual hero strength

A pooled class interaction was tested without giving a class pair credit for the heroes' individual records:

1. Calculate all six heroes' side- and slot-specific historical lifts using only prior matches.
2. Estimate each team's expected result from its side baseline plus all three individual hero lifts, clamped to 5–95%.
3. Calculate each historical team's residual: actual result minus that expected result.
4. Aggregate prior residuals for the ordered class pair:
   - RED 1 class + RED 2 class;
   - BLUE 2 class + BLUE 3 class.
5. Shrink the class-pair residual toward zero with 15, 30, or 60 prior appearances.
6. Add BLUE's class residual and subtract RED's class residual from the slot-specific score.

There are 36 ordered official-class combinations for each sequence:
- RED 1 + RED 2: group sizes 12–60; all 36 have at least 10 matches, 31 have at least 20.
- BLUE 2 + BLUE 3: group sizes 16–67; all 36 have at least 10 matches, 35 have at least 20.

Walk-forward results:

| Model | Coverage | Correct | Directional accuracy | Total accuracy |
|---|---:|---:|---:|---:|
| Slot-specific heroes only | 1,218 | 704 | 57.80% | 56.73% |
| + RED 1/RED 2 class residual only (k=30) | 1,225 | 722 | 58.94% | 58.18% |
| + BLUE 2/BLUE 3 class residual only (k=30) | 1,224 | 705 | 57.60% | 56.81% |
| + both class residuals (k=15) | 1,219 | 726 | 59.56% | 58.50% |
| + both class residuals (k=30) | 1,219 | 723 | 59.31% | 58.26% |
| + both class residuals (k=60) | 1,225 | 723 | 59.02% | 58.26% |

This suggests the RED 1 + RED 2 class combination carries most of the incremental class-residual signal. BLUE 2 + BLUE 3 class residual alone adds almost nothing. This is a promising experimental feature, not a production-approved bonus.

#### 5. Stability of class-pair residual (k=30)

By chronological test third:
- Early: 57.14% total vs 55.69% slot-specific.
- Middle: 57.97% vs 55.31%.
- Late: 59.66% vs 59.18%.

The chronological thirds align with map rotation, so this is not independent evidence of time stability.

By map:
- Fierce Duel: 58.70% vs 55.56% (414 tests).
- Siegebreaker: 59.47% vs 56.32% (190).
- Tactical Grounds: 59.04% vs 59.04% (376).
- Top Defender: 55.83% vs 57.77% (206).
- Tranquil Grounds: 54.55% vs 47.27% (55).

It improves on three maps, is unchanged on Tactical Grounds, and is worse on Top Defender. Tranquil Grounds has only 55 post-warm-up test matches. This reinforces the need for Phase 3 map analysis before selecting the final feature or weight.

#### Phase 2 decisions

1. Carry RED 2 and BLUE 3 forward as the strongest later-slot candidates; keep BLUE 2 and RED 3 separate rather than assuming equal value.
2. Carry both pooled-later and slot-specific-later variants to Phase 3; do not choose a final shrinkage/weight yet.
3. Carry the RED 1 + RED 2 ordered class-pair residual as a promising candidate for Phase 3.
4. Do not add exact hero-pair bonuses for RED 1 + RED 2 or BLUE 2 + BLUE 3; repeated hero pairs are too rare.
5. Do not add a BLUE 2 + BLUE 3 class residual by itself; it showed negligible incremental value.
6. The class-pair residual is measured beyond all three individual hero lifts, not from raw pair win rate.
7. No production formula, code, or database change is approved at this stage. Map effects may change these results.

**Phase 2 exit gate: passed.** We identified which later slots add signal, rejected unsupported exact hero-pair interactions, and found a candidate RED 1 + RED 2 class residual that merits map-aware testing. Proceed to Phase 3 before choosing final weights.

### Phase 3 — Map context
**Status: DONE — 2026-11-24**

Tasks:
- Establish per-map sample sizes and side balance.
- Test whether first-pick and later-pick effects vary by map.
- Test a pooled model with conservative map adjustments against the same model without map adjustments.
- Keep global hero strength as the base; do not create five unrelated map-specific models.
- Treat Tactical Grounds' Battle Fervor tile as unobservable at team level unless the tracker gains actual formation/occupancy data.

Deliverable:
- Per-map evidence, sample-size warnings, and a keep/drop decision for map adjustment.

Exit gate:
- Map adjustment is included only if it improves chronological out-of-sample performance and is stable enough to justify the extra complexity.


#### Phase 3 results — map context (snapshot 2026-11-24)

**Map coverage and temporal confounding**
Latest read-only database snapshot:
| Map | Approved matches | BLUE wins | RED wins | BLUE WR |
|---|---:|---:|---:|---:|
| Tranquil Grounds | 115 | 70 | 45 | 60.87% |
| Top Defender | 209 | 110 | 99 | 52.63% |
| Siegebreaker | 191 | 116 | 75 | 60.73% |
| Fierce Duel | 414 | 231 | 183 | 55.80% |
| Tactical Grounds | 367 | 182 | 185 | 49.59% |
| **Total** | **1,296** | **709** | **587** | **54.71%** |

These map samples are not independent map rotations across the event. Each map appears in a single chronological block:
- Tranquil Grounds: 2026-11-11 to 2026-11-13
- Top Defender: 2026-11-14 to 2026-11-16
- Siegebreaker: 2026-11-17 to 2026-11-19
- Fierce Duel: 2026-11-20 to 2026-11-22
- Tactical Grounds: 2026-11-22 to 2026-11-24

Therefore, map and time/meta are strongly confounded. Differences in hero availability/selection, player population, or evolving meta may explain part of the side-rate variation. Do not interpret map win rates as causal map effects.

**Chronological map-adjustment test**
- Dataset: **1,292 matches with both draft-order flags known**; 60 warm-up matches and **1,232 test matches**.
- Base candidate: slot-specific hero lifts with weights `[1, 0.5, 0.5]` (first pick primary, later picks supporting), k=10.
- Compared:
  1. no map adjustment;
  2. map-specific side prior shrunk toward the global side baseline using 50 pseudo-matches;
  3. map-specific hero+slot rates shrunk toward each global side+slot+hero rate using 20 pseudo-appearances;
  4. both map-side and map-hero adjustments.
- All features were calculated only from matches earlier than the target match.

| Model | Correct / 1,232 | Accuracy |
|---|---:|---:|
| No map adjustment | **694** | **56.33%** |
| Map-specific side prior only | 695 | 56.41% |
| Map-specific hero/slot adjustment only | 669 | 54.30% |
| Both map adjustments | 689 | 55.93% |

The side-prior adjustment added only one correct result. Map-specific hero rates reduced accuracy by 25 results; combining both map adjustments was still five results below the no-map model. No map-specific model passed the evidence gate.

**Map-level test results**
The map-aware variants were inconsistent by map. The pooled no-map model and map-adjusted model produced materially different outcomes across the five map blocks; some maps improved while others worsened. In particular, map-hero adjustment was notably unstable on Siegebreaker and Tactical Grounds. Per-map test counts were 55 Tranquil, 206 Top Defender, 190 Siegebreaker, 414 Fierce Duel, and 367 Tactical Grounds. These strata are descriptive and should not be used to tune separate weights.

**Phase 3 decisions**
- Do not include a numeric map modifier in the initial new indicator.
- Do not create separate models for each map.
- Keep map available as descriptive context and for future evaluation.
- Revisit map effects only when the same maps recur in another event/rotation or enough new data breaks the current map/time confounding.
- No formation or Battle Fervor tile bonus: the tracker still does not record occupancy/position.


### Phase 3 results — map context and partial pooling

**Frozen snapshot:** same Phase 1/2 cutoff: 1,305 approved matches, 1,301 with verified draft order, 4 excluded from slot analyses.  
**Walk-forward test:** 60 verified-order warm-up matches + 1,241 test matches.

#### 1. Map distribution and side balance

| Map | All approved matches | BLUE wins | BLUE win rate |
|---|---:|---:|---:|
| Fierce Duel | 414 | 231 | 55.8% |
| Siegebreaker | 191 | 116 | 60.7% |
| Tactical Grounds | 376 | 188 | 50.0% |
| Top Defender | 209 | 110 | 52.6% |
| Tranquil Grounds | 115 | 70 | 60.9% |

These differences are descriptive, not causal. The tracker has no player IDs/rank to control for which participants played on each map. The map schedule is also strongly entangled with chronological test thirds.

#### 2. Do first-pick and later-pick signals vary by map?

Using pooled global hero/slot statistics, k=10:

| Map | First picks only | All later slots added |
|---|---:|---:|
| Fierce Duel (414) | 56.04% | 55.56% |
| Siegebreaker (190) | 54.74% | 56.32% |
| Tactical Grounds (376) | 55.32% | 59.04% |
| Top Defender (206) | 54.85% | 57.77% |
| Tranquil Grounds (55) | 54.55% | 47.27% |

Later-slot contributions are not uniform across maps. They improve the pooled result on Siegebreaker, Tactical Grounds, and Top Defender, but not Fierce Duel or the small Tranquil Grounds test subset. This is why the aggregate lift must not be treated as a universal map-independent effect.

The global RED 1 + RED 2 class-pair residual (k=30) compared with slot-specific heroes:
- Fierce Duel: 58.70% vs 55.56%.
- Siegebreaker: 59.47% vs 56.32%.
- Tactical Grounds: 59.04% vs 59.04%.
- Top Defender: 55.83% vs 57.77%.
- Tranquil Grounds: 54.55% vs 47.27% (only 55 tests).

The class residual is not uniformly beneficial on every map; Top Defender is the clear regression. Do not create map-specific class residuals from these samples.

#### 3. Tested conservative map adjustments

All variants use the same chronological test set and slot-specific global hero baseline.

| Variant | Correct / 1,241 | Total accuracy |
|---|---:|---:|
| Global side prior + global hero/slot lifts | 704 | 56.73% |
| Map-specific side prior + global hero/slot lifts | 694 | 55.92% |
| Map-specific side prior + map hero deviations (tau 20) | 700 | 56.41% |
| Global side prior + map hero deviations (tau 5) | 696 | 56.08% |
| Global side prior + map hero deviations (tau 10) | 701 | 56.49% |
| Global side prior + map hero deviations (tau 20) | 706 | 56.89% |
| Global side prior + map hero deviations (tau 40) | 707 | 56.97% |
| Global side prior + map hero deviations (tau 80) | 705 | 56.81% |

Here, `tau` controls how strongly the map-specific hero lift is shrunk toward the global lift. The best result adds only **3 correct matches** over the global model (+0.24 percentage points), and the gain is not consistent by map:
- tau 40 improved Fierce Duel by 4 correct and Top Defender by 1;
- it reduced Siegebreaker by 1 and Tactical Grounds by 1;
- it did not change Tranquil Grounds.

First-pick-only map deviation (tau 40) changed 687 to 689 correct (+2); all-slot map deviation changed 704 to 707 (+3). These are small gains and do not justify the additional model complexity.

A map-side baseline alone also underperformed the global baseline (51.65% total accuracy in the exploratory side-only test). Replacing the global side prior with a map-specific side prior therefore is not supported.

#### 4. Can class-pair residuals be map-specific?

The 36 ordered class combinations for RED 1 + RED 2 and BLUE 2 + BLUE 3 become sparse when split by map:
- Tranquil Grounds: no class-pair group reaches 10 matches for either sequence.
- Siegebreaker: only 2 BLUE 2 + BLUE 3 groups and 3 RED 1 + RED 2 groups reach 10.
- Top Defender: only 4 BLUE 2 + BLUE 3 and 3 RED 1 + RED 2 groups reach 10.
- Fierce Duel and Tactical Grounds have more useful groups, but this does not solve the sparse maps.

Do not build map-specific class-pair residuals. Keep any class-pair estimate pooled across maps and shrunk toward zero, subject to final Phase 4 validation.

#### Phase 3 decisions

1. **No map-specific side prior** in the new indicator: it reduces walk-forward accuracy in this test.
2. **No map-specific hero correction** in the initial model: best tau result adds only 3 correct matches and is inconsistent by map.
3. **No separate model per map.**
4. **No map-specific class-pair residuals**; most map/class groups are too small.
5. Retain global pooled hero/slot estimates as the default. Map can remain visible as context, but it does not receive a numeric bonus in v1.
6. Carry the pooled RED 1 + RED 2 class residual forward as a candidate only; disclose its Top Defender regression and do not add map-specific overrides.
7. No Battle Fervor tile adjustment: the tracker does not know which hero occupies the tile. No separate Phantimal effect is added because its assignment is largely deterministic from the first eligible faction pick.

**Phase 3 exit gate: passed.** Map effects were tested. Current data does not justify numeric map adjustments or independent map models. Proceed to Phase 4 with a global model and explicit map limitations.

### Phase 4 — Assemble and validate the independent model
**Status: DONE — 2026-11-24 (first-pick diagnostic selected)**

Tasks:
- Combine only signals that passed earlier phase gates.
- Give the model a new version name, separate from `draft-indicator-rules-v1`.
- Use chronological walk-forward testing; never let the evaluated match contribute to its own historical features.
- Compare directly against the current Match Indicator and simple baselines on the same test matches.
- Report accuracy plus probability-quality metrics only if actual probabilities are produced (e.g. log loss/Brier/calibration); otherwise report score direction and coverage.
- Inspect results over time slices and by side/map; disclose neutral predictions and sample size.
- Decide whether a prospective pre-battle snapshot mechanism is necessary for a fair live comparison. Historical replay after result-known must remain labelled as such.

Deliverable:
- Frozen model specification, versioned formula, reproducible test results, known limitations, and go/no-go recommendation for UI integration.

Exit gate:
- No claim of improvement unless it beats the current indicator on a comparable, leakage-safe test set with a meaningful and reasonably stable margin.


#### Phase 4 results — active v1 comparison and separate diagnostic decision (snapshot 2026-11-24)

**Actual current Match Indicator baseline**
- Runtime code: `assets/js/modules/08-draft-indicator-rules-v1.js?v=5`, loaded directly by `index.html`.
- It uses `ss_get_stats(null, false)`, `ss_get_side_stats(null, false)`, and `ss_get_first_pick_stats()`, across all maps with mirrors included.
- Current hero scoring: first pick uses side-specific first-pick history; picks 2/3 use side totals minus first-pick history; smoothing is 10 pseudo-appearances; first pick weight 1.5× and later picks 1×.
- Side prior is `blueBase - 0.5`.
- Current v1 adds hero × partner-class synergy from DUO residuals, with 30 pseudo-appearances and a team cap of ±0.030.
- Neutral threshold is `abs(delta) < 0.005`. It is a historical score difference, not win probability.
- The dormant `08-match-estimate-script-v1.js` / `model_snapshots` path is not the current UI and is excluded from this comparison.

**Chronological comparison against the real active v1**
- Snapshot: **1,302 approved matches**, first 60 warm-up, **1,238 known-order test targets**. All approved matches (including the four with unknown order) were used for the active v1 historical aggregates, matching its current RPC behaviour; only known-order matches were scored as targets.
- Every prediction was calculated before adding its target match to history.
- Results:
| Model | Correct / 1,238 | Accuracy over all targets | Directional coverage | Accuracy among directional calls |
|---|---:|---:|---:|---:|
| Always BLUE | 673 | 54.36% | 100% | 54.36% |
| Active Match Indicator v1 (exact formula) | **709** | **57.27%** | 98.63% | 58.07% |
| Same base model, class synergy removed | 703 | 56.79% | 98.38% | 57.72% |
| Slot-specific pick 1/2/3, no synergy; unknown-order rows excluded from slot stats | 707 | 57.11% | 98.06% | 58.24% |

- Removing current synergy changed only a few directional calls: paired comparison of active v1 vs no-synergy had 5 wins vs 3 losses for v1 (exact p=0.7266). This is not evidence that synergy is a reliable improvement.
- The slot-specific model was not meaningfully different from active v1: 79 discordant calls favoured slot-specific and 80 favoured active v1 (exact p=1.0000).
- A slot-specific model with the current synergy formula reached 718/1,238 (58.00%), but the paired comparison against active v1 was also inconclusive (88 vs 78 discordant calls, p=0.4850). It was an exploratory variant, not a validated improvement.
- Therefore a second full-draft score using the same six heroes would mostly duplicate the existing Match Indicator. The pooled-later v0.1 candidate is effectively the current v1 base without its small synergy correction; it is not a sufficiently distinct new model.

**Separate First Pick Indicator — chosen scope**
The useful distinct view is an intentionally narrower **FIRST PICK INDICATOR**: it isolates the opening BLUE1 vs RED1 signal rather than presenting another near-identical full-draft score.

Formula:
```
blueBase = prior BLUE wins / prior approved matches
redBase  = 1 - blueBase

firstLift(hero, side) =
  (firstWins + sideBase * 10) / (firstAppearances + 10) - sideBase

delta =
  (blueBase - 0.5)
  + BLUE1_lift
  - RED1_lift
```

- Positive delta points to BLUE; negative points to RED.
- Neutral threshold: `abs(delta) < 0.005`.
- First-pick smoothing: 10 pseudo-appearances toward the side baseline.
- It deliberately ignores picks 2/3, class synergy, exact DUO, map, Phantimal, H2H, player skill, random pool/bans, and formation.
- It must display the BLUE1 and RED1 hero records, sample counts, side baseline, and score contribution so the user can see why the opening-pick signal points one way.
- It must state clearly: **first-pick-only diagnostic; not a full-draft prediction and not a win probability**.

**First-pick-only walk-forward result**
- Snapshot: 1,303 approved matches; first 60 warm-up; 1,239 known-order test targets.
- First-pick-only: **686/1,239 = 55.37%** over all targets; 97.74% directional coverage; 56.65% accuracy among directional calls.
- Active v1 on the same targets: **709/1,239 = 57.22%**; 98.63% coverage; 58.02% accuracy among directional calls.
- Paired comparison: 141 discordant cases favoured first-pick-only and 159 favoured active v1 (exact p=0.3264).
- The First Pick Indicator is not expected to beat the full Match Indicator. Its value is diagnostic: it reveals whether the opening pair alone agrees with or contradicts the full-draft score.

**Implementation feasibility**
- Existing RPCs are sufficient: `ss_get_stats(null, false)` provides the side baseline and `ss_get_first_pick_stats()` provides BLUE1/RED1 hero records.
- No new Supabase RPC, migration, table, or schema change is required.
- The new view will be a separate module loaded directly by `index.html` after `08-draft-indicator-rules-v1.js`. Do not edit `order.json` or the dormant `tracker-app.js` bundle.
- The existing Match Indicator source and formula remain untouched.

**Phase 4 decision**
- Do not build another full-draft score that duplicates active v1.
- **GO** for a separate First Pick Indicator as a focused diagnostic view, clearly labelled as first-pick-only and experimental.
- **NO-GO** for claiming it is more accurate than active v1 or using it to replace the existing Match Indicator.
- Keep both visible so the user can compare opening-pick signal against full-draft signal.

**Validation limitations**
- One event and one evolving meta; no untouched external holdout.
- Walk-forward replay excludes the target match from its own historical stats, but is not a prospectively saved pre-battle prediction log.
- No probability calibration was performed.


### Phase 4 results — candidate model specification and go/no-go

**Frozen snapshot:** 1,305 approved matches, 1,301 verified-order matches, same cutoff as Phases 1–3.  
**Walk-forward test:** 60 verified-order warm-up matches + 1,241 test matches.  
**Important limitation:** all candidate exploration used this same historical test set. It is not an untouched holdout and not prospective live validation. The result is a development benchmark only.

#### 1. Current Match Indicator comparison

On the exact same 1,241 test matches, the existing `draft-indicator-rules-v1` produced:
- 1,224 directional predictions;
- 709 correct;
- 57.92% directional accuracy;
- 57.13% total accuracy (neutral predictions counted as misses);
- all 1,241 stored rows have `outcome_known_at_calculation=true`.

The existing predictions are a chronological replay / automatic ingest after the outcome is known, not genuine pre-battle snapshots. The comparison is leakage-safe in its historical feature ordering but must not be described as live prospective accuracy.

#### 2. Candidate weight comparison

All variants include:
- global historical side baseline;
- separate hero lift for each side and exact pick slot;
- ordered RED 1 class + RED 2 class residual, calculated beyond individual hero-slot lifts and shrunk with 30 prior matches;
- no numeric map modifier.

| Candidate | Hero shrinkage | First-pick weight | Later-pick weight | RED 1+2 class residual weight | Correct / 1,241 | Total accuracy |
|---|---:|---:|---:|---:|---:|---:|
| A — First Pick priority | 10 | 1.5× | 0.75× | 1.0× | 722 | 58.18% |
| B — maximum pooled accuracy | 20 | 1.0× | 1.0× | 1.0× | 729 | 58.74% |
| C — lower first-pick weight | 10 | 1.0× | 0.75× | 1.0× | 725 | 58.42% |
| D — stronger first-pick priority | 10 | 2.0× | 0.75× | 1.0× | 717 | 57.78% |
| E — reduced later-pick weight | 10 | 1.5× | 0.50× | 1.0× | 708 | 57.05% |

Candidate B has the highest historical test accuracy, but gives all six hero slots equal weight and conflicts with the agreed design priority that First Pick should be the primary signal. Candidate A is therefore selected for the first experimental UI version: it gives each first pick twice the per-slot weight of a later pick, while retaining the useful later-pick context. It scores 13 more correct matches than the current Match Indicator on this development test (+1.05 percentage points total accuracy).

This is a product-design trade-off, not proof that Candidate A is statistically superior to Candidate B. The 7-match gap between A and B is not independently validated.

#### 3. Candidate A — frozen experimental formula

Version name: **`showdown-draft-indicator-v1`**

For each hero in its exact side and slot:
`hero_lift = (wins + side_baseline * 10) / (appearances + 10) - side_baseline`

RED side baseline is `1 - BLUE baseline`.

Score:
`delta = (BLUE baseline - 0.5)`
`      + 1.5 * (BLUE1 lift - RED1 lift)`
`      + 0.75 * (BLUE2 lift + BLUE3 lift - RED2 lift - RED3 lift)`
`      - RED12 class-pair residual`

RED12 class-pair residual:
- For every historical match, estimate RED's expected result from RED side baseline plus the three individual RED hero-slot lifts, clamped to 5–95%.
- Residual = actual RED win (1/0) minus expected RED result.
- Group prior residuals by the ordered official class pair `(RED1 class, RED2 class)`.
- `red12_residual = sum(prior residuals) / (prior pair matches + 30)`.
- Subtract this residual from the BLUE score. A positive residual means RED has historically exceeded the expectation for that class sequence.
- This is not an exact hero counter and does not use raw duo win rate.

Interpretation:
- positive delta = BLUE edge;
- negative delta = RED edge;
- `abs(delta) < 0.005` = neutral.
- The score is an experimental historical score difference, **not a win probability**.

#### 4. Candidate A comparison by map and chronology

Against the current Match Indicator, Candidate A's total accuracy by map:
- Fierce Duel: 58.94% vs 56.28%.
- Siegebreaker: 57.89% vs 56.32%.
- Tactical Grounds: 60.37% vs 59.57%.
- Top Defender: 55.34% vs 55.83%.
- Tranquil Grounds: 49.09% vs 54.55% (55-match test subset).

By chronological test third:
- Early: 54.72% vs 55.93%.
- Middle: 59.18% vs 56.28%.
- Late: 60.63% vs 59.18%.

Candidate A does not improve every map or time slice. Its pooled gain is encouraging but not universal. Keep it experimental and do not add map-specific overrides based on the small subsets.

#### 5. Uncertainty and UI reporting rules

- Never show a percentage chance to win or a confidence percentage; the score is not calibrated.
- Show the score direction and neutral state only.
- In the explanation/details, show the historical appearance count for each hero in its exact side/slot and the prior RED1+RED2 class-pair sample count. This is evidence support, not a probability.
- Keep shrinkage (10 hero appearances, 30 class-pair residual appearances) in the formula.
- Keep the experimental/version label visible.
- Explain that map, Phantimal, exact opponent hero counters, player skill, random pool/bans, and formation are not numerically modelled.

#### Phase 4 go/no-go

**GO:** build Candidate A as a separately viewable experimental indicator alongside the current Match Indicator.

**NO-GO:** do not replace or modify the current Match Indicator; do not present Candidate A as proven superior or as a live-validated prediction. Phase 6 must observe genuinely pre-battle predictions before any promotion decision.

Phase 4 exit gate: passed. The candidate formula, version, neutral handling, limitations, and test benchmark are frozen for the first UI implementation. Any formula change after this point requires a new model version and a roadmap update.

### Phase 5 — Separate UI integration (read-only alongside current indicator)
**Status: IN PROGRESS — implementation committed; browser QA pending**

Tasks:
- Add `assets/js/modules/09-showdown-draft-indicator-v1.js` as an independent full-draft module.
- Load it directly after `08-draft-indicator-rules-v1.js` in `index.html`.
- Use the frozen Phase 4 Candidate A formula, not a first-pick-only approximation.
- Read statistics from the dedicated `ss_get_showdown_draft_indicator_stats()` RPC. Do not change the shared `ss_get_first_pick_stats()` RPC used by the existing Match Indicator.
- The RPC must scope to the configured current event, approved matches, and both draft-order-known flags.
- Keep the active Match Indicator, Tier List, and TOP Picks unchanged.
- Show a partial score while the draft is incomplete; missing slots contribute zero. Require both current draft-order flags to be known.
- Show per-slot support counts, RED 1+2 class-pair sample count, version, data timestamp, and explicit experimental/non-probability warning.

Frozen Candidate A formula:
```
hero_lift = (wins + side_baseline * 10) / (appearances + 10) - side_baseline

delta =
  (BLUE baseline - 0.5)
  + 1.5 * (BLUE1 lift - RED1 lift)
  + 0.75 * (BLUE2 lift + BLUE3 lift - RED2 lift - RED3 lift)
  - RED12 class-pair residual
```
The RED12 residual is grouped by ordered official classes (RED1 class, RED2 class), calculated from prior-only historical RED residuals and shrunk with 30 prior matches. No numeric map adjustment.

Deliverable:
- A separately viewable full-draft indicator using version `showdown-draft-indicator-v1`, beside the unchanged Match Indicator.

Exit gate:
- Verify old indicator code/output is unchanged.
- Verify add/remove/swap/reset, all six slots, unknown-order guard, refresh, and RPC failure behavior.
- Perform real browser/manual layout QA before marking Phase 5 DONE.


### Phase 5 results — independent UI and RPC integration

#### Existing implementation discovered

During the Phase 5 source audit, `main` already contained:
- `assets/js/modules/09-showdown-draft-indicator-v1.js`;
- a script reference to that module in `index.html`;
- a Supabase function named `ss_get_showdown_draft_indicator_stats()`.

The existing module already implemented the intended independent panel and Candidate A formula. Its original RPC contract used `hero_slot_stats` / `red12_class_stats` and calculated the side baseline from verified-order matches only. The Phase 4 benchmark uses the baseline from all approved matches, while hero-slot history uses only verified-order matches. To keep implementation aligned with the frozen benchmark, the RPC contract was corrected and the existing module was adapted. No second indicator was retained.

#### Final RPC contract and data

Applied corrective migration:
- `supabase/migrations/20261124190531_correct_showdown_draft_indicator_stats_rpc.sql`
- Supabase migration version: `20261124190531`
- Migration name: `correct_showdown_draft_indicator_stats_rpc`

Function:
- `public.ss_get_showdown_draft_indicator_stats()`
- `SECURITY DEFINER`, `search_path = ''`
- Execute granted to `anon` and `authenticated`.
- Returns aggregate-only data: model version, event ID, approved/verified match counts and side baselines, exact side/slot hero stats, and pooled ordered RED1+RED2 class residual groups.
- No individual player data is returned.

Live RPC check at integration time:
- 1,317 approved matches;
- 1,313 matches with verified draft order;
- 618 hero-slot groups;
- 7,878 total hero-slot appearances (6 × 1,313);
- 36 ordered RED1+RED2 class-pair groups;
- 1,313 total class-pair residual observations;
- execution time approximately **81 ms**.

#### UI files and changes

- Updated `assets/js/modules/09-showdown-draft-indicator-v1.js` to consume `hero_slots`, `red_class_pairs`, and the explicit `blue_baseline` field.
- Updated the history explanation to distinguish all approved matches from verified-order matches.
- Kept the existing single script reference in `index.html`.
- Removed the temporary duplicate `10-showdown-draft-indicator-v1.js` module and its script reference.
- Did not modify `assets/js/modules/08-draft-indicator-rules-v1.js`, Tier List, or TOP Picks.

#### Tests performed

- RPC returned the expected version, summary, arrays, and aggregate invariants.
- Verified function security configuration and execute grants for anon/authenticated.
- RPC execution plan completed in approximately 81 ms.
- JavaScript syntax compilation passed.
- Simulated-DOM smoke test passed:
  - panel insertion;
  - full 6/6 draft score;
  - partial 5/6 draft recalculation;
  - draft reset;
  - unknown-order warning;
  - catalog-change refresh and second RPC call.
- Confirmed `index.html` contains exactly one Showdown Draft Indicator script reference.

**Not independently verified:** the deployed GitHub Pages page could not be loaded from this environment, so final visual rendering on the live site still needs a manual refresh/check. The code-level and simulated interaction checks passed.

#### Migration-history note

Supabase migration history contains two earlier entries with the same name, `add_showdown_draft_indicator_stats_rpc`, versions `20261124190324` and `20261124190418`. Matching SQL files were not found in the repository. Their history was not rewritten. The new corrective migration `20261124190531` is committed and contains the final self-contained function definition. This repository/database history mismatch is recorded for future cleanup, but does not block the current RPC.

**Phase 5 exit gate:** code/data integration and simulated interaction checks passed; current Match Indicator code path was not modified. Manual deployed-page visual confirmation remains outstanding.

### Phase 6 — Observe and decide
**Status: NOT STARTED**

Tasks:
- Compare the two indicators on new matches and record genuinely pre-battle predictions if feasible.
- Track coverage, direction accuracy, neutral rate, and results by side/map.
- Do not change weights after every surprising match.
- Decide whether to keep, refine, or remove the experimental indicator based on accumulated evidence and remaining event time.

Deliverable:
- A final comparison and explicit keep/refine/retire decision.

---

#### Phase 5 implementation log — 2026-11-24 (latest state; supersedes the first-pick-only interim panel)

**Supabase**
- Added `public.ss_get_showdown_draft_indicator_stats()`.
- Hosted migration history contains two entries with the same name:
  - `20261124190324_add_showdown_draft_indicator_stats_rpc`
  - `20261124190418_add_showdown_draft_indicator_stats_rpc`
- Repository migration files now mirror both versions. The first contains the canonical function/grants; the second is an intentional no-op to reconcile the duplicate hosted migration-history entry.
- The function uses `SECURITY DEFINER SET search_path TO ''`, explicitly schema-qualifies tables, and grants execution to `anon` and `authenticated`. It exposes only aggregate current-event hero-slot and class-pair statistics, not player identifiers.
- It filters `status='approved'`, current configured event, `blue_draft_known=true`, and `red_draft_known=true`.
- For each historical RED1+RED2 class-pair residual, expected RED result is calculated using only matches earlier than that target match. It uses prior side baseline and prior exact RED slot+hero lifts. This avoids target-result leakage in the residual history.
- Latest live snapshot at validation: 1,317 approved matches; 1,313 verified-order matches; 4 unknown-order matches.
- RPC output validation: 1,313 verified matches; 7,878 pick rows represented; 618 hero/side/slot keys; all six side+slot groups contain 1,313 appearances; 36 ordered RED class pairs; 1,313 RED residual records; zero missing hero classes.
- RPC execution measured at approximately **49.4 ms** on the current database.
- Function privilege check: `anon` and `authenticated` can execute; `PUBLIC` direct execute is revoked.
- Security Advisor reports the new function under the same intentional public SECURITY DEFINER RPC warning category as the existing public statistics functions. This is expected for the browser-facing aggregate-statistics endpoint. Performance Advisor showed only the project's existing unindexed-FK notices; no new performance finding was attributed to this RPC.

**Frontend**
- Added `assets/js/modules/09-showdown-draft-indicator-v1.js` — commit `4e018ebbfcaa16d60d6ecca1f070b3429e6df506`.
- Updated `index.html` to load it immediately after the active Match Indicator — commit `88b96b6b91f1af82769da34639628b3101814486`.
- Removed the interim `assets/js/modules/09-first-pick-indicator-v1.js` module — commit `7b4f6dd94ecacf0a0433af0198e71f37a5abbd05`.
- The new module uses the frozen Candidate A full-draft formula: first-pick lift difference ×1.5; later slot lift differences ×0.75; RED1+RED2 ordered class residual; global side prior.
- The new module requires both current draft-order flags to be known, displays partial scores as picks are entered, and reports historical appearance counts and RED class-pair sample count.
- It does not use map, Phantimal, exact hero counter, player skill, random pool, bans, or formation.
- Active Match Indicator source SHA remains `46110a69bba36209415b2a21ec80741d7a0ae976`; it was not edited.
- `index.html` has exactly one script tag for the new module, one for the active Match Indicator, and no reference to the deleted first-pick-only module.

**Code-level verification**
- `node --check` passed for the new module.
- Mocked-DOM smoke tests passed for panel insertion, full-draft score calculation, RED class-pair residual, bar width, unknown-order guard, partial draft state, and RPC error state.
- SQL aggregate checks and RPC runtime check passed.

**Still pending**
- Real browser/manual QA for visual layout and live form interactions (add/remove/swap/reset, known-order toggles, successful submission refresh). This session did not have a live browser interaction surface, so Phase 5 remains IN PROGRESS.

## 5. Work log and decision record

### 2026-11-24 — Roadmap created
Completed:
- Read `docs/MATCH_INDICATOR_CURRENT_IMPLEMENTATION.md`.
- Read `docs/SHOWDOWN_SMACKDOWN_ASSUMPTIONS.md`.
- Inspected active `main` source `assets/js/modules/08-draft-indicator-rules-v1.js`.
- Reviewed the uploaded project conversation history for prior first-pick and RED-response discussions.
- Confirmed the current indicator is a separate, rule-based score with 1.5× first-pick weight, equal weight for later picks, side prior, and experimental hero × partner-class correction.
- Confirmed current indicator documentation says it does not model the full pick sequence, map, H2H, player skill, pool/bans, or formation.
- Captured the user's new direction: first picks are primary; RED 1 must be studied as a response to BLUE 1; later picks are supporting context; map is a possible secondary adjustment; formation is unavailable.
- Established that the new indicator must be independently viewable and must not replace or modify the existing one.

Not done:
- No code changed.
- No Supabase schema, RPC, or data changed.
- No new model formula or weights selected.
- No live database audit performed in this phase.

Decisions:
- This is a second, independent indicator, not a refactor of the existing Match Indicator.
- Do not add an arbitrary RED bonus. Test the RED-response hypothesis against side baseline and other confounders.
- Do not give all six picks equal influence by default.
- No changes to Tier List or TOP Picks.
- Complete and document each phase before starting the next.

Next step:
- **Phase 6 — Observe and decide.** First manually refresh the deployed tracker and confirm the separate panel is visible. Then use the experimental indicator on new drafts and record genuinely pre-battle predictions only if the workflow allows it without adding burdensome manual entry. Do not replace the current Match Indicator.

---

### 2026-11-24 — Candidate A full-draft UI and data RPC committed

Completed:
- Implemented the frozen Candidate A as `showdown-draft-indicator-v1`, replacing the interim first-pick-only diagnostic.
- Added the dedicated current-event, approved, verified-order RPC and verified its output against direct SQL.
- Added the new independent module to `index.html`; the active Match Indicator module remains unchanged.
- Ran JavaScript syntax and mocked-DOM smoke tests; SQL RPC execution and aggregate validations passed.
- Recorded implementation commits, migration versions, row counts, and advisor results in the Phase 5 implementation log above.

Not done:
- Real browser/manual QA is still pending.
- Phase 6 prospective observation has not started.

Next:
- Perform live browser checks for layout, all six slot updates, add/remove/swap/reset, draft-order-known toggles, data refresh after submission, and error handling. Mark Phase 5 DONE only after these checks.

## 6. Rules for updating this roadmap

After every completed phase:
1. Update the phase status (DONE / IN PROGRESS / BLOCKED).
2. Record date, exact files/queries/RPCs inspected or changed, and commit/migration identifiers if applicable.
3. Record counts, test window, metrics, and results; distinguish measured facts from interpretation.
4. Record decisions and rejected alternatives with reasons.
5. Record unresolved issues and the exact next action.
6. Commit this roadmap update before beginning the next phase.

If a phase is incomplete, say so plainly. Never mark a phase done just because a proposal was discussed. If new evidence changes the plan, update the plan and explain why before proceeding.


### 2026-11-24 — Phase 0 completed
Completed:
- Finished the live Supabase schema, data-quality, map-coverage, mirror, Phantimal, and RPC audit documented in Phase 0 results above.
- Inspected `main` and `development` module orders and the generated runtime bundle.
- Identified a significant documentation/runtime mismatch: `08-draft-indicator-rules-v1.js` is not loaded; the actual app loads `08-match-estimate-script-v1.js`.
- Verified the live UI cannot read `model_snapshots` with current anon/authenticated grants and therefore uses the fallback heuristic.
- Defined the Phase 1 analytical population and exclusions.

Not done:
- No source code changed.
- No Supabase schema, RPC, or data changed.
- No model formula, feature weight, or prediction was implemented.
- No historical model performance was calculated in this phase.

Decisions:
- Use 1,286 draft-known matches for pick-slot and sequence analysis.
- Exclude the four unknown-order matches from slot-specific analyses.
- Do not use submitter names as player identity or infer rank/skill.
- Treat actual loaded Match Indicator fallback as the live baseline; do not use the unbundled draft-rules file as the current UI baseline.
- Keep the current indicator and database unchanged.

Next step:
- **Phase 1 — First-pick signal study.** Calculate BLUE 1 and RED 1 hero-level results, RED 1 response matchups, side-adjusted signal, and chronological walk-forward baselines. Update this roadmap with results and decisions before Phase 2.


### 2026-11-24 — Phase 1 started
- Phase 0 was completed and committed first (`49a0b58b1d074789f4158dd7dcc78aa0d375bd1d`).
- Beginning the first-pick evidence study using the Phase 0 dataset definition (1,286 matches with both draft-order flags known).
- No formula or weights are being changed; this phase is analytical only.


### 2026-11-24 — Phase 1 completed; Phase 2 started
Completed:
- Extracted the known-order match history from Supabase and ran leakage-safe chronological walk-forward tests for side-only, BLUE1-only, RED1-only, and combined BLUE1+RED1 candidates.
- Compared smoothing strengths k=5/10/20, inspected confidence intervals for first-pick hero records, and measured BLUE1→RED1 pairing sparsity.
- Checked performance across chronological thirds and map strata.
- Recorded all methods, counts, results, caveats, and decisions in the Phase 1 section above.

Decisions:
- No arbitrary RED bonus and no specific counter-pick interaction.
- Carry the symmetric side-adjusted first-pick lift as a baseline candidate into Phase 2, but do not ship it yet.
- The evidence is preliminary: only +11 correct outcomes vs always-BLUE at k=10 and McNemar p=0.1956; no proven improvement.

Next:
- **Phase 2 — Later-pick / composition contribution.** Test per-slot hero lifts and whether later picks add out-of-sample value beyond BLUE1+RED1.


### 2026-11-24 — Phase 2 completed; Phase 3 started
Completed:
- Ran chronological, target-excluded tests of first-only, later-only, half-weight later, equal-slot, and first-heavy weight variants.
- Tested per-slot hero main effects, exact duo residuals, and hero × partner-class residuals using only prior-match information.
- Audited RED1+RED2 and BLUE2+BLUE3 exact pair repetition.
- Compared results across chronological thirds and map strata.

Decisions:
- Later picks remain a supporting signal, not equal priority by default.
- No exact-pair or class-synergy correction in the initial candidate model.
- Weight choice remains open; no parameter was promoted based on the same exploratory test window.
- Map/time instability warrants Phase 3.

Next:
- **Phase 3 — Map context.** Check per-map sample sizes, side balance, and whether map-aware pooled adjustments improve chronological out-of-sample results without overfitting.


### 2026-11-24 — Phase 3 completed; Phase 4 started
Completed:
- Audited current per-map sample sizes and side balance.
- Confirmed the map sequence is chronological and each map occupies one event window, so map effects are confounded with time/meta.
- Ran leakage-safe walk-forward tests of pooled map-side and map-hero/slot adjustments.
- Compared map-aware variants against the no-map candidate on the same 1,232-match test window.

Decisions:
- No numeric map correction in the first release; the map-side prior added only one correct call and hero-map rates reduced accuracy.
- No separate model per map.
- Keep map as visible context and a later re-evaluation target.

Next:
- **Phase 4 — Assemble and validate the independent model.** Freeze a provisional model spec consistent with the design intent, then compare it against the actual currently loaded Match Indicator fallback and simple baselines on the same leakage-safe chronological test set. Do not implement UI yet.


### 2026-11-24 — Phase 4 provisional comparison invalidated; Phase 5 not started
- A second inspection of `index.html` showed that the actual page loads `08-draft-indicator-rules-v1.js?v=5` directly.
- The previous Phase 4 comparison used the dormant `08-match-estimate-script-v1.js` fallback and is invalid as a comparison to the current UI.
- The old fallback statistics and the earlier Phase 4 GO decision are superseded. Do not use them in project decisions.
- The pooled-later-pick simplification remains a valid analytical result, but `new-draft-indicator-v0.1` is currently too close to the active v1 formula to call it an independent improvement.
- Phase 4 has been reopened; Phase 5 has been reset to NOT STARTED.
- No code, SQL, migration, or UI changes were made.

Next:
- Reproduce the active `draft-indicator-rules-v1` formula exactly in a leakage-safe chronological replay, including its hero × partner-class synergy, then compare it with the no-synergy candidate.
- Decide whether the difference is useful enough to justify a second visible indicator.


### 2026-11-24 — Runtime audit correction
- Verified all script tags in `index.html`; the active Match Indicator is `assets/js/modules/08-draft-indicator-rules-v1.js?v=5`.
- Verified `index.html` does not load `assets/js/tracker-app.js` or use `assets/js/modules/order.json`; those are a legacy/unreferenced path.
- Verified `08-match-estimate-script-v1.js` is not loaded by the current page. Its model-snapshot permission issue is not relevant to the current UI.
- Corrected the Phase 0 runtime findings and reopened Phase 4. No code or database changes were made.


### 2026-11-24 — Phase 4 corrected and completed; Phase 5 started
Completed:
- Reproduced the actual active `draft-indicator-rules-v1` formula chronologically, including its hero × partner-class synergy.
- Compared active v1 against no-synergy and slot-specific variants on the same known-order targets.
- Confirmed the proposed full-draft v0.1 would be too similar to the existing indicator.
- Tested a genuinely distinct First Pick-only diagnostic against active v1 and simple baselines.
- Confirmed existing RPCs are sufficient; no database migration is needed.

Decisions:
- The second visible indicator will be **FIRST PICK INDICATOR**, not a duplicate full-draft score.
- It is diagnostic and intentionally narrower; active Match Indicator remains the primary full-draft score.
- First-pick-only is not more accurate than active v1; UI must not imply otherwise.
- Phase 5 can proceed without Supabase schema changes.

Next:
- Implement the standalone module and direct `index.html` script tag, then verify both panels independently.

### 2026-11-24 — Phase 0 completed

Completed:
- Read the current implementation and assumptions documents again.
- Inspected live Supabase tables, columns, constraints, migration history, and definitions of the existing statistics/prediction RPCs.
- Audited all 1,303 approved matches and 7,818 pick rows.
- Verified six unique picks per match and found no mirror matches.
- Verified five-map distribution, outcome baseline, timestamp provenance, and complete existing prediction-row coverage.
- Inspected `index.html`, `00-core.js`, `08-draft-indicator-rules-v1.js`, and `tracker137-manager.js` for the independent UI integration point.
- Identified four matches whose draft order is explicitly marked unknown, despite containing slot values. Recorded them for exclusion from slot-specific analysis.
- Confirmed no reliable player ID/rank/skill feature is present.

Not done:
- No code or database changes.
- No Phase 1 hero first-pick/response analysis yet.
- No formula or weights chosen.

Commit with this audit: pending.


### 2026-11-24 — Phase 5 implementation committed; manual QA pending
- The separate First Pick Indicator module and direct `index.html` script tag are committed on `main`.
- JavaScript syntax and mocked-DOM rendering smoke test passed.
- Existing active Match Indicator source and Supabase schema were not modified.
- Phase 5 remains IN PROGRESS until real browser/manual QA confirms layout and interactions.

### 2026-11-24 — Phase 1 completed

Completed:
- Built side-specific BLUE 1 and RED 1 hero records from verified-order matches.
- Tested chronological baselines and first-pick candidates with k=5, 10, 20 shrinkage.
- Evaluated 1,241 post-warm-up matches at the frozen cutoff.
- Analysed chronological thirds, map mix, and per-map model performance.
- Measured BLUE 1 × RED 1 pair sparsity and rejected exact-hero counter bonuses.
- Recorded the model's modest pooled lift and its map-dependent instability.

Not done:
- No new model formula or weights approved.
- No code or database changes.
- No player/rank adjustment possible.
- No direct hero-counter model.

Decision:
- Carry separate BLUE 1 and RED 1 features forward as candidates only. Phase 2 will test whether later picks add value after both first picks are known.


### 2026-11-24 — Phase 2 completed

Completed:
- Tested each later slot separately and all later picks together against the first-pick baseline on 1,241 chronological test matches.
- Compared pooled later-slot hero history with exact slot-specific hero history.
- Measured repeated exact hero-pair counts for RED 1 + RED 2 and BLUE 2 + BLUE 3.
- Tested ordered class-pair residuals after subtracting the expected result from all three individual hero-slot lifts.
- Tested class-residual shrinkage values 15, 30 and 60.
- Checked the class-residual candidate by map and chronological third.
- Corrected an intermediate metric aggregation that counted neutral scores in the correct numerator; only corrected metrics are retained above.

Not done:
- No final weights selected.
- No code, RPC, migration, or database changes.
- No production indicator created yet.

Decision:
- Later slots and RED 1 + RED 2 class residual remain candidates, but map context must be tested before any formula is frozen.


### 2026-11-24 — Phase 3 completed

Completed:
- Measured sample size and BLUE/RED balance on all five maps.
- Compared first-pick and all-later-slot candidates by map.
- Tested map-specific side priors.
- Tested globally pooled hero-slot strengths with map deviations shrunk at tau 5, 10, 20, 40 and 80.
- Tested first-pick-only and all-slot map deviations.
- Measured map-specific sample sizes for ordered class-pair groups.
- Confirmed that map-specific hero deviations add at most 3 correct matches and map-specific class groups are too sparse for separate corrections.

Not done:
- No map feature or per-map model implemented.
- No code or database changes.
- No final formula approved.

Decision:
- Keep a global model; map is context only in v1. Phase 4 will compare global candidate variants and decide whether the pooled RED 1 + RED 2 class residual is worth retaining.


### 2026-11-24 — Phase 4 completed

Completed:
- Compared Candidate A/B/C/D/E weight variants on the same 1,241-match walk-forward test set.
- Compared Candidate A with the existing Match Indicator on the exact same matches.
- Compared Candidate A by map and chronological third.
- Froze the experimental formula, version name, shrinkage values, RED1+RED2 class residual definition, neutral threshold, and UI uncertainty rules.
- Made an explicit GO for a separate experimental UI and NO-GO for replacing the existing indicator.

Not done:
- No code, RPC, migration, or database changes.
- No prospective live prediction capture.
- No independent untouched holdout.
- No calibration as win probability.

Decision:
- Phase 5 implements Candidate A only as a separate, read-only experimental indicator. Existing Match Indicator and Tier List remain unchanged.



### 2026-11-24 — Phase 5 code/data review: mismatch found and resolved

The earlier review correctly found two blockers:
1. The interim `09-first-pick-indicator-v1.js` panel implemented only BLUE1/RED1, while Phase 4 had frozen the full-draft Candidate A formula.
2. Its shared `ss_get_first_pick_stats()` RPC included four matches whose draft-order flags were unknown and did not scope to the configured current event.

Both blockers have since been resolved:
- The interim first-pick-only module was removed.
- `09-showdown-draft-indicator-v1.js` now implements the frozen Candidate A full-draft formula.
- A dedicated `ss_get_showdown_draft_indicator_stats()` RPC now filters to the configured current event, approved matches, and both draft-order-known flags.
- The shared `ss_get_first_pick_stats()` RPC and active Match Indicator module remain unchanged.
- SQL output, runtime, JS syntax, and mocked-DOM behavior were verified; details and commits are recorded in the latest Phase 5 implementation log above.

**Current status:** Phase 5 implementation is committed. Real browser/manual QA remains pending. Do not start Phase 6 until Phase 5's browser QA exit gate passes.

### 2026-11-24 — Phase 5 completed

Completed:
- Reused the already-existing independent Showdown Draft Indicator panel instead of retaining a duplicate.
- Corrected the aggregate RPC to match the frozen Candidate A model and its all-approved side baseline.
- Updated the existing module to the RPC response contract.
- Removed the temporary duplicate module and script reference.
- Verified the function output, permissions, aggregate counts, runtime, JS syntax, and simulated UI event behavior.

Not done:
- No change to Match Indicator v1 or Tier List.
- No browser visual confirmation on the deployed GitHub Pages site.
- No prospective prediction snapshot table or automatic pre-battle capture.

Decision:
- Phase 5 is complete for code and data integration. Phase 6 remains not started until the deployed panel is visually confirmed and the prospective observation workflow is chosen.



### 2026-11-24 — Re-home experimental UI on a feature branch; compact layout revision

Context:
- The prior Phase 5 UI integration had been written to `main` without explicit approval. That integration was subsequently removed from `main` in commits `9dc068ce7a33d822d7eff70e48054639bf9928a9` and `6103cfe345f531ac53db02487182a3cf72d0bdee`.
- `main` remains stable and does not load the experimental Showdown Draft Indicator.
- The user confirmed that their local environment is used to test the development version; the remote `development` branch is the working baseline for this feature.

Completed on `feature/showdown-indicator-compact` (branched from `development`):
- Restored the independent `09-showdown-draft-indicator-v1.js` module without changing the frozen Candidate A calculation or the dedicated Supabase RPC.
- Replaced the always-visible panel with a compact, collapsed disclosure row. The current BLUE/RED edge is reflected in the collapsed summary; expanding reveals the score bar, explanation, and refresh control.
- Added exactly one script reference after the existing Match Indicator script in `index.html`.
- Preserved the existing Match Indicator module and the Tier List / TOP modules.

Commits:
- Module: `7d1f927c831a8b8f954d3f42df857f6286272db8` (initial compact module), then `a73275436dc41c80775a3f2b816a08b81666bf43` (live summary sync).
- Integration: `fb9b6d9ff411a4bd8d702ed3496f6c8649bd4720`.

Verification:
- JavaScript syntax compilation passed after the final summary-sync correction.
- Static checks confirm one script reference, the existing Match Indicator script still present, and the existing RPC call unchanged.
- No writes were made to `main`, `development`, or Supabase.

Still pending:
- Manual browser QA in the user's local development environment: collapsed height/placement, expand/collapse, summary updates after pick/remove/swap/reset, unknown-order guard, RPC error and refresh, and mobile layout.
- Do not merge into `development` or `main` until the user has tested and explicitly approved.

Next step:
- User checks out `feature/showdown-indicator-compact` locally and reports visual/interaction feedback. Fix any issues on this branch only.
