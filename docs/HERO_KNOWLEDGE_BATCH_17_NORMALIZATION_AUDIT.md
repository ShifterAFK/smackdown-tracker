# Hero Knowledge — Batch 17 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_17.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_17.json`

## Complete profiles

Seth, Karma, Silvina, Natsu and Rhys.

| Measure | Result |
|---|---:|
| Complete profiles | 5 |
| Sections | 41 |
| Sections with explicit per-section tags | 10 |
| Raw per-section tag records | 10 |
| Page-level tag records | 6 |

## Partial recaptures preserved separately

Berial, Thoran, Orion and Walker remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 4 |
| Supplemental sections | 12 |
| Sections with explicit per-section tags | 4 |
| Raw per-section tag records | 6 |
| Page-level tag records | 12 |

Partial-status notes are preserved; none of these profiles was promoted to complete.

## Mapping notes

- Seth and Karma use explicit `Ability tags visible` lines; those tags are attached only to the named abilities.
- Silvina's per-skill label `Ultimate — Shadow Slayer` is mapped to the captured `Shadow Slayer` section; the original mapping label is preserved.
- Natsu's mode-specific Iron Fist tag is mapped to the combined mode-variant section; the generic `Exclusive Equipment` label maps to its single EE section.
- Rhys explicitly states that page-level mechanic buttons were not visible. `page_tags` remains null; this is not interpreted as an empty tag set.
- Page-level tags are not copied to abilities.

## Validation

- All source URLs match the source manifest.
- No unmatched tag mappings, duplicate section keys or missing summaries.
- All explicit qualifiers are retained verbatim.
- `description_raw` remains null; summaries are marked as paraphrased.
- No Supabase writes or application code changes.

## Limits

This is structural normalization against Batch 17 only. It does not merge prior batches into final hero profiles, re-verify live source pages, establish patch currency or provide second-source validation.
