import { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  Droplets,
  BookOpen,
  Award,
  Gauge,
  ClipboardList,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Restoration Tools & Calculators | Disaster Recovery',
  description:
    'Free professional tools for disaster recovery and restoration contractors in Australia, New Zealand, and Japan — job calculators, drying estimators, moisture readers, and more.',
  openGraph: {
    title: 'Free Restoration Tools & Calculators | Disaster Recovery',
    description:
      'Professional tools for disaster recovery contractors: job costing, drying time estimation, moisture reading, insurance checklists, and IICRC course finder.',
    url: 'https://disasterrecovery.com.au/tools',
  },
}

const TOOLS = [
  {
    href: '/tools/job-calculator',
    icon: Calculator,
    title: 'Job Cost Calculator',
    description:
      'Line-item job costing with industry-standard rates for water, mould, fire, carpet, and storm jobs. Supports AU metro, AU regional, NZ, and Japan pricing.',
    badge: 'Most used',
    badgeColour: 'bg-blue-500/20 text-blue-300',
    free: true,
  },
  {
    href: '/tools/drying-calculator',
    icon: Droplets,
    title: 'Structural Drying Calculator',
    description:
      'Estimate drying time based on room dimensions, material types, temperature, and relative humidity. IICRC S500-aligned drying targets.',
    badge: 'New',
    badgeColour: 'bg-green-500/20 text-green-300',
    free: true,
  },
  {
    href: '/tools/moisture-reader',
    icon: Gauge,
    title: 'Moisture Reading Interpreter',
    description:
      'Input moisture meter readings for common building materials and get an instant assessment: dry, caution, or wet — with recommended action.',
    badge: null,
    badgeColour: '',
    free: true,
  },
  {
    href: '/tools/insurance-checklist',
    icon: ClipboardList,
    title: 'Insurance Claim Checklist',
    description:
      'Interactive documentation checklist covering all items required for a successful insurance claim — photos, reports, scope, supplements, and sign-offs.',
    badge: null,
    badgeColour: '',
    free: true,
  },
  {
    href: '/tools/course-finder',
    icon: BookOpen,
    title: 'IICRC Course Finder',
    description:
      'Search IICRC certification courses by type, location, and date across Australia, New Zealand, and Japan. Water, mould, fire, carpet, and more.',
    badge: null,
    badgeColour: '',
    free: true,
  },
  {
    href: '/tools/cec-tracker',
    icon: Award,
    title: 'CEC Credit Tracker',
    description:
      'Track your Continuing Education Credits toward IICRC certification renewal. Input completed courses and see your progress to the 14-CEC requirement.',
    badge: null,
    badgeColour: '',
    free: true,
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://disasterrecovery.com.au/tools' },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Disaster Recovery Professional Tools',
      description: 'Free calculators and utilities for restoration and disaster recovery contractors in AU, NZ, and Japan',
      numberOfItems: TOOLS.length,
      itemListElement: TOOLS.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.title,
        url: `https://disasterrecovery.com.au${tool.href}`,
      })),
    },
  ],
}

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#050505] text-white min-h-screen">
        {/* Hero */}
        <section className="px-6 py-20 max-w-5xl mx-auto text-center">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Professional Tools
          </p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Free Restoration Tools
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built for disaster recovery contractors in Australia, New Zealand, and Japan.
            IICRC-aligned. No sign-up required.
          </p>
        </section>

        {/* Tools grid */}
        <section className="px-6 pb-20 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map(tool => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    {tool.badge && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tool.badgeColour}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-2 flex items-center gap-2">
                    <span className="text-xs text-green-400 font-semibold">Free</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                      Open tool →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Data CTA */}
        <section className="px-6 pb-20 max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Looking for industry data?</h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Browse verified statistics, cost benchmarks, and market data sourced from IICRC, ICA,
              AIDR, CSIRO, and more.
            </p>
            <Link
              href="/data"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-colors"
            >
              View Industry Data
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
