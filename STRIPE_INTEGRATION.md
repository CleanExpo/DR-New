# Stripe Integration Documentation

## Overview

This document provides comprehensive instructions for setting up and using the Stripe payment integration in the NRPG Platform CRM.

## Features

- **Subscription Management**: Monthly recurring subscriptions with 4 pricing tiers
- **Invoice Payments**: One-time payments for invoices with 10% GST
- **Webhook Handling**: Automated event processing for subscription updates and payments
- **Customer Portal**: Self-service subscription management for contractors
- **Refund Processing**: Admin-controlled refund capabilities
- **Secure Payment Processing**: PCI-compliant payment handling via Stripe

## Pricing Structure (AUD)

| Tier | Coverage | Monthly Price | Price in Cents |
|------|----------|---------------|----------------|
| 25km Radius | 25km | $99 | 9900 |
| 50km Radius | 50km | $199 | 19900 |
| 100km Radius | 100km | $349 | 34900 |
| Rural Coverage | 200km+ | $499 | 49900 |

All prices include GST (10%).

## Setup Instructions

### 1. Create Stripe Account

1. Sign up at [https://stripe.com](https://stripe.com)
2. Complete account verification
3. Enable test mode for development

### 2. Get API Keys

1. Navigate to **Developers > API Keys** in Stripe Dashboard
2. Copy the following keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

### 3. Configure Environment Variables

Add to `.env` and `.env.production`:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Optional: Price IDs (automatically created if not set)
STRIPE_PRICE_25KM=price_xxx
STRIPE_PRICE_50KM=price_xxx
STRIPE_PRICE_100KM=price_xxx
STRIPE_PRICE_RURAL=price_xxx
```

### 4. Create Stripe Products (Optional)

If you want to pre-create products and prices in Stripe:

```bash
npx ts-node scripts/setup-stripe-products.ts
```

This will output environment variables to add to your `.env` file.

### 5. Setup Webhooks

#### Development (Local Testing)

1. Install Stripe CLI:
   ```bash
   # Windows (with Scoop)
   scoop install stripe

   # macOS
   brew install stripe/stripe-cli/stripe
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`) to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

#### Production

1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
4. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`

5. Copy the **Signing secret** to `.env.production`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

## API Endpoints

### Subscription Management

#### Create Subscription
```http
POST /api/stripe/create-subscription
Content-Type: application/json

{
  "contractorId": "contractor-uuid",
  "tier": "RADIUS_50KM"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxx",
  "clientSecret": "pi_xxx_secret_xxx"
}
```

#### Cancel Subscription
```http
POST /api/stripe/cancel-subscription
Content-Type: application/json

{
  "subscriptionId": "sub_xxx"
}
```

#### Update Subscription Tier
```http
PATCH /api/stripe/update-subscription
Content-Type: application/json

{
  "subscriptionId": "sub_xxx",
  "newTier": "RADIUS_100KM"
}
```

#### Get Subscription Status
```http
GET /api/stripe/subscription-status?subscriptionId=sub_xxx
```

#### Customer Portal
```http
POST /api/stripe/customer-portal
Content-Type: application/json

{
  "contractorId": "contractor-uuid",
  "returnUrl": "https://your-domain.com/contractor/subscription"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://billing.stripe.com/session/xxx"
}
```

### Invoice Payments

#### Create Payment Intent
```http
POST /api/stripe/create-payment-intent
Content-Type: application/json

{
  "invoiceId": "invoice-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_xxx",
  "clientSecret": "pi_xxx_secret_xxx"
}
```

#### Confirm Payment
```http
POST /api/stripe/confirm-payment
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx"
}
```

#### Process Refund (Admin Only)
```http
POST /api/stripe/refund
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx",
  "amount": 99.00  // Optional: partial refund
}
```

## Webhook Events

### Handled Events

| Event | Description | Action |
|-------|-------------|--------|
| `customer.subscription.created` | New subscription created | Update ContractorSubscription with Stripe ID |
| `customer.subscription.updated` | Subscription status changed | Update subscription status and dates |
| `customer.subscription.deleted` | Subscription cancelled | Mark as CANCELLED |
| `invoice.paid` | Subscription payment successful | Create Payment record, update billing dates |
| `invoice.payment_failed` | Payment failed | Mark subscription as PAST_DUE |
| `payment_intent.succeeded` | Invoice payment successful | Mark invoice as PAID, create Payment record |
| `payment_intent.payment_failed` | Invoice payment failed | Mark invoice as OVERDUE |
| `charge.refunded` | Refund processed | Update invoice status to REFUNDED |

### Idempotency

All webhook handlers are designed to be idempotent. The same event can be processed multiple times without creating duplicate records.

### Testing Webhooks

Use Stripe CLI to trigger test events:

```bash
# Test successful payment
stripe trigger payment_intent.succeeded

# Test failed payment
stripe trigger payment_intent.payment_failed

# Test subscription created
stripe trigger customer.subscription.created

# Test subscription cancelled
stripe trigger customer.subscription.deleted
```

## Frontend Integration

### Subscription Checkout

```tsx
import { SubscriptionCheckout } from '@/components/stripe/SubscriptionCheckout';

<SubscriptionCheckout
  contractorId="contractor-uuid"
  onSuccess={() => {
    // Handle success
    router.push('/contractor/subscription/success');
  }}
/>
```

### Invoice Payment

```tsx
import { InvoicePayment } from '@/components/stripe/InvoicePayment';

<InvoicePayment
  invoiceId="invoice-uuid"
  amount={109.00}
  invoiceNumber="INV-001"
  onSuccess={() => {
    // Handle success
    router.push(`/invoices/${invoiceId}/success`);
  }}
/>
```

## Testing

### Test Cards

Use these test card numbers in test mode:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 9995 | Declined (insufficient funds) |
| 4000 0000 0000 0002 | Declined (generic) |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

Use any future expiry date, any 3-digit CVC, and any postal code.

### Testing Subscriptions

1. Create a subscription using test card
2. Check Stripe Dashboard for subscription status
3. Verify webhook events were received
4. Check database for updated records

### Testing Invoice Payments

1. Create an invoice in the system
2. Navigate to payment page
3. Use test card to complete payment
4. Verify invoice status updated to PAID
5. Check Payment record created

## Error Handling

### Common Errors

| Error | Description | Solution |
|-------|-------------|----------|
| `card_declined` | Card was declined | Ask user to try different card |
| `insufficient_funds` | Not enough balance | Ask user to try different card |
| `invalid_expiry` | Invalid expiry date | Check card details |
| `authentication_required` | 3D Secure required | Complete 3D Secure flow |
| `rate_limit_error` | Too many requests | Retry with exponential backoff |

### Error Handling Flow

1. Catch Stripe errors
2. Log error details for debugging
3. Return user-friendly error message
4. For network errors: Retry with exponential backoff
5. For card errors: Display error to user immediately

## Security Best Practices

### PCI Compliance

- Never log full card numbers
- Never store card details in database
- Use Stripe Elements for card input (PCI-compliant)
- All card data handled directly by Stripe

### API Security

- Verify webhook signatures
- Use environment variables for secrets
- Implement authentication for all endpoints
- Rate limit API endpoints

### Data Protection

- Store only Stripe IDs (customer, subscription, payment intent)
- Never expose secret keys in frontend
- Use HTTPS for all communications
- Implement idempotency keys for critical operations

## Subscription Lifecycle

### 1. Creation
1. User selects tier
2. Frontend calls `/api/stripe/create-subscription`
3. Backend creates Stripe customer (if needed)
4. Backend creates Stripe subscription
5. Returns client secret for payment
6. User completes payment in frontend
7. Webhook confirms subscription created
8. Database updated with subscription details

### 2. Active State
- Monthly billing automatically handled by Stripe
- `invoice.paid` webhook updates billing dates
- Contractor has access to platform features

### 3. Upgrade/Downgrade
1. User selects new tier
2. Frontend calls `/api/stripe/update-subscription`
3. Stripe prorates charges
4. `customer.subscription.updated` webhook fired
5. Database updated with new tier

### 4. Cancellation
1. User cancels subscription
2. Frontend calls `/api/stripe/cancel-subscription`
3. Subscription marked to cancel at period end
4. User retains access until end of billing period
5. `customer.subscription.deleted` webhook fired
6. Database updated to CANCELLED status

### 5. Payment Failure
1. Payment fails during renewal
2. `invoice.payment_failed` webhook fired
3. Subscription marked as PAST_DUE
4. Stripe attempts retries automatically
5. If all retries fail: `customer.subscription.deleted`

## Invoice Payment Flow

### 1. Invoice Creation
- Admin creates invoice in system
- Invoice has status PENDING
- Total includes 10% GST

### 2. Payment Intent
1. Contractor views invoice
2. Clicks "Pay Now"
3. Frontend calls `/api/stripe/create-payment-intent`
4. Backend creates PaymentIntent in Stripe
5. Returns client secret for payment

### 3. Payment Completion
1. Contractor enters card details
2. Frontend confirms payment with Stripe
3. Stripe processes payment
4. `payment_intent.succeeded` webhook fired
5. Invoice marked as PAID
6. Payment record created

### 4. Refund (if needed)
1. Admin initiates refund
2. Backend calls Stripe refund API
3. `charge.refunded` webhook fired
4. Invoice marked as REFUNDED

## Troubleshooting

### Webhooks Not Received

1. Check webhook endpoint is publicly accessible
2. Verify webhook secret is correct
3. Check Stripe Dashboard > Webhooks for delivery attempts
4. Review server logs for errors
5. Test with Stripe CLI locally

### Payment Fails Silently

1. Check browser console for errors
2. Verify publishable key is correct
3. Check Stripe Dashboard > Logs for API errors
4. Ensure clientSecret is valid

### Subscription Not Created in Database

1. Check webhook was received (Stripe Dashboard)
2. Review webhook handler logs
3. Verify database connection
4. Check for validation errors in Prisma

### Amount Mismatch

- Remember: Stripe uses cents (multiply by 100)
- GST should be included in total amount
- AUD currency must be specified

## Monitoring

### Key Metrics to Track

1. **Subscription Metrics**
   - New subscriptions per month
   - Cancellation rate (churn)
   - Upgrade/downgrade rate
   - Failed payment rate

2. **Payment Metrics**
   - Successful payments
   - Failed payments
   - Refund rate
   - Average transaction value

3. **Technical Metrics**
   - Webhook delivery success rate
   - API error rate
   - Average payment processing time

### Stripe Dashboard

Monitor these sections:
- **Home**: Overview of payments and activity
- **Payments**: All payment intents and charges
- **Subscriptions**: Active and cancelled subscriptions
- **Customers**: Customer records
- **Webhooks**: Event delivery status
- **Logs**: API request logs

## Support

### Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)

### Contact

For Stripe-related issues:
1. Check Stripe Dashboard logs
2. Review this documentation
3. Contact Stripe support (available 24/7)
4. Check Stripe community forums

## Changelog

### Version 1.0.0
- Initial Stripe integration
- Subscription management (4 tiers)
- Invoice payments
- Webhook handling
- Customer portal
- Refund processing
