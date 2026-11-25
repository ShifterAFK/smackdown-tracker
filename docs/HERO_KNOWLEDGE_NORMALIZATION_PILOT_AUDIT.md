# Hero Knowledge — normalization pilot audit

- **Date:** 2026-11-25
- **Branch:** `development`
- **Scope:** read-only validation of `docs/data/HERO_KNOWLEDGE_NORMALIZED_PILOT.json` against `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_24.md`.
- **No application code or Supabase changes.**

## Results

| Check | Result |
|---|---:|
| Heroes | 3 |
| Unique tracker IDs | 3 |
| Sections | 24 (8 per hero) |
| Page-level tags retained separately | 13 |
| Per-section tag records | 15 |
| Sections with explicit per-skill tag mappings | 9 |
| Sections with unknown/unrecorded tag mapping (`tags: null`) | 15 |
| Non-null `description_raw` values | 0 |
| Missing summaries | 0 |
| Source URL provenance mismatches | 0 |
| Section order/name mismatches against Batch 24 | 0 |
| Per-skill tag mapping mismatches against Batch 24 | 0 |
| Duplicate section keys within a hero | 0 |

## Verified behavior

- Page-level tags remain separate from section-level tags.
- Only the per-skill mappings explicitly listed in Batch 24 are attached to a section.
- Sections without an explicit per-skill mapping remain `tags: null`; they are not represented as having an empty tag set.
- Descriptions remain paraphrased summaries; no paraphrase is labeled as verbatim source text.
- All 24 sections point to the exact source URL recorded for their hero.

## Exit decision

**PASS — pilot structure and mappings match the Batch 24 extraction record.**

This is a consistency check against the existing extraction batch, not a fresh transcription from Stargazer, second-source validation, patch verification, or in-game verification. The three profiles remain marked `needs_verbatim_source_crosscheck` and the pilot is not approved for Supabase import.

## Restart point

Continue Stage 2 with the next small extraction unit: **Batch 23**. Inspect the full Markdown batch, identify the exact hero IDs and section/tag evidence present, normalize only what the batch explicitly supports, validate against the batch, then commit that unit and update `docs/HERO_KNOWLEDGE_PROGRESS.md`.
