/**
 * GET /api/admin/analytics/trends
 * Get trend analysis and historical comparisons
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import {
  calculateMoMGrowth,
  calculateYoYComparison,
  detectSeasonalPattern,
  calculateTrendConsistency,
  identifyInflectionPoints,
  calculatePercentageChange,
} from '@/lib/analytics/trend-analyzer';

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
    const period = searchParams.get('period') || 'year'; // year, quarter, month

    // Get monthly revenue data for analysis
    const monthlyData = await db.dailyMetrics.findMany({
      orderBy: {
        date: 'asc',
      },
      select: {
        date: true,
        totalRevenue: true,
        jobsCompleted: true,
      },
    });

    if (monthlyData.length === 0) {
      return NextResponse.json({
        success: true,
        trends: {
          monthly: [],
          growth: [],
          yoy: null,
          mom: null,
        },
        analysis: {
          seasonalPattern: {},
          consistency: 0,
          inflectionPoints: [],
        },
      });
    }

    // Aggregate to monthly values
    const monthlyRevenue: Record<string, number> = {};
    const monthlyJobs: Record<string, number> = {};

    monthlyData.forEach((metric) => {
      const monthKey = metric.date.toISOString().substring(0, 7);
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + Number(metric.totalRevenue);
      monthlyJobs[monthKey] = (monthlyJobs[monthKey] || 0) + Number(metric.jobsCompleted);
    });

    const sortedMonths = Object.keys(monthlyRevenue).sort();
    const revenueValues = sortedMonths.map((m) => monthlyRevenue[m]);
    const jobValues = sortedMonths.map((m) => monthlyJobs[m]);

    // Calculate month-over-month growth
    const revenueGrowth = calculateMoMGrowth(revenueValues);
    const jobGrowth = calculateMoMGrowth(jobValues);

    // Year-over-year comparison
    let yoyComparison = null;
    const currentYear = new Date().getFullYear();
    const currentYearStart = new Date(currentYear, 0, 1);
    const previousYearStart = new Date(currentYear - 1, 0, 1);

    const currentYearRevenue = monthlyData
      .filter((m) => m.date >= currentYearStart)
      .reduce((sum, m) => sum + Number(m.totalRevenue), 0);

    const previousYearRevenue = monthlyData
      .filter((m) => m.date >= previousYearStart && m.date < currentYearStart)
      .reduce((sum, m) => sum + Number(m.totalRevenue), 0);

    if (previousYearRevenue > 0) {
      yoyComparison = {
        current: parseFloat(currentYearRevenue.toFixed(2)),
        previous: parseFloat(previousYearRevenue.toFixed(2)),
        change: parseFloat((currentYearRevenue - previousYearRevenue).toFixed(2)),
        percentageChange: parseFloat(
          calculatePercentageChange(currentYearRevenue, previousYearRevenue).toFixed(2)
        ),
      };
    }

    // Detect seasonal patterns
    const seasonalPattern = detectSeasonalPattern(revenueValues);

    // Calculate trend consistency
    const revenueConsistency = calculateTrendConsistency(revenueValues);
    const jobConsistency = calculateTrendConsistency(jobValues);

    // Identify inflection points
    const revenueInflectionPoints = identifyInflectionPoints(revenueValues);
    const jobInflectionPoints = identifyInflectionPoints(jobValues);

    return NextResponse.json({
      success: true,
      analysis: {
        dateRange: {
          start: sortedMonths[0],
          end: sortedMonths[sortedMonths.length - 1],
        },
        dataPoints: sortedMonths.length,
      },
      trends: {
        monthly: sortedMonths.map((month, idx) => ({
          month,
          revenue: revenueValues[idx],
          jobsCompleted: jobValues[idx],
          revenueGrowth: revenueGrowth[idx],
          jobGrowth: jobGrowth[idx],
        })),
        yoy: yoyComparison,
      },
      metrics: {
        revenue: {
          consistency: revenueConsistency,
          inflectionPoints: revenueInflectionPoints.map((idx) => ({
            month: sortedMonths[idx],
            value: revenueValues[idx],
          })),
        },
        jobs: {
          consistency: jobConsistency,
          inflectionPoints: jobInflectionPoints.map((idx) => ({
            month: sortedMonths[idx],
            jobs: jobValues[idx],
          })),
        },
      },
      seasonality: {
        pattern: Object.entries(seasonalPattern).reduce(
          (acc, [month, value]) => {
            acc[`month_${month}`] = value;
            return acc;
          },
          {} as Record<string, number>
        ),
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching trend data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch trend analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
