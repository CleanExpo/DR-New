import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Water Damage Restoration Brisbane | 1 Hour Response | 1300 309 361",
  description: "Flooded home? We fix water damage fast in Brisbane, Ipswich & Logan. We extract water, dry homes, stop mould. Call 1300 309 361 for immediate help.",
  keywords: ["water damage restoration brisbane", "flood damage repair", "water extraction brisbane", "emergency water damage", "water damage cleanup brisbane", "flood restoration brisbane"],
  openGraph: {
    title: "Water Damage Restoration Brisbane | Emergency Response",
    description: "Professional water damage restoration in Brisbane. 1 hour response time. We extract water, dry your home, and prevent mould growth.",
    url: "https://disasterrecovery.com.au/services/water-damage-restoration",
  }
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
                  Water Damage? We Fix It Fast.
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Flooded home? Burst pipes? We come to Brisbane homes in 1 hour.
                  We extract water. We dry everything. We stop mould growth.
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
                    Get Free Quote
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
                    Insurance Works
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
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Simple Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Brisbane Families Choose Us
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
                  Water spreads quickly. We arrive in 1 hour. We stop damage from getting worse.
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
                  Our team holds IICRC certificates. We use professional equipment. We follow proper methods.
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
                  We work with all insurance companies. We handle the paperwork. You pay nothing extra.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process - Step by Step */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How We Fix Water Damage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "We Inspect",
                  description: "We find all water. We check for damage. We make a plan."
                },
                {
                  step: "2",
                  title: "We Extract",
                  description: "We remove all water. We use powerful pumps. We work fast."
                },
                {
                  step: "3",
                  title: "We Dry",
                  description: "We dry everything completely. We use fans and dehumidifiers. We check moisture levels."
                },
                {
                  step: "4",
                  title: "We Restore",
                  description: "We fix damage. We clean everything. We make it like new."
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
              We Help Brisbane Families
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Water damage happens fast. We come to you fast. We serve all Brisbane areas.
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
              Every minute counts. Call now. We come fast. We fix it right.
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
                Get Quote Online
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Water Damage Questions
            </h2>
            <div className="space-y-8">
              {[
                {
                  question: "How fast do you respond to water damage?",
                  answer: "We respond in 1 hour. Water spreads fast. We come fast to stop damage."
                },
                {
                  question: "Will insurance pay for water damage repair?",
                  answer: "Most insurance covers sudden water damage. We work with all insurers. We handle claims."
                },
                {
                  question: "How do you prevent mould after water damage?",
                  answer: "We dry everything completely. We use dehumidifiers. We check moisture levels. No moisture means no mould."
                },
                {
                  question: "What areas in Brisbane do you service?",
                  answer: "We serve all Brisbane, Ipswich, and Logan. We come from our Wacol office in 1 hour."
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