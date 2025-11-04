/**
 * Stripe Subscription Creation API
 * POST /api/stripe/subscription/create
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { createSubscription } from '@/lib/stripe/subscription-service';
import { getSubscriptionCheckoutUrls } from '@/lib/stripe/config';

const prisma = new PrismaClient();

const requestSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
  tier: z.enum(['TIER_25KM', 'TIER_50KM', 'TIER_100KM', 'RURAL'], {
    errorMap: () => ({ message: 'Invalid subscription tier' }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { contractorId, tier } = requestSchema.parse(body);

    // Check if contractor exists
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        companyProfile: true,
        subscription: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor not found',
        },
        { status: 404 }
      );
    }

    // Check if contractor already has an active subscription
    if (contractor.subscription && contractor.subscription.status === 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor already has an active subscription',
        },
        { status: 400 }
      );
    }

    // Create Stripe subscription
    const { subscription: stripeSubscription, customer } = await createSubscription(
      contractorId,
      tier
    );

    // Update or create contractor subscription in database
    const dbSubscription = await prisma.contractorSubscription.upsert({
      where: { contractorId },
      create: {
        contractorId,
        tier,
        status: 'PENDING',
        baseRadius: tier === 'TIER_25KM' ? 25 : tier === 'TIER_50KM' ? 50 : tier === 'TIER_100KM' ? 100 : 200,
        billingFrequency: 'MONTHLY',
        amount: stripeSubscription.items.data[0].price.unit_amount! / 100,
        nextBillingDate: new Date(stripeSubscription.current_period_end * 1000),
        startDate: new Date(),
        bondAmount: 5000,
        bondStatus: 'PENDING',
        paymentDetails: JSON.stringify({
          stripeSubscriptionId: stripeSubscription.id,
          stripeCustomerId: customer.id,
        }),
      },
      update: {
        tier,
        status: 'PENDING',
        baseRadius: tier === 'TIER_25KM' ? 25 : tier === 'TIER_50KM' ? 50 : tier === 'TIER_100KM' ? 100 : 200,
        amount: stripeSubscription.items.data[0].price.unit_amount! / 100,
        nextBillingDate: new Date(stripeSubscription.current_period_end * 1000),
        startDate: new Date(),
        paymentDetails: JSON.stringify({
          stripeSubscriptionId: stripeSubscription.id,
          stripeCustomerId: customer.id,
        }),
      },
    });

    // Get client secret for payment
    const latestInvoice = stripeSubscription.latest_invoice as any;
    const paymentIntent = latestInvoice?.payment_intent;
    const clientSecret = paymentIntent?.client_secret;

    return NextResponse.json({
      success: true,
      subscription: {
        id: dbSubscription.id,
        stripeSubscriptionId: stripeSubscription.id,
        clientSecret,
        status: stripeSubscription.status,
      },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create subscription',
      },
      { status: 500 }
    );
  }
}
