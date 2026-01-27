/**
 * GET /api/admin/tenant-billing/portal
 *
 * Create a Stripe billing portal session for tenant.
 * Allows admin to manage subscription, payment methods, and invoices.
 * Only accessible to ADMIN and SUPER_ADMIN users.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { ErrorCode } from '@/lib/api-errors';
import { createTenantPortalSession } from '@/lib/stripe/tenant-subscription';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Authenticate request
  const authResult = await authenticateRequest(request);
  if (!authResult.success) {
    return authResult.response;
  }

  const { user, tenantId } = authResult.context;

  // Only ADMIN and SUPER_ADMIN can manage tenant billing
  if (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
    return NextResponse.json(
      {
        error: ErrorCode.FORBIDDEN,
        message: 'Only administrators can manage tenant billing',
      },
      { status: 403 }
    );
  }

  // Validate tenant exists
  if (!tenantId) {
    return NextResponse.json(
      {
        error: ErrorCode.FORBIDDEN,
        message: 'No tenant associated with this account',
      },
      { status: 403 }
    );
  }

  try {
    // Fetch tenant details
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      return NextResponse.json(
        {
          error: ErrorCode.NOT_FOUND,
          message: 'Tenant not found',
        },
        { status: 404 }
      );
    }

    // Check if tenant has a Stripe customer ID
    if (!tenant.stripeCustomerId) {
      return NextResponse.json(
        {
          error: ErrorCode.BAD_REQUEST,
          message: 'No billing account found. Please create a subscription first.',
        },
        { status: 400 }
      );
    }

    // Create billing portal session
    const session = await createTenantPortalSession(tenant.stripeCustomerId, tenantId);

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error('[Tenant Billing] Portal session creation failed:', error);

    return NextResponse.json(
      {
        error: ErrorCode.INTERNAL_ERROR,
        message: error instanceof Error ? error.message : 'Failed to create portal session',
      },
      { status: 500 }
    );
  }
}
