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

function loadFromJson(path) {
  const o = JSON.parse(fs.readFileSync(path, 'utf8'));
  return { easy: { type8: o.easy }, hard: { type8: o.hard } };
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
  const { easy, hard } = path.endsWith('.json') ? loadFromJson(path) : loadQuestions(path);
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
