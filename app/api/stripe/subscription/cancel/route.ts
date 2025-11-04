/**
 * Stripe Subscription Cancellation API
 * POST /api/stripe/subscription/cancel
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { cancelSubscription } from '@/lib/stripe/subscription-service';

const prisma = new PrismaClient();

const requestSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
  reason: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { subscriptionId, reason } = requestSchema.parse(body);

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

    if (subscription.status === 'CANCELLED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Subscription is already cancelled',
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

    // Cancel Stripe subscription (at period end)
    const cancelledStripeSubscription = await cancelSubscription(stripeSubscriptionId);

    // Update database subscription - mark for cancellation at period end
    const updatedSubscription = await prisma.contractorSubscription.update({
      where: { id: subscriptionId },
      data: {
        // Don't immediately mark as CANCELLED - wait for period end
        // Stripe will send webhook when actually cancelled
        cancelledAt: new Date(),
      },
    });

    // Create notification
    await prisma.contractorNotification.create({
      data: {
        contractorId: subscription.contractorId,
        type: 'SUBSCRIPTION',
        priority: 'NORMAL',
        subject: 'Subscription Cancellation Scheduled',
        message: `Your subscription will be cancelled at the end of the current billing period on ${new Date(
          cancelledStripeSubscription.current_period_end * 1000
        ).toLocaleDateString()}.`,
        actionRequired: false,
      },
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: subscription.contractorId,
        action: 'SUBSCRIPTION_CANCELLED',
        category: 'SUBSCRIPTION',
        details: JSON.stringify({
          subscriptionId,
          reason,
          cancelAt: new Date(cancelledStripeSubscription.current_period_end * 1000),
        }),
        performedBy: subscription.contractorId,
        performedByType: 'CONTRACTOR',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription will be cancelled at the end of the current billing period',
      cancelAt: new Date(cancelledStripeSubscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);

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
        error: 'Failed to cancel subscription',
      },
      { status: 500 }
    );
  }
}
