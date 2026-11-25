# Hero Knowledge — Batch 12 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_12.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_12.json`

## Completed profiles

Arden, Carolina, Dunlingr, Cassadee and Kulu.

| Measure | Result |
|---|---:|
| Completed profiles | 5 |
| Ability/progression/targeting sections | 39 |
| Sections with explicit per-skill tags | 14 |
| Raw per-skill tag records | 18 |
| Page-level tag records kept separately | 9 |

Dunlingr's farthest-teammate selection and Cassadee's ally-selection rule are preserved as separate `targeting_rule` sections.

## Partial profiles preserved separately

Silvina, Seth, Orion and Natsu remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 4 |
| Supplemental sections | 14 |
| Sections with explicit per-skill tags | 4 |
| Raw per-skill tag records | 5 |
| Page-level tag records kept separately | 3 |

## Out-of-roster source retained separately

Thane is preserved under `out_of_roster_sources`, not as a tracker hero and not in the complete/partial roster profile counts.

- Source locale: Indonesian (`id`).
- 4 captured sections, 1 explicitly tagged section, 1 per-skill tag record and 2 page-level tag records.
- The extraction batch provides English paraphrased summaries but not the raw Indonesian text or a separate translation field; no verbatim text is claimed.
- Thane remains `out_of_roster_not_importable`.

## Mapping and validation notes

- All 9 in-roster IDs exist in the 131-hero source manifest.
- All in-roster source URLs and locales match the manifest.
- Per-skill mappings are attached only to named abilities; page-level tags are not copied onto abilities.
- Silvina, Seth, Orion and Natsu remain partial; missing sections are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 12's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
