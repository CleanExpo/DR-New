import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Phone, Shield, Clock, TrendingUp, DollarSign, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparent Pricing | Disaster Recovery Brisbane | Service Fees',
  description: 'Clear, upfront pricing for disaster recovery services in Brisbane. Professional remediation and restoration with transparent fees. No hidden costs.',
  keywords: 'disaster recovery pricing, restoration costs Brisbane, water damage repair fees, transparent pricing, emergency service costs',
  openGraph: {
    title: 'Transparent Service Pricing - Disaster Recovery Brisbane',
    description: 'Professional disaster recovery with upfront, transparent pricing. Initial inspections from $330.',
    images: ['/images/pricing-transparency.jpg'],
  },
};

// Pricing data structure
const pricingTiers = {
  residential: {
    title: 'Residential Services',
    icon: '🏠',
    services: [
      {
        name: 'Initial Inspection',
        price: '$330',
        description: 'Professional assessment of damage extent',
        includes: ['On-site evaluation', 'Damage documentation', 'Verbal recommendations', 'Priority triage assessment'],
      },
      {
        name: 'Initial Inspection + Report',
        price: '$880',
        description: 'Comprehensive inspection with detailed reporting',
        includes: ['Everything in Initial Inspection', 'Detailed written report', 'Photo documentation', 'Insurance-ready documentation', 'Remediation scope of works'],
      },
      {
        name: 'Initial Inspection + Make Safe Services',
        price: '$2,750',
        description: 'Immediate damage control and safety measures',
        includes: ['Everything in Initial Inspection', 'Emergency water extraction', 'Tarping and boarding', 'Initial drying equipment setup', 'Hazard mitigation'],
      },
    ],
  },
  lightCommercial: {
    title: 'Light Commercial Services',
    icon: '🏢',
    services: [
      {
        name: 'Initial Inspection',
        price: '$330',
        description: 'Professional commercial property assessment',
        includes: ['Business impact assessment', 'Safety evaluation', 'Compliance review', 'Priority response planning'],
      },
      {
        name: 'Initial Inspection + Report',
        price: '$880',
        description: 'Detailed commercial inspection and documentation',
        includes: ['Everything in Initial Inspection', 'Business continuity planning', 'Compliance documentation', 'Insurance claim support', 'Detailed scope of works'],
      },
      {
        name: 'Initial Inspection + Make Safe Services',
        price: '$3,300',
        description: 'Commercial property stabilisation',
        includes: ['Everything in Initial Inspection', 'Business area isolation', 'Commercial-grade equipment', 'Minimise operational disruption', 'Safety compliance measures'],
      },
    ],
  },
  largeCommercial: {
    title: 'High-Rise, Medium & Large Commercial',
    icon: '🏗️',
    services: [
      {
        name: 'Initial Inspection',
        price: '$330',
        priceNote: '(first hour, $165 per additional hour)',
        description: 'Complex commercial property evaluation',
        includes: ['Multi-level assessment', 'Building systems review', 'Tenant impact analysis', 'Regulatory compliance check'],
      },
      {
        name: 'Initial Inspection + Report',
        price: '$880',
        description: 'Comprehensive commercial documentation',
        includes: ['Everything in Initial Inspection', 'Strata/body corporate reporting', 'Multi-tenant coordination', 'Building management liaison', 'Detailed remediation planning'],
      },
      {
        name: 'Initial Inspection + Make Safe Services',
        price: '$4,400',
        description: 'Large-scale commercial stabilisation',
        includes: ['Everything in Initial Inspection', 'Industrial equipment deployment', 'Multi-zone containment', 'Building services protection', 'Comprehensive safety measures'],
      },
    ],
  },
};

// Comparison data
const experienceComparison = {
  experienced: {
    title: 'Professional Service Provider',
    subtitle: 'Disaster Recovery Brisbane',
    benefits: [
      'IICRC certified technicians',
      'Insurance-approved processes',
      'Guaranteed work quality',
      'Proper equipment and technology',
      'Compliance with standards',
      'Documented procedures',
      'Liability insurance coverage',
      'Long-term warranty',
    ],
    outcomes: [
      { label: 'First-time success rate', value: '98%' },
      { label: 'Insurance claim approval', value: '95%' },
      { label: 'Average restoration time', value: '3-5 days' },
      { label: 'Hidden damage found', value: '85%' },
    ],
  },
  inexperienced: {
    title: 'Inexperienced Provider',
    subtitle: 'Risks and Hidden Costs',
    risks: [
      'No formal certification',
      'Insurance claim issues',
      'Incomplete restoration',
      'Inadequate equipment',
      'Non-compliance risks',
      'No documentation',
      'No insurance coverage',
      'No warranty protection',
    ],
    outcomes: [
      { label: 'Rework required', value: '65%' },
      { label: 'Insurance disputes', value: '40%' },
      { label: 'Extended timeline', value: '2-3 weeks' },
      { label: 'Secondary damage risk', value: '70%' },
    ],
  },
};

export default function PricingPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Disaster Recovery Brisbane",
    "description": "Professional disaster recovery and restoration services with transparent pricing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Disaster Recovery Brisbane",
      "telephone": "1300-309-361",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4/17 Tile St",
        "addressLocality": "Wacol",
        "addressRegion": "QLD",
        "postalCode": "4076",
        "addressCountry": "AU"
      },
      "areaServed": ["Brisbane", "Ipswich", "Logan"],
      "priceRange": "$330-$4400"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Initial Inspection - Residential",
        "price": "330",
        "priceCurrency": "AUD",
        "description": "Professional assessment of damage extent with on-site evaluation"
      },
      {
        "@type": "Offer",
        "name": "Initial Inspection + Report - Residential",
        "price": "880",
        "priceCurrency": "AUD",
        "description": "Comprehensive inspection with detailed reporting and photo documentation"
      },
      {
        "@type": "Offer",
        "name": "Initial Inspection + Make Safe Services - Residential",
        "price": "2750",
        "priceCurrency": "AUD",
        "description": "Immediate damage control and safety measures including emergency water extraction"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm font-semibold">Transparent, Fair Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Clear Service Fees
              <span className="block text-primary-300 mt-2">No Hidden Costs</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              At Disaster Recovery Brisbane, we provide impartial and professional Remediation and
              Restoration Scopes of Work, ensuring every project begins with clarity and fairness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1300309361"
                className="inline-flex items-center justify-center bg-white text-primary-900 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Get Quote: 1300 309 361
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-600 transition-colors"
              >
                Request Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Professional Service Matters
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The true cost of disaster recovery isn't just the upfront fee—it's the long-term outcome
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Professional Service */}
            <div className="relative bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-200">
              <div className="absolute -top-4 left-8 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{experienceComparison.experienced.title}</h3>
              <p className="text-gray-700 mb-6">{experienceComparison.experienced.subtitle}</p>

              <div className="space-y-3 mb-8">
                {experienceComparison.experienced.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Proven Outcomes</h4>
                <div className="grid grid-cols-2 gap-4">
                  {experienceComparison.experienced.outcomes.map((outcome, index) => (
                    <div key={index}>
                      <div className="text-2xl font-bold text-green-600">{outcome.value}</div>
                      <div className="text-sm text-gray-700">{outcome.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inexperienced Service */}
            <div className="relative bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border-2 border-red-200">
              <div className="absolute -top-4 left-8 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Hidden Risks
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{experienceComparison.inexperienced.title}</h3>
              <p className="text-gray-700 mb-6">{experienceComparison.inexperienced.subtitle}</p>

              <div className="space-y-3 mb-8">
                {experienceComparison.inexperienced.risks.map((risk, index) => (
                  <div key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{risk}</span>
                  </div>
                ))}
              </div>

              <div className="bg-red-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Common Issues</h4>
                <div className="grid grid-cols-2 gap-4">
                  {experienceComparison.inexperienced.outcomes.map((outcome, index) => (
                    <div key={index}>
                      <div className="text-2xl font-bold text-red-600">{outcome.value}</div>
                      <div className="text-sm text-gray-700">{outcome.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">The Real Cost of Cutting Corners</h4>
                <p className="text-gray-700">
                  While cheaper services may seem appealing initially, the costs of rework, secondary damage,
                  insurance disputes, and health risks often exceed professional service fees by 3-5 times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Service Fees
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              All Initial Call Services require upfront payment to ensure prompt and effective response
              with the right resources and expertise
            </p>
          </div>

          {/* Residential Pricing */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{pricingTiers.residential.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900">{pricingTiers.residential.title}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.residential.services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h4>
                    <div className="text-3xl font-bold text-primary-600 mb-4">
                      {service.price}
                      <span className="text-sm text-gray-500 font-normal ml-2">inc. GST</span>
                    </div>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary-50 px-6 py-4">
                    <Link
                      href="/contact"
                      className="block text-center text-primary-700 font-semibold hover:text-primary-800"
                    >
                      Book This Service →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Light Commercial Pricing */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{pricingTiers.lightCommercial.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900">{pricingTiers.lightCommercial.title}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.lightCommercial.services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h4>
                    <div className="text-3xl font-bold text-primary-600 mb-4">
                      {service.price}
                      <span className="text-sm text-gray-500 font-normal ml-2">inc. GST</span>
                    </div>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary-50 px-6 py-4">
                    <Link
                      href="/contact"
                      className="block text-center text-primary-700 font-semibold hover:text-primary-800"
                    >
                      Book This Service →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Large Commercial Pricing */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{pricingTiers.largeCommercial.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900">{pricingTiers.largeCommercial.title}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.largeCommercial.services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h4>
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {service.price}
                      <span className="text-sm text-gray-500 font-normal ml-2">inc. GST</span>
                    </div>
                    {service.priceNote && (
                      <p className="text-sm text-gray-700 mb-3">{service.priceNote}</p>
                    )}
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary-50 px-6 py-4">
                    <Link
                      href="/contact"
                      className="block text-center text-primary-700 font-semibold hover:text-primary-800"
                    >
                      Book This Service →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Fees Vary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Fees Vary</h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-6">
                Prices increase depending on property type and service scope due to:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Scale and Complexity</h4>
                      <p className="text-sm text-gray-700">Larger properties require more resources and time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Health & Safety Standards</h4>
                      <p className="text-sm text-gray-700">Commercial properties have stricter compliance requirements</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Equipment & Resources</h4>
                      <p className="text-sm text-gray-700">Commercial-grade equipment for larger spaces</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Specialist Expertise</h4>
                      <p className="text-sm text-gray-700">Certified professionals for complex environments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Invest in Professional Recovery
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Our transparent pricing ensures you know exactly what you're paying for.
            No surprises, no hidden costs—just professional service that protects your property and health.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-primary-200">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-primary-200">Properties Restored</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-primary-200">Insurance Approval Rate</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:1300309361"
              className="inline-flex items-center justify-center bg-white text-primary-900 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: 1300 309 361
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-600 transition-colors border-2 border-primary-600"
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pricing Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Why do you charge upfront fees?</h3>
              <p className="text-gray-700">
                Upfront payment ensures we can immediately deploy the right resources, equipment, and expertise
                to your property. This allows us to provide rapid response without delays in procurement or staffing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Are these fees covered by insurance?</h3>
              <p className="text-gray-700">
                Most insurance policies cover professional restoration services. We provide detailed documentation
                and work directly with insurers to help maximise your claim approval.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">What if additional work is needed?</h3>
              <p className="text-gray-700">
                Any additional costs will be communicated upfront before work commences. We provide detailed
                quotes and never proceed without your approval.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">How do your prices compare?</h3>
              <p className="text-gray-700">
                Our pricing reflects the value of certified expertise, proper equipment, and guaranteed outcomes.
                While cheaper options exist, they often result in incomplete work, insurance issues, and costly rework.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}