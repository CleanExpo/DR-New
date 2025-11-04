import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/create-subscription
 * Create a new subscription for a contractor
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contractorId, tier } = body;

    if (!contractorId || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields: contractorId, tier' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers = ['RADIUS_25KM', 'RADIUS_50KM', 'RADIUS_100KM', 'RURAL'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be one of: ' + validTiers.join(', ') },
        { status: 400 }
      );
    }

    // Create subscription
    const result = await StripeService.createSubscription({
      contractorId,
      tier,
    });

    return NextResponse.json({
      success: true,
      subscriptionId: result.subscriptionId,
      clientSecret: result.clientSecret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
