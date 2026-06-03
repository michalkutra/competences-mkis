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

// Deterministyczna lista parametrów.
function paramSpace(level) {
  const out = [];
  const orientations = level === 'easy' ? ['row'] : ['row', 'col'];
  const shapeSteps = [1, 2];
  const fillSteps  = level === 'easy' ? [1, 2] : [2, 3, 1];
  for (const startShape of SHAPES)
    for (const startFill of FILLS)
      for (const shapeStep of shapeSteps)
        for (const fillStep of fillSteps)
          for (const shapeAxis of orientations)
            out.push({ startShape, startFill, shapeAxis, shapeStep, fillStep });
  return out;
}

function buildOptions(p, optCount, posSeed) {
  const TL = cellAt(0, 0, p), TR = cellAt(0, 1, p), BL = cellAt(1, 0, p), BR = cellAt(1, 1, p);
  const fillAxis = p.shapeAxis === 'row' ? 'col' : 'row';
  const key = (f) => f.shape + '/' + f.fill;
  const cands = [
    { shape: BR.shape, fill: TL.fill },
    { shape: TL.shape, fill: BR.fill },
    { shape: BR.shape, fill: FILLS[(FILLS.indexOf(BR.fill) + 2) % 4] },
    BL,
    TR,
    { shape: SHAPES[(SHAPES.indexOf(BR.shape) + 1) % 3], fill: BR.fill },
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
