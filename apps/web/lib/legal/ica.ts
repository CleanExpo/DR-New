/**
 * Independent Contractor Agreement (ICA) — single canonical source (DR-885).
 *
 * This module is the ONE source of truth for the ICA. The display page, the
 * stored `documentHash`, and the generated signed PDF all derive from
 * `ICA_SECTIONS` via `getIcaCanonicalText()`, guaranteeing the displayed text,
 * the hashed text, and the PDF text are byte-identical.
 *
 * To revise the agreement: edit the content below AND bump `ICA_VERSION`. A new
 * version supersedes prior acceptances and re-gates dispatch (DR-889). The
 * accepted version must have a recorded counsel sign-off before the dispatch
 * gate may go GREEN (DR-891).
 *
 * This module is intentionally dependency-free (no `crypto`/Node built-ins) so
 * it is safe to import from client components. The SHA-256 hash lives in the
 * server-only companion `./ica-hash`.
 */

/** ISO date of the agreement revision. Bump on any content change. */
export const ICA_VERSION = '2026-03-05';

/** Human-facing "Last updated" label — kept identical to ICA_VERSION's date. */
export const ICA_LAST_UPDATED = '5 March 2026';

export const ICA_TITLE = 'Independent Contractor Agreement';
export const ICA_SUBTITLE = 'National Restoration Partners Guild (NRPG)';

export const ICA_INTRO =
  'This agreement sets out the terms and conditions under which independent contractors operate within the NRPG network. Please read this document carefully before accepting any jobs through the platform.';

export const ICA_ENTITY = {
  legalName: 'Disaster Recovery Pty Ltd',
  abn: '85 151 794 142',
  acn: '151 794 142',
  tradingAs: ['Disaster Recovery', 'NRPG', 'Restore Assist'],
  footerNote: 'Australia-wide · AI-automated online',
} as const;

export type IcaBlock =
  | { kind: 'p'; text: string }
  | { kind: 'callout'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] };

export interface IcaSection {
  number: number;
  title: string;
  blocks: IcaBlock[];
}

export const ICA_SECTIONS: IcaSection[] = [
  {
    number: 1,
    title: 'Parties and Relationship',
    blocks: [
      {
        kind: 'p',
        text: 'This Independent Contractor Agreement ("Agreement") is entered into between Disaster Recovery Pty Ltd (ABN: 85 151 794 142, ACN: 151 794 142), trading as "Disaster Recovery", "NRPG", and "Restore Assist" ("the Platform"), and the contractor ("you" or "the Contractor").',
      },
      {
        kind: 'callout',
        text: 'You are an independent contractor, not an employee of NRPG, Disaster Recovery, Restore Assist, or Disaster Recovery Pty Ltd. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship between you and the Platform.',
      },
      {
        kind: 'p',
        text: "As an independent contractor, you are solely responsible for your own taxation obligations, superannuation, workers' compensation, insurances, and compliance with all applicable laws and regulations. The Platform does not withhold tax, provide leave entitlements, or offer employment benefits of any kind.",
      },
    ],
  },
  {
    number: 2,
    title: 'Platform Role',
    blocks: [
      {
        kind: 'p',
        text: 'The NRPG platform facilitates the connection between property owners, insurers, and independent restoration contractors. The Platform:',
      },
      {
        kind: 'ul',
        items: [
          'Provides a marketplace for disaster recovery and restoration jobs',
          'Manages job listings, matching, and communication tools',
          'Processes payments on behalf of contractors',
          'Maintains quality and certification standards for the network',
        ],
      },
      {
        kind: 'p',
        text: 'The Platform does not directly provide restoration services. All work is performed by independent, licensed contractors within the NRPG network.',
      },
    ],
  },
  {
    number: 3,
    title: 'Commission and Platform Fee Structure',
    blocks: [
      {
        kind: 'p',
        text: 'The Platform charges a commission on all jobs completed through the NRPG network. The fee structure is as follows:',
      },
      {
        kind: 'ul',
        items: [
          'Platform fee: A percentage-based commission is deducted from each completed job payment. Current rates are available in your contractor dashboard.',
          'Subscription fees: Monthly or annual network membership fees may apply depending on your certification tier.',
          'Payment processing: Standard payment processing fees apply to all transactions.',
        ],
      },
      {
        kind: 'p',
        text: "The Platform reserves the right to adjust fees with 30 days' written notice. All fees are exclusive of GST unless otherwise stated.",
      },
    ],
  },
  {
    number: 4,
    title: 'Insurance Requirements',
    blocks: [
      {
        kind: 'p',
        text: 'All contractors must maintain the following minimum insurance coverage at all times while operating within the NRPG network:',
      },
      {
        kind: 'ul',
        items: [
          'Public Liability: Minimum $10,000,000 (ten million dollars)',
          'Professional Indemnity: As required by your trade or profession',
          "Workers' Compensation: As required by state or territory law",
          'Motor Vehicle Insurance: Comprehensive cover for all work vehicles',
        ],
      },
      {
        kind: 'p',
        text: 'You must provide current certificates of currency upon registration and whenever requested by the Platform. Failure to maintain adequate insurance coverage will result in immediate suspension from the network.',
      },
    ],
  },
  {
    number: 5,
    title: 'IICRC Certification Requirements',
    blocks: [
      {
        kind: 'p',
        text: 'Contractors performing restoration work through the NRPG network must hold and maintain current IICRC (Institute of Inspection Cleaning and Restoration Certification) credentials relevant to their scope of work. This includes but is not limited to:',
      },
      {
        kind: 'ul',
        items: [
          'Water Damage Restoration Technician (WRT)',
          'Fire and Smoke Restoration Technician (FSRT)',
          'Applied Microbial Remediation Technician (AMRT)',
          'Applied Structural Drying (ASD)',
          'Any additional certifications relevant to services offered',
        ],
      },
      {
        kind: 'p',
        text: "Contractors must maintain their certifications through ongoing continuing education as required by the IICRC. Expired certifications must be renewed within 30 days or the contractor's profile will be suspended until compliance is restored.",
      },
    ],
  },
  {
    number: 6,
    title: 'Code of Conduct',
    blocks: [
      {
        kind: 'p',
        text: 'All contractors must adhere to the NRPG Code of Conduct, which outlines professional standards, customer service requirements, and behavioural expectations. Breach of the Code of Conduct may result in warnings, suspension, or termination from the network.',
      },
    ],
  },
  {
    number: 7,
    title: 'Payment Terms',
    blocks: [
      {
        kind: 'p',
        text: 'Payment for jobs completed through the NRPG platform is processed as follows:',
      },
      {
        kind: 'ul',
        items: [
          'Fund holding: The Platform holds client or insurer funds in a dedicated trust account until job completion is confirmed.',
          'Release on completion: Funds are released to the contractor once the job is marked as complete and the client or insurer has confirmed satisfaction, subject to any applicable dispute resolution process.',
          'Payment timeframe: Payments are processed within 5-10 business days of job completion confirmation.',
          'Invoicing: Contractors must provide valid tax invoices (including ABN) for all work completed through the Platform.',
        ],
      },
    ],
  },
  {
    number: 8,
    title: 'Termination',
    blocks: [
      { kind: 'p', text: 'Either party may terminate this Agreement:' },
      {
        kind: 'ul',
        items: [
          "By the Contractor: At any time by providing 14 days' written notice to the Platform. Any in-progress jobs must be completed or appropriately handed over before termination takes effect.",
          "By the Platform: With 14 days' written notice for any reason, or immediately in cases of serious misconduct, fraud, breach of insurance or certification requirements, or material breach of this Agreement or the Code of Conduct.",
        ],
      },
      {
        kind: 'p',
        text: 'Upon termination, the contractor must return any Platform materials, cease using NRPG branding, and complete any outstanding obligations. Payment for completed work will be processed in accordance with the payment terms above.',
      },
    ],
  },
  {
    number: 9,
    title: 'Dispute Resolution',
    blocks: [
      {
        kind: 'p',
        text: 'In the event of a dispute arising out of or in connection with this Agreement, the parties agree to the following process:',
      },
      {
        kind: 'ol',
        items: [
          "Internal resolution: The parties will first attempt to resolve the dispute through direct negotiation and the Platform's internal dispute resolution process.",
          'Mediation: If the dispute cannot be resolved internally within 14 days, the parties agree to participate in mediation administered by an accredited mediator in Queensland, Australia.',
          'Legal proceedings: If mediation is unsuccessful, either party may commence legal proceedings in the courts of Queensland, Australia.',
        ],
      },
    ],
  },
  {
    number: 10,
    title: 'Governing Law',
    blocks: [
      {
        kind: 'p',
        text: 'This Agreement is governed by and construed in accordance with the laws of the State of Queensland, Australia. The parties submit to the exclusive jurisdiction of the courts of Queensland, Australia, for the resolution of any disputes arising out of or in connection with this Agreement.',
      },
      {
        kind: 'p',
        text: 'If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions will continue to apply in full force and effect.',
      },
    ],
  },
  {
    number: 11,
    title: 'General Provisions',
    blocks: [
      {
        kind: 'ul',
        items: [
          'Entire agreement: This Agreement, together with the Code of Conduct and any supplementary terms published on the Platform, constitutes the entire agreement between the parties.',
          "Amendments: The Platform may amend this Agreement by providing 30 days' written notice. Continued use of the Platform after the amendment period constitutes acceptance of the amended terms.",
          'Assignment: The Contractor may not assign or transfer this Agreement without the prior written consent of the Platform.',
          'Confidentiality: Both parties agree to keep confidential any proprietary or commercially sensitive information obtained through the course of this Agreement.',
        ],
      },
    ],
  },
];

/**
 * Deterministic plain-text serialization of the ICA. This exact string is what
 * gets hashed and embedded in the signed PDF — do not reformat casually, as any
 * change alters `documentHash` and supersedes existing acceptances.
 */
export function getIcaCanonicalText(): string {
  const lines: string[] = [];
  lines.push(ICA_TITLE);
  lines.push(ICA_SUBTITLE);
  lines.push(`Version: ${ICA_VERSION}`);
  lines.push(`Last updated: ${ICA_LAST_UPDATED}`);
  lines.push('');
  lines.push(ICA_INTRO);
  lines.push('');

  for (const section of ICA_SECTIONS) {
    lines.push(`${section.number}. ${section.title}`);
    for (const block of section.blocks) {
      switch (block.kind) {
        case 'p':
          lines.push(block.text);
          break;
        case 'callout':
          lines.push(`IMPORTANT: ${block.text}`);
          break;
        case 'ul':
          for (const item of block.items) lines.push(`- ${item}`);
          break;
        case 'ol':
          block.items.forEach((item, i) => lines.push(`${i + 1}. ${item}`));
          break;
      }
    }
    lines.push('');
  }

  lines.push(
    `${ICA_ENTITY.legalName} | ABN: ${ICA_ENTITY.abn} | ACN: ${ICA_ENTITY.acn}`
  );
  lines.push(`Trading as: ${ICA_ENTITY.tradingAs.join(' · ')}`);
  return lines.join('\n');
}
