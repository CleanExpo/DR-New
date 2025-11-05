import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Crown, Waves, Home, Anchor, TreePine, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hamilton Water Damage Restoration | Riverfront Mansion Specialists | Executive Emergency Response',
  description: 'Professional water damage restoration Hamilton Brisbane. Riverfront mansion specialists, executive property experts, CEO residence emergency response. Phill McGurk - IICRC Master Restorer.',
  keywords: 'Hamilton water damage restoration, riverfront mansion flooding, executive property emergency, Brisbane River luxury homes, Hamilton luxury restoration, CEO residence water damage',
  openGraph: {
    title: 'Hamilton Water Damage Restoration | Riverfront Mansion Specialists',
    description: 'Professional ultra-luxury property restoration in Hamilton with riverfront expertise and executive home specialization.',
    url: 'https://dr-new-ten.vercel.app/brisbane/hamilton',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Hamilton Luxury Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brisbane/hamilton'
  }
};

const hamiltonPrecincts = [
  {
    area: 'Riverfront Mansions',
    characteristics: 'Brisbane River frontage, luxury estates, private jetties',
    propertyTypes: ['Riverfront mansions', 'Executive estates', 'Luxury compounds'],
    floodRisk: 'Very High - Prime flood zone',
    medianPrice: '$3,500,000',
    responseTime: '15 minutes',
    residents: 'CEOs, business leaders, executives'
  },
  {
    area: 'Hamilton Reach',
    characteristics: 'High-rise luxury, river views, marina access',
    propertyTypes: ['Luxury penthouses', 'High-rise apartments', 'Marina berths'],
    floodRisk: 'Medium - Elevated construction',
    medianPrice: '$2,800,000',
    responseTime: '18 minutes',
    residents: 'Corporate executives, professionals'
  },
  {
    area: 'Executive Hills',
    characteristics: 'Elevated luxury homes, city views, established wealth',
    propertyTypes: ['Executive homes', 'Luxury residences', 'View properties'],
    floodRisk: 'Low - Elevated location',
    medianPrice: '$2,200,000',
    responseTime: '20 minutes',
    residents: 'Senior executives, established families'
  },
  {
    area: 'Marina Precinct',
    characteristics: 'Waterfront living, boat access, luxury lifestyle',
    propertyTypes: ['Marina apartments', 'Waterfront townhouses', 'Boat facilities'],
    floodRisk: 'High - Water proximity',
    medianPrice: '$1,950,000',
    responseTime: '16 minutes',
    residents: 'Marine enthusiasts, luxury lifestyle'
  }
];

const executiveServices = [
  {
    title: 'CEO & Executive Emergency Response',
    description: 'Priority response for business leaders with executive scheduling and minimal disruption protocols.',
    icon: Crown,
    urgency: 'Critical - 30 minutes',
    features: ['Executive scheduling accommodation', 'Discrete service protocols', 'Business continuity planning', 'Corporate reputation protection']
  },
  {
    title: 'Riverfront Mansion Restoration',
    description: 'specialised restoration for luxury riverfront properties with flood zone expertise and premium finishes.',
    icon: Waves,
    urgency: 'Critical - 1 hour',
    features: ['Flood zone rapid response', 'Luxury finish restoration', 'Private jetty coordination', 'Premium material sourcing']
  },
  {
    title: 'High-Rise Luxury Apartments',
    description: 'Building management coordination for luxury high-rise properties with premium service standards.',
    icon: Building,
    urgency: 'High - 2 hours',
    features: ['Building management liaison', 'High-rise equipment access', 'Luxury apartment restoration', 'Strata coordination']
  },
  {
    title: 'Executive Home Technology',
    description: 'Protection and restoration of smart home systems, executive offices, and high-tech installations.',
    icon: Shield,
    urgency: 'High - 3 hours',
    features: ['Smart home system protection', 'Executive office restoration', 'Technology equipment recovery', 'Data protection protocols']
  }
];

const hamiltonRisks = [
  {
    risk: 'Brisbane River Major Flooding',
    properties: 'Riverfront mansions, ground-floor facilities',
    response: 'Immediate evacuation coordination, emergency pumping, valuable asset protection',
    mitigation: 'Flood barriers, early warning systems, emergency equipment pre-positioning'
  },
  {
    risk: 'Luxury Finish Water Damage',
    properties: 'High-end materials, custom finishes, imported elements',
    response: 'Specialist material assessment, custom restoration techniques, supplier coordination',
    mitigation: 'Regular maintenance, protective treatments, insurance upgrades'
  },
  {
    risk: 'Executive Business Disruption',
    properties: 'Home offices, conference facilities, business operations',
    response: 'Alternative accommodation, business continuity support, technology recovery',
    mitigation: 'Backup systems, emergency protocols, service provider networks'
  }
];

const hamiltonFeatures = [
  'Executive priority response within 30 minutes',
  'Brisbane River flood zone specialised protocols',
  'Luxury mansion restoration with premium materials',
  'Private jetty and marina facility coordination',
  'High-rise building management liaison services',
  'Smart home and executive technology protection',
  'Discrete service for high-profile residents',
  'Corporate reputation and privacy protection'
];

export default function HamiltonPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/brisbane/hamilton',
    name: 'Disaster Recovery Hamilton Executive Specialists',
    image: 'https://dr-new-ten.vercel.app/images/hamilton-mansion-restoration.jpg',
    description: 'Professional water damage restoration for Hamilton riverfront mansions and executive properties. Luxury home specialists with Brisbane River flood expertise.',
    url: 'https://dr-new-ten.vercel.app/brisbane/hamilton',
    telephone: '1300309361',
    email: 'hamilton@dr-new-ten.vercel.app',
    priceRange: '$100,000-$500,000+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Hamilton District',
      addressLocality: 'Hamilton',
      addressRegion: 'QLD',
      postalCode: '4007',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.4431',
      longitude: '153.0615'
    },
    areaServed: [
      {
        '@type': 'Neighborhood',
        name: 'Hamilton',
        sameAs: 'https://en.wikipedia.org/wiki/Hamilton,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'Hamilton Riverfront Mansions'
      },
      {
        '@type': 'Place',
        name: 'Hamilton Reach'
      },
      {
        '@type': 'Place',
        name: 'Hamilton Executive Hills'
      },
      {
        '@type': 'Place',
        name: 'Hamilton Marina Precinct'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hamilton Executive Restoration Services',
      itemListElement: executiveServices.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Hamilton+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Corporate Accounts, Private Pay',
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
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1',
      bestRating: '5',
      worstRating: '5'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gold-900 via-blue-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-centre">
              <div className="flex items-centre justify-centre gap-3 mb-6">
                <Crown className="w-12 h-12 text-gold-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-gold-500 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Executive Specialist • Riverfront Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Hamilton Riverfront Mansion
                <span className="block text-gold-400">Executive Emergency Response</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Hamilton's riverfront mansions and executive properties.
                <strong> Master Restorer Phill McGurk</strong> - specialised in luxury homes, business leader
                schedules, and Brisbane River flood zone rapid response.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Crown className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Executive</div>
                  <div className="text-gold-100">Priority Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Waves className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">$3.5M</div>
                  <div className="text-gold-100">Mansion Median</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Anchor className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Jetty</div>
                  <div className="text-gold-100">Access Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">15min</div>
                  <div className="text-gold-100">CEO Response</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-centre gap-3"
              >
                <Phone className="w-6 h-6" />
                Executive Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Hamilton Precincts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hamilton Premium Precincts
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services across Hamilton's luxury precincts,
                from riverfront mansions to executive high-rise living.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hamiltonPrecincts.map((precinct, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-gold-600">
                  <div className="flex items-centre justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {precinct.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      precinct.floodRisk.includes('Very High') ? 'bg-red-200 text-red-900' :
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
                          <div key={idx} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded">
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

        {/* Executive Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Executive & Luxury Property Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services designed for Hamilton's business leaders,
                executives, and luxury property owners.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {executiveServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-centre gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-centre justify-centre">
                        <IconComponent className="w-6 h-6 text-purple-600" />
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
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hamilton Water Damage Risk Management
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive risk assessment and management protocols for Hamilton's
                unique luxury property challenges.
              </p>
            </div>

            <div className="space-y-8">
              {hamiltonRisks.map((risk, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
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

        {/* Hamilton Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Hamilton Executive Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {hamiltonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-centre gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Crown className="w-5 h-5 text-gold-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-centre">
            <Crown className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Hamilton Executive Emergency? Priority Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Executive properties and business leader schedules require immediate, discrete response.
              Our Master Restorer provides priority service to protect Hamilton's most valuable
              properties and maintain business continuity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-centre justify-centre gap-3"
              >
                <Phone className="w-5 h-5" />
                Executive Emergency: 1300 309 361
              </Link>
              <Link
                href="/professionals"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-centre justify-centre gap-3"
              >
                <Shield className="w-5 h-5" />
                Discrete Professional Service
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-centre text-gray-900 mb-8">
              Additional Brisbane Premium Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/brisbane/new-farm"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <Home className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">New Farm</h4>
                <p className="text-gray-600">Heritage Queenslanders and gallery district</p>
              </Link>
              <Link
                href="/brisbane/ascot"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Ascot</h4>
                <p className="text-gray-600">Racecourse precinct luxury estates</p>
              </Link>
              <Link
                href="/samford-valley"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <TreePine className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Samford Valley</h4>
                <p className="text-gray-600">Hinterland luxury estates and wine cellars</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}