# Consolidated Hero Knowledge Dry Run — Stage 2AC6

**Status:** completed — structural and section-type reconciliation passed; direct-source/patch review pending  
**Canonical index:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`  
**Validation:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`  
**Current shards:** `HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_V3_PART_01.json` through `PART_04.json`

Batch 25 and Batch 26 are merged. Nine same-name `base_skill`/ `ultimate` duplicates were reconciled into the Ultimate section after checking the current indexed AFK Stargazer page. The duplicate base-skill evidence was not discarded; its summaries, source keys, tags and provenance are retained on the Ultimate record.

| Measure | Result |
|---|---:|
| Tracker heroes | 131 / 131 |
| Missing / unexpected IDs | 0 / 0 |
| Capture records | 236 |
| Complete / historical partial capture records | 132 / 104 |
| Normalized-complete profiles | 131 |
| Open section-capture gaps | 0 |
| Profiles pending direct page fetch | 20 |
| Profiles pending patch verification | 131 |
| Verified page-level absence profiles | 2 (Hammie, Chippy) |
| Secondary-source profiles cross-checked | 5 |
| Separate AFK.global Season Skill observations | 3 |
| Section evidence records | 1,321 |
| Unique logical sections after semantic reconciliation | 1,031 |
| Sections with consistent explicit tags | 299 |
| Sections with unknown per-section tags | 732 |
| Tag conflicts | 0 |
| Sections with multiple paraphrased summary variants | 220 |
| Same-name section-type conflicts unresolved | 0 |
| Profiles with section-type reconciliation | 9 |
| Profiles with content-variant review flag | 1 (Contess) |
| Source/locale/provenance mismatches | 0 |

## Semantic reconciliation

Current indexed primary pages explicitly label these abilities as Ultimates and list other base skills separately: Atalanta / Wild Sniper, Berial / Scared Swamp, Contess / Detention Pass, Igor / Funereal Ring, Marilee / Mid-Air Shot, Orion / Fatal Waltz, Thoran / Soul Retaliation, Valka / Blooming Terror and Voracia / The Main Course.

The base-skill capture evidence is merged into the corresponding Ultimate section. For Contess, Batch 26's current page summary is surfaced; older Batch 16/21 descriptions containing an additional active effect remain preserved as historical variants pending direct-page/version verification.

## Data interpretation

- All 131 profiles have normalized source records and no open section-capture gaps.
- Twenty profiles still need direct page fetch because the latest capture used indexed page content after direct page opens returned cache misses.
- Patch/season applicability has not been verified for any of the 131 profiles.
- AFK.global Focus Hit, Lock-on Projectiles and Soul-lifting Touch remain secondary-source `season_skill` observations; they are not substituted for Stargazer `season_charm`.
- 732 sections have unknown per-section tags. Unknown is not an empty tag set.
- Page-level tags remain separate from ability-level tags.
- Thane remains outside the tracker roster.

## Exit decision

**Stage 2AC6 — consolidated V3 dry run: PASS for roster, structure, provenance, tags and section-type reconciliation.**  
**Not ready for Supabase import:** direct-page verification, patch/season validation and Contess's historical content variant review remain outstanding.


## Patch baseline — 2026-11-25

Reference baseline: app-store build 1.8.2.1 (Nov 9); latest published patch notes 1.8.2 (Oct 28). Version 1.8.3 is preview-only in the checked source and has no confirmed release date. See `docs/HERO_KNOWLEDGE_PATCH_BASELINE.md`.

This does not prove that each AFK Stargazer page reflects 1.8.2.1. All 131 profiles remain pending per-hero patch verification; 20 indexed-only profiles also remain pending direct page fetch. Keep `source_patch_label` null until verified.
