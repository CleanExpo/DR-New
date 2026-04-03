'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  BarChart3,
  Calendar,
  Eye,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Edit,
  Award,
  DollarSign,
  Users,
  MapPin,
  Zap,
  Lock,
  ChevronRight,
} from 'lucide-react'

// ── Mock data — replaced with Supabase fetch in DR-34 backend sprint ──────────

const mockPartner = {
  businessName: 'Rapid Dry Solutions',
  contactName: 'Amanda Pierce',
  tier: 'standard' as 'community' | 'standard' | 'premium',
  status: 'approved' as 'approved' | 'pending' | 'rejected',
  state: 'VIC',
  country: 'AU',
  primaryService: 'Water Damage Restoration',
  iicrcCertifications: ['WRT', 'ASD', 'AMRT'],
  memberSince: 'December 2024',
  listingUrl: '/directory#rapid-dry-solutions',
  profileComplete: 74,
}

const mockStats = {
  profileViews: { value: 312, change: '+18%', period: 'vs last 30 days' },
  referrals: { value: 7, change: '+2', period: 'this month' },
  directoryRank: { value: '#4', context: 'in VIC Water Damage' },
  reviewScore: { value: 4.8, count: 23 },
}

const mockActions = [
  { label: 'Update your listing', href: '#profile', icon: Edit, done: false, urgent: true },
  { label: 'Add a logo (improves views by 40%)', href: '#profile', icon: Building2, done: false, urgent: false },
  { label: 'Submit an event', href: '/events/submit', icon: Calendar, done: true, urgent: false },
  { label: 'Read this week\'s DR Brief', href: '/newsletter', icon: Zap, done: false, urgent: false },
]

const mockUpcomingEvents: { title: string; date: string; location: string }[] = [
  { title: 'IICRC WRT & ASD Combo — Brisbane', date: '12 May 2025', location: 'Brisbane, QLD' },
  { title: 'AU Restoration Industry Forum 2025', date: '18 Jun 2025', location: 'Sydney, NSW' },
]

const TIER_COLOURS = {
  community: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', label: 'Community' },
  standard: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', label: 'Standard' },
  premium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Premium' },
}

const STATUS_DISPLAY = {
  approved: { icon: CheckCircle, colour: 'text-emerald-600', label: 'Active' },
  pending: { icon: Clock, colour: 'text-amber-600', label: 'Pending Review' },
  rejected: { icon: AlertCircle, colour: 'text-red-600', label: 'Rejected' },
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, accent }: {
  label: string
  value: string | number
  sub: string
  icon: typeof BarChart3
  accent: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PartnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listing' | 'events' | 'upgrade'>('overview')
  const tier = TIER_COLOURS[mockPartner.tier]
  const statusInfo = STATUS_DISPLAY[mockPartner.status]
  const StatusIcon = statusInfo.icon

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-base">{mockPartner.businessName}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}>
                  {tier.label}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${statusInfo.colour}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mockPartner.tier !== 'premium' && (
              <button
                onClick={() => setActiveTab('upgrade')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Upgrade
              </button>
            )}
            <Link
              href={mockPartner.listingUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-slate-300 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View Listing
            </Link>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-6xl mx-auto flex gap-0">
          {(['overview', 'listing', 'events', 'upgrade'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Overview tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Profile completeness alert */}
            {mockPartner.profileComplete < 100 && (
              <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-amber-900">
                    Your profile is {mockPartner.profileComplete}% complete
                  </p>
                  <div className="mt-1.5 h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${mockPartner.profileComplete}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('listing')}
                  className="flex-shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900"
                >
                  Complete →
                </button>
              </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Profile Views"
                value={mockStats.profileViews.value}
                sub={`${mockStats.profileViews.change} ${mockStats.profileViews.period}`}
                icon={Eye}
                accent="bg-blue-100 text-blue-600"
              />
              <StatCard
                label="Referrals"
                value={mockStats.referrals.value}
                sub={mockStats.referrals.change + ' ' + mockStats.referrals.period}
                icon={Users}
                accent="bg-emerald-100 text-emerald-600"
              />
              <StatCard
                label="Directory Rank"
                value={mockStats.directoryRank.value}
                sub={mockStats.directoryRank.context}
                icon={BarChart3}
                accent="bg-purple-100 text-purple-600"
              />
              <StatCard
                label="Review Score"
                value={`${mockStats.reviewScore.value} ★`}
                sub={`${mockStats.reviewScore.count} reviews`}
                icon={Star}
                accent="bg-amber-100 text-amber-600"
              />
            </div>

            {/* Quick actions + upcoming events */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quick actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">Recommended Actions</h2>
                <ul className="space-y-2">
                  {mockActions.map(action => {
                    const Icon = action.icon
                    return (
                      <li key={action.label}>
                        <Link
                          href={action.href}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                            action.done
                              ? 'border-slate-100 bg-slate-50 opacity-60 cursor-default pointer-events-none'
                              : action.urgent
                              ? 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            action.done ? 'bg-emerald-100' : action.urgent ? 'bg-amber-100' : 'bg-slate-100'
                          }`}>
                            {action.done
                              ? <CheckCircle className="w-4 h-4 text-emerald-600" />
                              : <Icon className={`w-4 h-4 ${action.urgent ? 'text-amber-600' : 'text-slate-500'}`} />
                            }
                          </div>
                          <span className={`text-sm flex-1 ${action.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                            {action.label}
                          </span>
                          {!action.done && <ChevronRight className="w-4 h-4 text-slate-400" />}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Upcoming events */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-900">Upcoming Events</h2>
                  <Link href="/events" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                    View all →
                  </Link>
                </div>
                {mockUpcomingEvents.length > 0 ? (
                  <ul className="space-y-3">
                    {mockUpcomingEvents.map(ev => (
                      <li key={ev.title} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{ev.title}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />{ev.location} · {ev.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No upcoming events in your area.</p>
                )}
                <Link
                  href="/events/submit"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Submit an Event
                </Link>
              </div>
            </div>

            {/* IICRC certs */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-900">IICRC Certifications on Profile</h2>
                <button onClick={() => setActiveTab('listing')} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  Edit →
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockPartner.iicrcCertifications.map(cert => (
                  <span key={cert} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg">
                    <Award className="w-3.5 h-3.5" />
                    {cert}
                  </span>
                ))}
                <button
                  onClick={() => setActiveTab('listing')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs font-medium rounded-lg hover:border-slate-400 transition-colors"
                >
                  + Add cert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Listing tab ── */}
        {activeTab === 'listing' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
              <h2 className="text-base font-bold text-slate-900 mb-1">Edit Your Listing</h2>
              <p className="text-sm text-slate-500 mb-6">
                This information appears in the NRPG contractor directory. Listing edits go live within 24 hours.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Business name</label>
                  <input
                    defaultValue={mockPartner.businessName}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Short description (shown on directory card)</label>
                  <textarea
                    rows={3}
                    defaultValue="Expert water damage restoration in Melbourne and regional VIC. IICRC WRT, ASD & AMRT certified. Available 24/7 for emergency response."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">Max 160 characters. Keep it factual and certification-focused.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary service</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-emerald-500 outline-none appearance-none">
                    <option>Water Damage Restoration</option>
                    <option>Fire &amp; Smoke Restoration</option>
                    <option>Mould Remediation</option>
                    <option>Storm Damage</option>
                  </select>
                </div>

                {mockPartner.tier === 'community' && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <Lock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600">
                      Logo upload and website link are available on <strong>Standard</strong> and above.{' '}
                      <button onClick={() => setActiveTab('upgrade')} className="text-emerald-600 font-semibold hover:underline">
                        Upgrade your tier →
                      </button>
                    </p>
                  </div>
                )}

                <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Events tab ── */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Your Event Submissions</h2>
                <Link
                  href="/events/submit"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Submit Event
                </Link>
              </div>
              <div className="text-center py-12 text-slate-400">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium text-slate-500">No events submitted yet</p>
                <p className="text-xs mt-1">Submit an IICRC training course, conference, or industry event to appear on the calendar.</p>
                <Link
                  href="/events/submit"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Submit your first event
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Upgrade tab ── */}
        {activeTab === 'upgrade' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Upgrade Your Membership</h2>
              <p className="text-sm text-slate-500">
                You are currently on <strong>{tier.label}</strong>. Upgrade at any time — changes take effect immediately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Standard */}
              <div className={`bg-white rounded-xl border-2 p-6 ${mockPartner.tier === 'standard' ? 'border-blue-500' : 'border-slate-200'}`}>
                {mockPartner.tier === 'standard' && (
                  <span className="inline-block mb-3 text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Current plan</span>
                )}
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">Standard</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">$49<span className="text-sm font-normal text-slate-500">/mo</span></p>
                <p className="text-xs text-slate-400 mb-4">or $490/yr — save 2 months</p>
                <ul className="space-y-2 text-sm text-slate-700 mb-5">
                  {['Enhanced listing with logo', 'Receive job referrals', 'Priority directory placement', 'Premium template library', '3 service categories'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {mockPartner.tier === 'community' ? (
                  <Link
                    href="/industry-partners/join"
                    className="block w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                  >
                    Upgrade to Standard
                  </Link>
                ) : (
                  <p className="text-xs text-center text-slate-400">You have this plan</p>
                )}
              </div>

              {/* Premium */}
              <div className={`bg-white rounded-xl border-2 p-6 relative ${mockPartner.tier === 'premium' ? 'border-amber-500' : 'border-slate-200'}`}>
                <span className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 bg-amber-400 text-white rounded-full">Best Value</span>
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">Premium</h3>
                <p className="text-2xl font-bold text-amber-700 mb-1">$149<span className="text-sm font-normal text-slate-500">/mo</span></p>
                <p className="text-xs text-slate-400 mb-4">or $1,490/yr — save 2 months</p>
                <ul className="space-y-2 text-sm text-slate-700 mb-5">
                  {['Featured top placement', 'Verified badge on profile', 'First access to job referrals', 'Quarterly benchmark reports', 'Unlimited categories', 'Priority support'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {mockPartner.tier !== 'premium' ? (
                  <Link
                    href="/industry-partners/join"
                    className="block w-full text-center py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg transition-colors"
                  >
                    Upgrade to Premium
                  </Link>
                ) : (
                  <p className="text-xs text-center text-slate-400">You have this plan</p>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 text-center">
              Billing managed via Stripe. Cancel or downgrade at any time.{' '}
              <Link href="/terms" className="underline hover:text-slate-600">Terms apply.</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
