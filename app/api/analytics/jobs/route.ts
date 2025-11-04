// Job Completion Metrics API Route
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { schemas, validateQueryParams } from '@/lib/services/validation-schemas';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';

// GET /api/analytics/jobs - Get job completion metrics
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse and validate query parameters
      const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());

      // Parse array parameters properly
      const queryParams = {
        ...searchParams,
        serviceTypes: searchParams.serviceTypes ? searchParams.serviceTypes.split(',') : undefined,
        priorities: searchParams.priorities ? searchParams.priorities.split(',') : undefined,
        insurers: searchParams.insurers ? searchParams.insurers.split(',') : undefined
      };

      const params = validateQueryParams(schemas.jobMetricsQuery, queryParams);

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

      // Create filters object
      const filters = {
        serviceTypes: params.serviceTypes,
        priorities: params.priorities,
        insurers: params.insurers
      };

      // Fetch job metrics
      let jobMetrics = await analyticsService.getJobCompletionMetrics(
        tenantId,
        dateFrom,
        dateTo,
        filters
      );

      // Apply additional filtering based on parameters
      if (params.serviceTypes && params.serviceTypes.length > 0) {
        jobMetrics = {
          ...jobMetrics,
          byServiceType: jobMetrics.byServiceType.filter(item =>
            params.serviceTypes!.includes(item.serviceType)
          )
        };
      }

      if (params.priorities && params.priorities.length > 0) {
        jobMetrics = {
          ...jobMetrics,
          byPriority: jobMetrics.byPriority.filter(item =>
            params.priorities!.includes(item.priority)
          )
        };
      }

      if (params.insurers && params.insurers.length > 0) {
        jobMetrics = {
          ...jobMetrics,
          byInsurer: jobMetrics.byInsurer.filter(item =>
            params.insurers!.includes(item.insurer)
          )
        };
      }

      // Remove delayed jobs if not requested
      if (!params.includeDelayed) {
        jobMetrics = {
          ...jobMetrics,
          delayedJobs: []
        };
      }

      // Calculate additional insights for managers and admins
      const insights = (user.role === 'ADMIN' || user.role === 'MANAGER') ? {
        performanceIndicators: {
          onTimeDeliveryRate: ((jobMetrics.completedJobs - jobMetrics.delayedJobs.length) / jobMetrics.completedJobs * 100).toFixed(2),
          avgDelayImpact: jobMetrics.delayedJobs.reduce((sum, j) => sum + j.impactedRevenue, 0) / (jobMetrics.delayedJobs.length || 1),
          emergencyResponseRate: jobMetrics.byPriority.find(p => p.priority === 'EMERGENCY')?.completionRate || 0,
          insuranceApprovalRate: calculateAvgApprovalRate(jobMetrics.byInsurer)
        },
        recommendations: generateRecommendations(jobMetrics)
      } : undefined;

      // Add cache headers
      const headers = new Headers();
      headers.set('Cache-Control', 'private, max-age=180'); // Cache for 3 minutes

      return NextResponse.json(
        {
          success: true,
          data: jobMetrics,
          insights,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            version: '1.0.0',
            query: {
              dateRange: dateFrom && dateTo ? { from: dateFrom, to: dateTo } : null,
              filters: {
                serviceTypes: params.serviceTypes,
                priorities: params.priorities,
                insurers: params.insurers,
                includeDelayed: params.includeDelayed
              }
            }
          }
        },
        { headers }
      );
    } catch (error) {
      console.error('Jobs API error:', error);

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
            message: 'Failed to fetch job metrics'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER',
    permissions: [PERMISSIONS.VIEW_JOBS]
  }
);

// OPTIONS /api/analytics/jobs - Handle CORS preflight
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

function calculateAvgApprovalRate(insurerData: any[]): number {
  if (!insurerData || insurerData.length === 0) return 0;
  const totalRate = insurerData.reduce((sum, i) => sum + i.approvalRate, 0);
  return parseFloat((totalRate / insurerData.length).toFixed(2));
}

function generateRecommendations(metrics: any): string[] {
  const recommendations: string[] = [];

  // Check completion rate
  if (metrics.completionRate < 80) {
    recommendations.push('Consider increasing contractor capacity to improve completion rates');
  }

  // Check emergency response
  const emergencyPriority = metrics.byPriority.find((p: any) => p.priority === 'EMERGENCY');
  if (emergencyPriority && emergencyPriority.avgResponseTime > 2) {
    recommendations.push('Emergency response time exceeds target - review dispatch procedures');
  }

  // Check delayed jobs
  if (metrics.delayedJobs.length > metrics.totalJobs * 0.1) {
    recommendations.push('High number of delayed jobs detected - investigate root causes');
  }

  // Check service type performance
  const underperformingServices = metrics.byServiceType.filter((s: any) => s.completionRate < 70);
  if (underperformingServices.length > 0) {
    recommendations.push(`Improve training for: ${underperformingServices.map((s: any) => s.serviceType).join(', ')}`);
  }

  // Check insurance approval rates
  const lowApprovalInsurers = metrics.byInsurer.filter((i: any) => i.approvalRate < 80);
  if (lowApprovalInsurers.length > 0) {
    recommendations.push(`Review documentation requirements for: ${lowApprovalInsurers.map((i: any) => i.insurer).join(', ')}`);
  }

  return recommendations;
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}