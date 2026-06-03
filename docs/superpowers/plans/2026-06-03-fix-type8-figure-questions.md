# Naprawa pytań typu 8 (powiązania między figurami) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przepisać wszystkie 80 pytań typu 8 do czystych macierzy 2×2 (jedna figura/pole), naprawić renderer trójkąta i odświeżyć cache, tak by każde pytanie było jednoznacznie rozwiązywalne z reguły wiersza × kolumny.

**Architecture:** Trzy jednorazowe skrypty Node w `tools/` (poza deployem): walidator (koduje reguły poprawności), generator deterministyczny (tworzy 80 pytań z reguł) oraz integrator (chirurgicznie podmienia bloki `type8` w `web/questions-unified.js`). Plus mała zmiana w `web/index.html` (trójkąt) i `web/sw.js` (bump cache). Walidator jest jednocześnie testem — TDD polega na tym, że najpierw pisze­my walidator i potwierdzamy, że obecne dane go NIE przechodzą.

**Tech Stack:** Vanilla JS (ES2015), Node.js (`vm`, `fs`, `assert`) — bez frameworka testowego (apka jest statyczna).

> **POLITYKA COMMITÓW (CLAUDE.md + pamięć użytkownika):** NIE commitować ani nie pushować niczego bez wyraźnej prośby użytkownika. Kroki „checkpoint" poniżej uruchamiają walidator zamiast `git commit`. Commit nastąpi wyłącznie na osobne polecenie, na końcu.

---

## Spójności i kontrakty (używane w wielu taskach)

Cykle i nazwy — identyczne we wszystkich skryptach:

```js
const SHAPES = ['circle', 'triangle', 'square'];          // cykl mod 3
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];     // cykl mod 4
const SHAPE_PL = { circle: 'koło', triangle: 'trójkąt', square: 'kwadrat' };
const FILL_PL  = { empty: 'puste', solid: 'pełne', x: 'przekreślone', 'dot-center': 'z kropką' };
const LETTERS  = ['A', 'B', 'C', 'D', 'E'];
```

Model macierzy 2×2, indeksy `i` = wiersz (0=góra,1=dół), `j` = kolumna (0=lewo,1=prawo):

```
TL = cell(0,0)   TR = cell(0,1)
BL = cell(1,0)   BR = cell(1,1)  ← odpowiedź (brakujące pole)
```

Parametry pytania `p`: `{ startShape, startFill, shapeAxis ('row'|'col'), shapeStep, fillStep }`; `fillAxis` = oś przeciwna do `shapeAxis`.

```js
function cellAt(i, j, p) {
  const fillAxis = p.shapeAxis === 'row' ? 'col' : 'row';
  const sAdvance = (p.shapeAxis === 'row' ? j : i) * p.shapeStep;
  const fAdvance = (fillAxis     === 'row' ? j : i) * p.fillStep;
  const sIdx = (SHAPES.indexOf(p.startShape) + sAdvance) % 3;
  const fIdx = (FILLS.indexOf(p.startFill)   + fAdvance) % 4;
  return { shape: SHAPES[sIdx], fill: FILLS[fIdx] };
}
```

Każdy ze skryptów ma własną kopię tych stałych/funkcji (to jednorazowe narzędzia, nie współdzielą modułu — świadomy wyjątek od DRY dla prostoty uruchamiania `node tools/<plik>.js`).

---

## Task 1: Walidator (test poprawności)

**Files:**
- Create: `tools/validate-type8.js`

- [ ] **Step 1: Napisz walidator**

`tools/validate-type8.js`:

```js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const SHAPES = ['circle', 'triangle', 'square'];
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];

function loadQuestions(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}

function flatType8(obj) { return obj.type8 || []; }
function cell(c) { return Array.isArray(c) ? c[0] : c; }

function validateQuestion(q, errors) {
  const id = q.id;
  const g = q.grid;
  // 1. każde pole = pojedyncza figura
  for (const key of ['topLeft', 'topRight', 'bottomLeft']) {
    const v = g[key];
    if (Array.isArray(v) && v.length !== 1) errors.push(`${id}: ${key} ma ${v.length} figur (oczekiwano 1)`);
  }
  q.options.forEach((opt, i) => {
    if (!Array.isArray(opt) || opt.length !== 1) errors.push(`${id}: opcja ${i} ma ${opt && opt.length} figur (oczekiwano 1)`);
  });
  const TL = cell(g.topLeft), TR = cell(g.topRight), BL = cell(g.bottomLeft);
  // 2. słownik kształtów/wypełnień
  [TL, TR, BL].concat(q.options.map(cell)).forEach((f) => {
    if (!SHAPES.includes(f.shape)) errors.push(`${id}: nieznany kształt "${f.shape}"`);
    if (!FILLS.includes(f.fill))  errors.push(`${id}: nieznane wypełnienie "${f.fill}"`);
  });
  // 3. rekonstrukcja reguł i odtworzenie BR
  const rsStep = (SHAPES.indexOf(TR.shape) - SHAPES.indexOf(TL.shape) + 3) % 3;
  const rfStep = (FILLS.indexOf(TR.fill)  - FILLS.indexOf(TL.fill)  + 4) % 4;
  const csStep = (SHAPES.indexOf(BL.shape) - SHAPES.indexOf(TL.shape) + 3) % 3;
  const cfStep = (FILLS.indexOf(BL.fill)  - FILLS.indexOf(TL.fill)  + 4) % 4;
  const brShape = SHAPES[(SHAPES.indexOf(TL.shape) + rsStep + csStep) % 3];
  const brFill  = FILLS[(FILLS.indexOf(TL.fill)   + rfStep + cfStep) % 4];
  // 4. nie-zdegenerowana: kształt zmienia się gdzieś i wypełnienie zmienia się gdzieś
  if (rsStep + csStep === 0) errors.push(`${id}: kształt nie zmienia się w żadnej osi (zdegenerowane)`);
  if (rfStep + cfStep === 0) errors.push(`${id}: wypełnienie nie zmienia się w żadnej osi (zdegenerowane)`);
  // 5. dokładnie jedna opcja = BR i to jest correct
  const matches = q.options.map(cell).map((f, i) => (f.shape === brShape && f.fill === brFill) ? i : -1).filter((i) => i >= 0);
  if (matches.length !== 1) errors.push(`${id}: ${matches.length} opcji pasuje do reguły BR (${brShape}/${brFill}), oczekiwano 1`);
  if (matches[0] !== q.correct) errors.push(`${id}: correct=${q.correct}, ale reguła wskazuje opcję ${matches[0]}`);
  if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) errors.push(`${id}: correct poza zakresem`);
  // 6. opcje unikalne
  const seen = new Set();
  q.options.map(cell).forEach((f) => { const k = f.shape + '/' + f.fill; if (seen.has(k)) errors.push(`${id}: zduplikowana opcja ${k}`); seen.add(k); });
}

function main() {
  const path = process.argv[2] || 'web/questions-unified.js';
  const { easy, hard } = loadQuestions(path);
  const e8 = flatType8(easy), h8 = flatType8(hard);
  const errors = [];
  if (e8.length !== 40) errors.push(`EASY type8: ${e8.length} pytań (oczekiwano 40)`);
  if (h8.length !== 40) errors.push(`HARD type8: ${h8.length} pytań (oczekiwano 40)`);
  e8.concat(h8).forEach((q) => validateQuestion(q, errors));
  // rozkład liczby opcji: po 20×4 i 20×5 na poziom
  for (const [lvl, arr] of [['easy', e8], ['hard', h8]]) {
    const c4 = arr.filter((q) => q.options.length === 4).length;
    const c5 = arr.filter((q) => q.options.length === 5).length;
    if (c4 !== 20 || c5 !== 20) errors.push(`${lvl}: rozkład opcji 4/5 = ${c4}/${c5} (oczekiwano 20/20)`);
  }
  if (errors.length) {
    console.error(`❌ WALIDACJA NIEUDANA — ${errors.length} błędów:`);
    errors.slice(0, 60).forEach((e) => console.error('  - ' + e));
    if (errors.length > 60) console.error(`  ... i ${errors.length - 60} więcej`);
    process.exit(1);
  }
  console.log(`✅ WALIDACJA OK — ${e8.length + h8.length} pytań typu 8 poprawnych`);
}

main();
```

- [ ] **Step 2: Uruchom walidator na OBECNYCH danych — musi ZGŁOSIĆ błędy**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: kod wyjścia 1, lista błędów (m.in. „… ma 2 figur", „… correct=… ale reguła wskazuje…"). To potwierdza, że walidator wykrywa zepsute pytania.

---

## Task 2: Generator deterministyczny

**Files:**
- Create: `tools/generate-type8.js`

- [ ] **Step 1: Napisz generator**

`tools/generate-type8.js` — eksportuje funkcję `generateAll(templates)` zwracającą `{ easy: [...], hard: [...] }`, gdzie `templates` to obecne pytania (źródło `id`, `level`, `instruction`, liczby opcji):

```js
const fs = require('fs');
const vm = require('vm');

const SHAPES = ['circle', 'triangle', 'square'];
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];
const SHAPE_PL = { circle: 'koło', triangle: 'trójkąt', square: 'kwadrat' };
const FILL_PL  = { empty: 'puste', solid: 'pełne', x: 'przekreślone', 'dot-center': 'z kropką' };
const LETTERS  = ['A', 'B', 'C', 'D', 'E'];

function cellAt(i, j, p) {
  const fillAxis = p.shapeAxis === 'row' ? 'col' : 'row';
  const sAdvance = (p.shapeAxis === 'row' ? j : i) * p.shapeStep;
  const fAdvance = (fillAxis     === 'row' ? j : i) * p.fillStep;
  const sIdx = (SHAPES.indexOf(p.startShape) + sAdvance) % 3;
  const fIdx = (FILLS.indexOf(p.startFill)   + fAdvance) % 4;
  return { shape: SHAPES[sIdx], fill: FILLS[fIdx] };
}

// Deterministyczna lista parametrów: iteruje przestrzeń tak, by nie powtórzyć
// pełnej krotki i ograniczyć powtórzenia figury startowej.
function paramSpace(level) {
  const out = [];
  const orientations = level === 'easy' ? ['row'] : ['row', 'col'];      // hard: też zamiana
  const shapeSteps = [1, 2];
  const fillSteps  = level === 'easy' ? [1, 2] : [2, 3, 1];               // hard preferuje większe kroki
  for (const startShape of SHAPES)
    for (const startFill of FILLS)
      for (const shapeAxis of orientations)
        for (const shapeStep of shapeSteps)
          for (const fillStep of fillSteps)
            out.push({ startShape, startFill, shapeAxis, shapeStep, fillStep });
  return out;
}

function buildOptions(p, optCount, posSeed) {
  const TL = cellAt(0, 0, p), TR = cellAt(0, 1, p), BL = cellAt(1, 0, p), BR = cellAt(1, 1, p);
  const fillAxis = p.shapeAxis === 'row' ? 'col' : 'row';
  const eq = (a, b) => a.shape === b.shape && a.fill === b.fill;
  const key = (f) => f.shape + '/' + f.fill;
  // kandydaci na dystraktory (wg specyfikacji typu 8)
  const cands = [
    { shape: BR.shape, fill: TL.fill },                                                   // tylko reguła kształtu
    { shape: TL.shape, fill: BR.fill },                                                   // tylko reguła wypełnienia
    { shape: BR.shape, fill: FILLS[(FILLS.indexOf(BR.fill) + 2) % 4] },                    // odwrócone wypełnienie
    BL,                                                                                    // niezmienione widoczne pole
    TR,
    { shape: SHAPES[(SHAPES.indexOf(BR.shape) + 1) % 3], fill: BR.fill },                  // błędny krok kształtu
    { shape: SHAPES[(SHAPES.indexOf(BR.shape) + 2) % 3], fill: BR.fill },
    { shape: BR.shape, fill: FILLS[(FILLS.indexOf(BR.fill) + 1) % 4] },
  ];
  const distractors = [];
  const used = new Set([key(BR)]);
  for (const c of cands) {
    if (distractors.length >= optCount - 1) break;
    if (used.has(key(c))) continue;
    used.add(key(c));
    distractors.push(c);
  }
  // wstaw poprawną odpowiedź na deterministycznej pozycji
  const pos = posSeed % optCount;
  const opts = distractors.slice();
  opts.splice(pos, 0, BR);
  return { options: opts.map((f) => [f]), correct: pos, BR, TL, TR, BL, fillAxis };
}

function explain(meta) {
  const { TL, TR, BL, BR, p, correct } = meta;
  const shapeRow = p.shapeAxis === 'row';
  const rowDim = shapeRow ? 'kształt' : 'wypełnienie';
  const colDim = shapeRow ? 'wypełnienie' : 'kształt';
  const rowFrom = shapeRow ? SHAPE_PL[TL.shape] : FILL_PL[TL.fill];
  const rowTo   = shapeRow ? SHAPE_PL[TR.shape] : FILL_PL[TR.fill];
  const colFrom = shapeRow ? FILL_PL[TL.fill]  : SHAPE_PL[TL.shape];
  const colTo   = shapeRow ? FILL_PL[BL.fill]  : SHAPE_PL[BL.shape];
  return `Reguła wierszy: ${rowDim} zmienia się (${rowFrom} → ${rowTo}). ` +
         `Reguła kolumn: ${colDim} zmienia się (${colFrom} → ${colTo}). ` +
         `Brakujące pole: ${SHAPE_PL[BR.shape]} ${FILL_PL[BR.fill]}. ` +
         `Opcja ${LETTERS[correct]} — poprawna.`;
}

function generateForLevel(templates, level) {
  const space = paramSpace(level);
  const startCount = {};
  const params = [];
  let idx = 0;
  // wybierz tyle parametrów ile szablonów, krocząc po przestrzeni z limitem powtórzeń startu
  while (params.length < templates.length) {
    const p = space[idx % space.length];
    const sk = p.startShape + '/' + p.startFill;
    const cap = Math.ceil(templates.length / 12) + 1;
    if ((startCount[sk] || 0) < cap || idx >= space.length * 3) {
      startCount[sk] = (startCount[sk] || 0) + 1;
      params.push(p);
    }
    idx++;
  }
  return templates.map((tmpl, k) => {
    const p = params[k];
    const optCount = tmpl.options.length;
    const built = buildOptions(p, optCount, k);
    const meta = { TL: built.TL, TR: built.TR, BL: built.BL, BR: built.BR, p, correct: built.correct };
    return {
      id: tmpl.id,
      typeId: 8,
      level: tmpl.level,
      instruction: tmpl.instruction,
      grid: {
        topLeft: built.TL,
        bottomLeft: [built.BL],
        topRight: built.TR,
      },
      options: built.options,
      correct: built.correct,
      explanation: explain(meta),
    };
  });
}

function loadQuestions(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}

function generateAll(path) {
  const { easy, hard } = loadQuestions(path);
  return {
    easy: generateForLevel(easy.type8, 'easy'),
    hard: generateForLevel(hard.type8, 'hard'),
  };
}

module.exports = { generateAll };

if (require.main === module) {
  const out = generateAll(process.argv[2] || 'web/questions-unified.js');
  fs.writeFileSync('tools/generated-type8.json', JSON.stringify(out, null, 2));
  console.log(`Wygenerowano easy=${out.easy.length}, hard=${out.hard.length} → tools/generated-type8.json`);
}
```

- [ ] **Step 2: Uruchom generator**

Run: `node tools/generate-type8.js web/questions-unified.js`
Expected: `Wygenerowano easy=40, hard=40 → tools/generated-type8.json`

- [ ] **Step 3: Zwaliduj WYGENEROWANE pytania (rozszerz walidator o tryb JSON)**

Dodaj na końcu `tools/validate-type8.js`, PRZED `main();` zamień wywołanie na obsługę trybu JSON. Zmodyfikuj funkcję `main` tak, by gdy ścieżka kończy się `.json`, wczytała `{easy,hard}` z JSON zamiast z pliku JS:

```js
function loadFromJson(path) {
  const o = JSON.parse(fs.readFileSync(path, 'utf8'));
  return { easy: { type8: o.easy }, hard: { type8: o.hard } };
}
```

I w `main()` zamień pierwszą linię na:

```js
  const path = process.argv[2] || 'web/questions-unified.js';
  const { easy, hard } = path.endsWith('.json') ? loadFromJson(path) : loadQuestions(path);
```

Run: `node tools/validate-type8.js tools/generated-type8.json`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 poprawnych`

---

## Task 3: Integracja do questions-unified.js

**Files:**
- Create: `tools/integrate-type8.js`
- Modify: `web/questions-unified.js` (bloki `type8` w obu obiektach)

- [ ] **Step 1: Napisz integrator (chirurgiczna podmiana bloków type8)**

`tools/integrate-type8.js` — znajduje `  type8: [` i przez zliczanie nawiasów `[ ]` wyznacza koniec tablicy, podmienia tekst:

```js
const fs = require('fs');
const { generateAll } = require('./generate-type8');

const PATH = process.argv[2] || 'web/questions-unified.js';

// Znajduje zakres tekstu tablicy następującej po markerze (od '[' do parującego ']').
function arrayRange(src, fromIndex) {
  const marker = '\n  type8: [';
  const start = src.indexOf(marker, fromIndex);
  if (start < 0) throw new Error('Nie znaleziono "type8: [" od indeksu ' + fromIndex);
  const bracketOpen = src.indexOf('[', start);
  let depth = 0, i = bracketOpen;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
  }
  return { open: bracketOpen, close: i }; // [open..close] obejmuje '[' ... ']'
}

function serializeArray(arr) {
  // 4 spacje wcięcia bazowego (jak w pliku: "  type8: [" → elementy mają 4 spacje)
  const body = arr.map((q) => '    ' + JSON.stringify(q)).join(',\n');
  return '[\n' + body + '\n  ]';
}

function main() {
  const src = fs.readFileSync(PATH, 'utf8');
  const gen = generateAll(PATH);

  const hardObjStart = src.indexOf('const QUESTIONS_HARD');
  if (hardObjStart < 0) throw new Error('Brak QUESTIONS_HARD');

  // EASY.type8 — pierwszy type8 przed QUESTIONS_HARD
  const easyRange = arrayRange(src, 0);
  if (easyRange.open > hardObjStart) throw new Error('EASY.type8 nie przed QUESTIONS_HARD');
  // HARD.type8 — pierwszy type8 po QUESTIONS_HARD
  const hardRange = arrayRange(src, hardObjStart);

  // podmiana od końca, by nie przesunąć indeksów
  let out = src;
  out = out.slice(0, hardRange.open) + serializeArray(gen.hard) + out.slice(hardRange.close + 1);
  out = out.slice(0, easyRange.open) + serializeArray(gen.easy) + out.slice(easyRange.close + 1);

  fs.writeFileSync(PATH, out);
  console.log(`Podmieniono type8: easy=${gen.easy.length}, hard=${gen.hard.length} w ${PATH}`);
}

main();
```

- [ ] **Step 2: Zrób kopię zapasową i uruchom integrator**

Run:
```bash
cp web/questions-unified.js /tmp/questions-unified.bak.js
node tools/integrate-type8.js web/questions-unified.js
```
Expected: `Podmieniono type8: easy=40, hard=40 w web/questions-unified.js`

- [ ] **Step 3: Sprawdź, że plik nadal jest poprawnym JS i typy 1–7 nietknięte**

Run:
```bash
node --check web/questions-unified.js && echo "syntax OK"
node -e '
const fs=require("fs"),vm=require("vm");let c=fs.readFileSync("web/questions-unified.js","utf8");
c+=";globalThis.__E=QUESTIONS_EASY;globalThis.__H=QUESTIONS_HARD;";
const s={};s.globalThis=s;vm.createContext(s);vm.runInContext(c,s);
const e=s.__E,h=s.__H;
const cnt=o=>Object.keys(o).map(k=>k+":"+o[k].length).join(" ");
console.log("EASY",cnt(e));console.log("HARD",cnt(h));
'
```
Expected: `syntax OK` oraz listy `type1:40 … type8:40` dla obu obiektów (liczności wszystkich typów bez zmian).

- [ ] **Step 4: Checkpoint — walidacja na rzeczywistym pliku**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 poprawnych`
(NIE commitujemy — zgodnie z polityką.)

---

## Task 4: Renderer trójkąta w aplikacji

**Files:**
- Modify: `web/index.html` (funkcja `renderFigure`, ~`web/index.html:1672-1705`)

- [ ] **Step 1: Dodaj obsługę trójkąta w renderFigure**

W `web/index.html` w `renderFigure` zamień blok wyboru kształtu:

```js
    let shapeHtml = '';
    if (spec.shape === 'square') {
      shapeHtml = '<rect x="10" y="10" width="60" height="60" fill="' + shapeFill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>';
    } else {
      shapeHtml = '<circle cx="40" cy="40" r="30" fill="' + shapeFill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>';
    }
```

na:

```js
    let shapeHtml = '';
    if (spec.shape === 'square') {
      shapeHtml = '<rect x="10" y="10" width="60" height="60" fill="' + shapeFill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>';
    } else if (spec.shape === 'triangle') {
      shapeHtml = '<polygon points="40,10 70,68 10,68" fill="' + shapeFill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '" stroke-linejoin="round"/>';
    } else {
      shapeHtml = '<circle cx="40" cy="40" r="30" fill="' + shapeFill + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '"/>';
    }
```

- [ ] **Step 2: Dodaj krzyżyk i kropkę dla trójkąta**

W tym samym `renderFigure` zamień blok wnętrza:

```js
    if (spec.fill === 'x') {
      if (spec.shape === 'square') {
        interior = '<line x1="12" y1="12" x2="68" y2="68" stroke="' + stroke + '" stroke-width="2"/>' +
                   '<line x1="68" y1="12" x2="12" y2="68" stroke="' + stroke + '" stroke-width="2"/>';
      } else {
        interior = '<line x1="19" y1="19" x2="61" y2="61" stroke="' + stroke + '" stroke-width="2"/>' +
                   '<line x1="61" y1="19" x2="19" y2="61" stroke="' + stroke + '" stroke-width="2"/>';
      }
    } else if (spec.fill === 'dot-center') {
      interior = '<circle cx="40" cy="40" r="8" fill="#333"/>';
    }
```

na:

```js
    if (spec.fill === 'x') {
      if (spec.shape === 'square') {
        interior = '<line x1="12" y1="12" x2="68" y2="68" stroke="' + stroke + '" stroke-width="2"/>' +
                   '<line x1="68" y1="12" x2="12" y2="68" stroke="' + stroke + '" stroke-width="2"/>';
      } else if (spec.shape === 'triangle') {
        interior = '<line x1="30" y1="44" x2="50" y2="60" stroke="' + stroke + '" stroke-width="2"/>' +
                   '<line x1="50" y1="44" x2="30" y2="60" stroke="' + stroke + '" stroke-width="2"/>';
      } else {
        interior = '<line x1="19" y1="19" x2="61" y2="61" stroke="' + stroke + '" stroke-width="2"/>' +
                   '<line x1="61" y1="19" x2="19" y2="61" stroke="' + stroke + '" stroke-width="2"/>';
      }
    } else if (spec.fill === 'dot-center') {
      const dotCy = spec.shape === 'triangle' ? 52 : 40;
      interior = '<circle cx="40" cy="' + dotCy + '" r="8" fill="#333"/>';
    }
```

- [ ] **Step 3: Wizualny smoke-test renderera**

Run: `open bug-reports/podglad-bledu-h_t8_037.html`
Expected: w tabeli „naprawiony" trójkąty są trójkątami (ostrze do góry), z krzyżykiem/kropką w środku; koło ≠ trójkąt. (Plik podglądu zawiera już `fixedRenderFigure` identyczny z wprowadzonym kodem — służy jako referencja wizualna.)

- [ ] **Step 4: Sprawdź faktyczny render kilku pytań w aplikacji**

Run: `cd web && python3 -m http.server 8765` (w tle), potem `open http://localhost:8765`
Expected: uruchom sesję, przejdź do pytania typu 8 — trójkąty renderują się poprawnie, brak „samych kół" tam, gdzie reguła zmienia kształt.

---

## Task 5: Bump cache service workera

**Files:**
- Modify: `web/sw.js:1`

- [ ] **Step 1: Podbij wersję cache**

W `web/sw.js` zamień:

```js
const CACHE = 'ksap-v3';
```

na:

```js
const CACHE = 'ksap-v4';
```

- [ ] **Step 2: Potwierdź, że to jedyna zmiana w sw.js**

Run: `git diff web/sw.js`
Expected: jedna zmieniona linia (`v3` → `v4`).

---

## Task 6: Walidacja końcowa i smoke-test całości

**Files:** (brak zmian — weryfikacja)

- [ ] **Step 1: Pełna walidacja danych**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 poprawnych`

- [ ] **Step 2: Sprawdź składnię index.html (renderFigure)**

Run:
```bash
grep -q "spec.shape === 'triangle'" web/index.html \
  && grep -q 'polygon points="40,10 70,68 10,68"' web/index.html \
  && echo "renderFigure: gałąź triangle obecna" \
  || { echo "Brak gałęzi triangle"; exit 1; }
```
Expected: `renderFigure: gałąź triangle obecna`

- [ ] **Step 3: Wizualny przegląd reprezentatywnych pytań**

Otwórz aplikację (`http://localhost:8765`) i sprawdź ręcznie po 2–3 pytania typu 8 easy i hard: reguła wiersza/kolumny jest czytelna, dokładnie jedna opcja pasuje, `explanation` zgadza się z figurami. Sprawdź konkretnie `h_t8_037` (przez stronę QA gdy powstanie, albo grając do trafienia).

- [ ] **Step 4: Posprzątaj artefakty pośrednie**

Run: `rm -f tools/generated-type8.json`
Expected: usunięty plik pośredni (generator i walidator zostają jako narzędzia).

- [ ] **Step 5: Podsumowanie diffu (bez commita)**

Run: `git status && git diff --stat`
Expected: zmodyfikowane `web/questions-unified.js`, `web/index.html`, `web/sw.js`; nowe `tools/*.js`, `docs/superpowers/...`, `bug-reports/podglad-bledu-h_t8_037.html`, wpis w `BACKLOG.md`.
**STOP — nie commitować.** Commit/push wyłącznie na wyraźną prośbę użytkownika (CLAUDE.md).

---

## Notatki

- Generator i walidator są niezależnymi narzędziami w `tools/` (poza `web/`, więc poza deployem Netlify) — można je uruchamiać ponownie, gdyby trzeba było zregenerować pytania.
- Determinizm: brak `Math.random`/`Date.now`, więc ponowne uruchomienie daje identyczny wynik.
- Backlog: ta naprawa nie ma osobnego wpisu w BACKLOG.md (zgłoszenie przyszło mailem), więc nic nie przenosimy do BACKLOG_DONE.md. Wpis „Podgląd pojedynczego pytania (strona QA)" dodany wcześniej zostaje jako osobny task.
