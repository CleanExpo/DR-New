
/**
 * Booking Payout API
 *
 * POST /api/payments/payout/[bookingId]
 * Trigger payout to contractor for completed booking
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { triggerPayoutForBooking, getContractorEarnings } from '@/lib/payments/contractor-payout';

export async function POST(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { bookingId } = params;

    // Trigger payout
    const payoutResult = await triggerPayoutForBooking(bookingId);

    return NextResponse.json(
      {
        success: true,
        message: 'Payout triggered successfully',
        payout: payoutResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Payout trigger error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    // Check for specific error types
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

    if (message.includes('Stripe Connect')) {
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to trigger payout' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments/payout/[bookingId]
 * Get payout status for a booking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { bookingId } = params;

    // Get booking to verify access
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        clientId: true,
        contractorId: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify access
    if (
      user.userType !== 'ADMIN' &&
      booking.clientId !== user.id &&
      booking.contractorId !== user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get payment and payout info
    const payment = await db.payment.findFirst({
      where: { bookingId },
      select: {
        id: true,
        status: true,
        amountAUD: true,
        processedAt: true,
        createdAt: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: true, payout: null }
      );
    }

    // Get contractor earnings if contractor viewing
    let earnings = null;
    if (booking.contractorId === user.id || user.userType === 'ADMIN') {
      earnings = await getContractorEarnings(booking.contractorId!);
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amountAUD,
        processedAt: payment.processedAt,
      },
      earnings,
    });
  } catch (error) {
    console.error('Get payout error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch payout information' },
      { status: 500 }
    );
  }
}
