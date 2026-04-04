/**
 * CARSI ↔ NRPG Onboarding Sync — DR-193
 *
 * Connects CARSI (industry training platform) to the NRPG onboarding workflow.
 *
 * On contractor registration:
 *   1. Creates a CARSI student account
 *   2. Assigns CSE + WRT courses based on specialisation
 *   3. Creates ContractorModuleProgress records
 *   4. Sets NRPGOnboardingPhase.carsiOnboarded = true
 *   5. Sets NRPGCertificationPoints.carsiMembershipPoints = 10
 *
 * On progress webhook:
 *   1. Updates ContractorModuleProgress
 *   2. Recalculates NRPGCertificationPoints.carsiCoursePoints
 *   3. Recalculates NRPGCertScore via certification-scoring-engine
 *   4. Issues NRPG certification when threshold met
 */

import { createHmac, timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';
import { persistScore, calculateScore } from './certification-scoring-engine';

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

function getCarsiEnv() {
  const apiUrl = process.env.CARSI_API_URL;
  const apiKey = process.env.CARSI_API_KEY;
  const webhookSecret = process.env.CARSI_WEBHOOK_SECRET;

  if (!apiUrl || !apiKey) {
    throw new Error('CARSI_API_URL and CARSI_API_KEY must be set to use CARSI sync');
  }

  return { apiUrl, apiKey, webhookSecret: webhookSecret ?? '' };
}

// ---------------------------------------------------------------------------
// Course map — specialisation → CARSI course IDs
// ---------------------------------------------------------------------------

const SPECIALISATION_COURSES: Record<string, { cse: string[]; wrt: string[] }> = {
  WATER_DAMAGE: {
    cse: ['CSE-WD-101', 'CSE-WD-102', 'CSE-WD-103'],
    wrt: ['WRT-WD-201', 'WRT-WD-202'],
  },
  FIRE_DAMAGE: {
    cse: ['CSE-FD-101', 'CSE-FD-102'],
    wrt: ['WRT-FD-201', 'WRT-FD-202'],
  },
  MOULD_REMEDIATION: {
    cse: ['CSE-MR-101', 'CSE-MR-102'],
    wrt: ['WRT-MR-201'],
  },
  TRAUMA_CLEANING: {
    cse: ['CSE-TC-101', 'CSE-TC-102'],
    wrt: ['WRT-TC-201'],
  },
  STORM_DAMAGE: {
    cse: ['CSE-SD-101', 'CSE-SD-102'],
    wrt: ['WRT-SD-201'],
  },
  COMMERCIAL_WATER_DAMAGE: {
    cse: ['CSE-WD-101', 'CSE-WD-102', 'CSE-WD-103', 'CSE-CWD-301'],
    wrt: ['WRT-WD-201', 'WRT-WD-202', 'WRT-CWD-301'],
  },
  COMMERCIAL_FIRE_DAMAGE: {
    cse: ['CSE-FD-101', 'CSE-FD-102', 'CSE-CFD-301'],
    wrt: ['WRT-FD-201', 'WRT-FD-202', 'WRT-CFD-301'],
  },
  COMMERCIAL_MOULD: {
    cse: ['CSE-MR-101', 'CSE-MR-102', 'CSE-CM-301'],
    wrt: ['WRT-MR-201', 'WRT-CM-301'],
  },
};

const DEFAULT_COURSES = {
  cse: ['CSE-CORE-001'],
  wrt: ['WRT-CORE-001'],
};

function getCoursesForSpecialisation(specialisation: string): string[] {
  const map = SPECIALISATION_COURSES[specialisation.toUpperCase()] ?? DEFAULT_COURSES;
  return [...map.cse, ...map.wrt];
}

const COURSE_NAMES: Record<string, string> = {
  'CSE-WD-101': 'Water Damage Fundamentals — CSE',
  'CSE-WD-102': 'Advanced Water Extraction — CSE',
  'CSE-WD-103': 'Structural Drying Science — CSE',
  'CSE-FD-101': 'Fire & Smoke Damage Fundamentals — CSE',
  'CSE-FD-102': 'Contents Cleaning & Restoration — CSE',
  'CSE-MR-101': 'Mould Assessment & Remediation — CSE',
  'CSE-MR-102': 'Indoor Air Quality Management — CSE',
  'CSE-TC-101': 'Trauma Scene Assessment — CSE',
  'CSE-TC-102': 'Biohazard Management & Safety — CSE',
  'CSE-SD-101': 'Storm & Flood Response — CSE',
  'CSE-SD-102': 'Emergency Stabilisation Techniques — CSE',
  'CSE-CWD-301': 'Commercial Water Damage Management — CSE',
  'CSE-CFD-301': 'Commercial Fire Loss Management — CSE',
  'CSE-CM-301': 'Commercial Mould Remediation — CSE',
  'CSE-CORE-001': 'CARSI Core Competencies — CSE',
  'WRT-WD-201': 'Water Restoration Technician — Foundations',
  'WRT-WD-202': 'Water Restoration Technician — Applied',
  'WRT-FD-201': 'Fire & Smoke Restoration Technician — Foundations',
  'WRT-FD-202': 'Fire & Smoke Restoration Technician — Applied',
  'WRT-MR-201': 'Applied Mould Remediation — WRT',
  'WRT-TC-201': 'Trauma Restoration Operations — WRT',
  'WRT-SD-201': 'Storm Restoration Field Operations — WRT',
  'WRT-CWD-301': 'Commercial Water Restoration — WRT',
  'WRT-CFD-301': 'Commercial Fire Restoration — WRT',
  'WRT-CM-301': 'Commercial Mould Operations — WRT',
  'WRT-CORE-001': 'CARSI Core Restoration Operations — WRT',
};

// ---------------------------------------------------------------------------
// CARSI API Client
// ---------------------------------------------------------------------------

interface CARSICreateStudentResponse {
  studentId: string;
  memberId: string;
  email: string;
  portalUrl: string;
}

interface CARSIEnrolmentResponse {
  enrolmentId: string;
  courseId: string;
  studentId: string;
  status: 'ENROLLED' | 'ACTIVE';
}

interface CARSICourseProgress {
  courseId: string;
  enrolmentId: string;
  progressPercent: number;
  completedModules: number;
  totalModules: number;
  completedAt: string | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
}

async function carsiRequest<T>(
  path: string,
  method: 'GET' | 'POST',
  body?: unknown
): Promise<T> {
  const { apiUrl, apiKey } = getCarsiEnv();

  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'X-NRPG-Source': 'nrpg-onboarding',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'no body');
    throw new Error(`CARSI API ${method} ${path} → ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

async function createCARSIStudent(contractorId: string, email: string, name: string) {
  return carsiRequest<CARSICreateStudentResponse>('/api/v1/students', 'POST', {
    externalId: contractorId,
    email,
    name,
    organisation: 'NRPG',
    autoActivate: true,
  });
}

async function enrollInCourse(studentId: string, courseId: string) {
  return carsiRequest<CARSIEnrolmentResponse>(`/api/v1/students/${studentId}/enrolments`, 'POST', {
    courseId,
    source: 'nrpg-onboarding-auto',
  });
}

async function getStudentProgress(studentId: string) {
  return carsiRequest<{ progress: CARSICourseProgress[] }>(
    `/api/v1/students/${studentId}/progress`,
    'GET'
  );
}

// ---------------------------------------------------------------------------
// Sync trigger — called when contractor completes phase 1 registration
// ---------------------------------------------------------------------------

export interface CARSISyncResult {
  contractorId: string;
  carsiStudentId: string;
  carsiMemberId: string;
  coursesAssigned: string[];
  alreadySynced: boolean;
}

export async function syncContractorToCarsi(
  contractorId: string,
  email: string,
  name: string
): Promise<CARSISyncResult> {
  // Check if already synced
  const certPoints = await prisma.nRPGCertificationPoints.findUnique({
    where: { contractorId },
    select: { carsiMemberId: true, carsiMembershipPoints: true },
  });

  if (certPoints?.carsiMemberId) {
    return {
      contractorId,
      carsiStudentId: certPoints.carsiMemberId,
      carsiMemberId: certPoints.carsiMemberId,
      coursesAssigned: [],
      alreadySynced: true,
    };
  }

  // Get contractor onboarding record for specialisation
  const onboarding = await prisma.contractorOnboarding.findUnique({
    where: { contractorId },
    select: { id: true, specialization: true },
  });

  const specialisation = onboarding?.specialization ?? 'WATER_DAMAGE';
  const courseIds = getCoursesForSpecialisation(specialisation);

  // Create CARSI student account
  const student = await createCARSIStudent(contractorId, email, name);

  // Enrol in all assigned courses
  await Promise.all(courseIds.map((courseId) => enrollInCourse(student.studentId, courseId)));

  // Persist module progress records
  if (onboarding) {
    await prisma.contractorModuleProgress.createMany({
      data: courseIds.map((courseId) => ({
        onboardingId: onboarding.id,
        moduleId: courseId,
        courseName: COURSE_NAMES[courseId] ?? courseId,
        status: 'NOT_STARTED' as const,
        completed: false,
        progress: 0,
      })),
      skipDuplicates: true,
    });
  }

  // Mark carsi onboarded in phase tracker
  await prisma.nRPGOnboardingPhase.upsert({
    where: { contractorId },
    create: {
      contractorId,
      carsiOnboarded: true,
      phase2Status: 'IN_PROGRESS',
    },
    update: {
      carsiOnboarded: true,
      phase2Status: 'IN_PROGRESS',
    },
  });

  // Update certification points — membership = 10 pts
  await prisma.nRPGCertificationPoints.upsert({
    where: { contractorId },
    create: {
      contractorId,
      carsiMemberId: student.studentId,
      carsiMembershipPoints: 10,
      carsiCoursePoints: 0,
    },
    update: {
      carsiMemberId: student.studentId,
      carsiMembershipPoints: 10,
    },
  });

  return {
    contractorId,
    carsiStudentId: student.studentId,
    carsiMemberId: student.memberId,
    coursesAssigned: courseIds,
    alreadySynced: false,
  };
}

// ---------------------------------------------------------------------------
// Progress fetch — pull latest from CARSI and update local records
// ---------------------------------------------------------------------------

export async function fetchAndSyncCarsiProgress(contractorId: string) {
  const certPoints = await prisma.nRPGCertificationPoints.findUnique({
    where: { contractorId },
    select: { carsiMemberId: true },
  });

  if (!certPoints?.carsiMemberId) {
    throw new Error(`Contractor ${contractorId} has no CARSI student ID — run sync first`);
  }

  const { progress } = await getStudentProgress(certPoints.carsiMemberId);

  await updateProgressFromCarsi(contractorId, progress);

  return progress;
}

// ---------------------------------------------------------------------------
// Webhook signature verification
// ---------------------------------------------------------------------------

export function verifyCarsiWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  const { webhookSecret } = getCarsiEnv();
  if (!webhookSecret) return true; // dev mode — no secret configured

  if (!signatureHeader) return false;

  // CARSI sends: sha256=<hex>
  const [algorithm, received] = signatureHeader.split('=');
  if (algorithm !== 'sha256' || !received) return false;

  const expected = createHmac('sha256', webhookSecret).update(rawBody).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(received, 'hex'));
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Webhook payload types
// ---------------------------------------------------------------------------

export interface CarsiWebhookPayload {
  event: 'course.started' | 'course.progress' | 'course.completed' | 'course.failed';
  studentId: string;       // CARSI student ID — maps to carsiMemberId
  courseId: string;
  enrolmentId: string;
  progressPercent: number;
  completedAt?: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Internal — update progress records and recalculate cert score
// ---------------------------------------------------------------------------

async function updateProgressFromCarsi(
  contractorId: string,
  progress: CARSICourseProgress[]
): Promise<void> {
  const onboarding = await prisma.contractorOnboarding.findUnique({
    where: { contractorId },
    select: { id: true },
  });

  if (!onboarding) return;

  // Build a map of existing module progress records
  const existing = await prisma.contractorModuleProgress.findMany({
    where: { onboardingId: onboarding.id },
    select: { id: true, moduleId: true },
  });
  const existingById = new Map(existing.map((m) => [m.moduleId, m.id]));

  // Update each module progress record
  for (const course of progress) {
    const moduleStatus =
      course.status === 'COMPLETED'
        ? ('COMPLETED' as const)
        : course.status === 'IN_PROGRESS'
          ? ('IN_PROGRESS' as const)
          : course.status === 'FAILED'
            ? ('FAILED' as const)
            : ('NOT_STARTED' as const);

    const existingId = existingById.get(course.courseId);

    if (existingId) {
      await prisma.contractorModuleProgress.update({
        where: { id: existingId },
        data: {
          status: moduleStatus,
          completed: course.status === 'COMPLETED',
          progress: course.progressPercent,
          completedAt: course.completedAt ? new Date(course.completedAt) : null,
        },
      });
    } else {
      const created = await prisma.contractorModuleProgress.create({
        data: {
          onboardingId: onboarding.id,
          moduleId: course.courseId,
          courseName: COURSE_NAMES[course.courseId] ?? course.courseId,
          status: moduleStatus,
          completed: course.status === 'COMPLETED',
          progress: course.progressPercent,
          startedAt: course.status !== 'NOT_STARTED' ? new Date() : null,
          completedAt: course.completedAt ? new Date(course.completedAt) : null,
        },
      });
      existingById.set(course.courseId, created.id);
    }
  }

  // Recalculate CARSI course points (completed courses × 3, capped at 15)
  const completedCount = progress.filter((c) => c.status === 'COMPLETED').length;
  const carsiCoursePoints = Math.min(completedCount * 3, 15);

  await prisma.nRPGCertificationPoints.update({
    where: { contractorId },
    data: {
      carsiCoursePoints,
      totalPoints: { increment: 0 }, // trigger updatedAt via separate recalc below
      lastCalculatedAt: new Date(),
    },
  });

  // Recalculate full NRPGCertScore
  await recalculateCertScore(contractorId, carsiCoursePoints);
}

// ---------------------------------------------------------------------------
// Handle a single CARSI webhook event
// ---------------------------------------------------------------------------

export async function handleCarsiWebhook(payload: CarsiWebhookPayload): Promise<void> {
  // Look up contractor by CARSI student ID
  const certPoints = await prisma.nRPGCertificationPoints.findFirst({
    where: { carsiMemberId: payload.studentId },
    select: { contractorId: true, carsiCoursePoints: true },
  });

  if (!certPoints) {
    // Student not found — may be from a different system integration
    return;
  }

  const { contractorId } = certPoints;
  const onboarding = await prisma.contractorOnboarding.findUnique({
    where: { contractorId },
    select: { id: true },
  });

  if (!onboarding) return;

  const isCompleted = payload.event === 'course.completed';
  const moduleStatus = isCompleted
    ? ('COMPLETED' as const)
    : payload.event === 'course.failed'
      ? ('FAILED' as const)
      : ('IN_PROGRESS' as const);

  // Find existing progress record
  const existing = await prisma.contractorModuleProgress.findFirst({
    where: { onboardingId: onboarding.id, moduleId: payload.courseId },
    select: { id: true },
  });

  if (existing) {
    await prisma.contractorModuleProgress.update({
      where: { id: existing.id },
      data: {
        status: moduleStatus,
        completed: isCompleted,
        progress: payload.progressPercent,
        completedAt: isCompleted && payload.completedAt ? new Date(payload.completedAt) : undefined,
      },
    });
  } else {
    await prisma.contractorModuleProgress.create({
      data: {
        onboardingId: onboarding.id,
        moduleId: payload.courseId,
        courseName: COURSE_NAMES[payload.courseId] ?? payload.courseId,
        status: moduleStatus,
        completed: isCompleted,
        progress: payload.progressPercent,
        startedAt: new Date(),
        completedAt: isCompleted && payload.completedAt ? new Date(payload.completedAt) : null,
      },
    });
  }

  // Recalculate CARSI course points
  const completedCount = await prisma.contractorModuleProgress.count({
    where: { onboardingId: onboarding.id, completed: true },
  });

  const carsiCoursePoints = Math.min(completedCount * 3, 15);

  await prisma.nRPGCertificationPoints.update({
    where: { contractorId },
    data: { carsiCoursePoints, lastCalculatedAt: new Date() },
  });

  await recalculateCertScore(contractorId, carsiCoursePoints);
}

// ---------------------------------------------------------------------------
// Recalculate NRPGCertScore after CARSI points change
// ---------------------------------------------------------------------------

async function recalculateCertScore(
  contractorId: string,
  carsiCoursePoints: number
): Promise<void> {
  // Load current cert points record for all categories
  const points = await prisma.nRPGCertificationPoints.findUnique({
    where: { contractorId },
  });

  if (!points) return;

  // Map to ScoreInput for the scoring engine
  const scoreInput = {
    hasCoreSpeicality: points.iicrcCorePoints > 0,
    additionalSpecCount: Math.min(Math.floor(points.iicrcAdvancedPoints / 5), 4),
    hasCarsiMembership: points.carsiMembershipPoints >= 10,
    carsiCoursesCompleted: Math.min(Math.floor(carsiCoursePoints / 3), 5),
    hasPrimaryAssociation: points.primaryAssocPoints >= 10,
    secondaryAssociationCount: Math.min(Math.floor(points.secondaryAssocPoints / 5), 2),
    hasGovCert4: points.govCert4Points >= 10,
    continuingEdCredits: Math.min(points.annualCECCredits / 5, 1),
  };

  const breakdown = calculateScore(scoreInput);
  await persistScore(contractorId, breakdown);
}
