# PLAN.md — Smackdown Tracker (hybrid rebuild)

## Cel
Odbudowa frontendu trackera AFK Journey Smackdown od zera, z zachowaniem działającego backendu (Supabase) i assetów.

## Co zostaje (nie ruszamy)
- Supabase: baza, RPC (ss_get_stats, ss_get_config), Edge Function submit-match.
- Assety: portraits/, maps/, grafiki.
- Logika biznesowa jako referencja (Wilson interval, zasady draftu, format danych).

## Co piszemy od nowa
- Frontend: index.html + moduły JS (draft, stats, assistant, submission) + jeden spójny CSS.
- Zero duplikatów: każda funkcja = jedna implementacja.
- Stack: Vanilla JS + ES modules, bez Vite/frameworka na start.

## Fazy
0. Fundament — nowy index.html, struktura folderów, podłączenie Supabase (read-only).
1. Draft tracker — slots, hero pool, drag&drop, Phantimal.
2. Statystyki + tier lista — tabela, filtry, paginacja.
3. Asystent — sugestie (portrety), ban lista, rotacja map.
4. Submit — formularz, Turnstile, wysyłka do Supabase.
5. Polish — poprawki wizualne (Solise, VS, zakładki) — dopiero gdy fundament działa.

## Zasady pracy
- Jedna zmiana = jeden commit.
- Test po każdej zmianie (użytkownik potwierdza w przeglądarce).
- Izolowane pliki — nowe rzeczy jako osobne pliki, nie ruszamy istniejących na ślepo.
- Regresje naprawiamy osobno, jedna po drugiej.
- PLAN.md aktualizowany po każdym kroku (status, co zrobione, co dalej).

## Status
- [ ] Faza 0: Fundament
- [ ] Faza 1: Draft tracker
- [ ] Faza 2: Statystyki + tier lista
- [ ] Faza 3: Asystent
- [ ] Faza 4: Submit
- [ ] Faza 5: Polish

## Znane problemy (do naprawy w odpowiedniej fazie)
- Obrazek VS zniknął.
- Sugestie nadal dużymi kafelkami (do naprawy w Faza 3).
- Brakująca zakładka.
- Portret Solise ucięty.
- Duplikaty logiki (render() w tracker-app.js i 04-draft-assist-script-v1.js).