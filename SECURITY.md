# Security Documentation

## Overview

This application implements comprehensive security measures following industry best practices and OWASP guidelines. This document provides an overview of all security features and configurations.

## Security Features Implemented

### 1. Authentication & Session Management

#### Session Security
- **JWT-based sessions** with HMAC-SHA256 signing
- **Session fingerprinting** to prevent session hijacking
- **Automatic session rotation** on authentication
- **IP address validation** for session integrity
- **Absolute and idle timeout** protection
- **Secure cookie configuration**:
  - `httpOnly: true` - Prevents XSS access to cookies
  - `secure: true` - HTTPS only in production
  - `sameSite: 'strict'` - CSRF protection
  - `__Secure-` prefix for additional protection

#### Password Security
- **Minimum 12 characters** required
- **Complexity requirements**: uppercase, lowercase, numbers, special characters
- **Scrypt hashing** algorithm (recommended over bcrypt)
- **Password history** tracking (prevents reuse of last 5 passwords)
- **Have I Been Pwned** integration to check for compromised passwords
- **Rate limiting** on login attempts (5 attempts per 15 minutes)

### 2. CSRF Protection

- **Double-submit cookie pattern** implementation
- **Token rotation** on session refresh
- **Constant-time comparison** to prevent timing attacks
- **Automatic token injection** for forms
- **Support for both header and body tokens**

### 3. Input Validation & Sanitization

#### Validation Features
- **Email validation** with RFC compliance
- **Australian phone number** validation
- **URL validation** with protocol verification
- **Name validation** with character whitelist
- **Postcode validation** for Australian format
- **File type and size** validation
- **MIME type verification**
- **Magic number checking** to prevent file type spoofing

#### Sanitization
- **HTML sanitization** using DOMPurify
- **SQL injection** prevention
- **XSS protection** through output encoding
- **Path traversal** prevention
- **Null byte** removal
- **Special character** escaping

### 4. Rate Limiting

#### Configured Limits
- **API routes**: 100 requests per minute
- **Authentication**: 5 attempts per 15 minutes
- **Form submissions**: 10 submissions per minute
- **File uploads**: 20 uploads per hour

#### Features
- **IP-based** rate limiting
- **Sliding window** algorithm
- **Token bucket** implementation available
- **Memory-efficient** LRU cache
- **Automatic cleanup** of expired entries

### 5. File Upload Security

#### Validation
- **File size limits**: 10MB default
- **Allowed file types**: Images, PDFs, documents
- **MIME type validation**
- **Magic number verification**
- **Dimension checks** for images
- **Malware scanning** (pattern-based)
- **Filename sanitization**

#### Protection Against
- **Executable files** (blacklist of dangerous extensions)
- **Double extension** attacks
- **Path traversal** attempts
- **Script injection** in filenames
- **Image bomb** attacks

### 6. Security Headers

#### Implemented Headers
```
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: cross-origin
Cross-Origin-Embedder-Policy: credentialless
X-DNS-Prefetch-Control: on
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
```

### 7. Content Security Policy (CSP)

#### Directives
```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-domains.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
img-src 'self' data: blob: https: http:
font-src 'self' data: https://fonts.gstatic.com
connect-src 'self' https://api-endpoints.com wss: ws:
object-src 'none'
frame-ancestors 'self'
base-uri 'self'
form-action 'self'
upgrade-insecure-requests
block-all-mixed-content
```

### 8. Encryption & Data Protection

#### PII Encryption
- **AES-256-GCM** encryption for sensitive data
- **Key derivation** using scrypt
- **Random salt and IV** for each encryption
- **Authentication tags** for integrity verification
- **Secure key storage** (environment variables)

#### Features
- **Data-at-rest** encryption for PII
- **Field-level encryption** for sensitive fields
- **Secure key rotation** capability
- **Data redaction** for logs
- **Masking utilities** for display

### 9. Security Logging & Monitoring

#### Logged Events
- Authentication attempts (success/failure)
- Authorization failures
- Security violations (XSS, SQL injection, CSRF)
- Rate limit exceedences
- Suspicious activities
- Data access to sensitive resources
- API key usage
- File upload activities

#### Monitoring Features
- **Real-time** event tracking
- **Security metrics** dashboard
- **Anomaly detection** for suspicious patterns
- **Alert thresholds** for critical events
- **Event export** for analysis (JSON/CSV)
- **Integration ready** for external logging services

### 10. API Security

#### Features
- **API key authentication** support
- **JWT validation**
- **Request validation** middleware
- **CORS configuration** with whitelist
- **Method filtering**
- **Error sanitization** (no information leakage)
- **Webhook signature** verification

## Security Configuration

### Environment Variables

#### Required
```bash
SESSION_SECRET=<32+ character random string>
NEXTAUTH_SECRET=<32+ character random string>
```

#### Recommended
```bash
PII_ENCRYPTION_KEY=<32+ character random string>
API_KEYS=<comma-separated list of API keys>
ADMIN_API_KEY=<admin API key>
```

### Configuration Files

- `lib/security/security-config.ts` - Main security configuration
- `middleware.ts` - Security middleware and headers
- `.env.example` - Environment variable template

## Security Best Practices

### For Developers

1. **Never commit secrets** to version control
2. **Always validate and sanitize** user input
3. **Use parameterized queries** for database operations
4. **Implement proper error handling** without exposing internals
5. **Keep dependencies updated** regularly
6. **Use security linters** (ESLint security plugins)
7. **Conduct code reviews** with security focus
8. **Test security features** thoroughly

### For Deployment

1. **Use HTTPS** in production (enforced by middleware)
2. **Set strong session secrets** (minimum 32 characters)
3. **Enable security headers** (configured in middleware)
4. **Configure CSP properly** for your domains
5. **Set up security monitoring** and alerts
6. **Regular security audits** and penetration testing
7. **Backup encryption keys** securely
8. **Implement log aggregation** for security events

### For Operations

1. **Monitor security logs** regularly
2. **Review failed authentication** attempts
3. **Check for anomalous patterns** in traffic
4. **Update dependencies** when vulnerabilities are discovered
5. **Rotate API keys** periodically
6. **Review access logs** for suspicious activity
7. **Test disaster recovery** procedures
8. **Maintain security documentation** up to date

## Security Testing

### Automated Testing

```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Type checking (prevents type-related bugs)
npm run type-check

# Linting (includes security rules)
npm run lint
```

### Manual Testing Checklist

- [ ] XSS protection (try injecting scripts)
- [ ] SQL injection (test with special characters)
- [ ] CSRF protection (test without tokens)
- [ ] Authentication bypass attempts
- [ ] Rate limiting effectiveness
- [ ] File upload restrictions
- [ ] Session hijacking resistance
- [ ] Privilege escalation attempts

## Vulnerability Response

### If You Discover a Vulnerability

1. **Do NOT** create a public GitHub issue
2. **Email** security contact (set in your organization)
3. **Provide details**: Steps to reproduce, impact, suggested fix
4. **Wait for response** before public disclosure

### Response Process

1. **Acknowledge** receipt within 48 hours
2. **Assess** severity and impact
3. **Develop fix** with security team
4. **Test fix** thoroughly
5. **Deploy fix** to production
6. **Notify affected users** if needed
7. **Public disclosure** after fix is deployed

## Known Limitations

1. **expr-eval dependency** has a high severity vulnerability
   - Used by @langchain/community
   - Mitigation: Limited exposure, used only in controlled contexts
   - Action: Monitoring for updates

2. **nodemailer** has a moderate vulnerability
   - Email domain interpretation issue
   - Mitigation: Email sending is to verified domains only
   - Action: Update when breaking changes are acceptable

3. **CSP allows 'unsafe-inline'** in development
   - Required for Next.js hot reload
   - Mitigation: Stricter policy in production builds
   - Action: Consider nonce-based CSP in future

## Compliance

### Standards Followed

- **OWASP Top 10** (2021) - Protection against all top 10 vulnerabilities
- **OWASP ASVS** - Application Security Verification Standard Level 2
- **CWE Top 25** - Protection against most dangerous software weaknesses
- **PCI DSS** - Payment Card Industry standards (if handling payments)
- **GDPR** - Data protection and privacy (for EU users)
- **Australian Privacy Principles** - Local privacy requirements

## Security Contact

For security concerns, contact:
- **Email**: security@your-domain.com (set this up)
- **PGP Key**: [Link to PGP key] (recommended)

## Version History

### Version 1.0.0 (Current)
- Initial security implementation
- Comprehensive authentication and authorization
- Input validation and sanitization
- Rate limiting and CSRF protection
- Security logging and monitoring
- Encryption for sensitive data

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Next.js Security](https://nextjs.org/docs/authentication)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
- [Web Security Academy](https://portswigger.net/web-security)

## Acknowledgments

Security implementation based on:
- OWASP guidelines and recommendations
- Industry best practices
- Next.js security documentation
- Node.js security working group recommendations