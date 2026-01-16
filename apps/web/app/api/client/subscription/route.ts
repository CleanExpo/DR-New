/**
 * Client Subscription API
 *
 * GET /api/client/subscription
 * Fetch client's current subscription
 *
 * PUT /api/client/subscription
 * Update client's subscription plan
 *
 * Required: CLIENT (own subscription only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSubscriptionSchema = z.object({
  plan: z.enum(['STARTER', 'PROFESSIONAL', 'ENTERPRISE']),
});

type UpdateSubscriptionData = z.infer<typeof updateSubscriptionSchema>;

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const clientId = session.user.id;

    // Get client subscription
    const clientPayment = await prisma.clientPayment.findFirst({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    // Get payment history for this subscription
    const paymentHistory = clientPayment
      ? await prisma.payment.findMany({
          where: { clientId },
          select: {
            id: true,
            amountAUD: true,
            gstAUD: true,
            status: true,
            processedAt: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 12, // Last 12 payments
        })
      : [];

    const planPrices: Record<string, number> = {
      STARTER: 49,
      PROFESSIONAL: 99,
      ENTERPRISE: 199,
    };

    return NextResponse.json({
      success: true,
      subscription: clientPayment
        ? {
            id: clientPayment.id,
            plan: clientPayment.plan,
            status: clientPayment.status,
            billingCycle: clientPayment.billingCycle,
            monthlyPrice: planPrices[clientPayment.plan] || 0,
            nextBillingDate: clientPayment.nextBillingDate,
            createdAt: clientPayment.createdAt,
            stripeSubscriptionId: clientPayment.subscriptionId,
          }
        : null,
      paymentHistory: paymentHistory.map((p) => ({
        id: p.id,
        amount: parseFloat(p.amountAUD.toString()),
        gst: parseFloat(p.gstAUD.toString()),
        total: parseFloat(p.amountAUD.toString()) + parseFloat(p.gstAUD.toString()),
        status: p.status,
        date: p.processedAt || p.createdAt,
      })),
      availablePlans: [
        {
          name: 'STARTER',
          price: 49,
          description: 'Up to 5 active jobs',
          features: ['5 active jobs', 'Basic support', 'Email notifications'],
        },
        {
          name: 'PROFESSIONAL',
          price: 99,
          description: 'Up to 20 active jobs',
          features: ['20 active jobs', 'Priority support', 'SMS notifications', 'Advanced analytics'],
        },
        {
          name: 'ENTERPRISE',
          price: 199,
          description: 'Unlimited jobs',
          features: ['Unlimited jobs', '24/7 support', 'All notifications', 'Advanced analytics', 'Dedicated account manager'],
        },
      ],
    });
  } catch (error) {
    console.error('Get subscription error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const clientId = session.user.id;
    const body = await request.json();

    // Validate
    let validatedData: UpdateSubscriptionData;
    try {
      validatedData = updateSubscriptionSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Get current subscription
    const currentSubscription = await prisma.clientPayment.findFirst({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
      take: 1,
    });

    if (!currentSubscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Update subscription
    const updatedSubscription = await prisma.clientPayment.update({
      where: { id: currentSubscription.id },
      data: {
        plan: validatedData.plan,
        updatedAt: new Date(),
      },
    });

    console.log(`Subscription updated for client ${clientId}`);
    console.log(`Plan changed to: ${validatedData.plan}`);

    return NextResponse.json({
      success: true,
      message: 'Subscription updated successfully',
      subscription: {
        id: updatedSubscription.id,
        plan: updatedSubscription.plan,
        status: updatedSubscription.status,
        nextBillingDate: updatedSubscription.nextBillingDate,
      },
    });
  } catch (error) {
    console.error('Update subscription error:', error);

    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}
