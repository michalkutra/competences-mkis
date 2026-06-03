# Sprawdzian Umiejętności KSAP

Bezpłatna aplikacja do przygotowania się do Sprawdzianu Umiejętności KSAP. Działa w przeglądarce, zero rejestracji, wszystkie dane lokalnie.

**→ [egzamin.kutra.pl](https://egzamin.kutra.pl)**

---

## Skąd się wzięła

Żona podchodziła do egzaminu KSAP. Nie znaleźliśmy nic wystarczająco dobrego do ćwiczeń — więc zbudowaliśmy własne. Może komuś się przyda.

## Co robi

- **8 typów zadań** — analogie słowne, wnioskowanie logiczne, zadania numeryczne, analiza wykresów, powiązania figur i inne
- **Tryb nauki** — po każdej odpowiedzi wyjaśnienie dlaczego tak, a nie inaczej
- **Tryb egzaminowy** — bez podpowiedzi, symulacja prawdziwego egzaminu
- **Dwa poziomy trudności** — łatwy i trudny
- **Timer** — opcjonalnie 60 sekund na pytanie
- **Historia i statystyki** — widać postępy, które typy pytań sprawiają problemy
- **PWA** — działa offline, można zainstalować jak aplikację na telefonie

## Tech

Vanilla JS, zero frameworków, zero backendu. Jeden plik HTML + dane pytań. Deployment na Netlify.

Dane użytkownika (sesje, wyniki, ustawienia) trzymane w `localStorage` — nic nie trafia na serwer.

## Uruchomienie lokalnie

```bash
# dowolny serwer statyczny, np.
npx serve web
# lub
python3 -m http.server 8080 --directory web
```

Otwórz `http://localhost:8080`.
