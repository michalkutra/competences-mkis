# Anti-Repeat & Question Variety — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Usunąć poczucie powtarzalności pytań — dobór sesji pamięta widziane pytania (least-recently-seen) i bank zostaje powiększony tak, by typowy użytkownik zrobił ~25 sesji bez ani jednej powtórki.

**Architecture:** Faza 1 zmienia `buildSession()` w `web/index.html` tak, by zamiast losować z pełnej puli typu, sortował pulę least-recently-seen na podstawie istniejącego logu `ksap_answer_log`; dochodzi skrypt symulacyjny w `tools/` jako twardy dowód oraz akapit na stronie „O aplikacji". Faza 2 dorabia ~200 pytań (gros: typ 5) przez generyczne narzędzia walidacji i dołączania pytań do `web/questions-unified.js`, wzorowane na istniejącym pipeline `tools/*-type8.js`.

**Tech Stack:** Vanilla JS w jednym pliku `web/index.html` (brak frameworka, brak bundlera); dane pytań w `web/questions-unified.js` (dwa obiekty `QUESTIONS_EASY`/`QUESTIONS_HARD`); narzędzia node w `tools/` (CommonJS, `fs` + `vm`). Brak frameworka testowego — weryfikacja przez skrypty node uruchamiane ręcznie + ręczny test UI.

**Spec:** [docs/superpowers/specs/2026-06-03-anti-repeat-question-variety-design.md](../specs/2026-06-03-anti-repeat-question-variety-design.md)

---

## File Structure

**Modyfikowane:**
- `web/index.html` — `buildSession()` (~1418) + nowe helpery `getLastSeenMap()`, `pickLeastRecentlySeen()`; akapit w sekcji „O aplikacji" (~1100); ewentualnie liczba w „Skąd pytania" (~1127).
- `web/questions-unified.js` — dopisanie nowych pytań do tablic `typeN` w `QUESTIONS_EASY` i `QUESTIONS_HARD` (Faza 2).

**Tworzone:**
- `tools/simulate-repeats.js` — symuluje N kolejnych `buildSession()` wg logiki LRS i raportuje powtórki per typ (dowód celu „25 sesji bez powtórki").
- `tools/validate-questions.js` — generyczny walidator strukturalny pytań wszystkich typów (uzupełnia, nie zastępuje `validate-type8.js`).
- `tools/append-questions.js` — dołącza nowe pytania (z pliku JSON) do tablic `typeN`, nadając kolejne ID, z backupem i sanity-checkiem.
- `tools/new-questions/*.json` — partie nowych pytań per typ/poziom (dane wejściowe dla `append-questions.js`; usuwalne po integracji).

**Konwencje (potwierdzone w kodzie):**
- ID pytania: `^[eh]_t[1-8]_\d{3}$`, np. `e_t5_041`, `h_t5_100`. Obecny max suffix = `040` dla każdego typu i poziomu.
- `getQuestionBank()` (`web/index.html:1399`) zwraca `QUESTIONS_HARD` gdy `state.difficulty==='hard'`, inaczej `QUESTIONS_EASY`. Pula jest więc per poziom — LRS działa w obrębie poziomu.
- Log: `ksap_answer_log` to tablica wpisów `{ sid, qId, tid, ok, ts }`, gdzie `ts` to ISO-string (`new Date().toISOString()`), porównywalny leksykograficznie chronologicznie (`web/index.html:2256`).
- `SESSION_BLUEPRINT = { 1:2, 2:2, 3:2, 4:1, 5:4, 6:2, 7:1, 8:1 }` (`web/index.html:1416`).

---

# FAZA 1 — Algorytm anty-powtórek + weryfikacja + copy

## Task 1: Logika least-recently-seen w `buildSession()`

**Files:**
- Modify: `web/index.html` — funkcja `buildSession()` (linie 1418–1429); dodać helpery tuż przed nią (po `shuffle`, linia 1412).

- [ ] **Step 1: Dodać helpery `getLastSeenMap()` i `pickLeastRecentlySeen()` przed `buildSession`**

Wstaw po funkcji `shuffle` (po linii 1412), przed komentarzem `// Rozkład typów w sesji…` (linia 1414):

```javascript
  // Mapa qId -> najnowszy timestamp (ISO) z historii odpowiedzi.
  // Jeden przebieg po ksap_answer_log; brak qId w mapie = pytanie nigdy nie widziane.
  function getLastSeenMap() {
    const log = getAnswerLog();
    const map = Object.create(null);
    for (let i = 0; i < log.length; i++) {
      const e = log[i];
      if (!e || !e.qId) continue;
      const prev = map[e.qId];
      if (prev === undefined || e.ts > prev) map[e.qId] = e.ts;
    }
    return map;
  }

  // Least-recently-seen: niewidziane pytania najpierw (kolejność losowa),
  // potem widziane najdawniej (rosnąco wg ts). Zwraca pierwsze `need` pytań.
  // shuffle() przed stabilnym sort() daje losowy tie-break i losowy dobór
  // wśród pytań o równym statusie.
  function pickLeastRecentlySeen(pool, need, lastSeen) {
    shuffle(pool);
    pool.sort(function (a, b) {
      const ta = lastSeen[a.id], tb = lastSeen[b.id];
      const ua = (ta === undefined), ub = (tb === undefined);
      if (ua && ub) return 0;
      if (ua) return -1;
      if (ub) return 1;
      if (ta < tb) return -1;
      if (ta > tb) return 1;
      return 0;
    });
    return pool.slice(0, need);
  }
```

- [ ] **Step 2: Podmienić ciało pętli w `buildSession()` na dobór LRS**

Zamień obecne `buildSession` (linie 1418–1429):

```javascript
  function buildSession() {
    const bank = getQuestionBank();
    const session = [];
    for (let t = 1; t <= 8; t++) {
      const pool = (bank['type' + t] || []).slice();
      shuffle(pool);
      const need = SESSION_BLUEPRINT[t] || 0;
      session.push(...pool.slice(0, need));
    }
    shuffle(session);
    return session;
  }
```

na:

```javascript
  function buildSession() {
    const bank = getQuestionBank();
    const lastSeen = getLastSeenMap();
    const session = [];
    for (let t = 1; t <= 8; t++) {
      const pool = (bank['type' + t] || []).slice();
      const need = SESSION_BLUEPRINT[t] || 0;
      session.push.apply(session, pickLeastRecentlySeen(pool, need, lastSeen));
    }
    shuffle(session);
    return session;
  }
```

- [ ] **Step 3: Sprawdzić poprawność składni przez wczytanie pliku w node**

Run: `node -e "const fs=require('fs');const s=fs.readFileSync('web/index.html','utf8');const m=s.match(/function pickLeastRecentlySeen[\s\S]*?\n  }/);if(!m)throw new Error('helper nie znaleziony');new Function(m[0]+'\n;pickLeastRecentlySeen([],0,{});');console.log('OK: helper parsuje się i wykonuje')"`
Expected: `OK: helper parsuje się i wykonuje`

- [ ] **Step 4: Ręczna weryfikacja w przeglądarce (smoke test)**

Otwórz `web/index.html` (lub przez lokalny serwer). W konsoli DevTools wpisz `buildSession()` — powinno zwrócić 15 pytań z poprawnym rozkładem typów. Zrób 1–2 sesje, potem znów `buildSession()` — pytania świeżo zaliczone nie powinny się pojawić, dopóki są niewidziane alternatywy.
Expected: 15 pytań, brak powtórek widzianych w poprzedniej sesji przy dostępnej puli.

- [ ] **Step 5: Commit** (tylko jeśli użytkownik poprosi — patrz CLAUDE.md; domyślnie NIE commituj)

```bash
git add web/index.html
git commit -m "feat: least-recently-seen dobór pytań w buildSession (anty-powtórki)"
```

---

## Task 2: Skrypt symulacyjny — dowód „25 sesji bez powtórki"

**Files:**
- Create: `tools/simulate-repeats.js`

Skrypt odtwarza dokładnie logikę z Taska 1 (ta sama funkcja `pickLeastRecentlySeen`) i symuluje kolejne sesje, narastająco zapisując widziane pytania ze sztucznym, rosnącym `ts`. Raportuje pierwszą sesję z powtórką oraz sumę powtórek per typ.

- [ ] **Step 1: Napisać skrypt symulacyjny**

```javascript
// tools/simulate-repeats.js
// Symuluje N kolejnych buildSession() wg logiki least-recently-seen i raportuje
// powtórki per typ. Dowód, że bank starcza na zadaną liczbę sesji bez powtórki.
// Użycie: node tools/simulate-repeats.js [easy|hard] [liczbaSesji]
const fs = require('fs');
const vm = require('vm');

const DIFF = (process.argv[2] || 'easy').toLowerCase();
const SESSIONS = parseInt(process.argv[3] || '25', 10);
const BLUEPRINT = { 1: 2, 2: 2, 3: 2, 4: 1, 5: 4, 6: 2, 7: 1, 8: 1 };

function loadBanks(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = (typeof QUESTIONS_HARD!=="undefined")?QUESTIONS_HARD:null;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
}
// IDENTYCZNA logika jak pickLeastRecentlySeen w web/index.html (Task 1).
function pickLeastRecentlySeen(pool, need, lastSeen) {
  shuffle(pool);
  pool.sort(function (a, b) {
    const ta = lastSeen[a.id], tb = lastSeen[b.id];
    const ua = (ta === undefined), ub = (tb === undefined);
    if (ua && ub) return 0;
    if (ua) return -1; if (ub) return 1;
    if (ta < tb) return -1; if (ta > tb) return 1;
    return 0;
  });
  return pool.slice(0, need);
}

function main() {
  const { easy, hard } = loadBanks('web/questions-unified.js');
  const bank = DIFF === 'hard' ? hard : easy;
  if (!bank) { console.error('Brak banku dla poziomu ' + DIFF); process.exit(1); }

  const lastSeen = Object.create(null);
  const repeatsByType = {}; for (let t = 1; t <= 8; t++) repeatsByType[t] = 0;
  let firstRepeatSession = null;
  let tick = 0;

  for (let s = 1; s <= SESSIONS; s++) {
    const picked = [];
    for (let t = 1; t <= 8; t++) {
      const pool = (bank['type' + t] || []).slice();
      const got = pickLeastRecentlySeen(pool, BLUEPRINT[t] || 0, lastSeen);
      got.forEach((q) => picked.push({ q: q, t: t }));
    }
    picked.forEach(({ q, t }) => {
      if (lastSeen[q.id] !== undefined) {
        repeatsByType[t]++;
        if (firstRepeatSession === null) firstRepeatSession = s;
      }
    });
    // znacznik czasu rosnący w obrębie sesji (kolejność stała chronologicznie)
    picked.forEach(({ q }) => { lastSeen[q.id] = String(1e12 + (tick++)); });
  }

  const totalRepeats = Object.values(repeatsByType).reduce((a, b) => a + b, 0);
  console.log(`Poziom: ${DIFF}, sesji: ${SESSIONS}`);
  for (let t = 1; t <= 8; t++) {
    const pool = (bank['type' + t] || []).length;
    console.log(`  typ ${t}: pula ${pool}, losowane/sesję ${BLUEPRINT[t]}, powtórek: ${repeatsByType[t]}`);
  }
  console.log(`Pierwsza sesja z powtórką: ${firstRepeatSession === null ? 'brak' : firstRepeatSession}`);
  console.log(`Suma powtórek w ${SESSIONS} sesjach: ${totalRepeats}`);
  process.exit(totalRepeats === 0 ? 0 : 2);
}
main();
```

- [ ] **Step 2: Uruchomić na OBECNYM banku — oczekiwana porażka (powtórki)**

Run: `node tools/simulate-repeats.js easy 25; echo "exit=$?"`
Expected: pierwsza powtórka ok. sesji 11 (typ 5: pula 40, 4/sesję → 10 sesji bez powtórki), `exit=2`. To potwierdza, że skrypt wykrywa problem przed powiększeniem banku.

- [ ] **Step 3: Uruchomić dla `hard` — analogiczna porażka**

Run: `node tools/simulate-repeats.js hard 25; echo "exit=$?"`
Expected: powtórki obecne, `exit=2`.

- [ ] **Step 4: Commit** (tylko na prośbę użytkownika)

```bash
git add tools/simulate-repeats.js
git commit -m "test: skrypt symulujący powtórki pytań w sesjach (LRS)"
```

> Uwaga: pełny sukces (`exit=0` przy 25 sesjach) nastąpi dopiero po Fazie 2. Na razie skrypt ma świecić na czerwono — to oczekiwany stan „failing test".

---

## Task 3: Strona „O aplikacji" — opis algorytmu pamięci

**Files:**
- Modify: `web/index.html` — sekcja „Jak to działa" (po linii 1116, przed zamknięciem `</div>` na 1117).

- [ ] **Step 1: Dodać akapit o zapamiętywaniu pytań**

Wstaw nowy `<p>` po akapicie o Historii/Statystykach (po linii 1115, przed `</div>` na 1117):

```html
    <p style="font-size:0.95rem;color:#374151;line-height:1.6;margin-top:12px;">
      <strong>Bez powtórek</strong> — aplikacja zapamiętuje, które pytania już widziałeś, i w kolejnych sesjach dobiera najpierw te, których jeszcze nie miałeś. Przy obecnej puli zrobisz <strong>około 25 sesji</strong>, zanim pytania zaczną się powtarzać. Gdy wyczerpiesz pulę, jako pierwsze wracają te widziane najdawniej.
    </p>
```

- [ ] **Step 2: Weryfikacja wizualna**

Otwórz `web/index.html`, wejdź w menu → „O aplikacji", sekcja „Jak to działa".
Expected: nowy akapit „Bez powtórek" widoczny, spójny stylistycznie z resztą sekcji.

- [ ] **Step 3: Commit** (tylko na prośbę użytkownika)

```bash
git add web/index.html
git commit -m "docs: opis algorytmu anty-powtórek na stronie O aplikacji"
```

---

# FAZA 2 — Powiększenie banku do celu ~25 sesji

> Cel per typ/poziom (osobno EASY i HARD). Liczba sesji bez powtórki dla typu = `pula / losowane_na_sesję`. Dla 25 sesji: typ 5 → 100, typy 1/2/3/6 → 50, typy 4/7/8 → bez zmian (40 starcza na 40 sesji).

## Task 4: Generyczny walidator pytań `tools/validate-questions.js`

**Files:**
- Create: `tools/validate-questions.js`

Waliduje strukturę pytań wszystkich typów w obu poziomach (uzupełnia `validate-type8.js`, który sprawdza logikę figur typu 8).

- [ ] **Step 1: Napisać walidator**

```javascript
// tools/validate-questions.js
// Generyczny walidator strukturalny pytań (typy 1-8, EASY+HARD).
// Sprawdza: format ID, typeId, level, wymagane pola per typ, zakres correct,
// długość options, unikalność ID, duplikaty treści. NIE sprawdza logiki figur
// typu 8 — od tego jest tools/validate-type8.js.
// Użycie: node tools/validate-questions.js [web/questions-unified.js]
const fs = require('fs');
const vm = require('vm');

function loadBanks(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function isStr(v) { return typeof v === 'string' && v.length > 0; }
function isArr(v, n) { return Array.isArray(v) && (n === undefined || v.length === n); }

// Wymagane pola specyficzne per typ. Zwraca tablicę komunikatów błędów.
function typeFieldErrors(q) {
  const e = [];
  switch (q.typeId) {
    case 1: if (!isArr(q.leftPair, 2)) e.push('leftPair != [2]'); if (!isStr(q.rightTop)) e.push('brak rightTop'); break;
    case 2: if (!isArr(q.words, 3)) e.push('words != [3]'); break;
    case 3: if (!isStr(q.text)) e.push('brak text'); if (!q.chart || !isArr(q.chart.datasets)) e.push('zły chart'); break;
    case 4: if (!isStr(q.stem)) e.push('brak stem'); break;
    case 5: if (!isArr(q.premises) || q.premises.length < 2) e.push('premises < 2');
            if (['chain', 'modus_ponens'].indexOf(q.syllogismVariant) < 0) e.push('zły syllogismVariant'); break;
    case 6: if (!isStr(q.narrative)) e.push('brak narrative'); if (!q.table || !isArr(q.table.headers) || !isArr(q.table.rows)) e.push('zła table'); break;
    case 7: if (!isStr(q.chartTitle)) e.push('brak chartTitle'); if (!q.chart || !isArr(q.chart.datasets)) e.push('zły chart'); break;
    case 8: if (!q.grid) e.push('brak grid'); break;
  }
  return e;
}

function validateBank(bank, prefix, errors) {
  for (let t = 1; t <= 8; t++) {
    const arr = bank['type' + t] || [];
    const ids = new Set();
    const idRe = new RegExp('^' + prefix + '_t' + t + '_\\d{3}$');
    arr.forEach((q) => {
      const id = q.id || '(brak id)';
      if (!idRe.test(q.id || '')) errors.push(`${id}: zły format ID (typ ${t}, ${prefix})`);
      if (ids.has(q.id)) errors.push(`${id}: zduplikowane ID`); ids.add(q.id);
      if (q.typeId !== t) errors.push(`${id}: typeId=${q.typeId}, oczekiwano ${t}`);
      const expLevel = prefix === 'e' ? 'easy' : 'hard';
      if (q.level !== expLevel) errors.push(`${id}: level=${q.level}, oczekiwano ${expLevel}`);
      if (!isStr(q.instruction)) errors.push(`${id}: brak instruction`);
      if (!isStr(q.explanation)) errors.push(`${id}: brak explanation`);
      if (!Array.isArray(q.options) || (q.options.length !== 4 && q.options.length !== 5)) errors.push(`${id}: options.length=${(q.options||[]).length} (oczekiwano 4 lub 5)`);
      if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= (q.options || []).length) errors.push(`${id}: correct poza zakresem`);
      typeFieldErrors(q).forEach((m) => errors.push(`${id}: ${m}`));
    });
  }
}

function main() {
  const path = process.argv[2] || 'web/questions-unified.js';
  const { easy, hard } = loadBanks(path);
  const errors = [];
  validateBank(easy, 'e', errors);
  validateBank(hard, 'h', errors);
  if (errors.length) {
    console.error(`❌ WALIDACJA NIEUDANA — ${errors.length} błędów:`);
    errors.slice(0, 80).forEach((m) => console.error('  - ' + m));
    if (errors.length > 80) console.error(`  ... i ${errors.length - 80} więcej`);
    process.exit(1);
  }
  let total = 0;
  for (let t = 1; t <= 8; t++) total += (easy['type' + t] || []).length + (hard['type' + t] || []).length;
  console.log(`✅ WALIDACJA OK — ${total} pytań, struktura poprawna.`);
}
main();
```

- [ ] **Step 2: Uruchomić na obecnym banku — musi przejść (baseline)**

Run: `node tools/validate-questions.js`
Expected: `✅ WALIDACJA OK — 640 pytań, struktura poprawna.` (jeśli wyskoczą błędy na istniejących danych — najpierw rozumiemy je, ewentualnie korygujemy walidator do realnego schematu, nie odwrotnie).

- [ ] **Step 3: Commit** (tylko na prośbę użytkownika)

```bash
git add tools/validate-questions.js
git commit -m "test: generyczny walidator strukturalny pytań (typy 1-8)"
```

---

## Task 5: Narzędzie dołączające pytania `tools/append-questions.js`

**Files:**
- Create: `tools/append-questions.js`

Dołącza nowe pytania (z pliku JSON `{ easy: {typeN: [...]}, hard: {typeN: [...]} }`) do odpowiednich tablic `typeN`, nadając kolejne ID po obecnym max, ustawiając `typeId`/`level`. Backup + sanity-check przed nadpisaniem. Wzorzec skanera tablic z `tools/integrate-type8.js`.

- [ ] **Step 1: Napisać narzędzie**

```javascript
// tools/append-questions.js
// Dołącza nowe pytania do web/questions-unified.js bez ruszania istniejących.
// Wejście JSON: { "easy": { "type5": [ {..bez id..}, ... ] }, "hard": { ... } }
// Skrypt nadaje ID (kolejne po max), ustawia typeId i level, serializuje tablice
// w miejscu, robi backup .bak i sanity-check (parsowalność + liczby).
// Użycie: node tools/append-questions.js tools/new-questions/plik.json [web/questions-unified.js]
const fs = require('fs');
const vm = require('vm');

const INPUT = process.argv[2];
const PATH = process.argv[3] || 'web/questions-unified.js';
if (!INPUT) { console.error('Podaj plik JSON z pytaniami'); process.exit(1); }

function loadBanks(code) {
  const c = code + '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(c, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function pad(n) { return String(n).padStart(3, '0'); }
function maxSuffix(arr) {
  let m = 0; arr.forEach((q) => { const mm = /_(\d{3})$/.exec(q.id || ''); if (mm) m = Math.max(m, parseInt(mm[1], 10)); });
  return m;
}

// Skaner zakresu tablicy po markerze "\n  typeN: [" w obrębie [from..to). Pomija
// nawiasy w stringach. Zwraca {open, close} obejmujące '[' ... ']'.
function arrayRange(src, marker, from, to) {
  const start = src.indexOf(marker, from);
  if (start < 0 || start >= to) throw new Error('Nie znaleziono ' + JSON.stringify(marker));
  const open = src.indexOf('[', start);
  let depth = 0, i = open, inStr = false, quote = '', esc = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) { if (esc) { esc = false; continue; } if (ch === '\\') { esc = true; continue; } if (ch === quote) inStr = false; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; quote = ch; continue; }
    if (ch === '[') depth++; else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) throw new Error('Niezbalansowane nawiasy dla ' + marker);
  return { open: open, close: i };
}
function serializeArray(arr) {
  return '[\n' + arr.map((q) => '    ' + JSON.stringify(q)).join(',\n') + '\n  ]';
}

function main() {
  const src = fs.readFileSync(PATH, 'utf8');
  const input = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const { easy, hard } = loadBanks(src);
  const hardObjStart = src.indexOf('const QUESTIONS_HARD');
  if (hardObjStart < 0) throw new Error('Brak QUESTIONS_HARD');

  // zbierz edycje: dla każdego (poziom,typ) złóż istniejące + nowe z nadanymi ID
  const edits = []; // { open, close, text }
  const plan = []; // log
  [['easy', 'e', input.easy || {}, 0, hardObjStart], ['hard', 'h', input.hard || {}, hardObjStart, src.length]]
    .forEach(([levelName, prefix, group, from, to]) => {
      const bank = levelName === 'easy' ? easy : hard;
      Object.keys(group).forEach((typeKey) => {
        const t = parseInt(typeKey.replace('type', ''), 10);
        const existing = (bank[typeKey] || []).slice();
        let n = maxSuffix(existing);
        const added = group[typeKey].map((q) => {
          n += 1;
          return Object.assign({}, q, { id: `${prefix}_t${t}_${pad(n)}`, typeId: t, level: levelName });
        });
        const merged = existing.concat(added);
        const range = arrayRange(src, `\n  ${typeKey}: [`, from, to);
        edits.push({ open: range.open, close: range.close, text: serializeArray(merged) });
        plan.push(`${levelName}.${typeKey}: ${existing.length} -> ${merged.length} (+${added.length})`);
      });
    });

  // podmiana od końca pliku, by nie przesuwać indeksów wcześniejszych edycji
  edits.sort((a, b) => b.open - a.open);
  let out = src;
  edits.forEach((e) => { out = out.slice(0, e.open) + e.text + out.slice(e.close + 1); });

  // sanity-check: wynik się parsuje i ma spodziewane liczby
  loadBanks(out);

  fs.writeFileSync(PATH + '.bak', src);
  fs.writeFileSync(PATH, out);
  console.log('Dołączono:\n  ' + plan.join('\n  ') + `\n(backup: ${PATH}.bak)`);
}
main();
```

- [ ] **Step 2: Test na atrapie — dołożyć 1 pytanie typu 1 easy i sprawdzić integrację**

Stwórz tymczasowy plik atrapy i uruchom narzędzie na KOPII banku:

```bash
cp web/questions-unified.js /tmp/qu-test.js
cat > /tmp/append-smoke.json <<'JSON'
{ "easy": { "type1": [ { "instruction": "TEST", "leftPair": ["a","b"], "rightTop": "c", "options": ["A) x","B) y","C) z","D) w"], "correct": 0, "explanation": "test" } ] } }
JSON
node tools/append-questions.js /tmp/append-smoke.json /tmp/qu-test.js
node tools/validate-questions.js /tmp/qu-test.js
```
Expected: log `easy.type1: 40 -> 41 (+1)`; walidacja `/tmp/qu-test.js` przechodzi z nowym ID `e_t1_041`. (Plik produkcyjny nietknięty.)

- [ ] **Step 3: Posprzątać atrapy**

Run: `rm -f /tmp/qu-test.js /tmp/qu-test.js.bak /tmp/append-smoke.json`
Expected: brak błędu.

- [ ] **Step 4: Commit** (tylko na prośbę użytkownika)

```bash
git add tools/append-questions.js
git commit -m "feat: narzędzie dołączające pytania do banku (append-questions)"
```

---

## Task 6: Typ 5 (Wnioskowanie logiczne) — +60 EASY, +60 HARD

**Files:**
- Create: `tools/new-questions/type5-easy.json`, `tools/new-questions/type5-hard.json`
- Modify: `web/questions-unified.js` (przez `append-questions.js`)

Schemat (potwierdzony, `questions-unified.js:2320`): `{ instruction, premises:[≥2 string], syllogismVariant:"chain"|"modus_ponens", options:[4-5], correct:int, explanation }`. ID, `typeId`, `level` nadaje narzędzie. Przykład wzorcowy:

```json
{
  "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
  "premises": ["Każdy pracownik służby cywilnej składa ślubowanie.", "Każdy, kto składa ślubowanie, zna treść roty."],
  "syllogismVariant": "chain",
  "options": ["A) Każdy pracownik służby cywilnej zna treść roty.", "B) Każdy, kto zna treść roty, jest pracownikiem służby cywilnej.", "C) Niektórzy pracownicy służby cywilnej nie składają ślubowania.", "D) Znajomość roty nie wynika ze ślubowania."],
  "correct": 0,
  "explanation": "Łańcuch: pracownik → ślubowanie → znajomość roty, więc pracownik → znajomość roty. B odwraca implikację, C zaprzecza przesłance, D jest sprzeczna z drugą przesłanką."
}
```

**Zasady jakości (kryteria akceptacji treści):**
- Dokładnie jedna logicznie poprawna odpowiedź; dystraktory to typowe błędy (odwrócenie implikacji, zaprzeczenie przesłanki, wniosek wykraczający poza przesłanki).
- Tematyka adekwatna do egzaminu KSAP (administracja, prawo, służba cywilna, procedury) — różnorodna, bez powielania treści istniejących `e_t5_001..040` / `h_t5_001..040`.
- EASY: 2 przesłanki, jasny łańcuch/modus ponens. HARD: 2–3 przesłanki, subtelniejsze dystraktory.
- Rozkład wariantów zbliżony do istniejącego banku (mieszanka `chain` i `modus_ponens`).

- [ ] **Step 1: Wygenerować 60 pytań EASY do `tools/new-questions/type5-easy.json`**

Format pliku: `{ "easy": { "type5": [ <60 obiektów wg schematu powyżej> ] } }`. Autor (agent wykonujący) tworzy 60 merytorycznie poprawnych, zróżnicowanych pytań — to jest właściwa praca tego kroku, nie placeholder. Każde pytanie musi spełniać zasady jakości.

- [ ] **Step 2: Wygenerować 60 pytań HARD do `tools/new-questions/type5-hard.json`**

Format: `{ "hard": { "type5": [ <60 obiektów> ] } }`. Trudniejsze (2–3 przesłanki, subtelne dystraktory).

- [ ] **Step 3: Walidacja kandydatów na kopii banku przed integracją**

```bash
cp web/questions-unified.js /tmp/qu5.js
node tools/append-questions.js tools/new-questions/type5-easy.json /tmp/qu5.js
node tools/append-questions.js tools/new-questions/type5-hard.json /tmp/qu5.js
node tools/validate-questions.js /tmp/qu5.js
```
Expected: logi `easy.type5: 40 -> 100`, `hard.type5: 40 -> 100`; walidacja OK. Jeśli walidacja zgłasza błędy — popraw treść w plikach JSON i powtórz na świeżej kopii.

- [ ] **Step 4: Integracja do pliku produkcyjnego**

```bash
node tools/append-questions.js tools/new-questions/type5-easy.json
node tools/append-questions.js tools/new-questions/type5-hard.json
node tools/validate-questions.js
rm -f /tmp/qu5.js /tmp/qu5.js.bak
```
Expected: `easy.type5: 40 -> 100`, `hard.type5: 40 -> 100`, walidacja OK na `web/questions-unified.js`.

- [ ] **Step 5: Commit** (tylko na prośbę użytkownika)

```bash
git add web/questions-unified.js tools/new-questions/type5-easy.json tools/new-questions/type5-hard.json
git commit -m "feat: +120 pytań typu 5 (wnioskowanie logiczne) — cel 25 sesji bez powtórki"
```

---

## Task 7: Typy 1, 2, 3, 6 — po +10 EASY i +10 HARD

**Files:**
- Create: `tools/new-questions/type1.json`, `type2.json`, `type3.json`, `type6.json` (każdy z kluczami `easy` i `hard`)
- Modify: `web/questions-unified.js`

Schematy (potwierdzone):
- **Typ 1** (`:3`): `{ instruction, leftPair:[2 string], rightTop:string, options:[4-5], correct, explanation }`.
- **Typ 2** (`:484`): `{ instruction, words:[3 string], options:[5], correct, explanation }`.
- **Typ 3** (`:873`): `{ instruction, text:string, chart:{type:"bar"|"line", xLabels:[...], datasets:[{label,data:[num],color:"#hex"}]}, options:[4-5], correct, explanation }`.
- **Typ 6** (`:2995`): `{ instruction, narrative:string, table:{headers:[...], rows:[[...]]}, options:[5], correct, explanation }`.

Przykład typ 2:
```json
{ "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:", "words": ["Ustawa", "Rozporządzenie", "Uchwała"], "options": ["A) sąd", "B) akt normatywny", "C) obywatel", "D) podatek", "E) gmina"], "correct": 1, "explanation": "Ustawa, rozporządzenie i uchwała to rodzaje aktów normatywnych — łączy je charakter źródła prawa. Pozostałe opcje nie są kategorią nadrzędną dla wszystkich trzech." }
```

**Zasady jakości:** dokładnie jedna poprawna odpowiedź; brak powielania istniejących pytań `*_t{N}_001..040`; tematyka KSAP; dla typu 3/6 dane liczbowe muszą być wewnętrznie spójne (wartości w `chart`/`table` zgodne z `explanation` i `correct`); EASY łatwiejsze niż HARD.

- [ ] **Step 1: Wygenerować po 10 EASY + 10 HARD dla typu 1** → `tools/new-questions/type1.json`

Format: `{ "easy": { "type1": [<10 obiektów>] }, "hard": { "type1": [<10 obiektów>] } }`. Autorowanie merytoryczne wg schematu typu 1 — to właściwa praca kroku.

- [ ] **Step 2: Analogicznie typ 2** → `tools/new-questions/type2.json` (`type2`, words:[3], options:[5]).

- [ ] **Step 3: Analogicznie typ 3** → `tools/new-questions/type3.json` (`type3`, text+chart; liczby spójne z odpowiedzią).

- [ ] **Step 4: Analogicznie typ 6** → `tools/new-questions/type6.json` (`type6`, narrative+table; obliczenia w `explanation` muszą się zgadzać).

- [ ] **Step 5: Walidacja kandydatów na kopii banku**

```bash
cp web/questions-unified.js /tmp/qu67.js
for f in type1 type2 type3 type6; do node tools/append-questions.js tools/new-questions/$f.json /tmp/qu67.js; done
node tools/validate-questions.js /tmp/qu67.js
```
Expected: każdy typ `40 -> 50` w easy i hard; walidacja OK. Popraw treść i powtórz na świeżej kopii, jeśli błędy.

- [ ] **Step 6: Integracja do pliku produkcyjnego**

```bash
for f in type1 type2 type3 type6; do node tools/append-questions.js tools/new-questions/$f.json; done
node tools/validate-questions.js
rm -f /tmp/qu67.js /tmp/qu67.js.bak
```
Expected: typy 1/2/3/6 mają po 50 pytań/poziom; walidacja OK.

- [ ] **Step 7: Commit** (tylko na prośbę użytkownika)

```bash
git add web/questions-unified.js tools/new-questions/type1.json tools/new-questions/type2.json tools/new-questions/type3.json tools/new-questions/type6.json
git commit -m "feat: +80 pytań typów 1/2/3/6 — cel 25 sesji bez powtórki"
```

---

## Task 8: Weryfikacja końcowa — 25 sesji bez powtórki

**Files:** brak zmian — uruchomienie narzędzi.

- [ ] **Step 1: Symulacja EASY — oczekiwane 0 powtórek**

Run: `node tools/simulate-repeats.js easy 25; echo "exit=$?"`
Expected: `Pierwsza sesja z powtórką: brak`, `Suma powtórek w 25 sesjach: 0`, `exit=0`.

- [ ] **Step 2: Symulacja HARD — oczekiwane 0 powtórek**

Run: `node tools/simulate-repeats.js hard 25; echo "exit=$?"`
Expected: `Suma powtórek w 25 sesjach: 0`, `exit=0`.

- [ ] **Step 3: Symulacja 26 sesji — potwierdzić, że granica jest tam, gdzie ma być**

Run: `node tools/simulate-repeats.js easy 26; echo "exit=$?"`
Expected: pierwsza powtórka w sesji 26 (typ 5: 100/4 = 25), `exit=2`. Potwierdza, że cel „~25 sesji" trafiony dokładnie, nie przypadkiem.

- [ ] **Step 4: Walidacja strukturalna całego banku + walidacja figur typu 8**

Run: `node tools/validate-questions.js && node tools/validate-type8.js`
Expected: oba `✅ WALIDACJA OK`; łączna liczba pytań = 640 + 200 = **840**.

- [ ] **Step 5: Ręczny test UI**

Otwórz `web/index.html`, zrób kilka sesji w obu poziomach, sprawdź renderowanie nowych pytań (zwłaszcza typ 3 wykres, typ 6 tabela) i brak powtórek między kolejnymi sesjami.
Expected: nowe pytania renderują się poprawnie; brak wczesnych powtórek.

- [ ] **Step 6: Commit** (tylko na prośbę użytkownika)

```bash
git add -A
git commit -m "test: weryfikacja końcowa — 25 sesji bez powtórki (easy+hard)"
```

---

## Notatki dla wykonawcy

- **CLAUDE.md:** NIE commituj/pushuj bez wyraźnej prośby użytkownika. Kroki „Commit" są warunkowe — wykonaj tylko gdy użytkownik o to poprosi. Po wykonaniu planu przenieś ewentualny pasujący wpis z BACKLOG.md do BACKLOG_DONE.md.
- **Duplikacja logiki LRS:** `pickLeastRecentlySeen` istnieje w dwóch miejscach (`web/index.html` i `tools/simulate-repeats.js`) z konieczności (brak bundlera). Trzymaj obie kopie identyczne — przy zmianie algorytmu zmień obie.
- **Autorowanie pytań (Task 6–7) to realna praca, nie placeholder.** Pliki JSON tworzy agent wykonujący, dbając o merytoryczną poprawność i różnorodność. Walidator wyłapie błędy strukturalne, ale poprawność logiczną/liczbową gwarantuje autor.
- **Backupy `.bak`:** `append-questions.js` zostawia `web/questions-unified.js.bak`. Usuń je przed commitem lub dopisz do `.gitignore`.
