import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, MapPin, Shield, Award, AlertTriangle, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Toowong Heritage Queenslander Restoration | Master Restorer Brisbane | Disaster Recovery',
  description: 'Expert heritage Queenslander restoration in Toowong Brisbane. Master certified restoration for character homes, university precinct properties, and heritage-listed buildings. 24/7 emergency response.',
  keywords: 'Toowong restoration, heritage Queenslander restoration Brisbane, heritage building restoration, character home restoration, university precinct restoration, heritage council compliance, Brisbane heritage restoration',
  openGraph: {
    title: 'Toowong Heritage Queenslander Restoration | Master Restorer Brisbane',
    description: 'Expert heritage Queenslander restoration in Toowong Brisbane. Master certified restoration for character homes and heritage-listed buildings.',
    url: 'https://dr-new-ten.vercel.app/brisbane/toowong',
    siteName: 'Disaster Recovery Brisbane',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/heritage-restoration-toowong.jpg',
        width: 1200,
        height: 630,
        alt: 'Heritage Queenslander restoration in Toowong Brisbane'
      }
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toowong Heritage Queenslander Restoration | Master Restorer Brisbane',
    description: 'Expert heritage Queenslander restoration in Toowong Brisbane. Master certified restoration for character homes and heritage-listed buildings.',
    images: ['https://dr-new-ten.vercel.app/images/heritage-restoration-toowong.jpg'],
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/brisbane/toowong',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://dr-new-ten.vercel.app/brisbane/toowong#business",
      "name": "Toowong Heritage Queenslander Restoration",
      "alternateName": "Heritage Restoration Toowong Brisbane",
      "description": "Master certified heritage Queenslander restoration specialists serving Toowong and university precinct. Expert restoration for character homes, heritage-listed buildings, and university properties.",
      "url": "https://dr-new-ten.vercel.app/brisbane/toowong",
      "telephone": "+61-7-3000-0000",
      "email": "emergency@dr-new-ten.vercel.app",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toowong",
        "addressRegion": "QLD",
        "postalCode": "4066",
        "addressCountry": "AU"
      },
      "areaServed": [
        "Toowong",
        "University of Queensland",
        "St Lucia",
        "Indooroopilly",
        "Taringa"
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -27.4840,
        "longitude": 152.9942
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "sameAs": [
        "https://www.facebook.com/DisasterRecoveryBrisbane",
        "https://www.linkedin.com/company/disaster-recovery-brisbane"
      ],
      "priceRange": "$$$$$",
      "currenciesAccepted": "AUD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, Insurance Direct",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -27.4840,
          "longitude": 152.9942
        },
        "geoRadius": "5000"
      }
    },
    {
      "@type": "Service",
      "@id": "https://dr-new-ten.vercel.app/brisbane/toowong#heritage-restoration",
      "name": "Heritage Queenslander Restoration Toowong",
      "description": "Specialized heritage Queenslander restoration services including character home restoration, heritage council compliance, and university precinct emergency response.",
      "provider": {
        "@id": "https://dr-new-ten.vercel.app/brisbane/toowong#business"
      },
      "serviceType": "Heritage Building Restoration",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "AUD",
        "price": "Contact for Quote",
        "description": "Heritage specialist premium: 2.5x standard rates"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you specialize in heritage Queenslander restoration in Toowong?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we are Master certified specialists in heritage Queenslander restoration throughout Toowong and the university precinct. We understand the unique requirements of character homes and heritage-listed buildings, including Brisbane City Council heritage compliance."
          }
        },
        {
          "@type": "Question",
          "name": "Can you restore water damage to heritage timber features?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our heritage restoration protocols preserve original timber features, ornate fretwork, and character elements. We use specialized drying techniques that protect heritage materials while ensuring complete moisture removal."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with heritage council requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we coordinate directly with Brisbane City Council Heritage Unit and ensure all restoration work meets heritage compliance requirements. We handle permit applications and heritage impact assessments."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "Emergency Heritage Queenslander Restoration Process in Toowong",
      "description": "Step-by-step process for emergency heritage restoration in Toowong character homes",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Heritage Assessment and Stabilization",
          "text": "Immediate assessment of heritage elements and emergency stabilization to prevent further damage to character features."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Heritage Council Notification",
          "text": "Notification to Brisbane City Council Heritage Unit if property is heritage-listed or in character precinct."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Specialized Heritage Restoration",
          "text": "Implementation of heritage-appropriate restoration techniques preserving original materials and character."
        }
      ]
    }
  ]
};

export default function ToowongHeritagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-800 text-white py-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Home className="h-8 w-8 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-lg">Heritage Specialist</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Toowong Heritage
                <span className="block text-yellow-400">Queenslander Restoration</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                Master certified heritage restoration for Toowong's character homes and university precinct properties. Preserving Brisbane's architectural heritage with specialized expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:+61730000000"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Emergency: (07) 3000 0000
                </a>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-white/20"
                >
                  <Shield className="h-5 w-5" />
                  Heritage Services
                </Link>
              </div>

              {/* Heritage Authority Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">Master Restorer Certified</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">Heritage Council Approved</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">Character Home Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Response Banner */}
        <section className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 text-center">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              <span className="font-semibold">HERITAGE EMERGENCY RESPONSE</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Protecting Toowong's Character Homes</span>
              <span className="hidden sm:inline">•</span>
              <span>24/7 Available</span>
            </div>
          </div>
        </section>

        {/* Heritage Risk Assessment */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Toowong Heritage Risk Profile
              </h2>
              <p className="text-xl text-gray-600">
                Understanding unique risks to Toowong's character architecture
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Elevated Queenslanders</h3>
                    <p className="text-sm text-gray-600">High-set character homes</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Traditional raised construction creates unique water damage patterns. Our heritage protocols preserve original stumps and timber framing.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">University Precinct</h3>
                    <p className="text-sm text-gray-600">Student accommodation risks</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  High-density student living in character homes requires discrete, efficient restoration to minimize disruption to academic schedules.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Heritage Protection</h3>
                    <p className="text-sm text-gray-600">Council compliance required</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Brisbane City Council heritage overlay requires specialized restoration techniques and permit compliance for character precincts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Services */}
        <section id="services" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Specialized Heritage Services
              </h2>
              <p className="text-xl text-gray-600">
                Master certified restoration for Toowong's architectural treasures
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Queenslander Character Restoration</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Original Timber Preservation</h4>
                      <p className="text-gray-600">Specialized drying and restoration of heritage hardwood floors, walls, and decorative elements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fretwork and Ornate Detail Protection</h4>
                      <p className="text-gray-600">Careful restoration of decorative timber fretwork and character architectural features</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Traditional VJ Wall Restoration</h4>
                      <p className="text-gray-600">Expert repair and restoration of vertical joint timber wall systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Heritage Paint System Restoration</h4>
                      <p className="text-gray-600">Period-appropriate paint systems and color matching for character homes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">University Precinct Response</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Student Accommodation Emergency</h4>
                      <p className="text-gray-600">Rapid response for boarding houses and student rental properties near UQ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Academic Schedule Coordination</h4>
                      <p className="text-gray-600">Work scheduling around exam periods and academic calendar requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">University Property Management</h4>
                      <p className="text-gray-600">Direct coordination with UQ property services and facilities management</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Discrete Service Delivery</h4>
                      <p className="text-gray-600">Minimal disruption restoration for shared student living environments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Council Compliance */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Brisbane City Council Heritage Compliance
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Expert navigation of heritage overlay requirements and restoration permits for Toowong character precincts.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Heritage Impact Assessment</h3>
                      <p className="text-gray-600">Professional assessment and documentation for heritage council submission</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Permit Application Management</h3>
                      <p className="text-gray-600">Complete handling of council permit applications and compliance documentation</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Home className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Character Precinct Expertise</h3>
                      <p className="text-gray-600">Deep understanding of Toowong character area requirements and restrictions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:text-center">
                <div className="bg-white rounded-xl p-8 shadow-sm border">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Heritage Premium Service</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">2.5x</div>
                  <p className="text-gray-600 mb-6">Standard rate multiplier for heritage specialist expertise</p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Council compliance included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Heritage impact assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Permit application management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Character preservation expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Expertise */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Deep Toowong Expertise
              </h2>
              <p className="text-xl text-gray-600">
                Local knowledge of character precincts and heritage requirements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Character Precinct Knowledge</h3>
                <p className="text-gray-600">
                  Intimate understanding of Toowong's heritage overlay areas and specific council requirements for character homes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">30-Minute Response</h3>
                <p className="text-gray-600">
                  Emergency response within 30 minutes to Toowong, Taringa, and university precinct heritage emergencies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Master Restorer Certified</h3>
                <p className="text-gray-600">
                  Phill McGurk - One of limited Master Restorers in Brisbane with specialized heritage Queenslander expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Heritage Service Coverage
              </h2>
              <p className="text-xl text-gray-600">
                Specialized heritage restoration across Brisbane's character precincts
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Toowong</h3>
                <p className="text-sm text-gray-600">Heritage overlay precinct</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Taringa</h3>
                <p className="text-sm text-gray-600">Character home concentration</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">St Lucia</h3>
                <p className="text-sm text-gray-600">University district heritage</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Indooroopilly</h3>
                <p className="text-sm text-gray-600">Historical character homes</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Protect Your Heritage Investment
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't let water, fire, or storm damage compromise your Toowong character home. Our heritage specialists respond within 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+61730000000"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call (07) 3000 0000
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Home className="h-5 w-5" />
                All Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}