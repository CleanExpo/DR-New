/**
 * FAQ Page — DR-237
 *
 * /faq — Top 20 questions with FAQPage schema for AI Overview targeting.
 * Also serves DR-240 (Q&A section for AI Overview).
 */

import { Metadata } from 'next';
import { FAQPageSchema, type FAQItem } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'FAQs — Disaster Recovery Australia | NRPG',
  description:
    'Answers to the top 20 questions about disaster recovery services in Australia — water damage, mould, fire restoration, insurance claims, and NRPG contractor certification.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/faq',
  },
};

const FAQ_DATA: FAQItem[] = [
  {
    question: 'What should I do immediately after water damage in my property?',
    answer:
      'Stop the water source if safe to do so, turn off electricity to affected areas, remove valuables from standing water, and contact a professional water damage restoration company. Per IICRC S500, extraction should begin within 24–48 hours to prevent secondary damage including mould growth.',
  },
  {
    question: 'How long does water damage restoration take?',
    answer:
      'Most residential water damage restoration takes 3–7 days for structural drying, depending on the water category (1, 2, or 3), the class of water damage (1–4), and the materials affected. Large commercial properties may take longer. IICRC S500 drying goals are set per material type and monitored daily.',
  },
  {
    question: 'Will my insurance cover water damage restoration?',
    answer:
      'Most Australian home and contents insurance policies cover sudden and accidental water damage (e.g. burst pipes). Gradual damage (e.g. slow leaks) is typically excluded. Flood damage requires specific flood cover. Our NRPG contractors provide insurance-compliant documentation to support your claim.',
  },
  {
    question: 'What is the difference between Category 1, 2, and 3 water damage?',
    answer:
      'Category 1 is clean water from supply lines. Category 2 is grey water from washing machines, dishwashers, or overflows with some contamination. Category 3 is black water from sewage, flooding, or water that has been stagnant for 48+ hours. Categories 2 and 3 require additional PPE and antimicrobial treatment per IICRC S500.',
  },
  {
    question: 'How do I know if I have mould after water damage?',
    answer:
      'Signs include visible mould growth (black, green, or white patches), musty odours, allergic reactions (sneezing, watery eyes), and persistent dampness. Professional mould assessment per IICRC S520 includes air quality testing and moisture mapping to identify hidden mould in wall cavities and HVAC systems.',
  },
  {
    question: 'Is mould dangerous to my health?',
    answer:
      'Yes. Mould exposure can cause respiratory issues, allergic reactions, asthma attacks, and in severe cases, neurological symptoms. Some moulds produce mycotoxins. Children, elderly, and immunocompromised individuals are at higher risk. Professional remediation per IICRC S520 includes containment to prevent spore spread during removal.',
  },
  {
    question: 'What does fire and smoke damage restoration involve?',
    answer:
      'Fire restoration includes structural assessment, soot and smoke residue removal, odour control (thermal fogging, ozone treatment, hydroxyl generation), contents cleaning, and structural repairs. Smoke damage often extends far beyond visible fire damage. IICRC S700 governs professional fire restoration procedures.',
  },
  {
    question: 'How much does water damage restoration cost in Australia?',
    answer:
      'Costs vary by scope: small residential jobs start from around $2,000–$5,000 AUD, while larger Category 3 or commercial jobs can exceed $20,000–$50,000 AUD. NRPG contractors provide detailed, itemised quotes before work begins. Most costs are covered by insurance for sudden/accidental events.',
  },
  {
    question: 'What is the IICRC and why does certification matter?',
    answer:
      'The IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the international body that sets standards for the restoration industry. IICRC-certified contractors follow evidence-based procedures that protect your property and health. All NRPG network contractors hold current IICRC certifications.',
  },
  {
    question: 'What is NRPG and how does the contractor network work?',
    answer:
      'NRPG (National Restoration Professionals Group) is Australia\'s premier disaster recovery contractor network. All contractors undergo a 100-point certification assessment, 34 hours of mandatory training (CSE + WRT courses), and ongoing performance monitoring. We match property owners with the right certified contractor for their specific damage type and location.',
  },
  {
    question: 'Can I stay in my home during water damage restoration?',
    answer:
      'It depends on the damage extent and water category. Category 1 damage in a small area may allow you to stay. Category 3 (sewage/flood) or extensive damage typically requires temporary relocation. Your restoration contractor will advise on safety, and your insurance policy may cover alternative accommodation costs.',
  },
  {
    question: 'How quickly can a restoration contractor respond in an emergency?',
    answer:
      'NRPG contractors target a 60-minute response for emergency calls across major Australian metro areas. Regional response times vary. Emergency services are available 24/7. Submit your request through our online contact form for the fastest dispatch.',
  },
  {
    question: 'What equipment do professional restorers use?',
    answer:
      'Professional equipment includes truck-mount and portable extractors, LGR (Low Grain Refrigerant) dehumidifiers, desiccant dehumidifiers, centrifugal and axial air movers, HEPA air scrubbers, infrared cameras, pin and pinless moisture meters, and thermo-hygrometers. Equipment selection depends on the damage class and materials affected.',
  },
  {
    question: 'What is a moisture map and why is it important?',
    answer:
      'A moisture map documents where moisture is present in your property using readings from multiple locations. It establishes baseline readings and tracks drying progress daily. Per IICRC S500, moisture mapping is essential for setting accurate drying goals and determining when structural drying is complete.',
  },
  {
    question: 'Do I need to make an insurance claim for water damage?',
    answer:
      'For significant damage, yes — restoration costs can be substantial. Contact your insurer as soon as possible after discovering damage. Document everything with photos before cleanup begins. NRPG contractors provide insurance-compliant documentation including moisture maps, drying logs, and completion reports.',
  },
  {
    question: 'What is the difference between restoration and renovation?',
    answer:
      'Restoration returns your property to its pre-loss condition using specialised techniques (extraction, drying, cleaning, antimicrobial treatment). Renovation involves replacing or upgrading materials. Insurance typically covers restoration to pre-loss condition. If renovation is needed beyond restoration, discuss scope with your insurer first.',
  },
  {
    question: 'How do I become an NRPG certified contractor?',
    answer:
      'Apply through our online contractor application at disasterrecovery.com.au/onboarding. Requirements include a valid ABN, public liability insurance (minimum $10M), relevant trade licences, and willingness to complete 34 hours of mandatory CARSI training. Applications are reviewed within 2–3 business days.',
  },
  {
    question: 'What areas of Australia do you service?',
    answer:
      'NRPG services all Australian states and territories including Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, Hobart, Darwin, and 150+ regional cities. We are expanding to New Zealand in 2026.',
  },
  {
    question: 'What happens if mould comes back after remediation?',
    answer:
      'Professional mould remediation per IICRC S520 includes addressing the moisture source — not just removing visible mould. If mould returns, the underlying moisture issue was not fully resolved. NRPG contractors identify and fix moisture sources (leaks, condensation, drainage) as part of the remediation scope.',
  },
  {
    question: 'How do I contact Disaster Recovery Australia?',
    answer:
      'Submit your request through our online contact form at disasterrecovery.com.au/contact. All enquiries are handled online — we do not publish phone numbers. For emergency assistance, use the emergency form for priority dispatch. Contractor applications can be submitted at disasterrecovery.com.au/onboarding.',
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQPageSchema faqs={FAQ_DATA} />
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-sm mb-10">
            Answers to the most common questions about disaster recovery
            services in Australia.
          </p>

          <div className="space-y-6">
            {FAQ_DATA.map((faq, i) => (
              <details
                key={i}
                className="group border border-zinc-800 rounded-lg bg-zinc-950 overflow-hidden"
              >
                <summary className="cursor-pointer select-none px-5 py-4 text-sm font-medium text-white hover:text-amber-400 transition-colors list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg ml-4">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
