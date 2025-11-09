import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {
  getPerformanceDashboard,
  healthCheck,
  performanceMonitor,
} from '@/lib/db/performance-monitoring';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/**
 * GET - Get database performance metrics
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'dashboard';

    switch (action) {
      case 'dashboard':
        const dashboard = await getPerformanceDashboard();
        return NextResponse.json({
          success: true,
          ...dashboard,
        });

      case 'health':
        const health = await healthCheck();
        return NextResponse.json({
          success: true,
          health,
          timestamp: new Date().toISOString(),
        });

      case 'cache-stats':
        const cacheStats = performanceMonitor.getCacheStats();
        return NextResponse.json({
          success: true,
          cache: cacheStats,
          timestamp: new Date().toISOString(),
        });

      case 'query-stats':
        const queryStats = performanceMonitor.getQueryStats();
        return NextResponse.json({
          success: true,
          queries: queryStats,
          timestamp: new Date().toISOString(),
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[Database API] Error getting metrics:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Reset performance metrics
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    performanceMonitor.reset();

    return NextResponse.json({
      success: true,
      message: 'Performance metrics reset',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Database API] Error resetting metrics:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
