# 🔐 SECURITY ROTATION PLAN - SECU-001 Resolution

## 🚨 Critical Issue Summary

**Status**: HIGH PRIORITY - IMMEDIATE ACTION REQUIRED **Date**: 2025-11-10
**Incident**: Exposed credentials in `.env.production` file tracked by Git

### Exposed Credentials (COMPROMISED - DO NOT USE):

- ❌ Google OAuth Client ID: `944791662576-***.apps.googleusercontent.com`
- ❌ Google OAuth Client Secret: `GOCSPX-***`
- ❌ Google API Key: `AIzaSyA***`
- ❌ NextAuth Secret: `LMUD***`

---

## 📋 Secret Rotation Checklist

### Phase 1: Immediate Remediation (Pre-Rotation)

- [ ] 1.1 Remove `.env.production` from Git tracking
- [ ] 1.2 Update `.gitignore` to prevent future exposure
- [ ] 1.3 Add `.env.production` to Git history cleanup list
- [ ] 1.4 Create secure environment variable management system

### Phase 2: Google OAuth Credentials Rotation

- [ ] 2.1 Create new Google Cloud OAuth 2.0 credentials
- [ ] 2.2 Configure authorized redirect URIs
- [ ] 2.3 Update application with new Client ID and Secret
- [ ] 2.4 Test OAuth flow in development
- [ ] 2.5 Deploy to Vercel production
- [ ] 2.6 Verify production OAuth works
- [ ] 2.7 Delete old OAuth credentials from Google Cloud Console

### Phase 3: Google API Key Rotation

- [ ] 3.1 Create new Google API Key in Google Cloud Console
- [ ] 3.2 Restrict API key (HTTP referrers + specific APIs only)
- [ ] 3.3 Update application configuration
- [ ] 3.4 Test Maps/GMB functionality
- [ ] 3.5 Deploy to Vercel production
- [ ] 3.6 Verify production functionality
- [ ] 3.7 Delete old API key from Google Cloud Console

### Phase 4: NextAuth Secret Rotation

- [ ] 4.1 Generate new secure NextAuth secret
- [ ] 4.2 Update in development environment
- [ ] 4.3 Update in Vercel production environment
- [ ] 4.4 Test authentication flows
- [ ] 4.5 Monitor for session issues

### Phase 5: Git History Cleanup (AFTER rotation complete)

- [ ] 5.1 Backup current repository
- [ ] 5.2 Use BFG Repo-Cleaner or git-filter-repo
- [ ] 5.3 Force push cleaned history
- [ ] 5.4 Verify secrets removed from Git history
- [ ] 5.5 Notify team members to re-clone repository

### Phase 6: Verification & Documentation

- [ ] 6.1 Verify all new secrets working in production
- [ ] 6.2 Confirm old secrets are revoked/deleted
- [ ] 6.3 Document new secret management procedures
- [ ] 6.4 Update team security guidelines
- [ ] 6.5 Schedule security audit

---

## 🛡️ NEW SECURITY ARCHITECTURE

### Environment Variable Management Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     NEVER COMMIT TO GIT                      │
├─────────────────────────────────────────────────────────────┤
│  .env.local          → Local development (ignored by Git)    │
│  .env.production     → REMOVE from Git, use Vercel only     │
│  .env.test.local     → Test environment (ignored by Git)     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    SAFE TO COMMIT TO GIT                     │
├─────────────────────────────────────────────────────────────┤
│  .env.example        → Template with NO real values         │
│  .env.training.example → Training template only             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   PRODUCTION SECRETS                         │
├─────────────────────────────────────────────────────────────┤
│  Vercel Dashboard    → All production environment variables  │
│  (Settings → Environment Variables)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Google OAuth Rotation Instructions

### Step 1: Create New OAuth Credentials

1. Go to
   [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your project or create a new one
3. Click "Create Credentials" → "OAuth 2.0 Client ID"
4. Application type: "Web application"
5. Name: "DR Platform Production OAuth 2025"

### Step 2: Configure Authorized URIs

**Authorized JavaScript origins:**

```
https://dr-new-ten.vercel.app
https://disasterrecovery.com.au
http://localhost:3000
```

**Authorized redirect URIs:**

```
https://dr-new-ten.vercel.app/api/auth/callback
https://disasterrecovery.com.au/api/auth/callback
http://localhost:3000/api/auth/callback
https://dr-new-ten.vercel.app/api/gmb/callback
```

### Step 3: Note Your New Credentials

```
GOOGLE_CLIENT_ID=YOUR-NEW-CLIENT-ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR-NEW-CLIENT-SECRET
```

---

## 🔑 Google API Key Rotation Instructions

### Step 1: Create New API Key

1. Go to
   [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Note the new API key immediately

### Step 2: Restrict API Key (CRITICAL)

1. Click on the new API key to edit
2. **Application restrictions**: Set to "HTTP referrers"
3. Add your domains:

   ```
   https://dr-new-ten.vercel.app/*
   https://disasterrecovery.com.au/*
   http://localhost:3000/*
   ```

4. **API restrictions**: Restrict to specific APIs:
   - ✅ Google Maps JavaScript API
   - ✅ Maps Static API
   - ✅ Geocoding API
   - ✅ Places API
   - ✅ My Business API
   - ❌ Disable all others

### Step 3: Note Your New API Key

```
GOOGLE_API_KEY=YOUR-NEW-API-KEY
```

---

## 🔐 NextAuth Secret Generation

### Generate New Secret:

```bash
# Option 1: Using OpenSSL (Recommended)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Using PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Save the output as:

```
NEXTAUTH_SECRET=YOUR-NEW-32-CHAR-SECRET
```

---

## 🚀 Vercel Environment Variable Update

### Method 1: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `dr-new-ten`
3. Go to Settings → Environment Variables
4. Update/Add the following:

```
GOOGLE_CLIENT_ID          = [Your new Client ID]
GOOGLE_CLIENT_SECRET      = [Your new Client Secret]
GOOGLE_API_KEY           = [Your new API Key]
NEXTAUTH_SECRET          = [Your new NextAuth Secret]
NEXTAUTH_URL             = https://dr-new-ten.vercel.app
```

5. Set for: **Production, Preview, Development**
6. Click "Save"
7. Redeploy the application

### Method 2: Vercel CLI

```bash
# Login to Vercel
vercel login

# Set environment variables
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add GOOGLE_API_KEY production
vercel env add NEXTAUTH_SECRET production

# Pull environment variables to local
vercel env pull .env.local
```

---

## 🧹 Git History Cleanup (Advanced)

### Option 1: Using BFG Repo-Cleaner (Easiest)

```bash
# Install BFG
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Backup your repo first!
git clone --mirror https://github.com/CleanExpo/DR-New.git backup-repo

# Clone a fresh copy
git clone https://github.com/CleanExpo/DR-New.git
cd DR-New

# Remove .env.production from history
bfg --delete-files .env.production

# Clean up and push
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

### Option 2: Using git-filter-repo

```bash
# Install git-filter-repo
pip install git-filter-repo

# Backup first!
git clone --mirror https://github.com/CleanExpo/DR-New.git backup-repo

# Remove file from history
git filter-repo --path .env.production --invert-paths

# Force push
git push --force --all
```

---

## ⚠️ Important Security Notes

### DO NOT:

- ❌ Commit any `.env*` files (except `.env.example`)
- ❌ Share secrets in chat, email, or Slack
- ❌ Store secrets in code comments
- ❌ Use the same secrets across environments
- ❌ Leave API keys unrestricted

### DO:

- ✅ Use Vercel Dashboard for production secrets
- ✅ Use `.env.local` for local development
- ✅ Rotate secrets immediately after exposure
- ✅ Restrict API keys to specific domains/APIs
- ✅ Use secrets management tools (Vercel, Vault, etc.)
- ✅ Enable 2FA on all service accounts
- ✅ Monitor API usage for anomalies

---

## 📞 Support Contacts

**Google Cloud Support**: https://support.google.com/cloud **Vercel Support**:
https://vercel.com/support **NextAuth Documentation**: https://next-auth.js.org

---

## ✅ Completion Verification

After completing all steps:

- [ ] All old Google credentials deleted from Google Cloud Console
- [ ] All new secrets added to Vercel production
- [ ] Application tested and working in production
- [ ] `.env.production` removed from Git
- [ ] Git history cleaned (if possible)
- [ ] Team notified of new security procedures
- [ ] Security audit scheduled

---

**Created**: 2025-11-10 **Status**: READY FOR EXECUTION **Priority**: CRITICAL
