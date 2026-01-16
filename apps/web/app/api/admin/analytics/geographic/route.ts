/**
 * GET /api/admin/analytics/geographic
 * Get geographic analytics and regional distribution data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  calculateRegionalMetrics,
  generateHeatmapData,
  analyzeGeographicDistribution,
  calculateDemandDistribution,
  calculateRevenueDistribution,
  getExpansionRecommendations,
} from '@/lib/analytics/geographic-analyzer';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days

    // Fetch completed bookings with location data
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'COMPLETED',
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        contractorMatch: {
          select: {
            contractor: {
              select: {
                id: true,
                serviceAreas: true,
              },
            },
          },
        },
      },
    });

    // Fetch all contractors with service areas
    const contractors = await prisma.contractor.findMany({
      where: {
        isVerified: true,
        isActive: true,
      },
      select: {
        id: true,
        businessName: true,
        serviceAreas: true,
      },
    });

    // Calculate regional metrics
    const metrics = calculateRegionalMetrics(bookings, contractors);

    // Generate analysis
    const analysis = analyzeGeographicDistribution(bookings, contractors);

    // Generate heatmap data
    const maxDemand = Math.max(...Object.values(metrics).map((m) => m.demand), 1);
    const heatmapData = generateHeatmapData(metrics, maxDemand);

    // Calculate distributions
    const demandDistribution = calculateDemandDistribution(metrics);
    const revenueDistribution = calculateRevenueDistribution(metrics);

    // Get expansion recommendations
    const recommendations = getExpansionRecommendations(analysis);

    // Group contractors by state
    const contractorsByState: Record<string, number> = {};
    contractors.forEach((c) => {
      const states = c.serviceAreas || [];
      states.forEach((state) => {
        contractorsByState[state] = (contractorsByState[state] || 0) + 1;
      });
    });

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary: {
        totalJobs: analysis.totalDemand,
        totalContractors: analysis.totalContractors,
        averageJobValue: parseFloat(analysis.averageServiceValue.toFixed(2)),
        regionsServed: Object.keys(metrics).length,
      },
      analysis: {
        totalDemand: analysis.totalDemand,
        totalContractors: analysis.totalContractors,
        averageServiceValue: parseFloat(analysis.averageServiceValue.toFixed(2)),
      },
      regions: Object.entries(metrics).map(([name, data]) => ({
        name,
        demand: data.demand,
        activeContractors: data.activeContractors,
        avgServiceValue: parseFloat(data.avgServiceValue.toFixed(2)),
        jobsCompleted: data.jobsCompleted,
        coverage: parseFloat(data.coverage.toFixed(2)),
      })),
      topRegions: analysis.topRegions
        .slice(0, 5)
        .map((r) => ({
          name: r.region,
          demand: r.demand,
          contractors: r.activeContractors,
          coverage: parseFloat(r.coverage.toFixed(2)),
        })),
      underservedRegions: analysis.underservedRegions
        .slice(0, 5)
        .map((r) => ({
          name: r.region,
          demand: r.demand,
          contractors: r.activeContractors,
          coverage: parseFloat(r.coverage.toFixed(2)),
        })),
      growthRegions: analysis.growthRegions
        .slice(0, 5)
        .map((r) => ({
          name: r.region,
          demand: r.demand,
          contractors: r.activeContractors,
          coverage: parseFloat(r.coverage.toFixed(2)),
        })),
      heatmapData: heatmapData.map((h) => ({
        region: h.region,
        intensity: parseFloat(h.intensity.toFixed(2)),
        latitude: h.latitude,
        longitude: h.longitude,
        jobs: h.jobs,
        revenue: parseFloat(h.revenue.toFixed(2)),
      })),
      distributions: {
        demand: Object.entries(demandDistribution).reduce(
          (acc, [region, pct]) => {
            acc[region] = parseFloat(pct.toFixed(2));
            return acc;
          },
          {} as Record<string, number>
        ),
        revenue: Object.entries(revenueDistribution).reduce(
          (acc, [region, pct]) => {
            acc[region] = parseFloat(pct.toFixed(2));
            return acc;
          },
          {} as Record<string, number>
        ),
      },
      contractorsByState,
      recommendations: recommendations.map((r) => ({
        region: r.region,
        reason: r.reason,
        priority: r.priority,
      })),
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching geographic data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch geographic analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
