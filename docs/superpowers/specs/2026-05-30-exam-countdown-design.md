# Design: Odliczanie do egzaminu (Exam Countdown)

**Data:** 2026-05-30  
**Status:** Approved

---

## Kontekst

Aplikacja KSAP Quiz to PWA do nauki przed egzaminem kompetencyjnym KSAP. Egzamin odbywa się 4 lipca 2026. Funkcja odliczania ma pełnić rolę emocjonalnego haka — przypomina użytkownikom po co tu są.

Backlog priorytet: SHOULD (~30 min).

---

## Wymagania

- Wyświetlać liczbę dni do egzaminu na home screenie
- Granularność: tylko dni (bez godzin/minut)
- Umiejscowienie: między podtytułem a przyciskami
- Wygląd: zwykły tekst (spójny z podtytułem) + delikatna animacja pulsowania
- Data egzaminu hardcoded w kodzie

### Stany

| Kiedy | Tekst |
|---|---|
| Przed 4 lipca | "Egzamin za X dni" |
| 4 lipca (cały dzień) | "To już dziś" |
| Po 4 lipca | Element ukryty (`display: none`) |

---

## Design

### HTML

Jeden nowy element dodany do `#screen-home`, między `<p class="subtitle">` a pierwszym `<button>`:

```html
<p id="exam-countdown"></p>
```

Treść wypełniana przez JS — brak tekstu w HTML.

### CSS

```css
#exam-countdown {
  color: #555;
  font-size: 1rem;
  min-height: 1.5em;
  animation: countdown-pulse 3s ease-in-out infinite;
}

@keyframes countdown-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
```

`min-height: 1.5em` zapobiega layout shift — przestrzeń jest zarezerwowana od razu, JS tylko wpisuje tekst.

### JavaScript

Nowa funkcja `initCountdown()`, wywoływana raz przy inicjalizacji apki:

```js
function initCountdown() {
  const el = document.getElementById('exam-countdown');
  const now = new Date();
  const examDay = new Date('2026-07-04');
  const examDate = new Date('2026-07-05');

  const isExamDay = now >= examDay && now < examDate;
  const daysLeft = Math.ceil((examDay - now) / 86400000);

  if (isExamDay) {
    el.textContent = 'To już dziś';
  } else if (daysLeft > 0) {
    el.textContent = `Egzamin za ${daysLeft} dni`;
  } else {
    el.style.display = 'none';
  }
}
```

`Math.ceil` gwarantuje, że nie pojawi się "0 dni" — w dniu egzaminu pokazujemy "To już dziś", a nie liczbę.

---

## Co NIE wchodzi w zakres

- Dynamiczne odświeżanie (`setInterval`) — tylko dni, wystarczy raz przy załadowaniu
- Koloryzacja w zależności od liczby dni (np. czerwony przy ≤7)
- Komunikat "Egzamin już za Tobą" po egzaminie
