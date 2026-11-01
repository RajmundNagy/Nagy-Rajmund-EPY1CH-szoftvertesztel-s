# 4. feladat – Mock objektumok használata (Mockito)

Java 17, Maven, JUnit 5 és Mockito alapú megoldás.

A Moodle mostani számozása szerint ez a **4. feladat**. A korábbi BankAccount-megoldás a repository `feladat-4-bank-account` branchén található; az itt szereplő BankAccount és annak tesztjei abból származnak.

## Futtatás

A repository letöltése után, ezen a branchen:

```sh
cd feladat-4-mockito
mvn clean test
```

JDK 17 vagy újabb és Maven 3.9 ajánlott. Az első futtatás internetkapcsolatot igényel a függőségek letöltéséhez.

## Megoldás

- `BankAccount`: egyenleg kezelése, pozitív és véges összegek ellenőrzése.
- `NotificationService`: `send(String message)` értesítési interfész.
- `BankService`: konstruktoron keresztül kapja az értesítési szolgáltatást. Először befizet, csak siker után küld értesítést.
- `ExchangeRateService`: árfolyamlekérdezési interfész; a teszt `when(...).thenReturn(...)` segítségével állítja be az eredményt.

A tesztek valós BankAccount objektumot és mockolt külső szolgáltatásokat használnak; nem küldenek valódi értesítést és nem hívnak árfolyam-API-t.

## Tesztelt esetek

A BankAccount 11 korábbi tesztje mellett a szolgáltatástesztek ellenőrzik az egyenleg növekedését, több befizetést, az üzenet pontos tartalmát és egyszeri elküldését (`verify`), valamint azt, hogy hibás befizetéskor sem az egyenleg nem változik, sem értesítés nem történik. Az árfolyamteszt a beállított válaszértéket ellenőrzi.

A 400 HUF/EUR érték kizárólag tesztadat.

A tesztkonfiguráció a Mockito `mock-maker-proxy` megvalósítását használja: kizárólag interfészeket mockolunk, így nincs szükség JVM-agent csatolására.

Ellenőrzés: `mvn clean test` – 22 teszteset, 0 hiba, 0 sikertelen teszt.
