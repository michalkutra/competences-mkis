// tools/test-generate-type5-relacje.js
const assert = require('assert');
const S = require('./relacje-solver');
const G = require('./generate-type5-relacje');

const q = G.buildOne({ vars: ['A', 'B', 'C'], ops: ['>', '<'], correctIdx: 0, level: 'easy', mode: 'single', seq: 7 });
assert.ok(q, 'pytanie powstało');
assert.strictEqual(q.typeId, 5, 'typeId=5');
assert.strictEqual(q.variant, 'relacje', 'variant=relacje');
assert.strictEqual(q.level, 'easy', 'level');
assert.ok(Array.isArray(q.premises) && q.premises.length >= 1, 'premises tablica');
assert.strictEqual(q.options.length, 5, '5 opcji');
assert.ok(q.correct >= 0 && q.correct < 5, 'correct w zakresie');
assert.ok(typeof q.explanation === 'string' && q.explanation.length > 0, 'explanation');

// Spójność z solverem: dokładnie jedna opcja (correct) jest entailed
const premises = G.parsePremises(q);
const entailedFlags = q.options.map((opt) => S.entails(premises, G.parseRelation(opt)));
assert.strictEqual(entailedFlags.filter(Boolean).length, 1, 'dokładnie jedna opcja entailed');
assert.strictEqual(entailedFlags[q.correct], true, 'entailed to właśnie correct');

// 'both' buildOne smoke: A≤B≤C daje wniosek dwuprzesłankowy
const qb = G.buildOne({ vars: ['A', 'B', 'C'], ops: ['≤', '≤'], correctIdx: 0, level: 'hard', mode: 'both', seq: 0 });
assert.ok(qb, 'A≤B≤C daje wniosek dwuprzesłankowy');
const qbPrem = G.parsePremises(qb);
const qbCorrect = G.parseRelation(qb.options[qb.correct]);
assert.strictEqual(S.entails(qbPrem, qbCorrect), true, 'both: wniosek wynika z obu przesłanek');
assert.strictEqual(S.entails([qbPrem[0]], qbCorrect), false, 'both: nie wynika z pierwszej przesłanki');
assert.strictEqual(S.entails([qbPrem[1]], qbCorrect), false, 'both: nie wynika z drugiej przesłanki');

const banks = G.generateAll();
assert.strictEqual(banks.easy.length, 70, 'easy = 70');
assert.strictEqual(banks.hard.length, 70, 'hard = 70');

const allIds = banks.easy.concat(banks.hard).map((q) => q.id);
assert.strictEqual(new Set(allIds).size, allIds.length, 'ID unikalne');
assert.ok(banks.easy.every((q, i) => q.id === 'e_t5_' + String(101 + i)), 'ID easy sekwencyjne od 101');
assert.ok(banks.hard.every((q, i) => q.id === 'h_t5_' + String(101 + i)), 'ID hard sekwencyjne od 101');

// brak duplikatów MIĘDZY bankami (ta sama treść pytania)
const fullSigs = banks.easy.concat(banks.hard).map((q) => q.premises.join('|') + '##' + q.options.join('|') + '##' + q.correct);
assert.strictEqual(new Set(fullSigs).size, 140, 'brak identycznych pytań między bankami');

// wyjaśnienie zawiera poprawną relację i 4 oznaczenia dystraktorów
for (const q of banks.easy.concat(banks.hard)) {
  assert.ok(q.explanation.includes(G.relStr(G.parseRelation(q.options[q.correct]))), 'wyjaśnienie wymienia poprawny wniosek: ' + q.id);
  assert.strictEqual((q.explanation.match(/niepewne/g) || []).length, 4, '4 opisy dystraktorów: ' + q.id);
}

for (const q of banks.easy.concat(banks.hard)) {
  const prem = G.parsePremises(q);
  const flags = q.options.map((o) => S.entails(prem, G.parseRelation(o)));
  assert.strictEqual(flags.filter(Boolean).length, 1, 'jedna entailed: ' + q.id);
  assert.strictEqual(flags[q.correct], true, 'correct entailed: ' + q.id);
}

const S2 = require('./relacje-solver');
for (const q of banks.hard) {
  const prem = G.parsePremises(q); const cc = G.parseRelation(q.options[q.correct]);
  assert.ok(prem.every((p) => !S2.entails([p], cc)), 'HARD wymaga obu przesłanek: ' + q.id);
}
for (const q of banks.easy) {
  const prem = G.parsePremises(q); const cc = G.parseRelation(q.options[q.correct]);
  assert.ok(prem.some((p) => S2.entails([p], cc)), 'EASY jednoprzesłankowe: ' + q.id);
}
// żaden łańcuch nie zawiera ≠ jako spójnika
for (const q of banks.easy.concat(banks.hard)) assert.ok(!q.premises.join(' ').includes('≠'), 'brak ≠ w łańcuchu: ' + q.id);

// ~20% pytań HARD ma wniosek z operatorem ≠ (podniesienie trudności)
const hardNeq = banks.hard.filter((q) => G.parseRelation(q.options[q.correct]).op === '≠').length;
assert.ok(hardNeq >= 10 && hardNeq <= 20, 'HARD: ~20% wniosków ≠, jest ' + hardNeq);

// mix formatu: ~50% pytań w formacie dwóch par (premises.length === 2)
const pairCount = banks.easy.concat(banks.hard).filter((q) => q.premises.length === 2).length;
assert.ok(pairCount >= 50 && pairCount <= 90, 'mix formatu ~50%: par=' + pairCount + '/140');

console.log('✅ Task 3+4 OK');
