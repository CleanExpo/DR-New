'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Calendar,
  CheckCircle,
  ArrowLeft,
  Info,
  MapPin,
  Clock,
  Award,
  ChevronDown,
  Send,
  AlertTriangle,
} from 'lucide-react'

const categoryOptions = [
  'IICRC Training',
  'Conference',
  'Trade Show',
  'Networking',
  'Seminar',
  'Supplier Day',
  'Standards / Regulatory',
  'Webinar / Online',
  'Other',
]

const formatOptions = ['In-Person', 'Online / Webinar', 'Hybrid']

const stateOptions = [
  'NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS', 'NT',
  'New Zealand', 'Japan', 'National (Australia-wide)', 'Online',
]

const iicrcCertOptions = [
  'None',
  'WRT — Water Damage Restoration Technician',
  'AMRT — Applied Microbial Remediation Technician',
  'FSRT — Fire & Smoke Restoration Technician',
  'ASD — Applied Structural Drying',
  'BSRT — Biohazard & Crime Scene Remediation',
  'CDS — Commercial Drying Specialist',
  'CCT — Carpet Cleaning Technician',
  'OCT — Odour Control Technician',
  'Other IICRC Certification',
  'CEC Credits Only',
]

interface FormState {
  eventTitle: string
  organiser: string
  category: string
  format: string
  startDate: string
  endDate: string
  city: string
  state: string
  venue: string
  description: string
  iicrcCert: string
  iicrcCredits: string
  submitterName: string
  submitterRole: string
  earlyBirdDate: string
  priceRange: string
  agreedToGuidelines: boolean
}

const initialForm: FormState = {
  eventTitle: '',
  organiser: '',
  category: '',
  format: '',
  startDate: '',
  endDate: '',
  city: '',
  state: '',
  venue: '',
  description: '',
  iicrcCert: 'None',
  iicrcCredits: '',
  submitterName: '',
  submitterRole: '',
  earlyBirdDate: '',
  priceRange: '',
  agreedToGuidelines: false,
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function EventSubmitPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => { const e = { ...prev }; delete e[field]; return e })
    }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.eventTitle.trim()) e.eventTitle = 'Event title is required'
    if (!form.organiser.trim()) e.organiser = 'Organiser name is required'
    if (!form.category) e.category = 'Please select a category'
    if (!form.format) e.format = 'Please select a format'
    if (!form.startDate) e.startDate = 'Start date is required'
    if (!form.state) e.state = 'Please select a state / region'
    if (!form.description.trim() || form.description.trim().length < 50)
      e.description = 'Please provide a description of at least 50 characters'
    if (!form.submitterName.trim()) e.submitterName = 'Your name is required'
    if (!form.submitterRole.trim()) e.submitterRole = 'Your role or organisation is required'
    if (!form.agreedToGuidelines) e.agreedToGuidelines = 'Please agree to the submission guidelines'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    // Simulate submission — API route /api/events/submit to be wired in DR-35 admin queue
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full bg-white rounded-2xl p-10 border border-slate-200 shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Event Submitted!</h2>
          <p className="text-slate-600 mb-2">
            Thank you — <strong>{form.eventTitle}</strong> has been submitted for review.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Our team reviews all submissions within 2 business days. If approved, your event will be listed on the ANZ Events Calendar.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4" />
              View Events Calendar
            </Link>
            <button
              onClick={() => { setForm(initialForm); setStatus('idle') }}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Submit another event
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events Calendar
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Submit an Event
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            List Your Event on the ANZ Industry Calendar
          </h1>
          <p className="text-slate-300 max-w-xl">
            Submit IICRC courses, industry conferences, trade shows, networking events, and seminars for review. Free to submit — all events are reviewed before publishing.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="bg-blue-50 border-b border-blue-200 py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-start gap-3 text-sm text-blue-800">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
          <span>
            <strong>Submission guidelines:</strong> Events must be relevant to Australia, New Zealand, or Japan&apos;s cleaning, restoration, or indoor environment industry. Commercial promotions disguised as events will not be approved.
          </span>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* Event details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Event Details
              </h2>
              <div className="space-y-4">
                <Field
                  label="Event title *"
                  error={errors.eventTitle}
                  hint="Use the full official name, e.g. 'IICRC WRT Water Damage Restoration Technician — Sydney'"
                >
                  <input
                    type="text"
                    value={form.eventTitle}
                    onChange={(e) => update('eventTitle', e.target.value)}
                    className={inputClass(!!errors.eventTitle)}
                    placeholder="e.g. IICRC AMRT Course — Brisbane"
                  />
                </Field>

                <Field label="Organiser / Provider *" error={errors.organiser}>
                  <input
                    type="text"
                    value={form.organiser}
                    onChange={(e) => update('organiser', e.target.value)}
                    className={inputClass(!!errors.organiser)}
                    placeholder="e.g. Carpet & Restoration Training Institute"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Category *" error={errors.category}>
                    <SelectInput
                      value={form.category}
                      onChange={(v) => update('category', v)}
                      options={categoryOptions}
                      placeholder="Select category"
                      hasError={!!errors.category}
                    />
                  </Field>
                  <Field label="Format *" error={errors.format}>
                    <SelectInput
                      value={form.format}
                      onChange={(v) => update('format', v)}
                      options={formatOptions}
                      placeholder="Select format"
                      hasError={!!errors.format}
                    />
                  </Field>
                </div>

                <Field label="Description * (50+ characters)" error={errors.description}>
                  <textarea
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    rows={4}
                    className={inputClass(!!errors.description)}
                    placeholder="Describe the event, what attendees will learn, who it's for, and any prerequisites..."
                  />
                  <div className="text-xs text-slate-400 mt-1 text-right">
                    {form.description.trim().length} / 50 min chars
                  </div>
                </Field>
              </div>
            </div>

            {/* Date & Location */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                Date &amp; Location
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Start date *" error={errors.startDate}>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => update('startDate', e.target.value)}
                      className={inputClass(!!errors.startDate)}
                    />
                  </Field>
                  <Field label="End date (if multi-day)">
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => update('endDate', e.target.value)}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="State / Region *" error={errors.state}>
                    <SelectInput
                      value={form.state}
                      onChange={(v) => update('state', v)}
                      options={stateOptions}
                      placeholder="Select state"
                      hasError={!!errors.state}
                    />
                  </Field>
                  <Field label="City (if in-person)">
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className={inputClass(false)}
                      placeholder="e.g. Sydney"
                    />
                  </Field>
                </div>

                <Field label="Venue name (if in-person)">
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => update('venue', e.target.value)}
                    className={inputClass(false)}
                    placeholder="e.g. Brisbane Convention Centre"
                  />
                </Field>
              </div>
            </div>

            {/* IICRC & Pricing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                Certification &amp; Pricing
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="IICRC certification offered">
                    <SelectInput
                      value={form.iicrcCert}
                      onChange={(v) => update('iicrcCert', v)}
                      options={iicrcCertOptions}
                      placeholder="Select certification"
                      hasError={false}
                    />
                  </Field>
                  <Field label="IICRC CEC credits awarded">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={form.iicrcCredits}
                      onChange={(e) => update('iicrcCredits', e.target.value)}
                      className={inputClass(false)}
                      placeholder="e.g. 14"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Price range (AUD)" hint="e.g. $950, Free, $500–$800">
                    <input
                      type="text"
                      value={form.priceRange}
                      onChange={(e) => update('priceRange', e.target.value)}
                      className={inputClass(false)}
                      placeholder="e.g. $1,100"
                    />
                  </Field>
                  <Field label="Early bird deadline">
                    <input
                      type="date"
                      value={form.earlyBirdDate}
                      onChange={(e) => update('earlyBirdDate', e.target.value)}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Submitter info */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Your Details
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your name *" error={errors.submitterName}>
                    <input
                      type="text"
                      value={form.submitterName}
                      onChange={(e) => update('submitterName', e.target.value)}
                      className={inputClass(!!errors.submitterName)}
                      placeholder="Full name"
                    />
                  </Field>
                  <Field label="Your role / organisation *" error={errors.submitterRole}>
                    <input
                      type="text"
                      value={form.submitterRole}
                      onChange={(e) => update('submitterRole', e.target.value)}
                      className={inputClass(!!errors.submitterRole)}
                      placeholder="e.g. Training Coordinator, CRTI"
                    />
                  </Field>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 flex items-start gap-2 text-xs text-slate-500">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-400" />
                  Contact details are collected for verification only and will not be published on the listing.
                </div>
              </div>
            </div>

            {/* Agreement & submit */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  id="guidelines"
                  checked={form.agreedToGuidelines}
                  onChange={(e) => update('agreedToGuidelines', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="guidelines" className="text-sm text-slate-600">
                  I confirm this event is relevant to the cleaning, restoration, or indoor environment industry in Australia, New Zealand, or Japan. Event details are accurate to the best of my knowledge. *
                </label>
              </div>
              {errors.agreedToGuidelines && (
                <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errors.agreedToGuidelines}
                </p>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  Submission failed. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Event for Review
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">
                Events are reviewed within 2 business days. You will be notified on approval.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string
  children: React.ReactNode
  error?: string
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  hasError: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(hasError)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 border ${hasError ? 'border-red-400 bg-red-50 focus:ring-red-500' : 'border-slate-200 bg-white focus:ring-emerald-500'} rounded-lg text-sm focus:outline-none focus:ring-2 appearance-none`
}
