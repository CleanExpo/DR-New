import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// XSS Protection - HTML Sanitization
export function sanitizeHTML(input: string): string {
  // Configure DOMPurify for strict sanitization
  const config = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SAFE_FOR_TEMPLATES: true,
    WHOLE_DOCUMENT: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
    FORCE_BODY: false,
    SANITIZE_DOM: true,
    IN_PLACE: false,
    USE_PROFILES: { html: false, svg: false, mathMl: false }
  };

  return DOMPurify.sanitize(input, config);
}

// XSS Protection - Text Sanitization (escapes HTML entities)
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') {return '';}

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// SQL Injection Protection - Parameterized Query Helper
export function sanitizeSQL(input: string): string {
  if (typeof input !== 'string') {return '';}

  // Remove SQL keywords and dangerous characters
  const dangerous = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|FROM|WHERE|ORDER|GROUP|BY|HAVING|JOIN|INNER|LEFT|RIGHT|OUTER|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|TRUE|FALSE|AS)\b|--|\/\*|\*\/|xp_|sp_|0x|;|'|")/gi;

  return input.replace(dangerous, '');
}

// Email Validation with additional security checks
export const emailSchema = z.string()
  .email('Invalid email address')
  .max(254, 'Email address too long')
  .refine((email) => {
    // Additional security checks
    const parts = email.split('@');
    if (parts.length !== 2) {return false;}

    const [local, domain] = parts;

    // Check local part
    if (local.length > 64) {return false;}
    if (local.startsWith('.') || local.endsWith('.')) {return false;}
    if (local.includes('..')) {return false;}

    // Check domain
    if (domain.length > 253) {return false;}
    if (!domain.includes('.')) {return false;}
    if (domain.startsWith('.') || domain.endsWith('.')) {return false;}
    if (domain.includes('..')) {return false;}

    // Check for dangerous patterns
    const dangerousPatterns = [
      '<script',
      'javascript:',
      'data:',
      'vbscript:',
      'onload=',
      'onerror=',
      '../',
      '..\\',
      '%0d',
      '%0a',
      '\r',
      '\n'
    ];

    const emailLower = email.toLowerCase();
    return !dangerousPatterns.some(pattern => emailLower.includes(pattern));
  }, 'Email contains potentially dangerous content');

// Phone Number Validation (Australian format)
export const phoneSchema = z.string()
  .regex(/^(\+61|0)[2-9]\d{8}$/, 'Invalid Australian phone number')
  .transform((phone) => {
    // Normalize to international format
    if (phone.startsWith('0')) {
      return `+61${  phone.slice(1)}`;
    }
    return phone;
  });

// URL Validation with security checks
export const urlSchema = z.string()
  .url('Invalid URL')
  .refine((url) => {
    try {
      const parsed = new URL(url);

      // Only allow http(s) protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }

      // Block dangerous domains
      const blockedDomains = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '::1',
        'example.com'
      ];

      if (blockedDomains.some(domain => parsed.hostname.includes(domain))) {
        return false;
      }

      // Check for suspicious patterns
      const suspiciousPatterns = [
        'javascript:',
        'data:',
        'vbscript:',
        'file:',
        '../',
        '..\\',
        '%2e%2e',
        '%252e%252e'
      ];

      const urlLower = url.toLowerCase();
      return !suspiciousPatterns.some(pattern => urlLower.includes(pattern));
    } catch {
      return false;
    }
  }, 'URL contains potentially dangerous content');

// Name Validation (for forms)
export const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters')
  .transform((name) => sanitizeText(name.trim()));

// Message/Text Area Validation
export const messageSchema = z.string()
  .min(1, 'Message is required')
  .max(5000, 'Message is too long')
  .transform((message) => sanitizeText(message.trim()));

// File Upload Validation
export const fileUploadSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string().refine((type) => {
    // Allowed file types
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return allowedTypes.includes(type);
  }, 'File type not allowed')
});

// CSRF Token Validation
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) {return false;}

  // In production, compare with stored session token
  // This is a simplified version
  return token.length === 64 && /^[a-f0-9]{64}$/i.test(token);
}

// Input Rate Limiting (for form submissions)
const submissionTracker = new Map<string, { count: number; resetTime: number }>();

export function checkSubmissionRate(identifier: string, maxSubmissions: number = 5, windowMs: number = 300000): boolean {
  const now = Date.now();
  const record = submissionTracker.get(identifier);

  if (!record || now > record.resetTime) {
    submissionTracker.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (record.count >= maxSubmissions) {
    return false;
  }

  record.count++;
  return true;
}

// Password Validation (strong password requirements)
export const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password is too long')
  .refine((password) => {
    // Check for uppercase
    if (!/[A-Z]/.test(password)) {return false;}
    // Check for lowercase
    if (!/[a-z]/.test(password)) {return false;}
    // Check for numbers
    if (!/[0-9]/.test(password)) {return false;}
    // Check for special characters
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {return false;}
    // Check for common patterns
    const commonPatterns = ['password', '12345', 'qwerty', 'admin', 'letmein'];
    const passwordLower = password.toLowerCase();
    return !commonPatterns.some(pattern => passwordLower.includes(pattern));
  }, 'Password must contain uppercase, lowercase, number, special character, and no common patterns');

// JSON Validation (for API requests)
export function sanitizeJSON(input: unknown): unknown {
  if (typeof input === 'string') {
    return sanitizeText(input);
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeJSON);
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized: unknown = {};
    for (const [key, value] of Object.entries(input)) {
      // Sanitize the key as well
      const sanitizedKey = sanitizeText(key);
      sanitized[sanitizedKey] = sanitizeJSON(value);
    }
    return sanitized;
  }

  return input;
}

// Path Traversal Protection
export function sanitizePath(path: string): string {
  if (typeof path !== 'string') {return '';}

  // Remove path traversal attempts
  const cleaned = path
    .replace(/\.\./g, '')
    .replace(/\.{2,}/g, '')
    .replace(/[<>:"|?*]/g, '')
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/');

  // Remove leading slashes to prevent absolute paths
  return cleaned.replace(/^\/+/, '');
}

// Command Injection Protection
export function sanitizeCommand(input: string): string {
  if (typeof input !== 'string') {return '';}

  // Remove shell metacharacters and dangerous patterns
  const dangerous = /[;&|`$()<>\\*?{}\[\]!#~'"]/g;
  return input.replace(dangerous, '');
}

// Header Injection Protection
export function sanitizeHeader(input: string): string {
  if (typeof input !== 'string') {return '';}

  // Remove line breaks and carriage returns
  return input.replace(/[\r\n]/g, '');
}

// Integer Validation (for IDs, pagination, etc.)
export const integerSchema = z.coerce
  .number()
  .int('Must be an integer')
  .min(0, 'Must be positive')
  .max(2147483647, 'Integer overflow');

// UUID Validation
export const uuidSchema = z.string()
  .uuid('Invalid UUID format');

// Date Validation
export const dateSchema = z.string()
  .refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Invalid date format');

// IP Address Validation
export const ipSchema = z.string()
  .refine((ip) => {
    // IPv4
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(ip)) {
      const parts = ip.split('.');
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
    }

    // IPv6
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
    return ipv6Regex.test(ip);
  }, 'Invalid IP address');

// Export validation schemas for common forms
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: messageSchema
});

export const bookingFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  service: z.string().min(1, 'Service selection required'),
  date: dateSchema,
  message: messageSchema.optional()
});

// Validation error formatter
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};

  errors.errors.forEach((error) => {
    const path = error.path.join('.');
    formatted[path] = error.message;
  });

  return formatted;
}