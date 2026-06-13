# Backlog — Ukończone


## Integracja części II (sprawdzian wiedzy) z aplikacją

> **Ukończono:** 2026-06-13 · [Spec](docs/superpowers/specs/2026-06-13-integracja-czesc-ii-wiedza-design.md) · [Plan](docs/superpowers/plans/2026-06-13-integracja-czesc-ii-wiedza.md)

Wpięcie 827 pytań części II („sprawdzian wiedzy", 6 dziedzin) jako osobnej części egzaminu obok części I. Nawigacja Wariant A (home = hub dwóch części), osobny ekran setupu cz. II (tryb, chipy dziedzin, filtr poziomu), routing `/wiedza`, sesja 15 pytań, render świadomy części (stem + `source` w review). Persystencja/historia/statystyki uogólnione o `part` + oś `group` (typ dla cz. I, dziedzina dla cz. II), wstecznie kompatybilne ze starymi danymi. GA4 `exam_part` + `question_domain` (bez zanieczyszczania liczbowego `question_type`). PWA: sw cache `v9`.

**Architektura:** build `tools/wiedza/build-web.js` (JSON → `web/questions-wiedza.js`, 827) + czysty dobór `web/session-wiedza.js` (`composeWiedzaSession`: filtr dziedzin/poziomu + least-recently-seen, 15 pytań, graceful przy małej puli), oba z testami node (`tools/test-build-web.js`, `tools/test-session-wiedza.js`). Reszta w [web/index.html](web/index.html). Plan po adversarial review (poprawki GA / bilansowanie statystyk / atomowy commit), implementacja po niezależnym review diffu — zero blokerów.

**Mobilny home:** sticky grafika footera z efektem fade (maska w kolorze tła), kafle części jako poziomy karuzel ze swipe + peek, poziomy trudności w jednym rzędzie, headline u góry. Grafika footera wyłącznie na home (usunięta z pozostałych ekranów).

**Drobne poprawki UX (zgłoszenia po teście):** domyślny tryb = ostatnio wybrany (persystencja), blokada pull-to-refresh tylko na ekranie testu (`body.on-question`).

**Poza zakresem (osobne pozycje w BACKLOG.md):** pełny egzamin próbny 90/90, odświeżanie treści wrażliwych czasowo (cykl 2027).

---

## Pula pytań do części II egzaminu (sprawdzian wiedzy)

> **Ukończono:** 2026-06-12 (rozszerzenie pz/se: 2026-06-13) · [Plan](docs/superpowers/plans/2026-06-10-pytania-sprawdzian-wiedzy.md)

**Dowiezione:** `data/wiedza/output/questions-wiedza.json` — **827 pytań** jednokrotnego wyboru (263 realne KSAP 2023–2025 zweryfikowane wobec stanu prawnego 2026-06 + 564 wygenerowane w stylu formuły 2025), pogrupowanych w **31 typów** (taksonomia z pełnym pokryciem 41/41 zagadnień Zał. 1 do Rozporządzenia, Dz.U. 2025 poz. 811), z poziomami trudności easy/medium/hard, wyjaśnieniami i referencją do źródła (akt + artykuł / Leksykon budżetowy / dane GUS-NBP).

**Rozszerzenie (2026-06-13):** na życzenie użytkownika (priorytet nauki) podwojono pule dwóch domen — **pz 40→80** i **se 87→174** (+127 wygenerowanych, z czego 1 odrzucony w weryfikacji i zastąpiony). Pula wzrosła z 700 do 827 pytań.

**Jakość:** alokacja per typ z empirycznych wag egzaminów (2025 ważony ×3, floor 10/typ; pz/se wzmocnione ponad wagi decyzją użytkownika); każde realne pytanie zweryfikowane wobec lokalnych tekstów jednolitych (2 odrzucone, 23 skorygowane); każde wygenerowane przeszło adwersaryjną weryfikację niezależnym subagentem (545 ok / 18 poprawionych / 1 odrzucone+dogenerowane — `data/wiedza/analysis/verify-report.md`); walidator schematu 0 błędów; rozkład poprawnych odpowiedzi 23,6–26,5% per pozycja. Statystyki i znane ograniczenia: `data/wiedza/output/stats.md`.

**Proces:** potok danych wg planu — pobranie źródeł (6 PDF KSAP, 13 aktów t.j. przez ELI API, crawl 189 haseł Leksykonu przez ochronę TSPD) → parsowanie egzaminów (540 pytań, 0 błędów, niezależna re-parsacja kontrolna) → taksonomia → mapowanie + wagi → weryfikacja realnych → style guide ze zmierzonymi statystykami 2025A → generacja 48 batchy subagentami → weryfikacja adwersaryjna 47 weryfikatorów → scalenie. Narzędzia odtwarzalne w `tools/wiedza/`.

**Poza zakresem (osobne pozycje):** integracja z aplikacją web (format już kompatybilny z `web/questions-unified.js`; nowość: `level: "medium"` i `topicId` zamiast `typeId`).

---

## Flow satysfakcji + polecenia (Web3Forms) — faza 1

> **Ukończono:** 2026-06-10 · [Spec](docs/superpowers/specs/2026-06-09-feedback-referral-flow-design.md) · [Plan](docs/superpowers/plans/2026-06-09-feedback-referral-flow.md)

Scala dwa dawne wiersze backlogu („CSAT — zbieranie ocen" + „Podziel się wynikiem") w jedną inicjatywę bez backendu, reużywając Web3Forms (działa już dla zgłoszeń błędów). **Tally wycofane** jako narzędzie. Główny cel = wzrost przez polecenia; drugorzędny = feedback jakościowy.

**Mechanika:** widget inline 👍/👎 zawsze na ekranie wyników (wysoko). Klik 👍 → modal z poleceniem strony (altruistyczne copy) + udostępnianie `navigator.share` z fallbackiem Facebook / e-mail / kopiuj link + opcjonalne „Co było najbardziej pomocne?". Klik 👎 → modal „Czego zabrakło / co poprawić?" (zawsze otwiera, **omija cooldown** — negatywny sygnał cenny). Ukończenie → 5-dniowy cooldown na nagabywanie o share po 👍. Proaktywny modal (z separatorem nad „Może później") dla osób, które po **≥45 odpowiedziach** nie kliknęły ani razu łapki; gdy się pokazuje, redundantny widget inline jest chowany.

**Architektura:** czysta logika (cooldown, próg proaktywny, treść share) w module [`web/feedback.js`](web/feedback.js) (UMD, wzór `web/pwa-install.js`), testowana node+vm w [`tools/test-feedback.js`](tools/test-feedback.js) (17 asercji). DOM/efekty/fetch/GA w `feedbackFlow` (IIFE) w [web/index.html](web/index.html) — stan w localStorage `ksap_feedback_voted|completed_at|proactive_at`, Web3Forms POST z 1× retry (subject „Opinia 👍/👎 – egzamin.kutra.pl", odróżnialny od zgłoszeń błędów; cichy fail bez `mailto`). Modal responsywny: szerszy na desktop (460px), na mobile przyciski pełnej szerokości / pary po pół, wyższe pole feedbacku.

**GA:** `feedback_vote` / `feedback_modal_opened` / `feedback_share_clicked` / `feedback_submitted` / `feedback_modal_dismissed`.

**Proces:** brainstorming → spec → plan → subagent-driven (6 tasków, każdy spec-review ✅ + code-quality-review ✅; jeden flagowany „stuck button" odrzucony jako false-positive po weryfikacji kodu) → finalny holistyczny review (naprawił brak dismissu w proaktywnym stage 1) → weryfikacja na żywo w headless Chrome (Playwright, realne kliknięcia DOM, Web3Forms zamockowany → **0 realnych maili**) na desktop + mobile. Donate'y świadomie poza zakresem (osobne CTA). **Faza 2 (wall testimoniali) zostaje w BACKLOG.md** — czeka na napływ pozytywnych opinii z maili Web3Forms.

---

## Wzmocnienie zgłaszania błędów — modal + Web3Forms (niezależnie od `mailto`)

> **Ukończono:** 2026-06-08 · [Spec](docs/superpowers/specs/2026-06-08-bug-report-modal-web3forms-design.md) · [Plan](docs/superpowers/plans/2026-06-08-bug-report-modal-web3forms.md)

Zatrzymanie przecieku opisowego kontekstu zgłoszeń błędów (dotąd 3 z 4 nie docierało — `mailto` wymagał przejścia do klienta poczty + ręcznego „wyślij"). `reportQuestion()` w [web/index.html](web/index.html) zamiast `mailto` otwiera **modal na stronie**: pole opisu (wymagane) + email kontaktowy (opcjonalny). Wysyłka przez `fetch POST` do **Web3Forms** (darmowy tier, 250/mies., access key publiczny by design) — zamiast Google Form, bo mniej ręcznej roboty (zero budowania formularza). User nie opuszcza appki → najwyższa kończalność.

**Lejek GA (3 eventy, wszystkie z `question_id`/`question_index`/`question_type`):** `error_report_opened` (klik „Zgłoś błąd") → `error_reported` (skuteczna wysyłka) → `error_report_failed` (podwójny fail). Różnica `opened − reported` = porzucenia/awarie. Zmiana semantyki: stare `error_reported` liczyło kliknięcia, nowe liczy udane wysyłki (odpowiednik starego licznika = `error_report_opened`).

**Odporność:** 1× automatyczny retry; po podwójnym faila fallback `mailto` (na oba maile, z prefillowanym opisem usera — nic nie przepada). `from_name` = „egzamin.kutra.pl – zgłoszenie błędu". `innerHTML` fallbacku bezpieczny przez `encodeURIComponent` (komentarz w kodzie).

**Odbiorcy (CC w Web3Forms jest płatne):** access key na michal@kutra.pl + reguła auto-forward na ewelina.wegrocka@gmail.com (forward wymaga akceptacji maila — traktowane jako done). Wdrożone subagent-driven (implementer + spec-review ✅ + code-quality-review ✅). Web3Forms na free planie odrzuca żądania server-side → weryfikacja wyłącznie w przeglądarce; **potestowane, działa** (2026-06-08).

---

## Wykres skuteczności w czasie (statystyki)

> **Ukończono:** 2026-06-05 · [Spec](docs/superpowers/specs/2026-06-05-accuracy-over-time-chart-design.md)

Nowa sekcja „Skuteczność w czasie" na ekranie statystyk, **nad** rozbiciem per typ — pokazuje progres sesja po sesji. Wykres liniowy: **surowa skuteczność** każdej sesji (`score/total`, kolor slate) + **linia trendu** (średnia krocząca z 5 sesji, kolor niebieski), rysowana dopiero od 3. sesji. Oś X = numer sesji (rzadkie etykiety przy dużej liczbie), oś Y = 0–100%. Przełącznik trybu **Wszystko / Nauka / Egzamin** (`setStatsTrendMode`). Stany brzegowe: 0 sesji w trybie → komunikat, 1–2 → same surowe punkty bez trendu.

**Zero nowej infrastruktury:** dane z istniejącego `getSessions()` (localStorage `ksap_sessions`), bez zmian w modelu danych ani bibliotek. `renderLineChart()` rozszerzony wstecznie zgodnie o `opts` (`fixedMax`, `ySuffix`, `showValueLabels`, `pointRadius`, `xLabelEvery`) + obsługa `null` w serii (przerwa w linii) — użycie w Typ 7 nietknięte. Weryfikacja: harness Node na realnie wyłuskanych funkcjach (26 asercji: stany brzegowe, średnia krocząca, sortowanie chronologiczne, filtr trybu, rzadkie etykiety, regresja Typ 7).

---

## Relacje porządkujące — rozszerzenie Typ 5 (wnioskowanie logiczne)

> **Ukończono:** 2026-06-05 · [Spec](docs/superpowers/specs/2026-06-05-relacje-porzadkujace-typ5-design.md) · [Plan](docs/superpowers/plans/2026-06-05-relacje-porzadkujace-typ5.md)

Nowa rodzina zadań „wnioskowanie z relacji porządkujących" (`A > B < C` → wskaż pewny wniosek), zgłoszona przez 2 testerów (w tym osoba 3× na egzaminie) + screenshot „Zestaw 3". **Doprecyzowanie:** to NIE analogie/ciągi liczbowe (błędna hipoteza), tylko dedukcja na relacjach — kompetencyjnie i formatowo **Typ 5**, więc dodane jako **wariant Typ 5** (pole `variant: "sylogizm"|"relacje"`, 200 istniejących pytań zmigrowanych na `sylogizm`), rendering reużyty bez zmian. **Nie** nowy typ, **nie** Typ 6.

**Bank: 140 pytań** (70 easy + 70 hard, `e_t5_101+`/`h_t5_101+`), generator deterministyczny (model-checking — wniosek „wynika" ⟺ prawdziwy w każdym modelu spełniającym przesłanki, brute-force po małej domenie). Jakość dopracowana iteracyjnie z testerami:
- **Trudność = głębokość rozumowania** (nie operatory): EASY = jednoprzesłankowe (flip/osłabienie, banalne), HARD = dwuprzesłankowe (tranzytywne, dedukcja).
- **Format przesłanek 50/50**: trójka `["A > B > C"]` vs dwie pary `["A > B","B > C"]` — jak egzamin.
- **~20% hard z wnioskiem `≠`** (np. `A > B > C ⊢ A ≠ C`, bez `A > C` w opcjach) — podniesienie trudności.
- Łączniki tylko kierunkowe `> < ≥ ≤` (bez brzydkich `≠`-łańcuchów). Poprawna odpowiedź = najmocniejszy możliwy wniosek; dystraktory z policzonym kontrprzykładem.

**Nowy blueprint sesji (filozofia mirror → pokrycie+zmienność):** [`web/session-blueprint.js`](web/session-blueprint.js) `composeSession` — FIXED 3 sylogizmy + 2 relacje + po 1 z Typ 1/2/3/4/6/7/8, + 3 sloty losowe (z dedup + anti-repeat) = 15. `buildSession` w [web/index.html](web/index.html) deleguje do modułu; usunięto martwy `SESSION_BLUEPRINT`/`pickLeastRecentlySeen`/`shuffle`.

**Tooling:** [`tools/relacje-solver.js`](tools/relacje-solver.js) (model-checker), [`tools/generate-type5-relacje.js`](tools/generate-type5-relacje.js) (generator), [`tools/validate-type5-relacje.js`](tools/validate-type5-relacje.js) (niezależna weryfikacja kluczy), [`tools/integrate-type5-relacje.js`](tools/integrate-type5-relacje.js) (migracja + integracja, idempotentny). `tools/validate-questions.js` uświadomiony wariantowi. Testy: solver (fixture'y wprost ze screenshotu), generator, dobór sesji. Walidacja całości: **980 pytań**, każde relacyjne z dokładnie 1 pewnym wnioskiem. Potestowane w przeglądarce (2026-06-05).

---

## Trwałość danych (alternatywa dla localStorage) — rozwiązana

> **Ukończono:** 2026-06-05 (obie dźwignie wdrożone)

Realny problem (Ewelina: „kilka razy" znika cała historia) domknięty bez backendu dwiema dźwigniami — patrz osobne wpisy: **PWA install** (trwały storage, `persisted=TAK`, 2026-06-05) + **export/import JSON** (kopia zapasowa z merge+dedup, 2026-06-04).

**Diagnoza (zachowana dla kontekstu):** historia znika, bo cały localStorage origin jest kasowany przez Chrome (eviction) — dane „best-effort", nie „trwałe". Wykluczono: kod (zero `removeItem`/`clear`), service worker, zmianę origin, `Clear-Site-Data`, Safari ITP (to Chrome Android). Potwierdzono (2026-06-04): u Michała `persisted=NIE` i historia zniknęła **mimo** wywołania `persist()` — czyli `persist()` sam w sobie jest odrzucany przez Chrome dla niezaangażowanego usera → właściwe lekarstwo to **instalacja PWA**. Diagnostyka przez [`web/debug.html`](web/debug.html) (noindex) + czujnik `ksap_meta` zostają.

**Sprostowanie:** IndexedDB **NIE** jest odporniejszy na eviction (ten sam bucket per-origin). Na eviction działają tylko: (a) trwały storage przez instalację PWA, (b) kopia poza przeglądarką.

**Świadomie skip-tier (nie robimy):** File System Access API (Chrome/Edge only), shareable URL z zakodowanym stanem (rośnie z danymi), wysyłka kopii e-mailem przez EmailJS (restore i tak ręczny).

---

## Zainstaluj aplikację (PWA install prompt)

> **Ukończono:** 2026-06-05 · [Spec](docs/superpowers/specs/2026-06-04-pwa-install-prompt-design.md) · [Plan](docs/superpowers/plans/2026-06-04-pwa-install-prompt.md)

Domyka pierwotny bug „znika historia": instalacja PWA odblokowuje trwały storage (`persisted=TAK`), więc Chrome przestaje kasować dane. Czysta logika w [`web/pwa-install.js`](web/pwa-install.js) (`detectPwaBranch`/`shouldShowResultsPrompt`/`computeDismissUntil`, test node [`tools/test-pwa-install.js`](tools/test-pwa-install.js)); kontroler `pwaInstall` inline w [web/index.html](web/index.html). **3 gałęzie wg GA4:** natywny `beforeinstallprompt` (Android/desktop ~51%), modal instrukcji iOS (~28%), wariant „Otwórz w prawdziwej przeglądarce" dla in-app webview/Chrome-iOS (~21%, instalacja niemożliwa). Trigger: karta **sticky** na dole ekranu wyników (`#screen-summary`) + przycisk w menu i w ostrzeżeniu „O aplikacji"; oba warianty karty mają „Może później" (cisza 4 dni, klucz `ksap_pwa`). Po instalacji woła `persist()` + `updateBackupNotes(true)` (synchronizacja z featurem backupu, commit `4e70db2`). Pełny pomiar `pwa_*` przez GTM (prod-only). Detekcja: **iOS ma priorytet nad `native`** (na iOS instalacja natywna nigdy nie działa). Zweryfikowane lokalnie (web + iPhone UA + in-app FBAN). **Ostatnia brama (po deployu):** natywny flow na prod — Android: instalacja → `/debug.html` pokazuje `persisted=TAK`.

---

## Rejestracja custom dimensions GA4 (error_reported)

> **Ukończono:** 2026-06-04

Zarejestrowane 3 custom dimensions (scope Event) w GA4 property `540012122`: `question_id`, `question_index`, `question_type` — odpowiadają parametrom pushowanym przez `reportQuestion()` ([web/index.html](web/index.html)). Od teraz każde `error_reported` jest czytelne przez Data API / MCP (`customEvent:question_id`) → wiadomo, na którym pytaniu user kliknął „Zgłoś błąd". **Ograniczenie:** brak backfillu — 4 zgłoszenia sprzed rejestracji mają `question_id = (not set)`, nieodzyskiwalne (BigQuery export nie był włączony). Pozostały follow-up (treść zgłoszenia ginie gdy `mailto` niewysłany) → BACKLOG.md „Wzmocnienie zgłaszania błędów".

---

## Analityka GA4 przez MCP

> **Ukończono:** 2026-06-04

Oficjalny serwer **`analytics-mcp`** (Google Analytics MCP, v0.6.0) podpięty do Claude Code (`claude mcp add analytics-mcp -s local`, `✓ Connected`). Auth: ADC przez **własny klient OAuth** (service account odpadł — GA4 UI twardo odrzuca konta serwisowe „nie jest powiązany z kontem Google"; domyślny klient gcloud odpadł — Google blokuje wrażliwy scope `analytics.readonly`). Projekt GCP `sprawdzian-ksap` (prywatne konto), włączone Analytics Admin + Data API, scope `analytics.readonly`. **GA4 Property ID: `540012122`** (egzamin.kutra.pl, konto „Sprawdzian Umiejetnosci KSAP"). Klient OAuth w `.ga-config/` (gitignored). Weryfikacja end-to-end: odpytano Data API (`error_reported` = 4 eventy). **Ograniczenie wykryte przy okazji** → patrz nowy task w BACKLOG.md „Rejestracja custom dimensions GA4" (parametry zdarzeń nie są czytelne bez rejestracji; brak backfillu).

---

## Anti-repeat — mniej powtórek pytań w kolejnych sesjach

> **Ukończono:** 2026-06-04 · [Spec](docs/superpowers/specs/2026-06-03-anti-repeat-question-variety-design.md) · [Plan](docs/superpowers/plans/2026-06-03-anti-repeat-question-variety.md)

Feedback Eweliny „pytania się powtarzają" zaadresowany. `buildSession()` dobiera teraz pytania wg least-recently-seen (LRS) na bazie historii w `ksap_answer_log` — pytania widziane najdawniej (lub wcale) mają pierwszeństwo, przy zachowaniu blueprintu egzaminu (rozkład typów). Powiększenie banku (→ ~25 sesji bez powtórki) + logika LRS = realnie mniej duplikatów między sesjami. Ten sam silnik i dane (`qId`, `tid`, `ok`, `ts`) są fundamentem pod przyszły „dobór wg słabości".

---

## Informacja o puli pytań na ekranie głównym (#8)

> **Ukończono:** 2026-06-04

Na home wyświetlana liczba pytań w banku — ustawia oczekiwania i zapobiega rozczarowaniu „to za mało". `initQuestionCount` (`web/index.html`) liczy dynamicznie sumę pul z `QUESTIONS_EASY` + `QUESTIONS_HARD` (nie hardcode), renderuje „N pytań w bazie" z poprawną polską odmianą (pytanie/pytania/pytań). Liczba aktualizuje się automatycznie po rozszerzeniu banku.

---

## Komunikacja (post na grupie FB)

> **Ukończono:** 2026-06-04

Post na grupę ~700 osób zdających egzamin KSAP przygotowany i opublikowany. Drafty (4 wersje) w [`communication/`](communication/) — A: storytelling, B: problem→rozwiązanie ⭐, C: konkretna, D: Messenger. Ton osobisty (żona zdaje ten sam egzamin — wiarygodność „z wewnątrz"), jeden link, zero rejestracji, prośba o feedback i udostępnienie.

> **Korekta 2026-06-05:** grupy liczyły 56 + 86 osób (realny zasięg ~90–140 unikalnych, nie ~700). Cała populacja zdających egzamin to ~940 osób — zob. „Kontekst zasięgu" w [raporcie launchu](docs/analytics/launch-report.md).

---

## Licznik social proof na home (#16)

> **Ukończono:** 2026-06-04 · [Spec](docs/superpowers/specs/2026-06-03-social-proof-counter-design.md) · [Plan](docs/superpowers/plans/2026-06-03-social-proof-counter.md)

Subtelna linijka „✦ Odpowiedzieliście już na ponad X pytań" pod przyciskami na home (Wariant A). POC, ale robi robotę. Liczba ręcznie aktualizowana w `web/stats.js` (odczyt z GA: suma eventów `question_answered`). Zaokrąglanie w dół do ładnego progu (`web/social-proof.js`, <1000 → pełne setki), próg widoczności 300. Bez backendu, bez GA Data API (świadomie). Czysta logika testowana w `tools/test-social-proof.js`.

---

## Dobór pytań do sesji wg blueprintu egzaminu (feedback: „mało sylogizmów")

> **Ukończono:** 2026-06-03

Feedback testerów (Ewelina i in.): sylogizmów w sesjach za mało; w trybie trudnym powinny być złożone, 3-przesłankowe. Diagnoza: baza była OK (80 sylogizmów; w hard 30/40 ma ≥3 przesłanki), problem leżał w `buildSession` — losowanie było równomierne (każdy typ ~1,9 pytania na sesję), więc sylogizmy były niedoważone względem prawdziwego egzaminu.

- `buildSession` (`web/index.html`) przepisana na `SESSION_BLUEPRINT` odzwierciedlający strukturę egzaminu KSAP: Typ1=2, Typ2=2, Typ3=2, Typ4=1, **Typ5 (sylogizmy)=4**, Typ6=2, Typ7=1, Typ8=1 → 15 pytań.
- Efekt (symulacja 2000 sesji): dokładnie 4 sylogizmy/sesję (było ~1,9), 0 duplikatów, stała długość 15. Zero zmian w bazie pytań.
- Postulat „3-przesłankowe sylogizmy w trybie trudnym" już spełniony przez istniejącą bazę.
- Wątek „relacje liczbowe/kontekstowe" → przeniesiony do BACKLOG.md (wymaga doprecyzowania z recenzentem).

---

## Naprawa pytań typu 8 (zgłoszenie `h_t8_037`)

> **Ukończono:** 2026-06-03 · [Spec](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-design.md) · [Plan](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-plan.md) · [Zgłoszenie](bug-reports/2026-06-03-typ8-figury/2026-06-03-h_t8_037.md)

Zgłoszenie mailem („zależność dopiero przy trzecim oknie") ujawniło defekt w pytaniach typu 8 (niejednorodne komórki — reguły nie dało się wydedukować przed trzecim oknem) oraz trójkąt renderowany jako koło. Naprawione.

- Pytania typu 8 przebudowane na macierze 2×2 o **jednorodnych komórkach** (każda pozycja = niezależna podmacierz → jednoznaczna rozwiązywalność). Bank easy: 1 figura. Hard z gradientem: **T1** (1 figura, 15), **T2** (2 figury, 15), **T3** (3 figury, 10; w 7 reguła obrotu trójkąt/kwadrat).
- Renderer (`web/index.html`): `renderFigure` rysuje trójkąt, obsługuje obrót i skalowanie; `renderType8` renderuje komórki wielofigurowe.
- Generator/walidator/integrator w `tools/` (deterministyczne; walidacja 80/80). Bump cache `ksap-v4` → `ksap-v5`.
- Zachowane: ID, poziomy, polecenia, liczba opcji (20×4 + 20×5 na poziom).

---

## Domena i deploy

> **Ukończono:** 2026-06-01

Domena `egzamin.kutra.pl` skonfigurowana w OVH (CNAME → Netlify). Deploy na Netlify z automatycznym deployem z brancha `main`. HTTPS via Let's Encrypt.

---

## Odliczanie do egzaminu (countdown na home screenie)

> **Ukończono:** 2026-05-30 · [Spec](docs/superpowers/specs/2026-05-30-exam-countdown-design.md) · [Plan](docs/superpowers/plans/2026-05-30-exam-countdown.md)

Wyświetlać liczbę dni do egzaminu na ekranie głównym, np. "Egzamin za 28 dni".

- Data egzaminu hardcoded w kodzie (można zmienić przy kolejnym sezonie)
- Ukryć/zmienić komunikat po dniu egzaminu
- Emocjonalny hak — przypomina użytkownikom po co tu są

---

## Zgłoś błąd / zakwestionuj odpowiedź

> **Ukończono:** 2026-05-30 · [Spec](docs/superpowers/specs/2026-05-30-report-error-design.md) · [Plan](docs/superpowers/plans/2026-05-30-report-error.md)

Przy każdym pytaniu (lub na ekranie wyników) dać możliwość zgłoszenia błędu w treści pytania lub niezgody z odpowiedzią.

- Najprostszy wariant: link `mailto:` z pre-wypełnionym tematem zawierającym ID pytania
- Bez tego: niezadowoleni użytkownicy piszą negatywne komentarze na grupie zamiast do twórcy
- Ważne przy 700 użytkownikach — ktoś na pewno znajdzie błąd lub zakwestionuje odpowiedź

---

## Przycisk "Postaw mi kawę"

> **Ukończono:** 2026-06-01 · **Rozszerzono o Revolut:** 2026-06-04

Ko-fi widget (`ko-fi.com/sprawdzianumiejetnosci`) dodany na ekranie wyników (po 1+ sesji i wyniku ≥ 50%), w historii i statystykach (po 3+ sesjach). Tekst: "Czy ta appka pomaga Ci w nauce? Jeśli tak" + czerwony przycisk + "Tworzymy ją w wolnym czasie."

**Druga metoda — Revolut (2026-06-04):** obok Ko-fi dodany `revolut.me/michald6r` we wszystkich miejscach donate (sekcja „Wspieraj projekt" na About + widget `kofiWidget()`). Powód: Ko-fi wymaga maila przy płatności (paragon PayPal/Stripe — nieusuwalne), Revolut nie wymaga maila po stronie wpłacającego. Zachowanie responsywne: **na telefonie klikalny przycisk** (otwiera apkę Revolut), **na desktopie kod QR** do zeskanowania (`web/revolut-qr.svg`, wygenerowany lokalnie, bez zewnętrznych serwisów). Klasy CSS `.donate-mobile`/`.donate-desktop` (breakpoint 768px).

---

## Open Graph tags

> **Ukończono:** 2026-06-01

OG tagi dodane do `<head>` w index.html (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`). Dedykowany baner `og-image.png` (1200×630px) wygenerowany z ilustracji bg.png i tytułem apki. Domena: `egzamin.kutra.pl`.

---

## Routing + nawigacja przeglądarki

> **Ukończono:** 2026-06-02

History API client-side routing zaimplementowane w `web/index.html`. Każdy ekran ma własny URL (`/`, `/setup`, `/history`, `/stats`, `/about`, `/session`). Netlify redirect `/* → /index.html` dodany w `netlify.toml`. Przyciski back/forward działają. Cofnięcie się w trakcie quizu pokazuje dialog "Przerwać sesję?". Deep linki do statycznych ekranów działają.

---

## Analityka GA4 + GTM

> **Ukończono:** 2026-06-02

Google Tag Manager (`GTM-KZ9NMFFK`) dodany do `web/index.html` (snippet w `<head>` i noscript w `<body>`). Przez GTM podłączony GA4 (`G-5ZLD2PHTNE`). Eventy `dataLayer.push()` zaimplementowane w kodzie:

- `screen_view` — każda zmiana ekranu (screen_name)
- `session_started` — klik Rozpocznij (mode, difficulty, timer_enabled)
- `question_answered` — każda odpowiedź (question_type, is_correct, question_index, time_spent_sec)
- `session_completed` — koniec sesji (score, score_pct, questions_total, mode, difficulty)
- `session_aborted` — porzucenie sesji (at_question_index, questions_total)
- `error_reported` — zgłoszenie błędu w pytaniu (question_id, question_type)
- `donation_clicked` — klik wsparcia; `source`: 'about'/'widget' (Ko-fi), 'revolut'/'widget_revolut' (Revolut)

---

## Rozszerzenie puli pytań (2× w każdym poziomie)

> **Ukończono:** 2026-06-02

Pula pytań podwojona w obu poziomach trudności. Wygenerowano 320 nowych pytań (Opus 4.8, jeden agent na typ, równolegle), trzymając się `docs/specyfikacja_pytan.md` i unikając duplikatów istniejących treści/ID.

- Z 320 → **640 pytań**: 8 typów × 40 łatwych + 8 typów × 40 trudnych
- Łatwe: wiedza ogólna + podstawy administracji; trudne: terminologia prawnicza, łacińskie maksymy, złożona logika
- Walidacja 100%: 640 unikalnych ID, 0 duplikatów, poprawne indeksy `correct`, spójność matematyczna tabel (typ 6), zweryfikowane dystraktory wykresów (typ 7) i reguły transformacji figur (typ 8)
- Bump cache service workera `ksap-v2` → `ksap-v3`, żeby PWA pobrało nową pulę
- Mniej powtórek przy sesjach 15-pytaniowych (powiązane z otwartym taskiem o wyświetlaniu rozmiaru puli)

---

## Podstrona "O aplikacji"

> **Ukończono:** 2026-06-01

Ekran `screen-about` dodany do `index.html`. Dostępny z menu (hamburger → "O aplikacji"). Zawiera:
- historyjkę powstania aplikacji (Ewelina, egzamin KSAP, brak dobrych materiałów)
- opis dwóch trybów nauki (Nauka z podpowiedziami / Egzamin bez podpowiedzi)
- listę 8 typów zadań z numerkami
- żółte ostrzeżenie o localStorage (postęp tylko lokalnie, brak synchronizacji)
- sekcję Ko-fi z linkiem i podpisem "Powodzenia na egzaminie! — Michał"

---
