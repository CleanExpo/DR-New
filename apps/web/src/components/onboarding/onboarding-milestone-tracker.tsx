'use client';

/**
 * OnboardingMilestoneTracker — DR-191
 *
 * Displays the contractor's 30-day onboarding programme milestones,
 * grouped by week, with status indicators and progress summary.
 *
 * Design: Scientific Luxury — OLED black #050505, accent #00BFA6
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  Flag,
  ChevronDown,
  ChevronRight,
  Loader2,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CheckIn {
  id: string;
  performedBy: string;
  notes: string | null;
  outcome: string;
  createdAt: string;
}

interface Milestone {
  id: string;
  milestoneKey: string;
  week: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  completedAt: string | null;
  flaggedToPhill: boolean;
  checkIns: CheckIn[];
}

interface ProgressSummary {
  totalMilestones: number;
  completedMilestones: number;
  overdueMilestones: number;
  flaggedMilestones: number;
  percentComplete: number;
  currentWeek: number;
  onTrack: boolean;
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }>; ringColor: string }
> = {
  NOT_STARTED: {
    label: 'Not Started',
    color: 'text-zinc-500',
    icon: Circle,
    ringColor: 'border-zinc-700',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: 'text-blue-400',
    icon: Clock,
    ringColor: 'border-blue-600',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-[#00BFA6]',
    icon: CheckCircle2,
    ringColor: 'border-[#00BFA6]',
  },
  OVERDUE: {
    label: 'Overdue',
    color: 'text-yellow-400',
    icon: AlertTriangle,
    ringColor: 'border-yellow-600',
  },
  FLAGGED: {
    label: 'Flagged',
    color: 'text-red-400',
    icon: Flag,
    ringColor: 'border-red-600',
  },
};

function StatusIcon({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.NOT_STARTED;
  const Icon = config.icon;
  return <Icon className={`w-5 h-5 ${config.color}`} />;
}

// ---------------------------------------------------------------------------
// Week label
// ---------------------------------------------------------------------------

const WEEK_LABELS: Record<number, string> = {
  1: 'Week 1 — Welcome, Platform Setup & First Module',
  2: 'Week 2 — CSE Modules 1–5 & Job Shadow',
  3: 'Week 3 — CSE 6–10, WRT 1–6 & Assessment Start',
  4: 'Week 4 — WRT 7–12, Final Assessment & Certification',
};

// ---------------------------------------------------------------------------
// Milestone card
// ---------------------------------------------------------------------------

function MilestoneCard({
  milestone,
  onStart,
  onComplete,
  updating,
}: {
  milestone: Milestone;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  updating: string | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const config = STATUS_CONFIG[milestone.status] ?? STATUS_CONFIG.NOT_STARTED;
  const isComplete = milestone.status === 'COMPLETED';
  const isBusy = updating === milestone.id;

  const dueDate = new Date(milestone.dueDate);
  const dueDateStr = dueDate.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={`rounded-xl border transition-colors ${
        isComplete
          ? 'border-[#00BFA6]/30 bg-[#00BFA6]/5'
          : milestone.status === 'FLAGGED'
            ? 'border-red-800 bg-red-950/20'
            : milestone.status === 'OVERDUE'
              ? 'border-yellow-800 bg-yellow-950/20'
              : 'border-zinc-800 bg-zinc-950'
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <StatusIcon status={milestone.status} />
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium leading-snug">{milestone.title}</p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className={`text-xs ${config.color}`}>{config.label}</span>
            <span className="text-xs text-zinc-600">Due {dueDateStr}</span>
            {milestone.flaggedToPhill && (
              <span className="text-xs text-red-400 flex items-center gap-0.5">
                <Flag className="w-3 h-3" /> Flagged
              </span>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-zinc-400 text-sm leading-relaxed">{milestone.description}</p>

          {/* Action buttons */}
          {!isComplete && (
            <div className="flex gap-2">
              {milestone.status === 'NOT_STARTED' && (
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => onStart(milestone.id)}
                  className="px-3 py-1.5 text-xs border border-zinc-700 text-zinc-300 rounded-lg hover:border-zinc-500 transition-colors disabled:opacity-50"
                >
                  {isBusy ? (
                    <Loader2 className="w-3 h-3 animate-spin inline" />
                  ) : (
                    'Mark In Progress'
                  )}
                </button>
              )}
              {(milestone.status === 'IN_PROGRESS' || milestone.status === 'OVERDUE') && (
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => onComplete(milestone.id)}
                  className="px-3 py-1.5 text-xs bg-[#00BFA6]/10 border border-[#00BFA6]/40 text-[#00BFA6] rounded-lg hover:bg-[#00BFA6]/20 transition-colors disabled:opacity-50"
                >
                  {isBusy ? (
                    <Loader2 className="w-3 h-3 animate-spin inline" />
                  ) : (
                    'Mark Complete'
                  )}
                </button>
              )}
            </div>
          )}

          {/* Check-ins */}
          {milestone.checkIns.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Check-ins</p>
              {milestone.checkIns.map((ci) => (
                <div
                  key={ci.id}
                  className={`p-3 rounded-lg border text-xs ${
                    ci.outcome === 'FLAGGED'
                      ? 'border-red-800 bg-red-950/20 text-red-300'
                      : ci.outcome === 'NEEDS_ATTENTION'
                        ? 'border-yellow-800 bg-yellow-950/20 text-yellow-300'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{ci.outcome.replace(/_/g, ' ')}</span>
                    <span className="text-zinc-500">
                      {new Date(ci.createdAt).toLocaleDateString('en-AU', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  {ci.notes && <p className="text-zinc-400">{ci.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress summary card
// ---------------------------------------------------------------------------

function ProgressCard({ summary }: { summary: ProgressSummary }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Overall Progress</p>
          <p className="text-3xl font-bold text-white">{summary.percentComplete}%</p>
          <p className="text-sm text-zinc-400 mt-0.5">
            {summary.completedMilestones} of {summary.totalMilestones} milestones complete
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp
            className={`w-5 h-5 ${summary.onTrack ? 'text-[#00BFA6]' : 'text-yellow-400'}`}
          />
          <span
            className={`text-sm font-medium ${summary.onTrack ? 'text-[#00BFA6]' : 'text-yellow-400'}`}
          >
            {summary.onTrack ? 'On Track' : 'Attention Needed'}
          </span>
        </div>
      </div>

      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#00BFA6] rounded-full transition-all duration-500"
          style={{ width: `${summary.percentComplete}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-lg font-bold text-white">{summary.currentWeek}</p>
          <p className="text-xs text-zinc-500">Current Week</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${summary.overdueMilestones > 0 ? 'text-yellow-400' : 'text-white'}`}>
            {summary.overdueMilestones}
          </p>
          <p className="text-xs text-zinc-500">Overdue</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${summary.flaggedMilestones > 0 ? 'text-red-400' : 'text-white'}`}>
            {summary.flaggedMilestones}
          </p>
          <p className="text-xs text-zinc-500">Flagged</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function OnboardingMilestoneTracker() {
  const [loading, setLoading] = useState(true);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [initialising, setInitialising] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchMilestones = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/nrpg/onboarding-milestones');
      if (!res.ok) {
        setFetchError('Failed to load your onboarding programme.');
        return;
      }
      const data = await res.json();
      setMilestones(data.milestones);
      setSummary(data.summary);
    } catch {
      setFetchError('Network error. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMilestones();
  }, [fetchMilestones]);

  async function initialiseProgramme() {
    setInitialising(true);
    try {
      const res = await fetch('/api/nrpg/onboarding-milestones', { method: 'POST' });
      if (res.ok) {
        await fetchMilestones();
      }
    } catch {
      // non-fatal
    } finally {
      setInitialising(false);
    }
  }

  async function updateStatus(milestoneId: string, status: 'IN_PROGRESS' | 'COMPLETED') {
    setUpdating(milestoneId);
    try {
      await fetch(`/api/nrpg/onboarding-milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchMilestones();
    } catch {
      // non-fatal
    } finally {
      setUpdating(null);
    }
  }

  // Group milestones by week
  const byWeek: Record<number, Milestone[]> = {};
  for (const m of milestones) {
    if (!byWeek[m.week]) byWeek[m.week] = [];
    byWeek[m.week].push(m);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#00BFA6] animate-spin" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {fetchError}
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Clock className="w-7 h-7 text-zinc-500" />
        </div>
        <h3 className="text-white font-semibold">30-Day Programme Not Started</h3>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto">
          Your onboarding milestones haven&apos;t been initialised yet. Start your 30-day programme
          to track your progress.
        </p>
        <button
          type="button"
          onClick={() => void initialiseProgramme()}
          disabled={initialising}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
        >
          {initialising ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Starting...
            </>
          ) : (
            'Start 30-Day Programme'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">30-Day Onboarding Programme</h2>
        <p className="text-zinc-400 text-sm mt-0.5">
          Track your milestones across all four weeks. Mark items complete as you progress.
        </p>
      </div>

      {/* Progress summary */}
      {summary && <ProgressCard summary={summary} />}

      {/* Milestones by week */}
      {[1, 2, 3, 4].map((week) => {
        const weekMilestones = byWeek[week] ?? [];
        if (weekMilestones.length === 0) return null;

        const allDone = weekMilestones.every((m) => m.status === 'COMPLETED');

        return (
          <div key={week}>
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  allDone
                    ? 'bg-[#00BFA6] text-[#050505]'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {week}
              </div>
              <h3 className={`text-sm font-medium ${allDone ? 'text-[#00BFA6]' : 'text-white'}`}>
                {WEEK_LABELS[week] ?? `Week ${week}`}
              </h3>
              {allDone && <CheckCircle2 className="w-4 h-4 text-[#00BFA6]" />}
            </div>
            <div className="space-y-2 ml-8">
              {weekMilestones.map((m) => (
                <MilestoneCard
                  key={m.id}
                  milestone={m}
                  onStart={(id) => void updateStatus(id, 'IN_PROGRESS')}
                  onComplete={(id) => void updateStatus(id, 'COMPLETED')}
                  updating={updating}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
