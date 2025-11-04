/**
 * Individual Subscription API Routes
 * GET /api/subscriptions/[id] - Get subscription details
 * PATCH /api/subscriptions/[id] - Update subscription
 * DELETE /api/subscriptions/[id] - Cancel subscription
 *
 * @module API/Subscriptions/[id]
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  subscriptionService,
  SubscriptionTier,
  BillingFrequency,
  UpdateSubscriptionInput,
  SubscriptionStatus
} from '@/lib/subscription-service';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

/**
 * Validation schema for updating subscription
 */
const updateSubscriptionSchema = z.object({
  tier: z.nativeEnum(SubscriptionTier).optional(),
  baseLocation: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      address: z.string().min(1)
    })
    .optional(),
  billingFrequency: z.nativeEnum(BillingFrequency).optional(),
  paymentMethodId: z.string().optional(),
  additionalTerritories: z.array(z.string()).optional(),
  status: z.nativeEnum(SubscriptionStatus).optional()
});

/**
 * Validation schema for cancelling subscription
 */
const cancelSubscriptionSchema = z.object({
  reason: z.string().optional()
});

/**
 * GET /api/subscriptions/[id]
 * Get subscription details by ID
 */
export async function GET(
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

    // Get subscription
    const subscription = await subscriptionService.getSubscription(subscriptionId);

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        subscription: {
          id: subscription.id,
          contractorId: subscription.contractorId,
          contractor: subscription.contractor
            ? {
                id: subscription.contractor.id,
                email: subscription.contractor.email,
                username: subscription.contractor.username,
                status: subscription.contractor.status
              }
            : undefined,
          tier: subscription.tier,
          status: subscription.status,
          baseRadius: subscription.baseRadius,
          additionalTerritories: subscription.additionalTerritories
            ? JSON.parse(subscription.additionalTerritories)
            : [],
          billingFrequency: subscription.billingFrequency,
          amount: subscription.amount,
          nextBillingDate: subscription.nextBillingDate,
          paymentMethod: subscription.paymentMethod,
          bondAmount: subscription.bondAmount,
          bondStatus: subscription.bondStatus,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          cancelledAt: subscription.cancelledAt,
          createdAt: subscription.createdAt,
          updatedAt: subscription.updatedAt,
          payments: subscription.payments?.map(payment => ({
            id: payment.id,
            amount: payment.amount,
            type: payment.type,
            status: payment.status,
            paymentMethod: payment.paymentMethod,
            transactionId: payment.transactionId,
            dueDate: payment.dueDate,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt
          })),
          invoices: subscription.invoices?.map(invoice => ({
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            amount: invoice.amount,
            gst: invoice.gst,
            total: invoice.total,
            status: invoice.status,
            issueDate: invoice.issueDate,
            dueDate: invoice.dueDate,
            paidAt: invoice.paidAt,
            createdAt: invoice.createdAt
          }))
        }
      }
    });
  } catch (error) {
    console.error('Failed to get subscription:', error);

    return NextResponse.json(
      { error: 'Failed to get subscription details' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/subscriptions/[id]
 * Update subscription details
 */
export async function PATCH(
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

    // Parse and validate request body
    const body = await request.json();
    const validationResult = updateSubscriptionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const input: UpdateSubscriptionInput = validationResult.data;

    // Update subscription
    const subscription = await subscriptionService.updateSubscription(
      subscriptionId,
      input
    );

    console.log('Subscription updated:', {
      id: subscription.id,
      changes: input
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
          additionalTerritories: subscription.additionalTerritories
            ? JSON.parse(subscription.additionalTerritories)
            : [],
          billingFrequency: subscription.billingFrequency,
          amount: subscription.amount,
          nextBillingDate: subscription.nextBillingDate,
          paymentMethod: subscription.paymentMethod,
          bondAmount: subscription.bondAmount,
          bondStatus: subscription.bondStatus,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          updatedAt: subscription.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Failed to update subscription:', error);

    if (error instanceof Error && error.message === 'Subscription not found') {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/subscriptions/[id]
 * Cancel subscription
 */
export async function DELETE(
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

    // Parse optional cancellation reason from body
    let reason: string | undefined;
    try {
      const body = await request.json();
      const validationResult = cancelSubscriptionSchema.safeParse(body);
      if (validationResult.success) {
        reason = validationResult.data.reason;
      }
    } catch {
      // No body or invalid JSON is fine, reason is optional
    }

    // Cancel subscription
    const subscription = await subscriptionService.cancelSubscription(
      subscriptionId,
      reason
    );

    console.log('Subscription cancelled:', {
      id: subscription.id,
      reason
    });

    return NextResponse.json({
      success: true,
      data: {
        subscription: {
          id: subscription.id,
          contractorId: subscription.contractorId,
          tier: subscription.tier,
          status: subscription.status,
          cancelledAt: subscription.cancelledAt,
          endDate: subscription.endDate
        },
        message: 'Subscription has been cancelled successfully'
      }
    });
  } catch (error) {
    console.error('Failed to cancel subscription:', error);

    if (error instanceof Error) {
      if (error.message === 'Subscription not found') {
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 }
        );
      }
      if (error.message === 'Subscription is already cancelled') {
        return NextResponse.json(
          { error: 'Subscription is already cancelled' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}