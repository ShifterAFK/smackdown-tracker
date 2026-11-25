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

## Stage 2N — Batch 11 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_11.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_11_NORMALIZATION_AUDIT.md`

- Six complete profiles normalized: Estrilda, Kordan, Sonja, Vala, Isabella and Frieren.
- 51 sections, including three separate targeting rules; 16 explicitly tagged sections and 23 raw per-skill tag records.
- Four partial recaptures (Bryon, Chippy, Smokey & Meerky and Berial) remain supplemental: 16 sections, 6 explicitly tagged sections and 10 raw per-skill tag records.
- 20 page-level tag records are retained separately and are not copied onto abilities.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2O — Batch 10 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_10.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_10_NORMALIZATION_AUDIT.md`

- Seven complete profiles normalized: Rowan, Lyca, Mikola, Korin, Hepler, Odie and Aliceth.
- 56 sections, 21 explicitly tagged sections and 26 raw per-skill tag records.
- Three partial recaptures (Rhys, Pandora and Karma) remain supplemental: 13 sections, 2 explicitly tagged sections and 6 raw per-skill tag records.
- 13 page-level tag records are retained separately and are not copied onto abilities.
- Hepler's Polish source locale is preserved; only the English paraphrased extraction summary is stored, not fabricated raw Polish text.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2P — Batch 09 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_09.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_09_NORMALIZATION_AUDIT.md`

- Four complete profiles normalized: Dionel, Salazer, Mirael and Niru.
- 31 sections; 6 explicitly tagged sections and 8 raw per-skill tag records.
- Six partial recaptures (Saida, Contess, Pippa, Himmel, Marilee and Elijah & Lailah) remain supplemental: 19 sections, 4 explicitly tagged sections and 6 raw per-skill tag records.
- 15 page-level tag records are retained separately and are not copied onto abilities.
- Niru's documented targeting-rule requirement is noted separately because exact selection details are absent from this extraction.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.


## Stage 2Q — Batch 08 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_08.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_08_NORMALIZATION_AUDIT.md`

- Three complete profiles normalized: Lenya, Damian and Kafra.
- 24 sections, 5 explicitly tagged sections, 6 raw per-section tag records and 5 page-level tag records.
- Seven partial recaptures (Lucca, Kruger, Lucius, Gunnar, Gwyneth, Hammie and Laios) remain separate: 30 sections, 6 tagged sections, 9 raw tag records and 9 page-level tag records.
- Kruger's incomplete mid-skill detail is retained separately; no missing base abilities or tags are inferred.
- Lenya's missing page-level buttons remain unknown, not an empty tag set. Gwyneth and Hammie remain partial because their capture notes list missing sections.
- Source URLs match the manifest; no unmatched mappings, duplicate section keys, missing summaries or tag conflicts.
- No Supabase writes or application code changes.


## Stage 2R — Batch 07 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_07.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_07_NORMALIZATION_AUDIT.md`

- Four complete profiles normalized: Nazrik, Parisa, Shemira and Ludovic.
- 31 sections, 6 explicitly tagged sections, 6 raw per-section tag records and 5 page-level tag records.
- Six partial recaptures (Voracia, Solise, Marcille, Thoran, Walker and Igor) remain separate: 22 sections, 4 tagged sections, 5 raw tag records and 9 page-level tag records.
- Marcille's unnamed revived-ally detail remains an unstructured note; no ability heading was invented.
- Page-tag visibility gaps remain unknown rather than empty; partial profiles are not promoted to complete.
- Source URLs match the manifest; no duplicate section keys or missing summaries.
- No Supabase writes or application code changes.

## Stage 2S — Batch 06 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_06.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_06_NORMALIZATION_AUDIT.md`

- Three complete profiles normalized: Ulmus, Tilaya and Thador.
- 24 sections, 5 explicitly tagged sections and 6 raw per-skill tag records.
- Seven partial recaptures (Koko, Lorsan, Satrana, Fay, Nerion, Mehira and Pang) remain supplemental: 32 sections, 12 explicitly tagged sections and 18 raw per-skill tag records.
- 15 page-level tag records are retained separately and are not copied onto abilities.
- Nerion's unheaded base-skill detail is preserved as an unstructured note; missing ability names are not inferred.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2T — Batch 05 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_05.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_05_NORMALIZATION_AUDIT.md`

- Nine complete profiles normalized: Sinbad, Bonnie, Alsa, Marene, Eryndor, Lucy, Scarlita, Senea and Baelran.
- 71 sections, 27 explicitly tagged sections and 33 raw per-skill tag records.
- Reinier remains partial: 7 supplemental sections, including separate Dynamic Balance targeting metadata; 4 explicitly tagged sections and 6 raw per-skill tag records.
- 30 page-level tag records are retained separately and are not copied onto abilities.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2U — Batch 04 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_04.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_04_NORMALIZATION_AUDIT.md`

- Six complete profiles normalized: Harak, Zanie, Silven, Shadewing, Aurora and Zorya.
- 45 sections, 13 explicitly tagged sections and 17 raw per-skill tag records.
- Four partial recaptures (Zandrok, Sylphira, Brutus and Alna) remain supplemental: 14 sections, 7 explicitly tagged sections and 9 raw per-skill tag records.
- 21 page-level tag records are retained separately and are not copied onto abilities.
- Zanie's cooldown-format anomaly is noted without guessing a numeric value.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2V — Batch 03 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_03.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_03_NORMALIZATION_AUDIT.md`

- Two complete profiles normalized: Velara and Temesia.
- 16 sections, 6 explicitly tagged sections and 6 raw per-skill tag records.
- Eight partial recaptures (Granny Dahnie, Evie, Lamentis, Valka, Aster, Indris, Soren and Florabelle) remain supplemental: 31 sections, 11 explicitly tagged sections and 15 raw per-skill tag records.
- 13 page-level tag records are retained separately and are not copied onto abilities.
- Granny Dahnie, Valka and Indris remain partial because detailed captures identify missing sections despite generic index status.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2W — Batch 02 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_02.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_02_NORMALIZATION_AUDIT.md`

- Four complete profiles normalized: Antandra, Eironn, Viperian and Athalia.
- 32 sections, 8 explicitly tagged sections and 9 raw per-skill tag records.
- Six partial recaptures (Talene, Baden, Phraesto, Cecia, Nara and Valen) remain supplemental: 19 sections, 7 explicitly tagged sections and 12 raw per-skill tag records.
- 32 page-level tag records are retained separately and are not copied onto abilities.
- Talene and Cecia remain partial because their capture notes identify missing/incomplete sections.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2X — Batch 01 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_01.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_01_NORMALIZATION_AUDIT.md`

- Nine core-page profiles normalized: Galahad (`gala`), Hugin, Lily May, Taichi & Agumon (`taichi`), Yamato & Gabumon (`yamato`), Hewynn, Lumont, Cyran and Kazim.
- 70 sections, 5 explicitly tagged sections and 7 raw per-skill tag records.
- Six partial recaptures (Rolan, Callan, Hodgkin, Atalanta, Cryonaia and Faramor) remain supplemental: 20 sections, 3 explicitly tagged sections and 3 raw per-skill tag records.
- 42 page-level tag records are retained separately and are not copied onto abilities.
- Canonical tracker IDs and Stargazer aliases are preserved; Cyran's ambiguous section attribution remains a source note.
- Manifest IDs, source URLs and locales match; no duplicate section keys, missing summaries or non-null raw descriptions.
- No Supabase writes or application code changes.

## Stage 2Y — Batch 24 normalization

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_24.json`  
**Audit:** `docs/HERO_KNOWLEDGE_BATCH_24_NORMALIZATION_AUDIT.md`

- Three final profiles upgraded to complete first-pass captures: Baden, Saida and Perseus.
- 24 sections, 9 explicitly tagged sections and 15 per-skill tag records.
- 13 page-level tag records are retained separately.
- Perseus's temporary-stat-buff rule is preserved as source metadata.
- All IDs, source URLs, locales, eight-section profile structures and unique ability keys validated.
- No Supabase writes or application code changes.



## Stage 2Z — global normalized-data audit

**Status: completed with reconciliation blockers.**  
**Audit:** `docs/HERO_KNOWLEDGE_GLOBAL_NORMALIZATION_AUDIT.md`

### Results

- All **131/131** tracker IDs are represented in normalized batch artifacts 01–24; no missing or unexpected roster IDs.
- 223 profile capture records across 24 files; 1,299 section records including recapture duplicates.
- 119 unique heroes have at least one complete normalized record.
- 12 heroes remain partial-only in the normalized batch groups: Bryon, Cecia, Chippy, Granny Dahnie, Hammie, Indris, Mehira, Nerion, Reinier, Satrana, Talene and Valka.
- This is a status mismatch against the final source audit's 131/131 first-pass capture statement. The same 12-profile difference exists in the historical 80/131 vs 68/131 count after Batch 13.
- Per-batch structural checks passed: manifest IDs, source URLs/locales, source-evidence URLs, section keys, summaries, raw-description nulls, and tag object shape.
- Recapture duplicates are present and must be merged by hero ID + ability key; inspected repeated records agree on names/types/tags.
- Top-level schema varies between Batches 01–19, 20 and 21–24.

### Safety

No Supabase writes, application code changes, indicator/tier changes or main-branch changes.

#
## Stage 2AA — reconcile source coverage and normalization gaps

**Status: complete — 12 gaps explicitly registered.**  
**Artifacts:**  
- `docs/data/HERO_KNOWLEDGE_NORMALIZATION_GAP_REGISTER.json`
- `docs/HERO_KNOWLEDGE_NORMALIZATION_GAP_REGISTER.md`

The 131/131 source audit statement is page/source coverage, not proof that every ability/progression section is complete. Twelve normalized profiles remain partial because their detailed extraction records explicitly identify missing, incomplete or unheaded sections:

Talene, Cecia, Granny Dahnie, Valka, Indris, Reinier, Satrana, Nerion, Mehira, Hammie, Bryon and Chippy.

The gap register records each exact issue, source URL, capture batch and required action. No profile was promoted and no missing ability/tag/value was inferred. The source manifest remains a locator index; its initial heading marker does not override explicit capture-gap notes.

## Restart point — Stage 2AB

Standardize the batch envelope and consolidate the 131 heroes into one dry-run dataset. Merge repeated section evidence by `hero_id + ability_key`, preserve provenance variants, compare explicit tag mappings, and keep the 12 gap-register profiles in `needs_review`. The final report must distinguish 131 source records from the number of complete normalized kits. No Supabase import.


Reconcile the 12 source-audit-complete / normalized-partial profiles without inventing absent sections; standardize the batch envelope; merge repeated section evidence; then produce one canonical 131-hero consolidated dry-run JSON and validation report. No Supabase import.


Audit all normalized batch artifacts 01–24 for schema consistency, duplicate hero/section keys, tag mapping parity, source URL/locale agreement, provenance, and cross-batch completeness. Resolve discrepancies before proposing a Supabase import. No Supabase writes or application changes.

## Stage 2AB1 — standardize consolidation input 01–08

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATION_PART_01_08.json`  
**Audit:** `docs/HERO_KNOWLEDGE_CONSOLIDATION_PART_01_08_AUDIT.md`

- 85 capture records across 8 source batches; 85 unique hero IDs.
- 40 complete and 45 partial capture records.
- 488 section records preserved.
- Profile records are wrapped in one canonical `hero_capture_record_v1` envelope; original normalized records remain intact.
- All source URLs, locales and section evidence URLs match the source manifest.
- No Supabase writes or application changes.


## Stage 2AB2 — standardize consolidation input 09–16

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATION_PART_09_16.json`  
**Audit:** `docs/HERO_KNOWLEDGE_CONSOLIDATION_PART_09_16_AUDIT.md`

- 79 profile capture records across 8 source batches; 74 unique tracker IDs.
- 35 complete and 44 partial capture records.
- 426 section records preserved.
- 1 out-of-roster source records retained separately.
- Canonical envelope and source-manifest URL/locale/section provenance checks passed.
- No Supabase writes or application changes.


## Stage 2AB3 — standardize consolidation input 17–24

**Status: complete — PASS.**  
**Artifact:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATION_PART_17_24.json`  
**Audit:** `docs/HERO_KNOWLEDGE_CONSOLIDATION_PART_17_24_AUDIT.md`

- 59 profile capture records across Batches 17–24; 45 unique tracker IDs.
- 44 complete and 15 partial capture records.
- 384 section records preserved.
- Batch 20 and Batch 21–24 schema variants are wrapped in the same canonical envelope.
- Batch 24 is the final normalized artifact for Baden, Saida and Perseus; the earlier pilot is superseded.
- Source manifest/URL/locale/section provenance checks passed.
- No Supabase writes or application changes.


## Stage 2AB4 — consolidated 131-hero dry run

**Status: complete — structural PASS; review blockers retained.**  
**Canonical index:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN.json`  
**Shards:** `HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_PART_01.json` through `PART_04.json`  
**Validation:** `docs/data/HERO_KNOWLEDGE_CONSOLIDATED_VALIDATION.json`  
**Audit:** `docs/HERO_KNOWLEDGE_CONSOLIDATED_DRY_RUN_AUDIT.md`

- Consolidated all 223 capture records into 131 unique tracker profiles.
- 119 normalized-complete profiles; 12 remain `needs_review`.
- 1298 section evidence records merged into 1019 logical sections.
- 300 sections have consistent explicit tags; 719 remain unknown; 0 tag conflicts.
- 216 logical sections preserve multiple paraphrased summaries.
- 0 roster, source URL, locale or section provenance mismatches.
- Thane remains separately out-of-roster.
- Dataset is sharded for retrievability; the index file is the canonical entry point.

No Supabase writes or application changes.

## Restart point — Stage 2AC

Perform semantic review and source cross-check on a prioritized sample, beginning with the 12 open gap-register profiles and sections with multiple paraphrase variants. Verify exact Stargazer wording/tags and compare a prioritized subset with AFK.global/official patch information. Record conflicts and source dates. Do not import into Supabase yet.

## Stage 2AC1 — Batch 25 source-gap recapture

**Status: complete at indexed-source capture level; direct-page/patch verification pending.**  
**Artifacts:** `docs/HERO_KNOWLEDGE_EXTRACTION_BATCH_25.md`, `docs/data/HERO_KNOWLEDGE_NORMALIZED_BATCH_25.json`, `docs/HERO_KNOWLEDGE_BATCH_25_NORMALIZATION_AUDIT.md`

- Reviewed all 12 prior gap-register profiles.
- Recaptured 22 missing or incomplete sections across 10 profiles: Talene, Cecia, Granny Dahnie, Valka, Indris, Reinier, Satrana, Nerion, Mehira and Bryon.
- Confirmed that Hammie and Chippy have no additional Hero Focus, Exclusive Equipment, Enhance Force or Rivalry Mode sections listed on their current indexed Stargazer pages.
- Cross-checked core-kit details with AFK.global for Cecia, Granny Dahnie, Valka, Indris and Nerion.
- Recorded three separate AFK.global Season Skill observations (Focus Hit, Lock-on Projectiles, Soul-lifting Touch). The normalization spec now distinguishes `season_skill` from Stargazer `season_charm`.
- All 12 gap-register entries are closed at section-capture level; direct page fetch and patch verification remain pending.
- Direct page opens returned cache misses; this is recorded in every Batch 25 evidence record.
- Ability-level tags remain null when not shown per section; page-level tags remain separate.

No Supabase writes or application changes.

## Restart point — Stage 2AC2

Rebuild the consolidated 131-hero dry run with Batch 25, close the 12 open profile statuses at the section-capture level, preserve indexed-source/direct-fetch limitations, and add the secondary Season Skill observations without merging them into Season Charm. Re-run the full structural/tag/provenance validation. Then prioritize direct page fetch or patch-version verification before any import proposal.
