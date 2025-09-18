import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Biohazard Cleanup Services Brisbane | 24/7 Emergency Response',
  description: 'Professional biohazard cleanup and decontamination services in Brisbane. IICRC certified technicians, trauma cleanup, crime scene cleaning. Available 24/7.',
};

export default function BiohazardCleanupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-900 to-red-700 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Biohazard Cleanup Services
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Professional biohazard decontamination and trauma cleanup services in Brisbane.
              Discrete, compassionate, and thorough cleaning by certified technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors border border-red-600"
              >
                Request Service
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Biohazard Cleanup Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Trauma & Crime Scene Cleanup',
                  description: 'Compassionate and thorough cleaning of traumatic scenes with complete discretion.',
                  icon: '🏥',
                },
                {
                  title: 'Blood & Bodily Fluid Cleanup',
                  description: 'Safe removal and decontamination of all biological hazards following strict protocols.',
                  icon: '⚕️',
                },
                {
                  title: 'Infectious Disease Control',
                  description: 'Professional decontamination for COVID-19, hepatitis, and other infectious diseases.',
                  icon: '🦠',
                },
                {
                  title: 'Hoarding Cleanup',
                  description: 'Sensitive and systematic cleanup of hoarding situations with proper waste disposal.',
                  icon: '🏠',
                },
                {
                  title: 'Unattended Death Cleanup',
                  description: 'Respectful and thorough remediation with odor removal and complete sanitization.',
                  icon: '🕊️',
                },
                {
                  title: 'Industrial Accidents',
                  description: 'Rapid response for workplace accidents requiring biohazard decontamination.',
                  icon: '⚠️',
                },
              ].map((service) => (
                <div key={service.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Biohazard Services?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: '24/7 Emergency Response', value: 'Available anytime' },
                { title: 'IICRC Certified', value: 'Trained professionals' },
                { title: 'Discrete Service', value: 'Complete privacy' },
                { title: 'Insurance Approved', value: 'Direct billing' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-3xl font-bold text-red-700 mb-2">{item.value}</div>
                  <div className="text-gray-600">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-700 to-red-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Immediate Biohazard Cleanup?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Our certified technicians are available 24/7 for emergency biohazard cleanup services.
              Discrete, compassionate, and thorough.
            </p>
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now: 1300 309 361
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}