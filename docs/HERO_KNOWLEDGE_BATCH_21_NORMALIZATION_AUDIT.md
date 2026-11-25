# Hero Knowledge — Batch 21 normalization audit

- **Date:** 2026-11-25
- **Branch:** `development`
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_21.md`
- **Normalized artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_21.json`

## Results

| Check | Result |
|---|---:|
| Complete profiles normalized | 9 (Voracia, Igor, Kruger, Contess, Walker, Gwyneth, Orion, Marilee, Himmel) |
| Unique tracker IDs | 9 |
| Sections | 71 |
| Page-level tags recorded separately | 16 |
| Profiles with no page-tag list recorded | 3 (Gwyneth, Marilee, Himmel; represented as null) |
| Sections with explicit per-skill mappings | 15 |
| Per-section tag records | 22 |
| Sections with no per-skill mapping recorded | 56 (`tags: null`) |
| Duplicate section keys | 0 |
| Missing summaries | 0 |
| Source URL mismatches | 0 |
| Section name/order mismatches | 0 |
| Per-skill tag mapping mismatches | 0 |
| Non-null `description_raw` values | 0 |

## Notes

- Contess has 7 sections in this capture; all seven are preserved without inventing an eighth.
- Page tags are kept separate from per-skill tags.
- Only explicit per-skill mappings are attached to their matching section.
- Profiles with no page-tag list in Batch 21 retain `page_tags: null`; that does not assert the pages have no tags.
- Descriptions are paraphrased summaries, not verbatim source text.
- The source references earlier batches for additional context. This normalization captures the complete kit as summarized in Batch 21; it does not merge earlier conflicting or more detailed fragments.

## Exit decision

**PASS — section names/order, explicit tag mappings and source provenance match Batch 21.**

This is a consistency check against the extraction batch only, not a fresh Stargazer transcription, second-source cross-check, patch verification or in-game verification. No Supabase schema/data writes or application changes were made.

## Restart point

Continue Stage 2 with Batch 20. Inspect its profiles and distinguish complete captures from partial recaptures. Normalize only profiles whose full first-pass capture is established by the extraction record; preserve partial recaptures as supplemental evidence for later reconciliation. Validate and commit the batch unit, then update the progress log.
