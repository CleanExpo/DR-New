/**
 * Monitoring Rankings Opportunities API
 *
 * GET /api/monitoring/rankings/opportunities
 * Returns keyword opportunities from the KeywordOpportunity table.
 * Shape matches RankingOpportunity interface in RankTrackerDashboard.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

function estimateTrafficGain(searchVolume: number, currentPosition: number): number {
  const currentCtr = currentPosition <= 10 ? 0.04 : 0.01;
  const targetCtr = 0.15;
  return Math.max(0, Math.round(searchVolume * (targetCtr - currentCtr)));
}

function getActionItems(difficultyTier: string): string[] {
  if (difficultyTier === 'low') {
    return [
      'Create a dedicated landing page targeting this keyword',
      'Build 1-2 high-quality backlinks from relevant local directories',
      'Optimise meta title and description for click-through rate',
    ];
  }
  if (difficultyTier === 'medium') {
    return [
      'Expand existing content depth and add structured data markup',
      'Build 3-5 authoritative backlinks from industry publications',
      'Target related long-tail variations to build topical authority',
    ];
  }
  return [
    'Develop a comprehensive content cluster around this topic',
    'Pursue editorial backlinks from high-domain-authority sites',
    'Address all on-page SEO factors and improve page experience signals',
  ];
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const db = getTenantDb(authResult.context);

    const records = await db.keywordOpportunity.findMany({
      orderBy: [{ gapScore: 'desc' }],
      take: 20,
      select: {
        keyword: true,
        searchVolume: true,
        averagePosition: true,
        gapScore: true,
        difficultyTier: true,
        category: true,
        intent: true,
      },
    });

    const opportunities = records.map((r) => {
      const currentPos = Math.round(r.averagePosition);
      const potentialPos = Math.max(1, Math.round(currentPos * 0.35));
      return {
        keyword: r.keyword,
        currentPosition: currentPos,
        potentialPosition: potentialPos,
        searchVolume: r.searchVolume,
        estimatedTraffic: estimateTrafficGain(r.searchVolume, currentPos),
        reason:
          r.gapScore > 0.7
            ? 'High gap score — competitors are not well-optimised for this term'
            : 'Moderate opportunity — ranking improvement is achievable with targeted effort',
        actionItems: getActionItems(r.difficultyTier),
      };
    });

    return NextResponse.json({ opportunities });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
