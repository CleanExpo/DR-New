'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SocialProofAmplified = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [liveStats, setLiveStats] = useState({
    activeJobs: 47,
    satisfactionRate: 100,
    responseTime: 38
  });

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeJobs: prev.activeJobs + Math.floor(Math.random() * 3) - 1,
        satisfactionRate: 100,
        responseTime: 35 + Math.floor(Math.random() * 10)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const premiumTestimonials = [
    {
      client: 'Richard Thompson',
      title: 'CEO, Thompson Holdings',
      property: 'Waterfront Estate, New Farm',
      value: '$8.5M Property',
      story: 'When our heritage-listed waterfront estate flooded, we needed more than just restoration—we needed perfection. Disaster Recovery Brisbane\'s white-glove service exceeded every expectation. They coordinated with our art conservators, handled our vintage wine cellar with expertise, and restored our property to museum-quality standards.',
      rating: 5,
      image: '/images/testimonials/client1.jpg',
      verified: true,
      date: '2024',
      outcomes: ['100% restoration', 'Zero artwork damage', '21-day completion']
    },
    {
      client: 'Dr. Elizabeth Chen',
      title: 'Medical Practice Owner',
      property: 'Brisbane Medical Centre',
      value: '$12M Facility',
      story: 'Our medical facility required immediate restoration with zero compromise on sterility and compliance. The team\'s understanding of healthcare requirements was exceptional. They worked around our schedule, maintained all safety protocols, and had us operational in record time.',
      rating: 5,
      image: '/images/testimonials/client2.jpg',
      verified: true,
      date: '2024',
      outcomes: ['24hr emergency response', 'Full compliance maintained', 'Zero downtime']
    },
    {
      client: 'James & Sarah Mitchell',
      title: 'Property Investors',
      property: 'Portfolio of 12 Properties',
      value: '$25M Portfolio',
      story: 'Managing disaster recovery across multiple properties requires military precision. Disaster Recovery Brisbane handled our entire portfolio simultaneously during the 2024 floods. Their project management, communication, and results were simply world-class.',
      rating: 5,
      image: '/images/testimonials/client3.jpg',
      verified: true,
      date: '2024',
      outcomes: ['12 properties restored', 'Insurance maximized', '30% faster than quoted']
    }
  ];

  const caseStudies = [
    {
      title: 'Brisbane CBD Office Tower',
      category: 'Commercial',
      challenge: 'Category 5 water damage across 15 floors',
      solution: 'Deployed 50 technicians, implemented floor-by-floor restoration',
      result: 'Building operational in 14 days, saved $2M in business interruption',
      testimonial: 'Absolutely phenomenal response and execution.',
      stats: { floors: 15, days: 14, saved: '$2M' }
    },
    {
      title: 'Heritage Manor Restoration',
      category: 'Residential',
      challenge: 'Fire damage to 1920s heritage property',
      solution: 'Specialized heritage restoration with period-accurate materials',
      result: 'Perfect restoration maintaining historical integrity',
      testimonial: 'They saved our family\'s 100-year legacy.',
      stats: { age: '100 years', completion: '45 days', satisfaction: '100%' }
    },
    {
      title: 'Queensland Health Facility',
      category: 'Healthcare',
      challenge: 'Biohazard contamination requiring immediate response',
      solution: 'Deployed specialized biohazard team within 30 minutes',
      result: 'Facility decontaminated and operational within 24 hours',
      testimonial: 'Life-saving rapid response.',
      stats: { response: '30 min', operational: '24 hrs', compliance: '100%' }
    }
  ];

  const googleReviews = {
    rating: 4.9,
    totalReviews: 847,
    recentReviews: [
      { author: 'Michael H.', rating: 5, text: 'Exceptional service during our time of crisis.', time: '2 days ago' },
      { author: 'Jennifer L.', rating: 5, text: 'Professional, fast, and thorough. Highly recommend!', time: '1 week ago' },
      { author: 'David C.', rating: 5, text: 'Went above and beyond our expectations.', time: '2 weeks ago' }
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Performance Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Live Performance Dashboard</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2" />
                <span className="text-green-300 text-sm">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-green-300 text-sm mb-2">Active Restorations</div>
                <div className="text-4xl font-bold mb-1">{liveStats.activeJobs}</div>
                <div className="text-green-300 text-sm">Projects in progress</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-green-300 text-sm mb-2">Client Satisfaction</div>
                <div className="text-4xl font-bold mb-1">{liveStats.satisfactionRate}%</div>
                <div className="text-green-300 text-sm">Perfect rating maintained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-green-300 text-sm mb-2">Avg Response Time</div>
                <div className="text-4xl font-bold mb-1">{liveStats.responseTime} min</div>
                <div className="text-green-300 text-sm">Emergency response</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-50 rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-green-700 font-semibold">Client Success Stories</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Trusted by Australia's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
              Most Discerning Clients
            </span>
          </h2>
        </motion.div>

        {/* Premium Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {premiumTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${currentTestimonial === index ? 'block' : 'hidden'}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Testimonial Content */}
                  <div className="p-12 lg:p-16">
                    <div className="flex items-center mb-6">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      {testimonial.verified && (
                        <div className="ml-4 flex items-center bg-green-50 rounded-full px-3 py-1">
                          <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                          <span className="text-green-700 text-sm font-medium">Verified Client</span>
                        </div>
                      )}
                    </div>

                    <blockquote className="text-xl text-gray-700 leading-relaxed mb-6">
                      "{testimonial.story}"
                    </blockquote>

                    <div className="border-t pt-6">
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-gray-900">{testimonial.client}</div>
                        <div className="text-gray-600">{testimonial.title}</div>
                        <div className="text-blue-600 font-semibold">{testimonial.property}</div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {testimonial.outcomes.map((outcome, idx) => (
                          <span key={idx} className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Property Image */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-12">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-400 mb-4">{testimonial.value}</div>
                      <div className="text-xl text-gray-600">Property Value</div>
                      <div className="mt-8 text-gray-500">{testimonial.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Controls */}
            <div className="flex justify-center p-4 bg-gray-50">
              {premiumTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Case Studies</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">{study.category}</div>
                  <h4 className="text-xl font-bold">{study.title}</h4>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Challenge</div>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Solution</div>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Result</div>
                      <p className="text-gray-900 font-semibold">{study.result}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-gray-600 italic mb-4">"{study.testimonial}"</p>

                    <div className="flex justify-between text-center">
                      {Object.entries(study.stats).map(([key, value], idx) => (
                        <div key={idx}>
                          <div className="text-xl font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-gray-500">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3">
                  <button className="text-blue-600 font-semibold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                    View Full Case Study
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Google Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="text-4xl font-bold mr-4">G</div>
              <div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-2">{googleReviews.rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-gray-600">{googleReviews.totalReviews} Google Reviews</div>
              </div>
            </div>
            <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {googleReviews.recentReviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="font-semibold text-gray-900 mr-2">{review.author}</div>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.text}</p>
                <p className="text-gray-400 text-xs">{review.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofAmplified;