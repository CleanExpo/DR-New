import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode, ConflictError } from '@/lib/api-errors';
import { applyRateLimit } from '@/src/lib/security/rate-limit';
import { z, ZodError } from 'zod';

const bidSchema = z.object({
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(1).max(5000),
  startDate: z.string().optional(),
  estimatedHours: z.string().optional(),
});

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
    const { budget, timeline, message, startDate, estimatedHours } = bidSchema.parse(body);

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!contractorProfile) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor profile not found',
        404
      );
    }

    // Get service request first to validate it exists and is accepting bids
    const serviceRequest = await prisma.serviceRequest.findUnique({
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
      const newBid = await prisma.contractorMatch.create({
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
