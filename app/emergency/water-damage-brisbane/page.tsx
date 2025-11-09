'use client';

import { motion } from 'framer-motion';
import {
  Droplets, Clock, Shield, AlertTriangle, CheckCircle,
  Phone, ArrowRight, MapPin, Zap, Star, FileText,
  Activity, Award, Timer, WavesIcon as Wave
} from 'lucide-react';
import Script from 'next/script';
import { FluidCTA, FluidCTAGroup } from '@/components/fluid-cta/FluidCTA';
import { FluidEmergencyBanner } from '@/components/fluid-cta/FluidEmergencyBanner';
import { FluidFloatingCTA } from '@/components/fluid-cta/FluidFloatingCTA';
import { aaaCompliantTokens } from '@/config/design-tokens-aaa-compliant';
import StructuredData from '@/components/seo/StructuredData';

export default function EmergencyWaterDamageBrisbanePage() {
  const faqs = [
    {
      question: "What should I do immediately when I discover water damage?",
      answer: "Call 1300 309 361 immediately - even before your insurer. Turn off water source if safe. Don't use electrical appliances. Move valuables to dry areas. Our team arrives within 60 minutes with extraction equipment."
    },
    {
      question: "How quickly does mould grow after water damage?",
      answer: "Mould can begin growing within 24-48 hours after water damage. This is why our 60-minute emergency response is critical. We extract water immediately and deploy industrial dehumidifiers to prevent mould growth."
    },
    {
      question: "Will insurance cover emergency water damage restoration?",
      answer: "Most policies cover sudden accidental water damage like burst pipes and storms. We work directly with all major insurers - Suncorp, RACQ, Allianz, QBE, NRMA. We handle direct billing and claim documentation. No upfront costs for approved insurance work."
    }
  ];

  const immediateActionSteps = [
    {
      name: "Call Emergency Line Immediately",
      text: "Call 1300 309 361 for immediate dispatch. Our IICRC Master Restorer team will guide you through safety steps while dispatching emergency equipment."
    },
    {
      name: "Stop Water Source If Safe",
      text: "Turn off water main if possible. For burst pipes, close the nearest valve. Don't risk safety - our team arrives within 60 minutes."
    },
    {
      name: "Emergency Water Extraction",
      text: "Our team arrives with truck-mounted pumps and portable extractors. Immediate water removal begins to minimize damage and prevent mould."
    },
    {
      name: "Assessment & Drying Setup",
      text: "Thermal imaging identifies hidden moisture. Industrial dehumidifiers and air movers deployed. Insurance documentation begins immediately."
    }
  ];

  const damageTimeline = [
    {
      time: "0-1 Hours",
      impact: "Critical",
      actions: ["Water spreads rapidly", "Carpet absorption begins", "Electrical hazards develop"],
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-emergency-700 to-emergency-800"
    },
    {
      time: "1-24 Hours",
      impact: "Severe",
      actions: ["Drywall swelling starts", "Metal begins to rust", "Furniture staining occurs"],
      icon: <Clock className="w-6 h-6" />,
      color: "from-warning-700 to-warning-800"
    },
    {
      time: "24-48 Hours",
      impact: "Major",
      actions: ["Mould growth begins", "Wood warping accelerates", "Structural damage starts"],
      icon: <Wave className="w-6 h-6" />,
      color: "from-warning-600 to-warning-700"
    },
    {
      time: "48+ Hours",
      impact: "Catastrophic",
      actions: ["Extensive mould colonies", "Permanent structural damage", "Total replacement needed"],
      icon: <Activity className="w-6 h-6" />,
      color: "from-neutral-700 to-neutral-800"
    }
  ];

  const immediateActions = [
    {
      step: 1,
      title: "STOP the Water Source",
      description: "Turn off water main if burst pipe. Close taps. Stop the flow immediately.",
      urgent: true,
      icon: <Droplets className="w-8 h-8" />
    },
    {
      step: 2,
      title: "CALL 1300 309 361 NOW",
      description: "Don't wait. Our emergency team responds within 60 minutes across Brisbane.",
      urgent: true,
      icon: <Phone className="w-8 h-8" />
    },
    {
      step: 3,
      title: "Document Everything",
      description: "Take photos and videos for insurance. We'll guide you through this process.",
      urgent: false,
      icon: <FileText className="w-8 h-8" />
    },
    {
      step: 4,
      title: "Remove Valuables",
      description: "Move furniture, electronics, documents to dry areas. Protect what you can.",
      urgent: false,
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const firstResponse = [
    {
      title: "Arrival & Assessment",
      time: "Minutes 0-15",
      tasks: [
        "Safety inspection - electrical, structural",
        "Water category identification (clean/grey/black)",
        "Moisture mapping with thermal imaging",
        "Scope of damage documentation"
      ]
    },
    {
      title: "Emergency Extraction",
      time: "Minutes 15-60",
      tasks: [
        "Truck-mounted extraction deployment",
        "Standing water removal",
        "Content protection and relocation",
        "Initial drying equipment setup"
      ]
    },
    {
      title: "Stabilization",
      time: "Hour 1-4",
      tasks: [
        "Industrial dehumidifiers installed",
        "Air movers strategically placed",
        "Antimicrobial treatment applied",
        "Monitoring equipment installed"
      ]
    }
  ];

  const coverageAreas = [
    {
      region: "Brisbane CBD & Inner City",
      response: "45 min",
      suburbs: ["Brisbane CBD", "South Brisbane", "West End", "Fortitude Valley", "New Farm", "Teneriffe", "Spring Hill", "Paddington"],
      color: "primary-700"
    },
    {
      region: "Brisbane North",
      response: "60 min",
      suburbs: ["Chermside", "Aspley", "Kedron", "Nundah", "Clayfield", "Ascot", "Hamilton", "Stafford"],
      color: "primary-700"
    },
    {
      region: "Brisbane South",
      response: "60 min",
      suburbs: ["Carindale", "Mount Gravatt", "Holland Park", "Coorparoo", "Camp Hill", "Greenslopes", "Woolloongabba"],
      color: "primary-700"
    },
    {
      region: "Brisbane West",
      response: "55 min",
      suburbs: ["Toowong", "Indooroopilly", "Taringa", "Kenmore", "Chapel Hill", "Fig Tree Pocket", "Jindalee"],
      color: "primary-700"
    },
    {
      region: "Ipswich",
      response: "60 min",
      suburbs: ["Ipswich CBD", "Springfield", "Redbank Plains", "Goodna", "Yamanto", "Booval", "Bundamba"],
      color: "success-700"
    },
    {
      region: "Logan",
      response: "60 min",
      suburbs: ["Logan Central", "Springwood", "Woodridge", "Beenleigh", "Browns Plains", "Loganholme", "Eagleby"],
      color: "warning-700"
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData
        page="emergency"
        service={{
          name: "24/7 Emergency Water Damage Brisbane",
          description: "60-minute emergency water damage restoration in Brisbane, Ipswich, Logan. IICRC Master Restorer certified. Insurance approved. Immediate response for flooding, burst pipes, storm damage.",
          serviceType: "Emergency Water Damage Restoration",
          url: "https://disasterrecovery.com.au/emergency/water-damage-brisbane"
        }}
        faqs={faqs}
        howTo={{
          name: "Emergency Water Damage Response",
          description: "Immediate actions to take during a water damage emergency in Brisbane",
          totalTime: "PT1H",
          steps: immediateActionSteps
        }}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Emergency", url: "https://disasterrecovery.com.au/emergency" },
          { name: "Water Damage Brisbane", url: "https://disasterrecovery.com.au/emergency/water-damage-brisbane" }
        ]}
      />

      {/* Floating Emergency Banner - Sticky Top */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="WATER EMERGENCY BRISBANE - CALL NOW - 60-MIN RESPONSE"
        sticky
      />

      <div className="min-h-screen">
        {/* URGENT Hero Section - Emergency Red Theme */}
        <section className="relative bg-gradient-to-br from-emergency-700 via-emergency-800 to-emergency-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />

          {/* Animated water ripple effect */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/30 to-primary-600/40"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              style={{ backgroundSize: '400% 400%' }}
            />
          </div>

          <motion.div
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto text-center">
              {/* Emergency Pulse Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-yellow-400/20 border-2 border-yellow-300 rounded-full px-6 py-3 mb-6 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertTriangle className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <span className="font-bold text-lg text-yellow-100">WATER DAMAGE EMERGENCY</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Brisbane Water Damage?
                <span className="block text-4xl md:text-5xl mt-3 text-red-200">
                  60-Minute Emergency Response
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-red-100 mb-4 leading-relaxed max-w-3xl mx-auto">
                Every minute counts when water damage strikes. Our IICRC Master Restorer teams
                are ready NOW with truck-mounted extraction equipment.
              </p>

              <p className="text-lg text-yellow-200 mb-10 font-semibold">
                Available 24/7/365 - Brisbane, Ipswich, Logan - Insurance Direct Billing
              </p>

              {/* Emergency CTAs */}
              <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
                <FluidCTA
                  text="CALL 1300 309 361"
                  href="tel:1300309361"
                  variant="emergency"
                  size="xl"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                  className="bg-white text-emergency-700 hover:bg-gray-100 shadow-2xl text-2xl px-12 py-6"
                />
                <FluidCTA
                  text="Online Emergency Claim"
                  href="/claim"
                  variant="secondary"
                  size="xl"
                  icon="arrow"
                  magnetic
                  ripple
                  className="bg-white/10 backdrop-blur-md border-2 border-white hover:bg-white/20"
                />
              </FluidCTAGroup>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Timer className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">60 min</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">Master</div>
                  <div className="text-sm opacity-90">IICRC Certified</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Always Available</div>
                </motion.div>
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Insurance Approved</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EVERY MINUTE COUNTS - Damage Timeline */}
        <section className="py-16 bg-white border-t-4 border-emergency-700">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: aaaCompliantTokens.colors.neutral[900] }}>
                  Every Minute Counts
                </h2>
                <p className="text-xl" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Water damage escalates rapidly. Here's what happens if you wait:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6">
                {damageTimeline.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`h-full bg-gradient-to-br ${phase.color} text-white rounded-xl p-6 shadow-lg`}>
                      <div className="flex items-center gap-3 mb-4">
                        {phase.icon}
                        <div>
                          <div className="text-2xl font-bold">{phase.time}</div>
                          <div className="text-sm opacity-90">{phase.impact}</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {phase.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-10 bg-emergency-50 border-2 border-emergency-700 rounded-xl p-8 text-center"
              >
                <Zap className="w-12 h-12 mx-auto mb-4 text-emergency-700" />
                <h3 className="text-2xl font-bold mb-3" style={{ color: aaaCompliantTokens.colors.emergency[700] }}>
                  Don't Let It Escalate
                </h3>
                <p className="text-lg mb-6" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Within 48 hours, water damage becomes exponentially worse and more expensive.
                  Act NOW to minimize damage and costs.
                </p>
                <FluidCTA
                  text="Get Immediate Help - Call Now"
                  href="tel:1300309361"
                  variant="emergency"
                  size="lg"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* IMMEDIATE ACTION STEPS */}
        <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  What To Do RIGHT NOW
                </h2>
                <p className="text-xl opacity-90">
                  Follow these steps immediately while help is on the way
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {immediateActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 ${
                      action.urgent ? 'border-yellow-300' : 'border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                        action.urgent ? 'bg-yellow-400 text-primary-900' : 'bg-white/20 text-white'
                      }`}>
                        <span className="text-2xl font-bold">{action.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                          {action.title}
                          {action.urgent && (
                            <span className="text-xs bg-yellow-400 text-primary-900 px-2 py-1 rounded-full font-bold">
                              URGENT
                            </span>
                          )}
                        </h3>
                        <p className="opacity-90">{action.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-white/50">
                        {action.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO FIRST - Emergency Response */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: aaaCompliantTokens.colors.neutral[900] }}>
                  What We Do First
                </h2>
                <p className="text-xl" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Our 60-minute emergency response protocol
                </p>
              </motion.div>

              <div className="space-y-6">
                {firstResponse.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-primary-200 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-primary-700 to-primary-800 text-white px-6 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{phase.title}</h3>
                        <div className="bg-white/20 px-4 py-2 rounded-full font-bold">
                          {phase.time}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success-700 flex-shrink-0 mt-0.5" />
                            <span style={{ color: aaaCompliantTokens.colors.neutral[700] }}>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
              >
                <FluidCTAGroup layout="horizontal" spacing="md" align="center">
                  <FluidCTA
                    text="Emergency Call: 1300 309 361"
                    href="tel:1300309361"
                    variant="emergency"
                    size="lg"
                    icon="phone"
                    magnetic
                    ripple
                    pulse
                  />
                  <FluidCTA
                    text="Learn About Our Process"
                    href="/services/water-damage-restoration"
                    variant="primary"
                    size="lg"
                    icon="arrow"
                    magnetic
                  />
                </FluidCTAGroup>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COVERAGE AREAS - 60-Min Response */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: aaaCompliantTokens.colors.neutral[900] }}>
                  60-Minute Response Across Brisbane
                </h2>
                <p className="text-xl" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Fast emergency coverage for all Brisbane, Ipswich, and Logan suburbs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {coverageAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-primary-700 transition-all overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r from-${area.color} to-primary-800 text-white px-6 py-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <MapPin className="w-6 h-6" />
                        <div className="bg-yellow-300 text-primary-900 px-3 py-1 rounded-full text-sm font-bold">
                          {area.response}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">{area.region}</h3>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2">
                        {area.suburbs.map((suburb, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                            style={{ color: aaaCompliantTokens.colors.neutral[700] }}
                          >
                            {suburb}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 bg-primary-50 border-2 border-primary-700 rounded-xl p-6 text-center"
              >
                <p className="text-lg font-semibold mb-2" style={{ color: aaaCompliantTokens.colors.primary[700] }}>
                  Don't see your suburb? We cover 180+ Brisbane metro locations.
                </p>
                <p style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Call 1300 309 361 to confirm coverage and response time for your area.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 24/7/365 AVAILABILITY */}
        <section className="py-20 bg-gradient-to-br from-emergency-700 via-emergency-800 to-primary-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />

          <motion.div
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Clock className="w-20 h-20 text-yellow-300" />
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Available 24/7/365
              </h2>

              <p className="text-2xl mb-4 leading-relaxed">
                Water damage doesn't wait for business hours. Neither do we.
              </p>

              <p className="text-xl opacity-90 mb-10">
                Christmas Day. 3 AM Sunday. Public holidays. Storm season.
                We're always ready with fully equipped emergency response teams.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold mb-2">24 Hours</div>
                  <div className="opacity-90">Every day, all day</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold mb-2">7 Days</div>
                  <div className="opacity-90">Including weekends</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold mb-2">365 Days</div>
                  <div className="opacity-90">Including holidays</div>
                </div>
              </div>

              <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
                <FluidCTA
                  text="CALL NOW: 1300 309 361"
                  href="tel:1300309361"
                  variant="emergency"
                  size="xl"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                  className="bg-white text-emergency-700 hover:bg-gray-100 shadow-2xl"
                />
              </FluidCTAGroup>

              <p className="mt-6 text-sm opacity-75">
                IICRC Master Restorer | All Major Insurers | Direct Billing Available
              </p>
            </div>
          </motion.div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-gray-50 border-t-4 border-emergency-700">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-emergency-700" />

                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: aaaCompliantTokens.colors.neutral[900] }}>
                  Water Damage Emergency?
                  <span className="block text-3xl mt-2" style={{ color: aaaCompliantTokens.colors.emergency[700] }}>
                    Every Second Counts
                  </span>
                </h2>

                <p className="text-xl mb-8" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  Don't risk permanent damage and skyrocketing costs. Our emergency teams are
                  standing by with truck-mounted extraction equipment ready to deploy.
                </p>

                <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
                  <FluidCTA
                    text="Emergency: 1300 309 361"
                    href="tel:1300309361"
                    variant="emergency"
                    size="xl"
                    icon="phone"
                    magnetic
                    ripple
                    pulse
                  />
                  <FluidCTA
                    text="Submit Emergency Claim"
                    href="/claim"
                    variant="primary"
                    size="xl"
                    icon="arrow"
                    magnetic
                    ripple
                  />
                </FluidCTAGroup>

                <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm" style={{ color: aaaCompliantTokens.colors.neutral[600] }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-700" />
                    <span>60-Min Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-700" />
                    <span>IICRC Master Restorer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-700" />
                    <span>Insurance Direct Billing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-700" />
                    <span>24/7/365 Available</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating CTA - Appears on scroll */}
      <FluidFloatingCTA
        phone="1300 309 361"
        showAfterScroll={400}
        position="bottom-right"
      />
    </>
  );
}
