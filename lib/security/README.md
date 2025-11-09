# Security Module

Comprehensive security library for Disaster Recovery Brisbane website.

## Overview

This security module provides defense-in-depth protection against common web vulnerabilities and attacks. All security features are production-ready and battle-tested.

## Features

- ✅ XSS Protection (DOMPurify + pattern detection)
- ✅ CSRF Protection (double-submit cookies)
- ✅ SQL Injection Prevention (Prisma + detection)
- ✅ Rate Limiting (multiple algorithms)
- ✅ Input Validation (comprehensive validators)
- ✅ Session Security (theft detection + rotation)
- ✅ Security Logging (events + metrics)
- ✅ Encryption (AES-256-GCM)
- ✅ File Upload Security
- ✅ Password Security (bcrypt + policies)

## Quick Start

### Import Security Functions

```typescript
import {
  // Input Validation
  validateEmail,
  validatePhoneNumber,
  sanitizeHTML,
  sanitizeText,
  validateFormData,

  // CSRF Protection
  validateCSRFToken,
  getCSRFToken,

  // Rate Limiting
  apiRateLimiter,
  authRateLimiter,
  formRateLimiter,

  // Security Logging
  securityLogger,
  SecurityEventType,
  SecuritySeverity,

  // Encryption
  encrypt,
  decrypt,
  hashPassword,
  verifyPassword,
} from '@/lib/security';
```

### Validate User Input

```typescript
import { validateFormData } from '@/lib/security';

const rules = {
  email: { type: 'email', required: true },
  name: { type: 'name', required: true },
  phone: { type: 'phone', required: true },
  message: { type: 'text', required: true, minLength: 10 },
};

const { valid, errors, sanitized } = validateFormData(formData, rules);

if (!valid) {
  return { error: errors };
}

// Use sanitized data
await saveToDatabase(sanitized);
```

### Protect Against XSS

```typescript
import { sanitizeHTML, detectXSS } from '@/lib/security';

// Detect XSS attempts
const { suspicious, patterns } = detectXSS(userInput);
if (suspicious) {
  // Log and block
  securityLogger.log({
    type: SecurityEventType.XSS_ATTEMPT,
    severity: SecuritySeverity.HIGH,
    ipAddress: req.ip,
  });
  return { error: 'Invalid input' };
}

// Sanitize for safe display
const safeHTML = sanitizeHTML(userInput);
```

### Implement Rate Limiting

```typescript
import { apiRateLimiter } from '@/lib/security';

export async function POST(request: NextRequest) {
  // Check rate limit
  const { allowed, headers } = await apiRateLimiter(request);

  if (!allowed) {
    return new Response('Too Many Requests', {
      status: 429,
      headers,
    });
  }

  // Process request...
}
```

### Validate CSRF Tokens

```typescript
import { validateCSRFToken } from '@/lib/security';

export async function POST(request: NextRequest) {
  // Validate CSRF token
  const isValid = await validateCSRFToken(request);

  if (!isValid) {
    return new Response('Invalid CSRF token', { status: 403 });
  }

  // Process request...
}
```

### Log Security Events

```typescript
import { securityLogger, SecurityEventType, SecuritySeverity } from '@/lib/security';

// Log authentication attempt
securityLogger.log({
  type: SecurityEventType.LOGIN_FAILED,
  severity: SecuritySeverity.MEDIUM,
  ipAddress: request.ip,
  userId: attemptedUserId,
  success: false,
  details: { reason: 'Invalid password' },
});

// Get security metrics
const metrics = securityLogger.getMetrics();
console.log(`Total events: ${metrics.totalEvents}`);
console.log(`Failed logins: ${metrics.failedLogins}`);

// Detect suspicious activity
const { suspicious, reasons } = securityLogger.detectSuspiciousActivity(ipAddress);
if (suspicious) {
  // Alert security team
}
```

### Secure Session Management

```typescript
import { sessionSecurity } from '@/lib/security';

// Create session
const { sessionId, fingerprint } = sessionSecurity.createSession(
  userId,
  request.ip,
  request.headers.get('user-agent')
);

// Validate session
const validation = sessionSecurity.validateSession(
  sessionId,
  request.ip,
  request.headers.get('user-agent'),
  fingerprint
);

if (!validation.valid) {
  // Session invalid or stolen
  return redirectToLogin();
}

if (validation.shouldRotate) {
  // Rotate session ID
  const newSessionId = sessionSecurity.rotateSessionId(sessionId);
}
```

### Encrypt Sensitive Data

```typescript
import { encrypt, decrypt, hashPassword, verifyPassword } from '@/lib/security';

// Encrypt data
const encrypted = encrypt(sensitiveData, process.env.ENCRYPTION_KEY);
await db.save({ encryptedData: encrypted });

// Decrypt data
const decrypted = decrypt(encrypted, process.env.ENCRYPTION_KEY);

// Hash password
const hashedPassword = await hashPassword(plainPassword);
await db.user.create({ email, password: hashedPassword });

// Verify password
const isValid = await verifyPassword(plainPassword, hashedPassword);
```

## Module Structure

```
lib/security/
├── index.ts                      # Main exports
├── README.md                     # This file
├── csrf.ts                       # CSRF protection
├── rate-limiter.ts               # Rate limiting
├── input-validation.ts           # Input validation
├── xss-protection.ts             # XSS protection
├── sql-injection-prevention.ts   # SQL injection prevention
├── session-security.ts           # Session management
├── security-logger.ts            # Security logging
├── encryption.ts                 # Encryption utilities
├── password-policy.ts            # Password security
├── file-upload-security.ts       # File upload validation
├── api-security.ts               # API security helpers
├── security-config.ts            # Configuration
├── session.ts                    # Session utilities
└── validation.ts                 # Additional validators
```

## API Reference

### Input Validation

#### `validateEmail(email: string)`
Validates and sanitizes email addresses.

```typescript
const { valid, sanitized } = validateEmail('user@example.com');
```

#### `validatePhoneNumber(phone: string)`
Validates Australian phone numbers.

```typescript
const { valid, sanitized } = validatePhoneNumber('0412345678');
// Returns: { valid: true, sanitized: '+61412345678' }
```

#### `validateFormData(data, rules)`
Bulk validation of form data.

```typescript
const rules = {
  email: { type: 'email', required: true },
  name: { type: 'name', required: true, minLength: 2 },
};

const { valid, errors, sanitized } = validateFormData(formData, rules);
```

#### `sanitizeHTML(input: string)`
Sanitizes HTML using DOMPurify.

```typescript
const safe = sanitizeHTML('<script>alert("xss")</script><p>Safe text</p>');
// Returns: '<p>Safe text</p>'
```

#### `sanitizeText(input: string)`
Strips all HTML and dangerous characters.

```typescript
const safe = sanitizeText('User <script>input</script>');
// Returns: 'User input'
```

### CSRF Protection

#### `validateCSRFToken(request: NextRequest)`
Validates CSRF token from request.

```typescript
const isValid = await validateCSRFToken(request);
```

#### `getCSRFToken()`
Gets CSRF token from cookies (server-side).

```typescript
const token = await getCSRFToken();
```

### Rate Limiting

#### `apiRateLimiter(request: NextRequest)`
Rate limiter for API endpoints (100 req/min).

```typescript
const { allowed, headers, message } = await apiRateLimiter(request);
```

#### `authRateLimiter(request: NextRequest)`
Rate limiter for auth endpoints (5 req/15min).

```typescript
const { allowed } = await authRateLimiter(request);
```

#### `formRateLimiter(request: NextRequest)`
Rate limiter for forms (10 req/min).

```typescript
const { allowed } = await formRateLimiter(request);
```

### Security Logging

#### `securityLogger.log(event)`
Logs a security event.

```typescript
securityLogger.log({
  type: SecurityEventType.LOGIN_FAILED,
  severity: SecuritySeverity.MEDIUM,
  ipAddress: '1.2.3.4',
  userId: 'user123',
  success: false,
});
```

#### `securityLogger.getMetrics()`
Gets security metrics.

```typescript
const metrics = securityLogger.getMetrics();
// Returns: { totalEvents, eventsByType, failedLogins, ... }
```

#### `securityLogger.detectSuspiciousActivity(ipAddress)`
Detects suspicious activity for an IP.

```typescript
const { suspicious, reasons } = securityLogger.detectSuspiciousActivity('1.2.3.4');
```

### XSS Protection

#### `detectXSS(input: string)`
Detects XSS patterns.

```typescript
const { suspicious, patterns } = detectXSS('<script>alert(1)</script>');
```

#### `sanitizeSafeHTML(input: string)`
Sanitizes with safe HTML tags allowed.

```typescript
const safe = sanitizeSafeHTML('<p>Text</p><script>bad</script>');
```

### SQL Injection Prevention

#### `detectSQLInjection(input: string)`
Detects SQL injection patterns.

```typescript
const { suspicious, patterns } = detectSQLInjection("'; DROP TABLE users--");
```

#### `SafeQueryBuilder`
Build safe parameterized queries.

```typescript
const builder = new SafeQueryBuilder();
builder.where('email', '=', userEmail);
const { clause, parameters } = builder.buildWhere();
```

### Encryption

#### `encrypt(data: string, key: string)`
Encrypts data with AES-256-GCM.

```typescript
const encrypted = encrypt(sensitiveData, encryptionKey);
```

#### `decrypt(encrypted: string, key: string)`
Decrypts data.

```typescript
const decrypted = decrypt(encrypted, encryptionKey);
```

#### `hashPassword(password: string)`
Hashes password with bcrypt.

```typescript
const hash = await hashPassword(plainPassword);
```

#### `verifyPassword(password: string, hash: string)`
Verifies password against hash.

```typescript
const isValid = await verifyPassword(plainPassword, storedHash);
```

## Configuration

### Environment Variables

```bash
# Required
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key

# Optional (for encryption)
ENCRYPTION_KEY=your-encryption-key
ENCRYPTION_IV=your-iv

# Optional (for external logging)
SECURITY_LOGGING_ENDPOINT=https://your-siem.com/api/events
```

### Rate Limit Configuration

Customize rate limits:

```typescript
import { createRateLimiter } from '@/lib/security';

const customRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,  // 1 minute
  max: 50,               // 50 requests
  message: 'Custom rate limit message',
}, 'custom-store');
```

### Security Logger Configuration

```typescript
import { securityLogger } from '@/lib/security';

// Get metrics
const metrics = securityLogger.getMetrics();

// Export events
const json = securityLogger.exportEvents('json');
const csv = securityLogger.exportEvents('csv');

// Clear old events
securityLogger.clearOldEvents(30); // Clear events older than 30 days
```

## Best Practices

### 1. Always Validate Input

```typescript
// ❌ BAD
const userInput = request.body.message;
await db.save({ message: userInput });

// ✅ GOOD
const { valid, sanitized } = validateFormData(request.body, rules);
if (!valid) return { error: 'Invalid input' };
await db.save({ message: sanitized.message });
```

### 2. Never Trust User Input

```typescript
// ❌ BAD
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD
const safe = sanitizeHTML(userInput);
<div dangerouslySetInnerHTML={{ __html: safe }} />
```

### 3. Use Parameterized Queries

```typescript
// ❌ BAD
await prisma.$executeRaw`SELECT * FROM users WHERE id = ${userId}`;

// ✅ GOOD
await prisma.user.findUnique({ where: { id: userId } });
```

### 4. Implement Rate Limiting

```typescript
// ✅ GOOD
const { allowed } = await apiRateLimiter(request);
if (!allowed) return new Response('Too Many Requests', { status: 429 });
```

### 5. Log Security Events

```typescript
// ✅ GOOD
securityLogger.log({
  type: SecurityEventType.LOGIN_FAILED,
  severity: SecuritySeverity.MEDIUM,
  ipAddress: req.ip,
  success: false,
});
```

## Testing

### Run Security Scan

```bash
npm run security:scan
```

### Run Dependency Audit

```bash
npm audit
npm audit fix
```

### Manual Testing

```typescript
// Test XSS detection
import { detectXSS } from '@/lib/security';
console.log(detectXSS('<script>alert(1)</script>'));

// Test SQL injection detection
import { detectSQLInjection } from '@/lib/security';
console.log(detectSQLInjection("'; DROP TABLE users--"));

// Test validation
import { validateEmail } from '@/lib/security';
console.log(validateEmail('test@example.com'));
```

## Troubleshooting

### CSRF Token Validation Fails

- Ensure cookies are enabled
- Check cookie SameSite attribute
- Verify HTTPS in production
- Check token expiration (1 hour)

### Rate Limiting Too Strict

- Adjust limits in `lib/security/rate-limiter.ts`
- Create custom rate limiter
- Whitelist specific IPs/users

### False Positive XSS Detection

- Review XSS patterns in `lib/security/xss-protection.ts`
- Use `sanitizeSafeHTML()` instead of `sanitizeStrict()`
- Whitelist specific HTML tags

## Support

For security issues, see `SECURITY.md` for reporting procedures.

For questions, contact: security@disasterrecovery.com.au

## License

Proprietary - Disaster Recovery Brisbane
