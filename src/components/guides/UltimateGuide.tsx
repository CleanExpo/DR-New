'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, User, Calendar, ChevronRight, AlertCircle,
  CheckCircle, Download, Share2, Bookmark, ArrowUp, List,
  Lightbulb, AlertTriangle, Phone, MessageCircle, FileText,
  TrendingUp, Award, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GuideSection {
  id: string;
  title: string;
  content: string;
  tips?: string[];
  warning?: string;
}

interface Statistic {
  label: string;
  value: string;
  highlight?: boolean;
}

interface RelatedGuide {
  title: string;
  href: string;
}

interface UltimateGuideProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  readTime: string;
  author: string;
  authorCredentials: string;
  tableOfContents: string[];
  sections: GuideSection[];
  statistics?: Statistic[];
  checklistItems?: string[];
  relatedGuides?: RelatedGuide[];
}

export default function UltimateGuide({
  title,
  subtitle,
  lastUpdated,
  readTime,
  author,
  authorCredentials,
  tableOfContents,
  sections,
  statistics = [],
  checklistItems = [],
  relatedGuides = []
}: UltimateGuideProps) {
  const [activeSection, setActiveSection] = useState('');
  const [readProgress, setReadProgress] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadProgress(scrolled);
      setShowScrollTop(winScroll > 500);

      // Update active section
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const current = sectionElements.find(el => {
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleChecklistItem = (index: number) => {
    setCheckedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-white/20 text-white border-white/30">
                <BookOpen className="w-3 h-3 mr-1" />
                Ultimate Guide
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Clock className="w-3 h-3 mr-1" />
                {readTime}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Calendar className="w-3 h-3 mr-1" />
                Updated {lastUpdated}
              </Badge>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-blue-100 mb-8"
            >
              {subtitle}
            </motion.p>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{author}</p>
                <p className="text-sm text-blue-100">{authorCredentials}</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark className={`w-5 h-5 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="secondary" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
              <Button variant="secondary" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share Guide
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      {statistics.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-2xl md:text-3xl font-bold ${
                    stat.highlight ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <List className="w-5 h-5" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(sections[index]?.id || '')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        activeSection === sections[index]?.id
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-sm">{item}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = 'tel:1300309361'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Help
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Guide Sections */}
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="mb-12 scroll-mt-20"
              >
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                      <span className="text-blue-600">{index + 1}.</span>
                      {section.title}
                    </h2>
                  </div>

                  <CardContent className="p-8">
                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {section.content.split('\n\n').map((paragraph, pIndex) => {
                        // Handle different formatting
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h3 key={pIndex} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                              {paragraph.replace(/\*\*/g, '')}
                            </h3>
                          );
                        } else if (paragraph.startsWith('- ')) {
                          const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                          return (
                            <ul key={pIndex} className="space-y-2 my-4">
                              {items.map((item, iIndex) => (
                                <li key={iIndex} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{item.substring(2)}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } else if (paragraph.includes('**')) {
                          // Handle inline bold text
                          const parts = paragraph.split('**');
                          return (
                            <p key={pIndex} className="mb-4">
                              {parts.map((part, partIndex) =>
                                partIndex % 2 === 1 ? (
                                  <strong key={partIndex} className="text-gray-900">{part}</strong>
                                ) : (
                                  <span key={partIndex}>{part}</span>
                                )
                              )}
                            </p>
                          );
                        } else {
                          return <p key={pIndex} className="mb-4">{paragraph}</p>;
                        }
                      })}
                    </div>

                    {/* Tips Section */}
                    {section.tips && section.tips.length > 0 && (
                      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2 text-blue-800">
                              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Warning Box */}
                    {section.warning && (
                      <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-red-800 font-medium">{section.warning}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.section>
            ))}

            {/* Emergency Checklist */}
            {checklistItems.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      Emergency Action Checklist
                    </h2>
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-3">
                      {checklistItems.map((item, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg"
                        >
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            onChange={() => toggleChecklistItem(index)}
                            className="mt-1"
                          />
                          <span className={`${
                            checkedItems.includes(index)
                              ? 'line-through text-gray-500'
                              : 'text-gray-700'
                          }`}>
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <p className="text-green-800 font-medium">
                        Progress: {checkedItems.length} of {checklistItems.length} completed
                      </p>
                      <Progress
                        value={(checkedItems.length / checklistItems.length) * 100}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedGuides.map((guide, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <FileText className="w-8 h-8 text-blue-600 mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">{guide.title}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.location.href = guide.href}
                        >
                          Read Guide
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12"
            >
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Need Emergency Assistance?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our IICRC certified experts are available 24/7 to help with your disaster recovery needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = 'tel:1300309361'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1300 309 361
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Online Claim
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>10,000+ Jobs Completed</span>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}