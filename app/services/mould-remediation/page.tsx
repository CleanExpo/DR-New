import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mould Remediation Services | Professional Mould Removal',
  description: 'Expert mould remediation Brisbane & surrounds. Safe removal, moisture control, prevention strategies. IICRC certified technicians. Health-focused approach. Call 1300 309 361.',
  keywords: ["mould remediation","mould removal brisbane","black mould treatment","mould inspection","moisture control","antimicrobial treatment"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/services/mould-remediation',
    },
  },
  openGraph: {
    title: 'Mould Remediation Services | Professional Mould Removal',
    description: 'Expert mould remediation Brisbane & surrounds. Safe removal, moisture control, prevention strategies. IICRC certified technicians. Health-focused appr...',
    url: 'https://disasterrecovery.com.au/services/mould-remediation',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/mould-remediation.jpg',
        width: 1200,
        height: 630,
        alt: 'Mould Remediation Services | Professional Mould Removal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Services | Professional Mould Removal',
    description: 'Expert mould remediation Brisbane & surrounds. Safe removal, moisture control, prevention strategies. IICRC certified technicians. Health-focused appr...',
    images: ['https://disasterrecovery.com.au/images/services/mould-remediation.jpg'],
  },
};

export default function MouldRemediationPage() {
  return (
    <>
      <SchemaMarkup type="Service" data={{ serviceName: 'Mould Remediation' }} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Mould Remediation", url: "https://disasterrecovery.com.au/services/mould-remediation" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Mould Remediation Service">

        {/* Hero Section */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Professional Mould Remediation Services
                </h1>
                <p className="text-xl mb-8 text-green-100">
                  IICRC certified mould remediation specialists for Brisbane's commercial and residential properties.
                  Expert treatment for Queensland's unique subtropical mould challenges.
                </p>

                {/* Emergency CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call 1300 309 361
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors border-2 border-white"
                  >
                    Request Inspection
                  </Link>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/services/mould-remediation.webp"
                  alt="Professional mould remediation service"
                  fill
                  className="object-cover"
                
            quality={80}
          
            loading="lazy"
          
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Commercial & Residential Mould Solutions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Commercial Properties
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Brisbane CBD offices & corporate facilities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Retail centres & hospitality venues
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Healthcare centres & educational facilities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Minimised business disruption
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Premium Residential
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Luxury homes in New Farm, Ascot & Hamilton
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Queenslander & heritage property specialists
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Discreet, professional service
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Contents protection & restoration
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our IICRC Certified Mould Remediation Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-700">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Inspection</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive assessment including moisture mapping, air quality testing, and subtropical climate analysis
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-700">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Containment</h3>
                <p className="text-gray-600 text-sm">
                  Professional containment barriers preventing cross-contamination throughout your property
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-700">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Remediation</h3>
                <p className="text-gray-600 text-sm">
                  HEPA filtration, antimicrobial treatment, and complete mould removal following Australian Standards
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-700">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Prevention</h3>
                <p className="text-gray-600 text-sm">
                  Moisture control solutions and preventative treatments designed for Brisbane's humidity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Service Areas
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Specialised mould remediation services across Brisbane's premium residential suburbs and commercial districts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">Brisbane CBD</span>
              </div>
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">New Farm</span>
              </div>
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">Ascot</span>
              </div>
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">Hamilton</span>
              </div>
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">Ipswich</span>
              </div>
              <div className="bg-gray-50 rounded-lg py-3 px-4">
                <span className="font-medium">Logan</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Professional Mould Remediation Services
            </h2>
            <p className="text-xl mb-8 text-green-100">
              IICRC certified technicians available 24/7 across Brisbane, Ipswich, and Logan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors border-2 border-white"
              >
                Emergency Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}