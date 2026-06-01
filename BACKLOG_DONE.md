# Backlog — Ukończone

## Domena i deploy

> **Ukończono:** 2026-06-01

Domena `egzamin.kutra.pl` skonfigurowana w OVH (CNAME → Netlify). Deploy na Netlify z automatycznym deployem z brancha `main`. HTTPS via Let's Encrypt.

---

## Odliczanie do egzaminu (countdown na home screenie)

> **Ukończono:** 2026-05-30 · [Spec](docs/superpowers/specs/2026-05-30-exam-countdown-design.md) · [Plan](docs/superpowers/plans/2026-05-30-exam-countdown.md)

Wyświetlać liczbę dni do egzaminu na ekranie głównym, np. "Egzamin za 28 dni".

- Data egzaminu hardcoded w kodzie (można zmienić przy kolejnym sezonie)
- Ukryć/zmienić komunikat po dniu egzaminu
- Emocjonalny hak — przypomina użytkownikom po co tu są

---

## Zgłoś błąd / zakwestionuj odpowiedź

> **Ukończono:** 2026-05-30 · [Spec](docs/superpowers/specs/2026-05-30-report-error-design.md) · [Plan](docs/superpowers/plans/2026-05-30-report-error.md)

Przy każdym pytaniu (lub na ekranie wyników) dać możliwość zgłoszenia błędu w treści pytania lub niezgody z odpowiedzią.

- Najprostszy wariant: link `mailto:` z pre-wypełnionym tematem zawierającym ID pytania
- Bez tego: niezadowoleni użytkownicy piszą negatywne komentarze na grupie zamiast do twórcy
- Ważne przy 700 użytkownikach — ktoś na pewno znajdzie błąd lub zakwestionuje odpowiedź

---

## Przycisk "Postaw mi kawę"

> **Ukończono:** 2026-06-01

Ko-fi widget (`ko-fi.com/sprawdzianumiejetnosci`) dodany na ekranie wyników (po 1+ sesji i wyniku ≥ 50%), w historii i statystykach (po 3+ sesjach). Tekst: "Czy ta appka pomaga Ci w nauce? Jeśli tak" + czerwony przycisk + "Tworzymy ją w wolnym czasie."

---

## Open Graph tags

> **Ukończono:** 2026-06-01

OG tagi dodane do `<head>` w index.html (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`). Dedykowany baner `og-image.png` (1200×630px) wygenerowany z ilustracji bg.png i tytułem apki. Domena: `egzamin.kutra.pl`.

---

## Routing + nawigacja przeglądarki

> **Ukończono:** 2026-06-02

History API client-side routing zaimplementowane w `web/index.html`. Każdy ekran ma własny URL (`/`, `/setup`, `/history`, `/stats`, `/about`, `/session`). Netlify redirect `/* → /index.html` dodany w `netlify.toml`. Przyciski back/forward działają. Cofnięcie się w trakcie quizu pokazuje dialog "Przerwać sesję?". Deep linki do statycznych ekranów działają.

---

## Podstrona "O aplikacji"

> **Ukończono:** 2026-06-01

Ekran `screen-about` dodany do `index.html`. Dostępny z menu (hamburger → "O aplikacji"). Zawiera:
- historyjkę powstania aplikacji (Ewelina, egzamin KSAP, brak dobrych materiałów)
- opis dwóch trybów nauki (Nauka z podpowiedziami / Egzamin bez podpowiedzi)
- listę 8 typów zadań z numerkami
- żółte ostrzeżenie o localStorage (postęp tylko lokalnie, brak synchronizacji)
- sekcję Ko-fi z linkiem i podpisem "Powodzenia na egzaminie! — Michał"

---
