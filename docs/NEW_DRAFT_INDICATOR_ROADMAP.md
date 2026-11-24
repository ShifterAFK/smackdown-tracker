# New Draft Indicator — roadmap and work log

**Status:** Phase 0 audit completed; model study not started  
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

**Repository/runtime audit**
- Audited `main` and `development`. Both branches have the same `assets/js/modules/order.json` list.
- `order.json` loads `08-match-estimate-script-v1.js` after the shared assistant modules.
- The generated `assets/js/tracker-app.js` contains `match-estimate-script-v1` and `matchEstimate`, but does **not** contain `draft-indicator-rules-v1` or `draftIndicator`.
- `assets/js/modules/08-draft-indicator-rules-v1.js` exists in the repository but is **not loaded by the current app bundle**. Do not mistake this orphaned module for the live indicator.
- The actual current UI indicator is `08-match-estimate-script-v1.js`. It first tries to read the latest `model_snapshots` row, then falls back to a heuristic when the model cannot be read.
- Verified with SQL that neither `anon` nor `authenticated` can SELECT `public.model_snapshots`, and there are no table policies. The frontend request uses the publishable key, so the logistic snapshot is not available to the browser under current grants. The live UI therefore follows its fallback path: smoothed hero/DUO/Phantimal comparison (40% / 45% / 15% group weights, normalized over groups with data), with a minimum hero-support check. This is important when comparing the new model against the actual current UI.
- `docs/MATCH_INDICATOR_CURRENT_IMPLEMENTATION.md` currently describes `08-draft-indicator-rules-v1.js` as the active implementation. That statement conflicts with the current module order and generated bundle. This roadmap records the runtime evidence; the existing indicator code and database were not changed.

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

### Phase 4 — Assemble and validate the independent model
**Status: DONE — 2026-11-24**

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


#### Phase 4 results — provisional model and comparison (snapshot 2026-11-24)

**Actual current Match Indicator baseline**
- Runtime code: `assets/js/modules/08-match-estimate-script-v1.js`, loaded by `order.json` and present in `tracker-app.js`.
- The module attempts to fetch the latest `model_snapshots` row. The table has no SELECT privilege for `anon` or `authenticated` and no public policies; the frontend uses the publishable key. Therefore the logistic snapshot is not available to the browser and the current UI follows its fallback heuristic.
- The fallback requests `ss_get_stats(p_theme_id = selected map, p_exclude_mirrors = true)`. The SQL definition was inspected. It returns map-scoped hero, duo, and normalized Phantimal stats from approved matches.
- Fallback formula:
  - per-record smoothing: `(wins + 5) / (appearances + 10)`;
  - average supported heroes (3 heroes), weight 0.40;
  - average supported duos (3 pairs), weight 0.45;
  - Phantimal, weight 0.15 when supported;
  - weights are normalized over the groups that have data;
  - a side is eligible only when at least 2 of its 3 heroes have 5+ appearances;
  - the UI says “No clear indication” when absolute score difference is below 0.03.
- Phantimal normalization maps Celestial/Hypogean to Wedge of Matter. The mirror filter also excludes a Phantimal appearance when both teams have the same normalized Phantimal. This occurred in 425 approved matches in the audited current database.
- The current frontend does not use the orphaned `08-draft-indicator-rules-v1.js` module.

**Simplification for the new model**
- Tested a slot-specific later-pick model against a pooled later-pick model.
- Pooled later-pick history (pick 2 + pick 3 combined per hero and side) produced **702/1,235 (56.84%)**, compared with **703/1,234 (56.97%)** for the separate-slot model in the immediately preceding snapshot.
- The difference is negligible for this exploratory dataset. Pooling later picks lets the new indicator reuse existing RPCs and avoids adding a database function/migration:
  - `ss_get_stats(null, false)` for approved-match side baseline;
  - `ss_get_side_stats(null, false)` for total hero appearances/wins by side;
  - `ss_get_first_pick_stats()` for BLUE1/RED1 appearances and wins;
  - later-pick records are derived as side totals minus first-pick records.
- Existing `ss_get_first_pick_stats()` has the previously documented status-filter weakness; there are currently no nonapproved matches or picks. No RPC was changed.

**Frozen provisional specification**
Version: **`new-draft-indicator-v0.1`**

For each hero and side:
- First-pick stats are only BLUE1 or RED1.
- Later-pick stats pool that hero's appearances in pick 2 and pick 3 on the same side.
- Both are smoothed with 10 pseudo-appearances toward the relevant historical side baseline.

```
blueBase = prior BLUE wins / prior approved matches
redBase  = 1 - blueBase

firstLift(hero, side) =
  (firstWins + sideBase * 10) / (firstAppearances + 10) - sideBase

laterLift(hero, side) =
  (laterWins + sideBase * 10) / (laterAppearances + 10) - sideBase

delta =
  (blueBase - 0.5)
  + 1.5 * (BLUE1_lift - RED1_lift)
  + (BLUE2_laterLift + BLUE3_laterLift
     - RED2_laterLift - RED3_laterLift)
```

- Positive delta points to BLUE; negative points to RED.
- Neutral threshold for the initial UI candidate: `abs(delta) < 0.005`.
- This is a historical score difference, **not** a win probability.
- No map modifier, exact-pair/hero×class synergy, Phantimal bonus, H2H, player/rank, formation, or hidden-pool/ban simulation.
- No prediction is saved to the database; it recalculates from the current draft and historical RPC data.

**Leakage-safe comparison against the actual loaded current UI**
- Dataset: **1,295 matches with both draft-order flags known**; first 60 warm-up; **1,235 test matches**. Both models were evaluated in chronological order with the target match excluded from their own history.
- To keep the comparison fair, both models used the same known-order match population. The old fallback could theoretically use the four unknown-order matches too, but they were excluded from both histories.
- New pooled v0.1 candidate:
  - **702/1,235 = 56.84%** correct over all test matches;
  - 1,218/1,235 = **98.62%** directional coverage;
  - **57.64%** accuracy among directional calls (702/1,218).
- Always-BLUE baseline:
  - **671/1,235 = 54.33%**.
  - Paired comparison of new vs always-BLUE: 264 cases where the new RED call was correct vs 226 where it was wrong; exact two-sided p=0.0945. This is not strong evidence of improvement.
- Current Match Indicator fallback:
  - 514/1,235 = **41.62%** directional coverage;
  - **332/514 = 64.59%** accuracy among its directional calls;
  - 393 matches had insufficient hero support and 328 were neutral under its 0.03 threshold.
- On the 514 matches where the old fallback made a directional call, the new model made a directional call in 504. Among those 504 common directional cases:
  - new model correct: 290;
  - old fallback correct: 325;
  - 71 cases favoured the new model while 106 favoured the old fallback; exact paired p=0.0104.
- The new candidate is therefore a **higher-coverage, lower-selective-accuracy alternative**, not a demonstrated replacement or improvement over the current indicator.
- New candidate score thresholds were also inspected: at 0.03, coverage was 89.55% and covered accuracy 59.10%; at 0.05, coverage was 83.55% and covered accuracy 59.94%. These are descriptive threshold trade-offs, not tuned production settings.

**Validation limitations**
- This is one event/one evolving meta, not an untouched external holdout.
- The model/weight candidates were explored on the same chronological test window; the reported numbers are exploratory and must not be advertised as a guaranteed future accuracy.
- No genuine prospective forecast log exists yet. The current `ss_match_predictions` records are calculated after the outcome is known.
- No probability calibration was performed; do not show probability percentages.

**Phase 4 go/no-go**
- **GO** for a separate experimental UI view because the user explicitly wants a second indicator and the candidate gives a direction on many more drafts.
- **NO-GO** for replacing the current Match Indicator or claiming superior prediction quality. The current fallback is more accurate when it elects to make a directional call.
- Keep both indicators visible and clearly label the new one as experimental, historical score difference, not probability.
- Use existing RPCs; no new Supabase schema, RPC, or migration is required for v0.1.

### Phase 5 — Separate UI integration (read-only alongside current indicator)
**Status: IN PROGRESS — 2026-11-24**

Tasks:
- Add a separate UI block/tab/section with a clear name such as **NEW DRAFT INDICATOR**.
- Keep current Match Indicator visible and unchanged.
- Give the new indicator its own explanation/details and model version.
- Ensure both indicators update from the same current draft without sharing mutable score state.
- Make it obvious that the new one is experimental and not a win probability.
- Keep implementation small and avoid unrelated layout/refactor work.

Deliverable:
- A separately viewable indicator in the tracker, plus a short manual test checklist.

Exit gate:
- Verify the old indicator's output and code path are unchanged; verify both views update correctly on pick add/remove/reset and on data refresh.

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
- **Phase 0 — Baseline and data audit.** Start by inspecting the live Supabase schema/data and active branch integration points. After the audit, update this file before Phase 1.

---

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


### 2026-11-24 — Phase 4 completed; Phase 5 started
Completed:
- Inspected the actual current Match Indicator fallback and its SQL data source, smoothing, group weights, support gate, Phantimal normalization, and neutral threshold.
- Confirmed the frontend cannot read `model_snapshots`; the live current UI uses the fallback heuristic.
- Compared the provisional new model with the actual fallback and always-BLUE on the same leakage-safe chronological test matches.
- Tested pooling pick 2+3 history. It performs nearly identically to slot-specific history and allows reuse of existing RPCs.
- Frozen provisional version `new-draft-indicator-v0.1` and its score formula.

Decisions:
- Build a separate experimental view, not a replacement.
- New model is higher coverage but has lower accuracy among directional predictions than the current selective fallback.
- No new Supabase migration/RPC is needed for v0.1.
- Do not present score as probability or claim proven improvement.

Next:
- **Phase 5 — Separate UI integration.** Add a standalone module/view and bundle entry while leaving `08-match-estimate-script-v1.js`, Tier List, Tier Side, TOP Picks, and existing database objects unchanged. Verify both indicators update independently with draft edits/reset/data refresh.
