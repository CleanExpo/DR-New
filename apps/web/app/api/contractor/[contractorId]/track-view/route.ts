import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { getTenantDb } from '@/lib/get-tenant-db';
import { handleDatabaseError } from '@/lib/api-errors';

/**
 * POST /api/contractor/[contractorId]/track-view
 * Tracks a profile view for analytics purposes
 *
 * This endpoint can be called anonymously (no auth required) to track
 * when potential clients view contractor profiles.
 *
 * Increments:
 * - profileViews (total lifetime views)
 * - profileViewsThisMonth (resets monthly)
 */
export async function POST(request: NextRequest, props: { params: Promise<{ contractorId: string }> }) {
  const params = await props.params;
  try {
    const { contractorId } = params;

    if (!contractorId) {
      return NextResponse.json({
        success: false,
        error: 'Contractor ID is required',
      }, { status: 400 });
    }

    // Get database client (no authentication required for view tracking)
    // Use a default tenant context or extract from request headers
    const tenantId = request.headers.get('x-tenant-id') || null;
    const db = getTenantDb({ tenantId } as any);

    // Check if contractor exists
    const contractor = await db.contractor.findUnique({
      where: { id: contractorId },
      select: {
        id: true,
        profileViews: true,
        profileViewsThisMonth: true,
        lastProfileViewReset: true,
      },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor not found',
      }, { status: 404 });
    }

    // Check if we need to reset monthly views (if it's a new month)
    const now = new Date();
    const lastReset = contractor.lastProfileViewReset
      ? new Date(contractor.lastProfileViewReset)
      : null;

    let shouldResetMonthly = false;
    if (!lastReset) {
      // First time tracking, set reset date
      shouldResetMonthly = false;
    } else {
      // Check if we're in a new month
      const resetMonth = lastReset.getMonth();
      const resetYear = lastReset.getFullYear();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      if (currentYear > resetYear || (currentYear === resetYear && currentMonth > resetMonth)) {
        shouldResetMonthly = true;
      }
    }

    // Update contractor views
    const updatedContractor = await db.contractor.update({
      where: { id: contractorId },
      data: {
        profileViews: { increment: 1 },
        profileViewsThisMonth: shouldResetMonthly ? 1 : { increment: 1 },
        lastProfileViewReset: shouldResetMonthly ? now : contractor.lastProfileViewReset,
      },
      select: {
        profileViews: true,
        profileViewsThisMonth: true,
      },
    });

    // Optional: Log the view for detailed analytics (IP, user agent, referrer)
    // This would require a separate ProfileView table for granular tracking
    // For now, we just increment the counters

    return NextResponse.json({
      success: true,
      message: 'Profile view tracked',
      views: {
        total: updatedContractor.profileViews,
        thisMonth: updatedContractor.profileViewsThisMonth,
      },
    });
  } catch (error) {
    console.error('Profile view tracking error:', error);
    return handleDatabaseError(error);
  }
}
