'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MotionDiv } from '@/lib/motion/components';
import { staggerContainer, staggerItem } from '@/lib/design-system';

export interface FAQItem {
  /** Question */
  question: string;
  /** Answer */
  answer: string;
}

export interface ServiceFAQProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** FAQ items */
  faqs: FAQItem[];
  /** Default open items (by index) */
  defaultOpen?: number[];
}

/**
 * ServiceFAQ - Accordion-style FAQ component
 *
 * Features:
 * - Accessible accordion (WCAG 2.1 AA)
 * - Smooth animations
 * - Keyboard navigation
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <ServiceFAQ
 *   title="Frequently Asked Questions"
 *   description="Common questions about our water damage restoration services"
 *   faqs={[
 *     {
 *       question: "How quickly can you respond?",
 *       answer: "We respond within 60 minutes for emergency calls in Brisbane metro areas."
 *     },
 *     // ... more FAQs
 *   ]}
 *   defaultOpen={[0]}
 * />
 * ```
 */
export function ServiceFAQ({
  title,
  description,
  faqs,
  defaultOpen = [],
}: ServiceFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(defaultOpen)
  );

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </MotionDiv>

        {/* FAQ Accordion */}
        <MotionDiv
          className="max-w-4xl mx-auto space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);

            return (
              <MotionDiv
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                variants={staggerItem}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </section>
  );
}
