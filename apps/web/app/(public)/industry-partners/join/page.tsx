'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ElementType } from 'react'
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  User,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Wrench,
  Award,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Country = 'AU' | 'NZ' | 'JP'
type BusinessType = 'sole-trader' | 'pty-ltd' | 'partnership' | 'trust' | 'other'
type PrimaryService = 'water-damage' | 'fire-smoke' | 'mould' | 'storm' | 'biohazard' | 'trauma' | 'asbestos' | 'general'
type Tier = 'community' | 'standard' | 'premium'

interface FormData {
  // Step 1 — Business details
  businessName: string
  businessType: BusinessType | ''
  abn: string
  country: Country | ''
  state: string
  primaryService: PrimaryService | ''
  yearsInBusiness: string
  // Step 2 — Primary contact
  contactName: string
  contactRole: string
  // Step 3 — Certifications & qualifications
  iicrcCertifications: string[]
  otherCertifications: string
  hasInsurance: boolean | null
  insuranceValue: string
  // Step 4 — Membership tier
  selectedTier: Tier | ''
  // Step 5 — Agreement
  agreedToTerms: boolean
  agreedToCodeOfConduct: boolean
}

interface FieldErrors {
  [key: string]: string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const AU_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']
const NZ_REGIONS = ['Auckland', 'Bay of Plenty', 'Canterbury', 'Gisborne', 'Hawke\'s Bay', 'Manawatū-Whanganui', 'Marlborough', 'Nelson', 'Northland', 'Otago', 'Southland', 'Taranaki', 'Tasman', 'Waikato', 'Wellington', 'West Coast']
const JP_PREFECTURES = ['Aichi', 'Chiba', 'Fukuoka', 'Hiroshima', 'Hokkaido', 'Hyogo', 'Kanagawa', 'Kyoto', 'Nara', 'Osaka', 'Okinawa', 'Saitama', 'Shizuoka', 'Tokyo', 'Other']

const IICRC_CERTS = ['WRT', 'ASD', 'AMRT', 'FSRT', 'BSRT', 'CDS', 'CCT', 'TCST', 'SMT', 'HST', 'OCT']

const SERVICE_LABELS: Record<PrimaryService, string> = {
  'water-damage': 'Water Damage Restoration',
  'fire-smoke': 'Fire & Smoke Restoration',
  'mould': 'Mould Remediation',
  'storm': 'Storm Damage',
  'biohazard': 'Biohazard & Trauma Cleaning',
  'trauma': 'Trauma & Crime Scene',
  'asbestos': 'Asbestos Removal',
  'general': 'General Restoration',
}

const TIERS: { id: Tier; name: string; price: string; note: string; features: string[] }[] = [
  {
    id: 'community',
    name: 'Community',
    price: 'Free',
    note: 'No credit card required',
    features: [
      'Basic directory listing',
      'Access to free templates',
      'Industry newsletter (The DR Brief)',
      'Public tools & calculators',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$49/mo',
    note: 'or $490/yr (save 2 months)',
    features: [
      'Enhanced directory listing with logo',
      'Receive job referrals',
      'Priority placement in search',
      'Premium templates library',
      'All Community features',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$149/mo',
    note: 'or $1,490/yr (save 2 months)',
    features: [
      'Featured listing (top placement)',
      'Verified badge on profile',
      'First access to job referrals',
      'Quarterly benchmark reports',
      'Priority support',
      'All Standard features',
    ],
  },
]

const STEPS = [
  { label: 'Business', icon: Building2 },
  { label: 'Contact', icon: User },
  { label: 'Certifications', icon: Award },
  { label: 'Membership', icon: ShieldCheck },
  { label: 'Confirm', icon: CheckCircle },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStates(country: Country | ''): string[] {
  if (country === 'AU') return AU_STATES
  if (country === 'NZ') return NZ_REGIONS
  if (country === 'JP') return JP_PREFECTURES
  return []
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
    hasError
      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-slate-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
  }`

const selectClass = (hasError: boolean) =>
  `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors appearance-none bg-white ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
  }`

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {msg}
    </p>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function JoinPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const [form, setForm] = useState<FormData>({
    businessName: '',
    businessType: '',
    abn: '',
    country: '',
    state: '',
    primaryService: '',
    yearsInBusiness: '',
    contactName: '',
    contactRole: '',
    iicrcCertifications: [],
    otherCertifications: '',
    hasInsurance: null,
    insuranceValue: '',
    selectedTier: '',
    agreedToTerms: false,
    agreedToCodeOfConduct: false,
  })

  const set = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const clearError = (field: string) =>
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e })

  const toggleCert = (cert: string) => {
    const current = form.iicrcCertifications
    set('iicrcCertifications', current.includes(cert) ? current.filter(c => c !== cert) : [...current, cert])
  }

  // ── Validation per step ──────────────────────────────────────────────────────

  const validateStep = (s: number): boolean => {
    const e: FieldErrors = {}
    if (s === 0) {
      if (!form.businessName.trim()) e.businessName = 'Business name is required.'
      if (!form.businessType) e.businessType = 'Please select a business type.'
      if (!form.country) e.country = 'Please select a country.'
      if (form.country === 'AU' && !form.abn.trim()) e.abn = 'ABN is required for Australian businesses.'
      if (form.country && !form.state) e.state = 'Please select your state or region.'
      if (!form.primaryService) e.primaryService = 'Please select your primary service.'
      if (!form.yearsInBusiness) e.yearsInBusiness = 'Please indicate years in business.'
    }
    if (s === 1) {
      if (!form.contactName.trim()) e.contactName = 'Contact name is required.'
      if (!form.contactRole.trim()) e.contactRole = 'Role / title is required.'
    }
    if (s === 2) {
      if (form.hasInsurance === null) e.hasInsurance = 'Please indicate whether you hold public liability insurance.'
    }
    if (s === 3) {
      if (!form.selectedTier) e.selectedTier = 'Please select a membership tier.'
    }
    if (s === 4) {
      if (!form.agreedToTerms) e.agreedToTerms = 'You must agree to the Terms of Service.'
      if (!form.agreedToCodeOfConduct) e.agreedToCodeOfConduct = 'You must agree to the NRPG Code of Conduct.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  const back = () => {
    setErrors({})
    setStep(s => Math.max(s - 1, 0))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return
    setSubmitting(true)
    // API route /api/industry-partners/join to be wired in DR-37 sprint
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <section className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Application Received</h1>
          <p className="text-slate-600 mb-2">
            Thanks, <strong>{form.contactName}</strong>. Your application for <strong>{form.businessName}</strong> has been submitted.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Our team reviews applications within 2 business days. You'll receive a confirmation shortly with next steps
            {form.selectedTier !== 'community' ? ', including payment details for your chosen plan.' : '.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/industry-partners" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors">
              Industry Hub
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm hover:border-slate-300 transition-colors">
              <Wrench className="w-4 h-4" />
              Explore Tools
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const stateOptions = getStates(form.country as Country)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Contractor Registration — AU, NZ & Japan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Join the NRPG Network</h1>
          <p className="text-slate-300">
            Register your restoration business to access job referrals, the full template library, and the industry hub.
          </p>
        </div>
      </section>

      {/* Step indicator */}
      <section className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon as ElementType<{ className?: string }>
              const done = i < step
              const active = i === step
              return (
                <li key={s.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                      done ? 'bg-emerald-600 border-emerald-600' : active ? 'bg-white border-emerald-600' : 'bg-white border-slate-300'
                    }`}>
                      {done ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${active ? 'text-emerald-600' : done ? 'text-slate-600' : 'text-slate-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 transition-colors ${i < step ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Form body */}
      <section className="bg-slate-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">

            {/* ── Step 0: Business details ── */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Business Details</h2>
                <p className="text-sm text-slate-500 mb-6">Tell us about your restoration business.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Business / trading name *</label>
                    <input
                      value={form.businessName}
                      onChange={e => { set('businessName', e.target.value); clearError('businessName') }}
                      placeholder="Acme Restoration Pty Ltd"
                      className={inputClass(!!errors.businessName)}
                    />
                    <FieldError msg={errors.businessName} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Business type *</label>
                      <select
                        value={form.businessType}
                        onChange={e => { set('businessType', e.target.value as BusinessType); clearError('businessType') }}
                        className={selectClass(!!errors.businessType)}
                      >
                        <option value="">Select...</option>
                        <option value="sole-trader">Sole Trader</option>
                        <option value="pty-ltd">Pty Ltd</option>
                        <option value="partnership">Partnership</option>
                        <option value="trust">Trust</option>
                        <option value="other">Other</option>
                      </select>
                      <FieldError msg={errors.businessType} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Years in business *</label>
                      <select
                        value={form.yearsInBusiness}
                        onChange={e => { set('yearsInBusiness', e.target.value); clearError('yearsInBusiness') }}
                        className={selectClass(!!errors.yearsInBusiness)}
                      >
                        <option value="">Select...</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1–3 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="5-10">5–10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <FieldError msg={errors.yearsInBusiness} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                      <select
                        value={form.country}
                        onChange={e => { set('country', e.target.value as Country); set('state', ''); clearError('country') }}
                        className={selectClass(!!errors.country)}
                      >
                        <option value="">Select...</option>
                        <option value="AU">Australia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="JP">Japan</option>
                      </select>
                      <FieldError msg={errors.country} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">State / Region *</label>
                      <select
                        value={form.state}
                        onChange={e => { set('state', e.target.value); clearError('state') }}
                        disabled={!form.country}
                        className={selectClass(!!errors.state)}
                      >
                        <option value="">Select...</option>
                        {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <FieldError msg={errors.state} />
                    </div>
                  </div>

                  {form.country === 'AU' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">ABN *</label>
                      <input
                        value={form.abn}
                        onChange={e => { set('abn', e.target.value); clearError('abn') }}
                        placeholder="12 345 678 901"
                        className={inputClass(!!errors.abn)}
                      />
                      <FieldError msg={errors.abn} />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary service *</label>
                    <select
                      value={form.primaryService}
                      onChange={e => { set('primaryService', e.target.value as PrimaryService); clearError('primaryService') }}
                      className={selectClass(!!errors.primaryService)}
                    >
                      <option value="">Select...</option>
                      {(Object.entries(SERVICE_LABELS) as [PrimaryService, string][]).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    <FieldError msg={errors.primaryService} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 1: Contact ── */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Primary Contact</h2>
                <p className="text-sm text-slate-500 mb-6">The person responsible for this account. You'll use your email address to log in.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full name *</label>
                    <input
                      value={form.contactName}
                      onChange={e => { set('contactName', e.target.value); clearError('contactName') }}
                      placeholder="Jane Smith"
                      className={inputClass(!!errors.contactName)}
                    />
                    <FieldError msg={errors.contactName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role / title *</label>
                    <input
                      value={form.contactRole}
                      onChange={e => { set('contactRole', e.target.value); clearError('contactRole') }}
                      placeholder="Director, Operations Manager, Owner..."
                      className={inputClass(!!errors.contactRole)}
                    />
                    <FieldError msg={errors.contactRole} />
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
                    <strong>Note:</strong> Email address and password will be set during the account activation step, which you'll receive after your application is approved.
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Certifications ── */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Certifications & Insurance</h2>
                <p className="text-sm text-slate-500 mb-6">Tell us about your qualifications and public liability cover.</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">IICRC certifications held (select all that apply)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {IICRC_CERTS.map(cert => {
                        const active = form.iicrcCertifications.includes(cert)
                        return (
                          <button
                            key={cert}
                            type="button"
                            onClick={() => toggleCert(cert)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-colors ${
                              active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                            }`}
                          >
                            {cert}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Other relevant certifications</label>
                    <input
                      value={form.otherCertifications}
                      onChange={e => set('otherCertifications', e.target.value)}
                      placeholder="e.g. SafeWork NSW licence, asbestos removal class A..."
                      className={inputClass(false)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Do you hold public liability insurance? *</label>
                    <div className="flex gap-3">
                      {[true, false].map(val => (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => { set('hasInsurance', val); clearError('hasInsurance') }}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                            form.hasInsurance === val ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                          }`}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                    <FieldError msg={errors.hasInsurance} />
                  </div>

                  {form.hasInsurance && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Cover value (optional)</label>
                      <select
                        value={form.insuranceValue}
                        onChange={e => set('insuranceValue', e.target.value)}
                        className={selectClass(false)}
                      >
                        <option value="">Select...</option>
                        <option value="5m">$5M+</option>
                        <option value="10m">$10M+</option>
                        <option value="20m">$20M+</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 3: Membership tier ── */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Choose a Membership Tier</h2>
                <p className="text-sm text-slate-500 mb-6">You can upgrade at any time. Community is always free.</p>
                <div className="space-y-3">
                  {TIERS.map(tier => {
                    const active = form.selectedTier === tier.id
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => { set('selectedTier', tier.id); clearError('selectedTier') }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                          active ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              active ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                            }`}>
                              {active && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="font-semibold text-slate-900">{tier.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-emerald-700">{tier.price}</span>
                            <p className="text-xs text-slate-400">{tier.note}</p>
                          </div>
                        </div>
                        <ul className="space-y-1 pl-7">
                          {tier.features.map(f => (
                            <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>
                <FieldError msg={errors.selectedTier} />
              </div>
            )}

            {/* ── Step 4: Confirm ── */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Review & Confirm</h2>
                <p className="text-sm text-slate-500 mb-6">Check your details and agree to the terms before submitting.</p>

                {/* Summary */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Business</span>
                    <span className="font-medium text-slate-900">{form.businessName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Location</span>
                    <span className="font-medium text-slate-900">{form.state}, {form.country}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Primary service</span>
                    <span className="font-medium text-slate-900">{form.primaryService ? SERVICE_LABELS[form.primaryService as PrimaryService] : '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Contact</span>
                    <span className="font-medium text-slate-900">{form.contactName} ({form.contactRole})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">IICRC certs</span>
                    <span className="font-medium text-slate-900">{form.iicrcCertifications.length > 0 ? form.iicrcCertifications.join(', ') : 'None selected'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-slate-200 pt-3">
                    <span className="text-slate-500">Membership tier</span>
                    <span className="font-bold text-emerald-700">{TIERS.find(t => t.id === form.selectedTier)?.name} — {TIERS.find(t => t.id === form.selectedTier)?.price}</span>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreedToTerms}
                      onChange={e => { set('agreedToTerms', e.target.checked); clearError('agreedToTerms') }}
                      className="mt-0.5 h-4 w-4 text-emerald-600 border-slate-300 rounded"
                    />
                    <span className="text-sm text-slate-700">
                      I agree to the NRPG{' '}
                      <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                  <FieldError msg={errors.agreedToTerms} />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreedToCodeOfConduct}
                      onChange={e => { set('agreedToCodeOfConduct', e.target.checked); clearError('agreedToCodeOfConduct') }}
                      className="mt-0.5 h-4 w-4 text-emerald-600 border-slate-300 rounded"
                    />
                    <span className="text-sm text-slate-700">
                      I agree to uphold the NRPG Contractor Code of Conduct, including IICRC standards compliance, honest dealing with clients and insurers, and maintaining current public liability insurance.
                    </span>
                  </label>
                  <FieldError msg={errors.agreedToCodeOfConduct} />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <Link href="/industry-partners" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-slate-700">
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </Link>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
