# Hero Knowledge Extraction — Batch 20 (recapture pass 7)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** complete six outstanding profiles and add further exact ability details to four profiles still missing sections.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Rolan — tracker ID: `rolan`

Source: https://afkstargazer.com/en/skill/rolan

**Page tags:** `DoT`, `Haste (Single Target)`, `Summon`, `Temp Buff`, `Temp Buff (Opening, Global)`, `Temp Buff (Single Target)`.

**Captured kit:**
- **Ultimate — Oath in the Stone:** cleanses dispellable debuffs from allies, equalizes HP percentages of non-summoned allies, increases all allies' max HP by 150%, restores 1000% ATK HP and grants 15% Morale. Temporary max HP decays over 12 s.
- **Undying Valor:** `Haste (Single Target)`, `Temp Buff (Single Target)`; opening passive grants 20% team Morale. Every 20% Morale grants all allies ATK equal to 10% of Rolan's initial ATK. Allies casting Ultimates and defeating non-summoned enemies add Morale; losing a non-summoned ally removes it. Active cast blesses the two allies with highest cumulative damage, making them unaffected and increasing their ATK; at 60% Morale they also gain Haste.
- **Clemency's Edge:** heals allies in the area with most allies and reduces their damage taken. At 60% team Morale, also targets the area with most enemies, damaging and stunning them.
- **Hero Focus:** increases Healing and reduces damage taken; both improve with team Morale.
- **Exclusive Equipment — Radiant Reign:** `DoT`, `Summon`; at 100% Morale creates a ward. When an ally casts an Ultimate, a radiant clone repeats it with inherited basic stats. Morale cannot decrease while the ward is active unless Rolan is defeated; in non-Boss battles, allies inside are immune to stat reductions. Higher levels improve inheritance and add periodic healing/damage.
- **Enhance Force:** `Temp Buff (Opening, Global)`; opening Morale bonus scales with the most represented faction. Lightbearer Empire or Celestial dominance adds further Morale and grants Rolan/allies of that faction Penetration and damage reduction for 8 s.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s. Higher ranks improve the bonus and increase Rolan's Healing after a total-healing threshold.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine adds Healing and Haste.

### Faramor — tracker ID: `faramor`

Source: https://afkstargazer.com/en/skill/faramor

**Page tags:** `Debuff (AOE)`, `Heal Denial`, `Special Target`, `Temp Buff (Opening, Single Target)`.
**Per-skill tags:**
- Ultimate — Sanctified Circle: `Heal Denial`
- Sacred Pledge: `Special Target`, `Temp Buff (Opening, Single Target)`
- Enhance Force: `Debuff (AOE)`

**Captured kit:**
- **Ultimate — Sanctified Circle:** consumes 250 Energy to create a 1-tile magic circle centered on current target. Deals true damage on creation and periodic true damage plus a portion of lost HP. Enemies inside cannot heal; circle consumes Energy per second and ends if no enemies remain inside for 1 s.
- **Glory's Embrace:** grants Faramor a shield and damages his current target; if Faramor has a non-permanent stat boost from an ally, damage becomes true damage.
- **Sacred Pledge:** `Special Target`, `Temp Buff (Opening, Single Target)`; during preparation blesses an adjacent ally, prioritizing those behind him. Faramor and the blessed ally gain ATK for 10 s, automatically reapplied; every 3 s Faramor damages and briefly stuns enemies adjacent to either. Source documents row/hex-ID targeting priority separately.
- **Hero Focus:** increases Haste by 12/16/20.
- **Exclusive Equipment — Bitter Requiem:** while the magic circle is active, replaces normal attacks with Glory's Embrace (shield capped at 600% ATK). The circle weakens enemies so allies can deal additional true damage once per second. Higher levels increase the extra damage and expand the circle after an enemy is defeated inside.
- **Enhance Force:** `Debuff (AOE)`; if an enemy revives inside the magic circle after reaching 0 HP, reduces their Vitality by 50.
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Haste and Execution.

### Callan — tracker ID: `callan`

Source: https://afkstargazer.com/en/skill/callan

**Per-skill tag:** Ultimate — Restless Guardian: `Tile Effect`.

**Captured kit:**
- **Ultimate — Restless Guardian:** at battle start Callan gains a 200% HP shield and becomes unaffected, but cannot move or act while it remains. The shield loses 20% value per second and absorbs half of physical/magic damage taken by allies within 2 tiles. On active cast, Callan maintains a 100% HP shield for up to 10 s with the same allied damage absorption. The page provides a tile-by-tile explanation of the 2-tile radius.
- **Hero Focus:** increases Vitality by 11/15/19.
- **Exclusive Equipment — Hollowed Wrath:** when Callan or a non-summoned ally falls below 30% HP, deals AOE damage to all enemies up to 8 times and stuns them; once per battle.
- **Enhance Force:** gaining a shield heals Callan for 15% of its max value. LV 2 improves the opening Restless Guardian shield to 600% HP and 80% damage absorption for allies within 2 tiles; Callan recovers 50% faster after it expires.
- **Season Charm:** grants nearby allies an opening shield, repeating every 8 s; higher ranks reduce damage taken while shielded.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Vitality and Ranged DEF.

### Hodgkin — tracker ID: `hodgkin`

Source: https://afkstargazer.com/en/skill/hodgkin

**Page tags:** `Debuff`, `Debuff (AOE)`, `Debuff (Global)`, `Energy Denial`, `Summon`.
**Per-skill tags:** Rending Cleave `Energy Denial`; Exclusive Equipment `Energy Denial`, `Summon`; Enhance Force `Debuff (AOE, Global)`; Season Charm `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Cannon Fire:** fires a cannon at each enemy hero in sequence, damaging the target and adjacent enemies; allies adjacent to the hit enemy also take damage. Repeated hits on the same unit after two hits deal reduced damage. Fires at least five cannons.
- **Phantom Respite:** enters an ethereal state for 8 s, immune to physical damage and recovering HP each second. Passive: after Cannon Fire, immediately enters the state for 4 s.
- **Rending Cleave:** `Energy Denial`; deals damage in a 2-tile arc and steals Energy from enemies.
- **Hero Focus:** increases ATK; adds further ATK during ethereal state.
- **Exclusive Equipment — Ardent Believers:** `Energy Denial`, `Summon`; summons two Dead Tide Warriors affected by voidbound magic. Defeated voidbound units explode, damaging adjacent enemies and draining Energy from targeted enemies. Higher levels apply voidbound to Cannon Fire targets and Breakable Walls.
- **Enhance Force:** `Debuff (AOE, Global)`; cannon hits reduce enemy Phys DEF, stacking twice. LV 2 grants initial Energy and restores Energy/reduces Vitality for enemies hit repeatedly.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken per enemy within 1 tile, up to a cap; higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Vitality and Crit Resist.

### Nara — tracker ID: `nara`

Source: https://afkstargazer.com/en/skill/nara

**Page tags:** `Airborne`, `Debuff (Single Target)`, `DoT`, `Special Target`.
**Per-skill tags:** Phantom Chains `DoT`, `Special Target`; Enhance Force `Debuff (Single Target)`.

**Captured kit:**
- **Ultimate — Crimson Vengeance:** starts with 750 Energy. After charging, deals damage; if target HP is below 40%, deals true damage instead. Auto Battle avoids using it on non-Boss enemy heroes above 40% HP.
- **Phantom Chains:** `DoT`, `Special Target`; pulls a distant enemy hero toward Nara if no enemy is in her normal attack range. Target loses HP for every tile pulled, with an ATK-based cap.
- **Hero Focus:** increases ATK; after an assist or defeat, adds another ATK bonus.
- **Exclusive Equipment — Eerie Execution:** after defeating an enemy with Crimson Vengeance, releases a shockwave damaging all enemies and healing allies based on the defeated target's max HP, with an ATK cap.
- **Enhance Force:** `Debuff (Single Target)`; defeating an enemy with Crimson Vengeance instantly restores 250 Energy. LV 2 makes Nara unaffected while casting Phantom Chains, reduces target Vitality permanently and applies max-HP reduction for the rest of battle.
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Crit and DEF Penetration.

### Cryonaia — tracker ID: `cryonaia`

Source: https://afkstargazer.com/en/skill/cryonaia

**Per-skill tags:** Exclusive Equipment — Frozen in Time: `Ult Denial`; Enhance Force: `Execute`.

**Captured kit:**
- **Ultimate — Frostveil Domain:** traps up to three enemy heroes and their summons in Eternal Winter for 12 s, prioritizing enemies with highest cumulative damage. In Boss fights, traps all enemies. Cryonaia gains Frost Shield while the domain is active; it grants control immunity, Haste, ATK and prevents her defeat. Domain ends early if all trapped enemies are defeated or the shield is destroyed.
- **Icicle Tempest:** creates an ice storm sweeping across the battlefield and dealing periodic damage. After Frostveil Domain, creates a full-sized storm and two smaller storms for the shield duration.
- **Frigid Edge:** launches five ice shards at an enemy; while Frost Shield is active, cooldown falls to 3 s.
- **Hero Focus:** increases ATK; every 2 s Frost Shield remains active adds more ATK, stacking six times.
- **Exclusive Equipment — Frozen in Time:** `Ult Denial`; enemies brought into Eternal Winter take damage, and only Cryonaia can cast Ultimate while inside. LV 4 can stop battle time for up to 30 s.
- **Enhance Force:** `Execute`; while Frost Shield is active, instantly freezes and defeats enemies in the domain below both the stated ATK-based HP threshold and 15% HP ratio.
- **Season Charm:** Energy recovery per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Rivalry Mode:** Ultimate casts grant temporary damage dealt bonus; first Ultimate also permanently increases Energy recovery from attacking. Refine adds Haste and Execution.

## Additional recaptured details — profiles remain partial

### Atalanta — tracker ID: `atalanta`

Source: https://afkstargazer.com/en/skill/atalanta

**Page tags:** `Airborne`, `Debuff (Single Target)`.
- **Wild Sniper:** dashes to a selected tile and fires a penetrative bolt along a 1-tile-wide path, damaging and stunning enemies. LV 3 triggers Scorching Gift explosions at hit locations.
- **Sweet Encounter:** `Airborne`; whip attack knocks an enemy back and immobilizes them. If another enemy is behind the target, knocks the target into them and immobilizes both.
- **Exclusive Equipment — Sleight of Hand:** `Debuff (Single Target)`; Sweet Encounter can be cast twice at battle start on different targets, steals ATK and Phys DEF temporarily at higher level.
- **Enhance Force:** `Debuff (Single Target)`; restores 10% max HP whenever an enemy is directly hit by Wild Sniper. LV 2 grants unaffected and Haste during Sweet Encounter; collision between enemies also reduces their Phys DEF.
- **Season Charm:** increases Crit; critical hits cause splash damage to nearby enemies. Higher ranks convert some critical damage into a permanent shield.
- **Status remains partial:** Hero Focus and/or any missing base skill sections are still absent from the returned excerpt.

### Baden — tracker ID: `baden`

Source: https://afkstargazer.com/en/skill/baden

**Page tags:** `Airborne`, `Cheat Death (Self)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`, `Summon`.
- **Ultimate — Omen's Grasp:** `Airborne`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`; Baden and his phantoms strike a designated enemy four times, keeping it stunned. Final strike deals true damage, drains HP and reduces max HP, and prevents HP/Energy recovery for 8 s. Baden is invincible while casting.
- **Hero Focus:** increases Penetration, with extra Penetration while any phantom Baden created remains on the battlefield.
- **Exclusive Equipment — Revenant's Due:** `Debuff (Single Target, AOE)`, `Summon`; opening Wraithbrand curse deals increased damage with guaranteed critical and max-HP reduction; each phantom steals target ATK for Baden and itself.
- **Enhance Force:** `Cheat Death (Self)`; if Baden is defeated while any phantom remains, possesses one, is deprioritized by enemies and takes reduced damage for 8 s; up to three triggers per battle.
- **Season Charm:** increases damage dealt and reduces damage taken, amplified on enemy side; higher ranks grant a permanent shield on first entry to enemy territory.
- **Status remains partial:** other base skill section(s) are not fully present in the returned excerpt.

### Phraesto — tracker ID: `phraesto`

Source: https://afkstargazer.com/en/skill/phraesto

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Battery`, `Summon`, `Temp Buff (AOE)`.
- **Ultimate — Futile Echo:** sacrifices 12% max HP to summon an identical Illusion during preparation; it inherits all stats and can cast all skills. If they share a row, both gain damage reduction until one is defeated. Active cast damages nearby enemies and heals Phraesto for each enemy hit.
- **Crimson Contract:** `Energy Battery`; Phraesto and his Illusion sign permanent contracts with different allies one tile behind them. The returned excerpt truncates before full contract effects.
- **Hero Focus:** increases Phys & Magic DEF for Phraesto and Illusion; when one loses a percentage of max HP, the other gains Energy.
- **Exclusive Equipment — Foggy Whisper:** `Summon`; if Illusion is defeated first, Phraesto taunts the enemy who dealt most damage, damages and stuns them. LV 4 can summon a replacement Illusion once per battle.
- **Enhance Force:** same-row opening condition grants both Phraesto and Illusion shields.
- **Season Charm:** `Temp Buff (AOE)`; periodically increases ATK and Life Drain of nearby allies; higher ranks grant Phraesto a shield per ally affected.
- **Status remains partial:** full Crimson Contract and remaining base-skill details need recapture.

### Valen — tracker ID: `valen`

Source: https://afkstargazer.com/en/skill/valen

**Page tag:** `Debuff (Single Target)`.
- **Ultimate — Thunder Swordwork:** selects a tile and launches seven Swift Strikes at it and adjacent tiles, then gains Invigoration for 12 s and increases ATK.
- **Unseen Blade:** strikes a target three times; during Invigoration, each strike also creates forked lightning that damages the target and nearby enemies.
- **Fury Thunder Strike:** only casts when Valen gains Invigoration, damaging all enemies within 2 tiles.
- **Hero Focus:** increases ATK.
- **Exclusive Equipment — Eternal Thunder:** permanent Invigoration; casting Thunder Swordwork while invigorated permanently stacks ATK, up to 10 stacks. Higher level adds lightning to normal attacks.
- **Enhance Force:** `Debuff (Single Target)`; Fury Thunder Strike stuns for 3 s. LV 2 grants 500 initial Energy; lightning hits restore Energy and reduce target Haste and movement speed.
- **Status remains partial:** Season Charm details are not present in the returned excerpt.

## Coverage update

- Six profiles upgraded from partial to complete first-pass captures: Rolan, Faramor, Callan, Hodgkin, Nara and Cryonaia.
- Atalanta, Baden, Phraesto and Valen gained more ability detail but remain partial.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
