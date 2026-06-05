// tools/relacje-solver.js
// Czysty model-checker dla zadań „wnioskowanie z relacji porządkujących".
// Wniosek „wynika z przesłanek" ⟺ jest prawdziwy w KAŻDYM modelu spełniającym przesłanki.
// Domena {1,2,3} wystarcza, by zrealizować wszystkie typy porządku (z remisami) dla ≤3 zmiennych.
'use strict';

const OPS = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '≥': (a, b) => a >= b,
  '≤': (a, b) => a <= b,
  '=': (a, b) => a === b,
  '≠': (a, b) => a !== b,
};

const DOMAIN = [1, 2, 3];

// Wszystkie przypisania (kartezjański iloczyn DOMAIN^vars), porządek stabilny.
function models(vars) {
  let acc = [{}];
  for (const v of vars) {
    const next = [];
    for (const m of acc) for (const d of DOMAIN) next.push(Object.assign({}, m, { [v]: d }));
    acc = next;
  }
  return acc;
}

function holds(model, r) { return OPS[r.op](model[r.l], model[r.r]); }

function satisfies(model, premises) {
  for (const p of premises) if (!holds(model, p)) return false;
  return true;
}

// Zbiera nazwy zmiennych z przesłanek (i opcjonalnie dodatkowej relacji), bez duplikatów, posortowane.
// Zakładamy nazwy zmiennych jako krótkie ciągi ASCII (A, B, C…).
function varsOf(premises, extra) {
  const set = new Set();
  for (const p of premises) { set.add(p.l); set.add(p.r); }
  if (extra) { set.add(extra.l); set.add(extra.r); }
  return Array.from(set).sort();
}

// Puste przesłanki → sprawdzenie tautologii (wniosek musi zachodzić we wszystkich modelach swoich zmiennych).
// entails: wniosek prawdziwy w KAŻDYM modelu spełniającym przesłanki.
// Wymaga, by przesłanki były spełnialne (inaczej wnioskowanie puste → zwraca false).
function entails(premises, conclusion) {
  const vars = varsOf(premises, conclusion);
  let anySat = false;
  for (const m of models(vars)) {
    if (!satisfies(m, premises)) continue;
    anySat = true;
    if (!holds(m, conclusion)) return false;
  }
  return anySat;
}

// Pierwszy model spełniający przesłanki, w którym wniosek NIE zachodzi (albo null).
function counterexample(premises, conclusion) {
  const vars = varsOf(premises, conclusion);
  for (const m of models(vars)) {
    if (satisfies(m, premises) && !holds(m, conclusion)) return m;
  }
  return null;
}

module.exports = { OPS, DOMAIN, models, holds, satisfies, varsOf, entails, counterexample };
