/**
 * Certification Score API — DR-189
 *
 * GET  /api/nrpg/certification-score — fetch contractor's stored score
 * POST /api/nrpg/certification-score — calculate + persist score from submitted credentials
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  calculateScore,
  persistScore,
  getStoredScore,
  getLevelForPoints,
  getPointsToNextLevel,
  CERTIFICATION_LEVELS,
  type ScoreInput,
} from '@/lib/certification-scoring-engine';

async function requireContractor() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// GET — fetch stored score
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const stored = await getStoredScore(user.id ?? '');

  if (!stored) {
    return NextResponse.json({
      hasScore: false,
      score: null,
      certificationLevels: CERTIFICATION_LEVELS,
    });
  }

  const levelDef = getLevelForPoints(stored.totalPoints);
  const pointsToNext = getPointsToNextLevel(stored.totalPoints);

  return NextResponse.json({
    hasScore: true,
    score: {
      ...stored,
      levelDefinition: levelDef,
      pointsToNextLevel: pointsToNext,
    },
    certificationLevels: CERTIFICATION_LEVELS,
  });
}

// ---------------------------------------------------------------------------
// POST — calculate and persist
// ---------------------------------------------------------------------------

const ScoreInputSchema = z.object({
  hasCoreSpeicality: z.boolean(),
  additionalSpecCount: z.number().int().min(0).max(4),
  hasCarsiMembership: z.boolean(),
  carsiCoursesCompleted: z.number().int().min(0).max(5),
  hasPrimaryAssociation: z.boolean(),
  secondaryAssociationCount: z.number().int().min(0).max(2),
  hasGovCert4: z.boolean(),
  continuingEdCredits: z.number().min(0).max(1),
});

export async function POST(request: NextRequest) {
  const user = await requireContractor();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ScoreInputSchema.safeParse(body);

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

  const input: ScoreInput = parsed.data;
  const breakdown = calculateScore(input);

  await persistScore(user.id ?? '', breakdown);

  return NextResponse.json({
    success: true,
    breakdown,
    message: `Score calculated: ${breakdown.totalPoints} points — ${breakdown.certificationLabel}`,
  });
}
