# KSAP Study App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce two files — `questions.js` (160 questions, 8 cognitive types × 20 each) and `index.html` (mobile-first offline SPA) — that together form a portable KSAP civil service exam study tool.

**Architecture:** Two independent Claude generation sessions. Prompt 1 produces the question data file; Prompt 2 produces the app shell that consumes it. Each prompt is fully self-contained.

**Tech Stack:** Vanilla HTML5/CSS3/ES6+, inline SVG (charts + figures), localStorage, zero external dependencies.

---

## File Structure

| File | Responsibility |
|---|---|
| `questions.js` | `const QUESTIONS = { type1:[...×20], ..., type8:[...×20] }` — 160 questions total |
| `index.html` | Full SPA — inline CSS + JS + SVG renderers, loads `questions.js` via `<script src>` |

---

## Task 1: Generate questions.js

**Files:**
- Create: `questions.js`

- [ ] **Step 1: Open a new Claude session and paste the following prompt verbatim**

````
You are generating the data file for a Polish civil service exam study app. Output a single JavaScript file called questions.js containing all 160 questions.

## Output format

The file must contain exactly this structure (no markdown, no comments outside the object, valid JS):

  const QUESTIONS = {
    type1: [ /* exactly 20 questions */ ],
    type2: [ /* exactly 20 questions */ ],
    type3: [ /* exactly 20 questions */ ],
    type4: [ /* exactly 20 questions */ ],
    type5: [ /* exactly 20 questions */ ],
    type6: [ /* exactly 20 questions */ ],
    type7: [ /* exactly 20 questions */ ],
    type8: [ /* exactly 20 questions */ ],
  };

All text fields must be in Polish. Questions must be appropriate for a Polish civil service competency exam (prawo administracyjne, etyka urzędnicza, procedury administracyjne, zarządzanie publiczne, logika ogólna).

## Base fields (every question has all of these)

{
  id: "t1_001",           // pattern: "t{typeNum}_{001..020}" — unique, zero-padded
  typeId: 1,              // integer 1–8
  instruction: "...",     // full instruction string shown to the user
  options: ["A) ...", "B) ...", "C) ...", "D) ..."],  // A–D or A–E depending on type
  correct: 0,             // 0-based index into options[]
  explanation: "..."      // explanation of why correct answer is right (2–4 sentences)
}

---

## TYPE 1 — Analogia słowna (macierz 2×2)

Extra fields added to base:
  leftPair: ["słowo1", "słowo2"],   // left column of 2×2: top word, bottom word
  rightTop: "słowo3"                 // right column top word; bottom is the blank

Instruction (use exactly):
"W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna."

Options: mix of 4 options (A–D) and 5 options (A–E) across the 20 questions.

QUALITY RULES:
- Relation between leftPair[0] and leftPair[1] must be identical to relation between rightTop and correct answer
- Relation types to use (vary across 20 questions): zawód→miejsce pracy, kraj→kontynent, organ→kompetencja, pojęcie→dziedzina, narzędzie→zastosowanie, całość→część, przełożony→podwładny, ustawa→organ ją stosujący
- Distractors: words from same semantic domain as correct answer but with wrong relation
- Answer must not be guessable without understanding the relation

Example (do NOT copy — generate fresh):
{
  id: "t1_001", typeId: 1,
  instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
  leftPair: ["lekarz", "szpital"], rightTop: "urzędnik",
  options: ["A) urząd", "B) formalność", "C) procedura", "D) administracja"],
  correct: 0,
  explanation: "Lekarz pracuje w szpitalu — szpital to miejsce pracy lekarza. Analogicznie urzędnik pracuje w urzędzie, które jest jego miejscem pracy. Pozostałe opcje opisują tryb pracy lub ogólną kategorię działania, nie miejsce."
}

---

## TYPE 2 — Wspólny wyraz dla 3 pojęć

Extra fields added to base:
  words: ["Słowo1", "Słowo2", "Słowo3"]

Instruction (use exactly):
"W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:"

Options: always A–E (5 options).

QUALITY RULES — CRITICAL:
- Each of the 3 words INDIVIDUALLY must relate to the answer — if any single word does not connect, the question is flawed
- Self-check: complete "Słowo1 jest powiązane z odpowiedzią, bo ___" for all 3 words before including
- Answer does NOT belong to the same category as input words — it connects them all
- Distractors must fit at most 1–2 of the 3 words (not all 3)

Example (do NOT copy — generate fresh):
{
  id: "t2_001", typeId: 2,
  instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
  words: ["Fotosynteza", "Chlorofil", "Liść"],
  options: ["A) Korzeń", "B) Kwiat", "C) Tlen", "D) Woda", "E) Słońce"],
  correct: 4,
  explanation: "Słońce łączy wszystkie trzy pojęcia: fotosynteza jest procesem wymagającym światła słonecznego, chlorofil pochłania to światło, a liść jest organem gdzie zachodzi fotosynteza. Pozostałe opcje pasują do co najwyżej jednego lub dwóch pojęć."
}

---

## TYPE 3 — Związek przyczynowo-skutkowy

Extra fields added to base:
  text: "...",            // scenario text describing two correlated phenomena
  chart: {
    type: "bar" | "line",
    xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
    datasets: [
      { label: "Opis serii A", data: [n1, n2, n3, n4], color: "#c0392b" },
      { label: "Opis serii B", data: [n1, n2, n3, n4], color: "#2980b9" }
    ]
  }

Instruction (use exactly):
"W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna."

Options: always A–D (4 options) in this MANDATORY structure:
  options[0] = "A) [Zjawisko A powoduje zjawisko B]."        ← always wrong
  options[1] = "B) [Zjawisko B powoduje zjawisko A]."        ← always wrong
  options[2] = "C) [Wspólna przyczyna C powoduje zarówno zjawisko A, jak i zjawisko B]."  ← ALWAYS CORRECT
  options[3] = "D) Brak związku przyczynowo-skutkowego między [A] a [B]."                 ← always wrong

correct: always 2

QUALITY RULES:
- The hidden common cause C must not appear directly in the text; reader must infer it
- Chart data: both series must peak/drop in the same season (confirms correlation visually)
- Chart values must be realistic with natural variation (not identical series)
- Generate exactly 10 questions with type:"bar" and 10 with type:"line"

---

## TYPE 4 — Analogia zdaniowa A:B = C:?

Extra fields added to base:
  stem: "X jest do Y, jak Z jest do"   // sentence stem (bold text displayed)

Instruction (use exactly):
"W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna."

Options: always A–E (5 options).

QUALITY RULES:
- Relation in A:B must be IDENTICAL (not just similar) to relation in C:answer
- Relation types: dziedzina nauki→przedmiot badań, rola→instytucja, ustawa→organ, pojęcie→kategoria nadrzędna, narzędzie→materiał
- X and Z should be less common terms (requiring actual knowledge to answer correctly)
- Distractors: other items from the same domain as the answer
- Test each question: is the A:B relation truly the same as C:correct_answer?

---

## TYPE 5 — Wnioskowanie sylogistyczne

Extra fields added to base:
  premises: ["Przesłanka 1.", "Przesłanka 2."],   // 2 or 3 premises
  syllogismVariant: "chain" | "modus_ponens" | "some" | "full_eval"

Instruction:
- chain / modus_ponens / some: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna."
- full_eval: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna."

Options: A–D (4) for chain/modus_ponens/some; A–E (5) for full_eval.

Distribution across 20 questions: 5 chain, 5 modus_ponens, 5 some, 5 full_eval.

QUALITY RULES:
- Correct conclusion must follow EXCLUSIVELY from stated premises — no outside world knowledge permitted
- Distractor types (vary all four across each variant):
  * Reversed implication: if A→B is a premise, wrong option: B→A
  * Overgeneralization: change "niektóre" to "wszystkie" in conclusion
  * Negation of the correct conclusion
  * Conclusion beyond premises: introduces a relation not stated anywhere
- "some" variant: carefully distinguish "niektóre B są C" vs "wszystkie B są C"
- modus_ponens: always use 3 premises; third premise states the condition actually holds

Example chain:
{
  id: "t5_001", typeId: 5,
  instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe...",
  premises: ["Wszystkie decyzje administracyjne wymagają uzasadnienia.", "Wszystkie uzasadnienia muszą być sporządzone na piśmie."],
  syllogismVariant: "chain",
  options: ["A) Wszystkie decyzje administracyjne muszą być sporządzone na piśmie.", "B) Wszystkie uzasadnienia są decyzjami administracyjnymi.", "C) Niektóre decyzje administracyjne nie wymagają uzasadnienia.", "D) Wszystkie dokumenty pisemne są decyzjami administracyjnymi."],
  correct: 0,
  explanation: "Z przesłanek wynika łańcuch: decyzje→uzasadnienia→forma pisemna. Każda decyzja wymaga uzasadnienia (przesłanka 1), a każde uzasadnienie musi być pisemne (przesłanka 2), więc każda decyzja musi być pisemna."
}

---

## TYPE 6 — Zadanie numeryczne z tabelą

Extra fields added to base:
  narrative: "...",       // text with relationships between numbers
  table: {
    headers: ["", "Kol1", "Kol2", "Kol3", "Suma"],
    rows: [
      ["Wiersz A", "2", "?", "", "8"],   // "?" = cell to find; "" = derivable but not asked
      ["Wiersz B", "3", "3", "4", "10"],
      ["Wiersz C", "3", "", "2", "7"]
    ]
  }

Instruction (use exactly):
"W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna."

Options: always A–E (5 numeric options, e.g. "A) 2", "B) 3", ...).

QUALITY RULES — CRITICAL:
- BEFORE including any Type 6 question, solve it yourself and verify ALL row sums equal their "Suma" column
- Every clue in the narrative must be necessary — remove any clue and the puzzle becomes unsolvable
- Distractors = values of intermediate calculation steps (cells near "?"), not random numbers
- Context must be administrative/civil service: referenci, wydziały, dokumenty, budżety, terminy, zamówienia publiczne, sprawy administracyjne

---

## TYPE 7 — Analiza wykresu

Extra fields added to base:
  chartTitle: "TYTUŁ WYKRESU",
  chart: {
    type: "line",
    xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
    datasets: [
      { label: "Seria A", data: [n1, n2, n3, n4], color: "#c0392b" },
      { label: "Seria B", data: [n1, n2, n3, n4], color: "#2980b9" }
    ]
  }

Instruction (use exactly):
"W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność."

Options: always A–E (5 options — each a descriptive statement about the chart).

QUALITY RULES:
- Two series must behave DIFFERENTLY — not parallel, not identical
- At least one point where series A > series B AND at least one where B > A (crossing, not just touching)
- 1 correct option: a statement directly verifiable from the chart data values
- 4 distractors (use all four types):
  * Wrong season: "Seria A jest najwyższa wiosną" when actually it peaks in summer
  * False generalization: "Seria A zawsze przewyższa Serię B" when the chart shows at least one crossing
  * No-relationship claim: "Pora roku nie ma wpływu na [phenomenon]" when obvious variation exists
  * Series swap: attribute Seria A trend to Seria B
- VERIFY: your correct answer option must be provably true from the exact data values you provided

---

## TYPE 8 — Powiązania między figurami

Extra fields added to base:
  grid: {
    topLeft:    { shape: "square" | "circle", fill: "empty" | "solid" | "x" | "dot-center" },
    bottomLeft: [ figureSpec ] | [ figureSpec, figureSpec ],  // 1 or 2 figures
    topRight:   { shape: "square" | "circle", fill: "empty" | "solid" | "x" | "dot-center" }
    // bottomRight is the MISSING piece — derived from options[]
  },
  options: [   // A–E: each option is an array of 1 or 2 figure specs
    [ figureSpec ],
    [ figureSpec, figureSpec ],
    ...   // 5 options total
  ]

fill values: "empty" (outline only), "solid" (fully filled), "x" (outline + diagonal X strokes), "dot-center" (outline + small filled circle at center)

Instruction (use exactly):
"W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź."

QUALITY RULES — CRITICAL:
- Define ONE row rule (how topLeft → topRight transforms) and ONE column rule (how topLeft → bottomLeft transforms)
- bottomRight (correct answer) = apply row rule to topRight = apply column rule to bottomLeft — BOTH must give the same result
- Self-check before including: verify row rule gives correct answer AND column rule gives correct answer
- Max 2 simultaneous independent rules (e.g., shape changes AND fill changes)
- Distractors:
  * Apply only the row rule but not the column rule (or vice versa)
  * Apply fill in reverse
  * Use the correct shape but wrong fill, or vice versa

Example:
{
  id: "t8_001", typeId: 8,
  instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami...",
  grid: {
    topLeft: { shape: "square", fill: "x" },
    bottomLeft: [{ shape: "square", fill: "empty" }, { shape: "square", fill: "solid" }],
    topRight: { shape: "circle", fill: "x" }
  },
  options: [
    [{ shape: "circle", fill: "x" }, { shape: "circle", fill: "x" }],
    [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "empty" }],
    [{ shape: "square", fill: "empty" }, { shape: "square", fill: "solid" }],
    [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "solid" }],
    [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "solid" }]
  ],
  correct: 3,
  explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górne pole ma 1 figurę, dolne ma 2 figury z wypełnieniami: puste i pełne. Brakujące pole (dolny prawy): dwa koła — puste i pełne."
}

---

## Final generation instructions

1. Generate ALL 160 questions before outputting anything
2. For Type 6: solve each puzzle yourself before writing it — verify row/column sums
3. For Type 8: apply both rules yourself to confirm bottomRight — self-check
4. For Type 3: confirm both chart series peak in the same season
5. For Type 7: confirm your correct answer option is literally true from the numbers
6. Output ONLY the JavaScript — no markdown fences, no explanation text outside the file
7. The output must be loadable as: <script src="questions.js"></script>
````

- [ ] **Step 2: Save the Claude output as `questions.js` in the project root**

The file should start with `const QUESTIONS = {` and end with `};`

- [ ] **Step 3: Validate structure in browser DevTools console**

Open any HTML file from the project folder in Chrome, then open DevTools Console and run:

```javascript
// First paste the questions.js content directly into console, then run:
const counts = Object.keys(QUESTIONS).map(k => `${k}: ${QUESTIONS[k].length}`);
console.log(counts.join('\n'));
// Expected: type1: 20, type2: 20, type3: 20, ..., type8: 20

let issues = [];
Object.entries(QUESTIONS).forEach(([type, qs]) => {
  qs.forEach(q => {
    if (!q.id || q.typeId === undefined || !q.instruction || !q.options?.length || q.correct === undefined || !q.explanation)
      issues.push(`${q.id || type}: missing base field`);
  });
});
console.log(issues.length === 0 ? '✓ All base fields present' : issues);
```

Expected: all types show 20, zero issues.

- [ ] **Step 4: Spot-check question quality (manual)**

Check 2–3 questions from each type:
- **Type 2**: each of the 3 `words` individually connects to the correct answer — verify in explanation
- **Type 3**: `chart.datasets[0].data` and `[1].data` both peak in the same season
- **Type 5**: correct answer follows only from stated premises — try to disprove it using only the premises
- **Type 6**: pick one question, sum each row manually → matches the Suma column
- **Type 7**: correct option statement is literally true from the exact data values
- **Type 8**: apply row rule to `topRight` → matches `options[correct]`; apply column rule to `bottomLeft` → same result

If issues found, regenerate only that type with a targeted prompt: "Regenerate only type X questions for questions.js using the same schema and quality rules. Here are the issues: [describe]."

- [ ] **Step 5: Commit**

```bash
git init  # skip if already a git repo
git add questions.js
git commit -m "feat: add 160 KSAP exam questions (8 types x 20)"
```

---

## Task 2: Generate index.html

**Files:**
- Create: `index.html`
- Depends on: `questions.js` (must exist before testing)

- [ ] **Step 1: Open a new Claude session and paste the following prompt verbatim**

````
You are building a complete, self-contained offline study app for the Polish civil service skills exam (KSAP "sprawdzian umiejętności"). Output a single file: index.html.

## Core constraints

- Mobile-first responsive CSS (base: 375px phone, also works on 768px tablet and 1024px+ desktop)
- ALL CSS in one <style> block in <head>; ALL JavaScript in one <script> block at end of <body>
- Zero external dependencies — no CDN, no fetch(), no import
- Loads question data via: <script src="questions.js"></script> (placed before the main script)
- Must work when opened as file:// in Chrome or Firefox (Windows/Mac)
- Polish language throughout the UI

## Data structure (from questions.js)

const QUESTIONS = { type1: [...20 items], ..., type8: [...20 items] }

Every question has: { id, typeId (1–8), instruction, options (string[]), correct (index), explanation }

Type-specific extra fields:
  Type 1: leftPair (string[2]), rightTop (string)
  Type 2: words (string[3])
  Type 3: text (string), chart { type:"bar"|"line", xLabels[4], datasets[{label,data[4],color}] }
  Type 4: stem (string)
  Type 5: premises (string[]), syllogismVariant
  Type 6: narrative (string), table { headers[], rows[][] }  — "?" marks cell to find
  Type 7: chartTitle (string), chart { type:"line", xLabels[4], datasets[{label,data[4],color}] }
  Type 8: grid { topLeft, bottomLeft (array), topRight }, options (array of figure-spec arrays)
    figure spec: { shape:"square"|"circle", fill:"empty"|"solid"|"x"|"dot-center" }

## App state

Single state object (no globals except this):
```js
const state = {
  screen: 'home',            // 'home'|'setup'|'question'|'summary'|'history'
  mode: 'learning',          // 'learning'|'exam'
  timerEnabled: true,
  session: [],               // array of 15 question objects (built at start)
  currentIndex: 0,           // 0–14
  answers: [],               // [{ questionId, userAnswer, correct, timeSpentSec }] ×15
  timerInterval: null,
  timerSeconds: 60,
  sessionStartTime: null,
};
```

Single screen-switch function:
```js
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
  document.getElementById('screen-' + name).style.display = '';
  state.screen = name;
}
```

## Session composition algorithm

```js
function buildSession() {
  const guaranteed = [];
  for (let t = 1; t <= 8; t++) {
    const pool = QUESTIONS['type' + t];
    guaranteed.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  const usedIds = new Set(guaranteed.map(q => q.id));
  const allQs = Object.values(QUESTIONS).flat().filter(q => !usedIds.has(q.id));
  shuffle(allQs);
  const session = [...guaranteed, ...allQs.slice(0, 7)];
  shuffle(session);
  return session;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```

## Screens

### #screen-home

HTML structure:
```html
<div id="screen-home" class="screen">
  <h1>Sprawdzian Umiejętności KSAP</h1>
  <p class="subtitle">Pomoc do nauki egzaminu kompetencyjnego</p>
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" onclick="showScreen('history')">Historia sesji</button>
</div>
```

On load: hide #btn-history if localStorage "ksap_sessions" is empty or absent.

### #screen-setup

```html
<div id="screen-setup" class="screen">
  <h2>Nowa sesja</h2>
  <div class="toggle-group" id="mode-toggle">
    <button class="toggle-btn active" data-mode="learning" onclick="setMode('learning')">Nauka</button>
    <button class="toggle-btn" data-mode="exam" onclick="setMode('exam')">Egzamin</button>
  </div>
  <label class="checkbox-label">
    <input type="checkbox" id="timer-checkbox" checked onchange="state.timerEnabled = this.checked">
    Licznik czasu (60 s/pytanie)
  </label>
  <button onclick="startSession()">Rozpocznij →</button>
</div>
```

setMode(m): sets state.mode, updates active class on buttons.
startSession(): reads mode/timer from state, saves to "ksap_settings", calls buildSession(), sets state.session, state.currentIndex=0, state.answers=[], then showScreen('question') and renderQuestion().

### #screen-question

```html
<div id="screen-question" class="screen">
  <div class="q-header" id="q-header">
    <span id="q-counter">Pytanie 1 z 15</span>
    <div id="q-progress"></div>
    <span id="q-timer" class="timer"></span>
  </div>
  <div id="q-body"></div>
  <button id="btn-next" style="display:none" onclick="nextQuestion()">Dalej →</button>
</div>
```

renderQuestion() writes into #q-body:
```html
<div class="type-label">[TYPE NAME]</div>
<div class="instruction">[question.instruction]</div>
<div class="question-body">[type-specific renderer output]</div>
<div class="options" id="options-container">[rendered options]</div>
```

Type names:
  1→"ANALOGIA SŁOWNA — MACIERZ", 2→"WSPÓLNY WYRAZ", 3→"ZWIĄZEK PRZYCZYNOWO-SKUTKOWY",
  4→"ANALOGIA ZDANIOWA", 5→"WNIOSKOWANIE LOGICZNE", 6→"ZADANIE NUMERYCZNE",
  7→"ANALIZA WYKRESU", 8→"POWIĄZANIA FIGUR"

Options (types 1–7): each option renders as:
```html
<div class="option" data-index="0" onclick="selectAnswer(0)">A) odpowiedź</div>
```

Options (type 8): each option renders as an SVG figure group wrapped in a clickable div.

selectAnswer(index):
- Record in state.answers
- Stop timer
- LEARNING mode: highlight correct (green) and selected if wrong (red); show explanation div; show #btn-next
- EXAM mode: call nextQuestion() immediately

nextQuestion(): increment currentIndex; if < 15 renderQuestion(); else showSummary()

### #screen-summary

showSummary():
- Stop timer, save session to localStorage
- Score = count of state.answers where correct === true
- Render:
  * "Wynik sesji" heading
  * Score badge: "12 / 15"
  * Total time (formatted MM:SS or "—" if timer was off)
  * Table: # | Typ | Wynik (✓/✗/—) | Czas (s)
  * Buttons: "Nowa sesja" (→ setup) | "Historia" (→ history)

### #screen-history

loadHistory():
- Read "ksap_sessions" from localStorage (JSON array)
- If empty: show "Brak historii sesji."
- Else: render table: Data | Tryb | Wynik | Czas | [Szczegóły]
- "Szczegóły" button expands/shows a per-question breakdown for that session (same columns as summary table)
- "Powrót" button → showScreen('home')

## Timer implementation

```js
function startTimer() {
  if (!state.timerEnabled) return;
  state.timerSeconds = 60;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      // record timeout
      state.answers.push({ questionId: state.session[state.currentIndex].id,
        userAnswer: null, correct: false, timeSpentSec: 60 });
      nextQuestion();
    }
  }, 1000);
}

function stopTimer() { clearInterval(state.timerInterval); }

function updateTimerDisplay() {
  const el = document.getElementById('q-timer');
  if (!el || !state.timerEnabled) return;
  const m = Math.floor(state.timerSeconds / 60);
  const s = state.timerSeconds % 60;
  el.textContent = m + ':' + String(s).padStart(2, '0');
  el.className = 'timer' +
    (state.timerSeconds <= 10 ? ' timer-red' : state.timerSeconds <= 30 ? ' timer-orange' : '');
}
```

In learning mode: call stopTimer() when answer selected; resume (restartTimer at remaining time) not needed — timer just stops.

## localStorage

Save session (call from showSummary):
```js
function saveSession() {
  const sessions = JSON.parse(localStorage.getItem('ksap_sessions') || '[]');
  sessions.unshift({
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(),
    date: new Date().toISOString(),
    mode: state.mode,
    timerEnabled: state.timerEnabled,
    totalTimeSec: Math.floor((Date.now() - state.sessionStartTime) / 1000),
    score: state.answers.filter(a => a.correct).length,
    questions: state.answers.map((a, i) => ({
      typeId: state.session[i].typeId,
      questionId: a.questionId,
      userAnswer: a.userAnswer,
      correct: a.correct,
      timeSpentSec: a.timeSpentSec
    }))
  });
  if (sessions.length > 50) sessions.length = 50;
  localStorage.setItem('ksap_sessions', JSON.stringify(sessions));
}
```

## SVG renderers

### renderBarChart(chart) — returns HTML string with inline SVG

- viewBox="0 0 500 260" width="100%"
- Vertical bars, auto-scale Y axis to max value in datasets
- Bars colored by dataset.color
- X labels below bars, value labels above bars
- Legend below chart: colored square + dataset label for each series

### renderLineChart(chart) — returns HTML string with inline SVG

- viewBox="0 0 500 260" width="100%"
- Polylines with circles at data points (r=5)
- Light horizontal grid lines
- X labels at bottom, value labels near each point
- Legend below chart

### renderFigure(spec) — returns inline SVG string (single figure)

- viewBox="0 0 80 80", width="80" height="80" (or responsive via CSS)
- shape "square": <rect x="10" y="10" width="60" height="60" fill-color fill-mode stroke="#333" stroke-width="3"/>
- shape "circle": <circle cx="40" cy="40" r="30" .../>
- fill "empty": fill="white" (or "none")
- fill "solid": fill="#333"
- fill "x": fill="white" + two <line> elements corner to corner inside shape bounds
- fill "dot-center": fill="white" + <circle cx="40" cy="40" r="8" fill="#333"/>

### Type-specific question body renderers

renderType1(q): Two side-by-side flex cards:
```html
<div class="analogy-grid">
  <div class="analogy-card">
    <div class="analogy-cell">${q.leftPair[0]}</div>
    <div class="analogy-cell">${q.leftPair[1]}</div>
  </div>
  <div class="analogy-card">
    <div class="analogy-cell">${q.rightTop}</div>
    <div class="analogy-cell blank">?</div>
  </div>
</div>
```

renderType2(q):
```html
<ol class="word-list">
  <li>${q.words[0]}</li><li>${q.words[1]}</li><li>${q.words[2]}</li>
  <li><span class="blank-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
</ol>
```

renderType3(q): `<p>${q.text}</p>` + chart SVG (bar or line based on q.chart.type)

renderType4(q): `<p class="stem"><strong>${q.stem}</strong> <span class="blank-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>`

renderType5(q): numbered list of premises + "Na podstawie powyższych przesłanek, wybierz poprawny wniosek."

renderType6(q): narrative paragraph + HTML table where cell containing "?" has class "cell-ask"

renderType7(q): `<h3>${q.chartTitle}</h3>` + line chart SVG

renderType8(q): 2×2 CSS grid with topLeft, topRight, bottomLeft, and a blank placeholder;
options rendered as clickable divs containing SVG figure group (apply renderFigure() to each spec in the array)

## Mobile-first CSS requirements

```css
/* Base (mobile) */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; font-size: 16px; background: #f0f2f5; color: #1a1a1a; }
.screen { display: none; max-width: 800px; margin: 0 auto; padding: 16px; }
h1 { font-size: clamp(1.4rem, 5vw, 2rem); }
h2 { font-size: clamp(1.2rem, 4vw, 1.6rem); }

/* Options: full-width tappable blocks */
.option {
  display: block; width: 100%; padding: 14px 16px; margin: 8px 0;
  border: 2px solid #d0d0d0; border-radius: 8px; cursor: pointer;
  font-size: 1rem; background: white; text-align: left; min-height: 48px;
}
.option:active { background: #e8f0fe; }
.option.correct { border-color: #27ae60; background: #eafaf1; }
.option.wrong { border-color: #e74c3c; background: #fdf0ef; }

/* Buttons */
button { min-height: 48px; padding: 12px 24px; font-size: 1rem; border-radius: 8px;
  cursor: pointer; border: none; background: #2563eb; color: white; width: 100%; margin-top: 12px; }
button:active { opacity: 0.85; }

/* Header */
.q-header { position: sticky; top: 0; background: white; border-bottom: 1px solid #eee;
  padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
  gap: 8px; z-index: 10; font-size: 0.9rem; }

/* Timer */
.timer { font-weight: bold; min-width: 40px; text-align: right; }
.timer-orange { color: #e67e22; }
.timer-red { color: #e74c3c; }

/* Charts: full-width via viewBox */
svg { max-width: 100%; height: auto; display: block; }

/* Tablet+ */
@media (min-width: 480px) {
  .screen { padding: 24px; }
  button { width: auto; }
}
```

## Implementation notes

- Use innerHTML = ... for all rendering (simpler than createElement)
- Escape user-facing strings if any could contain HTML characters (question text is trusted Polish content, safe to inject directly)
- On DOMContentLoaded: load settings from "ksap_settings", show home screen, hide history button if no sessions
- Test that QUESTIONS is defined before calling buildSession() — if not, show error message: "Błąd: nie znaleziono pliku questions.js"
````

- [ ] **Step 2: Save the Claude output as `index.html` in the project root**

- [ ] **Step 3: Open in browser and run smoke tests**

Open `index.html` from file:// in Chrome (double-click the file). Verify:

| Test | Expected |
|---|---|
| No console errors on load | ✓ |
| Home screen visible with title | ✓ |
| "Nowa sesja" navigates to Setup | ✓ |
| Mode toggle switches between Nauka/Egzamin | ✓ |
| Start session → 15 questions served | ✓ |
| Progress indicator advances each question | ✓ |
| Counter shows "Pytanie N z 15" | ✓ |
| All 8 type renderers visible (check type labels across a few sessions) | ✓ |
| Learning: wrong answer → red; correct always green | ✓ |
| Learning: explanation text appears below options | ✓ |
| Learning: "Dalej →" appears after answering | ✓ |
| Exam: tapping answer → immediately next question | ✓ |
| Timer counts down when enabled | ✓ |
| Timer turns orange at 30s | ✓ |
| Timer turns red at 10s | ✓ |
| Timeout records null answer and advances | ✓ |
| Summary shows correct score out of 15 | ✓ |
| Summary shows ✓/✗/— per question | ✓ |
| Session saved to localStorage | ✓ |
| History screen shows the saved session | ✓ |
| Type 3: bar chart renders with 2 colored series and legend | ✓ |
| Type 3: line chart renders with 2 colored series and legend | ✓ |
| Type 6: table renders with "?" cell highlighted | ✓ |
| Type 7: line chart with title renders | ✓ |
| Type 8: 2×2 figure grid renders | ✓ |
| Type 8: 5 figure options are clickable | ✓ |

- [ ] **Step 4: Mobile responsiveness test**

Chrome DevTools → Toggle Device Toolbar → iPhone SE (375×667 px):

| Mobile test | Expected |
|---|---|
| All text ≥ 14px, readable without zooming | ✓ |
| Option blocks ≥ 48px tall, tappable | ✓ |
| Charts fit screen width (no horizontal scroll) | ✓ |
| Type 1 analogy cards fit side by side or stack gracefully | ✓ |
| Type 8 figure grid fits on screen | ✓ |
| Sticky header stays in place while scrolling | ✓ |
| "Dalej →" button visible without excessive scrolling | ✓ |
| "Rozpocznij →" button full-width on mobile | ✓ |

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add KSAP study app UI (mobile-first, offline, SVG renderers)"
```

---

## Task 3: Bug fixes (if needed after smoke tests)

If any test fails, open a new Claude session with this structure:

```
I have a bug in my KSAP study app (index.html + questions.js, no external deps).

Bug: [describe exactly what's wrong]
Steps to reproduce: [exact steps from a fresh page load]
Expected behaviour: [what should happen]
Actual behaviour: [what actually happens including any console errors]

Relevant code section from index.html:
[paste only the JS function or CSS rule involved — not the whole file]
```

Fix one bug per prompt. Re-run smoke tests after each fix.

- [ ] **Step 6: Final commit after all bugs fixed**

```bash
git add index.html questions.js
git commit -m "fix: resolve smoke test issues in KSAP study app"
```

---

## Spec coverage check

| Spec requirement | Covered in |
|---|---|
| 8 types × 20 questions = 160 | Task 1 Prompt — all 8 type schemas |
| Quality guidelines per type | Task 1 Prompt — per-type QUALITY RULES sections |
| Mobile-first (375px base) | Task 2 Prompt — CSS section, 375px base |
| Touch targets ≥ 48px | Task 2 Prompt — .option min-height: 48px |
| Two files: questions.js + index.html | Task 1 + Task 2 |
| No external dependencies | Task 2 Prompt — Core constraints |
| file:// compatible | Task 2 Prompt — Core constraints |
| Session = 8 guaranteed + 7 random = 15 | Task 2 Prompt — buildSession algorithm |
| Learning mode vs Exam mode | Task 2 Prompt — selectAnswer() behavior |
| Timer 60s, orange/red colors, timeout | Task 2 Prompt — Timer implementation |
| localStorage sessions (max 50) + settings | Task 2 Prompt — saveSession() |
| History screen with per-session detail | Task 2 Prompt — #screen-history |
| SVG bar chart renderer | Task 2 Prompt — renderBarChart() |
| SVG line chart renderer | Task 2 Prompt — renderLineChart() |
| SVG figure renderer (Type 8) | Task 2 Prompt — renderFigure() |
| All 8 type-specific body renderers | Task 2 Prompt — Type-specific renderers section |
| Polish language throughout | Both prompts |
| Explanation shown in learning mode | Task 2 Prompt — selectAnswer() learning branch |
| Progress indicator | Task 2 Prompt — #q-progress in question screen |
