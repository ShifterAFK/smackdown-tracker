# Hero Knowledge — Batch 09 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_09.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_09.json`

## Completed profiles

Dionel, Salazer, Mirael and Niru.

| Measure | Result |
|---|---:|
| Completed profiles | 4 |
| Ability/progression sections | 31 |
| Sections with explicit per-skill tags | 6 |
| Raw per-skill tag records | 8 |
| Page-level tag records kept separately | 4 |

Niru's source page documents targeting rules, but this extraction batch does not transcribe their exact values. That requirement is preserved in source notes and not fabricated into a targeting record.

## Partial profiles preserved separately

Saida, Contess, Pippa, Himmel, Marilee and Elijah & Lailah remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 6 |
| Supplemental sections | 19 |
| Sections with explicit per-skill tags | 4 |
| Raw per-skill tag records | 6 |
| Page-level tag records kept separately | 11 |

Himmel's Blue-Moon Blessings details are retained as a source note because the extraction does not establish a reliable section heading/mapping. They are not invented as a new ability.

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags remain separate.
- Partial profiles are not promoted to complete; missing abilities are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 09's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
