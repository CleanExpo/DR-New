import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StripeService } from '@/lib/stripe-service';
import { handleStripeError } from '@/lib/stripe-error-handler';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stripe/customer-portal
 * Create a Stripe customer portal session
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contractorId } = body;

    if (!contractorId) {
      return NextResponse.json(
        { error: 'Missing required field: contractorId' },
        { status: 400 }
      );
    }

    // Get contractor
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor || !contractor.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Contractor not found or no Stripe customer ID' },
        { status: 404 }
      );
    }

    // Get return URL from request or use default
    const returnUrl = body.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/contractor/subscription`;

    // Create customer portal session
    const portalUrl = await StripeService.createCustomerPortalSession(
      contractor.stripeCustomerId,
      returnUrl
    );

    return NextResponse.json({
      success: true,
      url: portalUrl,
    });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    const stripeError = handleStripeError(error);
    return NextResponse.json(
      { error: stripeError.userMessage, details: stripeError.error },
      { status: 500 }
    );
  }
}
