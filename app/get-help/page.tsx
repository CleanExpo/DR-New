import { Metadata } from 'next';
import Link from 'next/link';
import { PhoneIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Get Emergency Help NOW | 24/7 Brisbane Master Restorer | Immediate Response',
  description: 'Need emergency disaster recovery help? IICRC Master Restorer Phill McGurk responds immediately. Water damage, fire damage, flood, storm. Brisbane, Ipswich, Logan. Call 1300 309 361 NOW - 24/7 emergency.',
  keywords: 'emergency help brisbane, immediate water damage help, fire damage emergency, flood help brisbane, master restorer emergency, 24/7 disaster recovery, urgent restoration brisbane, emergency response brisbane',
  openGraph: {
    title: 'Emergency Help Available NOW | Brisbane Master Restorer 24/7',
    description: 'IICRC Master Restorer provides immediate emergency response. Water, fire, flood & storm damage. Call now for help.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/get-help'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "name": "Emergency Disaster Recovery Help - Brisbane Master Restorer",
  "telephone": "+61-1300-309-361",
  "email": "emergency@disasterrecoverybrisbane.com.au",
  "availableLanguage": "English",
  "areaServed": [
    { "@type": "City", "name": "Brisbane" },
    { "@type": "City", "name": "Ipswich" },
    { "@type": "City", "name": "Logan" }
  ],
  "openingHours": "Mo-Su 00:00-23:59"
};

export default function GetHelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Emergency Header */}
        <div className="bg-red-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="text-center font-bold text-sm md:text-base">
              ⚠️ EMERGENCY HOTLINE ACTIVE 24/7 • IMMEDIATE RESPONSE AVAILABLE ⚠️
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-red-900 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                GET EMERGENCY HELP
                <span className="block text-red-400 mt-3">
                  AVAILABLE NOW
                </span>
              </h1>
              <p className="text-2xl md:text-3xl mb-8 text-red-100 font-bold">
                IICRC Master Restorer • Immediate Response Team
              </p>

              {/* Immediate Call Action */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  STEP 1: CALL NOW FOR IMMEDIATE HELP
                </h2>
                <p className="text-gray-600 mb-6">
                  Speak directly with our emergency dispatch team
                </p>
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center gap-3 bg-red-600 text-white px-12 py-8 rounded-xl font-black text-4xl hover:bg-red-700 transition-all shadow-2xl hover:scale-105 w-full mb-4"
                >
                  <PhoneIcon className="w-12 h-12" />
                  1300 309 361
                </a>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>
                    <ClockIcon className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <div className="font-semibold">24/7 Available</div>
                  </div>
                  <div>
                    <ShieldCheckIcon className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <div className="font-semibold">Master Restorer</div>
                  </div>
                  <div>
                    <MapPinIcon className="w-6 h-6 text-red-600 mx-auto mb-1" />
                    <div className="font-semibold">&lt; 60 Min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens When You Call */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              What Happens When You Call?
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-600">
                  1
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Immediate Answer</h3>
                <p className="text-gray-600 text-sm">
                  Emergency dispatch answers your call immediately - no automated systems
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-600">
                  2
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Situation Assessment</h3>
                <p className="text-gray-600 text-sm">
                  We quickly assess your emergency and provide immediate guidance
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-600">
                  3
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Team Dispatch</h3>
                <p className="text-gray-600 text-sm">
                  IICRC-certified restoration team dispatched to your location immediately
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-red-600">
                  4
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">On-Site Response</h3>
                <p className="text-gray-600 text-sm">
                  Team arrives on-site (typically &lt; 60 minutes) and begins emergency mitigation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Situations We Handle */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              Emergency Situations We Handle
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💧 Water Emergencies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Burst pipes flooding your property</li>
                  <li>✓ Ceiling collapse from water damage</li>
                  <li>✓ Hot water system failures</li>
                  <li>✓ Toilet or pipe overflows</li>
                  <li>✓ Storm water intrusion</li>
                  <li>✓ Appliance failures (dishwasher, washing machine)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔥 Fire Emergencies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ House fire smoke damage</li>
                  <li>✓ Kitchen fire cleanup</li>
                  <li>✓ Electrical fire damage</li>
                  <li>✓ Bushfire impact on property</li>
                  <li>✓ Soot and ash contamination</li>
                  <li>✓ Fire suppression water damage</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg p-8 border-l-4 border-cyan-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">⛈️ Storm Emergencies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Roof damage and leaks</li>
                  <li>✓ Wind damage to structure</li>
                  <li>✓ Hail damage</li>
                  <li>✓ Tree impact damage</li>
                  <li>✓ Flash flood damage</li>
                  <li>✓ Broken windows from storm</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🧪 Biohazard Emergencies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Sewage backup and overflow</li>
                  <li>✓ Contaminated water (Category 3)</li>
                  <li>✓ Trauma scene cleanup</li>
                  <li>✓ Hoarding cleanup</li>
                  <li>✓ Crime scene decontamination</li>
                  <li>✓ Medical waste cleanup</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Immediate Response Across South East Queensland
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-6 h-6" />
                  Brisbane
                </h3>
                <div className="text-gray-300 space-y-1 text-sm">
                  <div>• Hamilton (&lt; 30 min)</div>
                  <div>• Ascot (&lt; 30 min)</div>
                  <div>• New Farm (&lt; 30 min)</div>
                  <div>• Toowong (&lt; 30 min)</div>
                  <div>• CBD (&lt; 20 min)</div>
                  <div>• Fortitude Valley (&lt; 25 min)</div>
                  <div>• Milton (&lt; 25 min)</div>
                  <div>• West End, Paddington, Bulimba</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-6 h-6" />
                  Ipswich
                </h3>
                <div className="text-gray-300 space-y-1 text-sm">
                  <div>• Karalee (&lt; 40 min)</div>
                  <div>• Brookwater (&lt; 45 min)</div>
                  <div>• Springfield Lakes (&lt; 40 min)</div>
                  <div>• Ipswich CBD (&lt; 35 min)</div>
                  <div>• Springfield Central (&lt; 40 min)</div>
                  <div>• Goodna, Booval</div>
                  <div>• Redbank Plains</div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-6 h-6" />
                  Logan
                </h3>
                <div className="text-gray-300 space-y-1 text-sm">
                  <div>• Logan Central (&lt; 45 min)</div>
                  <div>• Springwood (&lt; 40 min)</div>
                  <div>• Shailer Park (&lt; 45 min)</div>
                  <div>• Underwood (&lt; 40 min)</div>
                  <div>• Browns Plains (&lt; 45 min)</div>
                  <div>• Meadowbrook, Beenleigh</div>
                  <div>• Waterford, Loganholme</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Insurance Claim Assistance
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">✓ Direct Insurance Billing</h3>
                  <p className="text-gray-700">
                    We work directly with all major insurance companies. No upfront costs for approved claims.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">✓ Complete Documentation</h3>
                  <p className="text-gray-700">
                    Professional documentation, photos, and reporting for your insurance claim.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">✓ Claims Navigation</h3>
                  <p className="text-gray-700">
                    We guide you through the entire insurance process from start to finish.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">✓ Scope of Works</h3>
                  <p className="text-gray-700">
                    Detailed scope of works and estimates prepared for insurance assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Don't Wait - Get Help Now
            </h2>
            <p className="text-2xl mb-8 text-red-100">
              Every minute counts in an emergency. Our Master Restorer team is standing by.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center gap-3 bg-white text-red-600 px-16 py-8 rounded-xl font-black text-4xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105 mb-6"
            >
              <PhoneIcon className="w-12 h-12" />
              1300 309 361
            </a>
            <p className="text-xl text-red-200 mb-8">
              24 Hours • 7 Days • 365 Days • Immediate Response
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="inline-block bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-900 transition-all border-2 border-white"
              >
                Submit Emergency Claim
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Online Contact Form
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
