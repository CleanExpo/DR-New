/**
 * GET /api/analytics/metrics
 * Get current analytics metrics for a date range
 *
 * Query params:
 * - startDate: ISO date string (default: today)
 * - endDate: ISO date string (default: today)
 * - period: 'daily' | 'weekly' | 'monthly' (default: 'daily')
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { basePrisma } from '@/lib/prisma';
import { calculateDailyMetrics, aggregateMetrics, getMetricsForPeriod } from '@/lib/analytics/metrics-engine';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Only admins can view global analytics
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const period = (searchParams.get('period') || 'daily') as 'daily' | 'weekly' | 'monthly';

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate);

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO format (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { error: 'startDate must be before endDate' },
        { status: 400 }
      );
    }

    let metrics: any[] = [];

    if (period === 'daily') {
      // Get daily metrics from database
      metrics = await basePrisma.dailyMetrics.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      // If no metrics found for a date, calculate on the fly
      if (metrics.length === 0 && startDate.toDateString() === endDate.toDateString()) {
        const snapshot = await calculateDailyMetrics(startDate);
        metrics = [{ date: startDate, ...snapshot }];
      }
    } else if (period === 'weekly') {
      // Get weekly metrics from database
      metrics = await basePrisma.weeklyReport.findMany({
        where: {
          weekStartDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          weekStartDate: 'asc',
        },
      });
    } else if (period === 'monthly') {
      // Get monthly metrics from database
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      const endMonth = endDate.getMonth() + 1;
      const endYear = endDate.getFullYear();

      metrics = await basePrisma.monthlyMetrics.findMany({
        where: {
          OR: [
            {
              year: startYear,
              month: {
                gte: startMonth,
              },
            },
            {
              year: {
                gt: startYear,
                lt: endYear,
              },
            },
            {
              year: endYear,
              month: {
                lte: endMonth,
              },
            },
          ],
        },
        orderBy: [
          { year: 'asc' },
          { month: 'asc' },
        ],
      });
    }

    // Format response
    const formattedMetrics = metrics.map((m) => ({
      date: m.date || `${m.year}-${String(m.month).padStart(2, '0')}` || m.weekStartDate,
      totalRevenue: Number(m.totalRevenue || 0),
      platformFees: Number(m.platformFees || 0),
      contractorPayouts: Number(m.contractorPayouts || 0),
      jobsCompleted: m.jobsCompleted || 0,
      jobsRequested: m.jobsRequested || 0,
      avgCompletionTime: m.avgCompletionTime || 0,
      paymentSuccessRate: m.paymentSuccessRate || 0,
      paymentFailureCount: m.paymentFailureCount || 0,
      activeContractors: m.activeContractors || 0,
      activeClients: m.activeClients || 0,
      newContractors: m.newContractors || 0,
      newClients: m.newClients || 0,
      avgContractorEarnings: Number(m.avgContractorEarnings || 0),
      avgClientSpend: Number(m.avgClientSpend || 0),
    }));

    // Calculate summary statistics
    const summary = metrics.length > 0
      ? {
          totalRevenue: formattedMetrics.reduce((sum, m) => sum + m.totalRevenue, 0),
          totalPlatformFees: formattedMetrics.reduce((sum, m) => sum + m.platformFees, 0),
          totalJobsCompleted: formattedMetrics.reduce((sum, m) => sum + m.jobsCompleted, 0),
          averagePaymentSuccessRate:
            formattedMetrics.reduce((sum, m) => sum + m.paymentSuccessRate, 0) /
            formattedMetrics.length,
          dataPoints: formattedMetrics.length,
        }
      : null;

    return NextResponse.json({
      success: true,
      period,
      startDate,
      endDate,
      metrics: formattedMetrics,
      summary,
    });
  } catch (error) {
    console.error('[Analytics] Error fetching metrics:', error);

    return NextResponse.json(
      { error: 'Failed to fetch analytics metrics' },
      { status: 500 }
    );
  }
}
