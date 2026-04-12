import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Clock, Phone, ArrowRight, Calendar } from "lucide-react"
import { BioForensic } from "@/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { generateCategoryMetadata, generateCategorySchemas } from "@/lib/seo/service-page-seo"

const aeoFaqs = [
  {
    question: "Who is responsible for biohazard cleanup in Australia?",
    answer: "The property owner or estate is responsible for arranging and funding biohazard remediation unless covered by insurance. Local councils may assist with public spaces. IICRC-certified and AIOH-compliant specialists are required for all work involving bloodborne pathogens, chemical contamination, or human remains.",
  },
  {
    question: "Does insurance cover biohazard cleanup in Australia?",
    answer: "Coverage varies significantly by policy. Accidental contamination (e.g. sewage backup) is often covered under standard home insurance. Trauma and unattended death scenes may be covered under life or home policies with contamination riders. Always engage certified specialists who can provide documentation for your insurer.",
  },
  {
    question: "How long does biohazard remediation take?",
    answer: "Sewage cleanup takes 1–3 days. Trauma and crime scene remediation typically takes 1–3 days depending on the extent of contamination. Methamphetamine (ice lab) decontamination requires 3–7 days plus post-decontamination testing to confirm clearance under WA, NSW, and QLD regulatory standards.",
  },
  {
    question: "What certifications are required for biohazard cleanup in Australia?",
    answer: "Technicians require bloodborne pathogen training and appropriate IICRC certification (BSRT or equivalent). Meth lab decontamination requires state-specific licensing in WA, NSW, and QLD. All work must comply with SafeWork requirements for biological hazards and hazardous chemical exposure.",
  },
]

export const metadata: Metadata = generateCategoryMetadata({
  title: "Biohazard Cleanup Services | NRPG Australia",
  description: "What Does Professional Biohazard Cleanup Involve? IICRC-certified specialists across Australia provide discreet, insurance-approved crime scene, trauma, and hazardous material remediation.",
  keywords: ['biohazard cleanup', 'crime scene cleanup', 'trauma cleanup', 'meth decontamination', 'sewage cleanup', 'hoarding cleanup', 'forensic cleaning', 'Australia'],
  slug: 'biohazard-cleanup',
  categoryName: 'Biohazard Cleanup',
  faqs: aeoFaqs,
});

export default function BiohazardCleanupPillarPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCategorySchemas({
  title: 'Biohazard Cleanup Services | NRPG Australia',
  description: 'Professional biohazard cleanup services across Australia. Crime scene, trauma, meth lab decontamination, sewage, hoarding cleanup. Certified and discreet.',
  keywords: [],
  slug: 'biohazard-cleanup',
  categoryName: 'Biohazard Cleanup',
  faqs: [
    {
      question: 'What types of biohazard cleanup does NRPG handle?',
      answer: 'NRPG handles all categories of biohazard cleanup including crime scene cleanup, unattended death and trauma scene decontamination, meth lab remediation, sewage and waste cleanup, hoarding cleanup, and general infectious waste remediation. All NRPG biohazard contractors hold IICRC S540 and S800 certifications and comply with Australian state and territory regulations for biohazardous waste disposal.',
    },
    {
      question: 'How quickly can NRPG respond to biohazard cleanup emergencies?',
      answer: 'NRPG maintains 24/7 emergency response capability for biohazard incidents with an average response time of 42 minutes across Australia\'s major cities. Biohazard scenes are treated with the highest priority due to health and safety risks. All response teams arrive in unmarked vehicles to maintain discretion for sensitive situations such as crime scenes and trauma cleanup.',
    },
    {
      question: 'Is biohazard cleanup covered by insurance?',
      answer: 'Insurance coverage for biohazard cleanup depends on the nature of the incident and your specific policy. Crime scene and trauma cleanup is often covered under home insurance policies. Sewage damage cleanup is typically covered if caused by a sudden blockage or failure. Meth lab decontamination may be covered by landlord insurance policies. NRPG provides detailed documentation and cost itemisation to support insurance claims.',
    },
    {
      question: 'How do professionals safely clean up biohazardous materials?',
      answer: 'Professional biohazard cleanup follows strict biosafety protocols. NRPG contractors wear full PPE including Tyvek suits, respirators, and double-gloved protection. Contaminated materials are removed, double-bagged, and disposed of through licensed biohazardous waste carriers. All affected surfaces are treated with hospital-grade disinfectants and ATP-tested to verify pathogen elimination. The property is cleared to safe occupancy standards before handover.',
    },
    {
      question: 'How much does biohazard cleanup cost in Australia?',
      answer: 'Biohazard cleanup costs in Australia vary widely depending on the type and extent of contamination. Basic sewage cleanup starts from approximately $800–$2,000. Trauma and crime scene cleanup ranges from $2,000–$8,000+. Meth lab decontamination can cost $5,000–$30,000+ depending on contamination levels. Emergency callout and assessment starts at $2,750 AUD with a full quote provided after initial assessment.',
    },
  ],
})) }}
      />
      <main className="py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <BioForensic size="hero" gradient="bio" aria-label="Biohazard & Forensic Cleaning" />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
              IICRC S540 / S800
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              What Does Professional Biohazard <span className="text-[#00BFA6]">Cleanup Involve?</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8">
              Certified biohazard and trauma scene cleanup. IICRC-certified professionals. 24/7 emergency response across major Australian cities.
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
            Biohazard Cleanup Services Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            <Link href="/services/biohazard-cleanup/crime-scene-cleanup">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <BioForensic size="lg" gradient="bio" className="text-[#EF4444] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Crime Scene Cleanup
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized crime scene cleanup services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/biohazard-cleanup/trauma-cleanup">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <BioForensic size="lg" gradient="bio" className="text-[#EF4444] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Trauma Cleanup
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized trauma cleanup services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/biohazard-cleanup/meth-lab-decontamination">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <BioForensic size="lg" gradient="bio" className="text-[#EF4444] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Meth Lab Decontamination
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized meth lab decontamination services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/biohazard-cleanup/sewage-cleanup">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <BioForensic size="lg" gradient="bio" className="text-[#EF4444] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Sewage Cleanup
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized sewage cleanup services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/biohazard-cleanup/hoarding-cleanup">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <BioForensic size="lg" gradient="bio" className="text-[#EF4444] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Hoarding Cleanup
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized hoarding cleanup services with IICRC-certified professionals.
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
            Biohazard Cleanup — Common Questions
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Answers based on IICRC BSRT standard, Australian state regulations, and SafeWork requirements.
          </p>

          {/* Stat citation block */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#1F2937]/60 border border-[#7C4DFF]/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#7C4DFF]">3,600+</div>
                <div className="text-[#9CA3AF] text-sm">Meth lab decontamination jobs per year in Australia</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: Australian Federal Police, 2023</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#EF4444]">Discreet</div>
                <div className="text-[#9CA3AF] text-sm">Unmarked vehicles available for trauma and sensitive scenes</div>
                <div className="text-[#6B7280] text-xs mt-1">NRPG Standard Service</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#00BFA6]">24/7</div>
                <div className="text-[#9CA3AF] text-sm">Emergency biohazard response across all Australian states</div>
                <div className="text-[#6B7280] text-xs mt-1">NRPG Network Coverage</div>
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
              Biohazard remediation and BSRT certification workshops — see the{' '}
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
              Emergency Biohazard Cleanup Services?
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
