'use client';
/**
 * Contractor Onboarding Portal — DR-186
 *
 * /onboarding — step-by-step portal for new NRPG contractors
 *
 * Steps:
 *   1. Welcome
 *   2. Business Details
 *   3. Documents & Insurance
 *   4. Professional Commitment
 *   5. Training Assignment (CARSI)
 *   6. Certification Assessment
 *   7. Complete
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OnboardingStep =
  | 'welcome'
  | 'business-details'
  | 'documents'
  | 'commitment'
  | 'training'
  | 'assessment'
  | 'complete';

const STEP_LABELS: Record<OnboardingStep, string> = {
  'welcome': 'Welcome',
  'business-details': 'Business Details',
  'documents': 'Documents',
  'commitment': 'Commitment',
  'training': 'Training',
  'assessment': 'Assessment',
  'complete': 'Complete',
};

const STEP_ORDER: OnboardingStep[] = [
  'welcome', 'business-details', 'documents', 'commitment',
  'training', 'assessment', 'complete',
];

interface PortalState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  profile: { businessName: string | null; specialisation: string | null };
  carsiSynced: boolean;
  certificationLevel: string | null;
  certificationPoints: number | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stepIndex(step: OnboardingStep) {
  return STEP_ORDER.indexOf(step);
}

// ---------------------------------------------------------------------------
// Sub-step components
// ---------------------------------------------------------------------------

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to NRPG</h2>
        <p className="text-zinc-400 leading-relaxed">
          You&apos;re about to join Australia&apos;s premier network of disaster recovery professionals.
          This onboarding takes approximately 15 minutes and covers your business profile,
          document confirmation, professional commitment, and training assignment.
        </p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">What you&apos;ll need</h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-center gap-2"><span className="text-amber-400">▸</span> Australian Business Number (ABN)</li>
          <li className="flex items-center gap-2"><span className="text-amber-400">▸</span> Public liability insurance details</li>
          <li className="flex items-center gap-2"><span className="text-amber-400">▸</span> Trade licences or certifications (if held)</li>
          <li className="flex items-center gap-2"><span className="text-amber-400">▸</span> Your primary service specialisation</li>
        </ul>
      </div>
      <button
        onClick={onNext}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Start Onboarding →
      </button>
    </div>
  );
}

function StepBusinessDetails({ onNext }: { onNext: (data: object) => void }) {
  const [form, setForm] = useState({
    businessName: '', abn: '', phone: '',
    specialisation: 'WATER_DAMAGE', yearsInBusiness: 0, serviceAreas: [''],
  });

  const setField = (k: string, v: string | number | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ step: 'business-details', ...form });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-white">Business Details</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Business Name *</span>
          <input required value={form.businessName}
            onChange={(e) => setField('businessName', e.target.value)}
            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">ABN *</span>
          <input required value={form.abn} placeholder="XX XXX XXX XXX"
            onChange={(e) => setField('abn', e.target.value)}
            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Phone *</span>
          <input required value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Years in Business *</span>
          <input required type="number" min="0" max="60" value={form.yearsInBusiness}
            onChange={(e) => setField('yearsInBusiness', parseInt(e.target.value) || 0)}
            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs text-zinc-400 uppercase tracking-wider">Primary Specialisation *</span>
        <select value={form.specialisation}
          onChange={(e) => setField('specialisation', e.target.value)}
          className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
        >
          <option value="WATER_DAMAGE">Water Damage Restoration</option>
          <option value="MOULD">Mould Remediation</option>
          <option value="FIRE_SMOKE">Fire &amp; Smoke Restoration</option>
          <option value="TRAUMA">Trauma &amp; Biohazard Cleanup</option>
          <option value="CARPET">Carpet &amp; Upholstery Cleaning</option>
          <option value="COMMERCIAL">Commercial Cleaning</option>
          <option value="STORM">Storm &amp; Flood Damage</option>
          <option value="GENERAL">General Restoration</option>
        </select>
      </label>

      <label className="block">
        <span className="text-xs text-zinc-400 uppercase tracking-wider">Service Areas (states/postcodes)</span>
        <input value={form.serviceAreas.join(', ')}
          onChange={(e) => setField('serviceAreas', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
          placeholder="NSW, VIC, QLD or postcodes"
          className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
        />
      </label>

      <button type="submit"
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-lg transition-colors">
        Continue →
      </button>
    </form>
  );
}

function StepDocuments({ onNext }: { onNext: (data: object) => void }) {
  const [checks, setChecks] = useState({ publicLiabilityConfirmed: false, licenceConfirmed: false, wHSConfirmed: false });
  const allChecked = Object.values(checks).every(Boolean);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-white">Documents &amp; Insurance</h2>
      <p className="text-zinc-400 text-sm">
        NRPG requires all contractors to hold current public liability insurance, appropriate trade licences,
        and a WHS compliance plan. Please confirm the following:
      </p>
      <div className="space-y-3">
        {[
          { key: 'publicLiabilityConfirmed', label: 'I hold current public liability insurance (minimum $10M)' },
          { key: 'licenceConfirmed', label: 'I hold all required trade licences for my specialisation' },
          { key: 'wHSConfirmed', label: 'I have a current WHS policy and comply with Safe Work Australia standards' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox"
              checked={checks[key as keyof typeof checks]}
              onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">{label}</span>
          </label>
        ))}
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-500">
        Document verification may be requested by NRPG admin during the review process.
        Falsifying compliance declarations may result in immediate removal from the network.
      </div>
      <button onClick={() => onNext({ step: 'documents', ...checks })}
        disabled={!allChecked}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors">
        Continue →
      </button>
    </div>
  );
}

function StepCommitment({ onNext }: { onNext: (data: object) => void }) {
  const [sigs, setSigs] = useState({ agreementSigned: false, codeOfEthicsSigned: false, rateCardAgreed: false });
  const allSigned = Object.values(sigs).every(Boolean);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-white">Professional Commitment</h2>
      <p className="text-zinc-400 text-sm">
        NRPG maintains the highest standards in the industry. By joining, you commit to upholding our
        professional standards, code of ethics, and pricing structure.
      </p>
      <div className="space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2">NRPG Professional Commitment Agreement</h3>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            I agree to maintain IICRC-standard workmanship, respond to job assignments within agreed timeframes,
            communicate transparently with clients and NRPG management, and maintain all required certifications
            and insurances throughout my membership.
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={sigs.agreementSigned}
              onChange={(e) => setSigs((s) => ({ ...s, agreementSigned: e.target.checked }))}
              className="w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">I agree to the Professional Commitment Agreement</span>
          </label>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2">Code of Ethics</h3>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            I will act with integrity, treat clients with respect, provide honest assessments,
            never inflate damage or costs, and report concerns through proper NRPG channels.
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={sigs.codeOfEthicsSigned}
              onChange={(e) => setSigs((s) => ({ ...s, codeOfEthicsSigned: e.target.checked }))}
              className="w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">I acknowledge the Code of Ethics</span>
          </label>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2">Rate Card Agreement</h3>
          <p className="text-xs text-zinc-400 mb-3">
            Minimum job charge: <strong className="text-amber-400">AUD $750</strong> (ex GST).
            Standard rates as per NRPG rate schedule. No undercutting or side agreements with NRPG clients.
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={sigs.rateCardAgreed}
              onChange={(e) => setSigs((s) => ({ ...s, rateCardAgreed: e.target.checked }))}
              className="w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">I agree to the rate card and pricing policy</span>
          </label>
        </div>
      </div>
      <button onClick={() => onNext({ step: 'commitment', ...sigs })}
        disabled={!allSigned}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors">
        Sign &amp; Continue →
      </button>
    </div>
  );
}

function StepTraining({ onNext, loading }: { onNext: (data: object) => void; loading: boolean }) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-white">Training Assignment</h2>
      <p className="text-zinc-400 text-sm">
        NRPG training is delivered through <strong className="text-white">CARSI</strong> — our accredited
        online learning platform. Based on your specialisation, we&apos;ll assign the relevant CSE and WRT
        course modules automatically.
      </p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2">
        <div className="flex gap-3 text-sm">
          <span className="text-amber-400 font-bold w-16">CSE</span>
          <span className="text-zinc-300">Customer Service Excellence — 10 modules (10 hours)</span>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="text-amber-400 font-bold w-16">WRT</span>
          <span className="text-zinc-300">Water Restoration Technician — 12 modules (24 hours)</span>
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        You will receive login credentials for CARSI via email after this step.
        Progress syncs automatically to your NRPG profile.
      </p>
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" id="trainingAck" className="mt-0.5 w-4 h-4 accent-amber-400"
          onChange={(e) => {
            const btn = document.getElementById('training-next') as HTMLButtonElement | null;
            if (btn) btn.disabled = !e.target.checked;
          }}
        />
        <span className="text-sm text-zinc-300">
          I understand that completing CARSI training is mandatory for NRPG certification
          and must be completed within 90 days of joining.
        </span>
      </label>
      <button id="training-next" disabled
        onClick={() => onNext({ step: 'training', trainingAcknowledged: true })}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors">
        {loading ? 'Setting up CARSI account…' : 'Assign Training →'}
      </button>
    </div>
  );
}

function StepAssessment({ onNext }: { onNext: (data: object) => void }) {
  const [form, setForm] = useState({
    iicrcCertifications: [] as string[],
    industryAssociations: [] as string[],
    govCertIV: false,
    yearsExperience: 0,
  });

  const toggleCert = (cert: string) =>
    setForm((f) => ({
      ...f,
      iicrcCertifications: f.iicrcCertifications.includes(cert)
        ? f.iicrcCertifications.filter((c) => c !== cert)
        : [...f.iicrcCertifications, cert],
    }));

  const toggleAssoc = (assoc: string) =>
    setForm((f) => ({
      ...f,
      industryAssociations: f.industryAssociations.includes(assoc)
        ? f.industryAssociations.filter((a) => a !== assoc)
        : [...f.industryAssociations, assoc],
    }));

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-white">Certification Assessment</h2>
      <p className="text-zinc-400 text-sm">
        Tell us about your existing qualifications. This generates your initial NRPG certification score
        (out of 100 points).
      </p>

      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">IICRC Certifications held</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {['WRT', 'AMRT', 'FSRT', 'ASD', 'IICRC-S500', 'IICRC-S520'].map((cert) => (
            <label key={cert} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox"
                checked={form.iicrcCertifications.includes(cert)}
                onChange={() => toggleCert(cert)}
                className="w-4 h-4 accent-amber-400"
              />
              <span className="text-sm text-zinc-300">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Industry Associations</p>
        <div className="grid grid-cols-2 gap-2">
          {['ARCA', 'MBA', 'AIBS', 'HIA', 'RIA'].map((assoc) => (
            <label key={assoc} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox"
                checked={form.industryAssociations.includes(assoc)}
                onChange={() => toggleAssoc(assoc)}
                className="w-4 h-4 accent-amber-400"
              />
              <span className="text-sm text-zinc-300">{assoc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Years of Experience</span>
          <input type="number" min="0" max="60" value={form.yearsExperience}
            onChange={(e) => setForm((f) => ({ ...f, yearsExperience: parseInt(e.target.value) || 0 }))}
            className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white text-sm focus:border-amber-400 focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-3 cursor-pointer mt-5">
          <input type="checkbox" checked={form.govCertIV}
            onChange={(e) => setForm((f) => ({ ...f, govCertIV: e.target.checked }))}
            className="w-4 h-4 accent-amber-400"
          />
          <span className="text-sm text-zinc-300">I hold a Government Cert IV (relevant trade)</span>
        </label>
      </div>

      <button onClick={() => onNext({ step: 'assessment', ...form })}
        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-lg transition-colors">
        Calculate Score →
      </button>
    </div>
  );
}

function StepComplete({ certLevel, certPoints, router }: {
  certLevel: string | null;
  certPoints: number | null;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-20 h-20 rounded-full bg-amber-400/10 border-2 border-amber-400 flex items-center justify-center">
        <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to NRPG!</h2>
        <p className="text-zinc-400 text-sm">Your onboarding is complete. You are now an NRPG contractor.</p>
      </div>
      {certLevel && (
        <div className="inline-block bg-amber-400/10 border border-amber-400/40 rounded-lg px-6 py-4">
          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Certification Level</p>
          <p className="text-xl font-bold text-amber-400">{certLevel}</p>
          {certPoints != null && (
            <p className="text-sm text-zinc-400 mt-1">{certPoints} / 100 points</p>
          )}
        </div>
      )}
      <div className="space-y-3">
        <button onClick={() => router.push('/dashboard/contractor')}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-lg transition-colors">
          Go to Contractor Dashboard →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main portal page
// ---------------------------------------------------------------------------

export default function OnboardingPortalPage() {
  const router = useRouter();
  const [state, setState] = useState<PortalState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/nrpg/onboarding-portal');
      if (res.status === 401) { router.push('/auth/signin'); return; }
      const data = await res.json() as PortalState;
      setState(data);
    } catch {
      setError('Failed to load onboarding state.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void fetchState(); }, [fetchState]);

  const advanceStep = useCallback(async (stepData: object) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/nrpg/onboarding-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stepData),
      });
      const json = await res.json() as { nextStep?: OnboardingStep; error?: string; score?: { certificationLevel: string; totalPoints: number } };
      if (!res.ok) { setError(json.error ?? 'Something went wrong.'); return; }

      // Update local state
      setState((s) => {
        if (!s) return s;
        const nextStep = json.nextStep ?? 'complete';
        const completedSteps = [...s.completedSteps];
        if (!completedSteps.includes(s.currentStep)) completedSteps.push(s.currentStep);
        return {
          ...s,
          currentStep: nextStep,
          completedSteps,
          certificationLevel: json.score?.certificationLevel ?? s.certificationLevel,
          certificationPoints: json.score?.totalPoints ?? s.certificationPoints,
        };
      });
    } catch {
      setError('Network error — please try again.');
    } finally {
      setSubmitting(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentStep = state?.currentStep ?? 'welcome';
  const completedSteps = state?.completedSteps ?? [];
  const currentIdx = stepIndex(currentStep);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-amber-400 tracking-wide text-sm uppercase">NRPG Onboarding</span>
        <span className="text-xs text-zinc-500">
          Step {currentIdx + 1} of {STEP_ORDER.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-zinc-900">
        <div
          className="h-1 bg-amber-400 transition-all duration-500"
          style={{ width: `${((currentIdx + 1) / STEP_ORDER.length) * 100}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Step nav pills */}
        <nav className="flex flex-wrap gap-2 mb-8">
          {STEP_ORDER.map((step, i) => {
            const done = completedSteps.includes(step);
            const active = step === currentStep;
            return (
              <span key={step} className={[
                'text-xs px-3 py-1 rounded-full border font-medium',
                active ? 'border-amber-400 bg-amber-400/10 text-amber-400' :
                  done ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                    'border-zinc-800 text-zinc-600',
              ].join(' ')}>
                {i + 1}. {STEP_LABELS[step]}
              </span>
            );
          })}
        </nav>

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Current step content */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8">
          {currentStep === 'welcome' && <StepWelcome onNext={() => advanceStep({ step: 'welcome' })} />}
          {currentStep === 'business-details' && <StepBusinessDetails onNext={advanceStep} />}
          {currentStep === 'documents' && <StepDocuments onNext={advanceStep} />}
          {currentStep === 'commitment' && <StepCommitment onNext={advanceStep} />}
          {currentStep === 'training' && <StepTraining onNext={advanceStep} loading={submitting} />}
          {currentStep === 'assessment' && <StepAssessment onNext={advanceStep} />}
          {currentStep === 'complete' && (
            <StepComplete
              certLevel={state?.certificationLevel ?? null}
              certPoints={state?.certificationPoints ?? null}
              router={router}
            />
          )}
        </div>
      </div>
    </div>
  );
}
