/**
 * NRPG 100-Point Certification Scoring Engine — DR-189
 *
 * Scoring breakdown:
 *   Specialisation Portfolio      40 pts  (core 20 + additional 4×5)
 *   CARSI Mandatory Platform      25 pts  (membership 10 + courses 5×3)
 *   Industry Association Diversity 20 pts  (primary 10 + secondary 2×5)
 *   Government Cert IV & Cont. Ed  15 pts  (cert4 10 + cont-ed 5)
 *   TOTAL                        100 pts
 *
 * Certification levels:
 *   < 60            — No certification
 *   60–69           — NRPG Certified Specialist
 *   70–84           — NRPG Certified Professional
 *   85–99           — NRPG Certified Expert
 *   100+            — NRPG Certified Master
 */

import { prisma } from './prisma';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const SCORE_CAPS = {
  coreSpecialty: 20,
  additionalSpec: 20, // max 4 × 5 pts
  specialisationTotal: 40,

  carsiMembership: 10,
  carsiCourses: 15, // max 5 × 3 pts
  carsiTotal: 25,

  primaryAssoc: 10,
  secondaryAssoc: 10, // max 2 × 5 pts
  associationTotal: 20,

  govCert4: 10,
  continuingEd: 5,
  govCertTotal: 15,

  grandTotal: 100,
} as const;

// ---------------------------------------------------------------------------
// Certification levels
// ---------------------------------------------------------------------------

export type CertLevel = 'NONE' | 'SPECIALIST' | 'PROFESSIONAL' | 'EXPERT' | 'MASTER';

export interface LevelDefinition {
  level: CertLevel;
  label: string;
  minPoints: number;
  maxPoints: number;
  description: string;
  colour: string; // Tailwind-safe CSS class fragment
}

export const CERTIFICATION_LEVELS: LevelDefinition[] = [
  {
    level: 'NONE',
    label: 'Not Yet Certified',
    minPoints: 0,
    maxPoints: 59,
    description: 'Achieve 60 points to earn NRPG certification.',
    colour: '#6B7280', // zinc-500
  },
  {
    level: 'SPECIALIST',
    label: 'NRPG Certified Specialist',
    minPoints: 60,
    maxPoints: 69,
    description: 'Demonstrates foundational competency across core NRPG requirements.',
    colour: '#60A5FA', // blue-400
  },
  {
    level: 'PROFESSIONAL',
    label: 'NRPG Certified Professional',
    minPoints: 70,
    maxPoints: 84,
    description: 'Proven professional with diversified credentials and industry engagement.',
    colour: '#A78BFA', // violet-400
  },
  {
    level: 'EXPERT',
    label: 'NRPG Certified Expert',
    minPoints: 85,
    maxPoints: 99,
    description: 'Advanced practitioner with exceptional certification breadth.',
    colour: '#F59E0B', // amber-400
  },
  {
    level: 'MASTER',
    label: 'NRPG Certified Master',
    minPoints: 100,
    maxPoints: 999,
    description: 'Peak certification — exemplifies NRPG standards across all domains.',
    colour: '#00BFA6', // NRPG accent
  },
];

export function getLevelForPoints(points: number): LevelDefinition {
  const level = [...CERTIFICATION_LEVELS]
    .reverse()
    .find((l) => points >= l.minPoints);
  return level ?? CERTIFICATION_LEVELS[0];
}

export function getPointsToNextLevel(points: number): number {
  const current = getLevelForPoints(points);
  if (current.level === 'MASTER') return 0;
  const nextLevel = CERTIFICATION_LEVELS.find((l) => l.minPoints > current.maxPoints);
  if (!nextLevel) return 0;
  return Math.max(0, nextLevel.minPoints - points);
}

// ---------------------------------------------------------------------------
// Score input
// ---------------------------------------------------------------------------

export interface ScoreInput {
  // Category 1 — Specialisation Portfolio
  hasCoreSpeicality: boolean;       // true = 20 pts
  additionalSpecCount: number;      // 0–4 additional areas × 5 pts each

  // Category 2 — CARSI Mandatory Platform
  hasCarsiMembership: boolean;      // true = 10 pts
  carsiCoursesCompleted: number;    // 0–5 courses × 3 pts each

  // Category 3 — Industry Association Diversity
  hasPrimaryAssociation: boolean;   // true = 10 pts
  secondaryAssociationCount: number; // 0–2 × 5 pts each

  // Category 4 — Government Cert IV & Continuing Ed
  hasGovCert4: boolean;             // true = 10 pts
  continuingEdCredits: number;      // 0–1 (1 = 5 pts, partial = pro-rata 0–5)
}

export interface ScoreBreakdown {
  // Category 1
  coreSpecialtyPoints: number;
  additionalSpecPoints: number;
  specialisationTotal: number;

  // Category 2
  carsiMembershipPoints: number;
  carsiCoursePoints: number;
  carsiTotal: number;

  // Category 3
  primaryAssocPoints: number;
  secondaryAssocPoints: number;
  associationTotal: number;

  // Category 4
  govCert4Points: number;
  continuingEdPoints: number;
  govCertTotal: number;

  // Totals
  totalPoints: number;
  certificationLevel: CertLevel;
  certificationLabel: string;
  certificationColour: string;
  pointsToNextLevel: number;
  levelDefinition: LevelDefinition;

  // Upgrade pathway
  upgradePath: UpgradePath[];
}

export interface UpgradePath {
  level: CertLevel;
  label: string;
  minPoints: number;
  gap: number; // points gap from current total
  achieved: boolean;
  colour: string;
}

// ---------------------------------------------------------------------------
// Core scoring function (pure — no DB side effects)
// ---------------------------------------------------------------------------

export function calculateScore(input: ScoreInput): ScoreBreakdown {
  // Category 1
  const coreSpecialtyPoints = input.hasCoreSpeicality ? SCORE_CAPS.coreSpecialty : 0;
  const additionalSpecPoints = Math.min(input.additionalSpecCount, 4) * 5;
  const specialisationTotal = Math.min(
    coreSpecialtyPoints + additionalSpecPoints,
    SCORE_CAPS.specialisationTotal
  );

  // Category 2
  const carsiMembershipPoints = input.hasCarsiMembership ? SCORE_CAPS.carsiMembership : 0;
  const carsiCoursePoints = Math.min(input.carsiCoursesCompleted, 5) * 3;
  const carsiTotal = Math.min(
    carsiMembershipPoints + carsiCoursePoints,
    SCORE_CAPS.carsiTotal
  );

  // Category 3
  const primaryAssocPoints = input.hasPrimaryAssociation ? SCORE_CAPS.primaryAssoc : 0;
  const secondaryAssocPoints = Math.min(input.secondaryAssociationCount, 2) * 5;
  const associationTotal = Math.min(
    primaryAssocPoints + secondaryAssocPoints,
    SCORE_CAPS.associationTotal
  );

  // Category 4
  const govCert4Points = input.hasGovCert4 ? SCORE_CAPS.govCert4 : 0;
  const continuingEdPoints = Math.min(Math.round(input.continuingEdCredits * 5), SCORE_CAPS.continuingEd);
  const govCertTotal = Math.min(govCert4Points + continuingEdPoints, SCORE_CAPS.govCertTotal);

  const totalPoints = Math.min(
    specialisationTotal + carsiTotal + associationTotal + govCertTotal,
    SCORE_CAPS.grandTotal
  );

  const levelDef = getLevelForPoints(totalPoints);
  const pointsToNext = getPointsToNextLevel(totalPoints);

  // Build upgrade path
  const upgradePath: UpgradePath[] = CERTIFICATION_LEVELS.filter(
    (l) => l.level !== 'NONE'
  ).map((l) => ({
    level: l.level,
    label: l.label,
    minPoints: l.minPoints,
    gap: Math.max(0, l.minPoints - totalPoints),
    achieved: totalPoints >= l.minPoints,
    colour: l.colour,
  }));

  return {
    coreSpecialtyPoints,
    additionalSpecPoints,
    specialisationTotal,
    carsiMembershipPoints,
    carsiCoursePoints,
    carsiTotal,
    primaryAssocPoints,
    secondaryAssocPoints,
    associationTotal,
    govCert4Points,
    continuingEdPoints,
    govCertTotal,
    totalPoints,
    certificationLevel: levelDef.level,
    certificationLabel: levelDef.label,
    certificationColour: levelDef.colour,
    pointsToNextLevel: pointsToNext,
    levelDefinition: levelDef,
    upgradePath,
  };
}

// ---------------------------------------------------------------------------
// Persist score to database
// ---------------------------------------------------------------------------

export async function persistScore(
  contractorId: string,
  breakdown: ScoreBreakdown
): Promise<void> {
  await prisma.nRPGCertScore.upsert({
    where: { contractorId },
    create: {
      contractorId,
      coreSpecialtyPoints: breakdown.coreSpecialtyPoints,
      additionalSpecPoints: breakdown.additionalSpecPoints,
      specialisationTotal: breakdown.specialisationTotal,
      carsiMembershipPoints: breakdown.carsiMembershipPoints,
      carsiCoursePoints: breakdown.carsiCoursePoints,
      carsiTotal: breakdown.carsiTotal,
      primaryAssocPoints: breakdown.primaryAssocPoints,
      secondaryAssocPoints: breakdown.secondaryAssocPoints,
      associationTotal: breakdown.associationTotal,
      govCert4Points: breakdown.govCert4Points,
      continuingEdPoints: breakdown.continuingEdPoints,
      govCertTotal: breakdown.govCertTotal,
      totalPoints: breakdown.totalPoints,
      certificationLevel: breakdown.certificationLevel,
      pointsToNextLevel: breakdown.pointsToNextLevel,
      lastCalculatedAt: new Date(),
    },
    update: {
      coreSpecialtyPoints: breakdown.coreSpecialtyPoints,
      additionalSpecPoints: breakdown.additionalSpecPoints,
      specialisationTotal: breakdown.specialisationTotal,
      carsiMembershipPoints: breakdown.carsiMembershipPoints,
      carsiCoursePoints: breakdown.carsiCoursePoints,
      carsiTotal: breakdown.carsiTotal,
      primaryAssocPoints: breakdown.primaryAssocPoints,
      secondaryAssocPoints: breakdown.secondaryAssocPoints,
      associationTotal: breakdown.associationTotal,
      govCert4Points: breakdown.govCert4Points,
      continuingEdPoints: breakdown.continuingEdPoints,
      govCertTotal: breakdown.govCertTotal,
      totalPoints: breakdown.totalPoints,
      certificationLevel: breakdown.certificationLevel,
      pointsToNextLevel: breakdown.pointsToNextLevel,
      lastCalculatedAt: new Date(),
    },
  });
}

// ---------------------------------------------------------------------------
// Fetch stored score for a contractor
// ---------------------------------------------------------------------------

export async function getStoredScore(contractorId: string) {
  return prisma.nRPGCertScore.findUnique({
    where: { contractorId },
  });
}
