/* Dane do prototypów części II (wiedza).
   Liczby pytań i tematy są REALNE (z puli 827 pytań). Postęp/skuteczność
   skuteczność (accuracy 0..1, null = brak danych) i pokrycie (answered/total)
   są ZMYŚLONE na potrzeby demo — tak by warianty miały co pokazać. */

window.PROTO = {
  // egzamin: 2026-07-04. „dziś" w prototypie: 2026-06-13 → ~21 dni.
  examDate: '2026-07-04',
  daysLeft: 21,
  totalQuestions: 827,
  // pochodzenie całej puli (realne dane)
  realCount: 263,      // prawdziwe pytania z egzaminów KSAP 2023–2025
  generatedCount: 564, // pytania ćwiczeniowe w tym samym stylu
  realByYear: { '2023': 86, '2024': 87, '2025': 90 },

  // accuracy: zmyślona skuteczność 0..1; answered: ile pytań z domeny user już widział
  domains: [
    {
      code: 'pr', name: 'Prawo', short: 'Prawo', color: '#2563eb',
      total: 242, real: 104, answered: 130, accuracy: 0.72,
      topics: [
        { id: 'pr.konstytucja-ustroj', name: 'Konstytucja i ustrój', count: 58, accuracy: 0.80, answered: 40 },
        { id: 'pr.sluzba-cywilna', name: 'Służba cywilna', count: 53, accuracy: 0.85, answered: 38 },
        { id: 'pr.informacja-publiczna-dane', name: 'Informacja publiczna i ochrona danych', count: 37, accuracy: 0.65, answered: 20 },
        { id: 'pr.zrodla-prawa', name: 'Źródła prawa', count: 27, accuracy: 0.70, answered: 14 },
        { id: 'pr.kpa', name: 'Postępowanie administracyjne (KPA)', count: 21, accuracy: 0.55, answered: 10 },
        { id: 'pr.prawo-ue', name: 'Prawo UE', count: 21, accuracy: 0.62, answered: 8 },
        { id: 'pr.sadownictwo', name: 'Sądownictwo', count: 14, accuracy: null, answered: 0 },
        { id: 'pr.prawo-miedzynarodowe', name: 'Prawo międzynarodowe', count: 11, accuracy: null, answered: 0 },
      ],
    },
    {
      code: 'se', name: 'Zagadnienia społeczne i ekonomiczne', short: 'Społ.-ekonom.', color: '#0891b2',
      total: 174, real: 28, answered: 60, accuracy: 0.45,
      topics: [
        { id: 'se.statystyka-pomiar', name: 'Statystyka i pomiar', count: 44, accuracy: 0.40, answered: 18 },
        { id: 'se.makroekonomia', name: 'Makroekonomia', count: 34, accuracy: 0.38, answered: 14 },
        { id: 'se.polityka-spoleczna-gospodarcza', name: 'Polityka społeczna i gospodarcza', count: 28, accuracy: 0.50, answered: 12 },
        { id: 'se.problemy-spoleczne', name: 'Problemy społeczne', count: 28, accuracy: 0.55, answered: 10 },
        { id: 'se.dochody-konsumpcja', name: 'Dochody i konsumpcja', count: 20, accuracy: 0.48, answered: 6 },
        { id: 'se.rynek-pracy', name: 'Rynek pracy', count: 20, accuracy: null, answered: 0 },
      ],
    },
    {
      code: 'ap', name: 'Administracja publiczna', short: 'Administracja', color: '#7c3aed',
      total: 146, real: 51, answered: 70, accuracy: 0.60,
      topics: [
        { id: 'ap.struktura-administracji', name: 'Struktura administracji', count: 109, accuracy: 0.62, answered: 55 },
        { id: 'ap.procesy-decyzyjne', name: 'Procesy decyzyjne', count: 27, accuracy: 0.55, answered: 12 },
        { id: 'ap.organy-wladzy', name: 'Organy władzy', count: 10, accuracy: 0.58, answered: 3 },
      ],
    },
    {
      code: 'fp', name: 'Finanse publiczne', short: 'Finanse', color: '#db2777',
      total: 131, real: 37, answered: 28, accuracy: 0.28,
      topics: [
        { id: 'fp.budzet-panstwa', name: 'Budżet państwa', count: 27, accuracy: 0.35, answered: 12 },
        { id: 'fp.dlug-publiczny', name: 'Dług publiczny', count: 18, accuracy: 0.22, answered: 6 },
        { id: 'fp.system-finansow', name: 'System finansów publicznych', count: 17, accuracy: 0.30, answered: 6 },
        { id: 'fp.podatki', name: 'Podatki', count: 16, accuracy: 0.25, answered: 4 },
        { id: 'fp.procedura-budzetowa', name: 'Procedura budżetowa', count: 12, accuracy: null, answered: 0 },
        { id: 'fp.kontrola-finansowa', name: 'Kontrola finansowa', count: 11, accuracy: null, answered: 0 },
        { id: 'fp.budzety-jst', name: 'Budżety JST', count: 10, accuracy: null, answered: 0 },
        { id: 'fp.fundusze-ue', name: 'Fundusze UE', count: 10, accuracy: null, answered: 0 },
        { id: 'fp.zamowienia-publiczne', name: 'Zamówienia publiczne', count: 10, accuracy: null, answered: 0 },
      ],
    },
    {
      code: 'pz', name: 'Polityka zagraniczna i org. międzynarodowe', short: 'Polityka zagr.', color: '#0d9488',
      total: 80, real: 20, answered: 64, accuracy: 0.81,
      topics: [
        { id: 'pz.organizacje-miedzynarodowe', name: 'Organizacje międzynarodowe', count: 58, accuracy: 0.84, answered: 50 },
        { id: 'pz.polityka-zagraniczna-rp', name: 'Polityka zagraniczna RP', count: 22, accuracy: 0.72, answered: 14 },
      ],
    },
    {
      code: 'oz', name: 'Organizacja i zarządzanie', short: 'Organizacja', color: '#ca8a04',
      total: 54, real: 23, answered: 6, accuracy: 0.12,
      topics: [
        { id: 'oz.zarzadzanie-podstawy', name: 'Podstawy zarządzania', count: 22, accuracy: 0.15, answered: 6 },
        { id: 'oz.zzl', name: 'Zarządzanie zasobami ludzkimi', count: 22, accuracy: null, answered: 0 },
        { id: 'oz.wspoldzialanie-dialog', name: 'Współdziałanie i dialog', count: 10, accuracy: null, answered: 0 },
      ],
    },
  ],

  // przykładowe, prawdziwe pytania (po kilka) do klikalnych sesji
  questions: [
    { id: 'w_pr_001', origin: 'ksap-2023', domain: 'pr', topicId: 'pr.informacja-publiczna-dane', topic: 'Informacja publiczna i ochrona danych', level: 'easy',
      question: 'Do szczególnych kategorii danych osobowych nie zalicza się:',
      options: ['danych o stanie zdrowia', 'przynależności do związku zawodowego', 'numeru PESEL', 'światopoglądu'],
      correct: 2,
      explanation: 'Katalog szczególnych kategorii danych z art. 9 ust. 1 RODO obejmuje m.in. pochodzenie rasowe lub etniczne, poglądy polityczne, przekonania religijne lub światopoglądowe, przynależność do związków zawodowych, dane genetyczne, biometryczne oraz dane dotyczące zdrowia i seksualności. Numer PESEL jest „zwykłą” daną osobową, choć podlega wzmożonej ostrożności przy przetwarzaniu.',
      source: 'RODO, art. 9 ust. 1' },

    { id: 'w_pr_008', origin: 'ksap-2023', domain: 'pr', topicId: 'pr.informacja-publiczna-dane', topic: 'Informacja publiczna i ochrona danych', level: 'hard',
      question: 'Organizacja pracy kancelarii tajnej zapewnia:',
      options: [
        'możliwość ustalenia, o ile jest to konieczne, gdzie znajduje się materiał o klauzuli „tajne” lub „ściśle tajne” oraz kto się z nim zapoznał',
        'możliwość ustalenia w każdych okolicznościach, gdzie znajduje się materiał oraz kto i kiedy się z nim zapoznał',
        'możliwość ustalenia, gdzie znajduje się materiał oraz kto i kiedy się z nim zapoznał',
        'możliwość ustalenia w każdych okolicznościach, gdzie znajduje się materiał oraz kto się z nim zapoznał',
      ],
      correct: 3,
      explanation: 'Zgodnie z art. 42 ust. 4 ustawy o ochronie informacji niejawnych organizacja pracy kancelarii tajnej zapewnia możliwość ustalenia w każdych okolicznościach, gdzie znajduje się materiał o klauzuli „tajne” lub „ściśle tajne” oraz kto się z nim zapoznał. Przepis nie wymaga ustalania, kiedy nastąpiło zapoznanie.',
      source: 'Ustawa o ochronie informacji niejawnych, art. 42 ust. 4' },

    { id: 'w_se_001', origin: 'ksap-2024', domain: 'se', topicId: 'se.dochody-konsumpcja', topic: 'Dochody i konsumpcja', level: 'easy',
      question: 'Od 1 stycznia 2026 roku wysokość minimalnego wynagrodzenia za pracę w Polsce wynosi:',
      options: ['4 242 zł', '4 666 zł', '4 806 zł', '5 010 zł'],
      correct: 2,
      explanation: 'Od 1 stycznia 2026 r. minimalne wynagrodzenie za pracę wynosi 4806 zł brutto, a minimalna stawka godzinowa 31,40 zł — obowiązuje jedna stawka na cały rok. Dystraktory to wartości historyczne: 4242 zł (pierwsza połowa 2024 r.) i 4666 zł (2025 r.).',
      source: 'Rozporządzenie RM ws. minimalnego wynagrodzenia w 2026 r.' },

    { id: 'w_se_010', origin: 'generated', domain: 'se', topicId: 'se.dochody-konsumpcja', topic: 'Dochody i konsumpcja', level: 'hard',
      question: 'Gospodarstwo domowe spłaca wieloletni kredyt hipoteczny o zmiennym oprocentowaniu. RPP istotnie podwyższyła stopy procentowe NBP. W konsekwencji:',
      options: [
        'rata kredytu wzrośnie po aktualizacji stawki referencyjnej, zmniejszając środki na konsumpcję i oszczędności',
        'rata kredytu nie zmieni się, bo jej wysokość ustalono w umowie w chwili zaciągnięcia kredytu',
        'rata kredytu zmaleje, bo banki obniżają marże, gdy rosną stopy NBP',
        'rata zmieni się dopiero przy nowej umowie, bo decyzje RPP dotyczą tylko nowych kredytów',
      ],
      correct: 0,
      explanation: 'Przy oprocentowaniu zmiennym koszt kredytu = stała marża banku + zmienna stawka referencyjna, która podąża za stopami NBP. Podwyżka stóp przekłada się więc na wzrost raty również w kredytach już spłacanych, co ogranicza fundusz nabywczy gospodarstwa.',
      source: 'Mechanizm polityki pieniężnej, stan 2026-06' },

    { id: 'w_ap_002', origin: 'generated', domain: 'ap', topicId: 'ap.organy-wladzy', topic: 'Organy władzy', level: 'easy',
      question: 'Najwyższa Izba Kontroli jest:',
      options: [
        'centralnym organem administracji rządowej, nadzorowanym przez Prezesa RM',
        'naczelnym organem kontroli państwowej, podległym Sejmowi',
        'organem wymiaru sprawiedliwości, niezależnym od pozostałych władz',
        'organem kontroli wewnętrznej rządu, podległym Radzie Ministrów',
      ],
      correct: 1,
      explanation: 'NIK jest naczelnym organem kontroli państwowej i podlega Sejmowi — kontroluje m.in. administrację rządową, więc nie może być jej częścią ani podlegać rządowi.',
      source: 'Konstytucja RP, art. 202 ust. 1 i 2' },

    { id: 'w_fp_001', origin: 'ksap-2025', domain: 'fp', topicId: 'fp.budzet-panstwa', topic: 'Budżet państwa', level: 'easy',
      question: 'Dotacjami kalkulowanymi według stawek jednostkowych są:',
      options: ['dotacje przedmiotowe', 'dotacje podmiotowe', 'dotacje celowe', 'dotacje rozwojowe'],
      correct: 0,
      explanation: 'Dotacje przedmiotowe to środki na dopłaty do określonych wyrobów lub usług, kalkulowane według stawek jednostkowych (art. 130 ust. 1 ustawy o finansach publicznych). Podmiotowe finansują bieżącą działalność, celowe — konkretne zadania; „dotacje rozwojowe” nie występują w ustawie.',
      source: 'Ustawa o finansach publicznych, art. 130 ust. 1' },

    { id: 'w_pz_001', origin: 'ksap-2023', domain: 'pz', topicId: 'pz.organizacje-miedzynarodowe', topic: 'Organizacje międzynarodowe', level: 'easy',
      question: '9 maja to Dzień Europy na pamiątkę:',
      options: ['deklaracji Schumana', 'zakończenia II wojny światowej', 'podpisania traktatów rzymskich', 'urodzin Jeana Monneta'],
      correct: 0,
      explanation: 'Dzień Europy (9 maja) upamiętnia deklarację Schumana z 9 maja 1950 r., która dała początek Europejskiej Wspólnocie Węgla i Stali. Traktaty rzymskie podpisano 25 marca 1957 r.',
      source: 'Deklaracja Schumana z 9 maja 1950 r.' },

    { id: 'w_pz_019', origin: 'generated', domain: 'pz', topicId: 'pz.organizacje-miedzynarodowe', topic: 'Organizacje międzynarodowe', level: 'hard',
      question: 'Zgodnie z Traktatem Północnoatlantyckim zbrojna napaść na jedno z państw członkowskich:',
      options: [
        'zobowiązuje pozostałych do natychmiastowego wypowiedzenia wojny agresorowi',
        'uruchamia pomoc wojskową dopiero po jednomyślnej zgodzie Zgromadzenia Parlamentarnego NATO',
        'jest traktowana jako napaść na wszystkich — każdy udzieli pomocy, jaką uzna za konieczną, łącznie z użyciem siły',
        'rodzi wyłącznie obowiązek konsultacji politycznych w Radzie Północnoatlantyckiej',
      ],
      correct: 2,
      explanation: 'Klauzula obrony kolektywnej (art. 5) nie oznacza automatycznego wypowiedzenia wojny — każde państwo samo decyduje, jaką pomoc uzna za konieczną. Ostatni dystraktor myli obronę kolektywną z mechanizmem konsultacji (art. 4).',
      source: 'Traktat Północnoatlantycki, art. 5' },

    { id: 'demo_oz_1', origin: 'generated', domain: 'oz', topicId: 'oz.zarzadzanie-podstawy', topic: 'Podstawy zarządzania', level: 'medium',
      question: 'Cykl zarządzania PDCA (koło Deminga) obejmuje kolejno fazy:',
      options: [
        'Planuj – Wykonaj – Sprawdź – Działaj (Plan-Do-Check-Act)',
        'Przygotuj – Deleguj – Kontroluj – Archiwizuj',
        'Planuj – Decyduj – Komunikuj – Audytuj',
        'Projektuj – Dostarcz – Certyfikuj – Adaptuj',
      ],
      correct: 0,
      explanation: 'Cykl PDCA Deminga to iteracyjny model ciągłego doskonalenia: Plan (zaplanuj), Do (wykonaj), Check (sprawdź wyniki), Act (wdroż usprawnienia). Stanowi podstawę systemów zarządzania jakością.',
      source: 'Podstawy zarządzania jakością (cykl Deminga)' },

    { id: 'demo_fp_2', origin: 'generated', domain: 'fp', topicId: 'fp.dlug-publiczny', topic: 'Dług publiczny', level: 'medium',
      question: 'Konstytucyjny limit państwowego długu publicznego w relacji do PKB wynosi:',
      options: ['55%', '60%', '3%', '43%'],
      correct: 1,
      explanation: 'Art. 216 ust. 5 Konstytucji RP zakazuje zaciągania pożyczek lub udzielania gwarancji, w wyniku których państwowy dług publiczny przekroczy 3/5 (60%) wartości rocznego PKB. Próg 55% to jeden z progów ostrożnościowych ustawy o finansach publicznych, a 3% odnosi się do deficytu wg kryteriów z Maastricht.',
      source: 'Konstytucja RP, art. 216 ust. 5' },
  ],
};


// Zgodność wsteczna: warianty B/C/D/E używają pola `mastery` jako „poziomu opanowania".
// Tu `accuracy` jest źródłem prawdy (skuteczność); backfillujemy `mastery` (null -> 0).
(function (P) {
  function bf(o) { o.mastery = (o.accuracy == null ? 0 : o.accuracy); }
  P.domains.forEach(function (d) { bf(d); (d.topics || []).forEach(bf); });
})(window.PROTO);
