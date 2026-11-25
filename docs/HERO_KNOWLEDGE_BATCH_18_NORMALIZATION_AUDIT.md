# Hero Knowledge — Batch 18 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_18.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_18.json`

## Complete profiles

Solise, Marcille and Elijah & Lailah.

| Measure | Result |
|---|---:|
| Complete profiles | 3 |
| Sections | 24 |
| Sections with explicit per-skill tags | 7 |
| Raw per-section tag records | 9 |
| Page-level tag records | 1 (Marcille) |

## Partial recaptures preserved separately

Voracia, Igor, Marilee, Valka, Aster and Pandora remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 6 |
| Supplemental sections | 21 |
| Sections with explicit per-skill tags | 5 |
| Raw per-section tag records | 11 |
| Page-level tag records | 7 |

Partial-status notes are preserved. No partial profile was promoted to complete.

## Mapping and validation notes

- Elijah & Lailah's five per-skill mappings were retained, including mappings not repeated in the paraphrased section summary.
- Marcille's visible ability tag is attached only to Exclusive Equipment — Ancient Magic; the same label remains separately in page-level tags.
- Solise's Season Charm tag and partial-profile tags are retained from explicit inline labels.
- Page-level tags are not copied to abilities.
- All source URLs match the source manifest.
- No duplicate section keys, missing summaries or tag-mapping conflicts.
- `description_raw` remains null; all summaries are marked as paraphrased.
- No Supabase writes or application code changes.

## Limits

This artifact records Batch 18 captures only. It does not merge prior batches into one final hero record, verify live pages, establish patch currency or provide second-source validation.
