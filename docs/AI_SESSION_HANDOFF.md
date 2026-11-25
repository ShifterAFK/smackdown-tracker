# AI Session Handoff — AFK Journey Tracker

> **READ THIS FILE FIRST after every context loss, Retry, new chat, or resumed work.**
>
> This is the operational restart document. It is not a replacement for source data, technical specifications, or detailed work logs. It tells the next assistant what the project is actually about, which records are authoritative, what must not be repeated, and how to resume without restarting completed work.

**Repository:** `ShifterAFK/smackdown-tracker`  
**Working branch:** `development`  
**Production branch:** `main` — do not modify unless the user explicitly authorizes it  
**Last repository audit recorded here:** 2026-11-25 (historical audit snapshot; later state reconciled in ACTION 0008)  
**Last confirmed development HEAD before ACTION 0018:** `6d9eda60435bdc0fb28fea577f192cad00b77efd`  
**Current task family:** independent team/composition analysis grounded in what heroes' abilities can do  
**Current analysis artifact:** `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json` — five-hero descriptive pilot completed  
**Current stage:** five-hero pilot accepted as the reference method; first and second bounded batches committed; third alphabetical batch source review completed for Aliceth, Alna, Alsa, Antandra and Arden; third structured JSON artifact not yet created  
**Current implementation status:** pilot data artifact exists; no application indicator, scoring formula, weights, predictive thresholds, UI or database implementation is approved or implemented

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

## 10. Current restart point after ACTION 0018

**Task:** ability-based composition analysis; the accepted five-hero pilot remains the reference method.

**Confirmed current state:**
- The approved three-layer model and schema/tagging rules remain recorded in sections 13–14.
- First pilot: `docs/data/HERO_COMPOSITION_ABILITY_PILOT_5_HEROES.json` — 5 heroes, 43 mechanics, 15 team functions, 10 interactions and 6 unmodeled sections.
- Second bounded batch artifact: `docs/data/HERO_COMPOSITION_ABILITY_BATCH_2_CECIA_GRANNY_INDRIS_NERION_SOLISE.json` — 5 heroes, 69 mechanics, 17 team functions, 10 interactions and 10 unmodeled sections.
- Third alphabetical batch source review is complete for Aliceth, Alna, Alsa, Antandra and Arden. The structured third-batch JSON artifact has not yet been created.
- Third-batch source captures were read from V4 PART_01 and extraction batches 02, 04, 05, 10, 12, 15 and 19; the accepted pilot and second-batch artifacts were read as schema references.
- Existing hero descriptions may be distributed across multiple JSON shards/files. Treat source files as evidence inputs, not as the final analytical model. Identify heroes by stable `hero_id`, abilities by `ability_key`, retain per-record provenance, and compare duplicate/conflicting descriptions before reconciliation. Do not silently merge or duplicate records. The V4 shards collectively contain roster descriptions, but their paraphrased sections are not already atomized mechanics.
- Third-batch preliminary capability relations include Arden control potentially satisfying Alsa's controlled-target condition, ally control potentially satisfying Arden's Energy trigger, and Aliceth's conditional Brightfeather ally amplification. These remain conditional kit-capability relations, not observed match synergies.
- Season Charm remains excluded and distinct from Season Skill. Unknown tags remain unknown.
- Patch research remains closed. The model describes kit capabilities, not actual match execution, guaranteed synergy/counter effects or match outcomes.
- Formation prediction and ability-activation prediction are unsupported. Position- and activation-dependent interactions remain conditional capabilities.
- No application indicator, scoring, weighting, predictive thresholds, UI or Supabase implementation is approved or implemented.

**Next single action:** prepare the separate third-batch JSON artifact using the accepted pilot schema; then show the exact new path and minimal diff for approval before committing it.

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
