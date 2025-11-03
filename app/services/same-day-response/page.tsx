import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Same Day Water Damage Brisbane | 1-Hour Emergency Response',
  description: 'Same-day water damage restoration Brisbane. 1-hour response guarantee. Emergency response team ready now. Direct service, no delays. Call 1300 309 361.',
  keywords: ["same day water damage brisbane", "1 hour response", "emergency water restoration same day", "fast water damage response", "quick emergency response", "water damage now"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/same-day-response',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/services/same-day-response',
    },
  },
  openGraph: {
    title: 'Same Day Water Damage Brisbane | 1-Hour Emergency Response',
    description: 'Same-day water damage restoration. 1-hour response guaranteed. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/same-day-response',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/water-damage.jpg',
        width: 1200,
        height: 630,
        alt: 'Same Day Water Damage Response Service Brisbane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Same Day Water Damage Brisbane | 1-Hour Emergency Response',
    description: 'Same-day restoration. 1-hour response. Call 1300 309 361.',
    images: ['https://disasterrecovery.com.au/images/services/water-damage.jpg'],
  },
};

const sameDayFAQs = [
  {
    question: "Can I get same day water damage response in Brisbane?",
    answer: "Yes. Ring Disaster Recovery on 1300 309 361 and we respond within 1 hour. Same-day response means we arrive, assess, and start water extraction the same day you call. No waiting until tomorrow.",
    voiceKeywords: ["same day response", "today", "immediate help"],
    schema: true
  },
  {
    question: "What is one hour response time water damage?",
    answer: "We guarantee arrival within 1 hour of your call. You ring 1300 309 361, we dispatch our closest team immediately. 1-hour response means we're at your property extracting water within 60 minutes. This speed stops damage getting worse.",
    voiceKeywords: ["1 hour", "response time", "how fast"],
    schema: true
  },
  {
    question: "Same day water extraction Brisbane - is it guaranteed?",
    answer: "Yes. We guarantee 1-hour response for water extraction. Ring 1300 309 361 and if conditions are clear, we're at your property extracting water within an hour. This guarantee applies anywhere in Brisbane.",
    voiceKeywords: ["guaranteed", "promise", "guaranteed response"],
    schema: true
  },
  {
    question: "Why is fast response important for water damage?",
    answer: "Water damage gets exponentially worse every hour. Within 24 hours, mould starts growing. Within 48 hours, structural damage begins. Same-day response stops this decay. The faster we arrive, the less damage you'll have and the lower your repair costs.",
    voiceKeywords: ["why fast", "important speed", "damage prevention"],
    schema: true
  },
  {
    question: "How do you respond same day in Brisbane?",
    answer: "We're based in Wacol with fleet vehicles ready 24/7. When you ring 1300 309 361, our dispatcher sends the nearest team immediately. Full water extraction equipment is always in vehicles. We arrive within 1 hour and start extracting water straight away.",
    voiceKeywords: ["how it works", "process", "fleet", "ready"],
    schema: true
  },
  {
    question: "What happens in the first hour after water damage?",
    answer: "Our first hour is critical: assess where water came from, stop the source if possible, begin extraction with industrial pumps, move salvageable items to dry areas, document damage for insurance, establish drying timeline. We work fast and work smart.",
    voiceKeywords: ["first hour", "what happens", "process"],
    schema: true
  },
  {
    question: "Does same day water damage response cost more?",
    answer: "No. Our same-day response is our standard service. We don't charge extra for fast response. Ring 1300 309 361 for pricing. We work with your insurance so costs are covered.",
    voiceKeywords: ["cost", "price", "same day cost"],
    schema: true
  },
  {
    question: "Can we get same day response if we call at night?",
    answer: "Yes. Call 1300 309 361 at any time, day or night. Our 24-hour emergency line has real people answering. Night-time calls get the same 1-hour response guarantee as daytime calls.",
    voiceKeywords: ["night response", "after hours", "2am"],
    schema: true
  }
];

export default function SameDayResponse() {
  const generateServiceSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Emergency Water Damage Restoration",
      "name": "Same-Day Water Damage Response",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Disaster Recovery",
        "telephone": "+61 1300 309 361",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4/17 Tile St",
          "addressLocality": "Wacol",
          "addressRegion": "QLD",
          "postalCode": "4076",
          "addressCountry": "AU"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": "Brisbane"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://disasterrecovery.com.au/services/same-day-response",
        "servicePhone": "+61 1300 309 361"
      },
      "potentialAction": {
        "@type": "CallAction",
        "target": "tel:1300309361"
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
      <main id="main-content" role="main" aria-label="Same-day emergency water damage response service">

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/fire-water-damage-restoration.jpg"
              alt="Same-day water damage response Brisbane"
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
              Same Day Water Damage Response Brisbane
            </h1>

            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              1-hour response guarantee. Ring us today and we arrive today. Water extraction starts immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                aria-label="Ring 1300 309 361 for same-day water damage response"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361 Now
              </Link>
            </div>
          </div>
        </section>

        {/* 1-Hour Guarantee */}
        <section className="py-12 bg-blue-50 border-t-4 border-red-600">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-red-600">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2">1</div>
                  <p className="text-sm text-gray-600 uppercase font-bold">Hour Response</p>
                  <p className="text-gray-700 mt-2">
                    From your call to our team arriving at your property
                  </p>
                </div>

                <div className="hidden md:block border-l-2 border-gray-200"></div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">24</div>
                  <p className="text-sm text-gray-600 uppercase font-bold">Hours a Day</p>
                  <p className="text-gray-700 mt-2">
                    Same-day response available any time you call
                  </p>
                </div>

                <div className="hidden md:block border-l-2 border-gray-200"></div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600 uppercase font-bold">Guaranteed</p>
                  <p className="text-gray-700 mt-2">
                    We commit to this response time every single call
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center">
                <p className="font-bold text-gray-900 text-lg">
                  Ring 1300 309 361 and ask about our 1-hour response guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Speed Matters */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Speed Is Critical for Water Damage
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border-2 border-red-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Timeline: What Happens After Water Damage
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 pb-4 border-b-2 border-red-200">
                    <div className="text-2xl font-bold text-red-600 flex-shrink-0">0-1h</div>
                    <div>
                      <p className="font-bold text-gray-900">Water Still Spreading</p>
                      <p className="text-sm text-gray-700">Every minute counts. Water continues spreading into walls, floors, furniture.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pb-4 border-b-2 border-red-200">
                    <div className="text-2xl font-bold text-red-600 flex-shrink-0">1-6h</div>
                    <div>
                      <p className="font-bold text-gray-900">Walls & Furniture Absorbing</p>
                      <p className="text-sm text-gray-700">Water penetrates deeper. Drywall absorbs moisture. Furniture swelling begins.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pb-4 border-b-2 border-orange-200">
                    <div className="text-2xl font-bold text-orange-600 flex-shrink-0">6-24h</div>
                    <div>
                      <p className="font-bold text-gray-900">Mould Begins Growing</p>
                      <p className="text-sm text-gray-700">Mould spores activate. Odours develop. Health risks increase.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pb-4">
                    <div className="text-2xl font-bold text-orange-600 flex-shrink-0">24-48h</div>
                    <div>
                      <p className="font-bold text-gray-900">Structural Damage Begins</p>
                      <p className="text-sm text-gray-700">Wood rots. Paint bubbles. Electrical damage spreads. Repair costs explode.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why 1-Hour Response Saves Money
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-2xl text-green-600 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-gray-900">Stop Water Spreading</p>
                      <p className="text-sm text-gray-700">We arrive before damage penetrates deep. Less water means less damage.</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-2xl text-green-600 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-gray-900">Prevent Mould Growth</p>
                      <p className="text-sm text-gray-700">Fast extraction and drying prevents mould from ever starting. No mould remediation needed.</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-2xl text-green-600 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-gray-900">Preserve Structures</p>
                      <p className="text-sm text-gray-700">Quick response prevents wood rot and structural decay. Saves thousands in repairs.</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-2xl text-green-600 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-gray-900">Save Furniture & Contents</p>
                      <p className="text-sm text-gray-700">We salvage more items. Fast drying prevents permanent damage to belongings.</p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-2xl text-green-600 font-bold">✓</span>
                    <div>
                      <p className="font-bold text-gray-900">Lower Insurance Claim</p>
                      <p className="text-sm text-gray-700">Less damage = lower repair costs. Your insurance premium stays reasonable.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How We Achieve 1-Hour Response */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How We Guarantee 1-Hour Response
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Based in Wacol - Central Location
                  </h3>
                  <p className="text-gray-700">
                    Our office is at 4/17 Tile St, Wacol. This puts us in the centre of Brisbane's population. Most Brisbane suburbs are 20-30 minutes away. Regional Queensland areas within reach.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Fleet Vehicles Always Ready
                  </h3>
                  <p className="text-gray-700">
                    We maintain fleet vehicles equipped with water extraction equipment. Every vehicle is stocked and ready. Dispatch can send the closest vehicle immediately upon your call.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    24-Hour Dispatch Centre
                  </h3>
                  <p className="text-gray-700">
                    Our dispatch centre operates 24/7/365. Real people answer 1300 309 361 every moment. When you call, they immediately send the nearest available team to your location.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Trained Emergency Response Teams
                  </h3>
                  <p className="text-gray-700">
                    All technicians are IICRC certified and trained for rapid response. They work efficiently to stop water spreading and start extraction within minutes of arrival.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Commitment to Speed
                  </h3>
                  <p className="text-gray-700">
                    We prioritise fast response. Every person on our team understands that time matters. We focus on rapid assessment and extraction, not administrative delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens in First Hour */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What Happens in Your First Hour
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  When You Ring 1300 309 361
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">1.</span>
                    <span>Immediately connected to experienced dispatcher</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">2.</span>
                    <span>We ask key questions about the water damage</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">3.</span>
                    <span>Dispatcher sends nearest team right away</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">4.</span>
                    <span>We give you a time estimate</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">5.</span>
                    <span>You have our direct contact on the way</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  When We Arrive (Within 60 Minutes)
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">1.</span>
                    <span>Assess water source and extent of damage</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">2.</span>
                    <span>Stop the water source if possible</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">3.</span>
                    <span>Begin water extraction immediately</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">4.</span>
                    <span>Move salvageable items to dry areas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0">5.</span>
                    <span>Document damage for insurance claim</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas - 1 Hour Promise */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Same-Day Response Coverage Areas
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3 text-green-600">✓</span>
                  1-Hour Guarantee Areas
                </h3>
                <p className="text-gray-700 mb-4">
                  All of Brisbane and surrounding areas within 1 hour of Wacol office.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <li>✓ Brisbane CBD</li>
                  <li>✓ Ipswich</li>
                  <li>✓ Logan</li>
                  <li>✓ Gold Coast</li>
                  <li>✓ Sunshine Coast</li>
                  <li>✓ Toowoomba</li>
                  <li>✓ Redcliffe</li>
                  <li>✓ Beaudesert</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3 text-blue-600">!</span>
                  Outside 1-Hour Range?
                </h3>
                <p className="text-gray-700 mb-4">
                  We still respond same day, just beyond the 1-hour guarantee. Rural Queensland areas may take 2-3 hours.
                </p>
                <p className="text-gray-700 font-bold mt-4">
                  Ring 1300 309 361 to check your exact response time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why We Can Promise Same-Day Response
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  IICRC Certified
                </h3>
                <p className="text-gray-700 text-sm">
                  Our team holds IICRC certifications in water damage, fire, mould, and biohazard. Industry best practices every time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Insurance Approved
                </h3>
                <p className="text-gray-700 text-sm">
                  We work directly with all major insurers. Same-day response protects your claim and reduces costs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  25+ Years Experience
                </h3>
                <p className="text-gray-700 text-sm">
                  Since 2011, we've responded to thousands of emergencies. Experience means efficiency.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  $20M Insurance Coverage
                </h3>
                <p className="text-gray-700 text-sm">
                  Fully insured and qualified. Your home is protected when we respond.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  Local Brisbane Based
                </h3>
                <p className="text-gray-700 text-sm">
                  Not a franchise. Not a chain. Local team serving Brisbane for over a decade.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  No Subcontractors
                </h3>
                <p className="text-gray-700 text-sm">
                  We do the work ourselves. Direct service. No middlemen or delays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Voice-Optimized FAQs */}
        <VoiceSearchOptimizedFAQ
          title="Same-Day Response Questions"
          faqs={sameDayFAQs}
          emergencyContext={true}
        />

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Same-Day Water Damage Help?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Ring now and we respond within 1 hour.
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
              <p className="mb-2">1-Hour Response Guarantee</p>
              <p className="mb-2">4/17 Tile St, Wacol, QLD 4076</p>
              <p>24/7 Emergency: 1300 309 361</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
