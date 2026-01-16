/**
 * NRPG Contractor Join Page - CONTRACTOR PORTAL ONLY
 *
 * This page is for contractors to join the NRPG network.
 * It is separate from the public Disaster Recovery Australia website.
 *
 * Header and footer are provided by the (contractor) layout.
 */

'use client'

import React from 'react'
import { ContractorHero } from '@/src/components/contractor/sections/ContractorHero'
import {
  ROICalculator,
  InsurancePartners,
} from '@/components/marketing'

export default function ContractorJoinPage() {
  return (
    <main className="min-h-screen">
      {/* Premium Network Hero Section with Metrics */}
      <ContractorHero />

      {/* Interactive Income Calculator */}
      <ROICalculator />

      {/* Insurance Partner Trust Signals */}
      <section className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <InsurancePartners />
        </div>
      </section>
    </main>
  )
}
