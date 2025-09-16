/**
 * Security utilities for input validation, sanitization, and protection
 * Implements defense-in-depth strategy for DR-New disaster recovery services
 */

import crypto from 'crypto';

// Input validation patterns
const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  phone: /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/, // Australian phone numbers
  postcode: /^[0-9]{4}$/, // Australian postcodes
  name: /^[a-zA-Z\s\-']{1,100}$/,
  alphanumeric: /^[a-zA-Z0-9\s]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

// XSS prevention - HTML entity encoding
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  return String(input)
    .replace(/[&<>"'`=\/]/g, (char) => HTML_ENTITIES[char] || char)
    .trim()
    .slice(0, 10000); // Maximum input length
}

/**
 * Validate email address
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  const sanitized = sanitizeInput(email.toLowerCase().trim());

  if (!VALIDATION_PATTERNS.email.test(sanitized)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (sanitized.length > 254) {
    return { valid: false, error: 'Email address too long' };
  }

  return { valid: true };
}

/**
 * Validate Australian phone number
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) {
    return { valid: false, error: 'Phone number is required' };
  }

  const cleaned = phone.replace(/\s|-|\(|\)/g, '');

  if (!VALIDATION_PATTERNS.phone.test(cleaned)) {
    return { valid: false, error: 'Invalid Australian phone number' };
  }

  return { valid: true };
}

/**
 * Validate name (first/last)
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name) {
    return { valid: false, error: 'Name is required' };
  }

  const sanitized = sanitizeInput(name.trim());

  if (sanitized.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (!VALIDATION_PATTERNS.name.test(sanitized)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }

  return { valid: true };
}

/**
 * Validate postcode (Australian)
 */
export function validatePostcode(postcode: string): { valid: boolean; error?: string } {
  if (!postcode) {
    return { valid: false, error: 'Postcode is required' };
  }

  if (!VALIDATION_PATTERNS.postcode.test(postcode)) {
    return { valid: false, error: 'Invalid Australian postcode' };
  }

  return { valid: true };
}

/**
 * Validate and sanitize message/description fields
 */
export function validateMessage(message: string, minLength = 10, maxLength = 5000): { valid: boolean; error?: string } {
  if (!message) {
    return { valid: false, error: 'Message is required' };
  }

  const sanitized = sanitizeInput(message.trim());

  if (sanitized.length < minLength) {
    return { valid: false, error: `Message must be at least ${minLength} characters` };
  }

  if (sanitized.length > maxLength) {
    return { valid: false, error: `Message must not exceed ${maxLength} characters` };
  }

  // Check for potential SQL injection patterns
  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|SCRIPT)\b)/i;
  if (sqlPatterns.test(sanitized)) {
    return { valid: false, error: 'Message contains invalid content' };
  }

  return { valid: true };
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;

  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(sessionToken)
    );
  } catch {
    return false;
  }
}

/**
 * Hash sensitive data (for storage)
 */
export function hashData(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data + (process.env.HASH_SALT || 'default-salt'))
    .digest('hex');
}

/**
 * Encrypt sensitive data
 */
export function encryptData(data: string): { encrypted: string; iv: string } {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-must-be-32-characters', 'utf-8').slice(0, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    encrypted: encrypted + ':' + authTag.toString('hex'),
    iv: iv.toString('hex')
  };
}

/**
 * Decrypt sensitive data
 */
export function decryptData(encrypted: string, iv: string): string {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-must-be-32-characters', 'utf-8').slice(0, 32);

  const [encryptedData, authTag] = encrypted.split(':');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Rate limiting check
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const resetTime = now + windowMs;

  // Clean up old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(identifier);

  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (current.resetTime < now) {
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime };
  }

  current.count++;
  return { allowed: true, remaining: maxRequests - current.count, resetTime: current.resetTime };
}

/**
 * Validate file upload
 */
export function validateFileUpload(
  file: { name: string; size: number; type: string },
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
  } = options;

  // Check file size
  if (file.size > maxSize) {
    return { valid: false, error: `File size must not exceed ${maxSize / 1024 / 1024}MB` };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' };
  }

  // Check file extension
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return { valid: false, error: 'Invalid file extension' };
  }

  // Check for double extensions (potential attack)
  const doubleExtPattern = /\.\w+\.\w+$/;
  if (doubleExtPattern.test(file.name)) {
    return { valid: false, error: 'Invalid file name' };
  }

  return { valid: true };
}

/**
 * Security headers helper
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  };
}

/**
 * Log security events
 */
export function logSecurityEvent(
  type: 'AUTH_FAILURE' | 'VALIDATION_FAILURE' | 'RATE_LIMIT' | 'SUSPICIOUS_ACTIVITY' | 'CSRF_FAILURE',
  details: Record<string, any>
): void {
  const event = {
    timestamp: new Date().toISOString(),
    type,
    details,
    environment: process.env.NODE_ENV,
  };

  // In production, send to logging service
  // For now, console log with specific formatting
  console.error(`[SECURITY_EVENT] ${JSON.stringify(event)}`);

  // You would typically send this to a service like:
  // - Sentry
  // - LogRocket
  // - CloudWatch
  // - Custom logging endpoint
}

/**
 * Validate emergency request priority
 */
export function validateEmergencyRequest(data: {
  type: string;
  severity: string;
  location: string;
}): { valid: boolean; priority: 'HIGH' | 'MEDIUM' | 'LOW'; error?: string } {
  const emergencyTypes = ['flood', 'fire', 'storm', 'sewage', 'biohazard', 'mould'];
  const severityLevels = ['critical', 'high', 'medium', 'low'];

  if (!emergencyTypes.includes(data.type.toLowerCase())) {
    return { valid: false, priority: 'LOW', error: 'Invalid emergency type' };
  }

  if (!severityLevels.includes(data.severity.toLowerCase())) {
    return { valid: false, priority: 'LOW', error: 'Invalid severity level' };
  }

  // Determine priority based on type and severity
  let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';

  if (data.severity === 'critical' || data.type === 'sewage' || data.type === 'biohazard') {
    priority = 'HIGH';
  } else if (data.severity === 'high' || data.type === 'fire' || data.type === 'flood') {
    priority = 'MEDIUM';
  }

  return { valid: true, priority };
}

export default {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateName,
  validatePostcode,
  validateMessage,
  generateCsrfToken,
  verifyCsrfToken,
  hashData,
  encryptData,
  decryptData,
  checkRateLimit,
  validateFileUpload,
  getSecurityHeaders,
  logSecurityEvent,
  validateEmergencyRequest,
};