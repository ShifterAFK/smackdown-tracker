# Hero Knowledge Extraction — Batch 21 (recapture pass 8)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** complete nine more outstanding profiles after recapturing the missing base and progression sections.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Voracia — tracker ID: `voracia`

Sources:
- https://afkstargazer.com/en/skill/voracia
- Prior details: Batches 18 and 20

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`.
**Additional ability tag:** Enhance Force `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — The Main Course:** when Voracia damages at least three enemies (or all surviving enemies), the skill gains Fervor. Active cast pulls enemies within 2 tiles onto a plate, knocks them down, deals damage and heals Voracia based on actual damage dealt.
- **Prime Cut:** slashes the area with the most enemies; if enhanced by Fervor, performs an additional slash.
- **Vino Inferno:** splashes wine over an area and roasts enemies for 5 s; Fervor adds an extra flame burst.
- **Hero Focus:** increases ATK, with another ATK bonus after appetite awakens.
- **Exclusive Equipment — Chef's Choice:** `Debuff (Single Target)`, `Energy Denial`; after all skills gain Fervor, devours the enemy with highest cumulative damage, absorbs part of their basic stats and permanently removes their Energy if they are not a Boss. Higher levels increase stat absorption and can devour a second target.
- **Enhance Force:** `Debuff (AOE)`; The Main Course also inflicts max-HP reduction equal to 35% of damage dealt.
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Rivalry Mode:** Ultimate casts grant temporary damage dealt bonus; first Ultimate also permanently increases Energy recovery from attacking. Refine adds Haste and DEF Penetration.

### Igor — tracker ID: `igor`

Sources:
- https://afkstargazer.com/en/skill/igor
- Prior details: Batch 18

**Page tags:** `Cheat Death (Self)`, `Debuff (AOE)`.
**Per-skill tag:** Specter Guard `Cheat Death (Self)`; Exclusive Equipment `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Funereal Ring:** summons a tombstone where Igor stands at battle start. Whenever an enemy hero loses 40% HP, Igor summons another tombstone on an empty tile closest to that enemy. Igor remains steadfast on tombstones; casting deals damage to all enemies.
- **Ghastly Explosion:** activates tombstones every 8 s or when Funereal Ring is cast. Igor jumps to an active tombstone, damages adjacent enemies and becomes immune/untargetable while casting.
- **Specter Guard:** `Cheat Death (Self)`; jumps to another tombstone to dodge a fatal blow and gains damage immunity. Tombstone jumps also restore HP.
- **Hero Focus:** increases Life Drain, with an extra bonus on first Specter Guard trigger.
- **Exclusive Equipment — Horror Strike:** `Debuff (AOE)`; extends Ghastly Explosion range and reduces healing received by targets while Igor is above 70% HP. Higher levels let each Specter Guard enhance Ghastly Explosion.
- **Enhance Force:** summons an extra tombstone with Funereal Ring on the tile with the most surrounding enemies at battle start.
- **Season Charm:** deals periodic magic damage to adjacent enemies and heals Igor based on actual damage dealt; higher ranks increase values and grant opening unaffected duration.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Life Drain and Execution.

### Kruger — tracker ID: `kruger`

Sources:
- https://afkstargazer.com/en/skill/kruger
- Prior details: Batch 17

**Page tag:** `Debuff (Single Target)`.

**Captured kit:**
- **Ultimate — Devastating Axe:** knocks down an enemy, deals damage and applies three stacks of Shatter Armor; each stack reduces target Phys DEF. If Kruger is present, allies apply an extra Shatter Armor stack when reducing enemy Phys DEF.
- **Smashing Assault:** deals damage and applies one stack of Shatter Armor.
- **Vital Strike:** attacks adjacent enemies with at least four Shatter Armor stacks and not affected by Vulnerable; deals damage and inflicts Vulnerable. Vulnerable enemies take increased physical damage, and part of damage taken is converted to Kruger's HP.
- **Hero Focus:** increases Ranged DEF.
- **Exclusive Equipment — Ruthless Vanguard:** at battle start, if no ally is within 1 tile, grants Kruger a shield and control immunity; also grants Life Drain while no ally is nearby. Higher level removes Vital Strike's distance limit.
- **Enhance Force:** when a Vulnerable enemy is defeated by Vital Strike, Kruger gains a 40% ATK boost until battle ends, stacking twice.
- **Season Charm:** deals periodic magic damage to adjacent enemies and heals Kruger based on actual damage dealt; higher ranks increase values and grant opening unaffected duration.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Life Drain and Ranged DEF.

### Contess — tracker ID: `contess`

Sources:
- https://afkstargazer.com/en/skill/contess
- Prior details: Batch 16

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Denial`, `Temp Buff`, `Ult Denial`.
**Per-skill tags:**
- Quiet Period: `Debuff (Single Target)`, `Energy Denial`
- Exclusive Equipment — Expulsion Notice: `Debuff (Single Target)`, `DoT`, `Ult Denial`
- Enhance Force: `Ult Denial`
- Season Charm: `Temp Buff`

**Captured kit:**
- **Ultimate — Detention Pass:** starts with Contess hidden inside her rulebook, untargetable and recovering Energy until a trigger condition occurs. Active effect heals an ally and grants Exemption; Exemption converts some HP loss into a shield and grants ATK while the shield holds. The Ultimate also has an active effect healing the two weakest allies and reducing ATK of the two highest-damage enemies.
- **Quiet Period:** whenever a unit casts an Ultimate, they violate Be Quiet. Contess reduces Energy recovery efficiency of the two enemies who have cast the most Ultimates.
- **Hero Focus:** each enemy rule violation permanently reduces their ATK and Energy recovery efficiency, up to caps.
- **Exclusive Equipment — Expulsion Notice:** units punished more than six times are permanently expelled, silenced and suffer additional HP loss; allies with Exemption are excluded.
- **Enhance Force:** stuns enemies who violate Be Civil and silences enemies who violate Be Quiet; in Boss battles, applies an extra punishment for rule violations.
- **Season Charm:** healing an ally increases their ATK for 8 s; higher ranks increase Contess's Healing after a total-healing threshold.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine adds Healing and Haste.

### Walker — tracker ID: `walker`

Sources:
- https://afkstargazer.com/en/skill/walker
- Prior details: Batch 17

**Page tag:** `Debuff (AOE)`.
**Per-skill tag:** Exclusive Equipment — Aerial Thunder: `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Six-Shot:** loads six bullets and randomly shoots enemies in front, prioritizing targets not yet hit during the cast. Each bullet deals ATK damage plus target-max-HP-based bonus damage and stuns; repeated hits on the same target deal reduced damage. Bounty Pursuit targets receive remaining bullets after other targets are hit.
- **Shotgun Blast:** fires three penetrative bullets at enemies in the frontal area; main target is hit by all three. Normal attack range cannot be buffed further.
- **Bounty Pursuit:** 10 s after battle starts, marks the enemy with highest accumulated damage. Walker prioritizes them, deals increased damage and takes reduced damage; defeating the target grants Crit. Higher levels allow a new bounty after the previous target is defeated.
- **Hero Focus:** increases Crit DMG Boost.
- **Exclusive Equipment — Aerial Thunder:** `Debuff (AOE)`; at battle start throws grenades at three enemies, then detonates them, stunning, damaging and reducing Phys DEF of enemies in a 1-tile arc.
- **Enhance Force:** first damage to the bounty target grants Walker a shield lasting until that target is defeated. LV 2 adds Crit and improves critical normal attacks against the bounty target.
- **Season Charm:** increases Crit; critical hits splash damage to nearby enemies. Higher ranks convert some critical damage into a permanent shield.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds DEF Penetration and Crit DMG Boost.

### Gwyneth — tracker ID: `gwyneth`

Sources:
- https://afkstargazer.com/en/skill/gwyneth
- Prior details: Batch 16

**Per-skill tags:**
- Fulgur Arrow: `Ult Denial`
- Flare Arrow: `Debuff (Single Target)`, `DoT`
- Exclusive Equipment — Fulgur Flare: `Debuff (AOE)`, `Ult Denial`

**Captured kit:**
- **Ultimate — Hailing Arrows:** passive charged normal attack deals 360% ATK; active cast rains arrows over a selected tile and surrounding area, damaging and immobilizing enemies. Repeated hits on the same target in a wave deal reduced damage.
- **Fulgur Arrow:** `Ult Denial`; every third normal attack is lightning-imbued, silencing the target and splashing damage/stun to enemies within 2 tiles.
- **Flare Arrow:** `Debuff (Single Target)`, `DoT`; the second attack in Gwyneth's normal attack cycle deals damage and burns the target, periodically damaging them and reducing Vitality.
- **Hero Focus:** increases ATK SPD; if no enemies are within 1 tile for 3 s, gains additional ATK SPD.
- **Exclusive Equipment — Fulgur Flare:** `Debuff (AOE)`, `Ult Denial`; increases normal attack damage and imbues the first attack with both lightning and fire. Higher level adds target-max-HP-based damage and ignores portions of damage reduction.
- **Enhance Force:** if no enemy is within 1 tile for 3 s, reduces the interval between Gwyneth's normal attacks by 40%.
- **Season Charm:** increases ATK SPD and heals based on normal-attack damage; higher ranks add Penetration while above 50% HP.
- **Rivalry Mode:** normal attacks stack ATK SPD and normal attack damage; refine adds ATK SPD and Crit DMG Boost.

### Orion — tracker ID: `orion`

Sources:
- https://afkstargazer.com/en/skill/orion
- Prior details: Batch 17

**Page tags:** `Debuff (Single Target)`, `DoT`, `Ult Denial`.
**Per-skill tags:**
- Fervent Flurry: `DoT`
- Exclusive Equipment — Royal Prerogative: `Debuff (Single Target)`, `Ult Denial`

**Captured kit:**
- **Ultimate — Fatal Waltz:** summons a magical rapier at a location; rapidly slashes enemies within 1 tile, then erupts in a burst damaging and stunning them.
- **Fervent Flurry:** `DoT`; opening passive enchants the rapier for 15 s, increases Energy recovery and applies stacking Sear whenever skills or normal attacks deal damage. Active cast thrusts four times.
- **Velvet Glove:** when an ally grants Orion a temporary stat buff, extends his rapier enchantment and makes that ally a Supporter. Active cast damages enemies in a frontal arc and grants Orion a shield; Supporters gain part of that shield.
- **Hero Focus:** increases ATK; gains extra ATK while Supporters are on the battlefield.
- **Exclusive Equipment — Royal Prerogative:** `Debuff (Single Target)`, `Ult Denial`; each Supporter grants Authority, increasing damage dealt, reducing damage taken and extending Sear. At three stacks, permanently activates rapier enchantment and upgrades Sear to silence and reduce Vitality.
- **Enhance Force:** after three Authority stacks, Orion becomes unaffected for the rest of battle and Sear deals extra true damage.
- **Season Charm:** increases damage dealt and reduces damage taken, amplified while on enemy side; higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Crit and Ranged DEF.

### Marilee — tracker ID: `marilee`

Sources:
- https://afkstargazer.com/en/skill/marilee
- Prior details: Batch 18

**Captured kit:**
- **Ultimate — Mid-Air Shot:** leaps up to 2 tiles in any direction and shoots the two closest enemies to her initial tile.
- **Mighty Arrow:** after every two normal attacks, charges the next attack to deal extra damage and stun the target briefly.
- **Hyperfocus:** while no enemy is within 2 tiles, increases ATK and ATK SPD.
- **Hero Focus:** increases Crit DMG Boost.
- **Exclusive Equipment — Battlefield Learning:** each allied Ultimate increases Marilee's ATK, stacking up to six times. At max stacks, normal attacks deal true damage. Higher level grants an extra stack when Hyperfocus activates.
- **Enhance Force:** reduces the no-enemy distance required for Hyperfocus by 1 tile.
- **Season Charm:** increases ATK SPD and heals based on normal-attack damage; higher ranks add Penetration while above 50% HP.
- **Rivalry Mode:** normal attacks stack ATK SPD and normal attack damage; refine adds ATK SPD and Crit.

### Himmel — tracker ID: `himmel`

Sources:
- https://afkstargazer.com/en/skill/himmel
- Prior details: Batches 16 and 17

**Per-skill tag:** Hero Party: `Tile Effect`.

**Captured kit:**
- **Ultimate — Heroic Slash:** nine consecutive slashes in a frontal area, followed by a sweep dealing damage plus true damage based on target max HP.
- **Heroic Dash:** dashes to the two enemies with highest cumulative damage, damages and knocks them down, then returns to original position.
- **Hero Party:** `Tile Effect`; if at least one Mage, Tank and Support are adjacent, forms a party with himself and one ally of each class, increasing basic stats and granting a shared permanent shield. Active cast damages a target and converts part of damage into healing for party members. Page gives class/row/hex-ID targeting priorities.
- **Hero Focus:** increases Haste.
- **Exclusive Equipment — Blue-Moon Blessings:** grants party members class-specific max HP or ATK bonuses based on Himmel's initial ATK; if Frieren is in the party, grants both Himmel and Frieren Penetration. Later sweep heals and removes debuffs.
- **Enhance Force:** in Boss fights, Himmel and party members cause 12% more HP loss on Boss targets.
- **Season Charm:** increases ATK when the caster is displaced by their own skills; higher ranks add a shield.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Crit and Ranged DEF.

## Coverage update

- Nine profiles upgraded from partial to complete first-pass captures: Voracia, Igor, Kruger, Contess, Walker, Gwyneth, Orion, Marilee and Himmel.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
