# Stripe Configuration Guide for UNI-159

## Step 1: Create Stripe Test Account

1. Go to https://dashboard.stripe.com/register
2. Sign up for a free account (or log in if you have one)
3. Make sure you're in **Test Mode** (toggle in the left sidebar should say "Test mode")

## Step 2: Get API Keys

1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy the following keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

## Step 3: Create Tenant Subscription Products

### Create BASIC Tier Product

1. Go to **Products** → **Add product**
2. Fill in:
   - **Name**: `Tenant Subscription - BASIC`
   - **Description**: `Basic tier for small teams (10 users, 50 requests/month)`
   - **Pricing model**: Recurring
   - **Price**: `$49` AUD (or your preferred price)
   - **Billing period**: Monthly
3. Click **Save product**
4. **Copy the Price ID** (starts with `price_`) from the pricing section

### Create PRO Tier Product

1. Go to **Products** → **Add product**
2. Fill in:
   - **Name**: `Tenant Subscription - PRO`
   - **Description**: `Pro tier for growing teams (50 users, 500 requests/month, custom domain)`
   - **Pricing model**: Recurring
   - **Price**: `$199` AUD
   - **Billing period**: Monthly
3. Click **Save product**
4. **Copy the Price ID**

### Create ENTERPRISE Tier Product

1. Go to **Products** → **Add product**
2. Fill in:
   - **Name**: `Tenant Subscription - ENTERPRISE`
   - **Description**: `Enterprise tier for large organizations (unlimited users/requests, SLA)`
   - **Pricing model**: Recurring
   - **Price**: `$999` AUD
   - **Billing period**: Monthly
3. Click **Save product**
4. **Copy the Price ID**

## Step 4: Configure Webhook Endpoint (For Later)

**Note**: We'll set this up after the application is deployed. For now, we can test without webhooks.

For production:
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe/tenant`
4. **Events to send**: Select:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
5. Click **Add endpoint**
6. **Copy the Signing secret** (starts with `whsec_`)

## Step 5: Update Environment Variables

Add these to `apps/web/.env`:

```bash
# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"

# Tenant Subscription Price IDs
STRIPE_TENANT_BASIC_PRICE_ID="price_YOUR_BASIC_PRICE_ID"
STRIPE_TENANT_PRO_PRICE_ID="price_YOUR_PRO_PRICE_ID"
STRIPE_TENANT_ENTERPRISE_PRICE_ID="price_YOUR_ENTERPRISE_PRICE_ID"

# Webhook Secrets (optional for testing)
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PAYMENTS_WEBHOOK_SECRET="whsec_..."
STRIPE_TENANT_WEBHOOK_SECRET="whsec_..."
```

## Step 6: Verify Configuration

Once you've added the environment variables, I'll:
1. Run the Stripe test suite (44 tests)
2. Verify all integration points work
3. Generate a completion report

## Quick Checklist

- [ ] Stripe account created (Test mode enabled)
- [ ] API keys copied (pk_test_*, sk_test_*)
- [ ] BASIC product created (price ID copied)
- [ ] PRO product created (price ID copied)
- [ ] ENTERPRISE product created (price ID copied)
- [ ] Environment variables added to `apps/web/.env`
- [ ] Ready to run tests

---

**Estimated Time**: 15-20 minutes

**Next**: Once you complete the checklist, let me know and I'll run the test suite to verify everything works!
