/**
 * Competitor Analysis Overview API
 *
 * GET /api/competitor-analysis/overview
 * Returns dashboard overview metrics
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Only attempt to fetch from database at runtime, not during build
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
      return NextResponse.json({
        totalCompetitors: 0,
        totalKeywords: 0,
        totalOpportunities: 0,
        lastAnalysisDate: null,
        avgDomainRating: 0,
        avgOrganicTraffic: 0,
      });
    }

    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    // Get total competitors
    const totalCompetitors = await prisma.competitor.count({
      where: { isActive: true },
    });

    // Get total keywords
    const totalKeywords = await prisma.competitorKeyword.count();

    // Get total opportunities
    const totalOpportunities = await prisma.keywordOpportunity.count();

    // Get last analysis date
    const lastAnalysis = await prisma.competitorAnalysis.findFirst({
      orderBy: { analysisDate: 'desc' },
      select: { analysisDate: true },
    });

    // Get average domain rating
    const avgDomainRating = await prisma.competitorAnalysis.aggregate({
      _avg: { domainRating: true },
    });

    // Get average organic traffic
    const avgOrganicTraffic = await prisma.competitorAnalysis.aggregate({
      _avg: { organicTraffic: true },
    });

    await prisma.$disconnect();

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
