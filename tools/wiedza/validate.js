// tools/wiedza/validate.js
// Walidator schematu puli pytań części II (sprawdzian wiedzy) + statystyki.
// Sprawdza: pola i typy per pytanie, 4 opcje z prefiksami "A) ".."D) ", correct 0-3,
// niepuste explanation/source/question, topicId istnieje w taxonomy.json, spójność
// domain↔topicId, format i unikalność id, duplikaty treści w całej puli (normalizacja).
// Drukuje statystyki per typ / trudność / origin / domena. Exit code != 0 przy błędach.
// Użycie:
//   node tools/wiedza/validate.js data/wiedza/output/questions-wiedza.json
//   node tools/wiedza/validate.js --batch data/wiedza/output/generated/batch-*.json
// Tryb --batch: id może być tymczasowe (format/unikalność id => ostrzeżenie, nie błąd).
const fs = require('fs');
const path = require('path');

const TAXONOMY_PATH = path.join(__dirname, '..', '..', 'data', 'wiedza', 'analysis', 'taxonomy.json');
const DOMAINS = ['pr', 'ap', 'fp', 'pz', 'oz', 'se'];
const LEVELS = ['easy', 'medium', 'hard'];
const ORIGINS = ['ksap-2025', 'ksap-2024', 'ksap-2023', 'generated'];
const OPTION_PREFIXES = ['A) ', 'B) ', 'C) ', 'D) '];

function isStr(v) { return typeof v === 'string' && v.trim().length > 0; }

function normalizeText(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-̧]/g, '').replace(/\s+/g, '');
}

function loadQuestions(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const arr = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(arr)) throw new Error(`${file}: oczekiwano tablicy pytań (lub {questions: [...]})`);
  return arr;
}

function main() {
  const args = process.argv.slice(2);
  const batchMode = args[0] === '--batch';
  const files = batchMode ? args.slice(1) : args;
  if (files.length === 0) {
    console.error('Użycie: node tools/wiedza/validate.js [--batch] <plik.json> [...]');
    process.exit(2);
  }

  const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  const topicIds = new Set(taxonomy.topics.map((t) => t.topicId));

  const errors = [];
  const warnings = [];
  const all = [];
  for (const f of files) {
    try {
      for (const q of loadQuestions(f)) all.push({ q, file: f });
    } catch (e) {
      errors.push(`${f}: nie można wczytać — ${e.message}`);
    }
  }

  const ids = new Map();
  const contentKeys = new Map();
  for (const { q, file } of all) {
    const label = `${path.basename(file)}#${q.id || '(brak id)'}`;

    // id
    if (!isStr(q.id)) errors.push(`${label}: brak id`);
    else {
      const idOk = /^w_(pr|ap|fp|pz|oz|se)_\d{3}$/.test(q.id);
      if (!idOk) (batchMode ? warnings : errors).push(`${label}: zły format id (oczekiwano w_<dom>_NNN)`);
      if (ids.has(q.id)) (batchMode ? warnings : errors).push(`${label}: zduplikowane id (też w ${ids.get(q.id)})`);
      ids.set(q.id, path.basename(file));
      if (idOk && isStr(q.domain) && !q.id.startsWith(`w_${q.domain}_`)) errors.push(`${label}: id nie pasuje do domain=${q.domain}`);
    }

    // pola proste
    if (!DOMAINS.includes(q.domain)) errors.push(`${label}: domain=${q.domain} spoza ${DOMAINS.join(',')}`);
    if (!isStr(q.topicId)) errors.push(`${label}: brak topicId`);
    else {
      if (!topicIds.has(q.topicId)) errors.push(`${label}: topicId=${q.topicId} nie istnieje w taxonomy.json`);
      if (isStr(q.domain) && !q.topicId.startsWith(q.domain + '.')) errors.push(`${label}: topicId=${q.topicId} niezgodny z domain=${q.domain}`);
    }
    if (!LEVELS.includes(q.level)) errors.push(`${label}: level=${q.level} spoza ${LEVELS.join(',')}`);
    if (!isStr(q.instruction)) errors.push(`${label}: brak instruction`);
    if (!isStr(q.question)) errors.push(`${label}: brak question`);
    if (!isStr(q.explanation)) errors.push(`${label}: puste explanation`);
    if (!isStr(q.source)) errors.push(`${label}: puste source`);
    if (!ORIGINS.includes(q.origin)) errors.push(`${label}: origin=${q.origin} spoza ${ORIGINS.join(',')}`);
    if (!isStr(q.legalState) || !/^\d{4}-\d{2}$/.test(q.legalState)) errors.push(`${label}: legalState=${q.legalState} (oczekiwano RRRR-MM)`);

    // opcje
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${label}: options.length=${(q.options || []).length} (oczekiwano 4)`);
    } else {
      q.options.forEach((opt, i) => {
        if (!isStr(opt)) errors.push(`${label}: opcja ${i} pusta`);
        else if (!opt.startsWith(OPTION_PREFIXES[i])) errors.push(`${label}: opcja ${i} bez prefiksu "${OPTION_PREFIXES[i]}"`);
        else if (opt.length <= OPTION_PREFIXES[i].length) errors.push(`${label}: opcja ${i} ma sam prefiks`);
        if (typeof opt === 'string' && opt.includes('*')) errors.push(`${label}: opcja ${i} zawiera "*"`);
      });
    }
    if (typeof q.correct !== 'number' || !Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) {
      errors.push(`${label}: correct=${q.correct} poza zakresem 0-3`);
    }

    // duplikaty treści w całej podanej puli
    if (isStr(q.question)) {
      const key = normalizeText(q.question).slice(0, 120);
      if (contentKeys.has(key)) errors.push(`${label}: duplikat treści z ${contentKeys.get(key)}`);
      else contentKeys.set(key, label);
    }
  }

  // statystyki
  const stat = (keyFn) => {
    const m = {};
    for (const { q } of all) { const k = keyFn(q) || '(brak)'; m[k] = (m[k] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  };
  console.log(`Pytań łącznie: ${all.length} (plików: ${files.length})\n`);
  console.log('Per domena: ' + stat((q) => q.domain).map(([k, v]) => `${k}=${v}`).join('  '));
  console.log('Per trudność: ' + stat((q) => q.level).map(([k, v]) => `${k}=${v}`).join('  '));
  console.log('Per origin: ' + stat((q) => q.origin).map(([k, v]) => `${k}=${v}`).join('  '));
  console.log('Rozkład correct: ' + stat((q) => 'idx' + q.correct).map(([k, v]) => `${k}=${v}`).join('  '));
  console.log('\nPer typ:');
  for (const [k, v] of stat((q) => q.topicId)) console.log(`  ${k}: ${v}`);

  if (warnings.length) {
    console.log(`\n⚠️  Ostrzeżenia (${warnings.length}):`);
    warnings.slice(0, 40).forEach((w) => console.log('  - ' + w));
    if (warnings.length > 40) console.log(`  ... i ${warnings.length - 40} więcej`);
  }
  if (errors.length) {
    console.error(`\n❌ WALIDACJA NIEUDANA — ${errors.length} błędów:`);
    errors.slice(0, 80).forEach((m) => console.error('  - ' + m));
    if (errors.length > 80) console.error(`  ... i ${errors.length - 80} więcej`);
    process.exit(1);
  }
  console.log('\n✅ WALIDACJA OK');
}

main();
