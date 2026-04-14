import { NextRequest, NextResponse } from 'next/server';
import type { ContractorModuleProgress } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import allModules from '@/lib/training/generated/all-modules-summary.json';

interface RawModule {
  moduleId: string;
  title: string;
  duration: string;
  course: string;
}

interface ModuleWithProgress extends RawModule {
  courseId: string;
  status: string;
  progress: number;
  startedAt: string | null;
  completedAt: string | null;
}

const COURSE_ID_MAP: Record<string, string> = {
  'Customer Service Excellence': 'CSE-001',
  'Water Damage Restoration': 'WRT-001',
};

/**
 * GET /api/training/modules
 * Returns all 22 training modules with the authenticated contractor's progress.
 * Creates a ContractorOnboarding record if one does not yet exist.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  const contractorId = payload.userId;

  try {
    // Ensure ContractorOnboarding record exists
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

    // Fetch existing module progress for this onboarding
    const progressRecords = await prisma.contractorModuleProgress.findMany({
      where: { onboardingId: onboarding.id },
    });

    const progressMap = new Map<string, ContractorModuleProgress>(
      progressRecords.map((p) => [p.moduleId, p])
    );

    const modules: ModuleWithProgress[] = (allModules.modulesList as RawModule[]).map((mod) => {
      const prog = progressMap.get(mod.moduleId);
      return {
        ...mod,
        courseId: COURSE_ID_MAP[mod.course] ?? 'UNKNOWN',
        status: prog?.status ?? 'NOT_STARTED',
        progress: prog?.progress ?? 0,
        startedAt: prog?.startedAt?.toISOString() ?? null,
        completedAt: prog?.completedAt?.toISOString() ?? null,
      };
    });

    const totalModules = modules.length;
    const completedCount = modules.filter((m) => m.status === 'COMPLETED').length;
    const inProgressCount = modules.filter((m) => m.status === 'IN_PROGRESS').length;

    // Group by course
    const courses = allModules.courses.map((course) => ({
      ...course,
      modules: modules.filter((m) => COURSE_ID_MAP[m.course] === course.courseId),
      completedCount: modules.filter(
        (m) => COURSE_ID_MAP[m.course] === course.courseId && m.status === 'COMPLETED'
      ).length,
    }));

    return NextResponse.json({
      courses,
      modules,
      summary: {
        total: totalModules,
        completed: completedCount,
        inProgress: inProgressCount,
        notStarted: totalModules - completedCount - inProgressCount,
        percentComplete:
          totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0,
        totalDuration: allModules.summary.totalDuration,
      },
      onboardingId: onboarding.id,
      onboardingStatus: onboarding.status,
    });
  } catch (error) {
    console.error('[training/modules GET]', error);
    return NextResponse.json({ error: 'Failed to load training modules' }, { status: 500 });
  }
}
