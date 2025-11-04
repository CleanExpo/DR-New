/**
 * Subscription API Routes
 * POST /api/subscriptions - Create new subscription
 * GET /api/subscriptions - List subscriptions
 *
 * @module API/Subscriptions
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  subscriptionService,
  SubscriptionTier,
  BillingFrequency,
  CreateSubscriptionInput,
  SubscriptionStatus
} from '@/lib/subscription-service';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

/**
 * Validation schema for creating subscription
 */
const createSubscriptionSchema = z.object({
  contractorId: z.string().cuid(),
  tier: z.nativeEnum(SubscriptionTier),
  baseLocation: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      address: z.string().min(1)
    })
    .optional(),
  billingFrequency: z.nativeEnum(BillingFrequency).optional(),
  paymentMethodId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  additionalTerritories: z.array(z.string()).optional()
});

/**
 * Query params schema for listing subscriptions
 */
const listSubscriptionsSchema = z.object({
  status: z.nativeEnum(SubscriptionStatus).optional(),
  tier: z.nativeEnum(SubscriptionTier).optional(),
  contractorId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

/**
 * POST /api/subscriptions
 * Create a new subscription for a contractor
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication (uncomment when auth is configured)
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createSubscriptionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const input: CreateSubscriptionInput = {
      ...validationResult.data,
      startDate: validationResult.data.startDate
        ? new Date(validationResult.data.startDate)
        : undefined
    };

    // Create subscription
    const subscription = await subscriptionService.createSubscription(input);

    // Log the action
    console.log('Subscription created:', {
      id: subscription.id,
      contractorId: subscription.contractorId,
      tier: subscription.tier,
      status: subscription.status
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
          bondAmount: subscription.bondAmount,
          bondStatus: subscription.bondStatus,
          createdAt: subscription.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Failed to create subscription:', error);

    if (error instanceof Error) {
      if (
        error.message.includes('not found') ||
        error.message.includes('must be approved') ||
        error.message.includes('already has')
      ) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/subscriptions
 * List subscriptions with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication (uncomment when auth is configured)
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validationResult = listSubscriptionsSchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    // List subscriptions with filters
    const result = await subscriptionService.listSubscriptions(validationResult.data);

    return NextResponse.json({
      success: true,
      data: {
        subscriptions: result.subscriptions.map(sub => ({
          id: sub.id,
          contractorId: sub.contractorId,
          contractor: sub.contractor
            ? {
                id: sub.contractor.id,
                email: sub.contractor.email,
                companyName: sub.contractor.companyProfile?.companyName
              }
            : undefined,
          tier: sub.tier,
          status: sub.status,
          baseRadius: sub.baseRadius,
          billingFrequency: sub.billingFrequency,
          amount: sub.amount,
          nextBillingDate: sub.nextBillingDate,
          startDate: sub.startDate,
          endDate: sub.endDate,
          bondAmount: sub.bondAmount,
          bondStatus: sub.bondStatus,
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt
        })),
        pagination: {
          total: result.total,
          page: result.page,
          totalPages: result.totalPages,
          limit: validationResult.data.limit || 20
        }
      }
    });
  } catch (error) {
    console.error('Failed to list subscriptions:', error);

    return NextResponse.json(
      { error: 'Failed to list subscriptions' },
      { status: 500 }
    );
  }
}