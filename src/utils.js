export const toCurrency = (val, dec = 2) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minumumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(val);

export const toPercent = (val) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minumumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);

export const toNumber = (val, dec = 0) =>
  new Intl.NumberFormat('en-US', {
    minumumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(val);

export const getTextColor = (a, b = 0) => {
  if (a < b) return 'text-danger';
  if (a > b) return 'text-success';
  else return 'text-warning';
};