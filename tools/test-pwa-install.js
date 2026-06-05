// tools/test-pwa-install.js
// Test czystej logiki promptu PWA (web/pwa-install.js).
// Uruchomienie: node tools/test-pwa-install.js
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function load(path) {
  const code = fs.readFileSync(path, 'utf8');
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}
const m = load(__dirname + '/../web/pwa-install.js');

const UA = {
  androidChrome: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  androidWebview: 'Mozilla/5.0 (Linux; Android 13; SM-G991B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36',
  fbInApp: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36 [FBAN/EMA;FBAV/450.0]',
  safariIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  chromeIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0 Mobile/15E148 Safari/604.1',
  desktopChrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// detectPwaBranch
assert.strictEqual(m.detectPwaBranch({ ua: UA.androidChrome, standalone: true,  hasInstallPrompt: true }),  'standalone',       'standalone wygrywa');
assert.strictEqual(m.detectPwaBranch({ ua: UA.androidChrome, standalone: false, hasInstallPrompt: true }),  'native',           'android chrome → native');
assert.strictEqual(m.detectPwaBranch({ ua: UA.androidWebview, standalone: false, hasInstallPrompt: false }), 'open-in-browser', 'android webview → open-in-browser');
assert.strictEqual(m.detectPwaBranch({ ua: UA.fbInApp,        standalone: false, hasInstallPrompt: false }), 'open-in-browser', 'facebook in-app → open-in-browser');
assert.strictEqual(m.detectPwaBranch({ ua: UA.chromeIOS,      standalone: false, hasInstallPrompt: false }), 'open-in-browser', 'chrome iOS nie umie instalować');
assert.strictEqual(m.detectPwaBranch({ ua: UA.safariIOS,      standalone: false, hasInstallPrompt: false }), 'ios-instructions','safari iOS → instrukcja');
assert.strictEqual(m.detectPwaBranch({ ua: UA.safariIOS,      standalone: false, hasInstallPrompt: true }),  'ios-instructions','iOS ma priorytet nad hasInstallPrompt (np. spoof UA na desktopie)');
assert.strictEqual(m.detectPwaBranch({ ua: UA.desktopChrome,  standalone: false, hasInstallPrompt: false }), 'none',            'desktop bez promptu → none');
assert.strictEqual(m.detectPwaBranch({ ua: UA.fbInApp,        standalone: false, hasInstallPrompt: true }),  'open-in-browser', 'in-app ma priorytet nad hasInstallPrompt');
assert.strictEqual(m.detectPwaBranch({}), 'none', 'pusty env → none');
assert.strictEqual(m.detectPwaBranch(), 'none', 'brak argumentu → none');

// shouldShowResultsPrompt
const NOW = 1717500000000;
assert.strictEqual(m.shouldShowResultsPrompt({}, NOW), true, 'pusty stan → pokaż');
assert.strictEqual(m.shouldShowResultsPrompt({ installed: true }, NOW), false, 'zainstalowane → nie');
assert.strictEqual(m.shouldShowResultsPrompt({ dismissedUntil: new Date(NOW + 1000).toISOString() }, NOW), false, 'cisza aktywna → nie');
assert.strictEqual(m.shouldShowResultsPrompt({ dismissedUntil: new Date(NOW - 1000).toISOString() }, NOW), true, 'cisza minęła → pokaż');
assert.strictEqual(m.shouldShowResultsPrompt({ dismissedUntil: 'not-a-date' }, NOW), true, 'zły format daty → pokaż (bezpieczny default)');

// computeDismissUntil
assert.strictEqual(m.computeDismissUntil(NOW, 4), new Date(NOW + 4 * 86400000).toISOString(), 'cisza 4 dni');
assert.strictEqual(m.computeDismissUntil(NOW, 0), new Date(NOW).toISOString(), 'cisza 0 dni = teraz');

console.log('OK — wszystkie testy pwa-install przeszły');
