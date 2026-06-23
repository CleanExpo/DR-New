/**
 * Newsletter Confirmation API Route
 *
 * GET /api/newsletter/confirm?token=<confirmationToken>
 * Completes the double-opt-in flow by marking a subscriber as confirmed.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Missing confirmation token' },
      { status: 400 }
    );
  }

  try {
    const { prisma } = await import('@/lib/prisma');

    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: { confirmationToken: token },
    });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired confirmation link' },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        confirmed: true,
        confirmedAt: new Date(),
        confirmationToken: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your newsletter subscription has been confirmed. Thank you!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error confirming newsletter subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to confirm subscription. Please try again.' },
      { status: 500 }
    );
  }
}
