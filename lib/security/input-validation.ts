import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

/**
 * Comprehensive Input Validation and Sanitization
 * Protects against XSS, SQL Injection, and other injection attacks
 */

// Email validation pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation patterns for Australian numbers
const AU_PHONE_REGEX = /^(\+61|0)[2-478]([0-9]{8})$/;
const AU_MOBILE_REGEX = /^(\+61|0)4([0-9]{8})$/;

// Postcode validation for Australian postcodes
const AU_POSTCODE_REGEX = /^[0-9]{4}$/;

// URL validation
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Sanitize HTML content to prevent XSS
 */
export function sanitizeHTML(input: string, options?: any): string {
  const defaultOptions = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    SAFE_FOR_TEMPLATES: true,
  };

  const config = { ...defaultOptions, ...options };
  return DOMPurify.sanitize(input, config);
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Remove potential script injections
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove SQL injection attempts
  sanitized = sanitized.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|CREATE|ALTER|EXEC|EXECUTE|SCRIPT|JAVASCRIPT|ALERT|PROMPT|CONFIRM)\b)/gi, '');

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Escape special characters
  return validator.escape(sanitized);
}

/**
 * Validate and sanitize email
 */
export function validateEmail(email: string): { valid: boolean; sanitized: string } {
  const trimmed = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, sanitized: '' };
  }

  if (!validator.isEmail(trimmed)) {
    return { valid: false, sanitized: '' };
  }

  return { valid: true, sanitized: validator.normalizeEmail(trimmed) || trimmed };
}

/**
 * Validate and sanitize Australian phone number
 */
export function validatePhoneNumber(phone: string): { valid: boolean; sanitized: string } {
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  if (!AU_PHONE_REGEX.test(cleaned) && !AU_MOBILE_REGEX.test(cleaned)) {
    return { valid: false, sanitized: '' };
  }

  // Normalize to international format
  let sanitized = cleaned;
  if (sanitized.startsWith('0')) {
    sanitized = '+61' + sanitized.substring(1);
  }

  return { valid: true, sanitized };
}

/**
 * Validate Australian postcode
 */
export function validatePostcode(postcode: string): boolean {
  return AU_POSTCODE_REGEX.test(postcode.trim());
}

/**
 * Validate and sanitize URL
 */
export function validateURL(url: string): { valid: boolean; sanitized: string } {
  const trimmed = url.trim();

  if (!URL_REGEX.test(trimmed)) {
    return { valid: false, sanitized: '' };
  }

  if (!validator.isURL(trimmed, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    require_port: false,
    allow_protocol_relative_urls: false,
  })) {
    return { valid: false, sanitized: '' };
  }

  return { valid: true, sanitized: trimmed };
}

/**
 * Validate and sanitize name fields
 */
export function validateName(name: string, minLength = 2, maxLength = 50): { valid: boolean; sanitized: string } {
  const trimmed = name.trim();

  if (trimmed.length < minLength || trimmed.length > maxLength) {
    return { valid: false, sanitized: '' };
  }

  // Allow only letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { valid: false, sanitized: '' };
  }

  // Sanitize
  const sanitized = sanitizeText(trimmed);
  return { valid: true, sanitized };
}

/**
 * Validate numeric input
 */
export function validateNumber(input: string, min?: number, max?: number): { valid: boolean; value: number | null } {
  const num = parseFloat(input);

  if (isNaN(num)) {
    return { valid: false, value: null };
  }

  if (min !== undefined && num < min) {
    return { valid: false, value: null };
  }

  if (max !== undefined && num > max) {
    return { valid: false, value: null };
  }

  return { valid: true, value: num };
}

/**
 * Validate date input
 */
export function validateDate(date: string): { valid: boolean; sanitized: string } {
  if (!validator.isISO8601(date)) {
    return { valid: false, sanitized: '' };
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, sanitized: '' };
  }

  return { valid: true, sanitized: dateObj.toISOString() };
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  // Remove path traversal attempts
  let sanitized = fileName.replace(/\.\./g, '');
  sanitized = sanitized.replace(/[\/\\]/g, '');

  // Remove special characters except dot, dash, and underscore
  sanitized = sanitized.replace(/[^a-zA-Z0-9\.\-_]/g, '_');

  // Ensure it doesn't start with a dot (hidden file)
  if (sanitized.startsWith('.')) {
    sanitized = '_' + sanitized.substring(1);
  }

  return sanitized;
}

/**
 * Validate file type
 */
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) return false;

  return allowedTypes.includes(extension);
}

/**
 * Validate file size
 */
export function validateFileSize(sizeInBytes: number, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
}

/**
 * Sanitize JSON input
 */
export function sanitizeJSON(input: string): { valid: boolean; data: any } {
  try {
    const parsed = JSON.parse(input);

    // Recursively sanitize string values
    const sanitized = sanitizeObject(parsed);

    return { valid: true, data: sanitized };
  } catch (error) {
    return { valid: false, data: null };
  }
}

/**
 * Recursively sanitize object values
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeText(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize the key as well
      const sanitizedKey = sanitizeText(key);
      sanitized[sanitizedKey] = sanitizeObject(value);
    }
    return sanitized;
  }

  return obj;
}

/**
 * Validate form data object
 */
export interface ValidationRule {
  type: 'email' | 'phone' | 'name' | 'text' | 'number' | 'date' | 'url' | 'postcode';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  sanitize?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized: Record<string, any>;
}

export function validateFormData(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};
  const sanitized: Record<string, any> = {};
  let valid = true;

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Check required fields
    if (rule.required && (!value || value === '')) {
      errors[field] = `${field} is required`;
      valid = false;
      continue;
    }

    // Skip validation if not required and empty
    if (!rule.required && (!value || value === '')) {
      continue;
    }

    // Validate based on type
    switch (rule.type) {
      case 'email': {
        const result = validateEmail(value);
        if (!result.valid) {
          errors[field] = 'Invalid email address';
          valid = false;
        } else {
          sanitized[field] = result.sanitized;
        }
        break;
      }

      case 'phone': {
        const result = validatePhoneNumber(value);
        if (!result.valid) {
          errors[field] = 'Invalid phone number';
          valid = false;
        } else {
          sanitized[field] = result.sanitized;
        }
        break;
      }

      case 'name': {
        const result = validateName(value, rule.minLength, rule.maxLength);
        if (!result.valid) {
          errors[field] = 'Invalid name';
          valid = false;
        } else {
          sanitized[field] = result.sanitized;
        }
        break;
      }

      case 'text': {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = `Minimum length is ${rule.minLength}`;
          valid = false;
        } else if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = `Maximum length is ${rule.maxLength}`;
          valid = false;
        } else {
          sanitized[field] = rule.sanitize ? sanitizeText(value) : value;
        }
        break;
      }

      case 'number': {
        const result = validateNumber(value, rule.min, rule.max);
        if (!result.valid) {
          errors[field] = 'Invalid number';
          valid = false;
        } else {
          sanitized[field] = result.value;
        }
        break;
      }

      case 'date': {
        const result = validateDate(value);
        if (!result.valid) {
          errors[field] = 'Invalid date';
          valid = false;
        } else {
          sanitized[field] = result.sanitized;
        }
        break;
      }

      case 'url': {
        const result = validateURL(value);
        if (!result.valid) {
          errors[field] = 'Invalid URL';
          valid = false;
        } else {
          sanitized[field] = result.sanitized;
        }
        break;
      }

      case 'postcode': {
        if (!validatePostcode(value)) {
          errors[field] = 'Invalid postcode';
          valid = false;
        } else {
          sanitized[field] = value.trim();
        }
        break;
      }
    }
  }

  return { valid, errors, sanitized };
}