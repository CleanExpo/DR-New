// Dashboard Analytics API Route
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { schemas, validateQueryParams } from '@/lib/services/validation-schemas';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';

// GET /api/analytics/dashboard - Get dashboard metrics
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse and validate query parameters
      const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const params = validateQueryParams(schemas.dashboardQuery, searchParams);

      // Check tenant access for multi-tenant scenarios
      const tenantId = params.tenantId || user.tenantId;

      // Ensure user can only access their tenant's data
      if (tenantId && user.tenantId && tenantId !== user.tenantId && user.role !== 'ADMIN') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'FORBIDDEN',
              message: 'Access denied to this tenant\'s data'
            }
          },
          { status: 403 }
        );
      }

      // Convert date strings to Date objects if provided
      const dateFrom = params.dateFrom ? new Date(params.dateFrom) : undefined;
      const dateTo = params.dateTo ? new Date(params.dateTo) : undefined;

      // Fetch dashboard metrics
      const metrics = await analyticsService.getDashboardMetrics(
        tenantId,
        dateFrom,
        dateTo
      );

      // Add cache headers for performance
      const headers = new Headers();
      headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute

      return NextResponse.json(
        {
          success: true,
          data: metrics,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            version: '1.0.0',
            user: {
              id: user.id,
              role: user.role
            }
          }
        },
        { headers }
      );
    } catch (error) {
      console.error('Dashboard API error:', error);

      if (error instanceof Error && error.message.includes('validation')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: error.message,
              details: error
            }
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Failed to fetch dashboard metrics'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER', // Minimum role required
    permissions: [PERMISSIONS.VIEW_ANALYTICS]
  }
);

// OPTIONS /api/analytics/dashboard - Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}