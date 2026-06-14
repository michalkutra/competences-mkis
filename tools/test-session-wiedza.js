// tools/test-session-wiedza.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/session-wiedza.js', 'utf8'), ctx);
const { composeWiedzaSession } = ctx;

function makeRng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function mkPool() {
  const doms = { pr: 40, se: 30, ap: 20, fp: 15, pz: 10, oz: 8 };
  const levels = ['easy', 'medium', 'hard'];
  const pool = [];
  Object.keys(doms).forEach(function (d) {
    for (let i = 0; i < doms[d]; i++) pool.push({ id: 'w_' + d + '_' + i, domain: d, level: levels[i % 3] });
  });
  return pool;
}

// 1) domyślnie 15 pytań, bez duplikatów, ze wszystkich dziedzin
const s = composeWiedzaSession(mkPool(), {}, Object.create(null), makeRng(1));
assert.strictEqual(s.length, 15, '15 pytań');
assert.strictEqual(new Set(s.map((x) => x.id)).size, 15, 'bez duplikatów');

// 2) filtr dziedzin — tylko wybrane
const sf = composeWiedzaSession(mkPool(), { domains: ['oz', 'pz'] }, Object.create(null), makeRng(2));
assert.ok(sf.every((x) => x.domain === 'oz' || x.domain === 'pz'), 'tylko wybrane dziedziny');

// 3) filtr poziomu
const sl = composeWiedzaSession(mkPool(), { level: 'hard' }, Object.create(null), makeRng(3));
assert.ok(sl.every((x) => x.level === 'hard'), 'tylko hard');
// level 'all' = bez filtra
const sa = composeWiedzaSession(mkPool(), { level: 'all' }, Object.create(null), makeRng(3));
assert.ok(sa.some((x) => x.level !== 'hard'), "level 'all' nie filtruje");

// 4) anti-repeat: niewidziane mają pierwszeństwo
const pool = mkPool();
const lastSeen = Object.create(null);
pool.forEach((x, i) => { if (i >= 15) lastSeen[x.id] = '2020-01-01'; }); // pierwsze 15 niewidziane
const s4 = composeWiedzaSession(pool, {}, lastSeen, makeRng(7));
assert.ok(s4.every((x) => !lastSeen[x.id]), 'wszystkie wybrane są niewidziane');

// 5) graceful: przefiltrowana pula < 15 → tyle ile jest
const s5 = composeWiedzaSession(mkPool(), { domains: ['oz'] }, Object.create(null), makeRng(9)); // oz = 8
assert.strictEqual(s5.length, 8, 'mniej niż 15 gdy pula mała');

// 6) realOnly — tylko pytania z prawdziwych egzaminów (origin != 'generated')
const poolO = [
  { id: 'w_pr_1', domain: 'pr', level: 'easy',   origin: 'ksap-2023' },
  { id: 'w_pr_2', domain: 'pr', level: 'medium', origin: 'generated' },
  { id: 'w_se_1', domain: 'se', level: 'hard',   origin: 'ksap-2025' },
  { id: 'w_se_2', domain: 'se', level: 'easy',   origin: 'generated' },
];
const sr = composeWiedzaSession(poolO, { realOnly: true }, Object.create(null), makeRng(11));
assert.ok(sr.length === 2, 'realOnly: zostają 2 pytania egzaminacyjne');
assert.ok(sr.every((x) => x.origin && x.origin !== 'generated'), 'realOnly: brak generated');
// bez flagi — wszystkie 4
const sr0 = composeWiedzaSession(poolO, {}, Object.create(null), makeRng(11));
assert.strictEqual(sr0.length, 4, 'bez realOnly: cała pula');

console.log('✅ session-wiedza OK');
