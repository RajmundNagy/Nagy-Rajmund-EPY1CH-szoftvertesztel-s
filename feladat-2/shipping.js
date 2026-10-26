function calculateShippingCost(orderValue, weight, country, express) {
  if (typeof orderValue !== 'number' || !Number.isFinite(orderValue) || orderValue < 0)
    throw new RangeError('A rendelési érték nemnegatív, véges szám kell legyen.');
  if (typeof weight !== 'number' || !Number.isFinite(weight) || weight < 0)
    throw new RangeError('A tömeg nemnegatív, véges szám kell legyen.');
  if (typeof country !== 'string' || !/^[a-z]{2}$/i.test(country))
    throw new TypeError('Az országkód kétbetűs ISO-kód kell legyen.');
  if (typeof express !== 'boolean')
    throw new TypeError('Az express értéke boolean kell legyen.');
  country = country.toUpperCase();
  if (country === 'HU' && orderValue >= 20000) return 0;
  let shippingCost = weight < 5 ? 1500 : weight <= 20 ? 2500 : 5000;
  if (country !== 'HU') shippingCost *= 2;
  if (express) shippingCost *= 1.5;
  return shippingCost;
}
if (typeof module !== 'undefined' && module.exports) module.exports = { calculateShippingCost };
