'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Wind, 
  Home, 
  Shield, 
  CheckCircle, 
  Clock,
  Droplets,
  Zap,
  TreePine,
  Building,
  MapPin,
  Users,
  FileText,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function CycloneDamageRestorationPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://disaster-recovery-seven.vercel.app/services/cyclone-damage-restoration#service",
        "name": "Cyclone Damage Restoration Services Australia",
        "description": "24/7 IICRC-certified cyclone damage restoration across tropical Australia. Category 1-5 cyclone recovery specialists serving Queensland, Northern Territory, and Western Australia.",
        "provider": {
          "@type": "Organization",
          "name": "Disaster Recovery Australia",
          "telephone": "1300-DISASTER"
        },
        "areaServed": [
          {
            "@type": "State",
            "name": "Queensland"
          },
          {
            "@type": "State",
            "name": "Northern Territory"
          },
          {
            "@type": "State",
            "name": "Western Australia"
          }
        ],
        "serviceType": "Cyclone Damage Restoration"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond after a cyclone hits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We begin mobilisation as soon as it's safe after cyclone passage. Our teams are pre-positioned in cyclone zones during the season (November-April) for immediate deployment. Initial assessment teams deploy within 2-4 hours of all-clear, with full restoration crews following within 12-24 hours."
            }
          },
          {
            "@type": "Question",
            "name": "What areas do you cover for cyclone damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We cover all cyclone-prone areas including Far North Queensland (Cairns, Townsville, Mackay), Northern Territory (Darwin, Katherine), and Western Australia (Broome, Port Hedland, Exmouth). Our network extends to remote communities and offshore facilities affected by tropical cyclones."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle Category 5 cyclone damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our teams are experienced with Category 1-5 cyclone damage, including catastrophic Category 5 events like Cyclone Yasi. We handle complete structural rebuilds, debris removal, water extraction, and full property restoration regardless of cyclone intensity."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Cyclone Damage Recovery Process",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Safety Assessment",
            "text": "Structural engineers assess building safety and identify immediate hazards"
          },
          {
            "@type": "HowToStep",
            "name": "Emergency Stabilisation",
            "text": "Tarping, boarding, and temporary structural supports installed"
          },
          {
            "@type": "HowToStep",
            "name": "Water Extraction",
            "text": "Remove storm surge and rain water using industrial pumps"
          },
          {
            "@type": "HowToStep",
            "name": "Debris Removal",
            "text": "Clear cyclone debris including trees, roofing, and wind-blown materials"
          },
          {
            "@type": "HowToStep",
            "name": "Drying & Dehumidification",
            "text": "Industrial drying to prevent mould in tropical conditions"
          },
          {
            "@type": "HowToStep",
            "name": "Restoration & Rebuild",
            "text": "Complete restoration to cyclone-resistant building standards"
          }
        ]
      }
    ]
  };

  const cycloneCategories = [
    {
      category: "Category 1-2",
      winds: "63-117 km/h",
      damage: "Minor roof damage, tree damage",
      response: "Standard restoration teams"
    },
    {
      category: "Category 3",
      winds: "118-159 km/h",
      damage: "Roof and structural damage",
      response: "Specialised cyclone crews"
    },
    {
      category: "Category 4",
      winds: "160-199 km/h",
      damage: "Significant structural damage",
      response: "Major disaster teams"
    },
    {
      category: "Category 5",
      winds: "200+ km/h",
      damage: "Catastrophic destruction",
      response: "Full disaster response"
    }
  ];

  const cycloneZones = [
    {
      region: "Far North Queensland",
      cities: "Cairns, Port Douglas, Innisfail",
      season: "November - April",
      risk: "Very High",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "North Queensland",
      cities: "Townsville, Mackay, Bowen",
      season: "December - March",
      risk: "High",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Northern Territory",
      cities: "Darwin, Katherine, Nhulunbuy",
      season: "November - April",
      risk: "High",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Western Australia",
      cities: "Broome, Port Hedland, Exmouth",
      season: "November - April",
      risk: "Moderate-High",
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const restorationProcess = [
    {
      phase: "Immediate Response",
      timeframe: "0-24 hours",
      actions: [
        "Safety assessment",
        "Emergency tarping",
        "Power isolation",
        "Initial water extraction"
      ]
    },
    {
      phase: "Stabilisation",
      timeframe: "1-7 days",
      actions: [
        "Structural bracing",
        "Debris removal",
        "Water damage mitigation",
        "Mould prevention"
      ]
    },
    {
      phase: "Restoration",
      timeframe: "1-4 weeks",
      actions: [
        "Structural repairs",
        "Electrical restoration",
        "Interior rebuilding",
        "External repairs"
      ]
    },
    {
      phase: "Reconstruction",
      timeframe: "1-6 months",
      actions: [
        "Major structural work",
        "Cyclone-proofing upgrades",
        "Complete rebuilds",
        "Final inspections"
      ]
    }
  ];

  const commonDamage = [
    {
      type: "Wind Damage",
      effects: "Roof loss, window damage, structural failure",
      solution: "Emergency boarding, structural repairs, cyclone-rated rebuilds"
    },
    {
      type: "Storm Surge",
      effects: "Flooding, salt damage, foundation erosion",
      solution: "Water extraction, salt remediation, foundation repair"
    },
    {
      type: "Rain Damage",
      effects: "Internal flooding, ceiling collapse, electrical damage",
      solution: "Drying, electrical safety, internal restoration"
    },
    {
      type: "Debris Impact",
      effects: "Puncture damage, broken windows, structural breaches",
      solution: "Debris removal, emergency repairs, full restoration"
    }
  ];

  return (
    <>
      <Script
        id="cyclone-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900/50" />
          </div>
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Cyclone Warning Banner */}
              <div className="bg-red-600/90 backdrop-blur-sm rounded-lg p-4 mb-6 border-2 border-red-400">
                <p className="font-bold text-lg flex items-center gap-2">
                  <Wind className="w-6 h-6 animate-spin" />
                  CYCLONE SEASON ACTIVE: November - April | 24/7 Emergency Response Ready
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Cyclone Damage Restoration
                <span className="block text-blue-700 text-3xl md:text-4xl mt-2">
                  Category 1-5 Tropical Cyclone Recovery Specialists
                </span>
              </h1>
              
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                Australia&apos;s leading cyclone damage restoration experts. From Cyclone Yasi to 
                Cyclone Marcus, our IICRC-certified teams have restored thousands of properties 
                across tropical Australia. <strong>Pre-positioned teams</strong> ready for immediate 
                deployment across Queensland, NT, and WA.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Wind className="w-8 h-8 mx-auto mb-2 text-blue-700" />
                  <div className="text-2xl font-bold">Cat 1-5</div>
                  <div className="text-sm">All Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-700" />
                  <div className="text-2xl font-bold">2-4hr</div>
                  <div className="text-sm">Post-Cyclone Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-700" />
                  <div className="text-2xl font-bold">3 States</div>
                  <div className="text-sm">QLD, NT, WA</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-700" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Teams</div>
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
                  <AlertTriangle className="w-5 h-5" />
                  Cyclone Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Cyclone Categories */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Cyclone Category Response Capabilities
            </h2>
            <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Equipped and experienced for all tropical cyclone intensities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {cycloneCategories.map((cat, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${
                    index === 3 ? 'bg-gradient-to-br from-red-50 to-white border-2 border-red-200' :
                    index === 2 ? 'bg-gradient-to-br from-orange-50 to-white' :
                    'bg-gradient-to-br from-blue-50 to-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3">{cat.category}</h3>
                  <p className="text-blue-600 font-semibold mb-2">Winds: {cat.winds}</p>
                  <p className="text-gray-700 mb-2">{cat.damage}</p>
                  <p className="text-green-600 font-semibold text-sm">{cat.response}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cyclone Zones */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Tropical Cyclone Coverage Zones
            </h2>
            <p className="text-xl text-center text-gray-700 mb-12">
              Pre-positioned teams across Australia&apos;s cyclone belt
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {cycloneZones.map((zone, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {zone.icon}
                    </div>
                    <h3 className="text-xl font-bold">{zone.region}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{zone.cities}</p>
                  <p className="text-sm text-gray-700 mb-2">Season: {zone.season}</p>
                  <p className={`font-semibold ${
                    zone.risk === 'Very High' ? 'text-red-600' :
                    zone.risk === 'High' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    Risk Level: {zone.risk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Remote & Offshore Coverage</h3>
              <p className="text-gray-700">
                Our cyclone response extends to remote communities, island territories, and offshore 
                facilities. We&apos;ve successfully restored properties in Thursday Island, Christmas Island, 
                offshore oil platforms, and remote mining sites affected by tropical cyclones.
              </p>
            </div>
          </div>
        </section>

        {/* Common Damage Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Cyclone Damage Types We Restore
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {commonDamage.map((damage, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{damage.type}</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Effects:</strong> {damage.effects}
                  </p>
                  <p className="text-green-700">
                    <strong>Our Solution:</strong> {damage.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Restoration Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Cyclone Recovery Timeline
            </h2>
            <p className="text-xl text-center text-gray-700 mb-12">
              Systematic restoration from emergency response to complete rebuild
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {restorationProcess.map((phase, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{phase.phase}</h3>
                    <p className="text-blue-600 font-semibold">{phase.timeframe}</p>
                  </div>
                  <ul className="space-y-2">
                    {phase.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why We&apos;re Australia&apos;s Cyclone Recovery Leaders
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Cyclone Experience</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Restored properties after Yasi, Larry, Marcus, and Debbie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Pre-positioned teams in all cyclone zones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Cyclone-rated rebuilding to Australian standards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>2-4 hour post-cyclone deployment capability</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Specialist Capabilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Storm surge and salt damage remediation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <TreePine className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Large-scale debris removal and disposal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Droplets className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Tropical mould prevention in high humidity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Insurance claim documentation specialists</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Pre-Season Preparation</h3>
                <p className="text-gray-700 mb-4">
                  Every cyclone season, we pre-position equipment and teams across the tropical zone. 
                  Our mobile command units, generators, industrial pumps, and restoration equipment are 
                  strategically located for immediate deployment when cyclones threaten.
                </p>
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  Current Status: CYCLONE SEASON ACTIVE - Teams on standby 24/7
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Wind className="w-16 h-16 mx-auto mb-6 text-blue-700 animate-spin-slow" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Cyclone Recovery Starts With WHO&apos;S FIRST
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                When tropical cyclones threaten, we&apos;re already mobilising. When they strike, 
                we&apos;re ready to deploy. From Category 1 to catastrophic Category 5, we have the 
                experience, equipment, and expertise to restore your property.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">Cyclone Season Active: November - April</p>
                <p className="text-lg">
                  Our teams are on 24/7 standby across Queensland, Northern Territory, and 
                  Western Australia. One call activates our entire cyclone response network.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Report Cyclone Damage
                </motion.a>
                <motion.a
                  href="/emergency/checklists/cyclone"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cyclone Preparation Guide
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Coverage: Cairns • Townsville • Darwin • Broome • Port Hedland • All tropical regions</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}