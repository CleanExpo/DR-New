/**
 * Stripe Checkout Session Creation API
 * POST /api/stripe/create-checkout
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/lib/stripe/payment-service';

const requestSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { invoiceId } = requestSchema.parse(body);

    // Create Stripe Checkout session
    const session = await createCheckoutSession(invoiceId);

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);

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
        error: 'Failed to create checkout session',
      },
      { status: 500 }
    );
  }
}
