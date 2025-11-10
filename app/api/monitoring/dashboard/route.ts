/**
 * Monitoring Dashboard API Endpoint
 * Provides real-time monitoring metrics and analytics data
 */

import { NextRequest, NextResponse } from 'next/server';
import { errorTracker } from '@/lib/monitoring/error-tracking';
import { PerformanceMonitor } from '@/lib/monitoring/error-tracking';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('range') || '24h';

    // Get error statistics
    const errorStats = errorTracker.getStatistics();

    // Get performance metrics
    const performanceMetrics = PerformanceMonitor.getAllMetrics();

    // Calculate health score
    const healthScore = calculateHealthScore(errorStats, performanceMetrics);

    const dashboardData = {
      timestamp: new Date().toISOString(),
      timeRange,
      healthScore,
      errors: {
        total: errorStats.totalErrors,
        unique: errorStats.uniqueErrors,
        topErrors: errorStats.topErrors,
      },
      performance: performanceMetrics,
      status: healthScore > 90 ? 'healthy' : healthScore > 70 ? 'degraded' : 'critical',
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('[Monitoring] Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data' },
      { status: 500 }
    );
  }
}

function calculateHealthScore(
  errorStats: { totalErrors: number; uniqueErrors: number },
  performanceMetrics: Record<string, any>
): number {
  let score = 100;

  // Deduct for errors
  score -= Math.min(errorStats.totalErrors * 0.5, 30);
  score -= Math.min(errorStats.uniqueErrors * 2, 20);

  // Deduct for poor performance
  Object.values(performanceMetrics).forEach((metric: any) => {
    if (metric.avg > 3000) {score -= 10;}
    else if (metric.avg > 2000) {score -= 5;}
  });

  return Math.max(score, 0);
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
