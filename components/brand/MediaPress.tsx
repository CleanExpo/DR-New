'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const MediaPress = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const mediaFeatures = [
    {
      outlet: 'The Australian',
      headline: 'Setting New Standards in Disaster Recovery',
      date: 'November 2024',
      category: 'national',
      type: 'Feature Article',
      excerpt: 'Disaster Recovery Brisbane\'s innovative approach combines military precision with cutting-edge technology...',
      logo: '🗞️'
    },
    {
      outlet: 'Channel 7 News',
      headline: 'Brisbane\'s Heroes: 24/7 Disaster Response Team',
      date: 'October 2024',
      category: 'tv',
      type: 'TV Interview',
      excerpt: 'Exclusive coverage of our emergency response during the recent Brisbane floods...',
      logo: '📺'
    },
    {
      outlet: 'ABC Radio Brisbane',
      headline: 'CEO Discusses Climate Resilience Strategies',
      date: 'September 2024',
      category: 'radio',
      type: 'Executive Interview',
      excerpt: 'Michael Harrison shares insights on preparing Queensland homes for extreme weather...',
      logo: '📻'
    },
    {
      outlet: 'Courier Mail',
      headline: 'Tech Revolution in Disaster Recovery',
      date: 'August 2024',
      category: 'local',
      type: 'Technology Feature',
      excerpt: 'How AI and IoT are transforming emergency response times and restoration accuracy...',
      logo: '📰'
    },
    {
      outlet: 'Financial Review',
      headline: 'Insurance Industry\'s Trusted Partner',
      date: 'July 2024',
      category: 'business',
      type: 'Industry Analysis',
      excerpt: 'Why major insurers rely on Disaster Recovery Brisbane for complex claims...',
      logo: '💼'
    },
    {
      outlet: '60 Minutes',
      headline: 'Australia\'s Disaster Recovery Elite',
      date: 'June 2024',
      category: 'tv',
      type: 'Documentary Feature',
      excerpt: 'Behind the scenes with Australia\'s most advanced disaster recovery operation...',
      logo: '🎬'
    }
  ];

  const pressStats = [
    { number: '200+', label: 'Media Features' },
    { number: '50+', label: 'TV Appearances' },
    { number: '100+', label: 'Radio Interviews' },
    { number: '15M+', label: 'Media Reach' }
  ];

  const testimonialLogos = [
    'Channel 7', 'Channel 9', 'ABC News', 'The Australian',
    'Financial Review', 'Courier Mail', 'Guardian Australia', 'SBS News'
  ];

  const categories = [
    { id: 'all', label: 'All Coverage' },
    { id: 'national', label: 'National Media' },
    { id: 'tv', label: 'Television' },
    { id: 'radio', label: 'Radio' },
    { id: 'business', label: 'Business Press' }
  ];

  const filteredMedia = activeCategory === 'all'
    ? mediaFeatures
    : mediaFeatures.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-red-50 rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-red-700 font-semibold">As Featured In</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Trusted by Australia's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Leading Media Outlets
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Our expertise and innovation in disaster recovery consistently attracts attention from
            national media, positioning us as Australia's go-to authority on restoration excellence.
          </p>

          {/* Media Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pressStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-3xl font-bold text-red-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Logos Ticker */}
        <div className="mb-16 overflow-hidden bg-gray-100 rounded-2xl py-8">
          <div className="flex animate-scroll-x">
            {[...testimonialLogos, ...testimonialLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <div className="text-gray-500 font-bold text-xl whitespace-nowrap">{logo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredMedia.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="p-8">
                {/* Outlet Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{feature.logo}</span>
                    <div>
                      <div className="font-bold text-gray-900">{feature.outlet}</div>
                      <div className="text-xs text-gray-500">{feature.type}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{feature.date}</span>
                </div>

                {/* Headline */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.headline}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">{feature.excerpt}</p>

                {/* Read More */}
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Read Full Story</span>
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Press Kit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Media & Press Inquiries</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            For media inquiries, interviews, or to access our digital press kit with high-resolution
            images and company information, please contact our media relations team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Download Press Kit
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
              Media Contact: media@disasterrecovery.com.au
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </section>
  );
};

export default MediaPress;