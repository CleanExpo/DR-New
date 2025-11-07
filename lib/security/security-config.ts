/**
 * Security Configuration
 * Centralized security settings for the application
 */

export const SECURITY_CONFIG = {
  // Authentication
  auth: {
    sessionMaxAge: 24 * 60 * 60, // 24 hours in seconds
    sessionRefreshThreshold: 60 * 60, // 1 hour in seconds
    sessionCookieName: '__Secure-session',
    maxLoginAttempts: 5,
    loginAttemptWindow: 15 * 60 * 1000, // 15 minutes in ms
    passwordMinLength: 12,
    passwordMaxLength: 128,
    requireMFA: false, // Can be enabled for high-security environments
    mfaCodeExpiry: 5 * 60 * 1000, // 5 minutes
  },

  // Rate Limiting
  rateLimit: {
    api: {
      windowMs: 60 * 1000, // 1 minute
      max: 100, // 100 requests per minute
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // 5 attempts per 15 minutes
    },
    forms: {
      windowMs: 60 * 1000, // 1 minute
      max: 10, // 10 submissions per minute
    },
    uploads: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 20, // 20 uploads per hour
    },
  },

  // File Uploads
  fileUpload: {
    maxSizeInMB: 10,
    allowedImageTypes: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    allowedDocumentTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
    scanForMalware: true,
    requireAuthentication: true,
  },

  // CORS
  cors: {
    allowedOrigins: [
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'https://dr-new-ten.vercel.app',
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With'],
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },

  // Content Security Policy
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Required for Next.js in dev mode
        "'unsafe-eval'", // Required for Next.js in dev mode
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://maps.googleapis.com',
        'https://www.google.com/recaptcha/',
        'https://www.gstatic.com/recaptcha/',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Required for styled-components and inline styles
        'https://fonts.googleapis.com',
      ],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https:',
        'http:', // For external images
      ],
      'font-src': [
        "'self'",
        'data:',
        'https://fonts.gstatic.com',
      ],
      'connect-src': [
        "'self'",
        'https://www.google-analytics.com',
        'https://analytics.google.com',
        'https://maps.googleapis.com',
        'wss:',
        'ws:',
      ],
      'media-src': ["'self'"],
      'object-src': ["'none'"],
      'frame-src': [
        "'self'",
        'https://www.google.com/recaptcha/',
        'https://recaptcha.google.com',
        'https://maps.google.com',
      ],
      'frame-ancestors': ["'self'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'upgrade-insecure-requests': [],
      'block-all-mixed-content': [],
    },
  },

  // Security Headers
  headers: {
    'X-XSS-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'X-DNS-Prefetch-Control': 'on',
    'X-Download-Options': 'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none',
  },

  // API Security
  api: {
    requireAPIKey: false, // Set to true for production API
    keyPrefix: 'dr_',
    keyLength: 32,
  },

  // Encryption
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    saltLength: 32,
    authTagLength: 16,
  },

  // Security Monitoring
  monitoring: {
    enableLogging: true,
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    alertThresholds: {
      failedLogins: 5,
      rateLimitExceeded: 10,
      suspiciousActivities: 3,
    },
    externalLoggingEndpoint: process.env.SECURITY_LOGGING_ENDPOINT,
  },

  // Session Security
  session: {
    enableFingerprinting: true,
    checkIPAddress: true,
    rotateOnLogin: true,
    absoluteTimeout: 24 * 60 * 60 * 1000, // 24 hours
    idleTimeout: 30 * 60 * 1000, // 30 minutes
  },

  // CSRF Protection
  csrf: {
    enabled: true,
    cookieName: 'csrf-token',
    headerName: 'X-CSRF-Token',
    tokenLength: 32,
  },

  // Password Policy
  password: {
    minLength: 12,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    minSpecialChars: 1,
    minNumbers: 1,
    preventCommonPasswords: true,
    preventUserInfoInPassword: true,
    passwordHistory: 5,
    maxAge: 90, // days
    checkHIBP: true, // Check against Have I Been Pwned
  },

  // Input Validation
  validation: {
    maxInputLength: 10000, // Maximum characters for text input
    maxFileNameLength: 255,
    sanitizeHTML: true,
    stripTags: true,
    preventSQLInjection: true,
    preventXSS: true,
  },
};

/**
 * Get environment-specific security configuration
 */
export function getSecurityConfig() {
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';

  return {
    ...SECURITY_CONFIG,
    // Adjust settings for development
    ...(isDev && {
      auth: {
        ...SECURITY_CONFIG.auth,
        maxLoginAttempts: 100, // More lenient in dev
      },
      rateLimit: {
        api: { windowMs: 60 * 1000, max: 1000 },
        auth: { windowMs: 15 * 60 * 1000, max: 100 },
        forms: { windowMs: 60 * 1000, max: 100 },
        uploads: { windowMs: 60 * 60 * 1000, max: 100 },
      },
    }),
  };
}

/**
 * Validate required environment variables for security
 */
export function validateSecurityEnvironment(): { valid: boolean; missing: string[] } {
  const required = [
    'SESSION_SECRET',
    'NEXTAUTH_SECRET',
  ];

  const recommended = [
    'PII_ENCRYPTION_KEY',
    'API_KEYS',
  ];

  const missing: string[] = [];

  for (const envVar of required) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.warn('[SECURITY] Missing required environment variables:', missing);
  }

  // Check recommended variables
  for (const envVar of recommended) {
    if (!process.env[envVar]) {
      console.warn(`[SECURITY] Recommended environment variable not set: ${envVar}`);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get CSP header value
 */
export function getCSPHeader(): string {
  const directives = SECURITY_CONFIG.csp.directives;
  const parts: string[] = [];

  for (const [key, value] of Object.entries(directives)) {
    if (Array.isArray(value) && value.length > 0) {
      parts.push(`${key} ${value.join(' ')}`);
    } else if (Array.isArray(value) && value.length === 0) {
      parts.push(key);
    }
  }

  return parts.join('; ');
}

/**
 * Check if security features are properly configured
 */
export function checkSecurityConfiguration(): {
  configured: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Check session secret
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    warnings.push('SESSION_SECRET should be at least 32 characters long');
  }

  // Check if in production without HTTPS
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://')) {
    warnings.push('Production environment should use HTTPS');
  }

  // Check if CSP is properly configured
  if (SECURITY_CONFIG.csp.directives['script-src'].includes("'unsafe-inline'") && process.env.NODE_ENV === 'production') {
    warnings.push("Consider removing 'unsafe-inline' from script-src in production");
  }

  return {
    configured: warnings.length === 0,
    warnings,
  };
}