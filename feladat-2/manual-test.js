const assert=require('node:assert/strict');
const {calculateShippingCost:f}=require('./shipping');
const cases=[[10000,4.99,'HU',false,1500],[10000,5,'HU',false,2500],[10000,20,'HU',false,2500],[10000,21,'HU',false,5000],[19999,2,'HU',false,1500],[20000,2,'HU',false,0],[25000,25,'HU',true,0],[10000,2,'AT',false,3000],[25000,2,'AT',false,3000],[10000,2,'HU',true,2250],[10000,5,'DE',true,7500],[20000,2,'hu',false,0],[0,0,'HU',false,1500]];
for(const x of cases) assert.equal(f(...x.slice(0,4)),x[4]);
assert.throws(()=>f(-1,2,'HU',false),RangeError); assert.throws(()=>f(100,-1,'HU',false),RangeError);assert.throws(()=>f(100,2,'HUN',false),TypeError);
console.log('16 ellenőrzés sikeres');