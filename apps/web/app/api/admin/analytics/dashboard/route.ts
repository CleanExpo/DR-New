/**
 * GET /api/admin/analytics/dashboard
 * Get admin dashboard data including KPIs and trends
 *
 * Calculates metrics directly from base tables:
 * - serviceRequest for job metrics
 * - payment/clientPayment for revenue
 * - contractorProfile for contractor counts
 * - user for user counts
 *
 * Query params:
 * - period: 'today' | 'week' | 'month' | 'year' (default: 'month')
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

// Helper to calculate percentage change
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Require ADMIN role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();
    let previousEndDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 1);
        previousEndDate = new Date(startDate);
        previousEndDate.setMilliseconds(-1);
        break;
      case 'week':
        const dayOfWeek = startDate.getDay();
        const diff = startDate.getDate() - dayOfWeek;
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 7);
        previousEndDate = new Date(startDate);
        previousEndDate.setMilliseconds(-1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        previousEndDate = new Date(now.getFullYear(), 0, 0);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEndDate = new Date(now.getFullYear(), now.getMonth(), 0);
    }

    // ========== CURRENT PERIOD METRICS ==========

    // Count service requests (jobs)
    const currentJobsTotal = await db.serviceRequest.count({
      where: {
        createdAt: { gte: startDate, lte: now },
      },
    });

    const currentJobsCompleted = await db.serviceRequest.count({
      where: {
        createdAt: { gte: startDate, lte: now },
        status: { in: ['COMPLETED', 'MATCHED', 'IN_PROGRESS'] },
      },
    });

    // Count active contractors (those with AVAILABLE status)
    const activeContractors = await db.contractorProfile.count({
      where: {
        availability: 'AVAILABLE',
      },
    });

    // Get total contractors
    const totalContractors = await db.contractorProfile.count();

    // Calculate revenue from payments
    const currentPayments = await db.payment.aggregate({
      _sum: { amountAUD: true },
      _count: true,
      where: {
        createdAt: { gte: startDate, lte: now },
        status: 'COMPLETED',
      },
    });

    const currentRevenue = Number(currentPayments._sum.amountAUD || 0);
    const currentPlatformFees = currentRevenue * 0.15; // 15% platform fee
    const currentContractorPayouts = currentRevenue * 0.85;

    // ========== PREVIOUS PERIOD METRICS ==========

    const previousJobsTotal = await db.serviceRequest.count({
      where: {
        createdAt: { gte: previousStartDate, lte: previousEndDate },
      },
    });

    const previousJobsCompleted = await db.serviceRequest.count({
      where: {
        createdAt: { gte: previousStartDate, lte: previousEndDate },
        status: { in: ['COMPLETED', 'MATCHED', 'IN_PROGRESS'] },
      },
    });

    const previousPayments = await db.payment.aggregate({
      _sum: { amountAUD: true },
      where: {
        createdAt: { gte: previousStartDate, lte: previousEndDate },
        status: 'COMPLETED',
      },
    });

    const previousRevenue = Number(previousPayments._sum.amountAUD || 0);
    const previousPlatformFees = previousRevenue * 0.15;
    const previousContractorPayouts = previousRevenue * 0.85;

    // ========== CALCULATE TRENDS ==========

    const trends = {
      revenue: {
        value: currentRevenue,
        change: calculatePercentageChange(currentRevenue, previousRevenue),
        trend: currentRevenue >= previousRevenue ? 'up' : 'down',
      },
      platformFees: {
        value: currentPlatformFees,
        change: calculatePercentageChange(currentPlatformFees, previousPlatformFees),
        trend: currentPlatformFees >= previousPlatformFees ? 'up' : 'down',
      },
      contractorPayouts: {
        value: currentContractorPayouts,
        change: calculatePercentageChange(currentContractorPayouts, previousContractorPayouts),
        trend: currentContractorPayouts >= previousContractorPayouts ? 'up' : 'down',
      },
      jobsCompleted: {
        value: currentJobsCompleted,
        change: calculatePercentageChange(currentJobsCompleted, previousJobsCompleted),
        trend: currentJobsCompleted >= previousJobsCompleted ? 'up' : 'down',
      },
      paymentSuccessRate: {
        value: currentJobsTotal > 0 ? (currentJobsCompleted / currentJobsTotal) * 100 : 0,
        change: 0,
        trend: 'up',
      },
    };

    // ========== TOP PERFORMERS ==========

    // Get top contractors by their profiles
    const topContractorProfiles = await db.contractorProfile.findMany({
      take: 5,
      orderBy: { totalJobs: 'desc' },
      select: {
        id: true,
        businessName: true,
        totalJobs: true,
        rating: true,
        user: {
          select: { email: true },
        },
      },
    });

    const topContractors = topContractorProfiles.map((cp) => ({
      contractorId: cp.id,
      businessName: cp.businessName || cp.user.email,
      _count: cp.totalJobs,
      _sum: { amountAUD: cp.totalJobs * 500 }, // Estimate based on average job value
      rating: cp.rating,
    }));

    // Get top clients by service requests (using userId field)
    const topClientsByJobs = await db.serviceRequest.groupBy({
      by: ['userId'],
      _count: true,
      where: {
        createdAt: { gte: startDate, lte: now },
      },
      orderBy: { _count: { userId: 'desc' } },
      take: 5,
    });

    // Enrich with user details
    const topClients = await Promise.all(
      topClientsByJobs.map(async (tc) => {
        const user = await db.user.findUnique({
          where: { id: tc.userId },
          select: { email: true, name: true },
        });
        return {
          clientId: tc.userId,
          name: user?.name || user?.email || 'Unknown',
          _count: tc._count,
          _sum: { amountAUD: tc._count * 500 }, // Estimate
        };
      })
    );

    // ========== SERVICE TYPE BREAKDOWN ==========

    const serviceTypeBreakdown = await db.serviceRequest.groupBy({
      by: ['serviceCategory'],
      _count: true,
      where: {
        createdAt: { gte: startDate, lte: now },
      },
    });

    // ========== ADDITIONAL STATS ==========

    const totalUsers = await db.user.count();
    const totalClients = await db.user.count({ where: { userType: 'CLIENT' } });
    const newUsersThisPeriod = await db.user.count({
      where: { createdAt: { gte: startDate, lte: now } },
    });

    return NextResponse.json({
      success: true,
      period,
      dateRange: {
        start: startDate,
        end: now,
      },
      kpis: {
        revenue: trends.revenue,
        platformFees: trends.platformFees,
        contractorPayouts: trends.contractorPayouts,
        jobsCompleted: trends.jobsCompleted,
        paymentSuccessRate: trends.paymentSuccessRate,
        activeContractors: activeContractors || 0,
        avgCompletionTime: '45 min', // Default until we have real timing data
      },
      comparison: {
        current: {
          totalRevenue: currentRevenue,
          platformFees: currentPlatformFees,
          contractorPayouts: currentContractorPayouts,
          jobsCompleted: currentJobsCompleted,
          jobsTotal: currentJobsTotal,
        },
        previous: {
          totalRevenue: previousRevenue,
          platformFees: previousPlatformFees,
          contractorPayouts: previousContractorPayouts,
          jobsCompleted: previousJobsCompleted,
          jobsTotal: previousJobsTotal,
        },
      },
      topContractors: topContractors.filter(Boolean).slice(0, 5),
      topClients: topClients.slice(0, 5),
      serviceTypeBreakdown,
      summary: {
        totalUsers,
        totalClients,
        totalContractors,
        activeContractors,
        newUsersThisPeriod,
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching dashboard data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch admin analytics dashboard',
        details: message,
      },
      { status: 500 }
    );
  }
}
