#!/usr/bin/env python3
"""Parsowanie wyekstrahowanych egzaminów KSAP (txt -> JSON) + walidacja + dedup.

Wejście:  data/wiedza/extracted/wiedza-<rok>-<wersja>.txt
Wyjście:  data/wiedza/extracted/exam-<rok>-<wersja>.json
          [{num, question, options[4], correct}]  (correct = indeks 0-3)
          data/wiedza/extracted/exams-unique.json (dedup A/B i między latami,
          pole years: ["2025A", ...] per pytanie)

Struktura tekstu (po pypdf):
- nagłówek na każdej stronie: POSTĘPOWANIE KWALIFIKACYJNE / W SŁUŻBIE
  CYWILNEJ <rok> R. / Wersja X / Strona N z M  -> usuwany
- pytanie: ^\\s*\\d{1,2}\\.\\s  (numeracja ściśle rosnąca -> filtr fałszywych
  dopasowań w zawiniętym tekście)
- opcja:   ^\\s*[a-d]\\)        (litery w kolejności a..d w obrębie pytania)
- poprawna opcja: '*' na końcu linii (po przecinku/kropce, czasem po spacji);
  przy opcjach wielolinijkowych gwiazdka jest na ostatniej linii opcji.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EXTRACTED = ROOT / "data" / "wiedza" / "extracted"

HEADER_RES = [
    re.compile(r"^=== PAGE \d+ ===$"),
    re.compile(r"^\s*POSTĘPOWANIE KWALIFIKACYJNE\s*$"),
    re.compile(r"^\s*W\s+SŁUŻBIE CYWILNEJ\s+\d{4}\s*R\.\s*$"),
    re.compile(r"^\s*Wersja\s+[A-Z]\s*$"),
    re.compile(r"^\s*Strona\s+\d+\s+z\s+\d+\s*$"),
]
QUESTION_RE = re.compile(r"^\s*(\d{1,2})\.\s+(.*)$")
OPTION_RE = re.compile(r"^\s*([a-d])\)\s*(.*)$")
STAR_RE = re.compile(r"\s*\*\s*$")

# Ręczne poprawki dla pytań zepsutych przez pypdf: {(plik, num): {...}}.
# Obecnie puste — parser radzi sobie ze wszystkimi 6 plikami bez poprawek.
FIXES: dict[tuple[str, int], dict] = {}


def clean(text: str) -> str:
    """Scal fragmenty, znormalizuj białe znaki i unicode (NFC)."""
    text = unicodedata.normalize("NFC", text)
    return re.sub(r"\s+", " ", text).strip()


def parse_file(path: Path) -> list[dict]:
    questions: list[dict] = []
    cur_q: dict | None = None  # {num, q_parts, options: [{parts, correct}]}

    def flush() -> None:
        nonlocal cur_q
        if cur_q is None:
            return
        opts = [clean(" ".join(o["parts"])) for o in cur_q["options"]]
        correct = [i for i, o in enumerate(cur_q["options"]) if o["correct"]]
        questions.append({
            "num": cur_q["num"],
            "question": clean(" ".join(cur_q["q_parts"])),
            "options": opts,
            "correct": correct[0] if len(correct) == 1 else correct,
        })
        cur_q = None

    for raw in path.read_text(encoding="utf-8").splitlines():
        if not raw.strip() or any(h.match(raw) for h in HEADER_RES):
            continue

        line = raw
        starred = bool(STAR_RE.search(line))
        if starred:
            line = STAR_RE.sub("", line)

        expected_num = (cur_q["num"] + 1) if cur_q else 1
        m = QUESTION_RE.match(line)
        if m and int(m.group(1)) == expected_num:
            flush()
            cur_q = {"num": expected_num, "q_parts": [m.group(2)], "options": []}
            if starred:
                raise ValueError(f"{path.name}: gwiazdka w treści pytania {expected_num}")
            continue

        m = OPTION_RE.match(line)
        if cur_q is not None and m:
            expected_letter = "abcd"[len(cur_q["options"])] if len(cur_q["options"]) < 4 else None
            if m.group(1) == expected_letter:
                cur_q["options"].append({"parts": [m.group(2)], "correct": starred})
                continue

        # Kontynuacja bieżącej opcji lub treści pytania.
        if cur_q is None:
            raise ValueError(f"{path.name}: tekst przed pytaniem 1: {line!r}")
        if cur_q["options"]:
            cur_q["options"][-1]["parts"].append(line.strip())
            if starred:
                cur_q["options"][-1]["correct"] = True
        else:
            cur_q["q_parts"].append(line.strip())
            if starred:
                raise ValueError(f"{path.name}: gwiazdka w treści pytania {cur_q['num']}")

    flush()
    return questions


def apply_fixes(label: str, questions: list[dict]) -> list[str]:
    applied = []
    for q in questions:
        fix = FIXES.get((label, q["num"]))
        if fix:
            q.update(fix)
            applied.append(f"pytanie {q['num']}: ręczna poprawka {sorted(fix)}")
    return applied


def validate(label: str, questions: list[dict]) -> list[str]:
    errors = []
    if not questions:
        return [f"{label}: brak pytań"]
    max_num = max(q["num"] for q in questions)
    if len(questions) != max_num:
        errors.append(f"{label}: liczba pytań {len(questions)} != max numer {max_num}")
    if [q["num"] for q in questions] != list(range(1, len(questions) + 1)):
        errors.append(f"{label}: numeracja nieciągła")
    for q in questions:
        where = f"{label} pytanie {q['num']}"
        if not q["question"]:
            errors.append(f"{where}: pusta treść")
        if len(q["options"]) != 4:
            errors.append(f"{where}: {len(q['options'])} opcji zamiast 4")
        if any(not o for o in q["options"]):
            errors.append(f"{where}: pusta opcja")
        if any("*" in o for o in q["options"]) or "*" in q["question"]:
            errors.append(f"{where}: gwiazdka pozostała w tekście")
        if not isinstance(q["correct"], int):
            errors.append(f"{where}: {len(q['correct'])} poprawnych opcji zamiast 1")
    return errors


def norm_key(text: str) -> str:
    """lowercase, bez białych znaków i znaków diakrytycznych łamanych przez pypdf."""
    text = unicodedata.normalize("NFD", text.lower())
    return "".join(c for c in text if not unicodedata.combining(c) and not c.isspace())


def dedup(exams: dict[str, list[dict]]) -> tuple[list[dict], dict]:
    unique: list[dict] = []
    by_exact: dict[str, dict] = {}
    by_fuzzy: dict[str, dict] = {}
    stats = {"per_label_unique": {}, "ab_overlap": {}, "cross_year_dups": 0,
             "fuzzy_merges": []}

    for label, questions in exams.items():
        year = label[:4]
        new_count = 0
        for q in questions:
            exact = norm_key(q["question"]) + "|" + "|".join(
                sorted(norm_key(o) for o in q["options"]))
            fuzzy = norm_key(q["question"])[:80]
            entry = by_exact.get(exact)
            kind = "exact"
            if entry is None:
                entry = by_fuzzy.get(fuzzy)
                kind = "fuzzy"
            if entry is None:
                entry = {"question": q["question"], "options": q["options"],
                         "correct": q["correct"], "years": [label],
                         "sources": [f"{label}:{q['num']}"]}
                unique.append(entry)
                by_exact[exact] = entry
                by_fuzzy[fuzzy] = entry
                new_count += 1
            else:
                if label not in entry["years"]:
                    entry["years"].append(label)
                entry["sources"].append(f"{label}:{q['num']}")
                if entry["years"][0][:4] == year:
                    key = year
                    stats["ab_overlap"][key] = stats["ab_overlap"].get(key, 0) + 1
                else:
                    stats["cross_year_dups"] += 1
                if kind == "fuzzy":
                    stats["fuzzy_merges"].append(
                        f"{label}:{q['num']} ~ {entry['sources'][0]}")
        stats["per_label_unique"][label] = new_count
    stats["total_unique"] = len(unique)
    return unique, stats


def main() -> None:
    txts = sorted(EXTRACTED.glob("wiedza-*.txt"))
    if not txts:
        raise SystemExit(f"Brak plików txt w {EXTRACTED} — uruchom extract-pdfs.py")

    exams: dict[str, list[dict]] = {}
    all_errors: list[str] = []
    for path in txts:
        m = re.match(r"wiedza-(\d{4})-([a-z])$", path.stem)
        year, version = m.group(1), m.group(2).upper()
        label = f"{year}{version}"
        questions = parse_file(path)
        for note in apply_fixes(label, questions):
            print(f"[FIX] {label}: {note}")
        errors = validate(label, questions)
        all_errors.extend(errors)
        out = EXTRACTED / f"exam-{year}-{version.lower()}.json"
        out.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n",
                       encoding="utf-8")
        status = "OK" if not errors else f"{len(errors)} BŁĘDÓW"
        print(f"{label}: {len(questions)} pytań -> {out.name} [{status}]")
        exams[label] = questions

    if "2025A" in exams and len(exams["2025A"]) != 90:
        all_errors.append(f"2025A: oczekiwano 90 pytań, jest {len(exams['2025A'])}")

    if all_errors:
        print("\n=== RAPORT ROZBIEŻNOŚCI ===", file=sys.stderr)
        for e in all_errors:
            print(f"  {e}", file=sys.stderr)
        raise SystemExit(1)

    uniq, stats = dedup(exams)
    out = EXTRACTED / "exams-unique.json"
    out.write_text(json.dumps(uniq, ensure_ascii=False, indent=2) + "\n",
                   encoding="utf-8")
    print(f"\n=== DEDUPLIKACJA -> {out.name} ===")
    print(f"Nowe unikaty per wersja: {stats['per_label_unique']}")
    print(f"Pokrycie A/B w obrębie roku: {stats['ab_overlap']}")
    print(f"Duplikaty między latami: {stats['cross_year_dups']}")
    if stats["fuzzy_merges"]:
        print(f"Scalenia fuzzy (zweryfikuj!): {stats['fuzzy_merges']}")
    print(f"Łącznie unikatów: {stats['total_unique']}")


if __name__ == "__main__":
    main()
