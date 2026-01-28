/**
 * Notification Preferences API
 *
 * GET: Fetch user's notification preferences
 * PUT: Update notification preferences
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from '@/lib/notifications';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Get preferences
    const preferences = await getNotificationPreferences(user.id);

    return NextResponse.json({
      success: true,
      preferences,
    });
  } catch (error) {
    console.error('Error fetching notification preferences:', error);

    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Parse request body
    const body = await request.json();

    // Update preferences
    const updated = await updateNotificationPreferences(user.id, body);

    return NextResponse.json({
      success: true,
      preferences: updated,
    });
  } catch (error) {
    console.error('Error updating notification preferences:', error);

    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}
