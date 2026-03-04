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

    // Fetch all operational metrics in parallel
    const [
      totalServiceRequests,
      completedRequests,
      completedBookings,
      activeContractors,
      jobsByContractor,
      jobsByStatus,
      requestsByServiceType,
    ] = await Promise.all([
      db.serviceRequest.count({ where: { createdAt: { gte: startDate, lte: endDate } } }),
      db.booking.count({ where: { completedAt: { gte: startDate, lte: endDate } } }),
      db.booking.findMany({
        where: { completedAt: { gte: startDate, lte: endDate } },
        select: { startedAt: true, completedAt: true, createdAt: true },
      }),
      db.contractor.count({ where: { isVerified: true, isActive: true } }),
      db.booking.groupBy({
        by: ['contractorId'],
        _count: true,
        where: { completedAt: { gte: startDate, lte: endDate } },
      }),
      db.booking.groupBy({ by: ['status'], _count: true }),
      db.serviceRequest.groupBy({
        by: ['serviceCategory'],
        _count: true,
        where: { createdAt: { gte: startDate, lte: endDate } },
      }),
    ]);

    const completionRate =
      totalServiceRequests > 0 ? (completedRequests / totalServiceRequests) * 100 : 0;

    // Calculate avg completion time — single pass (skip .filter())
    let completionTimeSum = 0;
    let completionTimeCount = 0;
    for (const b of completedBookings) {
      if (b.startedAt && b.completedAt) {
        completionTimeSum += (b.completedAt.getTime() - b.startedAt.getTime()) / (1000 * 60 * 60);
        completionTimeCount++;
      }
    }
    const avgCompletionTime = completionTimeCount > 0 ? completionTimeSum / completionTimeCount : 0;

    const avgJobsPerContractor =
      jobsByContractor.length > 0
        ? jobsByContractor.reduce((sum, b) => sum + b._count, 0) / jobsByContractor.length
        : 0;

    // Note: dailyMetrics model not implemented - returning empty array
    const dailyMetrics: { date: Date; jobsCompleted: number; jobsRequested: number; avgCompletionTime: number }[] = [];

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
        serviceType: item.serviceCategory,
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

    return NextResponse.json(
      { error: 'Failed to fetch operational analytics' },
      { status: 500 }
    );
  }
}
