# AI Session Handoff — AFK Journey Tracker

> **READ THIS FILE FIRST after every context loss, Retry, new chat, or resumed work.**
>
> This is the operational restart document. It is not a replacement for source data, technical specifications, or detailed work logs. It tells the next assistant what the project is actually about, which records are authoritative, what must not be repeated, and how to resume without restarting completed work.

**Repository:** `ShifterAFK/smackdown-tracker`  
**Working branch:** `development`  
**Production branch:** `main` — do not modify unless the user explicitly authorizes it  
**Last repository audit recorded here:** 2026-11-25 (historical audit snapshot; later state reconciled in ACTION 0008)  
**Last confirmed development HEAD before ACTION 0024:** `d12fd655a1ecf39fb8522e9ef9640689a25b0bc1`  
**Current task family:** empirical evaluation of 3v3 Showdown match outcomes, separating hero baselines, teammate effects, ability-derived relations and opponent/context effects  
**Current analysis artifacts:** the approved ability-analysis pilot and second batch cover 10 heroes; these remain supporting evidence only. The approximately 50 unrecorded matches are reserved as an independent test set and must remain unused until model freeze.  
**Current stage:** read-only/offline M0–M3 backtest, robustness/sensitivity, diagnostics, hero-effect stability and calibration analyses, plus M4–M6 ability-feature feasibility analysis completed on the 1,421-match complete-order sample (910 out-of-fold predictions across three expanding chronological folds). M3 is reproducible but remains a weak, provisional discriminator: predictions cluster near 0.5, hero effects are draft-slot- and time-dependent, and calibration shifts direction across chronological folds. A prior-fold intercept-only correction improved fold 2 point metrics but worsened fold 3; paired bootstrap intervals included zero in both folds. No recalibration method is approved. M4 team-function features did not improve pooled log loss/Brier over M3; M5/M6 interaction estimation is not supported by current profile coverage, annotations and match telemetry. No model freeze or production implementation is approved. The approximately 50 unrecorded matches remain reserved and untouched.  
**Current draft rules confirmed by the user:** Blue picks 1 hero, Red picks 2, Blue picks 2, Red picks 1; the random 20-hero pool is not an available/savable model input and must not be assumed  
**Current model direction:** compare a Blue-side baseline, context, class composition and regularized hero effects first (M0–M3); test ability functions, directed teammate interactions and directed opponent interactions only when coverage supports them (M4–M6). Use chronological walk-forward validation and ablation; distinguish association from causation.  
**Current implementation status:** fixed-penalty offline model fitting has been performed for evaluation only. No production model, scoring weights, prediction, UI, application code, schema, RPC, migration or Supabase write is approved or implemented.

---

## 1. First rule: recover context before doing work

When a session starts, context is missing, or the user presses Retry:

1. Fetch the **current** `docs/AI_SESSION_HANDOFF.md` directly from GitHub on branch `development`; do not rely on a prior-chat copy, attachment, or memory summary.
2. Check the current `development` branch HEAD SHA and record it for the session.
3. Read this Handoff from top to bottom, including the latest ACTION entries and restart point.
4. Read only the current source-of-truth documents and data files needed for the active task, as directed by this Handoff.
5. Identify the last **confirmed completed** action and the first **not completed** action.
6. Verify whether an action marked STARTED/INTERRUPTED actually changed anything before retrying it.
7. Continue from that exact point. Do not restart a phase, batch, extraction, audit, or analysis that is already complete.
8. If GitHub cannot be read, report a BLOCKER with the last confirmed HEAD; do not assume any local or previous-chat copy is current.

**Retry is not permission to replay the whole workflow.** It means recover the state, verify the last operation, and resume only the unfinished part.

If the current repository contradicts this file, the repository's current contents and commit history take precedence. Update this file with the discrepancy before proceeding.

## 2. What we are trying to build

The target is a **new and independent indicator/analysis of team composition based on the actual functions and effects of heroes' abilities**.

The intent is to move beyond treating official class labels or raw hero win-rate correlations as an explanation of what a team can do.

The analysis should be grounded in evidence about ability behavior, for example:

- damage profile: burst, sustained, area, single-target, execute/finisher;
- control and disruption: interruption, disable, silence, crowd control, displacement, ultimate denial;
- support: ally buffs, attack/speed amplification, energy/ultimate support, healing, shielding;
- durability and protection: damage reduction, self-sustain, peel, resurrection/survival effects;
- specialist mechanics: summons, marks/focus targets, anti-heal, anti-shield, anti-summon, conditional/counter effects;
- triggers, targets, conditions, duration, range, cooldowns and restrictions where the source provides them;
- interactions between abilities and whether team members can exploit another hero's effects.

These are examples of candidate descriptive dimensions from the project plan, **not a final approved taxonomy, score, or weighting system**.

A hero can perform multiple functions. Do not force every hero into one exclusive role. Official class is metadata, not a substitute for kit analysis.

Keep three kinds of output distinct:

1. **Descriptive:** what abilities and functions are present in a team.
2. **Predictive:** whether derived team features improve out-of-sample prediction against honest baselines.
3. **Explanatory:** which interactions may help explain observed results, with confounders and uncertainty stated.

A correlation is not automatically a synergy, counter, cause, or guaranteed advantage.

### Important ambiguity to preserve

The current plan describes analysis derived from ability descriptions and effects. It does **not** establish that the tracker has frame-by-frame combat logs or telemetry of actions actually executed during matches. Do not claim that such telemetry exists. Inspect the available data before deciding whether the indicator can use actual in-match action events or must initially infer functional capabilities from documented abilities.

## 3. Keep these workstreams separate

### A. Hero Knowledge Base — supporting data work

This is the long historical effort to collect, normalize, reconcile and validate hero ability knowledge.

It is a supporting data foundation. It is **not itself the new indicator**, and completing data normalization does not mean the composition model exists.

### B. New Hero/Composition Analysis — actual target

The current planning document is:

- `docs/HERO_KNOWLEDGE_AND_COMPOSITION_ANALYSIS_PLAN.md`

Its recorded status is:

- **Proposed — planning only; implementation not started.**
- It proposes a knowledge layer followed by read-only composition feature extraction, exploratory analysis, chronological predictive evaluation, and only later a separate experimental UI.
- Its next action says Phase 0: inspect the hero catalogue, sources and patch/version handling, then prepare a schema proposal and coverage checklist.
- It explicitly says not to change existing indicators, Tier List or TOP Picks.

Do not silently promote proposed phases or candidate features into approved requirements. Confirm decisions with the user when approval is required.

### C. Existing indicators — protected, not the target

Existing Match Indicator and Showdown Draft Indicator are separate, already-existing workstreams.

Do not:
- rename the old indicator and call it the new model;
- reuse its formula as if it were the action-based model;
- alter its code, RPCs, UI, weights or behavior as part of this task;
- change Tier List or TOP Picks;
- assume that the old Draft Indicator roadmap is the current task.

Relevant existing implementation files include:
- `assets/js/modules/08-draft-indicator-rules-v1.js`
- `assets/js/modules/09-showdown-draft-indicator-v1.js`

These paths are context only. Do not edit them without a separately approved reason.

## 4. Verified repository state at the last audit

The following facts were read from `development` on 2026-11-25. They are a dated snapshot and must be rechecked before relying on them after the branch advances.

### Hero knowledge progress

Source of truth:
- `docs/HERO_KNOWLEDGE_PROGRESS.md`

At the audited revision, its latest restart instruction is **Stage 2AD4**:
- try alternate retrieval routes for 20 profiles whose direct Stargazer page fetches were unavailable;
- verify source version and patch applicability per hero;
- expand AFK.global cross-checks beyond the five reviewed profiles;
- preserve Season Skill separately from Season Charm;
- only then consider an import schema/dry-run.

This Stage 2AD4 instruction belongs to the **hero-source verification workstream**. It is not permission to restart the extraction or to import data.

### Consolidated V4 dry run

Canonical index:
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`

Validation:
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`

Audit:
- `docs/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_AUDIT.md`

Recorded V4 state:
- 131 tracker heroes represented; no missing or unexpected hero IDs;
- 237 capture records;
- 1,329 section evidence records;
- 1,032 unique logical sections;
- 301 sections with consistent explicit per-section tags;
- 731 sections with unknown per-section tags;
- zero tag conflicts;
- zero unresolved section-type conflicts;
- zero source/locale/provenance mismatches;
- 20 profiles pending direct page retrieval;
- 131 profiles pending patch verification;
- 126 profiles pending broader secondary-source review;
- five profiles cross-checked against a secondary source;
- three AFK.global Season Skill observations kept separate from Stargazer Season Charm.

**Critical limitation:** V4 is explicitly `consolidated_dry_run_not_for_import`. It must not be imported into Supabase. Descriptions are paraphrased summaries, not verbatim source text. No source patch/version was verified for any of the 131 profiles. Unknown tags must remain unknown; they do not mean that an ability has no mechanic.

The V4 shards are:
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_01.json`
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_02.json`
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_03.json`
- `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_04.json`

The canonical index, not an old V1/V2/V3 shard or a chat summary, identifies the current consolidated data set.

### New analysis plan

Source of truth:
- `docs/HERO_KNOWLEDGE_AND_COMPOSITION_ANALYSIS_PLAN.md`

This plan was created on 2026-11-25 and is marked planning only. It says:
- do not equate official class with practical function;
- record ability facts, conditions, targets, durations and limitations;
- permit multiple functions per hero;
- keep facts separate from hypotheses;
- version knowledge by patch;
- preserve provenance and confidence;
- do not claim causation from correlation;
- begin composition analysis only after adequate, verified knowledge coverage;
- test hypotheses against match data with sample sizes, uncertainty and opponent context;
- evaluate predictive value chronologically/out of sample;
- only consider a separate UI after the analytical gates pass.

Initial Lily May + Ravion observations are explicitly illustrative and based on only three matches. They are not established synergy rules and must not be hard-coded.

## 5. What is not established or approved

Unless a newer source document or explicit user decision proves otherwise, treat these as OPEN / NOT APPROVED:

- final scoring formula and weights for the action/ability model;
- final indicator formula and all weights;
- any fixed hero role or one-role-per-hero assignment;
- any hard-coded synergy or counter bonus;
- whether match-level combat action telemetry is available;
- minimum sample thresholds and shrinkage settings;
- whether high-rank matches should receive extra weight;
- whether the eventual output should be a single score, multiple dimensions, or both;
- whether/when to create a UI;
- any Supabase schema, RPC, table, or data import;
- any change to existing indicators or other production-facing features.

Do not invent answers to these questions. Search the repository and available data first; ask the user only when the decision genuinely requires their approval.

## 6. Mandatory operating rules

### One active task

- Work on one explicitly identified task at a time.
- Do not expand scope into unrelated tracker features.
- Before a tool operation, know which task and phase it belongs to.

### Before touching code or data

- Identify the active file, function, call path and script/module load order.
- Inspect the existing implementation in place.
- Prefer modifying an existing implementation in place only when the change is approved.
- Do not add duplicate functions, overrides, CSS/JS files, or script/link tags without explicit approval.
- Do not touch Supabase, `main`, migrations, production RPCs or existing indicators unless explicitly authorized and justified.

### Evidence and status language

Every claim must be labelled correctly:
- **PROPOSAL** — suggested, not approved;
- **APPROVED** — user accepted the decision;
- **EXECUTED** — a tool confirmed the operation;
- **TESTED** — a named test ran and its result is recorded;
- **BLOCKED** — cannot proceed, with the reason;
- **SUPERSEDED** — replaced by a newer decision/result, with a pointer to it.

Never describe a plan as implementation, a code write as a passing test, a static inspection as runtime verification, or a rendered layout as visually approved. Visual appearance is not verified until the user confirms it in Live Preview.

### Small, recoverable operations

- Break long tasks into small batches with explicit boundaries.
- Before each meaningful operation, record what is about to be done and its exact target.
- After each operation, record the actual result, including errors, counts, file paths, commit IDs, query/RPC names, test commands and test output as applicable.
- Do not leave a 30-minute chain of uncheckpointed work.
- Do not launch multiple dependent writes in parallel.
- Keep the last known-good state and the next single action explicit.



### Mandatory Handoff update after every project interaction

- Treat every user turn about this project as an interaction that must be reflected in this file before the response is considered complete.
- Record user decisions, approvals, scope changes, corrections, blockers and next-step instructions in the action log, even when the interaction does not trigger a repository or database operation.
- Record each meaningful tool operation and its actual result. For a discussion-only interaction, add a concise interaction/action entry stating what was decided or clarified and whether repository state changed.
- Update the current-state and restart-point blocks whenever the status, constraints, completed work or next action changes.
- Do not end a project task response while this handoff is stale. If an operation is interrupted or blocked, record that state and the verification/next action before ending the turn.

### Retry / timeout / interruption protocol

If a tool call times out, a response is truncated, the model is interrupted, or the user presses Retry:

1. Mark the operation `INTERRUPTED/UNKNOWN`, not FAILED, unless the tool explicitly confirms failure.
2. Do not immediately repeat it.
3. Inspect the target resource: fetch the file, check the branch HEAD/commit history, query the relevant read-only state, or inspect the operation's status.
4. Decide whether the operation:
   - completed despite the lost response;
   - did not happen;
   - partially completed;
   - remains genuinely unknown.
5. If it completed, record the confirmed result and continue with the next action.
6. If it did not happen, retry only that operation.
7. If it partially completed, reconcile the partial result before doing anything else.
8. For non-idempotent actions (commits, inserts, migrations, imports, file creation), never blindly replay. Check for the created artifact/commit/row first.
9. Preserve the original action ID and add a retry attempt entry. Do not erase the failed/interrupted attempt.

**Never restart a whole batch or phase because the conversation context was lost.**

## 7. Required action log format

Append a record for every meaningful operation: repository/file read, search, data query, analysis run, code edit, document edit, test, commit, deployment, or external mutation.

Use this format:

```md
### ACTION <monotonic-id> — <short verb + target>
- Started: <date/time + timezone, if known>
- Task / phase: <one active task and phase>
- Status: STARTED | COMPLETED | FAILED | INTERRUPTED/UNKNOWN | BLOCKED
- Purpose: <why this operation is necessary>
- Exact target: <repo, branch, path, function, query, RPC, dataset, or test>
- Inputs / prior state: <commit SHA, file SHA, row count, parameters, source refs>
- Operation: <what was actually called or changed>
- Result: <measured output, exact error, counts, or explicit no-change>
- Evidence: <tool result, commit SHA, test output, file path>
- Decision: <what this result means; separate fact from interpretation>
- Next single action: <one precise next operation>
```

Rules:
- Never write `done` without describing what was done and the evidence.
- Never overwrite an earlier action record. Append a correction or superseding record and link to the old ID.
- If an operation has several independent substeps, log each substep separately.
- If work is interrupted before the result is known, leave the action open as INTERRUPTED/UNKNOWN and make verification the next action.
- Keep a concise current-state block near the top of this file updated after each completed stage. The detailed action history remains append-only.

## 8. Required checkpoint after every stage

At the end of each coherent stage, update the relevant progress document and this handoff file with:

1. what was executed;
2. exact files/data/functions touched;
3. what was tested and exact result;
4. what was not done;
5. decisions approved by the user;
6. blockers and unresolved questions;
7. exact next action;
8. commit SHA / migration ID / test artifact, if any.

Commit one coherent documentation or code change at a time on `development`. Before committing, show the user the exact paths and a minimal diff. Do not commit unrelated changes.

## 9. Resume checklist — use this verbatim

- [ ] Read `docs/AI_SESSION_HANDOFF.md` first.
- [ ] Check current `development` HEAD; compare with the recorded SHA.
- [ ] Read `docs/HERO_KNOWLEDGE_AND_COMPOSITION_ANALYSIS_PLAN.md`.
- [ ] Read `docs/HERO_KNOWLEDGE_PROGRESS.md` and identify its latest restart point.
- [ ] Read the canonical V4 index and validation only if hero-data state is relevant to the next action.
- [ ] Inspect the action log for STARTED or INTERRUPTED/UNKNOWN operations.
- [ ] Verify whether the last operation took effect before retrying anything.
- [ ] State the one active task, current phase, last confirmed result and next single action.
- [ ] Do not edit code or Supabase until the exact target and approval are clear.

## 10. Current restart point after ACTION 0031

**M3 calibration analysis (2026-11-27; read-only):**
- Re-extracted the same 1,421 approved complete-order matches and reconstructed the established global slots Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3. Generated 910 OOF predictions across the same expanding chronological folds: 511/270, 781/366 and 1,147/274 (train/validation).
- Refit the fixed M3 specification: training-only map, official class-by-global-slot and hero-identity-by-global-slot features; L2 lambda=0.1; unpenalized intercept. The corrected objective reproduced the previously recorded OOF metrics to reported precision. The final optimizer run reached its 1,000-iteration cap; maximum gradient residuals by fold were approximately 5.2e-8, 1.03e-6 and 2.36e-6. Treat this as a metric/prediction consistency check, not as all fits meeting the earlier strict gradient tolerance.
- Calibration-in-the-large (mean predicted Blue probability minus observed Blue win rate): fold 1 +3.00 percentage points (57.45% vs 54.44%); fold 2 +4.14 pp (56.33% vs 52.19%); fold 3 -1.65 pp (53.09% vs 54.74%); pooled +2.06 pp (55.69% vs 53.63%).
- Pooled M3 metrics remained log loss 0.6879996, Brier 0.2473894, accuracy 54.51% and AUC 0.5539. Equal-count reliability deciles showed non-monotonic observed rates and local prediction/observation deviations.
- Intercept-only logistic recalibration used only earlier OOF outcomes to adjust the next fold. Fold 2 used fold 1 outcomes (offset -0.12294 logit): log loss/Brier changed from 0.690504/0.248615 to 0.687265/0.247040. Fold 3 used folds 1+2 outcomes (offset -0.14903): metrics changed from 0.683992/0.245435 to 0.689212/0.248031.
- Paired 2,000-resample bootstrap 95% percentile intervals for adjusted-minus-raw metrics included zero in both folds: fold 2 log loss [-0.00990, 0.00320], Brier [-0.00489, 0.00163]; fold 3 log loss [-0.00334, 0.01406], Brier [-0.00166, 0.00695]. Intercept adjustment leaves AUC/ranking unchanged but can change threshold-based accuracy.
- Interpretation: calibration direction changes over time. The prior-fold intercept-only correction did not transfer consistently; no recalibration method or parameter is approved. M3 remains weak/provisional, with no model freeze or deployment.
- Transient issues: an initial prototype used incorrect L2 scaling and was discarded; a subsequent tool execution timed out without persistent effects; the corrected objective was rerun. No tuning or alternative model was performed.
- The approximately 50 reserved unrecorded matches were not accessed, entered or used. No Supabase writes, code changes, prediction-row changes, persistent analysis artifacts or production implementation occurred.

**Task:** evaluate 3v3 Showdown match outcomes empirically, separating individual hero performance from teammate-dependent effects and testing whether ability-derived relations add value beyond hero identity, official class and match context. empirically, separating individual hero performance from teammate-dependent effects and testing whether ability-derived relations add value beyond hero identity, official class and match context.

**Approved model-design direction (analysis design only; no implementation approved):**
- **M0 — side baseline:** observed Blue win baseline is 784/1,425 (55.02%); on the 1,421-match complete-order sample it is 782/1,421 (55.03%). For every validation fold, calculate the baseline from that fold's training data only.
- **M1 — match context:** map, side and exact pick-order context are available, but map is strongly confounded with calendar period. The event field has only one observed value and adds no variation. The global pick sequence is fixed (Blue 1, Red 2, Blue 2, Red 1); only the selected heroes' slot assignments vary.
- **M2 — official classes:** class composition is sufficiently varied for an initial ablation: 54/56 possible three-hero class compositions occur for Blue and 55/56 for Red; 44 Blue and 43 Red compositions occur at least 10 times.
- **M3 — hero identity:** 110 observed heroes. Median overall appearances per hero: 72. In the first training window all 110 are represented, median 25.5 appearances; 93 have at least 10 appearances. Use regularized or hierarchical hero effects, not unpooled independent estimates.
- **M4 — ability-derived team functions:** test only when hero-profile coverage is adequate; unknown or missing profile information must remain unknown, not be encoded as absence of a mechanic.
- **M5 — teammate interactions:** estimate incremental teammate contribution beyond both heroes' individual baselines. Keep A→B and B→A directions separate; raw pair win rates are not proof of synergy.
- **M6 — opponent interactions:** test candidate kit-derived relations as hypotheses, not as proof that an ability triggered or caused a result.
- Compare feature blocks with nested ablations on identical splits. Prefer a transparent regularized logistic or hierarchical model over a black-box first model.

**Read-only feasibility findings (2026-11-26):**
- 1,425 approved historical matches have six distinct hero selections, a 3v3 split, a winner and map context. All 1,425 have a non-null played_at; timestamps are unique, so chronology has no timestamp ties.
- Both sides' exact draft order is complete in 1,421 matches. Four matches have neither side's order complete; no partial-order cases were observed. The proposed common M0–M3 evaluation sample is therefore 1,421 matches.
- Five maps are represented. Map occurrence is strongly time-segmented in the recorded period: Tranquil Grounds appears Nov 11–13, Top Defender Nov 14–16, Siegebreaker Nov 17–19, Fierce Duel Nov 20–22, and Tactical Grounds Nov 22–25. The first fold has no Fierce Duel training examples; the second has no Tactical Grounds training examples. Map effects therefore cannot be cleanly separated from calendar-period effects in these data.
- The event field has one observed value (showdown-current), so it cannot explain between-match variation in this sample.
- The official class catalogue has six classes, with 15–23 heroes per class. Three-hero class composition has broad support: 54/56 possible Blue combinations and 55/56 Red combinations appear; 44 Blue and 43 Red combinations have at least 10 observations.
- Hero frequency is sufficient for a regularized first identity model but remains uneven: 110 observed heroes, 9–174 appearances overall, median 72; in the first training window median appearances are 25.5, four heroes have fewer than five appearances, and 93 have at least ten.
- The existing ss_match_predictions rows are not a prospective benchmark: all 1,425 historical prediction rows were calculated with the outcome already known. Do not use them as out-of-sample predictions.
- created_at is not a substitute for match chronology: 1,046 records have played_at < created_at. The chronology must use played_at. At each proposed fold cutoff, all training matches were already created before that cutoff, so the selected expanding-window training sets do not include records first created after their cutoff.
- The reserved approximately 50 unrecorded matches were not accessed, entered or used.

**Proposed common chronological expanding-window splits (UTC cutoffs; complete-order sample only):**

| Fold | Training matches | Validation matches | Validation period |
|---|---:|---:|---|
| 1 | 511 | 270 | Nov 20–21 |
| 2 | 781 | 366 | Nov 22–23 |
| 3 | 1,147 | 274 | Nov 24–25 |

The three validation windows are disjoint and cover 910 matches. In fold 1, the training-only Blue baseline is 294/511 (57.53%); validation Blue rates are 147/270 (54.44%), 191/366 (52.19%) and 150/274 (54.74%) in the three successive validation windows. These are descriptive baselines, not fitted model results.

**Leakage-safe feature rules:**
- Use played_at for chronological ordering. For each fold, fit all parameters, class/hero effects, encoders and any historical aggregates on training rows only.
- Calculate the Blue-side baseline separately from the training portion of each fold; do not use the global 55.02% baseline as a fold prediction.
- For any future rolling hero/class/map win-rate feature, use only matches strictly earlier than the target match and ensure the data record was available by the prediction cutoff. Exclude the target match itself.
- Treat map as an available categorical input but flag the period confounding and unseen-map problem in folds 1 and 2. Do not interpret its fitted coefficient as a causal map effect.
- The fixed global pick sequence is not a varying feature. If testing draft-order effects, use hero/class identity by pick slot and only matches with complete order.
- Compare M0–M3 on identical folds and identical rows. No model has been fitted or tuned in this feasibility stage.

**Validation and test-set rules:**
- Use chronological walk-forward / expanding-window splits and prevent future leakage.
- Compare feature blocks on identical splits. Primary metrics remain log loss and Brier score; secondary metrics accuracy and AUC. Inspect calibration and uncertainty.
- Match-level associations cannot establish that an ability interaction actually occurred or caused a win.
- Approximately 50 unrecorded matches remain reserved as an independent test set. Do not enter, inspect for tuning, or otherwise use them before a model version is frozen.
- Do not alter existing indicators, Tier List, TOP Picks, application code, Supabase schema/data, migrations, V4 data or hero JSON artifacts without separate approval.

**Offline M0–M3 backtest results (2026-11-26; fixed exploratory specification):**
- Common sample: 1,421 approved matches with all six distinct picks and complete order on both sides. Three disjoint expanding-window validation folds: 511/270, 781/366 and 1,147/274 (train/validation), totaling 910 out-of-fold validation predictions.
- Global pick slots encoded in the order Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3. M0: training-only Blue win-rate intercept. M1: map categorical effects. M2: M1 plus official class indicators by global pick slot. M3: M2 plus hero-identity indicators by global pick slot. L2 penalty lambda=0.1 on non-intercept coefficients, fixed for this run; no hyperparameter tuning. All fitted models reached the gradient tolerance.
- Pooled out-of-fold metrics (log loss / Brier primary; accuracy / AUC secondary):
  - M0: 0.692305 / 0.249568; accuracy 53.63%; AUC 0.4987.
  - M1: 0.692916 / 0.249869; accuracy 53.63%; AUC 0.4908.
  - M2: 0.690742 / 0.248753; accuracy 53.52%; AUC 0.5318.
  - M3: 0.687999 / 0.247389; accuracy 54.51%; AUC 0.5539.
- M1 did not improve on M0. M2 showed small point improvements over M1/M0, but paired bootstrap intervals for M2 versus M1 and M0 included zero. M3 improved on M2 in each fold; paired bootstrap for M3 minus M2 gave log-loss difference -0.002743 (95% interval -0.004643 to -0.000767) and Brier difference -0.001364 (-0.002286 to -0.000405). M3 versus M0 was directionally better (log-loss -0.004290; Brier -0.002140), but both paired intervals included zero.
- Interpretation: the hero-identity-by-pick-slot block contains incremental predictive signal beyond official class in this sample. The evidence does not yet establish a reliable improvement over the side-only baseline, nor does it justify freezing or deploying M3.
- Caveats: map is confounded with calendar period and is unseen in validation folds 1 and 2; no player identifiers or execution telemetry are available. Bootstrap intervals are conditional on the generated out-of-fold predictions and do not refit models inside each resample. Match-level associations are not causal evidence.
- The reserved approximately 50 unrecorded matches were not accessed, entered or used. No database writes, code changes, prediction-row changes or production implementation occurred.

**Robustness/sensitivity analysis (2026-11-26; read-only):**
- Re-fetched and validated the same 1,421 approved complete-order matches with six distinct heroes and complete per-side pick order; 910 out-of-fold validation rows remained split across the same three expanding chronological folds (511/270, 781/366, 1,147/274 train/validation).
- Reproduced the original M1–M3 pooled metrics at the original fixed L2 penalty lambda=0.1, including M3 log loss 0.687999 and Brier 0.247389. The M0 baseline was unchanged.
- Refit M1, M2 and M3 at lambda values 0.01, 0.03, 0.1, 0.3 and 1.0, using the same training-only encoders, chronological folds and non-intercept L2 penalty. No value was selected and no tuning was performed.
- Pooled M3 log loss / Brier by lambda: 0.01 = 0.699725 / 0.251548; 0.03 = 0.689791 / 0.247983; 0.1 = 0.687999 / 0.247389; 0.3 = 0.689649 / 0.248250; 1.0 = 0.691274 / 0.249059. M3 improved over M2 on both primary metrics at all five penalties. Relative to M0 (0.692305 / 0.249568), M3 improved at 0.03–1.0 but not at 0.01.
- Ablation without map effects (class-by-slot plus hero-by-slot) slightly outperformed M3 with map effects on pooled log loss and Brier at all five penalties. At lambda=0.1, no-map M3 was 0.687342 / 0.247070 versus 0.687999 / 0.247389 with map effects. This is a small observational difference, not proof that maps have no predictive value; map/calendar confounding and unseen validation maps remain.
- At lambda=0.1, M3 with map effects improved on M0 and M2 in each of the three validation folds. The fold-level direction was consistent with the original backtest.
- Sensitivity findings are conditional on this dataset and fixed chronological folds. No paired bootstrap was rerun for every lambda/ablation; do not infer statistical significance for those new comparisons. The earlier paired bootstrap result for M3 versus M2 at lambda=0.1 remains the only interval estimate recorded in ACTION 0026.
- An initial SQL filter used lowercase side/winner values and returned zero rows; the filter was corrected to the stored uppercase enum values, then the expected 1,421 records were retrieved and validated before analysis. No source data was changed.
- The approximately 50 reserved unrecorded matches were not accessed or used. No database writes, code changes, prediction-row changes, persistent analysis artifacts or production implementation occurred.

**Decision / interpretation:** the hero-identity-by-pick-slot signal beyond class is directionally robust across moderate L2 penalties and all three time folds. Very weak regularization (lambda=0.01) overfits and loses to M0. Removing map effects produces a small improvement in this sample, but map/calendar confounding prevents a strong conclusion. M3 remains provisional: improvement over M0 is not established by the earlier paired intervals, and no model is frozen or approved for deployment.

**M4–M6 ability-feature analysis (2026-11-26; read-only):**
- Re-read the current composition-analysis plan, hero progress log and the two approved ability JSON artifacts. The structured pilot/batch profiles cover 10 heroes: Lily May, Ravion, Odie, Himmel, Valka, Cecia, Granny Dahnie, Indris, Nerion and Solise. They contain 112 ability mechanics, 32 team functions and 20 directed interaction records (10 ally, 10 opponent). All 20 interaction records lack a populated `beneficiary_capability` field; source descriptions are paraphrased and patch labels remain unverified.
- Re-extracted the same 1,421 approved complete-order matches with six distinct heroes and complete per-side order. The three existing expanding-window folds produced 910 out-of-fold predictions (511/270, 781/366, 1,147/274 train/validation). No reserved unrecorded matches were accessed.
- Profile coverage is sparse: 691/1,421 matches have at least one profiled hero, 137 have at least two and 14 have three. Across 2,842 team instances, 771 have at least one profiled hero, 66 have at least two and five have three. Both sides have at least one profiled hero in only 80 matches; no match has at least two profiled heroes on both sides.
- **M4 — team-function composition:** added five per-team function-count differences (damage, support, control/disruption, durability, specialist) and known-profile coverage difference to M3, keeping lambda=0.1 and the same folds. Pooled OOF M4 log loss/Brier = 0.689887/0.248267 (accuracy 54.62%, AUC 0.5452), versus M3 0.687999/0.247389 (54.51%, 0.5539). M4 is worse on both primary metrics by +0.001887 log loss and +0.000877 Brier. In 10,000 paired bootstrap resamples, the M4-minus-M3 95% intervals were [-0.000231, 0.004126] for log loss and [-0.000147, 0.001959] for Brier; both include zero. M4 does not demonstrate incremental predictive value beyond M3.
- **M5 — directed ally interactions:** the 10 ally interaction records lack beneficiary-capability annotations. There are 36 observed directed same-team source/target co-occurrence combinations; the maximum is Ravion→Lily May with seven matches, four combinations reach five, and none reaches ten. Co-occurrence cannot establish that an interaction triggered or contributed to the result. No valid directed ally-effect estimate or M5 model was fitted.
- **M6 — directed opponent interactions:** 47 directed cross-side source/target co-occurrence combinations were observed; the maximum is Lily May→Solise with ten matches, five reach five, and one reaches ten. Current records lack opponent-vulnerability annotations and actual ability activation/target telemetry; dynamic target selectors and conditions cannot be verified from match-level picks. No M6 model was fitted.
- Two transient analysis issues were corrected before accepting results: a SQL pair-summary alias error, and an in-memory prototype that initially failed to reproduce M3 because of slot extraction/fold indexing. The corrected analysis reproduced M3 to the previously reported precision. No persistent analysis artifact was created.
- No Supabase writes, application/code changes, prediction-row changes, model freeze, production implementation, V4/hero JSON edits, existing indicator changes, Tier List/TOP Picks changes or `main` changes occurred.

**Decision / interpretation:** M4 is not supported as incremental predictive signal beyond M3 on the current sample. M5 and M6 are NO-GO for predictive interaction estimation with current coverage and evidence. Do not treat same-team or cross-team co-occurrence as proof of synergy, counter, trigger or causation. M3 remains provisional and is not frozen.

**M3 diagnostic analysis (2026-11-26; read-only):**
- Re-extracted and validated the same 1,421 approved complete-order matches, six distinct picks per match and 110 observed heroes; generated 910 out-of-fold predictions on the same expanding chronological folds (511/270, 781/366, 1,147/274 train/validation).
- Corrected an initial transient in-memory feature-indexing defect (the intercept shared an index with the first category); the corrected fit reproduced M0 and M3 to the previously reported precision. The faulty prototype output was discarded; no source data was changed.
- M3 fold log loss/Brier/accuracy: fold 1, 0.688672/0.247710/54.07%; fold 2, 0.690504/0.248615/54.37%; fold 3, 0.683992/0.245435/55.11%. Pooled metrics remain 0.687999/0.247389 and 54.51% accuracy.
- Mean predicted Blue win probability was 55.69% against an observed 53.63% Blue win rate (calibration-in-the-large +2.06 percentage points). M3 overpredicted Blue in the first two validation folds and underpredicted in the third. 84.5% of predictions fell between 0.40 and 0.60; 15.5% were at least 0.60, only two exceeded 0.70, and none exceeded 0.80.
- Slot-permutation diagnostics (300 permutations per global slot per fold) showed small, non-uniform model reliance; Blue pick 3 had no consistent positive contribution. This measures model reliance under permutation, not causal contribution or a universal hero ranking.
- Interpretation: M3 is reproducible but has weak out-of-fold discrimination and time-varying calibration. It may support experimental complete-draft evaluation, but is not yet suitable for next-pick recommendations or a reliable hero ranking. Earlier paired intervals still do not establish a conclusive improvement over M0.
- The approximately 50 reserved unrecorded matches were not accessed or used. No Supabase writes, code changes, prediction-row changes, persistent analysis artifacts, model freeze or production implementation occurred.

**Next single action:** await the user's decision on the next analytical phase. Do not freeze a model, access the reserved independent test set or begin production implementation without separate authorization.
## 11. Initial audit log

### ACTION 0001 — Audit history and current repository state
- Started: 2026-11-25
- Task / phase: context recovery / repository audit
- Status: COMPLETED
- Purpose: distinguish historical hero-data work, the actual new composition-analysis target, and existing indicators before creating a durable handoff.
- Exact target: uploaded `afk.txt`; repository `ShifterAFK/smackdown-tracker`, branch `development`.
- Inputs / prior state: audited development HEAD `68eb9ea7e6b073dcb0eec8069ad3dc1af8cad210`.
- Operation: read the supplied history; fetched the hero knowledge progress log, composition-analysis plan, consolidated V4 audit/index/validation, existing indicator roadmap, README, repository tree and branch metadata.
- Result: confirmed the distinct workstreams and the V4 data limitations recorded above. The composition-analysis plan is planning only. No application code, Supabase data/schema, or existing indicator was changed during this audit.
- Evidence:
  - `docs/HERO_KNOWLEDGE_PROGRESS.md`
  - `docs/HERO_KNOWLEDGE_AND_COMPOSITION_ANALYSIS_PLAN.md`
  - `docs/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_AUDIT.md`
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`
  - `docs/NEW_DRAFT_INDICATOR_ROADMAP.md`
  - development HEAD: `68eb9ea7e6b073dcb0eec8069ad3dc1af8cad210`
- Decision: this handoff is the first document to read after context loss; it does not mark the proposed composition analysis as implemented.
- Next single action: reconcile the remaining history and artifacts for the action-based composition analysis before starting any new implementation.


## 12. Reconciliation and clarified design intent — 2026-11-25

### ACTION 0002 — Reconcile historical work and clarify ability-interaction tags
- Started: 2026-11-25
- Task / phase: new ability-based composition analysis / context reconciliation
- Status: COMPLETED
- Purpose: prevent repetition of completed hero-knowledge work and record the user's intended meaning of ability tags before designing the representation.
- Exact target: uploaded `afk.txt`; repository `ShifterAFK/smackdown-tracker`, branch `development`; hero-knowledge and composition-analysis documents; match-prediction capture documentation; relevant commit history.
- Inputs / prior state: development handoff commit `c5171f5ac3499755f4706ae9f29cd35947279735`; handoff blob SHA `443ca727a4a860c0889261f577384db493469659`.
- Operation: reconciled the historical record and current repository artifacts; reviewed the documented match-capture fields and existing class-partner experiment; recorded the user's clarification of ability-tag intent.
- Result:
  - Hero knowledge extraction, normalization and V4 consolidation already exist; do not repeat them.
  - The historical hero × partner-class experiment belongs to the old Match Indicator, not the new ability-based model. Its recorded results were 620/1055 walk-forward matches with the interaction versus 619/1055 without it, and 192/317 holdout versus 191/317 without it. This marginal class-based result is not evidence that an ability-interaction model exists.
  - The documented match-prediction capture stores lineups/picks, pick order, side, map, event, timestamp and outcome; it does not document ability activations or ordered combat events. Do not describe the current capture pipeline as actual action telemetry.
  - No implemented ability-interaction composition model, validated formula or dedicated implementation was found in the audited repository materials.
  - V4 remains a paraphrased, unverified dry run, not a fully patch-verified source of ability facts.
- User-approved design clarification (intent, not yet validated game-data facts):
  - Ability tags are intended to help determine how a hero works with allies and how the hero can interfere with or counter opponents. They must therefore describe interaction value, not merely broad ability categories or the hero's official class.
  - Record the ability's own function/effect separately from ally-enabling or ally-amplifying interactions and from opponent-disruption/counter interactions. Preserve conditions and targets; do not infer a synergy or counter solely from a class label.
  - Lily May + Ravion is the motivating example: although both are Rogues, the user's interpretation is that Lily May brings utility through an ultimate that interferes with the opponent, while Ravion buffs allies and also contributes damage. The duo may therefore need a stronger damage source (the user named Odie or Himmel) to convert those effects into sufficient team damage.
  - Valka is the counterexample to class-based assumptions: despite being a Warrior, the user's assessment is that her kit is more oriented toward surviving than supplying the damage the composition needs.
  - These hero-specific statements are user-provided gameplay hypotheses to check against the existing ability evidence and match data. They are not verified source facts, established synergy/counter rules, or permission to hard-code bonuses.
- Decision: the next schema proposal must represent ability function, ally interaction/enabling, and opponent disruption/counter as distinguishable concepts. A hero may cover several functions; official class remains metadata only. The final taxonomy, formula and weights remain unapproved.
- Scope protection: no application code, Supabase data/schema, migrations, existing indicators or `main` branch were changed by this action.
- Next single action: prepare the ability-to-function representation proposal from the existing V4 evidence and assess whether it supports the three distinctions above. Do not repeat extraction or normalization.


## 13. Approved three-layer ability model — 2026-11-25

### ACTION 0003 — Record approved ability-analysis model
- Started: 2026-11-25 17:48 CET
- Task / phase: new ability-based composition analysis / approved conceptual model
- Status: COMPLETED
- Purpose: preserve the user's approved model and concrete gameplay motivation so future sessions do not have to reconstruct the decision from chat history.
- Exact target: `docs/AI_SESSION_HANDOFF.md`, repository `ShifterAFK/smackdown-tracker`, branch `development`.
- Inputs / prior state: development commit `30c05bf1d28b1b4c3e97d11922ca22754012a922`; file blob SHA `050be062815f5eb31a6269f20f8a58a7db13206c`.
- Operation: documented the approved three-layer representation, its interpretation rules, the motivating hero examples and the next restart point.
- Result: the user approved the conceptual separation below. This approval concerns the model's structure, not a finalized vocabulary, full schema, scoring formula or implementation.
- **APPROVED conceptual model — three distinct layers:**
  1. **Ability effect / mechanic:** what the individual ability actually does. Preserve source-supported mechanics such as damage, interruption, energy drain, buff, debuff, healing, shielding, control, summon, mark, execute; also preserve ability type, target, trigger, conditions, duration, range, cooldown and restrictions when the source provides them. Do not infer missing facts.
  2. **Team function:** what capability the ability/hero contributes to the composition, potentially in several dimensions at once (for example damage, utility/disruption, ally support, durability/protection, control). A hero is not forced into one exclusive role. Official class remains metadata and must not determine function by itself.
  3. **Interactions:** how an effect relates to other units:
     - **Ally interaction:** enables, amplifies, protects, sustains or otherwise creates an opportunity for an ally to benefit.
     - **Opponent interaction:** disrupts, weakens, interrupts, controls, denies or conditionally counters an opponent.
     - Each relation must retain its target and conditions. Do not claim a concrete synergy/counter merely because two heroes share a class or appear together.
- **User-provided motivating hypotheses — not yet verified source facts or established match rules:**
  - **Lily May + Ravion:** both are Rogues, but the user's interpretation is that Lily May's ultimate brings utility by interfering with the opponent, while Ravion strengthens allies and also contributes damage. The duo may lack sufficient damage without a stronger damage source.
  - **Odie or Himmel:** named by the user as possible damage sources that could complement the duo. Whether either actually improves the composition, and under which conditions, remains to be tested rather than hard-coded.
  - **Valka:** the user's counterexample to class-based role assumptions; despite being a Warrior, her kit is perceived as more survival-oriented than as the damage source this composition needs. Verify the exact ability mechanics separately from this composition-level assessment.
- Interpretation rules:
  - Keep source-described mechanics, derived team-function labels and composition-level hypotheses separately identifiable.
  - Preserve provenance, patch/version, confidence and unknown values. V4 is a paraphrased, unverified dry run and must not be treated as patch-verified facts or imported.
  - A documented ability capability is not proof that the ability activated in a particular match. The currently documented capture pipeline does not record ordered ability activations.
  - Descriptive coverage, predictive value and explanatory hypotheses remain separate evaluation questions.
- **Still OPEN / not approved:** final controlled vocabulary beyond the approved candidate labels; interaction matching/evaluation rules; any numerical synergy/counter bonus; indicator formula and weights; predictive thresholds; UI or implementation.
- Scope protection: this documentation decision does not authorize changes to application code, existing indicators, Tier List, TOP Picks, Supabase, migrations or `main`.
- Next single action: define the concrete field schema and tagging rules for the three approved layers using existing V4 evidence, and record which distinctions V4 can and cannot support without repeating extraction or normalization.


## 14. Approved ability schema and tagging rules — 2026-11-25

### ACTION 0004 — Record approved detailed schema and tagging rules
- Started: 2026-11-25
- Task / phase: new ability-based composition analysis / detailed schema definition
- Status: COMPLETED
- Purpose: record the user's approval of the concrete representation for the three-layer ability model.
- Exact target: `docs/AI_SESSION_HANDOFF.md`, repository `ShifterAFK/smackdown-tracker`, branch `development`.
- Inputs / prior state: current handoff blob SHA `32fd68031c8261914eb4dd72565ad9fb23ac0f77`.
- Operation: documented the approved ability-mechanics, team-function and interaction fields, plus evidence and tagging rules. No application or database implementation was performed.
- Result: the user approved the proposed detailed schema and tagging rules. The approval is for the descriptive data model and its tagging discipline; it does not approve scoring, prediction thresholds, hard-coded synergies, UI or implementation.
- **APPROVED — Layer 1: ability effect / mechanic**
  - Each record is anchored to a specific `hero_id` and `ability_key`; retain `ability_type`.
  - Represent mechanics as atomic codes (candidate examples include `damage`, `interrupt`, `energy_drain`, `buff`, `debuff`, `healing`, `shielding`, `control`, `summon`, `mark`, and `execute`). Do not collapse distinct effects into a single broad label.
  - Preserve the supported target side and target selector, trigger, conditions, duration, range, cooldown and restrictions. Leave unavailable attributes unknown rather than guessing.
  - Keep source evidence/provenance attached to the ability and to the claims derived from it.
- **APPROVED — Layer 2: team function**
  - Allow multiple function labels for the same ability or hero; never force a single exclusive role.
  - Candidate function groups: `damage` (including burst, sustained, area, single-target, execute and DoT); `support` (ally buffs, energy support, healing and shielding); `control_disruption` (interruption, silence, stun, knockdown, displacement and debuff); `durability` (protection, damage reduction, self-sustain and survival); and `specialist` (summon interaction, mark/focus, anti-heal, anti-shield and conditional counter).
  - A function label must identify the underlying mechanic(s) that justify it. Treat function labels as derived interpretation, not as a verbatim source fact; retain rationale and supporting evidence references.
  - Official class remains metadata and is not sufficient evidence for a team-function label.
- **APPROVED — Layer 3: interactions**
  - Each interaction records `direction` (`ally` or `opponent`), `interaction_type`, `target_selector`, `trigger`, `conditions`, and `effect_mechanics`; record `beneficiary_capability` when the evidence supports it.
  - Ally interactions describe enabling, amplifying, protecting, sustaining or creating an opportunity for an ally.
  - Opponent interactions describe disrupting, weakening, interrupting, controlling, denying or conditionally countering an opponent.
  - Keep target and conditions explicit. Store generic capability relationships, not hard-coded named hero pairs such as Lily May + Odie. Any composition-level pairing evaluation is a later analysis step.
- **APPROVED — evidence and tagging discipline**
  1. Every mechanic is tied to a specific ability, not merely to the hero.
  2. Every derived function label points to one or more supporting mechanics and evidence references.
  3. Every interaction retains direction, target and applicable conditions.
  4. Missing or unverified information is `unknown`, not a negative claim or an empty-effect assertion.
  5. Preserve original Stargazer tags and their qualifiers as a separate source layer; do not silently replace or reinterpret them as the new function labels.
  6. Keep source facts, derived interpretations and composition hypotheses distinguishable, with explicit status.
  7. Retain source/provenance, patch/version, observation date and verification/confidence status. V4 descriptions remain paraphrased and patch-unverified; do not promote them to verified facts or import them.
  8. Do not infer synergy or counter solely from class labels or co-occurrence in a lineup.
- **Candidate labels are not a claim that V4 already supports them.** Populate only what the available evidence supports; preserve unknowns and record coverage gaps. Where the source provides no value for an attribute, do not manufacture one.
- **Still OPEN / not approved:** final matching/evaluation rules between interactions; numerical synergy/counter bonuses; indicator formula and weights; predictive thresholds; UI and application/database implementation.
- Scope protection: no application code, existing indicators, Tier List, TOP Picks, Supabase, migrations or `main` branch were changed by this action.
- Next single action: see ACTION 0005 / section 15 for the completed V4 field-coverage and gap assessment.


## 15. V4 schema coverage and gap assessment — 2026-11-25

### ACTION 0005 — Map approved schema against V4 data
- Started: 2026-11-25
- Task / phase: new ability-based composition analysis / V4 schema coverage assessment
- Status: COMPLETED
- Purpose: establish which approved fields can be mapped from the existing V4 dry-run structure and identify gaps without repeating extraction or normalization.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; four V4 JSON shards and their shared source manifest.
- Inputs / prior state:
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_01.json` — blob SHA `3ef446a8311bd5315d8a535c88e2c3037ef2d94d`
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_02.json` — blob SHA `9fd97e95f6020d333a0d7f31336d9e48ee5ef640`
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_03.json` — blob SHA `74f4c14cb8171a6a1f07bb782cb0d39936e9ca59`
  - `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_04.json` — blob SHA `122cfba6a4953e2dfa043e054d3bbe8f54c5a072`
  - Shared manifest: `docs/data/HERO_KNOWLEDGE_SOURCE_MANIFEST.json` — blob SHA `2de9cbb5cda90370c6cabf9f43af6761aa86ebe6`
- Operation: inspected all four existing V4 shards and the source manifest; counted field coverage and section types; compared the available fields with the approved three-layer schema; reviewed the five motivating hero profiles. No extraction, normalization, application-code change, database operation or import was performed.
- Result — dataset shape:
  - 131 heroes and 1,032 logical sections across the four shards (part counts: 33/255, 33/261, 33/262 and 32/254 heroes/sections respectively).
  - All shards declare `dataset_status: consolidated_dry_run_not_for_import`.
  - Every section has `ability_key`, `section_type`, `description_kind`, `description_summary`, `tag_status`, `tag_observations`, `source_evidence`, `order_observations` and `source_ability_keys` (1,032/1,032 each). `source_labels` is present in 969/1,032 sections.
  - `description_raw` is absent in all 1,032 sections. All descriptions are paraphrased summaries: 1,024 from extraction batches and 8 from indexed primary sources.
  - `tags` are present in 301/1,032 sections; all 301 have `tag_status: consistent_explicit_capture`. The remaining 731 sections are unknown. No non-empty `tag_variants` were found.
  - Section types: `base_skill` 250; `enhance_force` 128; `exclusive_equipment` 129; `hero_focus` 128; `rivalry_mode` 129; `season_charm` 130; `ultimate` 130; `targeting_rule` 7; `source_section_group` 1. The seven `targeting_rule` and one `source_section_group` records are auxiliary sections and must not be automatically treated as abilities or assigned an `ability_type`.
- Result — mapping to the approved schema:
  - `hero_id` and `ability_key`: available.
  - `ability_type`: only partially mappable through `section_type`; auxiliary sections must first be separated, and the distinct nonstandard section types must be retained rather than flattened.
  - Ability description: available only as paraphrased `description_summary`, not raw source text.
  - Atomic mechanics: no dedicated structured field.
  - `target_side`, `target_selector`, `trigger`, `conditions`, `duration`, `range`, `cooldown` and `restrictions`: no dedicated structured fields. Some details may be mentioned in summaries but are not normalized into fields.
  - Team-function labels and their mechanic/rationale links: absent.
  - Ally/opponent interaction records and their target/condition fields: absent.
  - Evidence/provenance: `source_evidence` exists for all 1,032 sections, with source/capture metadata such as `source_name`, `source_url`, `source_document`, `capture_batch` and `evidence_kind`.
  - Patch/version and claim confidence: not established. The manifest has `generated_at: 2026-11-25` and `retrieved_at` for all 131 heroes, but `source_patch_label` and `source_updated_at` are absent for all 131; it explicitly records no established source patch/version. No confidence value is recorded per claim.
- Result — five motivating profiles (sections / explicit consistent tags / unknown tags / paraphrased summaries / raw descriptions):
  - Lily May: 8 / 0 / 8 / 8 / 0.
  - Ravion: 9 / 3 / 6 / 9 / 0.
  - Odie: 8 / 2 / 6 / 8 / 0.
  - Himmel: 8 / 1 / 7 / 8 / 0.
  - Valka: 7 / 1 / 6 / 7 / 0.
  - All five have `source_patch_label: null`, `source_updated_at: null`, `retrieved_at: 2026-11-25` and `source_page_record_status: first_pass_captured`; review remains pending patch verification. Valka also has direct-page-fetch verification pending. Their descriptions are paraphrases, not raw source text.
- Decision / interpretation:
  - V4 is usable as a structural index and a starting point for targeted source verification, but it is not sufficient to populate the three approved layers automatically.
  - Preserve existing Stargazer tags as a separate layer. Do not infer new mechanics, team functions or interactions from paraphrased summaries without source verification.
  - Populate the new fields only from verified source evidence; otherwise retain `unknown`.
  - V4 remains `consolidated_dry_run_not_for_import`; do not import it into Supabase.
  - The coverage assessment does not approve interaction-evaluation rules, numerical synergy/counter values, an indicator formula, weights, predictive thresholds, UI or implementation.
- Scope protection: no application code, existing indicators, Tier List, TOP Picks, Supabase, migrations or `main` branch were changed.
- Next single action: prepare a bounded source-verification pilot proposal for selected heroes, using existing V4 records as an index; do not start the pilot, repeat extraction/normalization, or import data until separately authorized.


## 16. Bounded source-verification pilot — 2026-11-25

### ACTION 0006 — Cross-check five hero profiles against available current references
- Started: 2026-11-25
- Task / phase: new ability-based composition analysis / bounded source-verification pilot
- Status: COMPLETED WITH GAPS
- Purpose: test whether the approved three-layer model can be populated from externally corroborated ability descriptions for the five agreed profiles, using V4 only as an index.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; V4 shards for `lily-may`, `ravion`, `odie`, `himmel`, `valka`; external AFK Stargazer, AFK.global, Prydwen and Gacha.gg references.
- Inputs / prior state:
  - development HEAD: `1a8ec10c94b028b95f4e67d60572d8918ec84de3`
  - V4 part 02: `9fd97e95f6020d333a0d7f31336d9e48ee5ef640` (Lily May, Himmel)
  - V4 part 03: `74f4c14cb8171a6a1f07bb782cb0d39936e9ca59` (Ravion, Odie)
  - V4 part 04: `122cfba6a4953e2dfa043e054d3bbe8f54c5a072` (Valka)
  - source manifest: `2de9cbb5cda90370c6cabf9f43af6761aa86ebe6`
- Operation:
  - Re-read the five profiles in the existing V4 shards and their source manifest entries; did not repeat extraction or normalization.
  - Attempted direct retrieval of all five AFK Stargazer URLs. Each returned a cache miss, so no direct page text was obtained.
  - Cross-checked the accessible indexed AFK.global and Prydwen hero pages; used Gacha.gg as an additional secondary reference for Himmel.
  - Reviewed the public AFK Journey 1.8.2 patch notes and the 1.8.3 preview announcement for patch context.
  - Compared each of the 40 existing V4 sections with the accessible external references and assigned an explicit supported/unverified status.
- Result — coverage:
  - Lily May: 6/8 supported; `rivalry_mode` and `season_charm` remain unverified.
  - Ravion: 7/9 supported; `season_charm` and `targeting_rule-rearmost-ally-targeting-order` remain unverified.
  - Odie: 7/8 supported; `season_charm` remains unverified.
  - Himmel: 6/8 supported; `rivalry_mode` and `season_charm` remain unverified.
  - Valka: 6/7 supported; `season_charm` remains unverified.
  - Total: 32/40 section summaries corroborated by the reviewed secondary references; 8/40 remain unverified. The Ravion `targeting_rule` is auxiliary and must not be treated as an ability.
- Result — source and patch limitations:
  - Direct AFK Stargazer retrieval failed with cache misses for all five hero URLs.
  - AFK.global profile references were available for Lily May, Ravion, Odie and Valka; Prydwen references were available for all five. Himmel was additionally cross-checked against Gacha.gg.
  - Prydwen profile pages reviewed identify 2026-07-30 as their last-updated date. AFK.global pages were indexed during this review but did not expose a per-hero source patch label or reliable per-page update timestamp in the retrieved content.
  - The public patch-note reference reviewed identifies version 1.8.2 (2026-10-28); the 1.8.3 announcement dated 2026-11-19 is a preview and gives no release date. The reviewed 1.8.2 notes do not list ability changes for these five heroes, but this does not establish that every ability description is patch-verified.
  - V4 `season_charm` records were not silently mapped to current AFK.global `season skill` entries. Odie's `Arcane Barrage` and Valka's `Soul-lifting Touch` are kept distinct from V4 Season Charm records.
- Result — model feasibility examples:
  - Lily May: `interrupt`, `energy_drain`, `damage` support `control_disruption` and `damage`; opponent interaction is the conditional interruption/energy denial of a non-summoned enemy Ultimate, with the boss restriction retained.
  - Ravion: Objective completion by two rearmost allies enables Energy recovery and an ATK buff; the later Mortal Ace adds opponent debuff, damage and knockdown. Ally and opponent relations remain separate.
  - Odie: Dart Poison, stacking poison amplification and Heart Crusher support sustained damage and conditional execute; the target and poison conditions remain explicit.
  - Himmel: Hero Party has class/adjacency conditions and combines ally stat buffs, a shared shield and healing; Heroic Dash and Heroic Slash retain their own damage/control effects.
  - Valka: Spectral Bulwark provides self-protection and an ally ATK SPD buff; Panic gates the opponent control/damage sequence, while the Ultimate also supports self-healing.
  - These are ability-level capability mappings, not named-hero synergy claims or measured match outcomes.
- Decision / interpretation:
  - The approved three-layer model can represent the externally corroborated mechanics, derived team functions and ally/opponent interactions without forcing one role per hero.
  - The pilot is complete as a bounded cross-check with explicit gaps; it is not a full primary-source or patch-verification pass.
  - Keep all 8 unresolved sections unknown. Do not infer missing mechanics from V4 paraphrases or from class/co-occurrence.
  - Preserve the one auxiliary targeting rule separately from ability records.
  - V4 remains `consolidated_dry_run_not_for_import`; no import is authorized.
- External references reviewed:
  - AFK.global hero profiles: `https://www.afk.global/afk-journey/characters/lily-may`, `https://www.afk.global/afk-journey/characters/ravion`, `https://www.afk.global/afk-journey/characters/odie`, `https://www.afk.global/afk-journey/characters/valka`.
  - Prydwen hero profiles: `https://www.prydwen.gg/afk-journey/characters/lily-may`, `https://www.prydwen.gg/afk-journey/characters/ravion`, `https://www.prydwen.gg/afk-journey/characters/odie`, `https://www.prydwen.gg/afk-journey/characters/himmel`, `https://www.prydwen.gg/afk-journey/characters/valka`.
  - Himmel additional reference: `https://www.gacha.gg/afk-journey/characters/himmel`.
  - Patch context: `https://www.afk.global/afk-journey/patch-notes/1-8-2` and `https://www.afk.global/afk-journey/news`.
- Scope protection: no V4 shard, manifest, application code, existing indicator, Tier List, TOP Picks, Supabase schema/data, migration or `main` branch was changed. No automated test or in-game visual verification was performed.
- Next single action: request authorization before any second evidence pass beyond this completed five-hero pilot.
## 17. Second bounded source-verification pass and scope decision — 2026-11-25

### ACTION 0007 — Resolve the eight indexed-source gaps and close patch research
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / second bounded source-verification pass
- Status: COMPLETED; patch research closed by user decision
- Exact target: the same five pilot heroes only — Lily May, Ravion, Odie, Himmel and Valka — and the eight sections left unresolved by ACTION 0006. No roster expansion.
- Operation:
  - Reviewed the Fandom hero skill pages and confirmed that they contain skill-description sections, while the wiki itself warns that skill descriptions are still being updated. Fandom was treated as supplementary, not as the sole completeness/currentness authority.
  - Reviewed indexed AFK Stargazer skill-page content for the five heroes. Indexed results supplied evidence for all eight previously unresolved sections.
  - Inspected Stargazer's public repository architecture. The public repository obtains skill text from an external, commit-pinned data pack; the pinned data-pack commit does not expose a verified game-patch mapping.
  - Reviewed AFK.global Magic Charm and hero-profile references to preserve the distinction between Season Charm and Season Skill.
- Result — eight previously unresolved sections:
  - Lily May: Rivalry Mode and Season Charm have indexed Stargazer evidence.
  - Ravion: Season Charm and the auxiliary rearmost-ally targeting rule have indexed Stargazer evidence.
  - Odie: Season Charm has indexed Stargazer evidence.
  - Himmel: Rivalry Mode and Season Charm have indexed Stargazer evidence.
  - Valka: Season Charm has indexed Stargazer evidence.
  - Total: indexed Stargazer evidence located for all 8/8 sections. Direct retrieval of the Stargazer pages still returned cache misses; indexed evidence is not represented as a successful direct-page fetch.
- User decision / project scope:
  - Do not conduct further patch/version research or seek a per-hero patch mapping.
  - For this task, accept the available current hero-skill descriptions as sufficiently up to date; do not block progress on patch metadata.
  - Season Charm has no relevance to the mode in scope and is excluded from the model. Keep it separate from Season Skill; do not treat either category as a substitute for the other.
  - Retain the two Rivalry Mode records as indexed supporting skill evidence. Retain Ravion's targeting rule as auxiliary evidence, not as a standalone ability.
- Limitations:
  - Indexed source evidence does not establish a source patch label. This is intentionally not an active investigation item following the user's decision.
  - Fandom's skill pages may be incomplete or still updating; they are supplementary.
  - No claim of in-game verification is made.
- Scope protection:
  - No V4 shard, source manifest, application code, existing indicator, Tier List, TOP Picks, Supabase schema/data, migration or `main` branch was changed.
  - No import was performed or authorized.
- Next single action: continue the approved ability-based composition-analysis work using the available hero-skill descriptions, with Season Charm excluded. Reopen patch research only if the user explicitly changes this decision.

## 18. Five-hero ability composition pilot and handoff process correction — 2026-11-25

### ACTION 0008 — Reconcile the five-hero pilot artifact and development state
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / state reconciliation
- Status: COMPLETED
- Purpose: verify the pilot artifact and its commit history before correcting the stale restart point in this handoff.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json`.
- Inputs / prior state:
  - development HEAD: `6578abae02538cf873849a2b24f479e7a7599141`
  - prior handoff blob SHA: `5bbd0d1c2fe63713c25bfb969e12ad47a9e09242`
  - pilot blob SHA: `66e4aed61d5904d904c76cd2471c56e75dc71071`
- Operation: checked the `development` branch ref; inspected the two pilot commits; fetched and parsed the pilot JSON; checked mechanic, function and interaction references and the approved scope constraints.
- Result:
  - `development` HEAD is `6578abae02538cf873849a2b24f479e7a7599141`.
  - Commit `41e6a87369a805690fb9c9ba3912a392d1cbfcf3` added the pilot JSON (1,489 insertions); commit `6578abae02538cf873849a2b24f479e7a7599141` corrected/extended that same file (215 additions, 10 deletions). The second commit is the current branch HEAD.
  - The pilot contains 43 mechanics, 15 team functions, 10 interactions and 6 unmodeled sections for Lily May, Ravion, Odie, Himmel and Valka.
  - Validation passed: every mechanic has a hero/ability anchor and source evidence; all team-function and interaction mechanic references resolve; Season Charm mechanics are absent; formation and ability-activation prediction are explicitly unsupported.
  - During the check, the first limitation assertion looked under `constraints`; inspection showed the actual JSON key is `analysis_constraints`. The assertion was corrected and all six validation checks passed. This was a check-path error, not a pilot-data defect.
- Evidence: pilot file at `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json`; commits `41e6a87369a805690fb9c9ba3912a392d1cbfcf3` and `6578abae02538cf873849a2b24f479e7a7599141`.
- Decision: the pilot is a completed descriptive data artifact, not an implemented application indicator. No app, Supabase, `main`, Tier List or TOP Picks change is included.
- Next single action: update this handoff with the verified pilot state, approved prediction limitations and the mandatory per-interaction update rule.

### ACTION 0009 — Update this handoff after the pilot and process decision
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / handoff maintenance
- Status: COMPLETED
- Purpose: make the operational restart document reflect the latest confirmed project state and prevent future project interactions from leaving it stale.
- Exact target: `docs/AI_SESSION_HANDOFF.md`, repository `ShifterAFK/smackdown-tracker`, branch `development`.
- Inputs / prior state: development HEAD `6578abae02538cf873849a2b24f479e7a7599141`; handoff blob SHA `5bbd0d1c2fe63713c25bfb969e12ad47a9e09242`.
- Operation:
  - Updated the top-level current-state summary and the section 10 restart point to reflect the completed five-hero pilot.
  - Recorded the explicit limits on formation prediction, ability-activation prediction and actual match-effect observation.
  - Added a mandatory rule requiring a Handoff update after every project-relevant user interaction, including discussion-only turns and decisions that cause no repository change.
  - Preserved the existing action history and appended ACTION 0008 and ACTION 0009.
- Result: the Handoff now identifies the pilot artifact, its measured counts, validation status, approved limitations, unchanged areas and the correct next step (await the user's next instruction).
- Evidence: this file, `docs/AI_SESSION_HANDOFF.md`; resulting GitHub contents commit is the commit created by this update.
- Decision: future project responses must leave this file current before the response ends. A discussion-only interaction must also be logged; a tool operation must be logged with its actual result.
- Next single action: await the user's review or next explicit instruction. No additional project work is authorized by this documentation update.

## 19. Pilot review decision pending — 2026-11-25

### ACTION 0010 — Clarify the pending user decision after the five-hero pilot
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / pilot review
- Status: AWAITING USER DECISION
- Purpose: clarify the exact point at which the work paused and the decision required to resume.
- User asked where the project stopped and what decision is needed.
- Confirmed state: the five-hero descriptive pilot is complete and validated as recorded in ACTION 0008; the Handoff was updated in ACTION 0009. No application indicator, scoring, weighting, predictive logic, UI or Supabase implementation has been performed or approved.
- Decision requested: whether to accept the five-hero pilot as a valid proof-of-method / reference pattern for the ability-mechanics model, or request specific corrections before proceeding.
- Recommendation communicated: accept it only as a validated descriptive method for recording hero-kit capabilities, not as a finished indicator, predictive model, guaranteed synergy/counter model, or proof of match outcomes.
- No user approval or rejection of the pilot has been given yet. Do not expand the roster or implement anything until the user decides.
- Repository changes from this discussion: none to application/data artifacts; this action-log entry only.
- Next single action: await the user's explicit pilot review decision and then proceed only within the scope that decision authorizes.


## 20. Pilot approval and roster-wide coverage audit — 2026-11-25

### ACTION 0011 — Accept the five-hero pilot as the reference method
- Started: 2026-11-25 19:18 CET
- Task / phase: ability-based composition analysis / pilot review
- Status: COMPLETED
- Purpose: record the user's explicit decision on the five-hero pilot and authorize only the next bounded planning/audit step.
- Exact target: pilot artifact `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json`; project decision record.
- Decision: the user accepted the five-hero pilot as the correct reference method for descriptive analysis of hero-kit capabilities. This accepts the method, not an implemented indicator, score, predictive model, guaranteed synergy/counter model or match-outcome explanation.
- Approved next stage: read-only roster-wide coverage audit using existing V4 data and the approved pilot as the reference. No hero roster expansion was authorized by this decision.
- Repository/data state at this decision: no application, data artifact, Supabase or production changes.
- Supersedes the pending decision recorded in ACTION 0010.
- Next single action: complete the bounded roster-wide coverage audit; do not populate more hero profiles.

### ACTION 0012 — Audit existing V4 coverage against the approved pilot
- Started: 2026-11-25 19:18 CET
- Task / phase: ability-based composition analysis / roster-wide coverage audit
- Status: COMPLETED
- Purpose: establish how much of the existing 131-hero knowledge dataset can structurally support the approved descriptive model, without repeating extraction or automatically deriving mechanics.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; four V4 shards, canonical index, validation report, source manifest and five-hero pilot JSON; composition-analysis plan and hero-knowledge progress log.
- Inputs / prior state:
  - development HEAD: `02910826b50c905fb3c1dbe06c1ae0dd0aaf84a4`
  - V4 shards: `3ef446a8311bd5315d8a535c88e2c3037ef2d94d`, `9fd97e95f6020d333a0d7f31336d9e48ee5ef640`, `74f4c14cb8171a6a1f07bb782cb0d39936e9ca59`, `122cfba6a4953e2dfa043e054d3bbe8f54c5a072`
  - canonical index blob SHA: `b4a31efbc028ffdca72e36fbeb0f0c64a5102cc6`
  - validation blob SHA: `053c08fa0444ad571502a3d80945729a4166b141`
  - source manifest blob SHA: `2de9cbb5cda90370c6cabf9f43af6761aa86ebe6`
  - pilot blob SHA: `66e4aed61d5904d904c76cd2471c56e75dc71071`
  - composition-analysis plan blob SHA: `282407853a08df5d090d305d8f68bf5e8bf0e874`
  - hero-knowledge progress blob SHA: `651874bb0dbcf3dbeb5a10c190bc7672b740313b`
- Operation: fetched and parsed the existing repository artifacts; aggregated hero, section, tag, description, evidence, section-type and secondary-source coverage. No source research, extraction, normalization, code edit, data edit, import or database operation was performed.
- Result:
  - 131 unique roster heroes; 1,032 logical sections; 1,329 section-evidence records; 131 normalized-complete profiles; zero open section gaps.
  - All 1,032 sections have source evidence. Descriptions comprise 1,024 paraphrased extraction-batch summaries and 8 paraphrased indexed-primary-source summaries; zero raw descriptions are present.
  - 301 sections have consistent explicit tags; 731 have unknown tags. Seventeen profiles have only unknown section tags.
  - The pilot's four core input section types (`base_skill`, `ultimate`, `enhance_force`, `exclusive_equipment`) account for 637 structural sections across the roster. This is a coverage count, not a count of verified mechanics.
  - Five profiles have recorded secondary-source observations: Cecia, Granny Dahnie, Indris, Nerion and Valka. The V4 index records 126 profiles pending broader secondary-source review.
  - Source patch/update labels are absent for all 131 profiles; patch research remains intentionally closed under the user's prior decision.
- Decision / interpretation: V4 has broad structural roster coverage and source provenance, but it is not a ready-made ability-mechanics model. Its descriptions are paraphrased and its structured mechanics/functions/interactions are absent. The pilot method must be applied conservatively in bounded hero batches; unknowns remain unknown and no automatic bulk conversion is justified.
- Scope protection: read-only inspection only. No repository data artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was changed.
- The user approved the second bounded batch: Cecia, Granny Dahnie, Indris, Nerion and Solise. Contess is excluded because she is banned in the mode under consideration.
- Source review and capability analysis have now been performed against the current V4 shards and the relevant extraction batches (02, 03, 06, 07, 18 and 25). The primary descriptions are paraphrased AFK Stargazer captures; the Batch 25 captures use indexed primary-source content where direct page opens returned cache misses. Patch research remains closed.
- AFK.global secondary observations exist for Cecia (Focus Hit), Granny Dahnie (Lock-on Projectiles), Indris (core-kit cross-check) and Nerion (partial core-kit cross-check). Solise has no recorded secondary-source observation in the reviewed V4 profile. Season Skill observations remain separate from Season Charm; Season Charm is excluded from active mechanics.
- Analysis findings: Cecia's kit centers on Mr. Carlyle summon/entangle/DoT and attack-speed/DEF-Penetration support; Granny Dahnie combines conditional taunt/self-healing, retaliation debuff and an area control/energy-denial/self-heal Ultimate; Indris combines multi-ally-debuff-conditioned exposed weakness with silence/buff denial/DEF reduction and control; Nerion converts sustained control into Drowning, then amplifies damage and chains it, with additional knockback/stun/airborne control; Solise provides distributed ally healing, Bulb/Bulbsprite growth, conditional shields and Bulbsprite-linked damage.
- Exact unknowns remain unknown: Cecia, Granny Dahnie and Nerion Rivalry Mode summaries are too thin to atomize; Indris Rivalry Mode is partially modelable (10-stack normal-attack ATK SPD/damage), while Refine 4 Execution details remain underspecified. Solise Rivalry Mode has a concrete first-low-HP ally heal/shield effect and can be modeled, with Refine bonuses recorded only at the stated level of detail. Hero Focus summaries are not being promoted into mechanics in this batch, consistent with the pilot's mechanic scope. Unknown source tags remain null.
- No new structured mechanics/functions/interactions JSON has yet been written. No V4 data, pilot JSON, application code, Supabase schema/data, migrations, existing indicators, Tier List, TOP Picks or `main` branch has been changed by the analysis.
- Next single action: prepare a separate second-batch JSON artifact using the accepted pilot schema, with source evidence, derived functions/interactions and explicit unmodeled sections; show its path and minimal diff before committing.


## 21. Second bounded batch selection — 2026-11-25

### ACTION 0013 — Replace Contess with Solise in the second batch
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / second bounded hero batch selection
- Status: APPROVED; analysis not started
- Purpose: record the user's correction to the proposed five-hero batch before any analysis begins.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; decision and restart state in `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `4bef2c21ef9355012d192ff30b5fe3ab7627a3c6`; Handoff blob SHA `1876e52aac1090dcb67abec283bd1b2bc5d04856`.
- Operation: user rejected Contess for this batch because she is banned in the mode under consideration and selected Solise instead. Approved batch: Cecia, Granny Dahnie, Indris, Nerion and Solise.
- Result: the second bounded batch selection is explicit and approved. No hero source review, mechanic extraction, team-function mapping, interaction mapping or data artifact modification has been performed in this action.
- Decision: exclude Contess from this mode-specific batch; include Solise. Continue to apply the accepted five-hero pilot method, with Season Charm excluded and existing model limitations preserved.
- Scope protection: this update changes only the Handoff document. No pilot JSON, V4 shard, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch is changed.
- Next single action: start the approved analysis batch for Cecia, Granny Dahnie, Indris, Nerion and Solise.

## 22. Second bounded batch source analysis — 2026-11-25

### ACTION 0014 — Analyze Cecia, Granny Dahnie, Indris, Nerion and Solise
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / second bounded hero batch
- Status: SOURCE REVIEW AND ANALYSIS COMPLETED; STRUCTURED ARTIFACT NOT YET CREATED
- Purpose: apply the accepted five-hero descriptive pilot method to the user-approved second batch, without expanding the roster or changing application/database behavior.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; V4 shards `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_01.json` through `PART_04.json`; source captures `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_02.md`, `03.md`, `06.md`, `07.md`, `18.md`, `25.md`; pilot schema `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json`.
- Inputs / prior state: development HEAD `5a82c7ae852c1f4b7dd2e1c061606bc8ce440f95`; Handoff blob SHA `2947a4f5c8ce9b8ca5b8f0e683dba838adff82e3`; pilot blob SHA `66e4aed61d5904d904c76cd2471c56e75dc71071`; V4 shards read from development.
- Operation: re-read the accepted analysis plan and pilot schema; fetched and parsed all four V4 shards; extracted the five selected hero profiles and their section evidence; read the relevant extraction-batch Markdown sources and secondary-source observations. No external patch research was performed.
- Result:
  - Cecia: Mr. Carlyle summon, entangle/DoT/immobilization, attack-speed and DEF-Penetration effects, and conditional stat stealing are present in the captured summaries. Focus Hit is a separate AFK.global Season Skill observation. Rivalry Mode summary remains too vague to atomize.
  - Granny Dahnie: Angry Taunt prioritizes the enemy targeting the weakest ally and heals Granny; Seed Cannon is damage-triggered and applies Haste reduction; Threshold of Jade combines area control, Energy denial, HP loss and self-recovery; Enhance Force adds self-healing/Energy/Haste and stronger ATK reduction. Lock-on Projectiles is a separate Season Skill observation. Rivalry Mode remains too vague to atomize.
  - Indris: Spellbane Shot damages, disables target stat buffs for 8 seconds, permanently reduces Phys/Magic DEF by 20% (unstackable), and has a conditional max-HP true-damage effect against exposed weakness; True Sight exposes weakness after stat-reduction debuffs from more than three different allies; Arcane Binding displaces and immobilizes; Windpiercer and Enhance Force amplify the exposed-weakness sequence. Rivalry Mode states 10 normal-attack stacks of ATK SPD/normal-attack damage; Refine 4 Execution detail is underspecified.
  - Nerion: Drowning Doom converts sufficiently long control into Drowning, increases damage against Drowning targets and adds a 12-second empowered/Deluge chain sequence; Tidal Rebuke and Riptide Wrath add knockback, stun, delayed airborne and area damage; Abyssal Embrace applies Drowning to the rearmost enemy at battle start; Enhance Force has an all/threshold Drowning trigger for 1000 Energy and permanent empowerment. Rivalry Mode remains too vague to atomize.
  - Solise: Lifebloom Buds distributes Bulbs to non-summoned allies, healing and storing excess healing until Bulbsprite growth grants permanent ATK; Floral Favor heals the two weakest allies and conditionally grants capped permanent shields; Life's Embrace heals in three waves and causes Bulbsprite-linked area damage; Resonant Bloom adds permanent defenses/ATK/HP; Enhance Force adds Bulbsprite damage based on stored excess healing; Rivalry Mode describes a first ally below 40% HP receiving 160% ATK healing and a 160% ATK shield, with additional refine stats.
  - Secondary evidence: AFK.global independently cross-checks the visible core-kit sections for Cecia, Granny Dahnie and Indris; Nerion cross-check is partial and does not cover the two additional base skills. No secondary observation is recorded for Solise in the reviewed V4 profile.
  - Season Charm remains excluded. Season Skill observations are preserved as a distinct source category and are not mapped onto Season Charm or mixed into the active mechanic set. Unknown per-ability tags remain unknown/null.
- Decision / interpretation: all five profiles have sufficient captured material for a bounded capability-based mapping, but some Rivalry Mode details remain unmodeled. Position-dependent selectors and activation triggers are recorded as conditional capabilities only; no formation, timing or match-outcome prediction is inferred.
- Scope protection: read-only source review and analysis only. No structured data artifact, V4 shard, pilot artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was changed.
- Next single action: prepare the separate second-batch JSON artifact using the accepted pilot schema and show its path/minimal diff before committing.

## 23. Second-batch structured artifact and Handoff synchronization — 2026-11-25

### ACTION 0015 — Commit the Cecia / Granny Dahnie / Indris / Nerion / Solise batch
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / second bounded batch artifact
- Status: COMPLETED IN THIS COMMIT; static validation PASS
- Purpose: persist the user-approved second-batch analysis in the same accepted schema pattern as the five-hero pilot and synchronize the operational restart document.
- Exact target paths:
  - New: `docs/data/HERO_COMPOSITION_ABILITY_BATCH_2_CECIA_GRANNY_INDRIS_NERION_SOLISE.json`
  - Updated: `docs/AI_SESSION_HANDOFF.md`
- Inputs / prior state:
  - branch: `development`
  - parent HEAD before this commit: `24a54c1519d3b44d5dbf269192ceacde5452e691`
  - existing pilot reference: `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json`
  - source basis: V4 shards PART_01 through PART_04 and extraction batches 02, 03, 06, 07, 18 and 25, as documented in ACTION 0014.
- User approval: explicit approval received to commit both paths as one coherent change.
- Artifact contents: 69 mechanics, 17 team functions, 10 interactions and 10 unmodeled sections for Cecia, Granny Dahnie, Indris, Nerion and Solise.
- Static validation performed immediately before commit:
  - JSON parsed successfully.
  - Five and only five approved hero IDs are present in mechanics.
  - Mechanic IDs and team-function IDs are unique.
  - Every mechanic has source evidence.
  - Every team-function supporting mechanic reference resolves.
  - Every interaction supporting mechanic reference resolves.
  - No Season Charm mechanics are included.
  - Prediction and scoring limitations remain explicit in `analysis_constraints`.
- Handoff synchronization: updated top-level current stage; replaced the stale section 10 restart point; strengthened session-start instructions to fetch the current Handoff from GitHub `development`, record the branch HEAD SHA, and stop if GitHub is unavailable; appended this ACTION record. Earlier ACTION history remains preserved.
- Project-instructions guidance: supplied the user with a ready-to-paste instruction block making the live GitHub Handoff authoritative. The block is guidance for project settings and is not represented as an applied settings change.
- Scope protection: no V4 shard, pilot JSON, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was modified.
- Verification required after commit: read back both paths from `development`, verify the branch HEAD and compare the commit to its parent to confirm exactly these two paths changed.
- Next single action: await the user's next instruction; no further batch or implementation is implied.

## 24. Project instructions synchronized with GitHub Handoff — 2026-11-25

### ACTION 0016 — User confirms the Handoff rule is installed in project instructions
- Date: 2026-11-25
- Status: USER CONFIRMATION RECORDED
- Prior confirmed `development` HEAD: `c5d7bf28e2f8027e2294f29d40517386e5bcc015`
- User explicitly confirmed that the ready-to-paste instruction block requiring the assistant to fetch the current `docs/AI_SESSION_HANDOFF.md` from GitHub `development`, check the branch HEAD SHA, and stop if GitHub is unavailable has now been pasted into the project's instructions.
- This is a user-reported settings change. The assistant did not directly modify or independently inspect the project settings UI.
- From this point, treat the startup instruction as installed per user confirmation. At each new session/context recovery, still verify the actual current branch HEAD and fetch the live Handoff before acting.
- No source files, data artifacts, application code, Supabase, `main`, Tier List or TOP Picks changed as part of this confirmation.
- Next single action: await the user's next task instruction.


## 25. Third alphabetical hero batch approval — 2026-11-25

### ACTION 0017 — Approve the third alphabetical batch
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / third bounded hero batch selection
- Status: APPROVED; Handoff synchronization committed; source analysis not started
- Purpose: record the user's decision to select the next five not-yet-analyzed heroes in alphabetical order.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `f9d3187567412ef9e301ac6c45e11afc2e4ad45c`; Handoff blob SHA `97c0d1851844172fda0fb1a6f51a2c6532cca7fa`.
- User decision: use alphabetical order for subsequent hero batches. The approved third batch is Aliceth, Alna, Alsa, Antandra and Arden.
- Operation: updated the top-level current stage, replaced the stale restart point with the current approved batch and appended this ACTION record. Earlier action history was preserved.
- Result: approval and restart point are recorded in Handoff. No hero source review, mechanic extraction, team-function mapping, interaction mapping or structured data artifact has been performed for this batch.
- Decision: continue using the accepted pilot method and existing constraints; do not expand beyond these five heroes. Season Charm remains excluded; patch research remains closed; unknown tags remain unknown.
- Scope protection: only `docs/AI_SESSION_HANDOFF.md` is changed. No V4 shard, pilot or second-batch JSON, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch is changed.
- Next single action: inspect the V4 records and relevant source captures for Aliceth, Alna, Alsa, Antandra and Arden, then conduct the bounded analysis.


## 26. Third alphabetical batch source review and multi-file source handling — 2026-11-25

### ACTION 0018 — Review Aliceth, Alna, Alsa, Antandra and Arden
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / third bounded alphabetical hero batch
- Status: SOURCE REVIEW AND PRELIMINARY CAPABILITY ANALYSIS COMPLETED; STRUCTURED ARTIFACT NOT YET CREATED
- Purpose: apply the accepted five-hero descriptive pilot method to the approved third batch, and clarify how hero ability descriptions distributed across multiple JSON files are treated.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; V4 shard PART_01, extraction batches 02, 04, 05, 10, 12, 15 and 19; pilot and second-batch JSON schema references; `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `6d9eda60435bdc0fb28fea577f192cad00b77efd`; Handoff blob SHA `1f42ea1d07e19ec2663ee29102ca8de7ce74b709`.
- Operation: reviewed the five selected hero profiles and source evidence, compared the capture structure against the accepted JSON schema, and clarified that source descriptions may be distributed across multiple JSON files. No data artifact was written in this action.
- Result:
  - Aliceth: Radiant Rain multi-volley damage scaling with target lost HP and airborne invulnerability; Brightfeather ally support and conditional extra strikes; marked-target focus/Penetration and conditional execute; lethal-hit prevention for Aliceth/Brightfeather allies; Enhance Force adds Radiant Rain volleys after Brightfeather feather-strike thresholds. Season Charm excluded.
  - Alna: battle-opening Haste/range reduction; Winter Warrior ally selection/protection and max-HP increase; blizzard damage and healing conversion; repeated damage/Haste reduction; stacking damage reduction; periodic and conditional shared invulnerability; conditional freeze/Vitality reduction. Rivalry Mode low-HP mitigation/healing has enough detail for a separately identified capability if retained within batch scope.
  - Alsa: area damage and Combat Stance; Energy-consuming Vigorous Slam; conditional adjacent-hit evasion/damage/slow/reposition/shield; stun and knockback via Stone Barrier; bonus damage against recently controlled enemies; Enhance Force amplifies damage against multiply controlled targets and adds conditional boulder/DEF reduction.
  - Antandra: area taunt, damage reduction, stun/knockdown and self-healing; selected frontmost ally protection with shields; frontal damage/ATK reduction; conditional rescue and damage mitigation; guarded-ally Energy support; defensive stacking and conditional healing.
  - Arden: area lightning and persistent cloud; control-prioritized repeated strikes; multi-target entangle/immobilization and DoT; Energy recovery triggered by controlling non-summoned enemies; cloud-conditioned all-target Entangling Vines; Enhance Force shortens repeated strike interval.
  - Secondary/seasonal distinctions and unknown tags remain separate; Season Charm is excluded, and no patch research was reopened.
- Preliminary derived relations: Arden's control can conditionally satisfy Alsa's recently-controlled target requirement; ally control can conditionally trigger Arden's Energy recovery; Aliceth can conditionally amplify Brightfeather allies. These are kit-level capability relations only, not guaranteed or observed match synergies. Alna/Antandra beneficiary selection remains conditional where formation/targeting matters.
- User clarification: ability descriptions may be stored in different JSON files. The agreed handling is to use those files as source inputs, identify heroes with `hero_id` and abilities with `ability_key`, preserve provenance for each record, compare duplicate or conflicting descriptions before reconciliation, and never silently merge or duplicate them. A description being present does not mean its mechanics have already been atomized into the composition model.
- Decision / interpretation: the five profiles contain sufficient captured material for a bounded capability-based mapping, with vague Rivalry Mode sections left unmodeled where details do not support atomization. Formation and activation prediction remain unsupported.
- Scope protection: read-only source review and Handoff synchronization only. No new structured artifact, V4 shard, pilot artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was changed.
- Next single action: prepare the third-batch JSON artifact using the accepted pilot schema, then present its exact path and minimal diff for user approval before committing.

### ACTION 0019 — Record user's approval of Handoff update
- Status: APPROVED AND INCLUDED IN THIS Handoff synchronization
- User explicitly approved the proposed minimal Handoff update. The user also asked how to handle heroes and ability descriptions distributed across other JSON files; the answer and resulting source-handling rule are recorded in ACTION 0018.
- No additional repository/data scope was authorized by this clarification.


## 27. Data architecture clarification — 2026-11-25

### ACTION 0020 — Clarify reusable hero data and composition interactions
- Started: 2026-11-25
- Task / phase: ability-based composition analysis / data architecture clarification
- Status: COMPLETED — conceptual clarification recorded; no implementation authorized
- Purpose: correct a possible misunderstanding that distributed JSON source files imply one file per hero-combination or per synergy.
- User question: whether the model would require as many as 1,000 JSON files for one hero and its synergies across every possible hero pool.
- Clarification: no. The intended conceptual model is reusable hero/ability data plus reusable, generic mechanic-interaction records. A composition analysis should evaluate which of those records apply to a selected roster. Do not create a separate JSON artifact for every possible five-hero combination or hero pool.
- Important distinction:
  - Source descriptions may be distributed across multiple existing JSON files/shards; those are source inputs and do not define the target storage architecture.
  - Existing pilot and batch JSON files are bounded analysis artifacts used to validate the method. They are not a decision that the final system must store one independent file per hero or per possible composition.
  - A future canonical data layout may consolidate or shard reusable hero profiles and interaction records, but the final physical storage/schema has not yet been approved or implemented.
- Model constraints remain: interactions are generic capability relations grounded in ability mechanics; they are not guaranteed outcomes, named-pair synergy scores, or predictions of formation/activation/match results.
- Scope protection: this was a conceptual clarification only. No data artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was changed.
- Next single action: continue only with the already approved third-batch artifact preparation, keeping data reusable and avoiding composition-combination-specific duplication; present its path and minimal diff before any commit.


## 28. Draft model correction — 2026-11-25

### ACTION 0021 — Clarify pick-order availability and random-pool limitation
- Started: 2026-11-25
- Task / phase: 3v3 Showdown draft evaluation / input and pick-sequence clarification
- Status: COMPLETED — user clarification recorded; no model or application implementation authorized
- Purpose: correct the draft-model description so it distinguishes information that can be represented from information that is not available as a model input.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `0e1d19c582dff97718d8ef071a0d5bca5dc3d88d`; Handoff blob SHA `8d99468fb366714d16c995acc41625330721ffd4`.
- User clarification: recording the exact pick order is feasible; recording/using the random 20-hero pool is not.
- Confirmed pick order: Blue selects 1 hero; Red selects 2; Blue selects 2; Red selects 1. Each side finishes with 3 heroes.
- Input constraint: do not treat the random 20-hero pool drawn from approximately 130 heroes as a known, stored or required input. Do not assume the model can evaluate unavailable options from that pool.
- Model direction: evaluate the evolving draft state using the exact pick sequence and the hero information/relations that are actually available. Consider hero capability, ally synergy and opponent counters without assuming a fixed number of strong heroes in each random pool. AFK Stargazer labels are clues for interpreting ability-to-ally and ability-to-opponent relations, not universal synergy labels or a score.
- Existing limitation remains: formation/position and actual ability activation during a match cannot be predicted; conditional relations are not guaranteed outcomes.
- Scope protection: this was a documentation clarification only. No hero JSON artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch was changed.
- Next single action: agree the conceptual draft-state model and establish which inputs are actually available at each pick stage; do not resume third-batch JSON preparation until that direction is agreed.


## 29. Draft-state evaluation model proposal — 2026-11-26

### ACTION 0022 — Propose the evolving 3v3 Showdown draft-state model
- Started: 2026-11-26
- Task / phase: 3v3 Showdown draft evaluation / conceptual model definition
- Status: PROPOSAL PREPARED; USER DECISION PENDING
- Purpose: translate the confirmed pick order and unavailable random-pool constraint into a practical conceptual model without assuming access to unseen options.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `080384fe5a5114cbf40a48b73327cba02d209a8e`; Handoff blob SHA `a9237a28d41eaddb32ddc9f322cf8e22f0bc0338`.
- User approval: user approved proceeding with the conceptual draft-state model discussion and approved this Handoff synchronization; this does not approve the model proposal as a final specification or authorize implementation.
- Confirmed sequence: six picks — Blue 1, Red 2, Blue 2, Red 1 — with three heroes per side at completion.
- Input constraint: the random 20-hero pool is not an available/savable model input. The model must not require or infer it. It can evaluate already-selected rosters; a hypothetical candidate can be evaluated only when explicitly supplied.
- Proposed operation/model: represent each pick as a state transition. After each pick, report current rosters, ability-derived capabilities, conditional ally synergies, conditional opponent counters, composition gaps and uncertainty. A draft-advantage interpretation may be stated only when supported; no numeric score or winner prediction is implied.
- Context handling: map context can affect the importance of interactions, but map-specific conclusions require actual map information. AFK Stargazer labels remain clues for interpreting ability-to-ally/opponent relations, not universal synergy labels or a score.
- Limitations retained: no formation/placement, target-selection, ability-activation timing or match-outcome prediction; conditional relations are not guaranteed outcomes.
- Scope protection: discussion and Handoff documentation only. No hero JSON, third-batch artifact, application code, Supabase schema/data, migration, existing indicator, Tier List, TOP Picks or `main` branch changed.
- Verification: the exact diff was prepared against the live Handoff on `development`; commit/readback verification will be recorded after the write.
- Next single action: obtain the user's decision on the conceptual model proposal before preparing a detailed schema or implementation.


## 30. Empirical Showdown objective and independent test set — 2026-11-26

### ACTION 0023 — Synchronize empirical model objective and reserve unrecorded matches
- Started: 2026-11-26
- Task / phase: 3v3 Showdown draft evaluation / read-only audit handoff synchronization
- Status: COMPLETED — user-approved documentation update; no model implementation authorized
- Purpose: replace the outdated draft-state discussion as the active restart point with the user's clarified objective: evaluate actual match outcomes and determine whether hero/ability features explain performance beyond hero, class and opponent context.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/AI_SESSION_HANDOFF.md` only.
- Inputs / prior state: confirmed development HEAD `1f90645a0088fcee891216b7850594f464ed5dc0`; live Handoff blob SHA `5f98ac2b1b67e26b2bee215dc849b8adab969c8f`. The branch comparison against `1f90645a0088fcee891216b7850594f464ed5dc0` returned `identical`, confirming this was the current development HEAD before the update.
- User decision: user approved this exact Handoff synchronization and clarified that approximately 50 matches are unrecorded. Reserve these matches as an independent test set; do not enter or use them for tuning before a model version is frozen. The number remains approximate and has not been independently verified.
- Recorded audit snapshot: 1,425 approved matches; 8,550 hero selections; 1,421 matches with exact pick order on both sides; 110 distinct observed heroes; five maps; 3,564 unique same-team pairs, only 16 with at least 10 appearances and none with at least 20; 1,425 historical prediction rows; zero rows in `ss_showdown_draft_predictions`; zero paired matches in model comparison.
- Existing implementation audit: modules 08, 09 and 10 are loaded in the app but do not evaluate ability tags or kit-derived asymmetric ally/opponent interactions as explanatory features.
- Operation: update the top-level current-state summary; replace section 10 with the empirical evaluation objective, verified audit snapshot, data limitations, test-set isolation rule and next restart action; append this ACTION record. Earlier ACTION records remain preserved.
- Result: documentation update only. No matches were entered; no model was tuned or frozen; no code, Supabase schema/data, migrations, V4 files, pilot/batch JSON, existing indicators, Tier List, TOP Picks or `main` branch were modified.
- Decision: the next phase is a model-design proposal grounded in the audited data and existing implementation. It must distinguish individual hero baseline, teammate contribution, asymmetric interactions, opponent/map/pick-order context and uncertainty; it must not claim causation from match-level associations.
- Next single action: prepare that model-design proposal; do not begin implementation until separately approved.

## 31. Empirical model-design direction approved — 2026-11-26

### ACTION 0024 — Record approval of M0–M6 model design and synchronize restart point
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / model-design approval and Handoff synchronization
- Status: COMPLETED — user-approved model-design and documentation update; no implementation authorized
- Purpose: record the user's approval of the empirical model-design proposal and establish a precise, evidence-based restart point for the next analysis phase.
- Exact target: repository `ShifterAFK/smackdown-tracker`, branch `development`; `docs/AI_SESSION_HANDOFF.md` only.
- Inputs / prior state: confirmed development HEAD `d12fd655a1ecf39fb8522e9ef9640689a25b0bc1`; live Handoff blob SHA `95c380a69448c76ed58f014f3902adab4e866bd1`.
- User decision: approved the M0–M6 direction: side baseline; match context; official classes; regularized hero identity effects; ability-derived team functions; directed teammate interactions; directed opponent interactions. This is approval of the analytical design, not approval of implementation, scoring weights, production predictions, UI or database changes.
- Evidence constraints recorded: 1,425 approved matches; 8,550 selections; 1,421 matches with both sides' exact order known and four with neither; 110 observed heroes; five maps; 3,564 unique same-team pairs, only 16 with at least 10 appearances and none with at least 20. Ten heroes have structured pilot/batch analysis; 694 matches include at least one and zero matches have all six heroes covered by those ten profiles.
- Validation decision: use chronological walk-forward / expanding-window validation, prevent future leakage, compare feature blocks on identical splits, prioritize log loss and Brier score, and inspect calibration/uncertainty. Keep approximately 50 unrecorded matches isolated until model freeze.
- Operation: update the top-level current-state summary, replace section 10 with the approved model design, coverage constraints, validation rules and next action, then append this ACTION record. Earlier ACTION history remains unchanged.
- Scope protection: no match data, reserved test matches, application code, Supabase schema/data, migrations, V4 files, pilot/batch JSON, existing indicators, Tier List, TOP Picks or `main` branch are modified.
- Next single action: perform read-only M0–M3 baseline feasibility analysis on historical data; no implementation or use of the reserved independent test set.


## 32. M0–M3 baseline feasibility analysis — 2026-11-26

### ACTION 0025 — Complete read-only M0–M3 feasibility analysis
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / M0–M3 baseline feasibility
- Status: COMPLETED — read-only feasibility analysis; no model fitting, tuning or implementation
- Purpose: determine whether the recorded historical data supports a leakage-aware chronological evaluation of side baseline, match context, official class composition and regularized hero identity.
- Exact target: Supabase project rwnbxhrkjjlfuljhwdpt, approved historical matches and hero selections; repository ShifterAFK/smackdown-tracker, branch development, Handoff file docs/AI_SESSION_HANDOFF.md.
- Inputs / prior state: development HEAD ff71d5f21457b75a11a58652278ecee6ccd5fc4b; Handoff blob SHA 75335832b66a0a8d27908262b6c9b4bab36c9bd7. The live branch comparison against the recorded HEAD returned identical before this documentation update.
- Operation: ran read-only SQL queries to inspect match counts, match timestamps, winner/side balance, map/event distribution, draft-order completeness, hero frequency, official class composition and chronological feature availability. No SQL write, model fit, tuning, application execution or code change was performed.
- Result:
  - 1,425 approved matches and 8,550 hero selections; all matches had six distinct picks split 3v3, a winner, map context and unique non-null played_at timestamps.
  - 1,421 matches have complete exact draft order on both sides; four have neither side's order complete. Use the same 1,421-match sample for M0–M3 comparisons.
  - Blue wins: 784/1,425 (55.02%); complete-order subset: 782/1,421 (55.03%).
  - Five maps are strongly segmented by date (Tranquil Grounds Nov 11–13; Top Defender Nov 14–16; Siegebreaker Nov 17–19; Fierce Duel Nov 20–22; Tactical Grounds Nov 22–25). Map and calendar period are confounded; first and second validation folds each contain a map not present in their training data.
  - Only one event value is present (showdown-current), so event is not a useful varying feature in this sample.
  - Class composition support: 54/56 possible Blue and 55/56 possible Red three-hero class combinations; 44 Blue and 43 Red combinations occur at least ten times.
  - 110 observed heroes; 9–174 appearances overall, median 72. First training window: all 110 observed, median 25.5 appearances, four heroes below five appearances and 93 with at least ten.
  - Complete-order expanding folds (UTC): 511 train / 270 validate; 781 / 366; 1,147 / 274. The disjoint validation windows cover 910 matches. Fold 1 training Blue baseline is 294/511 (57.53%); validation Blue rates are 54.44%, 52.19% and 54.74%.
  - played_at is the correct chronology; timestamps are unique. 1,046 records have played_at < created_at, so created_at must not be used as match chronology. At each proposed fold cutoff, all earlier training matches were already created before the cutoff.
  - All 1,425 existing historical prediction rows have outcome-known-at-calculation status; they are not prospective validation evidence.
  - Approximately 50 reserved unrecorded matches were not accessed or used.
- Decision: M0–M3 are feasible for a first offline backtest on the common 1,421-match complete-order sample. M3 needs regularization/hierarchical pooling. M1 map coefficients must be treated cautiously because map is confounded with period and unseen in early training folds. The global pick sequence is fixed; only hero/class slot assignments vary. No model performance conclusion is available because no model was fitted.
- Scope protection: read-only Supabase queries and Handoff documentation only. No Supabase data/schema, application code, prediction rows, reserved test set, V4 files, pilot/batch JSON, existing indicators, Tier List, TOP Picks or main branch were changed.
- Next single action: await separate user authorization before conducting an offline M0–M3 backtest; keep the reserved unrecorded matches isolated until model freeze.

### ACTION 0026 — Run offline M0–M3 chronological backtest
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / offline M0–M3 backtest
- Status: COMPLETED — read-only data extraction and offline model evaluation; no repository or database writes
- Purpose: measure whether map context, official class composition and regularized hero identity improve prospective prediction over a fold-specific Blue-side baseline.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; `public.ss_matches`, `public.ss_match_heroes`, `public.ss_heroes`, `public.ss_themes`; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `86be88a86032087619001d237b3c30dae57343ee`; Handoff blob SHA `9fb196a811353d8c5026c62f8069d738c82be886`; user approved the offline M0–M3 backtest. The branch comparison against the recorded HEAD returned `identical`.
- Operation: executed a read-only SELECT to retrieve the approved complete-order sample with six distinct picks, map, outcome, official class and reconstructed global pick slots. Fit M0–M3 independently within each recorded expanding-window training fold; generated out-of-fold predictions and calculated log loss, Brier score, accuracy, AUC, calibration summaries and paired bootstrap intervals. The initial result parser treated the SQL aggregate wrapper as a row array; corrected the parser to unwrap the single aggregate row and verified the expected 1,421 match records before fitting.
- Result:
  - 1,421 unique approved matches passed the complete-order/six-distinct-pick validation; 910 disjoint validation predictions were generated across folds 511/270, 781/366 and 1,147/274 (train/validation).
  - Global slots were encoded as Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3. M0 used the training-only Blue win rate; M1 added map effects; M2 added official class-by-slot indicators; M3 added hero-identity-by-slot indicators. The L2 penalty was fixed at 0.1 for non-intercept coefficients; no hyperparameter tuning was performed. All fits reached maximum gradient below 1e-7.
  - Pooled out-of-fold metrics (log loss / Brier; accuracy / AUC): M0 0.692305 / 0.249568; 53.63% / 0.4987. M1 0.692916 / 0.249869; 53.63% / 0.4908. M2 0.690742 / 0.248753; 53.52% / 0.5318. M3 0.687999 / 0.247389; 54.51% / 0.5539.
  - M1 did not improve over M0. M2's point improvements over M1/M0 were uncertain. M3 improved over M2 in all three folds; paired bootstrap intervals for M3 minus M2 excluded zero for both log loss (-0.002743; 95% interval -0.004643 to -0.000767) and Brier (-0.001364; -0.002286 to -0.000405). M3's improvements over M0 were directionally favorable but the paired intervals included zero.
  - Map/calendar confounding and unseen validation maps remain limitations. Player identity and action-execution telemetry are unavailable. Bootstrap intervals condition on the fixed out-of-fold predictions and do not refit each model in every resample.
  - The approximately 50 reserved unrecorded matches were not accessed or used.
- Evidence: read-only SQL result contained 1,421 rows; offline evaluation returned 910 validation predictions and converged fits for all 9 trained fold/model combinations. No persistent analysis artifact was created.
- Decision: hero identity by draft slot shows incremental predictive signal beyond class in this sample, but M3 has not demonstrated a conclusive improvement over M0. Treat all findings as provisional; do not freeze or deploy a model based on this run.
- Next single action: await the user's decision on a separate robustness/sensitivity analysis; do not start M4–M6, production implementation or reserved-test evaluation without separate authorization.


## 33. M0–M3 robustness and sensitivity analysis — 2026-11-26

### ACTION 0027 — Complete read-only M0–M3 robustness/sensitivity analysis
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / M0–M3 robustness and sensitivity
- Status: COMPLETED — read-only SQL extraction and offline model evaluation; Handoff synchronization authorized by user
- Purpose: assess whether the provisional M0–M3 results depend materially on the fixed L2 penalty or map feature block, and whether the direction of improvement is consistent across the existing chronological validation windows.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; `public.ss_matches`, `public.ss_match_heroes`, `public.ss_heroes`; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `0dc833a2b7dee0e3fcad14f713f9d0fe7e82370e`; Handoff blob SHA `4777265834d563bb77d62d9bef95d8699595e748`; user authorized the separate robustness/sensitivity analysis. The current development HEAD and Handoff blob were re-fetched before this documentation write.
- Operation: re-extracted the approved complete-order sample using read-only SQL; validated six distinct picks and three unique ordered picks per side; reconstructed global slots Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3. Refit M1–M3 on the same three expanding chronological folds at L2 penalties 0.01, 0.03, 0.1, 0.3 and 1.0, with all encoders and coefficients fitted on each training fold only. Compared M3 with map effects against an otherwise equivalent class/hero-by-slot model without map effects. M0 remained the fold-specific training-only Blue baseline.
- Result:
  - Revalidated 1,421 approved complete-order matches and 910 disjoint out-of-fold validation predictions across folds 511/270, 781/366 and 1,147/274 (train/validation). The extracted rows cover 110 distinct heroes and the same chronology as ACTION 0026.
  - Reproduced the original lambda=0.1 results: M1 log loss/Brier 0.692916/0.249869; M2 0.690742/0.248753; M3 0.687999/0.247389. M0 remains 0.692305/0.249568.
  - M3 pooled log loss/Brier by lambda: 0.01 = 0.699725/0.251548; 0.03 = 0.689791/0.247983; 0.1 = 0.687999/0.247389; 0.3 = 0.689649/0.248250; 1.0 = 0.691274/0.249059. M3 improved over M2 on both metrics at all five tested values. Against M0, M3 improved at 0.03–1.0 but was worse at 0.01.
  - M3 without map effects slightly outperformed M3 with map effects on both pooled primary metrics at all five tested penalties. At lambda=0.1, no-map M3 was 0.687342/0.247070 versus 0.687999/0.247389 with map effects.
  - At lambda=0.1, M3 with map effects improved over M0 and M2 on both primary metrics in each of the three validation folds.
  - No new paired bootstrap intervals were computed for the alternative penalties or map ablation. The previously recorded paired bootstrap intervals from ACTION 0026 remain specific to lambda=0.1 and the original M3-versus-M2 comparison.
  - An initial SQL filter used lowercase values for side/winner and returned zero rows; the predicates were corrected to match the stored uppercase values. The corrected extraction returned and validated 1,421 rows before any fitting.
  - The approximately 50 reserved unrecorded matches were not accessed, entered or used. No Supabase writes, application/code changes, prediction-row changes or persistent analysis artifacts were made.
- Evidence: read-only SQL extraction returned 1,421 validated rows; offline fitting returned pooled metrics for five penalties and the map ablation across the three existing folds. Original lambda=0.1 M1–M3 pooled metrics were reproduced.
- Decision: the hero-identity-by-slot signal beyond class is directionally robust across moderate penalties and the three time folds, but lambda=0.01 demonstrates overfitting. The small no-map advantage is not evidence that map has no predictive value because map is confounded with calendar period and validation includes unseen maps. No new uncertainty intervals were computed for the sensitivity comparisons. M3 remains provisional; no model freeze, reserved-test evaluation or deployment is approved.
- Scope protection: read-only Supabase queries, offline computation and the user-approved Handoff documentation update only. No Supabase schema/data, code, V4 files, hero JSON, existing indicators, Tier List, TOP Picks, prediction rows, reserved test set or `main` branch were modified.
- Next single action: await the user's decision on the next analytical phase; do not start M4–M6, freeze a model, access the reserved test set or implement production changes without separate approval.


## 34. M4–M6 ability-feature feasibility analysis — 2026-11-26

### ACTION 0028 — Complete read-only M4–M6 ability-feature analysis
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / ability-derived team functions and directed interactions (M4–M6)
- Status: COMPLETED — read-only SQL extraction and offline evaluation/feasibility analysis; Handoff synchronization approved by the user
- Purpose: determine whether the currently approved structured hero ability profiles support incremental team-function prediction (M4) or directed ally/opponent interaction estimation (M5/M6), beyond the provisional M0–M3 model.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; approved historical match and hero-selection records; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `d5fddaf4087c0a7c477d7de3cddaef74f1750321`; Handoff blob SHA `a048f95f60deeea3ee255fd9bc736294aec2623b`. Both were re-fetched immediately before this documentation update and matched the expected base.
- User decision: user approved the read-only M4–M6 feasibility/evaluation phase and then approved this Handoff update/commit. This does not approve model freeze, production implementation, reserved-test evaluation, database changes or application changes.
- Operation: read the current composition-analysis plan, hero progress log and two approved ability JSON artifacts; executed read-only SELECTs against the approved match data; reconstructed the same global pick slots and chronological folds; evaluated M4 offline at fixed L2 lambda=0.1 and assessed M5/M6 interaction coverage. A pair-summary SQL alias issue and an initial in-memory M3 reproduction issue were corrected within the analysis before accepting results.
- Result:
  - The two structured ability artifacts cover 10 heroes: Lily May, Ravion, Odie, Himmel, Valka, Cecia, Granny Dahnie, Indris, Nerion and Solise. Together they contain 112 mechanics, 32 team functions and 20 directed interaction records (10 ally, 10 opponent). All 20 interaction records have no populated `beneficiary_capability`; source descriptions are paraphrased and patch labels are unverified.
  - Revalidated 1,421 approved complete-order matches with six distinct heroes and complete per-side order; generated 910 OOF predictions over the same expanding chronological folds: 511/270, 781/366 and 1,147/274 (train/validation).
  - Profile coverage: 691/1,421 matches have at least one profiled hero, 137 have at least two, 14 have three. Across 2,842 team instances, 771 have at least one profiled hero, 66 at least two, five have three. Both sides have at least one profiled hero in 80 matches; no match has at least two profiled heroes on both sides.
  - M4 added five per-team function-count differences (damage, support, control/disruption, durability, specialist) and known-profile coverage difference to M3. At fixed lambda=0.1, pooled OOF M4 log loss/Brier were 0.689887/0.248267, accuracy 54.62%, AUC 0.5452; M3 was 0.687999/0.247389, accuracy 54.51%, AUC 0.5539. M4-minus-M3 differences were +0.001887 log loss and +0.000877 Brier. In 10,000 paired bootstrap resamples, 95% intervals were [-0.000231, 0.004126] for log loss and [-0.000147, 0.001959] for Brier; both include zero.
  - M5 ally coverage: 36 directed same-team source/target co-occurrence combinations; maximum Ravion→Lily May = 7 matches; four combinations reach five; none reaches ten. All 10 ally interaction records lack beneficiary-capability annotations. Co-occurrence is not evidence that an interaction triggered; no M5 effect estimate/model was fitted.
  - M6 opponent coverage: 47 directed cross-side source/target co-occurrence combinations; maximum Lily May→Solise = 10 matches; five reach five; one reaches ten. No opponent-vulnerability annotations or activation/target telemetry are available to establish target eligibility or triggering; no M6 model was fitted.
  - The approximately 50 reserved unrecorded matches were not accessed, entered or used. No persistent analysis artifact was created.
- Evidence / corrections: the corrected in-memory analysis reproduced the established M3 metrics to the previously reported precision. The pair-summary SQL alias issue and first M3 prototype slot/fold-indexing issue were resolved before finalizing results; neither changed source data. The final repository check before this write confirmed the prior development HEAD and Handoff blob were unchanged.
- Decision: M4 does not demonstrate incremental predictive value beyond M3 on this sample; its pooled primary metrics are worse. M5 and M6 are NO-GO for predictive interaction estimation with current profile coverage, missing beneficiary/opponent annotations and absence of combat activation/target telemetry. Do not infer synergy/counter from co-occurrence. M3 remains provisional and is not frozen.
- Scope protection: read-only Supabase queries and offline computation plus this user-approved Handoff documentation update only. No Supabase writes/schema changes, application code, prediction rows, reserved test set, V4 data, hero JSON, existing indicators, Tier List, TOP Picks or `main` branch were modified.
- Next single action: await the user's decision on the next analytical phase. Do not freeze a model, access the reserved independent test set or begin production implementation without separate authorization.

## 35. M3 diagnostic analysis — 2026-11-26

### ACTION 0029 — Complete read-only M3 diagnostic analysis
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / M3 diagnostics
- Status: COMPLETED — read-only SQL extraction and offline diagnostics; Handoff synchronization approved by the user
- Purpose: assess the stability, calibration, prediction concentration and draft-slot reliance of the provisional M3 model before deciding whether it is useful for experimental draft evaluation.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; approved historical matches and hero selections; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `8c4234c7d5d933c192fc52744213ceff2b9aa226`; Handoff blob SHA `9d48e946daf970bef2ea0c3d99fb7b3c4029f7e9`; user approved read-only M3 diagnostic analysis and then approved this Handoff update/commit.
- Operation: re-extracted the approved complete-order historical sample using read-only queries; reconstructed the established global slots and three expanding chronological folds; refit M3 with training-only map, class-by-slot and hero-by-slot features at fixed L2 lambda=0.1; generated the 910 out-of-fold predictions; calculated fold metrics, calibration and probability concentration; ran 300 slot permutations per global slot per fold.
- Result:
  - Revalidated 1,421 matches, six distinct picks per match and 110 observed heroes; folds remained 511/270, 781/366 and 1,147/274 (train/validation), totaling 910 OOF predictions.
  - The first transient in-memory prototype incorrectly assigned the intercept the same feature index as the first category. That output was discarded. After assigning the intercept its own index, the corrected fit reproduced M0 and M3 to the previously reported precision. No persistent analysis artifact or source-data change resulted from the prototype defect.
  - M3 fold log loss/Brier/accuracy: 0.688672/0.247710/54.07%; 0.690504/0.248615/54.37%; 0.683992/0.245435/55.11%. Pooled M3 remained log loss 0.687999, Brier 0.247389 and accuracy 54.51%.
  - Mean predicted Blue win probability was 55.69%, compared with observed Blue win rate 53.63%, a +2.06 percentage-point calibration-in-the-large difference. M3 overpredicted Blue in folds 1 and 2 and underpredicted in fold 3.
  - Prediction distribution: 84.5% between 0.40 and 0.60; 15.5% at least 0.60; only two predictions above 0.70; none above 0.80.
  - Slot permutation diagnostics used 300 permutations for each global pick slot in each fold. Most slot effects were small and not uniform; Blue pick 3 showed no consistent positive contribution. These are model-reliance diagnostics, not causal effects.
  - The approximately 50 reserved unrecorded matches were not accessed or used. No Supabase writes, code changes, prediction-row changes, persistent artifacts, model freeze or production implementation occurred.
- Evidence: corrected in-memory fit reproduced the established M0/M3 pooled metrics; 910 OOF predictions and fold-level diagnostic outputs were calculated on the same validated sample and chronological folds.
- Decision: M3 is reproducible but remains a weak provisional discriminator. Prediction probabilities cluster near 0.5 and calibration changes across time folds; slot reliance is small/non-uniform. M3 may be considered for experimental complete-draft evaluation only, not next-pick recommendations or reliable hero ranking. Previously recorded paired intervals still do not establish conclusive improvement over M0. Do not freeze or deploy M3 based on these diagnostics.
- Scope protection: read-only Supabase extraction and offline computation plus this user-approved Handoff update only. No Supabase schema/data writes, application code, prediction rows, reserved test set, V4/hero JSON, existing indicators, Tier List, TOP Picks or `main` branch were modified.
- Next single action: await the user's decision on the next analytical phase; keep the reserved independent test set untouched and do not freeze, deploy or implement a model without separate authorization.



## 36. M3 hero-effect stability analysis — 2026-11-26

### ACTION 0030 — Complete read-only M3 hero-effect stability analysis
- Started: 2026-11-26
- Task / phase: 3v3 Showdown empirical evaluation / M3 hero-effect stability across chronological windows and within-window sampling perturbations
- Status: COMPLETED — read-only SQL extraction and offline refitting/subsampling; Handoff synchronization approved by the user
- Purpose: determine whether the provisional M3 hero-by-draft-slot effects are stable enough to support interpretation or ranking, separating within-period sampling stability from changes across chronological training windows.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; approved historical match and hero-selection records; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `38fc51e7bc021147385b4e78277de1ee7770635e`; Handoff blob SHA `84e795f47f0eb3a82ee69d2e61e9ba03dbceb4ce`. The current development HEAD and full Handoff were re-fetched before this documentation update and matched the expected base. User approved the read-only stability analysis and this Handoff update/commit.
- Operation: re-extracted the approved complete-order sample with read-only SELECTs; reconstructed global slots Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3; refit M3 independently on the same three expanding chronological training windows using training-only map, class-by-slot and hero-by-slot encoders, fixed L2 lambda=0.1 and an unpenalized intercept. Compared side-adjusted hero-effect ranks and signs across folds. Ran 35 deterministic-seed 80%-without-replacement training subsamples per fold (105 total), refitting the same M3 specification and fixed penalty.
- Result:
  - Revalidated 1,421 approved complete-order matches, six distinct picks per match and 110 observed heroes; the same folds remained 511/270, 781/366 and 1,147/274 (train/validation), totaling 910 OOF predictions.
  - The corrected M3 fit reproduced the established fold metrics: fold 1 log loss/Brier/accuracy 0.688672/0.247710/54.07%; fold 2 0.690504/0.248615/54.37%; fold 3 0.683992/0.245435/55.11%. Pooled metrics remained 0.687999/0.247389/54.51%. Maximum gradient was below 4.7e-8.
  - For comparability of own-team effects, Red-slot coefficients were sign-reversed because the model predicts Blue wins; thus positive side-adjusted values indicate association with the picking side's win. Across the six global slots, cross-fold Spearman rank correlations ranged from 0.602 to 0.902. Pairwise top-10 overlap ranged from 3/10 to 8/10. Among heroes represented in all three training windows for a given slot, 55/73 to 81/101 retained the same side-adjusted effect sign across all three windows.
  - Within-window subsampling used 35 independent deterministic-seed samples per fold, each retaining 80% of that fold's training matches without replacement. Across slot/fold summaries, median rank correlation to the full-window fit ranged from 0.867 to 0.932; 10th–90th percentile ranges were 0.837–0.951. Mean per-hero sign agreement ranged from 0.862 to 0.933.
  - These subsampling and cross-fold comparisons are stability diagnostics, not bootstrap confidence intervals, p-values, significance tests or proof of generalization to future periods. The coefficients are conditional associations in the fitted model, not causal hero effects.
  - The approximately 50 reserved unrecorded matches were not accessed, entered or used. No persistent analysis artifact was created.
- Evidence / corrections: an initial SQL parser expected a top-level array but the aggregate returned a one-row wrapper containing the JSON array; the parser was corrected. The first in-memory prototype scaled the L2 penalty by training-row count and failed to reproduce established M3 metrics; that output was discarded. The corrected objective reproduced the recorded fold metrics. No source data was changed. A few script syntax errors were rejected before execution and had no effect.
- Decision: M3 hero effects are reasonably stable to sampling perturbations within a given period but shift moderately across chronological training windows. Effects are draft-slot- and time-dependent and do not support a universal hero-strength ranking. M3 remains weak and provisional; the previously recorded uncertainty about improvement over M0 is unchanged. Do not freeze or deploy M3 based on this analysis.
- Scope protection: read-only Supabase extraction and offline computation plus this user-approved Handoff documentation update only. No Supabase writes/schema changes, application code, prediction rows, reserved test set, V4/hero JSON, existing indicators, Tier List, TOP Picks or `main` branch were modified.
- Next single action: await the user's decision on the next analytical phase; keep the reserved independent test set untouched and do not freeze, deploy or implement a model without separate authorization.



## 37. M3 calibration analysis — 2026-11-27

### ACTION 0031 — Complete read-only M3 calibration analysis
- Started: 2026-11-27
- Task / phase: 3v3 Showdown empirical evaluation / M3 temporal calibration and prior-fold intercept-only recalibration diagnostic
- Status: COMPLETED — read-only SQL extraction and offline calibration analysis; Handoff synchronization approved by the user
- Purpose: determine whether the provisional M3 probability estimates are calibrated across chronological validation windows and whether a simple correction estimated only from earlier out-of-fold outcomes transfers to a later window.
- Exact target: Supabase project `rwnbxhrkjjlfuljhwdpt`; `public.ss_matches`, `public.ss_match_heroes`, `public.ss_heroes`; repository `ShifterAFK/smackdown-tracker`, branch `development`, Handoff `docs/AI_SESSION_HANDOFF.md`.
- Inputs / prior state: development HEAD `298bb9e79de87c92e0558deb0a7d3a7cdfb0a9fa`; Handoff blob SHA `94fa4b2070fca83ac54224f92880df4f2595800a`. The current development branch was compared with the recorded HEAD immediately before the documentation update and was identical (ahead 0 / behind 0). User approved the read-only calibration analysis and then approved this single-file Handoff commit.
- Operation: re-extracted the approved complete-order historical sample with read-only SELECTs; reconstructed global slots Blue 1, Red 1, Red 2, Blue 2, Blue 3, Red 3; refit the fixed M3 specification at L2 lambda=0.1; calculated fold and pooled calibration, equal-count reliability deciles, and a sequential intercept-only logistic recalibration using only earlier OOF outcomes to adjust the next fold. Used paired 2,000-resample bootstrap intervals for adjusted-minus-raw log loss and Brier.
- Result:
  - Revalidated 1,421 approved complete-order matches and generated 910 OOF predictions across the same expanding chronological folds: 511/270, 781/366 and 1,147/274 (train/validation).
  - The fixed M3 specification used training-only map, official class-by-global-slot and hero-identity-by-global-slot features; L2 lambda=0.1; unpenalized intercept. The corrected objective reproduced previously recorded OOF metrics to reported precision. The final optimizer run reached its 1,000-iteration cap; maximum gradient residuals by fold were approximately 5.2e-8, 1.03e-6 and 2.36e-6. This is a consistency check against recorded predictions/metrics, not a claim that every fit met the earlier strict gradient tolerance.
  - Calibration-in-the-large (mean predicted Blue probability minus observed Blue win rate): fold 1 +3.00 percentage points (57.45% vs 54.44%); fold 2 +4.14 pp (56.33% vs 52.19%); fold 3 -1.65 pp (53.09% vs 54.74%); pooled +2.06 pp (55.69% vs 53.63%).
  - Pooled M3 metrics: log loss 0.6879996, Brier 0.2473894, accuracy 54.51%, AUC 0.5539. Equal-count reliability deciles showed non-monotonic observed rates and local deviations between predicted and observed outcomes.
  - Sequential intercept-only logistic recalibration: fold 2 used fold 1 OOF outcomes, yielding offset -0.12294 logit; fold 2 log loss/Brier changed from 0.690504/0.248615 to 0.687265/0.247040. Fold 3 used folds 1+2 OOF outcomes, yielding offset -0.14903; fold 3 metrics changed from 0.683992/0.245435 to 0.689212/0.248031.
  - Paired 2,000-resample bootstrap 95% percentile intervals for adjusted-minus-raw metrics included zero in both folds: fold 2 log loss [-0.00990, 0.00320], Brier [-0.00489, 0.00163]; fold 3 log loss [-0.00334, 0.01406], Brier [-0.00166, 0.00695]. Intercept-only adjustment does not change AUC/ranking but can change threshold-based accuracy.
  - An initial prototype used incorrect L2 scaling and was discarded. A subsequent tool execution timed out without persistent effects; the corrected objective was rerun. No tuning or alternate model was performed.
  - The approximately 50 reserved unrecorded matches were not accessed, entered or used. No persistent analysis artifact was created.
- Evidence: read-only extraction returned and validated 1,421 rows; the corrected fixed-specification fit reproduced established OOF metrics to reported precision; calibration and sequential adjustment diagnostics were calculated on the same 910 OOF predictions.
- Decision: M3's calibration direction changes across chronological windows. A prior-fold intercept-only correction improved fold 2 point metrics but worsened fold 3; paired bootstrap intervals include zero in both folds. No recalibration method or parameter is approved. M3 remains weak and provisional; do not freeze or deploy it based on this analysis.
- Scope protection: read-only Supabase SELECTs and offline computation plus this user-approved Handoff documentation update only. No Supabase writes/schema changes, application code, prediction rows, reserved test set, V4/hero JSON, existing indicators, Tier List, TOP Picks or `main` branch were modified.
- Next single action: await the user's decision on the next analytical phase; keep the reserved independent test set untouched and do not freeze, deploy or implement a model without separate authorization.
