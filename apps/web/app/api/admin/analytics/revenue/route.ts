/**
 * GET /api/admin/analytics/revenue
 * Get detailed revenue analytics including breakdown by service type and region
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Revenue by service type
    const revenueByServiceType = await prisma.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalPrice: true,
      },
      _count: true,
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Revenue by region
    const revenueByRegion = await prisma.booking.groupBy({
      by: ['serviceState'],
      _sum: {
        finalPrice: true,
      },
      _count: true,
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Total metrics
    const totalPayments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: 'COMPLETED',
      },
    });

    const totalRevenue = totalPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
    const platformFees = totalRevenue * 0.2;
    const contractorPayouts = totalRevenue * 0.8;

    // Daily revenue trend
    const dailyRevenue = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        date: true,
        totalRevenue: true,
        platformFees: true,
        contractorPayouts: true,
      },
    });

    // Payment success rate
    const allPaymentAttempts = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const successfulPayments = allPaymentAttempts.filter((p) => p.status === 'COMPLETED')
      .length;
    const failedPayments = allPaymentAttempts.filter((p) => p.status === 'FAILED').length;
    const paymentSuccessRate =
      allPaymentAttempts.length > 0
        ? (successfulPayments / allPaymentAttempts.length) * 100
        : 0;

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        platformFees: parseFloat(platformFees.toFixed(2)),
        contractorPayouts: parseFloat(contractorPayouts.toFixed(2)),
        totalTransactions: totalPayments.length,
        paymentSuccessRate: parseFloat(paymentSuccessRate.toFixed(2)),
        successfulPayments,
        failedPayments,
      },
      breakdown: {
        byServiceType: revenueByServiceType.map((item) => ({
          serviceType: item.australianServiceType,
          revenue: Number(item._sum.finalPrice || 0),
          count: item._count,
        })),
        byRegion: revenueByRegion.map((item) => ({
          region: item.serviceState,
          revenue: Number(item._sum.finalPrice || 0),
          count: item._count,
        })),
      },
      trends: {
        daily: dailyRevenue.map((m) => ({
          date: m.date,
          revenue: Number(m.totalRevenue),
          platformFees: Number(m.platformFees),
          payouts: Number(m.contractorPayouts),
        })),
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error fetching revenue data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch revenue analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
