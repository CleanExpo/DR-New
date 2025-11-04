// Revenue Analytics API Route
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { schemas, validateQueryParams } from '@/lib/services/validation-schemas';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';
import type { Period } from '@/lib/services/analytics-service';

// GET /api/analytics/revenue - Get revenue breakdown
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse and validate query parameters
      const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const params = validateQueryParams(schemas.revenueQuery, searchParams);

      // Check tenant access
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

      // Validate date range
      if (dateFrom && dateTo && dateFrom > dateTo) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid date range: dateFrom must be before dateTo'
            }
          },
          { status: 400 }
        );
      }

      // Fetch revenue breakdown
      const revenue = await analyticsService.getRevenueBreakdown(
        params.period as Period,
        tenantId,
        dateFrom,
        dateTo
      );

      // Apply groupBy filter if specified
      let filteredRevenue = revenue;
      if (params.groupBy) {
        switch(params.groupBy) {
          case 'service':
            filteredRevenue = {
              ...revenue,
              byInsurer: [],
              byLocation: []
            };
            break;
          case 'insurer':
            filteredRevenue = {
              ...revenue,
              byServiceType: [],
              byLocation: []
            };
            break;
          case 'location':
            filteredRevenue = {
              ...revenue,
              byServiceType: [],
              byInsurer: []
            };
            break;
        }
      }

      // Add forecasts if requested (only for ADMIN/MANAGER roles)
      if (params.includeForecasts && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
        const predictive = await analyticsService.getPredictiveAnalytics(tenantId);
        filteredRevenue = {
          ...filteredRevenue,
          forecasts: predictive.revenueProjection
        };
      }

      // Add appropriate cache headers based on period
      const headers = new Headers();
      const cacheTime = getCacheTimeForPeriod(params.period);
      headers.set('Cache-Control', `private, max-age=${cacheTime}`);

      return NextResponse.json(
        {
          success: true,
          data: filteredRevenue,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            version: '1.0.0',
            query: {
              period: params.period,
              groupBy: params.groupBy,
              dateRange: dateFrom && dateTo ? { from: dateFrom, to: dateTo } : null
            }
          }
        },
        { headers }
      );
    } catch (error) {
      console.error('Revenue API error:', error);

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
            message: 'Failed to fetch revenue breakdown'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER',
    permissions: [PERMISSIONS.VIEW_ANALYTICS]
  }
);

// OPTIONS /api/analytics/revenue - Handle CORS preflight
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

function getCacheTimeForPeriod(period: string): number {
  switch(period) {
    case 'day':
      return 60; // 1 minute
    case 'week':
      return 300; // 5 minutes
    case 'month':
      return 600; // 10 minutes
    case 'quarter':
      return 1800; // 30 minutes
    case 'year':
      return 3600; // 1 hour
    default:
      return 60;
  }
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}