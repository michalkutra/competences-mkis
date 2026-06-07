# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-07 · **Dane od:** 2026-06-03 (premiera)
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

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 | 2026-06-06 |
|---|---|---|---|---|
| **— Wzrost —** | | | | |
| Użytkownicy | 74 | 34 | 24 | 17 |
| Nowi | 71 | 24 | 14 | 11 |
| Powracający | 3 | 10 | 10 | 6 |
| Powracający % | 4% | 29% | 42% | 35% |
| **— Wizyty (ruch na stronie) —** | | | | |
| Wizyty (sesje GA) | 99 | 43 | 31 | 25 |
| Wizyty zaang. | 82 | 33 | 26 | 12 |
| Engagement rate | 83% | 77% | 84% | 48% |
| Śr. czas wizyty | 8,8 min | 8,4 min | 8,7 min | 23,4 min |
| **— Nauka (quizy) —** | | | | |
| Odpowiedzi (`question_answered`) | 909 | 436 | 380 | 190 |
| Sesje nauki — start (`session_started`) | 99 | 33 | 33 | 19 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 29 | 25 | 10 |
| Completion rate | 54% | 88% | 76% | 53% |
| Porzucone | 13 | 1 | 4 | 3 |
| Abort rate | 13% | 3% | 12% | 16% |
| **— Sygnały —** | | | | |
| Donate kliki | 4 | 1 | 2 | 0 |
| Zgłoszenia błędu | 4 | 0 | 0 | 0 |
| Udostępnienia (`result_shared`) | — | — | — | — |

\* Wszystkie cztery dni to **pełne doby** (stan na 2026-06-07; 06.07 bez ruchu w momencie aktualizacji — brak kolumny). 05.06 po dosynchronizowaniu danych: 24 userów / 380 odpowiedzi. Ruch dzienny wyraźnie maleje (74 → 34 → 24 → 17 userów).

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **120** (117 nowych) |
| Wizyty (sesje GA) | **198** (153 zaang. → 77% eng. rate) |
| Śr. czas wizyty | **10,6 min** |
| Odsłony / eventy | 1 782 / 6 555 |
| Odpowiedzi na pytania | 1 915 (≈26 / aktywnego usera) |
| Completion rate (sesje nauki) | ~64% (117 / 184) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 120 | 100% |
| Zaczął sesję nauki | 84 | 70% |
| Odpowiedział ≥1 pytanie | 73 | 61% |
| Ukończył ≥1 sesję nauki | 49 | 41% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 116 | 85 |
| Direct | 66 | 29 |
| Referral | 16 | 7 |
| Unassigned | 15 | 12 |

**Top źródła:** (direct) (66), lm.facebook.com (64), facebook.com (32), (not set) (15), m.facebook.com (14), tagassistant.google.com (7).
**Urządzenia:** mobile 106 / desktop 15 (**88% mobile**).
**Top miasta:** Warszawa 35, Kraków 8, Łódź 8, Wrocław 8, Katowice 6.

ℹ️ Facebook wciąż dominuje (lm/m/facebook.com ≈ 110 wizyt), ale Direct urósł do 66 wizyt (powracający z zakładki/PWA). wykop.pl wypadł z top 6, tagassistant.google.com (7) to wewnętrzne testy GTM, nie realny kanał — dywersyfikacja poza FB nadal nie ruszyła. Nowych userów coraz mniej (11 dziennie 06.06 vs 71 w dniu premiery), wzrost wyhamował.

---

## 4. Skuteczność per typ pytania

> Pokazuje, które typy zadań ludzie „mielą" (niska skuteczność = kandydat do poprawy treści/wyjaśnień). Dane z `question_answered` (`question_type` + `is_correct`).
> ✅ `is_correct` i `question_type` są zarejestrowane (scope Event), ale API zwraca dla nich wyłącznie `(not set)` na całym `question_answered` — historyczne dane sprzed rejestracji się nie backfillują, a bieżące jeszcze nie spłynęły. Tabela wypełni się danymi „do przodu" przy kolejnych aktualizacjach.

| Typ | Odpowiedzi | Poprawne | Skuteczność |
|---|---|---|---|
| 1 | — | — | — |
| 2 | — | — | — |
| 3 | — | — | — |
| 4 | — | — | — |
| 5 | — | — | — |
| 6 | — | — | — |
| 7 | — | — | — |
| 8 | — | — | — |

---

## 5. Donejty (cel: 100 zł) 💰

| | Wartość |
|---|---|
| `donation_clicked` (kliknięcia) | **7** (7 userów) |
| Klik→user CTR | 5,8% wszystkich userów |
| **Realne wpłaty (ręcznie)** | **0 zł / 100 zł** |
| **Klik→wpłata** (ręcznie) | 0% (0 wpłat / 7 kliknięć) |

⚠️ **GA widzi tylko kliknięcie, nie wpłatę** (Ko-fi/Revolut to osobne strony). Realne złotówki + współczynnik klik→wpłata uzupełniaj ręcznie z dashboardów: [Ko-fi](https://ko-fi.com/sprawdzianumiejetnosci) + Revolut.

### Kliknięcia wg lokalizacji przycisku (`source`)
✅ `source` jest zarejestrowany (scope Event), ale wszystkie `donation_clicked` zwracają `(not set)` — kliknięcia sprzed rejestracji wymiaru. Breakdown wypełni się przy nowych kliknięciach (wartości: `about`, `revolut`, `widget`, `widget_revolut`).

| source | Kliknięcia |
|---|---|
| — | — |

---

## 6. PWA — instalacje i użycie jako aplikacja 📱

> Ilu userów realnie „przykleiło" serwis jako appkę na ekranie głównym. Dane z eventów `pwa_*` (instalacja, uruchomienia w trybie standalone, lejek promptu). Narastająco od premiery.

| Metryka | Userzy | Eventy |
|---|---|---|
| **Zainstalowane PWA** (`pwa_installed`) | **3** | 6 |
| **Używa jako appka** — uruchomienia standalone (`pwa_launched_standalone`) | **3** | 16 |
| Wejścia z in-app webview, np. FB (`pwa_inapp_detected`) | 7 | 7 |

**Lejek promptu instalacji:**
| Krok | Userzy | Eventy |
|---|---|---|
| Prompt pokazany (`pwa_prompt_shown`) | 8 | 10 |
| Prompt kliknięty (`pwa_prompt_clicked`) | 2 | 2 |
| Instalacja zaakceptowana (`pwa_install_accepted`) | 1 | 1 |
| Prompt odłożony / snooze (`pwa_prompt_snoozed`) | 11 | 11 |
| Podpowiedź „otwórz w przeglądarce" (`pwa_open_in_browser_hint_shown`) | 7 | 10 |

ℹ️ **~3 userów używa serwisu jako zainstalowanej appki** (3 instalacje = 3 userów uruchamiających standalone; 16 uruchomień → ~5 odpaleń/usera, czyli realnie wracają). To ~2,5% ze 120 userów — mało, ale to najbardziej „lojalna" grupa. Lejek promptu wąski: z 8 userów z promptem kliknęło 2, przez prompt zainstalował 1 → pozostałe instalacje poszły „cicho" (natywne menu przeglądarki / `appinstalled`, nie nasz prompt). 11 userów odłożyło prompt.

> `method` (`appinstalled` vs `standalone_detected`) niezarejestrowany jako custom dimension → bez rozbicia instalacji wg sposobu (zostaw, dopóki nie dorejestrujesz wymiaru).

---

## 7. Notatki / ograniczenia

- **Zgłoszenia błędów:** `question_id` czytelny od 2026-06-04. 4 zgłoszenia sprzed tej daty mają `question_id = (not set)` — nieodzyskiwalne.
- **Custom dimensions zarejestrowane (scope Event):** `question_id`, `question_index`, `question_type`.
- **Do dorejestrowania (odblokowuje sekcje 4 i 5):** `is_correct` (skuteczność per typ), `source` (źródło donejtu). Oba: scope Event, nazwa parametru = nazwa wymiaru.
- **Wiralność:** `result_shared` pojawi się po wdrożeniu „Podziel się wynikiem" (BACKLOG) — wtedy wiersz w sekcji 1 zacznie się wypełniać.
- **PWA:** sekcja 6 z eventów `pwa_installed` (`method`), `pwa_launched_standalone`, `pwa_inapp_detected`, `pwa_prompt_shown/clicked/snoozed`, `pwa_install_accepted/dismissed`, `pwa_open_in_browser_hint_shown`, `pwa_instructions_opened`. `method` (sposób instalacji) niezarejestrowany jako wymiar → rozbicie instalacji niedostępne (do dorejestrowania, scope Event).
- Eventy własne: `session_started`, `question_answered` (`question_type`, `is_correct`, `question_index`, `time_spent_sec`), `session_completed`, `session_aborted`, `error_reported`, `donation_clicked` (`source`), `screen_view`, eventy `pwa_*` (wyżej).
