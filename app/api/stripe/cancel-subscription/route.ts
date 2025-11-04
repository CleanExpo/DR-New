import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/cancel-subscription
 * Cancel a contractor's subscription
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing required field: subscriptionId' },
        { status: 400 }
      );
    }

    // Cancel subscription
    await StripeService.cancelSubscription(subscriptionId);

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
