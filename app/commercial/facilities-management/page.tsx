import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities Manager Disaster Recovery Partner 2025 | SLA Agreements Brisbane',
  description: 'Preferred vendor disaster recovery for facilities managers. SLA agreements, preventative inspections, 24/7 priority response. Serving 85+ FM portfolios. Call 1300 309 361.',
  keywords: [
    "facilities management disaster recovery",
    "FM disaster recovery brisbane",
    "preferred vendor agreements",
    "facilities manager water damage",
    "SLA disaster recovery services",
    "preventative maintenance inspections"
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/commercial/facilities-management',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/commercial/facilities-management',
    },
  },
  openGraph: {
    title: 'Facilities Manager Disaster Recovery Partner 2025 | SLA Agreements Brisbane',
    description: 'Preferred vendor disaster recovery for facilities managers. SLA agreements, preventative inspections, 24/7 priority response.',
    url: 'https://disasterrecovery.com.au/commercial/facilities-management',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/commercial-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Facilities Manager Disaster Recovery Partner Brisbane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facilities Manager Disaster Recovery Partner 2025 | SLA Agreements Brisbane',
    description: 'Preferred vendor disaster recovery for facilities managers. SLA agreements, preventative inspections, 24/7 priority response.',
    images: ['https://disasterrecovery.com.au/images/services/commercial-restoration.jpg'],
  },
};

export default function FacilitiesManagementPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Facilities Management Disaster Recovery",
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
    "description": "Preferred vendor disaster recovery services for facilities managers. SLA agreements, preventative maintenance, and 24/7 emergency response across Brisbane commercial properties.",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disasterrecovery.com.au/commercial/facilities-management",
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
            { name: "Facilities Management", url: "https://disasterrecovery.com.au/commercial/facilities-management" }
          ]
        }}
      />

      <Header />
      <main id="main-content" role="main" aria-label="Facilities Management Disaster Recovery">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Trusted by 85+ Brisbane Facilities Management Teams
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Facilities Manager Disaster Recovery Partner 2025
                </h1>
                <p className="text-xl mb-6 text-indigo-100">
                  Become a preferred vendor partner. Streamline emergency response, reduce operational risk,
                  and deliver measurable value to your clients with SLA-backed disaster recovery services.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 bg-indigo-800/50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">45min</div>
                    <div className="text-sm text-indigo-200">Average Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">99.2%</div>
                    <div className="text-sm text-indigo-200">SLA Compliance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">24/7</div>
                    <div className="text-sm text-indigo-200">Direct Access</div>
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
                    href="#sla-options"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    View SLA Options
                  </Link>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Facilities management disaster recovery services Brisbane"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-6 py-4 rounded-lg shadow-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold">Preferred Vendor</p>
                      <p className="text-sm text-gray-600">Status Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preferred Vendor Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preferred Vendor Partnership Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Streamline operations and reduce risk with a dedicated disaster recovery partner integrated
                into your facilities management framework
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Response Times</h3>
                <p className="text-gray-700 mb-3">
                  SLA-backed response guarantees ensure your clients receive immediate attention during emergencies.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Standard: 60-minute response commitment</li>
                  <li>• Priority: 30-minute response for critical assets</li>
                  <li>• SMS confirmation within 5 minutes of call</li>
                  <li>• Financial penalties if SLA breached</li>
                </ul>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preferential Pricing Structure</h3>
                <p className="text-gray-700 mb-3">
                  Volume-based pricing delivers genuine cost savings you can pass to your clients.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 12-18% discount on standard rates</li>
                  <li>• Fixed pricing for 12 months (CPI indexed)</li>
                  <li>• No surge pricing during emergencies</li>
                  <li>• Transparent, itemised invoicing</li>
                </ul>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Reporting & Documentation</h3>
                <p className="text-gray-700 mb-3">
                  Comprehensive documentation supports your client reporting and compliance requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time job tracking via online portal</li>
                  <li>• Automated monthly performance reports</li>
                  <li>• Photographic evidence and progress updates</li>
                  <li>• Compliance certification and warranties</li>
                </ul>
              </div>

              {/* Benefit 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <div className="bg-orange-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Account Management</h3>
                <p className="text-gray-700 mb-3">
                  A single point of contact who understands your portfolio and client requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Direct mobile access to senior manager</li>
                  <li>• Quarterly portfolio review meetings</li>
                  <li>• Custom service procedures for each site</li>
                  <li>• Proactive risk identification and reporting</li>
                </ul>
              </div>

              {/* Benefit 5 */}
              <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-6 border-2 border-red-200 hover:shadow-lg transition-shadow">
                <div className="bg-red-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preventative Inspection Service</h3>
                <p className="text-gray-700 mb-3">
                  Identify potential issues before they become expensive emergencies.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Scheduled preventative inspections</li>
                  <li>• Thermal imaging moisture detection</li>
                  <li>• Risk assessment reports with priorities</li>
                  <li>• Maintenance recommendations</li>
                </ul>
              </div>

              {/* Benefit 6 */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 border-2 border-indigo-200 hover:shadow-lg transition-shadow">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling Options</h3>
                <p className="text-gray-700 mb-3">
                  Work around tenant schedules and operational requirements to minimise disruption.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• After-hours and weekend work available</li>
                  <li>• Staged restoration to maintain operations</li>
                  <li>• Coordinated access with security/tenants</li>
                  <li>• Expedited works for critical infrastructure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SLA Options - Anchor */}
        <section id="sla-options" className="py-16 bg-gradient-to-br from-indigo-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Service Level Agreement Options
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Customisable SLA packages designed to meet your specific operational requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Bronze SLA */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-300">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                    STANDARD SLA
                  </div>
                  <div className="text-gray-600 mb-4">Entry-level partnership</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">12%</div>
                  <div className="text-sm text-gray-600">Discount on all works</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Response Times:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Emergency: 90 minutes</li>
                      <li>• Urgent: 4 hours</li>
                      <li>• Standard: 24 hours</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Includes:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ 24/7 emergency line</li>
                      <li>✓ Standard account management</li>
                      <li>✓ Monthly summary reports</li>
                      <li>✓ Online job tracking</li>
                      <li>✓ Consolidated invoicing</li>
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Request Standard SLA
                </Link>
              </div>

              {/* Silver SLA */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-indigo-400 transform scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">RECOMMENDED</span>
                </div>
                <div className="text-center mb-6">
                  <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                    PRIORITY SLA
                  </div>
                  <div className="text-gray-600 mb-4">Enhanced partnership</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">15%</div>
                  <div className="text-sm text-gray-600">Discount on all works</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Response Times:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Emergency: <strong>60 minutes</strong></li>
                      <li>• Urgent: <strong>2 hours</strong></li>
                      <li>• Standard: <strong>12 hours</strong></li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Everything in Standard, plus:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Dedicated account manager</li>
                      <li>✓ Quarterly portfolio reviews</li>
                      <li>✓ Annual preventative inspections</li>
                      <li>✓ Priority scheduling</li>
                      <li>✓ After-hours coordination</li>
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Request Priority SLA
                </Link>
              </div>

              {/* Gold SLA */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-yellow-400">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                    ENTERPRISE SLA
                  </div>
                  <div className="text-gray-600 mb-4">Premium partnership</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">18%</div>
                  <div className="text-sm text-gray-600">Discount + custom pricing</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Response Times:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Emergency: <strong>30 minutes</strong></li>
                      <li>• Urgent: <strong>1 hour</strong></li>
                      <li>• Standard: <strong>4 hours</strong></li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Everything in Priority, plus:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Senior account executive</li>
                      <li>✓ Bi-annual inspections</li>
                      <li>✓ Custom SLA terms</li>
                      <li>✓ Dedicated response team</li>
                      <li>✓ Performance guarantees</li>
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Request Enterprise SLA
                </Link>
              </div>
            </div>

            {/* SLA Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Service Feature</th>
                      <th className="px-6 py-4 text-center">Standard</th>
                      <th className="px-6 py-4 text-center">Priority</th>
                      <th className="px-6 py-4 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Emergency Response Time</td>
                      <td className="px-6 py-4 text-center text-gray-600">90 min</td>
                      <td className="px-6 py-4 text-center text-gray-600">60 min</td>
                      <td className="px-6 py-4 text-center font-semibold text-indigo-600">30 min</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Discount Level</td>
                      <td className="px-6 py-4 text-center text-gray-600">12%</td>
                      <td className="px-6 py-4 text-center text-gray-600">15%</td>
                      <td className="px-6 py-4 text-center font-semibold text-indigo-600">18%+</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Account Manager</td>
                      <td className="px-6 py-4 text-center text-gray-600">Shared</td>
                      <td className="px-6 py-4 text-center text-gray-600">Dedicated</td>
                      <td className="px-6 py-4 text-center font-semibold text-indigo-600">Senior Executive</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Preventative Inspections</td>
                      <td className="px-6 py-4 text-center text-gray-600">—</td>
                      <td className="px-6 py-4 text-center text-gray-600">Annual</td>
                      <td className="px-6 py-4 text-center font-semibold text-indigo-600">Bi-annual</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Portfolio Reviews</td>
                      <td className="px-6 py-4 text-center text-gray-600">—</td>
                      <td className="px-6 py-4 text-center text-gray-600">Quarterly</td>
                      <td className="px-6 py-4 text-center font-semibold text-indigo-600">Monthly</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Online Job Tracking</td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">After-hours Coordination</td>
                      <td className="px-6 py-4 text-center text-gray-400">—</td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Performance Guarantees</td>
                      <td className="px-6 py-4 text-center text-gray-400">—</td>
                      <td className="px-6 py-4 text-center text-gray-400">—</td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Preventative Inspection Services */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Preventative Inspection Services
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Identify Risks Before They Become Disasters
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our preventative inspection program uses advanced technology to detect potential water damage,
                  moisture intrusion, and building envelope failures before they result in costly emergency repairs.
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <p className="font-semibold text-blue-900 mb-2">2025 Industry Data:</p>
                  <p className="text-gray-700 text-sm">
                    Properties with annual preventative inspections experience 68% fewer emergency call-outs
                    and average cost savings of $18,500 per property annually through early issue identification.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/hero/commercial-restoration-services.jpg"
                  alt="Preventative inspection services Brisbane facilities management"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-8 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inspection Methodology</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Visual Assessment</p>
                      <p className="text-sm text-gray-600">Comprehensive building envelope inspection identifying visible defects and potential entry points</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Thermal Imaging</p>
                      <p className="text-sm text-gray-600">FLIR thermal cameras detect hidden moisture, insulation defects, and temperature anomalies</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Moisture Mapping</p>
                      <p className="text-sm text-gray-600">Non-invasive moisture meters identify areas of elevated moisture content requiring investigation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Detailed Reporting</p>
                      <p className="text-sm text-gray-600">Comprehensive report with photographic evidence, risk ratings, and prioritised maintenance recommendations</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Areas Inspected</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm">External:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Roof & gutters</li>
                      <li>• External cladding</li>
                      <li>• Windows & doors</li>
                      <li>• Balconies & decks</li>
                      <li>• Drainage systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2 text-sm">Internal:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ceiling cavities</li>
                      <li>• Plumbing fixtures</li>
                      <li>• HVAC systems</li>
                      <li>• Wet areas & bathrooms</li>
                      <li>• Basement & car parks</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-900">Deliverable:</strong> Detailed PDF report with thermal images,
                    moisture readings, risk matrix, and costed maintenance recommendations within 5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration & Systems */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Seamless Integration with Your Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">CMMS Integration</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Direct integration with major CMMS platforms including Maximo, Corrigo, Service Channel, and MRI.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Automated work order creation</li>
                  <li>• Real-time status updates</li>
                  <li>• Digital invoicing integration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-green-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Online Portal Access</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Custom-branded client portal for your facilities management team and property clients.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Real-time job tracking dashboard</li>
                  <li>• Document repository</li>
                  <li>• Historical job data & reporting</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-purple-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Reporting & Analytics</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Customisable reporting dashboard with KPIs, trends analysis, and performance metrics.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Monthly performance dashboards</li>
                  <li>• Cost trend analysis</li>
                  <li>• SLA compliance reporting</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Communication Protocols
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Emergency Escalation:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">5min</span>
                      <p className="text-sm text-gray-700">SMS confirmation to FM and duty manager upon call receipt</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">15min</span>
                      <p className="text-sm text-gray-700">Phone call to FM with ETA and initial assessment</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-3">60min</span>
                      <p className="text-sm text-gray-700">On-site team leader report with damage scope and action plan</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Standard Job Updates:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Daily progress emails with photo documentation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automated alerts for scope variations or delays</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Completion notifications with final documentation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Quarterly business reviews with account manager</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Preferred Vendor Partner
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join 85+ facilities management teams already benefiting from guaranteed response times,
              preferential pricing, and comprehensive SLA protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors text-lg shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-900 transition-colors border-2 border-indigo-700"
              >
                Request SLA Documentation
              </Link>
            </div>
            <p className="mt-6 text-indigo-100 text-sm">
              Brisbane Metro | IICRC Certified | Insurance Approved | ISO 9001 Quality Management
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
