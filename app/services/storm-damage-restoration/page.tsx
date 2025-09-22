'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Cloud, 
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
  TreePine,
  Umbrella
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function StormDamageRestorationPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://disaster-recovery-seven.vercel.app/services/storm-damage-restoration#service",
        "name": "Storm Damage Restoration Services Australia",
        "description": "24/7 IICRC-certified storm damage restoration across Australia. Emergency response for hail damage, wind damage, lightning strikes, and severe weather events. Complete structural repairs and insurance claim assistance.",
        "provider": {
          "@type": "Organization",
          "name": "Disaster Recovery Australia"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Australia"
        },
        "serviceType": "Storm Damage Restoration"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly should storm damage be repaired?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Storm damage requires immediate attention to prevent further deterioration. Emergency tarping and boarding should occur within hours to prevent water ingress. Our teams provide 60-minute emergency response in metro areas with immediate weatherproofing to protect your property until permanent repairs can be completed."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle large-scale storm damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we handle everything from minor roof damage to complete structural failures. Our teams are equipped for large-scale storm events affecting entire communities, with experience from major storms including East Coast Lows, supercells, and severe hailstorms. We can mobilise multiple crews for widespread storm damage."
            }
          },
          {
            "@type": "Question",
            "name": "What storm damage is covered by insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most storm damage is covered by standard home insurance including wind damage, hail damage, fallen trees, and rain damage from storm-created openings. We work directly with all major insurers and provide detailed documentation to support your claim. Our teams are make-safe approved by major insurance companies."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Storm Damage Restoration Process",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Emergency Response",
            "text": "Immediate deployment for safety assessment and emergency repairs"
          },
          {
            "@type": "HowToStep",
            "name": "Make Safe",
            "text": "Tarping, boarding, and temporary weatherproofing"
          },
          {
            "@type": "HowToStep",
            "name": "Damage Assessment",
            "text": "Complete documentation for insurance claims"
          },
          {
            "@type": "HowToStep",
            "name": "Water Extraction",
            "text": "Remove any water ingress from storm damage"
          },
          {
            "@type": "HowToStep",
            "name": "Structural Repairs",
            "text": "Permanent repairs to roofs, walls, and structures"
          },
          {
            "@type": "HowToStep",
            "name": "Final Restoration",
            "text": "Complete restoration to pre-storm condition"
          }
        ]
      }
    ]
  };

  const stormTypes = [
    {
      type: "Severe Thunderstorms",
      damage: "Hail, wind, lightning",
      frequency: "Common nationwide",
      season: "Spring/Summer",
      icon: <Zap className="w-6 h-6" />
    },
    {
      type: "East Coast Lows",
      damage: "Extreme wind & rain",
      frequency: "Eastern seaboard",
      season: "Autumn/Winter",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Supercells",
      damage: "Giant hail, tornadoes",
      frequency: "Eastern Australia",
      season: "Spring/Summer",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      type: "Cold Fronts",
      damage: "Damaging winds",
      frequency: "Southern states",
      season: "Winter",
      icon: <Umbrella className="w-6 h-6" />
    }
  ];

  const damageTypes = [
    {
      damage: "Roof Damage",
      causes: "Wind, hail, falling trees",
      urgency: "Critical - water ingress risk",
      solution: "Emergency tarping, permanent repairs"
    },
    {
      damage: "Window Damage",
      causes: "Hail, debris impact",
      urgency: "High - security & weather",
      solution: "Emergency boarding, glass replacement"
    },
    {
      damage: "Structural Damage",
      causes: "Tree impact, extreme wind",
      urgency: "Critical - safety hazard",
      solution: "Engineering assessment, structural repairs"
    },
    {
      damage: "Water Damage",
      causes: "Rain ingress through damage",
      urgency: "High - mould risk",
      solution: "Water extraction, drying, restoration"
    },
    {
      damage: "Electrical Damage",
      causes: "Lightning strikes, fallen lines",
      urgency: "Critical - fire risk",
      solution: "Isolation, certified electrical repairs"
    },
    {
      damage: "Fence/External",
      causes: "Wind, falling debris",
      urgency: "Moderate - security",
      solution: "Temporary securing, rebuilding"
    }
  ];

  const stormBelts = [
    {
      region: "Sydney Storm Belt",
      risk: "Extreme",
      events: "Hailstorms, East Coast Lows",
      coverage: "Sydney Basin, Blue Mountains",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Brisbane Supercells",
      risk: "Extreme",
      events: "Giant hail, severe thunderstorms",
      coverage: "SE Queensland corridor",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Melbourne Fronts",
      risk: "High",
      events: "Cold fronts, damaging winds",
      coverage: "Greater Melbourne, Dandenongs",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      region: "Adelaide Hills",
      risk: "High",
      events: "Severe storms, flash flooding",
      coverage: "Adelaide metro, Mount Lofty",
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const responseProtocol = [
    {
      phase: "Immediate Safety",
      timeframe: "0-2 hours",
      actions: [
        "Secure dangerous areas",
        "Isolate electrical hazards",
        "Document initial damage",
        "Contact insurance"
      ]
    },
    {
      phase: "Emergency Protection",
      timeframe: "2-24 hours",
      actions: [
        "Install roof tarps",
        "Board broken windows",
        "Remove dangerous debris",
        "Prevent water ingress"
      ]
    },
    {
      phase: "Assessment & Planning",
      timeframe: "1-3 days",
      actions: [
        "Detailed damage assessment",
        "Insurance documentation",
        "Repair quotations",
        "Material ordering"
      ]
    },
    {
      phase: "Full Restoration",
      timeframe: "3-30 days",
      actions: [
        "Structural repairs",
        "Roof restoration",
        "Interior repairs",
        "Final inspections"
      ]
    }
  ];

  const seasonalPreparedness = [
    {
      season: "Spring (Sep-Nov)",
      threat: "Severe thunderstorms, supercells",
      preparation: "Hail protection, tree trimming",
      hotspots: "QLD, NSW, VIC"
    },
    {
      season: "Summer (Dec-Feb)",
      threat: "Thunderstorms, tropical systems",
      preparation: "Gutter cleaning, secure loose items",
      hotspots: "Eastern Australia"
    },
    {
      season: "Autumn (Mar-May)",
      threat: "East Coast Lows",
      preparation: "Roof inspections, drainage checks",
      hotspots: "NSW, QLD coasts"
    },
    {
      season: "Winter (Jun-Aug)",
      threat: "Cold fronts, wind storms",
      preparation: "Tree assessment, fence checks",
      hotspots: "Southern states"
    }
  ];

  return (
    <>
      <Script
        id="storm-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-gray-900/50" />
          </div>
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Storm Warning Banner */}
              <div className="bg-yellow-600/90 backdrop-blur-sm rounded-lg p-4 mb-6 border-2 border-yellow-400">
                <p className="font-bold text-lg flex items-center gap-2">
                  <Wind className="w-6 h-6" />
                  STORM SEASON ACTIVE: Severe weather warnings in effect | 24/7 Response Ready
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Storm Damage Restoration
                <span className="block text-purple-700 text-3xl md:text-4xl mt-2">
                  Australia&apos;s Severe Weather Recovery Specialists
                </span>
              </h1>
              
              <p className="text-xl text-purple-800 mb-8 leading-relaxed">
                From supercell hailstorms to East Coast Lows, we&apos;ve restored thousands of 
                storm-damaged properties across Australia. Our IICRC-certified teams provide 
                <strong> immediate emergency response</strong> with make-safe services, structural 
                repairs, and complete restoration. Insurance approved and ready 24/7.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                  <div className="text-2xl font-bold">60min</div>
                  <div className="text-sm">Emergency Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                  <div className="text-2xl font-bold">Make-Safe</div>
                  <div className="text-sm">Insurance Approved</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Building className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                  <div className="text-2xl font-bold">15,000+</div>
                  <div className="text-sm">Storms Responded</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Storm Teams</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Storm Damage Emergency
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors inline-flex items-center justify-center gap-2"
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

        {/* Storm Types */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Australian Storm Types We Handle
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Specialised response for every severe weather system
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stormTypes.map((storm, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      {storm.icon}
                    </div>
                    <h3 className="text-xl font-bold">{storm.type}</h3>
                  </div>
                  <p className="text-gray-200 mb-2">{storm.damage}</p>
                  <p className="text-sm text-gray-200 mb-1">{storm.frequency}</p>
                  <p className="text-sm font-semibold text-purple-600">Season: {storm.season}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Damage Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Storm Damage Types & Solutions
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Comprehensive restoration for all storm-related damage
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {damageTypes.map((damage, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-purple-900">{damage.damage}</h3>
                  <p className="text-gray-200 mb-2">
                    <strong>Causes:</strong> {damage.causes}
                  </p>
                  <p className={`font-semibold mb-2 ${
                    damage.urgency.includes('Critical') ? 'text-red-600' :
                    damage.urgency.includes('High') ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {damage.urgency}
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Solution:</strong> {damage.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* High-Risk Storm Belts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Australia&apos;s Storm Belt Coverage
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Pre-positioned teams in severe weather corridors
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stormBelts.map((belt, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg border-l-4 border-purple-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                      {belt.icon}
                    </div>
                    <h3 className="text-lg font-bold">{belt.region}</h3>
                  </div>
                  <p className={`font-semibold mb-2 ${
                    belt.risk === 'Extreme' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    Risk: {belt.risk}
                  </p>
                  <p className="text-gray-200 mb-2 text-sm">{belt.events}</p>
                  <p className="text-gray-200 text-sm">Coverage: {belt.coverage}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-purple-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Supercell Alley Response</h3>
              <p className="text-gray-200">
                Southeast Queensland&apos;s "Supercell Alley" experiences the most intense storms in Australia, 
                with giant hail exceeding 10cm. Our specialised supercell response teams are equipped with 
                reinforced vehicles and protective gear for immediate deployment during these extreme events.
              </p>
            </div>
          </div>
        </section>

        {/* Response Protocol */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Storm Response Protocol
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Systematic approach from emergency response to complete restoration
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {responseProtocol.map((phase, index) => (
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
                    <p className="text-purple-600 font-semibold">{phase.timeframe}</p>
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

        {/* Seasonal Preparedness */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Year-Round Storm Preparedness
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {seasonalPreparedness.map((season, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-purple-900">{season.season}</h3>
                  <p className="text-gray-200 mb-2">
                    <strong>Main Threat:</strong> {season.threat}
                  </p>
                  <p className="text-gray-200 mb-2">
                    <strong>Preparation:</strong> {season.preparation}
                  </p>
                  <p className="text-purple-600 font-semibold">
                    Hotspots: {season.hotspots}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why We&apos;re Australia&apos;s Storm Recovery Leaders
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-purple-900">Storm Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Wind className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>15,000+ storm events responded to nationwide</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Insurance make-safe approved provider</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Dedicated storm response teams 24/7</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                      <span>Pre-positioned in all storm corridors</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-purple-900">Rapid Response</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>60-minute emergency response metro areas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <TreePine className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Certified arborists for tree damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Licensed electricians for power issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span>Complete insurance documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Bureau of Meteorology Integration</h3>
                <p className="text-gray-200 mb-4">
                  We monitor Bureau of Meteorology warnings 24/7 and pre-deploy teams when severe weather 
                  is forecast. This proactive approach means we&apos;re often on-site within minutes of storm 
                  passage, providing the fastest possible response to minimise damage.
                </p>
                <div className="flex items-center gap-2 text-purple-900 font-semibold">
                  <AlertCircle className="w-5 h-5" />
                  Current Status: STORM WATCH - Teams on standby in Sydney, Brisbane, Melbourne
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Cloud className="w-16 h-16 mx-auto mb-6 text-purple-700" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                When Storms Strike, WHO&apos;S FIRST Matters
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Don&apos;t wait for further damage. Our certified storm response teams provide immediate online response 
                with emergency tarping, structural repairs, and complete restoration services. From 
                supercell hail to cyclonic winds, we have the experience and equipment to restore your property.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">Insurance Make-Safe Approved</p>
                <p className="text-lg">
                  We&apos;re approved by all major insurers for emergency make-safe work. Our detailed 
                  documentation and direct insurer billing makes your claim process seamless.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Report Storm Damage Now
                </motion.a>
                <motion.a
                  href="/emergency/checklists/storm-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Storm Safety Checklist
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>National coverage • All storm types • Make-safe approved • Insurance specialists</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}