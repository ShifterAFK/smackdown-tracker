# Hero Knowledge Extraction — Batch 24 (final roster recapture)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** close the last three partial tracker profiles and finish first-pass source capture for the 131-row roster.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Baden — tracker ID: `baden`

Source: https://afkstargazer.com/en/skill/baden

**Page tags:** `Airborne`, `Cheat Death (Self)`, `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`, `Summon`.
**Per-skill tags:**
- Ultimate — Omen's Grasp: `Airborne`, `Debuff (AOE)`, `Energy Denial`, `Heal Denial`
- Wraithbrand: `Energy Denial`, `Summon`
- Soul Sunder: `Debuff (AOE)`
- Exclusive Equipment — Revenant's Due: `Debuff (Single Target, AOE)`, `Summon`
- Enhance Force: `Cheat Death (Self)`

**Captured kit:**
- **Ultimate — Omen's Grasp:** Baden and all phantoms attack a designated enemy in four successive strikes, keeping it stunned. Final strike deals true damage to the target and enemies within 1 tile, drains HP, reduces max HP and prevents HP/Energy recovery for 8 s. Baden is invincible while casting.
- **Wraithbrand:** `Energy Denial`, `Summon`; opening curse damages enemies in a straight line. When a cursed non-Boss enemy first falls below 50% HP, a phantom appears nearby; Boss enemies summon phantoms each time they lose HP equal to a threshold based on Baden's initial ATK. Phantoms inherit stats, remain invincible and attack their summoning target. Active cast stuns the current target, steals max HP and Energy, then damages them.
- **Soul Sunder:** `Debuff (AOE)`; Baden and phantoms unleash five slashes. Final shockwave damages enemies within 2 tiles and reduces their Vitality, stacking up to three times.
- **Hero Focus:** increases Penetration, with extra Penetration while any phantom Baden created is on the battlefield.
- **Exclusive Equipment — Revenant's Due:** `Debuff (Single Target, AOE)`, `Summon`; opening Wraithbrand curse deals increased damage with guaranteed critical and max-HP reduction; each phantom summoned by the curse steals target ATK for Baden and itself.
- **Enhance Force:** `Cheat Death (Self)`; if Baden is defeated while any phantom remains, possesses one, is deprioritized by enemies and takes reduced damage for 8 s; up to three triggers per battle.
- **Season Charm:** increases damage dealt and reduces damage taken, amplified on enemy side; higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Crit and Ranged DEF.

### Saida — tracker ID: `saida`

Source: https://afkstargazer.com/en/skill/saida

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `DoT`, `Energy Denial`.
**Per-skill tags:**
- Ultimate — Seed Siphon: `Energy Denial`
- Revenant Sprout: `Cheat Death (Self)`
- Exclusive Equipment — Deepening Roots: `Debuff (Single Target)`, `DoT`

**Captured kit:**
- **Ultimate — Seed Siphon:** teleports in front of an enemy, prevents movement/actions, deals damage and drains Energy, then plants a Drain Seed. Seeds periodically damage their host and reduce Energy. Up to eight seeds can exist at once.
- **Crimson Claim:** passive converts some damage from Saida's normal attacks and skills into healing, with excess healing becoming a shield. Active cast pierces an enemy, damages and interrupts them; nearby Drain Seeds also create blood spikes against the same target.
- **Revenant Sprout:** `Cheat Death (Self)`; when defeated, consumes a Drain Seed to revive at its location and restore HP. Prioritizes the oldest seed; restored HP scales with seed age, subject to caps.
- **Hero Focus:** reduces damage taken; additional reduction scales with the number of existing Drain Seeds, up to a cap.
- **Exclusive Equipment — Deepening Roots:** `Debuff (Single Target)`, `DoT`; reduces damage dealt by enemies afflicted with Drain Seed and shortens the interval between seed attacks each time Saida casts her Ultimate. At max interval reduction, deals large damage to all enemies and traps them, preventing movement/actions while causing periodic HP loss.
- **Enhance Force:** plants Drain Seeds on two nearby allies at battle start; allied seeds do not harm them and instead grant shields.
- **Season Charm:** Energy recovery per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Rivalry Mode:** opening/assist/defeat grants Penetration and Haste; refine adds Ranged DEF and DEF Penetration.

### Perseus — tracker ID: `perseus`

Source: https://afkstargazer.com/en/skill/perseus

**Page tag:** `Temp Buff (Opening, AOE)`.
**Per-skill tag:** Fertile Ground `Temp Buff (Opening, AOE)`.

**Captured kit:**
- **Ultimate — Divine Rend:** marches three tiles in a chosen direction, repeatedly damaging and knocking back adjacent enemies, then performs a shield bash that damages and stuns enemies within 1 tile. Perseus is unaffected while casting.
- **Spear-Shield Combo:** circular spear and shield strikes damage adjacent enemies; shield strike grants a shield based on ATK and damage dealt, and increases Perseus's ATK SPD while it lasts.
- **Fertile Ground:** `Temp Buff (Opening, AOE)`; before Perseus takes heavy damage, creates fertile ground within 1 tile. Allies standing on it gain ATK and Phys & Magic DEF. The first time Perseus falls below 40% of initial max HP, permanently increases his max HP and heals him; fertile ground then withers permanently.
- **Hero Focus:** increases ATK, with additional ATK while Perseus has temporary stat buffs from allies.
- **Exclusive Equipment — Divine Grace:** each temporary stat buff increases its effect and grants damage dealt/damage taken modifiers, stacking up to four times. With two temporary stat buffs from different allies, damage becomes true damage and Perseus becomes unaffected for at least 6 s.
- **Enhance Force:** expands Fertile Ground range by 1 tile.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Rivalry Mode:** reduces damage taken at battle start, then increases damage dealt after 20 s; refine adds Crit Resist and Crit DMG DEF.
- **Source rule note:** Stargazer explicitly defines a temporary stat buff as an in-battle stat increase that expires by timer or condition. Shields, control immunity and damage dealt/taken modifiers do not count toward Divine Grace's trigger.

## Coverage completion

- Baden, Saida and Perseus upgraded from partial to complete first-pass captures.
- **All 131/131 tracker hero IDs now have complete first-pass Stargazer source records across Batches 01–24.**
- Thane remains an additional source record outside the current tracker roster.
- This closes first-pass source capture only. It is not second-source validation, in-game patch verification, or a normalized database import.
- No Supabase schema/data changes were made.
