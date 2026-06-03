# Naprawa pytań typu 8 (powiązania między figurami)

**Data:** 2026-06-03
**Status:** zatwierdzony projekt → do planu implementacji

## Kontekst

Zgłoszenie błędu (mail) dla pytania `h_t8_037`: „Taka zależność można wysnuć dopiero przy trzecim oknie." Analiza ujawniła **dwa nakładające się defekty** w pytaniach typu 8:

1. **Defekt strukturalny** — pola są niejednorodne: górny wiersz to pojedyncze figury, dolny wiersz to pary/trójki. Górny wiersz mapuje 1→1, lewa kolumna 1→para — te odwzorowania nie krzyżują się, więc reguły nie da się wydedukować przed dojściem do trzeciego okna; trzeba ją odgadnąć wstecz z jedynej pełnej kolumny. Dotyczy **41 pytań** (7 easy + 30 hard z parą, 4 hard z trójką).
2. **Defekt renderera** — [`renderFigure`](../../../web/index.html) rysuje tylko `square`; „wszystko inne jako koło", więc `shape: "triangle"` renderuje się jako **koło**. Trójkąt jest wizualnie nieodróżnialny od koła. Dotyczy **36 pytań** używających trójkątów.

Defekt strukturalny narusza własną [specyfikację](../../specyfikacja_pytan.md) typu 8: „Reguła transformacji musi być spójna wzdłuż wiersza i kolumny" oraz „3 figury + 1 puste pole".

## Cel

Wszystkie 80 pytań typu 8 mają być rozwiązywalne przez czystą dedukcję z reguły wiersza × kolumny, wizualnie poprawne, zgodne ze specyfikacją.

## Zakres

- Przepisać **wszystkie 80** pytań typu 8 (40 easy + 40 hard) do formatu czystej macierzy 2×2 z pojedynczą figurą w każdym polu (wariant 1).
- Naprawić renderer: dodać rysowanie trójkąta.
- Podbić wersję cache service workera (v3 → v4).
- **Nie ruszać** pozostałych 7 typów pytań.

## Decyzje (zatwierdzone)

| Decyzja | Wybór |
|---|---|
| Słownik kształtów | Naprawić renderer + 3 kształty (koło, trójkąt, kwadrat) |
| Zakres | Przepisać wszystkie 80 pytań typu 8 |
| Liczba opcji | Zachować jak w oryginale (per pytanie: 4 lub 5; obecnie 20+20 easy, 20+20 hard) |
| Sposób tworzenia | Generator deterministyczny (bez losowości) |
| Obrót jako reguła | Nie (na razie) |

## Model pytania

Czysta macierz 2×2, **jedna figura w każdym z 4 pól**:

```
TL (topLeft)   TR (topRight)
BL (bottomLeft)  BR (odpowiedź = brakujące pole)
```

Reguła wynika z przecięcia:
- **Reguła wiersza** (lewo→prawo): jedna z dwóch dymensji zmienia się o stały krok; ten sam krok w obu wierszach (TL→TR = BL→BR).
- **Reguła kolumny** (góra→dół): druga dymensja zmienia się o stały krok; ten sam krok w obu kolumnach (TL→BL = TR→BR).
- `BR = TL + krok_wiersza + krok_kolumny` — jednoznaczne (potwierdzalne dwiema ścieżkami: TR+krok_kolumny = BL+krok_wiersza).

**Cykle:**
- Kształt: `koło → trójkąt → kwadrat → koło` (indeksy 0,1,2; mod 3).
- Wypełnienie: `empty → solid → x → dot-center → empty` (indeksy 0,1,2,3; mod 4).

**Trudność** (zgodna z 33 działającymi pytaniami easy — wszystkie mają kształt wzdłuż wiersza, wypełnienie wzdłuż kolumny; nigdy jednej reguły, bo to dawałoby zdegenerowaną macierz z BL=TL):
- **easy** — **obie** reguły aktywne w orientacji kanonicznej (kształt zmienia się wzdłuż wiersza, wypełnienie wzdłuż kolumny), małe kroki (kształt 1–2, wypełnienie 1–2).
- **hard** — obie reguły aktywne, ale z utrudnieniami: zamiana orientacji (kształt wzdłuż kolumny, wypełnienie wzdłuż wiersza), większe kroki (kształt 2, wypełnienie 2–3) i subtelniejsze wypełnienia (`x`, `dot-center`), które trudniej odróżnić wzrokowo.

Obie dymensje są zawsze aktywne, więc żadne pole nie duplikuje innego — macierz nie jest zdegenerowana.

## Format danych

Zgodny z działającymi pytaniami `e_t8` — bez zmian w strukturze rendererów:

```js
{
  id: "<zachowane>",            // np. h_t8_037
  typeId: 8,
  level: "easy" | "hard",       // zachowane
  instruction: "<zachowane>",
  grid: {
    topLeft:  { shape, fill },        // obiekt
    topRight: { shape, fill },        // obiekt
    bottomLeft: [ { shape, fill } ]   // 1-elementowa tablica
  },
  options: [ [ { shape, fill } ], ... ],  // każda opcja = 1-elementowa tablica; liczba = jak w oryginale
  correct: <index>,
  explanation: "<auto-generowany>"
}
```

Regenerujemy: `grid`, `options`, `correct`, `explanation`. Zachowujemy: `id`, `typeId`, `level`, `instruction`, liczbę opcji per pytanie, podział 40+40.

## Generator (deterministyczny)

Skrypt Node generujący 80 pytań przez systematyczne rozłożenie po przestrzeni parametrów (bez `Math.random`):

**Parametry per pytanie:**
- figura startowa `TL` = (kształt₀, wypełnienie₀) — 12 możliwości,
- oś reguły kształtu ∈ {wiersz, kolumna}; oś wypełnienia = druga,
- krok kształtu ∈ {1, 2} (mod 3); krok wypełnienia ∈ {1, 2, 3} (mod 4),
- **easy:** orientacja kanoniczna (kształt = wiersz, wypełnienie = kolumna), obie dymensje aktywne, małe kroki (kształt 1–2, wypełnienie 1–2),
- **hard:** orientacja dowolna (w tym zamieniona), większe kroki, pełny zakres wypełnień.

**Anty-powtarzalność:** żadne dwa pytania nie dostają tej samej krotki (start, orientacja, kroki); limit powtórzeń tej samej figury startowej. Przestrzeń: easy = 12 figur startowych × krok kształtu {1,2} × krok wypełnienia {1,2} = 48 konfiguracji (40 z zapasem); hard znacznie większa (orientacja × większe kroki × pełne wypełnienia).

**Obliczanie pól:** dla pola (i=wiersz∈{0,1}, j=kolumna∈{0,1}):
- `shape = shape₀ + (oś_kształtu==wiersz ? j : i) * krok_kształtu  (mod 3)`
- `fill  = fill₀  + (oś_wypełnienia==wiersz ? j : i) * krok_wypełnienia (mod 4)`
- `BR = pole(1,1)` = poprawna odpowiedź.

**Dystraktory** (wg specyfikacji typu 8) — generowane przez perturbację, do wymaganej liczby opcji, wszystkie unikalne, dokładnie jeden = `BR`:
- zastosowanie tylko reguły kształtu (wypełnienie = wypełnienie₀),
- zastosowanie tylko reguły wypełnienia (kształt = kształt₀),
- odwrócenie kroku wypełnienia (poprawny kształt, błędny kierunek wypełnienia),
- niezmienione widoczne pole (kopia `BL` lub `TR`),
- (rezerwowe) błędny krok kształtu — gdy potrzeba więcej opcji.

`correct` = pozycja `BR` wśród opcji; pozycja rozkładana deterministycznie między pytaniami (nie zawsze A).

**Explanation** — szablon PL w istniejącym stylu, np.:
> „Reguła wierszy: kształt zmienia się [koło→trójkąt]. Reguła kolumn: wypełnienie zmienia się [puste→pełne]. Brakujące pole: trójkąt pełny. Opcja B — poprawna."

Nazwy PL: koło / trójkąt / kwadrat; wypełnienia: puste (empty) / pełne (solid) / przekreślone (x) / z kropką (dot-center).

## Zmiana renderera

[`renderFigure`](../../../web/index.html) — dodać gałąź dla trójkąta (jak `fixedRenderFigure` w pliku diagnostycznym `bug-reports/podglad-bledu-h_t8_037.html`):
- kształt: `<polygon points="40,10 70,68 10,68" .../>`,
- `fill: "x"`: krzyżyk przy centroidzie,
- `fill: "dot-center"`: kropka przesunięta do centroidu (cy≈52).

Pozostałe kształty i wypełnienia bez zmian.

## Service worker

[`web/sw.js`](../../../web/sw.js) — strategia cache-first, działa w każdej sesji przeglądarki (nie tylko PWA). Podbić `CACHE = 'ksap-v3'` → `'ksap-v4'`, inaczej użytkownicy serwują stare pliki z cache w nieskończoność. Bump cache **nie** rusza localStorage/IndexedDB (postęp użytkownika bezpieczny).

## Walidacja

Osobny skrypt walidacyjny uruchamiany na finalnym `questions-unified.js`, sprawdza dla wszystkich 80 pytań typu 8:

1. każde pole `grid` = pojedyncza figura (tablice `bottomLeft`/opcje mają długość 1),
2. `shape ∈ {circle, triangle, square}`, `fill ∈ {empty, solid, x, dot-center}`,
3. niezależne odtworzenie reguły wiersza i kolumny z TL/TR/BL → przecięcie daje **dokładnie jedną** pasującą opcję, równą `options[correct]`,
4. `correct` w zakresie, wszystkie opcje unikalne, liczba opcji = oryginalna,
5. ID i liczba pytań (40 easy + 40 hard) zachowane.
6. **Wizualny smoke-test:** kilka pytań renderowanych w `bug-reports/podglad-bledu-h_t8_037.html` (lub analogicznym).

## Pliki

- `web/questions-unified.js` — bloki typu 8 (regeneracja 80 pytań).
- `web/index.html` — `renderFigure` (trójkąt).
- `web/sw.js` — bump wersji cache.
- skrypt generatora + skrypt walidacyjny (lokalizacja do ustalenia w planie; jednorazowe narzędzia).
- `bug-reports/podglad-bledu-h_t8_037.html` — istniejący plik diagnostyczny (referencja renderera).

## Poza zakresem (YAGNI)

- Obrót/rozmiar/liczność jako reguły.
- Zmiana liczby opcji.
- Pozostałe typy pytań (1–7).
- Strona QA do podglądu pytań (osobny task w BACKLOG.md).

## Uwaga proceduralna

Zgodnie z CLAUDE.md i pamięcią użytkownika: **bez commitów i pushy bez wyraźnej prośby** — dotyczy też tego dokumentu i całej implementacji.
