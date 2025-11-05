import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Trophy, Home, Zap, Wind, Droplets, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brookwater Water Damage Restoration | Golf Course Luxury Estate Specialists | 24/7 Emergency',
  description: 'Professional water damage restoration Brookwater Springfield. Championship golf estate specialists, new construction experts, smart home system protection. Phill McGurk - IICRC Master Restorer, Hazmat Licensed, Asbestos Assessor.',
  keywords: 'Brookwater water damage restoration, golf course estate restoration, luxury home Springfield, new construction water damage, smart home restoration, Brookwater emergency',
  openGraph: {
    title: 'Brookwater Water Damage Restoration | Golf Course Luxury Estate Specialists',
    description: 'Professional luxury estate restoration in Brookwater with championship golf course expertise and new construction care.',
    url: 'https://dr-new-ten.vercel.app/brookwater',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Brookwater Golf Estate Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brookwater'
  }
};

const brookwaterPrecincts = [
  {
    area: 'Championship Golf Frontage',
    characteristics: 'Greg Norman course views, architectural homes, resort lifestyle',
    propertyTypes: ['Golf course mansions', 'Designer homes', 'Luxury estates'],
    constructionRisk: 'Medium - Premium finishes',
    medianPrice: '$1,350,000',
    responseTime: '30 minutes',
    residents: 'Executives, professionals, golf lifestyle seekers'
  },
  {
    area: 'Brookwater Estate Core',
    characteristics: 'Master-planned community, modern architecture, resort amenities',
    propertyTypes: ['Executive homes', 'Family estates', 'Contemporary luxury'],
    constructionRisk: 'Low-Medium - Modern standards',
    medianPrice: '$980,000',
    responseTime: '32 minutes',
    residents: 'Affluent families, business owners, commuters'
  },
  {
    area: 'Springfield Lakes Border',
    characteristics: 'New developments, modern construction, integrated community',
    propertyTypes: ['New builds', 'Modern family homes', 'Smart homes'],
    constructionRisk: 'Low - Recent construction',
    medianPrice: '$750,000',
    responseTime: '35 minutes',
    residents: 'Young professionals, growing families'
  },
  {
    area: 'Brookwater Village',
    characteristics: 'Commercial precinct, dining, boutique retail, community hub',
    propertyTypes: ['Luxury apartments', 'Mixed-use', 'Commercial spaces'],
    constructionRisk: 'Medium - Complex systems',
    medianPrice: '$650,000',
    responseTime: '30 minutes',
    residents: 'Retirees, downsizers, urban lifestyle'
  }
];

const luxuryServices = [
  {
    title: 'Championship Golf Estate Restoration',
    description: 'specialised restoration for Brookwater\'s Greg Norman championship golf course properties with understanding of premium landscaping, irrigation coordination, and luxury finishes.',
    icon: Trophy,
    urgency: 'Critical - 60 minutes',
    features: ['Golf course coordination', 'Premium floor restoration', 'Landscape protection', 'Resort-grade finishes']
  },
  {
    title: 'New Construction Water Damage',
    description: 'Expert handling of water damage in Brookwater\'s modern homes including QBCC warranty coordination, builder liaison, and defect documentation.',
    icon: Home,
    urgency: 'High - 2 hours',
    features: ['Builder coordination', 'QBCC documentation', 'Warranty preservation', 'Defect assessment']
  },
  {
    title: 'Smart Home System Protection',
    description: 'Comprehensive protection for Brookwater\'s integrated smart home systems including electrical safety, automation preservation, and technology coordination.',
    icon: Zap,
    urgency: 'Critical - 90 minutes',
    features: ['Smart system isolation', 'Electrical protection', 'Automation recovery', 'Technology assessment']
  },
  {
    title: 'Premium Finish Restoration',
    description: 'specialised care for luxury finishes including imported tiles, engineered timber, designer fixtures, and architectural elements unique to Brookwater estates.',
    icon: Award,
    urgency: 'High - 3 hours',
    features: ['Designer material sourcing', 'Architectural coordination', 'Premium timber care', 'Luxury fixture restoration']
  }
];

const brookwaterRisks = [
  {
    risk: 'New Construction Defects & Water Ingress',
    properties: 'Homes under 7 years, QBCC warranty period, builder defects',
    response: 'Immediate defect documentation, builder notification, QBCC coordination, warranty preservation, professional assessment reports',
    mitigation: 'Regular maintenance inspections, builder relationship management, warranty claim preparation, defect monitoring, professional documentation'
  },
  {
    risk: 'Smart Home & Electrical System Damage',
    properties: 'Golf course estates with automation, integrated systems, premium technology',
    response: 'Emergency electrical isolation, smart system protection, automation recovery, technology assessment, specialised electrical contractors',
    mitigation: 'Surge protection systems, water detection sensors, system documentation, regular technology audits, backup systems'
  },
  {
    risk: 'Golf Course Irrigation & Drainage Issues',
    properties: 'Course-adjacent homes, premium landscaping, integrated irrigation',
    response: 'Golf course management liaison, irrigation system assessment, drainage investigation, landscape coordination, stormwater management',
    mitigation: 'Regular irrigation maintenance, drainage audits, golf course communication, preventive monitoring, landscape planning'
  }
];

const brookwaterFeatures = [
  'Championship golf estate response within 30-35 minutes from Wacol',
  'Greg Norman golf course property specialised protocols',
  'New construction and QBCC warranty expertise',
  'Smart home system protection and coordination',
  'Premium finish and luxury material restoration',
  'Builder and developer liaison services',
  'Master-planned community integrated response',
  'Resort-grade restoration standards'
];

const brookwaterFAQ = [
  {
    question: 'How quickly can you respond to water damage at Brookwater golf estates?',
    answer: 'We provide emergency response to Brookwater within 30-35 minutes from our Wacol operations. Our team understands the unique requirements of championship golf course properties including coordination with golf course management, protection of premium landscaping, and restoration standards that match Brookwater\'s luxury expectations. We prioritise golf frontage properties and understand the importance of maintaining resort-grade aesthetics.'
  },
  {
    question: 'Do you work with builders on new construction water damage?',
    answer: 'Yes, Phill McGurk (IICRC Master Restorer, Hazmat Licensed, Asbestos Assessor) has extensive experience coordinating with builders and QBCC warranty claims for new construction defects. Many Brookwater homes are still under builder warranty, and we provide professional documentation, defect assessment, and liaison services to ensure your warranty rights are protected. We understand the importance of proper documentation and timely notification to builders and QBCC.'
  },
  {
    question: 'Can you protect smart home systems during water damage restoration?',
    answer: 'Absolutely. Brookwater\'s luxury estates often feature integrated smart home systems controlling lighting, security, climate, and entertainment. Our team coordinates with electrical contractors and technology specialists to isolate affected systems, prevent further damage, and restore automation functionality. We understand the complexity of modern home technology and work to preserve your investment in smart systems while ensuring electrical safety.'
  },
  {
    question: 'How do you handle premium finishes like imported tiles and engineered timber?',
    answer: 'Brookwater estates feature premium materials requiring specialised care. We have established relationships with suppliers for imported tiles, engineered timber, and designer fixtures. Our restoration techniques are tailored to luxury materials including proper drying protocols for engineered floors, preservation of designer tiles, and coordination with architects for matching high-end finishes. We understand that standard materials are not acceptable in Brookwater luxury homes and source premium replacements when necessary.'
  }
];

export default function BrookwaterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/brookwater',
    name: 'Disaster Recovery Brookwater Golf Estate Specialists',
    image: 'https://dr-new-ten.vercel.app/images/brookwater-golf-restoration.jpg',
    description: 'Professional water damage restoration for Brookwater championship golf estates and luxury properties. New construction specialists with smart home system expertise.',
    url: 'https://dr-new-ten.vercel.app/brookwater',
    telephone: '1300309361',
    email: 'brookwater@dr-new-ten.vercel.app',
    priceRange: '$$$-$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Brookwater Golf Estate',
      addressLocality: 'Brookwater',
      addressRegion: 'QLD',
      postalCode: '4300',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.6623',
      longitude: '152.8856'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brookwater',
        sameAs: 'https://en.wikipedia.org/wiki/Brookwater,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'Brookwater Golf Course'
      },
      {
        '@type': 'Place',
        name: 'Greater Springfield'
      },
      {
        '@type': 'Place',
        name: 'Springfield Lakes'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Brookwater Luxury Estate Restoration Services',
      itemListElement: luxuryServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Brookwater+QLD+Australia',
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
    mainEntity: brookwaterFAQ.map(faq => ({
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
        <section className="relative bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-centre">
              <div className="flex items-centre justify-centre gap-3 mb-6 flex-wrap">
                <Trophy className="w-12 h-12 text-amber-400" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  Golf Estate Specialist • Luxury Home Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Brookwater Golf Estate Property
                <span className="block text-amber-400">Championship Course Emergency Response</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Brookwater's championship golf course estates and luxury properties.
                <strong>Phill McGurk - IICRC Master Restorer</strong> - Xactimate Master, Hazmat Licensed, Asbestos Assessor - specialised in Greg Norman course homes, new construction
                care, smart home protection, and premium finish restoration with 30-minute response from Wacol.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Trophy className="w-8 h-8 mb-4 text-amber-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Golf Course</div>
                  <div className="text-amber-100">Estate Specialists</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Home className="w-8 h-8 mb-4 text-amber-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">New Build</div>
                  <div className="text-amber-100">QBCC Experts</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Zap className="w-8 h-8 mb-4 text-amber-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Smart Home</div>
                  <div className="text-amber-100">System Protection</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                  <Clock className="w-8 h-8 mb-4 text-amber-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">30min</div>
                  <div className="text-amber-100">Response Time</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-centre gap-3 shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Luxury Estate Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Disaster Recovery in Brookwater</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Brookwater's prestigious master-planned golf course community represents Queensland's premium lifestyle destination. From championship course frontage mansions to modern architectural homes and smart technology estates, this Greater Springfield jewel faces unique challenges including new construction defects, smart home system protection, premium finish preservation, and golf course irrigation coordination. Master Restorer Phill McGurk brings specialised luxury property experience to Brookwater, understanding the critical importance of QBCC warranty preservation, builder coordination, and resort-grade restoration standards.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team responds within 30-35 minutes to Brookwater emergencies from our Wacol operations, equipped with premium material expertise, smart home system protection protocols, and relationships with luxury suppliers for imported tiles, engineered timber, and designer fixtures. We understand Brookwater's Greg Norman championship golf course environment, builder networks, and the expectation for restoration that matches the community's exceptional standards.
              </p>
            </div>
          </div>
        </section>

        {/* Brookwater Precincts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brookwater Estate Precincts
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services across Brookwater's luxury communities,
                from championship golf frontage to modern architectural estates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {brookwaterPrecincts.map((precinct, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-amber-600">
                  <div className="flex items-centre justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {precinct.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      precinct.constructionRisk.includes('Medium') ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {precinct.constructionRisk.split(' - ')[0]}
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
                          <div key={idx} className="text-sm bg-amber-50 text-amber-800 px-3 py-1 rounded">
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

        {/* Luxury Services */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <Shield className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Luxury Estate Restoration Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised services designed for Brookwater's championship golf estates
                and premium new construction properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {luxuryServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-amber-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-centre gap-4 mb-6">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-centre justify-centre">
                        <IconComponent className="w-6 h-6 text-amber-600" />
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
                Brookwater Property Risk Management
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive risk assessment and management protocols for Brookwater's
                luxury estates and new construction properties.
              </p>
            </div>

            <div className="space-y-8">
              {brookwaterRisks.map((risk, index) => (
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

        {/* Brookwater Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Brookwater Golf Estate Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {brookwaterFeatures.map((feature, index) => (
                  <div key={index} className="flex items-centre gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Trophy className="w-5 h-5 text-amber-600 flex-shrink-0" />
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
              {brookwaterFAQ.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-600 cursor-pointer"
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
            <Trophy className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Brookwater Luxury Estate Emergency? Championship Course Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Golf course estates require immediate response to protect premium finishes and smart home systems.
              Our Master Restorer team provides rapid luxury property restoration and specialised care to preserve
              your valuable Brookwater championship course estate investment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Phone className="w-5 h-5" />
                Luxury Estate Emergency: 1300 309 361
              </Link>
              <Link
                href="/emergency-guide"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors inline-flex items-centre justify-centre gap-3"
              >
                <Shield className="w-5 h-5" />
                Property Protection Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-centre text-gray-900 mb-8">
              Additional Greater Springfield Areas We Serve
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/karalee"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-emerald-600"
              >
                <Home className="w-8 h-8 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Karalee</h4>
                <p className="text-gray-600 text-sm">Riverside estates and golf course homes</p>
              </Link>
              <Link
                href="/springfield-lakes"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-blue-600"
              >
                <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Springfield Lakes</h4>
                <p className="text-gray-600 text-sm">Lakeside modern community</p>
              </Link>
              <Link
                href="/augustine-heights"
                className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-centre border-t-4 border-purple-600"
              >
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Augustine Heights</h4>
                <p className="text-gray-600 text-sm">Growing family neighborhoods</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
