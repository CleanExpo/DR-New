/**
 * GET /api/admin/analytics/dashboard
 * Get admin dashboard data including KPIs and trends
 *
 * Query params:
 * - period: 'today' | 'week' | 'month' | 'year' (default: 'month')
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateDailyMetrics, calculatePercentageChange } from '@/lib/analytics/metrics-engine';

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
    const period = searchParams.get('period') || 'month';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        previousStartDate.setDate(previousStartDate.getDate() - 1);
        previousStartDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        const dayOfWeek = startDate.getDay();
        const diff = startDate.getDate() - dayOfWeek;
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - 7);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    // Get current period metrics
    const currentMetrics = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: now,
        },
      },
    });

    // Get previous period metrics for comparison
    let previousEndDate = new Date(startDate);
    previousEndDate.setDate(previousEndDate.getDate() - 1);

    const previousMetrics = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    // Aggregate metrics
    const aggregate = (metrics: any[]) => {
      if (metrics.length === 0) {
        return {
          totalRevenue: 0,
          platformFees: 0,
          contractorPayouts: 0,
          jobsCompleted: 0,
          paymentSuccessRate: 0,
          activeContractors: Math.max(...(metrics.map((m) => m.activeContractors) || [0])),
          avgCompletionTime: 0,
        };
      }

      const revenue = metrics.reduce((sum, m) => sum + Number(m.totalRevenue || 0), 0);
      const fees = metrics.reduce((sum, m) => sum + Number(m.platformFees || 0), 0);
      const payouts = metrics.reduce((sum, m) => sum + Number(m.contractorPayouts || 0), 0);
      const jobs = metrics.reduce((sum, m) => sum + m.jobsCompleted, 0);
      const successRate =
        metrics.reduce((sum, m) => sum + m.paymentSuccessRate, 0) / metrics.length;
      const contractors = Math.max(...metrics.map((m) => m.activeContractors));
      const completionTime = Math.round(
        metrics.reduce((sum, m) => sum + m.avgCompletionTime, 0) / metrics.length
      );

      return {
        totalRevenue: parseFloat(revenue.toFixed(2)),
        platformFees: parseFloat(fees.toFixed(2)),
        contractorPayouts: parseFloat(payouts.toFixed(2)),
        jobsCompleted: jobs,
        paymentSuccessRate: parseFloat(successRate.toFixed(2)),
        activeContractors: contractors,
        avgCompletionTime: completionTime,
      };
    };

    const current = aggregate(currentMetrics);
    const previous = aggregate(previousMetrics);

    // Calculate trends
    const trends = {
      revenue: {
        value: current.totalRevenue,
        change: calculatePercentageChange(current.totalRevenue, previous.totalRevenue),
        trend: current.totalRevenue >= previous.totalRevenue ? 'up' : 'down',
      },
      fees: {
        value: current.platformFees,
        change: calculatePercentageChange(current.platformFees, previous.platformFees),
        trend: current.platformFees >= previous.platformFees ? 'up' : 'down',
      },
      payouts: {
        value: current.contractorPayouts,
        change: calculatePercentageChange(current.contractorPayouts, previous.contractorPayouts),
        trend: current.contractorPayouts >= previous.contractorPayouts ? 'up' : 'down',
      },
      jobs: {
        value: current.jobsCompleted,
        change: calculatePercentageChange(current.jobsCompleted, previous.jobsCompleted),
        trend: current.jobsCompleted >= previous.jobsCompleted ? 'up' : 'down',
      },
      successRate: {
        value: current.paymentSuccessRate,
        change: calculatePercentageChange(
          current.paymentSuccessRate,
          previous.paymentSuccessRate
        ),
        trend: current.paymentSuccessRate >= previous.paymentSuccessRate ? 'up' : 'down',
      },
    };

    // Get top contractors by earnings
    const topContractors = await prisma.payment.groupBy({
      by: ['contractorId'],
      _sum: {
        amountAUD: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
        status: 'COMPLETED',
      },
      orderBy: {
        _sum: {
          amountAUD: 'desc',
        },
      },
      take: 5,
    });

    // Get top clients by spending
    const topClients = await prisma.payment.groupBy({
      by: ['clientId'],
      _sum: {
        amountAUD: true,
      },
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
        status: 'COMPLETED',
      },
      orderBy: {
        _sum: {
          amountAUD: 'desc',
        },
      },
      take: 5,
    });

    // Get service type breakdown
    const serviceTypeRevenue = await prisma.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalPrice: true,
      },
      _count: true,
      where: {
        completedAt: {
          gte: startDate,
          lte: now,
        },
      },
    });

    return NextResponse.json({
      success: true,
      period,
      dateRange: {
        start: startDate,
        end: now,
      },
      kpis: {
        revenue: trends.revenue,
        platformFees: trends.fees,
        contractorPayouts: trends.payouts,
        jobsCompleted: trends.jobs,
        paymentSuccessRate: trends.successRate,
        activeContractors: current.activeContractors,
        avgCompletionTime: `${current.avgCompletionTime} min`,
      },
      comparison: {
        current,
        previous,
      },
      topContractors: topContractors.slice(0, 5),
      topClients: topClients.slice(0, 5),
      serviceTypeBreakdown: serviceTypeRevenue,
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching dashboard data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch admin analytics dashboard',
        details: message,
      },
      { status: 500 }
    );
  }
}
