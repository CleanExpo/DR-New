import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { coverageAreaSchema, SUBSCRIPTION_TIERS } from '@/lib/validation/onboarding';

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate coverage area data
    const validatedData = coverageAreaSchema.parse(body);

    // Get contractor profile
    const contractor = await prisma.contractor.findUnique({
      where: { id: user.id }
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

    // Update or create territory with coverage details
    const existingTerritory = await prisma.contractorTerritory.findFirst({
      where: {
        contractorId: user.id,
        type: 'RADIUS'
      }
    });

    if (existingTerritory) {
      await prisma.contractorTerritory.update({
        where: { id: existingTerritory.id },
        data: {
          name: `${validatedData.coverageRadius}km Coverage Area`,
          centerLat: validatedData.baseLocation.lat,
          centerLng: validatedData.baseLocation.lng,
          radiusKm: validatedData.coverageRadius,
          postcodes: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories.filter(t => t.type === 'POSTCODE').map(t => t.value))
            : null,
          suburbs: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories.filter(t => t.type === 'SUBURB').map(t => t.value))
            : null,
        }
      });
    } else {
      await prisma.contractorTerritory.create({
        data: {
          contractorId: user.id,
          type: 'RADIUS',
          name: `${validatedData.coverageRadius}km Coverage Area`,
          centerLat: validatedData.baseLocation.lat,
          centerLng: validatedData.baseLocation.lng,
          radiusKm: validatedData.coverageRadius,
          postcodes: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories.filter(t => t.type === 'POSTCODE').map(t => t.value))
            : null,
          suburbs: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories.filter(t => t.type === 'SUBURB').map(t => t.value))
            : null,
          emergencyResponse: true,
          weekendService: true,
          active: true
        }
      });
    }

    // Get subscription tier details
    const tierDetails = SUBSCRIPTION_TIERS[validatedData.subscriptionTier];

    // Create or update subscription record (pending payment)
    const existingSubscription = await prisma.contractorSubscription.findUnique({
      where: { contractorId: user.id }
    });

    if (existingSubscription) {
      await prisma.contractorSubscription.update({
        where: { contractorId: user.id },
        data: {
          tier: validatedData.subscriptionTier,
          baseRadius: validatedData.coverageRadius,
          additionalTerritories: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories)
            : null,
          amount: tierDetails.price,
          status: 'PENDING' // Will be activated after payment
        }
      });
    } else {
      await prisma.contractorSubscription.create({
        data: {
          contractorId: user.id,
          tier: validatedData.subscriptionTier,
          baseRadius: validatedData.coverageRadius,
          additionalTerritories: validatedData.additionalTerritories
            ? JSON.stringify(validatedData.additionalTerritories)
            : null,
          billingFrequency: 'MONTHLY',
          amount: tierDetails.price,
          status: 'PENDING',
          bondAmount: 5000,
          bondStatus: 'PENDING'
        }
      });
    }

    // Update draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (draft) {
      const draftData = JSON.parse(draft.data);
      await prisma.onboardingDraft.update({
        where: { userId: user.id },
        data: {
          data: JSON.stringify({
            ...draftData,
            coverage: {
              baseLocation: validatedData.baseLocation,
              coverageRadius: validatedData.coverageRadius,
              additionalTerritories: validatedData.additionalTerritories,
              subscriptionTier: validatedData.subscriptionTier,
              monthlyPrice: tierDetails.price
            },
            lastUpdated: new Date().toISOString()
          }),
          step: Math.max(draft.step, 6)
        }
      });
    }

    // Update onboarding step
    await prisma.contractor.update({
      where: { id: user.id },
      data: {
        onboardingStep: Math.max(contractor.onboardingStep, 6)
      }
    });

    // Update progress
    const progress = await prisma.onboardingProgress.findUnique({
      where: { contractorId: user.id }
    });

    if (progress) {
      const metadata = JSON.parse(progress.metadata || '{}');
      await prisma.onboardingProgress.update({
        where: { contractorId: user.id },
        data: {
          currentStep: Math.max(progress.currentStep, 6),
          metadata: JSON.stringify({
            ...metadata,
            steps: {
              ...metadata.steps,
              coverage: true
            }
          })
        }
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE_COVERAGE',
        resource: 'CONTRACTOR',
        resourceId: user.id,
        details: JSON.stringify({
          baseLocation: validatedData.baseLocation.address,
          coverageRadius: validatedData.coverageRadius,
          subscriptionTier: validatedData.subscriptionTier,
          monthlyPrice: tierDetails.price,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Coverage area and subscription tier selected successfully',
      data: {
        nextStep: 7,
        completedStep: 6,
        subscriptionTier: validatedData.subscriptionTier,
        monthlyPrice: tierDetails.price,
        requiresPayment: true
      }
    });

  } catch (error) {
    console.error('Coverage area error:', error);

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
        error: 'Failed to save coverage area'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve coverage area
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const territory = await prisma.contractorTerritory.findFirst({
      where: {
        contractorId: user.id,
        type: 'RADIUS'
      }
    });

    const subscription = await prisma.contractorSubscription.findUnique({
      where: { contractorId: user.id }
    });

    if (!territory && !subscription) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No coverage area configured yet'
      });
    }

    let additionalTerritories = [];
    if (subscription?.additionalTerritories) {
      try {
        additionalTerritories = JSON.parse(subscription.additionalTerritories);
      } catch {
        additionalTerritories = [];
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        baseLocation: territory ? {
          lat: territory.centerLat,
          lng: territory.centerLng,
        } : null,
        coverageRadius: territory?.radiusKm || subscription?.baseRadius,
        additionalTerritories,
        subscriptionTier: subscription?.tier,
        amount: subscription?.amount,
        billingFrequency: subscription?.billingFrequency,
        status: subscription?.status
      }
    });

  } catch (error) {
    console.error('Get coverage error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve coverage area'
      },
      { status: 500 }
    );
  }
}