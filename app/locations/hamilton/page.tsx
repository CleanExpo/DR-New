import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamilton Disaster Recovery | Luxury Home Restoration | 24/7',
  description: 'Hamilton&apos;s premier disaster restoration service. Luxury riverside homes, commercial properties, water & fire experts. Insurance specialists. Call 1300 309 361.',
  keywords: ["disaster recovery hamilton","luxury home restoration 4007","riverside flooding","Portside Wharf area","commercial recovery"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/hamilton',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/locations/hamilton',
    },
  },
  openGraph: {
    title: 'Hamilton Disaster Recovery | Luxury Home Restoration',
    description: 'Hamilton&apos;s premier disaster restoration service. Luxury riverside homes, commercial properties, water & fire experts. Insurance specialists. Call 1300...',
    url: 'https://disasterrecovery.com.au/locations/hamilton',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function HamiltonPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/hamilton",
    "name": "Disaster Recovery - Hamilton",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing Hamilton",
      "addressLocality": "Hamilton",
      "addressRegion": "QLD",
      "postalCode": "4007",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4380,
      "longitude": 153.0656
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "143"
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
              Hamilton Brisbane Water Damage Restoration
            </h1>
            <p className="text-xl mb-8">
              Riverside Specialists • Luxury Apartments • Marina Properties • 24/7 Response
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
                  Hamilton's Riverside Water Damage Experts
                </h2>
                <p className="text-lg mb-4">
                  Hamilton's riverside location and luxury developments require specialized water damage expertise.
                  From Portside Wharf to Hamilton Harbour, our team understands the unique challenges of
                  riverside properties, marina developments, and high-rise apartments.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Specialists in riverside and marina properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Experience with luxury apartment complexes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Rapid response to Portside and Northshore areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Body corporate approved contractors</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Hamilton Specialized Services
                </h3>
                <ul className="space-y-2">
                  <li>• High-rise apartment water damage</li>
                  <li>• Marina and waterfront property restoration</li>
                  <li>• Underground parking flood recovery</li>
                  <li>• Luxury apartment complex emergencies</li>
                  <li>• Balcony and terrace water ingress</li>
                  <li>• Lift shaft and basement flooding</li>
                  <li>• Commercial precinct water damage</li>
                  <li>• Storm surge and tidal flooding response</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Riverside Focus Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Hamilton Properties Trust Disaster Recovery
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Riverside Experience</h3>
                <p>
                  Extensive experience with Brisbane River flooding and tidal surges
                  affecting Hamilton's waterfront properties.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">High-Rise Specialists</h3>
                <p>
                  Expert equipment and techniques for water extraction in multi-story
                  buildings and luxury apartment complexes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Body Corporate Partners</h3>
                <p>
                  Trusted by Hamilton's major body corporates for emergency response
                  and preventative maintenance programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Hamilton 24/7 Emergency Water Damage Response
            </h2>
            <p className="text-xl mb-8">
              Servicing all Hamilton areas including Portside Wharf, Northshore,
              Hamilton Harbour, and Racecourse Road. Immediate response for riverside emergencies.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
            >
              📞 Call 1300 309 361 - Emergency Response
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}