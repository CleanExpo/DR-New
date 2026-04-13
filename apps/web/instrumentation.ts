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
  // Only validate on the Node.js runtime (not Edge).
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv } = await import('@/lib/env');
    validateEnv();
  }
}
