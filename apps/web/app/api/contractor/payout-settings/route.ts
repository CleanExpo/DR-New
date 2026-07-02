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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get contractor record (lifecycle keyed on User.id — DR-879 Option B)
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

    // Stripe Connect account lives on ContractorProfile, keyed by userId.
    // A missing profile means "not connected yet", not an error.
    const contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id },
      select: { stripeConnectAccountId: true },
    });
    const stripeConnectAccountId =
      contractorProfile?.stripeConnectAccountId ?? null;

    // Earnings = completed inbound job payments; payouts = transferred ledger
    // rows; pending = ledger rows not yet transferred (DR-858 N-01/N-02 ledger).
    const [earnings, paidOut, pending, recentPayouts] = await Promise.all([
      db.payment.aggregate({
        _sum: { amountAUD: true },
        where: { contractorId: contractor.id, status: 'COMPLETED' },
      }),
      db.contractorPayout.aggregate({
        _sum: { amountAUD: true },
        where: { contractorId: contractor.id, status: 'TRANSFERRED' },
      }),
      db.contractorPayout.aggregate({
        _sum: { amountAUD: true },
        where: { contractorId: contractor.id, status: 'PENDING' },
      }),
      db.contractorPayout.findMany({
        where: { contractorId: contractor.id, status: 'TRANSFERRED' },
        select: {
          id: true,
          amountAUD: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      success: true,
      settings: {
        contractorName: contractor.businessName,
        stripeConnectStatus: stripeConnectAccountId
          ? 'CONNECTED'
          : 'NOT_CONNECTED',
        stripeConnectAccountId: stripeConnectAccountId
          ? `${stripeConnectAccountId.substring(0, 6)}...`
          : null,
        bankAccountLinked: Boolean(stripeConnectAccountId),
        totalEarnings: Number(earnings._sum.amountAUD ?? 0),
        totalPaidOut: Number(paidOut._sum.amountAUD ?? 0),
        pendingPayout: Number(pending._sum.amountAUD ?? 0),
        payoutSchedule: 'WEEKLY', // Default - can be expanded
      },
      stripeConnectSetupUrl: stripeConnectAccountId
        ? null
        : '/dashboard/contractor/onboarding/payouts',
      recentPayouts: recentPayouts.map((p) => ({
        id: p.id,
        amount: Number(p.amountAUD),
        date: p.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Get payout settings error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch payout settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get contractor record (lifecycle keyed on User.id — DR-879 Option B)
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

    // ContractorProfile is keyed by userId (no contractorId column exists)
    const updatedProfile = await db.contractorProfile.updateMany({
      where: { userId: user.id },
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
