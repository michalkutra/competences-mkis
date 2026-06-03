// tools/append-questions.js
// Dołącza nowe pytania do web/questions-unified.js bez ruszania istniejących.
// Wejście JSON: { "easy": { "type5": [ {..bez id..}, ... ] }, "hard": { ... } }
// Skrypt nadaje ID (kolejne po max), ustawia typeId i level, serializuje tablice
// w miejscu, robi backup .bak i sanity-check (parsowalność + liczby).
// Użycie: node tools/append-questions.js tools/new-questions/plik.json [web/questions-unified.js]
const fs = require('fs');
const vm = require('vm');

const INPUT = process.argv[2];
const PATH = process.argv[3] || 'web/questions-unified.js';
if (!INPUT) { console.error('Podaj plik JSON z pytaniami'); process.exit(1); }

function loadBanks(code) {
  const c = code + '\n;globalThis.__E = QUESTIONS_EASY; globalThis.__H = QUESTIONS_HARD;';
  const ctx = {}; ctx.globalThis = ctx; vm.createContext(ctx); vm.runInContext(c, ctx);
  return { easy: ctx.__E, hard: ctx.__H };
}
function pad(n) { return String(n).padStart(3, '0'); }
function maxSuffix(arr) {
  let m = 0; arr.forEach((q) => { const mm = /_(\d{3})$/.exec(q.id || ''); if (mm) m = Math.max(m, parseInt(mm[1], 10)); });
  return m;
}

// Skaner zakresu tablicy po markerze "\n  typeN: [" w obrębie [from..to). Pomija
// nawiasy w stringach. Zwraca {open, close} obejmujące '[' ... ']'.
function arrayRange(src, marker, from, to) {
  const start = src.indexOf(marker, from);
  if (start < 0 || start >= to) throw new Error('Nie znaleziono ' + JSON.stringify(marker));
  const open = src.indexOf('[', start);
  let depth = 0, i = open, inStr = false, quote = '', esc = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) { if (esc) { esc = false; continue; } if (ch === '\\') { esc = true; continue; } if (ch === quote) inStr = false; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; quote = ch; continue; }
    if (ch === '[') depth++; else if (ch === ']') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) throw new Error('Niezbalansowane nawiasy dla ' + marker);
  return { open: open, close: i };
}
function serializeArray(arr) {
  return '[\n' + arr.map((q) => '    ' + JSON.stringify(q)).join(',\n') + '\n  ]';
}

function main() {
  const src = fs.readFileSync(PATH, 'utf8');
  const input = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const { easy, hard } = loadBanks(src);
  const hardObjStart = src.indexOf('const QUESTIONS_HARD');
  if (hardObjStart < 0) throw new Error('Brak QUESTIONS_HARD');

  const edits = [];
  const plan = [];
  [['easy', 'e', input.easy || {}, 0, hardObjStart], ['hard', 'h', input.hard || {}, hardObjStart, src.length]]
    .forEach(([levelName, prefix, group, from, to]) => {
      const bank = levelName === 'easy' ? easy : hard;
      Object.keys(group).forEach((typeKey) => {
        const t = parseInt(typeKey.replace('type', ''), 10);
        const existing = (bank[typeKey] || []).slice();
        let n = maxSuffix(existing);
        const added = group[typeKey].map((q) => {
          n += 1;
          return Object.assign({}, q, { id: `${prefix}_t${t}_${pad(n)}`, typeId: t, level: levelName });
        });
        const merged = existing.concat(added);
        const range = arrayRange(src, `\n  ${typeKey}: [`, from, to);
        edits.push({ open: range.open, close: range.close, text: serializeArray(merged) });
        plan.push(`${levelName}.${typeKey}: ${existing.length} -> ${merged.length} (+${added.length})`);
      });
    });

  edits.sort((a, b) => b.open - a.open);
  let out = src;
  edits.forEach((e) => { out = out.slice(0, e.open) + e.text + out.slice(e.close + 1); });

  loadBanks(out);

  fs.writeFileSync(PATH + '.bak', src);
  fs.writeFileSync(PATH, out);
  console.log('Dołączono:\n  ' + plan.join('\n  ') + `\n(backup: ${PATH}.bak)`);
}
main();
