# Hero Knowledge Extraction — Batch 18 (recapture pass 5)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** recapture complete pages and add missing sections for previously partial profiles.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Solise — tracker ID: `solise`

Source: https://afkstargazer.com/en/skill/solise

**Captured kit:**
- **Ultimate — Life's Embrace:** releases three waves of healing across the battlefield, each restoring 140% ATK HP to affected allies. If a Bulbsprite is healed, it emits a water ring from its host, damaging all enemies. Solise is unaffected while casting.
- **Lifebloom Buds:** at battle start sends a Bulb to each non-summoned ally. Bulbs heal their host periodically and store excess healing; when the stored amount reaches the threshold, the Bulb blooms into a Bulbsprite that permanently increases the host's ATK. Bulbs/Bulbsprites remain active even if Solise is defeated, but cannot grow or respond to her.
- **Floral Favor:** heals the two weakest allies. Healing an ally who already has a Bulbsprite grants a permanent shield, with a cap.
- **Hero Focus:** increases ATK, with an extra bonus while an allied Bulbsprite is present.
- **Exclusive Equipment — Resonant Bloom:** when a Bulb blooms, grants the host permanent Phys & Magic DEF. Further excess healing levels up the Bulbsprite and adds permanent ATK to its host, up to three upgrades; max level also grants max HP.
- **Enhance Force:** while Solise casts Life's Embrace, Bulbsprite damage triggers extra damage based on the total excess healing stored during its Bulbsprite phase, with an ATK cap.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK temporarily. Higher ranks increase Solise's Healing after a total-healing threshold.
- **Rivalry Mode:** first ally below 40% HP is healed for 160% ATK HP and receives a 160% ATK shield; refine adds Healing and Haste.

### Marcille — tracker ID: `marcille`

Source: https://afkstargazer.com/en/skill/marcille

**Page tag:** `Cheat Death (Ally)`.
**Ability tag visible:** Exclusive Equipment — Ancient Magic: `Cheat Death (Ally)`.

**Captured kit:**
- **Ultimate — Silver-White Wings that Streak Across the Skies:** all skills require chanting; Haste and ATK SPD affect chant speed. Each completed chant permanently increases Marcille's Haste and Energy Recovery Rate, up to 10 stacks. Active cast spends Energy and summons Sky Fish to dash across the battlefield, damaging enemies in its path.
- **Explosive Spell:** after 3 s of chanting, explodes in the area with the most enemies.
- **Magical Flash:** after 2 s of chanting, heals an ally surrounded by enemies and damages/blinds nearby enemies.
- **Hero Focus:** increases Haste; additional Haste while chanting her Ultimate.
- **Exclusive Equipment — Ancient Magic:** `Cheat Death (Ally)`; after 3 s of chanting, revives an allied hero and restores HP. Once per battle. During preparation, targets an ally one tile in front; if Laios is on the team, he can be revived one additional time without consuming the normal use.
- **Enhance Force:** gains additional Energy recovery for each ally currently providing her with a buff, up to three stacks; at three stacks, Marcille becomes unaffected.
- **Season Charm:** increases damage dealt and Haste for the first 12 s; higher ranks restore HP and extend the effect after assisting or defeating a non-summoned enemy.
- **Rivalry Mode:** casting an Ultimate increases damage dealt temporarily; first Ultimate also permanently increases Energy recovery from attacking. Refine adds ATK SPD and Haste.

### Elijah & Lailah — tracker ID: `elijah-lailah`

Source: https://afkstargazer.com/en/skill/elijah-lailah

**Per-skill tags:**
- Ultimate — Starlight Waltz: `Haste (Global)`, `Temp Buff (Global)`
- Stellar Bond: `Energy Battery`, `Tile Effect`
- Hero Focus: `Haste (Single Target)`
- Exclusive Equipment — Starbound Harmony: `Energy Battery`
- Season Charm: `Temp Buff (AOE)`

**Captured kit:**
- **Ultimate — Starlight Waltz:** Elijah and Lailah fight separately but share HP and Energy; max HP is increased by 50%. Active dance increases all allies' Haste by 60 for 7 s; allies linked through Stellar Bond become unaffected during the dance.
- **Stellar Bond:** when the twins align, they link to each other and allied heroes placed in a straight path between them. Linked allies gain permanent ATK; the bonus is reduced for each additional linked ally. Active cast sends an Energy-restoring pulse from Elijah and a healing pulse from Lailah along the link.
- **Cosmic Protection:** grants shields to Lailah and the weakest ally, makes Lailah unaffected while shielded, and has Lailah cast Stellar Pulse on selected tiles, damaging/blinding nearby enemies and knocking back enemies around her.
- **Hero Focus:** increases the twins' Haste; each Starlight Waltz permanently increases Haste for allies linked through Stellar Bond, stacking up to three times.
- **Exclusive Equipment — Starbound Harmony:** `Energy Battery`; if all linked allies (excluding the twins) share a faction at battle start, resonance increases Vitality and Energy gain. After linked allies have all cast Ultimates, the bond returns part of each Ultimate's Energy cost to all allies.
- **Enhance Force:** increases ATK, Phys DEF and Magic DEF of linked allies based on the highest corresponding stats among other linked allies, with caps based on the twins' original stats.
- **Season Charm:** `Temp Buff (AOE)`; every 8 s increases ATK and Life Drain of allies within 2 tiles. Higher ranks grant the caster a shield for each ally affected.
- **Rivalry Mode:** first ally below 40% HP is healed for 160% ATK HP and receives a 160% ATK shield; refine adds Haste and Assistance.

## Recaptured sections — profiles remain partial

### Voracia — tracker ID: `voracia`

Source: https://afkstargazer.com/en/skill/voracia

**Page tags:** `Debuff`, `Debuff (Single Target)`, `Debuff (AOE)`, `Energy Denial`.
- **The Main Course:** when Voracia damages at least three enemies (or all surviving enemies), the skill gains Fervor. Active cast pulls enemies within 2 tiles onto a plate, knocks them down and deals damage; heals Voracia based on actual damage dealt.
- **Prime Cut:** attacks the area with the most enemies, with an additional slash when enhanced by Fervor.
- **Vino Inferno:** roasts enemies in an area for 5 s; Fervor adds an extra burst.
- **Hero Focus:** increases ATK; additional ATK after appetite awakens.
- **Exclusive Equipment — Chef's Choice:** `Debuff (Single Target)`, `Energy Denial`; after all skills gain Fervor, devours the enemy with the highest cumulative damage, absorbs part of their basic stats and permanently removes their Energy if they are not a Boss.
- **Status remains partial:** excerpt ends during Exclusive Equipment levels; Enhance Force, Season Charm and Rivalry Mode are missing.

### Igor — tracker ID: `igor`

Source: https://afkstargazer.com/en/skill/igor

**Page tags:** `Cheat Death (Self)`, `Debuff (AOE)`.
- **Funereal Ring:** summons a tombstone at battle start; more tombstones appear as enemy heroes lose HP. Igor stands on tombstones and deals area damage when casting.
- **Ghastly Explosion:** activates tombstones periodically or on Ultimate; Igor jumps to one, damages adjacent enemies and becomes immune/untargetable while casting.
- **Specter Guard:** `Cheat Death (Self)`; jumps to another tombstone to dodge a fatal blow and gains damage immunity. Tombstone jumps also restore HP.
- **Hero Focus:** increases Life Drain, with extra Life Drain on first Specter Guard trigger.
- **Status remains partial:** returned excerpt ends during Hero Focus; Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode are missing.

### Marilee — tracker ID: `marilee`

Source: https://afkstargazer.com/en/skill/marilee

- **Mid-Air Shot:** leaps up to 2 tiles in any direction and shoots the two closest enemies to her initial tile.
- **Mighty Arrow:** after every two normal attacks, charges the next attack for extra damage and a brief stun.
- **Hyperfocus:** while no enemy is within 2 tiles, increases ATK and ATK SPD.
- **Hero Focus:** increases Crit DMG Boost.
- **Status remains partial:** Exclusive Equipment, Enhance Force, Season Charm and Rivalry Mode are absent from the returned excerpt.

### Valka — tracker ID: `valka`

Source: https://afkstargazer.com/en/skill/valka

**Page tag:** `Debuff (Single Target)`.
- **Blooming Terror:** normal attacks build Panic on an enemy. At four stacks, the target enters Panic and loses Haste. Valka can then consume 100 Energy to stun and execute the target with max-HP-based true-damage slashes, healing herself.
- **Spectral Bulwark:** opening shield scales with the number of adjacent allies; those allies also gain ATK SPD for the battle.
- **Hero Focus:** increases ATK SPD.
- **Exclusive Equipment — Soulshock Riposte:** blocks Ultimate damage from an enemy within range and immediately casts Blooming Terror on the attacker without consuming Energy or removing Panic; grants Energy and temporary ATK SPD/Life Drain.
- **Status remains partial:** Enhance Force and Season Charm were not present in the returned excerpt.

### Aster — tracker ID: `aster`

Source: https://afkstargazer.com/en/skill/aster

Captured additional sections:
- **Hero Focus:** increases ATK; summoning Stars adds further ATK up to a cap; converting Stars into Black Holes grants another ATK increase.
- **Exclusive Equipment — Starless Hollows:** `Debuff (AOE)`, `DoT`; after three Stars are summoned, converts all Stars into Black Holes and devours orbiting Planets. Black Holes deal periodic true damage plus target-max-HP-based true damage to nearby enemies.
- **Status remains partial:** the available equipment excerpt ends before all levels/effects are captured; confirm the full Exclusive Equipment and complete page before upgrading status.

### Pandora — tracker ID: `pandora`

Source: https://afkstargazer.com/en/skill/pandora

- **Ultimate — Panic Projection:** `Debuff (Global)`, `DoT`; all units flee toward their own side for 5 s and lose HP periodically. When fear ends, their ATK is reduced for 8 s, stacking up to three times.
- **Boxed Blessing:** `Energy Battery`, `Invincibility`, `Special Target`, `Temp Buff (Single Target)`; at battle start, pulls the rearmost ally into Pandora's box, making them invincible but unable to cast skills for 4 s.
- **Status remains partial:** returned excerpt ends during Boxed Blessing; remaining abilities and progression sections are missing.

## Coverage update

- Solise, Marcille and Elijah & Lailah upgraded from partial to complete first-pass captures.
- Voracia, Igor, Marilee, Valka, Aster and Pandora gained additional captured details but remain partial.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
