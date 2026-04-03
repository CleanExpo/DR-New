'use client'

/**
 * DR-29 — Data Contributor Program
 * /industry-partners/dashboard/contribute-data
 * Partner data submission form → admin review → Statistics Database.
 */

import { useState } from 'react'
import Link from 'next/link'
import { Database, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react'

type ContributorType = 'training-provider' | 'equipment-supplier' | 'insurance-assessor' | 'association' | 'other'
type DataPeriod = 'monthly' | 'quarterly' | 'annual' | 'point-in-time'
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface DataSubmission {
  organisationName: string
  contributorType: ContributorType
  contactName: string
  contactEmail: string
  metric: string
  value: string
  unit: string
  period: DataPeriod
  periodDate: string
  methodology: string
  geography: string
  agreementAccepted: boolean
}

const EMPTY: DataSubmission = {
  organisationName: '',
  contributorType: 'training-provider',
  contactName: '',
  contactEmail: '',
  metric: '',
  value: '',
  unit: '',
  period: 'annual',
  periodDate: '',
  methodology: '',
  geography: 'Australia',
  agreementAccepted: false,
}

const CONTRIBUTOR_TYPES: { value: ContributorType; label: string; examples: string }[] = [
  { value: 'training-provider',  label: 'Training Provider',    examples: 'Enrolment numbers, cert completion rates, popular courses' },
  { value: 'equipment-supplier', label: 'Equipment Supplier',   examples: 'Unit sales trends, popular products, price indices' },
  { value: 'insurance-assessor', label: 'Insurance Assessor',   examples: 'Claim trends, average values, resolution times' },
  { value: 'association',        label: 'Industry Association', examples: 'Membership numbers, industry census, workforce data' },
  { value: 'other',              label: 'Other Partner',        examples: 'Any verified industry metric with methodology' },
]

const INCENTIVES = [
  { icon: '🏅', title: '"Data Contributor" Badge', detail: 'Displayed on your directory listing' },
  { icon: '📊', title: 'Premium Analytics', detail: 'Your data vs industry benchmarks dashboard' },
  { icon: '📰', title: 'Annual Report Credit', detail: 'Featured in acknowledgements — 2-week early access' },
  { icon: '🔒', title: 'Full Anonymisation', detail: 'Source listed as "DR Partner Network" — not your name' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', position: 2, name: 'Industry Partners', item: 'https://disasterrecovery.com.au/industry-partners' },
        { '@type': 'ListItem', position: 3, name: 'Contribute Data', item: 'https://disasterrecovery.com.au/industry-partners/dashboard/contribute-data' },
      ],
    },
  ],
}

export default function ContributeDataPage() {
  const [form, setForm] = useState<DataSubmission>(EMPTY)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [showAgreement, setShowAgreement] = useState(false)

  function set<K extends keyof DataSubmission>(key: K, value: DataSubmission[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.agreementAccepted) return
    setSubmitState('submitting')
    // Simulated submit — wire to /api/data-contributions in production
    await new Promise(res => setTimeout(res, 1000))
    setSubmitState('success')
  }

  if (submitState === 'success') {
    return (
      <main className="bg-[#050505] text-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-3">Submission Received</h1>
          <p className="text-slate-400 mb-2">
            Thank you, <strong>{form.organisationName}</strong>. Your data point has been submitted for review.
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Our team will verify the submission and add it to the Statistics Database within 5 business days.
            All contributed data is anonymised before publication.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setForm(EMPTY); setSubmitState('idle') }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors text-sm">
              Submit Another
            </button>
            <Link href="/industry-partners/dashboard"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold transition-colors text-sm">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-[#050505] text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <nav className="text-sm text-slate-500 mb-8 flex gap-2">
            <Link href="/industry-partners" className="hover:text-white transition-colors">Industry Partners</Link>
            <span>/</span>
            <Link href="/industry-partners/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-300">Contribute Data</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <Database className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-black">Contribute Industry Data</h1>
          </div>
          <p className="text-slate-400 mb-10">
            Share verified industry metrics with the DR research network. All data is anonymised before publication.
          </p>

          {/* Incentives */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {INCENTIVES.map(i => (
              <div key={i.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">{i.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{i.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{i.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organisation */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Organisation Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Organisation Name *</label>
                  <input type="text" required value={form.organisationName}
                    onChange={e => set('organisationName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Type *</label>
                  <select value={form.contributorType} onChange={e => set('contributorType', e.target.value as ContributorType)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                    {CONTRIBUTOR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">
                    {CONTRIBUTOR_TYPES.find(t => t.value === form.contributorType)?.examples}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Contact Name *</label>
                  <input type="text" required value={form.contactName}
                    onChange={e => set('contactName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Contact Email *</label>
                  <input type="email" required value={form.contactEmail}
                    onChange={e => set('contactEmail', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* Data Point */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Data Point</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Metric Name *</label>
                  <input type="text" required value={form.metric}
                    onChange={e => set('metric', e.target.value)}
                    placeholder='e.g. "Number of WRT certifications issued in Australia"'
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Value *</label>
                    <input type="text" required value={form.value}
                      onChange={e => set('value', e.target.value)}
                      placeholder='e.g. "1,847"'
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Unit</label>
                    <input type="text" value={form.unit}
                      onChange={e => set('unit', e.target.value)}
                      placeholder='e.g. "certifications"'
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Geography *</label>
                    <input type="text" required value={form.geography}
                      onChange={e => set('geography', e.target.value)}
                      placeholder='e.g. "Australia", "NSW", "ANZ"'
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Period *</label>
                    <select value={form.period} onChange={e => set('period', e.target.value as DataPeriod)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                      <option value="annual">Annual</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="monthly">Monthly</option>
                      <option value="point-in-time">Point-in-time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Period Date / Year *</label>
                    <input type="text" required value={form.periodDate}
                      onChange={e => set('periodDate', e.target.value)}
                      placeholder='e.g. "FY2025", "Q3 2025", "March 2026"'
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Methodology Note *</label>
                  <textarea required value={form.methodology}
                    onChange={e => set('methodology', e.target.value)}
                    placeholder="How was this data collected? (e.g. internal records, survey of N=X members, industry census)"
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500" />
                  <div className="flex items-start gap-2 mt-1.5">
                    <Info className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-500">Minimum viable: collection method, data source, sample size if survey-based</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sharing Agreement */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button type="button" onClick={() => setShowAgreement(p => !p)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/40 transition-colors">
                <span className="font-bold text-sm">Data Sharing Agreement</span>
                {showAgreement ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {showAgreement && (
                <div className="px-6 pb-5 text-xs text-slate-400 border-t border-slate-800 space-y-2 pt-4">
                  <p>• Data is provided voluntarily for industry research purposes.</p>
                  <p>• The contributing partner retains full ownership of the data.</p>
                  <p>• DR is granted a licence to publish the data in aggregate, anonymised form only.</p>
                  <p>• Source will be listed as "DR Partner Network" — individual organisation name will not be published.</p>
                  <p>• Either party may terminate this arrangement with 30 days notice.</p>
                  <p>• DR reserves the right to decline submissions that cannot be verified or fall outside scope.</p>
                </div>
              )}
              <div className="px-6 pb-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={form.agreementAccepted}
                    onChange={e => set('agreementAccepted', e.target.checked)}
                    className="mt-0.5" />
                  <span className="text-sm text-slate-300">
                    I have read and agree to the Data Sharing Agreement. I confirm the data submitted is accurate to the best of my knowledge.
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={!form.agreementAccepted || submitState === 'submitting'}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl font-bold transition-colors">
              {submitState === 'submitting' ? 'Submitting...' : 'Submit Data Point'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
