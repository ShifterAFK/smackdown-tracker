# Consolidated Hero Knowledge Dry Run — Stage 2AD3

**Status:** completed — structure, tags, source provenance and section semantics reconciled; direct-source/patch review pending  
**Canonical index:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`  
**Validation:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`  
**Current shards:** `HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V4_PART_01.json` through `PART_04.json`

Batch 27 corrected Contess's section assignment. The effect previously included under Detention Pass in Batches 16/21 is the active effect of the separate base skill **Mandatory Civility**. Batch 27 now captures all eight Contess sections, their visible per-section tags and parameters, and reassigns the historical evidence. The current Detention Pass description is kept separate.

Nine same-name `base_skill`/ `ultimate` duplicates have been reconciled. All duplicate evidence remains preserved under the primary-page-confirmed Ultimate section.

| Measure | Result |
|---|---:|
| Tracker heroes | 131 / 131 |
| Missing / unexpected IDs | 0 / 0 |
| Capture records | 237 |
| Complete / historical partial capture records | 133 / 104 |
| Normalized-complete profiles | 131 |
| Open section-capture gaps | 0 |
| Profiles pending direct page fetch | 20 |
| Profiles pending patch verification | 131 |
| Profiles pending secondary-source review | 126 |
| Verified page-level absence profiles | 2 (Hammie, Chippy) |
| Secondary-source profiles cross-checked | 5 |
| Separate AFK.global Season Skill observations | 3 |
| Section evidence records | 1,329 |
| Unique logical sections | 1,032 |
| Sections with consistent explicit tags | 301 |
| Sections with unknown per-section tags | 731 |
| Tag conflicts | 0 |
| Sections with multiple paraphrased summary variants | 223 |
| Same-name section-type conflicts unresolved | 0 |
| Profiles with section-type reconciliation | 9 |
| Unresolved content-variant flags | 0 |
| Source/locale/provenance mismatches | 0 |

## Contess correction

The old Batch 16/21 Detention Pass summary contained two effects. The current indexed Stargazer page identifies the second effect as **Mandatory Civility**, a separate base skill. Batch 27 records Mandatory Civility with its own cooldown, range and `Debuff (Single Target)` tag, and assigns the earlier evidence to that section. The Ultimate retains only its own passive/active effect.

## Data interpretation and remaining limits

- All 131 profiles have normalized source records and no open section-capture gaps.
- Twenty profiles still require direct page fetch; the latest captures used indexed page content after direct opens returned cache misses.
- Patch/season applicability is not verified for any profile. Reference baseline: app-store build 1.8.2.1; latest patch notes 1.8.2; 1.8.3 preview only.
- Five profiles have AFK.global cross-checks. Three Season Skill observations remain separate from Stargazer Season Charm.
- 731 sections have unknown per-section tags. Unknown is not an empty tag set.
- Page-level tags remain separate from ability-level tags.
- Thane remains outside the tracker roster.

## Exit decision

**Stage 2AD3 — consolidated V4 dry run: PASS for structure, tag consistency, provenance and section-type reconciliation.**  
**Not ready for Supabase import:** direct-page verification, per-hero patch verification and broader secondary-source comparison remain outstanding.
