// tools/generate-type5-relacje.js
// Deterministyczny generator zadań „relacje porządkujące" (wariant Typ 5).
// Każde pytanie: łańcuch X op1 Y op2 Z (2 przesłanki, 3 zmienne) →
// jedyna poprawna opcja entailed + 4 dystraktory nie-entailed (z kontrprzykładem).
// CLI: ścieżka wyjściowa jest relatywna do roota projektu (uruchamiać z roota repo), tak jak generate-type8.js.
'use strict';
const fs = require('fs');
const S = require('./relacje-solver');

const CONCL_OPS = ['>', '<', '≥', '≤', '≠']; // operatory dopuszczone w opcjach (bez '=')
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const INSTRUKCJA = 'W tym zadaniu przesłanki opisują relacje porządkujące między wielkościami. ' +
  'Załóż, że są prawdziwe i wskaż wniosek, który wynika z nich na pewno. Tylko jedna odpowiedź jest poprawna.';

const rel = (l, op, r) => ({ l, op, r });
function relStr(r) { return r.l + ' ' + r.op + ' ' + r.r; }
function parseRelation(s) { const m = s.trim().replace(/^[A-E]\)\s*/, '').split(/\s+/); return rel(m[0], m[1], m[2]); }
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
// UWAGA: osłabione wnioski (np. z `A > B` wniosek `A ≥ B`) są CELOWO dopuszczone jako poprawne —
// to autentyczny wzorzec egzaminu KSAP (por. „Zestaw 3", zad. 1: z `A > B < C` poprawny wniosek to `B ≤ A`).
// NIE usuwamy ich.
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

// czy wniosek wymaga OBU przesłanek (nie wynika z żadnej pojedynczej)
function needsBoth(premises, ccl) {
  return premises.every(function (p) { return !S.entails([p], ccl); });
}
// „siła" wniosku do preferencji: ścisłe (> <) najmocniejsze, potem (≥ ≤), ≠ najsłabsze
function tightness(op) { return (op === '>' || op === '<') ? 0 : (op === '≥' || op === '≤') ? 1 : 2; }

// Buduje jedno pytanie. Zwraca null, jeśli wzorzec nie daje 1 pewnego + ≥4 niepewnych wniosków.
function buildOne(spec) {
  const [a, b, c] = spec.vars;
  const premises = [rel(a, spec.ops[0], b), rel(b, spec.ops[1], c)];
  const vars = S.varsOf(premises);
  if (!S.models(vars).some((m) => S.satisfies(m, premises))) return null;

  const cands = candidates(vars, premises);
  const entailed = cands.filter((x) => S.entails(premises, x));
  const notEntailed = cands.filter((x) => !S.entails(premises, x));

  // podział wg trybu trudności
  const both = entailed.filter((x) => needsBoth(premises, x));
  const single = entailed.filter((x) => !needsBoth(premises, x));
  let pool = spec.mode === 'both' ? both : single;
  if (pool.length < 1 || notEntailed.length < 4) return null;

  if (spec.preferNeq) {
    const neq = pool.filter((x) => x.op === '≠');
    if (neq.length < 1) return null;          // ten łańcuch nie daje wniosku ≠ — pomiń
    pool = neq;
  } else {
    pool = pool.slice().sort((p, q) => tightness(p.op) - tightness(q.op));
  }
  const correctRel = pool[spec.correctIdx % pool.length];
  const shift = spec.seq % notEntailed.length;
  const rotated = notEntailed.slice(shift).concat(notEntailed.slice(0, shift));
  const distract = rotated.slice(0, 4);

  const pos = spec.seq % 5;
  const optionsRel = distract.slice();
  optionsRel.splice(pos, 0, correctRel);
  const options = optionsRel.map((r, i) => LETTERS[i] + ') ' + relStr(r));

  return {
    typeId: 5,
    variant: 'relacje',
    level: spec.level,
    instruction: INSTRUKCJA,
    premises: spec.pairFormat
      ? [relStr(premises[0]), relStr(premises[1])]                                  // dwie pary: ["A > B", "B > C"]
      : [relStr(premises[0]) + ' ' + premises[1].op + ' ' + premises[1].r],         // jedna trójka: ["A > B > C"]
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

function permutations3(items) {
  const out = [];
  for (const a of items) for (const b of items) for (const c of items) {
    if (a !== b && b !== c && a !== c) out.push([a, b, c]);
  }
  return out;
}

function buildLevel(level, mode, prefix, seen, neqQuota) {
  neqQuota = neqQuota || 0;
  const CHAIN_OPS = ['>', '<', '≥', '≤'];
  const perms = permutations3(['A', 'B', 'C']);
  const out = [];
  let seq = 0;

  function fill(target, preferNeq) {
    for (let ci = 0; ci < 6 && out.length < target; ci++) {
      for (const vars of perms) {
        for (const op1 of CHAIN_OPS) for (const op2 of CHAIN_OPS) {
          if (out.length >= target) break;
          const pairFormat = (out.length % 2 === 0);   // naprzemiennie → ~50/50
          const q = buildOne({ vars, ops: [op1, op2], correctIdx: ci, level, mode, seq, preferNeq, pairFormat });
          if (!q) continue;
          // sygnatura niezależna od formatu wyświetlania (relacje + poprawny wniosek)
          const prem = parsePremises(q);
          const sigStr = prem.map(relStr).join('|') + ' ⊢ ' + relStr(parseRelation(q.options[q.correct]));
          if (seen.has(sigStr)) continue;
          seen.add(sigStr);
          seq++;
          q.id = prefix + '_t5_' + String(101 + out.length);
          out.push(q);
        }
      }
    }
  }

  if (neqQuota > 0) fill(neqQuota, true);   // pass A: ~20% z wnioskiem ≠
  fill(70, false);                          // pass B: dopełnij resztę najmocniejszym wnioskiem

  if (out.length < 70) throw new Error(level + ': uzyskano tylko ' + out.length + '/70 (tryb ' + mode + ', neqQuota ' + neqQuota + ')');
  return out;
}

function generateAll() {
  const seen = new Set();
  return {
    easy: buildLevel('easy', 'single', 'e', seen, 0),
    hard: buildLevel('hard', 'both', 'h', seen, 14),
  };
}

module.exports = { buildOne, buildExplanation, candidates, parsePremises, parseRelation, relStr, CONCL_OPS, generateAll };

if (require.main === module) {
  const out = generateAll();
  fs.writeFileSync('tools/generated-type5-relacje.json', JSON.stringify(out, null, 2));
  console.log('Wygenerowano relacje: easy=' + out.easy.length + ', hard=' + out.hard.length);
}
