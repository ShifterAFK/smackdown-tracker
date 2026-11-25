# Hero Knowledge Extraction — Batch 17 (recapture pass 4)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** recapture full ability records for another set of partial profiles.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Seth — tracker ID: `seth`

Source: https://afkstargazer.com/en/skill/seth

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`.
**Ability tags visible:** Enhance Force `Debuff (Single Target)`; Season Charm `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Shadow Strike:** flashes to an enemy, hits three times, freezes briefly and jumps for an additional hit. Seth becomes invincible and recovers HP based on total damage dealt. Prioritizes the weakest enemy.
- **Predator's Lunge:** pounces on the weakest enemy, dealing ATK damage plus bonus damage based on the target's lost HP, with an ATK-based cap.
- **Hunter Instinct:** gains Bloodlust stacks when non-summoned enemies first fall below HP thresholds. Each stack permanently increases Haste and Life Drain; first trigger also grants Phys & Magic DEF.
- **Hero Focus:** increases ATK by 12/16/20%.
- **Exclusive Equipment — Hunting Spree:** when a non-summoned enemy is defeated, resets Predator's Lunge cooldown and restores Energy. Higher levels increase repeated-cast damage and Energy recovery.
- **Enhance Force:** `Debuff (Single Target)`; if Seth has Bloodlust when casting Predator's Lunge, reduces the target's Phys DEF by an extra 15% per stack for 6 s.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken for each enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Crit, Execution and Crit DMG Boost.

### Karma — tracker ID: `karma`

Source: https://afkstargazer.com/en/skill/karma

**Page tag:** `Debuff (AOE)`.
**Ability tag visible:** Season Charm `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Unfettered Carnage:** strikes an enemy for 400% ATK and stuns them; after 1 s, an explosion deals additional damage based on healing Karma has received since the previous cast. Karma heals for each non-summoned enemy hit, with healing increasing for each non-summoned enemy defeated during battle.
- **Toxic Mosh Pit:** leaves a 1-tile-radius pool for 6 s that damages enemies and heals Karma each second; Mar also swings his axe to damage nearby enemies.
- **Bottled Bloodlust:** Kar drinks a potion and heals over 5 s; Mar performs a three-hit axe flurry, with the final hit knocking targets down.
- **Hero Focus:** increases Vitality by 11/15/19.
- **Exclusive Equipment — Sanguine Growth:** healing received increases Karma's max HP, up to a cap. At max stacks, he gains Phys & Magic DEF and Resilience, and his skills' damage range increases.
- **Enhance Force:** while affected by his own potions, Karma takes 50% less damage; does not stack.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken per enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Vitality and Crit Resist.

### Silvina — tracker ID: `silvina`

Source: https://afkstargazer.com/en/skill/silvina

**Per-skill tags:**
- Ultimate — Shadow Slayer: `Energy Denial`
- First Strike: `Special Target`
- Exclusive Equipment — Shield of Light: `Debuff (AOE)`
- Enhance Force: `Debuff (Single Target)`

**Captured kit:**
- **Shadow Slayer:** deals 300% ATK to an enemy and reduces their Energy by 200; damage scales to 360% ATK and Energy reduction to 300.
- **First Strike:** marks the closest enemy in a symmetrical position, teleports Silvina next to them at battle start and deals damage. Higher level stuns the target for 5 s.
- **Targeting:** first checks the tile mirrored across the center of the grid. If empty, searches outward in a clockwise spiral; direction differs for ally and enemy sides.
- **Blade Vortex:** normal attacks become Whirl Assault for the first 12 s; defeating the marked enemy extends the duration.
- **Hero Focus:** increases Crit by 24/32/40.
- **Exclusive Equipment — Shield of Light:** after First Strike, gains a shield; higher level frightens enemies around a defeated marked target while Blade Vortex is active.
- **Enhance Force:** reduces the target's Vitality with each Whirl Assault. LV 2 increases First Strike damage, attack speed and adds lost-HP-based damage against the marked enemy; if allied Isabella is deployed, Silvina also shields her.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Haste and Execution.

### Natsu — tracker ID: `natsu`

Source: https://afkstargazer.com/en/skill/natsu

**Page tags:** `Debuff (Single Target)`, `DoT`.
**Per-skill tags:** Lightning Fire Dragon's Iron Fist `Debuff (Single Target)`; Exclusive Equipment `Debuff (Single Target)`; Enhance Force `DoT`.

**Captured kit:**
- **Ultimate — Lightning Fire Dragon's Roar / Fire Dragon King's Roar:** during preparation, choose between Lightning Fire Dragon Mode (debuff/control focus) and Fire Dragon King Mode (higher damage). The former deals 1400% ATK in a frontal arc and stuns; the latter deals 2400% ATK in the same area. Values scale through LV 5.
- **Lightning Fire Dragon's Iron Fist / Fire Dragon King's Iron Fist:** in Lightning Fire Dragon Mode, damages the enemy with the highest cumulative damage and reduces their Haste; in Fire Dragon King Mode, strikes an adjacent enemy for max-HP-based damage and knocks them down.
- **Fiery Ties:** once per battle after the first allied defeat, increases Natsu's ATK and DEF based on the defeated ally's stats. If allied Lucy is defeated, also increases Crit and Crit DMG Boost.
- **Hero Focus:** in Lightning Fire Dragon Mode increases Haste; in Fire Dragon King Mode increases ATK.
- **Exclusive Equipment — "Salamander" Natsu:** `Debuff (Single Target)`; damage dealt reduces target max HP by a percentage of actual damage, with caps and Boss exclusion.
- **Enhance Force:** `DoT`; HP loss caused by Natsu through means other than normal attacks burns the enemy for 5 s, dealing periodic damage.
- **Season Charm:** Energy recovery per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Rivalry Mode:** reduces damage taken for 20 s at battle start, then increases damage dealt for 20 s; refine adds Crit and Haste.

### Rhys — tracker ID: `rhys`

Source: https://afkstargazer.com/en/skill/rhys

**Page tags:** no page-level mechanic buttons were visible in the returned excerpt; do not interpret this as proof of an empty tag set.

**Captured kit:**
- **Ultimate — Flame Barrage:** Rhys can move while attacking, but control effects prevent movement for 8 s. ATK SPD and Haste do not affect his attack animation speed; each point of either stat grants Crit DMG Boost. Fires six projectiles across the battlefield, then loads Blast Ammo for normal attacks with splash damage.
- **Defensive Stance:** passive Crit; active cast grants control immunity when taking control effects. Higher level restores HP and improves passive Crit.
- **Concussive Strike:** loads Shock Ammo, damaging enemies within 2 tiles and knocking them back. Cannot be cast while Blast Ammo is loaded.
- **Hero Focus:** increases Crit DMG Boost, with an extra bonus while Blast Ammo is loaded.
- **Exclusive Equipment — Fury Rush:** gains movement speed over time and loads Blast Ammo. Higher levels increase Blast Ammo damage and splash range.
- **Enhance Force:** reduces Defensive Stance cooldown to 3 s. LV 2 makes Ultimate stop time until all bullets are fired; while Blast Ammo is loaded, grants Crit DMG Boost and movement speed until control-affected.
- **Season Charm:** increases Crit; critical hits cause splash damage to enemies near the target. Higher ranks convert some critical damage into a permanent shield.
- **Rivalry Mode:** normal attacks stack ATK SPD and normal attack damage; refine adds Life Drain and Ranged DEF.

## Recaptured sections — profiles remain partial

### Berial — tracker ID: `berial`

Source: https://afkstargazer.com/en/skill/berial

**Page tags:** `Cheat Death (Self)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`, `Summon`.
- **Scared Swamp:** `Debuff (AOE)`, `Energy Denial`; Berial hides in an enemy's shadow, dealing repeated damage and absorbing Energy, then jumps out to damage and frighten adjacent enemies. He is invincible while hidden.
- **Shadow Trick:** hides and becomes invincible; moves among isolated enemies and damages each.
- **Exclusive Equipment — Shadow Reflection:** `Energy Denial`, `Summon`; isolated non-summoned enemies lose Energy and create a Silhouette with inherited stats. Silhouettes lose HP over time and attack only with normal attacks.
- **Enhance Force:** extends hiding after defeat; LV 2 reduces the per-enemy summon cooldown, increases Energy loss and eventually removes Silhouette HP decay.
- **Season Charm:** increases ATK when displaced by own skills; higher ranks add a shield.
- **Status remains partial:** Hero Focus and any omitted base-skill section are not in the returned excerpt.

### Thoran — tracker ID: `thoran`

Source: https://afkstargazer.com/en/skill/thoran

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `Temp Buff (AOE)`.
- **Soul Retaliation:** charges briefly and slashes enemies, dealing base damage plus a percentage of damage received during the charge; gains Life Drain and is unaffected while casting.
- **Soul Plunder:** targets the enemy with the highest HP not already affected, drains part of their current HP to increase Thoran's max HP, and makes the target take more damage for the rest of battle.
- **Status remains partial:** returned excerpt ends before remaining skills and progression sections.

### Orion — tracker ID: `orion`

Source: https://afkstargazer.com/en/skill/orion

**Page tags:** `Debuff (Single Target)`, `DoT`, `Ult Denial`.
- **Fatal Waltz:** summons a magical rapier at a location; it rapidly slashes enemies within 1 tile, then erupts in a burst that damages and stuns.
- **Fervent Flurry:** `DoT`; opening passive enchants the rapier for 15 s, increases Energy recovery and applies stacking Sear whenever Orion's skills or normal attacks deal damage.
- **Status remains partial:** returned excerpt does not contain the remaining base skills or progression sections.

### Walker — tracker ID: `walker`

Source: https://afkstargazer.com/en/skill/walker

- **Exclusive Equipment — Aerial Thunder:** `Debuff (AOE)`; opening grenade volley targets three enemies, then Walker detonates them with his revolver. Enemies in the arc are stunned, damaged and lose Phys DEF.
- **Enhance Force:** first damage dealt to the targeted enemy grants Walker a shield lasting until that target is defeated. LV 2 increases Crit and adds damage/Life Drain to critical normal attacks against a bounty target.
- **Season Charm:** increases Crit; critical strikes splash damage to nearby enemies. Higher ranks convert some critical damage into a permanent shield.
- **Status remains partial:** base skills, Hero Focus and any omitted progression sections were not present in the returned excerpt.

## Coverage update

- Seth, Karma, Silvina, Natsu and Rhys upgraded from partial to complete first-pass captures.
- Berial, Thoran, Orion and Walker remain partial despite the additional captured sections.
- Other partial profiles not listed in this batch have not yet been recaptured.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
