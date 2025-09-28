import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Home, Waves, Palette, TreePine, Crown, Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Farm Water Damage Restoration | Heritage Queenslander Specialists | Riverfront Emergency',
  description: 'Professional water damage restoration New Farm Brisbane. Heritage Queenslander specialists, riverfront property experts, art gallery district emergency response. Master Restorer certified for luxury heritage homes.',
  keywords: 'New Farm water damage restoration, heritage Queenslander flooding, riverfront property emergency, Brisbane River flood recovery, heritage home restoration New Farm, luxury property water damage',
  openGraph: {
    title: 'New Farm Water Damage Restoration | Heritage Queenslander Specialists',
    description: 'Professional heritage property restoration in New Farm with riverfront expertise and luxury home specialization.',
    url: 'https://dr-new-ten.vercel.app/brisbane/new-farm',
    type: 'website',
    locale: 'en_AU',
    siteName: 'New Farm Heritage Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brisbane/new-farm'
  }
};

const newFarmDistricts = [
  {
    area: 'Riverfront Precinct',
    characteristics: 'Brisbane River frontage, luxury apartments, heritage homes',
    propertyTypes: ['Riverfront mansions', 'Luxury apartments', 'Heritage Queenslanders'],
    floodRisk: 'High - 1974/2011 flood zones',
    medianPrice: '$2,800,000',
    responseTime: '18 minutes'
  },
  {
    area: 'Art Gallery District',
    characteristics: 'Cultural hub, gallery spaces, converted warehouses',
    propertyTypes: ['Gallery spaces', 'Converted warehouses', 'Artist studios'],
    floodRisk: 'Medium - Creek proximity',
    medianPrice: '$1,950,000',
    responseTime: '20 minutes'
  },
  {
    area: 'Heritage Core',
    characteristics: 'Historic Queenslanders, character homes, tree-lined streets',
    propertyTypes: ['Heritage Queenslanders', 'Character cottages', 'Period renovations'],
    floodRisk: 'Low-Medium - Elevated areas',
    medianPrice: '$2,200,000',
    responseTime: '22 minutes'
  },
  {
    area: 'Powerhouse Precinct',
    characteristics: 'Cultural venues, event spaces, waterfront dining',
    propertyTypes: ['Event venues', 'Commercial spaces', 'Hospitality venues'],
    floodRisk: 'High - River proximity',
    medianPrice: '$2,500,000',
    responseTime: '15 minutes'
  }
];

const heritageSpecialties = [
  {
    title: 'Heritage Queenslander Restoration',
    description: 'Specialized restoration for heritage-listed and character Queenslander homes with council compliance.',
    icon: Home,
    urgency: 'High - 4 hours',
    expertise: ['Heritage material sourcing', 'Council approval processes', 'Period-appropriate techniques', 'Character preservation']
  },
  {
    title: 'Riverfront Flood Recovery',
    description: 'Expert Brisbane River flood response with understanding of tidal patterns and historical flood zones.',
    icon: Waves,
    urgency: 'Critical - 2 hours',
    expertise: ['Flood zone expertise', 'River pattern knowledge', 'Rapid water extraction', 'Flood prevention planning']
  },
  {
    title: 'Art Gallery & Cultural Spaces',
    description: 'Specialized restoration for gallery spaces, artist studios, and cultural venues with collection protection.',
    icon: Palette,
    urgency: 'Critical - 1 hour',
    expertise: ['Art collection protection', 'Gallery space restoration', 'Climate control systems', 'Cultural compliance']
  },
  {
    title: 'Luxury Apartment Complexes',
    description: 'High-rise and luxury apartment restoration with strata coordination and premium finishes.',
    icon: Crown,
    urgency: 'High - 3 hours',
    expertise: ['Strata body coordination', 'High-rise access', 'Luxury finish restoration', 'Building management liaison']
  }
];

const newFarmRisks = [
  {
    risk: 'Brisbane River Flooding',
    likelihood: 'High during severe weather',
    impact: 'Severe - Ground floor and basement flooding',
    prevention: ['Flood barriers', 'Pump systems', 'Early warning monitoring'],
    response: 'Immediate evacuation of valuables, emergency pumping, heritage material protection'
  },
  {
    risk: 'Heritage Building Structural Issues',
    likelihood: 'Medium with age and weather',
    impact: 'High - Structural integrity and council compliance',
    prevention: ['Regular heritage inspections', 'Preventive maintenance', 'Weather protection'],
    response: 'Heritage-compliant emergency stabilization, council notification, specialist assessment'
  },
  {
    risk: 'Art Collection Water Damage',
    likelihood: 'Medium in gallery district',
    impact: 'Very High - Irreplaceable cultural assets',
    prevention: ['Climate control systems', 'Water detection', 'Collection insurance'],
    response: 'Emergency art stabilization, museum-grade recovery, insurance documentation'
  }
];

const newFarmFeatures = [
  'Heritage Queenslander specialized restoration techniques',
  'Brisbane River flood zone rapid response protocols',
  'Art gallery and cultural space emergency services',
  'Council heritage compliance and approval coordination',
  'Luxury riverfront property specialized equipment',
  'Character home period-appropriate material sourcing',
  'Strata body and building management coordination',
  'High-value art and antique collection protection'
];

export default function NewFarmPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/brisbane/new-farm',
    name: 'Disaster Recovery New Farm Heritage Specialists',
    image: 'https://dr-new-ten.vercel.app/images/new-farm-heritage-restoration.jpg',
    description: 'Professional water damage restoration for New Farm heritage properties, riverfront homes, and cultural spaces. Heritage Queenslander specialists with Brisbane River flood expertise.',
    url: 'https://dr-new-ten.vercel.app/brisbane/new-farm',
    telephone: '1300309361',
    email: 'newfarm@disasterrecovery.com.au',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving New Farm District',
      addressLocality: 'New Farm',
      addressRegion: 'QLD',
      postalCode: '4005',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.4649',
      longitude: '153.0450'
    },
    areaServed: [
      {
        '@type': 'Neighborhood',
        name: 'New Farm',
        sameAs: 'https://en.wikipedia.org/wiki/New_Farm,_Queensland'
      },
      {
        '@type': 'Place',
        name: 'New Farm Riverfront Precinct'
      },
      {
        '@type': 'Place',
        name: 'New Farm Art Gallery District'
      },
      {
        '@type': 'Place',
        name: 'New Farm Heritage Core'
      },
      {
        '@type': 'Place',
        name: 'Powerhouse Precinct New Farm'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'New Farm Heritage Restoration Services',
      itemListElement: heritageSpecialties.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=New+Farm+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Heritage Grant Coordination, Private Pay',
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
    priceRange: '$50,000-$300,000+',
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
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 py-3 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/brisbane" className="hover:text-blue-600 transition-colors">
                Brisbane
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">New Farm</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Home className="w-12 h-12 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Heritage Specialist • Riverfront Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                New Farm Heritage Water Damage
                <span className="block text-yellow-400">Restoration Specialists</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for New Farm's heritage Queenslanders, riverfront mansions,
                and cultural spaces. <strong>Master Restorer Phill McGurk</strong> - specialized in heritage
                compliance, Brisbane River flood recovery, and art gallery district emergency response.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Home className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Heritage</div>
                  <div className="text-green-100">Queenslander Expert</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Waves className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">River</div>
                  <div className="text-green-100">Flood Specialist</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Palette className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Gallery</div>
                  <div className="text-green-100">District Expert</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">18min</div>
                  <div className="text-green-100">Riverfront Response</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                New Farm Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* New Farm Districts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                New Farm Districts Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration services across New Farm's distinct precincts,
                from riverfront luxury to heritage cores and cultural districts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {newFarmDistricts.map((district, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-green-600">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {district.area}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      district.floodRisk.includes('High') ? 'bg-red-100 text-red-800' :
                      district.floodRisk.includes('Medium') ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {district.floodRisk.split(' - ')[0]}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-gray-700">{district.characteristics}</div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Property Types:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {district.propertyTypes.map((type, idx) => (
                          <div key={idx} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded">
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-500">Median Price:</span>
                        <div className="font-bold text-green-600">{district.medianPrice}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-blue-600">{district.responseTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Specialties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Crown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                New Farm Heritage & Cultural Specialties
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration services for New Farm's unique heritage properties,
                cultural venues, and luxury riverfront homes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {heritageSpecialties.map((specialty, index) => {
                const IconComponent = specialty.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
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

        {/* Risk Assessment */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                New Farm Water Damage Risk Assessment
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Understanding the unique water damage risks facing New Farm properties
                and our specialized response protocols.
              </p>
            </div>

            <div className="space-y-8">
              {newFarmRisks.map((risk, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{risk.risk}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Likelihood:</span>
                          <div className="font-semibold text-orange-600">{risk.likelihood}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Impact:</span>
                          <div className="font-semibold text-red-600">{risk.impact}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 mb-2 block">Prevention Measures:</span>
                          <div className="space-y-1">
                            {risk.prevention.map((measure, idx) => (
                              <div key={idx} className="text-sm bg-green-50 text-green-800 px-3 py-1 rounded">
                                {measure}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Response Protocol</h4>
                      <p className="text-gray-700">{risk.response}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Farm Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                New Farm Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {newFarmFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Home className="w-5 h-5 text-green-600 flex-shrink-0" />
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
            <Waves className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              New Farm Heritage Emergency? Heritage Specialist Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Heritage properties and cultural assets require specialized care during water damage restoration.
              Our Master Restorer responds immediately with heritage-compliant protocols to preserve
              New Farm's architectural and cultural treasures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                New Farm Emergency: 1300 309 361
              </Link>
              <Link
                href="/services/art-antique-restoration"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
              >
                <Palette className="w-5 h-5" />
                Art Collection Specialists
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Brisbane Premium Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/brisbane/hamilton"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Crown className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Hamilton</h4>
                <p className="text-gray-600">Riverfront mansions and luxury estates</p>
              </Link>
              <Link
                href="/brisbane/ascot"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Star className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Ascot</h4>
                <p className="text-gray-600">Racecourse precinct luxury properties</p>
              </Link>
              <Link
                href="/brisbane/toowong"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Home className="w-8 h-8 text-purple-600 mx-auto mb-4" />
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