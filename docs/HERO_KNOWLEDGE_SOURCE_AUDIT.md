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


## 8. Initial roster-page extraction pass (2026-11-25)

A targeted search pass against Stargazer's individual `/en/skill/{slug}` pages confirmed accessible skill records for the following **45 tracker roster entries**:

`Alna, Alsa, Antandra, Athalia, Atalanta, Aster, Aurora, Baden, Bonnie, Brutus, Callan, Cecia, Cyran, Cryonaia, Evie, Eironn, Faramor, Florabelle, Granny Dahnie, Harak, Hewynn, Hodgkin, Hugin, Indris, Kazim, Lamentis, Lily May, Lumont, Nara, Phraesto, Rolan, Shadewing, Silven, Sinbad, Soren, Sylphira, Talene, Valen, Valka, Velara, Viperian, Zandrok, Zanie, Zorya`.

This is a **confirmed page-discovery list**, not yet a complete structured export of every ability row. The pages returned skill text and, where applicable, source mechanic tags. The remaining 86 roster IDs have not yet been individually confirmed in this pass. A missing search result is not evidence that a Stargazer page or hero is absent.

### Representative source pages captured in this pass

- Hugin: https://afkstargazer.com/en/skill/hugin
- Lily May: https://afkstargazer.com/en/skill/lily-may
- Ravion: https://afkstargazer.com/en/skill/ravion (previous spot-check; not in the 45-page search return set above)
- Hewynn: https://afkstargazer.com/en/skill/hewynn
- Rolan: https://afkstargazer.com/en/skill/rolan
- Callan: https://afkstargazer.com/en/skill/callan
- Hodgkin: https://afkstargazer.com/en/skill/hodgkin
- Lumont: https://afkstargazer.com/en/skill/lumont
- Atalanta: https://afkstargazer.com/en/skill/atalanta
- Cyran: https://afkstargazer.com/en/skill/cyran
- Faramor: https://afkstargazer.com/en/skill/faramor
- Kazim: https://afkstargazer.com/en/skill/kazim
- Nara: https://afkstargazer.com/en/skill/nara
- Antandra: https://afkstargazer.com/en/skill/antandra
- Eironn: https://afkstargazer.com/en/skill/eironn
- Phraesto: https://afkstargazer.com/en/skill/phraesto
- Athalia: https://afkstargazer.com/en/skill/athalia
- Viperian: https://afkstargazer.com/en/skill/viperian
- Valen: https://afkstargazer.com/en/skill/valen
- Talene: https://afkstargazer.com/en/skill/talene
- Baden: https://afkstargazer.com/en/skill/baden
- Cecia: https://afkstargazer.com/en/skill/cecia
- Granny Dahnie: https://afkstargazer.com/en/skill/granny-dahnie
- Velara: https://afkstargazer.com/en/skill/velara
- Temesia: https://afkstargazer.com/en/skill/temesia
- Evie: https://afkstargazer.com/en/skill/evie
- Lamentis: https://afkstargazer.com/en/skill/lamentis
- Valka: https://afkstargazer.com/en/skill/valka
- Aster: https://afkstargazer.com/en/skill/aster
- Indris: https://afkstargazer.com/en/skill/indris
- Soren: https://afkstargazer.com/en/skill/soren
- Florabelle: https://afkstargazer.com/en/skill/florabelle
- Harak: https://afkstargazer.com/en/skill/harak
- Zanie: https://afkstargazer.com/en/skill/zanie
- Shadewing: https://afkstargazer.com/en/skill/shadewing
- Zandrok: https://afkstargazer.com/en/skill/zandrok
- Silven: https://afkstargazer.com/en/skill/silven
- Sylphira: https://afkstargazer.com/en/skill/sylphira
- Brutus: https://afkstargazer.com/en/skill/brutus
- Aurora: https://afkstargazer.com/en/skill/aurora
- Alna: https://afkstargazer.com/en/skill/alna
- Zorya: https://afkstargazer.com/en/skill/zorya
- Sinbad: https://afkstargazer.com/en/skill/sinbad
- Bonnie: https://afkstargazer.com/en/skill/bonnie
- Alsa: https://afkstargazer.com/en/skill/alsa

### Important extraction details found

- Stargazer's skill page separates the ability tags from the ability text. Both must be captured.
- Some mechanics appear only on non-Ultimate skills, e.g. Hugin's `Energy Battery` is on `Mechanized Bond`.
- Some tags are qualified by scope/timing, e.g. `Temp Buff (Opening, Single Target)`, `Haste (Opening, AOE)`, `Debuff (Single Target, Global)`.
- Some relevant mechanics are present in skill text without a corresponding top-level tag in the snippets, so full ability text remains necessary.
- Pages include additional progression systems (Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode refinements). These must be stored separately from the base skill kit to avoid attributing upgrade-only effects to every copy of a hero.
- Current site-wide mechanic counts were observed as: Airborne 26, Cheat Death 18, Debuff 86, DoT 24, Energy Battery 12, Energy Denial 19, Execute 8, Haste 17, Heal Denial 7, Init Energy > 500 17, Invincibility 3, Special Target 19, Summon 18, Temp Buff 46, Tile Effect 9, Ult (Opening) 4, Ult Denial 9. These counts are volatile site aggregates, not counts of unique heroes or database records.

### Next extraction batch

Continue confirming the remaining 86 tracker IDs individually, then convert all confirmed pages into a normalized hero → ability → raw tag/evidence dataset. Do not mark a hero as `no_tags` until its full page has been inspected.


## 9. Expanded roster reconciliation pass

Further targeted searches confirmed Stargazer skill pages for the remaining records found in this pass, including:

`Aliceth, Arden, Berial, Bryon, Cassadee, Chippy, Contess, Damian, Dionel, Dunlingr, Elijah & Lailah, Estrilda, Frieren, Gerda, Gwyneth, Hammie, Hepler, Himmel, Isabella, Kafra, Karma, Kordan, Korin, Kulu, Laios, Lyca, Marene, Marilee, Mikola, Mirael, Natsu, Nazrik, Nerion, Niru, Odie, Orion, Pandora, Parisa, Peggy, Perseus, Pippa, Rhys, Rowan, Saida, Salazer, Satrana, Scarlita, Seth, Shemira, Shakir, Silvina, Smokey & Meerky, Solise, Sonja, Taichi & Agumon, Tasi, Thoran, Ulmus, Vala, Voracia, Walker, Yamato & Gabumon`.

Combining the initial and subsequent discovery passes gives **130 matched/confirmed Stargazer hero skill pages for 131 tracker roster rows**: 128 pages match tracker hero IDs directly, and two are documented identity aliases (`taichi` → `Taichi & Agumon`, `yamato` → `Yamato & Gabumon`). One tracker identity remains unresolved: ID `gala` (display name `Gala`). A search for `Gala` did not return a corresponding Stargazer skill page. Stargazer does have a separate `Galahad` page, but it must **not** be assumed to be the same hero or substituted for `Gala` without checking the actual game identity and tracker record.

### Alias / identity reconciliation flags

- Tracker ID `taichi` corresponds to Stargazer's `Taichi & Agumon` page (`taichi-agumon`).
- Tracker ID `yamato` corresponds to Stargazer's `Yamato & Gabumon` page (`yamato-gabumon`).
- Tracker ID `elijah-lailah` corresponds to the page slug `elijah-lailah`.
- `Galahad` is a distinct Stargazer page; do not silently map it to tracker ID `gala`.
- Several pages were returned in Polish or Indonesian locales by search, but the canonical English URLs are generally `/en/skill/{slug}`; keep source language recorded per capture.

### Current discovery status

- Tracker roster rows: **131** (Supabase read-only count).
- Individual Stargazer skill pages matched: **130**.
- Unresolved tracker identity: **Gala** (`gala`).
- Fully extracted and normalized ability/tag records: **not yet complete**. Page discovery does not mean every skill, upgrade branch, or tag has already been transcribed into structured records.
- No hero should be marked as having no tags until the full skill page and its ability sections have been checked.
- Next task: resolve the Gala identity against the tracker source data/game roster; then perform structured extraction of all 130 matched pages, preserving base abilities separately from Exclusive Equipment, Enhance Force, Season Charm, and Rivalry Mode refinements.


### Final identity count for this discovery pass

- **128** tracker IDs have a directly corresponding Stargazer hero slug.
- **2** tracker IDs are matched through the documented crossover naming aliases: `taichi` → `taichi-agumon`; `yamato` → `yamato-gabumon`.
- **1** tracker ID remains unresolved: `gala`. A separate `galahad` page exists, but it is not safe to treat that as the same hero.
- This accounts for all **131** tracker rows. The 130 page matches are discovery-level matches; they are not yet a normalized, fully transcribed ability dataset.


## 10. Correction: Gala identity and structured extraction progress (2026-11-25)

The previous unresolved identity note for tracker ID `gala` is superseded by the user's explicit confirmation: **tracker `gala` is Galahad**. The matching Stargazer source page is https://afkstargazer.com/en/skill/galahad. Do not retain the former unresolved status.

The discovery-level mapping is now:
- 128 direct tracker-ID → Stargazer slug matches;
- 2 documented crossover aliases: `taichi` → `taichi-agumon`; `yamato` → `yamato-gabumon`;
- 1 user-confirmed identity mapping: `gala` → `galahad`.

This resolves the full **131-row tracker roster mapping**. Keep tracker IDs canonical and store Stargazer slugs/display names as source aliases.

### Structured extraction artifacts committed on `development`

- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_01.md` — 15 hero records.
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_02.md` — 10 hero records.
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_03.md` — 10 hero records.

**Current extraction progress: 35/131 tracker heroes have a structured source record.**
- 20 records have sufficiently complete page captures for the current first-pass summary.
- 15 records are explicitly marked partial because search-indexed content was truncated or began mid-page; they require recapture before verification.
- This is not yet a normalized database import and does not mean all 35 records have been cross-checked against a second source.

The batch files preserve source tag labels and separate base abilities from Hero Focus, Exclusive Equipment, Enhance Force, Season Charm, and Rivalry Mode where the captured page exposes them. They also flag truncated pages rather than filling gaps from assumptions.

**No Supabase schema/data changes have been made.** These are documentation-only commits on `development`.


## 11. Structured extraction progress update (2026-11-25)

Fourth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_04.md` — 10 additional hero records.

**Updated structured extraction progress: 45/131 tracker heroes (34.4%).**
- 26 records have page captures sufficiently complete for the current first-pass summary.
- 19 records are explicitly partial and need page recapture before verification.
- These counts describe documentation coverage, not cross-source verification or database readiness.

The user's identity correction remains authoritative: `gala` → Galahad. The roster mapping is resolved at the identity-alias level; full ability transcription remains in progress.

**No Supabase schema/data changes have been made.** All four extraction batches and this audit update are documentation-only commits on `development`.


## 12. Structured extraction progress update (2026-11-25)

Fifth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_05.md` — 10 additional hero records.

**Updated structured extraction progress: 55/131 tracker heroes (42.0%).**
- 36 records have page captures sufficiently complete for the current first-pass summary.
- 19 records remain explicitly partial and need page recapture before verification.
- The remaining 76 tracker heroes have not yet been transcribed into the batch artifacts.

This is source transcription progress only. No second-source validation, patch-level review, or database import is implied.

**No Supabase schema/data changes have been made.** All five extraction batches and audit updates are documentation-only commits on `development`.


## 13. Structured extraction progress update (2026-11-25)

Sixth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_06.md` — 10 additional hero records.

**Updated structured extraction progress: 65/131 tracker heroes (49.6%).**
- 42 records have page captures sufficiently complete for the current first-pass summary.
- 23 records remain explicitly partial and need page recapture before verification.
- 66 tracker heroes remain to be transcribed into the extraction artifacts.

This is not second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All six extraction batches and audit updates are documentation-only commits on `development`.


## 14. Structured extraction progress update (2026-11-25)

Seventh extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_07.md` — 10 additional hero records.

**Updated structured extraction progress: 75/131 tracker heroes (57.3%).**
- 46 records have page captures sufficiently complete for the current first-pass summary.
- 29 records remain explicitly partial and need page recapture before verification.
- 56 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All seven extraction batches and audit updates are documentation-only commits on `development`.


## 15. Structured extraction progress update (2026-11-25)

Eighth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_08.md` — 10 additional hero records.

**Updated structured extraction progress: 85/131 tracker heroes (64.9%).**
- 50 records have page captures sufficiently complete for the current first-pass summary.
- 35 records remain explicitly partial and need page recapture before verification.
- 46 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All eight extraction batches and audit updates are documentation-only commits on `development`.


## 16. Structured extraction progress update (2026-11-25)

Ninth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_09.md` — 10 additional hero records.

**Updated structured extraction progress: 95/131 tracker heroes (72.5%).**
- 54 records have page captures sufficiently complete for the current first-pass summary.
- 41 records remain explicitly partial and need page recapture before verification.
- 36 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All nine extraction batches and audit updates are documentation-only commits on `development`.


## 17. Structured extraction progress update (2026-11-25)

Tenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_10.md` — 10 additional hero records.

**Updated structured extraction progress: 105/131 tracker heroes (80.2%).**
- 61 records have page captures sufficiently complete for the current first-pass summary.
- 44 records remain explicitly partial and need page recapture before verification.
- 26 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All ten extraction batches and audit updates are documentation-only commits on `development`.


## 18. Structured extraction progress update (2026-11-25)

Eleventh extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_11.md` — 10 additional hero records.

**Updated structured extraction progress: 115/131 tracker heroes (87.8%).**
- 69 records have page captures sufficiently complete for the current first-pass summary.
- 46 records remain explicitly partial and need page recapture before verification.
- 16 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All eleven extraction batches and audit updates are documentation-only commits on `development`.


## 19. Structured extraction progress update (2026-11-25)

Twelfth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_12.md` — 10 additional hero records.

**Updated structured extraction progress: 125/131 tracker heroes (95.4%).**
- 74 records have page captures sufficiently complete for the current first-pass summary.
- 51 records remain explicitly partial and need page recapture before verification.
- 6 tracker heroes remain to be transcribed into the extraction artifacts.

This is source transcription progress only; it does not imply second-source validation, patch verification, or database readiness.

**No Supabase schema/data changes have been made.** All twelve extraction batches and audit updates are documentation-only commits on `development`.


## 20. Tracker roster reconciliation and extraction completion (2026-11-25)

Thirteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_13.md` — the seven tracker IDs missing after the initial batch-to-roster comparison.

A read-only query of `public.ss_heroes` returned 131 tracker rows. Comparing IDs against all 13 extraction batches confirms:
- **131/131 tracker hero IDs now have a Stargazer page/source record.**
- `gala` → Galahad remains the user-confirmed mapping.
- `taichi` → Taichi & Agumon and `yamato` → Yamato & Gabumon remain documented source aliases.
- The batches also contain one extra source record, **Thane**, which is not a row in the current `ss_heroes` roster. It must not be counted as a tracker hero.
- **80/131 roster records** have captures sufficiently complete for the current first-pass summary.
- **51/131 roster records** remain explicitly partial and need source-page recapture before verification.

This closes *roster coverage*, not complete transcription/verification. In particular, a partial record is not a complete skill kit, and a first-pass summary is not yet patch-verified or cross-checked against a second source.

All 13 extraction batches are documentation-only on `development`. **No Supabase schema or data was modified.**



## 21. Partial-profile recapture pass 1 (2026-11-25)

Fourteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_14.md` — recaptured source material for previously partial profiles.

Three tracker profiles now have sufficiently complete first-pass captures and are upgraded from `partial`:
- `koko` — complete base abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm, Rivalry Mode.
- `smokey-meerky` — complete base abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm, Rivalry Mode.
- `fay` — complete base abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm, Rivalry Mode.

Ten additional page recaptures supplied useful missing sections for Rolan, Callan, Hodgkin, Atalanta, Cryonaia, Faramor, Baden, Phraesto, Nara, and Valen. They remain marked partial because at least one required base-skill or progression section is still missing from the captured source excerpt. Do not count these as complete profiles yet.

**Updated first-pass capture coverage: 83/131 complete (63.4%); 48/131 partial (36.6%).** This is a source-capture completeness count only. It does not mean the 83 complete profiles are cross-checked against AFK.global, verified against an in-game patch, or ready for database import.

Source retrieval note: direct page opens returned cache misses in this pass, so recapture relied on indexed Stargazer page content. Search excerpts were treated conservatively; no missing skill sections were reconstructed from memory or inference.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 22. Partial-profile recapture pass 2 (2026-11-25)

Fifteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_15.md` — second recapture pass across previously partial pages.

Pang (`pang`) is upgraded to a complete first-pass capture. The returned source included the Ultimate, Zen Ward, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode sections.

Nine more pages yielded useful recaptured sections but remain partial because at least one required section is still absent from the returned source excerpt:
- Evie, Aster, Soren, Florabelle, Zandrok, Sylphira, Brutus, Alna, Lorsan.

**Updated first-pass capture coverage: 84/131 complete (64.1%); 47/131 partial (35.9%).** This remains a source-capture metric only; no second-source verification, in-game patch validation, or database readiness is implied.

All changes are documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 23. Partial-profile recapture pass 3 (2026-11-25)

Sixteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_16.md` — third recapture pass.

Three tracker profiles upgraded to complete first-pass captures:
- `lucius`
- `lucca`
- `gunnar`

Seven additional profiles yielded useful missing sections but remain partial:
- `contess`, `gwyneth`, `saida`, `laios`, `pippa`, `himmel`, `kruger`.

**Updated first-pass capture coverage: 87/131 complete (66.4%); 44/131 partial (33.6%).** This is only a source-capture completeness measure. It does not imply second-source cross-check, patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 24. Partial-profile recapture pass 4 (2026-11-25)

Seventeenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_17.md` — fourth recapture pass.

Five tracker profiles upgraded to complete first-pass captures:
- `seth`
- `karma`
- `silvina`
- `natsu`
- `rhys`

Four further pages supplied useful missing sections but remain partial:
- `berial`, `thoran`, `orion`, `walker`.

**Updated first-pass capture coverage: 92/131 complete (70.2%); 39/131 partial (29.8%).** This is a source-capture completeness metric only; no second-source cross-check, in-game patch verification, or database readiness is implied.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 25. Partial-profile recapture pass 5 (2026-11-25)

Eighteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_18.md` — fifth recapture pass.

Three tracker profiles upgraded to complete first-pass captures:
- `solise`
- `marcille`
- `elijah-lailah`

Additional source details were captured for Voracia, Igor, Marilee, Aster and Pandora. Valka was also rechecked as a cross-reference, but was not part of the outstanding partial-profile count. The profiles not fully recaptured remain partial.

**Updated first-pass capture coverage: 95/131 complete (72.5%); 36/131 partial (27.5%).** This is a source-capture metric only; it does not imply second-source validation, in-game patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 26. Partial-profile recapture pass 6 (2026-11-25)

Nineteenth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_19.md` — sixth recapture pass.

Nine tracker profiles upgraded to complete first-pass captures:
- `evie`, `lamentis`, `aster`, `soren`, `florabelle`, `zandrok`, `brutus`, `alna`, `lorsan`.

Sylphira gained its Hero Focus, Exclusive Equipment, Enhance Force and Season Charm details, but remains partial because the returned source excerpt still omits required base-skill and/or Rivalry Mode detail.

**Updated first-pass capture coverage: 104/131 complete (79.4%); 27/131 partial (20.6%).** This is source-capture completeness only. It does not imply second-source cross-check, in-game patch validation, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 27. Partial-profile recapture pass 7 (2026-11-25)

Twentieth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_20.md` — seventh recapture pass.

Six tracker profiles upgraded to complete first-pass captures:
- `rolan`, `faramor`, `callan`, `hodgkin`, `nara`, `cryonaia`.

Four additional profiles gained substantial source details but remain partial:
- `atalanta`, `baden`, `phraesto`, `valen`.

**Updated first-pass capture coverage: 110/131 complete (84.0%); 21/131 partial (16.0%).** This is source-capture completeness only. It does not imply second-source validation, in-game patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 28. Partial-profile recapture pass 8 (2026-11-25)

Twenty-first extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_21.md` — eighth recapture pass.

Nine tracker profiles upgraded to complete first-pass captures:
- `voracia`, `igor`, `kruger`, `contess`, `walker`, `gwyneth`, `orion`, `marilee`, `himmel`.

**Updated first-pass capture coverage: 119/131 complete (90.8%); 12/131 partial (9.2%).** This is a source-capture completeness measure only. It does not imply second-source cross-check, in-game patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 29. Partial-profile recapture pass 9 (2026-11-25)

Twenty-second extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_22.md` — ninth recapture pass.

Five tracker profiles upgraded to complete first-pass captures:
- `atalanta`, `phraesto`, `thoran`, `pandora`, `pippa`.

Baden and Saida gained further progression details but remain partial because the full base ability set is still not present in the captured source material.

**Updated first-pass capture coverage: 124/131 complete (94.7%); 7/131 partial (5.3%).** The remaining tracker profiles requiring recapture are Baden, Valen, Sylphira, Laios, Saida, Berial and Perseus. The extra Thane source page is outside the 131-row tracker roster and is not included in the percentage.

This is source-capture completeness only. It does not imply second-source validation, in-game patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 30. Partial-profile recapture pass 10 (2026-11-25)

Twenty-third extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_23.md` — tenth recapture pass.

Four tracker profiles upgraded to complete first-pass captures:
- `valen`, `sylphira`, `berial`, `laios`.

Baden, Saida and Perseus gained additional source details but remain partial because the full base ability set (and for Perseus, other core sections) is still not present in the captured source material.

**Updated first-pass capture coverage: 128/131 complete (97.7%); 3/131 partial (2.3%).** The only tracker IDs still marked partial are Baden (`baden`), Saida (`saida`) and Perseus (`perseus`). Thane remains an extra source page outside the 131-row tracker roster.

This is source-capture completeness only. It does not imply second-source validation, in-game patch verification, or database readiness.

All changes remain documentation-only on `development`. **No Supabase schema/data, Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**


## 31. First-pass roster source capture completed (2026-11-25)

Twenty-fourth extraction artifact committed:
- `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_24.md` — final recapture for Baden, Saida and Perseus.

All three remaining tracker profiles have been upgraded from partial to complete first-pass captures:
- `baden`
- `saida`
- `perseus`

**First-pass source capture: 131/131 tracker heroes complete (100%); 0 partial tracker profiles remain.** The extra Thane page is retained as an out-of-roster source record and excluded from the tracker coverage denominator.

Important scope distinction:
- Complete first-pass source capture means the available Stargazer page sections have been captured and summarized into the extraction artifacts.
- It does **not** mean a normalized hero → ability → tag dataset has been generated.
- It does **not** mean every value has been independently cross-checked against AFK.global, official patch notes or the live game.
- It does **not** imply a specific patch version has been verified.
- No Supabase schema/data changes have been made.

All 24 extraction batches and this audit update are documentation-only commits on `development`. **No Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks code was changed.**

### Next phase gate

Before database import:
1. Normalize the 131 hero profiles into machine-readable hero, ability, tag and source-evidence records.
2. Preserve exact Stargazer tag strings and qualifiers at ability level.
3. Keep baseline abilities separate from Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode.
4. Record retrieval timestamp, source URL, language and any patch/version evidence.
5. Cross-check a prioritized sample against AFK.global and official patch notes; record conflicts instead of silently reconciling them.
6. Review the schema proposal and coverage report before any Supabase migration or import.


## 32. Normalization model proposal (2026-11-25)

Added:
- `docs/HERO_KNOWLEDGE_NORMALIZATION_SPEC.md`

The proposal defines separate logical entities for hero knowledge versions, source provenance, ability sections, ability-level effect tags and claim-level evidence. It also specifies:
- exact raw Stargazer tag preservation with qualifiers;
- separate base abilities and progression sections;
- explicit unknown/null handling;
- source/patch/version metadata and review states;
- a 131-hero roster validation gate;
- a no-write normalization workflow before any database import.

**This is a proposal only.** No Supabase schema migration, data import or frontend integration has been performed. The next implementation artifact should be a machine-readable source manifest and then a normalized dry-run dataset with structural validation, not a direct production import.
