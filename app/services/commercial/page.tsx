import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Restoration Services Brisbane | 24/7 Business Recovery',
  description: 'Expert commercial disaster recovery for Brisbane businesses. Minimize downtime with 24/7 emergency response. Office buildings, retail, industrial facilities.',
  keywords: 'commercial restoration brisbane, business disaster recovery, office water damage, retail fire restoration, industrial cleaning',
  openGraph: {
    title: 'Commercial Disaster Recovery Brisbane - IICRC Master Restorer',
    description: 'Professional commercial disaster recovery for Brisbane businesses. 24/7 emergency response, minimize downtime, direct insurance billing.',
    images: [{ url: '/images/services/commercial-disaster-recovery.png', alt: 'Commercial Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk' }],
    type: 'website'
  }
};

export default function CommercialRestorationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Commercial Restoration Services
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl">
          Professional disaster recovery for Brisbane businesses. We minimize downtime and get you operational fast.
        </p>

        {/* Service Categories */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Office Buildings',
              description: 'Complete restoration for commercial offices',
              services: ['Water extraction', 'Fire damage', 'Mould remediation']
            },
            {
              title: 'Retail Spaces',
              description: 'Fast recovery to minimize business interruption',
              services: ['Emergency boarding', 'Stock salvage', 'Deep cleaning']
            },
            {
              title: 'Industrial Facilities',
              description: 'Large-scale industrial disaster recovery',
              services: ['Equipment restoration', 'Hazmat cleaning', 'Structural drying']
            }
          ].map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.services.map((service, sIndex) => (
                  <li key={sIndex} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-600">✓</span> {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Brisbane Businesses Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '24/7 Emergency Response - No downtime',
              'Direct insurance billing - No upfront costs',
              'Minimize business interruption',
              'IICRC certified commercial technicians',
              'Large loss specialists',
              'Complete documentation for claims'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Industries We Serve */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Healthcare Facilities',
              'Educational Institutions',
              'Government Buildings',
              'Hospitality & Hotels',
              'Manufacturing Plants',
              'Data Centers',
              'Retail Chains',
              'Corporate Offices'
            ].map((industry, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <span className="text-gray-800 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Minimize Business Downtime</h2>
          <p className="text-xl mb-8">Get your business back to operational status fast with our commercial restoration experts</p>
          <a
            href="tel:1300309361"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Call 1300 309 361 - 24/7 Response
          </a>
        </div>
      </div>
    </div>
  );
}