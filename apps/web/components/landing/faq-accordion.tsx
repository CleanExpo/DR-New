/**
 * FAQ Accordion Component
 *
 * Collapsible FAQ section for landing pages
 * Features:
 * - Smooth expand/collapse animation
 * - Chevron icon rotation
 * - Only one FAQ open at a time
 * - Accessible keyboard navigation
 * - Mobile responsive
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-orange-300 hover:shadow-md"
        >
          {/* Question Button */}
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between p-6 text-left transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-expanded={openIndex === index}
          >
            <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
            <svg
              className={cn(
                'h-6 w-6 flex-shrink-0 text-orange-600 transition-transform duration-200',
                openIndex === index ? 'rotate-180' : ''
              )}
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

          {/* Answer Content */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              openIndex === index ? 'max-h-[500px]' : 'max-h-0'
            )}
          >
            <div className="border-t border-gray-100 px-6 pb-6 pt-4">
              {typeof faq.answer === 'string' ? (
                <p className="text-base leading-relaxed text-gray-600">{faq.answer}</p>
              ) : (
                faq.answer
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Preset FAQs for waitlist landing page
export const waitlistFAQs: FAQ[] = [
  {
    question: 'When will the platform launch?',
    answer:
      'We expect to launch in Q2 2026 (April-June). Waitlist members will get early access 2 weeks before the public launch and exclusive beta testing opportunities.',
  },
  {
    question: 'Is there a cost to join the waitlist?',
    answer:
      'No! Joining the waitlist is completely free. There are no credit card requirements, no fees, and no obligations. You will receive launch updates and have the option to be among the first to use the platform.',
  },
  {
    question: 'What happens after I join the waitlist?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">After joining, you will receive:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>A confirmation email with your spot on the waitlist</li>
          <li>Monthly progress updates as we build the platform</li>
          <li>Exclusive disaster recovery tips and resources</li>
          <li>Early access invitation 2 weeks before public launch</li>
          <li>Opportunity to provide feedback during beta testing</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Who can use the NRPG platform?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">The platform serves two primary users:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>
            <strong>Property Owners:</strong> Homeowners, landlords, property managers, or business
            owners who need disaster recovery services (water damage, fire damage, mould, storm
            damage, etc.)
          </li>
          <li>
            <strong>Contractors:</strong> IICRC-certified disaster recovery contractors who want to
            grow their business by receiving qualified leads and managing jobs through our platform
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'What makes NRPG different from other platforms?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">NRPG is the only platform that combines:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>
            <strong>Strict verification:</strong> Only IICRC-certified, insured, and
            background-checked contractors
          </li>
          <li>
            <strong>24/7 emergency matching:</strong> Get help within 15 minutes, any time
          </li>
          <li>
            <strong>Transparent pricing:</strong> See itemized quotes before committing
          </li>
          <li>
            <strong>Real reviews:</strong> Verified customer reviews, not fake testimonials
          </li>
          <li>
            <strong>Fair contractor commissions:</strong> 12-15% vs. 20-30% on other platforms
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Can I unsubscribe from waitlist emails?',
    answer:
      'Absolutely! Every email we send includes an unsubscribe link at the bottom. You can opt out at any time with one click. We respect your inbox and your privacy.',
  },
];

// Preset FAQs for contractor application page
export const contractorFAQs: FAQ[] = [
  {
    question: 'How much does it cost to join?',
    answer:
      'There are no upfront costs, monthly fees, or subscription charges. You only pay a 12-15% commission when you win a job through the platform. If you do not get jobs, you do not pay anything.',
  },
  {
    question: 'What is the commission structure?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">Our transparent commission rates:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>
            <strong>12% commission:</strong> For jobs over $10,000 AUD
          </li>
          <li>
            <strong>15% commission:</strong> For jobs under $10,000 AUD
          </li>
          <li>
            <strong>No monthly fees:</strong> Pay only when you win jobs
          </li>
          <li>
            <strong>No cancellation fees:</strong> Leave anytime, no penalties
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">
          Compare to competitors: HIPages (20-30%), ServiceSeeking (15-25%)
        </p>
      </div>
    ),
  },
  {
    question: 'How do I receive jobs?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">Here's how job matching works:</p>
        <ol className="list-inside list-decimal space-y-1 text-gray-600">
          <li>Property owner submits a claim (water damage, fire, mould, etc.)</li>
          <li>
            Our system matches the claim with contractors based on: certifications, service areas,
            availability, rating, and response time
          </li>
          <li>You receive a notification via app, SMS, or email (you choose)</li>
          <li>You have 30 minutes to accept or decline the job</li>
          <li>If accepted, you contact the property owner directly and schedule the work</li>
        </ol>
      </div>
    ),
  },
  {
    question: 'What certifications do I need?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">Required certifications (at least one):</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>IICRC Water Damage Restoration (WRT)</li>
          <li>IICRC Applied Structural Drying (ASD)</li>
          <li>IICRC Fire and Smoke Restoration (FSR)</li>
          <li>IICRC Mould Remediation (AMRT)</li>
          <li>IICRC Trauma and Crime Scene Cleanup (CTS)</li>
          <li>Other equivalent Australian or international certifications</li>
        </ul>
        <p className="mt-2 text-gray-600">
          Plus: Valid business license (ABN), $10M+ public liability insurance, and background
          check.
        </p>
      </div>
    ),
  },
  {
    question: 'How long does the approval process take?',
    answer:
      'Most applications are reviewed within 2-3 business days. If we need additional documentation (certifications, insurance certificates, etc.), we will email you promptly. Once approved, you can complete the 30-minute platform training and start receiving jobs immediately.',
  },
  {
    question: 'What support do you provide?',
    answer: (
      <div className="space-y-2">
        <p className="text-gray-600">We support contractors with:</p>
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          <li>
            <strong>Platform training:</strong> 30-minute onboarding video + documentation
          </li>
          <li>
            <strong>Mobile app:</strong> Manage jobs, communicate with clients, submit invoices
          </li>
          <li>
            <strong>Contractor success team:</strong> Email and phone support (Mon-Fri, 9am-5pm
            AEST)
          </li>
          <li>
            <strong>Payment processing:</strong> We handle invoicing and direct insurance billing
          </li>
          <li>
            <strong>Dispute resolution:</strong> Mediation for client disputes or payment issues
          </li>
        </ul>
      </div>
    ),
  },
];
