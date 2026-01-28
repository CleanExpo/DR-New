/**
 * Manual Payout API
 *
 * POST /api/payments/payout/manual
 * Manually payout amount to contractor
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { manualPayoutToContractor } from '@/lib/payments/contractor-payout';
import { z } from 'zod';

// Validation schema
const manualPayoutSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
  amountAUD: z.number().positive('Amount must be greater than 0'),
  description: z.string().optional().default('Manual payout'),
});

type ManualPayoutData = z.infer<typeof manualPayoutSchema>;

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();

    // Validate request
    let validatedData: ManualPayoutData;
    try {
      validatedData = manualPayoutSchema.parse(body);
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

    // Trigger manual payout
    const payoutResult = await manualPayoutToContractor(
      validatedData.contractorId,
      validatedData.amountAUD,
      validatedData.description
    );

    console.log('Manual payout created:', payoutResult);

    return NextResponse.json(
      {
        success: true,
        message: 'Manual payout initiated successfully',
        payout: payoutResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Manual payout error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('Stripe Connect')) {
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to create manual payout',
        details: message,
      },
      { status: 500 }
    );
  }
}
