// @ts-nocheck
/**
 * Notifications API
 *
 * GET: Fetch user's notifications
 * PATCH: Mark notifications as read
 * POST: Mark specific notification as read
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecentNotifications, markNotificationsAsRead, getUnreadCount } from '@/lib/notifications';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    // Fetch notifications
    const notifications = await db.notification.findMany({
      where: unreadOnly ? { userId: user.id, read: false } : { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Get unread count
    const unreadCount = await getUnreadCount(user.id);

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount,
      total: notifications.length,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return handleUnexpectedError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { notificationIds } = body;

    // Mark as read
    await markNotificationsAsRead(user.id, notificationIds);

    // Get updated unread count
    const unreadCount = await getUnreadCount(user.id);

    return NextResponse.json({
      success: true,
      message: 'Notifications marked as read',
      unreadCount,
    });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return handleUnexpectedError(error);
  }
}

// POST: Mark specific notification as read
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { notificationId } = body;

    if (!notificationId) {
      return NextResponse.json(
        { error: 'notificationId is required' },
        { status: 400 }
      );
    }

    // Mark single notification as read
    await db.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    // Get updated unread count
    const unreadCount = await getUnreadCount(user.id);

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
      unreadCount,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return handleUnexpectedError(error);
  }
}
