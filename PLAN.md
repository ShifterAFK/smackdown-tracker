# Aktualny stan projektu — 2026-11-21

Ta sekcja zastępuje nieaktualne statusy faz opisane niżej. Starszy plan MVP pozostaje jako kontekst historyczny.

## Aktywny stan
- Tier List (główna zakładka): S obejmuje maksymalnie 8 bohaterów z surowym win rate ≥70% i co najmniej 10 występami; A obejmuje pozostałych z win rate ≥60%; B to 50–<60%, C <50%, N poniżej 10 występów. Wilson lower bound (95% confidence) ustala kolejność wewnątrz tierów. W każdym tierze pierwszy bohater z co najmniej 30 meczami otrzymuje `X+`, ostatni bohater z co najmniej 30 meczami `X-`, a bohaterowie z 10–29 meczami otrzymują `X?` i są przesuwani na koniec tieru; nie uczestniczą w wyznaczaniu `X-`. Przy jednym bohaterze z 30+ meczami ma on `X+` (nie dublujemy oznaczenia). Te same oznaczenia `X+ / X? / X-` i kolejność 30+ przed mniej pewnymi próbkami obowiązują również w zakładkach `Tier S 30+` i `Tier Side`; ich dotychczasowe kryteria kwalifikacji oraz algorytmy punktacji pozostają bez zmian. Aktywnym rendererem głównej zakładki jest dynamicznie ładowany `assets/js/tier-list.js` (przez `snapshot-ui-1323.js`); `09-tier-top5.js` uruchamia się wcześniej, ale jego wynik jest później nadpisywany przez renderer. Zasady kwalifikacji głównej zakładki są więc utrzymywane w `tier-list.js`. Nie zmienia się katalog bohaterów Record Match ani Draft Indicator.
- Przygotowano osobny mobilny układ Record Match na branchu `feature/record-match-mobile-layout`: BLUE i RED pozostają obok siebie, Live Draft Edge jest nad nimi w kompaktowym sticky panelu, katalog ma poziome filtry frakcji i ciaśniejsze rzędy portretów. To jest wersja do testów w Live Preview; nie jest jeszcze scalona.
- Record Match używa jednego kompaktowego układu; Legacy zostało usunięte. Górny pasek zawiera wybór Hero ranking/Tier List i przełącznik kolejności draftu. Live Draft Edge zajmuje miejsce mapy obok drużyn BLUE/RED i aktualizuje się po każdym dodaniu, usunięciu lub przeniesieniu bohatera. Wskaźnik jest eksperymentalnym wynikiem punktowym z danych historycznych, a nie skalibrowanym prawdopodobieństwem zwycięstwa. Formularz zgłoszenia wyniku pozostaje w osobnym, zwijanym panelu. Katalog jest pełnej szerokości, a nagłówek draftu pozostaje sticky podczas przewijania. Poprawiono konflikt ze starszą desktopową siatką 410px + katalog: w New Layout wymuszono jedną kolumnę pełnej szerokości i zachowano nazwane obszary siatki. Wcześniejsza korekta paska Hero ranking pozostaje.
- Domyślna gałąź: `main`, obecnie zawiera stan wcześniej rozwijany na `feature/record-match-tier-picker`.
- Frontend ma Record Match z interaktywnym Tier List pickerem, trzy widoki Tier List oraz regułowy Draft Indicator.
- Nawigacja widoków jest scentralizowana: Record Match, Tier List, Tier S 30+, Tier Side i Statistics wzajemnie się ukrywają przy każdej zmianie zakładki.
- Draft Indicator zastąpił predykcyjny model logistyczny. `train-match-model` jest wycofany: harmonogram cron usunięty, publiczny dostęp do `model_snapshots` cofnięty, endpoint zwraca HTTP 410. Historyczne snapshoty pozostają w bazie bez dostępu anon/authenticated.
- Splittery JS i CSS nie usuwają już plików spoza własnego wygenerowanego zestawu.
- Baza Supabase i zatwierdzone mecze pozostają bez zmian; nie wykonano migracji danych meczowych.

## Znane ograniczenia automatyzacji
- Repo nie ma obecnie automatycznych testów aplikacji.
- Workflow splittera potrafi wygenerować branch, ale tworzenie PR przez GitHub Actions jest blokowane ustawieniami repozytorium.
- Workflow `mobile-team-tap` jest niezsynchronizowany z aktualnym kodem i kończy się błędem dopasowania starego handlera.

## Następne kroki
1. Ręcznie sprawdzić w przeglądarce Record Match, Tier List i Draft Indicator po zmianie domyślnej gałęzi.
2. Uporządkować niesprawne workflowy i ustalić bezpieczny sposób tworzenia PR.
3. Przeanalizować specyfikację Showdown Smack i wdrażać ją etapami.
4. Dodać minimalne testy regresji dla kluczowych przepływów.

---

# PLAN.md — Smackdown Tracker (hybrid rebuild)

## Cel
Odbudowa frontendu trackera AFK Journey Smackdown od zera, z zachowaniem działającego backendu (Supabase) i assetów.

## MVP scope (wersja 1)
- Draft tracker: TAK
- Statystyki + tier lista: NIE (później)
- Asystent (sugestie, ban lista, rotacja map): TAK
- Submit meczu (formularz + Turnstile): TAK

## Co zostaje (nie ruszamy)
- Supabase: baza, RPC (ss_get_stats, ss_get_config), Edge Function submit-match.
- Assety: portraits/, maps/, grafiki.
- Logika biznesowa jako referencja (Wilson interval, zasady draftu, format danych).

## Co piszemy od nowa
- Frontend: index.html + moduły JS (draft, assistant, submission) + jeden spójny CSS.
- Zero duplikatów: każda funkcja = jedna implementacja.
- Stack: Vanilla JS + ES modules, bez Vite/frameworka na start.

## Fazy
0. Fundament — nowy index.html, struktura folderów, podłączenie Supabase (read-only). [in progress]
1. Draft tracker — slots, hero pool, drag&drop, Phantimal.
2. Asystent — sugestie (portrety), ban lista, rotacja map.
3. Submit — formularz, Turnstile, wysyłka do Supabase.
4. Statystyki + tier lista — później (po MVP).
5. Polish — poprawki wizualne (Solise, VS, zakładki) — dopiero gdy fundament działa.

## Zasady pracy
- Jedna zmiana = jeden commit.
- Test po każdej zmianie (użytkownik potwierdza w przeglądarce).
- Izolowane pliki — nowe rzeczy jako osobne pliki, nie ruszamy istniejących na ślepo.
- Regresje naprawiamy osobno, jedna po drugiej.
- PLAN.md aktualizowany po każdym kroku (status, co zrobione, co dalej).

## Status
- [in progress] Faza 0: Fundament
- [ ] Faza 1: Draft tracker
- [ ] Faza 2: Asystent
- [ ] Faza 3: Submit
- [ ] Faza 4: Statystyki + tier lista (później)
- [ ] Faza 5: Polish

## Znane problemy (do naprawy w odpowiedniej fazie)
- Obrazek VS zniknął.
- Sugestie nadal dużymi kafelkami (do naprawy w Faza 2).
- Brakująca zakładka.
- Portret Solise ucięty.
- Duplikaty logiki (render() w tracker-app.js i 04-draft-assist-script-v1.js).
- Compact Record Match desktop refinement (PR #4): moved Hero ranking selector into the top layout bar; moved draft-order follow toggle into the map card; removed the map countdown text from the compact map card; combined Draft order known + Phantimal controls into one compact team metadata row; moved faction filters into the Find a hero panel. The Match Indicator & Result visibility behavior remains pending clarification from the user.

- Compact Record Match follow-up (PR #4): fixed team metadata relocation using the actual `label.check` and `#phantimalBLUE/#phantimalRED` elements; compressed Phantimal chips to keep them beside the draft-known checkbox; made the map + BLUE/RED draft row sticky while scrolling the catalog; removed the obsolete TOP-6 legend above the hero catalog and tightened the gap. No change to draft-order or statistics logic.

- Fixed compact layout navigation regression (PR #4): `#page-entry.record-layout-new.hidden` now explicitly uses `display:none!important`, so the sticky draft header is hidden with the Record Match page when switching to Tier List, Statistics, or other tabs. Root cause was the higher specificity of the new layout grid selector overriding the generic `.hidden` rule.

- PR #4: usunięto przełącznik `New Layout / Legacy`; kompaktowy układ jest teraz jedynym układem Record Match. Stary wybór zapisywany w localStorage jest ignorowany. Nie usuwano ani nie zmieniano logiki draftu, katalogu, submission ani danych Supabase.

- PR #4 latest: the map panel is hidden from the visible compact layout; draft-order toggle moved into the top utility bar beside Hero ranking; the live Draft Indicator now occupies the former map column beside BLUE/RED. The indicator recalculates on each draft change, including partial drafts, but is explicitly an experimental rule-based edge score, not a calibrated win probability. Historical data comes from `ss_get_stats`; no model training, Supabase schema, RPC, or stored match data changes.

- PR #4 latest layout correction: removed the map/rotation panel from Record Match and moved the current event map thumbnail + name into the brand header as non-interactive context; map changing controls are removed from this view. Draft-order toggle is relocated robustly to the top utility bar even if its module initializes later. Live Draft Edge is vertically centered in its column. Existing event map selection remains sourced from the configured current event theme; no Supabase changes.

- PR #4 follow-up: ranking controls and draft-order toggle are now both relocated via a page-level observer, so late initialization of either module cannot leave them outside the top toolbar. Match submissions are locked to `config.event.current_theme_id`; the current map thumbnail remains beside the SHOWDOWN SMACKDOWN title and is not clickable/changeable from Record Match.

- Preserved the hidden map-state DOM controls required by the existing core initializer while removing all visible map selection/rotation UI. Only the current event map thumbnail/name is exposed in the brand header.

- PR #4 visual refinement: move current-map badge closer to SHOWDOWN SMACKDOWN title; keep Hero ranking and Set draft order centered on one desktop toolbar row; remove inherited vertical spacing/height from the hero catalog so portraits sit directly beneath Find a hero and faction filters.

- PR #4 UI refinement: enlarged the current-map header thumbnail; increased Phantimal icons while keeping the compact single-row team metadata; rebuilt the expanded result-submission panel as a horizontal desktop layout. Fixed the empty 35/65 grid column left behind after Live Draft Edge moved into the sticky header. Mobile submission layout remains stacked for readability.
