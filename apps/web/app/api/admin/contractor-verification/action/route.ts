import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import {
  sendVerificationApprovedEmail,
  sendVerificationRejectedEmail,
  sendRequestMoreInfoEmail,
} from '@/lib/services/email.service';
import { logContractorVerification } from '@/lib/services/audit.service';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const verificationActionSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
  action: z.enum(['approve', 'reject', 'request-info']),
  reason: z.string().optional(),
});

/**
 * POST /api/admin/contractor-verification/action
 * Approve, reject, or request more info for contractor verification
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate and check admin role
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = verificationActionSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Invalid request data',
        400,
        validation.error.errors
      );
    }

    const { contractorId, action, reason } = validation.data;

    // Fetch contractor
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        user: true,
        iicrcCertifications: true,
      },
    });

    if (!contractor) {
      return createErrorResponse(ErrorCode.NOT_FOUND, 'Contractor not found', 404);
    }

    // Perform action
    switch (action) {
      case 'approve':
        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            nrpgVerificationLevel: 'VERIFIED',
            nrpgVerifiedAt: new Date(),
            isVerified: true,
            verificationDate: new Date(),
          },
        });

        // Create audit trail
        await logContractorVerification(
          request,
          user.id,
          contractorId,
          'CONTRACTOR_APPROVED',
          reason || 'Approved by admin',
          { businessName: contractor.businessName }
        );

        // Send approval email notification
        await sendVerificationApprovedEmail({
          businessName: contractor.businessName,
          contractorEmail: contractor.user.email,
          nrpgMemberId: contractor.nrpgMemberId || undefined,
          reason,
        }).catch((err) => {
          console.error('Failed to send approval email:', err);
        });

        return NextResponse.json({
          success: true,
          message: 'Contractor approved successfully',
          contractorId,
        });

      case 'reject':
        if (!reason || reason.trim().length === 0) {
          return createErrorResponse(
            ErrorCode.VALIDATION_ERROR,
            'Rejection reason is required',
            400
          );
        }

        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            nrpgVerificationLevel: 'REJECTED',
            isVerified: false,
          },
        });

        // Create audit trail
        await logContractorVerification(
          request,
          user.id,
          contractorId,
          'CONTRACTOR_REJECTED',
          reason,
          { businessName: contractor.businessName }
        );

        // Send rejection email notification
        await sendVerificationRejectedEmail({
          businessName: contractor.businessName,
          contractorEmail: contractor.user.email,
          nrpgMemberId: contractor.nrpgMemberId || undefined,
          reason,
        }).catch((err) => {
          console.error('Failed to send rejection email:', err);
        });

        return NextResponse.json({
          success: true,
          message: 'Contractor rejected',
          contractorId,
        });

      case 'request-info':
        if (!reason || reason.trim().length === 0) {
          return createErrorResponse(
            ErrorCode.VALIDATION_ERROR,
            'Please specify what information is needed',
            400
          );
        }

        await prisma.contractor.update({
          where: { id: contractorId },
          data: {
            nrpgVerificationLevel: 'PENDING_INFO',
          },
        });

        // Create audit trail
        await logContractorVerification(
          request,
          user.id,
          contractorId,
          'CONTRACTOR_INFO_REQUESTED',
          reason,
          { businessName: contractor.businessName }
        );

        // Send info request email notification
        await sendRequestMoreInfoEmail({
          businessName: contractor.businessName,
          contractorEmail: contractor.user.email,
          nrpgMemberId: contractor.nrpgMemberId || undefined,
          infoNeeded: reason,
        }).catch((err) => {
          console.error('Failed to send info request email:', err);
        });

        return NextResponse.json({
          success: true,
          message: 'Information request sent to contractor',
          contractorId,
        });

      default:
        return createErrorResponse(ErrorCode.VALIDATION_ERROR, 'Invalid action', 400);
    }
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
