/**
 * Search Dominance Rankings API
 *
 * GET /api/search-dominance/rankings
 * Returns current keyword rankings with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);

    // Query parameters
    const location = searchParams.get('location') || undefined;
    const device = searchParams.get('device') || undefined;
    const keyword = searchParams.get('keyword') || undefined;
    const hasAIOverview = searchParams.get('hasAIOverview') === 'true' ? true : undefined;
    const isInAIOverview = searchParams.get('isInAIOverview') === 'true' ? true : undefined;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get the latest timestamp to filter for most recent rankings
    const latestTimestamp = await db.rankingRecord.findFirst({
      orderBy: { timestamp: 'desc' },
      select: { timestamp: true },
    });

    if (!latestTimestamp) {
      return NextResponse.json({
        rankings: [],
        total: 0,
        summary: {
          position1: 0,
          position1to3: 0,
          position1to10: 0,
          aiCitations: 0,
        },
      });
    }

    // Get rankings from the last hour (to get latest batch)
    const oneHourAgo = new Date(latestTimestamp.timestamp);
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const where: any = {
      timestamp: {
        gte: oneHourAgo,
      },
    };

    if (location) where.location = location;
    if (device) where.device = device;
    if (keyword) where.keyword = { contains: keyword };
    if (hasAIOverview !== undefined) where.hasAIOverview = hasAIOverview;
    if (isInAIOverview !== undefined) where.isInAIOverview = isInAIOverview;

    // Get rankings with pagination
    const [rankings, total] = await Promise.all([
      db.rankingRecord.findMany({
        where,
        orderBy: [
          { position: 'asc' },
          { timestamp: 'desc' },
        ],
        take: limit,
        skip: offset,
        distinct: ['keyword', 'location', 'device'],
      }),
      db.rankingRecord.count({ where }),
    ]);

    // Calculate summary statistics — single pass
    let position1 = 0, position1to3 = 0, position1to10 = 0, aiCitations = 0, positionSum = 0;
    for (const r of rankings) {
      positionSum += r.position;
      if (r.position === 1) position1++;
      if (r.position <= 3) position1to3++;
      if (r.position <= 10) position1to10++;
      if (r.isInAIOverview) aiCitations++;
    }
    const summary = {
      position1,
      position1to3,
      position1to10,
      aiCitations,
      avgPosition: rankings.length > 0 ? positionSum / rankings.length : 0,
      totalKeywords: rankings.length,
    };

    return NextResponse.json({
      rankings: rankings.map((r) => ({
        keyword: r.keyword,
        position: r.position,
        previousPosition: r.previousPosition,
        change: r.previousPosition ? r.previousPosition - r.position : null,
        url: r.url,
        searchVolume: r.searchVolume,
        location: r.location,
        device: r.device,
        hasFeaturedSnippet: r.hasFeaturedSnippet,
        hasLocalPack: r.hasLocalPack,
        hasAIOverview: r.hasAIOverview,
        isInAIOverview: r.isInAIOverview,
        aiOverviewPosition: r.aiOverviewPosition,
        competitorPositions: r.competitorPositions,
        timestamp: r.timestamp,
      })),
      total,
      summary,
      pagination: {
        limit,
        offset,
        hasMore: offset + rankings.length < total,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching rankings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
}
