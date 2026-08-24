import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { PaymentStatus } from '@prisma/client';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Get single payment
export async function GET(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { id } = params;

    const payment = await db.payment.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            contractor: {
              select: {
                id: true,
                businessName: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Check authorization
    if (
      user.userType !== 'ADMIN' &&
      payment.clientId !== user.id &&
      payment.contractorId !== user.id
    ) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Get payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update payment (admin only for certain fields)
export async function PATCH(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { id } = params;
    const body = await request.json();

    const payment = await db.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Only admins can update payments
    if (user.userType !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const updateData: { status?: PaymentStatus } = {};

    // Only status is an updatable field on Payment model
    if (body.status !== undefined && Object.values(PaymentStatus).includes(body.status as PaymentStatus)) {
      updateData.status = body.status as PaymentStatus;
    }

    const updatedPayment = await db.payment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updatedPayment,
    });
  } catch (error) {
    console.error('Update payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
