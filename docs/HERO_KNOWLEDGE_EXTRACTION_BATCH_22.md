# Hero Knowledge Extraction — Batch 22 (recapture pass 9)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** complete five more profiles and recover further details for two profiles still missing sections.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Atalanta — tracker ID: `atalanta`

Source: https://afkstargazer.com/en/skill/atalanta

**Page tags:** `Airborne`, `Debuff (Single Target)`.
**Per-skill tags:** Sweet Encounter `Airborne`; Exclusive Equipment — Sleight of Hand `Debuff (Single Target)`; Enhance Force `Debuff (Single Target)`.

**Captured kit:**
- **Ultimate — Wild Sniper:** dashes to a selected tile and fires a penetrative bolt along a 1-tile-wide path, damaging and stunning enemies. At LV 3, hits trigger Scorching Gift explosions at the target location.
- **Sweet Encounter:** `Airborne`; whip attack knocks an enemy back and immobilizes them. If another enemy is behind the target, knocks the target into them and immobilizes both; collision damage is based on the other enemy's ATK.
- **Scorching Gift:** fires an explosive bolt that damages the target and adjacent enemies; higher levels expand explosion range.
- **Hero Focus:** increases Haste; damaging three different enemies within 3 s grants additional Haste.
- **Exclusive Equipment — Sleight of Hand:** `Debuff (Single Target)`; Sweet Encounter can be cast twice at battle start on different targets and gains bonus damage. Higher level steals ATK and Phys DEF temporarily.
- **Enhance Force:** `Debuff (Single Target)`; restores 10% max HP whenever an enemy is directly hit by Wild Sniper. LV 2 grants unaffected and Haste during Sweet Encounter; if the target collides with another enemy, both lose Phys DEF temporarily.
- **Season Charm:** increases Crit; critical hits cause splash damage to nearby enemies. Higher ranks convert some critical damage into a permanent shield.
- **Rivalry Mode:** normal attacks stack ATK SPD and normal attack damage; refine adds Crit and Haste.

### Phraesto — tracker ID: `phraesto`

Source: https://afkstargazer.com/en/skill/phraesto

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Battery`, `Summon`, `Temp Buff (AOE)`.
**Per-skill tags:** Crimson Contract `Energy Battery`; Vicious Sting `Debuff (Single Target)`, `DoT`; Exclusive Equipment — Foggy Whisper `Summon`; Season Charm `Temp Buff (AOE)`.

**Captured kit:**
- **Ultimate — Futile Echo:** sacrifices 12% max HP to summon an identical Illusion during preparation. Illusion inherits all stats and can cast all skills. If they share a row, both gain damage reduction until one is defeated. Active cast damages nearby enemies and heals Phraesto for each enemy hit.
- **Crimson Contract:** `Energy Battery`; Phraesto and Illusion sign permanent contracts with different allies one tile behind them. Phraesto's contract increases Energy Recovery Speed; Illusion's reduces damage taken. Active cast performs three strikes against an enemy in front.
- **Vicious Sting:** `Debuff (Single Target)`, `DoT`; stings an enemy, reducing Haste and Vitality and applying Paralyzing Venom, which drains a percentage of max HP each second while healing the caster.
- **Hero Focus:** increases Phys & Magic DEF for Phraesto and Illusion; when one loses a percentage of max HP, the other gains Energy.
- **Exclusive Equipment — Foggy Whisper:** `Summon`; if Illusion is defeated first, Phraesto taunts the enemy who dealt most damage, damages and stuns them. Higher level can summon a replacement Illusion once per battle.
- **Enhance Force:** same-row opening condition grants Phraesto and Illusion shields.
- **Season Charm:** `Temp Buff (AOE)`; periodically increases ATK and Life Drain of nearby allies; higher ranks grant Phraesto a shield per ally affected.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Vitality and Ranged DEF.

### Thoran — tracker ID: `thoran`

Source: https://afkstargazer.com/en/skill/thoran

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `Temp Buff (AOE)`.
**Per-skill tags:** Soul Plunder `Debuff (Single Target)`; Resurrection `Cheat Death (Self)`; Exclusive Equipment — Soul Pact `Cheat Death (Self)`; Season Charm `Temp Buff (AOE)`.

**Captured kit:**
- **Ultimate — Soul Retaliation:** charges briefly, then slashes enemies; damage includes a percentage of damage received during the charge. Gains Life Drain and is unaffected while casting.
- **Soul Plunder:** targets the enemy with highest HP not already affected, drains a portion of current HP to increase Thoran's max HP and makes the target take increased damage for the rest of battle. Drained HP is capped by Thoran's ATK.
- **Resurrection:** `Cheat Death (Self)`; after a fatal blow, Thoran resurrects after a brief delay and recovers HP; once per battle. Higher level adds Energy when triggered.
- **Hero Focus:** increases Energy Recovery from normal attacks and skills; additional Energy Recovery while Resurrection has not triggered.
- **Exclusive Equipment — Soul Pact:** `Cheat Death (Self)`; signs a pact with the ally one tile behind him and takes half their damage. On a fatal blow, the ally sacrifices part of current HP to save and heal Thoran; afterward Thoran no longer takes damage for that ally.
- **Enhance Force:** Soul Retaliation drains an additional portion of current HP from all enemies affected by Soul Plunder and adds the drained amount to Thoran's max HP.
- **Season Charm:** `Temp Buff (AOE)`; every 8 s increases ATK and Life Drain of allies within 2 tiles. Higher ranks grant Thoran a shield for each ally affected.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s; refine adds Crit Resist, Ranged DEF and Crit DMG DEF.

### Pandora — tracker ID: `pandora`

Source: https://afkstargazer.com/en/skill/pandora

**Per-skill tags:**
- Ultimate — Panic Projection: `Debuff (Global)`, `DoT`
- Boxed Blessing: `Energy Battery`, `Invincibility`, `Special Target`, `Temp Buff (Single Target)`
- Exclusive Equipment — Eternal Legacy: `Debuff (Single Target, Global)`, `Energy Denial`, `Summon`

**Captured kit:**
- **Ultimate — Panic Projection:** Pandora herself is protected by hope. Active cast causes all units on the battlefield to flee toward their own side for 5 s while losing HP periodically; afterward, their ATK is reduced for 8 s, stacking up to three times.
- **Boxed Blessing:** at battle start, pulls the rearmost ally into Pandora's box, making them invincible but unable to cast skills for 4 s; the ally receives HP and Energy when released.
- **Hero Focus:** increases Pandora's max HP; adds more max HP after she is corrupted by her box.
- **Exclusive Equipment — Eternal Legacy:** `Debuff (Single Target, Global)`, `Energy Denial`, `Summon`; after Pandora is defeated, the box remains indestructible and unaffected, recovers Energy and can cast Panic Projection again without its HP-loss effect. It also casts Tainted Tribute on a random enemy every 5 s.
- **Enhance Force:** the ally pulled into Pandora's box is permanently protected by hope and becomes immune to Panic Projection, even after Pandora is defeated.
- **Season Charm:** opening ranged-damage bonus for the ally one tile behind Pandora; higher ranks grant that ally a shield the first time their HP falls below 50%.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine adds Healing and Haste.

### Pippa — tracker ID: `pippa`

Source: https://afkstargazer.com/en/skill/pippa

**Page tags:** `Airborne`, `Energy Denial`.
**Per-skill tags:** Ultimate — Wild Shift `Airborne`; Botanical Woe `Energy Denial`; Season Charm `Temp Buff`.

**Captured kit:**
- **Ultimate — Wild Shift:** `Airborne`; immobilizes two rearmost enemies, teleports them to a target tile and drops them, damaging and knocking down enemies there. Each skill has a 20% chance to go out of control, teleporting its target to a random enemy-side location.
- **Mad Missiles:** fires 9–12 magic missiles in quick succession; if out of control, missiles may hit random targets, including allies.
- **Botanical Woe:** `Energy Denial`; summons plants in the area with the most enemies, damaging enemies and reducing their Energy each second.
- **Hero Focus:** increases Haste; after four skill casts without going out of control, grants more Haste.
- **Exclusive Equipment — Mage's Bloom:** first cast of each skill cannot go out of control; each skill has a chance to mutate, adding area true damage and immobilization around the target.
- **Enhance Force:** when Wild Shift mutates, the target tile enemy is immobilized and the two teleported enemies take extra max-HP-based damage when they land.
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Rivalry Mode:** Ultimate casts grant temporary damage dealt bonus; first Ultimate also permanently increases Energy recovery from attacking. Refine adds Crit and Crit DMG Boost.

## Additional recaptured sections — profiles remain partial

### Baden — tracker ID: `baden`

Source: https://afkstargazer.com/en/skill/baden

- **Hero Focus:** increases Penetration; adds more while any phantom Baden created is on the battlefield.
- **Exclusive Equipment — Revenant's Due:** `Debuff (Single Target, AOE)`, `Summon`; opening Wraithbrand curse deals increased damage with guaranteed critical and max-HP reduction; each phantom summoned by the curse steals target ATK for Baden and itself.
- **Enhance Force:** `Cheat Death (Self)`; if Baden is defeated while any phantom remains, possesses one, is deprioritized by enemies and takes reduced damage for 8 s; up to three triggers per battle.
- **Season Charm:** increases damage dealt and reduces damage taken, amplified on enemy side; higher ranks grant a permanent shield on first entry to enemy territory.
- **Status remains partial:** other base skill section(s) are not fully present in the returned excerpt.

### Saida — tracker ID: `saida`

Source: https://afkstargazer.com/en/skill/saida

- **Hero Focus:** reduces damage taken; additional reduction scales with the number of existing Drain Seeds, up to a cap.
- **Exclusive Equipment — Deepening Roots:** `Debuff (Single Target)`, `DoT`; reduces damage dealt by enemies afflicted with Drain Seed and shortens the interval between seed attacks each time Saida casts her Ultimate. Higher levels increase seed damage and eventually trap all enemies, preventing movement/actions and causing periodic HP loss.
- **Enhance Force:** plants Drain Seeds on two nearby allies at battle start; allied seeds do not harm them and instead grant shields.
- **Season Charm:** Energy recovery per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Status remains partial:** full base ability set is still not captured in the available excerpt.

## Coverage update

- Five profiles upgraded from partial to complete first-pass captures: Atalanta, Phraesto, Thoran, Pandora and Pippa.
- Baden and Saida gained additional sections but remain partial.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
