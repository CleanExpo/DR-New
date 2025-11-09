/**
 * API Configuration
 * Central configuration for API behavior, limits, and settings
 */

export const API_VERSION = 'v1';
export const API_BASE_PATH = '/api/v1';

// Rate Limiting Configuration
export const RATE_LIMITS = {
  // Emergency endpoints - higher limits
  emergency: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 requests per hour per IP
    message: 'Too many emergency requests. Please call 1300 309 361 for immediate assistance.',
  },

  // Contact/Quote endpoints - moderate limits
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 submissions per hour per IP
    message: 'Too many requests. Please try again later or call 1300 309 361.',
  },

  // General API endpoints - standard limits
  general: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: 'Too many requests. Please try again later.',
  },

  // Public data endpoints - higher limits
  public: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // 300 requests per 15 minutes
    message: 'Rate limit exceeded. Please slow down.',
  },
};

// Cache Configuration
export const CACHE_DURATION = {
  // Static content - long cache
  services: 24 * 60 * 60, // 24 hours
  locations: 24 * 60 * 60, // 24 hours

  // Semi-static content - medium cache
  serviceAreas: 12 * 60 * 60, // 12 hours

  // Dynamic content - short cache
  availability: 5 * 60, // 5 minutes

  // No cache for submissions
  submissions: 0,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    maxLength: 255,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    minLength: 8,
    maxLength: 15,
    // Australian phone number formats
    pattern: /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
  },
  message: {
    minLength: 10,
    maxLength: 2000,
  },
  postcode: {
    pattern: /^[0-9]{4}$/,
  },
};

// Response Messages
export const RESPONSE_MESSAGES = {
  success: {
    emergency: 'Emergency request received. Our team will contact you within 60 minutes.',
    quote: 'Quote request received. We will contact you within 24 hours.',
    contact: 'Message received. We will respond within 24 hours.',
  },
  error: {
    validation: 'Please check your input and try again.',
    rateLimit: 'Too many requests. Please try again later.',
    server: 'An error occurred. Please try again or call 1300 309 361.',
    notFound: 'Resource not found.',
    methodNotAllowed: 'Method not allowed.',
  },
};

// Security Headers
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

// CORS Configuration
export const CORS_CONFIG = {
  origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// API Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INVALID_REQUEST: 'INVALID_REQUEST',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

// Monitoring & Logging
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const;

// Request Size Limits
export const REQUEST_LIMITS = {
  bodySize: '10mb',
  fieldSize: '1mb',
  fields: 50,
  files: 10,
  fileSize: 10 * 1024 * 1024, // 10MB
};

// API Documentation
export const API_DOCS = {
  title: 'Disaster Recovery Brisbane API',
  version: '1.0.0',
  description: 'API for emergency disaster recovery services in Brisbane, Ipswich, and Logan',
  contact: {
    name: 'Disaster Recovery Brisbane',
    phone: '1300 309 361',
    email: 'support@disasterrecoverybrisbane.com.au',
  },
};
