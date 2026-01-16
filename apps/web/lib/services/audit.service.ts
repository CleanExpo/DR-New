/**
 * Audit Logging Service
 * Logs security events for compliance, forensics, and security monitoring
 *
 * Logged Events:
 * - Authentication (login success/failure, logout)
 * - Password changes and resets
 * - Account lockouts
 * - 2FA setup/changes
 * - Resource access (bookings, payments, profiles)
 * - Admin actions (user management, permissions)
 * - System changes (configuration, settings)
 */

import { prisma } from '@/lib/prisma';

export type AuditAction =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGIN_LOCKED'
  | 'LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET'
  | 'ACCOUNT_LOCKED'
  | '2FA_ENABLED'
  | '2FA_DISABLED'
  | 'RESOURCE_ACCESSED'
  | 'RESOURCE_CREATED'
  | 'RESOURCE_UPDATED'
  | 'RESOURCE_DELETED'
  | 'PERMISSION_CHANGED'
  | 'ADMIN_ACTION';

export interface AuditLogEntry {
  userId: string;
  action: AuditAction;
  resourceId?: string;
  resourceType?: string;
  status: 'SUCCESS' | 'FAILURE';
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
}

/**
 * Log a security event
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<boolean> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        resourceId: entry.resourceId,
        resourceType: entry.resourceType,
        status: entry.status,
        details: entry.details ? JSON.stringify(entry.details) : null,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });

    return true;
  } catch (error) {
    console.error('Error logging audit event:', error);
    return false;
  }
}

/**
 * Log login attempt
 */
export async function logLoginAttempt(
  userId: string,
  success: boolean,
  ipAddress: string,
  userAgent: string,
  details?: Record<string, any>
): Promise<boolean> {
  return logAuditEvent({
    userId,
    action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE',
    status: 'SUCCESS',
    ipAddress,
    userAgent,
    details,
  });
}

/**
 * Log account lockout
 */
export async function logAccountLockout(
  userId: string,
  ipAddress: string,
  userAgent: string,
  attemptCount?: number
): Promise<boolean> {
  return logAuditEvent({
    userId,
    action: 'ACCOUNT_LOCKED',
    status: 'SUCCESS',
    ipAddress,
    userAgent,
    details: { attemptCount },
  });
}

/**
 * Log password change
 */
export async function logPasswordChange(
  userId: string,
  ipAddress: string,
  userAgent: string,
  changeType: 'PASSWORD_CHANGED' | 'PASSWORD_RESET' = 'PASSWORD_CHANGED'
): Promise<boolean> {
  return logAuditEvent({
    userId,
    action: changeType,
    status: 'SUCCESS',
    ipAddress,
    userAgent,
  });
}

/**
 * Log 2FA change
 */
export async function log2FAChange(
  userId: string,
  action: '2FA_ENABLED' | '2FA_DISABLED',
  ipAddress: string,
  userAgent: string
): Promise<boolean> {
  return logAuditEvent({
    userId,
    action,
    status: 'SUCCESS',
    ipAddress,
    userAgent,
  });
}

/**
 * Log resource access
 */
export async function logResourceAccess(
  userId: string,
  resourceType: string,
  resourceId: string,
  action: 'ACCESSED' | 'CREATED' | 'UPDATED' | 'DELETED',
  success: boolean,
  ipAddress: string,
  userAgent: string,
  details?: Record<string, any>
): Promise<boolean> {
  const actionMap: Record<string, AuditAction> = {
    ACCESSED: 'RESOURCE_ACCESSED',
    CREATED: 'RESOURCE_CREATED',
    UPDATED: 'RESOURCE_UPDATED',
    DELETED: 'RESOURCE_DELETED',
  };

  return logAuditEvent({
    userId,
    action: actionMap[action] || 'RESOURCE_ACCESSED',
    resourceId,
    resourceType,
    status: success ? 'SUCCESS' : 'FAILURE',
    ipAddress,
    userAgent,
    details,
  });
}

/**
 * Get audit logs for a user
 */
export async function getUserAuditLogs(
  userId: string,
  limit: number = 50,
  offset: number = 0
): Promise<any[]> {
  try {
    return await prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  } catch (error) {
    console.error('Error getting user audit logs:', error);
    return [];
  }
}

/**
 * Get audit logs for a resource
 */
export async function getResourceAuditLogs(
  resourceType: string,
  resourceId: string,
  limit: number = 50
): Promise<any[]> {
  try {
    return await prisma.auditLog.findMany({
      where: {
        resourceType,
        resourceId,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Error getting resource audit logs:', error);
    return [];
  }
}

/**
 * Get audit logs for a specific action
 */
export async function getAuditLogsByAction(
  action: AuditAction,
  limit: number = 50,
  hoursAgo: number = 24
): Promise<any[]> {
  try {
    const since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    return await prisma.auditLog.findMany({
      where: {
        action,
        createdAt: { gte: since },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error getting audit logs by action:', error);
    return [];
  }
}

/**
 * Get failed login attempts
 */
export async function getFailedLoginAttempts(
  hoursAgo: number = 24,
  limit: number = 100
): Promise<any[]> {
  return getAuditLogsByAction('LOGIN_FAILURE', limit, hoursAgo);
}

/**
 * Get account lockouts
 */
export async function getAccountLockouts(
  hoursAgo: number = 24,
  limit: number = 50
): Promise<any[]> {
  return getAuditLogsByAction('ACCOUNT_LOCKED', limit, hoursAgo);
}

/**
 * Get suspicious activity (multiple failed logins from same IP)
 */
export async function getSuspiciousActivity(hoursAgo: number = 24): Promise<
  Array<{
    ipAddress: string;
    failedAttempts: number;
    users: string[];
    lastAttempt: Date;
  }>
> {
  try {
    const since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    const result = await prisma.auditLog.groupBy({
      by: ['ipAddress'],
      where: {
        action: 'LOGIN_FAILURE',
        createdAt: { gte: since },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    // Get details for each IP
    const suspicious = [];
    for (const record of result) {
      if ((record._count.id || 0) >= 5) {
        // 5+ failed attempts from same IP
        const logs = await prisma.auditLog.findMany({
          where: {
            ipAddress: record.ipAddress,
            action: 'LOGIN_FAILURE',
            createdAt: { gte: since },
          },
          select: { userId: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        });

        const users = [...new Set(logs.map((l) => l.userId))];

        suspicious.push({
          ipAddress: record.ipAddress,
          failedAttempts: record._count.id || 0,
          users,
          lastAttempt: logs[0]?.createdAt || new Date(),
        });
      }
    }

    return suspicious;
  } catch (error) {
    console.error('Error getting suspicious activity:', error);
    return [];
  }
}

/**
 * Get audit log summary for dashboard
 */
export async function getAuditSummary(hoursAgo: number = 24): Promise<{
  totalEvents: number;
  loginAttempts: number;
  failedLogins: number;
  accountLockouts: number;
  passwordChanges: number;
  suspiciousActivities: number;
}> {
  try {
    const since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    const [total, loginSuccess, loginFail, lockouts, passwordChanges] =
      await Promise.all([
        prisma.auditLog.count({
          where: { createdAt: { gte: since } },
        }),
        prisma.auditLog.count({
          where: {
            action: 'LOGIN_SUCCESS',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: 'LOGIN_FAILURE',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: 'ACCOUNT_LOCKED',
            createdAt: { gte: since },
          },
        }),
        prisma.auditLog.count({
          where: {
            action: {
              in: ['PASSWORD_CHANGED', 'PASSWORD_RESET'],
            },
            createdAt: { gte: since },
          },
        }),
      ]);

    const suspicious = await getSuspiciousActivity(hoursAgo);

    return {
      totalEvents: total,
      loginAttempts: loginSuccess + loginFail,
      failedLogins: loginFail,
      accountLockouts: lockouts,
      passwordChanges: passwordChanges,
      suspiciousActivities: suspicious.length,
    };
  } catch (error) {
    console.error('Error getting audit summary:', error);
    return {
      totalEvents: 0,
      loginAttempts: 0,
      failedLogins: 0,
      accountLockouts: 0,
      passwordChanges: 0,
      suspiciousActivities: 0,
    };
  }
}

/**
 * Clean up old audit logs (retention policy)
 * Keep logs for 90 days by default
 */
export async function cleanupOldAuditLogs(daysToKeep: number = 90): Promise<number> {
  try {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

    const result = await prisma.auditLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    return result.count;
  } catch (error) {
    console.error('Error cleaning up audit logs:', error);
    return 0;
  }
}
