'use client';

/**
 * CommitmentFrameworkSigning — DR-192
 *
 * Digital signing flow for the NRPG Professional Commitment Framework.
 * All 5 sections must be accepted before submission.
 * Blocks training access until SIGNED.
 *
 * Design: Scientific Luxury — OLED black #050505, accent #00BFA6
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Shield,
  Briefcase,
  HardHat,
  DollarSign,
  Lock,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Agreement content
// ---------------------------------------------------------------------------

interface AgreementSection {
  id: keyof SigningState;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  checkLabel: string;
}

const AGREEMENT_SECTIONS: AgreementSection[] = [
  {
    id: 'commitmentAgreementAccepted',
    icon: FileText,
    title: 'Professional Commitment Agreement',
    body: `As a member of the National Restoration Professionals Group (NRPG), I commit to:

• Delivering restoration services to the highest professional standard on every engagement.
• Acting with honesty, integrity, and transparency with property owners, insurers, and NRPG staff.
• Completing all NRPG-assigned training and maintaining required certifications.
• Responding to job allocations within agreed timeframes.
• Providing accurate, timely job progress updates through the NRPG platform.
• Not canvassing NRPG-referred clients for work outside the platform during or within 12 months of a referred engagement.`,
    checkLabel: 'I accept the NRPG Professional Commitment Agreement',
  },
  {
    id: 'codeOfEthicsAccepted',
    icon: Shield,
    title: 'Code of Ethics',
    body: `I acknowledge and will uphold the NRPG Code of Ethics:

• I will treat all property owners, their families, and their assets with dignity and respect.
• I will provide fair, transparent pricing and not engage in price-gouging during disaster events.
• I will not misrepresent my qualifications, certifications, or capabilities.
• I will not engage in any conduct that could bring NRPG or the restoration industry into disrepute.
• I will report any conflicts of interest, safety concerns, or ethical breaches to NRPG promptly.
• I will comply with all applicable Australian laws and regulations including privacy obligations.`,
    checkLabel: 'I acknowledge and will uphold the NRPG Code of Ethics',
  },
  {
    id: 'insuranceRequirementsConfirmed',
    icon: Briefcase,
    title: 'Insurance Requirements',
    body: `I confirm that I hold and will maintain for the duration of my NRPG membership:

• Public Liability Insurance — minimum $10,000,000 (ten million dollars) cover.
• Workers Compensation Insurance — as required by law for all employees and applicable workers.
• I will notify NRPG immediately if any insurance policy lapses, is cancelled, or falls below minimum requirements.
• I understand that failure to maintain required insurance will result in immediate suspension from the NRPG network.`,
    checkLabel: 'I confirm I hold the required insurance and will maintain it throughout my membership',
  },
  {
    id: 'whsComplianceAccepted',
    icon: HardHat,
    title: 'Work Health & Safety Compliance',
    body: `I acknowledge my obligations under the Work Health and Safety Act 2011 (and equivalent state legislation):

• I will maintain a safe work environment for all workers, subcontractors, and property owners at all times.
• I will ensure all workers hold required WHS inductions and use appropriate personal protective equipment.
• I will conduct site risk assessments before commencing work on all NRPG-referred jobs.
• I will report any workplace incidents, near-misses, or safety concerns to both the relevant authority and NRPG.
• I will maintain records of all WHS activities as required by applicable legislation.`,
    checkLabel: 'I acknowledge my WHS obligations and commit to maintaining a safe work environment',
  },
  {
    id: 'rateCardAgreed',
    icon: DollarSign,
    title: 'Rate Card Agreement',
    body: `I agree to the NRPG rate card terms:

• Minimum job charge: $750 (seven hundred and fifty dollars AUD) excluding GST.
• Rates will be applied as per the current NRPG Rate Schedule provided during onboarding.
• All invoicing will be completed through the NRPG platform within 48 hours of job completion.
• I will not charge property owners or insurers rates above the NRPG Rate Schedule without prior written approval.
• NRPG platform fees apply as per the current fee schedule communicated at account approval.`,
    checkLabel: 'I agree to the NRPG rate card, including the minimum $750 job charge',
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SigningKey =
  | 'commitmentAgreementAccepted'
  | 'codeOfEthicsAccepted'
  | 'insuranceRequirementsConfirmed'
  | 'whsComplianceAccepted'
  | 'rateCardAgreed';

type SigningState = Record<SigningKey, boolean>;

const INITIAL_STATE: SigningState = {
  commitmentAgreementAccepted: false,
  codeOfEthicsAccepted: false,
  insuranceRequirementsConfirmed: false,
  whsComplianceAccepted: false,
  rateCardAgreed: false,
};

interface ExistingRecord {
  id: string;
  status: string;
  signedAt: string | null;
  documentUrl: string | null;
}

// ---------------------------------------------------------------------------
// Already-signed state
// ---------------------------------------------------------------------------

function AlreadySigned({ record }: { record: ExistingRecord }) {
  return (
    <div className="bg-[#050505] min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-sm space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#00BFA6]" />
        </div>
        <h2 className="text-xl font-semibold text-white">Framework Signed</h2>
        <p className="text-zinc-400 text-sm">
          Your Professional Commitment Framework was signed on{' '}
          {record.signedAt
            ? new Date(record.signedAt).toLocaleDateString('en-AU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : '—'}
          . Training portal access is active.
        </p>
        <p className="text-xs text-zinc-600 font-mono">Ref: {record.id}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Agreement section card
// ---------------------------------------------------------------------------

function SectionCard({
  section,
  checked,
  onChange,
}: {
  section: AgreementSection;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = section.icon;

  return (
    <div
      className={`rounded-xl border transition-colors ${
        checked
          ? 'border-[#00BFA6]/40 bg-[#00BFA6]/5'
          : 'border-zinc-800 bg-zinc-950'
      }`}
    >
      {/* Section header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
            checked ? 'bg-[#00BFA6]/20' : 'bg-zinc-900'
          }`}
        >
          <Icon className={`w-4 h-4 ${checked ? 'text-[#00BFA6]' : 'text-zinc-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm ${checked ? 'text-[#00BFA6]' : 'text-white'}`}>
            {section.title}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            {expanded ? 'Click to collapse' : 'Click to read full text'}
          </p>
        </div>
        {checked && <CheckCircle2 className="w-5 h-5 text-[#00BFA6] flex-shrink-0" />}
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
            <pre className="text-zinc-300 text-xs whitespace-pre-wrap font-sans leading-relaxed">
              {section.body}
            </pre>
          </div>

          <div className="flex items-start gap-3">
            <input
              id={section.id}
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#00BFA6] flex-shrink-0"
            />
            <label
              htmlFor={section.id}
              className="text-sm text-zinc-200 cursor-pointer leading-snug"
            >
              {section.checkLabel}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function CommitmentFrameworkSigning() {
  const [state, setState] = useState<SigningState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [existingRecord, setExistingRecord] = useState<ExistingRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [signedRecord, setSignedRecord] = useState<ExistingRecord | null>(null);

  const allAccepted = Object.values(state).every(Boolean);
  const acceptedCount = Object.values(state).filter(Boolean).length;

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/nrpg/commitment-framework');
      if (res.ok) {
        const data = await res.json();
        if (data.signed && data.record) {
          setExistingRecord(data.record as ExistingRecord);
        }
      }
    } catch {
      // Non-fatal — allow signing even if status check fails
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  function toggle(key: SigningKey, val: boolean) {
    setState((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSign(e: React.FormEvent) {
    e.preventDefault();
    if (!allAccepted) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/nrpg/commitment-framework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.alreadySigned) {
          await fetchStatus();
          return;
        }
        setSubmitError(json.error ?? 'An error occurred. Please try again.');
        return;
      }

      setSignedRecord(json.record as ExistingRecord);
      setSubmitSuccess(true);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#00BFA6] animate-spin" />
      </div>
    );
  }

  if (existingRecord) {
    return <AlreadySigned record={existingRecord} />;
  }

  if (submitSuccess && signedRecord) {
    return <AlreadySigned record={signedRecord} />;
  }

  return (
    <div className="bg-[#050505]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-[#00BFA6]" />
            <p className="text-xs font-medium tracking-widest text-[#00BFA6] uppercase">
              Required Before Training Access
            </p>
          </div>
          <h1 className="text-2xl font-bold text-white">Professional Commitment Framework</h1>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Read each section carefully, then check the box to acknowledge. You must accept all 5
            sections to access the NRPG training portal.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-zinc-400">Sections accepted</span>
              <span className="text-xs font-medium text-white">
                {acceptedCount} / {AGREEMENT_SECTIONS.length}
              </span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00BFA6] rounded-full transition-all duration-300"
                style={{ width: `${(acceptedCount / AGREEMENT_SECTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          {allAccepted && (
            <CheckCircle2 className="w-6 h-6 text-[#00BFA6] flex-shrink-0" />
          )}
        </div>

        {/* Agreement sections */}
        <form onSubmit={handleSign} noValidate>
          <div className="space-y-3 mb-8">
            {AGREEMENT_SECTIONS.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                checked={state[section.id]}
                onChange={(val) => toggle(section.id, val)}
              />
            ))}
          </div>

          {!allAccepted && (
            <div className="flex items-start gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-400 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-500" />
              <span>
                Expand each section, read the full text, and check the acknowledgement box.{' '}
                {AGREEMENT_SECTIONS.length - acceptedCount} section
                {AGREEMENT_SECTIONS.length - acceptedCount !== 1 ? 's' : ''} remaining.
              </span>
            </div>
          )}

          {submitError && (
            <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {submitError}
            </div>
          )}

          {/* Legal notice */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6 text-xs text-zinc-500 leading-relaxed">
            <p className="font-medium text-zinc-400 mb-1">Legal Notice</p>
            <p>
              By clicking &ldquo;Sign &amp; Submit&rdquo; you are providing a legally binding digital
              signature confirming you have read, understood, and agreed to all sections of the NRPG
              Professional Commitment Framework. Your IP address, browser information, and timestamp
              will be recorded as part of the audit trail. This record is stored securely in the
              NRPG platform.
            </p>
          </div>

          <button
            type="submit"
            disabled={!allAccepted || submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-bold text-sm rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Sign &amp; Submit — Activate Training Access
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
