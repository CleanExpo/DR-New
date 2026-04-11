import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CheckCircle, Smartphone, Zap, Shield, BarChart3, Clock, FileText, Camera, Wifi, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RestoreAssist — Field Tool for Disaster Recovery Contractors',
  description: 'RestoreAssist is the mobile-first field management tool built for Australian disaster recovery contractors. Capture evidence, log moisture readings, manage jobs and generate insurance reports on-site.',
  openGraph: {
    title: 'RestoreAssist — Field Tool for Disaster Recovery Contractors',
    description: 'Mobile-first job management for IICRC-certified Australian contractors. Log, document and report from any site — in real time.',
    url: 'https://disasterrecovery.com.au/restore-assist',
  },
}

const schemaLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      'name': 'RestoreAssist',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'iOS, Android, Web',
      'description': 'Mobile-first field management tool for IICRC-certified disaster recovery contractors across Australia.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'AUD',
        'description': 'Included with NRPG contractor membership',
      },
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', 'position': 2, 'name': 'RestoreAssist', 'item': 'https://disasterrecovery.com.au/restore-assist' },
      ],
    },
  ],
}

const features = [
  {
    icon: Camera,
    title: 'On-Site Evidence Capture',
    description: 'Photograph damage, attach GPS coordinates and timestamp every image automatically. Full evidentiary chain for insurance assessors.',
  },
  {
    icon: BarChart3,
    title: 'Moisture & Drying Logs',
    description: 'Record moisture readings at multiple structural points over time. Auto-generates IICRC S500-compliant drying progress charts.',
  },
  {
    icon: FileText,
    title: 'Insurance Report Generation',
    description: 'One-tap export of job documentation as insurer-ready PDFs. Includes photo log, moisture data, scope of works and certification details.',
  },
  {
    icon: Zap,
    title: 'Real-Time Job Updates',
    description: 'Push status updates to the NRPG platform and property owners in real time. No paperwork delays between site and office.',
  },
  {
    icon: Wifi,
    title: 'Works Offline',
    description: 'Full offline functionality for remote or low-connectivity sites. Data syncs automatically when connection is restored.',
  },
  {
    icon: Shield,
    title: 'IICRC Standard Checklists',
    description: 'Built-in procedural checklists for S500 (water), FSRT (fire), S520 (mould) and S540 (biohazard) — ensures protocol compliance on every job.',
  },
]

const stats = [
  { value: '< 5 min', label: 'Job documentation time' },
  { value: '100%', label: 'Offline capable' },
  { value: 'IICRC', label: 'Standard compliant' },
  { value: 'All insurers', label: 'Report format accepted' },
]

export default function RestoreAssistPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB]">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }}
      />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-8">
              <Smartphone className="h-4 w-4" />
              <span>Part of the NRPG Platform</span>
            </div>
            <h1 className="font-poppins font-bold text-4xl md:text-6xl text-balance mb-6">
              RestoreAssist
              <span className="block text-[#00BFA6] mt-2">Field Tool for Contractors</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-4 max-w-3xl mx-auto">
              The mobile-first job management tool built for Australian disaster recovery contractors.
              Document, log and report from any site — without the paperwork.
            </p>
            <p className="text-base text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Included with your NRPG contractor membership. Works on iOS, Android and any modern browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contractors/join">
                <Button className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-semibold px-8 py-3 text-lg">
                  Join as a Contractor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="border-[#374151] text-[#F9FAFB] hover:bg-[#1F2937] px-8 py-3 text-lg bg-transparent">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151] text-center">
                <div className="text-2xl font-bold text-[#00BFA6] mb-2">{value}</div>
                <div className="text-[#9CA3AF] text-sm">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-4">
              Everything You Need On Site
            </h2>
            <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto">
              RestoreAssist replaces clipboards, spreadsheets and email chains with a single tool that works where you work — even underground or in rural properties without signal.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                  <Icon className="h-8 w-8 text-[#00BFA6] mb-4" aria-hidden="true" />
                  <h3 className="font-poppins font-semibold text-lg text-white mb-3">{title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IICRC Compliance section */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-10 border border-[#374151]">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-10 w-10 text-[#00BFA6] flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h2 className="font-poppins font-semibold text-2xl text-white mb-2">
                  Built Around IICRC Standards
                </h2>
                <p className="text-[#9CA3AF]">
                  RestoreAssist is designed from the ground up around IICRC certification requirements.
                  Every checklist, every log format, every report template aligns with the standards your
                  insurers and assessors expect.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { standard: 'IICRC S500', service: 'Water Damage Restoration' },
                { standard: 'IICRC FSRT', service: 'Fire & Smoke Restoration' },
                { standard: 'IICRC S520', service: 'Mould Remediation' },
                { standard: 'IICRC S540', service: 'Biohazard Cleanup' },
              ].map(({ standard, service }) => (
                <div key={standard} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#00BFA6] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#F9FAFB] text-sm">
                    <span className="font-semibold">{standard}</span>
                    {' — '}{service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins font-semibold text-3xl text-center text-white mb-12">
              Built for Every Role on Site
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  role: 'Lead Technician',
                  description: 'Run the full job from first attendance to sign-off. Log readings, assign tasks and generate the final insurance report without leaving the field.',
                  icon: Clock,
                },
                {
                  role: 'Site Crew',
                  description: 'Receive task assignments, log completion and upload photos directly from your phone. No laptop required.',
                  icon: Smartphone,
                },
                {
                  role: 'Operations Manager',
                  description: 'Monitor all active jobs in real time from the NRPG dashboard. Review documentation before it reaches the insurer.',
                  icon: BarChart3,
                },
              ].map(({ role, description, icon: Icon }) => (
                <div key={role} className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-6 border border-[#374151]">
                  <Icon className="h-8 w-8 text-[#00BFA6] mb-4" aria-hidden="true" />
                  <h3 className="font-poppins font-semibold text-lg text-white mb-3">{role}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 pb-24">
          <div className="bg-gradient-to-r from-[#00BFA6] to-[#0077B6] rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
              Access RestoreAssist with Your NRPG Membership
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              RestoreAssist is included at no extra cost for all verified NRPG contractors.
              Apply to join the network and get access today.
            </p>
            <Link href="/contractors/join">
              <Button className="bg-white hover:bg-white/90 text-[#00BFA6] font-bold text-xl px-12 py-4">
                Apply to Join NRPG
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
