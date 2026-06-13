#!/usr/bin/env bash
# Pobieranie wszystkich źródeł do puli pytań "sprawdzian wiedzy" (część II egzaminu).
# Idempotentny: pomija pliki, które już istnieją i mają sensowny rozmiar.
#
# Użycie: bash tools/wiedza/fetch-sources.sh
# Wymagania: curl; do kroku 4 (leksykon) python z requests (np. /tmp/pdfenv/bin/python).
set -euo pipefail

cd "$(dirname "$0")/../.."

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
KSAP=data/wiedza/sources/ksap
AKTY=data/wiedza/sources/akty
mkdir -p "$KSAP" "$AKTY" data/wiedza/sources/leksykon/img data/wiedza/extracted

# fetch <url> <dest> [min_bytes] — pobiera, jeśli plik nie istnieje lub jest za mały
fetch() {
  local url=$1 dest=$2 min=${3:-50000}
  if [ -f "$dest" ] && [ "$(wc -c < "$dest")" -ge "$min" ]; then
    echo "SKIP  $dest (istnieje)"
    return 0
  fi
  echo "GET   $url"
  curl -sSL -A "$UA" "$url" -o "$dest"
  local size; size=$(wc -c < "$dest")
  if [ "$size" -lt "$min" ]; then
    echo "FAIL  $dest ma tylko $size B (oczekiwano >= $min)" >&2
    return 1
  fi
  echo "OK    $dest ($((size / 1024)) kB)"
}

echo "== 1. Egzaminy KSAP (sprawdzian wiedzy 2023-2025, wersje A/B) =="
# Linki wzięte ze strony z listą:
#   https://ksap.gov.pl/ksap/postepowanie-kwalifikacyjne-w-sluzbie-cywilnej/sprawdziany
# (przy zmianie nazw plików: curl -sL -A "$UA" <strona> | grep -oE 'href="[^"]*\.pdf"')
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pkwsc_2023_a.pdf" "$KSAP/wiedza-2023-a.pdf"
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pkwsc_2023_b.pdf" "$KSAP/wiedza-2023-b.pdf"
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pytania_ze_sprawdzianu_wiedzy_w_2024_r._-_wersja_a.pdf" "$KSAP/wiedza-2024-a.pdf"
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pytania_ze_sprawdzianu_wiedzy_w_2024_r._-_wersja_b.pdf" "$KSAP/wiedza-2024-b.pdf"
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pytania_ze_sprawdzianu_wiedzy_w_2025_r._-_wersja_a.pdf" "$KSAP/wiedza-2025-a.pdf"
fetch "https://ksap.gov.pl/ksap/sites/default/files/files/pytania_ze_sprawdzianu_wiedzy_w_2025_r._-_wersja_b.pdf" "$KSAP/wiedza-2025-b.pdf"

echo
echo "== 2. Rozporządzenie (taksonomia, Zał. 1) i ustawa budżetowa na 2026 =="
# Fallbacki, gdyby ELI API nie oddało pliku:
#   https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20250000811/O/D20250811.pdf
#   https://www.dziennikustaw.gov.pl/D2026000006201.pdf
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/811/text.pdf" "$AKTY/rozporzadzenie-2025-811.pdf" \
  || fetch "https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20250000811/O/D20250811.pdf" "$AKTY/rozporzadzenie-2025-811.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2026/62/text.pdf" "$AKTY/ustawa-budzetowa-2026.pdf" 1000000 \
  || fetch "https://www.dziennikustaw.gov.pl/D2026000006201.pdf" "$AKTY/ustawa-budzetowa-2026.pdf" 1000000

echo
echo "== 3. Akty źródłowe (najnowsze teksty jednolite, ELI API) =="
# Adresy t.j. ustalone 2026-06-10 z metadanych ELI aktu pierwotnego:
#   curl -s https://api.sejm.gov.pl/eli/acts/DU/<rok>/<poz> | jq '.references["Inf. o tekście jednolitym"]'
# (pierwszy element listy = najnowszy tekst jednolity)
# Konstytucja nie ma t.j. — używamy tekstu ujednoliconego Kancelarii Sejmu (typ U,
# uwzględnia nowele z 2006 i 2009 r.; oryginał DU/1997/483 to skan).
fetch "https://api.sejm.gov.pl/eli/acts/DU/1997/483/text/U/D19970483Lj.pdf" "$AKTY/konstytucja-rp-ujednolicony.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf"  "$AKTY/ustawa-o-sluzbie-cywilnej-tj-2026-590.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/1691/text.pdf" "$AKTY/kpa-tj-2025-1691.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/1483/text.pdf" "$AKTY/ustawa-o-finansach-publicznych-tj-2025-1483.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/780/text.pdf"  "$AKTY/ustawa-o-radzie-ministrow-tj-2025-780.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/428/text.pdf"  "$AKTY/ustawa-o-wojewodzie-tj-2025-428.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2026/662/text.pdf"  "$AKTY/ustawa-o-samorzadzie-gminnym-tj-2026-662.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2025/1684/text.pdf" "$AKTY/ustawa-o-samorzadzie-powiatowym-tj-2025-1684.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2026/720/text.pdf"  "$AKTY/ustawa-o-samorzadzie-wojewodztwa-tj-2026-720.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2022/902/text.pdf"  "$AKTY/ustawa-o-dostepie-do-informacji-publicznej-tj-2022-902.pdf"
fetch "https://api.sejm.gov.pl/eli/acts/DU/2019/1781/text.pdf" "$AKTY/ustawa-o-ochronie-danych-osobowych-tj-2019-1781.pdf"

echo
echo "== 4. Leksykon budżetowy Sejmu (crawl, idempotentny) =="
# UWAGA: www.sejm.gov.pl jest za ochroną F5/TSPD ("Human Verification") — zwykły curl
# dostaje challenge JS. Działa schemat cookie-jar: pierwsze żądanie ustawia cookies
# TSPD, ponowienie TEGO SAMEGO żądania z cookies przechodzi. crawl-leksykon.py robi
# to automatycznie (requests.Session + retry przy wykryciu challenge).
# Odpowiednik w czystym curl:
#   curl -sL -A "$UA" -c /tmp/sejm_cookies.txt -b /tmp/sejm_cookies.txt "<url>"   # 1. challenge
#   sleep 2
#   curl -sL -A "$UA" -c /tmp/sejm_cookies.txt -b /tmp/sejm_cookies.txt \
#        -H "Accept-Language: pl-PL,pl;q=0.9" -H "Referer: https://www.sejm.gov.pl/" "<url>"
# Obrazki "Dane liczbowe" są na orka2.sejm.gov.pl — TYLKO https (http daje 503).
PY=${PYTHON:-/tmp/pdfenv/bin/python}
if [ -x "$PY" ]; then
  "$PY" tools/wiedza/crawl-leksykon.py
else
  echo "POMINIĘTO leksykon: brak pythona pod $PY (ustaw PYTHON=... z zainstalowanym requests)" >&2
fi

echo
echo "Gotowe."
