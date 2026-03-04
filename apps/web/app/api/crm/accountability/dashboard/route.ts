/**
 * Accountability Dashboard API
 *
 * GET /api/crm/accountability/dashboard - Get complete dashboard data
 *
 * @route /api/crm/accountability/dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { BusinessRulesMonitorService } from '@/lib/crm/business-rules-monitor.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const monitorService = new BusinessRulesMonitorService(db);

    const dashboardData = await monitorService.getDashboardData();

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/crm/accountability/dashboard - Trigger manual rule evaluation
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const monitorService = new BusinessRulesMonitorService(db);

    const results = await monitorService.runMonitoring();

    return NextResponse.json({
      success: true,
      data: results,
      message: 'Business rules evaluation completed',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
