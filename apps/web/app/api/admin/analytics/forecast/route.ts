/**
 * GET /api/admin/analytics/forecast
 * Get predictive forecasts for revenue and demand
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { generateForecast } from '@/lib/analytics/forecasting-engine';

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
    const periods = Math.min(12, parseInt(searchParams.get('periods') || '3'));

    // Get last 12 months of data
    const now = new Date();
    const startDate = new Date(now.setFullYear(now.getFullYear() - 1));

    // Monthly revenue
    const monthlyData = await db.dailyMetrics.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        totalRevenue: true,
        jobsCompleted: true,
      },
    });

    // Aggregate by month
    const monthlyRevenue: Record<string, number> = {};
    const monthlyJobs: Record<string, number> = {};

    monthlyData.forEach((m) => {
      const monthKey = m.date.toISOString().substring(0, 7);
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + Number(m.totalRevenue);
      monthlyJobs[monthKey] = (monthlyJobs[monthKey] || 0) + Number(m.jobsCompleted);
    });

    const sortedMonths = Object.keys(monthlyRevenue).sort();
    const revenueValues = sortedMonths.map((m) => monthlyRevenue[m]);
    const jobValues = sortedMonths.map((m) => monthlyJobs[m]);

    // Generate forecasts
    const revenueForecast = generateForecast('Revenue', revenueValues, periods);
    const demandForecast = generateForecast('Job Demand', jobValues, periods);

    return NextResponse.json({
      success: true,
      summary: {
        currentRevenue: parseFloat(revenueValues[revenueValues.length - 1].toFixed(2)),
        currentDemand: jobValues[jobValues.length - 1],
      },
      forecasts: {
        revenue: revenueForecast,
        demand: demandForecast,
      },
      insights: {
        revenueTrend: revenueForecast.trend,
        demandTrend: demandForecast.trend,
        revenueForecastAccuracy: revenueForecast.accuracy,
        demandForecastAccuracy: demandForecast.accuracy,
      },
      warnings: [
        ...revenueForecast.riskFactors.map((f) => `Revenue: ${f}`),
        ...demandForecast.riskFactors.map((f) => `Demand: ${f}`),
      ],
    });
  } catch (error) {
    console.error('[Admin Analytics] Error generating forecast:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to generate forecast',
        details: message,
      },
      { status: 500 }
    );
  }
}
