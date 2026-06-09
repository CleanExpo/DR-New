/**
 * Next.js instrumentation file — runs once on server startup.
 *
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * Used for:
 *  - Environment variable validation (fail fast before any request is served)
 *  - One-time server-side initialisation (logging, tracing, etc.)
 */

import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Only validate on the Node.js runtime (not Edge).
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv } = await import('@/lib/env');
    validateEnv();
  }
}

// Capture errors thrown in nested React Server Components and route handlers.
// Required by the current @sentry/nextjs API; without it Next.js logs a warning
// about a missing onRequestError hook during build.
export const onRequestError = Sentry.captureRequestError;
