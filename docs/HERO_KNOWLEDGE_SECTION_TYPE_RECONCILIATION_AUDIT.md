# Hero Knowledge — Section Type Reconciliation

**Date:** 2026-11-25  
**Status:** 9 same-name base-skill/Ultimate duplicates found; 8 resolved, 1 content variant retained for review.

| Hero | Ability | Conflicting captures | Current primary-page label |
|---|---|---|---|
| Atalanta | Wild Sniper | Batch 20 base skill / Batches 01, 22 Ultimate | Ultimate |
| Berial | Scared Swamp | Batch 17 base skill / Batch 23 Ultimate | Ultimate |
| Contess | Detention Pass | Batch 16 base skill / Batches 09, 21 Ultimate | Ultimate |
| Igor | Funereal Ring | Batch 18 base skill / Batches 07, 21 Ultimate | Ultimate |
| Marilee | Mid-Air Shot | Batch 18 base skill / Batches 09, 21 Ultimate | Ultimate |
| Orion | Fatal Waltz | Batch 17 base skill / Batch 21 Ultimate | Ultimate |
| Thoran | Soul Retaliation | Batch 17 base skill / Batches 07, 22 Ultimate | Ultimate |
| Valka | Blooming Terror | Batch 18 base skill / Batch 03 Ultimate | Ultimate |
| Voracia | The Main Course | Batch 18 base skill / Batches 07, 21 Ultimate | Ultimate |

## Resolution

The current AFK Stargazer pages explicitly label each named ability as the Ultimate and list different base skills. The duplicate `base_skill` logical record is therefore merged into the corresponding `ultimate` record. All source evidence, summaries, source ability keys and order observations are retained.

**Contess exception:** Batch 16's same-name record contains an additional active-effect description not present in the current indexed primary page. It is preserved as a description variant and marked for content review; it is not silently discarded or treated as verified current behavior.

## Primary source pages

- https://afkstargazer.com/en/skill/atalanta
- https://afkstargazer.com/en/skill/berial
- https://afkstargazer.com/en/skill/contess
- https://afkstargazer.com/en/skill/igor
- https://afkstargazer.com/en/skill/marilee
- https://afkstargazer.com/en/skill/orion
- https://afkstargazer.com/en/skill/thoran
- https://afkstargazer.com/en/skill/valka
- https://afkstargazer.com/en/skill/voracia

No source tag values are changed by this reconciliation. No Supabase writes or application changes.
