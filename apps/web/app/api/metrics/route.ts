/**
 * Prometheus Metrics Endpoint
 *
 * GET /api/metrics
 *
 * Exports application metrics in Prometheus text format
 * Can be scraped by Prometheus, Grafana, or similar monitoring tools
 *
 * Format: https://prometheus.io/docs/instrumenting/exposition_formats/
 */

import { NextRequest, NextResponse } from 'next/server';
import { logInfo, logError } from '@/lib/logger/helpers';
import { metrics, formatMetrics, getMetrics } from '@/lib/metrics/prometheus';

/**
 * GET /api/metrics
 * Returns Prometheus-format metrics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'prometheus';

    // Authentication (optional - in production, verify Bearer token)
    const authHeader = request.headers.get('authorization');
    const metricsToken = process.env.METRICS_TOKEN;

    if (metricsToken && authHeader !== `Bearer ${metricsToken}`) {
      // Allow unauthenticated requests in development
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    let responseBody: string;

    if (format === 'json') {
      // JSON format for easier parsing
      const metricsData = getMetrics();
      responseBody = JSON.stringify(metricsData, null, 2);
    } else {
      // Prometheus text format
      responseBody = formatMetrics(metrics);
    }

    logInfo('Metrics endpoint accessed', {
      format,
      metricsCount: metrics.httpRequests.size,
    });

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': format === 'json' ? 'application/json' : 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    logError(error, { context: 'metrics_endpoint' });
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization',
      },
      status: 200,
    }
  );
}
