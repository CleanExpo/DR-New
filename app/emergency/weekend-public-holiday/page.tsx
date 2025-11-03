import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Weekend & Public Holiday Disaster Recovery | 24/7 Available',
  description: 'Emergency restoration open weekends and public holidays. Sunday flood restoration Brisbane. Christmas, Boxing Day, Easter water damage. 1-hour response. Call 1300 309 361.',
  keywords: ["sunday flood restoration brisbane", "public holiday disaster recovery", "weekend emergency restoration", "weekend water damage", "holiday emergency response", "saturday emergency brisbane"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/emergency/weekend-public-holiday',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/emergency/weekend-public-holiday',
    },
  },
  openGraph: {
    title: 'Weekend & Public Holiday Disaster Recovery | 24/7 Available',
    description: 'Emergency restoration open weekends and public holidays. Sunday emergency available. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/emergency/weekend-public-holiday',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/water-damage.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend and Public Holiday Emergency Disaster Recovery Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekend & Public Holiday Disaster Recovery | 24/7 Available',
    description: 'Open weekends and public holidays. Sunday emergency response. Call 1300 309 361.',
    images: ['https://disasterrecovery.com.au/images/services/water-damage.jpg'],
  },
};

const holidayFAQs = [
  {
    question: "Is there emergency water damage service on Sunday in Brisbane?",
    answer: "Yes, absolutely. Our team works every Sunday, 24 hours. Ring 1300 309 361 on any Sunday and we'll respond within 1 hour. Sunday water damage is just as urgent as weekday damage.",
    voiceKeywords: ["sunday water damage", "sunday emergency", "open sunday"],
    schema: true
  },
  {
    question: "Can I get emergency restoration on Christmas Day in Brisbane?",
    answer: "Yes. We're fully operational on Christmas Day, Boxing Day, and every public holiday. Ring 1300 309 361. Your home doesn't take holidays. Neither do we.",
    voiceKeywords: ["christmas emergency", "christmas water damage", "christmas day"],
    schema: true
  },
  {
    question: "Public holiday water damage - who to ring?",
    answer: "Ring Disaster Recovery on 1300 309 361 on any public holiday. We work New Year's Day, Australia Day, Easter, Anzac Day, Queen's Birthday, and all local holidays. 24-hour response available.",
    voiceKeywords: ["public holiday", "easter emergency", "new year emergency"],
    schema: true
  },
  {
    question: "Saturday emergency flood restoration Brisbane?",
    answer: "Yes, Saturday emergencies are fully staffed. Ring 1300 309 361 on any Saturday. We have crews ready and can arrive within 1 hour anywhere in Brisbane. Weekend floods get the same priority as weekday emergencies.",
    voiceKeywords: ["saturday emergency", "saturday water damage", "weekend service"],
    schema: true
  },
  {
    question: "Boxing Day water damage - are you open?",
    answer: "Yes, we're open Boxing Day. Ring 1300 309 361 on Boxing Day for emergency water damage help. Same 1-hour response time. No extra charges for public holidays.",
    voiceKeywords: ["boxing day", "boxing day emergency", "26 december"],
    schema: true
  },
  {
    question: "What if I have a water emergency on Easter?",
    answer: "Ring us on 1300 309 361. We work Easter Friday, Easter Saturday, Easter Sunday, and Easter Monday. Full emergency team available. Water damage doesn't respect holidays.",
    voiceKeywords: ["easter emergency", "easter water damage", "easter monday"],
    schema: true
  },
  {
    question: "Do weekend emergencies cost more?",
    answer: "No. Our pricing is the same every day of the week. Weekdays, weekends, public holidays - same rates. No weekend surcharges. Ring 1300 309 361 for a quote.",
    voiceKeywords: ["weekend cost", "extra charges", "pricing saturday"],
    schema: true
  },
  {
    question: "Weekend water extraction - is a real person available?",
    answer: "Yes. When you ring 1300 309 361 on a weekend, a real person answers. No answering services. No callbacks later. We speak to you immediately and dispatch help straight away.",
    voiceKeywords: ["live person", "real person", "weekend help"],
    schema: true
  }
];

export default function WeekendPublicHolidayEmergency() {
  const generateServiceSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Disaster Recovery",
      "serviceType": "Disaster Recovery Services",
      "description": "24/7 weekend and public holiday emergency disaster recovery services",
      "telephone": "+61 1300 309 361",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4/17 Tile St",
        "addressLocality": "Wacol",
        "addressRegion": "QLD",
        "postalCode": "4076",
        "addressCountry": "AU"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    };

    return JSON.stringify(schemaData);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateServiceSchema() }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Weekend and public holiday emergency disaster recovery">

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/fire-water-damage-restoration.jpg"
              alt="Emergency disaster recovery on weekends and public holidays"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl voice-answer">
              Emergency Disaster Recovery - Weekends & Public Holidays
            </h1>

            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              Open every weekend and every public holiday. Saturdays, Sundays, Christmas, Easter. Full emergency response 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                aria-label="Ring 1300 309 361 for weekend emergency help"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361 Now
              </Link>
            </div>
          </div>
        </section>

        {/* All Days Covered */}
        <section className="py-12 bg-blue-50 border-t-4 border-red-600">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              We're Open Every Single Day
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Weekends
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                      SAT
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Saturday</p>
                      <p className="text-gray-700">Full emergency team available 24 hours</p>
                      <p className="text-sm text-blue-600 font-bold mt-1">1-hour response guarantee</p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                      SUN
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Sunday</p>
                      <p className="text-gray-700">Full emergency team available 24 hours</p>
                      <p className="text-sm text-blue-600 font-bold mt-1">1-hour response guarantee</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Public Holidays
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">National Holidays</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ New Year's Day</li>
                      <li>✓ Australia Day</li>
                      <li>✓ Anzac Day</li>
                      <li>✓ Christmas Day</li>
                      <li>✓ Boxing Day</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 mb-2">Easter Period</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ Good Friday</li>
                      <li>✓ Easter Saturday</li>
                      <li>✓ Easter Sunday</li>
                      <li>✓ Easter Monday</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 mb-2">QLD Holidays</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>✓ Queen's Birthday</li>
                      <li>✓ Royal Queensland Show</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 mb-2">All Public Holidays</p>
                    <p className="text-gray-700">24-hour emergency response available on any public holiday</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
              <p className="text-gray-900 font-bold text-lg">
                Ring 1300 309 361 any day, any time. We're always available.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Weekend & Holiday Service Matters
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Water Damage Doesn't Take Weekends Off
                  </h3>
                  <p className="text-gray-700">
                    Burst pipes, flood damage, roof leaks - these emergencies happen any day of the week. Saturday. Sunday. Christmas Day. Your home needs help immediately.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Faster Action = Less Damage
                  </h3>
                  <p className="text-gray-700">
                    Water damage gets worse every hour. Every day you wait means more mould growth, more structural damage, more expensive repairs. Weekend response speeds up recovery.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Peace of Mind During Holidays
                  </h3>
                  <p className="text-gray-700">
                    Know that emergency help is available while you're relaxing on the weekend or during holidays. You're not alone if disaster strikes.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Holiday Surcharges
                  </h3>
                  <p className="text-gray-700">
                    We charge the same rates every day. No extra fees for weekends or public holidays. Our commitment to 24/7 service means you get fair pricing anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekend-Specific Services */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What We Do on Weekends & Holidays
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  Water Damage & Flooding
                </h3>
                <p className="text-gray-700">
                  Burst pipes, ceiling leaks, flood damage, sewage backup. We extract water, dry structures, and prevent mould - anytime.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔥</span>
                  Fire & Smoke Damage
                </h3>
                <p className="text-gray-700">
                  Fire emergencies on weekends need immediate response. We board up, salvage belongings, and begin restoration immediately.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🌊</span>
                  Storm Damage
                </h3>
                <p className="text-gray-700">
                  Storms don't check the calendar. We provide emergency tarping, water extraction, and damage assessment on weekends and holidays.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🧼</span>
                  Biohazard & Trauma Cleaning
                </h3>
                <p className="text-gray-700">
                  Difficult cleanups can't wait. We provide professional biohazard cleaning 24/7 when needed.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🦠</span>
                  Mould Remediation
                </h3>
                <p className="text-gray-700">
                  Mould emerges quickly after water events. We inspect, remove mould, and treat surfaces to prevent recurrence - weekends included.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Insurance Coordination
                </h3>
                <p className="text-gray-700">
                  We manage insurance claims from start to finish, even on weekends. Documentation and direct insurer communication included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Weekend Help */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How to Get Help This Weekend or Holiday
            </h2>

            <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl font-bold text-red-600 flex-shrink-0">
                    1.
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Ring 1300 309 361
                    </h3>
                    <p className="text-gray-700">
                      Call our 24-hour emergency line. A real person answers immediately on weekends and public holidays.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl font-bold text-red-600 flex-shrink-0">
                    2.
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Describe Your Emergency
                    </h3>
                    <p className="text-gray-700">
                      Tell us what happened. We ask key questions to understand the damage and know what equipment to bring.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl font-bold text-red-600 flex-shrink-0">
                    3.
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      We Dispatch Immediately
                    </h3>
                    <p className="text-gray-700">
                      Our team is dispatched straight away. No waiting. No callbacks. We arrive within 1 hour anywhere in Brisbane.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-3xl font-bold text-red-600 flex-shrink-0">
                    4.
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      We Take Over
                    </h3>
                    <p className="text-gray-700">
                      Our trained team manages the emergency - extraction, drying, damage control. We work directly with your insurance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-blue-300">
                <p className="text-center text-gray-900 font-bold text-lg">
                  Don't wait. Ring 1300 309 361 this weekend or holiday.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose Us for Weekend Emergencies
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Real Person Always Answers
                </h3>
                <p className="text-gray-700 text-sm">
                  Call 1300 309 361 on a Saturday at midnight, and a real person picks up. No recorded messages. No waiting for callbacks.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Fully Staffed Weekends
                </h3>
                <p className="text-gray-700 text-sm">
                  We don't take reduced crews on weekends. Full team available including managers, technicians, and supervisors.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Equipment Ready 24/7
                </h3>
                <p className="text-gray-700 text-sm">
                  All equipment is maintained and ready. Water extractors, dehumidifiers, and tools are immediately available on weekends.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  IICRC Certified Technicians
                </h3>
                <p className="text-gray-700 text-sm">
                  Weekend response teams hold full IICRC certifications. Same expertise whether it's Monday or Monday.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Insurance Approved Process
                </h3>
                <p className="text-gray-700 text-sm">
                  We follow insurance approval processes even on weekends. Direct billing and claim management available Saturday-Sunday.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Fair Pricing Every Day
                </h3>
                <p className="text-gray-700 text-sm">
                  Same rates on weekends as weekdays. No surcharges for Saturday, Sunday, or public holidays. Transparent pricing always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voice-Optimized FAQs */}
        <VoiceSearchOptimizedFAQ
          title="Weekend & Public Holiday Emergency Questions"
          faqs={holidayFAQs}
          emergencyContext={true}
        />

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Emergency This Weekend or Holiday?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Don't delay. Help is available right now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361 Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors text-lg border-2 border-red-700"
              >
                Online Enquiry
              </Link>
            </div>

            <div className="mt-8 text-red-100">
              <p className="mb-2">Available right now. Weekend or holiday.</p>
              <p className="mb-2">4/17 Tile St, Wacol, QLD 4076</p>
              <p>24/7 Emergency Line: 1300 309 361</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
