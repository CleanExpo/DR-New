/**
 * API Metrics Endpoint - v1
 * Internal monitoring and metrics
 */

import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api/response';
import {
  getMetricsSummary,
  getErrorTrends,
  getPerformanceInsights,
  isApiHealthy,
  exportPrometheusMetrics,
} from '@/lib/api/monitoring';

/**
 * GET - Retrieve API metrics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const window = parseInt(searchParams.get('window') || '3600000', 10); // Default: 1 hour

    // Prometheus format
    if (format === 'prometheus') {
      const metrics = exportPrometheusMetrics();
      return new Response(metrics, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; version=0.0.4',
        },
      });
    }

    // JSON format (default)
    const summary = getMetricsSummary(window);
    const errors = getErrorTrends(window);
    const performance = getPerformanceInsights(window);
    const health = isApiHealthy(window);

    const metrics = {
      health,
      summary: {
        ...summary,
        timeWindow: `${window / 1000}s`,
      },
      performance,
      errors,
      timestamp: new Date().toISOString(),
    };

    return successResponse(metrics, 'Metrics retrieved successfully');
  } catch (error) {
    console.error('Error retrieving metrics:', error);
    return errorResponse('Failed to retrieve metrics', 'METRICS_ERROR', 500);
  }
}
