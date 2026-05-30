# KSAP Sprawdzian Umiejętności — Study App Design

**Date:** 2026-05-30  
**Source exam:** KSAP "Przykłady zadań do sprawdzianu umiejętności" (urzędnik mianowany)  
**Quality guidelines:** `specyfikacja_pytan.md` (analiza typów poznawczych)  
**Goal:** Portable offline HTML study app — 160 questions across 8 cognitive types, mobile-first, exam-session mode, timer, history.

---

## 1. Deliverables

Two files, same folder, open `index.html` in any local browser (Chrome/Firefox, desktop and mobile):

| File | Purpose |
|---|---|
| `index.html` | UI + all logic (CSS + JS inline, no external deps) |
| `questions.js` | 160 questions as a JS constant, `<script src="questions.js">` |

No build step. No server. No internet required.

---

## 2. Question Types

The 15 PDF sample questions represent **8 distinct cognitive types**. Each type gets exactly **20 questions** = 160 total. Quality guidelines for each type come from `specyfikacja_pytan.md`.

| # | Type name | PDF examples | Options | Visual | Questions |
|---|---|---|---|---|---|
| 1 | Analogia słowna — macierz 2×2 | Q1, Q12 | 4–5 | No | 20 |
| 2 | Wspólny wyraz dla 3 pojęć | Q3, Q9 | 5 | No | 20 |
| 3 | Związek przyczynowo-skutkowy | Q2, Q6 | 4 | SVG chart | 20 |
| 4 | Analogia zdaniowa A:B = C:? | Q5 | 5 | No | 20 |
| 5 | Wnioskowanie sylogistyczne | Q4, Q8, Q11, Q14 | 4–5 | No | 20 |
| 6 | Zadanie numeryczne z tabelą | Q7, Q10 | 5 | HTML table | 20 |
| 7 | Analiza wykresu | Q13 | 5 | SVG chart | 20 |
| 8 | Powiązania między figurami | Q15 | 5 | SVG figures | 20 |

### Quality guidelines per type (from `specyfikacja_pytan.md`)

**Typ 1 — Macierz słowna 2×2**
- Relacja między parą lewą musi być jednoznaczna i symetryczna (zawód→miejsce, kraj→kontynent, narzędzie→zastosowanie, całość→część)
- Dystraktorzy: słowa z tej samej kategorii semantycznej, ale z błędną relacją
- Odpowiedź nie może być odgadniętą bez zrozumienia relacji

**Typ 2 — Wspólny wyraz**
- Każdy z 3 wyrazów z osobna musi pasować do odpowiedzi — jeśli choć jeden nie pasuje, pytanie jest wadliwe
- Odpowiedź nie należy do tej samej kategorii co słowa wejściowe, lecz je wszystkie łączy
- Dystraktorzy pasują do max. 1–2 wyrazów, nie do wszystkich 3

**Typ 3 — Związek przyczynowo-skutkowy**
- Schemat opcji zawsze obejmuje: (A powoduje B) + (B powoduje A) + **C powoduje A i B** *(poprawne)* + brak związku
- Musi istnieć trzecia zmienna C (wspólna przyczyna) w tle, niewidoczna wprost w treści
- Wykres (SVG) musi wizualnie potwierdzać korelację — obie serie rosnące w tym samym kontekście
- Połowa pytań typu 3 ma wykres słupkowy, połowa liniowy

**Typ 4 — Analogia zdaniowa**
- Relacja: dziedzina nauki → przedmiot badań; lub narzędzie → materiał; lub rola → instytucja
- Relacja w parze A:B i C:odpowiedź musi być identyczna, nie tylko podobna
- Dystraktorzy: inne obiekty z tej samej domeny biologicznej/naukowej/administracyjnej

**Typ 5 — Sylogizm**
- Warianty struktury (rozkład równy między 20 pytaniami):
  - Łańcuch: A⊆B, B⊆C → A⊆C (styl Q4, Q8)
  - Modus ponens: jeżeli P to Q + P zachodzi → Q (styl Q14)
  - Z "niektóre": A⊆B + A⊆C → niektóre B są C (styl Q8)
  - Pełna analiza każdej opcji (styl Q11): 5 opcji, każda z uzasadnieniem w wyjaśnieniu
- Dystraktorzy: odwrócenie implikacji, zbyt silne uogólnienie (niektóre→wszystkie), zaprzeczenie, wniosek poza przesłankami
- Poprawny wniosek musi wynikać **wyłącznie** z podanych przesłanek, bez wiedzy pozatekstowej

**Typ 6 — Zadanie numeryczne z tabelą**
- Tabela 3–4 wiersze × 3–5 kolumn + kolumna/wiersz sum
- Każda wskazówka w treści musi być konieczna (bez redundancji)
- Sumy wierszy/kolumn muszą się zgadzać przy poprawnym rozwiązaniu (wbudowana samokontrola)
- Dystraktorzy liczbowe: wyniki pośrednich obliczeń (wartości innych komórek tabeli)
- Kontekst: urzędnicze/administracyjne (referenci, wydziały, budżety, zamówienia)

**Typ 7 — Analiza wykresu**
- Dwie serie muszą zachowywać się odmiennie (jedna rośnie gdy druga maleje przynajmniej w jednym punkcie)
- Minimum jedna seria musi przeciąć drugą — obala wniosek "X zawsze > Y"
- Opcje odpowiedzi: 1 poprawna (wprost odczytywalny trend) + 4 dystraktorów:
  - Zły sezon/punkt (np. "najmniej jesienią" gdy jest maximum)
  - Fałszywe uogólnienie obalone przez jeden punkt
  - Twierdzenie o braku zależności gdy zależność widoczna
  - Zamiana serii (przypisanie trendu serii A do serii B)

**Typ 8 — Figury abstrakcyjne**
- Reguła transformacji spójna wzdłuż wiersza i kolumny macierzy 2×2
- Max 2 niezależne reguły jednocześnie (kształt + wypełnienie, lub kształt + liczba)
- Dystraktorzy: zastosowanie tylko jednej z dwóch reguł; odwrócenie wypełnienia; niepowiązane figury

### Kontekst pytań
- Typ 1, 2, 4: neutralny ogólny lub administracyjny (jak w PDF)
- Typ 3, 7: scenariusze społeczno-gospodarcze (transport, zdrowie publiczne, aktywność obywateli, budżet)
- Typ 5: relacje logiczne między pojęciami prawa, administracji lub codziennymi analogiami
- Typ 6: scenariusze biurowe/administracyjne (referenci, wydziały, dokumenty, terminy)
- Typ 8: figury czysto abstrakcyjne (kształty geometryczne, wypełnienia)

---

## 3. Data Schema (`questions.js`)

```javascript
const QUESTIONS = {
  type1: [ /* 20 items */ ],
  type2: [ /* 20 items */ ],
  // ...
  type8: [ /* 20 items */ ]
};
```

### Base fields (all types)
```javascript
{
  id: "t1_001",           // "t{typeNum}_{001..020}"
  typeId: 1,              // 1–8
  instruction: "...",     // shown above question body
  options: ["A) ...", "B) ...", "C) ...", "D) ..."],  // A–D (4 opts) or A–E (5 opts)
  correct: 0,             // 0-based index into options[]
  explanation: "..."      // shown after answer in learning mode
}
// Exception: Type 8 options[] contains figure-spec arrays, not strings (see below).
```

### Type-specific extra fields

**Type 1** (macierz słowna 2×2):
```javascript
{ leftPair: ["słowo1", "słowo2"], rightTop: "słowo3" }
// options: A–D (4) or A–E (5), mix across the 20 questions
// rendered as two side-by-side 2-cell cards
```

**Type 2** (wspólny wyraz):
```javascript
{ words: ["Słowo1", "Słowo2", "Słowo3"] }
// options: A–E (5)
```

**Type 3** (przyczynowo-skutkowe):
```javascript
{
  text: "W pewnym mieście zaobserwowano...",
  chart: {
    type: "bar" | "line",   // alternates across 20 questions
    xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
    datasets: [
      { label: "Seria A", data: [30, 60, 40, 20], color: "#c0392b" },
      { label: "Seria B", data: [20, 50, 35, 15], color: "#2980b9" }
    ]
  }
}
// options: A–D (4)
```

**Type 4** (analogia zdaniowa):
```javascript
{ stem: "ENTOMOLOGIA jest do OWADÓW, jak TERIOLOGIA jest do" }
// options: A–E (5)
```

**Type 5** (sylogizm):
```javascript
{
  premises: ["Przesłanka 1.", "Przesłanka 2.", "Przesłanka 3."],
  syllogismVariant: "chain" | "modus_ponens" | "some" | "full_eval"
  // full_eval = Q11-style (5 options, each is a proposition to accept/reject)
}
// options: A–D (chain/modus_ponens/some) or A–E (full_eval)
```

**Type 6** (numeryczne z tabelą):
```javascript
{
  narrative: "W pewnym wydziale...",
  table: {
    headers: ["", "Kol 1", "Kol 2", "Kol 3", "Suma"],
    rows: [
      ["Wiersz A", "2", "?", "", "8"],
      ["Wiersz B", "3", "3", "4", "10"],
      ["Wiersz C", "3", "", "", "7"]
    ]
    // "?" marks the cell to find; empty string = derivable but not asked
  }
}
// options: A–E (5), numeric values
```

**Type 7** (analiza wykresu):
```javascript
{
  chartTitle: "TYTUŁ WYKRESU",
  chart: {
    type: "line",
    xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
    datasets: [
      { label: "Seria A", data: [...], color: "..." },
      { label: "Seria B", data: [...], color: "..." }
    ]
  }
}
// options: A–E (5), each a descriptive statement to evaluate
```

**Type 8** (figury abstrakcyjne):
```javascript
{
  grid: {
    topLeft:    { shape: "square"|"circle", fill: "empty"|"solid"|"x"|"dot-center" },
    bottomLeft: [{ shape, fill }, { shape, fill }],  // 1 or 2 figures
    topRight:   { shape, fill }
    // bottomRight = missing, to be selected from options
  },
  options: [
    [{ shape, fill }],              // option A
    [{ shape, fill }, { shape, fill }],  // option B (two figures)
    // ... C, D, E
  ]
}
// options[]: arrays of figure specs, not strings
// Supported fill: "empty", "solid", "x", "dot-center"
```

---

## 4. Session Flow

### 4.1 Screens

```
HomeScreen
  → SessionSetupScreen (mode, timer toggle)
    → QuestionScreen (×15)
      → [learning mode] FeedbackOverlay (after each question)
      → SummaryScreen
  → HistoryScreen (list of past sessions)
```

### 4.2 Session composition — 8 types, 15 questions

Algorithm:
1. Draw 1 random question from each of the 8 types (guaranteed coverage = 8 questions)
2. Draw 7 more questions at random from the full pool of 160, excluding already-selected questions
3. Shuffle all 15 into random order

Result: every session covers all 8 cognitive skills at least once, some types appear twice. No question repeats within a session.

### 4.3 Timer behavior

- Per-question countdown from 60 seconds (when enabled)
- Color: default → orange at 30s → red at 10s
- On timeout: auto-advance, recorded as `userAnswer: null`, `correct: false`
- Timer is paused while feedback overlay is shown (learning mode)
- Global elapsed time tracked for summary screen

---

## 5. localStorage Schema

Key: `"ksap_sessions"` → JSON array, newest first, capped at 50 entries.

```javascript
[
  {
    id: "uuid-v4-like-string",
    date: "2026-05-30T14:22:00.000Z",
    mode: "learning" | "exam",
    timerEnabled: true,
    totalTimeSec: 720,
    score: 12,            // out of 15
    questions: [
      {
        typeId: 3,
        questionId: "t3_007",
        userAnswer: 2,    // index; null if timed out
        correct: true,
        timeSpentSec: 38
      }
      // × 15
    ]
  }
]
```

Settings stored under `"ksap_settings"`:
```javascript
{ defaultMode: "learning", defaultTimer: true }
```

---

## 6. UI Design

### Layout — mobile-first

- **Mobile-first responsive design**: base styles target 375px+ (phone), scale up to 768px (tablet), then 1024px+ (desktop)
- Single-page app, screens swapped via JS (no routing library)
- No external CSS framework — hand-written responsive CSS with `clamp()`, `min()`, flexbox
- Polish language throughout
- Clean, professional look (civil service context) — no emoji, minimal decoration

### Responsive breakpoints

| Breakpoint | Layout changes |
|---|---|
| < 480px (phone) | Single column, full-width cards, large tap targets (min 48px), stacked options |
| 480–768px (large phone / tablet) | Slight padding increase, charts scale via viewBox |
| 768px+ (desktop) | Max-width 800px centered, two-column possible on summary |

### Question screen (mobile layout)

```
┌──────────────────────────────┐
│  4 / 15   ████░░░░░░░  0:47  │  ← sticky header
├──────────────────────────────┤
│  Analogia słowna             │
│                              │
│  [Instruction text]          │
│                              │
│  [Question body]             │
│  (type-specific renderer)    │
│                              │
│  ┌──────────────────────┐    │
│  │ ○  A)  odpowiedź     │    │
│  └──────────────────────┘    │
│  ┌──────────────────────┐    │
│  │ ○  B)  odpowiedź     │    │
│  └──────────────────────┘    │
│  ...                         │
│                              │
│  [Dalej →]  (learning mode)  │
└──────────────────────────────┘
```

- Options rendered as full-width tappable blocks (not radio buttons)
- Charts use SVG `viewBox` — scale to 100% container width on mobile
- Figure grids (Type 8) use CSS grid, scale down on small screens

### Learning mode feedback
- After selecting: tapped option highlights green (correct) or red (wrong); correct option always shown green
- Expandable "Wyjaśnienie" block slides open below options
- "Dalej →" button appears / activates

### Exam mode
- No color feedback, no explanation
- Tapping an option immediately advances to next question

### Setup screen (before session)
```
Tryb:    [● Nauka]  [○ Egzamin]
Timer:   [● Włącz]  [○ Wyłącz]
         [Rozpocznij sesję]
```

### Summary screen
- Score badge (e.g. "12 / 15"), total time
- List: per question → type name | ✓ / ✗ / – | time spent
- "Nowa sesja" and "Historia" buttons

### History screen
- List of sessions: date | mode | score/15 | duration
- Tap → detail view (same list as summary)

---

## 7. SVG Rendering

All charts and figures rendered as inline SVG via JS — no external charting library.

### Bar chart renderer
- Input: `{ xLabels[], datasets[{label, data[], color}] }`
- Output: SVG with vertical bars, axis labels, legend
- `viewBox="0 0 500 260"` — scales to 100% container width

### Line chart renderer
- Input: same structure, `type: "line"`
- Output: SVG polyline with data point circles, grid lines, legend
- Same viewBox approach

### Figure renderer (Type 8)
- Input: `{ shape, fill }` per cell
- `"square"` → `<rect>`, `"circle"` → `<circle>`
- Fill variants: `"empty"` (outline only), `"solid"` (filled), `"x"` (outline + two diagonal strokes), `"dot-center"` (outline + small filled circle center)
- Each figure cell: 80×80 logical units in SVG, scales with container

---

## 8. Out of Scope

- Server, database, login — localStorage only
- Accessibility (ARIA) — nice to have, not required
- Importing/editing questions via UI — `questions.js` is the source of truth
- Sound, animations beyond CSS transitions
- PWA / offline service worker (simple file:// open is sufficient)

---

## 9. Implementation Strategy

Two separate coding prompts (two Claude sessions):

### Prompt 1 — Generate `questions.js`
Input: this spec (sections 2–3) + `specyfikacja_pytan.md`  
Output: `questions.js` with `const QUESTIONS = { type1: [...20], ..., type8: [...20] }`  
Constraint: Claude must apply quality guidelines from `specyfikacja_pytan.md` per type. All questions in Polish. Civil-service-appropriate context.

### Prompt 2 — Generate `index.html`
Input: this spec (sections 4–8)  
Output: single self-contained `index.html` with inline CSS + JS  
Constraint: mobile-first, no external deps, loads `questions.js` via `<script src>`.
