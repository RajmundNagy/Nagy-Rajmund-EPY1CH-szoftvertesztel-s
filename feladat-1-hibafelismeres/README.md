# 1. feladat – Hiba felismerése kódban

A megoldás az öt mellékelt oktatási képen látható specifikációra és JavaScript-programra épül. Minden programnál megadom a hibás részletet, az eltérés okát és a javítást. A teljes javított kód a [calculators.js](calculators.js), a futtatható ellenőrzések a [calculators.test.js](calculators.test.js) fájlban vannak.

## 1. DiscountCalculator

| Hibás kódrészlet / hiány | Magyarázat | Javítás |
| --- | --- | --- |
| `orderValue > 10000 && orderValue < 25000` | Pontosan 10 000 Ft-ra nem adja meg az 5% kedvezményt. | Az alsó határ legyen `>= 10000`. |
| `orderValue >= 25000 && orderValue <= 50000`, majd `orderValue > 50000` | Pontosan 50 000 Ft a 10%-os sávba kerül a 15%-os helyett. | A középső sáv felső határa `< 50000`, a felső sávé `>= 50000`. |
| `discount += 5` | A kedvezmény tört alakú; az 5 itt 500 százalékpont, nem 5. A korlátozás miatt minden VIP rögtön 20%-ot kap. | `discount += 0.05`. |
| `return orderValue - discount` | A kedvezmény arányát vonja le forintként, nem a rendelési érték százalékát. | `return orderValue * (1 - discount)`. |
| Hiányzik a negatív rendelési érték ellenőrzése. | Negatív bemenetből negatív fizetendő összeg keletkezik. | A számítás előtt hibát kell dobni, ha `orderValue < 0`. |

A 20%-os felső korlát ellenőrzése önmagában helyes, meg kell tartani. Például 10 000 Ft nem VIP rendelés helyes ára 9500 Ft; 50 000 Ft nem VIP rendelésé 42 500 Ft; 20 000 Ft VIP rendelésé 18 000 Ft.

## 2. ParkingFeeCalculator

| Hibás kódrészlet / hiány | Magyarázat | Javítás |
| --- | --- | --- |
| `if (minutes < 15)` | A pontosan 15 perces parkolásnak is ingyenesnek kell lennie. Az eredetiben a későbbi kerekítési hiba ezt nem VIP esetben elfedi. | `if (minutes <= 15) return 0`, a bemenetellenőrzés után. |
| `Math.floor(minutes / 60)` | Lefelé kerekít, ezért például 16 percre 0 Ft-ot számít, pedig már megkezdődött a fizetős időszak. | Felfelé kell kerekíteni: a lent rögzített értelmezéssel `Math.ceil((minutes - 15) / 60)`. |
| `fee = fee - 20` | 20 Ft-ot von le 20% helyett; kis díjnál negatív eredményt is adhat. | `fee *= 0.8`. |
| A `if (fee > 5000)` blokk csak a kedvezmények után következik. | Ha az 5000 Ft a normál napi tarifa maximuma, a kedvezmények alapja túl magas marad. | A normál díjat előbb `Math.min(fee, 5000)` korlátozza, utána következik a hétvégi és VIP-kedvezmény. |
| Hiányzik a negatív idő ellenőrzése. | A negatív idő az ingyenes ágba jut, és 0-val tér vissza hiba helyett. | A függvény elején ellenőrizni kell a nemnegatív időt. |

**A specifikáció értelmezése:** az „első 15 perc ingyenes” alapján ezt az időt levonom a számlázott időből: 16–75 perc 600 Ft, 76–135 perc 1200 Ft. Ha a 15 perc csak türelmi idő lenne, amely után az egész parkolási idő fizetős, akkor `Math.ceil(minutes / 60)` kellene. Ezt a szöveg nem különíti el teljesen egyértelműen.

A megoldás az 5000 Ft-ot a **normál napi díj** maximumának tekinti, ezért hosszú parkolás hétvégén 2500 Ft, hétvégén VIP-ként 2000 Ft. Ha az 5000 Ft a kedvezmények utáni végösszeg korlátja lenne, az eredeti korlátozási sorrend helyes lenne. A függvény egy napi parkolást kezel; a többnapos elszámolás és a naptári napváltás szabályát a feladat nem határozza meg.

## 3. CinemaTicketCalculator

| Hibás kódrészlet / hiány | Magyarázat | Javítás |
| --- | --- | --- |
| `if (age <= 6)` | A 6 éveseknek már a 30%-os kedvezmény jár, nem ingyenes a jegy. | `age < 6`. |
| `else if (age > 65)` | A pontosan 65 évesek nem kapják meg a 40%-ot. | `age >= 65`. |
| `if (isStudent) { price = price * 0.8; }` | A diákkedvezményt a kor szerinti kedvezményre halmozza. Például egy 17 éves diák így 1680 Ft-ot fizetne 2100 Ft helyett. | A kor és a diákstátusz szerinti kedvezmények maximumát kell kiválasztani. |
| `price = price * 1.8` | 80%-kal emel, holott a 3D felára fix 800 Ft. A felár összege a már kedvezményezett ártól függ. | A kedvezményezett alapárhoz `+ 800` adandó. |
| Hiányzik az életkor tartományellenőrzése. | Negatív életkorra ingyenes, 120 felett kedvezményes jegyet ad. | Csak a 0–120 tartomány fogadható el. |

Példák: 6 éves néző 2D jegye 2100 Ft; 65 éves diáké 1800 Ft; felnőtt diák 3D jegye 3200 Ft. A 6 év alatti néző alapjegye ingyenes, de a kedvezmény nélküli 3D felár rá is vonatkozik: 800 Ft.

## 4. ExamGradeCalculator

| Hibás kódrészlet / hiány | Magyarázat | Javítás |
| --- | --- | --- |
| `theory < 30 && practice < 20` | Csak akkor buktat, ha mindkét minimum hiányzik. Már egyetlen részminimum hiánya is elégtelent jelent. | `theory < 30 || practice < 20`. |
| `total <= 60` | A 60 pontot kettesnek értékeli, pedig az már hármas. | `total < 60`. |
| `total <= 70` | A 70 pontot hármasnak értékeli, pedig az már négyes. | `total < 70`. |
| `total <= 85` | A 85 pontot négyesnek értékeli, pedig az már ötös. | `total < 85`. |
| Hiányzik a részpontszámok ellenőrzése. | Negatív vagy a maximumot meghaladó részpontszámra is jegyet ad. Az összpontszám ellenőrzése önmagában nem elég. | Elmélet: 0–60; gyakorlat: 0–40. Érvénytelen bemenetre kivétel. |

Példák: `(29, 40)` és `(60, 19)` egyaránt 1; `(30, 20)` → 2; `(40, 20)` → 3; `(50, 20)` → 4; `(60, 25)` → 5. A minimumok pontos teljesítése elegendő, ezért az eredeti `< 30` és `< 20` összehasonlításokat meg kell tartani.

## 5. PackageClassifier

| Hibás kódrészlet / hiány | Magyarázat | Javítás |
| --- | --- | --- |
| `weight < 2`, `length < 30`, `width < 30`, `height < 30` | A „legfeljebb” határértékeket is tartalmaz: a 2 kg-os vagy 30 cm-es csomag is lehet SMALL. | Mind a négy összehasonlításban `<=`. |
| `length <= 60 || width <= 60 || height <= 60` | Elég egy rövid oldal a MEDIUM kategóriához, a többi tetszőlegesen nagy lehet. | Mindhárom méretkorlátot teljesíteni kell: `&&`. |
| Hiányzik az érvényességi ellenőrzés. | Nulla vagy negatív tömeg/méret is bekerülhet valamelyik kategóriába. | A besorolás előtt: bármely érték `<= 0` esetén `INVALID`. |

A LARGE feltételeiben a `<=` és az `&&` helyes. A SMALL → MEDIUM → LARGE sorrend is helyes, mert a legkisebb megfelelő kategóriát választja. Példák: `(2, 30, 30, 30)` → SMALL; `(10, 60, 60, 60)` → MEDIUM; `(5, 100, 50, 50)` → LARGE; `(5, 121, 50, 50)` → OVERSIZE; `(0, 10, 10, 10)` → INVALID.

## Futtatás és bemenetkezelés

Node.js 18 vagy újabb verzióval, külső függőség nélkül:

```sh
cd feladat-1-hibafelismeres
node --test calculators.test.js
```

A tesztek a sávhatárokat, kedvezménykombinációkat, hibás bemeneteket és a fenti ellenpéldákat ellenőrzik. Az első négy függvény hibás számra `RangeError` kivételt dob; a csomagbesoroló a megadott `INVALID` értéket adja vissza. Kiegészítő védelemként a nem szám típusokat, a `NaN`-t és a végtelent is elutasítjuk. Ezt nem külön specifikációs hibaként soroljuk fel. A logikai jelzőknél a hívó valódi boolean értékeket ad át. A feladat nem ír elő pénzügyi kerekítési szabályt, ezért a kód nem kerekít egész forintra.
