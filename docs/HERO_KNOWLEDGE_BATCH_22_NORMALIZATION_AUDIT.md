# Hero Knowledge — Batch 22 normalization audit

- **Date:** 2026-11-25
- **Branch:** `development`
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_22.md`
- **Normalized artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_22.json`

## Results

| Check | Result |
|---|---:|
| Complete profiles normalized | 5 (Atalanta, Phraesto, Thoran, Pandora, Pippa) |
| Unique tracker IDs | 5 |
| Sections | 39 |
| Page-level tags recorded separately | 12 |
| Profiles with no page-tag list recorded in this batch | 1 (Pandora; represented as null, not an empty list) |
| Sections with explicit per-skill mappings | 17 |
| Per-section tag records | 24 |
| Sections with no per-skill mapping recorded | 22 (`tags: null`) |
| Duplicate section keys | 0 |
| Missing summaries | 0 |
| Source URL mismatches | 0 |
| Section name/order mismatches | 0 |
| Per-skill tag mapping mismatches | 0 |
| Non-null `description_raw` values | 0 |

## Notes

- Pandora has **7 sections** in the captured kit. This artifact preserves those 7 and does not invent an eighth section.
- Pandora's page-level tag list was not present in Batch 22, so `page_tags` is null and `page_tags_capture_status` is `not_recorded_in_batch`; this does not assert that the page has no tags.
- Page-level tags remain separate from ability tags.
- Only explicitly recorded per-skill mappings are attached to sections.
- Descriptions are paraphrased extraction summaries; no raw source wording is claimed.
- Baden and Saida are partial recaptures in Batch 22 and are intentionally not duplicated here. Their fragments remain supplemental evidence for a later reconciliation pass.

## Exit decision

**PASS — all section ordering, tag mappings, and source provenance checks match Batch 22.**

This validates consistency with the extraction batch only. It is not a fresh Stargazer transcription, second-source cross-check, patch verification, or in-game verification. No Supabase schema/data writes or application changes were made.

## Restart point

Continue Stage 2 with Batch 21 as the next independent unit. Normalize only profiles marked complete in that batch; keep partial recaptures as supplemental evidence for later reconciliation. Validate section order/names, tag mappings, unique keys and provenance, then commit the batch artifact and update the progress log.
