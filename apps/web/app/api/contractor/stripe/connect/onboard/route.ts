import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { createAccountLink, createConnectedAccount } from '@/lib/stripe';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/dashboard/contractor/onboarding/payouts?stripe=return`;
    const refreshUrl = `${origin}/dashboard/contractor/onboarding/payouts?stripe=refresh`;

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true },
    });

    if (!dbUser?.email) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'User email is required for Stripe Connect', 400);
    }

    let contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!contractorProfile) {
      contractorProfile = await db.contractorProfile.create({
        data: {
          userId: user.id,
          services: [],
          serviceAreas: [],
        },
      });
    }

    let connectAccountId = contractorProfile.stripeConnectAccountId ?? undefined;

    if (!connectAccountId) {
      const account = await createConnectedAccount({
        email: dbUser.email,
        businessType: 'company',
        country: 'AU',
      });
      connectAccountId = account.id;

      await db.contractorProfile.update({
        where: { id: contractorProfile.id },
        data: { stripeConnectAccountId: connectAccountId },
      });
    }

    const link = await createAccountLink(connectAccountId, returnUrl, refreshUrl);

    return NextResponse.json({
      success: true,
      url: link.url,
      accountId: connectAccountId,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
