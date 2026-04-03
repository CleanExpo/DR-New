'use client'

/**
 * DR-26 — Fact Shield Protocol
 * Admin content verification checklist before any stat is published.
 * 5-gate system: source named → direct link → date within 3 years →
 * cross-referenced → context check.
 */

import { useState, useMemo } from 'react'
import { Shield, CheckCircle, XCircle, AlertCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tier = 1 | 2 | 3 | 4 | 5

interface GateState {
  g1_sourceNamed: boolean
  g2_directLink: boolean
  g3_withinThreeYears: boolean
  g4_crossReferenced: boolean
  g5_contextCheck: boolean
}

interface VerificationForm {
  claim: string
  sourceName: string
  sourceTier: Tier
  sourceUrl: string
  sourceYear: string
  sampleSize: string
  secondarySourceName: string
  secondarySourceUrl: string
  geoScope: string
  notes: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TIERS: { value: Tier; label: string; examples: string; colour: string }[] = [
  {
    value: 1,
    label: 'Tier 1 — Government / University',
    examples: 'ABS, AIDR, CSIRO, BOM, ICA, Safe Work Australia, MBIE (NZ), FDMA (Japan)',
    colour: 'text-green-400',
  },
  {
    value: 2,
    label: 'Tier 2 — Industry Body',
    examples: 'IICRC, RIA, ISSA, Asthma Australia, BRANZ (NZ)',
    colour: 'text-blue-400',
  },
  {
    value: 3,
    label: 'Tier 3 — Research Firm',
    examples: 'IBISWorld, Astute Analytica, GlobalData, Mordor Intelligence',
    colour: 'text-yellow-400',
  },
  {
    value: 4,
    label: 'Tier 4 — Industry Media (context only)',
    examples: 'Cleanfax, R&R Magazine, Restoration & Remediation',
    colour: 'text-orange-400',
  },
  {
    value: 5,
    label: 'Tier 5 — DR Primary Data (methodology required)',
    examples: 'Internal surveys, polls, platform analytics',
    colour: 'text-purple-400',
  },
]

const GATES = [
  {
    key: 'g1_sourceNamed' as keyof GateState,
    label: 'Gate 1 — Source Named & Reputable',
    description: 'The source is explicitly named and is Tier 1–3.',
    failCriteria: 'Anonymous, "various sources", social media, or Tier 4–5 as primary.',
    isCritical: true,
  },
  {
    key: 'g2_directLink' as keyof GateState,
    label: 'Gate 2 — Direct Link to Original Source',
    description: 'A direct URL to the original source document is recorded and resolves.',
    failCriteria: 'No URL, broken URL, or link to a secondary article about the source.',
    isCritical: true,
  },
  {
    key: 'g3_withinThreeYears' as keyof GateState,
    label: 'Gate 3 — Date Verified (Within 3 Years)',
    description: 'Data published within 3 years, or labelled as historical if older.',
    failCriteria: 'No date recorded, or data >3 years old without a historical label.',
    isCritical: false,
  },
  {
    key: 'g4_crossReferenced' as keyof GateState,
    label: 'Gate 4 — Cross-Referenced (2+ Independent Sources)',
    description: 'At least one additional independent source confirms the claim.',
    failCriteria: 'Only one source found. Exception: Tier 1 only — publish with caveat.',
    isCritical: false,
  },
  {
    key: 'g5_contextCheck' as keyof GateState,
    label: 'Gate 5 — Context Check (Not Misleading)',
    description: 'Claim is not cherry-picked, sample size is appropriate, geography matches.',
    failCriteria: 'US/UK data presented as AU/NZ, sample size <100 for industry-wide claims.',
    isCritical: false,
  },
]

const EMPTY_FORM: VerificationForm = {
  claim: '',
  sourceName: '',
  sourceTier: 1,
  sourceUrl: '',
  sourceYear: '',
  sampleSize: '',
  secondarySourceName: '',
  secondarySourceUrl: '',
  geoScope: '',
  notes: '',
}

const EMPTY_GATES: GateState = {
  g1_sourceNamed: false,
  g2_directLink: false,
  g3_withinThreeYears: false,
  g4_crossReferenced: false,
  g5_contextCheck: false,
}

// ---------------------------------------------------------------------------
// Shield score
// ---------------------------------------------------------------------------

function calcShieldScore(gates: GateState, tier: Tier): { score: number; status: 'publish' | 'caveat' | 'review' | 'block' } {
  const passed = Object.values(gates).filter(Boolean).length

  if (passed === 5) return { score: 100, status: 'publish' }
  if (passed === 4 && !gates.g4_crossReferenced && tier <= 1) return { score: 80, status: 'caveat' }
  if (passed === 4 && !gates.g5_contextCheck) return { score: 70, status: 'review' }
  return { score: Math.round((passed / 5) * 100), status: 'block' }
}

// ---------------------------------------------------------------------------
// Verified claims log (session-only, no persistence in this client component)
// ---------------------------------------------------------------------------

interface VerifiedClaim {
  id: string
  claim: string
  sourceName: string
  tier: Tier
  score: number
  status: string
  verifiedAt: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FactCheckPage() {
  const [form, setForm] = useState<VerificationForm>(EMPTY_FORM)
  const [gates, setGates] = useState<GateState>(EMPTY_GATES)
  const [expandedGate, setExpandedGate] = useState<string | null>(null)
  const [verified, setVerified] = useState<VerifiedClaim[]>([])
  const [showLog, setShowLog] = useState(false)

  const { score, status } = useMemo(
    () => calcShieldScore(gates, form.sourceTier),
    [gates, form.sourceTier],
  )

  const gatesPassed = Object.values(gates).filter(Boolean).length

  const tierInfo = TIERS.find(t => t.value === form.sourceTier)!

  function handleGateToggle(key: keyof GateState) {
    setGates(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSubmit() {
    if (!form.claim.trim()) return
    const id = `vc-${Date.now()}`
    setVerified(prev => [
      {
        id,
        claim: form.claim,
        sourceName: form.sourceName,
        tier: form.sourceTier,
        score,
        status,
        verifiedAt: new Date().toISOString(),
      },
      ...prev,
    ])
    setForm(EMPTY_FORM)
    setGates(EMPTY_GATES)
    setShowLog(true)
  }

  function handleReset() {
    setForm(EMPTY_FORM)
    setGates(EMPTY_GATES)
    setExpandedGate(null)
  }

  const statusColour = {
    publish: 'text-green-400',
    caveat: 'text-yellow-400',
    review: 'text-orange-400',
    block: 'text-red-400',
  }[status]

  const statusLabel = {
    publish: '✅ Clear to Publish',
    caveat: '⚠️ Publish with Caveat',
    review: '⚠️ Needs Human Review',
    block: '❌ Blocked — Do Not Publish',
  }[status]

  const statusBg = {
    publish: 'border-green-500 bg-green-500/10',
    caveat: 'border-yellow-500 bg-yellow-500/10',
    review: 'border-orange-500 bg-orange-500/10',
    block: 'border-red-500 bg-red-500/10',
  }[status]

  return (
    <main className="bg-[#050505] text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-black">Fact Shield Protocol</h1>
          </div>
          <p className="text-slate-400">
            5-gate content verification — all stats must pass before publication on disasterrecovery.com.au
          </p>
        </div>

        {/* Tier quick-reference */}
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Source Tier Reference</h2>
          <div className="space-y-1.5">
            {TIERS.map(t => (
              <div key={t.value} className="flex gap-3 text-sm">
                <span className={`font-bold w-5 shrink-0 ${t.colour}`}>{t.value}</span>
                <span className="text-slate-300">{t.label.split(' — ')[1]}</span>
                <span className="text-slate-500 hidden sm:block">— {t.examples}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-5">Claim Under Verification</h2>

          {/* Claim */}
          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-1">Claim / Statistic *</label>
            <textarea
              value={form.claim}
              onChange={e => setForm(p => ({ ...p, claim: e.target.value }))}
              placeholder='e.g. "Water damage affects 1 in 50 Australian homes annually"'
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Source row */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Source Name *</label>
              <input
                type="text"
                value={form.sourceName}
                onChange={e => setForm(p => ({ ...p, sourceName: e.target.value }))}
                placeholder="e.g. Insurance Council of Australia"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Source Tier *</label>
              <select
                value={form.sourceTier}
                onChange={e => setForm(p => ({ ...p, sourceTier: Number(e.target.value) as Tier }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {TIERS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">{tierInfo.examples}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Source URL *</label>
              <input
                type="url"
                value={form.sourceUrl}
                onChange={e => setForm(p => ({ ...p, sourceUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Publication Year *</label>
              <input
                type="text"
                value={form.sourceYear}
                onChange={e => setForm(p => ({ ...p, sourceYear: e.target.value }))}
                placeholder="e.g. 2024"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Sample Size (if applicable)</label>
              <input
                type="text"
                value={form.sampleSize}
                onChange={e => setForm(p => ({ ...p, sampleSize: e.target.value }))}
                placeholder="e.g. n=1,200"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Secondary Source</label>
              <input
                type="text"
                value={form.secondarySourceName}
                onChange={e => setForm(p => ({ ...p, secondarySourceName: e.target.value }))}
                placeholder="Organisation name"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Secondary Source URL</label>
              <input
                type="url"
                value={form.secondarySourceUrl}
                onChange={e => setForm(p => ({ ...p, secondarySourceUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Geographic Scope</label>
              <input
                type="text"
                value={form.geoScope}
                onChange={e => setForm(p => ({ ...p, geoScope: e.target.value }))}
                placeholder="e.g. Australia, New Zealand, Japan"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Notes</label>
              <input
                type="text"
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Context, caveats, usage notes"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 5-Gate Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">5-Gate Verification</h2>
            <span className="text-sm text-slate-400">{gatesPassed}/5 passed</span>
          </div>

          <div className="space-y-3">
            {GATES.map(gate => {
              const passed = gates[gate.key]
              const isExpanded = expandedGate === gate.key

              return (
                <div
                  key={gate.key}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    passed ? 'border-green-500/40 bg-green-500/5' : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer"
                    onClick={() => setExpandedGate(isExpanded ? null : gate.key)}
                  >
                    <button
                      onClick={e => { e.stopPropagation(); handleGateToggle(gate.key) }}
                      className="shrink-0"
                      aria-label={`Toggle ${gate.label}`}
                    >
                      {passed ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-slate-600" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{gate.label}</span>
                        {gate.isCritical && (
                          <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Critical</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{gate.description}</p>
                    </div>

                    <div className="shrink-0 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-slate-700/50">
                      <div className="pt-3 space-y-2">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Check</span>
                          <p className="text-sm text-slate-200 mt-1">{gate.description}</p>
                        </div>
                        <div>
                          <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Fail if</span>
                          <p className="text-sm text-slate-300 mt-1">{gate.failCriteria}</p>
                        </div>
                        <button
                          onClick={() => handleGateToggle(gate.key)}
                          className={`mt-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            passed
                              ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                              : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
                          }`}
                        >
                          {passed ? 'Mark as Failed' : 'Mark as Passed'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Shield Score */}
        <div className={`border rounded-xl p-6 mb-6 ${statusBg}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold">Shield Score</h2>
            </div>
            <span className="text-4xl font-black">{score}</span>
          </div>

          <div className="mb-3">
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === 'publish' ? 'bg-green-500' :
                  status === 'caveat' ? 'bg-yellow-500' :
                  status === 'review' ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          <div className={`text-xl font-bold ${statusColour}`}>{statusLabel}</div>

          {status === 'caveat' && (
            <p className="text-sm text-yellow-300/70 mt-2">
              Single Tier 1 source — publish with note: &quot;Source: [Name]. Cross-reference pending.&quot;
            </p>
          )}
          {status === 'review' && (
            <p className="text-sm text-orange-300/70 mt-2">
              Context check failed — escalate to editor before publishing.
            </p>
          )}
          {status === 'block' && (
            <p className="text-sm text-red-300/70 mt-2">
              Too many gates failed. Fix source, links, or date before this claim can be published.
            </p>
          )}
        </div>

        {/* Source attribution preview */}
        {(form.sourceName || form.sourceYear) && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Attribution Preview</h3>
            <div className="font-mono text-sm text-slate-200 bg-slate-800 rounded-lg p-4 space-y-1">
              <div>
                Source: {form.sourceName || '[Organisation]'} ({form.sourceYear || '[Year]'})
                {form.sampleSize && ` — n=${form.sampleSize}`}
              </div>
              {form.sourceUrl && (
                <div className="flex items-center gap-2 text-blue-400">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">{form.sourceUrl}</span>
                </div>
              )}
              {form.geoScope && <div className="text-slate-400">Scope: {form.geoScope}</div>}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleSubmit}
            disabled={!form.claim.trim() || status === 'block'}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl font-bold transition-colors"
          >
            {status === 'block' ? 'Blocked — Cannot Save' : 'Save Verified Claim'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Verified claims log */}
        {verified.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <button
              onClick={() => setShowLog(p => !p)}
              className="flex items-center justify-between w-full"
            >
              <h2 className="text-lg font-bold">
                Session Log <span className="text-slate-400 font-normal text-sm ml-2">({verified.length} claims)</span>
              </h2>
              {showLog ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {showLog && (
              <div className="mt-4 space-y-3">
                {verified.map(claim => (
                  <div key={claim.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{claim.claim}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {claim.sourceName} · Tier {claim.tier} · {new Date(claim.verifiedAt).toLocaleString('en-AU')}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-lg font-black">{claim.score}</span>
                        {claim.status === 'publish' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}
