# Hero Knowledge — Batch 13 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_13.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_13.json`

## Completed profiles

Daimon, Gerda, Peggy, Ravion, Shakir and Tasi. The batch index marks these six core pages captured.

| Measure | Result |
|---|---:|
| Completed profiles | 6 |
| Ability/progression/targeting sections | 49 |
| Sections with explicit per-skill tags | 14 |
| Raw per-skill tag records | 23 |
| Page-level tag records kept separately | 2 |

Ravion's rearmost-ally scan order is preserved as a separate `targeting_rule` section rather than being folded into an ability description.

## Partial profile preserved separately

Perseus remains partial because the excerpt ends during Ultimate level scaling.

| Measure | Result |
|---|---:|
| Partial profiles | 1 |
| Supplemental sections | 1 |
| Sections with explicit per-skill tags | 0 |
| Raw per-skill tag records | 0 |
| Page-level tag records kept separately | 1 |

## Mapping and validation notes

- All 7 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Per-skill mappings are attached only to the named sections; page-level tags are not copied onto abilities.
- Gerda and Tasi retain unknown page-tag state because no page-level buttons were visible in the excerpt; this is not treated as an empty tag set.
- Perseus's page tag is retained separately from the Ultimate section.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 13's roster-completion captures. It does not verify live pages, establish patch currency or provide second-source validation.
