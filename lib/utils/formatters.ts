/**
 * Utility formatters for data presentation
 */

/**
 * Format distance in kilometers to human-readable string
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  if (km < 10) {
    return `${km.toFixed(1)}km`;
  }
  return `${Math.round(km)}km`;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format response time in hours
 */
export function formatResponseTime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  if (hours === 1) {
    return '1 hour';
  }
  if (hours < 24) {
    return `${hours} hours`;
  }
  const days = Math.floor(hours / 24);
  if (days === 1) {
    return '1 day';
  }
  return `${days} days`;
}

/**
 * Format date to relative time
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (days < 7) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Format phone number for Australian format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('61')) {
    // International format
    const number = cleaned.substring(2);
    if (number.length === 9) {
      if (number.startsWith('4')) {
        // Mobile
        return `+61 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
      } else {
        // Landline
        return `+61 ${number.substring(0, 1)} ${number.substring(1, 5)} ${number.substring(5)}`;
      }
    }
  } else if (cleaned.startsWith('0')) {
    // Domestic format
    if (cleaned.length === 10) {
      if (cleaned.startsWith('04')) {
        // Mobile
        return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
      } else {
        // Landline
        return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 6)} ${cleaned.substring(6)}`;
      }
    }
  }

  return phone; // Return as-is if format not recognized
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format business hours
 */
export function formatBusinessHours(open: string, close: string): string {
  if (open === '00:00' && close === '23:59') {
    return '24/7';
  }
  return `${formatTime(open)} - ${formatTime(close)}`;
}

/**
 * Format time (HH:MM to readable format)
 */
function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format address
 */
export function formatAddress(address: {
  street?: string;
  suburb?: string;
  city?: string;
  state?: string;
  postcode?: string;
}): string {
  const parts = [];

  if (address.street) parts.push(address.street);
  if (address.suburb) parts.push(address.suburb);
  if (address.city && address.city !== address.suburb) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.postcode) parts.push(address.postcode);

  return parts.join(', ');
}

/**
 * Format rating with stars
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  const filled = '★'.repeat(Math.floor(rating));
  const empty = '☆'.repeat(maxRating - Math.floor(rating));
  return filled + empty;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format slug to title case
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format service category
 */
export function formatServiceCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'water-damage': 'Water Damage',
    'fire-damage': 'Fire Damage',
    'mould-remediation': 'Mould Remediation',
    'biohazard-cleaning': 'Biohazard Cleaning',
    'storm-damage': 'Storm Damage',
    'sewage-cleanup': 'Sewage Cleanup',
    'emergency-services': 'Emergency Services'
  };

  return categoryMap[category] || slugToTitle(category);
}

/**
 * Format certification name
 */
export function formatCertification(cert: string): string {
  const certMap: Record<string, string> = {
    'iicrc': 'IICRC Certified',
    'wrt': 'Water Damage Restoration Technician',
    'asd': 'Applied Structural Drying',
    'fsrt': 'Fire & Smoke Damage Restoration',
    'amrt': 'Applied Microbial Remediation',
    'hst': 'Health & Safety Technician'
  };

  return certMap[cert.toLowerCase()] || cert;
}