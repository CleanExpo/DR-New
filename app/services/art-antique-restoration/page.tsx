import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, Award, CheckCircle, Eye, Palette, Frame, Book, Crown, Thermometer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Art & Antique Water Damage Restoration Brisbane | Museum-Grade Conservation | Heritage Specialist',
  description: 'Professional art and antique water damage restoration Brisbane. Museum-grade conservation techniques for paintings, sculptures, heritage furniture, rare books. Master Restorer certified with art collection expertise.',
  keywords: 'art restoration Brisbane, antique water damage recovery, painting conservation, sculpture restoration, heritage furniture repair, rare book restoration, museum-grade conservation Brisbane, art collection emergency',
  openGraph: {
    title: 'Art & Antique Water Damage Restoration Brisbane | Museum-Grade Conservation',
    description: 'Professional art and antique restoration with museum-grade conservation techniques and heritage expertise.',
    url: 'https://dr-new-ten.vercel.app/services/art-antique-restoration',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Art & Antique Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/art-antique-restoration'
  }
};

const artCategories = [
  {
    category: 'Paintings & Canvas Works',
    mediums: ['Oil paintings', 'Watercolors', 'Acrylic works', 'Mixed media'],
    damageTypes: ['Canvas water damage', 'Paint lifting', 'Frame warping', 'Varnish clouding'],
    urgency: 'Critical - 2 hours',
    techniques: ['Canvas stabilization', 'Paint consolidation', 'Controlled drying', 'Varnish assessment']
  },
  {
    category: 'Sculptures & 3D Art',
    mediums: ['Bronze sculptures', 'Marble works', 'Ceramic pieces', 'Mixed materials'],
    damageTypes: ['Surface corrosion', 'Joint separation', 'Mineral deposits', 'Structural stress'],
    urgency: 'High - 6 hours',
    techniques: ['Material assessment', 'Corrosion treatment', 'Structural stabilization', 'Surface cleaning']
  },
  {
    category: 'Heritage Furniture',
    mediums: ['Antique timber', 'Upholstered pieces', 'Lacquered items', 'Inlay work'],
    damageTypes: ['Wood warping', 'Veneer lifting', 'Fabric staining', 'Metal tarnishing'],
    urgency: 'Medium - 12 hours',
    techniques: ['Wood stabilization', 'Veneer re-adhesion', 'Fabric treatment', 'Finish restoration']
  },
  {
    category: 'Paper & Textile Arts',
    mediums: ['Rare books', 'Manuscripts', 'Prints', 'Historic textiles'],
    damageTypes: ['Paper buckling', 'Ink running', 'Mould growth', 'Fiber degradation'],
    urgency: 'Critical - 1 hour',
    techniques: ['Freeze stabilization', 'Controlled drying', 'Pressure flattening', 'Conservation cleaning']
  }
];

const conservationServices = [
  {
    title: 'Emergency Stabilization',
    description: 'Immediate protective measures to prevent further deterioration of water-damaged art and antiques.',
    icon: Shield,
    timeframe: '0-4 hours',
    process: ['Damage assessment', 'Environmental control', 'Stabilization protocols', 'Documentation']
  },
  {
    title: 'Museum-Grade Conservation',
    description: 'Professional conservation techniques using archival materials and reversible processes.',
    icon: Award,
    timeframe: '1-8 weeks',
    process: ['Conservation planning', 'Treatment execution', 'Progress documentation', 'Final assessment']
  },
  {
    title: 'Climate-Controlled Storage',
    description: 'Specialized storage facilities with precise temperature and humidity control during restoration.',
    icon: Thermometer,
    timeframe: 'Duration of treatment',
    process: ['Environmental monitoring', 'Secure storage', 'Access control', 'Condition tracking']
  },
  {
    title: 'Insurance Documentation',
    description: 'Comprehensive documentation and valuation for insurance claims and collection management.',
    icon: Book,
    timeframe: '1-2 weeks',
    process: ['Damage photography', 'Condition reporting', 'Valuation assistance', 'Treatment records']
  }
];

const collectorsAndInstitutions = [
  {
    type: 'Private Collectors',
    locations: ['Samford Valley estates', 'Hamilton mansions', 'New Farm heritage homes', 'Ascot luxury properties'],
    collections: ['European paintings', 'Asian ceramics', 'Australian colonial art', 'Contemporary sculptures'],
    services: ['Discrete collection assessment', 'In-home conservation', 'Climate control evaluation', 'Security protocols']
  },
  {
    type: 'Cultural Institutions',
    locations: ['Brisbane museums', 'Art galleries', 'Historical societies', 'Cultural centers'],
    collections: ['Public art collections', 'Historical artifacts', 'Cultural heritage items', 'Educational displays'],
    services: ['Emergency response', 'Bulk treatment protocols', 'Staff training', 'Disaster preparedness']
  },
  {
    type: 'Commercial Galleries',
    locations: ['Fortitude Valley', 'West End', 'South Bank', 'CBD locations'],
    collections: ['Contemporary art', 'Investment pieces', 'Exhibition works', 'Artist collections'],
    services: ['Exhibition protection', 'Transport coordination', 'Insurance liaison', 'Rapid response']
  },
  {
    type: 'Heritage Properties',
    locations: ['Historic Queenslanders', 'Heritage estates', 'Cultural landmarks', 'Period homes'],
    collections: ['Period furniture', 'Architectural elements', 'Historical documents', 'Family heirlooms'],
    services: ['Heritage compliance', 'Period-appropriate restoration', 'Council coordination', 'Authenticity preservation']
  }
];

const artRestorationFeatures = [
  'Museum-grade conservation techniques and materials',
  'Climate-controlled drying and storage facilities',
  'Professional art handling and transport protocols',
  'Insurance industry approved documentation and valuation',
  'Discrete collection assessment and treatment planning',
  'Emergency freeze-drying for paper and textile items',
  'Archival quality materials and reversible treatments',
  'Collaboration with conservation professionals and institutions'
];

export default function ArtAntiqueRestorationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://dr-new-ten.vercel.app/services/art-antique-restoration',
    name: 'Art & Antique Water Damage Restoration Brisbane',
    image: 'https://dr-new-ten.vercel.app/images/art-antique-restoration.jpg',
    description: 'Professional art and antique water damage restoration with museum-grade conservation techniques for paintings, sculptures, heritage furniture, and rare collections.',
    url: 'https://dr-new-ten.vercel.app/services/art-antique-restoration',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane Art Conservation Specialists',
      telephone: '1300309361',
      email: 'art@dr-new-ten.vercel.app',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brisbane',
        addressRegion: 'QLD',
        addressCountry: 'AU'
      }
    },
    serviceType: 'Art & Antique Conservation',
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane'
      },
      {
        '@type': 'Neighborhood',
        name: 'Samford Valley'
      },
      {
        '@type': 'Neighborhood',
        name: 'Hamilton'
      },
      {
        '@type': 'Neighborhood',
        name: 'New Farm'
      },
      {
        '@type': 'Neighborhood',
        name: 'Ascot'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Art & Antique Conservation Services',
      itemListElement: conservationServices.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Emergency Response Time',
        value: '1 hour for critical items'
      },
      {
        '@type': 'PropertyValue',
        name: 'Conservation Standards',
        value: 'Museum-grade techniques and materials'
      },
      {
        '@type': 'PropertyValue',
        name: 'Certification',
        value: 'IICRC Master Restorer with art specialization'
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Art collectors, museums, galleries, heritage property owners'
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
        <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Palette className="w-12 h-12 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Museum-Grade Conservation • Heritage Specialist
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Art & Antique Water Damage
                <span className="block text-yellow-400">Conservation & Restoration</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional art and antique water damage restoration using museum-grade conservation techniques.
                <strong> Master Restorer Phill McGurk</strong> - specialized expertise in preserving paintings,
                sculptures, heritage furniture, and rare collections for Brisbane's most valuable cultural assets.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Eye className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">1hr</div>
                  <div className="text-purple-100">Critical Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Frame className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Museum</div>
                  <div className="text-purple-100">Grade Techniques</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Crown className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Heritage</div>
                  <div className="text-purple-100">Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Shield className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Discrete</div>
                  <div className="text-purple-100">Collection Care</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Art Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Art Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Art & Antique Categories Restored
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized conservation protocols for different types of cultural objects,
                from oil paintings to heritage furniture, each requiring unique expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {artCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.category}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      category.urgency.includes('Critical') ? 'bg-red-100 text-red-800' :
                      category.urgency.includes('High') ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {category.urgency}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Mediums Treated:</span>
                      <div className="grid grid-cols-2 gap-1">
                        {category.mediums.map((medium, idx) => (
                          <div key={idx} className="text-sm bg-purple-50 text-purple-800 px-3 py-1 rounded">
                            {medium}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Water Damage:</span>
                      <div className="space-y-1">
                        {category.damageTypes.map((damage, idx) => (
                          <div key={idx} className="text-sm bg-red-50 text-red-800 px-3 py-1 rounded">
                            {damage}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Conservation Techniques:</span>
                      <div className="space-y-1">
                        {category.techniques.map((technique, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{technique}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conservation Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Conservation Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive conservation services using museum-grade techniques and materials
                to preserve and restore water-damaged cultural objects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {conservationServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <span className="text-sm font-bold text-blue-600">{service.timeframe}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div>
                      <span className="text-sm text-gray-500 mb-3 block">Process Steps:</span>
                      <div className="space-y-2">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-700">{step}</span>
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

        {/* Collectors & Institutions */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Collectors & Cultural Institutions Served
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized services for private collectors, museums, galleries, and heritage properties
                across Brisbane's cultural landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {collectorsAndInstitutions.map((client, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {client.type}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Locations:</span>
                      <div className="text-sm text-gray-700">
                        {client.locations.join(', ')}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Collection Types:</span>
                      <div className="grid grid-cols-2 gap-1">
                        {client.collections.map((collection, idx) => (
                          <div key={idx} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                            {collection}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Specialized Services:</span>
                      <div className="space-y-1">
                        {client.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Art Restoration Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Art & Antique Conservation Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {artRestorationFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Palette className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Conservation Expertise */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Cultural Heritage Conservation Mastery
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Phill McGurk's Master Restorer certification extends to cultural heritage conservation,
                combining traditional restoration skills with modern conservation science. Our approach
                preserves the artistic and historical integrity of collections while ensuring long-term stability.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Eye className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Conservation Science</h3>
                  <p className="text-gray-300 text-sm">Evidence-based treatment protocols</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Frame className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Museum Standards</h3>
                  <p className="text-gray-300 text-sm">Professional-grade materials and techniques</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Heritage Compliance</h3>
                  <p className="text-gray-300 text-sm">Council and institution approved methods</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Palette className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-6">
              Art Collection Emergency? Every Minute Counts for Cultural Assets
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Water damage to art and antiques requires immediate stabilization to prevent irreversible
              deterioration. Our conservation specialist responds within the hour with museum-grade
              emergency protocols to preserve your valuable cultural assets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Art Emergency: 1300 309 361
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

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Related Luxury Services
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/services/wine-cellar-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Wine Cellar Restoration</h4>
                <p className="text-gray-600">Climate-controlled wine collection preservation</p>
              </Link>
              <Link
                href="/samford-valley"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Luxury Estate Services</h4>
                <p className="text-gray-600">Samford Valley and hinterland properties</p>
              </Link>
              <Link
                href="/professionals"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Professional Services</h4>
                <p className="text-gray-600">Discrete restoration for professionals</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}