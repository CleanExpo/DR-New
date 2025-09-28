import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Crown, TreePine, Home, Camera, Sparkles, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ascot Water Damage Restoration | Racecourse Precinct Luxury | Established Wealth Specialists',
  description: 'Professional water damage restoration Ascot Brisbane. Racecourse precinct luxury estates, established wealth families, equestrian property specialists. Master Restorer certified for prestigious homes.',
  keywords: 'Ascot water damage restoration, racecourse luxury homes, established wealth properties, equestrian estate flooding, Ascot luxury restoration, prestigious home emergency',
  openGraph: {
    title: 'Ascot Water Damage Restoration | Racecourse Precinct Luxury',
    description: 'Professional luxury property restoration in Ascot with racecourse precinct expertise and established wealth specialization.',
    url: 'https://dr-new-ten.vercel.app/brisbane/ascot',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Ascot Luxury Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brisbane/ascot'
  }
};

const ascotEstates = [
  {
    area: 'Racecourse Precinct',
    characteristics: 'Eagle Farm proximity, racing industry connections, established estates',
    propertyTypes: ['Racing industry mansions', 'Equestrian estates', 'Established family homes'],
    floodRisk: 'Medium - Some creek proximity',
    medianPrice: '$3,200,000',
    responseTime: '18 minutes',
    residents: 'Racing industry, established families, equestrian enthusiasts'
  },
  {
    area: 'Aviation Precinct',
    characteristics: 'Brisbane Airport proximity, executive access, luxury developments',
    propertyTypes: ['Executive homes', 'Aviation industry residences', 'Modern luxury'],
    floodRisk: 'Low - Elevated development',
    medianPrice: '$2,600,000',
    responseTime: '20 minutes',
    residents: 'Aviation executives, frequent travelers, business leaders'
  },
  {
    area: 'Established Estates',
    characteristics: 'Large blocks, mature gardens, generational wealth',
    propertyTypes: ['Generational family homes', 'Large estate properties', 'Heritage mansions'],
    floodRisk: 'Low - Elevated locations',
    medianPrice: '$2,800,000',
    responseTime: '22 minutes',
    residents: 'Established families, generational wealth, traditional luxury'
  },
  {
    area: 'Modern Luxury',
    characteristics: 'Contemporary homes, new developments, professional families',
    propertyTypes: ['Contemporary mansions', 'Architect-designed homes', 'Professional residences'],
    floodRisk: 'Very Low - Modern drainage',
    medianPrice: '$2,400,000',
    responseTime: '20 minutes',
    residents: 'Professionals, modern families, luxury lifestyle'
  }
];

const ascotSpecialties = [
  {
    title: 'Racing Industry & Equestrian Properties',
    description: 'Specialized restoration for properties connected to racing industry and equestrian facilities.',
    icon: Trophy,
    urgency: 'High - 3 hours',
    expertise: ['Equestrian facility restoration', 'Racing memorabilia protection', 'Stable and outbuilding repair', 'Industry network coordination']
  },
  {
    title: 'Established Wealth Family Homes',
    description: 'Discrete restoration for established family properties with generational significance and heirloom protection.',
    icon: Crown,
    urgency: 'High - 4 hours',
    expertise: ['Family heirloom protection', 'Generational property care', 'Discrete family service', 'Estate management coordination']
  },
  {
    title: 'Large Estate Properties',
    description: 'Comprehensive restoration for large Ascot estates with multiple buildings and extensive grounds.',
    icon: TreePine,
    urgency: 'Medium - 6 hours',
    expertise: ['Multi-building coordination', 'Estate grounds protection', 'Large-scale equipment deployment', 'Grounds maintenance liaison']
  },
  {
    title: 'Luxury Collection & Memorabilia',
    description: 'Specialized protection for racing memorabilia, luxury collections, and high-value personal items.',
    icon: Sparkles,
    urgency: 'Critical - 2 hours',
    expertise: ['Racing memorabilia conservation', 'Luxury collection protection', 'High-value item documentation', 'Specialist storage coordination']
  }
];

const ascotFeatures = [
  'Racing industry and equestrian property expertise',
  'Established wealth family discrete service protocols',
  'Large estate multi-building coordination',
  'Racing memorabilia and luxury collection protection',
  'Estate management and grounds maintenance liaison',
  'Generational family heirloom preservation',
  'Aviation industry executive scheduling accommodation',
  'Traditional luxury and heritage property restoration'
];

const establishedWealthProtocols = [
  {
    protocol: 'Family Privacy Protection',
    description: 'Comprehensive privacy protocols for established families with public profiles',
    implementation: ['Discrete service vehicles', 'Staff confidentiality agreements', 'Media protection', 'Family liaison coordination']
  },
  {
    protocol: 'Generational Heirloom Care',
    description: 'Specialized handling of family heirlooms and generationally significant items',
    implementation: ['Heritage item identification', 'Specialist conservation', 'Family consultation', 'Restoration documentation']
  },
  {
    protocol: 'Estate Management Integration',
    description: 'Coordination with existing estate management and staff structures',
    implementation: ['Estate manager liaison', 'Staff coordination', 'Service integration', 'Ongoing maintenance planning']
  }
];

export default function AscotPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/brisbane/ascot',
    name: 'Disaster Recovery Ascot Luxury Estate Specialists',
    image: 'https://dr-new-ten.vercel.app/images/ascot-estate-restoration.jpg',
    description: 'Professional water damage restoration for Ascot luxury estates, racecourse precinct properties, and established wealth families. Equestrian and racing industry specialists.',
    url: 'https://dr-new-ten.vercel.app/brisbane/ascot',
    telephone: '1300309361',
    email: 'ascot@disasterrecovery.com.au',
    priceRange: '$75,000-$400,000+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Ascot District',
      addressLocality: 'Ascot',
      addressRegion: 'QLD',
      postalCode: '4007',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.4297',
      longitude: '153.0635'
    },
    areaServed: [
      {
        '@type': 'Neighborhood',
        name: 'Ascot',
        sameAs: 'https://en.wikipedia.org/wiki/Ascot,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'Ascot Racecourse Precinct'
      },
      {
        '@type': 'Place',
        name: 'Ascot Aviation Precinct'
      },
      {
        '@type': 'Place',
        name: 'Ascot Established Estates'
      },
      {
        '@type': 'Place',
        name: 'Eagle Farm Racecourse Area'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ascot Estate Restoration Services',
      itemListElement: ascotSpecialties.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Ascot+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Estate Accounts, Private Pay',
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
        <section className="relative bg-gradient-to-r from-purple-900 via-gold-900 to-green-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-12 h-12 text-gold-400" />
                <span className="bg-gradient-to-r from-gold-400 to-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Established Wealth • Racing Precinct
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ascot Luxury Estate Water Damage
                <span className="block text-gold-400">Restoration Specialists</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Ascot's luxury estates, racecourse precinct properties,
                and established wealth families. <strong>Master Restorer Phill McGurk</strong> - specialized
                in equestrian properties, racing industry connections, and generational family homes.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Trophy className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Racing</div>
                  <div className="text-purple-100">Industry Expert</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Crown className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">$3.2M</div>
                  <div className="text-purple-100">Estate Median</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <TreePine className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Large</div>
                  <div className="text-purple-100">Estate Properties</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-gold-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">18min</div>
                  <div className="text-purple-100">Precinct Response</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Ascot Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Ascot Estates */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ascot Luxury Estate Precincts
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration services across Ascot's distinguished precincts,
                from racing industry estates to established family properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {ascotEstates.map((estate, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-purple-600">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {estate.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      estate.floodRisk.includes('Medium') ? 'bg-orange-100 text-orange-800' :
                      estate.floodRisk.includes('Low') ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {estate.floodRisk.split(' - ')[0]}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-gray-700">{estate.characteristics}</div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Property Types:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {estate.propertyTypes.map((type, idx) => (
                          <div key={idx} className="text-sm bg-purple-50 text-purple-800 px-3 py-1 rounded">
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500">Typical Residents:</span>
                      <div className="text-sm text-gray-700 italic">{estate.residents}</div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-500">Median Price:</span>
                        <div className="font-bold text-green-600">{estate.medianPrice}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-blue-600">{estate.responseTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ascot Specialties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ascot Estate Restoration Specialties
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration services for Ascot's unique property types,
                racing industry connections, and established wealth requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {ascotSpecialties.map((specialty, index) => {
                const IconComponent = specialty.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-gold-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {specialty.title}
                        </h3>
                        <span className="text-sm font-bold text-red-600">{specialty.urgency}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {specialty.description}
                    </p>

                    <div>
                      <span className="text-sm text-gray-500 mb-3 block">Specialized Expertise:</span>
                      <div className="space-y-2">
                        {specialty.expertise.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{skill}</span>
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

        {/* Established Wealth Protocols */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Established Wealth Service Protocols
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized service protocols designed for Ascot's established families
                and generational wealth requirements.
              </p>
            </div>

            <div className="space-y-8">
              {establishedWealthProtocols.map((protocol, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{protocol.protocol}</h3>
                  <p className="text-gray-600 mb-6">{protocol.description}</p>

                  <div>
                    <span className="text-sm text-gray-500 mb-3 block">Implementation Steps:</span>
                    <div className="grid md:grid-cols-2 gap-4">
                      {protocol.implementation.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ascot Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Ascot Estate Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {ascotFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Trophy className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Ascot Estate Emergency? Racing Industry Specialist Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Ascot's established families and racing industry properties require discrete, expert care.
              Our Master Restorer understands the unique requirements of equestrian facilities,
              racing memorabilia, and generational family estates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Ascot Emergency: 1300 309 361
              </Link>
              <Link
                href="/professionals"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
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
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Brisbane Luxury Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/brisbane/hamilton"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Crown className="w-8 h-8 text-gold-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Hamilton</h4>
                <p className="text-gray-600">Riverfront mansions and executive properties</p>
              </Link>
              <Link
                href="/brisbane/new-farm"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Home className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">New Farm</h4>
                <p className="text-gray-600">Heritage Queenslanders and cultural district</p>
              </Link>
              <Link
                href="/brisbane/toowong"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <TreePine className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Toowong</h4>
                <p className="text-gray-600">Heritage homes and executive residences</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}