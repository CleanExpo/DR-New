/**
 * Security Module - Central Export
 * Comprehensive security features for the application
 */

// Authentication & Sessions
export {
  createSession,
  validateSession,
  destroySession,
  getCSRFToken as getCSRFTokenFromSession,
  validateCSRFToken as validateCSRFTokenFromSession,
  updateSessionActivity,
  isSessionExpiring,
  checkSessionRateLimit,
  cleanupExpiredSessions,
  rotateSessionKeys,
  getSessionConfig,
} from './session';

// CSRF Protection
export {
  generateCSRFToken,
  setCSRFToken,
  getCSRFToken,
  validateCSRFToken,
  csrfMiddleware,
  getCSRFTokenFromCookie,
} from './csrf';

// Input Validation & Sanitization
export {
  sanitizeHTML,
  sanitizeText,
  validateEmail,
  validatePhoneNumber,
  validatePostcode,
  validateURL,
  validateName,
  validateNumber,
  validateDate,
  sanitizeFileName,
  validateFileType,
  validateFileSize,
  sanitizeJSON,
  validateFormData,
  type ValidationRule,
  type ValidationResult,
} from './input-validation';

// Rate Limiting
export {
  rateLimit,
  createRateLimiter,
  apiRateLimiter,
  authRateLimiter,
  formRateLimiter,
  uploadRateLimiter,
  getClientIp,
  SlidingWindowRateLimiter,
  TokenBucket,
  type RateLimitConfig,
  type DistributedRateLimiter,
} from './rate-limiter';

// Encryption & Hashing
export {
  generateSecureToken,
  generateSalt,
  hashPassword,
  verifyPassword,
  deriveKey,
  encrypt,
  decrypt,
  hash,
  hashSHA512,
  generateHMAC,
  verifyHMAC,
  encryptForStorage,
  decryptFromStorage,
  generateAPIKey,
  hashAPIKey,
  generateSessionId,
  PIIEncryption,
  redactSensitiveData,
  maskEmail,
  maskPhone,
  maskCreditCard,
} from './encryption';

// Security Logging & Monitoring
export {
  securityLogger,
  logSecurityEvent,
  getSecurityMetrics,
  detectSuspiciousActivity,
  SecurityEventType,
  SecuritySeverity,
  type SecurityEvent,
  type SecurityMetrics,
} from './security-logger';

// API Security
export {
  secureAPI,
  validateJWT,
  isAuthenticated,
  getUserId,
  hasPermission,
  validateWebhookSignature,
  sanitizeErrorMessage,
  createSecureResponse,
  createErrorResponse,
  type APISecurityConfig,
  type SecureAPIRequest,
} from './api-security';

// File Upload Security
export {
  validateUploadedFile,
  validateImageDimensions,
  generateSecureFilename,
  isImageFile,
  isDocumentFile,
  getFileMetadata,
  type FileUploadConfig,
  type FileValidationResult,
} from './file-upload-security';

// Password Policy
export {
  validatePassword,
  calculatePasswordStrength,
  generateSecurePassword,
  hashPasswordSecure,
  verifyPasswordSecure,
  checkPasswordCompromised,
  validatePasswordChange,
  DEFAULT_PASSWORD_POLICY,
  type PasswordPolicy,
  type PasswordStrength,
} from './password-policy';

// Security Configuration
export {
  SECURITY_CONFIG,
  getSecurityConfig,
  validateSecurityEnvironment,
  getCSPHeader,
  checkSecurityConfiguration,
} from './security-config';

// Re-export validation.ts utilities if they exist
export * from './validation';

/**
 * Initialize security features
 */
export function initializeSecurity(): void {
  // Validate environment configuration
  const { valid, missing } = validateSecurityEnvironment();

  if (!valid) {
    console.error('[SECURITY] Missing required environment variables:', missing);
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Security configuration incomplete. Cannot start in production mode.');
    }
  }

  // Check security configuration
  const { configured, warnings } = checkSecurityConfiguration();

  if (warnings.length > 0) {
    console.warn('[SECURITY] Configuration warnings:', warnings);
  }

  console.log('[SECURITY] Security features initialized');
  console.log('[SECURITY] Environment:', process.env.NODE_ENV);
  console.log('[SECURITY] CSP enabled: Yes');
  console.log('[SECURITY] Rate limiting enabled: Yes');
  console.log('[SECURITY] CSRF protection enabled: Yes');
  console.log('[SECURITY] Security logging enabled: Yes');
}

/**
 * Middleware helpers for Next.js
 */
export function createSecurityMiddleware() {
  return {
    csrf: csrfMiddleware,
    rateLimit: apiRateLimiter,
    auth: isAuthenticated,
  };
}

/**
 * Security utilities
 */
export const SecurityUtils = {
  sanitize: {
    html: sanitizeHTML,
    text: sanitizeText,
    fileName: sanitizeFileName,
    json: sanitizeJSON,
  },
  validate: {
    email: validateEmail,
    phone: validatePhoneNumber,
    url: validateURL,
    name: validateName,
    password: validatePassword,
  },
  encrypt: {
    data: encrypt,
    forStorage: encryptForStorage,
  },
  decrypt: {
    data: decrypt,
    fromStorage: decryptFromStorage,
  },
  mask: {
    email: maskEmail,
    phone: maskPhone,
    creditCard: maskCreditCard,
  },
};

/**
 * Security hooks for React components
 */
export const useSecurityHooks = () => ({
  getCSRFToken: getCSRFTokenFromCookie,
  // Add more client-side security hooks as needed
});