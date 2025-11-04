import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/create-payment-intent
 * Create a payment intent for an invoice
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json(
        { error: 'Missing required field: invoiceId' },
        { status: 400 }
      );
    }

    // Create payment intent
    const result = await StripeService.createPaymentIntent(invoiceId);

    return NextResponse.json({
      success: true,
      paymentIntentId: result.paymentIntentId,
      clientSecret: result.clientSecret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
