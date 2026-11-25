# Hero Knowledge Extraction — Batch 04

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial entries are explicitly marked.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| harak | Harak | Airborne; DoT; Execute; Heal Denial | Core page captured |
| zanie | Zanie | Debuff (Single Target); DoT; Summon | Core page captured |
| zandrok | Zandrok | Airborne; Haste (Opening, AOE); Temp Buff (Opening, AOE); Tile Effect | Partial |
| silven | Silven | No page-level buttons in excerpt | Core page captured |
| shadewing | Shadewing | Debuff; Debuff (Single Target); Debuff (Global); DoT | Core page captured |
| sylphira | Sylphira | Not visible in returned excerpt | Partial |
| brutus | Brutus | Cheat Death (Self); Debuff (AOE) | Partial |
| aurora | Aurora | Debuff (Single Target); Summon | Core page captured |
| alna | Alna | No page-level buttons in excerpt; per-skill Debuff (Global), Special Target, Debuff (AOE) | Partial |
| zorya | Zorya | Cheat Death (Self); Debuff (AOE) | Core page captured |

## Hero records

### Harak — tracker ID: `harak`

Source: https://afkstargazer.com/en/skill/harak

**Page tags:** `Airborne`, `DoT`, `Execute`, `Heal Denial`.

- **Ultimate — Vicious Bite:** `Airborne`, `DoT`, `Heal Denial`. Strikes one enemy 10 times; each hit deals damage plus bonus based on the target's lost HP. Final strike knocks down. While casting, Harak is unaffected and prevents target HP recovery for 6 s, causing periodic HP loss.
- **Tidal Assault:** `Airborne`; dives to weakest enemy, damages and knocks them back. Harak is invincible underwater; assists/defeats reset cooldown.
- **Flesh Feast:** `Execute`; opening feast mode grants Crit and Haste for 12 s, refreshed by assists/defeats. When feast ends, Harak loses control and devours the weakest non-summoned unit (ally or enemy) if target HP is below the stated ATK threshold.
- **Hero Focus:** Life Drain, stacking on assists/defeats.
- **Exclusive Equipment — Ravenous Digestion:** assists/defeats grant a portion of defeated unit ATK and max HP, with caps; higher rank heals based on defeated unit max HP.
- **Enhance Force:** after assisting/defeating two units, Harak recovers 700 Energy from Vicious Bite. LV 2 improves opening feast with attack speed, Energy, ATK/HP, damage reduction and lost-HP-based bonus damage.
- **Season Charm:** own-skill displacement grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate opening defensive/offensive effect and refine stats.

### Zanie — tracker ID: `zanie`

Source: https://afkstargazer.com/en/skill/zanie

**Page tags:** `Debuff (Single Target)`, `DoT`, `Summon`.

- **Ultimate — Vein Pulse:** passive: deploys two laser turrets at battle start. Turrets attack enemies; if placed within 2 tiles, they link and focus the nearest enemy, dealing repeated damage and reducing shield value. Active: Zanie increases her own and turrets' ATK SPD and ATK for 10 s; turret attacks gain current-HP-based bonus damage.
- **Iron Defense:** `Summon`; builds a gun turret in front of Zanie. After two normal attacks, its next attack fires six rounds, each damaging, stunning and knocking back the target.
- **Field Repairs:** when gun turret is destroyed, Zanie repairs it once per battle; active effect repairs the weakest laser turret, restoring HP and granting a shield.
- **Hero Focus:** Penetration.
- **Exclusive Equipment — Precision Overload:** periodically upgrades one turret, increasing max HP, ATK and range; frontmost laser turret has priority.
- **Enhance Force:** `Debuff (Single Target)`, `DoT`; laser turret hits burn target, reducing ATK and dealing damage over time; linked turrets also reduce Phys DEF.
- **Season Charm:** ATK and Phys/Magic DEF increases for caster and created units; higher ranks add Haste after 5 s.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.
- **Source note:** page excerpt displays unusual cooldown formatting for Precision Overload; preserve raw source value separately if parsing the numeric cooldown.

### Zandrok — tracker ID: `zandrok` — PARTIAL

Source: https://afkstargazer.com/en/skill/zandrok

**Page tags:** `Airborne`, `Haste (Opening, AOE)`, `Temp Buff (Opening, AOE)`, `Tile Effect`.

- **Ultimate — Savage Slash:** `Airborne`; slams an enemy, destroys obstacles within 2 tiles and damages/knocks airborne nearby enemies.
- **Rallying Roar:** `Haste (Opening, AOE)`, `Temp Buff (Opening, AOE)`, `Tile Effect`. Opening illusions charge forward in a wedge, damage and destroy obstacles; allies passed through gain max HP, Life Drain, Haste and movement speed. Active cast buffs nearby allies with Life Drain and Haste.
- **Shock Stomp:** damages and stuns enemies within 1 tile.
- **Hero Focus:** max HP, with extra max HP while Rallying Roar buffs are active.
- **Exclusive Equipment — Hunter's Fury:** while above 50% initial max HP, normal attacks gain max-HP-based bonus damage; higher rank enhances the next normal attack of inspired allies.
- **Capture excerpt ends during Exclusive Equipment level details; Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Silven — tracker ID: `silven`

Source: https://afkstargazer.com/en/skill/silven

**Page tags:** no page-level tag buttons were visible in the captured result.

- **Ultimate — Aloft Edge:** summons six flying blades; for 8 s, normal attacks launch blades at enemies.
- **Gravity Collapse:** blades leave Blademarks; after four normal attacks, next attack hits the enemy with most Blademarks, knocks them down and detonates marks. Aloft Edge modifies range and adds extra blades.
- **Tempered Field:** opening field increases Ranged DEF; blades passing through it deal extra max-HP-based true damage. Field disappears when Silven moves and returns after he stands still for 3 s.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Oath of Fealty:** receiving a temporary stat buff from an ally restores Energy, permanently increases Penetration, and increases ATK SPD for Silven and that ally; once per ally.
- **Enhance Force:** deals 25% more damage to enemies whose current HP ratio is above 50%.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration while above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Shadewing — tracker ID: `shadewing`

Source: https://afkstargazer.com/en/skill/shadewing

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (Global)`, `DoT`.

- **Ultimate — Crimson Venom:** `DoT`; applies 10 s poison to an enemy, dealing damage per second plus a component based on the enemy's lost HP.
- **Razor Talons:** `DoT`; two claw strikes followed by 5 s of damage over time.
- **Hero Focus:** ATK.
- **Exclusive Equipment — Curse Feast:** each Withering Curse lash restores Energy and permanently increases damage dealt, up to a cap. Defeating an enemy with Crimson Venom restores Energy based on remaining venom duration.
- **Enhance Force:** at battle start targets the ally one tile in front, drains some of their current HP, and grants Shadewing ATK, Life Drain and a shield lasting the battle.
- **Season Charm:** `Debuff (Single Target)`; ATK increases per enemy affected by caster continuous-damage effects. Higher ranks make those effects reduce Phys/Magic DEF.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Sylphira — tracker ID: `sylphira` — PARTIAL

Source: https://afkstargazer.com/en/skill/sylphira

- The returned search excerpt begins in the middle of a skill section; page-level tags and base ability names are not visible.
- **Enhance Force:** after her score is activated, Sylphira performs Tremolo to enhance normal attacks. Enhanced attacks gain Life Drain and deal extra true damage based on target max HP, with an ATK cap.
- **Season Charm:** damage dealt and damage reduction increase; both effects are stronger while on the enemy side of the battlefield. Higher ranks add a permanent shield on first entry to the enemy side.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Recapture page from its beginning before recording base abilities and page tags.**

### Brutus — tracker ID: `brutus` — PARTIAL

Source: https://afkstargazer.com/en/skill/brutus

**Page tags:** `Cheat Death (Self)`, `Debuff (AOE)`.

- **Ultimate — Whirlwind Wrath:** spins Mountain's Roar, dealing damage each second to adjacent enemies for 4 s; Brutus is unaffected while spinning. LV 3 grants damage immunity while spinning.
- **Ferocious Roar:** `Debuff (AOE)`; taunts enemies within 2 tiles and reduces their Phys DEF for 9 s.
- **Indomitable:** `Cheat Death (Self)`; immune to the first fatal blow.
- **Capture excerpt stops during Indomitable; remaining skills, Hero Focus, equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Aurora — tracker ID: `aurora`

Source: https://afkstargazer.com/en/skill/aurora

**Page tags:** `Debuff (Single Target)`, `Summon`.

- **Ultimate — Starlit Slumber:** `Debuff (Single Target)`, `Summon`. Aurora summons Sonny and falls asleep; Sonny inherits a portion of her stats and inspires allied summons with Haste and improved movement. The frontmost enemy is marked as Nightmare, losing Haste but gaining a small ATK increase; allied summons focus it. Aurora is invincible while asleep and wakes if Sonny is defeated.
- **Dreamspark Bunny:** `Summon`; summons a temporary bunny with inherited stats that explodes on expiration, damaging adjacent enemies.
- **Plushification:** enemies remaining near sleeping Aurora are transformed into plushies, preventing movement and attacks; repeated transformations become faster over time. Does not affect unaffected enemies.
- **Hero Focus:** ATK increases based on the number of allied summons created by different allies.
- **Exclusive Equipment — Dream Veil:** while asleep, increases damage of allied summons and gives melee/ranged summons different roles and effects; Sonny receives both.
- **Enhance Force:** if Aurora has more than 500 Energy while asleep, Plushification range expands to 3 tiles.
- **Season Charm:** ATK and Phys/Magic DEF increases for caster and created units; higher ranks add Haste after 5 s.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Alna — tracker ID: `alna` — PARTIAL

Source: https://afkstargazer.com/en/skill/alna

- **Ultimate — Winter Anthem:** `Debuff (Global)`; opening passive reduces Haste and range for all units except Alna. Active blizzard removes enemy Haste buffs and deals repeated damage; while active, Alna and Winter Warrior recover part of damage taken over time.
- **Shared Resolve:** `Special Target`; selects an ally in the same row as Winter Warrior, grants immunity to Winter Anthem's Haste reduction and permanently increases their max HP. Active thrust damages enemies and restores HP to Alna and Winter Warrior.
- **Wild Whirl:** `Debuff (AOE)`; attacks nearby enemies and reduces their Haste.
- **Capture excerpt ends during Wild Whirl scaling; Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Zorya — tracker ID: `zorya`

Source: https://afkstargazer.com/en/skill/zorya

**Page tags:** `Cheat Death (Self)`, `Debuff (AOE)`.

- **Ultimate — Circle of Vigil:** passive alternates Zorya between dormant and awake states. Dormant state is invincible and restores Energy/HP; when Energy fills, she awakens, jumps to the densest enemy area and stuns nearby enemies. While awake, she consumes Energy continuously; at zero she becomes dormant. Energy from other sources cannot modify her Energy, but would-be Energy gains permanently increase ATK.
- **Hero Focus:** damage dealt, with extra damage when at least two enemies are nearby.
- **Exclusive Equipment — Intimidating Field:** `Debuff (AOE)`; while awake, creates a field reducing enemy movement speed and Haste while increasing Zorya's Haste. Allied Ultimates permanently increase the field's Haste bonus up to a cap.
- **Enhance Force:** `Cheat Death (Self)`; when a fatal blow would land, channels all Energy to survive and immediately enters dormant state, once per battle.
- **Season Charm:** deals magic damage to adjacent enemies and heals based on actual damage; higher ranks add opening unaffected duration.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Search excerpts may be truncated; partial entries require recapture.
- Preserve source labels exactly and keep page-level tags distinct from per-skill tags.
- No Supabase schema or data was changed by this extraction.
