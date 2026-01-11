/**
 * Booking Payment API
 *
 * POST /api/payments/booking/[bookingId]
 * Trigger payment for a completed booking
 *
 * Required: ADMIN or CLIENT (who owns the booking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { chargeForCompletedBooking, getPaymentDetails } from '@/lib/payments/booking-payment';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookingId } = params;

    // Get booking to verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        clientId: true,
        status: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify user is the client or an admin
    const user = session.user as any;
    if (user.role !== 'ADMIN' && booking.clientId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this booking' },
        { status: 403 }
      );
    }

    // Verify booking is completed
    if (booking.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: `Cannot charge for booking with status: ${booking.status}` },
        { status: 409 }
      );
    }

    // Trigger payment
    const paymentResult = await chargeForCompletedBooking(bookingId);

    // Log payment creation
    console.log('=== BOOKING PAYMENT INITIATED ===');
    console.log('Booking ID:', bookingId);
    console.log('Payment ID:', paymentResult.paymentId);
    console.log('Amount:', paymentResult.totalAmount);
    console.log('Stripe Intent:', paymentResult.stripePaymentIntentId);

    return NextResponse.json(
      {
        success: true,
        message: 'Payment initiated successfully',
        payment: {
          id: paymentResult.paymentId,
          status: 'PROCESSING',
          totalAmount: paymentResult.totalAmount,
          baseAmount: paymentResult.baseAmount,
          gstAmount: paymentResult.gstAmount,
          stripePaymentIntentId: paymentResult.stripePaymentIntentId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking payment error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to initiate payment',
        details: message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments/booking/[bookingId]
 * Get payment details for a booking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookingId } = params;

    // Get booking to verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
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

    // Verify user is the client, contractor, or admin
    const user = session.user as any;
    if (
      user.role !== 'ADMIN' &&
      booking.clientId !== user.id &&
      booking.contractorId !== user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get payment for this booking
    const payment = await prisma.payment.findFirst({
      where: { bookingId },
      include: {
        booking: {
          select: {
            id: true,
            description: true,
            australianServiceType: true,
            status: true,
          },
        },
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
      },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    if (!payment) {
      return NextResponse.json(
        { success: true, payment: null }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amountAUD,
        gst: payment.gstAUD,
        total: payment.amountAUD.plus(payment.gstAUD),
        processedAt: payment.processedAt,
        failureReason: payment.failureReason,
        booking: payment.booking,
        client: payment.client,
        contractor: payment.contractor,
      },
    });
  } catch (error) {
    console.error('Get payment error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch payment details' },
      { status: 500 }
    );
  }
}
