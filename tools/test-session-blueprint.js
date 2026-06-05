// tools/test-session-blueprint.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/session-blueprint.js', 'utf8'), ctx);
const { composeSession } = ctx;

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

// 1) 15 pytań, bez duplikatów
const s = composeSession(mkBank(), Object.create(null), makeRng(1));
assert.strictEqual(s.length, 15, '15 pytań');
assert.strictEqual(new Set(s.map((x) => x.id)).size, 15, 'bez duplikatów');

// 2) ≥3 sylogizmy, ≥2 relacje, ≥1 z każdego z pozostałych 7 typów
const syl = s.filter((x) => x.typeId === 5 && x.variant === 'sylogizm').length;
const rel = s.filter((x) => x.typeId === 5 && x.variant === 'relacje').length;
assert.ok(syl >= 3, 'co najmniej 3 sylogizmy, jest ' + syl);
assert.ok(rel >= 2, 'co najmniej 2 relacje, jest ' + rel);
for (const t of [1, 2, 3, 4, 6, 7, 8]) assert.ok(s.some((x) => x.typeId === t), 'jest typ ' + t);

// 3) Anti-repeat: niewidziane mają pierwszeństwo
const bank = mkBank();
const lastSeen = Object.create(null);
bank.type5.filter((x) => x.variant === 'relacje').forEach((x, i) => { if (i >= 2) lastSeen[x.id] = '2020-01-01'; });
const s3 = composeSession(bank, lastSeen, makeRng(5));
const relIds = s3.filter((x) => x.variant === 'relacje').map((x) => x.id);
assert.ok(relIds.includes('5_relacje_0') && relIds.includes('5_relacje_1'), 'świeże relacje wybrane: ' + relIds);
assert.ok(relIds.every((id) => !lastSeen[id]), 'żadna wybrana relacja nie była wcześniej widziana');

// 4) Graceful: pula relacji = 1 pytanie → sesja nadal 15
const thin = mkBank();
thin.type5 = thin.type5.filter((x) => x.variant !== 'relacje').concat([{ id: '5_relacje_solo', typeId: 5, level: 'easy', variant: 'relacje' }]);
const s4 = composeSession(thin, Object.create(null), makeRng(9));
assert.strictEqual(s4.length, 15, 'graceful: nadal 15 przy 1 relacji');

console.log('✅ Task 8 OK');
