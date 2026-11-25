# Hero Knowledge Extraction — Batch 01

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Scope:** first structured extraction pass; source facts only
- **Status:** partial transcription. Search-indexed page content is not always complete; entries explicitly marked partial must be revisited before treating the kit as fully captured.
- **Roster identity:** tracker `gala` maps to Stargazer **Galahad**. Together with the two crossover aliases (`taichi` → Taichi & Agumon; `yamato` → Yamato & Gabumon), this resolves all 131 tracker rows to 130 distinct Stargazer hero pages only if the roster has 131 rows with one combined/alias representation; retain the tracker IDs as canonical keys.

## Extraction rules

1. Preserve Stargazer's tag labels verbatim, including qualifiers such as `Opening`, `Single Target`, `AOE`, and `Global`.
2. Tags are attached to the ability section where Stargazer displays them. Do not infer tags from a skill's prose.
3. Keep base skills, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm, and Rivalry Mode refinements in separate fields.
4. Do not translate or normalize effect labels in the raw source field. Functional classifications can be added later as a separate, explicitly derived layer.
5. A missing tag is not evidence that an ability has no strategic function.
6. This file is a first extraction batch, not a complete or patch-verified hero database.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Extraction status |
|---|---|---|---|
| gala | Galahad | Debuff (AOE); Special Target; Summon | Core page captured |
| hugin | Hugin | Energy Battery; Haste (Single Target); Temp Buff (Single Target); Temp Buff (Opening); Tile Effect | Core page captured |
| lily-may | Lily May | Energy Denial; Ult Denial | Core page captured |
| taichi | Taichi & Agumon | Energy Battery; Execute; Temp Buff (Opening, AOE) | Core page captured |
| yamato | Yamato & Gabumon | No page-level tags displayed in captured result | Core page captured |
| hewynn | Hewynn | Haste (Single Target); Temp Buff; Temp Buff (Single Target) | Core page captured |
| rolan | Rolan | DoT; Haste (Single Target); Summon; Temp Buff; Temp Buff (Opening, Global); Temp Buff (Single Target) | Partial page capture |
| callan | Callan | No page-level tags displayed in captured result | Partial page capture |
| hodgkin | Hodgkin | Debuff; Debuff (AOE); Debuff (Global); Energy Denial; Summon | Partial page capture |
| lumont | Lumont | Airborne; Debuff (AOE); Temp Buff (Single Target) | Core page captured |
| atalanta | Atalanta | Airborne; Debuff (Single Target) | Partial page capture |
| cyran | Cyran | Airborne; Debuff (Global); Execute | Core page captured |
| cryonaia | Cryonaia | No page-level tags displayed in captured result | Partial page capture |
| faramor | Faramor | Debuff (AOE); Heal Denial; Special Target; Temp Buff (Opening, Single Target) | Partial page capture |
| kazim | Kazim | Airborne; Haste (Opening, Global); Temp Buff (Opening, Global) | Core page captured |

## Hero records

### Galahad — tracker ID: `gala`

Source: https://afkstargazer.com/en/skill/galahad

**Page tags:** `Debuff (AOE)`, `Special Target`, `Summon`.

- **Ultimate — Temporal Field:** consumes 400 Energy; deals 340% ATK to all enemies; forms a 2-tile-radius circle centered on Galahad. While forming, consumes 60 Energy/sec for 10% progress/sec. Enemies in the circle lose 10 Haste and 16% movement speed per 10% progress, capped at 50 Haste and 80% movement speed reduction. At full formation Galahad gains 30 Haste. While she remains at the center, a shadow repeats each skill shortly after her, inheriting 60% of her stats. Stargazer explicitly marks the shadow as a summon.
- **Binding Loop:** cooldown 8, initial cooldown 3, range 10. Hits the enemy with highest cumulative damage for 210% ATK and immobilizes for 4 s; also converts a portion of non-excess healing received since the previous immobilization into HP loss (capped). Then expands range and repeats area strikes twice.
- **Chrono Ward:** cooldown 12, initial cooldown 5, range 10. Shields the weakest ally for 480% ATK for 8 s; expiration deals 240% ATK to adjacent enemies.
- **Hero Focus:** ATK increase; additional ATK when the magic circle is fully formed.
- **Exclusive Equipment — Time Recast:** marks a nearby ally (backline priority); when the circle first completes, summons a non-targetable shadow copy of the marked ally, inheriting basic stats and extra Initial Energy. This ally-shadow is also explicitly considered a summon.
- **Enhance Force:** while affected by Merlin's buffs, Galahad recovers 40 Energy/sec and becomes steadfast, with a total 30 s cap.
- **Season Charm:** stationary-tile condition; after 3 s on the same tile, increases damage and Haste. Higher ranks add a shield/steadfast effect.
- **Rivalry Mode:** separate rank-2 and refine-4 effects are present on the page; keep separate from the base kit.

### Hugin — tracker ID: `hugin`

Source: https://afkstargazer.com/en/skill/hugin

**Page tags:** `Energy Battery`, `Haste (Single Target)`, `Temp Buff (Single Target)`, `Temp Buff (Opening)`, `Tile Effect`.

- **Ultimate — Unstoppable!:** passive placement rule: Hugin sets an anvil on his preparation tile and remains near it. Active effect forges Gear of Might for the ally with the highest cumulative damage: +6% of Hugin's base ATK and +80 Haste for 10 s. ATK contribution scales to 10% by LV 5.
- **Titan's Aegis:** cooldown 6, initial cooldown 2, global range. Shields the weakest ally for 600% ATK for 8 s.
- **Mechanized Bond:** at battle start, places a mechanical sigil one tile behind Hugin. Ally on the tile receives ATK equal to 14% of Hugin's base ATK; each Titan's Aegis cast restores an extra 75 Energy to that ally. Buff ends when ally leaves the sigil.
- **Hero Focus:** Haste +12, scaling to +20.
- **Exclusive Equipment — Steelbound Kinship:** Unstoppable! also gives enhanced 800% ATK shields to the two weakest allies; LV 3 adds control immunity while shielded.
- **Enhance Force:** protected ally takes 30% less damage while cogshield is active.
- **Season Charm:** opening ranged-damage bonus for the ally placed one tile behind Hugin; higher ranks add a conditional shield.
- **Rivalry Mode:** separate healing/shield and refine-4 stats; do not merge into base skill effects.

### Lily May — tracker ID: `lily-may`

Source: https://afkstargazer.com/en/skill/lily-may

**Page tags:** `Energy Denial`, `Ult Denial`.

- **Ultimate — Tempest Shot:** passive defensive state at battle start. When a non-summoned enemy casts an Ultimate, Lily May becomes unaffected, leaps above that enemy, deals 200% ATK and interrupts the Ultimate, while removing 700 Energy. Cannot interrupt bosses; against bosses, instead increases damage dealt by 400%. Active mode can defend against all non-summoned enemies or a selected one. Targeting rules differ depending on the selected mode.
- **Rainstorm Ballet:** cooldown 20, range 7. Six attacks at 65% ATK each; invincible during the sequence, then returns to original tile.
- **Swallow's Flight:** normal attacks and skills grant EXP; assists/defeats grant extra. Each completed growth permanently adds 10% ATK and enhances the next four attacks with true damage based on target max HP; stacks up to four times.
- **Hero Focus:** Penetration, with additional Penetration during Rainstorm Ballet.
- **Exclusive Equipment — Rainfall Bliss:** grows once when receiving a non-permanent ally stat boost; each ally can trigger once per battle. Further levels increase growth ATK and add Rainstorm Ballet attacks.
- **Enhance Force:** first Tempest Shot interruption removes 1000 Energy from the enemy.
- **Season Charm:** critical-hit splash damage; higher rank converts some critical damage into a permanent shield.
- **Rivalry Mode:** separate Haste/Penetration and refine effects.

### Taichi & Agumon — tracker ID: `taichi`

Source: https://afkstargazer.com/en/skill/taichi-agumon

**Page tags:** `Energy Battery`, `Execute`, `Temp Buff (Opening, AOE)`.

- **Ultimate — Gaia Force:** Agumon uses Baby Flame as normal attack. First Ultimate digivolves him into Wargreymon, permanently increasing HP by 100% and ATK by 50%, unlocking skills. Wargreymon's Gaia Force hits enemies in a 3-tile area around target for seven hits; center enemies take increased damage. Taichi remains off-field and restores 150 Energy to Agumon every 3 s (250 extra before digivolution).
- **Brave Tornado:** cooldown 10, initial cooldown 3, global range. Wargreymon pierces through enemies, dealing 420% ATK and stunning for 2 s; unaffected while casting.
- **Recovery Shield:** cooldown 14, initial cooldown 9, global range. Wargreymon gains 700% ATK shield for 10 s and is unaffected while it lasts; on expiration heals based on remaining shield. Digivolution immediately grants this shield.
- **Hero Focus:** ATK increase; additional ATK after assisting/defeating a non-summoned enemy.
- **Exclusive Equipment — Dramon Killer:** `Execute`. Three slashes cause HP loss; if only one enemy remains and its HP is below the stated threshold, instantly defeats it.
- **Enhance Force:** `Energy Battery`, `Temp Buff (Opening, AOE)`. On battle start Wargreymon shares an ATK buff with allies behind him; Gabumon receives 300 extra Energy if affected.
- **Season Charm:** Energy recovery over time; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

### Yamato & Gabumon — tracker ID: `yamato`

Source: https://afkstargazer.com/en/skill/yamato-gabumon

**Page tags:** no page-level tag buttons were present in the captured result. Do not infer absence of function tags from that.

- **Ultimate — Cocytus Breath:** first Ultimate digivolves Gabumon into Metalgarurumon, permanently increasing ATK and Haste. Cocytus Breath covers a 4-by-3-tile area, repeatedly removes HP and freezes enemies. Yamato remains off-field; at battle start and each Ultimate, he buffs Gabumon's ATK. Before digivolution, the buff also enables extra Energy recovery.
- **Garuru Tomahawk:** cooldown 9, global range. Hits main target for 360% ATK and nearby enemies for 180%.
- **Garuru Howling:** cooldown 25, range 1. Increases Metalgarurumon's ATK and Haste for 16 s.
- **Hero Focus:** increases Energy recovery from attacks; extra increase after digivolution.
- **Exclusive Equipment — Grace Cross Freezer:** fires 10 missiles distributed among enemies; ally deployment near Gabumon during preparation adds missiles. Repeated hits on one enemy are subject to a damage reduction rule; LV 3 adds freeze and extra damage after four hits.
- **Enhance Force:** on digivolution, heals Gabumon and allies initially deployed nearby; each affected ally permanently increases Gabumon's ATK, capped at 15%.
- **Season Charm:** ATK and defensive stats stack with time alive; higher ranks add damage at max stacks.
- **Rivalry Mode:** separate Ultimate-triggered damage and Energy recovery effects.

### Hewynn — tracker ID: `hewynn`

Source: https://afkstargazer.com/en/skill/hewynn

**Page tags:** `Haste (Single Target)`, `Temp Buff`, `Temp Buff (Single Target)`.

- **Ultimate — Rain Prayer:** global healing of all allies for 95% ATK HP/sec over 9 s.
- **Healing Wave:** cooldown 5, initial cooldown 1.25, range 4. Heals one weakest ally for 280% ATK HP.
- **Revitalize:** global. Heals an ally; adds extra healing when their HP ratio is below 50%. Higher levels also dispel dispellable debuffs with per-ally trigger intervals.
- **Hero Focus:** ATK increase; extra ATK after first Rain Prayer.
- **Exclusive Equipment — Tranquility:** while casting Rain Prayer, Hewynn is unaffected and all allies take 30% less damage. Higher levels improve reduction and add Initial Energy.
- **Enhance Force:** `Haste (Single Target)`, `Temp Buff (Single Target)`. Revitalize also grants the healed ally 30 Haste for 6 s.
- **Season Charm:** `Temp Buff`. Healing grants the target an ATK buff for 8 s; higher ranks add Healing to the caster after a total-healing threshold.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

### Rolan — tracker ID: `rolan` — PARTIAL

Source: https://afkstargazer.com/en/skill/rolan

**Page tags:** `DoT`, `Haste (Single Target)`, `Summon`, `Temp Buff`, `Temp Buff (Opening, Global)`, `Temp Buff (Single Target)`.

- **Ultimate — Oath in the Stone:** cleanses dispellable debuffs from allies, equalizes HP percentages among non-summoned allies, increases all allies' max HP by 150%, restores 1000% ATK HP, and grants 15% Morale. Temporary max HP decays over 12 s.
- **Undying Valor:** opening passive grants 20% team Morale; every 20% Morale gives all allies ATK equal to 10% of Rolan's initial ATK.
- **Hero Focus:** Healing and damage reduction scale with team Morale.
- **Exclusive Equipment — Radiant Reign:** at 100% Morale creates a ward; when an ally casts Ultimate, a radiant clone appears and casts that Ultimate again.
- **Capture is truncated after the opening Exclusive Equipment description.** Remaining levels, other skills, Enhance Force, Season Charm, and Rivalry Mode require recapture.

### Callan — tracker ID: `callan` — PARTIAL

Source: https://afkstargazer.com/en/skill/callan

**Page tags:** no page-level tag buttons present in captured result.

- **Hero Focus:** increases Vitality.
- **Exclusive Equipment — Hollowed Wrath:** once per battle when Callan or a non-summoned ally falls below 30% HP, deals repeated AOE damage and stuns; Callan is unaffected while casting.
- **Enhance Force:** gaining a shield heals Callan for 15% of its maximum value. LV 2 improves Restless Guardian's opening shield and damage absorption.
- **Season Charm:** opening and periodic shields for allies within 2 tiles; higher ranks add damage reduction.
- **Base Ultimate and other base abilities were not included in the captured search excerpt; recapture required.

### Hodgkin — tracker ID: `hodgkin` — PARTIAL

Source: https://afkstargazer.com/en/skill/hodgkin

**Page tags:** `Debuff`, `Debuff (AOE)`, `Debuff (Global)`, `Energy Denial`, `Summon`.

- **Ultimate — Cannon Fire:** fires at each enemy hero in sequence; each cannon deals 320% ATK to the target and adjacent enemies. Allies adjacent to the hit enemy also take damage. A unit hit more than twice receives reduced subsequent damage; at least five cannons are fired.
- **Phantom Respite:** enters ethereal state for 8 s, immune to physical damage and recovering HP per second; passive triggers a shorter ethereal state after Cannon Fire.
- **Rending Cleave:** `Energy Denial`; damages enemies in a 2-tile arc and steals 70 Energy.
- **Capture truncated after Rending Cleave level details; remaining skills and equipment require recapture.

### Lumont — tracker ID: `lumont`

Source: https://afkstargazer.com/en/skill/lumont

**Page tags:** `Airborne`, `Debuff (AOE)`, `Temp Buff (Single Target)`.

- **Ultimate — Lumont's Charge:** charges to selected tile, pushes enemies along path, then damages adjacent enemies and taunts them for 3 s; unaffected while casting.
- **Totem Ward:** self-shield; shield grows with adjacent enemies. Increases Phys DEF of two closest allies.
- **War Stomp:** damages and stuns adjacent enemies; LV 3 cooldown falls per enemy hit.
- **Hero Focus:** Haste; extra Haste when at least two enemies are nearby.
- **Exclusive Equipment — Totem Slam:** after receiving damage equal to 40% max HP, slams at expanding radii, reduces enemy ATK, and third slam knocks enemies airborne.
- **Enhance Force:** heals while Totem Ward shield is active; LV 2 grants a shield on first Totem Slam and permanently extends War Stomp stun.
- **Season Charm:** opening and periodic nearby ally shields; higher ranks add damage reduction.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Atalanta — tracker ID: `atalanta` — PARTIAL

Source: https://afkstargazer.com/en/skill/atalanta

**Page tags:** `Airborne`, `Debuff (Single Target)`.

- **Ultimate — Wild Sniper:** dashes to selected tile and fires a penetrative bolt along a 1-tile-wide path, dealing damage and stunning enemies for 2 s.
- **Sweet Encounter:** `Airborne`; whip attack knocks an enemy back and immobilizes it. If another enemy is behind the target, can knock the target into that enemy and immobilize both.
- **Capture excerpt is incomplete; remaining skills/equipment require recapture.

### Cyran — tracker ID: `cyran`

Source: https://afkstargazer.com/en/skill/cyran

**Page tags:** `Airborne`, `Debuff (Global)`, `Execute`.

- **Ultimate — Gravitic Requiem:** selects a tile and creates a 5 s black hole. Repeatedly damages the center and outer radius, pulls all enemies toward the center, and executes center enemies below both an ATK-based HP threshold and 15% HP ratio.
- **Arcane Barrage:** cooldown 8, initial cooldown 3, global range. Fires three orbs toward the area with the most enemies.
- **Cursed Grasp:** `Airborne`; lifts nearest enemy, briefly imprisons, then throws it toward the densest enemy area; damages nearby enemies on landing. Prioritizes targets that are neither unaffected nor steadfast.
- **Hero Focus:** Haste.
- **Exclusive Equipment / Enhance Force / Season Charm:** page excerpt contains special anti-Merlin behavior, +200 Initial Energy, and stationary-tile damage/Haste charm; the captured result interleaves some later sections, so exact section-to-effect mapping should be rechecked on recapture.
- **Rivalry Mode:** separate damage and refine stats.

### Cryonaia — tracker ID: `cryonaia` — PARTIAL

Source: https://afkstargazer.com/en/skill/cryonaia

**Page tags:** no page-level tag buttons present in captured result.

- **Ultimate — Frostveil Domain:** traps up to three highest-cumulative-damage enemy heroes and their summons in a separate domain for 12 s. Gains a Frost Shield; while active, Cryonaia is control-immune, gains Haste and ATK, and cannot be defeated. Domain ends early if trapped enemies die or shield is destroyed.
- **Icicle Tempest:** 6 s moving storm with repeated damage; after Frostveil Domain, creates a large storm and two smaller storms that persist for the Frost Shield duration.
- **Frigid Edge:** launches five ice shards at one enemy; cooldown falls to 3 s while Frost Shield is active.
- **Hero Focus:** ATK increases during battle and stacks while Frost Shield remains active.
- **Capture excerpt ends during Hero Focus; remaining equipment/Enhance Force/Season Charm/Rivalry Mode require recapture.

### Faramor — tracker ID: `faramor` — PARTIAL

Source: https://afkstargazer.com/en/skill/faramor

**Page tags:** `Debuff (AOE)`, `Heal Denial`, `Special Target`, `Temp Buff (Opening, Single Target)`.

- **Ultimate — Sanctified Circle:** `Heal Denial`. Consumes Energy to summon a 1-tile circle centered on current target; initial true damage, then repeated true damage and extra damage based on target lost HP. Enemies inside cannot heal; circle ends if no enemies remain inside for 1 s.
- **Hero Focus:** Haste.
- **Exclusive Equipment — Bitter Requiem:** replaces normal attacks with Glory's Embrace while magic circle is active; shield value is capped.
- **Capture excerpt is truncated and interleaves later skill text; remaining base skills, Enhance Force, Season Charm, and Rivalry Mode require recapture.

### Kazim — tracker ID: `kazim`

Source: https://afkstargazer.com/en/skill/kazim

**Page tags:** `Airborne`, `Haste (Opening, Global)`, `Temp Buff (Opening, Global)`.

- **Ultimate — Gale Barrage:** passive extends airborne duration when an enemy hero is knocked up and fires tracking feathers; active volley damages and knocks up enemies in the densest arc-shaped area, followed by repeated volleys for 3 s.
- **Soaring Falcon:** opening 10 s airborne/invulnerable state. When an enemy hero is knocked airborne, Kazim dives, damages and marks them as prey; after Soaring ends, fires at marked prey and stuns them.
- **Stormy Dominion:** opening global wind field grants allies Haste; each prey mark adds Haste stacks. On ending Soaring, Kazim absorbs double the Haste bonus. Active arrow damages and knocks up enemies; prey marks permanently increase its damage and range.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Raptor's Vigil:** normal attacks deal more damage and lock on to prey; LV 3 adds an airborne effect and capped true damage after a number of normal attacks.
- **Enhance Force:** after Soaring starts, knocks up rearmost stationary enemy (excluding unaffected/steadfast targets). Prey marks or enemy defeats permanently grant ATK SPD and Energy, with ATK SPD stacks capped.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration while above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

## Source and quality notes

- Source pages are community-maintained AFK Stargazer pages, not an official game API.
- Search results may be truncated and may interleave sections. A record marked partial must not be treated as a complete ability record.
- Page-level tags and skill-section tags are preserved separately in the source captures; no role or synergy conclusions are made here.
- No Supabase schema/data was changed by this extraction.
