# Hero Knowledge — staged progress log

**Repository:** `ShifterAFK/smackdown-tracker`  
**Branch:** `development`  
**Started:** 2026-11-25  
**Production branch:** `main` — untouched

This file is the durable restart point. Update it after every completed stage.

## Work rules

- Finish one small stage at a time and commit its artifacts.
- Preserve exact Stargazer tag labels and qualifiers.
- Do not infer missing tags, values, patch versions, or source claims.
- Keep source facts separate from interpretation.
- Do not modify Supabase schema/data without explicit authorization.
- Do not modify Match Indicator, Showdown Draft Indicator, Tier List, or TOP Picks as part of this knowledge-data work.
- Never treat source discovery or first-pass capture as cross-checking or in-game verification.

## Stage 0 — first-pass source capture

**Status: complete.**

- 24 extraction batches: `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_01.md` through `BATCH_24.md`.
- Batch 24 records completion of **131/131** tracker hero first-pass Stargazer captures.
- Thane remains an additional out-of-roster source record and is not counted in the 131.
- Capture is source-summary level; it is not a complete verbatim transcription, second-source validation, or patch verification.
- No Supabase writes or application code changes.

## Stage 1 — machine-readable source manifest

**Status: complete.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_SOURCE_MANIFEST.json`  
**Audit:** `docs/HERO_KNOWLEDGE_SOURCE_AUDIT.md`, section 9.

### Results

- Exact roster match: **131/131** unique IDs against a read-only query of `public.ss_heroes`.
- **229** source-capture occurrences across batches 01–24.
- **52** heroes have later recapture batches.
- **51** earliest captures were marked partial; all have later recapture entries.
- **130** English source URLs and **1** Polish source URL (`hepler`).
- Explicit aliases: `gala` → Galahad; `taichi` → Taichi & Agumon; `yamato` → Yamato & Gabumon.
- Thane is recorded separately as out-of-roster at `https://afkstargazer.com/id/skill/thane`.
- No missing roster IDs, source URLs, locales, or conflicting URLs; no unresolved name conflicts.

### Validation boundaries

- Source patch/update labels are unknown and remain null.
- The manifest locates sources and records capture history; it is not a normalized ability dataset.
- No second-source cross-check or in-game verification is claimed.
- Supabase was queried read-only for the roster; no database changes were made.
- No application code or indicator/tier algorithms were changed.


## Stage 2 — ability-level normalization pilot

**Status: pilot complete; bulk normalization not started.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_PILOT.json`

### Pilot contents

- Three complete Batch 24 profiles: Baden, Saida, Perseus.
- 24 ability/progression sections across the three heroes.
- 9 sections have explicit per-skill tag mappings.
- 15 sections use `tags: null` because no section-level mapping was explicitly recorded in the batch. This does not mean those abilities have no mechanics.
- Page-level tags are retained separately and are not copied onto abilities.
- Descriptions are stored as paraphrased `description_summary`; `description_raw` remains null.
- Cooldown, range, initial cooldown, and initial energy remain null where not supplied by the capture.
- Perseus's explicit source rule note about temporary stat buffs is preserved separately.

### Structural validation

- 3 unique hero IDs.
- 24 sections; no duplicate ability keys within a hero.
- Every section has a non-empty summary and source URL provenance.
- No paraphrase is marked as verbatim source text.
- No Supabase schema/data writes; no application code changes.

### Exit result

The pilot demonstrates a conservative ability-level shape that preserves tag uncertainty and provenance. It is not yet a complete 131-hero dataset and is not approved for import.



## Stage 2A — pilot audit

**Status: complete — PASS.**  
**Report:** `docs/HERO_KNOWLEDGE_NORMALIZATION_PILOT_AUDIT.md`

- Read-only comparison of the 3-hero / 24-section pilot against Batch 24.
- Exact section names/order and all explicit per-skill tag mappings match the batch.
- 13 page-level tags remain separate; 15 section-level tag records are retained across 9 explicitly tagged sections.
- 15 sections correctly retain `tags: null` where Batch 24 has no per-skill mapping.
- All 24 summaries have source URL provenance; `description_raw` remains null throughout.
- No duplicate section keys, missing summaries, or mapping mismatches.
- This validates consistency with Batch 24 only; it does not independently re-open Stargazer pages or cross-check another source.

## Restart point — Stage 2B

Next, inspect and normalize **Batch 23** as a separate unit. Use only facts, section ordering, and per-skill tag mappings explicitly present in that batch. Validate the normalized records against the batch, commit the artifact, and update this log before moving to another batch. Keep unknown descriptions/fields/tags null or `needs_review`; do not import to Supabase.
