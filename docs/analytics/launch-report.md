# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-08 · **Dane od:** 2026-06-03 (premiera)
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

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 | 2026-06-06 | 2026-06-07 | 2026-06-08 ⚠️ |
|---|---|---|---|---|---|---|
| **— Wzrost —** | | | | | | |
| Użytkownicy | 74 | 34 | 24 | 17 | 21 | 17 |
| Nowi | 71 | 24 | 14 | 8 | 12 | 6 |
| Powracający | 3 | 10 | 10 | 9 | 9 | 11 |
| Powracający % | 4% | 29% | 42% | 53% | 43% | 65% |
| **— Wizyty (ruch na stronie) —** | | | | | | |
| Wizyty (sesje GA) | 99 | 43 | 31 | 25 | 27 | 32 |
| Wizyty zaang. | 82 | 33 | 26 | 21 | 20 | 7 |
| Engagement rate | 83% | 77% | 84% | 84% | 74% | 22% |
| Śr. czas wizyty | 8,8 min | 8,4 min | 8,7 min | 8,5 min | 12,2 min | 40,1 min* |
| **— Nauka (quizy) —** | | | | | | |
| Odpowiedzi (`question_answered`) | 909 | 436 | 380 | 194 | 402 | 329 |
| Sesje nauki — start (`session_started`) | 99 | 33 | 33 | 19 | 34 | 26 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 29 | 25 | 11 | 25 | 18 |
| Completion rate | 54% | 88% | 76% | 58% | 74% | 69% |
| Porzucone | 13 | 1 | 4 | 3 | 3 | 2 |
| Abort rate | 13% | 3% | 12% | 16% | 9% | 8% |
| **— Sygnały —** | | | | | | |
| Donate kliki | 4 | 1 | 2 | 0 | 0 | 0 |
| Zgłoszenia błędu | 4 | 0 | 0 | 0 | 7 | 2 |
| Udostępnienia (`result_shared`) | — | — | — | — | — | — |

\* 08.06 niepełny dzień — metryki z małej próbki (17 userów) są niestabilne (śr. czas 40,1 min mocno zawyżony przez pojedyncze długie sesje, eng. rate zaniżony); ustabilizują się po pełnej dobie. Pięć wcześniejszych dni to pełne doby. **07.06 odbił** (21 userów / 402 odpowiedzi — drugi najmocniejszy dzień po premierze) oraz przyniósł **7 zgłoszeń błędu** (poprzednie dni 0). Retencja wysoka (powracający 43–65% w ostatnich dniach).

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **136** (133 nowych) |
| Wizyty (sesje GA) | **257** (189 zaang. → 74% eng. rate) |
| Śr. czas wizyty | **13,0 min** |
| Odsłony / eventy | 2 267 / 8 468 |
| Odpowiedzi na pytania | 2 650 (≈32 / aktywnego usera) |
| Completion rate (sesje nauki) | ~66% (161 / 244) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 136 | 100% |
| Zaczął sesję nauki | 93 | 68% |
| Odpowiedział ≥1 pytanie | 83 | 61% |
| Ukończył ≥1 sesję nauki | 59 | 43% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 134 | 91 |
| Direct | 92 | 37 |
| Referral | 19 | 8 |
| Unassigned | 17 | 13 |

**Top źródła:** (direct) (92), lm.facebook.com (73), facebook.com (35), (not set) (17), m.facebook.com (14), l.facebook.com (12).
**Urządzenia:** mobile 115 / desktop 23 (**83% mobile**).
**Top miasta:** Warszawa 37, Kraków 9, Łódź 8, Wrocław 8, Poznań 7.

ℹ️ Direct wyszedł na **najsilniejsze źródło wizyt (92, 37 userów)** — powroty z zakładki/PWA, spójne z wysoką retencją. Facebook nadal niemal cały ruch pozyskaniowy (lm/m/l/facebook.com ≈ 132 wizyty). Pojawił się pierwszy ślad **Organic Search (2 wizyty)** — SEO ledwo drgnęło. wykop.pl wypadł z top 6 — dywersyfikacja poza FB nadal nie ruszyła. Nowych userów mało (12 dziennie 06.07), wzrost wyhamował, ale baza wraca.

---

## 4. Skuteczność per typ pytania

> Pokazuje, które typy zadań ludzie „mielą" (niska skuteczność = kandydat do poprawy treści/wyjaśnień). Dane z `question_answered` (`question_type` + `is_correct`).
> ✅ **Naprawione i potwierdzone 2026-06-08 (po deployu).** Root cause: tag GA4 w GTM nie przekazywał parametrów z `dataLayer` — naprawione przez wysyłkę zdarzeń przez `gtag()` (parametry lecą automatycznie; wymiary były zarejestrowane od początku). Po deployu **realne wartości spływają** — tabela poniżej wypełniona pierwszą próbką (06.08, ~110 odpowiedzi z czytelnym typem). Małe N na typ → kierunkowo; pełny obraz po uzbieraniu kilku dób post-deploy.

| Typ | Nazwa | Odpowiedzi | Poprawne | Skuteczność |
|---|---|---|---|---|
| 1 | Analogia słowna — macierz | 7 | 7 | 100% |
| 2 | Wspólny wyraz | 8 | 4 | **50%** |
| 3 | Związek przyczynowo-skutkowy | 11 | 9 | 82% |
| 4 | Analogia zdaniowa | 9 | 8 | 89% |
| 5 | Wnioskowanie logiczne | 42 | 41 | 98% |
| 6 | Zadanie numeryczne | 11 | 11 | 100% |
| 7 | Analiza wykresu | 13 | 12 | 92% |
| 8 | Powiązania figur | 9 | 7 | 78% |

> 🟡 **Pierwsza próbka po fixie (tylko 06.08, ~110 odpowiedzi z czytelnym typem; 219 dnia jeszcze w przetwarzaniu).** Małe N na typ (7–42) — traktuj kierunkowo, nie jako twardy wynik. Sygnał do obserwacji: **typ 2 „Wspólny wyraz" (50%)** i typ 8 „Powiązania figur" (78%) wyraźnie niżej niż reszta (82–100%) → kandydaci do przeglądu treści/wyjaśnień, gdy uzbiera się więcej danych.
>
> 📊 **Poziom trudności:** od 2026-06-08 zdarzenie `question_answered` niesie też `question_difficulty` (`easy`/`hard`, z prefiksu ID pytania). Po deployu + zarejestrowaniu wymiaru `question_difficulty` w GA4 dołożę rozbicie skuteczności **per typ × poziom** (np. czy niska skuteczność typu 2 bierze się z wariantu hard). Działa „do przodu" — dane zaczną spływać po wdrożeniu.

---

## 5. Donejty (cel: 100 zł) 💰

| | Wartość |
|---|---|
| `donation_clicked` (kliknięcia) | **7** (7 userów) |
| Klik→user CTR | 5,1% wszystkich userów |
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
| **Zainstalowane PWA** (`pwa_installed`) | **3** | 6 |
| **Używa jako appka** — uruchomienia standalone (`pwa_launched_standalone`) | **3** | 18 |
| Wejścia z in-app webview, np. FB (`pwa_inapp_detected`) | 11 | 11 |

**Lejek promptu instalacji:**
| Krok | Userzy | Eventy |
|---|---|---|
| Prompt pokazany (`pwa_prompt_shown`) | 15 | 20 |
| Prompt kliknięty (`pwa_prompt_clicked`) | 3 | 3 |
| Instalacja zaakceptowana (`pwa_install_accepted`) | 1 | 1 |
| Instalacja odrzucona (`pwa_install_dismissed`) | 1 | 1 |
| Prompt odłożony / snooze (`pwa_prompt_snoozed`) | 19 | 19 |
| Podpowiedź „otwórz w przeglądarce" (`pwa_open_in_browser_hint_shown`) | 11 | 16 |

ℹ️ **~3 userów używa serwisu jako zainstalowanej appki** (3 instalacje = 3 userów uruchamiających standalone; 18 uruchomień → ~6 odpaleń/usera, czyli realnie wracają). To ~2,2% ze 136 userów — mało, ale to najbardziej „lojalna" grupa. Lejek promptu wąski: z 15 userów z promptem kliknęło 3, instalację zaakceptował 1, odrzucił 1 → pozostałe instalacje poszły „cicho" (natywne menu przeglądarki / `appinstalled`, nie nasz prompt). Aż **19 userów odłożyło prompt (snooze)** — prompt pokazuje się, ale konwertuje słabo.

> `method` (`appinstalled` vs `standalone_detected`) niezarejestrowany jako custom dimension → bez rozbicia instalacji wg sposobu (zostaw, dopóki nie dorejestrujesz wymiaru).

---

## 7. Notatki / ograniczenia

- **Zgłoszenia błędów (13 łącznie: 4 w dn. 06-03 + 7 w dn. 06-07 + 2 w dn. 06-08):** `question_id` było `(not set)` do 06-07 (luka w trackingu — naprawiona 2026-06-08, zob. sekcja 4). **Od deployu działa:** 2 zgłoszenia z 06-08 mają realne ID — `h_t3_020` (to **test weryfikacyjny** podczas wdrożenia fixu, nie realny user) i `e_t7_037` (typ 7 „Analiza wykresu" — wygląda na realne zgłoszenie). 11 wcześniejszych ID jest nieodzyskiwalnych. Dodatkowo `error_reported` odpala `mailto:` (michal@kutra.pl), który user musi ręcznie wysłać — stąd event w GA bywa bez maila.
- **Custom dimensions zarejestrowane (scope Event):** `question_id`, `question_index`, `question_type`.
- **Do dorejestrowania (odblokowuje sekcje 4 i 5):** `is_correct` (skuteczność per typ), `source` (źródło donejtu). Oba: scope Event, nazwa parametru = nazwa wymiaru.
- **Wiralność:** `result_shared` pojawi się po wdrożeniu „Podziel się wynikiem" (BACKLOG) — wtedy wiersz w sekcji 1 zacznie się wypełniać.
- **PWA:** sekcja 6 z eventów `pwa_installed` (`method`), `pwa_launched_standalone`, `pwa_inapp_detected`, `pwa_prompt_shown/clicked/snoozed`, `pwa_install_accepted/dismissed`, `pwa_open_in_browser_hint_shown`, `pwa_instructions_opened`. `method` (sposób instalacji) niezarejestrowany jako wymiar → rozbicie instalacji niedostępne (do dorejestrowania, scope Event).
- Eventy własne: `session_started`, `question_answered` (`question_type`, `question_difficulty` od 2026-06-08, `is_correct`, `question_index`, `time_spent_sec`), `session_completed`, `session_aborted`, `error_reported`, `donation_clicked` (`source`), `screen_view`, eventy `pwa_*` (wyżej).
- **Do dorejestrowania w GA4 (Admin → Custom definitions, event scope):** `question_difficulty` (rozbicie skuteczności per typ × poziom w sekcji 4). Bez rejestracji parametr leci, ale nie pojawi się w raportach.
