import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Clock, Phone, ArrowRight, Calendar } from "lucide-react"
import { WaterDamage } from "@/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { generateCategoryMetadata, generateCategorySchemas } from "@/lib/seo/service-page-seo"

const aeoFaqs = [
  {
    question: "How much does water damage restoration cost in Australia?",
    answer: "Water damage restoration in Australia typically costs $1,500–$25,000 depending on the water category (clean, grey, or black), the affected area, and whether structural drying is required. Most residential claims range from $2,000–$8,000. Sudden accidental water damage is covered by most home and contents insurance policies.",
  },
  {
    question: "How long does water damage restoration take?",
    answer: "Water extraction takes 1–2 days. Structural drying typically requires 3–7 days monitored by moisture metres. Full restoration including repairs takes 1–6 weeks depending on damage severity. IICRC S500 standard governs the drying process to prevent secondary mould growth.",
  },
  {
    question: "What are the three categories of water damage?",
    answer: "Category 1 is clean water from burst pipes or rainwater. Category 2 (grey water) contains chemical or biological contamination. Category 3 (black water) includes sewage and floodwater with pathogens. Each category requires different decontamination protocols under the IICRC S500 standard.",
  },
  {
    question: "Does insurance cover water damage restoration in Australia?",
    answer: "Most Australian home and contents policies cover sudden, accidental water damage such as burst pipes and storm damage. Gradual leaks and rising floodwater are commonly excluded unless flood cover is added. Always engage IICRC-certified professionals and document all damage for your insurer.",
  },
]

export const metadata: Metadata = generateCategoryMetadata({
  title: "Water Damage Restoration Services | NRPG Australia",
  description: "IICRC-certified water damage restoration across Australia. 60-minute emergency response, insurance-approved contractors, and forensic drying standards to protect your property.",
  keywords: ['water damage restoration', 'water damage repair', 'flood damage', 'water extraction', 'structural drying', 'burst pipe', 'basement flooding', 'IICRC S500', 'Australia'],
  slug: 'water-damage',
  categoryName: 'Water Damage Restoration',
  faqs: aeoFaqs,
});

const waterDamageHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Water Damage Restoration Works",
  "description": "NRPG's forensic water damage restoration process",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Emergency Assessment", "text": "IICRC-certified technician arrives within 60 minutes to assess moisture levels and damage extent." },
    { "@type": "HowToStep", "position": 2, "name": "Water Extraction", "text": "Industrial-grade extractors remove standing water and moisture from all affected surfaces." },
    { "@type": "HowToStep", "position": 3, "name": "Structural Drying", "text": "Commercial dehumidifiers and air movers create optimal drying conditions across affected areas." },
    { "@type": "HowToStep", "position": 4, "name": "Mould Prevention", "text": "Antimicrobial treatments applied to prevent secondary mould growth post-water damage." },
    { "@type": "HowToStep", "position": 5, "name": "Restoration & Repair", "text": "Full structural repairs and restoration to pre-loss condition, documented for insurance claims." },
  ],
};

export default function WaterDamagePillarPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCategorySchemas({
  title: 'Water Damage Restoration Services | NRPG Australia',
  description: 'Professional water damage restoration services across Australia. Basement flooding, burst pipes, flood restoration, structural drying. IICRC S500 certified. 24/7 emergency response.',
  keywords: [],
  slug: 'water-damage',
  categoryName: 'Water Damage Restoration',
  faqs: aeoFaqs,
})) }}
      />
      {/* HowTo Schema (DIS-30) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waterDamageHowTo) }}
      />
      <main className="py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <WaterDamage size="hero" gradient="water" aria-label="Water Damage Restoration" />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
              IICRC S500
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              What Should You Do After <span className="text-[#00BFA6]">Water Damage?</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8">
              Complete guide to water damage restoration services across Australia. IICRC-certified professionals. 24/7 emergency response across major Australian cities.
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
            Water Damage Restoration Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            <Link href="/services/water-damage/basement-flooding">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Basement Flooding
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized basement flooding services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/burst-pipe-repair">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Burst Pipe Repair
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized burst pipe repair services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/flood-restoration">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Flood Restoration
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized flood restoration services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/ceiling-water-damage">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Ceiling Water Damage
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized ceiling water damage services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/carpet-water-damage">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Carpet Water Damage
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized carpet water damage services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/commercial-water-damage">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Commercial Water Damage
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized commercial water damage services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/water-damage/structural-drying">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <WaterDamage size="lg" gradient="water" className="text-[#3B82F6] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Structural Drying
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized structural drying services with IICRC-certified professionals.
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
            Water Damage Restoration — Common Questions
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Answers sourced from IICRC S500 standard and Australian insurance industry data.
          </p>

          {/* Stat citation block */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#1F2937]/60 border border-[#00BFA6]/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#00BFA6]">$4.5B</div>
                <div className="text-[#9CA3AF] text-sm">Annual water damage insurance claims in Australia</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: Insurance Council of Australia, 2024</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#2196F3]">72hrs</div>
                <div className="text-[#9CA3AF] text-sm">Window before mould growth begins post-water event</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: IICRC S500 Standard</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#7C4DFF]">1 in 7</div>
                <div className="text-[#9CA3AF] text-sm">Australian homes make a water damage claim each year</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: Insurance Council of Australia</div>
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
              Stay current with IICRC training and industry standards via the{' '}
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
              Emergency Water Damage Restoration?
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
