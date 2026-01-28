# UNI-159: Stripe Configuration Quickstart

**Goal:** Configure Stripe tenant-level billing for multi-tenant SaaS platform
**Time:** 20-30 minutes for setup, then run tests
**Status:** Starting fresh (no Stripe config found)

---

## 🎯 Quick Setup (4 Steps)

### Step 1: Access Stripe Dashboard (2 minutes)

1. **Go to:** https://dashboard.stripe.com
2. **Sign up** or **log in** (free account)
3. **Enable Test Mode** - Toggle in top-right should show "Test mode"

### Step 2: Get API Keys (3 minutes)

1. In Stripe Dashboard, go to: **Developers** → **API keys**
2. Copy these two keys:

**Publishable Key:**
```
pk_test_...
```
(Used in frontend, safe to expose)

**Secret Key:**
```
sk_test_...
```
(Click "Reveal test key" to see it - NEVER commit to git!)

### Step 3: Create 3 Products (15 minutes)

Go to **Products** → **Add product** and create these 3 subscription tiers:

#### 🥉 BASIC Tier
- **Name:** `Tenant Subscription - BASIC`
- **Description:** `Basic tier for small teams (10 users, 50 requests/month)`
- **Pricing:** Recurring, $49 AUD/month
- **Copy Price ID:** `price_...` ← Save this!

#### 🥈 PRO Tier
- **Name:** `Tenant Subscription - PRO`
- **Description:** `Pro tier for growing teams (50 users, 500 requests/month, custom domain)`
- **Pricing:** Recurring, $199 AUD/month
- **Copy Price ID:** `price_...` ← Save this!

#### 🥇 ENTERPRISE Tier
- **Name:** `Tenant Subscription - ENTERPRISE`
- **Description:** `Enterprise tier with unlimited users/requests and SLA guarantee`
- **Pricing:** Recurring, $999 AUD/month
- **Copy Price ID:** `price_...` ← Save this!

### Step 4: Update Environment Variables (2 minutes)

Add these to `apps/web/.env`:

```bash
# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"

# Tenant Subscription Price IDs
STRIPE_TENANT_BASIC_PRICE_ID="price_YOUR_BASIC_PRICE_ID_HERE"
STRIPE_TENANT_PRO_PRICE_ID="price_YOUR_PRO_PRICE_ID_HERE"
STRIPE_TENANT_ENTERPRISE_PRICE_ID="price_YOUR_ENTERPRISE_PRICE_ID_HERE"

# Webhook Secrets (optional for testing, we'll configure later)
# STRIPE_WEBHOOK_SECRET="whsec_..."
# STRIPE_PAYMENTS_WEBHOOK_SECRET="whsec_..."
# STRIPE_TENANT_WEBHOOK_SECRET="whsec_..."
```

---

## ✅ Verification

Once you've updated the `.env` file, I'll run:

```bash
# 1. Verify configuration
cd apps/web
npx tsx scripts/verify-stripe-config.ts

# 2. Run test suite (44 tests)
npm test -- stripe-tenant-billing.test.ts

# 3. Generate completion report
```

---

## 📋 Checklist

Copy this checklist and check off as you complete each step:

```
[ ] Step 1: Created/logged into Stripe account (Test mode enabled)
[ ] Step 2: Copied Publishable key (pk_test_...)
[ ] Step 2: Copied Secret key (sk_test_...)
[ ] Step 3: Created BASIC product (price_...)
[ ] Step 3: Created PRO product (price_...)
[ ] Step 3: Created ENTERPRISE product (price_...)
[ ] Step 4: Added all 5 environment variables to apps/web/.env
[ ] Ready for verification!
```

---

## 🎨 Pricing Recommendations (Australian Market)

**BASIC ($49/month AUD):**
- 10 users
- 50 service requests/month
- Email support
- Standard features

**PRO ($199/month AUD):**
- 50 users
- 500 service requests/month
- Priority support
- Custom domain + white-label
- API access
- Advanced analytics

**ENTERPRISE ($999/month AUD):**
- Unlimited users
- Unlimited service requests
- 24/7 phone support
- SLA guarantee (99.9% uptime)
- Dedicated account manager
- All features + custom integrations

---

## 🚀 What Happens After Configuration

Once you provide the Stripe keys and price IDs, I'll:

1. **Verify Configuration** ✅
   - Test API connectivity
   - Verify price IDs exist
   - Check product details

2. **Run Test Suite** ✅ (44 tests)
   - Customer management (3 tests)
   - Checkout sessions (6 tests)
   - Subscription lifecycle (7 tests)
   - Webhooks (11 tests)
   - Error handling (4 tests)
   - Status mapping (7 tests)
   - Price configuration (3 tests)

3. **Generate Completion Report** ✅
   - Infrastructure review
   - Test coverage summary
   - Production deployment checklist
   - Manual E2E test scenarios

4. **Mark UNI-159 Complete** ✅

**Estimated Total Time:** 4-5 hours for full completion

---

## 💡 Tips

- **Use Test Mode** - All Stripe test data can be deleted later, no real charges
- **Product Names** - Use clear naming like "Tenant Subscription - [TIER]" to distinguish from workspace subscriptions
- **AUD Currency** - Stripe supports AUD natively, no conversion needed
- **Price IDs** - These are immutable once created, save them carefully!

---

## ⚠️ Important Notes

**DO NOT:**
- ❌ Commit Stripe secret keys to git
- ❌ Use production API keys for testing
- ❌ Share secret keys in screenshots or messages

**DO:**
- ✅ Keep keys in `.env` file (already in .gitignore)
- ✅ Use test mode for all development
- ✅ Rotate keys if accidentally exposed

---

## 🆘 Need Help?

**Can't find something?**
- API Keys: Developers → API keys
- Products: Products (in sidebar)
- Test Mode Toggle: Top-right corner

**Questions?**
Let me know which step you're on and I'll help troubleshoot!

---

**Ready to start? Follow the 4 steps above, then let me know when you've added the environment variables!**
