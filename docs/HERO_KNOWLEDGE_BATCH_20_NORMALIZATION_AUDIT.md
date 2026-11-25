# Batch 20 normalization audit

**Status:** complete first-pass normalization dry run  
**Source:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_20.md`  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_20.json`  
**Date:** 2026-11-25

## Complete profiles normalized

- Rolan
- Faramor
- Callan
- Hodgkin
- Nara
- Cryonaia

## Structural result

| Measure | Result |
|---|---:|
| Complete hero profiles | 6 |
| Ability/progression sections | 45 |
| Sections with explicit per-skill tags | 15 |
| Raw per-skill tag records | 20 |
| Page-level tag records kept separate | 19 |
| Sections with unrecorded section tags | 30 |

## Partial recaptures preserved separately

Four partial recaptures (Atalanta, Baden, Phraesto and Valen) are retained in `supplemental_recaptures`, not promoted to complete profiles. Missing sections remain missing; no abilities were invented or inferred.

## Validation

- All six complete IDs exist in the 131-hero source manifest.
- All source URLs/locales match the manifest.
- No unmatched per-skill tag mappings.
- No duplicate ability keys within a hero.
- All summaries are non-empty and `description_raw` remains null.
- Explicit tag qualifiers are preserved verbatim.
- No Supabase writes or application code changes.

## Limits

This is structural normalization against Batch 20, not live-page re-verification, patch verification, or second-source cross-checking.
