# Wrong Answer Review — Summary Screen

**Date:** 2026-05-30  
**Status:** Approved

## Overview

After a session ends (both Learning and Exam modes), the summary screen gains a collapsible review section listing every incorrectly answered question. The user can expand each item individually to see the full question, highlighted wrong/correct answers, and the explanation — identical to the feedback shown in Learning mode during a session.

## Scope

- **Affects:** `showSummary()` in `index.html` only. Nothing that happens during a session is touched.
- **Both modes:** Learning and Exam.
- **Excluded:** Questions skipped without an answer (`userAnswer === null`).

## UI Structure

```
[Score badge]
[Total time]
[Summary table]

--- NEW ---
Przegląd błędnych odpowiedzi       ← h3 header, only if wrong count > 0

  ▸ ✗ Pytanie 3 — ANALOGIA SŁOWNA — MACIERZ   ← <details> collapsed
  ▸ ✗ Pytanie 7 — WNIOSKOWANIE LOGICZNE
  ...

--- END NEW ---

[Nowa sesja]  [Historia]
```

Each `<details>` element when expanded shows:

```
[type-label badge]
[instruction block]
[question body — same renderer as during session]
[options — disabled, wrong answer red, correct answer green]
[explanation-box]
```

## Implementation

### New CSS classes

`.review-section` — wrapper div, `margin-top: 24px`, `text-align: left`

`.review-item` — each `<details>` element; `border: 1px solid #e5e7eb`, `border-radius: 8px`, `margin-bottom: 8px`, `overflow: hidden`

`.review-item summary` — padding, font-weight 600, cursor pointer, flex layout, `list-style: none`; arrow `::after` content `'▸'` same as `.advanced-settings summary`

`.review-item[open] summary::after` — `transform: rotate(90deg)`

`.review-body` — inner padding div inside each `<details>`

### New JS function: `renderOptionsStatic(q, userAnswer)`

Returns HTML string for the options container. Same structure as `renderQuestion()` options block, but:
- No `onclick` attributes
- All options get `.disabled` class
- Option at index `q.correct` gets `.correct` class
- Option at index `userAnswer` gets `.wrong` class (if `userAnswer !== q.correct`)
- Supports both standard options (type 1–7) and figure options (type 8)

### Changes to `showSummary()`

After building the summary table HTML, before the buttons block:

1. Filter `state.answers` for `!a.correct && a.userAnswer !== null` → `wrongAnswers`
2. If `wrongAnswers.length === 0`, skip the section entirely
3. Otherwise build a `<div class="review-section">` with:
   - `<h3>Przegląd błędnych odpowiedzi</h3>`
   - One `<details class="review-item">` per wrong answer:
     - `<summary>` with `✗ Pytanie {i+1} — {typeName}`
     - `<div class="review-body">` containing: type-label, instruction, `renderQuestionBody(q)`, `renderOptionsStatic(q, a.userAnswer)`, explanation-box
4. Append review section HTML before the buttons block

## Data Dependencies

- `state.session[i]` — the question object (available in `showSummary` scope)
- `state.answers[i]` — `{ userAnswer, correct }` (already used in `showSummary`)
- `renderQuestionBody(q)` — existing function, reused as-is
- `TYPE_NAMES` — existing constant, reused as-is
- `escHtml()` — existing utility, reused as-is

## Non-goals

- No "expand all / collapse all" button
- No animation beyond native `<details>` browser default
- No changes to session flow, learning mode feedback, or history screen
