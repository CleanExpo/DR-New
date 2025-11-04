/**
 * Format currency in Australian dollars
 * @param amount - Amount in dollars
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date in Australian format
 * @param date - Date to format
 * @returns Formatted date string (DD/MM/YYYY)
 */
export function formatAustralianDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Calculate GST (10% in Australia)
 * @param amount - Base amount
 * @returns GST amount
 */
export function calculateGST(amount: number): number {
  return amount * 0.1;
}

/**
 * Calculate total with GST
 * @param subtotal - Subtotal before GST
 * @returns Total including GST
 */
export function calculateTotalWithGST(subtotal: number): number {
  return subtotal + calculateGST(subtotal);
}
