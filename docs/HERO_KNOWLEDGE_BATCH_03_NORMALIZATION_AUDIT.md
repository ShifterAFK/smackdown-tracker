# Hero Knowledge — Batch 03 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_03.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_03.json`

## Completed profiles

Velara and Temesia.

| Measure | Result |
|---|---:|
| Completed profiles | 2 |
| Sections | 16 |
| Sections with explicit per-skill tags | 6 |
| Raw per-skill tag records | 6 |
| Page-level tag records | 4 |

## Partial recaptures preserved separately

Granny Dahnie, Evie, Lamentis, Valka, Aster, Indris, Soren and Florabelle remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 8 |
| Supplemental sections | 31 |
| Sections with explicit per-skill tags | 11 |
| Raw per-skill tag records | 15 |
| Page-level tag records | 9 |

Granny Dahnie, Valka and Indris are kept partial despite the generic “Core page captured” index status because their detailed captures explicitly omit progression or kit sections.

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill mappings are attached only to named sections; page-level tags are not copied onto abilities.
- Partial profiles are not promoted to complete; missing abilities are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 03's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
