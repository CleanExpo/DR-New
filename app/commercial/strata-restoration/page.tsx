import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strata Restoration Brisbane | Multi-Unit Water Damage Coordination Specialists',
  description: 'Expert strata restoration Brisbane. Multi-unit coordination, common property repairs, owner liaison. Serving 200+ strata complexes. Call 1300 309 361.',
  keywords: [
    "strata restoration brisbane",
    "multi-unit water damage coordination",
    "strata water damage brisbane",
    "common property restoration",
    "strata scheme repairs",
    "multi-unit restoration coordination"
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/commercial/strata-restoration',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/commercial/strata-restoration',
    },
  },
  openGraph: {
    title: 'Strata Restoration Brisbane | Multi-Unit Water Damage Coordination Specialists',
    description: 'Expert strata restoration Brisbane. Multi-unit coordination, common property repairs, owner liaison. Serving 200+ strata complexes.',
    url: 'https://disasterrecovery.com.au/commercial/strata-restoration',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/commercial-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Strata Restoration Brisbane Multi-Unit Coordination',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strata Restoration Brisbane | Multi-Unit Water Damage Coordination Specialists',
    description: 'Expert strata restoration Brisbane. Multi-unit coordination, common property repairs, owner liaison.',
    images: ['https://disasterrecovery.com.au/images/services/commercial-restoration.jpg'],
  },
};

export default function StrataRestorationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Strata Restoration and Multi-Unit Coordination",
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
    "description": "Specialist strata restoration services for multi-unit properties in Brisbane. Expert coordination across multiple lots, common property restoration, and owner communication management.",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disasterrecovery.com.au/commercial/strata-restoration",
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
            { name: "Strata Restoration", url: "https://disasterrecovery.com.au/commercial/strata-restoration" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Strata Restoration Services">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  200+ Strata Complexes Successfully Restored
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Strata Restoration Brisbane: Multi-Unit Coordination Specialists
                </h1>
                <p className="text-xl mb-6 text-teal-100">
                  Master the complexity of multi-unit restoration. From high-rise apartments to townhouse complexes,
                  we coordinate seamless restoration across multiple lots while protecting common property investments.
                </p>

                {/* Complexity Indicators */}
                <div className="bg-teal-800/50 rounded-lg p-6 mb-8">
                  <p className="font-semibold text-teal-200 mb-3">Multi-Unit Challenges We Handle:</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-teal-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-teal-100">Cascading damage across floors</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-teal-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-teal-100">Multiple owner access coordination</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-teal-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-teal-100">Common vs. private property disputes</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-teal-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-teal-100">Shared building element restoration</span>
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
                    href="#coordination-process"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-900 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    View Coordination Process
                  </Link>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Strata restoration multi-unit coordination Brisbane"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-6 py-4 rounded-lg shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600">98.4%</div>
                    <div className="text-sm text-gray-600">Owner Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Unit Coordination Process - Anchor */}
        <section id="coordination-process" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Multi-Unit Coordination Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Systematic approach to managing complex strata restoration projects affecting multiple units
              </p>
            </div>

            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Phase 1: Emergency Response & Initial Assessment (0-4 hours)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">Immediate Actions:</p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">0-30min:</span>
                            <span>Emergency team mobilised, committee chairman contacted</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">30-60min:</span>
                            <span>On-site assessment, water source isolated, make-safe procedures</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">1-2hrs:</span>
                            <span>Water extraction commences, affected areas documented</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">2-4hrs:</span>
                            <span>All affected units identified, emergency drying equipment deployed</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">Deliverables:</p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>✓ Initial incident report to committee</li>
                          <li>✓ Preliminary list of affected units</li>
                          <li>✓ Emergency access coordination plan</li>
                          <li>✓ Photographic evidence of all affected areas</li>
                          <li>✓ Owner notification letters drafted</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-gradient-to-r from-green-50 to-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Phase 2: Comprehensive Mapping & Owner Engagement (Days 1-3)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">Mapping Activities:</p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Water migration path tracing across all affected areas</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Moisture mapping by unit with thermal imaging</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Common property vs. private property damage identification</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Hidden damage detection in walls, ceilings, and floor cavities</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Coordinated access schedule across all affected units</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-3">Owner Communication:</p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Formal written notification to all affected owners</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Individual unit inspection appointments scheduled</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>FAQ document provided addressing common concerns</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Direct contact details for project coordinator provided</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Tenant rights and insurance advice documents</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 bg-green-100 border border-green-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-green-900">
                        <strong>Key Deliverable:</strong> Comprehensive lot-by-lot damage assessment report with clear
                        identification of common property vs. private property damage, including cost allocation recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Phase 3: Insurance Coordination & Scope Approval (Days 3-7)
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Navigate the complexity of multiple insurance claims across body corporate and individual lot owner policies.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-6 border border-purple-200">
                          <h4 className="font-bold text-gray-900 mb-3">Body Corporate Insurance:</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Claim lodgement for common property damage</li>
                            <li>• Loss adjuster site meeting coordination</li>
                            <li>• Scope documentation for shared elements</li>
                            <li>• Progress reporting and variation management</li>
                          </ul>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-purple-200">
                          <h4 className="font-bold text-gray-900 mb-3">Individual Lot Owner Insurance:</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Support for owners in lodging their claims</li>
                            <li>• Individual assessor coordination</li>
                            <li>• Scope alignment across multiple insurers</li>
                            <li>• Timeline synchronisation for efficient works</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-6">
                        <h4 className="font-bold text-gray-900 mb-3">Our Insurance Liaison Advantage:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                          <ul className="space-y-2">
                            <li>✓ Single point of contact for all insurers</li>
                            <li>✓ Coordinated assessor site visits</li>
                            <li>✓ Standardised documentation across claims</li>
                          </ul>
                          <ul className="space-y-2">
                            <li>✓ Faster approval through insurer relationships</li>
                            <li>✓ Reduced owner administrative burden</li>
                            <li>✓ Aligned scopes for simultaneous works</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="bg-gradient-to-r from-orange-50 to-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange-600 text-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Phase 4: Coordinated Restoration Execution (Days 7-21)
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        Systematic restoration approach minimises disruption while ensuring quality outcomes across all affected areas.
                      </p>
                      <div className="bg-white rounded-lg p-6 border border-orange-200">
                        <h4 className="font-bold text-gray-900 mb-4">Multi-Unit Work Sequencing:</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold text-orange-900 mb-2">Week 1: Structural Drying & Demolition</p>
                            <ul className="text-sm text-gray-700 ml-6 space-y-1">
                              <li>• Continued moisture monitoring across all units</li>
                              <li>• Remove damaged materials (plasterboard, insulation, flooring)</li>
                              <li>• Ensure all areas reach acceptable moisture levels</li>
                              <li>• Coordinate skip bin access and waste removal</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-orange-900 mb-2">Week 2: Rebuild & Restoration</p>
                            <ul className="text-sm text-gray-700 ml-6 space-y-1">
                              <li>• Rebuild plasterboard in all units simultaneously</li>
                              <li>• Coordinate trades (plumber, electrician, plasterer)</li>
                              <li>• Ensure consistent finish quality across units</li>
                              <li>• Conduct mid-project owner update meetings</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-orange-900 mb-2">Week 3: Finishing & Handover</p>
                            <ul className="text-sm text-gray-700 ml-6 space-y-1">
                              <li>• Paint and final finishes applied</li>
                              <li>• Individual unit inspections with owners</li>
                              <li>• Defect rectification completed</li>
                              <li>• Final documentation and certification provided</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-orange-100 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">4-6 Techs</div>
                          <div className="text-xs text-gray-700">Simultaneous deployment</div>
                        </div>
                        <div className="bg-orange-100 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">40% Faster</div>
                          <div className="text-xs text-gray-700">vs. sequential approach</div>
                        </div>
                        <div className="bg-orange-100 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">Daily Updates</div>
                          <div className="text-xs text-gray-700">To all stakeholders</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="bg-gradient-to-r from-red-50 to-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">5</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Phase 5: Completion, Documentation & Handover (Days 21-28)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Individual Unit Handover:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Scheduled walkthrough with each owner</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Defect identification and rectification</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Unit-specific completion certificate</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Final moisture readings documented</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Warranty information provided</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Body Corporate Documentation:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Comprehensive project completion report</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Final cost reconciliation by lot/common</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Building code compliance certificates</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>AGM documentation package</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Lessons learned & prevention recommendations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Strata Challenges */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Common Strata Challenges We Solve
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  "Water damage affecting 8 units - who pays for what?"
                </h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="font-semibold text-blue-900">The Problem:</p>
                  <p>
                    Pipe burst in ceiling cavity spreads water across multiple levels. Committee unclear on common
                    vs. private property responsibility. Owners receiving conflicting advice.
                  </p>
                  <p className="font-semibold text-blue-900">Our Solution:</p>
                  <ul className="space-y-1 ml-6">
                    <li>• Detailed lot-by-lot damage assessment</li>
                    <li>• Clear identification of common property (structure, services)</li>
                    <li>• Private property items documented (fixtures, contents)</li>
                    <li>• Cost allocation report based on strata legislation</li>
                    <li>• Single coordinated claim to body corporate insurer</li>
                  </ul>
                  <div className="bg-blue-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-blue-900">
                      Result: Zero disputes, all owners satisfied with allocation, 100% insurance approval
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  "Can't coordinate access to 12 units for ceiling repairs"
                </h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="font-semibold text-green-900">The Problem:</p>
                  <p>
                    Committee struggling to arrange access across 12 owner-occupied and tenanted units. Some owners
                    interstate, some tenants working full-time. Restoration delayed 3 weeks.
                  </p>
                  <p className="font-semibold text-green-900">Our Solution:</p>
                  <ul className="space-y-1 ml-6">
                    <li>• Dedicated project coordinator handles all access</li>
                    <li>• Flexible scheduling including evenings/weekends</li>
                    <li>• Direct communication with each owner/tenant</li>
                    <li>• Building manager liaison for master key access</li>
                    <li>• Simultaneous works where multiple units grant access</li>
                  </ul>
                  <div className="bg-green-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-green-900">
                      Result: All access arranged within 5 days, works completed 60% faster than estimated
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  "Different insurers for body corporate and lot owners causing delays"
                </h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="font-semibold text-purple-900">The Problem:</p>
                  <p>
                    Body corporate insurer approves common property works, but 4 different lot owner insurers each
                    requiring separate assessments. Restoration fragmented, timeline unpredictable.
                  </p>
                  <p className="font-semibold text-purple-900">Our Solution:</p>
                  <ul className="space-y-1 ml-6">
                    <li>• Single comprehensive scope prepared for all insurers</li>
                    <li>• Coordinated assessor site visits on same day</li>
                    <li>• Standardised documentation across all claims</li>
                    <li>• Timeline synchronisation for simultaneous works</li>
                    <li>• Direct liaison with all insurers as single point of contact</li>
                  </ul>
                  <div className="bg-purple-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-purple-900">
                      Result: All claims approved within same week, coordinated works completed in 14 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge 4 */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  "Committee overwhelmed with owner complaints and questions"
                </h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="font-semibold text-orange-900">The Problem:</p>
                  <p>
                    Committee chairman receiving 20+ calls/emails daily from concerned owners. Questions about
                    timeline, insurance, access, costs creating significant volunteer burden.
                  </p>
                  <p className="font-semibold text-orange-900">Our Solution:</p>
                  <ul className="space-y-1 ml-6">
                    <li>• Dedicated owner hotline managed by project coordinator</li>
                    <li>• Proactive communication (written, SMS, email) to all owners</li>
                    <li>• Comprehensive FAQ document addressing common concerns</li>
                    <li>• Regular progress updates reducing anxiety</li>
                    <li>• Committee only receives summary reports, not individual queries</li>
                  </ul>
                  <div className="bg-orange-50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-orange-900">
                      Result: Committee saves 15+ hours, owner satisfaction rating 96%, zero complaints to committee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Strata Property Types We Specialise In
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-200">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">High-Rise Apartments</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Vertical water damage across multiple floors</li>
                  <li>• Lift shaft and service duct access</li>
                  <li>• Common corridor restoration</li>
                  <li>• Balcony waterproofing issues</li>
                  <li>• Building management coordination</li>
                </ul>
                <div className="mt-4 text-xs text-blue-900 font-semibold">
                  Up to 200 units managed simultaneously
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border border-green-200">
                <div className="bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Townhouse Complexes</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Shared wall water penetration</li>
                  <li>• Common area amenities restoration</li>
                  <li>• Roof and gutter coordination</li>
                  <li>• External cladding repairs</li>
                  <li>• Driveway and landscaping impact</li>
                </ul>
                <div className="mt-4 text-xs text-green-900 font-semibold">
                  10-50 unit complexes our specialty
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-200">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Walk-Up Units</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Ceiling cavity damage across units</li>
                  <li>• Stairwell and common area works</li>
                  <li>• Car park flooding restoration</li>
                  <li>• Heritage building considerations</li>
                  <li>• Older building envelope challenges</li>
                </ul>
                <div className="mt-4 text-xs text-purple-900 font-semibold">
                  Experienced with 1960s-90s construction
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Multi-Unit Restoration Experts
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Simplify complex strata restoration with Brisbane's multi-unit coordination specialists.
              200+ complexes restored since 2011.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-colors text-lg shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Emergency: 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900 transition-colors border-2 border-teal-700"
              >
                Request Strata Services Information
              </Link>
            </div>
            <p className="mt-6 text-teal-100 text-sm">
              Brisbane, Ipswich, Logan | 200+ Strata Complexes | IICRC Certified | Insurance Approved
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
