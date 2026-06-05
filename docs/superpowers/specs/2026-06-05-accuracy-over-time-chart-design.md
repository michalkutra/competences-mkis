# Wykres skuteczności w czasie — design

**Data:** 2026-06-05
**Status:** zaprojektowane (do rozpisania planu)

## Cel

Na ekranie statystyk pokazać, jak zmienia się skuteczność użytkownika **sesja po sesji** — realny progres w czasie. Dziś statystyki pokazują tylko stan zagregowany (ogólna skuteczność + rozbicie per typ), bez wymiaru czasowego. Trend „idę w górę" to silny motywator i powód, by wracać do nauki przed egzaminem.

## Zakres

Jedna nowa sekcja na ekranie statystyk: wykres liniowy ogólnej skuteczności w funkcji numeru sesji, z linią surową i linią trendu (średnia krocząca) oraz przełącznikiem trybu.

### Poza zakresem (YAGNI)
- Trendy per typ pytania (zbyt szumne przy 15 pytaniach/sesję).
- Daty na osi X.
- Tooltipy / hover (obecny `renderLineChart` ich nie ma; nie dokładamy).
- Jakiekolwiek zmiany w modelu danych, backend, biblioteki zewnętrzne.

## Źródło danych

`getSessions()` → localStorage `ksap_sessions` (już istnieje, ostatnie 50 sesji). **Bez zmian w modelu danych.**

Każda sesja ma:
- `date` (ISO string) — do sortowania rosnąco,
- `mode` (`"learning"` | `"exam"`) — do filtra trybu,
- `score` (liczba poprawnych), `total` (15) — skuteczność = `Math.round(score / total * 100)`.

## Zachowanie

### Filtr trybu
Przełącznik nad wykresem: **Wszystko / Nauka / Egzamin**. Filtruje listę sesji przed numeracją. Zmiana filtra przelicza i przerysowuje wykres. Domyślnie „Wszystko".

### Przygotowanie danych
1. Pobierz sesje, posortuj rosnąco po `date`.
2. Odfiltruj wg wybranego trybu (`learning`/`exam`; „Wszystko" = bez filtra).
3. Ponumeruj 1…N po przefiltrowaniu (oś X = numer sesji w tym widoku).
4. Seria surowa: `accuracy[i] = round(score/total*100)`.
5. Seria trendu (średnia krocząca, trailing): dla punktu `i` średnia z ostatnich `min(5, i+1)` punktów surowych. Rysowana **tylko od 3. punktu** (indeks ≥ 2); wcześniejsze wartości pomijane.

### Dwie serie (legenda)
- **Skuteczność** — surowe punkty per sesja, kolor jaśniejszy/cieńszy (rola: szczegół).
- **Trend** — średnia krocząca, kolor wyraźniejszy/grubszy (rola: kierunek).

### Stany brzegowe
- **0 sesji** w wybranym filtrze → komunikat „Brak sesji w tym trybie" zamiast wykresu.
- **1–2 sesje** → tylko seria surowa (punkty), bez linii trendu.
- **≥3 sesje** → obie serie.

## Zmiany w kodzie

### `renderLineChart()` (web/index.html:2137) — lekkie rozszerzenie
Funkcja już obsługuje wiele serii (`chart.datasets`), ale przy ~50 punktach trzy rzeczy psują czytelność. Dodajemy opcjonalny drugi parametr `opts` (wzorem `renderBarChart`), z domyślnymi wartościami = **obecne zachowanie**, żeby użycie w typie 7 (wykres analizy danych) pozostało nietknięte.

`opts`:
- `fixedMax` (number, domyślnie brak) — gdy podany, oś Y skalowana do `fixedMax` zamiast `maxVal*1.15`. Dla skuteczności = `100`.
- `xLabelEvery` (number, domyślnie `1`) — rysuj etykietę osi X co `n`-ty punkt (pierwszy i ostatni zawsze). Przy 50 sesjach np. co 5.
- `showValueLabels` (bool, domyślnie `true`) — gdy `false`, nie rysuj etykiet wartości nad punktami (przy 50 punktach to kasza).
- `pointRadius` (number, domyślnie `5`) — mniejszy promień przy gęstych danych.

Dodatkowo **obsługa `null` w `data`** (potrzebna do wyrównania trendu): wartość `null` oznacza brak punktu. W polyline `null` przerywa linię (segment rysowany tylko między kolejnymi nie-`null`), a punkt/etykieta nie są rysowane. Obecne użycia podają komplet liczb, więc to zmiana wstecznie zgodna.

Dla nowego wykresu wywołanie: `fixedMax: 100`, `xLabelEvery` zależne od N, `showValueLabels: false`, `pointRadius: 3`.

**Wyrównanie osi X (jednoznacznie):** obie serie to tablice **pełnej długości N**, indeksowane tym samym numerem sesji. Seria trendu ma `null` na indeksach 0 i 1 (gdy <3 sesje — cała seria `null`), wartości od indeksu 2. Dzięki temu `xPos(i)` w `renderLineChart` zawsze odwzorowuje ten sam numer sesji dla obu serii — żadnego przesunięcia.

### Ekran statystyk (`loadStats()`, web/index.html:2735) — nowa sekcja
- Renderuj sekcję „Skuteczność w czasie" **nad** istniejącym rozbiciem per typ.
- Przełącznik trybu (3 przyciski/segment) + kontener na wykres.
- Logika przygotowania danych + obsługa stanów brzegowych (0 / 1–2 / ≥3 sesje).
- Wykres przez rozszerzony `renderLineChart(chart, opts)`.

## Testowanie / weryfikacja
Aplikacja jest vanilla JS w pojedynczym `index.html`, bez frameworka i bez testów jednostkowych. Weryfikacja manualna w przeglądarce:
- 0 sesji w trybie → komunikat.
- 1–2 sesje → same punkty surowe.
- ≥3 sesje → surowa linia + trend.
- Przełączanie Wszystko/Nauka/Egzamin przelicza poprawnie.
- Wiele sesji (np. 30–50) → oś X nie tłoczy się (rzadkie etykiety), brak etykiet wartości.
- Typ 7 (istniejący wykres) renderuje się jak dotąd (regresja `renderLineChart`).
