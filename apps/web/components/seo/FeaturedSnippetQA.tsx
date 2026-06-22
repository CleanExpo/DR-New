
/**
 * Featured Snippet Q&A Component
 * Optimises content for featured snippets
 * Uses FAQSchema for structured data
 */

import { FAQPage } from 'schema-dts';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FeaturedSnippetQAProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

/**
 * Generate FAQPage schema
 */
function generateFAQSchema(faqs: FAQ[]): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Featured Snippet Q&A Component
 */
export function FeaturedSnippetQA({
  faqs,
  title,
  description
}: FeaturedSnippetQAProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs))
        }}
      />

      {/* FAQ Section */}
      <section className="featured-snippet-qa my-12 space-y-6">
        {title && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border-l-4 border-indigo-500 pl-4 py-3 bg-white hover:bg-indigo-50 transition rounded"
            >
              {/* Question */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>

              {/* Answer - optimised for 40-60 word featured snippet */}
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>

              {/* Word count indicator (for featured snippet optimization) */}
              <div className="mt-2 text-xs text-gray-400">
                {faq.answer.split(/\s+/).length} words
              </div>

              {/* Category tag */}
              {faq.category && (
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
                    {faq.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Snippet Best Practices */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded text-xs text-gray-700">
          <p className="font-semibold mb-2">💡 Featured Snippet Tip:</p>
          <p>
            This Q&A content is optimised for featured snippets. Google prefers answers between 40-60 words for question snippets. The structure above helps search engines understand and display your content prominently.
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * Individual FAQ Accordion Component
 */
export function FAQAccordion({
  faqs,
  title
}: FeaturedSnippetQAProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs))
        }}
      />

      <section className="faq-accordion my-12">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
        )}

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-300 rounded-lg overflow-hidden"
              open={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {/* Summary (Question) */}
              <summary className="cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition font-semibold text-gray-900 flex justify-between items-center">
                <span>{faq.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>

              {/* Details (Answer) */}
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
                {faq.category && (
                  <p className="text-xs text-gray-400 mt-3">
                    Category: {faq.category}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

// Note: Need to add import React
import React from 'react';
