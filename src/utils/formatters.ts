/**
 * String & Number formatters for Indonesian Locale
 */

export const formatCurrency = (amount: number): string => {
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatCompactPrice = (amount: number): string => {
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `Rp ${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}rb`;
  }
  return formatCurrency(amount);
};

export const formatDistance = (distanceKm: number): string => {
  return `${distanceKm.toFixed(1)} km`;
};

export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
};
