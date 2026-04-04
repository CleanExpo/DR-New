'use client';

/**
 * CertificationScoreDashboard — DR-189
 *
 * Shows the contractor's NRPG 100-point certification score,
 * category breakdown, current level, and upgrade pathway.
 *
 * Design: Scientific Luxury — OLED black #050505, accent #00BFA6
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Award, ChevronRight, Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import type { LevelDefinition, UpgradePath } from '@/lib/certification-scoring-engine';
import { SCORE_CAPS } from '@/lib/certification-scoring-engine';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StoredScore {
  id: string;
  contractorId: string;
  coreSpecialtyPoints: number;
  additionalSpecPoints: number;
  specialisationTotal: number;
  carsiMembershipPoints: number;
  carsiCoursePoints: number;
  carsiTotal: number;
  primaryAssocPoints: number;
  secondaryAssocPoints: number;
  associationTotal: number;
  govCert4Points: number;
  continuingEdPoints: number;
  govCertTotal: number;
  totalPoints: number;
  certificationLevel: string;
  pointsToNextLevel: number;
  lastCalculatedAt: string;
  levelDefinition: LevelDefinition;
}

interface ScoreFormState {
  hasCoreSpeicality: boolean;
  additionalSpecCount: number;
  hasCarsiMembership: boolean;
  carsiCoursesCompleted: number;
  hasPrimaryAssociation: boolean;
  secondaryAssociationCount: number;
  hasGovCert4: boolean;
  continuingEdCredits: number;
}

const INITIAL_FORM: ScoreFormState = {
  hasCoreSpeicality: false,
  additionalSpecCount: 0,
  hasCarsiMembership: false,
  carsiCoursesCompleted: 0,
  hasPrimaryAssociation: false,
  secondaryAssociationCount: 0,
  hasGovCert4: false,
  continuingEdCredits: 0,
};

// ---------------------------------------------------------------------------
// Category bar
// ---------------------------------------------------------------------------

function CategoryBar({
  label,
  points,
  maxPoints,
  colour,
}: {
  label: string;
  points: number;
  maxPoints: number;
  colour: string;
}) {
  const pct = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-xs font-medium text-white">
          {points} / {maxPoints}
        </span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: colour }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Level badge
// ---------------------------------------------------------------------------

function LevelBadge({ level, label, colour }: { level: string; label: string; colour: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{
        borderColor: `${colour}40`,
        backgroundColor: `${colour}15`,
        color: colour,
      }}
    >
      <Award className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Score display
// ---------------------------------------------------------------------------

function ScoreDisplay({ score }: { score: StoredScore }) {
  const pct = Math.min((score.totalPoints / 100) * 100, 100);
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (pct / 100) * circumference;
  const levelColour = score.levelDefinition?.colour ?? '#6B7280';

  const upgradePath: UpgradePath[] = [
    { level: 'SPECIALIST', label: 'Specialist', minPoints: 60, gap: Math.max(0, 60 - score.totalPoints), achieved: score.totalPoints >= 60, colour: '#60A5FA' },
    { level: 'PROFESSIONAL', label: 'Professional', minPoints: 70, gap: Math.max(0, 70 - score.totalPoints), achieved: score.totalPoints >= 70, colour: '#A78BFA' },
    { level: 'EXPERT', label: 'Expert', minPoints: 85, gap: Math.max(0, 85 - score.totalPoints), achieved: score.totalPoints >= 85, colour: '#F59E0B' },
    { level: 'MASTER', label: 'Master', minPoints: 100, gap: Math.max(0, 100 - score.totalPoints), achieved: score.totalPoints >= 100, colour: '#00BFA6' },
  ];

  return (
    <div className="space-y-6">
      {/* Score ring + level */}
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#27272a" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={levelColour}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
            <text
              x="60"
              y="56"
              textAnchor="middle"
              className="font-bold"
              fill="white"
              fontSize="24"
              fontWeight="bold"
            >
              {score.totalPoints}
            </text>
            <text x="60" y="72" textAnchor="middle" fill="#71717a" fontSize="10">
              / 100 pts
            </text>
          </svg>
        </div>
        <div className="space-y-2">
          <LevelBadge
            level={score.certificationLevel}
            label={score.levelDefinition?.label ?? score.certificationLevel}
            colour={levelColour}
          />
          {score.pointsToNextLevel > 0 && (
            <p className="text-sm text-zinc-400">
              <span className="text-white font-medium">{score.pointsToNextLevel} pts</span> to next
              level
            </p>
          )}
          {score.pointsToNextLevel === 0 && (
            <p className="text-sm text-[#00BFA6]">Maximum certification achieved</p>
          )}
          <p className="text-xs text-zinc-600">
            Updated{' '}
            {new Date(score.lastCalculatedAt).toLocaleDateString('en-AU', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          Score Breakdown
        </p>
        <CategoryBar
          label={`Specialisation Portfolio (${score.specialisationTotal}/${SCORE_CAPS.specialisationTotal})`}
          points={score.specialisationTotal}
          maxPoints={SCORE_CAPS.specialisationTotal}
          colour="#60A5FA"
        />
        <CategoryBar
          label={`CARSI Mandatory Platform (${score.carsiTotal}/${SCORE_CAPS.carsiTotal})`}
          points={score.carsiTotal}
          maxPoints={SCORE_CAPS.carsiTotal}
          colour="#A78BFA"
        />
        <CategoryBar
          label={`Industry Association Diversity (${score.associationTotal}/${SCORE_CAPS.associationTotal})`}
          points={score.associationTotal}
          maxPoints={SCORE_CAPS.associationTotal}
          colour="#F59E0B"
        />
        <CategoryBar
          label={`Government Cert IV & Continuing Ed (${score.govCertTotal}/${SCORE_CAPS.govCertTotal})`}
          points={score.govCertTotal}
          maxPoints={SCORE_CAPS.govCertTotal}
          colour="#34D399"
        />
      </div>

      {/* Upgrade pathway */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-4">
          Certification Pathway
        </p>
        <div className="space-y-3">
          {upgradePath.map((step, i) => (
            <div key={step.level} className="flex items-center gap-3">
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: step.achieved ? `${step.colour}20` : '#27272a',
                  border: `1px solid ${step.achieved ? `${step.colour}50` : '#3f3f46'}`,
                }}
              >
                {step.achieved ? (
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: step.colour }} />
                ) : (
                  <span className="text-zinc-500 text-xs font-medium">{i + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: step.achieved ? step.colour : '#a1a1aa' }}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-zinc-500">{step.minPoints} pts</span>
                </div>
                {!step.achieved && (
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {step.gap} more point{step.gap !== 1 ? 's' : ''} needed
                  </p>
                )}
              </div>
              {step.achieved && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: step.colour }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Score input form
// ---------------------------------------------------------------------------

function ScoreInputForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: ScoreFormState) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<ScoreFormState>(INITIAL_FORM);

  function patch(partial: Partial<ScoreFormState>) {
    setForm((p) => ({ ...p, ...partial }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-white font-semibold mb-1">Calculate Your Score</h3>
        <p className="text-zinc-400 text-sm">
          Enter your current credentials to see your NRPG certification score.
        </p>
      </div>

      {/* Category 1 */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs text-blue-400 font-bold">1</span>
          <p className="text-sm font-medium text-white">Specialisation Portfolio (max 40 pts)</p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="coreSpec"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={form.hasCoreSpeicality}
            onChange={(e) => patch({ hasCoreSpeicality: e.target.checked })}
          />
          <label htmlFor="coreSpec" className="text-sm text-zinc-300 cursor-pointer">
            Core specialisation (water / fire / mould / trauma / storm) — 20 pts
          </label>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">
            Additional specialisation areas (0–4) — 5 pts each
          </label>
          <select
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00BFA6]"
            value={form.additionalSpecCount}
            onChange={(e) => patch({ additionalSpecCount: parseInt(e.target.value, 10) })}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} area{n !== 1 ? 's' : ''} ({n * 5} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category 2 */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-xs text-violet-400 font-bold">2</span>
          <p className="text-sm font-medium text-white">CARSI Mandatory Platform (max 25 pts)</p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="carsiMembership"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={form.hasCarsiMembership}
            onChange={(e) => patch({ hasCarsiMembership: e.target.checked })}
          />
          <label htmlFor="carsiMembership" className="text-sm text-zinc-300 cursor-pointer">
            Active CARSI membership — 10 pts
          </label>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">
            CARSI courses completed (0–5) — 3 pts each
          </label>
          <select
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00BFA6]"
            value={form.carsiCoursesCompleted}
            onChange={(e) => patch({ carsiCoursesCompleted: parseInt(e.target.value, 10) })}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} course{n !== 1 ? 's' : ''} ({n * 3} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category 3 */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs text-amber-400 font-bold">3</span>
          <p className="text-sm font-medium text-white">Industry Association Diversity (max 20 pts)</p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="primaryAssoc"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={form.hasPrimaryAssociation}
            onChange={(e) => patch({ hasPrimaryAssociation: e.target.checked })}
          />
          <label htmlFor="primaryAssoc" className="text-sm text-zinc-300 cursor-pointer">
            Primary industry association (AIRC, BIA, MBA, etc.) — 10 pts
          </label>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">
            Secondary associations (0–2) — 5 pts each
          </label>
          <select
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00BFA6]"
            value={form.secondaryAssociationCount}
            onChange={(e) => patch({ secondaryAssociationCount: parseInt(e.target.value, 10) })}
          >
            {[0, 1, 2].map((n) => (
              <option key={n} value={n}>
                {n} association{n !== 1 ? 's' : ''} ({n * 5} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category 4 */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs text-emerald-400 font-bold">4</span>
          <p className="text-sm font-medium text-white">Government Cert IV & Continuing Ed (max 15 pts)</p>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="govCert4"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={form.hasGovCert4}
            onChange={(e) => patch({ hasGovCert4: e.target.checked })}
          />
          <label htmlFor="govCert4" className="text-sm text-zinc-300 cursor-pointer">
            Cert IV in Building & Construction or equivalent — 10 pts
          </label>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">
            Continuing education credits this year (0–5 pts)
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.2"
            value={form.continuingEdCredits}
            onChange={(e) => patch({ continuingEdCredits: parseFloat(e.target.value) })}
            className="w-full accent-[#00BFA6]"
          />
          <div className="flex justify-between text-xs text-zinc-500 mt-1">
            <span>0 pts</span>
            <span className="text-white font-medium">
              {Math.round(form.continuingEdCredits * 5)} pts selected
            </span>
            <span>5 pts</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-bold text-sm rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            <Award className="w-4 h-4" />
            Calculate My Score
          </>
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CertificationScoreDashboard() {
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [score, setScore] = useState<StoredScore | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchScore = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/nrpg/certification-score');
      if (!res.ok) {
        setFetchError('Failed to load your certification score.');
        return;
      }
      const data = await res.json();
      if (data.hasScore) {
        setScore(data.score as StoredScore);
      } else {
        setShowForm(true);
      }
    } catch {
      setFetchError('Network error. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchScore();
  }, [fetchScore]);

  async function handleCalculate(formData: ScoreFormState) {
    setCalculating(true);
    try {
      const res = await fetch('/api/nrpg/certification-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        await fetchScore();
      }
    } catch {
      // non-fatal
    } finally {
      setCalculating(false);
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Certification Score</h2>
          <p className="text-zinc-400 text-sm mt-0.5">
            NRPG 100-point certification system — track your level and upgrade pathway.
          </p>
        </div>
        {score && (
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-zinc-500 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {showForm ? 'View Score' : 'Recalculate'}
          </button>
        )}
      </div>

      {/* Score display or form */}
      {score && !showForm ? (
        <ScoreDisplay score={score} />
      ) : (
        <ScoreInputForm onSubmit={(data) => void handleCalculate(data)} loading={calculating} />
      )}
    </div>
  );
}
