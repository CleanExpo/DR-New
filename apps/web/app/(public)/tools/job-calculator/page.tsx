'use client'

/**
 * DR-40 / DR-48 — Job Cost Calculator
 * Line-item job costing with industry-standard rates.
 * Supports AU metro, AU regional, NZ, and Japan pricing.
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, Printer, ChevronDown, ChevronUp } from 'lucide-react'

type JobType = 'water' | 'mould' | 'fire' | 'carpet' | 'storm'
type Region = 'au-metro' | 'au-regional' | 'nz' | 'jp'

const REGIONAL_MULTIPLIER: Record<Region, number> = {
  'au-metro': 1.0,
  'au-regional': 0.85,
  nz: 0.92,
  jp: 1.35,
}

const CURRENCY_SYMBOL: Record<Region, string> = {
  'au-metro': 'A$',
  'au-regional': 'A$',
  nz: 'NZ$',
  jp: '¥',
}

interface LineItem {
  label: string
  qty: number
  unit: string
  rate: number
}

const BASE_LINE_ITEMS: Record<JobType, LineItem[]> = {
  water: [
    { label: 'Qualified Technician (Normal hours)', qty: 4, unit: 'hr', rate: 85 },
    { label: 'Additional Technician', qty: 4, unit: 'hr', rate: 65 },
    { label: 'Moisture mapping & reporting', qty: 1, unit: 'job', rate: 275 },
    { label: 'Air mover (LGR)', qty: 3, unit: 'day', rate: 45 },
    { label: 'Dehumidifier (LGR)', qty: 1, unit: 'day', rate: 110 },
    { label: 'Antimicrobial treatment', qty: 1, unit: 'job', rate: 180 },
    { label: 'Admin fee', qty: 1, unit: 'claim', rate: 165 },
    { label: 'Estimator fee', qty: 1, unit: 'claim', rate: 275 },
  ],
  mould: [
    { label: 'Qualified Technician (Mould remediation)', qty: 6, unit: 'hr', rate: 95 },
    { label: 'Additional Technician', qty: 6, unit: 'hr', rate: 65 },
    { label: 'Containment setup', qty: 1, unit: 'job', rate: 320 },
    { label: 'HEPA air scrubber', qty: 2, unit: 'day', rate: 85 },
    { label: 'PPE & consumables', qty: 1, unit: 'job', rate: 120 },
    { label: 'Biocide treatment', qty: 1, unit: 'job', rate: 210 },
    { label: 'Post-remediation verification', qty: 1, unit: 'job', rate: 350 },
    { label: 'Admin fee', qty: 1, unit: 'claim', rate: 165 },
    { label: 'Estimator fee', qty: 1, unit: 'claim', rate: 275 },
  ],
  fire: [
    { label: 'Qualified Technician (Fire/smoke)', qty: 8, unit: 'hr', rate: 95 },
    { label: 'Additional Technician', qty: 8, unit: 'hr', rate: 65 },
    { label: 'Ozone/hydroxyl treatment', qty: 2, unit: 'day', rate: 195 },
    { label: 'Soot cleaning (per room)', qty: 3, unit: 'room', rate: 285 },
    { label: 'Content pack-out', qty: 1, unit: 'job', rate: 650 },
    { label: 'Deodorisation', qty: 1, unit: 'job', rate: 275 },
    { label: 'Admin fee', qty: 1, unit: 'claim', rate: 165 },
    { label: 'Estimator fee', qty: 1, unit: 'claim', rate: 275 },
  ],
  carpet: [
    { label: 'Carpet cleaning technician', qty: 3, unit: 'hr', rate: 75 },
    { label: 'Carpet extraction (per m²)', qty: 40, unit: 'm²', rate: 3.5 },
    { label: 'Rotary scrub treatment', qty: 1, unit: 'job', rate: 185 },
    { label: 'Stain pre-treatment', qty: 1, unit: 'job', rate: 95 },
    { label: 'Deodoriser application', qty: 1, unit: 'job', rate: 65 },
    { label: 'Admin fee', qty: 1, unit: 'claim', rate: 165 },
  ],
  storm: [
    { label: 'Qualified Technician', qty: 6, unit: 'hr', rate: 85 },
    { label: 'Additional Technician', qty: 6, unit: 'hr', rate: 65 },
    { label: 'Debris removal', qty: 1, unit: 'job', rate: 380 },
    { label: 'Temporary tarping/boarding', qty: 1, unit: 'job', rate: 450 },
    { label: 'Water extraction', qty: 1, unit: 'job', rate: 275 },
    { label: 'Structural assessment report', qty: 1, unit: 'job', rate: 350 },
    { label: 'Admin fee', qty: 1, unit: 'claim', rate: 165 },
    { label: 'Estimator fee', qty: 1, unit: 'claim', rate: 275 },
  ],
}

function fmt(amount: number, region: Region): string {
  const sym = CURRENCY_SYMBOL[region]
  if (region === 'jp') return `${sym}${Math.round(amount * 100).toLocaleString()}`
  return `${sym}${amount.toFixed(2)}`
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://disasterrecovery.com.au/tools' },
        { '@type': 'ListItem', position: 3, name: 'Job Calculator', item: 'https://disasterrecovery.com.au/tools/job-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Disaster Recovery Job Cost Calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      description: 'Free job costing calculator for disaster recovery and restoration contractors in Australia, New Zealand, and Japan.',
    },
  ],
}

export default function JobCalculatorPage() {
  const [jobType, setJobType] = useState<JobType>('water')
  const [region, setRegion] = useState<Region>('au-metro')
  const [items, setItems] = useState<LineItem[]>(BASE_LINE_ITEMS.water)
  const [showDetails, setShowDetails] = useState(true)
  const [notes, setNotes] = useState('')

  const multiplier = REGIONAL_MULTIPLIER[region]

  function handleJobTypeChange(type: JobType) {
    setJobType(type)
    setItems(BASE_LINE_ITEMS[type])
  }

  function updateQty(index: number, qty: number) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, qty: Math.max(0, qty) } : item))
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0) * multiplier
    const gst = subtotal * 0.1
    const total = subtotal + gst
    return { subtotal, gst, total }
  }, [items, multiplier])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#050505] text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-8 flex gap-2">
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-slate-300">Job Calculator</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-black">Job Cost Calculator</h1>
          </div>
          <p className="text-slate-400 mb-10">
            IICRC-aligned industry rates. Includes GST. Adjust quantities for your job.
          </p>

          {/* Config row */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Job Type</label>
              <select
                value={jobType}
                onChange={e => handleJobTypeChange(e.target.value as JobType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="water">Water Damage</option>
                <option value="mould">Mould Remediation</option>
                <option value="fire">Fire & Smoke</option>
                <option value="carpet">Carpet Cleaning</option>
                <option value="storm">Storm Damage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Region</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value as Region)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="au-metro">Australia — Metro (×1.00)</option>
                <option value="au-regional">Australia — Regional (×0.85)</option>
                <option value="nz">New Zealand (×0.92)</option>
                <option value="jp">Japan (×1.35)</option>
              </select>
            </div>
          </div>

          {/* Line items */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl mb-6 overflow-hidden">
            <button
              onClick={() => setShowDetails(p => !p)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-bold">Line Items ({items.length})</span>
              {showDetails ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {showDetails && (
              <div className="border-t border-slate-800">
                <div className="grid grid-cols-[1fr_80px_70px_90px] gap-2 px-6 py-2 text-xs text-slate-500 uppercase tracking-wider">
                  <span>Description</span>
                  <span className="text-right">Qty</span>
                  <span className="text-right">Rate</span>
                  <span className="text-right">Amount</span>
                </div>

                {items.map((item, i) => {
                  const lineTotal = item.qty * item.rate * multiplier
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_80px_70px_90px] gap-2 items-center px-6 py-3 border-t border-slate-800/50 hover:bg-slate-800/30"
                    >
                      <span className="text-sm">{item.label}</span>
                      <div className="flex items-center gap-1 justify-end">
                        <input
                          type="number"
                          min={0}
                          step={item.unit === 'm²' ? 1 : 0.5}
                          value={item.qty}
                          onChange={e => updateQty(i, parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-xs text-slate-500 w-6">{item.unit}</span>
                      </div>
                      <span className="text-right text-sm text-slate-400">
                        {fmt(item.rate * multiplier, region)}
                      </span>
                      <span className="text-right text-sm font-semibold">
                        {fmt(lineTotal, region)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal (excl. GST)</span>
                <span>{fmt(totals.subtotal, region)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (10%)</span>
                <span>{fmt(totals.gst, region)}</span>
              </div>
              <div className="flex justify-between font-black text-xl pt-2 border-t border-slate-700">
                <span>Total</span>
                <span className="text-blue-300">{fmt(totals.total, region)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-sm text-slate-400 mb-2">Estimate Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add scope notes, exclusions, or site conditions..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Estimate
            </button>
            <Link
              href="/claim/step-1"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-center transition-colors"
            >
              Start a Claim →
            </Link>
          </div>

          <p className="text-xs text-slate-600 mt-4 text-center">
            Guide prices only. Rates based on IICRC S500/S520/S770 standards and Australian industry benchmarks.
            Regional multiplier applied: ×{multiplier.toFixed(2)}.
          </p>
        </div>
      </main>
    </>
  )
}
