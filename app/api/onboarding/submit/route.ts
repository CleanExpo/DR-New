import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { onboardingSubmissionSchema } from '@/lib/validation/onboarding';

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate submission data
    const validatedData = onboardingSubmissionSchema.parse(body);

    // Get contractor profile with all related data
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id },
      include: {
        companyProfile: true
      }
    });

    if (!contractor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contractor profile not found'
        },
        { status: 404 }
      );
    }

    // Validate all required data is present
    const validationErrors: string[] = [];

    // Check business details
    if (!contractor.companyProfile) {
      validationErrors.push('Business details are incomplete');
    } else {
      if (!contractor.companyProfile.companyName || !contractor.companyProfile.abn) {
        validationErrors.push('Business name and ABN are required');
      }
    }

    // Check qualifications
    const qualifications = await prisma.contractorCertification.count({
      where: { contractorId: user.id }
    });

    if (qualifications === 0) {
      validationErrors.push('At least one IICRC qualification is required');
    }

    // Check insurance
    const insurancePolicies = await prisma.contractorInsurance.findMany({
      where: { contractorId: user.id }
    });

    const hasPublicLiability = insurancePolicies.some(i => i.insuranceType === 'PUBLIC_LIABILITY');
    const hasWorkersComp = insurancePolicies.some(i => i.insuranceType === 'WORKERS_COMPENSATION');

    if (!hasPublicLiability) {
      validationErrors.push('Public liability insurance is required (minimum $10 million)');
    }
    if (!hasWorkersComp) {
      validationErrors.push('Workers compensation insurance is required');
    }

    // Check coverage area
    const territory = await prisma.contractorTerritory.findFirst({
      where: { contractorId: user.id }
    });

    if (!territory) {
      validationErrors.push('Coverage area must be configured');
    }

    // Check subscription
    const subscription = await prisma.contractorSubscription.findUnique({
      where: { contractorId: user.id }
    });

    if (!subscription) {
      validationErrors.push('Subscription tier must be selected');
    }

    // If there are validation errors, return them
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Application incomplete',
          details: validationErrors
        },
        { status: 400 }
      );
    }

    // Update contractor status to UNDER_REVIEW
    await prisma.contractor.update({
      where: { id: user.id },
      data: {
        status: 'UNDER_REVIEW',
        onboardingStep: 7,
        onboardingCompleted: false, // Will be true after approval
      }
    });

    // Update onboarding progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    if (progress) {
      await prisma.onboardingProgress.update({
        where: { contractorId: user.id },
        data: {
          currentStep: 7,
          completedAt: new Date(),
          metadata: JSON.stringify({
            steps: {
              account: true,
              business: true,
              services: true,
              qualifications: true,
              insurance: true,
              coverage: true,
              review: true
            },
            submittedAt: new Date().toISOString(),
            confirmAccuracy: validatedData.confirmAccuracy,
            confirmDocuments: validatedData.confirmDocuments,
            paymentMethodSelected: validatedData.paymentMethodSelected
          })
        }
      });
    }

    // Create contractor audit log for submission
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: user.id,
        action: 'ONBOARDING_SUBMITTED',
        category: 'PROFILE',
        details: JSON.stringify({
          businessName: contractor.companyProfile?.companyName,
          abn: contractor.companyProfile?.abn,
          qualificationCount: qualifications,
          insuranceCount: insurancePolicies.length,
          subscriptionTier: subscription?.tier,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        performedBy: user.id,
        performedByType: 'CONTRACTOR'
      }
    });

    // Create notification for contractor
    await prisma.contractorNotification.create({
      data: {
        contractorId: user.id,
        type: 'SYSTEM',
        priority: 'HIGH',
        subject: 'Application Submitted Successfully',
        message: 'Your NRPG contractor application has been submitted and is under review. You will be notified within 24-48 hours about the status of your application.',
        actionRequired: false
      }
    });

    // Create notification for admins
    await prisma.contractorNotification.create({
      data: {
        contractorId: user.id,
        type: 'SYSTEM',
        priority: 'HIGH',
        subject: 'New Contractor Application',
        message: `New contractor application received from ${contractor.companyProfile?.companyName} (${contractor.email})`,
        actionRequired: true,
        actionUrl: `/admin/contractors/${user.id}/review`
      }
    });

    // TODO: Send email notifications
    // await sendContractorSubmissionEmail(contractor.email);
    // await sendAdminNotificationEmail('New contractor application');

    return NextResponse.json({
      success: true,
      message: 'Your application has been submitted successfully. You will hear from us within 24-48 hours.',
      data: {
        status: 'UNDER_REVIEW',
        submittedAt: new Date().toISOString(),
        estimatedReviewTime: '24-48 hours',
        nextSteps: [
          'Your application is being reviewed by our team',
          'We will verify your IICRC certifications',
          'We will confirm your insurance coverage',
          'Once approved, you will receive payment instructions',
          'After payment, your account will be activated'
        ]
      }
    });

  } catch (error) {
    console.error('Submission error:', error);

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
        message: 'Failed to submit onboarding application',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          userId: user?.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'POST /api/onboarding/submit',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit application. Please try again.'
      },
      { status: 500 }
    );
  }
}