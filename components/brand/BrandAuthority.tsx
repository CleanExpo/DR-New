'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const BrandAuthority = () => {
  const stats = [
    { value: '20+', label: 'Years of Excellence', suffix: 'Since 2004' },
    { value: '50,000+', label: 'Properties Restored', suffix: 'Across Australia' },
    { value: '100%', label: 'Insurance Approved', suffix: 'All Major Insurers' },
    { value: '1 Hour', label: 'Response Guarantee', suffix: '24/7/365' }
  ];

  const awards = [
    {
      name: 'Australian Business Excellence Award',
      year: '2024',
      category: 'Emergency Services Innovation'
    },
    {
      name: 'Queensland Premier\'s Award',
      year: '2023',
      category: 'Disaster Response Leadership'
    },
    {
      name: 'IICRC Global Excellence',
      year: '2024',
      category: 'Restoration Services'
    },
    {
      name: 'Environmental Leadership Award',
      year: '2023',
      category: 'Sustainable Restoration Practices'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 rounded-full px-6 py-3 mb-6">
            <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <span className="text-amber-900 font-semibold">Established 2004 • 20 Years of Excellence</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Australia's Most Trusted
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Disaster Recovery Authority
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Two decades of unwavering commitment to excellence. When Australia's most prestigious properties
            face their darkest hour, they trust only one name: Disaster Recovery Brisbane.
          </p>
        </motion.div>

        {/* Stats Grid - Premium Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.suffix}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-12 mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">Industry Recognition & Excellence</h3>
            <p className="text-blue-100 text-lg">Consistently recognized as Australia's premier restoration service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z"/>
                  </svg>
                </div>
                <h4 className="text-white font-bold text-center mb-2">{award.name}</h4>
                <p className="text-blue-200 text-sm text-center mb-1">{award.category}</p>
                <p className="text-amber-400 font-bold text-center">{award.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Seals */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Certified Excellence & Compliance</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['IICRC Certified', 'ISO 9001:2015', 'AS/NZS 4801', 'Environmental ISO 14001', 'OH&S Certified'].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg px-6 py-4 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-300"
              >
                <span className="text-gray-700 font-semibold">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandAuthority;