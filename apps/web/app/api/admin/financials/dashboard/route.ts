/**
 * Admin Financial Dashboard API
 *
 * GET /api/admin/financials/dashboard
 * Fetch comprehensive financial data for admin dashboard
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculatePayoutAmount } from '@/lib/payments/contractor-payout';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Get all completed payments
    const allPayments = await prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      include: {
        contractor: {
          select: {
            businessName: true,
          },
        },
        booking: {
          select: {
            australianServiceType: true,
          },
        },
      },
    });

    // Calculate revenue metrics
    const totalRevenue = allPayments.reduce(
      (sum, p) => sum + parseFloat(p.amountAUD.toString()),
      0
    );

    const totalGST = allPayments.reduce(
      (sum, p) => sum + parseFloat(p.gstAUD.toString()),
      0
    );

    const totalGrossBilling = totalRevenue + totalGST;

    // Calculate contractor payouts
    const totalContractorEarnings = allPayments.reduce(
      (sum, p) => {
        const { netAmount } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
        return sum + netAmount;
      },
      0
    );

    const platformFeesCollected = allPayments.reduce(
      (sum, p) => {
        const { platformFee } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
        return sum + platformFee;
      },
      0
    );

    // Get metrics by service type
    const serviceTypeMetrics: Record<string, any> = {};
    allPayments.forEach((p) => {
      const serviceType = p.booking?.australianServiceType || 'UNKNOWN';
      if (!serviceTypeMetrics[serviceType]) {
        serviceTypeMetrics[serviceType] = {
          count: 0,
          revenue: 0,
          payouts: 0,
        };
      }
      serviceTypeMetrics[serviceType].count++;
      serviceTypeMetrics[serviceType].revenue += parseFloat(
        p.amountAUD.toString()
      );
      const { netAmount } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
      serviceTypeMetrics[serviceType].payouts += netAmount;
    });

    // Get top contractors by earnings
    const contractorMetrics: Record<string, any> = {};
    allPayments.forEach((p) => {
      const contractorId = p.contractorId || 'UNKNOWN';
      const contractorName = p.contractor?.businessName || 'Unknown';
      if (!contractorMetrics[contractorId]) {
        contractorMetrics[contractorId] = {
          name: contractorName,
          jobCount: 0,
          earnings: 0,
          payouts: 0,
        };
      }
      contractorMetrics[contractorId].jobCount++;
      contractorMetrics[contractorId].earnings += parseFloat(
        p.amountAUD.toString()
      );
      const { netAmount } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
      contractorMetrics[contractorId].payouts += netAmount;
    });

    // Get current month data
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthPayments = allPayments.filter(
      (p) => p.createdAt >= startOfMonth
    );

    const monthRevenue = monthPayments.reduce(
      (sum, p) => sum + parseFloat(p.amountAUD.toString()),
      0
    );

    const monthPayouts = monthPayments.reduce(
      (sum, p) => {
        const { netAmount } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
        return sum + netAmount;
      },
      0
    );

    // Calculate payment success rate
    const allPaymentsCount = await prisma.payment.count();
    const failedPayments = await prisma.payment.count({
      where: { status: 'FAILED' },
    });
    const successRate =
      allPaymentsCount > 0
        ? ((allPaymentsCount - failedPayments) / allPaymentsCount) * 100
        : 100;

    // Get pending payments
    const pendingPayments = await prisma.payment.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        amountAUD: true,
        createdAt: true,
        booking: {
          select: {
            id: true,
            australianServiceType: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      revenue: {
        totalRevenue,
        totalGST,
        totalGrossBilling,
        monthRevenue,
        averageBookingValue:
          allPayments.length > 0 ? totalRevenue / allPayments.length : 0,
        totalBookings: allPayments.length,
      },
      payouts: {
        totalContractorEarnings,
        platformFeesCollected,
        platformFeePercentage: 20,
        monthPayouts,
        remainingDisputed:
          totalContractorEarnings - totalGrossBilling + platformFeesCollected,
      },
      performance: {
        paymentSuccessRate: successRate,
        totalPayments: allPaymentsCount,
        failedPayments,
        averagePaymentTime: '< 2 hours',
      },
      serviceTypes: Object.entries(serviceTypeMetrics)
        .map(([type, data]: [string, any]) => ({
          type,
          jobCount: data.count,
          revenue: data.revenue,
          payouts: data.payouts,
          platformFee: data.revenue - data.payouts,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10),
      topContractors: Object.entries(contractorMetrics)
        .map(([id, data]: [string, any]) => ({
          contractorId: id,
          businessName: data.name,
          jobCount: data.jobCount,
          earnings: data.earnings,
          payouts: data.payouts,
          platformFee: data.earnings - data.payouts,
        }))
        .sort((a, b) => b.earnings - a.earnings)
        .slice(0, 10),
      pendingPayments: pendingPayments.map((p) => ({
        id: p.id,
        amount: parseFloat(p.amountAUD.toString()),
        createdAt: p.createdAt,
        bookingType: p.booking?.australianServiceType,
      })),
      financialHealth: {
        platformCashFlow: platformFeesCollected,
        outstandingPayouts: totalContractorEarnings - monthPayouts,
        healthStatus:
          successRate > 95 ? 'EXCELLENT' : successRate > 80 ? 'GOOD' : 'NEEDS_ATTENTION',
      },
    });
  } catch (error) {
    console.error('Get financial dashboard error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch financial data' },
      { status: 500 }
    );
  }
}
