import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Clock, Phone, ArrowRight, Calendar } from "lucide-react"
import { MouldRemediation } from "@/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { generateCategoryMetadata, generateCategorySchemas } from "@/lib/seo/service-page-seo"

const aeoFaqs = [
  {
    question: "How much does mould removal cost in Australia?",
    answer: "Professional mould remediation in Australia costs $500–$5,000+ depending on the affected area, mould type, and whether containment is required. IICRC-certified remediation is essential for insurance claims. A typical residential mould remediation of 5–20 sq metres costs $1,500–$3,500.",
  },
  {
    question: "Can I remove mould myself in Australia?",
    answer: "DIY removal is only appropriate for superficial surface mould under 1 square metre with no underlying moisture source. Anything larger, hidden mould, or black mould (Stachybotrys) requires a licensed IICRC-certified remediator. Disturbing mould without containment can spread spores throughout the property.",
  },
  {
    question: "How long does mould remediation take?",
    answer: "A standard residential mould remediation takes 1–5 days depending on the extent of contamination. This includes containment setup, removal, antimicrobial treatment, and drying. Post-remediation clearance testing is conducted 24–48 hours after completion to confirm the property meets safe air quality standards.",
  },
  {
    question: "What are the health effects of mould exposure in Australia?",
    answer: "Mould exposure causes respiratory symptoms, allergic reactions, asthma aggravation, and eye/skin irritation. Immunocompromised individuals, children, and the elderly face higher risk. Stachybotrys (black mould) can produce mycotoxins. All confirmed mould in occupied buildings should be professionally assessed and remediated.",
  },
]

export const metadata: Metadata = generateCategoryMetadata({
  title: "Mould Remediation Services | NRPG Australia",
  description: "Safe, certified mould remediation services across Australia. IICRC-compliant air quality testing, containment, and full remediation by NRPG-vetted specialists.",
  keywords: ['mould remediation', 'mould removal', 'black mould', 'mould inspection', 'mould testing', 'mould prevention', 'IICRC S520', 'Australia'],
  slug: 'mould-remediation',
  categoryName: 'Mould Remediation',
  faqs: aeoFaqs,
});

export default function MouldRemediationPillarPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCategorySchemas({
  title: 'Mould Remediation Services | NRPG Australia',
  description: 'Professional mould remediation services across Australia. Black mould removal, mould inspection, testing, prevention. IICRC S520 certified. Safe and thorough mould cleanup.',
  keywords: [],
  slug: 'mould-remediation',
  categoryName: 'Mould Remediation',
  faqs: aeoFaqs,
})) }}
      />
      <main className="py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <MouldRemediation size="hero" gradient="mould" aria-label="Mould Remediation" />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
              IICRC S520
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              How Is Mould Safely Removed <span className="text-[#00BFA6]">from Your Property?</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8">
              Professional mould removal and remediation. IICRC-certified professionals. 24/7 emergency response across major Australian cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold px-8 py-3 text-lg">
                Request Service
              </Button>
              <Button variant="outline" className="border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937] px-8 py-3 text-lg bg-transparent">
                Get a Quote
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="container mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] text-center">
              <div className="text-3xl font-bold text-[#00BFA6] mb-2">24/7</div>
              <div className="text-[#9CA3AF]">Emergency Response</div>
            </div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] text-center">
              <div className="text-3xl font-bold text-[#2196F3] mb-2">100%</div>
              <div className="text-[#9CA3AF]">IICRC Certified</div>
            </div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] text-center">
              <div className="text-3xl font-bold text-[#7C4DFF] mb-2">8</div>
              <div className="text-[#9CA3AF]">States Covered</div>
            </div>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] text-center">
              <div className="text-3xl font-bold text-[#FFD700] mb-2">60min</div>
              <div className="text-[#9CA3AF]">Target Response</div>
            </div>
          </div>
        </section>

        {/* Sub-Services (Sub-Pillar Links) */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">
            Mould Remediation Services Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            <Link href="/services/mould-remediation/black-mould-removal">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <MouldRemediation size="lg" gradient="mould" className="text-[#22C55E] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Black Mould Removal
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized black mould removal services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/mould-remediation/mould-inspection">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <MouldRemediation size="lg" gradient="mould" className="text-[#22C55E] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Mould Inspection
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized mould inspection services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/mould-remediation/mould-testing">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <MouldRemediation size="lg" gradient="mould" className="text-[#22C55E] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Mould Testing
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized mould testing services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/mould-remediation/mould-prevention">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <MouldRemediation size="lg" gradient="mould" className="text-[#22C55E] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Mould Prevention
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized mould prevention services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/mould-remediation/commercial-mould-remediation">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <MouldRemediation size="lg" gradient="mould" className="text-[#22C55E] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Commercial Mould Remediation
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized commercial mould remediation services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            
          </div>
        </section>

        {/* AEO: Frequently Asked Questions */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-4">
            Mould Remediation — Common Questions
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Answers based on IICRC S520 standard and Australian building biology research.
          </p>

          {/* Stat citation block */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#1F2937]/60 border border-[#00BFA6]/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#00BFA6]">1 in 3</div>
                <div className="text-[#9CA3AF] text-sm">Australian homes have mould issues</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: CSIRO Housing Survey</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#22C55E]">48hrs</div>
                <div className="text-[#9CA3AF] text-sm">Mould can begin growing after water ingress</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: IICRC S520 Standard</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#7C4DFF]">$2.1B</div>
                <div className="text-[#9CA3AF] text-sm">Annual mould remediation spend in Australia</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: IBISWorld 2024</div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {aeoFaqs.map((faq) => (
              <div key={faq.question} className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">{faq.question}</h3>
                <p className="text-[#9CA3AF] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-8 flex items-center gap-3 text-[#9CA3AF] text-sm">
            <Calendar className="h-4 w-4 text-[#00BFA6] flex-shrink-0" />
            <span>
              IICRC AMRT mould remediation courses are available across Australia — see the{' '}
              <Link href="/events" className="text-[#00BFA6] hover:text-[#00A693] underline">
                ANZ Industry Events Calendar
              </Link>
              .
            </span>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-2xl p-12 text-center">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
              Emergency Mould Remediation Services?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              24/7 emergency response. Request service now for immediate assistance.
            </p>
            <Button className="bg-white hover:bg-white/90 text-[#EF4444] font-bold text-xl px-12 py-4">
              Request Emergency Service
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
