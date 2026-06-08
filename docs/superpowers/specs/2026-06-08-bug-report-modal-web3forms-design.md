# Design: Wzmocnienie zgłaszania błędów — modal na stronie + Web3Forms

**Data:** 2026-06-08
**Źródło:** Wpis BACKLOG.md „Wzmocnienie zgłaszania błędów — niezależnie od `mailto`". Wykryto 2026-06-04, że z 4 zgłoszeń tylko 1 dotarło mailem — pozostałe 3 to użytkownicy, którzy kliknęli „Zgłoś błąd", ale nie wysłali maila w kliencie poczty. Treść opisowa z tych zgłoszeń przepadła.
**Status zakresu:** spec → po akceptacji powstaje plan, wpis w BACKLOG.md dostaje linki do speca i planu.

## Problem

`reportQuestion(id)` ([web/index.html](../../../web/index.html) L2417-2425) robi dwie rzeczy:
1. wysyła GA4 `error_reported` (z `question_id`, `question_index`, `question_type`),
2. otwiera `mailto:michal@kutra.pl?cc=ewelina.wegrocka@gmail.com`.

GA mówi **które** pytanie zgłoszono, ale **nie co jest źle** — opis jest tylko w mailu. A `mailto` ma **dwa punkty awarii**: user musi (a) mieć skonfigurowanego klienta poczty, (b) ręcznie kliknąć „wyślij". 3 z 4 zgłoszeń poległo na tym kroku → opisowy kontekst (najcenniejsza część) przeciekł.

## Ograniczenia

- **Zero backendu** — statyczny `web/index.html` na Netlify, PWA, stan w localStorage. Wysyłka musi iść do usługi zewnętrznej.
- **Minimalna ręczna robota po stronie właściciela** — preferencja użytkownika: „zrób coś prostego". Stąd usługa bez budowania formularza i bez dashboardu.
- **Spójność wizualna** — vanilla JS/CSS, te same zmienne kolorów i styl co reszta aplikacji.
- **Okno czasowe** — ~26 dni do egzaminu (2026-07-04); tani, szybki fix realnej dziury.
- **Istniejące wzorce do reużycia:** `gtag('event', ...)` (bezpośrednie wysyłki zdarzeń, patrz [web/index.html](../../../web/index.html)), styl przycisków (`.btn-sm`, `.ghost`), wzorzec warunkowych nakładek na ekranach.

## Rozwiązanie

Zastąpić `mailto` **modalem na stronie** z polem opisu. Wysyłka przez `fetch POST` do **Web3Forms** — usługi „form-to-email" bez backendu, bez konta-dashboardu i bez budowania formularza. User nie opuszcza aplikacji → najwyższa kończalność (dokładnie to, co naprawiamy).

### Dlaczego Web3Forms (a nie Google Form)

| Opcja | Robota właściciela | User opuszcza stronę? | Backend |
|---|---|---|---|
| **Web3Forms (wybrane)** | 1× pobranie access key (potwierdzenie mailem) | nie | nie |
| Google Form (iframe/redirect) | budowa formularza w UI + podanie ID + entry-ID do prefilla | częściowo | nie |
| Formspree | założenie konta + utworzenie formularza | nie | nie |

Web3Forms wymaga najmniej ręcznej roboty po stronie właściciela: wpisujesz email na web3forms.com → dostajesz **access key** (jeden klik potwierdzenia w mailu). Access key jest **publiczny by design** — ląduje w kodzie klienta, to bezpieczne. Darmowy tier: **250 zgłoszeń/mies.** (z naddatkiem przy ~940 zdających).

**Access key (michal@kutra.pl):** `ff0f13c3-3327-447b-a35a-85a1cea95385`

### Odbiorcy — dwa maile na darmowym tierze

CC / wielu odbiorców w Web3Forms to funkcja **Pro** (płatna). Na darmowym tierze zgłoszenia idą **tylko na email powiązany z access key**.

**Rozwiązanie (darmowe, zero kodu):**
- Access key założony na **michal@kutra.pl** → zgłoszenia tam lądują.
- W Gmailu michal@ ustawiona **reguła auto-forward na ewelina.wegrocka@gmail.com**.

To odtwarza dzisiejsze zachowanie `mailto` (oba maile) bez kosztów i bez zmian w aplikacji.

### Modal — co widzi użytkownik

| Pole | Typ | Wymagane | Uwagi |
|---|---|---|---|
| Nagłówek „Zgłoś błąd w pytaniu #`id`" | tekst | — | potwierdza userowi, którego pytania dotyczy |
| Opis błędu | textarea | **tak** | rdzeń wartości — to, co dziś przecieka |
| Email kontaktowy | input email | nie | żeby właściciel mógł dopytać/podziękować; może zostać puste |
| Przyciski: „Wyślij" / „Anuluj" | — | — | Anuluj zamyka modal bez wysyłki |

**Ukryte pola** doklejane automatycznie do payloadu (user ich nie wpisuje):
- `access_key` (Web3Forms),
- `question_id`, `question_index`, `question_type`,
- `mode` (Egzamin/Nauka), `difficulty` (easy/hard),
- `subject` (np. „Zgłoszenie błędu – pytanie #`id`").

### Flow wysyłki

```
[Zgłoś błąd] → gtag('event','error_report_opened', {question_id, question_index, question_type})
            → otwórz modal
  └ user wpisze opis (+ opcjonalnie email) → [Wyślij]
       └ walidacja: opis niepusty (inaczej inline błąd, brak wysyłki)
       └ fetch POST https://api.web3forms.com/submit  (JSON: pola widoczne + ukryte)
            ├ sukces (HTTP ok + success:true)
            │    → gtag('event','error_reported', {question_id, question_index, question_type})
            │    → komunikat „Dzięki, zgłoszenie wysłane" → zamknij modal
            └ błąd (sieć / !success)
                 → 1× automatyczny retry tego samego POST
                      ├ sukces → jak wyżej
                      └ dalej błąd
                           → gtag('event','error_report_failed', {question_id, question_index, question_type})
                           → komunikat „Nie udało się wysłać" + przycisk „Wyślij mailem"
                                └ [Wyślij mailem] → mailto prefilled (opis usera w treści) → fallback
```

### Pomiar GA — lejek zgłoszeń

Trzy zdarzenia, wszystkie z wymiarami `question_id`, `question_index`, `question_type` — dają pełny lejek **kliknięcie → skuteczna wysyłka**:

| Event | Kiedy | Mierzy |
|---|---|---|
| `error_report_opened` | klik „Zgłoś błąd" (otwarcie modala) | **ile osób kliknęło** zgłoś błąd (z wymiarem pytania) |
| `error_reported` | sukces wysyłki do Web3Forms | **ile skutecznie wysłało** |
| `error_report_failed` | podwójny fail wysyłki | resztkowy przeciek (przed fallbackiem mailto) |

Różnica `opened − reported` = porzucenia + awarie. To realizuje życzenie: widać i klikających, i skutecznie wysyłających.

> **Uwaga o porównywalności:** historyczne `error_reported` (np. 7 zdarzeń z 2026-06-07) liczyły *kliknięcia* (stary kod odpalał event na klik). Nowe `error_reported` liczy *udane wysyłki*; odpowiednikiem starego licznika jest teraz `error_report_opened`. Porównywalność z historią uznana za nieistotną. Wszystkie wymiary są już zarejestrowane w GA4 (potwierdzone API 2026-06-08).

### Fallback do `mailto`

`mailto` przestaje być głównym kanałem (zastępuje go modal), ale **zostaje jako siatka bezpieczeństwa**: gdy wysyłka padnie po retry, modal pokazuje przycisk „Wyślij mailem", który otwiera `mailto:michal@kutra.pl?cc=ewelina.wegrocka@gmail.com` z **prefillowaną treścią** (opis, który user już wpisał) w body — nic, co user napisał, nie przepada. To opcja ostatniej szansy, nie domyślna ścieżka.

## Komponenty i granice

- **`reportQuestion(id)`** — zmienia rolę: zamiast `mailto` wysyła `error_report_opened`, zbiera kontekst pytania i **otwiera modal** (prefill `question_id` i pól ukrytych).
- **Modal zgłoszenia** — nowy, izolowany fragment UI (markup + style spójne z appką). Wejście: `question_id` + kontekst sesji. Wyjście: wywołanie wysyłki lub anulowanie.
- **Funkcja wysyłki** (`submitBugReport` lub podobna) — czysta logika: buduje payload, robi `fetch` + 1 retry, zwraca sukces/porażkę. Nie zna UI poza callbackami sukces/błąd. Testowalna w izolacji.
- **Warstwa GA** — `error_report_opened` na otwarcie modala, `error_reported` na sukces, `error_report_failed` na porażkę. Bez zmian w rejestracji wymiarów.

## Obsługa błędów

- **Pusty opis** → inline walidacja, brak wysyłki.
- **Błąd sieci / `success:false`** → 1 automatyczny retry → przy dalszym fail: `error_report_failed` + komunikat z przyciskiem fallbacku do `mailto` (treść prefillowana opisem usera).
- **Brak `gtag`** (np. zablokowany przez consent/adblock) → wysyłka do Web3Forms i tak działa; event GA po prostu nie poleci (guard `typeof gtag === 'function'`).

## Testowanie

- **Walidacja:** pusty opis blokuje wysyłkę; niepusty przechodzi.
- **Payload:** zawiera `access_key`, `question_id`, `question_index`, `question_type`, `mode`, `difficulty`, opis, (opcjonalny) email.
- **Retry:** pojedyncza porażka → drugi POST; podwójna porażka → `error_report_failed` + przycisk „Wyślij mailem" z prefillowanym opisem; sukces po retry → `error_reported`.
- **GA lejek:** `error_report_opened` na otwarcie modala, `error_reported` na sukces, `error_report_failed` na podwójny fail; brak `gtag` nie wywala wysyłki.
- **Fallback mailto:** po podwójnym faila `mailto` otwiera się z opisem usera w body (nic nie przepada).
- **Manualny smoke test:** realne zgłoszenie dociera na michal@kutra.pl (i po forwardzie na ewelina@).

## Poza zakresem (YAGNI)

- Kategoria/dropdown typu błędu — odrzucone (dokłada klik, mały zysk).
- Załączniki/screenshoty.
- Web3Forms Pro / natywne CC.
- Zmiana rejestracji wymiarów GA4 (już zrobione 2026-06-08).
- Strona „Podgląd pojedynczego pytania" (osobny wpis backlogu).

## Zależności / wymagane od właściciela

1. **Access key Web3Forms** dla michal@kutra.pl — ✅ gotowy: `ff0f13c3-3327-447b-a35a-85a1cea95385`.
2. **Reguła auto-forward** w Gmailu michal@ → ewelina.wegrocka@gmail.com — do zrobienia później przez właściciela (nie blokuje wdrożenia; do tego czasu zgłoszenia trafiają na michal@). Fallback `mailto` nadal celuje w oba maile.
