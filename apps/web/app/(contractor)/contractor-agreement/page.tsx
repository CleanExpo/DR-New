'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, Shield, Scale, AlertTriangle } from 'lucide-react'

export default function ContractorAgreementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b border-blue-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-500/20 rounded-lg p-3">
              <FileText className="h-8 w-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-50">
                Independent Contractor Agreement
              </h1>
              <p className="text-slate-400 mt-1">
                National Restoration Partners Guild (NRPG)
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed">
            This agreement sets out the terms and conditions under which independent contractors
            operate within the NRPG network. Please read this document carefully before accepting
            any jobs through the platform.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Last updated: 5 March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none space-y-12">

            {/* 1. Parties and Relationship */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">1.</span>
                Parties and Relationship
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  This Independent Contractor Agreement (&quot;Agreement&quot;) is entered into between
                  Disaster Recovery Pty Ltd (ABN: 85 151 794 142, ACN: 151 794 142), trading as &quot;Disaster Recovery&quot;,
                  &quot;NRPG&quot;, and &quot;Restore Assist&quot; (&quot;the Platform&quot;), and the contractor
                  (&quot;you&quot; or &quot;the Contractor&quot;).
                </p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-sm leading-relaxed">
                    <strong>Important:</strong> You are an independent contractor, not an employee of
                    NRPG, Disaster Recovery, Restore Assist, or Disaster Recovery Pty Ltd. Nothing in this
                    Agreement creates an employment, partnership, joint venture, or agency relationship
                    between you and the Platform.
                  </p>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  As an independent contractor, you are solely responsible for your own taxation
                  obligations, superannuation, workers&apos; compensation, insurances, and compliance
                  with all applicable laws and regulations. The Platform does not withhold tax, provide
                  leave entitlements, or offer employment benefits of any kind.
                </p>
              </div>
            </div>

            {/* 2. Platform Role */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">2.</span>
                Platform Role
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  The NRPG platform facilitates the connection between property owners, insurers,
                  and independent restoration contractors. The Platform:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>Provides a marketplace for disaster recovery and restoration jobs</li>
                  <li>Manages job listings, matching, and communication tools</li>
                  <li>Processes payments on behalf of contractors</li>
                  <li>Maintains quality and certification standards for the network</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  The Platform does not directly provide restoration services. All work is performed
                  by independent, licensed contractors within the NRPG network.
                </p>
              </div>
            </div>

            {/* 3. Commission and Platform Fee Structure */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">3.</span>
                Commission and Platform Fee Structure
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  The Platform charges a commission on all jobs completed through the NRPG network.
                  The fee structure is as follows:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>
                    <strong className="text-slate-200">Platform fee:</strong> A percentage-based
                    commission is deducted from each completed job payment. Current rates are available
                    in your contractor dashboard.
                  </li>
                  <li>
                    <strong className="text-slate-200">Subscription fees:</strong> Monthly or annual
                    network membership fees may apply depending on your certification tier.
                  </li>
                  <li>
                    <strong className="text-slate-200">Payment processing:</strong> Standard payment
                    processing fees apply to all transactions.
                  </li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  The Platform reserves the right to adjust fees with 30 days&apos; written notice.
                  All fees are exclusive of GST unless otherwise stated.
                </p>
              </div>
            </div>

            {/* 4. Insurance Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-slate-500 text-lg font-mono">4.</span>
                Insurance Requirements
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  All contractors must maintain the following minimum insurance coverage at all times
                  while operating within the NRPG network:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-blue-950/40 border border-blue-900/30 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-1">Public Liability</p>
                    <p className="text-slate-300 text-sm">Minimum $10,000,000 (ten million dollars)</p>
                  </div>
                  <div className="bg-blue-950/40 border border-blue-900/30 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-1">Professional Indemnity</p>
                    <p className="text-slate-300 text-sm">As required by your trade or profession</p>
                  </div>
                  <div className="bg-blue-950/40 border border-blue-900/30 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-1">Workers&apos; Compensation</p>
                    <p className="text-slate-300 text-sm">As required by state or territory law</p>
                  </div>
                  <div className="bg-blue-950/40 border border-blue-900/30 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-1">Motor Vehicle Insurance</p>
                    <p className="text-slate-300 text-sm">Comprehensive cover for all work vehicles</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  You must provide current certificates of currency upon registration and whenever
                  requested by the Platform. Failure to maintain adequate insurance coverage will
                  result in immediate suspension from the network.
                </p>
              </div>
            </div>

            {/* 5. IICRC Certification Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">5.</span>
                IICRC Certification Requirements
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Contractors performing restoration work through the NRPG network must hold and
                  maintain current IICRC (Institute of Inspection Cleaning and Restoration
                  Certification) credentials relevant to their scope of work. This includes but
                  is not limited to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>Water Damage Restoration Technician (WRT)</li>
                  <li>Fire and Smoke Restoration Technician (FSRT)</li>
                  <li>Applied Microbial Remediation Technician (AMRT)</li>
                  <li>Applied Structural Drying (ASD)</li>
                  <li>Any additional certifications relevant to services offered</li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  Contractors must maintain their certifications through ongoing continuing education
                  as required by the IICRC. Expired certifications must be renewed within 30 days or
                  the contractor&apos;s profile will be suspended until compliance is restored.
                </p>
              </div>
            </div>

            {/* 6. Code of Conduct */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">6.</span>
                Code of Conduct
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  All contractors must adhere to the NRPG{' '}
                  <Link
                    href="/contractor/code-of-conduct"
                    className="text-teal-400 hover:text-teal-300 underline transition-colors"
                  >
                    Code of Conduct
                  </Link>
                  , which outlines professional standards, customer service requirements, and
                  behavioural expectations. Breach of the Code of Conduct may result in warnings,
                  suspension, or termination from the network.
                </p>
              </div>
            </div>

            {/* 7. Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">7.</span>
                Payment Terms
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Payment for jobs completed through the NRPG platform is processed as follows:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>
                    <strong className="text-slate-200">Fund holding:</strong> The Platform holds
                    client or insurer funds in a dedicated trust account until job completion is
                    confirmed.
                  </li>
                  <li>
                    <strong className="text-slate-200">Release on completion:</strong> Funds are
                    released to the contractor once the job is marked as complete and the client or
                    insurer has confirmed satisfaction, subject to any applicable dispute resolution
                    process.
                  </li>
                  <li>
                    <strong className="text-slate-200">Payment timeframe:</strong> Payments are
                    processed within 5-10 business days of job completion confirmation.
                  </li>
                  <li>
                    <strong className="text-slate-200">Invoicing:</strong> Contractors must provide
                    valid tax invoices (including ABN) for all work completed through the Platform.
                  </li>
                </ul>
              </div>
            </div>

            {/* 8. Termination */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">8.</span>
                Termination
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  Either party may terminate this Agreement:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>
                    <strong className="text-slate-200">By the Contractor:</strong> At any time by
                    providing 14 days&apos; written notice to the Platform. Any in-progress jobs must
                    be completed or appropriately handed over before termination takes effect.
                  </li>
                  <li>
                    <strong className="text-slate-200">By the Platform:</strong> With 14 days&apos;
                    written notice for any reason, or immediately in cases of serious misconduct,
                    fraud, breach of insurance or certification requirements, or material breach of
                    this Agreement or the Code of Conduct.
                  </li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  Upon termination, the contractor must return any Platform materials, cease using
                  NRPG branding, and complete any outstanding obligations. Payment for completed
                  work will be processed in accordance with the payment terms above.
                </p>
              </div>
            </div>

            {/* 9. Dispute Resolution */}
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Scale className="h-6 w-6" />
                <span className="text-slate-500 text-lg font-mono">9.</span>
                Dispute Resolution
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  In the event of a dispute arising out of or in connection with this Agreement, the
                  parties agree to the following process:
                </p>
                <ol className="list-decimal list-inside text-slate-300 space-y-2 ml-2">
                  <li>
                    <strong className="text-slate-200">Internal resolution:</strong> The parties will
                    first attempt to resolve the dispute through direct negotiation and the
                    Platform&apos;s internal dispute resolution process.
                  </li>
                  <li>
                    <strong className="text-slate-200">Mediation:</strong> If the dispute cannot be
                    resolved internally within 14 days, the parties agree to participate in mediation
                    administered by an accredited mediator in Queensland, Australia.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal proceedings:</strong> If mediation is
                    unsuccessful, either party may commence legal proceedings in the courts of
                    Queensland, Australia.
                  </li>
                </ol>
              </div>
            </div>

            {/* 10. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">10.</span>
                Governing Law
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  This Agreement is governed by and construed in accordance with the laws of the
                  State of Queensland, Australia. The parties submit to the exclusive jurisdiction of
                  the courts of Queensland, Australia, for the resolution of any disputes arising out
                  of or in connection with this Agreement.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  If any provision of this Agreement is found to be invalid or unenforceable, the
                  remaining provisions will continue to apply in full force and effect.
                </p>
              </div>
            </div>

            {/* 11. General Provisions */}
            <div>
              <h2 className="text-2xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <span className="text-slate-500 text-lg font-mono">11.</span>
                General Provisions
              </h2>
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 space-y-4">
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-2">
                  <li>
                    <strong className="text-slate-200">Entire agreement:</strong> This Agreement,
                    together with the Code of Conduct and any supplementary terms published on the
                    Platform, constitutes the entire agreement between the parties.
                  </li>
                  <li>
                    <strong className="text-slate-200">Amendments:</strong> The Platform may amend
                    this Agreement by providing 30 days&apos; written notice. Continued use of the
                    Platform after the amendment period constitutes acceptance of the amended terms.
                  </li>
                  <li>
                    <strong className="text-slate-200">Assignment:</strong> The Contractor may not
                    assign or transfer this Agreement without the prior written consent of the Platform.
                  </li>
                  <li>
                    <strong className="text-slate-200">Confidentiality:</strong> Both parties agree
                    to keep confidential any proprietary or commercially sensitive information obtained
                    through the course of this Agreement.
                  </li>
                </ul>
              </div>
            </div>

            {/* Entity Notice */}
            <div className="border-t border-blue-900/30 pt-8 mt-12">
              <div className="bg-slate-900/50 border border-blue-900/30 rounded-lg p-6 text-center">
                <p className="text-slate-400 text-sm">
                  Disaster Recovery Pty Ltd | ABN: 85 151 794 142 | ACN: 151 794 142
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Brisbane, Queensland 4076 | support@disasterrecovery.com.au
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Trading as: Disaster Recovery &middot; NRPG &middot; Restore Assist
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
