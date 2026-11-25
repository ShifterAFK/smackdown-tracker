# Hero Knowledge Extraction — Batch 05

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; where the returned excerpt starts mid-page, the entry is marked partial.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| sinbad | Sinbad | Debuff (Single Target); Energy Denial | Core page captured |
| bonnie | Bonnie | Debuff (Single Target); DoT; Special Target | Core page captured |
| alsa | Alsa | Debuff (AOE) | Core page captured |
| marene | Marene | Airborne; Debuff; Debuff (AOE); Debuff (Global); Execute | Core page captured |
| reinier | Reinier | Airborne; Debuff (Single Target); Energy Battery; Tile Effect | Core page captured |
| eryndor | Eryndor | Debuff; Debuff (Single Target); Debuff (Global) | Core page captured |
| lucy | Lucy | Airborne; Summon; Temp Buff (Single Target) | Core page captured |
| scarlita | Scarlita | Airborne; Execute; Temp Buff; Temp Buff (Single Target) | Core page captured |
| senea | Senea | Cheat Death (Self); Debuff (Single Target) | Core page captured |
| baelran | Baelran | Airborne; Debuff (Single Target); Temp Buff | Core page captured |

## Hero records

### Sinbad — tracker ID: `sinbad`

Source: https://afkstargazer.com/en/skill/sinbad

**Page tags:** `Debuff (Single Target)`, `Energy Denial`.

- **Ultimate — Whizzing Edge:** passive: Sinbad's skills also deal normal-attack damage; casting speed uses ATK SPD and Haste. Active: attacks one enemy repeatedly for 3 s, then lands a final strike.
- **Tracker's Instincts:** `Debuff (Single Target)`; 6 s into battle, marks highest-damage enemy as "hitter" and highest-damage-taken enemy as "guard". Hits both and reduces hitter ATK while increasing guard damage taken. Reassesses when marks expire or a marked enemy is defeated.
- **Duo Cut:** two melee strikes.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Adaptive Prowess:** `Debuff (Single Target)`, `Energy Denial`; adapts debuffs to the marked enemies' damage profile: reduces hitter ATK SPD or Energy Recovery efficiency; reduces guard Vitality or Phys/Magic DEF depending on their sustain profile.
- **Enhance Force:** Duo Cut deals extra damage to enemies marked as hitter or guard.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration above 50% HP.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Bonnie — tracker ID: `bonnie`

Source: https://afkstargazer.com/en/skill/bonnie

**Page tags:** `Debuff (Single Target)`, `DoT`, `Special Target`.

- **Ultimate — Deathmark Arrow:** fires magic arrows twice at each enemy; deals more damage and stuns enemies affected by Aging.
- **Decay's Reach:** `Debuff (Single Target)`, `DoT`, `Special Target`; at battle start applies Aging to the rearmost enemy, dealing damage and reducing Haste until battle ends. Bonnie prioritizes that target; allied magic damage can further reduce its Haste.
- **Hero Focus:** ATK.
- **Exclusive Equipment — Blight Surge:** `Debuff (Single Target)`; when Aging reaches max stacks or an Aged enemy is defeated, spreads Aging to nearby unafflicted enemies.
- **Enhance Force:** `Debuff (Single Target)`; max-stack Aging increases magic damage taken, with an extra increase for Ultimate magic damage.
- **Season Charm:** `Debuff (Single Target)`; ATK increases per enemy affected by caster continuous-damage effects; higher ranks also reduce target Phys/Magic DEF.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Alsa — tracker ID: `alsa`

Source: https://afkstargazer.com/en/skill/alsa

**Page tags:** `Debuff (AOE)`.

- **Ultimate — Twirling Rocks:** `Debuff (AOE)`; rolls to a target tile, damages adjacent enemies and enters Combat Stance for the rest of battle. In this stance, consumes Energy for Vigorous Slam. When damaged by adjacent enemies, prioritizes Swift Evasion, dealing damage and slowing movement, then rolls away and gains a shield; once per 7 s.
- **Stone Barrier:** blasts nearest enemy, stuns them and creates earth pillars behind the target, knocking enemies back.
- **Rolling Boulder:** targets enemies recently affected by control effects and drops boulders on them.
- **Hero Focus:** Haste, with extra Haste after entering Combat Stance.
- **Exclusive Equipment — Don of Terra:** Vigorous Slam damage and Swift Evasion shield values stack after use.
- **Enhance Force:** `Debuff (AOE)`; Rolling Boulder deals extra damage to enemies recently affected by multiple control effects. LV 2 adds a large boulder and Magic DEF reduction after enough targets have triggered it.
- **Season Charm:** own-skill displacement grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Marene — tracker ID: `marene`

Source: https://afkstargazer.com/en/skill/marene

**Page tags:** `Airborne`, `Debuff`, `Debuff (AOE)`, `Debuff (Global)`, `Execute`.

- **Ultimate — Storm's Wrath:** `Airborne`, `Debuff (Global)`; Marene becomes invincible while summoning a 4 s storm, immediately damages all enemies based on their HP, repeatedly knocks all enemies airborne, reduces Ranged DEF and triggers Tempest Eye lightning strikes. Strike frequency scales with Haste, capped at 8 activations/sec.
- **Gathering Gale:** passive amplifies allied Haste buffs received by Marene and retains the Haste after those buffs expire. Active channels Tempest Eye, generating gusts at enemy positions; activation frequency scales with Haste.
- **Twin Cyclone:** launches two wind-blade clusters at nearest and farthest enemies, repeatedly damaging targets and nearby enemies.
- **Hero Focus:** ATK; each Tempest Eye activation adds more ATK, stacking up to 30 times.
- **Exclusive Equipment — Aeon Tempest:** `Airborne`, `Execute`; at sufficient allied Haste, Marene enters Windborne state with steadfast and defensive/offensive benefits. After 30 Tempest Eye activations, creates a permanent battlefield-wide thunderstorm; LV 4 can sweep eligible low-HP enemies off the battlefield, counting as defeated.
- **Enhance Force:** `Debuff (AOE)`; gusts and wind blades add true damage, stun and permanently reduce Vitality, stacking up to 15 times.
- **Season Charm:** opening damage and Haste; higher ranks restore HP and extend effect after assists/defeats.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Reinier — tracker ID: `reinier`

Source: https://afkstargazer.com/en/skill/reinier

**Page tags:** `Airborne`, `Debuff (Single Target)`, `Energy Battery`, `Tile Effect`.

- **Ultimate — Mutual Reflection:** based on the count of non-summoned allies/enemies, teleports Reinier and an enemy to another dimension for 10 s, or teleports only the enemy. If target is steadfast/unaffected or the only non-summoned enemy alive, deals higher damage instead. Prioritizes healthiest non-summoned enemy.
- **Dynamic Balance:** `Tile Effect`; at battle start swaps an adjacent ally with a symmetrically placed enemy. The ally restores HP based on damage dealt to that enemy, subject to a cap. Page includes explicit hex-pair tie-break rules.
- **Golden Ratio:** `Airborne`, `Energy Battery`; repeated strikes interrupt and damage the healthiest enemy, then knock them airborne. Crossing the 61.8% HP threshold triggers HP/Energy recovery; LV 4 also grants recovery to all allies.
- **Hero Focus:** `Debuff (Single Target)`; Dynamic Balance increases target ATK when cast on ally or reduces it when cast on enemy.
- **Exclusive Equipment — Tuned Art:** `Airborne`, `Debuff (Single Target)`; Dynamic Balance also damages and knocks down the enemy and increases their damage taken for the rest of battle.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.
- **Capture did not expose Enhance Force or Season Charm; verify whether absent or outside returned excerpt.**

### Eryndor — tracker ID: `eryndor`

Source: https://afkstargazer.com/en/skill/eryndor

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (Global)`.

- **Ultimate — Forced Game:** `Debuff (Global)`; non-summoned enemies roll individually. Different allies applying stat-reduction effects add Woe stacks, reducing the roll. Enemies that lose surrender ATK and max HP to Eryndor and take repeated damage. Stat gains have caps.
- **Unfurling Blades:** attacks non-summoned enemies in order from lowest to highest HP ratio; Woe stacks increase damage taken from this skill.
- **Veiled Return:** throws a fan into the densest enemy area and grants a shield; fan repeatedly damages enemies. Returning fan grants an additional shield based on actual damage dealt.
- **Hero Focus:** Haste; extra Haste when an enemy loses Eryndor's game.
- **Exclusive Equipment — All is Lost:** `Debuff (Single Target)`; Ultimate gains extra hits against enemies who lose the game; repeated losses add extra hits. LV 3 permanently strips all stat buffs from qualifying non-boss enemies and reduces their ATK.
- **Enhance Force:** `Debuff (Global)`; at battle start collects a percentage of each non-summoned enemy's basic stats, subject to caps.
- **Season Charm:** stationary-tile condition; after 3 s increases damage and Haste; higher ranks add shield/steadfast.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Lucy — tracker ID: `lucy`

Source: https://afkstargazer.com/en/skill/lucy

**Page tags:** `Airborne`, `Summon`, `Temp Buff (Single Target)`.

- **Ultimate — Celestial Spirit Summon:** `Airborne`, `Summon`; calls Aquarius, whose inherited stats and recurring water swirl damage/stun/knock airborne enemies in the densest tile area.
- **Lucy Kick:** targets the enemy with highest cumulative damage, damages and stuns them; Lucy is unaffected while using it.
- **Star Dress: Aquarius Form:** `Airborne`; Ultimate transforms Lucy into Aquarius form for the rest of battle, repeating the water-swirl attack and extending her attack range.
- **Hero Focus:** Haste.
- **Exclusive Equipment — Water Barrier:** `Temp Buff (Single Target)`; Aquarius/Lucy shields the weakest ally.
- **Enhance Force:** when Lucy reaches full Energy while Aquarius is present, Aquarius gains ATK SPD.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Scarlita — tracker ID: `scarlita`

Source: https://afkstargazer.com/en/skill/scarlita

**Page tags:** `Airborne`, `Execute`, `Temp Buff`, `Temp Buff (Single Target)`.

- **Ultimate — Divine Quake:** directional Rock Wave damages and pushes enemies to battlefield edge, followed by a charge strike and stun. Damage increases with each surviving ally besides Scarlita.
- **Sanctified Verdict:** `Airborne`; opening blink to backline and ascent grants invulnerability, Energy recovery and accumulating ATK. After 15 s or when ally count is low, descends near frontmost enemy with AOE damage, airborne and stun.
- **Valkyrie Spirit:** `Airborne`; while airborne, shields the weakest non-summoned ally. After descent, axe strikes damage and knock down enemies; damage scales with surviving allies.
- **Hero Focus:** Execution increases for each blessing sent while airborne.
- **Exclusive Equipment — Divine Wrath:** `Execute`; deals true damage when enough non-summoned allies survive. Higher ranks knock eligible low-HP non-boss enemies off battlefield and count them as defeated.
- **Enhance Force:** `Temp Buff (Single Target)`; Valkyrie Spirit also increases protected ally Phys/Magic DEF. LV 2 adds emergency shield if ally drops below 20% HP while Scarlita is airborne; if unused, landing smash affects the whole battlefield with bonus damage.
- **Season Charm:** `Temp Buff`; increases shield value and grants Phys/Magic DEF when shielding; higher ranks also heal based on shield value.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

### Senea — tracker ID: `senea`

Source: https://afkstargazer.com/en/skill/senea

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`.

- **Ultimate — Grave Crescendo:** `Debuff (Single Target)`; normal attacks mesmerize enemies for 8 s and reduce ATK. Defeated mesmerized enemies become spectral spectators. At 1000 Energy, Senea begins a performance with increased ATK SPD; normal attacks consume Energy and deal max-HP-based true damage plus max HP reduction.
- **Melodic Cascade:** gains extra projectiles with normal attacks; temporary allied stat buffs add projectiles, up to five. Active cast replaces projectiles with two musical notes.
- **Swell of Sorrow:** sends sound waves across battlefield for three hits; spectral spectators restore Senea's Energy and HP.
- **Hero Focus:** ATK, with extra ATK when at least three spectators are present.
- **Exclusive Equipment — Crimson Solo:** `Cheat Death (Self)`; normal attacks during Grave Crescendo attract additional spectators. With enough spectators, stage rises and Senea becomes steadfast; after a hit threshold, spectators throw true-damage roses. LV 3 grants spirit form after defeat during solo performance.
- **Enhance Force:** attracts two spectral spectators at battle start.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Baelran — tracker ID: `baelran`

Source: https://afkstargazer.com/en/skill/baelran

**Page tags:** `Airborne`, `Debuff (Single Target)`, `Temp Buff`.

- **Ultimate — Celestial Rise:** opening passive grants a shield and large temporary max HP that decays each second. Restoring Baelran to max HP triggers Celestial Form; while transformed, bonus max HP no longer decays and normal attacks hit an arc. Active cast deals true damage in a frontal arc and heals based on damage dealt.
- **Sanctified Surge:** passive HP recovery; in Celestial Form, blade hits add max-HP-based true damage.
- **Wrath Cleave:** `Airborne`; knocks target airborne, then slams a rectangular area, knocking enemies down.
- **Hero Focus:** Haste, with extra Haste on entering Celestial Form.
- **Exclusive Equipment — Divine Dominance:** restores bonus max HP on Celestial Form; a second max-HP restoration triggers enhanced form, permanent unaffected status and battlefield tile strikes.
- **Enhance Force:** `Debuff (Single Target)`; Divine Light bonus damage can reduce non-boss max HP, with caps; bosses instead lose a small percentage of HP.
- **Season Charm:** `Temp Buff`; increases shield value and grants Phys/Magic DEF when shielding; higher ranks also heal based on shield value.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Preserve tag labels verbatim and keep page-level tags distinct from tags shown on each ability.
- Search excerpts may be incomplete; recapture if any section is missing before verification.
- No Supabase schema or data was changed by this extraction.
