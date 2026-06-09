# Backlog

## Priorytetyzacja

**Kontekst:** darmowa wersja dla zdających egzamin KSAP — **~940 osób** zgłoszonych do egzaminu (cała populacja; wcześniej zakładaliśmy ~700). Post launchowy poszedł jednak tylko na 2 grupy FB (56 + 86, realnie ~90–140 unikalnych), więc dotychczasowy zasięg to ułamek populacji — **wyjście poza grupy FB to główna dźwignia wzrostu** (zob. „Podziel się wynikiem"). (strona live od 2026-06-03, **egzamin 2026-07-04 → ~29 dni**). Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN z wirtualnych kaw jako proxy „ktoś to ceni". Tabela to pełny indeks backlogu — każda pozycja ma sekcję z opisem niżej.

**Soczewka czasowa (refinement 2026-06-05):** zostało ~4 tygodnie do egzaminu. Wygrywają **tanie, szybkie dźwignie** trafiające w cele (feedback, adopcja). Drogie/zależne od danych rzeczy fazujemy lub przesuwamy.

| Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|
| Flow satysfakcji + polecenia (Web3Forms) | Scala feedback (👍/👎 + komentarz) z poleceniami strony — jedyna dźwignia wyjścia poza ~140 osób z grup FB (do pozostałych ~800 z 940 zdających); reużywa Web3Forms, bez backendu | ~3–4h (spec+plan gotowe) | **MUST (następny)** |
| Baner zgody na cookies/śledzenie (GDPR) | Strona live śledzi przez GA4 bez zgody (opt-out ukryty w debug) — realna ekspozycja prawna; tani fix | mały (spec gotowy) | **SHOULD** (zgodność prawna) |
| Wall testimoniali (faza 2) | Social proof na Home/About — ale nie ma czego pokazać, póki nie napłyną pozytywne opinie (zależność danych); źródło = maile z Web3Forms | średni | COULD (po napływie opinii z Web3Forms) |
| Adaptacyjny dobór wg słabości (per-typ floor+flex; per-pytanie = tryb „Powtórka błędów") | Nauka na błędach przed egzaminem — realna wartość edukacyjna w oknie 4 tyg. | średni | COULD (post-launch) |
| Podgląd pojedynczego pytania (QA) | Szybsza obsługa zgłoszeń błędów bez przeklikiwania sesji | mały | COULD (tooling) |
| Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**Legenda:** MUST = blokuje pełnię wartości launchu · SHOULD = duży zysk, robić wkrótce · COULD = wartościowe, post-launch · BLOCKER = czeka na decyzję/doprecyzowanie · SKIP = świadomie odpuszczone.

> **Trwałość danych (localStorage)** — **rozwiązana, przeniesiona do BACKLOG_DONE.md** (2026-06-05). Obie dźwignie bez backendu wdrożone: PWA install (trwały storage) + export/import JSON (kopia). Pozostałe opcje (File System API / shareable URL / cloud) świadomie skip-tier.

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

## Flow satysfakcji + polecenia (Web3Forms) — scala „CSAT faza 1" + „Podziel się wynikiem"

**Status:** zaprojektowane + rozpisany plan (do wdrożenia) — [spec](docs/superpowers/specs/2026-06-09-feedback-referral-flow-design.md), [plan](docs/superpowers/plans/2026-06-09-feedback-referral-flow.md).

**Decyzja (brainstorming 2026-06-09):** dwa dawne wiersze backlogu („CSAT — zbieranie ocen" i „Podziel się wynikiem") scalone w jedną inicjatywę, bo dzielą jeden moment (ekran wyników) i jedną infrastrukturę (Web3Forms już działa dla zgłoszeń błędów). **Tally wycofane** jako wybrane narzędzie — zastąpione tym flow. Główny cel = **wzrost przez polecenia**; drugorzędny = feedback jakościowy.

**Mechanika (skrót — pełnia w specu):**
- Widget inline 👍/👎 zawsze na summary, wysoko. Sygnał binarny zamiast oceny 1–5.
- Klik 👍 → modal: polecenie strony (altruistyczne) + udostępnianie (`navigator.share` + fallback Facebook / e-mail / kopiuj link) + opcjonalne „Co było najbardziej pomocne?".
- Klik 👎 → modal: „Czego zabrakło / co poprawić?" (zawsze otwiera, omija cooldown — negatywny sygnał cenny).
- Ukończenie → 5-dniowy cooldown na nagabywanie o share po 👍. Proaktywny modal dla osób, które po ≥45 odpowiedziach nie kliknęły ani razu łapki.
- Stan w localStorage (`ksap_feedback_*`), GA: `feedback_vote` / `feedback_modal_opened` / `feedback_share_clicked` / `feedback_submitted` / `feedback_modal_dismissed`. Wszystko przez Web3Forms, bez backendu.

> Donate'y świadomie poza zakresem (osobne CTA). Stary spec Tally (`docs/superpowers/specs/2026-06-03-csat-testimonials-design.md`) pozostaje w repo jako historyczny — nie realizujemy go.

**Faza 2 (COULD, osobno):** wall testimoniali — ręczna kuracja → `web/testimonials.js`, render na About (lista) i Home (sticky-reveal z `web/bg.png`). Źródłem są pozytywne opinie z **maili Web3Forms** (zamiast dashboardu Tally). Wdrażać dopiero gdy napłyną wartościowe komentarze — inaczej budujemy pustą gablotę.

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

