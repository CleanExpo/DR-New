/**
 * SWOT Analysis Detail API
 *
 * GET /api/competitor-analysis/swot/[id]
 * Returns SWOT analysis for a specific competitor
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const { id } = params;

    // Get latest SWOT analysis for competitor
    const swot = await db.sWOTAnalysis.findFirst({
      where: { competitorId: id },
      orderBy: { generatedAt: 'desc' },
    });

    if (!swot) {
      return NextResponse.json(null);
    }

    // Transform to match dashboard type
    const formattedSwot = {
      id: swot.id,
      competitorId: swot.competitorId,
      strengths: swot.strengths as any,
      weaknesses: swot.weaknesses as any,
      opportunities: swot.opportunities as any,
      threats: swot.threats as any,
      summary: swot.summary,
      recommendations: swot.recommendations as string[] | null,
      competitiveAdvantages: swot.competitiveAdvantages as string[] | null,
      generatedAt: swot.generatedAt,
      generatedBy: swot.generatedBy,
    };

    return NextResponse.json(formattedSwot);
  } catch (error) {
    console.error('Error fetching SWOT analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SWOT analysis' },
      { status: 500 }
    );
  }
}
