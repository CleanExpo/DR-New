# Security Quick Reference

## Quick Import Guide

```typescript
// Most common security imports
import {
  // Validation
  validateEmail,
  validatePhone,
  sanitizeText,
  sanitizeHTML,
  validateFormData,

  // API Security
  secureAPI,
  createSecureResponse,

  // File Uploads
  validateUploadedFile,

  // Session Management
  validateSession,
  createSession,
  destroySession,

  // CSRF
  getCSRFToken,
  validateCSRFToken,

  // Logging
  securityLogger,
  SecurityEventType,
  SecuritySeverity,

  // Rate Limiting
  rateLimit,
  apiRateLimiter,
  authRateLimiter,

  // Encryption
  encrypt,
  decrypt,
  hashPassword,
  verifyPassword,

  // Password Policy
  validatePassword,
  calculatePasswordStrength,
} from '@/lib/security';
```

## Common Patterns

### Secure API Route

```typescript
import { secureAPI } from '@/lib/security';

export const POST = secureAPI(
  async (req) => {
    // Your logic
    return NextResponse.json({ success: true });
  },
  {
    requireAuth: true,
    requireCSRF: true,
    rateLimit: { windowMs: 60000, max: 10 },
    validation: {
      email: { type: 'email', required: true },
      message: { type: 'text', required: true, maxLength: 1000 },
    },
  }
);
```

### Form with CSRF

```typescript
'use client';
import { getCSRFTokenFromCookie } from '@/lib/security';

const csrfToken = getCSRFTokenFromCookie();

<form onSubmit={handleSubmit}>
  <input type="hidden" name="_csrf" value={csrfToken} />
  {/* fields */}
</form>
```

### Validate Input

```typescript
import { validateEmail } from '@/lib/security';

const { valid, sanitized } = validateEmail(email);
if (valid) {
  // Use sanitized
}
```

### File Upload

```typescript
import { validateUploadedFile } from '@/lib/security';

const file = formData.get('file') as File;
const validation = await validateUploadedFile(file, {
  allowedTypes: ['jpg', 'png', 'pdf'],
  maxSizeInMB: 5,
});

if (!validation.valid) {
  return NextResponse.json({ error: validation.error }, { status: 400 });
}
```

### Log Security Event

```typescript
import { securityLogger, SecurityEventType, SecuritySeverity } from '@/lib/security';

securityLogger.log({
  type: SecurityEventType.LOGIN_SUCCESS,
  severity: SecuritySeverity.LOW,
  userId: user.id,
  ipAddress: clientIp,
  success: true,
});
```

### Hash Password

```typescript
import { hashPassword, verifyPassword } from '@/lib/security';

// Hash
const hashed = await hashPassword(password);

// Verify
const valid = await verifyPassword(password, hashed);
```

### Validate Session

```typescript
import { validateSession } from '@/lib/security';

const session = await validateSession(request.headers);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## Environment Variables

```bash
# Required
SESSION_SECRET=your-32-char-secret-here
NEXTAUTH_SECRET=your-32-char-secret-here

# Recommended
PII_ENCRYPTION_KEY=your-32-char-key-here
API_KEYS=key1,key2,key3
ADMIN_API_KEY=admin-key-here

# Generate with:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Security Headers Check

Visit your site and open DevTools → Network → Select any request → Headers

Should see:
```
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: [your CSP]
```

## Rate Limits

- API: 100 req/min
- Auth: 5 attempts/15 min
- Forms: 10/min
- Uploads: 20/hour

Adjust in `lib/security/security-config.ts`

## Common Validations

```typescript
// Email
validateEmail(email) // → { valid, sanitized }

// Phone (Australian)
validatePhoneNumber(phone) // → { valid, sanitized }

// URL
validateURL(url) // → { valid, sanitized }

// Name
validateName(name, minLen, maxLen) // → { valid, sanitized }

// Postcode
validatePostcode(postcode) // → boolean
```

## File Upload Limits

- Max size: 10MB
- Images: jpg, jpeg, png, gif, webp
- Documents: pdf, doc, docx, xls, xlsx

## Password Requirements

- Min 12 characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 number
- At least 1 special character
- Not in common passwords list
- Not containing user info

## Security Event Types

```typescript
SecurityEventType.LOGIN_SUCCESS
SecurityEventType.LOGIN_FAILED
SecurityEventType.LOGOUT
SecurityEventType.ACCESS_DENIED
SecurityEventType.XSS_ATTEMPT
SecurityEventType.SQL_INJECTION_ATTEMPT
SecurityEventType.CSRF_VIOLATION
SecurityEventType.RATE_LIMIT_EXCEEDED
SecurityEventType.SUSPICIOUS_ACTIVITY
SecurityEventType.FILE_UPLOAD
SecurityEventType.DATA_ACCESS
```

## Encryption

```typescript
// Encrypt sensitive data
const encrypted = await encrypt(data, masterKey);

// Decrypt
const decrypted = await decrypt(encrypted, masterKey);

// Mask for display
const masked = maskEmail('user@example.com'); // u***r@example.com
```

## Testing Security

```bash
# Check dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Type checking
npm run type-check

# Linting
npm run lint
```

## Troubleshooting

### CSRF Token Issues
```typescript
// Get token
const token = getCSRFTokenFromCookie();

// Include in header
headers: { 'X-CSRF-Token': token }

// Or in body
{ _csrf: token, ...otherData }
```

### Rate Limit Hit
```typescript
// Check response headers
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2025-11-07T12:34:56Z
Retry-After: 60
```

### Session Invalid
- Check SESSION_SECRET is set
- Verify cookies are being set
- Ensure HTTPS in production
- Check cookie domain matches

## Documentation

- Full docs: `/SECURITY.md`
- Implementation guide: `/docs/SECURITY_IMPLEMENTATION_GUIDE.md`
- Checklist: `/docs/SECURITY_CHECKLIST.md`
- Summary: `/SECURITY_IMPLEMENTATION_SUMMARY.md`