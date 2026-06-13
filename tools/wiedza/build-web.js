// tools/wiedza/build-web.js
// Build: data/wiedza/output/questions-wiedza.json -> web/questions-wiedza.js
// Opakowuje płaską tablicę pytań w global window.QUESTIONS_WIEDZA (ładowany <script src>).
// Czysta funkcja buildSource jest testowalna; CLI czyta plik źródłowy i zapisuje wynik.
const fs = require('fs');
const path = require('path');

function buildSource(questions) {
  if (!Array.isArray(questions)) throw new Error('build-web: oczekiwano tablicy pytań');
  return '// AUTOGENEROWANE przez tools/wiedza/build-web.js — nie edytuj ręcznie.\n'
    + 'window.QUESTIONS_WIEDZA = ' + JSON.stringify(questions) + ';\n';
}

if (require.main === module) {
  const SRC = path.join(__dirname, '..', '..', 'data', 'wiedza', 'output', 'questions-wiedza.json');
  const OUT = path.join(__dirname, '..', '..', 'web', 'questions-wiedza.js');
  const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  const arr = Array.isArray(data) ? data : data.questions;
  fs.writeFileSync(OUT, buildSource(arr));
  console.log('✅ Zapisano ' + OUT + ' (' + arr.length + ' pytań)');
}

module.exports = { buildSource };
