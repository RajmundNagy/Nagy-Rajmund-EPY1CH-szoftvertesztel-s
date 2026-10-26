QUnit.module('Szállítási díj', () => {
const cases=[['5 kg alatt',10000,4.99,'HU',false,1500],['5 kg',10000,5,'HU',false,2500],['20 kg',10000,20,'HU',false,2500],['20 kg felett',10000,21,'HU',false,5000],['Értékhatár alatt',19999,2,'HU',false,1500],['Ingyenes',20000,2,'HU',false,0],['Expressz ingyenes',25000,25,'HU',true,0],['Külföld',10000,2,'AT',false,3000],['Külföldön nem ingyenes',25000,2,'AT',false,3000],['Expressz',10000,2,'HU',true,2250],['Külföldi expressz',10000,5,'DE',true,7500],['Kisbetűs',20000,2,'hu',false,0],['Nulla tömeg',0,0,'HU',false,1500]];
cases.forEach(([name,a,b,c,d,expected]) => QUnit.test(name,assert=>assert.strictEqual(calculateShippingCost(a,b,c,d),expected)));
QUnit.test('Negatív rendelés',a=>a.throws(()=>calculateShippingCost(-1,2,'HU',false),RangeError));
QUnit.test('Negatív súly',a=>a.throws(()=>calculateShippingCost(100,-1,'HU',false),RangeError));
QUnit.test('Érvénytelen ország',a=>a.throws(()=>calculateShippingCost(100,2,'HUN',false),TypeError));
});