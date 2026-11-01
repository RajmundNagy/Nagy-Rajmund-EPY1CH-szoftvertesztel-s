'use strict';

function requireRange(value, min, max = Infinity) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError('Érvénytelen szám vagy tartomány.');
  }
}

function calculateDiscountedPrice(orderValue, isVip) {
  requireRange(orderValue, 0);
  let discount = orderValue >= 50000 ? 0.15
    : orderValue >= 25000 ? 0.10 : orderValue >= 10000 ? 0.05 : 0;
  if (isVip === true) discount += 0.05;
  return orderValue * (1 - Math.min(discount, 0.20));
}

// Egy napi parkolás: az ingyenes 15 perc levonása után számítjuk
// a megkezdett órákat. A normál díjat maximáljuk, majd kedvezményezünk.
function calculateParkingFee(minutes, isWeekend, isVip) {
  requireRange(minutes, 0);
  if (minutes <= 15) return 0;
  let fee = Math.min(Math.ceil((minutes - 15) / 60) * 600, 5000);
  if (isWeekend) fee *= 0.5;
  if (isVip) fee *= 0.8;
  return fee;
}

function calculateTicketPrice(age, isStudent, is3D) {
  requireRange(age, 0, 120);
  const ageDiscount = age < 6 ? 1 : age < 18 ? 0.30 : age >= 65 ? 0.40 : 0;
  const discount = Math.max(ageDiscount, isStudent ? 0.20 : 0);
  return 3000 * (1 - discount) + (is3D ? 800 : 0);
}

function calculateGrade(theory, practice) {
  requireRange(theory, 0, 60);
  requireRange(practice, 0, 40);
  if (theory < 30 || practice < 20) return 1;
  const total = theory + practice;
  if (total < 50) return 1;
  if (total < 60) return 2;
  if (total < 70) return 3;
  if (total < 85) return 4;
  return 5;
}

function classifyPackage(weight, length, width, height) {
  if (![weight, length, width, height].every(v => Number.isFinite(v) && v > 0)) {
    return 'INVALID';
  }
  const maxDimension = Math.max(length, width, height);
  if (weight <= 2 && maxDimension <= 30) return 'SMALL';
  if (weight <= 10 && maxDimension <= 60) return 'MEDIUM';
  if (weight <= 30 && maxDimension <= 120) return 'LARGE';
  return 'OVERSIZE';
}

module.exports = { calculateDiscountedPrice, calculateParkingFee,
  calculateTicketPrice, calculateGrade, classifyPackage };
