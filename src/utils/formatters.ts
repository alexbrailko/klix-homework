export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleString('lv-LV', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', ' ');
};

export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    // Fallback format
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  }
};
