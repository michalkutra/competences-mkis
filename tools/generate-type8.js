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

function plainRule(seed) {
  const shapeAxis = (Math.floor(seed / 12) % 2) ? 'col' : 'row';
  return {
    startShape: SHAPES[seed % 3],
    startFill:  FILLS[Math.floor(seed / 3) % 4],
    shapeAxis, fillAxis: opp(shapeAxis),
    shapeStep: 1 + (Math.floor(seed / 2) % 2),
    fillStep:  1 + (Math.floor(seed / 5) % 3),
  };
}
function rotRule(seed) {
  const shape = (seed % 2) ? 'square' : 'triangle';
  const fillAxis = (Math.floor(seed / 4) % 2) ? 'row' : 'col';
  return {
    startShape: shape, startRot: 0,
    shapeAxis: 'row', shapeStep: 0,
    fillAxis, fillStep: 1 + (Math.floor(seed / 3) % 3),
    rotAxis: opp(fillAxis),
    rotStep: shape === 'square' ? 1 : (1 + (seed % 2)),
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
  // szerszy fallback: zmiana kształtu pozycji 0 (gdy fill nie wystarczył)
  for (let si = 1; si < SHAPES.length && distract.length < optCount - 1; si++) {
    const c = BR.map((f, idx) => idx === 0 ? Object.assign({}, f, { shape: SHAPES[(SHAPES.indexOf(f.shape) + si) % 3] }) : f);
    const k = cellKey(c); if (!used.has(k)) { used.add(k); distract.push(c); }
  }
  if (distract.length < optCount - 1) throw new Error(`za mało dystraktorów (${distract.length}/${optCount - 1}) dla BR ${cellKey(BR)}`);
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

function require_norm(c){ return Array.isArray(c) ? c : [c]; }
function sig(q){ return cellKey(require_norm(q.grid.topLeft)) + '#' + cellKey(require_norm(q.grid.topRight)) + '#' + cellKey(require_norm(q.grid.bottomLeft)); }

function generateAll(path) {
  const { easy, hard } = loadQuestions(path);
  const seen = new Set();
  const outHard = hard.type8.map((tmpl, h) => {
    let bump = 0, q = buildQuestion(tmpl, h, 0);
    while (seen.has(sig(q)) && bump < 50) { bump++; q = buildQuestion(tmpl, h, bump); }
    if (seen.has(sig(q))) throw new Error(`nie udało się uzyskać unikalnego układu dla ${tmpl.id} po 50 próbach`);
    seen.add(sig(q)); return q;
  });
  return { easy: easy.type8, hard: outHard };
}

module.exports = { generateAll };

if (require.main === module) {
  const out = generateAll(process.argv[2] || 'web/questions-unified.js');
  fs.writeFileSync('tools/generated-type8.json', JSON.stringify(out, null, 2));
  console.log(`Wygenerowano easy=${out.easy.length} (bez zmian), hard=${out.hard.length}`);
}
