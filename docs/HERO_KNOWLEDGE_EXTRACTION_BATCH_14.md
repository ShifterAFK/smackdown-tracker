# Hero Knowledge Extraction — Batch 14 (recapture pass 1)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** replace truncated search-index excerpts with full-page captures where available; retain partial status when the returned source does not contain the entire kit.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Koko — tracker ID: `koko`

Source: https://afkstargazer.com/en/skill/koko

**Per-skill tags:**
- Ultimate — Full Energy: `Temp Buff (Global)`
- Fulfilling Feast: `Temp Buff (Single Target)`
- Patto, smash!: `Debuff (Single Target)`
- Enhance Force: `Temp Buff (Single Target)`

**Captured kit:**
- **Ultimate — Full Energy:** Koko and all allies gain 45% damage reduction for 12 s; reduced damage is recorded and dealt back as true damage to allies when the effect ends. Allies also gain 30 Life Drain and 10% ATK. The effect cannot be dispelled and prevents Koko from recasting while active. Damage reduction scales to 55% at LV 3; Life Drain scales to 40 at LV 5.
- **Fulfilling Feast:** heals the weakest ally for 230% ATK HP and grants 10% ATK for 5 s. Also feeds Patto, healing it for 350% ATK HP every 15 s and granting 20 Energy on Hit for 7 s. Healing scales up to 260% ATK.
- **Patto, smash!:** deals 210% ATK to target and increases damage they take by 10% for 5 s. If an enemy is adjacent, Patto smashes nearby enemies for 210% ATK and stuns them for 3 s; this secondary effect has an 8 s trigger limit. Damage scales to 240% ATK.
- **Hero Focus:** Haste +12/+16/+20.
- **Exclusive Equipment — Fluffy Shield:** after Full Energy's recorded damage is settled, all allies gain a 7 s shield that absorbs 15% of the total damage dealt by allies affected by Full Energy; scales to 20%. Higher levels remove allied control effects on Full Energy cast and grant Resilience.
- **Enhance Force:** `Temp Buff (Single Target)`; after Koko feeds an ally with Fulfilling Feast, that target gains 25 Vitality for 6 s.
- **Season Charm:** opening bonus to the ally one tile in front: increased melee damage and reduced ranged damage received; higher ranks add Energy on Hit.
- **Rivalry Mode:** first ally below 40% HP is healed for 160% ATK HP and receives a 160% ATK shield; refine grants Healing and Haste.

### Smokey & Meerky — tracker ID: `smokey-meerky`

Source: https://afkstargazer.com/en/skill/smokey-meerky

**Per-skill tags:**
- Ultimate — Special Aroma: `Haste (AOE)`, `Temp Buff (AOE)`
- Energizing Formula: `Temp Buff (Opening, AOE)`
- Season Charm: `Haste`, `Temp Buff`

**Captured kit:**
- **Ultimate — Special Aroma:** creates and channels an aroma within 2 tiles from battle start. While active, Smokey & Meerky recover 50 Energy/s and allies in the aroma recover 21% ATK HP/s. Active cast heals allies in the aroma for 170% ATK and permanently levels up aroma effects: first expands range by 1 tile, second grants 30 Haste. If interrupted, aroma ends and cannot be recreated for 4 s. Healing scales to 31% ATK HP/s.
- **Energizing Formula:** `Temp Buff (Opening, AOE)`; allies within aroma gain 16% ATK. Smokey & Meerky recover 5 additional Energy/s for each non-summoned ally affected. ATK scales to 20%; Energy bonus scales to 8.
- **Quick Recovery:** heals allies within aroma for 90% ATK HP; scales to 120%.
- **Hero Focus:** ATK +6%; additional +9% if at least three other non-summoned allies are in the aroma. Scales to +10% and +15%.
- **Exclusive Equipment — Withering Potion:** adds a third level-up effect to Special Aroma, expanding its range by another tile. For 10 s after the third upgrade first occurs, enemies in range lose 12% max HP/s, capped at 200% of Smokey & Meerky's ATK. Higher levels increase the percentage and add a brief stun.
- **Enhance Force:** increases healing from Special Aroma by 30% ATK.
- **Season Charm:** `Haste`, `Temp Buff`; when applying a temporary stat buff to an ally, also grants Haste for the buff duration. Higher ranks additionally reduce damage taken.
- **Rivalry Mode:** first ally below 40% HP is healed for 160% ATK HP and receives a 160% ATK shield; refine grants Healing and Haste.

## Recaptured sections — profile remains partial

These search results supplied additional source text, but not a complete page capture. Keep the profile status as `partial` until missing base abilities and progression sections are captured.

### Fay — tracker ID: `fay`

Source: https://afkstargazer.com/en/skill/fay

**Per-skill tags visible:** Ultimate `Temp Buff (AOE)`; Blinding Light `Debuff (AOE)`, `Temp Buff (Opening, AOE)`; Exclusive Equipment `Temp Buff (Opening, Single Target)`.

- **Ultimate — Colorful Dance:** heals allies in a forward 3-tile arc for 300% ATK HP and increases their ATK by 12% for 8 s; higher levels extend duration and raise ATK.
- **Healing Gems:** heals the weakest ally for 50% ATK HP per second over 4 s.
- **Blinding Light:** damages nearby enemies and heals allies in range; at LV 3 changes into a ruby or sapphire based on the target's damage type, reducing enemy Phys/Magic DEF and increasing allied corresponding DEF for 5 s.
- **Hero Focus:** increases HP.
- **Exclusive Equipment — Grand Entrance:** at battle start, grants the bonuses of Colorful Dance and Healing Gems to the ally one tile in front of Fay; higher levels add Vitality.
- **Enhance Force:** first time an ally under Healing Gems drops below 50% HP, Fay heals them for 200% ATK HP; once per skill cast.
- **Season Charm:** opening melee damage bonus and ranged damage reduction for the ally one tile in front; higher ranks add Energy on Hit.
- **Rivalry Mode:** first ally below 40% HP is healed and shielded; refine grants Healing and Haste.

The returned Fay page contains all listed sections and is treated as a complete first-pass capture.

### Rolan — tracker ID: `rolan`

Source: https://afkstargazer.com/en/skill/rolan

**Page tags:** `DoT`, `Haste (Single Target)`, `Summon`, `Temp Buff`, `Temp Buff (Opening, Global)`, `Temp Buff (Single Target)`.

Captured additional detail:
- **Oath in the Stone:** cleanses dispellable debuffs from allies, equalizes the HP percentages of non-summoned allies, increases all allies' max HP by 150%, restores 1000% ATK HP, and grants 15% Morale. The temporary max-HP gain decays over 12 s.
- **Undying Valor:** opening passive grants 20% team Morale; each 20% Morale grants all allies ATK equal to 10% of Rolan's initial ATK. The source excerpt also shows Haste and Temp Buff tags.
- **Radiant Reign (Exclusive Equipment):** at 100% team Morale creates a ward; when an ally casts an Ultimate, a radiant clone repeats it with inherited basic stats. Ward prevents Morale decay and, outside Boss battles, protects allies inside from stat reductions.
- **Enhance Force:** `Temp Buff (Opening, Global)`; adds Morale based on the most represented faction; special bonus applies to Lightbearer Empire or Celestials.
- **Season Charm:** healing an ally increases their ATK temporarily.
- **Status remains partial:** source search excerpt appears to omit/mix at least one middle skill section; recapture the page's complete skill order before verification.

### Callan — tracker ID: `callan`

Source: https://afkstargazer.com/en/skill/callan

Captured additional sections:
- **Hero Focus:** increases Vitality.
- **Exclusive Equipment — Hollowed Wrath:** when Callan or a non-summoned ally falls below 30% HP, deals AOE damage to all enemies up to 8 times and stuns them for 0.5 s; once per battle. Higher levels increase damage and stun duration.
- **Enhance Force:** gaining a shield heals Callan for 15% of its max value. LV 2 improves Restless Guardian's opening shield to 600% HP and 80% incoming-damage absorption for allies within 2 tiles; Callan recovers 50% faster after the shield expires.
- **Season Charm:** grants nearby allies an opening shield, repeating every 8 s; higher ranks reduce damage taken while shielded.
- **Status remains partial:** base Ultimate and other base skills were absent from the returned excerpt.

### Hodgkin — tracker ID: `hodgkin`

Source: https://afkstargazer.com/en/skill/hodgkin

Captured additional sections:
- **Enhance Force:** `Debuff (AOE, Global)`; cannon hits reduce enemy Phys DEF by 15%, up to 2 stacks for 10 s. LV 2 grants 400 initial Energy; repeated cannon hits restore Energy and reduce enemy Vitality.
- **Season Charm:** `Debuff (AOE)`; damage taken is reduced per enemy within 1 tile, up to a cap. Higher ranks periodically damage nearby enemies and reduce their ATK.
- **Status remains partial:** full base abilities and exact skill order still need recapture.

### Cryonaia — tracker ID: `cryonaia`

Source: https://afkstargazer.com/en/skill/cryonaia

Captured additional sections:
- **Exclusive Equipment — Frozen in Time:** `Ult Denial`; enemies entering Eternal Winter's domain take damage, and only Cryonaia can cast an Ultimate inside. LV 4 can stop battle time for up to 30 s.
- **Enhance Force:** `Execute`; while Frost Shield is active, instantly freezes and defeats enemies in Eternal Winter's domain below both the stated HP threshold and 15% HP percentage.
- **Season Charm:** recovers Energy per second; after three Ultimates increases ATK. Higher ranks add true damage to all enemies on each Ultimate.
- **Status remains partial:** the base Ultimate and other core abilities must be recaptured.

### Faramor — tracker ID: `faramor`

Source: https://afkstargazer.com/en/skill/faramor

Captured additional sections:
- **Enhance Force:** `Debuff (AOE)`; if an enemy revives inside Faramor's magic circle after reaching 0 HP, their Vitality is reduced by 50.
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks heal Faramor and extend the effect after assisting or defeating a non-summoned enemy.
- **Status remains partial:** the base kit and full section ordering are not yet captured as one complete source record.

### Phraesto — tracker ID: `phraesto`

Source: https://afkstargazer.com/en/skill/phraesto

Captured additional sections:
- **Exclusive Equipment — Misty Whisper:** `Summon`; if Phraesto's Illusion is defeated before him, he taunts the enemy who dealt the most damage, dealing damage and stunning them. LV 4 can summon a replacement Illusion once per battle.
- **Enhance Force:** when Phraesto and his Illusion are in the same row at battle start, both gain shields equal to 570% ATK for up to 12 s.
- **Season Charm:** `Temp Buff (AOE)`; every 8 s grants nearby allies ATK and Life Drain for 8 s; higher ranks grant Phraesto a shield for each ally affected.
- **Status remains partial:** full base kit still needs recapture.

### Nara — tracker ID: `nara`

Source: https://afkstargazer.com/en/skill/nara

Captured additional sections:
- **Enhance Force:** `Debuff (Single Target)`; defeating an enemy with Crimson Vengeance instantly restores 250 Energy. LV 2 Phantom Chains also grants 3 s unaffected, reduces target Vitality permanently, and reduces max HP for the rest of battle (with an ATK-based cap).
- **Season Charm:** opening damage and Haste bonus for 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Status remains partial:** recapture the base Ultimate, skills and Hero Focus.

### Valen — tracker ID: `valen`

Source: https://afkstargazer.com/en/skill/valen

Captured additional sections:
- **Hero Focus:** increases ATK.
- **Exclusive Equipment — Eternal Thunder:** grants permanent Invigoration; Thunder Swordwork during Invigoration permanently stacks ATK, up to 10 stacks.
- **Enhance Force:** `Debuff (Single Target)`; Fury Thunder Strike stuns for 3 s. LV 2 grants 500 initial Energy; lightning hits restore Energy and reduce target Haste and movement speed.
- **Status remains partial:** core Ultimate and base skill descriptions are still missing from the captured excerpt.

### Baden — tracker ID: `baden`

Source: https://afkstargazer.com/en/skill/baden

Captured additional sections:
- **Enhance Force:** `Cheat Death (Self)`; when Baden is defeated while one of his phantoms remains, he possesses one, is deprioritized by enemies, and takes 35% less damage for 8 s; up to 3 triggers per battle.
- **Season Charm:** increases damage dealt and reduces damage taken; both bonuses are amplified while Baden is on the enemy side. Higher ranks grant a permanent shield on first entry to enemy territory.
- **Status remains partial:** capture ends at Ultimate level details; other base abilities and equipment progression require recapture.

### Atalanta — tracker ID: `atalanta`

Source: https://afkstargazer.com/en/skill/atalanta

Captured additional sections:
- **Exclusive Equipment — Sleight of Hand:** `Debuff (Single Target)`; Sweet Encounter can be cast twice at battle start on different targets, with bonus damage. Higher level steals ATK and Phys DEF from the main target temporarily.
- **Enhance Force:** `Debuff (Single Target)`; Atalanta recovers 10% max HP whenever Wild Sniper directly hits an enemy. LV 2 makes her unaffected while casting Sweet Encounter and increases Haste.
- **Status remains partial:** other core abilities and progression sections still need recapture.

## Coverage update

- Koko and Smokey & Meerky have been upgraded from partial to complete first-pass source captures.
- Fay's page was also fully recaptured and upgraded from partial to complete.
- 10 additional pages supplied useful missing sections, but their profiles remain partial where the base kit or another required section is absent.
- This batch is not a second-source cross-check or patch verification.
- No Supabase schema/data changes were made.
