const fs = require('fs');
const vm = require('vm');
const { generateAll } = require('./generate-type8');

const PATH = process.argv[2] || 'web/questions-unified.js';

// Znajduje zakres tekstu tablicy następującej po markerze (od '[' do parującego ']').
// Skaner pomija nawiasy wewnątrz literałów stringowych (z obsługą escape), żeby
// nawias w treści instruction/explanation nie rozjechał liczenia głębokości.
function arrayRange(src, fromIndex) {
  const marker = '\n  type8: [';
  const start = src.indexOf(marker, fromIndex);
  if (start < 0) throw new Error('Nie znaleziono "type8: [" od indeksu ' + fromIndex);
  const bracketOpen = src.indexOf('[', start);
  let depth = 0, i = bracketOpen;
  let inStr = false, quote = '', escaped = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) { inStr = false; }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; quote = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) throw new Error('Niezbalansowane nawiasy przy type8 od indeksu ' + bracketOpen);
  return { open: bracketOpen, close: i }; // [open..close] obejmuje '[' ... ']'
}

// Sanity-check: wczytaj wynikowy kod i potwierdź, że oba type8 mają po 40 pytań.
function assertWritable(code) {
  let c = code + '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(c, ctx);
  const e = ctx.__E.type8.length, h = ctx.__H.type8.length;
  if (e !== 40 || h !== 40) throw new Error(`Po podmianie type8: easy=${e}, hard=${h} (oczekiwano 40/40)`);
}

function serializeArray(arr) {
  const body = arr.map((q) => '    ' + JSON.stringify(q)).join(',\n');
  return '[\n' + body + '\n  ]';
}

function main() {
  const src = fs.readFileSync(PATH, 'utf8');
  const gen = generateAll(PATH);

  const hardObjStart = src.indexOf('const QUESTIONS_HARD');
  if (hardObjStart < 0) throw new Error('Brak QUESTIONS_HARD');

  const easyRange = arrayRange(src, 0);
  if (easyRange.open > hardObjStart) throw new Error('EASY.type8 nie przed QUESTIONS_HARD');
  const hardRange = arrayRange(src, hardObjStart);

  // podmiana od końca, by nie przesunąć indeksów
  let out = src;
  out = out.slice(0, hardRange.open) + serializeArray(gen.hard) + out.slice(hardRange.close + 1);
  out = out.slice(0, easyRange.open) + serializeArray(gen.easy) + out.slice(easyRange.close + 1);

  // walidacja PRZED nadpisaniem — nie psujemy źródła, jeśli wynik jest zły
  assertWritable(out);

  // backup oryginału obok pliku
  fs.writeFileSync(PATH + '.bak', src);
  fs.writeFileSync(PATH, out);
  console.log(`Podmieniono type8: easy=${gen.easy.length}, hard=${gen.hard.length} w ${PATH} (backup: ${PATH}.bak)`);
}

main();
