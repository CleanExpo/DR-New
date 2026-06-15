/**
 * Next.js instrumentation file — runs once on server startup.
 *
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * Used for:
 *  - Environment variable validation (fail fast before any request is served)
 *  - One-time server-side initialisation (logging, tracing, etc.)
 */

export async function register() {
  // Register Sentry first so startup/runtime errors are captured.
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');

    const { validateEnv } = await import('@/lib/env');
    validateEnv();
    return;
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = (...args: Parameters<typeof import('@sentry/nextjs').captureRequestError>) => {
  return import('@sentry/nextjs').then((Sentry) => Sentry.captureRequestError(...args));
};
