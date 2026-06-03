# Backlog — Ukończone

## Naprawa pytań typu 8 (zgłoszenie `h_t8_037`)

> **Ukończono:** 2026-06-03 · [Spec](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-design.md) · [Plan](bug-reports/2026-06-03-typ8-figury/2026-06-03-typ8-wariant2-plan.md) · [Zgłoszenie](bug-reports/2026-06-03-typ8-figury/2026-06-03-h_t8_037.md)

Zgłoszenie mailem („zależność dopiero przy trzecim oknie") ujawniło defekt w pytaniach typu 8 (niejednorodne komórki — reguły nie dało się wydedukować przed trzecim oknem) oraz trójkąt renderowany jako koło. Naprawione.

- Pytania typu 8 przebudowane na macierze 2×2 o **jednorodnych komórkach** (każda pozycja = niezależna podmacierz → jednoznaczna rozwiązywalność). Bank easy: 1 figura. Hard z gradientem: **T1** (1 figura, 15), **T2** (2 figury, 15), **T3** (3 figury, 10; w 7 reguła obrotu trójkąt/kwadrat).
- Renderer (`web/index.html`): `renderFigure` rysuje trójkąt, obsługuje obrót i skalowanie; `renderType8` renderuje komórki wielofigurowe.
- Generator/walidator/integrator w `tools/` (deterministyczne; walidacja 80/80). Bump cache `ksap-v4` → `ksap-v5`.
- Zachowane: ID, poziomy, polecenia, liczba opcji (20×4 + 20×5 na poziom).

---

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

## Analityka GA4 + GTM

> **Ukończono:** 2026-06-02

Google Tag Manager (`GTM-KZ9NMFFK`) dodany do `web/index.html` (snippet w `<head>` i noscript w `<body>`). Przez GTM podłączony GA4 (`G-5ZLD2PHTNE`). Eventy `dataLayer.push()` zaimplementowane w kodzie:

- `screen_view` — każda zmiana ekranu (screen_name)
- `session_started` — klik Rozpocznij (mode, difficulty, timer_enabled)
- `question_answered` — każda odpowiedź (question_type, is_correct, question_index, time_spent_sec)
- `session_completed` — koniec sesji (score, score_pct, questions_total, mode, difficulty)
- `session_aborted` — porzucenie sesji (at_question_index, questions_total)
- `error_reported` — zgłoszenie błędu w pytaniu (question_id, question_type)
- `donation_clicked` — klik Ko-fi (source: 'about' lub 'widget')

---

## Rozszerzenie puli pytań (2× w każdym poziomie)

> **Ukończono:** 2026-06-02

Pula pytań podwojona w obu poziomach trudności. Wygenerowano 320 nowych pytań (Opus 4.8, jeden agent na typ, równolegle), trzymając się `docs/specyfikacja_pytan.md` i unikając duplikatów istniejących treści/ID.

- Z 320 → **640 pytań**: 8 typów × 40 łatwych + 8 typów × 40 trudnych
- Łatwe: wiedza ogólna + podstawy administracji; trudne: terminologia prawnicza, łacińskie maksymy, złożona logika
- Walidacja 100%: 640 unikalnych ID, 0 duplikatów, poprawne indeksy `correct`, spójność matematyczna tabel (typ 6), zweryfikowane dystraktory wykresów (typ 7) i reguły transformacji figur (typ 8)
- Bump cache service workera `ksap-v2` → `ksap-v3`, żeby PWA pobrało nową pulę
- Mniej powtórek przy sesjach 15-pytaniowych (powiązane z otwartym taskiem o wyświetlaniu rozmiaru puli)

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
