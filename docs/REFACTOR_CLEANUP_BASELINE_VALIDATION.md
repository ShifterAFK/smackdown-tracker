# Baseline validation — current development runtime

**Date:** 2026-11-25  
**Branch:** `development`  
**Development HEAD at validation start:** `a616cbba63dfec08b951c8edd18b84216d4ca384`  
**Entry point:** `index.html` (blob `babe2ac8592ffce1d707c749b06c43a4455fef38`)

## 1. Entrypoint asset references

| Check | Result |
|---|---:|
| Script references in `index.html` | 38 |
| Missing script paths | 0 |
| CSS references in `index.html` | 25 |
| Missing CSS paths | 0 |

The 38 script references include one `application/json` data payload (`solise-voice-data.js`); the other 37 are executable classic scripts.

## 2. JavaScript syntax

All 37 executable scripts referenced by the current `index.html` were fetched from `development` and parsed independently using the JavaScript engine's syntax parser (`new Function(source)`). All 37 parsed without a syntax error.

This is a syntax-only check. It does not execute scripts and does not validate browser APIs, DOM timing, network requests, or user interactions.

## 3. Literal DOM ID references

- Static IDs in current `index.html`: 80.
- Literal DOM ID references found in the core/runtime feature files inspected: 79.
- The unmatched literal strings are dynamically created IDs or prefixes (for example, the Draft Assistant UI is built in JavaScript, and slot/winner/known IDs are assembled from side names). No confirmed missing static HTML ID was found in this pass.

This is a targeted static scan, not a full DOM contract test.

## 4. RPC inventory

The current runtime feature modules inspected call these Supabase RPCs:

- `ss_get_config`
- `ss_get_stats`
- `ss_get_matchups`
- `ss_get_first_pick_stats`
- `ss_get_side_stats`
- `ss_get_showdown_draft_indicator_stats`
- `ss_get_model_comparison_stats`

This inventory was extracted from source code only. No RPC was called and no Supabase state was read or changed.

## 5. Test/build infrastructure

- No root `package.json` exists.
- No conventional `test/`, `tests/`, `spec/`, or `*.test.*` files were found in the current tracked tree.
- Existing GitHub Actions are primarily asset/module maintenance workflows; no dedicated runtime validation workflow was identified in the inspected project tree.
- The repository uses a hand-maintained script order in `index.html`, so loading order remains part of the runtime contract.

## 6. Results and limitations

**Passed:**
- All current entrypoint script paths exist.
- All current entrypoint CSS paths exist.
- All 37 executable scripts pass syntax parsing.

**Not tested:**
- Actual browser execution on desktop or mobile.
- Supabase connectivity, RPC response contracts, or database permissions.
- Cloudflare Turnstile and match submission.
- Drag/drop, mobile tap behavior, map selection, Phantimal derivation, and draft order interactions.
- Visual regressions.

No application code or database state was changed in this stage.

## 7. Exit result and next step

**Stage 2 — static baseline validation: complete.**

Next: Stage 3 — add a repeatable automated validation command/CI check for entrypoint asset existence and JavaScript syntax. It must be read-only, must not call Supabase, and must not regenerate or overwrite module files.
