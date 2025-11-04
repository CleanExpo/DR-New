/**
 * Subscription Renewal API Route
 * POST /api/subscriptions/[id]/renew - Manually renew a subscription
 *
 * @module API/Subscriptions/[id]/Renew
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { subscriptionService } from '@/lib/subscription-service';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

/**
 * Optional renewal options schema
 */
const renewalOptionsSchema = z.object({
  processPaymentImmediately: z.boolean().optional(),
  sendNotification: z.boolean().optional()
});

/**
 * POST /api/subscriptions/[id]/renew
 * Manually renew a subscription
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication (uncomment when auth is configured)
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const subscriptionId = params.id;

    // Validate subscription ID format
    if (!subscriptionId || !z.string().cuid().safeParse(subscriptionId).success) {
      return NextResponse.json(
        { error: 'Invalid subscription ID' },
        { status: 400 }
      );
    }

    // Parse optional renewal options from body
    let options = { processPaymentImmediately: true, sendNotification: true };
    try {
      const body = await request.json();
      const validationResult = renewalOptionsSchema.safeParse(body);
      if (validationResult.success) {
        options = { ...options, ...validationResult.data };
      }
    } catch {
      // No body or invalid JSON is fine, use defaults
    }

    // Check if subscription exists first
    const existingSubscription = await subscriptionService.getSubscription(subscriptionId);
    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Renew subscription
    const subscription = await subscriptionService.renewSubscription(subscriptionId);

    // Calculate renewal details
    const monthlyFee = subscriptionService.calculateMonthlyFee(
      subscription.tier as any
    );

    console.log('Subscription renewed:', {
      id: subscription.id,
      contractorId: subscription.contractorId,
      status: subscription.status,
      nextBillingDate: subscription.nextBillingDate
    });

    return NextResponse.json({
      success: true,
      data: {
        subscription: {
          id: subscription.id,
          contractorId: subscription.contractorId,
          tier: subscription.tier,
          status: subscription.status,
          baseRadius: subscription.baseRadius,
          billingFrequency: subscription.billingFrequency,
          amount: subscription.amount,
          nextBillingDate: subscription.nextBillingDate,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          bondAmount: subscription.bondAmount,
          bondStatus: subscription.bondStatus,
          updatedAt: subscription.updatedAt
        },
        renewal: {
          monthlyFee,
          nextBillingDate: subscription.nextBillingDate,
          status: 'success',
          message: 'Subscription renewed successfully'
        }
      }
    });
  } catch (error) {
    console.error('Failed to renew subscription:', error);

    if (error instanceof Error) {
      if (error.message === 'Subscription not found') {
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 }
        );
      }
      if (error.message === 'Subscription is already active') {
        return NextResponse.json(
          { error: 'Subscription is already active' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to renew subscription' },
      { status: 500 }
    );
  }
}