# Hero Knowledge — Batch 11 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_11.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_11.json`

## Completed profiles

Estrilda, Kordan, Sonja, Vala, Isabella and Frieren.

| Measure | Result |
|---|---:|
| Completed profiles | 6 |
| Ability/progression/targeting sections | 51 |
| Sections with explicit per-skill tags | 16 |
| Raw per-skill tag records | 23 |
| Page-level tag records kept separately | 15 |

Vala, Isabella and Frieren each have a separate `targeting_rule` record for their documented ally/enemy selection rule.

## Partial profiles preserved separately

Bryon, Chippy, Smokey & Meerky and Berial remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 4 |
| Supplemental sections | 16 |
| Sections with explicit per-skill tags | 6 |
| Raw per-skill tag records | 10 |
| Page-level tag records kept separately | 5 |

Bryon and Chippy are retained as partial despite the batch index's generic “Core page captured” label: the detailed capture explicitly identifies missing progression sections. Berial's unnamed mid-section effect is preserved in source notes, not fabricated as a named ability.

## Mapping and validation notes

- All 10 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to named sections; page-level tags remain separate.
- Partial profiles are not promoted to complete; missing abilities are not inferred.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 11's extraction summaries only. It does not verify live pages, establish patch currency or provide second-source validation.
