/**
 * Activities API
 *
 * POST /api/crm/activities - Create activity
 * GET /api/crm/activities - List activities
 *
 * @route /api/crm/activities
 */

import { NextRequest, NextResponse } from 'next/server';
import { ActivityType } from '@prisma/client';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { ActivityService } from '@/lib/crm/activity.service';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const activityService = new ActivityService(db);

    const body = await request.json();

    // Validate required fields
    if (!body.type || !body.subject || !body.performedById) {
      return NextResponse.json(
        {
          success: false,
          error: 'type, subject, and performedById are required',
        },
        { status: 400 }
      );
    }

    const activity = await activityService.createActivity(body);

    return NextResponse.json({
      success: true,
      data: activity,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const activityService = new ActivityService(db);

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') as ActivityType | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'userId is required',
        },
        { status: 400 }
      );
    }

    const timeline = await activityService.getTimeline(userId, limit);

    return NextResponse.json({
      success: true,
      data: timeline,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
