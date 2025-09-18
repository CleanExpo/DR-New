import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milton Disaster Recovery | Commercial Restoration | 24/7',
  description: 'Milton disaster restoration experts. Suncorp Stadium area, commercial & residential water, fire & flood specialists. Quick response. Call 1300 309 361.',
  keywords: ["disaster recovery milton","flood restoration milton 4064","Suncorp Stadium area","commercial water damage","office restoration"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/milton',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/locations/milton',
    },
  },
  openGraph: {
    title: 'Milton Disaster Recovery | Commercial Restoration',
    description: 'Milton disaster restoration experts. Suncorp Stadium area, commercial & residential water, fire & flood specialists. Quick response. Call 1300 309 361...',
    url: 'https://disasterrecovery.com.au/locations/milton',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function MiltonPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/milton",
    "name": "Disaster Recovery - Milton",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing Milton",
      "addressLocality": "Milton",
      "addressRegion": "QLD",
      "postalCode": "4064",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4709,
      "longitude": 153.0054
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Water Damage Restoration Milton Brisbane
            </h1>
            <p className="text-xl mb-8">
              Commercial & Residential Flood Recovery • Insurance Approved • 24/7 Response
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
              >
                📞 Call 1300 309 361
              </a>
            </div>
          </div>
        </section>

        {/* Local Service Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Milton's Trusted Water Damage Specialists
                </h2>
                <p className="text-lg mb-4">
                  Milton's business district and residential areas face unique water damage challenges.
                  From commercial buildings along Park Road to residential properties near Milton State School,
                  our team has extensive experience with Milton's diverse property types.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Rapid response to Milton's commercial precinct</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Experience with office buildings and retail spaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>24/7 emergency service for Milton businesses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Minimal disruption to business operations</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Milton Water Damage Services
                </h3>
                <ul className="space-y-2">
                  <li>• Commercial water extraction and drying</li>
                  <li>• Office building flood restoration</li>
                  <li>• Restaurant and cafe water damage recovery</li>
                  <li>• Apartment complex flood response</li>
                  <li>• Underground parking water removal</li>
                  <li>• HVAC system water damage repairs</li>
                  <li>• Document and equipment recovery</li>
                  <li>• After-hours emergency response</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Focus Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Commercial Water Damage Experts in Milton
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Office Buildings</h3>
                <p>
                  Specialized service for Milton's office towers and commercial spaces.
                  We work after hours to minimise business disruption.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Retail & Hospitality</h3>
                <p>
                  Fast restoration for shops, restaurants, and cafes along Park Road
                  and Railway Terrace. Priority service to get you trading again.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Insurance Claims</h3>
                <p>
                  Direct billing to insurance companies. We handle all documentation
                  and work with loss adjusters to streamline your claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Milton Emergency Water Damage Response
            </h2>
            <p className="text-xl mb-8">
              Servicing all of Milton including Park Road, Railway Terrace,
              and surrounding commercial districts. Available 24/7 for emergencies.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
            >
              📞 Call 1300 309 361 - Immediate Response
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}