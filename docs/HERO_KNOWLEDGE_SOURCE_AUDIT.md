# Hero Knowledge Base — Phase 0 source audit

**Status:** Phase 0 research / schema proposal  
**Date:** 2026-11-25  
**Branch:** `development`  
**Scope:** Read-only audit. No Supabase schema/data changes and no live tracker changes.

## 1. Current roster baseline

A read-only query of `public.ss_heroes` returned **131 rows**. This is the tracker roster baseline for the first coverage pass.

External roster counts are not currently consistent:
- AFK.global search indexing reports 139 heroes on one result, while the opened character-list page exposes an older 117-character listing.
- Prydwen's character index reports 130 characters (last updated 13 November 2026).
- AFK.global's site navigation/search snippets also expose other totals (for example 134).

Therefore, do not replace the tracker roster or assume any external count is canonical. Reconcile by hero identity/slug and release status. Keep unreleased/data-mined heroes separate from playable heroes.

## 2. Source assessment

### Primary source: AFK Stargazer

Useful evidence observed:
- `/skills` provides a searchable skill catalogue and mechanic filters.
- `/guide/mechanics` groups heroes by mechanic and provides the underlying skill context.
- Individual `/en/skill/{hero-slug}` pages expose skill-by-skill tags and descriptions.
- Pages include skill name, type, cooldown, initial cooldown, range, initial energy, level scaling, targeting rules, tile effects, Exclusive Equipment, Enhance Force, and Season Charm information where applicable.
- Tags are attached to particular abilities, not merely to a hero's general class or profile.

Observed tag families include Airborne, Cheat Death, Debuff, DoT, Energy Battery, Energy Denial, Execute, Haste, Heal Denial, Init Energy > 500, Invincibility, Special Target, Summon, Temp Buff, Tile Effect, Ult (Opening), and Ult Denial. Some tags have qualifiers such as Single Target, AOE, Global, Opening, Self, and Ally.

Counts displayed by the site can vary between crawls/versions (for example Ult Denial appeared as 8 or 9; Debuff as 85 or 86). Store the retrieved timestamp and source version/snapshot; do not treat aggregate counts as immutable facts.

### Secondary source: AFK.global

Useful for cross-checking:
- hero identity metadata (class, faction, rarity);
- full skill descriptions and level scaling;
- overview information and mode ratings.

An accessible Hugin profile contains a complete skill section and is useful for comparing the Stargazer skill descriptions. AFK.global identifies itself as a fan-made resource and not affiliated with Lilith Games. Its indexed roster count currently conflicts across pages/search results, so use it as a cross-reference, not the roster authority.

### Additional roster cross-check: Prydwen

Its character index currently reports 130 characters and a recent update date. Use as an additional roster-difference check only, not as the source of Stargazer effect tags.

## 3. Verified sample observations

These are source observations, not manually inferred role labels.

### Hugin — AFK Stargazer

Source: https://afkstargazer.com/en/skill/hugin

- `Unstoppable!` (Ultimate): `Haste (Single Target)`, `Temp Buff (Single Target)`.
- `Mechanized Bond`: `Energy Battery`, `Temp Buff (Opening, Single Target)`, `Tile Effect`.
- The page describes the opening sigil one tile behind Hugin, its ATK bonus, and additional Energy recovery for the ally on that tile when Hugin casts Titan's Aegis.
- `Titan's Aegis` shields the weakest ally; the Exclusive Equipment enhances shields for two weakest allies; Enhance Force adds damage reduction while the cogshield is active.

Cross-check: https://www.afk.global/afk-journey/characters/hugin

### Lily May — AFK Stargazer

Source: https://afkstargazer.com/en/skill/lily-may

- `Tempest Shot` (Ultimate): `Energy Denial`, `Ult Denial`.
- The description says she interrupts the first qualifying enemy Ultimate (or a selected enemy, depending on the chosen defensive mode) and removes 700 Energy; it cannot interrupt boss enemies.
- The page separately describes her damage skills, so the two Ultimate tags must not be mistaken for a complete description of her entire kit.

### Other spot checks

- Ravion's `Designated Duty` is tagged `Debuff (Single Target)`, `Energy Battery`, `Special Target`, and `Temp Buff (Single Target)`; his Exclusive Equipment and Enhance Force have additional effects.
- Himmel's `Hero Party` has `Tile Effect` and requires adjacent Mage, Tank, and Support allies.
- Odie's Exclusive Equipment is tagged `Execute`; his Ultimate applies a non-dispellable damage-over-time poison.
- Faramor's kit includes `Heal Denial`, including a circle that prevents healing while active.
- These examples demonstrate that class alone does not represent the actual function of a kit.

## 4. Recommended data model (proposal only)

Use separate records for heroes, patch versions, abilities, tags, and source evidence. Avoid storing a single flat role string on the hero.

### `hero_knowledge_versions`
One versioned hero profile per hero and game patch:
- `hero_id` (FK to existing hero identity)
- `game_patch` / `season`
- `valid_from`, `valid_to` (nullable)
- `status` (unreviewed, verified, needs_review, superseded)
- `reviewed_at`, `reviewed_by`

### `hero_abilities`
One row per ability within a hero version:
- `hero_version_id`
- `ability_key` (stable internal key)
- `ability_name`
- `ability_type` (ultimate, skill, passive, hero_focus, exclusive_equipment, enhance_force, season_charm, other)
- `description_raw` (source wording, not silently rewritten)
- `cooldown`, `initial_cooldown`, `range`, `initial_energy` (nullable structured fields)
- `targeting_raw`, `conditions_raw`, `duration_raw`, `scaling_raw` (nullable; preserve exact source text when parsing is uncertain)

### `ability_effect_tags`
Many-to-many ability-to-tag relation:
- `ability_id`
- `source_tag_raw` (exact Stargazer label)
- `tag_family` and optional qualifiers only when the mapping is explicit and documented
- `source_id` / evidence reference

Do not collapse `Temp Buff (Opening, Single Target)` into a generic `Buff` and discard its timing/target qualifiers. Keep the original label even if normalized facets are added.

### `knowledge_sources` / `ability_source_evidence`
Track:
- source name and canonical URL;
- retrieval timestamp;
- source patch/version or stated update date, if available;
- source language;
- exact field/claim supported;
- verification status and reviewer notes.

Keep source claims separate: Stargazer tags, Stargazer text, AFK.global text, and any in-game/official patch-note evidence must remain distinguishable.

## 5. Coverage checklist and extraction rules

For each of the 131 tracker hero IDs:
1. Resolve the canonical Stargazer slug; record missing/renamed/alias cases explicitly.
2. Capture every listed ability and its ability type, including Exclusive Equipment, Enhance Force, and Season Charm where present.
3. Capture every Stargazer tag at the individual ability level, preserving exact wording and qualifiers.
4. Capture full ability description and numeric mechanics; preserve targeting and tile rules.
5. Cross-check identity and skill text against AFK.global; flag disagreements rather than silently choosing one.
6. Record whether the hero is currently playable, unreleased, or uncertain.
7. Mark page unavailable, missing tag, no tag, or not reviewed as distinct states.
8. Revisit profiles after patch changes; do not overwrite the prior patch version.

Coverage statuses should be explicit: `not_started`, `source_found`, `extracted`, `cross_checked`, `verified`, `needs_review`, `unavailable`.

## 6. Important limitations

- Stargazer and AFK.global are community resources, not official game endpoints. Their content can lag patches or contain errors.
- A tag describes a mechanic detected by the source; it is not a full strategic role or proof of strength.
- Absence of a tag does not prove the ability has no relevant effect.
- Descriptive tags must not be converted directly into synergy/counter bonuses.
- Skill effects can depend on level, Exclusive Equipment, Enhance Force, Season Charm, game mode, formation, target eligibility, and patch.
- Composition analysis must distinguish baseline kit effects from upgrade- or mode-specific effects.

## 7. Exit gate before Phase 1 implementation

Before creating database tables or importing data:
- finish the 131-ID slug/roster reconciliation;
- confirm how the source patch/version will be represented;
- agree whether all skill variants (especially Season Charm and Rivalry Mode refinements) belong in the initial dataset;
- review this schema proposal;
- produce a coverage report with explicit missing/uncertain cases.

**No Supabase changes have been made. No Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code has been touched.**
