/**
 * Onboarding Check-In API — DR-191
 *
 * POST /api/nrpg/onboarding-milestones/[milestoneId]/check-in
 *   Admin/Bron submits a check-in for a milestone.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { addCheckIn } from '@/lib/onboarding-milestone-service';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

const CheckInSchema = z.object({
  notes: z.string().min(5, 'Notes must be at least 5 characters').max(2000),
  outcome: z.enum(['SATISFACTORY', 'NEEDS_ATTENTION', 'FLAGGED']),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { milestoneId: string } }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorised — admin only' }, { status: 401 });
  }

  const { milestoneId } = params;

  const milestone = await prisma.onboardingMilestone.findUnique({
    where: { id: milestoneId },
    select: { id: true },
  });

  if (!milestone) {
    return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
  }

  const body = await request.json();
  const parsed = CheckInSchema.safeParse(body);
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

  await addCheckIn(milestoneId, admin.id ?? 'admin', parsed.data.notes, parsed.data.outcome);

  return NextResponse.json({
    success: true,
    message:
      parsed.data.outcome === 'FLAGGED'
        ? 'Check-in recorded. Milestone flagged to Phill.'
        : 'Check-in recorded.',
  });
}
