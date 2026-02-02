import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError, z } from 'zod';
import {
  sendVerificationApprovedEmail,
  sendVerificationRejectedEmail,
  sendVerificationChangesRequestedEmail,
  sendVerificationUnderReviewEmail,
} from '@/lib/email/contractor-verification';

// Validation schema for verification action
const verificationActionSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT', 'REQUEST_CHANGES', 'MARK_UNDER_REVIEW']),
  notes: z.string().min(10).max(2000).optional(),
  rejectionReason: z.string().min(10).max(500).optional(),
});

/**
 * POST /api/admin/contractors/verification/[contractorId]
 * Approve or reject contractor verification (admin only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  try {
    const { contractorId } = params;

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is admin
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Parse and validate request body
    const body = await request.json();
    const validatedData = verificationActionSchema.parse(body);

    // Fetch contractor
    const contractor = await db.contractor.findUnique({
      where: { id: contractorId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor not found',
      }, { status: 404 });
    }

    // Determine new status based on action
    let newStatus: string;
    let isVerified = false;

    switch (validatedData.action) {
      case 'APPROVE':
        newStatus = 'APPROVED';
        isVerified = true;
        break;
      case 'REJECT':
        if (!validatedData.rejectionReason) {
          return NextResponse.json({
            success: false,
            error: 'Rejection reason is required when rejecting',
          }, { status: 400 });
        }
        newStatus = 'REJECTED';
        break;
      case 'REQUEST_CHANGES':
        newStatus = 'INCOMPLETE';
        break;
      case 'MARK_UNDER_REVIEW':
        newStatus = 'UNDER_REVIEW';
        break;
      default:
        newStatus = contractor.verificationStatus;
    }

    // Update contractor in a transaction
    const updatedContractor = await db.$transaction(async (tx: any) => {
      // Update contractor status
      const updated = await tx.contractor.update({
        where: { id: contractorId },
        data: {
          verificationStatus: newStatus,
          isVerified,
          reviewedAt: new Date(),
          reviewedBy: user.id,
          rejectionReason: validatedData.action === 'REJECT' ? validatedData.rejectionReason : null,
          verificationNotes: validatedData.notes || null,
          ...(validatedData.action === 'APPROVE' && {
            verificationDate: new Date(),
            nrpgVerifiedAt: new Date(),
          }),
        },
      });

      // Create verification history entry
      await tx.contractorVerificationHistory.create({
        data: {
          contractorId,
          action: validatedData.action,
          previousStatus: contractor.verificationStatus,
          newStatus,
          reason: validatedData.rejectionReason || null,
          notes: validatedData.notes || null,
          performedBy: user.id,
          performedByName: user.name || user.email,
          isSystemAction: false,
        },
      });

      return updated;
    });

    // Send email notification to contractor
    const contractorName = contractor.user.name || 'Contractor';
    const businessName = contractor.businessName;
    const contractorEmail = contractor.user.email;

    try {
      switch (validatedData.action) {
        case 'APPROVE':
          await sendVerificationApprovedEmail(
            contractorEmail,
            contractorName,
            businessName,
            contractor.nrpgMemberId || undefined
          );
          break;

        case 'REJECT':
          if (validatedData.rejectionReason) {
            await sendVerificationRejectedEmail(
              contractorEmail,
              contractorName,
              businessName,
              validatedData.rejectionReason
            );
          }
          break;

        case 'REQUEST_CHANGES':
          if (validatedData.notes) {
            await sendVerificationChangesRequestedEmail(
              contractorEmail,
              contractorName,
              businessName,
              validatedData.notes
            );
          }
          break;

        case 'MARK_UNDER_REVIEW':
          await sendVerificationUnderReviewEmail(
            contractorEmail,
            contractorName,
            businessName
          );
          break;
      }

      console.log(`✉️ Verification email sent to ${contractorEmail} for action: ${validatedData.action}`);
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send verification email:', emailError);
      // Continue with successful response even if email fails
    }

    return NextResponse.json({
      success: true,
      contractor: updatedContractor,
      message: `Contractor ${validatedData.action.toLowerCase()}d successfully`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * GET /api/admin/contractors/verification/[contractorId]
 * Get detailed contractor verification information (admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  try {
    const { contractorId } = params;

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is admin
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Fetch comprehensive contractor data
    const contractor = await db.contractor.findUnique({
      where: { id: contractorId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
            lastLogin: true,
          },
        },
        documents: {
          orderBy: {
            uploadedAt: 'desc',
          },
        },
        serviceAreas: {
          orderBy: {
            postcode: 'asc',
          },
        },
        certifications: {
          where: {
            isActive: true,
          },
          orderBy: {
            issueDate: 'desc',
          },
        },
        verificationHistory: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        bookings: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            completedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        ratings: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor not found',
      }, { status: 404 });
    }

    // Calculate profile completeness
    const requiredFields = [
      'businessName',
      'abnNumber',
      'primaryPostcode',
      'primaryState',
      'publicLiabilityPolicyNumber',
      'companyDescription',
      'yearsInBusiness',
    ];

    const completedFields = requiredFields.filter(field => contractor[field as keyof typeof contractor]);
    const profileCompleteness = Math.round((completedFields.length / requiredFields.length) * 100);

    // Check required documents
    const requiredDocumentTypes = [
      'BUSINESS_LICENSE',
      'PUBLIC_LIABILITY_INSURANCE',
      'IICRC_CERTIFICATE',
    ];

    const uploadedDocumentTypes = contractor.documents.map((doc: any) => doc.documentType);
    const missingDocuments = requiredDocumentTypes.filter(type => !uploadedDocumentTypes.includes(type));

    return NextResponse.json({
      success: true,
      contractor,
      analysis: {
        profileCompleteness,
        requiredDocuments: requiredDocumentTypes.length,
        uploadedDocuments: contractor.documents.length,
        missingDocuments,
        serviceAreaCount: contractor.serviceAreas?.length || 0,
        certificationCount: contractor.certifications?.length || 0,
        totalBookings: contractor.bookings?.length || 0,
        averageRating: contractor.averageRating,
        resubmissionCount: contractor.resubmissionCount || 0,
      },
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}
