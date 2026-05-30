# Stats Feature + Question Unification — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify question files with globally-unique IDs, persist a per-answer event log in localStorage structured for future DB migration, add a global header with account dropdown, and add a statistics screen showing correct/wrong breakdowns globally and per question type.

**Architecture:** All logic lives in `index.html` (inline CSS + JS) and `questions-unified.js`. The answer log (`ksap_answer_log` in localStorage) is a flat append-only array — one entry per answered question — which maps 1:1 to a future `answers` DB table. Stats are computed from the log on demand when the stats screen opens.

**Tech Stack:** Vanilla HTML/CSS/JS, no build step, no dependencies. localStorage for persistence. Open `index.html` directly in any browser to verify.

**Spec:** `docs/superpowers/specs/2026-05-30-stats-feature-design.md`

---

## File Map

| Action | File | What changes |
|---|---|---|
| Create | `questions-unified.js` | Merges `questions.js` + `questions-hard.js`, new IDs (`e_t1_001`, `h_t1_001`), adds `level` field |
| Create (temp) | `transform.js` | One-time script to generate `questions-unified.js`; deleted after use |
| Delete | `questions.js` | Replaced by `questions-unified.js` |
| Delete | `questions-hard.js` | Replaced by `questions-unified.js` |
| Modify | `index.html` | New `<script>` tag, updated `getQuestionBank()`, answer log functions, header HTML+CSS+JS, stats screen HTML+CSS+JS |

---

## Task 1: Create `questions-unified.js`

**Files:**
- Create: `transform.js` (temp — delete after running)
- Create: `questions-unified.js`

- [ ] **Step 1: Create `transform.js`**

Create this file at the project root:

```js
const fs = require('fs');

let easy = fs.readFileSync('questions.js', 'utf8');
easy = easy.replace(/\bconst QUESTIONS = \{/, 'const QUESTIONS_EASY = {');
easy = easy.replace(/id: "t(\d)/g, 'id: "e_t$1');
easy = easy.replace(/(typeId: \d+,)/g, '$1\n      level: "easy",');

let hard = fs.readFileSync('questions-hard.js', 'utf8');
hard = hard.replace(/"id": "t(\d)/g, '"id": "h_t$1');
hard = hard.replace(/("typeId": \d+,)/g, '$1\n      "level": "hard",');

fs.writeFileSync('questions-unified.js', easy + '\n\n' + hard);
console.log('Done. Verify a few IDs before deleting transform.js.');
```

- [ ] **Step 2: Run the script**

```bash
cd /Users/michalkutra/Dev/competences-mkis
node transform.js
```

Expected output: `Done. Verify a few IDs before deleting transform.js.`

- [ ] **Step 3: Verify output**

```bash
grep -m 5 'id:' questions-unified.js
grep -m 5 '"id"' questions-unified.js
grep -c 'e_t' questions-unified.js
grep -c 'h_t' questions-unified.js
```

Expected: first `grep` shows `id: "e_t1_001"` style entries; second shows `"id": "h_t1_001"` style entries; each count is 160 (one per question).

- [ ] **Step 4: Verify `level` fields**

```bash
grep -m 3 'level:' questions-unified.js
grep -m 3 '"level"' questions-unified.js
```

Expected: `level: "easy",` entries in easy section, `"level": "hard",` entries in hard section.

- [ ] **Step 5: Delete `transform.js`**

```bash
rm transform.js
```

- [ ] **Step 6: Commit**

```bash
git add questions-unified.js
git commit -m "feat: unify question files with globally unique IDs (e_t/h_t prefix)"
```

---

## Task 2: Update `index.html` — wire up `questions-unified.js`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace script tags**

Find in `index.html` (near the bottom, before the main `<script>`):
```html
<!-- questions data -->
<script src="questions.js"></script>
<script src="questions-hard.js"></script>
```

Replace with:
```html
<!-- questions data -->
<script src="questions-unified.js"></script>
```

- [ ] **Step 2: Update `getQuestionBank()`**

Find:
```js
function getQuestionBank() {
    if (state.difficulty === 'hard' && typeof QUESTIONS_HARD !== 'undefined') return QUESTIONS_HARD;
    return QUESTIONS;
  }
```

Replace with:
```js
function getQuestionBank() {
    if (state.difficulty === 'hard') return QUESTIONS_HARD;
    return QUESTIONS_EASY;
  }
```

- [ ] **Step 3: Remove hardBtn disabled guard in `goSetup()`**

Find:
```js
    // Disable hard if not loaded yet
    const hardBtn = document.querySelector('[data-diff="hard"]');
    if (hardBtn) hardBtn.disabled = (typeof QUESTIONS_HARD === 'undefined');
```

Delete those three lines entirely. Both banks are always present in the unified file.

- [ ] **Step 4: Update error banner check in `DOMContentLoaded`**

Find:
```js
    if (typeof QUESTIONS === 'undefined') {
```

Replace with:
```js
    if (typeof QUESTIONS_EASY === 'undefined') {
```

- [ ] **Step 5: Open in browser and verify**

Open `index.html` in a browser. Check:
- Home screen loads without error banner
- Start a session on Easy → questions appear
- Start a session on Hard → questions appear
- Question IDs shown in DevTools console (add `console.log(state.session[0].id)` temporarily to `startSession` if needed)

- [ ] **Step 6: Delete old question files**

```bash
git rm questions.js questions-hard.js
```

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: switch index.html to questions-unified.js, remove old question files"
```

---

## Task 3: Add answer event log

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `getAnswerLog` and `appendAnswerLog` functions**

Inside the main `<script>` block, in the `/* LOCAL STORAGE */` section (after `saveSession`), add:

```js
  function getAnswerLog() {
    try { return JSON.parse(localStorage.getItem('ksap_answer_log') || '[]'); } catch(e) { return []; }
  }

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
```

- [ ] **Step 2: Call `appendAnswerLog` from `saveSession`**

Find the end of `saveSession()`. The last line before the closing `}` is:
```js
    try { localStorage.setItem('ksap_sessions', JSON.stringify(sessions)); } catch(e) {}
```

Add one line after it:
```js
    appendAnswerLog(id);
```

So `saveSession` now ends with:
```js
    if (sessions.length > 50) sessions.length = 50;
    try { localStorage.setItem('ksap_sessions', JSON.stringify(sessions)); } catch(e) {}
    appendAnswerLog(id);
  }
```

- [ ] **Step 3: Verify in browser**

Open `index.html`, complete a full 15-question session. Then open DevTools → Application → Local Storage → find `ksap_answer_log`. It should be a JSON array with 15 entries, each containing `sid`, `qId` (e.g. `"e_t3_007"`), `tid`, `ok`, `ts`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: persist answer event log to ksap_answer_log in localStorage"
```

---

## Task 4: Add global header HTML and CSS

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add header CSS**

Inside the `<style>` block, after the `/* ===== TABLET+ ===== */` media queries at the end, add:

```css
    /* ===== GLOBAL HEADER ===== */
    #global-header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      padding: 0 16px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
    }
    .header-brand {
      font-weight: 700;
      font-size: 0.95rem;
      color: #1e3a5f;
      letter-spacing: 0.02em;
    }
    #header-account {
      position: relative;
    }
    #account-btn {
      background: none;
      border: none;
      min-height: auto;
      width: 36px;
      height: 36px;
      margin: 0;
      padding: 6px;
      cursor: pointer;
      color: #374151;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    #account-btn:hover { background: #f3f4f6; }
    #account-btn:active { background: #e5e7eb; }
    .account-menu {
      position: absolute;
      right: 0;
      top: 44px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      min-width: 180px;
      z-index: 200;
      overflow: hidden;
    }
    .account-menu[hidden] { display: none; }
    .menu-item {
      display: block;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 0.95rem;
      color: #374151;
      text-decoration: none;
    }
    .menu-item:hover { background: #f9fafb; }
    .menu-item:active { background: #eff6ff; }

    /* ===== STATS SCREEN ===== */
    #screen-stats {
      padding: 24px 16px;
    }
    .stat-cards {
      display: flex;
      gap: 12px;
      margin: 20px 0;
    }
    .stat-card {
      flex: 1;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px 8px;
      text-align: center;
    }
    .stat-card-good { border-color: #27ae60; }
    .stat-card-bad  { border-color: #e74c3c; }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 4px;
      color: #1a1a1a;
    }
    .stat-card-good .stat-value { color: #27ae60; }
    .stat-card-bad  .stat-value { color: #e74c3c; }
    .stat-label {
      font-size: 0.72rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }
    @media (min-width: 480px) {
      #screen-stats { padding: 32px 24px; }
    }
    @media (min-width: 1024px) {
      #screen-stats { padding: 40px 32px; }
    }
```

- [ ] **Step 2: Fix home screen height**

The header is in-flow (48px). `#screen-home` has `min-height: 100vh`, which causes the total page to overflow by 48px. Fix it:

Find:
```css
    #screen-home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
```

Replace with:
```css
    #screen-home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 48px);
```

- [ ] **Step 3: Add header HTML**

Find the opening `<body>` tag:
```html
<body>

<img id="bg-illustration" src="bg.png" alt="">
```

Replace with:
```html
<body>

<header id="global-header">
  <span class="header-brand">KSAP Quiz</span>
  <div id="header-account">
    <button id="account-btn" onclick="toggleAccountMenu()" aria-label="Menu konta">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </button>
    <div id="account-menu" class="account-menu" hidden>
      <a class="menu-item" onclick="showScreen('stats'); loadStats(); closeAccountMenu();">Statystyki</a>
      <a class="menu-item" onclick="showScreen('history'); loadHistory(); closeAccountMenu();">Historia sesji</a>
    </div>
  </div>
</header>

<img id="bg-illustration" src="bg.png" alt="">
```

- [ ] **Step 4: Open in browser and verify header renders**

Open `index.html`. Check:
- Header appears at the top with "KSAP Quiz" brand text on the left and person icon on right
- Home screen content is still vertically centred (no overflow scrollbar)
- Clicking the person icon has no effect yet (JS not added)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add global header HTML and CSS, stats screen CSS"
```

---

## Task 5: Header JS behaviour + `showScreen` integration

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `toggleAccountMenu` and `closeAccountMenu` functions**

Inside the main `<script>` block, after the `showScreen` function, add:

```js
  function toggleAccountMenu() {
    const menu = document.getElementById('account-menu');
    if (menu.hasAttribute('hidden')) {
      menu.removeAttribute('hidden');
    } else {
      menu.setAttribute('hidden', '');
    }
  }

  function closeAccountMenu() {
    document.getElementById('account-menu').setAttribute('hidden', '');
  }
```

- [ ] **Step 2: Add outside-click listener**

Inside `DOMContentLoaded` (after the `showScreen('home')` call at the end of the handler), add:

```js
    document.addEventListener('click', function(e) {
      const accountEl = document.getElementById('header-account');
      if (accountEl && !accountEl.contains(e.target)) {
        closeAccountMenu();
      }
    });
```

- [ ] **Step 3: Update `showScreen` to hide header on question screen**

Find `showScreen`:
```js
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
    document.getElementById('screen-' + name).style.display = name === 'home' ? 'flex' : 'block';
    state.screen = name;
    document.body.classList.toggle('hide-bg', name !== 'home' && name !== 'setup');
    window.scrollTo(0, 0);
  }
```

Replace with:
```js
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(el => el.style.display = 'none');
    document.getElementById('screen-' + name).style.display = name === 'home' ? 'flex' : 'block';
    state.screen = name;
    document.body.classList.toggle('hide-bg', name !== 'home' && name !== 'setup');
    document.getElementById('global-header').style.display = name === 'question' ? 'none' : 'flex';
    window.scrollTo(0, 0);
  }
```

- [ ] **Step 4: Open in browser and verify**

- Clicking person icon opens dropdown with "Statystyki" and "Historia sesji"
- Clicking outside the dropdown closes it
- Starting a session (going to question screen) — header disappears
- Finishing session (summary screen) — header reappears
- Clicking "Historia sesji" in dropdown navigates to history screen

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: header dropdown JS, hide header on question screen"
```

---

## Task 6: Add stats screen HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `screen-stats` HTML**

Find:
```html
<!-- ==================== HISTORY ==================== -->
<div id="screen-history" class="screen">
```

Insert before it:
```html
<!-- ==================== STATS ==================== -->
<div id="screen-stats" class="screen">
  <h2>Statystyki</h2>
  <div id="stats-content"></div>
  <button class="secondary" onclick="showScreen('home')" style="max-width:200px; margin-top:20px;">Powrót</button>
</div>

```

- [ ] **Step 2: Verify screen is reachable**

Open `index.html`, click person icon → "Statystyki". The stats screen should appear (empty `stats-content` area for now). Back button ("Powrót") should return to home.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add stats screen HTML skeleton"
```

---

## Task 7: Implement `loadStats()`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `loadStats` function**

Inside the main `<script>` block, after `loadHistory`, add:

```js
  /* ================================================================
     STATS
  ================================================================ */
  function loadStats() {
    const log = getAnswerLog();
    const container = document.getElementById('stats-content');

    if (!log.length) {
      container.innerHTML = '<p class="history-empty">Brak danych — ukończ co najmniej jedną sesję, żeby zobaczyć statystyki.</p>';
      return;
    }

    const total   = log.length;
    const correct = log.filter(function(e) { return e.ok; }).length;
    const wrong   = total - correct;

    var byType = {};
    for (var t = 1; t <= 8; t++) byType[t] = { correct: 0, wrong: 0 };
    log.forEach(function(e) {
      if (byType[e.tid]) {
        if (e.ok) byType[e.tid].correct++;
        else      byType[e.tid].wrong++;
      }
    });

    // Stat cards
    var html = '<div class="stat-cards">';
    html += '<div class="stat-card"><div class="stat-value">' + total + '</div><div class="stat-label">Odpowiedzi</div></div>';
    html += '<div class="stat-card stat-card-good"><div class="stat-value">' + correct + '</div><div class="stat-label">Poprawne</div></div>';
    html += '<div class="stat-card stat-card-bad"><div class="stat-value">' + wrong + '</div><div class="stat-label">Błędne</div></div>';
    html += '</div>';

    // Bar chart (reuses existing renderBarChart)
    html += '<h3 style="margin-bottom:8px">Rozkład per typ pytania</h3>';
    var chartData = {
      type: 'bar',
      xLabels: ['Typ 1', 'Typ 2', 'Typ 3', 'Typ 4', 'Typ 5', 'Typ 6', 'Typ 7', 'Typ 8'],
      datasets: [
        { label: 'Poprawne', data: [1,2,3,4,5,6,7,8].map(function(t) { return byType[t].correct; }), color: '#27ae60' },
        { label: 'Błędne',   data: [1,2,3,4,5,6,7,8].map(function(t) { return byType[t].wrong;   }), color: '#e74c3c' }
      ]
    };
    html += renderBarChart(chartData);

    // Per-type table
    html += '<div class="data-table-wrap" style="margin-top:24px"><table class="summary-table">';
    html += '<thead><tr><th>Typ pytania</th><th style="text-align:center">Odpowiedzi</th><th style="text-align:center">✓ %</th><th style="text-align:center">✗ %</th></tr></thead><tbody>';
    for (var ti = 1; ti <= 8; ti++) {
      var c   = byType[ti].correct;
      var w   = byType[ti].wrong;
      var tot = c + w;
      var correctPct = tot ? Math.round(c / tot * 100) + '%' : '—';
      var wrongPct   = tot ? Math.round(w / tot * 100) + '%' : '—';
      html += '<tr>';
      html += '<td style="font-size:0.78rem">' + escHtml(TYPE_NAMES[ti] || ('Typ ' + ti)) + '</td>';
      html += '<td style="text-align:center">' + (tot || '—') + '</td>';
      html += '<td style="text-align:center;color:#27ae60;font-weight:600">' + correctPct + '</td>';
      html += '<td style="text-align:center;color:#e74c3c;font-weight:600">' + wrongPct   + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table></div>';

    container.innerHTML = html;
  }
```

- [ ] **Step 2: Open in browser and verify — no sessions yet**

Clear localStorage (DevTools → Application → Storage → Clear site data), then open `index.html` → header → Statystyki. Should show: "Brak danych — ukończ co najmniej jedną sesję..."

- [ ] **Step 3: Verify with data**

Complete 2–3 sessions mixing Easy and Hard. Navigate to Statystyki:
- Three stat cards show correct numbers (total = sum of all answered questions across sessions)
- Bar chart renders with green (correct) and red (wrong) bars per type
- Table shows 8 rows with percentages; types with 0 answers show `—`
- Navigating away and back re-renders correctly (no stale data)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: implement loadStats — global totals, per-type bar chart and table"
```

---

## Self-Review Checklist (run before marking plan complete)

- [x] **Spec section 1 (question unification):** Tasks 1–2 cover new IDs, unified file, updated references
- [x] **Spec section 2 (answer event log):** Task 3 covers `getAnswerLog`, `appendAnswerLog`, `saveSession` update
- [x] **Spec section 3 (global header):** Tasks 4–5 cover HTML, CSS, JS, `showScreen` integration
- [x] **Spec section 4 (stats screen):** Tasks 6–7 cover HTML skeleton, `loadStats` with cards/chart/table, empty state
- [x] **Cumulative log never pruned:** `appendAnswerLog` appends to existing array — confirmed no truncation logic
- [x] **Old sessions compatibility:** History/summary screens use `typeId` + `correct` from session data, never look up questions by ID — old sessions still render correctly
- [x] **Function names consistent:** `getAnswerLog` / `appendAnswerLog` / `loadStats` / `toggleAccountMenu` / `closeAccountMenu` — each defined once, called by exact name
- [x] **`renderBarChart` reuse:** `loadStats` calls `renderBarChart(chartData)` which is already defined in `index.html` — no changes to chart renderer needed
- [x] **`escHtml` reuse:** `loadStats` calls `escHtml()` which is already defined
- [x] **`TYPE_NAMES` reuse:** `loadStats` references `TYPE_NAMES` object already defined in `index.html`
