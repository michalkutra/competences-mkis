#!/usr/bin/env python3
"""Crawl Leksykonu budżetowego Sejmu (BASLeksykon).

Idempotentny: pomija już pobrane pliki HTML/JPG; JSON buduje od nowa z plików
lokalnych przy każdym uruchomieniu. Grzeczny crawl: 1 s przerwy między
requestami do sejm.gov.pl.

sejm.gov.pl siedzi za ochroną F5/TSPD ("Human Verification"): pierwsze żądanie
zwraca stronę-challenge i ustawia cookies TSPD; ponowienie tego samego żądania
z cookies sesji przechodzi. Wykrywamy challenge i ponawiamy.

Uruchomienie: /tmp/pdfenv/bin/python tools/wiedza/crawl-leksykon.py
(wymaga: pip install requests)
"""
import html
import json
import os
import re
import sys
import time
from urllib.parse import quote

import requests

BASE = "https://www.sejm.gov.pl/sejm10.nsf/BASLeksykon.xsp"
LETTERS = list("ABCDEFGHIJKLMNOPRS") + ["Ś"] + list("TUWZ")
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
LEX_DIR = os.path.normpath(os.path.join(ROOT, "data/wiedza/sources/leksykon"))
IMG_DIR = os.path.join(LEX_DIR, "img")
OUT_JSON = os.path.normpath(os.path.join(ROOT, "data/wiedza/extracted/leksykon.json"))
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
SLEEP = 1.0


def make_session():
    s = requests.Session()
    s.headers.update({
        "User-Agent": UA,
        "Accept-Language": "pl-PL,pl;q=0.9",
        "Referer": "https://www.sejm.gov.pl/",
    })
    return s


def is_challenge(text):
    return "<title>Human Verification" in text or 'window["bobcmn"]' in text


class SessionBox:
    """Sesja requests z obsługą challenge TSPD.

    Ponawia to samo żądanie z cookies sesji (drugie żądanie zwykle przechodzi);
    gdy challenge nie ustępuje, wymienia sesję na świeżą (nowe cookies TSPD).
    """

    def __init__(self):
        self.session = make_session()

    def fetch(self, url, binary=False, retries=6):
        for attempt in range(retries):
            try:
                r = self.session.get(url, timeout=60)
            except requests.RequestException as e:
                print(f"    siec: {e}; ponawiam...")
                time.sleep(3 + 2 * attempt)
                continue
            if binary:
                ctype = r.headers.get("Content-Type", "")
                if r.ok and "text/html" not in ctype:
                    return r.content
                if r.ok and not is_challenge(r.text):
                    return r.content
            else:
                if r.ok and not is_challenge(r.text):
                    return r.text
            if attempt >= 1:
                # challenge nie ustąpił z tymi cookies — świeża sesja
                print("    challenge TSPD nie ustępuje; nowa sesja...")
                self.session = make_session()
            time.sleep(2 + 2 * attempt)
        raise RuntimeError(f"TSPD challenge nie ustąpił po {retries} próbach: {url}")


def collect_index(box):
    """Zbierz hasła (id -> tytuł) ze stron-indeksów liter; dedupe po ID."""
    entries = {}
    for letter in LETTERS:
        url = f"{BASE}?litera={quote(letter)}"
        text = box.fetch(url)
        found = 0
        for m in re.finditer(
                r'BASLeksykon\.xsp\?id=([A-F0-9]{32})[^"]*"[^>]*>([^<]+)<', text):
            eid, label = m.group(1), html.unescape(m.group(2)).strip()
            if label and eid not in entries:
                entries[eid] = label
                found += 1
        print(f"  litera {letter}: +{found} haseł (razem {len(entries)})")
        time.sleep(SLEEP)
    return entries


def span_content(text, id_suffix):
    """Zawartość <span id="...{id_suffix}"> z obsługą zagnieżdżonych spanów."""
    m = re.search(r'<span id="[^"]*%s"[^>]*>' % re.escape(id_suffix), text)
    if not m:
        return None
    pos, depth, start = m.end(), 1, m.end()
    for tag in re.finditer(r'<span\b|</span>', text[pos:]):
        depth += 1 if tag.group(0).startswith("<span") else -1
        if depth == 0:
            return text[pos:pos + tag.start()]
    return None


def strip_html(fragment):
    if fragment is None:
        return None
    txt = re.sub(r'<br\s*/?>', '\n', fragment)
    txt = re.sub(r'</(?:p|li|ul|ol|div)>', '\n', txt)
    txt = re.sub(r'<[^>]+>', '', txt)
    txt = html.unescape(txt)
    txt = re.sub(r'[ \t]+', ' ', txt)
    txt = re.sub(r'\n\s*\n+', '\n', txt)
    return txt.strip() or None


def parse_entry(eid, text):
    entry = {
        "id": eid,
        "url": f"{BASE}?id={eid}",
        "title": strip_html(span_content(text, "computedField6")),
        "kategoria": strip_html(span_content(text, "computedField8")),
        "definicja": strip_html(span_content(text, "computedField2")),
        "zrodlo": strip_html(span_content(text, "computedField3")),
        "komentarz": strip_html(span_content(text, "computedField20")),
        "zobacz_tez": [],
        "dane_liczbowe_img": None,
    }
    # Linki "Co jeszcze zobaczyć?" (id=null to puste sloty)
    for m in re.finditer(
            r'BASLeksykon\.xsp\?id=([A-F0-9]{32})[^"]*"[^>]*>([^<]*)</a>', text):
        rid, label = m.group(1), html.unescape(m.group(2)).strip()
        if rid != eid and label:
            ref = {"id": rid, "title": label}
            if ref not in entry["zobacz_tez"]:
                entry["zobacz_tez"].append(ref)
    # Obrazek "Dane liczbowe" na orka2 — wymuś https (http zwraca 503)
    m = re.search(
        r'href="(https?://orka2\.sejm\.gov\.pl/[^"]+\$[Ff]ile/[^"]+?\.(?:jpe?g|png|gif))"',
        text)
    if m:
        entry["dane_liczbowe_img"] = {
            "url": m.group(1).replace("http://", "https://"), "local": None}
    return entry


def main():
    os.makedirs(LEX_DIR, exist_ok=True)
    os.makedirs(IMG_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    box = SessionBox()

    index_path = os.path.join(LEX_DIR, "index.json")
    if os.path.exists(index_path):
        entries = json.load(open(index_path, encoding="utf-8"))
        print(f"Indeks z cache: {len(entries)} haseł ({index_path})")
    else:
        print("Buduję indeks haseł...")
        entries = collect_index(box)
        json.dump(entries, open(index_path, "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        print(f"Indeks: {len(entries)} haseł -> {index_path}")

    # Pobierz strony haseł (idempotentnie)
    ids = sorted(entries)
    html_fail = []
    for i, eid in enumerate(ids, 1):
        path = os.path.join(LEX_DIR, f"{eid}.html")
        if os.path.exists(path) and os.path.getsize(path) > 5000:
            cached = open(path, encoding="utf-8", errors="replace").read()
            if not is_challenge(cached):
                continue
        try:
            text = box.fetch(f"{BASE}?id={eid}")
        except RuntimeError as e:
            print(f"  [{i}/{len(ids)}] FAIL {entries[eid]}: {e}")
            html_fail.append(eid)
            continue
        open(path, "w", encoding="utf-8").write(text)
        print(f"  [{i}/{len(ids)}] {entries[eid]}")
        time.sleep(SLEEP)
    print(f"HTML: {len(ids) - len(html_fail)}/{len(ids)} haseł"
          + (f", NIEUDANE: {len(html_fail)}" if html_fail else ""))
    ids = [e for e in ids if e not in html_fail]

    # Parsuj + pobierz obrazki
    parsed, failed, with_img = [], [], 0
    for i, eid in enumerate(ids, 1):
        path = os.path.join(LEX_DIR, f"{eid}.html")
        text = open(path, encoding="utf-8", errors="replace").read()
        entry = parse_entry(eid, text)
        if not entry["title"]:
            entry["title"] = entries[eid]
        if entry["dane_liczbowe_img"]:
            url = entry["dane_liczbowe_img"]["url"]
            fname = f"{eid}_{os.path.basename(url).split('$')[-1]}"
            fname = re.sub(r'[^A-Za-z0-9._-]', '_', fname)
            ipath = os.path.join(IMG_DIR, fname)
            if not (os.path.exists(ipath) and os.path.getsize(ipath) > 1000):
                try:
                    data = box.fetch(url, binary=True)
                    open(ipath, "wb").write(data)
                    print(f"  [{i}/{len(ids)}] img {fname} ({len(data)//1024} kB)")
                    time.sleep(SLEEP)
                except Exception as e:
                    print(f"  [{i}/{len(ids)}] img FAIL {url}: {e}")
            if os.path.exists(ipath) and os.path.getsize(ipath) > 1000:
                entry["dane_liczbowe_img"]["local"] = (
                    f"data/wiedza/sources/leksykon/img/{fname}")
                with_img += 1
        if not (entry["definicja"] or entry["komentarz"]):
            failed.append(entries[eid])
        parsed.append(entry)

    json.dump(parsed, open(OUT_JSON, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"\nZapisano {len(parsed)} haseł -> {OUT_JSON}")
    print(f"Z obrazkiem dane-liczbowe: {with_img}")
    if failed:
        print(f"Bez definicji i komentarza ({len(failed)}): {failed}")
    if html_fail:
        print(f"NIEPOBRANE hasła ({len(html_fail)}) — uruchom ponownie: {html_fail}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
