import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Metadata } from 'next';
import { ChevronDown, Phone, Clock, Shield, DollarSign, FileText, Users, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Disaster Recovery Brisbane',
  description: 'Common questions about water damage restoration, fire damage, mould remediation, insurance claims, and emergency response in Brisbane and Ipswich.',
  keywords: ["disaster recovery FAQ", "water damage questions", "insurance claims", "emergency restoration", "mould remediation FAQ"],
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Emergency Response",
      icon: Clock,
      questions: [
        {
          q: "How quickly can you respond to an emergency?",
          a: "We guarantee a 1-hour emergency response time for Brisbane, Ipswich, and Logan areas. Our 24/7 emergency team is always ready to deploy immediately upon receiving your call at 1300 309 361."
        },
        {
          q: "Do you provide 24/7 emergency services?",
          a: "Yes, we operate 24 hours a day, 7 days a week, 365 days a year. Water damage, fires, and floods don't wait for business hours, and neither do we."
        },
        {
          q: "What areas do you service?",
          a: "We service all of Brisbane, Ipswich, Logan, and surrounding areas including Gold Coast and Sunshine Coast for major disasters. Our headquarters in Wacol allows rapid response throughout Southeast Queensland."
        }
      ]
    },
    {
      category: "Insurance Claims",
      icon: FileText,
      questions: [
        {
          q: "Do you work directly with insurance companies?",
          a: "Yes, we're preferred contractors for major insurers including IAG (NRMA, CGU, SGIO), Suncorp (AAMI, GIO), QBE, RACQ, Allianz, and others. We handle the entire claims process on your behalf."
        },
        {
          q: "Will you help with my insurance claim?",
          a: "Absolutely. We provide detailed documentation, photos, moisture readings, and comprehensive reports that insurance companies require. We liaise directly with your insurer and loss adjuster to streamline the process."
        },
        {
          q: "What if I don't have insurance?",
          a: "We work with both insured and uninsured customers. We provide transparent pricing and can arrange payment plans for larger restoration projects. Contact us for a free assessment and quote."
        }
      ]
    },
    {
      category: "Water Damage",
      icon: AlertTriangle,
      questions: [
        {
          q: "How long does water damage restoration take?",
          a: "Most residential water damage restoration takes 3-5 days for drying, depending on the extent of damage. Complete restoration including repairs may take 1-2 weeks. We provide detailed timelines after our initial assessment."
        },
        {
          q: "Can you save my carpets and furniture?",
          a: "In many cases, yes. If we respond quickly (within 24-48 hours), we can often save carpets, rugs, and furniture through professional extraction, drying, and cleaning. Each situation is assessed individually."
        },
        {
          q: "How do you prevent mould after water damage?",
          a: "We use industrial dehumidifiers, air movers, and antimicrobial treatments. We monitor moisture levels daily and don't consider a job complete until materials reach safe moisture content levels (usually below 16%)."
        }
      ]
    },
    {
      category: "Mould Remediation",
      icon: Shield,
      questions: [
        {
          q: "Is mould dangerous to my health?",
          a: "Yes, mould can cause respiratory issues, allergies, and other health problems, especially for children, elderly, and those with compromised immune systems. Professional remediation is essential for safe removal."
        },
        {
          q: "How long does mould remediation take?",
          a: "Small areas (under 10m²) typically take 1-2 days. Larger infestations may require 3-5 days or more. We contain the area, remove affected materials, treat surfaces, and verify clearance with testing."
        },
        {
          q: "Will the mould come back?",
          a: "When properly remediated and the moisture source is eliminated, mould should not return. We address the root cause, not just visible growth, and provide prevention recommendations."
        }
      ]
    },
    {
      category: "Costs & Payment",
      icon: DollarSign,
      questions: [
        {
          q: "How much does restoration cost?",
          a: "Costs vary significantly based on damage extent. Water damage typically ranges from $1,500-$8,000, fire restoration from $3,000-$25,000+. We provide free assessments and detailed quotes."
        },
        {
          q: "Do you offer payment plans?",
          a: "Yes, we understand disasters are unexpected. We offer flexible payment plans for uninsured customers and can discuss options during your free consultation."
        },
        {
          q: "Are your services guaranteed?",
          a: "Yes, we provide comprehensive warranties on our work. We're fully insured with $20 million public liability coverage and all work meets Australian Standards and IICRC guidelines."
        }
      ]
    },
    {
      category: "Certifications & Standards",
      icon: Users,
      questions: [
        {
          q: "What certifications do you hold?",
          a: "We're IICRC certified in water damage restoration, fire and smoke restoration, mould remediation, and biohazard cleaning. We're also members of the Restoration Industry Association (RIA) and CARSI."
        },
        {
          q: "Do you follow Australian Standards?",
          a: "Yes, all our work complies with AS/NZS standards including AS 3500 (plumbing), AS 4349 (building inspections), and IICRC S500 (water damage) and S520 (mould) standards."
        },
        {
          q: "Are your technicians trained?",
          a: "All our technicians undergo extensive training and hold relevant certifications. We're developing Australia's first ASQA-approved restoration training course to maintain industry-leading standards."
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'FAQ' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100">
                Find answers to common questions about our disaster recovery services,
                insurance claims, costs, and emergency response procedures.
              </p>
              <div className="mt-8">
                <a
                  href="tel:1300309361"
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1300 309 361 for Immediate Help
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="w-8 h-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {category.category}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <details
                        key={questionIndex}
                        className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <summary className="flex items-center justify-between p-6 cursor-pointer">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {item.q}
                          </h3>
                          <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Questions CTA */}
            <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our expert team is here to help
                with any specific questions about your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/insurance-guide"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors"
                >
                  Insurance Guide
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <Link href="/services/water-damage" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Water Damage Services</h3>
                <p className="text-gray-600 text-sm">Learn about our water extraction and drying services</p>
              </Link>
              <Link href="/services/fire-damage" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Fire Damage Restoration</h3>
                <p className="text-gray-600 text-sm">Discover our fire and smoke damage solutions</p>
              </Link>
              <Link href="/services/mould-remediation" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Mould Remediation</h3>
                <p className="text-gray-600 text-sm">Professional mould removal and prevention</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}