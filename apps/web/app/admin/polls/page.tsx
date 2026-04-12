'use client'

/**
 * DR-31 — Social Media Poll Engine
 * Admin UI: manage question bank, view schedule, enter results,
 * and link completed polls to the Statistics Database.
 */

import { useState, useMemo } from 'react'
import { BarChart3, Calendar, CheckCircle, Clock, Archive, Plus, ChevronDown, ChevronUp, LinkedinIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PollStatus = 'queued' | 'active' | 'completed' | 'archived'
type PollCategory = 'pricing' | 'workforce' | 'technology' | 'insurance' | 'training' | 'safety' | 'business' | 'regional' | 'seasonal'
type Platform = 'linkedin' | 'instagram' | 'facebook'

interface Poll {
  id: string
  question: string
  category: PollCategory
  options: string[]
  platforms: Platform[]
  status: PollStatus
  scheduledDate: string | null
  results: Record<string, number> | null
  totalResponses: number
  statLinked: boolean
  notes: string
}

// ---------------------------------------------------------------------------
// Seeded question bank (mirrors migration seed)
// ---------------------------------------------------------------------------

const SEED_POLLS: Poll[] = [
  { id: 'pq-pricing-01',   question: 'What is your minimum callout fee for a residential water damage job in 2026?', category: 'pricing',    options: ['Under $300','$300–$500','$500–$800','Over $800'],                  platforms: ['linkedin','facebook'],   status: 'queued',    scheduledDate: '2026-04-08', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-pricing-02',   question: 'Have you increased your hourly rates in the last 12 months?',                  category: 'pricing',    options: ['Yes, by 10%+','Yes, by 5–10%','Yes, by under 5%','No change'],     platforms: ['linkedin','instagram'],  status: 'queued',    scheduledDate: '2026-04-15', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-workforce-01', question: 'What is your biggest recruitment challenge right now?',                         category: 'workforce',  options: ['Finding certified techs','Retaining staff','Casual vs full-time','Wages'], platforms: ['linkedin','facebook'],  status: 'queued',    scheduledDate: '2026-04-22', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-workforce-02', question: 'How many active technicians does your business employ?',                        category: 'workforce',  options: ['Just me','2–5','6–15','16+'],                                      platforms: ['linkedin'],              status: 'queued',    scheduledDate: '2026-04-29', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-tech-01',      question: 'Which job management software do you use?',                                    category: 'technology', options: ['ASCORA','Encircle','Xactimate','Other/none'],                       platforms: ['linkedin','instagram'],  status: 'queued',    scheduledDate: '2026-05-06', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-tech-02',      question: 'Are you using AI tools in your workflow?',                                     category: 'technology', options: ['Yes, regularly','Yes, occasionally','Exploring it','No'],           platforms: ['linkedin','facebook'],   status: 'queued',    scheduledDate: '2026-05-13', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-insurance-01', question: 'How long does your average insurance claim take to settle?',                   category: 'insurance',  options: ['Under 2 weeks','2–4 weeks','1–3 months','Over 3 months'],           platforms: ['linkedin','facebook'],   status: 'queued',    scheduledDate: '2026-05-20', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-insurance-02', question: 'Have you been underpaid on an insurance claim in the last 12 months?',         category: 'insurance',  options: ['Yes, significantly','Yes, slightly','No','Not applicable'],         platforms: ['linkedin','instagram'],  status: 'queued',    scheduledDate: '2026-05-27', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-training-01',  question: 'Which IICRC certification do you consider most valuable for your business?',   category: 'training',   options: ['WRT','ASD','AMRT','FSRT'],                                          platforms: ['linkedin','instagram'],  status: 'queued',    scheduledDate: '2026-06-03', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-safety-01',    question: 'Do you conduct toolbox talks on your job sites?',                              category: 'safety',     options: ['Yes, every job','Yes, weekly','Monthly','Rarely/never'],            platforms: ['linkedin','facebook'],   status: 'queued',    scheduledDate: '2026-06-10', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-business-01',  question: 'What is your biggest business challenge in 2026?',                             category: 'business',   options: ['Cash flow','Insurance delays','Finding staff','Rising costs'],       platforms: ['linkedin','instagram'],  status: 'queued',    scheduledDate: '2026-06-17', results: null, totalResponses: 0, statLinked: false, notes: '' },
  { id: 'pq-regional-01',  question: 'Which region are you based in?',                                               category: 'regional',   options: ['Australian capital city','Australian regional','New Zealand','Japan'], platforms: ['linkedin','instagram'],  status: 'queued',  scheduledDate: '2026-06-24', results: null, totalResponses: 0, statLinked: false, notes: '' },
]

const CATEGORY_COLOURS: Record<PollCategory, string> = {
  pricing: 'bg-green-500/20 text-green-300',
  workforce: 'bg-blue-500/20 text-blue-300',
  technology: 'bg-purple-500/20 text-purple-300',
  insurance: 'bg-yellow-500/20 text-yellow-300',
  training: 'bg-cyan-500/20 text-cyan-300',
  safety: 'bg-red-500/20 text-red-300',
  business: 'bg-orange-500/20 text-orange-300',
  regional: 'bg-indigo-500/20 text-indigo-300',
  seasonal: 'bg-pink-500/20 text-pink-300',
}

const STATUS_CONFIG: Record<PollStatus, { label: string; colour: string; icon: React.ElementType<{className?: string}> }> = {
  queued:    { label: 'Queued',    colour: 'text-slate-400',  icon: Clock },
  active:    { label: 'Active',    colour: 'text-blue-400',   icon: BarChart3 },
  completed: { label: 'Completed', colour: 'text-green-400',  icon: CheckCircle },
  archived:  { label: 'Archived',  colour: 'text-slate-600',  icon: Archive },
}

const PLATFORM_ICONS: Record<Platform, string> = {
  linkedin: 'LI',
  instagram: 'IG',
  facebook: 'FB',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PollsAdminPage() {
  const [polls, setPolls] = useState<Poll[]>(SEED_POLLS)
  const [statusFilter, setStatusFilter] = useState<PollStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<PollCategory | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [enteringResultsFor, setEnteringResultsFor] = useState<string | null>(null)
  const [draftResults, setDraftResults] = useState<Record<string, string>>({})

  const filtered = useMemo(() =>
    polls.filter(p =>
      (statusFilter === 'all' || p.status === statusFilter) &&
      (categoryFilter === 'all' || p.category === categoryFilter)
    ).sort((a, b) => {
      if (!a.scheduledDate) return 1
      if (!b.scheduledDate) return -1
      return a.scheduledDate.localeCompare(b.scheduledDate)
    }),
    [polls, statusFilter, categoryFilter]
  )

  const stats = useMemo(() => ({
    total: polls.length,
    queued: polls.filter(p => p.status === 'queued').length,
    active: polls.filter(p => p.status === 'active').length,
    completed: polls.filter(p => p.status === 'completed').length,
    totalResponses: polls.reduce((s, p) => s + p.totalResponses, 0),
  }), [polls])

  function updateStatus(id: string, status: PollStatus) {
    setPolls(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  function saveResults(id: string) {
    const poll = polls.find(p => p.id === id)
    if (!poll) return
    const results: Record<string, number> = {}
    let total = 0
    poll.options.forEach(opt => {
      const val = parseInt(draftResults[opt] || '0')
      results[opt] = val
      total += val
    })
    setPolls(prev => prev.map(p => p.id === id
      ? { ...p, results, totalResponses: total, status: 'completed', statLinked: false }
      : p
    ))
    setEnteringResultsFor(null)
    setDraftResults({})
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-1">Social Media Poll Engine</h1>
          <p className="text-slate-400 text-sm">
            52-week question bank · LinkedIn, Instagram, Facebook · Results feed → Statistics Database
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Questions', value: stats.total, colour: 'text-white' },
            { label: 'Queued', value: stats.queued, colour: 'text-slate-400' },
            { label: 'Active', value: stats.active, colour: 'text-blue-400' },
            { label: 'Completed', value: stats.completed, colour: 'text-green-400' },
            { label: 'Total Responses', value: stats.totalResponses.toLocaleString(), colour: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <p className={`text-2xl font-black ${s.colour}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Schedule summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Weekly Schedule</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold w-6 text-center">LI</span>
              <div>
                <p className="font-semibold">LinkedIn — 2×/week</p>
                <p className="text-slate-400 text-xs">Tue + Thu, 8–10am AEST</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-bold w-6 text-center">IG</span>
              <div>
                <p className="font-semibold">Instagram Stories — 3×/week</p>
                <p className="text-slate-400 text-xs">Mon, Wed, Fri</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs bg-blue-700/30 text-blue-200 px-2 py-0.5 rounded font-bold w-6 text-center">FB</span>
              <div>
                <p className="font-semibold">Facebook Group — 2×/week</p>
                <p className="text-slate-400 text-xs">Tue + Thu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as PollStatus | 'all')}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
            <option value="all">All Status</option>
            <option value="queued">Queued</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as PollCategory | 'all')}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
            <option value="all">All Categories</option>
            {Object.keys(CATEGORY_COLOURS).map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <span className="text-sm text-slate-500 self-center ml-auto">{filtered.length} questions</span>
        </div>

        {/* Question list */}
        <div className="space-y-3">
          {filtered.map(poll => {
            const scfg = STATUS_CONFIG[poll.status]
            const StatusIcon = scfg.icon
            const isExpanded = expandedId === poll.id
            const isEnteringResults = enteringResultsFor === poll.id

            return (
              <div key={poll.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Row header */}
                <div
                  className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : poll.id)}
                >
                  <StatusIcon className={`w-4 h-4 shrink-0 ${scfg.colour}`} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{poll.question}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${CATEGORY_COLOURS[poll.category]}`}>
                        {poll.category}
                      </span>
                      {poll.platforms.map(p => (
                        <span key={p} className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                          {PLATFORM_ICONS[p]}
                        </span>
                      ))}
                      {poll.scheduledDate && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(poll.scheduledDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {poll.totalResponses > 0 && (
                        <span className="text-xs text-purple-300 font-semibold">{poll.totalResponses} responses</span>
                      )}
                    </div>
                  </div>

                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-800">
                    {/* Options */}
                    <div className="mt-4 space-y-1 mb-4">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Options</p>
                      {poll.options.map((opt, i) => {
                        const count = poll.results?.[opt] ?? 0
                        const pct = poll.totalResponses > 0 ? Math.round((count / poll.totalResponses) * 100) : 0
                        return (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="text-slate-300 flex-1">{opt}</span>
                            {poll.results && (
                              <>
                                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-slate-400 w-12 text-right">{count} ({pct}%)</span>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Enter results inline */}
                    {isEnteringResults && (
                      <div className="bg-slate-800 rounded-xl p-4 mb-4">
                        <p className="text-sm font-bold mb-3 text-blue-300">Enter Poll Results</p>
                        <div className="space-y-2 mb-4">
                          {poll.options.map(opt => (
                            <div key={opt} className="flex items-center gap-3">
                              <label className="text-sm text-slate-300 flex-1">{opt}</label>
                              <input
                                type="number"
                                min={0}
                                value={draftResults[opt] ?? ''}
                                onChange={e => setDraftResults(p => ({ ...p, [opt]: e.target.value }))}
                                placeholder="0"
                                className="w-24 bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-sm text-white text-right focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => saveResults(poll.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-bold transition-colors">
                            Save & Mark Complete
                          </button>
                          <button onClick={() => setEnteringResultsFor(null)}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {poll.status === 'queued' && (
                        <button onClick={() => updateStatus(poll.id, 'active')}
                          className="px-3 py-1.5 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-xs font-bold transition-colors">
                          Mark Active
                        </button>
                      )}
                      {poll.status === 'active' && (
                        <button onClick={() => setEnteringResultsFor(poll.id)}
                          className="px-3 py-1.5 bg-green-600/20 text-green-300 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-xs font-bold transition-colors">
                          Enter Results
                        </button>
                      )}
                      {poll.status === 'completed' && !poll.statLinked && (
                        <button onClick={() => setPolls(p => p.map(q => q.id === poll.id ? { ...q, statLinked: true } : q))}
                          className="px-3 py-1.5 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-xs font-bold transition-colors">
                          Link to Stats DB
                        </button>
                      )}
                      {poll.statLinked && (
                        <span className="px-3 py-1.5 bg-green-600/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold">
                          ✓ Linked to Stats DB
                        </span>
                      )}
                      {poll.status !== 'archived' && (
                        <button onClick={() => updateStatus(poll.id, 'archived')}
                          className="px-3 py-1.5 text-slate-500 hover:text-slate-300 rounded-lg text-xs transition-colors">
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Content repurposing note */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Content Repurposing Pipeline</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>LinkedIn follow-up post with analysis (post-close)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">→</span>
              <span>Instagram carousel graphic (Canva template)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">→</span>
              <span>Newsletter "Stat of the Month" candidate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">→</span>
              <span>Blog post monthly rollup + Annual Report data point</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
