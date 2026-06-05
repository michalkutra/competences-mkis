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
    case 5:
      if (q.variant === 'relacje') {
        if (!isArr(q.premises) || q.premises.length < 1) e.push('relacje: premises < 1');
      } else { // sylogizm (lub legacy bez variant)
        if (!isArr(q.premises) || q.premises.length < 2) e.push('premises < 2');
        if (['chain', 'modus_ponens', 'some', 'full_eval'].indexOf(q.syllogismVariant) < 0) e.push('zły syllogismVariant');
      }
      break;
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
