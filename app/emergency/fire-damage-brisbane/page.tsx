'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Clock, Shield, AlertTriangle, CheckCircle,
  Phone, ArrowRight, MapPin, Users, Building, Home,
  Wind, TrendingUp, Star, FileText, DollarSign, Truck,
  AlertCircle, Heart, Thermometer, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';
import Link from 'next/link';

export default function EmergencyFireDamageBrisbanePage() {
  // Comprehensive schema for emergency fire damage SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "@id": "https://disaster-recovery-seven.vercel.app/emergency/fire-damage-brisbane#emergency",
        "name": "24/7 Emergency Fire Damage Restoration Brisbane",
        "description": "Priority-based fire and smoke damage restoration in Brisbane, Ipswich, Logan. Phone triage assessment. IICRC certified. Insurance approved. Smoke removal, soot cleanup, structural restoration.",
        "serviceType": "Fire Damage Restoration",
        "areaServed": [
          {
            "@type": "City",
            "name": "Brisbane"
          },
          {
            "@type": "City",
            "name": "Ipswich"
          },
          {
            "@type": "City",
            "name": "Logan"
          }
        ],
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://disaster-recovery-seven.vercel.app/emergency/fire-damage-brisbane",
          "servicePhone": "+61-1300-309-361",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What should I do immediately after a fire in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First, ensure everyone is safe and call 000 if needed. Do not enter the property until cleared by fire services. Call us immediately at 1300 309 361 for phone triage assessment. We'll determine urgency level and schedule appropriate response - critical situations same day, urgent within 24 hours. We'll secure your property, assess damage, begin smoke removal, and coordinate with your insurance."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly does smoke damage become permanent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Smoke damage begins setting within hours and can become permanent within 24-48 hours. Acidic soot starts corroding metals within hours, fabrics absorb odours permanently after 24 hours, and electronics can fail within days. Our immediate response prevents permanent damage through rapid soot removal, odour neutralization, and protective treatments."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in fire damage restoration services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our comprehensive service includes: emergency board-up and tarping, smoke and soot removal from all surfaces, odour elimination using hydroxyl generators and ozone, water extraction from firefighting efforts, structural cleaning and restoration, content cleaning and pack-out services, complete rebuild coordination, and insurance claim management."
            }
          },
          {
            "@type": "Question",
            "name": "How much does fire damage restoration cost in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fire restoration costs vary: Minor smoke damage $2,000-$5,000, moderate fire damage $5,000-$15,000, major structural damage $15,000-$50,000+. Most home insurance policies cover fire damage restoration. We work directly with all major insurers and handle the claim process, requiring no upfront payment in most cases."
            }
          },
          {
            "@type": "Question",
            "name": "Can you remove smoke smell completely?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we guarantee complete smoke odour removal using advanced techniques: thermal fogging penetrates all materials, hydroxyl generators break down odour molecules, ozone treatment for stubborn smells, and specialized sealants for persistent cases. Our IICRC-certified technicians ensure your Brisbane property is completely odour-free."
            }
          }
        ]
      }
    ]
  };

  const fireResponseStages = [
    {
      stage: "Phone Triage",
      time: "Immediate",
      critical: true,
      actions: [
        "Emergency response team dispatch",
        "Safety assessment & securing",
        "Board-up & tarping",
        "Initial damage documentation"
      ]
    },
    {
      stage: "Urgent",
      time: "2-24 hours",
      critical: true,
      actions: [
        "Smoke & soot removal begins",
        "Water extraction (firefighting)",
        "Corrosion prevention",
        "Content inventory & pack-out"
      ]
    },
    {
      stage: "Restoration",
      time: "1-7 days",
      critical: false,
      actions: [
        "Deep cleaning all surfaces",
        "Odour elimination treatment",
        "Structural drying",
        "Electronics restoration"
      ]
    },
    {
      stage: "Rebuild",
      time: "1-4 weeks",
      critical: false,
      actions: [
        "Structural repairs",
        "Painting & refinishing",
        "Content restoration",
        "Final inspection"
      ]
    }
  ];

  const damageTypes = [
    {
      type: "Smoke & Soot",
      severity: "Immediate attention",
      effects: "Corrosion, staining, odour",
      icon: <Wind className="w-6 h-6" />,
      color: "text-gray-600"
    },
    {
      type: "Structural Fire",
      severity: "Major damage",
      effects: "Charring, weakening, collapse risk",
      icon: <Flame className="w-6 h-6" />,
      color: "text-red-600"
    },
    {
      type: "Water Damage",
      severity: "Secondary damage",
      effects: "From firefighting efforts",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "text-blue-600"
    },
    {
      type: "Heat Damage",
      severity: "Hidden damage",
      effects: "Warping, melting, discoloration",
      icon: <Thermometer className="w-6 h-6" />,
      color: "text-orange-600"
    }
  ];

  const insuranceCoverage = [
    { item: "Structure damage", covered: "Yes", notes: "Full replacement value" },
    { item: "Smoke & soot cleanup", covered: "Yes", notes: "Professional restoration" },
    { item: "Content restoration", covered: "Yes", notes: "Cleaning or replacement" },
    { item: "Temporary accommodation", covered: "Yes", notes: "While uninhabitable" },
    { item: "Emergency services", covered: "Yes", notes: "Board-up, tarping" },
    { item: "Debris removal", covered: "Yes", notes: "Complete cleanup" }
  ];

  const healthRisks = [
    {
      risk: "Toxic Smoke Residue",
      danger: "High",
      effects: "Respiratory issues, skin irritation",
      timeline: "Immediate"
    },
    {
      risk: "Asbestos Exposure",
      danger: "Severe",
      effects: "Long-term health risks",
      timeline: "During disturbance"
    },
    {
      risk: "Mould Growth",
      danger: "Moderate",
      effects: "Allergies, respiratory problems",
      timeline: "24-48 hours"
    },
    {
      risk: "Structural Instability",
      danger: "Severe",
      effects: "Collapse, injury risk",
      timeline: "Immediate"
    }
  ];

  return (
    <>
      <Script
        id="fire-damage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen">
        {/* Emergency Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-900 via-red-900 to-red-800 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Animated fire effect background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-red-600/30 to-transparent animate-pulse" />
          </div>

          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Emergency Alert Banner */}
              <motion.div 
                className="bg-red-600/30 border-2 border-red-400 rounded-lg p-4 mb-6 backdrop-blur-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Flame className="w-6 h-6 text-red-400 animate-pulse" />
                  <span className="font-bold text-lg">FIRE DAMAGE EMERGENCY - IMMEDIATE RESPONSE AVAILABLE</span>
                  <Flame className="w-6 h-6 text-red-400 animate-pulse" />
                </div>
              </motion.div>

              {/* Title and Urgency Messaging */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Emergency Fire Damage Brisbane
                <span className="block text-3xl md:text-4xl mt-2 text-orange-300">
                  Smoke • Soot • Fire • Water Damage Restoration
                </span>
              </h1>
              
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                <strong>TIME IS CRITICAL!</strong> Smoke and soot damage worsens every hour. 
                Our IICRC-certified fire restoration experts are standing by across Brisbane, 
                Ipswich, and Logan. Immediate response prevents permanent damage.
              </p>

              {/* Critical Warning */}
              <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                <p className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  WARNING: Smoke residue becomes permanent within 24-48 hours!
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">45min</div>
                  <div className="text-sm">Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">IICRC</div>
                  <div className="text-sm">Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Insured</div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="tel:1300309361"
                  className="bg-red-600 text-white px-8 py-5 rounded-lg font-bold text-xl hover:bg-red-700 transition-all inline-flex items-center justify-center gap-3 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  Call 1300 309 361 NOW
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-red-900 px-8 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-3 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-6 h-6" />
                  Insurance Claim Help
                </motion.a>
              </div>

              {/* Service Areas */}
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <Badge className="bg-orange-500/20 text-white border-orange-400">Brisbane CBD</Badge>
                <Badge className="bg-orange-500/20 text-white border-orange-400">North Brisbane</Badge>
                <Badge className="bg-orange-500/20 text-white border-orange-400">South Brisbane</Badge>
                <Badge className="bg-orange-500/20 text-white border-orange-400">Ipswich</Badge>
                <Badge className="bg-orange-500/20 text-white border-orange-400">Logan</Badge>
                <Badge className="bg-orange-500/20 text-white border-orange-400">Moreton Bay</Badge>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Health & Safety Warning */}
        <section className="py-12 bg-red-50 border-b-4 border-red-500">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                Critical Health & Safety Risks After Fire
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {healthRisks.map((risk, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white border-2 rounded-lg p-4 ${
                      risk.danger === 'Severe' ? 'border-red-500' :
                      risk.danger === 'High' ? 'border-orange-500' :
                      'border-yellow-500'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm">{risk.risk}</h3>
                      <Badge className={`text-xs ${
                        risk.danger === 'Severe' ? 'bg-red-100 text-red-700' :
                        risk.danger === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.danger}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{risk.effects}</p>
                    <p className="text-xs font-semibold">{risk.timeline}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-red-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-900">
                  ⚠️ DO NOT enter fire-damaged property until cleared by professionals. 
                  Structural damage and toxic residues pose serious health risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fire Damage Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Types of Fire Damage We Restore
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Comprehensive restoration for all fire-related damage
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {damageTypes.map((damage, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-orange-400 transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`${damage.color} mb-4`}>
                    {damage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{damage.type}</h3>
                  <p className="text-sm text-red-600 font-semibold mb-1">{damage.severity}</p>
                  <p className="text-sm text-gray-600">{damage.effects}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg">Kitchen Fires</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Grease & smoke removal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Appliance restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Cabinet refinishing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg">Electrical Fires</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Wiring assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Wall cavity cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Electrical safety check</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg">Bushfire Smoke</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Whole-house treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>HVAC decontamination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Air quality restoration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Response Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Critical Fire Damage Response Timeline
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Every hour matters - smoke and soot damage accelerates rapidly
            </p>

            <div className="max-w-6xl mx-auto">
              <div className="space-y-6">
                {fireResponseStages.map((stage, index) => (
                  <motion.div
                    key={index}
                    className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                      stage.critical ? 'border-l-8 border-red-500' : 'border-l-8 border-blue-500'
                    }`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{stage.stage}</h3>
                          <Badge className={`mt-2 ${
                            stage.critical ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {stage.time}
                          </Badge>
                        </div>
                        {stage.critical && (
                          <Badge className="bg-red-600 text-white animate-pulse">
                            CRITICAL
                          </Badge>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {stage.actions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Why Immediate Response Matters
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong className="text-orange-700">Within Minutes:</strong>
                    <p>Soot settles causing permanent staining</p>
                  </div>
                  <div>
                    <strong className="text-orange-700">Within Hours:</strong>
                    <p>Acid residues corrode metals & etch glass</p>
                  </div>
                  <div>
                    <strong className="text-orange-700">Within Days:</strong>
                    <p>Permanent discoloration & corrosion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Coverage Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Insurance Coverage for Fire Damage
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              We work with all major insurers - No upfront costs
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      What's Typically Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insuranceCoverage.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.item}</p>
                            <p className="text-xs text-gray-600">{item.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      Our Insurance Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <p className="font-semibold text-sm">Immediate Documentation</p>
                          <p className="text-xs text-gray-600">Photos, videos, detailed inventory</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <p className="font-semibold text-sm">Direct Insurer Billing</p>
                          <p className="text-xs text-gray-600">We handle all paperwork</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <p className="font-semibold text-sm">Adjuster Coordination</p>
                          <p className="text-xs text-gray-600">Meet on-site, provide reports</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <p className="font-semibold text-sm">Claim Advocacy</p>
                          <p className="text-xs text-gray-600">Ensure fair settlement</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Preferred Provider for Major Insurers</h3>
                <p className="text-sm text-gray-600 mb-3">
                  We're approved by Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-white">Suncorp</Badge>
                  <Badge className="bg-white">RACQ</Badge>
                  <Badge className="bg-white">Allianz</Badge>
                  <Badge className="bg-white">QBE</Badge>
                  <Badge className="bg-white">NRMA</Badge>
                  <Badge className="bg-white">Budget Direct</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Brisbane Fire Damage Success Stories
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Real emergencies, complete restorations
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-500 text-white p-4">
                  <h3 className="font-bold text-lg">Kitchen Fire - Toowong</h3>
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Grease fire destroyed our kitchen. They arrived in 40 minutes at 11pm, 
                    secured everything, and had the smoke smell gone within days. Insurance 
                    covered everything. Kitchen looks better than before!"
                  </p>
                  <p className="font-semibold">- Michael & Lisa Chen</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge>Response: 40 min</Badge>
                    <Badge>Full restoration</Badge>
                    <Badge>Insurance approved</Badge>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-500 text-white p-4">
                  <h3 className="font-bold text-lg">Electrical Fire - Springfield</h3>
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Wiring fault caused fire in walls. Their team found hidden damage we 
                    didn't know about, prevented future problems. Worked perfectly with 
                    our insurance. Highly professional."
                  </p>
                  <p className="font-semibold">- David Thompson</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge>Hidden damage found</Badge>
                    <Badge>Safety certified</Badge>
                    <Badge>45 min response</Badge>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-500 text-white p-4">
                  <h3 className="font-bold text-lg">House Fire - Logan</h3>
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Major fire damage to half our home. They coordinated everything - 
                    emergency accommodation, contents restoration, complete rebuild. 
                    Couldn't have managed without them."
                  </p>
                  <p className="font-semibold">- The Williams Family</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge>Major restoration</Badge>
                    <Badge>Full project management</Badge>
                    <Badge>3-month rebuild</Badge>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-500 text-white p-4">
                  <h3 className="font-bold text-lg">Bushfire Smoke - Brisbane</h3>
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "2019 bushfire smoke filled our home. They cleaned everything - 
                    carpets, curtains, air conditioning. No trace of smoke smell remains. 
                    Fantastic service during a difficult time."
                  </p>
                  <p className="font-semibold">- Jennifer Park</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge>Smoke elimination</Badge>
                    <Badge>HVAC cleaning</Badge>
                    <Badge>Air quality restored</Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-gradient-to-br from-red-900 via-orange-900 to-red-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Flame className="w-16 h-16 text-orange-400 mx-auto mb-6 animate-pulse" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Fire Damage Emergency?
                <span className="block text-orange-400 mt-2">Act Now - Damage Worsens Every Hour!</span>
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Smoke and soot are causing permanent damage RIGHT NOW. Our Brisbane fire 
                restoration experts are standing by with immediate response capabilities.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">What We Do Immediately:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Secure & protect your property</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Stop soot & smoke spreading</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Document for insurance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Begin restoration process</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:1300309361"
                  className="bg-white text-red-900 px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-3 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  1300 309 361
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-orange-500 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-orange-600 transition-all inline-flex items-center justify-center gap-3 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-6 h-6" />
                  Start Claim
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>45-minute response • Brisbane • Ipswich • Logan • 24/7 Emergency Service</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}