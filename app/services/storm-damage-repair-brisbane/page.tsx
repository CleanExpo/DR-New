'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Wind,
  Zap,
  Cloud,
  AlertTriangle,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Phone,
  MapPin,
  Home,
  Building2,
  Droplets,
  TreeDeciduous,
  Hammer,
  FileText,
} from 'lucide-react';
import {
  FluidCTA,
  FluidCTAGroup,
  FluidEmergencyBanner,
  FluidFloatingCTA,
} from '@/components/fluid-cta';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  emergencyPulse,
  colors,
  typography,
  spacing,
} from '@/lib/design-system';
import StructuredData from '@/components/seo/StructuredData';

// Metadata will be generated separately - this is a client component
export default function StormDamageRepairBrisbanePage() {
  const faqs = [
    {
      question: "How quickly can you respond to storm damage in Brisbane?",
      answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, and Toowong during storm events. Our Master Restorer team deploys immediately with emergency tarping materials, generators, water extraction equipment, and debris removal capabilities. Available 24/7/365 including during active storm systems."
    },
    {
      question: "What types of storm damage do you repair in Brisbane?",
      answer: "We handle all storm damage: roof damage from hail and wind, fallen trees, water intrusion from severe storms, structural damage, broken windows and doors, gutter damage, emergency board-up, temporary repairs, debris removal, and complete restoration. Brisbane's storm season (November-March) brings severe weather requiring immediate emergency response."
    },
    {
      question: "Do you provide emergency tarping and board-up services?",
      answer: "Yes, emergency tarping and board-up is our immediate response priority. We arrive within 60 minutes with industrial tarps, plywood, generators, and equipment to secure your property from further weather damage. This prevents additional water intrusion, protects contents, and maintains safety until permanent repairs can be completed."
    },
    {
      question: "Does insurance cover storm damage repairs?",
      answer: "Most insurance policies cover sudden storm damage including wind, hail, fallen trees, and storm water intrusion. We work directly with all major insurers including Suncorp, RACQ, Allianz, and QBE. Our Master Restorer provides detailed damage assessment, storm event documentation, and scope of works. Direct billing available - no upfront costs for insurance work."
    },
    {
      question: "How long do storm damage repairs take in Brisbane?",
      answer: "Emergency tarping and water extraction happen within hours. Minor roof repairs take 1-3 days. Major structural damage requiring full restoration can take 1-4 weeks depending on extent. Brisbane's storm season timing affects material availability and repair schedules. We prioritize making your property safe and weatherproof immediately, then complete permanent restoration."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: "Storm Damage Repair Brisbane",
          description: "24/7 emergency storm damage repair Brisbane. IICRC Master Restorer. Roof damage, fallen trees, hail damage, emergency tarping. 60-minute response. Insurance approved.",
          serviceType: "Storm Damage Repair Services",
          url: "https://disasterrecovery.com.au/services/storm-damage-repair-brisbane",
          offers: {
            price: "1800",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Services", url: "https://disasterrecovery.com.au/services" },
          { name: "Storm Damage Repair Brisbane", url: "https://disasterrecovery.com.au/services/storm-damage-repair-brisbane" }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="Storm Damage Emergency - 60-Min Response Brisbane 24/7"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Response Section */}
      <EmergencyResponseSection />

      {/* Brisbane Storm Season */}
      <BrisbaneStormSeasonSection />

      {/* Types of Storm Damage */}
      <StormDamageTypesSection />

      {/* Emergency Tarping & Board-Up */}
      <EmergencyTarpingSection />

      {/* Repair Process */}
      <RepairProcessSection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* Why Choose Master Restorer */}
      <WhyChooseSection />

      {/* Insurance Support */}
      <InsuranceSupportSection />

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Floating CTA */}
      <FluidFloatingCTA
        phone="1300 309 361"
        showAfterScroll={400}
        position="bottom-right"
      />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <motion.section
      className="relative min-h-[600px] flex items-center justify-center text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/optimized/damage/3D-Storm-Damage.webp"
          alt="Emergency storm damage repair Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response roof damage hail damage fallen trees emergency tarping water extraction severe weather Brisbane Ipswich Logan"
          title="Storm Damage Repair Brisbane | Master Restorer Emergency Response 24/7 | 1300 309 361"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          {/* Emergency Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-700/90 backdrop-blur-sm rounded-full mb-6"
            variants={emergencyPulse}
            animate="animate"
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-lg">Storm Damage? Emergency Response Available Now!</span>
          </motion.div>

          {/* Main Heading */}
          <h1
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Emergency Storm Damage Repair Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            60-Minute Response • Emergency Tarping • IICRC Master Restorer
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> provides immediate emergency storm damage response including roof tarping, fallen tree removal, water extraction, and complete restoration. Serving Brisbane, Ipswich, Logan during severe weather events.
          </p>

          {/* CTA Buttons */}
          <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
            <FluidCTA
              text="Storm Emergency: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
            />
            <FluidCTA
              text="Emergency Assessment"
              href="/quote"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>IICRC Master Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>60-Min Emergency Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>24/7 Storm Team Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Emergency Response Section
function EmergencyResponseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
            ⚡ Storm Emergency Protocol
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Immediate Storm Damage Response - Every Second Counts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Active storms require immediate emergency response. Our <strong>Master Restorer team deploys within 60 minutes</strong> with emergency equipment to protect your Brisbane property from further weather damage.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Zap,
              title: "60-Minute Emergency Deployment",
              description: "During storm events, our emergency vehicles are pre-loaded with tarps, plywood, generators, water extraction equipment. GPS dispatch to Brisbane CBD, Hamilton, Ascot, New Farm, Toowong within 60 minutes. 90 minutes to greater Brisbane, Ipswich, Logan. We respond during active storms when safe.",
              color: colors.emergency[600],
            },
            {
              icon: Shield,
              title: "Emergency Tarping & Protection",
              description: "Industrial tarps secure damaged roofs immediately. Emergency board-up for broken windows and doors. Prevent additional water intrusion during continuing storms. Protect contents and maintain property security. Temporary repairs allow safe occupancy while planning permanent restoration.",
              color: colors.storm[600],
            },
            {
              icon: Droplets,
              title: "Water Extraction & Drying",
              description: "Storm water extraction using truck-mounted pumps and portable extractors. Industrial dehumidifiers prevent mould growth in Brisbane's humid climate. Thermal imaging detects hidden moisture in walls, ceilings, floors. Complete structural drying following IICRC Master protocols.",
              color: '#0ea5e9',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-2xl transition-shadow"
            >
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-10 h-10" style={{ color: item.color }} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don't Wait for Storm Damage to Worsen
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Every hour of delay allows more water intrusion, structural damage, and mould growth. Brisbane storms can dump 100mm+ rain in hours. <strong>Call Master Restorer Phill McGurk NOW for immediate emergency tarping and water extraction.</strong>
          </p>
          <FluidCTA
            text="Storm Emergency: 1300 309 361"
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
    </section>
  );
}

// Brisbane Storm Season Section
function BrisbaneStormSeasonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane Storm Season - November to March
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Severe storms, hailstorms, and tropical systems bring destructive weather to Brisbane
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Wind className="w-12 h-12 mx-auto mb-4" style={{ color: colors.storm[600] }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">100km/h+</div>
                <div className="text-sm text-gray-600">Wind Gusts</div>
                <p className="text-xs text-gray-500 mt-2">Severe Brisbane storms</p>
              </div>
              <div className="text-center">
                <Cloud className="w-12 h-12 mx-auto mb-4" style={{ color: '#6366f1' }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">100mm+</div>
                <div className="text-sm text-gray-600">Rainfall</div>
                <p className="text-xs text-gray-500 mt-2">In single storm events</p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: '#eab308' }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">100,000+</div>
                <div className="text-sm text-gray-600">Lightning Strikes</div>
                <p className="text-xs text-gray-500 mt-2">Per storm season</p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                <div className="text-4xl font-bold text-gray-900 mb-2">5cm+</div>
                <div className="text-sm text-gray-600">Hailstones</div>
                <p className="text-xs text-gray-500 mt-2">Destructive hail events</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Brisbane Storm Damage</h3>
              <ul className="space-y-4">
                {[
                  { icon: Home, text: "Roof damage from wind, hail, and fallen branches" },
                  { icon: TreeDeciduous, text: "Fallen trees and large branches on structures" },
                  { icon: Droplets, text: "Water intrusion through damaged roofs and gutters" },
                  { icon: Building2, text: "Structural damage from high winds and impacts" },
                  { icon: Wind, text: "Broken windows, doors, and damaged facades" },
                  { icon: Zap, text: "Lightning damage to electrical systems" },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <item.icon className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: colors.storm[600] }} aria-hidden="true" />
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">High-Risk Brisbane Areas</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Elevated Areas (High Wind)</h4>
                  <p className="text-sm text-gray-600">Paddington, Red Hill, Mt Gravatt, Chapel Hill - exposed to severe wind gusts</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Riverside (Flooding)</h4>
                  <p className="text-sm text-gray-600">Hamilton, Ascot, New Farm, West End, Milton - storm surge and flash flooding</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Hail Corridors</h4>
                  <p className="text-sm text-gray-600">Ipswich region, Springfield, western Brisbane suburbs - frequent large hail events</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Tree Coverage Areas</h4>
                  <p className="text-sm text-gray-600">Toowong, Indooroopilly, Kenmore, Fig Tree Pocket - fallen tree risk</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Storm Damage Types Section
function StormDamageTypesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Types of Storm Damage We Repair - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete storm damage restoration from emergency response to final repairs
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Home,
              title: "Roof Damage Repair",
              description: "Wind-lifted tiles and metal sheeting, hail damage to roof surfaces, ridge capping damage, flashing failure, roof penetrations. Emergency tarping prevents further water intrusion. Complete roof restoration or replacement. Brisbane's storm winds regularly exceed 100km/h causing severe roof damage.",
              emergency: "Emergency tarping within 60 minutes",
              color: '#ea580c',
            },
            {
              icon: TreeDeciduous,
              title: "Fallen Tree Removal & Repair",
              description: "Trees falling on roofs, crushing structures, blocking access. Emergency tree removal, debris clearance, structural assessment, roof repair, wall reconstruction. Partner with certified arborists for safe tree removal. Common in Brisbane's leafy suburbs during severe storms.",
              emergency: "Immediate hazard assessment and safety measures",
              color: '#16a34a',
            },
            {
              icon: Droplets,
              title: "Storm Water Intrusion",
              description: "Water entering through damaged roofs, broken windows, door failures, gutter overflows. Industrial water extraction, structural drying, dehumidification. Prevent mould growth critical in Brisbane's humidity. IICRC Master certified drying processes.",
              emergency: "Water extraction begins within first hour",
              color: colors.storm[600],
            },
            {
              icon: Cloud,
              title: "Hail Damage Restoration",
              description: "Roof surface damage from large hailstones (5cm+ common in Brisbane), gutter and downpipe denting, window and skylight damage, solar panel impact damage, air conditioning unit damage. Insurance claim documentation with hail impact photos and measurements.",
              emergency: "Immediate tarping prevents water entry through hail holes",
              color: '#6366f1',
            },
            {
              icon: Wind,
              title: "Structural Wind Damage",
              description: "Wall damage from debris impacts, facade damage, carport and pergola collapse, fence destruction, garage door failure, window and door frame damage. Structural engineering assessment if required. Emergency board-up and temporary bracing.",
              emergency: "Emergency structural stabilization and board-up",
              color: '#8b5cf6',
            },
            {
              icon: Building2,
              title: "Gutter & Drainage Damage",
              description: "Torn gutters, downpipe separation, gutter overflow damage, fascia board damage, soffit water damage. Proper drainage critical in Brisbane's heavy storm rainfall (100mm+ in hours). Gutter replacement and drainage improvement.",
              emergency: "Temporary drainage solutions during active storms",
              color: '#0ea5e9',
            },
          ].map((damage, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="rounded-full p-4 flex-shrink-0"
                  style={{ backgroundColor: damage.color }}
                >
                  <damage.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{damage.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{damage.description}</p>
              <div
                className="text-sm font-bold px-4 py-2 rounded-lg"
                style={{ backgroundColor: `${damage.color}15`, color: damage.color }}
              >
                ⚡ {damage.emergency}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Emergency Tarping Section
function EmergencyTarpingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h2
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes['4xl'],
                fontWeight: typography.weights.bold,
              }}
            >
              Emergency Roof Tarping - Critical First Response
            </h2>
            <p className="text-xl text-gray-600">
              Immediate tarping prevents thousands in additional water damage during Brisbane storms
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 flex-shrink-0" style={{ color: colors.emergency[600] }} aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Emergency Tarping Can't Wait</h3>
                <ul className="space-y-3">
                  {[
                    "Brisbane storms can dump 100mm+ rain in hours - every minute counts",
                    "Untarped roof damage allows continuous water entry destroying ceilings, walls, contents",
                    "Water damage costs escalate exponentially: $5K roof damage becomes $50K+ total loss",
                    "Mould growth begins within 24-48 hours in Brisbane's 60-80% humidity",
                    "Insurance requires immediate mitigation - delays can affect claim approval",
                    "Forecast shows more storms coming - tarp now prevents compounding damage",
                  ].map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Our Emergency Tarping Includes</h3>
              <ul className="space-y-3">
                {[
                  "60-minute arrival with industrial tarps and equipment",
                  "Safety harnesses and fall protection for all roof work",
                  "Heavy-duty tarps secured with battens and sandbags",
                  "Multiple layers for large damage areas",
                  "Emergency board-up for broken windows and doors",
                  "Generator power if electrical service interrupted",
                  "Weather-resistant securing methods for ongoing storms",
                  "Photo documentation for insurance claims",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.success[600] }} aria-hidden="true" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Storm-Safe Tarping Methods</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Industrial-Grade Tarps</h4>
                  <p className="text-sm text-gray-600">Heavy-duty polyethylene tarps resist Brisbane storm winds up to 100km/h. UV-resistant for extended temporary protection.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Mechanical Fastening</h4>
                  <p className="text-sm text-gray-600">Timber battens screwed through tarp into roof structure. Sandbags on roof edges. Multiple attachment points prevent wind uplift.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Overlap & Drainage</h4>
                  <p className="text-sm text-gray-600">Overlapping tarp sections shed water properly. Strategic placement channels water to functional gutters preventing pooling.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Safety First</h4>
                  <p className="text-sm text-gray-600">All team members use fall protection harnesses. Work ceases during lightning or extreme winds. Safety over speed always.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Storm Forecast Shows More Weather Coming?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Don't risk further damage. <strong>Call Master Restorer NOW for emergency tarping before the next storm cell arrives.</strong> Our team responds 24/7 including during active storm systems (when safe to deploy).
            </p>
            <FluidCTA
              text="Emergency Tarping: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="lg"
              icon="phone"
              magnetic
              ripple
              pulse
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Repair Process Section
function RepairProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Storm Damage Repair Process - Emergency to Completion
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC Master Restorer comprehensive storm restoration process
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              step: "1",
              phase: "Emergency Response",
              title: "Immediate Safety & Mitigation",
              description: "60-minute arrival at Brisbane property. Safety assessment for structural hazards, electrical dangers, fallen trees. Emergency tarping of damaged roof areas. Board-up of broken windows and doors. Water extraction begins if storm water intrusion. Generator power if needed. Secure property from weather and unauthorized entry.",
              timeline: "0-4 hours from your call",
            },
            {
              step: "2",
              phase: "Assessment & Documentation",
              title: "Comprehensive Damage Assessment",
              description: "Detailed damage inspection using drones for roof assessment, thermal imaging for hidden water intrusion. Photo and video documentation of all damage. Scope of works prepared for insurance claim. Structural engineering consultation if required for major damage. Moisture mapping using professional meters.",
              timeline: "4-24 hours (Day 1-2)",
            },
            {
              step: "3",
              phase: "Insurance Coordination",
              title: "Insurance Claim Process",
              description: "Contact your insurer with detailed damage documentation. Master Restorer assessment report provided. Meet with insurance assessor on-site. Answer technical questions about storm damage cause and repair scope. Section 54 rights ensure you choose your restorer. Direct billing arranged - no upfront costs.",
              timeline: "Day 2-7 (insurance timeline dependent)",
            },
            {
              step: "4",
              phase: "Water Mitigation",
              title: "Complete Structural Drying",
              description: "Industrial dehumidifiers and air movers for complete drying. Daily moisture monitoring ensures thorough drying in Brisbane's humid climate. Antimicrobial treatment prevents mould growth. HEPA filtration if required. Typically 3-7 days drying time for Queensland subtropical conditions.",
              timeline: "Day 1-10 (ongoing during repairs)",
            },
            {
              step: "5",
              phase: "Repairs & Restoration",
              title: "Complete Storm Damage Repair",
              description: "Roof repairs or replacement by licensed roofers. Gutter and fascia restoration. Window and door replacement. Wall and ceiling repairs. Painting and finishing. Debris removal and site cleanup. All work meets Brisbane building codes and insurance requirements.",
              timeline: "1-4 weeks depending on extent",
            },
            {
              step: "6",
              phase: "Final Inspection",
              title: "Master Restorer Certification",
              description: "Final walkthrough with property owner. Master Restorer certification that repairs meet IICRC standards. All moisture levels verified at pre-loss conditions. Certificate of completion for insurance claim finalization. Workmanship warranty provided. Follow-up inspection available.",
              timeline: "Final day of project",
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg flex gap-6"
            >
              <div
                className="w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{ backgroundColor: colors.storm[600] }}
              >
                {process.step}
              </div>
              <div className="flex-grow">
                <div className="mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{ backgroundColor: colors.storm[100], color: colors.storm[700] }}
                  >
                    {process.phase}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600 mb-4">{process.description}</p>
                <div className="text-sm font-bold" style={{ color: colors.storm[600] }}>
                  ⏱️ Timeline: {process.timeline}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Service Areas Section (same as before)
function ServiceAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Storm Damage Emergency Service Areas
          </h2>
          <p className="text-xl text-gray-600">
            60-minute response to inner Brisbane • 90-minute response to greater Brisbane metro
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              title: "Brisbane",
              color: colors.storm[600],
              priority: "Hamilton • Ascot • New Farm • Toowong • Paddington",
              areas: "Brisbane CBD, Bulimba, West End, Fortitude Valley, Milton, South Bank, Chermside, Carindale, Indooroopilly, Mt Gravatt, Red Hill, Chapel Hill",
            },
            {
              title: "Ipswich",
              color: '#9333ea',
              priority: "Karalee • Brookwater • Springfield Lakes",
              areas: "Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Leichhardt",
            },
            {
              title: "Logan",
              color: '#ea580c',
              priority: "Logan Central • Springwood",
              areas: "Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh",
            },
          ].map((area, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8" style={{ color: area.color }} aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2" style={{ color: area.color }}>
                  60-Min Priority Response:
                </p>
                <p className="text-gray-700 text-sm mb-3">{area.priority}</p>
                <p className="font-semibold text-gray-900 mb-2">All {area.title} Areas:</p>
                <p className="text-gray-600 text-sm">{area.areas}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full">
            ⭐ IICRC Master Restorer Excellence
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Why Brisbane Trusts Master Restorer for Storm Damage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phill McGurk - One of limited IICRC Master Restorer certified professionals in Queensland
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              icon: Award,
              title: "Master Restorer Storm Expertise",
              description: "IICRC Master Restorer certification with comprehensive storm damage training. Highest credential in disaster restoration industry. Expert in Brisbane storm patterns, Queensland building codes, subtropical climate challenges. One of very few Master Restorers in Brisbane and Queensland.",
            },
            {
              icon: Zap,
              title: "60-Minute Storm Emergency Response",
              description: "Emergency vehicles pre-loaded with tarps, plywood, generators, water extraction equipment. GPS dispatch ensures fastest route to your Brisbane property. Respond within 60 minutes to Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes to greater Brisbane, Ipswich, Logan. Available during active storms when safe.",
            },
            {
              icon: Shield,
              title: "All Major Insurers - Direct Billing",
              description: "Approved contractor for Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct, GIO. Complete storm damage documentation: drone roof inspections, weather bureau reports, detailed photo evidence. Master Restorer certification strengthens claims. No upfront costs for insurance work.",
            },
            {
              icon: Home,
              title: "Brisbane Storm Experience Since [Year]",
              description: "Based in Wacol, QLD. Decades of experience with Brisbane storm seasons, severe weather events, hailstorms, tropical systems. Deep knowledge of Brisbane Queenslander homes, building materials, flood zones. Rapid local response saves critical time during storm emergencies.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="rounded-full p-4 flex-shrink-0"
                  style={{ backgroundColor: colors.gold[500] }}
                >
                  <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Insurance Support Section
function InsuranceSupportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <h2
              className="font-bold text-gray-900 mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes['4xl'],
                fontWeight: typography.weights.bold,
              }}
            >
              Storm Damage Insurance Claims - We Handle Everything
            </h2>
            <p className="text-xl text-gray-600">
              From emergency response to final payment - complete claim support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: FileText,
                title: "Comprehensive Documentation",
                description: "Drone roof inspections, thermal imaging reports, detailed photo/video evidence, weather bureau storm data, moisture readings, scope of works. Master Restorer assessment adds credibility to claims.",
              },
              {
                icon: Hammer,
                title: "Storm Damage Expertise",
                description: "Distinguish storm damage from wear-and-tear. Prove damage timeline matching storm event. Technical expertise ensures proper scope - nothing missed, nothing excessive. Insurance companies trust Master Restorer assessments.",
              },
              {
                icon: CheckCircle,
                title: "Assessor Meetings",
                description: "We meet insurance assessors on-site. Explain storm damage cause and required repairs. Master Restorer technical knowledge prevents claim disputes. Advocate for complete proper restoration.",
              },
              {
                icon: Shield,
                title: "Direct Insurance Billing",
                description: "Bill major insurers directly - no upfront payment required for approved work. Section 54 Queensland rights mean you choose your restorer. We're approved by all major insurers: Suncorp, RACQ, Allianz, QBE, NRMA, AAMI.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 flex gap-4">
                <div
                  className="rounded-full p-3 flex-shrink-0"
                  style={{ backgroundColor: colors.storm[100] }}
                >
                  <item.icon className="w-6 h-6" style={{ color: colors.storm[600] }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Storm Damage Covered by Most Brisbane Insurance Policies
            </h3>
            <p className="text-gray-700 mb-4">
              Most home and business insurance policies cover <strong>sudden storm damage</strong> including wind, hail, fallen trees, storm water intrusion, lightning damage. Our Master Restorer documentation proves storm cause and damage timeline.
            </p>
            <p className="text-gray-700">
              <strong>Important:</strong> Emergency mitigation (tarping, board-up) is typically covered immediately even before assessor inspection. We handle your claim from emergency response through final payment - protecting both your property and your insurance rights.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Storm Damage FAQs - Brisbane
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            ⚡ STORM DAMAGE EMERGENCY? Call Master Restorer NOW
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane Storm Damage? Emergency Tarping Available Now
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            60-Minute Response • Emergency Tarping • Industrial Water Extraction
          </p>

          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>Every minute of delay allows more water damage.</strong> Call IICRC Master Restorer Phill McGurk NOW for immediate emergency tarping and storm damage response across Brisbane, Ipswich, and Logan.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <FluidCTA
              text="Storm Emergency: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
            />
            <a
              href="mailto:admin@disasterrecovery.com.au"
              className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
              aria-label="Email for storm damage assessment"
            >
              Email Storm Team
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">⚡ 60 Minutes</div>
              <div className="text-red-100">Emergency Tarping</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">🏆 Master Restorer</div>
              <div className="text-red-100">IICRC Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">🛡️ All Insurers</div>
              <div className="text-red-100">Direct Billing</div>
            </div>
          </div>

          <p className="mt-8 text-lg text-red-100">
            Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Metro
          </p>
        </div>
      </div>
    </section>
  );
}
