# Match Indicator — aktualna implementacja

**Stan sprawdzony:** 2026-11-24  
**Gałąź:** `main`  
**Repozytorium:** `ShifterAFK/smackdown-tracker`  
**Plik aktywnego wskaźnika:** `assets/js/modules/08-draft-indicator-rules-v1.js`  
**Wersja modelu:** `draft-indicator-rules-v1`

Ten dokument opisuje to, co faktycznie jest w aktualnym kodzie i bazie, a nie samą koncepcję ani historyczne propozycje. Aktualizować go przy każdej zmianie formuły Match Indicator.

## 1. Co robi wskaźnik

Draft Indicator porównuje historyczną przewagę BLUE i RED na podstawie:
1. wyników bohaterów po stronie BLUE/RED, z osobnym traktowaniem first picka;
2. historycznej przewagi strony BLUE;
3. eksperymentalnej synergii **konkretny bohater × klasa partnera**.

To nie jest win probability. Pasek jest wizualizacją różnicy punktowej, a nie skalibrowanym prawdopodobieństwem.

## 2. Dane pobierane przez aktywny frontend

Moduł pobiera równolegle:
- `ss_get_stats(p_theme_id: null, p_exclude_mirrors: false)` — zbiorcze wyniki bohaterów i par DUO;
- `ss_get_side_stats(p_theme_id: null, p_exclude_mirrors: false)` — występy i zwycięstwa bohaterów osobno po stronie BLUE i RED;
- `ss_get_first_pick_stats()` — wyniki BLUE 1 i RED 1.

**Uwaga techniczna:** aktualna definicja `ss_get_first_pick_stats()` ogranicza status `approved` w warunku JOIN do `ss_matches`, ale nie odrzuca wierszy picków, dla których mecz nie jest approved. Przy obecnym stanie bazy nie zmienia to wyniku, ponieważ sprawdzono **0 niezatwierdzonych meczów i 0 picków z takich meczów**. Jeśli w przyszłości pojawią się mecze pending/rejected z wpisami w `ss_match_heroes`, ta funkcja może je błędnie doliczyć — należy wtedy poprawić filtr. Nie zmieniano teraz funkcji ani bazy.

Wszystkie mapy są łączone. Mirrory są uwzględnione. Klasy bohaterów pochodzą z `config.heroes[].class`, czyli oficjalnych klas zwracanych przez `ss_get_config()`.

Wskaźnik odświeża się po zmianie draftu, zmianie katalogu/sesji asystenta i po zapisaniu meczu.

## 3. Składnik indywidualnej siły bohaterów

Dla każdego bohatera wybieranego przez daną stronę:
- First pick (pick_order = 1) korzysta wyłącznie z historii first picków tej strony.
- Pick 2 i 3 korzystają z występów tej strony pomniejszonych o first picki.
- Wynik jest wygładzany w stronę ogólnego win rate tej strony.

Wzór:

```
smoothed = (wins + side_baseline * 10) / (appearances + 10)
hero_lift = smoothed - side_baseline
pick_contribution = hero_lift * pick_weight
```

Wagi:
- BLUE 1 / RED 1: **1.5×**
- pick 2 i 3: **1×**
- wygładzanie: **10 pseudo-występów**.

Wynik bohatera to wkład ponad historyczną średnią danej strony, a nie surowy win rate. Dlatego bohater z 60% WR na stronie, która wygrywa 60% meczów, nie dostaje automatycznie dodatniego liftu.

## 4. Historyczna przewaga strony

Osobny składnik wynosi:

```
side_prior = blue_baseline - 0.5
```

Jest dodawany do różnicy wyników drużyn. To historyczna przewaga BLUE względem 50%, a nie dodatkowy bonus first picka.

## 5. Aktualna synergia: hero × partner-class

**Ważne: poprzedni bezpośredni bonus DUO został zastąpiony.** Dane DUO nadal są wejściem do obliczeń, ale wskaźnik nie dodaje już po prostu oceny konkretnej pary. Uczy się, czy konkretny bohater osiąga ponadprzeciętne wyniki z partnerami danej klasy.

Dla każdej historycznej pary:
1. Dla obu bohaterów liczy indywidualny globalny lift: win rate jest wygładzany przez 5 pseudo-wins i 10 pseudo-występów.
2. Oczekiwany wynik pary to `clamp(0.5 + lift_A + lift_B, 0.05, 0.95)`.
3. Liczy residual pary: `duo_wins - duo_appearances * expected_pair_result`.
4. Ten residual dopisuje do dwóch kierunkowych grup:
   - bohater A z klasą bohatera B;
   - bohater B z klasą bohatera A.

Przy ocenie aktualnego składu dla każdej z trzech par:
1. Pobiera grupę konkretnego bohatera z klasą partnera.
2. Odejmuje z niej aktualną dokładną parę, żeby para nie oceniała sama siebie.
3. Pozostałą historię wygładza przez **30 pseudo-występów**.
4. Uśrednia efekt w obu kierunkach.

Na koniec:
- sumuje efekty trzech par w drużynie;
- mnoży sumę przez **0.2**;
- ogranicza korektę całej drużyny do **±0.030**.

To nie jest ogólny bonus za kompozycję klas. Nie ma reguły „Support + Tank = bonus”. Wynik zależy od konkretnego bohatera i klasy jego partnera. Uwzględniane są wszystkie kombinacje oficjalnych klas, nie tylko Support.

### Co zmienił ostatni eksperyment

Przetestowano filtr ograniczający interakcje do Supportów. Nie poprawił on wyniku względem szerszego modelu hero × partner-class, dlatego pozostały wszystkie kombinacje klas.

Walk-forward zapisany w dokumentacji dla 1,055 meczów testowych:
- poprzednia formuła hero + side + stary residual DUO: **613/1,055 (58.10%)**;
- hero + side bez korekty synergii: **619/1,055 (58.67%)**;
- hero + side + hero × partner-class: **620/1,055 (58.77%)**.

Różnica nowego modelu względem samego hero + side to tylko **1 dodatkowo trafny mecz**. To eksperymentalny, bardzo mały sygnał — nie dowód solidnej poprawy. Gorszy wynik starej formuły wynikał głównie ze starego residualu DUO.

## 6. Wynik końcowy i prezentacja

```
delta =
  blue_hero_score
  - red_hero_score
  + (blue_baseline - 0.5)
  + blue_class_synergy
  - red_class_synergy
```

- dodatni delta oznacza przewagę BLUE;
- ujemny delta oznacza przewagę RED;
- `abs(delta) < 0.005` oznacza wynik neutralny;
- szerokość paska jest ograniczona do zakresu 20–80% i służy wyłącznie wizualizacji różnicy;
- wskaźnik jawnie opisuje wynik jako historyczny score difference, **nie win probability**.

## 7. Czego obecny wskaźnik NIE uwzględnia

- H2H / bezpośredniego counterowania bohaterów przeciwnika;
- mapy ani efektów mapy;
- Phantimala;
- formacji, pozycji na polu, Battle Fervor tile;
- umiejętności graczy;
- losowej puli 20 bohaterów ani banów;
- symulacji dostępności mocnych picków i pełnej ekonomii kolejności draftu.

Kolejność picków jest znana w danych, ale obecna formuła wykorzystuje ją tylko do rozróżnienia first picka od picków 2/3 i nadania first pickowi wagi 1.5×. Nie modeluje osobno sekwencji BLUE 1 → RED 1 → RED 2 → BLUE 2 → BLUE 3 → RED 3 ani tego, jak wybory RED 1+2 ograniczają odpowiedź BLUE 2+3.

## 8. Drugi mechanizm: zapis historycznych predykcji w Supabase

Migracja `20261123190906_capture_chronological_draft_predictions` dodała:
- `ss_matches.played_at`;
- tabelę `ss_match_predictions`;
- funkcję `ss_calculate_draft_indicator(uuid)`;
- funkcje synchronizujące i triggery, które zapisują wynik modelu po zatwierdzeniu/zmianie składu meczu.

Ten mechanizm odtwarza wynik chronologicznie: dla ocenianego meczu korzysta tylko z zatwierdzonych meczów wcześniejszych według `played_at`, a przy remisie czasu według `created_at` i ID. Zapisuje m.in. wersję modelu, składy, wynik, score delta, korekty synergii i liczbę wcześniejszych meczów.

**To nie jest pomiar wykonany przed poznaniem wyniku.** Pole `outcome_known_at_calculation` jest ustawione na `true`. `historical_replay` oznacza chronologiczne odtworzenie, a `automatic_ingest` — obliczenie przy imporcie/zatwierdzeniu, kiedy wynik meczu jest już znany. To pozwala ocenić model bez używania ocenianego meczu w jego własnych statystykach, ale nie jest jeszcze prospektywnym testem na żywo.

## 9. Stan sprawdzony w Supabase — 2026-11-24

- zatwierdzone mecze: **1,284**;
- rekordy picków w zatwierdzonych meczach: **7,704**;
- bohaterowie z przypisaną klasą: **131/131**;
- rekordy `ss_match_predictions`: **1,284**;
- `historical_replay`: **1,120**;
- `automatic_ingest`: **164**;
- predykcje kierunkowe (nie-neutralne): **1,265**;
- trafne: **736**;
- nietrafne: **529**;
- neutralne: **19**.

736/1,265 = **58.18%** trafności kierunkowych wskazań w zapisanym chronologicznym zbiorze. Ponieważ rekordy powstają po poznaniu wyniku, nie przedstawiać tej liczby jako live accuracy ani jako szansy wygranej.

## 10. Pliki i migracje źródłowe

- Frontend: `assets/js/modules/08-draft-indicator-rules-v1.js`
- Klasy bohaterów i konfiguracja: migracja `20261123172421_add_official_hero_classes`
- Chronologiczny zapis predykcji: migracja `20261123190906_capture_chronological_draft_predictions`
- Założenia, ograniczenia i wyniki eksperymentów: `docs/SHOWDOWN_SMACKDOWN_ASSUMPTIONS.md`

## 11. Reguła pracy na przyszłość

Przed każdą zmianą Match Indicator:
1. przeczytać ten dokument i `docs/SHOWDOWN_SMACKDOWN_ASSUMPTIONS.md`;
2. sprawdzić aktualny kod na aktywnej gałęzi, nie opierać się na ZIP-ie ani historii rozmowy;
3. sprawdzić odpowiednie RPC/migracje i aktualne dane Supabase;
4. odróżnić formułę aktywnego frontendu od mechanizmu zapisu historycznych predykcji;
5. po zmianie zaktualizować ten dokument i podać commit oraz weryfikację.

Nie zmieniać kodu ani bazy tylko dlatego, że dokument sugeruje kierunek — decyzję o zmianie podejmujemy osobno.
