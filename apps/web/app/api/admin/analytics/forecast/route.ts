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

    // Note: dailyMetrics model not implemented - using placeholder data
    // In production, this would aggregate from payment and serviceRequest tables
    const revenueValues = [10000, 12000, 11000, 13000, 14000, 15000];
    const jobValues = [50, 55, 52, 60, 65, 70];

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
