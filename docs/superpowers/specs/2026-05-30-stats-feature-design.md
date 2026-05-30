# Stats Feature + Question Unification — Design

**Date:** 2026-05-30
**Scope:** Three interconnected changes shipped as one PR:
1. Unify `questions.js` + `questions-hard.js` into `questions-unified.js` with globally unique IDs
2. Persist a per-answer event log in localStorage (`ksap_answer_log`) — structured for future DB migration
3. Global header with account dropdown (Statystyki, Historia sesji) visible on all non-question screens
4. New statistics screen with global totals and per-type breakdown

---

## 1. Question File Unification

### Motivation
Both `questions.js` and `questions-hard.js` use identical IDs (`t1_001`–`t1_020`). A future `answers` table in a DB would need a composite FK `(question_id, level)` to reference questions unambiguously. Giving questions globally unique IDs collapses this to a single `question_id` FK.

### New file: `questions-unified.js`

Replaces both source files. Exports two constants with the same shape as today:

```js
const QUESTIONS_EASY = {
  type1: [ /* 20 items */ ],
  // …type8
};
const QUESTIONS_HARD = {
  type1: [ /* 20 items */ ],
  // …type8
};
```

### ID format

| Level | Format | Example |
|---|---|---|
| easy | `e_t{type}_{num}` | `e_t1_001` |
| hard | `h_t{type}_{num}` | `h_t1_001` |

Every question also carries an explicit `level` field:

```js
{
  id: "e_t3_007",
  typeId: 3,
  level: "easy",        // NEW
  instruction: "...",
  // …all other existing fields unchanged
}
```

### Changes to `index.html`

- Replace two `<script>` tags with one: `<script src="questions-unified.js"></script>`
- `getQuestionBank()` returns `QUESTIONS_EASY` or `QUESTIONS_HARD` (name change from `QUESTIONS` to `QUESTIONS_EASY`)
- No other logic changes — the returned object shape `{ type1: [...], …type8: [...] }` is identical

### Backwards compatibility of saved sessions

Old sessions in `ksap_sessions` reference old IDs (e.g. `t1_007`). The history and summary screens display `typeId` and `correct` — they do not look up question objects by ID — so old session records render correctly without migration.

---

## 2. Answer Event Log

### localStorage key: `ksap_answer_log`

A flat array, append-only, never pruned (unlike `ksap_sessions` which is capped at 50).

```ts
type AnswerLogEntry = {
  sid: string;    // session ID (UUID)
  qId: string;    // question ID, e.g. "e_t3_007"
  tid: number;    // type ID 1–8
  ok:  boolean;   // true = correct; false = wrong OR timed-out (userAnswer === null)
  ts:  string;    // ISO 8601 timestamp
};
```

### Future DB mapping

```sql
CREATE TABLE answers (
  id          SERIAL PRIMARY KEY,
  session_id  UUID NOT NULL REFERENCES sessions(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  is_correct  BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ NOT NULL
);
```

Adding user accounts = `ALTER TABLE sessions ADD COLUMN user_id UUID REFERENCES users(id)`.

### Write path: `appendAnswerLog(sessionId)`

Called at the end of `saveSession()`, after the session is persisted. Reads the current log, appends one entry per answer in `state.answers`, writes back.

```js
function appendAnswerLog(sessionId) {
  const log = getAnswerLog();
  const ts = new Date().toISOString();
  state.answers.forEach(function(a, i) {
    const q = state.session[i];
    if (!q) return;
    log.push({ sid: sessionId, qId: q.id, tid: q.typeId, ok: a.correct, ts: ts });
  });
  try { localStorage.setItem('ksap_answer_log', JSON.stringify(log)); } catch(e) {}
}

function getAnswerLog() {
  try { return JSON.parse(localStorage.getItem('ksap_answer_log') || '[]'); } catch(e) { return []; }
}
```

Note: as of current code, the timer expiring does not auto-advance — the "Dalej →" button stays disabled until the user selects an answer. So `state.answers` always contains exactly one entry per session question by the time `saveSession` is called; there are no `userAnswer: null` entries to handle.

---

## 3. Global Header

### Visibility

Shown on: `home`, `setup`, `summary`, `history`, `stats`.
Hidden on: `question` (that screen has its own sticky `q-header`).

`showScreen()` adds one line: `globalHeader.style.display = name === 'question' ? 'none' : 'flex'`.

### HTML

```html
<header id="global-header">
  <span class="header-brand">KSAP Quiz</span>
  <div id="header-account" class="header-account">
    <button id="account-btn" onclick="toggleAccountMenu()" aria-label="Menu konta">
      <!-- SVG: person silhouette, 24×24 -->
    </button>
    <div id="account-menu" class="account-menu" hidden>
      <a class="menu-item" onclick="showScreen('stats'); loadStats(); closeAccountMenu();">Statystyki</a>
      <a class="menu-item" onclick="showScreen('history'); loadHistory(); closeAccountMenu();">Historia sesji</a>
    </div>
  </div>
</header>
```

### CSS

- `position: sticky; top: 0; z-index: 100`
- Height: `48px`; `display: flex; align-items: center; justify-content: space-between`
- Background: `white`; `border-bottom: 1px solid #e5e7eb`
- `body` gets `padding-top: 0` — header is in flow, not fixed, so no offset needed
- `#screen-home` keeps `min-height: 100vh` — header is in-flow so the browser accounts for it naturally; no adjustment needed
- Dropdown: `position: absolute; right: 0; top: 48px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); min-width: 180px; z-index: 200`
- `.menu-item`: `display: block; padding: 12px 16px; cursor: pointer; font-size: 0.95rem`; hover: `background: #f9fafb`

### Dropdown close behaviour

```js
document.addEventListener('click', function(e) {
  if (!document.getElementById('header-account').contains(e.target)) {
    closeAccountMenu();
  }
});
```

---

## 4. Statistics Screen

### New screen: `screen-stats`

Accessible via header dropdown. Back button returns to `home`.

### `loadStats()` — computation

```js
function loadStats() {
  const log = getAnswerLog();
  // global
  const total   = log.length;
  const correct = log.filter(e => e.ok).length;
  const wrong   = total - correct;
  // per type
  const byType = {};
  for (let t = 1; t <= 8; t++) byType[t] = { correct: 0, wrong: 0 };
  log.forEach(e => { if (e.ok) byType[e.tid].correct++; else byType[e.tid].wrong++; });
  renderStats(total, correct, wrong, byType);
}
```

### Layout

**Global summary cards (3 tiles):**
- Total answers | Correct (green) | Wrong (red)

**Bar chart (SVG — reuses existing `renderBarChart()`):**
- xLabels: shortened type names (8 labels)
- datasets: `[{ label: "Poprawne", color: "#27ae60", data: [c1..c8] }, { label: "Błędne", color: "#e74c3c", data: [w1..w8] }]`

**Per-type table:**

| Typ pytania | Odpowiedzi | Poprawne | % popr. | Błędne | % błędne |
|---|---|---|---|---|---|
| Analogia słowna | 42 | 35 | 83% | 7 | 17% |
| … | … | … | … | … | … |

Rows sorted by type ID (1–8). Percentage shown as integer (`Math.round`). If a type has 0 answers, shows `—` instead of percentages.

**Empty state:** when `log.length === 0`:
```
Brak danych — ukończ co najmniej jedną sesję, żeby zobaczyć statystyki.
```

---

## 5. Out of Scope

- Resetting / deleting the answer log via UI (not requested)
- Migrating old `ksap_sessions` entries to `ksap_answer_log` (old sessions render correctly without migration)
- Per-question drill-down (which specific question IDs were hardest)
- Charts other than the existing `renderBarChart` SVG renderer
