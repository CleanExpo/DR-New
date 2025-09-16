'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ExecutiveLeadership = () => {
  const executives = [
    {
      name: 'Michael Harrison',
      title: 'Chief Executive Officer',
      tenure: '20+ Years Industry Leadership',
      bio: 'Former Australian Defence Force engineer, Michael brings military precision and unwavering commitment to every restoration project. His vision transformed local emergency response into Australia\'s premium disaster recovery service.',
      achievements: [
        'Pioneered 1-hour response guarantee',
        'Led 5,000+ major restoration projects',
        'Queensland Business Leader of the Year 2023'
      ],
      image: '/images/team/ceo.jpg',
      linkedin: '#',
      quote: 'Excellence isn\'t just our standard—it\'s our minimum requirement.'
    },
    {
      name: 'Dr. Sarah Chen',
      title: 'Chief Technology Officer',
      tenure: '15+ Years Innovation Leadership',
      bio: 'PhD in Environmental Engineering from MIT. Sarah revolutionized restoration with AI-powered damage assessment and IoT monitoring systems, setting new industry benchmarks for precision and efficiency.',
      achievements: [
        'Developed proprietary AI assessment technology',
        'Published 30+ restoration science papers',
        'Tech Innovation Award 2024'
      ],
      image: '/images/team/cto.jpg',
      linkedin: '#',
      quote: 'Technology amplifies our ability to restore hope.'
    },
    {
      name: 'James Mitchell',
      title: 'Chief Operations Officer',
      tenure: '18+ Years Operational Excellence',
      bio: 'Former emergency services commander with expertise in crisis management. James ensures our teams deliver flawless execution under the most challenging conditions, maintaining our 100% satisfaction guarantee.',
      achievements: [
        'Managed 10,000+ emergency responses',
        'Zero safety incidents in 5 years',
        'Operational Excellence Award 2023'
      ],
      image: '/images/team/coo.jpg',
      linkedin: '#',
      quote: 'Every second counts when disaster strikes.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span className="text-blue-700 font-semibold">Leadership Excellence</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Visionary Leaders.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Unmatched Expertise.
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our executive team combines 50+ years of disaster recovery expertise with military precision,
            scientific innovation, and unwavering dedication to service excellence.
          </p>
        </motion.div>

        {/* Executive Cards */}
        <div className="space-y-20">
          {executives.map((exec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Executive Image */}
              <div className="lg:w-1/3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                  <div className="relative bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="aspect-[4/5] bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold">{exec.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* LinkedIn Badge */}
                  <a href={exec.linkedin} className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Executive Details */}
              <div className="lg:w-2/3">
                <div className="space-y-6">
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{exec.name}</h3>
                    <p className="text-xl text-blue-600 font-semibold mb-1">{exec.title}</p>
                    <p className="text-gray-500">{exec.tenure}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-blue-600 pl-6 py-2">
                    <p className="text-xl text-gray-700 italic font-medium">"{exec.quote}"</p>
                  </blockquote>

                  {/* Bio */}
                  <p className="text-gray-600 leading-relaxed text-lg">{exec.bio}</p>

                  {/* Achievements */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z"/>
                      </svg>
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exec.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Board Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Advisory Board</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Hon. Peter Richards', role: 'Former QLD Emergency Services Minister', expertise: 'Government Relations' },
              { name: 'Prof. Amanda Williams', role: 'Climate Science Expert, UQ', expertise: 'Environmental Impact' },
              { name: 'David Thompson OAM', role: 'Insurance Industry Veteran', expertise: 'Claims & Compliance' }
            ].map((advisor, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3" />
                <h4 className="font-bold text-gray-900">{advisor.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{advisor.role}</p>
                <p className="text-xs text-blue-600 font-semibold">{advisor.expertise}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutiveLeadership;