export function formatPrice(value) {
  if (typeof value !== 'number') return null;
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
}
