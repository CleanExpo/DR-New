# 🚀 DR-New Build Process & Deployment Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Development Setup](#development-setup)
3. [Build Process](#build-process)
4. [Testing & Validation](#testing--validation)
5. [Deployment Checklist](#deployment-checklist)
6. [Common Issues & Fixes](#common-issues--fixes)
7. [Rollback Procedures](#rollback-procedures)

---

## 📌 Project Overview

**Repository:** https://github.com/CleanExpo/DR-New.git
**Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
**Business:** Disaster Recovery Brisbane - Direct Service Provider

## 🛠 Development Setup

### Prerequisites
```bash
# Required versions
Node.js: 18.x or higher
npm: 9.x or higher
Git: 2.x or higher
```

### Initial Setup
```bash
# Clone repository
git clone https://github.com/CleanExpo/DR-New.git
cd DR-New

# Install dependencies
npm install

# Copy environment variables (if exists)
cp .env.example .env.local

# Start development server
npm run dev
```

## 🏗 Build Process

### Development Build
```bash
# Run development server with hot reload
npm run dev
# Access at: http://localhost:3000
```

### Production Build
```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
# Access at: http://localhost:3000
```

### Build Commands Reference
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript validation
npm run lighthouse   # Performance audit
```

## ✅ Testing & Validation

### Pre-Deployment Checklist

#### 1. Code Quality Checks
```bash
# Run all checks before deployment
npm run lint
npm run type-check
npm run build
```

#### 2. Content Verification
- [ ] All "1 hour" claims replaced with "Rapid Triage System"
- [ ] Australian English spelling throughout
- [ ] Phone number (1300 309 361) consistent
- [ ] Service areas correct (Brisbane, Ipswich, Logan)
- [ ] Pricing information accurate ($330-$4,400)

#### 3. Navigation Tests
- [ ] Logo links to homepage
- [ ] All pillar pages accessible
- [ ] Mobile menu functional
- [ ] Pricing page linked in navigation

#### 4. Page Load Tests
```bash
# Test critical pages
/ (Homepage)
/pricing
/services/water-damage-restoration
/services/fire-damage-restoration
/faq
/contact
```

#### 5. API Endpoints
Verify these endpoints return 200:
- `/api/weather/alerts`
- `/api/analytics/realtime`
- `/api/chatbot/process`

## 📝 Deployment Checklist

### Pre-Deployment
1. **Git Status**
   ```bash
   git status
   git pull origin main
   ```

2. **Environment Variables**
   - Verify `.env.production` contains all required variables
   - Update API keys if needed
   - Check CORS settings

3. **Build Test**
   ```bash
   npm run build
   npm run start
   ```

4. **Performance Audit**
   ```bash
   npm run lighthouse
   ```
   Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 100
   - SEO: 100

### Deployment Steps

#### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy to production
vercel --prod

# Or use GitHub integration for automatic deployments
```

#### Manual Deployment
```bash
# Build the application
npm run build

# Upload .next, public, package.json to server
# On server:
npm install --production
npm run start
```

## 🔧 Common Issues & Fixes

### Issue 1: CSRF Token Failures
**Symptom:** 403 Forbidden on API calls
**Fix:**
```javascript
// Check middleware.ts for CSRF configuration
// Ensure proper headers in API requests
```

### Issue 2: Hydration Errors
**Symptom:** "Text content does not match server-rendered HTML"
**Fix:**
```jsx
// Add suppressHydrationWarning to dynamic content
<div suppressHydrationWarning>
  {dynamicContent}
</div>
```

### Issue 3: API Rate Limiting
**Symptom:** 429 Too Many Requests
**Fix:**
```javascript
// Implement proper throttling
const MINIMUM_INTERVAL = 10000; // 10 seconds
```

### Issue 4: Build Failures
**Symptom:** Build errors on deployment
**Fix:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Issue 5: MCP Server Issues (Windows)
**Symptom:** MCP servers not working
**Fix:**
```json
// Use npx.cmd instead of npx on Windows
"command": "npx.cmd"
```

## 🔄 Rollback Procedures

### Quick Rollback
```bash
# Revert to previous commit
git log --oneline -5  # View recent commits
git revert HEAD       # Revert last commit
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

### Vercel Rollback
1. Go to Vercel Dashboard
2. Select project
3. Go to Deployments
4. Click "..." on previous deployment
5. Select "Promote to Production"

## 📊 Performance Monitoring

### Key Metrics to Monitor
- **Page Load Time:** < 2.5s
- **Time to Interactive:** < 3.5s
- **First Contentful Paint:** < 1.5s
- **Cumulative Layout Shift:** < 0.1
- **API Response Times:** < 500ms

### Monitoring Tools
```bash
# Lighthouse CLI
npm run lighthouse

# Custom performance test
node scripts/performance-test.js

# Bundle analysis
ANALYZE=true npm run build
```

## 🚨 Emergency Contacts

**Development Issues:**
- Check GitHub Issues: https://github.com/CleanExpo/DR-New/issues
- Review documentation in `/docs` folder

**Production Issues:**
1. Check server logs
2. Verify environment variables
3. Test API endpoints
4. Review error tracking dashboard

## 📝 Version History

### Current Version: 2.0.0
- ✅ Pricing page implementation
- ✅ UI/UX fixes (removed 1-hour claims)
- ✅ Australian English updates
- ✅ Navigation improvements
- ✅ Schema markup for SEO
- ✅ MCP server configuration fixes
- ✅ Comprehensive integration system

### Previous Versions
- v1.0.0: Initial release with basic site structure

## 🔐 Security Checklist

Before each deployment:
- [ ] No API keys in code
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] XSS protection headers set
- [ ] HTTPS enforced

## 📚 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Project README:** /README.md
- **Claude.md:** /CLAUDE.md (AI context)

---

**Last Updated:** December 2024
**Maintained By:** Development Team
**Status:** Production Ready ✅

---

## Quick Start Commands

```bash
# Development
git pull && npm install && npm run dev

# Production Build
git pull && npm install && npm run build && npm run start

# Full Test Suite
npm run lint && npm run type-check && npm run build && npm run lighthouse
```