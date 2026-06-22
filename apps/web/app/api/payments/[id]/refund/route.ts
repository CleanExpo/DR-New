
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { refundPaymentSchema, validateRequest, formatZodErrors } from '@/lib/validation';
import { createRefund } from '@/lib/stripe';

interface RouteParams {
  params: { id: string };
}

// Create refund for a payment
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const { id } = params;
    const body = await request.json();

    // Validate request
    const validation = validateRequest(refundPaymentSchema, { ...body, paymentId: id });
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { amount, reason } = validation.data;

    // Get payment
    const payment = await db.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Check if payment is refundable
    if (payment.status !== 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Only completed payments can be refunded' },
        { status: 400 }
      );
    }

    // Calculate refund amount
    const refundAmount = amount || payment.amount - payment.refundedAmount;

    if (refundAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid refund amount' },
        { status: 400 }
      );
    }

    if (refundAmount > payment.amount - payment.refundedAmount) {
      return NextResponse.json(
        { success: false, error: 'Refund amount exceeds available amount' },
        { status: 400 }
      );
    }

    // Process Stripe refund if applicable
    let stripeRefund = null;
    if (payment.stripePaymentIntentId) {
      stripeRefund = await createRefund({
        paymentIntentId: payment.stripePaymentIntentId,
        amount: refundAmount,
        reason: reason || 'requested_by_customer',
      });
    }

    // Create refund record
    const refund = await db.refund.create({
      data: {
        paymentId: id,
        amount: refundAmount,
        reason: reason || null,
        stripeRefundId: stripeRefund?.id || null,
        status: 'COMPLETED',
        processedBy: user.id,
      },
    });

    // Update payment
    const newRefundedAmount = payment.refundedAmount + refundAmount;
    const newStatus = newRefundedAmount >= payment.amount ? 'REFUNDED' : 'COMPLETED';

    await db.payment.update({
      where: { id },
      data: {
        refundedAmount: newRefundedAmount,
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      data: refund,
      message: 'Refund processed successfully',
    });
  } catch (error) {
    console.error('Process refund error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
