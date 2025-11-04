import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    // Get contractor with all related data
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id },
      include: {
        companyProfile: true,
        certifications: {
          select: {
            id: true,
            certificationType: true,
            status: true,
            verified: true
          }
        },
        insurance: {
          select: {
            id: true,
            insuranceType: true,
            status: true,
            verified: true,
            expiryDate: true
          }
        },
        subscription: {
          select: {
            tier: true,
            status: true,
            amount: true,
            billingFrequency: true
          }
        },
        territories: {
          where: { active: true },
          select: {
            id: true,
            type: true,
            radiusKm: true
          }
        }
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

    // Get onboarding progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    // Calculate completion status
    const hasBusinessDetails = !!contractor.companyProfile?.companyName && !!contractor.companyProfile?.abn;
    const hasQualifications = contractor.certifications.length > 0;
    const hasPublicLiability = contractor.insurance.some(i => i.insuranceType === 'PUBLIC_LIABILITY');
    const hasWorkersComp = contractor.insurance.some(i => i.insuranceType === 'WORKERS_COMPENSATION');
    const hasInsurance = hasPublicLiability && hasWorkersComp;
    const hasCoverage = contractor.territories.length > 0;
    const hasSubscription = !!contractor.subscription;

    // Determine which steps are complete
    const stepsProgress = {
      account: true, // If we got here, account exists
      business: hasBusinessDetails,
      services: true, // Simplified check - would normally check draft
      qualifications: hasQualifications,
      insurance: hasInsurance,
      coverage: hasCoverage && hasSubscription,
      submitted: contractor.status !== 'PENDING',
      verified: contractor.status === 'APPROVED',
    };

    // Calculate completion percentage
    const totalSteps = Object.keys(stepsProgress).length - 1; // Exclude 'verified' from progress
    const completedSteps = Object.values(stepsProgress).slice(0, -1).filter(Boolean).length;
    const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

    // Get pending items
    const pendingItems: string[] = [];
    if (!hasBusinessDetails) pendingItems.push('Complete business details');
    if (!hasQualifications) pendingItems.push('Upload IICRC qualifications');
    if (!hasPublicLiability) pendingItems.push('Upload public liability insurance');
    if (!hasWorkersComp) pendingItems.push('Upload workers compensation insurance');
    if (!hasCoverage) pendingItems.push('Configure coverage area');
    if (!hasSubscription) pendingItems.push('Select subscription tier');

    // Get expiring documents
    const expiringDocuments: any[] = [];
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    contractor.certifications.forEach(cert => {
      // Check if certification has expiry date (would need to add to schema)
      // For now, we'll skip this check
    });

    contractor.insurance.forEach(insurance => {
      if (insurance.expiryDate && insurance.expiryDate <= thirtyDaysFromNow) {
        expiringDocuments.push({
          type: 'insurance',
          name: insurance.insuranceType,
          expiryDate: insurance.expiryDate
        });
      }
    });

    // Compile full status response
    return NextResponse.json({
      success: true,
      data: {
        // Basic status
        contractorId: contractor.id,
        email: contractor.email,
        status: contractor.status,
        onboardingStep: contractor.onboardingStep,
        onboardingCompleted: contractor.onboardingCompleted,

        // Progress tracking
        progress: stepsProgress,
        completionPercentage,
        currentStep: progress?.currentStep || contractor.onboardingStep,
        totalSteps: progress?.totalSteps || 7,

        // Detailed status
        businessDetails: {
          complete: hasBusinessDetails,
          companyName: contractor.companyProfile?.companyName,
          abn: contractor.companyProfile?.abn,
          abnVerified: contractor.companyProfile?.abnVerified
        },

        qualifications: {
          complete: hasQualifications,
          count: contractor.certifications.length,
          verified: contractor.certifications.filter(c => c.verified).length,
          pending: contractor.certifications.filter(c => c.status === 'PENDING').length
        },

        insurance: {
          complete: hasInsurance,
          hasPublicLiability,
          hasWorkersComp,
          totalPolicies: contractor.insurance.length,
          verified: contractor.insurance.filter(i => i.verified).length,
          expiringSoon: expiringDocuments.filter(d => d.type === 'insurance').length
        },

        coverage: {
          complete: hasCoverage,
          radius: contractor.territories[0]?.radiusKm,
          territories: contractor.territories.length
        },

        subscription: {
          complete: hasSubscription,
          tier: contractor.subscription?.tier,
          amount: contractor.subscription?.amount,
          billingFrequency: contractor.subscription?.billingFrequency,
          status: contractor.subscription?.status
        },

        // Action items
        pendingItems,
        expiringDocuments,

        // Status messages
        statusMessage: getStatusMessage(contractor.status),
        nextAction: getNextAction(contractor.status, stepsProgress),

        // Timestamps
        createdAt: contractor.createdAt,
        updatedAt: contractor.updatedAt,
        approvedAt: contractor.approvedAt,
        rejectedAt: contractor.rejectedAt,
        rejectionReason: contractor.rejectionReason
      }
    });

  } catch (error) {
    console.error('Get status error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve onboarding status'
      },
      { status: 500 }
    );
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Your application is being prepared. Please complete all required steps.';
    case 'UNDER_REVIEW':
      return 'Your application is under review. We will notify you within 24-48 hours.';
    case 'APPROVED':
      return 'Congratulations! Your application has been approved.';
    case 'SUSPENDED':
      return 'Your account has been temporarily suspended. Please contact support.';
    case 'REJECTED':
      return 'Your application was not approved. Please review the feedback and reapply.';
    default:
      return 'Unknown status';
  }
}

function getNextAction(status: string, progress: any): string {
  if (status === 'APPROVED') {
    return 'Your account is active. Start accepting jobs!';
  }

  if (status === 'UNDER_REVIEW') {
    return 'Wait for review completion. You will be notified via email.';
  }

  if (status === 'REJECTED') {
    return 'Review rejection feedback and prepare a new application.';
  }

  if (status === 'SUSPENDED') {
    return 'Contact support to resolve suspension issues.';
  }

  // For PENDING status, find the next incomplete step
  if (!progress.business) return 'Complete your business details';
  if (!progress.qualifications) return 'Upload your IICRC qualifications';
  if (!progress.insurance) return 'Upload insurance documents';
  if (!progress.coverage) return 'Configure your coverage area';
  if (!progress.submitted) return 'Review and submit your application';

  return 'Complete remaining onboarding steps';
}