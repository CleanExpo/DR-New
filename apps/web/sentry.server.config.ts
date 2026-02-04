// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Environment
  environment: process.env.NODE_ENV,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Ignore specific errors
  ignoreErrors: [
    // Database connection timeouts (handled by retry logic)
    "ECONNREFUSED",
    "ETIMEDOUT",
    // Prisma client errors (logged separately)
    "PrismaClientKnownRequestError",
  ],

  // Filter transactions
  beforeSend(event) {
    // Don't send health check errors
    if (event.request?.url?.includes("/api/health")) {
      return null;
    }

    // Don't send webhook errors (handled separately)
    if (event.request?.url?.includes("/api/webhooks")) {
      return null;
    }

    return event;
  },

  // Track database performance
  integrations: [
    Sentry.prismaIntegration(),
  ],
});
