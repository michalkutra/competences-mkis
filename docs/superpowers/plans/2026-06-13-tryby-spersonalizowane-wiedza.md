# Tryby spersonalizowane (cz. II) + badge pochodzenia + tryb admina — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Zasada repo (CLAUDE.md):** commity wykonujemy **tylko na wyraźną prośbę użytkownika**. Kroki „Commit" w planie są częścią zamierzonej granulacji — wykonaj je, gdy użytkownik da zielone światło. Komunikaty commitów kończ stopką `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

**Goal:** Dla części II (wiedza) dodać: badge „Pytanie z egzaminu KSAP {rok}" (dla wszystkich), oraz — za jedną flagą **trybu admina** (`ksap_admin`) — dwa tryby spersonalizowane: „Mapa wiedzy" (skuteczność+pokrycie per dziedzina/temat, drill, start sesji) i „Tylko prawdziwe pytania KSAP".

**Architecture:** Reużywamy istniejący silnik sesji (`buildSession`/render/summary → zapis `ksap_sessions` + `ksap_answer_log`) — nowa funkcja `startPersonalizedSession(filter)` tylko składa przefiltrowaną 15-pytaniową sesję i wpina się w tę ścieżkę. Logikę czystą (filtr `realOnly`, agregacja statystyk) trzymamy w testowalnych modułach (`web/session-wiedza.js`, nowy `web/wiedza-stats.js`); DOM (badge, ekran mapy, menu, panel) weryfikujemy ręcznie — repo nie ma harnessu jsdom, a testy to plain-node `assert` na czystych modułach.

**Tech Stack:** Vanilla JS (jeden `web/index.html` + skrypty-globale ładowane `<script>`), brak frameworka/buildu. Testy: `node tools/test-*.js` (assert + vm).

---

## Pliki — odpowiedzialności

- `web/session-wiedza.js` — **modyfikacja**: filtr `realOnly` w `composeWiedzaSession` (czysta funkcja).
- `web/wiedza-stats.js` — **nowy**: czysta funkcja `aggregateWiedzaStats(log, questions)` — skuteczność/pokrycie per dziedzina i per temat z `ksap_answer_log` (join `qId→topicId`).
- `tools/test-session-wiedza.js` — **modyfikacja**: test `realOnly`.
- `tools/test-wiedza-stats.js` — **nowy**: testy agregacji.
- `web/index.html` — **modyfikacja**: blok GTM (admin→GA off), `isAdmin()`, panel debug (auto-show + przycisk), `startPersonalizedSession`, badge w `renderQuestion`, ekran `#screen-mapa` + render, wpisy menu (admin-gated), stałe `TOPIC_NAMES`/`WIEDZA_DOMAIN_COLORS`, ładowanie `wiedza-stats.js`, `SCREEN_PATHS['mapa']`.

---

## Task 1: Filtr `realOnly` w `composeWiedzaSession`

**Files:**
- Modify: `web/session-wiedza.js:31-46`
- Test: `tools/test-session-wiedza.js`

- [ ] **Step 1: Dopisz failing test** — w `tools/test-session-wiedza.js` przed linią `console.log('✅ session-wiedza OK');` dodaj:

```js
// 6) realOnly — tylko pytania z prawdziwych egzaminów (origin != 'generated')
const poolO = [
  { id: 'w_pr_1', domain: 'pr', level: 'easy',   origin: 'ksap-2023' },
  { id: 'w_pr_2', domain: 'pr', level: 'medium', origin: 'generated' },
  { id: 'w_se_1', domain: 'se', level: 'hard',   origin: 'ksap-2025' },
  { id: 'w_se_2', domain: 'se', level: 'easy',   origin: 'generated' },
];
const sr = composeWiedzaSession(poolO, { realOnly: true }, Object.create(null), makeRng(11));
assert.ok(sr.length === 2, 'realOnly: zostają 2 pytania egzaminacyjne');
assert.ok(sr.every((x) => x.origin && x.origin !== 'generated'), 'realOnly: brak generated');
// bez flagi — wszystkie 4
const sr0 = composeWiedzaSession(poolO, {}, Object.create(null), makeRng(11));
assert.strictEqual(sr0.length, 4, 'bez realOnly: cała pula');
```

- [ ] **Step 2: Uruchom test — ma FAIL**

Run: `node tools/test-session-wiedza.js`
Expected: AssertionError na „realOnly: zostają 2 pytania egzaminacyjne" (filtr jeszcze nie istnieje → zwraca 4).

- [ ] **Step 3: Zaimplementuj filtr** — w `web/session-wiedza.js`, w `composeWiedzaSession`, po linii z `var level = ...` dodaj odczyt flagi, a w `.filter(...)` dodaj warunek:

```js
    var level = (opts.level && opts.level !== 'all') ? opts.level : null;
    var realOnly = !!opts.realOnly;
    var size = opts.size || SESSION_SIZE;

    var filtered = (pool || []).filter(function (q) {
      if (domains && domains.indexOf(q.domain) === -1) return false;
      if (level && q.level !== level) return false;
      if (realOnly && (!q.origin || q.origin === 'generated')) return false;
      return true;
    });
```

- [ ] **Step 4: Uruchom test — ma PASS**

Run: `node tools/test-session-wiedza.js`
Expected: `✅ session-wiedza OK`

- [ ] **Step 5: Commit** (na prośbę użytkownika)

```bash
git add web/session-wiedza.js tools/test-session-wiedza.js
git commit -m "feat(wiedza): filtr realOnly w composeWiedzaSession"
```

---

## Task 2: Czysta agregacja statystyk wiedzy (`web/wiedza-stats.js`)

**Files:**
- Create: `web/wiedza-stats.js`
- Test: `tools/test-wiedza-stats.js`

Kontrakt `aggregateWiedzaStats(log, questions)`:
- `log`: tablica wpisów z `ksap_answer_log` (`{ qId, ok, ... }`).
- `questions`: `QUESTIONS_WIEDZA` (`{ id, domain, topicId }`).
- Zwraca `{ domains: { <code>: Stat }, topics: { <topicId>: Stat } }`, gdzie `Stat = { total, seen, attempts, correct, accuracy }`:
  - `total` — liczba pytań w puli (z `questions`),
  - `seen` — liczba **różnych** pytań z tej grupy, na które padła odpowiedź,
  - `attempts` — liczba odpowiedzi (wpisów logu) w grupie,
  - `correct` — liczba poprawnych,
  - `accuracy` — `correct/attempts` albo `null` gdy `attempts === 0`.
- Tylko pytania wiedzy: wpis logu liczy się, jeśli jego `qId` istnieje w `questions` (po tym rozpoznajemy cz. II — odporne na brak pola `part`).

- [ ] **Step 1: Dopisz failing test** — utwórz `tools/test-wiedza-stats.js`:

```js
// tools/test-wiedza-stats.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/wiedza-stats.js', 'utf8'), ctx);
const { aggregateWiedzaStats } = ctx;

const questions = [
  { id: 'w_pr_1', domain: 'pr', topicId: 'pr.kpa' },
  { id: 'w_pr_2', domain: 'pr', topicId: 'pr.kpa' },
  { id: 'w_pr_3', domain: 'pr', topicId: 'pr.zrodla-prawa' },
  { id: 'w_se_1', domain: 'se', topicId: 'se.makroekonomia' },
];
const log = [
  { qId: 'w_pr_1', ok: true },
  { qId: 'w_pr_1', ok: false },   // to samo pytanie drugi raz
  { qId: 'w_pr_2', ok: true },
  { qId: 'w_se_1', ok: false },
  { qId: 'NOPE',   ok: true },    // nie-wiedza / nieznane → ignorowane
];

const r = aggregateWiedzaStats(log, questions);

// dziedzina pr: 3 pytania w puli, 2 różne widziane, 3 próby, 2 poprawne
assert.strictEqual(r.domains.pr.total, 3, 'pr.total');
assert.strictEqual(r.domains.pr.seen, 2, 'pr.seen');
assert.strictEqual(r.domains.pr.attempts, 3, 'pr.attempts');
assert.strictEqual(r.domains.pr.correct, 2, 'pr.correct');
assert.ok(Math.abs(r.domains.pr.accuracy - 2/3) < 1e-9, 'pr.accuracy');

// temat pr.kpa: 2 pytania, 2 widziane, 3 próby, 2 poprawne
assert.strictEqual(r.topics['pr.kpa'].seen, 2, 'kpa.seen');
assert.strictEqual(r.topics['pr.kpa'].attempts, 3, 'kpa.attempts');

// temat nieruszony: accuracy null, seen 0
assert.strictEqual(r.topics['pr.zrodla-prawa'].seen, 0, 'zrodla.seen');
assert.strictEqual(r.topics['pr.zrodla-prawa'].accuracy, null, 'zrodla.accuracy null');

// wpis 'NOPE' zignorowany — se ma 1 próbę
assert.strictEqual(r.domains.se.attempts, 1, 'se.attempts (NOPE ignorowane)');

console.log('✅ wiedza-stats OK');
```

- [ ] **Step 2: Uruchom test — ma FAIL**

Run: `node tools/test-wiedza-stats.js`
Expected: błąd „Cannot find module" / `aggregateWiedzaStats is not a function` (plik jeszcze nie istnieje).

- [ ] **Step 3: Zaimplementuj `web/wiedza-stats.js`:**

```js
// web/wiedza-stats.js
// Czysta agregacja statystyk części II (wiedza) z ksap_answer_log.
// Skuteczność (accuracy) i pokrycie (seen/total) per dziedzina i per temat.
// Join qId -> question (domain, topicId). Bez DOM, testowalne node-em.
(function (root) {
  'use strict';

  function blankStat(total) {
    return { total: total || 0, seen: 0, attempts: 0, correct: 0, accuracy: null };
  }
  function finalize(stat) {
    stat.accuracy = stat.attempts ? stat.correct / stat.attempts : null;
    return stat;
  }

  function aggregateWiedzaStats(log, questions) {
    questions = questions || [];
    log = log || [];

    var byId = Object.create(null);
    var domains = Object.create(null);
    var topics = Object.create(null);

    // totale z puli pytań
    questions.forEach(function (q) {
      if (!q || !q.id) return;
      byId[q.id] = q;
      if (q.domain) {
        if (!domains[q.domain]) domains[q.domain] = blankStat(0);
        domains[q.domain].total++;
      }
      if (q.topicId) {
        if (!topics[q.topicId]) topics[q.topicId] = blankStat(0);
        topics[q.topicId].total++;
      }
    });

    var seenDomain = Object.create(null); // code -> Set(qId)
    var seenTopic = Object.create(null);  // topicId -> Set(qId)
    function seenSet(map, key) { return (map[key] || (map[key] = Object.create(null))); }

    log.forEach(function (e) {
      if (!e || !e.qId) return;
      var q = byId[e.qId];
      if (!q) return; // nie-wiedza / nieznane
      var dStat = domains[q.domain], tStat = topics[q.topicId];
      if (dStat) {
        dStat.attempts++; if (e.ok) dStat.correct++;
        var ds = seenSet(seenDomain, q.domain); if (!ds[e.qId]) { ds[e.qId] = 1; dStat.seen++; }
      }
      if (tStat) {
        tStat.attempts++; if (e.ok) tStat.correct++;
        var ts = seenSet(seenTopic, q.topicId); if (!ts[e.qId]) { ts[e.qId] = 1; tStat.seen++; }
      }
    });

    Object.keys(domains).forEach(function (k) { finalize(domains[k]); });
    Object.keys(topics).forEach(function (k) { finalize(topics[k]); });

    return { domains: domains, topics: topics };
  }

  var api = { aggregateWiedzaStats: aggregateWiedzaStats };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.aggregateWiedzaStats = aggregateWiedzaStats; root.WIEDZA_STATS = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
```

- [ ] **Step 4: Uruchom test — ma PASS**

Run: `node tools/test-wiedza-stats.js`
Expected: `✅ wiedza-stats OK`

- [ ] **Step 5: Załaduj skrypt w index.html** — znajdź linię ładującą `session-wiedza.js` i dodaj `wiedza-stats.js` obok:

Run: `grep -n 'session-wiedza.js' web/index.html`
Po znalezionym `<script src="session-wiedza.js"></script>` dodaj w kolejnej linii:

```html
  <script src="wiedza-stats.js"></script>
```

- [ ] **Step 6: Commit** (na prośbę użytkownika)

```bash
git add web/wiedza-stats.js tools/test-wiedza-stats.js web/index.html
git commit -m "feat(wiedza): aggregateWiedzaStats — skuteczność/pokrycie per dziedzina i temat"
```

---

## Task 3: `startPersonalizedSession(filter)` — launcher reużywający silnik

**Files:**
- Modify: `web/index.html` (obok `startSession`, ~2123)

Launcher startuje 15-pytaniową sesję wiedzy z dowolnym filtrem, **bez dotykania** `goSetupWiedza`/setupu. Reużywa render+summary+zapis (czyli sesje liczą się do historii i statystyk).

- [ ] **Step 1: Dodaj funkcję** — wstaw po `startSession() { ... }` (po jej klamrze zamykającej, ~2147):

```js
  // Tryby spersonalizowane: składają 15-pyt. sesję wiedzy z filtrem i odpalają
  // istniejącą ścieżkę sesji (render/summary/zapis). filter: { domains?, level?, realOnly? }
  function startPersonalizedSession(filter) {
    filter = filter || {};
    state.part = 'II';
    state.mode = 'learning';            // z wyjaśnieniami
    var lastSeen = getLastSeenMap();
    var built = composeWiedzaSession(
      (typeof QUESTIONS_WIEDZA !== 'undefined') ? QUESTIONS_WIEDZA : [],
      { domains: filter.domains || [], level: filter.level || 'all', realOnly: !!filter.realOnly },
      lastSeen, Math.random
    );
    if (!built.length) { alert('Brak pytań dla wybranego trybu.'); return; }
    state.session = built;
    state.currentIndex = 0;
    state.answers = [];
    state.sessionStartTime = Date.now();
    gtag('event', 'session_started', {
      exam_part: 'II', session_mode: 'learning',
      session_difficulty: filter.level || 'all', timer_enabled: state.timerEnabled,
      personalized: filter.realOnly ? 'real_only' : (filter.domains && filter.domains.length ? 'domain' : 'mixed')
    });
    showScreen('question');
    renderQuestion();
  }
```

- [ ] **Step 2: Weryfikacja ręczna (smoke przez konsolę)** — uruchom lokalny podgląd:

Run: `cd web && python3 -m http.server 8765` (Ctrl+C po teście)
W przeglądarce otwórz `http://localhost:8765/`, w konsoli DevTools wpisz:
`startPersonalizedSession({ realOnly: true })`
Expected: pojawia się ekran pytania z sesją; w konsoli brak błędów; pytania mają `origin` ≠ `generated` (sprawdź `state.session.every(q=>q.origin!=='generated')` → `true`).

- [ ] **Step 3: Commit** (na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "feat(wiedza): startPersonalizedSession — launcher trybów spersonalizowanych"
```

---

## Task 4: Tryb admina — `ksap_admin`, GA off, panel auto-show

**Files:**
- Modify: `web/index.html` blok GTM (~1147-1151), panel debug `initDebugPanel` (~3821-3823 i build())

- [ ] **Step 1: Bootstrap + GA off** — w bloku `<script>` analityki (~1147) zamień fragment ustalający `KSAP_NO_TRACK` i warunek na:

```js
  // ?admin=1 ustawia trwałą flagę admina (panel + brak GA + tryby spersonalizowane).
  try {
    if (/(?:^|[?&])admin=1(?:&|$)/.test(location.search)) {
      document.cookie = 'ksap_admin=1; path=/; max-age=' + (60 * 60 * 24 * 3650);
    }
  } catch (e) {}
  var KSAP_ADMIN = /(?:^|;\s*)ksap_admin=1(?:;|$)/.test(document.cookie);
  var KSAP_NO_TRACK = /(?:^|;\s*)ksap_no_track=1(?:;|$)/.test(document.cookie);
  if (KSAP_NO_TRACK || KSAP_ADMIN) {
    if (window.console) console.info('[KSAP] Tracking WYŁĄCZONY (no_track lub admin) — GA4/GTM nie ładuje się.');
  } else if (location.hostname === 'egzamin.kutra.pl') {
```

(reszta bloku `else if` GTM bez zmian).

- [ ] **Step 2: Helper `isAdmin()`** — w głównym skrypcie aplikacji (obok innych helperów, np. tuż przed `initDebugPanel`) dodaj:

```js
  function isAdmin() { return /(?:^|;\s*)ksap_admin=1(?:;|$)/.test(document.cookie); }
```

- [ ] **Step 3: Panel auto-show** — w `initDebugPanel` (~3823) zamień warunek wejścia:

```js
    try {
      if (new URLSearchParams(window.location.search).get('debug') !== '1' && !isAdmin()) return;
    } catch (e) { if (!isAdmin()) return; }
```

- [ ] **Step 4: Przycisk „Wyłącz tryb admina"** — w `build()` panelu, tam gdzie dodawane są przyciski przez `mkBtn(...)`, dołóż (przy istniejącym toggle trackingu):

```js
      if (isAdmin()) {
        body.appendChild(mkBtn('Wyłącz tryb admina', '#b91c1c', function () {
          document.cookie = 'ksap_admin=; path=/; max-age=0';
          alert('Tryb admina WYŁĄCZONY. Przeładuję stronę.');
          window.location.reload();
        }));
      }
```

(Wstaw analogicznie jak istniejące `body.appendChild(mkBtn('...', ..., toggleTracking))`. Jeśli nie ma jeszcze żadnego `body.appendChild(mkBtn(...))`, dodaj po utworzeniu `body`.)

- [ ] **Step 5: Weryfikacja ręczna**

Run: `cd web && python3 -m http.server 8765`
1. Otwórz `http://localhost:8765/?admin=1` → panel 🔧 DEBUG widoczny **bez** `?debug=1`; widać przycisk „Wyłącz tryb admina".
2. Odśwież `http://localhost:8765/` (bez parametru) → panel nadal widoczny (cookie trzyma).
3. Konsola: brak requestu do `googletagmanager.com` (Network) — na localhost GA i tak off, ale `document.cookie` zawiera `ksap_admin=1`.
4. Kliknij „Wyłącz tryb admina" → reload, panel znika, cookie wyczyszczone.
Expected: jw.

- [ ] **Step 6: Commit** (na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "feat: tryb admina (ksap_admin) — panel auto-show + auto-off GA"
```

---

## Task 5: Badge pochodzenia pytania (dla wszystkich)

**Files:**
- Modify: `web/index.html` — CSS (sekcja stylów) + `renderQuestion` (~2274)

- [ ] **Step 1: CSS badge** — w `<style>` dodaj (obok innych reguł, np. przy `.type-label`):

```css
    .origin-badge {
      display: inline-block; margin: 0 0 10px; padding: 4px 10px; border-radius: 999px;
      font-size: 0.74rem; font-weight: 700; letter-spacing: .02em;
      background: #ecfdf5; color: #16a34a; border: 1px solid #bbf7d0;
    }
```

- [ ] **Step 2: Helper + wstrzyknięcie** — w `renderQuestion`, w budowaniu `bodyHtml`, zaraz po linii z `type-label` dodaj badge:

Znajdź:
```js
    bodyHtml += '<div class="type-label">' + escHtml(questionGroupLabel(q)) + '</div>';
```
Dodaj po niej:
```js
    bodyHtml += originBadgeHtml(q);
```

Oraz dodaj helper (np. tuż przed `renderQuestion`):
```js
  // Badge „Pytanie z egzaminu KSAP {rok}" — tylko cz. II i tylko realne (origin ksap-YYYY).
  // 'generated' i inne → brak badge (świadomie, bez pieczątki „gorszości").
  function originBadgeHtml(q) {
    if (!isWiedza(q) || !q || !q.origin) return '';
    var m = /^ksap-(\d{4})$/.exec(q.origin);
    if (!m) return '';
    return '<div class="origin-badge">✓ Pytanie z egzaminu KSAP ' + m[1] + '</div>';
  }
```

- [ ] **Step 3: Weryfikacja ręczna**

Run: `cd web && python3 -m http.server 8765`
1. Otwórz `http://localhost:8765/`, wejdź w „Sprawdzian wiedzy", odpal sesję.
2. Dla pytań z prawdziwych egzaminów widać zielony badge „✓ Pytanie z egzaminu KSAP 2023/2024/2025" **od razu, przed odpowiedzią**; dla `generated` — brak badge.
   - Szybki test składu sesji w konsoli: `startPersonalizedSession({realOnly:true})` → każde pytanie ma badge.
3. Część I (umiejętności) — badge się nie pojawia.
Expected: jw.

- [ ] **Step 4: Commit** (na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "feat(wiedza): badge 'Pytanie z egzaminu KSAP {rok}' w sesji (dla wszystkich)"
```

---

## Task 6: Wpisy menu trybów (widoczne tylko dla admina) + „Tylko prawdziwe pytania"

**Files:**
- Modify: `web/index.html` — `#account-menu` (~1185-1192), `toggleAccountMenu` (~1771)

- [ ] **Step 1: Dodaj ukryte wpisy menu** — w `#account-menu`, po wpisie „Nowa sesja" i divider, dodaj sekcję trybów (domyślnie ukryta przez `style="display:none"`, oznaczona klasą do pokazywania):

Znajdź:
```html
      <button class="menu-item menu-item-primary" onclick="goSetup(); closeAccountMenu();">Nowa sesja</button>
      <div class="menu-divider"></div>
```
Wstaw po tym:
```html
      <div class="admin-only" style="display:none">
        <button class="menu-item" onclick="showScreen('mapa'); renderMapa(); closeAccountMenu();">🗺️ Mapa wiedzy</button>
        <button class="menu-item" onclick="startPersonalizedSession({ realOnly: true }); closeAccountMenu();">✓ Tylko prawdziwe pytania KSAP</button>
        <div class="menu-divider"></div>
      </div>
```

- [ ] **Step 2: Pokaż wpisy adminowi** — w `toggleAccountMenu()` (przy otwieraniu menu), przed pokazaniem menu, ustaw widoczność sekcji admin:

Znajdź w `toggleAccountMenu`:
```js
    if (menu.hasAttribute('hidden')) {
```
Dodaj w tym bloku (zaraz po nim):
```js
      document.querySelectorAll('#account-menu .admin-only').forEach(function (el) {
        el.style.display = isAdmin() ? 'block' : 'none';
      });
```

- [ ] **Step 3: Weryfikacja ręczna**

Run: `cd web && python3 -m http.server 8765`
1. `http://localhost:8765/` (bez admina) → otwórz menu konta: **brak** wpisów „Mapa wiedzy" / „Tylko prawdziwe pytania".
2. `http://localhost:8765/?admin=1` → otwórz menu: oba wpisy widoczne. Klik „Tylko prawdziwe pytania KSAP" → startuje sesja samych pytań egzaminacyjnych (każde z badge).
Expected: jw.

- [ ] **Step 4: Commit** (na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "feat(wiedza): wpisy menu trybów spersonalizowanych (admin-only)"
```

---

## Task 7: Ekran „Mapa wiedzy" — render, drill per temat, start sesji

**Files:**
- Modify: `web/index.html` — stałe (`TOPIC_NAMES`, `WIEDZA_DOMAIN_COLORS`), nowy `#screen-mapa`, `SCREEN_PATHS`, funkcje `renderMapa`/`renderMapaDomain`

- [ ] **Step 1: Stałe** — obok `DOMAIN_NAMES`/`DOMAIN_SHORT`/`WIEDZA_DOMAINS_ORDER` (~2200-2213) dodaj:

```js
  const WIEDZA_DOMAIN_COLORS = {
    pr: '#2563eb', se: '#0891b2', ap: '#7c3aed', fp: '#db2777', pz: '#0d9488', oz: '#ca8a04',
  };
  const TOPIC_NAMES = {
    'pr.konstytucja-ustroj': 'Konstytucja i ustrój', 'pr.sluzba-cywilna': 'Służba cywilna',
    'pr.informacja-publiczna-dane': 'Informacja publiczna i ochrona danych', 'pr.zrodla-prawa': 'Źródła prawa',
    'pr.kpa': 'Postępowanie administracyjne (KPA)', 'pr.prawo-ue': 'Prawo UE',
    'pr.sadownictwo': 'Sądownictwo', 'pr.prawo-miedzynarodowe': 'Prawo międzynarodowe',
    'se.statystyka-pomiar': 'Statystyka i pomiar', 'se.makroekonomia': 'Makroekonomia',
    'se.polityka-spoleczna-gospodarcza': 'Polityka społeczna i gospodarcza', 'se.problemy-spoleczne': 'Problemy społeczne',
    'se.dochody-konsumpcja': 'Dochody i konsumpcja', 'se.rynek-pracy': 'Rynek pracy',
    'ap.struktura-administracji': 'Struktura administracji', 'ap.procesy-decyzyjne': 'Procesy decyzyjne',
    'ap.organy-wladzy': 'Organy władzy',
    'fp.budzet-panstwa': 'Budżet państwa', 'fp.dlug-publiczny': 'Dług publiczny',
    'fp.system-finansow': 'System finansów publicznych', 'fp.podatki': 'Podatki',
    'fp.procedura-budzetowa': 'Procedura budżetowa', 'fp.kontrola-finansowa': 'Kontrola finansowa',
    'fp.budzety-jst': 'Budżety JST', 'fp.fundusze-ue': 'Fundusze UE', 'fp.zamowienia-publiczne': 'Zamówienia publiczne',
    'pz.organizacje-miedzynarodowe': 'Organizacje międzynarodowe', 'pz.polityka-zagraniczna-rp': 'Polityka zagraniczna RP',
    'oz.zarzadzanie-podstawy': 'Podstawy zarządzania', 'oz.zzl': 'Zarządzanie zasobami ludzkimi',
    'oz.wspoldzialanie-dialog': 'Współdziałanie i dialog',
  };
```

- [ ] **Step 2: HTML ekranu** — po `</div>` ekranu `#screen-about` (~koniec, przed skryptami) dodaj:

```html
<div id="screen-mapa" class="screen">
  <h1 style="margin-bottom:4px">Mapa wiedzy</h1>
  <p style="color:#6b7280;margin:0 0 16px">Dwie metryki: <strong>skuteczność</strong> (jak Ci idzie) i <strong>pokrycie</strong> (ile pytań poznane) — per dziedzina i temat. Sam wybierasz, co ćwiczyć.</p>
  <div id="mapa-content"></div>
  <button class="secondary" onclick="showScreen('home')" style="max-width:200px;margin-top:20px">Powrót</button>
</div>
```

- [ ] **Step 3: Routing** — w `SCREEN_PATHS` (~1620) dodaj `'mapa': '/mapa',`:

```js
  var SCREEN_PATHS = {
    'home': '/', 'setup': '/setup', 'setup-wiedza': '/wiedza', 'history': '/history',
    'stats': '/stats', 'about': '/about', 'mapa': '/mapa',
    'question': '/question', 'summary': '/summary', 'session-detail': '/session'
  };
```

- [ ] **Step 4: Render** — dodaj funkcje (np. obok `loadStats`). Używają `aggregateWiedzaStats` + `getAnswerLog()` + `QUESTIONS_WIEDZA`:

```js
  function accClassPct(a) { // a: 0..1 lub null
    if (a == null) return { cls: 'na', color: '#94a3b8', label: '—' };
    var pct = Math.round(a * 100);
    var color = a >= 0.70 ? '#16a34a' : a >= 0.40 ? '#e67e22' : '#e74c3c';
    return { cls: '', color: color, label: pct + '%' };
  }
  function _bar(fracPct, color) {
    return '<div style="height:8px;border-radius:999px;background:#eef1f5;overflow:hidden">' +
           '<i style="display:block;height:100%;width:' + fracPct + '%;background:' + color + '"></i></div>';
  }

  var _mapaStats = null;

  function renderMapa() {
    var qs = (typeof QUESTIONS_WIEDZA !== 'undefined') ? QUESTIONS_WIEDZA : [];
    _mapaStats = aggregateWiedzaStats(getAnswerLog(), qs);
    var doms = WIEDZA_DOMAINS_ORDER.map(function (code) {
      return { code: code, stat: _mapaStats.domains[code] || { total: 0, seen: 0, accuracy: null } };
    }).sort(function (a, b) {
      var aa = a.stat.accuracy == null ? 2 : a.stat.accuracy;
      var bb = b.stat.accuracy == null ? 2 : b.stat.accuracy;
      return aa - bb; // najsłabsze na górze, „brak danych" na dół
    });

    var html = '';
    doms.forEach(function (d) {
      var s = d.stat, a = accClassPct(s.accuracy);
      var covPct = s.total ? Math.round(s.seen / s.total * 100) : 0;
      html +=
        '<div class="card" style="cursor:pointer;border:1.5px solid #e5e7eb;border-radius:14px;padding:16px;margin-bottom:12px" onclick="renderMapaDomain(\'' + d.code + '\')">' +
          '<div style="display:flex;align-items:center;gap:9px;margin-bottom:8px">' +
            '<span style="width:10px;height:10px;border-radius:50%;background:' + (WIEDZA_DOMAIN_COLORS[d.code] || '#888') + '"></span>' +
            '<strong style="flex:1">' + escHtml(DOMAIN_NAMES[d.code] || d.code) + '</strong>' +
            '<span style="font-weight:700;color:' + a.color + '">' + a.label + '</span>' +
          '</div>' +
          '<div style="font-size:.72rem;color:#6b7280;text-transform:uppercase;margin-bottom:3px">Skuteczność</div>' +
          _bar(s.accuracy == null ? 0 : Math.round(s.accuracy * 100), a.color) +
          '<div style="font-size:.72rem;color:#6b7280;text-transform:uppercase;margin:8px 0 3px">Poznane ' + s.seen + ' / ' + s.total + '</div>' +
          _bar(covPct, '#94a3b8') +
        '</div>';
    });
    document.getElementById('mapa-content').innerHTML =
      '<p style="font-size:.85rem;color:#6b7280;margin:0 0 12px">Od najsłabszej dziedziny. Kliknij, by zobaczyć tematy i zacząć ćwiczyć.</p>' + html;
  }

  function renderMapaDomain(code) {
    if (!_mapaStats) renderMapa();
    var qs = (typeof QUESTIONS_WIEDZA !== 'undefined') ? QUESTIONS_WIEDZA : [];
    // tematy tej dziedziny (z puli), posortowane wg skuteczności
    var topicIds = {};
    qs.forEach(function (q) { if (q.domain === code && q.topicId) topicIds[q.topicId] = 1; });
    var topics = Object.keys(topicIds).map(function (tid) {
      return { id: tid, stat: _mapaStats.topics[tid] || { total: 0, seen: 0, accuracy: null } };
    }).sort(function (a, b) {
      var aa = a.stat.accuracy == null ? 2 : a.stat.accuracy;
      var bb = b.stat.accuracy == null ? 2 : b.stat.accuracy;
      return aa - bb;
    });

    var rows = topics.map(function (t) {
      var a = accClassPct(t.stat.accuracy);
      return '<div style="display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid #f1f3f5">' +
        '<div style="flex:1;min-width:0">' +
          '<div>' + escHtml(TOPIC_NAMES[t.id] || t.id) + '</div>' +
          '<div style="font-size:.72rem;color:#6b7280">poznane ' + t.stat.seen + ' / ' + t.stat.total + '</div>' +
        '</div>' +
        '<div style="width:80px;flex:none">' + _bar(t.stat.accuracy == null ? 0 : Math.round(t.stat.accuracy * 100), a.color) + '</div>' +
        '<span style="width:58px;text-align:right;font-weight:700;color:' + a.color + ';font-size:.85rem">' +
          (t.stat.accuracy == null ? '<span style="font-size:.7rem;color:#94a3b8">brak danych</span>' : a.label) + '</span>' +
      '</div>';
    }).join('');

    document.getElementById('mapa-content').innerHTML =
      '<button class="secondary" onclick="renderMapa()" style="max-width:160px;margin-bottom:14px">← Wszystkie dziedziny</button>' +
      '<h2 style="margin:0 0 10px">' + escHtml(DOMAIN_NAMES[code] || code) + '</h2>' +
      '<div class="card" style="border:1.5px solid #e5e7eb;border-radius:14px;padding:14px 16px;margin-bottom:14px">' + rows + '</div>' +
      '<button onclick="startPersonalizedSession({ domains: [\'' + code + '\'] })" style="width:100%">Ćwicz tę dziedzinę (15 pytań)</button>';
  }
```

- [ ] **Step 5: Weryfikacja ręczna**

Run: `cd web && python3 -m http.server 8765`
1. `http://localhost:8765/?admin=1` → menu → „Mapa wiedzy". Jeśli brak historii: skuteczność „—", pokrycie 0/total (poprawnie „brak danych").
2. Aby zobaczyć dane: odpal kilka sesji wiedzy (lub w konsoli `startPersonalizedSession({domains:['fp']})` i odpowiedz), wróć do Mapy → `fp` ma skuteczność i pokrycie; wejdź w `fp` → tematy, część „brak danych".
3. „Ćwicz tę dziedzinę" → sesja zawężona do tej dziedziny; po jej ukończeniu Mapa odzwierciedla wzrost pokrycia/zmianę skuteczności (bo liczy się do `ksap_answer_log`).
Expected: jw.

- [ ] **Step 6: Pełen przebieg testów**

Run: `node tools/test-session-wiedza.js && node tools/test-wiedza-stats.js`
Expected: `✅ session-wiedza OK` i `✅ wiedza-stats OK`.

- [ ] **Step 7: Commit** (na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "feat(wiedza): ekran Mapa wiedzy — skuteczność/pokrycie per dziedzina i temat + drill"
```

---

## Self-review (pokrycie speca)

- §1 Badge pochodzenia (dla wszystkich, zawsze widoczny, ksap-* tak / generated nie) → **Task 5**.
- §2 Tryb A „Mapa wiedzy" (per dziedzina + drill per temat + start sesji) → **Task 7** (+ agregacja Task 2, launcher Task 3).
- §2 Tryb B „Tylko prawdziwe pytania" (origin != generated, z menu) → **Task 1** (filtr) + **Task 6** (wpis menu) + **Task 3** (launcher).
- §3 Tryb admina (cookie `ksap_admin`, `?admin=1`, panel auto-show, GA off, off-button) → **Task 4**; widoczność trybów w menu → **Task 6**.
- §4 Liczenie do historii/statystyk → spełnione przez reużycie ścieżki sesji w **Task 3** (zapis przez istniejące `showSummary`/`appendAnswerLog`).
- Testy: czyste funkcje (filtr, agregacja) — Task 1, 2; DOM — weryfikacja ręczna z krokami.

Brak placeholderów; nazwy spójne (`startPersonalizedSession`, `aggregateWiedzaStats`, `isAdmin`, `renderMapa`/`renderMapaDomain`, `originBadgeHtml`).
