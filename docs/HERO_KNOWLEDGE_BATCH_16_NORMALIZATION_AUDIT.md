# Hero Knowledge — Batch 16 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_16.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_16.json`

## Complete profiles

Lucius, Lucca and Gunnar.

| Measure | Result |
|---|---:|
| Complete profiles | 3 |
| Sections | 24 |
| Sections with explicit per-section tags | 7 |
| Raw per-section tag records | 10 |
| Page-level tag records | 3 |

## Partial recaptures preserved separately

Contess, Gwyneth, Saida, Laios, Pippa, Himmel and Kruger remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 7 |
| Supplemental sections | 24 |
| Sections with explicit per-section tags | 9 |
| Raw per-section tag records | 12 |
| Page-level tag records | 17 |

Partial-status notes are retained; no incomplete profile was promoted to complete.

## Mapping notes

- Gunnar's four per-skill mappings are preserved as explicit section-level tags, including multiple tags on Ultimate and Enhance Force.
- Inline tags for Lucius, Lucca and partial profiles are attached only to the named section.
- Page-level tags are kept separate and are not copied to abilities.
- Profiles without a page-tag line retain `page_tags: null`.

## Validation

- All source URLs match the manifest.
- No unmatched per-skill mappings, duplicate section keys or missing summaries.
- All explicit tag qualifiers are retained.
- `description_raw` remains null; summaries are marked as paraphrased.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 16 only. It does not merge prior captures into final hero records, verify live source pages, establish patch currency or provide second-source validation.
