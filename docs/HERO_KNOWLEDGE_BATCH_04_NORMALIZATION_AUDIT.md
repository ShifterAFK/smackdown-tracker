# Hero Knowledge — Batch 04 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_04.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_04.json`

## Completed profiles

Harak, Zanie, Silven, Shadewing, Aurora and Zorya.

| Measure | Result |
|---|---:|
| Completed profiles | 6 |
| Sections | 45 |
| Sections with explicit per-skill tags | 13 |
| Raw per-skill tag records | 17 |
| Page-level tag records | 15 |

Zanie's unusual Precision Overload cooldown formatting is preserved as a source note; no numeric cooldown is inferred.

## Partial profiles preserved separately

Zandrok, Sylphira, Brutus and Alna remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 4 |
| Supplemental sections | 14 |
| Sections with explicit per-skill tags | 7 |
| Raw per-skill tag records | 9 |
| Page-level tag records | 6 |

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags remain separate.
- Sylphira and Alna have no page-level tags visible in the excerpt; their tag state remains unknown, not an empty array.
- Partial profiles are not promoted to complete; missing abilities are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 04's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
