# QA Test Environment Setup Guide

**Project:** DR-NRPG Platform
**Purpose:** Manual QA Testing (BACKLOG-001)
**Estimated Setup Time:** 2-4 hours
**Date Created:** 2026-02-06
**Status:** 🟢 Ready for Execution

---

## 📋 Prerequisites

### Required Software
- [x] Node.js v18+ installed
- [x] npm v9+ installed
- [x] Git installed
- [ ] Multiple browsers installed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile emulators or physical devices available

### Required Accounts
- [ ] Stripe Test Account (https://stripe.com/test)
- [ ] Mailtrap Account (https://mailtrap.io) or similar email testing service
- [ ] Supabase Project Access (for database)

### Repository Access
- [x] DR-NRPG repository cloned
- [x] On `main` branch with latest changes

---

## 🚀 Step 1: Environment Configuration

### 1.1 Copy Environment Template

```bash
# Navigate to project root
cd "D:\Disaster Recovery - NRP"

# Verify .env.local exists (already configured in this project)
ls -la .env.local
```

### 1.2 Configure Test Mode Variables

Verify/Update the following in `.env.local`:

#### Database Configuration (✅ Already Configured)
```env
DATABASE_URL="postgresql://..."  # Supabase pooled connection
DIRECT_URL="postgresql://..."     # Supabase direct connection
```

#### Stripe Test Mode (⏳ Needs Update for Testing)
```env
# Use Stripe TEST keys (pk_test_xxx, sk_test_xxx)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_RESTRICTED_KEY="rk_test_..."
```

**How to get Stripe test keys:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy "Publishable key" → `STRIPE_PUBLISHABLE_KEY`
3. Copy "Secret key" → `STRIPE_SECRET_KEY`
4. Create restricted key → `STRIPE_RESTRICTED_KEY`

#### Email Testing Service (⏳ Needs Setup)
```env
EMAIL_PROVIDER="mailtrap"
MAILTRAP_API_TOKEN="your_mailtrap_token"
MAILTRAP_INBOX_ID="your_inbox_id"
EMAIL_FROM="test@disasterrecovery.com.au"
EMAIL_FROM_NAME="NRPG Test"
```

**How to setup Mailtrap:**
1. Go to https://mailtrap.io
2. Create free account
3. Create new inbox "DR-NRPG QA Testing"
4. Copy SMTP credentials or API token
5. Update .env.local

**Alternative: Use SendGrid Test Mode**
```env
EMAIL_PROVIDER="sendgrid"
SENDGRID_API_KEY="SG.test_key"  # Use sandbox mode
EMAIL_FROM="test@disasterrecovery.com.au"
```

#### NextAuth Configuration (✅ Already Configured)
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."  # Already set
```

#### Supabase Realtime (✅ Already Configured)
```env
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

---

## 🗄️ Step 2: Database Setup

### 2.1 Apply Database Migrations

```bash
cd apps/web

# Apply latest Prisma migrations
npx prisma migrate deploy

# Verify schema is up to date
npx prisma migrate status
```

Expected output:
```
✓ Database schema is up to date!
```

### 2.2 Seed Test Database

```bash
# Run database seed script
npx prisma db seed

# This will create:
# - Test admin user
# - Test contractor users (3-5)
# - Test client users (3-5)
# - Test claims (10-15)
# - Test bookings (5-10)
# - Test contractor profiles
# - Admin preferences
```

**Verify seeding:**
```bash
# Open Prisma Studio to inspect data
npx prisma studio
```

Check tables:
- `User` - Should have 10+ test users
- `Contractor` - Should have 3-5 contractor profiles
- `PublicClaim` - Should have 10-15 test claims
- `Booking` - Should have 5-10 test bookings

### 2.3 Note Test User Credentials

After seeding, note the test user credentials (usually output in console):

**Admin User:**
```
Email: admin@test.com
Password: [check seed.ts output]
```

**Contractor User:**
```
Email: contractor@test.com
Password: [check seed.ts output]
```

**Client User:**
```
Email: client@test.com
Password: [check seed.ts output]
```

---

## 🌐 Step 3: Start Development Server

### 3.1 Install Dependencies

```bash
cd apps/web

# Install all dependencies
npm install

# Verify no vulnerabilities
npm audit
```

### 3.2 Build Check (Optional but Recommended)

```bash
# Verify build works
npm run build

# Expected: Build completes without errors
```

### 3.3 Start Development Server

```bash
# Start Next.js development server
npm run dev
```

Expected output:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in 3.5s
```

**Verification:**
1. Open browser: http://localhost:3000
2. Should see homepage loading
3. No console errors in browser DevTools

---

## 💳 Step 4: Configure Stripe Test Mode

### 4.1 Enable Test Mode in Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Toggle "Test Mode" in top-right corner (should be ON)
3. Verify you're in test environment

### 4.2 Create Test Payment Methods

**Test Card Numbers:**
```
# Successful payment
4242 4242 4242 4242  (Visa)

# Payment requires authentication
4000 0025 0000 3155  (Visa)

# Payment declined
4000 0000 0000 9995  (Visa)

# Expiry: Any future date (e.g., 12/34)
# CVC: Any 3 digits (e.g., 123)
# ZIP: Any 5 digits (e.g., 12345)
```

### 4.3 Setup Stripe Webhooks (Local Testing)

```bash
# Install Stripe CLI (if not installed)
# Windows: Use installer from stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Note the webhook signing secret (whsec_xxx)
# Update .env.local:
# STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

**Alternative: Use Stripe Dashboard Webhooks**
- Create webhook pointing to ngrok URL: https://your-id.ngrok.io/api/webhooks/stripe
- Select events: `payment_intent.succeeded`, `charge.succeeded`, `customer.created`

---

## 📧 Step 5: Email Testing Setup

### Option A: Mailtrap (Recommended)

1. **Create Mailtrap Inbox**
   - Go to https://mailtrap.io/inboxes
   - Click "Add Inbox"
   - Name: "DR-NRPG QA Testing"

2. **Get SMTP/API Credentials**
   - Click on inbox
   - Go to "SMTP Settings" or "API"
   - Copy credentials

3. **Update .env.local**
```env
EMAIL_PROVIDER="smtp"
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="your_mailtrap_user"
SMTP_PASS="your_mailtrap_pass"
EMAIL_FROM="test@disasterrecovery.com.au"
```

4. **Test Email Sending**
```bash
# Restart dev server to pick up new env vars
# Trigger an email (e.g., register new user)
# Check Mailtrap inbox for received email
```

### Option B: SendGrid Sandbox

1. **Enable SendGrid Sandbox Mode**
   - Go to SendGrid dashboard
   - Use sandbox API key

2. **Update .env.local**
```env
EMAIL_PROVIDER="sendgrid"
SENDGRID_API_KEY="SG.sandbox_key"
EMAIL_FROM="test@disasterrecovery.com.au"
```

---

## 🌍 Step 6: Browser & Device Setup

### 6.1 Install Required Browsers

**Desktop Browsers (All platforms):**
- [x] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Microsoft Edge (latest)
- [ ] Safari (macOS only)

**Installation:**
```bash
# Windows (via Chocolatey)
choco install googlechrome firefox microsoft-edge

# macOS (via Homebrew)
brew install --cask google-chrome firefox microsoft-edge

# Linux
sudo apt install google-chrome-stable firefox
```

### 6.2 Mobile Emulators

**Chrome DevTools Mobile Emulation:**
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test devices:
   - iPhone 12 Pro (390x844)
   - Samsung Galaxy S21 (360x800)
   - iPad Pro (1024x1366)

**Physical Devices (Optional):**
- iPhone (iOS 15+)
- Android Phone (Android 11+)
- iPad/Tablet

### 6.3 Browser Extensions for Testing

**Recommended Extensions:**
1. **React Developer Tools** - Inspect React components
2. **Redux DevTools** - Inspect state (if using Redux)
3. **Lighthouse** - Performance audits
4. **WAVE** - Accessibility testing

---

## 📊 Step 7: Monitoring & Logging Setup

### 7.1 Enable Debug Logging

Update `.env.local`:
```env
# Enable debug mode
NODE_ENV="development"
NEXT_PUBLIC_DEBUG="true"

# Enable verbose logging
LOG_LEVEL="debug"
```

### 7.2 Browser DevTools Setup

**Chrome DevTools Settings:**
1. Open DevTools (F12)
2. Go to Settings (⚙️)
3. Enable:
   - ✅ Preserve log
   - ✅ Disable cache (while DevTools is open)
   - ✅ Show timestamps

**Console Filters:**
- Filter by: `[API]`, `[Error]`, `[Warning]`

### 7.3 Network Monitoring

**Track API Calls:**
1. Open Network tab
2. Filter: `XHR` or `Fetch`
3. Monitor:
   - Response times
   - Status codes (200, 400, 500)
   - Payload sizes

---

## 🧪 Step 8: Test Data Preparation

### 8.1 Create Test User Accounts

**Option 1: Use Seeded Accounts**
- Admin: `admin@test.com`
- Contractor: `contractor@test.com`
- Client: `client@test.com`

**Option 2: Create Fresh Accounts**
```bash
# Register via UI at http://localhost:3000/register
# Or use seed script to create specific scenarios
```

### 8.2 Create Test Claims

**Via UI:**
1. Login as client (`client@test.com`)
2. Navigate to "Submit Claim"
3. Create test claims:
   - Emergency water damage
   - Standard fire damage
   - Non-urgent mould remediation

**Via Database:**
```sql
-- Run in Prisma Studio or SQL client
INSERT INTO "PublicClaim" (
  "userId", "tenantId", "damageType", "urgency",
  "status", "suburb", "postcode", "state", ...
) VALUES (...);
```

### 8.3 Prepare Test Contractors

**Verify Contractor Profiles:**
1. Login as admin
2. Navigate to "Contractors"
3. Verify 3-5 test contractors exist
4. Ensure contractors have:
   - IICRC certification
   - Verified status
   - Stripe Connect account (test mode)

---

## ✅ Step 9: Environment Verification

### 9.1 Verification Checklist

Run through this checklist before starting QA testing:

**Database:**
- [x] Prisma migrations applied
- [ ] Database seeded with test data
- [ ] Prisma Studio accessible
- [ ] Test users exist in User table

**Development Server:**
- [ ] `npm run dev` running without errors
- [ ] http://localhost:3000 accessible
- [ ] No console errors on homepage
- [ ] API routes responding (check Network tab)

**Stripe:**
- [ ] Test mode enabled in Stripe dashboard
- [ ] Test API keys in .env.local
- [ ] Webhook forwarding active (if testing payments)
- [ ] Test card numbers verified

**Email:**
- [ ] Mailtrap/SendGrid configured
- [ ] Test email sent and received
- [ ] Email templates rendering correctly

**Browsers:**
- [ ] Chrome installed and working
- [ ] Firefox installed
- [ ] Edge installed
- [ ] Safari available (macOS)
- [ ] Mobile emulators configured

**Test Accounts:**
- [ ] Admin account accessible
- [ ] Contractor account accessible
- [ ] Client account accessible
- [ ] Passwords documented

### 9.2 Smoke Test

Run quick smoke test to verify setup:

1. **Homepage Load** (http://localhost:3000)
   - ✅ Page loads without errors
   - ✅ Images load
   - ✅ No console errors

2. **Login Flow**
   - ✅ Navigate to /login
   - ✅ Login with test account
   - ✅ Redirect to dashboard
   - ✅ Session persists

3. **API Test**
   - ✅ Open Network tab
   - ✅ Trigger API call (e.g., load dashboard)
   - ✅ API responds with 200 status
   - ✅ Response time <500ms

4. **Database Test**
   - ✅ Open Prisma Studio
   - ✅ Query User table
   - ✅ Data visible

5. **Email Test** (Optional)
   - ✅ Trigger email (e.g., password reset)
   - ✅ Check Mailtrap inbox
   - ✅ Email received within 30 seconds

---

## 🐛 Step 10: Bug Tracking Setup

### 10.1 Create Bug Tracking Spreadsheet

Create `QA_BUG_TRACKER.xlsx` with columns:

| Column | Description |
|--------|-------------|
| Bug ID | Unique identifier (e.g., BUG-001) |
| Date Found | Discovery date |
| Test Case | Related test case |
| Severity | Critical / High / Medium / Low |
| Priority | P0 / P1 / P2 / P3 |
| Title | Brief description |
| Description | Detailed reproduction steps |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Browser | Browser/device where found |
| Screenshot | Link to screenshot |
| Status | Open / In Progress / Fixed / Closed |
| Assigned To | Developer assigned |
| Fixed In | Commit/PR that fixed it |

### 10.2 Screenshot Tool

**Windows:**
- Use Snipping Tool (Win + Shift + S)
- Save to `qa-screenshots/` folder

**macOS:**
- Use Screenshot tool (Cmd + Shift + 5)

**Browser Extension:**
- Install "Awesome Screenshot" or "Nimbus Screenshot"

---

## 📝 Step 11: Review Test Plan

### 11.1 Read QA_TEST_PLAN.md

```bash
# Open test plan (once created)
code QA_TEST_PLAN.md
```

**Review:**
- 9 test areas
- 29 test steps
- Acceptance criteria
- Expected outcomes

### 11.2 Prepare Test Execution Spreadsheet

Create `QA_TEST_EXECUTION.xlsx`:

| Test ID | Test Case | Status | Pass/Fail | Notes | Tester | Date |
|---------|-----------|--------|-----------|-------|--------|------|
| TC-001 | Contractor Registration | ⏳ | - | - | - | - |
| TC-002 | Claim Submission | ⏳ | - | - | - | - |
| ... | ... | ... | ... | ... | ... | ... |

---

## 🎯 Next Steps

### Once Environment Setup is Complete:

1. **Validate All Checklist Items**
   - Go through verification checklist above
   - Ensure all items are checked ✅

2. **Run Smoke Tests**
   - Execute all 5 smoke tests
   - Document any issues

3. **Begin Manual QA Testing**
   - Start with Test Area 1: Contractor Onboarding
   - Follow test cases in QA_TEST_PLAN.md
   - Document results in QA_TEST_EXECUTION.xlsx

4. **Report Issues**
   - Log bugs in QA_BUG_TRACKER.xlsx
   - Take screenshots for each bug
   - Assign severity and priority

---

## 🆘 Troubleshooting

### Development Server Won't Start

**Error: Port 3000 already in use**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

**Error: Environment variables missing**
```bash
# Verify .env.local exists
ls -la .env.local

# Copy from template if missing
cp .env.example .env.local

# Edit .env.local with correct values
```

### Database Connection Issues

**Error: Cannot connect to database**
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db push --preview-feature

# Check Supabase dashboard for connection string
```

### Stripe Webhook Issues

**Error: Webhooks not working**
```bash
# Verify Stripe CLI is running
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check webhook secret matches .env.local
echo $STRIPE_WEBHOOK_SECRET

# Test webhook
stripe trigger payment_intent.succeeded
```

### Email Not Sending

**Error: Emails not received in Mailtrap**
```bash
# Verify SMTP credentials
echo $SMTP_HOST
echo $SMTP_USER

# Check Mailtrap inbox
# Verify email provider is set correctly
echo $EMAIL_PROVIDER

# Restart dev server after env changes
```

---

## 📚 Additional Resources

### Documentation
- **Project README:** `README.md`
- **API Documentation:** `docs/API.md`
- **Architecture Overview:** `FINAL_HANDOVER.md`
- **Performance Baseline:** `PERFORMANCE-OPTIMIZATION.md`

### External Links
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Stripe Testing:** https://stripe.com/docs/testing
- **Mailtrap Guide:** https://mailtrap.io/blog/nodejs-send-email/

---

## ✅ Setup Complete Checklist

Before starting manual QA testing, ensure:

- [ ] All environment variables configured in .env.local
- [ ] Database migrations applied successfully
- [ ] Database seeded with test data
- [ ] Development server running (npm run dev)
- [ ] Stripe test mode configured
- [ ] Email testing service setup (Mailtrap)
- [ ] All browsers installed (Chrome, Firefox, Edge)
- [ ] Mobile emulators configured
- [ ] Test user accounts created
- [ ] Bug tracking spreadsheet ready
- [ ] QA_TEST_PLAN.md reviewed
- [ ] Smoke tests passed

**Once all items checked, proceed to BACKLOG-001 Manual QA Testing!**

---

**Environment Setup By:** Engineering Team
**Date:** 2026-02-06
**Status:** ✅ Documentation Complete - Ready for Execution
**Next Step:** Execute QA_TEST_PLAN.md test cases
