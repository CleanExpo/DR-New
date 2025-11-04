import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/stripe/update-subscription
 * Update a contractor's subscription tier
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { subscriptionId, newTier } = body;

    if (!subscriptionId || !newTier) {
      return NextResponse.json(
        { error: 'Missing required fields: subscriptionId, newTier' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = ['RADIUS_25KM', 'RADIUS_50KM', 'RADIUS_100KM', 'RURAL'];
    if (!validTiers.includes(newTier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be one of: ' + validTiers.join(', ') },
        { status: 400 }
      );
    }

    // Update subscription
    await StripeService.updateSubscription(subscriptionId, newTier);

    return NextResponse.json({
      success: true,
      message: 'Subscription updated successfully',
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
