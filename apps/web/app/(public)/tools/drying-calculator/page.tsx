'use client'

/**
 * DR-40 — Structural Drying Time Calculator
 * Estimates drying time based on room dimensions, material types,
 * temperature, and relative humidity. IICRC S500-aligned.
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Droplets, Info } from 'lucide-react'

type WaterCategory = '1' | '2' | '3'
type MaterialType = 'drywall' | 'concrete' | 'timber' | 'carpet' | 'plaster'

interface FormState {
  length: number
  width: number
  height: number
  waterCategory: WaterCategory
  materials: MaterialType[]
  tempC: number
  rhPercent: number
  dehumidifierCount: number
  airMoverCount: number
}

// Base drying days by category (at optimal conditions)
const BASE_DAYS: Record<WaterCategory, number> = { '1': 3, '2': 5, '3': 7 }

// Material drying difficulty multiplier
const MATERIAL_FACTOR: Record<MaterialType, number> = {
  drywall: 1.0,
  concrete: 1.4,
  timber: 1.6,
  carpet: 0.9,
  plaster: 1.3,
}

const MATERIAL_LABELS: Record<MaterialType, string> = {
  drywall: 'Drywall / Plasterboard',
  concrete: 'Concrete slab / block',
  timber: 'Hardwood / Engineered timber',
  carpet: 'Carpet & underlay',
  plaster: 'Plaster / Render',
}

const CATEGORY_LABELS: Record<WaterCategory, { label: string; colour: string; description: string }> = {
  '1': { label: 'Category 1 — Clean Water', colour: 'text-green-400', description: 'Sanitary water source (supply line, condensate)' },
  '2': { label: 'Category 2 — Grey Water', colour: 'text-yellow-400', description: 'Significant contamination (dishwasher, washing machine overflow)' },
  '3': { label: 'Category 3 — Black Water', colour: 'text-red-400', description: 'Grossly unsanitary (sewage, flooding, seawater)' },
}

function calcDryingDays(form: FormState): { days: number; optimal: boolean; notes: string[] } {
  const volume = form.length * form.width * form.height
  const notes: string[] = []

  // Base days from water category
  let days = BASE_DAYS[form.waterCategory]

  // Material factor — use worst-case material
  const maxMaterialFactor = form.materials.length > 0
    ? Math.max(...form.materials.map(m => MATERIAL_FACTOR[m]))
    : 1.0
  days *= maxMaterialFactor

  // Temperature: optimal 21–27°C. Below 18 or above 32 adds time
  if (form.tempC < 18) {
    days *= 1.3
    notes.push('Temperature below 18°C — consider supplemental heating')
  } else if (form.tempC > 32) {
    days *= 1.1
    notes.push('High temperature — monitor equipment performance')
  }

  // Humidity: target <50% RH. High RH adds time
  if (form.rhPercent > 70) {
    days *= 1.4
    notes.push('High relative humidity — additional dehumidification recommended')
  } else if (form.rhPercent > 55) {
    days *= 1.15
  }

  // Equipment ratio: IICRC S500 recommends 1 dehumidifier per ~100 m³ + 1 air mover per 10–16 m²
  const floorArea = form.length * form.width
  const recommendedDehumidifiers = Math.max(1, Math.ceil(volume / 100))
  const recommendedAirMovers = Math.max(1, Math.ceil(floorArea / 13))

  if (form.dehumidifierCount < recommendedDehumidifiers) {
    days *= 1.25
    notes.push(`Recommend ≥${recommendedDehumidifiers} dehumidifier(s) for this space — currently ${form.dehumidifierCount}`)
  }
  if (form.airMoverCount < recommendedAirMovers) {
    days *= 1.2
    notes.push(`Recommend ≥${recommendedAirMovers} air mover(s) — currently ${form.airMoverCount}`)
  }

  const optimal = form.dehumidifierCount >= recommendedDehumidifiers &&
    form.airMoverCount >= recommendedAirMovers &&
    form.tempC >= 18 && form.tempC <= 32 &&
    form.rhPercent <= 55

  return {
    days: Math.ceil(days),
    optimal,
    notes,
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://disasterrecovery.com.au/tools' },
        { '@type': 'ListItem', position: 3, name: 'Drying Calculator', item: 'https://disasterrecovery.com.au/tools/drying-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Structural Drying Time Calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      description: 'IICRC S500-aligned structural drying time estimator for water damage restoration contractors.',
    },
  ],
}

export default function DryingCalculatorPage() {
  const [form, setForm] = useState<FormState>({
    length: 5,
    width: 4,
    height: 2.7,
    waterCategory: '1',
    materials: ['drywall'],
    tempC: 22,
    rhPercent: 65,
    dehumidifierCount: 1,
    airMoverCount: 2,
  })

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function toggleMaterial(mat: MaterialType) {
    setForm(prev => ({
      ...prev,
      materials: prev.materials.includes(mat)
        ? prev.materials.filter(m => m !== mat)
        : [...prev.materials, mat],
    }))
  }

  const result = useMemo(() => calcDryingDays(form), [form])
  const volume = (form.length * form.width * form.height).toFixed(1)
  const catInfo = CATEGORY_LABELS[form.waterCategory]

  const resultColour = result.days <= 3 ? 'text-green-400' : result.days <= 6 ? 'text-yellow-400' : 'text-red-400'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#050505] text-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <nav className="text-sm text-slate-500 mb-8 flex gap-2">
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-slate-300">Drying Calculator</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-black">Structural Drying Calculator</h1>
          </div>
          <p className="text-slate-400 mb-10">
            IICRC S500-aligned drying time estimate. Adjust inputs to match site conditions.
          </p>

          <div className="space-y-6">
            {/* Room dimensions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Room Dimensions</h2>
              <div className="grid grid-cols-3 gap-4">
                {(['length', 'width', 'height'] as const).map(dim => (
                  <div key={dim}>
                    <label className="block text-sm text-slate-400 mb-2 capitalize">{dim} (m)</label>
                    <input
                      type="number"
                      min={0.5}
                      step={0.1}
                      value={form[dim]}
                      onChange={e => set(dim, parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Volume: {volume} m³</p>
            </div>

            {/* Water category */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Water Category (IICRC S500)</h2>
              <div className="space-y-2">
                {(['1', '2', '3'] as WaterCategory[]).map(cat => {
                  const info = CATEGORY_LABELS[cat]
                  return (
                    <label key={cat} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-800 transition-colors">
                      <input
                        type="radio"
                        name="category"
                        checked={form.waterCategory === cat}
                        onChange={() => set('waterCategory', cat)}
                        className="mt-0.5"
                      />
                      <div>
                        <span className={`font-semibold text-sm ${info.colour}`}>{info.label}</span>
                        <p className="text-xs text-slate-400 mt-0.5">{info.description}</p>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-1">Affected Materials</h2>
              <p className="text-xs text-slate-500 mb-4">Select all materials present in the affected area</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {(Object.keys(MATERIAL_LABELS) as MaterialType[]).map(mat => (
                  <label key={mat} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={form.materials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                    />
                    <span className="text-sm">{MATERIAL_LABELS[mat]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Site Conditions</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Temperature: <span className="text-white">{form.tempC}°C</span>
                  </label>
                  <input type="range" min={10} max={40} value={form.tempC}
                    onChange={e => set('tempC', parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>10°C</span><span className="text-green-500">21–27°C optimal</span><span>40°C</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Relative Humidity: <span className="text-white">{form.rhPercent}%</span>
                  </label>
                  <input type="range" min={20} max={95} value={form.rhPercent}
                    onChange={e => set('rhPercent', parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>20%</span><span className="text-green-500">&lt;50% target</span><span>95%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Equipment Deployed</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Dehumidifiers (LGR)</label>
                  <input
                    type="number" min={0} max={20} value={form.dehumidifierCount}
                    onChange={e => set('dehumidifierCount', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Air Movers</label>
                  <input
                    type="number" min={0} max={50} value={form.airMoverCount}
                    onChange={e => set('airMoverCount', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className={`mt-8 border rounded-2xl p-8 text-center ${
            result.days <= 3 ? 'border-green-500/40 bg-green-500/5' :
            result.days <= 6 ? 'border-yellow-500/40 bg-yellow-500/5' :
            'border-red-500/40 bg-red-500/5'
          }`}>
            <p className="text-slate-400 text-sm mb-2">Estimated Drying Time</p>
            <p className={`text-6xl font-black mb-1 ${resultColour}`}>{result.days}</p>
            <p className="text-xl font-semibold mb-4">
              {result.days === 1 ? 'day' : 'days'}
              {result.optimal && <span className="text-green-400 text-sm ml-2">(optimal conditions)</span>}
            </p>

            {result.notes.length > 0 && (
              <div className="text-left mt-4 space-y-2">
                {result.notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-yellow-300/80">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-slate-600 mt-4 text-center">
            Estimate only. Actual drying times vary by moisture load, building construction, and site conditions.
            Based on IICRC S500 Standard and Reference Guide for Professional Water Damage Restoration.
          </p>
        </div>
      </main>
    </>
  )
}
