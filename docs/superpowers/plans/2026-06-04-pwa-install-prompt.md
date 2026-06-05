# PWA install prompt + ochrona danych — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Zasada projektu (CLAUDE.md + pamięć):** NIE commitujemy automatycznie. Każdy „Checkpoint" oznacza: zatrzymaj się, pokaż diff, użytkownik sam zdecyduje o commicie.

**Goal:** Dodać zachętę do instalacji PWA (po sesji + menu + „O aplikacji"), która zwiększa szansę na trwały storage (`persisted=TAK`) i tym samym ogranicza znikanie historii — z 3 gałęziami wg konfiguracji (natywny prompt / instrukcja iOS / „otwórz w przeglądarce" dla in-app) i pełnym pomiarem `pwa_*` przez GTM.

**Architecture:** Czysta logika decyzyjna (wykrywanie gałęzi + częstotliwość) w nowym module `web/pwa-install.js`, testowana skryptem node przez `vm` (wzorzec z `web/social-proof.js` + `tools/test-social-proof.js`). Glue DOM-owy (listenery `beforeinstallprompt`/`appinstalled`, render karty, eventy `dataLayer`, integracja z `updateBackupNotes`) jako kontroler inline w `web/index.html`.

**Tech Stack:** Vanilla JS, statyczny HTML (Netlify), node (v24) + `vm` do testu logiki, GTM `dataLayer` do pomiaru.

**Spec:** [docs/superpowers/specs/2026-06-04-pwa-install-prompt-design.md](../specs/2026-06-04-pwa-install-prompt-design.md)

---

## File Structure

- **Create** `web/pwa-install.js` — czysta logika: `detectPwaBranch(env)`, `shouldShowResultsPrompt(state, nowMs)`, `computeDismissUntil(nowMs, days)`. Eksport na `window` (przeglądarka) lub `globalThis` (node/vm). Zero DOM, zero side-effectów.
- **Create** `tools/test-pwa-install.js` — test node ładujący `web/pwa-install.js` przez `vm` + asercje (wzorzec z `tools/test-social-proof.js`).
- **Modify** `web/index.html`:
  - tag `<script src="pwa-install.js">` (po `social-proof.js`, ~L1236),
  - markup: karta na `#screen-summary` (~L1080), modal iOS (top-level), przycisk w menu (~L1023), scalenie w `.about-storage-warning` (~L1157),
  - CSS dla karty/modalu (reuse `.ghost`/`.btn-sm`),
  - kontroler inline `var pwaInstall = (function(){…})()` (przed `DOMContentLoaded`, ~L1305),
  - `pwaInstall.init()` w `DOMContentLoaded`, `pwaInstall.onSummaryShown()` po `showScreen('summary')` (~L2296).

---

## Task 1: Czysta logika `web/pwa-install.js` (TDD)

**Files:**
- Create: `web/pwa-install.js`
- Test: `tools/test-pwa-install.js`

- [ ] **Step 1: Write the failing test**

Create `tools/test-pwa-install.js`:

```js
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
assert.strictEqual(m.detectPwaBranch({ ua: UA.desktopChrome,  standalone: false, hasInstallPrompt: false }), 'none',            'desktop bez promptu → none');
assert.strictEqual(m.detectPwaBranch({ ua: UA.fbInApp,        standalone: false, hasInstallPrompt: true }),  'open-in-browser', 'in-app ma priorytet nad hasInstallPrompt');

// shouldShowResultsPrompt
const NOW = 1717500000000;
assert.strictEqual(m.shouldShowResultsPrompt({}, NOW), true, 'pusty stan → pokaż');
assert.strictEqual(m.shouldShowResultsPrompt({ installed: true }, NOW), false, 'zainstalowane → nie');
assert.strictEqual(m.shouldShowResultsPrompt({ dismissedUntil: new Date(NOW + 1000).toISOString() }, NOW), false, 'cisza aktywna → nie');
assert.strictEqual(m.shouldShowResultsPrompt({ dismissedUntil: new Date(NOW - 1000).toISOString() }, NOW), true, 'cisza minęła → pokaż');

// computeDismissUntil
assert.strictEqual(m.computeDismissUntil(NOW, 4), new Date(NOW + 4 * 86400000).toISOString(), 'cisza 4 dni');

console.log('OK — wszystkie testy pwa-install przeszły');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tools/test-pwa-install.js`
Expected: FAIL — `Error: ENOENT ... web/pwa-install.js` (plik jeszcze nie istnieje).

- [ ] **Step 3: Write minimal implementation**

Create `web/pwa-install.js`:

```js
// web/pwa-install.js
// Czysta logika promptu instalacji PWA — wykrywanie gałęzi i częstotliwości.
// Bez DOM, bez side-effectów. Testowane przez tools/test-pwa-install.js (node + vm).
// Eksport: window (przeglądarka) lub globalThis (node/vm).
(function (root) {
  'use strict';

  // env = { ua: string, standalone: bool, hasInstallPrompt: bool }
  // Zwraca: 'standalone' | 'native' | 'ios-instructions' | 'open-in-browser' | 'none'
  function detectPwaBranch(env) {
    env = env || {};
    var ua = env.ua || '';
    if (env.standalone) return 'standalone';

    var isIOS = /iPad|iPhone|iPod/.test(ua);
    var isChromeIOS = /CriOS/.test(ua);   // Chrome na iOS — NIE może instalować PWA
    var isFirefoxIOS = /FxiOS/.test(ua);  // Firefox na iOS — j.w.
    var isInApp = /\bwv\b/.test(ua) ||    // Android WebView (in-app)
      /FBAN|FB_IAB|FBAV|Instagram|Line\/|Twitter|MicroMessenger|GSA/.test(ua);

    // In-app webview oraz iOS-owe przeglądarki bez instalacji → otwórz w prawdziwej przeglądarce.
    // Priorytet PRZED 'native' — gdyby webview błędnie zgłosił beforeinstallprompt.
    if (isInApp || isChromeIOS || isFirefoxIOS) return 'open-in-browser';

    // Natywny prompt dostępny (Android Chrome/Samsung, desktop Chrome/Edge).
    if (env.hasInstallPrompt) return 'native';

    // iOS Safari (prawdziwe) — instrukcja ręczna (brak API instalacji na iOS).
    if (isIOS) return 'ios-instructions';

    // Nic pewnego (np. desktop bez beforeinstallprompt) → nie pokazuj.
    return 'none';
  }

  // state = ksap_pwa = { installed, dismissedUntil }, nowMs = Date.now()
  function shouldShowResultsPrompt(state, nowMs) {
    state = state || {};
    if (state.installed) return false;
    if (state.dismissedUntil) {
      var until = Date.parse(state.dismissedUntil);
      if (!isNaN(until) && nowMs < until) return false;
    }
    return true;
  }

  function computeDismissUntil(nowMs, days) {
    return new Date(nowMs + days * 24 * 60 * 60 * 1000).toISOString();
  }

  root.detectPwaBranch = detectPwaBranch;
  root.shouldShowResultsPrompt = shouldShowResultsPrompt;
  root.computeDismissUntil = computeDismissUntil;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tools/test-pwa-install.js`
Expected: `OK — wszystkie testy pwa-install przeszły`

- [ ] **Step 5: Checkpoint** — pokaż `git status` + diff (`web/pwa-install.js`, `tools/test-pwa-install.js`). Zatrzymaj się; użytkownik sam zdecyduje o commicie (zasada projektu: brak auto-commitów). Sugerowany komunikat: `feat: add PWA install branch/frequency logic + test`.

---

## Task 2: Tag skryptu + markup + CSS (statyczne, ukryte domyślnie)

**Files:**
- Modify: `web/index.html`

- [ ] **Step 1: Dodaj tag skryptu**

Anchor (~L1236):

```html
<script src="stats.js"></script>
<script src="social-proof.js"></script>
```

Zmień na:

```html
<script src="stats.js"></script>
<script src="social-proof.js"></script>
<script src="pwa-install.js"></script>
```

- [ ] **Step 2: Dodaj CSS karty/modalu**

Dopisz do bloku `<style>` przy `.backup-box` (~L1090, zaraz po `.backup-actions { … }`):

```css
  .pwa-card { margin-top: 24px; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; width: 100%; box-sizing: border-box; text-align: center; }
  .pwa-card strong { display: block; font-size: 1rem; color: #1e3a8a; margin-bottom: 6px; }
  .pwa-card p { font-size: 0.9rem; color: #374151; line-height: 1.5; margin: 0 0 12px; }
  .pwa-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .pwa-modal { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; }
  .pwa-modal-box { background: #fff; border-radius: 12px; padding: 20px; max-width: 360px; width: 100%; }
  .pwa-modal-box strong { display: block; font-size: 1.05rem; margin-bottom: 10px; }
  .pwa-modal-box ol { margin: 0 0 12px; padding-left: 20px; line-height: 1.7; font-size: 0.95rem; }
  .pwa-modal-box p { font-size: 0.9rem; color: #4b5563; margin: 0 0 14px; }
```

- [ ] **Step 3: Dodaj kartę PWA na ekranie wyników**

Anchor (~L1078):

```html
<div id="screen-summary" class="screen">
  <h2>Wynik sesji</h2>
  <div id="summary-content"></div>
</div>
```

Zmień na:

```html
<div id="screen-summary" class="screen">
  <h2>Wynik sesji</h2>
  <div id="summary-content"></div>
  <!-- PWA: zachęta do instalacji (trwały storage). Sterowane przez pwaInstall. -->
  <div id="pwa-card" class="pwa-card" style="display:none">
    <div id="pwa-card-main">
      <strong>📲 Nie strać swojej historii</strong>
      <p>Dodaj aplikację do ekranu głównego — to znacznie zmniejsza ryzyko, że przeglądarka usunie Twoją historię i statystyki.</p>
      <div class="pwa-actions">
        <button class="ghost btn-sm" onclick="pwaInstall.clickInstall('results')">Zainstaluj</button>
        <button class="ghost btn-sm" onclick="pwaInstall.snooze()">Może później</button>
      </div>
    </div>
    <div id="pwa-card-inapp" style="display:none">
      <strong>📲 Otwórz w prawdziwej przeglądarce</strong>
      <p>Korzystasz z przeglądarki wbudowanej w aplikację (np. Facebook) — tutaj Twoja historia łatwo znika. Otwórz stronę w Chrome/Safari (menu <strong>⋯</strong> → „Otwórz w przeglądarce"), a potem dodaj ją do ekranu głównego.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Dodaj modal iOS (top-level)**

Wstaw zaraz po zamknięciu `#screen-summary` z poprzedniego kroku (przed `<!-- ==================== SESSION DETAIL ==================== -->`):

```html
<!-- PWA: instrukcja instalacji na iOS (brak API → ręczne kroki) -->
<div id="pwa-ios-modal" class="pwa-modal" style="display:none">
  <div class="pwa-modal-box">
    <strong>Dodaj do ekranu głównego (iPhone)</strong>
    <ol>
      <li>Dotknij <strong>Udostępnij</strong> ⬆️ na dole Safari</li>
      <li>Wybierz <strong>„Dodaj do ekranu głównego"</strong></li>
      <li>Potwierdź <strong>„Dodaj"</strong></li>
    </ol>
    <p>Dzięki temu aplikacja zachowa Twoją historię i odpala się jak zwykła apka.</p>
    <button class="ghost btn-sm" onclick="pwaInstall.closeIosModal()">Zamknij</button>
  </div>
</div>
```

- [ ] **Step 5: Dodaj przycisk „Zainstaluj" w menu**

Anchor (~L1023):

```html
      <button class="menu-item" onclick="showScreen('about'); closeAccountMenu();">O aplikacji</button>
    </div>
```

Zmień na:

```html
      <button class="menu-item" onclick="showScreen('about'); closeAccountMenu();">O aplikacji</button>
      <button id="pwa-menu-btn" class="menu-item" style="display:none" onclick="pwaInstall.clickInstall('menu'); closeAccountMenu();">📲 Zainstaluj aplikację</button>
    </div>
```

- [ ] **Step 6: Scal instalację w ostrzeżenie „O aplikacji"**

Otwórz blok `.about-storage-warning` (~L1157). Kończy się on zdaniem „…pobierz kopię, a w razie czego ją odtworzysz." i linią `</div>`. Wstaw poniższy pod-blok **bezpośrednio przed** tym zamykającym `</div>` (czyli wewnątrz boksu, po istniejącym tekście):

```html
    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(0,0,0,.08)">
      <strong style="display:block;margin-bottom:4px">✅ Najlepsza ochrona: zainstaluj aplikację</strong>
      Dodaj ją do ekranu głównego — przeglądarka traktuje wtedy Twoje dane jako trwałe i znacznie rzadziej je usuwa.
      <div style="margin-top:10px">
        <button id="pwa-about-btn" class="ghost btn-sm" style="display:none" onclick="pwaInstall.clickInstall('about')">📲 Zainstaluj aplikację</button>
      </div>
    </div>
```

- [ ] **Step 7: Weryfikacja ręczna (render statyczny)**

Uruchom lokalnie (np. `cd web && python3 -m http.server 8000`) i otwórz `http://localhost:8000`.
- W DevTools → Console wpisz: `document.getElementById('pwa-card').style.display=''; document.getElementById('pwa-ios-modal').style.display='flex';`
- Expected: karta PWA i modal iOS renderują się poprawnie (kolory, układ, przyciski `.ghost`/`.btn-sm`), modal jako overlay na środku. Zamknij modal: `pwaInstall` jeszcze nie istnieje (Task 3) — przycisk „Zamknij" zadziała dopiero po Task 3, na razie ignoruj błąd onclick.

> Uwaga: GTM jest wyłączony poza `egzamin.kutra.pl`, więc lokalnie eventy nie polecą — to oczekiwane.

- [ ] **Step 8: Checkpoint** — pokaż diff `web/index.html`. Zatrzymaj się; użytkownik decyduje o commicie. Sugerowany komunikat: `feat: add PWA install card/modal/menu markup (hidden, no logic yet)`.

---

## Task 3: Kontroler `pwaInstall` (glue DOM + listenery + pomiar)

**Files:**
- Modify: `web/index.html`

- [ ] **Step 1: Dodaj kontroler inline**

Wstaw poniższy blok **bezpośrednio przed** `document.addEventListener('DOMContentLoaded', function() {` (~L1305). Jest to top-level `var` w głównym skrypcie inline — listenery `beforeinstallprompt`/`appinstalled` rejestrują się od razu przy ładowaniu.

```js
  /* ================================================================
     PWA INSTALL — zachęta do instalacji (trwały storage) + pomiar.
     Czysta logika decyzyjna: web/pwa-install.js. Tu tylko DOM/efekty.
  ================================================================ */
  var pwaInstall = (function () {
    var KEY = 'ksap_pwa';
    var DISMISS_DAYS = 4;
    var deferredPrompt = null;
    var branch = 'none';

    function getState() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
    function setState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
    function track(event, extra) {
      window.dataLayer = window.dataLayer || [];
      var o = { event: event, branch: branch };
      if (extra) for (var k in extra) o[k] = extra[k];
      window.dataLayer.push(o);
    }
    function isStandalone() {
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
             window.navigator.standalone === true;
    }
    function recompute() {
      branch = detectPwaBranch({
        ua: navigator.userAgent || '',
        standalone: isStandalone(),
        hasInstallPrompt: !!deferredPrompt
      });
      return branch;
    }
    function refreshPersistedNote() {
      if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(function () {
          if (navigator.storage.persisted) navigator.storage.persisted().then(function (p) {
            if (typeof updateBackupNotes === 'function') updateBackupNotes(p);
          });
        }).catch(function () {});
      }
    }

    // Listenery rejestrowane natychmiast (zdarzenia lecą wcześnie).
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
      recompute();
    });
    window.addEventListener('appinstalled', function () {
      var s = getState(); s.installed = true; setState(s);
      recompute();
      track('pwa_installed', { method: 'appinstalled' });
      var card = document.getElementById('pwa-card'); if (card) card.style.display = 'none';
      hideInstallEntries();
      refreshPersistedNote();
    });

    function hideInstallEntries() {
      ['pwa-menu-btn', 'pwa-about-btn'].forEach(function (id) {
        var el = document.getElementById(id); if (el) el.style.display = 'none';
      });
    }

    // Karta na ekranie wyników — wybór wariantu wg gałęzi.
    function renderResultsCard() {
      recompute();
      var card = document.getElementById('pwa-card');
      if (!card) return;
      var st = getState();
      if (branch === 'standalone' || branch === 'none' || st.installed || !shouldShowResultsPrompt(st, Date.now())) {
        card.style.display = 'none';
        return;
      }
      var main = document.getElementById('pwa-card-main');
      var inapp = document.getElementById('pwa-card-inapp');
      if (branch === 'open-in-browser') {
        main.style.display = 'none'; inapp.style.display = '';
        track('pwa_inapp_detected');
        track('pwa_open_in_browser_hint_shown', { placement: 'results' });
      } else {
        inapp.style.display = 'none'; main.style.display = '';
        track('pwa_prompt_shown', { placement: 'results' });
      }
      card.style.display = '';
    }

    function clickInstall(placement) {
      recompute();
      track('pwa_prompt_clicked', { placement: placement });
      if (branch === 'native' && deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choice) {
          if (choice && choice.outcome === 'accepted') track('pwa_install_accepted', { placement: placement });
          else track('pwa_install_dismissed', { placement: placement });
          deferredPrompt = null;
        });
      } else if (branch === 'ios-instructions') {
        openIosModal(placement);
      } else if (branch === 'open-in-browser') {
        alert('Korzystasz z przeglądarki wbudowanej w aplikację. Otwórz stronę w Chrome/Safari (menu ⋯ → „Otwórz w przeglądarce"), a potem dodaj do ekranu głównego.');
      } else {
        alert('Aby zainstalować: otwórz menu przeglądarki (⋮) i wybierz „Dodaj do ekranu głównego" / „Zainstaluj aplikację".');
      }
    }

    function snooze() {
      var s = getState();
      s.dismissedUntil = computeDismissUntil(Date.now(), DISMISS_DAYS);
      setState(s);
      track('pwa_prompt_snoozed', { placement: 'results' });
      var card = document.getElementById('pwa-card'); if (card) card.style.display = 'none';
    }

    function openIosModal(placement) {
      var m = document.getElementById('pwa-ios-modal'); if (m) m.style.display = 'flex';
      track('pwa_instructions_opened', { placement: placement || 'results' });
    }
    function closeIosModal() {
      var m = document.getElementById('pwa-ios-modal'); if (m) m.style.display = 'none';
    }

    function onSummaryShown() { renderResultsCard(); }

    function init() {
      recompute();
      if (branch === 'standalone') {
        track('pwa_launched_standalone');
        var s = getState();
        if (!s.installed) { s.installed = true; setState(s); track('pwa_installed', { method: 'standalone_detected' }); }
        hideInstallEntries();
        return;
      }
      var showEntry = (branch !== 'none');
      ['pwa-menu-btn', 'pwa-about-btn'].forEach(function (id) {
        var el = document.getElementById(id); if (el) el.style.display = showEntry ? '' : 'none';
      });
    }

    return {
      init: init,
      onSummaryShown: onSummaryShown,
      clickInstall: clickInstall,
      snooze: snooze,
      openIosModal: openIosModal,
      closeIosModal: closeIosModal
    };
  })();

```

- [ ] **Step 2: Wywołaj `pwaInstall.init()` w `DOMContentLoaded`**

Anchor — wewnątrz `DOMContentLoaded`, zaraz po bloku `ksap_meta` (~L1416), przed komentarzem o przycisku historii:

```js
    } catch(e) {}

    // Hide history button if no sessions
```

Zmień na:

```js
    } catch(e) {}

    // PWA: pokaż/ukryj wejścia instalacji wg kontekstu (po załadowaniu DOM).
    if (window.pwaInstall) pwaInstall.init();

    // Hide history button if no sessions
```

- [ ] **Step 3: Podłącz hook po wejściu na ekran wyników**

Anchor (~L2296):

```js
    showScreen('summary');
```

Zmień na:

```js
    showScreen('summary');
    if (window.pwaInstall) pwaInstall.onSummaryShown();
```

- [ ] **Step 4: Weryfikacja — logika gałęzi przez podmianę User-Agent**

Uruchom `cd web && python3 -m http.server 8000`, otwórz w Chrome `http://localhost:8000`, DevTools → More tools → Network conditions → User agent (lub device toolbar).

Dla każdego UA wpisz w Console `pwaInstall.onSummaryShown()` po ustawieniu UA i sprawdź widoczność/wariant karty oraz `window.dataLayer` (ostatnie wpisy):

| UA / kontekst | Oczekiwane |
|---|---|
| Domyślny desktop Chrome (bez `beforeinstallprompt`) | karta ukryta (`branch='none'`) |
| iPhone Safari (`...iPhone... Version/17 Safari/604.1`) | karta „Nie strać historii", klik „Zainstaluj" → modal iOS, event `pwa_instructions_opened` |
| Facebook in-app (`...[FBAN/...]`) | wariant „Otwórz w przeglądarce", eventy `pwa_inapp_detected` + `pwa_open_in_browser_hint_shown` |

> Natywny dialog Androida (`beforeinstallprompt`) na localhost zwykle nie wystąpi — to zachowanie zweryfikujemy na prod (Task 4).

- [ ] **Step 5: Weryfikacja — częstotliwość i standalone**

W Console:
- `pwaInstall.snooze()` → `localStorage.getItem('ksap_pwa')` zawiera `dismissedUntil` ~+4 dni; ponowne `pwaInstall.onSummaryShown()` → karta ukryta.
- Wyczyść: `localStorage.removeItem('ksap_pwa')`.
- Symuluj standalone: w device toolbar nie da się łatwo; zamiast tego sprawdź logikę: `detectPwaBranch({ua:navigator.userAgent, standalone:true, hasInstallPrompt:false})` → `'standalone'`.

- [ ] **Step 6: Weryfikacja — integracja z backupem**

W Console: `updateBackupNotes(true)` → notki w boksach backupu (Historia/Statystyki) zmieniają ton na „ryzyko małe". Potwierdza, że funkcja jest osiągalna z kontekstu PWA (używana po `appinstalled`).

- [ ] **Step 7: Checkpoint** — pokaż diff `web/index.html`. Zatrzymaj się; użytkownik decyduje o commicie. Sugerowany komunikat: `feat: wire PWA install controller (branches, prompt, analytics, backup sync)`.

---

## Task 4: Weryfikacja end-to-end + regresja

**Files:** brak zmian (chyba że weryfikacja ujawni błąd).

- [ ] **Step 1: Test logiki ponownie (regresja)**

Run: `node tools/test-pwa-install.js`
Expected: `OK — wszystkie testy pwa-install przeszły`

- [ ] **Step 2: Smoke regresji aplikacji**

Lokalnie przejdź pełną sesję (Nowa sesja → odpowiedz na pytania → ekran wyników).
Expected: ekran wyników działa jak wcześniej; karta PWA pojawia się pod wynikiem (wg gałęzi/UA); „Może później" ją chowa; backup boksy na Historii/Statystykach bez zmian; brak błędów w konsoli.

- [ ] **Step 3: Weryfikacja na produkcji (po deployu — wymaga decyzji użytkownika o deployu)**

Na `https://egzamin.kutra.pl` (GTM aktywny): GTM Preview / `dataLayer` w konsoli.
- Android Chrome: po sesji karta „Nie strać historii", klik „Zainstaluj" → natywny dialog; po instalacji event `appinstalled` → `pwa_installed`; kolejne wejście z ikony → `pwa_launched_standalone`; `/debug.html` pokazuje `persisted=TAK`.
- Eventy `pwa_prompt_shown` / `_clicked` / `_installed` widoczne w `dataLayer`.

- [ ] **Step 4: Zaktualizuj BACKLOG i przenieś do BACKLOG_DONE (po wdrożeniu na prod)**

Gdy feature działa na prod: zgodnie z CLAUDE.md przenieś „Zainstaluj aplikację (PWA install prompt)" z BACKLOG.md do BACKLOG_DONE.md (usuń wiersz z tabeli priorytetów **i** sekcję z opisem). Zaktualizuj też wpis „Trwałość danych" (instalacja PWA dostępna jako dźwignia).

- [ ] **Step 5: Checkpoint końcowy** — podsumuj wynik weryfikacji; użytkownik decyduje o commicie zmian w BACKLOG i o deployu.

---

## Self-Review (wykonane przy pisaniu planu)

- **Pokrycie speca:** wykrywanie 3 gałęzi (Task 1+3), trigger po sesji + menu + About (Task 2+3), cisza 4 dni (Task 1+3), modal iOS (Task 2+3), wariant in-app „otwórz w przeglądarce" (Task 2+3), pełny zestaw eventów `pwa_*` (Task 3), integracja `updateBackupNotes` po instalacji (Task 3), brak karty na Historii/Statystykach (świadomie pominięte), GTM prod-only (Task 4 weryfikacja). ✅
- **Brak placeholderów:** każdy krok ma pełny kod/komendę/oczekiwany wynik. ✅
- **Spójność nazw:** `detectPwaBranch`/`shouldShowResultsPrompt`/`computeDismissUntil` (moduł) używane identycznie w teście i kontrolerze; klucz `ksap_pwa`; funkcje kontrolera `init`/`onSummaryShown`/`clickInstall`/`snooze`/`openIosModal`/`closeIosModal` zgodne z onclickami w markupie. ✅
