import { NextRequest, NextResponse } from 'next/server';
import { metricsCollector } from '@/lib/graphql/monitoring/metrics';

/**
 * GET /api/graphql/metrics
 * GraphQL metrics endpoint
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'summary';
  const since = searchParams.get('since');

  const sinceDate = since ? new Date(since) : new Date(Date.now() - 60 * 60 * 1000); // Last hour by default

  let data: any;

  try {
    switch (type) {
      case 'queries':
        data = metricsCollector.getQueryStats(sinceDate);
        break;
      case 'resolvers':
        data = metricsCollector.getResolverStats(sinceDate);
        break;
      case 'errors':
        data = metricsCollector.getErrorStats(sinceDate);
        break;
      case 'operations':
        data = metricsCollector.getOperationStats(sinceDate);
        break;
      case 'health':
        data = metricsCollector.getHealthStatus();
        break;
      case 'export':
        data = metricsCollector.exportMetrics();
        break;
      default:
        data = {
          queries: metricsCollector.getQueryStats(sinceDate),
          errors: metricsCollector.getErrorStats(sinceDate),
          health: metricsCollector.getHealthStatus(),
        };
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[Metrics API Error]', error);
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    );
  }
}
