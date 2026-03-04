/**
 * GET /api/admin/analytics/comparison
 * Compare two custom periods with detailed metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { calculatePercentageChange } from '@/lib/analytics/trend-analyzer';

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

    // Period 1 (Current)
    const period1Start = searchParams.get('period1Start');
    const period1End = searchParams.get('period1End');

    // Period 2 (Previous)
    const period2Start = searchParams.get('period2Start');
    const period2End = searchParams.get('period2End');

    if (!period1Start || !period1End || !period2Start || !period2End) {
      return NextResponse.json(
        { error: 'Missing required date parameters' },
        { status: 400 }
      );
    }

    const p1Start = new Date(period1Start);
    const p1End = new Date(period1End);
    const p2Start = new Date(period2Start);
    const p2End = new Date(period2End);

    // Fetch data for both periods in parallel
    const [period1Payments, period2Payments, period1Bookings, period2Bookings] = await Promise.all([
      db.payment.findMany({
        where: { status: 'COMPLETED', createdAt: { gte: p1Start, lte: p1End } },
      }),
      db.payment.findMany({
        where: { status: 'COMPLETED', createdAt: { gte: p2Start, lte: p2End } },
      }),
      db.booking.findMany({
        where: { completedAt: { gte: p1Start, lte: p1End } },
      }),
      db.booking.findMany({
        where: { completedAt: { gte: p2Start, lte: p2End } },
      }),
    ]);

    // Calculate metrics for both periods
    function calculateMetrics(payments: any[], bookings: any[]) {
      const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
      const platformFees = totalRevenue * 0.2;
      const contractorPayouts = totalRevenue * 0.8;
      const avgTransactionValue = payments.length > 0 ? totalRevenue / payments.length : 0;
      const avgJobValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;

      return {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        platformFees: parseFloat(platformFees.toFixed(2)),
        contractorPayouts: parseFloat(contractorPayouts.toFixed(2)),
        transactionCount: payments.length,
        avgTransactionValue: parseFloat(avgTransactionValue.toFixed(2)),
        jobsCompleted: bookings.length,
        avgJobValue: parseFloat(avgJobValue.toFixed(2)),
      };
    }

    const period1Metrics = calculateMetrics(period1Payments, period1Bookings);
    const period2Metrics = calculateMetrics(period2Payments, period2Bookings);

    // Calculate changes
    function calculateChange(current: number, previous: number) {
      const change = current - previous;
      const percentageChange = calculatePercentageChange(current, previous);
      return {
        value: parseFloat(change.toFixed(2)),
        percentage: parseFloat(percentageChange.toFixed(2)),
        trend: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'stable',
      };
    }

    return NextResponse.json({
      success: true,
      periods: {
        current: {
          start: p1Start,
          end: p1End,
        },
        previous: {
          start: p2Start,
          end: p2End,
        },
      },
      comparison: {
        revenue: {
          current: period1Metrics.totalRevenue,
          previous: period2Metrics.totalRevenue,
          change: calculateChange(period1Metrics.totalRevenue, period2Metrics.totalRevenue),
        },
        platformFees: {
          current: period1Metrics.platformFees,
          previous: period2Metrics.platformFees,
          change: calculateChange(period1Metrics.platformFees, period2Metrics.platformFees),
        },
        contractorPayouts: {
          current: period1Metrics.contractorPayouts,
          previous: period2Metrics.contractorPayouts,
          change: calculateChange(period1Metrics.contractorPayouts, period2Metrics.contractorPayouts),
        },
        jobsCompleted: {
          current: period1Metrics.jobsCompleted,
          previous: period2Metrics.jobsCompleted,
          change: calculateChange(period1Metrics.jobsCompleted, period2Metrics.jobsCompleted),
        },
        avgTransactionValue: {
          current: period1Metrics.avgTransactionValue,
          previous: period2Metrics.avgTransactionValue,
          change: calculateChange(period1Metrics.avgTransactionValue, period2Metrics.avgTransactionValue),
        },
        avgJobValue: {
          current: period1Metrics.avgJobValue,
          previous: period2Metrics.avgJobValue,
          change: calculateChange(period1Metrics.avgJobValue, period2Metrics.avgJobValue),
        },
        transactionCount: {
          current: period1Metrics.transactionCount,
          previous: period2Metrics.transactionCount,
          change: calculateChange(period1Metrics.transactionCount, period2Metrics.transactionCount),
        },
      },
      summary: {
        totalRevenuePeriod1: period1Metrics.totalRevenue,
        totalRevenuePeriod2: period2Metrics.totalRevenue,
        revenueGrowth: parseFloat(
          calculatePercentageChange(period1Metrics.totalRevenue, period2Metrics.totalRevenue).toFixed(2)
        ),
        jobsGrowth: parseFloat(
          calculatePercentageChange(period1Metrics.jobsCompleted, period2Metrics.jobsCompleted).toFixed(2)
        ),
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching comparison data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch comparison analytics' },
      { status: 500 }
    );
  }
}
