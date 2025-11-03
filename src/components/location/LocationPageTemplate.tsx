import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { SuburbData } from '@/lib/location-data';
import { Phone, Clock, Shield, Award, Users, AlertTriangle, MapPin, CheckCircle } from 'lucide-react';

interface LocationPageTemplateProps {
  suburb: SuburbData;
}

export default function LocationPageTemplate({ suburb }: LocationPageTemplateProps) {
  // Generate schema markup
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://disasterrecovery.com.au/locations/${suburb.slug}`,
    "name": `Disaster Recovery - ${suburb.name}`,
    "image": suburb.heroImage
      ? `https://disasterrecovery.com.au${suburb.heroImage}`
      : "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
    "telephone": "1300 309 361",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `Servicing ${suburb.name}`,
      "addressLocality": suburb.name,
      "addressRegion": "QLD",
      "postalCode": suburb.postcode,
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": suburb.coordinates.latitude,
      "longitude": suburb.coordinates.longitude
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  const emergencyServiceSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": `24/7 Emergency Disaster Recovery ${suburb.name}`,
    "telephone": "1300 309 361",
    "areaServed": {
      "@type": "City",
      "name": suburb.name
    },
    "availableLanguage": {
      "@type": "Language",
      "name": "English"
    },
    "serviceType": ["Water Damage Restoration", "Fire Damage Restoration", "Mould Remediation", "Emergency Response"]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Disaster Recovery",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Disaster Recovery"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": suburb.coordinates.latitude,
        "longitude": suburb.coordinates.longitude
      },
      "geoRadius": "10000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Disaster Recovery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Restoration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire and Smoke Damage"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mould Remediation"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How quickly can you respond to emergencies in ${suburb.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our team can reach ${suburb.name} within ${suburb.responseTime} from our Wacol headquarters. We guarantee a 1-hour emergency response for all disaster recovery situations in ${suburb.name} and surrounding areas.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you work with insurance companies for ${suburb.name} properties?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we work directly with all major insurance companies including QBE, IAG, RACQ, Allianz, and Suncorp. We handle the entire claims process for ${suburb.name} residents, ensuring a smooth restoration experience.`
        }
      },
      {
        "@type": "Question",
        "name": `What types of disasters do you handle in ${suburb.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We specialise in water damage, fire and smoke damage, mould remediation, storm damage, sewage cleanup, and biohazard cleaning throughout ${suburb.name}. Our IICRC-certified technicians are equipped to handle any disaster recovery situation.`
        }
      },
      {
        "@type": "Question",
        "name": `Are you available 24/7 for ${suburb.name} emergencies?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our emergency response team is available 24 hours a day, 7 days a week, 365 days a year for ${suburb.name} residents. Call 1300 309 361 any time for immediate assistance.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencyServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          {/* Hero Image Background (if available) */}
          {suburb.heroImage && (
            <div className="absolute inset-0">
              <Image
                src={suburb.heroImage}
                alt={suburb.heroImageAlt || `Disaster Recovery service in ${suburb.name}`}
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                24/7 Disaster Recovery {suburb.name}
                <span className="block text-2xl md:text-3xl mt-2 text-blue-200">
                  1-Hour Emergency Response Guarantee
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-50">
                IICRC Certified • Insurance Approved • {suburb.responseTime} Response Time
              </p>

              {/* Emergency CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  <Phone className="mr-2" />
                  Emergency: 1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold rounded-lg text-lg transition-all hover:bg-blue-50 shadow-xl"
                >
                  Get Free Quote
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                  <Shield className="w-5 h-5 mr-2" />
                  $20M Insurance
                </span>
                <span className="flex items-center bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                  <Award className="w-5 h-5 mr-2" />
                  IICRC Certified
                </span>
                <span className="flex items-center bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                  <Clock className="w-5 h-5 mr-2" />
                  Since 2011
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Local Response Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <MapPin className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Local {suburb.name} Team</h3>
                <p className="text-gray-600 mb-4">
                  Only {suburb.distanceFromWacol}km from our Wacol headquarters
                </p>
                <p className="font-semibold text-blue-600">
                  Response Time: {suburb.responseTime}
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <AlertTriangle className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Local Disaster Risks</h3>
                <ul className="space-y-2">
                  {suburb.disasterRisks.slice(0, 3).map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Service Coverage</h3>
                <p className="text-gray-600 mb-2">
                  Also servicing nearby:
                </p>
                <p className="font-medium text-gray-800">
                  {suburb.serviceAreas.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About the Area */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Disaster Recovery Services in {suburb.name}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {suburb.localInsights}
                </p>

                {suburb.demographics.medianHousePrice && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Local Property Profile:</h4>
                    <ul className="space-y-2 text-gray-700">
                      {suburb.demographics.medianHousePrice && (
                        <li>• Median House Price: {suburb.demographics.medianHousePrice}</li>
                      )}
                      {suburb.demographics.population && (
                        <li>• Population: {suburb.demographics.population}</li>
                      )}
                      <li>• Property Types: {suburb.demographics.propertyType}</li>
                    </ul>
                  </div>
                )}

                {suburb.floodHistory && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-bold text-amber-900 mb-2">Flood History:</h4>
                    <p className="text-gray-700">{suburb.floodHistory}</p>
                  </div>
                )}
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-6 text-blue-900">
                    Why Choose Us for {suburb.name}?
                  </h3>
                  <ul className="space-y-4">
                    {suburb.uniqueSellingPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our {suburb.name} Disaster Recovery Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Water Damage Restoration</h3>
                <p className="text-gray-600">
                  24/7 water extraction, structural drying, and restoration for {suburb.name} properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Fire & Smoke Damage</h3>
                <p className="text-gray-600">
                  Complete fire damage restoration and smoke odour removal throughout {suburb.name}.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🦠</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Mould Remediation</h3>
                <p className="text-gray-600">
                  IICRC-certified mould removal and prevention for {suburb.name} homes and businesses.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⛈️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Storm Damage Recovery</h3>
                <p className="text-gray-600">
                  Rapid storm damage assessment and restoration services across {suburb.name}.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Biohazard Cleaning</h3>
                <p className="text-gray-600">
                  Professional biohazard and trauma cleaning services for {suburb.name} properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Commercial Restoration</h3>
                <p className="text-gray-600">
                  Minimise business downtime with our commercial restoration services in {suburb.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Landmarks */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Servicing All of {suburb.name}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center mb-8">
                Our team provides comprehensive disaster recovery services throughout {suburb.name},
                including rapid response to properties near:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {suburb.landmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{landmark}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Partners */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Approved {suburb.name} Restoration
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['QBE', 'IAG', 'RACQ', 'Allianz'].map((insurer) => (
                <div key={insurer} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{insurer}</div>
                  <p className="text-sm text-gray-600">Approved Provider</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-lg text-gray-700">
              We handle all insurance paperwork and direct billing for {suburb.name} residents
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions - {suburb.name}
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">
                  How quickly can you respond to emergencies in {suburb.name}?
                </h3>
                <p className="text-gray-700">
                  Our team can reach {suburb.name} within {suburb.responseTime} from our Wacol headquarters.
                  We guarantee a 1-hour emergency response for all disaster recovery situations in {suburb.name}
                  and surrounding areas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">
                  Do you work with insurance companies for {suburb.name} properties?
                </h3>
                <p className="text-gray-700">
                  Yes, we work directly with all major insurance companies including QBE, IAG, RACQ, Allianz,
                  and Suncorp. We handle the entire claims process for {suburb.name} residents, ensuring a
                  smooth restoration experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">
                  What certifications do your {suburb.name} technicians have?
                </h3>
                <p className="text-gray-700">
                  All our technicians servicing {suburb.name} are IICRC certified in water damage restoration,
                  fire and smoke restoration, and mould remediation. We're also CARSI members and carry
                  $20 million in public liability insurance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">
                  What areas near {suburb.name} do you service?
                </h3>
                <p className="text-gray-700">
                  In addition to {suburb.name}, we provide rapid response to {suburb.serviceAreas.join(', ')},
                  and all surrounding suburbs within the greater Brisbane and Ipswich region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {suburb.name}&apos;s Trusted Emergency Response Team
            </h2>
            <p className="text-xl mb-8">
              Available 24/7 for water damage, fire restoration, and all disaster recovery needs.
              {suburb.distanceFromWacol}km from our base means we&apos;re always nearby when you need us most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                <Phone className="mr-2" />
                Call 1300 309 361 Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-bold rounded-lg text-lg transition-all hover:bg-blue-50 shadow-xl"
              >
                Request Free Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}