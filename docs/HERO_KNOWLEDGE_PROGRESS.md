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

## Stage 2B — Batch 23 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_23.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_23_NORMALIZATION_AUDIT.md`

- Four complete profiles normalized: Valen, Sylphira, Berial and Laios.
- 32 sections, 15 page-level tags kept separate, 10 explicitly tagged sections and 15 per-section tag records.
- 22 sections retain `tags: null` because no per-skill mapping was recorded in Batch 23.
- Exact section order/names and every explicit per-skill tag mapping match Batch 23.
- No duplicate section keys, missing summaries, non-null raw descriptions, or source URL provenance mismatches.
- Baden, Saida and Perseus were not duplicated; Batch 23 still marks them partial and Batch 24 has the final complete captures. Their supplemental details remain for a later reconciliation pass.

## Stage 2C — Batch 22 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_22.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_22_NORMALIZATION_AUDIT.md`

- Five complete profiles normalized: Atalanta, Phraesto, Thoran, Pandora and Pippa.
- 39 sections; Pandora has 7 captured sections, preserved as-is rather than inventing an eighth.
- 12 page-level tags retained separately; Pandora's page-tag list was not recorded and remains `null`.
- 17 explicitly tagged sections and 24 per-section tag records; 22 sections retain `tags: null`.
- Section names/order, all explicit per-skill mappings and source URLs match Batch 22.
- No duplicate section keys, missing summaries or non-null raw descriptions.
- Baden and Saida are partial recaptures and are intentionally deferred to later reconciliation.

## Stage 2D — Batch 21 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_21.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_21_NORMALIZATION_AUDIT.md`

- Nine complete profiles normalized: Voracia, Igor, Kruger, Contess, Walker, Gwyneth, Orion, Marilee and Himmel.
- 71 sections; Contess has 7 captured sections and no missing section was invented.
- 16 page-level tags recorded separately; 3 profiles have no page-tag list in this batch and retain `page_tags: null`.
- 15 explicitly tagged sections and 22 per-section tag records; 56 sections retain `tags: null`.
- Section names/order, explicit per-skill mappings and source URLs match Batch 21.
- No duplicate section keys, missing summaries or non-null raw descriptions.


## Stage 2E — Batch 20 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_20.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_20_NORMALIZATION_AUDIT.md`

- Six complete profiles normalized: Rolan, Faramor, Callan, Hodgkin, Nara and Cryonaia.
- 45 sections, 19 page-level tags kept separate, 15 explicitly tagged sections and 20 per-section tag records.
- 30 sections retain `tags: null` because no per-skill mapping was recorded in Batch 20.
- Four partial recaptures (Atalanta, Baden, Phraesto, Valen) remain supplemental and are not promoted to complete profiles.
- Structural checks passed: manifest IDs/URLs/locales, unique section keys, non-empty summaries, null raw descriptions, and tag mapping consistency.
- No Supabase writes or application code changes.


## Stage 2F — Batch 19 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_19.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_19_NORMALIZATION_AUDIT.md`

- Nine completed profiles normalized as completion supplements: Evie, Lamentis, Aster, Soren, Florabelle, Zandrok, Brutus, Alna and Lorsan.
- 49 new sections, 13 explicitly tagged sections and 18 raw tag records.
- Prior detail batches are recorded per hero; earlier sections are not duplicated.
- Sylphira remains partial: 4 supplemental sections, no per-section tags, and the partial-status note is retained separately.
- Page tags were not re-captured in Batch 19 and remain null in this batch supplement.
- No duplicate section keys, missing summaries or source URL mismatches. No Supabase writes or application code changes.


## Stage 2G — Batch 18 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_18.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_18_NORMALIZATION_AUDIT.md`

- Three complete profiles normalized: Solise, Marcille and Elijah & Lailah.
- 24 sections, 7 explicitly tagged sections, 9 raw per-section tag records and 1 page-level tag record.
- Six partial recaptures (Voracia, Igor, Marilee, Valka, Aster and Pandora) are retained separately: 21 sections, 5 tagged sections, 11 raw tag records and 7 page-level tag records.
- Partial-status notes are preserved; none of the six partial profiles was promoted to complete.
- Elijah & Lailah's explicit per-skill mapping list and Marcille's visible ability tag are preserved separately from page tags.
- Source URLs match the manifest; no duplicate keys, missing summaries or tag-mapping conflicts.
- No Supabase writes or application code changes.


## Stage 2H — Batch 17 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_17.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_17_NORMALIZATION_AUDIT.md`

- Five complete profiles normalized: Seth, Karma, Silvina, Natsu and Rhys.
- 41 sections, 10 explicitly tagged sections, 10 raw per-section tag records and 6 page-level tag records.
- Four partial recaptures (Berial, Thoran, Orion and Walker) remain separate: 12 sections, 4 tagged sections, 6 raw tag records and 12 page-level tag records.
- Rhys's statement that page-level mechanic buttons were not visible is represented as unknown, not an empty tag set.
- Silvina's Ultimate tag and Natsu's mode-specific/generic equipment tag mappings are preserved with their mapping labels.
- Source URLs match the manifest; no unmatched mappings, duplicate section keys or missing summaries.
- No Supabase writes or application code changes.


## Stage 2I — Batch 16 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_16.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_16_NORMALIZATION_AUDIT.md`

- Three complete profiles normalized: Lucius, Lucca and Gunnar.
- 24 sections, 7 explicitly tagged sections, 10 raw per-section tag records and 3 page-level tag records.
- Seven partial recaptures (Contess, Gwyneth, Saida, Laios, Pippa, Himmel and Kruger) remain separate: 24 sections, 9 tagged sections, 12 raw tag records and 17 page-level tag records.
- Gunnar's four per-skill mappings are preserved; page-level tags remain separate.
- Source URLs match the manifest; no unmatched mappings, duplicate section keys or missing summaries.
- No Supabase writes or application code changes.

## Stage 2J — Batch 15 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_15.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_15_NORMALIZATION_AUDIT.md`

- One complete profile normalized: Pang, combining Batch 15 with the earlier Batch 6 capture.
- 7 new sections, 3 explicitly tagged sections and 3 raw per-skill tag records.
- Nine partial recaptures (Evie, Aster, Soren, Florabelle, Zandrok, Sylphira, Brutus, Alna and Lorsan) remain supplemental: 30 sections, 16 explicitly tagged sections and 25 raw per-skill tag records.
- 6 page-level tag records are retained separately and are not copied onto abilities.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2K — Batch 14 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_14.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_14_NORMALIZATION_AUDIT.md`

- Three complete profiles normalized: Koko, Smokey & Meerky and Fay.
- 24 sections, 10 explicitly tagged sections and 13 raw per-skill tag records.
- Ten partial recaptures (Rolan, Callan, Hodgkin, Cryonaia, Faramor, Phraesto, Nara, Valen, Baden and Atalanta) remain supplemental: 28 sections, 13 explicitly tagged sections and 13 raw per-skill tag records.
- 6 page-level tag records are retained separately and are not copied onto abilities.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2L — Batch 13 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_13.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_13_NORMALIZATION_AUDIT.md`

- Six complete profiles normalized: Daimon, Gerda, Peggy, Ravion, Shakir and Tasi.
- 49 sections, including Ravion's separate targeting rule; 14 explicitly tagged sections and 23 raw per-skill tag records.
- Perseus remains partial: one captured Ultimate section; page-level tag retained separately.
- 3 page-level tag records are retained separately and are not copied onto abilities.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2M — Batch 12 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_12.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_12_NORMALIZATION_AUDIT.md`

- Five complete profiles normalized: Arden, Carolina, Dunlingr, Cassadee and Kulu.
- 39 sections, including two separate targeting rules; 14 explicitly tagged sections and 18 raw per-skill tag records.
- Four partial recaptures (Silvina, Seth, Orion and Natsu) remain supplemental: 14 sections, 4 explicitly tagged sections and 5 raw per-skill tag records.
- Thane is retained separately as an out-of-roster Indonesian source record; it is not included in the 131 tracker heroes and is not importable.
- 14 page-level tag records are kept separate from ability tags.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Restart point — Stage 2N

Next, inspect **Batch 11**. Separate complete captures from partial recaptures, preserve earlier-batch references, and normalize only profiles explicitly established as complete. Keep partial records supplemental. Validate source URL/manifest agreement, section order, tag mappings and qualifiers, and provenance. Commit the artifact and audit, then update this log. No Supabase import.
