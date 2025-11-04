/**
 * Stripe Subscription Update API
 * PATCH /api/stripe/subscription/update
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { updateSubscription } from '@/lib/stripe/subscription-service';

const prisma = new PrismaClient();

const requestSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
  newTier: z.enum(['TIER_25KM', 'TIER_50KM', 'TIER_100KM', 'RURAL'], {
    errorMap: () => ({ message: 'Invalid subscription tier' }),
  }),
});

export async function PATCH(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { subscriptionId, newTier } = requestSchema.parse(body);

    // Get contractor subscription
    const subscription = await prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Subscription not found',
        },
        { status: 404 }
      );
    }

    if (subscription.status !== 'ACTIVE') {
      return NextResponse.json(
        {
          success: false,
          error: 'Can only update active subscriptions',
        },
        { status: 400 }
      );
    }

    // Get Stripe subscription ID
    let stripeSubscriptionId: string | null = null;
    try {
      const paymentDetails = JSON.parse(subscription.paymentDetails || '{}');
      stripeSubscriptionId = paymentDetails.stripeSubscriptionId;
    } catch (e) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid subscription payment details',
        },
        { status: 400 }
      );
    }

    if (!stripeSubscriptionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Stripe subscription not found',
        },
        { status: 400 }
      );
    }

    // Update Stripe subscription
    const updatedStripeSubscription = await updateSubscription(stripeSubscriptionId, newTier);

    // Update database subscription
    const newRadius = newTier === 'TIER_25KM' ? 25 : newTier === 'TIER_50KM' ? 50 : newTier === 'TIER_100KM' ? 100 : 200;
    const newAmount = updatedStripeSubscription.items.data[0].price.unit_amount! / 100;

    const updatedSubscription = await prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: {
        tier: newTier,
        baseRadius: newRadius,
        amount: newAmount,
        nextBillingDate: new Date(updatedStripeSubscription.current_period_end * 1000),
      },
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: subscription.contractorId,
        action: 'SUBSCRIPTION_UPDATED',
        category: 'SUBSCRIPTION',
        details: JSON.stringify({
          subscriptionId,
          oldTier: subscription.tier,
          newTier,
          oldAmount: subscription.amount,
          newAmount,
        }),
        performedBy: subscription.contractorId,
        performedByType: 'CONTRACTOR',
      },
    });

    return NextResponse.json({
      success: true,
      subscription: {
        id: updatedSubscription.id,
        tier: updatedSubscription.tier,
        amount: updatedSubscription.amount,
        baseRadius: updatedSubscription.baseRadius,
        nextBillingDate: updatedSubscription.nextBillingDate,
      },
    });
  } catch (error) {
    console.error('Error updating subscription:', error);

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
        error: 'Failed to update subscription',
      },
      { status: 500 }
    );
  }
}
