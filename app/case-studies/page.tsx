'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Shield, AlertCircle, Building, Droplets, Users, Flame, Wind, ChevronRight, Calendar, Award, Timer } from 'lucide-react';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      slug: 'gold-coast-sewage-emergency',
      title: 'Gold Coast High-Rise Sewage Emergency',
      category: 'Category 3 Water Damage',
      categoryColor: 'bg-red-600',
      location: 'Gold Coast, QLD',
      timeline: '10 Days',
      image: '/images/case-studies/gold-coast-sewage-emergency.png',
      description: 'Friday 4PM emergency response to sewage backup affecting 3 units in luxury high-rise. 26-hour weekend mobilization with complete restoration.',
      highlights: [
        '3-hour response time',
        '26 hours weekend work',
        '4 areas restored',
        'Zero health incidents'
      ],
      tags: ['Sewage Cleanup', 'High-Rise', 'Emergency Response', 'Weekend Work'],
      featured: true,
      severity: 'critical',
      result: '$450K insurance claim approved',
      stats: {
        responseTime: '3 hours',
        areasAffected: '3 units + foyer',
        totalHours: '120+ hours',
        tradesCoordinated: '5 teams'
      }
    }
  ];

  // Additional case studies for future expansion
  const upcomingCaseStudies = [
    { type: 'Water Damage', count: 150, icon: Droplets },
    { type: 'Fire Restoration', count: 89, icon: Flame },
    { type: 'Storm Damage', count: 67, icon: Wind },
    { type: 'Commercial', count: 45, icon: Building }
  ];

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Disaster Recovery Case Studies | National Restoration Projects',
            description: 'Real-world emergency restoration projects showcasing our rapid response and professional expertise across Australia',
            url: 'https://disaster-recovery-seven.vercel.app/case-studies',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: caseStudies.length,
              itemListElement: caseStudies.map((study, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Article',
                  name: study.title,
                  description: study.description,
                  url: `https://disaster-recovery-seven.vercel.app/case-studies/${study.slug}`
                }
              }))
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url(\'/images/grid-pattern.svg\')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-600/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Award className="w-5 h-5 mr-2" />
              <span className="font-semibold">PROVEN RESULTS ACROSS AUSTRALIA</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Real Emergency
              <span className="block text-blue-400">Response Stories</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12">
              From Friday afternoon sewage emergencies to 80-floor high-rise disasters,
              see how we deliver when it matters most
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-300">Emergency Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">3 Hours</div>
                <div className="text-sm text-gray-300">Average Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">1000+</div>
                <div className="text-sm text-gray-300">Projects Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-sm text-gray-300">Insurance Approved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
              <AlertCircle className="w-5 h-5 mr-2 animate-pulse" />
              <span className="font-semibold">FEATURED EMERGENCY RESPONSE</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Critical Response</h2>
            <p className="text-xl text-gray-600">See how we handle the most challenging situations</p>
          </div>

          {caseStudies.filter(study => study.featured).map((study) => (
            <div key={study.slug} className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-red-600 to-red-800">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex items-center justify-center p-12">
                    <div className="text-center text-white">
                      <AlertCircle className="w-24 h-24 mx-auto mb-6 animate-pulse" />
                      <h3 className="text-3xl font-bold mb-2">Category 3</h3>
                      <p className="text-xl">Black Water Emergency</p>
                    </div>
                  </div>
                  <div className={`absolute top-4 left-4 ${study.categoryColor} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                    {study.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {study.title}
                    </h3>

                    <p className="text-lg text-gray-700 mb-6">
                      {study.description}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600">
                          <Timer className="w-5 h-5 mr-2 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-500">Response</div>
                            <div className="font-semibold">{study.stats.responseTime}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-2 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-semibold">{study.location}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600">
                          <Building className="w-5 h-5 mr-2 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-500">Affected</div>
                            <div className="font-semibold">{study.stats.areasAffected}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-2 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-500">Timeline</div>
                            <div className="font-semibold">{study.timeline}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {study.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-green-900 font-semibold">Final Result:</span>
                      <span className="text-green-700 font-bold text-lg">{study.result}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    View Full Case Study
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expertise Across All Disaster Types
            </h2>
            <p className="text-xl text-gray-600">
              From single rooms to 80-floor towers, PNG to offshore oil rigs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingCaseStudies.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.type}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{category.count}+</p>
                  <p className="text-sm text-gray-600">Successful Projects</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Our Response Matters */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Rapid Response Matters
            </h2>
            <p className="text-xl text-gray-600">
              Every hour counts in disaster recovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-red-100 rounded-lg p-3 inline-block mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">First 24 Hours</h3>
              <p className="text-gray-600">
                Critical window for preventing secondary damage. Our 3-hour response time
                saves properties from escalating damage and costs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-blue-100 rounded-lg p-3 inline-block mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health & Safety</h3>
              <p className="text-gray-600">
                Category 3 water contains dangerous pathogens. Immediate professional
                intervention prevents serious health risks.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-green-100 rounded-lg p-3 inline-block mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance Success</h3>
              <p className="text-gray-600">
                Proper documentation and rapid response ensure maximum insurance
                settlements and smooth claim processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* National Coverage Map Placeholder */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              National Emergency Coverage
            </h2>
            <p className="text-xl text-gray-300">
              24/7 response across all Australian states and territories
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { state: 'Queensland', cities: 'Brisbane, Gold Coast, Cairns, Townsville' },
              { state: 'New South Wales', cities: 'Sydney, Newcastle, Wollongong, Byron Bay' },
              { state: 'Victoria', cities: 'Melbourne, Geelong, Ballarat, Bendigo' },
              { state: 'Western Australia', cities: 'Perth, Fremantle, Bunbury, Broome' }
            ].map((location, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{location.state}</h3>
                <p className="text-gray-400 text-sm">{location.cities}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">
            Facing an Emergency?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait. We respond within 3 hours, 24/7, including weekends.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Emergency Help
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}