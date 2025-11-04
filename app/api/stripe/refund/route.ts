import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/refund
 * Process a refund for a payment
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can process refunds
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { paymentIntentId, amount } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing required field: paymentIntentId' },
        { status: 400 }
      );
    }

    // Process refund
    await StripeService.processRefund(paymentIntentId, amount);

    return NextResponse.json({
      success: true,
      message: 'Refund processed successfully',
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
