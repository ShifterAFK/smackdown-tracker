# Refactor / cleanup — progress log

**Repository:** `ShifterAFK/smackdown-tracker`  
**Working branch:** `development`  
**Production branch:** `main` — do not modify without explicit approval  
**Started:** 2026-11-25

This log is the durable restart point. Update it in every completed work stage, in the same commit as that stage's deliverable whenever practical.

## Working rules

- Work in small, independently reviewable stages.
- One logical change per commit.
- After each stage: inspect the diff, run the checks available for that stage, record results and the exact next action here.
- Do not promote to `main` without the user's explicit approval after local QA.
- Preserve the existing Supabase database, RPCs, Edge Functions, and asset library unless a separately approved stage proves a change is necessary.
- Do not silently alter existing match indicators, Tier List, TOP Picks, or other established behavior.
- User browser testing is required for interactive UI stages; do not mark those stages complete before the user confirms.

## Stage 0 — source intake and baseline

**Status: completed.** Source intake only; no application or database changes.

### Sources inspected

1. User-provided archive: `smackdown-tracker-refactor-cleanup.zip`
   - Archive header identifier: `6894b1ed727d06041a23b0646ec3efc3991cf473`
   - Files carry archive timestamp `2026-11-19 19:01`.
   - Contains `PLAN.md`, `README.md`, `index.html`, `assets/js/tracker-app.js`, modular JS/CSS, and GitHub Actions workflows.
2. User-provided discussion: `Jest nowy tryb w AFK journej nazwany Showdow Smack.md`
   - Records prior decisions and observations about draft order OFF/ON, TOP Picks, and Tier List.
   - The documented OFF behavior was reported as working; do not regress it.
   - The discussion contains unresolved design debate about how to interpret first picks and match results. Treat it as requirements/context, not as permission to change production algorithms.
3. Current GitHub `development` branch:
   - HEAD at audit time: `9aea2d922c9b3c1b900a83dc02230cc55ece7eb3`
   - Current root `index.html` references the existing production-style page and a large collection of CSS assets.
   - Current `assets/js/tracker-app.js` contains the existing app core, Supabase connection/RPC helper, hero catalogue fallback, draft state and business logic.
   - Current draft-rules implementation is in `assets/js/draft-rules-1322.js`; it has separate ON sequence and OFF next-free-slot logic.
4. Archive `PLAN.md` describes a hybrid frontend rebuild:
   - Keep Supabase schema/RPCs/Edge Function and artwork assets.
   - Rebuild the frontend with vanilla JS ES modules.
   - Planned phases: foundation, draft tracker, assistant, submission, later statistics/tier list, then visual polish.
   - It calls out possible duplicate `render()` logic plus visual issues (VS mark, suggestions, missing tab, Solise portrait). The architecture audit later established that the current entry point loads generated modules, not the monolithic `tracker-app.js`; matching function names alone do not prove duplicate runtime execution.

### Baseline and safety conclusions

- The uploaded archive is a dated snapshot and must not be assumed to equal the current `development` branch.
- Current `development` already contains more functionality than the archive's stated MVP scope (including Tier List, Statistics, and Model Comparison navigation). A wholesale replacement with the archive's MVP would risk removing working features.
- Therefore, do not copy the archive over the current branch. First perform a file-by-file architecture and behavior comparison, then define a migration path that preserves working features.
- No Supabase reads or writes were performed in this stage.
- No files in the application were changed in this stage.
- `main` was not modified.

### Exit result

Source files and the intended rebuild direction are identified. The safe next step is a read-only inventory/diff of the archive against current `development`, including entry points, module loading order, duplicated responsibilities, RPC/Edge Function call sites, and the UI features that must be preserved.



## Stage 1 — read-only architecture inventory

**Status: completed.**  
**Audit:** [`docs/REFACTOR_CLEANUP_ARCHITECTURE_AUDIT.md`](REFACTOR_CLEANUP_ARCHITECTURE_AUDIT.md)

### Findings

- The archive contains 308 files (44 JS, 24 CSS, no SQL migrations); current `development` contains 336 files (47 JS, 27 CSS, six Supabase migrations).
- The archive contains two separate entry points: a root legacy app and a small V2 prototype under `v2/`. V2 asset paths resolve correctly relative to `v2/index.html`; that prototype is not integrated into the root app.
- Current `development` has Record Match, Tier List, Tier Side, Statistics, and Model Comparison. The archive instead has a Tier S 30+ page and no Model Comparison. A wholesale replacement would change the feature set.
- Current runtime loads generated classic-script modules from `index.html`; it does not load `assets/js/tracker-app.js`.
- Five of nine generated modules differ from their marker-delimited chunks in `tracker-app.js`. Running the split workflow could overwrite those module-specific changes. Do not run it until the drift is reconciled.
- Draft order ON/OFF sequences were inspected and recorded; OFF currently fills BLUE 1→2→3, then RED 1→2→3.
- Existing Supabase migrations/data and current indicators must be preserved.

### Validation

- Read-only archive inventory, entry-point/script inspection, module comparison, and draft-rule inspection completed.
- No application code changed.
- No Supabase query or write performed.
- No browser QA performed.

### Exit result

The archive is not a safe drop-in replacement. Continue with incremental cleanup of current `development`, treating the currently loaded generated modules as runtime code and the monolithic file as a reference until drift is reconciled.



## Stage 2 — static baseline validation

**Status: completed.**  
**Report:** [`docs/REFACTOR_CLEANUP_BASELINE_VALIDATION.md`](REFACTOR_CLEANUP_BASELINE_VALIDATION.md)

### Results

- All 38 script references and all 25 CSS references in the current `index.html` resolve to tracked files.
- The 37 executable scripts pass JavaScript syntax parsing. The remaining script reference is a JSON data payload.
- A targeted DOM-ID scan found no confirmed missing static HTML ID; unmatched strings correspond to IDs/prefixes created dynamically.
- RPC names found in the inspected runtime source: `ss_get_config`, `ss_get_stats`, `ss_get_matchups`, `ss_get_first_pick_stats`, `ss_get_side_stats`, `ss_get_showdown_draft_indicator_stats`, `ss_get_model_comparison_stats`.
- No `package.json` or conventional test suite was found.

### Validation limits

No browser execution, mobile interaction test, Turnstile test, Supabase RPC call, or database read/write was performed. Syntax parsing is not runtime QA.

### Exit result

The current development entry point passes the available static baseline checks. No application code or database state changed.


## Stage 3 — automated static validator

**Status: completed; GitHub Actions passed.**

### Changes

- Added `scripts/validate-runtime.py`, a dependency-free validator for local script/stylesheet references in an HTML entry point.
- The validator strips cache query strings, skips remote URLs and JSON data payloads, checks local asset existence, and uses Node.js syntax checking for classic and module scripts.
- Added `.github/workflows/validate-runtime.yml`, triggered by relevant changes on `development`, pull requests targeting `development`, or manual dispatch.
- The workflow has read-only repository permissions. It does not deploy, call Supabase, mutate data, or run module-generation scripts.

### Local checks performed against the same validator source

- Minimal valid fixture: passed.
- Invalid JavaScript fixture: failed as expected.
- Missing stylesheet fixture: failed as expected.
- Uploaded archive root entry point: passed (34 executable JS files, 22 stylesheets).
- Uploaded archive V2 entry point: passed (1 module JS file, 1 stylesheet).

The validator was also run by GitHub Actions against the committed current `development` tree and passed: 37 JavaScript files and 25 stylesheets checked. [Workflow run](https://github.com/ShifterAFK/smackdown-tracker/actions/runs/45602496344).

### Exit result

Validator and workflow implementation complete and green on `development`. No application runtime files or Supabase state changed. `main` remains untouched.

**Next:** confirm the workflow result, then begin the first isolated runtime cleanup only after the check is green.

## Restart point

**Next action:** Stage 4 — confirm the automated validator workflow is green on `development`; then select and isolate the first cleanup target using the architecture audit.

**Do not start:** replacing `index.html`, removing legacy modules, changing Supabase, or changing draft/TOP/Tier algorithms without a separate risk review and explicit scope.
