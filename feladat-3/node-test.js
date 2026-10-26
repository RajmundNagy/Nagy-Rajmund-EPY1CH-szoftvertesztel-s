const assert = require('node:assert/strict');
const {toRoman} = require('./roman');
const cases = [[1,'I'],[2,'II'],[3,'III'],[4,'IV'],[5,'V'],[9,'IX'],[10,'X'],[14,'XIV'],[40,'XL'],[49,'XLIX'],[50,'L'],[90,'XC'],[100,'C'],[400,'CD'],[500,'D'],[900,'CM'],[1000,'M'],[1984,'MCMLXXXIV'],[2026,'MMXXVI'],[3999,'MMMCMXCIX']];
for(const [input,expected] of cases) assert.equal(toRoman(input),expected);
for(const x of [0,-1,4000,1.5,NaN,Infinity,'10',null]) assert.throws(()=>toRoman(x),RangeError);
console.log('27 teszt sikeres.');
