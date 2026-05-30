# Zgłoś błąd w pytaniu — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać button "Zgłoś błąd w pytaniu" który pojawia się pod wyjaśnieniem odpowiedzi i otwiera pre-wypełniony mailto: z ID pytania w temacie.

**Architecture:** Czyste zmiany w jednym pliku `index.html` — nowa reguła CSS, nowa funkcja JS, jedno dodatkowe wywołanie `insertAdjacentHTML` w `checkAnswer()`. Brak backendu, brak nowych zależności.

**Tech Stack:** Vanilla HTML/CSS/JS (single-file app)

---

## Files

- Modify: `index.html` — CSS (linia ~316), JS (nowa funkcja + modyfikacja `checkAnswer()` ~linia 1644)

---

### Task 1: Dodaj CSS dla `.report-bar`

**Files:**
- Modify: `index.html:316`

- [ ] **Krok 1: Dodaj regułę CSS**

W `index.html`, po bloku `.explanation-box strong { ... }` (kończy się na linii ~316), dodaj:

```css
    .report-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }
```

Wynik w pliku — po linii `}` zamykającej `.explanation-box strong`:
```
    .explanation-box strong {
      display: block;
      margin-bottom: 6px;
      color: #92400e;
    }

    .report-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    /* ===== ABORT BUTTON (in question header) ===== */
```

- [ ] **Krok 2: Zweryfikuj wizualnie**

Otwórz `index.html` w przeglądarce. Na tym etapie nic widocznego nie zmienia się — CSS istnieje, ale `.report-bar` nie jest jeszcze renderowany. Sprawdź w DevTools że reguła `.report-bar` istnieje w stylach.

---

### Task 2: Dodaj `reportQuestion()` i wstrzyknij button w `checkAnswer()`

**Files:**
- Modify: `index.html` — nowa funkcja JS + modyfikacja `checkAnswer()`

- [ ] **Krok 1: Dodaj funkcję `reportQuestion()`**

Znajdź funkcję `abortSession()` (~linia 1681). Przed nią dodaj:

```js
  function reportQuestion(id) {
    var subject = encodeURIComponent('Zgłoszenie błędu – pytanie #' + id);
    window.location.href = 'mailto:michal@kutra.pl?cc=ewelina.wegrocka%40gmail.com&subject=' + subject;
  }
```

- [ ] **Krok 2: Wstrzyknij `.report-bar` w `checkAnswer()`**

Znajdź w `checkAnswer()` (~linia 1643-1644):

```js
    const expHtml = '<div class="explanation-box"><strong>Wyjaśnienie:</strong>' + escHtml(q.explanation) + '</div>';
    document.getElementById('q-body').insertAdjacentHTML('beforeend', expHtml);
```

Zamień na:

```js
    const expHtml = '<div class="explanation-box"><strong>Wyjaśnienie:</strong>' + escHtml(q.explanation) + '</div>'
      + '<div class="report-bar"><button class="btn-sm ghost" onclick="reportQuestion(\'' + q.id + '\')">Zgłoś błąd w pytaniu</button></div>';
    document.getElementById('q-body').insertAdjacentHTML('beforeend', expHtml);
```

- [ ] **Krok 3: Zweryfikuj w przeglądarce — tryb Learning**

1. Otwórz `index.html` w przeglądarce
2. Rozpocznij sesję w trybie Nauka (łatwy poziom)
3. Odpowiedz na pytanie i kliknij "Sprawdź odpowiedź"
4. Sprawdź że pod wyjaśnieniem pojawia się button "Zgłoś błąd w pytaniu" — wyrównany do prawej
5. Kliknij button — powinien otworzyć klienta poczty z:
   - To: `michal@kutra.pl`
   - CC: `ewelina.wegrocka@gmail.com`
   - Subject: `Zgłoszenie błędu – pytanie #e_t1_001` (lub inne ID aktualnego pytania)

- [ ] **Krok 4: Zweryfikuj w przeglądarce — tryb Exam (brak buttona)**

W exam mode `checkAnswer()` nie jest wywoływany podczas sesji — wyjaśnienie ani button nie powinny się pojawić:

1. Rozpocznij sesję w trybie Egzamin
2. Odpowiedz na pytanie i kliknij "Dalej →"
3. Sprawdź że button "Zgłoś błąd w pytaniu" NIE pojawia się (brak wyjaśnienia w trakcie sesji egzaminacyjnej — to poprawne zachowanie)

- [ ] **Krok 5: Commit**

```bash
git add index.html
git commit -m "feat: add report question button with mailto link"
```
