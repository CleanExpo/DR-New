import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Clock, Phone, ArrowRight, Calendar } from "lucide-react"
import { FireSmoke } from "@/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { generateCategoryMetadata, generateCategorySchemas } from "@/lib/seo/service-page-seo"

const aeoFaqs = [
  {
    question: "How much does fire damage restoration cost in Australia?",
    answer: "Fire damage restoration in Australia ranges from $10,000 for minor smoke damage to $150,000+ for significant structural fire damage. Most costs are covered by building insurance. Smoke and soot damage is often underestimated — even areas not directly burned require professional cleaning to prevent ongoing contamination.",
  },
  {
    question: "Can a smoke-damaged property be fully restored?",
    answer: "Yes. IICRC FSRT-certified technicians can restore smoke-damaged properties by removing soot deposits, neutralising smoke odours using ozone or hydroxyl treatment, and restoring affected surfaces. Speed is critical — soot causes permanent staining and ongoing corrosion if not removed within 24–48 hours of the fire.",
  },
  {
    question: "How long does fire damage restoration take?",
    answer: "Board-up and site securing typically happens within 24 hours. Smoke and soot removal takes 3–7 days. Full structural restoration including repairs takes 2–12 weeks depending on severity. Complex commercial fires can take months. Your insurer's assessor will need to approve the scope of works before full restoration begins.",
  },
  {
    question: "Does insurance cover fire and smoke damage restoration in Australia?",
    answer: "Yes. Standard home and contents insurance covers sudden fire damage including smoke, soot, and water damage caused during firefighting. Deliberate fire is excluded. Always lodge your claim promptly and engage IICRC-certified restorers — insurers may dispute claims where non-certified contractors are used.",
  },
]

export const metadata: Metadata = generateCategoryMetadata({
  title: "Fire & Smoke Damage Restoration | NRPG Australia",
  description: "Professional fire and smoke damage restoration by certified specialists. Insurance-direct billing, 24/7 emergency response, and complete soot remediation across all Australian states.",
  keywords: ['fire damage restoration', 'smoke damage', 'fire cleanup', 'soot removal', 'smoke odour removal', 'fire recovery', 'IICRC certified', 'Australia'],
  slug: 'fire-smoke-damage',
  categoryName: 'Fire & Smoke Damage Restoration',
  faqs: aeoFaqs,
});

export default function FireSmokeDamagePillarPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCategorySchemas({
  title: 'Fire & Smoke Damage Restoration | NRPG Australia',
  description: 'Professional fire and smoke damage restoration across Australia. Fire damage cleanup, smoke remediation, soot removal, odour elimination. IICRC certified. 24/7 emergency response.',
  keywords: [],
  slug: 'fire-smoke-damage',
  categoryName: 'Fire & Smoke Damage Restoration',
  faqs: [
    {
      question: 'What should I do immediately after a fire at my property?',
      answer: 'After a fire, do not re-enter the property until emergency services have declared it safe. Once cleared, contact your insurer to lodge a claim and call NRPG for immediate fire damage assessment. Avoid touching or disturbing soot and smoke-damaged materials as this can spread contamination. NRPG\'s IICRC FSRT-certified contractors will document all damage, perform emergency board-up and tarping if needed, and begin the restoration process.',
    },
    {
      question: 'How long does fire damage restoration take?',
      answer: 'Fire damage restoration typically takes between 1 and 4 weeks depending on the severity. Minor smoke damage may be remediated in 3–5 days, while major structural fire damage requiring rebuild work can take several weeks. NRPG coordinates the full process including emergency stabilisation, smoke and soot removal, odour elimination, and structural repairs, providing a detailed timeline and insurance documentation at every stage.',
    },
    {
      question: 'Can smoke and soot damage be fully removed?',
      answer: 'Yes, professional smoke and soot removal using IICRC FSRT standards can fully remediate fire damage from most surfaces. NRPG contractors use HEPA air filtration, thermal fogging, ozone treatment, and specialised chemical sponges to remove soot residue and smoke odour from walls, ceilings, contents, and HVAC systems. Some severely damaged materials may need replacement rather than cleaning.',
    },
    {
      question: 'Does home insurance cover fire damage restoration?',
      answer: 'Yes, standard Australian home and contents insurance policies cover fire damage restoration including emergency works, smoke and soot removal, odour remediation, and structural repairs. NRPG contractors are approved by all major Australian insurers and provide itemised documentation to support your claim. We can arrange direct insurer billing to minimise out-of-pocket expenses.',
    },
    {
      question: 'How much does fire damage restoration cost in Australia?',
      answer: 'Fire damage restoration costs in Australia vary based on the extent of damage. Emergency callout and make-safe work starts at $2,750 AUD, covering initial assessment, emergency board-up, and preliminary documentation. Full restoration costs are assessed and quoted after the initial inspection, with all costs itemised for insurance claim purposes.',
    },
  ],
})) }}
      />
      <main className="py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <FireSmoke size="hero" gradient="fire" aria-label="Fire & Smoke Restoration" />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
              IICRC FSRT
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              How Is Fire and Smoke Damage <span className="text-[#00BFA6]">Restored?</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-8">
              Expert fire and smoke damage restoration services. IICRC-certified professionals. 24/7 emergency response across major Australian cities.
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
            Fire & Smoke Damage Restoration Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            <Link href="/services/fire-smoke-damage/fire-damage-restoration">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <FireSmoke size="lg" gradient="fire" className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Fire Damage Restoration
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized fire damage restoration services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/fire-smoke-damage/smoke-damage-restoration">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <FireSmoke size="lg" gradient="fire" className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Smoke Damage Restoration
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized smoke damage restoration services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/fire-smoke-damage/soot-removal">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <FireSmoke size="lg" gradient="fire" className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Soot Removal
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized soot removal services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/fire-smoke-damage/smoke-odor-removal">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <FireSmoke size="lg" gradient="fire" className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Smoke Odor Removal
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized smoke odor removal services with IICRC-certified professionals.
                </p>
                <div className="text-[#00BFA6] text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
            

            <Link href="/services/fire-smoke-damage/commercial-fire-damage">
              <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] hover:border-[#00BFA6] transition-colors cursor-pointer">
                <FireSmoke size="lg" gradient="fire" className="text-[#F97316] mb-4" aria-hidden="true" />
                <h3 className="font-poppins font-semibold text-lg text-white mb-3">
                  Commercial Fire Damage
                </h3>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  Specialized commercial fire damage services with IICRC-certified professionals.
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
            Fire &amp; Smoke Damage — Common Questions
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
            Answers based on IICRC FSRT standard and Australian insurance industry data.
          </p>

          {/* Stat citation block */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#1F2937]/60 border border-[#F97316]/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#F97316]">$1.8B</div>
                <div className="text-[#9CA3AF] text-sm">Annual fire and smoke insurance claims in Australia</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: Insurance Council of Australia, 2024</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#EF4444]">24hrs</div>
                <div className="text-[#9CA3AF] text-sm">Maximum time before soot causes permanent staining</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: IICRC FSRT Standard</div>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#374151] flex-shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-4xl font-bold text-[#7C4DFF]">62k</div>
                <div className="text-[#9CA3AF] text-sm">Structure fires attended in Australia per year</div>
                <div className="text-[#6B7280] text-xs mt-1">Source: AFAC National Report 2024</div>
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
              IICRC FSRT fire restoration courses run across Australia — view dates on the{' '}
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
              Emergency Fire & Smoke Damage Restoration?
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
