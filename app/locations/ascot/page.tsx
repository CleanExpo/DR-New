import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Water Damage Restoration Ascot | Luxury Home Specialists',
  description: 'Premium water damage restoration in Ascot Brisbane. Specializing in luxury homes, heritage properties. 24/7 emergency response. Call 1300 309 361.',
  keywords: ['water damage ascot', 'luxury home water damage', 'ascot flood restoration', 'heritage property water damage'],
};

export default function AscotPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://disasterrecovery.com.au/locations/ascot",
    "name": "Disaster Recovery - Ascot",
    "image": "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Servicing Ascot",
      "addressLocality": "Ascot",
      "addressRegion": "QLD",
      "postalCode": "4007",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4285,
      "longitude": 153.0579
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
      "ratingValue": "5.0",
      "reviewCount": "98"
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
              Premium Water Damage Restoration Ascot Brisbane
            </h1>
            <p className="text-xl mb-8">
              Luxury Home Specialists • Heritage Property Experts • Discreet 24/7 Service
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
                  Ascot's Premier Restoration Service
                </h2>
                <p className="text-lg mb-4">
                  Ascot's prestigious homes deserve exceptional restoration service. Our team specializes
                  in luxury properties, heritage Queenslanders, and high-end residences throughout Ascot,
                  providing discrete, professional service that preserves your home's value and character.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Specialists in luxury and heritage properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Discrete service respecting your privacy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Experience with high-value contents and artwork</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Coordination with luxury home insurers</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Specialized Ascot Services
                </h3>
                <ul className="space-y-2">
                  <li>• Heritage Queenslander restoration</li>
                  <li>• Luxury home water damage recovery</li>
                  <li>• High-value contents restoration</li>
                  <li>• Hardwood floor drying and restoration</li>
                  <li>• Wine cellar and basement flooding</li>
                  <li>• Swimming pool area water damage</li>
                  <li>• Premium carpet and rug restoration</li>
                  <li>• Art and antique recovery services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Service Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Ascot Homeowners Choose Disaster Recovery
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Heritage Expertise</h3>
                <p>
                  Specialized knowledge in restoring Ascot's heritage-listed properties
                  and character homes while preserving original features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Premium Service</h3>
                <p>
                  White-glove service with attention to detail. We understand the unique
                  needs of luxury property owners in Ascot.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Insurance Expertise</h3>
                <p>
                  Direct relationships with high-value home insurers. We manage your
                  claim professionally from start to finish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ascot's Trusted Emergency Response Team
            </h2>
            <p className="text-xl mb-8">
              Servicing all of Ascot including Lancaster Road, Sutherland Avenue,
              and the prestigious riverside estates. Discrete, professional service 24/7.
            </p>
            <a
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
            >
              📞 Call 1300 309 361 - Priority Response
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}