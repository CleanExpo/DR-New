import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
  description: 'Expert water damage restoration Brisbane metro. IICRC certified rapid extraction, advanced drying, mould prevention. Insurance specialists. 24/7 emergency. Call 1300 309 361.',
  keywords: ["water damage restoration brisbane","flood recovery","burst pipe repair","water extraction","structural drying","dehumidification services"],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage-restoration',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au/services/water-damage-restoration',
    },
  },
  openGraph: {
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
    description: 'Expert water damage restoration Brisbane metro. IICRC certified rapid extraction, advanced drying, mould prevention. Insurance specialists. 24/7 emerg...',
    url: 'https://disasterrecovery.com.au/services/water-damage-restoration',
    siteName: 'Disaster Recovery',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://disasterrecovery.com.au/images/services/water-damage-restoration.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency Response',
    description: 'Expert water damage restoration Brisbane metro. IICRC certified rapid extraction, advanced drying, mould prevention. Insurance specialists. 24/7 emerg...',
    images: ['https://disasterrecovery.com.au/images/services/water-damage-restoration.jpg'],
  },
};

export default function WaterDamageRestorationPage() {
  return (
    <>
      <SchemaMarkup type="Service" data={{ serviceName: 'Water Damage Restoration' }} />
      <SchemaMarkup
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
      <main id="main-content" role="main" aria-label="Water Damage Restoration Service">

        {/* Hero Section - Hemingway Style */}
        <section className="relative bg-blue-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Professional Water Damage Restoration
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Trusted by Brisbane's leading businesses and premium residences.
                  IICRC certified restoration specialising in subtropical climate challenges.
                </p>

                {/* Emergency CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="tel:1300309361"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg"
                  >
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call 1300 309 361 Now
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Quick Facts */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    1 Hour Response
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Insurance Approved
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    IICRC Certified
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/hero/fire-water-damage-restoration.jpg"
                  alt="Water damage restoration equipment in Brisbane home"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                  priority
                
            quality={85}
          
            sizes="100vw"
          
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
          />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Simple Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Brisbane Property Owners Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Come Fast</h3>
                <p className="text-gray-600">
                  Water spreads quickly through Queensland homes. Our Brisbane team responds immediately to minimise damage.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Do It Right</h3>
                <p className="text-gray-600">
                  Our team holds IICRC certificates. We use specialised equipment designed for Brisbane's humidity. We follow Australian standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Insurance Pays</h3>
                <p className="text-gray-600">
                  Preferred contractor for QBE, IAG, RACQ, and Allianz. We handle all documentation for your claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process - Step by Step */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Water Damage Restoration Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "We Inspect",
                  description: "Complete moisture mapping using thermal imaging. Structural assessment. Customised restoration plan."
                },
                {
                  step: "2",
                  title: "We Extract",
                  description: "Industrial water extraction using truck-mounted equipment. Rapid removal prevents secondary damage."
                },
                {
                  step: "3",
                  title: "We Dry",
                  description: "Structural drying with commercial dehumidifiers. Daily moisture monitoring. Documentation for insurance."
                },
                {
                  step: "4",
                  title: "We Restore",
                  description: "Complete restoration including repairs, sanitisation, and mould prevention. Full warranty on all work."
                }
              ].map((process, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Servicing Greater Brisbane
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Specialising in Brisbane's premium suburbs and commercial districts. 30-minute response to New Farm, Ascot, Hamilton, and Toowong.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Brisbane CBD', 'South Brisbane', 'West End', 'Fortitude Valley',
                'New Farm', 'Paddington', 'Milton', 'Toowong',
                'Ipswich', 'Logan', 'Wacol', 'Forest Lake',
                'Indooroopilly', 'Chermside', 'Carindale', 'Garden City'
              ].map((area) => (
                <div key={area} className="bg-gray-50 rounded-lg py-3 px-4">
                  <span className="text-gray-700 font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Water Damage Emergency?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Every minute counts in Queensland's humid climate. Call now for immediate response. IICRC certified restoration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors border-2 border-red-700"
              >
                Emergency Contact
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions - Water Damage Brisbane
            </h2>
            <div className="space-y-8">
              {[
                {
                  question: "How quickly can you respond to water damage in Brisbane?",
                  answer: "Immediate response across Brisbane, with 30-minute arrival in CBD and inner suburbs. Our Wacol headquarters allows rapid deployment throughout Brisbane, Ipswich, and Logan."
                },
                {
                  question: "Will insurance cover water damage restoration in Queensland?",
                  answer: "Most policies cover sudden water damage. As preferred contractors for major insurers including QBE, IAG, and RACQ, we handle all claim documentation and direct billing."
                },
                {
                  question: "How do you prevent mould growth in Brisbane's climate?",
                  answer: "Brisbane's subtropical climate requires specialised drying protocols. We use commercial dehumidifiers, antimicrobial treatments, and monitor moisture levels to Australian Standard AS/NZS 4849.1."
                },
                {
                  question: "What areas in Brisbane do you service?",
                  answer: "Complete coverage of Brisbane, Ipswich, and Logan from our Wacol headquarters. Priority response to commercial properties and premium residential suburbs."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}