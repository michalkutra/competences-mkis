# Session Detail Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the inline "Szczegóły" toggle in History with a dedicated Session Detail screen that renders the same full summary view (score badge, table, collapsible wrong-answer review) from historical localStorage data.

**Architecture:** Extract `buildSummaryHtml(items, meta)` from `showSummary()` so both the live-session summary and the historical detail screen share one renderer. Add `findQuestionById(id)` to look up full question objects from the question bank by stored ID. Add a new `#screen-session-detail` HTML element and `showSessionDetail(sessIndex)` JS function. Update `loadHistory()` to navigate instead of toggle.

**Tech Stack:** Vanilla HTML5, CSS3, plain JS (ES6). Single file: `index.html`. No build step, no framework — manual browser verification replaces automated tests.

---

## Files

- Modify: `index.html` — all changes in this single file

---

### Task 1: Add `findQuestionById`, `buildSummaryHtml`, and refactor `showSummary()`

This task does one atomic replacement: insert two new helper functions before `showSummary()`, and replace `showSummary()` itself with a slim version that delegates to `buildSummaryHtml()`.

**Files:**
- Modify: `index.html` — replace the `showSummary()` function block (lines ~1703–1779)

- [ ] **Step 1: Read `index.html` to find the exact `showSummary()` block**

The function starts with `function showSummary() {` and ends at its closing `}`. Note the exact start and end lines. The block to replace begins at `function showSummary()` and ends at the closing brace of the function (the line containing just `  }`  after `showScreen('summary');`).

- [ ] **Step 2: Replace the entire `showSummary()` function with the new three-function block**

Find the exact text starting with `  function showSummary() {` through its closing `  }` and replace it entirely with:

```javascript
  /* ================================================================
     QUESTION LOOKUP
  ================================================================ */
  function findQuestionById(id) {
    const banks = [QUESTIONS];
    if (typeof QUESTIONS_HARD !== 'undefined') banks.push(QUESTIONS_HARD);
    for (const bank of banks) {
      for (const pool of Object.values(bank)) {
        const q = pool.find(function(q) { return q.id === id; });
        if (q) return q;
      }
    }
    return null;
  }

  /* ================================================================
     SUMMARY RENDERER (shared by summary screen and session detail)
  ================================================================ */
  function buildSummaryHtml(items, meta) {
    let scoreClass = 'poor';
    if (meta.score / meta.total >= 0.8) scoreClass = 'good';
    else if (meta.score / meta.total >= 0.5) scoreClass = 'ok';

    let timeStr = '—';
    if (meta.timerEnabled && meta.totalTimeSec !== null) {
      const m = Math.floor(meta.totalTimeSec / 60);
      const s = meta.totalTimeSec % 60;
      timeStr = m + ':' + String(s).padStart(2, '0');
    }

    let html = '<div class="score-badge ' + scoreClass + '">' + meta.score + '&nbsp;/&nbsp;' + meta.total + '</div>';
    html += '<p class="summary-time">Czas całkowity: <strong>' + timeStr + '</strong></p>';

    html += '<div class="data-table-wrap"><table class="summary-table">';
    html += '<thead><tr><th>#</th><th>Typ</th><th>Wynik</th><th>Czas (s)</th></tr></thead><tbody>';

    items.forEach(function(item, i) {
      const typeName = item.q ? (TYPE_NAMES[item.q.typeId] || ('Typ ' + item.q.typeId)) : '—';
      const markHtml = item.userAnswer === null
        ? '<span class="na-mark">—</span>'
        : item.correct
          ? '<span class="correct-mark">✓</span>'
          : '<span class="wrong-mark">✗</span>';
      const tStr = (item.timeSpentSec !== null && item.timeSpentSec !== undefined) ? item.timeSpentSec : '—';
      html += '<tr><td>' + (i + 1) + '</td><td style="font-size:0.78rem">' + escHtml(typeName) + '</td><td style="text-align:center">' + markHtml + '</td><td style="text-align:center">' + tStr + '</td></tr>';
    });

    html += '</tbody></table></div>';

    const wrongItems = items
      .map(function(item, i) { return { item: item, i: i }; })
      .filter(function(x) { return !x.item.correct && x.item.userAnswer !== null && x.item.q !== null; });

    if (wrongItems.length > 0) {
      html += '<div class="review-section">';
      html += '<h3>Przegląd błędnych odpowiedzi</h3>';
      wrongItems.forEach(function(x) {
        const q = x.item.q;
        const typeName = TYPE_NAMES[q.typeId] || ('Typ ' + q.typeId);
        html += '<details class="review-item">';
        html += '<summary><span><span class="review-summary-wrong">✗</span> Pytanie ' + (x.i + 1) + ' — ' + escHtml(typeName) + '</span></summary>';
        html += '<div class="review-body">';
        html += '<div class="type-label">' + escHtml(typeName) + '</div>';
        html += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
        html += '<div class="question-body">' + renderQuestionBody(q) + '</div>';
        html += renderOptionsStatic(q, x.item.userAnswer);
        html += '<div class="explanation-box"><strong>Wyjaśnienie:</strong> ' + escHtml(q.explanation) + '</div>';
        html += '</div>';
        html += '</details>';
      });
      html += '</div>';
    }

    return html;
  }

  function showSummary() {
    stopTimer();
    saveSession();

    document.getElementById('btn-history').style.display = '';

    const items = state.answers.map(function(a, i) {
      return {
        q: state.session[i] || null,
        userAnswer: a.userAnswer,
        correct: a.correct,
        timeSpentSec: a.timeSpentSec
      };
    });
    const meta = {
      score: state.answers.filter(function(a) { return a.correct; }).length,
      total: state.session.length,
      totalTimeSec: state.sessionStartTime ? Math.floor((Date.now() - state.sessionStartTime) / 1000) : null,
      timerEnabled: state.timerEnabled
    };

    let html = buildSummaryHtml(items, meta);
    html += '<div class="summary-buttons">';
    html += '<button onclick="goSetup()">Nowa sesja</button>';
    html += '<button class="secondary" onclick="showScreen(\'history\'); loadHistory();">Historia</button>';
    html += '</div>';

    document.getElementById('summary-content').innerHTML = html;
    showScreen('summary');
  }
```

- [ ] **Step 3: Verify summary screen still works**

Open the app in a browser. Start a session, answer some questions (get at least one wrong), complete it.

Expected:
- Summary screen looks identical to before: score badge, time, summary table, collapsible review items for wrong answers
- Browser console: no JS errors

Also verify in the console:
```
typeof findQuestionById
typeof buildSummaryHtml
typeof showSummary
```
All three should return `"function"`.

---

### Task 2: Add `#screen-session-detail` HTML and `showSessionDetail()` function

**Files:**
- Modify: `index.html` — add HTML element before `#screen-stats`; add JS function before `getSessions()`

- [ ] **Step 1: Add `#screen-session-detail` HTML element**

Find:
```html
<!-- ==================== STATS ==================== -->
<div id="screen-stats" class="screen">
```

Insert immediately before it:
```html
<!-- ==================== SESSION DETAIL ==================== -->
<div id="screen-session-detail" class="screen">
  <div id="session-detail-content"></div>
</div>

```

- [ ] **Step 2: Add `showSessionDetail()` function**

Find the line `  function getSessions() {` and insert this block immediately before it:

```javascript
  function showSessionDetail(sessIndex) {
    const sess = getSessions()[sessIndex];
    if (!sess) return;

    const items = (sess.questions || []).map(function(sq) {
      return {
        q: findQuestionById(sq.questionId),
        userAnswer: sq.userAnswer,
        correct: sq.correct,
        timeSpentSec: sq.timeSpentSec !== undefined ? sq.timeSpentSec : null
      };
    });
    const meta = {
      score: sess.score,
      total: sess.total || items.length,
      totalTimeSec: sess.totalTimeSec,
      timerEnabled: sess.timerEnabled
    };

    let html = buildSummaryHtml(items, meta);
    html += '<div class="summary-buttons">';
    html += '<button class="secondary" onclick="showScreen(\'history\'); loadHistory();">← Wróć do historii</button>';
    html += '</div>';

    document.getElementById('session-detail-content').innerHTML = html;
    showScreen('session-detail');
  }

```

- [ ] **Step 3: Verify in browser console**

```
typeof showSessionDetail
```
Expected: `"function"`

---

### Task 3: Update `loadHistory()` and remove `toggleHistoryDetail()`

**Files:**
- Modify: `index.html` — update `loadHistory()` button + remove inline detail rows; delete `toggleHistoryDetail()`

- [ ] **Step 1: Replace Szczegóły button and remove inline detail rows in `loadHistory()`**

Find this exact block inside `loadHistory()`:

```javascript
      html += '<td><button class="btn-sm" onclick="toggleHistoryDetail(' + si + ')">Szczegóły</button></td>';
      html += '</tr>';

      // Detail row (hidden initially)
      html += '<tr id="hist-detail-' + si + '" class="detail-row" style="display:none"><td colspan="5">';
      html += '<div class="detail-inner">';
      if (sess.questions && sess.questions.length) {
        html += '<table class="detail-table"><thead><tr><th>#</th><th>Typ</th><th>Wynik</th><th>Czas (s)</th></tr></thead><tbody>';
        sess.questions.forEach(function(q, qi) {
          const tName = q.typeId ? (TYPE_NAMES[q.typeId] || 'Typ ' + q.typeId) : '—';
          const markHtml = q.userAnswer === null
            ? '<span class="na-mark">—</span>'
            : q.correct
              ? '<span class="correct-mark">✓</span>'
              : '<span class="wrong-mark">✗</span>';
          const tStr = q.timeSpentSec !== null && q.timeSpentSec !== undefined ? q.timeSpentSec : '—';
          html += '<tr><td>' + (qi + 1) + '</td><td style="font-size:0.75rem">' + escHtml(tName) + '</td><td style="text-align:center">' + markHtml + '</td><td style="text-align:center">' + tStr + '</td></tr>';
        });
        html += '</tbody></table>';
      } else {
        html += '<p style="padding:8px;color:#6b7280">Brak szczegółowych danych.</p>';
      }
      html += '</div></td></tr>';
```

Replace with:
```javascript
      html += '<td><button class="btn-sm" onclick="showSessionDetail(' + si + ')">Szczegóły</button></td>';
      html += '</tr>';
```

- [ ] **Step 2: Remove `toggleHistoryDetail()` function**

Find and delete the entire function (including any surrounding blank lines):
```javascript
  function toggleHistoryDetail(si) {
    const row = document.getElementById('hist-detail-' + si);
    if (!row) return;
    row.style.display = (row.style.display === 'none') ? '' : 'none';
    // Update button text
    const btn = document.querySelector('#hist-row-' + si + ' .btn-sm');
    if (btn) btn.textContent = row.style.display === 'none' ? 'Szczegóły' : 'Ukryj';
  }
```

- [ ] **Step 3: Manual verification — full navigation flow**

1. Open the app in a browser. Complete a session (get some wrong answers).
2. Go to Historia.
3. Click "Szczegóły" on a row.

Expected:
- Navigates away from History to a new full-page view
- Shows score badge, time, summary table with ✓/✗ per question
- Shows "Przegląd błędnych odpowiedzi" section with collapsible items for wrong answers
- Each item expands to show question body, options (wrong=red, correct=green), explanation

4. Click "← Wróć do historii".

Expected:
- Returns to History screen with the session table populated

5. Console: no JS errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add session detail screen with full summary view from history"
```
