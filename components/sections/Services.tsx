import Link from 'next/link';
import Card from '../ui/Card';

const services = [
  {
    title: 'Water Damage Restoration',
    description: 'Rapid water extraction, drying, and restoration services for floods, burst pipes, and leaks. Our advanced equipment removes moisture completely to prevent mould growth.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.1L6.9 8.5c-2.3 2.8-2.3 6.9 0 9.7s6.2 2.8 8.5 0L12 2.1zm0 15.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    ),
    href: '/water-damage',
    features: ['24/7 Emergency Response', 'Advanced Drying Equipment', 'Moisture Detection', 'Insurance Assistance']
  },
  {
    title: 'Fire Damage Restoration',
    description: 'Complete fire damage restoration including soot removal, smoke damage cleanup, and structural repairs. We work directly with insurance companies.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
      </svg>
    ),
    href: '/fire-damage',
    features: ['Smoke Damage Cleanup', 'Soot Removal', 'Odor Elimination', 'Structural Assessment']
  },
  {
    title: 'Mould Remediation',
    description: 'Professional mould inspection, testing, and complete remediation. We eliminate mould at the source and prevent future growth with proper ventilation solutions.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    href: '/mould-remediation',
    features: ['Mould Inspection', 'Air Quality Testing', 'Safe Removal', 'Prevention Solutions']
  },
  {
    title: 'Storm Damage Repair',
    description: 'Emergency storm damage response including roof repairs, water intrusion cleanup, and structural damage assessment. Fast response to prevent further damage.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 12h-2l1.4-2.1c.8-1.2.4-2.8-.8-3.6s-2.8-.4-3.6.8L12 10.7 10 7.1c-.8-1.2-2.4-1.6-3.6-.8s-1.6 2.4-.8 3.6L7 12H5c-1.1 0-2 .9-2 2s.9 2 2 2h2l-1.4 2.1c-.8 1.2-.4 2.8.8 3.6s2.8.4 3.6-.8L12 17.3l2 3.6c.8 1.2 2.4 1.6 3.6.8s1.6-2.4.8-3.6L17 16h2c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
      </svg>
    ),
    href: '/storm-damage',
    features: ['Emergency Board-Up', 'Roof Leak Repair', 'Window Replacement', 'Debris Removal']
  },
  {
    title: 'Flood Restoration',
    description: 'Comprehensive flood damage restoration for residential and commercial properties. We handle everything from water extraction to complete reconstruction.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 14c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm4 8c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm4 8c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm4 8c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm0-4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z"/>
      </svg>
    ),
    href: '/flood-restoration',
    features: ['Water Extraction', 'Structural Drying', 'Contamination Control', 'Complete Restoration']
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency disaster response for immediate damage control. Our rapid response team minimizes damage and begins restoration immediately.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    href: '/emergency-services',
    features: ['1 Hour Response', 'Damage Assessment', 'Emergency Board-Up', 'Insurance Liaison']
  }
];

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 mb-4">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-primary-700 font-semibold">Professional Services</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Complete Disaster Recovery Solutions
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From emergency response to complete restoration, we provide comprehensive disaster recovery
            services across Brisbane, Ipswich, and Logan. Our certified technicians use advanced equipment
            and proven techniques to restore your property quickly and safely.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} hover className="group">
              <Link href={service.href} className="block">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 text-primary-600 rounded-lg p-3 mr-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our emergency response team is available 24/7 to help minimize damage and begin restoration immediately.
              Don't wait – call now for rapid response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="bg-emergency-600 hover:bg-emergency-700 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Call 1300 309 361</span>
              </a>
              <Link
                href="/contact"
                className="bg-white text-primary-700 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}