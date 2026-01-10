/**
 * Security Alerts Management Endpoint
 *
 * GET  /api/security/alerts     - Get recent security alerts
 * POST /api/security/alerts     - Create manual alert
 * PUT  /api/security/alerts/:id - Update alert status
 *
 * Requires admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { securityMonitor, SecurityEvent } from '@/lib/security/security-monitor';
import { alertService } from '@/lib/security/alert-service';
import { logError, logInfo, logWarn } from '@/lib/logger/helpers';

/**
 * GET /api/security/alerts
 * Retrieve security alerts and monitoring statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, userType: true },
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - admin access required' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    const severity = url.searchParams.get('severity') as SecurityEvent['severity'] | null;
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 500);
    const stats = url.searchParams.get('stats') === 'true';

    // Get security monitor stats
    const monitorStats = securityMonitor.getStats();
    const alertStats = alertService.getStats();

    // Get unresolved events
    const unresolvedEvents = securityMonitor.getUnresolvedEvents(limit, severity || undefined);

    const response: any = {
      events: unresolvedEvents,
      monitoring: {
        totalEvents: monitorStats.totalEvents,
        unresolvedEvents: monitorStats.unresolvedEvents,
        lockedAccounts: monitorStats.lockedAccounts,
        eventsByType: monitorStats.eventsByType,
        eventsBySeverity: monitorStats.eventsBySeverity,
      },
      alerts: {
        total: alertStats.totalAlerts,
        byType: alertStats.alertsByType,
        bySeverity: alertStats.alertsBySeverity,
      },
    };

    if (stats) {
      response.recentMonitoringEvents = monitorStats.recentEvents;
      response.recentAlerts = alertStats.recentAlerts;
    }

    return NextResponse.json(response);
  } catch (error) {
    logError(error, { context: 'get_security_alerts' });
    return NextResponse.json(
      { error: 'Failed to retrieve security alerts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/security/alerts
 * Create a manual security alert (admin only)
 *
 * Body:
 * ```json
 * {
 *   "type": "CUSTOM",
 *   "severity": "HIGH",
 *   "subject": "Suspicious activity detected",
 *   "message": "Detailed description...",
 *   "email": "user@example.com",
 *   "details": { ... }
 * }
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, userType: true },
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { type, severity, subject, message, email, phone, details } = body;

    // Validate required fields
    if (!type || !severity || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: type, severity, subject, message' },
        { status: 400 }
      );
    }

    // Create security event
    const event = securityMonitor.createSecurityEvent(
      type,
      severity,
      'admin-created', // IP address for admin-created alerts
      email,
      user.id,
      details || {}
    );

    // Send alert
    const sent = await alertService.sendAlert({
      type,
      severity,
      subject,
      message,
      email,
      phone,
      userId: user.id,
      details,
    });

    logInfo('Manual security alert created by admin', {
      alertType: type,
      severity,
      createdBy: user.id,
      target: email,
    });

    return NextResponse.json({
      success: true,
      event,
      alertSent: sent,
    });
  } catch (error) {
    logError(error, { context: 'create_security_alert' });
    return NextResponse.json(
      { error: 'Failed to create security alert' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/security/alerts/:id
 * Update alert status (resolve, acknowledge, etc.)
 *
 * Body:
 * ```json
 * {
 *   "action": "resolve",
 *   "note": "Manual review completed - no threat"
 * }
 * ```
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, userType: true },
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { eventId, action, note } = body;

    if (!eventId || !action) {
      return NextResponse.json(
        { error: 'Missing eventId or action' },
        { status: 400 }
      );
    }

    // Process action
    switch (action) {
      case 'resolve':
        securityMonitor.resolveEvent(eventId);
        logInfo('Security event resolved', {
          eventId,
          resolvedBy: user.id,
          note,
        });
        break;

      case 'acknowledge':
        // TODO: Add acknowledgment tracking
        logInfo('Security event acknowledged', {
          eventId,
          acknowledgedBy: user.id,
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      eventId,
    });
  } catch (error) {
    logError(error, { context: 'update_security_alert' });
    return NextResponse.json(
      { error: 'Failed to update security alert' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/security/alerts
 * Clear alert history (dangerous operation)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, userType: true },
    });

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Require explicit confirmation
    const url = new URL(request.url);
    const confirm = url.searchParams.get('confirm') === 'true';

    if (!confirm) {
      return NextResponse.json(
        { error: 'Add ?confirm=true to clear history' },
        { status: 400 }
      );
    }

    // Clear alert history
    alertService.clearHistory();

    logInfo('Alert history cleared by admin', {
      clearedBy: user.id,
    });

    return NextResponse.json({
      success: true,
      message: 'Alert history cleared',
    });
  } catch (error) {
    logError(error, { context: 'delete_security_alerts' });
    return NextResponse.json(
      { error: 'Failed to clear alert history' },
      { status: 500 }
    );
  }
}
