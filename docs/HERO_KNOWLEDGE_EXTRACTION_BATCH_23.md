# Hero Knowledge Extraction — Batch 23 (recapture pass 10)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** close four remaining profiles and record the latest available fragments for three profiles still incomplete.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Valen — tracker ID: `valen`

Source: https://afkstargazer.com/en/skill/valen

**Page tag:** `Debuff (Single Target)`.
**Per-skill tag:** Enhance Force `Debuff (Single Target)`.

**Captured kit:**
- **Ultimate — Thunder Swordwork:** selects a tile and launches seven Swift Strikes at it and adjacent tiles, then gains Invigoration for 12 s and increases ATK.
- **Unseen Blade:** strikes a target three times; during Invigoration, each strike also creates forked lightning that damages the target and up to two nearby enemies.
- **Fury Thunder Strike:** only casts when Valen gains Invigoration, damaging all enemies within 2 tiles.
- **Hero Focus:** increases ATK.
- **Exclusive Equipment — Eternal Thunder:** permanent Invigoration; casting Thunder Swordwork while invigorated permanently stacks ATK, up to 10 stacks. Higher level adds lightning to normal attacks.
- **Enhance Force:** `Debuff (Single Target)`; Fury Thunder Strike stuns for 3 s. LV 2 grants 500 initial Energy; lightning hits restore Energy and reduce target Haste and movement speed.
- **Season Charm:** increases Crit; critical hits cause splash damage to nearby enemies. Higher ranks convert some critical damage into a permanent shield.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Haste and DEF Penetration.

### Sylphira — tracker ID: `sylphira`

Source: https://afkstargazer.com/en/skill/sylphira

**Page tags:** `Debuff (AOE)`, `Energy Denial`, `Ult Denial`.
**Per-skill tags:** Ultimate — Grand Finale `Debuff (AOE)`, `Ult Denial`; Punishing Rhythm `Energy Denial`.

**Captured kit:**
- **Ultimate — Grand Finale:** builds beats over time and gains ATK/Haste when the score is complete. Active cast glides to the area with the most enemies, damages them, creates a Harmonic Domain, silences enemies inside and makes Sylphira unaffected while inside. Also reduces target max HP with musical phrases.
- **Punishing Rhythm:** `Energy Denial`; three rhythmic hits deal damage and reduce the target's Energy.
- **Piercing Silence:** controls an enemy, then deals area damage and knocks down nearby enemies; Sylphira is immune to control while casting.
- **Hero Focus:** increases Haste; each beat lit adds Haste and score activation grants another Haste bonus.
- **Exclusive Equipment — Harmonic Refrain:** once the score is activated, automatically plays every 8 s, removes dispellable debuffs, restores HP and Energy, and speeds up the score/increases Haste as more beats are collected. Higher level damages nearby enemies based on max HP.
- **Enhance Force:** after the score activates, Tremolo enhances normal attacks with Life Drain and target-max-HP-based true damage.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Crit and Ranged DEF.

### Berial — tracker ID: `berial`

Source: https://afkstargazer.com/en/skill/berial

**Page tags:** `Cheat Death (Self)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`, `Summon`.
**Per-skill tags:** Ultimate — Scared Swamp `Debuff (AOE)`, `Energy Denial`; Devil's Contract `Cheat Death (Self)`; Hero Focus `Debuff (Single Target)`; Exclusive Equipment — Shadow Reflection `Energy Denial`, `Summon`.

**Captured kit:**
- **Ultimate — Scared Swamp:** hides beneath an enemy's shadow, dealing repeated damage and absorbing Energy; then jumps out to damage and frighten adjacent enemies. Berial is invincible while hidden.
- **Shadow Trick:** hides and becomes invincible; if isolated enemies exist, moves to each and damages them. Otherwise stays hidden and recovers HP before returning to his original tile.
- **Devil's Contract:** `Cheat Death (Self)`; after defeat, hides in shadow for 10 s. If a non-summoned enemy is defeated during that time, Berial revives with a percentage of HP; once per battle.
- **Hero Focus:** `Debuff (Single Target)`; reduces damage dealt by an isolated enemy and increases damage they take.
- **Exclusive Equipment — Shadow Reflection:** `Energy Denial`, `Summon`; isolated non-summoned enemies lose Energy and generate a Silhouette with inherited stats. Silhouettes lose HP over time and attack only with normal attacks.
- **Enhance Force:** extends hiding after defeat; LV 2 reduces the per-enemy summon cooldown, increases Energy loss and eventually removes Silhouette HP decay.
- **Season Charm:** increases ATK when displaced by own skills; higher ranks add a shield.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds DEF Penetration and Execution.

### Laios — tracker ID: `laios`

Source: https://afkstargazer.com/en/skill/laios

**Page tags:** `Debuff (AOE)`, `Energy Battery`, `Haste (AOE)`, `Summon`, `Temp Buff (AOE)`.
**Per-skill tags:** Ultimate — Living Armor - Kensuke `Summon`; Intimidate `Debuff (AOE)`; Dungeon Gourmet `Energy Battery`, `Haste (AOE)`, `Temp Buff (AOE)`.

**Captured kit:**
- **Ultimate — Living Armor - Kensuke:** `Summon`; summons slow-moving Living Armor with infinite HP and its own Energy pool. It loses Energy over time and from damage, then recharges and returns to combat. Recasting restores its Energy, grants control immunity and increases its ATK SPD.
- **Intimidate:** `Debuff (AOE)`; confuses enemies in three adjacent tiles in front, preventing movement/actions and reducing Phys & Magic DEF. Confusion lasts longer against monsters.
- **Dungeon Gourmet:** `Energy Battery`, `Haste (AOE)`, `Temp Buff (AOE)`; when an enemy monster is defeated, Laios collects an ingredient and restores Energy/HP. He cooks for nearby allies, healing and increasing ATK; each ingredient can add random extra buffs to nearby allies.
- **Hero Focus:** increases Laios's ATK.
- **Exclusive Equipment — Ingredient Analysis:** at battle start, if monsters are present, analyzes them to cause extra ingredient drops at HP-loss thresholds. Higher levels increase damage to monsters and grant DEF per ingredient collected.
- **Enhance Force:** each different ingredient collected using Dungeon Gourmet permanently increases Laios's max HP, up to three times.
- **Season Charm:** increases ATK and Phys & Magic DEF for Laios and units he creates; higher ranks add Haste after 5 s.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Healing and Crit Resist.

## Additional recaptured sections — profiles remain partial

### Baden — tracker ID: `baden`

Source: https://afkstargazer.com/en/skill/baden

- **Hero Focus:** increases Penetration; adds more while any phantom Baden created remains on the battlefield.
- **Exclusive Equipment — Revenant's Due:** `Debuff (Single Target, AOE)`, `Summon`; opening Wraithbrand curse deals increased damage with guaranteed critical and max-HP reduction; each phantom summoned by the curse steals target ATK for Baden and itself.
- **Enhance Force:** `Cheat Death (Self)`; if Baden is defeated while any phantom remains, possesses one, is deprioritized by enemies and takes reduced damage for 8 s; up to three triggers per battle.
- **Season Charm:** increases damage dealt and reduces damage taken, amplified on enemy side; higher ranks grant a permanent shield on first entry to enemy territory.
- **Status remains partial:** the full base-skill sequence is still not visible in the captured excerpts.

### Saida — tracker ID: `saida`

Source: https://afkstargazer.com/en/skill/saida

- **Hero Focus:** reduces damage taken; additional reduction scales with the number of existing Drain Seeds, up to a cap.
- **Exclusive Equipment — Deepening Roots:** `Debuff (Single Target)`, `DoT`; reduces damage dealt by enemies afflicted with Drain Seed and shortens the interval between seed attacks each time Saida casts her Ultimate. Higher levels increase seed damage and eventually trap all enemies, preventing movement/actions and causing periodic HP loss.
- **Enhance Force:** plants Drain Seeds on two nearby allies at battle start; allied seeds do not harm them and instead grant shields.
- **Season Charm:** Energy recovery per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Status remains partial:** full base ability set is still not captured in the available excerpt.

### Perseus — tracker ID: `perseus`

Source: https://afkstargazer.com/en/skill/perseus

Additional captured detail:
- **Divine Grace:** temporary stat buffs received by Perseus have their effects increased by 30%; at LV 3, if he has two temporary stat buffs from different allies, his damage becomes true damage and he becomes unaffected for at least 6 s.
- **Enhance Force:** expands the range of fertile ground by 1 tile.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Crit Resist and Crit DMG DEF.
- **Status remains partial:** the excerpt begins mid-page and does not contain the complete base kit, Hero Focus or full Exclusive Equipment description.

## Coverage update

- Four profiles upgraded from partial to complete first-pass captures: Valen, Sylphira, Berial and Laios.
- Baden, Saida and Perseus gained additional detail but remain partial.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
