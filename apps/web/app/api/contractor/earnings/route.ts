// @ts-nocheck

/**
 * Contractor Earnings API
 *
 * GET /api/contractor/earnings
 * Fetch contractor's earnings summary and detailed history
 *
 * Query params:
 * - limit: number (default: 20)
 * - offset: number (default: 0)
 * - period: current_month | current_year | all_time (default: all_time)
 *
 * Required: CONTRACTOR (own earnings only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import {
  getContractorEarnings,
  calculatePayoutAmount,
  CONTRACTOR_PAYOUT_PERCENTAGE,
} from '@/lib/payments/contractor-payout';

export async function GET(request: NextRequest) {
  try {
    // Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor profile - automatically tenant-scoped
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const period = searchParams.get('period') || 'all_time';

    // Calculate date range based on period
    let dateFilter: any = {};
    if (period === 'current_month') {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { gte: startOfMonth };
    } else if (period === 'current_year') {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      dateFilter = { gte: startOfYear };
    }

    // Get earnings data
    const earnings = await getContractorEarnings(contractor.id);

    // Get detailed payments for period
    const whereClause: any = {
      contractorId: contractor.id,
      status: 'COMPLETED',
    };

    if (Object.keys(dateFilter).length > 0) {
      whereClause.processedAt = dateFilter;
    }

    const [payments, totalPayments] = await Promise.all([
      db.payment.findMany({
        where: whereClause,
        include: {
          booking: {
            select: {
              id: true,
              australianServiceType: true,
              serviceSuburb: true,
              servicePostcode: true,
              completedAt: true,
            },
          },
        },
        orderBy: { processedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.payment.count({ where: whereClause }),
    ]);

    // Calculate period-specific earnings
    const periodEarnings = payments.reduce((sum, p) => {
      return sum + parseFloat(p.amountAUD.toString());
    }, 0);

    const periodPayouts = payments
      .map((p) => {
        const { netAmount } = calculatePayoutAmount(parseFloat(p.amountAUD.toString()));
        return netAmount;
      })
      .reduce((a, b) => a + b, 0);

    return NextResponse.json({
      success: true,
      summary: {
        totalEarnings: earnings.totalEarnings,
        totalPaidOut: earnings.totalPaidOut,
        pendingPayout: earnings.pendingPayout,
        paymentCount: earnings.paymentCount,
        lastPayment: earnings.lastPayment,
        platformFeePercentage: 100 - CONTRACTOR_PAYOUT_PERCENTAGE,
        contractorPayoutPercentage: CONTRACTOR_PAYOUT_PERCENTAGE,
      },
      periodEarnings: {
        period,
        totalAmount: periodEarnings,
        totalPayout: periodPayouts,
        jobCount: payments.length,
        averageJobValue: payments.length > 0 ? periodEarnings / payments.length : 0,
      },
      earnings: payments.map((payment) => {
        const { netAmount, platformFee } = calculatePayoutAmount(
          parseFloat(payment.amountAUD.toString())
        );

        return {
          id: payment.id,
          jobAmount: parseFloat(payment.amountAUD.toString()),
          gst: parseFloat(payment.gstAUD.toString()),
          totalAmount:
            parseFloat(payment.amountAUD.toString()) +
            parseFloat(payment.gstAUD.toString()),
          platformFee,
          payoutAmount: netAmount,
          status: payment.status,
          processedAt: payment.processedAt,
          completedAt: payment.completedAt,
          booking: payment.booking
            ? {
                id: payment.booking.id,
                serviceType: payment.booking.australianServiceType,
                location: `${payment.booking.serviceSuburb}, ${payment.booking.servicePostcode}`,
              }
            : null,
        };
      }),
      pagination: {
        limit,
        offset,
        total: totalPayments,
        hasMore: offset + limit < totalPayments,
      },
    });
  } catch (error) {
    console.error('Get contractor earnings error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch earnings' },
      { status: 500 }
    );
  }
}
