// web/session-wiedza.js
// Dobór sesji części II (sprawdzian wiedzy): filtr dziedzin + poziomu,
// losowanie z least-recently-seen (anti-repeat). Rozkład dziedzin wychodzi
// proporcjonalnie do wielkości (prze)filtrowanej puli. 15 pytań. Czysta i testowalna.
// (Lokalna kopia sortLRS — moduł niezależny od session-blueprint.js.)
(function (root) {
  'use strict';
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

  function composeWiedzaSession(pool, opts, lastSeen, rng) {
    rng = rng || Math.random;
    lastSeen = lastSeen || Object.create(null);
    opts = opts || {};
    var domains = (opts.domains && opts.domains.length) ? opts.domains : null;
    var level = (opts.level && opts.level !== 'all') ? opts.level : null;
    var realOnly = !!opts.realOnly;
    var size = opts.size || SESSION_SIZE;

    var filtered = (pool || []).filter(function (q) {
      if (domains && domains.indexOf(q.domain) === -1) return false;
      if (level && q.level !== level) return false;
      if (realOnly && (!q.origin || q.origin === 'generated')) return false;
      return true;
    });
    sortLRS(filtered, lastSeen, rng);
    return filtered.slice(0, size);
  }

  var api = { composeWiedzaSession: composeWiedzaSession, SESSION_SIZE: SESSION_SIZE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.composeWiedzaSession = composeWiedzaSession; root.SESSION_WIEDZA = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
