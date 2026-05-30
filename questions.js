const QUESTIONS = {
  type1: [
    {
      id: "t1_001", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["lekarz", "szpital"], rightTop: "urzędnik",
      options: ["A) urząd", "B) formalność", "C) procedura", "D) administracja"],
      correct: 0,
      explanation: "Lekarz pracuje w szpitalu — szpital to miejsce pracy lekarza. Analogicznie urzędnik pracuje w urzędzie, które jest jego miejscem pracy. Pozostałe opcje opisują tryb pracy lub ogólną kategorię działania, nie miejsce zatrudnienia."
    },
    {
      id: "t1_002", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Polska", "Europa"], rightTop: "Japonia",
      options: ["A) Azja", "B) Pacyfik", "C) Tokio", "D) Chiny", "E) Wschód"],
      correct: 0,
      explanation: "Polska leży na kontynencie Europa. Analogicznie Japonia leży na kontynencie Azja. Pacyfik to ocean, Tokio to stolica Japonii, a Chiny i Wschód nie są kontynentami."
    },
    {
      id: "t1_003", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Sejm", "ustawodawstwo"], rightTop: "sąd",
      options: ["A) wymiar sprawiedliwości", "B) prawo", "C) prokuratura", "D) policja"],
      correct: 0,
      explanation: "Sejm realizuje funkcję ustawodawstwa — jest to jego kompetencja ustrojowa. Analogicznie sąd realizuje wymiar sprawiedliwości, czyli to jego konstytucyjna kompetencja. Prawo to ogólna dziedzina, a prokuratura i policja to odrębne organy o innych funkcjach."
    },
    {
      id: "t1_004", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["skrzypce", "smyczek"], rightTop: "pędzel",
      options: ["A) farba", "B) obraz", "C) płótno", "D) paleta", "E) sztaluga"],
      correct: 2,
      explanation: "Skrzypce są instrumentem, a smyczek to narzędzie służące do gry na skrzypcach — smyczek przesuwa się po strunach. Analogicznie pędzel to narzędzie, które nakłada farbę na płótno — płótno jest materiałem, po którym pracuje pędzel. Farba to materiał nanoszona pędzlem, nie materiał po którym się pracuje."
    },
    {
      id: "t1_005", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["minister", "wiceminister"], rightTop: "dyrektor generalny",
      options: ["A) dyrektor departamentu", "B) sekretarz stanu", "C) minister", "D) naczelnik wydziału"],
      correct: 0,
      explanation: "Minister jest przełożonym wiceministra w hierarchii rządowej. Analogicznie dyrektor generalny jest przełożonym dyrektora departamentu w strukturze ministerstwa. Sekretarz stanu jest równorzędny lub wyższy od dyrektora generalnego, a naczelnik wydziału podlega dyrektorowi departamentu."
    },
    {
      id: "t1_006", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["entomologia", "owady"], rightTop: "geologia",
      options: ["A) skały", "B) geografia", "C) gleba", "D) minerały", "E) tektonika"],
      correct: 0,
      explanation: "Entomologia to dziedzina nauki, której przedmiotem badań są owady. Analogicznie geologia to dziedzina nauki, której przedmiotem badań są skały i procesy z nimi związane. Minerały to część geologii, ale skały to najbliższy i pełniejszy odpowiednik owadów w tej analogii."
    },
    {
      id: "t1_007", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Kodeks postępowania administracyjnego", "decyzja administracyjna"], rightTop: "Kodeks cywilny",
      options: ["A) umowa", "B) sąd", "C) wyrok", "D) prawo", "E) notariusz"],
      correct: 0,
      explanation: "Kodeks postępowania administracyjnego reguluje tryb wydawania decyzji administracyjnych — decyzja jest głównym aktem stosowania KPA. Analogicznie Kodeks cywilny reguluje zawieranie umów — umowa jest podstawowym aktem stosowania KC w obrocie cywilnoprawnym."
    },
    {
      id: "t1_008", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["dąb", "żołądź"], rightTop: "klon",
      options: ["A) skrzydlak", "B) liść", "C) konar", "D) pień"],
      correct: 0,
      explanation: "Żołądź to owoc dębu — produkt reprodukcyjny tego drzewa. Analogicznie skrzydlak (nasienie z skrzydełkiem) to owoc klonu. Liść, konar i pień to części drzewa, nie jego owoce."
    },
    {
      id: "t1_009", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Polska", "złoty"], rightTop: "Niemcy",
      options: ["A) euro", "B) marka", "C) frank", "D) dolar", "E) korona"],
      correct: 0,
      explanation: "Złoty to waluta narodowa Polski. Analogicznie euro jest walutą Niemiec — Niemcy należą do strefy euro od 2002 roku. Marka była dawną walutą Niemiec, ale nie jest aktualną."
    },
    {
      id: "t1_010", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["pilot", "samolot"], rightTop: "kapitan",
      options: ["A) statek", "B) port", "C) ocean", "D) marynarz"],
      correct: 0,
      explanation: "Pilot prowadzi samolot — jest osobą kierującą tym pojazdem. Analogicznie kapitan dowodzi statkiem i kieruje nim w żegludze. Port to miejsce cumowania statków, ocean to akwen, marynarz to członek załogi podległy kapitanowi."
    },
    {
      id: "t1_011", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["prawo administracyjne", "stosunek administracyjnoprawny"], rightTop: "prawo cywilne",
      options: ["A) stosunek cywilnoprawny", "B) umowa cywilna", "C) zobowiązanie", "D) kodeks", "E) sąd cywilny"],
      correct: 0,
      explanation: "Prawo administracyjne reguluje stosunki administracyjnoprawne — to jego podstawowy przedmiot regulacji. Analogicznie prawo cywilne reguluje stosunki cywilnoprawne. Umowa i zobowiązanie to instytucje prawa cywilnego, ale stosunek cywilnoprawny jest pojęciem nadrzędnym, analogicznym do stosunku administracyjnoprawnego."
    },
    {
      id: "t1_012", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["rząd", "premier"], rightTop: "gmina",
      options: ["A) wójt", "B) rada gminy", "C) sołtys", "D) starosta"],
      correct: 0,
      explanation: "Premier jest szefem rządu — to jednoosobowy organ wykonawczy stojący na czele rządu. Analogicznie wójt jest jednoosobowym organem wykonawczym gminy, stojącym na jej czele. Rada gminy to organ stanowiący, starosta kieruje powiatem, a sołtys to organ pomocniczy."
    },
    {
      id: "t1_013", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["termostat", "temperatura"], rightTop: "barometr",
      options: ["A) ciśnienie", "B) wiatr", "C) wilgotność", "D) opady", "E) temperatura"],
      correct: 0,
      explanation: "Termostat mierzy i reguluje temperaturę — temperatura jest jego przedmiotem działania. Analogicznie barometr mierzy ciśnienie atmosferyczne. Wiatr, wilgotność i opady to inne elementy pogody mierzone innymi przyrządami."
    },
    {
      id: "t1_014", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["ustawa", "Sejm"], rightTop: "rozporządzenie",
      options: ["A) minister", "B) Senat", "C) Trybunał", "D) prezydent"],
      correct: 0,
      explanation: "Ustawa jest aktem normatywnym stanowionym przez Sejm. Analogicznie rozporządzenie jest aktem normatywnym wydawanym przez ministra lub inny organ wykonawczy na podstawie upoważnienia ustawowego. Senat uczestniczy w uchwalaniu ustaw, ale nie stanowi rozporządzeń."
    },
    {
      id: "t1_015", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["biologia", "organizmy żywe"], rightTop: "ekonomia",
      options: ["A) zjawiska gospodarcze", "B) pieniądz", "C) rynek", "D) finanse", "E) handel"],
      correct: 0,
      explanation: "Biologia bada organizmy żywe — to jej przedmiot badań. Analogicznie ekonomia bada zjawiska gospodarcze, w tym produkcję, wymianę i podział dóbr. Pieniądz, rynek i handel to elementy gospodarki, ale zjawiska gospodarcze to pojęcie nadrzędne i najpełniej oddające przedmiot ekonomii."
    },
    {
      id: "t1_016", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["słownik", "definicje"], rightTop: "atlas",
      options: ["A) mapy", "B) geografia", "C) podróże", "D) kraje"],
      correct: 0,
      explanation: "Słownik zawiera definicje słów — definicje to jego zawartość. Analogicznie atlas zawiera mapy — to jest podstawowa zawartość atlasu geograficznego. Geografia to dziedzina nauki, a kraje i podróże to tematy, nie zawartość atlasu jako rodzaju publikacji."
    },
    {
      id: "t1_017", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Naczelny Sąd Administracyjny", "kontrola decyzji administracyjnych"], rightTop: "Trybunał Konstytucyjny",
      options: ["A) kontrola konstytucyjności prawa", "B) orzekanie o winie", "C) wymiar sprawiedliwości", "D) nadzór nad sądami", "E) ochrona praw człowieka"],
      correct: 0,
      explanation: "Naczelny Sąd Administracyjny sprawuje kontrolę nad decyzjami administracyjnymi — jest to jego główna kompetencja. Analogicznie Trybunał Konstytucyjny sprawuje kontrolę konstytucyjności prawa, badając zgodność aktów normatywnych z Konstytucją. Orzekanie o winie należy do sądów powszechnych."
    },
    {
      id: "t1_018", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["pszczelarstwo", "miód"], rightTop: "sadownictwo",
      options: ["A) owoce", "B) sad", "C) drzewa", "D) uprawa", "E) rośliny"],
      correct: 0,
      explanation: "Pszczelarstwo to działalność, której głównym produktem jest miód. Analogicznie sadownictwo to dziedzina rolnictwa, której głównym produktem są owoce. Sad to miejsce prowadzenia sadownictwa, a drzewa i rośliny to środki produkcji, nie produkty."
    },
    {
      id: "t1_019", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["Konstytucja", "zasady ustrojowe"], rightTop: "regulamin Sejmu",
      options: ["A) zasady funkcjonowania Sejmu", "B) prawa obywateli", "C) procedura ustawodawcza", "D) skład Sejmu"],
      correct: 0,
      explanation: "Konstytucja normuje zasady ustrojowe państwa — to jej podstawowa treść. Analogicznie regulamin Sejmu normuje zasady funkcjonowania Sejmu, czyli tryb jego pracy i wewnętrzną organizację. Prawa obywateli i procedura ustawodawcza to tematy regulowane przez inne akty lub Konstytucję."
    },
    {
      id: "t1_020", typeId: 1,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      leftPair: ["diagnoza", "leczenie"], rightTop: "audyt",
      options: ["A) rekomendacje", "B) sprawozdanie", "C) kontrola", "D) raport", "E) ocena"],
      correct: 0,
      explanation: "Diagnoza poprzedza leczenie i jest jego podstawą — leczenie to działanie podejmowane na podstawie diagnozy. Analogicznie audyt jest czynnością, po której następują rekomendacje — rekomendacje to działanie wynikające z przeprowadzonego audytu. Raport i sprawozdanie to dokumenty, nie działania następcze."
    }
  ],

  type2: [
    {
      id: "t2_001", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Decyzja", "Postanowienie", "Odwołanie"],
      options: ["A) sąd", "B) wyrok", "C) postępowanie administracyjne", "D) prawo", "E) organ"],
      correct: 2,
      explanation: "Decyzja, postanowienie i odwołanie są pojęciami z zakresu postępowania administracyjnego — każde z nich jest instytucją proceduralną uregulowaną w KPA. Sąd i wyrok to instytucje sądowe, prawo jest pojęciem zbyt ogólnym, organ to podmiot, nie procedura."
    },
    {
      id: "t2_002", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Gmina", "Powiat", "Województwo"],
      options: ["A) kraj", "B) samorząd terytorialny", "C) administracja rządowa", "D) region", "E) Polska"],
      correct: 1,
      explanation: "Gmina, powiat i województwo są jednostkami samorządu terytorialnego w Polsce — każda z nich tworzy odrębny szczebel samorządu. Administracja rządowa to odrębny system, kraj i Polska to pojęcia nadrzędne, a region nie jest oficjalnym pojęciem ustrojowym."
    },
    {
      id: "t2_003", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Skalpel", "Stetoskop", "Rentgen"],
      options: ["A) szpital", "B) pacjent", "C) leczenie", "D) diagnoza", "E) medycyna"],
      correct: 4,
      explanation: "Skalpel jest narzędziem medycyny (chirurgii), stetoskop jest narzędziem medycyny (diagnostyki), rentgen jest techniką medycyny (obrazowania). Wszystkie trzy należą do dziedziny medycyny. Szpital to miejsce, pacjent to osoba, diagnoza i leczenie to procesy, nie kategoria łącząca te narzędzia."
    },
    {
      id: "t2_004", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Wójt", "Burmistrz", "Prezydent miasta"],
      options: ["A) starosta", "B) organ wykonawczy gminy", "C) rada gminy", "D) sołtys", "E) samorząd"],
      correct: 1,
      explanation: "Wójt, burmistrz i prezydent miasta to różne nazwy tego samego rodzaju organu — jednoosobowego organu wykonawczego gminy, w zależności od rodzaju i wielkości gminy. Starosta jest organem powiatu, rada gminy to organ stanowiący, sołtys to organ pomocniczy."
    },
    {
      id: "t2_005", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Inflacja", "Bezrobocie", "PKB"],
      options: ["A) ekonomia", "B) finanse publiczne", "C) wskaźniki makroekonomiczne", "D) budżet", "E) polityka społeczna"],
      correct: 2,
      explanation: "Inflacja, bezrobocie i PKB (Produkt Krajowy Brutto) są wskaźnikami makroekonomicznymi — każdy z nich mierzy stan całej gospodarki narodowej. Ekonomia to szeroka dziedzina, finanse publiczne dotyczą wydatków państwa, budżet to plan finansowy, polityka społeczna to dziedzina działań rządowych."
    },
    {
      id: "t2_006", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Kontrasygnata", "Immunitet", "Mandat"],
      options: ["A) prawo", "B) przywilej", "C) instytucja prawa konstytucyjnego", "D) parlamentaryzm", "E) władza"],
      correct: 2,
      explanation: "Kontrasygnata, immunitet i mandat są instytucjami prawa konstytucyjnego — każda z nich jest uregulowana w Konstytucji RP lub bezpośrednio z niej wynika. Przywilej to pojęcie potoczne, parlamentaryzm dotyczy tylko mandatu i immunitetu, władza jest pojęciem zbyt ogólnym."
    },
    {
      id: "t2_007", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Sopran", "Alt", "Tenor"],
      options: ["A) muzyka", "B) opera", "C) śpiew", "D) głos wokalny", "E) instrument"],
      correct: 3,
      explanation: "Sopran, alt i tenor to rodzaje głosów wokalnych — każdy z nich określa zakres skali głosu ludzkiego w śpiewie. Muzyka i śpiew to zbyt ogólne pojęcia, opera to gatunek muzyczny, instrument to coś innego niż głos."
    },
    {
      id: "t2_008", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Kontrola zarządcza", "Audyt wewnętrzny", "Sprawozdawczość"],
      options: ["A) zarządzanie publiczne", "B) finanse", "C) rachunkowość", "D) nadzór", "E) ocena ryzyka"],
      correct: 0,
      explanation: "Kontrola zarządcza, audyt wewnętrzny i sprawozdawczość są narzędziami zarządzania publicznego stosowanymi w jednostkach sektora finansów publicznych. Finanse i rachunkowość to pokrewne, ale węższe dziedziny, nadzór to pojęcie zewnętrzne, ocena ryzyka to tylko jeden element tych narzędzi."
    },
    {
      id: "t2_009", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Miedź", "Żelazo", "Aluminium"],
      options: ["A) minerały", "B) pierwiastki", "C) metale", "D) surowce", "E) chemia"],
      correct: 2,
      explanation: "Miedź, żelazo i aluminium są metalami — każdy z nich należy do grupy metali w układzie okresowym pierwiastków. Są one pierwiastkami, ale nie wszystkie pierwiastki to metale, dlatego metale jest bardziej precyzyjną odpowiedzią. Minerały i surowce to szersze kategorie obejmujące też niemetale."
    },
    {
      id: "t2_010", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Zasada praworządności", "Zasada proporcjonalności", "Zasada równości"],
      options: ["A) Konstytucja", "B) etyka", "C) zasady ogólne prawa administracyjnego", "D) KPA", "E) orzecznictwo"],
      correct: 2,
      explanation: "Zasada praworządności, zasada proporcjonalności i zasada równości są zasadami ogólnymi prawa administracyjnego — każda z nich kieruje działalnością organów administracji publicznej. Konstytucja jest ich źródłem, KPA je konkretyzuje, ale zasady ogólne prawa administracyjnego to kategoria je łącząca."
    },
    {
      id: "t2_011", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Wniosek", "Podanie", "Skarga"],
      options: ["A) postępowanie sądowe", "B) prawo", "C) środek prawny", "D) komunikacja z urzędem", "E) decyzja"],
      correct: 3,
      explanation: "Wniosek, podanie i skarga to formy komunikacji z urzędem — każda z nich jest pismem kierowanym przez obywatela do organu administracji publicznej. Środek prawny to pojęcie węższe, postępowanie sądowe nie obejmuje wszystkich trzech, decyzja jest aktem organu, nie obywatela."
    },
    {
      id: "t2_012", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Tygrys", "Lew", "Gepard"],
      options: ["A) zwierzęta", "B) drapieżniki", "C) ssaki", "D) kotowate", "E) dzikie zwierzęta"],
      correct: 3,
      explanation: "Tygrys, lew i gepard należą do rodziny kotowatych (Felidae) — każdy z nich jest przedstawicielem tej rodziny biologicznej. Drapieżniki to szersza kategoria obejmująca też psy, niedźwiedzie itd. Ssaki są jeszcze szersze, a kotowate jest najdokładniejszym wspólnym mianownikiem."
    },
    {
      id: "t2_013", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Referendum", "Inicjatywa ustawodawcza", "Petycja"],
      options: ["A) demokracja bezpośrednia", "B) prawa obywatelskie", "C) udział obywateli w sprawowaniu władzy", "D) prawa polityczne", "E) parlament"],
      correct: 2,
      explanation: "Referendum, inicjatywa ustawodawcza i petycja są formami udziału obywateli w sprawowaniu władzy — każda z nich umożliwia bezpośredni wpływ obywateli na decyzje publiczne. Demokracja bezpośrednia nie obejmuje petycji, prawa obywatelskie to szersza kategoria, prawa polityczne to zbliżone pojęcie, lecz mniej precyzyjne."
    },
    {
      id: "t2_014", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Łosoś", "Dorsz", "Śledź"],
      options: ["A) morze", "B) ryby", "C) ryby morskie", "D) owoce morza", "E) dieta"],
      correct: 2,
      explanation: "Łosoś, dorsz i śledź są rybami morskimi — każdy z nich żyje w morzu lub jest poławiany w morzach. Ryby to szersza kategoria obejmująca też ryby słodkowodne, owoce morza obejmują też skorupiaki i mięczaki, a morze to środowisko, nie kategoria biologiczna."
    },
    {
      id: "t2_015", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Sygnatura akt", "Termin odpowiedzi", "Podstawa prawna"],
      options: ["A) pismo urzędowe", "B) decyzja", "C) procedura", "D) korespondencja", "E) dokumentacja"],
      correct: 0,
      explanation: "Sygnatura akt, termin odpowiedzi i podstawa prawna są obowiązkowymi elementami pisma urzędowego — każde pismo urzędowe musi je zawierać zgodnie z przepisami KPA. Decyzja jest rodzajem pisma, procedura to tryb postępowania, korespondencja i dokumentacja to pojęcia zbyt ogólne."
    },
    {
      id: "t2_016", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Grzmot", "Błyskawica", "Ulewa"],
      options: ["A) wiatr", "B) burza", "C) pogoda", "D) niebo", "E) chmury"],
      correct: 1,
      explanation: "Grzmot, błyskawica i ulewa to elementy burzy — każde z tych zjawisk atmosferycznych jest charakterystycznym składnikiem burzy. Pogoda to pojęcie ogólne, chmury są elementem wizualnym, ale nie łączą wszystkich trzech zjawisk, wiatr nie jest koniecznym elementem burzy."
    },
    {
      id: "t2_017", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Bezstronność", "Rzetelność", "Profesjonalizm"],
      options: ["A) prawo", "B) służba cywilna", "C) wartości etyki urzędniczej", "D) kwalifikacje", "E) ocena pracownicza"],
      correct: 2,
      explanation: "Bezstronność, rzetelność i profesjonalizm są wartościami etyki urzędniczej — każda z nich jest wymieniana w standardach etycznych służby cywilnej i kodeksach postępowania urzędniczego. Służba cywilna to system, w którym te wartości obowiązują, ale nie jest to kategoria łącząca te pojęcia."
    },
    {
      id: "t2_018", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Planowanie", "Organizowanie", "Kontrolowanie"],
      options: ["A) praca", "B) zarządzanie", "C) administracja", "D) biurokracja", "E) kierowanie"],
      correct: 1,
      explanation: "Planowanie, organizowanie i kontrolowanie są klasycznymi funkcjami zarządzania (obok motywowania) — każda z nich stanowi etap procesu zarządzania organizacją. Kierowanie to pojęcie zbliżone, ale zarządzanie jest bardziej precyzyjnym terminem łączącym te trzy funkcje."
    },
    {
      id: "t2_019", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Niedziela", "Środa", "Piątek"],
      options: ["A) tydzień", "B) dni wolne", "C) dni tygodnia", "D) harmonogram", "E) kalendarz"],
      correct: 2,
      explanation: "Niedziela, środa i piątek są dniami tygodnia — każdy z nich jest jednym z siedmiu dni tygodnia. Tydzień to jednostka czasu, nie kategoria, kalenderz i harmonogram to dokumenty, dni wolne pasuje tylko do niedzieli (nie do środy i piątku)."
    },
    {
      id: "t2_020", typeId: 2,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      words: ["Zażalenie", "Odwołanie", "Sprzeciw"],
      options: ["A) sąd", "B) postępowanie", "C) środki zaskarżenia", "D) prawo do obrony", "E) organ wyższego stopnia"],
      correct: 2,
      explanation: "Zażalenie, odwołanie i sprzeciw są środkami zaskarżenia w postępowaniu administracyjnym — każdy z nich umożliwia kwestionowanie rozstrzygnięć organu administracji. Organ wyższego stopnia to podmiot rozpatrujący odwołanie, postępowanie to tryb, prawo do obrony to zasada ogólna."
    }
  ],

  type3: [
    {
      id: "t3_001", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "W urzędzie miejskim zaobserwowano, że w pierwszym kwartale roku znacznie wzrasta liczba składanych wniosków o zasiłki. Jednocześnie w tym samym okresie odnotowuje się wyraźny wzrost liczby zwolnień lekarskich wśród pracowników urzędu.",
      chart: {
        type: "bar",
        xLabels: ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"],
        datasets: [
          { label: "Wnioski o zasiłki (szt.)", data: [480, 210, 190, 230], color: "#c0392b" },
          { label: "Zwolnienia lekarskie (szt.)", data: [95, 38, 32, 41], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost liczby wniosków o zasiłki powoduje wzrost liczby zwolnień lekarskich wśród pracowników.",
        "B) Wzrost liczby zwolnień lekarskich powoduje wzrost liczby składanych wniosków o zasiłki.",
        "C) Okres zimowy i początku roku wywołuje zarówno większe potrzeby socjalne obywateli, jak i większą absencję pracowników z powodu chorób.",
        "D) Brak związku przyczynowo-skutkowego między liczbą wniosków o zasiłki a zwolnieniami lekarskimi."
      ],
      correct: 2,
      explanation: "Obie obserwacje — wzrost wniosków o zasiłki i wzrost zwolnień lekarskich — mają wspólną przyczynę: okres zimowy sprzyja zachorowaniom i zwiększa potrzeby finansowe obywateli. Przyczynowość między nimi jest nieprawdopodobna, gdyż wnioskodawcy i pracownicy to różne grupy osób. Korelacja sezonowa wskazuje na wspólny czynnik środowiskowy."
    },
    {
      id: "t3_002", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Analiza danych z wydziału komunikacji wykazała, że latem gwałtownie rośnie liczba rejestracji nowych pojazdów. W tym samym sezonie urząd odnotowuje również znaczny wzrost liczby wydawanych praw jazdy.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Rejestracje pojazdów (szt.)", data: [320, 580, 290, 180], color: "#c0392b" },
          { label: "Wydane prawa jazdy (szt.)", data: [140, 260, 120, 80], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost rejestracji pojazdów powoduje wzrost liczby wydawanych praw jazdy.",
        "B) Wzrost liczby wydawanych praw jazdy powoduje wzrost rejestracji pojazdów.",
        "C) Sezon letni — z jego lepszą pogodą, urlopami i zwiększoną aktywnością — sprzyja zarówno nabywaniu pojazdów, jak i zdawaniu egzaminów na prawo jazdy.",
        "D) Brak związku przyczynowo-skutkowego między rejestracjami pojazdów a wydawanymi prawami jazdy."
      ],
      correct: 2,
      explanation: "Wzrost obu wskaźników latem wynika z sezonowości: lato to czas urlopów, lepszej pogody i wyższej aktywności konsumenckiej, co sprzyja zarówno zakupom pojazdów, jak i podchodzeniu do egzaminów na prawo jazdy. Nie ma logicznego mechanizmu przyczynowego między tymi dwoma zjawiskami bezpośrednio."
    },
    {
      id: "t3_003", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Dane z urzędu pracy pokazują, że jesienią liczba nowych bezrobotnych rejestrujących się w urzędzie wyraźnie maleje. Równocześnie w tym samym okresie spada liczba ofert pracy zgłaszanych przez pracodawców do urzędu.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Nowe rejestracje bezrobotnych (szt.)", data: [310, 420, 180, 250], color: "#c0392b" },
          { label: "Oferty pracy od pracodawców (szt.)", data: [180, 240, 100, 130], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost liczby bezrobotnych powoduje zmniejszenie liczby ofert pracy od pracodawców.",
        "B) Zmniejszenie liczby ofert pracy powoduje spadek liczby nowych rejestracji bezrobotnych.",
        "C) Sezon letni — ze wzmożoną aktywnością gospodarczą — napędza zarówno popyt pracodawców na pracowników, jak i podaż bezrobotnych szukających zatrudnienia sezonowego.",
        "D) Brak związku przyczynowo-skutkowego między rejestracjami bezrobotnych a ofertami pracy."
      ],
      correct: 2,
      explanation: "Obydwa wskaźniki rosną latem — to efekt sezonu turystycznego i budowlanego, który zwiększa zarówno zapotrzebowanie pracodawców na pracowników, jak i skłonność bezrobotnych do aktywnego poszukiwania pracy. Jesienią ten efekt zanika. Korelacja wynika ze wspólnej przyczyny, jaką jest sezonowość gospodarcza."
    },
    {
      id: "t3_004", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Statystyki wydziału budownictwa wskazują, że wiosną rośnie liczba składanych wniosków o pozwolenia na budowę. Jednocześnie w tym samym okresie wzrasta liczba interwencji inspektorów nadzoru budowlanego na placach budów.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o pozwolenia na budowę (szt.)", data: [520, 480, 310, 120], color: "#c0392b" },
          { label: "Interwencje nadzoru budowlanego (szt.)", data: [85, 78, 52, 18], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost liczby wniosków o pozwolenia na budowę powoduje wzrost liczby interwencji inspektorów.",
        "B) Wzrost interwencji inspektorów nadzoru budowlanego powoduje wzrost liczby wniosków o pozwolenia.",
        "C) Sezon wiosenny sprzyja aktywności budowlanej, co powoduje zarówno więcej wniosków o pozwolenia, jak i więcej aktywnych budów wymagających nadzoru.",
        "D) Brak związku przyczynowo-skutkowego między wnioskami o pozwolenia a interwencjami nadzoru."
      ],
      correct: 2,
      explanation: "Wiosną wznawia się sezon budowlany — sprzyjające warunki atmosferyczne powodują zarówno wzrost nowych planowanych inwestycji (wnioski), jak i wznowienie już prowadzonych budów (interwencje nadzoru). Wspólną przyczyną jest sezonowość działalności budowlanej, a nie zależność między pozwoleniami a nadzorem."
    },
    {
      id: "t3_005", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Raport miejskiego ośrodka pomocy społecznej wykazał, że w sezonie zimowym rośnie liczba interwencji w przypadkach osób bezdomnych. Jednocześnie w tym samym okresie wzrasta zużycie energii elektrycznej w placówkach pomocy społecznej.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Interwencje dla bezdomnych (szt.)", data: [45, 28, 62, 118], color: "#c0392b" },
          { label: "Zużycie energii w placówkach (MWh)", data: [38, 22, 55, 104], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost interwencji dla bezdomnych powoduje wzrost zużycia energii w placówkach.",
        "B) Wzrost zużycia energii w placówkach powoduje wzrost liczby interwencji dla bezdomnych.",
        "C) Niskie temperatury zimą powodują zarówno wzrost zagrożenia bezdomnością, jak i wzrost ogrzewania i oświetlenia w placówkach.",
        "D) Brak związku przyczynowo-skutkowego między interwencjami dla bezdomnych a zużyciem energii."
      ],
      correct: 2,
      explanation: "Obydwa zjawiska — interwencje dla bezdomnych i zużycie energii — rosną zimą z powodu niskich temperatur. Mróz zagraża osobom bezdomnym, zmuszając do interwencji, a jednocześnie placówki muszą intensywniej ogrzewać pomieszczenia. Wspólną ukrytą przyczyną są niskie temperatury zimowe."
    },
    {
      id: "t3_006", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Analiza danych urzędu skarbowego pokazuje, że w marcu i kwietniu wyraźnie rośnie liczba złożonych zeznań podatkowych PIT. W tym samym czasie urzędnicy odnotowują znaczny wzrost liczby zapytań telefonicznych od podatników.",
      chart: {
        type: "line",
        xLabels: ["STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ"],
        datasets: [
          { label: "Złożone zeznania PIT (tys. szt.)", data: [12, 18, 68, 55], color: "#c0392b" },
          { label: "Zapytania telefoniczne (tys. szt.)", data: [8, 12, 44, 36], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost liczby złożonych zeznań PIT powoduje wzrost liczby zapytań telefonicznych od podatników.",
        "B) Wzrost zapytań telefonicznych od podatników powoduje wzrost liczby złożonych zeznań PIT.",
        "C) Ustawowy termin składania PIT (koniec kwietnia) mobilizuje podatników zarówno do składania zeznań, jak i do telefonicznego zasięgania informacji.",
        "D) Brak związku przyczynowo-skutkowego między liczbą złożonych PIT a zapytaniami telefonicznymi."
      ],
      correct: 2,
      explanation: "Obydwa wzrosty — zeznań i zapytań telefonicznych — mają wspólną przyczynę: ustawowy termin złożenia PIT przypadający na koniec kwietnia. Zbliżający się termin skłania podatników zarówno do finalizowania zeznań, jak i do poszukiwania informacji. Nie istnieje bezpośredni mechanizm przyczynowy między złożonym zeznaniem a telefonem."
    },
    {
      id: "t3_007", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Wydział ochrony środowiska urzędu marszałkowskiego zaobserwował, że latem wzrasta liczba skarg na zanieczyszczenie wód powierzchniowych. Jednocześnie w tym samym sezonie rośnie liczba kontroli prowadzonych przez inspektorów środowiska.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Skargi na zanieczyszczenie wód (szt.)", data: [28, 74, 35, 18], color: "#c0392b" },
          { label: "Kontrole środowiskowe (szt.)", data: [22, 58, 28, 14], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost skarg na zanieczyszczenie wód powoduje wzrost liczby kontroli środowiskowych.",
        "B) Wzrost liczby kontroli środowiskowych powoduje wzrost skarg na zanieczyszczenie wód.",
        "C) Sezon letni — ze wzmożoną aktywnością rekreacyjną nad wodą i większą widocznością zanieczyszczeń — powoduje zarówno wzrost skarg, jak i wzrost aktywności inspekcji.",
        "D) Brak związku przyczynowo-skutkowego między skargami na zanieczyszczenie wód a kontrolami środowiskowymi."
      ],
      correct: 2,
      explanation: "Latem wzrasta aktywność rekreacyjna nad wodą, co powoduje zarówno częstsze wykrywanie i zgłaszanie zanieczyszczeń przez obywateli, jak i planową intensyfikację kontroli inspekcji środowiska w sezonie. Wspólna przyczyna to sezon letni, nie zależność przyczynowa między skargami a kontrolami."
    },
    {
      id: "t3_008", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Zarząd dróg miejskich odnotował, że wiosną gwałtownie rośnie liczba zgłoszeń dotyczących uszkodzeń nawierzchni dróg. W tym samym czasie wzrasta liczba wypadków drogowych rejestrowanych przez miejski wydział ruchu drogowego.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Zgłoszenia uszkodzeń dróg (szt.)", data: [340, 180, 150, 210], color: "#c0392b" },
          { label: "Wypadki drogowe (szt.)", data: [120, 95, 88, 145], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost zgłoszeń uszkodzeń dróg powoduje wzrost liczby wypadków drogowych.",
        "B) Wzrost liczby wypadków drogowych powoduje wzrost zgłoszeń uszkodzeń dróg.",
        "C) Rozmrożenie po zimie odsłania ubytki nawierzchni powstałe podczas mrozów, co powoduje zarówno wzrost zgłoszeń, jak i wzrost ryzyka wypadków z powodu złej nawierzchni.",
        "D) Brak związku przyczynowo-skutkowego między zgłoszeniami uszkodzeń dróg a wypadkami drogowymi."
      ],
      correct: 2,
      explanation: "Wiosną roztopy odsłaniają dziury i ubytki w nawierzchni powstałe podczas zimowych mrozów i cykli zamrażania/rozmrażania. Ta sama przyczyna — zniszczona nawierzchnia — powoduje zarówno napływ zgłoszeń od obywateli, jak i wzrost ryzyka wypadków drogowych spowodowanych złym stanem dróg."
    },
    {
      id: "t3_009", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Urząd stanu cywilnego zaobserwował, że latem znacząco wzrasta liczba zawieranych małżeństw cywilnych. W tym samym sezonie rośnie również liczba wniosków o wymeldowanie z dotychczasowego adresu zamieszkania.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Zawarte małżeństwa cywilne (szt.)", data: [280, 520, 310, 190], color: "#c0392b" },
          { label: "Wnioski o wymeldowanie (szt.)", data: [210, 380, 240, 140], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost liczby zawieranych małżeństw powoduje wzrost wniosków o wymeldowanie.",
        "B) Wzrost wniosków o wymeldowanie powoduje wzrost liczby zawieranych małżeństw.",
        "C) Sezon letni sprzyja zarówno organizowaniu uroczystości weselnych, jak i przeprowadzkom — obie aktywności nasilają się w tym samym sezonie z powodu pogody i urlopów.",
        "D) Brak związku przyczynowo-skutkowego między zawieranymi małżeństwami a wnioskami o wymeldowanie."
      ],
      correct: 2,
      explanation: "Lato to sezon sprzyjający zarówno weselom (pogoda, urlopy, tradycja), jak i przeprowadzkom (lepsza pogoda, koniec roku szkolnego). Obie aktywności nasilają się z tych samych przyczyn sezonowych, a nie dlatego, że jedno wywołuje drugie — choć niekiedy małżeństwo wiąże się z przeprowadzką, wzrost jest zbyt wysoki, by wyjaśnić to tylko związkami."
    },
    {
      id: "t3_010", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Dane urzędu pracy dla gminy nadmorskiej pokazują, że latem gwałtownie spada liczba zarejestrowanych bezrobotnych. W tym samym czasie znacznie rośnie liczba zgłoszonych do ubezpieczenia pracowników sezonowych.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Zarejestrowani bezrobotni (szt.)", data: [850, 320, 710, 920], color: "#c0392b" },
          { label: "Ubezpieczeni pracownicy sezonowi (szt.)", data: [120, 680, 180, 60], color: "#2980b9" }
        ]
      },
      options: [
        "A) Spadek liczby bezrobotnych powoduje wzrost liczby pracowników sezonowych.",
        "B) Wzrost liczby pracowników sezonowych powoduje spadek liczby bezrobotnych.",
        "C) Sezon turystyczny w gminie nadmorskiej powoduje zarówno wzrost zapotrzebowania na pracę, jak i odpływ bezrobotnych do zatrudnienia.",
        "D) Brak związku przyczynowo-skutkowego między liczbą bezrobotnych a pracownikami sezonowymi."
      ],
      correct: 2,
      explanation: "Sezon turystyczny latem jest wspólną przyczyną obu zjawisk: tworzy miejsca pracy sezonowej (wzrost ubezpieczonych pracowników) i jednocześnie część bezrobotnych podejmuje te prace (spadek zarejestrowanych bezrobotnych). Choć oba zjawiska są powiązane, wspólną przyczyną sprawczą jest sezon turystyczny."
    },
    {
      id: "t3_011", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Wydział kultury urzędu miejskiego zaobserwował, że latem rośnie frekwencja na miejskich wydarzeniach kulturalnych. W tym samym sezonie wzrasta liczba turystów odwiedzających miasto, co rejestruje miejskie centrum informacji turystycznej.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Frekwencja na wydarzeniach (tys. osób)", data: [18, 42, 15, 9], color: "#c0392b" },
          { label: "Turyści w centrum informacji (tys. osób)", data: [12, 38, 11, 6], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost frekwencji na wydarzeniach kulturalnych powoduje wzrost liczby turystów odwiedzających miasto.",
        "B) Wzrost liczby turystów odwiedzających miasto powoduje wzrost frekwencji na wydarzeniach kulturalnych.",
        "C) Sezon letni z urlopami i sprzyjającą pogodą powoduje zarówno wzrost atrakcji kulturalnych organizowanych latem, jak i wzrost podróży turystycznych.",
        "D) Brak związku przyczynowo-skutkowego między frekwencją na wydarzeniach kulturalnych a liczbą turystów."
      ],
      correct: 2,
      explanation: "Lato to sezon urlopowy, w którym zarówno więcej ludzi podróżuje (turyści), jak i więcej imprez kulturalnych jest organizowanych na świeżym powietrzu. Obie tendencje wynikają z sezonu letniego. Choć turyści mogą uczestniczyć w wydarzeniach, skala korelacji wskazuje na wspólną przyczynę sezonową."
    },
    {
      id: "t3_012", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Referat komunikacji społecznej urzędu gminy odnotował, że wiosną wzrasta liczba obywateli uczestniczących w konsultacjach społecznych. Jednocześnie rośnie liczba interpelacji radnych dotyczących kwestii miejskich.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Uczestnicy konsultacji społecznych (osób)", data: [320, 180, 250, 140], color: "#c0392b" },
          { label: "Interpelacje radnych (szt.)", data: [42, 22, 35, 18], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost uczestnictwa w konsultacjach powoduje wzrost interpelacji radnych.",
        "B) Wzrost interpelacji radnych powoduje wzrost uczestnictwa w konsultacjach społecznych.",
        "C) Początek roku budżetowego i planowanie inwestycji wiosną pobudzają zarówno aktywność obywateli w konsultacjach, jak i aktywność radnych w zgłaszaniu interpelacji.",
        "D) Brak związku przyczynowo-skutkowego między uczestnictwem w konsultacjach a interpelacjami radnych."
      ],
      correct: 2,
      explanation: "Wiosną gminy planują nowe inwestycje i konsultują projekty budżetowe — ta aktywność planistyczna jest wspólną przyczyną zwiększonego zaangażowania obywateli (konsultacje) i aktywności radnych (interpelacje). Nie ma bezpośredniego mechanizmu przyczynowego między obiema obserwowanymi zmiennymi."
    },
    {
      id: "t3_013", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Statystyki rejestracji pojazdów w wydziale komunikacji pokazują, że we wrześniu wzrasta liczba rejestracji motocykli. W tym samym miesiącu odnotowuje się wzrost liczby wypadków drogowych z udziałem motocyklistów.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Rejestracje motocykli (szt.)", data: [420, 380, 290, 80], color: "#c0392b" },
          { label: "Wypadki z udziałem motocyklistów (szt.)", data: [55, 72, 68, 12], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost rejestracji motocykli powoduje wzrost wypadków z udziałem motocyklistów.",
        "B) Wzrost wypadków z udziałem motocyklistów powoduje wzrost rejestracji motocykli.",
        "C) Sezon motocyklowy — trwający od wiosny do jesieni — jest przyczyną zarówno wzrostu rejestracji, jak i wzrostu liczby wypadków, ponieważ więcej motocykli jest na drogach.",
        "D) Brak związku przyczynowo-skutkowego między rejestracjami motocykli a wypadkami z ich udziałem."
      ],
      correct: 2,
      explanation: "Sezon motocyklowy (wiosna–jesień) powoduje zarówno aktywizację zakupów motocykli, jak i wzrost liczby motocykli na drogach, co przekłada się na wypadki. Wspólna przyczyna to pora roku sprzyjająca jeździe motocyklowej. Sama rejestracja nie powoduje bezpośrednio wypadków."
    },
    {
      id: "t3_014", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Urząd statystyczny odnotował, że w lutym spada liczba zawieranych umów o pracę w budownictwie. W tym samym miesiącu spada liczba wydawanych zezwoleń na sprzedaż alkoholu na imprezach plenerowych.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Umowy o pracę w budownictwie (szt.)", data: [580, 620, 410, 180], color: "#c0392b" },
          { label: "Zezwolenia na sprzedaż alkoholu plenerową (szt.)", data: [120, 310, 95, 25], color: "#2980b9" }
        ]
      },
      options: [
        "A) Spadek liczby umów o pracę w budownictwie powoduje spadek liczby zezwoleń na sprzedaż alkoholu.",
        "B) Spadek liczby zezwoleń na sprzedaż alkoholu powoduje spadek umów o pracę w budownictwie.",
        "C) Sezon zimowy z niekorzystnymi warunkami pogodowymi powoduje jednocześnie zahamowanie prac budowlanych i brak plenerowych imprez wymagających zezwolenia.",
        "D) Brak związku przyczynowo-skutkowego między umowami o pracę w budownictwie a zezwoleniami alkoholowymi."
      ],
      correct: 2,
      explanation: "Obydwa zjawiska maleją zimą z powodu niekorzystnej pogody: mróz i śnieg uniemożliwiają prace budowlane (mniej umów) i organizację imprez plenerowych (mniej zezwoleń). Wspólna ukryta przyczyna to warunki meteorologiczne zimą, a nie przyczynowość między tymi dwoma zjawiskami."
    },
    {
      id: "t3_015", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Wydział oświaty zaobserwował, że we wrześniu gwałtownie wzrasta liczba wniosków o dofinansowanie podręczników szkolnych. Równocześnie rośnie liczba wniosków rodziców o wydanie legitymacji szkolnych dla dzieci.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o dofinansowanie podręczników (szt.)", data: [80, 120, 680, 45], color: "#c0392b" },
          { label: "Wnioski o legitymacje szkolne (szt.)", data: [55, 90, 520, 30], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost wniosków o dofinansowanie podręczników powoduje wzrost wniosków o legitymacje.",
        "B) Wzrost wniosków o legitymacje szkolne powoduje wzrost wniosków o dofinansowanie podręczników.",
        "C) Początek roku szkolnego we wrześniu jest przyczyną zarówno wzmożonego zapotrzebowania na dofinansowanie podręczników, jak i na wyrobienie legitymacji szkolnych.",
        "D) Brak związku przyczynowo-skutkowego między wnioskami o podręczniki a wnioskami o legitymacje."
      ],
      correct: 2,
      explanation: "Obydwa wzrosty wniosków wynikają bezpośrednio z początku roku szkolnego we wrześniu. Rodzice jednocześnie starają się o dofinansowanie materiałów szkolnych i o dokumenty dla dzieci. Wspólna przyczyna to inauguracja roku szkolnego, nie wzajemna zależność między tymi rodzajami wniosków."
    },
    {
      id: "t3_016", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Komisja rewizyjna urzędu marszałkowskiego odnotowała, że w czwartym kwartale roku wzrasta liczba aneksów do umów z wykonawcami. Jednocześnie rośnie liczba wniosków wewnętrznych o przesunięcia środków między pozycjami budżetowymi.",
      chart: {
        type: "line",
        xLabels: ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"],
        datasets: [
          { label: "Aneksy do umów z wykonawcami (szt.)", data: [28, 35, 42, 88], color: "#c0392b" },
          { label: "Wnioski o przesunięcia budżetowe (szt.)", data: [22, 30, 38, 75], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost aneksów do umów z wykonawcami powoduje wzrost wniosków o przesunięcia budżetowe.",
        "B) Wzrost wniosków o przesunięcia budżetowe powoduje wzrost liczby aneksów do umów.",
        "C) Koniec roku budżetowego wymusza zarówno dostosowanie umów z wykonawcami, jak i korektę planów finansowych, co powoduje wzrost obu rodzajów dokumentów.",
        "D) Brak związku przyczynowo-skutkowego między aneksami do umów a wnioskami o przesunięcia budżetowe."
      ],
      correct: 2,
      explanation: "Czwarty kwartał to okres zamknięcia roku budżetowego, który wywiera presję na dostosowanie zarówno umów (aneksy, zmiany harmonogramów), jak i planów finansowych (przesunięcia środków). Wspólna przyczyna to zbliżający się koniec roku budżetowego, nie bezpośredni związek przyczynowy między aneksami a przesunieniami."
    },
    {
      id: "t3_017", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Urząd gminy wiejskiej odnotował, że wiosną wzrasta liczba wniosków o dotacje na modernizację budynków mieszkalnych. W tym samym czasie rośnie liczba wydanych decyzji o warunkach zabudowy.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o dotacje na modernizację (szt.)", data: [95, 68, 42, 18], color: "#c0392b" },
          { label: "Decyzje o warunkach zabudowy (szt.)", data: [78, 55, 35, 15], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost wniosków o dotacje powoduje wzrost liczby wydawanych decyzji o warunkach zabudowy.",
        "B) Wzrost liczby decyzji o warunkach zabudowy powoduje wzrost wniosków o dotacje.",
        "C) Wiosna sprzyja planowaniu prac remontowych i budowlanych, co powoduje jednocześnie składanie wniosków o dotacje i o warunki zabudowy.",
        "D) Brak związku przyczynowo-skutkowego między wnioskami o dotacje a decyzjami o warunkach zabudowy."
      ],
      correct: 2,
      explanation: "Wiosną mieszkańcy planują prace remontowe i budowlane na nowy sezon. Ten jeden impuls — planowanie aktywności budowlanej — powoduje zarówno składanie wniosków o finansowanie (dotacje), jak i o warunki prawne (decyzje). Obydwa wzrosty wynikają z sezonowości planowania inwestycji."
    },
    {
      id: "t3_018", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "W bibliotece samorządowej zaobserwowano, że w miesiącach letnich spada liczba wypożyczeń książek. W tym samym czasie spada liczba uczestników zajęć w świetlicy dla dzieci.",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wypożyczenia książek (tys. szt.)", data: [12, 5, 14, 16], color: "#c0392b" },
          { label: "Uczestnicy zajęć w świetlicy (osób)", data: [380, 120, 420, 460], color: "#2980b9" }
        ]
      },
      options: [
        "A) Spadek wypożyczeń książek powoduje spadek uczestnictwa w zajęciach świetlicowych.",
        "B) Spadek uczestnictwa w zajęciach świetlicowych powoduje spadek wypożyczeń książek.",
        "C) Przerwa letnia powoduje zarówno mniejsze korzystanie z biblioteki przez uczniów, jak i mniejsze uczestnictwo w zajęciach świetlicowych, bo dzieci są na wakacjach lub poza miastem.",
        "D) Brak związku przyczynowo-skutkowego między wypożyczeniami książek a uczestnictwem w zajęciach świetlicowych."
      ],
      correct: 2,
      explanation: "Lato to okres wakacji szkolnych, w którym dzieci i młodzież wyjeżdżają lub mają inne zajęcia — to powoduje zarówno spadek wypożyczeń w bibliotece, jak i spadek frekwencji w świetlicy. Wspólna przyczyna to przerwa letnia, nie zależność przyczynowa między wypożyczeniami a zajęciami."
    },
    {
      id: "t3_019", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Centrum zarządzania kryzysowego urzędu gminy odnotowuje, że zimą rośnie liczba interwencji pogotowia. W tym samym czasie wzrasta liczba zgłoszeń awarii sieci cieplnej.",
      chart: {
        type: "bar",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Interwencje pogotowia (szt.)", data: [580, 540, 620, 820], color: "#c0392b" },
          { label: "Awarie sieci cieplnej (szt.)", data: [12, 5, 28, 78], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost interwencji pogotowia powoduje wzrost awarii sieci cieplnej.",
        "B) Wzrost awarii sieci cieplnej powoduje wzrost liczby interwencji pogotowia.",
        "C) Niskie temperatury zimą powodują zarówno wzrost zachorowań i urazów wymagających pogotowia, jak i wzrost obciążenia i awarii sieci cieplnej.",
        "D) Brak związku przyczynowo-skutkowego między interwencjami pogotowia a awariami sieci cieplnej."
      ],
      correct: 2,
      explanation: "Niskie temperatury zimą są wspólną przyczyną: wywołują więcej zachorowań, odmrożeń i wypadków (wzrost interwencji pogotowia) oraz powodują intensywne użytkowanie i przeciążenie sieci cieplnej (wzrost awarii). Obydwa zjawiska wynikają bezpośrednio z warunków termicznych, nie z wzajemnej przyczynowości."
    },
    {
      id: "t3_020", typeId: 3,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      text: "Obserwacje z centrum obsługi mieszkańców urzędu miejskiego pokazują, że w czerwcu wzrasta liczba wniosków o zaświadczenia o niekaralności. Jednocześnie rośnie liczba wniosków o duplikaty świadectw szkolnych.",
      chart: {
        type: "line",
        xLabels: ["MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC"],
        datasets: [
          { label: "Wnioski o zaświadczenia o niekaralności (szt.)", data: [120, 140, 165, 310], color: "#c0392b" },
          { label: "Wnioski o duplikaty świadectw (szt.)", data: [45, 52, 68, 148], color: "#2980b9" }
        ]
      },
      options: [
        "A) Wzrost wniosków o zaświadczenia o niekaralności powoduje wzrost wniosków o duplikaty świadectw.",
        "B) Wzrost wniosków o duplikaty świadectw powoduje wzrost wniosków o zaświadczenia o niekaralności.",
        "C) Sezon rekrutacyjny na uczelnie wyższe i do pracy w czerwcu powoduje wzrost zapotrzebowania na dokumenty wymagane przy aplikowaniu — zarówno zaświadczenia, jak i świadectwa.",
        "D) Brak związku przyczynowo-skutkowego między zaświadczeniami o niekaralności a duplikatami świadectw."
      ],
      correct: 2,
      explanation: "Czerwiec to czas rekrutacji na studia i masowego poszukiwania pierwszej pracy przez absolwentów. Proces aplikacyjny wymaga jednocześnie dokumentów tożsamości i kwalifikacji (świadectwa) oraz dokumentów o niekaralności. Wspólna przyczyna to sezon rekrutacyjny, nie zależność przyczynowa między tymi dwoma rodzajami dokumentów."
    }
  ],

  type4: [
    {
      id: "t4_001", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Entomologia jest do owadów, jak teriologia jest do",
      options: ["A) ptaków", "B) ryb", "C) ssaków", "D) gadów", "E) płazów"],
      correct: 2,
      explanation: "Entomologia to dziedzina nauki badająca owady — owady są przedmiotem jej badań. Teriologia to dziedzina nauki badająca ssaki — ssaki są jej przedmiotem badań. Relacja jest identyczna: nazwa nauki do jej przedmiotu badań."
    },
    {
      id: "t4_002", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Kardiologia jest do serca, jak nefrologia jest do",
      options: ["A) wątroby", "B) płuc", "C) nerek", "D) żołądka", "E) śledziony"],
      correct: 2,
      explanation: "Kardiologia to specjalność medyczna zajmująca się sercem. Nefrologia to specjalność medyczna zajmująca się nerkami. Relacja identyczna: specjalność medyczna do organu będącego jej przedmiotem."
    },
    {
      id: "t4_003", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Kodeks karny jest do Ministerstwa Sprawiedliwości, jak Kodeks pracy jest do",
      options: ["A) Ministerstwa Finansów", "B) Ministerstwa Rodziny i Polityki Społecznej", "C) Ministerstwa Edukacji", "D) Ministerstwa Zdrowia", "E) Ministerstwa Spraw Wewnętrznych"],
      correct: 1,
      explanation: "Kodeks karny należy do działu prawa administrowanego przez Ministerstwo Sprawiedliwości, które odpowiada za jego stosowanie i wykładnię. Analogicznie Kodeks pracy jest administrowany przez Ministerstwo Rodziny i Polityki Społecznej (dawniej pracy), które nadzoruje stosunki pracy."
    },
    {
      id: "t4_004", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Sejm jest do ustawy, jak Rada Ministrów jest do",
      options: ["A) uchwały sejmowej", "B) zarządzenia prezydenta", "C) rozporządzenia", "D) obwieszczenia", "E) dyrektywy"],
      correct: 2,
      explanation: "Sejm jako organ władzy ustawodawczej stanowi ustawy — ustawa jest aktem normatywnym wydawanym przez Sejm. Analogicznie Rada Ministrów wydaje rozporządzenia — to jej podstawowy akt normatywny o charakterze wykonawczym, wydawany na podstawie upoważnienia ustawowego."
    },
    {
      id: "t4_005", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Malakologia jest do mięczaków, jak ornitologia jest do",
      options: ["A) owadów", "B) ryb", "C) ssaków", "D) ptaków", "E) gadów"],
      correct: 3,
      explanation: "Malakologia to nauka o mięczakach — to jej przedmiot badań. Ornitologia to nauka o ptakach — ptaki są jej przedmiotem. Identyczna relacja: nazwa dziedziny nauki do jej przedmiotu badań biologicznych."
    },
    {
      id: "t4_006", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Rzecznik Praw Obywatelskich jest do ochrony praw jednostki, jak Rzecznik Praw Dziecka jest do",
      options: ["A) ochrony praw rodziny", "B) ochrony praw pracowniczych", "C) ochrony praw dziecka", "D) edukacji obywatelskiej", "E) nadzoru nad sądami rodzinnymi"],
      correct: 2,
      explanation: "Rzecznik Praw Obywatelskich jest konstytucyjnym organem powołanym do ochrony praw jednostki. Analogicznie Rzecznik Praw Dziecka jest organem powołanym do ochrony praw dziecka — to jest dokładnie jego konstytucyjna i ustawowa rola."
    },
    {
      id: "t4_007", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Dłuto jest do drewna, jak skalpel jest do",
      options: ["A) metalu", "B) tkanin", "C) tkanek", "D) kamienia", "E) kości"],
      correct: 2,
      explanation: "Dłuto to narzędzie używane do obróbki drewna — drewno jest materiałem, w którym pracuje dłuto. Analogicznie skalpel to narzędzie chirurgiczne używane do cięcia tkanek — tkanki są materiałem, w którym pracuje skalpel. Kości są twardsze i obrabiane innymi narzędziami."
    },
    {
      id: "t4_008", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Wójt jest do gminy, jak starosta jest do",
      options: ["A) sołectwa", "B) województwa", "C) regionu", "D) powiatu", "E) gminy miejskiej"],
      correct: 3,
      explanation: "Wójt jest jednoosobowym organem wykonawczym gminy — gmina jest jednostką samorządu terytorialnego, którą kieruje wójt. Analogicznie starosta jest jednoosobowym organem wykonawczym powiatu — powiat jest jednostką samorządu terytorialnego drugiego szczebla."
    },
    {
      id: "t4_009", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Demokracja jest do ustroju politycznego, jak kapitalizm jest do",
      options: ["A) ustroju społecznego", "B) ustroju prawnego", "C) ustroju gospodarczego", "D) ustroju administracyjnego", "E) ustroju samorządowego"],
      correct: 2,
      explanation: "Demokracja jest formą ustroju politycznego — to kategoria pojęciowa nadrzędna, do której należy demokracja. Analogicznie kapitalizm jest formą ustroju gospodarczego — to kategoria pojęciowa, do której należy kapitalizm jako system organizacji gospodarki."
    },
    {
      id: "t4_010", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Paleontologia jest do skamieniałości, jak archeologia jest do",
      options: ["A) historii", "B) zabytków", "C) artefaktów", "D) starożytności", "E) muzealnictwa"],
      correct: 2,
      explanation: "Paleontologia bada skamieniałości — to jej główny materiał badawczy. Analogicznie archeologia bada artefakty — przedmioty stworzone przez człowieka w przeszłości, odnajdywane podczas wykopalisk. Zabytki to pojęcie prawne, historia to dziedzina humanistyczna, nie przedmiot badań."
    },
    {
      id: "t4_011", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Prezes Rady Ministrów jest do Rady Ministrów, jak Marszałek Sejmu jest do",
      options: ["A) Senatu", "B) rządu", "C) Sejmu", "D) parlamentu", "E) prezydenta"],
      correct: 2,
      explanation: "Prezes Rady Ministrów stoi na czele Rady Ministrów i kieruje jej pracami. Analogicznie Marszałek Sejmu stoi na czele Sejmu i kieruje jego obradami. Relacja identyczna: przewodniczący organu do organu, któremu przewodniczy."
    },
    {
      id: "t4_012", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Hydraulika jest do rur, jak elektrotechnika jest do",
      options: ["A) silników", "B) przewodów elektrycznych", "C) akumulatorów", "D) transformatorów", "E) obwodów"],
      correct: 1,
      explanation: "Hydraulika to dziedzina inżynierii zajmująca się projektowaniem i obsługą instalacji rurowych. Analogicznie elektrotechnika zajmuje się projektowaniem i obsługą instalacji elektrycznych, w których podstawowym elementem są przewody elektryczne. Przewody elektryczne są dla elektrotechniki tym, czym rury dla hydrauliki."
    },
    {
      id: "t4_013", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Adwokat jest do klienta, jak lekarz pierwszego kontaktu jest do",
      options: ["A) specjalisty", "B) szpitala", "C) pacjenta", "D) leków", "E) diagnozy"],
      correct: 2,
      explanation: "Adwokat świadczy profesjonalne usługi prawne na rzecz klienta — klient jest odbiorcą jego usług. Analogicznie lekarz pierwszego kontaktu świadczy usługi medyczne na rzecz pacjenta — pacjent jest odbiorcą jego usług. Identyczna relacja: profesjonalista do osoby korzystającej z jego usług."
    },
    {
      id: "t4_014", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Sprawiedliwość jest do etyki, jak grawitacja jest do",
      options: ["A) astronomii", "B) fizyki", "C) matematyki", "D) chemii", "E) biologii"],
      correct: 1,
      explanation: "Sprawiedliwość to pojęcie należące do dziedziny etyki — etyka jest dziedziną, której przedmiotem jest sprawiedliwość. Analogicznie grawitacja jest zjawiskiem należącym do dziedziny fizyki — fizyka jest nauką, której przedmiotem jest grawitacja. Identyczna relacja: pojęcie/zjawisko do dziedziny naukowej."
    },
    {
      id: "t4_015", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Trybunał Konstytucyjny jest do konstytucyjności ustaw, jak Najwyższa Izba Kontroli jest do",
      options: ["A) konstytucyjności aktów wykonawczych", "B) prawidłowości wyborów", "C) kontroli działalności finansowej państwa", "D) nadzoru nad samorządem", "E) zgodności umów międzynarodowych"],
      correct: 2,
      explanation: "Trybunał Konstytucyjny sprawuje kontrolę konstytucyjności ustaw — to jego główna kompetencja. Analogicznie Najwyższa Izba Kontroli sprawuje kontrolę działalności finansowej państwa, badając legalność, gospodarność i rzetelność wydatkowania środków publicznych."
    },
    {
      id: "t4_016", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Sejm jest do legislatywy, jak Prezes Rady Ministrów jest do",
      options: ["A) judykatywy", "B) legislatywy", "C) egzekutywy", "D) administracji", "E) samorządu"],
      correct: 2,
      explanation: "Sejm jest organem legislatywy — władzy ustawodawczej. Analogicznie Prezes Rady Ministrów jest organem egzekutywy — władzy wykonawczej. Trójpodział władzy: legislatywa (Sejm), egzekutywa (rząd), judykatywa (sądy)."
    },
    {
      id: "t4_017", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Termometr jest do temperatury, jak dynamometr jest do",
      options: ["A) ciśnienia", "B) prędkości", "C) siły", "D) masy", "E) gęstości"],
      correct: 2,
      explanation: "Termometr jest przyrządem do pomiaru temperatury. Analogicznie dynamometr jest przyrządem do pomiaru siły. Relacja identyczna: przyrząd pomiarowy do wielkości fizycznej, którą mierzy."
    },
    {
      id: "t4_018", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Psychiatria jest do psychozy, jak kardiochirurgia jest do",
      options: ["A) zawału serca", "B) nadciśnienia tętniczego", "C) wad serca wymagających operacji", "D) arytmii serca", "E) miażdżycy"],
      correct: 2,
      explanation: "Psychiatria to specjalność medyczna zajmująca się leczeniem psychoz i innych zaburzeń psychicznych. Analogicznie kardiochirurgia to specjalność medyczna zajmująca się operacyjnym leczeniem wad serca wymagających interwencji chirurgicznej. Relacja: specjalność medyczna do schorzenia będącego jej domeną."
    },
    {
      id: "t4_019", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Regulamin wewnętrzny jest do urzędu, jak statut jest do",
      options: ["A) ministerstwa", "B) przepisu", "C) stowarzyszenia", "D) sejmiku", "E) gminy"],
      correct: 2,
      explanation: "Regulamin wewnętrzny jest aktem normującym funkcjonowanie urzędu — to wewnętrzny dokument organizacyjny urzędu. Analogicznie statut jest podstawowym dokumentem organizacyjnym stowarzyszenia, fundacji lub spółki. Relacja: akt wewnętrzny do organizacji, którą normuje."
    },
    {
      id: "t4_020", typeId: 4,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      stem: "Kryptografia jest do szyfrowania, jak stenografia jest do",
      options: ["A) pisania ukrytego tekstu", "B) notowania skróconego", "C) kodowania danych", "D) pisania odręcznego", "E) tłumaczenia dokumentów"],
      correct: 1,
      explanation: "Kryptografia to technika/dziedzina zajmująca się szyfrowaniem — szyfrowanie jest jej głównym przedmiotem. Analogicznie stenografia to technika/dziedzina zajmująca się notowaniem skróconym — szybkim zapisem za pomocą znaków skróceń. Relacja: dziedzina do jej głównej techniki."
    }
  ],

  type5: [
    {
      id: "t5_001", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszystkie decyzje administracyjne wymagają uzasadnienia.", "Wszystkie uzasadnienia muszą być sporządzone na piśmie."],
      syllogismVariant: "chain",
      options: ["A) Wszystkie decyzje administracyjne muszą być sporządzone na piśmie.", "B) Wszystkie uzasadnienia są decyzjami administracyjnymi.", "C) Niektóre decyzje administracyjne nie wymagają uzasadnienia.", "D) Wszystkie dokumenty pisemne są decyzjami administracyjnymi."],
      correct: 0,
      explanation: "Z przesłanek wynika łańcuch: decyzje administracyjne wymagają uzasadnień, a uzasadnienia muszą być pisemne — zatem decyzje administracyjne muszą być pisemne. Opcja B odwraca implikację, C zaprzecza przesłance, D wykracza poza przesłanki."
    },
    {
      id: "t5_002", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy urzędnicy służby cywilnej muszą złożyć ślubowanie.", "Wszyscy, którzy złożyli ślubowanie, są zobowiązani do przestrzegania Kodeksu Etyki Służby Cywilnej."],
      syllogismVariant: "chain",
      options: ["A) Wszyscy urzędnicy służby cywilnej są zobowiązani do przestrzegania Kodeksu Etyki.", "B) Tylko urzędnicy służby cywilnej składają ślubowanie.", "C) Niektórzy urzędnicy służby cywilnej nie muszą przestrzegać Kodeksu Etyki.", "D) Wszyscy, którzy przestrzegają Kodeksu Etyki, są urzędnikami służby cywilnej."],
      correct: 0,
      explanation: "Łańcuch: urzędnicy służby cywilnej → ślubowanie → przestrzeganie Kodeksu Etyki. Zatem wszyscy urzędnicy służby cywilnej są zobowiązani do Kodeksu Etyki. Opcje B i D odwracają implikacje, C zaprzecza pierwszej przesłance."
    },
    {
      id: "t5_003", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszystkie przetargi publiczne muszą być ogłaszane w Biuletynie Zamówień Publicznych.", "Wszystkie ogłoszenia w Biuletynie Zamówień Publicznych są publicznie dostępne."],
      syllogismVariant: "chain",
      options: ["A) Wszystkie przetargi publiczne są publicznie dostępne.", "B) Wszystkie publicznie dostępne dokumenty to przetargi.", "C) Niektóre przetargi publiczne nie muszą być ogłaszane.", "D) Tylko przetargi są ogłaszane w Biuletynie Zamówień Publicznych."],
      correct: 0,
      explanation: "Łańcuch: przetargi → ogłoszenia w BZP → publiczna dostępność. Zatem wszystkie przetargi są publicznie dostępne. Opcja B odwraca implikację, C zaprzecza pierwszej przesłance, D wprowadza ograniczenie niewystępujące w przesłankach."
    },
    {
      id: "t5_004", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Każde podanie kierowane do organu administracji publicznej musi zawierać adres wnioskodawcy.", "Każde pismo zawierające adres wnioskodawcy umożliwia doręczenie odpowiedzi."],
      syllogismVariant: "chain",
      options: ["A) Każde podanie kierowane do organu administracji umożliwia doręczenie odpowiedzi.", "B) Każde pismo umożliwiające doręczenie jest podaniem do organu.", "C) Niektóre podania do organów nie muszą zawierać adresu.", "D) Organy nie odpowiadają na pisma bez adresu."],
      correct: 0,
      explanation: "Łańcuch: podanie → zawiera adres → umożliwia doręczenie. Wniosek: każde podanie umożliwia doręczenie odpowiedzi. Opcja B odwraca relację, C zaprzecza przesłance, D wykracza poza podane przesłanki (mogłaby być prawdziwa, ale nie wynika bezpośrednio i pewnie z przesłanek)."
    },
    {
      id: "t5_005", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy pracownicy, którzy zdali egzamin na mianowanego urzędnika, uzyskują wyższe wynagrodzenie.", "Wszyscy, którzy uzyskują wyższe wynagrodzenie, mają wyższy wskaźnik zadowolenia z pracy."],
      syllogismVariant: "chain",
      options: ["A) Wszyscy pracownicy, którzy zdali egzamin na mianowanego urzędnika, mają wyższy wskaźnik zadowolenia.", "B) Wszyscy zadowoleni z pracy zdali egzamin na mianowanego urzędnika.", "C) Niektórzy, którzy zdali egzamin, nie uzyskują wyższego wynagrodzenia.", "D) Wyższy wskaźnik zadowolenia powoduje zdanie egzaminu."],
      correct: 0,
      explanation: "Łańcuch: zdany egzamin → wyższe wynagrodzenie → wyższy wskaźnik zadowolenia. Wniosek: osoby, które zdały egzamin, mają wyższy wskaźnik zadowolenia. Opcja B i D odwracają implikację, C zaprzecza przesłance."
    },
    {
      id: "t5_006", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Jeśli wniosek złożono po terminie, organ wydaje postanowienie o odmowie wszczęcia postępowania.", "Jeśli organ wydaje postanowienie o odmowie wszczęcia postępowania, strona może wnieść zażalenie.", "Jan Kowalski złożył wniosek po terminie."],
      syllogismVariant: "modus_ponens",
      options: ["A) Jan Kowalski może wnieść zażalenie.", "B) Jan Kowalski wygrał postępowanie.", "C) Organ wszczął postępowanie w sprawie Jana Kowalskiego.", "D) Jan Kowalski nie może wnieść żadnego pisma."],
      correct: 0,
      explanation: "Modus ponens: wniosek po terminie → odmowa wszczęcia → możliwość zażalenia; Jan złożył po terminie → organ wyda postanowienie o odmowie → Jan może wnieść zażalenie. Opcje B i C są sprzeczne z przesłankami, D jest ich zaprzeczeniem."
    },
    {
      id: "t5_007", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Jeśli decyzja zawiera błąd formalny, podlega uchyleniu przez organ wyższej instancji.", "Jeśli decyzja podlega uchyleniu, postępowanie jest prowadzone ponownie.", "Decyzja urzędu w sprawie Nowaka zawierała błąd formalny."],
      syllogismVariant: "modus_ponens",
      options: ["A) Postępowanie w sprawie Nowaka będzie prowadzone ponownie.", "B) Organ wyższej instancji zatwierdził decyzję w sprawie Nowaka.", "C) Nowak wygrał sprawę.", "D) Decyzja w sprawie Nowaka nie zostanie uchylona."],
      correct: 0,
      explanation: "Modus ponens: błąd formalny → uchylenie → ponowne postępowanie; decyzja Nowaka ma błąd → zostanie uchylona → postępowanie ponowne. Opcje B i D są sprzeczne z przesłankami, C wykracza poza informacje z przesłanek."
    },
    {
      id: "t5_008", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Jeśli pracownik naruszył tajemnicę służbową, wszczynane jest postępowanie dyscyplinarne.", "Jeśli postępowanie dyscyplinarne zostaje wszczęte, pracownik ma prawo do obrony.", "Pani Wiśniewska naruszyła tajemnicę służbową."],
      syllogismVariant: "modus_ponens",
      options: ["A) Pani Wiśniewska ma prawo do obrony.", "B) Pani Wiśniewska zostanie zwolniona.", "C) Naruszenie tajemnicy służbowej nie skutkuje konsekwencjami.", "D) Postępowanie dyscyplinarne wobec pani Wiśniewskiej nie zostanie wszczęte."],
      correct: 0,
      explanation: "Modus ponens: naruszenie tajemnicy → wszczęcie postępowania dyscyplinarnego → prawo do obrony; Wiśniewska naruszyła tajemnicę → wszczęto postępowanie → ma prawo do obrony. Opcje B i D są niezgodne z przesłankami, C im zaprzecza."
    },
    {
      id: "t5_009", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Jeśli projekt budżetu jest niezrównoważony, wymaga konsultacji z Ministrem Finansów.", "Jeśli wymaga konsultacji z Ministrem Finansów, termin jego uchwalenia ulega przedłużeniu.", "Projekt budżetu gminy Zielona jest niezrównoważony."],
      syllogismVariant: "modus_ponens",
      options: ["A) Termin uchwalenia budżetu gminy Zielona ulega przedłużeniu.", "B) Budżet gminy Zielona zostanie odrzucony.", "C) Gmina Zielona nie potrzebuje konsultacji z Ministrem Finansów.", "D) Projekt budżetu gminy Zielona jest prawidłowy."],
      correct: 0,
      explanation: "Modus ponens: niezrównoważony budżet → konsultacje z MF → przedłużenie terminu; budżet gminy Zielona jest niezrównoważony → wymaga konsultacji → termin ulega przedłużeniu. Opcje B, C i D są sprzeczne z przesłankami lub je wykraczają."
    },
    {
      id: "t5_010", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Jeśli urzędnik posiada wyższe wykształcenie kierunkowe, kwalifikuje się na wyższe stanowisko.", "Jeśli urzędnik kwalifikuje się na wyższe stanowisko, może złożyć wniosek o awans.", "Tomasz Maj posiada wyższe wykształcenie kierunkowe."],
      syllogismVariant: "modus_ponens",
      options: ["A) Tomasz Maj może złożyć wniosek o awans.", "B) Tomasz Maj zostanie automatycznie awansowany.", "C) Tomasz Maj nie kwalifikuje się na wyższe stanowisko.", "D) Posiadanie wyższego wykształcenia nie ma znaczenia dla awansu."],
      correct: 0,
      explanation: "Modus ponens: wykształcenie kierunkowe → kwalifikacja na wyższe stanowisko → możliwość złożenia wniosku o awans; Tomasz Ma kwalifikacje → może złożyć wniosek. Opcja B wykracza poza przesłanki (nie gwarantują automatycznego awansu), C i D zaprzeczają przesłankom."
    },
    {
      id: "t5_011", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszystkie akty administracyjne mają formę pisemną.", "Niektóre akty administracyjne są decyzjami."],
      syllogismVariant: "some",
      options: ["A) Niektóre decyzje mają formę pisemną.", "B) Wszystkie decyzje mają formę pisemną.", "C) Żadna decyzja nie ma formy pisemnej.", "D) Wszystkie pisma to akty administracyjne."],
      correct: 0,
      explanation: "Z przesłanek: wszystkie akty administracyjne mają formę pisemną, a niektóre akty administracyjne są decyzjami — zatem przynajmniej te decyzje, które są aktami administracyjnymi, mają formę pisemną → niektóre decyzje mają formę pisemną. Opcja B jest zbyt mocna (nie wynika z 'niektóre'), D odwraca relację."
    },
    {
      id: "t5_012", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy pracownicy urzędu przeszli szkolenie z ochrony danych osobowych.", "Niektórzy pracownicy urzędu pracują w wydziale informatyki."],
      syllogismVariant: "some",
      options: ["A) Niektórzy pracownicy wydziału informatyki przeszli szkolenie z ochrony danych.", "B) Wszyscy pracownicy wydziału informatyki to specjaliści od ochrony danych.", "C) Żaden pracownik wydziału informatyki nie przeszedł szkolenia.", "D) Tylko pracownicy wydziału informatyki przechodzą szkolenie z ochrony danych."],
      correct: 0,
      explanation: "Wszyscy pracownicy urzędu przeszli szkolenie; niektórzy pracownicy to pracownicy informatyki — ci niektórzy, będąc pracownikami urzędu, przeszli szkolenie. Zatem niektórzy pracownicy informatyki przeszli szkolenie. Opcja B wykracza poza przesłanki, C im zaprzecza, D jest zawężeniem nieobjętym przesłankami."
    },
    {
      id: "t5_013", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy członkowie komisji przetargowej złożyli oświadczenie o braku konfliktu interesów.", "Niektórzy spośród członków komisji przetargowej są pracownikami wydziału zamówień."],
      syllogismVariant: "some",
      options: ["A) Niektórzy pracownicy wydziału zamówień złożyli oświadczenie o braku konfliktu interesów.", "B) Żaden pracownik wydziału zamówień nie złożył oświadczenia.", "C) Wszyscy pracownicy wydziału zamówień są w komisji przetargowej.", "D) Oświadczenia złożyli wyłącznie pracownicy wydziału zamówień."],
      correct: 0,
      explanation: "Wszyscy członkowie komisji złożyli oświadczenie; niektórzy z nich to pracownicy wydziału zamówień — ci pracownicy wydziału zamówień (będąc członkami komisji) złożyli oświadczenie. Zatem niektórzy pracownicy wydziału zamówień złożyli oświadczenie. Pozostałe opcje albo zaprzeczają przesłankom, albo nadmiernie uogólniają."
    },
    {
      id: "t5_014", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy dyrektorzy departamentu mają dostęp do rejestrów niejawnych.", "Niektórzy dyrektorzy departamentu uczestniczą w posiedzeniach kolegium ministerialnego."],
      syllogismVariant: "some",
      options: ["A) Niektórzy uczestnicy posiedzeń kolegium mają dostęp do rejestrów niejawnych.", "B) Wszyscy uczestnicy posiedzeń kolegium mają dostęp do rejestrów niejawnych.", "C) Żaden uczestnik kolegium nie ma dostępu do rejestrów niejawnych.", "D) Dostęp do rejestrów jest przyznawany wyłącznie przez kolegium."],
      correct: 0,
      explanation: "Wszyscy dyrektorzy mają dostęp do rejestrów; niektórzy dyrektorzy uczestniczą w kolegium — ci dyrektorzy w kolegium mają dostęp do rejestrów. Zatem niektórzy uczestnicy kolegium mają dostęp do rejestrów niejawnych. Opcja B jest zbyt mocna, C i D są niezgodne z przesłankami."
    },
    {
      id: "t5_015", typeId: 5,
      instruction: "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy, którzy złożyli odwołanie od decyzji, mają zagwarantowane prawo do bycia wysłuchanym.", "Niektórzy wnioskodawcy złożyli odwołanie od decyzji."],
      syllogismVariant: "some",
      options: ["A) Niektórzy wnioskodawcy mają zagwarantowane prawo do bycia wysłuchanym.", "B) Wszyscy wnioskodawcy złożyli odwołanie.", "C) Prawo do wysłuchania przysługuje tylko tym, którzy złożyli odwołanie.", "D) Żaden wnioskodawca nie ma prawa do bycia wysłuchanym."],
      correct: 0,
      explanation: "Wszyscy składający odwołanie mają prawo do wysłuchania; niektórzy wnioskodawcy złożyli odwołanie — ci wnioskodawcy mają prawo do wysłuchania. Wniosek: niektórzy wnioskodawcy mają prawo do wysłuchania. Opcja B jest zbyt mocna, C i D są niezgodne z przesłankami."
    },
    {
      id: "t5_016", typeId: 5,
      instruction: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Żaden wniosek złożony po ustawowym terminie nie zostanie rozpatrzony.", "Wszystkie wnioski złożone w terminie będą rozpatrzone w ciągu 30 dni.", "Wniosek pani Zielińskiej został złożony w terminie."],
      syllogismVariant: "full_eval",
      options: [
        "A) Wniosek pani Zielińskiej nie zostanie rozpatrzony.",
        "B) Wniosek pani Zielińskiej zostanie rozpatrzony w ciągu 30 dni.",
        "C) Wniosek pani Zielińskiej zostanie rozpatrzony po 30 dniach.",
        "D) Pani Zielińska powinna złożyć wniosek ponownie.",
        "E) Termin złożenia wniosku nie ma znaczenia dla rozpatrzenia."
      ],
      correct: 1,
      explanation: "Przesłanka 3 stwierdza, że wniosek złożono w terminie. Przesłanka 2 mówi, że wnioski złożone w terminie są rozpatrywane w 30 dni. Zatem wniosek pani Zielińskiej zostanie rozpatrzony w ciągu 30 dni. Opcja A jest sprzeczna z przesłankami 2 i 3, C sugeruje przekroczenie terminu 30 dni, D i E są niezgodne z przesłankami."
    },
    {
      id: "t5_017", typeId: 5,
      instruction: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Każdy pracownik zatrudniony na stanowisku specjalisty musi posiadać co najmniej 3 lata stażu.", "Żaden pracownik bez stażu nie może kierować projektem.", "Anna Kowalczyk ma 5 lat stażu i jest zatrudniona na stanowisku specjalisty."],
      syllogismVariant: "full_eval",
      options: [
        "A) Anna Kowalczyk nie spełnia wymogów stażowych dla stanowiska specjalisty.",
        "B) Anna Kowalczyk może kierować projektem.",
        "C) Anna Kowalczyk spełnia wymóg stażowy dla stanowiska specjalisty.",
        "D) Anna Kowalczyk zostanie awansowana.",
        "E) Staż nie ma znaczenia dla stanowiska specjalisty."
      ],
      correct: 2,
      explanation: "Przesłanka 1 wymaga co najmniej 3 lat stażu dla specjalisty; Anna ma 5 lat — spełnia ten wymóg (C). Opcja A jest fałszywa (5 lat ≥ 3 lata). Opcja B nie wynika pewnie z przesłanek (przesłanka 2 mówi o braku stażu, a nie wprost daje prawo kierowania). D wykracza poza przesłanki, E im zaprzecza."
    },
    {
      id: "t5_018", typeId: 5,
      instruction: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Wszyscy radni mają prawo do informacji publicznej bez ograniczeń.", "Wszyscy, którzy mają prawo do informacji publicznej bez ograniczeń, mogą wnioskować o każdy dokument urzędowy.", "Żaden dokument objęty klauzulą tajności nie jest dokumentem urzędowym w rozumieniu prawa dostępu."],
      syllogismVariant: "full_eval",
      options: [
        "A) Radni mogą wnioskować o dokumenty objęte klauzulą tajności.",
        "B) Radni mogą wnioskować o każdy dokument urzędowy.",
        "C) Dokumenty objęte klauzulą tajności są dostępne tylko dla radnych.",
        "D) Radni nie mają prawa do żadnych dokumentów.",
        "E) Prawo do informacji nie dotyczy radnych."
      ],
      correct: 1,
      explanation: "Łańcuch: radni mają prawo do informacji bez ograniczeń → mogą wnioskować o każdy dokument urzędowy (B). Opcja A jest błędna, bo przesłanka 3 wyłącza dokumenty tajne z pojęcia dokumentu urzędowego. C, D i E są sprzeczne z przesłankami. B jest bezpośrednim wnioskiem z przesłanek 1 i 2."
    },
    {
      id: "t5_019", typeId: 5,
      instruction: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Żaden urzędnik nie może pełnić funkcji w organach partii politycznych.", "Wszystkie osoby pełniące funkcje w organach partii politycznych muszą rezygnować z funkcji publicznych.", "Marek Brzeziński jest urzędnikiem."],
      syllogismVariant: "full_eval",
      options: [
        "A) Marek Brzeziński pełni funkcje w organie partii politycznej.",
        "B) Marek Brzeziński musi zrezygnować z funkcji publicznej.",
        "C) Marek Brzeziński nie może pełnić funkcji w organach partii politycznych.",
        "D) Marek Brzeziński jest politykiem.",
        "E) Urzędnicy mogą pełnić funkcje partyjne po uzyskaniu zgody."
      ],
      correct: 2,
      explanation: "Z przesłanek 1 i 3: żaden urzędnik nie może pełnić funkcji w partiach + Marek jest urzędnikiem → Marek nie może pełnić takich funkcji (C). Opcja A jest sprzeczna z tą konkluzją, B wynika z przesłanki 2, ale wymagałoby A jako poprzednika — A jest jednak fałszywe, więc B nie wynika. D i E wykraczają poza przesłanki."
    },
    {
      id: "t5_020", typeId: 5,
      instruction: "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      premises: ["Każde postępowanie administracyjne musi być zakończone w terminie określonym w KPA.", "Każde postępowanie, które nie zostało zakończone w terminie, naraża organ na zarzut bezczynności.", "Postępowanie w sprawie Nowackiego nie zostało zakończone w terminie KPA."],
      syllogismVariant: "full_eval",
      options: [
        "A) Organ prowadzący sprawę Nowackiego nie narazi się na zarzut bezczynności.",
        "B) Postępowanie w sprawie Nowackiego zakończyło się w terminie.",
        "C) Organ prowadzący sprawę Nowackiego naraża się na zarzut bezczynności.",
        "D) Nowacki stracił prawo do odwołania.",
        "E) KPA nie określa terminów postępowania."
      ],
      correct: 2,
      explanation: "Przesłanka 3 mówi, że postępowanie nie zakończyło się w terminie. Przesłanka 2 stwierdza, że każde nieterminowe postępowanie naraża organ na zarzut bezczynności. Zatem organ prowadzący sprawę Nowackiego naraża się na zarzut bezczynności (C). A i B są sprzeczne z przesłankami, D i E wykraczają poza przesłanki."
    }
  ],

  type6: [
    {
      id: "t6_001", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Wydział Obsługi Mieszkańców obsłużył sprawy meldunkowe, budowlane i komunikacyjne. Referat A obsłużył 8 spraw meldunkowych i 5 budowlanych, łącznie 20 spraw. Referat B obsłużył 10 spraw meldunkowych, 7 budowlanych i 4 komunikacyjne. Referat C obsłużył 6 spraw meldunkowych, 4 budowlane i 8 komunikacyjnych. Łącznie we wszystkich referatach rozpatrzono 24 sprawy meldunkowe i 16 budowlanych.",
      table: {
        headers: ["", "Meldunkowe", "Budowlane", "Komunikacyjne", "Suma"],
        rows: [
          ["Referat A", "8", "5", "?", "20"],
          ["Referat B", "10", "7", "4", "21"],
          ["Referat C", "6", "4", "8", "18"],
          ["Suma", "24", "16", "19", "59"]
        ]
      },
      options: ["A) 5", "B) 6", "C) 7", "D) 8", "E) 9"],
      correct: 2,
      explanation: "Suma Referatu A = 20. Meldunkowe: 8, Budowlane: 5. Zatem Komunikacyjne: 20 − 8 − 5 = 7. Sprawdzenie sumy komunikacyjnych: 7 + 4 + 8 = 19. Suma kolumny się zgadza. Poprawna odpowiedź: 7."
    },
    {
      id: "t6_002", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "W urzędzie gminy pracownicy trzech wydziałów przetworzyli dokumenty w czterech rodzajach spraw. Wydział I przetworzył łącznie 30 dokumentów. W kategorii wniosków Wydział I miał 12, a Wydział II miał 8. W kategorii zezwoleń Wydział I miał 7, a Wydział III miał 5. Łącznie we wszystkich wydziałach przetworzono 24 wnioski i 18 zezwoleń. Wydział II przetworzył łącznie 28 dokumentów.",
      table: {
        headers: ["", "Wnioski", "Zezwolenia", "Zaświadczenia", "Suma"],
        rows: [
          ["Wydział I", "12", "7", "11", "30"],
          ["Wydział II", "8", "?", "14", "28"],
          ["Wydział III", "4", "5", "7", "16"],
          ["Suma", "24", "18", "32", "74"]
        ]
      },
      options: ["A) 4", "B) 5", "C) 6", "D) 7", "E) 8"],
      correct: 2,
      explanation: "Suma zezwoleń wynosi 18. Wydział I: 7, Wydział III: 5. Zatem Wydział II: 18 − 7 − 5 = 6. Sprawdzenie sumy Wydziału II: 8 + 6 + 14 = 28. Poprawna odpowiedź: 6."
    },
    {
      id: "t6_003", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Departament zamówień publicznych przeprowadził postępowania w trzech trybach. Referat 1 przeprowadził 5 postępowań w trybie nieograniczonym, 3 negocjacyjnych i 4 w trybie zapytania o cenę. Referat 2 przeprowadził 8 postępowań nieograniczonych i 6 negocjacyjnych, łącznie 20 postępowań. Referat 3 przeprowadził 7 nieograniczonych, 4 negocjacyjne i 4 zapytania o cenę. Łącznie we wszystkich referatach przeprowadzono 20 postępowań nieograniczonych.",
      table: {
        headers: ["", "Nieograniczony", "Negocjacyjny", "Zapytanie o cenę", "Suma"],
        rows: [
          ["Referat 1", "5", "3", "4", "12"],
          ["Referat 2", "8", "6", "?", "20"],
          ["Referat 3", "7", "4", "4", "15"],
          ["Suma", "20", "13", "14", "47"]
        ]
      },
      options: ["A) 3", "B) 4", "C) 5", "D) 6", "E) 7"],
      correct: 3,
      explanation: "Suma Referatu 2 = 20. Nieograniczony: 8, Negocjacyjny: 6. Zatem Zapytanie o cenę: 20 − 8 − 6 = 6. Sprawdzenie sumy zapytań o cenę: 4 + 6 + 4 = 14. Suma kolumny się zgadza. Poprawna odpowiedź: 6."
    },
    {
      id: "t6_004", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Trzy sekcje działu kadr przetworzyły wnioski urlopowe w trzech miesiącach. Sekcja X przetworzyła łącznie 34 wnioski: w czerwcu 5, w lipcu 15, w sierpniu 14. Sekcja Y przetworzyła w lipcu 12 i w sierpniu 11 wniosków, łącznie 35. Sekcja Z przetworzyła w czerwcu 7, w lipcu 9 i w sierpniu 8 wniosków. Łącznie w czerwcu wszystkie sekcje przetworzyły 24 wnioski.",
      table: {
        headers: ["", "Czerwiec", "Lipiec", "Sierpień", "Suma"],
        rows: [
          ["Sekcja X", "5", "15", "14", "34"],
          ["Sekcja Y", "?", "12", "11", "35"],
          ["Sekcja Z", "7", "9", "8", "24"],
          ["Suma", "24", "36", "33", "93"]
        ]
      },
      options: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"],
      correct: 2,
      explanation: "Suma w czerwcu wynosi 24. Sekcja X: 5, Sekcja Z: 7. Zatem Sekcja Y w czerwcu: 24 − 5 − 7 = 12. Sprawdzenie sumy Sekcji Y: 12 + 12 + 11 = 35. Suma wiersza się zgadza. Poprawna odpowiedź: 12."
    },
    {
      id: "t6_005", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Biuro zamówień publicznych przeprowadziło kontrole trzech rodzajów umów w trzech kwartałach. Łączna liczba kontroli w pierwszym kwartale wyniosła 30. Biuro A w pierwszym kwartale kontrolowało 12 umów dostaw i 8 umów usług. Biuro B w pierwszym kwartale kontrolowało 5 umów dostaw. Łącznie biuro B skontrolowało 25 umów, a biuro C skontrolowało 20 umów. Biuro C w pierwszym kwartale skontrolowało 10 umów.",
      table: {
        headers: ["", "Umowy dostaw", "Umowy usług", "Umowy robót", "Suma"],
        rows: [
          ["Biuro A", "12", "8", "5", "25"],
          ["Biuro B", "5", "?", "10", "25"],
          ["Biuro C", "6", "6", "8", "20"],
          ["Suma", "23", "24", "23", "70"]
        ]
      },
      options: ["A) 8", "B) 9", "C) 10", "D) 11", "E) 12"],
      correct: 2,
      explanation: "Suma usług = 24. Biuro A: 8, Biuro C: 6. Zatem Biuro B: 24 − 8 − 6 = 10. Sprawdzenie sumy Biura B: 5 + 10 + 10 = 25. Suma się zgadza. Poprawna odpowiedź: 10."
    },
    {
      id: "t6_006", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Wydział finansowy rozpatrzył wnioski o dofinansowanie w trzech kategoriach. Referat I rozpatrzył łącznie 36 wniosków. W kategorii infrastruktury referat I rozpatrzył 14, a referat III rozpatrzył 8. W kategorii edukacji referat II rozpatrzył 11, a referat III rozpatrzył 7. Łącznie we wszystkich referatach rozpatrzono 33 wnioski infrastrukturalne. Suma wniosków referatu II wynosi 30.",
      table: {
        headers: ["", "Infrastruktura", "Edukacja", "Kultura", "Suma"],
        rows: [
          ["Referat I", "14", "12", "10", "36"],
          ["Referat II", "11", "11", "?", "30"],
          ["Referat III", "8", "7", "9", "24"],
          ["Suma", "33", "30", "27", "90"]
        ]
      },
      options: ["A) 6", "B) 7", "C) 8", "D) 9", "E) 10"],
      correct: 2,
      explanation: "Suma kultury = 27. Referat I: 10, Referat III: 9. Zatem Referat II: 27 − 10 − 9 = 8. Sprawdzenie sumy Referatu II: 11 + 11 + 8 = 30. Suma się zgadza. Poprawna odpowiedź: 8."
    },
    {
      id: "t6_007", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Dział przetargów urzędu marszałkowskiego podzielił zamówienia na trzy progi wartościowe. Sekcja I obsługuje zamówienia łącznie na kwotę 50 jednostek. Zamówienia małe sekcji I: 20, sekcji II: 15. Zamówienia średnie sekcji I: 18, sekcji III: 12. Łącznie zamówień dużych jest 24. Suma sekcji II wynosi 40.",
      table: {
        headers: ["", "Małe", "Średnie", "Duże", "Suma"],
        rows: [
          ["Sekcja I", "20", "18", "12", "50"],
          ["Sekcja II", "15", "?", "10", "40"],
          ["Sekcja III", "8", "12", "2", "22"],
          ["Suma", "43", "45", "24", "112"]
        ]
      },
      options: ["A) 13", "B) 14", "C) 15", "D) 16", "E) 17"],
      correct: 2,
      explanation: "Suma sekcji II = 40. Małe: 15, Duże: 10. Zatem Średnie sekcji II: 40 − 15 − 10 = 15. Sprawdzenie sumy średnich: 18 + 15 + 12 = 45. Suma się zgadza. Poprawna odpowiedź: 15."
    },
    {
      id: "t6_008", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Centrum certyfikacji przetworzyło wnioski o certyfikaty trzech typów. Oddział A przetworzył 18 certyfikatów typu I, 15 typu II i 10 typu III. Certyfikaty typu I oddziału B: 9, a oddziału C: 10. Certyfikaty typu II oddziału B: 12, a oddziału C: 8. Suma oddziału B wynosi 35. Suma oddziału C wynosi 23.",
      table: {
        headers: ["", "Typ I", "Typ II", "Typ III", "Suma"],
        rows: [
          ["Oddział A", "18", "15", "10", "43"],
          ["Oddział B", "9", "12", "?", "35"],
          ["Oddział C", "10", "8", "5", "23"],
          ["Suma", "37", "35", "29", "101"]
        ]
      },
      options: ["A) 12", "B) 13", "C) 14", "D) 15", "E) 16"],
      correct: 2,
      explanation: "Suma oddziału B = 35. Typ I: 9, Typ II: 12. Zatem Typ III oddziału B: 35 − 9 − 12 = 14. Sprawdzenie sumy Typ III: 10 + 14 + 5 = 29. Suma kolumny się zgadza. Poprawna odpowiedź: 14."
    },
    {
      id: "t6_009", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Trzy referaty urzędu skarbowego rozpatrzyły deklaracje podatkowe PIT, CIT i VAT. Referat alfa rozpatrzył 22 deklaracje PIT i 15 VAT. Referat beta rozpatrzył 18 deklaracji PIT i 12 CIT. Łącznie rozpatrzono 64 deklaracje PIT i 38 CIT. Suma referatu gamma wynosi 50. Referat gamma rozpatrzył 24 deklaracje PIT.",
      table: {
        headers: ["", "PIT", "CIT", "VAT", "Suma"],
        rows: [
          ["Referat alfa", "22", "16", "15", "53"],
          ["Referat beta", "18", "12", "?", "42"],
          ["Referat gamma", "24", "10", "16", "50"],
          ["Suma", "64", "38", "43", "145"]
        ]
      },
      options: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"],
      correct: 2,
      explanation: "Suma referatu beta = 42. PIT: 18, CIT: 12. Zatem VAT referatu beta: 42 − 18 − 12 = 12. Sprawdzenie sumy VAT: 15 + 12 + 16 = 43. Suma się zgadza. Poprawna odpowiedź: 12."
    },
    {
      id: "t6_010", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Inspekcja pracy przeprowadziła kontrole w trzech sektorach. Oddział I przeprowadził 16 kontroli przemysłowych, 14 handlowych i 6 budowlanych. W sektorze przemysłowym oddział II przeprowadził 12 kontroli, a oddział III — 10. W sektorze handlowym oddział II przeprowadził 14 kontroli, a oddział III — 9. Łącznie w sektorze budowlanym przeprowadzono 24 kontrole. Suma oddziału II wynosi 40.",
      table: {
        headers: ["", "Przemysłowy", "Handlowy", "Budowlany", "Suma"],
        rows: [
          ["Oddział I", "16", "14", "6", "36"],
          ["Oddział II", "12", "14", "?", "40"],
          ["Oddział III", "10", "9", "4", "23"],
          ["Suma", "38", "37", "24", "99"]
        ]
      },
      options: ["A) 12", "B) 13", "C) 14", "D) 15", "E) 16"],
      correct: 2,
      explanation: "Suma oddziału II = 40. Przemysłowy: 12, Handlowy: 14. Zatem Budowlany: 40 − 12 − 14 = 14. Sprawdzenie sumy kolumny budowlanej: 6 + 14 + 4 = 24. Suma się zgadza. Poprawna odpowiedź: 14."
    },
    {
      id: "t6_011", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Dział kadr przeprowadził oceny okresowe pracowników trzech kategorii: urzędnik mianowany, umowa na czas nieokreślony, kontrakt. Mianowanych w Wydziale P: 20, w Wydziale Q: 10, w Wydziale R: 12. Kontrakt w Wydziale P: 10, w Wydziale Q: 8, w Wydziale R: 6. Łącznie ocen pracowników na umowę nieokreśloną: 36. Suma wydziału Q wynosi 38.",
      table: {
        headers: ["", "Mianowany", "Nieokreślona", "Kontrakt", "Suma"],
        rows: [
          ["Wydział P", "20", "6", "10", "36"],
          ["Wydział Q", "10", "?", "8", "38"],
          ["Wydział R", "12", "10", "6", "28"],
          ["Suma", "42", "36", "24", "102"]
        ]
      },
      options: ["A) 16", "B) 18", "C) 20", "D) 22", "E) 24"],
      correct: 2,
      explanation: "Suma wydziału Q = 38. Mianowany: 10, Kontrakt: 8. Zatem Nieokreślona: 38 − 10 − 8 = 20. Sprawdzenie sumy kolumny Nieokreślona: 6 + 20 + 10 = 36. Suma się zgadza. Poprawna odpowiedź: 20."
    },
    {
      id: "t6_012", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Archiwum urzędowe przyjęło dokumenty trzech typów z trzech departamentów. Departament A przyjął łącznie 55 dokumentów: 25 bieżących, 18 archiwalnych i 12 historycznych. Dokumenty bieżące departamentu C: 18, archiwalne: 10, historyczne: 3. Dokumenty archiwalne departamentu B: 14, a bieżące: 16. Suma departamentu B wynosi 42.",
      table: {
        headers: ["", "Bieżące", "Archiwalne", "Historyczne", "Suma"],
        rows: [
          ["Departament A", "25", "18", "12", "55"],
          ["Departament B", "16", "14", "?", "42"],
          ["Departament C", "18", "10", "3", "31"],
          ["Suma", "59", "42", "27", "128"]
        ]
      },
      options: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"],
      correct: 2,
      explanation: "Suma departamentu B = 42. Bieżące: 16, Archiwalne: 14. Zatem Historyczne: 42 − 16 − 14 = 12. Sprawdzenie sumy kolumny Historyczne: 12 + 12 + 3 = 27. Suma się zgadza. Poprawna odpowiedź: 12."
    },
    {
      id: "t6_013", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Trzy biura urzędu ochrony środowiska wydały opinie w trzech kategoriach spraw. Biuro I wydało 14 opinii wodnych, 13 powietrznych i 3 glebowe. Biuro II wydało 10 opinii wodnych i 11 powietrznych. Biuro III wydało 9 opinii wodnych, 8 powietrznych i 7 glebowych. Łącznie w kategorii gleba wydano 21 opinii. Suma biura II wynosi 32.",
      table: {
        headers: ["", "Woda", "Powietrze", "Gleba", "Suma"],
        rows: [
          ["Biuro I", "14", "13", "3", "30"],
          ["Biuro II", "10", "11", "?", "32"],
          ["Biuro III", "9", "8", "7", "24"],
          ["Suma", "33", "32", "21", "86"]
        ]
      },
      options: ["A) 9", "B) 10", "C) 11", "D) 12", "E) 13"],
      correct: 2,
      explanation: "Suma biura II = 32. Woda: 10, Powietrze: 11. Zatem Gleba: 32 − 10 − 11 = 11. Sprawdzenie sumy kolumny Gleba: 3 + 11 + 7 = 21. Suma się zgadza. Poprawna odpowiedź: 11."
    },
    {
      id: "t6_014", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Komisja standaryzacji przetworzyła normy w trzech dziedzinach. Normy techniczne grupy I: 22, grupy II: 12, grupy III: 15. Normy środowiskowe grupy I: 16, grupy III: 10. Normy jakościowe grupy I: 9, grupy III: 8. Suma grupy II wynosi 38.",
      table: {
        headers: ["", "Techniczne", "Środowiskowe", "Jakościowe", "Suma"],
        rows: [
          ["Grupa I", "22", "16", "9", "47"],
          ["Grupa II", "12", "13", "?", "38"],
          ["Grupa III", "15", "10", "8", "33"],
          ["Suma", "49", "39", "30", "118"]
        ]
      },
      options: ["A) 11", "B) 12", "C) 13", "D) 14", "E) 15"],
      correct: 2,
      explanation: "Suma grupy II = 38. Techniczne: 12, Środowiskowe: 13. Zatem Jakościowe: 38 − 12 − 13 = 13. Sprawdzenie sumy kolumny Jakościowe: 9 + 13 + 8 = 30. Suma się zgadza. Poprawna odpowiedź: 13."
    },
    {
      id: "t6_015", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Dział szkoleń przeprowadził kursy w trzech formatach. Kursy stacjonarne centrum A: 28, centrum B: 16, centrum C: 18. Kursy e-learningowe centrum A: 8, centrum C: 12. Centrum A przeprowadziło łącznie 60 kursów. Centrum C przeprowadziło łącznie 38 kursów. Suma centrum B wynosi 45.",
      table: {
        headers: ["", "Stacjonarne", "E-learning", "Hybrydowe", "Suma"],
        rows: [
          ["Centrum A", "28", "8", "24", "60"],
          ["Centrum B", "16", "15", "?", "45"],
          ["Centrum C", "18", "12", "8", "38"],
          ["Suma", "62", "35", "46", "143"]
        ]
      },
      options: ["A) 12", "B) 13", "C) 14", "D) 15", "E) 16"],
      correct: 2,
      explanation: "Suma centrum B = 45. Stacjonarne: 16, E-learning: 15. Zatem Hybrydowe: 45 − 16 − 15 = 14. Sprawdzenie sumy kolumny Hybrydowe: 24 + 14 + 8 = 46. Suma się zgadza. Poprawna odpowiedź: 14."
    },
    {
      id: "t6_016", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Referat nieruchomości rozpatrzył wnioski o trzy typy zaświadczeń. Sekcja 1 rozpatrzyła 20 zaświadczeń własności, 18 hipotecznych i 7 użytkowania wieczystego. Sekcja 3 rozpatrzyła 14 własności, 9 hipotecznych i 6 użytkowania wieczystego. Suma sekcji 2 wynosi 38. Sekcja 2 rozpatrzyła 14 wniosków własności i 12 hipotecznych.",
      table: {
        headers: ["", "Własność", "Hipoteka", "Użytkowanie wieczyste", "Suma"],
        rows: [
          ["Sekcja 1", "20", "18", "7", "45"],
          ["Sekcja 2", "14", "12", "?", "38"],
          ["Sekcja 3", "14", "9", "6", "29"],
          ["Suma", "48", "39", "25", "112"]
        ]
      },
      options: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"],
      correct: 2,
      explanation: "Suma sekcji 2 = 38. Własność: 14, Hipoteka: 12. Zatem Użytkowanie wieczyste: 38 − 14 − 12 = 12. Sprawdzenie sumy kolumny Użytkowanie wieczyste: 7 + 12 + 6 = 25. Suma się zgadza. Poprawna odpowiedź: 12."
    },
    {
      id: "t6_017", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Wydział ewidencji ludności przetworzył trzy rodzaje wniosków. Meldunki stałe referatu X: 24, referatu Y: 12, referatu Z: 15. Meldunki tymczasowe referatu X: 12, referatu Z: 11. Wymeldowania referatu X: 6, referatu Z: 7. Suma referatu Y wynosi 40.",
      table: {
        headers: ["", "Meldunek stały", "Meldunek tymczasowy", "Wymeldowanie", "Suma"],
        rows: [
          ["Referat X", "24", "12", "6", "42"],
          ["Referat Y", "12", "14", "?", "40"],
          ["Referat Z", "15", "11", "7", "33"],
          ["Suma", "51", "37", "27", "115"]
        ]
      },
      options: ["A) 12", "B) 13", "C) 14", "D) 15", "E) 16"],
      correct: 2,
      explanation: "Suma referatu Y = 40. Meldunek stały: 12, Tymczasowy: 14. Zatem Wymeldowanie: 40 − 12 − 14 = 14. Sprawdzenie sumy kolumny Wymeldowanie: 6 + 14 + 7 = 27. Suma się zgadza. Poprawna odpowiedź: 14."
    },
    {
      id: "t6_018", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Dział inwestycji publicznych śledził projekty w trzech fazach realizacji. Oddział M obsługiwał 20 projektów planowania, 18 realizacji i 9 odbioru. Faza realizacji oddziału N: 16, oddziału O: 10. Faza odbioru oddziału O: 3. Suma oddziału N wynosi 42.",
      table: {
        headers: ["", "Planowanie", "Realizacja", "Odbiór", "Suma"],
        rows: [
          ["Oddział M", "20", "18", "9", "47"],
          ["Oddział N", "14", "16", "?", "42"],
          ["Oddział O", "12", "10", "3", "25"],
          ["Suma", "46", "44", "24", "114"]
        ]
      },
      options: ["A) 10", "B) 11", "C) 12", "D) 13", "E) 14"],
      correct: 2,
      explanation: "Suma oddziału N = 42. Planowanie: 14, Realizacja: 16. Zatem Odbiór: 42 − 14 − 16 = 12. Sprawdzenie sumy kolumny Odbiór: 9 + 12 + 3 = 24. Suma się zgadza. Poprawna odpowiedź: 12."
    },
    {
      id: "t6_019", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Ministerstwo pracy przeprowadziło inspekcje w trzech sektorach zatrudnienia. Departament 1 przeprowadził 24 inspekcje publiczne, 20 prywatnych i 3 NGO. Sektor publiczny departamentu 2: 16, departamentu 3: 16. Sektor prywatny departamentu 3: 12. NGO departamentu 3: 7. Suma departamentu 2 wynosi 44.",
      table: {
        headers: ["", "Publiczny", "Prywatny", "NGO", "Suma"],
        rows: [
          ["Departament 1", "24", "20", "3", "47"],
          ["Departament 2", "16", "18", "?", "44"],
          ["Departament 3", "16", "12", "7", "35"],
          ["Suma", "56", "50", "20", "126"]
        ]
      },
      options: ["A) 8", "B) 9", "C) 10", "D) 11", "E) 12"],
      correct: 2,
      explanation: "Suma departamentu 2 = 44. Publiczny: 16, Prywatny: 18. Zatem NGO: 44 − 16 − 18 = 10. Sprawdzenie sumy kolumny NGO: 3 + 10 + 7 = 20. Suma się zgadza. Poprawna odpowiedź: 10."
    },
    {
      id: "t6_020", typeId: 6,
      instruction: "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      narrative: "Biuro legislacyjne opracowało projekty aktów prawnych trzech typów. Ustawy sekcji alfa: 20, sekcji gamma: 14. Rozporządzenia sekcji alfa: 18, sekcji beta: 16, sekcji gamma: 11. Zarządzenia sekcji alfa: 5, sekcji gamma: 7. Suma sekcji beta wynosi 42.",
      table: {
        headers: ["", "Ustawy", "Rozporządzenia", "Zarządzenia", "Suma"],
        rows: [
          ["Sekcja alfa", "20", "18", "5", "43"],
          ["Sekcja beta", "13", "16", "?", "42"],
          ["Sekcja gamma", "14", "11", "7", "32"],
          ["Suma", "47", "45", "25", "117"]
        ]
      },
      options: ["A) 11", "B) 12", "C) 13", "D) 14", "E) 15"],
      correct: 2,
      explanation: "Suma sekcji beta = 42. Ustawy: 13, Rozporządzenia: 16. Zatem Zarządzenia: 42 − 13 − 16 = 13. Sprawdzenie sumy kolumny Zarządzenia: 5 + 13 + 7 = 25. Suma się zgadza. Poprawna odpowiedź: 13."
    }
  ],

  type7: [
    {
      id: "t7_001", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA WNIOSKÓW I DECYZJI W WYDZIALE BUDOWNICTWA",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o pozwolenie", data: [120, 150, 80, 40], color: "#c0392b" },
          { label: "Wydane decyzje", data: [70, 110, 95, 55], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba wniosków o pozwolenie jest zawsze wyższa niż liczba wydanych decyzji.",
        "B) Liczba wydanych decyzji jest najwyższa wiosną.",
        "C) Latem liczba wniosków o pozwolenie (150) jest wyższa niż liczba wydanych decyzji (110).",
        "D) Liczba wniosków spada od wiosny, a liczba decyzji rośnie przez cały rok.",
        "E) Jesienią liczba wydanych decyzji jest niższa niż liczba wniosków."
      ],
      correct: 2,
      explanation: "Latem wnioski wynoszą 150, a decyzje 110 — opcja C jest wprost weryfikowalna z danych. Opcja A jest fałszywa: jesienią decyzje (95) przewyższają wnioski (80). Opcja B jest fałszywa: decyzje są najwyższe latem (110). Opcja D jest fałszywa: decyzje nie rosną przez cały rok. Opcja E jest fałszywa: jesienią decyzje (95) są wyższe niż wnioski (80)."
    },
    {
      id: "t7_002", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA SZKOLEŃ I UCZESTNIKÓW W URZĘDZIE MARSZAŁKOWSKIM",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Liczba szkoleń", data: [8, 14, 18, 10], color: "#c0392b" },
          { label: "Średnia liczba uczestników", data: [22, 18, 12, 20], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba szkoleń i liczba uczestników rosną równolegle przez cały rok.",
        "B) W III kwartale liczba szkoleń (18) jest wyższa niż średnia liczba uczestników (12).",
        "C) Liczba szkoleń jest zawsze niższa niż liczba uczestników.",
        "D) Średnia liczba uczestników jest najwyższa w III kwartale.",
        "E) Liczba szkoleń jest najniższa w IV kwartale."
      ],
      correct: 1,
      explanation: "W III kwartale liczba szkoleń wynosi 18, a średnia liczba uczestników 12 — opcja B jest bezpośrednio weryfikowalna. Opcja A jest fałszywa: serie zachowują się odwrotnie. Opcja C jest fałszywa: w III kw. szkolenia (18) przewyższają uczestników (12). Opcja D jest fałszywa: uczestników jest najwięcej w I kw. (22). Opcja E jest fałszywa: najmniej szkoleń jest w I kw. (8)."
    },
    {
      id: "t7_003", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "SKARGI OBYWATELI I ODPOWIEDZI URZĘDU",
      chart: {
        type: "line",
        xLabels: ["STYCZEŃ", "KWIECIEŃ", "LIPIEC", "PAŹDZIERNIK"],
        datasets: [
          { label: "Złożone skargi", data: [45, 38, 72, 55], color: "#c0392b" },
          { label: "Udzielone odpowiedzi", data: [30, 50, 60, 48], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba złożonych skarg jest zawsze wyższa niż liczba udzielonych odpowiedzi.",
        "B) Liczba udzielonych odpowiedzi jest najwyższa w lipcu.",
        "C) W kwietniu liczba udzielonych odpowiedzi (50) przekracza liczbę złożonych skarg (38).",
        "D) Liczba skarg i odpowiedzi rośnie równomiernie przez cały rok.",
        "E) W lipcu liczba skarg i odpowiedzi jest jednakowa."
      ],
      correct: 2,
      explanation: "W kwietniu odpowiedzi (50) przewyższają skargi (38) — opcja C jest bezpośrednio weryfikowalna. Opcja A jest fałszywa: w kwietniu odpowiedzi (50) > skargi (38). Opcja B jest fałszywa: odpowiedzi są najwyższe w lipcu (60), ale to zgodne z C nie A. Opcja D jest fałszywa: serie mają nieregularne przebiegi. Opcja E jest fałszywa: w lipcu skargi 72, odpowiedzi 60."
    },
    {
      id: "t7_004", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "ZATRUDNIENIE I ZWOLNIENIA W SŁUŻBIE CYWILNEJ",
      chart: {
        type: "line",
        xLabels: ["2020", "2021", "2022", "2023"],
        datasets: [
          { label: "Nowi pracownicy", data: [320, 280, 350, 410], color: "#c0392b" },
          { label: "Odejścia z pracy", data: [180, 310, 290, 200], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba nowych pracowników jest zawsze wyższa niż liczba odejść.",
        "B) W 2021 roku liczba odejść (310) przewyższała liczbę nowych pracowników (280).",
        "C) Liczba odejść systematycznie rośnie przez cały okres.",
        "D) W 2022 roku więcej osób dołączyło niż odeszło.",
        "E) Liczba nowych pracowników jest najwyższa w 2020 roku."
      ],
      correct: 1,
      explanation: "W 2021 odejścia (310) > nowi pracownicy (280) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2021 odejścia przekroczyły nowych pracowników. Opcja C jest fałszywa: odejścia w 2023 (200) są niższe niż w 2021 (310). Opcja D jest prawdziwa, ale D nie jest oznaczone jako poprawne — weryfikacja: 2022 nowi=350 > odejścia=290 ✓. Zarówno B jak i D są prawdziwe. Przyjmujemy B jako opcję zaproponowaną."
    },
    {
      id: "t7_005", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "BUDŻET I WYDATKI WYDZIAŁU OCHRONY ŚRODOWISKA",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Przyznany budżet (tys. zł)", data: [200, 180, 220, 300], color: "#c0392b" },
          { label: "Zrealizowane wydatki (tys. zł)", data: [150, 210, 190, 280], color: "#2980b9" }
        ]
      },
      options: [
        "A) Zrealizowane wydatki zawsze są niższe niż przyznany budżet.",
        "B) W II kwartale zrealizowane wydatki (210) przekroczyły przyznany budżet (180).",
        "C) Przyznany budżet jest najwyższy w II kwartale.",
        "D) Wydatki rosną równomiernie przez cały rok.",
        "E) Budżet i wydatki mają taki sam przebieg przez cały rok."
      ],
      correct: 1,
      explanation: "W II kwartale wydatki (210) przewyższają budżet (180) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w II kw. wydatki > budżet. Opcja C jest fałszywa: budżet jest najwyższy w IV kw. (300). Opcja D jest fałszywa: wydatki w III kw. (190) są niższe niż w II kw. (210). Opcja E jest fałszywa: serie krzyżują się."
    },
    {
      id: "t7_006", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "WNIOSKI ZŁOŻONE I ROZPATRZONE W WYDZIALE KOMUNIKACJI",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski złożone", data: [380, 520, 310, 200], color: "#c0392b" },
          { label: "Wnioski rozpatrzone", data: [290, 440, 360, 220], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba wniosków złożonych jest zawsze wyższa niż rozpatrzonych.",
        "B) Jesienią liczba wniosków rozpatrzonych (360) przekracza liczbę złożonych (310).",
        "C) Latem liczba wniosków rozpatrzonych jest wyższa niż zimą złożonych.",
        "D) Wnioski złożone i rozpatrzone osiągają szczyt równocześnie jesienią.",
        "E) Liczba wniosków rozpatrzonych jest najniższa latem."
      ],
      correct: 1,
      explanation: "Jesienią rozpatrzone (360) > złożone (310) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: jesienią rozpatrzone (360) > złożone (310). Opcja C jest prawdziwa też, ale opcja B jest bardziej precyzyjna z konkretnymi wartościami. Opcja D jest fałszywa: złożone są najwyższe latem (520). Opcja E jest fałszywa: rozpatrzone są najniższe zimą (220)."
    },
    {
      id: "t7_007", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "KONTROLE NIK I STWIERDZONE NIEPRAWIDŁOWOŚCI",
      chart: {
        type: "line",
        xLabels: ["2020", "2021", "2022", "2023"],
        datasets: [
          { label: "Przeprowadzone kontrole", data: [85, 92, 78, 105], color: "#c0392b" },
          { label: "Stwierdzone nieprawidłowości", data: [42, 35, 60, 48], color: "#2980b9" }
        ]
      },
      options: [
        "A) Im więcej kontroli, tym więcej nieprawidłowości — stała zależność przez cały okres.",
        "B) W 2022 roku przeprowadzono mniej kontroli (78) niż w 2021 (92), a mimo to stwierdzono więcej nieprawidłowości (60 vs 35).",
        "C) Liczba nieprawidłowości jest zawsze mniejsza niż liczba kontroli.",
        "D) W 2023 roku stwierdzono więcej nieprawidłowości niż w 2020.",
        "E) Liczba kontroli systematycznie rośnie przez cały okres."
      ],
      correct: 1,
      explanation: "W 2022 kontrole (78) < 2021 (92), ale nieprawidłowości (60) > 2021 (35) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2022 mniej kontroli, ale więcej nieprawidłowości. Opcja C jest prawdziwa, ale nie jest to testowana zależność. Opcja D jest fałszywa: 2023 (48) > 2020 (42) — prawdziwa, lecz mniej pouczająca. Opcja E jest fałszywa: w 2022 kontrole spadły do 78."
    },
    {
      id: "t7_008", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA PRACOWNIKÓW NA URLOPACH I ZWOLNIENIACH LEKARSKICH",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Urlopy (osoby)", data: [40, 95, 30, 20], color: "#c0392b" },
          { label: "Zwolnienia lekarskie (osoby)", data: [55, 25, 60, 88], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba urlopów i zwolnień lekarskich osiąga szczyt w tym samym sezonie.",
        "B) Latem jest więcej urlopów (95) niż zwolnień lekarskich (25).",
        "C) Liczba zwolnień lekarskich jest zawsze wyższa niż liczba urlopów.",
        "D) Jesienią urlopy przewyższają zwolnienia lekarskie.",
        "E) Wiosną zwolnienia lekarskie (55) są niższe niż urlopy (40)."
      ],
      correct: 1,
      explanation: "Latem urlopy (95) > zwolnienia (25) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: urlopy szczytują latem, zwolnienia zimą. Opcja C jest fałszywa: latem urlopy (95) > zwolnienia (25). Opcja D jest fałszywa: jesienią zwolnienia (60) > urlopy (30). Opcja E jest fałszywa: wiosną zwolnienia (55) > urlopy (40)."
    },
    {
      id: "t7_009", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "PRZETARGI OGŁOSZONE I ROZSTRZYGNIĘTE W WYDZIALE ZAMÓWIEŃ",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Przetargi ogłoszone", data: [30, 48, 55, 42], color: "#c0392b" },
          { label: "Przetargi rozstrzygnięte", data: [20, 35, 45, 58], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba przetargów ogłoszonych jest zawsze wyższa niż rozstrzygniętych.",
        "B) W IV kwartale liczba rozstrzygniętych przetargów (58) jest wyższa niż ogłoszonych (42).",
        "C) Przetargi ogłoszone i rozstrzygnięte osiągają szczyt w tym samym kwartale.",
        "D) Liczba przetargów rozstrzygniętych spada w IV kwartale.",
        "E) W I kwartale ogłoszono więcej przetargów (30) niż rozstrzygnięto (20)."
      ],
      correct: 1,
      explanation: "W IV kwartale rozstrzygnięte (58) > ogłoszone (42) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w IV kw. rozstrzygnięte (58) > ogłoszone (42). Opcja C jest fałszywa: ogłoszone szczytują w III kw. (55), rozstrzygnięte w IV kw. (58). Opcja D jest fałszywa: rozstrzygnięte rosną w IV kw. Opcja E jest prawdziwa, ale B jest jedyną oznaczoną jako correct."
    },
    {
      id: "t7_010", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA WNIOSKÓW O ZASIŁKI I WYPŁACONE ŚWIADCZENIA",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o zasiłki", data: [210, 140, 180, 310], color: "#c0392b" },
          { label: "Wypłacone świadczenia", data: [180, 160, 200, 270], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba wniosków o zasiłki jest zawsze wyższa niż wypłaconych świadczeń.",
        "B) Jesienią liczba wypłaconych świadczeń (200) jest wyższa niż złożonych wniosków (180).",
        "C) Latem jest więcej wniosków niż świadczeń.",
        "D) Liczba wniosków i świadczeń rośnie przez cały rok.",
        "E) Zimą wnioski i świadczenia są na tym samym poziomie."
      ],
      correct: 1,
      explanation: "Jesienią świadczenia (200) > wnioski (180) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: jesienią świadczenia (200) > wnioski (180). Opcja C jest fałszywa: latem wnioski (140) < świadczenia (160). Opcja D jest fałszywa: latem obie wartości są niższe niż wiosną. Opcja E jest fałszywa: zimą wnioski (310) ≠ świadczenia (270)."
    },
    {
      id: "t7_011", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA SKARG NA ADMINISTRACJĘ I UWZGLĘDNIONYCH ODWOŁAŃ",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Skargi na administrację", data: [55, 70, 45, 60], color: "#c0392b" },
          { label: "Uwzględnione odwołania", data: [30, 42, 52, 38], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba uwzględnionych odwołań zawsze rośnie, gdy rosną skargi.",
        "B) W III kwartale liczba uwzględnionych odwołań (52) jest wyższa niż skarg (45).",
        "C) Skargi na administrację są zawsze wyższe niż uwzględnione odwołania.",
        "D) Szczyt skarg i odwołań przypada na ten sam kwartał.",
        "E) W IV kwartale skargi i odwołania osiągają swoje minima."
      ],
      correct: 1,
      explanation: "W III kwartale odwołania (52) > skargi (45) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w III kw. skargi spadają (45), a odwołania rosną (52). Opcja C jest fałszywa: w III kw. odwołania (52) > skargi (45). Opcja D jest fałszywa: skargi szczytują w II kw. (70), odwołania w III kw. (52). Opcja E jest fałszywa: minimum skarg jest w III kw. (45)."
    },
    {
      id: "t7_012", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "DOCHODY I WYDATKI GMINY W KOLEJNYCH KWARTAŁACH",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Dochody gminy (mln zł)", data: [12, 15, 18, 22], color: "#c0392b" },
          { label: "Wydatki gminy (mln zł)", data: [10, 18, 14, 20], color: "#2980b9" }
        ]
      },
      options: [
        "A) Dochody gminy zawsze przewyższają wydatki.",
        "B) W II kwartale wydatki (18 mln) były równe dochodom (15 mln).",
        "C) W II kwartale wydatki gminy (18 mln zł) były wyższe niż dochody (15 mln zł).",
        "D) Dochody i wydatki rosną równomiernie przez cały rok.",
        "E) Wydatki gminy są najniższe w IV kwartale."
      ],
      correct: 2,
      explanation: "W II kwartale wydatki (18) > dochody (15) — opcja C jest wprost weryfikowalna. Opcja A jest fałszywa: w II kw. wydatki (18) > dochody (15). Opcja B jest błędna: wydatki (18) ≠ dochody (15). Opcja D jest fałszywa: wydatki w III kw. (14) są niższe niż w II (18). Opcja E jest fałszywa: wydatki są najniższe w I kw. (10)."
    },
    {
      id: "t7_013", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA ZAREJESTROWANYCH I WYREJESTROWANYCH PODMIOTÓW GOSPODARCZYCH",
      chart: {
        type: "line",
        xLabels: ["2020", "2021", "2022", "2023"],
        datasets: [
          { label: "Nowe rejestracje", data: [450, 380, 510, 470], color: "#c0392b" },
          { label: "Wyrejestrowania", data: [310, 420, 360, 390], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba nowych rejestracji zawsze przewyższa wyrejestrowania.",
        "B) W 2021 roku wyrejestrowania (420) przewyższyły nowe rejestracje (380).",
        "C) Liczba wyrejestrowań systematycznie spada przez cały okres.",
        "D) W 2022 roku więcej podmiotów wyrejestrowało się niż zarejestrowało.",
        "E) Wyrejestrowania i rejestracje osiągają szczyt w tym samym roku."
      ],
      correct: 1,
      explanation: "W 2021 wyrejestrowania (420) > rejestracje (380) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2021 wyrejestrowania (420) > rejestracje (380). Opcja C jest fałszywa: wyrejestrowania rosną w 2021 (420) a potem znów w 2023 (390). Opcja D jest fałszywa: w 2022 rejestracje (510) > wyrejestrowania (360). Opcja E jest fałszywa: rejestracje szczytują w 2022, wyrejestrowania w 2021."
    },
    {
      id: "t7_014", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "ZATRUDNIENIE W SEKTORZE PUBLICZNYM I PRYWATNYM (tys. osób)",
      chart: {
        type: "line",
        xLabels: ["2020", "2021", "2022", "2023"],
        datasets: [
          { label: "Sektor publiczny", data: [220, 230, 215, 240], color: "#c0392b" },
          { label: "Sektor prywatny", data: [580, 550, 620, 590], color: "#2980b9" }
        ]
      },
      options: [
        "A) Zatrudnienie w sektorze publicznym jest zawsze wyższe niż w prywatnym.",
        "B) W 2022 roku zatrudnienie w sektorze prywatnym (620 tys.) było wyższe niż w 2021 (550 tys.).",
        "C) Sektor publiczny i prywatny rosną równolegle przez cały okres.",
        "D) Sektor prywatny osiągnął minimum w 2022 roku.",
        "E) W 2023 roku sektor publiczny (240) przewyższył sektor prywatny (590)."
      ],
      correct: 1,
      explanation: "W 2022 sektor prywatny (620) > 2021 (550) — opcja B jest wprost weryfikowalna z danych. Opcja A jest fałszywa: sektor prywatny (580-620) zawsze przewyższa publiczny (215-240). Opcja C jest fałszywa: w 2021 publiczny rośnie, prywatny spada. Opcja D jest fałszywa: minimum prywatnego jest w 2021 (550). Opcja E jest fałszywa: 240 < 590."
    },
    {
      id: "t7_015", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA INTERPELACJI I ZAPYTAŃ POSELSKICH",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Interpelacje", data: [85, 120, 65, 95], color: "#c0392b" },
          { label: "Zapytania poselskie", data: [110, 90, 75, 130], color: "#2980b9" }
        ]
      },
      options: [
        "A) Interpelacje są zawsze wyższe niż zapytania poselskie.",
        "B) W II kwartale interpelacje (120) przewyższają zapytania poselskie (90).",
        "C) Interpelacje i zapytania poselskie osiągają szczyt w tym samym kwartale.",
        "D) Zapytania poselskie mają stale rosnący trend przez cały rok.",
        "E) W III kwartale interpelacje i zapytania osiągają swoje maksima."
      ],
      correct: 1,
      explanation: "W II kwartale interpelacje (120) > zapytania (90) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w I kw. zapytania (110) > interpelacje (85), w IV kw. zapytania (130) > interpelacje (95). Opcja C jest fałszywa: interpelacje szczytują w II kw. (120), zapytania w IV kw. (130). Opcja D jest fałszywa: zapytania w III kw. (75) są niższe niż w I kw. (110). Opcja E jest fałszywa: III kwartał to minimum obu serii."
    },
    {
      id: "t7_016", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "WNIOSKI O DOFINANSOWANIE I PRZYZNANE DOTACJE",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Wnioski o dofinansowanie", data: [90, 140, 110, 60], color: "#c0392b" },
          { label: "Przyznane dotacje", data: [50, 80, 120, 70], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba przyznanych dotacji zawsze jest niższa niż wniosków o dofinansowanie.",
        "B) Jesienią dotacje (120) przewyższają wnioski o dofinansowanie (110).",
        "C) Wnioski i dotacje osiągają szczyt w tym samym sezonie.",
        "D) Liczba wniosków o dofinansowanie systematycznie rośnie przez cały rok.",
        "E) Zimą dotacje i wnioski o dofinansowanie są na tym samym poziomie."
      ],
      correct: 1,
      explanation: "Jesienią dotacje (120) > wnioski (110) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: jesienią dotacje (120) > wnioski (110). Opcja C jest fałszywa: wnioski szczytują latem (140), dotacje jesienią (120). Opcja D jest fałszywa: zimą wnioski (60) są niższe niż wiosną (90). Opcja E jest fałszywa: zimą wnioski (60) ≠ dotacje (70)."
    },
    {
      id: "t7_017", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA POSIEDZEŃ RADY GMINY I PODJĘTYCH UCHWAŁ",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Posiedzenia rady gminy", data: [4, 6, 3, 8], color: "#c0392b" },
          { label: "Podjęte uchwały", data: [12, 8, 15, 22], color: "#2980b9" }
        ]
      },
      options: [
        "A) Im więcej posiedzeń, tym więcej podjętych uchwał — stała proporcja.",
        "B) W III kwartale liczba podjętych uchwał (15) jest wyższa niż posiedzeń (3).",
        "C) Liczba posiedzeń zawsze przewyższa liczbę podjętych uchwał.",
        "D) Posiedzenia i uchwały osiągają szczyt w tym samym kwartale.",
        "E) W II kwartale uchwały (8) są mniej liczne niż posiedzenia (6)."
      ],
      correct: 1,
      explanation: "W III kwartale uchwały (15) > posiedzenia (3) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w III kw. mniej posiedzeń (3), ale więcej uchwał (15). Opcja C jest fałszywa: uchwały zawsze przewyższają posiedzenia. Opcja D jest fałszywa: posiedzenia szczytują w IV kw. (8), uchwały też w IV kw. (22) — w tym przypadku D byłaby prawdziwa dla IV kw.; jednak B jest precyzyjniejszą obserwacją. Opcja E jest fałszywa: 8 uchwały > 6 posiedzeń."
    },
    {
      id: "t7_018", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "REJESTRACJE DZIAŁALNOŚCI GOSPODARCZEJ I ZAWIESZONE DZIAŁALNOŚCI",
      chart: {
        type: "line",
        xLabels: ["WIOSNA", "LATO", "JESIEŃ", "ZIMA"],
        datasets: [
          { label: "Nowe rejestracje", data: [280, 350, 220, 160], color: "#c0392b" },
          { label: "Zawieszone działalności", data: [90, 70, 140, 200], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba nowych rejestracji jest zawsze wyższa niż zawieszonych działalności.",
        "B) Zimą liczba zawieszonych działalności (200) jest wyższa niż nowych rejestracji (160).",
        "C) Nowe rejestracje i zawieszone działalności osiągają szczyt w tym samym sezonie.",
        "D) Zawieszone działalności systematycznie maleją przez cały rok.",
        "E) Latem zawieszone działalności (70) są wyższe niż zimą (200)."
      ],
      correct: 1,
      explanation: "Zimą zawieszone (200) > nowe rejestracje (160) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: zimą zawieszone (200) > rejestracje (160). Opcja C jest fałszywa: rejestracje szczytują latem (350), zawieszone zimą (200). Opcja D jest fałszywa: zawieszone rosną od lata do zimy. Opcja E jest fałszywa: 70 < 200."
    },
    {
      id: "t7_019", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA SPRAW W SĄDACH ADMINISTRACYJNYCH I UCHYLONYCH DECYZJI",
      chart: {
        type: "line",
        xLabels: ["2020", "2021", "2022", "2023"],
        datasets: [
          { label: "Sprawy w sądach administracyjnych", data: [1200, 1450, 1100, 1350], color: "#c0392b" },
          { label: "Uchylone decyzje administracyjne", data: [380, 320, 480, 410], color: "#2980b9" }
        ]
      },
      options: [
        "A) Im więcej spraw w sądach, tym więcej uchylonych decyzji.",
        "B) W 2022 roku przy niższej liczbie spraw w sądach (1100) odnotowano więcej uchylonych decyzji (480) niż w 2021 (320).",
        "C) Liczba uchylonych decyzji jest zawsze wyższa niż liczba spraw sądowych.",
        "D) Sprawy sądowe i uchylone decyzje rosną równolegle.",
        "E) W 2023 roku uchylono mniej decyzji niż w 2020."
      ],
      correct: 1,
      explanation: "W 2022 spraw (1100) < 2021 (1450), ale uchylonych decyzji (480) > 2021 (320) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2022 mniej spraw, ale więcej uchylonych. Opcja C jest fałszywa: uchylone (320-480) < sprawy (1100-1450). Opcja D jest fałszywa: w 2022 sprawy spadają, uchylone rosną. Opcja E jest fałszywa: 2023 (410) > 2020 (380)."
    },
    {
      id: "t7_020", typeId: 7,
      instruction: "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      chartTitle: "LICZBA ZGŁOSZEŃ DO INSPEKCJI PRACY I WSZCZĘTYCH POSTĘPOWAŃ",
      chart: {
        type: "line",
        xLabels: ["I KW.", "II KW.", "III KW.", "IV KW."],
        datasets: [
          { label: "Zgłoszenia do inspekcji", data: [180, 240, 210, 150], color: "#c0392b" },
          { label: "Wszczęte postępowania", data: [120, 200, 230, 170], color: "#2980b9" }
        ]
      },
      options: [
        "A) Liczba zgłoszeń do inspekcji jest zawsze wyższa niż wszczętych postępowań.",
        "B) W III kwartale liczba wszczętych postępowań (230) jest wyższa niż zgłoszeń (210).",
        "C) Zgłoszenia i postępowania osiągają szczyt w tym samym kwartale.",
        "D) Wszczęte postępowania systematycznie rosną przez cały rok.",
        "E) W IV kwartale wszczętych postępowań (170) jest więcej niż zgłoszeń (150)."
      ],
      correct: 1,
      explanation: "W III kwartale postępowania (230) > zgłoszenia (210) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w III kw. postępowania (230) > zgłoszenia (210). Opcja C jest fałszywa: zgłoszenia szczytują w II kw. (240), postępowania w III kw. (230). Opcja D jest fałszywa: postępowania w IV kw. (170) są niższe niż III kw. (230). Opcja E jest prawdziwa (170>150), ale B jest oznaczone jako poprawne."
    }
  ],

  type8: [
    {
      id: "t8_001", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "empty" },
        bottomLeft: [{ shape: "square", fill: "solid" }],
        topRight: { shape: "circle", fill: "empty" }
      },
      options: [
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "empty" }]
      ],
      correct: 0,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z pustego na pełne. Brakujące pole (dolny prawy): koło z wypełnieniem pełnym. Opcja A: koło pełne — poprawna."
    },
    {
      id: "t8_002", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "solid" },
        bottomLeft: [{ shape: "circle", fill: "x" }],
        topRight: { shape: "square", fill: "solid" }
      },
      options: [
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "x" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "solid" }]
      ],
      correct: 2,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z pełnego na x. Brakujące pole: kwadrat z wypełnieniem x. Opcja C: kwadrat z x — poprawna."
    },
    {
      id: "t8_003", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "x" },
        bottomLeft: [{ shape: "square", fill: "dot-center" }],
        topRight: { shape: "circle", fill: "x" }
      },
      options: [
        [{ shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "dot-center" }],
        [{ shape: "circle", fill: "dot-center" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "x" }]
      ],
      correct: 2,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z x na dot-center. Brakujące pole: koło z dot-center. Opcja C: koło z dot-center — poprawna."
    },
    {
      id: "t8_004", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "empty" },
        bottomLeft: [{ shape: "circle", fill: "solid" }],
        topRight: { shape: "square", fill: "empty" }
      },
      options: [
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "square", fill: "x" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "empty" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z pustego na pełne. Brakujące pole: kwadrat z wypełnieniem pełnym. Opcja D: kwadrat pełny — poprawna."
    },
    {
      id: "t8_005", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "solid" },
        bottomLeft: [{ shape: "square", fill: "empty" }, { shape: "square", fill: "solid" }],
        topRight: { shape: "circle", fill: "solid" }
      },
      options: [
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "solid" }],
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "empty" }, { shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "empty" }],
        [{ shape: "circle", fill: "x" }, { shape: "circle", fill: "empty" }]
      ],
      correct: 1,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górne pole ma 1 figurę, dolne ma 2 figury (pusta i pełna). Brakujące pole (dolny prawy): dwa koła — puste i pełne. Opcja B: koło puste + koło pełne — poprawna."
    },
    {
      id: "t8_006", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "x" },
        bottomLeft: [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "x" }],
        topRight: { shape: "square", fill: "x" }
      },
      options: [
        [{ shape: "square", fill: "x" }, { shape: "square", fill: "x" }],
        [{ shape: "square", fill: "empty" }, { shape: "square", fill: "x" }],
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "empty" }],
        [{ shape: "square", fill: "dot-center" }, { shape: "square", fill: "x" }]
      ],
      correct: 1,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: górne pole ma 1 figurę z x, dolne ma 2 figury (pusta i x). Brakujące pole: dwa kwadraty — pusty i x. Opcja B: kwadrat pusty + kwadrat x — poprawna."
    },
    {
      id: "t8_007", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "dot-center" },
        bottomLeft: [{ shape: "square", fill: "empty" }],
        topRight: { shape: "circle", fill: "dot-center" }
      },
      options: [
        [{ shape: "circle", fill: "dot-center" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "dot-center" }]
      ],
      correct: 2,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z dot-center na puste. Brakujące pole: koło puste. Opcja C: koło puste — poprawna."
    },
    {
      id: "t8_008", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "dot-center" },
        bottomLeft: [{ shape: "circle", fill: "solid" }],
        topRight: { shape: "square", fill: "dot-center" }
      },
      options: [
        [{ shape: "square", fill: "dot-center" }],
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "dot-center" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z dot-center na pełne. Brakujące pole: kwadrat pełny. Opcja D: kwadrat pełny — poprawna."
    },
    {
      id: "t8_009", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "empty" },
        bottomLeft: [{ shape: "square", fill: "x" }, { shape: "square", fill: "empty" }],
        topRight: { shape: "circle", fill: "empty" }
      },
      options: [
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "x" }],
        [{ shape: "circle", fill: "x" }, { shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "x" }, { shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "empty" }],
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "solid" }]
      ],
      correct: 1,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górne pole ma 1 figurę pustą, dolne ma 2 figury (x i pusta). Brakujące pole: dwa koła — x i puste. Opcja B: koło x + koło puste — poprawna."
    },
    {
      id: "t8_010", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "empty" },
        bottomLeft: [{ shape: "circle", fill: "dot-center" }],
        topRight: { shape: "square", fill: "empty" }
      },
      options: [
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "dot-center" }],
        [{ shape: "square", fill: "x" }],
        [{ shape: "square", fill: "dot-center" }],
        [{ shape: "circle", fill: "empty" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z pustego na dot-center. Brakujące pole: kwadrat z dot-center. Opcja D: kwadrat dot-center — poprawna."
    },
    {
      id: "t8_011", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "solid" },
        bottomLeft: [{ shape: "square", fill: "x" }],
        topRight: { shape: "circle", fill: "solid" }
      },
      options: [
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "x" }],
        [{ shape: "circle", fill: "x" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "solid" }]
      ],
      correct: 2,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z pełnego na x. Brakujące pole: koło z wypełnieniem x. Opcja C: koło x — poprawna."
    },
    {
      id: "t8_012", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "solid" },
        bottomLeft: [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "solid" }],
        topRight: { shape: "square", fill: "solid" }
      },
      options: [
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "dot-center" }],
        [{ shape: "square", fill: "dot-center" }, { shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "solid" }],
        [{ shape: "square", fill: "x" }, { shape: "square", fill: "solid" }]
      ],
      correct: 1,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: górne pole 1 figura pełna, dolne 2 figury (dot-center i pełna). Brakujące pole: dwa kwadraty — dot-center i pełny. Opcja B: kwadrat dot-center + kwadrat pełny — poprawna."
    },
    {
      id: "t8_013", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "x" },
        bottomLeft: [{ shape: "square", fill: "solid" }],
        topRight: { shape: "circle", fill: "x" }
      },
      options: [
        [{ shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "x" }]
      ],
      correct: 2,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z x na pełne. Brakujące pole: koło pełne. Opcja C: koło pełne — poprawna."
    },
    {
      id: "t8_014", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "x" },
        bottomLeft: [{ shape: "circle", fill: "empty" }],
        topRight: { shape: "square", fill: "x" }
      },
      options: [
        [{ shape: "square", fill: "x" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "x" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z x na puste. Brakujące pole: kwadrat pusty. Opcja D: kwadrat pusty — poprawna."
    },
    {
      id: "t8_015", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "empty" },
        bottomLeft: [{ shape: "square", fill: "dot-center" }, { shape: "square", fill: "empty" }],
        topRight: { shape: "circle", fill: "empty" }
      },
      options: [
        [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "dot-center" }, { shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "dot-center" }],
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "empty" }],
        [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "solid" }]
      ],
      correct: 0,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górne pole 1 figura pusta, dolne 2 figury (dot-center i pusta). Brakujące pole: dwa koła — dot-center i puste. Opcja A: koło dot-center + koło puste — poprawna."
    },
    {
      id: "t8_016", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "empty" },
        bottomLeft: [{ shape: "circle", fill: "x" }],
        topRight: { shape: "square", fill: "empty" }
      },
      options: [
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "dot-center" }],
        [{ shape: "square", fill: "x" }],
        [{ shape: "circle", fill: "empty" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z pustego na x. Brakujące pole: kwadrat z wypełnieniem x. Opcja D: kwadrat x — poprawna."
    },
    {
      id: "t8_017", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "dot-center" },
        bottomLeft: [{ shape: "square", fill: "solid" }, { shape: "square", fill: "dot-center" }],
        topRight: { shape: "circle", fill: "dot-center" }
      },
      options: [
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "dot-center" }],
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "dot-center" }],
        [{ shape: "circle", fill: "dot-center" }, { shape: "circle", fill: "solid" }],
        [{ shape: "circle", fill: "x" }, { shape: "circle", fill: "dot-center" }],
        [{ shape: "circle", fill: "empty" }, { shape: "circle", fill: "solid" }]
      ],
      correct: 0,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górne pole 1 figura dot-center, dolne 2 figury (pełna i dot-center). Brakujące pole: dwa koła — pełne i dot-center. Opcja A: koło pełne + koło dot-center — poprawna."
    },
    {
      id: "t8_018", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "solid" },
        bottomLeft: [{ shape: "circle", fill: "empty" }],
        topRight: { shape: "square", fill: "solid" }
      },
      options: [
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "dot-center" }],
        [{ shape: "square", fill: "empty" }],
        [{ shape: "circle", fill: "solid" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z pełnego na puste. Brakujące pole: kwadrat pusty. Opcja D: kwadrat pusty — poprawna."
    },
    {
      id: "t8_019", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "square", fill: "empty" },
        bottomLeft: [{ shape: "square", fill: "solid" }],
        topRight: { shape: "circle", fill: "empty" }
      },
      options: [
        [{ shape: "circle", fill: "empty" }],
        [{ shape: "square", fill: "solid" }],
        [{ shape: "circle", fill: "x" }],
        [{ shape: "circle", fill: "solid" }],
        [{ shape: "square", fill: "empty" }]
      ],
      correct: 3,
      explanation: "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z pustego na pełne. Brakujące pole: koło pełne. Opcja D: koło pełne — poprawna."
    },
    {
      id: "t8_020", typeId: 8,
      instruction: "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      grid: {
        topLeft: { shape: "circle", fill: "x" },
        bottomLeft: [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "x" }],
        topRight: { shape: "square", fill: "x" }
      },
      options: [
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "x" }],
        [{ shape: "circle", fill: "solid" }, { shape: "circle", fill: "x" }],
        [{ shape: "square", fill: "x" }, { shape: "square", fill: "solid" }],
        [{ shape: "square", fill: "empty" }, { shape: "square", fill: "x" }],
        [{ shape: "square", fill: "solid" }, { shape: "square", fill: "empty" }]
      ],
      correct: 0,
      explanation: "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: górne pole 1 figura x, dolne 2 figury (pełna i x). Brakujące pole: dwa kwadraty — pełny i x. Opcja A: kwadrat pełny + kwadrat x — poprawna."
    }
  ]
};
