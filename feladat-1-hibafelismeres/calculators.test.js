'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateDiscountedPrice: discount, calculateParkingFee: parking,
  calculateTicketPrice: cinema, calculateGrade: grade, classifyPackage: parcel
} = require('./calculators');

function cases(name, fn, rows) {
  for (const [args, expected] of rows) {
    test(`${name}: ${JSON.stringify(args)} -> ${expected}`, () => {
      const actual = fn(...args);
      if (typeof expected === 'number') {
        assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);
      } else assert.equal(actual, expected);
    });
  }
}

cases('Rendelés', discount, [
  [[0, false], 0], [[9999, false], 9999], [[10000, false], 9500],
  [[24999, false], 23749.05], [[25000, false], 22500],
  [[49999, false], 44999.10], [[50000, false], 42500],
  [[1000, true], 950], [[10000, true], 9000], [[20000, true], 18000],
  [[25000, true], 21250], [[50000, true], 40000], [[100000, true], 80000]
]);

cases('Parkolás', parking, [
  [[0, false, false], 0], [[14, false, true], 0], [[15, false, true], 0],
  [[16, false, false], 600], [[60, false, false], 600],
  [[75, false, false], 600], [[76, false, false], 1200],
  [[135, false, false], 1200], [[136, false, false], 1800],
  [[16, true, false], 300], [[16, false, true], 480], [[16, true, true], 240],
  [[495, false, false], 4800], [[496, false, false], 5000],
  [[1440, false, false], 5000], [[1440, true, false], 2500],
  [[1440, false, true], 4000], [[1440, true, true], 2000]
]);

cases('Mozi', cinema, [
  [[0, false, false], 0], [[5, false, false], 0], [[5, true, true], 800],
  [[6, false, false], 2100], [[17, true, false], 2100],
  [[18, false, false], 3000], [[18, true, false], 2400],
  [[64, false, false], 3000], [[65, false, false], 1800],
  [[65, true, false], 1800], [[120, false, false], 1800],
  [[18, false, true], 3800], [[18, true, true], 3200],
  [[17, true, true], 2900], [[65, true, true], 2600]
]);

cases('Vizsga', grade, [
  [[0, 0], 1], [[29, 40], 1], [[60, 19], 1], [[29, 19], 1],
  [[30, 20], 2], [[39, 20], 2], [[40, 20], 3], [[49, 20], 3],
  [[50, 20], 4], [[60, 24], 4], [[60, 25], 5], [[60, 40], 5]
]);

cases('Csomag', parcel, [
  [[1, 10, 10, 10], 'SMALL'], [[2, 30, 30, 30], 'SMALL'],
  [[2.01, 30, 30, 30], 'MEDIUM'], [[1, 30.01, 20, 20], 'MEDIUM'],
  [[1, 20, 30.01, 20], 'MEDIUM'], [[1, 20, 20, 30.01], 'MEDIUM'],
  [[10, 60, 60, 60], 'MEDIUM'], [[10.01, 60, 60, 60], 'LARGE'],
  [[5, 100, 50, 50], 'LARGE'], [[5, 50, 100, 50], 'LARGE'],
  [[5, 50, 50, 100], 'LARGE'], [[30, 120, 120, 120], 'LARGE'],
  [[30.01, 10, 10, 10], 'OVERSIZE'], [[5, 121, 50, 50], 'OVERSIZE'],
  [[5, 50, 121, 50], 'OVERSIZE'], [[5, 50, 50, 121], 'OVERSIZE']
]);

for (const invalid of [-1, NaN, Infinity, -Infinity, '10', null, undefined]) {
  test(`Hibás numerikus bemenet: ${String(invalid)}`, () => {
    assert.throws(() => discount(invalid, false), RangeError);
    assert.throws(() => parking(invalid, false, false), RangeError);
    assert.throws(() => cinema(invalid, false, false), RangeError);
    assert.throws(() => grade(invalid, 20), RangeError);
    assert.throws(() => grade(30, invalid), RangeError);
  });
}

test('Tartományok felső korlátja', () => {
  assert.throws(() => cinema(121, false, false), RangeError);
  assert.throws(() => grade(61, 20), RangeError);
  assert.throws(() => grade(30, 41), RangeError);
});

for (let index = 0; index < 4; index++) {
  for (const invalid of [0, -1, NaN, Infinity, -Infinity, '10', null, undefined]) {
    test(`Érvénytelen csomag: ${index}. paraméter = ${String(invalid)}`, () => {
      const args = [1, 10, 10, 10];
      args[index] = invalid;
      assert.equal(parcel(...args), 'INVALID');
    });
  }
}
