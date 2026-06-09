# 📊 Raport launchu — egzamin.kutra.pl

> **GA4 property:** `540012122` (egzamin.kutra.pl) · **Strefa czasowa:** Europe/Warsaw
> **Ostatnia aktualizacja:** 2026-06-09 · **Dane od:** 2026-06-03 (premiera)
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

| Metryka | 2026-06-03 | 2026-06-04 | 2026-06-05 | 2026-06-06 | 2026-06-07 | 2026-06-08 | 2026-06-09 ⚠️ |
|---|---|---|---|---|---|---|---|
| **— Wzrost —** | | | | | | | |
| Użytkownicy | 74 | 34 | 24 | 17 | 21 | 17 | 20 |
| Nowi | 71 | 24 | 14 | 8 | 12 | 4 | 9 |
| Powracający | 3 | 10 | 10 | 9 | 9 | 13 | 11 |
| Powracający % | 4% | 29% | 42% | 53% | 43% | 76% | 55% |
| **— Wizyty (ruch na stronie) —** | | | | | | | |
| Wizyty (sesje GA) | 99 | 43 | 31 | 25 | 27 | 35 | 29 |
| Wizyty zaang. | 82 | 33 | 26 | 21 | 20 | 31 | 5 |
| Engagement rate | 83% | 77% | 84% | 84% | 74% | 89% | 17% |
| Śr. czas wizyty | 8,8 min | 8,4 min | 8,7 min | 8,5 min | 12,2 min | 13,4 min | 47,6 min* |
| **— Nauka (quizy) —** | | | | | | | |
| Odpowiedzi (`question_answered`) | 909 | 436 | 380 | 194 | 402 | 409 | 331 |
| Sesje nauki — start (`session_started`) | 99 | 33 | 33 | 19 | 34 | 31 | 33 |
| Sesje nauki — ukończone (`session_completed`) | 53 | 29 | 25 | 11 | 25 | 23 | 23 |
| Completion rate | 54% | 88% | 76% | 58% | 74% | 74% | 70% |
| Porzucone | 13 | 1 | 4 | 3 | 3 | 2 | 6 |
| Abort rate | 13% | 3% | 12% | 16% | 9% | 6% | 18% |
| **— Sygnały —** | | | | | | | |
| Donate kliki | 4 | 1 | 2 | 0 | 0 | 0 | 0 |
| Zgłoszenia błędu | 4 | 0 | 0 | 0 | 7 | 2 | 2 |
| Udostępnienia (`result_shared`) | — | — | — | — | — | — | — |

\* 09.06 niepełny dzień (20 userów na moment aktualizacji) — metryki niestabilne (śr. czas 47,6 min zawyżony przez karty zostawione otwarte; eng. rate zaniżony); ustabilizują się po pełnej dobie. Dni 03–08.06 to pełne doby. **07.06 odbił** (21 userów / 402 odpowiedzi) i przyniósł **7 zgłoszeń błędu**; 08.06 utrzymał poziom (17 userów / 409 odpowiedzi, eng. rate 89%). Retencja wysoka (powracający 55–76% w ostatnich dniach).

**Definicje:** ⚠️ **„Wizyty (sesje GA)"** = `sessions` z GA = odwiedziny strony — to CO INNEGO niż **„Sesje nauki"** = `session_started` = rozpoczęte quizy. · *Powracający* = Użytkownicy − Nowi · *Engagement rate* = wizyty zaang. / wizyty · *Śr. czas wizyty* = `averageSessionDuration` · *Completion rate* = `session_completed`/`session_started` (quizy) · *Abort rate* = `session_aborted`/`session_started` (quizy) · *Donate kliki* = `donation_clicked` (klik ≠ wpłata) · *Udostępnienia* = `result_shared` (po wdrożeniu „Podziel się wynikiem").

---

## 2. Snapshot KPI (narastająco, od premiery)

| KPI | Wartość |
|---|---|
| Użytkownicy łącznie | **145** (142 nowych) |
| Wizyty (sesje GA) | **287** (217 zaang. → 76% eng. rate) |
| Śr. czas wizyty | **13,6 min** |
| Odsłony / eventy | 2 627 / 9 490 |
| Odpowiedzi na pytania | 3 061 (≈34 / aktywnego usera) |
| Completion rate (sesje nauki) | ~67% (189 / 282) |

### Lejek (userzy, narastająco)
| Krok | Userzy | % wejść |
|---|---|---|
| Wszedł na stronę | 145 | 100% |
| Zaczął sesję nauki | 101 | 70% |
| Odpowiedział ≥1 pytanie | 91 | 63% |
| Ukończył ≥1 sesję nauki | 67 | 46% |

---

## 3. Pozyskanie i dywersyfikacja źródeł (narastająco)

> Sygnał wzrostu: czy poza Facebookiem rośnie organiczny zasięg (np. wykop.pl już się pojawił). Śledź udział kanałów innych niż FB w czasie.

| Kanał | Wizyty | Userzy |
|---|---|---|
| Organic Social | 159 | 98 |
| Direct | 105 | 40 |
| Unassigned | 23 | 18 |
| Referral | 20 | 8 |

**Top źródła:** (direct) (105), lm.facebook.com (87), facebook.com (38), (not set) (23), l.facebook.com (18), m.facebook.com (16).
**Urządzenia:** mobile 123 / desktop 25 (**83% mobile**).
**Top miasta:** Warszawa 40, Kraków 10, Poznań 9, Łódź 8, Wrocław 8.

ℹ️ Direct trzyma pozycję **najsilniejszego źródła wizyt (105, 40 userów)** — powroty z zakładki/PWA, spójne z wysoką retencją. Facebook nadal niemal cały ruch pozyskaniowy (lm/m/l/facebook.com ≈ 132 wizyty). Pojawił się pierwszy ślad **Organic Search (2 wizyty)** — SEO ledwo drgnęło. wykop.pl wypadł z top 6 — dywersyfikacja poza FB nadal nie ruszyła. Nowych userów mało (12 dziennie 06.07), wzrost wyhamował, ale baza wraca.

---

## 4. Skuteczność per typ pytania

> Pokazuje, które typy zadań ludzie „mielą" (niska skuteczność = kandydat do poprawy treści/wyjaśnień). Dane z `question_answered` (`question_type` + `is_correct`).
> ✅ **Naprawione i potwierdzone 2026-06-08 (po deployu).** Root cause: tag GA4 w GTM nie przekazywał parametrów z `dataLayer` — naprawione przez wysyłkę zdarzeń przez `gtag()` (parametry lecą automatycznie; wymiary były zarejestrowane od początku). Po deployu **realne wartości spływają** — tabela poniżej wypełniona pierwszą próbką (06.08, ~110 odpowiedzi z czytelnym typem). Małe N na typ → kierunkowo; pełny obraz po uzbieraniu kilku dób post-deploy.

| Typ | Nazwa | Odpowiedzi | Poprawne | Skuteczność |
|---|---|---|---|---|
| 1 | Analogia słowna — macierz | 17 | 15 | 88% |
| 2 | Wspólny wyraz | 12 | 7 | **58%** |
| 3 | Związek przyczynowo-skutkowy | 17 | 15 | 88% |
| 4 | Analogia zdaniowa | 14 | 9 | **64%** |
| 5 | Wnioskowanie logiczne | 76 | 71 | 93% |
| 6 | Zadanie numeryczne | 17 | 17 | 100% |
| 7 | Analiza wykresu | 21 | 20 | 95% |
| 8 | Powiązania figur | 16 | 14 | 88% |

> 🟡 **Pełna doba 06.08 (190 odpowiedzi z czytelnym typem; ~219 z rana 06.08 sprzed deployu fixu = bez typu, pominięte).** N na typ wciąż umiarkowane (12–76) — kierunkowo. Sygnał: **typ 2 „Wspólny wyraz" (58%)** i **typ 4 „Analogia zdaniowa" (64%)** wyraźnie niżej niż reszta (88–100%) → najmocniejsi kandydaci do przeglądu treści/wyjaśnień. Typ 8 „Powiązania figur" podciągnął do 88% (wczoraj 78% — mała próbka się ustabilizowała).
>
> 📊 **Poziom trudności:** wymiar `question_difficulty` (`easy`/`hard`) jest **zarejestrowany w GA4 ✅**, ale wciąż zwraca `(not set)` — zmiana w kodzie dodająca ten parametr do `question_answered` **nie jest jeszcze wdrożona** (08.06 zdeployowano tylko fix gtag z `is_correct`/`question_type`). Po deployu `index.html` zacznie spływać easy/hard i dołożę rozbicie skuteczności **per typ × poziom** (np. czy niska skuteczność typu 2/4 bierze się z wariantu hard).

---

## 5. Donejty (cel: 100 zł) 💰

| | Wartość |
|---|---|
| `donation_clicked` (kliknięcia) | **7** (7 userów) |
| Klik→user CTR | 4,8% wszystkich userów |
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
| **Zainstalowane PWA** (`pwa_installed`) | **4** | 7 |
| **Używa jako appka** — uruchomienia standalone (`pwa_launched_standalone`) | **3** | 18 |
| Wejścia z in-app webview, np. FB (`pwa_inapp_detected`) | 16 | 16 |

**Lejek promptu instalacji:**
| Krok | Userzy | Eventy |
|---|---|---|
| Prompt pokazany (`pwa_prompt_shown`) | 20 | 30 |
| Prompt kliknięty (`pwa_prompt_clicked`) | 5 | 5 |
| Instalacja zaakceptowana (`pwa_install_accepted`) | 2 | 2 |
| Instalacja odrzucona (`pwa_install_dismissed`) | 1 | 1 |
| Prompt odłożony / snooze (`pwa_prompt_snoozed`) | 25 | 25 |
| Podpowiedź „otwórz w przeglądarce" (`pwa_open_in_browser_hint_shown`) | 16 | 21 |

ℹ️ **4 userów zainstalowało, 3 używa jako appki** (18 uruchomień standalone → ~6 odpaleń/usera, realnie wracają; 1 świeżo zainstalowany jeszcze nie odpalił w trybie app). To ~2,2% ze 136 userów — mało, ale najbardziej „lojalna" grupa. Lejek promptu: z 20 userów z promptem kliknęło 5, zaakceptowało 2, odrzucił 1 → część instalacji poszła „cicho" (natywne menu przeglądarki / `appinstalled`, nie nasz prompt). Aż **25 userów odłożyło prompt (snooze)** — prompt pokazuje się, ale konwertuje słabo.

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
