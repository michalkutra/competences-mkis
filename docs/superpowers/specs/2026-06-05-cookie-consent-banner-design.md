# Design: Baner zgody na cookies/śledzenie (GDPR)

**Data:** 2026-06-05
**Źródło:** Analiza zgodności GDPR (2026-06-05). Wykryto, że GA4 przez GTM ładuje się domyślnie bez zgody użytkownika (model opt-out ukryty w trybie debug) — niezgodne z dyrektywą ePrivacy / GDPR, które dla analityki wymagają zgody opt-in **przed** zapisem cookies i wysłaniem zdarzeń.
**Status zakresu:** spec do BACKLOG — **nie implementujemy w tej iteracji**. Po akceptacji powstaje plan, a wpis w BACKLOG.md dostaje link do speca i planu.

## Problem

Aplikacja (`egzamin.kutra.pl`) ładuje Google Tag Manager (`GTM-KZ9NMFFK`) → GA4 (`540012122`) **domyślnie na produkcji**, chyba że ustawiony jest cookie `ksap_no_track=1` ([web/index.html](../../../web/index.html) L991-999). Ten opt-out jest dostępny wyłącznie przez tryb debug (`?debug=1`) — normalny użytkownik nie ma jak odmówić.

To narusza wymóg zgody **opt-in** dla cookies nieniezbędnych (analityka):
- GA4 zapisuje cookies (`_ga`, `_gid`) i wysyła zdarzenia behawioralne **zanim** użytkownik wyrazi zgodę.
- Brak informacji, co jest zbierane (wymóg informacyjny GDPR art. 13).
- Brak realnej możliwości odmowy w UI.

**Co NIE jest problemem:** cały localStorage aplikacji (`ksap_sessions`, `ksap_settings`, `ksap_answer_log`, `ksap_meta`, `ksap_pwa`) jest **ściśle funkcjonalny** — dane pozostają wyłącznie na urządzeniu użytkownika, nie ma backendu ani transmisji. To kwalifikuje się jako „strictly necessary" → zgoda nie jest wymagana. Jedyną rzeczą wymagającą zgody jest GA4/GTM.

## Ograniczenia

- **Zero backendu** — statyczny `web/index.html` na Netlify, PWA, stan w localStorage.
- **Timing krytyczny dla zgodności** — decyzja o załadowaniu GTM zapada synchronicznie w `<head>` (jak obecny check cookie). localStorage jest dostępny synchronicznie, więc sprawdzenie zgody może zostać tam.
- **Spójność wizualna** — vanilla CSS, te same zmienne kolorów i styl co reszta aplikacji.
- **Istniejące wzorce do reużycia:** obecny blok GTM ([web/index.html](../../../web/index.html) L989-1004), debug toggle trackingu (L2884-2895), wzorzec warunkowych widgetów na ekranach.

## Rozwiązanie

Prosty, nieblokujący baner opt-in z dwiema decyzjami (Akceptuj / Odrzuć) plus możliwością zamknięcia bez decyzji. GTM ładuje się dopiero po świadomej zgodzie.

### Mechanizm zgody

Stan przechowywany w localStorage pod kluczem `ksap_consent`:

| Wartość | Znaczenie | Baner | GTM |
|---|---|---|---|
| brak klucza | brak decyzji | pokazuje się | nie ładuje |
| `"granted"` | zgoda | schowany | ładuje (tylko produkcja) |
| `"denied"` | odmowa | schowany | nie ładuje |

**Trzy akcje użytkownika:**
- **Akceptuj** → zapisz `ksap_consent="granted"`, schowaj baner, załaduj GTM natychmiast (bez przeładowania strony).
- **Odrzuć** → zapisz `ksap_consent="denied"`, schowaj baner, GTM się nie ładuje.
- **× (zamknij)** → **nic nie zapisuje** → baner wraca przy następnej wizycie, GTM nadal nie ładuje (brak zgody = brak śledzenia).

Świadomie **bez UI do zmiany decyzji później** (YAGNI — jedna kategoria, krótkie okno życia projektu). Zmiana decyzji = wyczyszczenie danych przeglądarki.

### Odwrócenie logiki ładowania GTM

Obecny blok w `<head>` ([web/index.html](../../../web/index.html) L991-999) odwracamy:

- **Teraz:** ładuj GTM, chyba że cookie `ksap_no_track=1`.
- **Po zmianie:** ładuj GTM **tylko** gdy `localStorage.ksap_consent === "granted"` **oraz** `location.hostname === "egzamin.kutra.pl"`.
- Cookie `ksap_no_track=1` zostaje jako **twardy kill-switch dla debugowania** — gdy ustawiony, GTM nigdy nie startuje, niezależnie od zgody (override).

Ładowanie GTM wydzielone do funkcji (np. `loadGTM()`), wołanej w dwóch miejscach: (1) synchronicznie w `<head>` gdy zgoda już istnieje, (2) z handlera „Akceptuj" gdy użytkownik właśnie się zgodził.

### UI banera

- **Umiejscowienie:** pasek przyklejony do dołu ekranu, nieblokujący — aplikacja jest w pełni używalna.
- **Treść (copy ogólne o cookies/śledzeniu, nie wprost „analityka"):**
  > „Używamy plików cookie do analizy ruchu na stronie. Dane o Twoich quizach pozostają wyłącznie na Twoim urządzeniu."
  + link **„Więcej"**.
- **„Więcej"** rozwija inline sekcję z detalami (bez osobnej strony): co zbiera GA4 (anonimowe zdarzenia, lokalizacja, urządzenie), że dane sesji są lokalne, że analityka korzysta z Google. Realizuje wymóg informacyjny dla świadomej zgody.
- **Przyciski:** „Akceptuj" (primary), „Odrzuć" (secondary), „×" w rogu (zamknij bez decyzji).

### Render (timing)

- **Sprawdzenie zgody + ewentualne załadowanie GTM:** synchronicznie w `<head>`, przed jakimkolwiek żądaniem do Google.
- **Render DOM banera:** w `<body>`, po załadowaniu strony, tylko gdy `ksap_consent` jest puste (brak decyzji) i nie jest ustawiony `ksap_no_track`.

## Poza zakresem (YAGNI)

- Granularne kategorie / przełączniki zgody (jedna kategoria → zbędne).
- UI do zmiany decyzji po wyborze (link „Ustawienia prywatności").
- Osobna strona „Polityka prywatności".
- Zmiany w funkcjonalnym localStorage (`ksap_sessions` itd.) — nie wymaga zgody.
- Rezygnacja z GA4 na rzecz analityki cookieless (osobna, większa decyzja — odrzucona na rzecz banera).

## Kryteria akceptacji

1. Przy pierwszej wizycie (brak `ksap_consent`) GTM się **nie** ładuje, baner jest widoczny.
2. „Akceptuj" → GTM startuje bez przeładowania, baner znika, po odświeżeniu nie wraca.
3. „Odrzuć" → GTM nie startuje, baner znika, po odświeżeniu nie wraca.
4. „×" (zamknij) → GTM nie startuje, baner **wraca** po odświeżeniu.
5. Link „Więcej" pokazuje detale o zbieranych danych.
6. Cookie `ksap_no_track=1` nadal twardo blokuje GTM niezależnie od zgody.
7. Funkcjonalny localStorage działa bez zmian, niezależnie od decyzji.
