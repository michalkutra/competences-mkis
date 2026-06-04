# Prompt: aktualizacja raportu launchu (GA4 przez MCP)

Skopiuj wszystko poniżej linii i wklej jako pierwszą wiadomość w **nowej sesji** Claude Code (w tym repo). Wymaga działającego serwera MCP `analytics-mcp` (Google Analytics) — jeśli nie jest załadowany, zrestartuj Claude Code (prompt ma fallback na `gcloud`).

---

Zaktualizuj raport analityki `docs/analytics/launch-report.md`. **Tylko aktualizuj ten plik** — nie twórz nowego, nie przepisuj historii ani metodologii, nie zmieniaj sekcji „Notatki". Dopisuj/odświeżaj dane.

**Źródło:** GA4 property `properties/540012122` (egzamin.kutra.pl), strefa Europe/Warsaw. Użyj narzędzi serwera MCP `analytics-mcp` (Google Analytics Data API, `runReport`). Jeśli MCP niedostępny, fallback: token z `gcloud auth application-default print-access-token` i `POST https://analyticsdata.googleapis.com/v1beta/properties/540012122:runReport`.

**Zakres dat:** `startDate: 2026-06-03`, `endDate: today`.

**Glosariusz (trzymaj te etykiety w raporcie):** GA `sessions` → **„Wizyty (sesje GA)"** (odwiedziny strony); `session_started` → **„Sesje nauki — start"** (rozpoczęte quizy); `session_completed` → **„Sesje nauki — ukończone"**. To dwa różne pojęcia — nie myl „wizyt" z „sesjami nauki".

**Najpierw sprawdź zarejestrowane custom dimensions** (`GET .../properties/540012122/customDimensions`) — od tego zależą sekcje 4 i 5. Interesują: `is_correct`, `source`.

## Zapytania

1. **Per dzień — rdzeń:** dimensions `[date]`, metrics `[totalUsers, newUsers, sessions, engagedSessions, averageSessionDuration]`, sort `date` rosnąco. (Powracający = `totalUsers − newUsers`; Powracający % = powracający/totalUsers.)
2. **Per dzień — eventy:** dimensions `[date, eventName]`, metric `[eventCount]`, filtr `eventName` in `[session_started, session_completed, session_aborted, question_answered, donation_clicked, error_reported, result_shared]`.
3. **Snapshot narastający:** metrics `[totalUsers, newUsers, sessions, engagedSessions, averageSessionDuration, screenPageViews, eventCount]` (bez wymiarów).
4. **Lejek (userzy):** dimensions `[eventName]`, metric `[totalUsers]`, filtr `eventName` in `[session_started, question_answered, session_completed]`.
5. **Pozyskanie:** `[sessionDefaultChannelGroup]` z `[sessions, totalUsers]`; oraz `[sessionSourceMedium]` z `[sessions]` (top 6).
6. **Urządzenia:** `[deviceCategory]` z `[totalUsers]`. **Geo:** `[city]` z `[totalUsers]` (top 6).
7. **Skuteczność per typ** (tylko jeśli `is_correct` zarejestrowany): dimensions `[customEvent:question_type, customEvent:is_correct]`, metric `[eventCount]`, filtr `eventName = question_answered`. Dla każdego typu: Odpowiedzi = suma, Poprawne = wiersz `is_correct=true`, Skuteczność = Poprawne/Odpowiedzi.
8. **Donejty wg source** (tylko jeśli `source` zarejestrowany): dimensions `[customEvent:source]`, metric `[eventCount]`, filtr `eventName = donation_clicked`.

## Jak zaktualizować plik

- **Sekcja 1 (Dzień po dniu) — daty są KOLUMNAMI:** dla każdego dnia z danych — jeśli kolumna z tą datą NIE istnieje, **dopisz nową kolumnę po prawej** (uzupełnij wszystkie wiersze metryk); jeśli istnieje, **nadpisz** jej wartości. Najnowszą datę oznacz `⚠️` w nagłówku + zachowaj przypis o niepełnej dobie (usuń `⚠️` z poprzedniej daty, gdy już pełna). Przelicz wiersze pochodne (Powracający %, Engagement rate, Completion rate, Abort rate, śr. czas w min z 1 miejscem). `result_shared` = `—` dopóki event nie występuje.
- **Sekcja 2 (Snapshot + Lejek):** nadpisz wartościami narastającymi.
- **Sekcja 3 (Pozyskanie):** nadpisz kanały + linijki źródła/urządzenia/miasta. W razie widocznego trendu dopisz 1 zdanie o dywersyfikacji (udział nie-FB).
- **Sekcja 4 (Skuteczność per typ):** jeśli `is_correct` zarejestrowany — wypełnij tabelę typów 1–8 z zapytania 7. Jeśli nie — zostaw `—` i nie zmieniaj notki „wymaga dorejestrowania".
- **Sekcja 5 (Donejty):** nadpisz liczbę kliknięć i CTR. Jeśli `source` zarejestrowany — wypełnij tabelkę source z zapytania 8. **NIE zmieniaj** ręcznych pól „Realne wpłaty ___ zł / 100 zł" ani „Klik→wpłata ___ %" — zostaw jak są (uzupełnia człowiek).
- **Nagłówek:** zaktualizuj „Ostatnia aktualizacja" na dzisiejszą datę.

## Zasady

- Nie commituj (zasada repo — commituje użytkownik).
- Wymiar `(not set)` lub błąd „not a valid dimension" (custom dimension niezarejestrowana) → pomiń, zostaw `—`, nie wywalaj się.
- Na końcu wypisz **skrót zmian** od ostatniej aktualizacji w 3–5 punktach: nowi userzy i trend dzienny, % powracających (retencja), dywersyfikacja źródeł, donejty (kliki + przypomnienie o ręcznym PLN), ewentualnie najsłabszy typ pytania.
