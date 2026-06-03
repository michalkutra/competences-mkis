// tools/test-social-proof.js
// Test czystej logiki licznika social proof (web/social-proof.js).
// Uruchomienie: node tools/test-social-proof.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function load(path) {
  const code = fs.readFileSync(path, 'utf8');
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}

const m = load(__dirname + '/../web/social-proof.js');

// floorToNice: <1000 -> pełne setki; >=1000 -> pełne 500
assert.strictEqual(m.floorToNice(429), 400, 'floorToNice(429)');
assert.strictEqual(m.floorToNice(512), 500, 'floorToNice(512)');
assert.strictEqual(m.floorToNice(999), 900, 'floorToNice(999)');
assert.strictEqual(m.floorToNice(1040), 1000, 'floorToNice(1040)');
assert.strictEqual(m.floorToNice(1600), 1500, 'floorToNice(1600)');

// buildSocialProofText: tekst lub null
assert.strictEqual(
  m.buildSocialProofText(429, 300),
  'Odpowiedzieliście już na ponad 400 pytań',
  'tekst dla 429'
);
assert.strictEqual(m.buildSocialProofText(250, 300), null, 'poniżej progu -> null');
assert.strictEqual(m.buildSocialProofText(300, 300), 'Odpowiedzieliście już na ponad 300 pytań', 'na progu -> tekst');
assert.strictEqual(m.buildSocialProofText(undefined, 300), null, 'undefined -> null');
assert.strictEqual(m.buildSocialProofText('xx', 300), null, 'nie-liczba -> null');
assert.strictEqual(
  m.buildSocialProofText(1040, 300),
  'Odpowiedzieliście już na ponad 1000 pytań',
  'tekst dla 1040'
);

console.log('OK: wszystkie asercje social-proof przeszły');
