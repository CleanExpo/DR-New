/**
 * Search Dominance Competitor Activity API
 *
 * GET /api/search-dominance/competitors/activity
 * Returns recent competitor movements and activities
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const days = parseInt(searchParams.get('days') || '7');
    const threatLevel = searchParams.get('threatLevel') || undefined; // LOW, MEDIUM, HIGH
    const limit = parseInt(searchParams.get('limit') || '50');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get snapshots and competitors in parallel
    const [snapshots, competitors] = await Promise.all([
      prisma.competitorSnapshot.findMany({
        where: {
          timestamp: { gte: startDate },
          OR: [{ majorUpdate: true }, { newContent: { isEmpty: false } }],
        },
        orderBy: { timestamp: 'desc' },
        take: limit,
        include: { competitor: { select: { name: true, domain: true, threatLevel: true } } },
      }),
      prisma.competitor.findMany({
        where: { isActive: true },
        select: { id: true, name: true, domain: true, threatLevel: true, lastSnapshotAt: true, contentVelocity: true },
      }),
    ]);

    // Filter by threat level if specified (single pass)
    const filteredCompetitors = threatLevel
      ? competitors.filter((c) => c.threatLevel === threatLevel)
      : competitors;

    // Format activities
    const activities = snapshots.map((snapshot) => ({
      competitorId: snapshot.competitorId,
      competitorName: snapshot.competitor.name,
      competitorDomain: snapshot.competitor.domain,
      threatLevel: snapshot.competitor.threatLevel,
      activityType: snapshot.majorUpdate ? 'major_update' : 'new_content',
      details: snapshot.majorUpdate
        ? `Significant changes in search presence (${snapshot.organicKeywords} organic keywords, ${snapshot.rankingKeywords} ranking keywords)`
        : `Published ${snapshot.newContent?.length || 0} new pieces of content`,
      metrics: {
        organicKeywords: snapshot.organicKeywords,
        organicTraffic: snapshot.organicTraffic,
        domainAuthority: snapshot.domainAuthority,
        topTenKeywords: snapshot.topTenKeywords,
        contentVelocity: snapshot.contentVelocity,
      },
      timestamp: snapshot.timestamp,
    }));

    // Calculate statistics — single pass per collection
    let threatHigh = 0, threatMedium = 0, threatLow = 0, velocitySum = 0;
    for (const c of competitors) {
      if (c.threatLevel === 'HIGH') threatHigh++;
      else if (c.threatLevel === 'MEDIUM') threatMedium++;
      else if (c.threatLevel === 'LOW') threatLow++;
      velocitySum += c.contentVelocity;
    }
    let majorUpdates = 0, newContentCount = 0;
    for (const s of snapshots) {
      if (s.majorUpdate) majorUpdates++;
      if (s.newContent && s.newContent.length > 0) newContentCount++;
    }
    const stats = {
      totalCompetitors: competitors.length,
      byThreatLevel: { HIGH: threatHigh, MEDIUM: threatMedium, LOW: threatLow },
      recentActivity: { majorUpdates, newContent: newContentCount },
      avgContentVelocity: competitors.length > 0 ? velocitySum / competitors.length : 0,
    };

    return NextResponse.json({
      activities,
      competitors: filteredCompetitors.map((c) => ({
        id: c.id,
        name: c.name,
        domain: c.domain,
        threatLevel: c.threatLevel,
        lastSnapshotAt: c.lastSnapshotAt,
        contentVelocity: c.contentVelocity,
      })),
      stats,
    });
  } catch (error) {
    console.error('[API] Error fetching competitor activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor activity' },
      { status: 500 }
    );
  }
}
