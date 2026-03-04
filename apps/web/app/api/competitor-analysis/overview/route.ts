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

    // Fetch all overview metrics in parallel
    const [totalCompetitors, totalKeywords, totalOpportunities, lastAnalysis, avgDomainRating, avgOrganicTraffic] =
      await Promise.all([
        db.competitor.count({ where: { isActive: true } }),
        db.competitorKeyword.count(),
        db.keywordOpportunity.count(),
        db.competitorAnalysis.findFirst({ orderBy: { analysisDate: 'desc' }, select: { analysisDate: true } }),
        db.competitorAnalysis.aggregate({ _avg: { domainRating: true } }),
        db.competitorAnalysis.aggregate({ _avg: { organicTraffic: true } }),
      ]);

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
