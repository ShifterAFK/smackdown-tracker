# AI Session Handoff — AFK Journey Tracker

> **READ THIS FILE FIRST after every context loss, Retry, new chat, or resumed work.**
>
> This is the operational restart document. It is not a replacement for source data, technical specifications, or detailed work logs. It tells the next assistant what the project is actually about, which records are authoritative, what must not be repeated, and how to resume without restarting completed work.

**Repository:** `ShifterAFK/smackdown-tracker`  
**Working branch:** `development`  
**Production branch:** `main` — do not modify unless the user explicitly authorizes it  
**Last repository audit recorded here:** 2026-11-25  
**Audited development HEAD before this documentation update:** `30c05bf1d28b1b4c3e97d11922ca22754012a922`  
**Current task family:** new, independent team/composition indicator grounded in what heroes' abilities actually do  
**Current implementation status of that new analysis:** not implemented; the three-layer model and its detailed ability schema/tagging rules are user-approved. Scoring formula, weights and implementation remain open

---

## 1. First rule: recover context before doing work

When a session starts, context is missing, or the user presses Retry:

1. Read this file from top to bottom.
2. Read the current versions of the linked source-of-truth documents in the repository. Do not rely on an old chat summary if the repository has moved.
3. Check the current `development` branch HEAD and compare it with the audited HEAD recorded above.
4. Inspect the latest entries in the relevant progress log and this file's action log.
5. Identify the last **confirmed completed** action and the first **not completed** action.
6. Verify whether an action marked STARTED/INTERRUPTED actually changed anything before retrying it.
7. Continue from that exact point. Do not restart a phase, batch, extraction, audit, or analysis that is already complete.

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

## 10. Current restart point at file creation

**Task:** establish a reliable restart mechanism and recover the actual status of the new ability/action-based composition analysis.

**Confirmed:**
- The hero knowledge V4 dry-run exists and passed its recorded structural/tag/provenance checks, with the limitations listed above.
- The hero knowledge source-verification workstream's latest recorded restart point is Stage 2AD4.
- The new composition-analysis plan exists but is marked planning only; implementation is not started in that plan.
- Existing Match Indicator and Showdown Draft Indicator are separate protected systems.

**Not confirmed:**
- No approved final indicator formula.
- No verified availability of actual in-match combat action telemetry.
- No implemented composition feature extractor or validated predictive model established by the planning document.
- No approval to import V4 or change Supabase.

**Reconciliation status:** completed and recorded in ACTION 0002 below.

**Next single action:** define the concrete field schema and tagging rules for the approved three-layer model, using existing V4 evidence. Check evidence coverage and record gaps; do not repeat hero extraction or normalization.

---

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
- Next single action: map the approved fields against the existing V4 structure and produce a field-coverage/gap assessment, without repeating extraction or normalization.


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
