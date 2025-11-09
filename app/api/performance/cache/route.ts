import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { cacheClient } from '@/lib/cache/redis';
import { invalidateCache } from '@/lib/cache/strategies';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/**
 * GET - Get cache statistics
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

    const stats = await cacheClient.getStats();

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Cache API] Error getting stats:', error);
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
 * POST - Invalidate cache
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

    const body = await req.json();
    const { action, target, id } = body;

    let deleted = 0;

    switch (action) {
      case 'invalidate':
        switch (target) {
          case 'leads':
            deleted = await invalidateCache.leads();
            break;
          case 'lead':
            if (!id) {
              return NextResponse.json(
                { error: 'Lead ID required' },
                { status: 400 }
              );
            }
            deleted = await invalidateCache.lead(id);
            break;
          case 'partners':
            deleted = await invalidateCache.partners();
            break;
          case 'partner':
            if (!id) {
              return NextResponse.json(
                { error: 'Partner ID required' },
                { status: 400 }
              );
            }
            deleted = await invalidateCache.partner(id);
            break;
          case 'contractors':
            deleted = await invalidateCache.contractors();
            break;
          case 'contractor':
            if (!id) {
              return NextResponse.json(
                { error: 'Contractor ID required' },
                { status: 400 }
              );
            }
            deleted = await invalidateCache.contractor(id);
            break;
          case 'analytics':
            deleted = await invalidateCache.analytics();
            break;
          case 'all':
            deleted = await invalidateCache.all() ? 1 : 0;
            break;
          default:
            return NextResponse.json(
              { error: 'Invalid target' },
              { status: 400 }
            );
        }
        break;

      case 'flush':
        await cacheClient.flush();
        deleted = 1;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      target,
      deleted,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Cache API] Error invalidating cache:', error);
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
 * DELETE - Clear all cache
 */
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await cacheClient.flush();

    return NextResponse.json({
      success: true,
      message: 'All cache cleared',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Cache API] Error clearing cache:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
