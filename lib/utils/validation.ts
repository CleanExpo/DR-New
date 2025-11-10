// Validation utility functions

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Australian phone number validation
  const cleaned = phone.replace(/\D/g, '');

  // Mobile: 04XX XXX XXX
  if (/^04\d{8}$/.test(cleaned)) {return true;}

  // Landline: (0X) XXXX XXXX
  if (/^0[2378]\d{8}$/.test(cleaned)) {return true;}

  // 1300/1800: 1X00 XXX XXX
  if (/^1[38]00\d{6}$/.test(cleaned)) {return true;}

  return false;
}

export function isValidPostcode(postcode: string | number): boolean {
  const code = String(postcode);
  return /^\d{4}$/.test(code);
}

export function isValidABN(abn: string): boolean {
  const cleaned = abn.replace(/\s/g, '');
  if (!/^\d{11}$/.test(cleaned)) {return false;}

  // ABN checksum validation
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let sum = 0;

  for (let i = 0; i < 11; i++) {
    const digit = parseInt(cleaned[i], 10);
    const weight = weights[i];
    sum += (i === 0 ? digit - 1 : digit) * weight;
  }

  return sum % 89 === 0;
}

export function validateRequired(value: string | number | null | undefined): boolean {
  if (value === null || value === undefined) {return false;}
  if (typeof value === 'string') {return value.trim().length > 0;}
  return true;
}

export function validateMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

export function validatePattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
