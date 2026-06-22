// @ts-nocheck

/**
 * Search Dominance Metrics API
 *
 * GET /api/search-dominance/metrics
 * Returns current dominance score and breakdown
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

    // Get query parameters for date filtering
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Get latest and historical in parallel
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [latest, historical] = await Promise.all([
      db.dominanceMetrics.findFirst({ orderBy: { date: 'desc' } }),
      db.dominanceMetrics.findMany({
        where: { date: { gte: startDate } },
        orderBy: { date: 'asc' },
      }),
    ]);

    // Calculate trend (comparing current to average of last 7 days)
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (historical.length >= 8 && latest) {
      const last7Days = historical.slice(-8, -1); // Exclude latest
      const avgScore = last7Days.reduce((sum, m) => sum + m.dominanceScore, 0) / 7;
      const diff = latest.dominanceScore - avgScore;

      if (diff > 2) trend = 'up';
      else if (diff < -2) trend = 'down';
    }

    return NextResponse.json({
      current: latest
        ? {
            dominanceScore: latest.dominanceScore,
            position1Count: latest.position1Count,
            position1to3Count: latest.position1to3Count,
            position1to10Count: latest.position1to10Count,
            totalKeywords: latest.totalKeywords,
            aiOverviewCitations: latest.aiOverviewCitations,
            aiOverviewRate: latest.aiOverviewRate,
            dailySessions: latest.dailySessions,
            dailyImpressions: latest.dailyImpressions,
            dailyConversions: latest.dailyConversions,
            activeLocations: latest.activeLocations,
            totalCoverage: latest.totalCoverage,
            competitorsTracked: latest.competitorsTracked,
            competitiveThreat: latest.competitiveThreat,
            date: latest.date,
          }
        : null,
      trend,
      historical: historical.map((m) => ({
        date: m.date,
        dominanceScore: m.dominanceScore,
        position1Count: m.position1Count,
        aiOverviewRate: m.aiOverviewRate,
        dailySessions: m.dailySessions,
      })),
      summary: (() => {
        if (historical.length === 0) return { avgScore: 0, maxScore: 0, minScore: 0 };
        let scoreSum = 0, maxScore = -Infinity, minScore = Infinity;
        for (const m of historical) {
          scoreSum += m.dominanceScore;
          if (m.dominanceScore > maxScore) maxScore = m.dominanceScore;
          if (m.dominanceScore < minScore) minScore = m.dominanceScore;
        }
        return { avgScore: scoreSum / historical.length, maxScore, minScore };
      })(),
    });
  } catch (error) {
    console.error('[API] Error fetching dominance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dominance metrics' },
      { status: 500 }
    );
  }
}
