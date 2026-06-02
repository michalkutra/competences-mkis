# Backlog

## Priorytetyzacja — test launch

**Kontekst:** darmowa wersja dla ~700 osób zdających egzamin KSAP, egzamin za miesiąc. Cel: zmaksymalizować wiedzę (adopcja, feedback, co się podoba) + 100 PLN zebranych z wirtualnych kaw jako proxy "ktoś to ceni".

| # | Pozycja | Wpływ | Wysiłek | Priorytet |
|---|---|---|---|---|
| 2 | Komunikacja (post na grupie) | Bez dobrego posta nikt nie kliknie — treść, ton, timing | ~1h | **MUST** |
| 7 | NPS / CSAT (Tally) | Bez tego nie wiesz CO MYŚLĄ — liczby bez kontekstu nic nie mówią | ~30 min | **MUST** |
| 8 | Informacja o puli pytań | Ustawia oczekiwania, zapobiega "to za mało" | ~15 min | SHOULD |
| 10 | Podziel się wynikiem | Jedyny mechanizm wyjścia poza te 700 osób | ~1h | SHOULD |
| 11 | PWA install prompt | Zwiększa powroty mobilnych użytkowników (fundament już jest) | ~2h | SHOULD |
| 13 | Przycisk powrotu do pytania | UX improvement — przeżyją bez tego | ~3h | SKIP |
| 15 | Autentykacja Google | Aktywnie szkodliwa — dodaje friction, zmniejszy adopcję | dni | **SKIP** |

**MUSTs łącznie:** ~2-3h (poza deploy). **SHOULDs:** kolejne ~4-5h.

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

## Zainstaluj aplikację (PWA install prompt)

Dodać przycisk "Zainstaluj aplikację" na ekranie głównym:

- **Android**: przechwycić `beforeinstallprompt`, podpiąć pod przycisk → natywny dialog instalacji
- **iOS**: pokazać modal z instrukcją krok po kroku (Udostępnij → Dodaj do ekranu głównego)
- Ukryć przycisk gdy appka działa już w trybie standalone (`display-mode: standalone`)

---

## Podziel się wynikiem (share score)

Na ekranie wyników dodać przycisk "Podziel się wynikiem", który kopiuje gotową wiadomość do schowka, np.:

> "Zrobiłem 12/15 w trybie egzaminowym! 🎯 [URL]"

- Użyć `navigator.clipboard.writeText()`
- Fallback: `<textarea>` z zaznaczonym tekstem dla starszych przeglądarek
- Jedyny naturalny mechanizm który może wynieść aplikację poza pierwotną grupę docelową

---

## Informacja o puli pytań na ekranie głównym lub setup

Wyświetlać ile pytań jest dostępnych w banku, np. "Pula: 80 pytań (łatwy) + 40 (trudny)".

- Pomaga użytkownikom ocenić wartość aplikacji przed pierwszą sesją
- Zapobiega rozczarowaniu ("znam już wszystkie odpowiedzi") — użytkownicy wiedzą czego się spodziewać
- Warto też sprawdzić realny rozmiar puli: przy sesjach 15-pytaniowych i małej puli użytkownicy szybko widzą powtórki

---

## Komunikacja (post na grupie FB)

**Status:** Drafty gotowe — do wyboru wersji i publikacji po wdrożeniu MUSTs.
**Drafty:** [`komunikacja/`](komunikacja/) — 4 wersje (A: storytelling, B: problem→rozwiązanie ⭐, C: konkretna, D: Messenger)

Przygotować treść posta na grupę ~700 osób zdających egzamin KSAP.

**Co powinien zawierać post:**
- kim jesteśmy (żona zdaje ten sam egzamin — wiarygodność "z wewnątrz")
- co to jest i po co (bezpłatne narzędzie do ćwiczeń, 8 typów zadań)
- jak zacząć (jeden link, zero rejestracji)
- co chcemy w zamian (feedback — co działa, co nie; opcjonalnie: kawa)
- prośba o udostępnienie jeśli ktoś zna inne osoby zdające

**Ton:** osobisty, nie marketingowy. Piszemy jako ludzie, nie jako produkt.

**Timing:** opublikować gdy wszystkie MUSTs są gotowe — nie wcześniej, żeby pierwsze wrażenie było dobre.

**Do przygotowania:**
- wersja na FB (dłuższa, z kontekstem)
- opcjonalnie: krótka wersja do WhatsApp/Messenger dla znajomych

---

## Trwałość danych (alternatywa dla localStorage)

Zwiększyć szanse, że użytkownicy nie stracą postępu przy czyszczeniu danych przeglądarki.

**Priorytet:** nice to have

**Opcje (od najbardziej do najmniej praktycznej):**
- **IndexedDB** — drop-in za localStorage, większy limit, przeglądarki rzadziej czyszczą automatycznie; biblioteka `idb` (1 kb wrapper) upraszcza API
- **Export/Import JSON** — przy kluczowych momentach (zakończenie modułu) propozycja "zapisz backup" → user pobiera plik i może go załadować; prosto w implementacji, wymaga akcji od usera
- **File System Access API** — zapis bezpośrednio na dysk po jednorazowym przyznaniu uprawnień; bardzo niezawodny, ale Chrome/Edge only (Safari nie obsługuje)
- **Shareable URL z zakodowanym stanem** — progress zakodowany base64 w URL/hash; działa cross-device, ale rośnie z ilością danych

**Zalecane podejście:** IndexedDB jako główny magazyn + prosty export JSON jako ubezpieczenie.

