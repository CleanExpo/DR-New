'use client';

import { motion } from 'framer-motion';

const InnovationLeadership = () => {
  const innovations = [
    {
      title: 'AI-Powered Damage Assessment',
      category: 'Artificial Intelligence',
      description: 'Revolutionary AI system that analyzes damage in real-time, predicting restoration timelines with 98% accuracy.',
      impact: '75% faster assessment',
      icon: '🤖',
      features: [
        'Computer vision damage analysis',
        'Predictive restoration modeling',
        'Automated cost estimation',
        'Real-time progress tracking'
      ],
      status: 'Active Deployment'
    },
    {
      title: 'IoT Smart Monitoring Network',
      category: 'Internet of Things',
      description: 'Connected sensors monitor moisture, temperature, and air quality 24/7 during restoration.',
      impact: '50% reduction in secondary damage',
      icon: '📡',
      features: [
        '24/7 environmental monitoring',
        'Predictive mold prevention',
        'Remote management capability',
        'Real-time client dashboards'
      ],
      status: 'Fully Integrated'
    },
    {
      title: 'Drone Rapid Response Fleet',
      category: 'Aerial Technology',
      description: 'Military-grade drones provide instant aerial assessment of disaster zones.',
      impact: '90% faster site surveys',
      icon: '🚁',
      features: [
        'Thermal imaging capability',
        '4K damage documentation',
        'Inaccessible area inspection',
        '3D property mapping'
      ],
      status: 'Operational'
    },
    {
      title: 'Quantum Drying Technology',
      category: 'Advanced Materials',
      description: 'Proprietary molecular drying system that removes moisture 3x faster than traditional methods.',
      impact: '72-hour complete drying',
      icon: '⚛️',
      features: [
        'Molecular-level moisture extraction',
        'Zero structural damage',
        'Energy-efficient operation',
        'Silent operation mode'
      ],
      status: 'Patent Pending'
    }
  ];

  const environmentalInitiatives = [
    {
      title: 'Carbon Neutral Operations',
      description: 'First disaster recovery service in Australia to achieve carbon neutrality.',
      metrics: { reduction: '100%', offset: '2,500 tonnes CO2', timeline: 'Achieved 2023' },
      icon: '🌱'
    },
    {
      title: 'Zero Waste Restoration',
      description: 'Revolutionary recycling and restoration program that diverts 95% of materials from landfill.',
      metrics: { recycled: '95%', saved: '500 tonnes/year', materials: '100% eco-friendly' },
      icon: '♻️'
    },
    {
      title: 'Electric Fleet Transition',
      description: 'Converting entire vehicle fleet to electric and hydrogen-powered vehicles.',
      metrics: { converted: '60%', target: '100% by 2025', savings: '200 tonnes CO2/year' },
      icon: '🔋'
    },
    {
      title: 'Green Building Certification',
      description: 'All restored properties meet or exceed green building standards.',
      metrics: { certified: '100%', rating: '6-Star Green', compliance: 'NABERS Energy' },
      icon: '🏢'
    }
  ];

  const researchProjects = [
    {
      name: 'Climate Resilience Initiative',
      partner: 'University of Queensland',
      focus: 'Developing next-gen materials for extreme weather resistance',
      investment: '$2.5M'
    },
    {
      name: 'Bioremediation Research',
      partner: 'CSIRO',
      focus: 'Natural mold and contamination elimination methods',
      investment: '$1.8M'
    },
    {
      name: 'Restoration Robotics Lab',
      partner: 'QUT',
      focus: 'Autonomous restoration robots for hazardous environments',
      investment: '$3.2M'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Innovation Header */}
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
            <span className="text-purple-700 font-semibold">Innovation & Technology</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Leading the Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Disaster Recovery Technology
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Investing millions in R&D to revolutionize restoration with AI, IoT, and sustainable technologies
            that set new industry standards globally.
          </p>
        </motion.div>

        {/* Innovation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-10" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-4xl mb-4 block">{innovation.icon}</span>
                    <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-3 py-1 mb-3">
                      <span className="text-sm font-medium text-purple-700">{innovation.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{innovation.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    innovation.status === 'Active Deployment' ? 'bg-green-100 text-green-700' :
                    innovation.status === 'Fully Integrated' ? 'bg-blue-100 text-blue-700' :
                    innovation.status === 'Operational' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {innovation.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{innovation.description}</p>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-500 mb-1">Performance Impact</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {innovation.impact}
                  </div>
                </div>

                <div className="space-y-2">
                  {innovation.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Environmental Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-50 rounded-full px-6 py-2 mb-6">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-green-700 font-semibold">Environmental Leadership</span>
            </div>

            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Sustainable Restoration Pioneer
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Setting the global standard for environmentally responsible disaster recovery
              with industry-first initiatives and measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {environmentalInitiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
              >
                <span className="text-4xl mb-4 block">{initiative.icon}</span>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{initiative.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>

                <div className="space-y-2 pt-4 border-t border-green-200">
                  {Object.entries(initiative.metrics).map(([key, value], idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="font-semibold text-green-700">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research & Development */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Research & Development Partnerships</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {researchProjects.map((project, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-bold mb-2">{project.name}</h4>
                <div className="text-indigo-200 text-sm mb-3">Partner: {project.partner}</div>
                <p className="text-white/80 text-sm mb-3">{project.focus}</p>
                <div className="text-amber-400 font-bold">{project.investment}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-8 py-4">
              <span className="text-3xl font-bold mr-3">$10M+</span>
              <span className="text-indigo-200">Annual R&D Investment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationLeadership;