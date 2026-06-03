# Design: CSAT z komentarzem + wall testimoniali

**Data:** 2026-06-03
**Źródło:** BACKLOG.md — „NPS / CSAT (Tally)" (#7, MUST). Cel launchu: zrozumieć *co myślą* użytkownicy (liczby + kontekst) oraz zbudować social proof na przyszłość.
**Status zakresu:** spec do BACKLOG — **nie implementujemy w tej iteracji**. Po akceptacji powstaje plan, a wpis w BACKLOG.md dostaje link do speca i planu.

## Problem

Appka rusza dla ~700 osób zdających KSAP. Brakuje:
1. **Pomiaru satysfakcji** — czy appka pomaga, co się podoba, co nie (dziś tylko zdarzenia GA o ukończeniu sesji, zero głosu użytkownika).
2. **Social proof** — wall na zerze kaw/recenzji szkodzi (negatywny social proof). Najpierw trzeba *zebrać* pozytywne komentarze, dopiero potem je pokazać.

Cel projektu jest podwójny i równorzędny: **mierzyć satysfakcję** (CSAT 1–5 + komentarz) **oraz wyławiać najlepsze komentarze na testimoniale**.

## Ograniczenia

- **Zero backendu** — appka to statyczny `web/index.html` na Netlify (domena `egzamin.kutra.pl`), PWA, dane w localStorage. Żeby pokazać komentarze *innych* użytkowników, dane muszą trafić do centralnego miejsca, którego appka sama nie hostuje.
- Istniejące wzorce do reużycia: `kofiWidget()` ([web/index.html](../../../web/index.html) ~L2387) — warunkowy widget na summary/stats; GA event `donation_clicked` (parametr `source`); menu hamburger (~L1002).

## Rozwiązanie — dwie części

### Część A — Zbieranie CSAT (Tally)

Formularz **Tally.so** (darmowy, łatwy embed, odpowiedzi w dashboardzie). Wybrany zamiast Senja/Testimonial.to, bo daje pełną kontrolę nad danymi i nad wyglądem walla (potrzebne do efektu na Home, patrz Część B) — gotowy embed walla z Senja byłby trudny do zintegrowania z tym efektem.

**Pola formularza:**
- **Ocena 1–5** (gwiazdki / emoji) — wymagane.
- **Komentarz** — opcjonalny, tekst.
- **Imię** — opcjonalne (do podpisu testimonialu).
- **Zgoda na publikację** — checkbox: „Zgadzam się na publikację mojego komentarza (z imieniem) na stronie". Tylko odpowiedzi z zaznaczoną zgodą trafiają na wall (RODO).

**Osadzenie:** Tally jako popup/modal lub link wywoływany z appki (snippet JS Tally albo prosty link do formularza). Wybór popup vs link — do rozstrzygnięcia w planie (popup = mniejszy friction, link = zero dodatkowego skryptu).

**Triggery (kiedy prosić):**
- **Summary:** prompt CSAT pojawia się na ekranie podsumowania po **2. ukończonej sesji** (próg do dostrojenia w planie). Wzorzec jak `kofiWidget()` — warunkowy blok na summary.
- **Menu (hamburger):** stały link „Oceń appkę" — zawsze dostępny, niezależnie od progu i flag.

**Anty-spam (localStorage):**
- `ksap_csat_shown` — czy prompt na summary był już pokazany.
- `ksap_csat_done` — czy użytkownik wypełnił (klik w CTA traktujemy jako „done", bo nie mamy callbacku z Tally bez integracji).
- Po `shown`/`done` prompt na summary się nie powtarza; link w menu zostaje.

**Analityka:** GA event `feedback_submitted` z parametrem `source` (`summary` / `menu`), wzorowany na `donation_clicked`. Pushowany przy kliknięciu CTA otwierającego formularz.

### Część B — Wall testimoniali

**Flow danych (ręczna kuracja):**
1. Przeglądasz odpowiedzi w dashboardzie Tally.
2. Wybierasz najlepsze — tylko te z zaznaczoną zgodą na publikację.
3. Wklejasz do nowego pliku **`web/testimonials.js`** w repo.
4. Deploy (Netlify) = aktualizacja walla. Zero backendu, pełna kontrola jakości, RODO-friendly.

**Schema wpisu** (`web/testimonials.js`):
```js
const TESTIMONIALS = [
  { rating: 5, text: "Świetna powtórka przed egzaminem!", name: "Anna", date: "2026-06" },
  // ...
];
```
Pola: `rating` (1–5), `text` (komentarz), `name` (imię lub puste), `date` (`YYYY-MM`). Bez nazwiska, maila ani innych danych osobowych.

**Wyświetlanie — dwa miejsca:**

**B1. About** ([web/index.html](../../../web/index.html), ekran `#screen-about`)
Prosta sekcja „Co mówią inni" — karty/lista testimoniali (tekst, gwiazdki, imię) obok istniejącego Ko‑fi. Naturalne miejsce: zaufanie + zachęta do wsparcia w jednym.

**B2. Home** ([web/index.html](../../../web/index.html), ekran `#screen-home`) — efekt sticky-reveal
Asset tła: **`web/bg.png`** (już w repo — ilustracja trójki postaci na białym/przezroczystym tle; nie full-bleed foto, więc efekt zaadaptowany do ilustracji).

Mechanika efektu:
- Obrazek `web/bg.png` jako warstwa tła sekcji Home, **`position: sticky`** (lub fixed w kontenerze) — pozostaje widoczny u góry podczas scrollowania pod countdownem do egzaminu.
- **Maska gradientowa** u dolnej krawędzi obrazka — płynne zanikanie do koloru tła strony (zamiast twardej krawędzi), żeby ilustracja na białym/przezroczystym tle ładnie się łączyła z treścią.
- Testimoniale leżą w warstwie **pod** obrazkiem i przy scrollu **wyłaniają się „spod" niego** — smooth reveal (np. `opacity` + `translateY` sterowane pozycją scrolla / `IntersectionObserver`; do rozstrzygnięcia w planie: CSS-only scroll-driven animations vs JS).
- Efekt czysto wizualny i progresywny — gdy brak wsparcia dla scroll-effektów, testimoniale po prostu pokazują się jako zwykła sekcja (graceful degradation).

**Współdzielenie renderu:** wall na About i Home czyta z tego samego `TESTIMONIALS`; jedna funkcja renderująca kartę testimonialu, dwa kontenery (różny layout/efekt). Bez duplikacji danych.

**Stan pusty:** dopóki `TESTIMONIALS` jest puste (brak zebranych zgód), wall się **nie renderuje** w żadnym z miejsc — świadomie, by uniknąć negatywnego social proofu. To dopuszczalny stan startowy: Część A zbiera dane, wall zapala się dopiero gdy są wpisy.

## Prywatność (RODO)

- Publikujemy **wyłącznie** komentarze z wyraźną zgodą zaznaczoną w formularzu.
- Na wallu tylko **imię** (lub anonimowo) — bez nazwiska, maila, innych danych.
- Tally jako procesor danych; zgoda zbierana w formularzu. Rozważyć krótką notę/link do informacji o przetwarzaniu przy checkboxie zgody.

## Dekompozycja i kolejność

Plan implementacji (osobny krok, po akceptacji speca) rozbije na fazy:

1. **Faza 1 — Część A (zbieranie).** Formularz Tally + trigger na summary (próg 2 sesje) + link w menu + flagi localStorage + GA `feedback_submitted`. Samodzielna wartość: zaczynamy mierzyć i zbierać.
2. **Faza 2 — Część B (wall).** `web/testimonials.js` + funkcja renderująca + sekcja na About + efekt sticky-reveal na Home. Zapala się dopiero gdy są zebrane wpisy z Fazy 1.

## Weryfikacja

Brak setupu testowego (aplikacja to pojedynczy `web/index.html`). Proponowana weryfikacja:
- **Tally:** ręczny test wysłania formularza → odpowiedź widoczna w dashboardzie; sprawdzenie pola zgody.
- **Triggery:** ręczny test progu (po 2. sesji prompt jest, wcześniej go nie ma; po wypełnieniu/pokazaniu znika; link w menu zawsze działa) + flagi w localStorage.
- **GA:** `feedback_submitted` z poprawnym `source` widoczny w DebugView.
- **Wall:** render z przykładowym `TESTIMONIALS`, stan pusty (nic się nie renderuje), efekt sticky-reveal na Home (ręcznie, mobile + desktop) i prosta sekcja na About.

## Poza zakresem (świadomie)

- **Licznik kaw / Ko‑fi count** — osobna iteracja później; kawy na zerze szkodzą social proofowi. Dołączymy gdy będzie co pokazać.
- **Automatyczny fetch z Tally API** — wymagałby klucza/proxy (de facto backend); ręczna kuracja wystarcza przy tej skali.
- **Senja / Testimonial.to embed** — odrzucone na rzecz pełnej kontroli nad danymi i wyglądem.
