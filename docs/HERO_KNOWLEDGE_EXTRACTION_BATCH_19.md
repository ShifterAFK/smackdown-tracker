# Hero Knowledge Extraction — Batch 19 (recapture pass 6)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** close remaining missing sections for nine profiles and preserve the one profile still lacking full base-skill capture.
- **Scope:** documentation only. No Supabase writes.

This batch supplements earlier partial records; it does not replace their source notes. Combined batch references are stated per hero.

## Profiles upgraded to complete first-pass captures

### Evie — tracker ID: `evie`

Sources:
- https://afkstargazer.com/en/skill/evie
- Prior details: Batch 15

Newly recaptured sections:
- **Tactical Briefing (Exclusive Equipment):** when Evie gathers intel on every surviving enemy hero without being revealed, she shares the findings with allies. The affected enemies deal reduced damage for the rest of the battle; in non-Boss battles, dispellable debuffs they inflict on allies also have reduced duration. Higher levels increase the reductions and cause enemies to take additional magic damage after the findings are shared.
- **Enhance Force:** `Temp Buff (Single Target)`; after gathering intel on all surviving enemy heroes while concealed, Evie summons an extra quill to follow the ally with the second-highest cumulative damage dealt. Each ally can only be followed by one quill.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s; higher ranks increase Evie's Healing after the total-healing threshold.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine grants Healing and Haste.

Together with Batch 15's Ultimate, Pointed Proof, Foretold Favor and Hero Focus capture, this closes the visible ability and progression sections.

### Lamentis — tracker ID: `lamentis`

Sources:
- https://afkstargazer.com/en/skill/lamentis
- Prior details: Batch 18

Full recapture confirms:
- **Ultimate — Malevolent Gaze:** `Debuff (Single Target)`; apostles stun different frontmost enemies, then Lamentis damages all enemies and apostles reduce the max HP of stunned targets. Lamentis and apostles gain ATK SPD after casting.
- **Starcrusher:** every third normal attack throws an enchanted trident, dealing ATK damage plus target-max-HP-based extra damage with an ATK cap.
- **Astral Fission:** `Summon`; sacrifices HP to create two apostles that inherit Lamentis's stats, attack his current target and merge back if they survive, healing him based on their actual damage.
- **Hero Focus:** increases ATK SPD for Lamentis and his apostles; bonus increases with each apostle present.
- **Exclusive Equipment — Omnisight:** `Summon`; apostles gain Growth stacks from normal attacks; their Growth is transferred to Lamentis when they merge. At max Growth, Six Eyes unlocks, allowing free apostle creation and enhanced Starcrusher true damage.
- **Enhance Force:** when an apostle has a stat buff from an ally other than Lamentis, Lamentis gains 10% of that buff.
- **Season Charm:** increases ATK and Phys & Magic DEF for Lamentis and units he creates; higher ranks add Haste after 5 s.
- **Rivalry Mode:** normal attacks stack ATK SPD and normal attack damage; refine adds ATK SPD and Execution.

### Aster — tracker ID: `aster`

Sources:
- https://afkstargazer.com/en/skill/aster
- Prior details: Batches 15 and 18

Newly recaptured sections:
- **Hero Focus:** increases ATK; summoning Stars adds more ATK up to a cap; converting Stars into Black Holes grants another ATK increase.
- **Exclusive Equipment — Starless Hollows:** `Debuff (AOE)`, `DoT`; after summoning three Stars, permanently converts Stars into Black Holes and devours orbiting Planets. Black Holes deal periodic true damage and target-max-HP-based true damage to nearby enemies.
- **Enhance Force:** expands Gravitic Maw's pull range to 3 tiles. Before converting Stars, Aster gains Energy recovery efficiency; after conversion he ascends and becomes permanently invincible until he is the last surviving hero on his team.
- **Season Charm:** recovers Energy per second; after three Ultimates, increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Rivalry Mode:** first Ultimate permanently increases Energy recovery from attacking; Ultimate casts grant temporary damage dealt bonus. Refine adds Haste and Execution.

Together with Batch 15's Ultimate, Gravitic Maw and Darklight Pulse capture, this closes the visible kit.

### Soren — tracker ID: `soren`

Sources:
- https://afkstargazer.com/en/skill/soren
- Prior details: Batch 17

Newly recaptured sections:
- **Deflecting Swing:** reduces damage from a single attack exceeding 10% of Soren's max HP and resets Repel Sweep cooldown; can trigger once every 7 s.
- **Hero Focus:** increases Haste.
- **Exclusive Equipment — Dusk Rejuvenation:** below 60% HP, grants Haste, HP recovery and Energy recovery for 12 s; higher levels remove control effects and can allow repeated triggers with a cooldown.
- **Enhance Force:** after Deflecting Swing triggers, next Repel Sweep knocks enemies back farther and deals bonus damage based on damage blocked. LV 2 adds Energy, a shield and refreshes Deflecting Swing when knockback collision conditions are met.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken per enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Crit Resist, Haste and Ranged DEF.

Together with Batch 17's Ultimate and Repel Sweep capture, this closes the visible kit.

### Florabelle — tracker ID: `florabelle`

Sources:
- https://afkstargazer.com/en/skill/florabelle
- Prior details: Batch 17

Newly recaptured sections:
- **Enhance Force:** allied Bulbsprites in giant form are immune to control effects. LV 2 reduces Overgrowth cooldown to 5 s, allows it to affect Smashy, Swifty and Spiny simultaneously, and grants giant allied summons extra ATK.
- **Season Charm:** increases ATK and Phys & Magic DEF for Florabelle and units she creates; higher ranks add Haste after 5 s.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Haste and Crit DMG DEF.

Together with Batch 17's Pounding Blow, Overgrowth, Tiny Sharpshooter, Hero Focus and Exclusive Equipment capture, this closes the visible kit.

### Zandrok — tracker ID: `zandrok`

Sources:
- https://afkstargazer.com/en/skill/zandrok
- Prior details: Batches 15 and 17

Newly recaptured sections:
- **Shock Stomp:** damages enemies within 1 tile based on Zandrok's max HP and stuns them.
- **Hero Focus:** increases max HP; adds more max HP while Rallying Roar's temporary buffs are active.
- **Exclusive Equipment — Hunter's Fury:** while above 50% of initial max HP, normal attacks deal extra damage based on max HP. Higher level improves the bonus and empowers the next normal attack of allies inspired by Rallying Roar.
- **Enhance Force:** converts excess healing received into extra max HP, capped at 50% of initial max HP.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Crit Resist and Haste.

Together with Batch 15's Savage Slash and Rallying Roar capture, this closes the visible kit.

### Brutus — tracker ID: `brutus`

Sources:
- https://afkstargazer.com/en/skill/brutus
- Prior details: Batch 15

Newly recaptured sections:
- **Indomitable:** after the first fatal blow, Brutus becomes immune to all damage and unaffected for 5 s; higher levels grant Life Drain and ATK during immunity.
- **Hero Focus:** increases Life Drain, with an extra bonus when casting Whirlwind Wrath.
- **Exclusive Equipment — Cleaving Strike:** after receiving physical damage 10 times from adjacent enemies, cleaves enemies in a frontal arc for ATK and target-max-HP-based damage, and gains Life Drain. Higher level removes the cooldown limit.
- **Enhance Force:** increases the duration of damage immunity and unaffected status from Indomitable by 1 s.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken per enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Life Drain and Crit DMG DEF.

Together with Batch 15's Ultimate and Ferocious Roar capture, this closes the visible kit.

### Alna — tracker ID: `alna`

Sources:
- https://afkstargazer.com/en/skill/alna
- Prior details: Batch 15

Newly recaptured sections:
- **Hero Focus:** reduces damage taken; the reduction increases every 10 s, stacking up to five times.
- **Exclusive Equipment — Chilling Presence:** `Cheat Death (Self, Ally)`, `Invincibility`; at battle start and every 20 s, Alna becomes immune to damage and control. Higher level extends the duration and grants the same immunity to the Winter Warrior; the first time either drops below 50% HP, it triggers automatically for both.
- **Enhance Force:** `Debuff (AOE)`; Alna and Winter Warrior gain increased basic stats until one is defeated. The first time either leaves Chilling Presence, nearby enemies are frozen and lose Vitality.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken per enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Crit Resist and Ranged DEF.

Together with Batch 15's Winter Anthem, Shared Resolve and Wild Whirl capture, this closes the visible kit.

### Lorsan — tracker ID: `lorsan`

Sources:
- https://afkstargazer.com/en/skill/lorsan
- Prior details: Batches 16 and 17

Newly recaptured sections:
- **Zephyr's Embrace:** `Haste (Single Target)`, `Temp Buff (Single Target)`; protects the weakest ally for 6 s, granting Dodge, Haste and periodic healing.
- **Hero Focus:** increases Lorsan's ATK; when Stormbound Chain breaks for the first time, he gains an additional ATK bonus.
- **Exclusive Equipment — Turbulent Resurgence:** when Stormbound Chain breaks, heals all allies and casts the chain again, up to three casts per battle. Higher levels improve healing and stun the last linked enemies.
- **Enhance Force:** `Debuff (Single Target)`, `Haste (Single Target)`, `Temp Buff (Single Target)`; while Zephyr's Embrace is active, its target becomes unaffected. LV 2 increases chain casts, adds max-HP reduction to transferred damage and grants/extends Zephyr's Embrace on the ally dealing the most damage when the chain breaks.
- **Season Charm:** opening melee-damage bonus and ranged damage reduction for the ally one tile in front; higher ranks add Energy on Hit.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine adds Healing and Assistance.

Together with Batch 16's Whispering Tempest, Stormbound Retribution and Season Charm capture, this closes the visible kit.

## Profile still partial

### Sylphira — tracker ID: `sylphira`

Source: https://afkstargazer.com/en/skill/sylphira

Newly recaptured sections:
- **Hero Focus:** increases Haste; each beat lit adds Haste, and activating her score grants another Haste bonus.
- **Exclusive Equipment — Harmonic Refrain:** when her score is activated, automatically plays it every 8 s, removes dispellable debuffs, restores HP and Energy, and speeds up the score/increases Haste as more beats are collected. Higher level damages nearby enemies based on max HP.
- **Enhance Force:** after the score activates, Tremolo enhances normal attacks with Life Drain and target-max-HP-based true damage.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Status remains partial:** returned excerpt does not yet include all remaining base skill descriptions and/or Rivalry Mode refinements.

## Coverage update

- Nine profiles upgraded from partial to complete first-pass captures: Evie, Lamentis, Aster, Soren, Florabelle, Zandrok, Brutus, Alna and Lorsan.
- Sylphira gained missing progression sections but remains partial.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
