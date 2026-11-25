# Consolidated Hero Knowledge Dry Run — Stage 2AB4

**Status:** completed — structural validation passed  
**Index:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`  
**Validation:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`

The full dataset is split into four JSON shards so each remains directly retrievable and reviewable. The index is the canonical entry point; read all four shards for the full dataset.

| Measure | Result |
|---|---:|
| Tracker heroes | 131 / 131 |
| Missing / unexpected IDs | 0 / 0 |
| Capture records | 223 |
| Complete / partial capture records | 119 / 104 |
| Normalized complete profiles | 119 |
| Profiles needing review | 12 |
| Section evidence records | 1298 |
| Unique logical sections after merge | 1019 |
| Sections with consistent explicit tags | 300 |
| Sections with unknown tags | 719 |
| Tag conflicts | 0 |
| Sections with multiple paraphrase variants | 216 |
| Source/locale/provenance mismatches | 0 |

## Merge rules

- Logical section key is `hero_id + section_type + normalized section name`.
- Repeated captures of the same ability are merged; all source evidence and order observations are preserved.
- Different paraphrase summaries are retained as variants; the latest capture is surfaced as the convenience summary.
- Explicit tags are merged only when their raw tag sets agree. Conflicts are retained as conflicts, not silently reconciled.
- Null tags remain unknown; they are never converted to an empty tag list.
- Page tags are stored as an observed union with per-capture observations.
- The 12 gap-register profiles remain `needs_review`.
- Thane is retained outside the 131 tracker heroes.

## Validation result

All 131 tracker IDs are present exactly once in the consolidated profile list. No unexpected IDs, source URL/locale mismatches, section provenance mismatches, missing summaries, duplicate logical section keys within a hero, or conflicting explicit tag sets were found.

This is a dry-run dataset only. No Supabase schema/data writes, app changes, or production-branch changes were made.
