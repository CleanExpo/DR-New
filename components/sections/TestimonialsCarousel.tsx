'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  image?: string;
  verified: boolean;
  responseTime?: string;
  damageType?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: {
    responseTime: string;
    completionTime: string;
    areaCovered: string;
    satisfaction: string;
  };
  images: {
    before?: string;
    after?: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'Brisbane CBD',
    rating: 5,
    date: '2 weeks ago',
    service: 'Water Damage Restoration',
    text: 'Outstanding service! When our office flooded after the storm, they arrived within 45 minutes at 2am. The team was professional, efficient, and helped us get back to business in just 3 days. They handled everything including the insurance claims.',
    verified: true,
    responseTime: '45 minutes',
    damageType: 'Commercial Flood'
  },
  {
    id: '2',
    name: 'David Chen',
    location: 'Ipswich',
    rating: 5,
    date: '1 month ago',
    service: 'Fire & Smoke Restoration',
    text: 'After our kitchen fire, we were devastated. Disaster Recovery Brisbane not only restored our home but provided emotional support throughout. They worked directly with our insurance and the results exceeded our expectations. Our home looks better than before!',
    verified: true,
    responseTime: '30 minutes',
    damageType: 'Residential Fire'
  },
  {
    id: '3',
    name: 'Jennifer Walsh',
    location: 'Logan',
    rating: 5,
    date: '3 weeks ago',
    service: 'Mould Remediation',
    text: 'Discovered extensive mould in our investment property. They conducted a thorough inspection, explained everything clearly, and completed the remediation perfectly. Haven\'t had any issues since. Their prevention advice was invaluable.',
    verified: true,
    responseTime: '90 minutes',
    damageType: 'Mould Infestation'
  },
  {
    id: '4',
    name: 'Michael Torres',
    location: 'Spring Hill',
    rating: 5,
    date: '1 week ago',
    service: 'Storm Damage Recovery',
    text: 'When the storm tore through our roof, water was pouring in. They arrived in under an hour, immediately stopped further damage, and had everything dried and repaired within a week. Absolutely professional and caring team.',
    verified: true,
    responseTime: '55 minutes',
    damageType: 'Storm Damage'
  },
  {
    id: '5',
    name: 'Amanda Richards',
    location: 'West End',
    rating: 5,
    date: '5 days ago',
    service: 'Sewage Cleanup',
    text: 'Dealing with sewage backup was our worst nightmare. The team handled this horrible situation with professionalism and compassion. They sanitized everything, replaced damaged materials, and made our home safe again. Can\'t thank them enough.',
    verified: true,
    responseTime: '40 minutes',
    damageType: 'Sewage Backup'
  }
];

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Brisbane Office Tower Flood Recovery',
    client: 'Corporate Plaza Management',
    challenge: '3 floors of commercial office space flooded during severe storms, affecting 50+ businesses',
    solution: 'Deployed 4 teams simultaneously, installed 30+ industrial dehumidifiers, coordinated with multiple insurance companies',
    result: 'All businesses operational within 5 days, zero mould growth, 100% insurance coverage achieved',
    metrics: {
      responseTime: '30 min',
      completionTime: '5 days',
      areaCovered: '15,000 sq ft',
      satisfaction: '100%'
    },
    images: {
      before: '/images/optimized/damage/3D Water Damage to a Home.png',
      after: '/images/optimized/damage/Cat 1 - Water Damage Restoration.png'
    }
  },
  {
    id: '2',
    title: 'Heritage Home Fire Restoration',
    client: 'Private Residence, New Farm',
    challenge: 'Historic 1920s Queenslander severely damaged by electrical fire, irreplaceable architectural features at risk',
    solution: 'Specialized restoration techniques, careful smoke damage removal, preservation of original features',
    result: 'Complete restoration maintaining historical integrity, all original features preserved, family moved back in 6 weeks',
    metrics: {
      responseTime: '25 min',
      completionTime: '6 weeks',
      areaCovered: '3,500 sq ft',
      satisfaction: '100%'
    },
    images: {
      before: '/images/optimized/damage/3D Kitchen Fire.png',
      after: '/images/optimized/damage/3D image of a house fire.png'
    }
  }
];

export default function TestimonialsCarousel() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'testimonials' | 'case-studies'>('testimonials');

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (viewMode === 'testimonials') {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveCaseStudy((prev) => (prev + 1) % caseStudies.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full text-sm mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            REAL RESULTS, REAL PEOPLE
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Success Stories & Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don\'t just take our word for it. See what Brisbane property owners say about our restoration services.
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            onClick={() => setViewMode('testimonials')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'testimonials'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Customer Reviews
          </motion.button>
          <motion.button
            onClick={() => setViewMode('case-studies')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              viewMode === 'case-studies'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Case Studies
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'testimonials' ? (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative"
            >
              {/* Testimonial Card */}
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-6 left-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Verified Badge */}
                    {testimonials[activeTestimonial].verified && (
                      <div className="absolute top-8 right-8 flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified Customer
                      </div>
                    )}

                    {/* Content */}
                    <div className="mt-8">
                      <div className="flex items-center mb-4">
                        {renderStars(testimonials[activeTestimonial].rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {testimonials[activeTestimonial].date}
                        </span>
                      </div>

                      <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonials[activeTestimonial].text}"
                      </blockquote>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900 text-lg">
                            {testimonials[activeTestimonial].name}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {testimonials[activeTestimonial].location}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500">Service</div>
                          <div className="font-semibold text-gray-900">
                            {testimonials[activeTestimonial].service}
                          </div>
                        </div>
                      </div>

                      {/* Service Metrics */}
                      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">Response Time</div>
                            <div className="font-semibold text-gray-900">
                              {testimonials[activeTestimonial].responseTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">Damage Type</div>
                            <div className="font-semibold text-gray-900">
                              {testimonials[activeTestimonial].damageType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTestimonial(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`transition-all ${
                        index === activeTestimonial
                          ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full'
                          : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative"
            >
              {/* Case Study Card */}
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCaseStudy}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    <div className="grid lg:grid-cols-2">
                      {/* Content */}
                      <div className="p-8 md:p-12">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                          CASE STUDY
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {caseStudies[activeCaseStudy].title}
                        </h3>

                        <div className="mb-6">
                          <span className="text-sm text-gray-500">Client:</span>
                          <p className="font-semibold text-gray-900">
                            {caseStudies[activeCaseStudy].client}
                          </p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                            <p className="text-gray-600">{caseStudies[activeCaseStudy].challenge}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                            <p className="text-gray-600">{caseStudies[activeCaseStudy].solution}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Result:</h4>
                            <p className="text-gray-600">{caseStudies[activeCaseStudy].result}</p>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl">
                          <div>
                            <div className="text-3xl font-bold text-blue-600">
                              {caseStudies[activeCaseStudy].metrics.responseTime}
                            </div>
                            <div className="text-sm text-gray-600">Response Time</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-green-600">
                              {caseStudies[activeCaseStudy].metrics.completionTime}
                            </div>
                            <div className="text-sm text-gray-600">Completion</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-purple-600">
                              {caseStudies[activeCaseStudy].metrics.areaCovered}
                            </div>
                            <div className="text-sm text-gray-600">Area Covered</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-orange-600">
                              {caseStudies[activeCaseStudy].metrics.satisfaction}
                            </div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                          </div>
                        </div>
                      </div>

                      {/* Images */}
                      <div className="relative h-full min-h-[400px] bg-gray-100">
                        {caseStudies[activeCaseStudy].images.before && (
                          <div className="grid grid-rows-2 h-full">
                            <div className="relative">
                              <Image
                                src={caseStudies[activeCaseStudy].images.before}
                                alt="Before"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                BEFORE
                              </div>
                            </div>
                            {caseStudies[activeCaseStudy].images.after && (
                              <div className="relative">
                                <Image
                                  src={caseStudies[activeCaseStudy].images.after}
                                  alt="After"
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                  AFTER
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {caseStudies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCaseStudy(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`transition-all ${
                        index === activeCaseStudy
                          ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full'
                          : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of satisfied customers across Brisbane, Ipswich, and Logan
          </p>
          <motion.a
            href="tel:1300309361"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Get Your Free Quote Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}