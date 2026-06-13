# Backlog

## Priorytetyzacja

**Kontekst:** darmowa wersja dla zdających egzamin KSAP — **~940 osób** zgłoszonych do egzaminu (cała populacja; wcześniej zakładaliśmy ~700). Post launchowy poszedł jednak tylko na 2 grupy FB (56 + 86, realnie ~90–140 unikalnych), więc dotychczasowy zasięg to ułamek populacji — **wyjście poza grupy FB to główna dźwignia wzrostu** (mechanizm poleceń dowieziony — zob. „Flow satysfakcji + polecenia" w BACKLOG_DONE.md). (strona live od 2026-06-03, **egzamin 2026-07-04 → ~29 dni**). Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN z wirtualnych kaw jako proxy „ktoś to ceni". Tabela to pełny indeks backlogu — każda pozycja ma sekcję z opisem niżej.

**Soczewka czasowa (refinement 2026-06-05):** zostało ~4 tygodnie do egzaminu. Wygrywają **tanie, szybkie dźwignie** trafiające w cele (feedback, adopcja). Drogie/zależne od danych rzeczy fazujemy lub przesuwamy.

| Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|
| Baner zgody na cookies/śledzenie (GDPR) | Strona live śledzi przez GA4 bez zgody (opt-out ukryty w debug) — realna ekspozycja prawna; tani fix | mały (spec gotowy) | **SHOULD** (zgodność prawna) |
| Wall testimoniali (faza 2) | Social proof na Home/About — ale nie ma czego pokazać, póki nie napłyną pozytywne opinie (zależność danych); źródło = maile z Web3Forms | średni | COULD (po napływie opinii z Web3Forms) |
| Adaptacyjny dobór wg słabości (per-typ floor+flex; per-pytanie = tryb „Powtórka błędów") | Nauka na błędach przed egzaminem — realna wartość edukacyjna w oknie 4 tyg. | średni | COULD (post-launch) |
| Pełny egzamin próbny 90/90 (część II) | Najwierniejsza symulacja prawdziwego egzaminu (90 pytań / 90 min) — najmocniejszy feature części II dla zdających | średni | COULD (po integracji cz. II) |
| Odświeżanie treści wrażliwych czasowo (cykl 2027) | Część pytań cz. II poprawna tylko na stan 2026-06 — bez odświeżenia user wkuwa nieaktualne fakty (zaufanie) | średni | COULD (przed cyklem 2027) |
| Podgląd pojedynczego pytania (QA) | Szybsza obsługa zgłoszeń błędów bez przeklikiwania sesji | mały | COULD (tooling) |
| Hub treściowy / GEO (widoczność w Google i AI Overview) | Organic = 3 wizyty od launchu; bez treści nie ma czego cytować. Inwestycja w cykl 2027, nie w ten egzamin | średni | COULD (post-launch, działa na rocznik 2027) |
| Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**Legenda:** MUST = blokuje pełnię wartości launchu · SHOULD = duży zysk, robić wkrótce · COULD = wartościowe, post-launch · BLOCKER = czeka na decyzję/doprecyzowanie · SKIP = świadomie odpuszczone.

> **Trwałość danych (localStorage)** — **rozwiązana, przeniesiona do BACKLOG_DONE.md** (2026-06-05). Obie dźwignie bez backendu wdrożone: PWA install (trwały storage) + export/import JSON (kopia). Pozostałe opcje (File System API / shareable URL / cloud) świadomie skip-tier.

---

## Pełny egzamin próbny 90/90 (część II)

**Kontekst:** prawdziwy egzamin części II to **90 pytań / 90 min, 6 dziedzin, jednokrotny wybór, bez punktów ujemnych**. Integracja cz. II (osobny task, MUST) dowozi tylko sesje po 15 pytań w trybach Nauka/Egzamin — mechanika jak w cz. I. Pełny mock 90/90 jest świadomie poza zakresem integracji (YAGNI, spec §11), ale to **najmocniejszy feature dla zdających** — jedyny sposób, by przećwiczyć kondycję, tempo i kompletny zakres pod presją czasu.

**Priorytet:** COULD, dopiero **po** dowiezieniu integracji cz. II (zależność).

**Zakres (do doprecyzowania w brainstormingu):**
- Tryb „Egzamin próbny" na ekranie setupu cz. II (obok Nauka/Egzamin 15-pytaniowego): 90 pytań, licznik 90 min, rozkład dziedzin wg wag egzaminu (rozkład puli już je odzwierciedla).
- Brak feedbacku per pytanie (jak realny egzamin) — wynik + review dopiero na końcu.
- Reużyć `composeWiedzaSession` z parametrem `size: 90` (czysta funkcja już to wspiera).

**Otwarte pytania:**
- Czy licznik 90 min globalny (jak egzamin), czy nadal 60 s/pytanie? (egzamin = globalny — to istotna różnica wobec obecnego timera per-pytanie).
- Próg zdawalności / prezentacja wyniku (egzamin ma progi punktowe).
- Czy filtr dziedzin/poziomu dostępny, czy mock zawsze pełny przekrój?

---

## Odświeżanie treści wrażliwych czasowo (cykl 2027)

**Kontekst:** część pytań cz. II jest poprawna **tylko na stan 2026-06** (`legalState` w danych). Bez procesu odświeżenia przed kolejnym cyklem egzaminacyjnym user uczy się nieaktualnych faktów — realny problem zaufania do appki dla rocznika 2027.

**Pozycje wrażliwe (z handoffa §5, `docs/superpowers/2026-06-13-handoff-integracja-pytan-wiedza.md`):**
- prokuratura — rozdzielenie urzędów Ministra Sprawiedliwości i Prokuratora Generalnego (reforma w toku),
- kwoty/dane 2026 — płaca minimalna 4806 zł, wydatki budżetu ≈919 mld zł, dzietność ~1,1, mediana wieku ~43, Gini / working poor,
- skład Komisji Europejskiej (kadencja do 2029), członkostwa NATO/UE/strefy euro (Bułgaria w euro od 2026-01),
- mechanizm korekcyjno-wyrównawczy JST (ustawa o dochodach JST z 2024),
- rynek pracy — ustawa z 20.03.2025 (długość zasiłku niezależna od lokalnej stopy bezrobocia).

**Zakres:**
- Przed cyklem 2027 przejść pytania z `legalState: "2026-06"` i zweryfikować/zaktualizować dane + `source`, bumpnąć `legalState`.
- Rozważyć skrypt audytujący (grep po wartościach liczbowych / nazwach instytucji) zamiast ręcznego przeglądu 827 pytań.
- Opcjonalnie: pokazać userowi „stan prawny: 2026-06" w UI (np. w review obok źródła) — drobny sygnał aktualności/zaufania.

**Timing:** poza oknem egzaminu 2026-07-04 (te pytania są poprawne teraz). Zaplanować przed ogłoszeniem postępowania 2027.

---

## Autentykacja przez Google (bramka dostępu)

Przesłonić całą stronę logowaniem przez Google — bez konta brak dostępu.

**Cel:** zebranie maila użytkownika korzystającego ze strony. Nie chodzi o aktywne zapisywanie stanu sesji w bazie.

**Otwarte pytania:**
- Czy da się bez backendu? (np. Firebase Auth / Google Identity Services działają po stronie klienta)

---

## Przycisk powrotu do poprzedniego pytania

Możliwość cofnięcia się do poprzedniego pytania i zmiany odpowiedzi.

- Do ustalenia: tylko tryb Exam, czy oba tryby (Exam + Learning)?

## Wall testimoniali (faza 2 — po napływie opinii)

**Kontekst:** faza 1 (flow satysfakcji + polecenia przez Web3Forms) **dowieziona** — zob. BACKLOG_DONE.md „Flow satysfakcji + polecenia". Pozytywne opinie („Co było najbardziej pomocne?") trafiają teraz mailem przez Web3Forms i stanowią źródło do walla.

Wall testimoniali — ręczna kuracja → `web/testimonials.js`, render na About (lista) i Home (sticky-reveal z `web/bg.png`). Wdrażać dopiero gdy napłyną wartościowe, pozytywne komentarze — inaczej budujemy pustą gablotę.

> Stary spec Tally (`docs/superpowers/specs/2026-06-03-csat-testimonials-design.md`) pozostaje w repo jako historyczny — nie realizujemy go (źródłem opinii są maile Web3Forms, nie dashboard Tally).

---

## Podgląd pojedynczego pytania (strona QA, nielinkowana)

Wewnętrzne narzędzie do szybkiego obejrzenia dowolnego pytania po ID — np. żeby zweryfikować zgłoszenie błędu (jak #h_t8_037), bez przeklikiwania sesji.

**Priorytet:** internal tooling (nie blokuje launchu; przydatne do obsługi feedbacku)

**Zakres:**
- Nigdzie nielinkowana strona/ekran (np. `/podglad` lub `/debug`) — dostępna tylko przez bezpośredni URL
- Pole z autocomplete po ID pytania (640 pozycji z `QUESTIONS_EASY` + `QUESTIONS_HARD`) **lub** ręczne wpisanie ID
- Po wybraniu renderuje pełne pytanie: treść, opcje, **zaznaczona poprawna odpowiedź + `explanation`** (tryb review, nie egzamin)
- Reużyć istniejące renderery z [index.html](web/index.html) (`renderQuestion`, `renderType8`, `renderOptionsStatic`, `renderFigure`) — bez duplikacji logiki

**Otwarte pytania:**
- Routing: nowy ekran w `PATH_TO_SCREEN` / `ROUTING_ENABLED` czy parametr `?id=` na osobnej stronie?
- Czy autocomplete ma pokazywać też typ/poziom obok ID (np. „h_t8_037 — typ 8, hard")?
- Dostęp: „security by obscurity" (sam brak linku) wystarczy, czy ukryć za prostym hasłem/flagą?
- Czy strona ma trafić do `robots.txt` (noindex), żeby nie wpadła do wyszukiwarek?

---

## Hub treściowy / GEO — widoczność w Google i AI Overview

**Kontekst (audyt 2026-06-10):** Google w trybie AI (AI Overview) na zapytanie „egzamin na urzędnika mianowanego" cytuje KSAP, gov.pl, prawo.pl, a w sekcji „Jak się przygotować?" — **Urzednik.Arslege.pl** (slot do zajęcia). Nas nie cytuje, bo AI Overview wybiera strony, które (a) rankują w klasycznych wynikach i (b) mają treść, z której łatwo wyciąć gotową odpowiedź. My nie spełniamy żadnego z warunków: **Organic Search = 3 wizyty od launchu**, strona to SPA renderowana JS-em, jedyne URL-e w sitemap to `/` i `/about` — nie mamy ani jednej strony odpowiadającej na pytania informacyjne.

**Co już jest (higiena, nie dźwignia):** robots.txt z botami AI (GPTBot, Claude, Perplexity…), llms.txt, JSON-LD `WebApplication`, meta/OG, minimalna sitemap.

**Zakres (kolejność wpływu):**

1. **Hub treściowy jako statyczne strony HTML** — np. `/poradnik/` z podstronami odpowiadającymi 1:1 na pytania z AI Overview: „Jak wygląda egzamin (etapy, punktacja)", „Kto może przystąpić", „Jak się przygotować — plan na 4 tygodnie", „Zdawalność i progi punktowe". Na Netlify bez frameworka — dodatkowe pliki .html obok SPA (statyczny HTML > rendering JS-em dla ekstrakcji treści). Format „snippet-ready": nagłówek-pytanie, zwięzła odpowiedź w pierwszym akapicie, rozwinięcie, CTA do aplikacji.
2. **Unikalne dane, których nikt inny nie ma** — najmocniejsza dźwignia cytowalności. 640 pytań + realne statystyki użytkowników → np. „Które typy zadań sprawiają najwięcej trudności — dane z N tys. odpowiedzi", rozkład skuteczności per typ. AI (i media typu prawo.pl) cytują konkretne liczby niedostępne gdzie indziej.
3. **FAQPage schema** na stronie FAQ/poradnika + rozszerzenie sitemap o nowe URL-e + linkowanie wewnętrzne z Home/About.
4. **Wzmianki poza domeną (korroboracja)** — grupy FB są nieindeksowalne. Tanio: odpowiedzi z linkiem na indeksowalnych forach (Wykop, Reddit, fora urzędnicze, LinkedIn-artykuł), wpis gościnny na blogu o służbie cywilnej.
5. **Google Search Console** — brak śladu konfiguracji w repo; jeśli niepodpięta → pierwszy krok (weryfikacja, zgłoszenie sitemap, monitoring fraz).

**Timing:** indeksacja i budowa pozycji to tygodnie–miesiące → **na cykl 2026 (egzamin 2026-07-04) nie zadziała**. Postępowanie kwalifikacyjne jest co roku — strony zbudowane teraz rankują na rocznik 2027, a frazy o egzaminie są wyszukiwane cały rok. Inwestycja w kolejny rocznik.

---

## Baner zgody na cookies/śledzenie (GDPR)

**Status:** zaprojektowane — [spec](docs/superpowers/specs/2026-06-05-cookie-consent-banner-design.md). Plan do napisania. **Nie implementujemy w tej iteracji.**

**Źródło:** analiza zgodności GDPR (2026-06-05). GA4 przez GTM (`GTM-KZ9NMFFK`) ładuje się domyślnie na produkcji ([web/index.html](web/index.html) L991-999), a jedyny opt-out (`ksap_no_track=1`) jest ukryty w trybie debug. Dyrektywa ePrivacy / GDPR wymaga dla analityki zgody **opt-in przed** zapisem cookies i wysłaniem zdarzeń.

**Co wymaga zgody:** tylko GA4/GTM. Funkcjonalny localStorage (`ksap_sessions`, `ksap_settings`, `ksap_answer_log`, `ksap_meta`, `ksap_pwa`) jest „strictly necessary" (dane wyłącznie na urządzeniu, zero backendu) → zgoda niepotrzebna.

**Decyzje (z brainstormingu):**
- Prosty opt-in (Akceptuj / Odrzuć), copy ogólne o cookies/śledzeniu (nie wprost „analityka").
- Stan w localStorage `ksap_consent` = `granted` | `denied`; brak klucza = baner się pokazuje, GTM off.
- Zamknięcie banera (×) bez wyboru → nic nie zapisuje, baner wraca przy następnej wizycie. Akceptacja/odmowa zapamiętana na stałe.
- Baner nieblokujący (dół ekranu) + link „Więcej" rozwijający detale (wymóg informacyjny art. 13).
- Odwrócić logikę GTM: ładuj tylko gdy `ksap_consent==="granted"` i produkcja. `ksap_no_track` zostaje jako twardy kill-switch debug.
- **Poza zakresem:** kategorie zgody, UI zmiany decyzji później, osobna strona polityki prywatności, rezygnacja z GA4 na rzecz cookieless.

---

## Dobór wg słabości — dwa warianty (scalone w jeden wiersz tabeli)

> **Refinement 2026-06-05:** te dwie sekcje to jedna pozycja backlogu o dwóch wariantach. **Główny kierunek = per-typ (floor+flex)** poniżej — opt-in, bez konfliktu z anti-repeat, sygnał stabilizuje się szybko. **Per-pytanie** (ta sekcja) degraduje do osobnego, drobniejszego trybu **„Powtórka błędów"**, nie do domyślnego doboru. Brainstorming zacząć od wariantu per-typ.

### Wariant per-pytanie — „częściej losuj te, na które odpowiedziałem błędnie" (→ tryb „Powtórka błędów")

Wariant/rozszerzenie silnika doboru pytań w `buildSession()` — obok logiki anty-powtórek (least-recently-seen, **wdrożona** — patrz BACKLOG_DONE.md): ważyć losowanie tak, by pytania źle zaliczone w przeszłości pojawiały się częściej (spaced repetition / nauka na błędach).

**Priorytet:** gotowe do brainstormingu — anty-powtórki wdrożone, ten sam silnik i te same dane.

**Kontekst danych:** `ksap_answer_log` w localStorage ma już per odpowiedź pola `qId`, `tid`, `ok` (poprawność) i `ts` — wystarczające, żeby policzyć dla każdego pytania historię trafień/pomyłek bez żadnej nowej infrastruktury.

**Pomysł na mechanikę (do doprecyzowania w brainstormingu):**
- Każdemu pytaniu nadać wagę losowania rosnącą przy błędnych odpowiedziach, malejącą przy serii poprawnych (np. waga ∝ liczba pomyłek; pytanie kilkukrotnie zaliczone poprawnie schodzi do wagi bazowej).
- **Napięcie z anty-powtórkami:** czysty LRS maksymalizuje świeżość (unikaj powtórek), a dobór wg słabości celowo *powtarza* trudne pytania. Trzeba pogodzić — np. tryb przełączany przez użytkownika („nowe pytania" vs „ćwicz błędy"), albo waga = kompromis (świeżość × słabość).
- Rozważyć osobny tryb sesji „Powtórka błędów" zamiast modyfikować domyślny dobór.

**Otwarte pytania:**
- Czy to globalny tryb, czy miks w każdej sesji?
- Jak szybko pytanie „wraca do normy" po poprawnych odpowiedziach (krzywa zapominania)?
- Czy respektować blueprint egzaminu (rozkład typów), czy dobór wg słabości może go naruszać?

---

### Wariant per-typ — adaptacyjny dobór, opcja przy starcie sesji (floor + flex) ⭐ główny kierunek

**Status:** pomysł (2026-06-04), do brainstormingu. Pokrewny do „Dobór pytań wg słabości" powyżej, ale na poziomie **grupy/typu**, nie pojedynczego pytania — i jako **świadomy opt-in**, nie domyślna zmiana.

**Pomysł:** przy starcie nowej sesji checkbox (domyślnie **wyłączony** → zachowanie jak teraz, czysty blueprint). Po zaznaczeniu sesja przechyla dobór ku typom, w których użytkownik ma niższą skuteczność. Wstępna etykieta (do doprecyzowania): *„Dopasuj pytania do moich wyników — częściej losuj z typów, które idą mi słabiej"*.

**Mechanika (floor + flex):**
- Blueprint obecnie rozdaje wszystkie 15 slotów (Typ1=2, Typ2=2, Typ3=2, Typ4=1, Typ5=4, Typ6=2, Typ7=1, Typ8=1), więc „wolnych slotów" nie ma — trzeba je najpierw wykroić.
- **Floor** = gwarantowane minimum na każdy typ (np. 1/typ = 8 slotów), żeby każdy typ wciąż się pojawił i sesja przypominała egzamin.
- **Flex** = pozostałe sloty (np. 7) rozdzielane proporcjonalnie do *słabości* typu (im niższa skuteczność, tym większa waga).
- W obrębie wybranego typu dalej działa anti-repeat (LRS) → ćwiczysz słaby obszar na **świeżych** pytaniach. **Brak konfliktu z anti-repeat** (w odróżnieniu od wariantu per-pytanie powyżej).

**Dlaczego per-typ, nie per-pytanie:** sygnał (skuteczność typu) stabilizuje się szybko (starczy ~3 sesje), jest odporny na szum i komponuje się z anti-repeat. Per-pytanie zostaje jako osobny, drobniejszy wariant / tryb „Powtórka błędów".

**Pułapki do rozwiązania w specu:**
- **Próg danych:** włączać dopiero przy min. ~3 sesjach (wcześniej brak sensownych statystyk → opcja nieaktywna lub działa jak blueprint).
- **Mała próbka na rzadkich typach:** po 3 sesjach Typ5 ma ~12 odpowiedzi, ale Typ7/Typ8 tylko ~3 → skuteczność szumna. Zastosować *shrinkage* ku 50% (Bayes/Laplace) albo próg „min N odpowiedzi, zanim typ dostaje wagę".
- **Czapka na przechył:** limit „+max X slotów na typ", żeby jeden słaby typ nie zjadł całej sesji i została różnorodność.
- **Transparentność (opcjonalnie):** linijka „Dziś więcej z: wnioskowanie, wykresy" — motywuje, ale może pachnieć „dobijaniem"; do przetestowania.

**Kontekst danych:** te same co wyżej — `ksap_answer_log` (`tid` = typ, `ok` = poprawność). Skuteczność per typ = agregacja `ok` po `tid`. Zero nowej infrastruktury.

**Otwarte pytania:**
- Czy opcja dotyczy obu trybów (Egzamin + Nauka), czy w Egzaminie trzymamy czysty blueprint dla wierności symulacji?
- Finalna etykieta i miejsce checkboxa na ekranie setup.
- Wartości floor/flex (8+7? inny podział?) i kształt funkcji wagi (liniowa od skuteczności? odwrotność?).

