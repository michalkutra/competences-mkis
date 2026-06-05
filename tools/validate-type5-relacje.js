// tools/validate-type5-relacje.js
// Niezależna weryfikacja pytań „relacje" (typeId 5, variant relacje) w banku:
// dla każdego pytania dokładnie jedna opcja jest entailed i jest nią q.correct.
// Użycie: node tools/validate-type5-relacje.js [web/questions-unified.js]
'use strict';
const fs = require('fs');
const vm = require('vm');
const S = require('./relacje-solver');
const { parsePremises, parseRelation } = require('./generate-type5-relacje');

function loadBanks(path) {
  let code = fs.readFileSync(path, 'utf8') + '\n;globalThis.__E=QUESTIONS_EASY;globalThis.__H=QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}

function checkBank(bank, label, errors) {
  const rel = (bank.type5 || []).filter((q) => q.variant === 'relacje');
  for (const q of rel) {
    let prem, flags;
    try { prem = parsePremises(q); flags = q.options.map((o) => S.entails(prem, parseRelation(o))); }
    catch (e) { errors.push(label + ' ' + q.id + ': nie sparsowano (' + e.message + ')'); continue; }
    const n = flags.filter(Boolean).length;
    if (n !== 1) errors.push(label + ' ' + q.id + ': ' + n + ' opcji entailed (oczekiwano 1)');
    else if (!flags[q.correct]) errors.push(label + ' ' + q.id + ': correct nie jest opcją entailed');
  }
  return rel.length;
}

function main() {
  const path = process.argv[2] || 'web/questions-unified.js';
  const { easy, hard } = loadBanks(path);
  const errors = [];
  const ne = checkBank(easy, 'EASY', errors);
  const nh = checkBank(hard, 'HARD', errors);
  if (errors.length) {
    console.error('❌ WALIDACJA RELACJI NIEUDANA — ' + errors.length + ' błędów:');
    errors.slice(0, 80).forEach((m) => console.error('  - ' + m));
    process.exit(1);
  }
  console.log('✅ RELACJE OK — easy=' + ne + ', hard=' + nh + ', każde z dokładnie 1 pewnym wnioskiem.');
}
main();
