'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const BrandStoryVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const brandValues = [
    {
      icon: '🛡️',
      title: 'Unwavering Integrity',
      description: 'Every decision guided by ethical excellence and transparent communication.'
    },
    {
      icon: '💡',
      title: 'Relentless Innovation',
      description: 'Pioneering tomorrow\'s restoration solutions with cutting-edge technology.'
    },
    {
      icon: '❤️',
      title: 'Compassionate Service',
      description: 'Understanding that we restore not just properties, but lives and livelihoods.'
    },
    {
      icon: '🌟',
      title: 'Excellence Standard',
      description: 'Accepting nothing less than perfection in every restoration project.'
    }
  ];

  const brandStory = {
    founded: '2004',
    milestone1: {
      year: '2011',
      event: 'Queensland Floods',
      impact: 'Restored 5,000+ homes in record time'
    },
    milestone2: {
      year: '2019',
      event: 'Bushfire Crisis',
      impact: 'Led national emergency response efforts'
    },
    milestone3: {
      year: '2022',
      event: 'Brisbane Floods',
      impact: 'Deployed 200+ technicians within hours'
    },
    vision: 'To be the beacon of hope when disaster strikes, transforming devastation into restoration with unmatched expertise and compassion.',
    mission: 'We don\'t just restore properties—we rebuild lives, revive businesses, and strengthen communities through world-class disaster recovery services.'
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-transparent to-purple-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-amber-400 font-semibold">Our Story</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Two Decades of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Restoring Hope
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to becoming Australia's most trusted name in disaster recovery,
            our journey is defined by unwavering commitment to excellence and the communities we serve.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-800 aspect-video">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/50 to-purple-900/50">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white rounded-full scale-110 animate-ping opacity-25" />
                <div className="relative bg-white rounded-full p-8 shadow-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-16 h-16 text-blue-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h3 className="text-2xl font-bold mb-2">The Disaster Recovery Brisbane Story</h3>
              <p className="text-gray-300">Watch our 20-year journey of excellence • 3 min</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Defining Moments</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600" />

            {/* Timeline Events */}
            <div className="space-y-12">
              {/* Founded */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div className="w-1/2 text-right pr-8">
                  <div className="bg-gray-800 rounded-2xl p-6 inline-block">
                    <div className="text-amber-400 font-bold text-2xl mb-2">{brandStory.founded}</div>
                    <div className="text-white font-semibold">Company Founded</div>
                    <div className="text-gray-400 text-sm mt-2">Brisbane headquarters established</div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-amber-400 rounded-full border-4 border-gray-900 relative z-10" />
                <div className="w-1/2" />
              </motion.div>

              {/* Milestone 1 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div className="w-1/2" />
                <div className="w-8 h-8 bg-amber-400 rounded-full border-4 border-gray-900 relative z-10" />
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-800 rounded-2xl p-6 inline-block">
                    <div className="text-amber-400 font-bold text-2xl mb-2">{brandStory.milestone1.year}</div>
                    <div className="text-white font-semibold">{brandStory.milestone1.event}</div>
                    <div className="text-gray-400 text-sm mt-2">{brandStory.milestone1.impact}</div>
                  </div>
                </div>
              </motion.div>

              {/* Milestone 2 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div className="w-1/2 text-right pr-8">
                  <div className="bg-gray-800 rounded-2xl p-6 inline-block">
                    <div className="text-amber-400 font-bold text-2xl mb-2">{brandStory.milestone2.year}</div>
                    <div className="text-white font-semibold">{brandStory.milestone2.event}</div>
                    <div className="text-gray-400 text-sm mt-2">{brandStory.milestone2.impact}</div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-amber-400 rounded-full border-4 border-gray-900 relative z-10" />
                <div className="w-1/2" />
              </motion.div>

              {/* Milestone 3 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div className="w-1/2" />
                <div className="w-8 h-8 bg-amber-400 rounded-full border-4 border-gray-900 relative z-10" />
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-800 rounded-2xl p-6 inline-block">
                    <div className="text-amber-400 font-bold text-2xl mb-2">{brandStory.milestone3.year}</div>
                    <div className="text-white font-semibold">{brandStory.milestone3.event}</div>
                    <div className="text-gray-400 text-sm mt-2">{brandStory.milestone3.impact}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-700/50">
            <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-4">Our Vision</div>
            <p className="text-xl text-white leading-relaxed">{brandStory.vision}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-700/50">
            <div className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-4">Our Mission</div>
            <p className="text-xl text-white leading-relaxed">{brandStory.mission}</p>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">Core Values That Drive Us</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStoryVideo;