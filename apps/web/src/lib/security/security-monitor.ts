
/**
 * Security Monitoring System
 *
 * Real-time detection and alerting for suspicious activity:
 * - Failed login attempts and brute force attacks
 * - Unusual access patterns (multiple IPs, odd times)
 * - Account takeover indicators
 * - Privilege escalation attempts
 *
 * Usage:
 * ```ts
 * import { securityMonitor } from '@/lib/security/security-monitor';
 *
 * // Track failed login attempt
 * await securityMonitor.trackFailedLogin(email, ipAddress);
 *
 * // Check if account is locked due to failed attempts
 * const locked = securityMonitor.isAccountLocked(email);
 * ```
 */

import { prisma } from '@/lib/db';
import { logError, logWarn, logInfo } from '@/lib/logger/helpers';

export interface SecurityEvent {
  id: string;
  userId?: string;
  email?: string;
  type: 'FAILED_LOGIN' | 'BRUTE_FORCE' | 'UNUSUAL_ACCESS' | 'PRIVILEGE_ESCALATION' | 'FILE_UPLOAD_BLOCKED' | 'CUSTOM';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ipAddress: string;
  userAgent?: string;
  details: Record<string, any>;
  resolved: boolean;
  acknowledged: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
}

export interface AccountLockout {
  email: string;
  failedAttempts: number;
  lastFailedAt: Date;
  isLocked: boolean;
  unlocksAt: Date;
}

class SecurityMonitor {
  // In-memory tracking for failed login attempts (would be in DB in production)
  private failedAttempts = new Map<string, Array<{ ip: string; timestamp: number }>>();
  private accountLockouts = new Map<string, AccountLockout>();
  private securityEvents: SecurityEvent[] = [];

  private readonly maxFailedAttempts = 5;
  private readonly lockoutDurationMinutes = 30;
  private readonly failedAttemptWindowMinutes = 15;
  private readonly cleanupIntervalMs = 60 * 60 * 1000; // 1 hour

  constructor() {
    // Cleanup old records periodically
    setInterval(() => this.cleanup(), this.cleanupIntervalMs);
  }

  /**
   * Track failed login attempt
   */
  async trackFailedLogin(email: string, ipAddress: string, userAgent?: string): Promise<SecurityEvent | null> {
    try {
      const now = Date.now();

      // Get or initialize failed attempts for this email
      if (!this.failedAttempts.has(email)) {
        this.failedAttempts.set(email, []);
      }

      const attempts = this.failedAttempts.get(email)!;
      const windowStart = now - this.failedAttemptWindowMinutes * 60 * 1000;

      // Remove old attempts outside the window
      const recentAttempts = attempts.filter((a) => a.timestamp > windowStart);
      recentAttempts.push({ ip: ipAddress, timestamp: now });
      this.failedAttempts.set(email, recentAttempts);

      // Log failed attempt to database
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (user) {
        await prisma.loginAttempt.create({
          data: {
            userId: user.id,
            ipAddress,
            userAgent: userAgent || 'unknown',
            success: false,
          },
        });
      }

      logWarn('Failed login attempt', {
        email,
        ipAddress,
        attemptCount: recentAttempts.length,
      });

      // Check if account should be locked
      if (recentAttempts.length >= this.maxFailedAttempts) {
        return this.lockAccount(email, ipAddress, recentAttempts.length);
      }

      return null;
    } catch (error) {
      logError(error, { context: 'track_failed_login' });
      return null;
    }
  }

  /**
   * Record successful login and clear failed attempts
   */
  async trackSuccessfulLogin(email: string, ipAddress: string, userAgent?: string): Promise<void> {
    try {
      // Clear failed attempts
      this.failedAttempts.delete(email);
      this.accountLockouts.delete(email);

      // Log successful attempt to database
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (user) {
        await prisma.loginAttempt.create({
          data: {
            userId: user.id,
            ipAddress,
            userAgent: userAgent || 'unknown',
            success: true,
          },
        });

        // Update last login time
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }

      logInfo('Successful login', { email, ipAddress });
    } catch (error) {
      logError(error, { context: 'track_successful_login' });
    }
  }

  /**
   * Lock account after max failed attempts
   */
  private lockAccount(email: string, ipAddress: string, attemptCount: number): SecurityEvent {
    const now = new Date();
    const unlocksAt = new Date(now.getTime() + this.lockoutDurationMinutes * 60 * 1000);

    const lockout: AccountLockout = {
      email,
      failedAttempts: attemptCount,
      lastFailedAt: now,
      isLocked: true,
      unlocksAt,
    };

    this.accountLockouts.set(email, lockout);

    const event: SecurityEvent = {
      id: `brute-force-${Date.now()}-${Math.random()}`,
      email,
      type: 'BRUTE_FORCE',
      severity: 'HIGH',
      ipAddress,
      details: {
        attemptCount,
        lockoutDurationMinutes: this.lockoutDurationMinutes,
      },
      resolved: false,
      acknowledged: false,
      createdAt: now,
    };

    this.securityEvents.push(event);

    logWarn('Account locked due to brute force attempt', {
      email,
      ipAddress,
      attemptCount,
      unlocksAt: unlocksAt.toISOString(),
    });

    return event;
  }

  /**
   * Check if account is locked
   */
  isAccountLocked(email: string): boolean {
    const lockout = this.accountLockouts.get(email);

    if (!lockout) {
      return false;
    }

    // Check if lockout has expired
    if (new Date() > lockout.unlocksAt) {
      this.accountLockouts.delete(email);
      return false;
    }

    return lockout.isLocked;
  }

  /**
   * Get lockout info for account
   */
  getLockoutInfo(email: string): AccountLockout | null {
    const lockout = this.accountLockouts.get(email);

    if (!lockout || new Date() > lockout.unlocksAt) {
      this.accountLockouts.delete(email);
      return null;
    }

    return lockout;
  }

  /**
   * Detect unusual access patterns
   */
  async detectUnusualAccess(
    userId: string,
    ipAddress: string,
    userAgent: string,
    email: string
  ): Promise<SecurityEvent | null> {
    try {
      // Check for login from new IP
      const recentLogins = await prisma.loginAttempt.findMany({
        where: {
          userId,
          success: true,
          attemptedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
        select: { ipAddress: true },
      });

      const uniqueIPs = new Set(recentLogins.map((l) => l.ipAddress));

      if (uniqueIPs.size > 5 && !uniqueIPs.has(ipAddress)) {
        // More than 5 different IPs in last 30 days and new IP detected
        const event: SecurityEvent = {
          id: `unusual-access-${Date.now()}-${Math.random()}`,
          userId,
          email,
          type: 'UNUSUAL_ACCESS',
          severity: 'MEDIUM',
          ipAddress,
          userAgent,
          details: {
            newIpDetected: true,
            totalUniqueIPs: uniqueIPs.size,
            ipCount: recentLogins.length,
          },
          resolved: false,
      acknowledged: false,
          createdAt: new Date(),
        };

        this.securityEvents.push(event);

        logWarn('Unusual access pattern detected', {
          userId,
          email,
          ipAddress,
          totalIPs: uniqueIPs.size,
        });

        return event;
      }

      return null;
    } catch (error) {
      logError(error, { context: 'detect_unusual_access' });
      return null;
    }
  }

  /**
   * Track suspicious file upload attempt
   */
  trackSuspiciousFileUpload(
    userId: string | null,
    email: string | null,
    filename: string,
    reason: string,
    ipAddress: string
  ): SecurityEvent {
    const event: SecurityEvent = {
      id: `file-upload-${Date.now()}-${Math.random()}`,
      userId,
      email: email || undefined,
      type: 'FILE_UPLOAD_BLOCKED',
      severity: 'MEDIUM',
      ipAddress,
      details: {
        filename,
        reason,
      },
      resolved: false,
      acknowledged: false,
      createdAt: new Date(),
    };

    this.securityEvents.push(event);

    logWarn('Suspicious file upload blocked', {
      userId,
      email,
      filename,
      reason,
    });

    return event;
  }

  /**
   * Create custom security event
   */
  createSecurityEvent(
    type: SecurityEvent['type'],
    severity: SecurityEvent['severity'],
    ipAddress: string,
    email?: string,
    userId?: string,
    details: Record<string, any> = {}
  ): SecurityEvent {
    const event: SecurityEvent = {
      id: `${type.toLowerCase()}-${Date.now()}-${Math.random()}`,
      type,
      severity,
      ipAddress,
      email,
      userId,
      details,
      resolved: false,
      acknowledged: false,
      createdAt: new Date(),
    };

    this.securityEvents.push(event);

    logInfo('Security event created', {
      type,
      severity,
      email,
      userId,
    });

    return event;
  }

  /**
   * Get unresolved security events
   */
  getUnresolvedEvents(
    limit: number = 100,
    severity?: SecurityEvent['severity']
  ): SecurityEvent[] {
    return this.securityEvents
      .filter((e) => !e.resolved && (!severity || e.severity === severity))
      .slice(-limit);
  }

  /**
   * Get recent events for user
   */
  getRecentEventsForUser(userId: string, limit: number = 20): SecurityEvent[] {
    return this.securityEvents
      .filter((e) => e.userId === userId)
      .slice(-limit);
  }

  /**
   * Resolve security event
   */
  resolveEvent(eventId: string): void {
    const event = this.securityEvents.find((e) => e.id === eventId);
    if (event) {
      event.resolved = true;
      event.resolvedAt = new Date();
    }
  }

  /**
   * Acknowledge security event (seen by operator, not yet resolved)
   */
  acknowledgeEvent(eventId: string, acknowledgedBy: string): void {
    const event = this.securityEvents.find((e) => e.id === eventId);
    if (event) {
      event.acknowledged = true;
      event.acknowledgedAt = new Date();
      event.acknowledgedBy = acknowledgedBy;
    }
  }

  /**
   * Get security statistics
   */
  getStats() {
    const allEvents = this.securityEvents;
    const unresolvedEvents = allEvents.filter((e) => !e.resolved);
    const eventsByType = new Map<SecurityEvent['type'], number>();
    const eventsBySeverity = new Map<SecurityEvent['severity'], number>();

    allEvents.forEach((e) => {
      eventsByType.set(e.type, (eventsByType.get(e.type) || 0) + 1);
      eventsBySeverity.set(e.severity, (eventsBySeverity.get(e.severity) || 0) + 1);
    });

    return {
      totalEvents: allEvents.length,
      unresolvedEvents: unresolvedEvents.length,
      lockedAccounts: this.accountLockouts.size,
      eventsByType: Object.fromEntries(eventsByType),
      eventsBySeverity: Object.fromEntries(eventsBySeverity),
      recentEvents: allEvents.slice(-10),
    };
  }

  /**
   * Clear old records
   */
  private cleanup(): void {
    const now = Date.now();
    const retentionMs = 7 * 24 * 60 * 60 * 1000; // 7 days

    // Remove expired lockouts
    for (const [email, lockout] of this.accountLockouts) {
      if (new Date() > lockout.unlocksAt) {
        this.accountLockouts.delete(email);
      }
    }

    // Remove old events (keep last 7 days)
    this.securityEvents = this.securityEvents.filter(
      (e) => now - e.createdAt.getTime() < retentionMs
    );

    logInfo('Security monitor cleanup completed', {
      eventsRetained: this.securityEvents.length,
      lockedAccounts: this.accountLockouts.size,
    });
  }
}

/**
 * Export singleton instance
 */
export const securityMonitor = new SecurityMonitor();

/**
 * Export class for testing
 */
export { SecurityMonitor };
