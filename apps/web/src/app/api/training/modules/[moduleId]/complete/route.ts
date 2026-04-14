import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ moduleId: string }>;
}

/**
 * POST /api/training/modules/[moduleId]/complete
 * Marks a training module as completed for the authenticated contractor.
 * Also checks if all modules are done and updates the onboarding status accordingly.
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
      update: {},
    });

    // Mark module as completed
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
        status: 'COMPLETED',
        startedAt: new Date(),
        completedAt: new Date(),
        completed: true,
        progress: 100,
      },
      update: {
        status: 'COMPLETED',
        completedAt: new Date(),
        completed: true,
        progress: 100,
      },
    });

    // Check overall completion
    const allProgress = await prisma.contractorModuleProgress.findMany({
      where: { onboardingId: onboarding.id },
      select: { status: true },
    });

    const completedCount = allProgress.filter((p) => p.status === 'COMPLETED').length;

    return NextResponse.json({
      message: 'Module completed',
      moduleId,
      status: progress.status,
      completedAt: progress.completedAt,
      overallProgress: {
        completedModules: completedCount,
        totalTracked: allProgress.length,
      },
    });
  } catch (error) {
    console.error('[training/modules/complete POST]', error);
    return NextResponse.json({ error: 'Failed to complete module' }, { status: 500 });
  }
}
