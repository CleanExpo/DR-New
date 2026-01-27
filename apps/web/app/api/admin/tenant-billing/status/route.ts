/**
 * GET /api/admin/tenant-billing/status
 *
 * Get current tenant subscription status and features.
 * Only accessible to ADMIN and SUPER_ADMIN users.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { ErrorCode } from '@/lib/api-errors';
import { getTenantSubscription } from '@/lib/stripe/tenant-subscription';
import { getTenantFeatures, getTierPricingInfo } from '@/lib/tenant-features';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Authenticate request
  const authResult = await authenticateRequest(request);
  if (!authResult.success) {
    return authResult.response;
  }

  const { user, tenantId } = authResult.context;

  // Only ADMIN and SUPER_ADMIN can view tenant billing
  if (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
    return NextResponse.json(
      {
        error: ErrorCode.FORBIDDEN,
        message: 'Only administrators can view tenant billing',
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
      select: {
        id: true,
        name: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        subscriptionTier: true,
        subscriptionStatus: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        trialEndsAt: true,
        seatLimit: true,
        monthlyRequestLimit: true,
      },
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

    // Get current usage (count active users)
    const userCount = await prisma.user.count({
      where: {
        tenantId,
        isActive: true,
      },
    });

    // Get monthly request count (from current month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyRequests = await prisma.serviceRequest.count({
      where: {
        tenantId,
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get features for current tier
    const features = getTenantFeatures(tenant.subscriptionTier);
    const pricingInfo = getTierPricingInfo(tenant.subscriptionTier);

    // Get Stripe subscription details if available
    let stripeSubscription = null;
    if (tenant.stripeSubscriptionId) {
      try {
        stripeSubscription = await getTenantSubscription(tenant.stripeSubscriptionId);
      } catch (error) {
        console.error('[Tenant Billing] Failed to fetch Stripe subscription:', error);
        // Continue without Stripe data
      }
    }

    return NextResponse.json({
      tenant: {
        id: tenant.id,
        name: tenant.name,
        tier: tenant.subscriptionTier,
        status: tenant.subscriptionStatus,
        currentPeriodStart: tenant.currentPeriodStart,
        currentPeriodEnd: tenant.currentPeriodEnd,
        trialEndsAt: tenant.trialEndsAt,
      },
      usage: {
        users: {
          current: userCount,
          limit: features.maxUsers,
          percentage: features.maxUsers > 0 ? Math.round((userCount / features.maxUsers) * 100) : 0,
        },
        requests: {
          current: monthlyRequests,
          limit: features.maxMonthlyRequests,
          percentage:
            features.maxMonthlyRequests > 0
              ? Math.round((monthlyRequests / features.maxMonthlyRequests) * 100)
              : 0,
        },
      },
      features,
      pricing: pricingInfo,
      stripe: stripeSubscription
        ? {
            id: stripeSubscription.id,
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            canceledAt: stripeSubscription.canceled_at
              ? new Date(stripeSubscription.canceled_at * 1000)
              : null,
          }
        : null,
    });
  } catch (error) {
    console.error('[Tenant Billing] Status retrieval failed:', error);

    return NextResponse.json(
      {
        error: ErrorCode.INTERNAL_ERROR,
        message: error instanceof Error ? error.message : 'Failed to retrieve billing status',
      },
      { status: 500 }
    );
  }
}
