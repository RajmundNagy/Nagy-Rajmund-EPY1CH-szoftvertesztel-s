# 2. feladat – Szállítási díj tesztelése (QUnit)

Futtatás: nyisd meg az `index.html` fájlt böngészőben internetkapcsolattal (16 teszt), vagy futtasd `node manual-test.js`.

## Hibák és reprodukció
- 5 kg: elvárt 2500 Ft, az eredeti 5000 Ft-ot ad.
- 20 kg: elvárt 2500 Ft, az eredeti 5000 Ft-ot ad.
- Expressz belföldi 2 kg: elvárt 2250 Ft, az eredeti 1550 Ft-ot ad.
- Külföldi expressz 5 kg: elvárt 7500 Ft, az eredeti 10050 Ft-ot ad.
- Kisbetűs országkód: nem kezeli.
- Negatív érték/tömeg és hibás országkód: nincs ellenőrzés.
- Belföldön 20 000 Ft rendelési értéktől ingyenes szállítás (expresszel is).
