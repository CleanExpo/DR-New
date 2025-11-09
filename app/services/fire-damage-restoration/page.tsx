'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  Shield,
  Clock,
  Award,
  Phone,
  CheckCircle,
  AlertTriangle,
  Wind,
  Home,
  Building2,
  MapPin,
  Zap,
  ArrowRight,
  Droplets,
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
  hoverLift,
  colors,
  typography,
  spacing,
} from '@/lib/design-system';

// Metadata will be generated separately - this is a client component
export default function FireDamageRestorationPage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Fire Damage Emergency - 60-Min Response Brisbane"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Response Section */}
      <EmergencyResponseSection />

      {/* Fire Damage Types */}
      <FireDamageTypesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Why Choose Master Restorer */}
      <WhyChooseSection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* Visual Process Gallery */}
      <VisualProcessSection />

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
          src="/images/optimized/damage/3d-image-of-a-house-fire.webp"
          alt="Emergency fire damage restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response for house fires kitchen fires smoke damage soot removal odour elimination Brisbane Ipswich Logan"
          title="Emergency Fire Damage Restoration Brisbane | Master Restorer 60-Min Response | 1300 309 361"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/90 backdrop-blur-sm rounded-full mb-6"
            variants={emergencyPulse}
            animate="animate"
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-lg">Fire Damage? Call Now - Every Minute Counts!</span>
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
            Fire Damage Restoration & Smoke Remediation Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-orange-200 font-semibold">
            60-Minute Response • IICRC Master Restorer • Insurance Approved
          </p>

          <p className="text-xl mb-10 text-orange-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> and team provide rapid fire damage restoration, smoke removal, and soot cleanup across Brisbane, Ipswich, and Logan. Available 24/7/365.
          </p>

          {/* CTA Buttons */}
          <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
            <FluidCTA
              text="Call 1300 309 361 Now"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
            />
            <FluidCTA
              text="Free Emergency Assessment"
              href="/quote"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-orange-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>IICRC Master Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>All Insurers Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>60-Min Emergency Response</span>
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
            🚨 Why Immediate Response Matters
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Fire Damage Timeline - Time is Critical
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fire and smoke damage worsens rapidly. Acidic soot causes permanent staining within <strong>hours</strong>. Our Master Restorer team responds in <strong>60 minutes</strong> to minimize damage and costs.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              time: "0-2 Hours",
              title: "Soot & Smoke Spread",
              description: "Acidic soot settles on all surfaces. Smoke odors penetrate porous materials. Metal surfaces begin tarnishing.",
              color: colors.emergency[600],
              urgent: true,
            },
            {
              time: "2-6 Hours",
              title: "Staining Begins",
              description: "Plastics discolor permanently. Wooden furniture finishes yellow. Fiberglass appliances turn brown. Metals corrode.",
              color: colors.emergency[700],
              urgent: true,
            },
            {
              time: "6-24 Hours",
              title: "Permanent Damage",
              description: "Extensive soot staining on walls and ceilings. Clothing and fabrics may be unsalvageable. Strong odor sets in.",
              color: '#dc2626',
              urgent: true,
            },
            {
              time: "24+ Hours",
              title: "Severe Contamination",
              description: "Restoration costs multiply. Items require replacement instead of restoration. Structural damage from water and soot.",
              color: '#b91c1c',
              urgent: true,
            },
          ].map((stage, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
              style={{
                borderTop: `4px solid ${stage.color}`,
              }}
            >
              <div
                className="text-2xl font-bold mb-2"
                style={{ color: stage.color }}
              >
                {stage.time}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{stage.title}</h3>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Wait - Call Master Restorer Phill McGurk Immediately
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our specialized smoke removal equipment and HEPA filtration systems stop damage progression. We eliminate soot, smoke odors, and water damage from firefighting efforts.
            </p>
            <FluidCTA
              text="Emergency: 1300 309 361"
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

// Fire Damage Types Section
function FireDamageTypesSection() {
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
            Fire Damage Emergencies We Handle - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From kitchen fires to structural blazes - Master Restorer certified emergency response for all fire damage scenarios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Image: House Fire */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-image-of-a-house-fire.webp"
                alt="House fire damage restoration Brisbane - IICRC Master Restorer 60-minute response"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Residential Fire Damage</h3>
              <p className="text-gray-600 mb-4">
                Complete restoration for house fires, electrical fires, and structural blazes. Expert in Brisbane Queenslander homes and modern residences. Smoke removal, soot cleanup, and full reconstruction.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Clock className="w-4 h-4" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                <span><strong>Response: </strong>Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong</span>
              </div>
              <Link
                href="/services/fire-damage/residential-fire"
                className="font-bold inline-flex items-center"
                style={{ color: colors.emergency[600] }}
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Kitchen Fire */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-kitchen-fire.webp"
                alt="Kitchen fire damage restoration Brisbane - Master Restorer emergency smoke removal"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Kitchen & Appliance Fires</h3>
              <p className="text-gray-600 mb-4">
                Cooking fires, grease fires, electrical appliance fires. Specialized cleaning for cabinets, countertops, and ventilation systems. Complete odor removal from kitchen and adjacent rooms.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Shield className="w-4 h-4" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                <span><strong>Insurance: </strong>All major insurers approved - direct billing available</span>
              </div>
              <Link
                href="/services/fire-damage/kitchen-fire"
                className="font-bold inline-flex items-center"
                style={{ color: colors.emergency[600] }}
              >
                Kitchen Fire Recovery <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Smoke Damage */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3D-Storm-Damage.webp"
                alt="Smoke damage restoration Brisbane - soot removal and odor elimination"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smoke & Soot Removal</h3>
              <p className="text-gray-600 mb-4">
                Complete smoke odor elimination using thermal fogging, ozone treatment, and HEPA filtration. Professional soot cleanup from walls, ceilings, and HVAC systems. Air quality restoration.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Zap className="w-4 h-4" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                <span><strong>Technology: </strong>Thermal fogging, ozone treatment, HEPA air scrubbers</span>
              </div>
              <Link
                href="/services/fire-damage/smoke-removal"
                className="font-bold inline-flex items-center"
                style={{ color: colors.emergency[600] }}
              >
                Smoke Removal <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Water Damage from Firefighting */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-water-damage.webp"
                alt="Water damage from firefighting Brisbane - structural drying after fire"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Water Damage Mitigation</h3>
              <p className="text-gray-600 mb-4">
                Firefighting water extraction and structural drying. Prevent secondary damage from water, mould growth prevention. Industrial dehumidifiers and moisture monitoring. IICRC Master certified processes.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Award className="w-4 h-4" style={{ color: colors.gold[600] }} aria-hidden="true" />
                <span><strong>Certification: </strong>IICRC Master Restorer - highest industry credential</span>
              </div>
              <Link
                href="/services/water-damage-restoration"
                className="font-bold inline-flex items-center"
                style={{ color: colors.emergency[600] }}
              >
                Water Damage Services <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            <strong>Also handling:</strong> Electrical fires, vehicle fires, commercial fire damage, industrial fire restoration, contents restoration, document recovery
          </p>
          <FluidCTA
            text="Call for Any Fire Emergency"
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

// Process Section
function ProcessSection() {
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
            Our Master Restorer Fire Damage Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC certified 8-step emergency fire restoration process developed by Master Restorer Phill McGurk
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              step: "1",
              title: "Emergency Contact",
              description: "Call 1300 309 361. Immediate triage and dispatch within minutes. Safety guidance while we travel.",
              icon: Phone,
            },
            {
              step: "2",
              title: "60-Min On-Site",
              description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess fire and smoke damage severity.",
              icon: Clock,
            },
            {
              step: "3",
              title: "Property Securing",
              description: "Emergency board-up, roof tarping, security measures. Prevent further damage from weather and unauthorized entry.",
              icon: Shield,
            },
            {
              step: "4",
              title: "Water Extraction",
              description: "Remove firefighting water using industrial extractors. Prevent mould growth and secondary water damage.",
              icon: Droplets,
            },
            {
              step: "5",
              title: "Soot Removal",
              description: "Professional soot cleanup from all surfaces. Specialized techniques for different soot types (dry, wet, protein).",
              icon: Wind,
            },
            {
              step: "6",
              title: "Smoke Odor Removal",
              description: "Thermal fogging, ozone treatment, HEPA air scrubbers. Complete smoke odor elimination from property.",
              icon: Flame,
            },
            {
              step: "7",
              title: "Structural Drying",
              description: "Industrial dehumidifiers and air movers dry all affected materials. Daily moisture monitoring.",
              icon: Home,
            },
            {
              step: "8",
              title: "Final Restoration",
              description: "Master Restorer final verification. Complete reconstruction and restoration. Documentation for insurance claim.",
              icon: CheckCircle,
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.emergency[100] }}
              >
                <process.icon className="w-8 h-8" style={{ color: colors.emergency[700] }} aria-hidden="true" />
              </div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: colors.emergency[600] }}
              >
                {process.step}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{process.title}</h3>
              <p className="text-sm text-gray-600">{process.description}</p>
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
    <section ref={ref} className="py-20 bg-white">
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
            Why Brisbane Trusts Master Restorer Phill McGurk
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One of the limited IICRC Master Restorer certified professionals in Brisbane and Queensland
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
              bgColor: colors.gold[500],
              title: "Master Restorer Certified - Rare in Brisbane",
              description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in fire damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise, not basic technician work.",
            },
            {
              icon: Clock,
              bgColor: colors.emergency[600],
              title: "60-Minute Emergency Response",
              description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Fire damage equipment on every truck.",
            },
            {
              icon: Shield,
              bgColor: colors.storm[600],
              title: "All Major Insurers - Direct Billing",
              description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - damage reports, photos, assessor meetings. No upfront costs for insurance work.",
            },
            {
              icon: Home,
              bgColor: colors.success[600],
              title: "Brisbane Local - We Know Your Property",
              description: "Based in Wacol, QLD. Specialist experience with Brisbane Queenslander homes, building codes, insurance requirements. High-value Hamilton, Ascot, New Farm property expertise.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div
                className="rounded-full p-3 flex-shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Service Areas Section
function ServiceAreasSection() {
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
            Fire Damage Emergency Response - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600">
            60-minute response to inner Brisbane suburbs • 90-minute response to greater Brisbane metro
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
              color: colors.emergency[600],
              priority: "Hamilton • Ascot • New Farm • Toowong • Paddington • Bulimba",
              areas: "Brisbane CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly",
            },
            {
              title: "Ipswich",
              color: '#9333ea',
              priority: "Karalee • Brookwater • Springfield Lakes",
              areas: "Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt",
            },
            {
              title: "Logan",
              color: '#ea580c',
              priority: "Logan Central • Industrial Areas",
              areas: "Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby",
            },
          ].map((area, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg"
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

// Visual Process Section
function VisualProcessSection() {
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
            Visual Guide: Fire Damage Restoration Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our IICRC Master certified process transforms fire-damaged properties back to pre-loss condition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-image-of-a-house-fire.webp"
                alt="Before fire damage restoration - Brisbane fire emergency"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full mb-3">
                BEFORE
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Initial Fire Damage</h3>
              <p className="text-gray-600 text-sm">
                Fire damage, smoke contamination, soot on all surfaces. Immediate action required to prevent permanent staining and odor penetration.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-kitchen-fire.webp"
                alt="During fire restoration process - soot removal and smoke cleaning Brisbane"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded-full mb-3">
                DURING
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Active Restoration</h3>
              <p className="text-gray-600 text-sm">
                Soot removal, smoke odor elimination, thermal fogging. HEPA air scrubbers working 24/7. Water extraction and structural drying.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/branding/disaster-recovery-logo.webp"
                alt="After fire damage restoration - Brisbane Master Restorer certified completion"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">
                AFTER
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Restoration Complete</h3>
              <p className="text-gray-600 text-sm">
                Property fully restored to pre-loss condition. No smoke odors, no soot staining. Master Restorer certified completion. Ready for occupancy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            🚨 FIRE DAMAGE EMERGENCY? Call Master Restorer NOW
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane Fire Damage Emergency?
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            Every Hour Counts - Don't Let Soot Cause Permanent Damage
          </p>

          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes. Specialized fire damage equipment. Direct insurance billing. No upfront costs for insurance work.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
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
            <a
              href="mailto:admin@disasterrecovery.com.au"
              className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
              aria-label="Email for emergency assessment"
            >
              Email for Assessment
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">⚡ 60 Minutes</div>
              <div className="text-red-100">Emergency Response</div>
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
            Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs
          </p>
        </div>
      </div>
    </section>
  );
}
