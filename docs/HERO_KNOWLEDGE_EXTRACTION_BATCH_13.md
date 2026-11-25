# Hero Knowledge Extraction — Batch 13 (Roster completion)

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Purpose:** close the seven tracker IDs missing from batches 01–12 after a read-only comparison with `public.ss_heroes`.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| daimon | Daimon | Per-skill Summon; Special Target; Temp Buff (Opening, Single Target); Debuff (Single Target, AOE); Temp Buff | Core page captured |
| gerda | Gerda | No page-level buttons in excerpt | Core page captured |
| peggy | Peggy | Debuff (Single Target); Summon | Core page captured |
| perseus | Perseus | Temp Buff (Opening, AOE) | Partial |
| ravion | Ravion | Per-skill Debuff (Single Target); Energy Battery; Special Target; Temp Buff (Single Target); Cheat Death (Self, Ally); Haste (Single Target); Temp Buff (Opening, Single Target) | Core page captured |
| shakir | Shakir | Per-skill Airborne; Haste (AOE); Temp Buff (AOE); Temp Buff (AOE); Debuff (Single Target, AOE) | Core page captured |
| tasi | Tasi | Per-skill Cheat Death (Self); no page-level buttons visible in excerpt | Core page captured |

## Hero records

### Daimon — tracker ID: `daimon`

Source: https://afkstargazer.com/en/skill/daimon

**Per-skill tags visible:** `Summon` on Ultimate; `Special Target`, `Temp Buff (Opening, Single Target)` on Buddy Barrier; `Debuff (Single Target, AOE)` on Exclusive Equipment; `Temp Buff` on Season Charm.

- **Ultimate — Dolly Defender:** `Summon`; Stitchy fights alongside Daimon, automatically attacking nearest enemy. Active: Stitchy slashes an X-shaped area for max-HP-based true damage; Daimon and two weakest allies gain shields based on damage dealt.
- **Playtime Plunder:** Stitchy periodically deals max-HP-based true damage to target and adjacent enemies; damage converts to Daimon's shield. Active: Daimon drains target max HP and converts it to shield.
- **Buddy Barrier:** `Special Target`, `Temp Buff (Opening, Single Target)`; bonds with ally placed behind Daimon during preparation. When Daimon gains shield, bonded ally receives a portion; while shielded by Daimon, bonded ally gains Life Drain and ATK. Re-bonds to weakest ally if companion is defeated.
- **Hero Focus:** damage reduction; extra reduction while shielded.
- **Exclusive Equipment — Guardian Growl:** `Debuff (Single Target, AOE)`; when cumulative damage taken and shield loss exceed threshold, Stitchy returns and frightens nearby enemies plus enemy who dealt most damage to Daimon.
- **Enhance Force:** when allied hero's shield expires, converts half remaining shield into healing for that hero.
- **Season Charm:** `Temp Buff`; increases shield value and grants Phys/Magic DEF when shielding; higher ranks also heal based on shield value.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Gerda — tracker ID: `gerda`

Source: https://afkstargazer.com/en/skill/gerda

**Page-level buttons:** none visible in captured result.

- **Ultimate — Splashing Fun:** splashes spring water within 2 tiles, healing allies and damaging enemies; enemies are slept. Healing received from the hot spring extends sleep duration, up to a cap.
- **Spring Therapy:** opening leap and ground stomp damages and interrupts enemies, then creates a hot spring. Allies in it heal over time; enemies also recover a small capped amount of HP.
- **Mighty Smash:** damages and stuns an enemy; Gerda gains a shield.
- **Hero Focus:** damage reduction.
- **Exclusive Equipment — Spring of Life:** increases healing received from allied hot spring; each ally heal reduces Mighty Smash cooldown. Higher level makes allies unaffected briefly when entering spring for first time.
- **Enhance Force:** Spring Therapy stomp stuns instead of interrupting. LV 2 grants first-entry shield to allies in hot spring, with further shields per healing instance and per-ally cap.
- **Season Charm:** adjacent-enemy magic damage and self-healing; higher ranks add opening unaffected duration.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Peggy — tracker ID: `peggy`

Source: https://afkstargazer.com/en/skill/peggy

**Page tags:** `Debuff (Single Target)`, `Summon`.

- **Ultimate — Princess' Rally:** `Summon`; summons two royal guards that inherit Peggy's HP and ATK. Active: heals remaining guards and orders them to protect all allies; 70% of ally damage taken is shared among guards, whose own HP loss is reduced.
- **Royal Scroll:** heals remaining royal guards and two weakest allies over 8 s.
- **Royal Barrage:** `Debuff (Single Target)`, `Summon`; summons a royal marksman in backline to attack two frontmost enemies with armor-piercing arrows. Hit enemies take increased ranged damage; allied summons gain an additional ranged-damage bonus against them.
- **Hero Focus:** Haste; extra Haste while two royal guards remain.
- **Exclusive Equipment — Royal Protection:** royal guards use sword moves while Princess' Rally active, dealing AOE damage and gaining shields. LV 3 creates glory aura increasing melee damage for allies, with extra bonus for allied summons.
- **Enhance Force:** when at least three allied summons from different allies are alive, all allied summons gain ATK and Phys/Magic DEF based on Peggy's initial stats.
- **Season Charm:** ATK and Phys/Magic DEF increase for caster and created units; higher ranks add Haste after 5 s.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

### Perseus — tracker ID: `perseus` — PARTIAL

Source: https://afkstargazer.com/en/skill/perseus

**Page tags:** `Temp Buff (Opening, AOE)`.

- **Ultimate — Divine Rend:** marches three tiles in chosen direction, striking adjacent enemies repeatedly and pushing them along the path; ends with shield bash that damages and stuns enemies within 1 tile. Perseus is unaffected while casting.
- **Capture excerpt ends during Ultimate levels.** Remaining abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.

### Ravion — tracker ID: `ravion`

Source: https://afkstargazer.com/en/skill/ravion

**Per-skill tags visible:** `Debuff (Single Target)`, `Energy Battery`, `Special Target`, `Temp Buff (Single Target)` on Designated Duty; `Cheat Death (Self, Ally)`, `Haste (Single Target)`, `Temp Buff (Single Target)` on Exclusive Equipment; `Temp Buff (Opening, Single Target)` on Enhance Force.

- **Ultimate — Killer Flush:** launches 15 leaf cards at an enemy, each dealing ATK damage plus extra damage based on target lost HP. Ravion is unaffected while casting.
- **Designated Duty:** `Debuff (Single Target)`, `Energy Battery`, `Special Target`, `Temp Buff (Single Target)`; assigns an Objective to each of two rearmost allies. Completing objective by damage/assist/defeat restores Energy and grants ATK based on Ravion's initial ATK. After both complete, Ravion activates Mortal Ace against enemy with highest cumulative damage, reducing ATK/Phys DEF and striking/knocking down.
- **Phantom Gambit:** teleports three times; first two arrivals damage densest enemy tiles, third moves Ravion to a tile farthest from enemies.
- **Hero Focus:** ATK; extra ATK after first Mortal Ace.
- **Exclusive Equipment — Shadow Patron:** `Cheat Death (Self, Ally)`, `Haste (Single Target)`, `Temp Buff (Single Target)`; after first Mortal Ace, permanently increases Haste and ATK for Ravion and allies who completed Objectives. LV 3 prevents first fatal blow to Ravion or objective ally, grants shield/Life Drain, and may swap ally with Ravion.
- **Enhance Force:** `Temp Buff (Opening, Single Target)`; when ally accepts Objective, increases ATK and makes them unaffected for 5 s.
- **Season Charm:** own-skill displacement grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Targeting:** page specifies rearmost-ally scan order by row and hex ID; preserve separately.

### Shakir — tracker ID: `shakir`

Source: https://afkstargazer.com/en/skill/shakir

**Per-skill tags visible:** `Airborne`, `Haste (AOE)`, `Temp Buff (AOE)` on Ultimate; `Debuff (Single Target, AOE)` on Enhance Force; `Temp Buff (AOE)` on Season Charm.

- **Ultimate — Ravaging Claws:** `Airborne`, `Haste (AOE)`, `Temp Buff (AOE)`; morphs into wolf, knocks target airborne and damages enemies within 2 tiles. While in Wolf Form, creates Lupine Aura; Shakir's normal attacks hit frontal area, allies in aura take less damage and gain Haste. Maintaining wolf form consumes Energy per second.
- **Savage Cleave:** three consecutive strikes; in Wolf Form damages enemies in frontal arc.
- **Wolf's Will:** passive Ranged DEF; in Wolf Form Shakir is unaffected and gains Life Drain. Each non-summoned ally in Lupine Aura grants Shakir ATK.
- **Hero Focus:** damage reduction; extra reduction when at least two non-summoned allies are buffed by Lupine Aura.
- **Exclusive Equipment — All-Conquering:** `Temp Buff (AOE)`; can cast Ultimate above Energy threshold and remains in Wolf Form without Energy cost for a period after Ultimate. Higher rank shares Wolf's Will ATK bonus with allies in aura.
- **Enhance Force:** `Debuff (Single Target, AOE)`; third hit of Savage Cleave reduces target Vitality for 4 s.
- **Season Charm:** `Temp Buff (AOE)`; every 8 s increases ATK and Life Drain for allies within 2 tiles; higher ranks add shield for Shakir per ally affected.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Tasi — tracker ID: `tasi`

Source: https://afkstargazer.com/en/skill/tasi

**Per-skill tag visible:** `Cheat Death (Self)` on Fluttering Dream. No page-level buttons were visible.

- **Ultimate — Eternal Dreamscape:** creates a 3.5 s dream hypnotizing all enemies; they cannot move or act and take damage over time.
- **Dream Dance:** consumes part of current HP to damage and stun adjacent enemies, then flies to farthest enemy and repeats the effect with reduced damage against targets hit twice.
- **Fluttering Dream:** `Cheat Death (Self)`; when Tasi loses 50% HP, enters dream realm and transforms into butterfly, becoming invincible, recovering HP and damaging adjacent enemies. Can trigger twice per battle.
- **Hero Focus:** ATK; extra ATK while Eternal Dreamscape lasts.
- **Exclusive Equipment — Shimmering Dust:** after Ultimate, gains Haste and damage reduction; Dream Dance no longer costs HP or has cooldown during this window and prioritizes farthest hypnotized enemy.
- **Enhance Force:** each assist/defeat of a non-summoned enemy grants an extra Fluttering Dream attempt.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Perseus is explicitly partial because the returned excerpt ends during Ultimate level scaling.
- Preserve exact source tags and keep per-skill tags separate from page-level tags.
- This batch closes the seven tracker IDs missing from the prior 12 batches.
- No Supabase schema or data was changed by this extraction.
