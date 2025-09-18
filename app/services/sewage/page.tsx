import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sewage Cleanup Services Brisbane | Emergency Response 24/7',
  description: 'Professional sewage cleanup and sanitization services in Brisbane. Fast response, complete decontamination, health hazard removal. IICRC certified technicians.',
};

export default function SewageCleanupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 to-gray-700 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sewage Cleanup Services
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Emergency sewage cleanup and sanitization services in Brisbane.
              Fast response, complete decontamination, and health hazard removal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors border border-gray-600"
              >
                Get Emergency Help
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Sewage Cleanup Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Sewage Backup Cleanup',
                  description: 'Complete cleanup and sanitization of sewage backups in homes and businesses.',
                  icon: '🚰',
                },
                {
                  title: 'Contaminated Water Removal',
                  description: 'Safe extraction and disposal of contaminated black water from your property.',
                  icon: '💧',
                },
                {
                  title: 'Sanitization & Disinfection',
                  description: 'Hospital-grade disinfection to eliminate harmful bacteria and pathogens.',
                  icon: '🧽',
                },
                {
                  title: 'Structural Drying',
                  description: 'Industrial drying equipment to prevent mold growth and structural damage.',
                  icon: '🌬️',
                },
                {
                  title: 'Odor Removal',
                  description: 'Professional deodorization to eliminate sewage odors completely.',
                  icon: '🌸',
                },
                {
                  title: 'Contents Restoration',
                  description: 'Cleaning and restoration of affected personal belongings and furniture.',
                  icon: '📦',
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

        {/* Health Risks Section */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
              Health Risks of Sewage Exposure
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <p className="text-lg mb-6">
                Sewage water contains dangerous pathogens and contaminants that pose serious health risks:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  'E. coli bacteria',
                  'Hepatitis A virus',
                  'Salmonella',
                  'Parasites and worms',
                  'Toxic gases',
                  'Chemical contaminants',
                  'Mold spores',
                  'Heavy metals',
                ].map((risk) => (
                  <li key={risk} className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-semibold text-red-700">
                Don't risk your health - call our professionals immediately!
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Sewage Cleanup Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Emergency Response', description: 'Immediate arrival and assessment' },
                { step: '2', title: 'Safety First', description: 'Secure area and protect occupants' },
                { step: '3', title: 'Extraction', description: 'Remove sewage and contaminated materials' },
                { step: '4', title: 'Clean & Sanitize', description: 'Deep clean and disinfect all surfaces' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sewage Emergency? We're Here to Help!
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Don't wait - sewage contamination poses immediate health risks.
              Our certified technicians are available 24/7 for emergency response.
            </p>
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-xl"
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