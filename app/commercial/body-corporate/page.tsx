import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Corporate Water Damage Specialists Brisbane | Strata Insurance Liaison',
  description: 'Expert body corporate disaster recovery Brisbane. Strata water damage, multi-unit coordination, insurance liaison. Serving 150+ body corporates. Call 1300 309 361.',
  keywords: [
    "body corporate restoration services",
    "strata water damage repairs brisbane",
    "body corporate water damage",
    "strata insurance approved",
    "multi-unit water damage brisbane",
    "common property restoration"
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/commercial/body-corporate',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/commercial/body-corporate',
    },
  },
  openGraph: {
    title: 'Body Corporate Water Damage Specialists Brisbane | Strata Insurance Liaison',
    description: 'Expert body corporate disaster recovery Brisbane. Strata water damage, multi-unit coordination, insurance liaison. Serving 150+ body corporates.',
    url: 'https://disasterrecovery.com.au/commercial/body-corporate',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/commercial-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Corporate Water Damage Specialists Brisbane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Corporate Water Damage Specialists Brisbane | Strata Insurance Liaison',
    description: 'Expert body corporate disaster recovery Brisbane. Strata water damage, multi-unit coordination, insurance liaison.',
    images: ['https://disasterrecovery.com.au/images/services/commercial-restoration.jpg'],
  },
};

export default function BodyCorporatePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Body Corporate Disaster Recovery",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Disaster Recovery",
      "image": "https://disasterrecovery.com.au/images/logo.png",
      "@id": "https://disasterrecovery.com.au",
      "url": "https://disasterrecovery.com.au",
      "telephone": "1300309361",
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
        "name": "Brisbane"
      }
    },
    "description": "Specialist body corporate and strata disaster recovery services in Brisbane. Expert multi-unit coordination, insurance liaison, and common property restoration.",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disasterrecovery.com.au/commercial/body-corporate",
      "servicePhone": {
        "@type": "ContactPoint",
        "telephone": "1300309361",
        "contactType": "emergency",
        "availableLanguage": "en",
        "areaServed": "AU"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Commercial Services", url: "https://disasterrecovery.com.au/services/commercial" },
            { name: "Body Corporate", url: "https://disasterrecovery.com.au/commercial/body-corporate" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Body Corporate Disaster Recovery">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Trusted by 150+ Brisbane Body Corporates
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Body Corporate Water Damage Specialists Brisbane
                </h1>
                <p className="text-xl mb-6 text-green-100">
                  Streamline disaster recovery for your strata scheme. We handle insurance liaison, owner communication,
                  and multi-unit restoration coordination - protecting your community and common property investments.
                </p>

                {/* Key Benefits */}
                <div className="bg-green-800/50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-300 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-100">Insurance liaison included</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-300 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-100">Multi-unit coordination</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-300 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-100">Owner communications</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-300 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-100">Cost allocation guidance</span>
                    </div>
                  </div>
                </div>

                {/* Emergency CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg shadow-lg"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Emergency: 1300 309 361
                  </Link>
                  <Link
                    href="#strata-services"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-900 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                  >
                    View Strata Services
                  </Link>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Body corporate building water damage restoration Brisbane"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-6 py-4 rounded-lg shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">150+</div>
                    <div className="text-sm text-gray-600">Strata Schemes Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strata-Specific Challenges */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                We Understand Strata Complexities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Body corporate disaster recovery requires specialised knowledge of strata legislation,
                by-laws, and multi-owner dynamics. We've managed over 500 strata claims since 2011.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Challenge 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-200">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Unit Cascading Damage</h3>
                <p className="text-gray-700 mb-3">
                  Water leaks in unit-titled properties often affect multiple lots. Determining liability
                  and coordinating access across numerous owners creates complexity.
                </p>
                <p className="text-sm font-semibold text-blue-900">
                  <strong>Our Solution:</strong> We map water migration paths, document damage by lot,
                  and coordinate simultaneous access to minimise disruption.
                </p>
              </div>

              {/* Challenge 2 */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-200">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cost Allocation Complexity</h3>
                <p className="text-gray-700 mb-3">
                  Determining whether damage is common property, lot owner responsibility, or shared
                  requires detailed knowledge of body corporate legislation.
                </p>
                <p className="text-sm font-semibold text-green-900">
                  <strong>Our Solution:</strong> We provide detailed reports clearly identifying common
                  vs. private property damage, supporting accurate cost allocation.
                </p>
              </div>

              {/* Challenge 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-200">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance Claim Navigation</h3>
                <p className="text-gray-700 mb-3">
                  Strata insurance policies differ significantly from residential policies. Claims may
                  involve both body corporate and individual lot owner insurers.
                </p>
                <p className="text-sm font-semibold text-purple-900">
                  <strong>Our Solution:</strong> We liaise with all insurers simultaneously, ensuring
                  coordinated claims management and faster approvals.
                </p>
              </div>

              {/* Challenge 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 border border-orange-200">
                <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Owner Communication Management</h3>
                <p className="text-gray-700 mb-3">
                  Multiple affected owners require consistent, timely communication. Committee members
                  face increased workload during crisis situations.
                </p>
                <p className="text-sm font-semibold text-orange-900">
                  <strong>Our Solution:</strong> We handle all owner communications with templated
                  notifications, keeping committee members informed without overwhelming them.
                </p>
              </div>

              {/* Challenge 5 */}
              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-6 border border-red-200">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Access Coordination Delays</h3>
                <p className="text-gray-700 mb-3">
                  Scheduling access to multiple units, common areas, and ceiling cavities requires
                  careful coordination to prevent restoration delays.
                </p>
                <p className="text-sm font-semibold text-red-900">
                  <strong>Our Solution:</strong> Dedicated project coordinator manages all access
                  scheduling, with after-hours options to minimise owner inconvenience.
                </p>
              </div>

              {/* Challenge 6 */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 border border-indigo-200">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AGM & Committee Documentation</h3>
                <p className="text-gray-700 mb-3">
                  Body corporate committees require comprehensive documentation for AGMs, audits,
                  and regulatory compliance regarding building defects and repairs.
                </p>
                <p className="text-sm font-semibold text-indigo-900">
                  <strong>Our Solution:</strong> Detailed reports, photographs, and scope documents
                  suitable for committee minutes and regulatory submissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strata Services - Anchor */}
        <section id="strata-services" className="py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Body Corporate Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end disaster recovery designed specifically for strata schemes
              </p>
            </div>

            <div className="space-y-8">
              {/* Service 1 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Insurance Liaison Service</h3>
                        <p className="text-gray-600">Remove the administrative burden from committee members</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We handle all insurance communications on behalf of your body corporate, working directly with
                      both strata insurers and individual lot owner insurers to streamline the claims process.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Initial claim lodgement with detailed damage assessment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Coordination with loss adjusters and building consultants</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Scope negotiation and variation management</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Progress reporting and documentation submission</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Time Savings</h4>
                    <div className="text-4xl font-bold text-blue-600 mb-2">15-20hrs</div>
                    <p className="text-sm text-gray-700">
                      Average committee time saved per claim through our insurance liaison service
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Owner Communication Management</h3>
                        <p className="text-gray-600">Professional, consistent communication with all affected lot owners</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We manage all communications with affected lot owners on behalf of the body corporate,
                      ensuring consistent messaging and reducing the workload on committee members.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Standard Communications:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Initial incident notification letters</li>
                          <li>• Access requirement coordination</li>
                          <li>• Work schedule notifications</li>
                          <li>• Daily progress updates</li>
                          <li>• Completion notifications</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Additional Support:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• FAQ documents for owners</li>
                          <li>• After-hours emergency contact</li>
                          <li>• Owner feedback collection</li>
                          <li>• Complaint resolution support</li>
                          <li>• AGM documentation preparation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Owner Satisfaction</h4>
                    <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                    <p className="text-sm text-gray-700">
                      Of lot owners report being "satisfied" or "very satisfied" with our communication management
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Cost Allocation Guidance</h3>
                        <p className="text-gray-600">Clear identification of common vs. private property damage</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Understanding what's covered by body corporate insurance versus individual lot owner responsibility
                      is critical for fair cost allocation and preventing disputes.
                    </p>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
                      <h4 className="font-bold text-gray-900 mb-3">Our Documentation Includes:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Common Property Damage:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Building structure and envelope</li>
                            <li>• Common area services (pipes, wiring)</li>
                            <li>• Shared facilities and amenities</li>
                            <li>• External walls and windows</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Lot Owner Responsibility:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Internal fixtures and fittings</li>
                            <li>• Personal contents and belongings</li>
                            <li>• Lot-specific improvements</li>
                            <li>• Tenant-caused damage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Detailed lot-by-lot damage breakdown with photographic evidence</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Clear cost allocation recommendations based on body corporate legislation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Liaison with body corporate solicitors when required</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Dispute Prevention</h4>
                    <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                    <p className="text-sm text-gray-700">
                      Of our strata projects are completed with zero owner disputes over cost allocation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Property Restoration */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Common Property Restoration Specialties
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Shared Walls & Ceilings</h3>
                <p className="text-gray-700 mb-3">
                  Water damage affecting shared building elements requires access to multiple units and coordination
                  of restoration across boundaries.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ceiling cavity drying across units</li>
                  <li>• Party wall moisture management</li>
                  <li>• Coordinated paint and finish matching</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-green-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Corridor & Lobby Restoration</h3>
                <p className="text-gray-700 mb-3">
                  Common area damage affects all residents. We work to minimise access disruption while maintaining
                  building aesthetics and safety.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• After-hours drying equipment placement</li>
                  <li>• Secure barrier installation</li>
                  <li>• Matching heritage finishes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-purple-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities & Common Facilities</h3>
                <p className="text-gray-700 mb-3">
                  Gyms, pools, car parks, and shared facilities require specialised restoration techniques and
                  rapid turnaround to restore amenity value.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Commercial-grade equipment drying</li>
                  <li>• Concrete floor moisture remediation</li>
                  <li>• Pool plant room restoration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-orange-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lift Shafts & Service Ducts</h3>
                <p className="text-gray-700 mb-3">
                  Vertical service penetrations often spread water damage across multiple floors. Specialised access
                  and safety protocols required.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Confined space certified technicians</li>
                  <li>• Lift shaft water extraction</li>
                  <li>• Service duct drying systems</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-red-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Roofing & External Building Envelope</h3>
                <p className="text-gray-700 mb-3">
                  Storm damage to building exteriors affects the entire scheme. We coordinate with roofing specialists
                  and comply with building code requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Emergency building make-safe</li>
                  <li>• Weather protection installation</li>
                  <li>• Building code compliance certification</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-indigo-100 rounded-lg p-4 mb-4">
                  <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Car Park & Basement Flooding</h3>
                <p className="text-gray-700 mb-3">
                  Underground flooding requires specialised pumping equipment and coordination with residents for
                  vehicle access during restoration.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High-volume water extraction</li>
                  <li>• Concrete slab drying</li>
                  <li>• Drainage system assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Body Corporate Success Story
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-xl p-8">
              <div className="mb-6">
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
                  Case Study
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  28-Unit Residential Complex - New Farm, Brisbane
                </h3>
                <p className="text-gray-600">Three-storey walk-up apartment building, built 1995</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">The Challenge:</h4>
                  <p className="text-gray-700">
                    Burst water main on level 3 during the night caused cascading water damage affecting 14 units
                    across all three levels. Committee chairman contacted us at 2:47am after receiving multiple
                    distressed calls from owners. Body corporate insurer required immediate action to prevent
                    further damage.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Our Response:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-2">Immediate Actions (Night 1):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Emergency team on-site within 38 minutes</li>
                        <li>• Water source isolated and damage documented</li>
                        <li>• Extraction commenced across 14 affected units</li>
                        <li>• Owner notification letters delivered before 8am</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-2">Days 1-3:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Complete damage assessment by lot completed</li>
                        <li>• Insurance claim lodged with comprehensive report</li>
                        <li>• Drying equipment installed across all affected areas</li>
                        <li>• Daily SMS updates to all 28 owners</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-2">Days 4-10:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Loss adjuster site meeting coordinated</li>
                        <li>• Scope approved for all affected units</li>
                        <li>• Restoration works commenced</li>
                        <li>• After-hours work schedule to minimise disruption</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-2">Days 11-14:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• All restoration completed</li>
                        <li>• Final moisture testing and certification</li>
                        <li>• Completion reports to all owners</li>
                        <li>• AGM documentation package provided</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">The Outcome:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-100 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">14 Days</div>
                      <div className="text-sm text-gray-700">From incident to completion</div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">Zero</div>
                      <div className="text-sm text-gray-700">Owner complaints received</div>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">$127k</div>
                      <div className="text-sm text-gray-700">Total claim value managed</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Committee saved an estimated 25+ hours of administrative work through our complete insurance
                    liaison and owner communication management. Body corporate has since engaged us as their
                    preferred restoration provider with annual preventative maintenance inspections.
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <p className="text-gray-800 italic mb-3">
                    "At 3am with water pouring through three floors, I thought it would be a nightmare. Disaster
                    Recovery handled absolutely everything. They communicated with every affected owner, dealt with
                    the insurer, coordinated all the works, and had it completed in two weeks. As chairman, I barely
                    had to do anything except approve their comprehensive reports. Outstanding service."
                  </p>
                  <p className="text-sm font-semibold text-blue-900">
                    — Committee Chairman, Residential Body Corporate, New Farm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Expert Body Corporate Support
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Protect your strata scheme with Brisbane's body corporate disaster recovery specialists.
              Available 24/7 for emergency response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors text-lg shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Emergency: 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors border-2 border-green-700"
              >
                Request Information Pack
              </Link>
            </div>
            <p className="mt-6 text-green-100 text-sm">
              Serving 150+ Body Corporates | IICRC Certified | Strata Insurance Approved | Brisbane, Ipswich, Logan
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
