# Hero Knowledge — Batch 23 normalization audit

- **Date:** 2026-11-25
- **Branch:** `development`
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_23.md`
- **Normalized artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_23.json`

## Results

| Check | Result |
|---|---:|
| Complete profiles normalized | 4 (Valen, Sylphira, Berial, Laios) |
| Unique tracker IDs | 4 |
| Sections | 32 (8 per hero) |
| Page-level tags retained separately | 15 |
| Sections with explicit per-skill tag mappings | 10 |
| Per-section tag records | 15 |
| Sections with no per-skill mapping recorded | 22 (`tags: null`) |
| Non-null `description_raw` values | 0 |
| Duplicate section keys | 0 |
| Missing summaries | 0 |
| Source provenance URL mismatches | 0 |
| Section name/order mismatches against Batch 23 | 0 |
| Per-skill tag mapping mismatches against Batch 23 | 0 |

## Mapping policy

- Page-level tags are not copied to every ability.
- Only the mappings explicitly listed in Batch 23 are attached to their exact section.
- `tags: null` means no per-skill mapping was recorded in this extraction batch; it does not mean the ability has no effects.
- Descriptions remain paraphrased summaries, not verbatim source text.
- Baden, Saida and Perseus are not duplicated in this artifact: Batch 23 explicitly says their profiles remain partial, and they are already represented in the Batch 24 pilot. Their additional Batch 23 fragments remain a later reconciliation task.

## Exit decision

**PASS — all structural, ordering, tag and provenance checks passed against Batch 23.**

This is an extraction-batch consistency check, not a fresh source-page transcription, second-source cross-check, patch verification, or in-game verification. No Supabase schema/data writes or application changes were made.

## Restart point

Continue Stage 2 with Batch 22 as the next independent normalization unit. Normalize only profiles marked complete in that batch, preserve partial profiles as supplemental evidence for later reconciliation, run the same validation checks, and update the progress log before moving on.
