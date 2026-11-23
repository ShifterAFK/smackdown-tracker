# Showdown Smackdown — założenia Match Indicator

> **Status dokumentu:** punkt odniesienia dla dalszych prac.  
> **Ostatnia aktualizacja:** 2026-11-23  
> **Cel:** zachować ustalenia i ograniczenia projektu w jednym miejscu, żeby nie odtwarzać ich z historii rozmów.

Ten dokument rozdziela:
- **ustalenia** — rzeczy wynikające z rozmowy i zaakceptowane jako kierunek;
- **ograniczenia** — informacje, których tracker nie ma lub których nie da się wiarygodnie wywnioskować;
- **otwarte decyzje** — pomysły, których nie należy traktować jako zatwierdzonych.

Nie jest to opis aktualnej implementacji. Przed zmianami trzeba porównać te założenia z kodem i bazą Supabase.

---

## 1. Cel Match Indicator

Match Indicator ma przede wszystkim pomóc widzowi zdecydować, na którą stronę postawić **Guess Tokens** podczas oglądania meczu Showdown Smackdown.

Ma szybko porównać Blue i Red na podstawie informacji, które rzeczywiście mamy. Nie ma symulować całego draftu ani udawać, że zna ukryte informacje.

Wynik nie może sugerować skalibrowanego prawdopodobieństwa zwycięstwa, jeśli nie został osobno skalibrowany i zweryfikowany na historycznych meczach. W szczególności wartość typu „75% confidence” nie oznacza automatycznie 75% szans na wygraną.

## 2. Potwierdzone zasady trybu

### 2.1. Mecz i draft

- Przed meczem system losuje **20 bohaterów** z puli dostępnej w aktualnym theme.
- Każda strona banuje po **jednym bohaterze**.
- Następnie każda strona wybiera po **trzech unikalnych bohaterów**.
- Kolejność wyborów jest następująca:

| Kolejność | Strona | Pick |
|---:|---|---:|
| 1 | Blue | 1 |
| 2 | Red | 1 |
| 3 | Red | 2 |
| 4 | Blue | 2 |
| 5 | Blue | 3 |
| 6 | Red | 3 |

- Bohaterowie używani w wydarzeniu mają taki sam poziom progresji.
- Gracze mogą wybrać bohaterów, których nie posiadają poza wydarzeniem.
- Po wyborze składów gracze ustawiają formacje. Ustawienia przeciwnika pozostają ukryte aż do rozpoczęcia bitwy.
- Gracze dobierani są na podstawie zbliżonych punktów rankingowych.
- Remis jest unieważniany — nie zmienia punktów ani tokenów.
- Zmiana theme aktualizuje pulę bohaterów, mapy i aktywne efekty pola bitwy; punkty rankingowe są resetowane do 400.

### 2.2. Obstawianie

- Widz może oglądać na żywo mecze wysoko sklasyfikowanych graczy.
- Przed rozpoczęciem bitwy wybiera Blue albo Red i stawia Guess Tokens.
- Kursy są ukryte podczas fazy ustawiania formacji, co daje ostatnią możliwość podjęcia decyzji.
- Jeśli widz przestanie oglądać przed rozpoczęciem bitwy albo gracz opuści mecz przed zablokowaniem picków, zakład jest anulowany, a tokeny zwracane.
- Mecz ma osobny czat; Token Packets wygasają po zamknięciu czatu.

## 3. Dane, których nie zakładamy, że mamy

To kluczowe ograniczenia projektowe:

| Informacja | Założenie dla Match Indicator |
|---|---|
| Losowa pula 20 bohaterów | Nie zakładamy, że tracker potrafi ją pobrać. Nie wymagamy ręcznego wpisywania. |
| Bany | Nie wymagamy ręcznego wpisywania. To dodatkowe klikanie w krótkiej fazie draftu. |
| Wybrani bohaterowie i kolejność picków | Kolejność draftu jest znana. Można ją wykorzystać, jeśli tracker rejestruje sloty picków. |
| Formacje | Nie zakładamy, że znamy ustawienie przeciwnika. |
| Pole Battle Fervor | Nie przypisujemy premii konkretnej stronie bez informacji, który bohater stoi na polu. |
| Mapa | Można ją uwzględniać, jeśli jest łatwa do wybrania lub odczytania. |

**Nie wolno budować wyniku tak, jakbyśmy znali pulę 20 bohaterów, bany lub formacje, jeśli te informacje nie są zapisane.** Brak danych nie może być zastępowany domysłem.

## 4. Podstawa oceny — siła bohaterów

Indywidualna siła bohaterów jest fundamentem porównania drużyn.

Ocena powinna uwzględniać co najmniej:
- liczbę występów;
- liczbę zwycięstw;
- win rate;
- wiarygodność / wielkość próbki.

Nie można traktować małej próbki jak pewnego dowodu. Przykładowo 3 zwycięstwa w 3 meczach nie powinny automatycznie oznaczać, że bohater jest lepszy od postaci z 70 zwycięstwami na 100 meczów.

### 4.1. Role bohaterów

Korzystamy z ról przypisanych bohaterom przez grę. **Nie tworzymy ręcznie własnego systemu etykiet** (Carry, Frontline, Protector, Enabler itd.) dla około 130 bohaterów — byłoby to zbyt czasochłonne i trudne do utrzymania.

Role gry są informacją pomocniczą, a nie sztywną regułą:
- Support nie oznacza automatycznie dobrego picku;
- Warrior nie musi być wyłącznie DPS-em i może pełnić funkcję frontline;
- Tank nie jest obowiązkowym elementem każdego zwycięskiego składu;
- bohaterów zadających obrażenia nie należy traktować jako jednej, identycznej kategorii.

Rola opisuje klasyfikację gry. Statystyki meczów pokazują, jak bohater sprawdza się w Showdown Smackdown. Nie należy mylić tych dwóch rzeczy.

## 5. Kolejność draftu i first pick

Kolejność picków jest znana i powinna być uwzględniona w analizie. Pierwszy wybór nie jest równoważny ostatniemu.

W szczególności:
- Blue 1 jest pierwszym pickiem całego draftu.
- Red 1 jest bezpośrednią odpowiedzią na Blue 1.
- Red wykonuje dwa kolejne wybory (Red 1 i Red 2), zanim Blue wybierze ponownie.
- Blue wybiera następnie dwa razy (Blue 2 i Blue 3), a Red kończy draft jako Red 3.

Nie należy zastępować tej kolejności prostym, stałym bonusem dla Blue. W historii danych Blue miało przewagę, ale nie można automatycznie przypisać całej przewagi samemu first pickowi.

Nie znamy pełnej puli 20 bohaterów, więc nie możemy wiarygodnie ocenić, ilu mocnych bohaterów pozostało po pierwszym wyborze ani symulować alternatywnych draftów.

**Wniosek:** kolejność i sloty picków są istotnym kontekstem, ale konkretna formuła i wagi wymagają sprawdzenia danych oraz walidacji. Nie wpisywać arbitralnych bonusów tylko dlatego, że Blue wybiera jako pierwsze.

## 6. Synergie / DUO

Synergie nie są fundamentem oceny. Mogą być korektą, ale tylko wtedy, gdy dane pokazują dodatkową wartość współpracy ponad indywidualną siłę bohaterów.

Problem wskazany w dotychczasowej formule:
- duet był uwzględniany już od 3 występów;
- liczony był wygładzony win rate;
- bonus lub kara trafiały do wyniku;
- wynik trzech duetów w drużynie był sumowany;
- formuła nie sprawdzała, czy duet jest lepszy od oczekiwania wynikającego z samych bohaterów.

Przykład: jeśli bardzo mocny bohater wygrywa z wieloma różnymi partnerami, każdy z tych duetów może wyglądać na mocny. Nie dowodzi to, że ma wyjątkową synergię z każdym z nich.

Ustalenia kierunkowe:
- nie usuwać synergii całkowicie;
- nie przyznawać dużej premii duetom tylko dlatego, że mają 3–5 występów;
- nie traktować trzech duetów jako trzech niezależnych dowodów;
- ograniczyć wpływ małych próbek;
- odróżniać rzeczywistą synergię od wyników przenoszonych przez mocnego bohatera;
- przy małej próbce pozwolić, by ocena indywidualnej siły bohaterów dominowała.

W historii rozmowy odnotowano 3854 różne duety, z których tylko jeden miał co najmniej 10 występów (stan ówczesnego zapytania). To historyczny obraz próbki z momentu analizy, a nie aktualna liczba w bazie.

## 7. Blue / Red — przewaga strony

W analizowanym wówczas zestawie 1061 meczów:
- Blue: 588 zwycięstw, 55,4%;
- Red: 473 zwycięstwa, 44,6%.

To historyczny snapshot z rozmowy, nie należy traktować tych liczb jako aktualnych danych bez ponownego zapytania Supabase.

Wynik wskazywał na zauważalną przewagę Blue, ale:
- nie dowodzi, że cała przewaga pochodzi z first picka;
- Blue i pierwszy pick są powiązane;
- nie mieliśmy osobnych danych o umiejętnościach graczy.

Nie należy więc mechanicznie zamieniać różnicy 10,8 punktu procentowego na bonus dla Blue. Przewagę strony trzeba mierzyć na aktualnych danych i rozdzielać od siły bohaterów tak dalece, jak pozwalają na to dostępne rekordy.

## 8. Mapy i efekty pola bitwy

Nie budujemy osobnego modelu dla każdej mapy. Globalna siła bohatera pozostaje podstawą, a dane mapy mogą być niewielką korektą, jeśli próbka na tej mapie jest wystarczająca.

### Mapy 1–3

- Pierwszy wybrany bohater nie-Dimensional aktywuje Phantimala swojej frakcji.
- Po 30 sekundach, a następnie co 10 sekund, wszystkie jednostki permanentnie tracą 30 Vitality.
- Efekt się kumuluje.

### Fierce Duel i Tactical Grounds

- HP zwiększone o 100%.
- Pierwszy wybrany bohater nie-Dimensional aktywuje Phantimala swojej frakcji.
- Po 30 sekundach, a następnie co 10 sekund, wszystkie jednostki permanentnie tracą 40 Vitality.
- Efekt się kumuluje.

### Dodatkowy efekt Tactical Grounds

Battle Fervor Buff Tile:
- bohater ustawiony na tym polu otrzymuje +30 ATK SPD;
- otrzymuje dodatkowe 30 Life Drain.

Utrata Vitality i zwiększone HP są wspólnymi modyfikatorami bitwy — same w sobie nie wskazują zwycięskiej strony. Mogą zmieniać wartość bohaterów i kompozycji.

Bonus Battle Fervor zależy od bohatera ustawionego na konkretnym polu. Bez danych o formacji nie wolno przypisywać go Blue ani Red.

Różnice win rate między mapami mogą wynikać z mechaniki mapy, ale również z doboru graczy i składów. Nie należy automatycznie interpretować ich jako czystego efektu mapy.

## 9. Dodatkowe mecze graczy z wysokim rankingiem

W rozmowie pojawiła się możliwość dodawania około 100 meczów dziennie od graczy z rank 1. W tamtym momencie baza miała około 1000 meczów, a szacowana liczba po kolejnych 2,5 dniach wynosiła około 1250.

Ważne rozróżnienie:
- mecze topowych graczy mogą lepiej odzwierciedlać metę na wysokim poziomie;
- nie muszą reprezentować przeciętnego uczestnika wydarzenia;
- większa liczba meczów pomaga statystykom, ale nie usuwa problemu rzadkich kombinacji.

**Otwarte:** w historii pojawiło się pytanie, czy mecze rank 1 powinny być główną podstawą, a pozostałe mecze bazą pomocniczą. Nie ma jednoznacznego zatwierdzenia konkretnego schematu wag. Nie wdrażać osobnego ważenia bez potwierdzenia i analizy.

## 10. Proponowana warstwowa interpretacja wyniku

Kierunek analizy można porządkować w następujących warstwach:

1. **Podstawowa przewaga drużyny** — indywidualna siła sześciu wybranych bohaterów oraz wiarygodność ich statystyk.
2. **Kontekst Blue / Red i draftu** — historyczna przewaga strony oraz znana kolejność i sloty picków, bez symulowania nieznanej puli.
3. **Synergie** — mała, kontrolowana korekta potwierdzona danymi ponad indywidualną siłę bohaterów.
4. **Mapa i battle context** — ograniczona korekta, jeśli mapa jest znana, a próbka wystarczająca.
5. **Niepewność** — jawne pokazanie, gdy danych jest za mało.

To jest podział odpowiedzialności, nie zatwierdzona matematyczna formuła. Wagi i dokładny sposób łączenia warstw wymagają walidacji.

## 11. Pomysły niezatwierdzone — nie traktować jako wymagań

### Team Matchup History

Pojawił się pomysł osobnej historii bezpośrednich starć składów:
- rozpoznawanie tych samych składów niezależnie od kolejności bohaterów;
- zapisywanie wyników konkretnego składu przeciwko konkretnemu składowi;
- oddzielne uwzględnianie Blue / Red;
- włączenie sygnału dopiero po zebraniu odpowiedniej liczby powtórzeń;
- kontrolowanie wielokrotnego liczenia tych samych informacji.

To propozycja do oceny, a nie zatwierdzony element obecnego zakresu. Nie zastępuje statystyk bohaterów.

### Inne nieustalone szczegóły

Nie zostały zatwierdzone konkretne:
- wagi synergii;
- wagi korekty mapy;
- formuła wpływu kolejności picków;
- progi minimalnej liczby występów dla każdej warstwy;
- sposób ważenia meczów rank 1.

## 12. Kierunek prac przed zmianami w kodzie

1. Przejrzeć aktualny Match Indicator i ustalić, z jakich tabel, funkcji i statystyk faktycznie korzysta.
2. Sprawdzić aktualny stan i jakość danych w Supabase — liczby z wcześniejszej rozmowy są tylko snapshotem.
3. Zbudować prosty punkt odniesienia oparty na sile bohaterów i rzeczywistej przewadze Blue / Red.
4. Porównać z nim obecną formułę, zwłaszcza wpływ DUO. Sprawdzić, czy synergie poprawiają trafność, czy ją pogarszają.
5. Dopiero potem ocenić korektę kolejności picków i map.
6. Testować na danych historycznych bez przecieku informacji z ocenianego meczu do statystyk użytych do jego przewidywania.
7. Pokazywać ograniczenia i niepewność zamiast deklarować niezweryfikowane prawdopodobieństwa.
8. Osobno zdecydować, czy Team Matchup History i ważenie meczów rank 1 są warte wdrożenia.

## 13. Zasady, których nie wolno zgubić przy kolejnych zmianach

- Match Indicator służy do wyboru strony do obstawienia, nie do pełnej symulacji draftu.
- Indywidualna siła bohatera jest podstawą; synergia jest dodatkiem.
- Nie tworzymy ręcznie ról dla bohaterów.
- Nie zakładamy, że znamy losową pulę 20 bohaterów, bany ani ukryte formacje.
- Nie wprowadzamy obowiązkowego ręcznego formularza puli i banów.
- Nie budujemy ponownie dużego modelu ML na zbyt małej próbce bez mocnego uzasadnienia.
- Nie przypisujemy całej przewagi Blue samemu first pickowi.
- Nie budujemy pięciu niezależnych modeli map.
- Nie udajemy, że mała próbka DUO lub mapy daje pewny sygnał.
- Nie przedstawiamy niekalibrowanego wyniku jako rzeczywistego prawdopodobieństwa wygranej.
- Przed przebudową sprawdzamy, co już działa i jakie dane można zachować.

---

## Źródło ustaleń

Dokument opracowano na podstawie historii rozmowy o Match Indicator i zasadach Showdown Smackdown przekazanych przez użytkownika. Kolejność fragmentów historii nie była chronologiczna; treść została uporządkowana tematycznie, a propozycje bez jednoznacznej akceptacji oznaczono jako otwarte, nie jako wymagania.
