# Security Implementation Guide - DR-New Disaster Recovery

## Overview
This guide provides step-by-step instructions for implementing and maintaining security hardening measures for the DR-New disaster recovery website.

## 🚨 Priority 1: Critical Security Implementations (Immediate)

### 1. SSL/TLS Certificate Installation
```bash
# For production deployment
# 1. Obtain SSL certificate from Let's Encrypt or commercial CA
# 2. Configure in your hosting provider (Vercel, AWS, etc.)
# 3. Verify with: https://www.ssllabs.com/ssltest/

# Vercel automatic HTTPS (recommended)
# - Automatic when deploying to Vercel
# - No configuration needed
# - Includes auto-renewal
```

### 2. Environment Variables Setup
```bash
# 1. Copy production environment template
cp .env.production .env.local

# 2. Generate secure keys (Linux/Mac)
openssl rand -hex 32  # For ENCRYPTION_KEY
openssl rand -hex 32  # For HASH_SALT
openssl rand -hex 32  # For JWT_SECRET
openssl rand -hex 32  # For CSRF_SECRET

# 3. Update .env.local with generated keys
# 4. NEVER commit .env.local to git
```

### 3. Deploy Security Middleware
The middleware.ts file is already configured and will:
- Enforce HTTPS (production only)
- Add security headers automatically
- Implement rate limiting
- Provide CSRF protection
- Block suspicious requests

**No additional configuration needed - it works automatically!**

## 🛡️ Priority 2: Security Features Implementation

### 1. Contact Form Security
The secure contact form is implemented at `/app/api/contact/route.ts` with:
- ✅ Input validation and sanitization
- ✅ Rate limiting (5 requests per 5 minutes)
- ✅ CSRF protection
- ✅ Data encryption for sensitive fields
- ✅ Emergency request prioritization

### 2. Testing Security Headers
```bash
# Test local development
npm run dev
node scripts/security-check.js

# Test production (after deployment)
TARGET_URL=https://yourdomain.com node scripts/security-check.js
```

### 3. Monitoring Setup
Security monitoring is implemented in `/lib/monitoring.ts`:
- Automatic security event logging
- Anomaly detection
- Alert thresholds
- Dashboard data export

## 📋 Security Checklist

### Pre-Deployment
- [ ] Generate all production security keys
- [ ] Update .env.local with production values
- [ ] Test security headers locally
- [ ] Review SECURITY_AUDIT_REPORT.md
- [ ] Ensure no sensitive data in code

### Deployment
- [ ] Deploy to HTTPS-enabled hosting
- [ ] Configure domain DNS
- [ ] Set environment variables in hosting platform
- [ ] Enable WAF if available (Cloudflare recommended)
- [ ] Test production security headers

### Post-Deployment
- [ ] Run SSL Labs test (target A+ rating)
- [ ] Test contact form with rate limiting
- [ ] Verify CSP is not blocking functionality
- [ ] Monitor security logs for first 24 hours
- [ ] Set up uptime monitoring

## 🔧 Configuration Files

### 1. Middleware (middleware.ts)
- **Location**: `/middleware.ts`
- **Purpose**: Automatic security headers, rate limiting, CSRF
- **Configuration**: Modify security headers object if needed

### 2. Security Utilities (lib/security.ts)
- **Location**: `/lib/security.ts`
- **Purpose**: Input validation, sanitization, encryption
- **Usage**: Import functions as needed in API routes

### 3. Monitoring (lib/monitoring.ts)
- **Location**: `/lib/monitoring.ts`
- **Purpose**: Security event tracking and alerting
- **Integration**: Automatically used by middleware

## 📊 Monitoring and Alerts

### Setting Up Alerts
1. **Email Alerts** (recommended)
   - Configure SMTP settings in .env.local
   - Alerts sent for CRITICAL and HIGH severity events

2. **Logging Services** (optional)
   - Sentry: Set SENTRY_DSN in environment
   - CloudWatch: Configure AWS credentials
   - Custom webhook: Modify monitoring.ts

### Security Metrics Dashboard
Access security metrics programmatically:
```typescript
import { getDashboardData } from '@/lib/monitoring';

const dashboard = getDashboardData();
// Returns: metrics, recent events, status, recommendations
```

## 🚀 Quick Start Commands

```bash
# Development with security
npm run dev

# Test security locally
node scripts/security-check.js

# Build for production
npm run build

# Start production server
npm start

# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

## ⚠️ Common Issues and Solutions

### Issue: CSP Blocking Resources
**Solution**: Adjust CSP in middleware.ts to allow required sources
```typescript
'script-src': "'self' 'unsafe-inline' your-domain.com",
```

### Issue: Rate Limiting Too Strict
**Solution**: Adjust limits in middleware.ts
```typescript
const MAX_REQUESTS = 100; // Increase if needed
```

### Issue: CORS Errors
**Solution**: Configure CORS in API routes
```typescript
headers: {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
}
```

## 📱 Emergency Response Configuration

### Contact Form Priority Levels
- **CRITICAL**: Biohazard, sewage - 1 hour response
- **HIGH**: Fire, flood - 2-4 hour response
- **MEDIUM**: Storm, water damage - 4-8 hour response
- **LOW**: General inquiries - 24 hour response

## 🔐 Security Best Practices

### Do's ✅
- Regularly update dependencies
- Monitor security alerts
- Test after each deployment
- Keep backups encrypted
- Use environment variables for secrets
- Enable 2FA on hosting accounts
- Regular security audits

### Don'ts ❌
- Never commit .env files
- Don't disable security headers
- Avoid inline scripts
- Don't log sensitive data
- Never use default keys in production
- Don't ignore security warnings
- Avoid wildcard CORS

## 📞 Security Incident Response

### If Security Breach Detected:
1. **Immediate Actions**
   - Enable maintenance mode
   - Review security logs
   - Block suspicious IPs
   - Change all security keys

2. **Investigation**
   - Check access logs
   - Review recent changes
   - Identify attack vector
   - Document findings

3. **Recovery**
   - Patch vulnerabilities
   - Update security measures
   - Restore from clean backup
   - Notify affected users

4. **Post-Incident**
   - Security audit
   - Update documentation
   - Staff training
   - Improve monitoring

## 🎯 Target Security Metrics

| Metric | Target | Current |
|--------|--------|---------|
| SSL Rating | A+ | Pending |
| Security Headers | A+ | Configured |
| Response Time | <2s | Optimized |
| Uptime | 99.9% | Monitoring |
| Vulnerability Scan | Pass | Ready |

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

## 🆘 Support

For security concerns or questions:
- Email: security@disasterrecovery.com.au
- Emergency: 1300 309 361
- Documentation: This guide + SECURITY_AUDIT_REPORT.md

---

**Last Updated**: September 2025
**Next Review**: October 2025
**Status**: Implementation Ready