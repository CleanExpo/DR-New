// Utility functions for formatting data

export function formatPhoneNumber(phone: string): string {
  // Format Australian phone numbers
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('1300') || cleaned.startsWith('1800')) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  if (cleaned.startsWith('04')) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2 $3');
  }

  return phone;
}

export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {return 'Today';}
    if (days === 1) {return 'Yesterday';}
    if (days < 7) {return `${days} days ago`;}
    if (days < 30) {return `${Math.floor(days / 7)} weeks ago`;}
    if (days < 365) {return `${Math.floor(days / 30)} months ago`;}
    return `${Math.floor(days / 365)} years ago`;
  }

  const options: Intl.DateTimeFormatOptions = format === 'long'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };

  return dateObj.toLocaleDateString('en-AU', options);
}

export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPostcode(postcode: string | number): string {
  return String(postcode).padStart(4, '0');
}

export function truncate(text: string, length: number = 100, suffix: string = '...'): string {
  if (text.length <= length) {return text;}
  return text.substring(0, length - suffix.length) + suffix;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) {return singular;}
  return plural || `${singular}s`;
}
