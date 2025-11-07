# Security Implementation Checklist

Use this checklist to verify that all security features are properly implemented and configured.

## Pre-Deployment Security Checklist

### Environment Configuration

- [ ] `SESSION_SECRET` set (minimum 32 characters)
- [ ] `NEXTAUTH_SECRET` set (minimum 32 characters)
- [ ] `PII_ENCRYPTION_KEY` set (if handling PII)
- [ ] `API_KEYS` configured (if using API key authentication)
- [ ] `ADMIN_API_KEY` set (for admin endpoints)
- [ ] All secrets are strong, random, and unique
- [ ] No secrets committed to version control
- [ ] `.env` file excluded from git (in `.gitignore`)
- [ ] Production environment uses HTTPS
- [ ] `NODE_ENV=production` in production deployment

### Authentication & Sessions

- [ ] Session expiration configured (default: 24 hours)
- [ ] Session refresh working correctly
- [ ] Login rate limiting enabled (5 attempts per 15 minutes)
- [ ] Session fingerprinting enabled
- [ ] Secure cookie flags set (`httpOnly`, `secure`, `sameSite`)
- [ ] Password complexity requirements enforced
- [ ] Password hashing uses scrypt (not MD5/SHA1)
- [ ] Password history tracking implemented
- [ ] Account lockout after failed attempts
- [ ] Two-factor authentication available (if required)

### CSRF Protection

- [ ] CSRF middleware enabled
- [ ] CSRF tokens generated for forms
- [ ] CSRF validation on POST/PUT/DELETE routes
- [ ] Double-submit cookie pattern implemented
- [ ] Token rotation on session refresh

### Input Validation

- [ ] All user inputs validated on server-side
- [ ] Email validation implemented
- [ ] Phone number validation (Australian format)
- [ ] URL validation with protocol check
- [ ] File type validation
- [ ] File size validation
- [ ] MIME type verification
- [ ] Magic number checking for files
- [ ] Path traversal prevention
- [ ] SQL injection prevention (parameterized queries)

### Output Encoding

- [ ] HTML output sanitized (DOMPurify)
- [ ] User content escaped before display
- [ ] JSON responses properly encoded
- [ ] Headers sanitized
- [ ] Error messages don't leak sensitive info

### Rate Limiting

- [ ] API rate limiting enabled (100 req/min default)
- [ ] Authentication rate limiting (5 attempts/15 min)
- [ ] Form submission rate limiting (10/min)
- [ ] File upload rate limiting (20/hour)
- [ ] Rate limit headers included in responses
- [ ] Rate limit storage configured (in-memory or Redis)

### Security Headers

- [ ] `X-XSS-Protection` enabled
- [ ] `X-Content-Type-Options: nosniff` set
- [ ] `X-Frame-Options: SAMEORIGIN` set
- [ ] `Strict-Transport-Security` configured
- [ ] `Referrer-Policy` set
- [ ] `Permissions-Policy` configured
- [ ] CORS properly configured
- [ ] CSP configured and tested

### Content Security Policy

- [ ] CSP header configured
- [ ] Script sources whitelisted
- [ ] Style sources whitelisted
- [ ] Image sources configured
- [ ] `object-src 'none'` set
- [ ] `base-uri 'self'` set
- [ ] `form-action 'self'` set
- [ ] `upgrade-insecure-requests` enabled
- [ ] CSP violations reporting to `/api/security/csp-report`
- [ ] CSP tested in browser console

### File Upload Security

- [ ] File size limits enforced (10MB default)
- [ ] Allowed file types whitelisted
- [ ] Dangerous file extensions blocked
- [ ] File content validation (magic numbers)
- [ ] Malware scanning enabled (if applicable)
- [ ] Uploaded files stored outside web root
- [ ] Unique filenames generated
- [ ] File permissions set correctly

### Encryption & Data Protection

- [ ] Sensitive data encrypted at rest
- [ ] AES-256-GCM used for encryption
- [ ] Encryption keys stored securely (env vars)
- [ ] Key rotation procedure documented
- [ ] PII fields identified and encrypted
- [ ] Data masking for display implemented
- [ ] Secure data deletion procedures
- [ ] Backup encryption configured

### Security Logging

- [ ] Security events logged
- [ ] Failed login attempts logged
- [ ] Security violations logged
- [ ] Sensitive data access logged
- [ ] Log aggregation configured
- [ ] Log retention policy defined
- [ ] Logs don't contain sensitive data (redacted)
- [ ] Monitoring alerts configured

### API Security

- [ ] API key authentication (if required)
- [ ] JWT validation implemented
- [ ] Webhook signature verification
- [ ] API versioning in place
- [ ] API documentation secured
- [ ] API error messages sanitized
- [ ] API CORS configured
- [ ] API throttling enabled

### Database Security

- [ ] Parameterized queries used (no string concatenation)
- [ ] Least privilege database user
- [ ] Database connection encrypted (SSL/TLS)
- [ ] Database backups encrypted
- [ ] Database access audited
- [ ] Sensitive columns encrypted
- [ ] Database credentials in environment variables

### Dependencies

- [ ] `npm audit` run and vulnerabilities addressed
- [ ] Dependencies up to date
- [ ] Unused dependencies removed
- [ ] Security advisories monitored
- [ ] Dependency update process defined
- [ ] Lock files committed (`package-lock.json`)

### Testing

- [ ] XSS protection tested
- [ ] SQL injection protection tested
- [ ] CSRF protection tested
- [ ] Authentication bypass tested
- [ ] Authorization tested (privilege escalation)
- [ ] Rate limiting tested
- [ ] File upload security tested
- [ ] Session hijacking resistance tested
- [ ] Automated security tests in CI/CD

### Monitoring & Alerting

- [ ] Security monitoring enabled
- [ ] Failed authentication alerts
- [ ] Unusual activity alerts
- [ ] Rate limit exceeded alerts
- [ ] Error rate monitoring
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Log analysis configured

### Documentation

- [ ] Security documentation complete
- [ ] Implementation guide available
- [ ] Security policy documented
- [ ] Incident response plan documented
- [ ] Vulnerability disclosure policy
- [ ] Security contact information published
- [ ] Compliance requirements documented

### Compliance (if applicable)

- [ ] GDPR compliance (data protection)
- [ ] HIPAA compliance (health data)
- [ ] PCI DSS compliance (payment data)
- [ ] SOC 2 compliance
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie consent implemented
- [ ] Data processing agreements signed

### Deployment

- [ ] HTTPS enforced in production
- [ ] Security headers active
- [ ] CSP enforced (not just report-only)
- [ ] Rate limiting active
- [ ] Security monitoring live
- [ ] Backup procedures tested
- [ ] Disaster recovery plan tested
- [ ] Rollback procedure documented

## Post-Deployment Security Checklist

### Immediately After Deployment

- [ ] Verify HTTPS is working
- [ ] Check security headers in browser
- [ ] Test login/logout flow
- [ ] Verify CSRF protection
- [ ] Test rate limiting
- [ ] Check security monitoring
- [ ] Verify error pages don't leak info
- [ ] Test file upload security

### Within First Week

- [ ] Review security logs
- [ ] Check for failed login patterns
- [ ] Monitor rate limit hits
- [ ] Review CSP violations
- [ ] Check for unusual traffic patterns
- [ ] Test backup restoration
- [ ] Verify monitoring alerts working

### Monthly

- [ ] Run security audit (`npm audit`)
- [ ] Review security logs
- [ ] Update dependencies
- [ ] Review access logs
- [ ] Check for new vulnerabilities
- [ ] Test disaster recovery
- [ ] Review and update documentation

### Quarterly

- [ ] Penetration testing (external)
- [ ] Security code review
- [ ] Access control audit
- [ ] Encryption key rotation
- [ ] Security training for team
- [ ] Compliance audit (if applicable)
- [ ] Update security documentation

### Annually

- [ ] Comprehensive security audit
- [ ] Third-party penetration testing
- [ ] Disaster recovery drill
- [ ] Security policy review
- [ ] Compliance certification renewal
- [ ] Update incident response plan
- [ ] Security architecture review

## Security Incident Response

### If Security Incident Detected

1. [ ] Identify and contain the threat
2. [ ] Preserve evidence (logs, etc.)
3. [ ] Assess impact and scope
4. [ ] Notify appropriate parties
5. [ ] Implement fixes
6. [ ] Test fixes thoroughly
7. [ ] Deploy fixes to production
8. [ ] Monitor for recurrence
9. [ ] Document incident and lessons learned
10. [ ] Update security measures

### Incident Response Contacts

- Security Team: [Email/Phone]
- System Administrator: [Email/Phone]
- Legal: [Email/Phone]
- PR/Communications: [Email/Phone]
- Management: [Email/Phone]

## Notes

- This checklist should be reviewed and updated regularly
- Not all items may apply to every deployment
- Additional security measures may be required based on specific requirements
- When in doubt, consult security professionals

## Verification

**Completed by**: ________________
**Date**: ________________
**Reviewed by**: ________________
**Date**: ________________
**Next review date**: ________________