# Sprawa: pytania typu 8 (figury) — zgłoszenie `h_t8_037`

> **Data:** 2026-06-03 · **Status:** ✅ Naprawione

Folder agreguje wszystkie artefakty tematu.

## Zgłoszenie

Mail: pytanie `#h_t8_037` — „Taka zależność można wysnuć dopiero przy trzecim oknie." Dwa defekty: struktura (single→para/trójka) i trójkąt renderowany jako koło.

## Rozwiązanie

Macierze 2×2 o jednorodnych komórkach wielofigurowych, każda pozycja = niezależna podmacierz; hard z gradientem T1/T2/T3 i regułą obrotu w T3. Szczegóły w specu i planie.

## Artefakty

| Plik | Co to |
|---|---|
| [2026-06-03-h_t8_037.md](2026-06-03-h_t8_037.md) | Zgłoszenie + analiza + rozwiązanie |
| [2026-06-03-typ8-wariant2-design.md](2026-06-03-typ8-wariant2-design.md) | Spec |
| [2026-06-03-typ8-wariant2-plan.md](2026-06-03-typ8-wariant2-plan.md) | Plan implementacji |
| [podglad-bledu-h_t8_037.html](podglad-bledu-h_t8_037.html) | Podgląd błędu (buggy vs naprawiony renderer) |
| [podglad-wariant2.html](podglad-wariant2.html) | Podgląd rozwiązania z realnych danych |
| [wariant2-mockup.html](wariant2-mockup.html) | Mockup gradientu T1/T2/T3 |

Narzędzia: `tools/generate-type8.js`, `tools/validate-type8.js`, `tools/integrate-type8.js` (w roocie repo).
