import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'West End Disaster Recovery | Cultural Precinct Restoration | 24/7',
  description: 'West End disaster restoration team. Cultural precinct, riverside properties, cafes & apartments. Water, fire & flood specialists. Call 1300 309 361.',
  keywords: ["disaster recovery west end","flood restoration 4101","Boundary Street area","riverside recovery","commercial restoration"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/west-end',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/locations/west-end',
    },
  },
  openGraph: {
    title: 'West End Disaster Recovery | Cultural Precinct Restoration',
    description: 'West End disaster restoration team. Cultural precinct, riverside properties, cafes & apartments. Water, fire & flood specialists. Call 1300 309 361....',
    url: 'https://disasterrecovery.com.au/locations/west-end',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function WestEndPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/west-end",
    "name": "Disaster Recovery - West End",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing West End",
      "addressLocality": "West End",
      "addressRegion": "QLD",
      "postalCode": "4101",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4784,
      "longitude": 153.0121
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
      "reviewCount": "127"
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
              Water Damage Restoration West End Brisbane
            </h1>
            <p className="text-xl mb-8">
              24/7 Emergency Response • 1-Hour Arrival • Insurance Approved
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
                  Fast Water Damage Response in West End
                </h2>
                <p className="text-lg mb-4">
                  Living near the Brisbane River, West End properties face unique flood and water damage risks.
                  Our local team understands the specific challenges of West End homes and businesses.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>15-minute drive from our Wacol facility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Experience with heritage Queenslanders and modern apartments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Familiar with West End's flood-prone areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Work with body corporates in Riverside Drive complexes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Services We Provide in West End
                </h3>
                <ul className="space-y-2">
                  <li>• Emergency water extraction and drying</li>
                  <li>• Brisbane River flood damage restoration</li>
                  <li>• Burst pipe and plumbing emergencies</li>
                  <li>• Storm damage repairs</li>
                  <li>• Mould remediation in older homes</li>
                  <li>• Sewage cleanup and sanitisation</li>
                  <li>• Fire and smoke damage restoration</li>
                  <li>• Insurance claim assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Local Keywords Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Disaster Recovery for West End Water Damage?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Local Knowledge</h3>
                <p>
                  We know West End's unique challenges - from riverside flooding to older pipe systems
                  in heritage properties along Boundary Street.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Fast Response</h3>
                <p>
                  Our emergency teams can reach West End within 30 minutes, 24/7.
                  We're familiar with every street from Montague Road to Hardgrave Road.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Insurance Experts</h3>
                <p>
                  We work with all major insurers and understand West End's flood mapping
                  for smooth claim processing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              West End Water Damage? We're Here 24/7
            </h2>
            <p className="text-xl mb-8">
              Don't wait - water damage gets worse every hour.
              Call our West End emergency team now for immediate assistance.
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