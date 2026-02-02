# Stripe Configuration Guide - UNI-159

**Time Required:** 20-30 minutes
**Cost:** FREE (test mode)

---

## 📋 What You'll Create

By the end of this guide, you'll have:
- ✅ Stripe test account
- ✅ 3 subscription products (BASIC, PRO, ENTERPRISE)
- ✅ API keys configured
- ✅ Ready to test billing integration

---

## Step 1: Create/Access Stripe Account (5 minutes)

### 1.1 Sign Up or Log In
1. Go to: **https://dashboard.stripe.com**
2. **If new:** Click "Sign up" and create account (no credit card needed for test mode)
3. **If existing:** Log in with your credentials

### 1.2 Enable Test Mode
1. Look at **top-right corner** of dashboard
2. Toggle should show: **"Test mode"**
3. If it says "Live mode", click the toggle to switch to Test mode

---

## Step 2: Get API Keys (3 minutes)

### 2.1 Navigate to API Keys
1. In Stripe Dashboard, click **"Developers"** in left sidebar
2. Click **"API keys"**

### 2.2 Copy Your Keys
You'll see two types of keys:

**Publishable Key** (starts with `pk_test_`)
```
pk_test_51Abc...
```
- Safe to expose in frontend
- Click "Reveal test key" if hidden
- **Copy this entire key**

**Secret Key** (starts with `sk_test_`)
```
sk_test_51Abc...
```
- NEVER expose this publicly!
- Click "Reveal test key" if hidden
- **Copy this entire key**

### 2.3 Add to Environment File

Open `apps/web/.env` and add these lines:

```bash
# Stripe API Keys (Test Mode)
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"
```

**Replace** `YOUR_SECRET_KEY_HERE` and `YOUR_PUBLISHABLE_KEY_HERE` with the actual keys you copied.

---

## Step 3: Create Subscription Products (15 minutes)

You need to create 3 products in Stripe, one for each subscription tier.

### 3.1 Navigate to Products
1. In Stripe Dashboard, click **"Products"** in left sidebar (or **"More" → "Product Catalog"**)
2. Click **"+ Add product"** button

### 3.2 Create BASIC Tier Product

Fill in the form:

**Product Information:**
- **Name:** `Tenant Subscription - BASIC`
- **Description:** `Basic tier for small teams (10 users, 50 requests/month)`

**Pricing:**
- **Price:** `49`
- **Currency:** `AUD`
- **Billing period:** Recurring
- **Billing frequency:** Monthly

Click **"Save product"**

### 3.3 Copy BASIC Price ID

1. Click on the price (e.g., "A$49.00 / month")
2. Copy **Price ID**: `price_...`
3. Add to `apps/web/.env`:

```bash
STRIPE_TENANT_BASIC_PRICE_ID="price_YOUR_BASIC_PRICE_ID_HERE"
```

### 3.4 Create PRO Tier - $199/month

Create another product with:
- **Name:** `Tenant Subscription - PRO`
- **Price:** `199 AUD/month`
- Copy Price ID to .env as `STRIPE_TENANT_PRO_PRICE_ID`

### 3.5 Create ENTERPRISE Tier - $999/month

Create final product with:
- **Name:** `Tenant Subscription - ENTERPRISE`
- **Price:** `999 AUD/month`
- Copy Price ID to .env as `STRIPE_TENANT_ENTERPRISE_PRICE_ID`

---

## ✅ Final .env Configuration

Your `apps/web/.env` should look like this:

```bash
# Database (existing)
DATABASE_URL="postgresql://..."

# Stripe (NEW)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_TENANT_BASIC_PRICE_ID="price_..."
STRIPE_TENANT_PRO_PRICE_ID="price_..."
STRIPE_TENANT_ENTERPRISE_PRICE_ID="price_..."
```

**Let me know when you've added all 5 Stripe environment variables!**
