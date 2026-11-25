# Hero Knowledge Extraction — Batch 26
## Contess current Ultimate source recapture

- **Date:** 2026-11-25
- **Primary source:** https://afkstargazer.com/en/skill/contess
- **Capture method:** Indexed page content; direct page open returned cache miss.
- **Patch label:** Not exposed.
- **Purpose:** Resolve the same-name base_skill/Ultimate type conflict and current-description variance for Detention Pass.

### Contess — tracker ID: `contess`
Source: https://afkstargazer.com/en/skill/contess

- **Ultimate — Detention Pass:** At battle start, Contess hides in her rulebook, cannot move or act, cannot be targeted and recovers Energy each second. She enters when her Energy is full, an enemy violates a rule, or all other allies are defeated. The active Ultimate heals a target ally and grants Exemption. While that ally remains above 40% HP, it loses a small amount of max HP each second, converting part of the loss into a capped shield; the shield also increases the ally's ATK.
- **Parameters:** Cooldown 0; initial cooldown 0; range Global; initial Energy 300.
- **Ability-level tags:** Not shown in the indexed section capture; keep null. Page-level mechanic tags remain separate.

**Historical variant retained:** Batch 16 and Batch 21 summaries included an additional effect healing the two weakest allies and reducing ATK of the two highest-damage enemies. The current indexed primary page does not show that effect. Keep it as a historical description variant pending direct page/version verification; do not silently blend it into the current description.
