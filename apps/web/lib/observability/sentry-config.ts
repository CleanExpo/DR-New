/**
 * Enhanced Sentry Configuration
 * Implements comprehensive application performance monitoring and error tracking
 *
 * Features:
 * - Transaction tracing for API and frontend performance
 * - Error tracking with context and breadcrumbs
 * - Performance monitoring with sampling
 * - Replay functionality for debugging
 * - Custom metrics and monitoring
 */

import * as Sentry from '@sentry/nextjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

/**
 * Initialize Sentry for both server and client
 */
export function initializeSentry() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

  if (!dsn && isProduction) {
    console.warn('⚠️  Sentry DSN not configured - monitoring disabled');
    return;
  }

  // Initialize Sentry
  Sentry.init({
    // Project configuration
    dsn: dsn,
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_BUILD_ID || 'unknown',

    // Tracing and Performance Monitoring
    tracesSampleRate: isProduction ? 0.1 : 1.0, // 10% in production, 100% in dev
    profilesSampleRate: isProduction ? 0.1 : 1.0, // 10% for profiling in production
    maxBreadcrumbs: isProduction ? 50 : 100,

    // Error filtering
    beforeSend(event, hint) {
      // Filter out known non-critical errors
      if (isDevelopment) {
        console.log('[Sentry] Error:', event);
      }

      // Don't send sourcemap errors
      if (event.exception?.values?.[0]?.value?.includes('401 No credentials')) {
        return null;
      }

      // Don't send GraphQL network errors for cancelled requests
      if (
        hint.originalException instanceof Error &&
        hint.originalException.message.includes('NetworkError')
      ) {
        return null;
      }

      return event;
    },

    // Integrations
    integrations: (integrations) => {
      // Remove default integrations we don't need
      const filtered = integrations.filter((i) => {
        // Keep essential integrations, remove bloat
        const name = i.name || '';
        return ![
          'OnUncaughtException',
          'OnUnhandledRejection',
        ].includes(name);
      });

      // Add custom integrations
      return [
        ...filtered,
        // Node.js profiling (server-side only)
        ...(process.env.NEXT_RUNTIME === 'nodejs'
          ? [nodeProfilingIntegration()]
          : []),

        // Custom transaction naming
        new Sentry.Integrations.Http({
          tracingOrigins: [
            'localhost',
            /^\//,
            process.env.NEXT_PUBLIC_API_URL,
          ],
          breadcrumbs: true,
          request: true,
        }),
      ];
    },

    // Server-side options
    ...(process.env.NEXT_RUNTIME === 'nodejs' && {
      serverName: process.env.HOSTNAME || 'unknown',
    }),

    // Debug mode
    debug: isDevelopment,

    // Allow URLs
    allowUrls: [/\.disasterrecovery\.com\.au/, /localhost/],

    // Deny URLs (3rd party domains)
    denyUrls: [
      /graph\.instagram\.com/,
      /connect\.facebook\.net/,
      /cdn\.mxpnl\.com/,
      /cdn\.amplitude\.com/,
    ],
  });
}

/**
 * Set up transaction context for API requests
 */
export function setupTransactionContext() {
  return (req: any) => {
    // Name transaction based on API path
    const transaction = Sentry.getCurrentHub().getTransaction();
    if (transaction) {
      transaction.setName(`${req.method} ${req.pathname}`);
      transaction.setTag('api_method', req.method);
      transaction.setTag('api_path', req.pathname);
    }
  };
}

/**
 * Capture custom metric
 */
export function captureMetric(
  name: string,
  value: number,
  unit?: string,
  tags?: Record<string, string>
) {
  if (typeof window === 'undefined') return; // Server-side

  const metric = {
    name,
    value,
    unit: unit || 'none',
    timestamp: Date.now() / 1000,
    tags: tags || {},
  };

  // Send to Sentry (custom implementation)
  Sentry.captureMessage(`[METRIC] ${name}=${value}${unit ? unit : ''}`, {
    tags: {
      'metric.name': name,
      'metric.value': value.toString(),
      ...tags,
    },
    level: 'info',
  });
}

/**
 * Capture database operation metrics
 */
export function captureDBMetric(
  operation: 'query' | 'insert' | 'update' | 'delete',
  duration: number,
  table: string,
  success: boolean
) {
  const span = Sentry.getActiveSpan();
  if (span) {
    span.addEvent('database', {
      'db.operation': operation,
      'db.duration_ms': duration,
      'db.table': table,
      'db.success': success,
    });
  }

  captureMetric(`db.${operation}.duration`, duration, 'millisecond', {
    'db.table': table,
    'db.success': success.toString(),
  });
}

/**
 * Capture API endpoint metrics
 */
export function captureAPIMetric(
  endpoint: string,
  method: string,
  statusCode: number,
  duration: number
) {
  const span = Sentry.getActiveSpan();
  if (span) {
    span.addEvent('http', {
      'http.method': method,
      'http.status_code': statusCode,
      'http.duration_ms': duration,
      'http.url': endpoint,
    });
  }

  captureMetric(`api.${method}.duration`, duration, 'millisecond', {
    'http.endpoint': endpoint,
    'http.status': statusCode.toString(),
  });
}

/**
 * Capture user action metrics
 */
export function captureUserMetric(
  action: string,
  duration: number,
  success: boolean,
  metadata?: Record<string, any>
) {
  const span = Sentry.getActiveSpan();
  if (span) {
    span.addEvent('user_action', {
      'action.name': action,
      'action.duration_ms': duration,
      'action.success': success,
      ...metadata,
    });
  }

  Sentry.captureMessage(
    `[USER_ACTION] ${action} ${success ? '✓' : '✗'} (${duration}ms)`,
    {
      tags: {
        'user.action': action,
        'user.success': success.toString(),
        'user.duration_ms': duration.toString(),
      },
      level: success ? 'info' : 'warning',
    }
  );
}

/**
 * Capture critical business metrics
 */
export interface BusinessMetrics {
  'revenue.total'?: number;
  'revenue.completed'?: number;
  'revenue.failed'?: number;
  'bookings.created'?: number;
  'bookings.completed'?: number;
  'bookings.failed'?: number;
  'users.active'?: number;
  'users.signup'?: number;
  'users.churn'?: number;
  [key: string]: number | undefined;
}

export function captureBusinessMetrics(metrics: BusinessMetrics) {
  Object.entries(metrics).forEach(([key, value]) => {
    if (value !== undefined) {
      captureMetric(key, value, 'count', { 'metric.type': 'business' });
    }
  });

  // Also send to Sentry as structured data
  Sentry.captureMessage('[BUSINESS_METRICS]', {
    level: 'info',
    extra: {
      metrics,
      timestamp: new Date().toISOString(),
    },
    tags: {
      'metric.type': 'business',
    },
  });
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId: string, email: string, role: string) {
  Sentry.setUser({
    id: userId,
    email: email,
    role: role,
  });

  Sentry.setTag('user.role', role);
}

/**
 * Clear user context on logout
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  message: string,
  category: string = 'custom',
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Track page/route navigation
 */
export function trackNavigation(fromPath: string, toPath: string) {
  addBreadcrumb(`Navigation: ${fromPath} → ${toPath}`, 'navigation', 'info', {
    from: fromPath,
    to: toPath,
  });
}

/**
 * Start a transaction for tracking a user workflow
 */
export function startTransaction(
  name: string,
  operation: string,
  metadata?: Record<string, any>
) {
  const transaction = Sentry.startTransaction({
    name,
    op: operation,
    description: `${operation}: ${name}`,
    data: metadata,
  });

  return transaction;
}

/**
 * Error reporting with context
 */
export function captureException(
  error: Error,
  context?: {
    userId?: string;
    action?: string;
    metadata?: Record<string, any>;
  }
) {
  Sentry.captureException(error, {
    tags: {
      'error.type': error.constructor.name,
      'user.action': context?.action,
    },
    extra: {
      userId: context?.userId,
      ...context?.metadata,
    },
  });
}

/**
 * Performance monitoring configuration
 */
export const PERFORMANCE_THRESHOLDS = {
  // API endpoints
  API_SLOW: 1000, // 1 second
  API_CRITICAL: 5000, // 5 seconds

  // Database queries
  DB_SLOW: 500, // 500ms
  DB_CRITICAL: 2000, // 2 seconds

  // Frontend interactions
  INTERACTION_SLOW: 100, // 100ms
  INTERACTION_CRITICAL: 500, // 500ms

  // Page load
  PAGE_LOAD_SLOW: 2000, // 2 seconds
  PAGE_LOAD_CRITICAL: 5000, // 5 seconds
};

/**
 * Check if metric exceeds threshold and report if critical
 */
export function checkPerformanceThreshold(
  metric: string,
  duration: number,
  type: 'api' | 'db' | 'interaction' | 'page'
) {
  let slowThreshold = 0;
  let criticalThreshold = 0;

  switch (type) {
    case 'api':
      slowThreshold = PERFORMANCE_THRESHOLDS.API_SLOW;
      criticalThreshold = PERFORMANCE_THRESHOLDS.API_CRITICAL;
      break;
    case 'db':
      slowThreshold = PERFORMANCE_THRESHOLDS.DB_SLOW;
      criticalThreshold = PERFORMANCE_THRESHOLDS.DB_CRITICAL;
      break;
    case 'interaction':
      slowThreshold = PERFORMANCE_THRESHOLDS.INTERACTION_SLOW;
      criticalThreshold = PERFORMANCE_THRESHOLDS.INTERACTION_CRITICAL;
      break;
    case 'page':
      slowThreshold = PERFORMANCE_THRESHOLDS.PAGE_LOAD_SLOW;
      criticalThreshold = PERFORMANCE_THRESHOLDS.PAGE_LOAD_CRITICAL;
      break;
  }

  if (duration >= criticalThreshold) {
    Sentry.captureMessage(
      `CRITICAL: ${metric} took ${duration}ms (threshold: ${criticalThreshold}ms)`,
      {
        level: 'error',
        tags: {
          'performance.type': type,
          'performance.severity': 'critical',
        },
        extra: {
          metric,
          duration,
          threshold: criticalThreshold,
        },
      }
    );
  } else if (duration >= slowThreshold) {
    Sentry.captureMessage(
      `SLOW: ${metric} took ${duration}ms (threshold: ${slowThreshold}ms)`,
      {
        level: 'warning',
        tags: {
          'performance.type': type,
          'performance.severity': 'warning',
        },
        extra: {
          metric,
          duration,
          threshold: slowThreshold,
        },
      }
    );
  }
}

export default Sentry;
