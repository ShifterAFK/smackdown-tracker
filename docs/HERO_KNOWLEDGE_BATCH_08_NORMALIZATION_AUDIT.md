# Hero Knowledge — Batch 08 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_08.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_08.json`

## Complete profiles

Lenya, Damian and Kafra.

| Measure | Result |
|---|---:|
| Complete profiles | 3 |
| Sections | 24 |
| Sections with explicit per-section tags | 5 |
| Raw per-section tag records | 6 |
| Page-level tag records | 5 |

## Partial recaptures preserved separately

Lucca, Kruger, Lucius, Gunnar, Gwyneth, Hammie and Laios remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 7 |
| Supplemental sections | 30 |
| Sections with explicit per-section tags | 6 |
| Raw per-section tag records | 9 |
| Page-level tag records | 9 |
| Unstructured detail notes | 1 |

## Mapping and quality notes

- Gunnar's Ultimate and Absolute Defense tags, and Gwyneth's Fulgur Arrow and Exclusive Equipment tags, are mapped from the explicit per-skill list.
- Damian's and Kafra's inline tags are attached only to the named abilities.
- Lenya's source excerpt says no page-level buttons were visible; `page_tags` remains null, not an empty array.
- Kruger's mid-skill excerpt note is preserved separately; no missing base skill names or tags are inferred.
- Gwyneth and Hammie are kept partial because their capture notes identify missing sections, even though their headings do not carry a PARTIAL marker.
- Page-level tags are not copied to abilities.

## Validation

- All source URLs match the manifest.
- No unmatched per-skill mappings, duplicate section keys, missing summaries or tag conflicts.
- `description_raw` remains null; summaries are marked as paraphrased.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 08 only. It does not merge earlier recaptures into final hero records, verify live source pages, establish patch currency or provide second-source validation.
