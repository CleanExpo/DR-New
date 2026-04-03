/**
 * DR-324 Sprint 3 — Boardroom Dashboard
 * Reads docs/boardroom-state.json at request time.
 * Shows P0 blockers, active BUILDs, pending human actions, and session completions.
 */

import { Metadata } from 'next'
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  User,
  GitPullRequest,
} from 'lucide-react'
import boardroomStateRaw from '@/../../data/boardroom-state.json'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Boardroom Dashboard | DR-NRPG Admin',
  description: 'Live boardroom state — P0 blockers, active BUILDs, pending actions',
  robots: 'noindex',
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BuildStatus = 'P0_EXECUTION_BLOCKER' | 'BLOCKED_CLARIFICATION' | 'ACTIVE_EXECUTION' | 'SPEC_IN_PROGRESS' | 'COMPLETE'

interface ActiveBuild {
  id: string
  title: string
  status: BuildStatus
  approved_sessions_ago: number | null
  approved_date: string | null
  completion_evidence_required: boolean
  owner: string
  deadline: string | null
  notes: string
}

interface WatchItem {
  key: string
  label: string
  detail: string
  date: string
}

interface PendingHumanAction {
  id: string
  action: string
  owner: string
  urgency: 'P0' | 'High' | 'Normal'
  deadline: string | null
}

interface CompletedItem {
  id: string
  title: string
  pr: number | null
}

interface BoardroomState {
  _meta: { updated: string; updated_by: string }
  last_session: { id: string; date: string; time_aest: string; reference: string }
  active_builds: ActiveBuild[]
  p0_open: string[]
  gaps_open: string[]
  watch_items: WatchItem[]
  completed_this_session: CompletedItem[]
  pending_human_actions: PendingHumanAction[]
}

const state = boardroomStateRaw as BoardroomState

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BUILD_STATUS_CONFIG: Record<BuildStatus, { label: string; colour: string; bg: string; icon: React.ElementType<{ className?: string }> }> = {
  P0_EXECUTION_BLOCKER: { label: 'P0 EXECUTION BLOCKER', colour: 'text-red-400', bg: 'border-red-500/50 bg-red-500/5', icon: XCircle },
  BLOCKED_CLARIFICATION: { label: 'Blocked — Clarification', colour: 'text-orange-400', bg: 'border-orange-500/40 bg-orange-500/5', icon: AlertCircle },
  ACTIVE_EXECUTION: { label: 'Active Execution', colour: 'text-blue-400', bg: 'border-blue-500/40 bg-blue-500/5', icon: Clock },
  SPEC_IN_PROGRESS: { label: 'Spec In Progress', colour: 'text-yellow-400', bg: 'border-yellow-500/40 bg-yellow-500/5', icon: AlertTriangle },
  COMPLETE: { label: 'Complete', colour: 'text-green-400', bg: 'border-green-500/40 bg-green-500/5', icon: CheckCircle },
}

const URGENCY_CONFIG = {
  P0: { colour: 'text-red-300', bg: 'bg-red-500/20' },
  High: { colour: 'text-yellow-300', bg: 'bg-yellow-500/20' },
  Normal: { colour: 'text-slate-300', bg: 'bg-slate-700' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BoardroomPage() {
  const p0Count = state.p0_open.length
  const p0Builds = state.active_builds.filter(b => b.status === 'P0_EXECUTION_BLOCKER')
  const otherBuilds = state.active_builds.filter(b => b.status !== 'P0_EXECUTION_BLOCKER')
  const urgentActions = state.pending_human_actions.filter(a => a.urgency === 'P0')
  const otherActions = state.pending_human_actions.filter(a => a.urgency !== 'P0')

  return (
    <main className="bg-[#050505] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Boardroom Dashboard</h1>
              <p className="text-slate-500 text-sm">
                Session {state.last_session.id} · {state.last_session.time_aest} AEST ·{' '}
                <span className="font-mono">{state.last_session.reference}</span>
              </p>
            </div>
            <div className="text-right text-xs text-slate-600">
              <p>Last updated</p>
              <p className="font-mono">{formatDate(state._meta.updated)}</p>
              <p className="mt-1 text-slate-700">{state._meta.updated_by}</p>
            </div>
          </div>
        </div>

        {/* P0 Alert banner */}
        {p0Count > 0 && (
          <div className="mb-8 bg-red-500/10 border border-red-500/50 rounded-2xl p-5 flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-red-400 text-lg">
                {p0Count} P0 EXECUTION BLOCKER{p0Count !== 1 ? 'S' : ''}
              </p>
              <p className="text-sm text-red-300/70 mt-1">
                These builds have been approved with no completion evidence. Requires named developer + commit SHA + 24-hour deadline before proceeding.
              </p>
            </div>
          </div>
        )}

        {/* Scoreboard row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <p className={`text-3xl font-black ${p0Count > 0 ? 'text-red-400' : 'text-green-400'}`}>{p0Count}</p>
            <p className="text-xs text-slate-500 mt-1">P0 Blockers</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-blue-400">{state.active_builds.length}</p>
            <p className="text-xs text-slate-500 mt-1">Active BUILDs</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-yellow-400">{state.gaps_open.length}</p>
            <p className="text-xs text-slate-500 mt-1">Open Gaps</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-green-400">{state.completed_this_session.length}</p>
            <p className="text-xs text-slate-500 mt-1">Done This Session</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* Active BUILDs */}
          <div>
            <h2 className="text-lg font-bold mb-4">Active BUILDs</h2>
            <div className="space-y-3">
              {[...p0Builds, ...otherBuilds].map(build => {
                const cfg = BUILD_STATUS_CONFIG[build.status] ?? BUILD_STATUS_CONFIG['SPEC_IN_PROGRESS']
                const Icon = cfg.icon
                return (
                  <div key={build.id} className={`border rounded-xl p-4 ${cfg.bg}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${cfg.colour}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-sm">{build.id}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/30 ${cfg.colour}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-sm text-slate-200 mb-2">{build.title}</p>
                        {build.notes && (
                          <p className="text-xs text-slate-400">{build.notes}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          {build.owner && build.owner !== 'pending_assignment' && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {build.owner}
                            </span>
                          )}
                          {build.approved_sessions_ago !== null && (
                            <span className="text-red-400 font-semibold">
                              Approved {build.approved_sessions_ago} sessions ago — no evidence
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending human actions */}
          <div>
            <h2 className="text-lg font-bold mb-4">Pending Human Actions</h2>
            <div className="space-y-3">
              {[...urgentActions, ...otherActions].map(action => {
                const urgCfg = URGENCY_CONFIG[action.urgency]
                return (
                  <div key={action.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${urgCfg.bg} ${urgCfg.colour}`}>
                        {action.urgency}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200">{action.action}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {action.owner}
                          </span>
                          {action.deadline && (
                            <span className="text-yellow-400">Due: {action.deadline}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Watch items */}
        {state.watch_items.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4">Watch Items</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {state.watch_items.map(item => (
                <div key={item.key} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <p className="text-sm font-semibold text-yellow-300 mb-1">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.detail}</p>
                  {item.date && <p className="text-xs text-slate-600 mt-1">{item.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed this session */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Completed This Session</h2>
          <div className="space-y-2">
            {state.completed_this_session.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-sm text-slate-300">{item.id}</span>
                  <span className="text-slate-400 text-sm ml-2">— {item.title}</span>
                </div>
                {item.pr && (
                  <span className="flex items-center gap-1 text-xs text-blue-400 shrink-0">
                    <GitPullRequest className="w-3 h-3" />
                    PR #{item.pr}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Open gaps */}
        {state.gaps_open.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Open Gaps</h2>
            <div className="flex flex-wrap gap-2">
              {state.gaps_open.map(gap => (
                <span key={gap} className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-sm text-slate-300 font-mono">
                  {gap}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
