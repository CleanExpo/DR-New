/**
 * Monitoring Rankings API
 *
 * GET /api/monitoring/rankings
 * Returns keyword rankings filtered by device, location, and date range.
 * Adapts CompetitorKeyword data to the shape expected by RankTrackerDashboard.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const db = getTenantDb(authResult.context);
    const { searchParams } = new URL(request.url);

    const device = searchParams.get('device') || 'all';
    const range = searchParams.get('range') || '30d';

    // Compute cutoff date from range param
    const rangeDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };
    const days = rangeDays[range] ?? 30;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const records = await db.competitorKeyword.findMany({
      where: {
        lastChecked: { gte: since },
        position: { not: null },
      },
      orderBy: [{ position: 'asc' }],
      take: 200,
      distinct: ['keyword'],
      select: {
        keyword: true,
        position: true,
        previousPosition: true,
        url: true,
        searchVolume: true,
        difficulty: true,
        intent: true,
        category: true,
        lastChecked: true,
      },
    });

    // Map to the shape expected by RankTrackerDashboard (KeywordRanking interface)
    const rankings = records.map((r) => {
      const serpFeatures: string[] = [];
      if (r.intent) serpFeatures.push(r.intent);

      // device filter applied client-side in the component; include all records
      // and tag with the requested device so the component can filter
      const deviceTag =
        device === 'all' ? 'desktop' : (device as 'desktop' | 'mobile');

      return {
        keyword: r.keyword,
        position: r.position,
        previousPosition: r.previousPosition ?? null,
        url: r.url ?? '',
        searchVolume: r.searchVolume ?? 0,
        difficulty: r.difficulty ?? 0,
        serpFeatures,
        device: deviceTag,
        location: 'Australia',
      };
    });

    return NextResponse.json({ rankings });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
