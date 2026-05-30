# Spec: Zgłoś błąd w pytaniu

## Cel

Dać użytkownikowi możliwość zgłoszenia błędu w treści pytania lub niezgody z odpowiedzią bezpośrednio z poziomu aplikacji. Bez tego niezadowoleni użytkownicy piszą na grupie FB zamiast do twórcy.

## Zakres

Pojedynczy link `mailto:` pojawiający się pod wyjaśnieniem odpowiedzi. Brak backendu, brak nowych zależności.

## Umiejscowienie

Button pojawia się dynamicznie w `checkAnswer()`, zaraz po wstrzyknięciu `.explanation-box` do `#q-body`. Widoczny niezależnie od trybu (learning i exam — w obu wyjaśnienie pojawia się po udzieleniu odpowiedzi).

## HTML

```html
<div class="report-bar">
  <button class="btn-sm ghost" onclick="reportQuestion('[id]')">Zgłoś błąd w pytaniu</button>
</div>
```

`[id]` zastępowane dynamicznie przez JS — patrz sekcja JS.

Uwaga: używamy `<button>` (nie `<a>`), bo CSS klas `.btn-sm` i `.ghost` w `index.html` jest skoped do selektora `button`.

## CSS

```css
.report-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
```

Dodać do bloku stylów w `index.html`.

## JS

Nowa funkcja pomocnicza (dodać obok innych funkcji globalnych):

```js
function reportQuestion(id) {
  var subject = encodeURIComponent('Zgłoszenie błędu – pytanie #' + id);
  window.location.href = 'mailto:michal@kutra.pl?cc=ewelina.wegrocka%40gmail.com&subject=' + subject;
}
```

W `checkAnswer()`, po linii wstrzykującej `.explanation-box`:

```js
const reportHtml = '<div class="report-bar"><button class="btn-sm ghost" onclick="reportQuestion(\'' + q.id + '\')">Zgłoś błąd w pytaniu</button></div>';
document.getElementById('q-body').insertAdjacentHTML('beforeend', reportHtml);
```

Uwaga: adres w `cc=` kodujemy jako `%40` (nie `@`) — wymagane przez RFC i niektóre klienty pocztowe.

## Odbiorcy maila

- To: `michal@kutra.pl`
- CC: `ewelina.wegrocka@gmail.com`

## Co NIE wchodzi w zakres

- Pre-wypełniona treść maila (tylko temat)
- Przycisk na ekranie podsumowania
- Żaden backend ani zbieranie zgłoszeń w aplikacji
