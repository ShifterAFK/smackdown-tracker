# Hero Knowledge Extraction — Batch 09

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial records require recapture.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| dionel | Dionel | Airborne; Debuff (Global) | Core page captured |
| salazer | Salazer | Debuff (Single Target) | Core page captured |
| mirael | Mirael | DoT | Core page captured |
| saida | Saida | Cheat Death (Self); Debuff (Single Target); DoT; Energy Denial | Partial |
| contess | Contess | Debuff (Single Target); DoT; Energy Denial; Temp Buff; Ult Denial | Partial |
| niru | Niru | Per-skill Cheat Death (Ally); Special Target; Ult (Opening); Heal Denial; Temp Buff (Single Target) | Core page captured |
| pippa | Pippa | Airborne; Energy Denial | Partial |
| himmel | Himmel | No page-level buttons in excerpt; per-skill Tile Effect noted in previous audit | Partial |
| marilee | Marilee | No page-level buttons in excerpt | Partial |
| elijah-lailah | Elijah & Lailah | Per-skill Haste (Global); Temp Buff (Global); Energy Battery; Tile Effect | Partial |

## Hero records

### Dionel — tracker ID: `dionel`

Source: https://afkstargazer.com/en/skill/dionel

**Page tags:** `Airborne`, `Debuff (Global)`.

- **Ultimate — Dawn Light:** `Airborne`; Dionel soars and becomes untargetable for 6 s, attacking the densest enemy area with spear thrusts. Final hit knocks enemies airborne.
- **Starry Void:** passive normal attack becomes a Penetration attack that hits all enemies along its path.
- **Nectar Feast:** passive: temporary allied stat buffs add Intoxication stacks, increasing ATK and ATK SPD up to three stacks. Active: drinks nectar to increase ATK and ATK SPD for 12 s.
- **Hero Focus:** normal attacks permanently increase ATK SPD during battle, up to a cap.
- **Exclusive Equipment — Celestial Spear:** `Debuff (Global)`; when Intoxication is fully stacked, summons a light spear that deals true damage to all enemies, up to three casts per battle. LV 3 adds max-HP-based true damage and reduces Vitality.
- **Enhance Force:** increases Execution during Nectar Feast; LV 2 speeds up drinking, grants a shield during effect and adds Execution at max Intoxication.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Salazer — tracker ID: `salazer`

Source: https://afkstargazer.com/en/skill/salazer

**Page tags:** `Debuff (Single Target)`.

- **Ultimate — Rain of Blades:** summons Flying Swords for nine strikes against highest-HP enemy; each strike deals ATK damage plus current-HP-based extra damage, capped by Salazer's ATK.
- **Enraptured Whip:** damages enemies in a 2-tile arc; if target HP falls below 70%, launches another attack.
- **Hero Focus:** damage reduction.
- **Exclusive Equipment — Soul Drench:** casts Enraptured Whip without cooldown at battle start or when an enemy is imprisoned; higher ranks add current-HP-based damage and extra whip casts.
- **Enhance Force:** heals Salazer for every imprisoned enemy. LV 2 increases Spirit Shackles damage and grants a shield when a previously imprisoned enemy is defeated.
- **Season Charm:** adjacent-enemy magic damage and self-healing; higher ranks add opening unaffected duration.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.

### Mirael — tracker ID: `mirael`

Source: https://afkstargazer.com/en/skill/mirael

**Page tags:** `DoT`.

- **Ultimate — Winged Flame:** selects a direction and summons a 3-tile-wide wall of flame, dealing high damage to burned enemies.
- **Bone Sear:** `DoT`; burns one enemy for 10 s, prioritizing unburned enemies.
- **Fireball Singe:** fireball damages target and adjacent enemies.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Dance of Flames:** after first Winged Flame, Fireball Singe becomes Mirael's normal attack for the rest of battle and fires two fireballs. Higher levels add more Bone Sear targets and damage.
- **Enhance Force:** extends Bone Sear duration; LV 2 increases cooldown and targets burned, while granting Mirael a large temporary ATK SPD increase.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Saida — tracker ID: `saida` — PARTIAL

Source: https://afkstargazer.com/en/skill/saida

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `DoT`, `Energy Denial`.

- **Ultimate — Seed Siphon:** `Energy Denial`; teleports to an enemy, prevents movement/actions, deals damage and drains Energy, planting a Drain Seed. Seed periodically damages host and reduces Energy; seeds drop when host is defeated or Saida casts Ultimate on host again.
- **Enhance Force:** at battle start, plants Drain Seeds on two nearby allies; seeds do not harm allies and instead grant shields.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Capture excerpt does not include the full base kit, Hero Focus, Exclusive Equipment or all Enhance Force details; recapture required.**

### Contess — tracker ID: `contess` — PARTIAL

Source: https://afkstargazer.com/en/skill/contess

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Denial`, `Temp Buff`, `Ult Denial`.

- **Ultimate — Detention Pass:** opening passive hides Contess in her rulebook; she cannot move/act or be targeted and recovers Energy until a condition reveals her. Active: heals an ally and grants Exemption. Exemption protects that ally from Contess' rule-violation punishment; while ally HP remains above 40%, loses max HP over time, converting part of the loss into a capped shield and ATK increase.
- **Capture excerpt ends during Ultimate description; other skills and progression sections require recapture.**

### Niru — tracker ID: `niru`

Source: https://afkstargazer.com/en/skill/niru

**Per-skill tags visible:** `Cheat Death (Ally)` on Ultimate; `Special Target`, `Ult (Opening)` on Exclusive Equipment; `Heal Denial`, `Temp Buff (Single Target)` on Enhance Force. No page-level buttons were visible.

- **Ultimate — Soul Shepherd:** `Cheat Death (Ally)`; protects weakest ally from fatal blow, turns them into a Spirit and restores HP. Spirit deals reduced damage while losing HP over time; can be targeted on Niru himself if no other ally remains.
- **Soul Reaping:** attacks weakest enemy with extra damage based on lost HP.
- **Spirit Devour:** damages all enemies with max-HP-based extra damage and heals weakest ally by equal amount.
- **Hero Focus:** HP.
- **Exclusive Equipment — Ethereal Form:** `Special Target`, `Ult (Opening)`; at battle start casts Ultimate on nearest ally without Energy cost, backline priority. Higher ranks delay Spirit HP loss until allies enter Spirit form.
- **Enhance Force:** `Heal Denial`, `Temp Buff (Single Target)`; Soul Reaping prevents target HP recovery for 8 s. LV 2 modifies Spirit Devour and grants defensive buffs to Shemira or Daimon when healed.
- **Season Charm:** opening ranged-damage buff for ally placed one tile behind; higher ranks add a conditional shield.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.
- **Targeting rules are explicitly documented on the source page; preserve them as a separate field.**

### Pippa — tracker ID: `pippa` — PARTIAL

Source: https://afkstargazer.com/en/skill/pippa

**Page tags:** `Airborne`, `Energy Denial`.

- **Ultimate — Wild Shift:** `Airborne`; immobilizes two rearmost enemies, teleports them to a target tile and drops them, damaging and knocking down enemies there. Passive: each skill has a 20% chance to go out of control and teleport target to random enemy-side location.
- **Mad Missiles:** fires nine magic missiles at enemies in quick succession.
- **Exclusive Equipment — Mage's Bloom:** prevents first cast of each skill from going out of control; skill casts can trigger mutation. Mutated damage creates adjacent true damage and immobilization.
- **Capture excerpt does not show all skills, Hero Focus, Enhance Force, Season Charm and Rivalry Mode; recapture remainder.**

### Himmel — tracker ID: `himmel` — PARTIAL

Source: https://afkstargazer.com/en/skill/himmel

- **Ultimate — Heroic Slash:** nine slashes in a frontal area, then a wide sweep with max-HP-based true damage.
- **Heroic Dash:** dashes to the two enemies with highest cumulative damage, damages and knocks them down, then returns to original position; unaffected while casting.
- A returned later section describes Blue-Moon Blessings: a later battlefield sweep heals all party members and removes debuffs; surviving party members increase Himmel's ATK. Further text specifies different max-HP/ATK bonuses for Tank/Support versus Mage/Himmel.
- **Enhance Force:** in Boss Fights, Himmel and party members cause 12% more HP loss on boss targets.
- **Season Charm:** own-skill displacement grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.
- **Recapture page from beginning for missing middle skill(s), page-level tags, Hero Focus and Exclusive Equipment.** Prior audit notes Hero Party has `Tile Effect`; verify its full section.

### Marilee — tracker ID: `marilee` — PARTIAL

Source: https://afkstargazer.com/en/skill/marilee

- **Ultimate — Mid-Air Shot:** leaps up to two tiles and shoots the two closest enemies to initial tile.
- **Mighty Arrow:** after every two normal attacks, charges next normal attack to deal increased damage and stun.
- **Hyperfocus:** when no enemy is within 2 tiles, increases ATK and ATK SPD.
- **Hero Focus:** Crit DMG Boost.
- **Capture excerpt ends during Hero Focus; Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Elijah & Lailah — tracker ID: `elijah-lailah` — PARTIAL

Source: https://afkstargazer.com/en/skill/elijah-lailah

**Per-skill tags visible:** `Haste (Global)`, `Temp Buff (Global)` on Ultimate; `Energy Battery`, `Tile Effect` on Stellar Bond.

- **Ultimate — Starlight Waltz:** `Haste (Global)`, `Temp Buff (Global)`; twins fight separately but share HP and Energy. Active dance increases all allies' Haste for 7 s; allies linked by Stellar Bond become unaffected during dance.
- **Stellar Bond:** `Energy Battery`, `Tile Effect`; Elijah forms a bond with Lailah when they align; allies in a straight path between twins also become linked.
- **Capture excerpt ends during Stellar Bond; remaining skill details, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Partial records require recapture before verification.
- Preserve source labels exactly and distinguish per-skill tags from hero-level page tags.
- No Supabase schema or data was changed by this extraction.
