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

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brisbane Water Damage FAQ
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about water damage restoration in Brisbane
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