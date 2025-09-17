'use client';

import React from 'react';
import Link from 'next/link';

interface LocalVoiceSearchLandingProps {
  suburb: string;
  service?: string;
  postcode?: string;
}

export default function LocalVoiceSearchLanding({
  suburb,
  service = 'disaster recovery',
  postcode
}: LocalVoiceSearchLandingProps) {

  // Generate LocalBusiness schema with speakable content
  const generateLocalBusinessSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "@id": "https://disasterrecovery.com.au/#organization",
      "name": "Disaster Recovery",
      "alternateName": "Disaster Recovery Brisbane",
      "url": "https://disasterrecovery.com.au",
      "logo": "https://disasterrecovery.com.au/logo.png",
      "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
      "telephone": "+61 1300 309 361",
      "email": "info@disasterrecovery.com.au",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4/17 Tile St",
        "addressLocality": "Wacol",
        "addressRegion": "QLD",
        "postalCode": "4076",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -27.5833,
        "longitude": 152.9333
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "priceRange": "$$-$$$",
      "areaServed": [
        {
          "@type": "City",
          "name": suburb,
          "containedInPlace": {
            "@type": "State",
            "name": "Queensland"
          }
        }
      ],
      "serviceType": [
        "Water Damage Restoration",
        "Fire Damage Restoration",
        "Mould Remediation",
        "Storm Damage Repair",
        "Biohazard Cleaning",
        "Emergency Restoration Services"
      ],
      "availableLanguage": {
        "@type": "Language",
        "name": "English",
        "alternateName": "Australian English"
      },
      "slogan": "Brisbane's trusted emergency restoration service",
      "description": `24-hour emergency ${service} services in ${suburb}. IICRC certified technicians. Insurance approved. Ring 1300 309 361 straight away.`,
      "knowsAbout": [
        "Water damage restoration",
        "Fire damage cleaning",
        "Mould removal",
        "Storm damage repair",
        "Sewage cleanup",
        "Biohazard remediation"
      ],
      "sameAs": [
        "https://www.facebook.com/disasterrecoveryaus",
        "https://www.linkedin.com/company/disaster-recovery-australia"
      ]
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  // Australian conversational patterns
  const getLocalGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "G'day";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      {generateLocalBusinessSchema()}

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Voice-First Answer Box */}
          <div className="voice-answer bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {service.charAt(0).toUpperCase() + service.slice(1)} Services in {suburb}
            </h1>

            {/* Direct Answer for Voice Queries */}
            <p className="text-lg text-gray-800 font-medium mb-4">
              {getLocalGreeting()}, Disaster Recovery provides 24-hour emergency {service} in {suburb}.
              Ring 1300 309 361 straight away. We're in Wacol, and we can be there within an hour.
            </p>

            {/* Quick Facts for Voice Assistants */}
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Response Time:</strong> Within 1 hour to {suburb}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Hours:</strong> 24 hours, 7 days a week</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Certification:</strong> IICRC certified technicians</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Insurance:</strong> We work with all major insurers</span>
              </li>
            </ul>
          </div>

          {/* Services Available */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Emergency Services We Provide in {suburb}:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "Water & Flood Damage",
                  query: `Who fixes water damage in ${suburb}?`,
                  answer: "We extract water and dry your property straight away"
                },
                {
                  name: "Fire & Smoke Damage",
                  query: `Fire restoration company ${suburb}?`,
                  answer: "We clean soot and remove smoke odours completely"
                },
                {
                  name: "Mould Removal",
                  query: `Mould remediation service ${suburb}?`,
                  answer: "We remove mould safely with IICRC certified methods"
                },
                {
                  name: "Storm Damage",
                  query: `Storm damage repair ${suburb}?`,
                  answer: "We do emergency tarping and full restoration"
                },
                {
                  name: "Sewage Cleanup",
                  query: `Sewage cleaning service ${suburb}?`,
                  answer: "We sanitize and decontaminate sewage spills safely"
                },
                {
                  name: "Biohazard Cleaning",
                  query: `Biohazard cleanup ${suburb}?`,
                  answer: "We handle trauma and biohazard situations discretely"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {service.answer}
                  </p>
                  <span className="text-xs text-gray-500 italic">
                    "{service.query}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Area Knowledge */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              We Know {suburb}
            </h2>
            <p className="text-gray-700 mb-4">
              Our team has been servicing {suburb} {postcode && `(${postcode}) `}since 2011.
              We understand the local area, from older Queenslanders that need special care
              to modern homes with the latest materials. We work with local tradies and
              know which suppliers are open for emergency materials.
            </p>
            <p className="text-gray-700">
              When you ring us, you're not getting a call centre. You're talking to locals
              who know Brisbane. We can be at your {suburb} property fast because we're
              based in Wacol, right in the heart of Brisbane.
            </p>
          </div>

          {/* Common Voice Queries */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Common Questions from {suburb} Residents:
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: `How quickly can you get to ${suburb}?`,
                  a: "We can be there within an hour. We're based in Wacol with teams ready 24/7."
                },
                {
                  q: `Do you work with insurance companies in ${suburb}?`,
                  a: "Yes, we work with all major insurers including QBE, IAG, RACQ, and Allianz."
                },
                {
                  q: `What's the cost for emergency service in ${suburb}?`,
                  a: "Many services are covered by insurance. Ring 1300 309 361 to discuss your emergency."
                },
                {
                  q: `Are you available on weekends in ${suburb}?`,
                  a: "Yes, we're available 24 hours a day, 7 days a week, including public holidays."
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                  <p className="text-gray-700">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-50 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-3">
              Need Help in {suburb} Now?
            </h2>
            <p className="text-lg text-red-800 mb-4">
              Don't wait. Water, fire, and mould damage gets worse quickly.
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
        </div>
      </section>
    </>
  );
}