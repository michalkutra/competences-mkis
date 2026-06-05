# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-05 · **Dane od:** 2026-06-03 (premiera)
> **Cel donejtów:** 100 zł łącznie
>
> 🔄 Aktualizuj skillem `/aktualizuj-raport-launchu` (albo napisz „zaktualizuj raport launchu") — pobiera dane po GA4 MCP i **tylko dopisuje kolumnę / odświeża**, nie przepisuje historii.
> ⚠️ Ostatnia kolumna bywa **niepełna** (dane spływają w ciągu doby) — orientacyjnie do następnej aktualizacji.

---

## 1. Dzień po dniu

> Daty w kolumnach — skanuj wiersz (metrykę) od lewej do prawej, żeby zobaczyć trend. Nowe dni dopisują kolejne kolumny po prawej.

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 ⚠️ |
|---|---|---|---|
| **— Wzrost —** | | | |
| Użytkownicy | 74 | 34 | 8 |
| Nowi | 71 | 23 | 5 |
| Powracający | 3 | 11 | 3 |
| Powracający % | 4% | 32% | 38% |
| **— Wizyty (ruch na stronie) —** | | | |
| Wizyty (sesje GA) | 99 | 43 | 8 |
| Wizyty zaang. | 82 | 20 | 4 |
| Engagement rate | 83% | 47% | 50% |
| Śr. czas wizyty | 8,8 min | 30,5 min | 13,6 min* |
| **— Nauka (quizy) —** | | | |
| Odpowiedzi (`question_answered`) | 909 | 398 | 53 |
| Sesje nauki — start (`session_started`) | 99 | 28 | 5 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 24 | 2 |
| Completion rate | 54% | 86% | 40% |
| Porzucone | 13 | 1 | 0 |
| Abort rate | 13% | 4% | 0% |
| **— Sygnały —** | | | |
| Donate kliki | 4 | 1 | 1 |
| Zgłoszenia błędu | 4 | 0 | 0 |
| Udostępnienia (`result_shared`) | — | — | — |

\* 05.06 niepełny dzień — metryki z małej próbki (8 userów) są niestabilne; ustabilizują się po pełnej dobie. (04.06 to już pełna doba — completion rate 86%, abort 4%.)

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **103** (99 nowych) |
| Wizyty (sesje GA) | **150** (106 zaang. → 71% eng. rate) |
| Śr. czas wizyty | **15,3 min** |
| Odsłony / eventy | 1 273 / 4 686 |
| Odpowiedzi na pytania | 1 360 (≈22 / aktywnego usera) |
| Completion rate (sesje nauki) | ~60% (79 / 132) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 103 | 100% |
| Zaczął sesję nauki | 69 | 67% |
| Odpowiedział ≥1 pytanie | 63 | 61% |
| Ukończył ≥1 sesję nauki | 40 | 39% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 93 | 73 |
| Direct | 41 | 23 |
| Unassigned | 30 | 25 |
| Referral | 14 | 7 |

**Top źródła:** lm.facebook.com (54), (direct) (41), (not set) (30), facebook.com (25), m.facebook.com (11), tagassistant.google.com (6).
**Urządzenia:** mobile 93 / desktop 11 (**89% mobile**).
**Top miasta:** Warszawa 30, Wrocław 8, Katowice 6, Kraków 6, Łódź 5.

ℹ️ Ruch wciąż niemal w całości z Facebooka (lm/m/facebook.com ≈ 90 wizyt). wykop.pl wypadł z top 6 — dywersyfikacja źródeł na razie się nie utrzymała; nowych userów dochodzi mało (5 dziennie), wzrost wyhamował po pierwszym dniu.

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
| `donation_clicked` (kliknięcia) | **6** (6 userów) |
| Klik→user CTR | 5,8% wszystkich userów |
| **Realne wpłaty (ręcznie)** | **___ zł / 100 zł** |
| **Klik→wpłata** (ręcznie) | ___ % (wpłaty / 5 kliknięć) |

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
