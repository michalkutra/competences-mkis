# Session Detail Screen Design

**Date:** 2026-05-30  
**Status:** Approved

## Overview

Replace the inline "Szczegóły" toggle in the History screen with navigation to a full Session Detail screen. The detail screen renders identically to the end-of-session Summary screen: score badge, time, per-question table, and collapsible wrong-answer review — built from historical localStorage data.

## Scope

- **Affects:** `index.html` only — HTML structure, CSS (minimal), JS
- **Does not affect:** session flow, Summary screen output, Stats screen, question rendering during a session
- **Existing inline detail rows** (`hist-detail-{si}`) and `toggleHistoryDetail()` are removed

## New Functions

### `findQuestionById(id)`

Searches `QUESTIONS` and (if loaded) `QUESTIONS_HARD` for a question where `q.id === id`. Returns the full question object or `null`.

```javascript
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
```

### `buildSummaryHtml(items, meta)`

Extracted from `showSummary()`. Shared renderer for both live-session summary and historical session detail.

**Parameters:**
- `items`: `Array<{q: QuestionObject|null, userAnswer: number|null, correct: boolean, timeSpentSec: number|null}>`
- `meta`: `{score: number, total: number, totalTimeSec: number|null, timerEnabled: boolean}`

**Returns:** HTML string containing:
1. Score badge (`.score-badge.good/ok/poor`)
2. Total time paragraph (`.summary-time`) — shows `—` if `!meta.timerEnabled`
3. Summary table (`.summary-table`) — columns: `#`, `Typ`, `Wynik`, `Czas (s)`; rows from `items`; if `item.q === null`, type cell shows `—`
4. Wrong-answer review section (`.review-section`) — same as existing summary: one `<details class="review-item">` per item where `!correct && userAnswer !== null && q !== null`; collapsed by default

**Does NOT include** action buttons — each caller appends its own.

### `showSummary()` (refactored)

Builds `items` from `state.session` + `state.answers`, `meta` from session state, calls `buildSummaryHtml()`, appends buttons "Nowa sesja" and "Historia", sets `innerHTML`, calls `showScreen('summary')`.

No change to external behavior.

### `showSessionDetail(sessIndex)`

New function navigating to the detail screen for a past session.

1. `const sess = getSessions()[sessIndex]`
2. Build `items`: for each `sq` in `sess.questions`, call `findQuestionById(sq.questionId)` → `{q, userAnswer: sq.userAnswer, correct: sq.correct, timeSpentSec: sq.timeSpentSec}`
3. Build `meta`: `{score: sess.score, total: sess.total, totalTimeSec: sess.totalTimeSec, timerEnabled: sess.timerEnabled}`
4. Build `html = buildSummaryHtml(items, meta)` + button "← Wróć do historii" (`onclick="showScreen('history'); loadHistory();"`) with class `secondary`
5. Set `document.getElementById('session-detail-content').innerHTML = html`
6. Call `showScreen('session-detail')`

## HTML Changes

### New screen element

Add after `#screen-summary`:

```html
<!-- ==================== SESSION DETAIL ==================== -->
<div id="screen-session-detail" class="screen">
  <div id="session-detail-content"></div>
</div>
```

No new CSS needed — inherits `.screen` and all existing summary/review styles.

### History screen changes

In `loadHistory()`:
- Change "Szczegóły" button: `onclick="showSessionDetail(si)"` (was `toggleHistoryDetail(si)`)
- Remove generation of `<tr id="hist-detail-{si}">` inline detail rows
- Remove `colspan="5"` detail cell entirely

Remove `toggleHistoryDetail()` function.

## Navigation

```
History → "Szczegóły" → showSessionDetail(si) → #screen-session-detail
#screen-session-detail → "← Wróć do historii" → showScreen('history') + loadHistory()
```

`showScreen('history')` already hides all other screens correctly — no changes needed there.

## Graceful Degradation

If `findQuestionById()` returns `null` for a question (old session with pre-unification IDs, or question removed from bank):
- Summary table row renders with type from `sq.typeId` lookup via `TYPE_NAMES`, result mark, time
- That question is **excluded** from the wrong-answer review section (no collapsible for it)
- All other questions in the session render normally

## Non-goals

- No animation or transition between screens beyond existing `showScreen()` behavior
- No "session title" or editable metadata
- No deletion of history entries
- No changes to Stats screen or answer log
