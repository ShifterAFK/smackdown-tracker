# Aktualny stan projektu — 2026-11-21

Ta sekcja zastępuje nieaktualne statusy faz opisane niżej. Starszy plan MVP pozostaje jako kontekst historyczny.

## Aktywny stan
- Record Match ma przełączalne układy `New Layout` i `Legacy`. `Legacy` pozostaje domyślny. Nowy układ kompaktowy pokazuje małą mapę obok BLUE/RED (sloty poziomo), katalog na pełną szerokość, a Match Indicator i formularz wyniku w zwijanym drugim rzędzie (35/65). Rząd rozwija się automatycznie po szóstym picku, można go też rozwinąć ręcznie; po udanym wysłaniu ponownie się zwija. Wybór układu jest zapamiętywany lokalnie; logika draftu i zapisu pozostaje wspólna. Poprawiono konflikt ze starszą desktopową siatką 410px + katalog: w New Layout wymuszono jedną kolumnę pełnej szerokości i zachowano nazwane obszary siatki. Wcześniejsza korekta paska Hero ranking pozostaje.
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
