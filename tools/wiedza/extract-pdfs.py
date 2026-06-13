#!/usr/bin/env python3
"""Ekstrakcja tekstu z PDF-ów egzaminów KSAP (sprawdzian wiedzy).

Wejście:  data/wiedza/sources/ksap/wiedza-<rok>-<wersja>.pdf
Wyjście:  data/wiedza/extracted/wiedza-<rok>-<wersja>.txt (strona po stronie,
          separator `=== PAGE n ===` dla łatwej inspekcji).
"""
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "data" / "wiedza" / "sources" / "ksap"
OUT = ROOT / "data" / "wiedza" / "extracted"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(SRC.glob("wiedza-*.pdf"))
    if not pdfs:
        raise SystemExit(f"Brak PDF-ów w {SRC}")
    for pdf_path in pdfs:
        reader = PdfReader(pdf_path)
        parts = []
        for i, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            parts.append(f"=== PAGE {i} ===\n{text}")
        out_path = OUT / (pdf_path.stem + ".txt")
        out_path.write_text("\n".join(parts), encoding="utf-8")
        print(f"{pdf_path.name}: {len(reader.pages)} stron -> {out_path.name}")


if __name__ == "__main__":
    main()
