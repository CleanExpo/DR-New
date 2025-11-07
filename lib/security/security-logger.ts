import { redactSensitiveData } from './encryption';

/**
 * Security Event Logger
 * Comprehensive security event logging and monitoring
 */

export enum SecurityEventType {
  // Authentication events
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  TWO_FACTOR_ENABLED = 'TWO_FACTOR_ENABLED',
  TWO_FACTOR_DISABLED = 'TWO_FACTOR_DISABLED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Authorization events
  ACCESS_DENIED = 'ACCESS_DENIED',
  PERMISSION_CHANGE = 'PERMISSION_CHANGE',
  ROLE_CHANGE = 'ROLE_CHANGE',
  UNAUTHORIZED_ACCESS_ATTEMPT = 'UNAUTHORIZED_ACCESS_ATTEMPT',

  // Security violations
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  CSRF_VIOLATION = 'CSRF_VIOLATION',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  BRUTE_FORCE_ATTEMPT = 'BRUTE_FORCE_ATTEMPT',

  // Data events
  DATA_EXPORT = 'DATA_EXPORT',
  DATA_DELETION = 'DATA_DELETION',
  SENSITIVE_DATA_ACCESS = 'SENSITIVE_DATA_ACCESS',
  PII_ACCESS = 'PII_ACCESS',

  // API events
  API_KEY_CREATED = 'API_KEY_CREATED',
  API_KEY_REVOKED = 'API_KEY_REVOKED',
  API_RATE_LIMIT_EXCEEDED = 'API_RATE_LIMIT_EXCEEDED',
  INVALID_API_KEY = 'INVALID_API_KEY',

  // File events
  FILE_UPLOAD = 'FILE_UPLOAD',
  FILE_UPLOAD_REJECTED = 'FILE_UPLOAD_REJECTED',
  SUSPICIOUS_FILE_UPLOAD = 'SUSPICIOUS_FILE_UPLOAD',

  // System events
  CONFIGURATION_CHANGE = 'CONFIGURATION_CHANGE',
  SECURITY_SCAN_COMPLETE = 'SECURITY_SCAN_COMPLETE',
  VULNERABILITY_DETECTED = 'VULNERABILITY_DETECTED',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
}

export enum SecuritySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface SecurityEvent {
  type: SecurityEventType;
  severity: SecuritySeverity;
  timestamp: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action?: string;
  details?: Record<string, any>;
  success?: boolean;
  error?: string;
}

export interface SecurityMetrics {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  failedLogins: number;
  rateLimitExceeded: number;
  suspiciousActivities: number;
  lastHourEvents: number;
}

class SecurityLogger {
  private events: SecurityEvent[] = [];
  private maxEvents = 10000; // Keep last 10k events in memory
  private alertThresholds = {
    failedLogins: 5,
    rateLimitExceeded: 10,
    suspiciousActivities: 3,
  };

  /**
   * Log a security event
   */
  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      details: event.details ? redactSensitiveData(event.details) : undefined,
    };

    // Add to in-memory store
    this.events.push(fullEvent);

    // Trim events if exceeding max
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      this.logToConsole(fullEvent);
    }

    // Check for critical events and trigger alerts
    if (fullEvent.severity === SecuritySeverity.CRITICAL) {
      this.handleCriticalEvent(fullEvent);
    }

    // Send to external logging service if configured
    this.sendToExternalLogger(fullEvent);
  }

  /**
   * Log authentication event
   */
  logAuth(
    type: SecurityEventType,
    userId: string | undefined,
    ipAddress: string,
    success: boolean,
    details?: Record<string, any>
  ): void {
    const severity = success
      ? SecuritySeverity.LOW
      : type === SecurityEventType.LOGIN_FAILED
      ? SecuritySeverity.MEDIUM
      : SecuritySeverity.LOW;

    this.log({
      type,
      severity,
      userId,
      ipAddress,
      success,
      details,
    });
  }

  /**
   * Log security violation
   */
  logViolation(
    type: SecurityEventType,
    ipAddress: string,
    resource: string,
    details?: Record<string, any>
  ): void {
    this.log({
      type,
      severity: SecuritySeverity.HIGH,
      ipAddress,
      resource,
      success: false,
      details,
    });
  }

  /**
   * Log data access
   */
  logDataAccess(
    userId: string,
    resource: string,
    action: string,
    ipAddress: string,
    details?: Record<string, any>
  ): void {
    this.log({
      type: SecurityEventType.SENSITIVE_DATA_ACCESS,
      severity: SecuritySeverity.MEDIUM,
      userId,
      ipAddress,
      resource,
      action,
      success: true,
      details,
    });
  }

  /**
   * Log API event
   */
  logAPI(
    type: SecurityEventType,
    ipAddress: string,
    resource: string,
    success: boolean,
    details?: Record<string, any>
  ): void {
    this.log({
      type,
      severity: success ? SecuritySeverity.LOW : SecuritySeverity.MEDIUM,
      ipAddress,
      resource,
      success,
      details,
    });
  }

  /**
   * Get security metrics
   */
  getMetrics(): SecurityMetrics {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const metrics: SecurityMetrics = {
      totalEvents: this.events.length,
      eventsByType: {},
      eventsBySeverity: {},
      failedLogins: 0,
      rateLimitExceeded: 0,
      suspiciousActivities: 0,
      lastHourEvents: 0,
    };

    for (const event of this.events) {
      // Count by type
      metrics.eventsByType[event.type] = (metrics.eventsByType[event.type] || 0) + 1;

      // Count by severity
      metrics.eventsBySeverity[event.severity] = (metrics.eventsBySeverity[event.severity] || 0) + 1;

      // Count specific events
      if (event.type === SecurityEventType.LOGIN_FAILED) {
        metrics.failedLogins++;
      }
      if (event.type === SecurityEventType.RATE_LIMIT_EXCEEDED) {
        metrics.rateLimitExceeded++;
      }
      if (event.type === SecurityEventType.SUSPICIOUS_ACTIVITY) {
        metrics.suspiciousActivities++;
      }

      // Count events in last hour
      if (new Date(event.timestamp).getTime() > oneHourAgo) {
        metrics.lastHourEvents++;
      }
    }

    return metrics;
  }

  /**
   * Get events by criteria
   */
  getEvents(criteria?: {
    type?: SecurityEventType;
    severity?: SecuritySeverity;
    userId?: string;
    ipAddress?: string;
    startTime?: Date;
    endTime?: Date;
    limit?: number;
  }): SecurityEvent[] {
    let filtered = [...this.events];

    if (criteria?.type) {
      filtered = filtered.filter(e => e.type === criteria.type);
    }

    if (criteria?.severity) {
      filtered = filtered.filter(e => e.severity === criteria.severity);
    }

    if (criteria?.userId) {
      filtered = filtered.filter(e => e.userId === criteria.userId);
    }

    if (criteria?.ipAddress) {
      filtered = filtered.filter(e => e.ipAddress === criteria.ipAddress);
    }

    if (criteria?.startTime) {
      filtered = filtered.filter(e => new Date(e.timestamp) >= criteria.startTime!);
    }

    if (criteria?.endTime) {
      filtered = filtered.filter(e => new Date(e.timestamp) <= criteria.endTime!);
    }

    // Sort by timestamp descending
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (criteria?.limit) {
      filtered = filtered.slice(0, criteria.limit);
    }

    return filtered;
  }

  /**
   * Check for suspicious patterns
   */
  detectSuspiciousActivity(ipAddress: string, timeWindowMinutes = 15): {
    suspicious: boolean;
    reasons: string[];
  } {
    const now = Date.now();
    const windowStart = now - timeWindowMinutes * 60 * 1000;

    const recentEvents = this.events.filter(
      e => e.ipAddress === ipAddress && new Date(e.timestamp).getTime() > windowStart
    );

    const reasons: string[] = [];
    let suspicious = false;

    // Check for multiple failed login attempts
    const failedLogins = recentEvents.filter(
      e => e.type === SecurityEventType.LOGIN_FAILED
    ).length;
    if (failedLogins >= this.alertThresholds.failedLogins) {
      suspicious = true;
      reasons.push(`${failedLogins} failed login attempts in ${timeWindowMinutes} minutes`);
    }

    // Check for rate limit violations
    const rateLimitViolations = recentEvents.filter(
      e => e.type === SecurityEventType.RATE_LIMIT_EXCEEDED
    ).length;
    if (rateLimitViolations >= this.alertThresholds.rateLimitExceeded) {
      suspicious = true;
      reasons.push(`${rateLimitViolations} rate limit violations`);
    }

    // Check for injection attempts
    const injectionAttempts = recentEvents.filter(
      e => e.type === SecurityEventType.XSS_ATTEMPT || e.type === SecurityEventType.SQL_INJECTION_ATTEMPT
    ).length;
    if (injectionAttempts > 0) {
      suspicious = true;
      reasons.push(`${injectionAttempts} injection attempt(s) detected`);
    }

    // Check for CSRF violations
    const csrfViolations = recentEvents.filter(
      e => e.type === SecurityEventType.CSRF_VIOLATION
    ).length;
    if (csrfViolations > 0) {
      suspicious = true;
      reasons.push(`${csrfViolations} CSRF violation(s)`);
    }

    return { suspicious, reasons };
  }

  /**
   * Clear old events
   */
  clearOldEvents(olderThanDays = 30): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const beforeCount = this.events.length;
    this.events = this.events.filter(e => new Date(e.timestamp) > cutoffDate);
    return beforeCount - this.events.length;
  }

  /**
   * Export events for analysis
   */
  exportEvents(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.events, null, 2);
    }

    // CSV format
    const headers = ['timestamp', 'type', 'severity', 'userId', 'ipAddress', 'resource', 'action', 'success'];
    const rows = this.events.map(e => [
      e.timestamp,
      e.type,
      e.severity,
      e.userId || '',
      e.ipAddress || '',
      e.resource || '',
      e.action || '',
      e.success?.toString() || '',
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');
  }

  /**
   * Log to console (development only)
   */
  private logToConsole(event: SecurityEvent): void {
    const color = {
      [SecuritySeverity.LOW]: '\x1b[32m',      // Green
      [SecuritySeverity.MEDIUM]: '\x1b[33m',   // Yellow
      [SecuritySeverity.HIGH]: '\x1b[31m',     // Red
      [SecuritySeverity.CRITICAL]: '\x1b[35m', // Magenta
    }[event.severity];

    const reset = '\x1b[0m';

    console.log(
      `${color}[SECURITY ${event.severity}]${reset} ${event.type} - ${event.ipAddress || 'unknown'} - ${event.timestamp}`
    );

    if (event.details) {
      console.log('Details:', event.details);
    }
  }

  /**
   * Handle critical events
   */
  private handleCriticalEvent(event: SecurityEvent): void {
    // Log critical events immediately
    console.error('[CRITICAL SECURITY EVENT]', {
      type: event.type,
      timestamp: event.timestamp,
      ipAddress: event.ipAddress,
      userId: event.userId,
      resource: event.resource,
    });

    // TODO: Send alerts via email, Slack, PagerDuty, etc.
    // This should be implemented based on your alerting infrastructure
  }

  /**
   * Send to external logging service
   */
  private sendToExternalLogger(event: SecurityEvent): void {
    // TODO: Integrate with external logging services
    // Examples: Datadog, Splunk, ELK Stack, CloudWatch, etc.

    // For now, we'll just prepare the data for potential integration
    if (process.env.SECURITY_LOGGING_ENDPOINT) {
      // Send to external endpoint
      fetch(process.env.SECURITY_LOGGING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(error => {
        console.error('Failed to send security event to external logger:', error);
      });
    }
  }
}

// Singleton instance
export const securityLogger = new SecurityLogger();

// Export convenience functions
export const logSecurityEvent = (event: Omit<SecurityEvent, 'timestamp'>) => securityLogger.log(event);
export const getSecurityMetrics = () => securityLogger.getMetrics();
export const detectSuspiciousActivity = (ipAddress: string) => securityLogger.detectSuspiciousActivity(ipAddress);