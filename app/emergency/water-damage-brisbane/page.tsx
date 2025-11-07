'use client';

import { motion } from 'framer-motion';
import {
  Droplets, Clock, Shield, AlertTriangle, CheckCircle,
  Phone, ArrowRight, MapPin, Users, Building, Home,
  Zap, TrendingUp, Star, FileText, DollarSign, Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';

export default function EmergencyWaterDamageBrisbanePage() {
  // Comprehensive schema for emergency water damage SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "@id": "https://disaster-recovery-seven.vercel.app/emergency/water-damage-brisbane#emergency",
        "name": "24/7 Emergency Water Damage Brisbane",
        "description": "Priority-based water damage restoration in Brisbane, Ipswich, Logan. Immediate phone triage assessment. IICRC certified. Insurance approved. Flood extraction, burst pipes, storm damage.",
        "serviceType": "Water Damage Restoration",
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
          "serviceUrl": "https://disaster-recovery-seven.vercel.app/emergency/water-damage-brisbane",
          "servicePhone": "+61-1300-309-361",
          "availableLanguage": "English"
        },
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "opens": "00:00",
          "closes": "23:59",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does your emergency triage system work for water damage in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our immediate phone triage system assesses your damage severity to prioritize response. Critical situations (active flooding, ceiling collapse risk) receive priority dispatch. We schedule attendance based on urgency level - critical within hours, urgent same day, standard within 24-48 hours. This ensures those with the most severe damage get help first."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in emergency water damage restoration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our emergency service includes: immediate water extraction, structural drying, moisture mapping, mould prevention treatment, content protection, insurance documentation, and complete restoration. We handle everything from burst pipes to major floods, providing turnkey solutions with guaranteed results."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with insurance companies in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we're approved by all major insurers including Suncorp, RACQ, Allianz, and QBE. We handle direct billing, provide detailed documentation, and manage the entire claim process. Our assessors create comprehensive reports that expedite claim approval."
            }
          },
          {
            "@type": "Question",
            "name": "What areas of Brisbane do you service for water damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Brisbane suburbs including CBD, West End, New Farm, Toowong, Indooroopilly, Chermside, Carindale, plus Ipswich (Springfield, Redbank Plains) and Logan (Springwood, Beenleigh). Our coverage extends from Moreton Bay to Gold Coast hinterland."
            }
          },
          {
            "@type": "Question",
            "name": "How much does emergency water damage restoration cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Emergency water damage restoration typically ranges from $1,500-$8,000 depending on severity. Category 1 (clean water): $1,500-$3,500. Category 2 (grey water): $2,500-$5,000. Category 3 (black water): $4,000-$8,000+. Most insurance policies cover water damage restoration."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Water Damage Restoration",
        "provider": {
          "@type": "Organization",
          "name": "National Restoration Projects"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Water Damage Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Water Extraction",
                "description": "Immediate water removal using truck-mounted extraction units"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Structural Drying",
                "description": "Industrial dehumidification and air movement"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Flood Damage Restoration",
                "description": "Complete flood recovery including sanitization"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "847",
          "bestRating": "5"
        }
      }
    ]
  };

  const waterDamageTypes = [
    {
      category: "Category 1 - Clean Water",
      sources: "Burst pipes, water heater failure, rainwater",
      urgency: "24-48 hours before escalation",
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      color: "border-blue-500 bg-blue-50"
    },
    {
      category: "Category 2 - Grey Water",
      sources: "Washing machine overflow, dishwasher leak, sump pump",
      urgency: "12-24 hours before health risk",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      color: "border-yellow-500 bg-yellow-50"
    },
    {
      category: "Category 3 - Black Water",
      sources: "Sewage backup, flood water, ground water",
      urgency: "Immediate health hazard",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      color: "border-red-500 bg-red-50"
    }
  ];

  const emergencyProcess = [
    {
      step: 1,
      time: "Immediate",
      title: "Phone Triage Assessment",
      actions: ["Assess damage severity", "Determine priority level", "Safety guidance provided", "Schedule appropriate response"]
    },
    {
      step: 2,
      time: "Priority-based",
      title: "On-site Attendance",
      actions: ["Critical: Within hours", "Urgent: Same day", "Standard: 24-48 hours", "Detailed assessment"]
    },
    {
      step: 3,
      time: "Upon arrival",
      title: "Water Extraction",
      actions: ["Deploy extraction equipment", "Remove standing water", "Protect contents", "Begin moisture mapping"]
    },
    {
      step: 4,
      time: "24-72 hours",
      title: "Monitoring & Restoration",
      actions: ["Daily moisture readings", "Adjust equipment", "Insurance coordination", "Begin repairs"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "West End, Brisbane",
      damage: "2022 Flood - Entire ground floor",
      quote: "Phone triage identified us as critical priority during floods. Team arrived same day and saved our home. Insurance handled perfectly.",
      rating: 5
    },
    {
      name: "James Chen",
      location: "Springfield, Ipswich",
      damage: "Burst pipe - 3 rooms affected",
      quote: "Called at 2am with burst pipe. Phone assessment was thorough, scheduled for first thing morning. Professional and efficient.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      location: "Springwood, Logan",
      damage: "Storm damage - Roof leak",
      quote: "Immediate response during storm. Tarped roof, extracted water, prevented major damage. Highly recommended!",
      rating: 5
    }
  ];

  const costFactors = [
    { factor: "Water category", impact: "High", description: "Clean vs contaminated water" },
    { factor: "Affected area", impact: "High", description: "Square metres requiring restoration" },
    { factor: "Response time", impact: "Medium", description: "Faster response = less damage" },
    { factor: "Materials affected", impact: "High", description: "Carpet, timber, drywall damage" },
    { factor: "Mould risk", impact: "Medium", description: "Humidity and temperature factors" },
    { factor: "Contents restoration", impact: "Variable", description: "Furniture and belongings affected" }
  ];

  return (
    <>
      <Script
        id="water-damage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen">
        {/* Emergency Hero Section */}
        <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Animated water effect background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-blue-600/30 animate-pulse" />
          </div>

          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Emergency Alert Banner */}
              <motion.div 
                className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4 mb-6 backdrop-blur-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="font-bold text-lg">EMERGENCY WATER DAMAGE? CALL FOR IMMEDIATE TRIAGE</span>
                  <AlertTriangle className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              </motion.div>

              {/* Title and Urgency Messaging */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Emergency Water Damage Brisbane
                <span className="block text-3xl md:text-4xl mt-2 text-red-300">
                  Priority Triage System • 24/7 • Insurance Approved
                </span>
              </h1>
              
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                <strong>IMMEDIATE PHONE TRIAGE ASSESSMENT!</strong> Our experts assess your damage severity
                over the phone to prioritize response. Critical situations receive priority dispatch, while
                we schedule appropriate attendance times based on your specific urgency level.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">Triage</div>
                  <div className="text-sm">Priority System</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Always Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm">5-Star Reviews</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Insurance Work</div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="tel:1300309361"
                  className="bg-green-500 text-white px-8 py-5 rounded-lg font-bold text-xl hover:bg-green-600 transition-all inline-flex items-center justify-center gap-3 shadow-lg"
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
                  Submit Online Claim
                </motion.a>
              </div>

              {/* Location Bar */}
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <Badge className="bg-blue-500/20 text-white border-blue-400">Brisbane CBD</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">West End</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">New Farm</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">Toowong</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">Ipswich</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">Logan</Badge>
                <Badge className="bg-blue-500/20 text-white border-blue-400">+ 180 Suburbs</Badge>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Water Damage Categories */}
        <section className="py-12 bg-gray-50 border-b-4 border-red-500">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Water Damage Categories - Act Fast!</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {waterDamageTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className={`border-2 rounded-lg p-6 ${type.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {type.icon}
                    <h3 className="font-bold text-lg">{type.category}</h3>
                  </div>
                  <p className="text-sm mb-2"><strong>Sources:</strong> {type.sources}</p>
                  <p className="text-sm font-semibold text-red-600">{type.urgency}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-lg font-semibold text-red-600">
                ⚠️ Water damage escalates rapidly - Category 1 becomes Category 2 within 48 hours!
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Response Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Our Emergency Response Process
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Brisbane's fastest water damage response - Every second counts in minimizing damage
            </p>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {emergencyProcess.map((phase, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl font-bold text-blue-600">{phase.step}</span>
                        <Badge className="bg-red-100 text-red-700">{phase.time}</Badge>
                      </div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {index < emergencyProcess.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Why Speed Matters
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>0-24 hours:</strong> Prevent mould growth, salvage most contents
                </div>
                <div>
                  <strong>24-48 hours:</strong> Mould begins, structural damage increases
                </div>
                <div>
                  <strong>48+ hours:</strong> Extensive mould, major structural issues
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas with Response Times */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Brisbane Water Damage Response Times
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Guaranteed rapid response across Brisbane, Ipswich, and Logan
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Brisbane */}
              <Card className="border-2 border-blue-500">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Brisbane
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-semibold">CBD & Inner</span>
                      <Badge className="bg-green-100 text-green-700">45 min</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Priority zones:</strong> CBD, South Brisbane, West End, New Farm, Fortitude Valley</p>
                      <p><strong>North:</strong> Chermside, Aspley, Kedron (60 min)</p>
                      <p><strong>South:</strong> Carindale, Mount Gravatt (60 min)</p>
                      <p><strong>West:</strong> Toowong, Indooroopilly (55 min)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ipswich */}
              <Card className="border-2 border-purple-500">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Ipswich
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-semibold">Central Ipswich</span>
                      <Badge className="bg-green-100 text-green-700">60 min</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Priority zones:</strong> Ipswich CBD, Booval, Bundamba</p>
                      <p><strong>Springfield:</strong> Springfield Central, Lakes (65 min)</p>
                      <p><strong>Redbank:</strong> Redbank Plains, Goodna (70 min)</p>
                      <p><strong>Yamanto:</strong> Yamanto, Flinders View (65 min)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logan */}
              <Card className="border-2 border-orange-500">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Logan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-semibold">Logan Central</span>
                      <Badge className="bg-green-100 text-green-700">60 min</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Priority zones:</strong> Logan Central, Woodridge, Springwood</p>
                      <p><strong>Beenleigh:</strong> Beenleigh, Eagleby (65 min)</p>
                      <p><strong>Browns Plains:</strong> Browns Plains, Regents Park (60 min)</p>
                      <p><strong>Shailer Park:</strong> Shailer Park, Loganholme (65 min)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cost Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Water Damage Restoration Costs Brisbane
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Transparent pricing - Most claims fully covered by insurance
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Typical Cost Ranges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b">
                        <span>Minor (1-2 rooms)</span>
                        <span className="font-semibold">$1,500 - $3,500</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span>Moderate (3-4 rooms)</span>
                        <span className="font-semibold">$3,500 - $6,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span>Major (whole floor)</span>
                        <span className="font-semibold">$6,000 - $12,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Severe (multiple floors)</span>
                        <span className="font-semibold">$12,000+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Insurance Coverage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-sm">Direct billing to all major insurers</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-sm">We handle claim documentation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-sm">Detailed photo/moisture reports</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-sm">Work with your adjuster</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-sm">No upfront payment required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cost Factors */}
              <Card>
                <CardHeader>
                  <CardTitle>Factors Affecting Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {costFactors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          factor.impact === 'High' ? 'bg-red-100 text-red-700' :
                          factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {factor.impact}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{factor.factor}</p>
                          <p className="text-xs text-gray-600">{factor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Brisbane Water Damage Success Stories
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Real emergencies, real results, real reviews
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <p className="text-xs text-blue-600 mt-1">{testimonial.damage}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-lg font-semibold">847+ Five-Star Reviews</p>
              <p className="text-gray-600">Trusted by Brisbane families and businesses since 1974</p>
            </div>
          </div>
        </section>

        {/* Emergency CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Water Damage Emergency?
                <span className="block text-yellow-400 mt-2">Don't Wait - Call Now!</span>
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Every minute of delay means more damage, higher costs, and increased health risks. 
                Our Brisbane teams are ready NOW with truck-mounted extraction equipment.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold">45-Min Response</p>
                      <p className="text-sm opacity-90">Fastest in Brisbane</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold">IICRC Certified</p>
                      <p className="text-sm opacity-90">Trained professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Insurance Approved</p>
                      <p className="text-sm opacity-90">Direct billing available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:1300309361"
                  className="bg-green-500 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-green-600 transition-all inline-flex items-center justify-center gap-3 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  1300 309 361
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-3 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-6 h-6" />
                  Online Claim
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Available 24/7 • Brisbane • Ipswich • Logan • All Suburbs</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}