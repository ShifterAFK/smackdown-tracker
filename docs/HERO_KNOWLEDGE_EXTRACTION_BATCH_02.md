# Hero Knowledge Extraction — Batch 02

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness. Full-page captures are marked complete for the visible sections; truncated search excerpts are marked partial.
- **Canonical IDs:** tracker hero IDs remain authoritative; Stargazer names/slugs are source aliases.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| antandra | Antandra | Airborne; Debuff (AOE); Energy Battery | Core page captured |
| eironn | Eironn | Debuff (AOE); Ult (Opening) | Core page captured |
| talene | Talene | Cheat Death; Cheat Death (Self); Cheat Death (Ally); Special Target | Core page captured |
| baden | Baden | Airborne; Cheat Death (Self); Debuff; Debuff (Single Target); Debuff (AOE); Energy Denial; Heal Denial; Summon | Partial |
| phraesto | Phraesto | Debuff (Single Target); DoT; Energy Battery; Summon; Temp Buff (AOE) | Partial |
| cecia | Cecia | Debuff; Debuff (Single Target); Debuff (AOE); DoT; Summon | Core page captured |
| viperian | Viperian | Debuff; Debuff (Single Target); Debuff (Global); Energy Denial | Core page captured |
| athalia | Athalia | Cheat Death (Self) | Core page captured |
| nara | Nara | Not visible in returned excerpt | Partial |
| valen | Valen | Not visible in returned excerpt; Season Charm association visible | Partial |

## Hero records

### Antandra — tracker ID: `antandra`

Source: https://afkstargazer.com/en/skill/antandra

**Page tags:** `Airborne`, `Debuff (AOE)`, `Energy Battery`.

- **Ultimate — Shield Assault:** taunts enemies within 2 tiles, reduces damage taken by 60%, and makes Antandra unaffected for 5 s. Then stuns adjacent enemies, deals 400% ATK, knocks them down, and restores HP; each enemy hit adds further HP recovery.
- **Shield Formation:** selects the frontmost ally (not Antandra) at battle start and grants that ally plus Antandra shields based on the ally's max HP, capped by Antandra's ATK. Re-selects if guarded ally is defeated.
- **Spear Barrage:** `Debuff (AOE)`; attacks a frontal 1-tile arc three times and reduces targets' ATK by 20% for 6 s.
- **Hero Focus:** max HP increase.
- **Exclusive Equipment — Gale Barrier:** `Energy Battery`; when guarded ally first falls below 50% HP, Antandra rushes to them and reduces damage taken. LV 2 restores 100 Energy/sec to guarded ally for 4 s.
- **Enhance Force:** each enemy hit by Shield Assault increases Antandra's Phys DEF, stacking up to six times. LV 2 improves guarded ally shield and adds healing to Antandra based on guarded ally damage.
- **Season Charm:** opening and periodic shields for allies within 2 tiles; higher ranks add damage reduction.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Eironn — tracker ID: `eironn`

Source: https://afkstargazer.com/en/skill/eironn

**Page tags:** `Debuff (AOE)`, `Ult (Opening)`.

- **Ultimate — Verdant Cyclone:** pulls enemies within 2 tiles toward a selected tile, then explodes for AOE damage and immobilizes them for 3 s. Selects the tile with the most surrounding enemies.
- **Ice Spike:** `Debuff (AOE)`; slashes enemies in a 3-tile arc, reducing Haste by 50 for 5 s, then stabs the target and enemies in a line behind it, reducing Magic DEF by 40% for 5 s.
- **Tempest Guard:** self-shield for 10 s and 50% dodge chance while active; higher level increases dodge to 80%.
- **Hero Focus:** Ranged DEF, with an extra amount below 50% HP.
- **Exclusive Equipment — Howling Hurricane:** `Ult (Opening)`; casts Verdant Cyclone once per battle without consuming Energy, at reduced damage. Higher levels improve damage and immobilize duration.
- **Enhance Force:** `Debuff (AOE)`; further reduces Magic DEF on a target immobilized by Verdant Cyclone.
- **Season Charm:** critical-hit splash damage; higher ranks convert part of critical damage into a permanent shield.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Talene — tracker ID: `talene`

Source: https://afkstargazer.com/en/skill/talene

**Page tags:** `Cheat Death`, `Cheat Death (Self)`, `Cheat Death (Ally)`, `Special Target`.

- **Ultimate — Divine Conflagration:** flies to a designated central tile, consumes max HP and Energy over time, and fires a 5-tile flame. Damage includes a component based on Talene's lost HP, shared among hit enemies. Can continue without Energy at a higher HP cost.
- **Radiant Resurgence:** passive: losing 10% max HP heals the weakest ally; restoring 10% max HP damages the healthiest enemy. Active: consumes HP to summon Divine Fire in the densest enemy area.
- **Blazing Ascension:** `Cheat Death (Self)`; on defeat, Talene becomes an untargetable flame, regenerates HP and can benefit from allied skills; resurrects above 65% HP with an explosion and knockback. Each resurrection permanently reduces Vitality during flame state.
- **Hero Focus:** ATK increases based on cumulative max HP consumed.
- **Enhance Force:** improves HP recovery per second during the first flame state on defeat.
- **Season Charm:** critical-hit splash damage; higher ranks convert part of critical damage into a permanent shield.
- **Rivalry Mode:** no separate Rivalry section was visible in the captured excerpt; verify before recording as absent.

### Baden — tracker ID: `baden` — PARTIAL

Source: https://afkstargazer.com/en/skill/baden

**Page tags:** `Airborne`, `Cheat Death (Self)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`, `Summon`.

- **Ultimate — Omen's Grasp:** `Airborne`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`. Baden and phantoms strike one target four times; final hit deals true damage to target and adjacent enemies, drains HP, reduces max HP, and prevents HP/Energy recovery for 8 s. Baden is invincible while casting.
- **Capture is truncated at Ultimate level details.** Other abilities, Exclusive Equipment, Enhance Force, Season Charm, and Rivalry Mode need recapture.

### Phraesto — tracker ID: `phraesto` — PARTIAL

Source: https://afkstargazer.com/en/skill/phraesto

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Battery`, `Summon`, `Temp Buff (AOE)`.

- **Ultimate — Futile Echo:** passive summons an identical Illusion during preparation, inheriting 100% of Phraesto's stats and able to cast all his skills. If both are in the same row, each gains 30% damage reduction until one is defeated. Active effect damages enemies within 2 tiles and heals Phraesto per enemy hit.
- **Crimson Contract:** `Energy Battery`; Phraesto and Illusion each contract with a different ally one tile behind them at battle start; the captured excerpt ends during this skill.
- **Remaining skill sections and upgrades require recapture.**

### Cecia — tracker ID: `cecia`

Source: https://afkstargazer.com/en/skill/cecia

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `DoT`, `Summon`.

- **Ultimate — Queen's Summons:** `DoT`, `Summon`. Summons Mr. Carlyle to a selected tile; he inherits Cecia's stats, gains bonus max HP that decays over time, and entangles enemies within 2 tiles, dealing damage over time and preventing movement/actions. Recasting while Carlyle is present restores him to max HP and repeats the entangle.
- **Earth's Offering:** excerpt shows an ATK SPD increase and an extra ATK SPD increase while Mr. Carlyle is on the battlefield; the complete ability text was not returned.
- **Exclusive Equipment — Trial of Thorns:** `Debuff (Single Target)`, `DoT`. Entangles an enemy, deals damage over time and prevents movement/actions; Cecia absorbs Phys DEF and Magic DEF from the target and shares stolen stats with Mr. Carlyle.
- **Enhance Force:** `Debuff (AOE)`; reduces the normal-attack requirement for Agonizing Puncture. LV 2 grants 500 Initial Energy and permanent stat stealing from entangled enemies when casting Ultimate, shared with Mr. Carlyle.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Viperian — tracker ID: `viperian`

Source: https://afkstargazer.com/en/skill/viperian

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (Global)`, `Energy Denial`.

- **Ultimate — Spiritual Viper:** `Debuff (Single Target, Global)`, `Energy Denial`. At battle start, sacrifices HP to send Darkvipers to possess enemies. Possessed enemies drop Energy when hit and lose HP over time. Active Ultimate damages all possessed enemies and can possess the nearest enemy if none are possessed.
- **Soul Ravager:** drains HP from the healthiest enemy, dealing damage and healing Viperian for the damage dealt.
- **Enchantment Fang:** `Energy Denial`; Darkvipers periodically damage possessed enemies. Active effect enhances the next bite and reduces target Energy by 60 (LV 4: 100).
- **Hero Focus:** Haste.
- **Exclusive Equipment — Crimson Waltz:** after 10 s, if HP ratio is above 90%, burns 30% HP to damage all enemies; triggers once every 30 s.
- **Enhance Force:** `Debuff (Single Target)`; Darkvipers return when possessed enemies are defeated, restoring HP and Energy. LV 2 enables additional possession and Life Drain.
- **Season Charm:** opening damage and Haste bonus; higher ranks restore HP and extend the effect after assists/defeats.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Athalia — tracker ID: `athalia`

Source: https://afkstargazer.com/en/skill/athalia

**Page tags:** `Cheat Death (Self)`.

- **Ultimate — Unbroken Retribution:** passive: after defeat, Athalia manifests as a lance that continues attacking with reduced ATK. Active: leaps to the enemy with highest cumulative damage and deals true damage plus a component based on recorded enemy HP loss; knocks down and is invincible while casting.
- **Vengeance Charge:** targets the highest cumulative-damage enemy and dashes behind them, damaging the target and enemies in the path; invincible during dash.
- **Vanguard's Renewal:** transforms into a lance and strikes adjacent enemies six times; becomes unaffected, reduces damage taken and heals during cast.
- **Hero Focus:** Crit, with extra Crit against the highest cumulative-damage enemy.
- **Exclusive Equipment — Divine Verdict:** every second Vengeance Charge also unleashes Sacred Slashes along the two densest straight paths. LV 4 adds Execution and resets Vengeance Charge cooldown after assists/defeats or Ultimate.
- **Enhance Force:** Vengeance Charge and Sacred Slash can reduce enemy shield value, capped at 800% ATK.
- **Season Charm:** displacement caused by own skills grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Nara — tracker ID: `nara` — PARTIAL

Source: https://afkstargazer.com/en/skill/nara

- The returned indexed excerpt starts in the middle of the page and does not expose page-level tags or the full base kit.
- **Enhance Force:** `Debuff (Single Target)`. Defeating an enemy with Crimson Vengeance instantly restores 250 Energy. LV 2: while casting Phantom Chains, Nara becomes unaffected for 3 s and permanently reduces target Vitality by 30; also reduces target max HP by 20% (capped at 250% of Nara's ATK).
- **Season Charm:** opening damage and Haste bonus; higher ranks restore HP and extend the effect after assists/defeats.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Recapture the page from its beginning before transcribing base abilities or tags.**

### Valen — tracker ID: `valen` — PARTIAL

Source: https://afkstargazer.com/en/skill/valen

- The returned excerpt exposed only the Season Charm section and the list of heroes sharing it; page-level tags and abilities were not returned.
- **Season Charm:** critical-hit splash damage to enemies within 1 tile of the target; higher ranks convert a portion of critical damage into a permanent shield.
- **Recapture the page from its beginning before transcribing abilities or tags.**

## Source and quality notes

- Stargazer pages are community-maintained, not an official game API.
- Do not treat truncated search excerpts as complete hero records.
- Preserve tag labels exactly and keep per-ability tags distinct from hero page tag buttons.
- No Supabase schema or data was changed by this extraction.
