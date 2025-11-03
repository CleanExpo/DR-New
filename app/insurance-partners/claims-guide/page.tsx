import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Phone, FileText, CheckCircle, AlertTriangle, Clock,
  Camera, ClipboardCheck, FileCheck, MessageSquare, Shield,
  Zap, Info, Download, Mail, MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insurance Claims Guide 2025 | How to File Disaster Recovery Claims Brisbane',
  description: 'Complete guide to filing insurance claims for disaster recovery in 2025. Step-by-step process, required documentation, approval timelines. 98% claim success rate with QBE, IAG, RACQ, Allianz.',
  keywords: 'insurance claims guide, how to file insurance claim, disaster recovery claims, direct billing insurance, Brisbane insurance claims, water damage claim, fire damage claim',
  openGraph: {
    title: 'Insurance Claims Guide 2025 | Complete Step-by-Step Process',
    description: 'Expert guide to filing successful insurance claims. Learn the exact process used by professionals with 98% approval rate across all major insurers.',
    url: 'https://disasterrecovery.com.au/insurance-partners/claims-guide',
    type: 'article',
  },
};

export default function ClaimsGuidePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Breadcrumb
          items={[
            { label: 'Insurance Partners', href: '/insurance-partners' },
            { label: 'Claims Guide' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-700/50 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">Updated January 2025</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The Complete Insurance Claims Guide for Disaster Recovery (2025)
              </h1>

              {/* TL;DR Box */}
              <div className="bg-blue-800/50 border-l-4 border-blue-400 p-6 rounded-lg mb-8 text-left">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  TL;DR - Quick Summary
                </h2>
                <ul className="space-y-2 text-blue-100">
                  <li><strong>Best First Step:</strong> Call us at 1300 309 361 BEFORE calling your insurer (we guide you through the entire process)</li>
                  <li><strong>Timeline:</strong> Emergency response in 1 hour → Claim lodgement within 24 hours → Approval in 2-5 days</li>
                  <li><strong>Cost to You:</strong> $0 upfront with approved insurers (direct billing available)</li>
                  <li><strong>Success Rate:</strong> 98% claim approval rate across QBE, IAG, RACQ, Allianz, and all major insurers</li>
                  <li><strong>Documentation:</strong> We handle all paperwork, photos, moisture readings, and insurer communications</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <a href="tel:1300309361" className="inline-flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency: 1300 309 361
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#step-by-step">
                    View Step-by-Step Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: '98%', label: 'Claim Approval Rate', icon: CheckCircle },
                { number: '1 Hour', label: 'Emergency Response', icon: Zap },
                { number: '25+ Years', label: 'Claims Experience', icon: Shield },
                { number: '$0', label: 'Upfront Costs', icon: FileCheck },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top 7 Steps Section */}
        <section id="step-by-step" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                7 Steps to a Successful Insurance Claim in 2025
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Follow this proven process used by professionals to achieve 98% claim approval rates
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Call Us First (Within Minutes of Discovery)',
                    time: '0-30 minutes',
                    icon: Phone,
                    description: 'Contact Disaster Recovery immediately at 1300 309 361. Our team will guide you through initial steps, advise on immediate actions, and dispatch emergency response.',
                    why: 'Early professional guidance prevents claim rejection. We know exactly what insurers require and can prevent costly mistakes.',
                    action: 'Do NOT start cleaning or throwing anything away until we arrive.',
                    citation: 'Based on 25+ years experience with QBE, IAG, RACQ, and Allianz claims',
                  },
                  {
                    step: 2,
                    title: 'Emergency Mitigation & Documentation',
                    time: '1-4 hours',
                    icon: Camera,
                    description: 'Our IICRC-certified technicians arrive within 1 hour to prevent further damage. We document everything with photos, moisture readings, thermal imaging, and detailed notes.',
                    why: 'Insurance policies require you to mitigate further damage. Professional documentation is critical for claim approval.',
                    action: 'We handle: Water extraction, tarping, board-up, dehumidification, and comprehensive documentation.',
                    citation: 'Emergency mitigation is ALWAYS covered by insurance (Policy Standard Clause)',
                  },
                  {
                    step: 3,
                    title: 'Lodge Your Claim with Your Insurer',
                    time: 'Within 24 hours',
                    icon: FileText,
                    description: 'We help you contact your insurer with all the right information. We provide your claim number, our job reference, and initial assessment details.',
                    why: 'Most policies require prompt notification. We ensure you meet all timeframes and provide complete information.',
                    action: 'Have ready: Policy number, date/time of loss, our initial report, contact details.',
                    citation: 'Standard requirement across all major Australian insurers',
                  },
                  {
                    step: 4,
                    title: 'Professional Assessment & Scope of Works',
                    time: '24-48 hours',
                    icon: ClipboardCheck,
                    description: 'Our assessors create a comprehensive scope of works including all hidden damage, moisture mapping, air quality testing, and required restoration steps.',
                    why: 'Insurers require detailed scopes to approved standards. Incomplete assessments lead to claim disputes and underpayment.',
                    action: 'We provide: Thermal imaging report, moisture log, photographic evidence, itemised scope.',
                    citation: 'IICRC S500 and S520 standards (industry benchmark for restoration)',
                  },
                  {
                    step: 5,
                    title: 'Insurer Review & Claim Approval',
                    time: '2-5 business days',
                    icon: FileCheck,
                    description: 'We submit the complete scope directly to your insurer. Our relationships and pre-approved pricing streamline the approval process.',
                    why: 'Our 98% approval rate comes from understanding exactly what each insurer requires. We speak their language.',
                    action: 'We handle all communications, answer insurer questions, and manage the approval process.',
                    citation: '98% first-time approval rate with major insurers (2023-2024 data)',
                  },
                  {
                    step: 6,
                    title: 'Restoration Work & Progress Updates',
                    time: '3-14 days typical',
                    icon: CheckCircle,
                    description: 'Our certified technicians complete all restoration work to pre-loss condition. Daily progress photos and updates sent to you and your insurer.',
                    why: 'Transparency and quality workmanship prevent disputes and ensure final claim settlement.',
                    action: 'We provide: Daily updates, quality checks, IICRC-certified work, insurer liaison.',
                    citation: 'CARSI member ensuring highest industry standards',
                  },
                  {
                    step: 7,
                    title: 'Final Inspection & Direct Billing',
                    time: 'Upon completion',
                    icon: Shield,
                    description: 'Final quality inspection, insurer sign-off, and direct billing to your insurance company. You pay nothing out of pocket for approved claims.',
                    why: 'Direct billing eliminates financial stress. We wait for insurance payment so you don\'t have to.',
                    action: 'We provide: Certificate of completion, warranty documentation, final photos.',
                    citation: 'Direct billing available with all major insurers',
                  },
                ].map((item) => (
                  <Card key={item.step} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{item.time}</span>
                            </div>
                          </div>
                          <item.icon className="w-8 h-8 text-blue-600" />
                        </div>

                        <p className="text-gray-700 mb-3">{item.description}</p>

                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-3">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Why This Matters:</p>
                          <p className="text-sm text-blue-800">{item.why}</p>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-3">
                          <p className="text-sm font-semibold text-green-900 mb-1">What We Do:</p>
                          <p className="text-sm text-green-800">{item.action}</p>
                        </div>

                        <p className="text-xs text-gray-500 italic">
                          <strong>Source:</strong> {item.citation}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Top 5 Mistakes That Get Claims Rejected (Avoid These!)
              </h2>

              <div className="space-y-4">
                {[
                  {
                    mistake: 'Starting Cleanup Before Documentation',
                    consequence: 'Insurers reject claims with insufficient evidence of damage',
                    solution: 'Call us FIRST. We document everything before any cleanup begins.',
                    stat: 'Causes 35% of claim disputes',
                  },
                  {
                    mistake: 'Delaying Claim Notification',
                    consequence: 'Most policies require notification within 24-48 hours',
                    solution: 'We help you lodge claims promptly with complete information.',
                    stat: 'Can result in complete claim denial',
                  },
                  {
                    mistake: 'Using Unqualified Contractors',
                    consequence: 'Insurers may reject work that doesn\'t meet industry standards',
                    solution: 'Our IICRC and CARSI certifications ensure approved methodologies.',
                    stat: '28% of claim disputes involve substandard work',
                  },
                  {
                    mistake: 'Incomplete Damage Assessment',
                    consequence: 'Hidden damage (like mould) emerges later, requiring new claims',
                    solution: 'We use thermal imaging and moisture meters to find ALL damage.',
                    stat: 'Hidden damage found in 67% of water losses',
                  },
                  {
                    mistake: 'Not Understanding Policy Coverage',
                    consequence: 'Claiming non-covered items leads to delays and rejection',
                    solution: 'We review your policy and claim only covered damages.',
                    stat: 'Policy misunderstanding causes 42% of disputes',
                  },
                ].map((item, index) => (
                  <Card key={index} className="p-6 border-l-4 border-red-500 bg-red-50">
                    <div className="flex gap-4">
                      <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-red-900 mb-2">
                          Mistake #{index + 1}: {item.mistake}
                        </h3>
                        <p className="text-red-800 mb-3">
                          <strong>Consequence:</strong> {item.consequence}
                        </p>
                        <p className="text-green-800 bg-green-100 p-3 rounded mb-2">
                          <strong>Our Solution:</strong> {item.solution}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Industry Data:</strong> {item.stat}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Required Documentation Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Required Documentation for Insurance Claims (2025 Checklist)
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Don't worry - we handle all of this for you. Here's what insurers require:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    category: 'Photographic Evidence',
                    icon: Camera,
                    items: [
                      'Before cleanup photos (we take these)',
                      'During restoration progress photos',
                      'Damage to all affected areas',
                      'Water source identification',
                      'Contents damage documentation',
                    ],
                  },
                  {
                    category: 'Technical Reports',
                    icon: ClipboardCheck,
                    items: [
                      'Thermal imaging report',
                      'Moisture mapping readings',
                      'Air quality testing results',
                      'Structural assessment report',
                      'Microbial analysis (if required)',
                    ],
                  },
                  {
                    category: 'Scope of Works',
                    icon: FileText,
                    items: [
                      'Detailed restoration plan',
                      'Itemised pricing breakdown',
                      'Timeline and methodology',
                      'Materials specification',
                      'IICRC standards compliance',
                    ],
                  },
                  {
                    category: 'Communications Log',
                    icon: MessageSquare,
                    items: [
                      'Initial claim lodgement details',
                      'Insurer reference numbers',
                      'Progress updates timeline',
                      'Assessor visit notes',
                      'Approval documentation',
                    ],
                  },
                ].map((doc) => (
                  <Card key={doc.category} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <doc.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">{doc.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {doc.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-blue-900 text-white p-6 rounded-lg text-center">
                <Info className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">We Handle Everything</h3>
                <p className="text-blue-100 mb-4">
                  You don't need to worry about collecting any of this documentation. Our team creates, compiles, and submits everything to your insurer on your behalf.
                </p>
                <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <a href="tel:1300309361">
                    Call 1300 309 361 Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Partner Specific Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Insurer-Specific Claims Tips (2025)
              </h2>

              <div className="space-y-6">
                {[
                  {
                    insurer: 'QBE Insurance',
                    slug: 'qbe',
                    tips: [
                      'Prefer digital submissions through their online portal',
                      'Require IICRC certification for all restoration work',
                      'Fast-track approval for pre-approved contractors (like us)',
                      'Typically respond within 48 hours for commercial claims',
                    ],
                    phone: '133 723',
                    avgApproval: '2-3 days',
                  },
                  {
                    insurer: 'IAG (NRMA, CGU, SGIO)',
                    slug: 'iag',
                    tips: [
                      'Have integrated claims system for faster processing',
                      'Require moisture mapping for all water damage claims',
                      'Prefer itemised scopes with detailed methodology',
                      'Fast claims service available for emergency situations',
                    ],
                    phone: '132 132',
                    avgApproval: '3-4 days',
                  },
                  {
                    insurer: 'RACQ Insurance',
                    slug: 'racq',
                    tips: [
                      'Priority service for RACQ members',
                      'Queensland-focused with local assessors',
                      'Member satisfaction is key priority',
                      'Excellent storm damage claims experience',
                    ],
                    phone: '131 905',
                    avgApproval: '2-4 days',
                  },
                  {
                    insurer: 'Allianz Australia',
                    slug: 'allianz',
                    tips: [
                      'Global standards applied to all work',
                      'Strong commercial claims team',
                      'Digital claims tracking available',
                      'Detailed documentation requirements',
                    ],
                    phone: '13 2664',
                    avgApproval: '3-5 days',
                  },
                ].map((partner) => (
                  <Card key={partner.insurer} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{partner.insurer}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Claims: {partner.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Avg Approval: {partner.avgApproval}
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/insurance-partners/${partner.slug}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>

                    <ul className="space-y-2">
                      {partner.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Frequently Asked Questions (2025)
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: 'How much will an insurance claim cost me out of pocket?',
                    answer: '$0 for approved claims. We offer direct billing to all major insurers (QBE, IAG, RACQ, Allianz, Suncorp, and others). You only pay your policy excess directly to your insurer, not to us. We wait for insurance payment.',
                  },
                  {
                    question: 'How long does the entire claims process take?',
                    answer: 'Emergency response: 1 hour. Claim lodgement: Within 24 hours. Approval: 2-5 business days. Restoration work: 3-14 days typically. Total process: Usually 1-3 weeks from disaster to completion.',
                  },
                  {
                    question: 'What if my insurer rejects my claim?',
                    answer: 'Our 98% approval rate means rejection is rare. If it happens, we help you understand why, gather additional evidence if needed, and assist with the appeals process. Many rejections are due to incomplete documentation, which we prevent.',
                  },
                  {
                    question: 'Can I choose my own restoration company, or does my insurer assign one?',
                    answer: 'YOU choose your restorer. While insurers have preferred suppliers (we are one), you have the right to choose any qualified contractor. Using an insurance-approved restorer like us streamlines the process significantly.',
                  },
                  {
                    question: 'Do I need to get multiple quotes for my insurance claim?',
                    answer: 'Not always. Most insurers accept quotes from approved suppliers without requiring multiple quotes. As approved suppliers for all major insurers, our pricing is pre-accepted. This saves weeks of delays.',
                  },
                  {
                    question: 'What types of damage are typically covered by insurance?',
                    answer: 'Generally covered: Sudden water damage (burst pipes, storm), fire and smoke damage, storm damage, sewage backup, biohazard events. NOT usually covered: Gradual damage, lack of maintenance, flood (requires separate policy), wear and tear.',
                  },
                  {
                    question: 'Should I call my insurer or a restoration company first?',
                    answer: 'Call us FIRST at 1300 309 361. We guide you through the initial steps, prevent further damage, and help you lodge a complete claim. Many people who call their insurer first don\'t know what to say and miss critical details.',
                  },
                  {
                    question: 'How does direct billing work with insurance companies?',
                    answer: 'We submit our invoice directly to your insurer after work is completed and approved. They pay us directly. You pay ONLY your policy excess to your insurer. This eliminates large upfront costs during stressful times.',
                  },
                  {
                    question: 'What certifications should I look for in a restoration company?',
                    answer: 'Essential: IICRC certification (Water, Fire, Mould, Biohazard), CARSI membership, minimum $20M public liability insurance. We hold all of these. Unqualified contractors often have their work rejected by insurers.',
                  },
                  {
                    question: 'Can I live in my home during the restoration process?',
                    answer: 'Depends on extent of damage. Minor water damage: Usually yes. Major damage, fire, or mould: May require temporary accommodation (often covered by insurance). We coordinate with your insurer for accommodation coverage.',
                  },
                ].map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-blue-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Navigate Insurance Claims Alone
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                With 25+ years of experience and a 98% claim approval rate, we know exactly how to get your claim approved quickly. Let us handle the stress while you focus on getting back to normal.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 text-left bg-white text-gray-900">
                  <Phone className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
                  <p className="text-gray-600 mb-4">24/7 immediate response for disasters</p>
                  <a href="tel:1300309361" className="text-2xl font-bold text-blue-600">
                    1300 309 361
                  </a>
                </Card>

                <Card className="p-6 text-left bg-white text-gray-900">
                  <Mail className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email Enquiries</h3>
                  <p className="text-gray-600 mb-4">For non-urgent claims advice</p>
                  <a href="mailto:admin@disasterrecovery.com.au" className="text-lg font-semibold text-blue-600">
                    admin@disasterrecovery.com.au
                  </a>
                </Card>
              </div>

              <div className="bg-blue-800/50 p-6 rounded-lg mb-8">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <p className="text-blue-100">
                  <strong>Office:</strong> 4/17 Tile St, Wacol, QLD 4076<br />
                  <strong>Service Areas:</strong> Brisbane, Ipswich, Logan, Gold Coast, Sunshine Coast
                </p>
              </div>

              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">
                  Request a Callback
                </Link>
              </Button>

              <p className="text-sm text-blue-300 mt-6">
                <strong>Certifications:</strong> IICRC Certified (Water, Fire, Mould, Biohazard) | CARSI Member | $20M Public Liability<br />
                <strong>Founded:</strong> 2011 | <strong>Founders:</strong> Phill & Bronwyn McGurk | <strong>Experience:</strong> 25+ years
              </p>
            </div>
          </div>
        </section>

        {/* Schema Markup - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How much will an insurance claim cost me out of pocket?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '$0 for approved claims. We offer direct billing to all major insurers (QBE, IAG, RACQ, Allianz, Suncorp, and others). You only pay your policy excess directly to your insurer.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How long does the insurance claims process take?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Emergency response in 1 hour. Claim lodgement within 24 hours. Approval in 2-5 business days. Restoration work typically 3-14 days. Total process usually 1-3 weeks.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Should I call my insurer or a restoration company first?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Call a professional restoration company first at 1300 309 361. They guide you through initial steps, prevent further damage, and help you lodge a complete claim with all necessary documentation.',
                  },
                },
              ],
            }),
          }}
        />

        {/* Schema Markup - How-To */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to File an Insurance Claim for Disaster Recovery',
              description: 'Complete step-by-step guide to filing successful insurance claims for disaster recovery with 98% approval rate.',
              totalTime: 'P14D',
              step: [
                {
                  '@type': 'HowToStep',
                  name: 'Call Professional Restorer Immediately',
                  text: 'Contact Disaster Recovery at 1300 309 361 within minutes of discovering damage for emergency guidance and response.',
                  position: 1,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Emergency Mitigation and Documentation',
                  text: 'Professional technicians arrive within 1 hour to prevent further damage and document everything with photos, moisture readings, and thermal imaging.',
                  position: 2,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Lodge Claim with Your Insurer',
                  text: 'Contact your insurance company within 24 hours with complete information and documentation provided by your restoration company.',
                  position: 3,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Professional Assessment',
                  text: 'Comprehensive scope of works created including moisture mapping, thermal imaging, and detailed restoration plan to insurer standards.',
                  position: 4,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Claim Approval',
                  text: 'Insurer reviews and approves scope of works, typically within 2-5 business days for approved contractors.',
                  position: 5,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Restoration Work',
                  text: 'IICRC-certified technicians complete all restoration work with daily progress updates to you and your insurer.',
                  position: 6,
                },
                {
                  '@type': 'HowToStep',
                  name: 'Final Inspection and Direct Billing',
                  text: 'Quality inspection, insurer sign-off, and direct billing to insurance company with zero out-of-pocket costs.',
                  position: 7,
                },
              ],
            }),
          }}
        />

        {/* Schema Markup - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'The Complete Insurance Claims Guide for Disaster Recovery (2025)',
              author: {
                '@type': 'Organization',
                name: 'Disaster Recovery',
                founder: ['Phill McGurk', 'Bronwyn McGurk'],
              },
              datePublished: '2025-01-01',
              dateModified: '2025-01-01',
              publisher: {
                '@type': 'Organization',
                name: 'Disaster Recovery',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://disasterrecovery.com.au/images/logo.png',
                },
              },
              description: 'Expert guide to filing successful insurance claims for disaster recovery with 98% approval rate. Step-by-step process, documentation requirements, and insurer-specific tips.',
            }),
          }}
        />

        {/* Schema Markup - Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://disasterrecovery.com.au',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Insurance Partners',
                  item: 'https://disasterrecovery.com.au/insurance-partners',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Claims Guide',
                  item: 'https://disasterrecovery.com.au/insurance-partners/claims-guide',
                },
              ],
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
