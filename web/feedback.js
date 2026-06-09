// web/feedback.js
// Czysta logika flow satysfakcji + polecenia (cooldown, próg proaktywny, treść share).
// Bez DOM, bez side-effectów. Testowane przez tools/test-feedback.js (node + vm).
// Eksport: window (przeglądarka) lub globalThis (node/vm).
(function (root) {
  'use strict';

  var FEEDBACK_COOLDOWN_DAYS = 5;
  var FEEDBACK_PROACTIVE_MIN_ANSWERS = 45;
  var FEEDBACK_SHARE_URL = 'https://egzamin.kutra.pl/';
  var FEEDBACK_SHARE_TITLE = 'Ćwiczenia przed egzaminem na urzędnika mianowanego';
  var FEEDBACK_SHARE_TEXT = 'Jeśli też przygotowujesz się do egzaminu na urzędnika mianowanego (Sprawdzian Umiejętności KSAP) — jest darmowa strona do ćwiczeń, polecam: ';

  var DAY_MS = 24 * 60 * 60 * 1000;

  // completedAtMs: epoch (ms) ostatniego ukończenia, 0/falsy = nigdy.
  function isInCooldown(completedAtMs, nowMs) {
    if (!completedAtMs) return false;
    return (nowMs - completedAtMs) < (FEEDBACK_COOLDOWN_DAYS * DAY_MS);
  }

  // value: 'up'|'down'. Zwraca { action:'open'|'ack', stage:'2A'|'2B' }.
  // 👎 zawsze otwiera 2B (omija cooldown). 👍 w cooldownie → ack (bez modala).
  function decideThumbClick(opts) {
    opts = opts || {};
    if (opts.value === 'down') return { action: 'open', stage: '2B' };
    if (isInCooldown(opts.completedAtMs, opts.nowMs)) return { action: 'ack', stage: '2A' };
    return { action: 'open', stage: '2A' };
  }

  // Czy pokazać proaktywny modal na summary.
  function shouldShowProactive(opts) {
    opts = opts || {};
    if (opts.voted) return false;
    if ((opts.answerCount || 0) < FEEDBACK_PROACTIVE_MIN_ANSWERS) return false;
    if (opts.proactiveAtMs && (opts.nowMs - opts.proactiveAtMs) < (FEEDBACK_COOLDOWN_DAYS * DAY_MS)) return false;
    return true;
  }

  function buildShareMessage() {
    return FEEDBACK_SHARE_TEXT + FEEDBACK_SHARE_URL;
  }

  root.FEEDBACK_COOLDOWN_DAYS = FEEDBACK_COOLDOWN_DAYS;
  root.FEEDBACK_PROACTIVE_MIN_ANSWERS = FEEDBACK_PROACTIVE_MIN_ANSWERS;
  root.FEEDBACK_SHARE_URL = FEEDBACK_SHARE_URL;
  root.FEEDBACK_SHARE_TITLE = FEEDBACK_SHARE_TITLE;
  root.FEEDBACK_SHARE_TEXT = FEEDBACK_SHARE_TEXT;
  root.isInCooldown = isInCooldown;
  root.decideThumbClick = decideThumbClick;
  root.shouldShowProactive = shouldShowProactive;
  root.buildShareMessage = buildShareMessage;
})(typeof window !== 'undefined' ? window : globalThis);
