// web/social-proof.js
// Czysta logika licznika social proof: zaokrąglanie liczby odpowiedzi do
// "ładnego" progu i decyzja o widoczności linijki. Bez DOM-u — testowalne.
// Dane (liczba) są w web/stats.js; glue DOM-owy w index.html (initSocialProof).
(function (root) {
  // <1000 -> w dół do pełnych setek; >=1000 -> w dół do pełnych 500.
  function floorToNice(n) {
    return Math.floor(n / 100) * 100;
  }

  // Zwraca gotowy tekst albo null (gdy brak danych / poniżej progu widoczności).
  function buildSocialProofText(answered, threshold) {
    if (typeof answered !== 'number' || !isFinite(answered)) return null;
    if (answered < threshold) return null;
    return 'Odpowiedzieliście już na ponad ' + floorToNice(answered) + ' pytań';
  }

  root.floorToNice = floorToNice;
  root.buildSocialProofText = buildSocialProofText;
})(typeof window !== 'undefined' ? window : globalThis);
