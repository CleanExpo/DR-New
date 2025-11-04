import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Shield, Users, Award, CheckCircle, Droplets, Thermometer, Wind, Archive, Eye, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wine Cellar Water Damage Restoration Brisbane | Climate Control Recovery | Sirromet Expert',
  description: 'Professional wine cellar water damage restoration Brisbane. Climate control recovery, temperature monitoring, humidity restoration. Sirromet Winery area specialist. Master Restorer certified for wine collection preservation.',
  keywords: 'wine cellar water damage Brisbane, climate control restoration, wine collection recovery, temperature humidity restoration, Sirromet winery emergency, luxury wine storage repair, cellar flood recovery Brisbane',
  openGraph: {
    title: 'Wine Cellar Water Damage Restoration Brisbane | Climate Control Recovery',
    description: 'Professional wine cellar restoration with climate control recovery and collection preservation expertise.',
    url: 'https://dr-new-ten.vercel.app/services/wine-cellar-restoration',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Wine Cellar Restoration Specialists'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/services/wine-cellar-restoration'
  }
};

const cellarTypes = [
  {
    type: 'Traditional Underground Cellars',
    commonIssues: ['Groundwater seepage', 'Foundation leaks', 'Poor ventilation', 'Humidity fluctuations'],
    restorationProcess: ['Waterproofing assessment', 'Drainage system repair', 'Humidity control restoration', 'Wine rack salvage'],
    timeframe: '2-4 weeks',
    riskLevel: 'High'
  },
  {
    type: 'Climate-Controlled Wine Rooms',
    commonIssues: ['HVAC system failure', 'Condensation damage', 'Insulation breakdown', 'Temperature sensors malfunction'],
    restorationProcess: ['System diagnostics', 'Climate unit replacement', 'Insulation restoration', 'Sensor recalibration'],
    timeframe: '1-2 weeks',
    riskLevel: 'Medium'
  },
  {
    type: 'Residential Wine Storage',
    commonIssues: ['Burst pipes overhead', 'Air conditioning leaks', 'Window condensation', 'Appliance overflow'],
    restorationProcess: ['Water extraction', 'Structural drying', 'Bottle inspection', 'Label preservation'],
    timeframe: '3-7 days',
    riskLevel: 'Variable'
  },
  {
    type: 'Commercial Wine Storage',
    commonIssues: ['Fire sprinkler activation', 'Roof leaks', 'Loading dock flooding', 'Refrigeration failure'],
    restorationProcess: ['Inventory assessment', 'Temperature stabilization', 'Bulk wine protection', 'Insurance documentation'],
    timeframe: '1-3 weeks',
    riskLevel: 'Critical'
  }
];

const wineProtectionServices = [
  {
    title: 'Temperature Control Recovery',
    description: 'Immediate stabilization of wine storage temperatures to prevent thermal shock and preserve wine quality.',
    icon: Thermometer,
    urgency: 'Critical - 2 hours',
    process: ['Emergency cooling setup', 'Gradient temperature adjustment', 'Monitoring system installation', 'Long-term climate planning']
  },
  {
    title: 'Humidity Management Restoration',
    description: 'Precise humidity control to prevent cork deterioration, mould growth, and label damage.',
    icon: Wind,
    urgency: 'High - 6 hours',
    process: ['Humidity level assessment', 'Dehumidification setup', 'Air circulation optimization', 'Moisture barrier restoration']
  },
  {
    title: 'Wine Collection Assessment',
    description: 'Professional evaluation of wine bottles, labels, and storage systems for insurance and preservation.',
    icon: Archive,
    urgency: 'Medium - 24 hours',
    process: ['Bottle-by-bottle inspection', 'Label condition documentation', 'Cork integrity assessment', 'Valuation assistance']
  },
  {
    title: 'Label Preservation Services',
    description: 'Specialized techniques to preserve and restore water-damaged wine labels and maintain collection value.',
    icon: Eye,
    urgency: 'High - 12 hours',
    process: ['Label stabilization', 'Archival documentation', 'Restoration consultation', 'Protective reapplication']
  }
];

const wineCellarFeatures = [
  'Emergency temperature stabilization within 2 hours',
  'Climate control system diagnostics and restoration',
  'Wine rack and storage system restoration',
  'Cork and seal integrity preservation',
  'Wine bottle label conservation and documentation',
  'Inventory assessment for insurance claims',
  'Vintage wine handling with museum-grade protocols',
  'Long-term storage climate optimization'
];

const sirometArea = [
  {
    location: 'Sirromet Winery Precinct',
    properties: 'Luxury vineyard estates, winery tourism properties',
    wineStorage: 'Underground cellars, climate-controlled facilities',
    responseTime: '45 minutes',
    specialties: ['Vineyard estate cellars', 'Tourism facility wine storage', 'Commercial winery systems']
  },
  {
    location: 'Mount Cotton Wine Country',
    properties: 'Boutique wineries, luxury rural estates',
    wineStorage: 'Traditional cellars, modern wine rooms',
    responseTime: '40 minutes',
    specialties: ['Boutique wine collections', 'Rural property access', 'Heritage wine storage']
  }
];

export default function WineCellarRestorationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://dr-new-ten.vercel.app/services/wine-cellar-restoration',
    name: 'Wine Cellar Water Damage Restoration Brisbane',
    image: 'https://dr-new-ten.vercel.app/images/wine-cellar-restoration.jpg',
    description: 'Professional wine cellar water damage restoration with climate control recovery, temperature monitoring, and wine collection preservation. Sirromet Winery area specialist.',
    url: 'https://dr-new-ten.vercel.app/services/wine-cellar-restoration',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane Wine Cellar Specialists',
      telephone: '1300309361',
      email: 'wine@dr-new-ten.vercel.app',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brisbane',
        addressRegion: 'QLD',
        addressCountry: 'AU'
      }
    },
    serviceType: 'Wine Cellar Restoration',
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane'
      },
      {
        '@type': 'Neighborhood',
        name: 'Sirromet Winery Area'
      },
      {
        '@type': 'Neighborhood',
        name: 'Mount Cotton'
      },
      {
        '@type': 'Neighborhood',
        name: 'Samford Valley'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wine Cellar Restoration Services',
      itemListElement: wineProtectionServices.map((service, index) => ({
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
        value: '2 hours for temperature stabilization'
      },
      {
        '@type': 'PropertyValue',
        name: 'Service Coverage',
        value: 'Traditional cellars to modern climate-controlled wine rooms'
      },
      {
        '@type': 'PropertyValue',
        name: 'Certification',
        value: 'IICRC Master Restorer'
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Wine collectors, vineyard owners, luxury property owners'
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
        <section className="relative bg-gradient-to-r from-purple-900 via-red-900 to-yellow-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Droplets className="w-12 h-12 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Wine Cellar Specialists • Climate Control Experts
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Wine Cellar Water Damage
                <span className="block text-yellow-400">Restoration & Recovery</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Professional wine cellar restoration with climate control recovery, temperature stabilization,
                and wine collection preservation. <strong>Master Restorer Phill McGurk</strong> - specialized
                expertise for Sirromet Winery area and Brisbane's finest wine collections.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Thermometer className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">2hr</div>
                  <div className="text-purple-100">Temperature Control</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Archive className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-purple-100">Collection Focus</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Award className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Master</div>
                  <div className="text-purple-100">Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-purple-100">Emergency Response</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Wine Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Wine Cellar Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wine Cellar Restoration by Type
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration protocols for different wine storage environments,
                from traditional underground cellars to modern climate-controlled wine rooms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {cellarTypes.map((cellar, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {cellar.type}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      cellar.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                      cellar.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                      cellar.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {cellar.riskLevel} Risk
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Issues:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {cellar.commonIssues.map((issue, idx) => (
                          <div key={idx} className="text-sm bg-red-50 text-red-800 px-3 py-1 rounded">
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Restoration Process:</span>
                      <div className="space-y-1">
                        {cellar.restorationProcess.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-gray-500">Timeframe:</span>
                        <div className="font-semibold text-blue-600">{cellar.timeframe}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wine Protection Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wine Collection Protection Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized services to protect and preserve wine collections during and after water damage incidents.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {wineProtectionServices.map((service, index) => {
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
                        <span className="text-sm font-bold text-red-600">{service.urgency}</span>
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
                            <CheckCircle className="w-4 h-4 text-green-600" />
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

        {/* Sirromet Area Expertise */}
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sirromet Winery Area Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized knowledge of wine country properties and vineyard estate wine storage systems
                in the Mount Cotton and Sirromet Winery precinct.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sirometArea.map((area, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {area.location}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500">Property Types:</span>
                      <div className="text-gray-700">{area.properties}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Wine Storage:</span>
                      <div className="text-gray-700">{area.wineStorage}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Response Time:</span>
                      <div className="font-semibold text-blue-600">{area.responseTime}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Specialties:</span>
                      <div className="space-y-1">
                        {area.specialties.map((specialty, idx) => (
                          <div key={idx} className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
                            {specialty}
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

        {/* Wine Cellar Features */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Wine Cellar Restoration Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {wineCellarFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Droplets className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Wine Expertise */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Wine Collection Restoration Expertise
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Phill McGurk's Master Restorer certification extends to specialized wine collection preservation.
                Our understanding of wine storage requirements, climate control systems, and collection valuation
                ensures your investment is protected during restoration.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Thermometer className="w-8 h-8 text-red-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Climate Control Mastery</h3>
                  <p className="text-gray-300 text-sm">Temperature and humidity restoration expertise</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Archive className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Collection Preservation</h3>
                  <p className="text-gray-300 text-sm">Vintage wine handling and storage protocols</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Label Conservation</h3>
                  <p className="text-gray-300 text-sm">Museum-grade label preservation techniques</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <Droplets className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold mb-6">
              Wine Cellar Emergency? Time is Critical for Your Collection
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Wine collections are particularly vulnerable to water damage. Every hour counts in preserving
              temperature control, preventing cork deterioration, and maintaining the value of your investment.
              Our Master Restorer responds immediately with specialized wine preservation protocols.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Wine Emergency: 1300 309 361
              </Link>
              <Link
                href="/professionals"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5" />
                Professional Services
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
                href="/services/art-antique-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Art & Antique Recovery</h4>
                <p className="text-gray-600">Museum-grade restoration for valuable collections</p>
              </Link>
              <Link
                href="/samford-valley"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Luxury Estate Services</h4>
                <p className="text-gray-600">Samford Valley and hinterland properties</p>
              </Link>
              <Link
                href="/professionals"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Discrete Professional Service</h4>
                <p className="text-gray-600">Confidential restoration for professionals</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}