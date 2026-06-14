// web/wiedza-stats.js
// Czysta agregacja statystyk części II (wiedza) z ksap_answer_log.
// Skuteczność (accuracy) i pokrycie (seen/total) per dziedzina i per temat.
// Join qId -> question (domain, topicId). Bez DOM, testowalne node-em.
(function (root) {
  'use strict';

  function blankStat(total) {
    return { total: total || 0, seen: 0, attempts: 0, correct: 0, accuracy: null };
  }
  function finalize(stat) {
    stat.accuracy = stat.attempts ? stat.correct / stat.attempts : null;
    return stat;
  }

  function aggregateWiedzaStats(log, questions) {
    questions = questions || [];
    log = log || [];

    var byId = Object.create(null);
    var domains = Object.create(null);
    var topics = Object.create(null);

    // totale z puli pytań
    questions.forEach(function (q) {
      if (!q || !q.id) return;
      byId[q.id] = q;
      if (q.domain) {
        if (!domains[q.domain]) domains[q.domain] = blankStat(0);
        domains[q.domain].total++;
      }
      if (q.topicId) {
        if (!topics[q.topicId]) topics[q.topicId] = blankStat(0);
        topics[q.topicId].total++;
      }
    });

    var seenDomain = Object.create(null); // code -> Set(qId)
    var seenTopic = Object.create(null);  // topicId -> Set(qId)
    function seenSet(map, key) { return (map[key] || (map[key] = Object.create(null))); }

    log.forEach(function (e) {
      if (!e || !e.qId) return;
      var q = byId[e.qId];
      if (!q) return; // nie-wiedza / nieznane
      var dStat = domains[q.domain], tStat = topics[q.topicId];
      if (dStat) {
        dStat.attempts++; if (e.ok) dStat.correct++;
        var ds = seenSet(seenDomain, q.domain); if (!ds[e.qId]) { ds[e.qId] = 1; dStat.seen++; }
      }
      if (tStat) {
        tStat.attempts++; if (e.ok) tStat.correct++;
        var ts = seenSet(seenTopic, q.topicId); if (!ts[e.qId]) { ts[e.qId] = 1; tStat.seen++; }
      }
    });

    Object.keys(domains).forEach(function (k) { finalize(domains[k]); });
    Object.keys(topics).forEach(function (k) { finalize(topics[k]); });

    return { domains: domains, topics: topics };
  }

  var api = { aggregateWiedzaStats: aggregateWiedzaStats };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.aggregateWiedzaStats = aggregateWiedzaStats; root.WIEDZA_STATS = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this);
