/**
 * Disaster Recovery Australia - Public Homepage
 *
 * Refactored for simplicity - header/footer now provided by (public)/layout.tsx
 *
 * This is the public-facing emergency disaster recovery platform for clients.
 * For contractors: see /contractor/portal (NRPG contractor-only portal)
 *
 * Content Sections:
 * 1. EmergencyHero - Primary hero with CTAs
 * 2. InsurancePartners - Trust signals band
 * 3. QuickTriageTool - Interactive disaster assessment
 * 4. ServicesGrid - Visual grid of disaster types
 * 5. ResourcesHub - Featured content
 * 6. Trust & Credibility - Why choose us section
 * 7. JoinNRPGSection - Contractor recruitment
 * 8. Final EmergencyCTA - Bottom conversion point
 *
 * Design Standards:
 * - Authority/Clinical aesthetic (navy, white, structured layouts)
 * - Mobile-first responsive design
 * - WCAG 2.1 AA compliance
 * - Performance optimized (LCP <1.5s target)
 *
 * SEO: Schema.org markup, semantic HTML, optimized meta tags
 */

import { type Metadata } from 'next'
import React from 'react'
import { EmergencyHero } from '@/components/public/sections/EmergencyHero'
import { EmergencyCTA } from '@/src/design-system'
import {
  QuickTriageTool,
  ServicesGrid,
  ResourcesHub,
  JoinNRPGSection,
  InsurancePartners,
} from '@/components/marketing'
import { schemaGenerator } from '@/lib/seo/schema-generator'
import { PageTransition } from '@/src/design-system/components/Layout/PageTransition'
import { ScrollReveal } from '@/src/design-system/components/Layout/ScrollReveal'

export const metadata: Metadata = {
  title: 'Disaster Recovery Services Australia | 24/7 Emergency Restoration',
  description: 'Professional disaster recovery 24/7. IICRC-certified contractors for water damage, fire damage, storm damage & mould remediation. Response within 60 minutes across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
  },
}

/**
 * Public Homepage Component
 *
 * Simplified structure that relies on (public)/layout.tsx for header/footer.
 * Focus on content sections and conversion points.
 */
export default function HomePage() {
  // Generate Schema.org structured data for SEO
  const organizationSchema = schemaGenerator.generateOrganizationSchema()
  const emergencyServiceSchema = schemaGenerator.generateEmergencyServiceSchema()

  const howToSchema = schemaGenerator.generateHowToSchema({
    title: 'How to Get Emergency Disaster Recovery Assistance',
    description: 'Submit a claim and be connected with an IICRC-certified contractor in minutes.',
    steps: [
      {
        title: 'Submit Your Claim Online',
        description: 'Fill out our 3-minute emergency claim form with details about your disaster.',
      },
      {
        title: 'AI-Matched to Certified Contractors',
        description: 'Our AI instantly matches you to the nearest IICRC-certified contractor.',
      },
      {
        title: 'Rapid On-Site Response',
        description: 'Your assigned contractor arrives within 60 minutes of dispatch.',
      },
      {
        title: 'Restoration & Insurance Coordination',
        description: 'We coordinate directly with your insurer for seamless claims.',
      },
    ],
  })

  const faqSchema = schemaGenerator.generateFAQSchema([
    {
      question: 'How quickly can an NRPG contractor respond to a disaster emergency?',
      answer: 'NRPG contractors target a 60-minute on-site response, 24 hours a day, 7 days a week across all Australian states and territories. During major weather events such as cyclones and floods, emergency dispatch is prioritised by severity. Response times in metropolitan areas are typically faster than regional locations.',
    },
    {
      question: 'What types of disaster damage does Disaster Recovery Australia handle?',
      answer: 'Disaster Recovery Australia connects property owners with NRPG-certified contractors for water and flood damage, fire and smoke damage, storm and cyclone damage, mould remediation, and biohazard and sewage cleanup. All work is performed to IICRC (Institute of Inspection Cleaning and Restoration Certification) standards and fully documented for insurance claims.',
    },
    {
      question: 'Are NRPG contractors IICRC certified?',
      answer: 'Yes. Every contractor in the NRPG network must hold active IICRC certification relevant to their services — including Water Damage Restoration Technician (WRT), Applied Structural Drying (ASD), and Fire and Smoke Restoration Technician (FSRT). IICRC certification is recognised by all major Australian insurers as the professional standard for property restoration.',
    },
    {
      question: 'Does home insurance cover disaster restoration costs in Australia?',
      answer: 'Most standard home insurance policies in Australia cover sudden and accidental water damage from burst pipes, storm water ingress, and appliance failure. Flood cover (riverine flooding) is typically an optional add-on. NRPG contractors provide IICRC-standard documentation — moisture mapping, scope of works, and drying logs — that insurers require to process claims promptly.',
    },
    {
      question: 'How much does water damage restoration cost in Australia?',
      answer: 'Water damage restoration typically costs $2,500–$8,000 for a standard residential property, depending on the affected area, materials, and drying time required. If you hold home insurance, your policy excess is usually your only out-of-pocket cost. NRPG contractors work with all major Australian insurers including NRMA, Suncorp, Allianz, QBE, and RACQ.',
    },
    {
      question: 'How long does structural drying take after water damage?',
      answer: 'Most residential water damage jobs take 3–7 days for the structural drying phase using professional commercial equipment. The IICRC S500 standard defines completion when all materials return to their pre-loss equilibrium moisture content — not an arbitrary time target. Dense materials such as concrete slabs and timber framing can take 10–14 days or more.',
    },
    {
      question: 'What should I do immediately after a flood or burst pipe?',
      answer: 'First, ensure personal safety — do not enter a property with structural damage, electrical hazards, or contaminated floodwater. Turn off electricity at the switchboard if water is present and it is safe to do so. Document all visible damage with photos before moving anything. Contact your insurer to notify them of the event. Then submit an emergency claim through Disaster Recovery Australia — an NRPG contractor will arrive to take over from there.',
    },
    {
      question: 'Does Disaster Recovery Australia operate outside Queensland?',
      answer: 'Yes. NRPG contractors operate across all Australian states and territories — New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, ACT, and Northern Territory — as well as New Zealand. Coverage density varies by region; major metropolitan areas have multiple certified contractors available 24/7.',
    },
  ])

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(emergencyServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* 1. HERO SECTION - Emergency-First Design */}
        <PageTransition variant="fadeInUp">
          <EmergencyHero />
        </PageTransition>

        {/* 2. TRUST SIGNALS BAND - Insurance Partners */}
        <ScrollReveal>
          <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 md:py-16" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
            <div className="container mx-auto px-6">
              <InsurancePartners />
            </div>
          </section>
        </ScrollReveal>

        {/* 3. QUICK TRIAGE TOOL - Interactive Assessment */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
            <QuickTriageTool />
          </section>
        </ScrollReveal>

        {/* 4. SERVICES GRID - Visual Disaster Types */}
        <ScrollReveal>
          <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
            <div className="container mx-auto px-6">
              <ServicesGrid
                title="Complete Disaster Recovery Services"
                subtitle="IICRC-certified restoration for every emergency scenario"
                columns={4}
                showIICRCBadges={true}
              />
            </div>
          </section>
        </ScrollReveal>

        {/* 5. RESOURCES HUB - Featured Content */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
            <ResourcesHub
              title="Knowledge Center"
              subtitle="Expert guides and resources to help you navigate disaster recovery"
              maxItems={6}
            />
          </section>
        </ScrollReveal>

        {/* 6. TRUST & CREDIBILITY SECTION */}
        <ScrollReveal>
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                  Why Choose Disaster Recovery Australia?
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Professional standards. Nationwide coverage. 24/7 response.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* IICRC Certified */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    IICRC Certified
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Every contractor independently holds IICRC certification, their own licences, and their own business insurance — verified through an onboarding process unmatched in Australia and New Zealand
                  </p>
                </div>

                {/* 24/7 Emergency Response */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    24/7 Emergency Response
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Round-the-clock dispatch to connect you with the nearest qualified contractor
                  </p>
                </div>

                {/* Insurance Approved */}
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    IICRC Documentation
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    All work documented to IICRC and Australian standards — a professional scope of works and estimate you can submit to your insurer
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 7. HOW IT WORKS - Process Steps (DIS-23) */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                From emergency claim to on-site restoration — four simple steps
              </p>
            </div>

            <ol className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto list-none">
              {[
                {
                  step: '1',
                  title: 'Submit Your Claim Online',
                  description: 'Fill out our 3-minute emergency claim form with details about your disaster.',
                },
                {
                  step: '2',
                  title: 'AI-Matched to Certified Contractors',
                  description: 'Our AI instantly matches you to the nearest IICRC-certified contractor.',
                },
                {
                  step: '3',
                  title: 'Rapid On-Site Response',
                  description: 'Your assigned contractor arrives within 60 minutes of dispatch.',
                },
                {
                  step: '4',
                  title: 'Restoration & Insurance Coordination',
                  description: 'We coordinate directly with your insurer for seamless claims.',
                },
              ].map(({ step, title, description }) => (
                <li key={step} className="flex flex-col items-center text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white font-display text-2xl font-black flex-shrink-0">
                    {step}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </ScrollReveal>

        {/* 8. FAQ SECTION (DR-240) */}
        <ScrollReveal>
          <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Everything you need to know about disaster recovery with NRPG
                </p>
              </div>

              <dl className="space-y-4">
                {[
                  {
                    question: 'How quickly can an NRPG contractor respond?',
                    answer: 'NRPG contractors target a 60-minute on-site response, 24/7 across all Australian states and territories. During major weather events, emergency dispatch is prioritised by severity.',
                  },
                  {
                    question: 'Are NRPG contractors IICRC certified?',
                    answer: 'Yes. Every contractor must hold active IICRC certification — Water Damage Restoration Technician (WRT), Applied Structural Drying (ASD), Fire and Smoke Restoration Technician (FSRT), and others relevant to their services. IICRC certification is recognised by all major Australian insurers as the professional standard.',
                  },
                  {
                    question: 'Does home insurance cover disaster restoration?',
                    answer: 'Most standard policies cover sudden and accidental damage from burst pipes, storm water ingress, and appliance failure. NRPG contractors provide IICRC-standard documentation — scope of works, moisture mapping, drying logs — that insurers require to process claims promptly.',
                  },
                  {
                    question: 'What should I do immediately after a flood or burst pipe?',
                    answer: 'Ensure personal safety first. Turn off electricity at the switchboard if water is present and safe to do so. Photograph all damage before moving anything. Notify your insurer. Then submit an emergency claim — an NRPG contractor arrives to take over from there.',
                  },
                  {
                    question: 'How long does structural drying take?',
                    answer: 'Most residential jobs take 3–7 days with professional commercial equipment. Dense materials like concrete slabs or insulated walls can take 10–14 days. The IICRC S500 standard defines completion by moisture content readings, not an arbitrary time target.',
                  },
                  {
                    question: 'What states does NRPG operate in?',
                    answer: 'All Australian states and territories — NSW, VIC, QLD, WA, SA, TAS, ACT, and NT — plus New Zealand. Metropolitan areas have multiple certified contractors on 24/7 standby.',
                  },
                ].map(({ question, answer }) => (
                  <div
                    key={question}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <dt className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {question}
                    </dt>
                    <dd className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                      {answer}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="text-center mt-8">
                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
                >
                  View all frequently asked questions →
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 9. JOIN NRPG SECTION - Contractor Recruitment */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24">
            <JoinNRPGSection variant="default" />
          </section>
        </ScrollReveal>

        {/* 10. FINAL EMERGENCY CTA */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16">
            <EmergencyCTA />
          </section>
        </ScrollReveal>
      </div>
    </>
  )
}
