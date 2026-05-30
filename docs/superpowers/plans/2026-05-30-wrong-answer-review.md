# Wrong Answer Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a collapsible per-question review section at the bottom of the summary screen, showing each incorrectly answered question with the wrong answer highlighted red, correct answer green, and explanation — matching learning-mode feedback style.

**Architecture:** Single-file vanilla HTML/JS app (`index.html`). No framework, no build step. Three additions: (1) CSS rules for the review section, (2) a new `renderOptionsStatic()` JS function, (3) a block appended to `showSummary()` that builds and inserts the review HTML before the action buttons.

**Tech Stack:** Vanilla HTML5, CSS3, plain JS (ES5-compatible). No external dependencies.

> **Note on TDD:** This app has no test infrastructure. Each task ends with a manual browser verification step instead of an automated test run.

---

## Files

- Modify: `index.html` — all changes live here

---

### Task 1: Add CSS for the review section

**Files:**
- Modify: `index.html` — add rules inside the `<style>` block, after the `/* ===== SUMMARY SCREEN ===== */` section (around line 583)

- [ ] **Step 1: Open `index.html` and locate the CSS insertion point**

Find the comment `/* ===== HISTORY SCREEN ===== */` (currently at ~line 585). The new CSS block goes immediately before it.

- [ ] **Step 2: Insert the CSS block**

Add this block between `/* ===== SUMMARY SCREEN ===== */` styles and `/* ===== HISTORY SCREEN ===== */`:

```css
/* ===== WRONG ANSWER REVIEW ===== */
.review-section {
  margin-top: 24px;
  text-align: left;
}
.review-section h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 12px;
}
.review-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.review-item summary {
  list-style: none;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  gap: 8px;
}
.review-item summary::-webkit-details-marker { display: none; }
.review-item summary::after {
  content: '▸';
  font-size: 0.8rem;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.review-item[open] summary::after { transform: rotate(90deg); }
.review-summary-wrong {
  color: #e74c3c;
  font-weight: 700;
  margin-right: 4px;
}
.review-body {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}
```

- [ ] **Step 3: Open `index.html` in the browser and verify the page loads without errors**

Open the browser console — no CSS parse errors expected. The page should look and function identically to before (no review items appear yet, no wrong answers have been recorded).

---

### Task 2: Add `renderOptionsStatic(q, userAnswer)` function

**Files:**
- Modify: `index.html` — add function in the `<script>` block, immediately after the `renderQuestionBody()` / type renderers section (after `renderType8()`, before the SVG renderers section)

- [ ] **Step 1: Locate the insertion point**

Find the comment `/* ================================================================
   SVG RENDERERS
================================================================ */` (currently around line 1146). Insert the new function immediately before it.

- [ ] **Step 2: Insert `renderOptionsStatic`**

```javascript
/* ================================================================
   STATIC OPTIONS RENDERER (for wrong-answer review)
================================================================ */
function renderOptionsStatic(q, userAnswer) {
  var html = '';
  if (q.typeId !== 8) {
    html += '<div class="options">';
    q.options.forEach(function(opt, i) {
      var cls = 'option disabled';
      if (i === q.correct) cls += ' correct';
      else if (i === userAnswer) cls += ' wrong';
      html += '<div class="' + cls + '">' + escHtml(opt) + '</div>';
    });
    html += '</div>';
  } else {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    html += '<div class="figure-options-row">';
    q.options.forEach(function(specs, i) {
      var letter = letters[i] || (i + 1).toString();
      var cls = 'figure-option disabled';
      if (i === q.correct) cls += ' correct';
      else if (i === userAnswer) cls += ' wrong';
      html += '<div class="' + cls + '">';
      specs.forEach(function(spec) {
        html += renderFigure(spec);
      });
      html += '<span class="figure-option-label">' + letter + ')</span>';
      html += '</div>';
    });
    html += '</div>';
  }
  return html;
}
```

- [ ] **Step 3: Verify in browser console that the function is defined**

Open the browser console and type:
```
typeof renderOptionsStatic
```
Expected output: `"function"`

---

### Task 3: Build and insert the review section in `showSummary()`

**Files:**
- Modify: `index.html` — modify `showSummary()` (currently around line 1443)

- [ ] **Step 1: Locate the buttons block inside `showSummary()`**

Find this block near the end of `showSummary()`:

```javascript
html += '<div class="summary-buttons">';
html += '<button onclick="goSetup()">Nowa sesja</button>';
html += '<button class="secondary" onclick="showScreen(\'history\'); loadHistory();">Historia</button>';
html += '</div>';
```

- [ ] **Step 2: Insert the review section block immediately before the buttons block**

Add the following immediately before `html += '<div class="summary-buttons">';`:

```javascript
// Wrong answer review section
var wrongAnswers = state.answers
  .map(function(a, i) { return { a: a, i: i }; })
  .filter(function(x) { return !x.a.correct && x.a.userAnswer !== null; });

if (wrongAnswers.length > 0) {
  html += '<div class="review-section">';
  html += '<h3>Przegląd błędnych odpowiedzi</h3>';
  wrongAnswers.forEach(function(x) {
    var q = state.session[x.i];
    var typeName = TYPE_NAMES[q.typeId] || ('Typ ' + q.typeId);
    html += '<details class="review-item">';
    html += '<summary><span class="review-summary-wrong">✗</span> Pytanie ' + (x.i + 1) + ' — ' + escHtml(typeName) + '</summary>';
    html += '<div class="review-body">';
    html += '<div class="type-label">' + escHtml(typeName) + '</div>';
    html += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
    html += '<div class="question-body">' + renderQuestionBody(q) + '</div>';
    html += renderOptionsStatic(q, x.a.userAnswer);
    html += '<div class="explanation-box"><strong>Wyjaśnienie:</strong> ' + escHtml(q.explanation) + '</div>';
    html += '</div>';
    html += '</details>';
  });
  html += '</div>';
}
```

- [ ] **Step 3: Manual verification — happy path (wrong answers exist)**

1. Open the app in a browser
2. Start a new session (Learning or Exam mode)
3. Intentionally answer at least 2 questions incorrectly
4. Complete the session
5. On the summary screen, verify:
   - Section header "Przegląd błędnych odpowiedzi" appears below the summary table
   - One `<details>` row per wrong answer, each showing `✗ Pytanie X — [type name]`
   - All items are collapsed by default
   - Clicking an item expands it to show: type-label badge, instruction, question body, options (wrong in red, correct in green, all non-clickable), explanation box
   - Clicking again collapses it
   - Arrow rotates on open/close

- [ ] **Step 4: Manual verification — edge case (all correct)**

1. Start a new session
2. Answer all questions correctly (or use browser console: `state.answers.forEach(a => a.correct = true)` after answering)
3. Complete the session
4. Verify: no "Przegląd błędnych odpowiedzi" section appears on the summary screen

- [ ] **Step 5: Manual verification — type 8 (figure options)**

1. Start a session on Easy difficulty
2. Find the "POWIĄZANIA FIGUR" question (type 8) and answer it incorrectly
3. On the summary screen, expand that item
4. Verify: figure options render correctly with proper correct/wrong highlighting

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add collapsible wrong-answer review on summary screen"
```
