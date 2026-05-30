# Backlog

## Analityka (GA + GTM)

Wdrożyć Google Tag Manager jako kontener, a przez niego Google Analytics 4.

**Zdarzenia do śledzenia (poza domyślnymi GA):**

Sesje:
- rozpoczęcie sesji (tryb, poziom trudności, liczba pytań)
- ukończenie sesji (dotarcie do ekranu wyników)
- porzucenie sesji — kiedy i na którym pytaniu

Pytania:
- liczba odpowiedzi w sesji
- odpowiedź poprawna / błędna (per pytanie, per typ pytania)

Nawigacja:
- które widoki (ekrany) odwiedza użytkownik

Interakcje:
- najczęściej klikane elementy strony

**Narzędzia 3rd party przez GTM:**
- Inspectlet (nagrania sesji, heatmapy) — podłączyć przez GTM tag

---

## Autentykacja przez Google (bramka dostępu)

Przesłonić całą stronę logowaniem przez Google — bez konta brak dostępu.

**Cel:** zebranie maila użytkownika korzystającego ze strony. Nie chodzi o aktywne zapisywanie stanu sesji w bazie.

**Otwarte pytania:**
- Czy da się bez backendu? (np. Firebase Auth / Google Identity Services działają po stronie klienta)

---

## Przycisk powrotu do poprzedniego pytania

Możliwość cofnięcia się do poprzedniego pytania i zmiany odpowiedzi.

- Do ustalenia: tylko tryb Exam, czy oba tryby (Exam + Learning)?

## Podstrona "O aplikacji"

Podstrona opisująca jak działa system i jak został stworzony.

**Do uwzględnienia:**
- opis mechaniki (tryby, pytania, ocenianie)
- informacja o sposobie powstania (tech stack, kontekst)
- **ważne:** wyraźna informacja, że postęp zapisywany jest wyłącznie lokalnie w przeglądarce — wyczyszczenie danych aplikacji lub inne urządzenie = brak synchronizacji stanu
- ta sama informacja o localStorage warto powtórzyć w UI (np. tooltip / drobna notka na ekranie głównym lub wyników)

---

## Domena i deploy

Wybrać domenę i wdrożyć aplikację publicznie.

**Do ustalenia:**
- nazwa domeny
- hosting — kandydaci: **Vercel** lub **Netlify** (darmowy tier, deploy z gita, HTTPS out of the box)

---

## System oceniania (NPS / CSAT)

Lekki widget do zbierania opinii od użytkowników — bez własnego backendu.

**Wymagania:**
- darmowy plan wystarczy
- łatwy embed (snippet JS lub iframe)
- NPS (0–10) lub CSAT (gwiazdki / emoji)
- opcjonalnie: zapis tekstowej opinii + możliwość wyświetlenia wybranych recenzji publicznie

**Kandydaci do sprawdzenia:**
- **Senja** — darmowy plan, widget embed, zbiera opinie tekstowe, ma publiczną ścianę recenzji gotową do embed
- **Testimonial.to** — podobny profil, darmowy tier, wall of love do osadzenia
- **Tally.so** — darmowy formularz NPS/CSAT, odpowiedzi w dashboardzie (bez publicznego wall)
- **Formbricks** — open-source, self-host lub cloud, NPS/CSAT out of the box

**Miejsce wyświetlania:** ekran wyników po sesji (najwyższe zaangażowanie)

---

## Przycisk "Postaw mi kawę"

Dodać przycisk donacji w odpowiednich miejscach (np. ekran wyników, stopka).

- Użyć gotowego 3rd party widgetu — bez własnego backendu
- Kandydaci: **Ko-fi**, **Buy Me a Coffee** (buymeacoffee.com) — oba mają gotowe przyciski/widgety embed
- Zintegrować jako prosty link lub embed script (nie pełna integracja)
- Miejsca do rozważenia: ekran wyników po sesji, dolna część ekranu głównego

---

## Zainstaluj aplikację (PWA install prompt)

Dodać przycisk "Zainstaluj aplikację" na ekranie głównym:

- **Android**: przechwycić `beforeinstallprompt`, podpiąć pod przycisk → natywny dialog instalacji
- **iOS**: pokazać modal z instrukcją krok po kroku (Udostępnij → Dodaj do ekranu głównego)
- Ukryć przycisk gdy appka działa już w trybie standalone (`display-mode: standalone`)

---

## Open Graph tags (preview linku na Facebooku / WhatsApp)

Gdy link do aplikacji jest wklejany na grupie, platformy pokazują kartę z podglądem. Bez OG tagów: goły URL. Z OG: tytuł, opis, miniaturka.

- Dodać `<meta property="og:title">`, `og:description`, `og:image` do `<head>`
- Obraz: można użyć istniejącej ikony lub prostego banera 1200×630px
- Koszt implementacji: ~10 linii HTML

---

## Podziel się wynikiem (share score)

Na ekranie wyników dodać przycisk "Podziel się wynikiem", który kopiuje gotową wiadomość do schowka, np.:

> "Zrobiłem 12/15 w trybie egzaminowym! 🎯 [URL]"

- Użyć `navigator.clipboard.writeText()`
- Fallback: `<textarea>` z zaznaczonym tekstem dla starszych przeglądarek
- Jedyny naturalny mechanizm który może wynieść aplikację poza pierwotną grupę docelową

---

## Odliczanie do egzaminu (countdown na home screenie)

Wyświetlać liczbę dni do egzaminu na ekranie głównym, np. "Egzamin za 28 dni".

- Data egzaminu hardcoded w kodzie (można zmienić przy kolejnym sezonie)
- Ukryć/zmienić komunikat po dniu egzaminu
- Emocjonalny hak — przypomina użytkownikom po co tu są

---

## Zgłoś błąd / zakwestionuj odpowiedź

Przy każdym pytaniu (lub na ekranie wyników) dać możliwość zgłoszenia błędu w treści pytania lub niezgody z odpowiedzią.

- Najprostszy wariant: link `mailto:` z pre-wypełnionym tematem zawierającym ID pytania
- Bez tego: niezadowoleni użytkownicy piszą negatywne komentarze na grupie zamiast do twórcy
- Ważne przy 700 użytkownikach — ktoś na pewno znajdzie błąd lub zakwestionuje odpowiedź

---

## Informacja o puli pytań na ekranie głównym lub setup

Wyświetlać ile pytań jest dostępnych w banku, np. "Pula: 80 pytań (łatwy) + 40 (trudny)".

- Pomaga użytkownikom ocenić wartość aplikacji przed pierwszą sesją
- Zapobiega rozczarowaniu ("znam już wszystkie odpowiedzi") — użytkownicy wiedzą czego się spodziewać
- Warto też sprawdzić realny rozmiar puli: przy sesjach 15-pytaniowych i małej puli użytkownicy szybko widzą powtórki
