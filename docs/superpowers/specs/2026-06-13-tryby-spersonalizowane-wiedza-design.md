# Tryby spersonalizowane (cz. II) + badge pochodzenia pytań — design

**Data:** 2026-06-13 · **Kontekst:** egzamin 2026-07-04 (~21 dni) · **Część II (wiedza), 827 pytań**

## Problem (feedback Eweliny, dwie warstwy)

1. **Zaufanie do treści:** „nie wiem, czy te pytania realnie przygotowują, skoro nikt nie zna pytań egzaminu". Fakt, którego appka dziś **nie pokazuje**: **263 z 827 pytań to prawdziwe pytania z egzaminów KSAP 2023–2025** (86/87/90); reszta (564) to pytania ćwiczeniowe w tym samym stylu i zakresie 6 dziedzin.
2. **Orientacja i poczucie postępu:** materiału jest dużo, sesje skaczą po wszystkim, brak mapy „gdzie stoję / jak mi idzie".

## Zakres — trzy elementy

### 1. Badge pochodzenia pytania — DLA WSZYSTKICH (nie za bramką)

- Przy każdym pytaniu części II pokazać badge pochodzenia. **Widoczny zawsze**, też przed odpowiedzią (to sygnał wiarygodności, nie podpowiedź).
- `origin` **już jest w bundlu** `web/questions-wiedza.js` (wszystkie 827) — zero zmian w danych.
- Mapowanie:
  - `origin` zaczyna się od `ksap-` → badge „✓ Pytanie z egzaminu KSAP {rok}" (zielony, autorytatywny).
  - `origin === 'generated'` → **brak badge** (nie pokazujemy „ćwiczeniowe", żeby nie deprecjonować — milczenie jest neutralne). *(Decyzja domyślna; do potwierdzenia w review.)*
- Dotyczy tylko części II (część I nie ma `origin`). Render: w `renderQuestion()` przy nagłówku pytania, gdy `isWiedza(q) && q.origin`.

### 2. Dwa tryby spersonalizowane — ZA BRAMKĄ (na razie tylko Ewelina)

Zasada nadrzędna: **nie dotykamy huba ani ekranu „Nowa sesja — Wiedza".** Tryby to nowe wejścia w menu, które **same składają i startują 15-pytaniową sesję** z filtrem, reużywając istniejący silnik. Sesje **liczą się do historii i statystyk** (zob. §4).

**Tryb A — „Mapa wiedzy"** (nowy ekran-dashboard) — *v1 = pełny zakres: per dziedzina + drill per temat (potwierdzone 2026-06-13):*
- 6 dziedzin, każda ze **skutecznością** (kolor: zielony ≥70% / bursztyn 40–69% / czerwony <40%) i **pokryciem** („poznane X / Y pytań"). To dwie osobne metryki.
- Drill w dziedzinę → lista tematów ze skutecznością per temat („brak danych", gdy 0 odpowiedzi).
- Z dziedziny: przycisk „Ćwicz tę dziedzinę (15 pytań)" → startuje sesję zawężoną do tej dziedziny.
- Dane: skuteczność/pokrycie liczone z `ksap_answer_log` (`group=domain`, `ok`, `qId`) + join `qId → topicId` z `QUESTIONS_WIEDZA` (log nie trzyma topicId — liczymy przy odczycie, bez migracji).

**Tryb B — „Tylko prawdziwe pytania KSAP (263)"** (wpis w menu, bez ekranu pośredniego):
- Startuje od razu 15-pytaniową sesję zawężoną do `origin !== 'generated'`.

Obie reużywają `composeWiedzaSession` (już wspiera filtr dziedzin/poziomu + LRS) — dokładamy filtr `origins`/`realOnly`.

### 3. Tryb admina — jeden spójny mechanizm (zamiast osobnych flag)

Konsolidacja: zamiast osobnych `?debug=1` + `ksap_feat_personalized`, **jedna flaga `ksap_admin=1`** (cookie, 10 lat — wzorzec jak `ksap_no_track`).

**Aktywacja:** wejście z `?admin=1` ustawia cookie `ksap_admin=1` (raz; potem działa bez parametru). Cookie ustawiamy w **najwcześniejszym inline-skrypcie** (tam gdzie obecny check `KSAP_NO_TRACK`, index.html ~L1148), żeby GA było wyłączone już na wizycie aktywującej.

**Gdy `ksap_admin=1`:**
- **Panel debug renderuje się automatycznie** (bez `?debug=1`), z możliwością zminimalizowania (panel już ma minimalizację).
- **GA4/GTM automatycznie wyłączone** — guard ładowania GTM sprawdza teraz `ksap_no_track=1` **lub** `ksap_admin=1`. Admin nie zaśmieca statystyk launchu.
- **Menu pokazuje tryby spersonalizowane** (Mapa wiedzy + Tylko prawdziwe pytania).

Panel dostaje przycisk **„Wyłącz tryb admina"** (czyści `ksap_admin`, reload). Ewelina dostaje link `egzamin.kutra.pl/?admin=1`, otwiera raz — od teraz na swoim urządzeniu jest adminem (panel + brak GA + tryby).

`ksap_no_track` zostaje jako **niezależny twardy kill-switch** (kompat z GDPR-spec). `?debug=1` zostaje jako alias pokazujący sam panel (wsteczna zgodność), ale **bez** wyłączania GA i bez trybów — pełny admin to dopiero `ksap_admin`.

## Architektura / punkty wpięcia (web/index.html, web/session-wiedza.js)

- **Nowa funkcja** `startPersonalizedSession(filter)`:
  - ustawia `state.part='II'`, `state.mode='nauka'` (z wyjaśnieniami), timer wg ustawień;
  - buduje sesję: `composeWiedzaSession(QUESTIONS_WIEDZA, filter, getLastSeenMap(), Math.random)` z `filter = { domains:[...] }` (Tryb A) lub `{ realOnly:true }` (Tryb B);
  - reużywa istniejącą ścieżkę startu (`state.session=…; currentIndex=0; answers=[]; showScreen('question'); renderQuestion()`).
- **`composeWiedzaSession`** (`web/session-wiedza.js`): dodać filtr `opts.realOnly` (i/lub `opts.origins`) — czysty, wstecznie zgodny dodatek; pokryć testem.
- **Ekran „Mapa wiedzy"**: nowy `<div id="screen-mapa" class="screen">` + render z danych logu. Skuteczność per-dziedzina już liczy `loadStats()` (widok „Część II") — wydzielić wspólny helper agregacji (`accuracyByDomain`, `accuracyByTopic`) zamiast duplikować.
- **Badge**: w `renderQuestion()`.
- **Tryb admina**: helper `isAdmin()` (czyta cookie `ksap_admin`). Wpięcia: (a) wczesny inline-skrypt ustawia cookie z `?admin=1` i rozszerza guard GTM o `|| isAdmin`; (b) `initDebugPanel()` renderuje panel gdy `isAdmin() || ?debug=1`, plus przycisk „Wyłącz tryb admina"; (c) render menu pokazuje wpisy trybów gdy `isAdmin()`.

## §4. Historia i statystyki — DECYZJA

Sesje z trybów spersonalizowanych **liczą się normalnie** do `ksap_sessions` i `ksap_answer_log` (przez istniejące `showSummary`/`appendAnswerLog`). Uzasadnienie: Mapa czyta skuteczność z tego samego logu — gdyby sesje się nie liczyły, drążenie słabej dziedziny nie aktualizowałoby mapy (utrata sensu). Liczenie = mapa samospójna + prostsza implementacja (zero osobnej ścieżki „bezpostępowej").

## Poza zakresem (YAGNI)

- Zmiany w hubie / ekranie „Nowa sesja — Wiedza" / części I.
- Dobór adaptacyjny automatyczny (osobna pozycja backlogu — tu user sam wybiera dziedzinę z mapy).
- Otwarcie trybów dla wszystkich (na razie tylko za bramką; decyzja po feedbacku Eweliny).
- Pełny egzamin próbny 90/90 (osobna pozycja).

## Testy / weryfikacja

- `composeWiedzaSession` z `realOnly` zwraca tylko `origin !== 'generated'`; bez flagi — zachowanie bez zmian (test jednostkowy).
- Agregaty skuteczności: join `qId→topicId` poprawnie grupuje; „brak danych" dla 0 odpowiedzi.
- Badge: pojawia się dla pytań `ksap-*`, brak dla `generated`; tylko część II.
- Tryb admina: `?admin=1` ustawia cookie i utrzymuje się między wizytami; gdy admin — panel widoczny automatycznie, GA4/GTM **nie** ładuje się (sprawdzić brak requestu do GTM), wpisy trybów widoczne w menu; bez admina — panel ukryty, GA działa, brak trybów; „Wyłącz tryb admina" czyści cookie.
- Ręcznie: sesja z trybu trafia do Historii i Statystyk (cz. II).
