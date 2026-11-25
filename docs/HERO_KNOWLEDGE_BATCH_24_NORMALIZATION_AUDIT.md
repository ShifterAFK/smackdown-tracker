# Hero Knowledge — Batch 24 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_24.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_24.json`

## Completed first-pass profiles

Baden, Saida and Perseus are explicitly upgraded from partial to complete first-pass captures.

| Measure | Result |
|---|---:|
| Complete profiles | 3 |
| Ability/progression sections | 24 |
| Sections with explicit per-skill tags | 9 |
| Raw per-skill tag records | 15 |
| Page-level tag records kept separately | 13 |

## Mapping and validation notes

- All three tracker IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill tags are attached only to their named ability sections; page-level tags are not copied onto abilities.
- Perseus's temporary-stat-buff rule for Divine Grace is preserved separately as source metadata; shields, control immunity and damage dealt/taken modifiers do not count toward Divine Grace's trigger.
- All three heroes have eight captured sections.
- No duplicate ability keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

Batch 24 closes first-pass Stargazer source capture for the final three tracker heroes. This is not second-source validation, in-game patch verification or a normalized database import.
