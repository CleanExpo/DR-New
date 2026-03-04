/**
 * GET /api/client/analytics/spending
 * Get detailed spending analytics for client
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const clientId = user.id;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year

    // Get all payments in date range - automatically tenant-scoped
    const payments = await db.payment.findMany({
      where: {
        clientId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        booking: {
          select: {
            australianServiceType: true,
            serviceSuburb: true,
            contractor: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
    });

    // Type assertion for included booking relation
    type PaymentWithBooking = typeof payments[0] & {
      booking?: {
        australianServiceType: string;
        serviceSuburb: string;
        contractor?: { businessName: string } | null;
      } | null;
    };

    // Single-pass: calculate all metrics simultaneously
    let totalAmount = 0, failedAmount = 0, refundedAmount = 0, successfulCount = 0;
    const contractorMap = new Map<string, { amount: number; count: number }>();
    const serviceTypeMap = new Map<string, { amount: number; count: number }>();
    const monthlyData: Record<string, number> = {};

    for (const p of payments as PaymentWithBooking[]) {
      const amt = Number(p.amountAUD);
      if (p.status === 'COMPLETED') { totalAmount += amt; successfulCount++; }
      else if (p.status === 'FAILED') failedAmount += amt;
      else if (p.status === 'REFUNDED') refundedAmount += amt;

      const contractorName = p.booking?.contractor?.businessName || 'Unknown';
      const cv = contractorMap.get(contractorName);
      if (cv) { cv.amount += amt; cv.count++; } else contractorMap.set(contractorName, { amount: amt, count: 1 });

      const serviceType = p.booking?.australianServiceType || 'Unknown';
      const sv = serviceTypeMap.get(serviceType);
      if (sv) { sv.amount += amt; sv.count++; } else serviceTypeMap.set(serviceType, { amount: amt, count: 1 });

      const monthKey = p.createdAt.toISOString().substring(0, 7);
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amt;
    }

    const byContractor = Array.from(contractorMap.entries()).map(([contractor, v]) => ({ contractor, ...v }));
    const byServiceType = Array.from(serviceTypeMap.entries()).map(([serviceType, v]) => ({ serviceType, ...v }));

    const monthlyTrend = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }));

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary: {
        totalSpent: parseFloat(totalAmount.toFixed(2)),
        totalFailed: parseFloat(failedAmount.toFixed(2)),
        totalRefunded: parseFloat(refundedAmount.toFixed(2)),
        transactionCount: payments.length,
        successfulTransactions: successfulCount,
        averageTransactionValue:
          payments.length > 0 ? parseFloat((totalAmount / payments.length).toFixed(2)) : 0,
      },
      breakdown: {
        byContractor: byContractor.sort((a, b) => b.amount - a.amount),
        byServiceType: byServiceType.sort((a, b) => b.amount - a.amount),
      },
      trends: {
        monthly: monthlyTrend,
      },
      recentPayments: (payments as PaymentWithBooking[])
        .slice(-5)
        .reverse()
        .map((p) => ({
          id: p.id,
          date: p.createdAt,
          amount: Number(p.amountAUD),
          status: p.status,
          serviceType: p.booking?.australianServiceType,
          contractor: p.booking?.contractor?.businessName,
        })),
    });
  } catch (error) {
    console.error('[Client Analytics] Error fetching spending data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch spending analytics' },
      { status: 500 }
    );
  }
}
