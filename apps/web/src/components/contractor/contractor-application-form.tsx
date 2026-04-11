'use client';

/**
 * ContractorApplicationForm — DR-198
 *
 * Public-facing multi-step application form for contractors wishing to join
 * the NRPG network. Screens for minimum requirements before submission.
 *
 * Design: Scientific Luxury — OLED black #050505, accent #00BFA6
 * Rules: No phone/email displayed. All CTAs via form only.
 */

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const SPECIALISATIONS = [
  { value: 'WATER_DAMAGE', label: 'Water Damage Restoration' },
  { value: 'FIRE_SMOKE', label: 'Fire & Smoke Restoration' },
  { value: 'MOULD', label: 'Mould Remediation' },
  { value: 'TRAUMA', label: 'Trauma & Biohazard Cleaning' },
  { value: 'STORM', label: 'Storm Damage Restoration' },
  { value: 'RECONSTRUCTION', label: 'Structural Reconstruction' },
  { value: 'OTHER', label: 'Other Restoration Services' },
] as const;

const AU_STATES = ['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const;
type AuState = (typeof AU_STATES)[number];
type Specialisation = (typeof SPECIALISATIONS)[number]['value'];

interface FormData {
  // Step 1 — Business info
  businessName: string;
  contactName: string;
  abn: string;
  yearsInBusiness: string;

  // Step 2 — Specialisations & coverage
  specialisations: Specialisation[];
  serviceStates: AuState[];

  // Step 3 — Minimum requirements
  hasPublicLiabilityInsurance: boolean;
  hasWorkersCompInsurance: boolean;
  hasIicrcCertification: boolean;
  currentInsurancePolicyNumber: string;

  // Step 4 — Supporting statement
  whyJoinNrpg: string;
}

interface FieldErrors {
  [key: string]: string | undefined;
}

const INITIAL_FORM: FormData = {
  businessName: '',
  contactName: '',
  abn: '',
  yearsInBusiness: '',
  specialisations: [],
  serviceStates: [],
  hasPublicLiabilityInsurance: false,
  hasWorkersCompInsurance: false,
  hasIicrcCertification: false,
  currentInsurancePolicyNumber: '',
  whyJoinNrpg: '',
};

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function validateStep1(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.businessName.trim()) errors.businessName = 'Business name is required';
  if (!data.contactName.trim()) errors.contactName = 'Contact name is required';
  const abnClean = data.abn.replace(/\s/g, '');
  if (!/^\d{11}$/.test(abnClean)) errors.abn = 'ABN must be 11 digits';
  const years = parseInt(data.yearsInBusiness, 10);
  if (isNaN(years) || years < 0 || years > 100) errors.yearsInBusiness = 'Enter a valid number of years';
  return errors;
}

function validateStep2(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (data.specialisations.length === 0) errors.specialisations = 'Select at least one specialisation';
  if (data.serviceStates.length === 0) errors.serviceStates = 'Select at least one state';
  return errors;
}

function validateStep3(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.hasPublicLiabilityInsurance) {
    errors.hasPublicLiabilityInsurance = 'Public liability insurance is a minimum requirement to join NRPG';
  }
  if (!data.currentInsurancePolicyNumber.trim()) {
    errors.currentInsurancePolicyNumber = 'Insurance policy number is required';
  }
  return errors;
}

function validateStep4(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (data.whyJoinNrpg.trim().length < 50) {
    errors.whyJoinNrpg = 'Please write at least 50 characters';
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              i < current
                ? 'bg-[#00BFA6] text-[#050505]'
                : i === current
                  ? 'border-2 border-[#00BFA6] text-[#00BFA6]'
                  : 'border border-zinc-700 text-zinc-500'
            }`}
          >
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`flex-1 h-px transition-colors ${i < current ? 'bg-[#00BFA6]' : 'bg-zinc-800'}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-zinc-900 border ${hasError ? 'border-red-500' : 'border-zinc-700'} rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00BFA6] transition-colors text-sm`;
}

// ---------------------------------------------------------------------------
// Step 1 — Business Information
// ---------------------------------------------------------------------------

function Step1({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FieldErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Business Information</h2>
        <p className="text-zinc-400 text-sm">Tell us about your restoration business.</p>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Business Name <span className="text-[#00BFA6]">*</span>
        </label>
        <input
          type="text"
          className={inputClass(!!errors.businessName)}
          placeholder="Acme Restoration Pty Ltd"
          value={data.businessName}
          onChange={(e) => onChange({ businessName: e.target.value })}
          autoComplete="organization"
        />
        <FieldError message={errors.businessName} />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Primary Contact Name <span className="text-[#00BFA6]">*</span>
        </label>
        <input
          type="text"
          className={inputClass(!!errors.contactName)}
          placeholder="Jane Smith"
          value={data.contactName}
          onChange={(e) => onChange({ contactName: e.target.value })}
          autoComplete="name"
        />
        <FieldError message={errors.contactName} />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Australian Business Number (ABN) <span className="text-[#00BFA6]">*</span>
        </label>
        <input
          type="text"
          className={inputClass(!!errors.abn)}
          placeholder="12 345 678 901"
          value={data.abn}
          onChange={(e) => onChange({ abn: e.target.value })}
          inputMode="numeric"
          maxLength={14}
        />
        <FieldError message={errors.abn} />
        <p className="text-xs text-zinc-500 mt-1">11-digit ABN — used for identity verification only.</p>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Years in Business <span className="text-[#00BFA6]">*</span>
        </label>
        <input
          type="number"
          className={inputClass(!!errors.yearsInBusiness)}
          placeholder="5"
          value={data.yearsInBusiness}
          onChange={(e) => onChange({ yearsInBusiness: e.target.value })}
          min={0}
          max={100}
        />
        <FieldError message={errors.yearsInBusiness} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Specialisations & Service Coverage
// ---------------------------------------------------------------------------

function Step2({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FieldErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  function toggleSpecialisation(value: Specialisation) {
    const next = data.specialisations.includes(value)
      ? data.specialisations.filter((s) => s !== value)
      : [...data.specialisations, value];
    onChange({ specialisations: next });
  }

  function toggleState(value: AuState) {
    const next = data.serviceStates.includes(value)
      ? data.serviceStates.filter((s) => s !== value)
      : [...data.serviceStates, value];
    onChange({ serviceStates: next });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Specialisations & Coverage</h2>
        <p className="text-zinc-400 text-sm">Select all that apply.</p>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-2">
          Restoration Specialisations <span className="text-[#00BFA6]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SPECIALISATIONS.map((s) => {
            const selected = data.specialisations.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => toggleSpecialisation(s.value)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                  selected
                    ? 'border-[#00BFA6] bg-[#00BFA6]/10 text-[#00BFA6]'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.specialisations} />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-2">
          States You Service <span className="text-[#00BFA6]">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {AU_STATES.map((state) => {
            const selected = data.serviceStates.includes(state);
            return (
              <button
                key={state}
                type="button"
                onClick={() => toggleState(state)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selected
                    ? 'border-[#00BFA6] bg-[#00BFA6]/10 text-[#00BFA6]'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500'
                }`}
              >
                {state}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.serviceStates} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Minimum Requirements (document pre-check)
// ---------------------------------------------------------------------------

function Step3({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FieldErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Minimum Requirements</h2>
        <p className="text-zinc-400 text-sm">
          NRPG sets minimum standards for all network contractors to protect property owners.
        </p>
      </div>

      {/* Public Liability — hard requirement */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            id="liability"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={data.hasPublicLiabilityInsurance}
            onChange={(e) => onChange({ hasPublicLiabilityInsurance: e.target.checked })}
          />
          <div>
            <label htmlFor="liability" className="text-sm font-medium text-white cursor-pointer">
              Public Liability Insurance <span className="text-[#00BFA6]">*</span>
            </label>
            <p className="text-xs text-zinc-400 mt-0.5">
              Minimum $10 million public liability cover is required. This is a hard requirement.
            </p>
          </div>
        </div>
        <FieldError message={errors.hasPublicLiabilityInsurance} />
      </div>

      {/* Insurance policy number */}
      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Current Insurance Policy Number <span className="text-[#00BFA6]">*</span>
        </label>
        <input
          type="text"
          className={inputClass(!!errors.currentInsurancePolicyNumber)}
          placeholder="PLI-123456789"
          value={data.currentInsurancePolicyNumber}
          onChange={(e) => onChange({ currentInsurancePolicyNumber: e.target.value })}
        />
        <FieldError message={errors.currentInsurancePolicyNumber} />
      </div>

      {/* Workers comp — soft requirement */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            id="workerscomp"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={data.hasWorkersCompInsurance}
            onChange={(e) => onChange({ hasWorkersCompInsurance: e.target.checked })}
          />
          <div>
            <label htmlFor="workerscomp" className="text-sm font-medium text-white cursor-pointer">
              Workers Compensation Insurance
            </label>
            <p className="text-xs text-zinc-400 mt-0.5">
              Required if you employ staff. Sole traders may be exempt — declare accurately.
            </p>
          </div>
        </div>
      </div>

      {/* IICRC — soft requirement */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            id="iicrc"
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#00BFA6]"
            checked={data.hasIicrcCertification}
            onChange={(e) => onChange({ hasIicrcCertification: e.target.checked })}
          />
          <div>
            <label htmlFor="iicrc" className="text-sm font-medium text-white cursor-pointer">
              IICRC Certification
            </label>
            <p className="text-xs text-zinc-400 mt-0.5">
              Industry-standard certification. Not mandatory to apply, but improves matching priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Supporting Statement
// ---------------------------------------------------------------------------

function Step4({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: FieldErrors;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const count = data.whyJoinNrpg.trim().length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Supporting Statement</h2>
        <p className="text-zinc-400 text-sm">
          Tell us why you want to join the NRPG network and what makes your business a strong fit.
        </p>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1.5">
          Why do you want to join NRPG? <span className="text-[#00BFA6]">*</span>
        </label>
        <textarea
          className={`${inputClass(!!errors.whyJoinNrpg)} resize-none`}
          rows={7}
          placeholder="Describe your business, your values, your track record, and what you hope to achieve as part of the NRPG network..."
          value={data.whyJoinNrpg}
          onChange={(e) => onChange({ whyJoinNrpg: e.target.value })}
          maxLength={2000}
        />
        <div className="flex justify-between items-center mt-1">
          <FieldError message={errors.whyJoinNrpg} />
          <span className={`text-xs ml-auto ${count < 50 ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {count} / 2000
          </span>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-400 space-y-1">
        <p className="font-medium text-zinc-300">What happens next?</p>
        <p>1. Our team reviews your application within 2–3 business days.</p>
        <p>2. If your minimum requirements are met, you will be contacted to proceed.</p>
        <p>3. Approved contractors receive access to the NRPG onboarding portal.</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

function SuccessState({ applicationId }: { applicationId: string }) {
  return (
    <div className="text-center py-10 space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#00BFA6]/10 border border-[#00BFA6]/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#00BFA6]" />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-white">Application Received</h2>
      <p className="text-zinc-400 text-sm max-w-sm mx-auto">
        Thank you for applying to join the NRPG network. Our team will review your application and
        contact you within 2–3 business days if your business meets our minimum requirements.
      </p>
      <p className="text-xs text-zinc-600 font-mono">Ref: {applicationId}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 4;

export function ContractorApplicationForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  function patchForm(patch: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...patch }));
    // Clear errors for patched fields
    const clearedErrors = { ...errors };
    for (const key of Object.keys(patch)) {
      delete clearedErrors[key];
    }
    setErrors(clearedErrors);
  }

  function validateCurrentStep(): FieldErrors {
    switch (step) {
      case 0: return validateStep1(formData);
      case 1: return validateStep2(formData);
      case 2: return validateStep3(formData);
      case 3: return validateStep4(formData);
      default: return {};
    }
  }

  function handleNext() {
    const stepErrors = validateCurrentStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stepErrors = validateCurrentStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        businessName: formData.businessName.trim(),
        contactName: formData.contactName.trim(),
        abn: formData.abn.replace(/\s/g, ''),
        yearsInBusiness: parseInt(formData.yearsInBusiness, 10),
        specialisations: formData.specialisations,
        serviceStates: formData.serviceStates,
        hasPublicLiabilityInsurance: formData.hasPublicLiabilityInsurance,
        hasWorkersCompInsurance: formData.hasWorkersCompInsurance,
        hasIicrcCertification: formData.hasIicrcCertification,
        currentInsurancePolicyNumber: formData.currentInsurancePolicyNumber.trim(),
        whyJoinNrpg: formData.whyJoinNrpg.trim(),
        source: 'nrpg-application-form',
      };

      const res = await fetch('/api/nrpg/contractor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.details) {
          const fieldErrors: FieldErrors = {};
          for (const d of json.details as { field: string; message: string }[]) {
            fieldErrors[d.field] = d.message;
          }
          setErrors(fieldErrors);
        } else {
          setSubmitError(json.error ?? 'An unexpected error occurred. Please try again.');
        }
        return;
      }

      setApplicationId(json.applicationId as string);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (applicationId) {
    return <SuccessState applicationId={applicationId} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-[#00BFA6] uppercase mb-2">
            NRPG Network
          </p>
          <h1 className="text-2xl font-bold text-white">Contractor Application</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Join Australia&apos;s professional restoration contractor network.
          </p>
        </div>

        <StepIndicator current={step} total={TOTAL_STEPS} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="min-h-[400px]">
            {step === 0 && <Step1 data={formData} errors={errors} onChange={patchForm} />}
            {step === 1 && <Step2 data={formData} errors={errors} onChange={patchForm} />}
            {step === 2 && <Step3 data={formData} errors={errors} onChange={patchForm} />}
            {step === 3 && <Step4 data={formData} errors={errors} onChange={patchForm} />}
          </div>

          {submitError && (
            <div className="flex items-start gap-2 mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {submitError}
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2.5 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-semibold text-sm rounded-lg transition-colors"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-semibold text-sm rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
