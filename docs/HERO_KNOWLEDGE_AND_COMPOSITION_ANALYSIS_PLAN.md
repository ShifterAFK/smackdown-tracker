# Hero Knowledge Base & Composition Analysis — plan

**Status:** Proposed — planning only; implementation not started  
**Created:** 2026-11-25  
**Repository:** `ShifterAFK/smackdown-tracker`  
**Branch:** `development`

## Purpose

Extend AFK Journey Tracker beyond class labels and raw pick/result correlations. The tracker should eventually be able to analyse team compositions using a structured, verifiable description of what each hero's abilities actually do.

The current match dataset can show that certain heroes or duos win together. By itself, it cannot explain *why*: it does not know whether a hero provides utility, disables an enemy ultimate, buffs allies, deals sustained damage, protects the team, or fulfils several roles at once.

This plan adds a knowledge layer first, then a composition-analysis layer. It is a separate future workstream; it does not change the existing Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks.

## Core principles

1. **Do not equate class with function.** Official classes (Assassin, Warrior, Marksman, etc.) remain useful metadata, but they are not sufficient descriptions of a hero's practical role.
2. **Describe abilities, not assumptions.** Record what the kit does, including triggers, targets, conditions, duration, and relevant limitations.
3. **Allow multiple functions per hero.** A hero may provide utility and meaningful damage, or durability and control. Avoid forcing every hero into one exclusive role.
4. **Keep facts separate from hypotheses.** Verified ability descriptions belong in the knowledge base. Claims such as “Lily May needs a damage dealer beside her” are hypotheses to test against match data, not manually encoded truths.
5. **Version knowledge by game patch.** Balance changes can alter abilities and role effectiveness. Analyses must be able to identify which hero-kit version they used.
6. **Preserve provenance and confidence.** Each entry should record its source, patch/version, verification status, and last-reviewed date. Unverified community interpretation must not silently become fact.
7. **Do not claim causation from correlation.** Draft order, opponent composition, map, player execution, hidden formation, and unrecorded pool/bans can confound match outcomes.

## Workstream A — Hero Knowledge Base

### A1. Define a structured hero profile

For every hero, preserve existing identity metadata and add structured, multi-label functional attributes.

Candidate dimensions (to validate before finalising the schema):

- **Damage:** burst, sustained, execute/finisher, area damage, single-target pressure.
- **Utility/control:** interruption, silence/disable, crowd control, displacement, debuff, disruption.
- **Support:** ally buffs, attack/speed amplification, energy/ultimate support, healing, shielding.
- **Durability:** tanking, damage reduction, self-sustain, protection/peel, resurrection or survival mechanics.
- **Specialist mechanics:** summon/pet interaction, mark/focus target, anti-heal, anti-shield, anti-summon, counter/conditional effects, etc.

These are descriptive tags, not a forced tier list or fixed role taxonomy. Allow primary and secondary functions, plus a short natural-language explanation.

### A2. Capture ability-level evidence

For each ability, record as applicable:

- ability name and type (ultimate, skill, passive, etc.);
- exact effect summary in plain language;
- target and affected allies/enemies;
- trigger/conditions and duration;
- damage/support/control/durability functions;
- interactions or restrictions that materially change use;
- source URL/reference, game patch, verification state, reviewer, and review date.

Do not invent missing mechanics. Mark unknowns explicitly.

### A3. Populate and verify the full roster

- Audit the existing hero catalogue (currently 131 heroes in the audited database snapshot) and reconcile it with the current in-game roster.
- Build profiles for all heroes, not just popular picks.
- Use authoritative/current game information where available; cross-check unclear interactions.
- Keep class/faction fields as existing metadata, not as substitutes for ability knowledge.
- Add a workflow for reviewing profiles after balance patches and new hero releases.

### A4. Initial examples from discussion (illustrative only)

These examples capture the user's descriptions and are not yet a verified full knowledge-base record:

- **Lily May:** utility/disruption; her ultimate can silence or otherwise prevent the opposing team's first ultimate (exact current effect and conditions must be verified); also deals respectable damage, but is not primarily a top damage dealer.
- **Ravion:** utility/support through ally buffs; also contributes respectable personal damage.
- **Odie:** Marksman focused on damage.
- **Himmel:** Warrior focused on damage.
- **Valka:** Warrior whose kit is more oriented toward survivability than very high damage.
- **Farmor:** Rogue/Assassin-class example whose kit includes buffing the ally positioned behind him; verify exact effect and formation dependency before encoding.

These illustrate why class labels alone are inadequate. They must be verified against current abilities before being treated as structured facts.

## Workstream B — Composition Analysis

Start only after the knowledge base has adequate roster coverage and verified ability data.

### B1. Build composition feature summaries

For each three-hero team, derive transparent summaries such as:

- damage profile and number/type of damage sources;
- control and disruption coverage;
- ally buffs and which damage profiles they may amplify;
- healing, shielding, durability, and protection;
- specialist effects and conditional interactions;
- overlap, complementary functions, and possible missing functions.

Do not reduce a team to a single arbitrary “balance score” initially. Show the underlying tags and evidence.

### B2. Test composition hypotheses against matches

Examples of hypotheses to test, not pre-set rules:

- Do utility-heavy cores perform better when paired with a dedicated damage dealer?
- Does adding another defensive/survivability hero to a utility-heavy core reduce the team's damage output or win rate?
- Which functional combinations perform well against specific opposing functions?
- Do buffs correlate with stronger outcomes when the team has heroes able to exploit those buffs?
- Does disruption/ultimate denial perform differently against compositions that rely heavily on early ultimates?

For every result, report appearances, wins/losses, sample size, uncertainty, map, side, pick sequence, and relevant opponent composition. Use minimum-sample and shrinkage safeguards. Avoid ranking a two-game combination as established truth.

### B3. Separate descriptive, predictive, and explanatory outputs

- **Descriptive:** what functions are present in each team.
- **Predictive:** whether those features improve out-of-sample match prediction over existing baselines.
- **Explanatory:** which observed interactions may account for an outcome, with explicit confounder caveats.

Do not call an association a counter or synergy unless the evidence supports that interpretation.

### B4. Keep existing indicators isolated

- Do not alter the existing Match Indicator or Showdown Draft Indicator as part of this workstream.
- Do not change Tier List or TOP Picks.
- First build an offline/read-only analysis and compare it with simple baselines.
- Any future UI should be a separate, clearly labelled experimental section.
- No production formula, weight, or automated recommendation should be introduced without a separate review and explicit approval.

## Proposed implementation phases and exit gates

| Phase | Scope | Exit gate |
|---|---|---|
| 0 | Audit hero catalogue, available sources, patch/version handling, and current data model | Data sources and gaps documented; schema proposal reviewed |
| 1 | Design profile/ability schema and provenance rules | Supports multi-label roles, ability-level facts, and patch history without overwriting old knowledge |
| 2 | Populate and verify every hero | Full current roster covered; unknowns and confidence visible; no unsupported ability claims |
| 3 | Build read-only team composition feature extraction | Features trace back to verified hero/ability records; sample compositions manually checked |
| 4 | Run exploratory composition analyses | Results include sample sizes, uncertainty, opponent context, and clear separation of fact vs hypothesis |
| 5 | Evaluate predictive value chronologically/out of sample | Demonstrated incremental value over simple baselines, or documented NO-GO |
| 6 | Consider separate experimental UI | Only after data and validation gates pass; existing indicators and pages remain untouched |

## Initial research question

Use the Lily May + Ravion observations as an initial case study, not as a conclusion:

- Their observed wins included Odie or Himmel as the third hero (damage-oriented), while the recorded loss included Valka (more survivability-oriented).
- The sample is only three matches and is heavily confounded by the other picks, sides, pick order, opponents, and player execution.
- Investigate whether this pattern repeats across other utility-oriented cores and larger samples.
- Do not hard-code “Lily May + Ravion requires a damage dealer”; let the evidence test it.

## Explicit non-goals

- No immediate changes to the live indicators, Tier List, or TOP Picks.
- No automatic hero role inferred solely from official class.
- No hard-coded synergy/counter bonus based on anecdotal examples.
- No claims that the model understands ability interactions before the knowledge base and analysis are implemented.
- No schema or database changes as part of this planning entry.

## Next action

Phase 0: inspect the existing hero catalogue and identify reliable current sources for hero abilities and patch history. Produce a schema proposal and a coverage checklist before populating records or changing Supabase.
