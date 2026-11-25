# Hero Knowledge Extraction — Batch 06

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial records require recapture.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| ulmus | Ulmus | Airborne | Core page captured |
| tilaya | Tilaya | Temp Buff; Temp Buff (AOE) | Core page captured |
| koko | Koko | No page-level buttons in excerpt; per-skill Temp Buff (Global), Temp Buff (Single Target), Debuff (Single Target) | Partial |
| lorsan | Lorsan | Not visible in returned excerpt; per-skill Debuff (Single Target), Haste (Single Target), Temp Buff (Single Target) | Partial |
| satrana | Satrana | Debuff (Single Target); DoT; Tile Effect | Core page captured |
| thador | Thador | Not visible in returned excerpt; per-skill Debuff (AOE), Debuff (Global), Energy Battery | Core page captured |
| fay | Fay | Not visible in returned excerpt; per-skill Temp Buff (Opening, Single Target) | Partial |
| nerion | Nerion | Airborne; Debuff (Single Target); DoT | Core page captured |
| mehira | Mehira | Cheat Death (Self); Debuff; Debuff (AOE); Debuff (Global); Haste (AOE); Temp Buff (AOE) | Core page captured |
| pang | Pang | Not visible in returned excerpt; per-skill Temp Buff | Partial |

## Hero records

### Ulmus — tracker ID: `ulmus`

Source: https://afkstargazer.com/en/skill/ulmus

**Page tags:** `Airborne`.

- **Ultimate — Ancient Tenacity:** `Airborne`. Passive: when HP first drops below 30%, Ulmus retreats to backline and roots, recovering HP; while rooted he is unaffected, cannot move, and normal attacks become ranged with splash damage. Active: knocks target and adjacent enemies airborne and deals damage plus max-HP-based damage.
- **Verdant Barrier:** self-shield; when it breaks, damages surrounding enemies. If Ulmus is rooted, grants the shield to frontmost ally instead.
- **Way of the Forest:** passive HP recovery; while rooted, converts the recovery into Energy.
- **Hero Focus:** max HP.
- **Exclusive Equipment — Prowling Roots:** when an enemy is knocked down, knocked airborne or displaced, Ulmus binds them to the ground, extends knockdown and deals damage; per-target cooldown.
- **Enhance Force:** shield break/expiration knocks adjacent enemies back.
- **Season Charm:** opening and periodic shields for allies within 2 tiles; higher ranks add damage reduction.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Tilaya — tracker ID: `tilaya`

Source: https://afkstargazer.com/en/skill/tilaya

**Page tags:** `Temp Buff`, `Temp Buff (AOE)`.

- **Ultimate — Wrath of the Wilds:** opening passive loses 70% HP and gains Vine Ward shield that regenerates while active; shield also makes Tilaya unaffected. Active: swings greatsword repeatedly in a 2-tile arc, reducing damage taken while casting; taking hits can add swings.
- **Mighty Slash:** charges and strikes target; restores Vine Ward shield based on damage dealt while shield is active.
- **Wildwood Resonance:** increases attack damage based on current shield value; duration extended by nearby allies.
- **Hero Focus:** Vitality.
- **Exclusive Equipment — Verdant Growth:** first Vine Ward break instantly restores shield; later breaks restore a larger shield after cooldown. LV 3 grants max HP and Phys/Magic DEF to allies within 2 tiles while Vine Ward remains active.
- **Enhance Force:** Vine Ward shield recovery increases while Tilaya casts Ultimate.
- **Season Charm:** `Temp Buff`; increases shield value and grants Phys/Magic DEF when shielding; higher ranks also heal based on shield value.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

### Koko — tracker ID: `koko` — PARTIAL

Source: https://afkstargazer.com/en/skill/koko

**Per-skill tags visible:** `Temp Buff (Global)` on Ultimate; `Temp Buff (Single Target)` on Fulfilling Feast; `Debuff (Single Target)` on Patto, smash!.

- **Ultimate — Full Energy:** grants Koko and all allies 45% damage reduction for 12 s and records damage reduced; when the effect ends, recorded damage is dealt as true damage to all allies. Also grants Life Drain and ATK; cannot be dispelled.
- **Fulfilling Feast:** `Temp Buff (Single Target)`; heals weakest ally and grants ATK for 5 s. Also feeds Patto to heal it and increase Energy on Hit.
- **Patto, smash!:** `Debuff (Single Target)`; spear throw damages target and increases damage they take; if an enemy is adjacent, Patto smashes ground, damages and stuns adjacent enemies.
- **Hero Focus:** Haste.
- **Capture excerpt ends during Hero Focus; remaining Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Lorsan — tracker ID: `lorsan` — PARTIAL

Source: https://afkstargazer.com/en/skill/lorsan

**Per-skill tags visible:** `Debuff (Single Target)`, `Haste (Single Target)`, `Temp Buff (Single Target)` on Enhance Force.

- **Exclusive Equipment — Turbulent Resurgence:** when Stormbound Chain breaks, heals all allies and casts Stormbound Chain again, up to three casts per battle. LV 3 stuns the last two linked enemies.
- **Enhance Force:** `Debuff (Single Target)`, `Haste (Single Target)`, `Temp Buff (Single Target)`; while Zephyr's Embrace is active, protected target becomes unaffected. LV 2 allows more Stormbound Chain casts, adds max-HP reduction based on transferred damage, and transfers Zephyr's Embrace to highest-damage ally when chain breaks.
- **Season Charm:** opening buff for ally placed one tile in front: increases melee damage and reduces ranged damage taken; higher ranks add Energy on Hit.
- **Capture excerpt begins at Exclusive Equipment; recapture base abilities, Hero Focus and other sections.**

### Satrana — tracker ID: `satrana`

Source: https://afkstargazer.com/en/skill/satrana

**Page tags:** `Debuff (Single Target)`, `DoT`, `Tile Effect`.

- **Ultimate — Fiery Dance:** damages surrounding enemies within 2 tiles; Satrana is invincible during the effect. LV 2 charms enemies with the final strike, limiting them to normal attacks.
- **Vixen Rush:** scratches enemies in a 1-tile arc twice, dealing ATK damage plus target max-HP-based extra damage; damage grants Life Drain.
- **Ignite Passions:** `Debuff (Single Target)`, `DoT`, `Tile Effect`. Grants Sparks to allies within 2 tiles at battle start. When Satrana or a Spark ally hits an enemy three times, ignites them for max-HP-based damage over time and reduces Vitality until battle ends.
- **Hero Focus:** damage reduction.
- **Exclusive Equipment — Radiant Vigor:** ignited enemy heroes reduce magic damage taken by Satrana; she shares the effect with a nearby ally when another enemy is ignited. Higher ranks grant Energy per ignited enemy and improve reduction.
- **Capture excerpt does not show Enhance Force, Season Charm or Rivalry Mode; recapture remainder.**

### Thador — tracker ID: `thador`

Source: https://afkstargazer.com/en/skill/thador

**Per-skill tags visible:** `Debuff (AOE)` on Ultimate; `Debuff (Global)`, `Energy Battery` on Exclusive Equipment. No page-level tag buttons were visible.

- **Ultimate — Moonveil Manifest:** `Debuff (AOE)`; creates a 12 s ritual zone, reducing enemy Crit DMG DEF. After enemies inside accumulate enough damage, triggers shadow eruption based on Team ATK and heals allies based on total eruption damage.
- **Darkmoon Pact:** selects the ally one tile behind Thador as lieutenant during preparation; lieutenant gains Crit while Thador lives. Active cast shields both.
- **Crescent Cleave:** damages enemies in a crescent arc and knocks them down.
- **Hero Focus:** damage reduction.
- **Exclusive Equipment — Umbral Descent:** `Debuff (Global)`, `Energy Battery`; when lieutenant first casts Ultimate, Darkmoon damages all enemies repeatedly and reduces Phys/Magic DEF, then deals a final burst. LV 3 grants lieutenant 350 Energy at battle start.
- **Enhance Force:** Thador restores max-HP percentage per second while lieutenant is alive.
- **Season Charm:** `Debuff (AOE)`; damage taken is reduced per adjacent enemy. Higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Fay — tracker ID: `fay` — PARTIAL

Source: https://afkstargazer.com/en/skill/fay

**Per-skill tag visible:** `Temp Buff (Opening, Single Target)` on Exclusive Equipment.

- **Exclusive Equipment — Grand Entrance:** `Temp Buff (Opening, Single Target)`; at battle start grants the buffs of Vibrant Dance and Healing Gemstones to the ally placed one tile in front. Higher levels increase that ally's Vitality.
- **Enhance Force:** when an ally's HP first drops below 50% while Healing Gemstones is active, Fay heals them; once per skill use.
- **Season Charm:** opening melee damage buff and ranged damage reduction for ally placed one tile in front; higher ranks add Energy on Hit.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.
- **Capture excerpt begins at Exclusive Equipment; recapture base abilities and Hero Focus.**

### Nerion — tracker ID: `nerion`

Source: https://afkstargazer.com/en/skill/nerion

**Page tags:** `Airborne`, `Debuff (Single Target)`, `DoT`.

- **Ultimate — Drowning Doom:** passive: enemies kept under control effects for 6 s take damage and become Drowning; threshold is 4 s for enemies dealing magic damage. Nerion deals more damage to Drowning enemies. Active: empowers Nerion for 12 s with ATK/ATK SPD and Deluge bouncing damage between Drowning enemies.
- **Base skill excerpt contains a section between Drowning Doom and Hero Focus but its heading is not present in the indexed return; do not assign the orphaned LV scaling to a guessed skill.**
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Abyssal Embrace:** `Debuff (Single Target)`, `DoT`; at battle start applies Drowning to rearmost enemy, reducing their ATK/Haste and dealing periodic damage while they are controlled.
- **Enhance Force:** when all non-summoned enemies (or four total) are Drowning, Nerion gains 1000 Energy and becomes permanently empowered; gains Penetration above an Energy threshold.
- **Season Charm:** stationary-tile condition; after 3 s increases damage and Haste; higher ranks add shield/steadfast.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Mehira — tracker ID: `mehira`

Source: https://afkstargazer.com/en/skill/mehira

**Page tags:** `Cheat Death (Self)`, `Debuff`, `Debuff (AOE)`, `Debuff (Global)`, `Haste (AOE)`, `Temp Buff (AOE)`.

- **Ultimate — Euphoric Rush:** strikes enemies in a marked 2-tile area six times, then detonates for AOE damage and charms enemies for 3 s.
- **Blissful Whip:** `Haste (AOE)`, `Temp Buff (AOE)`; hits all units (allies and enemies) in a frontal arc five times. Allies hit gain Haste for 8 s and suffer reduced HP loss from this skill.
- **Alluring Mirage:** `Debuff (Global)`; summons an illusion near enemy lineup and bewitches all enemies, making them rush toward it. At battle start, summons an illusion on the symmetrical tile.
- **Hero Focus:** Life Drain; ATK increases based on cumulative healing received.
- **Exclusive Equipment — Total Devotion:** `Cheat Death (Self)`; summons three voidlings. When a hit would reduce Mehira below 20% HP, sacrifices one voidling to block damage, becomes untargetable and heals. Excess healing can create additional voidlings.
- **Enhance Force:** `Debuff (AOE, Global)`; enemies charmed by Euphoric Rush or bewitched by Alluring Mirage take 15% more damage; does not stack.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.
- **Capture excerpt does not show Season Charm; recapture remainder.**

### Pang — tracker ID: `pang` — PARTIAL

Source: https://afkstargazer.com/en/skill/pang

- The returned excerpt begins near the end of the page; base abilities, page tags and Hero Focus are not visible.
- **Enhance Force:** on entering Unyielding Force stance, Pang immediately gains Chi Barrier and 30 DEF Penetration.
- **Season Charm:** `Temp Buff`; increases shield value and grants Phys/Magic DEF when shielding; higher ranks also heal based on shield value.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.
- **Recapture the beginning of the page for full skill and tag extraction.**

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Search excerpts may begin mid-page or end mid-section; partial entries require recapture.
- Preserve source tag labels exactly; distinguish page-level tags from per-ability tags.
- No Supabase schema or data was changed by this extraction.
