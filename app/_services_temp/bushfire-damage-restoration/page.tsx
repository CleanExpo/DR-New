'use client';

import { motion } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Wind,
  Home,
  Heart,
  Users,
  MapPin,
  AlertCircle
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function BushfireDamageRestorationPage() {
  // Comprehensive bushfire SEO schema
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://disaster-recovery-seven.vercel.app/services/bushfire-damage-restoration#service",
        "name": "Bushfire Damage Restoration Australia",
        "description": "Specialist bushfire and wildfire damage restoration services across Australia. IICRC-certified smoke damage restoration, structural assessment, soot removal, and complete property restoration after bushfire events.",
        "provider": {
          "@type": "Organization",
          "name": "Disaster Recovery Australia",
          "url": "https://disaster-recovery-seven.vercel.app"
        },
        "areaServed": [
          "Blue Mountains NSW", "Dandenong Ranges VIC", "Adelaide Hills SA",
          "Perth Hills WA", "Gold Coast Hinterland QLD", "Tasmania",
          "Kangaroo Island SA", "Hunter Valley NSW", "Grampians VIC"
        ],
        "serviceType": "Bushfire Damage Restoration"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What should I do immediately after a bushfire affects my property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Do NOT enter the property until authorities declare it safe. Contact your insurance company immediately, then call IICRC-certified restoration professionals. We assess structural integrity, begin smoke and soot removal within 24-48 hours to prevent permanent damage, and coordinate with your insurer for complete restoration."
            }
          },
          {
            "@type": "Question",
            "name": "How long does bushfire restoration take in Australia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bushfire restoration typically takes 2-6 months depending on damage severity. Emergency stabilisation occurs within 48 hours, smoke and soot removal takes 1-2 weeks, structural repairs 4-12 weeks, and complete restoration including landscaping can extend to 6 months. We work with insurance to expedite the process."
            }
          },
          {
            "@type": "Question",
            "name": "Is bushfire damage covered by Australian home insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most Australian home insurance policies cover bushfire damage as a standard inclusion. This typically covers structural damage, smoke damage, contents, temporary accommodation, and debris removal. We work directly with NRMA, Suncorp, Allianz, and all major insurers to maximise your claim."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Bushfire Property Recovery Process",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Safety Assessment",
            "text": "Wait for official all-clear from authorities before property access"
          },
          {
            "@type": "HowToStep",
            "name": "Insurance Notification",
            "text": "Contact insurer immediately to begin claim process"
          },
          {
            "@type": "HowToStep",
            "name": "Professional Assessment",
            "text": "IICRC technicians assess structural integrity and damage extent"
          },
          {
            "@type": "HowToStep",
            "name": "Emergency Stabilisation",
            "text": "Secure property, prevent further damage, begin soot removal"
          },
          {
            "@type": "HowToStep",
            "name": "Restoration Process",
            "text": "Complete smoke remediation, structural repairs, and property restoration"
          }
        ]
      }
    ]
  };

  const bushfireRiskAreas = [
    {
      state: "New South Wales",
      areas: ["Blue Mountains", "Hunter Valley", "South Coast", "Snowy Mountains"],
      season: "September - March",
      riskLevel: "Extreme"
    },
    {
      state: "Victoria",
      areas: ["Dandenong Ranges", "Grampians", "East Gippsland", "Otways"],
      season: "December - March",
      riskLevel: "Extreme"
    },
    {
      state: "South Australia",
      areas: ["Adelaide Hills", "Kangaroo Island", "Eyre Peninsula", "Mount Lofty"],
      season: "November - February",
      riskLevel: "High"
    },
    {
      state: "Western Australia",
      areas: ["Perth Hills", "Margaret River", "South West", "Great Southern"],
      season: "November - April",
      riskLevel: "High"
    }
  ];

  const restorationProcess = [
    {
      phase: "Emergency Response",
      timeframe: "0-48 hours",
      actions: [
        "Safety assessment",
        "Structural stabilisation",
        "Power and utility check",
        "Emergency board-up"
      ],
      critical: true
    },
    {
      phase: "Damage Assessment",
      timeframe: "Day 2-3",
      actions: [
        "Complete property inspection",
        "Insurance documentation",
        "Hazardous material identification",
        "Restoration plan development"
      ],
      critical: true
    },
    {
      phase: "Soot & Smoke Removal",
      timeframe: "Week 1-2",
      actions: [
        "Professional soot removal",
        "Smoke odour elimination",
        "Air quality restoration",
        "Contents cleaning"
      ],
      critical: false
    },
    {
      phase: "Structural Restoration",
      timeframe: "Week 2-12",
      actions: [
        "Damaged material removal",
        "Structural repairs",
        "Electrical system restoration",
        "Plumbing repairs"
      ],
      critical: false
    }
  ];

  const healthHazards = [
    {
      hazard: "Toxic Smoke Residue",
      risk: "Respiratory damage",
      solution: "Professional HEPA filtration and cleaning"
    },
    {
      hazard: "Asbestos Exposure",
      risk: "Mesothelioma risk from damaged materials",
      solution: "Licensed asbestos removal and containment"
    },
    {
      hazard: "Structural Instability",
      risk: "Collapse danger",
      solution: "Engineering assessment before entry"
    },
    {
      hazard: "Chemical Contamination",
      risk: "Skin and respiratory irritation",
      solution: "Hazmat cleaning protocols"
    }
  ];

  return (
    <>
      <Script
        id="bushfire-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-red-500/20 border border-red-400 px-3 py-1 rounded-full text-sm">
                  ⚠️ Bushfire Specialists
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ Insurance Approved
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ 24/7 Response
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bushfire Damage Restoration
                <span className="block text-orange-700 text-3xl md:text-4xl mt-2">
                  Australia&apos;s Specialist Wildfire Recovery Service
                </span>
              </h1>
              
              <p className="text-xl text-orange-800 mb-8 leading-relaxed">
                Expert bushfire restoration across Australia&apos;s fire-prone regions. 
                Our IICRC-certified specialists understand the unique challenges of bushfire damage - 
                from toxic smoke residue to structural compromise. <strong>Immediate response 
                prevents 70% of secondary damage</strong>.
              </p>

              {/* Bushfire Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">3,000+</div>
                  <div className="text-sm">Homes Lost Annually</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">$1.8B</div>
                  <div className="text-sm">Annual Damage Cost</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24hr</div>
                  <div className="text-sm">Critical Window</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Insurance Coverage</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Flame className="w-5 h-5" />
                  Bushfire Emergency Response
                </motion.a>
                <motion.a
                  href="/emergency/checklists/bushfire"
                  className="bg-white text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Bushfire Recovery Guide
                </motion.a>
              </div>

              {/* Critical Warning */}
              <div className="mt-8 bg-red-600/30 border-2 border-red-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  DO NOT enter fire-damaged property until declared safe by authorities
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Health Hazards Section */}
        <section className="py-12 bg-red-50 border-b-2 border-red-200">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-red-900">
                ⚠️ Critical Health Hazards After Bushfire
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {healthHazards.map((hazard, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-red-700 mb-2">{hazard.hazard}</h3>
                    <p className="text-sm text-gray-200 mb-2">Risk: {hazard.risk}</p>
                    <p className="text-sm text-green-700">Solution: {hazard.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Restoration Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Bushfire Restoration Process
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Systematic approach developed from decades of Australian bushfire recovery
            </p>

            <div className="max-w-5xl mx-auto">
              {restorationProcess.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`mb-8 ${phase.critical ? 'border-l-4 border-red-500 pl-6' : 'pl-6'}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${phase.critical ? 'bg-red-100' : 'bg-blue-100'}`}>
                      {phase.critical ? 
                        <AlertCircle className="w-6 h-6 text-red-600" /> :
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {phase.phase}
                        {phase.critical && <span className="ml-2 text-red-600 text-sm">(CRITICAL)</span>}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-3">{phase.timeframe}</p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                            <span className="text-gray-200">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* High Risk Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Australian Bushfire Risk Areas We Service
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Specialist teams positioned in all high-risk bushfire zones
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {bushfireRiskAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="text-xl font-bold mb-3">{area.state}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>High-risk areas:</strong>
                      <ul className="mt-1 space-y-1">
                        {area.areas.map((location, locIndex) => (
                          <li key={locIndex} className="text-gray-200">• {location}</li>
                        ))}
                      </ul>
                    </div>
                    <p><strong>Fire season:</strong> {area.season}</p>
                    <p className="text-red-600 font-semibold">Risk: {area.riskLevel}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Smoke Damage Specifics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                The Hidden Danger: Smoke & Soot Damage
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-lg">
                  <Wind className="w-12 h-12 text-gray-200 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Smoke Penetration</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">▶</span>
                      <span>Penetrates walls, insulation, and HVAC systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">▶</span>
                      <span>Acidic residue corrodes metals and electronics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">▶</span>
                      <span>Permanent staining begins within hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">▶</span>
                      <span>Toxic particles cause long-term health issues</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-lg">
                  <Shield className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Professional Solutions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Thermal fogging neutralises smoke odours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>HEPA filtration removes microscopic particles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Ozone treatment eliminates persistent odours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Specialised cleaning prevents permanent damage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Bushfire Insurance Claims Support
              </h2>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-green-600">Typically Covered</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Complete structural rebuilding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Smoke and soot damage restoration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Contents replacement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Temporary accommodation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Debris removal and site clearing</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-600">Our Insurance Support</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span>Direct billing with all major insurers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span>Detailed damage documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span>Claim maximisation strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span>Adjuster coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span>Progress reporting</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Support */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Heart className="w-16 h-16 text-orange-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">
                Supporting Australian Communities Through Recovery
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                We understand bushfire recovery extends beyond property restoration. 
                Our teams are trained in trauma-informed care and work closely with 
                community support services to ensure comprehensive recovery for affected families.
              </p>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Community Partnerships</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>Australian Red Cross</div>
                  <div>Salvation Army</div>
                  <div>St Vincent de Paul</div>
                  <div>BlazeAid</div>
                  <div>Wildlife Rescue</div>
                  <div>Local Councils</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-orange-900 to-red-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Bushfire Recovery Starts Now
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Every hour matters in bushfire restoration. Smoke damage becomes permanent, 
                structures weaken, and health hazards multiply. Our certified specialists 
                are ready to begin your recovery journey.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">We&apos;ve Been There</p>
                <p className="text-lg">
                  From Black Saturday to the 2019-20 Black Summer fires, we&apos;ve helped 
                  thousands of Australian families rebuild. Your recovery is our mission.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Start Bushfire Recovery
                </motion.a>
                <motion.a
                  href="/claim"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all bushfire-affected areas across Australia • 24/7 Emergency Response • Insurance Approved</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}