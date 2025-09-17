import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveChat from '@/components/chat/LiveChat';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" aria-label="Main content">
        {/* Simple, Truthful Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Brisbane Disaster Recovery Experts
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              We fix water damage fast. We clean fire damage completely. We remove mould safely.
              Brisbane families trust us. We serve Brisbane, Ipswich and Logan.
            </p>

            {/* Clear CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Location */}
            <p className="text-gray-700">
              <span className="font-medium">Office:</span> 4/17 Tile St, Wacol, QLD 4076
            </p>
          </div>
        </section>

        {/* Core Services - Simple Grid */}
        <section className="py-16 bg-white" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto px-6">
            <h2 id="services-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Water Damage Restoration Brisbane",
                  description: "Flooded? We extract water. We dry your home. We stop mould growth.",
                  link: "/services/water-damage-restoration"
                },
                {
                  title: "Fire Damage Restoration Brisbane",
                  description: "Fire destroyed your home? We clean smoke. We remove soot. We restore everything.",
                  link: "/services/fire-damage-restoration"
                },
                {
                  title: "Mould Removal Brisbane",
                  description: "Mould makes you sick. We remove it safely. We stop it coming back.",
                  link: "/services/mould-remediation"
                },
                {
                  title: "Storm Damage Repair",
                  description: "Storm hit? We respond in 1 hour. We fix flood damage fast.",
                  link: "/services/storm-damage"
                },
                {
                  title: "Trauma Scene Cleaning",
                  description: "We clean dangerous scenes. We work safely. We care about families.",
                  link: "/services/biohazard-cleaning"
                },
                {
                  title: "Commercial Restoration",
                  description: "Business flooded? We get you open fast. Insurance pays.",
                  link: "/services"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.link}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Certifications */}
        <section className="py-16 bg-gray-50" aria-labelledby="certifications-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="certifications-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              Certifications & Insurance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Industry Certifications
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    IICRC Certified Technicians
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Master Restorer Qualification
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Insurance Partners
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    $20 Million Public Liability
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Works with all major insurers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white" aria-labelledby="service-areas-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="service-areas-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Service Areas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We help people in Brisbane. We drive to Ipswich. We serve Logan families.
              Emergency? We come to you in 1 hour.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {['Brisbane', 'Ipswich', 'Logan', 'Gold Coast', 'Toowoomba', 'Moreton Bay', 'Redcliffe', 'Beaudesert'].map((area) => (
                <div key={area} className="bg-gray-50 rounded-lg py-3 px-4">
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Contact Section */}
        <section className="py-16 bg-blue-600 text-white" aria-labelledby="contact-section-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 id="contact-section-heading" className="text-3xl font-bold mb-4">
              Emergency? Call Now!
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Water damage? Fire damage? We answer day and night.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors border-2 border-blue-700"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-gray-50" aria-labelledby="company-info-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="company-info-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
              About Disaster Recovery
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                Phill and Bronwyn McGurk started our company in 2011. We have fixed thousands of homes.
                We know how to clean water damage. We know how to remove fire damage.
              </p>
              <p>
                Our team trains hard. We hold IICRC certificates. Insurance companies trust us.
                We work from Wacol. We answer emergency calls every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/about"
                  className="text-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Live Chat */}
      <LiveChat />

      <Footer />
    </>
  );
}