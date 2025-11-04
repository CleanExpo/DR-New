import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/confirm-payment
 * Confirm a payment and update invoice status
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing required field: paymentIntentId' },
        { status: 400 }
      );
    }

    // Confirm payment
    await StripeService.confirmPayment(paymentIntentId);

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
