'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, MessageCircle, Zap, Shield, Clock, DollarSign, FileText, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  featured?: boolean;
  schema?: boolean;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  schemaMarkup?: boolean;
}

const defaultFAQs: FAQItem[] = [
  // Emergency Response FAQs
  {
    question: "How quickly can you respond to water damage emergencies in Brisbane?",
    answer: "We guarantee response within 45 minutes for Brisbane, Ipswich, and Logan emergencies. Our rapid response teams are strategically located throughout Southeast Queensland with fully equipped vehicles ready 24/7. Most customers see us arrive within 30 minutes.",
    category: "Emergency Response",
    featured: true,
    schema: true
  },
  {
    question: "Do you work weekends and public holidays?",
    answer: "YES! We operate 24/7/365 including weekends, public holidays, Christmas, and Easter. We NEVER charge weekend or holiday surcharges. Your emergency doesn't wait for business hours, neither do we.",
    category: "Emergency Response",
    featured: true,
    schema: true
  },
  {
    question: "What areas do you service for emergency restoration?",
    answer: "We service all of Brisbane, Ipswich, Logan, Gold Coast, Sunshine Coast, and surrounding areas. Our network extends throughout Queensland with specialized teams for remote and regional areas. We've even deployed to PNG and offshore facilities.",
    category: "Service Areas",
    schema: true
  },

  // Insurance & Claims FAQs
  {
    question: "Do you work directly with insurance companies?",
    answer: "Yes! We're approved providers for all major insurers including NRMA, Suncorp, RACQ, Allianz, QBE, and others. We handle the entire claims process, provide detailed documentation, and bill insurance directly - you pay nothing upfront for approved claims.",
    category: "Insurance",
    featured: true,
    schema: true
  },
  {
    question: "What if I don't have insurance?",
    answer: "No insurance? No problem! We offer transparent upfront pricing, payment plans, and work within your budget. We'll provide a detailed quote before any work begins and offer multiple options to restore your property affordably.",
    category: "Insurance",
    schema: true
  },
  {
    question: "How much does water damage restoration cost?",
    answer: "Costs vary based on damage extent, but typical residential water damage restoration ranges from $2,000-$8,000. We provide FREE assessments and detailed quotes. Insurance typically covers the full cost. We NEVER charge for emergency call-outs or assessments.",
    category: "Pricing",
    featured: true,
    schema: true
  },

  // Service Process FAQs
  {
    question: "What happens when I call for emergency help?",
    answer: "1) We dispatch a team immediately (average 45 mins). 2) Assess and stop the damage source. 3) Extract water and begin drying. 4) Document everything for insurance. 5) Full restoration begins. You'll have a dedicated project manager throughout.",
    category: "Process",
    schema: true
  },
  {
    question: "How long does restoration take?",
    answer: "Minor water damage: 3-5 days. Major flooding: 1-2 weeks. Fire damage: 2-4 weeks. We work 24/7 to minimize downtime. Many businesses reopen within days. We provide detailed timelines upfront and daily progress updates.",
    category: "Process",
    schema: true
  },
  {
    question: "Do I need to move out during restoration?",
    answer: "Usually not! We use containment systems to isolate work areas. Most families stay home during restoration. For extensive damage, we can arrange temporary accommodation through your insurance. We minimize disruption to your life.",
    category: "Process",
    schema: true
  },

  // Technical & Certification FAQs
  {
    question: "Are you IICRC certified?",
    answer: "Yes! All our technicians hold IICRC certifications in Water Damage Restoration (WRT), Applied Structural Drying (ASD), Fire & Smoke Restoration (FSRT), and Mould Remediation (AMRT). We're also licensed for asbestos removal and biohazard cleaning.",
    category: "Certifications",
    featured: true,
    schema: true
  },
  {
    question: "What equipment do you use?",
    answer: "We use industrial-grade equipment including truck-mounted extraction units, commercial dehumidifiers, air movers, thermal imaging cameras, moisture meters, HEPA air scrubbers, and hydroxyl generators. All equipment is maintained to IICRC S500 standards.",
    category: "Technical",
    schema: true
  },
  {
    question: "Can you handle commercial and industrial properties?",
    answer: "Absolutely! We've restored everything from small offices to 80-floor high-rises, hospitals, schools, factories, and even offshore oil rigs. No job is too big or complex. We have specialized commercial response teams.",
    category: "Commercial",
    schema: true
  },

  // Mould & Health FAQs
  {
    question: "Is mould dangerous? Should I be concerned?",
    answer: "Yes, mould can cause serious health issues including respiratory problems, allergies, and infections. Black mould (Stachybotrys) is particularly dangerous. Never attempt DIY mould removal over 1m². We safely remediate all mould types following IICRC S520 standards.",
    category: "Mould",
    featured: true,
    schema: true
  },
  {
    question: "How quickly does mould grow after water damage?",
    answer: "Mould can begin growing within 24-48 hours of water damage. That's why immediate response is critical. We use antimicrobial treatments and rapid drying to prevent mould growth. Every hour counts in preventing costly mould problems.",
    category: "Mould",
    schema: true
  },

  // Specific Situation FAQs
  {
    question: "My ceiling is leaking. What should I do?",
    answer: "1) Turn off electricity to affected areas. 2) Place buckets to catch water. 3) Move valuables away. 4) Call us immediately at 1300 309 361. 5) Don't enter if ceiling is sagging. We'll arrive within 45 minutes to stop the leak and prevent collapse.",
    category: "Emergencies",
    schema: true
  },
  {
    question: "Sewage backup in my home. Is this dangerous?",
    answer: "YES! Sewage contains dangerous bacteria, viruses, and parasites. Don't attempt cleanup. Evacuate the area, avoid contact, and call us immediately. We're certified in biohazard cleaning and will safely restore your property.",
    category: "Emergencies",
    featured: true,
    schema: true
  },
  {
    question: "Can you save my hardwood floors after flooding?",
    answer: "Often yes! Using specialized drying mats and injection systems, we can save most hardwood floors if we respond quickly. We've saved thousands of dollars in flooring for Brisbane homeowners. Time is critical - call immediately.",
    category: "Specific Damage",
    schema: true
  }
];

export default function FAQSection({
  faqs = defaultFAQs,
  title = "Frequently Asked Questions",
  subtitle = "Get instant answers to common disaster recovery questions",
  showSearch = true,
  showCategories = true,
  schemaMarkup = true
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredFAQs = faqs.filter(faq => faq.featured);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categoryIcons: { [key: string]: React.ElementType } = {
    'Emergency Response': Zap,
    'Insurance': Shield,
    'Process': Clock,
    'Pricing': DollarSign,
    'Certifications': FileText,
    'Mould': HelpCircle,
    'Technical': HelpCircle,
    'Commercial': HelpCircle,
    'Service Areas': HelpCircle,
    'Emergencies': Zap,
    'Specific Damage': HelpCircle
  };

  // Generate schema markup
  const schemaData = schemaMarkup ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
      .filter(faq => faq.schema)
      .map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
  } : null;

  return (
    <>
      {/* Schema Markup */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Quick Answers</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for answers... e.g. 'water damage cost', 'insurance claims', 'mould removal'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          {showCategories && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              <Badge
                className={`cursor-pointer px-4 py-2 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All Questions
              </Badge>
              {categories.map(category => {
                const Icon = categoryIcons[category] || HelpCircle;
                return (
                  <Badge
                    key={category}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedCategory === category
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {category}
                  </Badge>
                );
              })}
            </motion.div>
          )}

          {/* Featured FAQs */}
          {!searchTerm && selectedCategory === 'all' && featuredFAQs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Most Asked Questions</h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {featuredFAQs.slice(0, 4).map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-700 text-white rounded-full p-2">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-700 line-clamp-2">{faq.answer}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {faq.question}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <motion.div
                          animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openItems.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 border-t">
                            <p className="text-gray-700 pt-4 whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No questions found matching your search.</p>
                <p className="text-gray-500 mt-2">Try different keywords or browse all categories.</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          >
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our disaster recovery experts are available 24/7 to answer your specific questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = 'tel:1300309361'}
                className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 1300 309 361
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}