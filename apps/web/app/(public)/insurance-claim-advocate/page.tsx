/**
 * BUILD-004: Human Advocate vs AI Insurer — Insurance Claim Advocate Guide
 *
 * Purpose: Counter AI-driven insurer claim processing (JLG, Symbility, etc.)
 * by positioning NRPG contractors as the human expert advocate on the
 * policyholder's side of the claim.
 *
 * Pre-Deploy Checklist:
 * G1 ✅ No "TBD" content — complete guide.
 * G2 ✅ No legal claims — guides explain process, not outcomes.
 * G3 ✅ No unverified statistics — all content is procedural/informational.
 * G4 N/A No geography-specific claims.
 * G5 ✅ ACL s18 compliant — no misleading representations.
 *
 * AFCA dispute pathway: afca.org.au — no phone numbers per CLAUDE.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  FileText,
  Users,
  Search,
  Scale,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Insurance Claim Advocate — Human Expert on Your Side | NRPG',
  description:
    'Insurers increasingly use AI assessment tools to process property damage claims. An IICRC-certified NRPG contractor provides independent expert documentation that supports your right to a fair settlement.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance-claim-advocate',
  },
  openGraph: {
    title: 'Insurance Claim Advocate — Human Expert on Your Side | NRPG',
    description:
      'When your insurer uses automated tools to assess property damage, an IICRC-certified NRPG contractor provides the independent expert evidence you need for a fair claim outcome.',
    url: 'https://disasterrecovery.com.au/insurance-claim-advocate',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Insurance Claim Advocate — Human Expert on Your Side',
  description:
    'How an IICRC-certified restoration contractor provides independent expert documentation to support fair insurance claim outcomes when insurers use automated assessment tools.',
  url: 'https://disasterrecovery.com.au/insurance-claim-advocate',
  publisher: {
    '@type': 'Organization',
    name: 'NRPG — National Restoration & Property Group',
    url: 'https://disasterrecovery.com.au',
  },
  about: {
    '@type': 'Thing',
    name: 'Insurance claim advocacy for property damage',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://disasterrecovery.com.au/resources' },
    { '@type': 'ListItem', position: 3, name: 'Insurance Claim Advocate', item: 'https://disasterrecovery.com.au/insurance-claim-advocate' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can my insurer use AI to assess my property damage claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Australian insurers are permitted to use automated assessment tools and AI-assisted platforms as part of their claims process. However, you have the right to request the basis of any assessment decision, and to provide your own independent expert evidence if you believe the assessment is inaccurate or incomplete.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I do if I disagree with my insurer\'s damage assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First, request written reasons for the assessment. Then obtain an independent scope-of-works report from an IICRC-certified restoration contractor. Submit this as a formal dispute to your insurer. If the dispute is not resolved, you can escalate to the Australian Financial Complaints Authority (AFCA) at afca.org.au — free of charge for policyholders.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AFCA and how does it help with insurance disputes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Financial Complaints Authority (AFCA) is a free, independent dispute resolution service for consumers and small businesses. If your insurer has not resolved your complaint to your satisfaction, you can lodge a complaint with AFCA. AFCA can require your insurer to provide reasons, review assessments, and in some cases make binding determinations. Visit afca.org.au to lodge a complaint.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does an IICRC-certified contractor report carry weight with insurers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the globally recognised standard body for restoration work. A scope-of-works report prepared by an IICRC-certified contractor documents damage according to recognised industry standards, providing your insurer with a credible, professionally prepared basis for claim assessment.',
      },
    },
  ],
}

const WARNING_SIGNS = [
  {
    icon: Clock,
    title: 'Assessment completed remotely',
    description:
      'Your claim was assessed without an in-person inspection of the property — potentially based on photos only or satellite/aerial imagery.',
  },
  {
    icon: Search,
    title: 'Damage scope seems underestimated',
    description:
      'The insurer\'s assessment identifies less damage than you can see, or excludes secondary damage such as mould growth following water ingress.',
  },
  {
    icon: FileText,
    title: 'Vague or template-driven reasoning',
    description:
      'The written assessment uses generic language and does not reference the specific conditions or damage at your property.',
  },
  {
    icon: AlertTriangle,
    title: 'Settlement offer seems low',
    description:
      'The settlement figure does not appear sufficient to return the property to its pre-loss condition using qualified contractors and appropriate materials.',
  },
]

const ADVOCATE_STEPS = [
  {
    step: '01',
    title: 'Independent on-site inspection',
    description:
      'An IICRC-certified NRPG contractor inspects your property in person, using moisture meters, thermal imaging, and other diagnostic tools to document damage that may not be visible in photographs.',
  },
  {
    step: '02',
    title: 'Scope-of-works report',
    description:
      'A detailed written report documents the extent of damage, the cause (where determinable), and the work required to restore the property to its pre-loss condition — referenced to IICRC and Australian standards.',
  },
  {
    step: '03',
    title: 'Submit to your insurer',
    description:
      'You submit the independent report to your insurer as a formal response to their assessment, requesting a review. Insurers are required under the Insurance Code of Practice to consider independent expert evidence.',
  },
  {
    step: '04',
    title: 'Escalate to AFCA if needed',
    description:
      'If your insurer does not resolve the dispute to your satisfaction, AFCA can review the complaint. The independent report provides AFCA with the technical evidence needed to assess your case.',
  },
]

const YOUR_RIGHTS = [
  'Request written reasons for any claim decision or assessment',
  'Provide independent expert evidence as part of the claims process',
  'Use the insurer\'s Internal Dispute Resolution (IDR) process at no cost',
  'Escalate unresolved complaints to AFCA — free for policyholders',
  'Be treated fairly under the General Insurance Code of Practice',
  'Receive timely decisions within the timeframes set by the Code',
]

export default function InsuranceClaimAdvocatePage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="py-24">

        {/* Breadcrumb */}
        <div className="container mx-auto px-6 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#00BFA6] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/resources" className="hover:text-[#00BFA6] transition-colors">Resources</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F9FAFB]">Insurance Claim Advocate</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Insurance Claims Guide
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              When Your Insurer Uses AI to Assess Damage,{' '}
              <span className="text-[#00BFA6]">You Need a Human Expert</span>
            </h1>

            <p className="text-xl text-[#9CA3AF] mb-8 leading-relaxed max-w-3xl">
              Australian insurers increasingly use automated assessment tools and AI-assisted platforms to process property damage claims. These systems can miss hidden damage, secondary deterioration, and the full scope of restoration work required. An IICRC-certified NRPG contractor provides the independent expert documentation that gives your claim the best foundation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white">
                <Link href="/claim">
                  Get an Independent Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937]">
                <a href="#your-rights">
                  Know Your Rights
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* What's happening section */}
        <section className="bg-[#1F2937] py-20 mb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">How Automated Claim Assessment Works</h2>
              <p className="text-[#9CA3AF] mb-8 leading-relaxed">
                Many insurers now use AI-assisted platforms and remote assessment tools — including aerial imagery, machine learning damage models, and automated estimating software — as part of their claims workflow. These tools have legitimate uses in streamlining high-volume claim processing. However, they have limitations when it comes to property-specific conditions, hidden damage, and the complexity of disaster restoration work.
              </p>

              <div className="bg-[#0F1115] border border-[#374151] rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3 text-[#F9FAFB]">What automated tools can miss:</h3>
                <ul className="space-y-2 text-[#9CA3AF]">
                  {[
                    'Moisture trapped within wall cavities, subfloors, and ceiling spaces',
                    'Secondary mould growth developing behind undisturbed surfaces',
                    'Structural movement and framing damage from saturation or heat',
                    'Smoke and soot penetration into HVAC systems and insulation',
                    'Contamination classification affecting safe removal procedures',
                    'The true scope of work required to restore — not just repair — the property',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[#9CA3AF] leading-relaxed">
                Under the General Insurance Code of Practice and the Insurance Contracts Act 1984, you have the right to provide independent expert evidence as part of any claim dispute. An IICRC-certified assessment report creates the factual record your insurer — and AFCA, if required — needs to review your claim on its merits.
              </p>
            </div>
          </div>
        </section>

        {/* Warning signs */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Signs Your Assessment May Need Review</h2>
            <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
              These situations suggest the initial claim assessment may not reflect the full extent of damage at your property.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {WARNING_SIGNS.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#1F2937] border border-[#374151] rounded-xl p-6 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                      <item.icon className="w-5 h-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[#F9FAFB]">{item.title}</h3>
                      <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How NRPG advocates */}
        <section className="bg-[#1F2937] py-20 mb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">How an NRPG Contractor Advocates for You</h2>
              <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
                A four-step process that puts independent expert evidence in your hands.
              </p>

              <div className="space-y-6">
                {ADVOCATE_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-6 bg-[#0F1115] border border-[#374151] rounded-xl p-6"
                  >
                    <div className="text-4xl font-bold text-[#00BFA6]/30 shrink-0 w-12 text-center">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB]">{item.title}</h3>
                      <p className="text-[#9CA3AF] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Your rights */}
        <section id="your-rights" className="container mx-auto px-6 mb-20 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 rounded-xl bg-[#00BFA6]/10 shrink-0">
                <Scale className="w-6 h-6 text-[#00BFA6]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Rights as a Policyholder</h2>
                <p className="text-[#9CA3AF]">
                  Under Australian law and the General Insurance Code of Practice, policyholders have specific rights throughout the claims process.
                </p>
              </div>
            </div>

            <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-6 mb-8">
              <ul className="space-y-3">
                {YOUR_RIGHTS.map((right) => (
                  <li key={right} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00BFA6] mt-0.5 shrink-0" />
                    <span className="text-[#D1D5DB]">{right}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AFCA callout */}
            <div className="bg-[#0F1115] border border-[#00BFA6]/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#00BFA6]/10 shrink-0">
                  <Users className="w-5 h-5 text-[#00BFA6]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-[#F9FAFB]">Australian Financial Complaints Authority (AFCA)</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-3">
                    AFCA is a free, independent dispute resolution service for consumers with unresolved complaints about insurers. If your insurer has not resolved your complaint through their internal process, you can escalate to AFCA. AFCA can review the insurer&apos;s assessment, request additional information, and make binding determinations.
                  </p>
                  <a
                    href="https://www.afca.org.au/make-a-complaint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00BFA6] text-sm hover:underline"
                  >
                    Lodge a complaint at afca.org.au
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#1F2937] py-20 mb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="bg-[#0F1115] border border-[#374151] rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-start gap-2 text-[#F9FAFB]">
                      <CheckCircle className="w-5 h-5 text-[#00BFA6] mt-0.5 shrink-0" />
                      {faq.name}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed pl-7">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related resources */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Water Damage Restoration',
                  description: 'IICRC S500:2025 — the standard your contractor works to',
                  href: '/services/water-damage',
                  icon: '🌊',
                },
                {
                  title: 'Fire & Smoke Damage',
                  description: 'IICRC FSRT — smoke remediation standards explained',
                  href: '/services/fire-smoke-damage',
                  icon: '🔥',
                },
                {
                  title: 'Mould Remediation',
                  description: 'IICRC S520:2025 — post-flood mould assessment',
                  href: '/services/mould-remediation',
                  icon: '🔬',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-[#1F2937] border border-[#374151] rounded-xl p-5 hover:border-[#00BFA6]/50 transition-colors group"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-[#00BFA6] transition-colors text-[#F9FAFB]">
                    {item.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center bg-[#1F2937] border border-[#374151] rounded-2xl p-12">
            <Shield className="w-12 h-12 text-[#00BFA6] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Get an Independent Expert Assessment</h2>
            <p className="text-[#9CA3AF] mb-8 leading-relaxed">
              Lodge your claim online. An IICRC-certified NRPG contractor will inspect your property and provide a scope-of-works report that documents the full extent of damage — the independent evidence your claim may need.
            </p>
            <Button asChild size="lg" className="bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white">
              <Link href="/claim">
                Start Your Claim
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
