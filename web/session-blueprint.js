// web/session-blueprint.js
// Dobór pytań do sesji: filozofia „pokrycie + zmienność".
// FIXED (12): 3 sylogizmy + 2 relacje + po 1 z Typ 1/2/3/4/6/7/8.
// RANDOM (3): z całej reszty (dowolny typ), z dedup i least-recently-seen.
// composeSession jest czysta i testowalna; index.html ją wywołuje.
(function (root) {
  'use strict';

  var FIXED = [
    { typeId: 5, variant: 'sylogizm', n: 3 },
    { typeId: 5, variant: 'relacje', n: 2 },
    { typeId: 1, n: 1 }, { typeId: 2, n: 1 }, { typeId: 3, n: 1 },
    { typeId: 4, n: 1 }, { typeId: 6, n: 1 }, { typeId: 7, n: 1 }, { typeId: 8, n: 1 },
  ];
  var SESSION_SIZE = 15;

  function shuffleWith(arr, rng) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function sortLRS(pool, lastSeen, rng) {
    shuffleWith(pool, rng);
    pool.sort(function (a, b) {
      var ta = lastSeen[a.id], tb = lastSeen[b.id];
      var ua = ta === undefined, ub = tb === undefined;
      if (ua && ub) return 0;
      if (ua) return -1;
      if (ub) return 1;
      return ta < tb ? -1 : ta > tb ? 1 : 0;
    });
    return pool;
  }

  function poolFor(bank, slot) {
    var arr = (bank['type' + slot.typeId] || []);
    if (slot.variant) arr = arr.filter(function (q) { return q.variant === slot.variant; });
    return arr.slice();
  }

  function composeSession(bank, lastSeen, rng) {
    rng = rng || Math.random;
    lastSeen = lastSeen || Object.create(null);
    var chosen = [];
    var usedIds = Object.create(null);

    FIXED.forEach(function (slot) {
      var pool = poolFor(bank, slot).filter(function (q) { return !usedIds[q.id]; });
      sortLRS(pool, lastSeen, rng);
      pool.slice(0, slot.n).forEach(function (q) { chosen.push(q); usedIds[q.id] = true; });
    });

    var rest = [];
    for (var t = 1; t <= 8; t++) {
      (bank['type' + t] || []).forEach(function (q) { if (!usedIds[q.id]) rest.push(q); });
    }
    sortLRS(rest, lastSeen, rng);
    var need = SESSION_SIZE - chosen.length;
    rest.slice(0, need).forEach(function (q) { chosen.push(q); usedIds[q.id] = true; });

    return shuffleWith(chosen, rng);
  }

  var api = { composeSession: composeSession, FIXED: FIXED, SESSION_SIZE: SESSION_SIZE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.composeSession = composeSession; root.SESSION_PLAN = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
