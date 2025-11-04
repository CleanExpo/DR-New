import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { insuranceSchema, INSURANCE_REQUIREMENTS } from '@/lib/validation/onboarding';

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate insurance data
    const validatedData = insuranceSchema.parse(body);

    // Additional validation for public liability minimum
    if (validatedData.type === 'PUBLIC_LIABILITY' && validatedData.coverageAmount < 10000000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Public liability insurance must have minimum coverage of $10 million'
        },
        { status: 400 }
      );
    }

    // Check for duplicate policy
    const existingPolicy = await prisma.contractorInsurance.findFirst({
      where: {
        contractorId: user.id,
        policyNumber: validatedData.policyNumber
      }
    });

    if (existingPolicy) {
      return NextResponse.json(
        {
          success: false,
          error: 'This policy is already registered'
        },
        { status: 400 }
      );
    }

    // Create insurance record
    const insurance = await prisma.contractorInsurance.create({
      data: {
        contractorId: user.id,
        insuranceType: validatedData.type,
        insurer: validatedData.provider,
        policyNumber: validatedData.policyNumber,
        coverageAmount: validatedData.coverageAmount,
        effectiveDate: new Date(),
        expiryDate: validatedData.expiryDate,
        certificateUrl: validatedData.certificateUrl,
        verified: false,
        status: 'PENDING'
      }
    });

    // Update draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (draft) {
      const draftData = JSON.parse(draft.data);
      const insurancePolicies = draftData.insurance || [];

      insurancePolicies.push({
        id: insurance.id,
        type: validatedData.type,
        provider: validatedData.provider,
        policyNumber: validatedData.policyNumber,
        coverageAmount: validatedData.coverageAmount,
        expiryDate: validatedData.expiryDate,
        certificateUrl: validatedData.certificateUrl
      });

      await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify({
            ...draftData,
            insurance: insurancePolicies,
            lastUpdated: new Date().toISOString()
          }),
          step: Math.max(draft.step, 5)
        }
      });
    }

    // Check if minimum insurance requirements are met
    const allInsurance = await prisma.contractorInsurance.findMany({
      where: { contractorId: user.id }
    });

    const hasPublicLiability = allInsurance.some(i => i.insuranceType === 'PUBLIC_LIABILITY');
    const hasWorkersComp = allInsurance.some(i => i.insuranceType === 'WORKERS_COMPENSATION');
    const insuranceComplete = hasPublicLiability && hasWorkersComp;

    // Update progress if insurance requirements are met
    if (insuranceComplete) {
      const progress = await prisma.onboardingProgress.findUnique({
        where: { contractorId: user.id }
      });

      if (progress) {
        const metadata = JSON.parse(progress.metadata || '{}');
        await prisma.onboardingProgress.update({
          where: { contractorId: user.id },
          data: {
            currentStep: Math.max(progress.currentStep, 5),
            metadata: JSON.stringify({
              ...metadata,
              steps: {
                ...metadata.steps,
                insurance: true
              }
            })
          }
        });
      }
    }

    // Update onboarding step
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id }
    });

    if (contractor) {
      await prisma.contractor.update({
        where: { id: user.id },
        data: {
          onboardingStep: Math.max(contractor.onboardingStep, 5)
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ADD_INSURANCE',
        resource: 'CONTRACTOR_INSURANCE',
        resourceId: insurance.id,
        details: JSON.stringify({
          type: validatedData.type,
          provider: validatedData.provider,
          policyNumber: validatedData.policyNumber,
          coverageAmount: validatedData.coverageAmount,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Insurance policy added successfully',
      data: {
        insuranceId: insurance.id,
        nextStep: insuranceComplete ? 6 : 5,
        completedStep: 5,
        insuranceComplete
      }
    });

  } catch (error) {
    console.error('Insurance upload error:', error);

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
        error: 'Failed to save insurance policy'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve insurance policies
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const insurancePolicies = await prisma.contractorInsurance.findMany({
      where: { contractorId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    const hasPublicLiability = insurancePolicies.some(i => i.insuranceType === 'PUBLIC_LIABILITY');
    const hasWorkersComp = insurancePolicies.some(i => i.insuranceType === 'WORKERS_COMPENSATION');

    return NextResponse.json({
      success: true,
      data: {
        policies: insurancePolicies.map(policy => ({
          id: policy.id,
          type: policy.insuranceType,
          insurer: policy.insurer,
          policyNumber: policy.policyNumber,
          coverageAmount: policy.coverageAmount,
          excess: policy.excess,
          effectiveDate: policy.effectiveDate,
          expiryDate: policy.expiryDate,
          certificateUrl: policy.certificateUrl,
          verified: policy.verified,
          status: policy.status
        })),
        requirements: {
          publicLiability: {
            required: true,
            minimum: INSURANCE_REQUIREMENTS.PUBLIC_LIABILITY.minimum,
            satisfied: hasPublicLiability
          },
          workersCompensation: {
            required: true,
            satisfied: hasWorkersComp
          },
          complete: hasPublicLiability && hasWorkersComp
        }
      }
    });

  } catch (error) {
    console.error('Get insurance error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve insurance policies'
      },
      { status: 500 }
    );
  }
}