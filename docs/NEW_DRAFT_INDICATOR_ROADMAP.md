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
**Status: NOT STARTED**

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

### Phase 2 — Later-pick / composition contribution
**Status: NOT STARTED**

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

### Phase 3 — Map context
**Status: NOT STARTED**

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

### Phase 4 — Assemble and validate the independent model
**Status: NOT STARTED**

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

### Phase 5 — Separate UI integration (read-only alongside current indicator)
**Status: NOT STARTED**

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
