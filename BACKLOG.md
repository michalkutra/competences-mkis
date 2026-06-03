# Backlog

## Priorytetyzacja — test launch

**Kontekst:** darmowa wersja dla ~700 osób zdających egzamin KSAP, egzamin za miesiąc. Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN zebranych z wirtualnych kaw jako proxy "ktoś to ceni".

| # | Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|---|
| 2 | Komunikacja (post na grupie) | Bez dobrego posta nikt nie kliknie — treść, ton, timing | ~1h | **MUST** |
| 7 | NPS / CSAT (Tally) | Bez tego nie wiesz CO MYŚLĄ — liczby bez kontekstu nic nie mówią | ~30 min | **MUST** |
| 8 | Informacja o puli pytań | Ustawia oczekiwania, zapobiega "to za mało" | ~15 min | SHOULD |
| 10 | Podziel się wynikiem | Jedyny mechanizm wyjścia poza te 700 osób | ~1h | SHOULD |
| 11 | PWA install prompt | Zwiększa powroty mobilnych użytkowników (fundament już jest) | ~2h | SHOULD |
| 16 | Licznik social proof na home | Pokazuje, że appka żyje — zachęta do startu | ~30 min | SHOULD |
| 13 | Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| 15 | Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**MUSTs łącznie:** ~2-3h (poza deploy). **SHOULDs:** kolejne ~4-5h.

---

## Licznik social proof na home (#16)

**Status:** zaprojektowane + plan gotowy — [spec](docs/superpowers/specs/2026-06-03-social-proof-counter-design.md), [plan](docs/superpowers/plans/2026-06-03-social-proof-counter.md).

Subtelna linijka „✦ Odpowiedzieliście już na ponad X pytań" pod przyciskami na home (Wariant A). Liczba ręcznie aktualizowana w `web/stats.js` (odczyt z GA: suma eventów `question_answered`, start = 508 → „ponad 500"). Zaokrąglanie w dół do ładnego progu, próg widoczności 300 (poniżej — linijka ukryta). Bez backendu, bez GA Data API (świadomie). Czysta logika w `web/social-proof.js` (testowana `tools/test-social-proof.js`).

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

## Informacja o puli pytań na ekranie głównym lub setup

Wyświetlać ile pytań jest dostępnych w banku, np. "Pula: 80 pytań (łatwy) + 40 (trudny)".

- Pomaga użytkownikom ocenić wartość aplikacji przed pierwszą sesją
- Zapobiega rozczarowaniu ("znam już wszystkie odpowiedzi") — użytkownicy wiedzą czego się spodziewać
- Warto też sprawdzić realny rozmiar puli: przy sesjach 15-pytaniowych i małej puli użytkownicy szybko widzą powtórki

**Powiązane (przyczyna powtórek):** feedback Eweliny „pytania powtarzają się" zaadresowany planem anty-powtórek (LRS + powiększenie banku do ~25 sesji bez powtórki) — [spec](docs/superpowers/specs/2026-06-03-anti-repeat-question-variety-design.md), [plan](docs/superpowers/plans/2026-06-03-anti-repeat-question-variety.md). Po wdrożeniu zaktualizować podawany rozmiar puli (640 → 840).

---

## Komunikacja (post na grupie FB)

**Status:** Drafty gotowe — do wyboru wersji i publikacji po wdrożeniu MUSTs.
**Drafty:** [`communication/`](communication/) — 4 wersje (A: storytelling, B: problem→rozwiązanie ⭐, C: konkretna, D: Messenger)

Przygotować treść posta na grupę ~700 osób zdających egzamin KSAP.

**Co powinien zawierać post:**
- kim jesteśmy (żona zdaje ten sam egzamin — wiarygodność "z wewnątrz")
- co to jest i po co (bezpłatne narzędzie do ćwiczeń, 8 typów zadań)
- jak zacząć (jeden link, zero rejestracji)
- co chcemy w zamian (feedback — co działa, co nie; opcjonalnie: kawa)
- prośba o udostępnienie jeśli ktoś zna inne osoby zdające

**Ton:** osobisty, nie marketingowy. Piszemy jako ludzie, nie jako produkt.

**Timing:** opublikować gdy wszystkie MUSTs są gotowe — nie wcześniej, żeby pierwsze wrażenie było dobre.

**Do przygotowania:**
- wersja na FB (dłuższa, z kontekstem)
- opcjonalnie: krótka wersja do WhatsApp/Messenger dla znajomych

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

**Diagnoza (2026-06-03):** historia znika, bo cały localStorage origin jest kasowany przez Chrome (eviction) — dane są w trybie „best-effort", nie „trwałym". Wykluczono: kod (zero `removeItem`/`clear`), service worker (rusza tylko cache assetów), zmianę origin (stała domena), `Clear-Site-Data` (brak), Safari ITP (to Chrome Android). Korelacja z deployem prawdopodobnie pozorna. Dodano stronę diagnostyczną [`web/debug.html`](web/debug.html) (`/debug.html`, noindex, nielinkowana) + czujnik `ksap_meta` w [web/index.html](web/index.html) — potwierdzi `persisted()`/quota na urządzeniu Ewelin.

**WAŻNE — sprostowanie wcześniejszej notatki:** IndexedDB **NIE** jest odporniejszy na eviction — siedzi w tym samym buckecie per-origin i jest kasowany razem z localStorage. Migracja storage technologii nie rozwiązuje problemu. Na eviction działają tylko: (a) uzyskanie trwałego storage (`navigator.storage.persist()` przyznawany przy instalacji PWA / wysokim zaangażowaniu — patrz „PWA install prompt"), (b) kopia poza przeglądarką.

**Opcje:**
- **Trwały storage przez instalację PWA** — NAJWIĘKSZY realny zysk; instalacja na ekranie głównym to główny sygnał, po którym Chrome przyznaje `persist()`. Łączy się z wpisem „Zainstaluj aplikację (PWA install prompt)". *(NIE usuwać PWA — to usunęłoby najlepszą dźwignię na trwałość.)*
- **Export/Import JSON** — ręczna kopia na czarną godzinę (user pobiera plik JSON do Pobranych, może wczytać z powrotem). Świadomie tylko jako *sieć ratunkowa*, nie codzienny sync — na mobile zarządzanie plikiem jest słabe (user musi pamiętać i nie zgubić pliku). Zero ryzyka dla zasady „bez rejestracji".
- **File System Access API** — Chrome/Edge only, Safari nie obsługuje; raczej pomijamy.
- **Shareable URL z zakodowanym stanem** — base64 w URL/hash, cross-device, ale rośnie z ilością danych.

**Zalecane podejście:** najpierw potwierdzić eviction przez `/debug.html`, potem dźwignia trwałości = PWA install prompt; export/import JSON jako opcjonalne ubezpieczenie.

---

## Dobór pytań wg słabości — „częściej losuj te, na które odpowiedziałem błędnie"

Wariant/rozszerzenie silnika doboru pytań w `buildSession()` — obok logiki anty-powtórek (least-recently-seen, w trakcie wdrażania): ważyć losowanie tak, by pytania źle zaliczone w przeszłości pojawiały się częściej (spaced repetition / nauka na błędach).

**Priorytet:** rozszerzenie po wdrożeniu anty-powtórek (ten sam silnik i te same dane).

**Kontekst danych:** `ksap_answer_log` w localStorage ma już per odpowiedź pola `qId`, `tid`, `ok` (poprawność) i `ts` — wystarczające, żeby policzyć dla każdego pytania historię trafień/pomyłek bez żadnej nowej infrastruktury.

**Pomysł na mechanikę (do doprecyzowania w brainstormingu):**
- Każdemu pytaniu nadać wagę losowania rosnącą przy błędnych odpowiedziach, malejącą przy serii poprawnych (np. waga ∝ liczba pomyłek; pytanie kilkukrotnie zaliczone poprawnie schodzi do wagi bazowej).
- **Napięcie z anty-powtórkami:** czysty LRS maksymalizuje świeżość (unikaj powtórek), a dobór wg słabości celowo *powtarza* trudne pytania. Trzeba pogodzić — np. tryb przełączany przez użytkownika („nowe pytania" vs „ćwicz błędy"), albo waga = kompromis (świeżość × słabość).
- Rozważyć osobny tryb sesji „Powtórka błędów" zamiast modyfikować domyślny dobór.

**Otwarte pytania:**
- Czy to globalny tryb, czy miks w każdej sesji?
- Jak szybko pytanie „wraca do normy" po poprawnych odpowiedziach (krzywa zapominania)?
- Czy respektować blueprint egzaminu (rozkład typów), czy dobór wg słabości może go naruszać?

