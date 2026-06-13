# Handoff: integracja puli pytań części II (sprawdzian wiedzy) z aplikacją

> **Cel dokumentu:** przekazać świeżej sesji kontekst potrzebny do wpięcia 827 pytań części II w aplikację web. Pula jest dowieziona; integracja była świadomie POZA zakresem planu generacji (`plans/2026-06-10-pytania-sprawdzian-wiedzy.md`).
>
> Data: 2026-06-13. Stan prawny pytań: 2026-06.

---

## 1. Co jest gotowe (deliverable)

- **`data/wiedza/output/questions-wiedza.json`** — **827 pytań** jednokrotnego wyboru, walidacja `node tools/wiedza/validate.js` = 0 błędów.
- Rozkład domen: **pr 242, se 174, ap 146, fp 131, pz 80, oz 54** (pz i se podwojone na życzenie użytkownika — priorytet nauki, ponad wagi empiryczne).
- Trudność: easy 214 / medium 413 / hard 200. Origin: 263 realne KSAP 2023–2025 + 564 wygenerowane.
- 31 typów (`data/wiedza/analysis/taxonomy.json`) z pełnym pokryciem 41/41 zagadnień Zał. 1 (Dz.U. 2025 poz. 811).
- Statystyki: `data/wiedza/output/stats.md`. Raport weryfikacji: `data/wiedza/analysis/verify-report.md`.

### Schemat pytania (płaska tablica JSON)

```json
{
  "id": "w_pr_001",
  "domain": "pr",
  "topicId": "pr.informacja-publiczna-dane",
  "level": "easy",
  "instruction": "Wybierz jedną poprawną odpowiedź.",
  "question": "Do szczególnych kategorii danych osobowych nie zalicza się:",
  "options": ["A) …", "B) …", "C) …", "D) …"],
  "correct": 2,
  "explanation": "2–4 zdania, wartość edukacyjna.",
  "source": "RODO, art. 9 ust. 1",
  "origin": "ksap-2023",
  "legalState": "2026-06"
}
```

- `domain` ∈ `{pr, ap, fp, pz, oz, se}`
- `id` = `w_<domain>_<NNN>` (sekwencyjnie per domena)
- `correct` = indeks 0–3; `options` zawsze 4, z prefiksami `"A) "`…`"D) "`

---

## 2. Architektura aplikacji (zweryfikowana 2026-06-13)

**KLUCZOWE: część I i część II to dwie OSOBNE części egzaminu. Aplikacja obsługuje dziś tylko część I.**

### Część I — test predyspozycji (istniejące)
- `web/questions-unified.js` → globale `QUESTIONS_EASY` / `QUESTIONS_HARD` (obiekty `type1..type8`, tablice pytań), ładowane przez `<script src>` w `index.html`.
- `web/session-blueprint.js` → `composeSession()` losuje **15 pytań** wg FIXED blueprintu: 3 sylogizmy + 2 relacje + po 1 z typów 1,2,3,4,6,7,8 + 3 losowe (dedup, least-recently-seen).
- `index.html` renderuje przez `switch(q.typeId)` 1–8 (typ 8 = figury, render specjalny; typy mają pola type-specific: `leftPair`, `stem`, `narrative`, `chart`, `grid`…).
- `web/sw.js` (service worker, `CACHE = 'ksap-v8'`) cache'uje `questions-unified.js` w tablicy `ASSETS`.
- `web/stats.js` — statystyki (obecnie część I). GA taguje `question_type: q.typeId`.
- Stos: Netlify, SPA, bez backendu/frameworka. Walidator części I: `tools/validate-questions.js` (+ `tools/append-questions.js`).

### Część II — sprawdzian wiedzy (nowe)
- Format egzaminu: **90 pytań / 90 min, 6 dziedzin, jednokrotny wybór, bez punktów ujemnych**.
- Wszystkie 827 pytań są **JEDNORODNE**: stem (`question`) + 4 opcje. Brak pól type-specific (żadnych figur/tabel/wykresów). Render dużo prostszy niż część I.

---

## 3. Decyzje i luki do rozstrzygnięcia przy integracji

1. **Nie mieszać z blueprintem części I.** Część II potrzebuje własnego trybu (zakładka/przełącznik) i własnego doboru sesji:
   - tryb egzaminacyjny: 90 pytań wg wag dziedzin (rozkład domen w puli już je odzwierciedla),
   - tryb nauki: filtrowanie per dziedzina (`domain`) / typ (`topicId`), shufflowanie trudnością (`level`).
2. **Format ładowania pytań.** Zdecydować, jak wczytać płaski array:
   - opcja A: nowy `web/questions-wiedza.js` z globalem `QUESTIONS_WIEDZA = [...]` (spójne z częścią I, działa offline przez sw.js),
   - opcja B: `fetch()` JSON-a (część I tego NIE używa — wymaga obsługi błędów/offline).
3. **Nowe wartości względem części I:**
   - `level: "medium"` — część I zna tylko `easy`/`hard`; renderer/filtry/statystyki muszą obsłużyć 3 poziomy.
   - `topicId` (string) zamiast numerycznego `typeId`.
4. **Service worker:** dodać nowy plik pytań do `ASSETS` w `web/sw.js` i **bumpnąć wersję cache** (`ksap-v8` → `ksap-v9`), inaczej PWA nie pobierze nowego pliku.
5. **Render odpowiedzi:** po wyborze — zaznaczyć `correct`, pokazać `explanation` i `source` (tryb review, jak w „wrong-answer-review" części I).
6. **Walidator części II:** `tools/wiedza/validate.js` (sprawdza schemat, 4 opcje, prefiksy, `correct` 0–3, istnienie `topicId` w taxonomy, unikalność id, duplikaty treści).

---

## 4. Blocker: `.gitignore`

`data/` jest w `.gitignore` (zmiana użytkownika sprzed sesji generacji) → `data/wiedza/output/questions-wiedza.json` **nie commituje się jako-jest** (`git check-ignore` potwierdza).

Przy integracji pytania prawdopodobnie i tak trafią do `web/` (katalog śledzony) w formacie ładowanym przez aplikację — to rozwiąże blocker przy okazji. Gdyby trzymać źródło w `data/`: dopisać `!data/wiedza/` w `.gitignore` albo użyć `git add -f`.

---

## 5. Ograniczenia treści (stan 2026-06; do odświeżenia przed egzaminem 2027)

Pytania wrażliwe czasowo (poprawne na 2026-06, do ponownego sprawdzenia przed kolejnym cyklem):
- prokuratura — połączenie urzędów Ministra Sprawiedliwości i Prokuratora Generalnego (reforma rozdzielenia w toku),
- kwoty/dane 2026 — płaca minimalna 4806 zł, wydatki budżetu ≈919 mld zł, dzietność ~1,1, mediana wieku ~43, Gini / working poor,
- skład Komisji Europejskiej (kadencja do 2029), członkostwa NATO/UE/strefy euro (Bułgaria w euro od 2026-01),
- mechanizm korekcyjno-wyrównawczy JST (ustawa o dochodach JST z 2024 — „janosikowe" zastąpione korektą zamożności),
- rynek pracy — ustawa z 20.03.2025 zniosła zależność długości zasiłku od lokalnej stopy bezrobocia (1 pytanie odrzucono z tego powodu w weryfikacji).

Typy `pz.*`, `oz.*` (poza kontrolą zarządczą) i część `se.*` oraz akty bez lokalnej kopii (Pzp / Kodeks pracy / Ordynacja podatkowa / ustawy ubezpieczeniowe) opierają się na wiedzy modelowej, nie na grep-dowodzie z tekstu aktu.

---

## 6. Pliki referencyjne (mapa)

| Co | Gdzie |
|---|---|
| Finalna pula (827) | `data/wiedza/output/questions-wiedza.json` |
| Statystyki + ograniczenia | `data/wiedza/output/stats.md` |
| Raport weryfikacji adwersaryjnej | `data/wiedza/analysis/verify-report.md` |
| Taksonomia typów (31) | `data/wiedza/analysis/taxonomy.json` |
| Przewodnik stylu (formuła 2025) | `data/wiedza/analysis/style-guide.md` |
| Walidator części II | `tools/wiedza/validate.js` |
| Plan generacji (wykonany) | `docs/superpowers/plans/2026-06-10-pytania-sprawdzian-wiedzy.md` |
| Część I — pytania / blueprint / app | `web/questions-unified.js`, `web/session-blueprint.js`, `web/index.html`, `web/sw.js` |
