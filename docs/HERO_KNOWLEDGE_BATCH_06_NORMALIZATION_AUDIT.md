# Hero Knowledge — Batch 06 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_06.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_06.json`

## Completed profiles

Ulmus, Tilaya and Thador.

| Measure | Result |
|---|---:|
| Completed profiles | 3 |
| Sections | 24 |
| Sections with explicit per-skill tags | 5 |
| Raw per-skill tag records | 6 |
| Page-level tag records | 3 |

## Partial profiles preserved separately

Koko, Lorsan, Satrana, Fay, Nerion, Mehira and Pang remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 7 |
| Supplemental sections | 32 |
| Sections with explicit per-skill tags | 12 |
| Raw per-skill tag records | 18 |
| Page-level tag records | 12 |
| Unstructured detail notes | 1 |

Satrana, Nerion and Mehira remain partial because the capture notes identify missing progression sections or an unheaded base-skill section, despite their generic “Core page captured” index status. Nerion's unheaded section is preserved as an unstructured note, not invented as an ability.

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags are not copied onto abilities.
- Partial profiles are not promoted to complete; missing abilities are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 06's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
