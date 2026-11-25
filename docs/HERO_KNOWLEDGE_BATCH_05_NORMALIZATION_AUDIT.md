# Hero Knowledge — Batch 05 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_05.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_05.json`

## Completed profiles

Sinbad, Bonnie, Alsa, Marene, Eryndor, Lucy, Scarlita, Senea and Baelran.

| Measure | Result |
|---|---:|
| Completed profiles | 9 |
| Sections | 71 |
| Sections with explicit per-skill tags | 27 |
| Raw per-skill tag records | 33 |
| Page-level tag records | 26 |

## Partial profile preserved separately

Reinier remains partial because the extraction does not expose Enhance Force or Season Charm.

| Measure | Result |
|---|---:|
| Partial profiles | 1 |
| Supplemental sections, including targeting metadata | 7 |
| Sections with explicit per-skill tags | 4 |
| Raw per-skill tag records | 6 |
| Page-level tag records | 4 |

Reinier's Dynamic Balance hex-pair tie-break rules are retained as a separate targeting record, not folded into the ability description.

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags are not copied onto abilities.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 05's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
