# Integracja części II (sprawdzian wiedzy) — plan implementacji

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wpiąć 827 pytań części II („sprawdzian wiedzy", 6 dziedzin) jako osobną część egzaminu obok istniejącej części I, reużywając sesję, renderer opcji, historię, statystyki, GA4 i PWA.

**Architecture:** Część II to płaska pula pytań jednokrotnego wyboru (stem + 4 opcje). Aplikacja zyskuje pojęcie `state.part ∈ {'I','II'}`. Home staje się hubem dwóch części (Wariant A); część II ma własny ekran setupu z filtrem dziedzin/poziomu. Sesja zawsze 15 pytań. Logika doboru w nowym, czystym `web/session-wiedza.js`. Persystencja, historia i statystyki uogólnione o `part` + oś `group` (typ dla cz. I, dziedzina dla cz. II), wstecznie kompatybilne ze starymi danymi.

**Tech Stack:** Vanilla JS SPA bez frameworka/buildu; pytania jako globale ładowane `<script src>`; testy czystej logiki jako node-skrypty (`node tools/test-*.js`) z `assert` + `vm`; render DOM weryfikowany ręcznie (deploy preview Netlify na telefonie).

**Spec:** [docs/superpowers/specs/2026-06-13-integracja-czesc-ii-wiedza-design.md](../specs/2026-06-13-integracja-czesc-ii-wiedza-design.md)

---

## Struktura plików

| Plik | Rola | Akcja |
|---|---|---|
| `tools/wiedza/build-web.js` | build: JSON → `web/questions-wiedza.js` (global) | Create |
| `tools/test-build-web.js` | test czystej funkcji `buildSource` | Create |
| `web/questions-wiedza.js` | autogenerowany global `QUESTIONS_WIEDZA` (827) | Create (generate) |
| `web/session-wiedza.js` | czysty dobór sesji cz. II | Create |
| `tools/test-session-wiedza.js` | test `composeWiedzaSession` | Create |
| `web/index.html` | hub, setup cz. II, render, persystencja, historia, statystyki, GA4 | Modify |
| `web/sw.js` | dodać plik pytań do cache + bump wersji | Modify |
| `web/manifest.json` | opis o obu częściach | Modify |
| `BACKLOG.md` | wpis o pracy + link do spec/plan | Modify |

**Konwencja kodu:** część I to ścieżka istniejąca (nie ruszamy jej zachowania). Część II rozpoznajemy przez obecność pola `q.domain` (pytania cz. I go nie mają). Helper `isWiedza(q)` centralizuje to rozróżnienie — używać go zamiast rozsianych `if`-ów.

---

### Task 1: Build tooling — JSON → global `QUESTIONS_WIEDZA`

**Files:**
- Create: `tools/wiedza/build-web.js`
- Test: `tools/test-build-web.js`

- [ ] **Step 1: Napisz failing test**

`tools/test-build-web.js`:
```js
// tools/test-build-web.js
const assert = require('assert');
const vm = require('vm');
const { buildSource } = require('./wiedza/build-web.js');

// 1) zwraca string definiujący global
const src = buildSource([{ id: 'w_pr_001', domain: 'pr', correct: 2 }]);
assert.ok(src.indexOf('window.QUESTIONS_WIEDZA') !== -1, 'definiuje global');

// 2) wynik jest wykonywalny i odtwarza dane
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(src, ctx);
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA.length, 1, 'jedno pytanie');
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA[0].domain, 'pr', 'zachowuje pola');
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA[0].correct, 2, 'zachowuje correct=0..3');

// 3) odrzuca nie-tablicę
assert.throws(function () { buildSource(null); }, /tablic/, 'rzuca przy nie-tablicy');

console.log('✅ build-web OK');
```

- [ ] **Step 2: Uruchom test — ma FAIL**

Run: `node tools/test-build-web.js`
Expected: rzuca `Cannot find module './wiedza/build-web.js'`.

- [ ] **Step 3: Napisz `tools/wiedza/build-web.js`**

```js
// tools/wiedza/build-web.js
// Build: data/wiedza/output/questions-wiedza.json -> web/questions-wiedza.js
// Opakowuje płaską tablicę pytań w global window.QUESTIONS_WIEDZA (ładowany <script src>).
// Czysta funkcja buildSource jest testowalna; CLI czyta plik źródłowy i zapisuje wynik.
const fs = require('fs');
const path = require('path');

function buildSource(questions) {
  if (!Array.isArray(questions)) throw new Error('build-web: oczekiwano tablicy pytań');
  return '// AUTOGENEROWANE przez tools/wiedza/build-web.js — nie edytuj ręcznie.\n'
    + 'window.QUESTIONS_WIEDZA = ' + JSON.stringify(questions) + ';\n';
}

if (require.main === module) {
  const SRC = path.join(__dirname, '..', '..', 'data', 'wiedza', 'output', 'questions-wiedza.json');
  const OUT = path.join(__dirname, '..', '..', 'web', 'questions-wiedza.js');
  const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  const arr = Array.isArray(data) ? data : data.questions;
  fs.writeFileSync(OUT, buildSource(arr));
  console.log('✅ Zapisano ' + OUT + ' (' + arr.length + ' pytań)');
}

module.exports = { buildSource };
```

- [ ] **Step 4: Uruchom test — ma PASS**

Run: `node tools/test-build-web.js`
Expected: `✅ build-web OK`

- [ ] **Step 5: Wygeneruj rzeczywisty plik pytań i zweryfikuj**

Run:
```bash
node tools/wiedza/validate.js data/wiedza/output/questions-wiedza.json
node tools/wiedza/build-web.js
node -e "const fs=require('fs');const vm=require('vm');const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('web/questions-wiedza.js','utf8'),ctx);console.log('count', ctx.window.QUESTIONS_WIEDZA.length);"
```
Expected: walidator 0 błędów; build „✅ Zapisano … (827 pytań)"; `count 827`.

- [ ] **Step 6: Commit**

```bash
git add tools/wiedza/build-web.js tools/test-build-web.js web/questions-wiedza.js
git commit -m "feat(wiedza): build tooling + generated QUESTIONS_WIEDZA global"
```

---

### Task 2: Dobór sesji części II (`web/session-wiedza.js`)

**Files:**
- Create: `web/session-wiedza.js`
- Test: `tools/test-session-wiedza.js`

- [ ] **Step 1: Napisz failing test**

`tools/test-session-wiedza.js`:
```js
// tools/test-session-wiedza.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/session-wiedza.js', 'utf8'), ctx);
const { composeWiedzaSession } = ctx;

function makeRng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function mkPool() {
  const doms = { pr: 40, se: 30, ap: 20, fp: 15, pz: 10, oz: 8 };
  const levels = ['easy', 'medium', 'hard'];
  const pool = [];
  Object.keys(doms).forEach(function (d) {
    for (let i = 0; i < doms[d]; i++) pool.push({ id: 'w_' + d + '_' + i, domain: d, level: levels[i % 3] });
  });
  return pool;
}

// 1) domyślnie 15 pytań, bez duplikatów, ze wszystkich dziedzin
const s = composeWiedzaSession(mkPool(), {}, Object.create(null), makeRng(1));
assert.strictEqual(s.length, 15, '15 pytań');
assert.strictEqual(new Set(s.map((x) => x.id)).size, 15, 'bez duplikatów');

// 2) filtr dziedzin — tylko wybrane
const sf = composeWiedzaSession(mkPool(), { domains: ['oz', 'pz'] }, Object.create(null), makeRng(2));
assert.ok(sf.every((x) => x.domain === 'oz' || x.domain === 'pz'), 'tylko wybrane dziedziny');

// 3) filtr poziomu
const sl = composeWiedzaSession(mkPool(), { level: 'hard' }, Object.create(null), makeRng(3));
assert.ok(sl.every((x) => x.level === 'hard'), 'tylko hard');
// level 'all' = bez filtra
const sa = composeWiedzaSession(mkPool(), { level: 'all' }, Object.create(null), makeRng(3));
assert.ok(sa.some((x) => x.level !== 'hard'), "level 'all' nie filtruje");

// 4) anti-repeat: niewidziane mają pierwszeństwo
const pool = mkPool();
const lastSeen = Object.create(null);
pool.forEach((x, i) => { if (i >= 15) lastSeen[x.id] = '2020-01-01'; }); // pierwsze 15 niewidziane
const s4 = composeWiedzaSession(pool, {}, lastSeen, makeRng(7));
assert.ok(s4.every((x) => !lastSeen[x.id]), 'wszystkie wybrane są niewidziane');

// 5) graceful: przefiltrowana pula < 15 → tyle ile jest
const s5 = composeWiedzaSession(mkPool(), { domains: ['oz'] }, Object.create(null), makeRng(9)); // oz = 8
assert.strictEqual(s5.length, 8, 'mniej niż 15 gdy pula mała');

console.log('✅ session-wiedza OK');
```

- [ ] **Step 2: Uruchom test — ma FAIL**

Run: `node tools/test-session-wiedza.js`
Expected: błąd odczytu `web/session-wiedza.js` (plik nie istnieje) lub `composeWiedzaSession is not a function`.

- [ ] **Step 3: Napisz `web/session-wiedza.js`**

```js
// web/session-wiedza.js
// Dobór sesji części II (sprawdzian wiedzy): filtr dziedzin + poziomu,
// losowanie z least-recently-seen (anti-repeat). Rozkład dziedzin wychodzi
// proporcjonalnie do wielkości (prze)filtrowanej puli. 15 pytań. Czysta i testowalna.
// (Lokalna kopia sortLRS — moduł niezależny od session-blueprint.js.)
(function (root) {
  'use strict';
  var SESSION_SIZE = 15;

  function shuffleWith(arr, rng) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function sortLRS(pool, lastSeen, rng) {
    shuffleWith(pool, rng);
    pool.sort(function (a, b) {
      var ta = lastSeen[a.id], tb = lastSeen[b.id];
      var ua = ta === undefined, ub = tb === undefined;
      if (ua && ub) return 0;
      if (ua) return -1;
      if (ub) return 1;
      return ta < tb ? -1 : ta > tb ? 1 : 0;
    });
    return pool;
  }

  function composeWiedzaSession(pool, opts, lastSeen, rng) {
    rng = rng || Math.random;
    lastSeen = lastSeen || Object.create(null);
    opts = opts || {};
    var domains = (opts.domains && opts.domains.length) ? opts.domains : null;
    var level = (opts.level && opts.level !== 'all') ? opts.level : null;
    var size = opts.size || SESSION_SIZE;

    var filtered = (pool || []).filter(function (q) {
      if (domains && domains.indexOf(q.domain) === -1) return false;
      if (level && q.level !== level) return false;
      return true;
    });
    sortLRS(filtered, lastSeen, rng);
    return filtered.slice(0, size);
  }

  var api = { composeWiedzaSession: composeWiedzaSession, SESSION_SIZE: SESSION_SIZE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.composeWiedzaSession = composeWiedzaSession; root.SESSION_WIEDZA = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
```

- [ ] **Step 4: Uruchom test — ma PASS**

Run: `node tools/test-session-wiedza.js`
Expected: `✅ session-wiedza OK`

- [ ] **Step 5: Commit**

```bash
git add web/session-wiedza.js tools/test-session-wiedza.js
git commit -m "feat(wiedza): pure session composer with domain/level filter + LRS"
```

---

### Task 3: Załaduj skrypty + service worker

**Files:**
- Modify: `web/index.html:1445-1452` (script src), `web/index.html:1109` (error-banner — bez zmian, tylko kontekst)
- Modify: `web/sw.js:1-10`

- [ ] **Step 1: Dodaj script-tagi w `index.html`**

Zmień blok (obecnie 1445–1452):
```html
<!-- questions data -->
<script src="questions-unified.js"></script>
```
na:
```html
<!-- questions data -->
<script src="questions-unified.js"></script>
<script src="questions-wiedza.js"></script>
```
oraz dodaj po linii `<script src="session-blueprint.js"></script>` (1452):
```html
<script src="session-wiedza.js"></script>
```

- [ ] **Step 2: Zaktualizuj `web/sw.js` — cache assets + bump wersji**

Zmień (1–10):
```js
const CACHE = 'ksap-v8';
const ASSETS = [
  './',
  './index.html',
  './questions-unified.js',
  './bg.png',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
```
na:
```js
const CACHE = 'ksap-v9';
const ASSETS = [
  './',
  './index.html',
  './questions-unified.js',
  './questions-wiedza.js',
  './session-wiedza.js',
  './bg.png',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
```

- [ ] **Step 3: Weryfikacja ręczna**

Run: `cd web && python3 -m http.server 8000` i otwórz `http://localhost:8000`.
W konsoli przeglądarki: `QUESTIONS_WIEDZA.length` → `827`; `typeof composeWiedzaSession` → `"function"`. Aplikacja części I działa jak dotąd.

- [ ] **Step 4: Commit**

```bash
git add web/index.html web/sw.js
git commit -m "feat(wiedza): load questions-wiedza.js + session-wiedza.js, bump sw cache v9"
```

---

### Task 4: Stan + helpery świadome części

**Files:**
- Modify: `web/index.html:1459-1472` (state), `web/index.html:1960-1969` (po `TYPE_NAMES`)

- [ ] **Step 1: Rozszerz `state`**

Zmień (1459–1472):
```js
  const state = {
    screen: 'home',
    mode: 'learning',
    difficulty: 'easy',
    timerEnabled: false,
    session: [],
    currentIndex: 0,
    answers: [],
    timerInterval: null,
    timerSeconds: 60,
    sessionStartTime: null,
    answered: false,
    pendingAnswer: null,
  };
```
na (dodane 3 pola części II):
```js
  const state = {
    screen: 'home',
    part: 'I',                 // 'I' = umiejętności, 'II' = wiedza
    mode: 'learning',
    difficulty: 'easy',
    timerEnabled: false,
    wiedzaDomains: [],         // [] = wszystkie dziedziny
    wiedzaLevel: 'all',        // 'all' | 'easy' | 'medium' | 'hard'
    session: [],
    currentIndex: 0,
    answers: [],
    timerInterval: null,
    timerSeconds: 60,
    sessionStartTime: null,
    answered: false,
    pendingAnswer: null,
  };
```

- [ ] **Step 2: Dodaj `DOMAIN_NAMES` + helpery po `TYPE_NAMES`**

Po bloku `TYPE_NAMES` (kończy się `};` w linii 1969) wstaw:
```js
  const DOMAIN_NAMES = {
    pr: 'PRAWO',
    ap: 'ADMINISTRACJA PUBLICZNA',
    fp: 'FINANSE PUBLICZNE',
    pz: 'POLITYKA ZAGRANICZNA I ORG. MIĘDZYNARODOWE',
    oz: 'ORGANIZACJA I ZARZĄDZANIE',
    se: 'ZAGADNIENIA SPOŁECZNE I EKONOMICZNE',
  };
  // krótkie etykiety do chipów / tabel
  const DOMAIN_SHORT = {
    pr: 'Prawo', ap: 'Administracja', fp: 'Finanse',
    pz: 'Polityka zagr.', oz: 'Organizacja', se: 'Społ.-ekonom.',
  };
  const WIEDZA_DOMAINS_ORDER = ['pr', 'se', 'ap', 'fp', 'pz', 'oz'];

  // Pytanie części II rozpoznajemy po obecności pola domain (cz. I go nie ma).
  function isWiedza(q) { return !!(q && q.domain); }

  // Etykieta osi/grupy: cz. I = typ, cz. II = dziedzina.
  function questionGroupLabel(q) {
    if (!q) return '—';
    return isWiedza(q) ? (DOMAIN_NAMES[q.domain] || q.domain) : (TYPE_NAMES[q.typeId] || ('TYP ' + q.typeId));
  }

  // Treść pytania: cz. II = stem, cz. I = renderer typu.
  function questionBodyHtml(q) {
    if (isWiedza(q)) return '<div class="question-stem">' + escHtml(q.question) + '</div>';
    return renderQuestionBody(q);
  }

  // Źródło prawne (tylko cz. II, tylko w review).
  function sourceHtml(q) {
    if (isWiedza(q) && q.source) return '<div class="source-box">Źródło: ' + escHtml(q.source) + '</div>';
    return '';
  }

  // Parametry zdarzenia question_answered (uogólnione o część/dziedzinę/poziom).
  function answerEventParams(q, isCorrect, idx, timeSpent) {
    var p = {
      exam_part: state.part,
      is_correct: isCorrect,
      question_index: idx,
      time_spent_sec: timeSpent
    };
    if (isWiedza(q)) {
      // UWAGA: NIE ustawiamy p.question_type dla cz. II — to wymiar GA4 historycznie
      // liczbowy (typy 1–8 cz. I). Wstrzyknięcie stringów dziedzin zanieczyściłoby
      // istniejące eksploracje. Cz. II analizujemy przez question_domain + exam_part.
      p.question_domain = q.domain;
      p.question_level = q.level;
    } else {
      p.question_type = q.typeId;
      p.question_difficulty = (q.id && q.id.charAt(0) === 'h') ? 'hard' : 'easy';
    }
    return p;
  }
```

- [ ] **Step 3: Weryfikacja**

Run: `node -e "require('child_process')" ` — n/d (DOM). Otwórz stronę lokalnie; w konsoli: `isWiedza({domain:'pr'})` → `true`, `isWiedza({typeId:1})` → `false`, `questionGroupLabel({domain:'pr'})` → `'PRAWO'`. Brak błędów ładowania.

- [ ] **Step 4: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): part-aware state + DOMAIN_NAMES + question helpers"
```

---

### Task 5: Home jako hub dwóch części

> **⚠️ Task 5 i Task 6 to JEDNA jednostka pracy — wykonaj je razem i zacommituj RAZEM (commit w Task 6).** Sam Task 5 zostawia złamany stan (kafelek „Część II" wywołuje nieistniejący `goSetupWiedza`), więc nie commituj po Task 5. Przy `subagent-driven-development`/`executing-plans` potraktuj 5+6 jako jeden task z jednym checkpointem.

**Files:**
- Modify: `web/index.html:1112-1119` (markup home), `web/index.html:110-153` (CSS home — dodać style kafelków), `web/index.html:1575-1589` (`initQuestionCount` → liczby per kafelek)

- [ ] **Step 1: Przebuduj markup home**

Zmień (1112–1119):
```html
<div id="screen-home" class="screen">
  <h1>Sprawdzian Umiejętności</h1>
  <p class="subtitle">Ćwiczenia przed egzaminem na urzędnika mianowanego — Sprawdzian Umiejętności KSAP<span id="question-count"></span></p>
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" class="ghost" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
  <p id="social-proof"></p>
  <p id="exam-countdown"></p>
</div>
```
na:
```html
<div id="screen-home" class="screen">
  <h1>Egzamin na urzędnika mianowanego</h1>
  <p class="subtitle">Bezpłatne ćwiczenia przed postępowaniem kwalifikacyjnym KSAP — wybierz część egzaminu</p>
  <div class="part-grid">
    <div class="part-card" onclick="goSetup()" role="button" tabindex="0">
      <span class="part-eyebrow">Część I</span>
      <h3>Sprawdzian umiejętności</h3>
      <p>Test predyspozycji: analogie, wnioskowanie logiczne, analiza danych i figur.</p>
      <div class="part-meta"><span>8 typów zadań</span><span id="count-part-1"></span></div>
    </div>
    <div class="part-card" onclick="goSetupWiedza()" role="button" tabindex="0">
      <span class="part-eyebrow">Część II</span>
      <h3>Sprawdzian wiedzy</h3>
      <p>Wiedza z 6 dziedzin: prawo, sprawy społ.-ekonom., administracja, finanse, polityka zagr., organizacja.</p>
      <div class="part-meta"><span>6 dziedzin</span><span id="count-part-2"></span></div>
    </div>
  </div>
  <div class="home-links">
    <button id="btn-history" class="ghost btn-sm" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
    <button class="ghost btn-sm" onclick="showScreen('stats'); loadStats();">Statystyki</button>
  </div>
  <p id="social-proof"></p>
  <p id="exam-countdown"></p>
</div>
```

- [ ] **Step 2: Dodaj CSS kafelków (po regule `#screen-home button { max-width: 300px; }`, ok. 128)**

Po linii `#screen-home button { max-width: 300px; }` wstaw:
```css
    .part-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%; max-width: 640px; margin-bottom: 20px; }
    @media (max-width: 540px) { .part-grid { grid-template-columns: 1fr; } }
    .part-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding: 22px 20px; text-align: left; cursor: pointer; transition: border-color .15s, box-shadow .15s, transform .1s; }
    .part-card:hover, .part-card:focus { border-color: #2563eb; box-shadow: 0 6px 22px rgba(37,99,235,.12); transform: translateY(-2px); outline: none; }
    .part-eyebrow { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #2563eb; background: #eff6ff; border-radius: 4px; padding: 3px 8px; display: inline-block; margin-bottom: 12px; }
    .part-card h3 { font-size: 1.2rem; margin-bottom: 6px; }
    .part-card p { color: #555; font-size: 0.9rem; line-height: 1.45; margin-bottom: 14px; }
    .part-meta { display: flex; gap: 14px; font-size: 0.8rem; color: #6b7280; flex-wrap: wrap; }
    .part-meta span::before { content: "•"; margin-right: 6px; color: #cbd5e1; }
    .part-meta span:first-child::before { content: ""; margin: 0; }
    .home-links { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
    .home-links button { width: auto; }
```

- [ ] **Step 3: Zaktualizuj `initQuestionCount` → liczby per kafelek**

Zmień całą funkcję (1575–1589):
```js
  function initQuestionCount() {
    const el = document.getElementById('question-count');
    if (!el) return;
    const banks = [QUESTIONS_EASY];
    if (typeof QUESTIONS_HARD !== 'undefined') banks.push(QUESTIONS_HARD);
    let total = 0;
    banks.forEach(function(bank) {
      Object.values(bank).forEach(function(pool) { total += pool.length; });
    });
    const mod10 = total % 10, mod100 = total % 100;
    let word = 'pytań';
    if (total === 1) word = 'pytanie';
    else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = 'pytania';
    el.textContent = total + ' ' + word + ' w bazie';
  }
```
na:
```js
  function pytaniaWord(total) {
    const mod10 = total % 10, mod100 = total % 100;
    if (total === 1) return 'pytanie';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'pytania';
    return 'pytań';
  }

  function initQuestionCount() {
    // Część I
    let total1 = 0;
    const banks = [QUESTIONS_EASY];
    if (typeof QUESTIONS_HARD !== 'undefined') banks.push(QUESTIONS_HARD);
    banks.forEach(function(bank) {
      Object.values(bank).forEach(function(pool) { total1 += pool.length; });
    });
    const el1 = document.getElementById('count-part-1');
    if (el1) el1.textContent = total1 + ' ' + pytaniaWord(total1);
    // Część II
    const total2 = (typeof QUESTIONS_WIEDZA !== 'undefined') ? QUESTIONS_WIEDZA.length : 0;
    const el2 = document.getElementById('count-part-2');
    if (el2) el2.textContent = total2 + ' ' + pytaniaWord(total2);
  }
```

- [ ] **Step 4: Weryfikacja ręczna**

Otwórz stronę. Home pokazuje h1 „Egzamin na urzędnika mianowanego", dwa kafelki, liczby „640 pytań" / „827 pytań", linki Historia + Statystyki. Klik w kafelek I → setup części I (działa jak dziś). Klik w kafelek II → na razie błąd (`goSetupWiedza` powstaje w Task 6) — to oczekiwane: **przejdź od razu do Task 6, nie commituj tutaj.**

- [ ] **Step 5: BEZ commitu**

> Wspólny commit następuje na końcu Task 6 (zob. callout na początku Task 5).

---

### Task 6: Ekran setupu części II + routing + handlery

**Files:**
- Modify: `web/index.html:1140` (po `#screen-setup`) — nowy `#screen-setup-wiedza`
- Modify: `web/index.html:1477-1481` (`SCREEN_PATHS`)
- Modify: `web/index.html:155-227` (CSS — chipy dziedzin)
- Modify: `web/index.html:1841-1868` (po `onTimerChange`) — handlery cz. II

- [ ] **Step 1: Dodaj markup ekranu setupu cz. II**

Po zamknięciu `#screen-setup` (`</div>` w linii 1140) wstaw:
```html
<!-- ==================== SETUP CZĘŚĆ II (WIEDZA) ==================== -->
<div id="screen-setup-wiedza" class="screen">
  <h2>Część II — sprawdzian wiedzy</h2>
  <p class="setup-label">Tryb</p>
  <div class="toggle-group" id="wiedza-mode-toggle">
    <button class="toggle-btn active" data-mode="learning" onclick="setWiedzaMode('learning')">Nauka</button>
    <button class="toggle-btn" data-mode="exam" onclick="setWiedzaMode('exam')">Egzamin</button>
  </div>
  <p class="setup-label">Dziedziny <span style="text-transform:none;font-weight:400;color:#9ca3af">(puste = wszystkie)</span></p>
  <div class="chips" id="wiedza-domains"></div>
  <p class="setup-label">Poziom</p>
  <div class="toggle-group" id="wiedza-level-toggle">
    <button class="toggle-btn active" data-level="all" onclick="setWiedzaLevel('all')">Wszystkie</button>
    <button class="toggle-btn" data-level="easy" onclick="setWiedzaLevel('easy')">Łatwe</button>
    <button class="toggle-btn" data-level="medium" onclick="setWiedzaLevel('medium')">Średnie</button>
    <button class="toggle-btn" data-level="hard" onclick="setWiedzaLevel('hard')">Trudne</button>
  </div>
  <label class="checkbox-label">
    <input type="checkbox" id="wiedza-timer-checkbox" onchange="onTimerChange(this.checked)">
    Licznik czasu (60 s/pytanie)
  </label>
  <button onclick="startSession()">Rozpocznij &rarr;</button>
  <button class="secondary" onclick="showScreen('home')">Powrót</button>
</div>
```

- [ ] **Step 2: Dodaj CSS chipów (po regule `.toggle-btn.active { … }`, ok. 178)**

Po regule `.toggle-btn.active` wstaw:
```css
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    .chip { padding: 7px 13px; border-radius: 999px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; font-size: 0.85rem; cursor: pointer; user-select: none; }
    .chip.active { background: #e0edff; color: #2563eb; border-color: #bfdbfe; }
    .question-stem { font-size: 1.05rem; line-height: 1.5; font-weight: 500; }
    .source-box { font-size: 0.8rem; color: #6b7280; margin-top: 6px; font-style: italic; }
```

- [ ] **Step 3: Dodaj ścieżkę routingu**

Zmień (1477–1481):
```js
  var SCREEN_PATHS = {
    'home': '/', 'setup': '/setup', 'history': '/history',
    'stats': '/stats', 'about': '/about',
    'question': '/question', 'summary': '/summary', 'session-detail': '/session'
  };
```
na (dodany `setup-wiedza`):
```js
  var SCREEN_PATHS = {
    'home': '/', 'setup': '/setup', 'setup-wiedza': '/wiedza', 'history': '/history',
    'stats': '/stats', 'about': '/about',
    'question': '/question', 'summary': '/summary', 'session-detail': '/session'
  };
```

> `_applyScreen` używa `document.getElementById('screen-' + name)`, więc `'setup-wiedza'` → `#screen-setup-wiedza`. Tło (`hide-bg`) ma być widoczne też tutaj — zmień warunek w `_applyScreen` (1505):
```js
    document.body.classList.toggle('hide-bg', name !== 'home' && name !== 'setup');
```
na:
```js
    document.body.classList.toggle('hide-bg', name !== 'home' && name !== 'setup' && name !== 'setup-wiedza');
```

- [ ] **Step 4: Dodaj handlery cz. II (po `onTimerChange`, 1868)**

Po funkcji `onTimerChange` wstaw:
```js
  function renderWiedzaDomainChips() {
    const wrap = document.getElementById('wiedza-domains');
    if (!wrap) return;
    const counts = Object.create(null);
    if (typeof QUESTIONS_WIEDZA !== 'undefined') {
      QUESTIONS_WIEDZA.forEach(function(q) { counts[q.domain] = (counts[q.domain] || 0) + 1; });
    }
    wrap.innerHTML = WIEDZA_DOMAINS_ORDER.map(function(d) {
      const on = state.wiedzaDomains.indexOf(d) !== -1;
      return '<span class="chip' + (on ? ' active' : '') + '" data-domain="' + d + '" onclick="toggleWiedzaDomain(\'' + d + '\')">'
        + escHtml(DOMAIN_SHORT[d] || d) + ' · ' + (counts[d] || 0) + '</span>';
    }).join('');
  }

  function goSetupWiedza() {
    state.part = 'II';
    document.querySelectorAll('#wiedza-mode-toggle .toggle-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });
    document.querySelectorAll('#wiedza-level-toggle .toggle-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.level === state.wiedzaLevel);
    });
    document.getElementById('wiedza-timer-checkbox').checked = state.timerEnabled;
    renderWiedzaDomainChips();
    showScreen('setup-wiedza');
  }

  function setWiedzaMode(m) {
    state.mode = m;
    document.querySelectorAll('#wiedza-mode-toggle .toggle-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.mode === m);
    });
  }

  function setWiedzaLevel(lv) {
    state.wiedzaLevel = lv;
    document.querySelectorAll('#wiedza-level-toggle .toggle-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.level === lv);
    });
  }

  function toggleWiedzaDomain(d) {
    const i = state.wiedzaDomains.indexOf(d);
    if (i === -1) state.wiedzaDomains.push(d);
    else state.wiedzaDomains.splice(i, 1);
    renderWiedzaDomainChips();
  }
```

> `goSetup()` (część I) musi ustawiać `state.part = 'I'`. Zmień początek `goSetup` (1841) — po `function goSetup() {` dodaj pierwszą linię `state.part = 'I';`.

- [ ] **Step 5: Weryfikacja ręczna**

Otwórz stronę. Klik kafelek „Część II" → ekran setupu wiedzy: tryb Nauka/Egzamin, 6 chipów dziedzin z licznikami (Prawo · 242 …), 4 poziomy, licznik czasu. Klikanie chipów zaznacza/odznacza. „Powrót" wraca na home. (Przycisk „Rozpocznij" zadziała po Task 7.)

- [ ] **Step 6: Commit (łącznie z Task 5)**

```bash
git add web/index.html
git commit -m "feat(wiedza): home hub + część II setup screen, routing, domain chips"
```

---

### Task 7: Uogólnij start i dobór sesji dla części II

**Files:**
- Modify: `web/index.html:1892-1918` (`buildSession`, `startSession`)

- [ ] **Step 1: Uogólnij `buildSession`**

Zmień (1892–1897):
```js
  function buildSession() {
    const bank = getQuestionBank();
    const lastSeen = getLastSeenMap();
    // composeSession z web/session-blueprint.js — FIXED (3 syl.+2 rel.+po 1 z reszty) + 3 losowe.
    return composeSession(bank, lastSeen, Math.random);
  }
```
na:
```js
  function buildSession() {
    const lastSeen = getLastSeenMap();
    if (state.part === 'II') {
      // composeWiedzaSession z web/session-wiedza.js — filtr dziedzin/poziomu + LRS, 15 pytań.
      return composeWiedzaSession(
        (typeof QUESTIONS_WIEDZA !== 'undefined') ? QUESTIONS_WIEDZA : [],
        { domains: state.wiedzaDomains, level: state.wiedzaLevel },
        lastSeen, Math.random
      );
    }
    const bank = getQuestionBank();
    // composeSession z web/session-blueprint.js — FIXED (3 syl.+2 rel.+po 1 z reszty) + 3 losowe.
    return composeSession(bank, lastSeen, Math.random);
  }
```

- [ ] **Step 2: Uogólnij `startSession`**

Zmień (1899–1918):
```js
  function startSession() {
    // Save settings
    try {
      localStorage.setItem('ksap_settings', JSON.stringify({ mode: state.mode, difficulty: state.difficulty, timerEnabled: state.timerEnabled }));
    } catch(e) {}

    state.session = buildSession();
    state.currentIndex = 0;
    state.answers = [];
    state.sessionStartTime = Date.now();

    gtag('event', 'session_started', {
      session_mode: state.mode,
      session_difficulty: state.difficulty,
      timer_enabled: state.timerEnabled
    });

    showScreen('question');
    renderQuestion();
  }
```
na:
```js
  function startSession() {
    // Save settings
    try {
      localStorage.setItem('ksap_settings', JSON.stringify({
        mode: state.mode, difficulty: state.difficulty, timerEnabled: state.timerEnabled,
        part: state.part, wiedzaDomains: state.wiedzaDomains, wiedzaLevel: state.wiedzaLevel
      }));
    } catch(e) {}

    state.session = buildSession();
    if (!state.session.length) { alert('Brak pytań dla wybranych filtrów.'); return; }
    state.currentIndex = 0;
    state.answers = [];
    state.sessionStartTime = Date.now();

    gtag('event', 'session_started', {
      exam_part: state.part,
      session_mode: state.mode,
      session_difficulty: state.part === 'II' ? state.wiedzaLevel : state.difficulty,
      timer_enabled: state.timerEnabled
    });

    showScreen('question');
    renderQuestion();
  }
```

- [ ] **Step 3: Weryfikacja ręczna**

Część II setup → wybierz dziedzinę „Organizacja" + poziom „Trudne" → Rozpocznij. Pojawia się ekran pytania (nagłówek „Pytanie 1 z N"). Renderowanie ciała w Task 8 — na razie type-label może pokazać „TYP undefined", ale opcje tekstowe powinny się renderować (bo `q.typeId !== 8` jest prawdą). Część I nadal startuje poprawnie.

- [ ] **Step 4: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): part-aware buildSession/startSession (compose + GA exam_part)"
```

---

### Task 8: Render pytania świadomy części

**Files:**
- Modify: `web/index.html:1986-1990` (type-label + body w `renderQuestion`)

- [ ] **Step 1: Użyj helperów w `renderQuestion`**

Zmień (1986–1990):
```js
    // Body
    const typeName = TYPE_NAMES[q.typeId] || ('TYP ' + q.typeId);
    let bodyHtml = '';
    bodyHtml += '<div class="type-label">' + escHtml(typeName) + '</div>';
    bodyHtml += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
    bodyHtml += '<div class="question-body">' + renderQuestionBody(q) + '</div>';
```
na:
```js
    // Body
    let bodyHtml = '';
    bodyHtml += '<div class="type-label">' + escHtml(questionGroupLabel(q)) + '</div>';
    bodyHtml += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
    bodyHtml += '<div class="question-body">' + questionBodyHtml(q) + '</div>';
```

> Blok opcji (1992–2014) pozostaje bez zmian: dla cz. II `q.typeId` jest `undefined`, więc `q.typeId !== 8` = `true` → render standardowych opcji tekstowych z `q.options`. Działa poprawnie.

- [ ] **Step 2: Weryfikacja ręczna**

Część II → Rozpocznij. Ekran pytania pokazuje etykietę dziedziny (np. „PRAWO"), instrukcję, stem pytania (`.question-stem`) i 4 opcje A–D. Wybór opcji zaznacza ją, przycisk aktywny. Część I renderuje się jak dotąd (typy 1–8, w tym figury typu 8).

- [ ] **Step 3: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): render część II question (domain label + stem)"
```

---

### Task 9: Obsługa odpowiedzi — źródło w review + GA exam_part

**Files:**
- Modify: `web/index.html:2440-2446` (GA w `checkAnswer`), `web/index.html:2462-2465` (explanation w `checkAnswer`), `web/index.html:2495-2501` (GA w `onBtnNext`)

- [ ] **Step 1: GA w `checkAnswer`**

Zmień (2440–2446):
```js
    gtag('event', 'question_answered', {
      question_type: q.typeId,
      question_difficulty: (q.id && q.id.charAt(0) === 'h') ? 'hard' : 'easy',
      is_correct: index === q.correct,
      question_index: state.currentIndex,
      time_spent_sec: timeSpent
    });
```
na:
```js
    gtag('event', 'question_answered', answerEventParams(q, index === q.correct, state.currentIndex, timeSpent));
```

- [ ] **Step 2: Dodaj źródło do live-review w `checkAnswer`**

Zmień (2463–2464):
```js
    const expHtml = '<div class="explanation-box"><strong>Wyjaśnienie:</strong>' + escHtml(q.explanation) + '</div>'
      + '<div class="report-bar"><button class="btn-sm ghost" onclick="reportQuestion(\'' + q.id + '\')">Zgłoś błąd w pytaniu</button></div>';
```
na:
```js
    const expHtml = '<div class="explanation-box"><strong>Wyjaśnienie:</strong>' + escHtml(q.explanation) + '</div>'
      + sourceHtml(q)
      + '<div class="report-bar"><button class="btn-sm ghost" onclick="reportQuestion(\'' + q.id + '\')">Zgłoś błąd w pytaniu</button></div>';
```

- [ ] **Step 3: GA w `onBtnNext`**

Zmień (2495–2501):
```js
      gtag('event', 'question_answered', {
        question_type: q.typeId,
        question_difficulty: (q.id && q.id.charAt(0) === 'h') ? 'hard' : 'easy',
        is_correct: state.pendingAnswer === q.correct,
        question_index: state.currentIndex,
        time_spent_sec: timeSpent
      });
```
na:
```js
      gtag('event', 'question_answered', answerEventParams(q, state.pendingAnswer === q.correct, state.currentIndex, timeSpent));
```

- [ ] **Step 4: Weryfikacja ręczna**

Część II, tryb Nauka: odpowiedz na pytanie → zielona/czerwona opcja, wyjaśnienie, linia „Źródło: …", przycisk „Zgłoś błąd". DevTools → dataLayer: zdarzenie `question_answered` ma `exam_part: 'II'`, `question_domain`, `question_level`. Część I: brak `question_domain`, nadal `question_difficulty`.

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): source in review + unified question_answered GA params"
```

---

### Task 10: Persystencja — sesja i log świadome części

**Files:**
- Modify: `web/index.html:3057-3084` (`saveSession`), `web/index.html:3090-3098` (`appendAnswerLog`), `web/index.html:2875-2885` (`findQuestionById`)

- [ ] **Step 1: `saveSession` — part + domain w pozycjach**

Zmień (3062–3080):
```js
    sessions.unshift({
      id: id,
      date: new Date().toISOString(),
      mode: state.mode,
      timerEnabled: state.timerEnabled,
      totalTimeSec: state.sessionStartTime ? Math.floor((Date.now() - state.sessionStartTime) / 1000) : null,
      score: state.answers.filter(function(a) { return a.correct; }).length,
      total: state.session.length,
      questions: state.answers.map(function(a, i) {
        const q = state.session[i];
        return {
          typeId: q ? q.typeId : null,
          questionId: a.questionId,
          userAnswer: a.userAnswer,
          correct: a.correct,
          timeSpentSec: a.timeSpentSec
        };
      })
    });
```
na:
```js
    sessions.unshift({
      id: id,
      date: new Date().toISOString(),
      part: state.part,
      mode: state.mode,
      timerEnabled: state.timerEnabled,
      totalTimeSec: state.sessionStartTime ? Math.floor((Date.now() - state.sessionStartTime) / 1000) : null,
      score: state.answers.filter(function(a) { return a.correct; }).length,
      total: state.session.length,
      questions: state.answers.map(function(a, i) {
        const q = state.session[i];
        return {
          typeId: q ? (q.typeId !== undefined ? q.typeId : null) : null,
          domain: q ? (q.domain || null) : null,
          questionId: a.questionId,
          userAnswer: a.userAnswer,
          correct: a.correct,
          timeSpentSec: a.timeSpentSec
        };
      })
    });
```

- [ ] **Step 2: `appendAnswerLog` — part + group**

Zmień (3090–3098):
```js
  function appendAnswerLog(sessionId) {
    const log = getAnswerLog();
    const ts = new Date().toISOString();
    state.answers.forEach(function(a, i) {
      const q = state.session[i];
      if (!q) return;
      log.push({ sid: sessionId, qId: a.questionId, tid: q.typeId, ok: a.correct, ts: ts });
    });
    try { localStorage.setItem('ksap_answer_log', JSON.stringify(log)); } catch(e) {}
  }
```
na:
```js
  function appendAnswerLog(sessionId) {
    const log = getAnswerLog();
    const ts = new Date().toISOString();
    state.answers.forEach(function(a, i) {
      const q = state.session[i];
      if (!q) return;
      const group = isWiedza(q) ? q.domain : q.typeId;
      log.push({
        sid: sessionId, qId: a.questionId,
        tid: (q.typeId !== undefined ? q.typeId : null), // wstecznie: cz. I czyta tid
        part: state.part, group: group,
        ok: a.correct, ts: ts
      });
    });
    try { localStorage.setItem('ksap_answer_log', JSON.stringify(log)); } catch(e) {}
  }
```

- [ ] **Step 3: `findQuestionById` — szukaj też w wiedzy**

Zmień (2875–2885):
```js
  function findQuestionById(id) {
    const banks = [QUESTIONS_EASY];
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
na:
```js
  function findQuestionById(id) {
    const banks = [QUESTIONS_EASY];
    if (typeof QUESTIONS_HARD !== 'undefined') banks.push(QUESTIONS_HARD);
    for (const bank of banks) {
      for (const pool of Object.values(bank)) {
        const q = pool.find(function(q) { return q.id === id; });
        if (q) return q;
      }
    }
    if (typeof QUESTIONS_WIEDZA !== 'undefined') {
      const w = QUESTIONS_WIEDZA.find(function(q) { return q.id === id; });
      if (w) return w;
    }
    return null;
  }
```

- [ ] **Step 4: Weryfikacja ręczna**

Ukończ sesję cz. II. W DevTools → Application → Local Storage:
- `ksap_sessions[0]` ma `part: 'II'`, a pozycje `questions[*]` mają `domain` (i `typeId: null`).
- `ksap_answer_log` — nowe wpisy mają `part: 'II'`, `group: '<dziedzina>'`.
Stare wpisy (jeśli były) pozostają bez zmian. Część I: nowe wpisy mają `part: 'I'`, `group: <typeId>`, `tid` jak dawniej.

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): persist part+domain in sessions/log, lookup wiedza by id"
```

---

### Task 11: Podsumowanie i szczegóły sesji — etykieta grupy + źródło

**Files:**
- Modify: `web/index.html:2906-2918` (kolumna „Typ" + wiersze tabeli), `web/index.html:2935-2948` (review błędnych), `web/index.html:2952-2969` (review poprawnych)

- [ ] **Step 1: Nagłówek i wiersze tabeli podsumowania**

Zmień (2907):
```js
    html += '<thead><tr><th>#</th><th>Typ</th><th>Wynik</th><th>Czas (s)</th></tr></thead><tbody>';
```
na:
```js
    html += '<thead><tr><th>#</th><th>Kategoria</th><th>Wynik</th><th>Czas (s)</th></tr></thead><tbody>';
```
Zmień (2910):
```js
      const typeName = item.q ? (TYPE_NAMES[item.q.typeId] || ('Typ ' + item.q.typeId)) : '—';
```
na:
```js
      const typeName = item.q ? questionGroupLabel(item.q) : '—';
```

- [ ] **Step 2: Review błędnych — etykieta + body + źródło**

Zmień (2937–2946):
```js
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
```
na:
```js
        const typeName = questionGroupLabel(q);
        html += '<details class="review-item">';
        html += '<summary><span><span class="review-summary-wrong">✗</span> Pytanie ' + (x.i + 1) + ' — ' + escHtml(typeName) + '</span></summary>';
        html += '<div class="review-body">';
        html += '<div class="type-label">' + escHtml(typeName) + '</div>';
        html += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
        html += '<div class="question-body">' + questionBodyHtml(q) + '</div>';
        html += renderOptionsStatic(q, x.item.userAnswer);
        html += '<div class="explanation-box"><strong>Wyjaśnienie:</strong> ' + escHtml(q.explanation) + '</div>';
        html += sourceHtml(q);
        html += '</div>';
```

- [ ] **Step 3: Review poprawnych — etykieta + body + źródło**

Zmień (2957–2966):
```js
        const typeName = TYPE_NAMES[q.typeId] || ('Typ ' + q.typeId);
        html += '<details class="review-item">';
        html += '<summary><span><span class="review-summary-correct">✓</span> Pytanie ' + (x.i + 1) + ' — ' + escHtml(typeName) + '</span></summary>';
        html += '<div class="review-body">';
        html += '<div class="type-label">' + escHtml(typeName) + '</div>';
        html += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
        html += '<div class="question-body">' + renderQuestionBody(q) + '</div>';
        html += renderOptionsStatic(q, x.item.userAnswer);
        html += '<div class="explanation-box"><strong>Wyjaśnienie:</strong> ' + escHtml(q.explanation) + '</div>';
        html += '</div>';
```
na:
```js
        const typeName = questionGroupLabel(q);
        html += '<details class="review-item">';
        html += '<summary><span><span class="review-summary-correct">✓</span> Pytanie ' + (x.i + 1) + ' — ' + escHtml(typeName) + '</span></summary>';
        html += '<div class="review-body">';
        html += '<div class="type-label">' + escHtml(typeName) + '</div>';
        html += '<div class="instruction">' + escHtml(q.instruction) + '</div>';
        html += '<div class="question-body">' + questionBodyHtml(q) + '</div>';
        html += renderOptionsStatic(q, x.item.userAnswer);
        html += '<div class="explanation-box"><strong>Wyjaśnienie:</strong> ' + escHtml(q.explanation) + '</div>';
        html += sourceHtml(q);
        html += '</div>';
```

- [ ] **Step 4: Weryfikacja ręczna**

Ukończ sesję cz. II. Podsumowanie: kolumna „Kategoria" pokazuje nazwy dziedzin; sekcje „Przegląd błędnych/poprawnych" renderują stem + opcje (poprawna zaznaczona) + wyjaśnienie + „Źródło: …". Wejdź w Historia → Szczegóły tej sesji — to samo renderuje się poprawnie. Część I: podsumowanie i szczegóły jak dotąd (bez „Źródło"), figury typu 8 w review działają.

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): summary/detail use group label + show source in review"
```

---

### Task 12: Statystyki — filtr części + wykres per dziedzina

**Files:**
- Modify: `web/index.html:3324-3401` (`loadStats`); dodać `statsPart` + helper przed `loadStats`

- [ ] **Step 1: Dodaj zmienną kontekstu i przełącznik przed `loadStats` (przed 3324)**

Wstaw przed `function loadStats() {`:
```js
  // Filtr części na ekranie statystyk: 'I' | 'II' | 'all'. Domyślnie kontekst wejścia.
  var statsPart = 'I';

  function setStatsPart(p) { statsPart = p; loadStats(); }

  // Część wpisu logu (stare wpisy bez part = 'I'); group: cz. I = liczba (typ), cz. II = string (dziedzina).
  function logEntryPart(e) { return e.part || 'I'; }
  function logEntryGroup(e) {
    if (e.group !== undefined && e.group !== null) return e.group;
    return e.tid; // wstecznie dla starych wpisów cz. I
  }

  function statsPartToggleHtml() {
    var parts = [
      { id: 'I', label: 'Część I' },
      { id: 'II', label: 'Część II' },
      { id: 'all', label: 'Wszystko' }
    ];
    var html = '<div class="trend-toggle" style="margin-bottom:16px">';
    parts.forEach(function(p) {
      html += '<button class="' + (statsPart === p.id ? 'active' : '') + '" onclick="setStatsPart(\'' + p.id + '\')">' + p.label + '</button>';
    });
    return html + '</div>';
  }
```

- [ ] **Step 2: Przepisz `loadStats` (cała funkcja, 3324–3401) na wersję part-aware**

```js
  function loadStats() {
    const fullLog = getAnswerLog();
    const container = document.getElementById('stats-content');

    if (!fullLog.length) {
      container.innerHTML = '<p class="history-empty">Brak danych — ukończ co najmniej jedną sesję, żeby zobaczyć statystyki.</p>';
      return;
    }

    // Filtr części
    const log = (statsPart === 'all') ? fullLog : fullLog.filter(function(e) { return logEntryPart(e) === statsPart; });

    let html = statsPartToggleHtml();

    if (!log.length) {
      container.innerHTML = html + '<p class="history-empty">Brak danych dla tej części.</p>';
      return;
    }

    const total   = log.length;
    const correct = log.filter(function(e) { return e.ok; }).length;
    const wrong   = total - correct;

    // Oś grupowania zależna od widoku — KAŻDY wpis musi trafić do jakiejś grupy,
    // żeby suma słupków bilansowała się z kartami u góry:
    //  'I'  → typy 1–8 (log już przefiltrowany do cz. I),
    //  'II' → dziedziny (log przefiltrowany do cz. II),
    //  'all'→ części I/II (bez gubienia cz. II; szczegóły per typ/dziedzina w zakładkach).
    var view = statsPart; // 'I' | 'II' | 'all'
    var groupKeys = view === 'II'  ? WIEDZA_DOMAINS_ORDER.slice()
                  : view === 'all' ? ['I', 'II']
                  : [1,2,3,4,5,6,7,8];
    function groupOf(e) { return view === 'all' ? logEntryPart(e) : logEntryGroup(e); }
    var byGroup = {};
    groupKeys.forEach(function(k) { byGroup[k] = { correct: 0, wrong: 0 }; });
    log.forEach(function(e) {
      var g = groupOf(e);
      if (byGroup[g]) { if (e.ok) byGroup[g].correct++; else byGroup[g].wrong++; }
    });

    var scorePct = Math.round(correct / total * 100);
    var scoreColor = scorePct >= 80 ? '#27ae60' : scorePct >= 50 ? '#e67e22' : '#e74c3c';
    html += '<div style="text-align:center;margin-bottom:20px">';
    html += '<div style="font-size:3.5rem;font-weight:700;line-height:1;color:' + scoreColor + '">' + scorePct + '%</div>';
    html += '<div style="font-size:0.8rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px">Skuteczność ogólna</div>';
    html += '</div>';

    html += '<div class="stat-cards">';
    html += '<div class="stat-card"><div class="stat-value">' + total + '</div><div class="stat-label">Odpowiedzi</div></div>';
    html += '<div class="stat-card stat-card-good"><div class="stat-value">' + correct + '</div><div class="stat-label">Poprawne</div></div>';
    html += '<div class="stat-card stat-card-bad"><div class="stat-value">' + wrong + '</div><div class="stat-label">Błędne</div></div>';
    html += '</div>';

    html += '<div class="stats-section">' + trendSectionHtml() + '</div>';

    // Wykres słupkowy: per dziedzina (II) lub per typ (I/all)
    html += '<div class="stats-section">';
    if (view === 'II') {
      html += '<h3 style="margin-bottom:4px">Rozkład per dziedzina</h3>';
      html += '<p style="font-size:0.78rem;color:#6b7280;margin-bottom:8px">Skróty dziedzin opisane w tabeli poniżej</p>';
    } else if (view === 'all') {
      html += '<h3 style="margin-bottom:4px">Rozkład per część</h3>';
      html += '<p style="font-size:0.78rem;color:#6b7280;margin-bottom:8px">Skuteczność w części I (umiejętności) i II (wiedza). Szczegóły per typ/dziedzina w zakładkach części.</p>';
    } else {
      html += '<h3 style="margin-bottom:4px">Rozkład per typ pytania</h3>';
      html += '<p style="font-size:0.78rem;color:#6b7280;margin-bottom:8px">Cyfry 1–8 = typy opisane w tabeli poniżej</p>';
    }
    var chartData = {
      type: 'bar',
      xLabels: groupKeys.map(function(k) {
        if (view === 'II')  return { label: DOMAIN_SHORT[k] || k, title: DOMAIN_NAMES[k] || k };
        if (view === 'all') return { label: 'Część ' + k, title: 'Część ' + k };
        return { label: 'Typ ' + k, title: TYPE_NAMES[k] || 'Typ ' + k };
      }),
      datasets: [
        { label: 'Poprawne', data: groupKeys.map(function(k) { return byGroup[k].correct; }), color: '#27ae60' },
        { label: 'Błędne',   data: groupKeys.map(function(k) { return byGroup[k].wrong;   }), color: '#e74c3c' }
      ]
    };
    html += renderBarChart(chartData, { barWidthFactor: 0.45, pairGap: 2 });
    html += '</div>';

    // Tabela per grupa
    html += '<div class="data-table-wrap" style="margin-top:24px"><table class="summary-table">';
    var col = view === 'II' ? 'Dziedzina' : view === 'all' ? 'Część' : 'Typ pytania';
    html += '<thead><tr><th>' + col + '</th><th style="text-align:center">Odpowiedzi</th><th style="text-align:center">✓ %</th><th style="text-align:center">✗ %</th></tr></thead><tbody>';
    groupKeys.forEach(function(k) {
      var c = byGroup[k].correct, w = byGroup[k].wrong, tot = c + w;
      var correctPct = tot ? Math.round(c / tot * 100) + '%' : '—';
      var wrongPct   = tot ? Math.round(w / tot * 100) + '%' : '—';
      var nameCell;
      if (view === 'II')       nameCell = '<span style="color:#6b7280;font-weight:600">' + escHtml(DOMAIN_SHORT[k] || k) + ':</span> ' + escHtml(DOMAIN_NAMES[k] || k);
      else if (view === 'all') nameCell = '<span style="color:#6b7280;font-weight:600">Część ' + k + '</span>';
      else                     nameCell = '<span style="color:#6b7280;font-weight:600">Typ ' + k + ':</span> ' + escHtml(TYPE_NAMES[k] || ('Typ ' + k));
      html += '<tr>';
      html += '<td style="font-size:0.78rem">' + nameCell + '</td>';
      html += '<td style="text-align:center">' + (tot || '—') + '</td>';
      html += '<td style="text-align:center;color:#27ae60;font-weight:600">' + correctPct + '</td>';
      html += '<td style="text-align:center;color:#e74c3c;font-weight:600">' + wrongPct + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    if (getSessions().length >= 3) html += kofiWidget();

    container.innerHTML = html;
  }
```

> Wykres trendu (`trendSectionHtml`/`trendInnerHtml`) pozostaje globalny (per sesja, niezależny od części) — poza zakresem tej zmiany; może w przyszłości też dostać filtr części.

- [ ] **Step 3: Ustaw kontekst `statsPart` przy wejściu z huba/sesji**

W markupie home (Task 5) link Statystyki zmień na ustawiający kontekst „Wszystko":
`onclick="showScreen('stats'); setStatsPart('all');"` — zmień przycisk w `.home-links` (Statystyki) odpowiednio. W przyciskach podsumowania (`showSummary`, 3009) zmień `onclick="showScreen('stats'); loadStats();"` na `onclick="showScreen('stats'); setStatsPart('` + state.part + `');"`:
```js
    html += '<button class="ghost" onclick="showScreen(\'stats\'); setStatsPart(\'' + state.part + '\');">Statystyki</button>';
```

- [ ] **Step 4: Weryfikacja ręczna**

Ukończ po jednej sesji cz. I i cz. II. Statystyki: przełącznik „Część I / Część II / Wszystko". Część I → wykres per-typ (8). Część II → wykres per-dziedzina (6) + tabela dziedzin. „Wszystko" → łączna skuteczność + rozkład per część (I/II); **sprawdź, że suma „Odpowiedzi" w tabeli (Część I + Część II) równa się karcie „Odpowiedzi" u góry** — liczby muszą się bilansować. Stare dane (bez `part`) liczą się do „Część I".

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): stats screen with part filter + per-domain breakdown"
```

---

### Task 13: Historia — filtr części + badge

**Files:**
- Modify: `web/index.html:3203-3241` (`loadHistory`); dodać `historyPart` przed funkcją

- [ ] **Step 1: Dodaj kontekst + przełącznik przed `loadHistory` (przed 3203)**

```js
  var historyPart = 'all';
  function setHistoryPart(p) { historyPart = p; loadHistory(); }
  function sessionPart(s) { return s.part || 'I'; }
  function historyPartToggleHtml() {
    var parts = [{ id: 'all', label: 'Wszystko' }, { id: 'I', label: 'Część I' }, { id: 'II', label: 'Część II' }];
    var html = '<div class="trend-toggle" style="margin-bottom:16px">';
    parts.forEach(function(p) {
      html += '<button class="' + (historyPart === p.id ? 'active' : '') + '" onclick="setHistoryPart(\'' + p.id + '\')">' + p.label + '</button>';
    });
    return html + '</div>';
  }
```

- [ ] **Step 2: Przepisz `loadHistory` (3203–3241)**

```js
  function loadHistory() {
    const all = getSessions();
    const container = document.getElementById('history-content');

    if (!all.length) {
      container.innerHTML = '<p class="history-empty">Brak historii sesji.</p>';
      return;
    }

    // si = indeks w pełnej liście (showSessionDetail oczekuje indeksu z getSessions()).
    const rows = all.map(function(sess, si) { return { sess: sess, si: si }; })
      .filter(function(r) { return historyPart === 'all' || sessionPart(r.sess) === historyPart; });

    let html = historyPartToggleHtml();

    if (!rows.length) {
      container.innerHTML = html + '<p class="history-empty">Brak sesji w tej części.</p>';
      return;
    }

    html += '<div class="history-table-wrap"><table class="history-table">';
    html += '<thead><tr><th>Data</th><th>Część</th><th>Tryb</th><th>Wynik</th><th>Czas</th><th></th></tr></thead><tbody>';

    rows.forEach(function(r) {
      const sess = r.sess, si = r.si;
      const dateStr = formatDate(sess.date);
      const partLabel = sessionPart(sess) === 'II'
        ? '<span class="badge-part badge-part-ii">II</span>'
        : '<span class="badge-part badge-part-i">I</span>';
      const modeLabel = sess.mode === 'exam'
        ? '<span class="badge-mode-exam">Egzamin</span>'
        : '<span class="badge-mode-learning">Nauka</span>';
      const total = sess.total || (sess.questions ? sess.questions.length : 15);
      const scoreStr = sess.score + ' / ' + total;
      let timeStr = '—';
      if (sess.timerEnabled && sess.totalTimeSec !== null) {
        const m = Math.floor(sess.totalTimeSec / 60);
        const s = sess.totalTimeSec % 60;
        timeStr = m + ':' + String(s).padStart(2, '0');
      }
      html += '<tr id="hist-row-' + si + '">';
      html += '<td style="font-size:0.8rem;white-space:nowrap">' + dateStr + '</td>';
      html += '<td>' + partLabel + '</td>';
      html += '<td>' + modeLabel + '</td>';
      html += '<td style="font-weight:600">' + scoreStr + '</td>';
      html += '<td>' + timeStr + '</td>';
      html += '<td><button class="btn-sm" onclick="showSessionDetail(' + si + ')">Szczegóły</button></td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    if (all.length >= 3) html += kofiWidget();
    container.innerHTML = html;
  }
```

- [ ] **Step 3: Dodaj CSS badge części (przy `.badge-mode-*` — znajdź `grep -n "badge-mode-exam" web/index.html` w bloku `<style>` i wstaw obok)**

```css
    .badge-part { font-size: 0.72rem; font-weight: 700; border-radius: 4px; padding: 2px 7px; }
    .badge-part-i { background: #eef2ff; color: #3730a3; }
    .badge-part-ii { background: #ecfdf5; color: #047857; }
```

- [ ] **Step 4: Weryfikacja ręczna**

Historia: przełącznik „Wszystko / Część I / Część II"; kolumna „Część" z badge I/II; „Szczegóły" otwiera właściwą sesję (sprawdź sesję cz. II i cz. I). Stare sesje (bez `part`) → badge „I".

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(wiedza): history screen with part filter + part badge"
```

---

### Task 14: GA zdarzenia sesji + teksty (About, manifest)

**Files:**
- Modify: `web/index.html:2848` (`session_aborted`), `web/index.html:2996-3003` (`session_completed`), sekcja About (ok. 1392–1407), `web/manifest.json`

- [ ] **Step 1: `session_completed` — dodaj `exam_part`**

Zmień (2996–3003):
```js
    gtag('event', 'session_completed', {
      session_mode: state.mode,
      session_difficulty: state.difficulty,
      score: meta.score,
      questions_total: meta.total,
      score_pct: Math.round(meta.score / meta.total * 100),
      timer_enabled: state.timerEnabled
    });
```
na:
```js
    gtag('event', 'session_completed', {
      exam_part: state.part,
      session_mode: state.mode,
      session_difficulty: state.part === 'II' ? state.wiedzaLevel : state.difficulty,
      score: meta.score,
      questions_total: meta.total,
      score_pct: Math.round(meta.score / meta.total * 100),
      timer_enabled: state.timerEnabled
    });
```

- [ ] **Step 2: `session_aborted` — dodaj `exam_part`**

Znajdź blok `gtag('event', 'session_aborted', {` (ok. 2848) i dodaj jako pierwszy parametr `exam_part: state.part,`. Pełny blok po zmianie:
```js
      gtag('event', 'session_aborted', {
        exam_part: state.part,
        at_question_index: state.currentIndex,
        questions_total: state.session.length,
        session_mode: state.mode,
        session_difficulty: state.part === 'II' ? state.wiedzaLevel : state.difficulty
      });
```
> Zweryfikuj nazwy istniejących pól przez `grep -n -A6 "session_aborted'" web/index.html` przed edycją i zachowaj istniejące pola; dodaj tylko `exam_part`.

- [ ] **Step 3: Sekcja „O aplikacji" — wspomnij część II**

W `#screen-about` (sekcja opisująca „8 typów zadań", ok. 1392–1407) dodaj akapit po liście typów:
```html
    <p><strong>Część II — sprawdzian wiedzy.</strong> Druga część egzaminu sprawdza wiedzę z 6 dziedzin: prawa, zagadnień społeczno-ekonomicznych, administracji publicznej, finansów publicznych, polityki zagranicznej i organizacji międzynarodowych oraz organizacji i zarządzania. To pytania jednokrotnego wyboru — w aplikacji ćwiczysz je w sesjach po 15 pytań, z możliwością zawężenia do wybranych dziedzin i poziomu trudności.</p>
```

- [ ] **Step 4: `manifest.json` — opis o obu częściach**

Zmień `description`:
```json
  "description": "Sprawdzian kompetencji menedżerskich i przywódczych",
```
na:
```json
  "description": "Ćwiczenia przed egzaminem na urzędnika mianowanego — część I (umiejętności) i część II (wiedza)",
```

- [ ] **Step 5: Weryfikacja ręczna**

DevTools → dataLayer: ukończenie i przerwanie sesji cz. II niosą `exam_part: 'II'`. Ekran „O aplikacji" zawiera akapit o części II. Manifest ma nowy opis.

- [ ] **Step 6: Commit**

```bash
git add web/index.html web/manifest.json
git commit -m "feat(wiedza): exam_part in session GA events + about/manifest copy"
```

---

### Task 15: Integracyjna weryfikacja na deploy preview (mobile)

**Files:** brak zmian kodu (chyba że ujawnią się usterki).

- [ ] **Step 1: Uruchom wszystkie testy logiki**

Run:
```bash
node tools/test-build-web.js
node tools/test-session-wiedza.js
node tools/test-session-blueprint.js
```
Expected: trzy `✅ … OK` (regresja części I nietknięta).

- [ ] **Step 2: Push gałęzi i otwórz PR (na prośbę użytkownika)**

```bash
git push -u origin <gałąź-integracji>
gh pr create --title "Integracja części II (sprawdzian wiedzy)" --body "Implementacja wg planu docs/superpowers/plans/2026-06-13-integracja-czesc-ii-wiedza.md"
```

- [ ] **Step 3: Smoke test na deploy preview (telefon)**

Na URL-u deploy preview Netlify przejdź ścieżkę:
1. Home → dwa kafelki z liczbami (640 / 827).
2. Część II → setup: chipy dziedzin z licznikami, 4 poziomy, tryb.
3. Filtr „Organizacja" + „Średnie" → Rozpocznij → 15 (lub mniej) pytań, etykieta „ORGANIZACJA I ZARZĄDZANIE", stem + opcje.
4. Tryb Nauka: feedback + wyjaśnienie + „Źródło: …".
5. Ukończ → podsumowanie (kolumna „Kategoria" = dziedziny), review ze źródłem.
6. Statystyki → przełącz Część II → wykres per-dziedzina. Historia → badge II, Szczegóły działają.
7. Część I → pełny przebieg bez regresji (typy 1–8, figury).
8. Offline/PWA: po pierwszym załadowaniu wyłącz sieć — aplikacja i pytania cz. II działają (sw v9).

- [ ] **Step 4: Zaktualizuj BACKLOG / przenieś do DONE**

Po potwierdzeniu działania zaktualizuj wpis w BACKLOG.md (link do PR) lub przenieś do BACKLOG_DONE.md zgodnie z CLAUDE.md.

---

## Self-review (autor planu)

- **Pokrycie spec:** §4 dane/build → Task 1; §6 dobór → Task 2; §4.1 ładowanie + §10 sw → Task 3; §5.1 hub → Task 5; §5.2 setup II + §5.3 routing → Task 6; §6 integracja doboru → Task 7; §7 render → Task 8; §7 źródło + §9 GA → Task 9, 11; §8.1 log/sesje → Task 10; §8.2 statystyki → Task 12; §8.3 historia → Task 13; §9 GA sesji + §10 manifest/about → Task 14; weryfikacja całości → Task 15. Helpery (§reuse) → Task 4.
- **Brak placeholderów:** każdy krok kodu ma pełny snippet (old→new) lub kompletną funkcję.
- **Spójność typów/nazw:** `state.part`, `isWiedza`, `questionGroupLabel`, `questionBodyHtml`, `sourceHtml`, `answerEventParams`, `DOMAIN_NAMES`/`DOMAIN_SHORT`/`WIEDZA_DOMAINS_ORDER`, `composeWiedzaSession`, `logEntryPart`/`logEntryGroup`/`sessionPart`, `statsPart`/`setStatsPart`, `historyPart`/`setHistoryPart` — używane spójnie między zadaniami.
- **Kompatybilność wsteczna:** stare wpisy logu/sesji bez `part` traktowane jako część I (`logEntryPart`, `sessionPart`); `tid` zachowane dla cz. I; `group` z fallbackiem na `tid`.
