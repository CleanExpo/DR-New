import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocalVoiceSearchLanding from '@/components/voice/LocalVoiceSearchLanding';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'New Farm Water Damage & Restoration Services | 24/7 Emergency | Disaster Recovery',
  description: 'Emergency restoration services in New Farm, Brisbane. Water damage, fire damage, mould removal. Ring 1300 309 361. IICRC certified. 1-hour response to New Farm.',
  keywords: 'New Farm water damage, New Farm flood restoration, emergency plumber New Farm, mould removal New Farm, fire damage New Farm',
  openGraph: {
    title: 'New Farm Emergency Restoration - 1300 309 361',
    description: '24/7 disaster recovery services in New Farm, Brisbane. Water, fire, mould damage restoration. Local team, 1-hour response.',
    url: 'https://disasterrecovery.com.au/locations/new-farm',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  }
};

// New Farm specific FAQs
const newFarmFAQs = [
  {
    question: "Who fixes water damage in New Farm?",
    answer: "Disaster Recovery fixes water damage in New Farm. We're based in Wacol, just 20 minutes away. Ring 1300 309 361 for 24-hour emergency service. We know New Farm's heritage homes and modern apartments. IICRC certified and insurance approved.",
    voiceKeywords: ["New Farm", "water damage", "who to call"],
    schema: true
  },
  {
    question: "Emergency plumber for burst pipe New Farm?",
    answer: "While you need a plumber to fix the pipe, ring us on 1300 309 361 for immediate water extraction and drying. We work with New Farm's trusted plumbers. We'll stop the damage spreading and save your property while the plumber fixes the pipe.",
    voiceKeywords: ["burst pipe", "New Farm", "emergency", "plumber"],
    schema: true
  },
  {
    question: "Mould removal service New Farm Brisbane?",
    answer: "We remove mould safely from New Farm properties. IICRC certified mould remediation. We understand the older Queenslanders and riverside apartments in New Farm can have moisture issues. Ring 1300 309 361 for professional mould removal.",
    voiceKeywords: ["mould", "New Farm", "removal", "Brisbane"],
    schema: true
  },
  {
    question: "Storm damage repair New Farm area?",
    answer: "We provide emergency storm damage repair in New Farm. From Brunswick Street to Merthyr Road, we know the area. Emergency tarping, water extraction, and complete restoration. Ring 1300 309 361. We can be there within an hour.",
    voiceKeywords: ["storm damage", "New Farm", "repair", "emergency"],
    schema: true
  },
  {
    question: "How quickly can you get to New Farm?",
    answer: "We can be in New Farm within 30-45 minutes from our Wacol base. During peak times via the M5 and Story Bridge, maximum 1 hour. For emergencies in New Farm Park area or Brunswick Street, we respond 24/7. Ring 1300 309 361.",
    voiceKeywords: ["response time", "New Farm", "how fast"],
    schema: true
  },
  {
    question: "Flood restoration for riverside properties New Farm?",
    answer: "We specialise in flood restoration for New Farm's riverside properties. We understand the flood risks near the Brisbane River and New Farm Park. Quick water extraction and professional drying prevents long-term damage. Ring 1300 309 361.",
    voiceKeywords: ["flood", "riverside", "New Farm", "Brisbane River"],
    schema: true
  }
];

export default function NewFarmServices() {
  // Generate location-specific schema
  const generateLocalServiceSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Disaster Recovery - New Farm Services",
      "description": "24/7 emergency restoration services in New Farm, Brisbane",
      "url": "https://disasterrecovery.com.au/locations/new-farm",
      "telephone": "+61 1300 309 361",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4/17 Tile St",
        "addressLocality": "Wacol",
        "addressRegion": "QLD",
        "postalCode": "4076",
        "addressCountry": "AU"
      },
      "areaServed": {
        "@type": "Place",
        "name": "New Farm",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Farm",
          "addressRegion": "QLD",
          "postalCode": "4005",
          "addressCountry": "AU"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -27.4705,
        "longitude": 153.0456
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$$$",
      "paymentAccepted": ["Cash", "Credit Card", "Insurance Claims"],
      "knowsAbout": [
        "Heritage home restoration",
        "Luxury apartment water damage",
        "Riverside flood damage",
        "High-end property restoration"
      ]
    };

    return JSON.stringify(schemaData);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateLocalServiceSchema() }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="New Farm restoration services">

        {/* Hero Section - New Farm Specific */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/disaster-recovery-services.jpg"
              alt="Disaster recovery services New Farm Brisbane"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl voice-answer">
              New Farm Emergency Restoration Services
            </h1>

            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              24/7 disaster recovery for New Farm properties. Water damage, fire restoration, mould removal.
              Ring 1300 309 361. We can be there within 45 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Local Voice Search Component */}
        <LocalVoiceSearchLanding
          suburb="New Farm"
          service="disaster recovery"
          postcode="4005"
        />

        {/* New Farm Specific Information */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              We Know New Farm Properties
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Heritage Queenslanders
                </h3>
                <p className="text-gray-700 mb-4">
                  New Farm's character homes need special care. We understand timber floors,
                  VJ walls, and high ceilings. Our restoration preserves original features
                  while fixing water, fire, or storm damage properly.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Careful treatment of original timber</li>
                  <li>• VJ wall restoration expertise</li>
                  <li>• Heritage-appropriate repairs</li>
                  <li>• Work with heritage consultants</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Modern Apartments & Luxury Homes
                </h3>
                <p className="text-gray-700 mb-4">
                  From riverside apartments to renovated warehouses, we handle New Farm's
                  premium properties. Quick response prevents damage to expensive finishes
                  and high-end fixtures.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Protect luxury finishes</li>
                  <li>• Save high-value contents</li>
                  <li>• Discrete professional service</li>
                  <li>• Insurance claim assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* New Farm Areas We Service */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              New Farm Streets & Areas We Service
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Brunswick Street Area</h3>
                <p className="text-gray-700 mb-3">
                  Quick response to Brunswick Street and surrounding streets.
                  We know the cafes, shops, and residences along this busy strip.
                </p>
                <p className="text-sm text-blue-600">30-minute response time</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Riverside & New Farm Park</h3>
                <p className="text-gray-700 mb-3">
                  Flood-prone riverside properties need fast action. We understand
                  the flood risks near the Brisbane River and park areas.
                </p>
                <p className="text-sm text-blue-600">Flood specialists</p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Merthyr Road District</h3>
                <p className="text-gray-700 mb-3">
                  Service to Merthyr Village and surrounding heritage areas.
                  Expertise in older properties and converted warehouses.
                </p>
                <p className="text-sm text-blue-600">Heritage expertise</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'James Street', 'Moray Street', 'Bowen Terrace', 'Sydney Street',
                'Annie Street', 'Welsby Street', 'Villiers Street', 'Barker Street',
                'Heal Street', 'Oxlade Drive', 'Abbott Street', 'Kent Street',
                'Terrace Street', 'Harcourt Street', 'Browne Street', 'Commercial Road'
              ].map((street) => (
                <div key={street} className="bg-white rounded py-2 px-3 text-center text-sm">
                  {street}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common New Farm Disasters */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Common Emergencies in New Farm
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: "River Flooding",
                  description: "Riverside properties face flood risk during heavy rain",
                  action: "24-hour flood response team ready",
                  voiceQuery: "New Farm flooding help"
                },
                {
                  type: "Old Pipe Bursts",
                  description: "Heritage homes often have ageing plumbing",
                  action: "Fast water extraction saves timber floors",
                  voiceQuery: "burst pipe New Farm Queenslander"
                },
                {
                  type: "Storm Damage",
                  description: "High winds damage roofs and let water in",
                  action: "Emergency tarping and water removal",
                  voiceQuery: "storm damage New Farm roof"
                },
                {
                  type: "Apartment Water Damage",
                  description: "Leaks from units above cause ceiling damage",
                  action: "Quick response prevents spread to other units",
                  voiceQuery: "apartment water leak New Farm"
                },
                {
                  type: "Bathroom Overflows",
                  description: "Common in older properties with poor drainage",
                  action: "Extraction and sanitisation service",
                  voiceQuery: "bathroom flooding New Farm"
                },
                {
                  type: "Kitchen Fires",
                  description: "Restaurant and cafe district fire risks",
                  action: "Smoke and soot removal specialists",
                  voiceQuery: "fire damage Brunswick Street New Farm"
                }
              ].map((emergency, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {emergency.type}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {emergency.description}
                  </p>
                  <p className="text-blue-600 font-medium mb-2">
                    ✓ {emergency.action}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    Voice: "{emergency.voiceQuery}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice-Optimized FAQs */}
        <VoiceSearchOptimizedFAQ
          title="New Farm Residents Ask Us"
          faqs={newFarmFAQs}
          emergencyContext={false}
        />

        {/* Trust Signals for New Farm */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Trusted by New Farm Property Owners
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Insurance Approved
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Work with all major insurers</li>
                  <li>✓ Direct insurance billing</li>
                  <li>✓ Help with claim documentation</li>
                  <li>✓ Approved restoration procedures</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Professional Standards
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ IICRC certified technicians</li>
                  <li>✓ $20 million public liability</li>
                  <li>✓ Discrete service for high-profile clients</li>
                  <li>✓ Respect for luxury properties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              New Farm Emergency? We're 30 Minutes Away
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              From our Wacol base, we can reach any New Farm property fast.
              Don't let damage spread - ring us now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Ring 1300 309 361
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors text-lg border-2 border-blue-700"
              >
                Online Quote Request
              </Link>
            </div>

            <div className="mt-8 text-blue-100">
              <p>Servicing New Farm 24/7 since 2011</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}