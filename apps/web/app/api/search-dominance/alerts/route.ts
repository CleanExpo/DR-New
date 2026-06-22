// @ts-nocheck

/**
 * Search Dominance Alerts API
 *
 * GET /api/search-dominance/alerts
 * Returns alert feed with filtering
 *
 * PATCH /api/search-dominance/alerts
 * Marks alerts as read
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);

    // Query parameters
    const severity = searchParams.get('severity') || undefined; // CRITICAL, WARNING, INFO
    const type = searchParams.get('type') || undefined;
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const actionRequired = searchParams.get('actionRequired') === 'true';
    const days = parseInt(searchParams.get('days') || '7');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      createdAt: {
        gte: startDate,
      },
    };

    if (severity) where.severity = severity;
    if (type) where.type = type;
    if (unreadOnly) where.isRead = false;
    if (actionRequired) where.actionRequired = true;

    // Get alerts, counts and stats all in parallel
    const [
      alerts,
      total,
      unreadCount,
      criticalCount,
      warningCount,
      infoCount,
      byType,
      actionRequiredCount,
    ] = await Promise.all([
      db.searchAlert.findMany({
        where,
        orderBy: [{ actionRequired: 'desc' }, { severity: 'desc' }, { createdAt: 'desc' }],
        take: limit,
        skip: offset,
      }),
      db.searchAlert.count({ where }),
      db.searchAlert.count({ where: { ...where, isRead: false } }),
      db.searchAlert.count({ where: { ...where, severity: 'CRITICAL' } }),
      db.searchAlert.count({ where: { ...where, severity: 'WARNING' } }),
      db.searchAlert.count({ where: { ...where, severity: 'INFO' } }),
      db.searchAlert.groupBy({
        by: ['type'],
        where,
        _count: true,
        orderBy: { _count: { type: 'desc' } },
      }),
      db.searchAlert.count({ where: { ...where, actionRequired: true, isRead: false } }),
    ]);

    const stats = {
      total,
      unread: unreadCount,
      bySeverity: { CRITICAL: criticalCount, WARNING: warningCount, INFO: infoCount },
      byType,
      actionRequired: actionRequiredCount,
    };

    return NextResponse.json({
      alerts: alerts.map((a) => ({
        id: a.id,
        type: a.type,
        severity: a.severity,
        title: a.title,
        message: a.message,
        keyword: a.keyword,
        competitor: a.competitor,
        metric: a.metric,
        oldValue: a.oldValue,
        newValue: a.newValue,
        actionRequired: a.actionRequired,
        actionUrl: a.actionUrl,
        isRead: a.isRead,
        createdAt: a.createdAt,
      })),
      stats,
      pagination: {
        limit,
        offset,
        hasMore: offset + alerts.length < total,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { alertIds, isRead } = body;

    if (!Array.isArray(alertIds)) {
      return NextResponse.json(
        { error: 'alertIds must be an array' },
        { status: 400 }
      );
    }

    // Update alerts
    const result = await db.searchAlert.updateMany({
      where: {
        id: {
          in: alertIds,
        },
      },
      data: {
        isRead: isRead !== undefined ? isRead : true,
      },
    });

    return NextResponse.json({
      success: true,
      updatedCount: result.count,
    });
  } catch (error) {
    console.error('[API] Error updating alerts:', error);
    return NextResponse.json(
      { error: 'Failed to update alerts' },
      { status: 500 }
    );
  }
}
