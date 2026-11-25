# Hero Knowledge Extraction — Batch 26
## Contess current Ultimate source recapture

- **Date:** 2026-11-25
- **Primary source:** https://afkstargazer.com/en/skill/contess
- **Capture method:** Indexed page content; direct page open returned cache miss.
- **Patch label:** Not exposed.
- **Purpose:** Correct the same-name base_skill/Ultimate type conflict and recapture the current Ultimate description.

### Contess — tracker ID: `contess`

- **Ultimate — Detention Pass:** At battle start, Contess hides in her rulebook, cannot move or act, cannot be targeted and recovers Energy each second. She enters when her Energy is full, an enemy violates a rule, or all other allies are defeated. The active Ultimate heals a target ally and grants Exemption. While that ally remains above 40% HP, it loses a small amount of max HP each second, converting part of the loss into a capped shield; the shield also increases the ally's ATK.
- **Parameters:** Cooldown 0; initial cooldown 0; range Global; initial Energy 300.
- **Ability-level tags:** No separate tag label is displayed under the Ultimate heading; keep null.

**Correction recorded in Batch 27:** The additional active effect healing the two weakest allies and reducing ATK of the two highest-damage enemies is the active effect of the separate base skill **Mandatory Civility**. It was misattributed to Detention Pass in older summaries. Batch 27 recaptures Mandatory Civility and reassigns that evidence. It is not a historical alternate Ultimate effect.
