# Wariant 2 — pytania typu 8 wielofigurowe z gradientem trudności i obrotem

**Data:** 2026-06-03
**Status:** zatwierdzony projekt → do planu implementacji

## Kontekst i cel

Wariant 1 naprawił błąd ze zgłoszenia `h_t8_037`, ale pytania hard stały się mało wymagające. Wariant 2 podnosi trudność hard, **zachowując jednoznaczną rozwiązywalność** (rdzeń naprawy z wariantu 1). Bank **easy zostaje bez zmian**.

Cel: 40 pytań hard typu 8 z **wewnętrznym gradientem 3 tierów** złożoności, w tym kilka pytań z **regułą obrotu** — wszystkie rozwiązywalne wprost z reguły wiersza × kolumny.

## Decyzje (zatwierdzone)

| Decyzja | Wybór |
|---|---|
| „Trzeci poziom" | Wewnętrzny gradient w hard (3 tiery), bez zmian UI; tylko typ 8 |
| Figury w komórce | Mix: pary (T2) i trójki (T3); T1 pozostaje 1 figurą |
| Obroty | ~6–8 pytań, tylko najtrudniejszy tier (T3); trójkąt (4 orientacje) + kwadrat→romb (45°) |
| Model | „każda pozycja w komórce = niezależna podmacierz 2×2" |
| Bank easy | Bez zmian (single-figure z wariantu 1) |

## Model

Komórki **jednorodne** — ta sama liczba figur N we wszystkich 4 polach (TL, TR, BL, BR=odpowiedź) oraz w opcjach. Każda **pozycja** p (1..N) to niezależna, spójna podmacierz 2×2: jej atrybuty zmieniają się wzdłuż osi wiersza/kolumny ze stałym krokiem. Brakujące pole jest wyznaczone pozycja-po-pozycji z trzech widocznych komórek → brak niejednoznaczności.

**Atrybuty figury i ich cykle:**
- kształt: `koło → trójkąt → kwadrat` (mod 3),
- wypełnienie: `empty → solid → x → dot-center` (mod 4),
- obrót (opcjonalny): trójkąt `0 → 90 → 180 → 270` (mod 4), kwadrat `0 → 45` (mod 2).

Dla pozycji p i pola (i=wiersz∈{0,1}, j=kolumna∈{0,1}), każdy atrybut przesuwa się wzdłuż przypisanej mu osi:
`wartość = start + (oś==wiersz ? j : i) * krok (mod długość_cyklu)`.

## Gradient trudności (40 hard)

Mapowanie deterministyczne po `id` (h_t8_001..040). **Brak pola „tier" w danych** — gradient jest wewnętrzny (UI nadal pokazuje jeden „Trudny"; losowe próbkowanie sesji daje miks). Easy bez zmian.

| Tier | N figur | Liczba | Cechy |
|---|---|---|---|
| **T1** | 1 | 15 | kształt + wypełnienie; zamiana orientacji; kroki do 2 (≈ obecny hard) |
| **T2** | 2 | 15 | 2 niezależne pozycje, każda z własną regułą |
| **T3** | 3 | 10 | 3 pozycje; w **7** z nich reguła **obrotu** |

Podział: id 001–015 → T1, 016–030 → T2, 031–040 → T3 (z czego 7 z obrotem). Zachowujemy per pytanie: `id`, `level`, `instruction`, liczbę opcji. Rozkład opcji w hard pozostaje 20×4 + 20×5.

## Format danych

```js
// figura
{ shape, fill }            // bez obrotu (jak dziś)
{ shape, fill, rot }       // z obrotem (tylko T3 z regułą obrotu)

// komórka: easy + T1 = pojedyncza figura (obiekt / 1-el. tablica jak dziś);
//          T2/T3 = tablica N figur (dotyczy też topLeft/topRight i opcji)
grid: { topLeft, bottomLeft, topRight }   // każde: figura albo tablica figur
options: [ <komórka>, ... ]               // każda opcja = komórka (tablica figur)
```

Renderer obsługuje **obiekt albo tablicę** per komórka (wstecznie zgodne z easy).

## Ograniczenie obrotu

Pozycja z regułą obrotu musi przez całą macierz być **trójkątem lub kwadratem** (koło nie pokazuje obrotu). W pytaniach T3 z obrotem wszystkie pozycje używają wyłącznie trójkąta/kwadratu, żeby obrót był zawsze widoczny.

## Zmiany w rendererze (`web/index.html`)

1. **`renderFigure(spec, size)`** ([renderFigure](../../web/index.html)):
   - parametr `size` (skalowanie SVG: 1 figura→64, 2→50, 3→42),
   - obrót: owinąć kształt + wnętrze w `<g transform="rotate(deg,40,40)">…</g>` (prototyp w [wariant2-mockup.html](wariant2-mockup.html)).
2. **`renderType8(q)`** — renderować **każdą** komórkę jako tablicę-lub-obiekt (pętla po figurach), z rozmiarem zależnym od liczby figur. Pytania easy/T1 (pojedyncza figura) działają bez zmian.
3. **Renderery opcji** (`renderOptionsStatic` + interaktywny) — już iterują po `specs`; przekazać `size`. Layout komórki: figury w rzędzie, `flex-wrap`.

## Generator (`tools/generate-type8.js` — rozszerzenie)

- dla N pozycji generuje deterministycznie N reguł `{ startShape, startFill, [startRot], shapeAxis, shapeStep, fillAxis, fillStep, [rotAxis, rotStep] }` (oś wypełnienia przeciwna do osi kształtu; obrót na wybranej osi),
- komórka(i,j) = `[ figura(pozycja_p, i, j) … ]`; `BR = komórka(1,1)`,
- **dystraktory** (opcje to pełne komórki): perturbacje `BR` — przeważnie zmiana **jednej** pozycji (bliskie, wiarygodne), uzupełniane wielopozycyjnymi do wymaganej liczby; wszystkie unikalne jako komórki, dokładnie jedna = `BR`,
- **T1** — orientacja kanoniczna/zamieniona + kroki do 2 (jak wariant 1); **T3 z obrotem** — tylko trójkąt/kwadrat,
- `explanation` PL: „N niezależnych figur, każda z własną regułą: figura 1 → wiersz …, kolumna …; … Brakujące pole: … Opcja X — poprawna.",
- determinizm: bez `Math.random`/`Date`; powtarzalny wynik; brak dwóch identycznych pytań.

## Walidator (`tools/validate-type8.js` — rozszerzenie)

Dla wszystkich 80 pytań:
1. N jednorodne we wszystkich 4 polach i we wszystkich opcjach; N ∈ {1,2,3},
2. dla **każdej pozycji** niezależnie odtworzyć reguły (kształt/wypełnienie/obrót) z TL/TR/BL → obliczone `BR[p]`; dokładnie **jedna** opcja = pełne `BR`, równa `options[correct]`,
3. każda pozycja nie-zdegenerowana (≥1 atrybut zmienia się), opcje unikalne jako komórki,
4. `rot` tylko na trójkącie/kwadracie; trójkąt ∈ {0,90,180,270}, kwadrat ∈ {0,45},
5. liczby: 40 easy (N=1) + 40 hard; rozkład N w hard = 15/15/10; ≥6 pytań T3 z obrotem; rozkład opcji 20×4 + 20×5 na poziom,
6. wizualny smoke-test z realnych danych (podgląd jak `wariant2-mockup.html`).

Integrator (`tools/integrate-type8.js`) bez zmian.

## Service worker

`web/sw.js` — bump `ksap-v4` → `ksap-v5` (zmiana danych + renderera). Nie rusza localStorage.

## Pliki

- `web/questions-unified.js` — regeneracja 40 hard typu 8 (easy bez zmian).
- `web/index.html` — `renderFigure` (size + rot), `renderType8` (komórki wielofigurowe), sizing opcji.
- `web/sw.js` — bump cache.
- `tools/generate-type8.js`, `tools/validate-type8.js` — rozszerzenia.
- Artefakty sprawy (spec, plan, podglądy) w `bug-reports/2026-06-03-typ8-figury/`.

## Poza zakresem (YAGNI)

- Zmiany w banku easy.
- Nowy poziom trudności w UI (pozostaje Łatwy/Trudny).
- Pole „tier" w danych / filtrowanie po tierze w UI.
- Pozostałe typy pytań (1–7).
- Rozmiar/liczność jako dodatkowe reguły (poza N figur per tier).

## Sprzątanie dokumentacji (ostatni krok implementacji)

Po wdrożeniu wariantu 2 dokumentacja sprawy ma prezentować **od razu wariant 2** jako rozwiązanie — bez szczegółowej historii wariantu 1 (nie ma sensu jej trzymać):

- przepisać raport [2026-06-03-h_t8_037.md](2026-06-03-h_t8_037.md): zgłoszenie + analiza problemu (struktura single→para/trójka + trójkąt jako koło) + **rozwiązanie = wariant 2** (komórki wielofigurowe, gradient T1/T2/T3, obrót); usunąć opis wariantu 1,
- zaktualizować [README.md](README.md) sprawy oraz wpis w `BACKLOG_DONE.md`, by opisywały wariant 2 jako rozwiązanie (jeden wpis, bez „wariant 1 wdrożony / wariant 2 w toku"),
- usunąć artefakty wariantu 1: `2026-06-03-fix-type8-figure-questions-design.md`, `2026-06-03-fix-type8-figure-questions.md`, `podglad-naprawione-typ8.html` (zastąpiony podglądem wariantu 2 z realnych danych),
- usunąć z tego dokumentu odwołanie „Kontynuacja" do wariantu 1 (po usunięciu plików v1),
- zostają: ten spec + plan wariantu 2, zgłoszenie, `podglad-bledu-h_t8_037.html` (ilustruje problem renderera), `wariant2-mockup.html` i nowy podgląd wariantu 2.

## Uwaga proceduralna

Zgodnie z CLAUDE.md i pamięcią użytkownika: **bez commitów/pushy bez wyraźnej prośby** — dotyczy też tego dokumentu i implementacji.
