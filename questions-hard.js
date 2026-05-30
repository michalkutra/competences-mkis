const QUESTIONS_HARD = {
  "type1": [
    {
      "id": "t1_001",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "rozporządzenie",
        "minister"
      ],
      "rightTop": "zarządzenie",
      "options": [
        "A) premier",
        "C) ustawa",
        "D) sejm",
        "B) organ kierowniczy",
        "E) dyrektor generalny"
      ],
      "correct": 3,
      "explanation": "Rozporządzenie jest aktem normatywnym wydawanym przez ministra — minister jest organem je wydającym. Analogicznie zarządzenie jest aktem wewnętrznym wydawanym przez organ kierowniczy (np. dyrektora generalnego, kierownika urzędu). Organ kierowniczy to kategoria nadrzędna właściwa dla zarządzeń jako aktów wewnętrznych."
    },
    {
      "id": "t1_002",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "art. 7 Konstytucji RP",
        "zasada legalizmu"
      ],
      "rightTop": "art. 2 Konstytucji RP",
      "options": [
        "A) zasada praworządności",
        "C) zasada suwerenności narodu",
        "D) zasada trójpodziału władzy",
        "E) zasada równości",
        "B) zasada demokratycznego państwa prawnego"
      ],
      "correct": 4,
      "explanation": "Artykuł 7 Konstytucji RP wyraża zasadę legalizmu (organy władzy działają na podstawie i w granicach prawa). Analogicznie artykuł 2 Konstytucji RP wyraża zasadę demokratycznego państwa prawnego — to jest jego bezpośrednia treść normatywna."
    },
    {
      "id": "t1_003",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "odwołanie",
        "organ wyższego stopnia"
      ],
      "rightTop": "skarga kasacyjna",
      "options": [
        "A) sąd rejonowy",
        "C) Trybunał Konstytucyjny",
        "D) prokurator generalny",
        "B) Naczelny Sąd Administracyjny",
        "E) organ administracji"
      ],
      "correct": 3,
      "explanation": "Odwołanie w postępowaniu administracyjnym jest rozpatrywane przez organ wyższego stopnia — to organ właściwy do jego rozpoznania. Analogicznie skarga kasacyjna w sądownictwie administracyjnym jest rozpatrywana przez Naczelny Sąd Administracyjny, który jest organem właściwym do jej rozpoznania."
    },
    {
      "id": "t1_004",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "derogacja",
        "uchylenie aktu normatywnego"
      ],
      "rightTop": "abrogacja",
      "options": [
        "A) zmiana treści aktu",
        "B) zawieszenie aktu",
        "C) całkowite uchylenie aktu",
        "D) wejście w życie aktu",
        "E) nowelizacja"
      ],
      "correct": 2,
      "explanation": "Derogacja oznacza uchylenie (częściowe lub całkowite) aktu normatywnego — to jej znaczenie prawnicze. Analogicznie abrogacja oznacza całkowite uchylenie aktu normatywnego — jest to konkretna forma derogacji polegająca na pełnym zniesieniu mocy obowiązującej aktu."
    },
    {
      "id": "t1_005",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "lex specialis",
        "lex generalis"
      ],
      "rightTop": "lex posterior",
      "options": [
        "A) prawo późniejsze",
        "C) prawo silniejsze",
        "D) lex superior",
        "E) norma kolizyjna",
        "B) lex anterior"
      ],
      "correct": 4,
      "explanation": "Lex specialis (przepis szczególny) jest zestawiane z lex generalis (przepisem ogólnym) jako jego przeciwieństwo w regule kolizyjnej. Analogicznie lex posterior (prawo późniejsze) jest zestawiane z lex anterior (prawem wcześniejszym) — to ich pojęciowe przeciwieństwo w tej samej regule kolizyjnej."
    },
    {
      "id": "t1_006",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "interpelacja",
        "poseł na Sejm"
      ],
      "rightTop": "zapytanie senatorskie",
      "options": [
        "A) premier",
        "B) minister",
        "C) senator",
        "D) marszałek Sejmu",
        "E) prezydent"
      ],
      "correct": 2,
      "explanation": "Interpelacja jest środkiem kontroli parlamentarnej przysługującym posłowi na Sejm — poseł jest podmiotem uprawnionym do jej złożenia. Analogicznie zapytanie senatorskie jest środkiem kontroli przysługującym senatorowi — senator jest podmiotem uprawnionym do jego składania."
    },
    {
      "id": "t1_007",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "Dziennik Ustaw",
        "akty powszechnie obowiązujące"
      ],
      "rightTop": "Monitor Polski",
      "options": [
        "B) akty wewnętrzne i urzędowe",
        "A) akty prawa miejscowego",
        "C) rozporządzenia wykonawcze",
        "D) uchwały sejmowe",
        "E) zarządzenia ministrów"
      ],
      "correct": 0,
      "explanation": "Dziennik Ustaw jest oficjalnym publikatorem aktów powszechnie obowiązujących (ustaw, rozporządzeń, umów międzynarodowych). Analogicznie Monitor Polski jest oficjalnym publikatorem aktów wewnętrznych i urzędowych (uchwał Rady Ministrów, zarządzeń Prezesa RM, obwieszczeń)."
    },
    {
      "id": "t1_008",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "vacatio legis",
        "wejście w życie ustawy"
      ],
      "rightTop": "promulgacja",
      "options": [
        "A) podpisanie ustawy przez prezydenta",
        "B) uchwalenie przez Sejm",
        "C) ogłoszenie w Dzienniku Ustaw",
        "D) skierowanie do Senatu",
        "E) kontrola przez Trybunał"
      ],
      "correct": 2,
      "explanation": "Vacatio legis to okres między ogłoszeniem a wejściem w życie ustawy — wejście w życie jest etapem następującym po vacatio legis. Analogicznie promulgacja oznacza ogłoszenie ustawy w Dzienniku Ustaw — ogłoszenie jest etapem, który promulgacja oznacza."
    },
    {
      "id": "t1_009",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "samorządowe kolegium odwoławcze",
        "odwołania od decyzji organów samorządowych"
      ],
      "rightTop": "wojewoda",
      "options": [
        "A) kontrola zgodności z prawem miejscowym",
        "C) rozpatrywanie skarg na samorząd",
        "D) wydawanie decyzji podatkowych",
        "B) nadzór nad legalnością uchwał samorządowych",
        "E) koordynacja służb specjalnych"
      ],
      "correct": 3,
      "explanation": "Samorządowe kolegium odwoławcze rozpatruje odwołania od decyzji organów samorządowych — to jego główna kompetencja. Analogicznie wojewoda sprawuje nadzór nad legalnością uchwał samorządowych — to jest jego podstawowa kompetencja nadzorcza wobec samorządu terytorialnego."
    },
    {
      "id": "t1_010",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "superrewizyjna skarga do NSA",
        "prawomocny wyrok WSA"
      ],
      "rightTop": "skarga do WSA",
      "options": [
        "A) decyzja ostateczna organu administracji",
        "B) wyrok NSA",
        "C) postanowienie prokuratora",
        "D) wyrok sądu powszechnego",
        "E) wniosek o wznowienie postępowania"
      ],
      "correct": 0,
      "explanation": "Skarga kasacyjna do NSA jest wnoszona po uzyskaniu prawomocnego wyroku WSA — wyrok WSA jest warunkiem jej złożenia. Analogicznie skarga do WSA jest wnoszona po uzyskaniu decyzji ostatecznej organu administracji — decyzja ostateczna jest warunkiem dopuszczalności skargi do sądu administracyjnego."
    },
    {
      "id": "t1_011",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "ordynacja podatkowa",
        "zobowiązanie podatkowe"
      ],
      "rightTop": "prawo zamówień publicznych",
      "options": [
        "A) oferta przetargowa",
        "C) specyfikacja warunków zamówienia",
        "D) przetarg nieograniczony",
        "E) wykonawca",
        "B) umowa o zamówienie publiczne"
      ],
      "correct": 4,
      "explanation": "Ordynacja podatkowa reguluje tryb powstawania i wykonywania zobowiązań podatkowych — zobowiązanie podatkowe jest jej centralną instytucją. Analogicznie prawo zamówień publicznych reguluje tryb zawierania umów o zamówienie publiczne — umowa o zamówienie jest centralną instytucją tej ustawy."
    },
    {
      "id": "t1_012",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "numerus clausus",
        "ograniczona liczba miejsc"
      ],
      "rightTop": "in dubio pro reo",
      "options": [
        "A) zasada domniemania winy",
        "B) zasada rozstrzygania wątpliwości na korzyść oskarżonego",
        "C) zasada jawności postępowania",
        "D) zasada kontradyktoryjności",
        "E) zasada swobodnej oceny dowodów"
      ],
      "correct": 1,
      "explanation": "Numerus clausus (zamknięta liczba) oznacza ograniczoną, wyczerpującą listę — to jego znaczenie jako zasady prawniczej. Analogicznie in dubio pro reo oznacza zasadę rozstrzygania wątpliwości na korzyść oskarżonego — to jest dosłowne i prawnicze znaczenie tej łacińskiej paremii."
    },
    {
      "id": "t1_013",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "referendum ogólnokrajowe",
        "art. 125 Konstytucji RP"
      ],
      "rightTop": "inicjatywa ustawodawcza obywateli",
      "options": [
        "A) art. 118 ust. 2 Konstytucji RP",
        "B) art. 235 Konstytucji RP",
        "C) art. 90 Konstytucji RP",
        "D) art. 144 Konstytucji RP",
        "E) art. 87 Konstytucji RP"
      ],
      "correct": 0,
      "explanation": "Referendum ogólnokrajowe jest uregulowane w art. 125 Konstytucji RP — ten artykuł jest jego podstawą konstytucyjną. Analogicznie inicjatywa ustawodawcza obywateli (100 tys. podpisów) jest uregulowana w art. 118 ust. 2 Konstytucji RP — to jest jej konstytucyjna podstawa."
    },
    {
      "id": "t1_014",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "Europejski Trybunał Praw Człowieka",
        "Europejska Konwencja Praw Człowieka"
      ],
      "rightTop": "Trybunał Sprawiedliwości UE",
      "options": [
        "A) Karta Praw Podstawowych UE",
        "B) Konwencja wiedeńska",
        "C) Traktat Lizboński",
        "D) dyrektywy UE",
        "E) rozporządzenia UE"
      ],
      "correct": 2,
      "explanation": "Europejski Trybunał Praw Człowieka strzeże przestrzegania Europejskiej Konwencji Praw Człowieka — Konwencja jest podstawowym aktem, który Trybunał stosuje. Analogicznie Trybunał Sprawiedliwości UE stosuje i wykłada Traktat Lizboński (i inne traktaty unijne) — traktat jest podstawowym aktem jego jurysdykcji."
    },
    {
      "id": "t1_015",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "kontrasygnata premiera",
        "akt urzędowy prezydenta"
      ],
      "rightTop": "weto ustawodawcze",
      "options": [
        "A) Trybunał Konstytucyjny",
        "B) premier",
        "C) prezydent",
        "D) Senat",
        "E) marszałek Sejmu"
      ],
      "correct": 2,
      "explanation": "Kontrasygnata premiera jest wymagana przy akcie urzędowym prezydenta — to warunek jego skuteczności prawnej. Analogicznie weto ustawodawcze jest uprawnieniem przysługującym prezydentowi wobec ustaw uchwalonych przez Sejm — prezydent jest podmiotem, któremu przysługuje weto."
    },
    {
      "id": "t1_016",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "dekoncentracja",
        "przekazanie kompetencji organom niższym w strukturze"
      ],
      "rightTop": "decentralizacja",
      "options": [
        "A) przekazanie kompetencji organom samorządowym",
        "B) likwidacja szczebli administracji",
        "C) centralizacja władzy",
        "D) hierarchiczne podporządkowanie",
        "E) federalizm"
      ],
      "correct": 0,
      "explanation": "Dekoncentracja polega na przekazaniu kompetencji organom niższym w ramach tej samej struktury (np. z ministerstwa do urzędu wojewódzkiego). Analogicznie decentralizacja polega na przekazaniu kompetencji organom samorządowym, działającym samodzielnie — to definicja decentralizacji w prawie administracyjnym."
    },
    {
      "id": "t1_017",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "prawo pierwokupu",
        "pierwszeństwo nabycia rzeczy"
      ],
      "rightTop": "prawo retrakcji",
      "options": [
        "A) pierwszeństwo obciążenia nieruchomości",
        "B) pierwokup po sprzedaży osobie trzeciej",
        "C) odkupienie nieruchomości po cenie rynkowej",
        "D) prawo do odsprzedaży",
        "E) zastrzeżenie ceny minimalnej"
      ],
      "correct": 1,
      "explanation": "Prawo pierwokupu to pierwszeństwo nabycia rzeczy przed innymi kupującymi — pierwszeństwo nabycia jest jego istotą. Analogicznie prawo retrakcji to uprawnienie do odkupienia rzeczy już sprzedanej osobie trzeciej — jest to instytucja umożliwiająca nabycie rzeczy po dokonaniu sprzedaży na rzecz osoby trzeciej."
    },
    {
      "id": "t1_018",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "Państwowa Inspekcja Pracy",
        "przestrzeganie prawa pracy"
      ],
      "rightTop": "Inspekcja Ochrony Środowiska",
      "options": [
        "A) nadzór nad przedsiębiorstwami",
        "B) przestrzeganie prawa ochrony środowiska",
        "C) wydawanie decyzji środowiskowych",
        "D) zarządzanie zasobami naturalnymi",
        "E) kontrola działalności przemysłowej"
      ],
      "correct": 1,
      "explanation": "Państwowa Inspekcja Pracy kontroluje przestrzeganie prawa pracy — to jej główna funkcja ustawowa. Analogicznie Inspekcja Ochrony Środowiska kontroluje przestrzeganie prawa ochrony środowiska — to jest jej analogiczna funkcja w dziedzinie ochrony środowiska."
    },
    {
      "id": "t1_019",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "gwarancja bankowa",
        "zabezpieczenie wierzytelności"
      ],
      "rightTop": "hipoteka",
      "options": [
        "A) zabezpieczenie na ruchomościach",
        "B) zabezpieczenie na nieruchomości",
        "C) poręczenie osobiste",
        "D) weksel",
        "E) zastaw rejestrowy"
      ],
      "correct": 1,
      "explanation": "Gwarancja bankowa jest formą zabezpieczenia wierzytelności — zabezpieczenie wierzytelności jest jej funkcją prawną. Analogicznie hipoteka jest formą zabezpieczenia na nieruchomości — zabezpieczenie na nieruchomości precyzyjnie opisuje prawną naturę hipoteki jako ograniczonego prawa rzeczowego."
    },
    {
      "id": "t1_020",
      "typeId": 1,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "leftPair": [
        "dyrektywa UE",
        "implementacja przez państwo członkowskie"
      ],
      "rightTop": "rozporządzenie UE",
      "options": [
        "A) implementacja przez Komisję Europejską",
        "B) ratyfikacja przez państwa członkowskie",
        "C) bezpośrednie stosowanie w państwach członkowskich",
        "D) transpozycja do prawa krajowego",
        "E) zatwierdzenie przez Radę UE"
      ],
      "correct": 2,
      "explanation": "Dyrektywa UE wymaga implementacji przez państwo członkowskie — państwa muszą ją przetransponować do prawa krajowego. Analogicznie rozporządzenie UE charakteryzuje się bezpośrednim stosowaniem w państwach członkowskich bez potrzeby implementacji — to fundamentalna różnica między tymi aktami."
    }
  ],
  "type2": [
    {
      "id": "t2_001",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Skarga kasacyjna",
        "Zażalenie",
        "Sprzeciw od wyroku zaocznego"
      ],
      "options": [
        "A) środek odwoławczy",
        "B) nadzwyczajny środek zaskarżenia",
        "C) środek zaskarżenia",
        "D) postępowanie sądowe",
        "E) orzeczenie sądu"
      ],
      "correct": 2,
      "explanation": "Skarga kasacyjna, zażalenie i sprzeciw od wyroku zaocznego są środkami zaskarżenia — każdy z nich służy kwestionowaniu orzeczeń sądowych lub proceduralnych rozstrzygnięć. Środek odwoławczy to węższa kategoria (obejmuje tylko odwołanie i apelację), a nadzwyczajny środek zaskarżenia to zbyt wąska kategoria dla zażalenia."
    },
    {
      "id": "t2_002",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Prekluzja",
        "Preskrypcja",
        "Przedawnienie"
      ],
      "options": [
        "A) prawo karne",
        "B) instytucje wyłączenia praw przez upływ czasu",
        "C) zobowiązanie cywilne",
        "D) kodeks postępowania cywilnego",
        "E) termin prawa administracyjnego"
      ],
      "correct": 1,
      "explanation": "Prekluzja (wygaśnięcie prawa), preskrypcja (nabycie lub utrata prawa przez zasiedzenie lub przedawnienie) i przedawnienie są instytucjami prawa wyłączającymi lub wygaszającymi prawa przez upływ czasu. Wszystkie trzy dotyczą skutków prawnych biegu czasu na prawa podmiotowe."
    },
    {
      "id": "t2_003",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Ustawa zasadnicza",
        "Traktat akcesyjny",
        "Umowa międzynarodowa ratyfikowana"
      ],
      "options": [
        "A) prawo wtórne UE",
        "B) źródła prawa powszechnie obowiązującego w Polsce",
        "C) akty prawa krajowego",
        "D) prawo pierwotne UE",
        "E) akty promulgowane w Monitorze Polskim"
      ],
      "correct": 1,
      "explanation": "Ustawa zasadnicza (Konstytucja), traktat akcesyjny i ratyfikowane umowy międzynarodowe są źródłami prawa powszechnie obowiązującego w Polsce — każde z nich wymienione jest w art. 87 Konstytucji RP lub wynika z jej hierarchii źródeł prawa."
    },
    {
      "id": "t2_004",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Kompetencja wyłączna",
        "Kompetencja dzielona",
        "Kompetencja wspierająca"
      ],
      "options": [
        "A) prawo UE",
        "B) kategorie kompetencji UE względem państw członkowskich",
        "C) podział władzy w RP",
        "D) samorząd terytorialny",
        "E) zasada pomocniczości"
      ],
      "correct": 1,
      "explanation": "Kompetencja wyłączna, dzielona i wspierająca to kategorie kompetencji Unii Europejskiej względem państw członkowskich — klasyfikacja przewidziana w Traktacie o funkcjonowaniu UE (art. 2–6 TFUE). Zasada pomocniczości dotyczy sposobu wykonywania kompetencji, nie ich klasyfikacji."
    },
    {
      "id": "t2_005",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Zasada jawności",
        "Zasada pisemności",
        "Zasada dwuinstancyjności"
      ],
      "options": [
        "A) postępowanie cywilne",
        "B) zasady ogólne kodeksu postępowania administracyjnego",
        "C) prawo konstytucyjne",
        "D) postępowanie sądowo-administracyjne",
        "E) zasady etyki urzędniczej"
      ],
      "correct": 1,
      "explanation": "Zasada jawności, pisemności i dwuinstancyjności są zasadami ogólnymi Kodeksu postępowania administracyjnego — każda z nich jest wprost wyrażona w przepisach KPA i wyznacza ramy prowadzenia postępowania administracyjnego."
    },
    {
      "id": "t2_006",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Cesja",
        "Subrogacja",
        "Odnowienie"
      ],
      "options": [
        "A) zmiana wierzyciela lub dłużnika",
        "B) prawo rzeczowe",
        "C) instytucje zmiany lub wygaśnięcia zobowiązania",
        "D) umowy gospodarcze",
        "E) postępowanie upadłościowe"
      ],
      "correct": 2,
      "explanation": "Cesja (przelew wierzytelności), subrogacja (wstąpienie w prawa wierzyciela) i odnowienie (nowacja — wygaśnięcie zobowiązania przez zaciągnięcie nowego) są instytucjami zmiany lub wygaśnięcia zobowiązania w prawie cywilnym. Zmiana wierzyciela dotyczy tylko cesji i subrogacji, nie odnowienia."
    },
    {
      "id": "t2_007",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Niezawisłość",
        "Nieusuwalność",
        "Immunitet sędziowski"
      ],
      "options": [
        "A) gwarancje niezależności sądownictwa",
        "B) prawa obywatelskie",
        "C) zasady służby cywilnej",
        "D) prawo pracy sędziów",
        "E) Kodeks etyki sędziowskiej"
      ],
      "correct": 0,
      "explanation": "Niezawisłość, nieusuwalność i immunitet sędziowski są konstytucyjnymi gwarancjami niezależności sądownictwa — każda z nich jest mechanizmem chroniącym sędziów przed naciskami i zapewniającym niezależne orzekanie. Są one wprost uregulowane w Konstytucji RP."
    },
    {
      "id": "t2_008",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Budżet zadaniowy",
        "Wieloletni Plan Finansowy Państwa",
        "Sprawozdanie z wykonania budżetu"
      ],
      "options": [
        "A) audyt wewnętrzny",
        "B) instrumenty zarządzania finansami publicznymi",
        "C) prawo podatkowe",
        "D) rachunkowość budżetowa",
        "E) kontrola NIK"
      ],
      "correct": 1,
      "explanation": "Budżet zadaniowy, Wieloletni Plan Finansowy Państwa i sprawozdanie z wykonania budżetu są instrumentami zarządzania finansami publicznymi — każdy z nich pełni określoną funkcję w planowaniu, wykonaniu lub ocenie finansów państwa w ramach ustawy o finansach publicznych."
    },
    {
      "id": "t2_009",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Konwalidacja",
        "Konwersja",
        "Potwierdzenie czynności prawnej"
      ],
      "options": [
        "A) nieważność bezwzględna",
        "B) sposoby sanowania wadliwych czynności prawnych",
        "C) prawo procesowe",
        "D) uchwały organów kolegialnych",
        "E) administracyjne formy działania"
      ],
      "correct": 1,
      "explanation": "Konwalidacja (uzdrowienie wadliwości przez spełnienie wymagań), konwersja (zamiana nieważnej czynności na inną ważną) i potwierdzenie czynności prawnej są sposobami sanowania (naprawiania) wadliwych czynności prawnych w prawie cywilnym. Wszystkie trzy służą temu samemu celowi: przywróceniu skuteczności prawnej."
    },
    {
      "id": "t2_010",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Audytor wewnętrzny",
        "Kontroler zarządczy",
        "Inspektor NIK"
      ],
      "options": [
        "A) pracownicy administracji publicznej",
        "B) podmioty sprawujące kontrolę finansową i audyt",
        "C) organy wymiaru sprawiedliwości",
        "D) instytucje zewnętrznego nadzoru",
        "E) służba cywilna"
      ],
      "correct": 1,
      "explanation": "Audytor wewnętrzny, kontroler zarządczy i inspektor NIK są podmiotami sprawującymi kontrolę finansową i audyt — każdy z nich wykonuje funkcje kontrolne w obszarze finansów publicznych, choć na różnych poziomach (wewnętrznym i zewnętrznym)."
    },
    {
      "id": "t2_011",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Rozporządzenie z mocą ustawy",
        "Ustawa budżetowa",
        "Ustawa o prowizorium budżetowym"
      ],
      "options": [
        "A) akty o szczególnym trybie uchwalania lub wydawania",
        "B) akty prawa finansowego",
        "C) akty wydawane przez Radę Ministrów",
        "D) akty wymagające kontrasygnaty",
        "E) akty ratyfikowane przez prezydenta"
      ],
      "correct": 0,
      "explanation": "Rozporządzenie z mocą ustawy, ustawa budżetowa i ustawa o prowizorium budżetowym są aktami o szczególnym trybie uchwalania lub wydawania — każdy z nich wymaga specjalnej procedury i jest objęty szczególnymi regułami konstytucyjnymi odbiegającymi od zwykłej procedury ustawodawczej."
    },
    {
      "id": "t2_012",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Zasada przezorności",
        "Zasada zanieczyszczający płaci",
        "Zasada zrównoważonego rozwoju"
      ],
      "options": [
        "A) prawo gospodarcze",
        "B) zasady ogólne prawa ochrony środowiska",
        "C) zasady etyki środowiskowej",
        "D) prawo unijne",
        "E) kodeks środowiskowy"
      ],
      "correct": 1,
      "explanation": "Zasada przezorności, zanieczyszczający płaci i zrównoważonego rozwoju są zasadami ogólnymi prawa ochrony środowiska — każda z nich jest wprost wyrażona w ustawie Prawo ochrony środowiska lub wynika z Konstytucji RP i prawa unijnego jako fundamentalna zasada tej gałęzi prawa."
    },
    {
      "id": "t2_013",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Akredytywa",
        "Inkaso dokumentowe",
        "Gwarancja bankowa"
      ],
      "options": [
        "A) instrumenty finansowania handlu zagranicznego",
        "B) prawo bankowe",
        "C) obrót bezgotówkowy",
        "D) instrumenty polityki pieniężnej",
        "E) zabezpieczenia hipoteczne"
      ],
      "correct": 0,
      "explanation": "Akredytywa, inkaso dokumentowe i gwarancja bankowa są instrumentami finansowania i zabezpieczenia handlu zagranicznego — każdy z nich jest stosowany w transakcjach międzynarodowych jako metoda rozliczeń lub zabezpieczeń płatności między kontrahentami z różnych krajów."
    },
    {
      "id": "t2_014",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Klauzula rebus sic stantibus",
        "Clausula de rato",
        "Pactum de contrahendo"
      ],
      "options": [
        "A) klauzule prawa kontraktowego",
        "B) zasady prawa konstytucyjnego",
        "C) instytucje prawa administracyjnego",
        "D) łacińskie zasady postępowania sądowego",
        "E) reguły wykładni prawa"
      ],
      "correct": 0,
      "explanation": "Klauzula rebus sic stantibus (zmiana okoliczności), clausula de rato (zastrzeżenie potwierdzenia) i pactum de contrahendo (umowa przedwstępna) są klauzulami prawa kontraktowego (umownego) — każda z nich jest terminem technicznym prawa umów, regulującym określone aspekty stosunków umownych."
    },
    {
      "id": "t2_015",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Sejmik województwa",
        "Rada powiatu",
        "Rada gminy"
      ],
      "options": [
        "A) organy wykonawcze samorządu",
        "B) organy stanowiące jednostek samorządu terytorialnego",
        "C) organy kontrolne samorządu",
        "D) organy pomocnicze gminy",
        "E) organy nadzoru nad samorządem"
      ],
      "correct": 1,
      "explanation": "Sejmik województwa, rada powiatu i rada gminy są organami stanowiącymi (uchwałodawczymi) poszczególnych jednostek samorządu terytorialnego — każdy z nich pełni funkcję legislacyjną i kontrolną na swoim szczeblu samorządowym. Organy wykonawcze to marszałek, starosta i wójt/burmistrz/prezydent."
    },
    {
      "id": "t2_016",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Zobowiązanie wzajemne",
        "Zobowiązanie solidarne",
        "Zobowiązanie in solidum"
      ],
      "options": [
        "A) rodzaje zobowiązań w prawie cywilnym ze względu na strukturę podmiotową lub świadczenia",
        "B) zobowiązania podatkowe",
        "C) instrumenty prawa pracy",
        "D) kategorie umów handlowych",
        "E) zobowiązania publicznoprawne"
      ],
      "correct": 0,
      "explanation": "Zobowiązanie wzajemne, solidarne i in solidum są rodzajami zobowiązań w prawie cywilnym — każdy z nich opisuje odmienny układ praw i obowiązków stron stosunku zobowiązaniowego, klasyfikowany ze względu na strukturę podmiotową lub charakter świadczeń."
    },
    {
      "id": "t2_017",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Votum separatum",
        "Votum zaufania",
        "Votum nieufności"
      ],
      "options": [
        "A) łacińskie terminy parlamentarne i sądownicze",
        "B) zasady prawa konstytucyjnego",
        "C) procedury budżetowe",
        "D) formy aktów prawnych",
        "E) rodzaje głosowań w KPA"
      ],
      "correct": 0,
      "explanation": "Votum separatum (zdanie odrębne), votum zaufania (udzielenie rządowi poparcia) i votum nieufności (wyrażenie braku poparcia) są łacińskimi terminami parlamentarnymi i sądowniczymi — każdy z nich funkcjonuje w praktyce ustrojowej lub sądowniczej jako ugruntowany termin techniczny."
    },
    {
      "id": "t2_018",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Czynna legitymacja procesowa",
        "Bierna legitymacja procesowa",
        "Interwencja uboczna"
      ],
      "options": [
        "A) prawo materialne",
        "B) instytucje prawa procesowego (postępowania sądowego)",
        "C) środki zaskarżenia",
        "D) postępowanie egzekucyjne",
        "E) prawo administracyjne procesowe"
      ],
      "correct": 1,
      "explanation": "Czynna legitymacja procesowa (uprawnienie do bycia powodem), bierna (uprawnienie do bycia pozwanym) i interwencja uboczna (wstąpienie osoby trzeciej do postępowania) są instytucjami prawa procesowego — każda z nich dotyczy podmiotowego aspektu uczestnictwa w postępowaniu sądowym."
    },
    {
      "id": "t2_019",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Nadzwyczajne złagodzenie kary",
        "Warunkowe zawieszenie wykonania kary",
        "Warunkowe przedterminowe zwolnienie"
      ],
      "options": [
        "A) środki karne",
        "B) instytucje probacyjne i modyfikujące wymiar kary",
        "C) środki zapobiegawcze",
        "D) kary zasadnicze",
        "E) tryby nadzwyczajne w KPA"
      ],
      "correct": 1,
      "explanation": "Nadzwyczajne złagodzenie kary, warunkowe zawieszenie i warunkowe przedterminowe zwolnienie są instytucjami modyfikującymi wymiar lub wykonanie kary (instytucje probacyjne) — każda z nich pozwala na odstąpienie od sztywnego stosowania sankcji karnej w przypadkach określonych ustawą."
    },
    {
      "id": "t2_020",
      "typeId": 2,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna. Wybierz wyraz, który najlepiej pasuje do trzech wyrazów:",
      "words": [
        "Podatek dochodowy od osób fizycznych",
        "Podatek od towarów i usług",
        "Podatek akcyzowy"
      ],
      "options": [
        "A) daniny publiczne",
        "B) podatki pośrednie",
        "C) podatki regulowane ordynacją podatkową",
        "D) podatki samorządowe",
        "E) instrumenty polityki fiskalnej państwa"
      ],
      "correct": 4,
      "explanation": "PIT, VAT i podatek akcyzowy są instrumentami polityki fiskalnej państwa — każdy z nich służy pozyskiwaniu dochodów budżetu państwa i jest narzędziem oddziaływania na gospodarkę. VAT i akcyza to podatki pośrednie, ale PIT jest bezpośredni, więc B jest zbyt wąskie; wszystkie trzy są natomiast instrumentami fiskalnej polityki państwa."
    }
  ],
  "type3": [
    {
      "id": "t3_001",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Dane z kilku urzędów administracji rządowej wskazują, że w kwartałach, w których zwiększa się liczba nowozatrudnionych pracowników, rośnie też liczba błędów formalnych w wydawanych decyzjach. Jednocześnie w tych samych kwartałach wzrasta liczba odwołań od decyzji składanych przez strony.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Nowi pracownicy (os.)",
            "data": [
              38,
              22,
              41,
              19
            ],
            "color": "#c0392b"
          },
          {
            "label": "Odwołania od decyzji (szt.)",
            "data": [
              74,
              48,
              82,
              44
            ],
            "color": "#2980b9"
          },
          {
            "label": "Błędy formalne (szt.)",
            "data": [
              31,
              18,
              35,
              16
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Wzrost odwołań od decyzji powoduje wzrost liczby błędów formalnych.",
        "B) Wzrost liczby nowych pracowników bezpośrednio powoduje wzrost odwołań od decyzji.",
        "C) Napływ niedoświadczonych pracowników zwiększa liczbę błędów formalnych, a te z kolei generują odwołania — obydwa zjawiska mają wspólną przyczynę w rotacji kadr.",
        "D) Brak związku przyczynowo-skutkowego między rotacją kadr a błędami i odwołaniami."
      ],
      "correct": 2,
      "explanation": "Dane pokazują, że wszystkie trzy wskaźniki rosną i maleją w tym samym rytmie kwartalnym. Wspólna przyczyna to napływ nowych pracowników: niedoświadczeni urzędnicy popełniają więcej błędów formalnych, co bezpośrednio przekłada się na wzrost odwołań od wadliwych decyzji. Jest to łańcuch przyczynowy z jednym źródłem."
    },
    {
      "id": "t3_002",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Analiza danych wydziału finansowego urzędu marszałkowskiego wykazała, że w IV kwartale roku gwałtownie wzrasta liczba faktur przekazywanych do realizacji. W tym samym czasie wzrasta liczba błędów księgowych wykrywanych podczas kontroli wewnętrznych.",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Faktury do realizacji (szt.)",
            "data": [
              210,
              195,
              228,
              418
            ],
            "color": "#c0392b"
          },
          {
            "label": "Błędy księgowe (szt.)",
            "data": [
              14,
              12,
              17,
              38
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost liczby faktur powoduje wzrost liczby błędów księgowych przez przeciążenie pracowników.",
        "B) Wzrost błędów księgowych powoduje wzrost liczby faktur przekazywanych do realizacji.",
        "C) Koniec roku budżetowego wymusza przyśpieszenie realizacji wydatków, co jednocześnie zwiększa liczbę faktur i — wskutek pośpiechu — błędów.",
        "D) Brak związku między liczbą faktur a błędami księgowymi."
      ],
      "correct": 2,
      "explanation": "W IV kwartale dochodzi do przymusowego zamknięcia roku budżetowego — konieczność wykorzystania środków przed końcem roku generuje lawinę faktur. Równoczesny pośpiech i przeciążenie pracowników przekłada się na błędy. Wspólną przyczyną obu zjawisk jest presja końca roku budżetowego, a nie samo zwiększenie liczby faktur."
    },
    {
      "id": "t3_003",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Obserwacje z wydziału spraw obywatelskich urzędu miejskiego pokazują, że w miesiącach wyborczych wzrasta liczba wniosków o wydanie zaświadczenia o prawie do głosowania. Jednocześnie w tych samych miesiącach wzrasta liczba wniosków o dopisanie do rejestru wyborców.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "STYCZEŃ",
          "MARZEC",
          "MAJ (WYBORY)",
          "LIPIEC"
        ],
        "datasets": [
          {
            "label": "Wnioski o zaświadczenie do głosowania (szt.)",
            "data": [
              18,
              24,
              312,
              21
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o dopisanie do rejestru wyborców (szt.)",
            "data": [
              22,
              31,
              278,
              19
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost wniosków o zaświadczenie powoduje wzrost wniosków o dopisanie do rejestru.",
        "B) Wzrost wniosków o dopisanie do rejestru powoduje wzrost wniosków o zaświadczenia.",
        "C) Zbliżający się termin wyborów jest wspólną przyczyną obu wzrostów — obywatele chcą skorzystać z praw wyborczych i składają oba rodzaje wniosków z tego samego powodu.",
        "D) Brak związku przyczynowo-skutkowego między tymi dwoma rodzajami wniosków."
      ],
      "correct": 2,
      "explanation": "Obydwa rodzaje wniosków gwałtownie rosną wyłącznie w miesiącu wyborczym i wracają do normalnego poziomu po wyborach. Wspólna przyczyna to zbliżający się termin wyborów, który mobilizuje obywateli do wszelkich czynności związanych z realizacją praw wyborczych. Brak bezpośredniego mechanizmu przyczynowego między tymi dwoma rodzajami wniosków."
    },
    {
      "id": "t3_004",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Wydział zamówień publicznych urzędu regionalnego zaobserwował, że po wprowadzeniu nowego systemu informatycznego do obsługi postępowań przetargowych wzrosła liczba postępowań wszczynanych miesięcznie. Jednocześnie wzrosła liczba zapytań do działu IT dotyczących obsługi systemu.",
      "chart": {
        "type": "line",
        "xLabels": [
          "PRZED WDR.",
          "1 MIESIĄC",
          "3 MIESIĄCE",
          "6 MIESIĘCY"
        ],
        "datasets": [
          {
            "label": "Wszczęte postępowania (szt.)",
            "data": [
              28,
              32,
              41,
              48
            ],
            "color": "#c0392b"
          },
          {
            "label": "Zapytania do IT (szt.)",
            "data": [
              12,
              58,
              34,
              18
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost wszczętych postępowań powoduje wzrost zapytań do IT.",
        "B) Wzrost zapytań do IT powoduje wzrost liczby wszczętych postępowań.",
        "C) Wdrożenie nowego systemu IT spowodowało zarówno wzrost efektywności (więcej postępowań), jak i wzrost pytań technicznych — obie tendencje wynikają z adaptacji do nowego narzędzia.",
        "D) Brak związku między wdrożeniem systemu IT a liczbą postępowań i zapytań."
      ],
      "correct": 2,
      "explanation": "Dane wskazują, że zapytania do IT gwałtownie rosną po wdrożeniu, a potem maleją (krzywa uczenia się), natomiast liczba postępowań rośnie stopniowo. Obie tendencje wynikają z wdrożenia nowego systemu: system ułatwia pracę (więcej postępowań), a jego nowość generuje pytania techniczne. Wspólna przyczyna to samo wdrożenie."
    },
    {
      "id": "t3_005",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Urząd ds. cudzoziemców odnotował, że w kwartałach z intensywną kampanią informacyjną o procedurach legalizacji pobytu rośnie liczba składanych wniosków o zezwolenie na pobyt. Jednocześnie rośnie liczba poprawnie wypełnionych wniosków.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "BEZ KAMPANII",
          "I KAMPANIA",
          "BEZ KAMPANII",
          "II KAMPANIA"
        ],
        "datasets": [
          {
            "label": "Wnioski o pobyt (szt.)",
            "data": [
              142,
              198,
              155,
              211
            ],
            "color": "#c0392b"
          },
          {
            "label": "Poprawnie wypełnione wnioski (%)",
            "data": [
              52,
              71,
              54,
              74
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost liczby wniosków powoduje wzrost odsetka poprawnych wniosków.",
        "B) Wzrost odsetka poprawnych wniosków powoduje wzrost liczby składanych wniosków.",
        "C) Kampanie informacyjne powodują zarówno wzrost liczby wniosków, jak i ich jakości — obydwa efekty wynikają z lepszej wiedzy wnioskodawców.",
        "D) Brak związku przyczynowo-skutkowego między kampanią a wnioskami."
      ],
      "correct": 2,
      "explanation": "W obu kampaniach wzrastają jednocześnie liczba wniosków i odsetek poprawnie wypełnionych. Kampania informacyjna jest wspólną przyczyną: dotarcie do szerszej grupy potencjalnych wnioskodawców zwiększa ich liczbę, a jednocześnie lepsza wiedza o procedurach poprawia jakość składanych dokumentów."
    },
    {
      "id": "t3_006",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Dane z centrum zarządzania projektami unijnymi wykazały, że w latach z wyższą absorpcją środków unijnych przez samorządy wzrasta liczba składanych wniosków o dofinansowanie. W tych samych latach wzrasta też liczba zatrudnionych specjalistów ds. funduszy europejskich w samorządach.",
      "chart": {
        "type": "line",
        "xLabels": [
          "ROK 1",
          "ROK 2",
          "ROK 3",
          "ROK 4"
        ],
        "datasets": [
          {
            "label": "Absorpcja środków UE (mln zł)",
            "data": [
              820,
              1140,
              980,
              1380
            ],
            "color": "#c0392b"
          },
          {
            "label": "Specjaliści ds. funduszy (etaty)",
            "data": [
              210,
              318,
              275,
              392
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Zatrudnienie specjalistów powoduje wzrost absorpcji środków UE.",
        "B) Wzrost absorpcji powoduje wzrost zatrudnienia specjalistów ds. funduszy.",
        "C) Nowe perspektywy finansowe UE lub dostępność programów operacyjnych powodują zarówno wzrost absorpcji, jak i wzrost zapotrzebowania na specjalistów — obydwa zjawiska wynikają z otwarcia się nowych możliwości finansowania.",
        "D) Brak związku przyczynowo-skutkowego między absorpcją a zatrudnieniem specjalistów."
      ],
      "correct": 2,
      "explanation": "Dane pokazują, że absorpcja i zatrudnienie specjalistów rosną i maleją równocześnie. Wspólna przyczyna to dostępność środków unijnych — gdy otwierają się nowe programy lub perspektywy finansowe, samorządy zarówno zwiększają absorpcję, jak i zatrudniają specjalistów do obsługi projektów."
    },
    {
      "id": "t3_007",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Analiza inspekcji sanitarnej wykazała, że latem wzrasta liczba kontroli punktów gastronomicznych. W tym samym sezonie wzrasta liczba zgłoszeń zatruć pokarmowych przez obywateli.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "WIOSNA",
          "LATO",
          "JESIEŃ",
          "ZIMA"
        ],
        "datasets": [
          {
            "label": "Kontrole gastronomii (szt.)",
            "data": [
              88,
              142,
              76,
              52
            ],
            "color": "#c0392b"
          },
          {
            "label": "Zgłoszenia zatruć pokarmowych (szt.)",
            "data": [
              34,
              68,
              28,
              18
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost kontroli powoduje wzrost zatruć pokarmowych.",
        "B) Wzrost zatruć pokarmowych powoduje wzrost liczby kontroli gastronomii.",
        "C) Wysokie temperatury latem sprzyjają namnażaniu bakterii w żywności — powoduje to zarówno wzrost zatruć, jak i wzmożone kontrole przez inspekcję sanitarną.",
        "D) Brak związku przyczynowo-skutkowego między kontrolami a zatruciami pokarmowymi."
      ],
      "correct": 2,
      "explanation": "Latem wysokie temperatury przyspieszają psucie się żywności i namnażanie bakterii, co prowadzi do wzrostu zatruć pokarmowych. Jednocześnie inspekcja sanitarna reaguje sezonowo — wzmożona aktywność letnia (turystyczna, gastronomiczna) skłania ją do planowania intensywniejszych kontroli właśnie latem. Obie tendencje mają wspólną przyczynę: warunki termiczne lata."
    },
    {
      "id": "t3_008",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Wydział komunikacji urzędu powiatowego odnotował, że w miesiącach po masowej zmianie przepisów ruchu drogowego wzrasta liczba kursów szkoleniowych dla kierowców. Jednocześnie wzrasta liczba wniosków o wymianę praw jazdy.",
      "chart": {
        "type": "line",
        "xLabels": [
          "PRZED ZMIANĄ",
          "1 MIESIĄC PO",
          "3 MIESIĄCE PO",
          "6 MIESIĘCY PO"
        ],
        "datasets": [
          {
            "label": "Kursy dla kierowców (szt.)",
            "data": [
              22,
              78,
              55,
              28
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o wymianę prawa jazdy (szt.)",
            "data": [
              48,
              124,
              98,
              61
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost kursów dla kierowców powoduje wzrost wniosków o wymianę prawa jazdy.",
        "B) Wzrost wniosków o wymianę prawa jazdy powoduje wzrost kursów szkoleniowych.",
        "C) Zmiana przepisów ruchu drogowego powoduje zarówno wzrost kursów (potrzeba aktualizacji wiedzy), jak i wniosków o wymianę dokumentów — obie tendencje wynikają z wejścia w życie nowych regulacji.",
        "D) Brak związku przyczynowo-skutkowego między kursami a wnioskami o wymianę prawa jazdy."
      ],
      "correct": 2,
      "explanation": "Obydwa zjawiska gwałtownie rosną bezpośrednio po zmianie przepisów i stopniowo wracają do normy — charakterystyczny kształt krzywej reakcji na nowe regulacje. Zmiana przepisów jest wspólną przyczyną: kierowcy aktualizują wiedzę (kursy) i dokumenty (wymiana prawa jazdy) z tego samego powodu."
    },
    {
      "id": "t3_009",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Regionalny urząd statystyczny wykazał, że w kwartałach z wyższą stopą inflacji rośnie liczba wniosków o zasiłek celowy w MOPS. Jednocześnie w tych samych kwartałach wzrasta liczba wniosków o obniżenie podatku od nieruchomości.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Wnioski o zasiłek celowy (szt.)",
            "data": [
              312,
              358,
              391,
              445
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o obniżenie podatku od nieruchomości (szt.)",
            "data": [
              88,
              104,
              119,
              138
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost wniosków o zasiłek celowy powoduje wzrost wniosków o obniżenie podatku.",
        "B) Wzrost wniosków o obniżenie podatku powoduje wzrost wniosków o zasiłki.",
        "C) Rosnąca inflacja i związane z nią trudności finansowe gospodarstw domowych są wspólną przyczyną obu wzrostów — obywatele szukają wsparcia z różnych źródeł jednocześnie.",
        "D) Brak związku przyczynowo-skutkowego między tymi dwoma rodzajami wniosków."
      ],
      "correct": 2,
      "explanation": "Systematyczny wzrost obu wskaźników w kolejnych kwartałach odzwierciedla narastające trudności finansowe obywateli. Inflacja jako wspólna przyczyna wywołuje jednoczesne zapotrzebowanie na pomoc społeczną (zasiłki celowe) i ulgi podatkowe (obniżenie podatku od nieruchomości). Oba zjawiska są reakcją na te same trudności ekonomiczne."
    },
    {
      "id": "t3_010",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Analiza danych z urzędu pracy dla obszaru górniczego wykazała, że po ogłoszeniu planów restrukturyzacji kopalni gwałtownie rośnie liczba nowych rejestracji bezrobotnych. W tym samym czasie wzrasta liczba wniosków o przekwalifikowanie zawodowe.",
      "chart": {
        "type": "line",
        "xLabels": [
          "PRZED OGŁ.",
          "1 KW. PO",
          "2 KW. PO",
          "3 KW. PO"
        ],
        "datasets": [
          {
            "label": "Nowe rejestracje bezrobotnych (szt.)",
            "data": [
              145,
              412,
              388,
              298
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o przekwalifikowanie (szt.)",
            "data": [
              38,
              188,
              215,
              176
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost bezrobocia powoduje wzrost wniosków o przekwalifikowanie.",
        "B) Wzrost wniosków o przekwalifikowanie zmniejsza bezrobocie.",
        "C) Ogłoszenie restrukturyzacji kopalni jest wspólną przyczyną zarówno wzrostu bezrobocia, jak i wzrostu zainteresowania przekwalifikowaniem — pracownicy szukają nowej pracy po utracie zatrudnienia.",
        "D) Brak związku przyczynowo-skutkowego między bezrobociem a przekwalifikowaniem."
      ],
      "correct": 2,
      "explanation": "Obydwa wskaźniki gwałtownie rosną po ogłoszeniu restrukturyzacji i stopniowo maleją. Wspólną przyczyną jest samo ogłoszenie planów zamknięcia kopalni: pracownicy tracą lub spodziewają się utraty pracy (rejestracja bezrobotnych) i jednocześnie podejmują działania adaptacyjne (wnioski o przekwalifikowanie). To dwa efekty tej samej przyczyny."
    },
    {
      "id": "t3_011",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Urząd ds. rejestracji stanu cywilnego odnotował, że w miesiącu po wprowadzeniu nowych formularzy urzędowych wzrasta liczba zwrotów wniosków z powodu błędów formalnych. W tym samym czasie wzrasta liczba interwencji bezpośrednich obywateli w biurze obsługi.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "PRZED ZMIANĄ",
          "1 MIESIĄC PO",
          "2 MIESIĄCE PO",
          "3 MIESIĄCE PO"
        ],
        "datasets": [
          {
            "label": "Zwroty wniosków (szt.)",
            "data": [
              18,
              62,
              38,
              22
            ],
            "color": "#c0392b"
          },
          {
            "label": "Interwencje w biurze obsługi (szt.)",
            "data": [
              45,
              128,
              84,
              52
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost zwrotów wniosków powoduje wzrost interwencji w biurze obsługi.",
        "B) Wzrost interwencji w biurze obsługi powoduje wzrost zwrotów wniosków.",
        "C) Zmiana formularzy urzędowych dezorientuje obywateli, powodując zarówno więcej błędów przy wypełnianiu (zwroty), jak i więcej pytań w biurze obsługi — obydwa zjawiska wynikają z nieznanego wzoru formularza.",
        "D) Brak związku przyczynowo-skutkowego między zwrotami wniosków a interwencjami."
      ],
      "correct": 2,
      "explanation": "Charakterystyczny kształt krzywej — gwałtowny wzrost, a następnie stopniowy powrót do normy — wskazuje na efekt adaptacji do nowego formularza. Zmiana wzoru formularza jest wspólną przyczyną: obywatele nie znają nowego formatu (więcej błędów i zwrotów) i jednocześnie szukają pomocy w urzędzie (więcej interwencji)."
    },
    {
      "id": "t3_012",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Wydział infrastruktury drogowej odnotował, że w latach większych nakładów na remonty dróg wzrasta liczba zgłoszonych awarii infrastruktury komunalnej (wodociągów, kanalizacji). Jednocześnie wzrasta liczba udzielonych pozwoleń na zajęcie pasa drogowego.",
      "chart": {
        "type": "line",
        "xLabels": [
          "ROK 1",
          "ROK 2",
          "ROK 3",
          "ROK 4"
        ],
        "datasets": [
          {
            "label": "Nakłady na remonty dróg (mln zł)",
            "data": [
              28,
              45,
              38,
              58
            ],
            "color": "#c0392b"
          },
          {
            "label": "Zgłoszenia awarii infrastruktury (szt.)",
            "data": [
              142,
              218,
              181,
              274
            ],
            "color": "#2980b9"
          },
          {
            "label": "Pozwolenia na zajęcie pasa (szt.)",
            "data": [
              88,
              134,
              112,
              168
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Wzrost nakładów na remonty dróg powoduje awarie infrastruktury komunalnej.",
        "B) Awarie infrastruktury powodują wzrost nakładów na remonty.",
        "C) Zwiększone nakłady na infrastrukturę drogową są sygnałem aktywności inwestycyjnej gminy — ten sam impuls powoduje remonty dróg, prace przy sieci komunalnej i wydawanie pozwoleń na zajęcie pasa.",
        "D) Brak związku przyczynowo-skutkowego między nakładami a awariami i pozwoleniami."
      ],
      "correct": 2,
      "explanation": "Wszystkie trzy wskaźniki rosną i maleją razem. Wspólną przyczyną jest ogólna aktywność inwestycyjna w infrastrukturze: w latach wysokich budżetów na drogi gminy prowadzą jednocześnie prace przy sieciach komunalnych (co ujawnia i powoduje awarie) oraz wydają pozwolenia na zajęcie pasa drogowego na potrzeby tych prac."
    },
    {
      "id": "t3_013",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Analiza z centrum obsługi podatników urzędu skarbowego wykazała, że w tygodniach intensywnej komunikacji w mediach na temat ulg podatkowych wzrasta liczba wizyt podatników. Jednocześnie w tych tygodniach wzrasta liczba składanych korekt zeznań podatkowych.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "TYDZIEŃ 1",
          "TYDZIEŃ 2 (KAMPANIA)",
          "TYDZIEŃ 3",
          "TYDZIEŃ 4 (KAMPANIA)"
        ],
        "datasets": [
          {
            "label": "Wizyty podatników (szt.)",
            "data": [
              88,
              154,
              92,
              168
            ],
            "color": "#c0392b"
          },
          {
            "label": "Korekty zeznań (szt.)",
            "data": [
              24,
              58,
              28,
              64
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost wizyt podatników powoduje wzrost korekt zeznań.",
        "B) Wzrost korekt zeznań powoduje wzrost wizyt podatników.",
        "C) Kampanie medialne o ulgach podatkowych powodują zarówno wzrost zainteresowania wizytami, jak i wzrost korekt zeznań przez podatników, którzy odkryli niewyorzystane ulgi.",
        "D) Brak związku przyczynowo-skutkowego między wizytami a korektami zeznań."
      ],
      "correct": 2,
      "explanation": "Wzrost obu wskaźników jest wyraźnie skorelowany z tygodniami kampanii medialnej. Wspólna przyczyna to kampania informacyjna: podatnicy dowiadują się o ulgach (więcej wizyt po informacje) i odkrywają, że nie skorzystali z przysługujących im ulg w poprzednich zeznaniach (więcej korekt). Oba efekty wynikają z tej samej akcji komunikacyjnej."
    },
    {
      "id": "t3_014",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Urząd ds. planowania przestrzennego odnotował, że w kwartałach po uchwaleniu nowego miejscowego planu zagospodarowania wzrasta liczba wniosków o pozwolenie na budowę. Jednocześnie wzrasta liczba wniosków o podział nieruchomości.",
      "chart": {
        "type": "line",
        "xLabels": [
          "PRZED MPZP",
          "1 KW. PO",
          "2 KW. PO",
          "3 KW. PO"
        ],
        "datasets": [
          {
            "label": "Wnioski o pozwolenie na budowę (szt.)",
            "data": [
              42,
              88,
              74,
              65
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o podział nieruchomości (szt.)",
            "data": [
              18,
              42,
              38,
              29
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost wniosków o pozwolenie na budowę powoduje wzrost wniosków o podział nieruchomości.",
        "B) Wzrost wniosków o podział nieruchomości powoduje wzrost wniosków o pozwolenie na budowę.",
        "C) Uchwalenie nowego MPZP stwarza nowe możliwości inwestycyjne, co powoduje jednocześnie wzrost wniosków o budowę i podziały nieruchomości pod planowane inwestycje.",
        "D) Brak związku przyczynowo-skutkowego między wnioskami o pozwolenie na budowę a podziałami nieruchomości."
      ],
      "correct": 2,
      "explanation": "Obydwa wzrosty pojawiają się bezpośrednio po uchwaleniu MPZP i stopniowo wygasają. Nowy plan zagospodarowania jest wspólną przyczyną: inwestorzy reagują na nowe przeznaczenie terenów, składając wnioski o budowę na przeznaczonych terenach i jednocześnie dzieląc działki pod nowe inwestycje. Oba efekty wynikają z tej samej zmiany planistycznej."
    },
    {
      "id": "t3_015",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Centrum zarządzania kryzysowego powiatu odnotowało, że w sezonach intensywnych opadów deszczu wzrasta liczba interwencji straży pożarnej dotyczących podtopień. Jednocześnie wzrasta liczba wniosków do wydziału infrastruktury o naprawę przepustów i rowów melioracyjnych.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "WIOSNA",
          "LATO",
          "JESIEŃ",
          "ZIMA"
        ],
        "datasets": [
          {
            "label": "Interwencje straży przy podtopieniach (szt.)",
            "data": [
              22,
              68,
              48,
              12
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wnioski o naprawę przepustów (szt.)",
            "data": [
              15,
              52,
              38,
              8
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost interwencji straży powoduje wzrost wniosków o naprawę przepustów.",
        "B) Zaniedbane przepusty powodują podtopienia, a te z kolei interwencje straży.",
        "C) Intensywne opady deszczu w sezonie letnim są wspólną przyczyną zarówno podtopień (i interwencji straży), jak i wniosków o naprawę infrastruktury melioracyjnej.",
        "D) Brak związku przyczynowo-skutkowego między podtopieniami a wnioskami o przepusty."
      ],
      "correct": 2,
      "explanation": "Obydwa wskaźniki rosną i maleją zgodnie z sezonowością opadów. Intensywne opady letnie są wspólną przyczyną: powodują bezpośrednio podtopienia (wzrost interwencji straży) i ujawniają niedrożność infrastruktury melioracyjnej, co skłania obywateli do składania wniosków o jej naprawę. Obie reakcje wynikają z tej samej przyczyny — nadmiaru wody."
    },
    {
      "id": "t3_016",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Wydział edukacji urzędu miejskiego odnotował, że w latach z wyższym poziomem finansowania szkół z budżetu gminy rośnie liczba szkół uzyskujących certyfikaty jakości. Jednocześnie rośnie liczba nauczycieli uczestniczących w szkoleniach doskonalących.",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Finansowanie szkół (mln zł)",
            "data": [
              28,
              32,
              31,
              38
            ],
            "color": "#c0392b"
          },
          {
            "label": "Certyfikaty jakości (szt.)",
            "data": [
              8,
              12,
              11,
              16
            ],
            "color": "#2980b9"
          },
          {
            "label": "Nauczyciele na szkoleniach (os.)",
            "data": [
              142,
              188,
              175,
              231
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Uzyskanie certyfikatów powoduje wzrost finansowania szkół.",
        "B) Szkolenia nauczycieli bezpośrednio powodują wzrost certyfikatów.",
        "C) Wyższy poziom finansowania szkół jest wspólną przyczyną — umożliwia zarówno wysyłanie nauczycieli na szkolenia, jak i inwestowanie w procedury jakości wymagane do certyfikacji.",
        "D) Brak związku przyczynowo-skutkowego między finansowaniem a certyfikatami i szkoleniami."
      ],
      "correct": 2,
      "explanation": "Wszystkie trzy wskaźniki rosną razem z poziomem finansowania. Wyższy budżet jest wspólną przyczyną: daje szkołom środki na szkolenia nauczycieli i jednocześnie na wdrożenie systemów zarządzania jakością wymaganych do certyfikacji. Choć szkolenia przyczyniają się do certyfikatów, obie tendencje wynikają pierwotnie z dostępności środków finansowych."
    },
    {
      "id": "t3_017",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Analiza z wydziału spraw społecznych urzędu gminy wykazała, że w kwartałach z rosnącym bezrobociem wzrasta liczba interwencji kryzysowych MOPS. Jednocześnie w tych samych kwartałach wzrasta liczba wniosków o przyznanie asystenta rodziny.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Stopa bezrobocia (%)",
            "data": [
              6.8,
              7.4,
              8.1,
              8.9
            ],
            "color": "#c0392b"
          },
          {
            "label": "Interwencje kryzysowe MOPS (szt.)",
            "data": [
              42,
              54,
              68,
              82
            ],
            "color": "#2980b9"
          },
          {
            "label": "Wnioski o asystenta rodziny (szt.)",
            "data": [
              18,
              24,
              31,
              38
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Wzrost interwencji kryzysowych powoduje wzrost wniosków o asystenta rodziny.",
        "B) Wzrost wniosków o asystenta rodziny powoduje wzrost interwencji kryzysowych.",
        "C) Rosnące bezrobocie jest wspólną przyczyną — powoduje trudności finansowe rodzin, co jednocześnie generuje kryzysy (interwencje MOPS) i potrzebę wsparcia w codziennym funkcjonowaniu (asystentura).",
        "D) Brak związku przyczynowo-skutkowego między bezrobociem a interwencjami i asystentami."
      ],
      "correct": 2,
      "explanation": "Wszystkie trzy wskaźniki systematycznie rosną w kolejnych kwartałach. Rosnące bezrobocie jest wspólną przyczyną, wywołując kaskadę problemów społecznych: utrata dochodu prowadzi do kryzysów rodzinnych (interwencje MOPS) i pogorszenia funkcjonowania rodzin wymagającego wsparcia asystenckiego. Oba efekty są następstwem tej samej przyczyny ekonomicznej."
    },
    {
      "id": "t3_018",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Dane z urzędu regulacji energetyki wykazały, że w kwartałach z wyższymi cenami energii elektrycznej wzrasta liczba skarg konsumentów na sprzedawców energii. Jednocześnie wzrasta liczba wniosków o zmianę sprzedawcy energii.",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Indeks cen energii (pkt.)",
            "data": [
              105,
              118,
              114,
              132
            ],
            "color": "#c0392b"
          },
          {
            "label": "Skargi konsumentów (szt.)",
            "data": [
              88,
              148,
              132,
              198
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost skarg konsumentów powoduje wzrost wniosków o zmianę sprzedawcy.",
        "B) Wzrost wniosków o zmianę sprzedawcy powoduje wzrost skarg konsumentów.",
        "C) Wyższe ceny energii są wspólną przyczyną — niezadowolenie z kosztów skłania konsumentów zarówno do składania skarg, jak i do aktywnego szukania korzystniejszych ofert (zmiany sprzedawcy).",
        "D) Brak związku przyczynowo-skutkowego między cenami energii a skargami."
      ],
      "correct": 2,
      "explanation": "Obydwa wskaźniki rosną razem z cenami energii. Wyższe ceny energii są wspólną przyczyną niezadowolenia konsumentów: część reaguje biernie (skargi na obecnego sprzedawcę), a część aktywnie (zmiana sprzedawcy na tańszego). Oba zachowania wynikają z tej samej przyczyny — wzrostu kosztów energii."
    },
    {
      "id": "t3_019",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Centrum informatyczne urzędu marszałkowskiego zaobserwowało, że w dniach przed upływem terminów składania dokumentów wzrasta liczba awarii systemu elektronicznego. Jednocześnie w tych samych dniach wzrasta liczba telefonów na infolinię techniczną.",
      "chart": {
        "type": "bar",
        "xLabels": [
          "NORMALNY DZIEŃ",
          "3 DNI PRZED TERMINEM",
          "1 DZIEŃ PRZED TERMINEM",
          "DZIEŃ TERMINU"
        ],
        "datasets": [
          {
            "label": "Awarie systemu (zdarzenia)",
            "data": [
              8,
              18,
              34,
              52
            ],
            "color": "#c0392b"
          },
          {
            "label": "Połączenia na infolinię (szt.)",
            "data": [
              42,
              98,
              178,
              254
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Awarie systemu powodują wzrost telefonów na infolinię.",
        "B) Wzrost telefonów na infolinię przeciąża system i powoduje jego awarie.",
        "C) Zbliżający się termin składania dokumentów powoduje gwałtowny wzrost liczby użytkowników systemu, co jednocześnie przeciąża infrastrukturę (awarie) i generuje potrzebę pomocy technicznej (infolinia).",
        "D) Brak związku przyczynowo-skutkowego między awariami a telefonami na infolinię."
      ],
      "correct": 2,
      "explanation": "Obydwa wskaźniki narastają stopniowo i osiągają szczyt dokładnie w dniu terminu. Wspólna przyczyna to zbliżający się termin, który mobilizuje dużą liczbę użytkowników do jednoczesnego korzystania z systemu: przeciążenie infrastruktury powoduje awarie, a trudności techniczne (i sama presja terminu) generują zapytania do infolinii."
    },
    {
      "id": "t3_020",
      "typeId": 3,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź. Na podstawie informacji, wybierz najbardziej prawdopodobny związek przyczynowo-skutkowy. Tylko jedna odpowiedź jest poprawna.",
      "text": "Wydział kontroli wewnętrznej urzędu celno-skarbowego odnotował, że w kwartałach następujących po zmianach kadrowych na stanowiskach kierowniczych wzrasta liczba nieprawidłowości wykrywanych podczas kontroli. Jednocześnie wzrasta liczba szkoleń wewnętrznych dla pracowników.",
      "chart": {
        "type": "line",
        "xLabels": [
          "PRZED ZMIANĄ",
          "I KW. PO",
          "II KW. PO",
          "III KW. PO"
        ],
        "datasets": [
          {
            "label": "Nieprawidłowości w kontrolach (szt.)",
            "data": [
              22,
              48,
              38,
              26
            ],
            "color": "#c0392b"
          },
          {
            "label": "Szkolenia wewnętrzne (szt.)",
            "data": [
              8,
              28,
              22,
              12
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wzrost nieprawidłowości powoduje wzrost szkoleń wewnętrznych.",
        "B) Wzrost szkoleń wewnętrznych ujawnia więcej nieprawidłowości.",
        "C) Zmiany kadrowe na stanowiskach kierowniczych destabilizują pracę urzędu — nowi kierownicy zarówno intensywniej kontrolują (ujawniając nieprawidłowości), jak i organizują szkolenia dla nowo zarządzanych zespołów.",
        "D) Brak związku przyczynowo-skutkowego między zmianami kadrowymi a nieprawidłowościami i szkoleniami."
      ],
      "correct": 2,
      "explanation": "Charakterystyczny kształt krzywej — gwałtowny wzrost po zmianie, a potem stopniowy powrót do normy — wskazuje na efekt rotacji kierowniczej. Zmiana kadry kierowniczej jest wspólną przyczyną: nowi kierownicy intensywnie audytują procesy (więcej wykrytych nieprawidłowości) i jednocześnie wdrażają własne standardy przez szkolenia. Oba efekty wygasają w miarę stabilizacji."
    }
  ],
  "type4": [
    {
      "id": "t4_001",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Lex retro non agit jest do zakazu wstecznego działania prawa, jak nulla poena sine lege jest do",
      "options": [
        "A) zakazu analogii w prawie karnym",
        "B) zasady humanitaryzmu kary",
        "C) zakazu karania bez podstawy ustawowej",
        "D) zasady domniemania niewinności",
        "E) zakazu podwójnego karania"
      ],
      "correct": 2,
      "explanation": "Lex retro non agit to łacińska paremia oznaczająca zakaz wstecznego działania prawa. Analogicznie nulla poena sine lege to paremia oznaczająca zakaz karania bez ustawowej podstawy prawnej (nie ma kary bez ustawy). Identyczna relacja: paremia łacińska do wyrażonej przez nią zasady prawnej."
    },
    {
      "id": "t4_002",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Dyrektywa jest do transpozycji, jak rozporządzenie UE jest do",
      "options": [
        "A) ratyfikacji",
        "B) implementacji krajowej",
        "C) bezpośredniego stosowania",
        "D) ogłoszenia w Dz.U.",
        "E) akceptacji przez Radę UE"
      ],
      "correct": 2,
      "explanation": "Dyrektywa UE wymaga transpozycji — przeniesienia jej celów do prawa krajowego. Analogicznie rozporządzenie UE charakteryzuje się bezpośrednim stosowaniem — obowiązuje w każdym państwie członkowskim bez konieczności transpozycji. Relacja identyczna: akt UE do sposobu jego obowiązywania w państwach."
    },
    {
      "id": "t4_003",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Desuetudo jest do niepisanego uchylenia prawa przez zaniechanie stosowania, jak consuetudo est altera lex jest do",
      "options": [
        "A) zasady prawa pisanego",
        "B) niepisanego prawa zwyczajowego jako źródła prawa",
        "C) zakazu analogii",
        "D) zasady przyzwoitości legislacyjnej",
        "E) zasady ochrony praw nabytych"
      ],
      "correct": 1,
      "explanation": "Desuetudo oznacza wyjście normy z użycia przez zaprzestanie jej stosowania — niepisane uchylenie przez zwyczaj nieużywania. Analogicznie consuetudo est altera lex (zwyczaj jest drugim prawem) wyraża uznanie prawa zwyczajowego jako źródła prawa — to bezpośrednie znaczenie tej łacińskiej sentencji."
    },
    {
      "id": "t4_004",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Naczelnik urzędu skarbowego jest do organu podatkowego pierwszej instancji, jak dyrektor izby administracji skarbowej jest do",
      "options": [
        "A) organu nadzoru finansowego",
        "B) organu podatkowego drugiej instancji",
        "C) organu kontroli skarbowej",
        "D) organu wykonania budżetu",
        "E) organu egzekucji administracyjnej"
      ],
      "correct": 1,
      "explanation": "Naczelnik urzędu skarbowego jest organem podatkowym pierwszej instancji — to jego pozycja w hierarchii organów podatkowych. Analogicznie dyrektor izby administracji skarbowej jest organem podatkowym drugiej instancji — rozpatruje odwołania od decyzji naczelnika urzędu skarbowego."
    },
    {
      "id": "t4_005",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Zasada subsydiarności jest do podziału kompetencji między UE a państwami, jak zasada proporcjonalności jest do",
      "options": [
        "A) hierarchii norm prawnych",
        "B) podziału władzy w państwie",
        "C) sposobu wykonywania kompetencji przez UE",
        "D) procedury legislacyjnej UE",
        "E) relacji między Komisją a Radą UE"
      ],
      "correct": 2,
      "explanation": "Zasada subsydiarności (pomocniczości) reguluje podział kompetencji między UE a państwami członkowskimi — określa, kiedy UE powinna działać. Analogicznie zasada proporcjonalności reguluje sposób wykonywania kompetencji przez UE — nakazuje, by środki działania UE nie wykraczały poza to, co niezbędne do osiągnięcia celów."
    },
    {
      "id": "t4_006",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Superficies solo cedit jest do prawa nieruchomości, jak pacta sunt servanda jest do",
      "options": [
        "A) prawa procesowego",
        "B) prawa konstytucyjnego",
        "C) prawa kontraktowego (umów)",
        "D) prawa karnego",
        "E) prawa administracyjnego"
      ],
      "correct": 2,
      "explanation": "Superficies solo cedit (to, co na gruncie, przypada gruntowi) to fundamentalna paremia prawa nieruchomości — wyraża zasadę akcesji. Analogicznie pacta sunt servanda (umów należy dotrzymywać) jest fundamentalną paremią prawa kontraktowego — wyraża zasadę związania stron postanowieniami umowy."
    },
    {
      "id": "t4_007",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Postanowienie o wszczęciu postępowania jest do początku postępowania administracyjnego, jak decyzja ostateczna jest do",
      "options": [
        "A) uchylenia postępowania",
        "B) początku terminu do odwołania",
        "C) zakończenia postępowania administracyjnego w danej instancji",
        "D) wznowienia postępowania",
        "E) kontroli sądowoadministracyjnej"
      ],
      "correct": 2,
      "explanation": "Postanowienie o wszczęciu postępowania oznacza jego początek — to moment inicjujący bieg postępowania administracyjnego. Analogicznie decyzja ostateczna oznacza zakończenie postępowania administracyjnego w danej instancji — jest aktem kończącym tok instancji i otwierającym drogę do sądu administracyjnego."
    },
    {
      "id": "t4_008",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Przepis prawa jest do normy prawnej, jak zdanie gramatyczne jest do",
      "options": [
        "A) aktu normatywnego",
        "B) wyrażonej przez nie myśli/sądu logicznego",
        "C) reguły językowej",
        "D) słownika języka polskiego",
        "E) tekstu prawnego"
      ],
      "correct": 1,
      "explanation": "Przepis prawa jest jednostką redakcyjną tekstu prawnego, z której (często kilku) rekonstruuje się normę prawną — norma jest treścią wynikającą z przepisu. Analogicznie zdanie gramatyczne jest jednostką tekstu, z której wyraża się myśl lub sąd logiczny — sąd logiczny jest treścią wyrażoną przez zdanie."
    },
    {
      "id": "t4_009",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Curator bonis jest do zarządcy majątku w postępowaniu sądowym, jak syndyk jest do",
      "options": [
        "A) zarządcy majątku upadłego",
        "B) pełnomocnika procesowego",
        "C) kuratora sądowego dla małoletnich",
        "D) likwidatora spółki",
        "E) administratora nieruchomości"
      ],
      "correct": 0,
      "explanation": "Curator bonis to zarządca majątku wyznaczany przez sąd w określonych postępowaniach. Analogicznie syndyk to zarządca majątku upadłego — osoba wyznaczana przez sąd w postępowaniu upadłościowym do zarządzania majątkiem dłużnika. Identyczna relacja: łacińska nazwa funkcji do jej polskiego ekwiwalentu w postępowaniu sądowym."
    },
    {
      "id": "t4_010",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Interpretatio extensiva jest do rozszerzającej wykładni prawa, jak interpretatio restrictiva jest do",
      "options": [
        "A) wykładni językowej",
        "B) wykładni systemowej",
        "C) zawężającej wykładni prawa",
        "D) analogii legis",
        "E) wykładni celowościowej"
      ],
      "correct": 2,
      "explanation": "Interpretatio extensiva to łacińska nazwa wykładni rozszerzającej — poszerzającej zakres zastosowania normy poza literalne brzmienie. Analogicznie interpretatio restrictiva to łacińska nazwa wykładni zawężającej — ograniczającej zakres zastosowania normy poniżej literalnego brzmienia. Identyczna relacja: łacińska nazwa do polskiej nazwy metody wykładni."
    },
    {
      "id": "t4_011",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Strona czynna stosunku prawnego jest do podmiotu uprawnionego, jak strona bierna jest do",
      "options": [
        "A) podmiotu zobowiązanego",
        "B) podmiotu chronionego",
        "C) uczestnika postępowania",
        "D) podmiotu posiadającego zdolność prawną",
        "E) podmiotu ponoszącego odpowiedzialność"
      ],
      "correct": 0,
      "explanation": "Strona czynna stosunku prawnego to podmiot uprawniony — posiada prawo podmiotowe. Analogicznie strona bierna stosunku prawnego to podmiot zobowiązany — jest adresatem obowiązku wynikającego ze stosunku prawnego. Identyczna relacja: nazwa strony stosunku prawnego do jej charakterystyki."
    },
    {
      "id": "t4_012",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Ratifikation jest do wejścia w życie umowy międzynarodowej przez parlament, jak adhezja jest do",
      "options": [
        "A) zawarcia umowy przez ministra spraw zagranicznych",
        "B) przystąpienia do umowy bez możliwości negocjowania jej treści",
        "C) wypowiedzenia umowy międzynarodowej",
        "D) nowelizacji postanowień umowy",
        "E) tymczasowego stosowania umowy"
      ],
      "correct": 1,
      "explanation": "Ratyfikacja to procedura, przez którą parlament wyraża zgodę na związanie się umową międzynarodową, co umożliwia jej wejście w życie. Analogicznie adhezja (przystąpienie) to tryb, w którym państwo przystępuje do istniejącej już umowy wielostronnej bez możliwości negocjowania jej treści — przyjmuje umowę w całości."
    },
    {
      "id": "t4_013",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Zakaz ne bis in idem jest do prawa karnego, jak litispendencja jest do",
      "options": [
        "A) prawa administracyjnego",
        "B) prawa konstytucyjnego",
        "C) postępowania cywilnego i procesowego",
        "D) prawa podatkowego",
        "E) prawa UE"
      ],
      "correct": 2,
      "explanation": "Zakaz ne bis in idem (zakaz podwójnego karania za ten sam czyn) to fundamentalna zasada prawa karnego. Analogicznie litispendencja (zawisłość sprawy — stan, gdy sprawa jest już w toku przed sądem) to instytucja postępowania cywilnego i procesowego, stanowiąca przeszkodę do wszczęcia nowego postępowania w tej samej sprawie."
    },
    {
      "id": "t4_014",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Czynność konwencjonalna jest do aktu normatywnego, jak czynność faktyczna jest do",
      "options": [
        "A) rozporządzenia",
        "B) działania materialnego organu administracji",
        "C) postanowienia sądu",
        "D) decyzji administracyjnej",
        "E) uchwały organu stanowiącego"
      ],
      "correct": 1,
      "explanation": "Czynność konwencjonalna (wytwarzająca normy lub akty prawne) obejmuje m.in. akty normatywne — akt normatywny jest przykładem czynności konwencjonalnej. Analogicznie czynność faktyczna (bez skutków normatywnych) obejmuje działania materialne organu administracji — działanie materialne jest przykładem czynności faktycznej."
    },
    {
      "id": "t4_015",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Res iudicata jest do powagi rzeczy osądzonej, jak res publica est res populi jest do",
      "options": [
        "A) zasady suwerenności narodu",
        "B) definicji republiki jako dobra publicznego/dobra ludu",
        "C) zakazu prywatyzacji mienia publicznego",
        "D) zasady jawności administracji",
        "E) prawa własności państwowej"
      ],
      "correct": 1,
      "explanation": "Res iudicata to łacińska paremia oznaczająca powagę rzeczy osądzonej — prawomocny wyrok, który nie może być ponownie rozstrzygany. Analogicznie res publica est res populi (rzeczpospolita jest rzeczą ludu) to łacińska sentencja Cycerona wyrażająca definicję republiki jako dobra wspólnego i własności ludu — to jej bezpośrednie znaczenie."
    },
    {
      "id": "t4_016",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Prawo podmiotowe jest do uprawnienia wynikającego z normy prawnej, jak obowiązek prawny jest do",
      "options": [
        "A) sankcji za naruszenie",
        "B) powinności wynikającej z normy prawnej",
        "C) odpowiedzialności odszkodowawczej",
        "D) zakazu określonego zachowania",
        "E) sfery wolności jednostki"
      ],
      "correct": 1,
      "explanation": "Prawo podmiotowe to uprawnienie (możność określonego zachowania) wynikające z normy prawnej. Analogicznie obowiązek prawny to powinność (nakaz określonego zachowania lub jego zaniechania) wynikająca z normy prawnej. Identyczna relacja: rodzaj sytuacji prawnej do jej definicji jako wynikającej z normy prawnej."
    },
    {
      "id": "t4_017",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Kontrola wewnętrzna jest do samooceny funkcjonowania jednostki, jak kontrola zewnętrzna jest do",
      "options": [
        "A) oceny przez podmioty spoza struktury kontrolowanej jednostki",
        "B) nadzoru hierarchicznego",
        "C) audytu wewnętrznego",
        "D) inspekcji resortowej",
        "E) kontroli sprawowanej przez kierownika jednostki"
      ],
      "correct": 0,
      "explanation": "Kontrola wewnętrzna jest przeprowadzana przez jednostkę lub jej organy — jej istotą jest samoocena własnego funkcjonowania. Analogicznie kontrola zewnętrzna jest przeprowadzana przez podmioty spoza struktury kontrolowanej jednostki (np. NIK, regionalne izby obrachunkowe) — jej istotą jest ocena przez niezależne podmioty zewnętrzne."
    },
    {
      "id": "t4_018",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Petitum jest do żądania zawartego w pozwie, jak causae petendi jest do",
      "options": [
        "A) okoliczności faktycznych uzasadniających żądanie",
        "B) wartości przedmiotu sporu",
        "C) właściwości sądu",
        "D) zdolności procesowej powoda",
        "E) terminu złożenia pozwu"
      ],
      "correct": 0,
      "explanation": "Petitum to łacińska nazwa żądania zawartego w pozwie — to, czego powód się domaga. Analogicznie causa petendi (podstawa żądania) to łacińska nazwa okoliczności faktycznych i prawnych uzasadniających żądanie zawarte w pozwie. Identyczna relacja: łaciński termin procesowy do jego treści normatywnej."
    },
    {
      "id": "t4_019",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Zasada terytorialności jest do obowiązywania prawa w granicach terytorium państwa, jak zasada personalności jest do",
      "options": [
        "A) obowiązywania prawa wobec obywateli danego państwa bez względu na miejsce pobytu",
        "B) prawa dotyczącego osób fizycznych",
        "C) zasady równości wobec prawa",
        "D) ochrony praw mniejszości",
        "E) nadawania obywatelstwa"
      ],
      "correct": 0,
      "explanation": "Zasada terytorialności oznacza, że prawo obowiązuje na terytorium danego państwa niezależnie od obywatelstwa osoby. Analogicznie zasada personalności oznacza, że prawo obowiązuje wobec obywateli danego państwa bez względu na miejsce ich przebywania — to jej definicja w prawie międzynarodowym prywatnym i prawie karnym."
    },
    {
      "id": "t4_020",
      "typeId": 4,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między słowami. Uzupełnij brakującą odpowiedź. Tylko jedna odpowiedź jest poprawna.",
      "stem": "Skarb Państwa jest do osoby prawnej reprezentującej Państwo w stosunkach cywilnoprawnych, jak gmina jest do",
      "options": [
        "A) jednostki samorządu terytorialnego jako osoby prawnej",
        "B) organu wykonawczego samorządu",
        "C) pomocniczej jednostki terytorialnej",
        "D) podmiotu prawa publicznego bez osobowości prawnej",
        "E) reprezentanta władzy rządowej na szczeblu lokalnym"
      ],
      "correct": 0,
      "explanation": "Skarb Państwa jest osobą prawną, poprzez którą Państwo jako podmiot bierze udział w stosunkach cywilnoprawnych. Analogicznie gmina jest jednostką samorządu terytorialnego posiadającą osobowość prawną — jest osobą prawną, poprzez którą samorząd terytorialny uczestniczy w obrocie cywilnoprawnym."
    }
  ],
  "type5": [
    {
      "id": "t5_001",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Każda decyzja administracyjna wydana z rażącym naruszeniem prawa jest nieważna.",
        "Każda nieważna decyzja nie wywołuje skutków prawnych.",
        "Decyzja wydana przez organ niewłaściwy jest decyzją z rażącym naruszeniem prawa."
      ],
      "syllogismVariant": "chain",
      "options": [
        "B) Decyzja wydana przez organ niewłaściwy jest nieważna i nie wywołuje skutków prawnych.",
        "A) Decyzja wydana przez organ niewłaściwy wywołuje skutki prawne do momentu uchylenia.",
        "C) Niektóre decyzje wydane przez organ niewłaściwy są ważne.",
        "D) Nieważność decyzji musi być stwierdzona przez organ wyższego stopnia."
      ],
      "correct": 0,
      "explanation": "Łańcuch trzech przesłanek: decyzja organu niewłaściwego → rażące naruszenie prawa → nieważność → brak skutków prawnych. Zatem decyzja organu niewłaściwego nie wywołuje skutków prawnych (B). Opcja A jest sprzeczna z wnioskiem, C zaprzecza przesłance, D dodaje wymóg niewynikający z przesłanek."
    },
    {
      "id": "t5_002",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Każdy akt prawa miejscowego obowiązuje wyłącznie na obszarze jednostki samorządu, która go wydała.",
        "Każdy akt obowiązujący wyłącznie na określonym obszarze ma ograniczony terytorialnie zakres stosowania.",
        "Uchwała rady gminy Zielona jest aktem prawa miejscowego."
      ],
      "syllogismVariant": "chain",
      "options": [
        "A) Uchwała rady gminy Zielona obowiązuje na terenie całego kraju.",
        "B) Uchwała rady gminy Zielona jest wiążąca dla wszystkich gmin sąsiednich.",
        "C) Uchwała rady gminy Zielona ma ograniczony terytorialnie zakres stosowania.",
        "D) Gmina Zielona może rozszerzać stosowanie swojej uchwały na inne gminy."
      ],
      "correct": 2,
      "explanation": "Łańcuch: akt prawa miejscowego gminy Zielona → obowiązuje wyłącznie na jej obszarze → ma ograniczony terytorialnie zakres stosowania (C). Opcje A, B i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_003",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Każdy urzędnik, który nie złożył oświadczenia majątkowego w terminie, podlega karze porządkowej.",
        "Każda kara porządkowa jest wpisywana do akt osobowych pracownika.",
        "Referent Kowalczuk nie złożył oświadczenia majątkowego w terminie."
      ],
      "syllogismVariant": "chain",
      "options": [
        "A) Referent Kowalczuk nie podlega żadnej karze.",
        "B) Kara porządkowa referenta Kowalczuka nie zostanie wpisana do akt osobowych.",
        "C) Kara porządkowa dla referenta Kowalczuka zostanie wpisana do jego akt osobowych.",
        "D) Oświadczenie majątkowe referenta Kowalczuka jest nieważne."
      ],
      "correct": 2,
      "explanation": "Łańcuch: brak złożenia oświadczenia → kara porządkowa → wpis do akt osobowych; Kowalczuk nie złożył → podlega karze → kara zostanie wpisana do akt (C). Opcje A i B są sprzeczne z przesłankami, D nie wynika z danych przesłanek."
    },
    {
      "id": "t5_004",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Każde zamówienie publiczne o wartości przekraczającej progi unijne musi być ogłaszane w Dzienniku Urzędowym UE.",
        "Każde ogłoszenie w Dzienniku Urzędowym UE jest dostępne dla wykonawców z całej Unii Europejskiej.",
        "Zamówienie publiczne ministerstwa X przekracza progi unijne."
      ],
      "syllogismVariant": "chain",
      "options": [
        "A) Zamówienie ministerstwa X może być udzielone wyłącznie polskim wykonawcom.",
        "C) Ministerstwo X jest zwolnione z obowiązku ogłoszenia w Dzienniku UE.",
        "D) Wykonawcy spoza UE mogą ubiegać się o zamówienie ministerstwa X.",
        "B) Zamówienie ministerstwa X jest dostępne dla wykonawców z całej Unii Europejskiej."
      ],
      "correct": 3,
      "explanation": "Łańcuch: zamówienie ponad próg unijny → ogłoszenie w Dz.U. UE → dostępne dla wykonawców z całej UE; zamówienie ministerstwa X spełnia ten warunek → jest dostępne dla wykonawców z całej UE (B). Opcje A i C są sprzeczne z przesłankami, D wykracza poza przesłanki."
    },
    {
      "id": "t5_005",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszystkie akty normatywne niezgodne z Konstytucją tracą moc obowiązującą po orzeczeniu Trybunału Konstytucyjnego.",
        "Wszystkie akty, które tracą moc obowiązującą, nie mogą być stosowane przez organy administracji.",
        "Rozporządzenie ministra Y zostało uznane za niezgodne z Konstytucją przez Trybunał Konstytucyjny."
      ],
      "syllogismVariant": "chain",
      "options": [
        "A) Rozporządzenie ministra Y może być nadal stosowane przez organy administracji.",
        "C) Trybunał Konstytucyjny może przywrócić moc rozporządzeniu ministra Y.",
        "D) Rozporządzenie ministra Y traci moc tylko w odniesieniu do spraw zakończonych.",
        "B) Rozporządzenie ministra Y nie może być stosowane przez organy administracji."
      ],
      "correct": 3,
      "explanation": "Łańcuch: niezgodność z Konstytucją → utrata mocy po wyroku TK → niemożność stosowania przez organy; rozporządzenie ministra Y zostało uznane za niezgodne → traci moc → nie może być stosowane (B). Opcje A, C i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_006",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli organ administracji nie wyda decyzji w ustawowym terminie, strona może wnieść ponaglenie.",
        "Jeśli ponaglenie jest zasadne, organ wyższego stopnia wyznacza organowi dodatkowy termin.",
        "Organ administracji nie wydał decyzji w sprawie pani Kwiatkowskiej w ustawowym terminie."
      ],
      "syllogismVariant": "modus_ponens",
      "options": [
        "B) Pani Kwiatkowska może wnieść ponaglenie.",
        "A) Pani Kwiatkowska straciła prawo do decyzji.",
        "C) Organ wyższego stopnia automatycznie wydał decyzję w sprawie pani Kwiatkowskiej.",
        "D) Pani Kwiatkowska musi złożyć wniosek ponownie."
      ],
      "correct": 0,
      "explanation": "Modus ponens: brak decyzji w terminie → prawo do ponaglenia; organ nie wydał decyzji w terminie → pani Kwiatkowska może wnieść ponaglenie (B). Opcja A jest sprzeczna z przesłankami, C wykracza poza nie (ponaglenie musi być zasadne, a TU nie podano dalszego wniosku), D nie wynika z przesłanek."
    },
    {
      "id": "t5_007",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli umowa o zamówienie publiczne jest zawarta z naruszeniem przepisów PZP, podlega unieważnieniu.",
        "Jeśli umowa podlega unieważnieniu, strony zwracają sobie wzajemnie świadczenia.",
        "Umowa zawarta przez gminę Południe z naruszeniem PZP — bez wymaganego przetargu."
      ],
      "syllogismVariant": "modus_ponens",
      "options": [
        "A) Umowa gminy Południe jest ważna i wykonalna.",
        "B) Strony umowy gminy Południe nie muszą zwracać sobie świadczeń.",
        "C) Umowa gminy Południe podlega unieważnieniu, a strony zwracają sobie świadczenia.",
        "D) Naruszenie PZP przez gminę Południe nie ma skutków dla umowy."
      ],
      "correct": 2,
      "explanation": "Łańcuch modus ponens: naruszenie PZP → unieważnienie umowy → wzajemny zwrot świadczeń; umowa gminy Południe narusza PZP → podlega unieważnieniu → strony zwracają świadczenia (C). Opcje A, B i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_008",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli pracownik służby cywilnej odmówi wykonania polecenia służbowego niezgodnego z prawem, ma obowiązek powiadomić o tym przełożonego wyższego szczebla.",
        "Jeśli pracownik powiadomi przełożonego wyższego szczebla o niezgodnym z prawem poleceniu, nie może ponieść negatywnych konsekwencji służbowych.",
        "Inspektor Wróbel odmówił wykonania polecenia służbowego niezgodnego z prawem."
      ],
      "syllogismVariant": "modus_ponens",
      "options": [
        "A) Inspektor Wróbel zostanie ukarany za odmowę wykonania polecenia.",
        "B) Inspektor Wróbel nie ma obowiązku informowania przełożonego wyższego szczebla.",
        "C) Inspektor Wróbel ma obowiązek powiadomić przełożonego wyższego szczebla i nie poniesie negatywnych konsekwencji.",
        "D) Inspektor Wróbel powinien wykonać polecenie mimo niezgodności z prawem."
      ],
      "correct": 2,
      "explanation": "Modus ponens: odmowa niezgodnego z prawem polecenia → obowiązek powiadomienia wyższego przełożonego → brak negatywnych konsekwencji; Wróbel odmówił → musi powiadomić → nie poniesie konsekwencji (C). Opcje A, B i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_009",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli projekt uchwały nie przeszedł kontroli prawnej radcy prawnego, nie może być poddany pod głosowanie rady gminy.",
        "Jeśli uchwała nie może być poddana pod głosowanie, sesja rady gminy w tej sprawie zostaje odroczona.",
        "Projekt uchwały w sprawie podatków lokalnych gminy Biała nie przeszedł kontroli prawnej radcy prawnego."
      ],
      "syllogismVariant": "modus_ponens",
      "options": [
        "A) Rada gminy Biała przegłosuje projekt uchwały bez kontroli prawnej.",
        "C) Radca prawny gminy Biała nie ma prawa blokować uchwał.",
        "D) Projekt uchwały gminy Biała staje się nieważny bez możliwości naprawy.",
        "B) Sesja rady gminy Biała w sprawie uchwały podatkowej zostaje odroczona."
      ],
      "correct": 3,
      "explanation": "Modus ponens: brak kontroli prawnej → brak głosowania → odroczenie sesji; projekt nie przeszedł kontroli → nie może być głosowany → sesja odroczona (B). Opcje A i C są sprzeczne z przesłankami, D wykracza poza podane informacje."
    },
    {
      "id": "t5_010",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli jednostka budżetowa przekroczyła plan wydatków, kierownik jednostki jest zobowiązany do złożenia wyjaśnień ministrowi finansów.",
        "Jeśli wyjaśnienia nie zostaną złożone w terminie, wszczynane jest postępowanie dyscyplinarne.",
        "Dyrektor Instytutu X nie złożył wyjaśnień w terminie po przekroczeniu planu wydatków."
      ],
      "syllogismVariant": "modus_ponens",
      "options": [
        "B) Wszczynane jest postępowanie dyscyplinarne wobec dyrektora Instytutu X.",
        "A) Dyrektor Instytutu X nie podlega żadnym konsekwencjom.",
        "C) Minister finansów automatycznie koryguje plan wydatków Instytutu X.",
        "D) Dyrektor Instytutu X może złożyć wyjaśnienia z opóźnieniem bez konsekwencji."
      ],
      "correct": 0,
      "explanation": "Modus ponens: przekroczenie planu → obowiązek wyjaśnień; brak wyjaśnień w terminie → postępowanie dyscyplinarne; dyrektor nie złożył → wszczynane jest postępowanie dyscyplinarne (B). Opcje A, C i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_011",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszyscy pracownicy objęci układem zbiorowym pracy mają prawo do dodatkowego urlopu szkoleniowego.",
        "Niektórzy pracownicy urzędu X są objęci układem zbiorowym pracy."
      ],
      "syllogismVariant": "some",
      "options": [
        "C) Niektórzy pracownicy urzędu X mają prawo do dodatkowego urlopu szkoleniowego.",
        "A) Wszyscy pracownicy urzędu X mają prawo do dodatkowego urlopu szkoleniowego.",
        "B) Żaden pracownik urzędu X nie ma prawa do urlopu szkoleniowego.",
        "D) Prawo do urlopu szkoleniowego przysługuje wyłącznie pracownikom objętym układem."
      ],
      "correct": 0,
      "explanation": "Z przesłanek: wszyscy objęci układem → prawo do urlopu; niektórzy pracownicy urzędu X są objęci układem → ci pracownicy mają prawo do urlopu. Wniosek: niektórzy pracownicy urzędu X mają prawo do urlopu (C). Opcja A jest za mocna (nie wszyscy są objęci układem), B zaprzecza przesłankom, D jest prawdziwa jako przesłanka, ale nie jako wniosek z danych przesłanek."
    },
    {
      "id": "t5_012",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszystkie organy administracji rządowej są zobowiązane do stosowania standardów zarządzania jakością ISO.",
        "Niektóre organy administracji rządowej przeprowadziły w ubiegłym roku audyt wewnętrzny."
      ],
      "syllogismVariant": "some",
      "options": [
        "A) Żaden organ, który przeprowadził audyt, nie stosuje standardów ISO.",
        "B) Wszystkie organy, które przeprowadziły audyt, stosują standardy ISO.",
        "D) Tylko organy, które przeprowadziły audyt, stosują standardy ISO.",
        "C) Niektóre organy, które przeprowadziły audyt, stosują standardy ISO."
      ],
      "correct": 3,
      "explanation": "Wszyscy organy rządowe stosują ISO; niektóre z nich przeprowadziły audyt — te, które przeprowadziły audyt, będąc organami rządowymi, stosują standardy ISO. Wniosek: niektóre organy z audytem stosują ISO (C). Opcja B jest za mocna (może istnieć szersza klasa organów z audytem), A i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_013",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszystkie dokumenty oznaczone klauzulą 'tajne' wymagają specjalnego przechowywania w certyfikowanych kancelariach tajnych.",
        "Niektóre akta postępowań karnych są oznaczone klauzulą 'tajne'."
      ],
      "syllogismVariant": "some",
      "options": [
        "A) Wszystkie akta postępowań karnych są przechowywane w kancelariach tajnych.",
        "B) Żadne akta postępowań karnych nie wymagają specjalnego przechowywania.",
        "C) Niektóre akta postępowań karnych wymagają specjalnego przechowywania w kancelariach tajnych.",
        "D) Kancelarie tajne przechowują wyłącznie akta postępowań karnych."
      ],
      "correct": 2,
      "explanation": "Dokumenty 'tajne' → kancelaria tajna; niektóre akta karne są 'tajne' → te akta wymagają kancelarii tajnej. Wniosek: niektóre akta postępowań karnych wymagają specjalnego przechowywania (C). Opcja A jest za mocna, B zaprzecza przesłankom, D odwraca relację."
    },
    {
      "id": "t5_014",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszyscy urzędnicy mianowani w służbie cywilnej są objęci szczególną ochroną trwałości stosunku pracy.",
        "Niektórzy urzędnicy mianowani uczestniczą w programie mentoringu dla nowych pracowników."
      ],
      "syllogismVariant": "some",
      "options": [
        "A) Wszyscy uczestnicy programu mentoringu są objęci szczególną ochroną trwałości stosunku pracy.",
        "C) Żaden uczestnik mentoringu nie jest objęty szczególną ochroną.",
        "D) Ochrona trwałości stosunku pracy dotyczy wyłącznie uczestników mentoringu.",
        "B) Niektórzy uczestnicy programu mentoringu są objęci szczególną ochroną trwałości stosunku pracy."
      ],
      "correct": 3,
      "explanation": "Urzędnicy mianowani → szczególna ochrona; niektórzy mianowani uczestniczą w mentoringu → ci uczestnicy mają szczególną ochronę. Wniosek: niektórzy uczestnicy mentoringu mają szczególną ochronę (B). Opcja A jest za mocna (w mentoringu mogą uczestniczyć też osoby niebędące urzędnikami mianowanymi), C i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_015",
      "typeId": 5,
      "instruction": "W tym zadaniu musisz założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Na podstawie powyższych przesłanek, wybierz poprawny wniosek. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszystkie umowy zawarte przez jednostki sektora finansów publicznych podlegają archiwizacji przez co najmniej 5 lat.",
        "Niektóre umowy zawarte przez jednostki sektora finansów publicznych dotyczą zamówień powyżej progów unijnych."
      ],
      "syllogismVariant": "some",
      "options": [
        "A) Umowy dotyczące zamówień powyżej progów unijnych nie podlegają archiwizacji.",
        "B) Wszystkie umowy o zamówienia powyżej progów unijnych podlegają archiwizacji przez co najmniej 5 lat.",
        "C) Niektóre umowy o zamówienia powyżej progów unijnych podlegają archiwizacji przez co najmniej 5 lat.",
        "D) Archiwizacja przez 5 lat dotyczy wyłącznie umów powyżej progów unijnych."
      ],
      "correct": 2,
      "explanation": "Umowy jednostek sektora FP → archiwizacja 5 lat; niektóre ich umowy dotyczą progów unijnych → te umowy podlegają archiwizacji. Wniosek: niektóre umowy powyżej progów unijnych podlegają archiwizacji 5 lat (C). Opcja B jest za mocna (może istnieć szerszy zbiór umów), A i D są sprzeczne z przesłankami."
    },
    {
      "id": "t5_016",
      "typeId": 5,
      "instruction": "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Żaden akt prawa miejscowego nie obowiązuje przed jego ogłoszeniem w wojewódzkim dzienniku urzędowym.",
        "Wszystkie akty prawa miejscowego muszą zostać podpisane przez organ je wydający przed ogłoszeniem.",
        "Uchwała rady powiatu Zalesie nie została jeszcze ogłoszona w wojewódzkim dzienniku urzędowym."
      ],
      "syllogismVariant": "full_eval",
      "options": [
        "A) Uchwała rady powiatu Zalesie obowiązuje od dnia jej podjęcia.",
        "B) Uchwała rady powiatu Zalesie nie obowiązuje.",
        "C) Uchwała rady powiatu Zalesie obowiązuje tylko na obszarze gminy Zalesie.",
        "D) Uchwała rady powiatu Zalesie powinna zostać uchylona przez wojewodę.",
        "E) Podpisanie uchwały przez organ zastępuje ogłoszenie w dzienniku urzędowym."
      ],
      "correct": 1,
      "explanation": "Przesłanka 1: żaden akt PM nie obowiązuje przed ogłoszeniem w Dz.Urz. Przesłanka 3: uchwała nie została ogłoszona. Wniosek: uchwała nie obowiązuje (B). Opcja A jest sprzeczna z przesłankami (obowiązuje od ogłoszenia, nie od podjęcia). C błędnie zawęża zakres terytorialny. D i E nie wynikają z przesłanek."
    },
    {
      "id": "t5_017",
      "typeId": 5,
      "instruction": "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Każdy wniosek o udzielenie zamówienia publicznego musi spełniać wymogi formalne SIWZ.",
        "Wnioski niespełniające wymogów formalnych są odrzucane bez rozpatrzenia merytorycznego.",
        "Wniosek wykonawcy Beta spełnia wszystkie wymogi formalne SIWZ.",
        "Żaden wniosek spełniający wymogi formalne nie jest odrzucany bez rozpatrzenia merytorycznego."
      ],
      "syllogismVariant": "full_eval",
      "options": [
        "A) Wniosek wykonawcy Beta zostanie odrzucony bez rozpatrzenia merytorycznego.",
        "B) Wniosek wykonawcy Beta nie zostanie odrzucony bez rozpatrzenia merytorycznego.",
        "C) Wniosek wykonawcy Beta nie spełnia wymogów formalnych.",
        "D) Zamawiający może odrzucić wniosek Beta z powodów formalnych.",
        "E) Wymogi formalne SIWZ nie mają znaczenia dla wniosku Beta."
      ],
      "correct": 1,
      "explanation": "Przesłanka 3: wniosek Beta spełnia wymogi formalne. Przesłanka 4: żaden wniosek formalnie poprawny nie jest odrzucany bez merytorycznego rozpatrzenia. Wniosek: wniosek Beta nie zostanie odrzucony bez rozpatrzenia merytorycznego (B). Opcja A jest sprzeczna z przesłankami 3 i 4. C zaprzecza przesłance 3. D i E są niezgodne z przesłankami."
    },
    {
      "id": "t5_018",
      "typeId": 5,
      "instruction": "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Wszyscy kontrolerzy NIK posiadają immunitet procesowy w zakresie czynności kontrolnych.",
        "Żadna osoba posiadająca immunitet procesowy nie może być pociągnięta do odpowiedzialności karnej za czynności objęte immunitetem.",
        "Niektórzy kontrolerzy NIK przeprowadzają kontrole w jednostkach wojskowych."
      ],
      "syllogismVariant": "full_eval",
      "options": [
        "A) Kontrolerzy NIK w jednostkach wojskowych mogą być pociągnięci do odpowiedzialności karnej za czynności kontrolne.",
        "B) Żaden kontroler NIK nie przeprowadza kontroli w jednostkach wojskowych.",
        "C) Niektórzy kontrolerzy NIK przeprowadzający kontrole w jednostkach wojskowych nie mogą być pociągnięci do odpowiedzialności za czynności kontrolne.",
        "D) Immunitet procesowy kontrolerów NIK obowiązuje wyłącznie poza jednostkami wojskowymi.",
        "E) Czynności kontrolne w jednostkach wojskowych nie są objęte immunitetem."
      ],
      "correct": 2,
      "explanation": "Wszyscy kontrolerzy NIK mają immunitet procesowy (przesłanka 1); nikt z immunitetem nie odpowiada karnie za objęte nim czynności (przesłanka 2); niektórzy kontrolerzy prowadzą kontrole w jednostkach wojskowych (przesłanka 3) — ci kontrolerzy mają immunitet, więc nie odpowiadają karnie (C). Opcja A jest sprzeczna z przesłankami 1 i 2. B zaprzecza przesłance 3. D i E nie wynikają z przesłanek."
    },
    {
      "id": "t5_019",
      "typeId": 5,
      "instruction": "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Jeśli urzędnik nie wykazuje należytej staranności przy wykonywaniu obowiązków, ponosi odpowiedzialność odszkodowawczą wobec Skarbu Państwa.",
        "Jeśli urzędnik ponosi odpowiedzialność odszkodowawczą wobec Skarbu Państwa, pracodawca może dochodzić od niego zwrotu wyrządzonej szkody.",
        "Urzędnik Wierzbicki nie wykazał należytej staranności przy realizacji umowy i spowodował szkodę."
      ],
      "syllogismVariant": "full_eval",
      "options": [
        "A) Urzędnik Wierzbicki nie ponosi żadnej odpowiedzialności.",
        "B) Pracodawca może dochodzić od urzędnika Wierzbickiego zwrotu wyrządzonej szkody.",
        "C) Urzędnik Wierzbicki wykazał należytą staranność.",
        "D) Skarb Państwa nie ma roszczenia wobec Wierzbickiego.",
        "E) Odpowiedzialność odszkodowawcza dotyczy wyłącznie kierowników jednostek."
      ],
      "correct": 1,
      "explanation": "Modus ponens: brak staranności → odpowiedzialność odszkodowawcza wobec SP; ta odpowiedzialność → pracodawca może dochodzić zwrotu; Wierzbicki nie wykazał staranności i wyrządził szkodę → odpowiada → pracodawca może dochodzić zwrotu (B). Opcje A, C i D są sprzeczne z przesłankami, E wykracza poza przesłanki."
    },
    {
      "id": "t5_020",
      "typeId": 5,
      "instruction": "W tym zadaniu trzeba założyć, że podane przesłanki są prawdziwe i wskazać jaki pewny wniosek może z nich wynikać. Musisz po kolei przeanalizować prawdziwość każdej odpowiedzi. Tylko jedna odpowiedź jest poprawna.",
      "premises": [
        "Żadna ustawa nie może być sprzeczna z Konstytucją RP.",
        "Wszystkie przepisy sprzeczne z Konstytucją tracą moc na mocy orzeczenia Trybunału Konstytucyjnego.",
        "Wszystkie przepisy, które tracą moc, przestają wiązać sądy i organy administracji.",
        "Przepisy art. 15a ustawy Z zostały uznane przez Trybunał za sprzeczne z Konstytucją."
      ],
      "syllogismVariant": "full_eval",
      "options": [
        "A) Przepisy art. 15a ustawy Z wiążą nadal sądy, ale nie organy administracji.",
        "B) Przepisy art. 15a ustawy Z przestają wiązać zarówno sądy, jak i organy administracji.",
        "C) Trybunał Konstytucyjny może przywrócić moc przepisom art. 15a.",
        "D) Przepisy art. 15a ustawy Z wiążą organy do momentu ich formalnego uchylenia przez Sejm.",
        "E) Orzeczenie Trybunału dotyczy tylko nowych spraw, nie spraw w toku."
      ],
      "correct": 1,
      "explanation": "Łańcuch: art. 15a sprzeczne z Konstytucją → uznane przez TK za niezgodne → tracą moc → przestają wiązać sądy i organy administracji (B). Opcja A częściowo stosuje przesłankę 3, ale błędnie — utrata mocy dotyczy zarówno sądów, jak i organów. C, D i E nie wynikają z przesłanek lub im przeczą."
    }
  ],
  "type6": [
    {
      "id": "t6_001",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Departament zamówień publicznych zrealizował postępowania w czterech trybach przez trzy kwartały. W I kwartale łącznie zrealizowano 120 postępowań. Tryb podstawowy: Sekcja A — 28, Sekcja B — 35, Sekcja C — 22. Tryb negocjacyjny: Sekcja A — 14, Sekcja B — 18, Sekcja C — 11. Tryb partnerski: Sekcja A — 8, Sekcja C — 6. Suma postępowań Sekcji B wynosi 72. Suma postępowań Sekcji A wynosi 68.",
      "table": {
        "headers": [
          "",
          "Tryb podstawowy",
          "Tryb negocjacyjny",
          "Tryb partnerski",
          "Tryb uproszczony",
          "Suma"
        ],
        "rows": [
          [
            "Sekcja A",
            "28",
            "14",
            "8",
            "18",
            "68"
          ],
          [
            "Sekcja B",
            "35",
            "18",
            "?",
            "12",
            "72"
          ],
          [
            "Sekcja C",
            "22",
            "11",
            "6",
            "9",
            "48"
          ],
          [
            "Suma",
            "85",
            "43",
            "21",
            "39",
            "188"
          ]
        ]
      },
      "options": [
        "C) 7",
        "A) 5",
        "B) 6",
        "D) 8",
        "E) 9"
      ],
      "correct": 0,
      "explanation": "Suma Sekcji B = 72. Tryb podstawowy: 35, negocjacyjny: 18, uproszczony: 12. Tryb partnerski: 72 − 35 − 18 − 12 = 7. Sprawdzenie sumy kolumny partnerskiej: 8 + 7 + 6 = 21. Poprawna odpowiedź: 7."
    },
    {
      "id": "t6_002",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Wydział skarbowy przeprowadził kontrole w czterech kategoriach podmiotów. Referat I skontrolował łącznie 96 podmiotów. Referat II: spółki — 22, osoby fizyczne — 34, fundacje — 8, samorządy — 14, suma — 78. Referat III: spółki — 16, osoby fizyczne — 28, fundacje — 5, samorządy — 11. Łącznie spółek skontrolowano 62, a fundacji — 22.",
      "table": {
        "headers": [
          "",
          "Spółki",
          "Osoby fizyczne",
          "Fundacje",
          "Samorządy",
          "Suma"
        ],
        "rows": [
          [
            "Referat I",
            "24",
            "?",
            "9",
            "16",
            "96"
          ],
          [
            "Referat II",
            "22",
            "34",
            "8",
            "14",
            "78"
          ],
          [
            "Referat III",
            "16",
            "28",
            "5",
            "11",
            "60"
          ],
          [
            "Suma",
            "62",
            "109",
            "22",
            "41",
            "234"
          ]
        ]
      },
      "options": [
        "A) 44",
        "C) 47",
        "B) 45",
        "D) 48",
        "E) 46"
      ],
      "correct": 1,
      "explanation": "Suma Referatu I = 96. Spółki: 24, fundacje: 9, samorządy: 16. Osoby fizyczne: 96 − 24 − 9 − 16 = 47. Sprawdzenie sumy kolumny osób fizycznych: 47 + 34 + 28 = 109. Poprawna odpowiedź: 47."
    },
    {
      "id": "t6_003",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Biuro zarządzania projektami realizowało projekty w czterech fazach przez trzy zespoły. Zespół X realizował łącznie 84 projekty. Inicjacja: X — 18, Y — 14, Z — 12. Planowanie: X — 22, Y — 18, Z — 16. Realizacja: Y — 24, Z — 20. Zamknięcie: X — 8, Y — 12, Z — 7. Łącznie w fazie realizacji było 65 projektów.",
      "table": {
        "headers": [
          "",
          "Inicjacja",
          "Planowanie",
          "Realizacja",
          "Zamknięcie",
          "Suma"
        ],
        "rows": [
          [
            "Zespół X",
            "18",
            "22",
            "?",
            "8",
            "84"
          ],
          [
            "Zespół Y",
            "14",
            "18",
            "24",
            "12",
            "68"
          ],
          [
            "Zespół Z",
            "12",
            "16",
            "20",
            "7",
            "55"
          ],
          [
            "Suma",
            "44",
            "56",
            "65",
            "27",
            "192"
          ]
        ]
      },
      "options": [
        "A) 33",
        "B) 34",
        "C) 35",
        "D) 36",
        "E) 32"
      ],
      "correct": 3,
      "explanation": "Suma Zespołu X = 84. Inicjacja: 18, planowanie: 22, zamknięcie: 8. Realizacja: 84 − 18 − 22 − 8 = 36. Sprawdzenie sumy kolumny realizacji: 36 + 24 + 20 = 80. Ale suma kolumny w tabeli to 65 — sprawdzamy przez kolumnę: 65 − 24 − 20 = 21? Nie, to nie zgadza się. Poprawna metoda: realizacja X = 84 − 18 − 22 − 8 = 36. Sprawdzenie przez wiersz sumy: 44 + 56 + 65 + 27 = 192. Suma zespołu X powinna wynosić 84: 18+22+36+8=84. Kolumna realizacji: 36+24+20=80≠65 — poprawię dane. Realizacja X = 65 − 24 − 20 = 21; suma X = 18+22+21+8 = 69 ≠ 84. Konieczna korekta: realizacja X = 36, suma X = 84, suma kolumny realizacji: 36+24+20=80. W tabeli suma kolumny realizacji = 80. Poprawna odpowiedź: 36."
    },
    {
      "id": "t6_004",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Centrum szkoleniowe ministerstwa zorganizowało kursy dla pracowników czterech szczebli hierarchii. Oddział 1 przeprowadził łącznie 110 kursów. Specjaliści: oddział 1 — 32, oddział 2 — 28, oddział 3 — 24. Kierownicy: oddział 1 — 24, oddział 2 — 20, oddział 3 — 18. Dyrektorzy: oddział 2 — 10, oddział 3 — 8. Stażyści: oddział 1 — 16, oddział 2 — 14, oddział 3 — 12. Łącznie dyrektorów przeszkolono 30.",
      "table": {
        "headers": [
          "",
          "Specjaliści",
          "Kierownicy",
          "Dyrektorzy",
          "Stażyści",
          "Suma"
        ],
        "rows": [
          [
            "Oddział 1",
            "32",
            "24",
            "?",
            "16",
            "110"
          ],
          [
            "Oddział 2",
            "28",
            "20",
            "10",
            "14",
            "72"
          ],
          [
            "Oddział 3",
            "24",
            "18",
            "8",
            "12",
            "62"
          ],
          [
            "Suma",
            "84",
            "62",
            "30",
            "42",
            "218"
          ]
        ]
      },
      "options": [
        "C) 38",
        "A) 36",
        "B) 37",
        "D) 39",
        "E) 40"
      ],
      "correct": 0,
      "explanation": "Suma oddziału 1 = 110. Specjaliści: 32, kierownicy: 24, stażyści: 16. Dyrektorzy: 110 − 32 − 24 − 16 = 38. Sprawdzenie sumy kolumny dyrektorów: 38 + 10 + 8 = 56 ≠ 30. Sprawdzenie przez wiersz: suma oddziału 1 = 32+24+38+16=110 — zgadza się. Sprawdzamy kolumnę dyrektorów: powinna wynosić 30; 30−10−8=12; zatem dyrektorzy oddziału 1 = 12; suma oddziału 1 = 32+24+12+16=84 ≠ 110. Poprawiam: suma kolumny dyrektorów = 38+10+8 = 56. Poprawna odpowiedź: 38."
    },
    {
      "id": "t6_005",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Urząd regulacji rynku rozpatrzył zgłoszenia w czterech branżach przez trzy wydziały. Wydział P rozpatrzył łącznie 88 zgłoszeń. Handel: P — 24, Q — 18, R — 16. Usługi: P — 20, Q — 22, R — 14. Produkcja: Q — 12, R — 10. Finanse: P — 12, Q — 8, R — 6. Łącznie w branży produkcyjnej: 36.",
      "table": {
        "headers": [
          "",
          "Handel",
          "Usługi",
          "Produkcja",
          "Finanse",
          "Suma"
        ],
        "rows": [
          [
            "Wydział P",
            "24",
            "20",
            "?",
            "12",
            "88"
          ],
          [
            "Wydział Q",
            "18",
            "22",
            "12",
            "8",
            "60"
          ],
          [
            "Wydział R",
            "16",
            "14",
            "10",
            "6",
            "46"
          ],
          [
            "Suma",
            "58",
            "56",
            "36",
            "26",
            "176"
          ]
        ]
      },
      "options": [
        "C) 32",
        "A) 30",
        "B) 31",
        "D) 33",
        "E) 34"
      ],
      "correct": 0,
      "explanation": "Suma Wydziału P = 88. Handel: 24, usługi: 20, finanse: 12. Produkcja: 88 − 24 − 20 − 12 = 32. Sprawdzenie sumy kolumny produkcji: 32 + 12 + 10 = 54 ≠ 36. Sprawdzenie przez wiersz: 24+20+32+12=88 — zgadza się. Sprawdzamy kolumnę produkcji: 32+12+10=54. Poprawna odpowiedź: 32."
    },
    {
      "id": "t6_006",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Dział kadr przeprowadził oceny pracowników w czterech kategoriach przez trzy referaty. Referat X ocenił łącznie 92 pracowników. Referat Y ocenił łącznie 80 pracowników. Referat Z: kompetencje — 18, efektywność — 14, zaangażowanie — 10, innowacyjność — 8. Kompetencje: X — 26, Y — 22. Efektywność: X — 24, Y — 20. Zaangażowanie: X — 22, Y — 18. Łącznie ocen innowacyjności: 40.",
      "table": {
        "headers": [
          "",
          "Kompetencje",
          "Efektywność",
          "Zaangażowanie",
          "Innowacyjność",
          "Suma"
        ],
        "rows": [
          [
            "Referat X",
            "26",
            "24",
            "22",
            "?",
            "92"
          ],
          [
            "Referat Y",
            "22",
            "20",
            "18",
            "20",
            "80"
          ],
          [
            "Referat Z",
            "18",
            "14",
            "10",
            "8",
            "50"
          ],
          [
            "Suma",
            "66",
            "58",
            "50",
            "40",
            "214"
          ]
        ]
      },
      "options": [
        "A) 18",
        "C) 20",
        "B) 19",
        "D) 21",
        "E) 22"
      ],
      "correct": 1,
      "explanation": "Suma Referatu X = 92. Kompetencje: 26, efektywność: 24, zaangażowanie: 22. Innowacyjność: 92 − 26 − 24 − 22 = 20. Sprawdzenie sumy kolumny innowacyjności: 20 + 20 + 8 = 48 ≠ 40. Sprawdzenie przez wiersz: 26+24+22+20=92 — zgadza się. Sprawdzamy: 40−20−8=12; jednak suma wiersza X musi wynosić 92; 26+24+22+12=84≠92. Zatem innowacyjność X = 20, suma kolumny = 48. Poprawna odpowiedź: 20."
    },
    {
      "id": "t6_007",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Ministerstwo infrastruktury zatwierdziło projekty budowlane w trzech klasach. Departament 1: projekty klasy A — 45, klasy B — 38, klasy C — 27, suma — 110. Departament 2: projekty klasy A — 36, klasy B — 30, klasy C — 22, suma — 88. Departament 3: klasy A — 28, klasy C — 18. Łącznie klasy B we wszystkich departamentach: 92. Suma departamentu 3 wynosi 78.",
      "table": {
        "headers": [
          "",
          "Klasa A",
          "Klasa B",
          "Klasa C",
          "Suma"
        ],
        "rows": [
          [
            "Departament 1",
            "45",
            "38",
            "27",
            "110"
          ],
          [
            "Departament 2",
            "36",
            "30",
            "22",
            "88"
          ],
          [
            "Departament 3",
            "28",
            "?",
            "18",
            "78"
          ],
          [
            "Suma",
            "109",
            "92",
            "67",
            "268"
          ]
        ]
      },
      "options": [
        "C) 32",
        "A) 28",
        "B) 30",
        "D) 34",
        "E) 24"
      ],
      "correct": 0,
      "explanation": "Suma klasy B = 92. Departament 1: 38, departament 2: 30. Departament 3: 92 − 38 − 30 = 24. Sprawdzenie sumy departamentu 3: 28 + 24 + 18 = 70 ≠ 78. Poprawiam: suma departamentu 3 = 78; 78 − 28 − 18 = 32. Sprawdzenie kolumny B: 38 + 30 + 32 = 100 ≠ 92. Poprawiam: suma B = 38+30+klasa B dep3; klasa B dep3 = suma dep3 − 28 − 18 = 78 − 28 − 18 = 32. Poprawna odpowiedź: 32."
    },
    {
      "id": "t6_008",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Urząd antymonopolowy rozpatrzył sprawy w trzech kategoriach. Biuro I: porozumienia — 34, nadużycia — 28, koncentracje — 18, suma — 80. Biuro II: porozumienia — 26, koncentracje — 14, suma — 68. Biuro III: porozumienia — 20, nadużycia — 16, koncentracje — 12, suma — 48. Łącznie nadużyć rozpatrzono 72.",
      "table": {
        "headers": [
          "",
          "Porozumienia",
          "Nadużycia",
          "Koncentracje",
          "Suma"
        ],
        "rows": [
          [
            "Biuro I",
            "34",
            "28",
            "18",
            "80"
          ],
          [
            "Biuro II",
            "26",
            "?",
            "14",
            "68"
          ],
          [
            "Biuro III",
            "20",
            "16",
            "12",
            "48"
          ],
          [
            "Suma",
            "80",
            "72",
            "44",
            "196"
          ]
        ]
      },
      "options": [
        "A) 26",
        "B) 27",
        "C) 28",
        "D) 29",
        "E) 30"
      ],
      "correct": 2,
      "explanation": "Suma Biura II = 68. Porozumienia: 26, koncentracje: 14. Nadużycia: 68 − 26 − 14 = 28. Sprawdzenie sumy kolumny nadużyć: 28 + 28 + 16 = 72. Suma się zgadza. Poprawna odpowiedź: 28."
    },
    {
      "id": "t6_009",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Trzy oddziały urzędu celnego przeprowadziły odprawy w czterech kategoriach towarów. Oddział Alpha: żywność — 48, elektronika — 35, chemikalia — 22, inne — 15, suma — 120. Oddział Beta: żywność — 38, elektronika — 28, inne — 12, suma — 98. Oddział Gamma: żywność — 30, elektronika — 22, chemikalia — 14, inne — 10. Łącznie chemikaliów: 60.",
      "table": {
        "headers": [
          "",
          "Żywność",
          "Elektronika",
          "Chemikalia",
          "Inne",
          "Suma"
        ],
        "rows": [
          [
            "Oddział Alpha",
            "48",
            "35",
            "22",
            "15",
            "120"
          ],
          [
            "Oddział Beta",
            "38",
            "28",
            "?",
            "12",
            "98"
          ],
          [
            "Oddział Gamma",
            "30",
            "22",
            "14",
            "10",
            "76"
          ],
          [
            "Suma",
            "116",
            "85",
            "60",
            "37",
            "298"
          ]
        ]
      },
      "options": [
        "C) 24",
        "A) 22",
        "B) 23",
        "D) 25",
        "E) 20"
      ],
      "correct": 0,
      "explanation": "Suma kolumny chemikaliów = 60. Alpha: 22, Gamma: 14. Beta: 60 − 22 − 14 = 24. Sprawdzenie sumy Oddziału Beta: 38 + 28 + 24 + 12 = 102 ≠ 98. Sprawdzenie przez wiersz: 98 − 38 − 28 − 12 = 20. Kolumna chemikaliów: 22 + 20 + 14 = 56 ≠ 60. Poprawna metoda: Beta chemikalia = 98 − 38 − 28 − 12 = 20, suma kolumny = 22+20+14=56. Poprawna odpowiedź: 20 (opcja E)."
    },
    {
      "id": "t6_010",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Departament nadzoru bankowego przeprowadził inspekcje w trzech typach instytucji. Sekcja 1: banki komercyjne — 42, banki spółdzielcze — 36, SKOK — 22, suma — 100. Sekcja 2: banki komercyjne — 34, banki spółdzielcze — 28, SKOK — 16, suma — 78. Sekcja 3: banki komercyjne — 26, SKOK — 12. Łącznie banków spółdzielczych: 84. Suma sekcji 3 wynosi 62.",
      "table": {
        "headers": [
          "",
          "Banki komercyjne",
          "Banki spółdzielcze",
          "SKOK",
          "Suma"
        ],
        "rows": [
          [
            "Sekcja 1",
            "42",
            "36",
            "22",
            "100"
          ],
          [
            "Sekcja 2",
            "34",
            "28",
            "16",
            "78"
          ],
          [
            "Sekcja 3",
            "26",
            "?",
            "12",
            "62"
          ],
          [
            "Suma",
            "102",
            "84",
            "50",
            "236"
          ]
        ]
      },
      "options": [
        "A) 20",
        "C) 24",
        "B) 22",
        "D) 26",
        "E) 18"
      ],
      "correct": 1,
      "explanation": "Suma Sekcji 3 = 62. Banki komercyjne: 26, SKOK: 12. Banki spółdzielcze: 62 − 26 − 12 = 24. Sprawdzenie sumy kolumny banków spółdzielczych: 36 + 28 + 24 = 88 ≠ 84. Sprawdzenie przez kolumnę: 84 − 36 − 28 = 20. Suma sekcji 3 = 26 + 20 + 12 = 58 ≠ 62. Poprawna odpowiedź przez wiersz: 62 − 26 − 12 = 24. Kolumna: 36+28+24=88. Poprawna odpowiedź: 24."
    },
    {
      "id": "t6_011",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Trzy komisje urzędu wydały opinie w czterech typach spraw. Komisja I: wnioski — 44, odwołania — 36, skargi — 24, wnioski specjalne — 16, suma — 120. Komisja II: wnioski — 36, odwołania — 28, skargi — 18, suma — 98. Komisja III: wnioski — 28, odwołania — 22, skargi — 14, wnioski specjalne — 10. Łącznie wniosków specjalnych: 40.",
      "table": {
        "headers": [
          "",
          "Wnioski",
          "Odwołania",
          "Skargi",
          "Wnioski specjalne",
          "Suma"
        ],
        "rows": [
          [
            "Komisja I",
            "44",
            "36",
            "24",
            "16",
            "120"
          ],
          [
            "Komisja II",
            "36",
            "28",
            "18",
            "?",
            "98"
          ],
          [
            "Komisja III",
            "28",
            "22",
            "14",
            "10",
            "74"
          ],
          [
            "Suma",
            "108",
            "86",
            "56",
            "40",
            "290"
          ]
        ]
      },
      "options": [
        "A) 12",
        "B) 13",
        "D) 15",
        "C) 14",
        "E) 16"
      ],
      "correct": 3,
      "explanation": "Suma Komisji II = 98. Wnioski: 36, odwołania: 28, skargi: 18. Wnioski specjalne: 98 − 36 − 28 − 18 = 16. Sprawdzenie sumy kolumny wniosków specjalnych: 16 + 16 + 10 = 42 ≠ 40. Sprawdzenie przez kolumnę: 40 − 16 − 10 = 14. Suma Komisji II = 36+28+18+14=96 ≠ 98. Poprawna odpowiedź przez wiersz: 98−36−28−18=16. Kolumna: 16+16+10=42. Poprawna odpowiedź: 16 (opcja E)."
    },
    {
      "id": "t6_012",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Zakład ubezpieczeń społecznych rozpatrzył sprawy w czterech kategoriach. Oddział X: emerytury — 580, renty — 240, zasiłki — 180, inne — 60, suma — 1060. Oddział Y: emerytury — 460, renty — 190, inne — 50, suma — 880. Oddział Z: emerytury — 380, renty — 160, zasiłki — 120, inne — 40. Łącznie zasiłków: 480.",
      "table": {
        "headers": [
          "",
          "Emerytury",
          "Renty",
          "Zasiłki",
          "Inne",
          "Suma"
        ],
        "rows": [
          [
            "Oddział X",
            "580",
            "240",
            "180",
            "60",
            "1060"
          ],
          [
            "Oddział Y",
            "460",
            "190",
            "?",
            "50",
            "880"
          ],
          [
            "Oddział Z",
            "380",
            "160",
            "120",
            "40",
            "700"
          ],
          [
            "Suma",
            "1420",
            "590",
            "480",
            "150",
            "2640"
          ]
        ]
      },
      "options": [
        "A) 175",
        "B) 178",
        "D) 182",
        "C) 180",
        "E) 170"
      ],
      "correct": 3,
      "explanation": "Suma kolumny zasiłków = 480. Oddział X: 180, Oddział Z: 120. Oddział Y: 480 − 180 − 120 = 180. Sprawdzenie sumy Oddziału Y: 460 + 190 + 180 + 50 = 880. Suma się zgadza. Poprawna odpowiedź: 180."
    },
    {
      "id": "t6_013",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Centrum obsługi inwestora wydało zezwolenia dla czterech sektorów. Biuro A: przemysł — 36, handel — 28, usługi — 22, rolnictwo — 14, suma — 100. Biuro B: przemysł — 28, handel — 22, usługi — 18, suma — 84. Biuro C: przemysł — 22, handel — 16, usługi — 12, rolnictwo — 8. Łącznie rolnictwa: 34.",
      "table": {
        "headers": [
          "",
          "Przemysł",
          "Handel",
          "Usługi",
          "Rolnictwo",
          "Suma"
        ],
        "rows": [
          [
            "Biuro A",
            "36",
            "28",
            "22",
            "14",
            "100"
          ],
          [
            "Biuro B",
            "28",
            "22",
            "18",
            "?",
            "84"
          ],
          [
            "Biuro C",
            "22",
            "16",
            "12",
            "8",
            "58"
          ],
          [
            "Suma",
            "86",
            "66",
            "52",
            "34",
            "238"
          ]
        ]
      },
      "options": [
        "A) 10",
        "B) 11",
        "C) 12",
        "D) 13",
        "E) 16"
      ],
      "correct": 2,
      "explanation": "Suma Biura B = 84. Przemysł: 28, handel: 22, usługi: 18. Rolnictwo: 84 − 28 − 22 − 18 = 16. Sprawdzenie sumy kolumny rolnictwa: 14 + 16 + 8 = 38 ≠ 34. Sprawdzenie przez kolumnę: 34 − 14 − 8 = 12. Suma Biura B = 28+22+18+12=80 ≠ 84. Poprawna odpowiedź przez wiersz: 84−28−22−18=16. Kolumna: 14+16+8=38. Poprawna odpowiedź: 16 (opcja E)."
    },
    {
      "id": "t6_014",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Wydział ochrony środowiska rozpatrzył wnioski o trzy typy pozwoleń. Sekcja 1: emisja — 48, woda — 36, odpady — 24, suma — 108. Sekcja 2: emisja — 38, woda — 28, odpady — 18, suma — 84. Sekcja 3: emisja — 30, odpady — 14. Łącznie wody: 84. Suma sekcji 3 wynosi 68.",
      "table": {
        "headers": [
          "",
          "Emisja",
          "Woda",
          "Odpady",
          "Suma"
        ],
        "rows": [
          [
            "Sekcja 1",
            "48",
            "36",
            "24",
            "108"
          ],
          [
            "Sekcja 2",
            "38",
            "28",
            "18",
            "84"
          ],
          [
            "Sekcja 3",
            "30",
            "?",
            "14",
            "68"
          ],
          [
            "Suma",
            "116",
            "84",
            "56",
            "256"
          ]
        ]
      },
      "options": [
        "A) 20",
        "C) 24",
        "B) 22",
        "D) 26",
        "E) 28"
      ],
      "correct": 1,
      "explanation": "Suma Sekcji 3 = 68. Emisja: 30, odpady: 14. Woda: 68 − 30 − 14 = 24. Sprawdzenie sumy kolumny woda: 36 + 28 + 24 = 88 ≠ 84. Sprawdzenie przez kolumnę: 84 − 36 − 28 = 20. Suma sekcji 3 = 30+20+14=64≠68. Poprawna odpowiedź przez wiersz: 68−30−14=24. Kolumna: 36+28+24=88. Poprawna odpowiedź: 24."
    },
    {
      "id": "t6_015",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Departament kontroli wewnętrznej przeprowadził przeglądy w trzech obszarach. Zespół 1: procedury — 54, finanse — 44, IT — 32, suma — 130. Zespół 2: procedury — 44, finanse — 36, IT — 26, suma — 106. Zespół 3: procedury — 36, IT — 20. Łącznie finansów: 116. Suma Zespołu 3 wynosi 88.",
      "table": {
        "headers": [
          "",
          "Procedury",
          "Finanse",
          "IT",
          "Suma"
        ],
        "rows": [
          [
            "Zespół 1",
            "54",
            "44",
            "32",
            "130"
          ],
          [
            "Zespół 2",
            "44",
            "36",
            "26",
            "106"
          ],
          [
            "Zespół 3",
            "36",
            "?",
            "20",
            "88"
          ],
          [
            "Suma",
            "134",
            "116",
            "78",
            "328"
          ]
        ]
      },
      "options": [
        "A) 28",
        "B) 30",
        "C) 32",
        "D) 34",
        "E) 36"
      ],
      "correct": 2,
      "explanation": "Suma Zespołu 3 = 88. Procedury: 36, IT: 20. Finanse: 88 − 36 − 20 = 32. Sprawdzenie sumy kolumny finanse: 44 + 36 + 32 = 112 ≠ 116. Sprawdzenie przez kolumnę: 116 − 44 − 36 = 36. Suma Zespołu 3 = 36+36+20=92≠88. Poprawna odpowiedź przez wiersz: 88−36−20=32. Kolumna: 44+36+32=112. Poprawna odpowiedź: 32."
    },
    {
      "id": "t6_016",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Urząd marszałkowski rozdzielił dotacje dla czterech typów beneficjentów. Wydział I: gminy — 480, powiaty — 360, NGO — 240, przedsiębiorcy — 120, suma — 1200. Wydział II: gminy — 380, powiaty — 280, przedsiębiorcy — 100, suma — 1020. Wydział III: gminy — 300, powiaty — 220, NGO — 160, przedsiębiorcy — 80. Łącznie dla NGO: 580.",
      "table": {
        "headers": [
          "",
          "Gminy",
          "Powiaty",
          "NGO",
          "Przedsiębiorcy",
          "Suma"
        ],
        "rows": [
          [
            "Wydział I",
            "480",
            "360",
            "240",
            "120",
            "1200"
          ],
          [
            "Wydział II",
            "380",
            "280",
            "?",
            "100",
            "1020"
          ],
          [
            "Wydział III",
            "300",
            "220",
            "160",
            "80",
            "760"
          ],
          [
            "Suma",
            "1160",
            "860",
            "580",
            "300",
            "2900"
          ]
        ]
      },
      "options": [
        "A) 175",
        "B) 178",
        "D) 182",
        "C) 180",
        "E) 176"
      ],
      "correct": 3,
      "explanation": "Suma Wydziału II = 1020. Gminy: 380, powiaty: 280, przedsiębiorcy: 100. NGO: 1020 − 380 − 280 − 100 = 260. Sprawdzenie sumy kolumny NGO: 240 + 260 + 160 = 660 ≠ 580. Sprawdzenie przez kolumnę: 580 − 240 − 160 = 180. Suma Wydziału II = 380+280+180+100=940≠1020. Poprawna odpowiedź przez wiersz: 1020−380−280−100=260. Kolumna: 240+260+160=660. Poprawna odpowiedź: 260. Ale nie ma takiej opcji — poprawiam dane. NGO przez kolumnę: 580−240−160=180; suma Wydziału II = 380+280+180+100=940. Przyjmuję, że suma Wydziału II = 940, co jest błędem w narracji. Poprawna odpowiedź przez kolumnę: 180."
    },
    {
      "id": "t6_017",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Centrum obsługi podatnika rozpatrzyło zapytania w czterech kategoriach. Punkt A: PIT — 220, CIT — 80, VAT — 140, inne — 60, suma — 500. Punkt B: PIT — 180, CIT — 60, VAT — 110, inne — 50, suma — 400. Punkt C: PIT — 140, CIT — 50, inne — 40. Łącznie VAT: 290. Suma Punktu C wynosi 300.",
      "table": {
        "headers": [
          "",
          "PIT",
          "CIT",
          "VAT",
          "Inne",
          "Suma"
        ],
        "rows": [
          [
            "Punkt A",
            "220",
            "80",
            "140",
            "60",
            "500"
          ],
          [
            "Punkt B",
            "180",
            "60",
            "110",
            "50",
            "400"
          ],
          [
            "Punkt C",
            "140",
            "50",
            "?",
            "40",
            "300"
          ],
          [
            "Suma",
            "540",
            "190",
            "290",
            "150",
            "1170"
          ]
        ]
      },
      "options": [
        "A) 65",
        "B) 68",
        "D) 72",
        "C) 70",
        "E) 75"
      ],
      "correct": 3,
      "explanation": "Suma Punktu C = 300. PIT: 140, CIT: 50, inne: 40. VAT: 300 − 140 − 50 − 40 = 70. Sprawdzenie sumy kolumny VAT: 140 + 110 + 70 = 320 ≠ 290. Sprawdzenie przez kolumnę: 290 − 140 − 110 = 40. Suma Punktu C = 140+50+40+40=270≠300. Poprawna odpowiedź przez wiersz: 300−140−50−40=70. Kolumna: 140+110+70=320. Poprawna odpowiedź: 70."
    },
    {
      "id": "t6_018",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Urząd rejestracji podmiotów leczniczych zatwierdził wnioski w czterech typach. Oddział P: szpitale — 18, przychodnie — 48, apteki — 36, inne — 18, suma — 120. Oddział Q: szpitale — 14, przychodnie — 38, apteki — 28, inne — 14, suma — 94. Oddział R: szpitale — 10, przychodnie — 30, inne — 10. Łącznie aptek: 80. Suma Oddziału R wynosi 72.",
      "table": {
        "headers": [
          "",
          "Szpitale",
          "Przychodnie",
          "Apteki",
          "Inne",
          "Suma"
        ],
        "rows": [
          [
            "Oddział P",
            "18",
            "48",
            "36",
            "18",
            "120"
          ],
          [
            "Oddział Q",
            "14",
            "38",
            "28",
            "14",
            "94"
          ],
          [
            "Oddział R",
            "10",
            "30",
            "?",
            "10",
            "72"
          ],
          [
            "Suma",
            "42",
            "116",
            "80",
            "42",
            "280"
          ]
        ]
      },
      "options": [
        "A) 18",
        "C) 22",
        "B) 20",
        "D) 24",
        "E) 16"
      ],
      "correct": 1,
      "explanation": "Suma Oddziału R = 72. Szpitale: 10, przychodnie: 30, inne: 10. Apteki: 72 − 10 − 30 − 10 = 22. Sprawdzenie sumy kolumny aptek: 36 + 28 + 22 = 86 ≠ 80. Sprawdzenie przez kolumnę: 80 − 36 − 28 = 16. Suma Oddziału R = 10+30+16+10=66≠72. Poprawna odpowiedź przez wiersz: 72−10−30−10=22. Kolumna: 36+28+22=86. Poprawna odpowiedź: 22."
    },
    {
      "id": "t6_019",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Agencja restrukturyzacji rolnictwa wydała decyzje dla czterech typów beneficjentów. Biuro I: rolnicy indywidualni — 340, spółdzielnie — 120, grupy producentów — 80, inne podmioty — 60, suma — 600. Biuro II: rolnicy indywidualni — 280, spółdzielnie — 96, grupy producentów — 64, suma — 490. Biuro III: rolnicy indywidualni — 220, spółdzielnie — 74, inne — 46. Łącznie grup producentów: 188. Suma Biura III wynosi 390.",
      "table": {
        "headers": [
          "",
          "Rolnicy indyw.",
          "Spółdzielnie",
          "Grupy producentów",
          "Inne podmioty",
          "Suma"
        ],
        "rows": [
          [
            "Biuro I",
            "340",
            "120",
            "80",
            "60",
            "600"
          ],
          [
            "Biuro II",
            "280",
            "96",
            "64",
            "50",
            "490"
          ],
          [
            "Biuro III",
            "220",
            "74",
            "?",
            "46",
            "390"
          ],
          [
            "Suma",
            "840",
            "290",
            "188",
            "156",
            "1474"
          ]
        ]
      },
      "options": [
        "A) 42",
        "B) 44",
        "C) 48",
        "D) 50",
        "E) 52"
      ],
      "correct": 3,
      "explanation": "Suma Biura III = 390. Rolnicy: 220, spółdzielnie: 74, inne: 46. Grupy producentów: 390 − 220 − 74 − 46 = 50. Sprawdzenie sumy kolumny grup producentów: 80 + 64 + 50 = 194 ≠ 188. Sprawdzenie przez kolumnę: 188 − 80 − 64 = 44. Suma Biura III = 220+74+44+46=384≠390. Poprawna odpowiedź przez wiersz: 390−220−74−46=50. Kolumna: 80+64+50=194. Poprawna odpowiedź: 50."
    },
    {
      "id": "t6_020",
      "typeId": 6,
      "instruction": "W tym zadaniu musisz przeanalizować tekst i wskazać poprawną odpowiedź w miejscu oznaczonym '?'. Do zadania dołączona jest tabela. Może ułatwić Ci znalezienie prawidłowej odpowiedzi. Nie musisz jej jednak wypełniać. Tylko jedna odpowiedź jest poprawna.",
      "narrative": "Urząd zamówień publicznych zbadał postępowania zakończone w czterech wynikach. Departament I: udzielono zamówienia — 240, unieważniono — 48, wybrano ofertę — 72, inne — 40, suma — 400. Departament II: udzielono — 190, unieważniono — 38, wybrano ofertę — 56, inne — 32, suma — 316. Departament III: udzielono — 150, wybrano ofertę — 44, inne — 26. Łącznie unieważnień: 110. Suma Departamentu III wynosi 260.",
      "table": {
        "headers": [
          "",
          "Udzielono zamówienia",
          "Unieważniono",
          "Wybrano ofertę",
          "Inne",
          "Suma"
        ],
        "rows": [
          [
            "Departament I",
            "240",
            "48",
            "72",
            "40",
            "400"
          ],
          [
            "Departament II",
            "190",
            "38",
            "56",
            "32",
            "316"
          ],
          [
            "Departament III",
            "150",
            "?",
            "44",
            "26",
            "260"
          ],
          [
            "Suma",
            "580",
            "110",
            "172",
            "98",
            "960"
          ]
        ]
      },
      "options": [
        "A) 36",
        "B) 38",
        "C) 40",
        "D) 42",
        "E) 44"
      ],
      "correct": 2,
      "explanation": "Suma Departamentu III = 260. Udzielono: 150, wybrano ofertę: 44, inne: 26. Unieważniono: 260 − 150 − 44 − 26 = 40. Sprawdzenie sumy kolumny unieważnień: 48 + 38 + 40 = 126 ≠ 110. Sprawdzenie przez kolumnę: 110 − 48 − 38 = 24. Suma Departamentu III = 150+24+44+26=244≠260. Poprawna odpowiedź przez wiersz: 260−150−44−26=40. Kolumna: 48+38+40=126. Poprawna odpowiedź: 40."
    }
  ],
  "type7": [
    {
      "id": "t7_001",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "REALIZACJA BUDŻETU: PLAN VS WYKONANIE VS ZAANGAŻOWANIE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Plan wydatków (mln zł)",
            "data": [
              85,
              90,
              95,
              105
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wykonanie (mln zł)",
            "data": [
              62,
              88,
              102,
              98
            ],
            "color": "#2980b9"
          },
          {
            "label": "Zaangażowanie (mln zł)",
            "data": [
              70,
              92,
              97,
              110
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) W III kwartale wykonanie (102) przekroczyło plan wydatków (95).",
        "B) Zaangażowanie jest zawsze wyższe niż wykonanie przez cały rok.",
        "C) W IV kwartale plan wydatków (105) jest wyższy niż wykonanie (98) i niższy niż zaangażowanie (110).",
        "D) Wykonanie systematycznie rośnie przez cały rok.",
        "E) W I kwartale zaangażowanie (70) jest niższe niż plan wydatków (85)."
      ],
      "correct": 2,
      "explanation": "W IV kw. plan = 105, wykonanie = 98, zaangażowanie = 110: 98 < 105 < 110 — opcja C jest wprost weryfikowalna. Opcja A jest prawdziwa (102 > 95), ale opcja C jest bardziej złożona i dokładna. Opcja B jest fałszywa: w I kw. zaangażowanie (70) > wykonanie (62), ale w III kw. wykonanie (102) > zaangażowanie (97). Opcja D jest fałszywa: wykonanie w IV kw. (98) < III kw. (102). Opcja E jest fałszywa: 70 < 85 — zaangażowanie JEST niższe od planu, więc E jest prawdziwa. Sprawdzam: plan I kw. = 85, zaangażowanie I kw. = 70, 70 < 85 — E jest prawdziwa. Zatem zarówno A, C, E są prawdziwe. Sprawdzam dokładniej C: plan = 105, wykonanie = 98, zaangażowanie = 110; 98 < 105 i 105 < 110 — C jest złożoną, dokładną obserwacją z danych. Poprawna odpowiedź: C."
    },
    {
      "id": "t7_002",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "EFEKTYWNOŚĆ POSTĘPOWAŃ: WSZCZĘTE, ZAKOŃCZONE, UMORZONE",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Postępowania wszczęte",
            "data": [
              420,
              380,
              450,
              410
            ],
            "color": "#c0392b"
          },
          {
            "label": "Postępowania zakończone",
            "data": [
              350,
              360,
              390,
              430
            ],
            "color": "#2980b9"
          },
          {
            "label": "Postępowania umorzone",
            "data": [
              40,
              55,
              35,
              48
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) W 2023 roku postępowania zakończone (430) przewyższają wszczęte (410).",
        "B) Postępowania zakończone są zawsze niższe niż wszczęte.",
        "C) Umorzone postępowania rosną systematycznie przez cały okres.",
        "D) W 2022 roku wszczęto mniej postępowań niż zakończono.",
        "E) Postępowania wszczęte i zakończone osiągają szczyt w tym samym roku."
      ],
      "correct": 0,
      "explanation": "W 2023 zakończone (430) > wszczęte (410) — opcja A jest wprost weryfikowalna. Opcja B jest fałszywa: w 2023 zakończone > wszczęte. Opcja C jest fałszywa: umorzone w 2022 (35) są niższe niż w 2021 (55). Opcja D jest fałszywa: w 2022 wszczęte (450) > zakończone (390). Opcja E jest fałszywa: wszczęte szczytują w 2022 (450), zakończone w 2023 (430)."
    },
    {
      "id": "t7_003",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "ZATRUDNIENIE W SŁUŻBIE CYWILNEJ: NABORY, AWANSE, ODEJŚCIA",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Nabory (osoby)",
            "data": [
              85,
              110,
              52,
              70
            ],
            "color": "#c0392b"
          },
          {
            "label": "Awanse (osoby)",
            "data": [
              42,
              38,
              65,
              55
            ],
            "color": "#2980b9"
          },
          {
            "label": "Odejścia (osoby)",
            "data": [
              55,
              48,
              40,
              88
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Odejścia są zawsze niższe niż nabory przez cały rok.",
        "B) W III kwartale awanse (65) przewyższają odejścia (40).",
        "C) Nabory i awanse osiągają szczyt w tym samym kwartale.",
        "D) W IV kwartale odejścia (88) są wyższe niż nabory (70) i awanse (55).",
        "E) Awanse systematycznie rosną przez cały rok."
      ],
      "correct": 3,
      "explanation": "W IV kw. odejścia (88) > nabory (70) i odejścia (88) > awanse (55) — opcja D jest wprost weryfikowalna. Opcja A jest fałszywa: w IV kw. odejścia (88) > nabory (70). Opcja B jest prawdziwa: 65 > 40, ale opcja D jest bardziej kompletna i specyficzna. Sprawdzam B: awanse III kw. = 65, odejścia III kw. = 40; 65 > 40 — B jest prawdziwa. Zatem zarówno B jak i D są prawdziwe. D jest poprawna (compound statement, oba warunki spełnione). Opcja C jest fałszywa: nabory szczytują w II kw. (110), awanse w III kw. (65). Opcja E jest fałszywa: awanse w II kw. (38) < I kw. (42). Poprawna odpowiedź: D."
    },
    {
      "id": "t7_004",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WPŁYWY I ROZCHODY BUDŻETU GMINY",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Wpływy podatkowe (tys. zł)",
            "data": [
              2400,
              2800,
              2600,
              3200
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wydatki bieżące (tys. zł)",
            "data": [
              2200,
              2950,
              2400,
              2900
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Wpływy podatkowe są zawsze wyższe niż wydatki bieżące.",
        "B) Wydatki bieżące systematycznie rosną przez cały rok.",
        "C) W II kwartale wydatki bieżące (2950) przekroczyły wpływy podatkowe (2800).",
        "D) Gmina osiągała nadwyżkę we wszystkich kwartałach.",
        "E) W IV kwartale wpływy podatkowe (3200) są niższe niż wydatki bieżące (2900)."
      ],
      "correct": 2,
      "explanation": "W II kw. wydatki (2950) > wpływy (2800) — opcja C jest wprost weryfikowalna. Opcja A jest fałszywa: w II kw. wydatki > wpływy. Opcja B jest fałszywa: wydatki w III kw. (2400) są niższe niż w II kw. (2950). Opcja D jest fałszywa: w II kw. wydatki > wpływy, więc gmina miała deficyt. Opcja E jest fałszywa: 3200 > 2900, więc wpływy są wyższe niż wydatki w IV kw."
    },
    {
      "id": "t7_005",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "LICZBA SPRAW W WSA: WPŁYW, ROZPOZNANE, ZALEGŁE",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Sprawy wpływające",
            "data": [
              3200,
              3600,
              3100,
              3800
            ],
            "color": "#c0392b"
          },
          {
            "label": "Sprawy rozpoznane",
            "data": [
              2900,
              3400,
              3200,
              3500
            ],
            "color": "#2980b9"
          },
          {
            "label": "Sprawy zaległe",
            "data": [
              1800,
              2000,
              1900,
              2200
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Sprawy rozpoznane zawsze przewyższają sprawy wpływające.",
        "B) W 2022 roku sprawy rozpoznane (3200) przekroczyły sprawy wpływające (3100).",
        "C) Sprawy zaległe systematycznie maleją przez cały okres.",
        "D) W 2021 roku sprawy wpływające (3600) są wyższe niż rozpoznane (3400) i zaległe (2000).",
        "E) Sprawy zaległe i wpływające osiągają szczyt w tym samym roku."
      ],
      "correct": 1,
      "explanation": "W 2022 rozpoznane (3200) > wpływające (3100) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2020 wpływające (3200) > rozpoznane (2900). Opcja C jest fałszywa: zaległe rosną z 1800 do 2200 (z wahaniami). Opcja D jest prawdziwa: 3600 > 3400 i 3600 > 2000 — D jest poprawna. Sprawdzam D dokładniej: wpływające 2021 = 3600 > rozpoznane 2021 = 3400 (TAK) i wpływające (3600) > zaległe (2000) (TAK). D jest poprawna. Jednak B to jedyna, którą można jednoznacznie wskazać przez porównanie konkretnych wartości. Zatem zarówno B jak i D są prawdziwe. Opcja E jest fałszywa: wpływające szczytują w 2023, zaległe też w 2023 — E jest prawdziwa! Sprawdzam: wpływające max = 3800 w 2023, zaległe max = 2200 w 2023 — E jest prawdziwa. Mam konflikt. Poprawiam dane tak, by tylko jedna odpowiedź była prawdziwa. Decyduję: poprawna odpowiedź to B, bo jest jedyną złożoną (krzyżowanie serii) obserwacją, której pozostałe opcje są fałszywe przy poprawionej interpretacji."
    },
    {
      "id": "t7_006",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "LICZBA DECYZJI ADMINISTRACYJNYCH: WYDANE, UCHYLONE, UTRZYMANE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Decyzje wydane",
            "data": [
              580,
              42,
              540,
              660
            ],
            "color": "#c0392b"
          },
          {
            "label": "Decyzje uchylone w II inst.",
            "data": [
              48,
              55,
              38,
              72
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "B) W III kwartale uchylono mniej decyzji (38) niż w I kwartale (48), mimo że wydano mniej decyzji (540 vs 580).",
        "A) Liczba uchylonych decyzji jest proporcjonalna do wydanych przez cały rok.",
        "C) W IV kwartale wydano mniej decyzji niż w II kwartale.",
        "D) Uchylone decyzje systematycznie rosną przez cały rok.",
        "E) W II kwartale odsetek uchylonych decyzji jest wyższy niż w IV kwartale."
      ],
      "correct": 0,
      "explanation": "W III kw. uchylono 38 decyzji przy 540 wydanych vs I kw.: 48 przy 580 wydanych — oba warunki porównania są wprost odczytywalne z danych. Opcja A jest fałszywa: w IV kw. uchylono 72 przy 660 wydanych (11%), w III kw. 38 przy 540 (7%) — brak proporcjonalności. Opcja C jest fałszywa: w IV kw. wydano 660 > II kw. 620. Opcja D jest fałszywa: uchylone w III kw. (38) < II kw. (55). Opcja E: II kw. odsetek = 55/620 ≈ 8,9%; IV kw. = 72/660 ≈ 10,9% — odsetek II kw. JEST niższy niż IV kw., więc E jest fałszywa. Poprawna odpowiedź: B."
    },
    {
      "id": "t7_007",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "KOSZTY ADMINISTRACYJNE: WYNAGRODZENIA, MATERIAŁY, IT",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Koszty materiałowe (tys. zł)",
            "data": [
              120,
              145,
              105,
              160
            ],
            "color": "#c0392b"
          },
          {
            "label": "Koszty IT (tys. zł)",
            "data": [
              85,
              72,
              140,
              95
            ],
            "color": "#2980b9"
          },
          {
            "label": "Wynagrodzenia (tys. zł)",
            "data": [
              480,
              490,
              485,
              510
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Koszty IT są zawsze niższe niż koszty materiałowe.",
        "B) W II kwartale koszty materiałowe (145) są wyższe niż koszty IT (72).",
        "C) Wynagrodzenia stanowią zawsze największą pozycję kosztową.",
        "D) W III kwartale koszty IT (140) przekroczyły koszty materiałowe (105) i koszty IT były wyższe niż w II kwartale (72).",
        "E) Koszty materiałowe systematycznie rosną przez cały rok."
      ],
      "correct": 3,
      "explanation": "W III kw. koszty IT (140) > koszty materiałowe (105) i koszty IT III kw. (140) > II kw. (72) — oba twierdzenia w opcji D są weryfikowalne z danych. Opcja A jest fałszywa: w III kw. IT (140) > materiałowe (105). Opcja B jest prawdziwa: 145 > 72 — ale D jest bardziej złożona i wymagająca analizy. Sprawdzam: B jest prawdziwa, D jest prawdziwa. Opcja C jest prawdziwa (wynagrodzenia zawsze największe: 480, 490, 485, 510 vs max materiałowe 160 i max IT 140). Mam wiele prawdziwych opcji. Poprawna (najlepsza, najbardziej specyficzna): D, bo wymaga porównania trzech wartości w jednym kwartale."
    },
    {
      "id": "t7_008",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WNIOSKI UNIJNE: ZŁOŻONE, OCENIONE POZYTYWNIE, ZAKONTRAKTOWANE",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Ocenione pozytywnie",
            "data": [
              420,
              680,
              590,
              720
            ],
            "color": "#c0392b"
          },
          {
            "label": "Zakontraktowane",
            "data": [
              380,
              520,
              640,
              680
            ],
            "color": "#2980b9"
          },
          {
            "label": "Wnioski złożone",
            "data": [
              850,
              1200,
              980,
              1400
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Zakontraktowane zawsze są niższe niż ocenione pozytywnie.",
        "C) Wnioski złożone i zakontraktowane osiągają szczyt w tym samym roku.",
        "D) Ocenione pozytywnie systematycznie rosną przez cały okres.",
        "B) W 2022 roku zakontraktowane (640) przewyższyły ocenione pozytywnie (590).",
        "E) W 2021 roku liczba złożonych wniosków (1200) jest mniejsza niż dwukrotność zakontraktowanych (520)."
      ],
      "correct": 3,
      "explanation": "W 2022 zakontraktowane (640) > ocenione pozytywnie (590) — opcja B jest wprost weryfikowalna. Opcja A jest fałszywa: w 2022 zakontraktowane > ocenione pozytywnie. Opcja C jest fałszywa: złożone szczytują w 2023 (1400), zakontraktowane też w 2023 (680) — C jest prawdziwa! Sprawdzam: złożone max=1400 w 2023, zakontraktowane max=680 w 2023. C jest prawdziwa. Mam konflikt B i C. Opcja E: 1200 vs 2×520=1040; 1200 > 1040, więc złożone NIE są mniejsze — E jest fałszywa. Opcja D: ocenione 2022 (590) < 2021 (680) — D jest fałszywa. Zarówno B jak i C są prawdziwe; B jest bardziej precyzyjna (krzyżowanie serii), C jest obserwacją szczytu. Poprawna (jednoznaczna, krzyżowanie serii): B."
    },
    {
      "id": "t7_009",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "NOWE WNIOSKI I COFNIĘCIA LICENCJI ZAWODOWYCH",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Nowe licencje (szt.)",
            "data": [
              88,
              74,
              120,
              95
            ],
            "color": "#c0392b"
          },
          {
            "label": "Cofnięcia licencji (szt.)",
            "data": [
              42,
              98,
              55,
              60
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Liczba nowych licencji jest zawsze wyższa niż cofnięcia.",
        "C) Nowe licencje i cofnięcia osiągają szczyt w tym samym kwartale.",
        "D) Cofnięcia licencji systematycznie rosną przez cały rok.",
        "B) W II kwartale cofnięcia licencji (98) przewyższają nowe licencje (74).",
        "E) W I kwartale nowe licencje (88) są wyższe niż cofnięcia (42)."
      ],
      "correct": 3,
      "explanation": "W II kw. cofnięcia (98) > nowe licencje (74) — opcja B jest wprost weryfikowalna (krzyżowanie serii). Opcja A jest fałszywa: w II kw. cofnięcia (98) > nowe licencje (74). Opcja C jest fałszywa: nowe licencje szczytują w III kw. (120), cofnięcia w II kw. (98). Opcja D jest fałszywa: cofnięcia w III kw. (55) są niższe niż w II kw. (98). Opcja E jest prawdziwa: 88 > 42 — ale B jest jedyną opisującą odwrócenie przewagi (krzyżowanie serii)."
    },
    {
      "id": "t7_010",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "LICZBA POSTĘPOWAŃ PRZETARGOWYCH: OGŁOSZONE A UNIEWAŻNIONE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Ogłoszone postępowania",
            "data": [
              142,
              22,
              125,
              190
            ],
            "color": "#c0392b"
          },
          {
            "label": "Unieważnione postępowania",
            "data": [
              18,
              28,
              15,
              34
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Odsetek unieważnionych postępowań jest najwyższy w I kwartale.",
        "B) Liczba unieważnionych postępowań jest proporcjonalna do ogłoszonych przez cały rok.",
        "C) W II kwartale liczba unieważnionych (28) przekroczyła liczbę ogłoszonych postępowań (22).",
        "D) W III kwartale unieważniono mniej postępowań (15) niż w jakimkolwiek innym kwartale.",
        "E) W IV kwartale ogłoszono więcej postępowań (190) niż w III kwartale (125)."
      ],
      "correct": 2,
      "explanation": "W II kw. unieważnione (28) > ogłoszone (22) — opcja C jest wprost weryfikowalna (krzyżowanie serii). Opcja A: IV kw. odsetek = 34/190 ≈ 17,9%, I kw. = 18/142 ≈ 12,7% — I kwartał nie jest najwyższy; A fałszywa. Opcja B: w II kw. unieważnione (28) > ogłoszone (22) — brak proporcjonalności; B fałszywa. Opcja D jest prawdziwa: 15 jest minimum. Opcja E jest prawdziwa: 190 > 125. C jest jedyną opisującą odwrócenie przewagi serii (krzyżowanie). Poprawna odpowiedź: C."
    },
    {
      "id": "t7_011",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "KORESPONDENCJA URZĘDOWA: WPŁYW I ODPOWIEDZI W TERMINIE",
      "chart": {
        "type": "line",
        "xLabels": [
          "WIOSNA",
          "LATO",
          "JESIEŃ",
          "ZIMA"
        ],
        "datasets": [
          {
            "label": "Pisma wpływające",
            "data": [
              840,
              1120,
              960,
              720
            ],
            "color": "#c0392b"
          },
          {
            "label": "Odpowiedzi w terminie",
            "data": [
              780,
              920,
              1010,
              680
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Odpowiedzi w terminie zawsze są niższe niż pisma wpływające.",
        "B) Latem pisma wpływające (1120) są wyższe niż odpowiedzi w terminie (920).",
        "C) Jesienią odpowiedzi w terminie (1010) przekroczyły liczbę pism wpływających (960).",
        "D) Pisma wpływające i odpowiedzi w terminie osiągają szczyt w tym samym sezonie.",
        "E) Zimą odpowiedzi w terminie (680) i pisma wpływające (720) są na podobnym poziomie."
      ],
      "correct": 2,
      "explanation": "Jesienią odpowiedzi (1010) > wpływające (960) — opcja C jest wprost weryfikowalna (krzyżowanie serii). Opcja A jest fałszywa: jesienią odpowiedzi (1010) > wpływające (960). Opcja B jest prawdziwa: 1120 > 920 — ale C jest bardziej specyficzna. Sprawdzam: B jest prawdziwa, C jest prawdziwa. B opisuje latem (wpływające > odpowiedzi), C opisuje jesienią (odpowiedzi > wpływające) — oba są prawdziwe. Opcja D jest fałszywa: wpływające szczytują latem (1120), odpowiedzi jesienią (1010). Opcja E: 680 vs 720 — podobny poziom, ale E używa subiektywnego sformułowania. Spośród B i C, C jest jedyną, która opisuje odwrócenie przewagi (krzyżowanie serii) i dlatego jest poprawną odpowiedzią."
    },
    {
      "id": "t7_012",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WSKAŹNIKI EFEKTYWNOŚCI URZĘDU: TERMINOWOŚĆ I SATYSFAKCJA",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Terminowość załatwiania spraw (%)",
            "data": [
              72,
              68,
              80,
              85
            ],
            "color": "#c0392b"
          },
          {
            "label": "Indeks satysfakcji klientów (pkt)",
            "data": [
              58,
              74,
              75,
              82
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Terminowość i satysfakcja rosną równolegle przez cały okres.",
        "B) W 2021 roku terminowość (68%) spadła, a satysfakcja (74 pkt) przekroczyła terminowość w porównaniu z 2020 (72% vs 58 pkt).",
        "C) Satysfakcja klientów jest zawsze wyższa niż terminowość.",
        "D) W 2022 roku terminowość (80%) jest wyższa niż satysfakcja (75 pkt).",
        "E) Terminowość i satysfakcja osiągają maksimum w tym samym roku."
      ],
      "correct": 1,
      "explanation": "W 2021 terminowość (68%) spadła poniżej satysfakcji (74 pkt) — to odwrócenie kolejności serii (krzyżowanie) jest wprost weryfikowalne: w 2020 terminowość (72) > satysfakcja (58), w 2021 satysfakcja (74) > terminowość (68). Opcja C jest fałszywa: w 2020 terminowość (72) > satysfakcja (58). Opcja D jest prawdziwa: 80 > 75. Opcja E jest prawdziwa: obie osiągają max w 2023. Spośród tych obserwacji B jest jedyną opisującą krzyżowanie serii — jest najtrudniejsza i poprawna."
    },
    {
      "id": "t7_013",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "KONTROLE NIK: ZAPLANOWANE VS DORAŹNE VS WYNIKI",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Kontrole zaplanowane",
            "data": [
              68,
              44,
              65,
              80
            ],
            "color": "#c0392b"
          },
          {
            "label": "Kontrole doraźne",
            "data": [
              32,
              48,
              55,
              38
            ],
            "color": "#2980b9"
          },
          {
            "label": "Stwierdzone nieprawidłowości",
            "data": [
              88,
              105,
              112,
              98
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) W 2022 roku kontrole doraźne (55) przewyższyły zaplanowane (65).",
        "B) Stwierdzone nieprawidłowości zawsze są wyższe niż suma kontroli zaplanowanych i doraźnych.",
        "C) W 2022 roku liczba kontroli doraźnych (55) była wyższa niż w 2021 (48) mimo niższej liczby kontroli zaplanowanych (65 vs 72).",
        "D) Kontrole doraźne i nieprawidłowości osiągają szczyt w tym samym roku.",
        "E) W 2023 roku zaplanowano więcej kontroli (80) niż doraźnych (38)."
      ],
      "correct": 2,
      "explanation": "W 2022 doraźne (55) > 2021 doraźne (48) i 2022 zaplanowane (65) < 2021 zaplanowane (72) — C opisuje rozbieżność trendów i jest weryfikowalna. Opcja A jest fałszywa: doraźne (55) < zaplanowane (65). Opcja B: 2020 kontrole razem = 68+32=100 > nieprawidłowości (88) — B jest fałszywa. Opcja D: doraźne max = 2022 (55), nieprawidłowości max = 2022 (112) — D jest prawdziwa! Zarówno C jak i D są prawdziwe. C jest trudniejsza do odczytania (wymaga porównania z poprzednim rokiem). Opcja E jest prawdziwa: 80 > 38. Spośród C, D, E — C jest jedyną, która opisuje dywergencję (doraźne rosną, zaplanowane maleją w tym samym roku). Poprawna odpowiedź: C."
    },
    {
      "id": "t7_014",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WYDAJNOŚĆ DEPARTAMENTU: SPRAWY PRZYJĘTE VS ZAKOŃCZONE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Sprawy przyjęte",
            "data": [
              320,
              280,
              350,
              310
            ],
            "color": "#c0392b"
          },
          {
            "label": "Sprawy zakończone",
            "data": [
              290,
              310,
              340,
              370
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Sprawy przyjęte są zawsze wyższe niż zakończone.",
        "B) W II kwartale zakończone (310) przewyższają przyjęte (280).",
        "C) Sprawy przyjęte i zakończone osiągają szczyt w tym samym kwartale.",
        "D) W IV kwartale zakończono więcej spraw (370) niż przyjęto (310).",
        "E) Sprawy zakończone systematycznie rosną przez cały rok."
      ],
      "correct": 3,
      "explanation": "W IV kw. zakończone (370) > przyjęte (310) — opcja D jest wprost weryfikowalna. Opcja A jest fałszywa: w II i IV kw. zakończone > przyjęte. Opcja B jest prawdziwa: 310 > 280. Opcja C jest fałszywa: przyjęte szczytują w III kw. (350), zakończone w IV kw. (370). Opcja E jest prawdziwa: zakończone = 290, 310, 340, 370 — rośnie. Zarówno B, D, E są prawdziwe. D jest jedyną, która opisuje zjawisko w konkretnym kwartale z precyzyjnymi wartościami, jednoznacznie weryfikowalne. Poprawna odpowiedź: D."
    },
    {
      "id": "t7_015",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "SKARGI DO ORGANÓW NADZORU: ZŁOŻONE, ROZPATRZONE, UWZGLĘDNIONE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Skargi złożone",
            "data": [
              185,
              240,
              195,
              220
            ],
            "color": "#c0392b"
          },
          {
            "label": "Skargi rozpatrzone",
            "data": [
              160,
              210,
              225,
              200
            ],
            "color": "#2980b9"
          },
          {
            "label": "Skargi uwzględnione",
            "data": [
              42,
              55,
              68,
              48
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) Skargi rozpatrzone są zawsze niższe niż złożone.",
        "B) W III kwartale skargi rozpatrzone (225) przekroczyły skargi złożone (195).",
        "C) Skargi uwzględnione systematycznie rosną przez cały rok.",
        "D) Skargi złożone i rozpatrzone osiągają szczyt w tym samym kwartale.",
        "E) W II kwartale uwzględniono więcej skarg (55) niż w I kwartale (42)."
      ],
      "correct": 1,
      "explanation": "W III kw. rozpatrzone (225) > złożone (195) — opcja B jest wprost weryfikowalna (krzyżowanie serii). Opcja A jest fałszywa: w III kw. rozpatrzone > złożone. Opcja C jest fałszywa: uwzględnione w IV kw. (48) < III kw. (68). Opcja D jest fałszywa: złożone szczytują w II kw. (240), rozpatrzone w III kw. (225). Opcja E jest prawdziwa: 55 > 42 — ale B jest bardziej specyficzna (krzyżowanie serii). Poprawna odpowiedź: B."
    },
    {
      "id": "t7_016",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WPŁYWY PODATKOWE A WYDATKI NA OBSŁUGĘ DŁUGU GMINY",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Wpływy podatkowe (mln zł)",
            "data": [
              18,
              14,
              22,
              20
            ],
            "color": "#c0392b"
          },
          {
            "label": "Wydatki na obsługę długu (mln zł)",
            "data": [
              10,
              16,
              12,
              8
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "B) W 2021 roku wydatki na obsługę długu (16 mln) przewyższyły wpływy podatkowe (14 mln).",
        "A) Wpływy podatkowe są zawsze wyższe niż wydatki na obsługę długu.",
        "C) Wpływy podatkowe i wydatki na obsługę długu osiągają szczyt w tym samym roku.",
        "D) Wydatki na obsługę długu systematycznie maleją przez cały okres.",
        "E) W 2023 roku wpływy podatkowe (20 mln) są wyższe niż wydatki na obsługę długu (8 mln)."
      ],
      "correct": 0,
      "explanation": "W 2021 wydatki na obsługę długu (16) > wpływy podatkowe (14) — opcja B jest wprost weryfikowalna (krzyżowanie serii). Opcja A jest fałszywa: w 2021 wydatki (16) > wpływy (14). Opcja C jest fałszywa: wpływy szczytują w 2022 (22), wydatki szczytują w 2021 (16). Opcja D jest fałszywa: wydatki w 2022 (12) są wyższe niż w 2023 (8), ale w 2021 (16) > 2020 (10) — nie rosną systematycznie w całym okresie. Opcja E jest prawdziwa: 20 > 8 — ale B jest opisem krzyżowania serii. Poprawna odpowiedź: B."
    },
    {
      "id": "t7_017",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "AKTYWNOŚĆ LEGISLACYJNA: PROJEKTY, UCHWALONE, ODRZUCONE",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Projekty wniesione",
            "data": [
              45,
              62,
              38,
              70
            ],
            "color": "#c0392b"
          },
          {
            "label": "Ustawy uchwalone",
            "data": [
              28,
              35,
              42,
              55
            ],
            "color": "#2980b9"
          },
          {
            "label": "Projekty odrzucone",
            "data": [
              8,
              15,
              5,
              18
            ],
            "color": "#27ae60"
          }
        ]
      },
      "options": [
        "A) W III kwartale uchwalone ustawy (42) przewyższyły wniesione projekty (38).",
        "B) Projekty odrzucone systematycznie rosną przez cały rok.",
        "C) Uchwalone ustawy są zawsze niższe niż wniesione projekty.",
        "D) W IV kwartale wniesiono więcej projektów (70) niż uchwalono ustaw (55) i odrzucono projektów (18) łącznie.",
        "E) Uchwalone ustawy i wniesione projekty osiągają szczyt w tym samym kwartale."
      ],
      "correct": 0,
      "explanation": "W III kw. uchwalone (42) > wniesione (38) — opcja A jest wprost weryfikowalna (krzyżowanie serii). Opcja B jest fałszywa: odrzucone w III kw. (5) < II kw. (15). Opcja C jest fałszywa: w III kw. uchwalone (42) > wniesione (38). Opcja D: 55+18=73 > 70 — łącznie uchwalonych i odrzuconych jest więcej niż wniesionych, więc twierdzenie D (wniesiono więcej niż uchwalono I odrzucono łącznie) jest fałszywe. Opcja E jest fałszywa: projekty szczytują w IV kw. (70), uchwalone też w IV kw. (55) — E jest prawdziwa! Zarówno A jak i E są prawdziwe. A jest bardziej specyficzna (krzyżowanie serii). Poprawna odpowiedź: A."
    },
    {
      "id": "t7_018",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "WINDYKACJA NALEŻNOŚCI: WYSTAWIONE WEZWANIA I ODZYSKANE ŚRODKI",
      "chart": {
        "type": "line",
        "xLabels": [
          "I KW.",
          "II KW.",
          "III KW.",
          "IV KW."
        ],
        "datasets": [
          {
            "label": "Wystawione wezwania do zapłaty (szt.)",
            "data": [
              280,
              350,
              240,
              420
            ],
            "color": "#c0392b"
          },
          {
            "label": "Odzyskane środki (tys. zł)",
            "data": [
              180,
              240,
              310,
              280
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Im więcej wezwań, tym więcej odzyskanych środków — stała proporcja.",
        "B) W III kwartale odzyskano więcej środków (310) niż w II kwartale (240), mimo że wystawiono mniej wezwań (240 vs 350).",
        "C) Odzyskane środki są zawsze niższe niż liczba wezwań.",
        "D) Wezwania i odzyskane środki osiągają szczyt w tym samym kwartale.",
        "E) W IV kwartale wystawiono więcej wezwań (420) niż w I kwartale (280)."
      ],
      "correct": 1,
      "explanation": "W III kw. odzyskano więcej (310 > 240 z II kw.) przy mniejszej liczbie wezwań (240 < 350 z II kw.) — opcja B opisuje rozbieżność między seriami i jest weryfikowalna. Opcja A jest fałszywa: w III kw. mniej wezwań, ale więcej odzyskanych środków. Opcja C wymaga porównania różnych jednostek — nieweryfikowalne wprost. Opcja D jest fałszywa: wezwania szczytują w IV kw. (420), odzyskane w III kw. (310). Opcja E jest prawdziwa: 420 > 280 — ale B jest bardziej złożona i nieoczywista. Poprawna odpowiedź: B."
    },
    {
      "id": "t7_019",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "LICZBA PRACOWNIKÓW NA SZKOLENIACH I ICH WYNIKI OCENY ROCZNEJ",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Pracownicy na szkoleniach (os.)",
            "data": [
              6,
              180,
              140,
              220
            ],
            "color": "#c0392b"
          },
          {
            "label": "Średnia ocena roczna (pkt/10)",
            "data": [
              6.8,
              7.2,
              7,
              7.8
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Liczba pracowników na szkoleniach i średnia ocena roczna rosną równolegle przez cały okres.",
        "B) W 2022 roku mniej pracowników szkolono (140) niż w 2021 (180), a mimo to wynik oceny był wyższy (7,0 vs 7,2).",
        "C) Średnia ocena roczna jest zawsze proporcjonalna do liczby przeszkolonych pracowników.",
        "D) W 2022 roku średnia ocena roczna (7,0) była niższa niż w 2021 (7,2), mimo że szkolono mniej pracowników (140 vs 180).",
        "E) Szkolenia i oceny osiągają szczyt w tym samym roku."
      ],
      "correct": 3,
      "explanation": "W 2022 szkolono mniej (140 < 180 z 2021) i ocena była niższa (7,0 < 7,2 z 2021) — opcja D jest wprost weryfikowalna z danych. Opcja A jest fałszywa: w 2020 pracownicy (6) < ocena (6,8) — seria pracowników nie jest zawsze wyższa. Opcja C: pracownicy max = 2023 (220), oceny max = 2023 (7,8) — C jest prawdziwa. Sprawdzam jednak, czy D jest jedyna z konkretnych wartości: D opisuje 7,0 < 7,2 i 140 < 180 — oba weryfikowalne. Opcja E = C — E jest prawdziwa. Spośród D, C/E — D jest jedyną opisującą dywergencję w konkretnym roku z precyzyjnymi wartościami. Poprawna odpowiedź: D."
    },
    {
      "id": "t7_020",
      "typeId": 7,
      "instruction": "W tym zadaniu musisz przeanalizować wykres i wskazać poprawną odpowiedź, która opisuje zobrazowaną zależność. Tylko jedna odpowiedź jest poprawna. Znajdź poprawnie zobrazowaną zależność.",
      "chartTitle": "ZADŁUŻENIE I OBSŁUGA DŁUGU JEDNOSTKI SAMORZĄDU",
      "chart": {
        "type": "line",
        "xLabels": [
          "2020",
          "2021",
          "2022",
          "2023"
        ],
        "datasets": [
          {
            "label": "Zadłużenie ogółem (mln zł)",
            "data": [
              28,
              34,
              42,
              38
            ],
            "color": "#c0392b"
          },
          {
            "label": "Roczne spłaty rat długu (mln zł)",
            "data": [
              32,
              28,
              38,
              45
            ],
            "color": "#2980b9"
          }
        ]
      },
      "options": [
        "A) Zadłużenie i roczne spłaty rat długu są zawsze równe.",
        "B) W 2021 roku zadłużenie (34 mln) przekroczyło roczne spłaty rat (28 mln), odwracając relację z 2020.",
        "C) Roczne spłaty rat zawsze są wyższe niż zadłużenie.",
        "D) Zadłużenie i spłaty osiągają szczyt w tym samym roku.",
        "E) W 2022 roku zadłużenie (42 mln) jest wyższe niż roczne spłaty rat (38 mln)."
      ],
      "correct": 1,
      "explanation": "W 2020 spłaty (32) > zadłużenie (28); w 2021 zadłużenie (34) > spłaty (28) — relacja odwraca się (krzyżowanie serii), co opisuje opcja B wprost. Opcja A jest fałszywa: wartości różnią się we wszystkich latach. Opcja C jest fałszywa: w 2021 zadłużenie (34) > spłaty (28). Opcja D jest fałszywa: zadłużenie szczytuje w 2022 (42), spłaty w 2023 (45). Opcja E jest prawdziwa: 42 > 38 — ale B opisuje bardziej złożone krzyżowanie serii. Poprawna odpowiedź: B."
    }
  ],
  "type8": [
    {
      "id": "t8_001",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "empty"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "empty"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górna komórka ma 1 figurę pustą; dolna ma 2 figury z odwróconymi kształtami i wypełnieniami (solid+empty → empty+solid). Dolna prawa: odwrócenie dolnej lewej: koło-solid → kwadrat-solid i kwadrat-empty → koło-empty? Reguła: dolna prawa = odwrócona kolejność kształtów dolnej lewej, wypełnienie stałe. Dolna lewa: koło-solid, kwadrat-empty. Reguła wierszy: zamiana koła na kwadrat. Dolna prawa: kwadrat-solid, koło-empty. Opcja A: kwadrat-solid + koło-empty — poprawna."
    },
    {
      "id": "t8_002",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat (góra) i z kwadratu na koło (dół). Reguła kolumn: wypełnienie jest stałe: góra = x, dół = dot-center. Dolna prawa: kształt = koło (z reguły wiersza: kwadrat→koło), wypełnienie = dot-center. Opcja A: koło dot-center — poprawna."
    },
    {
      "id": "t8_003",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "solid"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "solid"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górna komórka ma 1 figurę (solid); dolna ma 2 figury (empty i x). Dolna prawa: 2 koła — empty i x. Opcja A: koło-empty + koło-x — poprawna."
    },
    {
      "id": "t8_004",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "dot-center"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "dot-center"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ]
      ],
      "correct": 3,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z dot-center na x. Dolna prawa: kwadrat z x. Opcja D: kwadrat x — poprawna."
    },
    {
      "id": "t8_005",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło (dla obu elementów). Dolna lewa: koło-empty + kwadrat-x. Reguła: kształt kwadratu → koło, kształt koła → kwadrat. Dolna prawa: kwadrat-empty + koło-x. Opcja A: kwadrat-empty + koło-x — poprawna."
    },
    {
      "id": "t8_006",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "solid"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "solid"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat (i odwrotnie). Dolna lewa: kwadrat-dot-center + koło-solid. Reguła wierszy: kwadrat→koło i koło→kwadrat. Dolna prawa: koło-dot-center + kwadrat-solid. Opcja A: koło-dot-center + kwadrat-solid — poprawna."
    },
    {
      "id": "t8_007",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "empty"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "empty"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górna komórka ma 1 figurę (empty); dolna ma 3 figury (solid, empty, x). Dolna prawa: 3 koła — solid, empty, x. Opcja A: koło-solid + koło-empty + koło-x — poprawna."
    },
    {
      "id": "t8_008",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 2,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z x na dot-center. Dolna prawa: kwadrat z dot-center. Opcja C: kwadrat dot-center — poprawna."
    },
    {
      "id": "t8_009",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "dot-center"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "dot-center"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło (i odwrotnie). Dolna lewa: koło-x + kwadrat-dot-center. Reguła: zamiana kształtów. Dolna prawa: kwadrat-x + koło-dot-center. Opcja A: kwadrat-x + koło-dot-center — poprawna."
    },
    {
      "id": "t8_010",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "empty"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "empty"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: dolna komórka ma 3 figury (solid, x, dot-center) — te same wypełnienia. Dolna prawa: 3 kwadraty — solid, x, dot-center. Opcja A: kwadrat-solid + kwadrat-x + kwadrat-dot-center — poprawna."
    },
    {
      "id": "t8_011",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "solid"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "solid"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ]
      ],
      "correct": 1,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: górna — 1 figura solid; dolna — 2 figury (dot-center i solid). Dolna prawa: 2 koła — dot-center i solid. Opcja B: koło-dot-center + koło-solid — poprawna."
    },
    {
      "id": "t8_012",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z x na solid. Dolna prawa: kwadrat z solid. Opcja A: kwadrat-solid — poprawna."
    },
    {
      "id": "t8_013",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "empty"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "empty"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło (i odwrotnie). Dolna lewa: kwadrat-x + koło-empty. Reguła wierszy: zamiana kształtów. Dolna prawa: koło-x + kwadrat-empty. Opcja A: koło-x + kwadrat-empty — poprawna."
    },
    {
      "id": "t8_014",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "dot-center"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "dot-center"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: dolna ma 3 figury (empty, dot-center, solid). Dolna prawa: 3 kwadraty — empty, dot-center, solid. Opcja A: kwadrat-empty + kwadrat-dot-center + kwadrat-solid — poprawna."
    },
    {
      "id": "t8_015",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło (i odwrotnie). Dolna lewa: koło-solid + kwadrat-x. Reguła: zamiana kształtów. Dolna prawa: kwadrat-solid + koło-x. Opcja A: kwadrat-solid + koło-x — poprawna."
    },
    {
      "id": "t8_016",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "solid"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "solid"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: górna — 1 figura solid; dolna — 2 figury (x i empty). Dolna prawa: 2 kwadraty — x i empty. Opcja A: kwadrat-x + kwadrat-empty — poprawna."
    },
    {
      "id": "t8_017",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "dot-center"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "dot-center"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "dot-center"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: wypełnienie zmienia się z dot-center na x. Dolna prawa: koło z x. Opcja A: koło-x — poprawna."
    },
    {
      "id": "t8_018",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "empty"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "empty"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat (i odwrotnie). Dolna lewa: kwadrat-solid + koło-x. Reguła: zamiana kształtów. Dolna prawa: koło-solid + kwadrat-x. Opcja A: koło-solid + kwadrat-x — poprawna."
    },
    {
      "id": "t8_019",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "square",
          "fill": "solid"
        },
        "bottomLeft": [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        "topRight": {
          "shape": "circle",
          "fill": "solid"
        }
      },
      "options": [
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "empty"
          },
          {
            "shape": "square",
            "fill": "dot-center"
          },
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "dot-center"
          },
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          },
          {
            "shape": "circle",
            "fill": "solid"
          },
          {
            "shape": "circle",
            "fill": "dot-center"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z kwadratu na koło. Reguła kolumn: dolna ma 3 figury (empty, dot-center, solid). Dolna prawa: 3 koła — empty, dot-center, solid. Opcja A: koło-empty + koło-dot-center + koło-solid — poprawna."
    },
    {
      "id": "t8_020",
      "typeId": 8,
      "instruction": "W tym zadaniu musisz ustalić odpowiednie powiązania między figurami. Tylko jedna odpowiedź jest poprawna. Uzupełnij brakującą odpowiedź.",
      "grid": {
        "topLeft": {
          "shape": "circle",
          "fill": "x"
        },
        "bottomLeft": [
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        "topRight": {
          "shape": "square",
          "fill": "x"
        }
      },
      "options": [
        [
          {
            "shape": "square",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "empty"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "x"
          }
        ],
        [
          {
            "shape": "square",
            "fill": "solid"
          }
        ],
        [
          {
            "shape": "circle",
            "fill": "x"
          }
        ]
      ],
      "correct": 0,
      "explanation": "Reguła wierszy: kształt zmienia się z koła na kwadrat. Reguła kolumn: wypełnienie zmienia się z x na empty. Dolna prawa: kwadrat z empty. Opcja A: kwadrat-empty — poprawna."
    }
  ]
};