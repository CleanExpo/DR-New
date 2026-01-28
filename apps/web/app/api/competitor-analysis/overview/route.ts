/**
 * Competitor Analysis Overview API
 *
 * GET /api/competitor-analysis/overview
 * Returns dashboard overview metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    // Get total competitors
    const totalCompetitors = await db.competitor.count({
      where: { isActive: true },
    });

    // Get total keywords
    const totalKeywords = await db.competitorKeyword.count();

    // Get total opportunities
    const totalOpportunities = await db.keywordOpportunity.count();

    // Get last analysis date
    const lastAnalysis = await db.competitorAnalysis.findFirst({
      orderBy: { analysisDate: 'desc' },
      select: { analysisDate: true },
    });

    // Get average domain rating
    const avgDomainRating = await db.competitorAnalysis.aggregate({
      _avg: { domainRating: true },
    });

    // Get average organic traffic
    const avgOrganicTraffic = await db.competitorAnalysis.aggregate({
      _avg: { organicTraffic: true },
    });

    return NextResponse.json({
      totalCompetitors,
      totalKeywords,
      totalOpportunities,
      lastAnalysisDate: lastAnalysis?.analysisDate || null,
      avgDomainRating: avgDomainRating._avg.domainRating || 0,
      avgOrganicTraffic: avgOrganicTraffic._avg.organicTraffic || 0,
    });
  } catch (error) {
    console.error('Error fetching overview:', error);
    return NextResponse.json({
      totalCompetitors: 0,
      totalKeywords: 0,
      totalOpportunities: 0,
      lastAnalysisDate: null,
      avgDomainRating: 0,
      avgOrganicTraffic: 0,
    });
  }
}
