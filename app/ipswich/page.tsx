import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Star, Shield, Users, MapPin, Award, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Ipswich | Emergency Response | Master Restorer',
  description: 'Professional water damage restoration in Ipswich, Springfield Lakes, Brookwater. Certified Master Restorer. 24/7 emergency response. Insurance approved. Call 1300 309 361.',
  keywords: 'water damage restoration Ipswich, emergency water extraction Springfield Lakes, flood damage repair Brookwater, mould remediation Ipswich, disaster recovery Queensland',
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

        {/* Local Knowledge Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Ipswich-Specific Disaster Recovery Expertise
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Growth Corridor Challenges</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>New construction water system issues in Springfield Lakes and Brookwater</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Development-related drainage problems in Ripley area</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Clay soil movement affecting Karalee properties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Storm water management in new estates</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Local Risk Factors</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Bremer River flooding potential in low-lying areas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Seasonal storm patterns affecting the region</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>High-value properties requiring specialized care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Queensland building code compliance requirements</span>
                    </li>
                  </ul>
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