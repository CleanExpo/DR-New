import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VoiceSearchOptimizedFAQ from '@/components/voice/VoiceSearchOptimizedFAQ';
import EmergencyVoiceResponse from '@/components/voice/EmergencyVoiceResponse';
import LocalVoiceSearchLanding from '@/components/voice/LocalVoiceSearchLanding';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24 Hour Emergency Response | Disaster Recovery',
  description: 'Emergency water damage restoration in Brisbane. Call 1300 309 361. IICRC certified. 1-hour response. Insurance approved. Flooding, burst pipes, storm damage.',
  keywords: 'water damage Brisbane, flood restoration Brisbane, emergency water extraction, burst pipe repair Brisbane, ceiling leak Brisbane, flooding help Brisbane',
  openGraph: {
    title: 'Emergency Water Damage Restoration Brisbane - 1300 309 361',
    description: '24/7 water damage restoration in Brisbane. IICRC certified technicians. Insurance approved. Ring now for immediate help.',
    url: 'https://disasterrecovery.com.au/services/water-damage',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  }
};

// Voice-optimized FAQ data
const waterDamageFAQs = [
  {
    question: "My house is flooding in Brisbane, what should I do?",
    answer: "Turn off electricity at the main switch straight away. Stop the water if you can find the source. Move valuables to higher ground. Ring Disaster Recovery on 1300 309 361. We're in Wacol and can be there within an hour. Never touch electrical switches with wet hands.",
    voiceKeywords: ["flooding", "emergency", "Brisbane", "help now"],
    schema: true
  },
  {
    question: "How do I stop water damage getting worse?",
    answer: "Act fast. Remove as much water as you can with towels or a mop. Open windows for air flow. Move furniture away from wet areas. Put aluminum foil under furniture legs. Ring us on 1300 309 361 for professional water extraction. The first 48 hours are critical.",
    voiceKeywords: ["stop damage", "water spreading", "prevent worse"],
    schema: true
  },
  {
    question: "Who fixes water damage in Brisbane?",
    answer: "Disaster Recovery fixes water damage across Brisbane. We're IICRC certified water damage specialists based in Wacol. We've been restoring Brisbane homes since 2011. Ring 1300 309 361 for 24-hour emergency service. We work with all insurance companies.",
    voiceKeywords: ["water damage company", "Brisbane", "who to call"],
    schema: true
  },
  {
    question: "What to do when ceiling is leaking in Brisbane?",
    answer: "Put buckets under the leak straight away. Move furniture and electronics away. Poke a small hole in the bulging ceiling to release water safely. Turn off electricity to that room. Ring Disaster Recovery on 1300 309 361. We'll find the source and stop further damage.",
    voiceKeywords: ["ceiling leak", "roof leak", "water dripping"],
    schema: true
  },
  {
    question: "How much does flood restoration cost in Queensland?",
    answer: "Water damage restoration costs depend on the size of the damage and how long water has been there. Most home insurance covers water damage. We work directly with your insurer. Ring 1300 309 361 for an emergency assessment. Acting fast reduces costs.",
    voiceKeywords: ["cost", "price", "flood restoration", "Queensland"],
    schema: true
  },
  {
    question: "Emergency water extraction Brisbane - who to ring?",
    answer: "Ring Disaster Recovery on 1300 309 361 for emergency water extraction in Brisbane. We have industrial pumps and extraction equipment. Available 24 hours, 7 days. We can be there within an hour. Based in Wacol, servicing all Brisbane suburbs.",
    voiceKeywords: ["emergency", "water extraction", "pump out", "Brisbane"],
    schema: true
  },
  {
    question: "Burst pipe flooding house Brisbane?",
    answer: "Turn off your water main immediately - it's usually near your water meter. Turn off electricity if water is near power points. Ring us on 1300 309 361. We'll extract the water and start drying straight away. Document damage for insurance with photos.",
    voiceKeywords: ["burst pipe", "pipe burst", "flooding", "Brisbane"],
    schema: true
  },
  {
    question: "Storm damage water in house Brisbane?",
    answer: "Check for immediate dangers like damaged power lines. Cover any roof damage with tarps to stop more water entering. Move valuables to dry areas. Ring Disaster Recovery on 1300 309 361. We do emergency tarping and complete storm damage restoration.",
    voiceKeywords: ["storm damage", "rain damage", "Brisbane storms"],
    schema: true
  }
];

export default function WaterDamageRestoration() {
  // Generate comprehensive schema for voice search
  const generateServiceSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Water Damage Restoration",
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
        "serviceUrl": "https://disasterrecovery.com.au/services/water-damage",
        "servicePhone": "+61 1300 309 361",
        "availableLanguage": {
          "@type": "Language",
          "name": "English"
        }
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
      <main id="main-content" role="main" aria-label="Water damage restoration services">

        {/* Hero Section - Voice Optimized */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/fire-water-damage-restoration.jpg"
              alt="Water damage restoration services Brisbane"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
            {/* Voice-First H1 */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl voice-answer">
              Water Damage Restoration Brisbane - Ring 1300 309 361
            </h1>

            {/* Direct Answer for Voice Queries */}
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg voice-answer">
              24-hour emergency water damage restoration. We're in Wacol. We can be there within an hour.
              IICRC certified. Insurance approved.
            </p>

            {/* Emergency CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                aria-label="Ring 1300 309 361 for emergency water damage help"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Response Steps */}
        <EmergencyVoiceResponse emergencyType="flooding" suburb="Brisbane" />

        {/* Quick Answer Section for Voice Queries */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="voice-answer bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Water Damage Help in Brisbane
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p className="mb-4">
                  <strong>We fix water damage fast.</strong> Our Brisbane team responds within 1 hour.
                  We extract water, dry your property, and prevent mould growth. Available 24 hours a day,
                  7 days a week.
                </p>
                <ul className="space-y-2">
                  <li>✓ Emergency water extraction</li>
                  <li>✓ Structural drying</li>
                  <li>✓ Mould prevention</li>
                  <li>✓ Insurance claims help</li>
                  <li>✓ Contents restoration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Water Damage Services */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Water Damage Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Flood Water Extraction",
                  description: "We pump out flood water fast with industrial equipment",
                  voiceQuery: "flood water removal Brisbane"
                },
                {
                  title: "Burst Pipe Cleanup",
                  description: "Quick response to burst pipes to minimise damage",
                  voiceQuery: "burst pipe flooding Brisbane"
                },
                {
                  title: "Ceiling Leak Repair",
                  description: "We find and fix ceiling leaks, then restore the damage",
                  voiceQuery: "ceiling leaking water Brisbane"
                },
                {
                  title: "Storm Damage",
                  description: "Emergency tarping and water extraction after storms",
                  voiceQuery: "storm water damage Brisbane"
                },
                {
                  title: "Sewage Backup",
                  description: "Safe cleanup and sanitisation of sewage water",
                  voiceQuery: "sewage water cleanup Brisbane"
                },
                {
                  title: "Structural Drying",
                  description: "Professional drying to prevent long-term damage",
                  voiceQuery: "dry out flooded house Brisbane"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Voice search: "{service.voiceQuery}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How We Fix Water Damage
            </h2>

            <ol className="space-y-6">
              {[
                {
                  step: "Emergency Response",
                  detail: "We answer your call 24/7 and arrive within 1 hour",
                  time: "0-1 hours"
                },
                {
                  step: "Stop the Source",
                  detail: "We find where water is coming from and stop it",
                  time: "Immediate"
                },
                {
                  step: "Extract Water",
                  detail: "Industrial pumps and extractors remove all standing water",
                  time: "1-3 hours"
                },
                {
                  step: "Dry Everything",
                  detail: "Dehumidifiers and air movers dry walls, floors, and contents",
                  time: "2-5 days"
                },
                {
                  step: "Clean and Sanitise",
                  detail: "We clean, disinfect, and treat to prevent mould",
                  time: "1-2 days"
                },
                {
                  step: "Restore Your Property",
                  detail: "Repair and rebuild to pre-damage condition",
                  time: "Varies"
                }
              ].map((process, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {process.step}
                    </h3>
                    <p className="text-gray-700">
                      {process.detail}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Timeline: {process.time}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Voice-Optimized FAQs */}
        <VoiceSearchOptimizedFAQ
          title="Water Damage Questions - Brisbane Residents"
          faqs={waterDamageFAQs}
          emergencyContext={true}
        />

        {/* Local Area Coverage */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Water Damage Service Areas
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Brisbane CBD', 'New Farm', 'Ascot', 'Hamilton',
                'Toowong', 'St Lucia', 'Indooroopilly', 'Paddington',
                'Bulimba', 'Hawthorne', 'Norman Park', 'Seven Hills',
                'Camp Hill', 'Coorparoo', 'Greenslopes', 'Annerley',
                'West End', 'South Brisbane', 'Kangaroo Point', 'Fortitude Valley',
                'Spring Hill', 'Milton', 'Auchenflower', 'Bardon',
                'The Gap', 'Ashgrove', 'Kelvin Grove', 'Red Hill',
                'Ipswich', 'Logan', 'Wacol', 'Inala'
              ].map((suburb) => (
                <div key={suburb} className="bg-white rounded-lg py-3 px-4 text-center hover:bg-blue-50 transition-colors">
                  <Link
                    href={`/locations/${suburb.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-900 hover:text-blue-600"
                  >
                    {suburb}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8">
              <strong>Can't see your suburb?</strong> We service all of Greater Brisbane.
              Ring 1300 309 361 to check coverage.
            </p>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Water Damage Emergency?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Don't wait. Water damage gets worse every hour.
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
                Get Help Online
              </Link>
            </div>

            <div className="mt-8 text-red-100">
              <p className="mb-2">Office: 4/17 Tile St, Wacol, QLD 4076</p>
              <p>Available 24 hours, 7 days a week</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}