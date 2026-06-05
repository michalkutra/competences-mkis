// tools/test-relacje-solver.js
'use strict';
const assert = require('assert');
const S = require('./relacje-solver');

// OPS: 6 operatorów relacyjnych
assert.strictEqual(S.OPS['>'](3, 2), true,  '> prawda');
assert.strictEqual(S.OPS['>'](2, 2), false, '> fałsz');
assert.strictEqual(S.OPS['≥'](2, 2), true,  '≥ równe');
assert.strictEqual(S.OPS['≤'](2, 3), true,  '≤');
assert.strictEqual(S.OPS['≠'](2, 3), true,  '≠');
assert.strictEqual(S.OPS['='](2, 2), true,  '=');

// models: wszystkie przypisania zmiennych do {1,2,3}
const m2 = S.models(['A', 'B']);
assert.strictEqual(m2.length, 9, '2 zmienne → 3^2 = 9 modeli');
assert.deepStrictEqual(m2[0], { A: 1, B: 1 }, 'pierwszy model');
assert.deepStrictEqual(m2[8], { A: 3, B: 3 }, 'ostatni model 2-zmienne');
const m3 = S.models(['A', 'B', 'C']);
assert.strictEqual(m3.length, 27, '3 zmienne → 3^3 = 27 modeli');

const rel = (l, op, r) => ({ l, op, r });

// varsOf: dedupuje i sortuje zmienne z przesłanek i dodatkowej relacji
assert.deepStrictEqual(S.varsOf([rel('A','>','B')], rel('B','<','C')), ['A','B','C'], 'varsOf sortuje i dedupuje');

// entails z pustymi przesłankami: tautologia
assert.strictEqual(S.entails([], rel('A', '=', 'A')), true,  'tautologia A=A');
assert.strictEqual(S.entails([], rel('A', '>', 'A')), false, 'puste: A>A nigdy');

// satisfies: model spełnia wszystkie przesłanki
assert.strictEqual(S.satisfies({ A: 3, B: 1 }, [rel('A', '>', 'B')]), true,  'satisfies T');
assert.strictEqual(S.satisfies({ A: 1, B: 3 }, [rel('A', '>', 'B')]), false, 'satisfies F');

// Zestaw 3 / zad. 1: A > B < C  → pewny wniosek to B ≤ A (i B < A), reszta niepewna
const p1 = [rel('A', '>', 'B'), rel('B', '<', 'C')];
assert.strictEqual(S.entails(p1, rel('B', '≤', 'A')), true,  'A>B<C ⊢ B≤A');
assert.strictEqual(S.entails(p1, rel('B', '<', 'A')), true,  'A>B<C ⊢ B<A');
assert.strictEqual(S.entails(p1, rel('A', '>', 'C')), false, 'A>B<C ⊬ A>C');
assert.strictEqual(S.entails(p1, rel('C', '>', 'A')), false, 'A>B<C ⊬ C>A');
assert.strictEqual(S.entails(p1, rel('A', '≠', 'C')), false, 'A>B<C ⊬ A≠C');

// Zestaw 3 / zad. 4: B ≥ C, C > A → pewny wniosek B > A (więc też A < B, A ≠ B)
const p4 = [rel('B', '≥', 'C'), rel('C', '>', 'A')];
assert.strictEqual(S.entails(p4, rel('B', '>', 'A')), true,  'B≥C,C>A ⊢ B>A');
assert.strictEqual(S.entails(p4, rel('A', '<', 'B')), true,  'B≥C,C>A ⊢ A<B');
assert.strictEqual(S.entails(p4, rel('B', '=', 'C')), false, 'B≥C,C>A ⊬ B=C');

// counterexample: dla niewynikającego wniosku zwraca model spełniający przesłanki, gdzie wniosek fałszywy
const ce = S.counterexample(p1, rel('A', '>', 'C'));
assert.ok(ce && S.satisfies(ce, p1) && !S.OPS['>'](ce.A, ce.C), 'counterexample A>C poprawny');
// dla wynikającego wniosku counterexample = null
assert.strictEqual(S.counterexample(p1, rel('B', '≤', 'A')), null, 'brak counterexample dla pewnego');

console.log('✅ Task 1+2 OK');
