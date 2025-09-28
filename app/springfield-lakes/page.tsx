import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, MapPin, Shield, Award, AlertTriangle, Home, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Springfield Lakes Premium Estate Restoration | Master Restorer Ipswich | Disaster Recovery',
  description: 'Expert disaster restoration for Springfield Lakes premium estates and luxury homes. Master certified restoration for lakefront properties, golf course estates, and executive homes. 24/7 emergency response.',
  keywords: 'Springfield Lakes restoration, premium estate restoration Ipswich, luxury home restoration, lakefront property restoration, golf course estate restoration, executive home restoration, Springfield restoration',
  openGraph: {
    title: 'Springfield Lakes Premium Estate Restoration | Master Restorer Ipswich',
    description: 'Expert disaster restoration for Springfield Lakes premium estates and luxury homes. Master certified restoration for lakefront properties and golf course estates.',
    url: 'https://dr-new-ten.vercel.app/springfield-lakes',
    siteName: 'Disaster Recovery Ipswich',
    images: [
      {
        url: 'https://dr-new-ten.vercel.app/images/premium-estate-restoration-springfield-lakes.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium estate restoration in Springfield Lakes Ipswich'
      }
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Springfield Lakes Premium Estate Restoration | Master Restorer Ipswich',
    description: 'Expert disaster restoration for Springfield Lakes premium estates and luxury homes. Master certified restoration for lakefront properties and golf course estates.',
    images: ['https://dr-new-ten.vercel.app/images/premium-estate-restoration-springfield-lakes.jpg'],
  },
  alternates: {
    canonical: 'https://dr-new-ten.vercel.app/springfield-lakes',
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
      "@id": "https://dr-new-ten.vercel.app/springfield-lakes#business",
      "name": "Springfield Lakes Premium Estate Restoration",
      "alternateName": "Luxury Home Restoration Springfield Lakes",
      "description": "Master certified disaster restoration specialists for Springfield Lakes premium estates, lakefront properties, and golf course homes. Expert restoration for executive residences and luxury developments.",
      "url": "https://dr-new-ten.vercel.app/springfield-lakes",
      "telephone": "+61-7-3000-0000",
      "email": "emergency@dr-new-ten.vercel.app",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Springfield Lakes",
        "addressRegion": "QLD",
        "postalCode": "4300",
        "addressCountry": "AU"
      },
      "areaServed": [
        "Springfield Lakes",
        "Springfield",
        "Augustine Heights",
        "Brookwater",
        "Redbank Plains"
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -27.6616,
        "longitude": 152.9217
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "sameAs": [
        "https://www.facebook.com/DisasterRecoveryIpswich",
        "https://www.linkedin.com/company/disaster-recovery-ipswich"
      ],
      "priceRange": "$$$$$",
      "currenciesAccepted": "AUD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, Insurance Direct",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -27.6616,
          "longitude": 152.9217
        },
        "geoRadius": "15000"
      }
    },
    {
      "@type": "Service",
      "@id": "https://dr-new-ten.vercel.app/springfield-lakes#premium-restoration",
      "name": "Premium Estate Restoration Springfield Lakes",
      "description": "Specialized premium estate restoration services including lakefront property restoration, golf course estate emergency response, and executive home disaster recovery.",
      "provider": {
        "@id": "https://dr-new-ten.vercel.app/springfield-lakes#business"
      },
      "serviceType": "Premium Estate Restoration",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "AUD",
        "price": "Contact for Quote",
        "description": "Premium estate specialist: 2.8x standard rates"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you specialize in Springfield Lakes premium estate restoration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we are Master certified specialists in premium estate restoration throughout Springfield Lakes. We understand the unique requirements of lakefront properties, golf course estates, and executive developments including Brookwater and premium residential areas."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle water damage in lakefront properties?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our lakefront property protocols address unique moisture challenges from lake proximity, including specialized humidity control and moisture barrier restoration. We understand the premium finishes and materials used in these exclusive developments."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide discrete service for executive families?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide completely discrete restoration services for executive families and high-profile residents. Our teams are background checked and trained in confidentiality protocols for sensitive residential work."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "Emergency Premium Estate Restoration Process in Springfield Lakes",
      "description": "Step-by-step process for emergency restoration in Springfield Lakes premium estates",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Premium Property Assessment",
          "text": "Immediate assessment of luxury finishes, custom elements, and high-value systems requiring specialized restoration."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Executive Family Coordination",
          "text": "Discrete coordination with family schedules and security requirements for minimal disruption."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Premium Material Restoration",
          "text": "Specialized restoration of luxury materials including marble, custom woodwork, and imported finishes."
        }
      ]
    }
  ]
};

export default function SpringfieldLakesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-8 w-8 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-lg">Premium Estate Specialist</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Springfield Lakes
                <span className="block text-yellow-400">Premium Estate Restoration</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                Master certified restoration for Springfield Lakes' most exclusive properties. Specialized expertise for lakefront estates, golf course homes, and executive residences.
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
                  Premium Services
                </Link>
              </div>

              {/* Premium Estate Badges */}
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
                    <span className="text-sm font-medium">Lakefront Property Specialist</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">Executive Response Team</span>
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
              <span className="font-semibold">PREMIUM ESTATE EMERGENCY RESPONSE</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Springfield Lakes Executive Priority</span>
              <span className="hidden sm:inline">•</span>
              <span>24/7 Available</span>
            </div>
          </div>
        </section>

        {/* Premium Estate Risk Assessment */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Springfield Lakes Premium Risk Profile
              </h2>
              <p className="text-xl text-gray-600">
                Understanding unique risks to luxury lakefront estates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Lakefront Properties</h3>
                    <p className="text-sm text-gray-600">Lake proximity humidity risks</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Premium lakefront estates face unique moisture challenges from lake proximity, requiring specialized humidity control and moisture barrier protection.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Golf Course Estates</h3>
                    <p className="text-sm text-gray-600">Irrigation water damage</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Golf course irrigation systems can cause water damage to premium homes. Our protocols address turf moisture infiltration and sprinkler system failures.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Executive Discretion</h3>
                    <p className="text-sm text-gray-600">Confidential service required</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  High-profile executives require discrete restoration services that protect privacy and maintain confidentiality throughout the process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Services */}
        <section id="services" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Specialized Premium Estate Services
              </h2>
              <p className="text-xl text-gray-600">
                Master certified restoration for Springfield Lakes' exclusive properties
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Lakefront Estate Restoration</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Lake Proximity Moisture Control</h4>
                      <p className="text-gray-600">Specialized humidity management systems for properties adjacent to Springfield Lake</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Waterfront Structure Protection</h4>
                      <p className="text-gray-600">Specialized restoration for jetties, boathouses, and lakefront entertainment areas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium Finish Preservation</h4>
                      <p className="text-gray-600">Expert restoration of marble, granite, imported tiles, and custom stonework</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Millwork Restoration</h4>
                      <p className="text-gray-600">Specialized restoration of bespoke cabinetry and architectural millwork</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive Discrete Service</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Background Checked Teams</h4>
                      <p className="text-gray-600">All technicians undergo comprehensive background screening for executive properties</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Confidentiality Protocols</h4>
                      <p className="text-gray-600">Strict NDAs and privacy procedures for high-profile residential restoration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Security Coordination</h4>
                      <p className="text-gray-600">Direct coordination with estate security systems and personnel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexible Scheduling</h4>
                      <p className="text-gray-600">Work scheduling around executive travel and family commitments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Golf Course Estate Expertise */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Brookwater & Golf Course Estate Specialists
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Specialized restoration expertise for Springfield Lakes' premier golf course communities including Brookwater and exclusive residential developments.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Home className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Golf Course Irrigation Damage</h3>
                      <p className="text-gray-600">Expert management of water damage from golf course irrigation system failures</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Development Protocols</h3>
                      <p className="text-gray-600">Specialized procedures for high-end residential developments and estate homes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Standards Compliance</h3>
                      <p className="text-gray-600">Adherence to exclusive community standards and homeowner association requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:text-center">
                <div className="bg-white rounded-xl p-8 shadow-sm border">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Estate Service</h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">2.8x</div>
                  <p className="text-gray-600 mb-6">Standard rate multiplier for premium estate specialist expertise</p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Executive response priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Background checked teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Confidentiality protocols</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Premium material expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage Areas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Premium Estate Coverage Areas
              </h2>
              <p className="text-xl text-gray-600">
                Specialized service for Springfield corridor premium developments
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Springfield Lakes</h3>
                <p className="text-sm text-gray-600">Lakefront premium estates</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Brookwater</h3>
                <p className="text-sm text-gray-600">Golf course estate homes</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Augustine Heights</h3>
                <p className="text-sm text-gray-600">Executive residences</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-2">Springfield Central</h3>
                <p className="text-sm text-gray-600">Premium developments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time Guarantee */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Executive Priority Response
              </h2>
              <p className="text-xl text-gray-600">
                Guaranteed response times for Springfield Lakes premium properties
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">20-Minute Response</h3>
                <p className="text-gray-600">
                  Emergency response within 20 minutes to Springfield Lakes, Brookwater, and Augustine Heights properties.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Executive Priority</h3>
                <p className="text-gray-600">
                  Premium estate properties receive priority dispatch and our most experienced Master certified technicians.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Master Restorer Certified</h3>
                <p className="text-gray-600">
                  Phill McGurk - One of limited Master Restorers in Queensland with premium estate restoration expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Protect Your Premium Estate Investment
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't let disaster damage compromise your Springfield Lakes estate. Our executive response team arrives within 20 minutes with discrete, professional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+61730000000"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call (07) 3000 0000
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
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