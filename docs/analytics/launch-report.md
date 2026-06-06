# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-06 · **Dane od:** 2026-06-03 (premiera)
> **Cel donejtów:** 100 zł łącznie
>
> 🔄 Aktualizuj skillem `/aktualizuj-raport-launchu` (albo napisz „zaktualizuj raport launchu") — pobiera dane po GA4 MCP i **tylko dopisuje kolumnę / odświeża**, nie przepisuje historii.
> ⚠️ Ostatnia kolumna bywa **niepełna** (dane spływają w ciągu doby) — orientacyjnie do następnej aktualizacji.

---

## 0. Kontekst zasięgu (jak czytać te liczby)

> **Aktualizacja 2026-06-05** — zweryfikowany rynek i realny zasięg launchu. Zmienia interpretację wszystkich metryk poniżej.

| | Wcześniejsze założenie | Rzeczywistość |
|---|---|---|
| Populacja zdających (rynek) | ~700 | **~940 osób** zgłoszonych do egzaminu KSAP |
| Zasięg postu launchowego | ~700 (1 grupa FB) | **2 grupy: 56 + 86 = max ~142**, realnie **~90–140 unikalnych** (grupy mogą się pokrywać) |

**Dlaczego to ważne — liczby wyglądają DUŻO lepiej, niż sugeruje surowy „103 userów":**
- 🎯 **Niemal saturacja osiągalnej widowni:** 103 userów z realnego zasięgu ~90–140 osób grup FB → dotarliśmy do **~70–100%** ludzi, do których w ogóle mógł trafić post. To nie „mało userów" — to wyczerpanie kanału.
- 🚀 **Ogromny zapas wzrostu:** wobec ~940 zdających to dopiero **~11% penetracji rynku**. Pozostałe ~800 osób jest poza zasięgiem dotychczasowych grup → **główna dźwignia to wyjście poza grupy FB** (stąd waga „Podziel się wynikiem", sekcja BACKLOG).
- ⚖️ Realny zasięg był **~5× mniejszy** niż zakładane „~700" — więc wszystkie współczynniki konwersji/zaangażowania liczone „per dotarty" są odpowiednio mocniejsze.

---

## 1. Dzień po dniu

> Daty w kolumnach — skanuj wiersz (metrykę) od lewej do prawej, żeby zobaczyć trend. Nowe dni dopisują kolejne kolumny po prawej.

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 |
|---|---|---|---|
| **— Wzrost —** | | | |
| Użytkownicy | 74 | 34 | 24 |
| Nowi | 71 | 24 | 17 |
| Powracający | 3 | 10 | 7 |
| Powracający % | 4% | 29% | 29% |
| **— Wizyty (ruch na stronie) —** | | | |
| Wizyty (sesje GA) | 99 | 43 | 31 |
| Wizyty zaang. | 82 | 33 | 15 |
| Engagement rate | 83% | 77% | 48% |
| Śr. czas wizyty | 8,8 min | 8,4 min | 30,2 min |
| **— Nauka (quizy) —** | | | |
| Odpowiedzi (`question_answered`) | 909 | 436 | 363 |
| Sesje nauki — start (`session_started`) | 99 | 33 | 32 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 29 | 22 |
| Completion rate | 54% | 88% | 69% |
| Porzucone | 13 | 1 | 4 |
| Abort rate | 13% | 3% | 13% |
| **— Sygnały —** | | | |
| Donate kliki | 4 | 1 | 2 |
| Zgłoszenia błędu | 4 | 0 | 0 |
| Udostępnienia (`result_shared`) | — | — | — |

\* Wszystkie trzy dni to już **pełne doby** (stan na 2026-06-06; 06.06 bez ruchu w momencie aktualizacji — brak kolumny). 05.06 po pełnej dobie urósł z 8 do 24 userów i 363 odpowiedzi — wcześniejsza kolumna była niepełną próbką.

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **112** (108 nowych) |
| Wizyty (sesje GA) | **173** (130 zaang. → 75% eng. rate) |
| Śr. czas wizyty | **12,6 min** |
| Odsłony / eventy | 1 590 / 5 849 |
| Odpowiedzi na pytania | 1 708 (≈24 / aktywnego usera) |
| Completion rate (sesje nauki) | ~63% (104 / 164) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 112 | 100% |
| Zaczął sesję nauki | 80 | 71% |
| Odpowiedział ≥1 pytanie | 70 | 63% |
| Ukończył ≥1 sesję nauki | 47 | 42% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 103 | 78 |
| Direct | 52 | 27 |
| Unassigned | 24 | 19 |
| Referral | 15 | 7 |

**Top źródła:** lm.facebook.com (57), (direct) (52), facebook.com (30), (not set) (24), m.facebook.com (11), wykop.pl (7).
**Urządzenia:** mobile 99 / desktop 14 (**88% mobile**).
**Top miasta:** Warszawa 31, Łódź 8, Wrocław 8, Kraków 7, Katowice 6.

ℹ️ Ruch wciąż niemal w całości z Facebooka (lm/m/facebook.com ≈ 98 wizyt). wykop.pl wrócił do top 6 (7 wizyt), ale to nadal margines — dywersyfikacja poza FB raczkuje. Nowych userów dochodzi coraz mniej (17 dziennie 05.06 vs 71 w dniu premiery), wzrost wyraźnie wyhamował po pierwszym dniu.

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
| Klik→user CTR | 6,3% wszystkich userów |
| **Realne wpłaty (ręcznie)** | **___ zł / 100 zł** |
| **Klik→wpłata** (ręcznie) | ___ % (wpłaty / 7 kliknięć) |

⚠️ **GA widzi tylko kliknięcie, nie wpłatę** (Ko-fi/Revolut to osobne strony). Realne złotówki + współczynnik klik→wpłata uzupełniaj ręcznie z dashboardów: [Ko-fi](https://ko-fi.com/sprawdzianumiejetnosci) + Revolut.

### Kliknięcia wg lokalizacji przycisku (`source`)
✅ `source` jest zarejestrowany (scope Event), ale wszystkie `donation_clicked` zwracają `(not set)` — kliknięcia sprzed rejestracji wymiaru. Breakdown wypełni się przy nowych kliknięciach (wartości: `about`, `revolut`, `widget`, `widget_revolut`).

| source | Kliknięcia |
|---|---|
| — | — |

---

## 6. Notatki / ograniczenia

- **Zgłoszenia błędów:** `question_id` czytelny od 2026-06-04. 4 zgłoszenia sprzed tej daty mają `question_id = (not set)` — nieodzyskiwalne.
- **Custom dimensions zarejestrowane (scope Event):** `question_id`, `question_index`, `question_type`.
- **Do dorejestrowania (odblokowuje sekcje 4 i 5):** `is_correct` (skuteczność per typ), `source` (źródło donejtu). Oba: scope Event, nazwa parametru = nazwa wymiaru.
- **Wiralność:** `result_shared` pojawi się po wdrożeniu „Podziel się wynikiem" (BACKLOG) — wtedy wiersz w sekcji 1 zacznie się wypełniać.
- Eventy własne: `session_started`, `question_answered` (`question_type`, `is_correct`, `question_index`, `time_spent_sec`), `session_completed`, `session_aborted`, `error_reported`, `donation_clicked` (`source`), `screen_view`.
