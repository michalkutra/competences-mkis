# Pula pytań do części II egzaminu (sprawdzian wiedzy) — plan przygotowania

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **UWAGA (CLAUDE.md + pamięć projektu): NIE commituj i NIE pushuj zmian — nawet jeśli kroki planu sugerują commit. Użytkownik commituje sam.**

**Goal:** Wyprodukować pulę **~700 pytań jednokrotnego wyboru** do części II egzaminu na mianowanie w służbie cywilnej (sprawdzian wiedzy), pogrupowanych w logiczne typy wg Zał. 1 do Rozporządzenia, z poziomami trudności, wyjaśnieniami i referencją do źródła — jako ustrukturyzowane pliki JSON. **Integracja z aplikacją web jest POZA zakresem** (osobna przyszła praca).

**Architecture:** Potok danych: (1) pobranie źródeł (realne egzaminy KSAP 2023–2025, Rozporządzenie z Zał. 1, Leksykon budżetowy Sejmu, ustawa budżetowa 2026, akty z ISAP) → (2) parsowanie realnych pytań + budowa taksonomii typów → (3) mapowanie pytań na taksonomię = empiryczne wagi → (4) alokacja 700 slotów per typ → (5) przyjęcie zweryfikowanych pytań realnych + generowanie reszty batchami per typ (subagentami) → (6) adwersaryjna weryfikacja każdego batcha → (7) walidacja schematu i raport. Wszystkie artefakty pośrednie zapisywane na dysk (resumowalność).

**Tech Stack:** bash + curl (z przeglądarkowym User-Agent), Python venv + pypdf (ekstrakcja PDF), Node.js (walidator JSON), subagenty do generacji/weryfikacji treści.

---

## Kontekst — ustalenia z konwersacji (sesja 2026-06-10), WIĄŻĄCE

1. **Egzamin:** część II postępowania kwalifikacyjnego = sprawdzian wiedzy: **90 pytań jednokrotnego wyboru, 90 minut, 0–90 pkt, 1 pkt za poprawną, bez punktów ujemnych**. Najbliższy egzamin: **2026-07-04**. Stan prawny pytań na egzaminie z danego roku = **31 maja roku egzaminu** (dla 2026 → 31 maja 2026).
2. **Zakres tematyczny (6 dziedzin):** prawo; administracja publiczna; finanse publiczne; polityka zagraniczna i organizacje międzynarodowe; organizacja i zarządzanie; zagadnienia społeczne i ekonomiczne. Szczegóły: **Zał. nr 1 do Rozporządzenia PRM ws. sposobu przeprowadzania postępowania kwalifikacyjnego w służbie cywilnej** (tekst jednolity: Dz.U. 2025 poz. 811).
3. **Zmiana formuły od 2025** ([komunikat gov.pl](https://www.gov.pl/web/sluzbacywilna/informacja-o-sprawdzianie-w-toku-postepowania-kwalifikacyjnego-w-sluzbie-cywilnej-w-2025-r)): pytania sprawdzają **rozumienie ogólnych zasad i mechanizmów wynikających z przepisów, NIE pamięciowe brzmienie przepisów**. Egzamin 2025 = złoty standard stylu. To jest najważniejsza dyrektywa dla generacji.
4. **Realne pytania:** korzystamy **wyłącznie z lat 2023–2025** (starsze ignorujemy), ze szczególnym uwzględnieniem 2025. W pytaniach 2023–2024 **obowiązkowo weryfikować aktualność stanu prawnego** — zdezaktualizowane poprawić albo odrzucić. W PDF-ach KSAP poprawna odpowiedź oznaczona gwiazdką `*`.
5. **Cel ilościowy: ~700 pytań** łącznie (realne zweryfikowane + wygenerowane).
6. **Grupowanie w typy** wg Zał. 1 (taksonomia), tak aby dało się później (a) dodawać pytania do danego typu, (b) shufflować poziomem trudności. Każde pytanie ma `topicId` i `level`.
7. **Ignorujemy** mini-przewodnik KSAP „Co warto wiedzieć o sprawdzianie wiedzy" (decyzja użytkownika).
8. Dane liczbowe: leksykon Sejmu ma wykresy tylko do ~2022 — **liczby brać z ustawy budżetowej na 2026** (Dz.U. 2026 poz. 62) i bieżących danych GUS/NBP. Pytania liczbowe na egzaminie są rzadkie (~2/90) i pytają o rzędy wielkości.
9. **Triki dostępowe (zweryfikowane empirycznie):**
   - `www.sejm.gov.pl` (leksykon) blokuje boty CAPTCHA, ale **curl z przeglądarkowym User-Agent przechodzi**. WebFetch dostaje CAPTCHA — nie używać do sejm.gov.pl.
   - Obrazki „Dane liczbowe" leksykonu są na `orka2.sejm.gov.pl` — **działa tylko HTTPS** (HTTP zwraca 503).
   - PDF-y KSAP, Dziennika Ustaw i ISAP pobierają się zwykłym curl; wszystkie są tekstowe (pypdf wyciąga tekst).
   - UA do wszystkich curl: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36`

## Struktura plików (wszystko nowe)

```
data/wiedza/
  sources/            # surowe pobrane pliki (PDF, HTML, JPG)
    ksap/             # egzaminy 2023A/B, 2024A/B, 2025A/B
    leksykon/         # index.json + 189 haseł HTML + obrazki dane-liczbowe
    akty/             # rozporządzenie, ustawa budżetowa, akty ISAP
  extracted/          # teksty wyciągnięte z PDF/HTML (txt/json)
  analysis/           # taxonomy.json, exam-mapping.json, weights.json, allocation.json, style-guide.md
  output/
    real/             # pool-real.json (zweryfikowane pytania KSAP)
    generated/        # batch-<topicId>-<nn>.json (batche wygenerowane)
    questions-wiedza.json   # FINALNY scalony plik
    stats.md          # raport końcowy
tools/wiedza/
  fetch-sources.sh    # pobieranie wszystkich źródeł
  extract-pdfs.py     # PDF → txt
  parse-exams.py      # txt egzaminów → JSON pytań z kluczem
  crawl-leksykon.py   # indeks + hasła + obrazki
  validate.js         # walidator schematu + statystyki puli
```

## Schemat pytania (FINALNY — używać wszędzie)

**Cel drugorzędny (decyzja użytkownika):** format ma być **technicznie kompatybilny z istniejącymi pytaniami części I** w [web/questions-unified.js](../../web/questions-unified.js) (980 pytań, pola `id`, `typeId`, `level`, `instruction`, `options` ze stringami prefiksowanymi `"A) "`, `correct` 0-based, `explanation`), żeby późniejsze wpięcie do aplikacji było łatwe. To NIE jest cel nadrzędny — przy konflikcie wygrywa jakość merytoryczna pytań, a rozjazd opisz w stats.md. Konwencje warto podejrzeć też w `tools/validate-questions.js` i `tools/append-questions.js`.

```json
{
  "id": "w_fp_001",
  "domain": "fp",
  "topicId": "fp.budzet-panstwa",
  "level": "medium",
  "instruction": "Wybierz jedną poprawną odpowiedź.",
  "question": "Treść pytania?",
  "options": ["A) opcja", "B) opcja", "C) opcja", "D) opcja"],
  "correct": 0,
  "explanation": "Dlaczego poprawna jest poprawna i co testuje pytanie (2–4 zdania, wartość edukacyjna).",
  "source": "ustawa o finansach publicznych, art. 110",
  "origin": "ksap-2025 | ksap-2024 | ksap-2023 | generated",
  "legalState": "2026-06"
}
```

- Pola wspólne z częścią I (`id`, `level`, `instruction`, `options` z prefiksem `"A) "`, `correct` 0-based, `explanation`) zachowują dokładnie te same konwencje. Pola `domain`/`topicId`/`question`/`source`/`origin`/`legalState` są addytywne — część I ma analogicznie pola specyficzne per typ. Odpowiednikiem `typeId` (numerycznego w cz. I) jest tu `topicId` (string z taksonomii).
- `domain` ∈ `pr` (prawo), `ap` (administracja publiczna), `fp` (finanse publiczne), `pz` (polityka zagraniczna i org. międzynarodowe), `oz` (organizacja i zarządzanie), `se` (zagadnienia społeczno-ekonomiczne).
- `level`: `"easy"` = pojedynczy fakt/definicja wprost ze źródła; `"medium"` = rozumienie zasady/mechanizmu (domyślny styl 2025); `"hard"` = zastosowanie przepisu do sytuacji, przypadek graniczny, łączenie ≥2 przepisów. (Cz. I używa easy/hard; medium jest nową wartością — aplikacja obsłuży ją przy integracji.)
- `options` zawsze 4, `correct` = indeks 0–3, pozycja poprawnej losowa.
- `id`: `w_<domain>_<numer sekwencyjny per domena, 3 cyfry>`.

---

### Task 1: Workspace i narzędzia

**Files:**
- Create: `data/wiedza/` (drzewo katalogów jak wyżej), `tools/wiedza/`

- [ ] **Step 1:** Utwórz katalogi:

```bash
mkdir -p data/wiedza/{sources/{ksap,leksykon,akty},extracted,analysis,output/{real,generated}} tools/wiedza
```

- [ ] **Step 2:** Venv z pypdf (systemowy pip jest zablokowany przez PEP 668):

```bash
python3 -m venv /tmp/pdfenv && /tmp/pdfenv/bin/pip install --quiet pypdf
```

- [ ] **Step 3:** Test dostępu (oczekiwane: HTTP 200 i tytuł "Leksykon budżetowy"):

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
curl -sL -A "$UA" "https://www.sejm.gov.pl/sejm10.nsf/BASLeksykon.xsp" -o /tmp/lex_test.html -w "%{http_code}\n" && grep -o '<title>[^<]*' /tmp/lex_test.html
```

### Task 2: Pobranie wszystkich źródeł

**Files:**
- Create: `tools/wiedza/fetch-sources.sh`, pliki w `data/wiedza/sources/`

- [ ] **Step 1:** Egzaminy KSAP. Najpierw pobierz stronę z listą i wyciągnij faktyczne linki (nie zgaduj nazw plików):

```bash
curl -sL -A "$UA" "https://ksap.gov.pl/ksap/postepowanie-kwalifikacyjne-w-sluzbie-cywilnej/sprawdziany" -o /tmp/sprawdziany.html
grep -oE 'href="[^"]*pytania[^"]*wiedzy[^"]*\.pdf"' /tmp/sprawdziany.html
```

Pobierz **tylko lata 2023, 2024, 2025, wersje A i B** (6 plików) do `data/wiedza/sources/ksap/` z nazwami `wiedza-<rok>-<wersja>.pdf`. Znany działający URL wzorcowy: `https://ksap.gov.pl/ksap/sites/default/files/files/pytania_ze_sprawdzianu_wiedzy_w_2025_r._-_wersja_a.pdf`.

- [ ] **Step 2:** Akty prawne do `data/wiedza/sources/akty/`:

```bash
# Rozporządzenie — tekst jednolity z Zał. 1 (taksonomia):
curl -sL -A "$UA" "https://api.sejm.gov.pl/eli/acts/DU/2025/811/text.pdf" -o data/wiedza/sources/akty/rozporzadzenie-2025-811.pdf
# Ustawa budżetowa na 2026 (Dz.U. 2026 poz. 62, 867 stron):
curl -sL -A "$UA" "https://api.sejm.gov.pl/eli/acts/DU/2026/62/text.pdf" -o data/wiedza/sources/akty/ustawa-budzetowa-2026.pdf
```

Jeśli ELI API nie odda pliku (sprawdź rozmiar > 50 kB), fallback: `https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20250000811/O/D20250811.pdf` oraz `https://www.dziennikustaw.gov.pl/D2026000006201.pdf`.

- [ ] **Step 3:** Akty źródłowe dla pozostałych dziedzin — pobierz przez ELI API **teksty ujednolicone** (endpoint `https://api.sejm.gov.pl/eli/acts/DU/<rok>/<poz>/text.pdf`; gdy istnieje nowszy tekst jednolity, znajdź go wyszukiwarką ISAP i użyj jego adresu):
  - Konstytucja RP (DU/1997/483)
  - Ustawa o służbie cywilnej (t.j. — wyszukaj aktualny na ISAP)
  - KPA (t.j.), ustawa o finansach publicznych (t.j.)
  - Ustawa o Radzie Ministrów, o wojewodzie i administracji rządowej w województwie, o samorządzie gminnym/powiatowym/województwa (t.j.)
  - Ustawa o dostępie do informacji publicznej, o ochronie danych osobowych (t.j.)

  Dla każdego zweryfikuj, że PDF jest tekstowy (pypdf wyciąga > 1000 znaków ze strony 2).

- [ ] **Step 4:** Crawl Leksykonu budżetowego — napisz `tools/wiedza/crawl-leksykon.py`:
  - Indeks: litery `A B C D E F G H I J K L M N O P R S Ś T U W Z` przez `https://www.sejm.gov.pl/sejm10.nsf/BASLeksykon.xsp?litera=<X>` (Ś url-encoded). Hasła = linki `BASLeksykon.xsp?id=<HEX>` z niepustą etykietą, dedupe po ID. Oczekiwane: **~189 haseł** (stan z 2026-06-10; tolerancja ±10).
  - Każde hasło pobierz do `data/wiedza/sources/leksykon/<id>.html`; między requestami `time.sleep(1)` (grzeczny crawl).
  - Z każdego hasła wyciągnij do JSON: tytuł, kategorię, sekcje „Definicja formalnoprawna", „Źródło", „Komentarz", linki „Co jeszcze zobaczyć?" oraz URL obrazka „Dane liczbowe" (link `orka2.sejm.gov.pl/...$File/*.jpg` — **zamień http→https**). Obrazki pobierz do `sources/leksykon/img/`.
  - Wynik zbiorczy: `data/wiedza/extracted/leksykon.json` (lista haseł z pełnym tekstem).

- [ ] **Step 5:** Zapisz wszystkie komendy pobrań do `tools/wiedza/fetch-sources.sh` (idempotentny — pomija istniejące pliki), żeby dało się odtworzyć.

### Task 3: Ekstrakcja i parsowanie realnych egzaminów

**Files:**
- Create: `tools/wiedza/extract-pdfs.py`, `tools/wiedza/parse-exams.py`, `data/wiedza/extracted/exam-<rok>-<wersja>.json`

- [ ] **Step 1:** `extract-pdfs.py`: każdy PDF z `sources/ksap/` → `extracted/wiedza-<rok>-<wersja>.txt` (pypdf, strona po stronie).

- [ ] **Step 2:** `parse-exams.py`: tekst → JSON. Pytania zaczynają się od `^\s*\d{1,2}\.\s`, opcje od `^\s*[a-d]\)`, poprawna ma `*` (gwiazdka bywa po przecinku/kropce lub na końcu linii — obsłuż oba przypadki). **Nie zakładaj 90 pytań w latach < 2025** — parsuj ile jest. Wynik per plik: `[{num, question, options[4], correct}]`.

- [ ] **Step 3:** Walidacja parsowania (krytyczne — tu rodzą się ciche błędy): dla każdego pliku sprawdź (a) liczba pytań zgodna z maksymalnym numerem, (b) każde pytanie ma dokładnie 4 opcje i dokładnie 1 poprawną, (c) żadna treść nie jest pusta. Wypisz raport rozbieżności i **napraw parser albo ręcznie popraw konkretne pytania** zanim pójdziesz dalej. Przy egzaminie 2025A oczekiwane dokładnie 90 pytań.

- [ ] **Step 4:** Deduplikacja: porównaj wersje A i B w obrębie roku (prawdopodobnie te same pytania przetasowane — sprawdź!) oraz pytania między latami (normalizacja: lowercase, bez białych znaków; plus fuzzy — pierwsze 80 znaków treści). Wynik: `data/wiedza/extracted/exams-unique.json` z polem `years: ["2025A","2025B",...]` per pytanie. Zapisz w raporcie ile unikatów zostało z każdego roku.

### Task 4: Taksonomia typów z Zał. 1

**Files:**
- Create: `data/wiedza/analysis/taxonomy.json`

- [ ] **Step 1:** Wyciągnij tekst Zał. 1 z `rozporzadzenie-2025-811.pdf` (pypdf; załącznik jest na końcu dokumentu — znajdź nagłówek „Załącznik nr 1").

- [ ] **Step 2:** Zbuduj taksonomię: 6 domen → **20–35 typów** (topicId). Typ = spójna grupa zagadnień z Zał. 1, na tyle szeroka, żeby pomieścić ≥15 pytań, na tyle wąska, żeby dało się celowo dogenerowywać (np. `pr.zrodla-prawa`, `pr.konstytucja-ustroj`, `pr.kpa`, `pr.sluzba-cywilna`, `pr.prawo-ue`, `ap.struktura-administracji`, `ap.samorzad`, `fp.budzet-panstwa`, `fp.dlug-publiczny`, `fp.podatki`, `pz.ue-instytucje`, `pz.onz-nato`, `oz.zarzadzanie-podstawy`, `se.makroekonomia`, `se.demografia-spoleczenstwo`...). Pokryj **całość** Zał. 1 — każde zagadnienie z załącznika musi mieć swój typ.

- [ ] **Step 3:** Format wpisu: `{topicId, domain, name, opis, zagadnieniaZal1: [dosłowne punkty z załącznika], zrodla: [akty/leksykon/GUS...]}`. Zapisz `taxonomy.json`.

### Task 5: Mapowanie realnych pytań i wagi empiryczne

**Files:**
- Create: `data/wiedza/analysis/exam-mapping.json`, `data/wiedza/analysis/weights.json`, `data/wiedza/analysis/allocation.json`

- [ ] **Step 1:** Przypisz każdemu unikalnemu pytaniu z `exams-unique.json` jeden `topicId` (subagenty, batche po ~30 pytań; w prompcie pełna taksonomia). Wynik: `exam-mapping.json`.

- [ ] **Step 2:** Policz wagi per typ: `waga_t = (3 × liczba pytań 2025 + 1 × liczba pytań 2024 + 1 × liczba pytań 2023) / suma`. Rok 2025 ważony ×3 (nowa formuła — decyzja użytkownika: szczególne uwzględnienie 2025).

- [ ] **Step 3:** Alokacja 700 slotów: `target_t = max(10, round(700 × waga_t))`, potem przeskaluj proporcjonalnie żeby suma = 700 (floor 10 gwarantuje pokrycie typów rzadkich/niepytanych). Rozkład trudności per typ: **25% easy, 50% medium, 25% hard** (medium dominuje — styl 2025). Zapisz `allocation.json`: `{topicId: {total, easy, medium, hard, realCount: 0}}`.

### Task 6: Weryfikacja i przyjęcie pytań realnych

**Files:**
- Create: `data/wiedza/output/real/pool-real.json`

- [ ] **Step 1:** Subagenty weryfikacyjne, batche po ~20 pytań. Dla każdego pytania: (a) czy poprawna odpowiedź jest poprawna wg **aktualnego** stanu prawnego (sprawdź w pobranych aktach!), (b) czy pytanie nie dotyczy zdezaktualizowanych „bieżących wydarzeń" (np. skład konkretnej KE, urzędujące osoby — takie pytania **odrzuć albo przepisz na aktualne**), (c) czy dystraktory są jednoznacznie błędne. Pytania z 2023–2024 traktuj podejrzliwie (dyrektywa użytkownika); pytania 2025 też weryfikuj, ale spodziewaj się małej liczby poprawek.

- [ ] **Step 2:** Każde przyjęte pytanie przepisz do finalnego schematu (sekcja „Schemat pytania"): dodaj `topicId` (z exam-mapping), `level` (oceń wg rubryki easy/medium/hard), `instruction`, prefiksy `"A) "` w `options`, `explanation` (napisz — PDF-y KSAP nie mają wyjaśnień), `source`, `origin: "ksap-<rok>"`, `legalState`. Zapisz `pool-real.json`.

- [ ] **Step 3:** Zaktualizuj `allocation.json` polem `realCount` per typ. Raport: ile realnych przyjęto / poprawiono / odrzucono, per rok.

### Task 7: Przewodnik stylu generacji

**Files:**
- Create: `data/wiedza/analysis/style-guide.md`

- [ ] **Step 1:** Przeanalizuj 90 pytań z 2025A i spisz przewodnik stylu (będzie wklejany do promptów generujących): długość pytania i opcji, konstrukcja dystraktorów (równoległa gramatyka, podobna długość, wiarygodne błędy — np. zamiana organu, odwrócenie zasady, zła relacja kwot), typowe formuły („Zgodnie z Konstytucją RP...", „Które z poniższych...", negacje „nie należy"), proporcja pytań sytuacyjnych vs definicyjnych. **Kluczowa zasada formuły 2025: pytanie testuje rozumienie zasady/mechanizmu, nie cytat z przepisu.** Dodaj 5 dosłownych pytań z 2025 jako wzorce i 3 anty-wzorce (czego nie robić: pamięciówka z numerów artykułów, kwoty co do złotówki, wiedza-ciekawostka spoza Zał. 1).

### Task 8: Generacja pytań batchami

**Files:**
- Create: `data/wiedza/output/generated/batch-<topicId>-<nn>.json` (wiele plików)

- [ ] **Step 1:** Dla każdego typu policz brakujące: `gen_t = target_t − realCount_t` (jeśli ujemne → 0, nadmiar realnych zostaje). Suma `gen_t` ≈ 450–500.

- [ ] **Step 2:** Generuj subagentami, **batch = 15–20 pytań jednego typu**. Prompt każdego batcha zawiera: (a) style-guide.md w całości, (b) wpis typu z taxonomy.json (zagadnienia z Zał. 1), (c) **fragmenty źródeł** dla typu (odpowiednie hasła z leksykon.json dla `fp`/`se`; odpowiednie artykuły aktów dla `pr`/`ap`; dane z ustawy budżetowej 2026 dla pytań liczbowych), (d) wymagany rozkład trudności batcha, (e) schemat JSON, (f) listę treści pytań już istniejących w tym typie (real + wcześniejsze batche) z zakazem duplikowania. Wymóg: każde pytanie ma `source` wskazujące konkretny przepis/hasło, `explanation` 2–4 zdania.

- [ ] **Step 3:** Po każdym batchu: walidacja schematu (Task 9 Step 1 — uruchamiaj walidator na bieżąco) i zapis pliku batcha na dysk **zanim** ruszy następny (resumowalność). Loguj postęp: `typ X: n/target`.

- [ ] **Step 4:** Pytania liczbowe (limit ~5% puli): wyłącznie rzędy wielkości i relacje (np. „wydatki budżetu na 2026 to ok. 919 mld zł", „największe źródło dochodów = VAT"), źródło = ustawa budżetowa 2026 / dane GUS/NBP z datą.

### Task 9: Weryfikacja adwersaryjna wygenerowanych

**Files:**
- Modify: pliki `batch-*.json` (flagi weryfikacji), Create: `data/wiedza/analysis/verify-report.md`

- [ ] **Step 1:** Walidator `tools/wiedza/validate.js` (Node, bez zależności): sprawdza schemat każdego pytania (pola, typy, 4 opcje, correct 0–3, niepuste explanation/source, topicId istnieje w taxonomy.json, unikalność id), duplikaty treści w całej puli (normalizacja + porównanie), i drukuje statystyki per typ/trudność/origin. Exit code ≠ 0 przy błędach.

- [ ] **Step 2:** Subagenty weryfikujące (inne niż generujące), batch po ~20 pytań, prompt: „Spróbuj OBALIĆ każde pytanie: (1) czy poprawna odpowiedź jest na pewno poprawna wg podanego źródła — sprawdź w załączonym fragmencie aktu/leksykonu; (2) czy któryś dystraktor nie jest też poprawny lub obronialny; (3) czy pytanie jest jednoznaczne bez kontekstu; (4) czy stan prawny aktualny". Werdykt per pytanie: `ok | popraw: <jak> | odrzuć: <czemu>`.

- [ ] **Step 3:** Zastosuj werdykty: poprawki nanieś, odrzucone usuń i **dogeneruj uzupełnienie** (wróć do Task 8 Step 2 dla brakujących slotów — max 2 rundy, potem zaakceptuj niedobór i odnotuj w raporcie). Zapisz `verify-report.md` (ile ok/poprawionych/odrzuconych).

### Task 10: Scalenie, walidacja końcowa, raport

**Files:**
- Create: `data/wiedza/output/questions-wiedza.json`, `data/wiedza/output/stats.md`

- [ ] **Step 1:** Scal `pool-real.json` + wszystkie `batch-*.json` → `questions-wiedza.json`. Nadaj finalne `id` sekwencyjnie per domena. Przetasuj pozycję poprawnej odpowiedzi tam, gdzie generator nadużywał jednej pozycji (rozkład correct po ~25% na indeks, tolerancja ±5 pp).

- [ ] **Step 2:** `node tools/wiedza/validate.js data/wiedza/output/questions-wiedza.json` — oczekiwane: 0 błędów, suma ~700 (±20).

- [ ] **Step 3:** `stats.md`: liczba pytań per domena/typ/trudność/origin, pokrycie Zał. 1 (typy bez pytań = czerwona flaga), lista znanych ograniczeń (np. typy z niedoborem, pytania wymagające odświeżenia przed egzaminem 2027 — „bieżące wydarzenia").

- [ ] **Step 4:** **NIE commituj.** Zgłoś użytkownikowi: ścieżki plików, statystyki, co wymaga jego decyzji.

---

## Self-review (wykonane przy pisaniu planu)

- Wymagania użytkownika pokryte: ~700 pytań (Task 5/8), tylko 2023–2025 z naciskiem na 2025 (Task 3/5/6 — wagi ×3), weryfikacja stanu prawnego starszych (Task 6), grupowanie w typy wg Rozporządzenia (Task 4), poziomy trudności do shufflowania (schemat + Task 5 Step 3), formuła 2025 = rozumienie mechanizmów (Task 7), przewodnik KSAP zignorowany (nigdzie nie używany), liczby z ustawy budżetowej 2026 (Task 8 Step 4), **kompatybilność formatu z `web/questions-unified.js` jako cel drugorzędny** (sekcja „Schemat pytania"), bez integracji z aplikacją (poza zakresem), bez commitów (nagłówek + Task 10 Step 4).
- Znane ryzyka: (a) parsowanie PDF — Task 3 Step 3 ma twardą bramkę jakości; (b) wolumen generacji — batche po 15–20 z zapisem na dysk = resumowalność; (c) URL-e mogą się zmienić — Task 2 zawsze scrape'uje listę zamiast zgadywać.
