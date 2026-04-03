'use client'

/**
 * DR-40 — IICRC Course Finder
 * Search IICRC certification courses by cert type, location, and date.
 * Covers AU, NZ, and Japan markets.
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BookOpen, MapPin, Calendar, ExternalLink } from 'lucide-react'

type CertType = 'all' | 'WRT' | 'ASD' | 'AMRT' | 'FSRT' | 'OCT' | 'CCT' | 'OSHA'
type Country = 'all' | 'AU' | 'NZ' | 'JP'
type Format = 'all' | 'in-person' | 'online'

interface Course {
  id: string
  cert: Exclude<CertType, 'all'>
  title: string
  provider: string
  city: string
  country: Country extends 'all' ? never : Country
  format: Format extends 'all' ? never : Format
  date: string
  seats: number
  link: string
}

const CERT_LABELS: Record<Exclude<CertType, 'all'>, { label: string; colour: string; description: string }> = {
  WRT: { label: 'WRT — Water Damage Restoration Technician', colour: 'text-blue-400', description: 'IICRC S500 aligned. Foundation water certification.' },
  ASD: { label: 'ASD — Applied Structural Drying Technician', colour: 'text-cyan-400', description: 'Advanced drying science. Requires WRT.' },
  AMRT: { label: 'AMRT — Applied Microbial Remediation Technician', colour: 'text-green-400', description: 'IICRC S520 mould remediation standard.' },
  FSRT: { label: 'FSRT — Fire and Smoke Restoration Technician', colour: 'text-orange-400', description: 'IICRC S770 fire/smoke restoration.' },
  OCT: { label: 'OCT — Odour Control Technician', colour: 'text-purple-400', description: 'Odour identification and deodorisation techniques.' },
  CCT: { label: 'CCT — Carpet Cleaning Technician', colour: 'text-yellow-400', description: 'Carpet and upholstery cleaning fundamentals.' },
  OSHA: { label: 'OSHA — Hazard Awareness', colour: 'text-red-400', description: 'Workplace health and safety fundamentals.' },
}

const SEEDED_COURSES: Course[] = [
  { id: 'c1', cert: 'WRT', title: 'WRT Water Damage Restoration Technician', provider: 'IICRC Australia', city: 'Sydney', country: 'AU', format: 'in-person', date: '2026-05-12', seats: 16, link: 'https://iicrc.org' },
  { id: 'c2', cert: 'WRT', title: 'WRT Water Damage Restoration Technician', provider: 'IICRC Australia', city: 'Melbourne', country: 'AU', format: 'in-person', date: '2026-05-19', seats: 12, link: 'https://iicrc.org' },
  { id: 'c3', cert: 'ASD', title: 'ASD Applied Structural Drying Technician', provider: 'IICRC Australia', city: 'Brisbane', country: 'AU', format: 'in-person', date: '2026-06-02', seats: 8, link: 'https://iicrc.org' },
  { id: 'c4', cert: 'AMRT', title: 'AMRT Applied Microbial Remediation Technician', provider: 'IICRC Australia', city: 'Perth', country: 'AU', format: 'in-person', date: '2026-06-09', seats: 10, link: 'https://iicrc.org' },
  { id: 'c5', cert: 'WRT', title: 'WRT — Online Delivery', provider: 'IICRC Online', city: 'Online', country: 'AU', format: 'online', date: '2026-05-05', seats: 40, link: 'https://iicrc.org' },
  { id: 'c6', cert: 'FSRT', title: 'FSRT Fire and Smoke Restoration Technician', provider: 'IICRC Australia', city: 'Adelaide', country: 'AU', format: 'in-person', date: '2026-07-14', seats: 14, link: 'https://iicrc.org' },
  { id: 'c7', cert: 'WRT', title: 'WRT Water Damage Restoration Technician', provider: 'IICRC New Zealand', city: 'Auckland', country: 'NZ', format: 'in-person', date: '2026-05-26', seats: 12, link: 'https://iicrc.org' },
  { id: 'c8', cert: 'AMRT', title: 'AMRT Applied Microbial Remediation Technician', provider: 'IICRC New Zealand', city: 'Wellington', country: 'NZ', format: 'in-person', date: '2026-06-23', seats: 10, link: 'https://iicrc.org' },
  { id: 'c9', cert: 'ASD', title: 'ASD Applied Structural Drying', provider: 'IICRC New Zealand', city: 'Christchurch', country: 'NZ', format: 'in-person', date: '2026-07-07', seats: 8, link: 'https://iicrc.org' },
  { id: 'c10', cert: 'WRT', title: 'WRT — Online Delivery', provider: 'IICRC Online', city: 'Online', country: 'NZ', format: 'online', date: '2026-05-05', seats: 40, link: 'https://iicrc.org' },
  { id: 'c11', cert: 'WRT', title: 'WRT Water Damage Restoration Technician', provider: 'IICRC Japan', city: 'Tokyo', country: 'JP', format: 'in-person', date: '2026-06-15', seats: 16, link: 'https://iicrc.org' },
  { id: 'c12', cert: 'AMRT', title: 'AMRT Applied Microbial Remediation Technician', provider: 'IICRC Japan', city: 'Osaka', country: 'JP', format: 'in-person', date: '2026-07-20', seats: 12, link: 'https://iicrc.org' },
  { id: 'c13', cert: 'CCT', title: 'CCT Carpet Cleaning Technician', provider: 'IICRC Australia', city: 'Melbourne', country: 'AU', format: 'in-person', date: '2026-05-28', seats: 18, link: 'https://iicrc.org' },
  { id: 'c14', cert: 'OCT', title: 'OCT Odour Control Technician', provider: 'IICRC Australia', city: 'Sydney', country: 'AU', format: 'in-person', date: '2026-06-30', seats: 12, link: 'https://iicrc.org' },
  { id: 'c15', cert: 'OSHA', title: 'OSHA Hazard Awareness', provider: 'IICRC Online', city: 'Online', country: 'AU', format: 'online', date: '2026-05-01', seats: 100, link: 'https://iicrc.org' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://disasterrecovery.com.au/tools' },
        { '@type': 'ListItem', position: 3, name: 'Course Finder', item: 'https://disasterrecovery.com.au/tools/course-finder' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'IICRC Course Finder',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
      description: 'Search IICRC certification courses by type, location, and date across Australia, New Zealand, and Japan.',
    },
  ],
}

const COUNTRY_FLAG: Record<string, string> = { AU: '🇦🇺', NZ: '🇳🇿', JP: '🇯🇵' }

export default function CourseFinderPage() {
  const [certFilter, setCertFilter] = useState<CertType>('all')
  const [countryFilter, setCountryFilter] = useState<Country>('all')
  const [formatFilter, setFormatFilter] = useState<Format>('all')

  const filtered = useMemo(() =>
    SEEDED_COURSES.filter(c =>
      (certFilter === 'all' || c.cert === certFilter) &&
      (countryFilter === 'all' || c.country === countryFilter) &&
      (formatFilter === 'all' || c.format === formatFilter)
    ).sort((a, b) => a.date.localeCompare(b.date)),
    [certFilter, countryFilter, formatFilter]
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#050505] text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <nav className="text-sm text-slate-500 mb-8 flex gap-2">
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-slate-300">Course Finder</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-black">IICRC Course Finder</h1>
          </div>
          <p className="text-slate-400 mb-10">
            Search upcoming IICRC certification courses across Australia, New Zealand, and Japan.
          </p>

          {/* Cert reference */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Certification Guide</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {(Object.entries(CERT_LABELS) as [Exclude<CertType, 'all'>, typeof CERT_LABELS[keyof typeof CERT_LABELS]][]).map(([cert, info]) => (
                <div key={cert} className="flex gap-3 text-sm">
                  <span className={`font-bold w-12 shrink-0 ${info.colour}`}>{cert}</span>
                  <span className="text-slate-400">{info.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Certification</label>
              <select value={certFilter} onChange={e => setCertFilter(e.target.value as CertType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                <option value="all">All Certifications</option>
                {(Object.keys(CERT_LABELS) as Exclude<CertType, 'all'>[]).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Country</label>
              <select value={countryFilter} onChange={e => setCountryFilter(e.target.value as Country)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                <option value="all">All Countries</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="NZ">🇳🇿 New Zealand</option>
                <option value="JP">🇯🇵 Japan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Format</label>
              <select value={formatFilter} onChange={e => setFormatFilter(e.target.value as Format)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                <option value="all">All Formats</option>
                <option value="in-person">In-person</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</span>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
              <p className="text-slate-400">No courses match your filters.</p>
              <button
                onClick={() => { setCertFilter('all'); setCountryFilter('all'); setFormatFilter('all') }}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(course => {
                const certInfo = CERT_LABELS[course.cert]
                const dateObj = new Date(course.date + 'T00:00:00')
                const formattedDate = dateObj.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })

                return (
                  <div key={course.id} className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-5 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 ${certInfo.colour}`}>
                            {course.cert}
                          </span>
                          <span className="text-xs text-slate-500">
                            {COUNTRY_FLAG[course.country]} {course.country}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            course.format === 'online' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {course.format === 'online' ? 'Online' : 'In-person'}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm mb-2">{course.title}</h3>

                        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {course.city} · {course.provider}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                          </span>
                          <span className={course.seats <= 5 ? 'text-red-400 font-semibold' : ''}>
                            {course.seats} seats available
                          </span>
                        </div>
                      </div>

                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        Book
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <p className="text-xs text-slate-600 mt-8 text-center">
            Course dates and availability are indicative. Confirm directly with IICRC or the registered course provider.
            Visit iicrc.org for the authoritative course schedule.
          </p>
        </div>
      </main>
    </>
  )
}
