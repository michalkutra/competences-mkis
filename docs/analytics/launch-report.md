# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-04 · **Dane od:** 2026-06-03 (premiera)
> **Cel donejtów:** 100 zł łącznie
>
> 🔄 Aktualizuj promptem [`update-prompt.md`](update-prompt.md) (pobiera dane po GA4 MCP i **tylko dopisuje kolumnę / odświeża** — nie przepisuje historii).
> ⚠️ Ostatnia kolumna bywa **niepełna** (dane spływają w ciągu doby) — orientacyjnie do następnej aktualizacji.

---

## 1. Dzień po dniu

> Daty w kolumnach — skanuj wiersz (metrykę) od lewej do prawej, żeby zobaczyć trend. Nowe dni dopisują kolejne kolumny po prawej.

| Metryka | 2026-06-03 | 2026-06-04 ⚠️ |
|---|---|---|
| **— Wzrost —** | | |
| Użytkownicy | 74 | 34 |
| Nowi | 71 | 23 |
| Powracający | 3 | 11 |
| Powracający % | 4% | 32% |
| **— Wizyty (ruch na stronie) —** | | |
| Wizyty (sesje GA) | 99 | 41 |
| Wizyty zaang. | 82 | 19 |
| Engagement rate | 83% | 46% |
| Śr. czas wizyty | 8,8 min | 31,1 min* |
| **— Nauka (quizy) —** | | |
| Odpowiedzi (`question_answered`) | 909 | 380 |
| Sesje nauki — start (`session_started`) | 99 | 27 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 22 |
| Completion rate | 54% | 81% |
| Porzucone | 13 | 1 |
| Abort rate | 13% | 4% |
| **— Sygnały —** | | |
| Donate kliki | 4 | 1 |
| Zgłoszenia błędu | 4 | 0 |
| Udostępnienia (`result_shared`) | — | — |

\* 04.06 niepełny dzień — śr. czas zawyżony przez małą próbkę; engagement/abort/compl. ustabilizują się po pełnej dobie.

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **98** (94 nowych) |
| Wizyty (sesje GA) | **140** (101 zaang. → 72% eng. rate) |
| Śr. czas wizyty | **15,3 min** |
| Odsłony / eventy | 1 165 / 4 342 |
| Odpowiedzi na pytania | 1 289 (≈22 / aktywnego usera) |
| Completion rate (sesje nauki) | ~60% (75 / 126) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 98 | 100% |
| Zaczął sesję nauki | 66 | 67% |
| Odpowiedział ≥1 pytanie | 59 | 60% |
| Ukończył ≥1 sesję nauki | 39 | 40% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 88 | 71 |
| Direct | 38 | 21 |
| Unassigned | 23 | 21 |
| Referral | 13 | 6 |

**Top źródła:** lm.facebook.com (50), (direct) (38), facebook.com (25), m.facebook.com (10), **wykop.pl (5)**, l.facebook.com (3).
**Urządzenia:** mobile 89 / desktop 10 (**90% mobile**).
**Top miasta:** Warszawa 27, Wrocław 8, Katowice 6, Kraków 5, Łódź 4, Rzeszów 3.

---

## 4. Skuteczność per typ pytania

> Pokazuje, które typy zadań ludzie „mielą" (niska skuteczność = kandydat do poprawy treści/wyjaśnień). Dane z `question_answered` (`question_type` + `is_correct`).
> ⏳ **Wymaga dorejestrowania custom dimension `is_correct`** (scope Event, parametr `is_correct`) — `question_type` już jest. Do tego czasu tabela pusta.

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
| `donation_clicked` (kliknięcia) | **5** (5 userów) |
| Klik→user CTR | 5,1% wszystkich userów |
| **Realne wpłaty (ręcznie)** | **___ zł / 100 zł** |
| **Klik→wpłata** (ręcznie) | ___ % (wpłaty / 5 kliknięć) |

⚠️ **GA widzi tylko kliknięcie, nie wpłatę** (Ko-fi/Revolut to osobne strony). Realne złotówki + współczynnik klik→wpłata uzupełniaj ręcznie z dashboardów: [Ko-fi](https://ko-fi.com/sprawdzianumiejetnosci) + Revolut.

### Kliknięcia wg lokalizacji przycisku (`source`)
⏳ **Wymaga dorejestrowania custom dimension `source`** (scope Event, parametr `source`). Wartości: `about`, `revolut`, `widget`, `widget_revolut`.

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
