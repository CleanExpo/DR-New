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

    // Calculate metrics
    const totalAmount = payments
      .filter((p) => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + Number(p.amountAUD), 0);

    const failedAmount = payments
      .filter((p) => p.status === 'FAILED')
      .reduce((sum, p) => sum + Number(p.amountAUD), 0);

    const refundedAmount = payments
      .filter((p) => p.status === 'REFUNDED')
      .reduce((sum, p) => sum + Number(p.amountAUD), 0);

    // Spending by contractor
    const byContractor = (payments as PaymentWithBooking[]).reduce(
      (acc, p) => {
        const contractorName = p.booking?.contractor?.businessName || 'Unknown';
        const existing = acc.find((c) => c.contractor === contractorName);
        if (existing) {
          existing.amount += Number(p.amountAUD);
          existing.count += 1;
        } else {
          acc.push({
            contractor: contractorName,
            amount: Number(p.amountAUD),
            count: 1,
          });
        }
        return acc;
      },
      [] as Array<{ contractor: string; amount: number; count: number }>
    );

    // Spending by service type
    const byServiceType = (payments as PaymentWithBooking[]).reduce(
      (acc, p) => {
        const serviceType = p.booking?.australianServiceType || 'Unknown';
        const existing = acc.find((s) => s.serviceType === serviceType);
        if (existing) {
          existing.amount += Number(p.amountAUD);
          existing.count += 1;
        } else {
          acc.push({
            serviceType,
            amount: Number(p.amountAUD),
            count: 1,
          });
        }
        return acc;
      },
      [] as Array<{ serviceType: string; amount: number; count: number }>
    );

    // Monthly spending trend
    const monthlyData: Record<string, number> = {};
    payments.forEach((p) => {
      const monthKey = p.createdAt.toISOString().substring(0, 7); // YYYY-MM
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Number(p.amountAUD);
    });

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
        successfulTransactions: payments.filter((p) => p.status === 'COMPLETED').length,
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

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch spending analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
