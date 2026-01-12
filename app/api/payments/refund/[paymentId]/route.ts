/**
 * Refund API
 *
 * POST /api/payments/refund/[paymentId]
 * Initiate or approve refund/dispute for a payment
 *
 * Required: CLIENT (initiate) or ADMIN (approve)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  initiateDispute,
  reviewDispute,
  processRefund,
  completeRefund,
  getDisputeDetails,
} from '@/lib/payments/refund-handler';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const clientRefundSchema = z.object({
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  requestedAmount: z.number().positive().optional(),
});

const adminRefundSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'PARTIAL']),
  approvedAmount: z.number().positive().optional(),
  notes: z.string().optional(),
});

type ClientRefundData = z.infer<typeof clientRefundSchema>;
type AdminRefundData = z.infer<typeof adminRefundSchema>;

/**
 * POST - Client initiates dispute/refund
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { paymentId } = params;
    const body = await request.json();

    // Check if user is client or admin
    const user = session.user as any;
    const isAdmin = user.role === 'ADMIN';
    const isClient = user.role === 'USER';

    if (!isAdmin && !isClient) {
      return NextResponse.json(
        { error: 'Unauthorized role' },
        { status: 403 }
      );
    }

    if (isClient) {
      // Client initiating dispute
      let validatedData: ClientRefundData;
      try {
        validatedData = clientRefundSchema.parse(body);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              error: 'Validation failed',
              details: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }

      // Initiate dispute
      const dispute = await initiateDispute(
        paymentId,
        user.id,
        validatedData.reason,
        validatedData.requestedAmount
      );

      return NextResponse.json(
        {
          success: true,
          message: 'Dispute initiated successfully',
          dispute,
        },
        { status: 201 }
      );
    } else if (isAdmin) {
      // Admin reviewing/approving dispute
      let validatedData: AdminRefundData;
      try {
        validatedData = adminRefundSchema.parse(body);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              error: 'Validation failed',
              details: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }

      // Review dispute
      const review = await reviewDispute(
        paymentId,
        user.id,
        validatedData.action,
        validatedData.approvedAmount,
        validatedData.notes
      );

      // If approved, process refund
      if (validatedData.action === 'APPROVE' || validatedData.action === 'PARTIAL') {
        const refundAmount =
          validatedData.approvedAmount ||
          (await prisma.payment.findUnique({
            where: { id: paymentId },
            select: { amountAUD: true, gstAUD: true },
          }))
            ? parseFloat(
                (
                  await prisma.payment.findUnique({
                    where: { id: paymentId },
                    select: { amountAUD: true, gstAUD: true },
                  })
                )!.amountAUD.toString() as unknown as string
              ) +
              parseFloat(
                (
                  await prisma.payment.findUnique({
                    where: { id: paymentId },
                    select: { amountAUD: true, gstAUD: true },
                  })
                )!.gstAUD.toString() as unknown as string
              )
            : 0;

        const stripeRefund = await processRefund(paymentId, refundAmount);
        const completedRefund = await completeRefund(
          paymentId,
          refundAmount,
          stripeRefund.stripeRefundId
        );

        return NextResponse.json(
          {
            success: true,
            message: 'Refund processed successfully',
            refund: completedRefund,
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          {
            success: true,
            message: 'Dispute rejected',
            review,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error('Refund error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('Dispute window')) {
      return NextResponse.json(
        { error: message },
        { status: 409 }
      );
    }

    if (message.includes('not found')) {
      return NextResponse.json(
        { error: message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process refund', details: message },
      { status: 500 }
    );
  }
}

/**
 * GET - Get dispute/refund details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { paymentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { paymentId } = params;
    const user = session.user as any;

    // Get dispute details
    const details = await getDisputeDetails(paymentId);

    // Check access
    if (
      user.role !== 'ADMIN' &&
      details.payment.clientId !== user.id &&
      details.payment.contractorId !== user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      dispute: {
        paymentId,
        amount: details.totalAmount,
        status: details.disputeStatus,
        daysSincePayment: details.daysSincePayment,
        daysRemaining: details.daysRemaining,
        canDispute: details.canDispute,
        booking: details.payment.booking,
        client: details.payment.client,
        contractor: details.payment.contractor,
      },
    });
  } catch (error) {
    console.error('Get dispute error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch dispute details' },
      { status: 500 }
    );
  }
}
