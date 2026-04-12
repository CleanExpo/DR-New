'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import eventsData from '@/data/events.json'
import { Calendar, MapPin, Tag, Users, Filter, ChevronRight, Clock, Award } from 'lucide-react'

type EventCategory = 'all' | 'iicrc-training' | 'conference' | 'trade-show' | 'networking' | 'seminar' | 'supplier-day' | 'standards' | 'webinar'
type EventType = 'all' | 'in-person' | 'virtual' | 'hybrid'

const CATEGORY_LABELS: Record<string, string> = {
  'iicrc-training': 'IICRC Training',
  'conference': 'Conference',
  'trade-show': 'Trade Show',
  'networking': 'Networking',
  'seminar': 'Seminar',
  'supplier-day': 'Supplier Day',
  'standards': 'Standards',
  'webinar': 'Webinar',
}

const CATEGORY_COLOURS: Record<string, string> = {
  'iicrc-training': 'bg-blue-100 text-blue-800',
  'conference': 'bg-emerald-100 text-emerald-800',
  'trade-show': 'bg-purple-100 text-purple-800',
  'networking': 'bg-orange-100 text-orange-800',
  'seminar': 'bg-sky-100 text-sky-800',
  'supplier-day': 'bg-yellow-100 text-yellow-800',
  'standards': 'bg-red-100 text-red-800',
  'webinar': 'bg-teal-100 text-teal-800',
}

const STATE_LABELS: Record<string, string> = {
  'NAT': 'National / Online',
  'NSW': 'New South Wales',
  'VIC': 'Victoria',
  'QLD': 'Queensland',
  'SA': 'South Australia',
  'WA': 'Western Australia',
  'TAS': 'Tasmania',
  'NT': 'Northern Territory',
  'ACT': 'ACT',
  'NZ': 'New Zealand',
}

const eventsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'ANZ Restoration & Cleaning Industry Events Calendar',
  description: 'Complete calendar of IICRC training, conferences, trade shows, and networking events for the Australian and New Zealand disaster recovery and restoration industry.',
  url: 'https://disasterrecovery.com.au/events',
  numberOfItems: eventsData.events.length,
  itemListElement: eventsData.events.map((event, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: event.title,
    url: `https://disasterrecovery.com.au/events/${event.slug}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
    { '@type': 'ListItem', position: 2, name: 'Industry Events', item: 'https://disasterrecovery.com.au/events' },
  ],
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  if (startDate === endDate) return start.toLocaleDateString('en-AU', options)
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.toLocaleDateString('en-AU', options)}`
  }
  return `${start.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-AU', options)}`
}

function getMonthLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}

export default function EventsPage() {
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>('all')
  const [typeFilter, setTypeFilter] = useState<EventType>('all')
  const [stateFilter, setStateFilter] = useState<string>('all')

  const today = new Date().toISOString().split('T')[0]

  const filteredEvents = useMemo(() => {
    return eventsData.events
      .filter(event => event.startDate >= today)
      .filter(event => categoryFilter === 'all' || event.category === categoryFilter)
      .filter(event => typeFilter === 'all' || event.type === typeFilter)
      .filter(event => stateFilter === 'all' || event.stateCode === stateFilter)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
  }, [categoryFilter, typeFilter, stateFilter, today])

  const featuredEvents = eventsData.events
    .filter(e => e.featured && e.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 3)

  const availableStates = useMemo(() => {
    const codes = new Set(eventsData.events.map(e => e.stateCode))
    return Array.from(codes).sort()
  }, [])

  // Group events by month for timeline view
  const groupedByMonth = useMemo(() => {
    const groups: Record<string, typeof filteredEvents> = {}
    for (const event of filteredEvents) {
      const month = getMonthLabel(event.startDate)
      if (!groups[month]) groups[month] = []
      groups[month].push(event)
    }
    return groups
  }, [filteredEvents])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              <span>ANZ Industry Calendar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Restoration & Cleaning{' '}
              <span className="text-emerald-400">Industry Events</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mb-8">
              IICRC training courses, industry conferences, trade shows, and networking events
              for Australian and New Zealand disaster recovery professionals.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-slate-200">
                <Award className="h-4 w-4 text-emerald-400" />
                <span>{eventsData.events.filter(e => e.category === 'iicrc-training').length} IICRC courses</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-slate-200">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>{eventsData.events.length}+ events listed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-slate-200">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>AU &amp; NZ coverage</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-6xl py-12">
          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Events</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredEvents.map(event => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLOURS[event.category] ?? 'bg-slate-100 text-slate-700'}`}>
                        {CATEGORY_LABELS[event.category] ?? event.category}
                      </span>
                      {event.type === 'virtual' && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Online</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{event.type === 'virtual' ? 'Online' : `${event.city}, ${event.stateCode}`}</span>
                    </div>
                    <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                      View details <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Filters */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
              <Filter className="h-4 w-4" />
              <span>Filter Events</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value as EventCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {/* Type */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Format</label>
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value as EventType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">In-Person &amp; Online</option>
                  <option value="in-person">In-Person Only</option>
                  <option value="virtual">Online Only</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              {/* State */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">State / Region</label>
                <select
                  value={stateFilter}
                  onChange={e => setStateFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">All States</option>
                  {availableStates.map(code => (
                    <option key={code} value={code}>{STATE_LABELS[code] ?? code}</option>
                  ))}
                </select>
              </div>
            </div>
            {filteredEvents.length !== eventsData.events.length && (
              <p className="mt-3 text-sm text-slate-500">
                Showing {filteredEvents.length} of {eventsData.events.length} upcoming events
                {' '}
                <button
                  onClick={() => { setCategoryFilter('all'); setTypeFilter('all'); setStateFilter('all') }}
                  className="text-emerald-600 hover:text-emerald-800 font-medium underline"
                >
                  Clear filters
                </button>
              </p>
            )}
          </section>

          {/* Events Timeline */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium mb-2">No upcoming events match your filters</p>
              <p className="text-sm">Try adjusting the category, format, or state filters above.</p>
            </div>
          ) : (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Events</h2>
              <div className="space-y-10">
                {Object.entries(groupedByMonth).map(([month, monthEvents]) => (
                  <div key={month}>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider">{month}</h3>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                    <div className="space-y-3">
                      {monthEvents.map(event => (
                        <Link
                          key={event.id}
                          href={`/events/${event.slug}`}
                          className="group flex flex-col sm:flex-row gap-4 bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all"
                        >
                          {/* Date block */}
                          <div className="sm:w-24 flex-shrink-0">
                            <div className="text-center bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                              <div className="text-xs text-slate-500 font-medium">
                                {new Date(event.startDate).toLocaleDateString('en-AU', { month: 'short' })}
                              </div>
                              <div className="text-2xl font-bold text-slate-900 leading-none my-0.5">
                                {new Date(event.startDate).getDate()}
                              </div>
                              <div className="text-xs text-slate-400">
                                {new Date(event.startDate).getFullYear()}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[event.category] ?? 'bg-slate-100 text-slate-700'}`}>
                                {CATEGORY_LABELS[event.category] ?? event.category}
                              </span>
                              {event.iicrcCredits > 0 && (
                                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                  {event.iicrcCredits} IICRC CECs
                                </span>
                              )}
                              {event.certificationOffered && (
                                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                  {event.certificationOffered} Certification
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 leading-tight mb-1.5">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{formatDateRange(event.startDate, event.endDate)}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>
                                  {event.type === 'virtual'
                                    ? 'Online'
                                    : event.venue
                                      ? `${event.venue}, ${event.city}`
                                      : `${event.city}, ${event.stateCode}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Tag className="h-3.5 w-3.5" />
                                <span>{event.price}</span>
                              </div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="hidden sm:flex items-center">
                            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Panel */}
          <section className="mt-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Want to list your event?</h2>
            <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
              Running an IICRC course, industry conference, or supplier day? Get listed in front of thousands of ANZ restoration professionals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Submit your event <ChevronRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}
