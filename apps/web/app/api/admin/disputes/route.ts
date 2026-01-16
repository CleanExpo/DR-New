/**
 * Admin Disputes Management API
 *
 * GET /api/admin/disputes
 * List all open/closed disputes for admin review
 *
 * Query params:
 * - limit: number (default: 20)
 * - offset: number (default: 0)
 * - status: OPEN | REFUNDED (optional)
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { listOpenDisputes } from '@/lib/payments/refund-handler';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {};
    if (status === 'REFUNDED') {
      where.status = 'REFUNDED';
    } else if (status === 'OPEN') {
      // Open disputes would be payments being contested (not yet fully handled)
      where.status = 'PENDING'; // Placeholder
    }

    // Get refunded/disputed payments
    const [disputes, total] = await Promise.all([
      prisma.payment.findMany({
        where: {
          status: 'REFUNDED',
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          contractor: {
            select: {
              id: true,
              businessName: true,
            },
          },
          booking: {
            select: {
              id: true,
              australianServiceType: true,
              serviceSuburb: true,
              completedAt: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.payment.count({
        where: { status: 'REFUNDED' },
      }),
    ]);

    // Calculate summary statistics
    const totalDisputedAmount = disputes.reduce(
      (sum, p) =>
        sum +
        parseFloat(p.amountAUD.toString()) +
        parseFloat(p.gstAUD.toString()),
      0
    );

    return NextResponse.json({
      success: true,
      disputes: disputes.map((p) => ({
        id: p.id,
        paymentId: p.id,
        clientName: p.client?.name,
        clientEmail: p.client?.email,
        contractorName: p.contractor?.businessName,
        serviceType: p.booking?.australianServiceType,
        location: p.booking?.serviceSuburb,
        amount: parseFloat(p.amountAUD.toString()),
        gst: parseFloat(p.gstAUD.toString()),
        total:
          parseFloat(p.amountAUD.toString()) +
          parseFloat(p.gstAUD.toString()),
        status: 'REFUNDED',
        createdAt: p.createdAt,
        refundedAt: p.updatedAt,
        daysOpen: Math.floor(
          (new Date().getTime() - p.createdAt.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      })),
      summary: {
        totalDisputes: total,
        totalDisputedAmount,
        averageDisputeAmount:
          total > 0 ? totalDisputedAmount / total : 0,
      },
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Get disputes error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch disputes' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create manual dispute (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paymentId, reason, approvedAmount } = body;

    if (!paymentId || !reason) {
      return NextResponse.json(
        { error: 'paymentId and reason are required' },
        { status: 400 }
      );
    }

    // Get payment
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        amountAUD: true,
        gstAUD: true,
        status: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Calculate total
    const totalAmount =
      parseFloat(payment.amountAUD.toString()) +
      parseFloat(payment.gstAUD.toString());
    const refundAmount = approvedAmount || totalAmount;

    // Mark as refunded
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'REFUNDED',
        updatedAt: new Date(),
      },
    });

    console.log('=== MANUAL DISPUTE CREATED ===');
    console.log('Payment ID:', paymentId);
    console.log('Admin ID:', session.user.id);
    console.log('Reason:', reason);
    console.log('Refund Amount:', refundAmount);

    return NextResponse.json(
      {
        success: true,
        message: 'Dispute created successfully',
        dispute: {
          paymentId,
          status: 'REFUNDED',
          reason,
          refundAmount,
          createdAt: new Date(),
          createdBy: session.user.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create dispute error:', error);

    return NextResponse.json(
      { error: 'Failed to create dispute' },
      { status: 500 }
    );
  }
}
