# Backlog

## Zainstaluj aplikację (PWA install prompt)

Dodać przycisk "Zainstaluj aplikację" na ekranie głównym:

- **Android**: przechwycić `beforeinstallprompt`, podpiąć pod przycisk → natywny dialog instalacji
- **iOS**: pokazać modal z instrukcją krok po kroku (Udostępnij → Dodaj do ekranu głównego)
- Ukryć przycisk gdy appka działa już w trybie standalone (`display-mode: standalone`)
