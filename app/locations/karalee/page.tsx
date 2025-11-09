import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, ClockIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Karalee Water Damage Restoration | IICRC Master Restorer Ipswich | 24/7 Emergency',
  description: 'Emergency water damage, fire damage & flood restoration in Karalee, Ipswich. IICRC Master Restorer Phill McGurk. 30-min response. Insurance approved. Serving Karalee prestige properties. Call 1300 309 361.',
  keywords: 'water damage restoration karalee ipswich, emergency restoration karalee, flood damage karalee, fire damage karalee, master restorer karalee, storm damage karalee, mould removal karalee, 24/7 emergency karalee ipswich',
  openGraph: {
    title: 'Karalee Ipswich Emergency Restoration | Master Restorer 24/7',
    description: 'IICRC Master Restorer serving Karalee prestige properties. 30-minute emergency response. Water, fire & storm damage specialists.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/karalee'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Disaster Recovery Karalee Ipswich",
  "description": "IICRC Master Restorer providing 24/7 emergency water damage, fire damage, and storm restoration services in Karalee, Ipswich. Specializing in prestige residential properties.",
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
    "name": "Karalee",
    "containedInPlace": {
      "@type": "City",
      "name": "Ipswich",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    }
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.6089,
    "longitude": 152.7847
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Karalee Emergency Restoration Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Water Damage Restoration Karalee",
          "description": "24/7 emergency water extraction, flood recovery, and structural drying for Karalee properties"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Storm Damage Restoration Karalee",
          "description": "Complete storm and wind damage restoration for Karalee homes and businesses"
        }
      }
    ]
  }
};

export default function KaraleePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section with Background Image */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/suburbs/karalee-ipswich-storm-damage-repair.webp"
              alt="Karalee Ipswich emergency storm damage restoration services - IICRC Master Restorer Phill McGurk providing 24/7 water damage, fire damage, and storm damage restoration for Karalee prestige properties"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/90 via-red-800/90 to-slate-900/90" />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center">
              <div className="inline-block bg-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                IICRC MASTER RESTORER IPSWICH
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Karalee Emergency
                <span className="block text-red-400 mt-2">
                  Disaster Restoration
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-red-100">
                24/7 Water Damage • Fire Damage • Storm Restoration
              </p>
              <p className="text-lg mb-8 text-gray-200">
                Serving Karalee prestige properties with IICRC-certified emergency restoration
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

        {/* Trust Indicators */}
        <section className="py-8 bg-slate-900 text-white border-y border-red-600">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold">Master Restorer Phill McGurk</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">One of Limited Master Restorers in QLD</div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">24/7 Emergency Dispatch</div>
            </div>
          </div>
        </section>

        {/* Services for Karalee */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              Emergency Restoration Services in Karalee
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Specialized disaster recovery for Karalee prestige properties and acreage homes
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-blue-700">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  💧 Water Damage Restoration
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Emergency water extraction (flood, burst pipes, storm damage)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Structural drying with thermal imaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Hardwood floor drying and restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Ceiling and wall cavity drying</span>
                  </li>
                </ul>
                <Link
                  href="/services/water-damage"
                  className="inline-block mt-6 text-blue-600 font-semibold hover:text-blue-800"
                >
                  Learn More About Water Damage →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🔥 Fire Damage Restoration
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✓</span>
                    <span>Smoke and soot damage cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✓</span>
                    <span>Odor elimination and air purification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✓</span>
                    <span>Contents restoration and pack-out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✓</span>
                    <span>Structural cleaning and deodorization</span>
                  </li>
                </ul>
                <Link
                  href="/services/fire-damage"
                  className="inline-block mt-6 text-red-600 font-semibold hover:text-red-800"
                >
                  Learn More About Fire Damage →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🦠 Mould Remediation
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Professional mould inspection and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>IICRC-certified mould remediation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Air quality restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Moisture source identification and repair</span>
                  </li>
                </ul>
                <Link
                  href="/services/mould-remediation"
                  className="inline-block mt-6 text-green-600 font-semibold hover:text-green-800"
                >
                  Learn More About Mould Removal →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-cyan-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ⛈️ Storm Damage Restoration
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">✓</span>
                    <span>Emergency roof tarping and board-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">✓</span>
                    <span>Wind and hail damage repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">✓</span>
                    <span>Tree impact damage restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-1">✓</span>
                    <span>Structural water intrusion repair</span>
                  </li>
                </ul>
                <Link
                  href="/services/storm-damage"
                  className="inline-block mt-6 text-cyan-600 font-semibold hover:text-cyan-800"
                >
                  Learn More About Storm Damage →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Karalee Specific */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              Why Karalee Property Owners Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-200">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Master Restorer Certified
                </h3>
                <p className="text-gray-700">
                  Phill McGurk is one of the limited number of IICRC Master Restorers in Brisbane and Queensland.
                  The highest professional certification for disaster restoration.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-8 border border-red-200">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  30-Minute Karalee Response
                </h3>
                <p className="text-gray-700">
                  Located near Karalee with dedicated emergency dispatch. Average response time under 30 minutes
                  to minimize damage and protect your property investment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Acreage Property Specialists
                </h3>
                <p className="text-gray-700">
                  Extensive experience with Karalee acreage properties and prestige homes.
                  Specialized techniques for large properties, outbuildings, and rural features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Insurance Work Our Specialty
              </h2>
              <p className="text-xl text-gray-300">
                Direct billing with all major Australian insurance companies
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">No Upfront Costs</h3>
                <p className="text-gray-300">
                  We bill your insurance company directly. No out-of-pocket expenses for approved claims.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Claims Assistance</h3>
                <p className="text-gray-300">
                  Complete documentation and support throughout the entire insurance claims process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Karalee Emergency? Call Now
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Available 24/7 for immediate emergency restoration assistance to Karalee properties
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
              Serving Karalee • Brookwater • Springfield Lakes • All Ipswich
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
