import Stripe from 'stripe';

export interface StripeErrorResponse {
  error: string;
  code?: string;
  userMessage: string;
}

/**
 * Handle Stripe API errors and return user-friendly messages
 */
export function handleStripeError(error: unknown): StripeErrorResponse {
  console.error('Stripe error:', error);

  if (error instanceof Stripe.errors.StripeError) {
    const stripeError = error as Stripe.errors.StripeError;

    switch (stripeError.type) {
      case 'StripeCardError':
        return {
          error: stripeError.message,
          code: stripeError.code,
          userMessage: 'Your card was declined. Please try a different payment method.',
        };

      case 'StripeRateLimitError':
        return {
          error: 'Rate limit exceeded',
          code: 'rate_limit',
          userMessage: 'Too many requests. Please try again in a moment.',
        };

      case 'StripeInvalidRequestError':
        return {
          error: stripeError.message,
          code: stripeError.code,
          userMessage: 'Invalid request. Please check your information and try again.',
        };

      case 'StripeAPIError':
        return {
          error: 'Stripe API error',
          code: 'api_error',
          userMessage: 'Payment processing error. Please try again later.',
        };

      case 'StripeConnectionError':
        return {
          error: 'Network error',
          code: 'connection_error',
          userMessage: 'Network error. Please check your connection and try again.',
        };

      case 'StripeAuthenticationError':
        return {
          error: 'Authentication error',
          code: 'authentication_error',
          userMessage: 'Payment system authentication error. Please contact support.',
        };

      default:
        return {
          error: stripeError.message,
          code: stripeError.code,
          userMessage: 'Payment processing error. Please try again.',
        };
    }
  }

  // Generic error
  return {
    error: error instanceof Error ? error.message : 'Unknown error',
    userMessage: 'An unexpected error occurred. Please try again.',
  };
}

/**
 * Retry logic for Stripe API calls
 */
export async function retryStripeCall<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on card errors or invalid requests
      if (error instanceof Stripe.errors.StripeCardError) {
        throw error;
      }

      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        throw error;
      }

      // Only retry on network or API errors
      if (
        error instanceof Stripe.errors.StripeConnectionError ||
        error instanceof Stripe.errors.StripeAPIError ||
        error instanceof Stripe.errors.StripeRateLimitError
      ) {
        if (attempt < maxRetries - 1) {
          // Exponential backoff
          const delay = delayMs * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      throw error;
    }
  }

  throw lastError;
}

/**
 * Validate webhook signature
 */
export function validateWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Stripe.Event {
  const stripe = require('./stripe').stripe;

  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error('Webhook signature validation failed:', error);
    throw new Error('Invalid webhook signature');
  }
}
