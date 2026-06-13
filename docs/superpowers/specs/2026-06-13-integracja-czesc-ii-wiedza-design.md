# Spec: integracja części II (sprawdzian wiedzy) z aplikacją

> **Status:** zatwierdzony design (brainstorming 2026-06-13). Następny krok: plan implementacji (writing-plans).
> **Źródła:** [handoff](../2026-06-13-handoff-integracja-pytan-wiedza.md), pula `data/wiedza/output/questions-wiedza.json` (827 pytań), mockup Wariant A (`web/mockups/`, branch `mockup-nawigacja-czesc-ii`, PR #2).

## 1. Cel

Wpiąć 827 pytań części II („sprawdzian wiedzy", 6 dziedzin) w istniejącą aplikację jako **osobną część egzaminu** obok istniejącej części I („sprawdzian umiejętności", 8 typów). Maksymalnie reużyć istniejące mechanizmy (sesja, renderer opcji, historia, statystyki, GA4, PWA), bez mieszania blueprintu części I z częścią II.

## 2. Decyzje produktowe (zatwierdzone)

| Decyzja | Wybór |
|---|---|
| Nawigacja | **Wariant A** — home jako hub dwóch części; osobny setup per część |
| Rozmiar sesji cz. II | **15 pytań** (jak cz. I); bez selektora liczby pytań |
| Tryby cz. II | **Nauka + Egzamin** (mechanicznie jak cz. I); pełny egzamin 90/90 poza zakresem |
| Filtry cz. II | Dziedziny (multi-select, puste = wszystkie) + Poziom (Wszystkie/Łatwe/Średnie/Trudne) |
| Historia/Statystyki | **Wspólny ekran**, filtr części domyślnie = kontekst, z przełącznikiem I / II / Wszystko |

## 3. Nazewnictwo (generyczne)

- App-level (home h1): **„Egzamin na urzędnika mianowanego"** (generalizacja z dotychczasowego „Sprawdzian Umiejętności").
- Część I: **„Sprawdzian umiejętności"** (test predyspozycji, 8 typów).
- Część II: **„Sprawdzian wiedzy"** (6 dziedzin).
- Wewnętrzny identyfikator części: `part ∈ {'I','II'}`.

## 4. Dane i ładowanie

### 4.1 Format pliku
Nowy `web/questions-wiedza.js` eksponujący global:
```js
window.QUESTIONS_WIEDZA = [ { id, domain, topicId, level, instruction, question, options:[4], correct:0-3, explanation, source, origin, legalState }, … ]; // 827
```
Ładowany przez `<script src="questions-wiedza.js">` w `index.html` (przed main script), spójnie z `questions-unified.js`. Działa offline przez service worker. **Nie** używamy `fetch()`.

### 4.2 Build
Mały skrypt `tools/wiedza/build-web.js`: czyta `data/wiedza/output/questions-wiedza.json` (płaska tablica), opakowuje w `window.QUESTIONS_WIEDZA = …;` → zapisuje `web/questions-wiedza.js`. Idempotentny, uruchamiany ręcznie przy aktualizacji puli. Rozwiązuje też blocker `.gitignore` na `data/` (plik produkcyjny ląduje w śledzonym `web/`).

### 4.3 Walidacja
Istniejący `tools/wiedza/validate.js` (schemat, 4 opcje + prefiksy, `correct` 0–3, `topicId` w taksonomii, unikalność id, duplikaty treści) — bez zmian. Build odpala walidator przed zapisem (fail-fast).

## 5. Nawigacja i ekrany

### 5.1 Home = hub
`#screen-home` przebudowany: h1 app-level + dwa kafelki części (`.part-card`) zamiast pojedynczego „Nowa sesja". Każdy kafelek: eyebrow (Część I/II), tytuł, krótki opis, meta (liczby). Pod spodem bez zmian: Historia, Statystyki, social-proof, countdown.

### 5.2 Setup per część
- **Część I** — `#screen-setup` bez zmian (Tryb Nauka/Egzamin, Poziom Łatwy/Trudny = selektor banku, licznik).
- **Część II** — nowy stan setupu (ten sam ekran lub odrębny `#screen-setup-wiedza`):
  - Tryb: Nauka / Egzamin (toggle, jak cz. I).
  - Dziedziny: chipy multi-select (pr/se/ap/fp/pz/oz z licznikami), puste = wszystkie.
  - Poziom: Wszystkie / Łatwe / Średnie / Trudne — **filtr** (nie selektor banku; wszystkie 827 to jedna pula z polem `level`).
  - Licznik czasu (60 s/pytanie) — opcjonalny, jak cz. I.

### 5.3 Routing
Rozszerzyć `SCREEN_PATHS` o ścieżki części II (np. `/wiedza/setup`). Stan sesji niesie `part`. Ekrany transient (question/summary) jak dziś — `replaceState`.

## 6. Dobór sesji części II

Nowa czysta funkcja (np. `composeWiedzaSession(pool, filters, lastSeen, rng)` w `session-blueprint.js` lub nowym `web/session-wiedza.js`):
1. Filtr puli wg wybranych dziedzin (puste = wszystkie) i poziomu (Wszystkie = bez filtra).
2. Sort `sortLRS` (reuse — least-recently-seen + shuffle) na przefiltrowanej puli.
3. Weź 15 pierwszych.

Rozkład dziedzin wychodzi proporcjonalnie do wielkości (prze)filtrowanej puli — bez sztywnego blueprintu typów (cz. II nie ma struktury slotów). Anti-repeat działa tak samo jak w cz. I (mapa `lastSeen` z logu odpowiedzi).

## 7. Renderowanie części II

Pytania jednorodne (stem + 4 opcje). Dispatch renderera po `part` (nie po `typeId`):
- Część I → istniejący `renderQuestionBody` (`switch typeId 1–8`).
- Część II → nowy `renderWiedzaBody(q)`: instrukcja + `question` (stem) + opcje przez istniejącą mechanikę `.option`.
- Review (Nauka po odpowiedzi / podsumowanie / szczegóły sesji): zaznaczona poprawna (`correct`), `explanation` **i `source`** (nowość względem cz. I). Reuse `renderOptionsStatic`.
- Etykiety poziomu obsługują 3 wartości (`easy`/`medium`/`hard`).

## 8. Persystencja, historia, statystyki (reuse)

### 8.1 Rozszerzenie logu odpowiedzi
Wpis `ksap_answer_log` rozszerzony generycznie:
```js
{ sid, qId, ok, ts, part: 'I'|'II', group }   // group: cz. I = typeId (number), cz. II = domain (string)
```
- Wstecz: stare wpisy bez `part` → traktowane jako `'I'`, `group` = istniejące `tid`. (Zachowujemy `tid` dla cz. I dla pełnej kompatybilności; `group` to uogólniona oś.)
- `ksap_sessions`: każda sesja dostaje `part`; pozycje pytań niosą `qId` + (cz. I) `typeId` / (cz. II) `domain`.

### 8.2 Statystyki — wspólny ekran z filtrem
- Przełącznik u góry: Część I / Część II / Wszystko. Domyślnie = kontekst wejścia.
- Część I: wykres per-typ (8) — jak dziś. Część II: wykres per-**dziedzina** (6) — reuse `renderBarChart`, oś = `group`. „Wszystko": sekcje lub łączny widok skuteczności.
- Skuteczność = agregacja `ok` po `group` w obrębie wybranej części.

### 8.3 Historia — wspólny ekran z filtrem
- Lista sesji z oznaczeniem części (badge I/II). Filtr części u góry (domyślnie kontekst).
- Szczegóły sesji renderują pytania właściwym rendererem na podstawie `part`.

## 9. GA4

- Nowy wymiar `exam_part` (`'I'`/`'II'`) dodany do `session_started`, `question_answered`, `session_completed`, `session_aborted`.
- Część II: `question_answered` niesie `question_domain` (= `domain`) i `question_level` (3 poziomy). `question_type` pozostaje dla cz. I.

## 10. Service worker / PWA / manifest

- `web/sw.js`: dodać `'./questions-wiedza.js'` do `ASSETS`, bump `CACHE` `ksap-v8` → `ksap-v9`.
- `manifest.json` / sekcja „O aplikacji": rozszerzyć opis o część II (6 dziedzin) obok 8 typów cz. I.
- `initQuestionCount` na home: uwzględnić 827 pytań cz. II (lub osobne liczniki per kafelek).

## 11. Poza zakresem (YAGNI)

- Pełny egzamin 90 pytań / 90 min (ewentualnie później).
- Selektor liczby pytań (trzymamy 15).
- Adaptacyjny dobór wg słabości dla cz. II (osobny backlog).
- Odświeżanie treści wrażliwych czasowo (osobny proces przed cyklem 2027 — zob. handoff §5).

## 12. Ryzyka / pułapki

- **Kompatybilność wsteczna logu** — istniejące wpisy bez `part`/`group`; mapowanie musi je czytać jako cz. I bez utraty statystyk.
- **3 poziomy w cz. II** vs 2 w cz. I — etykiety/filtry/statystyki muszą obsłużyć `medium`.
- **Rozmiar `index.html`** (już ~140 KB) — renderer i setup cz. II rozważyć w osobnym pliku (`web/*.js`), żeby nie puchł dalej.
- **Cache bump** — bez bumpu `ksap-v*` PWA nie pobierze nowego pliku pytań.
- **`source` w review** — nowe pole; upewnić się, że renderer cz. I go nie wymaga.
