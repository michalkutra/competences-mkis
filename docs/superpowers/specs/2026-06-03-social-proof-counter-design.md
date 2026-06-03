# Licznik social proof na ekranie głównym — design

**Data:** 2026-06-03
**Status:** zaakceptowany (czeka na plan implementacji)

## Cel

Pokazać na ekranie głównym, że społeczność zdających aktywnie korzysta z appki,
żeby zachęcić nowych użytkowników do rozpoczęcia sesji. Framing wspólnotowy:
„Odpowiedzieliście już na ponad X pytań" — druga osoba liczby mnogiej buduje
poczucie wspólnej grupy (~700 osób zdających egzamin KSAP).

Spójne z kierunkiem z BACKLOG (wall testimoniali, social proof na launchu).

## Kontekst i ograniczenia

- Strona jest **statyczna** (Netlify, `publish = "web"`, bez backendu).
- Analityka: GTM `GTM-KZ9NMFFK` → GA4. Event `question_answered` jest już
  wysyłany do `dataLayer` (patrz `web/index.html`).
- **GA4 nie udostępnia danych publicznie do przeglądarki** — odczyt „na żywo z GA"
  wymagałby serwerowego pośrednika (GA4 Data API + service account). Świadomie
  tego **nie robimy** na tym etapie (zła relacja nakład/efekt przy obecnej skali).

## Źródło danych — ręczna aktualizacja (wybór: C1)

Nowy plik statyczny `web/stats.js`:

```js
window.SITE_STATS = { answered: 508 };
```

Aktualizacja ręczna: właściciel zagląda do GA4 (suma eventów `question_answered`,
Reports → Engagement → Events lub Explore), podbija wartość, commit + deploy.

- Brak backendu, brak endpointu do zapisu → zero ryzyka nadużyć (nikt nie nabije
  licznika).
- Akceptowalne opóźnienie: liczba sprzed kilku dni jest nie do odróżnienia od
  liczby sprzed kilku godzin w kontekście social proofu.
- Wartość startowa: **508** (odczyt z GA z 2026-06-03).

Rozważana, ale odrzucona alternatywa: Netlify Function + GA4 Data API (C2) —
„prawdziwie dynamiczne", ale kilka godzin konfiguracji dostępu do GA; nieuzasadnione
przy launchu na ~700 osób i miesiącu do egzaminu.

## Prezentacja (Wariant A — subtelna linijka w hero)

Lokalizacja: w `#screen-home`, **pod przyciskami**, między przyciskami
a `#exam-countdown`.

```
            Sprawdzian Umiejętności
     Pomoc do nauki egzaminu KSAP · 320 pytań

              [  Nowa sesja  ]
              [ Historia sesji ]

   ✦ Odpowiedzieliście już na ponad 400 pytań
            📅 Egzamin za 28 dni
```

- Nowy element `<p id="social-proof">` w `#screen-home`.
- Styl spójny z istniejącym `#exam-countdown` (przygaszony, drobniejsza czcionka),
  nie konkuruje z głównym CTA „Nowa sesja".
- Ikona wiodąca: **✦**.
- Tekst: **„Odpowiedzieliście już na ponad {liczba} pytań"**.

## Logika wyświetlania (3 reguły)

1. **Zaokrąglanie w dół do „ładnego" progu** (`floorToNice(n)`):
   - `n < 1000` → zaokrąglenie w dół do pełnych setek (429 → 400, 512 → 500).
   - `n >= 1000` → zaokrąglenie w dół do pełnych 500 (1040 → 1000, 1600 → 1500).
   - Wyświetlamy „ponad {floorToNice(n)}".
2. **Próg widoczności = 300.** Jeśli `answered < 300`, linijka **nie renderuje się**
   wcale — chroni przed słabym social proofem na starcie (analogicznie do decyzji
   o liczniku kaw na zerze w BACKLOG). Przy 429 → widoczna od razu.
3. **Brak danych / błąd.** Jeśli `window.SITE_STATS` jest nieobecne lub `answered`
   nie jest liczbą → linijka się **nie renderuje** (graceful, bez błędów w konsoli).

## Integracja w kodzie

- `web/stats.js` ładowany w `<head>` przed logiką home (analogicznie do
  `questions-unified.js`).
- Funkcja renderująca wywoływana przy pokazaniu ekranu home (obok istniejącej
  logiki `#question-count` / `#exam-countdown`).
- Dodatek **czysto prezentacyjny**: nie dotyka silnika sesji, stanu ani localStorage.
  Brak zależności w drugą stronę.

## Poza zakresem (YAGNI)

- Automatyczne pobieranie z GA (GA4 Data API / Netlify Function).
- Realtime / inkrementacja po stronie klienta.
- Liczniki inne niż liczba odpowiedzi (np. liczba użytkowników, sesji).
- Animacje licznika.

## Testowanie / weryfikacja

- `answered = 508` → „Odpowiedzieliście już na ponad 500 pytań", linijka widoczna.
- `answered = 250` → linijka ukryta (poniżej progu 300).
- `answered = 1040` → „ponad 1000".
- brak `window.SITE_STATS` → linijka ukryta, brak błędów w konsoli.
