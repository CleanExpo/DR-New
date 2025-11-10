/**
 * Data Redaction Utilities (Edge Runtime Compatible)
 * Redacts sensitive information from logs and displays
 * No Node.js dependencies - works in Edge runtime
 */

/**
 * Redact sensitive information from logs
 */
export function redactSensitiveData(data: any): any {
  const sensitiveFields = [
    'password',
    'token',
    'apiKey',
    'secret',
    'creditCard',
    'ssn',
    'taxId',
    'bankAccount',
  ];

  if (typeof data === 'string') {
    // Redact email addresses
    let redacted = data.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
    // Redact phone numbers
    redacted = redacted.replace(/(\+61|0)[2-478]([0-9]{8})/g, '[PHONE]');
    return redacted;
  }

  if (Array.isArray(data)) {
    return data.map(item => redactSensitiveData(item));
  }

  if (data && typeof data === 'object') {
    const redacted: any = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveFields.some(field => lowerKey.includes(field));

      if (isSensitive) {
        redacted[key] = '[REDACTED]';
      } else {
        redacted[key] = redactSensitiveData(value);
      }
    }
    return redacted;
  }

  return data;
}

/**
 * Mask sensitive data for display
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) {return email;}

  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : local;

  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  // Show only last 4 digits
  if (phone.length <= 4) {return phone;}
  return '*'.repeat(phone.length - 4) + phone.slice(-4);
}

export function maskCreditCard(cardNumber: string): string {
  // Show only last 4 digits
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length <= 4) {return cleaned;}
  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
}
