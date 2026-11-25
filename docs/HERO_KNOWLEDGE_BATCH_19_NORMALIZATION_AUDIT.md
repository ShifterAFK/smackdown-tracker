# Hero Knowledge — Batch 19 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_19.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_19.json`

## Completed profile supplements

Batch 19 states that these nine profiles are complete when combined with the referenced earlier captures:

Evie, Lamentis, Aster, Soren, Florabelle, Zandrok, Brutus, Alna and Lorsan.

| Measure | Result |
|---|---:|
| Completed profiles | 9 |
| New sections captured in Batch 19 | 49 |
| Sections with explicit inline tags | 13 |
| Raw tag records | 18 |
| Sections without a per-section tag mapping in this batch | 36 |

The artifact records the prior detail batch references per hero. It stores only sections newly captured in Batch 19; it does not duplicate or fabricate earlier sections.

## Partial profile retained separately

Sylphira remains partial in Batch 19.

- 4 supplemental sections retained.
- No explicit per-section tags recorded in this batch.
- The partial-status note is preserved.
- The profile is not promoted to complete based on this batch.

## Validation

- All 10 IDs exist in the source manifest.
- Batch source URLs, where supplied, match the manifest.
- Sylphira's URL is taken from the manifest because Batch 19 does not repeat it.
- No duplicate section keys or empty summaries.
- All tags are taken from explicit inline labels in the section capture.
- Page-level tags are not re-captured in Batch 19 and remain null in this supplement.
- `description_raw` remains null; summaries are not presented as verbatim source text.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 19's new section captures and prior-batch references. It does not merge the earlier section records into a single final profile, verify live source pages, establish patch currency, or provide second-source validation.
