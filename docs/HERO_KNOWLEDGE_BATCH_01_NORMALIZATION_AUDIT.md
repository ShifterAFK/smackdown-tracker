# Hero Knowledge — Batch 01 normalization audit

- **Date:** 2026-11-25
- **Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_01.md`
- **Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_01.json`

## Completed profiles

Galahad (tracker ID `gala`), Hugin, Lily May, Taichi & Agumon (tracker ID `taichi`), Yamato & Gabumon (tracker ID `yamato`), Hewynn, Lumont and Kazim. Cyran is included as a core-page capture with a source note retaining the unresolved section attribution.

| Measure | Result |
|---|---:|
| Completed profiles | 9 |
| Sections | 70 |
| Sections with explicit per-skill tags | 5 |
| Raw per-skill tag records | 7 |
| Page-level tag records | 25 |

## Partial profiles preserved separately

Rolan, Callan, Hodgkin, Atalanta, Cryonaia and Faramor remain partial.

| Measure | Result |
|---|---:|
| Partial profiles | 6 |
| Supplemental sections | 20 |
| Sections with explicit per-skill tags | 3 |
| Raw per-skill tag records | 3 |
| Page-level tag records | 17 |

## Mapping and identity notes

- All 15 tracker IDs exist in the 131-hero source manifest.
- Galahad is stored under canonical tracker ID `gala`; Stargazer display name/slug is retained as source alias.
- Taichi & Agumon and Yamato & Gabumon are retained under canonical tracker IDs `taichi` and `yamato`.
- Cyran's section attribution for Exclusive Equipment, Enhance Force and Season Charm remains unresolved in the extraction; the group is preserved as a source section note rather than inventing separate mappings.
- Lily May's mode-dependent targeting is noted in the Ultimate summary; exact selection rules are not expanded beyond the extraction.
- Page-level tags are kept separate from ability tags.
- Partial profiles are not promoted to complete; missing sections are not inferred.

## Validation

- All source URLs and locales match the manifest.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Explicit tag qualifiers are preserved.
- All summaries are paraphrased capture summaries; no verbatim source wording is claimed.
- No Supabase writes or application code changes.

## Limits

This artifact normalizes Batch 01's first-pass extraction summaries only. It does not merge later recaptures into canonical final hero records, verify live pages, establish patch currency or provide second-source validation.
