# AFK Journey hero classes

The tracker stores the **official in-game class** for every hero in `public.ss_heroes.class`.
This is a catalog attribute, not a role inferred from a hero's skills or current meta use.

## Official class values

- Mage
- Marksman
- Rogue
- Support
- Tank
- Warrior

## Assignments in the tracker

All 131 heroes in the tracker catalog have exactly one class.

### Lightbearer

| Hero | Class |
|---|---|
| Atalanta | Marksman |
| Cassadee | Mage |
| Chippy | Tank |
| Cyran | Mage |
| Estrilda | Rogue |
| Evie | Support |
| Fay | Support |
| Gwyneth | Marksman |
| Hammie | Support |
| Hugin | Support |
| Korin | Warrior |
| Lucca | Tank |
| Lucius | Tank |
| Marilee | Marksman |
| Mirael | Mage |
| Orion | Warrior |
| Peggy | Support |
| Perseus | Warrior |
| Rowan | Support |
| Silven | Marksman |
| Sinbad | Rogue |
| Sonja | Warrior |
| Temesia | Tank |
| Vala | Rogue |
| Valen | Warrior |
| Walker | Rogue |
| Zanie | Marksman |

### Mauler

| Hero | Class |
|---|---|
| Alsa | Mage |
| Antandra | Tank |
| Brutus | Warrior |
| Galahad | Mage |
| Gerda | Tank |
| Hepler | Tank |
| Kazim | Marksman |
| Koko | Support |
| Kordan | Warrior |
| Kruger | Warrior |
| Lumont | Tank |
| Mikola | Support |
| Nazrik | Marksman |
| Odie | Marksman |
| Rhys | Marksman |
| Satrana | Mage |
| Seth | Rogue |
| Shakir | Rogue |
| Smokey & Meerky | Support |
| Soren | Rogue |
| Voracia | Mage |
| Zandrok | Warrior |

### Wilder

| Hero | Class |
|---|---|
| Arden | Mage |
| Bryon | Marksman |
| Damian | Support |
| Eironn | Rogue |
| Faramor | Rogue |
| Florabelle | Warrior |
| Granny Dahnie | Tank |
| Hewynn | Support |
| Indris | Marksman |
| Kafra | Warrior |
| Lenya | Rogue |
| Lily May | Rogue |
| Lorsan | Support |
| Lyca | Marksman |
| Pang | Warrior |
| Parisa | Mage |
| Pippa | Mage |
| Ravion | Rogue |
| Solise | Support |
| Tasi | Mage |
| Thador | Tank |
| Tilaya | Warrior |
| Ulmus | Tank |
| Velara | Support |

### Graveborn

| Hero | Class |
|---|---|
| Baden | Rogue |
| Bonnie | Marksman |
| Callan | Tank |
| Carolina | Mage |
| Cecia | Marksman |
| Daimon | Tank |
| Eryndor | Mage |
| Hodgkin | Warrior |
| Igor | Warrior |
| Isabella | Support |
| Karma | Tank |
| Ludovic | Support |
| Nara | Rogue |
| Nerion | Marksman |
| Niru | Support |
| Salazer | Rogue |
| Senea | Marksman |
| Shadewing | Rogue |
| Shemira | Mage |
| Silvina | Rogue |
| Thoran | Tank |
| Valka | Warrior |
| Viperian | Mage |
| Zorya | Warrior |

### Celestial

| Hero | Class |
|---|---|
| Aliceth | Marksman |
| Alna | Tank |
| Athalia | Rogue |
| Aurora | Mage |
| Baelran | Warrior |
| Dionel | Marksman |
| Dunlingr | Tank |
| Elijah & Lailah | Support |
| Marene | Mage |
| Rolan | Support |
| Scarlita | Warrior |
| Sylphira | Rogue |
| Talene | Mage |

### Hypogean

| Hero | Class |
|---|---|
| Aster | Mage |
| Berial | Rogue |
| Contess | Support |
| Cryonaia | Mage |
| Gunnar | Tank |
| Harak | Warrior |
| Kulu | Marksman |
| Lamentis | Marksman |
| Mehira | Mage |
| Phraesto | Tank |
| Reinier | Support |
| Saida | Rogue |

### Dimensional

| Hero | Class |
|---|---|
| Frieren | Mage |
| Himmel | Warrior |
| Laios | Warrior |
| Lucy | Mage |
| Marcille | Mage |
| Natsu | Warrior |
| Pandora | Support |
| Taichi | Warrior |
| Yamato | Mage |

## Current distribution

| Class | Heroes |
|---|---:|
| Mage | 25 |
| Marksman | 20 |
| Rogue | 21 |
| Support | 22 |
| Tank | 19 |
| Warrior | 24 |
| **Total** | **131** |

## Sources and maintenance

- [GuildMeta — AFK Journey characters](https://guildmeta.com/afk-journey/characters), updated 18 November 2026; used for the current 129-hero class roster.
- [AFK Global — character database](https://www.afk.global/afk-journey/characters), which exposes the game's six class filters.
- [AFK Global — Hammie](https://www.afk.global/afk-journey/characters/hammie), confirming Support.
- [AFK Journey Wiki — hero data module](https://afk-journey.fandom.com/wiki/Module:Card/heroes), including Chippy as Tank and Hammie as Support.

The two starter heroes absent from the 129-hero GuildMeta list were checked separately: Chippy is Tank and Hammie is Support. The mapping is restricted to heroes already present in the tracker catalog. When a new hero is added, add its official class to the same migration/catalog workflow; do not infer a class from faction, damage type, or tier.
