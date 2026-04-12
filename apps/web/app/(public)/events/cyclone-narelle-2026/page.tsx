/**
 * Event Landing Page — Cyclone Narelle 2026 (Western Australia)
 *
 * DR-320 [P0] TIME-CRITICAL
 * SEO: "Cyclone Narelle insurance claim", "cyclone damage restoration Perth",
 *       "Carnarvon Kalbarri storm damage claim", "WA cyclone insurance help"
 */

import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { EventClaimForm } from '@/components/events/EventClaimForm';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecovery.com.au';
const CANONICAL = `${BASE_URL}/events/cyclone-narelle-2026`;

export const metadata: Metadata = {
  title: 'Cyclone Narelle Insurance Claim Help | NRPG Emergency Restoration WA',
  description: 'Affected by Cyclone Narelle in Western Australia? NRPG connects you with IICRC-certified restoration contractors for storm and cyclone damage. 24/7 emergency response. Insurance-approved.',
  keywords: [
    'Cyclone Narelle insurance claim',
    'cyclone damage restoration Perth',
    'Carnarvon Kalbarri storm damage claim',
    'WA cyclone insurance help',
    'cyclone Narelle WA restoration',
    'storm damage claim Western Australia',
    'emergency restoration WA',
    'IICRC certified WA',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Cyclone Narelle — Emergency Claim Help | NRPG WA',
    description: 'Affected by Cyclone Narelle? Get your insurance claim moving. NRPG IICRC-certified contractors. 24/7. All WA insurers accepted.',
    url: CANONICAL,
    siteName: 'NRPG - Disaster Recovery Australia',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyclone Narelle — Emergency Claim Help | NRPG WA',
    description: 'Affected by Cyclone Narelle? Get your insurance claim moving. 24/7 IICRC-certified restoration contractors.',
  },
  robots: { index: true, follow: true },
};

const EVENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Cyclone Narelle 2026 — WA Emergency Recovery',
  description:
    'Emergency disaster recovery services for Cyclone Narelle-affected properties across Western Australia. IICRC-certified contractors available 24/7 for storm damage assessment and restoration.',
  startDate: '2026-03-27',
  endDate: '2026-06-30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  url: CANONICAL,
  location: {
    '@type': 'Place',
    name: 'Western Australia',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'WA',
      addressCountry: 'AU',
    },
  },
  organizer: { '@id': `${BASE_URL}/#organization` },
  offers: {
    '@type': 'Offer',
    name: 'Emergency Cyclone Damage Assessment',
    url: CANONICAL,
    availability: 'https://schema.org/InStock',
    priceCurrency: 'AUD',
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EmergencyService'],
  '@id': `${BASE_URL}/locations/wa/perth#business`,
  name: 'NRPG Disaster Recovery — Western Australia',
  description:
    '24/7 emergency cyclone and storm damage restoration across Western Australia. IICRC-certified contractors. All WA insurers accepted.',
  url: CANONICAL,
  areaServed: {
    '@type': 'State',
    name: 'Western Australia',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${BASE_URL}/#organization` },
};

export default function CycloneNarelleEventPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f9fafb]">
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([EVENT_SCHEMA, LOCAL_BUSINESS_SCHEMA]) }}
      />

      <Header />

      <main>
        {/* Emergency alert banner */}
        <div
          role="alert"
          className="bg-[#dc2626] text-white py-3 px-4 text-center text-sm font-semibold"
        >
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            ACTIVE WEATHER EVENT — Cyclone Narelle WA. Emergency response available 24/7.
          </span>
        </div>

        {/* Hero + form */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0d9488]/10 border border-[#0d9488]/30 rounded-sm text-[#0d9488] text-xs font-semibold uppercase tracking-wide mb-6">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                Cyclone Narelle — WA 2026
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Affected by Cyclone Narelle?{' '}
                <span className="text-[#0d9488]">Get Your Insurance Claim Moving.</span>
              </h1>

              <p className="text-[#9ca3af] text-lg mb-8">
                Cyclone Narelle made landfall on the WA coast on 27 March 2026. NRPG connects Western Australian property owners with IICRC-certified restoration contractors for emergency assessment, make-safe works, and full insurance claim documentation.
              </p>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-[#0d9488] mb-1">24/7</div>
                  <div className="text-xs text-[#6b7280]">Emergency Response</div>
                </div>
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-white mb-1">60min</div>
                  <div className="text-xs text-[#6b7280]">Avg. Response</div>
                </div>
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-[#0d9488] mb-1">100%</div>
                  <div className="text-xs text-[#6b7280]">IICRC Certified</div>
                </div>
              </div>

              {/* AS-IICRC credibility callout */}
              <div className="bg-[#0f1115] border border-[#0d9488]/30 rounded-sm p-5 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0d9488] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">IICRC-Certified Restoration Standard</p>
                    <p className="text-xs text-[#9ca3af]">
                      All NRPG contractors operate to IICRC standards for storm and water damage restoration — Australia&apos;s benchmark for professional property restoration, recognised by all major insurers including NRMA, Suncorp, Allianz, and QBE.
                    </p>
                  </div>
                </div>
              </div>

              {/* What we cover */}
              <div>
                <p className="text-sm font-semibold text-[#d1d5db] mb-3 uppercase tracking-wide">Cyclone damage we assess</p>
                <ul className="space-y-2">
                  {[
                    'Roof damage — missing tiles, structural failure',
                    'Water ingress — ceiling collapse, internal flooding',
                    'Window and door damage',
                    'Emergency tarping and board-up',
                    'Structural drying and mould prevention',
                    'Insurance documentation and scope of works',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                      <CheckCircle className="h-4 w-4 text-[#0d9488] flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Internal links */}
              <div className="mt-8 pt-6 border-t border-[#1f2937]">
                <p className="text-xs text-[#6b7280] mb-3">Related services</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/services/storm-damage"
                    className="text-xs text-[#0d9488] border border-[#0d9488]/30 px-3 py-1.5 rounded-sm hover:bg-[#0d9488]/10 transition-colors"
                  >
                    Storm Damage Restoration →
                  </Link>
                  <Link
                    href="/locations/wa/perth"
                    className="text-xs text-[#0d9488] border border-[#0d9488]/30 px-3 py-1.5 rounded-sm hover:bg-[#0d9488]/10 transition-colors"
                  >
                    Perth Emergency Services →
                  </Link>
                  <Link
                    href="/services/water-damage"
                    className="text-xs text-[#0d9488] border border-[#0d9488]/30 px-3 py-1.5 rounded-sm hover:bg-[#0d9488]/10 transition-colors"
                  >
                    Water Damage Restoration →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-[#dc2626]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#dc2626] uppercase tracking-wide">
                      Emergency Claim Enquiry
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Request Emergency Assessment
                  </h2>
                  <p className="text-sm text-[#9ca3af] mt-1">
                    Complete this form and a coordinator will be in touch within 60 minutes.
                  </p>
                </div>

                <EventClaimForm
                  eventId="cyclone-narelle-2026"
                  defaultState="WA"
                  defaultDamageType="STORM_DAMAGE"
                  ctaLabel="Request Emergency Assessment →"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Affected areas */}
        <section className="bg-[#0f1115] border-y border-[#1f2937] py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Cyclone Narelle — Affected Areas
            </h2>
            <p className="text-[#9ca3af] text-sm mb-6">
              NRPG contractors are mobilised across Western Australia for Cyclone Narelle response. Priority areas include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Carnarvon', 'Kalbarri', 'Geraldton', 'Northampton',
                'Shark Bay', 'Exmouth', 'Denham', 'Dongara',
                'Port Hedland', 'Broome', 'Perth Metro', 'All WA regions',
              ].map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-sm text-[#9ca3af] bg-[#050505] border border-[#1f2937] rounded-sm px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488] flex-shrink-0" aria-hidden="true" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Cyclone Narelle — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I start a Cyclone Narelle insurance claim?',
                a: 'Contact your insurer as soon as possible to notify them of the damage. Then request emergency assessment through NRPG — we provide the professional documentation your insurer needs to process the claim, including scope of works, photos, and moisture readings.',
              },
              {
                q: 'Is Cyclone Narelle damage covered by home insurance?',
                a: 'Most standard home and contents insurance policies in Australia cover storm and cyclone damage. However, coverage depends on your specific policy. NRPG contractors are approved by all major Australian insurers and can help document your damage professionally to support your claim.',
              },
              {
                q: 'What is emergency tarping and do I need it?',
                a: 'Emergency tarping secures heavy-duty waterproof covers over damaged roof sections to prevent further rain ingress into your property. If your roof has been damaged by Cyclone Narelle, tarping should be deployed immediately to prevent secondary water damage and mould growth. This is typically covered under emergency works in your insurance policy.',
              },
              {
                q: 'How quickly can NRPG respond in WA?',
                a: 'NRPG maintains 24/7 emergency dispatch capability with an average response time of 60 minutes across major WA locations. During large-scale events like Cyclone Narelle, response prioritisation ensures the most urgent cases are attended to first.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-[#0f1115] border border-[#1f2937] rounded-sm p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-[#9ca3af]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
