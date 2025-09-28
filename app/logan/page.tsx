import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle, Building, Factory, Truck, ShoppingCart, Briefcase, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Logan Commercial Water Damage Restoration | Industrial Emergency Response | Business Continuity',
  description: 'Professional commercial water damage restoration in Logan. Industrial facilities, retail centers, office complexes, warehouses. 24/7 emergency response with business continuity focus. Master Restorer certified.',
  keywords: 'Logan commercial water damage restoration, industrial flood recovery, warehouse emergency response, retail center restoration, office water damage Logan, business continuity Logan, commercial emergency restoration',
  openGraph: {
    title: 'Logan Commercial Water Damage Restoration | Industrial Emergency Response',
    description: 'Professional commercial water damage restoration in Logan with business continuity focus and industrial expertise.',
    url: 'https://dr-new-ten.vercel.app/logan',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Logan Commercial Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/logan'
  }
};

const commercialSectors = [
  {
    sector: 'Industrial & Manufacturing',
    facilities: ['Food processing plants', 'Manufacturing facilities', 'Chemical plants', 'Cold storage facilities'],
    locations: ['Logan Central', 'Meadowbrook', 'Loganholme', 'Slacks Creek'],
    commonRisks: ['Process water leaks', 'HVAC failures', 'Roof leaks', 'Fire sprinkler activation'],
    businessImpact: 'High - Production shutdown costs',
    responseTime: '30 minutes'
  },
  {
    sector: 'Logistics & Distribution',
    facilities: ['Distribution centers', 'Freight terminals', 'Cold chain storage', 'E-commerce warehouses'],
    locations: ['Berrinba', 'Yatala', 'Stapylton', 'Bethania'],
    commonRisks: ['Loading dock flooding', 'Refrigeration leaks', 'Storm damage', 'Burst pipes'],
    businessImpact: 'Critical - Supply chain disruption',
    responseTime: '20 minutes'
  },
  {
    sector: 'Retail & Commercial',
    facilities: ['Shopping centers', 'Retail stores', 'Restaurants', 'Service businesses'],
    locations: ['Logan Hyperdome', 'Grand Plaza', 'Browns Plains', 'Woodridge'],
    commonRisks: ['Ceiling leaks', 'Appliance overflow', 'Storm water entry', 'HVAC condensation'],
    businessImpact: 'High - Customer access and sales',
    responseTime: '25 minutes'
  },
  {
    sector: 'Healthcare & Education',
    facilities: ['Medical centers', 'Aged care facilities', 'Schools', 'Childcare centers'],
    locations: ['Logan Hospital precinct', 'Griffith University', 'TAFE Queensland', 'Community centers'],
    commonRisks: ['Plumbing failures', 'Medical equipment leaks', 'Kitchen flooding', 'Roof damage'],
    businessImpact: 'Critical - Public safety and compliance',
    responseTime: '15 minutes'
  }
];

const businessContinuityServices = [
  {
    title: 'Emergency Business Continuity',
    description: 'Immediate response to minimize business disruption and maintain operations during restoration.',
    icon: Building,
    urgency: 'Critical - 1 hour',
    benefits: ['Production continuity', 'Staff safety', 'Asset protection', 'Revenue preservation']
  },
  {
    title: 'Industrial Equipment Protection',
    description: 'Specialized protocols for protecting manufacturing equipment, electronics, and sensitive machinery.',
    icon: Factory,
    urgency: 'High - 2 hours',
    benefits: ['Equipment salvage', 'Data protection', 'System restoration', 'Compliance maintenance']
  },
  {
    title: 'Supply Chain Coordination',
    description: 'Logistics support to maintain supply chain operations and minimize customer impact.',
    icon: Truck,
    urgency: 'High - 4 hours',
    benefits: ['Alternative storage', 'Transport coordination', 'Vendor communication', 'Customer service']
  },
  {
    title: 'Regulatory Compliance Support',
    description: 'Ensuring restoration meets industry standards and regulatory requirements for your sector.',
    icon: Briefcase,
    urgency: 'Medium - 24 hours',
    benefits: ['Code compliance', 'Industry standards', 'Certification maintenance', 'Audit preparation']
  }
];

const loganAreas = [
  {
    area: 'Logan Central',
    characteristics: 'Commercial hub, government offices, mixed development',
    industries: ['Government services', 'Healthcare', 'Education', 'Retail'],
    properties: 'Office complexes, medical centers, shopping precincts',
    responseTime: '15 minutes'
  },
  {
    area: 'Meadowbrook',
    characteristics: 'Industrial precinct, manufacturing, logistics',
    industries: ['Manufacturing', 'Food processing', 'Automotive', 'Distribution'],
    properties: 'Industrial facilities, warehouses, processing plants',
    responseTime: '20 minutes'
  },
  {
    area: 'Berrinba',
    characteristics: 'Major logistics hub, distribution centers',
    industries: ['Logistics', 'E-commerce', 'Cold storage', 'Transport'],
    properties: 'Distribution centers, freight terminals, cold storage',
    responseTime: '18 minutes'
  },
  {
    area: 'Browns Plains',
    characteristics: 'Retail and service commercial area',
    industries: ['Retail', 'Hospitality', 'Professional services', 'Automotive'],
    properties: 'Shopping centers, restaurants, service businesses',
    responseTime: '22 minutes'
  },
  {
    area: 'Yatala',
    characteristics: 'Industrial and enterprise zone',
    industries: ['Heavy industry', 'Automotive', 'Food production', 'Chemical'],
    properties: 'Large industrial facilities, processing plants',
    responseTime: '25 minutes'
  },
  {
    area: 'Loganholme',
    characteristics: 'Mixed commercial and industrial',
    industries: ['Light manufacturing', 'Technology', 'Professional services'],
    properties: 'Business parks, tech facilities, offices',
    responseTime: '20 minutes'
  }
];

const commercialFeatures = [
  '24/7 emergency response for business operations',
  'Industrial equipment protection and restoration',
  'Supply chain continuity coordination',
  'Regulatory compliance and industry standards',
  'Insurance direct billing for commercial claims',
  'Temporary facility and relocation assistance',
  'Staff safety protocols and evacuation support',
  'Documentation for business interruption claims'
];

export default function LoganPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/logan',
    name: 'Disaster Recovery Logan Commercial Specialists',
    image: 'https://dr-new-ten.vercel.app/images/logan-commercial-restoration.jpg',
    description: 'Professional commercial water damage restoration in Logan including industrial facilities, retail centers, office complexes, and warehouses with business continuity focus.',
    url: 'https://dr-new-ten.vercel.app/logan',
    telephone: '1300309361',
    email: 'commercial@disasterrecovery.com.au',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Serving Logan Commercial Precinct',
      addressLocality: 'Logan',
      addressRegion: 'QLD',
      postalCode: '4114',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.6386',
      longitude: '153.1094'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Logan City',
        sameAs: 'https://en.wikipedia.org/wiki/Logan_City'
      },
      {
        '@type': 'Neighborhood',
        name: 'Logan Central'
      },
      {
        '@type': 'Neighborhood',
        name: 'Meadowbrook'
      },
      {
        '@type': 'Neighborhood',
        name: 'Berrinba'
      },
      {
        '@type': 'Neighborhood',
        name: 'Browns Plains'
      },
      {
        '@type': 'Neighborhood',
        name: 'Yatala'
      },
      {
        '@type': 'Neighborhood',
        name: 'Loganholme'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial Disaster Recovery Services',
      itemListElement: businessContinuityServices.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Logan+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Commercial Accounts, Credit Card',
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
    priceRange: '$25,000-$500,000+',
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
        <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building className="w-12 h-12 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-green-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Commercial Specialist • Business Continuity Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Logan Commercial Water Damage
                <span className="block text-blue-400">Restoration & Business Continuity</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional commercial water damage restoration for Logan's industrial facilities, retail centers,
                office complexes, and warehouses. <strong>Master Restorer Phill McGurk</strong> - specialized
                in business continuity, industrial equipment protection, and minimizing operational disruption.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Factory className="w-8 h-8 mb-4 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-gray-100">Industrial Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">15min</div>
                  <div className="text-gray-100">Critical Facilities</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Truck className="w-8 h-8 mb-4 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Supply</div>
                  <div className="text-gray-100">Chain Support</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Shield className="w-8 h-8 mb-4 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Business</div>
                  <div className="text-gray-100">Continuity</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Commercial Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Commercial Sectors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Logan Commercial Sectors Served
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration protocols for different commercial and industrial sectors,
                each with unique operational requirements and business continuity needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {commercialSectors.map((sector, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {sector.sector}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      sector.businessImpact.includes('Critical') ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {sector.businessImpact.split(' - ')[0]}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Facility Types:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {sector.facilities.map((facility, idx) => (
                          <div key={idx} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded">
                            {facility}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Key Locations:</span>
                      <div className="text-sm text-gray-700">
                        {sector.locations.join(', ')}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Risks:</span>
                      <div className="space-y-1">
                        {sector.commonRisks.map((risk, idx) => (
                          <div key={idx} className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded">
                            {risk}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-green-600">{sector.responseTime}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Business Impact:</span>
                        <div className="font-semibold text-red-600">{sector.businessImpact.split(' - ')[1]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Continuity Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Business Continuity Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized services designed to minimize business disruption and maintain operations
                during water damage restoration for Logan commercial properties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {businessContinuityServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
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
                      <span className="text-sm text-gray-500 mb-3 block">Key Benefits:</span>
                      <div className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{benefit}</span>
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

        {/* Logan Areas Coverage */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Logan Commercial Areas Coverage
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive commercial restoration services across all Logan business precincts,
                from industrial hubs to retail centers and government facilities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loganAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{area.area}</h3>
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Characteristics:</span>
                      <div className="text-sm text-gray-700">{area.characteristics}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Property Types:</span>
                      <div className="text-sm text-gray-700">{area.properties}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Key Industries:</span>
                      <div className="grid grid-cols-2 gap-1">
                        {area.industries.map((industry, idx) => (
                          <div key={idx} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                            {industry}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-500">Response Time:</span>
                      <div className="font-semibold text-blue-600">{area.responseTime}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Logan Commercial Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {commercialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Building className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Commercial Expertise */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Commercial & Industrial Restoration Mastery
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Phill McGurk's Master Restorer certification includes specialized training in commercial
                and industrial restoration. Our understanding of business operations, regulatory compliance,
                and supply chain impacts ensures minimal disruption to Logan's vital commercial activities.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Factory className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Industrial Expertise</h3>
                  <p className="text-gray-300 text-sm">Manufacturing and processing facility restoration</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Truck className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Supply Chain Continuity</h3>
                  <p className="text-gray-300 text-sm">Logistics coordination and alternative arrangements</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Regulatory Compliance</h3>
                  <p className="text-gray-300 text-sm">Industry standards and code compliance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Building className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Commercial Emergency? Business Continuity Expert Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Commercial water damage requires immediate response to protect equipment, maintain operations,
              and minimize business interruption. Our Master Restorer responds within minutes to preserve
              your Logan business operations and prevent extended downtime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Commercial Emergency: 1300 309 361
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

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Service Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/brisbane"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Brisbane Commercial</h4>
                <p className="text-gray-600">CBD, Fortitude Valley, South Bank business districts</p>
              </Link>
              <Link
                href="/ipswich"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Factory className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Ipswich Industrial</h4>
                <p className="text-gray-600">Springfield, Brookwater business precincts</p>
              </Link>
              <Link
                href="/redlands-bayside"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <ShoppingCart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Redlands Commercial</h4>
                <p className="text-gray-600">Cleveland, Capalaba retail and marine facilities</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}