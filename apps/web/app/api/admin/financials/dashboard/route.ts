/**
 * Admin Financial Dashboard API
 *
 * GET /api/admin/financials/dashboard
 * Fetch comprehensive financial data for admin dashboard
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { calculatePayoutAmount } from '@/lib/payments/contractor-payout';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get all completed payments
    const allPayments = await db.payment.findMany({
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

    // Get current month data — single pass
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    let monthRevenue = 0, monthPayouts = 0;
    for (const p of allPayments) {
      if (p.createdAt >= startOfMonth) {
        const amt = parseFloat(p.amountAUD.toString());
        monthRevenue += amt;
        monthPayouts += calculatePayoutAmount(amt).netAmount;
      }
    }

    // Calculate payment success rate + pending payments in parallel
    const [allPaymentsCount, failedPayments, pendingPayments] = await Promise.all([
      db.payment.count(),
      db.payment.count({ where: { status: 'FAILED' } }),
      db.payment.findMany({
        where: { status: 'PENDING' },
        select: {
          id: true,
          amountAUD: true,
          createdAt: true,
          booking: { select: { id: true, australianServiceType: true } },
        },
        orderBy: { createdAt: 'asc' },
        take: 10,
      }),
    ]);
    const successRate =
      allPaymentsCount > 0
        ? ((allPaymentsCount - failedPayments) / allPaymentsCount) * 100
        : 100;

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
