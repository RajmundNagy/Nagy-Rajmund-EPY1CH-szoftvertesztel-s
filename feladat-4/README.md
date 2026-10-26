# 4. feladat – BankAccount

Java 17 + JUnit 5 / Maven. A `BankAccount` osztály kezdeti egyenlege 0; metódusai: `deposit(double amount)`, `withdraw(double amount)`, `getBalance()`.

Érvénytelen, nulla, negatív, NaN vagy végtelen összegek és fedezethiány esetén `IllegalArgumentException` keletkezik. A tesztosztály a 10 megadott alaphelyzetet és további szélsőértékeket fed le.

Futtatás a `feladat-4` könyvtárból: `mvn test` (Java 17 és Maven szükséges).

A feladat `double`-t ír elő; éles pénzügyi alkalmazásban `BigDecimal` használata javasolt.
