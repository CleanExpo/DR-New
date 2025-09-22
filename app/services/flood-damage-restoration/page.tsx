'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Droplets, 
  Home, 
  Shield, 
  CheckCircle, 
  Clock,
  Zap,
  Wind,
  Building,
  MapPin,
  Users,
  FileText,
  AlertCircle,
  TrendingUp,
  Thermometer
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function FloodDamageRestorationPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://disaster-recovery-seven.vercel.app/services/flood-damage-restoration#service",
        "name": "Flood Damage Restoration Services Australia",
        "description": "24/7 IICRC-certified flood damage restoration across Australia. Emergency response for flash floods, river flooding, storm water damage, and La Niña events. Serving all flood-prone areas nationwide.",
        "provider": {
          "@type": "Organization",
          "name": "Disaster Recovery Australia"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Australia"
        },
        "serviceType": "Flood Damage Restoration"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly should flood damage be addressed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Flood damage requires immediate action within 24-48 hours to prevent mould growth, structural damage, and contamination spread. Our teams provide 60-minute emergency response in metro areas and begin water extraction immediately upon arrival. Every hour counts in flood recovery."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle contaminated flood water?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in all categories of flood water including Category 3 'black water' containing sewage, chemicals, and biological hazards. Our IICRC-certified technicians use proper PPE, antimicrobial treatments, and industrial sanitisation to ensure safe restoration."
            }
          },
          {
            "@type": "Question",
            "name": "What areas do you cover for flood restoration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide flood restoration services nationwide, with heightened presence in flood-prone areas including Brisbane River catchment, Hawkesbury-Nepean, Northern Rivers NSW, Townsville, and all La Niña affected regions. Our network covers metro, regional, and remote communities across Australia."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Flood Damage Restoration Process",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Emergency Water Extraction",
            "text": "Deploy industrial pumps to remove standing water immediately"
          },
          {
            "@type": "HowToStep",
            "name": "Contamination Assessment",
            "text": "Test water category and identify health hazards"
          },
          {
            "@type": "HowToStep",
            "name": "Structural Drying",
            "text": "Industrial dehumidification and air movement to dry structure"
          },
          {
            "@type": "HowToStep",
            "name": "Sanitisation & Antimicrobial",
            "text": "Treat all affected areas to prevent mould and bacteria"
          },
          {
            "@type": "HowToStep",
            "name": "Content Restoration",
            "text": "Clean and restore salvageable belongings"
          },
          {
            "@type": "HowToStep",
            "name": "Reconstruction",
            "text": "Rebuild damaged structures to pre-flood condition"
          }
        ]
      }
    ]
  };

  const floodTypes = [
    {
      type: "Flash Flooding",
      timeframe: "Minutes to hours",
      danger: "Extreme - rapid onset",
      areas: "Urban areas, steep terrain",
      response: "Immediate mobilisation"
    },
    {
      type: "River Flooding",
      timeframe: "Hours to days",
      danger: "High - widespread impact",
      areas: "River catchments, floodplains",
      response: "Pre-positioned teams"
    },
    {
      type: "Coastal Flooding",
      timeframe: "Tide dependent",
      danger: "High - storm surge",
      areas: "Coastal communities",
      response: "Cyclone/storm teams"
    },
    {
      type: "Urban Flooding",
      timeframe: "30 mins - 2 hours",
      danger: "Moderate - infrastructure",
      areas: "Cities, developed areas",
      response: "Rapid response units"
    }
  ];

  const floodZones = [
    {
      region: "Brisbane & SE QLD",
      risk: "Extreme",
      history: "2011, 2022 major floods",
      coverage: "Brisbane River, Ipswich, Logan",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Northern Rivers NSW",
      risk: "Extreme",
      history: "Lismore 2022 catastrophic",
      coverage: "Lismore, Ballina, Byron Bay",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Hawkesbury-Nepean",
      risk: "High",
      history: "Regular flooding events",
      coverage: "Windsor, Richmond, Penrith",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "North Queensland",
      risk: "High",
      history: "Townsville 2019 floods",
      coverage: "Townsville, Cairns, Mackay",
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const waterCategories = [
    {
      category: "Category 1",
      name: "Clean Water",
      source: "Broken pipes, rain",
      hazard: "Minimal health risk",
      treatment: "Standard drying",
      color: "blue"
    },
    {
      category: "Category 2",
      name: "Grey Water",
      source: "Washing machines, dishwashers",
      hazard: "Moderate contamination",
      treatment: "Sanitisation required",
      color: "gray"
    },
    {
      category: "Category 3",
      name: "Black Water",
      source: "Sewage, river flooding",
      hazard: "Severe health hazard",
      treatment: "Full decontamination",
      color: "black"
    }
  ];

  const restorationStages = [
    {
      stage: "Emergency Response",
      timeframe: "0-24 hours",
      actions: [
        "Safety assessment",
        "Water extraction begins",
        "Power isolation",
        "Document damage"
      ]
    },
    {
      stage: "Water Removal",
      timeframe: "1-3 days",
      actions: [
        "Complete extraction",
        "Remove damaged materials",
        "Begin drying process",
        "Moisture monitoring"
      ]
    },
    {
      stage: "Drying & Dehumidification",
      timeframe: "3-7 days",
      actions: [
        "Industrial drying equipment",
        "Daily moisture readings",
        "Mould prevention treatment",
        "Air quality testing"
      ]
    },
    {
      stage: "Restoration & Rebuild",
      timeframe: "1-8 weeks",
      actions: [
        "Replace damaged materials",
        "Painting and finishing",
        "Final sanitisation",
        "Quality inspection"
      ]
    }
  ];

  const criticalFactors = [
    {
      factor: "48-Hour Window",
      impact: "Mould begins growing after 48 hours in wet conditions",
      action: "Immediate water extraction and drying essential"
    },
    {
      factor: "Hidden Moisture",
      impact: "Water trapped in walls and cavities causes long-term damage",
      action: "Thermal imaging and moisture meters detect all water"
    },
    {
      factor: "Contamination Level",
      impact: "Flood water often contains sewage and chemicals",
      action: "Professional sanitisation and PPE required"
    },
    {
      factor: "Structural Integrity",
      impact: "Flooding can compromise foundations and load-bearing elements",
      action: "Engineering assessment before restoration"
    }
  ];

  return (
    <>
      <Script
        id="flood-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50" />
          </div>
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Flood Alert Banner */}
              <div className="bg-orange-600/90 backdrop-blur-sm rounded-lg p-4 mb-6 border-2 border-orange-400">
                <p className="font-bold text-lg flex items-center gap-2">
                  <Droplets className="w-6 h-6" />
                  LA NIÑA ALERT: Increased flood risk across Eastern Australia | 24/7 Response Ready
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Flood Damage Restoration
                <span className="block text-cyan-700 text-3xl md:text-4xl mt-2">
                  Australia&apos;s Leading Flood Recovery Specialists
                </span>
              </h1>
              
              <p className="text-xl text-cyan-800 mb-8 leading-relaxed">
                From the Brisbane floods to Lismore&apos;s record-breaking events, we&apos;ve restored 
                thousands of flood-affected properties across Australia. Our IICRC-certified teams provide 
                <strong> immediate 24/7 response</strong> with industrial-grade water extraction, 
                structural drying, and complete restoration services.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Droplets className="w-8 h-8 mx-auto mb-2 text-cyan-700" />
                  <div className="text-2xl font-bold">60min</div>
                  <div className="text-sm">Metro Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-cyan-700" />
                  <div className="text-2xl font-bold">24-48hr</div>
                  <div className="text-sm">Critical Window</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Building className="w-8 h-8 mx-auto mb-2 text-cyan-700" />
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm">Properties Restored</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-cyan-700" />
                  <div className="text-2xl font-bold">Cat 1-3</div>
                  <div className="text-sm">All Water Types</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Flood Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors inline-flex items-center justify-center gap-2"
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

        {/* Critical 48-Hour Warning */}
        <section className="py-8 bg-red-50 border-y-2 border-red-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <AlertCircle className="w-12 h-12 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-red-900">Critical: First 48 Hours</h2>
                <p className="text-red-800">
                  Mould begins growing within 48 hours of water damage. Immediate professional intervention 
                  prevents permanent damage, health hazards, and exponentially higher restoration costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flood Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Flood Types We Handle
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Specialised response protocols for every flood scenario
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {floodTypes.map((flood, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{flood.type}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Onset:</strong> {flood.timeframe}</p>
                    <p className={`font-semibold ${
                      flood.danger.includes('Extreme') ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {flood.danger}
                    </p>
                    <p><strong>Common in:</strong> {flood.areas}</p>
                    <p className="text-green-600 font-semibold">{flood.response}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Water Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Water Contamination Categories
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Professional assessment and treatment for all contamination levels
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {waterCategories.map((cat, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${
                    cat.color === 'black' ? 'bg-gradient-to-br from-gray-900 to-gray-700 text-white' :
                    cat.color === 'gray' ? 'bg-gradient-to-br from-gray-200 to-white' :
                    'bg-gradient-to-br from-blue-100 to-white'
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`text-xl font-bold mb-2 ${cat.color === 'black' ? 'text-white' : ''}`}>
                    {cat.category}: {cat.name}
                  </h3>
                  <p className={`mb-2 ${cat.color === 'black' ? 'text-gray-200' : 'text-gray-200'}`}>
                    <strong>Source:</strong> {cat.source}
                  </p>
                  <p className={`mb-2 font-semibold ${
                    cat.color === 'black' ? 'text-red-600' :
                    cat.color === 'gray' ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {cat.hazard}
                  </p>
                  <p className={`text-sm ${cat.color === 'black' ? 'text-green-600' : 'text-green-600'}`}>
                    Treatment: {cat.treatment}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-lg max-w-4xl mx-auto">
              <p className="text-gray-200">
                <strong>Important:</strong> Most flood water is Category 3 (Black Water) containing sewage, 
                chemicals, and biological hazards. Never attempt DIY cleanup without proper protection and equipment.
              </p>
            </div>
          </div>
        </section>

        {/* High-Risk Flood Zones */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Australia&apos;s High-Risk Flood Zones
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Pre-positioned teams in flood-prone regions nationwide
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {floodZones.map((zone, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {zone.icon}
                    </div>
                    <h3 className="text-xl font-bold">{zone.region}</h3>
                  </div>
                  <p className={`font-semibold mb-2 ${
                    zone.risk === 'Extreme' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    Risk Level: {zone.risk}
                  </p>
                  <p className="text-gray-200 mb-2 text-sm">{zone.history}</p>
                  <p className="text-gray-200 text-sm">Coverage: {zone.coverage}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Restoration Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Professional Flood Restoration Process
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Systematic approach from emergency response to complete restoration
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {restorationStages.map((stage, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{stage.stage}</h3>
                    <p className="text-blue-600 font-semibold">{stage.timeframe}</p>
                  </div>
                  <ul className="space-y-2">
                    {stage.actions.map((action, actionIndex) => (
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

        {/* Critical Factors */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Critical Factors in Flood Recovery
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {criticalFactors.map((factor, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-3 text-blue-900">{factor.factor}</h3>
                    <p className="text-gray-200 mb-3">
                      <strong>Impact:</strong> {factor.impact}
                    </p>
                    <p className="text-green-700">
                      <strong>Our Action:</strong> {factor.action}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why We&apos;re Australia&apos;s Flood Recovery Leaders
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Flood Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>10,000+ flood restorations completed nationwide</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Deployed for every major flood event since 2010</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>Pre-positioned in all flood-prone regions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span>IICRC-certified water damage specialists</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Advanced Equipment</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Industrial pumps extract 10,000L per hour</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Thermometer className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Thermal imaging detects hidden moisture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Wind className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Industrial dehumidifiers and air movers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Insurance documentation specialists</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">La Niña Preparedness</h3>
                <p className="text-gray-200 mb-4">
                  With La Niña conditions increasing flood risk across Eastern Australia, our teams are on 
                  heightened alert. We&apos;ve increased equipment stocks, expanded crew numbers, and established 
                  additional response centres in high-risk areas.
                </p>
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  Current Status: LA NIÑA ACTIVE - Enhanced flood response capability deployed
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Droplets className="w-16 h-16 mx-auto mb-6 text-cyan-700" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Every Minute Counts in Flood Recovery
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Don&apos;t let flood damage become permanent damage. Our IICRC-certified teams provide 
                immediate online response with industrial equipment, proven processes, and the expertise to restore your property 
                completely. From emergency water extraction to final reconstruction, we handle everything.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">Remember: WHO&apos;S FIRST Matters</p>
                <p className="text-lg">
                  The first responder to your flood damage determines the outcome. Choose certified 
                  professionals who arrive fast, equipped, and ready to save your property.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Report Flood Damage Now
                </motion.a>
                <motion.a
                  href="/emergency/checklists/water-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Flood Emergency Checklist
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>National coverage • All flood types • Category 1-3 water • Insurance approved</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}