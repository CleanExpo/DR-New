import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, Shield, Users, Award, CheckCircle, Eye, Heart, Briefcase, UserCheck, Lock, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical & Legal Professional Discrete Water Damage Restoration Brisbane | Confidential Service',
  description: 'Confidential water damage restoration for Brisbane medical professionals, surgeons, specialists, judges, and QCs. Discrete, professional service with after-hours coordination and direct insurance billing.',
  keywords: 'medical professional water damage Brisbane, surgeon home restoration, discrete water damage service, legal professional flood recovery, confidential restoration Brisbane, specialist home emergency',
  openGraph: {
    title: 'Medical & Legal Professional Discrete Water Damage Restoration Brisbane',
    description: 'Confidential, professional water damage restoration for medical and legal professionals.',
    url: 'https://dr-new-ten.vercel.app/professionals',
    type: 'website',
    locale: 'en_AU',
    siteName: 'Discrete Professional Restoration Services'
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/professionals'
  }
};

const medicalSpecialties = [
  {
    title: 'Surgeons & Specialists',
    professionals: ['Cardiac Surgeons', 'Neurosurgeons', 'Orthopedic Surgeons', 'Plastic Surgeons'],
    locations: ['Private Hospitals', 'Wesley Hospital', 'St Andrew\'s Hospital', 'Mater Private'],
    serviceLevel: 'Platinum',
    responseTime: '1 hour',
    features: ['After-hours coordination', 'Hospital scheduling accommodation', 'Equipment sterilization protocols']
  },
  {
    title: 'Eye Specialists & Ophthalmologists',
    professionals: ['Retinal Specialists', 'Cataract Surgeons', 'Pediatric Ophthalmologists', 'Corneal Specialists'],
    locations: ['Brisbane Eye Hospital', 'Queensland Eye Institute', 'Vision Eye Institute'],
    serviceLevel: 'Platinum',
    responseTime: '1 hour',
    features: ['Precision equipment protection', 'Clean room protocols', 'Specialist instrument care']
  },
  {
    title: 'Cardiologists & Physicians',
    professionals: ['Interventional Cardiologists', 'Electrophysiologists', 'Emergency Physicians', 'Intensive Care Specialists'],
    locations: ['Prince Charles Hospital', 'Royal Brisbane Hospital', 'Private Cardiology Practices'],
    serviceLevel: 'Gold',
    responseTime: '2 hours',
    features: ['Medical equipment prioritization', 'Home office protection', 'Research material preservation']
  },
  {
    title: 'Dental Specialists',
    professionals: ['Oral Surgeons', 'Orthodontists', 'Periodontists', 'Endodontists'],
    locations: ['Private Practice Networks', 'Specialist Dental Centers', 'Hospital Dental Units'],
    serviceLevel: 'Gold',
    responseTime: '2 hours',
    features: ['Dental equipment care', 'Patient record protection', 'Practice continuity planning']
  }
];

const legalProfessionals = [
  {
    title: 'High Court & Supreme Court Judges',
    professionals: ['High Court Justices', 'Supreme Court Judges', 'District Court Judges', 'Magistrates'],
    locations: ['Supreme Court Brisbane', 'Federal Court', 'Family Court'],
    serviceLevel: 'Platinum Elite',
    responseTime: '30 minutes',
    features: ['Absolute confidentiality', 'Security clearance protocols', 'Judicial scheduling accommodation']
  },
  {
    title: 'QCs & Senior Barristers',
    professionals: ['Queen\'s Counsel', 'Senior Counsel', 'Leading Barristers', 'Silk Barristers'],
    locations: ['Inns of Court', 'Banco Court', 'Selborne Chambers', 'Owen Dixon Chambers'],
    serviceLevel: 'Platinum',
    responseTime: '1 hour',
    features: ['Legal document protection', 'Library preservation', 'Court schedule coordination']
  },
  {
    title: 'Commercial Law Partners',
    professionals: ['Corporate Law Partners', 'M&A Specialists', 'Banking Law Partners', 'Securities Lawyers'],
    locations: ['King & Wood Mallesons', 'Clayton Utz', 'Allens', 'Herbert Smith Freehills'],
    serviceLevel: 'Gold',
    responseTime: '2 hours',
    features: ['Confidential client protection', 'Deal document security', 'Office continuity planning']
  },
  {
    title: 'Property Law Specialists',
    professionals: ['Conveyancing Specialists', 'Development Lawyers', 'Planning Law Experts', 'Strata Lawyers'],
    locations: ['Property Law Firms', 'Development Consultancies', 'Government Legal'],
    serviceLevel: 'Gold',
    responseTime: '2 hours',
    features: ['Contract document care', 'Development plan protection', 'Settlement coordination']
  }
];

const discreteFeatures = [
  'Unmarked service vehicles for confidentiality',
  'After-hours and weekend response protocols',
  'Direct insurance billing and claims management',
  'Temporary relocation assistance coordination',
  'Professional practice continuity planning',
  'Confidential report generation and documentation',
  'Secure storage for high-value items during restoration',
  'Coordination with professional schedules and commitments'
];

export default function ProfessionalsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dr-new-ten.vercel.app/professionals',
    name: 'Discrete Professional Restoration Services Brisbane',
    image: 'https://dr-new-ten.vercel.app/images/discrete-professional-restoration.jpg',
    description: 'Confidential water damage restoration for Brisbane medical professionals, surgeons, specialists, judges, and QCs. Discrete, professional service with after-hours coordination.',
    url: 'https://dr-new-ten.vercel.app/professionals',
    telephone: '1300309361',
    email: 'discrete@disasterrecovery.com.au',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Confidential Professional Services',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-27.4705',
      longitude: '153.0260'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane',
        sameAs: 'https://en.wikipedia.org/wiki/Brisbane'
      },
      {
        '@type': 'Neighborhood',
        name: 'Samford Valley'
      },
      {
        '@type': 'Neighborhood',
        name: 'Brookfield'
      },
      {
        '@type': 'Neighborhood',
        name: 'New Farm'
      },
      {
        '@type': 'Neighborhood',
        name: 'Hamilton'
      },
      {
        '@type': 'Neighborhood',
        name: 'Ascot'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Professional Discrete Restoration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Medical Professional Discrete Service',
            description: 'Confidential restoration for surgeons, specialists, and medical practitioners'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Legal Professional Priority Response',
            description: 'Priority service for judges, QCs, and senior barristers'
          }
        }
      ]
    },
    openingHours: '24/7',
    hasMap: 'https://maps.google.com/maps?q=Brisbane+QLD+Australia',
    paymentAccepted: 'Insurance Direct Billing, Private Pay, Professional Association Billing',
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
    priceRange: '$25,000-$250,000+',
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
                <Shield className="w-12 h-12 text-gold-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Confidential • Discrete • Professional
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Medical & Legal Professional
                <span className="block text-yellow-400">Discrete Restoration Services</span>
              </h1>

              <p className="text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
                Confidential water damage restoration for Brisbane's medical professionals, surgeons, specialists,
                judges, and QCs. <strong>Master Restorer Phill McGurk</strong> provides discrete, professional service
                that protects your reputation, schedule, and privacy.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Lock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Confidential</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">30min</div>
                  <div className="text-blue-100">Elite Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Award className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">Master</div>
                  <div className="text-blue-100">Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <UserCheck className="w-8 h-8 mb-4 text-yellow-400 mx-auto" />
                  <div className="text-2xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">After Hours</div>
                </div>
              </div>

              <Link
                href="tel:1300309361"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-colors inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Discrete Emergency: 1300 309 361
              </Link>
            </div>
          </div>
        </section>

        {/* Medical Professionals */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Medical Professional Discrete Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Specialized restoration protocols for medical professionals requiring confidential,
                after-hours coordination that accommodates surgical schedules and hospital commitments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {medicalSpecialties.map((specialty, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-red-600">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {specialty.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-blue-600">{specialty.serviceLevel}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Specialists Served:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {specialty.professionals.map((prof, idx) => (
                          <div key={idx} className="text-sm bg-red-50 text-red-800 px-3 py-1 rounded">
                            {prof}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Locations:</span>
                      <div className="text-sm text-gray-700">
                        {specialty.locations.join(', ')}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-green-600">{specialty.responseTime}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Special Features:</span>
                    <div className="space-y-1">
                      {specialty.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Professionals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Legal Professional Priority Response
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Priority service for judges, QCs, and senior barristers requiring absolute discretion,
                security protocols, and minimal disruption to court schedules and legal practice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {legalProfessionals.map((legal, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg border-l-4 border-blue-600">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {legal.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-purple-600">{legal.serviceLevel}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Legal Professionals:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {legal.professionals.map((prof, idx) => (
                          <div key={idx} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded">
                            {prof}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 mb-2 block">Common Locations:</span>
                      <div className="text-sm text-gray-700">
                        {legal.locations.join(', ')}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Response Time:</span>
                        <div className="font-semibold text-green-600">{legal.responseTime}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Special Features:</span>
                    <div className="space-y-1">
                      {legal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discrete Service Features */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Discrete Service Protocols
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {discreteFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Restorer Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Trusted by Queensland's Leading Professionals
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Phill McGurk's Master Restorer certification and discrete service protocols have earned
                the trust of Brisbane's medical and legal communities. Our confidential approach ensures
                your professional reputation and personal privacy are protected during restoration.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Absolute Confidentiality</h3>
                  <p className="text-gray-300 text-sm">Professional privacy protocols guaranteed</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Schedule Accommodation</h3>
                  <p className="text-gray-300 text-sm">Work around surgical and court schedules</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <UserCheck className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Professional Standards</h3>
                  <p className="text-gray-300 text-sm">Service level matching your professional status</p>
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
              Professional Emergency? Discrete Response Available 24/7
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              When water damage threatens your home, practice, or professional reputation,
              our Master Restorer responds immediately with the discretion and expertise
              your professional status demands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Discrete Emergency: 1300 309 361
              </Link>
              <Link
                href="/samford-valley"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5" />
                Luxury Estate Services
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Additional Professional Services
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/services/wine-cellar-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Wine Cellar Restoration</h4>
                <p className="text-gray-600">Climate-controlled restoration for wine collections</p>
              </Link>
              <Link
                href="/services/art-antique-restoration"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Art & Antique Recovery</h4>
                <p className="text-gray-600">Museum-grade restoration techniques</p>
              </Link>
              <Link
                href="/emergency/steps"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Emergency Response</h4>
                <p className="text-gray-600">Immediate action steps and protocols</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}