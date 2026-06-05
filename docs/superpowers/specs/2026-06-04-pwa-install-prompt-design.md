# Design: PWA install prompt + ochrona danych

**Data:** 2026-06-04
**Źródło:** BACKLOG.md — „Zainstaluj aplikację (PWA install prompt)" (SHOULD, ~2h) oraz „Trwałość danych (localStorage)". Wynika wprost z debugowania znikającej historii (Ewelina + Michał).
**Status zakresu:** spec do BACKLOG — po akceptacji powstaje plan, a wpis w BACKLOG.md dostaje link do speca i planu.

## Problem

Historia sesji i statystyki znikają użytkownikom. Diagnoza (2026-06-04):

- Dane żyją wyłącznie w `localStorage` (klucze `ksap_sessions`, `ksap_answer_log`, `ksap_settings`).
- Na Chrome Android storage jest „best-effort" (ulotny) i Chrome **kasuje cały origin** pod presją pamięci. Potwierdzone: na urządzeniu Michała `navigator.storage.persisted()` = **NIE** i historia przepadła; na urządzeniu Eweliny = TAK (wyższe zaangażowanie).
- `navigator.storage.persist()` jest już wołany przy starcie ([web/index.html](../../../web/index.html) ~L2410), ale Chrome **odrzuca** prośbę dla mało zaangażowanych użytkowników.
- Migracja na IndexedDB **nie pomaga** — ten sam per-origin bucket, ta sama eviction (potwierdzone w MDN „Storage quotas and eviction criteria").

**Jedyne realne dźwignie bez backendu:**
1. Doprowadzić do `persisted = TAK` → **instalacja PWA (dodanie do ekranu głównego)** to główny sygnał, po którym Chrome przyznaje trwałość.
2. Kopia poza przeglądarką → **backup eksport/import** (już wdrożony, commit `4e70db2`).

Ten projekt dokłada brakującą warstwę **„zapobiegaj"** (instalacja), obok istniejącej warstwy **„odzyskaj"** (backup).

## Dane wejściowe (GA4, 2026-06-04)

90% ruchu to mobile. Rozkład konfiguracji aktywnych użytkowników:

| Grupa | % | Możliwość instalacji |
|---|---|---|
| Chrome / Samsung Internet — Android | ~41% | ✅ natywny `beforeinstallprompt` |
| Safari iOS (prawdziwe) | ~28% | ✅ modal z instrukcją ręczną |
| **In-app webview** (Android Webview 15% + Safari in-app 3% + Chrome iOS 3%) | **~21%** | ❌ instalacja niemożliwa |
| Desktop (Chrome Mac/Win/Linux, Firefox) | ~10% | ✅ Chrome/Edge natywnie; reszta pomijamy |

**Wniosek:** ~1/5 użytkowników jest w przeglądarce wbudowanej w aplikację (najpewniej link z Facebooka). Tam instalacja jest niemożliwa **i** storage jest najbardziej ulotny. Po planowanym poście na grupie FB (~700 osób) ta grupa urośnie. Dlatego potrzebna jest osobna, trzecia gałąź: **„Otwórz w prawdziwej przeglądarce"**.

## Ograniczenia

- **Zero backendu** — statyczny `web/index.html` na Netlify (`egzamin.kutra.pl`), PWA, dane w localStorage.
- **iOS nie daje API instalacji** — żaden `beforeinstallprompt`, żaden `appinstalled`. Tylko instrukcja ręczna; wykrycie instalacji jedynie jako proxy przez `display-mode: standalone`.
- **In-app webview / Chrome iOS** — instalacja niemożliwa, można tylko zachęcić do otwarcia w prawdziwej przeglądarce.
- **GTM ładuje się TYLKO na produkcji** (`location.hostname === 'egzamin.kutra.pl'`, ~L992). Eventy `pwa_*` poza prod trafią do pustej tablicy `dataLayer` i nigdzie nie polecą → **metryki PWA weryfikujemy dopiero na prod**.
- Reużywane wzorce: klasy przycisków `button.ghost` / `button.btn-sm` (~L65, L72), wzorzec `dataLayer.push({event:...})`, ekrany jako `<div class="screen">` + `showScreen()`.

## Współistnienie z backupem (commit `4e70db2`)

Analiza kompatybilności wykazała **brak konfliktów blokujących**. Ustalenia, których implementacja musi przestrzegać:

1. **Ekran wyników `#screen-summary` (~L1078) nie ma boksu backupu** → karta PWA po sesji ląduje tam (wolne miejsce).
2. **Karty PWA NIE dodajemy na Historii/Statystykach** — tam są już boksy backupu; unikamy przeładowania.
3. **Ostrzeżenie w „O aplikacji" (~L1159) już zostało rozbudowane** o odnośnik do backupu. Instalację **wplatamy w ten sam boks** jako *główną* ochronę — nie tworzymy osobnego bloku, żeby nie było dwóch konkurujących komunikatów „dane mogą zniknąć".
4. **`updateBackupNotes(isPersisted)` (~L2382)** jest wpięty w callback `ksap_meta` (~L1390) i zmienia ton notek backupu wg `persisted`. Implementacja PWA:
   - **musi zachować** to wywołanie,
   - **po udanej instalacji / `persist()`** ponownie sprawdza `persisted()` i woła `updateBackupNotes(true)`, żeby boksy backupu na żywo zmieniły ton na „ryzyko małe".
5. **Brak kolizji kluczy** — nowy klucz `ksap_pwa`; backup używa `ksap_sessions`/`answer_log`/`settings` i świadomie **nie** eksportuje `ksap_meta`/`ksap_pwa` (dane per-urządzenie) — zostaje tak.

## Rozwiązanie

### Komponent: moduł `pwaInstall` (inline w index.html)

Jeden moduł JS (spójnie z resztą — wszystko inline), o jednej odpowiedzialności: wykryć kontekst, pokazać właściwy wariant zachęty, zmierzyć etapy. Zależności: `localStorage` (`ksap_pwa`), `dataLayer`, `updateBackupNotes`, `navigator.storage.persist`.

### Wykrywanie gałęzi (kolejność decyzji)

1. **Tryb standalone** (`matchMedia('(display-mode: standalone)')` lub `navigator.standalone`) → apka już zainstalowana → nic nie pokazuj; przy starcie wyślij `pwa_launched_standalone` (+ jednorazowo `pwa_installed { method: 'standalone_detected' }`, jeśli wcześniej nie odnotowano).
2. **`beforeinstallprompt` przechwycone** → gałąź **natywna** (Android Chrome/Samsung, desktop Chrome/Edge). Zapamiętaj zdarzenie do późniejszego `prompt()`.
3. **iOS Safari prawdziwe** (`/iP(hone|ad|od)/` i NIE `CriOS`/`FxiOS`/in-app) → gałąź **instrukcja iOS** (modal).
4. **In-app webview** (UA zawiera `wv`, `FBAN`, `FB_IAB`, `Instagram`, `Line`, itp.) **lub Chrome iOS** (`CriOS`) → gałąź **„Otwórz w przeglądarce"**.
5. Nic nie pasuje i brak `beforeinstallprompt` → nie pokazuj.

### Triggery i częstotliwość

- **Po ukończonej sesji** (`#screen-summary`): karta inline (nie blokujący modal — „delikatnie"). Pokaż gdy: nie-standalone **i** brak `ksap_pwa.installed` **i** (`!dismissedUntil` lub `teraz > dismissedUntil`).
- **Stałe wejście**: przycisk „📲 Zainstaluj aplikację" w menu (hamburger) oraz w boksie ostrzeżenia w „O aplikacji". Zawsze dostępne (gdy nie-standalone), niezależnie od ciszy.
- **Cisza po odrzuceniu**: klik „Może później" → `ksap_pwa.dismissedUntil = teraz + 4 dni`. (Świadomie akceptujemy, że eviction wyzeruje ten klucz — wtedy ponowna zachęta jest wręcz pożądana.)

### Akcje per gałąź

- **Natywna:** „Zainstaluj" → `deferredPrompt.prompt()` → `userChoice` (`accepted`/`dismissed`). Nasłuch globalnego `appinstalled` → `ksap_pwa.installed = true`, `persist()`, `updateBackupNotes(true)`. Jeśli `beforeinstallprompt` nie przyszło na Androidzie → fallback: instrukcja „Menu Chrome ⋮ → Dodaj do ekranu głównego".
- **Instrukcja iOS:** „Zainstaluj" → modal: Udostępnij ⬆️ → „Dodaj do ekranu głównego" → „Dodaj". Instalacji nie wykryjemy wprost (proxy: `standalone` przy następnym starcie).
- **„Otwórz w przeglądarce":** brak przycisku „Zainstaluj"; podpowiedź jak otworzyć stronę w Chrome/Safari (menu ⋯ → „Otwórz w przeglądarce"), z wyjaśnieniem że tu dane łatwo znikają.

### Treści (PL, ton osobisty)

**Karta na wynikach (gałąź instalowalna / iOS):**
> **📲 Nie strać swojej historii**
> Dodaj aplikację do ekranu głównego — to znacznie zmniejsza ryzyko, że przeglądarka usunie Twoją historię i statystyki.
> `[Zainstaluj]` `[Może później]`

**Modal iOS:**
> **Dodaj do ekranu głównego (iPhone)**
> 1. Dotknij **Udostępnij** ⬆️ na dole Safari
> 2. Wybierz **„Dodaj do ekranu głównego"**
> 3. Potwierdź **„Dodaj"**
> Dzięki temu aplikacja zachowa Twoją historię i odpala się jak zwykła apka.

**Wariant „Otwórz w przeglądarce" (in-app / Chrome iOS):**
> **📲 Otwórz w prawdziwej przeglądarce**
> Korzystasz z przeglądarki wbudowanej w aplikację (np. Facebook) — tutaj Twoja historia łatwo znika. Otwórz stronę w Chrome/Safari (menu **⋯** → „Otwórz w przeglądarce"), a potem dodaj ją do ekranu głównego.

**„O aplikacji" — scalenie z istniejącym ostrzeżeniem (~L1159):** zachować obecne zdanie o backupie i dopisać instalację jako *główną* ochronę:
> **Najlepsza ochrona:** dodaj aplikację do ekranu głównego `[📲 Zainstaluj aplikację]` — przeglądarka traktuje wtedy dane jako trwałe i znacznie rzadziej je usuwa. Dodatkowo co jakiś czas pobierz kopię (Historia / Statystyki).

### Pomiar (GTM dataLayer)

Wszystkie z parametrami `platform` (`android`/`ios`/`inapp`/`desktop`) i `placement` (`results`/`menu`/`about`) gdzie sensowne:

| Event | Kiedy |
|---|---|
| `pwa_prompt_shown` | pokazano kartę/przycisk instalacji |
| `pwa_prompt_clicked` | klik „Zainstaluj" / „Jak zainstalować" |
| `pwa_install_accepted` / `pwa_install_dismissed` | wynik natywnego dialogu (Android/desktop) |
| `pwa_instructions_opened` | otwarto modal instrukcji (iOS) |
| `pwa_prompt_snoozed` | klik „Może później" |
| `pwa_inapp_detected` | wykryto in-app webview / Chrome iOS |
| `pwa_open_in_browser_hint_shown` | pokazano podpowiedź „Otwórz w przeglądarce" |
| `pwa_installed` | `appinstalled` (Android) lub proxy `standalone_detected` (iOS) |
| `pwa_launched_standalone` | start apki w trybie standalone |

Pokrywa trzy poziomy z wymagań: **zobaczył** (`pwa_prompt_shown`) / **zainstalował** (`pwa_installed`) / **w najgorszym razie otworzył instrukcję** (`pwa_instructions_opened`).

### Stan w localStorage

`ksap_pwa = { installed: bool, dismissedUntil: ISOString|null }`. Odczyt/zapis owinięty w try/catch (jak reszta).

## Czego NIE robimy (YAGNI)

- Bez backendu, kont, IndexedDB (potwierdzone: nie pomaga na eviction), powiadomień push.
- Nie ruszamy istniejącego `persist()` przy starcie ani logiki backupu — tylko się z nimi integrujemy.
- Karty PWA nie ma na Historii/Statystykach.

## Testowanie

- **Wykrywanie gałęzi**: ręczny przegląd przez podmianę UA (DevTools device mode) dla: Chrome Android, Safari iOS, Android Webview (`wv`/`FBAN`), Chrome iOS (`CriOS`), desktop Chrome.
- **Częstotliwość**: po „Może później" karta znika i nie wraca przez 4 dni (symulacja przez podmianę `dismissedUntil`).
- **Standalone**: po (symulowanej) instalacji karta nie pokazuje się, leci `pwa_launched_standalone`.
- **Integracja z backupem**: po `appinstalled`/persist boksy backupu zmieniają ton (`updateBackupNotes(true)`); eksport nie zawiera `ksap_pwa`.
- **Eventy**: weryfikacja `dataLayer` w konsoli (na prod — GTM Preview).

## Otwarte kwestie (do planu)

- Dokładny subzbiór sygnatur in-app webview do wykrycia (które tokeny UA pewne, a które ryzykowne pod false-positive).
- Czy fallback-instrukcja Androida (gdy brak `beforeinstallprompt`) jako modal czy inline tekst.
