import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ moduleId: string }>;
}

/**
 * POST /api/training/modules/[moduleId]/start
 * Marks a training module as started for the authenticated contractor.
 */
export async function POST(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  const { moduleId } = await params;
  const contractorId = payload.userId;

  try {
    // Get or create ContractorOnboarding record
    const onboarding = await prisma.contractorOnboarding.upsert({
      where: { contractorId },
      create: {
        contractorId,
        specialization: 'general',
        startDate: new Date(),
        status: 'IN_PROGRESS',
      },
      update: { status: 'IN_PROGRESS' },
    });

    // Upsert module progress using the new unique constraint
    const progress = await prisma.contractorModuleProgress.upsert({
      where: {
        uq_module_progress_onboarding_module: {
          onboardingId: onboarding.id,
          moduleId,
        },
      },
      create: {
        onboardingId: onboarding.id,
        moduleId,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        progress: 0,
      },
      update: {
        // Only update if not already completed
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });

    // If already completed, don't downgrade the status
    if (progress.status === 'COMPLETED') {
      return NextResponse.json({
        message: 'Module already completed',
        moduleId,
        status: 'COMPLETED',
        completedAt: progress.completedAt,
      });
    }

    return NextResponse.json({
      message: 'Module started',
      moduleId,
      status: progress.status,
      startedAt: progress.startedAt,
    });
  } catch (error) {
    console.error('[training/modules/start POST]', error);
    return NextResponse.json({ error: 'Failed to start module' }, { status: 500 });
  }
}
