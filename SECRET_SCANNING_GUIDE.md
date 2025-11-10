# 🔒 Secret Scanning Infrastructure Guide

**Version:** 1.0.0
**Last Updated:** 2025-11-10
**Maintainer:** Security Team

---

## Overview

This project has **4-layer secret detection** to prevent credentials from being committed to the repository:

1. **Pre-commit hooks** (Local - Husky + Secretlint)
2. **CI/CD scanning** (GitHub Actions - TruffleHog + GitGuardian)
3. **Dependency auditing** (npm audit)
4. **ESLint security rules** (Static analysis)

**Incident that triggered this:** SECU-001 - Production secrets found in `.env.production` (2025-11-10)

---

## 🚀 Quick Start

### For Developers

**1. Install dependencies:**
```bash
npm install
```

**2. Install Husky hooks:**
```bash
npm run prepare
```

**3. Verify pre-commit hook works:**
```bash
# Try to commit a file with "password=secret123"
echo "password=secret123" > test-secret.txt
git add test-secret.txt
git commit -m "test"
# Should FAIL with secret detection error ✅
```

**4. Run manual security scan:**
```bash
npm run security:scan
```

---

## 🛡️ Layer 1: Pre-Commit Hooks (Local)

**Location:** `.husky/pre-commit`

### What It Checks

1. **Secretlint scan** - Detects 20+ secret patterns (API keys, passwords, tokens)
2. **ESLint security rules** - JavaScript/TypeScript security issues
3. **`.env` file detection** - Blocks any `.env*` files (except `.env.example`)
4. **Hardcoded credentials** - Regex patterns for `api_key=`, `password=`, etc.

### How to Run Manually

```bash
# Full security scan
npm run security:scan

# Just secret detection
npm run security:secrets

# Just dependency vulnerabilities
npm run security:deps

# Just ESLint security
npm run security:lint
```

### Bypass Pre-Commit (Emergency Only!)

```bash
git commit --no-verify -m "Emergency fix"
```

⚠️ **WARNING:** Only use `--no-verify` if you're 100% certain no secrets are present!

---

## 🤖 Layer 2: CI/CD Scanning (GitHub Actions)

**Location:** `.github/workflows/security-scan.yml`

### What It Scans

| Tool | Scans For | Verified Only | Frequency |
|------|-----------|---------------|-----------|
| **TruffleHog** | Git history secrets | ✅ Yes | Every push |
| **GitGuardian** | 350+ secret types | ✅ Yes | Every push |
| **Secretlint** | Hardcoded credentials | ❌ All patterns | Every push |
| **npm audit** | Dependency vulnerabilities | N/A | Every push + weekly |
| **ESLint Security** | Code security issues | N/A | Every push |

### Triggers

- ✅ Every `git push` to any branch
- ✅ Every pull request to `main`, `master`, or `develop`
- ✅ Weekly schedule (Mondays at 9 AM UTC)
- ✅ Manual workflow dispatch

### Viewing Results

**GitHub Actions:**
1. Go to: https://github.com/CleanExpo/DR-New/actions
2. Click on "Security Scanning"
3. View latest run results

**Security Summary:**
- Automatically posted to PR comments
- Available in GitHub Actions summary tab
- Artifacts saved for 30 days

---

## 📋 Layer 3: Dependency Auditing

**Tool:** `npm audit`

### Automatic Checks

```bash
# Check for moderate+ vulnerabilities
npm run security:deps

# Auto-fix vulnerabilities (if possible)
npm run security:deps:fix
```

### What Gets Audited

- Direct dependencies (from `package.json`)
- Transitive dependencies (from `package-lock.json`)
- Severity levels: Critical, High, Moderate, Low

### CI/CD Integration

- Runs on every push
- Fails build if **Critical** vulnerabilities found
- Generates JSON report (saved as artifact)

---

## 🔍 Layer 4: ESLint Security Rules

**Configuration:** `.eslintrc.json`

### Security Rules Enabled

```json
{
  "extends": [
    "plugin:security/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/click-events-have-key-events": "warn"
  }
}
```

### Manual Scan

```bash
npm run security:lint
```

---

## 🔧 Configuration Files

### `.secretlintrc.json`

**Detects:**
- AWS credentials (Access Keys, Secret Keys)
- GCP credentials (API Keys, Service Account Keys)
- Private keys (RSA, SSH, PGP)
- Basic auth credentials
- Generic secrets (passwords, tokens)

**Ignores:**
- `node_modules/`
- `.next/`, `dist/`, `build/`
- `*.min.js`, `*.map`
- `.env.example`, `.env.training.example`
- `SECURITY_INCIDENT_*.md`

### `.trufflehog.yml`

**Custom Detectors:**
- NextAuth secrets (`NEXTAUTH_SECRET`)
- Google OAuth (`GOOGLE_CLIENT_SECRET`)
- Google API keys (`AIza...`)
- Stripe keys (`sk_test_...`, `sk_live_...`)
- SendGrid keys (`SG.`)
- Twilio tokens

**Allowlist:**
- Example keys in documentation (`your-api-key-here`)
- Test/mock credentials (`test-api-key`)

---

## 📊 Scanning Results

### Success Output

```bash
✅ All security checks passed!

🔒 Security Scan Results
| Scan Type                   | Status  |
|-----------------------------|---------|
| TruffleHog Secret Scan      | success |
| Dependency Vulnerabilities  | success |
| ESLint Security             | success |
| Secretlint                  | success |
```

### Failure Output

```bash
❌ Secret detection failed!

Found secrets:
- file: .env.production
  line: 8
  secret: GOOGLE_CLIENT_SECRET=GOCSPX-...
  detector: Google OAuth

Action: Remove the secret and commit again.
```

---

## 🚨 What to Do If Secrets Are Detected

### 1. **Pre-Commit Hook Blocks Commit**

```bash
# Remove the secret from staged files
git reset HEAD <file>

# Edit the file to remove the secret
vim <file>

# Use environment variables instead
export GOOGLE_API_KEY="your-key-here"
# OR add to .env.local (gitignored)

# Re-add and commit
git add <file>
git commit -m "fix: use environment variables"
```

### 2. **CI/CD Fails on Push**

**If secret is in latest commit:**
```bash
# Amend the commit to remove the secret
git reset HEAD~1
# Remove secret from file
vim <file>
git add <file>
git commit -m "fix: remove hardcoded secret"
git push --force-with-lease
```

**If secret is in git history:**
```bash
# Use BFG Repo-Cleaner (see SECURITY_INCIDENT_2025-11-10.md)
bfg --delete-files .env.production
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

### 3. **Secret Was Already Pushed**

🚨 **CRITICAL ACTIONS REQUIRED:**

1. **Immediately rotate the exposed secret**
   - Google OAuth: Regenerate in Cloud Console
   - API Keys: Delete old key, create new
   - NextAuth: Generate new with `openssl rand -base64 32`

2. **Update environment variables**
   - Vercel Dashboard → Environment Variables
   - Update all environments (Production, Preview, Development)

3. **Clean git history** (optional but recommended)
   - See `SECURITY_INCIDENT_2025-11-10.md` for detailed steps

4. **Create incident report**
   - Document what was exposed
   - Timeline of exposure
   - Actions taken

---

## 🔐 Best Practices

### ✅ DO

- ✅ Use environment variables (`process.env.API_KEY`)
- ✅ Store secrets in `.env.local` (gitignored)
- ✅ Use Vercel environment variables for production
- ✅ Generate strong secrets: `openssl rand -base64 32`
- ✅ Rotate secrets immediately if exposed
- ✅ Review security scan results before merging PRs
- ✅ Run `npm run security:scan` before pushing

### ❌ DON'T

- ❌ Commit any `.env*` files (except `.env.example`)
- ❌ Hardcode API keys, passwords, or tokens
- ❌ Use `--no-verify` to bypass pre-commit hooks (unless emergency)
- ❌ Push directly to `main` without PR review
- ❌ Ignore security scan failures in CI/CD
- ❌ Store secrets in code comments
- ❌ Share secrets via Slack/email

---

## 📖 Additional Resources

### Documentation

- **TruffleHog:** https://github.com/trufflesecurity/trufflehog
- **GitGuardian:** https://docs.gitguardian.com/
- **Secretlint:** https://github.com/secretlint/secretlint
- **npm audit:** https://docs.npmjs.com/cli/v10/commands/npm-audit
- **Husky:** https://typicode.github.io/husky/

### Incident Reports

- **SECU-001 (2025-11-10):** `SECURITY_INCIDENT_2025-11-10.md`

### Internal Policies

- Secret rotation policy: Every 90 days or immediately if exposed
- Access control: Limit repository access to essential team members
- Code review: All PRs require security review before merge

---

## 🛠️ Troubleshooting

### "secretlint command not found"

```bash
npm install -g @secretlint/secretlint @secretlint/secretlint-rule-preset-recommend
```

### "Husky hooks not running"

```bash
npm run prepare
chmod +x .husky/pre-commit
```

### "False positive in secret detection"

Add to `.secretlintrc.json`:
```json
{
  "allowMessageIds": ["example-key-in-docs"]
}
```

### "Need to commit urgently but hook is blocking"

```bash
# ONLY IF YOU'RE 100% SURE NO SECRETS
git commit --no-verify -m "Emergency fix"

# Then run security scan manually ASAP
npm run security:scan
```

---

## 📞 Support

**Security Team:** security@disasterrecovery.com.au
**Escalation:** CTO/Technical Lead
**Emergency:** Immediately rotate exposed secrets (see guide above)

---

**Generated:** 2025-11-10 by Advanced Engineering Skills Agent
**Next Review:** 2025-12-10 (monthly security infrastructure review)
