import * as Sentry from '@sentry/nextjs';

interface SentryConfig {
  dsn?: string;
  environment: string;
  tracesSampleRate: number;
  debug: boolean;
  enabled: boolean;
}

function getSentryConfig(): SentryConfig {
  const dsn = process.env.SENTRY_DSN;
  const env = process.env.NODE_ENV || 'development';
  const isProduction = env === 'production';

  return {
    dsn,
    environment: env,
    tracesSampleRate: isProduction ? 0.1 : 1.0,
    debug: !isProduction,
    enabled: !!dsn && isProduction,
  };
}

export function initializeSentry(): void {
  const config = getSentryConfig();

  if (!config.enabled) {
    console.log('Sentry not initialized: DSN not configured or not in production');
    return;
  }

  Sentry.init({
    dsn: config.dsn,
    environment: config.environment,
    tracesSampleRate: config.tracesSampleRate,
    debug: config.debug,
    integrations: [
      new Sentry.Integrations.OnUncaughtException(),
      new Sentry.Integrations.OnUnhandledRejection(),
    ],
    beforeSend(event, hint) {
      const error = hint.originalException;

      if (error instanceof Error) {
        if (error.message.includes('ECONNREFUSED')) {
          return null;
        }
        if (error.message.includes('timeout')) {
          return null;
        }
      }

      return event;
    },
  });
}

export function captureException(error: unknown, context?: Record<string, any>): string {
  const config = getSentryConfig();

  if (!config.enabled) {
    console.error('Error:', error);
    return 'error-not-captured';
  }

  const eventId = Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  });

  return eventId;
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): string {
  const config = getSentryConfig();

  if (!config.enabled) {
    console.log(message);
    return 'message-not-captured';
  }

  return Sentry.captureMessage(message, level);
}

export function setUser(userId: string, email?: string, username?: string): void {
  Sentry.setUser({
    id: userId,
    email,
    username,
  });
}

export function clearUser(): void {
  Sentry.setUser(null);
}

export function setTag(key: string, value: string): void {
  Sentry.setTag(key, value);
}

export function setContext(name: string, context: Record<string, any>): void {
  Sentry.setContext(name, context);
}

export function startTransaction(name: string, op: string = 'http.request') {
  const config = getSentryConfig();

  if (!config.enabled) {
    return {
      finish: () => {
      },
    };
  }

  return Sentry.startTransaction({
    name,
    op,
  });
}

export const sentryConfig = getSentryConfig();
