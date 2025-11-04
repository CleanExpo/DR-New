import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { adminVerificationSchema } from '@/lib/validation/onboarding';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication and require ADMIN role
    const authResult = await withAuth(request, 'ADMIN');
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const admin = authResult;

    const contractorId = params.id;
    const body = await request.json();

    // Validate verification data
    const validatedData = adminVerificationSchema.parse(body);

    // Get contractor
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        companyProfile: true,
        certifications: true,
        insurance: true,
        subscription: true
      }
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor not found'
        },
        { status: 404 }
      );
    }

    if (validatedData.approved) {
      // Approve contractor
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          status: 'APPROVED',
          onboardingCompleted: true,
          approvedAt: new Date()
        }
      });

      // Verify all pending certifications
      await prisma.contractorCertification.updateMany({
        where: {
          contractorId,
          status: 'PENDING'
        },
        data: {
          verified: true,
          verifiedAt: new Date(),
          verifiedBy: admin.id,
          status: 'VERIFIED'
        }
      });

      // Verify all pending insurance
      await prisma.contractorInsurance.updateMany({
        where: {
          contractorId,
          status: 'PENDING'
        },
        data: {
          verified: true,
          verifiedAt: new Date(),
          verifiedBy: admin.id,
          status: 'ACTIVE'
        }
      });

      // Activate subscription (pending payment)
      if (contractor.subscription) {
        await prisma.contractorSubscription.update({
          where: { contractorId },
          data: {
            status: 'ACTIVE', // Will be PENDING until payment
            startDate: new Date()
          }
        });
      }

      // Update onboarding progress
      await prisma.onboardingProgress.update({
        where: { contractorId },
        data: {
          completed: true,
          completedAt: new Date()
        }
      }).catch(() => {
        // Progress record might not exist
      });

      // Create notification for contractor
      await prisma.contractorNotification.create({
        data: {
          contractorId,
          type: 'SYSTEM',
          priority: 'HIGH',
          subject: 'Application Approved!',
          message: `Congratulations! Your NRPG contractor application has been approved. You can now proceed with payment to activate your account.`,
          actionRequired: true,
          actionUrl: '/onboarding/payment'
        }
      });

      // Create audit log
      await prisma.contractorAuditLog.create({
        data: {
          contractorId,
          action: 'APPLICATION_APPROVED',
          category: 'COMPLIANCE',
          details: JSON.stringify({
            approvedBy: admin.id,
            approverEmail: admin.email,
            notes: validatedData.notes,
            timestamp: new Date().toISOString()
          }),
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
          userAgent: request.headers.get('user-agent') || '',
          performedBy: admin.id,
          performedByType: 'ADMIN'
        }
      });

      // TODO: Send approval email
      // await sendApprovalEmail(contractor.email, contractor.companyProfile?.companyName);

    } else {
      // Reject contractor
      await prisma.contractor.update({
        where: { id: contractorId },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectionReason: validatedData.rejectionReason
        }
      });

      // Create notification for contractor
      await prisma.contractorNotification.create({
        data: {
          contractorId,
          type: 'SYSTEM',
          priority: 'HIGH',
          subject: 'Application Review Feedback',
          message: `Your NRPG contractor application requires additional information or corrections. Please review the feedback and submit a new application.\n\nFeedback: ${validatedData.rejectionReason}`,
          actionRequired: true,
          actionUrl: '/onboarding'
        }
      });

      // Create audit log
      await prisma.contractorAuditLog.create({
        data: {
          contractorId,
          action: 'APPLICATION_REJECTED',
          category: 'COMPLIANCE',
          details: JSON.stringify({
            rejectedBy: admin.id,
            rejectorEmail: admin.email,
            reason: validatedData.rejectionReason,
            notes: validatedData.notes,
            timestamp: new Date().toISOString()
          }),
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
          userAgent: request.headers.get('user-agent') || '',
          performedBy: admin.id,
          performedByType: 'ADMIN'
        }
      });

      // TODO: Send rejection email
      // await sendRejectionEmail(contractor.email, validatedData.rejectionReason);
    }

    // Create system audit log
    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: validatedData.approved ? 'APPROVE_CONTRACTOR' : 'REJECT_CONTRACTOR',
        resource: 'CONTRACTOR',
        resourceId: contractorId,
        details: JSON.stringify({
          contractorEmail: contractor.email,
          companyName: contractor.companyProfile?.companyName,
          approved: validatedData.approved,
          reason: validatedData.rejectionReason,
          notes: validatedData.notes
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: validatedData.approved
        ? 'Contractor application approved successfully'
        : 'Contractor application rejected',
      data: {
        contractorId,
        status: validatedData.approved ? 'APPROVED' : 'REJECTED',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Verification error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      );
    }

    await prisma.errorLog.create({
      data: {
        level: 'error',
        message: 'Failed to verify contractor',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          contractorId: params.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'POST /api/admin/onboarding/[id]/verify',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process verification'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve contractor details for review
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication and require ADMIN role
    const authResult = await withAuth(request, 'ADMIN');
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const contractorId = params.id;

    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        companyProfile: true,
        certifications: true,
        insurance: true,
        references: true,
        backgroundChecks: true,
        subscription: true,
        territories: true,
        projects: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        auditLogs: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contractor
    });

  } catch (error) {
    console.error('Get contractor details error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve contractor details'
      },
      { status: 500 }
    );
  }
}