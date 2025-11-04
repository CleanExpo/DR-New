# Stripe Integration - Quick Start Guide

## Overview

Complete Stripe payment integration for NRPG Platform CRM with subscription billing and invoice payments.

## Features Implemented

- Contractor subscriptions (4 pricing tiers: 25km, 50km, 100km, Rural)
- One-time invoice payments with GST
- Webhook event processing
- Customer portal for self-service
- Refund processing
- Comprehensive error handling
- Full test coverage

## Quick Setup (5 Minutes)

### 1. Get Stripe Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Go to **Developers > API Keys**
3. Copy your **Publishable** and **Secret** keys

### 2. Set Environment Variables

Add to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_51xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 3. Create Stripe Products (Optional)

```bash
npm run stripe:setup
```

This creates products in Stripe and outputs Price IDs to add to `.env`.

### 4. Setup Webhooks (Local Development)

Install Stripe CLI:

```bash
# Windows
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe
```

Run webhook forwarder:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook secret (`whsec_xxxxx`) to `.env`.

### 5. Run Database Migration

```bash
npx prisma db push
```

### 6. Start Development Server

```bash
npm run dev
```

## Usage

### Subscription Checkout

```tsx
import { SubscriptionCheckout } from '@/components/stripe/SubscriptionCheckout';

<SubscriptionCheckout
  contractorId={contractor.id}
  onSuccess={() => router.push('/success')}
/>
```

### Invoice Payment

```tsx
import { InvoicePayment } from '@/components/stripe/InvoicePayment';

<InvoicePayment
  invoiceId={invoice.id}
  amount={invoice.total}
  invoiceNumber={invoice.invoiceNumber}
  onSuccess={() => router.push('/success')}
/>
```

## Testing

Use Stripe test cards:

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 9995
- **3D Secure**: 4000 0025 0000 3155

Any future expiry, any 3-digit CVC, any ZIP.

## API Endpoints

### Subscriptions

- `POST /api/stripe/create-subscription` - Create subscription
- `POST /api/stripe/cancel-subscription` - Cancel subscription
- `PATCH /api/stripe/update-subscription` - Update tier
- `GET /api/stripe/subscription-status` - Get status
- `POST /api/stripe/customer-portal` - Get portal URL

### Invoices

- `POST /api/stripe/create-payment-intent` - Create payment
- `POST /api/stripe/confirm-payment` - Confirm payment
- `POST /api/stripe/refund` - Process refund (admin only)

### Webhooks

- `POST /api/stripe/webhook` - Handle Stripe events

## Pricing (AUD)

| Tier | Monthly Price |
|------|---------------|
| 25km Radius | $99 |
| 50km Radius | $199 |
| 100km Radius | $349 |
| Rural Coverage | $499 |

## Production Deployment

### 1. Switch to Live Keys

In Vercel environment variables, use live keys (`sk_live_` and `pk_live_`).

### 2. Setup Production Webhooks

1. Go to Stripe Dashboard > **Webhooks**
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events:
   - `customer.subscription.*`
   - `invoice.*`
   - `payment_intent.*`
   - `charge.refunded`
4. Copy signing secret to `.env.production`

### 3. Test in Production

Use Stripe Dashboard to monitor:
- Live payments
- Webhook deliveries
- Customer records

## File Structure

```
lib/
  stripe.ts                      # Stripe client config
  stripe-service.ts              # Payment service layer
  stripe-client.ts               # Frontend Stripe loader
  stripe-error-handler.ts        # Error handling

app/api/stripe/
  webhook/route.ts               # Webhook handler
  create-subscription/route.ts   # Create subscription
  cancel-subscription/route.ts   # Cancel subscription
  update-subscription/route.ts   # Update tier
  subscription-status/route.ts   # Get status
  create-payment-intent/route.ts # Invoice payment
  confirm-payment/route.ts       # Confirm payment
  refund/route.ts                # Process refund
  customer-portal/route.ts       # Portal session

components/stripe/
  SubscriptionCheckout.tsx       # Subscription form
  InvoicePayment.tsx             # Invoice payment form

scripts/
  setup-stripe-products.ts       # Product setup script

__tests__/lib/
  stripe-service.test.ts         # Service tests
```

## Security Checklist

- Never log card numbers
- Never store card details
- Verify webhook signatures
- Use HTTPS in production
- Rate limit API endpoints
- Implement authentication
- Store only Stripe IDs

## Troubleshooting

### Webhook Not Received

- Check Stripe Dashboard > Webhooks
- Verify signing secret matches
- Test with Stripe CLI locally

### Payment Fails

- Check browser console
- Verify publishable key
- Check Stripe Dashboard > Logs

### Subscription Not Created

- Check webhook logs
- Verify database connection
- Review Prisma schema

## Support

Full documentation: `STRIPE_INTEGRATION.md`

Stripe Documentation: [stripe.com/docs](https://stripe.com/docs)

## Next Steps

1. Customize subscription tiers
2. Add email notifications
3. Implement usage-based billing
4. Add invoice PDF generation
5. Setup customer support portal
