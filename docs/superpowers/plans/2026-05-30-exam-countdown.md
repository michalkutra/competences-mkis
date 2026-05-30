# Exam Countdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wyświetlić odliczanie dni do egzaminu KSAP (4 lipca 2026) na home screenie z animacją pulsowania.

**Architecture:** Trzy zmiany w jednym pliku `index.html` — CSS (style + keyframes), HTML (element), JS (funkcja + wywołanie). Żadnych zależności, żadnych nowych plików.

**Tech Stack:** Vanilla HTML/CSS/JS, single-file PWA.

---

## File Map

| Plik | Zmiana |
|---|---|
| `index.html:88-95` | Dodać style `#exam-countdown` i `@keyframes countdown-pulse` po bloku `.subtitle` |
| `index.html:919` | Dodać `<p id="exam-countdown"></p>` po linii z `.subtitle` |
| `index.html:1019` | Dodać funkcję `initCountdown()` po bloku `showScreen` |
| `index.html:1057` | Wywołać `initCountdown()` w `DOMContentLoaded` po `showScreen('home')` |

---

### Task 1: CSS — style elementu i animacja

**Files:**
- Modify: `index.html:95` (po bloku `#screen-home button`)

- [ ] **Krok 1: Dodaj style CSS**

Znajdź blok (linia ~93–95):
```css
    #screen-home button {
      max-width: 300px;
    }
```

Po nim wstaw:
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

- [ ] **Krok 2: Sprawdź wizualnie w przeglądarce**

Otwórz `index.html` lokalnie. Na tym etapie nie ma jeszcze elementu w HTML — sprawdzamy tylko że CSS się parsuje bez błędów (DevTools → Console: brak błędów).

---

### Task 2: HTML — element na home screenie

**Files:**
- Modify: `index.html:919` (home screen)

- [ ] **Krok 1: Dodaj element HTML**

Znajdź blok home screenu (linia ~917–922):
```html
<div id="screen-home" class="screen">
  <h1>Sprawdzian Umiejętności KSAP</h1>
  <p class="subtitle">Pomoc do nauki egzaminu kompetencyjnego</p>
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" class="ghost" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
</div>
```

Zmień na:
```html
<div id="screen-home" class="screen">
  <h1>Sprawdzian Umiejętności KSAP</h1>
  <p class="subtitle">Pomoc do nauki egzaminu kompetencyjnego</p>
  <p id="exam-countdown"></p>
  <button id="btn-new-session" onclick="goSetup()">Nowa sesja</button>
  <button id="btn-history" class="ghost" onclick="showScreen('history'); loadHistory();">Historia sesji</button>
</div>
```

- [ ] **Krok 2: Sprawdź w przeglądarce**

Odśwież stronę. Element jest niewidoczny (pusty), ale zajmuje miejsce (`min-height: 1.5em`) — układ przycisków nie skacze. Sprawdź w DevTools → Elements że `#exam-countdown` istnieje w DOM.

---

### Task 3: JS — funkcja `initCountdown`

**Files:**
- Modify: `index.html:1019` (po funkcji `showScreen`)

- [ ] **Krok 1: Dodaj funkcję**

Znajdź koniec funkcji `showScreen` (linia ~1018–1019):
```js
  }

  /* ================================================================
     SCREEN MANAGEMENT
```

Zaraz po zamknięciu `showScreen` (po klamrze `}`), przed kolejnym blokiem komentarza, wstaw:
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

- [ ] **Krok 2: Zweryfikuj że funkcja istnieje**

W DevTools → Console wpisz `initCountdown` — powinna pojawić się referencja do funkcji (nie `undefined`). Jeśli `undefined`, sprawdź czy `<script>` się domknął poprawnie.

---

### Task 4: JS — wywołanie w `DOMContentLoaded`

**Files:**
- Modify: `index.html:1057` (DOMContentLoaded handler)

- [ ] **Krok 1: Wywołaj `initCountdown()`**

Znajdź linię w `DOMContentLoaded` (linia ~1057):
```js
    showScreen('home');
```

Zmień na:
```js
    showScreen('home');
    initCountdown();
```

- [ ] **Krok 2: Przetestuj główny przypadek (dni do egzaminu)**

Odśwież stronę. Na home screenie powinien pojawić się tekst "Egzamin za X dni" między podtytułem a przyciskiem "Nowa sesja", z delikatnym pulsowaniem.

Sprawdź wartość X ręcznie: dziś jest 2026-05-30, egzamin 2026-07-04 = 35 dni. Tekst powinien brzmieć "Egzamin za 35 dni".

- [ ] **Krok 3: Przetestuj przypadek "To już dziś"**

W DevTools → Console tymczasowo podmień datę żeby sprawdzić logikę:
```js
// Wklej i wykonaj w konsoli:
(function() {
  const el = document.getElementById('exam-countdown');
  const now = new Date('2026-07-04T10:00:00');
  const examDay = new Date('2026-07-04');
  const examDate = new Date('2026-07-05');
  const isExamDay = now >= examDay && now < examDate;
  const daysLeft = Math.ceil((examDay - now) / 86400000);
  if (isExamDay) el.textContent = 'To już dziś';
  else if (daysLeft > 0) el.textContent = `Egzamin za ${daysLeft} dni`;
  else el.style.display = 'none';
  console.log({ isExamDay, daysLeft, text: el.textContent, display: el.style.display });
})();
```
Oczekiwany output: `{ isExamDay: true, daysLeft: 0, text: 'To już dziś', display: '' }`

- [ ] **Krok 4: Przetestuj przypadek "po egzaminie"**

```js
// Wklej i wykonaj w konsoli:
(function() {
  const el = document.getElementById('exam-countdown');
  el.style.display = '';
  el.textContent = '';
  const now = new Date('2026-07-05T08:00:00');
  const examDay = new Date('2026-07-04');
  const examDate = new Date('2026-07-05');
  const isExamDay = now >= examDay && now < examDate;
  const daysLeft = Math.ceil((examDay - now) / 86400000);
  if (isExamDay) el.textContent = 'To już dziś';
  else if (daysLeft > 0) el.textContent = `Egzamin za ${daysLeft} dni`;
  else el.style.display = 'none';
  console.log({ isExamDay, daysLeft, text: el.textContent, display: el.style.display });
})();
```
Oczekiwany output: `{ isExamDay: false, daysLeft: 0, text: '', display: 'none' }`

- [ ] **Krok 5: Sprawdź brak layout shift**

Przytrzymaj Shift i odśwież (hard reload). Obserwuj moment ładowania — przyciski nie powinny skakać. Możesz też w DevTools → Performance nagrać załadowanie i sprawdzić czy nie ma CLS.
