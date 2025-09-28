import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Waves, Anchor, Ship, Home, TreePine, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Redlands Bayside Water Damage Restoration | Gumdale Sheldon Wellington Point | Marine Specialist',
  description: 'Professional water damage restoration for Redlands bayside properties. Gumdale, Sheldon, Wellington Point, Cleveland, Thornlands. Marine specialist with salt water flood expertise. Master Restorer certified.',
  keywords: 'Redlands water damage restoration, Gumdale flood recovery, Sheldon marine water damage, Wellington Point storm surge, Cleveland waterfront restoration, Thornlands bayside emergency, Raby Bay canal restoration',
  openGraph: {
    title: 'Redlands Bayside Water Damage Restoration | Marine Specialist',
    description: 'Professional bayside water damage restoration with marine and salt water flood expertise across Redlands.',
    url: 'https://dr-new-ten.vercel.app/redlands-bayside',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Redlands Bayside Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/redlands-bayside'
  }
};

const baysideAreas = [
  {
    name: 'Gumdale',
    medianPrice: '$1,400,000',
    characteristics: 'Bayside luxury, water access, established wealth',
    waterRisks: ['King tide flooding', 'Storm surge', 'Marina overflow', 'Creek flooding'],
    responseTime: '25 minutes',
    properties: 'Waterfront homes, canal estates, luxury residential'
  },
  {
    name: 'Sheldon',
    medianPrice: '$850,000',
    characteristics: 'Family bayside living, boat access, growth area',
    waterRisks: ['Tidal flooding', 'Heavy rain flooding', 'Boat ramp overflow'],
    responseTime: '20 minutes',
    properties: 'Family homes, waterfront properties, new developments'
  },
  {
    name: 'Wellington Point',
    medianPrice: '$950,000',
    characteristics: 'Bayside views, ferry access, premium location',
    waterRisks: ['Storm surge', 'King tides', 'Ferry terminal flooding'],
    responseTime: '25 minutes',
    properties: 'Bayside homes, view properties, heritage Queenslanders'
  },
  {
    name: 'Cleveland',
    medianPrice: '$750,000',
    characteristics: 'Transport hub, bayside access, commercial center',
    waterRisks: ['CBD flooding', 'Ferry terminal overflow', 'Creek systems'],
    responseTime: '20 minutes',
    properties: 'Mixed residential/commercial, waterfront units, period homes'
  },
  {
    name: 'Thornlands',
    medianPrice: '$820,000',
    characteristics: 'Family suburbs, water views, established community',
    waterRisks: ['Flash flooding', 'Creek overflow', 'Storm water issues'],
    responseTime: '22 minutes',
    properties: 'Family homes, acreage blocks, executive housing'
  },
  {
    name: 'Raby Bay',
    medianPrice: '$2,200,000',
    characteristics: 'Luxury canal estate, marina, prestige location',
    waterRisks: ['Canal flooding', 'Marina overflow', 'Salt water intrusion'],
    responseTime: '30 minutes',
    properties: 'Canal front mansions, luxury apartments, marina facilities'
  }
];

const marineSpecialties = [
  {
    title: 'Salt Water Flood Restoration',
    description: 'Specialized techniques for salt water damage from storm surge, king tides, and marina overflow. Corrosion prevention and marine-grade restoration.',
    icon: Waves,
    expertise: ['Corrosion treatment', 'Salt extraction', 'Marine-grade materials', 'Electrical system protection'],
    urgency: 'Critical - 4 hours'
  },
  {
    title: 'Canal Estate Emergency Response',
    description: 'Rapid response for luxury canal properties with specialized equipment for waterfront access and marine environment challenges.',
    icon: Anchor,
    expertise: ['Boat access capability', 'Seawall assessment', 'Marina coordination', 'Luxury finishing restoration'],
    urgency: 'High - 6 hours'
  },
  {
    title: 'Marina & Waterfront Facilities',
    description: 'Commercial and residential marina facility restoration including boat sheds, workshops, and waterfront infrastructure.',
    icon: Ship,
    expertise: ['Marina electrical systems', 'Boat shed restoration', 'Pier and jetty assessment', 'Marine equipment protection'],
    urgency: 'Medium - 24 hours'
  },
  {
    title: 'Bayside Heritage Properties',
    description: 'Specialized restoration for heritage Queenslanders and period homes in bayside locations with heritage compliance.',
    icon: Home,
    expertise: ['Heritage material sourcing', 'Council compliance', 'Period restoration techniques', 'Character preservation'],
    urgency: 'Medium - 48 hours'
  }
];

const islandServices = [
  {
    name: 'Russell Island',
    population: '3,400',
    access: 'Water taxi, barge access',
    logistics: '2x service premium',
    challenges: ['Limited vehicle access', 'Equipment transport', 'Accommodation logistics', 'Weather dependency']
  },
  {
    name: 'Macleay Island',
    population: '2,800',
    access: 'Vehicle ferry, water taxi',
    logistics: '1.8x service premium',
    challenges: ['Ferry scheduling', 'Equipment transport', 'Limited local resources', 'Storm access']
  },
  {
    name: 'Lamb Island',
    population: '400',
    access: 'Water taxi only',
    logistics: '2.5x service premium',
    challenges: ['Water taxi transport', 'Equipment limitations', 'Seasonal access', 'Remote coordination']
  },
  {
    name: 'Karragarra Island',
    population: '200',
    access: 'Private boat, water taxi',
    logistics: '3x service premium',
    challenges: ['Private boat access', 'Equipment constraints', 'Limited infrastructure', 'Emergency coordination']
  }
];

const redlandsFeatures = [
  'Marine-grade corrosion treatment and prevention',
  'Salt water extraction and neutralization protocols',
  'Boat and water taxi access for island properties',
  'Storm surge and king tide emergency response',
  'Marina and waterfront facility restoration',
  'Heritage Queenslander period restoration',
  'Canal estate luxury property specialization',
  'Bay island logistics and premium service coordination'
];

export default function RedlandsBaysidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/redlands-bayside',
    name: 'Disaster Recovery Redlands Bayside Marine Specialists',
    image: 'https://dr-new-ten.vercel.app/images/redlands-bayside-restoration.jpg',
    description: 'Professional water damage restoration for Redlands bayside properties including Gumdale, Sheldon, Wellington Point, Cleveland, Thornlands, and bay islands. Marine specialist with salt water flood expertise.',
    url: 'https://dr-new-ten.vercel.app/redlands-bayside',
    telephone: '1300309361',
    email: 'marine@disasterrecovery.com.au',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Redlands Bayside',
      addressLocality: 'Redlands',
      addressRegion: 'QLD',
      postalCode: '4160',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.5598',
      longitude: '153.2569'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Redlands',
        sameAs: 'https://en.wikipedia.org/wiki/Redland_City'
      },
      {
        '@type': 'Neighborhood',
        name: 'Gumdale'
      },
      {
        '@type': 'Neighborhood',
        name: 'Sheldon'
      },
      {
        '@type': 'Neighborhood',
        name: 'Wellington Point'
      },
      {
        '@type': 'Neighborhood',
        name: 'Cleveland'
      },
      {
        '@type': 'Neighborhood',
        name: 'Thornlands'
      },
      {
        '@type': 'Neighborhood',
        name: 'Raby Bay'
      },
      {
        '@type': 'Place',
        name: 'Russell Island'
      },
      {
        '@type': 'Place',
        name: 'Macleay Island'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bayside Marine Restoration Services',
      itemListElement: marineSpecialties.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Redlands+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Credit Card, Cash, Marine Insurance',
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
    priceRange: '$15,000-$150,000+',
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
        <section className="relative bg-gradient-to-r from-blue-900 via-teal-900 to-cyan-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Waves className="w-12 h-12 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Marine Specialist • Salt Water Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Redlands Bayside Water Damage
                <span className="block text-cyan-400">Marine Restoration Specialists</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional water damage restoration for Redlands bayside properties including Gumdale, Sheldon,
                Wellington Point, Cleveland, Thornlands, and bay islands. <strong>Master Restorer Phill McGurk</strong> -
                specialist in salt water flooding, storm surge recovery, and marine environment restoration.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Waves className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Marine</div>
                  <div className="text-blue-100">Specialist</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">20min</div>
                  <div className="text-blue-100">Bayside Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Ship className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Island</div>
                  <div className="text-blue-100">Access Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Award className="w-8 h-8 mb-4 text-cyan-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Salt Water</div>
                  <div className="text-blue-100">Expertise</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Marine Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Bayside Areas Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Redlands Bayside Service Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive water damage restoration across all Redlands bayside communities,
                from luxury canal estates to family waterfront properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {baysideAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-b-4 border-cyan-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                    <Waves className="w-6 h-6 text-cyan-600" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Median Property Value:</span>
                      <div className="font-bold text-green-600">{area.medianPrice}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-sm text-gray-700">{area.characteristics}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Property Types:</span>
                      <div className="text-sm text-gray-700">{area.properties}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Response Time:</span>
                      <div className="font-semibold text-blue-600">{area.responseTime}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Water Damage Risks:</span>
                    <div className="space-y-1">
                      {area.waterRisks.map((risk, idx) => (
                        <div key={idx} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marine Specialties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Anchor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Marine Environment Restoration Specialties
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized protocols for bayside and marine water damage restoration,
                including salt water flooding, storm surge recovery, and marina facilities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {marineSpecialties.map((specialty, index) => {
                const IconComponent = specialty.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-cyan-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-cyan-600" />
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

        {/* Bay Island Services */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Ship className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bay Island Emergency Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized logistics and premium service for Russell Island, Macleay Island,
                and remote bay island properties requiring boat or water taxi access.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {islandServices.map((island, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{island.name}</h3>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      {island.logistics}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Population:</span>
                      <div className="font-semibold text-gray-700">{island.population}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Access Method:</span>
                      <div className="text-sm text-gray-700">{island.access}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Service Challenges:</span>
                    <div className="space-y-1">
                      {island.challenges.map((challenge, idx) => (
                        <div key={idx} className="text-xs bg-yellow-50 text-yellow-800 px-2 py-1 rounded">
                          {challenge}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Island Service Logistics</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Equipment Transport</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Portable extraction and drying equipment</li>
                    <li>• Boat-transportable generator systems</li>
                    <li>• Waterproof equipment protection</li>
                    <li>• Emergency supply coordination</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Service Coordination</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Weather-dependent scheduling</li>
                    <li>• Ferry and water taxi coordination</li>
                    <li>• Local accommodation arrangements</li>
                    <li>• Emergency evacuation protocols</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redlands Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Redlands Bayside Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {redlandsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Waves className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Marine Expertise */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Marine Environment Restoration Mastery
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Phill McGurk's Master Restorer certification includes specialized training in marine environment
                restoration. Our understanding of salt water corrosion, tidal patterns, and bayside property
                challenges ensures optimal restoration outcomes for Redlands waterfront properties.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Droplets className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Salt Water Expertise</h3>
                  <p className="text-gray-300 text-sm">Corrosion prevention and marine restoration</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Ship className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Island Access Capability</h3>
                  <p className="text-gray-300 text-sm">Boat and water taxi logistics coordination</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Anchor className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Marina Facility Knowledge</h3>
                  <p className="text-gray-300 text-sm">Waterfront infrastructure restoration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Waves className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Bayside Emergency? Marine Specialist Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Salt water flooding and storm surge require immediate specialized response to prevent
              long-term corrosion damage. Our marine restoration expert responds immediately to
              protect your bayside property investment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Marine Emergency: 1300 309 361
              </Link>
              <Link
                href="/emergency/steps"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5" />
                Emergency Response Steps
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Service Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/samford-valley"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <TreePine className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Hinterland Luxury</h4>
                <p className="text-gray-600">Samford Valley, Upper Brookfield, Ocean View estates</p>
              </Link>
              <Link
                href="/brisbane"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Brisbane Premium</h4>
                <p className="text-gray-600">Hamilton, Ascot, New Farm, Toowong</p>
              </Link>
              <Link
                href="/services/wine-cellar-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Specialty Services</h4>
                <p className="text-gray-600">Wine cellars, art collections, climate control</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}