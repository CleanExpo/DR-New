/**
 * Stripe Configuration
 * Central configuration for Stripe integration
 *
 * @module StripeConfig
 * @version 1.0.0
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

/**
 * Stripe client instance
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

/**
 * Stripe webhook secret for signature verification
 */
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * Subscription tier pricing (monthly in AUD cents)
 * All prices include 10% GST as per Australian tax requirements
 */
export const SUBSCRIPTION_PRICES = {
  TIER_25KM: 9900,    // $99.00 AUD/month
  TIER_50KM: 19900,   // $199.00 AUD/month
  TIER_100KM: 34900,  // $349.00 AUD/month
  RURAL: 49900,       // $499.00 AUD/month
} as const;

/**
 * Subscription tier type
 */
export type SubscriptionTier = keyof typeof SUBSCRIPTION_PRICES;

/**
 * Currency code
 */
export const CURRENCY = 'aud';

/**
 * GST rate (10% in Australia)
 */
export const GST_RATE = 0.1;

/**
 * Payment terms (days)
 */
export const PAYMENT_TERMS = 7;

/**
 * Success and cancel URLs for Stripe Checkout
 */
export const getCheckoutUrls = (invoiceId: string) => ({
  success: `${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoiceId}/success`,
  cancel: `${process.env.NEXT_PUBLIC_APP_URL}/invoices/${invoiceId}/pay`,
});

export const getSubscriptionCheckoutUrls = () => ({
  success: `${process.env.NEXT_PUBLIC_APP_URL}/contractor/subscription/success`,
  cancel: `${process.env.NEXT_PUBLIC_APP_URL}/contractor/subscription/checkout`,
});
