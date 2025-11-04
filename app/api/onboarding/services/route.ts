import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';
import { serviceSelectionSchema, SERVICE_CERTIFICATION_MAP } from '@/lib/validation/onboarding';

export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    const body = await request.json();

    // Validate service selection
    const validatedData = serviceSelectionSchema.parse(body);

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

    // Update or create territories with service preferences
    const existingTerritory = await prisma.contractorTerritory.findFirst({
      where: {
        contractorId: user.id,
        type: 'RADIUS' // Default territory type
      }
    });

    if (existingTerritory) {
      await prisma.contractorTerritory.update({
        where: { id: existingTerritory.id },
        data: {
          emergencyResponse: validatedData.emergencyResponse,
          afterHours: validatedData.afterHours,
          weekendService: validatedData.weekendService,
        }
      });
    } else {
      // Create initial territory record (will be updated with location later)
      await prisma.contractorTerritory.create({
        data: {
          contractorId: user.id,
          type: 'RADIUS',
          name: 'Primary Service Area',
          emergencyResponse: validatedData.emergencyResponse,
          afterHours: validatedData.afterHours,
          weekendService: validatedData.weekendService,
          active: true
        }
      });
    }

    // Store services in draft (as certifications will be linked to services)
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
            services: validatedData.services,
            servicePreferences: {
              emergencyResponse: validatedData.emergencyResponse,
              afterHours: validatedData.afterHours,
              weekendService: validatedData.weekendService,
            },
            lastUpdated: new Date().toISOString()
          }),
          step: Math.max(draft.step, 3)
        }
      });
    }

    // Update onboarding step
    await prisma.contractor.update({
      where: { id: user.id },
      data: {
        onboardingStep: Math.max(contractor.onboardingStep, 3)
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
          currentStep: Math.max(progress.currentStep, 3),
          metadata: JSON.stringify({
            ...metadata,
            steps: {
              ...metadata.steps,
              services: true
            }
          })
        }
      });
    }

    // Determine required certifications based on selected services
    const requiredCertifications = new Set<string>();
    validatedData.services.forEach((service: string) => {
      const certs = SERVICE_CERTIFICATION_MAP[service];
      if (certs) {
        certs.forEach(cert => requiredCertifications.add(cert));
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE_SERVICES',
        resource: 'CONTRACTOR',
        resourceId: user.id,
        details: JSON.stringify({
          services: validatedData.services,
          emergencyResponse: validatedData.emergencyResponse,
          afterHours: validatedData.afterHours,
          weekendService: validatedData.weekendService,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || '',
        success: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Services selected successfully',
      data: {
        nextStep: 4,
        completedStep: 3,
        requiredCertifications: Array.from(requiredCertifications)
      }
    });

  } catch (error) {
    console.error('Services selection error:', error);

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
        message: 'Failed to save service selection',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          userId: user?.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'POST /api/onboarding/services',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save service selection'
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve selected services
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const user = authResult;

    // Get from draft
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId: user.id }
    });

    if (!draft) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No services selected yet'
      });
    }

    const draftData = JSON.parse(draft.data);
    const services = draftData.services || [];
    const servicePreferences = draftData.servicePreferences || {};

    // Determine required certifications
    const requiredCertifications = new Set<string>();
    services.forEach((service: string) => {
      const certs = SERVICE_CERTIFICATION_MAP[service];
      if (certs) {
        certs.forEach((cert: string) => requiredCertifications.add(cert));
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        services,
        emergencyResponse: servicePreferences.emergencyResponse ?? true,
        afterHours: servicePreferences.afterHours ?? false,
        weekendService: servicePreferences.weekendService ?? true,
        requiredCertifications: Array.from(requiredCertifications)
      }
    });

  } catch (error) {
    console.error('Get services error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve services'
      },
      { status: 500 }
    );
  }
}