import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Property Disaster Recovery Brisbane 2025 | Property Managers',
  description: 'Trusted disaster recovery partner for Brisbane property managers. 24/7 emergency response, multi-property discounts, insurance liaison. Serving 200+ properties. Call 1300 309 361.',
  keywords: [
    "commercial property water damage brisbane",
    "property manager disaster recovery",
    "strata water damage repairs brisbane",
    "multi-property restoration services",
    "property management emergency response",
    "commercial building flood damage"
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/commercial/property-managers',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/commercial/property-managers',
    },
  },
  openGraph: {
    title: 'Commercial Property Disaster Recovery Brisbane 2025 | Property Managers',
    description: 'Trusted disaster recovery partner for Brisbane property managers. 24/7 emergency response, multi-property discounts, insurance liaison. Serving 200+ properties.',
    url: 'https://disasterrecovery.com.au/commercial/property-managers',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/commercial-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial Property Disaster Recovery Brisbane 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Property Disaster Recovery Brisbane 2025 | Property Managers',
    description: 'Trusted disaster recovery partner for Brisbane property managers. 24/7 emergency response, multi-property discounts, insurance liaison.',
    images: ['https://disasterrecovery.com.au/images/services/commercial-restoration.jpg'],
  },
};

export default function PropertyManagersPage() {
  // Schema markup for service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Property Disaster Recovery",
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
      },
      "priceRange": "$$"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane"
      },
      {
        "@type": "City",
        "name": "Ipswich"
      },
      {
        "@type": "City",
        "name": "Logan"
      }
    ],
    "description": "Commercial property disaster recovery services for property managers in Brisbane. 24/7 emergency response, multi-property discount programs, insurance liaison services.",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disasterrecovery.com.au/commercial/property-managers",
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
            { name: "Property Managers", url: "https://disasterrecovery.com.au/commercial/property-managers" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Property Managers Disaster Recovery">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Trusted by 200+ Brisbane Properties
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Commercial Property Disaster Recovery Brisbane 2025
                </h1>
                <p className="text-xl mb-6 text-blue-100">
                  The preferred disaster recovery partner for property managers across Brisbane, Ipswich, and Logan.
                  Minimise tenant disruption and protect property values with our rapid response team.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 bg-blue-800/50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">200+</div>
                    <div className="text-sm text-blue-200">Properties Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">&lt;1hr</div>
                    <div className="text-sm text-blue-200">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">24/7</div>
                    <div className="text-sm text-blue-200">Availability</div>
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
                    href="#partnership-programs"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Partnership Programs
                  </Link>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Commercial property disaster recovery team working on Brisbane property"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-6 py-4 rounded-lg shadow-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold">IICRC Certified</p>
                      <p className="text-sm text-gray-600">Insurance Approved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Reasons Listicle - AI Optimised */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                5 Reasons Property Managers Choose Disaster Recovery
              </h2>
              <p className="text-xl text-gray-600">
                Why Brisbane's leading property management firms trust us with their most valuable assets
              </p>
            </div>

            <div className="space-y-8">
              {/* Reason 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-8 border-l-4 border-blue-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      24/7 Emergency Response for Tenants
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Water damage doesn't wait for business hours. Our emergency response team is available 24/7/365
                      to protect your properties and support your tenants when disaster strikes.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Average response time under 60 minutes across Brisbane metro</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Direct communication with tenants to minimise complaints</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Emergency board-up and make-safe services included</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Real-time updates to property managers via SMS and email</span>
                      </li>
                    </ul>
                    <div className="mt-4 bg-blue-100 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900">
                        <strong>2025 Data:</strong> Properties with sub-1-hour emergency response experience 65% less
                        secondary damage and 40% lower insurance claims.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason 2 */}
              <div className="bg-gradient-to-r from-green-50 to-white rounded-lg p-8 border-l-4 border-green-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Multi-Property Discount Programs
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Manage multiple properties? We recognise the value of partnership with volume-based pricing
                      structures that deliver genuine savings while maintaining premium service quality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="text-green-600 font-bold text-lg mb-1">5-10 Properties</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">10% Discount</div>
                        <div className="text-sm text-gray-600">On all restoration works</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="text-green-600 font-bold text-lg mb-1">11-25 Properties</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">15% Discount</div>
                        <div className="text-sm text-gray-600">Plus priority scheduling</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="text-green-600 font-bold text-lg mb-1">26+ Properties</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">Custom Pricing</div>
                        <div className="text-sm text-gray-600">Dedicated account manager</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Consolidated invoicing across all properties</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Quarterly portfolio reports and maintenance insights</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>No minimum call-out fees for partner properties</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reason 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg p-8 border-l-4 border-purple-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Preventative Maintenance Plans
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Stop disasters before they start. Our preventative maintenance program identifies potential
                      issues across your property portfolio before they become expensive emergency repairs.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-purple-200 mb-4">
                      <h4 className="font-bold text-gray-900 mb-3">Annual Inspection Program Includes:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Building Envelope Assessment:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Roof and gutter condition review</li>
                            <li>• External cladding integrity check</li>
                            <li>• Window and door seal inspection</li>
                            <li>• Drainage system evaluation</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Interior Risk Identification:</p>
                          <ul className="text-sm text-gray-700 space-y-1 ml-4">
                            <li>• Plumbing system assessment</li>
                            <li>• Moisture level monitoring</li>
                            <li>• HVAC system leak detection</li>
                            <li>• Fire protection systems check</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Thermal imaging to detect hidden moisture and leaks</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Detailed risk assessment reports with photographic evidence</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Priority-ranked maintenance recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Discounted rates on preventative maintenance works</span>
                      </li>
                    </ul>
                    <div className="mt-4 bg-purple-100 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-900">
                        <strong>Industry Research:</strong> Properties enrolled in preventative maintenance programs
                        experience 73% fewer emergency call-outs and save an average of $12,400 annually per property.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason 4 */}
              <div className="bg-gradient-to-r from-orange-50 to-white rounded-lg p-8 border-l-4 border-orange-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Complete Insurance Liaison Service
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Remove the administrative burden of insurance claims. We handle all communications with
                      insurers, loss adjusters, and building consultants - saving you hours of paperwork.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-orange-200 mb-4">
                      <h4 className="font-bold text-gray-900 mb-3">Our Insurance Liaison Process:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                            1
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Initial Claim Lodgement</p>
                            <p className="text-sm text-gray-700">We lodge the claim on your behalf with all required documentation</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                            2
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Assessor Coordination</p>
                            <p className="text-sm text-gray-700">Schedule and attend all assessor inspections at the property</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                            3
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Scope Negotiation</p>
                            <p className="text-sm text-gray-700">Work with loss adjusters to agree on comprehensive scope of works</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                            4
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Progress Reporting</p>
                            <p className="text-sm text-gray-700">Regular updates to insurers throughout the restoration process</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                            5
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Final Documentation</p>
                            <p className="text-sm text-gray-700">Complete certification and warranty documentation for file closure</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Preferred provider status with all major Australian insurers</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Direct billing available - no upfront costs for approved claims</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-orange-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Faster claim approvals due to established insurer relationships</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reason 5 */}
              <div className="bg-gradient-to-r from-red-50 to-white rounded-lg p-8 border-l-4 border-red-600">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Proactive Tenant Communication Management
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Protect your reputation and reduce complaints. We manage all tenant communications during
                      restoration works, keeping residents informed while you focus on property management.
                    </p>
                    <div className="bg-white rounded-lg p-6 border border-red-200 mb-4">
                      <h4 className="font-bold text-gray-900 mb-3">Communication Support Includes:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Initial incident notification letters</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Work schedule notifications</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Access requirement coordination</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Daily progress updates</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Completion notifications</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Tenant feedback collection</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">After-hours emergency contact</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            <span className="text-sm text-gray-700">Complaint resolution support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>All communications co-branded with your agency details</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Professional, courteous technicians with tenant interaction training</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Copies of all tenant communications provided to property managers</span>
                      </li>
                    </ul>
                    <div className="mt-4 bg-red-100 border border-red-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-red-900">
                        <strong>Client Feedback:</strong> 94% of property managers report reduced tenant complaints
                        and improved satisfaction ratings when using our communication management service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Programs - Anchor Section */}
        <section id="partnership-programs" className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preferred Partner Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join 200+ properties across Brisbane already benefiting from our partnership approach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Bronze Tier */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-orange-300">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold mb-2">
                    BRONZE PARTNER
                  </div>
                  <div className="text-gray-600 text-sm">5-10 Properties</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">10% discount on all works</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Priority emergency response</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Consolidated invoicing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Quarterly reports</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>

              {/* Silver Tier */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-400 transform scale-105">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded-full font-bold mb-2">
                    SILVER PARTNER
                  </div>
                  <div className="text-gray-600 text-sm">11-25 Properties</div>
                  <div className="mt-2 text-blue-600 font-semibold text-sm">Most Popular</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>15% discount</strong> on all works</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">All Bronze benefits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Annual maintenance inspection</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Priority scheduling</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>

              {/* Gold Tier */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-yellow-400">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-bold mb-2">
                    GOLD PARTNER
                  </div>
                  <div className="text-gray-600 text-sm">26+ Properties</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Custom pricing</strong> structure</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">All Silver benefits</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Senior account manager</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Bi-annual inspections</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Custom SLA agreements</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Property Manager Success Stories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Brisbane CBD Office Complex</h3>
                    <p className="text-sm text-gray-600">32-Unit Commercial Building</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Challenge:</strong> Major water main break affecting 8 tenanted office suites during business hours.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Solution:</strong> Deployed 4-person emergency response team within 45 minutes. Coordinated with
                  building management to establish drying schedule around tenant operations. Managed all tenant communications.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Result:</strong> Zero business interruption for 6 out of 8 affected tenants. Complete restoration
                  in 72 hours. Property manager received commendations from all affected tenants.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 italic">
                    "Their ability to work around our tenants' schedules while maintaining restoration timelines was
                    exceptional. We've since made them our preferred provider for all 47 properties in our portfolio."
                  </p>
                  <p className="text-xs text-blue-700 mt-2">— Portfolio Manager, Major Brisbane Property Group</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Multi-Residential Portfolio</h3>
                    <p className="text-sm text-gray-600">18-Property Investment Portfolio</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Challenge:</strong> Storm damage across multiple properties during severe weather event.
                  Property manager overwhelmed with simultaneous emergency call-outs.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Solution:</strong> Activated Gold Partner emergency protocol. Deployed teams to all affected
                  properties within 2 hours. Established centralised communication hub for property manager. Coordinated
                  insurance assessments across entire portfolio.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Result:</strong> All properties secured and drying equipment operational within 4 hours.
                  Single consolidated insurance claim lodged. Total restoration completed within 10 days across all properties.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-900 italic">
                    "During our worst crisis, Disaster Recovery handled everything. One phone call mobilised their
                    entire team. Their preventative maintenance program has since identified issues in 12 other properties,
                    saving us from future disasters."
                  </p>
                  <p className="text-xs text-green-700 mt-2">— Director, Boutique Property Management Agency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* After-Hours Contact Protocols */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              After-Hours Emergency Contact Protocols
            </h2>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8 border-2 border-red-200 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">24/7 Direct Emergency Line</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Property managers and their tenants receive direct access to our emergency response team -
                    not a call centre, not an answering service.
                  </p>
                  <div className="bg-white rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Property Manager Line:</h4>
                        <div className="text-3xl font-bold text-red-600 mb-2">1300 309 361</div>
                        <p className="text-sm text-gray-600">Direct to duty manager</p>
                        <p className="text-sm text-gray-600">Average answer time: 18 seconds</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Partner Properties:</h4>
                        <p className="text-sm text-gray-700 mb-2">Dedicated emergency SMS line</p>
                        <p className="text-sm text-gray-700 mb-2">Direct mobile numbers provided</p>
                        <p className="text-sm text-gray-700">Automated alert system available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">What Happens When You Call:</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700">Duty manager answers within 30 seconds</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700">Emergency assessment and priority triage</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700">Response team dispatched immediately</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700">SMS confirmation with ETA sent to you</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      5
                    </div>
                    <p className="text-gray-700">On-site team leader calls upon arrival</p>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Partner Communication Options:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-700">Direct phone line to account manager</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-700">Priority email response (2-hour SLA)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    </svg>
                    <span className="text-gray-700">SMS alert system for job updates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Online portal for job tracking (coming 2025)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Become a Partner?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 200+ properties already experiencing faster response, better outcomes, and reduced costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors border-2 border-blue-700"
              >
                Request Partnership Information
              </Link>
            </div>
            <p className="mt-6 text-blue-100 text-sm">
              Servicing Brisbane, Ipswich, Logan, Gold Coast & Sunshine Coast | IICRC Certified | Insurance Approved
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
