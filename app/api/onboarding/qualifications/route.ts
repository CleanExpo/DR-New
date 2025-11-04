import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { iicrcQualificationSchema } from '@/lib/validation/onboarding';

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate qualification data
    const validatedData = iicrcQualificationSchema.parse(body);

    // Check for duplicate certificate number
    const existingCert = await prisma.contractorCertification.findFirst({
      where: {
        contractorId: user.id,
        certificationNumber: validatedData.certificateNumber
      }
    });

    if (existingCert) {
      return NextResponse.json(
        {
          success: false,
          error: 'This certificate number is already registered'
        },
        { status: 400 }
      );
    }

    // Create certification record
    const certification = await prisma.contractorCertification.create({
      data: {
        contractorId: user.id,
        certificationType: validatedData.qualificationType,
        certificationName: `IICRC ${validatedData.qualificationType}`,
        certificationNumber: validatedData.certificateNumber,
        issuingOrganization: 'IICRC',
        issueDate: validatedData.issueDate,
        expiryDate: validatedData.expiryDate,
        documentUrl: validatedData.fileUrl,
        verified: false,
        status: 'PENDING'
      }
    });

    // Update draft with qualification
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (draft) {
      const draftData = JSON.parse(draft.data);
      const qualifications = draftData.qualifications || [];

      qualifications.push({
        id: certification.id,
        type: validatedData.qualificationType,
        certificateNumber: validatedData.certificateNumber,
        issueDate: validatedData.issueDate,
        expiryDate: validatedData.expiryDate,
        fileUrl: validatedData.fileUrl,
        serviceTypes: validatedData.serviceTypes
      });

      await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify({
            ...draftData,
            qualifications,
            lastUpdated: new Date().toISOString()
          }),
          step: Math.max(draft.step, 4)
        }
      });
    }

    // Update onboarding step
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id }
    });

    if (contractor) {
      await prisma.contractor.update({
        where: { id: user.id },
        data: {
          onboardingStep: Math.max(contractor.onboardingStep, 4)
        }
      });
    }

    // Update progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    if (progress) {
      const metadata = JSON.parse(progress.metadata || '{}');
      await prisma.onboardingProgress.update({
        where: { contractorId: user.id },
        data: {
          currentStep: Math.max(progress.currentStep, 4),
          metadata: JSON.stringify({
            ...metadata,
            steps: {
              ...metadata.steps,
              qualifications: true
            }
          })
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ADD_QUALIFICATION',
        resource: 'CONTRACTOR_CERTIFICATION',
        resourceId: certification.id,
        details: JSON.stringify({
          type: validatedData.qualificationType,
          certificateNumber: validatedData.certificateNumber,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Qualification added successfully',
      data: {
        qualificationId: certification.id,
        nextStep: 5,
        completedStep: 4
      }
    });

  } catch (error) {
    console.error('Qualification upload error:', error);

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

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save qualification'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve qualifications
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const qualifications = await prisma.contractorCertification.findMany({
      where: { contractorId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: qualifications.map(qual => ({
        id: qual.id,
        type: qual.certificationType,
        name: qual.certificationName,
        certificateNumber: qual.certificationNumber,
        issuingOrganization: qual.issuingOrganization,
        issueDate: qual.issueDate,
        expiryDate: qual.expiryDate,
        documentUrl: qual.documentUrl,
        verified: qual.verified,
        status: qual.status,
        verificationNotes: qual.verificationNotes
      }))
    });

  } catch (error) {
    console.error('Get qualifications error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve qualifications'
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove qualification
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const { searchParams } = new URL(request.url);
    const qualificationId = searchParams.get('id');

    if (!qualificationId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Qualification ID is required'
        },
        { status: 400 }
      );
    }

    // Verify ownership
    const qualification = await prisma.contractorCertification.findFirst({
      where: {
        id: qualificationId,
        contractorId: user.id
      }
    });

    if (!qualification) {
      return NextResponse.json(
        {
          success: false,
          error: 'Qualification not found'
        },
        { status: 404 }
      );
    }

    // Delete qualification
    await prisma.contractorCertification.delete({
      where: { id: qualificationId }
    });

    // Update draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (draft) {
      const draftData = JSON.parse(draft.data);
      const qualifications = (draftData.qualifications || []).filter(
        (q: any) => q.id !== qualificationId
      );

      await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify({
            ...draftData,
            qualifications,
            lastUpdated: new Date().toISOString()
          })
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE_QUALIFICATION',
        resource: 'CONTRACTOR_CERTIFICATION',
        resourceId: qualificationId,
        details: JSON.stringify({
          certificateNumber: qualification.certificationNumber,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Qualification removed successfully'
    });

  } catch (error) {
    console.error('Delete qualification error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove qualification'
      },
      { status: 500 }
    );
  }
}