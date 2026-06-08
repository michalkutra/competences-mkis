# Wzmocnienie zgłaszania błędów (modal + Web3Forms) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zastąpić zawodny `mailto` w zgłaszaniu błędów modalem na stronie z wysyłką przez Web3Forms (`fetch`), z lejkiem GA (klik → wysyłka) i fallbackiem `mailto`.

**Architecture:** Wszystko w jednym pliku `web/index.html` (statyczna apka vanilla JS, zero backendu). Przycisk „Zgłoś błąd" otwiera modal (markup wzorowany na istniejącym `#pwa-ios-modal`). Submit buduje payload i wysyła `fetch POST` do Web3Forms z jednym automatycznym retry; sukces/porażka raportowane do GA4 przez `gtag`. Przy podwójnym faila — fallback `mailto` z prefillowanym opisem.

**Tech Stack:** vanilla JS (ES5-style jak reszta pliku), `fetch`, Web3Forms API, GA4 `gtag`. Brak frameworka testowego — weryfikacja manualna w przeglądarce + check w konsoli.

**Spec:** [docs/superpowers/specs/2026-06-08-bug-report-modal-web3forms-design.md](../specs/2026-06-08-bug-report-modal-web3forms-design.md)

> **Uwaga o commitach:** zgodnie z zasadą projektu (CLAUDE.md) **nie commituj** bez wyraźnej prośby użytkownika. Plan celowo nie zawiera kroków `git commit` — po wykonaniu zapytaj użytkownika, czy commitować.

> **Uwaga o testach:** brak runnera (Jest/Vitest itp.) i brak `package.json`. Logikę budowy payloadu wydzielamy do czystej funkcji `buildBugReportPayload`, którą weryfikujemy snippetem w konsoli przeglądarki. Reszta to weryfikacja manualna w DevTools (zakładka Network + Realtime GA).

---

## File Structure

Cała zmiana w jednym pliku:

- **Modify:** `web/index.html`
  - Markup modala — wstawić po bloku `#pwa-ios-modal` (po L1192).
  - CSS — dopisać 2 reguły obok istniejących `.pwa-modal*` (przy L1213).
  - JS — przepisać `reportQuestion()` (L2417-2425) + dodać `buildBugReportPayload`, `submitBugReport`, `postBugReport`, `onBugReportSuccess`, `onBugReportFailure`, `closeBugReport` i stałą `WEB3FORMS_KEY` + zmienną `bugReportCtx`.

---

### Task 1: Markup modala + CSS

**Files:**
- Modify: `web/index.html` (markup po L1192; CSS przy L1213)

- [ ] **Step 1: Dodać markup modala**

Wstawić bezpośrednio po zamknięciu bloku `#pwa-ios-modal` (po linii `</div>` na L1192), przed komentarzem `<!-- ==================== SESSION DETAIL ==================== -->`:

```html
<!-- ==================== BUG REPORT MODAL ==================== -->
<div id="bug-report-modal" class="pwa-modal" style="display:none">
  <div class="pwa-modal-box">
    <div id="bug-report-form">
      <strong id="bug-report-title">Zgłoś błąd w pytaniu</strong>
      <p>Opisz, co jest nie tak — trafi prosto do nas. Dziękujemy!</p>
      <textarea id="bug-report-desc" class="bug-report-input" rows="4" placeholder="Co jest nie tak z tym pytaniem?"></textarea>
      <input type="email" id="bug-report-email" class="bug-report-input" placeholder="Twój email (opcjonalnie, jeśli możemy dopytać)">
      <div id="bug-report-error" class="bug-report-error" style="display:none"></div>
      <div class="pwa-actions">
        <button class="btn-sm" id="bug-report-send" onclick="submitBugReport()">Wyślij</button>
        <button class="ghost btn-sm" onclick="closeBugReport()">Anuluj</button>
      </div>
    </div>
    <div id="bug-report-success" style="display:none">
      <strong>Dzięki! 🙌</strong>
      <p>Zgłoszenie wysłane.</p>
      <button class="btn-sm" onclick="closeBugReport()">Zamknij</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Dodać CSS dla pól modala**

Dopisać po regule `.pwa-modal-box` (po L1210, w tym samym bloku `<style>`):

```css
  .bug-report-input { width: 100%; box-sizing: border-box; margin-bottom: 10px; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-family: inherit; font-size: 0.9rem; }
  .bug-report-error { color: #b91c1c; font-size: 0.85rem; margin-bottom: 10px; line-height: 1.4; }
  .bug-report-error a { color: #b91c1c; font-weight: 600; }
```

- [ ] **Step 3: Weryfikacja — modal renderuje się i jest ukryty**

Otworzyć `web/index.html` w przeglądarce. W konsoli DevTools:

```js
document.getElementById('bug-report-modal').style.display
```

Expected: `"none"` (modal istnieje, domyślnie ukryty). Następnie:

```js
document.getElementById('bug-report-modal').style.display = 'flex'
```

Expected: modal pojawia się wyśrodkowany, z polem textarea, polem email i przyciskami „Wyślij" / „Anuluj". Po sprawdzeniu wrócić: `document.getElementById('bug-report-modal').style.display = 'none'`.

---

### Task 2: Stała klucza, kontekst i przepisanie `reportQuestion`

**Files:**
- Modify: `web/index.html` (funkcja `reportQuestion`, L2417-2425)

- [ ] **Step 1: Zastąpić całą funkcję `reportQuestion`**

Zamienić obecny blok (L2417-2425):

```js
  function reportQuestion(id) {
    gtag('event', 'error_reported', {
      question_id: id,
      question_index: state.currentIndex,
      question_type: state.session[state.currentIndex] ? state.session[state.currentIndex].typeId : null
    });
    var subject = encodeURIComponent('Zgłoszenie błędu – pytanie #' + id);
    window.location.href = 'mailto:michal@kutra.pl?cc=ewelina.wegrocka%40gmail.com&subject=' + subject;
  }
```

na:

```js
  var WEB3FORMS_KEY = 'ff0f13c3-3327-447b-a35a-85a1cea95385';
  var bugReportCtx = null;

  function reportQuestion(id) {
    var q = state.session[state.currentIndex];
    bugReportCtx = {
      question_id: id,
      question_index: state.currentIndex,
      question_type: q ? q.typeId : null,
      mode: state.mode,
      difficulty: state.difficulty
    };
    gtag('event', 'error_report_opened', {
      question_id: bugReportCtx.question_id,
      question_index: bugReportCtx.question_index,
      question_type: bugReportCtx.question_type
    });
    document.getElementById('bug-report-title').textContent = 'Zgłoś błąd w pytaniu #' + id;
    document.getElementById('bug-report-desc').value = '';
    document.getElementById('bug-report-email').value = '';
    var err = document.getElementById('bug-report-error');
    err.style.display = 'none';
    err.textContent = '';
    document.getElementById('bug-report-form').style.display = 'block';
    document.getElementById('bug-report-success').style.display = 'none';
    var sendBtn = document.getElementById('bug-report-send');
    sendBtn.disabled = false;
    sendBtn.textContent = 'Wyślij';
    document.getElementById('bug-report-modal').style.display = 'flex';
  }

  function closeBugReport() {
    document.getElementById('bug-report-modal').style.display = 'none';
  }
```

- [ ] **Step 2: Weryfikacja — klik otwiera modal i wysyła GA `error_report_opened`**

W przeglądarce: rozpocząć sesję w trybie Nauka (`learning`), odpowiedzieć na pytanie tak, by pokazało się wyjaśnienie i przycisk „Zgłoś błąd w pytaniu". W konsoli DevTools podejrzeć `dataLayer` przed i po kliknięciu:

```js
dataLayer.filter(function(e){ return e[1] === 'error_report_opened'; })
```

Kliknąć „Zgłoś błąd w pytaniu". Expected:
- modal się otwiera z nagłówkiem „Zgłoś błąd w pytaniu #<id>",
- powyższy filtr `dataLayer` zwraca nowy wpis z `question_id`, `question_index`, `question_type`,
- `bugReportCtx` w konsoli ma poprawne `mode` (`"learning"`) i `difficulty`.

---

### Task 3: Budowa payloadu (czysta funkcja) + check w konsoli

**Files:**
- Modify: `web/index.html` (dodać `buildBugReportPayload` zaraz po `closeBugReport`)

- [ ] **Step 1: Dodać funkcję `buildBugReportPayload`**

Wstawić po `closeBugReport()`:

```js
  function buildBugReportPayload(desc, email) {
    var c = bugReportCtx || {};
    return {
      access_key: WEB3FORMS_KEY,
      subject: 'Zgłoszenie błędu – pytanie #' + (c.question_id || '?'),
      from_name: 'KSAP – zgłoszenie błędu',
      message: desc,
      reporter_email: email || '(nie podano)',
      question_id: c.question_id || '',
      question_index: c.question_index,
      question_type: c.question_type,
      mode: c.mode,
      difficulty: c.difficulty
    };
  }
```

- [ ] **Step 2: Weryfikacja payloadu w konsoli**

W konsoli DevTools (po otwarciu modala z Task 2, więc `bugReportCtx` jest ustawiony):

```js
var p = buildBugReportPayload('Zła odpowiedź oznaczona jako poprawna', 'tester@example.com');
console.assert(p.access_key === 'ff0f13c3-3327-447b-a35a-85a1cea95385', 'access_key');
console.assert(p.message === 'Zła odpowiedź oznaczona jako poprawna', 'message');
console.assert(p.reporter_email === 'tester@example.com', 'email');
console.assert(p.question_id === bugReportCtx.question_id, 'question_id');
console.assert(p.subject.indexOf('#' + bugReportCtx.question_id) !== -1, 'subject ma id');
var p2 = buildBugReportPayload('opis', '');
console.assert(p2.reporter_email === '(nie podano)', 'pusty email → placeholder');
console.log('payload OK', p);
```

Expected: brak błędów `console.assert`, log `payload OK` z poprawnym obiektem.

---

### Task 4: Wysyłka z retry, GA sukces/porażka, fallback mailto

**Files:**
- Modify: `web/index.html` (dodać `submitBugReport`, `postBugReport`, `onBugReportSuccess`, `onBugReportFailure` po `buildBugReportPayload`)

- [ ] **Step 1: Dodać funkcje wysyłki**

Wstawić po `buildBugReportPayload`:

```js
  function submitBugReport() {
    var desc = document.getElementById('bug-report-desc').value.trim();
    var email = document.getElementById('bug-report-email').value.trim();
    var errEl = document.getElementById('bug-report-error');
    if (!desc) {
      errEl.textContent = 'Opisz proszę, co jest nie tak z pytaniem.';
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';
    errEl.textContent = '';
    var sendBtn = document.getElementById('bug-report-send');
    sendBtn.disabled = true;
    sendBtn.textContent = 'Wysyłanie…';
    postBugReport(buildBugReportPayload(desc, email), 1, desc);
  }

  function postBugReport(payload, retriesLeft, desc) {
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data && data.success) { onBugReportSuccess(payload); }
      else { throw new Error('web3forms returned success:false'); }
    })
    .catch(function() {
      if (retriesLeft > 0) { postBugReport(payload, retriesLeft - 1, desc); }
      else { onBugReportFailure(payload, desc); }
    });
  }

  function onBugReportSuccess(payload) {
    gtag('event', 'error_reported', {
      question_id: payload.question_id,
      question_index: payload.question_index,
      question_type: payload.question_type
    });
    document.getElementById('bug-report-form').style.display = 'none';
    document.getElementById('bug-report-success').style.display = 'block';
  }

  function onBugReportFailure(payload, desc) {
    gtag('event', 'error_report_failed', {
      question_id: payload.question_id,
      question_index: payload.question_index,
      question_type: payload.question_type
    });
    var sendBtn = document.getElementById('bug-report-send');
    sendBtn.disabled = false;
    sendBtn.textContent = 'Wyślij';
    var subject = encodeURIComponent('Zgłoszenie błędu – pytanie #' + (payload.question_id || '?'));
    var body = encodeURIComponent(desc);
    var href = 'mailto:michal@kutra.pl?cc=ewelina.wegrocka%40gmail.com&subject=' + subject + '&body=' + body;
    var errEl = document.getElementById('bug-report-error');
    errEl.innerHTML = 'Nie udało się wysłać. <a href="' + href + '">Wyślij mailem zamiast tego »</a>';
    errEl.style.display = 'block';
  }
```

- [ ] **Step 2: Weryfikacja — pusty opis blokuje wysyłkę**

W otwartym modalu zostawić pole opisu puste, kliknąć „Wyślij". Expected: pod polami pojawia się czerwony komunikat „Opisz proszę, co jest nie tak z pytaniem.", **brak** żądania w zakładce Network.

- [ ] **Step 3: Weryfikacja — ścieżka sukcesu (realna wysyłka)**

Wpisać opis testowy (np. „TEST – zgłoszenie z planu, zignoruj") + opcjonalnie email, kliknąć „Wyślij". Obserwować zakładkę Network. Expected:
- żądanie `POST https://api.web3forms.com/submit` ze statusem 200 i `{"success":true,...}`,
- modal przełącza się na widok „Dzięki! 🙌 Zgłoszenie wysłane",
- `dataLayer.filter(function(e){ return e[1] === 'error_reported'; })` zwraca nowy wpis,
- (po Task 6/forwardzie) mail dociera na michal@kutra.pl.

- [ ] **Step 4: Weryfikacja — retry + fallback mailto (symulacja awarii)**

W DevTools → Network ustawić throttling „Offline" **lub** w konsoli tymczasowo nadpisać `fetch`:

```js
var _f = window.fetch; window.fetch = function(){ return Promise.reject(new Error('sim fail')); };
```

Otworzyć modal, wpisać opis, kliknąć „Wyślij". Expected:
- w Network widać próbę i jej ponowienie (2 nieudane żądania) — przy nadpisanym `fetch` po prostu dwie próby w łańcuchu,
- pojawia się komunikat „Nie udało się wysłać. Wyślij mailem zamiast tego »" z linkiem `mailto:` zawierającym wpisany opis w `body`,
- `dataLayer.filter(function(e){ return e[1] === 'error_report_failed'; })` zwraca nowy wpis.

Przywrócić `fetch`:

```js
window.fetch = _f;
```

---

### Task 5: Weryfikacja end-to-end i porządki

**Files:**
- Modify: `web/index.html` (brak nowego kodu — weryfikacja całości)

- [ ] **Step 1: Sprawdzić, że stary `mailto` zniknął z głównej ścieżki**

```bash
grep -n "window.location.href = 'mailto" web/index.html
```

Expected: brak wyników (stary bezpośredni `mailto` z `reportQuestion` usunięty; `mailto` występuje już tylko w `onBugReportFailure` jako fallback w linku).

- [ ] **Step 2: Pełny przebieg w przeglądarce**

Od nowa: sesja → odpowiedź → „Zgłoś błąd" → modal → opis → „Wyślij" → sukces → „Zamknij". Potem ponownie „Zgłoś błąd" na innym pytaniu i sprawdzić, że modal jest **zresetowany** (puste pola, znów widać formularz, nie ekran sukcesu). Expected: oba przebiegi działają, reset modala poprawny.

- [ ] **Step 3: Sprawdzić brak błędów w konsoli**

Expected: konsola bez czerwonych błędów JS w trakcie całego przebiegu.

- [ ] **Step 4: (opcjonalnie) zaproponować commit użytkownikowi**

Nie commitować automatycznie. Zapytać użytkownika, czy zatwierdzić zmiany w gicie.

---

## Self-Review

**Spec coverage:**
- Modal na stronie z opisem (wymagany) + email (opcjonalny) → Task 1 (markup) + Task 4 (walidacja). ✅
- Ukryte pola kontekstu (`question_id`, `question_index`, `question_type`, `mode`, `difficulty`) → Task 2 (`bugReportCtx`) + Task 3 (`buildBugReportPayload`). ✅
- Web3Forms `fetch POST` + access key → Task 3/4. ✅
- Lejek GA `error_report_opened` / `error_reported` / `error_report_failed` → Task 2 + Task 4. ✅
- 1× retry → Task 4 (`postBugReport(..., 1, ...)`). ✅
- Fallback `mailto` z prefillem opisu po podwójnym faila → Task 4 (`onBugReportFailure`). ✅
- Odbiorcy: access key michal@ + forward (poza kodem) → udokumentowane; fallback mailto celuje w oba maile. ✅
- Usunięcie głównego `mailto` → Task 5 Step 1. ✅
- Brak kategorii/załączników (YAGNI) → nie ma w planie. ✅

**Placeholder scan:** brak „TBD/TODO"; każdy krok ma pełny kod lub konkretną komendę + oczekiwany wynik. ✅

**Type consistency:** `bugReportCtx` (pola `question_id/question_index/question_type/mode/difficulty`) spójne między `reportQuestion`, `buildBugReportPayload`; nazwy funkcji `submitBugReport`/`postBugReport`/`onBugReportSuccess`/`onBugReportFailure`/`closeBugReport` użyte spójnie w markupie (`onclick`) i definicjach; `WEB3FORMS_KEY` zdefiniowany raz, użyty w payloadzie. ✅
