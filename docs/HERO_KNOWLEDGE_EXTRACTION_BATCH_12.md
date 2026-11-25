# Hero Knowledge Extraction — Batch 12

- **Branch:** `development`
- **Primary source:** AFK Stargazer individual hero skill pages
- **Captured:** 2026-11-25
- **Status:** mixed completeness; partial records require recapture.
- **Canonical IDs:** tracker hero IDs remain authoritative.

## Batch index

| Tracker ID | Stargazer hero | Page tags | Status |
|---|---|---|---|
| arden | Arden | Per-skill DoT | Core page captured |
| carolina | Carolina | Debuff (AOE) | Core page captured |
| dunlingr | Dunlingr | Per-skill Heal Denial; Ult Denial; Debuff (AOE); Haste (Opening, Single Target); Special Target; Debuff (Global); Energy Denial; Temp Buff (Global) | Core page captured |
| silvina | Silvina | Per-skill Debuff (Single Target) | Partial |
| cassadee | Cassadee | Airborne; Debuff (AOE); Special Target | Core page captured |
| kulu | Kulu | Airborne; Debuff; Debuff (AOE); Debuff (Global); Tile Effect | Core page captured |
| seth | Seth | Debuff; Debuff (Single Target); Debuff (AOE) | Partial |
| orion | Orion | Per-skill Debuff (Single Target); Ult Denial | Partial |
| natsu | Natsu | Per-skill Debuff (Single Target); DoT | Partial |
| thane | Thane | Debuff (AOE); Ult Denial | Partial |

## Hero records

### Arden — tracker ID: `arden`

Source: https://afkstargazer.com/en/skill/arden

- **Ultimate — Force of Nature:** selects a tile and calls lightning on enemies within 2 tiles, then leaves a dark cloud for 7 s. Cloud repeatedly strikes controlled enemies below, with a per-enemy interval.
- **Entangling Vines:** `DoT`; entangles two closest enemies for 2 s, preventing movement/actions and dealing damage over time; prioritizes enemies under dark cloud.
- **Nature's Resilience:** recovers Energy whenever a non-summoned enemy is controlled, with per-enemy cooldown.
- **Hero Focus:** ATK.
- **Exclusive Equipment — Spring Thunderstorm:** casts Entangling Vines on all enemies under dark cloud once after Force of Nature.
- **Enhance Force:** reduces lightning strike interval for the same enemy.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Carolina — tracker ID: `carolina`

Source: https://afkstargazer.com/en/skill/carolina

**Page tags:** `Debuff (AOE)`.

- **Ultimate — Frozen Grave:** `Debuff (AOE)`; freezes selected enemy for 6 s and creates arctic field applying Frostbite to target and enemies within 2 tiles. Each Frostbite stack reduces Haste for 6 s, up to three.
- **Freezing Nova:** `Debuff (AOE)`; damages target and adjacent enemies and applies Frostbite.
- **Snowball Witchery:** surrounds Carolina with four snowballs; automatically fires one every 3 s at enemies under control effects. Replenishes snowballs after use.
- **Hero Focus:** Crit; extra Crit after five Snowball Witchery casts.
- **Exclusive Equipment — Ice Vortex:** each Snowball Witchery cast permanently increases snowball damage up to seven stacks; from third cast, new snowballs deal AOE damage and reduce Magic DEF.
- **Enhance Force:** `Debuff (AOE)`; Snowball Witchery damage also applies Frostbite.
- **Season Charm:** stationary-tile condition; after 3 s increases damage and Haste; higher ranks add shield/steadfast.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.

### Dunlingr — tracker ID: `dunlingr`

Source: https://afkstargazer.com/en/skill/dunlingr

**Per-skill tags visible:** `Heal Denial`, `Ult Denial` on Ultimate; `Debuff (AOE)` on Grand Resonance; `Haste (Opening, Single Target)`, `Special Target` on Exclusive Equipment; `Debuff (Global)`, `Energy Denial`, `Temp Buff (Global)` on Enhance Force.

- **Ultimate — Echo of Silence:** `Heal Denial`, `Ult Denial`; before battle chooses Spellbind (prevents Ultimate casts) or Curelock (prevents healing others). Summons Bell of Order; active order binds all non-boss units on both sides for 6 s. Bell is also summoned at battle start and persists 12 s.
- **Grand Resonance:** `Debuff (AOE)`; frontal shockwave hits enemies four times; while order active, Dunlingr takes less damage.
- **Exclusive Equipment — Clemency Chime:** `Haste (Opening, Single Target)`, `Special Target`; protects farthest non-summoned ally from Dunlingr's own order until they are defeated.
- **Enhance Force:** `Debuff (Global)`, `Energy Denial`, `Temp Buff (Global)`; on Ultimate, grants all allies ATK SPD if Spellbind or Life Drain if Curelock. LV 2 adds order-specific enemy Energy/Haste reduction or HP/Vitality reduction when Bell order ends or refreshes.
- **Season Charm:** opening and periodic shields for allies within 2 tiles; higher ranks add damage reduction.
- **Rivalry Mode:** separate low-HP mitigation/healing and refine stats.
- **Targeting:** page specifies farthest teammate selection with hex-ID tie-break; store separately.

### Silvina — tracker ID: `silvina` — PARTIAL

Source: https://afkstargazer.com/en/skill/silvina

- The returned excerpt begins during a shield level and does not expose page-level tags or the full base kit.
- **Enhance Force:** `Debuff (Single Target)`; each Whirl Assault also reduces target Vitality for 3 s. LV 2 improves First Strike damage, grants ATK SPD while Blade Vortex is active, and adds lost-HP-based damage to normal attacks against First Strike target. If allied Isabella is deployed, Shield of Light also grants Isabella an equal shield.
- **Season Charm:** damage dealt and damage reduction increase, stronger while on enemy side. Higher ranks add permanent shield on first entry to enemy side.
- **Rivalry Mode:** separate opening/assist/defeat stats and refine effects.
- **Recapture beginning of page for abilities, page tags, Hero Focus and Exclusive Equipment.**

### Cassadee — tracker ID: `cassadee`

Source: https://afkstargazer.com/en/skill/cassadee

**Page tags:** `Airborne`, `Debuff (AOE)`, `Special Target`.

- **Ultimate — Running Tide:** `Airborne`; sends a 3-tile-wide wave in selected direction, damaging and knocking back enemies.
- **Undercurrent:** `Airborne`; creates water column beneath enemy, knocks them airborne, damages and stuns.
- **Tidal Strength:** `Special Target`; at battle start blesses nearest ally, prioritizing ally behind Cassadee. When blessed ally hits with normal attacks, Cassadee adds magic damage; blessing has a trigger count and cooldown before reapplication.
- **Hero Focus:** Haste; extra Haste while first blessed ally remains alive.
- **Exclusive Equipment — Tidal Blessing:** allies in path of Running Tide gain temporary blessings that empower next normal attacks with Tidal Strength. Later levels trigger Undercurrent after enough hits.
- **Enhance Force:** `Debuff (AOE)`; Running Tide reduces Magic DEF of enemies hit. LV 2 makes Tidal Strength permanent, grants Penetration and raises trigger rate.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate Ultimate-triggered damage/Energy and refine stats.
- **Targeting:** page specifies ally selection by hex distance and hex ID; store as targeting metadata.

### Kulu — tracker ID: `kulu`

Source: https://afkstargazer.com/en/skill/kulu

**Page tags:** `Airborne`, `Debuff`, `Debuff (AOE)`, `Debuff (Global)`, `Tile Effect`.

- **Ultimate — Blast Mayhem:** passive normal attacks explode on target and adjacent units; all Kulu skills damage both enemies and allies, but allies take reduced damage. Active bombardment hits random enemy-side tiles, then summons gigantified Boomboom to damage all units on enemy side. Kulu is unaffected/invincible while casting.
- **Boomboom Bash!:** `Debuff (AOE)`; Boomboom bounces between frontmost enemies, devours them, then releases them on rearmost enemy-side target; damage and movement-speed reduction. Devoured enemies cannot act/attack and only take Boomboom damage.
- **Hero Focus:** ATK increases from battle start and stacks when dealing damage.
- **Exclusive Equipment — Bombs Away!:** `Debuff (Global)`; applies explosive debuff to all enemies, increasing damage taken. Defeated enemies become doom bombs that explode after 2 s. Higher levels increase blast damage and expand explosion radius during Blast Mania.
- **Enhance Force:** grants ATK SPD and Ranged DEF based on number of enemies on Kulu's half; allies on her half receive part of these bonuses.
- **Season Charm:** critical-hit splash damage; higher ranks convert part of critical damage into a permanent shield.
- **Rivalry Mode:** separate normal-attack stacking and refine stats.

### Seth — tracker ID: `seth` — PARTIAL

Source: https://afkstargazer.com/en/skill/seth

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`.

- **Ultimate — Shadow Strike:** flashes to an enemy, hits repeatedly, freezes briefly, then jumps for extra damage. Becomes invincible and heals based on total damage dealt; prioritizes weakest enemy.
- **Predator's Lunge:** pounces on weakest enemy, dealing ATK damage plus lost-HP-based extra damage.
- **Hunter Instinct:** Bloodlust stacks when a non-summoned enemy first falls below an HP threshold; stacks permanently increase Haste and Life Drain. First Bloodlust also grants Phys/Magic DEF.
- **Capture excerpt ends during Hunter Instinct; remaining Hero Focus, Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture.**

### Orion — tracker ID: `orion` — PARTIAL

Source: https://afkstargazer.com/en/skill/orion

- The returned excerpt begins at **Exclusive Equipment — Royal Prerogative**; page-level tags and base abilities are not visible.
- **Exclusive Equipment — Royal Prerogative:** `Debuff (Single Target)`, `Ult Denial`; gaining Supporters grants Authority stacks, increasing damage dealt, reducing damage taken and extending Sear duration. At three stacks, Sear silences enemies after 3 s and reduces Vitality.
- **Enhance Force:** after three Authority stacks, Orion becomes unaffected for rest of battle and Sear deals extra true damage.
- **Season Charm:** damage dealt and damage reduction increase, stronger while on enemy side; higher ranks add permanent shield on first entry to enemy side.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.
- **Recapture page from beginning for Ultimate, base skills, Hero Focus and page tags.**

### Natsu — tracker ID: `natsu` — PARTIAL

Source: https://afkstargazer.com/en/skill/natsu

- The returned excerpt begins at **Exclusive Equipment — "Salamander" Natsu**; base abilities and page tags are not visible.
- **Exclusive Equipment — "Salamander" Natsu:** `Debuff (Single Target)`; when Natsu deals damage, reduces target max HP by 40% of actual damage dealt, with non-boss and per-target caps. Higher rank increases reduction.
- **Enhance Force:** `DoT`; whenever Natsu causes HP loss by means other than normal attacks, burns target for 5 s, dealing damage every 0.5 s.
- **Season Charm:** Energy recovery per second; after three Ultimates adds ATK, with higher ranks adding true damage to all enemies.
- **Rivalry Mode:** separate timed defensive/offensive effect and refine stats.
- **Recapture page from beginning for full kit, page tags and Hero Focus.**

### Thane — tracker ID: `thane` — PARTIAL

Source: https://afkstargazer.com/id/skill/thane

**Page tags:** `Debuff (AOE)`, `Ult Denial`. Source excerpt is in Indonesian.

- **Ultimate — Thousandfold Edge:** becomes invincible and performs eight strikes against random enemies, applying Sword Mark. Final hit detonates all marks for true damage to nearby enemies; repeated mark explosions on the same enemy deal reduced subsequent damage. Each successful Duel adds two strikes.
- **Duelist's Gambit:** `Ult Denial`; after battle begins, teleports to rearmost enemy in each column and challenges them to a 4 s Duel. During Duel, both heroes prioritize each other and can only use normal attacks. If Thane survives with at least 20% HP, Duel succeeds, restores HP and permanently increases basic stats.
- **Crosscut Flurry:** three slashes along a line through target; counts as normal attack. Cooldown resets when Thane starts a Duel.
- **Hero Focus:** ATK SPD, with extra ATK SPD after first successful Duel.
- **Capture excerpt ends during Hero Focus; Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode require recapture. Store raw Indonesian and translated text separately.**

## Source and quality notes

- Stargazer is community-maintained, not an official game API.
- Partial records require recapture before verification.
- Preserve exact source labels; translate only into a separate field and retain the original language.
- No Supabase schema or data was changed by this extraction.
