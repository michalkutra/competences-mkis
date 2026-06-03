# Design: usunięcie poczucia powtórek pytań

**Data:** 2026-06-03
**Źródło:** feedback Eweliny — „pytania powtarzają mi się". Intuicja usera: ~5% szans na powtórkę. Analiza pokazała, że realnie po kilku sesjach jest dużo gorzej (patrz niżej).

## Problem

`buildSession()` losuje 15 pytań na sesję wg blueprintu egzaminu KSAP
(`{1:2, 2:2, 3:2, 4:1, 5:4, 6:2, 7:1, 8:1}`), za każdym razem z pełnej puli typu,
bez pamięci o tym, co użytkownik już widział.

- Bank: 640 pytań = 320 EASY + 320 HARD, po **40 pytań na typ na poziom**.
- Sesja losuje z puli jednego poziomu (EASY albo HARD).
- **Brak logiki anty-powtórek** — `buildSession()` nie konsultuje historii.

Wąskim gardłem jest **typ 5 (Wnioskowanie logiczne)** — 4 pytania/sesję z puli 40,
czyli 10% puli na sesję. Realny odsetek powtórzonych pytań w sesji rośnie szybko:
~25% po 5 sesjach, ~43% po 10, ~66% po 20. Stąd poczucie powtarzalności.

Samo dodawanie pytań ma malejące zwroty (nawet 10× większy bank ≈ 11% powtórek po
20 sesjach przy intensywnym użyciu). Dlatego łączymy dwa ruchy: tańszy strukturalny
fix (pamięć) + ukierunkowane powiększenie banku.

## Cel

Usunąć poczucie powtarzalności tak, by typowy użytkownik mógł wykonać **~25 sesji
bez ani jednej powtórki**.

## Rozwiązanie — trzy części

### Część A — Algorytm anty-powtórek (least-recently-seen)

Modyfikacja `buildSession()` w [web/index.html](../../../web/index.html#L1418).

Zamiast `shuffle(pool); pool.slice(0, need)` dla każdego typu:

1. Z `ksap_answer_log` (zawiera `qId` + `ts`) zbuduj mapę `qId → najnowszy ts`
   (jeden przebieg na całe `buildSession`).
2. Dla puli danego typu posortuj wg least-recently-seen:
   - **niewidziane najpierw** (kolejność losowa między sobą),
   - potem **widziane najdawniej** (rosnąco wg `ts`; tie-break losowy dla pytań
     z tej samej sesji / tego samego `ts`).
3. Weź pierwsze `need` pytań.
4. Finalny `shuffle(session)` (kolejność prezentacji) — bez zmian.

**Własności:**
- Działa naturalnie **per poziom** — `getQuestionBank()` zwraca pulę wybranego
  poziomu (EASY/HARD), a `qId` są globalnie unikalne, więc obecność pytania w puli
  poziomu wystarcza jako filtr.
- Brak magicznego parametru N.
- **Płynna degradacja:** gdy wszystkie pytania typu były widziane, recykluje
  najdawniej widziane (round-robin) — zero twardych powtórek dopóki to możliwe.

**Granice:** answer log może rosnąć; mapę budujemy raz na `buildSession` (akceptowalne).
Brak zmian w strukturze danych localStorage — wykorzystujemy istniejące pola.

### Część B — Powiększenie banku (cel ~25 sesji bez powtórki)

Liczba sesji bez powtórki dla typu = `pula_typu / losowane_na_sesję`. Cele per typ,
**osobno dla EASY i HARD**:

| Typ | Nazwa | Teraz/poziom | Cel/poziom | +/poziom | +total (×2) |
|---|---|---|---|---|---|
| 5 | Wnioskowanie logiczne | 40 | 100 | +60 | +120 |
| 1 | Analogia słowna | 40 | 50 | +10 | +20 |
| 2 | Wspólny wyraz | 40 | 50 | +10 | +20 |
| 3 | Związek przyczynowo-skutkowy | 40 | 50 | +10 | +20 |
| 6 | Zadanie numeryczne | 40 | 50 | +10 | +20 |
| 4 | Analogia zdaniowa | 40 | 40 | 0 | 0 |
| 7 | Analiza wykresu | 40 | 40 | 0 | 0 |
| 8 | Powiązania figur | 40 | 40 | 0 | 0 |

**Razem ~200 nowych pytań.** Typy 4/7/8 (1×/sesję) mają już zapas na 40 sesji.

**Metoda generacji — dobierana per typ na etapie planu**, na podstawie struktury
typu w `web/questions-unified.js`:
- Typ 8 ma już generator algorytmiczny (`tools/generate-type8.js`).
- Typ 5 (sylogizmy) — kandydat na generator algorytmiczny (sztywne formy logiczne →
  gwarancja poprawności).
- Typy językowe (1/2/3) i numeryczny (6) — prawdopodobnie LLM + walidacja.

Każdy typ przechodzi istniejący wzorzec **generate → validate → integrate**
(jak `tools/*-type8.js`): walidacja formatu, duplikatów i poprawności przed
wstrzyknięciem do `questions-unified.js`.

### Część C — Strona „O aplikacji"

W sekcji „Jak to działa" ([web/index.html](../../../web/index.html#L1101)) dodać krótki
akapit: pytania są teraz **zapamiętywane**, więc kolejne sesje dobierają te jeszcze
nie widziane; przy obecnej puli można zrobić **ok. 25 sesji**, zanim pytania zaczną
się powtarzać. Zaktualizować podawaną liczbę pytań w puli, jeśli występuje.

## Dekompozycja i kolejność

Jeden spec, trzy części. Plan implementacji rozbije na fazy:

1. **Faza 1 — A + C.** Mały, samodzielny kod. Daje natychmiastową wartość: nawet na
   obecnym banku LRS gwarantuje ~10 sesji bez powtórki (limit typu 5). Copy na
   stronie „O aplikacji" idzie razem.
2. **Faza 2 — B, przyrostowo per typ.** Każdy typ niezależny; priorytet: typ 5
   (największa luka), potem 1/2/3/6.

## Weryfikacja

Brak istniejącego setupu testowego (aplikacja to pojedynczy `web/index.html`).
Proponowana weryfikacja:
- **Skrypt symulacyjny** w `tools/`: odtwarza logikę LRS, symuluje 25 kolejnych
  `buildSession()` (per poziom) i raportuje liczbę powtórek per typ. Twardy dowód,
  że cel „25 sesji bez powtórki" jest osiągnięty po dowiezieniu banku.
- Walidatory per typ (jak `tools/validate-type8.js`) dla nowych pytań.
- Ręczna weryfikacja UI strony „O aplikacji".

## Poza zakresem (osobny wpis w BACKLOG.md)

Dobór pytań wg słabości („częściej losuj te, na które odpowiedziałem błędnie") —
rozszerzenie tego samego silnika doboru, korzysta z pola `ok` w `ksap_answer_log`.
Wymaga osobnego brainstormingu (napięcie świeżość vs. powtarzanie trudnych).
