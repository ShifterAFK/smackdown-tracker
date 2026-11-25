# Hero Knowledge — Batch 15 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_15.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_15.json`

## Completed profile

Pang is explicitly upgraded to a complete first-pass capture in Batch 15, combined with the earlier Batch 6 record.

| Measure | Result |
|---|---:|
| Completed profiles | 1 |
| New sections captured in Batch 15 | 7 |
| Sections with explicit per-skill tags | 3 |
| Raw per-skill tag records | 3 |
| Page-level tag records | 0 |

## Partial recaptures preserved separately

Evie, Aster, Soren, Florabelle, Zandrok, Sylphira, Brutus, Alna and Lorsan remain partial; their Batch 15 details are stored only in `partial_recapture_supplements`.

| Measure | Result |
|---|---:|
| Partial profiles | 9 |
| Supplemental sections | 30 |
| Sections with explicit per-skill tags | 16 |
| Raw per-skill tag records | 25 |
| Page-level tag records | 6 |

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Pang's three explicit per-skill tags are attached only to Sky Splitter, Spirit Sync and Season Charm.
- Evie's four explicit mappings, Florabelle's two mappings, Zandrok's two mappings, Sylphira's Ultimate mappings, Brutus's two mappings, Alna's three mappings and Lorsan's two mapped sections remain attached to the named abilities.
- Page-level tags for Aster, Soren and Sylphira are retained separately and not copied onto abilities.
- Partial-status notes are retained; no incomplete profile is promoted to complete.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 15's new capture details and prior-batch references. It does not merge earlier sections into a single canonical hero record, verify live pages, establish patch currency or provide second-source validation.
