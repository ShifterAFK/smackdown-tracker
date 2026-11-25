# Hero Knowledge Extraction — Batch 16 (recapture pass 3)

- **Branch:** `development`
- **Captured:** 2026-11-25
- **Primary source:** AFK Stargazer individual skill pages
- **Purpose:** recapture the next group of partial hero pages, upgrading only profiles whose full visible kit and progression sections are present.
- **Scope:** documentation only. No Supabase writes.

## Profiles upgraded to complete first-pass captures

### Lucius — tracker ID: `lucius`

Source: https://afkstargazer.com/en/skill/lucius

**Page tags:** `Debuff (AOE)`, `Temp Buff`.

**Captured kit:**
- **Ultimate — Divine Light Aegis:** selects a tile and grants allies on it and adjacent tiles a shield absorbing 470% ATK damage for 10 s; shield scales to 520% ATK.
- **Divine Bash:** shield bash deals 70% ATK damage to an enemy and knocks them back; Lucius also gains a shield absorbing 300% ATK for 8 s. Higher level adds a 1 s stun.
- **Divine Light Blessing:** whenever Lucius gains a shield, he heals the weakest ally for 80% ATK + 20% of shield value. Higher levels improve the shield effect.
- **Hero Focus:** increases Healing by 11/15/19.
- **Exclusive Equipment — Sacred Beam:** `Debuff (AOE)`; fires a frontal 3-tile-wide, 4-tile-long beam, damaging enemies and reducing their ATK. Higher levels add a shield per enemy hit and increase the ATK reduction.
- **Enhance Force:** Lucius heals one additional ally with Divine Light Blessing.
- **Season Charm:** `Temp Buff`; increases shield value provided by Lucius. When granting an ally a shield, increases their Phys & Magic DEF for 8 s; higher ranks also heal for a percentage of the shield value.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Vitality and Healing.

### Lucca — tracker ID: `lucca`

Source: https://afkstargazer.com/en/skill/lucca

**Page tag:** `Debuff (AOE)`.

**Captured kit:**
- **Ultimate — Quake Slam:** against an adjacent enemy, knocks them airborne and slams them in place; against an enemy closer to Lucca's allied backline, charges and slams them back to his original tile. The slam deals 200% ATK to the target and adjacent enemies and stuns them for 2 s. Lucca is immune to control while casting; auto-cast prioritizes targets nearer his allied backline.
- **Ruthless Ram:** Lucca gains a shield based on both Phys DEF and Magic DEF, then charges an enemy, dealing damage, interrupting and disarming them for 4 s.
- **Courageous Call:** removes dispellable debuffs from Lucca and reduces his damage taken for 5 s; can be cast while under dispellable control.
- **Hero Focus:** increases max HP by 17/23/29%.
- **Exclusive Equipment — Unshakeable Ties:** gains a shield for each ally placed in an adjacent tile behind him at battle start; those supporting allies also gain ATK. Higher level expands Ruthless Ram's area when at least two allies support him.
- **Enhance Force:** casting Courageous Call restores 15% HP. LV 2 increases Phys & Magic DEF of adjacent allies behind Lucca during preparation; when one takes damage, Lucca automatically casts his Ultimate on a valid attacker once per battle without consuming Energy.
- **Season Charm:** `Debuff (AOE)`; reduces damage taken for each enemy within 1 tile, up to a cap. Higher ranks periodically damage nearby enemies and reduce their ATK.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Vitality and Crit DMG DEF.

### Gunnar — tracker ID: `gunnar`

Source: https://afkstargazer.com/en/skill/gunnar

**Per-skill tags:**
- Ultimate — Annihilation Directive: `Debuff (AOE)`, `DoT`, `Tile Effect`
- Absolute Defense: `Temp Buff (Opening, Single Target)`
- Exclusive Equipment — Fire Suppression: `Invincibility`
- Enhance Force: `DoT`, `Heal Denial`

**Captured kit:**
- **Ultimate — Annihilation Directive:** at battle start, if an ally is one tile behind Gunnar, he creates a Doomfield at that ally's location, increasing their normal attack range and ATK based on Gunnar's initial ATK. Gunnar and the ally remain steadfast while the field condition holds. Active cast bombards the target area, then creates fire for 15 s; enemies in fire take periodic damage and lose Vitality.
- **Bombing Engine:** fires six cannon strikes around Gunnar's locked-on target. If a Doomfield is active, the ally in it performs six coordinated attacks that damage and stun the locked-on target.
- **Absolute Defense:** `Temp Buff (Opening, Single Target)`; grants Gunnar a shield and shields every ally behind him. If Doomfield is active, increases the attack speed of the ally inside it.
- **Hero Focus:** increases Ranged DEF and Vitality, with additional amounts for each allied hero behind Gunnar.
- **Exclusive Equipment — Fire Suppression:** `Invincibility`; when the Doomfield ally deals enough cumulative damage, Gunnar launches a missile at his locked target and heals based on damage dealt. LV 4 makes the Doomfield ally invincible and grants ATK while Gunnar remains above the stated HP threshold.
- **Enhance Force:** `DoT`, `Heal Denial`; if Doomsday Meteor hits an area already set on fire, it becomes permanently scorched. Enemies in the scorched area cannot heal or gain shields.
- **Season Charm:** opening ranged-damage bonus for the ally one tile behind Gunnar; higher ranks grant that ally a shield the first time their HP falls below 50%.
- **Rivalry Mode:** below 60% HP, reduces damage taken and restores lost HP over 8 s, up to once every 20 s; refine adds Crit Resist and Crit DMG DEF.

## Recaptured sections — profiles remain partial

### Contess — tracker ID: `contess`

Source: https://afkstargazer.com/en/skill/contess

**Page tags:** `Debuff (Single Target)`, `DoT`, `Energy Denial`, `Temp Buff`, `Ult Denial`.

- **Detention Pass:** opening concealment makes Contess untargetable and inactive while recovering Energy. When she enters, the active effect heals an ally and grants Exemption; Exemption converts part of ongoing HP loss into a shield and increases ATK while the shield holds. Another active effect heals the two weakest allies and reduces ATK of the two highest-damage enemies.
- **Quiet Period:** `Debuff (Single Target)`, `Energy Denial`; Code of Conduct — Be Quiet is violated whenever a unit casts an Ultimate, with a per-unit violation cooldown.
- **Exclusive Equipment — Expulsion Notice:** `Debuff (Single Target)`, `DoT`, `Ult Denial`; repeatedly punished units can be permanently expelled, silenced and suffer additional HP loss.
- **Enhance Force:** `Ult Denial`; regular battles apply stun or silence for specific rule violations; Boss battles add an extra punishment.
- **Season Charm:** `Temp Buff`; healing an ally increases their ATK temporarily; higher ranks increase Contess's Healing after a total-healing threshold.
- **Status remains partial:** Hero Focus and at least one base skill section were not present in the returned excerpt.

### Gwyneth — tracker ID: `gwyneth`

Source: https://afkstargazer.com/en/skill/gwyneth

- **Ultimate — Hailing Arrows:** passive charged normal attack deals 360% ATK; active cast rains arrows over a selected tile and surrounding area, damaging and immobilizing enemies. Subsequent hits on the same target in one wave deal reduced damage.
- **Fulgur Arrow:** `Ult Denial`; the page confirms this tag and a three-attack normal-attack cycle.
- **Status remains partial:** the returned excerpt ends during Fulgur Arrow and does not expose the rest of the kit/progression.

### Saida — tracker ID: `saida`

Source: https://afkstargazer.com/en/skill/saida

**Page tags:** `Cheat Death (Self)`, `Debuff (Single Target)`, `DoT`, `Energy Denial`.

- **Ultimate — Seed Siphon:** `Energy Denial`; teleports to an enemy, prevents them from moving or acting, deals damage and drains 220 Energy, then plants a Drain Seed. The seed periodically damages its host and drains Energy. Up to eight seeds may exist at once.
- **Status remains partial:** returned excerpt only contains the Ultimate and its scaling; all other skills and progression sections still require recapture.

### Laios — tracker ID: `laios`

Source: https://afkstargazer.com/en/skill/laios

**Page tags:** `Debuff (AOE)`, `Energy Battery`, `Haste (AOE)`, `Summon`, `Temp Buff (AOE)`.

- **Ultimate — Living Armor - Kensuke:** `Summon`; summons Living Armor with infinite HP and its own Energy pool. It loses Energy over time and from damage, then recharges and returns to combat. Recasting restores its Energy, grants control immunity and increases its ATK SPD.
- **Hero Focus:** increases Laios's ATK.
- **Exclusive Equipment — Ingredient Analysis:** against monsters (not heroes or their summons), causes extra ingredient drops at HP-loss thresholds and increases damage to monsters.
- **Enhance Force:** each different ingredient collected using Dungeon Gourmet permanently increases Laios's max HP, up to three times.
- **Season Charm:** increases ATK and Phys & Magic DEF for the caster and units they create; higher ranks add Haste after 5 s.
- **Status remains partial:** returned excerpt did not include the full intervening base-skill section(s) or all source tags at ability level.

### Pippa — tracker ID: `pippa`

Source: https://afkstargazer.com/en/skill/pippa

**Page tags:** `Airborne`, `Energy Denial`.

- **Ultimate — Wild Shift:** `Airborne`; immobilizes two rearmost enemies, teleports them to a target tile and drops them, damaging and knocking down enemies there. Pippa has a chance for skills to go out of control, teleporting their target to a random enemy-side location.
- **Mad Missiles:** fires nine magic missiles at enemies in quick succession.
- **Exclusive Equipment — Mage's Bloom:** prevents the first cast from going out of control and gives each cast a chance to mutate; mutation adds area true damage and immobilization around the target.
- **Status remains partial:** excerpt omits one or more ability sections, Hero Focus, Enhance Force, Season Charm and/or Rivalry Mode.

### Himmel — tracker ID: `himmel`

Source: https://afkstargazer.com/en/skill/himmel

- **Ultimate — Heroic Slash:** performs nine slashes in a frontal area, followed by a sweep that deals damage plus true damage based on target max HP.
- **Heroic Dash:** dashes to the two enemies with the highest cumulative damage, damages and knocks them down, then returns.
- **Hero Party:** `Tile Effect`; if at least one Mage, Tank and Support are adjacent, forms a party with one ally of each class, increasing basic stats and granting a shared permanent shield. Active cast damages a target and converts part of damage into healing for party members.
- **Enhance Force:** in Boss fights, Himmel and party members cause increased HP loss to Boss targets.
- **Season Charm:** increases ATK when the caster is displaced by their own skills; higher ranks add a shield.
- **Status remains partial:** Hero Focus and Exclusive Equipment sections are absent from the returned excerpt.

### Kruger — tracker ID: `kruger`

Source: https://afkstargazer.com/en/skill/kruger

**Page tag:** `Debuff (Single Target)`.

- **Ultimate — Devastating Axe:** knocks down an enemy, deals damage and applies three stacks of Shatter Armor; each stack reduces target Phys DEF.
- **Smashing Assault:** deals damage and applies one stack of Shatter Armor.
- **Vital Strike:** attacks adjacent enemies with at least four Shatter Armor stacks and not affected by Vulnerable, dealing damage and inflicting Vulnerable.
- **Status remains partial:** remaining kit, Hero Focus and progression sections are not present in the returned excerpt.

## Coverage update

- Lucius, Lucca and Gunnar upgraded from partial to complete first-pass source captures.
- Six additional pages (Contess, Gwyneth, Saida, Laios, Pippa, Himmel, Kruger) yielded useful missing details but remain partial. Note: seven profiles are listed here.
- This is not second-source validation or patch verification.
- No Supabase schema/data changes were made.
