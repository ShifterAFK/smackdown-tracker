# Hero Knowledge — Global Normalization Audit (Stages 2Z)

- **Date:** 2026-11-25
- **Branch:** `development`
- **Roster authority:** read-only `public.ss_heroes` snapshot, 131 rows
- **Source index:** `docs/data/HERO_KNOWLEDGE_SOURCE_MANIFEST.json`
- **Scope:** normalized batch artifacts 01–24; no database import

## Executive result

**All 131 tracker IDs are represented in the normalized batch material.** No roster ID is missing and no out-of-roster ID is mixed into the 131-row set.

The normalized artifacts currently contain complete-profile records for **119 unique heroes** and partial-only records for **12 heroes**. This differs from the final source-capture audit, which declares 131/131 first-pass captures complete. The difference is not a missing-roster problem; it is a **status-classification/reconciliation problem** that must be resolved before treating the normalized dry run as complete.

## 1. Coverage counts

| Measure | Result |
|---|---:|
| Tracker roster IDs | 131 |
| Unique tracker IDs represented in normalized artifacts | 131 |
| Missing tracker IDs | 0 |
| Unexpected tracker IDs | 0 |
| Normalized batch artifacts | 24 |
| Profile capture records across artifacts | 223 |
| Unique heroes with at least one complete normalized record | 119 |
| Heroes represented only by partial normalized records | 12 |
| Section records across all 24 artifacts | 1,299 |
| Out-of-roster Thane | Kept outside the roster |

The 223 profile records include repeated partial/recapture evidence. They are not 223 unique heroes or 223 final hero records.

## 2. Twelve status discrepancies requiring reconciliation

These IDs have source material in the normalized artifacts, but no complete-profile record:

- `bryon`
- `cecia`
- `chippy`
- `granny-dahnie`
- `hammie`
- `indris`
- `mehira`
- `nerion`
- `reinier`
- `satrana`
- `talene`
- `valka`

The final source audit's 131/131 figure is a **roster-to-source/page coverage statement**, not proof that all ability/progression sections are complete. The detailed extraction batches explicitly retain unresolved gaps for the 12 profiles listed above. The 80/131 first-pass-summary figure after Batch 13 also differs from the 68 profiles placed in the normalized complete groups at that point.

The normalization decision remains conservative and is correct for the evidence currently present: keep these 12 profiles partial/needs-review until their missing or ambiguous source sections are recaptured or their absence is verified. Do not fill missing ability descriptions, tags, cooldowns, or progression sections by inference. The machine-readable gap register is `docs/data/HERO_KNOWLEDGE_NORMALIZATION_GAP_REGISTER.json`.

**Resolution rule for the next stage:** distinguish:
- `first_pass_capture_status` — whether the source audit considers the available page material captured;
- `normalization_status` — whether the captured material has been structured;
- `review_status` — whether any section/visibility ambiguity remains.

A profile can be first-pass captured while still having `review_status: needs_review`. Do not erase its uncertainty to make the counts match.

## 3. Structural validation

All 24 batch files were checked for the following:

- Hero IDs resolve to the 131-row source manifest.
- Profile source URLs and locale values agree with the manifest and URL path.
- Section keys are present and unique within each profile record.
- Section summaries are non-empty.
- `description_raw` remains null; paraphrases are not represented as verbatim source text.
- Ability tags and page-level tags use the structured raw-tag representation.
- Tag qualifiers remain explicit arrays; raw labels are retained.
- Section-level source evidence contains a source URL matching the hero source.
- Unknown tag sets remain null rather than being converted to an empty array.

**Result:** no structural, source URL, locale, provenance, tag-shape, duplicate-within-profile, or missing-summary errors were found in the per-batch checks.

## 4. Cross-batch duplicates and schema drift

### Repeated capture evidence

Repeated section keys are expected where later batches recapture earlier partial profiles. The following repeated section-key groups were observed in the later batch groups inspected:

- Pippa — Mad Missiles; Mage's Bloom
- Himmel — Heroic Dash; Enhance Force; Season Charm
- Smokey & Meerky — Special Aroma; Energizing Formula
- Aster — Hero Focus; Starless Hollows
- Pandora — Panic Projection
- Phraesto — Futile Echo
- Valen — Thunder Swordwork

The inspected repeats agree on section name/type and explicit tag values. They should be merged as evidence for one logical ability, not counted as separate abilities. A full canonical cross-batch merge and exhaustive duplicate report remains the next data-processing task.

### Batch schema variants

The 24 files do not yet share one top-level envelope:

- Batches 01–19: `completed_profiles` plus `partial_recapture_supplements`.
- Batch 20: `heroes` plus `supplemental_recaptures`.
- Batches 21–24: `heroes` only.

The contents are structurally similar but not uniform. A single import/consumer should not read these files directly with one assumed schema. Normalize them into one canonical envelope before any import proposal.

The earlier three-hero pilot is superseded by the final Batch 24 artifact and should be treated as schema-development history, not as an additional data source.

## 5. Data and application safety

- No Supabase schema or data writes were performed.
- No application code was changed.
- Match Indicator, Showdown Draft Indicator, Tier List and TOP Picks were not modified.
- `main` was not modified.
- No database import is approved by this audit.

## 6. Exit decision

**Stage 2Z — global audit: completed with reconciliation blockers.**

The batch data is structurally consistent enough to proceed to a controlled consolidation dry run, but it is not ready for Supabase import.

### Restart point — Stage 2AA

1. Reconcile the 12 source-audit-complete / normalized-partial profiles listed above.
2. Preserve all “not visible in excerpt” notes and leave unobserved fields unknown.
3. Establish a canonical batch envelope and merge repeated section evidence by `hero_id + ability_key`.
4. Compare repeated tag mappings; any real conflict must remain explicit and be marked `conflict`.
5. Produce one 131-hero consolidated dry-run JSON plus a machine-readable validation report.
6. Only after that, review import schema compatibility. No Supabase writes until separately authorized.
