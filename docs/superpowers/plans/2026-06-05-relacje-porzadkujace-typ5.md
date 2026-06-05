# Relacje porządkujące (Typ 5) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać do aplikacji nową rodzinę zadań „wnioskowanie z relacji porządkujących" (`A > B < C` → wybierz pewny wniosek) jako wariant Typ 5, z deterministycznie generowanym bankiem ~140 pytań i nowym blueprintem sesji (pokrycie + zmienność).

**Architecture:** Zadania relacyjne mają **obliczalną** poprawność — wniosek „wynika" ⟺ jest prawdziwy w każdym uporządkowaniu zmiennych spełniającym przesłanki (model-checking po małej domenie). Czysty solver (`tools/relacje-solver.js`) jest sercem; generator buduje na nim pytania, niezależny walidator je weryfikuje, integrator wstrzykuje do `web/questions-unified.js`. Logika doboru sesji zostaje wyekstrahowana do testowalnego modułu `web/session-blueprint.js`.

**Tech Stack:** Vanilla JS (Node dla narzędzi, `vm` do ładowania banku — jak istniejący pipeline Typ 8), `assert` do testów uruchamianych przez `node`. Brak frameworka testowego (zgodnie z konwencją repo: `tools/test-*.js`).

**Spec:** [docs/superpowers/specs/2026-06-05-relacje-porzadkujace-typ5-design.md](../specs/2026-06-05-relacje-porzadkujace-typ5-design.md)

---

## File Structure

| Plik | Odpowiedzialność | Akcja |
|---|---|---|
| `tools/relacje-solver.js` | Czysty model-checker: operatory, modele, `entails`, `counterexample`, `solve` | Create |
| `tools/test-relacje-solver.js` | Testy solvera na fixture'ach ze screenshotu | Create |
| `tools/generate-type5-relacje.js` | Enumeracja wzorców przesłanek → pytania (correct + 4 dystraktory + wyjaśnienie), dedup | Create |
| `tools/test-generate-type5-relacje.js` | Testy: ≥70/trudność, unikalność, każde pytanie spójne z solverem | Create |
| `tools/validate-type5-relacje.js` | Niezależna weryfikacja pytań relacyjnych w banku (drugi przebieg solvera) | Create |
| `tools/integrate-type5-relacje.js` | Migracja `variant:"sylogizm"` na istniejące Typ 5 + wstrzyknięcie relacji | Create |
| `web/session-blueprint.js` | `SESSION_PLAN` + czysta `composeSession(bank, lastSeen, rng)` (FIXED+RANDOM, świadoma wariantu) | Create |
| `tools/test-session-blueprint.js` | Testy doboru sesji (15 pytań, 3 syl.+2 rel.+po 1, dedup, anti-repeat, graceful) | Create |
| `web/index.html` | `buildSession` deleguje do `composeSession`; `<script>` na nowy moduł | Modify |
| `tools/validate-questions.js` | Walidacja Typ 5 świadoma pola `variant` | Modify |
| `web/questions-unified.js` | +`variant` na istniejących Typ 5; +bank relacyjny | Modify (przez integrator) |

---

## Task 1: Solver — operatory i modele

**Files:**
- Create: `tools/relacje-solver.js`
- Test: `tools/test-relacje-solver.js`

- [ ] **Step 1: Napisz failing test dla `OPS` i `models`**

```js
// tools/test-relacje-solver.js
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
const m3 = S.models(['A', 'B', 'C']);
assert.strictEqual(m3.length, 27, '3 zmienne → 3^3 = 27 modeli');

console.log('✅ Task 1 OK');
```

- [ ] **Step 2: Uruchom test — ma falić**

Run: `node tools/test-relacje-solver.js`
Expected: FAIL — `Cannot find module './relacje-solver'`

- [ ] **Step 3: Zaimplementuj `OPS` i `models`**

```js
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

module.exports = { OPS, DOMAIN, models };
```

- [ ] **Step 4: Uruchom test — ma przejść**

Run: `node tools/test-relacje-solver.js`
Expected: PASS — `✅ Task 1 OK`

- [ ] **Step 5: Commit**

```bash
git add tools/relacje-solver.js tools/test-relacje-solver.js
git commit -m "feat(relacje): solver — operatory i enumeracja modeli"
```

---

## Task 2: Solver — `satisfies`, `entails`, `counterexample`

**Files:**
- Modify: `tools/relacje-solver.js`
- Test: `tools/test-relacje-solver.js`

Relacja reprezentowana jako `{ l, op, r }` (l, r = nazwy zmiennych, op = klucz `OPS`). Przesłanki = tablica relacji.

- [ ] **Step 1: Dopisz failing test (fixture'y ze screenshotu „Zestaw 3")**

Dopisz przed `console.log('✅ Task 1 OK');` (zmień też napis na `Task 1+2`):

```js
const rel = (l, op, r) => ({ l, op, r });

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
```

- [ ] **Step 2: Uruchom — ma falić**

Run: `node tools/test-relacje-solver.js`
Expected: FAIL — `S.satisfies is not a function`

- [ ] **Step 3: Zaimplementuj `satisfies`, `entails`, `counterexample`, `varsOf`**

Dopisz do `tools/relacje-solver.js` przed `module.exports`:

```js
function holds(model, r) { return OPS[r.op](model[r.l], model[r.r]); }

function satisfies(model, premises) {
  for (const p of premises) if (!holds(model, p)) return false;
  return true;
}

// Zbiera nazwy zmiennych z przesłanek (i opcjonalnie dodatkowej relacji), bez duplikatów, posortowane.
function varsOf(premises, extra) {
  const set = new Set();
  for (const p of premises) { set.add(p.l); set.add(p.r); }
  if (extra) { set.add(extra.l); set.add(extra.r); }
  return Array.from(set).sort();
}

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
```

I zmień eksport:

```js
module.exports = { OPS, DOMAIN, models, holds, satisfies, varsOf, entails, counterexample };
```

- [ ] **Step 4: Uruchom — ma przejść**

Run: `node tools/test-relacje-solver.js`
Expected: PASS — `✅ Task 1+2 OK`

- [ ] **Step 5: Commit**

```bash
git add tools/relacje-solver.js tools/test-relacje-solver.js
git commit -m "feat(relacje): solver — satisfies/entails/counterexample z fixture'ami ze screenshotu"
```

---

## Task 3: Generator — budowa pojedynczego pytania

**Files:**
- Create: `tools/generate-type5-relacje.js`
- Test: `tools/test-generate-type5-relacje.js`

Pytanie powstaje z **łańcucha** `X op1 Y op2 Z` (3 zmienne, 2 przesłanki). Kandydaci na wniosek = wszystkie `(l, op, r)` dla różnych par z {A,B,C}, op ∈ `{>,<,≤,≥,≠}`, z pominięciem relacji identycznych z przesłanką. `correct` = wybrany entailed; 4 dystraktory = nie-entailed (z policzonym kontrprzykładem).

- [ ] **Step 1: Napisz failing test**

```js
// tools/test-generate-type5-relacje.js
const assert = require('assert');
const S = require('./relacje-solver');
const G = require('./generate-type5-relacje');

// buildOne: deterministyczne pytanie z opisu wzorca
const q = G.buildOne({ vars: ['A', 'B', 'C'], ops: ['>', '<'], correctIdx: 0, level: 'easy', seq: 7 });
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

console.log('✅ Task 3 OK');
```

- [ ] **Step 2: Uruchom — ma falić**

Run: `node tools/test-generate-type5-relacje.js`
Expected: FAIL — `Cannot find module './generate-type5-relacje'`

- [ ] **Step 3: Zaimplementuj generator (część: `buildOne` + parsery + serializacja relacji)**

```js
// tools/generate-type5-relacje.js
// Deterministyczny generator zadań „relacje porządkujące" (wariant Typ 5).
// Każde pytanie: łańcuch X op1 Y op2 Z (2 przesłanki, 3 zmienne) →
// jedyna poprawna opcja entailed + 4 dystraktory nie-entailed (z kontrprzykładem).
'use strict';
const fs = require('fs');
const S = require('./relacje-solver');

const CONCL_OPS = ['>', '<', '≥', '≤', '≠']; // operatory dopuszczone w opcjach (bez '=')
const INSTRUKCJA = 'W tym zadaniu przesłanki opisują relacje porządkujące między wielkościami. ' +
  'Załóż, że są prawdziwe i wskaż wniosek, który wynika z nich na pewno. Tylko jedna odpowiedź jest poprawna.';

const rel = (l, op, r) => ({ l, op, r });
function relStr(r) { return r.l + ' ' + r.op + ' ' + r.r; }
function parseRelation(s) { const m = s.trim().split(/\s+/); return rel(m[0], m[1], m[2]); }
// premises pytania trzymamy jako tablicę stringów; dla łańcucha „X op1 Y op2 Z" rozbijamy na 2 relacje.
function parsePremises(q) {
  const out = [];
  for (const line of q.premises) {
    const t = line.trim().split(/\s+/);
    for (let i = 0; i + 2 < t.length; i += 2) out.push(rel(t[i], t[i + 1], t[i + 2]));
  }
  return out;
}

// Wszystkie kandydujące wnioski dla danych zmiennych (uporządkowane pary × operatory),
// z pominięciem relacji dosłownie równych którejś przesłance.
function candidates(vars, premises) {
  const premSet = new Set(premises.map(relStr));
  const out = [];
  for (const l of vars) for (const r of vars) {
    if (l === r) continue;
    for (const op of CONCL_OPS) {
      const c = rel(l, op, r);
      if (premSet.has(relStr(c))) continue;
      out.push(c);
    }
  }
  return out;
}

// Buduje jedno pytanie. Zwraca null, jeśli wzorzec nie daje 1 pewnego + ≥4 niepewnych wniosków.
function buildOne(spec) {
  const [a, b, c] = spec.vars;
  const premises = [rel(a, spec.ops[0], b), rel(b, spec.ops[1], c)];
  // przesłanki muszą być spełnialne
  const vars = S.varsOf(premises);
  if (!S.models(vars).some((m) => S.satisfies(m, premises))) return null;

  const cands = candidates(vars, premises);
  const entailed = cands.filter((x) => S.entails(premises, x));
  const notEntailed = cands.filter((x) => !S.entails(premises, x));
  if (entailed.length < 1 || notEntailed.length < 4) return null;

  const correctRel = entailed[spec.correctIdx % entailed.length];
  // dystraktory: 4 niepewne, deterministycznie wybrane z przesunięciem wg seq (dla zmienności)
  const shift = spec.seq % notEntailed.length;
  const rotated = notEntailed.slice(shift).concat(notEntailed.slice(0, shift));
  const distract = rotated.slice(0, 4);

  // pozycja poprawnej zależna od seq
  const pos = spec.seq % 5;
  const optionsRel = distract.slice();
  optionsRel.splice(pos, 0, correctRel);
  const options = optionsRel.map(relStr);

  return {
    typeId: 5,
    variant: 'relacje',
    level: spec.level,
    instruction: INSTRUKCJA,
    premises: [relStr(premises[0]) + ' ' + premises[1].op + ' ' + premises[1].r], // łańcuch „X op1 Y op2 Z"
    options,
    correct: pos,
    explanation: buildExplanation(premises, correctRel, distract),
  };
}

function buildExplanation(premises, correctRel, distract) {
  const head = 'Z przesłanek (' + premises.map(relStr).join(', ') + ') w każdym przypadku zachodzi ' +
    relStr(correctRel) + '.';
  const why = distract.map((d) => {
    const ce = S.counterexample(premises, d);
    const vals = ce ? Object.keys(ce).sort().map((k) => k + '=' + ce[k]).join(', ') : '';
    return relStr(d) + ' — niepewne (np. ' + vals + ')';
  }).join('; ');
  return head + ' Pozostałe nie wynikają na pewno: ' + why + '.';
}

module.exports = { buildOne, buildExplanation, candidates, parsePremises, parseRelation, relStr, CONCL_OPS };
```

- [ ] **Step 4: Uruchom — ma przejść**

Run: `node tools/test-generate-type5-relacje.js`
Expected: PASS — `✅ Task 3 OK`

- [ ] **Step 5: Commit**

```bash
git add tools/generate-type5-relacje.js tools/test-generate-type5-relacje.js
git commit -m "feat(relacje): generator — buildOne (1 pewny + 4 dystraktory, spójne z solverem)"
```

---

## Task 4: Generator — enumeracja całego banku (70 easy + 70 hard)

**Files:**
- Modify: `tools/generate-type5-relacje.js`
- Test: `tools/test-generate-type5-relacje.js`

Easy: ops ze zbioru `['>', '<']` (relacje ostre). Hard: `['>', '<', '≥', '≤', '≠']` (mieszane). Enumerujemy permutacje 3 zmiennych × op1 × op2 × correctIdx; dedup po sygnaturze (łańcuch + poprawny wniosek); bierzemy pierwsze 70.

- [ ] **Step 1: Dopisz failing test**

Dopisz przed `console.log('✅ Task 3 OK');` (zmień napis na `Task 3+4`):

```js
const banks = G.generateAll();
assert.strictEqual(banks.easy.length, 70, 'easy = 70');
assert.strictEqual(banks.hard.length, 70, 'hard = 70');

// ID: e_t5_101.. / h_t5_101.. (po istniejących 1..100), 3 cyfry, unikalne
const allIds = banks.easy.concat(banks.hard).map((q) => q.id);
assert.strictEqual(new Set(allIds).size, allIds.length, 'ID unikalne');
assert.ok(banks.easy.every((q, i) => q.id === 'e_t5_' + String(101 + i)), 'ID easy sekwencyjne od 101');
assert.ok(banks.hard.every((q, i) => q.id === 'h_t5_' + String(101 + i)), 'ID hard sekwencyjne od 101');

// każde pytanie: dokładnie jedna opcja entailed = correct, unikalne treści łańcuchów+correct
for (const q of banks.easy.concat(banks.hard)) {
  const prem = G.parsePremises(q);
  const flags = q.options.map((o) => S.entails(prem, G.parseRelation(o)));
  assert.strictEqual(flags.filter(Boolean).length, 1, 'jedna entailed: ' + q.id);
  assert.strictEqual(flags[q.correct], true, 'correct entailed: ' + q.id);
}
```

- [ ] **Step 2: Uruchom — ma falić**

Run: `node tools/test-generate-type5-relacje.js`
Expected: FAIL — `G.generateAll is not a function`

- [ ] **Step 3: Zaimplementuj `generateAll`**

Dopisz do `tools/generate-type5-relacje.js` przed `module.exports` (i dodaj `generateAll` do eksportu):

```js
function permutations3(items) {
  const out = [];
  for (const a of items) for (const b of items) for (const c of items) {
    if (a !== b && b !== c && a !== c) out.push([a, b, c]);
  }
  return out;
}

function buildLevel(level, ops, prefix) {
  const perms = permutations3(['A', 'B', 'C']);
  const seen = new Set();
  const out = [];
  let seq = 0;
  // pętla po correctIdx zewnętrznie zwiększa różnorodność poprawnych wniosków
  for (let ci = 0; ci < 4 && out.length < 70; ci++) {
    for (const vars of perms) {
      for (const op1 of ops) for (const op2 of ops) {
        if (out.length >= 70) break;
        const q = buildOne({ vars, ops: [op1, op2], correctIdx: ci, level, seq });
        if (!q) continue;
        const sigStr = q.premises[0] + ' ⊢ ' + q.options[q.correct];
        if (seen.has(sigStr)) continue;
        seen.add(sigStr);
        seq++;
        q.id = prefix + '_t5_' + String(101 + out.length);
        out.push(q);
      }
    }
  }
  if (out.length < 70) throw new Error(level + ': uzyskano tylko ' + out.length + '/70 unikalnych pytań');
  return out;
}

function generateAll() {
  return {
    easy: buildLevel('easy', ['>', '<'], 'e'),
    hard: buildLevel('hard', ['>', '<', '≥', '≤', '≠'], 'h'),
  };
}
```

Zmień eksport na:

```js
module.exports = { buildOne, buildExplanation, candidates, parsePremises, parseRelation, relStr, CONCL_OPS, generateAll };
```

Dodaj na końcu pliku CLI (jak w `generate-type8.js`):

```js
if (require.main === module) {
  const out = generateAll();
  fs.writeFileSync('tools/generated-type5-relacje.json', JSON.stringify(out, null, 2));
  console.log('Wygenerowano relacje: easy=' + out.easy.length + ', hard=' + out.hard.length);
}
```

> **Uwaga wykonawcza:** jeśli easy (ops tylko `>`,`<`) nie osiągnie 70 unikalnych (przestrzeń `perm×op×op×correctIdx` jest skończona), rozszerz `buildLevel` o dodatkowy wymiar zmienności: drugą pętlę po pozycji poprawnej opcji (`pos`) przez parametr `spec.posOverride`. Najpierw uruchom i sprawdź realną liczbę — przy 6 perm × 2 × 2 × 4 correctIdx = 96 kombinacji przed dedupem zwykle wystarcza, ale część odpadnie. Jeśli zabraknie, **obniż cel easy do faktycznie osiągalnej liczby unikalnych pytań i zaktualizuj asercję + spec**, zamiast generować duplikaty.

- [ ] **Step 4: Uruchom — ma przejść**

Run: `node tools/test-generate-type5-relacje.js`
Expected: PASS — `✅ Task 3+4 OK`

- [ ] **Step 5: Wygeneruj artefakt i obejrzyj 3 pytania ręcznie**

Run: `node tools/generate-type5-relacje.js && node -e "const b=require('./tools/generated-type5-relacje.json'); [b.easy[0], b.easy[35], b.hard[0]].forEach(q=>console.log(JSON.stringify({premises:q.premises,options:q.options,correct:q.correct,exp:q.explanation},null,1)))"`
Expected: 3 sensowne pytania; poprawna opcja faktycznie wynika, wyjaśnienie ma kontrprzykłady.

- [ ] **Step 6: Commit**

```bash
git add tools/generate-type5-relacje.js tools/test-generate-type5-relacje.js tools/generated-type5-relacje.json
git commit -m "feat(relacje): generator — pełny bank 70 easy + 70 hard, dedup + sekwencyjne ID"
```

---

## Task 5: Niezależny walidator banku relacyjnego

**Files:**
- Create: `tools/validate-type5-relacje.js`

Niezależny od generatora (drugi przebieg solvera) — łapie błędne klucze po integracji.

- [ ] **Step 1: Zaimplementuj walidator**

```js
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
```

- [ ] **Step 2: Uruchom na świeżo wygenerowanym JSON (sanity przed integracją)**

Run: `node -e "const b=require('./tools/generated-type5-relacje.json');const fs=require('fs');fs.writeFileSync('/tmp/rel-bank.js','const QUESTIONS_EASY={type5:'+JSON.stringify(b.easy)+'};const QUESTIONS_HARD={type5:'+JSON.stringify(b.hard)+'};')" && node tools/validate-type5-relacje.js /tmp/rel-bank.js`
Expected: PASS — `✅ RELACJE OK — easy=70, hard=70, ...`

- [ ] **Step 3: Commit**

```bash
git add tools/validate-type5-relacje.js
git commit -m "feat(relacje): niezależny walidator banku (drugi przebieg solvera)"
```

---

## Task 6: Migracja + integracja banku do `questions-unified.js`

**Files:**
- Create: `tools/integrate-type5-relacje.js`
- Modify: `web/questions-unified.js` (przez skrypt)

Idempotentnie: (a) doda `variant:"sylogizm"` istniejącym Typ 5, którym go brak; (b) dopisze bank relacyjny na koniec tablic `type5` w EASY i HARD; backup `.bak` przed zapisem; walidacja wyniku przed nadpisaniem.

- [ ] **Step 1: Zaimplementuj integrator (na bazie wzorca `integrate-type8.js`)**

```js
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

  // istniejące + migracja wariantu + dopięcie relacji (relacje już mają variant z generatora)
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

  // walidacja wyniku PRZED nadpisaniem
  const after = loadBanks(out);
  const ec = after.easy.type5.length, hc = after.hard.type5.length;
  if (ec !== newEasy.length || hc !== newHard.length) throw new Error('Po podmianie liczby się nie zgadzają: ' + ec + '/' + hc);
  if (!after.easy.type5.every((q) => q.variant)) throw new Error('Są Typ 5 bez variant po migracji');

  fs.writeFileSync(PATH + '.bak', src);
  fs.writeFileSync(PATH, out);
  console.log('OK: type5 easy=' + ec + ' (relacje +' + gen.easy.length + '), hard=' + hc + ' (relacje +' + gen.hard.length + '). Backup: ' + PATH + '.bak');
}
main();
```

- [ ] **Step 2: Uruchom integrację**

Run: `node tools/integrate-type5-relacje.js`
Expected: `OK: type5 easy=170 (relacje +70), hard=170 (relacje +70). Backup: web/questions-unified.js.bak`

- [ ] **Step 3: Zweryfikuj idempotencję**

Run: `node tools/integrate-type5-relacje.js`
Expected: `Relacje już zintegrowane — pomijam.`

- [ ] **Step 4: Walidacja relacji na realnym banku**

Run: `node tools/validate-type5-relacje.js`
Expected: PASS — `✅ RELACJE OK — easy=70, hard=70, ...`

- [ ] **Step 5: Commit**

```bash
git add tools/integrate-type5-relacje.js web/questions-unified.js
git commit -m "feat(relacje): migracja variant=sylogizm + integracja 140 pytań relacyjnych"
```

---

## Task 7: Walidator strukturalny świadomy `variant`

**Files:**
- Modify: `tools/validate-questions.js:33` (gałąź `case 5`)

Obecna walidacja Typ 5 wymaga `premises.length ≥ 2` i `syllogismVariant`. Relacje mają 1 przesłankę (łańcuch w jednym stringu) i nie mają `syllogismVariant`.

- [ ] **Step 1: Podmień gałąź `case 5`**

Zamień w `tools/validate-questions.js`:

```js
    case 5: if (!isArr(q.premises) || q.premises.length < 2) e.push('premises < 2');
            if (['chain', 'modus_ponens', 'some', 'full_eval'].indexOf(q.syllogismVariant) < 0) e.push('zły syllogismVariant'); break;
```

na:

```js
    case 5:
      if (q.variant === 'relacje') {
        if (!isArr(q.premises) || q.premises.length < 1) e.push('relacje: premises < 1');
      } else { // sylogizm (lub legacy bez variant)
        if (!isArr(q.premises) || q.premises.length < 2) e.push('premises < 2');
        if (['chain', 'modus_ponens', 'some', 'full_eval'].indexOf(q.syllogismVariant) < 0) e.push('zły syllogismVariant');
      }
      break;
```

- [ ] **Step 2: Uruchom pełną walidację strukturalną**

Run: `node tools/validate-questions.js`
Expected: PASS — `✅ WALIDACJA OK — 1100 pytań, struktura poprawna.` (było 960 + 140 relacji)

- [ ] **Step 3: Commit**

```bash
git add tools/validate-questions.js
git commit -m "feat(relacje): walidator strukturalny świadomy variant sylogizm/relacje"
```

---

## Task 8: Moduł doboru sesji `web/session-blueprint.js`

**Files:**
- Create: `web/session-blueprint.js`
- Test: `tools/test-session-blueprint.js`

Czysta `composeSession(bank, lastSeen, rng)` — testowalna w Node, reużyta przez `index.html`. Kontrakt: 15 pytań = FIXED (3 syl. + 2 rel. + po 1 z Typ 1/2/3/4/6/7/8) + RANDOM (3 z całej reszty), least-recently-seen, bez duplikatów, z `rng` wstrzykiwanym dla determinizmu w testach.

- [ ] **Step 1: Napisz failing test**

```js
// tools/test-session-blueprint.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/session-blueprint.js', 'utf8'), ctx);
const { composeSession } = ctx;

// deterministyczny RNG (LCG) — bez Math.random
function makeRng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function mkBank() {
  const q = (type, variant, i) => { const o = { id: type + '_' + (variant || 'x') + '_' + i, typeId: type, level: 'easy' }; if (variant) o.variant = variant; return o; };
  const bank = {};
  for (let t = 1; t <= 8; t++) bank['type' + t] = [];
  for (let t of [1, 2, 3, 4, 6, 7, 8]) for (let i = 0; i < 20; i++) bank['type' + t].push(q(t, null, i));
  for (let i = 0; i < 20; i++) bank.type5.push(q(5, 'sylogizm', i));
  for (let i = 0; i < 20; i++) bank.type5.push(q(5, 'relacje', i));
  return bank;
}

// 1) Sesja ma 15 pytań, bez duplikatów
const s = composeSession(mkBank(), Object.create(null), makeRng(1));
assert.strictEqual(s.length, 15, '15 pytań');
assert.strictEqual(new Set(s.map((x) => x.id)).size, 15, 'bez duplikatów');

// 2) Gwarantowane: ≥3 sylogizmy, ≥2 relacje, ≥1 z każdego z pozostałych 7 typów
const syl = s.filter((x) => x.typeId === 5 && x.variant === 'sylogizm').length;
const rel = s.filter((x) => x.typeId === 5 && x.variant === 'relacje').length;
assert.ok(syl >= 3, 'co najmniej 3 sylogizmy, jest ' + syl);
assert.ok(rel >= 2, 'co najmniej 2 relacje, jest ' + rel);
for (const t of [1, 2, 3, 4, 6, 7, 8]) assert.ok(s.some((x) => x.typeId === t), 'jest typ ' + t);

// 3) Anti-repeat: pytania niewidziane mają pierwszeństwo nad widzianymi
const bank = mkBank();
const lastSeen = Object.create(null);
// oznacz wszystkie relacje oprócz dwóch jako widziane dawno; dwie świeże muszą wejść
bank.type5.filter((x) => x.variant === 'relacje').forEach((x, i) => { if (i >= 2) lastSeen[x.id] = '2020-01-01'; });
const s3 = composeSession(bank, lastSeen, makeRng(5));
const relIds = s3.filter((x) => x.variant === 'relacje').map((x) => x.id);
assert.ok(relIds.includes('5_relacje_0') && relIds.includes('5_relacje_1'), 'świeże relacje wybrane: ' + relIds);

// 4) Graceful: gdy pula relacji ma tylko 1 pytanie, sesja i tak ma 15 (dobiera z reszty/random)
const thin = mkBank();
thin.type5 = thin.type5.filter((x) => x.variant !== 'relacje').concat([{ id: '5_relacje_solo', typeId: 5, level: 'easy', variant: 'relacje' }]);
const s4 = composeSession(thin, Object.create(null), makeRng(9));
assert.strictEqual(s4.length, 15, 'graceful: nadal 15 przy 1 relacji');

console.log('✅ Task 8 OK');
```

- [ ] **Step 2: Uruchom — ma falić**

Run: `node tools/test-session-blueprint.js`
Expected: FAIL — `composeSession is not a function`

- [ ] **Step 3: Zaimplementuj `web/session-blueprint.js`**

```js
// web/session-blueprint.js
// Dobór pytań do sesji: filozofia „pokrycie + zmienność".
// FIXED (12): 3 sylogizmy + 2 relacje + po 1 z Typ 1/2/3/4/6/7/8.
// RANDOM (3): z całej reszty (dowolny typ), z dedup i least-recently-seen.
// composeSession jest czysta i testowalna; index.html ją wywołuje.
(function (root) {
  'use strict';

  // Stałe sloty. typeId + opcjonalny variant + ile sztuk.
  var FIXED = [
    { typeId: 5, variant: 'sylogizm', n: 3 },
    { typeId: 5, variant: 'relacje', n: 2 },
    { typeId: 1, n: 1 }, { typeId: 2, n: 1 }, { typeId: 3, n: 1 },
    { typeId: 4, n: 1 }, { typeId: 6, n: 1 }, { typeId: 7, n: 1 }, { typeId: 8, n: 1 },
  ];
  var RANDOM_COUNT = 3;
  var SESSION_SIZE = 15;

  function shuffleWith(arr, rng) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // least-recently-seen: niewidziane najpierw (losowo wśród równych), potem widziane najdawniej.
  function sortLRS(pool, lastSeen, rng) {
    shuffleWith(pool, rng);
    pool.sort(function (a, b) {
      var ta = lastSeen[a.id], tb = lastSeen[b.id];
      var ua = ta === undefined, ub = tb === undefined;
      if (ua && ub) return 0;
      if (ua) return -1;
      if (ub) return 1;
      return ta < tb ? -1 : ta > tb ? 1 : 0;
    });
    return pool;
  }

  function poolFor(bank, slot) {
    var arr = (bank['type' + slot.typeId] || []);
    if (slot.variant) arr = arr.filter(function (q) { return q.variant === slot.variant; });
    return arr.slice();
  }

  function composeSession(bank, lastSeen, rng) {
    rng = rng || Math.random;
    lastSeen = lastSeen || Object.create(null);
    var chosen = [];
    var usedIds = Object.create(null);

    // 1) FIXED
    FIXED.forEach(function (slot) {
      var pool = poolFor(bank, slot).filter(function (q) { return !usedIds[q.id]; });
      sortLRS(pool, lastSeen, rng);
      pool.slice(0, slot.n).forEach(function (q) { chosen.push(q); usedIds[q.id] = true; });
    });

    // 2) RANDOM — z całej reszty (dowolny typ), dopełnij do SESSION_SIZE
    var rest = [];
    for (var t = 1; t <= 8; t++) {
      (bank['type' + t] || []).forEach(function (q) { if (!usedIds[q.id]) rest.push(q); });
    }
    sortLRS(rest, lastSeen, rng);
    var need = SESSION_SIZE - chosen.length;
    rest.slice(0, need).forEach(function (q) { chosen.push(q); usedIds[q.id] = true; });

    return shuffleWith(chosen, rng);
  }

  var api = { composeSession: composeSession, FIXED: FIXED, SESSION_SIZE: SESSION_SIZE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.composeSession = composeSession; root.SESSION_PLAN = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
```

- [ ] **Step 4: Uruchom — ma przejść**

Run: `node tools/test-session-blueprint.js`
Expected: PASS — `✅ Task 8 OK`

- [ ] **Step 5: Commit**

```bash
git add web/session-blueprint.js tools/test-session-blueprint.js
git commit -m "feat(relacje): web/session-blueprint.js — composeSession (FIXED+RANDOM, świadoma wariantu)"
```

---

## Task 9: Podpięcie modułu w `index.html`

**Files:**
- Modify: `web/index.html` (script tag + `buildSession` na ~1741-1752; usunięcie starego `SESSION_BLUEPRINT` na 1737-1739)

- [ ] **Step 1: Dodaj `<script>` na nowy moduł**

Znajdź miejsce, gdzie ładowane są inne moduły (np. `pwa-install.js`, `social-proof.js`, `stats.js`) i dodaj **przed** kodem definiującym `buildSession`:

```html
<script src="session-blueprint.js"></script>
```

(Wzoruj się na istniejących `<script src="...">` w pliku — ta sama ścieżka względna.)

- [ ] **Step 2: Zastąp `SESSION_BLUEPRINT` + `buildSession`**

Usuń bloki na liniach 1737-1739 (komentarz + `const SESSION_BLUEPRINT = {...}`) i 1741-1752 (`function buildSession`), zastępując całość:

```js
  function buildSession() {
    const bank = getQuestionBank();
    const lastSeen = getLastSeenMap();
    // composeSession z web/session-blueprint.js — FIXED (3 syl.+2 rel.+po 1 z reszty) + 3 losowe.
    return composeSession(bank, lastSeen, Math.random);
  }
```

- [ ] **Step 3: Smoke ręczny — otwórz stronę i rozegraj sesję**

Run: `cd web && python3 -m http.server 8000` (lub istniejący sposób serwowania), otwórz `http://localhost:8000`, uruchom sesję.
Expected: sesja ma 15 pytań; pojawia się pytanie z relacjami (`A > B < C` z 5 opcjami, label „WNIOSKOWANIE LOGICZNE"); brak błędów w konsoli; renderuje się jak sylogizm (lista przesłanek).

- [ ] **Step 4: Sprawdź, że żaden inny kod nie odwołuje się do usuniętego `SESSION_BLUEPRINT`**

Run: `grep -n "SESSION_BLUEPRINT" web/index.html`
Expected: brak wyników (zero odwołań).

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat(relacje): buildSession deleguje do composeSession (nowy blueprint pokrycie+zmienność)"
```

---

## Task 10: Walidacja końcowa i porządki

**Files:** brak nowych — uruchomienie wszystkich bramek.

- [ ] **Step 1: Uruchom wszystkie testy i walidatory**

Run:
```bash
node tools/test-relacje-solver.js && \
node tools/test-generate-type5-relacje.js && \
node tools/test-session-blueprint.js && \
node tools/validate-type5-relacje.js && \
node tools/validate-questions.js
```
Expected: każda komenda kończy się `✅`; brak `process.exit(1)`.

- [ ] **Step 2: Usuń backup po potwierdzeniu**

Run: `rm -f web/questions-unified.js.bak tools/generated-type5-relacje.json`
Expected: usunięte artefakty pomocnicze (bank jest już w `questions-unified.js`; JSON i .bak nie są potrzebne w repo).

> **Uwaga:** jeśli `generated-type5-relacje.json` ma zostać jako artefakt (jak `tools/generated-type8.json`), pomiń jego usunięcie — sprawdź konwencję repo (`git status`/`.gitignore`).

- [ ] **Step 3: Commit porządkowy (jeśli usunięto śledzone pliki)**

```bash
git add -A && git commit -m "chore(relacje): sprzątanie artefaktów po integracji"
```

- [ ] **Step 4: Przenieś task do BACKLOG_DONE.md**

Zgodnie z CLAUDE.md: usuń sekcję „Relacje porządkujące — rozszerzenie Typ 5" oraz wiersz tabeli z `BACKLOG.md`, dodaj wpis do `BACKLOG_DONE.md` (z linkami do spec + plan i krótkim podsumowaniem: 140 pytań, nowy blueprint, generator deterministyczny).

- [ ] **Step 5: Commit**

```bash
git add BACKLOG.md BACKLOG_DONE.md
git commit -m "docs(relacje): przeniesienie ukończonego zadania do BACKLOG_DONE"
```

---

## Self-Review (autor planu)

**Spec coverage:**
- ✅ Model danych + `variant` → Task 6 (migracja), Task 7 (walidacja), generator ustawia `variant:"relacje"` (Task 3).
- ✅ Rendering reużywa Typ 5 → premises trzymane jako tablica (zgodne z `renderType5`); brak zmian w renderze (Task 9 smoke potwierdza).
- ✅ Blueprint FIXED+RANDOM (3+2+7+3=15) → Task 8 (`composeSession`) + Task 9 (podpięcie).
- ✅ Bank ~140 (70/70) → Task 4; sizing uzasadniony w spec.
- ✅ Generator deterministyczny (model-checking) → Task 1–4.
- ✅ Niezależny walidator → Task 5.
- ✅ Testowanie (solver fixtures, generator, selekcja) → Task 1,2,3,4,8.

**Placeholder scan:** Brak „TBD/TODO". Jedyne warunkowe miejsce — Task 4 Step 3 (jeśli easy < 70) — ma konkretną instrukcję (obniż cel + zaktualizuj asercję/spec), nie placeholder.

**Type consistency:** `composeSession(bank, lastSeen, rng)`, `parsePremises(q)`, `parseRelation(str)`, `relStr(rel)`, `entails(premises, conclusion)`, `counterexample(premises, conclusion)` — nazwy spójne między Task 1–9. `variant` wartości: `"sylogizm"` | `"relacje"` wszędzie. ID: `e_t5_101+` / `h_t5_101+` spójne (Task 4 ↔ Task 6 ↔ walidatory).

**Znane ryzyko (do weryfikacji w trakcie):** osiągalna liczba unikalnych pytań „easy" (ops tylko `>`,`<`) — patrz uwaga w Task 4. Jeśli < 70, obniżamy cel i aktualizujemy spec; nie generujemy duplikatów.
