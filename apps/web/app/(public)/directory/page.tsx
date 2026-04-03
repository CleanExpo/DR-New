'use client'

import React from 'react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import type { ElementType } from 'react'
import {
  Building2,
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  Filter,
  Star,
  CheckCircle,
  Layers,
  Wrench,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
  Truck,
  Globe,
  Award,
} from 'lucide-react'

// --- Static placeholder listings ---
// These will be replaced by Supabase-backed data once the directory backend is live.
const listings = [
  {
    id: 'placeholder-01',
    name: 'Dri-Eaz Australia',
    slug: 'dri-eaz-australia',
    tier: 'premium',
    category: 'Equipment',
    subcategory: 'Drying & Dehumidification',
    description:
      'Leading supplier of IICRC-approved structural drying equipment — dehumidifiers, air movers, and moisture meters. Nationwide distribution with next-day metro delivery.',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA'],
    country: 'AU',
    rating: 4.9,
    reviewCount: 47,
    iicrcApproved: true,
    featured: true,
    tags: ['Dehumidifiers', 'Air Movers', 'Moisture Meters'],
  },
  {
    id: 'placeholder-02',
    name: 'Medizone Pacific',
    slug: 'medizone-pacific',
    tier: 'premium',
    category: 'Chemicals',
    subcategory: 'Disinfection & Deodorisation',
    description:
      'Ozone and hydroxyl deodorisation systems. IICRC S520-compliant chemical lines for mould remediation, biohazard decontamination, and smoke odour elimination.',
    states: ['NSW', 'VIC', 'QLD', 'NZ'],
    country: 'AU',
    rating: 4.8,
    reviewCount: 31,
    iicrcApproved: true,
    featured: true,
    tags: ['Ozone', 'Hydroxyl', 'Mould Remediation'],
  },
  {
    id: 'placeholder-03',
    name: 'Carpet & Restoration Training Institute',
    slug: 'crti-australia',
    tier: 'standard',
    category: 'Training',
    subcategory: 'IICRC Approved Instructor',
    description:
      'IICRC Approved Instructor delivering WRT, AMRT, FSRT, and ASD courses across QLD and NSW. Corporate group bookings available. On-site training at your facility.',
    states: ['QLD', 'NSW'],
    country: 'AU',
    rating: 4.7,
    reviewCount: 28,
    iicrcApproved: true,
    featured: false,
    tags: ['WRT', 'AMRT', 'FSRT', 'ASD'],
  },
  {
    id: 'placeholder-04',
    name: 'RestoTech Equipment',
    slug: 'restotech-equipment',
    tier: 'standard',
    category: 'Equipment',
    subcategory: 'Extraction & Pumping',
    description:
      'Truck-mounts, portable extractors, and flood pumpers. Sales, hire, and service nationally. Specialising in resale of reconditioned commercial extraction equipment.',
    states: ['VIC', 'NSW', 'SA'],
    country: 'AU',
    rating: 4.5,
    reviewCount: 19,
    iicrcApproved: false,
    featured: false,
    tags: ['Extraction', 'Truck Mounts', 'Hire'],
  },
  {
    id: 'placeholder-05',
    name: 'SafeWork Safety Solutions',
    slug: 'safework-safety',
    tier: 'standard',
    category: 'PPE & Safety',
    subcategory: 'Personal Protective Equipment',
    description:
      'Full range of PPE for biohazard, asbestos, and mould remediation. Tyvek suits, full-face respirators, nitrile gloves, and HEPA vacuum systems. Same-day dispatch.',
    states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'NZ'],
    country: 'AU',
    rating: 4.6,
    reviewCount: 23,
    iicrcApproved: false,
    featured: false,
    tags: ['PPE', 'Respirators', 'Tyvek', 'HEPA'],
  },
  {
    id: 'placeholder-06',
    name: 'Restoration Japan Ltd',
    slug: 'restoration-japan',
    tier: 'community',
    category: 'Equipment',
    subcategory: 'Drying & Dehumidification',
    description:
      'IICRC-certified restoration equipment distributor serving Japan. Partner supplier for AU/NZ-trained technicians operating in Japan. Japanese and English support.',
    states: [],
    country: 'JP',
    rating: 4.4,
    reviewCount: 8,
    iicrcApproved: true,
    featured: false,
    tags: ['Japan', 'Drying', 'Dehumidification'],
  },
]

const categoryOptions = ['All Categories', 'Equipment', 'Chemicals', 'Training', 'PPE & Safety', 'Insurance', 'Assessment']
const countryOptions = ['All Countries', 'AU', 'NZ', 'JP']
const stateOptions = ['All States', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS', 'NT', 'NZ', 'Japan']
const tierOptions = ['All Tiers', 'premium', 'standard', 'community']

const tierBadge: Record<string, string> = {
  premium: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  standard: 'bg-blue-100 text-blue-700 border border-blue-200',
  community: 'bg-slate-100 text-slate-500 border border-slate-200',
}

const tierLabel: Record<string, string> = {
  premium: 'Premium',
  standard: 'Standard',
  community: 'Community',
}

const categoryIcon: Record<string, ElementType<{ className?: string }>> = {
  Equipment: Wrench,
  Chemicals: FlaskConical,
  Training: GraduationCap,
  'PPE & Safety': ShieldCheck,
  Insurance: ShieldCheck,
  Assessment: Award,
  default: Building2,
}

const pricingTiers = [
  {
    name: 'Community',
    price: 'Free',
    period: '',
    description: 'Get listed and be found by NRPG contractors',
    features: [
      'Basic directory listing',
      'Category and state tags',
      'Contact form (no email/phone shown)',
      'Access to ANZ Events Calendar',
      'NRPG newsletter (monthly)',
    ],
    cta: 'List for Free',
    ctaStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    accent: 'border-slate-200',
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '$49',
    period: '/month',
    description: 'Full profile with logo, reviews, and event posting',
    features: [
      'Full directory profile with logo',
      'Multi-category listing',
      'Customer reviews enabled',
      'Post events to ANZ calendar',
      'Featured in category searches',
      'Monthly analytics report',
    ],
    cta: 'Get Started',
    ctaStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
    accent: 'border-blue-300',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$149',
    period: '/month',
    description: 'Maximum visibility across the NRPG network',
    features: [
      'Featured placement in all searches',
      'Homepage supplier spotlight',
      'Monthly blog feature opportunity',
      'Newsletter sponsor slot',
      'Priority event listing',
      'Podcast mention opportunity',
      'Dedicated account manager',
    ],
    cta: 'Apply for Premium',
    ctaStyle: 'bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold',
    accent: 'border-yellow-400',
    highlighted: true,
  },
]

export default function SupplierDirectoryPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [stateFilter, setStateFilter] = useState('All States')
  const [tierFilter, setTierFilter] = useState('All Tiers')

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch =
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase()) ||
        l.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = categoryFilter === 'All Categories' || l.category === categoryFilter
      const matchesState =
        stateFilter === 'All States' ||
        l.states.includes(stateFilter) ||
        (stateFilter === 'Japan' && l.country === 'JP')
      const matchesTier = tierFilter === 'All Tiers' || l.tier === tierFilter
      return matchesSearch && matchesCategory && matchesState && matchesTier
    })
  }, [search, categoryFilter, stateFilter, tierFilter])

  const featuredListings = filtered.filter((l) => l.featured)
  const standardListings = filtered.filter((l) => !l.featured)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Supplier Directory — Australia, New Zealand &amp; Japan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Find Vetted Restoration Suppliers
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Equipment suppliers, chemical manufacturers, training providers, and PPE distributors — verified by the NRPG network across Australia, New Zealand, and Japan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#listings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              Search Directory
            </a>
            <a
              href="#list-your-business"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors"
            >
              List Your Business
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-white border-b border-slate-200 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: 'AU · NZ · JP', label: 'Markets covered' },
            { value: '6+', label: 'Supplier categories' },
            { value: 'Free', label: 'Basic listing cost' },
            { value: 'Verified', label: 'NRPG network suppliers' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-slate-900 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section id="listings" className="bg-white border-b border-slate-200 py-5 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search suppliers, products, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {categoryOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {stateOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="pl-4 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                {tierOptions.map((o) => <option key={o} value={o}>{o === 'All Tiers' ? o : tierLabel[o] ?? o}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {filtered.length} supplier{filtered.length !== 1 ? 's' : ''} found
            {' · '}
            <span className="text-blue-500">Directory is in early access — listings are growing weekly</span>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Featured */}
          {featuredListings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-slate-700">Featured Suppliers</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {featuredListings.map((listing) => {
                  const Icon = categoryIcon[listing.category] ?? categoryIcon.default
                  return (
                    <div
                      key={listing.id}
                      className="bg-white rounded-2xl p-6 border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                            <Icon className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">{listing.name}</div>
                            <div className="text-xs text-slate-500">{listing.subcategory}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierBadge[listing.tier]}`}>
                            {tierLabel[listing.tier]}
                          </span>
                          {listing.iicrcApproved && (
                            <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              IICRC
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{listing.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {listing.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {listing.country === 'JP' ? 'Japan' : listing.states.slice(0, 3).join(', ')}
                          {listing.states.length > 3 && ` +${listing.states.length - 3}`}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-slate-700">{listing.rating}</span>
                          <span>({listing.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Standard listings */}
          {standardListings.length > 0 && (
            <div className="space-y-3">
              {standardListings.map((listing) => {
                const Icon = categoryIcon[listing.category] ?? categoryIcon.default
                return (
                  <div
                    key={listing.id}
                    className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-semibold text-slate-900 text-sm">{listing.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierBadge[listing.tier]}`}>
                            {tierLabel[listing.tier]}
                          </span>
                          {listing.iicrcApproved && (
                            <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              IICRC
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mb-1">{listing.subcategory} · {listing.country === 'JP' ? 'Japan' : listing.states.slice(0, 3).join(', ')}</div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{listing.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-slate-700">{listing.rating}</span>
                        </div>
                        <Link
                          href={`/directory/${listing.slug}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          View
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No suppliers match your filters.</p>
              <p className="text-sm mt-1">Try broadening your search or clearing filters.</p>
            </div>
          )}

          {/* CTA to list */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Are you a supplier not listed here?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Basic listings are free. Get found by NRPG contractors across Australia, New Zealand, and Japan.
            </p>
            <a
              href="#list-your-business"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              List Your Business
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="list-your-business" className="bg-white py-20 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">List Your Business</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Connect with IICRC-certified restoration contractors across Australia, New Zealand, and Japan. Choose the tier that fits your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border-2 ${tier.accent} ${tier.highlighted ? 'shadow-xl ring-2 ring-yellow-400 ring-offset-2' : ''} relative`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{tier.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.period && <span className="text-slate-500 text-sm">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{tier.description}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            All plans include access to the NRPG contractor network across Australia, New Zealand, and Japan. No lock-in contracts.
          </p>
        </div>
      </section>

      {/* Industry Partners link */}
      <section className="bg-slate-50 border-t border-slate-200 py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Part of the NRPG Industry Hub</h3>
            <p className="text-sm text-slate-500">
              The Supplier Directory is one of six resources in the{' '}
              <Link href="/industry-partners" className="text-emerald-600 hover:underline">Industry Partners Hub</Link>.
            </p>
          </div>
          <Link
            href="/industry-partners"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm rounded-lg bg-white transition-colors"
          >
            <Layers className="w-4 h-4" />
            Industry Hub
          </Link>
        </div>
      </section>
    </div>
  )
}
