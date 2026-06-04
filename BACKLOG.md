# Backlog

## Priorytetyzacja

**Kontekst:** darmowa wersja dla ~700 osób zdających egzamin KSAP (strona live od 2026-06-03, egzamin za ~miesiąc). Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN z wirtualnych kaw jako proxy „ktoś to ceni". Tabela to pełny indeks backlogu — każda pozycja ma sekcję z opisem niżej.

| Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|
| NPS / CSAT (Tally) | Bez tego nie wiesz CO MYŚLĄ — liczby bez kontekstu nic nie mówią | ~30 min | **MUST** |
| Podziel się wynikiem | Jedyny mechanizm wyjścia poza te 700 osób | ~1h | SHOULD |
| PWA install prompt | Powroty mobilnych + odblokowuje trwały storage (patrz „Trwałość danych") | ~2h | SHOULD |
| Relacje liczbowe / kontekstowe | Pokrywa lukę w typach pytań (feedback recenzenta) | jak generator Typ8 | **BLOCKER** (doprecyzować) |
| Podgląd pojedynczego pytania (QA) | Szybsza obsługa zgłoszeń błędów bez przeklikiwania sesji | mały | COULD (tooling) |
| Analityka GA4 przez MCP | Mierzenie adopcji po poście bez klikania w GA | setup | NICE-TO-HAVE |
| Trwałość danych (localStorage) | Realny problem (Ewelina: znika historia) — w dużej mierze łata to PWA | mały–średni | NICE-TO-HAVE |
| Dobór wg słabości (per-pytanie) | Nauka na błędach; rozszerzenie silnika doboru | jak Typ8 | COULD (post-launch) |
| Adaptacyjny dobór wg słabości typów | Opcja „ćwicz słabe typy" przy starcie sesji; nauka | średni | COULD (post-launch) |
| Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**Legenda:** MUST = blokuje pełnię wartości launchu · SHOULD = duży zysk, robić wkrótce · COULD = wartościowe, post-launch · NICE-TO-HAVE = miłe, nie pilne · BLOCKER = czeka na decyzję/doprecyzowanie · SKIP = świadomie odpuszczone.

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

## Zainstaluj aplikację (PWA install prompt)

Dodać przycisk "Zainstaluj aplikację" na ekranie głównym:

- **Android**: przechwycić `beforeinstallprompt`, podpiąć pod przycisk → natywny dialog instalacji
- **iOS**: pokazać modal z instrukcją krok po kroku (Udostępnij → Dodaj do ekranu głównego)
- Ukryć przycisk gdy appka działa już w trybie standalone (`display-mode: standalone`)

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

## Analityka — dostęp do danych GA4 przez MCP

Podpiąć Google Analytics do Claude Code przez serwer MCP, żeby móc na żądanie wyciągać dane (ruch, źródła, zachowanie na quizach, konwersje) i budować z nich raporty/analizy — bez ręcznego klikania w interfejsie GA.

**Priorytet:** internal tooling / nice to have (nie blokuje launchu; przydatne do mierzenia adopcji po publikacji posta)

**Kontekst:** w [web/index.html](web/index.html) wpięty jest GTM (`GTM-KZ9NMFFK`), pod nim najprawdopodobniej GA4 — dane już się zbierają.

**Rekomendacja:** oficjalny **Google Analytics MCP** (Python, GA4 Data API + Admin API)
- **Koszt: w pełni darmowy** dla naszej skali — GA4, Data API i projekt GCP nie są billowane (tylko limity zapytań/dzień)
- Charakter: read-only / raportowy — idealny do wyciągania danych i analiz
- ⚠️ NIE tworzy dashboardów w UI Analytics (API GA4 jest do czytania raportów); trwały dashboard można zrobić jako raport HTML/markdown w repo zasilany z API

**Do przygotowania (po stronie usera):**
- projekt w Google Cloud + włączone Analytics Data API
- **GA4 Property ID** (numer, np. `properties/123456789`) — NIE GTM ID
- autoryzacja (OAuth lub service account)

**Kroki konfiguracji:** włączenie API → `claude mcp add` → autoryzacja (rozpisać krok po kroku)

**Alternatywa:** Amplitude MCP jest już podłączony w sesji (darmowy Starter plan), ale prawdopodobnie nie ma naszych danych, bo zbieramy przez GTM/GA4 — nie przez SDK Amplitude.

---

## Trwałość danych (alternatywa dla localStorage)

Zwiększyć szanse, że użytkownicy nie stracą postępu przy czyszczeniu/eviction danych przeglądarki.

**Priorytet:** nice to have (ale realny problem — zgłoszony przez Ewelinę, „kilka razy" znika cała historia)

**Diagnoza (2026-06-03):** historia znika, bo cały localStorage origin jest kasowany przez Chrome (eviction) — dane są w trybie „best-effort", nie „trwałym". Wykluczono: kod (zero `removeItem`/`clear`), service worker (rusza tylko cache assetów), zmianę origin (stała domena), `Clear-Site-Data` (brak), Safari ITP (to Chrome Android). Korelacja z deployem prawdopodobnie pozorna. Dodano stronę diagnostyczną [`web/debug.html`](web/debug.html) (`/debug.html`, noindex, nielinkowana) + czujnik `ksap_meta` w [web/index.html](web/index.html). **Potwierdzono (2026-06-04):** u Ewelin (częsta testerka) `persisted=TAK`, ale u Michała `persisted=NIE` i historia zniknęła **mimo** wywołania `persist()` w kodzie — czyli `persist()` sam w sobie jest odrzucany przez Chrome dla niezaangażowanego usera. Wniosek: właściwym lekarstwem jest **instalacja PWA** (odblokowuje trwały storage), nie sam `persist()`.

**WAŻNE — sprostowanie wcześniejszej notatki:** IndexedDB **NIE** jest odporniejszy na eviction — siedzi w tym samym buckecie per-origin i jest kasowany razem z localStorage. Migracja storage technologii nie rozwiązuje problemu. Na eviction działają tylko: (a) uzyskanie trwałego storage (`navigator.storage.persist()` przyznawany przy instalacji PWA / wysokim zaangażowaniu — patrz „PWA install prompt"), (b) kopia poza przeglądarką.

**Opcje:**
- **Trwały storage przez instalację PWA** — NAJWIĘKSZY realny zysk; instalacja na ekranie głównym to główny sygnał, po którym Chrome przyznaje `persist()`. Łączy się z wpisem „Zainstaluj aplikację (PWA install prompt)". *(NIE usuwać PWA — to usunęłoby najlepszą dźwignię na trwałość.)*
- ✅ **Export/Import JSON — ZROBIONE (2026-06-04).** Sekcja „Kopia zapasowa" na ekranach Historia i Statystyki ([web/index.html](web/index.html), `exportBackup`/`importBackup`): pobranie pliku `ksap-backup-RRRR-MM-DD.json` (sesje + answer_log + ustawienia) i wczytanie z **mergem + dedupem** (import nigdy nie kasuje obecnych danych), z notką wyjaśniającą lokalny charakter aplikacji i zalecenie regularnego backupu. Świadomie *sieć ratunkowa*, nie codzienny sync.
  - *Opcjonalny wariant na przyszłość:* wysyłka kopii na e-mail przez **EmailJS** (bez backendu) — wygodniejsze archiwum cross-device, ale restore zostaje ręczny i wymaga podania maila; `mailto:` odpada przez limity długości treści.
- **File System Access API** — Chrome/Edge only, Safari nie obsługuje; raczej pomijamy.
- **Shareable URL z zakodowanym stanem** — base64 w URL/hash, cross-device, ale rośnie z ilością danych.

**Zalecane podejście:** najpierw potwierdzić eviction przez `/debug.html`, potem dźwignia trwałości = PWA install prompt; export/import JSON jako opcjonalne ubezpieczenie.

---

## Dobór pytań wg słabości — „częściej losuj te, na które odpowiedziałem błędnie"

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

## Adaptacyjny dobór wg słabości typów — opcja przy starcie sesji (floor + flex)

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

