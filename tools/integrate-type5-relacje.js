// tools/integrate-type5-relacje.js
// Migruje istniejące Typ 5 (variant: "sylogizm") i dopisuje bank "relacje".
// Idempotentne: ponowne uruchomienie nie duplikuje (sprawdza obecność relacji po ID).
// Użycie: node tools/integrate-type5-relacje.js [web/questions-unified.js]
'use strict';
const fs = require('fs');
const vm = require('vm');
const { generateAll } = require('./generate-type5-relacje');

const PATH = process.argv[2] || 'web/questions-unified.js';

function loadBanks(code) {
  let c = code + '\n;globalThis.__E=QUESTIONS_EASY;globalThis.__H=QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(c, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}

// Zakres tablicy „type5: [ ... ]" liczony od podanego indeksu (pomija nawiasy w stringach).
function arrayRange(src, fromIndex) {
  const start = src.indexOf('type5: [', fromIndex);
  if (start < 0) throw new Error('Nie znaleziono "type5: [" od ' + fromIndex);
  const open = src.indexOf('[', start);
  let depth = 0, inStr = false, quote = '', esc = false, i = open;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === quote) inStr = false; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; quote = ch; continue; }
    if (ch === '[') depth++; else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) throw new Error('Niezbalansowane nawiasy type5 od ' + open);
  return { open, close: i };
}

function serialize(arr) {
  return '[\n' + arr.map((q) => '    ' + JSON.stringify(q)).join(',\n') + '\n  ]';
}

function migrateVariant(arr) {
  return arr.map((q) => q.variant ? q : Object.assign({ variant: 'sylogizm' }, q));
}

function main() {
  const src = fs.readFileSync(PATH, 'utf8');
  const { easy, hard } = loadBanks(src);
  const gen = generateAll();

  const alreadyDone = (easy.type5 || []).some((q) => q.variant === 'relacje');
  if (alreadyDone) { console.log('Relacje już zintegrowane — pomijam.'); return; }

  const newEasy = migrateVariant(easy.type5).concat(gen.easy);
  const newHard = migrateVariant(hard.type5).concat(gen.hard);

  const hardStart = src.indexOf('const QUESTIONS_HARD');
  if (hardStart < 0) throw new Error('Brak QUESTIONS_HARD');
  const easyR = arrayRange(src, 0);
  if (easyR.open > hardStart) throw new Error('EASY.type5 nie przed QUESTIONS_HARD');
  const hardR = arrayRange(src, hardStart);

  let out = src;
  out = out.slice(0, hardR.open) + serialize(newHard) + out.slice(hardR.close + 1);
  out = out.slice(0, easyR.open) + serialize(newEasy) + out.slice(easyR.close + 1);

  const after = loadBanks(out);
  const ec = after.easy.type5.length, hc = after.hard.type5.length;
  if (ec !== newEasy.length || hc !== newHard.length) throw new Error('Po podmianie liczby się nie zgadzają: ' + ec + '/' + hc);
  if (!after.easy.type5.every((q) => q.variant)) throw new Error('Są Typ 5 bez variant po migracji');

  fs.writeFileSync(PATH + '.bak', src);
  fs.writeFileSync(PATH, out);
  console.log('OK: type5 easy=' + ec + ' (relacje +' + gen.easy.length + '), hard=' + hc + ' (relacje +' + gen.hard.length + '). Backup: ' + PATH + '.bak');
}
main();
