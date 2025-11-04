import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, MapPin, CheckCircle, ArrowRight, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24/7 Emergency Service | IICRC Certified',
  description: 'Professional water damage restoration in Brisbane. Emergency response within 1 hour. Serving New Farm, Teneriffe, CBD, South Bank. Insurance direct billing. Call 1300 309 361',
  keywords: 'water damage restoration Brisbane, emergency water extraction Brisbane, flood damage repair Brisbane, mould remediation Brisbane, fire damage restoration Brisbane',
  openGraph: {
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency Service',
    description: 'Professional water damage restoration in Brisbane. Emergency response within 1 hour. IICRC certified technicians.',
    url: 'https://dr-new-ten.vercel.app/brisbane',
    siteName: 'Disaster Recovery',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/brisbane-water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Water damage restoration equipment in Brisbane home',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brisbane',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://dr-new-ten.vercel.app/brisbane',
  name: 'Disaster Recovery Brisbane',
  image: 'https://dr-new-ten.vercel.app/logos/3D Disaster Recovery Logo Image.png',
  telephone: '1300309361',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4/17 Tile St',
    addressLocality: 'Wacol',
    addressRegion: 'QLD',
    postalCode: '4076',
    addressCountry: 'AU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.4698,
    longitude: 153.0251
  },
  url: 'https://dr-new-ten.vercel.app/brisbane',
  sameAs: [
    'https://www.facebook.com/DisasterRecoveryBrisbane',
    'https://www.google.com/maps/place/Disaster+Recovery+Brisbane'
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ],
    opens: '00:00',
    closes: '23:59'
  },
  areaServed: [
    'Brisbane CBD', 'New Farm', 'Teneriffe', 'Fortitude Valley', 'South Brisbane',
    'West End', 'St Lucia', 'Toowong', 'Milton', 'Breakfast Creek', 'Hamilton',
    'Bulimba', 'Kangaroo Point', 'Woolloongabba', 'Spring Hill'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Brisbane Water Damage Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Emergency Water Extraction Brisbane',
          description: '24/7 emergency water extraction and removal services across Brisbane'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flood Damage Restoration Brisbane',
          description: 'Complete flood damage restoration for Brisbane homes and businesses'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mould Remediation Brisbane',
          description: 'Professional mould removal and remediation services in Brisbane'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '247'
  }
};

const emergencySteps = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Emergency Water Damage Response in Brisbane',
  description: 'Critical steps to take immediately after discovering water damage in your Brisbane property',
  totalTime: 'PT30M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Ensure Safety First',
      text: 'Turn off electricity to affected areas if safe to do so. Do not enter standing water if electrical outlets may be submerged.',
    },
    {
      '@type': 'HowToStep',
      name: 'Stop Water Source',
      text: 'Locate and turn off the main water valve if the damage is from a burst pipe or plumbing failure.',
    },
    {
      '@type': 'HowToStep',
      name: 'Call Emergency Services',
      text: 'Contact Disaster Recovery Brisbane immediately at 1300 309 361 for 24/7 emergency response.',
    },
    {
      '@type': 'HowToStep',
      name: 'Document for Insurance',
      text: 'Take photos and videos of all damage while ensuring your safety. This documentation is crucial for insurance claims.',
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you respond to water damage in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide emergency response within 1 hour across Brisbane, including CBD, New Farm, South Bank, and surrounding suburbs. Our 24/7 service ensures immediate assistance when you need it most.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which areas of Brisbane do you service for water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We service all Brisbane suburbs including CBD, New Farm, Teneriffe, Fortitude Valley, South Brisbane, West End, St Lucia, Toowong, Milton, Hamilton, and surrounding areas. No job is too big or small.'
      }
    },
    {
      '@type': 'Question',
      name: 'Will my insurance cover water damage restoration in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most insurance policies cover sudden water damage like burst pipes. We work directly with all major insurers and can provide direct billing. Flood damage may require separate flood insurance coverage.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary based on damage extent, affected area size, and restoration complexity. We provide free assessments and work with insurance companies for direct billing. Emergency mitigation typically starts within your insurance excess.'
      }
    }
  ]
};

export default function BrisbanePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencySteps) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Water Damage Restoration
                  <span className="block text-yellow-400">Brisbane</span>
                </h1>
                <p className="text-xl mb-8 leading-relaxed">
                  Brisbane's trusted IICRC certified water damage restoration specialists.
                  Emergency response within 1 hour to New Farm, CBD, South Bank and all Brisbane suburbs.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-yellow-400" />
                    <span>24/7 Emergency Response</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-yellow-400" />
                    <span>IICRC Certified Technicians</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-yellow-400" />
                    <span>Insurance Direct Billing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-6 w-6 text-yellow-400" />
                    <span>4.9/5 Customer Rating</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    CALL NOW: 1300 309 361
                  </Link>
                  <Link
                    href="/emergency"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold rounded-lg transition-colors"
                  >
                    Emergency Steps
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="lg:text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">Emergency Response</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>1 Hour Response Time Brisbane-wide</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>24/7 Emergency Hotline</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Free Damage Assessment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Insurance Claim Assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brisbane Service Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive water damage restoration services across all Brisbane suburbs,
                from the CBD to the suburbs, with specialized expertise in flood-prone areas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Premium Areas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Premium Residential</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• New Farm</li>
                  <li>• Teneriffe</li>
                  <li>• Hamilton</li>
                  <li>• Ascot</li>
                  <li>• Paddington</li>
                </ul>
                <Link
                  href="/brisbane/new-farm"
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                >
                  New Farm Services <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Business Districts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Business Districts</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Brisbane CBD</li>
                  <li>• Fortitude Valley</li>
                  <li>• South Brisbane</li>
                  <li>• Milton</li>
                  <li>• Spring Hill</li>
                </ul>
                <Link
                  href="/services/commercial-restoration"
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                >
                  Commercial Services <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Flood-Prone Areas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Flood Risk Areas</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• St Lucia</li>
                  <li>• Toowong</li>
                  <li>• West End</li>
                  <li>• Bulimba</li>
                  <li>• Breakfast Creek</li>
                </ul>
                <Link
                  href="/brisbane/flood-risk-areas"
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
                >
                  Flood Expertise <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Water Damage Services Brisbane
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete water damage restoration services from emergency extraction to full reconstruction,
                tailored to Brisbane's unique climate and building requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Emergency Water Extraction</h3>
                <p className="text-gray-600 mb-4">
                  Rapid water removal using truck-mounted extraction units.
                  Critical first response within 1 hour across Brisbane.
                </p>
                <Link
                  href="/services/emergency-water-extraction"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Flood Damage Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Specialized flood restoration for Brisbane River areas.
                  Category 1-3 water damage expertise.
                </p>
                <Link
                  href="/services/flood-damage-repair"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Structural Drying</h3>
                <p className="text-gray-600 mb-4">
                  Advanced dehumidification and air movement systems.
                  Moisture monitoring to prevent secondary damage.
                </p>
                <Link
                  href="/services/structural-drying"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Mould Remediation</h3>
                <p className="text-gray-600 mb-4">
                  Complete mould removal and prevention.
                  Essential in Brisbane's humid subtropical climate.
                </p>
                <Link
                  href="/services/mould-remediation"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Insurance Claims</h3>
                <p className="text-gray-600 mb-4">
                  Direct billing with all major insurers.
                  Claims advocacy and documentation assistance.
                </p>
                <Link
                  href="/insurance"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Contents Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Furniture, electronics, and personal belongings restoration.
                  Specialized cleaning and decontamination.
                </p>
                <Link
                  href="/services/contents-restoration"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Coverage - NEW SECTION 1 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Brisbane's Trusted Disaster Recovery Team
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Operating from our Wacol headquarters, we provide complete disaster recovery Brisbane services across the entire Greater Brisbane metro area. Our service coverage extends from the northern suburbs of Chermside and Albany Creek, south to Logan and Browns Plains, east to the bayside communities of Wynnum and Manly, and west through Ipswich to Springfield.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">Response Time Guarantees</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Brisbane CBD:</strong> 30-45 minute priority response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Inner suburbs:</strong> 45-60 minute response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Outer suburbs:</strong> 60-90 minute response</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">24/7 Dispatch Center</h3>
                  <p className="text-gray-700">
                    Our Wacol-based dispatch center operates around the clock, ensuring immediate response to disaster recovery emergencies throughout Brisbane. Every call is answered by trained professionals who can deploy our IICRC certified technicians within minutes of your emergency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Brisbane Disasters - NEW SECTION 2 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Common Brisbane Disasters We Handle
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Brisbane's subtropical climate and geography create unique disaster recovery challenges. Our local expertise ensures effective response to all disaster types affecting Brisbane properties.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Summer Storms & Flooding */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Summer Storms & Flooding</h3>
                </div>
                <p className="text-gray-700">
                  Brisbane's severe weather season (November-February) brings intense storms with flash flooding affecting low-lying areas. Our rapid response teams are on standby during storm season, equipped to handle water extraction and emergency mitigation across Brisbane's storm-prone suburbs.
                </p>
              </div>

              {/* Brisbane River Flooding */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Brisbane River Flooding</h3>
                </div>
                <p className="text-gray-700">
                  Following the devastating 2011 and 2022 Brisbane floods, we've developed specialized expertise in riverfront property restoration. Flood-prone suburbs including <Link href="/brisbane/west-end" className="text-amber-700 hover:underline">West End</Link>, <Link href="/brisbane/milton" className="text-amber-700 hover:underline">Milton</Link>, <Link href="/brisbane/st-lucia" className="text-amber-700 hover:underline">St Lucia</Link>, and Rocklea require immediate Category 3 water damage protocols and comprehensive decontamination services.
                </p>
              </div>

              {/* Subtropical Humidity & Mould */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Subtropical Humidity & Mould</h3>
                </div>
                <p className="text-gray-700">
                  Brisbane's year-round high humidity (70-90%) creates perfect conditions for mould growth within 24-48 hours of water damage. Our <Link href="/services/mould-remediation" className="text-green-700 hover:underline">mould remediation Brisbane</Link> specialists use advanced dehumidification systems and antimicrobial treatments to prevent secondary mould damage in Brisbane's humid subtropical climate.
                </p>
              </div>

              {/* Storm Surge & King Tides */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Storm Surge & King Tides</h3>
                </div>
                <p className="text-gray-700">
                  Bayside Brisbane suburbs including <Link href="/brisbane/wynnum" className="text-purple-700 hover:underline">Wynnum</Link>, <Link href="/brisbane/manly" className="text-purple-700 hover:underline">Manly</Link>, Sandgate, and Brighton face unique challenges from storm surge and king tides. Our coastal property specialists understand salt water damage protocols and provide rapid response to bayside emergency restoration Brisbane needs.
                </p>
              </div>

              {/* Burst Pipes & Plumbing */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Burst Pipes & Plumbing Failures</h3>
                </div>
                <p className="text-gray-700">
                  Brisbane's historic Queenslander homes and aging infrastructure create increased risk of burst pipes and plumbing failures. Our <Link href="/services/water-damage-restoration" className="text-red-700 hover:underline">water damage restoration Brisbane</Link> teams are experts in ceiling cavity water extraction, sub-floor drying, and structural timber restoration specific to Queensland building styles.
                </p>
              </div>

              {/* Commercial Property Disasters */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Commercial Property Disasters</h3>
                </div>
                <p className="text-gray-700">
                  From Brisbane CBD office towers to Fortitude Valley retail spaces and industrial warehouses, our <Link href="/services/commercial-restoration" className="text-gray-700 hover:underline">commercial restoration Brisbane</Link> services minimize business interruption. We provide after-hours work, staged restoration, and coordinated large-loss response for Brisbane commercial properties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Coverage Across Greater Brisbane - NEW SECTION 3 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Coverage Across Greater Brisbane
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Emergency disaster recovery services across 40+ Greater Brisbane suburbs, from riverside estates to commercial districts.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Inner City & CBD */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Inner City & CBD</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/brisbane/cbd" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Brisbane CBD
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/fortitude-valley" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Fortitude Valley
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/spring-hill" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Spring Hill
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/new-farm" className="text-blue-600 hover:text-blue-800 hover:underline">
                      New Farm
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/teneriffe" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Teneriffe
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/newstead" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Newstead
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/bowen-hills" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Bowen Hills
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/west-end" className="text-blue-600 hover:text-blue-800 hover:underline">
                      West End
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/south-brisbane" className="text-blue-600 hover:text-blue-800 hover:underline">
                      South Brisbane
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Northern Suburbs */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-900 mb-4">Northern Suburbs</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/brisbane/chermside" className="text-green-600 hover:text-green-800 hover:underline">
                      Chermside
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/kedron" className="text-green-600 hover:text-green-800 hover:underline">
                      Kedron
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/nundah" className="text-green-600 hover:text-green-800 hover:underline">
                      Nundah
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/clayfield" className="text-green-600 hover:text-green-800 hover:underline">
                      Clayfield
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/ascot" className="text-green-600 hover:text-green-800 hover:underline">
                      Ascot
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/hamilton" className="text-green-600 hover:text-green-800 hover:underline">
                      Hamilton
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/albion" className="text-green-600 hover:text-green-800 hover:underline">
                      Albion
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/windsor" className="text-green-600 hover:text-green-800 hover:underline">
                      Windsor
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/stafford" className="text-green-600 hover:text-green-800 hover:underline">
                      Stafford
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Eastern Suburbs */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Eastern Suburbs</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/brisbane/wynnum" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Wynnum
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/manly" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Manly
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/morningside" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Morningside
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/bulimba" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Bulimba
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/hawthorne" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Hawthorne
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/norman-park" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Norman Park
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/cannon-hill" className="text-purple-600 hover:text-purple-800 hover:underline">
                      Cannon Hill
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Southern Suburbs */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Southern Suburbs</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/brisbane/mount-gravatt" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Mount Gravatt
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/holland-park" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Holland Park
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/sunnybank" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Sunnybank
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/carindale" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Carindale
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/greenslopes" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Greenslopes
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/coorparoo" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Coorparoo
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/camp-hill" className="text-orange-600 hover:text-orange-800 hover:underline">
                      Camp Hill
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Western Suburbs */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-teal-600">
                <h3 className="text-xl font-bold text-teal-900 mb-4">Western Suburbs</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/brisbane/toowong" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Toowong
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/indooroopilly" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Indooroopilly
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/st-lucia" className="text-teal-600 hover:text-teal-800 hover:underline">
                      St Lucia
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/kenmore" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Kenmore
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/chapel-hill" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Chapel Hill
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/bardon" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Bardon
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/paddington" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Paddington
                    </Link>
                  </li>
                  <li>
                    <Link href="/brisbane/milton" className="text-teal-600 hover:text-teal-800 hover:underline">
                      Milton
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold mb-4">Don't See Your Suburb?</h3>
                <p className="mb-4">
                  We service all Greater Brisbane areas including Logan, Redlands, Pine Rivers and Moreton Bay regions.
                </p>
                <Link
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1300 309 361
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Suburb Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Premium Brisbane Suburb Specialists
              </h2>
              <p className="text-xl text-gray-600">
                Specialized restoration services for Brisbane's most exclusive neighborhoods
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/brisbane/new-farm"
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">New Farm</h3>
                    <p className="text-sm text-gray-600">Heritage Waterfront</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Specialized heritage Queenslander restoration and Brisbane River flood expertise for New Farm's cultural district.
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/brisbane/hamilton"
                className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Hamilton</h3>
                    <p className="text-sm text-gray-600">Executive Riverfront</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Discrete executive response for Hamilton's riverfront mansions with priority service for CEO residences.
                </p>
                <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/brisbane/ascot"
                className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ascot</h3>
                    <p className="text-sm text-gray-600">Racecourse Precinct</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Racing industry expertise and equestrian property specialists for Ascot's established wealth families.
                </p>
                <div className="flex items-center text-yellow-600 font-medium group-hover:text-yellow-700">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/brisbane/toowong"
                className="group bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Toowong</h3>
                    <p className="text-sm text-gray-600">Heritage Character</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Heritage Queenslander restoration with Brisbane City Council compliance for character precincts.
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/springfield-lakes"
                className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Springfield Lakes</h3>
                    <p className="text-sm text-gray-600">Premium Estates</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Lakefront property specialists with golf course estate expertise and executive discrete service.
                </p>
                <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <div className="group bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Your Suburb</h3>
                    <p className="text-sm text-gray-600">Custom Service</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Don't see your suburb? We provide premium restoration services across all Brisbane areas.
                </p>
                <div className="flex items-center text-gray-600 font-medium group-hover:text-gray-700">
                  <span>Call (07) 3000 0000</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Brisbane Property Owners Choose Us - NEW SECTION 4 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Why Brisbane Property Owners Choose Disaster Recovery
            </h2>
            <p className="text-xl text-gray-600 mb-10 text-center max-w-3xl mx-auto">
              Over a decade of Brisbane restoration experience with Australia's highest industry certification
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Local Brisbane Expertise</h3>
                </div>
                <p className="text-gray-700">
                  Operating from Wacol for over 10 years, we understand Brisbane's unique challenges - from Brisbane River flooding to subtropical mould growth. Our local knowledge ensures faster, more effective disaster recovery Brisbane solutions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">IICRC Master Restorer</h3>
                </div>
                <p className="text-gray-700">
                  Phill McGurk is one of a limited number of IICRC Master Restorers in Queensland. This elite certification represents the highest level of technical competence and ethical standards in disaster restoration Brisbane.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Response Time Guarantee</h3>
                </div>
                <p className="text-gray-700">
                  <strong>&lt;60 minutes Brisbane metro, &lt;90 minutes outer suburbs.</strong> Our Wacol headquarters provides strategic access to all Brisbane areas, ensuring the fastest emergency response times in the industry.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Insurance Specialists</h3>
                </div>
                <p className="text-gray-700">
                  Approved contractor for Suncorp, RACQ, Allianz, QBE, IAG, NRMA, and CGU. We handle direct billing, claims documentation, and insurance liaison - removing the stress from your disaster recovery Brisbane experience.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Brisbane Building Code Expertise</h3>
                </div>
                <p className="text-gray-700">
                  Expert knowledge of post-2011 Brisbane flood regulations and Brisbane City Council requirements. We ensure all restoration work meets current BCC building codes and Queensland construction standards.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-6 border border-teal-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Subtropical Climate Specialists</h3>
                </div>
                <p className="text-gray-700">
                  Brisbane's 70-90% humidity requires specialized drying techniques. Our teams use thermal imaging and moisture meters to prevent mould growth in Brisbane's challenging climate conditions.
                </p>
              </div>
            </div>

            {/* Emergency Response Process - NEW SECTION 5 */}
            <div className="mt-12 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Brisbane Emergency Response Process
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Call Received</h4>
                    <p className="text-sm text-red-100">
                      24/7 emergency dispatch at <strong>1300 309 361</strong> - answered by trained professionals, not machines
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Team Dispatched</h4>
                    <p className="text-sm text-red-100">
                      IICRC certified technicians deployed from Wacol HQ with ETA confirmation
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">On-Site Assessment</h4>
                    <p className="text-sm text-red-100">
                      Arrival within 60 minutes (Brisbane metro) for comprehensive damage evaluation
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Emergency Mitigation</h4>
                    <p className="text-sm text-red-100">
                      Immediate water extraction, structural drying, and damage containment begins
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Insurance Notification</h4>
                    <p className="text-sm text-red-100">
                      Complete documentation, photos, moisture readings for your insurance claim
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    6
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Full Restoration Plan</h4>
                    <p className="text-sm text-red-100">
                      Detailed scope of work and timeline provided within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors text-lg"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Start Your Recovery Now: 1300 309 361
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Working with Brisbane Insurers - NEW SECTION 6 */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Insurance Claims Assistance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Approved contractor for every major insurance company operating in Brisbane
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  Direct Billing Available
                </h3>
                <p className="text-gray-700 mb-4">
                  We handle direct billing with all major Brisbane insurers, eliminating upfront costs for approved claims. Your disaster recovery Brisbane emergency shouldn't drain your savings while waiting for insurance reimbursement.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>98% insurance approval rate</strong> for Brisbane claims</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Average claim processing: <strong>3-5 business days</strong></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete documentation and photo evidence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-6 w-6 text-blue-600 mr-2" />
                  Brisbane Insurance Partners
                </h3>
                <p className="text-gray-700 mb-4">
                  As an approved disaster recovery Brisbane contractor, we maintain strong relationships with Queensland's leading insurers:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">Suncorp Group</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">AAMI</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">GIO</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">RACQ</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">Allianz</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">QBE</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">IAG (NRMA)</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">CGU</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Insurance Claim Assistance Included
              </h3>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                Not sure if your Brisbane property damage is covered? We provide free claim assessments and help you navigate the insurance process from start to finish.
              </p>
              <Link
                href="/insurance"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Learn About Insurance Coverage
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - EXPANDED */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brisbane Disaster Recovery FAQ
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about disaster recovery services in Brisbane
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How quickly can you respond to water damage in Brisbane?
                </h3>
                <p className="text-gray-600">
                  We provide emergency response within 1 hour across Brisbane, including CBD, New Farm,
                  South Bank, and surrounding suburbs. Our 24/7 service ensures immediate assistance when you need it most.
                  Our technicians are strategically located to serve all Brisbane areas efficiently.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Which areas of Brisbane do you service for water damage restoration?
                </h3>
                <p className="text-gray-600">
                  We service all Brisbane suburbs including CBD, New Farm, Teneriffe, Fortitude Valley,
                  South Brisbane, West End, St Lucia, Toowong, Milton, Hamilton, and surrounding areas.
                  No job is too big or small - from single-room incidents to multi-story commercial buildings.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Will my insurance cover water damage restoration in Brisbane?
                </h3>
                <p className="text-gray-600">
                  Most insurance policies cover sudden water damage like burst pipes, appliance failures,
                  and storm damage. We work directly with all major insurers and can provide direct billing.
                  Flood damage may require separate flood insurance coverage. We'll help you navigate your policy requirements.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How much does water damage restoration cost in Brisbane?
                </h3>
                <p className="text-gray-600">
                  Costs vary based on damage extent, affected area size, and restoration complexity.
                  We provide free assessments and work with insurance companies for direct billing.
                  Emergency mitigation typically starts within your insurance excess.
                  Most Brisbane residential jobs range from $2,000-$15,000 depending on scope.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Do you service Brisbane during storms and floods?
                </h3>
                <p className="text-gray-600">
                  Yes. Our 24/7 emergency disaster recovery Brisbane service operates during severe weather events. We prioritize emergency callouts during Brisbane storm season (November-February) and have contingency plans for Brisbane River flooding based on Bureau of Meteorology warnings.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What makes Brisbane properties different for restoration?
                </h3>
                <p className="text-gray-600">
                  Brisbane's subtropical climate (70-90% humidity), heritage Queenslander architecture, Brisbane River flood risk, and post-2011 building codes create unique challenges. Our Brisbane restoration specialists understand these local factors and use climate-appropriate drying techniques to prevent mould growth.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Are you familiar with Brisbane City Council requirements?
                </h3>
                <p className="text-gray-600">
                  Absolutely. We maintain expert knowledge of BCC building regulations, Queensland Building and Construction Commission (QBCC) standards, and post-2011 flood mitigation requirements. All disaster recovery Brisbane work is compliant with current Brisbane building codes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Brisbane Water Damage Emergency?
            </h2>
            <p className="text-xl mb-8">
              Don't wait - every minute counts in water damage restoration.
              Call now for immediate assistance across Brisbane.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-xl"
              >
                <Phone className="mr-2 h-6 w-6" />
                1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold rounded-lg transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}