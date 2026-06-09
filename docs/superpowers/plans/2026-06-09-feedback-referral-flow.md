# Flow satysfakcji + polecenia (Web3Forms) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Po sesji pokazać binarny sygnał 👍/👎; po 👍 zachęcić do polecenia strony, po 👎 zebrać feedback — wszystko przez istniejący Web3Forms, bez backendu.

**Architecture:** Czysta logika decyzyjna (cooldown, próg proaktywny, treść share) w nowym module `web/feedback.js` (UMD, testowany node+vm — wzór: `web/pwa-install.js` + `tools/test-pwa-install.js`). DOM/efekty/fetch/GA w `web/index.html`: widget inline na ekranie wyników + modal 3-stage'owy (wzór: `#bug-report-modal`). Stan w localStorage (`ksap_feedback_*`).

**Tech Stack:** Vanilla JS (ES5-style, jak reszta pliku), localStorage, Web3Forms API, `navigator.share`, GA4 `gtag`. Brak frameworka, brak buildu. Testy: `node` + `vm` (wbudowane).

**Spec:** [docs/superpowers/specs/2026-06-09-feedback-referral-flow-design.md](../specs/2026-06-09-feedback-referral-flow-design.md)

---

## ⚠️ Polityka commitów

Repo (CLAUDE.md) **zabrania automatycznych commitów**. NIE uruchamiaj `git commit` podczas wykonywania planu. Każde „Checkpoint" niżej to logiczny punkt podziału — użytkownik commituje sam, gdy zdecyduje. Po zakończeniu zadania pokaż `git status`/diff i poczekaj.

## Plik po pliku

- **`web/feedback.js`** (NOWY) — czyste funkcje: `isInCooldown`, `decideThumbClick`, `shouldShowProactive`, `buildShareMessage` + stałe `FEEDBACK_COOLDOWN_DAYS`, `FEEDBACK_PROACTIVE_MIN_ANSWERS`, `FEEDBACK_SHARE_URL`, `FEEDBACK_SHARE_TEXT`, `FEEDBACK_SHARE_TITLE`. Zero DOM, zero side-effectów. Eksport na `window`/`globalThis`.
- **`tools/test-feedback.js`** (NOWY) — testy node+vm dla `web/feedback.js`.
- **`web/index.html`** (MODYFIKACJA):
  - CSS: reguły `.feedback-inline*` (sekcja stylów ~L1227-1238).
  - Markup: `<div id="feedback-modal">` po bloku bug-report (~L1214).
  - `<script src="feedback.js">` obok pozostałych includów (~L1389).
  - JS: globalna `feedbackInlineHtml()` + globalny obiekt `feedbackFlow` (po `onBugReportFailure`, ~L2557).
  - Wpięcie: `buildSummaryHtml()` (widget inline) + `showSummary()` (trigger proaktywny).
- **`BACKLOG.md`** — zaktualizowany osobno przy tworzeniu planu (poza tym planem).

---

## Task 1: Czysty moduł logiki `web/feedback.js` (TDD)

**Files:**
- Create: `web/feedback.js`
- Create: `tools/test-feedback.js`

- [ ] **Step 1: Napisz failing test `tools/test-feedback.js`**

```js
// tools/test-feedback.js
// Test czystej logiki flow feedbacku (web/feedback.js).
// Uruchomienie: node tools/test-feedback.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function load(path) {
  const code = fs.readFileSync(path, 'utf8');
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}
const m = load(__dirname + '/../web/feedback.js');

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1717500000000;
const COOL = m.FEEDBACK_COOLDOWN_DAYS;          // 5
const MIN = m.FEEDBACK_PROACTIVE_MIN_ANSWERS;   // 45

// --- isInCooldown ---
assert.strictEqual(m.isInCooldown(0, NOW), false, 'brak completedAt → poza cooldownem');
assert.strictEqual(m.isInCooldown(NOW - 1000, NOW), true, 'tuż po ukończeniu → w cooldownie');
assert.strictEqual(m.isInCooldown(NOW - (COOL * DAY) + 1000, NOW), true, 'dzień przed końcem → w cooldownie');
assert.strictEqual(m.isInCooldown(NOW - (COOL * DAY) - 1000, NOW), false, 'po 5 dniach → poza cooldownem');

// --- decideThumbClick ---
// 👎 zawsze otwiera 2B, nawet w cooldownie
assert.deepStrictEqual(
  m.decideThumbClick({ value: 'down', completedAtMs: NOW - 1000, nowMs: NOW }),
  { action: 'open', stage: '2B' }, '👎 w cooldownie → open 2B');
assert.deepStrictEqual(
  m.decideThumbClick({ value: 'down', completedAtMs: 0, nowMs: NOW }),
  { action: 'open', stage: '2B' }, '👎 bez cooldownu → open 2B');
// 👍 poza cooldownem → open 2A
assert.deepStrictEqual(
  m.decideThumbClick({ value: 'up', completedAtMs: 0, nowMs: NOW }),
  { action: 'open', stage: '2A' }, '👍 bez cooldownu → open 2A');
// 👍 w cooldownie → ack (bez modala)
assert.deepStrictEqual(
  m.decideThumbClick({ value: 'up', completedAtMs: NOW - 1000, nowMs: NOW }),
  { action: 'ack', stage: '2A' }, '👍 w cooldownie → ack');

// --- shouldShowProactive ---
const base = { voted: false, proactiveAtMs: 0, answerCount: MIN, nowMs: NOW };
assert.strictEqual(m.shouldShowProactive(base), true, 'niezagłosowany + próg → pokaż');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { voted: true })), false, 'już głosował → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { answerCount: MIN - 1 })), false, 'poniżej progu → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { proactiveAtMs: NOW - 1000 })), false, 'pokazany niedawno → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { proactiveAtMs: NOW - (COOL * DAY) - 1000 })), true, 'pokazany >5 dni temu → pokaż znów');

// --- buildShareMessage ---
const msg = m.buildShareMessage();
assert.ok(msg.indexOf(m.FEEDBACK_SHARE_URL) !== -1, 'wiadomość zawiera URL');
assert.ok(msg.indexOf('http') === msg.lastIndexOf('http'), 'tylko jeden URL w wiadomości');

console.log('OK — wszystkie testy feedback przeszły');
```

- [ ] **Step 2: Uruchom test — ma paść (brak pliku)**

Run: `node tools/test-feedback.js`
Expected: FAIL — `Error: ENOENT ... web/feedback.js` (plik nie istnieje).

- [ ] **Step 3: Zaimplementuj `web/feedback.js`**

```js
// web/feedback.js
// Czysta logika flow satysfakcji + polecenia (cooldown, próg proaktywny, treść share).
// Bez DOM, bez side-effectów. Testowane przez tools/test-feedback.js (node + vm).
// Eksport: window (przeglądarka) lub globalThis (node/vm).
(function (root) {
  'use strict';

  var FEEDBACK_COOLDOWN_DAYS = 5;
  var FEEDBACK_PROACTIVE_MIN_ANSWERS = 45;
  var FEEDBACK_SHARE_URL = 'https://egzamin.kutra.pl/';
  var FEEDBACK_SHARE_TITLE = 'Ćwiczenia przed egzaminem na urzędnika mianowanego';
  var FEEDBACK_SHARE_TEXT = 'Jeśli też przygotowujesz się do egzaminu na urzędnika mianowanego (Sprawdzian Umiejętności KSAP) — jest darmowa strona do ćwiczeń, polecam: ';

  var DAY_MS = 24 * 60 * 60 * 1000;

  // completedAtMs: epoch (ms) ostatniego ukończenia, 0/falsy = nigdy.
  function isInCooldown(completedAtMs, nowMs) {
    if (!completedAtMs) return false;
    return (nowMs - completedAtMs) < (FEEDBACK_COOLDOWN_DAYS * DAY_MS);
  }

  // value: 'up'|'down'. Zwraca { action:'open'|'ack', stage:'2A'|'2B' }.
  // 👎 zawsze otwiera 2B (omija cooldown). 👍 w cooldownie → ack (bez modala).
  function decideThumbClick(opts) {
    opts = opts || {};
    if (opts.value === 'down') return { action: 'open', stage: '2B' };
    if (isInCooldown(opts.completedAtMs, opts.nowMs)) return { action: 'ack', stage: '2A' };
    return { action: 'open', stage: '2A' };
  }

  // Czy pokazać proaktywny modal na summary.
  function shouldShowProactive(opts) {
    opts = opts || {};
    if (opts.voted) return false;
    if ((opts.answerCount || 0) < FEEDBACK_PROACTIVE_MIN_ANSWERS) return false;
    if (opts.proactiveAtMs && (opts.nowMs - opts.proactiveAtMs) < (FEEDBACK_COOLDOWN_DAYS * DAY_MS)) return false;
    return true;
  }

  function buildShareMessage() {
    return FEEDBACK_SHARE_TEXT + FEEDBACK_SHARE_URL;
  }

  root.FEEDBACK_COOLDOWN_DAYS = FEEDBACK_COOLDOWN_DAYS;
  root.FEEDBACK_PROACTIVE_MIN_ANSWERS = FEEDBACK_PROACTIVE_MIN_ANSWERS;
  root.FEEDBACK_SHARE_URL = FEEDBACK_SHARE_URL;
  root.FEEDBACK_SHARE_TITLE = FEEDBACK_SHARE_TITLE;
  root.FEEDBACK_SHARE_TEXT = FEEDBACK_SHARE_TEXT;
  root.isInCooldown = isInCooldown;
  root.decideThumbClick = decideThumbClick;
  root.shouldShowProactive = shouldShowProactive;
  root.buildShareMessage = buildShareMessage;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Uruchom test — ma przejść**

Run: `node tools/test-feedback.js`
Expected: `OK — wszystkie testy feedback przeszły`

- [ ] **Step 5: Checkpoint (bez commitu)**

Zmienione: `web/feedback.js` (nowy), `tools/test-feedback.js` (nowy). Pokaż `git status`. NIE commituj.

---

## Task 2: CSS + markup modala + include skryptu

**Files:**
- Modify: `web/index.html` (CSS ~L1238, markup ~L1214, include ~L1389)

- [ ] **Step 1: Dodaj CSS dla widgetu inline**

Znajdź linię (`web/index.html:1238`):
```css
  .pwa-modal-box p { font-size: 0.9rem; color: #4b5563; margin: 0 0 14px; }
```
Dodaj BEZPOŚREDNIO po niej:
```css
  .feedback-inline { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; justify-content: center; margin: 16px 0; padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; }
  .feedback-inline-q { font-size: 0.92rem; color: #166534; font-weight: 600; }
  .feedback-inline-btns { display: flex; gap: 8px; }
  #feedback-inline-ack { font-size: 0.92rem; color: #166534; font-weight: 600; }
```

- [ ] **Step 2: Dodaj markup modala feedbacku**

Znajdź zamknięcie modala bug-report (`web/index.html:1214`):
```html
  </div>
</div>

<!-- ==================== SESSION DETAIL ==================== -->
```
Wstaw BEZPOŚREDNIO przed komentarzem `<!-- ==================== SESSION DETAIL ==================== -->`:
```html
<!-- ==================== FEEDBACK MODAL ==================== -->
<div id="feedback-modal" class="pwa-modal" style="display:none">
  <div class="pwa-modal-box">
    <!-- Stage 1: łapki (tylko modal proaktywny) -->
    <div id="feedback-stage-1" style="display:none">
      <strong>Czy ta strona pomaga Ci w przygotowaniach?</strong>
      <div class="pwa-actions">
        <button class="btn-sm" onclick="feedbackFlow.vote('up','proactive')">👍 Tak</button>
        <button class="ghost btn-sm" onclick="feedbackFlow.vote('down','proactive')">👎 Nie</button>
      </div>
    </div>
    <!-- Stage 2A: polecenie + share (po 👍) -->
    <div id="feedback-stage-2a" style="display:none">
      <strong>Dzięki! 🙌</strong>
      <p>Ten projekt jest całkowicie darmowy i rozwijany po godzinach. Jeśli pomógł Ci w nauce, będzie nam bardzo miło, jeśli polecisz go choć jednej osobie przygotowującej się do egzaminu.</p>
      <div id="feedback-share-actions" class="pwa-actions"></div>
      <textarea id="feedback-helpful" class="bug-report-input" rows="3" placeholder="Co było najbardziej pomocne? (opcjonalnie)"></textarea>
      <div class="pwa-actions">
        <button class="btn-sm" id="feedback-helpful-send" onclick="feedbackFlow.submitPositive()">Wyślij opinię</button>
        <button class="ghost btn-sm" onclick="feedbackFlow.close('2A')">Zamknij</button>
      </div>
    </div>
    <!-- Stage 2B: feedback (po 👎) -->
    <div id="feedback-stage-2b" style="display:none">
      <strong>Dzięki za szczerość</strong>
      <p>Czego zabrakło lub co powinniśmy poprawić?</p>
      <textarea id="feedback-improve" class="bug-report-input" rows="4" placeholder="Twoja opinia pomoże nam ulepszyć stronę"></textarea>
      <div id="feedback-error" class="bug-report-error" style="display:none"></div>
      <div class="pwa-actions">
        <button class="btn-sm" id="feedback-improve-send" onclick="feedbackFlow.submitNegative()">Wyślij</button>
        <button class="ghost btn-sm" onclick="feedbackFlow.close('2B')">Anuluj</button>
      </div>
    </div>
    <!-- Stan końcowy -->
    <div id="feedback-done" style="display:none">
      <strong>Dziękujemy! 💛</strong>
      <p>Twoja opinia do nas trafiła.</p>
      <button class="btn-sm" onclick="feedbackFlow.close('done')">Zamknij</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Dołącz skrypt `feedback.js`**

Znajdź (`web/index.html:1389`):
```html
<script src="pwa-install.js"></script>
```
Dodaj BEZPOŚREDNIO po niej:
```html
<script src="feedback.js"></script>
```

- [ ] **Step 4: Weryfikacja wizualna**

Run: `open web/index.html` (lub odśwież w przeglądarce).
Sprawdź w konsoli DevTools: `typeof decideThumbClick === 'function'` → `true` (moduł załadowany).
Modal jeszcze się nie pokazuje (brak JS sterującego) — to oczekiwane.

- [ ] **Step 5: Checkpoint (bez commitu)**

Zmienione: `web/index.html`. Pokaż diff. NIE commituj.

---

## Task 3: Obiekt `feedbackFlow` — stan, głosowanie, sterowanie modalem

**Files:**
- Modify: `web/index.html` (po `onBugReportFailure`, ~L2557)

Uwaga: ten kod ląduje w głównym bloku `<script>` (ten sam, który zawiera `WEB3FORMS_KEY`, `getSessions`, `getAnswerLog`, `buildSummaryHtml`). Funkcje są globalne (wołane z `onclick`).

- [ ] **Step 1: Wstaw `feedbackInlineHtml()` + `feedbackFlow` (na razie bez wysyłki/share)**

Znajdź koniec `onBugReportFailure` (`web/index.html:2557`):
```js
    errEl.innerHTML = 'Nie udało się wysłać. <a href="' + href + '">Wyślij mailem zamiast tego »</a>';
    errEl.style.display = 'block';
  }

  /* ================================================================
     ABORT SESSION
  ================================================================ */
```
Wstaw BEZPOŚREDNIO przed komentarzem `/* ===... ABORT SESSION ... */`:
```js
  /* ================================================================
     FEEDBACK + POLECENIA (Web3Forms)
     Czysta logika: web/feedback.js. Tu tylko DOM/efekty/fetch/GA.
  ================================================================ */
  function feedbackInlineHtml() {
    return '<div id="feedback-inline" class="feedback-inline">'
      + '<span class="feedback-inline-q">Czy ta strona pomaga Ci w przygotowaniach?</span>'
      + '<span id="feedback-inline-btns" class="feedback-inline-btns">'
      + '<button class="ghost btn-sm" onclick="feedbackFlow.vote(\'up\',\'inline\')">👍 Tak</button>'
      + '<button class="ghost btn-sm" onclick="feedbackFlow.vote(\'down\',\'inline\')">👎 Nie</button>'
      + '</span>'
      + '<span id="feedback-inline-ack" style="display:none">Dzięki! 🙌</span>'
      + '</div>';
  }

  var feedbackFlow = (function () {
    function fbTrack(name, params) {
      if (typeof gtag === 'function') gtag('event', name, params || {});
    }
    function lsGetNum(key) {
      var v = parseInt(localStorage.getItem(key), 10);
      return isNaN(v) ? 0 : v;
    }
    function getVoted() { return localStorage.getItem('ksap_feedback_voted') === '1'; }
    function setVoted() { try { localStorage.setItem('ksap_feedback_voted', '1'); } catch (e) {} }
    function getCompletedAt() { return lsGetNum('ksap_feedback_completed_at'); }
    function setCompletedAt(ms) { try { localStorage.setItem('ksap_feedback_completed_at', String(ms)); } catch (e) {} }
    function getProactiveAt() { return lsGetNum('ksap_feedback_proactive_at'); }
    function setProactiveAt(ms) { try { localStorage.setItem('ksap_feedback_proactive_at', String(ms)); } catch (e) {} }

    function showStage(stage) {
      document.getElementById('feedback-stage-1').style.display = (stage === '1') ? 'block' : 'none';
      document.getElementById('feedback-stage-2a').style.display = (stage === '2A') ? 'block' : 'none';
      document.getElementById('feedback-stage-2b').style.display = (stage === '2B') ? 'block' : 'none';
      document.getElementById('feedback-done').style.display = (stage === 'done') ? 'block' : 'none';
      if (stage === '2A') {
        renderShareActions();
        document.getElementById('feedback-helpful').value = '';
        var pb = document.getElementById('feedback-helpful-send');
        pb.disabled = false; pb.textContent = 'Wyślij opinię';
      }
      if (stage === '2B') {
        document.getElementById('feedback-improve').value = '';
        document.getElementById('feedback-error').style.display = 'none';
        var nb = document.getElementById('feedback-improve-send');
        nb.disabled = false; nb.textContent = 'Wyślij';
      }
    }

    function openModal(stage) {
      showStage(stage);
      document.getElementById('feedback-modal').style.display = 'flex';
    }

    function showInlineAck() {
      var btns = document.getElementById('feedback-inline-btns');
      if (btns) btns.style.display = 'none';
      var ack = document.getElementById('feedback-inline-ack');
      if (ack) ack.style.display = '';
    }

    function onComplete() {
      setCompletedAt(Date.now());
      showStage('done');
    }

    // renderShareActions zdefiniowane w Task 5; tymczasowy no-op, by Task 3 działał.
    function renderShareActions() {}

    return {
      vote: function (value, source) {
        setVoted();
        fbTrack('feedback_vote', { value: value, source: source });
        var decision = decideThumbClick({ value: value, completedAtMs: getCompletedAt(), nowMs: Date.now() });
        if (decision.action === 'ack') { showInlineAck(); return; }
        if (source === 'inline') {
          fbTrack('feedback_modal_opened', { source: 'inline', sentiment: value === 'up' ? 'positive' : 'negative' });
        }
        openModal(decision.stage);
      },
      close: function (stage) {
        if (stage && stage !== 'done') fbTrack('feedback_modal_dismissed', { stage: stage });
        document.getElementById('feedback-modal').style.display = 'none';
      },
      maybeProactive: function () {
        if (typeof shouldShowProactive !== 'function') return;
        var ok = shouldShowProactive({
          voted: getVoted(),
          proactiveAtMs: getProactiveAt(),
          answerCount: getAnswerLog().length,
          nowMs: Date.now()
        });
        if (!ok) return;
        setProactiveAt(Date.now());
        fbTrack('feedback_modal_opened', { source: 'proactive', sentiment: 'none' });
        openModal('1');
      },
      // Wypełniane w Task 4:
      submitPositive: function () { onComplete(); },
      submitNegative: function () {
        var improve = document.getElementById('feedback-improve').value.trim();
        var errEl = document.getElementById('feedback-error');
        if (!improve) { errEl.textContent = 'Napisz proszę kilka słów — to nam pomoże.'; errEl.style.display = 'block'; return; }
        errEl.style.display = 'none';
        onComplete();
      },
      // Ekspozycja dla Task 4/5 (te same domknięcia):
      _onComplete: onComplete,
      _showStage: showStage,
      _setRenderShareActions: function (fn) { renderShareActions = fn; }
    };
  })();
```

- [ ] **Step 2: Weryfikacja ręczna w przeglądarce (DevTools console)**

Run: odśwież `web/index.html`, otwórz konsolę i wywołaj ręcznie:
```js
localStorage.removeItem('ksap_feedback_completed_at');
feedbackFlow.vote('up','inline');   // → modal stage 2A widoczny
```
Expected: modal się pokazuje na stage 2A.
Następnie:
```js
feedbackFlow.close('2A');
feedbackFlow.vote('down','inline'); // → modal stage 2B
```
Expected: modal na 2B. Sprawdź też że `localStorage.getItem('ksap_feedback_voted') === '1'`.

- [ ] **Step 3: Weryfikacja cooldownu 👍 = ack**

Run w konsoli:
```js
localStorage.setItem('ksap_feedback_completed_at', String(Date.now()));
// trzeba mieć wyrenderowany widget inline — patrz Task 6; jeśli go nie ma, testuj logiką:
decideThumbClick({ value:'up', completedAtMs: Date.now(), nowMs: Date.now() });
```
Expected: `{ action: 'ack', stage: '2A' }`. (Pełny wizualny ack na summary zweryfikujesz w Task 6.)

- [ ] **Step 4: Checkpoint (bez commitu)**

Zmienione: `web/index.html`. NIE commituj.

---

## Task 4: Wysyłka do Web3Forms (pozytywna „helpful" + negatywna „improve")

**Files:**
- Modify: `web/index.html` (wewnątrz IIFE `feedbackFlow` z Task 3)

- [ ] **Step 1: Dodaj builder payloadu + `postFeedback` w IIFE feedbackFlow**

Znajdź w IIFE `feedbackFlow` (Task 3) tę linię:
```js
    // renderShareActions zdefiniowane w Task 5; tymczasowy no-op, by Task 3 działał.
    function renderShareActions() {}
```
Wstaw BEZPOŚREDNIO po niej:
```js
    function buildFeedbackPayload(sentiment, message) {
      return {
        access_key: WEB3FORMS_KEY,
        subject: (sentiment === 'positive' ? 'Opinia 👍 – ' : 'Opinia 👎 – ') + 'egzamin.kutra.pl',
        from_name: 'egzamin.kutra.pl – opinia',
        message: message || '(bez treści)',
        sentiment: sentiment,
        sessions: getSessions().length,
        answers: getAnswerLog().length
      };
    }

    function postFeedback(payload, retriesLeft, onDone) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.success) { onDone(true); }
        else { throw new Error('web3forms returned success:false'); }
      })
      .catch(function () {
        if (retriesLeft > 0) { postFeedback(payload, retriesLeft - 1, onDone); }
        else { onDone(false); }  // cichy fail — bez mailto fallback (per spec)
      });
    }
```

- [ ] **Step 2: Zastąp tymczasowe `submitPositive`/`submitNegative` pełnymi wersjami**

Znajdź w obiekcie zwracanym przez IIFE:
```js
      // Wypełniane w Task 4:
      submitPositive: function () { onComplete(); },
      submitNegative: function () {
        var improve = document.getElementById('feedback-improve').value.trim();
        var errEl = document.getElementById('feedback-error');
        if (!improve) { errEl.textContent = 'Napisz proszę kilka słów — to nam pomoże.'; errEl.style.display = 'block'; return; }
        errEl.style.display = 'none';
        onComplete();
      },
```
Zastąp całość przez:
```js
      submitPositive: function () {
        var helpful = document.getElementById('feedback-helpful').value.trim();
        fbTrack('feedback_submitted', { sentiment: 'positive', has_text: !!helpful });
        if (helpful) {
          var btn = document.getElementById('feedback-helpful-send');
          btn.disabled = true; btn.textContent = 'Wysyłanie…';
          postFeedback(buildFeedbackPayload('positive', helpful), 1, function () { onComplete(); });
        } else {
          onComplete();
        }
      },
      submitNegative: function () {
        var improve = document.getElementById('feedback-improve').value.trim();
        var errEl = document.getElementById('feedback-error');
        if (!improve) { errEl.textContent = 'Napisz proszę kilka słów — to nam pomoże.'; errEl.style.display = 'block'; return; }
        errEl.style.display = 'none';
        fbTrack('feedback_submitted', { sentiment: 'negative', has_text: true });
        var btn = document.getElementById('feedback-improve-send');
        btn.disabled = true; btn.textContent = 'Wysyłanie…';
        postFeedback(buildFeedbackPayload('negative', improve), 1, function () { onComplete(); });
      },
```

- [ ] **Step 3: Weryfikacja ręczna (sieć)**

Run: odśwież `web/index.html`, w konsoli:
```js
localStorage.removeItem('ksap_feedback_completed_at');
feedbackFlow.vote('down','inline');
```
Wpisz tekst w pole „improve", kliknij „Wyślij". W zakładce Network DevTools sprawdź POST do `api.web3forms.com/submit` (status 200, `{"success":true}`), modal przechodzi do stanu „Dziękujemy! 💛", a `localStorage.getItem('ksap_feedback_completed_at')` jest ustawione.
Sprawdź skrzynkę Web3Forms — mail z tematem „Opinia 👎 – egzamin.kutra.pl".

- [ ] **Step 4: Weryfikacja walidacji**

Run: otwórz 2B ponownie, kliknij „Wyślij" z pustym polem.
Expected: komunikat „Napisz proszę kilka słów — to nam pomoże.", brak żądania sieciowego.

- [ ] **Step 5: Checkpoint (bez commitu)**

Zmienione: `web/index.html`. NIE commituj.

---

## Task 5: Udostępnianie — natywny `navigator.share` + fallback (FB / e-mail / kopiuj)

**Files:**
- Modify: `web/index.html` (wewnątrz IIFE `feedbackFlow`)

- [ ] **Step 1: Zaimplementuj `renderShareActions` + funkcje kanałów**

Znajdź w IIFE tymczasowy no-op:
```js
    // renderShareActions zdefiniowane w Task 5; tymczasowy no-op, by Task 3 działał.
    function renderShareActions() {}
```
Zastąp go pełną implementacją:
```js
    function mkShareBtn(label, handler) {
      var b = document.createElement('button');
      b.className = 'ghost btn-sm';
      b.textContent = label;
      b.onclick = handler;
      return b;
    }

    function shareNative() {
      navigator.share({
        title: FEEDBACK_SHARE_TITLE,
        text: FEEDBACK_SHARE_TEXT,
        url: FEEDBACK_SHARE_URL
      }).then(function () {
        fbTrack('feedback_share_clicked', { channel: 'native' });
        onComplete();
      }).catch(function () { /* user anulował — nie kończ */ });
    }

    function shareFacebook() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(FEEDBACK_SHARE_URL),
        '_blank', 'noopener,width=600,height=500');
      fbTrack('feedback_share_clicked', { channel: 'facebook' });
      onComplete();
    }

    function shareEmail() {
      var subject = encodeURIComponent(FEEDBACK_SHARE_TITLE);
      var body = encodeURIComponent(buildShareMessage());
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
      fbTrack('feedback_share_clicked', { channel: 'email' });
      onComplete();
    }

    function shareCopy(btn) {
      var msg = buildShareMessage();
      function ok() {
        if (btn) btn.textContent = 'Skopiowano ✓';
        fbTrack('feedback_share_clicked', { channel: 'copy' });
        onComplete();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(ok).catch(function () { copyFallback(msg, ok); });
      } else {
        copyFallback(msg, ok);
      }
    }

    function copyFallback(text, done) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }

    function renderShareActions() {
      var box = document.getElementById('feedback-share-actions');
      box.innerHTML = '';
      if (navigator.share) {
        box.appendChild(mkShareBtn('📤 Udostępnij', shareNative));
      } else {
        box.appendChild(mkShareBtn('Facebook', shareFacebook));
        box.appendChild(mkShareBtn('E-mail', shareEmail));
        box.appendChild(mkShareBtn('Kopiuj link', function () { shareCopy(this); }));
      }
    }
```

- [ ] **Step 2: Weryfikacja fallback (desktop)**

Run: odśwież w desktopowym Chrome (`navigator.share` zwykle `undefined` na desktop bez flagi), w konsoli:
```js
localStorage.removeItem('ksap_feedback_completed_at');
feedbackFlow.vote('up','inline');   // stage 2A
```
Expected: w `#feedback-share-actions` trzy przyciski: Facebook / E-mail / Kopiuj link.
- „Kopiuj link" → tekst na przycisku zmienia się na „Skopiowano ✓", schowek zawiera tekst + URL, modal → „Dziękujemy", `completed_at` ustawione.
- „Facebook" → nowe okno sharer.php z podglądem OG.

- [ ] **Step 3: Weryfikacja natywna (mobile / emulacja)**

Run: w DevTools wymuś obecność API: `Object.defineProperty(navigator,'share',{value:function(){return Promise.resolve();},configurable:true});` następnie odśwież logikę przez ponowne `feedbackFlow.vote('up','inline')`.
Expected: jeden przycisk „📤 Udostępnij"; po rozwiązaniu promise → GA `feedback_share_clicked{native}` + stan „Dziękujemy".

- [ ] **Step 4: Checkpoint (bez commitu)**

Zmienione: `web/index.html`. NIE commituj.

---

## Task 6: Wpięcie widgetu inline w summary + trigger proaktywny

**Files:**
- Modify: `web/index.html` (`buildSummaryHtml` ~L2619, `showSummary` ~L2729)

- [ ] **Step 1: Wstaw widget inline wysoko w `buildSummaryHtml`**

Znajdź (`web/index.html:2618-2619`):
```js
    let html = '<div class="score-badge ' + scoreClass + '">' + meta.score + '&nbsp;/&nbsp;' + meta.total + '</div>';
    html += '<p class="summary-time">Czas całkowity: <strong>' + timeStr + '</strong></p>';
```
Dodaj BEZPOŚREDNIO po drugiej linii (`summary-time`):
```js
    html += feedbackInlineHtml();
```

- [ ] **Step 2: Dodaj trigger proaktywny w `showSummary`**

Znajdź (`web/index.html:2728-2729`):
```js
    showScreen('summary');
    if (window.pwaInstall) pwaInstall.onSummaryShown();
  }
```
Zamień na:
```js
    showScreen('summary');
    if (window.pwaInstall) pwaInstall.onSummaryShown();
    feedbackFlow.maybeProactive();
  }
```

- [ ] **Step 3: Weryfikacja end-to-end — happy path 👍**

Run: odśwież, w konsoli wyczyść stan:
```js
['ksap_feedback_voted','ksap_feedback_completed_at','ksap_feedback_proactive_at'].forEach(k=>localStorage.removeItem(k));
```
Rozegraj sesję do końca. Na ekranie wyników, wysoko (pod czasem), jest widget „Czy ta strona pomaga…? 👍 Tak / 👎 Nie".
- Klik 👍 → modal 2A (polecenie + share + opcjonalne pole). Klik „Kopiuj link" → „Dziękujemy", cooldown ustawiony.

- [ ] **Step 4: Weryfikacja cooldownu (👍 ack vs 👎 zawsze)**

Run: zaraz po ukończeniu (cooldown aktywny) rozegraj kolejną sesję.
- Klik inline 👍 → BRAK modala, widget pokazuje „Dzięki! 🙌" (przyciski znikają).
- Odśwież ekran (nowy render), klik inline 👎 → modal 2B JEST (omija cooldown).

- [ ] **Step 5: Weryfikacja proaktywna**

Run: w konsoli ustaw warunki proaktywne:
```js
localStorage.removeItem('ksap_feedback_voted');
localStorage.removeItem('ksap_feedback_proactive_at');
// upewnij się że ksap_answer_log ma >= 45 wpisów (rozegraj kilka sesji lub zsymuluj),
JSON.parse(localStorage.getItem('ksap_answer_log')||'[]').length;
```
Gdy `answer_log.length >= 45` i `voted` nieustawione → po zakończeniu sesji na summary pojawia się modal proaktywny (stage 1 z łapkami). Po pokazaniu `ksap_feedback_proactive_at` jest ustawione i modal nie wraca przez 5 dni.

- [ ] **Step 6: Regresja — test jednostkowy nadal zielony**

Run: `node tools/test-feedback.js`
Expected: `OK — wszystkie testy feedback przeszły`

- [ ] **Step 7: Checkpoint (bez commitu)**

Zmienione: `web/index.html`. Pokaż pełny diff całej inicjatywy. NIE commituj — użytkownik commituje sam.

---

## Self-review (wykonane przy pisaniu planu)

- **Pokrycie speca:** widget inline (T6) ✓ · modal 3-stage (T2) ✓ · stan localStorage + stałe (T1/T3) ✓ · stan-maszyna 👍/👎/cooldown/proaktywny (T1 czyste + T3 wpięcie) ✓ · 👎 omija cooldown (T1 test + decideThumbClick) ✓ · share natywny+fallback (T5) ✓ · Web3Forms z retry, rozróżnialny subject (T4) ✓ · GA `feedback_vote`/`feedback_modal_opened`/`feedback_share_clicked`/`feedback_submitted`/`feedback_modal_dismissed` (T3-T5) ✓ · testy czystej logiki (T1) ✓.
- **Spójność typów/nazw:** `decideThumbClick`, `shouldShowProactive`, `isInCooldown`, `buildShareMessage`, stałe `FEEDBACK_*` — identyczne w `feedback.js`, teście i wywołaniach w `index.html`. Klucze localStorage `ksap_feedback_voted|completed_at|proactive_at` spójne we wszystkich akcesorach. Stage'e `'1'|'2A'|'2B'|'done'` spójne między `decideThumbClick`, `showStage`, markupem i `onclick`.
- **Brak placeholderów:** każdy krok ma pełny kod i komendę z oczekiwanym wynikiem.
- **Uwaga implementacyjna:** `renderShareActions` jest najpierw no-opem (T3), potem nadpisywane pełną implementacją (T5) w tym samym domknięciu — pośrednie stany (T3/T4) są uruchamialne i weryfikowalne samodzielnie.
```

