---
name: aktualizuj-raport-launchu
description: >-
  Use when the user wants to refresh or update the launch analytics report for
  egzamin.kutra.pl (docs/analytics/launch-report.md) from GA4. Triggers:
  "zaktualizuj/odśwież raport launchu", "zaktualizuj raport analityki/analytics",
  "update analytics report", "raport GA4". Keywords: GA4, donejty, completion
  rate, lejek, retencja, sesje nauki, launch report.
---

# Aktualizacja raportu launchu (GA4 przez MCP)

Zaktualizuj raport analityki [`docs/analytics/launch-report.md`](../../../docs/analytics/launch-report.md). **Tylko aktualizuj ten plik** — nie twórz nowego, nie przepisuj historii ani metodologii, nie zmieniaj sekcji „Notatki". Dopisuj/odświeżaj dane.

**Krok 0 — otwórz plik na początku.** Sam `launch-report.md` jest wzorcem: trzyma układ sekcji 1–5, nazwy wierszy, definicje pochodnych i ręczne pola. Zachowaj tę strukturę, nie wymyślaj własnej. Jeśli plik nie istnieje — przerwij i zapytaj użytkownika (nie twórz go od zera).

**Źródło:** GA4 property `properties/540012122` (egzamin.kutra.pl), strefa Europe/Warsaw. Użyj narzędzi serwera MCP `analytics-mcp` (Google Analytics Data API, `run_report`). Jeśli MCP niedostępny, fallback: token z `gcloud auth application-default print-access-token` i `POST https://analyticsdata.googleapis.com/v1beta/properties/540012122:runReport`. Gdy którekolwiek zwróci `401`/`Reauthentication failed` → patrz **Auth** niżej.

**Zakres dat:** `start_date: 2026-06-03`, `end_date: today`.

## Auth do GA4 (gdy zapytanie zwróci 401 / „Reauthentication failed")

Konto firmowe (`michal.kutra@itea.com.pl`) ma politykę okresowego *reauth*: token ADC żyje ~1h, a co kilka godzin odświeżenie wymaga ponownego **interaktywnego** logowania. Nie da się tego obejść nieinteraktywnie ani kontem serwisowym (GA4 blokuje dodanie konta spoza domeny). **To normalne, nie błąd konfiguracji — i nie próbuj tego naprawiać ze skilla.**

Gdy `print-access-token` albo GA4 REST zwróci `401`/`Reauthentication failed` → **poinformuj użytkownika** i poproś, by uruchomił w **swoim** terminalu (otworzy przeglądarkę; wybrać konto `itea.com.pl`):

```bash
gcloud auth application-default login \
  --client-id-file="/Users/michalkutra/Dev/competences-mkis/.ga-config/client_secret_855702922935-rffplv5flforghoc9dk2qefurjlj0jb2.apps.googleusercontent.com.json" \
  --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform
```

Po komunikacie „Credentials saved to file…" wznów pobieranie (token świeży ~1h, więc rób to tuż przed aktualizacją). Własny OAuth client (`cloud-platform` jest formalnie wymagany przez gcloud w `--scopes`, mimo że do GA4 potrzebny jest tylko `analytics.readonly`).

**Glosariusz (trzymaj te etykiety w raporcie):** GA `sessions` → **„Wizyty (sesje GA)"** (odwiedziny strony); `session_started` → **„Sesje nauki — start"** (rozpoczęte quizy); `session_completed` → **„Sesje nauki — ukończone"**. To dwa różne pojęcia — nie myl „wizyt" z „sesjami nauki".

**Najpierw sprawdź zarejestrowane custom dimensions** (`get_custom_dimensions_and_metrics`) — od tego zależą sekcje 4 i 5. Interesują: `is_correct`, `source`. Uwaga: wymiar bywa zarejestrowany, ale API zwraca dla niego wyłącznie `(not set)` (dane sprzed rejestracji się nie backfillują) — wtedy traktuj jak brak danych (zostaw `—`).

## Zapytania (`run_report`)

> Składnia: pola w snake_case (protobuf). `order_bys` → `{"dimension": {"dimension_name": "date"}}` lub `{"metric": {"metric_name": "sessions"}, "desc": true}`. Filtr eventu → `{"filter": {"field_name": "eventName", "in_list_filter": {"values": [...]}}}` albo `string_filter`.

1. **Per dzień — rdzeń:** dimensions `[date]`, metrics `[totalUsers, newUsers, sessions, engagedSessions, averageSessionDuration]`, sort `date` rosnąco. (Powracający = `totalUsers − newUsers`; Powracający % = powracający/totalUsers.)
2. **Per dzień — eventy:** dimensions `[date, eventName]`, metric `[eventCount]`, filtr `eventName` in `[session_started, session_completed, session_aborted, question_answered, donation_clicked, error_reported, result_shared]`.
3. **Snapshot narastający:** metrics `[totalUsers, newUsers, sessions, engagedSessions, averageSessionDuration, screenPageViews, eventCount]` (bez wymiarów).
4. **Lejek (userzy):** dimensions `[eventName]`, metric `[totalUsers]`, filtr `eventName` in `[session_started, question_answered, session_completed]`.
5. **Pozyskanie:** `[sessionDefaultChannelGroup]` z `[sessions, totalUsers]`; oraz `[sessionSourceMedium]` z `[sessions]` (top 6).
6. **Urządzenia:** `[deviceCategory]` z `[totalUsers]`. **Geo:** `[city]` z `[totalUsers]` (top 6).
7. **Skuteczność per typ** (tylko jeśli `is_correct` zwraca realne dane): dimensions `[customEvent:question_type, customEvent:is_correct]`, metric `[eventCount]`, filtr `eventName = question_answered`. Dla każdego typu: Odpowiedzi = suma, Poprawne = wiersz `is_correct=true`, Skuteczność = Poprawne/Odpowiedzi. **Dodaj nazwy typów** (z `TYPE_NAMES` w [web/index.html](../../../web/index.html)): 1 Analogia słowna — macierz, 2 Wspólny wyraz, 3 Związek przyczynowo-skutkowy, 4 Analogia zdaniowa, 5 Wnioskowanie logiczne, 6 Zadanie numeryczne, 7 Analiza wykresu, 8 Powiązania figur. **Rozbicie wg trudności:** dorzuć `customEvent:question_difficulty` (`easy`/`hard`) — jeśli zwraca realne dane, pokaż skuteczność per typ × poziom; jeśli `(not set)`/pusto, pomiń (parametr wysyłany od 2026-06-08, wymaga rejestracji wymiaru w GA4). Bieżący dzień bywa `""` (nieprzetworzony) — licz tylko wiersze z realnym typem.
8. **Donejty wg source** (tylko jeśli `source` zwraca realne dane): dimensions `[customEvent:source]`, metric `[eventCount]`, filtr `eventName = donation_clicked`. (Liczba userów donejtu: `[eventName]` z `[totalUsers]`, filtr `donation_clicked`.)
9. **PWA (sekcja 6):** dimensions `[eventName]`, metrics `[eventCount, totalUsers]`, filtr `eventName` in `[pwa_installed, pwa_launched_standalone, pwa_inapp_detected, pwa_prompt_shown, pwa_prompt_clicked, pwa_install_accepted, pwa_install_dismissed, pwa_prompt_snoozed, pwa_open_in_browser_hint_shown, pwa_instructions_opened]`. Kluczowe: `pwa_installed` (userzy = liczba instalacji) i `pwa_launched_standalone` (userzy = ilu używa jako appki; eventy/userzy ≈ odpaleń na usera). Rozbicie instalacji wg sposobu: `customEvent:pwa_method` (wartości od 2026-06-10).
10. **Feedback / ankieta (sekcja 7):** dimensions `[eventName]`, metrics `[eventCount, totalUsers]`, filtr `eventName` in `[feedback_vote, feedback_modal_opened, feedback_modal_dismissed, feedback_submitted, feedback_share_clicked]`. Rozkład 👍/👎: `customEvent:feedback_sentiment` (`positive`/`negative`/`none`) filtr `eventName=feedback_submitted` (lub `feedback_modal_opened`); kanały: `customEvent:feedback_channel` filtr `eventName=feedback_share_clicked`. Wymiary `feedback_*` zarejestrowane i wysyłane od 2026-06-10 — bieżący dzień bywa `""`, licz tylko niepuste. Przypomnij userowi: treść komentarzy przychodzi mailem przez Web3Forms (nie w GA).

## Część II (sprawdzian wiedzy) — od 2026-06-13

Aplikacja ma 2 części: **I — umiejętności** (typy 1-8) i **II — wiedza** (6 dziedzin). Rozróżnia je parametr **`exam_part`** (`I`/`II`) na `session_started/completed/aborted` i `question_answered`. Część II niesie `question_domain` (`pr/ap/fp/pz/oz/se`) + `question_level` (`easy/medium/hard`) zamiast `question_type`/`question_difficulty`. Nowe eventy: `error_report_opened`, `error_report_failed`.

- **Jeśli `exam_part` zarejestrowany** (sprawdź `get_custom_dimensions_and_metrics` / metadata) → w sekcjach 1-3 rozdziel I/II tam gdzie sensowne, a w **sekcji 5** wypełnij: wolumen I vs II (`exam_part` na session_started/question_answered), skuteczność per dziedzina (`customEvent:question_domain` × `is_correct`, filtr `exam_part='II'`), per poziom (`customEvent:question_level`). Dziedziny: pr Prawo, ap Administracja publiczna, fp Finanse publiczne, pz Polityka zagr., oz Organizacja, se Społ.-ekonom.
- **Jeśli niezarejestrowany** (błąd 400) → sekcje 1-3 zostają zbiorcze (I+II razem, zaznacz to), sekcja 5 zostaje scaffoldem `—`. Przypomnij userowi rejestrację `exam_part`/`question_domain`/`question_level`.
- **Sekcja 4** = wyłącznie część I (typy 1-8); odpowiedzi II nie mają `question_type` → wypadają z tej tabeli automatycznie.

## Jak zaktualizować plik

- **Sekcja 1 (Dzień po dniu) — daty są KOLUMNAMI:** dla każdego dnia z danych — jeśli kolumna z tą datą NIE istnieje, **dopisz nową kolumnę po prawej** (uzupełnij wszystkie wiersze metryk); jeśli istnieje, **nadpisz** jej wartości. Najnowszą datę oznacz `⚠️` w nagłówku + zachowaj przypis o niepełnej dobie (usuń `⚠️` z poprzedniej daty, gdy już pełna). Przelicz wiersze pochodne (Powracający %, Engagement rate, Completion rate, Abort rate, śr. czas w min z 1 miejscem). `result_shared` = `—` dopóki event nie występuje.
- **Sekcja 2 (Snapshot + Lejek):** nadpisz wartościami narastającymi.
- **Sekcja 3 (Pozyskanie):** nadpisz kanały + linijki źródła/urządzenia/miasta. W razie widocznego trendu dopisz 1 zdanie o dywersyfikacji (udział nie-FB).
- **Sekcja 4 (Skuteczność per typ):** jeśli `is_correct` zwraca realne dane — wypełnij tabelę typów 1–8 z zapytania 7. Jeśli zwraca tylko `(not set)`/pusto — zostaw `—` i zaktualizuj notkę, że wymiar jest zarejestrowany, ale dane jeszcze nie spływają.
- **Sekcja 5 (Donejty):** nadpisz liczbę kliknięć i CTR (CTR = userzy `donation_clicked` / `totalUsers` narastająco, etykieta „% wszystkich userów"). Jeśli `source` zwraca realne dane — wypełnij tabelkę source z zapytania 8. **NIE zmieniaj** ręcznych pól „Realne wpłaty ___ zł / 100 zł" ani „Klik→wpłata ___ %" — zostaw jak są (uzupełnia człowiek).
- **Sekcja 6 (PWA):** nadpisz tabele z zapytania 9 (instalacje, uruchomienia standalone, in-app, lejek promptu — userzy + eventy). Przelicz zdanie podsumowujące: ilu userów używa jako appka i jaki to % wszystkich userów (`pwa_launched_standalone` userzy / `totalUsers` narastająco). Jeśli któryś event nie występuje → `0`.
- **Sekcja 4 — rozbicie wg trudności:** podtabela Easy/Hard z `customEvent:question_difficulty` × `is_correct` (zapytanie 7). Skuteczność = poprawne/odpowiedzi per poziom. Docelowo typ × poziom, gdy uzbiera się N.
- **Sekcja 7 (Feedback):** nadpisz tabelę liczb zdarzeń (zapytanie 10). Rozkład `feedback_sentiment` (👍/👎) i `feedback_channel` — wypełniaj gdy zwracają realne wartości; inaczej zostaw `—`. Dopisz 1 zdanie o poziomie zaangażowania w ankietę.
- **Nagłówek:** zaktualizuj „Ostatnia aktualizacja" na dzisiejszą datę.
- **Social proof na stronie (`web/stats.js`):** podbij `window.SITE_STATS = { answered: N }` do narastającej sumy `question_answered` (ta sama liczba co „Odpowiedzi na pytania" w sekcji 2). To ręczny licznik social proofu na home — aktualizuj go przy każdym odświeżeniu raportu. (Zmiana wymaga commita + deployu, ale **nie commituj** — robi to użytkownik.)

## Zasady

- Nie commituj (zasada repo — commituje użytkownik).
- Wymiar `(not set)` lub błąd „not a valid dimension" (custom dimension niezarejestrowana) → pomiń, zostaw `—`, nie wywalaj się.
- Na końcu wypisz **skrót zmian** od ostatniej aktualizacji w 3–5 punktach: nowi userzy i trend dzienny, % powracających (retencja), dywersyfikacja źródeł, donejty (kliki + przypomnienie o ręcznym PLN), ewentualnie najsłabszy typ pytania.
