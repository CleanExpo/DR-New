import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { DollarSign, Calculator, Shield, Clock, CheckCircle, AlertTriangle, Phone, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Much Does Water Damage Restoration Cost in Brisbane? | Disaster Recovery',
  description: 'Transparent pricing for water damage restoration in Brisbane. Category 1: $1,500-$3,000. Category 2: $3,000-$5,000. Category 3: $5,000+. Insurance approved. Free quotes.',
  keywords: [
    "how much does water damage restoration cost",
    "water damage repair cost Brisbane",
    "flood restoration pricing Queensland",
    "emergency restoration costs",
    "insurance coverage water damage",
    "mould remediation cost Brisbane",
    "fire damage restoration price",
    "sewage cleanup cost"
  ],
  openGraph: {
    title: 'Water Damage Restoration Costs Brisbane - Transparent Pricing',
    description: 'Clear pricing for disaster recovery services. Insurance approved. Free assessments. Payment plans available.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/pricing/restoration-costs',
  }
};

// Structured data for voice search and rich snippets
const pricingStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".price-answer", ".cost-range"]
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does water damage restoration cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Water damage restoration in Brisbane typically costs: Category 1 (clean water): $1,500-$3,000. Category 2 (grey water): $3,000-$5,000. Category 3 (black water/sewage): $5,000-$8,000+. Most insurance policies cover these costs."
      }
    },
    {
      "@type": "Question",
      "name": "Does insurance cover water damage restoration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most home insurance policies cover sudden water damage from burst pipes, storms, and accidents. We work directly with all major insurers including NRMA, AAMI, Suncorp, QBE, and RACQ to manage your claim."
      }
    },
    {
      "@type": "Question",
      "name": "How much does mould remediation cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mould remediation costs $500-$1,500 for small areas (under 10m²), $1,500-$3,500 for medium areas (10-30m²), and $3,500-$7,000+ for large infestations. Price includes containment, removal, treatment, and clearance testing."
      }
    }
  ]
};

const offerStructuredData = {
  "@context": "https://schema.org",
  "@type": "Offer",
  "url": "https://disasterrecovery.com.au/pricing/restoration-costs",
  "priceCurrency": "AUD",
  "price": "1500-8000",
  "priceValidUntil": "2025-12-31",
  "availability": "https://schema.org/InStock",
  "validFrom": "2025-01-01"
};

export default function RestorationCostsPricing() {
  const waterDamageCosts = [
    {
      category: "Category 1: Clean Water",
      description: "From broken pipes, rainwater, or overflow from sinks",
      priceRange: "$1,500 - $3,000",
      timeframe: "3-5 days",
      includes: [
        "Water extraction",
        "Structural drying",
        "Dehumidification",
        "Basic antimicrobial treatment",
        "Moisture monitoring"
      ],
      insuranceCovered: true
    },
    {
      category: "Category 2: Grey Water",
      description: "From washing machines, dishwashers, or clean toilet bowls",
      priceRange: "$3,000 - $5,000",
      timeframe: "4-7 days",
      includes: [
        "Everything in Category 1",
        "Removal of contaminated materials",
        "Advanced sanitisation",
        "Carpet pad replacement",
        "Subfloor treatment"
      ],
      insuranceCovered: true
    },
    {
      category: "Category 3: Black Water",
      description: "From sewage, flooding, or standing water",
      priceRange: "$5,000 - $8,000+",
      timeframe: "7-14 days",
      includes: [
        "Everything in Category 2",
        "Biohazard cleaning",
        "Complete material removal",
        "Structural sanitisation",
        "Air quality testing",
        "Full reconstruction coordination"
      ],
      insuranceCovered: true
    }
  ];

  const otherServiceCosts = [
    {
      service: "Fire & Smoke Damage",
      priceRange: "$3,000 - $25,000+",
      factors: ["Size of affected area", "Smoke penetration depth", "Soot type", "Content restoration needs"],
      timeframe: "1-4 weeks"
    },
    {
      service: "Mould Remediation",
      priceRange: "$500 - $7,000+",
      factors: ["Area size", "Mould type", "Containment needs", "Material replacement"],
      timeframe: "2-7 days"
    },
    {
      service: "Storm Damage",
      priceRange: "$2,000 - $15,000+",
      factors: ["Roof damage extent", "Water intrusion", "Structural repairs", "Debris removal"],
      timeframe: "3-14 days"
    },
    {
      service: "Sewage Cleanup",
      priceRange: "$2,000 - $6,000",
      factors: ["Contamination level", "Affected area size", "Material disposal", "Sanitisation requirements"],
      timeframe: "2-5 days"
    },
    {
      service: "Biohazard Cleaning",
      priceRange: "$1,500 - $5,000+",
      factors: ["Type of biohazard", "Area size", "PPE requirements", "Disposal regulations"],
      timeframe: "1-3 days"
    }
  ];

  const costFactors = [
    {
      factor: "Size of Affected Area",
      impact: "Larger areas require more equipment and labour",
      example: "100m² costs more than 20m²"
    },
    {
      factor: "Water Category",
      impact: "Contamination level affects complexity and safety requirements",
      example: "Sewage requires biohazard protocols"
    },
    {
      factor: "Response Time",
      impact: "Faster response prevents secondary damage",
      example: "24-hour delay can double costs due to mould"
    },
    {
      factor: "Materials Affected",
      impact: "Different materials have varying restoration costs",
      example: "Hardwood floors cost more than carpet"
    },
    {
      factor: "Structural Damage",
      impact: "Foundation or framing damage increases costs",
      example: "Drywall replacement vs surface drying"
    },
    {
      factor: "Location & Access",
      impact: "Multi-storey or difficult access affects pricing",
      example: "High-rise apartments may cost more"
    }
  ];

  const insuranceInfo = {
    covered: [
      "Sudden burst pipes",
      "Storm and flood damage",
      "Fire and smoke damage",
      "Accidental water damage",
      "Vandalism-related damage"
    ],
    notCovered: [
      "Gradual leaks (maintenance)",
      "Lack of maintenance",
      "Wear and tear",
      "Rising damp",
      "Some flood events (check policy)"
    ],
    insurers: ["NRMA", "AAMI", "Suncorp", "QBE", "RACQ", "Allianz", "CGU", "GIO"]
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerStructuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Pricing', href: '/pricing' },
            { label: 'Restoration Costs' }
          ]}
        />

        {/* Hero Section with Quick Answer */}
        <section className="relative py-16 bg-gradient-to-r from-green-900 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How Much Does Water Damage Restoration Cost?
              </h1>
              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <p className="text-xl text-white price-answer">
                  <strong>Quick Answer:</strong> Water damage restoration in Brisbane costs
                  between $1,500 and $8,000+ depending on water category and damage extent.
                  Most home insurance policies cover these costs. We provide free assessments
                  and work directly with your insurer.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Quote: 1300 309 361
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Online Quote Request
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Water Damage Cost Breakdown */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Water Damage Restoration Cost Breakdown
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto price-answer">
              Costs vary based on water category, affected area size, and response time.
              Below are typical price ranges for residential properties in Brisbane.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {waterDamageCosts.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-500">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.category}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    <div className="text-center py-4 bg-blue-50 rounded-lg mb-4">
                      <p className="text-3xl font-bold text-blue-700 cost-range">{item.priceRange}</p>
                      <p className="text-sm text-gray-600 mt-1">Typical residential cost</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Timeframe: {item.timeframe}</span>
                      </div>
                      {item.insuranceCovered && (
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-600">Insurance Covered</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-2">Includes:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {item.includes.map((include, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{include}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Calculator CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Need an Accurate Quote?</h3>
              <p className="mb-6 price-answer">
                Every situation is unique. Get a free, no-obligation assessment
                and detailed quote for your specific damage.
              </p>
              <a
                href="tel:1300309361"
                className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-all"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call for Free Assessment
              </a>
            </div>
          </div>
        </section>

        {/* Other Service Costs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Other Restoration Service Costs
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServiceCosts.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-3">{service.service}</h3>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-green-700 cost-range">{service.priceRange}</p>
                    <p className="text-sm text-gray-500">Estimated range</p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="font-semibold">Factors affecting cost:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {service.factors.map((factor, i) => (
                        <li key={i}>{factor}</li>
                      ))}
                    </ul>
                    <p className="pt-2 border-t">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Typical timeframe: {service.timeframe}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Factors Explained */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Affects Restoration Costs?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costFactors.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-2">{item.factor}</h3>
                  <p className="text-gray-700 mb-2">{item.impact}</p>
                  <p className="text-sm text-gray-500 italic">
                    Example: {item.example}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Important Cost Consideration</h3>
                  <p className="text-gray-700 price-answer">
                    Delaying restoration can significantly increase costs. Mould can begin growing
                    within 24-48 hours, potentially doubling restoration expenses. Secondary damage
                    like warping, rot, and structural issues develop quickly. Call immediately at
                    1300 309 361 to minimise costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Coverage Section */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Insurance Coverage for Water Damage
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto price-answer">
              Most home and contents insurance policies cover water damage restoration.
              We work directly with all major insurers to manage your claim.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-green-700">
                  <CheckCircle className="w-6 h-6 inline mr-2" />
                  Typically Covered
                </h3>
                <ul className="space-y-2">
                  {insuranceInfo.covered.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-red-700">
                  <AlertTriangle className="w-6 h-6 inline mr-2" />
                  Usually Not Covered
                </h3>
                <ul className="space-y-2">
                  {insuranceInfo.notCovered.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">We Work With All Major Insurers</h3>
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {insuranceInfo.insurers.map((insurer, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {insurer}
                  </span>
                ))}
              </div>
              <p className="text-center text-gray-600">
                As preferred contractors, we handle the entire claims process including
                documentation, photos, and direct billing to your insurer.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs about Costs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Questions About Restoration Costs
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  Do you provide free quotes?
                </h3>
                <p className="text-gray-700 price-answer">
                  Yes, we provide free assessments and detailed quotes. Our technician will
                  inspect the damage, take moisture readings, and provide a comprehensive quote
                  with no obligation.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  Can I get a quote over the phone?
                </h3>
                <p className="text-gray-700 price-answer">
                  We can provide rough estimates over the phone based on your description,
                  but accurate quotes require on-site assessment to determine water category,
                  affected materials, and hidden damage.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  Do you offer payment plans?
                </h3>
                <p className="text-gray-700 price-answer">
                  Yes, we understand disasters are unexpected. We offer flexible payment plans
                  for uninsured customers and can discuss options during your consultation.
                  We also accept credit cards and direct debit.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  How quickly do you need payment?
                </h3>
                <p className="text-gray-700 price-answer">
                  For insurance jobs, we bill the insurer directly - you only pay your excess.
                  For private jobs, we typically require a deposit to begin work with the balance
                  due upon completion. Payment plans can extend this timeframe.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  Are there any hidden costs?
                </h3>
                <p className="text-gray-700 price-answer">
                  No hidden costs. Our quotes detail all services and materials. If we discover
                  additional damage during restoration, we'll discuss it with you and your insurer
                  before proceeding. Transparency is guaranteed.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-3">
                  Why are your prices different from DIY?
                </h3>
                <p className="text-gray-700 price-answer">
                  Professional restoration includes industrial equipment, certified technicians,
                  proper containment, insurance documentation, warranty, and guaranteed results.
                  DIY attempts often miss hidden moisture leading to mould and structural damage,
                  costing more long-term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-red-900 to-red-700">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Restoration Quote Now
            </h2>
            <p className="text-xl text-red-100 mb-8 price-answer">
              Don't let cost concerns delay critical restoration.
              We offer transparent pricing, insurance assistance, and payment options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center bg-white text-red-700 hover:bg-red-50 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                <span className="text-xl">1300 309 361</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                Request Online Quote
              </Link>
            </div>
            <p className="mt-6 text-red-100">
              <strong>Voice Search:</strong> "How much does water damage restoration cost near me?"
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}