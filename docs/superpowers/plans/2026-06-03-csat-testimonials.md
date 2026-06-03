# CSAT + Wall testimoniali — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbierać CSAT (ocena 1–5 + komentarz) przez formularz Tally i pokazać ręcznie wyselekcjonowane testimoniale na ekranach Home i About.

**Architecture:** Appka to pojedynczy statyczny [web/index.html](../../../web/index.html) (vanilla JS, PWA, Netlify, zero backendu). CSAT zbieramy zewnętrznym formularzem Tally (link/anchor + zdarzenie GA). Testimoniale żyją w nowym pliku danych `web/testimonials.js` (ręczna kuracja), renderowane wspólną funkcją w dwóch miejscach. Brak frameworka i brak setupu testowego — weryfikacja ręczna w przeglądarce (jak w [specu](../specs/2026-06-03-csat-testimonials-design.md)).

**Tech Stack:** Vanilla JS (ES5-style, `var`/`function`, jak reszta pliku), inline CSS w `<style>`, Tally.so (formularz), GTM/GA4 (`window.dataLayer.push`), Service Worker cache ([web/sw.js](../../../web/sw.js)).

**Spec:** [docs/superpowers/specs/2026-06-03-csat-testimonials-design.md](../specs/2026-06-03-csat-testimonials-design.md)

**Uruchomienie do weryfikacji:** z katalogu `web/` odpal lokalny serwer (Service Worker i ścieżki bezwzględne wymagają http, nie `file://`):
```bash
cd web && python3 -m http.server 8000
```
Następnie otwórz `http://localhost:8000/`. Po każdej zmianie rób **twardy reload** (Cmd+Shift+R), bo SW cache'uje pliki. Zdarzenia GA sprawdzaj w GA4 DebugView lub w konsoli (`window.dataLayer`).

---

## Faza 1 — Zbieranie CSAT

### Task 1: Utworzenie formularza CSAT w Tally (krok zewnętrzny)

**Files:** brak (konfiguracja w panelu Tally; wynik = URL formularza użyty w Task 2).

- [ ] **Step 1: Załóż/zaloguj się do Tally i utwórz nowy formularz „Oceń aplikację"**

Pola formularza (dokładnie te):
1. **Ocena** — typ „Linear scale" lub „Rating" (gwiazdki), zakres **1–5**, etykieta „Jak oceniasz aplikację?". **Wymagane.**
2. **Komentarz** — „Long answer text", etykieta „Co działa, a co warto poprawić?". Opcjonalne.
3. **Imię** — „Short answer text", etykieta „Imię (opcjonalnie, do podpisu opinii)". Opcjonalne.
4. **Zgoda na publikację** — „Checkbox", etykieta: „Zgadzam się na publikację mojego komentarza (z imieniem) na stronie aplikacji". Opcjonalne (brak zaznaczenia = nie publikujemy).

- [ ] **Step 2: Opublikuj formularz i skopiuj jego publiczny URL**

W Tally: „Publish" → skopiuj link postaci `https://tally.so/r/XXXXXX`. Ten URL wklejasz w Task 2, Step 1.

- [ ] **Step 3: Wyślij testową odpowiedź i potwierdź, że widać ją w dashboardzie Tally**

Wypełnij formularz raz (ocena + komentarz + zaznaczona zgoda) i sprawdź, że odpowiedź pojawia się w zakładce „Submissions". To potwierdza, że zbieranie działa.

Brak commita — to konfiguracja zewnętrzna.

---

### Task 2: Prompt CSAT na ekranie podsumowania + helpery + flagi localStorage

**Files:**
- Modify: [web/index.html](../../../web/index.html) — dodanie stałej i helperów w głównym `<script>` (zaczyna się w linii 1173), nowa funkcja obok `kofiWidget()` (linia 2423), warunek w `showSummary()` (linia 2209).

- [ ] **Step 1: Dodaj stałą z URL-em formularza na początku głównego skryptu**

W [web/index.html](../../../web/index.html) tuż po otwarciu głównego `<script>` (linia 1173), jako pierwsza linia kodu w nim, dodaj:

```js
  // URL formularza CSAT (Tally) — z Task 1, Step 2
  var TALLY_FORM_URL = 'https://tally.so/r/XXXXXX'; // ← WKLEJ realny URL z Tally
```

- [ ] **Step 2: Dodaj helper zdarzenia GA + funkcję promptu obok `kofiWidget()`**

W [web/index.html](../../../web/index.html) bezpośrednio przed funkcją `kofiWidget()` (linia 2423) dodaj:

```js
  function trackCsatClick(source) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'feedback_submitted', source: source });
    try { localStorage.setItem('ksap_csat_done', '1'); } catch (e) {}
  }

  function openCsat(source) {
    trackCsatClick(source);
    window.open(TALLY_FORM_URL, '_blank', 'noopener');
  }

  function csatPrompt(source) {
    return '<div style="margin-top:32px;text-align:center;padding:20px 0;border-top:1px solid #e5e7eb;">'
      + '<p style="margin-bottom:12px;color:#374151;font-size:0.95rem;">Jak oceniasz aplikację? Twoja opinia pomaga ją ulepszać.</p>'
      + '<a href="' + TALLY_FORM_URL + '" target="_blank" rel="noopener" onclick="trackCsatClick(\'' + source + '\')" style="display:inline-block;background:#2563eb;color:#fff;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:15px;">⭐ Oceń aplikację</a>'
      + '</div>';
  }
```

(`trackCsatClick` jest też używany przez link w menu — Task 3. `openCsat` używa go z menu, gdzie potrzebny `window.open` po kliknięciu przycisku.)

- [ ] **Step 3: Pokaż prompt na summary po 2. ukończonej sesji**

W `showSummary()` ([web/index.html](../../../web/index.html) linia 2209), zaraz po linii budującej `html` z `buildSummaryHtml(...)` i **przed** blokiem `summary-buttons`, wstaw warunek. Zmień fragment:

```js
    let html = buildSummaryHtml(items, meta, getSessions().length >= 1 && meta.score / meta.total >= 0.5);
    html += '<div class="summary-buttons">';
```

na:

```js
    let html = buildSummaryHtml(items, meta, getSessions().length >= 1 && meta.score / meta.total >= 0.5);

    // CSAT prompt: po 2. ukończonej sesji, raz (saveSession() już policzyło bieżącą sesję)
    if (getSessions().length >= 2 && !localStorage.getItem('ksap_csat_done') && !localStorage.getItem('ksap_csat_shown')) {
      html += csatPrompt('summary');
      try { localStorage.setItem('ksap_csat_shown', '1'); } catch (e) {}
    }

    html += '<div class="summary-buttons">';
```

- [ ] **Step 4: Weryfikacja ręczna**

1. Otwórz `http://localhost:8000/`, w konsoli wyczyść flagi i sesje: `localStorage.removeItem('ksap_csat_shown'); localStorage.removeItem('ksap_csat_done'); localStorage.removeItem('ksap_sessions');`
2. Ukończ **1 sesję** → na ekranie wyniku **NIE ma** przycisku „⭐ Oceń aplikację".
3. Ukończ **2. sesję** → przycisk „⭐ Oceń aplikację" **jest**. W konsoli: `localStorage.getItem('ksap_csat_shown')` zwraca `'1'`.
4. Ukończ **3. sesję** → przycisku **już nie ma** (bo `ksap_csat_shown` ustawione).
5. Kliknij przycisk → otwiera formularz Tally w nowej karcie; w `window.dataLayer` jest wpis `{event:'feedback_submitted', source:'summary'}`; `localStorage.getItem('ksap_csat_done')` zwraca `'1'`.

Expected: wszystkie punkty zgodne z opisem.

- [ ] **Step 5: Commit**

```bash
git add web/index.html
git commit -m "feat: prompt CSAT (Tally) na ekranie wyników po 2. sesji"
```

---

### Task 3: Stały link „Oceń aplikację" w menu

**Files:**
- Modify: [web/index.html](../../../web/index.html) — menu konta (`#account-menu`, linie 1006–1013).

- [ ] **Step 1: Dodaj pozycję menu**

W [web/index.html](../../../web/index.html) w `#account-menu`, po pozycji „O aplikacji" (linia 1012) i przed zamknięciem `</div>` (linia 1013), dodaj:

```html
      <div class="menu-divider"></div>
      <button class="menu-item" onclick="openCsat('menu'); closeAccountMenu();">Oceń aplikację</button>
```

- [ ] **Step 2: Weryfikacja ręczna**

1. Twardy reload. Kliknij ikonę menu (prawy górny róg) → widać „Oceń aplikację".
2. Kliknij → otwiera formularz Tally; menu się zamyka; w `window.dataLayer` jest `{event:'feedback_submitted', source:'menu'}`.
3. Link działa **niezależnie** od flag (zadziała nawet gdy `ksap_csat_done` ustawione).

Expected: link zawsze dostępny, zdarzenie z `source:'menu'`.

- [ ] **Step 3: Commit**

```bash
git add web/index.html
git commit -m "feat: link 'Oceń aplikację' w menu (source=menu)"
```

---

## Faza 2 — Wall testimoniali

> Zapala się dopiero gdy `web/testimonials.js` ma wpisy. Do czasu zebrania zgód z Fazy 1 wall pozostaje pusty (nic się nie renderuje) — świadomie, by uniknąć negatywnego social proofu.

### Task 4: Plik danych `web/testimonials.js` + załadowanie i cache

**Files:**
- Create: `web/testimonials.js`
- Modify: [web/index.html](../../../web/index.html) — dodanie `<script src>` (po linii 1170).
- Modify: [web/sw.js](../../../web/sw.js) — dodanie do `ASSETS` i bump wersji cache.

- [ ] **Step 1: Utwórz `web/testimonials.js`**

```js
// Testimoniale wybrane RĘCZNIE z odpowiedzi formularza Tally.
// Publikuj WYŁĄCZNIE wpisy z zaznaczoną zgodą na publikację. Tylko imię — bez nazwiska/maila.
// Schemat: { rating: 1-5, text: "komentarz", name: "Imię" lub "", date: "YYYY-MM" }
// Po dodaniu wpisów: zbij wersję CACHE w web/sw.js, żeby deploy odświeżył dane.
var TESTIMONIALS = [
  // { rating: 5, text: "Świetna powtórka przed egzaminem!", name: "Anna", date: "2026-06" },
];
```

- [ ] **Step 2: Załaduj plik w `index.html` przed głównym skryptem**

W [web/index.html](../../../web/index.html) zaraz po linii `<script src="questions-unified.js"></script>` (linia 1170) dodaj:

```html
<script src="testimonials.js"></script>
```

- [ ] **Step 3: Dodaj plik do cache Service Workera i zbij wersję**

W [web/sw.js](../../../web/sw.js) zmień linię 1 z `const CACHE = 'ksap-v6';` na `const CACHE = 'ksap-v7';` oraz dodaj `'./testimonials.js',` do tablicy `ASSETS` (po `'./questions-unified.js',`):

```js
const CACHE = 'ksap-v7';
const ASSETS = [
  './',
  './index.html',
  './questions-unified.js',
  './testimonials.js',
  './bg.png',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
```

- [ ] **Step 4: Weryfikacja ręczna**

1. Twardy reload `http://localhost:8000/`. W konsoli: `typeof TESTIMONIALS` zwraca `'object'`, `TESTIMONIALS.length` zwraca `0`.
2. Brak błędów 404 w zakładce Network dla `testimonials.js`.

Expected: plik ładuje się, `TESTIMONIALS` to pusta tablica.

- [ ] **Step 5: Commit**

```bash
git add web/testimonials.js web/index.html web/sw.js
git commit -m "feat: plik danych testimoniali + cache SW (v7)"
```

---

### Task 5: Funkcje renderujące wall (wspólne dla Home i About)

**Files:**
- Modify: [web/index.html](../../../web/index.html) — nowe funkcje w głównym `<script>`, obok `csatPrompt()` (dodanego w Task 2, przed `kofiWidget()` w linii 2423).

- [ ] **Step 1: Dodaj funkcje renderujące**

W [web/index.html](../../../web/index.html) bezpośrednio po funkcji `csatPrompt()` (Task 2) dodaj. Funkcja `escHtml` już istnieje w pliku (używana m.in. w `buildSummaryHtml`) — reużywamy ją.

```js
  function testimonialStars(rating) {
    var r = Math.max(0, Math.min(5, rating | 0));
    return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r);
  }

  function testimonialCard(t) {
    var name = t.name ? escHtml(t.name) : 'Anonimowo';
    var meta = name + (t.date ? ' · ' + escHtml(t.date) : '');
    return '<figure style="margin:0;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px 18px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">'
      + '<div style="color:#f59e0b;font-size:1rem;letter-spacing:2px;margin-bottom:8px;">' + testimonialStars(t.rating) + '</div>'
      + '<blockquote style="margin:0;color:#374151;font-size:0.95rem;line-height:1.55;">' + escHtml(t.text) + '</blockquote>'
      + '<figcaption style="margin-top:10px;color:#6b7280;font-size:0.82rem;">— ' + meta + '</figcaption>'
      + '</figure>';
  }

  // Zwraca HTML kart testimoniali lub '' gdy brak wpisów (wall się wtedy nie renderuje).
  function testimonialsCards() {
    if (typeof TESTIMONIALS === 'undefined' || !TESTIMONIALS.length) return '';
    return TESTIMONIALS.map(testimonialCard).join('');
  }
```

- [ ] **Step 2: Weryfikacja ręczna (tymczasowe dane)**

1. W `web/testimonials.js` odkomentuj przykładowy wpis i dodaj drugi, np.:
```js
var TESTIMONIALS = [
  { rating: 5, text: "Świetna powtórka przed egzaminem!", name: "Anna", date: "2026-06" },
  { rating: 4, text: "Dobre zadania, brakuje tylko więcej numerycznych.", name: "", date: "2026-06" },
];
```
2. Twardy reload. W konsoli: `testimonialsCards()` zwraca niepusty string HTML (zawiera `figure`, gwiazdki, „Anna", „Anonimowo").
3. Z pustą tablicą `testimonialsCards()` zwraca `''`.
4. **Cofnij dane testowe** — przywróć `TESTIMONIALS` do pustej tablicy (z zakomentowanym przykładem) przed commitem.

Expected: render działa z danymi, pusty string bez danych.

- [ ] **Step 3: Commit**

```bash
git add web/index.html web/testimonials.js
git commit -m "feat: funkcje renderujące karty testimoniali"
```

---

### Task 6: Wall na ekranie „O aplikacji"

**Files:**
- Modify: [web/index.html](../../../web/index.html) — sekcja `#screen-about` (przed „Wspieraj projekt", linia 1151); render przy wejściu na ekran w `showScreen()` (linia 1213).

- [ ] **Step 1: Dodaj kontener sekcji w About**

W [web/index.html](../../../web/index.html) bezpośrednio przed `<div class="about-section" style="text-align:center;">` zawierającym „Wspieraj projekt" (linia 1151), wstaw:

```html
  <div class="about-section" id="about-testimonials" style="display:none;">
    <h3>Co mówią inni</h3>
    <div id="about-testimonials-list" style="display:grid;gap:12px;"></div>
  </div>
```

- [ ] **Step 2: Wypełnij kontener przy wejściu na ekran About**

W funkcji `showScreen(name)` ([web/index.html](../../../web/index.html) linia 1213) — która już pushuje `screen_view` (linia 1215) — dodaj na końcu jej ciała (przed zamykającym `}`):

```js
    if (name === 'about') {
      var cards = testimonialsCards();
      var box = document.getElementById('about-testimonials');
      var list = document.getElementById('about-testimonials-list');
      if (cards && box && list) {
        list.innerHTML = cards;
        box.style.display = '';
      } else if (box) {
        box.style.display = 'none';
      }
    }
```

- [ ] **Step 3: Weryfikacja ręczna**

1. Z **pustym** `TESTIMONIALS`: wejdź w menu → „O aplikacji" → sekcji „Co mówią inni" **NIE ma** (kontener `display:none`).
2. Tymczasowo dodaj 2 wpisy do `web/testimonials.js`, twardy reload, wejdź w „O aplikacji" → sekcja „Co mówią inni" jest, karty renderują się nad „Wspieraj projekt".
3. **Cofnij** dane testowe (pusta tablica) przed commitem.

Expected: sekcja widoczna tylko gdy są wpisy.

- [ ] **Step 4: Commit**

```bash
git add web/index.html web/testimonials.js
git commit -m "feat: wall testimoniali na ekranie O aplikacji"
```

---

### Task 7: Wall na Home z efektem sticky-reveal

**Files:**
- Modify: [web/index.html](../../../web/index.html) — CSS w `<style>` (dodać przy regułach `#screen-home`, linia 85), markup w `#screen-home` (linie 1022–1028), render przy wejściu na Home w `showScreen()` (linia 1213).

Efekt: ilustracja `web/bg.png` jako warstwa sticky u góry sekcji Home, z gradientowym zanikaniem u dołu; testimoniale leżą pod nią i wyłaniają się przy scrollu (fade + translate przez `IntersectionObserver`). Degradacja: bez JS/IO testimoniale po prostu są widoczne jako zwykła lista.

- [ ] **Step 1: Dodaj CSS**

W [web/index.html](../../../web/index.html) w bloku `<style>`, w pobliżu reguł `#screen-home` (linia 85), dodaj:

```css
    #home-testimonials { margin-top: 28px; }
    #home-hero {
      position: sticky;
      top: 0;
      z-index: 1;
      height: 220px;
      background: url('bg.png') center/contain no-repeat;
      /* gradientowe zanikanie dolnej krawędzi do tła strony */
      -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
      mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
    }
    #home-testimonials-list {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 12px;
      margin-top: -24px;
      padding: 0 4px;
    }
    .home-tcard {
      opacity: 1;
      transform: none;
      transition: opacity .5s ease, transform .5s ease;
    }
    .home-tcard.reveal-pending { opacity: 0; transform: translateY(24px); }
```

(`.home-tcard.reveal-pending` nakłada JS tylko gdy `IntersectionObserver` jest dostępny — bez JS karty zostają widoczne: graceful degradation.)

- [ ] **Step 2: Dodaj markup w `#screen-home`**

W [web/index.html](../../../web/index.html) w `#screen-home`, po `<p id="exam-countdown"></p>` (linia 1027) i przed `</div>` (linia 1028), wstaw:

```html
  <div id="home-testimonials" style="display:none;">
    <div id="home-hero"></div>
    <div id="home-testimonials-list"></div>
  </div>
```

- [ ] **Step 3: Render + reveal przy wejściu na Home**

W funkcji `showScreen(name)` ([web/index.html](../../../web/index.html) linia 1213), w tym samym miejscu co w Task 6 Step 2 (przed zamykającym `}`), dodaj obok bloku `about`:

```js
    if (name === 'home') {
      var hcards = (typeof TESTIMONIALS !== 'undefined' && TESTIMONIALS.length)
        ? TESTIMONIALS.map(function (t) {
            return '<div class="home-tcard">' + testimonialCard(t) + '</div>';
          }).join('')
        : '';
      var hbox = document.getElementById('home-testimonials');
      var hlist = document.getElementById('home-testimonials-list');
      if (hcards && hbox && hlist) {
        hlist.innerHTML = hcards;
        hbox.style.display = '';
        if ('IntersectionObserver' in window) {
          var cards = hlist.querySelectorAll('.home-tcard');
          for (var i = 0; i < cards.length; i++) cards[i].classList.add('reveal-pending');
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                en.target.classList.remove('reveal-pending');
                io.unobserve(en.target);
              }
            });
          }, { threshold: 0.15 });
          for (var j = 0; j < cards.length; j++) io.observe(cards[j]);
        }
      } else if (hbox) {
        hbox.style.display = 'none';
      }
    }
```

- [ ] **Step 4: Weryfikacja ręczna**

1. Z **pustym** `TESTIMONIALS`: ekran Home wygląda jak dziś — bloku `#home-testimonials` nie widać.
2. Tymczasowo dodaj 4–5 wpisów do `web/testimonials.js`, twardy reload Home:
   - pod countdownem pojawia się ilustracja `bg.png` z miękko zanikającą dolną krawędzią;
   - przy scrollowaniu w dół ilustracja zostaje „przyklejona" u góry (sticky), a karty testimoniali płynnie pojawiają się (fade + przesunięcie) wyłaniając się spod niej;
   - sprawdź na szerokości mobilnej (DevTools, ~375px) i desktopowej.
3. Wyłącz JS (DevTools → Settings → Disable JavaScript) albo wyobraź brak IO: karty są po prostu widoczne (brak `reveal-pending`).
4. **Cofnij** dane testowe (pusta tablica) przed commitem.

Expected: sticky ilustracja + reveal kart przy scrollu; bez danych Home bez zmian; bez JS karty widoczne.

- [ ] **Step 5: Commit**

```bash
git add web/index.html web/testimonials.js
git commit -m "feat: wall testimoniali na Home z efektem sticky-reveal"
```

---

## Po wdrożeniu obu faz

- Przenieś wpis „System oceniania (CSAT) + wall testimoniali" z [BACKLOG.md](../../../BACKLOG.md) do `BACKLOG_DONE.md` (zgodnie z [CLAUDE.md](../../../CLAUDE.md)).
- **Cykl aktualizacji testimoniali:** wybrane (ze zgodą) odpowiedzi z Tally wklejasz do `web/testimonials.js`, zbijasz `CACHE` w [web/sw.js](../../../web/sw.js) (`v7` → `v8` …), deploy.
- Licznik kaw (Ko‑fi count) — świadomie poza zakresem; osobny brainstorming, gdy będzie co pokazać.

## Decyzje świadome (z przeglądu speca)

- **`feedback_submitted` to proxy** — zdarzenie pada przy kliknięciu CTA otwierającego formularz, nie przy realnym wysłaniu (bez integracji webhooków Tally nie mamy callbacku). Akceptowalne przy tej skali.
- **Stan pusty = brak renderu** wall na Home i About — chroni przed negatywnym social proofem.
- **Cache-first SW** wymaga bumpu `CACHE` przy każdej aktualizacji `testimonials.js`, inaczej użytkownicy zobaczą starą wersję.
