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
