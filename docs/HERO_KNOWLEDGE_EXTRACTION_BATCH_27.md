# Hero Knowledge Extraction — Batch 27
## Contess full-page section and tag reconciliation

- **Date:** 2026-11-25
- **Primary source:** https://afkstargazer.com/en/skill/contess
- **Capture method:** Full indexed primary-page content. Direct page open returned cache miss.
- **Patch label:** Not exposed.
- **Purpose:** Correct the Detention Pass / Mandatory Civility misattribution and capture per-section tags.

### Contess — tracker ID: `contess`

**Ultimate — Detention Pass**
- Cooldown 0; initial cooldown 0; range Global; initial Energy 300.
- Contess begins hidden, untargetable and recovering Energy. When a reveal condition is met, the active Ultimate heals one ally and grants Exemption. Exemption converts part of ongoing HP loss into a capped shield and increases the protected ally's ATK.
- No separate section-level tag label is displayed under the Ultimate heading.

**Base skill — Mandatory Civility**
- Cooldown 10; initial cooldown 8; range Global.
- Tag: `Debuff (Single Target)`.
- Tracks major HP/shield loss as a rule violation and identifies the enemy contributing most to that loss. An allied violator also receives healing. In Boss battles, the highest-damage unit on each side is checked every 10 seconds.
- Active effect: heals the two weakest allies and reduces ATK of the two highest-damage enemies for 6 seconds.
- Levels 2–4 increase the active healing.

**Base skill — Quiet Period**
- Cooldown 12; initial cooldown 10; range 10.
- Tags: `Debuff (Single Target)`, `Energy Denial`.
- Ultimate casts trigger Be Quiet violations, limited to once per unit every 6 seconds. Contess reduces Energy recovery efficiency for the two enemies with the most Ultimate casts for 6 seconds.

**Hero Focus**
- Range 1.
- Tags: `Debuff (Single Target)`, `Energy Denial`.
- Enemy rule violations permanently reduce ATK and Energy recovery efficiency, subject to separate caps.

**Exclusive Equipment — Expulsion Notice**
- Range 10.
- Tags: `Debuff (Single Target)`, `DoT`, `Ult Denial`.
- Units punished more than six times are permanently expelled and silenced and suffer increased HP loss. Exempt allies are excluded. Higher ranks increase the HP-loss penalty and convert part of that loss into healing.

**Rivalry Mode**
- The first ally to fall below 40% HP is healed and shielded; Refine 4 adds Healing and Haste.

**Enhance Force**
- Cooldown 0.
- Tag: `Ult Denial`.
- Stuns Be Civil violators and silences Be Quiet violators in regular battles; applies one extra punishment in Boss battles.

**Season Charm**
- Tag: `Temp Buff`.
- Healing an ally increases their ATK for 8 seconds. Higher ranks improve the bonus and add Healing after a cumulative-healing threshold.

## Correction to Batches 16 and 21

The additional active effect that heals the two weakest allies and reduces ATK of the two highest-damage enemies is **Mandatory Civility**, not a second active effect of Detention Pass. The old summaries remain in the evidence history but are reassigned to Mandatory Civility. The current Detention Pass summary remains the one captured in Batch 26.

## Tag handling

Page-level tags (`Debuff (Single Target)`, `DoT`, `Energy Denial`, `Temp Buff`, `Ult Denial`) remain separate from per-section tags. The per-section tags above are recorded only where they are displayed under the corresponding section heading.
