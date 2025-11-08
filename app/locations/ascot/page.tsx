import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, ClockIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Ascot Water Damage Restoration | IICRC Master Restorer Brisbane | 24/7 Emergency',
  description: 'Emergency water damage, fire damage & flood restoration in Ascot, Brisbane. IICRC Master Restorer Phill McGurk. 30-min response. Insurance approved. Serving Ascot prestige properties. Call 1300 309 361.',
  keywords: 'water damage restoration ascot brisbane, emergency restoration ascot, flood damage ascot, fire damage ascot, master restorer ascot, prestige home restoration ascot, mould removal ascot, 24/7 emergency ascot brisbane',
  openGraph: {
    title: 'Ascot Brisbane Emergency Restoration | Master Restorer 24/7',
    description: 'IICRC Master Restorer serving Ascot\'s prestige properties. 30-minute emergency response. Water, fire & flood damage specialists.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/ascot'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Disaster Recovery Ascot Brisbane",
  "description": "IICRC Master Restorer providing 24/7 emergency water damage, fire damage, and flood restoration services in Ascot, Brisbane. Specializing in prestige properties and luxury homes.",
  "telephone": "+61-1300-309-361",
  "email": "info@disasterrecoverybrisbane.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4/17 Tile St",
    "addressLocality": "Wacol",
    "addressRegion": "QLD",
    "postalCode": "4076",
    "addressCountry": "AU"
  },
  "areaServed": {
    "@type": "City",
    "name": "Ascot",
    "containedInPlace": {
      "@type": "City",
      "name": "Brisbane",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    }
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4294,
    "longitude": 153.0597
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
};

export default function AscotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/suburbs/ascot-storm-damage-restoration-services.webp"
              alt="Ascot Brisbane emergency restoration services - IICRC Master Restorer Phill McGurk providing 24/7 water damage, fire damage, and storm damage restoration for Ascot prestige properties and racecourse area homes"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/90 via-red-800/90 to-slate-900/90" />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center">
              <div className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                IICRC MASTER RESTORER BRISBANE
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Ascot Emergency
                <span className="block text-red-400 mt-2">
                  Disaster Restoration
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-red-100">
                24/7 Water Damage • Fire Damage • Flood Restoration
              </p>
              <p className="text-lg mb-8 text-gray-200">
                Serving Ascot's prestige racecourse properties with IICRC-certified restoration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
                >
                  <PhoneIcon className="w-6 h-6" />
                  1300 309 361
                </a>
                <Link
                  href="/get-help"
                  className="inline-flex items-center justify-center gap-2 bg-red-800 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-red-900 transition-all border-2 border-white shadow-2xl"
                >
                  Get Emergency Help
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-red-100">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>&lt; 30 Min Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Insurance Approved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-slate-900 text-white border-y border-red-600">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold">Master Restorer Phill McGurk</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">Ascot Prestige Property Specialists</div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">24/7 Emergency Dispatch</div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              Emergency Restoration Services in Ascot
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Specialized disaster recovery for Ascot's high-value residential properties
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💧 Water Damage</h3>
                <p className="text-gray-700 mb-4">
                  Emergency water extraction, structural drying, flood recovery, and burst pipe restoration.
                </p>
                <Link href="/services/water-damage" className="text-blue-600 font-semibold hover:text-blue-800">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🔥 Fire Damage</h3>
                <p className="text-gray-700 mb-4">
                  Complete fire and smoke damage restoration, soot removal, and odor elimination.
                </p>
                <Link href="/services/fire-damage" className="text-red-600 font-semibold hover:text-red-800">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🦠 Mould Remediation</h3>
                <p className="text-gray-700 mb-4">
                  Professional mould inspection, testing, and IICRC-certified remediation.
                </p>
                <Link href="/services/mould-remediation" className="text-green-600 font-semibold hover:text-green-800">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-cyan-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⛈️ Storm Damage</h3>
                <p className="text-gray-700 mb-4">
                  Emergency roof tarping, wind damage repair, and storm restoration services.
                </p>
                <Link href="/services/storm-damage" className="text-cyan-600 font-semibold hover:text-cyan-800">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏢 Commercial</h3>
                <p className="text-gray-700 mb-4">
                  Large-scale commercial property disaster restoration for Ascot businesses.
                </p>
                <Link href="/services/commercial" className="text-purple-600 font-semibold hover:text-purple-800">
                  Learn More →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🧪 Biohazard Cleanup</h3>
                <p className="text-gray-700 mb-4">
                  Specialized biohazard, trauma scene, and sewage cleanup services.
                </p>
                <Link href="/services/biohazard-cleanup" className="text-orange-600 font-semibold hover:text-orange-800">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              Why Ascot Property Owners Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-200">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  IICRC Master Restorer
                </h3>
                <p className="text-gray-700">
                  Phill McGurk holds the highest professional certification for disaster restoration in Queensland.
                  One of limited Master Restorers in Brisbane.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-8 border border-red-200">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Rapid 30-Min Response
                </h3>
                <p className="text-gray-700">
                  Immediate dispatch to Ascot properties. Fast response times minimize damage and protect your investment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Insurance Direct Billing
                </h3>
                <p className="text-gray-700">
                  Work directly with all major insurance companies. No upfront costs for approved claims.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ascot Emergency? Call Now
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Available 24/7 for immediate emergency restoration assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105"
              >
                <PhoneIcon className="w-8 h-8" />
                1300 309 361
              </a>
              <Link
                href="/claim"
                className="inline-flex items-center justify-center gap-2 bg-red-800 text-white px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-900 transition-all border-2 border-white shadow-2xl"
              >
                Submit Emergency Claim
              </Link>
            </div>
            <p className="mt-6 text-red-200">
              Serving Ascot • Hamilton • New Farm • Toowong • All Brisbane
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
