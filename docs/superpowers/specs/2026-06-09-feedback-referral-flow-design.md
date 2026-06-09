# Spec: Flow satysfakcji + mechanizm poleceń (Web3Forms)

**Data:** 2026-06-09
**Status:** zaprojektowane (do napisania plan implementacji)
**Scala:** backlogowe wiersze „CSAT — zbieranie ocen (faza 1)" + „Podziel się wynikiem" w jedną inicjatywę.

## Kontekst

Web3Forms już działa w aplikacji dla zgłoszeń błędnych pytań ([web/index.html](../../../web/index.html) — `WEB3FORMS_KEY`, `postBugReport`, modal `#bug-report-modal`). Bez backendu, bez nowej infrastruktury. Wykorzystujemy tę samą integrację do zbierania opinii i — co ważniejsze — do **napędzania poleceń** (główna dźwignia wzrostu: wyjście poza ~140 osób z grup FB do pozostałych ~800 z 940 zdających, egzamin 2026-07-04).

**Cele (priorytet):**
1. **Wzrost przez polecenia** (główny) — zachęcić zadowolonych użytkowników do polecenia strony.
2. **Feedback jakościowy** (drugorzędny) — zebrać, co pomaga / czego brakuje.

## Decyzje z brainstormingu (2026-06-09)

1. **Web3Forms zastępuje Tally całkowicie** — ten flow staje się jedynym mechanizmem feedbacku. Wcześniejszy spec CSAT oparty na Tally (`docs/superpowers/specs/2026-06-03-csat-testimonials-design.md`) zostaje wycofany jako wybrane narzędzie. Tracimy granularność 1–5 i dashboard; zyskujemy jedną infrastrukturę i prostotę. Wall testimoniali (faza 2) zostaje w backlogu — źródłem byłyby maile z Web3Forms zamiast dashboardu Tally.
2. **Sygnał binarny** 👍/👎 zamiast oceny 1–5.
3. **Wejście inline + modal** zamiast czystego auto-modala (szczegóły niżej).
4. **👎 zawsze otwiera modal** (negatywny sygnał cenny — nie tłumimy go cooldownem); cooldown wycisza tylko nagabywanie o share po 👍.
5. **Treść udostępnienia = polecenie strony (altruistyczne)**, nie pochwała wyniku. Jedno copy, działa też w modalu proaktywnym (nie wymaga wyniku).
6. **Kanały share = natywny `navigator.share` + fallback** (Facebook / e-mail / kopiuj link).
7. **Donate'y poza zakresem** (świadomie — nie rozpraszać kolejnym CTA).

## Architektura

Dwa komponenty + stan w localStorage. Cały kod self-contained w [web/index.html](../../../web/index.html), wzorowany na bloku bug-report (markup obok pozostałych `.pwa-modal`, funkcje JS zgrupowane, styl globalnych funkcji jak w istniejącym kodzie).

### A. Widget inline (ekran wyników)

Zawsze widoczny na summary, wysoko (nad tabelą i sekcjami recenzji). Wstawiany w `buildSummaryHtml()`.

> „Czy ta strona pomaga Ci w przygotowaniach? 👍 👎"

### B. Modal feedbacku

`.pwa-modal` / `.pwa-modal-box` / `.pwa-actions` (ten sam wzorzec i klasy co `#bug-report-modal`), przełączanie `display: flex | none`. Trzy stage'e (pokazywane przez toggle wewnętrznych divów, jak form/success w bug-report):

- **Stage 1 — łapki.** Używany tylko w modalu proaktywnym (inline ma własne łapki). Klik 👍 → stage 2A; 👎 → stage 2B.
- **Stage 2A (po 👍) — polecenie + share.** Copy + przyciski udostępniania + opcjonalne pole „Co było najbardziej pomocne?".
- **Stage 2B (po 👎) — feedback.** Pole „Czego zabrakło lub co powinniśmy poprawić?" (wymagane) + wyślij.
- **Stan „Dzięki"** po ukończeniu (analogicznie do `#bug-report-success`).

## Stan (localStorage, konwencja `ksap_*`)

| Klucz | Wartość | Rola |
|---|---|---|
| `ksap_feedback_voted` | `"1"` | ustawiany po **pierwszym** kliknięciu łapki (kiedykolwiek); wyłącza modal proaktywny |
| `ksap_feedback_completed_at` | epoch (ms) | czas ostatniego **ukończenia** flow; rządzi 5-dniowym cooldownem dla 👍 |
| `ksap_feedback_proactive_at` | epoch (ms) | czas ostatniego pokazania modala proaktywnego (anty-spam) |

**Stałe:**
- `FEEDBACK_COOLDOWN_DAYS = 5`
- `FEEDBACK_PROACTIVE_MIN_ANSWERS = 45` (liczone z długości `ksap_answer_log`)

## Logika wyświetlania (stan-maszyna)

**Klik inline 👍:**
- `voted=1`, GA `feedback_vote{value:'up', source:'inline'}`
- jeśli **w cooldownie** (`now - completed_at < 5 dni`) → tylko transient „Dzięki! 🙌", **modal się nie otwiera**
- poza cooldownem → modal stage 2A

**Klik inline 👎:**
- `voted=1`, GA `feedback_vote{value:'down', source:'inline'}`
- **zawsze** modal stage 2B (omija cooldown)

**Na wejściu na summary (proaktywny modal):**
- jeśli `voted == false` ORAZ `answerCount ≥ 45` ORAZ proaktywny nie pokazany w ostatnich 5 dniach (`now - proactive_at ≥ 5 dni` lub brak) → modal stage 1, ustaw `proactive_at = now`, GA `feedback_modal_opened{source:'proactive'}`

**Ukończenie modala** (klik dowolnego share LUB wysłanie tekstu):
- `completed_at = now` → rusza 5-dniowy cooldown
- ekran „Dzięki", zamknięcie

**Porzucenie** (× / Anuluj bez akcji):
- nic nie zapisujemy do `completed_at` → następna łapka znów otwiera modal
- GA `feedback_modal_dismissed{stage}`

### Czysta funkcja decyzyjna (testowalna)

Logikę „czy/jak otworzyć modal" wydzielić do czystej funkcji bez efektów ubocznych, np.:

```
decideFeedback({ value, source, voted, completedAt, proactiveAt, answerCount, now })
  → { action: 'open'|'ack'|'none', stage: 1|'2A'|'2B' }
```

Reszta (DOM, localStorage, GA, fetch) operuje na jej wyniku. To czyni rdzień-maszynę testowalną jednostkowo bez DOM.

## Udostępnianie (stage 2A)

**Copy:** *„Ten projekt jest całkowicie darmowy i rozwijany po godzinach. Jeśli pomógł Ci w nauce, będzie nam bardzo miło, jeśli polecisz go choć jednej osobie przygotowującej się do egzaminu."*

- Stała: tekst polecenia + URL `https://egzamin.kutra.pl/`.
- Jeśli `navigator.share` istnieje (mobile) → jeden przycisk **„Udostępnij"** → `navigator.share({ title, text, url })` (arkusz systemowy: WhatsApp / Messenger / SMS).
- Fallback (desktop / brak API) → trzy przyciski:
  - **Facebook** — `https://www.facebook.com/sharer/sharer.php?u=<URL>` w nowym oknie. FB ignoruje własny tekst — pokaże podgląd z tagów OG (już obecne w [web/index.html:10-24](../../../web/index.html#L10-L24)).
  - **E-mail** — `mailto:?subject=...&body=<tekst + URL>`.
  - **Kopiuj link** — `navigator.clipboard.writeText(<tekst + URL>)`; fallback `<textarea>` + `document.execCommand('copy')` dla starszych przeglądarek; feedback „Skopiowano ✓".
- Każdy klik share = **ukończenie** + GA `feedback_share_clicked{channel:'native'|'facebook'|'email'|'copy'}`.
- Pole „Co było najbardziej pomocne?" opcjonalne; jeśli wypełnione i wysłane → Web3Forms (sentiment pozytywny) i też liczy się jako ukończenie.

## Web3Forms (reuse wzorca bug-report)

Nowy builder `buildFeedbackPayload({ sentiment, message, helpful })` + ta sama `fetch` z retry co `postBugReport` (1 ponowienie, potem cichy fail — bez mailto fallback dla opinii).

Odróżnialne w skrzynce od zgłoszeń błędów:
- `subject`: „Opinia 👍 – egzamin.kutra.pl" / „Opinia 👎 – egzamin.kutra.pl"
- `from_name`: „egzamin.kutra.pl – opinia"
- `message`: tekst użytkownika (helpful przy 👍, improve przy 👎)
- kontekst: liczba sesji (`getSessions().length`), ostatni wynik, `answerCount`

Tekst wymagany przy 👎 (jak desc w bug-report), opcjonalny przy 👍.

## Zdarzenia GA

| Event | Parametry |
|---|---|
| `feedback_vote` | `value` (`up`/`down`), `source` (`inline`/`proactive`) |
| `feedback_modal_opened` | `source` (`inline`/`proactive`), `sentiment` (`positive`/`negative`) |
| `feedback_share_clicked` | `channel` (`native`/`facebook`/`email`/`copy`) |
| `feedback_submitted` | `sentiment` (`positive`/`negative`), `has_text` (bool) |
| `feedback_modal_dismissed` | `stage` (`1`/`2A`/`2B`) |

Wzorzec wywołania jak w istniejącym kodzie: `gtag('event', 'nazwa', {...})`.

## Testowanie / weryfikacja

Aplikacja to pojedynczy statyczny `index.html` bez harnessu testowego → **manualna checklista scenariuszy** + opcjonalny test jednostkowy czystej `decideFeedback`:

1. Pierwszy klik inline 👍 → modal stage 2A → klik share → cooldown ustawiony.
2. Klik inline 👍 w cooldownie → brak modala, tylko „Dzięki".
3. Klik inline 👎 w cooldownie → modal stage 2B **jest** (omija cooldown).
4. Porzucenie modala (×) → ponowny klik łapki znów otwiera modal.
5. Proaktywny modal: `voted==false` + 45 odpowiedzi w `ksap_answer_log` → modal stage 1 na summary; po pokazaniu nie wraca przez 5 dni.
6. Retry Web3Forms: pierwsze żądanie pada → ponowienie; oba padają → cichy fail bez crasha.
7. `navigator.share` obecne (mobile) → jeden przycisk; nieobecne (desktop) → trzy kanały.

## Metryki sukcesu

- Liczba `feedback_share_clicked` (kliknięcia w udostępnianie).
- Liczba `feedback_submitted` (przesłane opinie) + stosunek positive/negative.
- Liczba `feedback_vote` (zaangażowanie w łapki) vs ukończenia.
- (Pośrednio) nowi użytkownicy z poleceń — przez ruch / `referrer`.

## Poza zakresem

- Donate'y / wirtualne kawy w tym flow (osobne CTA).
- Wall testimoniali (faza 2 — osobna iteracja, kuracja z maili Web3Forms).
- Ocena granularna 1–5 (świadomie binarna).
- mailto fallback dla opinii (jest tylko dla zgłoszeń błędów).
```

