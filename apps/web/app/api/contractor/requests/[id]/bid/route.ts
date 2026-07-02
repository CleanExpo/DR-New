// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode, ConflictError } from '@/lib/api-errors';
import { applyRateLimit } from '@/src/lib/security/rate-limit';
import { bidValidationSchema } from '@/src/lib/validation/bid-validation';
import { isDispatchEligible } from '@/lib/services/dispatch-eligibility';
import { DISPATCH_INELIGIBLE_ERROR } from '@/lib/services/dispatch-eligibility-error';
import { ZodError } from 'zod';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    // Apply rate limiting - 5 bids per 10 minutes per contractor
    const rateLimitResult = await applyRateLimit(
      `bid-submission:${user.id}`,
      5,
      600 // 10 minutes in seconds
    );

    if (!rateLimitResult.success) {
      return createErrorResponse(
        ErrorCode.BID_SUBMISSION_RATE_LIMITED,
        `Too many bid submissions. Please try again in ${Math.ceil(rateLimitResult.resetIn / 60)} minutes.`,
        429
      );
    }

    const body = await request.json();
    const { budget, timeline, message, startDate, estimatedHours } = await bidValidationSchema.parseAsync(body);

    // Get contractor profile
    const contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!contractorProfile) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor profile not found',
        404
      );
    }

    // DR-925: canonical dispatch-eligibility gate (single code path, spec N-04).
    // An ineligible contractor must not be able to bid, regardless of which
    // surface they reach — the pool is gated, and now this direct route is too.
    if (!(await isDispatchEligible(user.id))) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        DISPATCH_INELIGIBLE_ERROR.message,
        403,
        { reason: DISPATCH_INELIGIBLE_ERROR.reason, link: DISPATCH_INELIGIBLE_ERROR.link }
      );
    }

    // Get service request first to validate it exists and is accepting bids
    const serviceRequest = await db.serviceRequest.findUnique({
      where: { id: params.id },
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    if (serviceRequest.status !== 'PENDING') {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'This request is no longer accepting bids',
        400
      );
    }

    try {
      // Try to create a new bid using the unique constraint
      // If a bid already exists for this contractor on this request,
      // this will throw a unique constraint violation
      const newBid = await db.contractorMatch.create({
        data: {
          contractorId: contractorProfile.id,
          serviceRequestId: params.id,
          matchScore: 50, // Default score for manual bidding
          status: 'PENDING',
          contractorMessage: message,
          budget: budget,
          timeline: timeline,
          startDate: startDate,
          estimatedHours: estimatedHours,
        },
      });

      return NextResponse.json({
        success: true,
        bid: newBid,
        message: 'Bid submitted successfully',
      });
    } catch (createError: any) {
      // Check if error is a unique constraint violation (duplicate bid)
      if (createError?.code === 'P2002' && createError?.meta?.target?.includes('contractorId_serviceRequestId')) {
        return createErrorResponse(
          ErrorCode.DUPLICATE_BID,
          'You have already submitted a bid for this request. Update your existing bid instead.',
          409
        );
      }
      throw createError; // Re-throw other errors
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
