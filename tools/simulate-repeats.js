// tools/simulate-repeats.js
// Symuluje N kolejnych buildSession() wg logiki least-recently-seen i raportuje
// powtórki per typ. Dowód, że bank starcza na zadaną liczbę sesji bez powtórki.
// Użycie: node tools/simulate-repeats.js [easy|hard] [liczbaSesji]
const fs = require('fs');
const vm = require('vm');

const DIFF = (process.argv[2] || 'easy').toLowerCase();
const SESSIONS = parseInt(process.argv[3] || '25', 10);
const BLUEPRINT = { 1: 2, 2: 2, 3: 2, 4: 1, 5: 4, 6: 2, 7: 1, 8: 1 };

function loadBanks(path) {
  let code = fs.readFileSync(path, 'utf8');
  code += '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = (typeof QUESTIONS_HARD!=="undefined")?QUESTIONS_HARD:null;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(code, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
}
// IDENTYCZNA logika jak pickLeastRecentlySeen w web/index.html (Task 1).
function pickLeastRecentlySeen(pool, need, lastSeen) {
  shuffle(pool);
  pool.sort(function(a, b) {
    const ta = lastSeen[a.id], tb = lastSeen[b.id];
    const ua = (ta === undefined), ub = (tb === undefined);
    if (ua && ub) return 0;
    if (ua) return -1; if (ub) return 1;
    if (ta < tb) return -1; if (ta > tb) return 1;
    return 0;
  });
  return pool.slice(0, need);
}

function main() {
  const { easy, hard } = loadBanks('web/questions-unified.js');
  const bank = DIFF === 'hard' ? hard : easy;
  if (!bank) { console.error('Brak banku dla poziomu ' + DIFF); process.exit(1); }

  const lastSeen = Object.create(null);
  const repeatsByType = {}; for (let t = 1; t <= 8; t++) repeatsByType[t] = 0;
  let firstRepeatSession = null;
  let tick = 0;

  for (let s = 1; s <= SESSIONS; s++) {
    const picked = [];
    for (let t = 1; t <= 8; t++) {
      const pool = (bank['type' + t] || []).slice();
      const got = pickLeastRecentlySeen(pool, BLUEPRINT[t] || 0, lastSeen);
      got.forEach((q) => picked.push({ q: q, t: t }));
    }
    picked.forEach(({ q, t }) => {
      if (lastSeen[q.id] !== undefined) {
        repeatsByType[t]++;
        if (firstRepeatSession === null) firstRepeatSession = s;
      }
    });
    picked.forEach(({ q }) => { lastSeen[q.id] = String(1e12 + (tick++)); });
  }

  const totalRepeats = Object.values(repeatsByType).reduce((a, b) => a + b, 0);
  console.log(`Poziom: ${DIFF}, sesji: ${SESSIONS}`);
  for (let t = 1; t <= 8; t++) {
    const pool = (bank['type' + t] || []).length;
    console.log(`  typ ${t}: pula ${pool}, losowane/sesję ${BLUEPRINT[t]}, powtórek: ${repeatsByType[t]}`);
  }
  console.log(`Pierwsza sesja z powtórką: ${firstRepeatSession === null ? 'brak' : firstRepeatSession}`);
  console.log(`Suma powtórek w ${SESSIONS} sesjach: ${totalRepeats}`);
  process.exit(totalRepeats === 0 ? 0 : 2);
}
main();
