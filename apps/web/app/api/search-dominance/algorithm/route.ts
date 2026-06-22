
/**
 * Search Dominance Algorithm Updates API
 *
 * GET /api/search-dominance/algorithm
 * Returns algorithm update timeline and impact analysis
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
    const days = parseInt(searchParams.get('days') || '90');
    const status = searchParams.get('status') || undefined; // DETECTED, CONFIRMED, RESOLVED
    const minImpact = parseInt(searchParams.get('minImpact') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      detectedAt: {
        gte: startDate,
      },
      impactScore: {
        gte: minImpact,
      },
    };

    if (status) where.status = status;

    // Get all data in parallel
    const [updates, byType, recentRankings] = await Promise.all([
      db.algorithmUpdate.findMany({
        where,
        orderBy: { detectedAt: 'desc' },
        take: limit,
      }),
      db.algorithmUpdate.groupBy({
        by: ['type'],
        where,
        _count: true,
        orderBy: { _count: { type: 'desc' } },
      }),
      db.rankingRecord.findMany({
        where: { timestamp: { gte: startDate }, previousPosition: { not: null } },
        select: { keyword: true, position: true, previousPosition: true, timestamp: true },
      }),
    ]);

    // Calculate statistics — single pass
    let statusDetected = 0, statusConfirmed = 0, statusResolved = 0;
    let impactSum = 0, highImpact = 0, volatilitySum = 0;
    for (const u of updates) {
      if (u.status === 'DETECTED') statusDetected++;
      else if (u.status === 'CONFIRMED') statusConfirmed++;
      else if (u.status === 'RESOLVED') statusResolved++;
      impactSum += u.impactScore;
      if (u.impactScore >= 70) highImpact++;
      volatilitySum += u.volatility || 0;
    }
    const stats = {
      total: updates.length,
      byStatus: { DETECTED: statusDetected, CONFIRMED: statusConfirmed, RESOLVED: statusResolved },
      byType,
      avgImpact: updates.length > 0 ? impactSum / updates.length : 0,
      highImpact,
      avgVolatility: updates.length > 0 ? volatilitySum / updates.length : 0,
    };

    // Format timeline
    const timeline = updates.map((update) => ({
      id: update.id,
      name: update.name,
      type: update.type,
      volatility: update.volatility,
      impactScore: update.impactScore,
      rankingChanges: update.rankingChanges,
      trafficImpact: update.trafficImpact,
      affectedKeywords: update.affectedKeywords,
      status: update.status,
      detectedAt: update.detectedAt,
      confirmedAt: update.confirmedAt,
      resolvedAt: update.resolvedAt,
      notes: update.notes,
    }));

    // Calculate daily volatility
    const dailyVolatility = recentRankings.reduce((acc: any, ranking) => {
      const date = ranking.timestamp.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, changes: 0, totalKeywords: 0 };
      }

      if (ranking.previousPosition) {
        const change = Math.abs(ranking.position - ranking.previousPosition);
        if (change >= 3) {
          acc[date].changes += 1;
        }
        acc[date].totalKeywords += 1;
      }

      return acc;
    }, {});

    const volatilityTimeline = Object.values(dailyVolatility).map((day: any) => ({
      date: day.date,
      volatility: day.totalKeywords > 0 ? (day.changes / day.totalKeywords) * 100 : 0,
      affectedKeywords: day.changes,
    }));

    return NextResponse.json({
      timeline,
      stats,
      volatility: {
        current: volatilityTimeline[volatilityTimeline.length - 1] || { volatility: 0 },
        timeline: volatilityTimeline.slice(-30), // Last 30 days
        avgVolatility: volatilityTimeline.length > 0
          ? volatilityTimeline.reduce((sum: number, d: any) => sum + d.volatility, 0) / volatilityTimeline.length
          : 0,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching algorithm updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch algorithm updates' },
      { status: 500 }
    );
  }
}
