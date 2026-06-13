# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-12 · **Dane od:** 2026-06-03 (premiera)
> **Cel donejtów:** 100 zł łącznie
>
> 🔄 Aktualizuj skillem `/aktualizuj-raport-launchu` (albo napisz „zaktualizuj raport launchu") — pobiera dane po GA4 MCP i **tylko dopisuje kolumnę / odświeża**, nie przepisuje historii.
> ⚠️ Ostatnia kolumna bywa **niepełna** (dane spływają w ciągu doby) — orientacyjnie do następnej aktualizacji.

---

## 0. Kontekst zasięgu (jak czytać te liczby)

> **Aktualizacja 2026-06-07** — zweryfikowany rynek i realny zasięg launchu. Zmienia interpretację wszystkich metryk poniżej.

| | Wartość |
|---|---|
| Populacja zdających (rynek) | **~940 osób** zgłoszonych do egzaminu KSAP |
| Zasięg postu launchowego | **2 grupy FB: 56 + 86 = max ~142**, realnie **~90–140 unikalnych** (grupy mogą się pokrywać) |

**Dlaczego to ważne — liczby wyglądają DUŻO lepiej, niż sugeruje surowy „120 userów":**
- 🎯 **Niemal saturacja osiągalnej widowni:** 120 userów z realnego zasięgu ~90–140 osób grup FB → dotarliśmy do praktycznie **całej** widowni, do której w ogóle mógł trafić post. To nie „mało userów" — to wyczerpanie kanału.
- 🚀 **Ogromny zapas wzrostu:** wobec ~940 zdających to dopiero **~13% penetracji rynku**. Pozostałe ~820 osób jest poza zasięgiem dotychczasowych grup → **główna dźwignia to wyjście poza grupy FB** (stąd waga „Podziel się wynikiem", sekcja BACKLOG).

---

## 1. Dzień po dniu

> Daty w kolumnach — skanuj wiersz (metrykę) od lewej do prawej, żeby zobaczyć trend. Nowe dni dopisują kolejne kolumny po prawej.

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 | 2026-06-06 | 2026-06-07 | 2026-06-08 | 2026-06-09 | 2026-06-10 | 2026-06-11 | 2026-06-12 ⚠️ |
|---|---|---|---|---|---|---|---|---|---|---|
| **— Wzrost —** | | | | | | | | | | |
| Użytkownicy | 74 | 34 | 24 | 17 | 21 | 17 | 29 | 21 | 12 | 8 |
| Nowi | 71 | 24 | 14 | 8 | 12 | 4 | 16 | 12 | 4 | 4 |
| Powracający | 3 | 10 | 10 | 9 | 9 | 13 | 13 | 9 | 8 | 4 |
| Powracający % | 4% | 29% | 42% | 53% | 43% | 76% | 45% | 43% | 67% | 50% |
| **— Wizyty (ruch na stronie) —** | | | | | | | | | | |
| Wizyty (sesje GA) | 99 | 43 | 31 | 25 | 27 | 35 | 41 | 28 | 17 | 12 |
| Wizyty zaang. | 82 | 33 | 26 | 21 | 20 | 31 | 39 | 4† | 13 | 0† |
| Engagement rate | 83% | 77% | 84% | 84% | 74% | 89% | 95% | 14%† | 76% | —† |
| Śr. czas wizyty | 8,8 min | 8,4 min | 8,7 min | 8,5 min | 12,2 min | 13,4 min | 11,0 min | 90 min* | 5,1 min | 22,0 min* |
| **— Nauka (quizy) —** | | | | | | | | | | |
| Odpowiedzi (`question_answered`) | 909 | 436 | 380 | 194 | 402 | 409 | 509 | 339 | 185 | 46 |
| Sesje nauki — start (`session_started`) | 99 | 33 | 33 | 19 | 34 | 31 | 45 | 30 | 18 | 5 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 29 | 25 | 11 | 25 | 23 | 32 | 20 | 12 | 3 |
| Completion rate | 54% | 88% | 76% | 58% | 74% | 74% | 71% | 67% | 67% | 60% |
| Porzucone | 13 | 1 | 4 | 3 | 3 | 2 | 6 | 4 | 3 | 1 |
| Abort rate | 13% | 3% | 12% | 16% | 9% | 6% | 13% | 13% | 17% | 20% |
| **— Sygnały —** | | | | | | | | | | |
| Donate kliki | 4 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Zgłoszenia błędu | 4 | 0 | 0 | 0 | 7 | 2 | 2 | 0 | 0 | 0 |
| Udostępnienia (`result_shared`) | — | — | — | — | — | — | — | — | — | — |

\* 12.06 niepełny dzień (8 userów na moment aktualizacji). Dni 03–11.06 to pełne doby. Śr. czas 10.06 (90 min) i 12.06 (22 min) zawyżone przez karty zostawione otwarte.
† **Wizyty zaang./eng. rate dla 12.06 jeszcze się przeliczają** w GA4 (`engagedSessions` dochodzi z opóźnieniem). 11.06 doszedł do **76%**, 09.06 do **95%** — 10.06 wciąż pokazuje zaniżone 4 zaang. (realnie ~80%, bo 20 ukończonych sesji).
**07–11.06 to mocna passa:** 21 / 17 / 29 / 21 / 12 userów i 402 / 409 / 509 / 339 / 185 odpowiedzi — 09.06 najmocniejszy (95% eng., 32 ukończone sesje). Retencja wysoka (powracający 43–76%).

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **172** (169 nowych) |
| Wizyty (sesje GA) | **355** (288 zaang. → 81% eng. rate) |
| Śr. czas wizyty | **10,5 min** |
| Odsłony / eventy | 3 193 / 11 178 |
| Odpowiedzi na pytania | 3 809 (≈36 / aktywnego usera) |
| Completion rate (sesje nauki) | ~67% (233 / 347) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 172 | 100% |
| Zaczął sesję nauki | 117 | 68% |
| Odpowiedział ≥1 pytanie | 106 | 62% |
| Ukończył ≥1 sesję nauki | 79 | 46% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 190 | 112 |
| Direct | 135 | 49 |
| Referral | 23 | 10 |
| Unassigned | 7 | 5 |

**Top źródła:** (direct) (135), lm.facebook.com (103), facebook.com (40), (not set) (24), l.facebook.com (19), m.facebook.com (19).
**Urządzenia:** mobile 145 / desktop 30 (**83% mobile**).
**Top miasta:** Warszawa 49, Kraków 11, Katowice 10, Poznań 10, Wrocław 9.

ℹ️ Direct mocno rośnie — **135 wizyt (49 userów)**, drugie po Organic Social i coraz bliżej; powroty z zakładki/PWA, spójne z wysoką retencją (baza wraca, choć nowych z FB prawie nie ma). Facebook nadal niemal cały ruch pozyskaniowy (lm/m/l/facebook.com ≈ 181 wizyt). Organic Search ledwo drgnął (3 wizyty) — SEO praktycznie zero. dywersyfikacja poza FB nadal nie ruszyła. Wzrost wyhamował, ale baza mocno wraca (Direct rośnie z dnia na dzień).

---

## 4. Skuteczność per typ pytania

> Pokazuje, które typy zadań ludzie „mielą" (niska skuteczność = kandydat do poprawy treści/wyjaśnień). Dane z `question_answered` (`question_type` + `is_correct`).
> ✅ **Naprawione i potwierdzone 2026-06-08 (po deployu).** Root cause: tag GA4 w GTM nie przekazywał parametrów z `dataLayer` — naprawione przez wysyłkę zdarzeń przez `gtag()` (parametry lecą automatycznie; wymiary były zarejestrowane od początku). Po deployu **realne wartości spływają** — tabela poniżej wypełniona pierwszą próbką (06.08, ~110 odpowiedzi z czytelnym typem). Małe N na typ → kierunkowo; pełny obraz po uzbieraniu kilku dób post-deploy.

| Typ | Nazwa | Odpowiedzi | Poprawne | Skuteczność |
|---|---|---|---|---|
| 1 | Analogia słowna — macierz | 92 | 64 | 70% |
| 2 | Wspólny wyraz | 89 | 56 | **63%** |
| 3 | Związek przyczynowo-skutkowy | 98 | 68 | 69% |
| 4 | Analogia zdaniowa | 88 | 49 | **56%** |
| 5 | Wnioskowanie logiczne | 425 | 356 | 84% |
| 6 | Zadanie numeryczne | 96 | 76 | 79% |
| 7 | Analiza wykresu | 91 | 78 | 86% |
| 8 | Powiązania figur | 94 | 73 | 78% |

### Skuteczność wg poziomu trudności (`question_difficulty`)
> `question_difficulty` działa od deployu 2026-06-10 — 2 pełne doby (06.10–06.11, 406 odpowiedzi z poziomem).

| Poziom | Odpowiedzi | Poprawne | Skuteczność |
|---|---|---|---|
| Easy | 144 | 104 | 72% |
| Hard | 262 | 193 | 74% |

ℹ️ **Niespodzianka utrzymuje się: hard NIE jest trudniejszy** — easy 72% vs hard 74% (statystycznie to samo, jak nie odwrotnie). „Trudniejsze" pytania robią pewnie bardziej zaawansowani userzy, co wyrównuje skuteczność. Wniosek produktowy: **etykieta poziomu mówi więcej o tym KTO je robi niż o realnej trudności** — sama skuteczność nie różnicuje. Warto połączyć z typem (czy słaby typ 2/4 zależy od poziomu).

> 🟢 **3 pełne doby (06.08–06.10 = 1073 odpowiedzi z typem).** Próbka solidna (88–425 na typ). Wyraźny wzorzec: **typy słowno-analogiczne najtrudniejsze** — **typ 2 „Wspólny wyraz" (60%)**, **typ 4 „Analogia zdaniowa" (60%)**, a także typ 1 i 3 (po 70%). Najłatwiejsze: typ 7 „Analiza wykresu" (89%), 5 „Wnioskowanie" (87%), 6 „Zadanie numeryczne" (86%). **Priorytet przeglądu treści/wyjaśnień: typy 2 i 4.** (Skuteczność spadła vs poprzedni odczyt, bo poprzednia próbka 06.08 była mała i zawyżona — większe N urealnia.)
>
> 📊 **Poziom trudności:** wymiar `question_difficulty` (`easy`/`hard`) jest **zarejestrowany w GA4 ✅**, ale wciąż zwraca `(not set)` — zmiana w kodzie dodająca ten parametr do `question_answered` **nie jest jeszcze wdrożona** (08.06 zdeployowano tylko fix gtag z `is_correct`/`question_type`). Po deployu `index.html` zacznie spływać easy/hard i dołożę rozbicie skuteczności **per typ × poziom** (np. czy niska skuteczność typu 2/4 bierze się z wariantu hard).

---

## 5. Donejty (cel: 100 zł) 💰

| | Wartość |
|---|---|
| `donation_clicked` (kliknięcia) | **7** (7 userów) |
| Klik→user CTR | 4,3% wszystkich userów |
| **Realne wpłaty (ręcznie)** | **0 zł / 100 zł** |
| **Klik→wpłata** (ręcznie) | 0% (0 wpłat / 7 kliknięć) |

⚠️ **GA widzi tylko kliknięcie, nie wpłatę** (Ko-fi/Revolut to osobne strony). Realne złotówki + współczynnik klik→wpłata uzupełniaj ręcznie z dashboardów: [Ko-fi](https://ko-fi.com/sprawdzianumiejetnosci) + Revolut.

### Kliknięcia wg lokalizacji przycisku (`source`)
✅ `source` jest zarejestrowany (scope Event), ale wszystkie `donation_clicked` zwracają `(not set)` — **ta sama przyczyna co w sekcji 4**: tag GA4 w GTM nie przekazywał parametrów (naprawione 2026-06-08 — zdarzenia przez `gtag()`). Breakdown wypełni się przy nowych kliknięciach **po deployu** (wartości: `about`, `revolut`, `widget`, `widget_revolut`).

| source | Kliknięcia |
|---|---|
| — | — |

---

## 6. PWA — instalacje i użycie jako aplikacja 📱

> Ilu userów realnie „przykleiło" serwis jako appkę na ekranie głównym. Dane z eventów `pwa_*` (instalacja, uruchomienia w trybie standalone, lejek promptu). Narastająco od premiery.

| Metryka | Userzy | Eventy |
|---|---|---|
| **Zainstalowane PWA** (`pwa_installed`) | **5** | 8 |
| **Używa jako appka** — uruchomienia standalone (`pwa_launched_standalone`) | **4** | 20 |
| Wejścia z in-app webview, np. FB (`pwa_inapp_detected`) | 27 | 27 |

**Lejek promptu instalacji:**
| Krok | Userzy | Eventy |
|---|---|---|
| Prompt pokazany (`pwa_prompt_shown`) | 23 | 40 |
| Prompt kliknięty (`pwa_prompt_clicked`) | 5 | 5 |
| Instalacja zaakceptowana (`pwa_install_accepted`) | 2 | 2 |
| Instalacja odrzucona (`pwa_install_dismissed`) | 1 | 1 |
| Prompt odłożony / snooze (`pwa_prompt_snoozed`) | 37 | 38 |
| Podpowiedź „otwórz w przeglądarce" (`pwa_open_in_browser_hint_shown`) | 27 | 34 |

ℹ️ **5 userów zainstalowało, 4 używa jako appki** (19 uruchomień standalone → realnie wracają). To ~2,5% ze 162 userów — mało, ale najbardziej „lojalna" grupa. Lejek promptu: z 21 userów z promptem kliknęło 5, zaakceptowało 2, odrzucił 1 → część instalacji poszła „cicho" (natywne menu przeglądarki / `appinstalled`, nie nasz prompt). Aż **32 userów odłożyło prompt (snooze)** — prompt pokazuje się, ale konwertuje słabo.

> `pwa_method` (`appinstalled` vs `standalone_detected`) zarejestrowany 2026-06-10, wysyłany od deployu → rozbicie instalacji wg sposobu wypełni się przy kolejnych aktualizacjach (teraz za mało nowych instalacji po deployu).

---

## 7. Feedback — ankieta 👍/👎 + polecenia 💬

> Flow satysfakcji na ekranie wyników (widget 👍/👎 + modal z poleceniem strony). Wdrożony 2026-06-10. Eventy `feedback_*`. **Liczby zdarzeń działają od razu; rozkład 👍/👎 i kanały — od deployu wymiarów (2026-06-10), wypełnią się „do przodu".**

| Metryka | Userzy | Eventy |
|---|---|---|
| **Głosy 👍/👎** (`feedback_vote`) | **2** | 2 |
| Modal otwarty (`feedback_modal_opened`) | 5 | 5 |
| Modal porzucony (`feedback_modal_dismissed`) | 4 | 4 |
| **Wysłany komentarz** (`feedback_submitted`) | **1** | 1 |
| Kliknięcia udostępnienia (`feedback_share_clicked`) | 0 | 0 |

### Rozkład sentymentu (`feedback_sentiment`)
✅ wymiar zarejestrowany 2026-06-10, wysyłany od deployu — wypełni się „do przodu".

| Sentyment | Liczba |
|---|---|
| 👍 positive | — |
| 👎 negative | — |

### Udostępnienia wg kanału (`feedback_channel`)
✅ wymiar zarejestrowany — wypełni się przy pierwszych share'ach.

| Kanał | Kliknięcia |
|---|---|
| — | — |

ℹ️ **Zaangażowanie w ankietę na razie znikome** — przez cały okres tylko 2 głosy, 1 komentarz, 0 udostępnień (część może być testem własnym; flow live dopiero od 10.06). **Treść 1 komentarza przyszła mailem przez Web3Forms — sprawdź skrzynkę.** Czy proaktywny modal (pokazywany po ≥45 odpowiedziach bez głosu) realnie konwertuje, oceni się po kilku dniach. Rozkład 👍/👎 i kanały udostępnień zacznę raportować, gdy `feedback_sentiment`/`feedback_channel` uzbierają dane.

---

## 8. Notatki / ograniczenia

- **Zgłoszenia błędów (13 łącznie: 4 w dn. 06-03 + 7 w dn. 06-07 + 2 w dn. 06-08):** `question_id` było `(not set)` do 06-07 (luka w trackingu — naprawiona 2026-06-08, zob. sekcja 4). **Od deployu działa:** 2 zgłoszenia z 06-08 mają realne ID — `h_t3_020` (to **test weryfikacyjny** podczas wdrożenia fixu, nie realny user) i `e_t7_037` (typ 7 „Analiza wykresu" — wygląda na realne zgłoszenie). 11 wcześniejszych ID jest nieodzyskiwalnych. Dodatkowo `error_reported` odpala `mailto:` (michal@kutra.pl), który user musi ręcznie wysłać — stąd event w GA bywa bez maila.
- **Custom dimensions zarejestrowane (scope Event):** `question_id`, `question_index`, `question_type`.
- **Do dorejestrowania (odblokowuje sekcje 4 i 5):** `is_correct` (skuteczność per typ), `source` (źródło donejtu). Oba: scope Event, nazwa parametru = nazwa wymiaru.
- **Wiralność:** `result_shared` pojawi się po wdrożeniu „Podziel się wynikiem" (BACKLOG) — wtedy wiersz w sekcji 1 zacznie się wypełniać.
- **PWA:** sekcja 6 z eventów `pwa_installed` (`method`), `pwa_launched_standalone`, `pwa_inapp_detected`, `pwa_prompt_shown/clicked/snoozed`, `pwa_install_accepted/dismissed`, `pwa_open_in_browser_hint_shown`, `pwa_instructions_opened`. `method` (sposób instalacji) niezarejestrowany jako wymiar → rozbicie instalacji niedostępne (do dorejestrowania, scope Event).
- Eventy własne: `session_started`, `question_answered` (`question_type`, `question_difficulty` od 2026-06-08, `is_correct`, `question_index`, `time_spent_sec`), `session_completed`, `session_aborted`, `error_reported`, `donation_clicked` (`source`), `screen_view`, eventy `pwa_*` (wyżej).
- **Do dorejestrowania w GA4 (Admin → Custom definitions, event scope):** `question_difficulty` (rozbicie skuteczności per typ × poziom w sekcji 4). Bez rejestracji parametr leci, ale nie pojawi się w raportach.
