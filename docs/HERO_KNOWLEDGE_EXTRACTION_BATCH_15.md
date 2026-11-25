# Hero Knowledge Extraction — Batch 15 (recapture pass 2)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** recover missing skill descriptions and tag evidence from the next group of partial profiles.
- **Scope:** documentation only. No Supabase writes.

## Profile upgraded to complete first-pass capture

### Pang — tracker ID: `pang`

Source: https://afkstargazer.com/en/skill/pang

**Per-skill tags visible:**
- Ultimate — Sky Splitter: `Energy Denial`
- Exclusive Equipment — Spirit Sync: `Temp Buff (Single Target)`
- Season Charm: `Temp Buff`

**Captured kit:**
- **Ultimate — Sky Splitter:** starts with 500 Energy. Pang enters meditation, then bursts for 350% ATK damage to enemies within 2 tiles. He enters Unyielding Force, draining 150 Energy/s, gaining 60 Haste and 17% ATK, and unlocking Skybreach Strikes. The final of seven strikes deals 150% ATK, stuns for 1.5 s, and prevents non-boss targets from recovering Energy for 5 s. Burst damage and ATK bonus scale through LV 5.
- **Zen Ward:** creates a 340% ATK Chi Barrier for 9 s. Pang is unaffected while channeling and while the barrier is active. When the barrier expires, breaks, or is reapplied, it turns into razor leaves dealing 210% ATK to his current target. Shield and damage scale with levels.
- **Hero Focus:** increases Pang's ATK by 9%; adds another 6% while in Unyielding Force. Scales to 15% + 10%.
- **Exclusive Equipment — Spirit Sync:** `Temp Buff (Single Target)`; increases ATK by 15% for any unit shielded by Chi Barrier. At LV 3, when another allied hero reaches 850 Energy, Pang grants them a Chi Barrier; the same ally can receive it only once every 15 s.
- **Enhance Force:** Pang immediately gains a Chi Barrier on entering Unyielding Force and gains 30 DEF Penetration while in that stance.
- **Season Charm:** `Temp Buff`; increases shield value provided by Pang. When he shields an ally, that ally gains Phys & Magic DEF for 8 s; higher ranks also heal for a percentage of the shield value.
- **Rivalry Mode:** reduces damage taken for 20 s at battle start, then increases damage dealt for 20 s; refine adds Healing and Haste.

## Recaptured sections — profiles remain partial

These pages now provide additional source text, but the available excerpt still omits at least one required section. Do not upgrade their status yet.

### Evie — tracker ID: `evie`

Source: https://afkstargazer.com/en/skill/evie

**Tags confirmed at ability level:**
- Ultimate — Intel Chase: `DoT`, `Special Target`, `Ult Denial`
- Pointed Proof: `Debuff (Single Target, Global)`
- Foretold Favor: `Special Target`, `Temp Buff (Opening, Single Target)`
- Exclusive Equipment — Tactical Briefing: `Debuff (Global)`

Captured detail:
- Intel Chase begins with Evie teleporting to the symmetrical enemy tile and entering concealment/invincibility while gathering Detection. Allied Ultimates reduce Detection. When revealed, she interrogates the enemy with the highest cumulative damage, dealing damage each second and immobilizing them; if she has intel on that target, she also silences them.
- Pointed Proof permanently reduces Magic DEF after an enemy's intel is completed; if all surviving enemy heroes are investigated, it applies an additional team-wide Magic DEF reduction.
- Foretold Favor sends a quill to the rearmost ally, then every 3 s switches to the ally with the highest cumulative damage, healing them and increasing ATK. Damage milestones send healing orbs to two other weakest allies.
- **Status remains partial:** returned excerpt ends inside Exclusive Equipment and omits later progression sections.

### Aster — tracker ID: `aster`

Source: https://afkstargazer.com/en/skill/aster

**Page tags:** `Debuff (AOE)`, `DoT`.

Captured detail:
- **Stellar Flare:** summons a Star that damages nearby enemies; supercharges all Stars, causing area damage and stun, followed by 6 s burn damage. Up to three Stars can exist, with placement replacement rules.
- **Gravitic Maw:** each Star creates a Planet on an adjacent tile; planets orbit, damaging enemies, while the active cast pulls enemies near Stars and Black Holes toward the nearest one.
- **Darklight Pulse:** fires beams along three lines covering the most enemies, damages them, grants Aster a shield based on actual damage, and reduces enemy shields.
- **Enhance Force:** expands Gravitic Maw pull range to 3 tiles; before Stars convert to Black Holes, Aster gains Energy recovery efficiency. After conversion, he becomes permanently invincible until he is the last surviving hero on his team.
- **Season Charm:** Energy recovery per second; after three Ultimates, ATK increases. Higher ranks add true damage to all enemies on each Ultimate.
- **Status remains partial:** the returned excerpt omits Hero Focus and Exclusive Equipment, so this is not a complete profile.

### Soren — tracker ID: `soren`

Source: https://afkstargazer.com/en/skill/soren

**Page tag:** `Debuff (AOE)`.

Captured detail:
- **Whirlwind Swing:** rushes to a selected tile, damages adjacent enemies and knocks them back. Collisions with allies, enemies, terrain or map borders deal additional damage and stun; automatic targeting prioritizes the tile causing the most collisions.
- **Repel Sweep:** melee strike knocks an enemy back; collision causes additional damage and stun.
- **Status remains partial:** returned excerpt does not contain the rest of the kit or progression sections.

### Florabelle — tracker ID: `florabelle`

Source: https://afkstargazer.com/en/skill/florabelle

**Per-skill tags visible:** Ultimate `Airborne`, `Summon`; Tiny Sharpshooter `Summon`.

Captured detail:
- **Pounding Blow:** Spiny is summoned at battle start. Active cast summons Smashy to damage adjacent enemies and knock them airborne; Smashy inherits Florabelle's HP and has its own control vulnerability. Higher level can coordinate all three Bulbsprites.
- **Overgrowth:** feeds a Bulbsprite to transform it into a giant for 8 s, granting Haste and Life Drain; targeting order is Smashy, Swifty, Spiny.
- **Tiny Sharpshooter:** summons Swifty in the backline; repeated cast while Swifty is present triggers Rapid Fire.
- **Hero Focus:** ATK increases, with an additional bonus while at least two summons are present.
- **Exclusive Equipment — Protective Blessing:** allied summons enter with a permanent shield based on Florabelle's ATK.
- **Status remains partial:** Enhance Force, Season Charm and Rivalry Mode were not included in the returned excerpt.

### Zandrok — tracker ID: `zandrok`

Source: https://afkstargazer.com/en/skill/zandrok

**Per-skill tags visible:**
- Ultimate — Savage Slash: `Airborne`
- Rallying Roar: `Haste (Opening, AOE)`, `Temp Buff (Opening, AOE)`, `Tile Effect`

Captured detail:
- **Savage Slash:** destroys obstacles within 2 tiles of the target position, deals damage based on enemy HP and knocks enemies airborne.
- **Rallying Roar:** opening passive sends illusions in a 5-tile-wide wedge toward the enemy side, damaging enemies and destroying obstacles. Allies passed by the illusions gain max HP, Life Drain, Haste and movement speed. Active cast buffs allies within 2 tiles.
- **Status remains partial:** remaining skills and progression sections were not included in the returned excerpt.

### Sylphira — tracker ID: `sylphira`

Source: https://afkstargazer.com/en/skill/sylphira

**Page tags:** `Debuff (AOE)`, `Energy Denial`, `Ult Denial`.

Captured detail:
- **Ultimate — Grand Finale:** `Debuff (AOE)`, `Ult Denial`. Sylphira builds beats over time and gains ATK/Haste when the score is complete. Active cast glides to the area with the most enemies, damages them, creates a Harmonic Domain, silences enemies inside and makes Sylphira unaffected while inside.
- **Status remains partial:** the returned excerpt ends during the Ultimate; other abilities and progression sections remain uncaptured.

### Brutus — tracker ID: `brutus`

Source: https://afkstargazer.com/en/skill/brutus

**Per-skill tags visible:**
- Ultimate — Whirlwind Wrath: no tag shown in returned excerpt.
- Ferocious Roar: `Debuff (AOE)`
- Indomitable: `Cheat Death (Self)`

Captured detail:
- **Whirlwind Wrath:** spins Mountain's Roar, dealing damage to adjacent enemies for 4 s; LV 3 grants damage immunity while spinning.
- **Ferocious Roar:** taunts enemies within 2 tiles and reduces their Phys DEF for 9 s.
- **Indomitable:** Brutus is immune to the first fatal blow he receives.
- **Status remains partial:** excerpt ends at the Indomitable heading; later sections are absent.

### Alna — tracker ID: `alna`

Source: https://afkstargazer.com/en/skill/alna

**Per-skill tags visible:**
- Ultimate — Winter Anthem: `Debuff (Global)`
- Shared Resolve: `Special Target`
- Wild Whirl: `Debuff (AOE)`

Captured detail:
- **Winter Anthem:** opening passive reduces Haste by 40 and range by 2 tiles for all units except Alna. Active blizzard removes enemy Haste buffs, deals periodic damage and converts some damage taken by Alna/Winter Warrior into healing over time.
- **Shared Resolve:** selects an ally in Alna's row as Winter Warrior, protecting them from Winter Anthem's Haste reduction and increasing their max HP. Active strike damages enemies and restores HP to Alna and the Winter Warrior.
- **Wild Whirl:** repeated spear strikes damage nearby enemies and reduce their Haste.
- **Status remains partial:** Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode were not in the returned excerpt.

### Lorsan — tracker ID: `lorsan`

Source: https://afkstargazer.com/en/skill/lorsan

Captured detail:
- **Whispering Tempest:** `Debuff (AOE)`; creates a storm around the frontmost enemy, reducing Haste and dealing periodic damage to enemies within 2 tiles.
- **Stormbound Retribution:** opening link connects the nearest and farthest enemies; 70% of damage taken by one is transferred to the other, with caps and break conditions.
- **Exclusive Equipment — Turbulent Resurgence:** when the chain breaks, heals all allies and recasts the chain, up to three casts per battle. Higher levels add stun.
- **Enhance Force:** `Debuff (Single Target)`, `Haste (Single Target)`, `Temp Buff (Single Target)`; protected target becomes unaffected. LV 2 increases chain casts, adds max-HP reduction to transferred damage, and gives Zephyr's Embrace to the ally dealing the most damage when the chain breaks.
- **Season Charm:** opening melee-damage bonus and ranged-damage reduction for the ally one tile in front; higher ranks add Energy on Hit.
- **Status remains partial:** Hero Focus and any missing base skill section were not visible in the returned excerpt.

## Coverage update

- Pang upgraded from partial to complete first-pass source capture.
- Nine other pages supplied useful missing skill text but remain partial pending the missing sections.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
