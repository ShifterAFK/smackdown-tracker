# Hero Knowledge — Batch 07 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_07.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_07.json`

## Complete profiles

Nazrik, Parisa, Shemira and Ludovic.

| Measure | Result |
|---|---:|
| Complete profiles | 4 |
| Sections | 31 |
| Sections with explicit per-section tags | 6 |
| Raw per-section tag records | 6 |
| Page-level tag records | 5 |

## Partial recaptures preserved separately

Voracia, Solise, Marcille, Thoran, Walker and Igor remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 6 |
| Supplemental sections | 22 |
| Sections with explicit per-section tags | 4 |
| Raw per-section tag records | 5 |
| Page-level tag records | 9 |
| Unstructured detail notes | 1 |

## Mapping and quality notes

- Inline tags are attached only to the captured ability section where they appear.
- Page-level tags are retained separately and are not copied onto abilities.
- Solise, Marcille and Walker have excerpts where page-level tags are not visible; their `page_tags` values remain null.
- Marcille's revived-ally detail is preserved as an unstructured note because the excerpt does not identify the ability heading.
- Partial profiles are not promoted to complete; missing sections are not inferred.

## Validation

- All source URLs match the manifest.
- No duplicate section keys or missing summaries.
- Explicit tag qualifiers are retained verbatim.
- `description_raw` remains null; summaries are marked as paraphrased.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 07 only. It does not merge earlier recaptures into final hero records, verify live source pages, establish patch currency or provide second-source validation.
