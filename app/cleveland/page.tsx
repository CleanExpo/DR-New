import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Anchor, Waves, Home, Wind, Ship, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cleveland Water Damage Restoration | Coastal Storm Surge Specialists | 24/7 Emergency',
  description: 'Professional water damage restoration Cleveland Brisbane. Coastal property specialists, storm surge experts, salt damage remediation. Phill McGurk - IICRC Master Restorer, Xactimate Master, Hazmat Licensed, Asbestos Assessor.',
  keywords: 'Cleveland water damage restoration, coastal property flooding, storm surge Cleveland, Moreton Bay emergency, Cleveland salt damage, coastal home restoration',
  openGraph: {
    title: 'Cleveland Water Damage Restoration | Coastal Storm Surge Specialists',
    description: 'Professional coastal property restoration in Cleveland with storm surge expertise and salt damage remediation.',
    url: 'https://dr-new-ten.vercel.app/cleveland',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Cleveland Coastal Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/cleveland'
  }
};

const clevelandPrecincts = [
  {
    area: 'Cleveland Point Waterfront',
    characteristics: 'Moreton Bay frontage, boat ramps, coastal lifestyle',
    propertyTypes: ['Waterfront homes', 'Beach houses', 'Coastal apartments'],
    stormRisk: 'Very High - Direct bay exposure',
    medianPrice: '$890,000',
    responseTime: '40 minutes',
    residents: 'Retirees, sea-changers, boating enthusiasts'
  },
  {
    area: 'Raby Bay Canal Estates',
    characteristics: 'Canal living, private jetties, luxury marina',
    propertyTypes: ['Canal-front homes', 'Luxury estates', 'Marina berths'],
    stormRisk: 'High - Canal system',
    medianPrice: '$1,250,000',
    responseTime: '42 minutes',
    residents: 'Marine lifestyle, affluent families'
  },
  {
    area: 'Central Cleveland',
    characteristics: 'Town centre, commercial hub, transport links',
    propertyTypes: ['Family homes', 'Commercial spaces', 'Mixed-use'],
    stormRisk: 'Medium - Elevated location',
    medianPrice: '$720,000',
    responseTime: '38 minutes',
    residents: 'Working families, commuters'
  },
  {
    area: 'Wellington Point Border',
    characteristics: 'Coastal reserve proximity, established homes',
    propertyTypes: ['Family houses', 'Suburban homes', 'Lifestyle properties'],
    stormRisk: 'Medium - Some elevation',
    medianPrice: '$810,000',
    responseTime: '45 minutes',
    residents: 'Families, coastal lifestyle seekers'
  }
];

const coastalServices = [
  {
    title: 'Storm Surge Emergency Response',
    description: 'Rapid response to coastal storm surge events with specialised pumping and drying for saltwater intrusion.',
    icon: Waves,
    urgency: 'Critical - 60 minutes',
    features: ['Saltwater extraction', 'Corrosion prevention', 'Marine-grade restoration', 'Storm surge barriers']
  },
  {
    title: 'Salt Damage Remediation',
    description: 'specialised treatment for salt corrosion affecting coastal properties, including metals, timber, and finishes.',
    icon: Ship,
    urgency: 'High - 2 hours',
    features: ['Salt crystallization removal', 'Metal corrosion treatment', 'Timber protection', 'Coastal finish restoration']
  },
  {
    title: 'Canal Home Water Damage',
    description: 'Expert canal property restoration with understanding of tidal systems and marine infrastructure.',
    icon: Anchor,
    urgency: 'High - 3 hours',
    features: ['Canal flood management', 'Jetty coordination', 'Marine construction knowledge', 'Tidal system expertise']
  },
  {
    title: 'Coastal Mould Prevention',
    description: 'High-humidity mould remediation and prevention strategies for Cleveland\'s marine climate.',
    icon: Wind,
    urgency: 'Medium - 24 hours',
    features: ['Marine climate mould removal', 'Humidity control systems', 'Ventilation optimisation', 'Anti-mould treatments']
  }
];

const clevelandRisks = [
  {
    risk: 'Moreton Bay Storm Surge',
    properties: 'Waterfront homes, canal estates, low-lying properties',
    response: 'Emergency pumping, saltwater extraction, rapid drying, corrosion prevention protocols',
    mitigation: 'Storm barriers, early warning monitoring, elevated electrical, marine-grade materials'
  },
  {
    risk: 'Salt Air Corrosion Damage',
    properties: 'All coastal properties within 2km of bay',
    response: 'Salt removal treatments, corrosion inhibitors, protective coatings, metal replacement',
    mitigation: 'Regular salt wash-downs, marine-grade fixtures, protective treatments, maintenance plans'
  },
  {
    risk: 'High Humidity Mould Growth',
    properties: 'All Cleveland properties, especially waterfront',
    response: 'Comprehensive mould remediation, dehumidification, ventilation improvements, air quality testing',
    mitigation: 'Humidity control systems, proper ventilation, regular inspections, moisture barriers'
  }
];

const clevelandFeatures = [
  'Coastal property storm surge response within 40 minutes',
  'Moreton Bay waterfront specialised protocols',
  'Saltwater damage and corrosion expertise',
  'Canal home and jetty coordination services',
  'Marine-grade materials and restoration techniques',
  'High-humidity climate mould prevention specialists',
  'Island ferry emergency access capabilities',
  'Raby Bay luxury canal estate experience'
];

const clevelandFAQ = [
  {
    question: 'How quickly can you respond to storm surge flooding in Cleveland?',
    answer: 'We provide emergency response to Cleveland coastal properties within 40-45 minutes. Our team is equipped with specialised saltwater extraction equipment and understands the unique challenges of Moreton Bay storm surge events. We prioritise waterfront and canal properties during severe weather events.'
  },
  {
    question: 'Do you have experience with salt damage in coastal homes?',
    answer: 'Yes, Master Restorer Phill McGurk specialises in coastal property restoration throughout the Bayside region. Salt damage requires specialised treatment including salt crystallization removal, corrosion prevention, and marine-grade restoration techniques. We use industry-leading products designed for harsh coastal environments.'
  },
  {
    question: 'Can you help with canal home water damage at Raby Bay?',
    answer: 'Absolutely. We have extensive experience with Raby Bay canal estates including understanding tidal systems, marine infrastructure, and luxury waterfront property restoration. Our team coordinates with jetty repairs, marine construction, and understands the unique challenges of canal living in Cleveland.'
  },
  {
    question: 'Why is mould such a problem in Cleveland properties?',
    answer: 'Cleveland\'s coastal location creates consistently high humidity levels (often 70-90%), which provides ideal conditions for mould growth. Combined with salt air and temperature fluctuations, properties require specialised mould prevention strategies. We implement marine-climate specific solutions including dehumidification, ventilation optimisation, and anti-mould treatments.'
  }
];

export default function ClevelandPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/cleveland',
    name: 'Disaster Recovery Cleveland Coastal Specialists',
    image: 'https://dr-new-ten.vercel.app/images/cleveland-coastal-restoration.jpg',
    description: 'Professional water damage restoration for Cleveland coastal properties and Moreton Bay waterfront homes. Storm surge specialists with saltwater damage expertise.',
    url: 'https://dr-new-ten.vercel.app/cleveland',
    telephone: '1300309361',
    email: 'cleveland@dr-new-ten.vercel.app',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Cleveland District',
      addressLocality: 'Cleveland',
      addressRegion: 'QLD',
      postalCode: '4163',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.5273',
      longitude: '153.2623'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Cleveland',
        sameAs: 'https://en.wikipedia.org/wiki/Cleveland,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'Raby Bay'
      },
      {
        '@type': 'Place',
        name: 'Cleveland Point'
      },
      {
        '@type': 'Place',
        name: 'Moreton Bay Waterfront'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleveland Coastal Restoration Services',
      itemListElement: coastalServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Cleveland+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Cash, Card, Bank Transfer',
    currenciesAccepted: 'AUD',
    founder: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'Master Restorer',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional Certification',
          name: 'IICRC Master Restorer'
        }
      ]
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: clevelandFAQ.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-centre">
              <div className="flex items-centre justify-centre gap-3 mb-6 flex-wrap">
                <Anchor className="w-12 h-12 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  Coastal Specialist • Storm Surge Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Cleveland Coastal Property
                <span className="block text-cyan-400">Storm Surge Emergency Response</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Cleveland's waterfront properties and Moreton Bay coastal homes.
                <strong> Master Restorer Phill McGurk</strong> - specialised in storm surge events, saltwater damage,
                and high-humidity coastal climate restoration.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Waves className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Storm Surge</div>
                  <div className="text-cyan-100">Rapid Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Ship className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Salt Damage</div>
                  <div className="text-cyan-100">Specialists</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Anchor className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Canal Homes</div>
                  <div className="text-cyan-100">Expert Care</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Clock className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">40min</div>
                  <div className="text-cyan-100">Response Time</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-centre gap-3 shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Coastal Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Disaster Recovery in Cleveland</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Cleveland's unique position on Moreton Bay creates specific challenges for property owners. From the luxury
                canal estates of Raby Bay to the waterfront homes at Cleveland Point, coastal properties face storm surge,
                saltwater intrusion, and the constant battle against salt air corrosion. Master Restorer Phill McGurk brings
                decades of experience to Cleveland's coastal community, understanding the critical difference between
                freshwater and saltwater damage restoration.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team responds within 40 minutes to Cleveland emergencies, equipped with specialised saltwater extraction
                equipment, marine-grade restoration materials, and the expertise to handle everything from minor leaks to
                major storm surge flooding. We understand Cleveland's weather patterns, tidal systems, and the importance of
                rapid response to prevent catastrophic salt corrosion in your valuable coastal investment.
              </p>
            </div>
          </div>
        </section>

        {/* Cleveland Precincts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cleveland Coastal Precincts
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services across Cleveland's diverse waterfront communities,
                from canal estates to bay-front properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {clevelandPrecincts.map((precinct, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-cyan-600">
                  <div className="flex items-centre justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {precinct.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      precinct.stormRisk.includes('Very High') ? 'bg-red-200 text-red-900' :
                      precinct.stormRisk.includes('High') ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {precinct.stormRisk.split(' - ')[0]}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-gray-700">{precinct.characteristics}</div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Property Types:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {precinct.propertyTypes.map((type, idx) => (
                          <div key={idx} className="text-sm bg-cyan-50 text-cyan-800 px-3 py-1 rounded">
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500">Typical Residents:</span>
                      <div className="text-sm text-gray-700 italic">{precinct.residents}</div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-500">Median Price:</span>
                        <div className="font-bold text-green-600">{precinct.medianPrice}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-blue-600">{precinct.responseTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coastal Services */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coastal Restoration Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised services designed for Cleveland's unique coastal environment
                and Moreton Bay waterfront challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coastalServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-cyan-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-centre gap-4 mb-6">
                      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-centre justify-centre">
                        <IconComponent className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <span className="text-sm font-bold text-red-600">{service.urgency}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div>
                      <span className="text-sm text-gray-500 mb-3 block">Key Features:</span>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-centre gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Risk Management */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cleveland Coastal Risk Management
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive risk assessment and management protocols for Cleveland's
                unique coastal property challenges.
              </p>
            </div>

            <div className="space-y-8">
              {clevelandRisks.map((risk, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-red-600">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{risk.risk}</h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Affected Properties</h4>
                      <p className="text-gray-700">{risk.properties}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Emergency Response</h4>
                      <p className="text-gray-700">{risk.response}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Risk Mitigation</h4>
                      <p className="text-gray-700">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cleveland Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Cleveland Coastal Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {clevelandFeatures.map((feature, index) => (
                  <div key={index} className="flex items-centre gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Anchor className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {clevelandFAQ.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-lg p-6 shadow-md border-l-4 border-cyan-600 cursor-pointer"
                >
                  <summary className="flex items-centre justify-between font-semibold text-gray-900 text-lg">
                    {faq.question}
                    <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-centre">
            <Waves className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Cleveland Coastal Emergency? Storm Surge Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Coastal properties require immediate response to prevent catastrophic salt damage and corrosion.
              Our Master Restorer team provides rapid saltwater extraction and marine-grade restoration to protect
              your valuable Moreton Bay waterfront investment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Phone className="w-5 h-5" />
                Coastal Emergency: 1300 309 361
              </Link>
              <Link
                href="/emergency-guide"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Shield className="w-5 h-5" />
                Storm Preparation Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-centre text-gray-900 mb-8">
              Additional Bayside Areas We Serve
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/wynnum"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-cyan-600"
              >
                <Waves className="w-8 h-8 text-cyan-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Wynnum</h4>
                <p className="text-gray-600 text-sm">Waterfront homes and beach properties</p>
              </Link>
              <Link
                href="/manly"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-blue-600"
              >
                <Ship className="w-8 h-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Manly</h4>
                <p className="text-gray-600 text-sm">Marina and harbour restoration</p>
              </Link>
              <Link
                href="/redland-bay"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-green-600"
              >
                <Home className="w-8 h-8 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Redland Bay</h4>
                <p className="text-gray-600 text-sm">Southern bay coastal properties</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
