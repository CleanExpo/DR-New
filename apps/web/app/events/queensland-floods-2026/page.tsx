/**
 * Event Landing Page — Queensland Floods 2026
 *
 * DR-320 [P0] TIME-CRITICAL
 * SEO: "Queensland flood insurance claim 2026", "Bundaberg flood damage restoration",
 *       "North QLD flood claim help"
 */

import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { EventClaimForm } from '@/components/events/EventClaimForm';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecovery.com.au';
const CANONICAL = `${BASE_URL}/events/queensland-floods-2026`;

export const metadata: Metadata = {
  title: 'Queensland Flood Insurance Claim 2026 | NRPG Emergency Flood Restoration',
  description: 'Affected by the Queensland floods 2026? NRPG connects you with IICRC-certified flood restoration contractors. 24/7 emergency response across QLD. Insurance-approved, all major insurers.',
  keywords: [
    'Queensland flood insurance claim 2026',
    'Bundaberg flood damage restoration',
    'North QLD flood claim help',
    'QLD floods 2026 restoration',
    'Brisbane flood damage repair',
    'flood damage claim Queensland',
    'emergency flood restoration QLD',
    'IICRC certified flood restoration',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Queensland Floods 2026 — Emergency Claim Help | NRPG',
    description: 'Affected by QLD floods? Get your insurance claim moving. NRPG IICRC-certified contractors. 24/7. All QLD insurers accepted.',
    url: CANONICAL,
    siteName: 'NRPG - Disaster Recovery Australia',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queensland Floods 2026 — Emergency Claim Help | NRPG',
    description: 'Affected by QLD floods? Get your insurance claim moving. 24/7 IICRC-certified restoration contractors.',
  },
  robots: { index: true, follow: true },
};

const EVENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Queensland Floods 2026 — Emergency Recovery',
  description:
    'Emergency flood damage restoration services for properties affected by the 2026 Queensland floods. IICRC-certified contractors available 24/7 for flood assessment and restoration across QLD.',
  startDate: '2026-01-01',
  endDate: '2026-06-30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  url: CANONICAL,
  location: {
    '@type': 'Place',
    name: 'Queensland, Australia',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
  },
  organizer: { '@id': `${BASE_URL}/#organization` },
  offers: {
    '@type': 'Offer',
    name: 'Emergency Flood Damage Assessment',
    url: CANONICAL,
    availability: 'https://schema.org/InStock',
    priceCurrency: 'AUD',
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EmergencyService'],
  '@id': `${BASE_URL}/locations/qld/brisbane#business`,
  name: 'NRPG Disaster Recovery — Queensland',
  description:
    '24/7 emergency flood damage restoration across Queensland. IICRC-certified contractors. All QLD insurers accepted.',
  url: CANONICAL,
  areaServed: {
    '@type': 'State',
    name: 'Queensland',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${BASE_URL}/#organization` },
};

export default function QueenslandFloodsEventPage() {
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
          className="bg-[#1d4ed8] text-white py-3 px-4 text-center text-sm font-semibold"
        >
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            ACTIVE FLOOD EVENT — Queensland 2026. Emergency response available 24/7.
          </span>
        </div>

        {/* Hero + form */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d4ed8]/10 border border-[#1d4ed8]/30 rounded-sm text-[#60a5fa] text-xs font-semibold uppercase tracking-wide mb-6">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                Queensland Floods — 2026
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Queensland Flood Insurance Claim?{' '}
                <span className="text-[#60a5fa]">We Can Help You Get Started.</span>
              </h1>

              <p className="text-[#9ca3af] text-lg mb-8">
                Flooding across Queensland in 2026 has affected thousands of properties from North Queensland to South-East QLD. NRPG connects flood-affected property owners with IICRC-certified restoration contractors for emergency water extraction, structural drying, and full insurance claim documentation.
              </p>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-[#60a5fa] mb-1">24/7</div>
                  <div className="text-xs text-[#6b7280]">Emergency Response</div>
                </div>
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-white mb-1">60min</div>
                  <div className="text-xs text-[#6b7280]">Avg. Response</div>
                </div>
                <div className="bg-[#0f1115] border border-[#374151] rounded-sm p-4 text-center">
                  <div className="text-2xl font-black text-[#60a5fa] mb-1">100%</div>
                  <div className="text-xs text-[#6b7280]">IICRC Certified</div>
                </div>
              </div>

              {/* AS-IICRC credibility callout */}
              <div className="bg-[#0f1115] border border-[#1d4ed8]/30 rounded-sm p-5 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#60a5fa] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">IICRC-Certified Flood Restoration</p>
                    <p className="text-xs text-[#9ca3af]">
                      All NRPG contractors operate to IICRC standards for water damage and flood restoration — Australia&apos;s benchmark for professional property restoration, recognised by all major insurers including NRMA, Suncorp, Allianz, QBE, and RACQ.
                    </p>
                  </div>
                </div>
              </div>

              {/* What we cover */}
              <div>
                <p className="text-sm font-semibold text-[#d1d5db] mb-3 uppercase tracking-wide">Flood damage we assess</p>
                <ul className="space-y-2">
                  {[
                    'Emergency water extraction and pumping',
                    'Structural drying — floors, walls, ceilings',
                    'Carpet and contents assessment',
                    'Mould prevention and treatment',
                    'Sewage and contaminated water cleanup',
                    'Full insurance documentation and scope of works',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                      <CheckCircle className="h-4 w-4 text-[#60a5fa] flex-shrink-0" aria-hidden="true" />
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
                    href="/services/water-damage/flood-restoration"
                    className="text-xs text-[#60a5fa] border border-[#1d4ed8]/30 px-3 py-1.5 rounded-sm hover:bg-[#1d4ed8]/10 transition-colors"
                  >
                    Flood Restoration →
                  </Link>
                  <Link
                    href="/locations/qld/brisbane"
                    className="text-xs text-[#60a5fa] border border-[#1d4ed8]/30 px-3 py-1.5 rounded-sm hover:bg-[#1d4ed8]/10 transition-colors"
                  >
                    Brisbane Emergency Services →
                  </Link>
                  <Link
                    href="/services/water-damage"
                    className="text-xs text-[#60a5fa] border border-[#1d4ed8]/30 px-3 py-1.5 rounded-sm hover:bg-[#1d4ed8]/10 transition-colors"
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
                    <Clock className="h-5 w-5 text-[#1d4ed8]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#60a5fa] uppercase tracking-wide">
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
                  eventId="queensland-floods-2026"
                  defaultState="QLD"
                  defaultDamageType="FLOOD_DAMAGE"
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
              QLD Floods 2026 — Affected Areas
            </h2>
            <p className="text-[#9ca3af] text-sm mb-6">
              NRPG contractors are mobilised across Queensland for 2026 flood response. Priority areas include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Bundaberg', 'Rockhampton', 'Townsville', 'Cairns',
                'Ipswich', 'Brisbane', 'Toowoomba', 'Mackay',
                'Gympie', 'Maryborough', 'Hervey Bay', 'All QLD regions',
              ].map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-sm text-[#9ca3af] bg-[#050505] border border-[#1f2937] rounded-sm px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] flex-shrink-0" aria-hidden="true" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Queensland Floods 2026 — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I start a Queensland flood insurance claim?',
                a: 'Contact your insurer as soon as possible to lodge notice of the flood damage. Request an emergency assessment through NRPG — our certified contractors document the damage with photos, moisture readings, and a professional scope of works, giving your insurer everything needed to process your claim promptly.',
              },
              {
                q: 'Is flood damage covered by home insurance in Queensland?',
                a: 'Most standard home insurance policies in Queensland cover flood damage, though this can depend on whether your policy includes flood cover and the specific cause of flooding (riverine flood vs. storm surge). NRPG provides documentation that clarifies the cause and extent of damage, which is critical for the claims process.',
              },
              {
                q: 'How urgent is it to start flood restoration?',
                a: 'Flood restoration should begin within 24–48 hours of the flooding to prevent secondary mould growth, which can start within 24 hours in warm Queensland conditions. Structural materials like plasterboard, insulation, and timber framing absorb water rapidly and require professional drying to prevent irreversible damage.',
              },
              {
                q: 'Can NRPG help with contaminated floodwater?',
                a: 'Yes. Queensland floodwaters often carry sewage contamination and other biohazards. NRPG contractors are certified for Category 3 water damage (contaminated water) cleanup, including sewage extraction, antimicrobial treatment, and safe disposal of contaminated materials following IICRC standards.',
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
