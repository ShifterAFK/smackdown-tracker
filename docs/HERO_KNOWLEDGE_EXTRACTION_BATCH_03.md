# Hero Knowledge Extraction — Batch 03

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial pages are explicitly marked and must be recaptured.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| granny-dahnie | Granny Dahnie | Debuff (Single Target); Energy Denial | Core page captured |
| velara | Velara | No page-level tag buttons in excerpt; per-skill Debuff labels present | Core page captured |
| temesia | Temesia | Airborne; Debuff; Debuff (Single Target); Debuff (AOE) | Core page captured |
| evie | Evie | No page-level buttons in excerpt; per-skill DoT; Special Target; Ult Denial; Debuff (Single Target, Global); Temp Buff (Opening, Single Target) | Partial |
| lamentis | Lamentis | Not visible in returned excerpt; Summon appears on Exclusive Equipment | Partial |
| valka | Valka | Debuff (Single Target) | Core page captured |
| aster | Aster | Debuff (AOE); DoT | Partial |
| indris | Indris | Debuff (Single Target) | Core page captured |
| soren | Soren | Debuff (AOE) | Partial |
| florabelle | Florabelle | Airborne; Summon | Partial |

## Hero records

### Granny Dahnie — tracker ID: `granny-dahnie`

Source: https://afkstargazer.com/en/skill/granny-dahnie

**Page tags:** `Debuff (Single Target)`, `Energy Denial`.

- **Ultimate — Threshold of Jade:** `Energy Denial`. Summons Parasitic Grass within 2 tiles for 3 s; each second, enemies in range cannot move or act, lose 25 Energy and lose at least 60% ATK HP. Total HP loss is 130% ATK per second; Granny Dahnie recovers an equal amount. She is unaffected while the grass exists.
- **Seed Cannon:** `Debuff (Single Target)`. When an enemy deals total damage equal to 15% of Granny Dahnie's max HP to her, she shoots Parasitic Seeds at that enemy, dealing damage and reducing Haste for 6 s.
- **Angry Taunt:** taunts an enemy for 3 s and heals Granny Dahnie; prioritizes the enemy targeting the weakest ally.
- **Hero Focus:** Vitality, with extra Vitality while casting Threshold of Jade.
- **Exclusive Equipment — Glimmerbloom Blessings:** below 50% HP, increases Phys/Magic DEF and heals per second for 12 s; once per battle.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.
- **Capture did not expose Enhance Force or Season Charm; verify whether absent or simply beyond returned excerpt.**

### Velara — tracker ID: `velara`

Source: https://afkstargazer.com/en/skill/velara

**Per-skill tags visible:** `Debuff (AOE, Global)` on Ultimate; `Debuff (Single Target)` on Sinbound Shackles. No page-level buttons were visible in the captured result.

- **Ultimate — Ruthless Rite:** passive: creates four dormant magic circles at battle start; each awakens after accumulating 1000 Energy. Awakened circles heal allies within 2 tiles and reduce enemy Haste. Active: channels Energy into one dormant circle; when all are awakened, instead expands their area to the whole battlefield and transfers 30% of enemy basic stats, redistributed among allies for 10 s (per-ally cap).
- **Sinbound Shackles:** `Debuff (Single Target)`; immobilizes the enemy with highest cumulative damage and reduces Haste plus Phys/Magic DEF for 5 s; each awakened circle extends duration.
- **Merciful Harvest:** global passive; if Velara starts inside a circle, it awakens immediately, otherwise the farthest circle awakens. Circles gain Energy based on stat-reduction debuffs applied by allies in their radius.
- **Hero Focus:** Haste, with extra Haste when all circles are awakened.
- **Exclusive Equipment — Graceful Edict:** when a circle awakens, targets the weakest unit nearby: shields an ally or damages an enemy. Higher levels add periodic bolts.
- **Enhance Force:** once all circles are awakened, Ultimate expands them globally for the rest of battle; later casts make allies unaffected and increase their damage briefly.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s. Higher ranks add Healing after a cumulative-healing threshold.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

### Temesia — tracker ID: `temesia`

Source: https://afkstargazer.com/en/skill/temesia

**Page tags:** `Airborne`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`.

- **Ultimate — Knight's Heart:** `Airborne`. Temesia does not perform normal attacks; instead charges toward the farthest enemy, damaging enemies along her path and restoring Energy on arrival. Active cast summons mount Dawn to leap forward, damaging adjacent enemies and knocking them down.
- **Iron Heel:** `Debuff (Single Target)`; Dawn kicks an enemy as Temesia changes charge direction, interrupts and reduces the target's damage dealt for 5 s.
- **Courage Sword:** strikes adjacent enemies while charging; damage is based on target ATK and capped by Temesia's ATK.
- **Hero Focus:** ATK, with an extra increase after first Knight's Heart.
- **Exclusive Equipment — Invincible Fury:** after two Knight's Heart casts, Temesia permanently becomes unaffected and charge damage becomes true damage; higher levels add HP recovery.
- **Enhance Force:** `Debuff (AOE)`; Knight's Heart reduces enemy Phys DEF, stacking up to six times. LV 2 reduces damage taken while charging and upgrades Iron Heel with max-HP-based extra damage plus a shield.
- **Season Charm:** own-skill displacement grants ATK; higher ranks also grant a shield.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.

### Evie — tracker ID: `evie` — PARTIAL

Source: https://afkstargazer.com/en/skill/evie

**Per-skill tags visible:** `DoT`, `Special Target`, `Ult Denial` on Ultimate; `Debuff (Single Target, Global)` on Pointed Proof; `Special Target`, `Temp Buff (Opening, Single Target)` on Foretold Favor.

- **Ultimate — Intel Chase:** opening concealment and invulnerability while gathering intel on non-summoned enemies. Each completed investigation restores Energy. Active: interrogates the enemy with highest cumulative damage for 6 s, dealing damage and immobilizing; if intel was gathered on that target, also silences it.
- **Pointed Proof:** `Debuff (Single Target, Global)`; completing intel on an enemy permanently reduces its Magic DEF; completing intel on all surviving enemies adds a further teamwide Magic DEF reduction. Active: dashes to nearest enemy and strikes twice.
- **Foretold Favor:** `Special Target`, `Temp Buff (Opening, Single Target)`; a quill follows an ally (initially rearmost, then highest cumulative damage), healing and increasing their ATK. Damage milestones also heal two other weak allies.
- **Hero Focus:** Healing.
- **Exclusive Equipment — Tactical Briefing:** `Debuff (Global)`; the returned excerpt begins its effect but cuts off before the full text.
- **Recapture remaining equipment levels, Enhance Force, Season Charm and Rivalry Mode.**

### Lamentis — tracker ID: `lamentis` — PARTIAL

Source: https://afkstargazer.com/en/skill/lamentis

- The returned excerpt starts at **Exclusive Equipment — Omnisight**; page-level tags and base abilities are not visible.
- **Exclusive Equipment — Omnisight:** `Summon`. Each apostle gains Growth stacks from normal attacks; stacks increase basic stats and transfer to Lamentis when the apostle merges back. At max stacks, LV 4 unlocks continuous free apostle creation, extra true damage from Starcrusher, no apostle expiration, and healing/Energy recovery based on apostle damage.
- **Enhance Force:** while an apostle has a stat buff from an ally other than Lamentis, Lamentis also gains 10% of that buff.
- **Season Charm:** increases ATK and Phys/Magic DEF for caster and created units; higher ranks add Haste after 5 s on the battlefield.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.
- **Recapture the beginning of the page for base abilities, page tags and other sections.**

### Valka — tracker ID: `valka`

Source: https://afkstargazer.com/en/skill/valka

**Page tags:** `Debuff (Single Target)`.

- **Ultimate — Blooming Terror:** `Debuff (Single Target)`. Normal attacks stack Panic on an enemy; after four stacks the target panics for 10 s and loses Haste. Valka can use the active execution only on adjacent panicked enemies: consumes 100 Energy, removes Panic, stuns and performs three max-HP-based true-damage slashes, with healing and knockdown. Same enemy can be targeted only once every 6 s.
- **Spectral Bulwark:** at battle start grants Valka a shield based on the number of allies within 1 tile; those allies gain 50 ATK SPD for the battle.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Soulshock Riposte:** blocks Ultimate damage from an enemy in range and immediately casts Blooming Terror on the attacker without Energy cost or removing Panic; restores Energy.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.
- **Capture excerpt did not include Enhance Force or Season Charm; verify whether absent or beyond the indexed excerpt.**

### Aster — tracker ID: `aster` — PARTIAL

Source: https://afkstargazer.com/en/skill/aster

**Page tags:** `Debuff (AOE)`, `DoT`.

- **Ultimate — Stellar Flare:** consumes 600 Energy to summon a Star at a target tile, damaging nearby enemies. Supercharges all Stars, causing AOE damage and stun; supercharged Stars burn for 6 s. Maximum three Stars; new Stars replace an existing one under specified placement conditions.
- **Capture excerpt ends during Ultimate level scaling.** Remaining base skills, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.

### Indris — tracker ID: `indris`

Source: https://afkstargazer.com/en/skill/indris

**Page tags:** `Debuff (Single Target)`.

- **Ultimate — Spellbane Shot:** `Debuff (Single Target)`; silencing arrow deals damage, disables target stat buffs for 8 s and permanently reduces Phys/Magic DEF by 20% (unstackable; buff disable does not work on bosses). Higher level can deal max-HP-based true damage to a target with exposed weakness.
- **True Sight:** passive: when an enemy receives stat-reduction debuffs from more than three different allies, exposes its weakness. Indris' normal attacks gain extra true damage against exposed targets and fire three arrows with target-priority rules.
- **Arcane Binding:** knocks back enemies within 2 tiles, then binds the nearest enemy, dealing damage and immobilizing for 5 s.
- **Enhance Force:** after Arcane Binding hits, normal attacks can trigger exposed-weakness bonus damage without cooldown for 5 s. LV 2 adds max-HP-based physical damage to arrows after Indris breaks a weakness.
- **Season Charm:** stationary-tile condition; after 3 s, increases damage and Haste. Higher ranks add shield and steadfast.
- **Capture did not expose Hero Focus, Exclusive Equipment or Rivalry Mode; verify in full page.**

### Soren — tracker ID: `soren` — PARTIAL

Source: https://afkstargazer.com/en/skill/soren

**Page tags:** `Debuff (AOE)`.

- **Ultimate — Whirlwind Swing:** rushes to a selected tile and hits adjacent enemies, knocking them back. Collision with units, terrain or boundaries causes extra damage and stun.
- **Repel Sweep:** melee strike that knocks back; collision causes extra damage and stun. Can trigger repeatedly, subject to a cooldown.
- **Enhance Force:** after Deflecting Swing, next Repel Sweep knocks enemies back farther and adds damage based on damage blocked. LV 2: collisions caused by Whirlwind Swing/Repel Sweep restore Energy, grant a battle-long shield and refresh Deflecting Swing.
- **Season Charm:** `Debuff (AOE)`; damage taken is reduced per adjacent enemy. Higher ranks periodically damage nearby enemies and reduce their ATK.
- **Returned excerpt contains fragments of Hero Focus and Rivalry Mode but not complete skill order; recapture remaining base and equipment sections.**

### Florabelle — tracker ID: `florabelle` — PARTIAL

Source: https://afkstargazer.com/en/skill/florabelle

**Page tags:** `Airborne`, `Summon`.

- **Ultimate — Pounding Blow:** `Airborne`, `Summon`. Florabelle summons Spiny at battle start. Active: summons Smashy to damage adjacent enemies and knock them airborne. Spiny and Smashy inherit portions of Florabelle's max HP and have separate normal-attack damage. Smashy can be cleansed/healed by recasting; LV 3 coordinates all three Bulbsprites for a larger AOE airborne attack.
- **Capture excerpt ends during Ultimate level scaling.** Remaining skills, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.

## Source and quality notes

- Stargazer is a community-maintained source, not an official game API.
- Search-indexed excerpts may begin mid-page or stop mid-section. Partial records must not be treated as complete.
- Preserve original labels; do not infer a tag when it is not displayed.
- No Supabase schema or data was changed by this extraction.
