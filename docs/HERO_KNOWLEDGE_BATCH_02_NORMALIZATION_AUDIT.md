# Hero Knowledge — Batch 02 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_02.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_02.json`

## Completed profiles

Antandra, Eironn, Viperian and Athalia.

| Measure | Result |
|---|---:|
| Completed profiles | 4 |
| Sections | 32 |
| Sections with explicit per-skill tags | 8 |
| Raw per-skill tag records | 9 |
| Page-level tag records | 10 |

## Partial profiles preserved separately

Talene, Baden, Phraesto, Cecia, Nara and Valen remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 6 |
| Supplemental sections | 19 |
| Sections with explicit per-skill tags | 7 |
| Raw per-skill tag records | 12 |
| Page-level tag records | 22 |

Talene remains partial because the excerpt does not show a separate Rivalry Mode section. Cecia remains partial because Earth's Offering is only partially described. No missing section is assumed absent or fabricated.

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

This artifact normalizes Batch 02's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
