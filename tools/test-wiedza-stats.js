// tools/test-wiedza-stats.js
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/../web/wiedza-stats.js', 'utf8'), ctx);
const { aggregateWiedzaStats } = ctx;

const questions = [
  { id: 'w_pr_1', domain: 'pr', topicId: 'pr.kpa' },
  { id: 'w_pr_2', domain: 'pr', topicId: 'pr.kpa' },
  { id: 'w_pr_3', domain: 'pr', topicId: 'pr.zrodla-prawa' },
  { id: 'w_se_1', domain: 'se', topicId: 'se.makroekonomia' },
];
const log = [
  { qId: 'w_pr_1', ok: true },
  { qId: 'w_pr_1', ok: false },   // to samo pytanie drugi raz
  { qId: 'w_pr_2', ok: true },
  { qId: 'w_se_1', ok: false },
  { qId: 'NOPE',   ok: true },    // nie-wiedza / nieznane → ignorowane
];

const r = aggregateWiedzaStats(log, questions);

// dziedzina pr: 3 pytania w puli, 2 różne widziane, 3 próby, 2 poprawne
assert.strictEqual(r.domains.pr.total, 3, 'pr.total');
assert.strictEqual(r.domains.pr.seen, 2, 'pr.seen');
assert.strictEqual(r.domains.pr.attempts, 3, 'pr.attempts');
assert.strictEqual(r.domains.pr.correct, 2, 'pr.correct');
assert.ok(Math.abs(r.domains.pr.accuracy - 2/3) < 1e-9, 'pr.accuracy');

// temat pr.kpa: 2 pytania, 2 widziane, 3 próby, 2 poprawne
assert.strictEqual(r.topics['pr.kpa'].seen, 2, 'kpa.seen');
assert.strictEqual(r.topics['pr.kpa'].attempts, 3, 'kpa.attempts');

// temat nieruszony: accuracy null, seen 0
assert.strictEqual(r.topics['pr.zrodla-prawa'].seen, 0, 'zrodla.seen');
assert.strictEqual(r.topics['pr.zrodla-prawa'].accuracy, null, 'zrodla.accuracy null');

// wpis 'NOPE' zignorowany — se ma 1 próbę
assert.strictEqual(r.domains.se.attempts, 1, 'se.attempts (NOPE ignorowane)');

console.log('✅ wiedza-stats OK');
