
/**
 * Keyword Opportunities API
 *
 * GET /api/competitor-analysis/opportunities
 * Returns keyword opportunities for targeting
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Only attempt to fetch from database at runtime, not during build
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
      return NextResponse.json([], { status: 200 });
    }

    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const opportunities = await prisma.keywordOpportunity.findMany({
      orderBy: { gapScore: 'desc' },
      take: 100,
    });

    await prisma.$disconnect();

    // Transform to match dashboard type
    const formattedOpportunities = opportunities.map((opp) => ({
      id: opp.id,
      keyword: opp.keyword,
      searchVolume: opp.searchVolume,
      difficulty: opp.difficulty,
      cpc: opp.cpc,
      intent: opp.intent,
      opportunityScore: opp.gapScore,
      difficultyTier: opp.difficultyTier as 'easy' | 'medium' | 'hard',
      competitorCount: opp.competitorCount,
      averagePosition: opp.averagePosition,
      topCompetitor: (Array.isArray(opp.competitors) ? (opp.competitors as string[])[0] : null) ?? null,
    }));

    return NextResponse.json(formattedOpportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json([], { status: 200 });
  }
}
