'use client';
/**
 * Contractor Dashboard — DR-194
 *
 * /dashboard/contractor — post-onboarding home base for active NRPG contractors.
 *
 * Sections:
 *   - Certification level + points breakdown (100-pt system)
 *   - Assigned jobs (stub — pending NRPG dispatch)
 *   - Continuing education progress (CARSI modules)
 *   - Upcoming renewal dates
 *   - Performance metrics stub
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SpecialisationPathway, type Specialisation } from '@/components/onboarding/SpecialisationPathway';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CertScoreData {
  certificationLevel: string | null;
  totalPoints: number;
  specialisationPoints: number;
  carsiPoints: number;
  associationPoints: number;
  govCertPoints: number;
  pointsToNextLevel: number | null;
  lastCalculatedAt: string | null;
}

interface CarsiModule {
  moduleId: string;
  courseName: string | null;
  status: string;
  progress: number;
  completedAt: string | null;
}

interface CarsiData {
  synced: boolean;
  carsiStudentId: string | null;
  moduleCount: number;
  completedCount: number;
  modules: CarsiModule[];
  lastSyncedAt: string | null;
}

interface DashboardData {
  certScore: CertScoreData | null;
  carsi: CarsiData | null;
  specialisation: string | null;
}

// ---------------------------------------------------------------------------
// Level colours
// ---------------------------------------------------------------------------

function levelColour(level: string | null) {
  if (!level) return 'text-zinc-500';
  if (level.includes('Master'))     return 'text-yellow-400';
  if (level.includes('Expert'))     return 'text-orange-400';
  if (level.includes('Professional')) return 'text-amber-400';
  if (level.includes('Specialist')) return 'text-blue-400';
  return 'text-zinc-400';
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CertCard({ score }: { score: CertScoreData }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
      <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Certification</h2>

      <div className="flex items-end gap-3">
        <span className={`text-4xl font-black ${levelColour(score.certificationLevel)}`}>
          {score.totalPoints}
        </span>
        <span className="text-zinc-500 text-sm mb-1">/ 100 pts</span>
      </div>

      {score.certificationLevel && (
        <p className={`text-sm font-semibold ${levelColour(score.certificationLevel)}`}>
          {score.certificationLevel}
        </p>
      )}

      {score.pointsToNextLevel != null && score.pointsToNextLevel > 0 && (
        <p className="text-xs text-zinc-500">
          {score.pointsToNextLevel} points to next level
        </p>
      )}

      {/* Points breakdown */}
      <div className="space-y-2 pt-2 border-t border-zinc-800">
        {[
          { label: 'Specialisation', points: score.specialisationPoints, max: 40 },
          { label: 'CARSI Training',  points: score.carsiPoints,         max: 25 },
          { label: 'Associations',    points: score.associationPoints,   max: 20 },
          { label: 'Gov Cert / CPD',  points: score.govCertPoints,       max: 15 },
        ].map(({ label, points, max }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{label}</span>
              <span className="text-zinc-400 font-mono">{points}/{max}</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(points / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {score.lastCalculatedAt && (
        <p className="text-xs text-zinc-600">
          Updated {new Date(score.lastCalculatedAt).toLocaleDateString('en-AU')}
        </p>
      )}
    </div>
  );
}

function CarsiCard({ carsi }: { carsi: CarsiData }) {
  const completionPct = carsi.moduleCount > 0
    ? Math.round((carsi.completedCount / carsi.moduleCount) * 100)
    : 0;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">CARSI Training</h2>
        {!carsi.synced && (
          <span className="text-xs text-amber-400 border border-amber-400/30 bg-amber-400/10 rounded px-2 py-0.5">
            Not synced
          </span>
        )}
      </div>

      {carsi.synced ? (
        <>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-white">{completionPct}%</span>
            <span className="text-zinc-500 text-sm mb-1">complete</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500">
            {carsi.completedCount} / {carsi.moduleCount} modules
          </p>

          {/* Module list (top 5) */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-800">
            {carsi.modules.slice(0, 5).map((m) => (
              <div key={m.moduleId} className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 truncate max-w-[60%]">
                  {m.courseName ?? m.moduleId}
                </span>
                <span className={[
                  'font-medium px-1.5 py-0.5 rounded text-xs',
                  m.status === 'COMPLETED' ? 'text-green-400 bg-green-500/10' :
                  m.status === 'IN_PROGRESS' ? 'text-amber-400 bg-amber-400/10' :
                  'text-zinc-600 bg-zinc-800',
                ].join(' ')}>
                  {m.status === 'COMPLETED' ? '✓' : m.status === 'IN_PROGRESS' ? `${m.progress}%` : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-zinc-500">
          CARSI account not yet set up. Complete the onboarding portal to get your training assigned.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main dashboard
// ---------------------------------------------------------------------------

export default function ContractorDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [certRes, carsiRes] = await Promise.all([
        fetch('/api/nrpg/certification-score'),
        fetch('/api/nrpg/carsi-sync'),
      ]);

      if (certRes.status === 401 || carsiRes.status === 401) {
        router.push('/auth/signin');
        return;
      }

      const certJson = certRes.ok ? await certRes.json() as { score?: CertScoreData; specialisation?: string } : null;
      const carsiJson = carsiRes.ok ? await carsiRes.json() as { synced?: boolean; carsiStudentId?: string | null; modules?: CarsiModule[]; lastSyncedAt?: string | null } : null;

      const carsiModules: CarsiModule[] = carsiJson?.modules ?? [];

      setData({
        certScore: certJson?.score ?? null,
        carsi: carsiJson ? {
          synced: carsiJson.synced ?? false,
          carsiStudentId: carsiJson.carsiStudentId ?? null,
          moduleCount: carsiModules.length,
          completedCount: carsiModules.filter((m) => m.status === 'COMPLETED').length,
          modules: carsiModules,
          lastSyncedAt: carsiJson.lastSyncedAt ?? null,
        } : null,
        specialisation: certJson?.specialisation ?? null,
      });
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-amber-400 tracking-wide text-sm uppercase">NRPG Contractor Dashboard</span>
        <button
          onClick={() => router.push('/onboarding')}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Onboarding portal →
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Top row: cert + carsi */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data?.certScore ? (
            <CertCard score={data.certScore} />
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-zinc-500 text-sm">
              No certification score yet — complete the assessment in the onboarding portal.
            </div>
          )}
          {data?.carsi ? (
            <CarsiCard carsi={data.carsi} />
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-zinc-500 text-sm">
              CARSI data unavailable.
            </div>
          )}
        </div>

        {/* Specialisation pathway */}
        {data?.specialisation && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
              Your Certification Pathway
            </h2>
            <SpecialisationPathway
              specialisation={data.specialisation as Specialisation}
              currentPoints={data.certScore?.totalPoints ?? 0}
            />
          </div>
        )}

        {/* Jobs stub */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Assigned Jobs</h2>
          <p className="text-sm text-zinc-500">
            Job dispatch integration is coming soon. Jobs assigned by NRPG will appear here.
          </p>
        </div>

        {/* Renewal dates stub */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Upcoming Renewals</h2>
          <p className="text-sm text-zinc-500">
            Insurance and certification renewal tracking coming soon.
          </p>
        </div>

      </div>
    </div>
  );
}
