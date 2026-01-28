/**
 * Search Analytics API
 *
 * Stores and retrieves search analytics data
 * Used for tracking search behavior and optimization
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import type { SearchAnalyticsEvent } from '@/lib/algolia/types';

/**
 * POST /api/analytics/search
 * Track a search analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const event: SearchAnalyticsEvent = await request.json();

    // Validate required fields
    if (!event.query || !event.index) {
      return NextResponse.json(
        { error: 'Missing required fields: query, index' },
        { status: 400 }
      );
    }

    // Store in database
    try {
      const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                        request.headers.get('x-real-ip') ||
                        'unknown';

      const savedAnalytics = await db.searchAnalytics.create({
        data: {
          query: event.query,
          resultsCount: event.resultsCount || 0,
          category: event.index || 'general', // Use index as category
          userId: event.userId,
          ipAddress,
          searchedAt: new Date(event.timestamp || Date.now()),
        },
      });

      console.log('=== SEARCH ANALYTICS TRACKED ===');
      console.log('Search ID:', savedAnalytics.id);
      console.log('Query:', event.query);
      console.log('Results Count:', event.resultsCount);
      console.log('Index/Category:', event.index);
      console.log('User ID:', event.userId || 'Anonymous');
      console.log('================================');
    } catch (dbError) {
      console.error('[Analytics] Database error storing search event:', dbError);
      return NextResponse.json(
        {
          error: 'Failed to store search analytics to database',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics] Error storing search event:', error);
    return NextResponse.json(
      { error: 'Failed to store analytics event' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics/search
 * Retrieve search analytics data
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const index = searchParams.get('index');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: startDate, endDate' },
        { status: 400 }
      );
    }

    // In production, fetch from your analytics storage
    // For now, return mock data
    const analytics = {
      totalSearches: 12450,
      uniqueQueries: 3820,
      avgResultsPerSearch: 15.3,
      clickThroughRate: 0.42,
      conversionRate: 0.08,
      topQueries: [
        { query: 'water damage', count: 450, ctr: 0.52 },
        { query: 'fire restoration', count: 380, ctr: 0.48 },
        { query: 'mould removal', count: 320, ctr: 0.45 },
        { query: 'emergency restoration', count: 290, ctr: 0.51 },
        { query: 'flood cleanup', count: 250, ctr: 0.43 },
      ],
      topLocations: [
        { location: 'Sydney, NSW', searches: 3200 },
        { location: 'Melbourne, VIC', searches: 2800 },
        { location: 'Brisbane, QLD', searches: 2100 },
        { location: 'Perth, WA', searches: 1500 },
        { location: 'Adelaide, SA', searches: 1200 },
      ],
      searchesByDay: [
        { date: '2024-01-01', searches: 420 },
        { date: '2024-01-02', searches: 450 },
        { date: '2024-01-03', searches: 380 },
        { date: '2024-01-04', searches: 510 },
        { date: '2024-01-05', searches: 490 },
        { date: '2024-01-06', searches: 320 },
        { date: '2024-01-07', searches: 280 },
      ],
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('[Analytics] Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
