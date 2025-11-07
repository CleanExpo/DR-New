# Security Implementation Guide

This guide explains how to use the security features in your application code.

## Table of Contents

1. [Quick Start](#quick-start)
2. [API Route Security](#api-route-security)
3. [Form Security](#form-security)
4. [File Upload Security](#file-upload-security)
5. [Input Validation](#input-validation)
6. [Session Management](#session-management)
7. [Password Handling](#password-handling)
8. [Data Encryption](#data-encryption)
9. [Security Logging](#security-logging)
10. [Best Practices](#best-practices)

## Quick Start

### Initialize Security (App Startup)

```typescript
import { initializeSecurity } from '@/lib/security';

// In your app entry point (e.g., layout.tsx or _app.tsx)
initializeSecurity();
```

### Import Security Utilities

```typescript
import {
  validateEmail,
  sanitizeText,
  secureAPI,
  validateUploadedFile,
  securityLogger,
} from '@/lib/security';
```

## API Route Security

### Basic Secure API Route

```typescript
import { NextRequest } from 'next/server';
import { secureAPI, type SecureAPIRequest } from '@/lib/security';

const handler = async (req: SecureAPIRequest) => {
  // Your handler code here
  const { userId, validatedData } = req;

  return NextResponse.json({ success: true });
};

// Wrap with security middleware
export const POST = secureAPI(handler, {
  requireAuth: true,
  requireCSRF: true,
  rateLimit: {
    windowMs: 60 * 1000,
    max: 10,
  },
  allowedMethods: ['POST'],
});
```

### API Route with Validation

```typescript
import { secureAPI, ValidationRule } from '@/lib/security';

const validationRules: Record<string, ValidationRule> = {
  email: { type: 'email', required: true },
  name: { type: 'name', required: true, minLength: 2, maxLength: 50 },
  phone: { type: 'phone', required: false },
};

export const POST = secureAPI(
  async (req) => {
    // Validated data is available in req.validatedData
    const { email, name, phone } = req.validatedData!;

    // Your logic here

    return NextResponse.json({ success: true });
  },
  {
    validation: validationRules,
    requireCSRF: true,
    rateLimit: { windowMs: 60000, max: 5 },
  }
);
```

### API Route with Custom Rate Limiting

```typescript
import { secureAPI, authRateLimiter } from '@/lib/security';

export const POST = secureAPI(
  async (req) => {
    // Handle login
    return NextResponse.json({ success: true });
  },
  {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // 5 attempts
    },
    logAccess: true,
  }
);
```

## Form Security

### Client-Side Form with CSRF

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getCSRFTokenFromCookie } from '@/lib/security';

export function ContactForm() {
  const [csrfToken, setCSRFToken] = useState('');

  useEffect(() => {
    const token = getCSRFTokenFromCookie();
    if (token) setCSRFToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('_csrf', csrfToken);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });

    // Handle response
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Server-Side Form Validation

```typescript
import { validateFormData, type ValidationRule } from '@/lib/security';

const rules: Record<string, ValidationRule> = {
  email: { type: 'email', required: true },
  message: { type: 'text', required: true, minLength: 10, maxLength: 1000, sanitize: true },
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const validation = validateFormData(data, rules);

  if (!validation.valid) {
    return NextResponse.json(
      { errors: validation.errors },
      { status: 400 }
    );
  }

  // Use validation.sanitized for safe data
  const { email, message } = validation.sanitized;

  // Process form...

  return NextResponse.json({ success: true });
}
```

## File Upload Security

### Validate Uploaded Files

```typescript
import { validateUploadedFile } from '@/lib/security';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate file
  const validation = await validateUploadedFile(
    file,
    {
      allowedTypes: ['jpg', 'jpeg', 'png', 'pdf'],
      maxSizeInMB: 5,
      scanForMalware: true,
    },
    request.headers.get('x-forwarded-for') || 'unknown'
  );

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Use validation.sanitizedName for the filename
  const safeFilename = validation.sanitizedName;

  // Process file upload...

  return NextResponse.json({
    success: true,
    filename: safeFilename,
    hash: validation.fileHash,
  });
}
```

### Image Upload with Dimension Check

```typescript
import { validateUploadedFile, validateImageDimensions } from '@/lib/security';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('image') as File;

  // Validate file
  const validation = await validateUploadedFile(file, {
    allowedTypes: ['jpg', 'jpeg', 'png'],
    maxSizeInMB: 2,
  });

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Check dimensions
  const dimensionCheck = await validateImageDimensions(file, 4000, 4000);

  if (!dimensionCheck.valid) {
    return NextResponse.json({ error: dimensionCheck.error }, { status: 400 });
  }

  // Process upload...

  return NextResponse.json({ success: true });
}
```

## Input Validation

### Email Validation

```typescript
import { validateEmail } from '@/lib/security';

const { valid, sanitized } = validateEmail(userInput);

if (valid) {
  // Use sanitized email
  await saveEmail(sanitized);
}
```

### Phone Number Validation

```typescript
import { validatePhoneNumber } from '@/lib/security';

const { valid, sanitized } = validatePhoneNumber(phoneInput);

if (valid) {
  // sanitized is in +61 format
  await savePhone(sanitized);
}
```

### Custom Validation

```typescript
import { validateFormData } from '@/lib/security';

const validationRules = {
  age: {
    type: 'number' as const,
    required: true,
    min: 18,
    max: 120
  },
  website: {
    type: 'url' as const,
    required: false
  },
  postcode: {
    type: 'postcode' as const,
    required: true
  },
};

const result = validateFormData(userData, validationRules);

if (!result.valid) {
  // result.errors contains field-specific errors
  console.error(result.errors);
} else {
  // result.sanitized contains safe, validated data
  await saveUser(result.sanitized);
}
```

### HTML Sanitization

```typescript
import { sanitizeHTML, sanitizeText } from '@/lib/security';

// Allow limited HTML
const safeHTML = sanitizeHTML(userContent, {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
  ALLOWED_ATTR: [],
});

// Strip all HTML
const plainText = sanitizeText(userInput);
```

## Session Management

### Create Session (Login)

```typescript
import { createSession } from '@/lib/security';

export async function POST(request: NextRequest) {
  // Verify credentials...

  const { sessionId, csrfToken } = await createSession(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    request.headers
  );

  return NextResponse.json({
    success: true,
    csrfToken, // Send to client
  });
}
```

### Validate Session

```typescript
import { validateSession } from '@/lib/security';

export async function GET(request: NextRequest) {
  const session = await validateSession(request.headers);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Session contains: userId, email, role, etc.
  const { userId, email } = session;

  // Handle request...
}
```

### Destroy Session (Logout)

```typescript
import { destroySession } from '@/lib/security';

export async function POST(request: NextRequest) {
  await destroySession();
  return NextResponse.json({ success: true });
}
```

## Password Handling

### Validate Password

```typescript
import { validatePassword, DEFAULT_PASSWORD_POLICY } from '@/lib/security';

const { valid, errors } = validatePassword(
  newPassword,
  DEFAULT_PASSWORD_POLICY,
  { email: user.email, name: user.name }
);

if (!valid) {
  return NextResponse.json({ errors }, { status: 400 });
}
```

### Hash Password

```typescript
import { hashPasswordSecure } from '@/lib/security';

const hashedPassword = await hashPasswordSecure(password);
await saveUser({ ...userData, password: hashedPassword });
```

### Verify Password

```typescript
import { verifyPasswordSecure } from '@/lib/security';

const isValid = await verifyPasswordSecure(
  inputPassword,
  user.hashedPassword,
  user.id,
  clientIp
);

if (!isValid) {
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
```

### Check for Compromised Passwords

```typescript
import { checkPasswordCompromised } from '@/lib/security';

const { compromised, occurrences } = await checkPasswordCompromised(password);

if (compromised) {
  return NextResponse.json({
    error: `This password has been exposed in ${occurrences} data breaches`,
  }, { status: 400 });
}
```

### Calculate Password Strength

```typescript
import { calculatePasswordStrength } from '@/lib/security';

const strength = calculatePasswordStrength(password);

// strength.score: 0-5
// strength.strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong'
// strength.feedback: string[] - suggestions for improvement
```

## Data Encryption

### Encrypt Sensitive Data

```typescript
import { encrypt, decrypt } from '@/lib/security';

const masterKey = process.env.PII_ENCRYPTION_KEY!;

// Encrypt
const encrypted = await encrypt(sensitiveData, masterKey);
await saveToDatabase({ encryptedData: encrypted });

// Decrypt
const decrypted = await decrypt(encrypted, masterKey);
```

### Encrypt PII Fields

```typescript
import { PIIEncryption } from '@/lib/security';

const pii = new PIIEncryption(process.env.PII_ENCRYPTION_KEY);

// Encrypt multiple fields
const encryptedData = await pii.encryptPII({
  ssn: '123-45-6789',
  creditCard: '4111111111111111',
  dob: '1990-01-01',
});

// Decrypt
const decryptedData = await pii.decryptPII(encryptedData);
```

### Mask Data for Display

```typescript
import { maskEmail, maskPhone, maskCreditCard } from '@/lib/security';

const displayEmail = maskEmail('user@example.com'); // u***r@example.com
const displayPhone = maskPhone('+61412345678'); // ****5678
const displayCard = maskCreditCard('4111111111111111'); // ****1111
```

## Security Logging

### Log Security Events

```typescript
import { securityLogger, SecurityEventType, SecuritySeverity } from '@/lib/security';

// Log authentication event
securityLogger.logAuth(
  SecurityEventType.LOGIN_SUCCESS,
  userId,
  clientIp,
  true
);

// Log security violation
securityLogger.logViolation(
  SecurityEventType.XSS_ATTEMPT,
  clientIp,
  request.nextUrl.pathname,
  { input: suspiciousInput }
);

// Log data access
securityLogger.logDataAccess(
  userId,
  'user-profile',
  'read',
  clientIp,
  { fields: ['email', 'phone'] }
);
```

### Get Security Metrics

```typescript
import { getSecurityMetrics } from '@/lib/security';

export async function GET() {
  const metrics = getSecurityMetrics();

  return NextResponse.json({
    totalEvents: metrics.totalEvents,
    failedLogins: metrics.failedLogins,
    suspiciousActivities: metrics.suspiciousActivities,
    lastHourEvents: metrics.lastHourEvents,
  });
}
```

### Detect Suspicious Activity

```typescript
import { detectSuspiciousActivity } from '@/lib/security';

const { suspicious, reasons } = detectSuspiciousActivity(clientIp);

if (suspicious) {
  // Take action: block IP, require additional verification, etc.
  console.warn(`Suspicious activity from ${clientIp}:`, reasons);
}
```

## Best Practices

### 1. Always Validate on Server-Side

```typescript
// ❌ BAD: Only client-side validation
function handleSubmit(data: FormData) {
  if (validateEmail(data.email)) {
    await fetch('/api/submit', { body: data });
  }
}

// ✅ GOOD: Server-side validation
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { valid, sanitized } = validateEmail(data.email);

  if (!valid) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Use sanitized data
}
```

### 2. Use Prepared Statements

```typescript
// ❌ BAD: String concatenation (SQL injection risk)
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ GOOD: Parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
const result = await db.query(query, [email]);
```

### 3. Never Trust Client Data

```typescript
// ❌ BAD: Using user ID from client
const userId = request.json().userId;

// ✅ GOOD: Getting user ID from session
const session = await validateSession(request.headers);
const userId = session.userId;
```

### 4. Sanitize Output

```typescript
// ❌ BAD: Direct output (XSS risk)
return <div dangerouslySetInnerHTML={{ __html: userContent }} />;

// ✅ GOOD: Sanitized output
import { sanitizeHTML } from '@/lib/security';
const safeContent = sanitizeHTML(userContent);
return <div dangerouslySetInnerHTML={{ __html: safeContent }} />;
```

### 5. Use Environment Variables

```typescript
// ❌ BAD: Hardcoded secrets
const apiKey = 'sk_live_abc123';

// ✅ GOOD: Environment variable
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY not configured');
```

### 6. Handle Errors Safely

```typescript
// ❌ BAD: Exposing internal errors
catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// ✅ GOOD: Generic error message
import { sanitizeErrorMessage } from '@/lib/security';
catch (error) {
  const safeMessage = sanitizeErrorMessage(error as Error);
  return NextResponse.json({ error: safeMessage }, { status: 500 });
}
```

### 7. Rate Limit Sensitive Operations

```typescript
import { authRateLimiter } from '@/lib/security';

export const POST = secureAPI(
  async (req) => {
    // Login logic
  },
  {
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  }
);
```

### 8. Log Security Events

```typescript
import { securityLogger, SecurityEventType } from '@/lib/security';

// Log important actions
securityLogger.log({
  type: SecurityEventType.DATA_EXPORT,
  severity: SecuritySeverity.MEDIUM,
  userId: user.id,
  resource: 'customer-data',
  success: true,
});
```

## Troubleshooting

### CSRF Token Missing

**Problem**: Forms fail with "Invalid CSRF token"

**Solution**:
```typescript
// Ensure middleware is setting CSRF token
// Check middleware.ts includes form routes

// In your form component
import { getCSRFTokenFromCookie } from '@/lib/security';

const csrfToken = getCSRFTokenFromCookie();
// Include token in form submission
```

### Rate Limit Too Restrictive

**Problem**: Legitimate users being rate limited

**Solution**:
```typescript
// Adjust rate limits in security-config.ts
export const SECURITY_CONFIG = {
  rateLimit: {
    api: {
      windowMs: 60 * 1000,
      max: 200, // Increase limit
    },
  },
};
```

### Session Validation Failing

**Problem**: Users logged out unexpectedly

**Solution**:
```typescript
// Check SESSION_SECRET is consistent
// Ensure cookies are being set properly
// Verify HTTPS in production

// Disable IP check if behind proxy
export const SECURITY_CONFIG = {
  session: {
    checkIPAddress: false, // If IP changes frequently
  },
};
```

## Additional Resources

- [Security Documentation](../SECURITY.md)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Next.js Security Best Practices](https://nextjs.org/docs/authentication)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)