// Contractor Performance Analytics API Route
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { schemas, validateQueryParams } from '@/lib/services/validation-schemas';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';

// GET /api/analytics/contractors - Get contractor performance metrics
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse and validate query parameters
      const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const params = validateQueryParams(schemas.contractorQuery, searchParams);

      // Check tenant access
      const tenantId = params.tenantId || user.tenantId;

      // Contractors can only see their own performance
      if (user.role === 'CONTRACTOR') {
        // Get only the current contractor's performance
        const contractors = await analyticsService.getContractorPerformance(
          tenantId,
          params.sortBy as any
        );

        // Filter to only show current contractor's data
        const contractorData = contractors.find(c => c.contractorId === user.id);

        if (!contractorData) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: 'NOT_FOUND',
                message: 'Contractor performance data not found'
              }
            },
            { status: 404 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            data: [contractorData], // Return as array for consistency
            meta: {
              timestamp: new Date().toISOString(),
              requestId: generateRequestId(),
              version: '1.0.0',
              totalCount: 1
            }
          }
        );
      }

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

      // Fetch contractor performance data
      let contractors = await analyticsService.getContractorPerformance(
        tenantId,
        params.sortBy as any
      );

      // Apply filters
      if (params.filterBySpecialization) {
        contractors = contractors.filter(c =>
          c.specializations.some(s =>
            s.toLowerCase().includes(params.filterBySpecialization!.toLowerCase())
          )
        );
      }

      if (params.minRating !== undefined) {
        contractors = contractors.filter(c => c.rating >= params.minRating!);
      }

      if (params.active !== undefined) {
        // Mock active status based on recent job count
        contractors = contractors.filter(c => {
          const isActive = c.totalJobs > 10; // Active if more than 10 jobs
          return params.active ? isActive : !isActive;
        });
      }

      // Calculate summary statistics for managers and admins
      const summaryStats = user.role === 'ADMIN' || user.role === 'MANAGER' ? {
        totalContractors: contractors.length,
        avgRating: contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length,
        avgCompletionRate: contractors.reduce((sum, c) => sum + c.completionRate, 0) / contractors.length,
        totalRevenue: contractors.reduce((sum, c) => sum + c.revenue, 0),
        topPerformer: contractors[0] // Already sorted by chosen criteria
      } : undefined;

      // Add cache headers
      const headers = new Headers();
      headers.set('Cache-Control', 'private, max-age=300'); // Cache for 5 minutes

      return NextResponse.json(
        {
          success: true,
          data: contractors,
          summary: summaryStats,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            version: '1.0.0',
            query: {
              sortBy: params.sortBy,
              filters: {
                specialization: params.filterBySpecialization,
                minRating: params.minRating,
                active: params.active
              }
            },
            totalCount: contractors.length
          }
        },
        { headers }
      );
    } catch (error) {
      console.error('Contractors API error:', error);

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
            message: 'Failed to fetch contractor performance'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER',
    permissions: [PERMISSIONS.VIEW_CONTRACTORS]
  }
);

// OPTIONS /api/analytics/contractors - Handle CORS preflight
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