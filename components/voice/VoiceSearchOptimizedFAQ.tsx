'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  voiceKeywords?: string[];
  schema?: boolean;
}

interface VoiceSearchFAQProps {
  title?: string;
  faqs: FAQItem[];
  emergencyContext?: boolean;
}

export default function VoiceSearchOptimizedFAQ({ 
  title = "Quick Answers for Brisbane Residents",
  faqs,
  emergencyContext = false 
}: VoiceSearchFAQProps) {
  // Generate schema markup for voice assistants
  const generateFAQSchema = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  // Generate Speakable schema for voice assistants
  const generateSpeakableSchema = () => {
    const speakableData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".voice-answer"]
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableData) }}
      />
    );
  };

  return (
    <>
      {generateFAQSchema()}
      {generateSpeakableSchema()}
      
      <section className="py-16 bg-white" aria-label="Frequently asked questions">
        <div className="max-w-4xl mx-auto px-6">
          {emergencyContext && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-900 font-semibold voice-answer">
                Emergency? Ring 1300 309 361 straight away. We answer 24 hours.
              </p>
            </div>
          )}
          
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <div className="voice-answer text-gray-700 prose prose-lg max-w-none">
                  <p>{faq.answer}</p>
                </div>
                {faq.voiceKeywords && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="sr-only">Voice search keywords: </span>
                    <div className="flex flex-wrap gap-2">
                      {faq.voiceKeywords.map((keyword, kidx) => (
                        <span 
                          key={kidx}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                          aria-hidden="true"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}