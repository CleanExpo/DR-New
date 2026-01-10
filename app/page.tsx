/**
 * NRPG Homepage - National Restoration Professionals Group
 *
 * Complete Specification Implementation:
 * 1. Emergency CTA (3 paths: Report Claim / Find Contractor / Join NRPG)
 * 2. Quick Triage Tool (interactive disaster assessment)
 * 3. Services Grid (visual grid of disaster types)
 * 4. Resources Hub (featured content)
 * 5. Join NRPG Section (contractor CTA)
 *
 * Design Standards:
 * - Authority/Clinical aesthetic (navy, white, structured layouts)
 * - Mobile-first responsive design
 * - WCAG 2.1 AA compliance
 * - Performance optimized (LCP <1.5s target)
 * - DesignOS components throughout
 *
 * SEO: Schema.org markup, semantic HTML, optimized meta tags
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  EmergencyCTA,
  PriorityCard,
  IICRCBadge,
  IICRCBadgeGroup,
} from '@/src/design-system';
import {
  QuickTriageTool,
  ServicesGrid,
  ResourcesHub,
  JoinNRPGSection,
  InsurancePartners,
} from '@/components/marketing';
import { MegaMenu, useMegaMenu } from '@/components/nrpg/mega-menu';
import { MobileMenu, HamburgerButton } from '@/components/nrpg/MobileMenu';
import {
  SERVICE_PILLARS,
  CLIENT_SECTORS,
  AUSTRALIAN_LOCATIONS,
  EMERGENCY_CONTACT,
  EMERGENCY_PRICING,
} from '@/lib/design-tokens';
import { schemaGenerator } from '@/lib/seo/schema-generator';

export default function HomePage() {
  // Navigation state
  const servicesMenu = useMegaMenu();
  const sectorsMenu = useMegaMenu();
  const locationsMenu = useMegaMenu();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transform data for MegaMenu
  const servicePillarsForMenu = SERVICE_PILLARS.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    label: p.protocol,
    description: p.services.join(', '),
    image: `/images/services/${p.id}-card.jpg`,
    slug: p.slug,
    labelColor: p.protocolColor,
  }));

  const clientSectorsForMenu = CLIENT_SECTORS.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    label: s.badge,
    description: s.description,
    image: `/images/sectors/${s.id}-card.jpg`,
    slug: s.slug,
    labelColor: 'text-blue-400',
  }));

  const locationsForMenu = AUSTRALIAN_LOCATIONS.slice(0, 4).map((l) => ({
    id: l.code.toLowerCase(),
    title: l.name,
    subtitle: l.capital,
    label: l.code,
    description: `24/7 disaster recovery across ${l.name}`,
    image: `/images/locations/${l.code.toLowerCase()}.jpg`,
    slug: l.code.toLowerCase(),
    labelColor: 'text-green-400',
  }));

  // Generate Schema.org markup
  const organizationSchema = schemaGenerator.generateOrganizationSchema();
  const emergencyServiceSchema = schemaGenerator.generateEmergencyServiceSchema();

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

      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Fixed Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <nav className="container mx-auto px-6" aria-label="Main navigation">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all duration-300">
                  <span className="text-white font-black text-2xl font-display">N</span>
                </div>
                <div className="hidden md:block">
                  <div className="font-display font-black text-xl text-slate-900 dark:text-white leading-tight">
                    NRPG
                  </div>
                  <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
                    National Restoration
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {/* Services Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={servicesMenu.open}
                    onClick={servicesMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={servicesMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Services
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        servicesMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={servicePillarsForMenu}
                    isOpen={servicesMenu.isOpen}
                    onClose={servicesMenu.close}
                    basePath="/services"
                    columns={4}
                  />
                </div>

                {/* Sectors Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={sectorsMenu.open}
                    onClick={sectorsMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={sectorsMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Sectors
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        sectorsMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={clientSectorsForMenu}
                    isOpen={sectorsMenu.isOpen}
                    onClose={sectorsMenu.close}
                    basePath="/sectors"
                    columns={4}
                  />
                </div>

                {/* Locations Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={locationsMenu.open}
                    onClick={locationsMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={locationsMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Locations
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        locationsMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={locationsForMenu}
                    isOpen={locationsMenu.isOpen}
                    onClose={locationsMenu.close}
                    basePath="/locations"
                    columns={4}
                  />
                </div>

                {/* Resources Link */}
                <Link
                  href="/resources"
                  className="px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Resources
                </Link>

                {/* Contractor Portal Link */}
                <Link
                  href="/contractor/portal"
                  className="px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contractor Portal
                </Link>
              </div>

              {/* Right Side: Emergency Pricing + CTA */}
              <div className="flex items-center gap-4">
                {/* Emergency Pricing Display - Desktop Only */}
                <div className="hidden xl:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Emergency Service
                  </span>
                  <div className="font-display text-2xl font-black text-red-600 dark:text-red-400">
                    {EMERGENCY_PRICING.display}
                  </div>
                  <span className="text-xs text-slate-400">inc GST</span>
                </div>

                {/* Emergency Request CTA Button */}
                <button
                  onClick={() => {
                    window.location.href = '/claim/step-1?pricing_disclosed=true';
                  }}
                  className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-600/30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-4m6 4l6-4" />
                  </svg>
                  Request Service
                </button>

                {/* Mobile Menu Toggle */}
                <HamburgerButton
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content - Add top padding for fixed header */}
        <main className="pt-20">
          {/* 1. HERO SECTION - Emergency-First Design */}
          <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-950 dark:via-slate-900 dark:to-red-950 py-16 md:py-32 overflow-hidden">
            {/* Background Emergency Pattern */}
            <div className="absolute inset-0 opacity-3" style={{ backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Trust Badge - Smaller than before */}
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-sm font-black text-red-900 dark:text-red-400 uppercase tracking-wider">
                    🚨 ACTIVE DISASTER? GET HELP NOW
                  </span>
                </div>

                {/* Main Headline - Bold, Large, Urgent */}
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.95] text-center">
                  Disaster Recovery
                  <br />
                  <span className="text-red-600 dark:text-red-400">In 60 Minutes.</span>
                </h1>

                {/* Subheadline - Emphasize emergency response */}
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-3xl mx-auto">
                  24/7 emergency dispatch connecting you with IICRC-certified contractors for water damage, fire restoration, mold remediation, and bio cleaning.
                </p>

                {/* PRIMARY CTA - 70% Visual Weight */}
                <div className="flex flex-col gap-6 pt-4">
                  {/* Emergency Button - Dominant */}
                  <button
                    onClick={() => window.location.href = '/claim/step-1?pricing_disclosed=true'}
                    className="w-full group relative py-8 px-12 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-600 dark:to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-[80px] flex items-center justify-center gap-4"
                  >
                    <span className="text-3xl">🚨</span>
                    <span className="leading-tight">Report Emergency Disaster</span>
                    <span className="absolute top-2 right-4 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{EMERGENCY_PRICING.display}</span>
                  </button>

                  {/* Secondary Section - 20% Weight: Scheduled Services */}
                  <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-700">
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-400 mb-4 font-bold uppercase tracking-wide">
                      Not an active emergency?
                    </p>
                    <button
                      onClick={() => window.location.href = '/get-started'}
                      className="w-full group py-4 px-8 bg-semantic-primary hover:bg-semantic-primary-hover text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-102 active:scale-95"
                    >
                      Get Free Restoration Quote
                    </button>
                  </div>

                  {/* Tertiary - 10% Weight: Contractor Link */}
                  <div className="pt-2 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      IICRC-certified contractor?{' '}
                      <a
                        href="/contractor/join"
                        className="font-bold text-semantic-primary hover:text-semantic-primary-hover underline"
                      >
                        Join our network →
                      </a>
                    </p>
                  </div>
                </div>

                {/* Quick Trust Signals Below CTA */}
                <div className="pt-8 grid grid-cols-3 gap-4 md:gap-6 text-center">
                  <div>
                    <div className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-400">&lt;60min</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-bold uppercase">Response Time</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-400">500+</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-bold uppercase">IICRC Contractors</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl md:text-3xl font-black text-red-600 dark:text-red-400">100%</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-bold uppercase">Certified</div>
                  </div>
                </div>

                {/* IICRC Badges */}
                <div className="pt-4">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider text-center">
                    Certified to IICRC Standards
                  </p>
                  <div className="flex justify-center">
                    <IICRCBadgeGroup codes={['S500', 'S520', 'FSRT', 'S800']} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Emergency Sticky CTA (Only on mobile, fixed at bottom) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 shadow-2xl z-40 md:hidden border-t-4 border-red-600">
              <button
                onClick={() => window.location.href = '/claim/step-1?pricing_disclosed=true'}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🚨</span>
                <span>Report Emergency Now</span>
              </button>
            </div>

            {/* Mobile padding for sticky CTA */}
            <div className="h-24 md:h-0" />
          </section>

          {/* 1.5 TRUST SIGNALS BAND - Insurance Partners */}
          <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 md:py-16">
            <div className="container mx-auto px-6">
              <InsurancePartners />
            </div>
          </section>

          {/* 2. QUICK TRIAGE TOOL - Interactive Assessment */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <QuickTriageTool />
          </section>

          {/* 3. SERVICES GRID - Visual Disaster Types */}
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

          {/* 4. RESOURCES HUB - Featured Content */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <ResourcesHub
              title="Knowledge Center"
              subtitle="Expert guides and resources to help you navigate disaster recovery"
              maxItems={6}
            />
          </section>

          {/* Trust & Credibility Section */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                  Why Choose NRPG?
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Professional standards. Nationwide coverage. 24/7 response.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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

          {/* 5. JOIN NRPG SECTION - Contractor Recruitment */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <JoinNRPGSection variant="default" />
          </section>

          {/* Final Emergency CTA */}
          <section className="container mx-auto px-6 py-16">
            <EmergencyCTA
              title="Disaster Doesn't Wait. Neither Do We."
              description="24/7 emergency dispatch connecting you with IICRC-certified professionals"
              variant="default"
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              {/* Column 1: Brand */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span className="text-white font-black text-2xl font-display">N</span>
                  </div>
                  <div>
                    <div className="font-display font-black text-xl text-white leading-tight">
                      NRPG
                    </div>
                    <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
                      National Restoration
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed max-w-md">
                  Australia's premier IICRC-certified disaster recovery network. Professional standards. Nationwide coverage. 24/7 emergency response.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => window.location.href = '/claim/step-1?pricing_disclosed=true'}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-4m6 4l6-4" />
                    </svg>
                    Request Emergency Service
                  </button>
                </div>
              </div>

              {/* Column 2: Services */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Services
                </h4>
                <ul className="space-y-2">
                  {SERVICE_PILLARS.map((pillar) => (
                    <li key={pillar.id}>
                      <Link
                        href={`/services/${pillar.slug}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {pillar.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Sectors */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Sectors
                </h4>
                <ul className="space-y-2">
                  {CLIENT_SECTORS.map((sector) => (
                    <li key={sector.id}>
                      <Link
                        href={`/sectors/${sector.slug}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {sector.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Company */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-blue-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="hover:text-blue-400 transition-colors">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/contractor/join" className="hover:text-blue-400 transition-colors">
                      Join Network
                    </Link>
                  </li>
                  <li>
                    <Link href="/contractor/portal" className="hover:text-blue-400 transition-colors">
                      Contractor Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-blue-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} National Restoration Professionals Group. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap.xml" className="hover:text-blue-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
