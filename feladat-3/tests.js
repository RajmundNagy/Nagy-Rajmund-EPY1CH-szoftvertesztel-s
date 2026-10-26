QUnit.module('Arab -> római szám konverter (TDD)', () => {
  const cases = [
    [1,'I'],[2,'II'],[3,'III'],[4,'IV'],[5,'V'],[9,'IX'],
    [10,'X'],[14,'XIV'],[40,'XL'],[49,'XLIX'],[50,'L'],
    [90,'XC'],[100,'C'],[400,'CD'],[500,'D'],[900,'CM'],
    [1000,'M'],[1984,'MCMLXXXIV'],[2026,'MMXXVI'],[3999,'MMMCMXCIX']
  ];
  cases.forEach(([input,expected]) => QUnit.test(input+' -> '+expected, assert => {
    assert.strictEqual(toRoman(input),expected);
  }));
  [0,-1,4000,1.5,NaN,Infinity,'10',null].forEach(input => {
    QUnit.test('Érvénytelen szám: '+String(input), assert => {
      assert.throws(() => toRoman(input),RangeError);
    });
  });
});
