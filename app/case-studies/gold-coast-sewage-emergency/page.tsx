'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, AlertTriangle, Shield, CheckCircle, Users, Calendar, Droplets, Building, Phone, ChevronRight, Timer, Activity, Award, MapPin, AlertCircle, Wrench } from 'lucide-react';

export default function GoldCoastSewageEmergency() {
  const [activeTimelineDay, setActiveTimelineDay] = useState(0);

  const timelineEvents = [
    { day: 0, title: 'Friday 4PM', description: 'Emergency call received - sewage backup in high-rise', status: 'alert' },
    { day: 0, title: 'Friday 7PM', description: '3-hour planning session with building management', status: 'planning' },
    { day: 1, title: 'Saturday', description: '14 hours on-site - flooring and contaminated material removal', status: 'active' },
    { day: 2, title: 'Sunday', description: '12 hours on-site - decontamination and drying setup', status: 'active' },
    { day: 3, title: 'Monday-Tuesday', description: 'Continuous drying and antimicrobial treatment', status: 'progress' },
    { day: 5, title: 'Wednesday', description: 'Moisture testing and plasterer coordination', status: 'progress' },
    { day: 7, title: 'Friday', description: 'Painting and carpenter work begins', status: 'progress' },
    { day: 9, title: 'Tuesday', description: 'Flooring installation and final cleaning', status: 'finishing' },
    { day: 10, title: 'Wednesday', description: 'Final inspection and handover - fully restored', status: 'complete' }
  ];

  const metrics = [
    { label: 'Response Time', value: '3 Hours', description: 'From call to planning session' },
    { label: 'Weekend Hours', value: '26 Hours', description: 'Saturday & Sunday combined' },
    { label: 'Areas Restored', value: '4 Zones', description: '3 units + common foyer' },
    { label: 'Total Timeline', value: '10 Days', description: 'Complete restoration' },
    { label: 'Trades Coordinated', value: '5 Teams', description: 'Seamless integration' },
    { label: 'Disruption Level', value: 'Minimal', description: 'Other residents unaware' }
  ];

  const processSteps = [
    {
      phase: 'Immediate Response',
      icon: <AlertTriangle className="w-6 h-6" />,
      tasks: [
        'Emergency assessment within 3 hours',
        'Building management consultation',
        'Resident safety protocols initiated',
        'Containment barriers established'
      ]
    },
    {
      phase: 'Extraction & Removal',
      icon: <Droplets className="w-6 h-6" />,
      tasks: [
        'Sewage extraction using specialized equipment',
        'Contaminated flooring removal and disposal',
        'Affected skirting and plasterboard removal',
        'Biohazard waste management protocols'
      ]
    },
    {
      phase: 'Decontamination',
      icon: <Shield className="w-6 h-6" />,
      tasks: [
        'IICRC S500 standard procedures',
        'Hospital-grade antimicrobial application',
        'ATP testing for verification',
        'Air scrubbing and negative air pressure'
      ]
    },
    {
      phase: 'Restoration',
      icon: <Wrench className="w-6 h-6" />,
      tasks: [
        'Structural drying to target moisture levels',
        'Multi-trade coordination and scheduling',
        'Quality control at each stage',
        'Final clearance testing and certification'
      ]
    }
  ];

  return (
    <>
      {/* JSON-LD Schema for Case Study */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Gold Coast High-Rise Sewage Emergency: Category 3 Water Damage Case Study',
            description: 'Professional response to Friday 4PM sewage backup affecting 3 units in Gold Coast high-rise. 26-hour weekend response, 10-day complete restoration.',
            image: 'https://disaster-recovery-seven.vercel.app/images/case-studies/gold-coast-sewage-emergency.png',
            datePublished: new Date().toISOString(),
            author: {
              '@type': 'Organization',
              name: 'National Restoration Projects',
              url: 'https://disaster-recovery-seven.vercel.app'
            },
            publisher: {
              '@type': 'Organization',
              name: 'National Restoration Projects',
              logo: {
                '@type': 'ImageObject',
                url: 'https://disaster-recovery-seven.vercel.app/logo.png'
              }
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Category 3 water damage?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Category 3 water damage, also known as black water, contains dangerous pathogens and toxins from sewage or other contaminated sources requiring specialized restoration procedures.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How quickly should Category 3 water damage be addressed?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Category 3 water damage requires immediate response within hours due to serious health risks. Our team responded within 3 hours of the Friday 4PM emergency call.'
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/images/case-studies/gold-coast-sewage-emergency.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-red-600/90 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 mr-2 animate-pulse" />
            <span className="font-semibold">CATEGORY 3 EMERGENCY RESPONSE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Friday 4PM
            <span className="block text-3xl md:text-5xl text-red-500 mt-2">Sewage Emergency</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Gold Coast high-rise blackwater disaster. 3 units flooded with raw sewage.
            26-hour weekend response. 10-day complete restoration.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-red-500">3 Hours</div>
              <div className="text-sm text-gray-300">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-red-500">26 Hours</div>
              <div className="text-sm text-gray-300">Weekend Work</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-red-500">4 Areas</div>
              <div className="text-sm text-gray-300">Fully Restored</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
              <div className="text-3xl font-bold text-red-500">10 Days</div>
              <div className="text-sm text-gray-300">Total Timeline</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Alert Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-6 h-6" />
            <p className="text-lg font-semibold">IICRC Certified Category 3 Water Damage Restoration Specialists</p>
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Challenge: <span className="text-red-600">Friday Afternoon Crisis</span>
              </h2>

              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  At 4PM on a Friday afternoon, when most businesses are winding down for the weekend,
                  we received an emergency call that would test every aspect of our rapid response capabilities.
                </p>

                <p>
                  A major sewage line had catastrophically failed in a prestigious Gold Coast high-rise,
                  flooding three residential units and the common area foyer with Category 3 black water -
                  the most dangerous classification of water damage containing raw sewage and harmful pathogens.
                </p>

                <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6">
                  <h3 className="font-bold text-red-900 mb-2">Critical Factors:</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Multiple units with active sewage contamination</li>
                    <li>• Health risks to residents and building staff</li>
                    <li>• Weekend timing requiring immediate mobilization</li>
                    <li>• Building reputation and resident relations at stake</li>
                    <li>• Complex multi-unit coordination required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/case-studies/gold-coast-sewage-emergency.png"
                  alt="Category 3 blackwater damage in Gold Coast high-rise showing sewage contamination"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white rounded-lg p-4 shadow-xl">
                <div className="text-2xl font-bold">Category 3</div>
                <div className="text-sm">Black Water Emergency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              10-Day Restoration Timeline
            </h2>
            <p className="text-xl text-gray-600">From emergency response to complete restoration</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

              {/* Timeline Events */}
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                      event.status === 'alert' ? 'bg-red-600 border-red-600' :
                      event.status === 'planning' ? 'bg-orange-500 border-orange-500' :
                      event.status === 'active' ? 'bg-blue-600 border-blue-600' :
                      event.status === 'progress' ? 'bg-yellow-500 border-yellow-500' :
                      event.status === 'finishing' ? 'bg-purple-600 border-purple-600' :
                      'bg-green-600 border-green-600'
                    }`} />

                    <div className="ml-16 flex-1">
                      <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.status === 'alert' ? 'bg-red-100 text-red-800' :
                            event.status === 'planning' ? 'bg-orange-100 text-orange-800' :
                            event.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'progress' ? 'bg-yellow-100 text-yellow-800' :
                            event.status === 'finishing' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Day {event.day}
                          </span>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Response Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Response: <span className="text-red-600">Weekend Warriors</span>
            </h2>
            <p className="text-xl text-gray-600">26 hours of intensive work over Saturday and Sunday</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Saturday: 14 Hours</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete sewage extraction from all affected areas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Removal and disposal of contaminated flooring materials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Skirting board removal in all affected zones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Initial antimicrobial treatment application</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Containment barrier maintenance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Sunday: 12 Hours</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Plasterboard base cutting and removal (flood cuts)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Deep decontamination of all surfaces</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Installation of 18 drying units and dehumidifiers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Air scrubber setup for pathogen control</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Initial moisture mapping and documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              The Process: IICRC S500 Standard Protocols
            </h2>
            <p className="text-xl text-gray-300">Industry-leading Category 3 water damage restoration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-red-600 rounded-lg p-3 mr-3">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Phase {index + 1}</div>
                    <h3 className="font-bold text-lg">{step.phase}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {step.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-gray-300 flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Project Metrics
            </h2>
            <p className="text-xl text-gray-600">Measurable results and professional excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-red-600 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category 3 Education Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Understanding Category 3 Water Damage
            </h2>
            <p className="text-xl text-gray-600">Critical information about black water contamination</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is Category 3 Water?</h3>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-gray-700 mb-4">
                  Category 3 water, commonly known as "black water," is the most severe classification
                  of water damage. It contains dangerous pathogens, bacteria, viruses, and other
                  microorganisms that pose serious health risks.
                </p>

                <h4 className="font-bold text-gray-900 mb-3">Common Sources:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <span>Sewage backups and toilet overflows</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <span>Flooding from rivers, streams, or seawater</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <span>Standing water that has begun growing bacteria</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <span>Water from beyond the toilet trap</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Health Risks & Safety Protocols</h3>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-4">
                  <p className="text-red-900 font-semibold">
                    ⚠️ EXTREME HEALTH HAZARD: Direct contact with Category 3 water can cause
                    severe illness or death. Professional remediation is mandatory.
                  </p>
                </div>

                <h4 className="font-bold text-gray-900 mb-3">Our Safety Measures:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>Full PPE including respirators and protective suits</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>IICRC S500 certified restoration procedures</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>Hospital-grade antimicrobial treatments</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>ATP testing for biological verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">IICRC S500 Restoration Standards</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Containment</h4>
                <p className="text-gray-700">
                  Physical barriers and negative air pressure prevent cross-contamination
                  to unaffected areas of the building.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Removal</h4>
                <p className="text-gray-700">
                  All porous materials exposed to Category 3 water must be removed and
                  properly disposed of as biohazard waste.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Decontamination</h4>
                <p className="text-gray-700">
                  Multiple rounds of antimicrobial treatment with verification testing
                  ensure complete pathogen elimination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Rise Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              High-Rise Specific Challenges
            </h2>
            <p className="text-xl text-gray-600">Complex logistics requiring expert coordination</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Building className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Unit Contamination</h3>
              <p className="text-gray-700 mb-3">
                Sewage travels through walls, floors, and common areas, requiring comprehensive
                assessment of all potentially affected units.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Vertical and horizontal migration paths</li>
                <li>• Hidden contamination in wall cavities</li>
                <li>• HVAC system cross-contamination risks</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resident Management</h3>
              <p className="text-gray-700 mb-3">
                Discrete operations to maintain building reputation while ensuring resident
                safety and minimal disruption.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• After-hours work scheduling</li>
                <li>• Odor control and containment</li>
                <li>• Clear communication protocols</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Wrench className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Access & Logistics</h3>
              <p className="text-gray-700 mb-3">
                Equipment transport, waste removal, and material delivery in high-rise
                environments require specialized planning.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Elevator protection and scheduling</li>
                <li>• Equipment staging areas</li>
                <li>• Biohazard waste disposal routes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coordination Excellence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Multi-Trade Coordination Excellence
            </h2>
            <p className="text-xl text-gray-600">Seamless integration of 5 specialized trade teams</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { trade: 'Restoration Team', tasks: ['Extraction', 'Drying', 'Decontamination'] },
                { trade: 'Plasterers', tasks: ['Wall repairs', 'Ceiling restoration', 'Smoothing'] },
                { trade: 'Painters', tasks: ['Primer application', 'Color matching', 'Final coating'] },
                { trade: 'Carpenters', tasks: ['Skirting boards', 'Door frames', 'Structural repairs'] },
                { trade: 'Flooring Specialists', tasks: ['Subfloor prep', 'Material installation', 'Finishing'] }
              ].map((trade, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{trade.trade}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {trade.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>• {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                <span className="font-bold">Perfect Synchronization:</span> Each trade team integrated
                seamlessly, with zero delays or conflicts, completing the entire restoration in just 10 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Result: <span className="text-green-600">Complete Success</span>
            </h2>
            <p className="text-xl text-gray-600">10-day turnaround with minimal disruption</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Complete Restoration:</span>
                      <span className="text-gray-700"> All 3 units and common area fully restored to pre-loss condition</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Zero Health Incidents:</span>
                      <span className="text-gray-700"> No exposure or contamination of residents or workers</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Discrete Operations:</span>
                      <span className="text-gray-700"> Other residents remained unaware of the incident</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">On-Time Completion:</span>
                      <span className="text-gray-700"> Delivered exactly as promised in 10 days</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Value Delivered</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Award className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Prevented Extended Closure:</span>
                      <span className="text-gray-700"> Saved weeks of potential unit downtime</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Protected Property Values:</span>
                      <span className="text-gray-700"> Maintained building reputation and resident confidence</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Insurance Compliance:</span>
                      <span className="text-gray-700"> Full documentation for smooth claim processing</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <span className="font-semibold">Cost Optimization:</span>
                      <span className="text-gray-700"> Efficient process minimized overall restoration costs</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Context */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Gold Coast Emergency Response Coverage
            </h2>
            <p className="text-xl text-gray-300">Serving all high-rise and luxury properties across the region</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-bold mb-3">Surfers Paradise</h3>
              <p className="text-gray-300">
                Rapid response to beachfront high-rises and luxury apartments.
                Specialized equipment for buildings up to 80 floors.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-bold mb-3">Broadbeach</h3>
              <p className="text-gray-300">
                24/7 coverage for commercial and residential towers.
                Expert coordination with body corporate management.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-bold mb-3">Main Beach</h3>
              <p className="text-gray-300">
                Premium service for waterfront properties.
                Discrete operations for prestigious addresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">
            Facing a Category 3 Water Emergency?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait. Every minute counts with sewage contamination.
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Emergency Response Promise</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start">
                <Timer className="w-6 h-6 text-red-300 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">3-Hour Response</div>
                  <div className="text-sm text-red-100">Even on Friday afternoons</div>
                </div>
              </div>
              <div className="flex items-start">
                <Activity className="w-6 h-6 text-red-300 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">Weekend Work</div>
                  <div className="text-sm text-red-100">No waiting until Monday</div>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-red-300 mr-2 mt-0.5" />
                <div>
                  <div className="font-semibold">IICRC Certified</div>
                  <div className="text-sm text-red-100">Category 3 specialists</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency Response
            </Link>
            <Link
              href="/services/category-3-water-damage"
              className="inline-flex items-center justify-center bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
            >
              Learn More
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Why is immediate response critical for Category 3 water damage?
              </h3>
              <p className="text-gray-700">
                Category 3 water contains dangerous pathogens that multiply rapidly. Every hour of delay
                increases health risks and structural damage. Our 3-hour response time prevents escalation
                and minimizes restoration costs.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How do you handle multi-unit contamination in high-rises?
              </h3>
              <p className="text-gray-700">
                We implement containment barriers between units, use negative air pressure to prevent
                cross-contamination, and coordinate simultaneous restoration across all affected areas.
                Our discrete operations protect building reputation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What makes your weekend response different?
              </h3>
              <p className="text-gray-700">
                While others wait until Monday, we mobilize immediately. Our Gold Coast team worked
                26 hours over the weekend on this project, preventing further damage and health risks.
                Weekend response often saves weeks of restoration time.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How do you ensure complete decontamination?
              </h3>
              <p className="text-gray-700">
                We follow IICRC S500 protocols with multiple antimicrobial treatments and ATP testing
                for biological verification. Every surface is tested and certified clean before restoration
                proceeds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}