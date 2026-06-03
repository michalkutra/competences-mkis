# Wariant 2 typu 8 (wielofigurowy + gradient + obrót) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przepisać 40 pytań hard typu 8 na komórki wielofigurowe z gradientem T1/T2/T3 i regułą obrotu, zachowując jednoznaczną rozwiązywalność; bank easy bez zmian.

**Architecture:** Rozszerzenie istniejących narzędzi w `tools/` (generator + walidator; integrator bez zmian) o model „pozycja = niezależna podmacierz 2×2", wielofigurowe komórki i atrybut obrotu. Zmiana renderera w `web/index.html` (rozmiar + obrót + komórki wielofigurowe). Walidator jest testem — najpierw rozszerzamy go i potwierdzamy, że obecne dane (wszystkie hard N=1) NIE spełniają rozkładu tierów.

**Tech Stack:** Vanilla JS (ES2015), Node.js (`vm`, `fs`) — bez frameworka testowego.

> **POLITYKA COMMITÓW (CLAUDE.md + pamięć użytkownika):** NIE commitować/pushować bez wyraźnej prośby. Kroki „checkpoint" uruchamiają walidator zamiast `git commit`.

**Spec:** [2026-06-03-typ8-wariant2-design.md](2026-06-03-typ8-wariant2-design.md)

---

## Stałe i kontrakty (wspólne dla skryptów)

```js
const SHAPES = ['circle', 'triangle', 'square'];          // mod 3
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];     // mod 4
function rotCycle(shape){ return shape === 'square' ? [0,45] : [0,90,180,270]; }
```

- **Figura:** `{ shape, fill }` lub `{ shape, fill, rot }`.
- **Komórka:** N=1 → pojedynczy obiekt (`topLeft`/`topRight`) i 1-el. tablice (`bottomLeft`, opcje) — jak wariant 1. N≥2 → tablice N figur we wszystkich polach i opcjach.
- **Pozycja p** w komórce: niezależna podmacierz 2×2; `i`=wiersz (0 góra,1 dół), `j`=kolumna (0 lewo,1 prawo).
- **Tier po indeksie hard (h=0..39):** h<15 → T1 (N=1); 15≤h<30 → T2 (N=2); h≥30 → T3 (N=3), z czego pierwsze 7 (h=30..36) z obrotem.

---

## Task 1: Walidator (test poprawności) — rozszerzenie na wielofigurowość + obrót

**Files:**
- Modify (pełne zastąpienie): `tools/validate-type8.js`

- [ ] **Step 1: Zastąp `tools/validate-type8.js` poniższą treścią**

```js
const fs = require('fs');
const vm = require('vm');

const SHAPES = ['circle', 'triangle', 'square'];
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];
function rotCycle(shape){ return shape === 'square' ? [0,45] : [0,90,180,270]; }

function loadJs(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function loadJson(path) {
  const o = JSON.parse(fs.readFileSync(path, 'utf8'));
  return { easy: { type8: o.easy }, hard: { type8: o.hard } };
}
function norm(c){ return Array.isArray(c) ? c : [c]; }
function figKey(f){ return f.shape + '/' + f.fill + '/' + (f.rot || 0); }
function cellKey(c){ return norm(c).map(figKey).join('|'); }

// odtworzenie oczekiwanej figury BR dla jednej pozycji; zwraca {shape,fill,rot?,_changes} albo {error}
function reconstructPos(tl, tr, bl) {
  const sRow = (SHAPES.indexOf(tr.shape) - SHAPES.indexOf(tl.shape) + 3) % 3;
  const sCol = (SHAPES.indexOf(bl.shape) - SHAPES.indexOf(tl.shape) + 3) % 3;
  const fRow = (FILLS.indexOf(tr.fill)  - FILLS.indexOf(tl.fill)  + 4) % 4;
  const fCol = (FILLS.indexOf(bl.fill)  - FILLS.indexOf(tl.fill)  + 4) % 4;
  const br = {
    shape: SHAPES[(SHAPES.indexOf(tl.shape) + sRow + sCol) % 3],
    fill:  FILLS[(FILLS.indexOf(tl.fill)   + fRow + fCol) % 4],
  };
  let changes = (sRow + sCol > 0 ? 1 : 0) + (fRow + fCol > 0 ? 1 : 0);
  if (tl.rot !== undefined) {
    if (tl.shape === 'circle') return { error: 'obrót na kole (niewidoczny)' };
    if (sRow + sCol !== 0) return { error: 'obrót przy zmiennym kształcie' };
    const cyc = rotCycle(tl.shape);
    const i0 = cyc.indexOf(tl.rot), iR = cyc.indexOf(tr.rot), iC = cyc.indexOf(bl.rot);
    if (i0 < 0 || iR < 0 || iC < 0) return { error: 'zła wartość rot dla ' + tl.shape };
    const rRow = (iR - i0 + cyc.length) % cyc.length;
    const rCol = (iC - i0 + cyc.length) % cyc.length;
    br.rot = cyc[(i0 + rRow + rCol) % cyc.length];
    changes += (rRow + rCol > 0 ? 1 : 0);
  }
  br._changes = changes;
  return br;
}
function eqFig(a, b){ return a.shape === b.shape && a.fill === b.fill && (a.rot || 0) === (b.rot || 0); }

function validateQuestion(q, errors) {
  const id = q.id, g = q.grid;
  const TL = norm(g.topLeft), TR = norm(g.topRight), BL = norm(g.bottomLeft);
  const N = TL.length;
  if (TR.length !== N || BL.length !== N) errors.push(`${id}: niejednorodna liczba figur w polach (${N}/${TR.length}/${BL.length})`);
  q.options.forEach((o, i) => { if (norm(o).length !== N) errors.push(`${id}: opcja ${i} ma ${norm(o).length} figur (oczekiwano ${N})`); });
  // słownik
  TL.concat(TR, BL).concat(q.options.flatMap(norm)).forEach((f) => {
    if (!SHAPES.includes(f.shape)) errors.push(`${id}: nieznany kształt "${f.shape}"`);
    if (!FILLS.includes(f.fill))  errors.push(`${id}: nieznane wypełnienie "${f.fill}"`);
  });
  // oczekiwane BR per pozycja
  const expBR = [];
  for (let p = 0; p < N; p++) {
    const rec = reconstructPos(TL[p], TR[p], BL[p]);
    if (rec.error) { errors.push(`${id}: poz ${p}: ${rec.error}`); return; }
    if (rec._changes === 0) errors.push(`${id}: poz ${p}: nic się nie zmienia (zdegenerowane)`);
    expBR.push({ shape: rec.shape, fill: rec.fill, rot: rec.rot });
  }
  // dokładnie jedna opcja = pełne BR i to jest correct
  const full = (c) => { const a = norm(c); if (a.length !== N) return false; for (let p = 0; p < N; p++) if (!eqFig(a[p], expBR[p])) return false; return true; };
  const matches = q.options.map((o, i) => full(o) ? i : -1).filter((i) => i >= 0);
  if (matches.length !== 1) errors.push(`${id}: ${matches.length} opcji pasuje do reguły, oczekiwano 1`);
  else if (matches[0] !== q.correct) errors.push(`${id}: correct=${q.correct}, reguła wskazuje ${matches[0]}`);
  if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) errors.push(`${id}: correct poza zakresem`);
  // opcje unikalne (jako komórki)
  const seen = new Set();
  q.options.forEach((o) => { const k = cellKey(o); if (seen.has(k)) errors.push(`${id}: zduplikowana opcja ${k}`); seen.add(k); });
}

function main() {
  const path = process.argv[2] || 'web/questions-unified.js';
  const { easy, hard } = path.endsWith('.json') ? loadJson(path) : loadJs(path);
  const e8 = easy.type8 || [], h8 = hard.type8 || [];
  const errors = [];
  if (e8.length !== 40) errors.push(`EASY type8: ${e8.length} (oczekiwano 40)`);
  if (h8.length !== 40) errors.push(`HARD type8: ${h8.length} (oczekiwano 40)`);
  e8.concat(h8).forEach((q) => validateQuestion(q, errors));
  // easy: wszystkie N=1
  e8.forEach((q) => { if (norm(q.grid.topLeft).length !== 1) errors.push(`${q.id}: easy musi mieć 1 figurę`); });
  // hard: rozkład N = 15/15/10
  const Ncount = { 1: 0, 2: 0, 3: 0 };
  h8.forEach((q) => { const n = norm(q.grid.topLeft).length; Ncount[n] = (Ncount[n] || 0) + 1; });
  if (Ncount[1] !== 15 || Ncount[2] !== 15 || Ncount[3] !== 10) errors.push(`HARD rozkład N = ${Ncount[1]}/${Ncount[2]}/${Ncount[3]} (oczekiwano 15/15/10)`);
  // hard: >=6 pytań z obrotem
  const rotQ = h8.filter((q) => norm(q.grid.topLeft).some((f) => f.rot !== undefined)).length;
  if (rotQ < 6) errors.push(`HARD pytań z obrotem: ${rotQ} (oczekiwano >=6)`);
  // rozkład opcji 20/20 na poziom
  for (const [lvl, arr] of [['easy', e8], ['hard', h8]]) {
    const c4 = arr.filter((q) => q.options.length === 4).length;
    const c5 = arr.filter((q) => q.options.length === 5).length;
    if (c4 !== 20 || c5 !== 20) errors.push(`${lvl}: rozkład opcji 4/5 = ${c4}/${c5} (oczekiwano 20/20)`);
  }
  // globalna unikalność układów hard
  const sigs = new Set();
  h8.forEach((q) => { const s = cellKey(q.grid.topLeft) + '#' + cellKey(q.grid.topRight) + '#' + cellKey(q.grid.bottomLeft); if (sigs.has(s)) errors.push(`${q.id}: zduplikowany układ z innym pytaniem`); sigs.add(s); });

  if (errors.length) {
    console.error(`❌ WALIDACJA NIEUDANA — ${errors.length} błędów:`);
    errors.slice(0, 60).forEach((e) => console.error('  - ' + e));
    if (errors.length > 60) console.error(`  ... i ${errors.length - 60} więcej`);
    process.exit(1);
  }
  console.log(`✅ WALIDACJA OK — ${e8.length + h8.length} pytań typu 8 (hard N: ${Ncount[1]}/${Ncount[2]}/${Ncount[3]}, obrót: ${rotQ})`);
}

main();
```

- [ ] **Step 2: Uruchom na OBECNYCH danych — musi ZGŁOSIĆ błędy**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: kod wyjścia 1; m.in. `HARD rozkład N = 40/0/0 (oczekiwano 15/15/10)` i `HARD pytań z obrotem: 0 (oczekiwano >=6)`. (Easy i pojedyncze reguły hard nadal spełniają resztę — to potwierdza, że nowe checki działają.)

---

## Task 2: Generator — gradient T1/T2/T3 + obrót

**Files:**
- Modify (pełne zastąpienie): `tools/generate-type8.js`

- [ ] **Step 1: Zastąp `tools/generate-type8.js` poniższą treścią**

```js
const fs = require('fs');
const vm = require('vm');

const SHAPES = ['circle', 'triangle', 'square'];
const FILLS  = ['empty', 'solid', 'x', 'dot-center'];
const SHAPE_PL = { circle: 'koło', triangle: 'trójkąt', square: 'kwadrat' };
const FILL_PL  = { empty: 'puste', solid: 'pełne', x: 'przekreślone', 'dot-center': 'z kropką' };
const LETTERS  = ['A', 'B', 'C', 'D', 'E'];
function rotCycle(shape){ return shape === 'square' ? [0,45] : [0,90,180,270]; }
function opp(ax){ return ax === 'row' ? 'col' : 'row'; }

function figAt(rule, i, j) {
  const sAdd = (rule.shapeAxis === 'row' ? j : i) * rule.shapeStep;
  const fAdd = (rule.fillAxis  === 'row' ? j : i) * rule.fillStep;
  const fig = {
    shape: SHAPES[(SHAPES.indexOf(rule.startShape) + sAdd) % 3],
    fill:  FILLS[(FILLS.indexOf(rule.startFill)   + fAdd) % 4],
  };
  if (rule.startRot !== undefined) {
    const cyc = rotCycle(rule.startShape);
    const rAdd = (rule.rotAxis === 'row' ? j : i) * rule.rotStep;
    fig.rot = cyc[(cyc.indexOf(rule.startRot) + rAdd) % cyc.length];
  }
  return fig;
}
function cellAt(rules, i, j){ return rules.map((r) => figAt(r, i, j)); }

// pozycja bez obrotu: kształt + wypełnienie na przeciwnych osiach
function plainRule(seed) {
  const shapeAxis = (Math.floor(seed / 12) % 2) ? 'col' : 'row';
  return {
    startShape: SHAPES[seed % 3],
    startFill:  FILLS[Math.floor(seed / 3) % 4],
    shapeAxis, fillAxis: opp(shapeAxis),
    shapeStep: 1 + (Math.floor(seed / 2) % 2),  // 1..2
    fillStep:  1 + (Math.floor(seed / 5) % 3),  // 1..3
  };
}
// pozycja z obrotem: kształt stały (trójkąt/kwadrat); obrót + wypełnienie na przeciwnych osiach
function rotRule(seed) {
  const shape = (seed % 2) ? 'square' : 'triangle';
  const fillAxis = (Math.floor(seed / 4) % 2) ? 'row' : 'col';
  return {
    startShape: shape, startRot: 0,
    shapeAxis: 'row', shapeStep: 0,            // kształt stały
    fillAxis, fillStep: 1 + (Math.floor(seed / 3) % 3),
    rotAxis: opp(fillAxis),
    rotStep: shape === 'square' ? 1 : (1 + (seed % 2)),  // trójkąt 1..2, kwadrat 1
    startFill: FILLS[seed % 4],
  };
}

function rulesFor(h, bump) {
  const b = bump * 17;
  if (h < 15)      return [plainRule(h * 7 + 1 + b)];
  if (h < 30)      { const s = h - 15; return [plainRule(s * 7 + 3 + b), plainRule(s * 7 + 11 + b)]; }
  const s = h - 30;
  if (s < 7)       return [rotRule(s * 5 + 1 + b), rotRule(s * 5 + 2 + b), rotRule(s * 5 + 4 + b)];
  return [plainRule(s * 7 + 2 + b), plainRule(s * 7 + 9 + b), plainRule(s * 7 + 5 + b)];
}

function cellKey(c){ return c.map((f) => f.shape + '/' + f.fill + '/' + (f.rot || 0)).join('|'); }

function buildOptions(g, optCount, seed) {
  const BR = g.BR;
  const cands = [];
  for (let p = 0; p < BR.length; p++) {
    const mk = (mut) => BR.map((f, idx) => idx === p ? Object.assign({}, f, mut) : f);
    cands.push(mk({ fill: g.TL[p].fill }));
    if (BR[p].rot !== undefined) cands.push(mk({ rot: g.TL[p].rot }));
    else cands.push(mk({ shape: g.TL[p].shape }));
    cands.push(mk({ fill: FILLS[(FILLS.indexOf(BR[p].fill) + 2) % 4] }));
    cands.push(BR.map((f, idx) => idx === p ? g.BL[p] : f));
  }
  cands.push(g.TL.slice(), g.BL.slice(), g.TR.slice());
  const used = new Set([cellKey(BR)]);
  const distract = [];
  for (const c of cands) { if (distract.length >= optCount - 1) break; const k = cellKey(c); if (used.has(k)) continue; used.add(k); distract.push(c); }
  let extra = 1;
  while (distract.length < optCount - 1 && extra <= 8) {
    const c = BR.map((f) => Object.assign({}, f, { fill: FILLS[(FILLS.indexOf(f.fill) + extra) % 4] }));
    const k = cellKey(c); if (!used.has(k)) { used.add(k); distract.push(c); } extra++;
  }
  const pos = seed % optCount;
  const opts = distract.slice(); opts.splice(pos, 0, BR);
  return { options: opts, correct: pos };
}

function attrsOnAxis(r, axis) {
  const out = [];
  if (r.shapeAxis === axis && r.shapeStep) out.push('kształt');
  if (r.fillAxis  === axis && r.fillStep)  out.push('wypełnienie');
  if (r.startRot !== undefined && r.rotAxis === axis && r.rotStep) out.push('obrót');
  return out;
}
function describeFig(f){ let s = SHAPE_PL[f.shape] + ' ' + FILL_PL[f.fill]; if (f.rot) s += ' (obrót ' + f.rot + '°)'; return s; }
function explain(rules, BR, correct) {
  const lead = rules.length === 1 ? 'Jedna figura.' : rules.length + ' niezależne figury, każda z własną regułą.';
  const parts = rules.map((r, i) => `figura ${i + 1}: wiersz → ${attrsOnAxis(r, 'row').join('+') || '—'}, kolumna → ${attrsOnAxis(r, 'col').join('+') || '—'}`);
  return `${lead} ${parts.join(' · ')}. Brakujące pole: ${BR.map(describeFig).join('; ')}. Opcja ${LETTERS[correct]} — poprawna.`;
}

function buildQuestion(tmpl, h, bump) {
  const rules = rulesFor(h, bump);
  const N = rules.length;
  const TL = cellAt(rules, 0, 0), TR = cellAt(rules, 0, 1), BL = cellAt(rules, 1, 0), BR = cellAt(rules, 1, 1);
  const { options, correct } = buildOptions({ TL, TR, BL, BR }, tmpl.options.length, h + bump);
  const grid = N === 1
    ? { topLeft: TL[0], bottomLeft: [BL[0]], topRight: TR[0] }
    : { topLeft: TL, bottomLeft: BL, topRight: TR };
  return { id: tmpl.id, typeId: 8, level: tmpl.level, instruction: tmpl.instruction, grid, options, correct, explanation: explain(rules, BR, correct) };
}

function loadQuestions(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}

function sig(q){ return cellKey(require_norm(q.grid.topLeft)) + '#' + cellKey(require_norm(q.grid.topRight)) + '#' + cellKey(require_norm(q.grid.bottomLeft)); }
function require_norm(c){ return Array.isArray(c) ? c : [c]; }

function generateAll(path) {
  const { easy, hard } = loadQuestions(path);
  const seen = new Set();
  const outHard = hard.type8.map((tmpl, h) => {
    let bump = 0, q = buildQuestion(tmpl, h, 0);
    while (seen.has(sig(q)) && bump < 50) { bump++; q = buildQuestion(tmpl, h, bump); }
    seen.add(sig(q)); return q;
  });
  return { easy: easy.type8, hard: outHard };  // easy: pass-through (bez zmian)
}

module.exports = { generateAll };

if (require.main === module) {
  const out = generateAll(process.argv[2] || 'web/questions-unified.js');
  fs.writeFileSync('tools/generated-type8.json', JSON.stringify(out, null, 2));
  console.log(`Wygenerowano easy=${out.easy.length} (bez zmian), hard=${out.hard.length}`);
}
```

- [ ] **Step 2: Wygeneruj**

Run: `node tools/generate-type8.js web/questions-unified.js`
Expected: `Wygenerowano easy=40 (bez zmian), hard=40`

- [ ] **Step 3: Zwaliduj wygenerowane**

Run: `node tools/validate-type8.js tools/generated-type8.json`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 (hard N: 15/15/10, obrót: 7)`
Jeśli błąd — NIE obchodź; zgłoś jako BLOCKED z dokładnymi błędami (walidator jest źródłem prawdy).

- [ ] **Step 4: Sanity — różnorodność i przykłady**

Run:
```bash
node -e '
const o=require("./tools/generated-type8.json");
const n=c=>Array.isArray(c)?c.length:1;
const d={1:0,2:0,3:0}; o.hard.forEach(q=>d[n(q.grid.topLeft)]++);
console.log("rozkład N hard:",JSON.stringify(d));
console.log("z obrotem:",o.hard.filter(q=>(Array.isArray(q.grid.topLeft)?q.grid.topLeft:[q.grid.topLeft]).some(f=>f.rot!==undefined)).length);
console.log("przykład T3:",JSON.stringify(o.hard[30]));
'
```
Expected: `rozkład N hard: {"1":15,"2":15,"3":10}`, `z obrotem: 7`, oraz obiekt T3 z polami `rot`.

---

## Task 3: Integracja do questions-unified.js (integrator bez zmian)

**Files:**
- Modify: `web/questions-unified.js` (blok `type8` w `QUESTIONS_HARD`; easy pozostaje bajt-w-bajt identyczne dzięki pass-through)

- [ ] **Step 1: Backup i integracja**

Run:
```bash
cp web/questions-unified.js /tmp/qu-v2.bak.js
node tools/integrate-type8.js web/questions-unified.js
```
Expected: `Podmieniono type8: easy=40, hard=40 w web/questions-unified.js (backup: web/questions-unified.js.bak)`

- [ ] **Step 2: Easy bajt-identyczne, składnia OK**

Run:
```bash
node --check web/questions-unified.js && echo "syntax OK"
node -e '
const fs=require("fs");
const a=fs.readFileSync("/tmp/qu-v2.bak.js","utf8"), b=fs.readFileSync("web/questions-unified.js","utf8");
const cut=s=>s.slice(0, s.indexOf("const QUESTIONS_HARD"));
console.log("EASY (cały obiekt) identyczny:", cut(a)===cut(b));
'
rm -f web/questions-unified.js.bak
```
Expected: `syntax OK` oraz `EASY (cały obiekt) identyczny: true`.

- [ ] **Step 3: Checkpoint — walidacja realnego pliku**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 (hard N: 15/15/10, obrót: 7)`
(NIE commitujemy.)

---

## Task 4: Renderer — rozmiar, obrót, komórki wielofigurowe

**Files:**
- Modify: `web/index.html` (`renderFigure`, `renderType8`, renderery opcji typu 8)

- [ ] **Step 1: `renderFigure(spec, size)` — rozmiar + obrót**

W `web/index.html` znajdź sygnaturę i dwie ostatnie linie funkcji `renderFigure`. Zmień nagłówek:
```js
  function renderFigure(spec) {
```
na:
```js
  function renderFigure(spec, size) {
    size = size || 64;
```
oraz końcowy `return` (obecnie):
```js
    return '<svg viewBox="0 0 80 80" width="64" height="64" xmlns="http://www.w3.org/2000/svg">' +
      shapeHtml + interior +
    '</svg>';
```
na (skalowanie + obrót przez `<g transform>`):
```js
    var inner = shapeHtml + interior;
    var rot = spec.rot || 0;
    if (rot) inner = '<g transform="rotate(' + rot + ',40,40)">' + inner + '</g>';
    return '<svg viewBox="0 0 80 80" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
      inner +
    '</svg>';
```

- [ ] **Step 2: `renderType8(q)` — komórki wielofigurowe**

Zastąp całą funkcję `renderType8`:
```js
  function renderType8(q) {
    const g = q.grid;
    let tlHtml = renderFigure(g.topLeft);
    let blHtml = '';
    if (Array.isArray(g.bottomLeft)) {
      g.bottomLeft.forEach(function(spec) { blHtml += renderFigure(spec); });
    } else {
      blHtml = renderFigure(g.bottomLeft);
    }
    let trHtml = renderFigure(g.topRight);

    return '<div class="figure-grid">' +
      '<div class="figure-cell">' + tlHtml + '</div>' +
      '<div class="figure-cell">' + trHtml + '</div>' +
      '<div class="figure-cell">' + blHtml + '</div>' +
      '<div class="figure-cell bottom-right">?</div>' +
    '</div>';
  }
```
na:
```js
  function figureCount(c) { return Array.isArray(c) ? c.length : 1; }
  function sizeForCount(n) { return n >= 3 ? 42 : (n === 2 ? 50 : 64); }
  function renderCell(c, size) {
    var arr = Array.isArray(c) ? c : [c];
    return arr.map(function(spec) { return renderFigure(spec, size); }).join('');
  }
  function renderType8(q) {
    const g = q.grid;
    const n = Math.max(figureCount(g.topLeft), figureCount(g.topRight), figureCount(g.bottomLeft));
    const size = sizeForCount(n);
    return '<div class="figure-grid">' +
      '<div class="figure-cell">' + renderCell(g.topLeft, size) + '</div>' +
      '<div class="figure-cell">' + renderCell(g.topRight, size) + '</div>' +
      '<div class="figure-cell">' + renderCell(g.bottomLeft, size) + '</div>' +
      '<div class="figure-cell bottom-right">?</div>' +
    '</div>';
  }
```

- [ ] **Step 3: Renderer opcji statyczny (`renderOptionsStatic`)**

W `renderOptionsStatic`, w gałęzi typu 8, jest pętla `specs.forEach(function(spec) { html += renderFigure(spec); });`. Zamień ją na (rozmiar wg liczby figur w opcji):
```js
        var osz = specs.length >= 3 ? 34 : (specs.length === 2 ? 40 : 52);
        specs.forEach(function(spec) {
          html += renderFigure(spec, osz);
        });
```

- [ ] **Step 4: Renderer opcji interaktywny**

Znajdź drugi renderer opcji typu 8 (szukaj `figure-option` poza `renderOptionsStatic`). W jego pętli po `specs` (figurach jednej opcji) zastosuj tę samą zmianę: przed pętlą `var osz = specs.length >= 3 ? 34 : (specs.length === 2 ? 40 : 52);` i wywołuj `renderFigure(spec, osz)`. (Przeczytaj funkcję, by zachować jej zmienne; zmiana dotyczy wyłącznie przekazania rozmiaru do `renderFigure`.)

- [ ] **Step 5: Dopuść zawijanie wielu figur w opcji (CSS)**

Znajdź regułę `.figure-option {` i upewnij się, że pozwala na wiele figur — dodaj `flex-wrap: wrap;` jeśli jej nie ma:
```css
    .figure-option { ... existing ... flex-wrap: wrap; }
```
(Jeśli reguła już ma `flex-wrap`, pomiń.)

- [ ] **Step 6: Smoke-test renderera (wyciąg `renderFigure` + `renderType8` z pliku)**

Run:
```bash
grep -q "renderFigure(spec, size)" web/index.html && echo "renderFigure sygnatura OK"
grep -q "transform=\"rotate(" web/index.html && echo "obrót OK"
grep -q "function renderCell" web/index.html && echo "renderCell OK"
```
Expected: trzy linie `... OK`.

---

## Task 5: Bump cache service workera

**Files:**
- Modify: `web/sw.js:1`

- [ ] **Step 1: v4 → v5**

W `web/sw.js` zamień `const CACHE = 'ksap-v4';` na `const CACHE = 'ksap-v5';`.

- [ ] **Step 2: Sprawdź**

Run: `grep -n "const CACHE" web/sw.js`
Expected: linia z `'ksap-v5'`.

---

## Task 6: Walidacja końcowa + podgląd wariantu 2 z realnych danych

**Files:**
- Create: `bug-reports/2026-06-03-typ8-figury/podglad-wariant2.html`

- [ ] **Step 1: Pełna walidacja danych**

Run: `node tools/validate-type8.js web/questions-unified.js`
Expected: `✅ WALIDACJA OK — 80 pytań typu 8 (hard N: 15/15/10, obrót: 7)`

- [ ] **Step 2: Wygeneruj podgląd z REALNYCH danych (po jednym pytaniu z T1/T2/T3+obrót)**

Utwórz `/tmp/gen-v2-preview.js`:
```js
const fs=require('fs'),vm=require('vm');
let code=fs.readFileSync('web/questions-unified.js','utf8');
code+='\n;globalThis.__H=QUESTIONS_HARD;';
const s={};s.globalThis=s;vm.createContext(s);vm.runInContext(code,s);
const H=s.__H.type8, n=c=>Array.isArray(c)?c.length:1;
const t1=H.find(q=>n(q.grid.topLeft)===1);
const t2=H.find(q=>n(q.grid.topLeft)===2);
const t3rot=H.find(q=>(Array.isArray(q.grid.topLeft)?q.grid.topLeft:[q.grid.topLeft]).some(f=>f.rot!==undefined));
const t3plain=H.find(q=>n(q.grid.topLeft)===3 && !(Array.isArray(q.grid.topLeft)?q.grid.topLeft:[q.grid.topLeft]).some(f=>f.rot!==undefined));
const sel=[t1,t2,t3plain,t3rot].filter(Boolean);
const data=JSON.stringify(sel);
const html='<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Podgląd wariant 2</title>'+
'<style>body{font-family:-apple-system,sans-serif;max-width:760px;margin:0 auto;padding:24px;line-height:1.5}.card{border:1px solid #ddd;border-radius:12px;padding:18px;margin:16px 0;background:#fafafa}.meta{font-size:12px;color:#888;font-weight:600;text-transform:uppercase}.figure-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:360px;margin-top:8px}.figure-cell{border:2px solid #bbb;border-radius:8px;min-height:86px;display:flex;align-items:center;justify-content:center;gap:5px;background:#fff;padding:5px;flex-wrap:wrap}.bottom-right{font-size:28px;color:#c0392b;font-weight:700}.opts{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.opt{border:2px solid #bbb;border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:3px;background:#fff;flex-wrap:wrap}.opt.correct{border-color:#2e9d52;background:#eefaf0}.lbl{font-weight:600;color:#555;margin-left:3px}.exp{font-size:13px;background:#fff;border-left:3px solid #2e9d52;padding:8px 12px;margin-top:12px;border-radius:4px}</style></head><body>'+
'<h1>Podgląd wariant 2 — realne dane</h1><div id="root"></div><script>var Q='+data+';\n'+
'function renderFigure(spec,size){size=size||56;var stroke="#333",sw="2.5",interior="",shapeFill="white";if(spec.fill==="solid")shapeFill="#333";var s="";if(spec.shape==="square"){s=\'<rect x="12" y="12" width="56" height="56" fill="\'+shapeFill+\'" stroke="\'+stroke+\'" stroke-width="\'+sw+\'"/>\';}else if(spec.shape==="triangle"){s=\'<polygon points="40,10 70,68 10,68" fill="\'+shapeFill+\'" stroke="\'+stroke+\'" stroke-width="\'+sw+\'" stroke-linejoin="round"/>\';}else{s=\'<circle cx="40" cy="40" r="30" fill="\'+shapeFill+\'" stroke="\'+stroke+\'" stroke-width="\'+sw+\'"/>\';}if(spec.fill==="x"){if(spec.shape==="square"){interior=\'<line x1="14" y1="14" x2="66" y2="66" stroke="#333" stroke-width="2"/><line x1="66" y1="14" x2="14" y2="66" stroke="#333" stroke-width="2"/>\';}else if(spec.shape==="triangle"){interior=\'<line x1="30" y1="44" x2="50" y2="60" stroke="#333" stroke-width="2"/><line x1="50" y1="44" x2="30" y2="60" stroke="#333" stroke-width="2"/>\';}else{interior=\'<line x1="19" y1="19" x2="61" y2="61" stroke="#333" stroke-width="2"/><line x1="61" y1="19" x2="19" y2="61" stroke="#333" stroke-width="2"/>\';}}else if(spec.fill==="dot-center"){var cy=spec.shape==="triangle"?52:40;interior=\'<circle cx="40" cy="\'+cy+\'" r="8" fill="#333"/>\';}var inner=s+interior;var rot=spec.rot||0;if(rot)inner=\'<g transform="rotate(\'+rot+\',40,40)">\'+inner+\'</g>\';return \'<svg viewBox="0 0 80 80" width="\'+size+\'" height="\'+size+\'">\'+inner+\'</svg>\';}\n'+
'function nc(c){return Array.isArray(c)?c:[c];}function cell(c,sz){return nc(c).map(function(f){return renderFigure(f,sz);}).join("");}var L=["A","B","C","D","E"];\n'+
'document.getElementById("root").innerHTML=Q.map(function(q){var g=q.grid;var n=Math.max(nc(g.topLeft).length,nc(g.topRight).length,nc(g.bottomLeft).length);var sz=n>=3?42:(n===2?50:64);var grid=\'<div class="figure-grid"><div class="figure-cell">\'+cell(g.topLeft,sz)+\'</div><div class="figure-cell">\'+cell(g.topRight,sz)+\'</div><div class="figure-cell">\'+cell(g.bottomLeft,sz)+\'</div><div class="figure-cell bottom-right">?</div></div>\';var opts=\'<div class="opts">\'+q.options.map(function(o,i){return \'<div class="opt\'+(i===q.correct?" correct":"")+\'">\'+cell(o,Math.round(sz*0.78))+\'<span class="lbl">\'+L[i]+\')</span></div>\';}).join("")+\'</div>\';return \'<div class="card"><div class="meta">\'+q.id+\' · \'+q.level+\'</div>\'+grid+opts+\'<div class="exp">\'+q.explanation+\'</div></div>\';}).join("");\n'+
'<\/script></body></html>';
fs.writeFileSync(process.argv[2],html);
console.log('podgląd zapisany:',process.argv[2]);
```
Run:
```bash
node /tmp/gen-v2-preview.js bug-reports/2026-06-03-typ8-figury/podglad-wariant2.html && rm /tmp/gen-v2-preview.js
open bug-reports/2026-06-03-typ8-figury/podglad-wariant2.html
```
Expected: plik powstaje; w przeglądarce widać T1/T2/T3 z poprawną odpowiedzią na zielono i objaśnieniami; trójkąty/romby z obrotem renderują się poprawnie.

- [ ] **Step 3: Sprzątanie artefaktu**

Run: `rm -f tools/generated-type8.json`
Expected: usunięty plik pośredni.

---

## Task 7: Sprzątanie dokumentacji — pokaż od razu wariant 2

**Files:**
- Modify: `bug-reports/2026-06-03-typ8-figury/2026-06-03-h_t8_037.md`
- Modify: `bug-reports/2026-06-03-typ8-figury/README.md`
- Modify: `bug-reports/README.md`
- Modify: `BACKLOG_DONE.md`
- Modify: `bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-design.md` (usuń odwołanie „Kontynuacja")
- Delete: `2026-06-03-fix-type8-figure-questions-design.md`, `2026-06-03-fix-type8-figure-questions.md`, `podglad-naprawione-typ8.html` (w folderze sprawy)

- [ ] **Step 1: Przepisz raport `2026-06-03-h_t8_037.md`**

Zastąp całą treść pliku tak, by prezentował od razu wariant 2:
```markdown
# Zgłoszenie: pytanie `h_t8_037` (typ 8 — powiązania między figurami)

> **Data zgłoszenia:** 2026-06-03 · **Kanał:** mail · **Status:** ✅ Naprawione (2026-06-03)
> **Spec:** [2026-06-03-typ8-wariant2-design.md](2026-06-03-typ8-wariant2-design.md) · **Plan:** [2026-06-03-typ8-wariant2-plan.md](2026-06-03-typ8-wariant2-plan.md)
> **Podglądy:** [błąd przed naprawą](podglad-bledu-h_t8_037.html) · [wariant 2 (realne dane)](podglad-wariant2.html) · [mockup](wariant2-mockup.html)

## Oryginalne zgłoszenie

> Zgłoszenie błędu – pytanie #h_t8_037
> „Taka zależność można wysnuć dopiero przy trzecim oknie."

## Analiza — dwa defekty

1. **Struktura niejednorodna:** górny wiersz pojedyncze figury, dolny wiersz pary/trójki — reguły nie dało się wydedukować przed trzecim oknem. Naruszało [`docs/specyfikacja_pytan.md`](../../docs/specyfikacja_pytan.md).
2. **Renderer:** `shape: "triangle"` renderował się jako koło (nieodróżnialny).

## Rozwiązanie

Macierze 2×2 o **jednorodnych komórkach** (ta sama liczba figur N we wszystkich polach), gdzie **każda pozycja to niezależna podmacierz** — odpowiedź wyznaczona jednoznacznie z reguły wiersza × kolumny. Hard z wewnętrznym gradientem trudności:

- **T1 (15 pytań):** 1 figura — kształt + wypełnienie, zamiana orientacji.
- **T2 (15):** 2 niezależne figury, każda z własną regułą.
- **T3 (10):** 3 figury; w 7 z nich reguła **obrotu** (trójkąt 0/90/180/270°, kwadrat↔romb 45°; tylko trójkąt/kwadrat, by obrót był widoczny).

Bank easy bez zmian. Renderer `renderFigure` rysuje trójkąt oraz obsługuje obrót i skalowanie; `renderType8` renderuje komórki wielofigurowe. Generator/walidator (`tools/`) tworzą i weryfikują 80 pytań (80/80 OK). Bump cache `ksap-v5`.

### `h_t8_037` po naprawie

Pytanie należy do gradientu hard (macierz z jednoznaczną regułą wiersz × kolumna), w pełni rozwiązywalne bez „trzeciego okna".
```

- [ ] **Step 2: Przepisz `README.md` sprawy**

Zastąp treść `bug-reports/2026-06-03-typ8-figury/README.md`:
```markdown
# Sprawa: pytania typu 8 (figury) — zgłoszenie `h_t8_037`

> **Data:** 2026-06-03 · **Status:** ✅ Naprawione

Folder agreguje wszystkie artefakty tematu.

## Zgłoszenie

Mail: pytanie `#h_t8_037` — „Taka zależność można wysnuć dopiero przy trzecim oknie." Dwa defekty: struktura (single→para/trójka) i trójkąt renderowany jako koło.

## Rozwiązanie

Macierze 2×2 o jednorodnych komórkach wielofigurowych, każda pozycja = niezależna podmacierz; hard z gradientem T1/T2/T3 i regułą obrotu w T3. Szczegóły w specu i planie.

## Artefakty

| Plik | Co to |
|---|---|
| [2026-06-03-h_t8_037.md](2026-06-03-h_t8_037.md) | Zgłoszenie + analiza + rozwiązanie |
| [2026-06-03-typ8-wariant2-design.md](2026-06-03-typ8-wariant2-design.md) | Spec |
| [2026-06-03-typ8-wariant2-plan.md](2026-06-03-typ8-wariant2-plan.md) | Plan implementacji |
| [podglad-bledu-h_t8_037.html](podglad-bledu-h_t8_037.html) | Podgląd błędu (buggy vs naprawiony renderer) |
| [podglad-wariant2.html](podglad-wariant2.html) | Podgląd rozwiązania z realnych danych |
| [wariant2-mockup.html](wariant2-mockup.html) | Mockup gradientu T1/T2/T3 |

Narzędzia: `tools/generate-type8.js`, `tools/validate-type8.js`, `tools/integrate-type8.js` (w roocie repo).
```

- [ ] **Step 3: Zaktualizuj indeks `bug-reports/README.md`**

W tabeli „Spis" zamień komórkę statusu sprawy z `✅ Naprawione (wariant 1) · 🔧 wariant 2 w toku` na `✅ Naprawione`.

- [ ] **Step 4: Zaktualizuj wpis w `BACKLOG_DONE.md`**

Zastąp sekcję „## Naprawa pytań typu 8 (zgłoszenie `h_t8_037`)" (jej treść po nagłówku z datą) treścią opisującą wariant 2:
```markdown
> **Ukończono:** 2026-06-03 · [Spec](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-design.md) · [Plan](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-plan.md) · [Zgłoszenie](bug-reports/2026-06-03-typ8-figury/2026-06-03-h_t8_037.md)

Zgłoszenie mailem („zależność dopiero przy trzecim oknie") ujawniło defekt w pytaniach typu 8 (niejednorodne komórki — reguły nie dało się wydedukować przed trzecim oknem) oraz trójkąt renderowany jako koło. Naprawione.

- Pytania typu 8 przebudowane na macierze 2×2 o **jednorodnych komórkach** (każda pozycja = niezależna podmacierz → jednoznaczna rozwiązywalność). Bank easy: 1 figura. Hard z gradientem: **T1** (1 figura, 15), **T2** (2 figury, 15), **T3** (3 figury, 10; w 7 reguła obrotu trójkąt/kwadrat).
- Renderer (`web/index.html`): `renderFigure` rysuje trójkąt, obsługuje obrót i skalowanie; `renderType8` renderuje komórki wielofigurowe.
- Generator/walidator/integrator w `tools/` (deterministyczne; walidacja 80/80). Bump cache `ksap-v4` → `ksap-v5`.
- Zachowane: ID, poziomy, polecenia, liczba opcji (20×4 + 20×5 na poziom).
```

- [ ] **Step 5: Usuń odwołanie „Kontynuacja" ze specu**

W `2026-06-03-typ8-wariant2-design.md` usuń linię zaczynającą się od `**Kontynuacja:**` (po usunięciu plików v1 link byłby martwy).

- [ ] **Step 6: Usuń artefakty wariantu 1**

Run:
```bash
cd bug-reports/2026-06-03-typ8-figury
rm -f 2026-06-03-fix-type8-figure-questions-design.md 2026-06-03-fix-type8-figure-questions.md podglad-naprawione-typ8.html
cd - >/dev/null
```

- [ ] **Step 7: Weryfikacja linków**

Run:
```bash
node -e '
const fs=require("fs"),path=require("path");
function check(f){const dir=path.dirname(f),txt=fs.readFileSync(f,"utf8"),re=/\]\(([^)]+\.(?:md|html))\)/g;let m,bad=0;while((m=re.exec(txt))){const t=m[1].split("#")[0];if(/^https?:/.test(t))continue;if(!fs.existsSync(path.join(dir,t))){console.log("MARTWY:",f,"->",t);bad++;}}return bad;}
let bad=0;["bug-reports/README.md","BACKLOG_DONE.md","bug-reports/2026-06-03-typ8-figury/README.md","bug-reports/2026-06-03-typ8-figury/2026-06-03-h_t8_037.md","bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-design.md"].forEach(f=>bad+=check(f));
console.log(bad===0?"✅ linki OK":"❌ "+bad+" martwych");
'
```
Expected: `✅ linki OK`

- [ ] **Step 8: Końcowy status (bez commita)**

Run: `git status --short && node tools/validate-type8.js web/questions-unified.js`
Expected: lista zmian; `✅ WALIDACJA OK …`. **STOP — nie commitować.**

---

## Notatki

- Determinizm: bez `Math.random`/`Date` — ponowne uruchomienie daje identyczny wynik.
- Easy pozostaje bajt-identyczne (pass-through w generatorze).
- Walidator jest źródłem prawdy o poprawności; przy każdym błędzie iterujemy generator, nie obchodzimy walidatora.
