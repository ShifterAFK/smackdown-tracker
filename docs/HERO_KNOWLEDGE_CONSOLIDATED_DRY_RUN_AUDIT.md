# Consolidated Hero Knowledge Dry Run — Stage 2AC3

**Status:** completed — structural validation passed; direct-source/patch review pending  
**Canonical index:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`  
**Validation:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`  
**Current shards:** `HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V2_PART_01.json` through `PART_04.json`

Batch 25 has been merged into the consolidated dataset. The previous V1 shards are superseded; the index points only to V2.

| Measure | Result |
|---|---:|
| Tracker heroes | 131 / 131 |
| Missing / unexpected IDs | 0 / 0 |
| Capture records | 235 |
| Complete / historical partial capture records | 131 / 104 |
| Normalized-complete profiles | 131 |
| Profiles with open section gaps | 0 |
| Profiles pending direct page fetch / patch verification | 12 |
| Verified page-level absence profiles | 2 (Hammie, Chippy) |
| Secondary-source profiles cross-checked | 5 |
| Separate AFK.global Season Skill observations | 3 |
| Section evidence records | 1,320 |
| Unique logical sections after merge | 1,040 |
| Sections with consistent explicit tags | 300 |
| Sections with unknown per-section tags | 740 |
| Tag conflicts | 0 |
| Sections with multiple paraphrased summary variants | 217 |
| Source/locale/provenance mismatches | 0 |

## Important interpretation

All 131 profiles now have normalized source records and no open section-capture gaps. Twelve Batch 25 profiles still require direct page fetch and patch verification because only indexed primary-source content was available in this pass. They are normalized-complete at the capture level, but not yet patch-verified.

AFK.global's Focus Hit, Lock-on Projectiles and Soul-lifting Touch are kept as secondary-source Season Skill observations. They are not substituted for Stargazer Season Charm sections.

## Merge and validation rules

- Logical section key: `hero_id + section_type + normalized section name`.
- Repeated captures merge into one logical section while all source evidence/order observations remain.
- Different paraphrased summaries remain as variants; the latest capture is surfaced as a convenience summary.
- Explicit tags merge only if raw tag sets agree; conflicts remain visible.
- Null tags remain unknown; they are never converted to empty sets.
- Page-level tags remain separate from per-section tags.
- Verified absence on a page is stored as a profile-level observation, not an invented empty ability.
- Thane remains outside the 131 tracker heroes.

## Exit decision

**Stage 2AC3 — consolidated dry run: PASS for structure and source provenance.**  
**Not ready for Supabase import:** direct-page and patch verification remain outstanding, and the descriptions are paraphrased rather than verbatim.
