# Hero Knowledge Normalization Specification

- **Status:** proposal only; not approved for database implementation
- **Branch:** `development`
- **Created:** 2026-11-25
- **Scope:** convert the 131 first-pass Stargazer captures into auditable, patch-aware, ability-level records.
- **No database migration or data import is included.**

## 1. Design principles

1. **Hero identity is stable; knowledge is versioned.** Link records to the existing `ss_heroes.id`. Do not duplicate or rename the tracker roster.
2. **Tags belong to an ability/section, not to the hero as a whole.** Preserve the exact Stargazer label, including qualifiers such as `Opening`, `Single Target`, `AOE`, `Global`, `Self`, `Ally`, and `Tile Effect`.
3. **Do not infer missing facts.** An omitted tag in a truncated excerpt is unknown, not an empty tag set. An explicit page with no tags can be represented as an empty set with evidence.
4. **Separate base kit from progression.** Ultimate and other base skills must not be mixed with Hero Focus, Exclusive Equipment, Enhance Force, Season Charm or Rivalry Mode.
5. **Keep source text and interpretation distinct.** Store a concise structured description separately from derived functional summaries. Never convert a model interpretation into a source fact.
6. **Unknown patch is a valid value.** Do not assume the newest indexed Stargazer page corresponds to a particular live patch.
7. **Conflicts remain visible.** If Stargazer, AFK.global, official patch notes or in-game observations disagree, preserve both claims with provenance and mark the conflict for review.

## 2. Proposed logical entities

| Entity | Purpose | Key fields |
|---|---|---|
| `hero_knowledge_versions` | A hero's knowledge snapshot for a patch/season | `id`, `hero_id`, `patch_label`, `season_label`, `valid_from`, `valid_to`, `status` |
| `hero_knowledge_sources` | Source page and retrieval provenance | `id`, `knowledge_version_id`, `source_name`, `source_url`, `source_locale`, `retrieved_at`, `source_updated_at`, `source_patch_label` |
| `hero_abilities` | One base ability or one progression section | `id`, `knowledge_version_id`, `ability_key`, `name`, `section_type`, `order_index`, `cooldown`, `initial_cooldown`, `range`, `initial_energy`, `description`, `conditions`, `scaling` |
| `ability_effect_tags` | Exact mechanic tags on a specific ability/section | `id`, `ability_id`, `raw_tag`, `tag_family`, `qualifier`, `source_evidence_id` |
| `hero_knowledge_evidence` | Claim-level source support and review status | `id`, `source_id`, `ability_id`, `claim_path`, `evidence_summary`, `review_status`, `reviewed_at`, `reviewer` |

This is a logical model, not a migration. Table names and foreign-key strategy must be reviewed against existing Supabase conventions before implementation.

## 3. Section types

Use a closed enum so the frontend and analysis code can filter reliably:

- `ultimate`
- `base_skill`
- `hero_focus`
- `exclusive_equipment`
- `enhance_force`
- `season_charm`
- `rivalry_mode`
- `targeting_rule`
- `tile_effect`

A section can contain multiple mechanics. Do not split a single Stargazer ability into multiple fake abilities just because it has several tags.

## 4. Tag representation

Always retain the raw source label. Parsed fields are optional helpers, not replacements.

Example:
```json
{
  "raw_tag": "Temp Buff (Opening, Single Target)",
  "tag_family": "Temp Buff",
  "qualifier": ["Opening", "Single Target"]
}
```

For tags whose syntax does not fit a deterministic parser, set `tag_family` and `qualifier` to null and retain `raw_tag` unchanged.

Do not normalize semantically similar but differently named tags into one canonical label without an explicit mapping table and review.

## 5. Ability record shape

Illustrative JSON record (values are examples of structure, not a full imported hero record):

```json
{
  "hero_id": "lily-may",
  "knowledge_version": {
    "patch_label": null,
    "season_label": null,
    "status": "first_pass_captured"
  },
  "source": {
    "name": "AFK Stargazer",
    "url": "https://afkstargazer.com/en/skill/lily-may",
    "locale": "en",
    "retrieved_at": "2026-11-25T00:00:00Z",
    "source_patch_label": null
  },
  "sections": [
    {
      "ability_key": "ultimate",
      "name": "Tempest Shot",
      "section_type": "ultimate",
      "order_index": 1,
      "cooldown": null,
      "initial_cooldown": null,
      "range": null,
      "initial_energy": null,
      "description": "Interrupts an enemy Ultimate and removes Energy.",
      "scaling": [],
      "tags": [
        { "raw_tag": "Energy Denial", "tag_family": "Energy Denial", "qualifier": [] },
        { "raw_tag": "Ult Denial", "tag_family": "Ult Denial", "qualifier": [] }
      ],
      "capture_status": "captured",
      "evidence_status": "single_source"
    }
  ]
}
```

Do not fill missing cooldown/range/energy values with zero. Use null when the source does not expose the value.

## 6. Capture and verification states

Recommended status values:

- `discovered` — page URL mapped to a roster hero.
- `first_pass_captured` — all visible page sections captured and summarized.
- `normalized` — structured hero/ability/tag records created.
- `cross_checked` — material claims compared with a second reliable source.
- `in_game_verified` — confirmed against a specified live game build.
- `conflict` — sources disagree; resolution pending.
- `needs_review` — source excerpt incomplete, ambiguous or malformed.

Do not collapse these into one boolean `verified`.

## 7. Versioning and source provenance

For every knowledge snapshot, retain:
- tracker hero ID and display name;
- exact source URL and locale;
- retrieval timestamp;
- source-reported update date, patch or season if explicitly available;
- source type (community database, official patch notes, in-game observation);
- claim-level review status;
- prior version relationship (`supersedes_version_id`) if the knowledge changes.

If the page changes and no source patch label is available, create a new capture revision rather than silently overwriting historical values.

## 8. Normalization workflow

1. Use the source manifest as the roster-to-page index.
2. Parse each page into named sections in the order displayed by Stargazer.
3. Store base abilities and progression sections separately.
4. Attach raw tags to the exact section where Stargazer displays them.
5. Preserve numeric level scaling as structured level/value entries, not prose-only text.
6. Record targeting and tile geometry separately when the page provides explicit rules/diagrams.
7. Flag ambiguous wording, truncated excerpts and missing sections as `needs_review`.
8. Run structural checks: 131 unique tracker hero IDs, no orphan abilities/tags, no duplicate ability keys within one hero version, every tag tied to source evidence.
9. Cross-check a prioritized sample against AFK.global and official patch notes; retain conflicts.
10. Only after review, prepare a dry-run import report. Do not write to Supabase as part of normalization.

## 9. Required validation before import

- Exactly 131 unique hero IDs match the current `ss_heroes` roster.
- No out-of-roster page (for example, Thane) is silently imported.
- `gala` maps to Galahad; `taichi` and `yamato` retain their Stargazer paired-hero aliases.
- All source URLs are present and locale is explicit.
- All ability tags are ability-level, not copied to every ability on a hero.
- Progression sections are not mistaken for base abilities.
- Unknown values remain null/unknown.
- Every normalized claim can be traced to a source URL and retrieval timestamp.
- Patch/version uncertainty is visible in UI and analysis output.

## 10. Out of scope

- No Supabase schema migration or insert/update.
- No changes to Match Indicator, Showdown Draft Indicator, Tier List or TOP Picks.
- No automatic hero-role labels inferred from faction/class.
- No composition score or synergy/counter formula.
- No claims of patch accuracy until in-game/official validation is performed.


## 5.1. Important distinction for the existing extraction batches

The 24 Markdown extraction batches contain concise **paraphrased capture summaries**, not guaranteed verbatim Stargazer descriptions. When normalizing those files:

- Store the paraphrase as `description_summary`.
- Leave `description_raw` null until the exact source wording has been transcribed.
- Preserve `description_kind` / provenance so downstream analysis cannot mistake a summary for a quotation.
- Keep page-level tags in a separate `page_tags` field until a specific ability mapping is explicitly captured.
- For an ability with no per-skill mapping in the batch, use `tags: null` and a status such as `not_explicitly_recorded_in_batch`. Do not convert this to an empty tag set.
- Use `tags: []` only when the source explicitly establishes that the section has no tags.

The three-hero pilot at `docs/data/HERO_KNOWLEDGE_NORMALIZED_PILOT.json` follows these rules. It is a schema/normalization pilot, not an approved import dataset.


## Extension — Season Charm vs Season Skill (2026-11-25)

Keep these as separate progression systems:

- `season_charm`: AFK Stargazer's Season Charm effect, including Elite/Epic/Legendary/Mythic tiers.
- `season_skill`: AFK.global's Season skill progression (for example Focus Hit, Lock-on Projectiles, Soul-lifting Touch), including its own levels.

Do not map a Season Skill into `season_charm`, replace one with the other, or treat differences as a conflict without a shared patch/version context. Store secondary-source Season Skill observations separately from primary-source Stargazer sections until the schema has an explicit source-aware representation.

## Extension — source capture method and review

Record whether a source was directly fetched or only available through indexed search content. An indexed-page capture can resolve a missing section name/content for a dry run, but it remains `pending_direct_page_fetch` when the live page could not be opened. Source patch/version remains unknown unless explicitly shown.
