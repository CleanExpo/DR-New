/**
 * Onboarding Milestone Service — DR-191
 *
 * Manages the 30-day onboarding milestone workflow for NRPG contractors.
 * Provides: milestone initialisation, status updates, overdue detection,
 * and flagging contractors behind to Phill.
 */

import { prisma } from './prisma';

// ---------------------------------------------------------------------------
// Milestone definitions
// ---------------------------------------------------------------------------

interface MilestoneDef {
  key: string;
  week: number;
  title: string;
  description: string;
  dayOffset: number; // days from onboarding start date when due
}

export const MILESTONE_DEFINITIONS: MilestoneDef[] = [
  {
    key: 'WEEK1_WELCOME',
    week: 1,
    title: 'Welcome & Platform Setup',
    description:
      'Complete account setup, read the NRPG Welcome Guide, activate Clean Claims access, and confirm your profile is complete.',
    dayOffset: 7,
  },
  {
    key: 'WEEK1_FIRST_MODULE',
    week: 1,
    title: 'First Training Module Assigned',
    description:
      'Begin your assigned opening training module in the NRPG training portal. Reach at least 50% completion.',
    dayOffset: 7,
  },
  {
    key: 'WEEK2_CSE_1_5',
    week: 2,
    title: 'CSE Modules 1–5 Complete',
    description:
      'Complete Customer Service Excellence (CSE) modules 1 through 5 with a passing score of 70% or above.',
    dayOffset: 14,
  },
  {
    key: 'WEEK2_JOB_SHADOW',
    week: 2,
    title: 'First Supervised Job Shadow',
    description:
      'Complete your first supervised job shadow with an NRPG-approved mentor contractor. Submit your reflection form.',
    dayOffset: 14,
  },
  {
    key: 'WEEK3_CSE_6_10_WRT_1_6',
    week: 3,
    title: 'CSE Modules 6–10 & WRT Modules 1–6',
    description:
      'Complete Customer Service Excellence modules 6–10 and Water Restoration Technician (WRT) modules 1–6.',
    dayOffset: 21,
  },
  {
    key: 'WEEK3_CERT_ASSESSMENT_STARTED',
    week: 3,
    title: 'Certification Assessment Started',
    description:
      'Begin your certification assessment in the NRPG portal. Complete the pre-assessment eligibility check.',
    dayOffset: 21,
  },
  {
    key: 'WEEK4_FINAL_ASSESSMENT',
    week: 4,
    title: 'WRT Modules 7–12 & Final Assessment',
    description:
      'Complete WRT modules 7–12 and sit the final certification assessment. Certification level is assigned upon passing.',
    dayOffset: 30,
  },
];

// ---------------------------------------------------------------------------
// Initialise milestones for a contractor
// ---------------------------------------------------------------------------

/**
 * Creates the full set of 7 milestone records for a contractor starting
 * their 30-day onboarding programme. Idempotent — safe to call multiple times.
 */
export async function initialiseMilestones(
  contractorId: string,
  startDate: Date = new Date()
): Promise<void> {
  const records = MILESTONE_DEFINITIONS.map((def) => {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + def.dayOffset);

    return {
      contractorId,
      milestoneKey: def.key,
      week: def.week,
      title: def.title,
      description: def.description,
      status: 'NOT_STARTED',
      dueDate,
    };
  });

  // Upsert — skip existing records
  await Promise.all(
    records.map((r) =>
      prisma.onboardingMilestone.upsert({
        where: {
          contractorId_milestoneKey: {
            contractorId: r.contractorId,
            milestoneKey: r.milestoneKey,
          },
        },
        create: r,
        update: {}, // Do not overwrite if already exists
      })
    )
  );
}

// ---------------------------------------------------------------------------
// Fetch milestones for a contractor
// ---------------------------------------------------------------------------

export interface MilestoneWithCheckIns {
  id: string;
  contractorId: string;
  milestoneKey: string;
  week: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  completedAt: Date | null;
  reminderSent: boolean;
  flaggedToPhill: boolean;
  flaggedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  checkIns: {
    id: string;
    performedBy: string;
    notes: string | null;
    outcome: string;
    createdAt: Date;
  }[];
}

export async function getMilestonesForContractor(
  contractorId: string
): Promise<MilestoneWithCheckIns[]> {
  return prisma.onboardingMilestone.findMany({
    where: { contractorId },
    orderBy: [{ week: 'asc' }, { dueDate: 'asc' }],
    include: {
      checkIns: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          performedBy: true,
          notes: true,
          outcome: true,
          createdAt: true,
        },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Mark milestone complete
// ---------------------------------------------------------------------------

export async function completeMilestone(milestoneId: string): Promise<void> {
  await prisma.onboardingMilestone.update({
    where: { id: milestoneId },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  });
}

// ---------------------------------------------------------------------------
// Add a check-in to a milestone
// ---------------------------------------------------------------------------

export async function addCheckIn(
  milestoneId: string,
  performedBy: string,
  notes: string,
  outcome: 'SATISFACTORY' | 'NEEDS_ATTENTION' | 'FLAGGED'
): Promise<void> {
  await prisma.onboardingCheckIn.create({
    data: {
      milestoneId,
      performedBy,
      notes,
      outcome,
    },
  });

  // If flagged, mark milestone as FLAGGED and update flaggedToPhill
  if (outcome === 'FLAGGED') {
    await prisma.onboardingMilestone.update({
      where: { id: milestoneId },
      data: {
        status: 'FLAGGED',
        flaggedToPhill: true,
        flaggedAt: new Date(),
      },
    });
  }
}

// ---------------------------------------------------------------------------
// Overdue detection — called by cron or on-demand
// ---------------------------------------------------------------------------

export interface OverdueSummary {
  contractorId: string;
  milestoneId: string;
  milestoneKey: string;
  title: string;
  dueDate: Date;
  daysOverdue: number;
}

export async function detectAndFlagOverdue(): Promise<OverdueSummary[]> {
  const now = new Date();

  const overdue = await prisma.onboardingMilestone.findMany({
    where: {
      status: { in: ['NOT_STARTED', 'IN_PROGRESS'] },
      dueDate: { lt: now },
      flaggedToPhill: false,
    },
    select: {
      id: true,
      contractorId: true,
      milestoneKey: true,
      title: true,
      dueDate: true,
    },
  });

  const summaries: OverdueSummary[] = [];

  for (const m of overdue) {
    const daysOverdue = Math.floor((now.getTime() - m.dueDate.getTime()) / (1000 * 60 * 60 * 24));

    // Mark overdue and flag to Phill
    await prisma.onboardingMilestone.update({
      where: { id: m.id },
      data: {
        status: 'OVERDUE',
        flaggedToPhill: true,
        flaggedAt: now,
      },
    });

    summaries.push({
      contractorId: m.contractorId,
      milestoneId: m.id,
      milestoneKey: m.milestoneKey,
      title: m.title,
      dueDate: m.dueDate,
      daysOverdue,
    });
  }

  return summaries;
}

// ---------------------------------------------------------------------------
// Compute progress summary
// ---------------------------------------------------------------------------

export interface OnboardingProgressSummary {
  contractorId: string;
  totalMilestones: number;
  completedMilestones: number;
  overdueMilestones: number;
  flaggedMilestones: number;
  percentComplete: number;
  currentWeek: number;
  onTrack: boolean;
}

export function computeProgressSummary(
  milestones: MilestoneWithCheckIns[]
): OnboardingProgressSummary {
  const contractorId = milestones[0]?.contractorId ?? '';
  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === 'COMPLETED').length;
  const overdue = milestones.filter((m) => m.status === 'OVERDUE').length;
  const flagged = milestones.filter((m) => m.status === 'FLAGGED').length;

  // Current week = max week of any in-progress or not-started milestone
  const inProgress = milestones.filter((m) => m.status !== 'COMPLETED');
  const currentWeek = inProgress.length > 0 ? Math.min(...inProgress.map((m) => m.week)) : 4;

  return {
    contractorId,
    totalMilestones: total,
    completedMilestones: completed,
    overdueMilestones: overdue,
    flaggedMilestones: flagged,
    percentComplete: total > 0 ? Math.round((completed / total) * 100) : 0,
    currentWeek,
    onTrack: overdue === 0 && flagged === 0,
  };
}
