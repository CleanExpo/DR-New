import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Norman Park Disaster Recovery | Emergency Restoration | 24/7',
  description: 'Norman Park disaster restoration team. Norman Creek flooding experts, residential water damage & mould specialists. Quick response. Call 1300 309 361.',
  keywords: ["disaster recovery norman park","flood restoration 4170","Norman Creek flooding","residential water damage","mould recovery"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/norman-park',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/locations/norman-park',
    },
  },
  openGraph: {
    title: 'Norman Park Disaster Recovery | Emergency Restoration',
    description: 'Norman Park disaster restoration team. Norman Creek flooding experts, residential water damage & mould specialists. Quick response. Call 1300 309 361....',
    url: 'https://disasterrecovery.com.au/locations/norman-park',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function NormanParkPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/norman-park",
    "name": "Disaster Recovery - Norman Park",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing Norman Park",
      "addressLocality": "Norman Park",
      "addressRegion": "QLD",
      "postalCode": "4170",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4812,
      "longitude": 153.065
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
      "reviewCount": "145"
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
              Water Damage Restoration Norman Park Brisbane
            </h1>
            <p className="text-xl mb-8">
              Queenslanders, family residences, local amenities • 24/7 Emergency Response • Insurance Approved
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
                  Norman Park's Trusted Water Damage Specialists
                </h2>
                <p className="text-lg mb-4">
                  Our expert team provides rapid water damage restoration services throughout Norman Park.
                  With extensive experience in queenslanders, family residences, local amenities, we understand the unique challenges
                  of properties in Norman Park 4170.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Rapid response to Norman Park emergencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Local knowledge of Norman Park property types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>24/7 availability for urgent water damage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Insurance approved restoration services</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Services We Provide in Norman Park
                </h3>
                <ul className="space-y-2">
                  <li>• Emergency water extraction and drying</li>
                  <li>• Flood damage restoration</li>
                  <li>• Burst pipe and plumbing emergencies</li>
                  <li>• Storm and rain damage repairs</li>
                  <li>• Mould remediation and prevention</li>
                  <li>• Sewage cleanup and sanitisation</li>
                  <li>• Fire and smoke damage restoration</li>
                  <li>• Contents restoration and recovery</li>
                  <li>• Insurance claim assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Property Type Focus */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Norman Park Properties Choose Disaster Recovery
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p>
                  Deep understanding of Norman Park's unique property characteristics,
                  from queenslanders, family residences, local amenities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Fast Response</h3>
                <p>
                  Our emergency teams can reach Norman Park quickly,
                  minimising damage and reducing restoration costs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Insurance Support</h3>
                <p>
                  We work directly with all major insurers, handling the
                  paperwork while you focus on recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Norman Park Emergency Water Damage Response
            </h2>
            <p className="text-xl mb-8">
              Servicing all of Norman Park 4170 with rapid 24/7 emergency response.
              Don't let water damage get worse - call our expert team now.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
            >
              📞 Call 1300 309 361 - Available Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}