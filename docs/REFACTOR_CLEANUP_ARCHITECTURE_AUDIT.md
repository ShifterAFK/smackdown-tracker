# Architecture audit — archive vs development

**Date:** 2026-11-25  
**Repository:** `ShifterAFK/smackdown-tracker`  
**Branch audited:** `development`  
**Archive:** `smackdown-tracker-refactor-cleanup.zip` (header identifier `6894b1ed727d06041a23b0646ec3efc3991cf473`)

## 1. Inventory

| Area | Uploaded archive | Current development |
|---|---:|---:|
| Tracked/archive files | 308 | 336 |
| JavaScript files | 44 | 47 |
| CSS files | 24 | 27 |
| Supabase migration files | 0 | 6 |
| Documentation files | 2 root docs plus plan | 33 files under `docs/` plus root docs |
| Hero portraits | 191 | 191 |

The counts are file inventory counts, not a measure of feature completeness.

## 2. Runtime entry point and module loading

### Current `development`

- Root `index.html` is the live entry point.
- It loads `tracker137-manager.js` early, then classic scripts in an explicit order.
- Core globals and shared state are established by `assets/js/modules/00-core.js`.
- Later modules extend that shared runtime through IIFEs/classic scripts; they are not native ES modules merely because the files are called modules.
- The current index loads the generated module files, not `assets/js/tracker-app.js`.
- `assets/js/tracker-app.js` is retained as the monolithic source used by the split workflow.

### Uploaded archive

- The root `index.html` loads the legacy classic-script stack.
- The archive also contains a separate, minimal V2 entry point at `v2/index.html`.
- That V2 page references `v2/assets/js/main.js` and `v2/assets/css/main.css` relative to its own directory; both files exist. The module imports `v2/assets/js/supabase.js`.
- The V2 prototype is not wired into the root page. It is a separate entry point, not a replacement already integrated with the legacy app.
- Both archive entry points pass the asset-reference and JavaScript syntax checks described in the baseline validation report.

## 3. Source-to-generated module drift

The archive contains `scripts/split-tracker-js.py` and the current branch retains the monolithic `assets/js/tracker-app.js` plus generated `assets/js/modules/*`.

A read-only comparison of the nine marker-derived source chunks against the corresponding current generated files found:

| Generated file | Matches source chunk exactly? |
|---|---|
| `00-core.js` | No |
| `01-smackdown-map-card-click-v2.js` | Yes |
| `02-tracker-shared-data-v1.js` | Yes |
| `03-assistant-session-snapshot-1323.js` | Yes |
| `04-draft-assist-script-v1.js` | No |
| `05-draft-assist-position-script-v2.js` | Yes |
| `06-assist-visual-compact-script.js` | No |
| `07-assist-compact-layout-v3-script.js` | No |
| `08-match-estimate-script-v1.js` | No |

**Important:** five generated modules differ from the monolithic source. Running the split script/workflow could overwrite module-level changes with older source chunks. The split workflow must not be run as a cleanup shortcut. First establish which copy is authoritative for each module and reconcile differences deliberately.

The same-named `render()` functions are not enough to prove duplicate runtime execution: the current `index.html` loads the generated modules and does not load `tracker-app.js`. Runtime ownership must be traced through the actual entry point, not inferred from matching function names.

## 4. Features and behavior that must be preserved

The current `development` navigation exposes:

- Record match
- Tier List
- Tier Side
- Statistics
- Model comparison

The uploaded archive exposes a different set:

- Record match
- Tier List
- Tier S 30+
- Tier Side
- Statistics

The current branch therefore contains a Model Comparison page that is absent from the archive, while the archive has a separate Tier S 30+ page that is absent from the current navigation. Do not replace one set with the other implicitly.

Other preservation requirements:

- Existing Supabase schema, RPCs, Edge Functions, RLS/security settings, and stored match data.
- Hero catalogue and eligibility rules, aliases, portraits, map assets, and Phantimal behavior.
- Draft order ON and OFF behavior. The current `draft-rules-1322.js` explicitly defines ON as BLUE 1 → RED 1 → RED 2 → BLUE 2 → BLUE 3 → RED 3 and OFF as BLUE 1 → BLUE 2 → BLUE 3 → RED 1 → RED 2 → RED 3.
- Match submission, Cloudflare Turnstile, winner selection, draft-known flags, and saved match format.
- Current Match Indicator, Showdown Draft Indicator, Tier List, TOP Picks, and Model Comparison behavior unless a separate, explicitly scoped task authorizes changes.

Current `development` contains six Supabase migrations. The archive contains no `.sql` migrations, so it cannot be used as a complete backend baseline.

## 5. Safe migration decision

Do **not** perform a wholesale frontend replacement from this archive.

The safe direction is incremental cleanup of the current `development` runtime:

1. Keep the current root `index.html` and its feature set as the baseline.
2. Treat the generated modules actually loaded by `index.html` as the runtime implementation.
3. Treat `tracker-app.js` as a source/reference copy until source-to-module drift is reconciled.
4. Do not run automated split workflows until the drift is resolved.
5. Make one isolated change at a time, test it, and update the progress log.
6. Preserve Supabase and all existing algorithms while doing frontend cleanup.

## 6. Checks performed

- Inspected the archive plan, README, root index, core tracker code, assistant module, split scripts, and relevant GitHub workflows.
- Enumerated archive and current branch file counts.
- Enumerated current navigation pages and script references.
- Checked the root and V2 entry points separately; their relative asset paths exist.
- Compared all nine generated module files with the corresponding marker-delimited source chunks.
- Read current draft-rule sequence definitions.
- No application code was changed.
- No Supabase calls or writes were made.
- No browser/runtime QA was performed in this read-only stage.

## 7. Exit result and next step

**Stage 1 — architecture inventory: complete.**

Stage 2 static validation is now complete and documented in `docs/REFACTOR_CLEANUP_BASELINE_VALIDATION.md`. Next: Stage 3 — add a repeatable automated validation command/CI check for entrypoint asset existence and JavaScript syntax. It must be read-only, must not call Supabase, and must not regenerate or overwrite module files.
