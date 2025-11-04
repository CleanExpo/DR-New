import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery Ipswich | 24/7 Emergency Restoration | Master Restorer',
  description: 'Ipswich disaster recovery specialists. 30-45 min response from Wacol HQ. Bremer River flood experts. Serving Springfield Lakes, Brookwater, Karalee, CBD. IICRC Master Restorer. Call 1300 309 361.',
  keywords: 'disaster recovery Ipswich, emergency restoration Ipswich, water damage Ipswich, Ipswich restoration services, flood damage Ipswich, Bremer River flooding, Springfield Lakes restoration, Brookwater emergency services, Karalee disaster recovery, Ipswich CBD restoration',
  openGraph: {
    title: 'Water Damage Restoration Ipswich | Emergency Response | Master Restorer',
    description: 'Professional water damage restoration in Ipswich. Certified Master Restorer with 24/7 emergency response.',
    url: 'https://dr-new-ten.vercel.app/ipswich',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Disaster Recovery Ipswich'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/ipswich'
  }
};

const serviceAreas = [
  { name: 'Ipswich CBD', population: '42,000', riskLevel: 'Medium', responseTime: '25 minutes' },
  { name: 'Springfield Lakes', population: '15,000', riskLevel: 'Low', responseTime: '20 minutes' },
  { name: 'Brookwater', population: '8,500', riskLevel: 'Low', responseTime: '22 minutes' },
  { name: 'Karalee', population: '5,200', riskLevel: 'Medium', responseTime: '28 minutes' },
  { name: 'Ripley', population: '12,000', riskLevel: 'Medium', responseTime: '30 minutes' },
  { name: 'Redbank Plains', population: '18,000', riskLevel: 'High', responseTime: '25 minutes' }
];

const services = [
  {
    title: 'Emergency Water Extraction',
    description: 'Immediate response to burst pipes, flooding, and water emergencies across Ipswich growth corridors.',
    icon: '💧'
  },
  {
    title: 'Flood Damage Restoration',
    description: 'Complete flood recovery for Springfield Lakes, Brookwater, and surrounding new developments.',
    icon: '🏠'
  },
  {
    title: 'Mould Remediation',
    description: 'Professional mould removal and prevention in Queensland\'s humid climate conditions.',
    icon: '🛡️'
  },
  {
    title: 'Fire Damage Restoration',
    description: 'Comprehensive fire and smoke damage restoration for residential and commercial properties.',
    icon: '🔥'
  },
  {
    title: 'Storm Damage Repair',
    description: 'Rapid response to storm damage across the Ipswich and Logan growth corridor.',
    icon: '⛈️'
  },
  {
    title: 'Insurance Claims Support',
    description: 'Direct insurance billing and claims assistance for all major Australian insurers.',
    icon: '📋'
  }
];

export default function IpswichPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/ipswich',
    name: 'Disaster Recovery Ipswich',
    image: 'https://dr-new-ten.vercel.app/images/disaster-recovery-ipswich.jpg',
    description: 'Professional water damage restoration and emergency disaster recovery services in Ipswich, Springfield Lakes, Brookwater and surrounding areas. Certified Master Restorer with 24/7 emergency response.',
    url: 'https://dr-new-ten.vercel.app/ipswich',
    telephone: '1300309361',
    email: 'emergency@dr-new-ten.vercel.app',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Ipswich Region',
      addressLocality: 'Ipswich',
      addressRegion: 'QLD',
      postalCode: '4305',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.6128',
      longitude: '152.7594'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ipswich',
        sameAs: 'https://en.wikipedia.org/wiki/Ipswich,_Queensland'
      },
      {
        '@type': 'Neighborhood',
        name: 'Springfield Lakes'
      },
      {
        '@type': 'Neighborhood',
        name: 'Brookwater'
      },
      {
        '@type': 'Neighborhood',
        name: 'Karalee'
      },
      {
        '@type': 'Neighborhood',
        name: 'Ripley'
      },
      {
        '@type': 'Neighborhood',
        name: 'Redbank Plains'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Disaster Recovery Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    servesCuisine: null,
    hasMap: 'https://maps.google.com/maps?q=Ipswich+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Credit Card, Cash',
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
    employee: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'Master Restorer',
      hasCredential: 'IICRC Master Restorer Certification'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Organization',
        name: 'Insurance Industry Assessment'
      },
      reviewBody: 'Certified Master Restorer providing professional disaster recovery services across Ipswich growth corridor.'
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
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-12 h-12 text-yellow-400" />
                <span className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold">
                  Master Restorer Certified
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ipswich Water Damage Restoration
              </h1>

              <p className="text-xl mb-8 leading-relaxed">
                Professional disaster recovery services for Ipswich, Springfield Lakes, Brookwater and surrounding growth corridors.
                <strong> Phill McGurk - One of Queensland's Limited Master Restorers.</strong>
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Emergency Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <MapPin className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">30min</div>
                  <div className="text-blue-100">Average Response Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Award className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Insurance Approved</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ipswich Service Coverage Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive disaster recovery coverage across the Ipswich growth corridor,
                including new developments and established communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      area.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      area.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {area.riskLevel} Risk
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="font-semibold">{area.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-semibold text-blue-600">{area.responseTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Disaster Recovery Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From water damage to fire restoration, we provide comprehensive disaster recovery
                services for Ipswich homes and businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-b-4 border-blue-600 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Master Restorer Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Phill McGurk - Master Restorer
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                One of a limited number of Master Restorers in Brisbane & Queensland.
                IICRC certified with extensive experience in disaster recovery across
                the Ipswich and Logan growth corridors.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">IICRC Certified</h3>
                  <p className="text-gray-600">Master level certification in water damage restoration</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Insurance Preferred</h3>
                  <p className="text-gray-600">Trusted by all major Australian insurance companies</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Local Expertise</h3>
                  <p className="text-gray-600">Deep knowledge of Ipswich area conditions and risks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ipswich's Trusted Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Ipswich's Trusted Disaster Recovery Team
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  Based just 15-20 kilometers from Ipswich at our Wacol headquarters, we provide the fastest emergency response
                  times in the Greater Ipswich region. Our team reaches most Ipswich properties within 30-45 minutes of your
                  emergency call, ensuring water damage, fire damage, or storm damage is contained before it spreads.
                </p>

                <p className="text-lg leading-relaxed">
                  Ipswich presents unique disaster recovery challenges that require local expertise. From the historic Bremer River
                  flooding that affected thousands of properties in 2011, 2013, and most recently in 2022, to the heritage
                  Queenslander homes that demand specialized restoration techniques, our team understands the specific needs of
                  Ipswich residents and businesses. We've restored properties across every Ipswich suburb, from the heritage charm
                  of One Mile to the modern developments of Springfield Lakes and Ripley Valley.
                </p>

                <p className="text-lg leading-relaxed">
                  Whether you own a high-value property in Karalee or Brookwater, manage commercial premises in the Ipswich CBD,
                  or need emergency assistance anywhere across the Greater Ipswich region, our <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold">IICRC certified Master Restorer</Link> Phill
                  McGurk and his experienced team deliver professional, reliable disaster recovery services 24 hours a day, 7 days
                  a week. We're insurance approved by all major Australian insurers and maintain the highest industry certifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Ipswich Disasters Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Common Ipswich Disasters We Handle
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">💧</span>
                    Bremer River Flooding
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Bremer River has caused significant flooding in Ipswich throughout history, particularly affecting
                    low-lying areas in the CBD, Booval, and East Ipswich. Our team has extensive experience with flood
                    recovery from the major 2011 and 2013 events, and most recently the 2022 flooding. We understand flood
                    zones, water table issues, and the specific challenges Bremer River flooding presents to Ipswich properties.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">⛈️</span>
                    Flash Flooding & Storms
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ipswich experiences severe weather patterns including flash flooding, intense storms, hail, and destructive
                    winds. Low-lying areas and new developments can experience stormwater management issues during heavy rainfall.
                    Our rapid response team mitigates water ingress, secures properties, and begins immediate restoration work.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏚️</span>
                    Heritage Property Issues
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ipswich is home to beautiful heritage Queenslander homes and historic buildings that require specialized
                    restoration expertise. Older properties face unique challenges including timber rot, water ingress through
                    aged weatherboards, subfloor moisture issues, and structural concerns. Our team has the heritage restoration
                    experience necessary to preserve these valuable properties while meeting modern <Link href="/services/water-damage-restoration" className="text-blue-600 hover:text-blue-700">disaster recovery standards</Link>.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏗️</span>
                    New Development Defects
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The rapid growth in Springfield Lakes, Ripley Valley, and other new developments can lead to construction-related
                    water damage from plumbing defects, poor drainage, or building envelope failures. Our team works with developers,
                    homeowners, and insurers to identify and rectify these issues quickly.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏢</span>
                    Commercial Property Disasters
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ipswich CBD, Riverlink Shopping Centre, and industrial estates require immediate disaster response to minimize
                    business interruption. We provide <Link href="/services/commercial-restoration" className="text-blue-600 hover:text-blue-700">large-scale commercial restoration services</Link> including 24/7 emergency response, business continuity planning,
                    and fast-track restoration to get your business operational quickly.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔥</span>
                    Fire & Smoke Damage
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Fire damage requires immediate professional intervention to prevent further deterioration from smoke, soot,
                    and water used in firefighting efforts. Our certified team provides complete <Link href="/services/fire-damage-restoration" className="text-blue-600 hover:text-blue-700">fire damage restoration</Link> including
                    structural assessment, smoke odor removal, and full property restoration to pre-loss condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ipswich Suburbs We Service */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Comprehensive Coverage Across Greater Ipswich
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                    Central Ipswich
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <Link href="/locations/ipswich-cbd-disaster-recovery" className="hover:text-blue-600">Ipswich CBD</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      Booval
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      East Ipswich
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      North Ipswich
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      West Ipswich
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-green-600 pb-2">
                    Growth Corridors
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Springfield
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <Link href="/locations/springfield-lakes-disaster-recovery" className="hover:text-green-600">Springfield Lakes</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Springfield Central
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Augustine Heights
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Brookwater
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
                    Premium Residential
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Karalee
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Ipswich Mountain
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Tivoli
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Woodend
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      Brassall
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-orange-600 pb-2">
                    Historic Areas
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      One Mile
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      Bundamba
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      Silkstone
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      Limestone Ridges
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-red-600 pb-2">
                    Emerging Areas
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                      Ripley
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                      Ripley Valley
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                      White Rock
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                      Deebing Heights
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-gray-700 text-lg">
                  Don't see your suburb listed? We service the entire Greater Ipswich region.
                  <Link href="tel:1300309361" className="text-blue-600 hover:text-blue-700 font-semibold ml-2">
                    Call 1300 309 361
                  </Link> to confirm coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ipswich Residents Choose Us */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Ipswich Residents Choose Our Team
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">Fastest Response in Ipswich</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    Our Wacol headquarters is just 15-20km from Ipswich, enabling 30-45 minute response times across
                    the entire region. When disaster strikes, every minute counts to prevent further damage.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">IICRC Master Restorer</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    Phill McGurk holds Master Restorer certification, one of only a limited number in Queensland.
                    This ensures the highest standards of workmanship and industry best practices on every job.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">Bremer River Flood Experts</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    With extensive experience in the 2011, 2013, and 2022 Bremer River flooding events, we understand
                    Ipswich's unique flood challenges and have the expertise to fully restore flood-affected properties.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">All Insurers Approved</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    We work directly with Suncorp, RACQ, QBE, Allianz, and all major Australian insurers.
                    Direct billing available for approved claims to simplify your recovery process.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">Heritage Property Specialists</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    Queenslander homes and historic buildings require specialized restoration techniques. Our team
                    has the expertise to preserve heritage features while meeting modern building standards.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">Ipswich City Council Compliance</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    All restoration work meets Ipswich City Council requirements and Queensland building codes.
                    We handle all necessary permits and compliance documentation for your peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Claims Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Insurance Claims Assistance in Ipswich
              </h2>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Navigating insurance claims after a disaster can be stressful. Our team has extensive experience working
                  with insurance companies on Ipswich flood claims, storm damage claims, and fire damage assessments. We
                  provide detailed documentation, rapid damage assessments, and direct communication with your insurer to
                  ensure claims are processed efficiently.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Approved Contractor Status</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Suncorp Insurance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>RACQ Insurance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>QBE Insurance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Allianz Australia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>All major Australian insurers</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Claims Support</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Direct billing available for approved claims</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Detailed damage documentation and photography</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Fast turnaround on assessments and quotes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Direct communication with loss adjusters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Historical flood claim data expertise</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <p className="text-gray-800 font-semibold mb-4">
                    Need help with an insurance claim? Our team provides expert guidance throughout the entire process.
                  </p>
                  <Link
                    href="/insurance-claims"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Learn More About Insurance Claims
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions - Ipswich Disaster Recovery
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How quickly can you respond to an emergency in Ipswich?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team responds to Ipswich emergencies within 30-45 minutes on average. Based just 15-20 kilometers
                    away at our Wacol headquarters, we can reach most Ipswich suburbs faster than any other certified disaster
                    recovery provider. We operate 24/7/365, including public holidays and weekends. The moment you call
                    1300 309 361, our emergency dispatch activates our closest available team to your location.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Do you have experience with Bremer River flooding?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, extensive experience. Our team has restored hundreds of Ipswich properties affected by Bremer River
                    flooding during the major events of 2011, 2013, and 2022. We understand which Ipswich suburbs are in
                    flood-prone zones, the unique challenges of floodwater contamination, and the specific restoration techniques
                    required for Queensland's flood conditions. We work closely with Ipswich City Council on flood-affected
                    properties to ensure all restoration work meets current building codes and flood mitigation requirements.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Which Ipswich suburbs do you service?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We service the entire Greater Ipswich region including Ipswich CBD, Springfield Lakes, Brookwater, Karalee,
                    Ripley, Redbank Plains, Booval, East Ipswich, North Ipswich, West Ipswich, One Mile, Bundamba, Silkstone,
                    Brassall, Tivoli, Woodend, Augustine Heights, Springfield Central, Ripley Valley, White Rock, Deebing Heights,
                    and all surrounding areas. If you're located in the Ipswich City Council area, we provide emergency disaster
                    recovery services to your property. Call <Link href="tel:1300309361" className="text-blue-600 hover:text-blue-700 font-semibold">1300 309 361</Link> to confirm specific coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Phone className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Emergency in Ipswich? We're Ready 24/7
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't let water damage escalate. Our Master Restorer and emergency team
              respond immediately to disasters across Ipswich and surrounding areas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call Now: 1300 309 361
              </Link>
              <Link
                href="/emergency/steps"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5" />
                Emergency Steps Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              We Also Service
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/brisbane"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Brisbane</h4>
                <p className="text-gray-600">CBD, New Farm, Hamilton, Ascot, Toowong</p>
              </Link>
              <Link
                href="/logan"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Logan</h4>
                <p className="text-gray-600">Commercial and residential properties</p>
              </Link>
              <Link
                href="/services/water-damage-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">All Services</h4>
                <p className="text-gray-600">Complete disaster recovery solutions</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}