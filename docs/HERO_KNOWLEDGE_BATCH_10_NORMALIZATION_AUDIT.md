# Hero Knowledge — Batch 10 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_10.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_10.json`

## Completed profiles

Rowan, Lyca, Mikola, Korin, Hepler, Odie and Aliceth.

| Measure | Result |
|---|---:|
| Completed profiles | 7 |
| Ability/progression sections | 56 |
| Sections with explicit per-skill tags | 21 |
| Raw per-skill tag records | 26 |
| Page-level tag records kept separately | 12 |

Hepler's source locale is Polish (`pl`). The batch supplies English paraphrased summaries only; raw Polish descriptions are not fabricated or marked as verbatim.

## Partial profiles preserved separately

Rhys, Pandora and Karma remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 3 |
| Supplemental sections | 13 |
| Sections with explicit per-skill tags | 2 |
| Raw per-skill tag records | 6 |
| Page-level tag records kept separately | 1 |

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags are not copied onto abilities.
- Rhys, Pandora and Karma remain partial; missing sections are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 10's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
