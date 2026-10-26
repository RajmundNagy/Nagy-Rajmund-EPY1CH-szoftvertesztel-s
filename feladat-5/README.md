# 5. feladat – Gömb alakú bolygón mozgó holdjáró (TDD)

Node.js / JavaScript implementáció. A 18 teszteset **mind külön Git commitban** készült el az implementáció előtt (Red), majd a `rover.js` a Green fázis. Az ellenőrző tesztek a `tests/` mappában vannak.

## Futtatás
Node.js 18 vagy újabb: a `feladat-5` könyvtárban `node --test tests/*.test.js` vagy `npm test`.

## Világmodell (explicit döntések)
- `width` páros pozitív egész (alapérték 8), `height` legalább 2 (alapérték 5).
- `x` 0-tól `width-1`-ig, `y` 0-tól `height-1`-ig fut. Észak a növekvő y.
- Az E/W hosszirány átlépi a 0 / width-1 határt, körbeérve.
- Az északi és déli pólus túllépésekor a holdjáró ugyanazon szélső szélességi soron marad, a hosszúságot fél körrel eltolja (width/2), az N/S tájolást megfordítja. Ez egy diszkrét gömbfelület-modell. A póluson lévő szélességi sort nem azonosítja egyetlen fizikai ponttal.
- Az `f` előre, `b` hátra lép; `l` balra, `r` jobbra fordít, 90°-ot.
- Minden lépés **előtt** ellenőrzi a célmezőt. Akadálynál a holdjáró a legutolsó szabad helyen marad, az `obstacle` tulajdonságban megadja a blokkoló pontot, a hátralévő utasításokat nem hajtja végre.
- Csak kisbetűs utasításokat fogad el; hibás karakter esetén a parancssor végrehajtása előtt hibát dob.

## Példa
```js
const { Rover } = require('./rover');
const rover = new Rover(1,1,'E',{width:8,height:5,obstacles:[[3,1]]});
rover.execute('fff');
console.log(rover.state()); // { x: 2, y: 1, direction: 'E' }
console.log(rover.obstacle); // { x: 3, y: 1 }
```

## TDD-megjegyzés
A 18 külön **teszt-commit** története igazolja a tesztek implementáció előtti rögzítését; a Red–Green–Refactor fejlesztési ciklus futtatott naplója nincs eltárolva. A feladat specifikációja nem határozza meg pontosan a pólusokon való áthaladás koordinátarendszerét, ezért az itt használt szabály dokumentált döntés.
