# Hero Knowledge Extraction — Batch 10

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial records require recapture.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| rowan | Rowan | Energy Battery; Energy Denial; Temp Buff (Single Target) | Core page captured |
| lyca | Lyca | Per-skill Energy Battery; Temp Buff (Opening, Global); Debuff (Global); Debuff (AOE); Haste; Temp Buff | Core page captured |
| mikola | Mikola | Per-skill Haste (AOE); Temp Buff (AOE); Temp Buff (Global); Temp Buff (Single Target) | Core page captured |
| rhys | Rhys | Not visible in returned excerpt | Partial |
| korin | Korin | Not visible in returned excerpt | Core page captured |
| hepler | Hepler | Cheat Death (Ally); Debuff; Debuff (Single Target); Debuff (AOE); Special Target | Core page captured (Polish page) |
| pandora | Pandora | Per-skill Debuff (Global); DoT; Energy Battery; Invincibility; Special Target; Temp Buff (Single Target) | Partial |
| odie | Odie | Per-skill DoT; Execute | Core page captured |
| karma | Karma | Debuff (AOE) | Partial |
| aliceth | Aliceth | Cheat Death (Self, Ally); DoT; Execute; Special Target | Core page captured |

## Hero records

### Rowan — tracker ID: `rowan`

Source: https://afkstargazer.com/en/skill/rowan

**Page tags:** `Energy Battery`, `Energy Denial`, `Temp Buff (Single Target)`.

- **Ultimate — Fatal Greed:** `Energy Battery`; moves up to one tile and throws coins, restoring Energy to allies within 2 tiles.
- **Smart Stall:** `Energy Battery`; opening trolley has two health potions used automatically by nearby low-HP allies. LV 3 adds an Energy potion for nearby ally above 600 Energy, restoring 400 Energy.
- **Quack Waltz:** `Energy Denial`; Bradduck attacks an enemy and absorbs Energy. If health potions are depleted, later levels allow trolley replenishment.
- **Hero Focus:** Haste; extra Haste before first Quack Waltz trolley replenishment.
- **Exclusive Equipment — Great Bargain:** after selling three health potions, creates a super potion that heals an ally and permanently increases Phys/Magic DEF.
- **Enhance Force:** `Temp Buff (Single Target)`; adds one opening health potion. LV 2 upgrades Energy potion: restored Energy also grants ATK for 6 s; if Peggy is present, prepares an extra super health potion for her.
- **Season Charm:** opening melee-damage buff and ranged damage reduction for ally one tile in front; higher ranks add Energy on Hit.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

### Lyca — tracker ID: `lyca`

Source: https://afkstargazer.com/en/skill/lyca

**Per-skill tags visible:** `Energy Battery`, `Temp Buff (Opening, Global)` on Empyrean Blessing; `Debuff (Global)` on Nova Fall; `Debuff (AOE)` on Enhance Force; `Haste`, `Temp Buff` on Season Charm.

- **Ultimate — Comet Archery:** fires a directional comet arrow and leaves Nebula Reflection for 7 s. Allies under the reflection summon meteors to add damage when using normal attacks.
- **Empyrean Blessing:** `Energy Battery`, `Temp Buff (Opening, Global)`; opening global ATK SPD buff for all allies and grants 120 Energy.
- **Nova Fall:** `Debuff (Global)`; meteors hit all enemies and reduce Phys DEF for 5 s.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Meteor Catastrophe:** opening meteors follow Lyca's normal attacks; LV 3 adds a projectile against shielded enemies, with stun if shield breaks.
- **Enhance Force:** `Debuff (AOE)`; Comet Archery reduces target Phys DEF. LV 2 grants 300 Initial Energy, extends Nebula Reflection and increases allied meteor damage.
- **Season Charm:** `Haste`, `Temp Buff`; when Lyca applies a temporary stat buff to an ally, also grants Haste for the same duration; higher ranks add damage reduction.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Mikola — tracker ID: `mikola`

Source: https://afkstargazer.com/en/skill/mikola

**Per-skill tags visible:** `Haste (AOE)`, `Temp Buff (AOE)` on Ultimate; `Temp Buff (Global)` on Heroic Duel; `Temp Buff (Single Target)` on Vigorous Call; `Temp Buff (AOE)` on Exclusive Equipment.

- **Ultimate — Dauntless Hymn:** `Haste (AOE)`, `Temp Buff (AOE)`; creates a 2-tile Courage Sphere that grants Haste and Ranged DEF to allies in range. After Mikola deals sufficient damage while sphere is active, a healing wave restores nearby allies.
- **Heroic Duel:** `Temp Buff (Global)`; creates battlefield-wide Honor Arena. Side controlling more units for 3 s gains HP recovery and ATK increase for all allies.
- **Vigorous Call:** `Temp Buff (Single Target)`; heals Mikola and two weakest allies and increases Phys/Magic DEF for 5 s.
- **Hero Focus:** ATK, with extra ATK while her side controls Honor Arena.
- **Exclusive Equipment — Passionate Opening:** `Temp Buff (AOE)`; after Courage Sphere has been active for 6 s, grants Combat Fury to allied heroes in range and damages adjacent enemies.
- **Enhance Force:** Courage Sphere duration does not expire while Mikola's side controls Honor Arena.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK for 8 s; higher ranks add Healing after cumulative-healing threshold.
- **Rivalry Mode:** separate first-low-HP ally heal/shield and refine stats.

### Rhys — tracker ID: `rhys` — PARTIAL

Source: https://afkstargazer.com/en/skill/rhys

- The returned excerpt begins at **Exclusive Equipment — Fury Rush**; page-level tags and base abilities are not visible.
- **Exclusive Equipment — Fury Rush:** gains movement speed while moving; reaches max speed after 5 s and loads Blast Ammo. Higher ranks improve Blast Ammo damage and splash.
- **Enhance Force:** reduces Defensive Stance cooldown. LV 2: Ultimate stops time until all bullets are fired; if Blast Ammo is loaded, grants Crit DMG Boost and movement speed until controlled.
- **Season Charm:** critical-hit splash damage; higher ranks convert part of critical damage into a permanent shield.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.
- **Recapture page from the beginning for base abilities, tags, Hero Focus and missing equipment sections.**

### Korin — tracker ID: `korin`

Source: https://afkstargazer.com/en/skill/korin

**Page tags:** no page-level buttons visible in captured result.

- **Ultimate — Demonseal Spear:** sweeps spear at enemies within 2 tiles, dealing four hits and immobilizing them; adjacent enemies are knocked back.
- **Defiance Charge:** jumps next to weakest ally and shields both, then dashes to closest enemy and deals true damage.
- **Air Strike:** guaranteed critical strike against enemies one tile beyond; critical damage scales with Crit Rate.
- **Hero Focus:** Haste.
- **Exclusive Equipment — Vine Arms:** after Korin and allies within 2 tiles cast three Ultimates in total, empowers spear with Wilder magic, adding max-HP-based true damage for 8 s.
- **Enhance Force:** reduces damage taken from enemies beyond 1 tile by 25%.
- **Season Charm:** critical-hit splash damage; higher ranks convert part of critical damage into a permanent shield.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.

### Hepler — tracker ID: `hepler`

Source: https://afkstargazer.com/pl/skill/hepler

**Page tags:** `Cheat Death (Ally)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Special Target`.

- **Ultimate — Shapeshift:** enters Altered Form, damages and taunts enemies within 2 tiles, gains four Spark charges. In Altered Form, two skills are enhanced and consume one Spark per use; when charges run out, returns to True Form, damaging and blinding enemies.
- **Remedial Lessons:** `Debuff (Single Target)`; in True Form, damages enemy and reduces Haste; in Altered Form, deals AOE damage and stuns.
- **Extra Credit:** in True Form, heals weakest ally over time; in Altered Form, heals three weakest allies and grants hardened skin/shields.
- **Hero Focus:** damage reduction; extra damage reduction in Altered Form.
- **Exclusive Equipment — Furry Rescue:** `Cheat Death (Ally)`, `Special Target`; at battle start protects frontmost adjacent ally from first fatal blow, heals and shields them, then transforms them into a small animal and moves them to backline with temporary invulnerability.
- **Enhance Force:** every Spark charge spent permanently increases Hepler and protected ally Phys/Magic DEF and reduces damage taken, stacking up to ten times.
- **Season Charm:** `Debuff (AOE)`; damage taken reduced per adjacent enemy. Higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.
- **Source language:** Polish. Preserve the raw Polish source description and store any English translation separately if needed.

### Pandora — tracker ID: `pandora` — PARTIAL

Source: https://afkstargazer.com/en/skill/pandora

- **Ultimate — Panic Projection:** `Debuff (Global)`, `DoT`; opens box to make all units flee toward their own side for 5 s while losing HP over time; afterward reduces ATK for 8 s, stacking up to three times. Pandora herself is protected from this effect.
- **Boxed Blessing:** `Energy Battery`, `Invincibility`, `Special Target`, `Temp Buff (Single Target)`; opening effect pulls rearmost ally into the box, making them invincible but unable to cast skills for 4 s.
- **Capture excerpt ends during Boxed Blessing; remaining abilities, Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Odie — tracker ID: `odie`

Source: https://afkstargazer.com/en/skill/odie

**Per-skill tags visible:** `DoT` on Ultimate; `Execute` on Exclusive Equipment.

- **Ultimate — Corrosive Dart:** `DoT`; deals damage and applies non-dispellable Dart Poison, dealing damage every second until target is defeated. Defeating poisoned enemy restores Energy.
- **Triple Tap:** three attacks considered normal attacks.
- **Venom Surge:** prioritizes poisoned enemies; normal attacks permanently increase Dart Poison base damage on poisoned target, stacking up to 20.
- **Hero Focus:** ATK SPD.
- **Exclusive Equipment — Heart Crusher:** `Execute`; instantly defeats poisoned enemies below a threshold based on Dart Poison damage per second; each defeat increases the threshold.
- **Enhance Force:** Triple Tap deals extra damage against poisoned targets based on Dart Poison damage per second.
- **Season Charm:** ATK SPD and normal-attack lifesteal; higher ranks add Penetration above 50% HP.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Karma — tracker ID: `karma` — PARTIAL

Source: https://afkstargazer.com/en/skill/karma

**Page tags:** `Debuff (AOE)`.

- **Ultimate — Unfettered Carnage:** axe strike stuns target; after 1 s, explosion deals damage plus bonus based on total healing Karma received since last cast. Heals Karma per non-summoned enemy hit.
- **Toxic Mosh Pit:** Kar drenches himself in potions, leaving a pool that damages enemies and heals Karma; Mar swings axe to damage nearby enemies.
- **Bottled Bloodlust:** Kar drinks potion to restore HP over time; Mar performs a rapid three-hit axe attack, with final knockdown.
- **Hero Focus:** Vitality.
- **Exclusive Equipment — Sanguine Growth:** max HP increases based on healing received, with a cap. At max stacks, gains Phys/Magic DEF, Resilience and larger skill ranges.
- **Enhance Force:** while affected by own potions, Karma takes 50% less damage; unstackable.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.
- **Capture excerpt ends before Season Charm; verify remaining progression sections.**

### Aliceth — tracker ID: `aliceth`

Source: https://afkstargazer.com/en/skill/aliceth

**Page tags:** `Cheat Death (Self, Ally)`, `DoT`, `Execute`, `Special Target`.

- **Ultimate — Radiant Rain:** flies and fires six volleys of three arrows at an enemy; each arrow deals ATK damage plus extra based on target lost HP. Invincible while airborne.
- **Guiding Light:** `Special Target`; grants Brightfeather to an ally, prioritizing nearest ally in her row. After three ranged hits, ally unleashes an extra feather strike; ranged ally also gains attack range. Active: charged arrow damages, knocks back and stuns enemy.
- **Sealed Fate:** `Execute`; opening Mark of Judgment on farthest enemy. Aliceth and Brightfeather allies prioritize that target and gain Penetration; after condition, mark can instantly defeat target below ATK-based HP threshold.
- **Hero Focus:** ATK; extra ATK for Aliceth and Brightfeather allies after first marked enemy is defeated or untargetable.
- **Exclusive Equipment — Aegis Wings:** `Cheat Death (Self, Ally)`, `DoT`; first fatal blow to Aliceth or Brightfeather ally is prevented, grants invulnerability/heal and moves affected hero to safe spot. LV 4 feathers cause adjacent damage over time and blind.
- **Enhance Force:** every four Brightfeather feather strikes adds one extra Radiant Rain volley for rest of battle, up to six.
- **Season Charm:** stationary-tile condition; after 3 s increases damage and Haste; higher ranks add shield/steadfast.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Partial entries require recapture before verification.
- Preserve exact source tags and keep per-skill tags separate from page-level tags.
- No Supabase schema or data was changed by this extraction.
