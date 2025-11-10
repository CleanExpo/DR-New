/**
 * Error Tracking & Monitoring System
 * Comprehensive error tracking, logging, and alerting
 */

import { NextRequest } from 'next/server';

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  environment: string;
  releaseVersion?: string;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  level: 'error' | 'warning' | 'info' | 'critical';
  context: ErrorContext;
  fingerprint: string;
}

export class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: Map<string, ErrorReport[]> = new Map();
  private errorCounts: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  /**
   * Capture and track an error
   */
  captureError(
    error: Error,
    context: Partial<ErrorContext> = {},
    level: ErrorReport['level'] = 'error'
  ): string {
    const errorId = this.generateErrorId();
    const fingerprint = this.generateFingerprint(error);

    const report: ErrorReport = {
      id: errorId,
      message: error.message,
      stack: error.stack,
      level,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        releaseVersion: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown'
      },
      fingerprint
    };

    // Store error
    const existingErrors = this.errors.get(fingerprint) || [];
    existingErrors.push(report);
    this.errors.set(fingerprint, existingErrors);

    // Update error counts
    const count = this.errorCounts.get(fingerprint) || 0;
    this.errorCounts.set(fingerprint, count + 1);

    // Log error
    this.logError(report);

    // Check if error threshold reached
    if (count + 1 >= 10) {
      this.alertCriticalError(report);
    }

    return errorId;
  }

  /**
   * Capture exception from request
   */
  captureFromRequest(
    error: Error,
    request: NextRequest,
    level: ErrorReport['level'] = 'error'
  ): string {
    const context: Partial<ErrorContext> = {
      url: request.url,
      userAgent: request.headers.get('user-agent') || undefined,
      sessionId: request.cookies.get('session')?.value,
      tags: {
        method: request.method,
        path: request.nextUrl.pathname
      },
      extra: {
        query: Object.fromEntries(request.nextUrl.searchParams),
        headers: Object.fromEntries(request.headers)
      }
    };

    return this.captureError(error, context, level);
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate error fingerprint for grouping
   */
  private generateFingerprint(error: Error): string {
    const stack = error.stack || '';
    const stackLines = stack.split('\n').slice(0, 3).join('\n');
    const message = error.message.replace(/\d+/g, 'N'); // Normalize numbers

    return this.hash(`${error.name}:${message}:${stackLines}`);
  }

  /**
   * Simple hash function for fingerprinting
   */
  private hash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Log error to console and storage
   */
  private logError(report: ErrorReport): void {
    const logLevel = report.level === 'critical' ? 'error' : report.level;
    const logger = console[logLevel] || console.log;

    logger(`[${report.level.toUpperCase()}] ${report.message}`, {
      id: report.id,
      fingerprint: report.fingerprint,
      context: report.context
    });

    // In production, send to external logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(report);
    }
  }

  /**
   * Send error to external monitoring service
   */
  private async sendToExternalService(report: ErrorReport): Promise<void> {
    try {
      // Example: Send to Sentry, LogRocket, DataDog, etc.
      // if (process.env.SENTRY_DSN) {
      //   await fetch(process.env.SENTRY_DSN, {
      //     method: 'POST',
      //     body: JSON.stringify(report)
      //   });
      // }

      // For now, just log that we would send it
      console.log('[ErrorTracker] Would send to external service:', report.id);
    } catch (error) {
      console.error('[ErrorTracker] Failed to send error:', error);
    }
  }

  /**
   * Alert for critical errors
   */
  private alertCriticalError(report: ErrorReport): void {
    console.error('[CRITICAL ERROR ALERT]', {
      message: report.message,
      occurrences: this.errorCounts.get(report.fingerprint),
      environment: report.context.environment
    });

    // In production, trigger alerts (PagerDuty, Slack, etc.)
    if (process.env.NODE_ENV === 'production') {
      this.sendAlert(report);
    }
  }

  /**
   * Send alert to monitoring service
   */
  private async sendAlert(report: ErrorReport): Promise<void> {
    // Integrate with alerting services
    // Examples: PagerDuty, Slack, email, SMS
    console.log('[ALERT] Critical error requires attention:', report.id);
  }

  /**
   * Get error statistics
   */
  getStatistics(): {
    totalErrors: number;
    uniqueErrors: number;
    topErrors: Array<{ fingerprint: string; count: number }>;
  } {
    const topErrors = Array.from(this.errorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([fingerprint, count]) => ({ fingerprint, count }));

    return {
      totalErrors: Array.from(this.errorCounts.values()).reduce((a, b) => a + b, 0),
      uniqueErrors: this.errorCounts.size,
      topErrors
    };
  }

  /**
   * Clear old errors
   */
  clearOldErrors(maxAge: number = 24 * 60 * 60 * 1000): void {
    const cutoffTime = Date.now() - maxAge;

    for (const [fingerprint, errors] of this.errors.entries()) {
      const recentErrors = errors.filter(e =>
        new Date(e.context.timestamp).getTime() > cutoffTime
      );

      if (recentErrors.length === 0) {
        this.errors.delete(fingerprint);
        this.errorCounts.delete(fingerprint);
      } else {
        this.errors.set(fingerprint, recentErrors);
        this.errorCounts.set(fingerprint, recentErrors.length);
      }
    }
  }
}

/**
 * Global error handler
 */
export function setupGlobalErrorHandler(): void {
  if (typeof window !== 'undefined') {
    const tracker = ErrorTracker.getInstance();

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

      tracker.captureError(error, {
        tags: { type: 'unhandledRejection' }
      }, 'critical');
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      const error = event.error instanceof Error
        ? event.error
        : new Error(event.message);

      tracker.captureError(error, {
        url: event.filename,
        tags: {
          type: 'globalError',
          lineno: String(event.lineno),
          colno: String(event.colno)
        }
      }, 'error');
    });
  }
}

/**
 * Export singleton instance
 */
export const errorTracker = ErrorTracker.getInstance();

/**
 * Helper function for capturing errors
 */
export function captureError(
  error: Error,
  context?: Partial<ErrorContext>,
  level?: ErrorReport['level']
): string {
  return errorTracker.captureError(error, context, level);
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static recordMetric(name: string, value: number): void {
    const existing = this.metrics.get(name) || [];
    existing.push(value);

    // Keep only last 100 measurements
    if (existing.length > 100) {
      existing.shift();
    }

    this.metrics.set(name, existing);
  }

  static getAverageMetric(name: string): number | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) {return null;}

    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  static getAllMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};

    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values)
        };
      }
    }

    return result;
  }
}

/**
 * API for monitoring endpoint
 */
export function getMonitoringData() {
  return {
    errors: errorTracker.getStatistics(),
    performance: PerformanceMonitor.getAllMetrics(),
    timestamp: new Date().toISOString()
  };
}
