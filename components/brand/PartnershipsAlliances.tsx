'use client';

import { motion } from 'framer-motion';

const PartnershipsAlliances = () => {
  const premiumPartners = [
    {
      category: 'Insurance Partners',
      description: 'Preferred restoration provider for Australia\'s leading insurers',
      partners: [
        { name: 'Allianz', level: 'Platinum', since: '2010' },
        { name: 'Suncorp', level: 'Platinum', since: '2008' },
        { name: 'QBE Insurance', level: 'Gold', since: '2012' },
        { name: 'RACQ', level: 'Platinum', since: '2005' },
        { name: 'IAG', level: 'Gold', since: '2015' },
        { name: 'Zurich', level: 'Silver', since: '2018' }
      ]
    },
    {
      category: 'Technology Partners',
      description: 'Leveraging world-class technology for superior restoration',
      partners: [
        { name: 'Microsoft Azure', level: 'AI & Cloud', tech: 'Damage Assessment AI' },
        { name: 'Honeywell', level: 'IoT Systems', tech: 'Smart Monitoring' },
        { name: 'FLIR Systems', level: 'Thermal Imaging', tech: 'Moisture Detection' },
        { name: 'DJI Enterprise', level: 'Drone Tech', tech: 'Aerial Assessment' },
        { name: 'Boston Dynamics', level: 'Robotics', tech: 'Hazard Zone Access' },
        { name: 'Tesla Energy', level: 'Power Systems', tech: 'Emergency Power' }
      ]
    },
    {
      category: 'Industry Affiliations',
      description: 'Leading member of prestigious industry bodies',
      partners: [
        { name: 'IICRC', role: 'Certified Firm', certification: 'Master Restorer' },
        { name: 'RIA Australia', role: 'Board Member', certification: 'Industry Leader' },
        { name: 'Property Council', role: 'Premium Member', certification: 'Commercial Expert' },
        { name: 'Master Builders QLD', role: 'Specialist Member', certification: 'Restoration Expert' },
        { name: 'AIBS', role: 'Accredited', certification: 'Building Standards' },
        { name: 'Environmental Institute', role: 'Certified Partner', certification: 'Eco-Restoration' }
      ]
    }
  ];

  const exclusivePrograms = [
    {
      title: 'Mercedes-Benz Fleet Partnership',
      description: 'Exclusive emergency response fleet partnership',
      benefits: ['24 premium response vehicles', 'Zero-emission targets by 2025', 'Advanced GPS tracking'],
      icon: '🚗'
    },
    {
      title: 'Westpac Private Wealth',
      description: 'Preferred provider for high-net-worth clients',
      benefits: ['Priority response guarantee', 'Concierge restoration service', 'Art & valuables specialists'],
      icon: '💎'
    },
    {
      title: 'Brisbane Airport Corporation',
      description: 'Official emergency response partner',
      benefits: ['Critical infrastructure protection', 'Rapid deployment team', '15-minute response time'],
      icon: '✈️'
    },
    {
      title: 'Queensland Health Partnership',
      description: 'Healthcare facility emergency response',
      benefits: ['Biohazard specialists', 'Medical-grade sanitization', 'Zero-downtime protocols'],
      icon: '🏥'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-purple-50 rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-purple-700 font-semibold">Strategic Alliances</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Partnered with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
              Industry Leaders
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our strategic partnerships with global technology leaders, premium insurers, and industry bodies
            ensure we deliver unmatched restoration excellence.
          </p>
        </motion.div>

        {/* Partner Categories */}
        {premiumPartners.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.2 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.category}</h3>
              <p className="text-gray-600 mb-8">{category.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="text-center">
                      <div className="h-12 flex items-center justify-center mb-2">
                        <div className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {partner.level || partner.role || partner.tech}
                      </div>
                      {partner.since && (
                        <div className="text-xs text-blue-600 font-semibold mt-1">
                          Since {partner.since}
                        </div>
                      )}
                      {partner.certification && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          {partner.certification}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Exclusive Programs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Exclusive Partnership Programs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exclusivePrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 hover:border-purple-400 transition-colors"
              >
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-4">{program.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h4>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">The Choice of Industry Leaders</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            When Australia's most prestigious organizations need disaster recovery excellence,
            they choose Disaster Recovery Brisbane. Join the elite circle of partners who demand nothing but the best.
          </p>
          <button className="bg-white text-blue-900 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipsAlliances;