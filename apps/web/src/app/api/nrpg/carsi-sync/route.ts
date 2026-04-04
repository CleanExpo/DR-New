/**
 * CARSI Sync API — DR-193
 *
 * GET  /api/nrpg/carsi-sync  — fetch contractor's CARSI sync status + course progress
 * POST /api/nrpg/carsi-sync  — trigger CARSI account creation + course assignment
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  syncContractorToCarsi,
  fetchAndSyncCarsiProgress,
} from '@/lib/carsi-sync';
import { prisma } from '@/lib/prisma';

async function requireContractor() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; email?: string; name?: string; userType?: string };
  if (!['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// GET — sync status + module progress
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const contractorId = user.id ?? '';

  const [phase, certPoints, modules] = await Promise.all([
    prisma.nRPGOnboardingPhase.findUnique({
      where: { contractorId },
      select: {
        carsiOnboarded: true,
        phase2Status: true,
      },
    }),
    prisma.nRPGCertificationPoints.findUnique({
      where: { contractorId },
      select: {
        carsiMemberId: true,
        carsiMembershipPoints: true,
        carsiCoursePoints: true,
        lastCalculatedAt: true,
      },
    }),
    prisma.contractorOnboarding
      .findUnique({ where: { contractorId }, select: { id: true } })
      .then(async (o) => {
        if (!o) return [];
        return prisma.contractorModuleProgress.findMany({
          where: { onboardingId: o.id },
          orderBy: { createdAt: 'asc' },
          select: {
            moduleId: true,
            courseName: true,
            status: true,
            completed: true,
            progress: true,
            startedAt: true,
            completedAt: true,
          },
        });
      }),
  ]);

  return NextResponse.json({
    synced: phase?.carsiOnboarded ?? false,
    carsiStudentId: certPoints?.carsiMemberId ?? null,
    membershipPoints: certPoints?.carsiMembershipPoints ?? 0,
    coursePoints: certPoints?.carsiCoursePoints ?? 0,
    lastSyncedAt: certPoints?.lastCalculatedAt ?? null,
    modules,
  });
}

// ---------------------------------------------------------------------------
// POST — trigger CARSI sync (or re-fetch progress if already synced)
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const contractorId = user.id ?? '';
  const email = user.email ?? `contractor-${contractorId}@nrpg.internal`;
  const name = user.name ?? 'NRPG Contractor';

  const body = await request.json().catch(() => ({})) as { action?: string };
  const action = body.action ?? 'sync';

  if (action === 'refresh-progress') {
    // Pull latest from CARSI and update local records
    const progress = await fetchAndSyncCarsiProgress(contractorId);
    return NextResponse.json({
      success: true,
      message: `Progress refreshed — ${progress.length} courses updated`,
      courses: progress,
    });
  }

  // Initial sync — create CARSI account + assign courses
  const result = await syncContractorToCarsi(contractorId, email, name);

  if (result.alreadySynced) {
    return NextResponse.json({
      success: true,
      alreadySynced: true,
      message: 'Contractor already synced with CARSI',
      carsiStudentId: result.carsiStudentId,
    });
  }

  return NextResponse.json({
    success: true,
    alreadySynced: false,
    message: `CARSI account created — ${result.coursesAssigned.length} courses assigned`,
    carsiStudentId: result.carsiStudentId,
    coursesAssigned: result.coursesAssigned,
  });
}
