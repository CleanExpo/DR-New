// Insurance Claims Assistance Page
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Claims Assistance | Disaster Recovery Brisbane',
  description: 'Professional assistance with insurance claims for disaster recovery. We work directly with all major insurers including Suncorp, AAMI, NRMA, Allianz, QBE, and CGU.',
  keywords: 'insurance claims, disaster recovery insurance, water damage claims, fire damage claims, insurance approved restorer, claim assistance',
  openGraph: {
    title: 'Insurance Claims Assistance - Disaster Recovery Brisbane',
    description: 'IICRC Master Restorer approved by all major insurers. We handle your claim from start to finish.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-claims'
  }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Insurance Claims Assistance",
  "provider": {
    "@type": "Organization",
    "name": "Disaster Recovery Brisbane",
    "telephone": "1300 309 361"
  },
  "description": "Professional assistance with disaster recovery insurance claims"
};

export default function InsuranceClaimsPage() {
  const approvedInsurers = [
    'Suncorp',
    'AAMI',
    'NRMA Insurance',
    'Allianz',
    'QBE',
    'CGU',
    'Budget Direct',
    'Youi',
    'RACQ',
    'GIO',
    'Coles Insurance',
    'Woolworths Insurance'
  ];

  const claimProcess = [
    {
      step: 1,
      title: 'Contact Us Immediately',
      description: 'Call us 24/7 at 1300 309 361. We begin emergency mitigation right away to prevent further damage.'
    },
    {
      step: 2,
      title: 'We Notify Your Insurer',
      description: 'We handle all communication with your insurance company and provide detailed documentation.'
    },
    {
      step: 3,
      title: 'Assessment & Quote',
      description: 'Our IICRC certified team assesses the damage and provides a comprehensive quote to your insurer.'
    },
    {
      step: 4,
      title: 'Approval & Restoration',
      description: 'Once approved, we proceed with professional restoration work to the highest standards.'
    },
    {
      step: 5,
      title: 'Final Inspection',
      description: 'Complete documentation and sign-off with your insurance company for a smooth claim settlement.'
    }
  ];

  const benefits = [
    {
      icon: '✓',
      title: 'Direct Insurance Billing',
      description: 'We bill your insurer directly - no upfront costs for approved claims'
    },
    {
      icon: '✓',
      title: 'Claims Documentation',
      description: 'Comprehensive photo and written documentation for your claim'
    },
    {
      icon: '✓',
      title: 'Scope of Works',
      description: 'Detailed scope of works prepared to insurance standards'
    },
    {
      icon: '✓',
      title: 'Liaison Service',
      description: 'We communicate with your insurer throughout the process'
    },
    {
      icon: '✓',
      title: 'Fast Track Processing',
      description: 'Priority service to expedite your claim approval'
    },
    {
      icon: '✓',
      title: 'Peace of Mind',
      description: 'Focus on your recovery while we handle the paperwork'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Insurance Claims Assistance
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                We Work Directly With Your Insurance Company
              </p>
              <p className="text-lg mb-8 text-blue-50">
                IICRC Master Restorer approved by all major Australian insurers.
                Let us handle your claim while you focus on recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-help"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                  Start Your Claim
                </Link>
                <a
                  href="tel:1300309361"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors border-2 border-white"
                >
                  Call 1300 309 361
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Approved Insurers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Approved by All Major Insurers
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {approvedInsurers.map((insurer) => (
                    <div key={insurer} className="flex items-center justify-center text-gray-700 font-semibold">
                      <span className="mr-2 text-blue-600">✓</span>
                      {insurer}
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-600 mt-8">
                  ...and many more. If your insurer isn't listed, contact us - we work with all Australian insurance companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Our Claims Process
              </h2>
              <div className="space-y-8">
                {claimProcess.map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
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

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Why Use Our Claims Service
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-md">
                    <div className="text-3xl text-blue-600 mb-4">{benefit.icon}</div>
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

        {/* Important Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Important: Emergency Mitigation
                </h3>
                <p className="text-gray-700 mb-4">
                  Most insurance policies require you to take immediate action to prevent further damage.
                  This is called "emergency mitigation" and is typically covered even before your claim is approved.
                </p>
                <p className="text-gray-700 mb-4">
                  Our emergency services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Water extraction and drying</li>
                  <li>Board-up and temporary repairs</li>
                  <li>Tarpaulin installation</li>
                  <li>Contents protection</li>
                  <li>Mould prevention measures</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Call us immediately at 1300 309 361 - we'll protect your property and handle the insurance paperwork.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help With an Insurance Claim?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Let our IICRC Master Restorer team handle everything
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-help"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Start Your Claim
              </Link>
              <a
                href="tel:1300309361"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors border-2 border-white"
              >
                Call 1300 309 361
              </a>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Related Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/services/water-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Water Damage</h3>
                  <p className="text-gray-600 text-sm">Emergency restoration</p>
                </Link>
                <Link
                  href="/services/fire-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fire Damage</h3>
                  <p className="text-gray-600 text-sm">Complete recovery</p>
                </Link>
                <Link
                  href="/services/storm-damage"
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Storm Damage</h3>
                  <p className="text-gray-600 text-sm">Rapid response</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
