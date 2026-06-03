# Licznik social proof na home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pokazać na ekranie głównym subtelną linijkę „✦ Odpowiedzieliście już na ponad X pytań" jako social proof, z ręcznie aktualizowaną liczbą (start: 508 → wyświetla „ponad 500").

**Architecture:** Czysta logika (zaokrąglanie + decyzja o widoczności + tekst) w nowym module `web/social-proof.js`, testowana skryptem node przez `vm` (wzorzec z `tools/validate-questions.js`). Dane w osobnym pliku `web/stats.js`. Glue DOM-owy w `web/index.html` analogiczny do `initCountdown()`/`initQuestionCount()`.

**Tech Stack:** Vanilla JS, statyczny HTML (Netlify), node (v24) do testu, `vm` do ładowania modułu w teście.

**Spec:** [docs/superpowers/specs/2026-06-03-social-proof-counter-design.md](../specs/2026-06-03-social-proof-counter-design.md)

---

## File Structure

- **Create** `web/social-proof.js` — czysta logika: `floorToNice(n)`, `buildSocialProofText(answered, threshold)`. Eksport na `window` (przeglądarka) lub `globalThis` (node/vm).
- **Create** `web/stats.js` — wyłącznie dane: `window.SITE_STATS = { answered: 508 }`.
- **Create** `tools/test-social-proof.js` — test node ładujący `web/social-proof.js` przez `vm` i asercje.
- **Modify** `web/index.html` — element `<p id="social-proof">`, CSS, funkcja `initSocialProof()`, tagi `<script>`, wywołanie w `DOMContentLoaded`.

---

## Task 1: Czysta logika `web/social-proof.js` (TDD)

**Files:**
- Create: `web/social-proof.js`
- Test: `tools/test-social-proof.js`

- [ ] **Step 1: Write the failing test**

Create `tools/test-social-proof.js`:

```js
// tools/test-social-proof.js
// Test czystej logiki licznika social proof (web/social-proof.js).
// Uruchomienie: node tools/test-social-proof.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function load(path) {
  const code = fs.readFileSync(path, 'utf8');
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}

const m = load(__dirname + '/../web/social-proof.js');

// floorToNice: <1000 -> pełne setki; >=1000 -> pełne 500
assert.strictEqual(m.floorToNice(429), 400, 'floorToNice(429)');
assert.strictEqual(m.floorToNice(512), 500, 'floorToNice(512)');
assert.strictEqual(m.floorToNice(999), 900, 'floorToNice(999)');
assert.strictEqual(m.floorToNice(1040), 1000, 'floorToNice(1040)');
assert.strictEqual(m.floorToNice(1600), 1500, 'floorToNice(1600)');

// buildSocialProofText: tekst lub null
assert.strictEqual(
  m.buildSocialProofText(429, 300),
  'Odpowiedzieliście już na ponad 400 pytań',
  'tekst dla 429'
);
assert.strictEqual(m.buildSocialProofText(250, 300), null, 'poniżej progu -> null');
assert.strictEqual(m.buildSocialProofText(300, 300), 'Odpowiedzieliście już na ponad 300 pytań', 'na progu -> tekst');
assert.strictEqual(m.buildSocialProofText(undefined, 300), null, 'undefined -> null');
assert.strictEqual(m.buildSocialProofText('xx', 300), null, 'nie-liczba -> null');
assert.strictEqual(
  m.buildSocialProofText(1040, 300),
  'Odpowiedzieliście już na ponad 1000 pytań',
  'tekst dla 1040'
);

console.log('OK: wszystkie asercje social-proof przeszły');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tools/test-social-proof.js`
Expected: FAIL — `ENOENT` (brak `web/social-proof.js`) lub `TypeError: m.floorToNice is not a function`.

- [ ] **Step 3: Write minimal implementation**

Create `web/social-proof.js`:

```js
// web/social-proof.js
// Czysta logika licznika social proof: zaokrąglanie liczby odpowiedzi do
// "ładnego" progu i decyzja o widoczności linijki. Bez DOM-u — testowalne.
// Dane (liczba) są w web/stats.js; glue DOM-owy w index.html (initSocialProof).
(function (root) {
  // <1000 -> w dół do pełnych setek; >=1000 -> w dół do pełnych 500.
  function floorToNice(n) {
    if (n >= 1000) return Math.floor(n / 500) * 500;
    return Math.floor(n / 100) * 100;
  }

  // Zwraca gotowy tekst albo null (gdy brak danych / poniżej progu widoczności).
  function buildSocialProofText(answered, threshold) {
    if (typeof answered !== 'number' || !isFinite(answered)) return null;
    if (answered < threshold) return null;
    return 'Odpowiedzieliście już na ponad ' + floorToNice(answered) + ' pytań';
  }

  root.floorToNice = floorToNice;
  root.buildSocialProofText = buildSocialProofText;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tools/test-social-proof.js`
Expected: PASS — `OK: wszystkie asercje social-proof przeszły`

- [ ] **Step 5: Commit**

```bash
git add web/social-proof.js tools/test-social-proof.js
git commit -m "feat: czysta logika licznika social proof + test"
```

---

## Task 2: Plik danych `web/stats.js`

**Files:**
- Create: `web/stats.js`

- [ ] **Step 1: Create the data file**

Create `web/stats.js`:

```js
// web/stats.js
// Statystyki do social proofu na home. Aktualizacja RĘCZNA:
// w GA4 odczytaj sumę eventów `question_answered` i podbij `answered`,
// potem commit + deploy. Brak backendu (świadomie — patrz spec).
window.SITE_STATS = { answered: 508 };
```

- [ ] **Step 2: Commit**

```bash
git add web/stats.js
git commit -m "feat: dane statystyk (SITE_STATS.answered) do social proofu"
```

---

## Task 3: Element i styl w `web/index.html`

**Files:**
- Modify: `web/index.html` (markup `#screen-home` ~`1022-1028`; CSS ~`103-119`)

- [ ] **Step 1: Add the markup element**

W `web/index.html`, w `#screen-home`, dodaj `<p id="social-proof">` między przyciskiem historii a odliczaniem. Zmień ten fragment:

```html
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" class="ghost" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
  <p id="exam-countdown"></p>
```

na:

```html
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" class="ghost" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
  <p id="social-proof"></p>
  <p id="exam-countdown"></p>
```

- [ ] **Step 2: Add CSS**

W bloku `<style>`, zaraz po regule `#question-count { ... }` (kończy się ~linia 114), dodaj:

```css
    #social-proof {
      color: #555;
      font-size: 0.95rem;
      margin-top: 28px;
      opacity: 0.85;
    }
```

- [ ] **Step 3: Visual sanity check (manual)**

Run: `open web/index.html` (lub `python3 -m http.server -d web 8000` i otwórz `http://localhost:8000`)
Expected: na home pod przyciskami pusta linijka `#social-proof` (jeszcze bez tekstu — glue w Task 4), nad „Egzamin za N dni". Brak błędów w konsoli.

- [ ] **Step 4: Commit**

```bash
git add web/index.html
git commit -m "feat: element i styl linijki social proof na home"
```

---

## Task 4: Załadowanie modułów i glue `initSocialProof()`

**Files:**
- Modify: `web/index.html` (script loads ~`1170`; funkcje ~po `initQuestionCount` ~`1290`; init ~`1360-1361`)

- [ ] **Step 1: Load the two new scripts before the main script**

Zmień fragment ładowania danych (~linia 1170):

```html
<!-- questions data -->
<script src="questions-unified.js"></script>

<!-- main script -->
```

na:

```html
<!-- questions data -->
<script src="questions-unified.js"></script>

<!-- social proof: dane + czysta logika (ładowane przed main script) -->
<script src="stats.js"></script>
<script src="social-proof.js"></script>

<!-- main script -->
```

- [ ] **Step 2: Add the `initSocialProof()` glue function**

Zaraz po funkcji `initQuestionCount()` (kończy się ~linia 1290, tuż przed `function toggleAccountMenu()`), dodaj:

```js
  function initSocialProof() {
    const el = document.getElementById('social-proof');
    if (!el) return;
    const stats = window.SITE_STATS;
    const text = (typeof buildSocialProofText === 'function' && stats)
      ? buildSocialProofText(stats.answered, 300)
      : null;
    if (!text) { el.style.display = 'none'; return; }
    el.textContent = '✦ ' + text;
  }
```

- [ ] **Step 3: Call it during init**

Znajdź w `DOMContentLoaded` (~linia 1360-1361):

```js
    initCountdown();
    initQuestionCount();
```

i zmień na:

```js
    initCountdown();
    initQuestionCount();
    initSocialProof();
```

- [ ] **Step 4: Manual verification — value above threshold**

Run: `python3 -m http.server -d web 8000` i otwórz `http://localhost:8000`
Expected: na home widoczna linijka „✦ Odpowiedzieliście już na ponad 500 pytań" (bo `answered = 508`), nad „Egzamin za N dni". Konsola bez błędów.

- [ ] **Step 5: Manual verification — below threshold hides line**

W `web/stats.js` tymczasowo zmień `answered: 508` na `answered: 250`, odśwież stronę.
Expected: linijka social proof **niewidoczna**. Następnie przywróć `answered: 508`.

- [ ] **Step 6: Commit**

```bash
git add web/index.html web/stats.js
git commit -m "feat: render linijki social proof na home (initSocialProof)"
```

---

## Self-Review — pokrycie spec

- Cel + framing „Odpowiedzieliście już na ponad X pytań" → Task 1 (tekst), Task 4 (render). ✓
- Źródło danych: ręczne `web/stats.js` z `answered` → Task 2. ✓
- Wariant A, lokalizacja pod przyciskami nad odliczaniem, styl spójny z `#exam-countdown` → Task 3. ✓
- Ikona ✦ → Task 4 Step 2. ✓
- Reguła 1: `floorToNice` (setki / 500) → Task 1, przetestowane. ✓
- Reguła 2: próg widoczności 300, ukrycie poniżej → Task 1 (`buildSocialProofText` zwraca null), Task 4 (`display:none`); test + manual Step 5. ✓
- Reguła 3: brak `SITE_STATS` / błąd → Task 1 (guard `typeof`), Task 4 (guard `stats &&`); test `undefined`/`'xx'`. ✓
- Czysto prezentacyjne, brak zależności od silnika/localStorage → osobne pliki, glue tylko czyta. ✓
- Poza zakresem (GA Data API, realtime, animacje) → nie ujęte. ✓
- Testowanie ze spec (429→„ponad 400", 250→ukryte, 1040→„ponad 1000", brak danych→ukryte) → Task 1 asercje + Task 4 manual. ✓

Brak placeholderów; nazwy `floorToNice` / `buildSocialProofText` / `initSocialProof` / `SITE_STATS` spójne między zadaniami.
