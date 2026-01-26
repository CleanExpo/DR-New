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

'use client'

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

      {/* Main Content */}
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* 1. HERO SECTION - Emergency-First Design */}
        <PageTransition variant="fadeInUp">
          <EmergencyHero />
        </PageTransition>

        {/* 2. TRUST SIGNALS BAND - Insurance Partners */}
        <ScrollReveal>
          <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 md:py-16">
            <div className="container mx-auto px-6">
              <InsurancePartners />
            </div>
          </section>
        </ScrollReveal>

        {/* 3. QUICK TRIAGE TOOL - Interactive Assessment */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24">
            <QuickTriageTool />
          </section>
        </ScrollReveal>

        {/* 4. SERVICES GRID - Visual Disaster Types */}
        <ScrollReveal>
          <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24">
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
          <section className="container mx-auto px-6 py-16 md:py-24">
            <ResourcesHub
              title="Knowledge Center"
              subtitle="Expert guides and resources to help you navigate disaster recovery"
              maxItems={6}
            />
          </section>
        </ScrollReveal>

        {/* 6. TRUST & CREDIBILITY SECTION */}
        <ScrollReveal>
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24">
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
                    Every contractor verified to IICRC industry standards for quality and safety
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
                    Insurance Approved
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    All work documented to insurance standards with guaranteed quality
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 7. JOIN NRPG SECTION - Contractor Recruitment */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16 md:py-24">
            <JoinNRPGSection variant="default" />
          </section>
        </ScrollReveal>

        {/* 8. FINAL EMERGENCY CTA */}
        <ScrollReveal>
          <section className="container mx-auto px-6 py-16">
            <EmergencyCTA />
          </section>
        </ScrollReveal>
      </div>
    </>
  )
}
