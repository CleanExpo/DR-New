// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError, z } from 'zod';
import { sendVerificationSubmittedEmail } from '@/lib/email/contractor-verification';
import { sendNewContractorApplicationSlackAlert } from '@/lib/monitoring/slack-alerts';
import { sendNewContractorApplicationEmailAlert } from '@/lib/monitoring/email-alerts';

// Validation schema for contractor verification profile updates
const contractorVerificationUpdateSchema = z.object({
  // Company Profile
  companyLogoUrl: z.string().url().optional().nullable(),
  companyDescription: z.string().min(50).max(2000).optional().nullable(),
  yearsInBusiness: z.number().int().min(0).optional().nullable(),
  teamSize: z.number().int().min(1).optional().nullable(),
  serviceRadius: z.number().int().min(1).max(500).optional().nullable(),
  emergencyAvailable: z.boolean().optional(),
  emergencyResponseTime: z.number().int().min(1).optional().nullable(),

  // License Information
  licenseNumber: z.string().min(3).max(50).optional().nullable(),
  licenseState: z.string().optional().nullable(),
  licenseExpiry: z.date().optional().nullable(),

  // Business Registration
  abnNumber: z.string().min(9).max(14).optional().nullable(),
  acnNumber: z.string().min(9).max(11).optional().nullable(),
});

/**
 * GET /api/contractor/verification/profile
 * Retrieves contractor verification profile for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor profile with related data
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      include: {
        documents: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        verificationHistory: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        serviceAreas: {
          where: { isActive: true },
          orderBy: { isPrimaryArea: 'desc' },
        },
        iicrcCertifications: {
          where: { isActive: true },
          orderBy: { expiryDate: 'asc' },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      contractor,
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * PUT /api/contractor/verification/profile
 * Updates contractor verification profile
 */
export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contractorVerificationUpdateSchema.parse(body);

    // Check if contractor exists
    const existingContractor = await db.contractor.findUnique({
      where: { userId: user.id },
    });

    if (!existingContractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found. Please complete initial setup first.',
      }, { status: 404 });
    }

    // Check if profile was complete before update
    const wasComplete = isProfileComplete(existingContractor);

    // Update contractor profile
    const updatedContractor = await db.contractor.update({
      where: { userId: user.id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    // Check if profile is now complete
    const isNowComplete = isProfileComplete(updatedContractor);

    // If profile just became complete, update verification status to SUBMITTED
    if (!wasComplete && isNowComplete && updatedContractor.verificationStatus === 'PENDING') {
      await db.contractor.update({
        where: { userId: user.id },
        data: {
          verificationStatus: 'SUBMITTED',
          submittedForVerificationAt: new Date(),
        },
      });

      // Create verification history entry
      await db.contractorVerificationHistory.create({
        data: {
          contractorId: updatedContractor.id,
          action: 'SUBMITTED',
          previousStatus: 'PENDING',
          newStatus: 'SUBMITTED',
          notes: 'Profile completed and submitted for verification',
          performedBy: user.id,
          performedByName: user.name,
          isSystemAction: true,
        },
      });

      // Send verification submitted email
      try {
        await sendVerificationSubmittedEmail(
          user.email,
          user.name || 'Contractor',
          updatedContractor.businessName
        );
        console.log(`✉️ Verification submitted email sent to ${user.email}`);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Failed to send verification submitted email:', emailError);
      }

      // Send admin alerts (Slack + Email) for new contractor application
      try {
        // Get service areas for alert
        const serviceAreas = await db.contractorServiceArea.findMany({
          where: { contractorId: updatedContractor.id, isActive: true },
          select: { postcode: true, suburb: true, state: true },
          take: 5,
        });

        const serviceAreasList = serviceAreas.map(sa => `${sa.suburb || 'Unknown'}, ${sa.state}`);

        // Send Slack alert
        sendNewContractorApplicationSlackAlert({
          contractorName: user.name || 'Contractor',
          businessName: updatedContractor.businessName,
          serviceAreas: serviceAreasList,
          contractorId: updatedContractor.id,
        }).catch((error) => {
          console.error('Failed to send Slack alert for new contractor:', error);
        });

        // Send admin email alert
        sendNewContractorApplicationEmailAlert({
          contractorName: user.name || 'Contractor',
          businessName: updatedContractor.businessName,
          email: user.email,
          phone: user.phone || undefined,
          serviceAreas: serviceAreasList,
          abnNumber: updatedContractor.abnNumber || undefined,
          contractorId: updatedContractor.id,
        }).catch((error) => {
          console.error('Failed to send admin email alert for new contractor:', error);
        });
      } catch (alertError) {
        console.error('Failed to send contractor application alerts:', alertError);
      }
    }

    return NextResponse.json({
      success: true,
      contractor: updatedContractor,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * Helper function to determine if contractor profile is complete
 */
function isProfileComplete(contractor: any): boolean {
  return !!(
    contractor.abnNumber &&
    contractor.businessName &&
    contractor.companyDescription &&
    contractor.licenseNumber &&
    contractor.licenseState &&
    contractor.licenseExpiry &&
    contractor.serviceRadius
  );
}
