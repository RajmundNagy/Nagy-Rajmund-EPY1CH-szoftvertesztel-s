# 3. feladat – Arab–római szám konverter (TDD)

JavaScript megoldás 1–3999 közötti pozitív egész számokra. A klasszikus kivonásos jelölést is használja (IV, IX, XL, XC, CD, CM).

## Tesztvezérelt fejlesztés (Red–Green–Refactor)
1. **Red:** egy számhoz (például 4 -> IV) először sikertelen tesztet írunk.
2. **Green:** a legkisebb szükséges implementációval teljesítjük a tesztet.
3. **Refactor:** általánosítjuk a táblázatos átalakítást, majd új határeseteket adunk hozzá.

A tesztkészlet 19 érvényes és 8 érvénytelen bemenetet fed le. A kód végállapota és tesztjei vannak verziókezelve; a történeti TDD-ciklusokat külön commitok nem dokumentálják.

## Futtatás
Böngészőben nyisd meg az `index.html`-t, internetkapcsolattal a QUnit betöltéséhez, vagy futtasd: `node node-test.js`.
