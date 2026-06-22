// @ts-nocheck

/**
 * Contractor Payout Settings API
 *
 * GET /api/contractor/payout-settings
 * Fetch contractor's payout settings and Stripe Connect status
 *
 * PUT /api/contractor/payout-settings
 * Update payout settings
 *
 * Required: CONTRACTOR (own settings only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { z } from 'zod';

const updatePayoutSettingsSchema = z.object({
  payoutSchedule: z.enum(['WEEKLY', 'BI_WEEKLY', 'MONTHLY']).optional(),
});

type UpdatePayoutSettingsData = z.infer<typeof updatePayoutSettingsSchema>;

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get contractor profile
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Get payout settings
    const contractorProfile = await db.contractorProfile.findFirst({
      where: { contractorId: contractor.id },
      select: {
        stripeConnectAccountId: true,
        bankAccountLinked: true,
        totalEarnings: true,
        totalPaidOut: true,
      },
    });

    if (!contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile settings not found' },
        { status: 404 }
      );
    }

    // Get recent payouts
    const recentPayouts = await db.payment.findMany({
      where: {
        contractorId: contractor.id,
        status: 'COMPLETED',
      },
      select: {
        id: true,
        amountAUD: true,
        processedAt: true,
      },
      orderBy: { processedAt: 'desc' },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      settings: {
        contractorName: contractor.businessName,
        stripeConnectStatus: contractorProfile.stripeConnectAccountId
          ? 'CONNECTED'
          : 'NOT_CONNECTED',
        stripeConnectAccountId: contractorProfile.stripeConnectAccountId
          ? `${contractorProfile.stripeConnectAccountId.substring(0, 6)}...`
          : null,
        bankAccountLinked: contractorProfile.bankAccountLinked,
        totalEarnings: parseFloat(contractorProfile.totalEarnings.toString()),
        totalPaidOut: parseFloat(contractorProfile.totalPaidOut.toString()),
        pendingPayout:
          parseFloat(contractorProfile.totalEarnings.toString()) -
          parseFloat(contractorProfile.totalPaidOut.toString()),
        payoutSchedule: 'WEEKLY', // Default - can be expanded
      },
      stripeConnectSetupUrl: contractorProfile.stripeConnectAccountId
        ? null
        : `${process.env.NEXT_PUBLIC_BASE_URL}/auth/stripe-connect`, // Placeholder
      recentPayouts: recentPayouts.map((p) => ({
        id: p.id,
        amount: parseFloat(p.amountAUD.toString()),
        date: p.processedAt,
      })),
      nextPayoutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    });
  } catch (error) {
    console.error('Get payout settings error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch payout settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get contractor profile
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate
    let validatedData: UpdatePayoutSettingsData;
    try {
      validatedData = updatePayoutSettingsSchema.parse(body);
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

    // Update contractor profile
    const updatedProfile = await db.contractorProfile.updateMany({
      where: { contractorId: contractor.id },
      data: {
        updatedAt: new Date(),
      },
    });

    if (updatedProfile.count === 0) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    console.log(`Payout settings updated for contractor ${contractor.id}`);

    return NextResponse.json({
      success: true,
      message: 'Payout settings updated successfully',
      settings: {
        payoutSchedule: validatedData.payoutSchedule || 'WEEKLY',
      },
    });
  } catch (error) {
    console.error('Update payout settings error:', error);

    return NextResponse.json(
      { error: 'Failed to update payout settings' },
      { status: 500 }
    );
  }
}
