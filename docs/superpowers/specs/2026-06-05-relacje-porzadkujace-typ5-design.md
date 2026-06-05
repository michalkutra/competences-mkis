# Spec: Relacje porządkujące — rozszerzenie Typ 5 (wnioskowanie logiczne)

**Data:** 2026-06-05
**Status:** zatwierdzony (brainstorming), do rozpisania planu implementacji
**Źródło:** 2 niezależne zgłoszenia testerów (w tym osoba 3× na egzaminie KSAP) + screenshot „Zestaw 3"

---

## Kontekst i odkrycie

Testerzy zgłaszają brak „analogii liczbowych". Załączony screenshot pokazuje jednak **co innego niż zakładał backlog**: nie analogie/ciągi liczbowe (`2:6=5:?`), lecz **wnioskowanie z relacji porządkujących**:

> *„Wskaż wniosek, który wynika z przesłanek: A > B < C"* → opcje typu `A ≠ C`, `B ≤ A`, `C ≤ B`.

To zadania dedukcyjne na relacjach `> < ≤ ≥ = ≠`. Litery zachowują się jak liczby (stąd potoczna nazwa „analogie liczbowe"), ale mechanicznie to **nie** analogia i **nie** ciąg liczbowy.

**Dopasowanie do istniejących typów:**
- Kompetencja **identyczna z Typ 5** (dedukcja: „wybierz pewny wniosek z przesłanek").
- Format **identyczny z Typ 5** (tekst + 5 opcji, bez obrazka) → rendering reużywalny.
- Mechanika **inna** niż dotychczasowy Typ 5 (spec Typ 5 zna tylko: łańcuch zbiorów A⊆B, modus ponens, „niektóre/wszystkie" — relacje porządkujące nie są pokryte).
- **Nie** Typ 6 (numeryczne) — tam są obliczenia i tabela; tu nie ma żadnych obliczeń.

**Decyzja:** rozszerzamy **Typ 5**, nie tworzymy nowego typu.

---

## Decyzje projektowe

### 1. Model danych
- Relacje porządkujące = `typeId: 5`, kompetencja „WNIOSKOWANIE LOGICZNE".
- Nowe pole `variant` na pytaniach Typ 5: `"sylogizm"` | `"relacje"`.
- Migracja jednorazowa: 200 istniejących pytań Typ 5 dostaje `variant: "sylogizm"`.
- Schemat pytania relacyjnego (jak istniejące tekstowe Typ 5):
  `{ id, typeId: 5, variant: "relacje", level, instruction, premises, options, correct, explanation }`.
- **Rendering bez zmian** — reużywa ścieżki tekstowej Typ 5 w `index.html`.

### 2. Blueprint sesji — zmiana filozofii: „mirror egzaminu 1:1" → „pokrycie + zmienność"
Dotychczasowy `SESSION_BLUEPRINT = {1:2,2:2,3:2,4:1,5:4,6:2,7:1,8:1}` (płaski słownik, 15 pytań, odwzorowywał rozkład referencyjnego egzaminu) zostaje zastąpiony modelem **FIXED + RANDOM**:

```
FIXED (12 — gwarantowane):
  Typ 5 / sylogizm   × 3
  Typ 5 / relacje    × 2     ← nowa grupa, gwarantowana obecność
  Typ 1,2,3,4,6,7,8  × 1 każdy   (= 7)

RANDOM (3):
  losowane ze wszystkich typów; ograniczenia:
   • nie dublują 12 stałych picków tej sesji
   • respektują anti-repeat (nie powtarzaj świeżo widzianych)
   • mogą dorzucić kolejną „relacje" — traktowane jak każdy inny typ

RAZEM = 15  (długość egzaminu zachowana)
```

Konsekwencje świadome:
- Typy 1/2/3/6 spadają w części stałej z 2→1 (mogą wrócić przez sloty losowe).
- Selekcja staje się dwuwarstwowa (stała lista wariantowo-świadoma + warstwa losowa z dedup + anti-repeat).

### 3. Rozmiar banku relacyjnego — **~140 pytań (70 easy + 70 hard)**
Kluczowe: sesja losuje z **jednego** banku trudności (`getQuestionBank` zwraca EASY albo HARD), a każdy typ jest dzielony easy/hard (Typ 5 = 100 easy + 100 hard). Analizę „sesji bez powtórek" liczymy więc **per trudność** (sloty losowe ścinają ~10–15%):

| Typ | Bank / trudność | Zużycie/sesję | Sesje bez powtórek |
|---|---|---|---|
| 1,2,3,6 | 50 | 1 | ~50 |
| 4,7,8 | 40 | 1 | ~40 |
| 5 sylogizm | 100 | 3 | ~33 |
| 5 relacje | M | 2 | M/2 |

- Wąskie gardło bez nowej grupy (per trudność): Typ 5 sylogizm (~33) i pule 40 (~40) → realnie **~28–33 sesji bez powtórek na trudność** (kto miksuje easy+hard — dwukrotnie więcej). Kontekst: 29 dni do egzaminu — wystarcza.
- **Gdyby relacji było 40/trudność** → przy 2/sesję stają się nowym wąskim gardłem przy **~20 sesjach**.
- Dlatego **70/trudność** (70/2 = 35, tuż powyżej sylogizmu ~33) → **~140 pytań łącznie**. Deterministycznym generatorem to praktycznie darmowe.

### 4. Generowanie banku — generator deterministyczny (model-checking)
Poprawność jest **obliczalna**: wniosek „wynika" ⟺ prawdziwy w **każdym** uporządkowaniu zmiennych spełniającym przesłanki. Przy 2–3 zmiennych przestrzeń modeli jest mała → brute-force. Wzorowane na pipeline Typ 8.

Odrzucone alternatywy: LLM-authored (ryzyko błędnych kluczy, wymaga i tak walidatora), hybryda (zbędna złożoność dla tak prostej logiki).

---

## Komponenty (zakres pracy)

1. **`tools/generate-type5-relacje.js`** — generator:
   - enumeruje łańcuchy `X op1 Y op2 Z` (3 zmienne, 2 przesłanki); **łączniki tylko kierunkowe `> < ≥ ≤`** (bez `≠`/`=` jako spójnika — `A < C ≠ B` czyta się źle i nie występuje na egzaminie; `≠` zostaje dostępne w opcjach/dystraktorach oraz jako trudniejszy wniosek, ~20% pytań hard, np. `A > B > C ⊢ A ≠ C` bez `A > C` w opcjach),
   - **format przesłanek mieszany ~50/50** (jak egzamin, który podaje tę samą treść oboma sposobami): jedna trójka `["A > B > C"]` albo dwie pary `["A > B", "B > C"]`; logicznie identyczne, dedup po treści logicznej (niezależny od formatu),
   - brute-force po uporządkowaniach → wyłania pewne wnioski; dzieli je na **jednoprzesłankowe** (wynikają z jednej przesłanki — flip/osłabienie) i **dwuprzesłankowe** (wymagają obu — tranzytywność),
   - buduje 5 opcji: 1 poprawna (najmocniejsza dostępna — ścisła przed osłabioną) + 4 udowodnione dystraktory (niewynikające, z policzonym kontrprzykładem),
   - wyjaśnienie z szablonu („Z przesłanek wynika tylko…, bo… Pozostałe nie są pewne, bo… np. kontrprzykład"),
   - **podział trudności wg głębokości rozumowania, NIE operatorów:**
     - `easy` = poprawny wniosek **jednoprzesłankowy** (banalny flip/osłabienie, np. `A ≥ C < B ⊢ B > C`),
     - `hard` = poprawny wniosek **dwuprzesłankowy** (tranzytywny, np. `A ≤ C ≤ B ⊢ A ≤ B`),
   - cel: **70 easy + 70 hard = ~140** pytań, `typeId:5, variant:"relacje"`. Pule dostępne: 576 jednoprzesłankowych, 240 dwuprzesłankowych — z zapasem.

2. **`tools/validate-type5-relacje.js`** — niezależny walidator (drugi model-checker): dokładnie jedna opcja entailed, dystraktory faktycznie nie-entailed, poprawny indeks `correct`, brak duplikatów.

3. **Migracja `web/questions-unified.js`** — dopisać `variant:"sylogizm"` do 200 istniejących Typ 5; wstrzyknąć nowy bank pod `type5` w `QUESTIONS_EASY` / `QUESTIONS_HARD`.

4. **`web/index.html`** — przebudowa `SESSION_BLUEPRINT` na model FIXED+RANDOM z świadomością wariantu; warstwa losowa z dedup + anti-repeat. Rendering bez zmian.

5. **Statystyki** — Typ 5 raportowany dalej jako jeden typ; `variant` dostępny pod przyszły adaptacyjny dobór wg słabości (BACKLOG).

---

## Testowanie
- **Generator/validator:** testy jednostkowe model-checkera; fixture'y ze screenshotu (`A>B<C`, `A≤B≥C`, `B≥C, C>A`, `C<A, A≥B`) → znany wniosek.
- **Selekcja:** sesja = 15; zawiera 3 sylogizmy + 2 relacje + po 1 z reszty; random nie dubluje i respektuje anti-repeat; graceful degradation po wyczerpaniu puli.
- **Bank:** przejście całości przez `validate-questions.js` (spójność schematu).

---

## Poza zakresem (YAGNI)
- Analogie/ciągi liczbowe (`2:6=5:?`) — to była błędna hipoteza backlogu, nie jest tym czego dotyczy zgłoszenie.
- Adaptacyjny dobór wg słabości per-variant — osobny task w BACKLOG; tu tylko przygotowujemy pole `variant`.
- Zmiana renderingu / nowy typ pytania — niepotrzebne, reużywamy Typ 5.
