/**
 * Onboarding Milestone — single resource — DR-191
 *
 * PATCH /api/nrpg/onboarding-milestones/[milestoneId]
 *   Mark milestone as IN_PROGRESS or COMPLETED
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { completeMilestone } from '@/lib/onboarding-milestone-service';

async function requireContractor() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

const PatchSchema = z.object({
  status: z.enum(['IN_PROGRESS', 'COMPLETED']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { milestoneId: string } }
) {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { milestoneId } = params;

  // Verify this milestone belongs to the requesting contractor
  const milestone = await prisma.onboardingMilestone.findUnique({
    where: { id: milestoneId },
    select: { id: true, contractorId: true, status: true },
  });

  if (!milestone) {
    return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
  }

  // Contractors can only update their own milestones; admins can update any
  if (
    milestone.contractorId !== user.id &&
    !['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 422 }
    );
  }

  if (parsed.data.status === 'COMPLETED') {
    await completeMilestone(milestoneId);
  } else {
    await prisma.onboardingMilestone.update({
      where: { id: milestoneId },
      data: { status: 'IN_PROGRESS' },
    });
  }

  const updated = await prisma.onboardingMilestone.findUnique({
    where: { id: milestoneId },
    select: { id: true, status: true, completedAt: true },
  });

  return NextResponse.json({ success: true, milestone: updated });
}
