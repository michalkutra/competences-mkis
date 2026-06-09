// tools/test-feedback.js
// Test czystej logiki flow feedbacku (web/feedback.js).
// Uruchomienie: node tools/test-feedback.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function load(path) {
  const code = fs.readFileSync(path, 'utf8');
  const ctx = { assert: assert }; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}
const m = load(__dirname + '/../web/feedback.js');

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1717500000000;
const COOL = m.FEEDBACK_COOLDOWN_DAYS;          // 5
const MIN = m.FEEDBACK_PROACTIVE_MIN_ANSWERS;   // 45

// --- isInCooldown ---
assert.strictEqual(m.isInCooldown(0, NOW), false, 'brak completedAt → poza cooldownem');
assert.strictEqual(m.isInCooldown(NOW - 1000, NOW), true, 'tuż po ukończeniu → w cooldownie');
assert.strictEqual(m.isInCooldown(NOW - (COOL * DAY) + 1000, NOW), true, 'dzień przed końcem → w cooldownie');
assert.strictEqual(m.isInCooldown(NOW - (COOL * DAY) - 1000, NOW), false, 'po 5 dniach → poza cooldownem');

// --- decideThumbClick ---
// 👎 zawsze otwiera 2B, nawet w cooldownie
assert.strictEqual(
  JSON.stringify(m.decideThumbClick({ value: 'down', completedAtMs: NOW - 1000, nowMs: NOW })),
  JSON.stringify({ action: 'open', stage: '2B' }), '👎 w cooldownie → open 2B');
assert.strictEqual(
  JSON.stringify(m.decideThumbClick({ value: 'down', completedAtMs: 0, nowMs: NOW })),
  JSON.stringify({ action: 'open', stage: '2B' }), '👎 bez cooldownu → open 2B');
// 👍 poza cooldownem → open 2A
assert.strictEqual(
  JSON.stringify(m.decideThumbClick({ value: 'up', completedAtMs: 0, nowMs: NOW })),
  JSON.stringify({ action: 'open', stage: '2A' }), '👍 bez cooldownu → open 2A');
// 👍 w cooldownie → ack (bez modala)
assert.strictEqual(
  JSON.stringify(m.decideThumbClick({ value: 'up', completedAtMs: NOW - 1000, nowMs: NOW })),
  JSON.stringify({ action: 'ack', stage: '2A' }), '👍 w cooldownie → ack');

// --- shouldShowProactive ---
const base = { voted: false, proactiveAtMs: 0, answerCount: MIN, nowMs: NOW };
assert.strictEqual(m.shouldShowProactive(base), true, 'niezagłosowany + próg → pokaż');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { voted: true })), false, 'już głosował → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { answerCount: MIN - 1 })), false, 'poniżej progu → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { proactiveAtMs: NOW - 1000 })), false, 'pokazany niedawno → nie');
assert.strictEqual(m.shouldShowProactive(Object.assign({}, base, { proactiveAtMs: NOW - (COOL * DAY) - 1000 })), true, 'pokazany >5 dni temu → pokaż znów');

// --- buildShareMessage ---
const msg = m.buildShareMessage();
assert.ok(msg.indexOf(m.FEEDBACK_SHARE_URL) !== -1, 'wiadomość zawiera URL');
assert.ok(msg.indexOf('http') === msg.lastIndexOf('http'), 'tylko jeden URL w wiadomości');

console.log('OK — wszystkie testy feedback przeszły');
