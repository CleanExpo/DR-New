'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Calendar,
  Building2,
  Filter,
  Search,
  ChevronDown,
  AlertTriangle,
  ArrowLeft,
  MapPin,
  Award,
  User,
  DollarSign,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type ApprovalType = 'event' | 'partner'
type ApprovalStatus = 'pending' | 'approved' | 'rejected'

interface EventSubmission {
  id: string
  type: 'event'
  status: ApprovalStatus
  submittedAt: string
  submittedBy: string
  title: string
  organiser: string
  category: string
  format: string
  startDate: string
  endDate: string
  location: string
  state: string
  iicrcCert?: string
  cecCredits?: number
  price: string
  description: string
}

interface PartnerSubmission {
  id: string
  type: 'partner'
  status: ApprovalStatus
  submittedAt: string
  businessName: string
  contactName: string
  contactRole: string
  country: string
  state: string
  primaryService: string
  yearsInBusiness: string
  iicrcCertifications: string[]
  hasInsurance: boolean
  insuranceValue?: string
  selectedTier: string
  abn?: string
}

type Submission = EventSubmission | PartnerSubmission

// ── Seed data ─────────────────────────────────────────────────────────────────

const seedData: Submission[] = [
  {
    id: 'EVT-001',
    type: 'event',
    status: 'pending',
    submittedAt: '2025-04-01T09:14:00',
    submittedBy: 'Jason Holt',
    title: 'IICRC WRT & ASD Combo Course — Brisbane',
    organiser: 'Total Flood Restore',
    category: 'IICRC Training',
    format: 'In-Person',
    startDate: '2025-05-12',
    endDate: '2025-05-16',
    location: 'Brisbane, QLD',
    state: 'QLD',
    iicrcCert: 'WRT + ASD',
    cecCredits: 14,
    price: '$2,400',
    description: 'A 5-day combo course covering Water Restoration Technician and Applied Structural Drying. IICRC-approved instructor. Max 14 students. Morning tea and lunch included.',
  },
  {
    id: 'EVT-002',
    type: 'event',
    status: 'pending',
    submittedAt: '2025-04-01T11:32:00',
    submittedBy: 'Sarah Nakamura',
    title: 'Mould Remediation Workshop — Tokyo',
    organiser: 'Japan Resto Pro',
    category: 'IICRC Training',
    format: 'In-Person',
    startDate: '2025-05-24',
    endDate: '2025-05-25',
    location: 'Tokyo, Kanto',
    state: 'Tokyo',
    iicrcCert: 'AMRT',
    cecCredits: 8,
    price: '¥85,000',
    description: 'Two-day AMRT preparation workshop with Japanese-language support. Covers IICRC S520, mould sampling, containment, and remediation protocols. Suitable for experienced water damage techs moving into mould.',
  },
  {
    id: 'EVT-003',
    type: 'event',
    status: 'approved',
    submittedAt: '2025-03-28T08:55:00',
    submittedBy: 'Marcus Webb',
    title: 'AU Restoration Industry Forum 2025 — Sydney',
    organiser: 'AIRC',
    category: 'Conference',
    format: 'In-Person',
    startDate: '2025-06-18',
    endDate: '2025-06-19',
    location: 'Sydney, NSW',
    state: 'NSW',
    price: '$750',
    description: 'Annual industry conference for restoration professionals. Keynote speakers, insurer roundtables, technical workshops, and networking dinner.',
  },
  {
    id: 'EVT-004',
    type: 'event',
    status: 'rejected',
    submittedAt: '2025-03-25T14:10:00',
    submittedBy: 'Chris Elford',
    title: 'FREE Water Damage Training Webinar',
    organiser: 'EquipMax Supplies',
    category: 'Webinar',
    format: 'Online',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    location: 'Online',
    state: 'Online',
    price: 'Free',
    description: 'Product demonstration webinar from EquipMax covering their new LGR dehumidifier range. Not IICRC-affiliated.',
  },
  {
    id: 'PTR-001',
    type: 'partner',
    status: 'pending',
    submittedAt: '2025-04-02T10:05:00',
    businessName: 'Rapid Dry Solutions Pty Ltd',
    contactName: 'Amanda Pierce',
    contactRole: 'Director',
    country: 'AU',
    state: 'VIC',
    primaryService: 'Water Damage Restoration',
    yearsInBusiness: '5-10',
    iicrcCertifications: ['WRT', 'ASD', 'AMRT'],
    hasInsurance: true,
    insuranceValue: '$20M+',
    selectedTier: 'standard',
    abn: '45 678 901 234',
  },
  {
    id: 'PTR-002',
    type: 'partner',
    status: 'pending',
    submittedAt: '2025-04-02T13:45:00',
    businessName: 'Clean Slate Restoration NZ',
    contactName: 'Tom Gallagher',
    contactRole: 'Owner',
    country: 'NZ',
    state: 'Auckland',
    primaryService: 'Mould Remediation',
    yearsInBusiness: '3-5',
    iicrcCertifications: ['WRT', 'AMRT'],
    hasInsurance: true,
    insuranceValue: '$10M+',
    selectedTier: 'community',
  },
  {
    id: 'PTR-003',
    type: 'partner',
    status: 'approved',
    submittedAt: '2025-03-29T09:20:00',
    businessName: 'FireSafe Restore Pty Ltd',
    contactName: 'Daniel Okafor',
    contactRole: 'Operations Manager',
    country: 'AU',
    state: 'QLD',
    primaryService: 'Fire & Smoke Restoration',
    yearsInBusiness: '10+',
    iicrcCertifications: ['WRT', 'FSRT', 'CCT', 'ASD'],
    hasInsurance: true,
    insuranceValue: '$20M+',
    selectedTier: 'premium',
    abn: '61 234 567 890',
  },
]

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ApprovalStatus }) {
  if (status === 'pending') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      <Clock className="w-3 h-3" />Pending
    </span>
  )
  if (status === 'approved') return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
      <CheckCircle className="w-3 h-3" />Approved
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
      <XCircle className="w-3 h-3" />Rejected
    </span>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ApprovalsPage() {
  const [items, setItems] = useState<Submission[]>(seedData)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<ApprovalType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<ApprovalStatus | 'all'>('pending')
  const [selected, setSelected] = useState<Submission | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Counts
  const pendingCount = items.filter(i => i.status === 'pending').length
  const approvedCount = items.filter(i => i.status === 'approved').length
  const rejectedCount = items.filter(i => i.status === 'rejected').length

  // Filtered
  const filtered = items.filter(item => {
    const matchType = filterType === 'all' || item.type === filterType
    const matchStatus = filterStatus === 'all' || item.status === filterStatus
    const searchLower = search.toLowerCase()
    const matchSearch = !search ||
      item.id.toLowerCase().includes(searchLower) ||
      (item.type === 'event'
        ? ((item as EventSubmission).title.toLowerCase().includes(searchLower) || (item as EventSubmission).organiser.toLowerCase().includes(searchLower))
        : ((item as PartnerSubmission).businessName.toLowerCase().includes(searchLower) || (item as PartnerSubmission).contactName.toLowerCase().includes(searchLower)))
    return matchType && matchStatus && matchSearch
  })

  const doAction = async (id: string, action: 'approved' | 'rejected') => {
    setActionLoading(id + action)
    // API route /api/admin/approvals to be wired when auth is in place
    await new Promise(r => setTimeout(r, 800))
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: action } : null)
    setActionLoading(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/gbp-dashboard" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Approvals Queue</h1>
              <p className="text-xs text-slate-500">Events & contractor partner submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">{pendingCount} pending</span>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{approvedCount} approved</span>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full font-medium">{rejectedCount} rejected</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* Left: List */}
        <div className={`${selected ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-1 min-w-48 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search submissions..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div className="relative">
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value as ApprovalType | 'all')}
                className="pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:border-emerald-400 outline-none"
              >
                <option value="all">All types</option>
                <option value="event">Events</option>
                <option value="partner">Partners</option>
              </select>
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as ApprovalStatus | 'all')}
                className="pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:border-emerald-400 outline-none"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 text-sm">
              No submissions match your filters.
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(item => {
                const isEvent = item.type === 'event'
                const ev = item as EventSubmission
                const pt = item as PartnerSubmission
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelected(selected?.id === item.id ? null : item)}
                    className={`w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-sm ${
                      selected?.id === item.id ? 'border-emerald-400 ring-1 ring-emerald-200' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isEvent ? 'bg-blue-100' : 'bg-purple-100'}`}>
                          {isEvent ? <Calendar className="w-4 h-4 text-blue-600" /> : <Building2 className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {isEvent ? ev.title : pt.businessName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {isEvent ? ev.organiser : `${pt.contactName} · ${pt.state}, ${pt.country}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <StatusBadge status={item.status} />
                        <span className="text-xs text-slate-400">{item.id}</span>
                      </div>
                    </div>
                    {item.status === 'pending' && (
                      <div className="flex gap-2 mt-3" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => doAction(item.id, 'approved')}
                          disabled={!!actionLoading}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                          {actionLoading === item.id + 'approved' ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => doAction(item.id, 'rejected')}
                          disabled={!!actionLoading}
                          className="flex-1 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                          {actionLoading === item.id + 'rejected' ? 'Rejecting...' : 'Reject'}
                        </button>
                        <button
                          onClick={() => setSelected(item)}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: Detail panel */}
        {selected && (
          <div className="flex-1 min-w-0 lg:max-w-lg">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${selected.type === 'event' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {selected.type === 'event' ? 'Event' : 'Partner'}
                    </span>
                    <StatusBadge status={selected.status} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {selected.type === 'event'
                      ? (selected as EventSubmission).title
                      : (selected as PartnerSubmission).businessName
                    }
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.id} · submitted {new Date(selected.submittedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 ml-3">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Event details */}
              {selected.type === 'event' && (() => {
                const ev = selected as EventSubmission
                return (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{ev.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{new Date(ev.startDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })} – {new Date(ev.endDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <DollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{ev.price}</span>
                      </div>
                    </div>
                    {ev.iicrcCert && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Award className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{ev.iicrcCert} · {ev.cecCredits} CECs</span>
                      </div>
                    )}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      {ev.description}
                    </div>
                    {!ev.iicrcCert && (
                      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800">This event is not linked to an IICRC certification. Check whether it meets listing guidelines before approving.</p>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Partner details */}
              {selected.type === 'partner' && (() => {
                const pt = selected as PartnerSubmission
                return (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Contact</p>
                        <p className="text-slate-700 font-medium">{pt.contactName}</p>
                        <p className="text-xs text-slate-500">{pt.contactRole}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Location</p>
                        <p className="text-slate-700">{pt.state}, {pt.country}</p>
                        {pt.abn && <p className="text-xs text-slate-500">ABN: {pt.abn}</p>}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Service</p>
                        <p className="text-slate-700">{pt.primaryService}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Experience</p>
                        <p className="text-slate-700">{pt.yearsInBusiness} yrs</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1.5">IICRC certifications</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pt.iicrcCertifications.length > 0
                          ? pt.iicrcCertifications.map(c => (
                              <span key={c} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">{c}</span>
                            ))
                          : <span className="text-xs text-slate-400">None declared</span>
                        }
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Insurance</p>
                        <p className={`text-sm font-medium ${pt.hasInsurance ? 'text-emerald-700' : 'text-red-600'}`}>
                          {pt.hasInsurance ? `Yes${pt.insuranceValue ? ` (${pt.insuranceValue})` : ''}` : 'Not declared'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Requested tier</p>
                        <p className="text-slate-700 font-medium capitalize">{pt.selectedTier}</p>
                      </div>
                    </div>
                    {!pt.hasInsurance && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-800">Applicant has not confirmed public liability insurance. NRPG code of conduct requires active coverage.</p>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Action buttons */}
              {selected.status === 'pending' && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => doAction(selected.id, 'approved')}
                    disabled={!!actionLoading}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {actionLoading === selected.id + 'approved' ? 'Approving...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => doAction(selected.id, 'rejected')}
                    disabled={!!actionLoading}
                    className="flex-1 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-semibold text-sm rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    {actionLoading === selected.id + 'rejected' ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
