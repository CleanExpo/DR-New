/**
 * FAQ Page — DR-237
 *
 * /faq — Top 20 frequently asked questions with FAQPage schema.
 * Targets Google AI Overviews + featured snippets.
 *
 * SEO: "disaster recovery Australia FAQ", "water damage restoration questions",
 *       "how to claim flood damage insurance Australia"
 */

import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecovery.com.au';
const CANONICAL = `${BASE_URL}/faq`;

export const metadata: Metadata = {
  title: 'Disaster Recovery FAQ | Common Questions Answered — NRPG',
  description:
    'Answers to the most common questions about disaster recovery, water damage restoration, insurance claims, mould remediation, and NRPG contractors in Australia.',
  keywords: [
    'disaster recovery Australia FAQ',
    'water damage restoration questions',
    'how to claim flood damage insurance Australia',
    'how long does water damage restoration take',
    'does insurance cover mould Australia',
    'IICRC certified restoration questions',
    'flood damage claim help Australia',
    'mould remediation FAQ Australia',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Disaster Recovery FAQ — Common Questions Answered | NRPG',
    description: 'Everything property owners need to know about disaster restoration, insurance claims, and working with NRPG certified contractors in Australia.',
    url: CANONICAL,
    siteName: 'NRPG - Disaster Recovery Australia',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery FAQ | NRPG Australia',
    description: 'Answers to the most common disaster recovery and insurance claim questions.',
  },
  robots: { index: true, follow: true },
};

// ---------------------------------------------------------------------------
// FAQ data — top 20 questions
// ---------------------------------------------------------------------------

const FAQ_CATEGORIES = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is Disaster Recovery Australia (NRPG) and how does it work?',
        a: 'Disaster Recovery Australia is the client-facing platform that connects property owners affected by disasters with vetted, IICRC-certified restoration contractors through the National Restoration Partners Guild (NRPG). When you submit a claim through our platform, our network dispatches a certified contractor to your property within 60 minutes for emergency assessment. NRPG contractors handle water damage, fire and smoke damage, storm damage, mould remediation, and biohazard cleanup across all Australian states and territories, including New Zealand.',
      },
      {
        q: 'How quickly can an NRPG contractor reach my property?',
        a: 'Our target response time is 60 minutes for emergency callouts, 24 hours a day, 7 days a week. Response times may vary based on your location and current demand during major weather events. During declared disaster events (cyclones, floods, severe storms), we prioritise the most urgent cases first — life safety always takes precedence.',
      },
      {
        q: 'What types of damage does NRPG handle?',
        a: 'NRPG contractors are certified to handle: water and flood damage (including extraction, structural drying, and mould prevention), fire and smoke damage (cleanup, odour treatment, structural assessment), storm and cyclone damage (make-safe, tarping, water ingress remediation), mould remediation (containment, HEPA filtration, clearance testing), and biohazard and sewage cleanup (Category 1–3 water damage). All work is performed to IICRC standards and fully documented for insurance claims.',
      },
      {
        q: 'Are NRPG contractors certified?',
        a: 'Yes. All NRPG network contractors must hold active IICRC (Institute of Inspection Cleaning and Restoration Certification) credentials relevant to the services they perform. This includes certifications such as Water Damage Restoration Technician (WRT), Applied Structural Drying (ASD), and Fire and Smoke Restoration Technician (FSRT). IICRC certification is recognised by all major Australian insurers as the industry standard for professional restoration.',
      },
    ],
  },
  {
    category: 'Insurance Claims',
    questions: [
      {
        q: 'Does home insurance cover water damage restoration in Australia?',
        a: 'Most standard home insurance policies in Australia cover sudden and accidental water damage from burst pipes, storm water ingress, and appliance failure. Flood cover (riverine flooding) is typically an optional add-on and varies by insurer and postcode. Gradual damage from slow leaks is generally excluded. NRPG contractors provide a professional scope of works document, photos, and moisture readings that your insurer needs to process the claim — this documentation is critical for claim success.',
      },
      {
        q: 'How do I start an insurance claim for disaster damage?',
        a: 'The process is: (1) Contact your insurer to notify them of the damage as soon as possible — most policies require notification within a specified timeframe. (2) Request emergency assessment through NRPG — we document the damage professionally before any work begins, which is essential for your claim. (3) Your NRPG contractor provides a scope of works, photos, and moisture readings to your insurer. (4) Once approved, restoration work proceeds. NRPG contractors are approved by all major Australian insurers including NRMA, Suncorp, Allianz, QBE, and RACQ.',
      },
      {
        q: 'Will my insurer accept the documentation from NRPG contractors?',
        a: 'Yes. NRPG contractors produce IICRC-standard documentation including moisture mapping, equipment logs, drying progress reports, and scope of works. This documentation format is recognised and accepted by all major Australian insurers. In most cases, professional documentation from a certified contractor significantly speeds up the claims process compared to undocumented DIY attempts.',
      },
      {
        q: 'What if my insurer disputes my claim?',
        a: 'If your insurer disputes your claim, the professional documentation provided by your NRPG contractor is your primary evidence. This includes: photographic records of damage extent, moisture metre readings showing moisture levels, independent scope of works, and compliance with IICRC restoration standards. If a dispute continues, you can escalate to the Australian Financial Complaints Authority (AFCA) for independent resolution at no cost.',
      },
    ],
  },
  {
    category: 'Water & Flood Damage',
    questions: [
      {
        q: 'How long does water damage restoration take?',
        a: 'Most residential water damage jobs take 3–7 days for the structural drying phase, depending on the affected area, materials, equipment deployed, and ambient conditions. Carpet and plasterboard typically dry within 3–5 days with professional equipment. Concrete slabs and timber framing can take 7–14 days or more. The IICRC S500 standard defines completion when all materials reach their pre-loss equilibrium moisture content — not an arbitrary time target.',
      },
      {
        q: 'Do I really need professional drying equipment — can I just use fans?',
        a: 'Consumer fans and dehumidifiers are significantly less effective than commercial drying equipment. A professional LGR (Low Grain Refrigerant) dehumidifier removes 4–6 times more moisture per hour than a typical hardware store unit. Without adequate drying, moisture trapped in wall cavities, under floors, and in structural framing drives mould growth — which typically begins within 24–48 hours in warm Australian conditions. Mould remediation costs significantly more than the original water damage restoration. Professional equipment also produces the drying logs that insurers require.',
      },
      {
        q: 'What is the difference between Category 1, 2, and 3 water damage?',
        a: 'The IICRC classification defines water damage categories by contamination level. Category 1 (clean water) comes from sanitary sources like burst pipes or rain. Category 2 (grey water) contains significant contamination — washing machine overflow, dishwasher discharge. Category 3 (black water) is grossly contaminated — sewage backup, floodwater. Category 3 requires specialised protective equipment, antimicrobial treatment, and safe disposal of contaminated materials. NRPG contractors are certified for all three categories.',
      },
    ],
  },
  {
    category: 'Mould',
    questions: [
      {
        q: 'Is mould covered by home insurance in Australia?',
        a: 'Mould is typically only covered when it is a direct result of a covered insured event — for example, mould that develops from a storm-related water ingress or burst pipe. Pre-existing mould or mould from gradual leaks (lack of maintenance) is generally excluded. If mould develops after a covered water damage event and you delayed professional drying, insurers may dispute coverage on the basis that the mould was preventable. This is why prompt professional water damage restoration is critical.',
      },
      {
        q: 'How do I know if I have a mould problem that requires professional remediation?',
        a: 'Signs requiring professional attention include: visible mould growth covering more than 1 square metre, mould in wall cavities or behind plasterboard (often indicated by musty odour without visible growth), mould affecting HVAC systems or air handling units, or mould growth in properties with occupants who are immunocompromised, elderly, or have respiratory conditions. NRPG provides professional mould assessments — small surface mould (less than 1m²) on non-porous surfaces can sometimes be addressed with DIY antimicrobial treatment, but structural mould should always be assessed professionally.',
      },
    ],
  },
  {
    category: 'Costs & Pricing',
    questions: [
      {
        q: 'How much does disaster restoration cost in Australia?',
        a: 'Restoration costs vary significantly based on the type and extent of damage. Indicative ranges: water damage restoration $2,500–$8,000 for standard residential; fire and smoke cleanup $4,800–$18,000+ depending on damage extent; mould remediation $1,800–$8,000; storm damage assessment and make-safe $1,500–$6,000. These figures cover remediation and drying — structural repairs and reinstatement (replacing plasterboard, flooring, painting) are additional. If you have insurance, the policy excess is typically your only out-of-pocket cost.',
      },
      {
        q: 'What does a typical NRPG contractor invoice include?',
        a: 'A standard NRPG scope of works includes: emergency call-out and assessment, damage documentation (photos, moisture mapping), water extraction or damage remediation, equipment hire (dehumidifiers, air movers, air scrubbers), structural drying to IICRC standard, antimicrobial treatment, progress monitoring and documentation, and final clearance report. Structural reinstatement (replacement materials, painting, flooring) is typically quoted separately by a licensed builder.',
      },
    ],
  },
  {
    category: 'Working with NRPG',
    questions: [
      {
        q: 'How is NRPG different from calling a local tradie?',
        a: 'NRPG contractors are specifically trained and certified in disaster restoration science — not general building or cleaning. Key differences: (1) IICRC certification is mandatory, not optional. (2) All work is documented to insurance standard — without this, your insurer may refuse to pay. (3) NRPG contractors carry appropriate insurance for remediation work including professional indemnity and public liability. (4) Commercial-grade equipment produces measurably better results and verifiable drying logs. (5) All contractors operate under the NRPG code of ethics and professional standards framework.',
      },
      {
        q: 'What states and territories does NRPG operate in?',
        a: 'NRPG operates across all Australian states and territories: New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, ACT, and Northern Territory. We also operate in New Zealand. Coverage density varies by region — major metropolitan areas have multiple contractors on call 24/7, while some regional and remote areas may have longer response times. Coverage is continuously expanding.',
      },
      {
        q: 'What should I do immediately after a flood, fire, or storm before the contractor arrives?',
        a: 'Priority actions before the contractor arrives: (1) Ensure personal safety — do not enter a property that may have structural damage, electrical hazards, or contaminated floodwater. (2) Turn off electricity at the switchboard if water is present and it is safe to do so. (3) Document everything with your phone — take photos and video of all visible damage before moving anything. (4) Do not throw away damaged items — insurers need to assess them. (5) If flooding, do not use household fans or heating as this can spread contamination. (6) Contact your insurer to notify them of the event. An NRPG contractor will arrive to take over from there.',
      },
    ],
  },
];

// Flatten for FAQPage schema
const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) => cat.questions);

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL_FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: CANONICAL },
  ],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f9fafb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([FAQ_SCHEMA, BREADCRUMB_SCHEMA]) }}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-4xl">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0d9488]/10 border border-[#0d9488]/30 rounded-sm text-[#0d9488] text-xs font-semibold uppercase tracking-wide mb-5">
              DR-237
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              Frequently Asked{' '}
              <span className="text-[#0d9488]">Questions</span>
            </h1>
            <p className="text-[#9ca3af] text-lg max-w-2xl">
              Everything property owners need to know about disaster restoration, insurance claims, and working with NRPG certified contractors across Australia.
            </p>
          </div>

          {/* Category nav */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs text-[#9ca3af] border border-[#1f2937] px-3 py-1.5 rounded-sm hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-colors"
              >
                {cat.category}
              </a>
            ))}
          </div>

          {/* FAQ sections */}
          <div className="space-y-12">
            {FAQ_CATEGORIES.map((cat) => (
              <section key={cat.category} id={cat.category.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-[#1f2937]">
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.questions.map((item) => (
                    <FAQItem key={item.q} question={item.q} answer={item.a} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#0d9488]/10 border border-[#0d9488]/30 rounded-sm p-6">
            <h2 className="text-lg font-bold text-white mb-2">Still have questions?</h2>
            <p className="text-sm text-[#9ca3af] mb-4">
              If your situation isn&apos;t covered above, our team is available 24/7 to help assess your damage and get your claim started.
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold px-5 py-2.5 rounded-sm text-sm transition-colors"
            >
              Request Emergency Assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Related links */}
          <div className="mt-8 pt-6 border-t border-[#1f2937]">
            <p className="text-xs text-[#6b7280] mb-3">Related pages</p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/services/water-damage', label: 'Water Damage Restoration' },
                { href: '/services/mould-remediation', label: 'Mould Remediation' },
                { href: '/services/fire-smoke-damage', label: 'Fire & Smoke Damage' },
                { href: '/services/storm-damage', label: 'Storm Damage' },
                { href: '/get-started', label: 'Get Started' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-[#0d9488] border border-[#0d9488]/30 px-3 py-1.5 rounded-sm hover:bg-[#0d9488]/10 transition-colors"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordion item — client interaction via details/summary (no JS needed)
// ---------------------------------------------------------------------------

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-[#0f1115] border border-[#1f2937] rounded-sm overflow-hidden">
      <summary className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-[#1f2937]/50 transition-colors">
        <h3 className="text-sm font-semibold text-white leading-relaxed">{question}</h3>
        <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
          <ChevronDown className="h-4 w-4 text-[#6b7280] group-open:hidden" />
          <ChevronUp className="h-4 w-4 text-[#0d9488] hidden group-open:block" />
        </span>
      </summary>
      <div className="px-5 pb-5 pt-1">
        <p className="text-sm text-[#9ca3af] leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}
