import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnhancedSchemaMarkup from '@/components/seo/EnhancedSchemaMarkup';
import ServiceHeroOptimized from '@/components/sections/ServiceHeroOptimized';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';
import { CheckCircle, Clock, Phone, MapPin, AlertTriangle, Droplets, Wind, Home, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response | Disaster Recovery',
  description: 'Professional water damage restoration in Brisbane, Ipswich & Logan. IICRC certified, 1-hour response, insurance approved. Specialising in Queenslander homes & commercial properties. Call 1300 309 361.',
  keywords: [
    'water damage restoration Brisbane',
    'flood restoration Brisbane',
    'water extraction Brisbane',
    'emergency water damage Brisbane',
    'Brisbane flood cleanup',
    'water damage repair Brisbane',
    'Queenslander water damage',
    'commercial water damage Brisbane',
    'burst pipe repair Brisbane',
    'storm water damage Brisbane'
  ],
  openGraph: {
    title: 'Water Damage Restoration Brisbane | 1 Hour Emergency Response',
    description: 'Brisbane's trusted water damage specialists. IICRC certified, insurance approved, 24/7 emergency response. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/services/water-damage-restoration',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/water-damage-restoration-brisbane.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Damage Restoration Brisbane'
      }
    ]
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage-restoration'
  }
};

// FAQ data for schema and content
const faqData = [
  {
    question: "How quickly can you respond to water damage in Brisbane?",
    answer: "We guarantee 1-hour emergency response throughout Brisbane, Ipswich, and Logan. Our teams are on standby 24/7 and dispatch immediately from our Wacol headquarters. For suburbs like New Farm, Ascot, and Hamilton, typical response time is 30-40 minutes. We understand that every minute counts with water damage - the faster we extract water and begin drying, the less damage occurs and the lower the restoration costs."
  },
  {
    question: "Does insurance cover water damage restoration in Queensland?",
    answer: "Most home and contents insurance policies in Queensland cover sudden water damage from burst pipes, storms, or accidental flooding. We work directly with all major insurers including QBE, IAG, RACQ, Allianz, and Suncorp. Our team handles the entire claims process, providing detailed documentation, photos, and moisture readings. We can arrange direct billing so you don't pay upfront. However, gradual damage from lack of maintenance typically isn't covered."
  },
  {
    question: "How do you prevent mould after water damage in Brisbane's humid climate?",
    answer: "Brisbane's subtropical climate with 65-75% humidity creates perfect mould conditions. We prevent mould through our proven 4-step process: 1) Extract all water within 24 hours using truck-mounted equipment, 2) Deploy industrial dehumidifiers to reduce humidity below 50%, 3) Apply antimicrobial treatments to all affected surfaces, 4) Monitor moisture levels for 72 hours using thermal imaging and moisture metres. Our IICRC-certified process ensures mould doesn't develop."
  },
  {
    question: "What's the cost of water damage restoration in Brisbane?",
    answer: "Water damage restoration costs in Brisbane typically range from $2,000 to $15,000 depending on several factors: the extent of damage, property size, water category (clean/grey/black), materials affected (carpet, hardwood, plaster), and drying time required. Category 1 clean water from burst pipes costs less than Category 3 black water from sewage. We provide free assessments and detailed quotes. Most importantly, we work with your insurance for direct billing."
  },
  {
    question: "Can you restore heritage Queenslander homes after water damage?",
    answer: "Yes, we specialise in restoring heritage Queenslander homes throughout Brisbane. Our team has extensive experience with the unique construction of VJ walls, tongue-and-groove timber floors, decorative fretwork, and pressed metal ceilings. We use specialised drying techniques that preserve original materials while meeting Brisbane City Council heritage requirements. We've successfully restored hundreds of character homes in New Farm, Paddington, Ascot, and other heritage suburbs."
  },
  {
    question: "What areas of Brisbane do you service for water damage?",
    answer: "We service all of Brisbane, Ipswich, Logan and surrounding areas within 50km of our Wacol headquarters. Our primary service areas include Brisbane CBD, New Farm, Ascot, Hamilton, Toowong, Paddington, Bulimba, West End, South Brisbane, Fortitude Valley, Milton, St Lucia, Indooroopilly, Chermside, Carindale, and all suburbs in between. We also provide emergency response to Gold Coast and Sunshine Coast properties."
  }
];

export default function WaterDamageRestorationOptimizedPage() {
  return (
    <>
      {/* Enhanced Schema Markup */}
      <EnhancedSchemaMarkup type="LocalBusinessEmergency" />
      <EnhancedSchemaMarkup
        type="ServiceDetailed"
        data={{
          serviceName: 'Water Damage Restoration',
          description: 'Professional water damage restoration services in Brisbane, Ipswich, and Logan. IICRC certified technicians provide 24/7 emergency response with advanced drying equipment and insurance coordination.',
          offerCatalog: {
            "@type": "OfferCatalog",
            "name": "Water Damage Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Emergency Water Extraction",
                  "description": "Immediate water removal using truck-mounted extraction units with 1-hour response time"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Structural Drying",
                  "description": "Advanced drying using industrial dehumidifiers and air movers to prevent structural damage"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Moisture Detection & Mapping",
                  "description": "Thermal imaging and moisture metre testing to identify all affected areas"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mould Prevention Treatment",
                  "description": "Antimicrobial application and humidity control to prevent mould growth"
                }
              }
            ]
          }
        }}
      />
      <EnhancedSchemaMarkup type="FAQEnhanced" data={{ questions: faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))}} />
      <EnhancedSchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://disasterrecovery.com.au" },
            { name: "Services", url: "https://disasterrecovery.com.au/services" },
            { name: "Water Damage Restoration", url: "https://disasterrecovery.com.au/services/water-damage-restoration" }
          ]
        }}
      />

      <Header />

      <main id="main-content" role="main">
        {/* Optimized Hero Section */}
        <ServiceHeroOptimized service="water" />

        {/* Brisbane-Specific Water Damage Risks */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Brisbane's Unique Water Damage Challenges
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our subtropical climate and weather patterns create specific water damage risks that require local expertise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Subtropical Humidity</h3>
                <p className="text-sm text-gray-600">
                  Brisbane's 65-75% humidity accelerates mould growth. We use industrial dehumidifiers calibrated for our climate.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Wind className="w-10 h-10 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Storm Season</h3>
                <p className="text-sm text-gray-600">
                  October to March brings severe storms with heavy rain, hail, and flooding. We're prepared for storm surge damage.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Home className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Queenslander Homes</h3>
                <p className="text-sm text-gray-600">
                  Timber construction, VJ walls, and raised foundations need specialised drying to preserve character features.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Shield className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">River Flooding</h3>
                <p className="text-sm text-gray-600">
                  Brisbane River flooding affects riverside suburbs. We have extensive experience from 2011 and 2022 floods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Optimized for Featured Snippets */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Water Damage Restoration Process
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              IICRC-certified 7-step restoration process tailored for Brisbane properties
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Process Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Emergency Contact',
                    description: 'Call 1300 309 361 for immediate 24/7 response',
                    time: '< 1 minute'
                  },
                  {
                    step: '2',
                    title: 'Inspection & Assessment',
                    description: 'Identify water source, assess damage, document for insurance',
                    time: '30 minutes'
                  },
                  {
                    step: '3',
                    title: 'Water Extraction',
                    description: 'Remove standing water with truck-mounted extractors',
                    time: '2-4 hours'
                  },
                  {
                    step: '4',
                    title: 'Drying & Dehumidification',
                    description: 'Deploy industrial equipment to dry structure completely',
                    time: '3-5 days'
                  },
                  {
                    step: '5',
                    title: 'Cleaning & Sanitising',
                    description: 'Apply antimicrobial treatments to prevent mould',
                    time: '1 day'
                  },
                  {
                    step: '6',
                    title: 'Restoration & Repairs',
                    description: 'Repair damaged materials, paint, replace flooring',
                    time: '2-7 days'
                  },
                  {
                    step: '7',
                    title: 'Final Inspection',
                    description: 'Moisture testing, quality check, warranty provided',
                    time: '2 hours'
                  }
                ].map((process) => (
                  <div key={process.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{process.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{process.description}</p>
                      <p className="text-blue-600 text-xs mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {process.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Benefits */}
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Why Brisbane Chooses Disaster Recovery
                </h3>

                <div className="space-y-4">
                  {[
                    '1-hour emergency response guarantee',
                    'IICRC certified technicians',
                    'Direct insurance billing - no upfront costs',
                    'Advanced thermal imaging technology',
                    'Antimicrobial treatments included',
                    '24/7 emergency service',
                    'Free assessments and quotes',
                    'Warranty on all restoration work',
                    'Local Brisbane team since 2011'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-blue-100">
                  <div className="flex items-center justify-around">
                    <Image
                      src="/images/badges/iicrc-certified.svg"
                      alt="IICRC Certified"
                      width={80}
                      height={60}
                    />
                    <Image
                      src="/images/badges/carsi-member.svg"
                      alt="CARSI Member"
                      width={80}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Area Coverage - Hyper-local SEO */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Water Damage Restoration Across Brisbane
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Fast response times to all Brisbane suburbs from our Wacol headquarters
            </p>

            {/* Response Time Map */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Response Times</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">15-30 Minutes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Wacol, Forest Lake, Inala</li>
                    <li>• Richlands, Darra, Oxley</li>
                    <li>• Jindalee, Mount Ommaney</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-600 mb-2">30-40 Minutes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Brisbane CBD, South Brisbane</li>
                    <li>• New Farm, Teneriffe, Fortitude Valley</li>
                    <li>• Toowong, St Lucia, Indooroopilly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-purple-600 mb-2">40-50 Minutes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ascot, Hamilton, Clayfield</li>
                    <li>• Bulimba, Hawthorne, Morningside</li>
                    <li>• Chermside, Kedron, Stafford</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wealthy Suburbs Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  suburb: 'New Farm',
                  features: 'Heritage Queenslanders, riverside properties',
                  landmarks: 'Brisbane Powerhouse, New Farm Park'
                },
                {
                  suburb: 'Ascot',
                  features: 'Grand estates, Victorian homes',
                  landmarks: 'Eagle Farm Racecourse, Ascot State School'
                },
                {
                  suburb: 'Hamilton',
                  features: 'Luxury apartments, riverside mansions',
                  landmarks: 'Portside Wharf, Eat Street Markets'
                },
                {
                  suburb: 'Paddington',
                  features: 'Character homes, heritage terraces',
                  landmarks: 'Suncorp Stadium, Caxton Street'
                },
                {
                  suburb: 'Toowong',
                  features: 'Hillside homes, modern townhouses',
                  landmarks: 'Toowong Village, Mt Coot-tha'
                },
                {
                  suburb: 'Bulimba',
                  features: 'Queenslanders, riverside properties',
                  landmarks: 'Oxford Street, Bulimba Memorial Park'
                }
              ].map((area) => (
                <div key={area.suburb} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    <MapPin className="inline w-4 h-4 text-blue-600 mr-1" />
                    {area.suburb}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{area.features}</p>
                  <p className="text-xs text-gray-500">Near: {area.landmarks}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Voice Search Optimized */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Water Damage Restoration FAQs
            </h2>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">
              Water Damage Emergency in Brisbane?
            </h2>
            <p className="text-xl mb-2 text-blue-100">
              Every minute counts. Water spreads quickly. Mould grows in 24-48 hours.
            </p>
            <p className="text-lg mb-8 text-blue-100">
              Our IICRC-certified team is ready to respond immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
              >
                <Phone className="w-6 h-6 mr-2 animate-pulse" />
                <span className="text-xl">1300 309 361</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Get Free Assessment
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>1 Hour Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>24/7 Service</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}