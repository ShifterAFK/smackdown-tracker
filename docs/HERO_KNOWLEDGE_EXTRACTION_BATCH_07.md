# Hero Knowledge Extraction — Batch 07

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial records require recapture.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| voracia | Voracia | Debuff; Debuff (Single Target); Debuff (AOE); Energy Denial | Partial |
| solise | Solise | Not visible in returned excerpt; per-skill Temp Buff | Partial |
| marcille | Marcille | Not visible in returned excerpt | Partial |
| nazrik | Nazrik | Debuff (Single Target) | Core page captured |
| thoran | Thoran | Cheat Death (Self); Debuff (Single Target); Temp Buff (AOE) | Partial |
| walker | Walker | Not visible in returned excerpt; per-skill Debuff (AOE) | Partial |
| parisa | Parisa | Temp Buff (Single Target) | Core page captured |
| shemira | Shemira | Debuff (Global) | Core page captured |
| igor | Igor | Cheat Death (Self); Debuff (AOE) | Partial |
| ludovic | Ludovic | DoT; Temp Buff | Core page captured |

## Hero records

### Voracia — tracker ID: `voracia` — PARTIAL

Source: https://afkstargazer.com/en/skill/voracia

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`.

- **Ultimate — The Main Course:** passive: when Voracia damages at least three enemies (or all surviving enemies) with a skill, her appetite awakens and grants Fervor to that skill. Active: creates a plate, pulls enemies within 2 tiles onto it, knocks them down for 4 s, then deals heavy damage and heals based on actual damage. Fervor adds Penetration.
- **Prime Cut:** slashes the area with the most enemies; Fervor adds an extra slash.
- **Vino Inferno:** roasts enemies in a selected 1-tile area for 5 s; Fervor ignites the wine at the end for extra damage.
- **Hero Focus:** ATK; extra ATK after appetite awakens.
- **Exclusive Equipment — Chef's Choice:** `Debuff (Single Target)`, `Energy Denial`; once all skills have gained Fervor, devours the enemy with highest cumulative damage, absorbs basic stats and permanently removes all Energy if target is not a boss.
- **Capture excerpt ends during Exclusive Equipment levels; Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Solise — tracker ID: `solise` — PARTIAL

Source: https://afkstargazer.com/en/skill/solise

- The returned excerpt does not expose page-level tags.
- **Ultimate — Life's Embrace:** releases three battlefield-wide healing waves. If an allied Bulbsprite is healed, it sends a water ring from its host's position, damaging enemies. Solise is unaffected while casting.
- **Lifebloom Buds:** opening passive sends a Bulb to each non-summoned ally; Bulbs heal their host periodically and store excess healing. At threshold, Bulb blooms into a Bulbsprite that permanently increases host ATK.
- **Exclusive Equipment — Resonant Bloom:** when a Bulb blooms, grants host Phys/Magic DEF; further excess healing levels up Bulbsprite and adds host ATK, with a maximum of three upgrades.
- **Enhance Force:** while casting Life's Embrace, Bulbsprite damage gains bonus damage based on stored excess healing.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s; higher ranks add Healing after a cumulative-healing threshold.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.
- **Capture excerpt does not show all base abilities or Hero Focus; recapture the page from the beginning.**

### Marcille — tracker ID: `marcille` — PARTIAL

Source: https://afkstargazer.com/en/skill/marcille

- The returned excerpt starts during an ability's level scaling; base abilities, page tags and Hero Focus are not visible.
- A captured section states that a revived ally recovers HP; LV 3 adds damage from an ancient magic circle while Marcille chants, converting damage into additional HP for the revived ally.
- **Enhance Force:** Marcille recovers 10 additional Energy/sec per ally currently providing her a buff, up to three stacks; at three stacks, she becomes unaffected.
- **Season Charm:** opening damage and Haste bonus; higher ranks restore HP and extend the effect after assists/defeats.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.
- **Recapture page from its beginning before recording base abilities, tags and full resurrection mechanics.**

### Nazrik — tracker ID: `nazrik`

Source: https://afkstargazer.com/en/skill/nazrik

**Page tags:** `Debuff (Single Target)`.

- **Ultimate — Rend Rupture:** 4 s into battle, marks the enemy that has taken the most damage as Prey. Throws a guaranteed-critical spear for true damage, then triggers all Rend stacks on that target for extra damage.
- **Savage Wound:** `Debuff (Single Target)`; critical spear throws deal extra damage based on target initial max HP.
- **Hero Focus:** Crit; after inflicting 15 Rend stacks, gains additional Crit.
- **Exclusive Equipment — Pack Tactics:** `Debuff (Single Target)`; reduces Prey's Crit Resist. Allied critical hits on Prey apply Rend stacks; LV 3 reduces Vitality and increases damage taken at 15 Rend stacks.
- **Enhance Force:** each critical hit increases Crit DMG Boost based on Nazrik's Crit Rate.
- **Season Charm:** stationary-tile condition; after 3 s increases damage and Haste; higher ranks add shield/steadfast.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Thoran — tracker ID: `thoran` — PARTIAL

Source: https://afkstargazer.com/en/skill/thoran

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `Temp Buff (AOE)`.

- **Ultimate — Soul Retaliation:** charges briefly, then slashes enemies in range for ATK damage plus a percentage of damage received during charge; gains Life Drain and is unaffected while casting. If interrupted, higher level allows his soul to complete the slash.
- **Soul Plunder:** `Debuff (Single Target)`; targets the highest-HP enemy not already affected, drains current HP to increase Thoran's max HP and makes target take increased damage for the rest of battle.
- **Capture excerpt ends during Soul Plunder; remaining abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Walker — tracker ID: `walker` — PARTIAL

Source: https://afkstargazer.com/en/skill/walker

- The returned excerpt begins at Exclusive Equipment; base ability descriptions and page-level tags are not visible.
- **Exclusive Equipment — Aerial Thunder:** `Debuff (AOE)`; at battle start throws grenades at three enemies, detonates them, stuns enemies in a 1-tile arc, deals damage and reduces Phys DEF.
- **Enhance Force:** gains a shield when dealing damage to the targeted enemy for the first time. LV 2 increases Crit and empowers critical normal attacks against a bounty target with extra damage and Life Drain.
- **Season Charm:** critical-hit splash damage to enemies within 1 tile; higher ranks convert some critical damage into a permanent shield.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Recapture page from the beginning before recording base kit and Hero Focus.**

### Parisa — tracker ID: `parisa`

Source: https://afkstargazer.com/en/skill/parisa

**Page tags:** `Temp Buff (Single Target)`.

- **Ultimate — Floral Splendor:** marks an enemy with a flower for the rest of battle; damages marked enemies and adjacent enemies. Repeated hits within 2 s have reduced subsequent damage. Defeated marked enemies can restore Energy.
- **Floral Inspiration:** `Temp Buff (Single Target)`; increases ATK SPD and normal-attack damage for Parisa and one nearest ally for 10 s.
- **Flower Power:** after every three normal attacks, sends a bouquet along a path, damaging enemies and restoring Energy per enemy hit, with a per-bouquet cap.
- **Hero Focus:** ATK.
- **Exclusive Equipment — Falling Blossom:** marks the nearest symmetrical enemy at battle start; after enough marks, normal attacks hit additional targets.
- **Enhance Force:** reduces normal attacks required to trigger Flower Power. LV 2 removes Floral Inspiration's initial cooldown and makes it target an extra ally after first cast.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Shemira — tracker ID: `shemira`

Source: https://afkstargazer.com/en/skill/shemira

**Page tags:** `Debuff (Global)`.

- **Ultimate — Phantom Procession:** summons 10 ghosts to bombard random enemies for 10 s. Ghost damage heals Shemira; after an enemy is struck 15 or more times, ghost damage is reduced. Ghosts from Ghastly Tribute join the bombardment.
- **Sacrificial Orb:** sacrifices current HP to summon a Wailing Orb along a path, damaging enemies.
- **Ghastly Tribute:** passive: ally HP/shield loss threshold summons ghosts. Active: sacrifices HP to deal max-HP-based true damage to a single enemy; if a ghost is present, consumes one for an AOE strike.
- **Hero Focus:** Energy recovery from attacks; extra recovery after summoning three ghosts.
- **Exclusive Equipment — Spectral Barrier:** `Debuff (Global)`; taking cumulative damage or reaching max ghost count sacrifices a ghost to gain a shield; expiration converts remaining shield into damage to all enemies.
- **Enhance Force:** each hero defeat summons a ghost.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Igor — tracker ID: `igor` — PARTIAL

Source: https://afkstargazer.com/en/skill/igor

**Page tags:** `Cheat Death (Self)`, `Debuff (AOE)`.

- **Ultimate — Funereal Ring:** creates a tombstone at battle start; every time an enemy hero loses 40% HP, summons another tombstone near that enemy. Igor stands on a tombstone and remains steadfast. Ultimate damages all enemies.
- **Ghastly Explosion:** activates tombstones periodically or on Ultimate; Igor jumps to an activated tombstone, damaging adjacent enemies. Becomes damage-immune and untargetable while casting; tombstones activated by Ultimate grant extra damage.
- **Capture excerpt ends during Ghastly Explosion; remaining base abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Ludovic — tracker ID: `ludovic`

Source: https://afkstargazer.com/en/skill/ludovic

**Page tags:** `DoT`, `Temp Buff`.

- **Ultimate — Eternal Serenity:** creates an everbloom field with a healing pool that restores nearby allies over time. Field withers when healing pool is depleted but restores its pool over time and revives when full. Active cast moves the field and releases three healing waves.
- **Lifeweaver's Blooms:** `DoT`; when non-summoned enemies lose enough HP, field absorbs part of their max HP as nutrients. Active cast applies HP loss over time to enemy with highest cumulative damage.
- **Ethereal Blooms:** moves field near weakest ally and absorbs HP from nearest non-summoned enemy to restore healing pool.
- **Hero Focus:** Healing, with extra Healing after field accumulates a specified total healing amount.
- **Exclusive Equipment — Ephemeral Berries:** every two nutrient absorptions create a berry that explodes, damaging enemies and healing allies. Higher ranks permanently improve field recovery after early absorptions.
- **Enhance Force:** enemies entering the everbloom field take damage and are stunned, once per enemy every 12 s.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s; higher ranks add Healing after a cumulative-healing threshold.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Partial entries are not complete kit records and require recapture.
- Preserve exact source tag labels and keep per-skill tags separate from hero-level page tags.
- No Supabase schema or data was changed by this extraction.
