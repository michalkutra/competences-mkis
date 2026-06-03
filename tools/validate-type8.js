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
  TL.concat(TR, BL).concat(q.options.flatMap(norm)).forEach((f) => {
    if (!SHAPES.includes(f.shape)) errors.push(`${id}: nieznany kształt "${f.shape}"`);
    if (!FILLS.includes(f.fill))  errors.push(`${id}: nieznane wypełnienie "${f.fill}"`);
  });
  const expBR = [];
  for (let p = 0; p < N; p++) {
    const rec = reconstructPos(TL[p], TR[p], BL[p]);
    if (rec.error) { errors.push(`${id}: poz ${p}: ${rec.error}`); return; }
    if (rec._changes === 0) errors.push(`${id}: poz ${p}: nic się nie zmienia (zdegenerowane)`);
    expBR.push({ shape: rec.shape, fill: rec.fill, rot: rec.rot });
  }
  const full = (c) => { const a = norm(c); if (a.length !== N) return false; for (let p = 0; p < N; p++) if (!eqFig(a[p], expBR[p])) return false; return true; };
  const matches = q.options.map((o, i) => full(o) ? i : -1).filter((i) => i >= 0);
  if (matches.length !== 1) errors.push(`${id}: ${matches.length} opcji pasuje do reguły, oczekiwano 1`);
  else if (matches[0] !== q.correct) errors.push(`${id}: correct=${q.correct}, reguła wskazuje ${matches[0]}`);
  if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) errors.push(`${id}: correct poza zakresem`);
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
  e8.forEach((q) => { if (norm(q.grid.topLeft).length !== 1) errors.push(`${q.id}: easy musi mieć 1 figurę`); });
  const Ncount = { 1: 0, 2: 0, 3: 0 };
  h8.forEach((q) => { const n = norm(q.grid.topLeft).length; Ncount[n] = (Ncount[n] || 0) + 1; });
  if (Ncount[1] !== 15 || Ncount[2] !== 15 || Ncount[3] !== 10) errors.push(`HARD rozkład N = ${Ncount[1]}/${Ncount[2]}/${Ncount[3]} (oczekiwano 15/15/10)`);
  const rotQ = h8.filter((q) => norm(q.grid.topLeft).some((f) => f.rot !== undefined)).length;
  if (rotQ !== 7) errors.push(`HARD pytań z obrotem: ${rotQ} (oczekiwano 7)`);
  for (const [lvl, arr] of [['easy', e8], ['hard', h8]]) {
    const c4 = arr.filter((q) => q.options.length === 4).length;
    const c5 = arr.filter((q) => q.options.length === 5).length;
    if (c4 !== 20 || c5 !== 20) errors.push(`${lvl}: rozkład opcji 4/5 = ${c4}/${c5} (oczekiwano 20/20)`);
  }
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
