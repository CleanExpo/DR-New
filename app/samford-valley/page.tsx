import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Eye, Heart, Home, Droplets, Flame, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Samford Valley Luxury Estate Water Damage Restoration | Master Restorer | Discrete Service',
  description: 'Professional water damage restoration for Samford Valley luxury estates, wine cellars, and high-value properties. Certified Master Restorer with discrete, confidential service for medical professionals and high net worth families.',
  keywords: 'Samford Valley water damage restoration, luxury estate flooding, wine cellar restoration, medical professional discrete service, Upper Brookfield water damage, Ocean View estate restoration, Dayboro luxury home flood recovery',
  openGraph: {
    title: 'Samford Valley Luxury Estate Water Damage Restoration | Master Restorer',
    description: 'Professional, discrete water damage restoration for Samford Valley luxury estates and high-value properties.',
    url: 'https://dr-new-ten.vercel.app/samford-valley',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Disaster Recovery Brisbane Hinterland'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/samford-valley'
  }
};

const luxuryAreas = [
  {
    name: 'Samford Valley',
    properties: '$3M - $12M',
    characteristics: 'Wine cellars, tennis courts, pool houses',
    responseTime: '35 minutes',
    specialties: ['Wine Collection Protection', 'Art & Antique Conservation', 'Climate Control Systems']
  },
  {
    name: 'Upper Brookfield',
    properties: '$2.5M - $8M',
    characteristics: 'Hinterland estates, acreage living',
    responseTime: '40 minutes',
    specialties: ['Rural Access', 'Horse Property Facilities', 'Generator Power Systems']
  },
  {
    name: 'Ocean View',
    properties: '$2M - $6M',
    characteristics: 'City view estates, luxury acreage',
    responseTime: '45 minutes',
    specialties: ['Panoramic View Properties', 'Landscaped Gardens', 'Outdoor Entertainment Areas']
  },
  {
    name: 'Dayboro',
    properties: '$1.8M - $5M',
    characteristics: 'Rural luxury, horse properties',
    responseTime: '50 minutes',
    specialties: ['Equestrian Facilities', 'Bore Water Systems', 'Large Acreage Properties']
  }
];

const professionalServices = [
  {
    title: 'Medical Professional Discrete Service',
    description: 'Confidential restoration for surgeons, specialists, and medical practitioners. After-hours coordination and direct insurance billing.',
    icon: Heart,
    professionals: ['Surgeons', 'Eye Specialists', 'Cardiologists', 'Private Practice Physicians']
  },
  {
    title: 'Legal Professional Priority Response',
    description: 'Priority service for judges, QCs, and senior barristers. Minimal disruption protocols and executive scheduling.',
    icon: Shield,
    professionals: ['High Court Judges', 'QCs & Senior Barristers', 'Commercial Law Partners', 'Property Law Specialists']
  },
  {
    title: 'Wine Cellar Climate Control Restoration',
    description: 'specialised restoration of climate-controlled wine cellars, collection preservation, and temperature monitoring systems.',
    icon: Droplets,
    professionals: ['Wine Collectors', 'Hospitality Professionals', 'Vineyard Owners', 'Connoisseurs']
  },
  {
    title: 'Art & Antique Conservation',
    description: 'Museum-grade restoration techniques for high-value art collections, antiques, and cultural artifacts.',
    icon: Eye,
    professionals: ['Art Collectors', 'Gallery Owners', 'Museum Curators', 'Heritage Property Owners']
  }
];

const luxuryFeatures = [
  'Wine cellar temperature and humidity restoration',
  'Art collection climate control recovery',
  'Tennis court and pool house restoration',
  'Home theatre and media room recovery',
  'Equestrian facility water damage repair',
  'Outdoor kitchen and entertainment area restoration',
  'Smart home automation system recovery',
  'Solar and sustainable energy system protection'
];

export default function SamfordValleyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/samford-valley',
    name: 'Disaster Recovery Samford Valley Luxury Estates',
    image: 'https://dr-new-ten.vercel.app/images/samford-valley-luxury-restoration.jpg',
    description: 'Professional water damage restoration for Samford Valley luxury estates, wine cellars, and high-value properties. Certified Master Restorer with discrete, confidential service for medical professionals and high net worth families.',
    url: 'https://dr-new-ten.vercel.app/samford-valley',
    telephone: '1300309361',
    email: 'discrete@dr-new-ten.vercel.app',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Brisbane Hinterland',
      addressLocality: 'Samford Valley',
      addressRegion: 'QLD',
      postalCode: '4520',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.3794',
      longitude: '152.8794'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Samford Valley',
        sameAs: 'https://en.wikipedia.org/wiki/Samford_Valley'
      },
      {
        '@type': 'Neighborhood',
        name: 'Upper Brookfield'
      },
      {
        '@type': 'Neighborhood',
        name: 'Ocean View'
      },
      {
        '@type': 'Neighborhood',
        name: 'Dayboro'
      },
      {
        '@type': 'Neighborhood',
        name: 'Mount Glorious Corridor'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Luxury Estate Restoration Services',
      itemListElement: professionalServices.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Samford+Valley+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Private Pay, Corporate Accounts',
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
    priceRange: '$50,000-$500,000+',
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
        <section className="relative bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-centre">
              <div className="flex items-centre justify-centre gap-3 mb-6">
                <Award className="w-12 h-12 text-gold-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Master Restorer • Discrete Service
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Samford Valley Luxury Estate
                <span className="block text-yellow-400">Water Damage Restoration</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional, discrete restoration services for Samford Valley's most prestigious properties.
                <strong> Phill McGurk - Master Restorer</strong> providing confidential service for medical professionals,
                legal practitioners, and high net worth families with properties valued $3M-$12M+.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Discrete Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <MapPin className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">35min</div>
                  <div className="text-blue-100">Samford Valley</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Shield className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">$500K+</div>
                  <div className="text-blue-100">Project Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Eye className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Confidential</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-centre gap-3 mr-4"
              >
                <Phone className="w-6 h-6" />
                Discrete Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Luxury Areas Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brisbane Hinterland Luxury Estate Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration services for the region's most prestigious properties,
                from Samford Valley wine estates to Dayboro equestrian facilities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-t-4 border-gold-500">
                  <div className="flex items-centre justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Property Values:</span>
                      <div className="font-bold text-green-600">{area.properties}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-sm text-gray-700">{area.characteristics}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Response Time:</span>
                      <div className="font-semibold text-blue-600">{area.responseTime}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Specialties:</span>
                    <div className="space-y-1">
                      {area.specialties.map((specialty, idx) => (
                        <div key={idx} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-centre mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discrete Professional Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                specialised restoration protocols for medical professionals, legal practitioners,
                and discerning property owners requiring confidential, high-standard service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {professionalServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-centre gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-centre justify-centre">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div>
                      <span className="text-sm text-gray-500 mb-3 block">Target Professionals:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {service.professionals.map((prof, idx) => (
                          <div key={idx} className="text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded">
                            {prof}
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

        {/* Luxury Features */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-centre text-gray-900 mb-12">
                Luxury Estate Restoration Specialties
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {luxuryFeatures.map((feature, index) => (
                  <div key={index} className="flex items-centre gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Credentials */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-centre">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Phill McGurk - Master Restorer
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                One of Queensland's limited Master Restorers, certified to handle the most complex
                and valuable restoration projects. Trusted by insurance companies, medical professionals,
                and high net worth families for discrete, expert service.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">IICRC Master Certified</h3>
                  <p className="text-gray-300 text-sm">Highest level professional certification</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">$500K+ Project Experience</h3>
                  <p className="text-gray-300 text-sm">Proven expertise with luxury estates</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Eye className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">100% Discrete Service</h3>
                  <p className="text-gray-300 text-sm">Confidential protocols for all clients</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-centre">
            <Phone className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Luxury Estate Emergency? Discrete Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              When disaster strikes your Samford Valley estate, wine cellar, or luxury property,
              our Master Restorer responds immediately with discrete, professional service that
              protects both your property and your privacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-centre">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-centre justify-centre gap-3"
              >
                <Phone className="w-5 h-5" />
                Discrete Emergency: 1300 309 361
              </Link>
              <Link
                href="/services/wine-cellar-restoration"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-centre justify-centre gap-3"
              >
                <Droplets className="w-5 h-5" />
                Wine Cellar Specialists
              </Link>
            </div>
          </div>
        </section>

        {/* Related Luxury Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-centre text-gray-900 mb-8">
              Additional Luxury Service Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/gumdale-sheldon"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Bayside Luxury</h4>
                <p className="text-gray-600">Gumdale, Sheldon, Redlands waterfront estates</p>
              </Link>
              <Link
                href="/brookwater-springfield"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <Home className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Golf Estate Communities</h4>
                <p className="text-gray-600">Brookwater, Springfield Lakes premium properties</p>
              </Link>
              <Link
                href="/services/art-antique-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-centre"
              >
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Specialty Restoration</h4>
                <p className="text-gray-600">Art, antiques, wine collections, heritage items</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}