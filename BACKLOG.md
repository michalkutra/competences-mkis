# Backlog

## Priorytetyzacja

**Kontekst:** darmowa wersja dla ~700 osób zdających egzamin KSAP (strona live od 2026-06-03, **egzamin 2026-07-04 → ~29 dni**). Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN z wirtualnych kaw jako proxy „ktoś to ceni". Tabela to pełny indeks backlogu — każda pozycja ma sekcję z opisem niżej.

**Soczewka czasowa (refinement 2026-06-05):** zostało ~4 tygodnie do egzaminu. Wygrywają **tanie, szybkie dźwignie** trafiające w cele (feedback, adopcja). Drogie/zależne od danych rzeczy fazujemy lub przesuwamy.

| Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|
| CSAT — zbieranie ocen (Tally, faza 1) | Bez tego nie wiesz CO MYŚLĄ — liczby bez kontekstu nic nie mówią. Zegar feedbacku rusza dopiero gdy embed jest live | ~30–45 min (spec+plan gotowe) | **MUST (następny)** |
| Podziel się wynikiem | Jedyny mechanizm wyjścia poza te 700 osób; tani i wiralny | ~1h | **SHOULD (następny)** |
| Wzmocnienie zgłaszania błędów (Google Form, niezależnie od `mailto`) | Dziś 3 z 4 zgłoszeń nie dotarło — treść feedbacku przecieka; tani fix realnej dziury | mały | **SHOULD** (bump — przeciek feedbacku) |
| Wall testimoniali (CSAT faza 2) | Social proof na Home/About — ale nie ma czego pokazać, póki nie napłyną oceny (zależność danych) | średni | COULD (po napływie ocen z fazy 1) |
| Adaptacyjny dobór wg słabości (per-typ floor+flex; per-pytanie = tryb „Powtórka błędów") | Nauka na błędach przed egzaminem — realna wartość edukacyjna w oknie 4 tyg. | średni | COULD (post-launch) |
| Podgląd pojedynczego pytania (QA) | Szybsza obsługa zgłoszeń błędów bez przeklikiwania sesji | mały | COULD (tooling) |
| Relacje liczbowe / kontekstowe | Pokrywa lukę w typach pytań (feedback recenzenta) | jak generator Typ8 | **BLOCKER** (doprecyzować z recenzentem) |
| Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**Legenda:** MUST = blokuje pełnię wartości launchu · SHOULD = duży zysk, robić wkrótce · COULD = wartościowe, post-launch · BLOCKER = czeka na decyzję/doprecyzowanie · SKIP = świadomie odpuszczone.

> **Trwałość danych (localStorage)** — **rozwiązana, przeniesiona do BACKLOG_DONE.md** (2026-06-05). Obie dźwignie bez backendu wdrożone: PWA install (trwały storage) + export/import JSON (kopia). Pozostałe opcje (File System API / shareable URL / cloud) świadomie skip-tier.

---

## Relacje liczbowe / kontekstowe — nowa grupa pytań (do doprecyzowania)

**Źródło:** feedback testerów (2026-06-03). Recenzent: „brakuje relacji liczbowych czy kontekstowych". Ewelina osobno: sylogizmów mało (→ rozwiązane przez dobór sesji wg blueprintu, patrz BACKLOG_DONE.md).

**Stan obecny:** Typ 6 (zadania numeryczne z tabelą) i Typ 3 (przyczyna-skutek / kontekstowe) już istnieją (po 80 pytań). Ich udział w sesji podniesiono blueprintem egzaminu.

**Hipoteza:** recenzentowi mogło chodzić o **relacje/ciągi liczbowe jako analogie** (np. `2:6 = 5:?`, ciągi liczbowe, proporcje) — klasyczna kategoria testów poznawczych, której **obecnie brak**. Typ 6 to zadania tekstowo-tabelaryczne, nie „relacje liczbowe" w tym sensie.

**Następny krok (BLOCKER):** dopytać autora feedbacku, co dokładnie miał na myśli, zanim zbudujemy nową kategorię:
- czy chodzi o brakujące analogie/ciągi liczbowe (nowy typ pytań + generator + walidacja),
- czy o istniejący Typ 6 (wtedy wystarczy obecna poprawka udziału w sesji).

**Wysiłek:** jeśli nowy typ — porównywalny z generatorem Typ 8 (generate/integrate/validate). Jeśli tylko udział — zrobione.

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

## System oceniania (CSAT) + wall testimoniali

**Status:** zaprojektowane + rozpisany plan (do wdrożenia) — [spec](docs/superpowers/specs/2026-06-03-csat-testimonials-design.md), [plan](docs/superpowers/plans/2026-06-03-csat-testimonials.md). Decyzje: **Tally** (CSAT 1–5 + komentarz + zgoda RODO), trigger na summary po 2. sesji + link „Oceń appkę" w menu, GA `feedback_submitted`. Wall testimoniali: ręczna kuracja → `web/testimonials.js`, render na About (lista) i Home (efekt sticky-reveal z `web/bg.png`). Licznik kaw świadomie poza zakresem (osobna iteracja — kawy na zerze szkodzą social proofowi).

**Refinement 2026-06-05 — fazowanie (ważne):** inicjatywa rozdzielona na dwie fazy z powodu **zależności danych** — wall testimoniali nie ma czego renderować, póki nie napłyną realne oceny:

- **Faza 1 (MUST, następny krok):** sam mechanizm zbierania — embed Tally + trigger na summary (po 2. sesji) + link w menu + GA `feedback_submitted`. To uruchamia „zegar feedbacku". Tania, szybka (~30–45 min), spec+plan gotowe.
- **Faza 2 (COULD, po napływie ocen):** wall testimoniali (kuracja → `web/testimonials.js`, sticky-reveal na Home + lista na About). Wdrażać dopiero gdy w dashboardzie Tally są wartościowe, pozytywne komentarze do kuracji — inaczej budujemy pustą gablotę.

> **Uwaga:** wcześniejszy wiersz w tabeli „NPS/CSAT (Tally) ~30 min" to **ta sama** inicjatywa co ta sekcja (zlikwidowany duplikat). Estymata 30 min dotyczyła tylko fazy 1; pełen zakres (CSAT + wall) jest większy.

Lekki widget do zbierania opinii od użytkowników — bez własnego backendu.

**Wymagania:**
- darmowy plan wystarczy
- łatwy embed (snippet JS lub iframe)
- NPS (0–10) lub CSAT (gwiazdki / emoji)
- opcjonalnie: zapis tekstowej opinii + możliwość wyświetlenia wybranych recenzji publicznie

**Kandydaci (sprawdzone — wybrano Tally):**
- **Tally.so** ⭐ — darmowy formularz CSAT, odpowiedzi w dashboardzie, pełna kontrola nad danymi i wyglądem walla (potrzebne do efektu na Home)
- **Senja** — darmowy plan, publiczny wall gotowy do embed; odrzucone (trudny do zintegrowania z efektem sticky-reveal)
- **Testimonial.to** — podobny profil; odrzucone z tego samego powodu
- **Formbricks** — open-source, self-host lub cloud

**Miejsce wyświetlania:** prompt CSAT na ekranie wyników po sesji (najwyższe zaangażowanie) + link w menu; wall testimoniali na About i Home

---

## Podziel się wynikiem (share score)

Na ekranie wyników dodać przycisk "Podziel się wynikiem", który kopiuje gotową wiadomość do schowka, np.:

> "Zrobiłem 12/15 w trybie egzaminowym! 🎯 [URL]"

- Użyć `navigator.clipboard.writeText()`
- Fallback: `<textarea>` z zaznaczonym tekstem dla starszych przeglądarek
- Jedyny naturalny mechanizm który może wynieść aplikację poza pierwotną grupę docelową

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

## Wzmocnienie zgłaszania błędów — niezależnie od `mailto`

**Status:** wykryte 2026-06-04. `reportQuestion()` ([web/index.html](web/index.html), ~L2137) robi dwie rzeczy: push `error_reported` do `dataLayer` (→ GA4) **oraz** otwiera `mailto:`. Problem: z 4 zgłoszeń tylko 1 dotarło mailem — pozostałe 3 to userzy, którzy kliknęli, ale nie wysłali maila (brak skonfigurowanego klienta / rezygnacja). Treść zgłoszenia z tych 3 przepadła. `question_id` w GA4 jest już czytelny od 2026-06-04 (custom dimensions zarejestrowane → BACKLOG_DONE.md), więc *które* pytanie poznamy — ale opisowy kontekst od usera ginie.

**Pomysł:** dodać kanał zgłoszenia niezależny od klienta poczty, żeby treść nie zależała od „wyślij":
- **Google Form** (prefill `question_id` w URL) — zero backendu, zbiera też opis słowny.
- albo **Formspree / prosty endpoint** (`fetch` POST) — zgłoszenie leci bez opuszczania strony.
- `mailto` można zostawić jako dodatkową opcję.

**Opcjonalnie (na przyszłość):** włączyć **BigQuery export** GA4 (darmowy tier) — surowe parametry wszystkich zdarzeń bez rejestrowania każdego osobno i bez limitu „brak backfillu".

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

