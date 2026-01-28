/**
 * GET /api/admin/analytics/operational
 * Get operational metrics including job completion rates, times, and contractor utilization
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Service request metrics
    const totalServiceRequests = await db.serviceRequest.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const completedRequests = await db.booking.count({
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const completionRate =
      totalServiceRequests > 0 ? (completedRequests / totalServiceRequests) * 100 : 0;

    // Time to completion
    const completedBookings = await db.booking.findMany({
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        acceptedAt: true,
        completedAt: true,
        createdAt: true,
      },
    });

    const completionTimes = completedBookings
      .map((b) => {
        if (b.acceptedAt && b.completedAt) {
          return (b.completedAt.getTime() - b.acceptedAt.getTime()) / (1000 * 60 * 60); // in hours
        }
        return 0;
      })
      .filter((t) => t > 0);

    const avgCompletionTime =
      completionTimes.length > 0
        ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
        : 0;

    // Contractor utilization
    const activeContractors = await db.contractor.count({
      where: {
        isVerified: true,
        isActive: true,
      },
    });

    const jobsByContractor = await db.booking.groupBy({
      by: ['contractorId'],
      _count: true,
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const avgJobsPerContractor =
      jobsByContractor.length > 0
        ? jobsByContractor.reduce((sum, b) => sum + b._count, 0) / jobsByContractor.length
        : 0;

    // Jobs by status
    const jobsByStatus = await db.booking.groupBy({
      by: ['status'],
      _count: true,
    });

    // Service request volume by type
    const requestsByServiceType = await db.serviceRequest.groupBy({
      by: ['australianServiceType'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Daily metrics
    const dailyMetrics = await db.dailyMetrics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        date: true,
        jobsCompleted: true,
        jobsRequested: true,
        avgCompletionTime: true,
      },
    });

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary: {
        totalServiceRequests,
        completedRequests,
        completionRate: parseFloat(completionRate.toFixed(2)),
        avgCompletionTimeHours: parseFloat(avgCompletionTime.toFixed(2)),
        activeContractors,
        avgJobsPerContractor: parseFloat(avgJobsPerContractor.toFixed(2)),
      },
      jobStatus: jobsByStatus.map((item) => ({
        status: item.status,
        count: item._count,
      })),
      serviceTypeDistribution: requestsByServiceType.map((item) => ({
        serviceType: item.australianServiceType,
        count: item._count,
      })),
      trends: {
        daily: dailyMetrics.map((m) => ({
          date: m.date,
          jobsCompleted: m.jobsCompleted,
          jobsRequested: m.jobsRequested,
          avgCompletionTime: m.avgCompletionTime,
        })),
      },
      contractorMetrics: {
        totalActive: activeContractors,
        avgJobsPerContractor: parseFloat(avgJobsPerContractor.toFixed(2)),
        topContractors: jobsByContractor
          .sort((a, b) => b._count - a._count)
          .slice(0, 10)
          .map((item) => ({
            contractorId: item.contractorId,
            jobsCompleted: item._count,
          })),
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching operational data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch operational analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
