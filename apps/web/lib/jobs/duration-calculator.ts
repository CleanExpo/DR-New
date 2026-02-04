/**
 * Duration Calculator Service
 *
 * Calculates job duration estimates and detects delays based on:
 * - Historical averages per service type
 * - Current status duration
 * - Expected completion time
 */

import { differenceInMinutes, differenceInHours, addMinutes, format } from 'date-fns';

export type JobStatus =
  | 'pending'
  | 'accepted'
  | 'en_route'
  | 'on_site'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface StatusHistoryEntry {
  status: JobStatus;
  timestamp: string | Date;
  message?: string;
}

export interface TimelineStep {
  status: JobStatus;
  label: string;
  timestamp?: Date;
  duration?: number; // in minutes
  estimatedDuration: number; // expected minutes
  progress: number; // 0-100%
  isDelayed: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
}

export interface JobTimeline {
  steps: TimelineStep[];
  currentStep: TimelineStep | null;
  totalElapsedMinutes: number;
  totalEstimatedMinutes: number;
  overallProgress: number; // 0-100%
  estimatedCompletionTime: Date | null;
  isDelayed: boolean;
}

// Historical average durations per status (in minutes)
// These would ideally come from database analytics
const DEFAULT_DURATIONS: Record<JobStatus, number> = {
  pending: 15, // Wait for contractor acceptance
  accepted: 20, // Contractor preparing
  en_route: 25, // Travel time
  on_site: 10, // Arrival and initial assessment
  in_progress: 120, // Active work
  completed: 0, // Final status
  cancelled: 0, // Terminal status
};

// Service type multipliers for duration estimates
const SERVICE_TYPE_MULTIPLIERS: Record<string, number> = {
  emergency: 0.7, // Faster response
  restoration: 1.2, // Longer work time
  cleanup: 1.0, // Standard time
  inspection: 0.8, // Quicker jobs
  mould_remediation: 1.5, // Complex work
  water_damage: 1.1, // Moderate complexity
  fire_damage: 1.3, // High complexity
  other: 1.0, // Default
};

/**
 * Get estimated duration for a status based on service type
 */
export function getEstimatedDuration(status: JobStatus, serviceType?: string): number {
  const baseDuration = DEFAULT_DURATIONS[status];
  const multiplier = serviceType ? SERVICE_TYPE_MULTIPLIERS[serviceType.toLowerCase()] || 1.0 : 1.0;
  return Math.round(baseDuration * multiplier);
}

/**
 * Calculate progress percentage for a status
 */
export function calculateProgress(actualMinutes: number, estimatedMinutes: number): number {
  if (estimatedMinutes === 0) return 100;
  const progress = (actualMinutes / estimatedMinutes) * 100;
  return Math.min(Math.round(progress), 100);
}

/**
 * Check if a status is delayed
 */
export function isStatusDelayed(actualMinutes: number, estimatedMinutes: number): boolean {
  // Consider delayed if actual time exceeds 120% of estimated time
  return actualMinutes > estimatedMinutes * 1.2;
}

/**
 * Calculate job timeline with durations and progress
 */
export function calculateJobTimeline(
  statusHistory: StatusHistoryEntry[],
  currentStatus: JobStatus,
  serviceType?: string
): JobTimeline {
  const now = new Date();
  const steps: TimelineStep[] = [];

  // Define all possible statuses in order
  const statusOrder: JobStatus[] = [
    'pending',
    'accepted',
    'en_route',
    'on_site',
    'in_progress',
    'completed',
  ];

  // Get current status index
  const currentStatusIndex = statusOrder.indexOf(currentStatus);

  // Process each status in order
  for (let i = 0; i < statusOrder.length; i++) {
    const status = statusOrder[i];
    const estimatedDuration = getEstimatedDuration(status, serviceType);

    // Find the history entry for this status
    const historyEntry = statusHistory.find((h) => h.status === status);
    const nextHistoryEntry = statusHistory.find((h, idx) => {
      const nextStatusIndex = statusOrder.indexOf(h.status);
      return nextStatusIndex > i && h.timestamp > (historyEntry?.timestamp || '');
    });

    // Determine if this status is current, completed, or future
    const isCurrent = i === currentStatusIndex;
    const isCompleted = i < currentStatusIndex;
    const isFuture = i > currentStatusIndex;

    let duration: number | undefined;
    let progress = 0;
    let timestamp: Date | undefined;

    if (historyEntry) {
      timestamp = new Date(historyEntry.timestamp);

      if (nextHistoryEntry) {
        // Status is completed - calculate actual duration
        const nextTimestamp = new Date(nextHistoryEntry.timestamp);
        duration = differenceInMinutes(nextTimestamp, timestamp);
        progress = 100;
      } else if (isCurrent) {
        // Status is current - calculate elapsed time
        duration = differenceInMinutes(now, timestamp);
        progress = calculateProgress(duration, estimatedDuration);
      }
    }

    steps.push({
      status,
      label: getStatusLabel(status),
      timestamp,
      duration,
      estimatedDuration,
      progress,
      isDelayed: duration ? isStatusDelayed(duration, estimatedDuration) : false,
      isCurrent,
      isCompleted,
    });
  }

  // Calculate overall metrics
  const completedSteps = steps.filter((s) => s.isCompleted);
  const currentStep = steps.find((s) => s.isCurrent) || null;

  const totalElapsedMinutes = completedSteps.reduce(
    (sum, s) => sum + (s.duration || 0),
    currentStep?.duration || 0
  );

  const totalEstimatedMinutes = steps
    .filter((s) => s.isCompleted || s.isCurrent)
    .reduce((sum, s) => sum + s.estimatedDuration, 0);

  // Estimate remaining time for incomplete statuses
  const remainingSteps = steps.filter((s) => !s.isCompleted && !s.isCurrent);
  const remainingEstimatedMinutes = remainingSteps.reduce(
    (sum, s) => sum + s.estimatedDuration,
    0
  );

  // Calculate when we expect to complete (from current time)
  const estimatedCompletionTime = currentStep
    ? addMinutes(now, remainingEstimatedMinutes + (currentStep.estimatedDuration - (currentStep.duration || 0)))
    : null;

  // Check if overall job is delayed
  const overallProgress = totalEstimatedMinutes > 0
    ? Math.min((totalElapsedMinutes / totalEstimatedMinutes) * 100, 100)
    : 0;

  const isDelayed = completedSteps.some((s) => s.isDelayed) || (currentStep?.isDelayed || false);

  return {
    steps,
    currentStep,
    totalElapsedMinutes,
    totalEstimatedMinutes,
    overallProgress: Math.round(overallProgress),
    estimatedCompletionTime,
    isDelayed,
  };
}

/**
 * Get user-friendly label for status
 */
export function getStatusLabel(status: JobStatus): string {
  const labels: Record<JobStatus, string> = {
    pending: 'Request Submitted',
    accepted: 'Contractor Assigned',
    en_route: 'On The Way',
    on_site: 'Arrived on Site',
    in_progress: 'Work In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}

/**
 * Format duration in human-readable format
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format estimated completion time
 */
export function formatEstimatedCompletion(date: Date): string {
  const now = new Date();
  const minutesUntil = differenceInMinutes(date, now);

  if (minutesUntil < 60) {
    return `~${minutesUntil} minutes`;
  }

  const hoursUntil = Math.floor(minutesUntil / 60);
  if (hoursUntil < 24) {
    return `~${hoursUntil} hour${hoursUntil !== 1 ? 's' : ''}`;
  }

  // Show specific time if more than a day away
  return format(date, 'MMM d, h:mm a');
}

/**
 * Get historical averages for a service type
 * In a real implementation, this would query the database
 */
export function getHistoricalAverages(serviceType: string): Record<JobStatus, number> {
  const multiplier = SERVICE_TYPE_MULTIPLIERS[serviceType.toLowerCase()] || 1.0;

  return Object.entries(DEFAULT_DURATIONS).reduce((acc, [status, duration]) => {
    acc[status as JobStatus] = Math.round(duration * multiplier);
    return acc;
  }, {} as Record<JobStatus, number>);
}

/**
 * Get delay warning message
 */
export function getDelayWarningMessage(step: TimelineStep): string | null {
  if (!step.isDelayed || !step.duration) return null;

  const extraMinutes = step.duration - step.estimatedDuration;
  return `This step is taking ${formatDuration(extraMinutes)} longer than expected`;
}
