import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, TreePine, Droplets, Home, Wind, Waves, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Karalee Water Damage Restoration | Bremer River Flood Specialists | 24/7 Emergency',
  description: 'Professional water damage restoration Karalee Ipswich. Bremer River flood specialists, riverside estate experts, executive property restoration. Master Restorer certified for established homes.',
  keywords: 'Karalee water damage restoration, Bremer River flooding, riverside properties Karalee, executive estate restoration, Karalee golf course homes, established home restoration Ipswich',
  openGraph: {
    title: 'Karalee Water Damage Restoration | Bremer River Flood Specialists',
    description: 'Professional riverside property restoration in Karalee with Bremer River flood expertise and executive estate care.',
    url: 'https://dr-new-ten.vercel.app/karalee',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Karalee Riverside Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/karalee'
  }
};

const karaleePrecincts = [
  {
    area: 'Bremer River Estates',
    characteristics: 'Riverside executive homes, golf course proximity, mature gardens',
    propertyTypes: ['River-view homes', 'Executive estates', 'Waterfront properties'],
    floodRisk: 'High - River proximity',
    medianPrice: '$950,000',
    responseTime: '25 minutes',
    residents: 'Executives, established families, golf enthusiasts'
  },
  {
    area: 'Golf Course Precinct',
    characteristics: 'Championship course views, premium estates, landscaped gardens',
    propertyTypes: ['Golf course homes', 'Luxury family homes', 'Estate properties'],
    floodRisk: 'Medium - Elevated positions',
    medianPrice: '$850,000',
    responseTime: '25 minutes',
    residents: 'Professionals, retirees, sporting families'
  },
  {
    area: 'Central Karalee',
    characteristics: 'Established neighborhoods, family homes, mature landscaping',
    propertyTypes: ['Family houses', 'Renovated homes', 'Modern estates'],
    floodRisk: 'Medium - Variable elevation',
    medianPrice: '$720,000',
    responseTime: '30 minutes',
    residents: 'Working families, commuters to Brisbane/Ipswich'
  },
  {
    area: 'Springfield Corridor',
    characteristics: 'Growth area, new developments, modern amenities',
    propertyTypes: ['Contemporary homes', 'New builds', 'Family estates'],
    floodRisk: 'Low - Modern flood planning',
    medianPrice: '$680,000',
    responseTime: '28 minutes',
    residents: 'Young families, first home buyers'
  }
];

const riversideServices = [
  {
    title: 'Bremer River Flood Emergency Response',
    description: 'Rapid response to Bremer River flood events with specialised pumping, drying and restoration for riverside properties affected by 2011/2022 flood patterns.',
    icon: Waves,
    urgency: 'Critical - 60 minutes',
    features: ['River flood extraction', 'Contaminated water protocols', 'Structural drying systems', 'Flood barrier coordination']
  },
  {
    title: 'Established Home Restoration',
    description: 'specialised care for Karalee\'s mature homes including timber floors, heritage features, and established garden protection.',
    icon: Home,
    urgency: 'High - 2 hours',
    features: ['Heritage timber restoration', 'Plaster wall drying', 'Garden coordination', 'Period feature preservation']
  },
  {
    title: 'Golf Course Property Water Damage',
    description: 'Expert restoration for golf course estate homes with understanding of irrigation systems, landscaping, and premium finishes.',
    icon: TreePine,
    urgency: 'High - 3 hours',
    features: ['Landscaping coordination', 'Irrigation system checks', 'Premium floor restoration', 'Garden water management']
  },
  {
    title: 'Storm Water & Drainage Issues',
    description: 'Comprehensive stormwater management for Karalee\'s varied terrain including creek catchments and drainage systems.',
    icon: Droplets,
    urgency: 'Medium - 4 hours',
    features: ['Creek catchment assessment', 'Drainage investigation', 'Slope management', 'Preventive waterproofing']
  }
];

const karaleeRisks = [
  {
    risk: 'Bremer River Major Flooding',
    properties: 'Riverside estates, low-lying properties, creek-adjacent homes',
    response: 'Emergency flood pumping, contaminated water extraction, structural drying, silt/debris removal, health hazard protocols',
    mitigation: 'Flood monitoring systems, early warning alerts, elevated electrical, flood-resistant materials, evacuation planning'
  },
  {
    risk: 'Established Home Storm Damage',
    properties: 'Mature homes with older roofing, timber features, established gardens',
    response: 'Roof leak emergency repairs, timber floor drying, ceiling water damage, heritage feature preservation, garden storm cleanup',
    mitigation: 'Regular roof maintenance, gutter cleaning, tree management, preventive timber treatments, insurance updates'
  },
  {
    risk: 'Golf Course Irrigation & Water Management',
    properties: 'Golf course estates, landscaped properties, premium gardens',
    response: 'Irrigation leak detection, drainage system repairs, landscape water damage, lawn restoration coordination',
    mitigation: 'Irrigation system maintenance, drainage audits, slope management, garden emergency planning'
  }
];

const karaleeFeatures = [
  'Bremer River flood response within 25-30 minutes from Wacol',
  'Riverside estate specialised restoration protocols',
  'Established home and heritage timber expertise',
  'Golf course property and landscaping coordination',
  '2011/2022 flood event experience in Ipswich region',
  'Mature garden and landscape protection services',
  'Executive property premium finish restoration',
  'Creek catchment and stormwater management'
];

const karaleeFAQ = [
  {
    question: 'How quickly can you respond to Bremer River flooding in Karalee?',
    answer: 'We provide emergency response to Karalee within 25-30 minutes from our Wacol operations. Our team has extensive experience with Bremer River flood events, including the 2011 and 2022 floods that affected riverside properties. We understand the critical importance of rapid contaminated water extraction and structural drying to prevent long-term damage to your executive estate.'
  },
  {
    question: 'Do you have experience with established homes and heritage features?',
    answer: 'Yes, Master Restorer Phill McGurk specialises in the restoration of Karalee\'s established homes including heritage timber floors, plaster walls, and period features. We understand the unique challenges of older construction including timber floor drying, ceiling restoration, and preserving the character features that make Karalee homes special. Our techniques are tailored to protect both structural integrity and aesthetic value.'
  },
  {
    question: 'Can you coordinate with landscaping during water damage restoration?',
    answer: 'Absolutely. Karalee\'s golf course estates and riverside properties often feature premium landscaping and mature gardens. We coordinate with landscaping teams to protect established gardens, manage irrigation system issues, and ensure water damage restoration doesn\'t compromise your outdoor investments. We understand golf course property standards and drainage requirements.'
  },
  {
    question: 'What makes Bremer River flooding different from regular water damage?',
    answer: 'Bremer River flooding introduces contaminated water containing sewage, agricultural runoff, and debris requiring specialised health protocols. Unlike clean water from burst pipes, flood water demands comprehensive contamination treatment, antimicrobial applications, and often structural materials replacement. Our team follows strict IICRC flood protocols and coordinates with insurance companies familiar with Ipswich flood claims. Response time is critical as flood water causes exponentially more damage than clean water.'
  }
];

export default function KaraleePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/karalee',
    name: 'Disaster Recovery Karalee Riverside Specialists',
    image: 'https://dr-new-ten.vercel.app/images/karalee-riverside-restoration.jpg',
    description: 'Professional water damage restoration for Karalee riverside properties and Bremer River flood emergencies. Executive estate specialists with established home expertise.',
    url: 'https://dr-new-ten.vercel.app/karalee',
    telephone: '1300309361',
    email: 'karalee@dr-new-ten.vercel.app',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Karalee District',
      addressLocality: 'Karalee',
      addressRegion: 'QLD',
      postalCode: '4306',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.5989',
      longitude: '152.8344'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Karalee',
        sameAs: 'https://en.wikipedia.org/wiki/Karalee,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'Bremer River Estates'
      },
      {
        '@type': 'Place',
        name: 'Karalee Golf Course'
      },
      {
        '@type': 'Place',
        name: 'Greater Springfield'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Karalee Riverside Restoration Services',
      itemListElement: riversideServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Karalee+QLD+Australia',
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
    mainEntity: karaleeFAQ.map(faq => ({
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
        <section className="relative bg-gradient-to-r from-emerald-900 via-green-900 to-teal-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-centre">
              <div className="flex items-centre justify-centre gap-3 mb-6 flex-wrap">
                <TreePine className="w-12 h-12 text-emerald-400" />
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  Riverside Specialist • Bremer River Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Karalee Riverside Property
                <span className="block text-emerald-400">Bremer River Flood Emergency Response</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Karalee's riverside estates and golf course properties.
                <strong> Master Restorer Phill McGurk</strong> - specialised in Bremer River flood events, established home
                restoration, and executive property care with 25-minute response from Wacol.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Waves className="w-8 h-8 mb-4 text-emerald-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">River Floods</div>
                  <div className="text-emerald-100">2011/2022 Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Home className="w-8 h-8 mb-4 text-emerald-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Established</div>
                  <div className="text-emerald-100">Home Specialists</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <TreePine className="w-8 h-8 mb-4 text-emerald-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Golf Estates</div>
                  <div className="text-emerald-100">Expert Care</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Clock className="w-8 h-8 mb-4 text-emerald-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">25min</div>
                  <div className="text-emerald-100">Response Time</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-centre gap-3 shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Riverside Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Disaster Recovery in Karalee</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Karalee's prestigious position alongside the Bremer River creates both lifestyle benefits and unique challenges for property owners. From riverside executive estates to golf course properties and established family homes, this mature Ipswich suburb faces specific water damage risks including Bremer River flooding (2011, 2022 events), established home maintenance issues, and stormwater management across varied terrain. Master Restorer Phill McGurk brings decades of Ipswich region experience to Karalee, understanding the critical differences between river flood contamination and clean water damage.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team responds within 25-30 minutes to Karalee emergencies from our Wacol operations, equipped with contaminated water extraction equipment, structural drying systems, and specialised techniques for established homes with timber floors, heritage features, and mature landscaping. We understand Karalee's flood history, creek catchment areas, and the importance of rapid response to protect your valuable riverside or golf course estate investment.
              </p>
            </div>
          </div>
        </section>

        {/* Karalee Precincts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Karalee Property Precincts
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services across Karalee's diverse communities,
                from riverside estates to golf course homes and established neighborhoods.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {karaleePrecincts.map((precinct, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-emerald-600">
                  <div className="flex items-centre justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {precinct.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      precinct.floodRisk.includes('High') ? 'bg-red-100 text-red-800' :
                      precinct.floodRisk.includes('Medium') ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {precinct.floodRisk.split(' - ')[0]}
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
                          <div key={idx} className="text-sm bg-emerald-50 text-emerald-800 px-3 py-1 rounded">
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

        {/* Riverside Services */}
        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Riverside Restoration Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised services designed for Karalee's unique riverside environment
                and Bremer River flood challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {riversideServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-emerald-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-centre gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-centre justify-centre">
                        <IconComponent className="w-6 h-6 text-emerald-600" />
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
                Karalee Water Damage Risk Management
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive risk assessment and management protocols for Karalee's
                unique riverside and established property challenges.
              </p>
            </div>

            <div className="space-y-8">
              {karaleeRisks.map((risk, index) => (
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

        {/* Karalee Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Karalee Riverside Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {karaleeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-centre gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <TreePine className="w-5 h-5 text-emerald-600 flex-shrink-0" />
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
              {karaleeFAQ.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-lg p-6 shadow-md border-l-4 border-emerald-600 cursor-pointer"
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
              Karalee Water Emergency? Bremer River Flood Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Riverside properties require immediate response to prevent contamination spread and structural damage.
              Our Master Restorer team provides rapid flood water extraction and specialised restoration to protect
              your valuable Karalee riverside or golf course estate investment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Phone className="w-5 h-5" />
                Riverside Emergency: 1300 309 361
              </Link>
              <Link
                href="/emergency-guide"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Shield className="w-5 h-5" />
                Flood Preparation Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-centre text-gray-900 mb-8">
              Additional Ipswich & Springfield Areas We Serve
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/brookwater"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-emerald-600"
              >
                <TreePine className="w-8 h-8 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Brookwater</h4>
                <p className="text-gray-600 text-sm">Golf course luxury estates</p>
              </Link>
              <Link
                href="/springfield-lakes"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-blue-600"
              >
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Springfield Lakes</h4>
                <p className="text-gray-600 text-sm">Modern master-planned community</p>
              </Link>
              <Link
                href="/ipswich"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-purple-600"
              >
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Ipswich CBD</h4>
                <p className="text-gray-600 text-sm">Commercial restoration services</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
