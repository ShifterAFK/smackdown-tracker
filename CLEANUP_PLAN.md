# Cleanup Plan & Workflow

## Branching model

- `main` — production, always working. Never experiment directly here.
- `pre-release` — staging branch, created 1:1 from `main`. Changes land here after verification on feature branches.
- `feature/<name>` — short-lived branches created from `pre-release`, one goal per branch.

Flow: `feature/*` -> PR -> `pre-release` -> verify -> merge -> (when stable) PR -> `main` -> verify -> merge.

## Rules for LLM-assisted work

1. Before any change: fetch the CURRENT file state from the target branch (never work from memory).
2. One feature branch = one goal.
3. Every PR includes: what changes, which files, how to verify.
4. Never declare "fixed" without user confirmation in the browser.
5. No parallel experiments — one thing at a time.

## Cleanup steps

### Step 0 — Branch hygiene
- Delete stale branches (`refactor/js-modules`, `refactor/css-modules`) manually in GitHub UI.
- Keep only `main` and `pre-release`.

### Step 1 — Remove base64 from CSS (biggest win)
- `tracker-styles.css` contains a huge base64-encoded VS image; the same image exists as `assets/img/ui/vs.webp`.
- Remove the base64 from CSS; VS image loads from the .webp file (already handled by `ui-assets.js`).
- Expected: CSS drops from ~102 KB to ~60-70 KB.
- Verify: VS still displays, page looks identical.

### Step 2 — Consolidate CSS (2-3 days, incremental)
- Merge the many `polish`/`usability`/`compact` override files into 3-4 semantic modules:
  - `base.css` (variables, typography, buttons, cards)
  - `layout.css` (header, nav, page grid)
  - `features.css` (map, slots, statistics, tier list)
  - `assistant.css` (Draft Assistant and suggestion cards)
  - `mobile.css` (all media queries in one place)
- Verify: page looks identical after each consolidation (before/after comparison).

### Step 3 — Consolidate JS (later)
- `tracker-app.js` is already split into 10 modules — keep that.
- Clean up redundant `polish`/`compact`/`snapshot` scripts — merge into fewer semantic modules.
- Verify: draft, submit, statistics, tier list after each consolidation.

### Step 4 — Hover skins & VS/assistant (only if still broken)
- On `main` skins and VS work — do NOT touch preemptively.
- Only add `portrait-skin-hover.js` to `index.html` if hover actually breaks on `main`.

### Step 5 — Process going forward
- Every task = GitHub Issue.
- Every fix = small PR linked to the Issue.
- Board: To do / In progress / Done.
- LLM rule: plan + verification method FIRST, code SECOND. Never the reverse.
