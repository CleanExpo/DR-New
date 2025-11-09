# Security Best Practices for Developers

This guide provides security best practices for developers working on the Disaster Recovery Brisbane website.

## Table of Contents

1. [Input Validation](#input-validation)
2. [Output Encoding](#output-encoding)
3. [Authentication & Authorization](#authentication--authorization)
4. [Session Management](#session-management)
5. [Cryptography](#cryptography)
6. [Error Handling](#error-handling)
7. [API Security](#api-security)
8. [Database Security](#database-security)
9. [File Operations](#file-operations)
10. [Dependency Management](#dependency-management)

---

## Input Validation

### Never Trust User Input

**Golden Rule**: All input is evil until proven otherwise.

### DO ✅

```typescript
import { validateFormData, ValidationRule } from '@/lib/security';

// Define validation rules
const rules: Record<string, ValidationRule> = {
  email: { type: 'email', required: true },
  phone: { type: 'phone', required: true },
  name: { type: 'name', required: true, minLength: 2, maxLength: 50 },
  message: { type: 'text', required: true, minLength: 10, maxLength: 2000 },
};

// Validate and sanitize
const { valid, errors, sanitized } = validateFormData(formData, rules);

if (!valid) {
  return { error: 'Validation failed', details: errors };
}

// Use sanitized data
await saveToDatabase(sanitized);
```

### DON'T ❌

```typescript
// Never use raw user input directly
const userInput = request.body.message;
await db.query(`INSERT INTO messages (text) VALUES ('${userInput}')`); // SQL INJECTION!

// Never trust client-side validation alone
if (email.includes('@')) { // Not enough!
  await saveEmail(email);
}
```

### Validation Checklist

- [ ] Validate data type (string, number, boolean, etc.)
- [ ] Validate format (email, phone, URL, etc.)
- [ ] Validate length (min/max)
- [ ] Validate range (for numbers)
- [ ] Whitelist allowed characters
- [ ] Sanitize before storage
- [ ] Validate on both client and server

---

## Output Encoding

### Prevent XSS Attacks

Always encode output before rendering to users.

### DO ✅

```typescript
import { sanitizeHTML, sanitizeText, encodeHTML } from '@/lib/security';

// For HTML content
const safeHTML = sanitizeHTML(userContent);
return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;

// For plain text
const safeText = sanitizeText(userInput);
return <p>{safeText}</p>;

// For HTML attributes
const safeAttr = encodeHTML(userInput);
return <div title={safeAttr}>Content</div>;
```

### DON'T ❌

```typescript
// Never render raw user input
return <div dangerouslySetInnerHTML={{ __html: userInput }} />; // XSS!

// Never use raw input in attributes
return <a href={userInput}>Click</a>; // Potential javascript: protocol

// Never trust innerHTML
element.innerHTML = userInput; // XSS!
```

### Encoding Guidelines

1. **HTML Context**: Use `sanitizeHTML()` with DOMPurify
2. **JavaScript Context**: Use `JSON.stringify()` and proper escaping
3. **URL Context**: Use `sanitizeURL()` to block dangerous protocols
4. **CSS Context**: Use `sanitizeCSS()` to prevent expression() attacks

---

## Authentication & Authorization

### Secure Authentication

### DO ✅

```typescript
import { hashPassword, verifyPassword } from '@/lib/security';

// Hash passwords before storage
const hashedPassword = await hashPassword(plainPassword);
await db.user.create({ email, password: hashedPassword });

// Verify passwords with constant-time comparison
const isValid = await verifyPassword(plainPassword, storedHash);

// Implement rate limiting on auth endpoints
import { authRateLimiter } from '@/lib/security';

const { allowed } = await authRateLimiter(request);
if (!allowed) {
  return new Response('Too many attempts', { status: 429 });
}
```

### DON'T ❌

```typescript
// Never store plain text passwords
await db.user.create({ email, password }); // CRITICAL VULNERABILITY!

// Never use weak hashing (MD5, SHA1)
const hash = md5(password); // NOT SECURE!

// Never compare passwords without constant-time comparison
if (inputPassword === storedPassword) { } // Timing attack vulnerable
```

### Authentication Best Practices

- ✅ Use bcrypt/argon2 for password hashing
- ✅ Implement rate limiting (5 attempts per 15 minutes)
- ✅ Use secure session management
- ✅ Implement password strength requirements
- ✅ Add multi-factor authentication
- ✅ Log all authentication events
- ❌ Never log passwords (even hashed)
- ❌ Never send passwords in URLs
- ❌ Never email passwords

---

## Session Management

### Secure Sessions

### DO ✅

```typescript
import { sessionSecurity } from '@/lib/security';

// Create secure session
const { sessionId, fingerprint } = sessionSecurity.createSession(
  userId,
  request.ip,
  request.headers.get('user-agent')
);

// Set secure cookie
response.cookies.set('session', sessionId, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60, // 24 hours
  path: '/',
});

// Validate session
const validation = sessionSecurity.validateSession(
  sessionId,
  request.ip,
  request.headers.get('user-agent'),
  fingerprint
);

if (!validation.valid) {
  return redirectToLogin();
}

// Rotate session on sensitive operations
if (validation.shouldRotate) {
  const newSessionId = sessionSecurity.rotateSessionId(sessionId);
  // Update cookie
}
```

### DON'T ❌

```typescript
// Never use predictable session IDs
const sessionId = userId + '-' + Date.now(); // PREDICTABLE!

// Never store sensitive data in cookies without encryption
response.cookies.set('user', JSON.stringify(userData)); // EXPOSED!

// Never skip session validation
const userId = request.cookies.get('userId'); // Trust without verify!
```

### Session Security Checklist

- [ ] Use cryptographically random session IDs
- [ ] Set HttpOnly flag (prevent JavaScript access)
- [ ] Set Secure flag (HTTPS only)
- [ ] Set SameSite attribute (CSRF protection)
- [ ] Implement session timeout (idle + absolute)
- [ ] Rotate sessions after authentication
- [ ] Implement session theft detection
- [ ] Destroy sessions on logout

---

## Cryptography

### Encryption Best Practices

### DO ✅

```typescript
import { encrypt, decrypt, encryptForStorage } from '@/lib/security';

// Encrypt sensitive data before storage
const encryptedData = await encryptForStorage(sensitiveData);
await db.save({ encryptedData });

// Decrypt when needed
const decrypted = await decryptFromStorage(encryptedData);

// Generate secure tokens
import { generateSecureToken } from '@/lib/security';
const token = generateSecureToken(32);
```

### DON'T ❌

```typescript
// Never use weak encryption
const encrypted = btoa(data); // Base64 is NOT encryption!

// Never hardcode encryption keys
const key = '1234567890abcdef'; // CRITICAL VULNERABILITY!

// Never roll your own crypto
function myEncrypt(data) { ... } // Use proven libraries!
```

### Cryptography Guidelines

1. **Use proven algorithms**: AES-256-GCM, ChaCha20-Poly1305
2. **Secure key management**: Use environment variables, key rotation
3. **Use authenticated encryption**: GCM mode, not ECB
4. **Generate secure random numbers**: crypto.randomBytes()
5. **Hash passwords properly**: bcrypt with salt
6. **Use HTTPS everywhere**: No crypto over HTTP

---

## Error Handling

### Secure Error Messages

### DO ✅

```typescript
try {
  await processPayment(data);
} catch (error) {
  // Log detailed error server-side
  console.error('[PAYMENT ERROR]', {
    error,
    userId,
    timestamp: new Date().toISOString(),
  });

  // Return generic error to client
  return {
    success: false,
    message: 'Payment processing failed. Please try again or contact support.',
  };
}
```

### DON'T ❌

```typescript
try {
  await db.query(sql);
} catch (error) {
  // Never expose error details to client
  return { error: error.message }; // May leak SQL structure!

  // Never expose stack traces
  return { error: error.stack }; // Leaks system info!
}
```

### Error Handling Best Practices

- ✅ Log detailed errors server-side only
- ✅ Return generic error messages to clients
- ✅ Implement error monitoring (Sentry, Rollbar)
- ✅ Different error messages for dev/prod
- ✅ Use error boundaries in React
- ❌ Never expose stack traces in production
- ❌ Never leak database structure
- ❌ Never reveal file paths

---

## API Security

### Secure API Endpoints

### DO ✅

```typescript
import { apiRateLimiter, validateCSRFToken } from '@/lib/security';

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const { allowed } = await apiRateLimiter(request);
  if (!allowed) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // 2. CSRF protection
  const csrfValid = await validateCSRFToken(request);
  if (!csrfValid) {
    return new Response('Invalid CSRF token', { status: 403 });
  }

  // 3. Input validation
  const { valid, sanitized } = validateFormData(await request.json(), rules);
  if (!valid) {
    return new Response('Invalid input', { status: 400 });
  }

  // 4. Process request
  const result = await processRequest(sanitized);

  // 5. Return response
  return NextResponse.json(result);
}
```

### DON'T ❌

```typescript
export async function POST(request: NextRequest) {
  // No validation, no rate limiting, no CSRF check
  const data = await request.json();
  await db.save(data); // MULTIPLE VULNERABILITIES!
  return NextResponse.json({ success: true });
}
```

### API Security Checklist

- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use HTTPS only
- [ ] Implement CSRF protection
- [ ] Add authentication/authorization
- [ ] Return appropriate status codes
- [ ] Sanitize error messages
- [ ] Log all API requests
- [ ] Implement API versioning
- [ ] Add request/response logging

---

## Database Security

### Prevent SQL Injection

### DO ✅

```typescript
import { prisma } from '@/lib/prisma';

// Use Prisma ORM (parameterized queries)
const user = await prisma.user.findUnique({
  where: { email: userEmail }, // Safe: Prisma handles escaping
});

// Use safe query builder
import { SafeQueryBuilder } from '@/lib/security';

const builder = new SafeQueryBuilder();
builder.where('status', '=', status);
const { clause, parameters } = builder.buildWhere();
```

### DON'T ❌

```typescript
// Never use string concatenation for queries
const query = `SELECT * FROM users WHERE email = '${email}'`; // SQL INJECTION!

// Never trust input in raw queries
await prisma.$executeRaw`SELECT * FROM users WHERE id = ${userId}`; // UNSAFE!
```

### Database Security Best Practices

- ✅ Always use parameterized queries
- ✅ Use Prisma ORM exclusively
- ✅ Validate input before queries
- ✅ Implement least privilege (minimal DB permissions)
- ✅ Encrypt sensitive data at rest
- ✅ Enable query logging
- ✅ Regular database backups
- ❌ Never use dynamic table/column names from user input
- ❌ Never store passwords in plain text
- ❌ Never log sensitive data

---

## File Operations

### Secure File Uploads

### DO ✅

```typescript
import {
  validateUploadedFile,
  generateSecureFilename,
  sanitizeFileName
} from '@/lib/security';

// Validate file
const validation = await validateUploadedFile(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
});

if (!validation.valid) {
  return { error: validation.error };
}

// Generate secure filename
const secureFilename = generateSecureFilename(file.name);

// Save outside web root
const uploadPath = path.join(process.cwd(), 'uploads', secureFilename);
await fs.writeFile(uploadPath, await file.arrayBuffer());
```

### DON'T ❌

```typescript
// Never trust original filename
await fs.writeFile(`./public/${file.name}`, data); // Path traversal!

// Never skip file validation
await fs.writeFile(`./uploads/${file.name}`, data); // Dangerous!

// Never allow arbitrary file types
// Attacker could upload .php, .exe, etc.
```

### File Security Checklist

- [ ] Validate file type (MIME + extension)
- [ ] Validate file size
- [ ] Sanitize filename
- [ ] Generate unique filename
- [ ] Store outside web root
- [ ] Implement virus scanning
- [ ] Set file permissions correctly
- [ ] Add rate limiting for uploads

---

## Dependency Management

### Keep Dependencies Secure

### DO ✅

```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Use lock files
# Commit package-lock.json

# Enable Dependabot
# .github/dependabot.yml
```

### DON'T ❌

```bash
# Never ignore security warnings
npm audit --force # Fix vulnerabilities instead!

# Never use untrusted packages
npm install random-package-from-internet

# Never commit node_modules
# Add to .gitignore
```

### Dependency Security Best Practices

- ✅ Run `npm audit` before deployment
- ✅ Use Snyk or similar for continuous monitoring
- ✅ Enable Dependabot for automated updates
- ✅ Review dependencies before adding
- ✅ Pin versions in production
- ✅ Keep dependencies up to date
- ❌ Never use deprecated packages
- ❌ Never ignore security advisories
- ❌ Never use packages with known vulnerabilities

---

## Security Code Review Checklist

Before committing code, verify:

### Input Validation
- [ ] All user inputs validated
- [ ] Validation on both client and server
- [ ] Sanitization applied where needed
- [ ] Type checking implemented

### Output Encoding
- [ ] User content sanitized before rendering
- [ ] No dangerouslySetInnerHTML with raw data
- [ ] URLs validated before use
- [ ] HTML entities encoded

### Authentication/Authorization
- [ ] Authentication required where needed
- [ ] Authorization checked for all actions
- [ ] Rate limiting implemented
- [ ] Sessions secured properly

### Cryptography
- [ ] Sensitive data encrypted
- [ ] Strong algorithms used
- [ ] No hardcoded secrets
- [ ] Secure random generation

### Error Handling
- [ ] Generic errors for users
- [ ] Detailed errors logged server-side
- [ ] No stack traces in production
- [ ] Error monitoring configured

### Database
- [ ] Parameterized queries only
- [ ] No string concatenation in SQL
- [ ] Input validated before queries
- [ ] Least privilege DB permissions

### Dependencies
- [ ] npm audit passed
- [ ] No known vulnerabilities
- [ ] Dependencies up to date
- [ ] Unnecessary deps removed

---

## Security Resources

### Official Guides
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [SonarQube](https://www.sonarqube.org/)

### Learning
- [Web Security Academy](https://portswigger.net/web-security)
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/)
- [HackerOne](https://www.hackerone.com/)

---

## Getting Help

If you're unsure about security:

1. **Ask the team**: Security is everyone's responsibility
2. **Review docs**: Check SECURITY.md and AUDIT.md
3. **Consult OWASP**: World-class security guidance
4. **Use security libraries**: Don't roll your own crypto
5. **When in doubt, ask**: Better safe than sorry

---

**Remember**: Security is not a feature, it's a mindset. Think like an attacker, code like a defender.

**Last Updated**: 2025-01-09
**Version**: 1.0.0
