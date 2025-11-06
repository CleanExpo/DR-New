// Residential Disaster Recovery Services Page
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Residential Disaster Recovery | Home Restoration Brisbane',
  description: 'Professional disaster recovery for residential properties. IICRC Master Restorer certified home restoration services for water damage, fire damage, and emergency repairs.',
  keywords: 'residential disaster recovery, home restoration, house water damage, home fire damage, residential flood cleanup, house restoration Brisbane',
  openGraph: {
    title: 'Residential Disaster Recovery - Restore Your Home',
    description: 'IICRC Master Restorer certified home restoration. 24/7 emergency response for residential properties across Brisbane, Ipswich, and Logan.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/residential'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Residential Disaster Recovery",
  "provider": {
    "@type": "Organization",
    "name": "Disaster Recovery Brisbane",
    "telephone": "1300 309 361"
  },
  "description": "Professional disaster recovery and restoration services for residential properties"
};

export default function ResidentialPage() {
  const propertyTypes = [
    {
      icon: '🏡',
      title: 'Single Family Homes',
      description: 'Complete restoration for houses of all sizes and styles'
    },
    {
      icon: '🏘️',
      title: 'Townhouses',
      description: 'Specialized service for attached and semi-attached properties'
    },
    {
      icon: '🏢',
      title: 'Apartments & Units',
      description: 'Expert restoration for high-rise and low-rise units'
    },
    {
      icon: '🏰',
      title: 'Heritage Homes',
      description: 'Careful restoration of character and heritage properties'
    },
    {
      icon: '🏠',
      title: 'Investment Properties',
      description: 'Fast-track restoration to minimize rental income loss'
    },
    {
      icon: '🌟',
      title: 'Luxury Residences',
      description: 'Premium service for high-end properties in Hamilton, Ascot, and Toowong'
    }
  ];

  const services = [
    {
      title: 'Water Damage Restoration',
      icon: '💧',
      description: 'Emergency water damage restoration for homes',
      situations: [
        'Burst pipes and leaking plumbing',
        'Roof leaks and storm damage',
        'Flooding and basement water',
        'Hot water system failures',
        'Bathroom and laundry overflows'
      ]
    },
    {
      title: 'Fire & Smoke Damage',
      icon: '🔥',
      description: 'Complete fire damage restoration and smoke odor removal',
      situations: [
        'Kitchen fires',
        'Electrical fires',
        'Bushfire damage',
        'Smoke odor removal',
        'Soot and ash cleaning'
      ]
    },
    {
      title: 'Mould Remediation',
      icon: '🦠',
      description: 'Professional mould removal and prevention',
      situations: [
        'Bathroom and ceiling mould',
        'Hidden wall cavity mould',
        'Post-flood mould growth',
        'Chronic moisture problems',
        'Air quality improvement'
      ]
    },
    {
      title: 'Storm Damage',
      icon: '⛈️',
      description: 'Emergency storm damage repairs',
      situations: [
        'Roof damage and leaks',
        'Window and door damage',
        'Tree damage to structures',
        'Flooding from storms',
        'Emergency board-up'
      ]
    }
  ];

  const benefits = [
    {
      title: '24/7 Emergency Response',
      description: 'Available any time, day or night, for home emergencies',
      icon: '⚡'
    },
    {
      title: 'IICRC Master Restorer',
      description: 'Highest level of professional certification - one of a limited number in QLD',
      icon: '🏆'
    },
    {
      title: 'Insurance Approved',
      description: 'Work directly with all major home insurance providers',
      icon: '💼'
    },
    {
      title: 'Minimal Disruption',
      description: 'We work to minimize disruption to your family life',
      icon: '🏠'
    },
    {
      title: 'Contents Care',
      description: 'Professional cleaning and restoration of your belongings',
      icon: '📦'
    },
    {
      title: 'Family-Friendly',
      description: 'Understanding and compassionate service during stressful times',
      icon: '❤️'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Emergency Call',
      description: 'Call us 24/7 at 1300 309 361. We respond immediately to your home emergency.'
    },
    {
      step: 2,
      title: 'Rapid Response',
      description: 'Our team arrives quickly to assess damage and begin emergency mitigation.'
    },
    {
      step: 3,
      title: 'Insurance Notification',
      description: 'We contact your insurer and provide all necessary documentation.'
    },
    {
      step: 4,
      title: 'Contents Protection',
      description: 'We protect, clean, or remove your belongings as needed.'
    },
    {
      step: 5,
      title: 'Professional Restoration',
      description: 'Complete restoration by IICRC certified technicians.'
    },
    {
      step: 6,
      title: 'Final Inspection',
      description: 'Thorough quality check and walkthrough with you before completion.'
    }
  ];

  const premiumAreas = [
    'Hamilton',
    'Ascot',
    'New Farm',
    'Toowong',
    'Karalee',
    'Brookwater',
    'Springfield Lakes',
    'Bulimba',
    'Hawthorne',
    'Paddington'
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Residential Disaster Recovery
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Restore Your Home. Restore Your Peace of Mind.
              </p>
              <p className="text-lg mb-8 text-blue-50">
                IICRC Master Restorer certified home restoration services for Brisbane, Ipswich, and Logan families.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-help"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  Get Emergency Help
                </Link>
                <a
                  href="tel:1300309361"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                  Call 1300 309 361
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Residential Properties We Service
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertyTypes.map((type) => (
                  <div key={type.title} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{type.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Home Restoration Services
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-lg p-8 shadow-md">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.situations.map((situation) => (
                        <li key={situation} className="flex items-center text-gray-700">
                          <span className="mr-2 text-green-600">✓</span>
                          {situation}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Why Families Choose Us
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-md">
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Premium Areas */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Premium Service for High-End Residences
              </h2>
              <p className="text-center text-gray-700 mb-8 text-lg">
                We specialize in restoring luxury homes and high-value properties across Brisbane's premier suburbs.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Premium Service Areas:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {premiumAreas.map((area) => (
                    <div key={area} className="flex items-center justify-center text-gray-700 font-medium">
                      <span className="mr-2 text-blue-600">✓</span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Our Home Restoration Process
              </h2>
              <div className="space-y-6">
                {process.map((item) => (
                  <div key={item.step} className="flex gap-6 items-start bg-white p-6 rounded-lg shadow-md">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Time is Critical in Home Disasters
                </h3>
                <p className="text-gray-700 mb-4">
                  When disaster strikes your home, every minute counts. Quick action can:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-600 font-bold">→</span>
                    <p className="text-gray-700">
                      <strong>Prevent Mould Growth:</strong> Mould can begin growing within 24-48 hours of water damage
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-600 font-bold">→</span>
                    <p className="text-gray-700">
                      <strong>Minimize Damage:</strong> Quick response prevents secondary damage and reduces restoration costs
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-600 font-bold">→</span>
                    <p className="text-gray-700">
                      <strong>Protect Contents:</strong> Fast action can save your furniture, electronics, and precious belongings
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-yellow-600 font-bold">→</span>
                    <p className="text-gray-700">
                      <strong>Insurance Coverage:</strong> Most policies require immediate action to prevent further damage
                    </p>
                  </li>
                </ul>
                <p className="text-gray-700 font-semibold text-lg">
                  Don't wait - call 1300 309 361 now for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Home Emergency?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              We're here 24/7 to help restore your home and your peace of mind
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-help"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
              >
                Request Emergency Service
              </Link>
              <a
                href="tel:1300309361"
                className="bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-900 transition-colors border-2 border-white"
              >
                Call 1300 309 361 Now
              </a>
            </div>
          </div>
        </section>

        {/* Service Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Learn More About Our Services
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Link
                  href="/services/water-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-3xl mb-3">💧</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Water Damage</h3>
                  <p className="text-gray-600 text-sm">Learn more →</p>
                </Link>
                <Link
                  href="/services/fire-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-3xl mb-3">🔥</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fire Damage</h3>
                  <p className="text-gray-600 text-sm">Learn more →</p>
                </Link>
                <Link
                  href="/services/mould-remediation"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-3xl mb-3">🦠</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mould Removal</h3>
                  <p className="text-gray-600 text-sm">Learn more →</p>
                </Link>
                <Link
                  href="/services/storm-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-3xl mb-3">⛈️</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Storm Damage</h3>
                  <p className="text-gray-600 text-sm">Learn more →</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
