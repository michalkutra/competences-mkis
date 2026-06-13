// tools/test-build-web.js
const assert = require('assert');
const vm = require('vm');
const { buildSource } = require('./wiedza/build-web.js');

// 1) zwraca string definiujący global
const src = buildSource([{ id: 'w_pr_001', domain: 'pr', correct: 2 }]);
assert.ok(src.indexOf('window.QUESTIONS_WIEDZA') !== -1, 'definiuje global');

// 2) wynik jest wykonywalny i odtwarza dane
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(src, ctx);
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA.length, 1, 'jedno pytanie');
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA[0].domain, 'pr', 'zachowuje pola');
assert.strictEqual(ctx.window.QUESTIONS_WIEDZA[0].correct, 2, 'zachowuje correct=0..3');

// 3) odrzuca nie-tablicę
assert.throws(function () { buildSource(null); }, /tablic/, 'rzuca przy nie-tablicy');

console.log('✅ build-web OK');
