# Hero Knowledge — Batch 14 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_14.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_14.json`

## Completed profiles

Koko, Smokey & Meerky and Fay. Batch 14 explicitly marks Koko and Smokey & Meerky as upgraded; Fay is also explicitly stated in the coverage update to have a full page recapture and is treated as complete.

| Measure | Result |
|---|---:|
| Completed profiles | 3 |
| New sections captured | 24 |
| Sections with explicit per-skill tags | 10 |
| Raw per-skill tag records | 13 |
| Page-level tag records kept separately | 0 |

## Partial recaptures preserved separately

Rolan, Callan, Hodgkin, Cryonaia, Faramor, Phraesto, Nara, Valen, Baden and Atalanta remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 10 |
| Supplemental sections | 28 |
| Sections with explicit per-skill tags | 13 |
| Raw per-skill tag records | 13 |
| Page-level tag records kept separately | 6 |

## Mapping and validation notes

- All 13 hero IDs exist in the 131-hero source manifest.
- All source URLs and locales match the manifest.
- Complete-profile per-skill mappings are attached only to their named abilities.
- Rolan's six page-level tags remain separate; they are not copied to skills. The explicit Enhance Force mapping is retained.
- Partial page tags are retained separately; partial profiles are not promoted to complete.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Unknown cooldown/range/initial-energy values remain null.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 14's captured additions. It does not merge earlier sections into a single canonical hero record, verify live pages, establish patch currency or provide second-source validation.
