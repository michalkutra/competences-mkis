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

    // iOS Safari — NIGDY nie ma natywnej instalacji PWA, zawsze instrukcja ręczna.
    // Priorytet PRZED 'native': nawet jeśli środowisko zgłosi beforeinstallprompt
    // (np. desktop Chrome z podmienionym UA w testach), na iOS i tak nie zadziała.
    if (isIOS) return 'ios-instructions';

    // Natywny prompt dostępny (Android Chrome/Samsung, desktop Chrome/Edge).
    if (env.hasInstallPrompt) return 'native';

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
