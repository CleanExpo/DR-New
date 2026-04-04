/**
 * Onboarding Milestones API — DR-191
 *
 * GET  /api/nrpg/onboarding-milestones         — fetch milestones for the authenticated contractor
 * POST /api/nrpg/onboarding-milestones         — initialise 30-day milestone set (called after commitment signing)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  initialiseMilestones,
  getMilestonesForContractor,
  computeProgressSummary,
} from '@/lib/onboarding-milestone-service';

async function requireContractor() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// GET — fetch contractor milestones + progress summary
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const milestones = await getMilestonesForContractor(user.id ?? '');
  const summary = milestones.length > 0 ? computeProgressSummary(milestones) : null;

  return NextResponse.json({ milestones, summary });
}

// ---------------------------------------------------------------------------
// POST — initialise milestone set
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // Optional: accept a startDate override (admin use)
  let startDate = new Date();
  try {
    const body = await request.json().catch(() => ({})) as { startDate?: string };
    if (body.startDate) {
      const parsed = new Date(body.startDate);
      if (!isNaN(parsed.getTime())) startDate = parsed;
    }
  } catch {
    // use default
  }

  await initialiseMilestones(user.id ?? '', startDate);
  const milestones = await getMilestonesForContractor(user.id ?? '');
  const summary = computeProgressSummary(milestones);

  return NextResponse.json(
    {
      success: true,
      message: 'Your 30-day onboarding programme has been initialised.',
      summary,
    },
    { status: 201 }
  );
}
