'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Droplets,
  Clock,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Phone,
  MapPin,
  Zap,
  Home,
  Building2,
  Waves,
  Wind,
  Thermometer,
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
  scrollFadeIn,
  hoverLift,
  emergencyPulse,
  colors,
  typography,
  spacing,
} from '@/lib/design-system';
import StructuredData from '@/components/seo/StructuredData';

// Metadata will be generated separately - this is a client component
export default function WaterDamageRestorationPage() {
  const faqs = [
    {
      question: "How quickly can you respond to water damage emergencies in Brisbane?",
      answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, and Toowong. Our IICRC Master Restorer team is available 24/7/365 with industrial water extraction equipment ready to deploy immediately."
    },
    {
      question: "What types of water damage do you restore?",
      answer: "We restore all types of water damage including burst pipes, flooding, storm damage, roof leaks, appliance failures, sewage backups, and more. Our certified team handles clean water, grey water, and black water contamination using IICRC-approved methods."
    },
    {
      question: "Will insurance cover water damage restoration costs?",
      answer: "Most insurance policies cover sudden and accidental water damage. We work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, and NRMA. We handle direct billing and manage your entire claim process - no upfront costs for approved insurance work."
    }
  ];

  const processSteps = [
    {
      name: "Emergency Call & Dispatch",
      text: "Call 1300 309 361 for immediate dispatch. Our team arrives within 60 minutes with industrial water extraction equipment and moisture detection tools."
    },
    {
      name: "Assessment & Water Extraction",
      text: "Comprehensive damage assessment using thermal imaging and moisture meters. Immediate water extraction begins using truck-mounted pumps and portable extractors."
    },
    {
      name: "Structural Drying & Monitoring",
      text: "Industrial dehumidifiers and air movers placed strategically. Daily moisture monitoring ensures complete drying to IICRC standards preventing mould growth."
    },
    {
      name: "Restoration & Handover",
      text: "Complete restoration of affected areas including repairs, painting, and final inspection. Full documentation provided for insurance claims."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: "Water Damage Restoration Brisbane",
          description: "24/7 emergency water damage restoration in Brisbane. IICRC Master Restorer certified. Burst pipes, flooding, storm damage. 60-minute response. Insurance approved.",
          serviceType: "Water Damage Restoration",
          url: "https://disasterrecovery.com.au/services/water-damage-restoration",
          offers: {
            price: "1500",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        faqs={faqs}
        howTo={{
          name: "Water Damage Restoration Process",
          description: "Professional water damage restoration in 4 steps",
          totalTime: "PT24H",
          steps: processSteps
        }}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Services", url: "https://disasterrecovery.com.au/services" },
          { name: "Water Damage Restoration", url: "https://disasterrecovery.com.au/services/water-damage-restoration" }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Water Damage Emergency - 60-Min Response Brisbane"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Response Section */}
      <EmergencyResponseSection />

      {/* Water Damage Types */}
      <WaterDamageTypesSection />

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
          src="/images/hero/fire-water-damage-restoration.webp"
          alt="Emergency water damage restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response for burst pipes floods storm water damage - industrial water extraction structural drying Brisbane Ipswich Logan"
          title="Emergency Water Damage Restoration Brisbane | Master Restorer 60-Min Response | 1300 309 361"
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
            <span className="font-bold text-lg">Water Damage? Call Now - Every Minute Counts!</span>
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
            Emergency Water Damage Restoration Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            60-Minute Response • IICRC Master Restorer • Insurance Approved
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> and team provide rapid water extraction, structural drying, and mould prevention across Brisbane, Ipswich, and Logan. Available 24/7/365.
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
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
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
            Water Damage Timeline - Time is Critical
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mould growth begins within <strong>24-48 hours</strong>. Structural damage worsens every hour. Our Master Restorer team responds in <strong>60 minutes</strong> to minimize damage and costs.
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
              time: "0-1 Hours",
              title: "Water Spreads Rapidly",
              description: "Water penetrates porous materials, soaks into carpets, walls, furniture. Electrical hazards develop.",
              color: colors.storm[600],
              urgent: true,
            },
            {
              time: "2-24 Hours",
              title: "Damage Accelerates",
              description: "Drywall begins swelling. Metal surfaces start tarnishing. Furniture warping. Foul odors emerge.",
              color: colors.storm[700],
              urgent: true,
            },
            {
              time: "24-48 Hours",
              title: "Mould Begins Growing",
              description: "Mould and bacteria growth starts. Serious biohazard risks. Structural damage intensifies.",
              color: colors.emergency[600],
              urgent: true,
            },
            {
              time: "48+ Hours",
              title: "Severe Contamination",
              description: "Extensive mould colonies. Structural failure risk. May require demolition. Costs multiply exponentially.",
              color: colors.emergency[700],
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
              Our industrial water extraction equipment and thermal imaging technology stops damage progression within the first hour. Every minute you wait costs more in repairs.
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

// Water Damage Types Section
function WaterDamageTypesSection() {
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
            Water Damage Emergencies We Handle - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From burst pipes to Brisbane floods - Master Restorer certified emergency response for all water damage scenarios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Image: Burst Pipes */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-burst-water-pipe.webp"
                alt="Burst water pipe emergency restoration Brisbane - IICRC Master Restorer Phill McGurk 60-minute response - industrial water extraction hot water system burst plumbing failure flooding Brisbane Ipswich"
                title="Burst Pipe Emergency Repair Brisbane | 60-Min Response Master Restorer | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Burst Pipes & Plumbing Failures</h3>
              <p className="text-gray-600 mb-4">
                Hot water system bursts, burst mains, pipe corrosion, freezing damage. Common in older Brisbane Queenslander homes. Causes catastrophic flooding within minutes.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Clock className="w-4 h-4" style={{ color: colors.storm[600] }} aria-hidden="true" />
                <span><strong>Response: </strong>Within 60 minutes across Brisbane CBD, Hamilton, Ascot, Toowong</span>
              </div>
              <Link
                href="/services/water-damage/burst-pipes"
                className="font-bold inline-flex items-center"
                style={{ color: colors.storm[600] }}
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Flood Damage */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-flood-damage.webp"
                alt="Brisbane flood damage restoration by IICRC Master Restorer - emergency water extraction Brisbane River flooding Hamilton New Farm West End - industrial pumps rapid flood recovery Brisbane Ipswich Logan"
                title="Brisbane Flood Damage Restoration | Master Restorer Emergency Water Extraction | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Flood & Storm Water Damage</h3>
              <p className="text-gray-600 mb-4">
                Brisbane River flooding, storm surge, flash floods, blocked drains. Expert in Brisbane flood zones - Hamilton, New Farm, West End, Rocklea. Industrial pumps and rapid extraction.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Shield className="w-4 h-4" style={{ color: colors.storm[600] }} aria-hidden="true" />
                <span><strong>Insurance: </strong>All major insurers approved - direct billing available</span>
              </div>
              <Link
                href="/services/flood-damage-restoration"
                className="font-bold inline-flex items-center"
                style={{ color: colors.storm[600] }}
              >
                Flood Recovery <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Storm Damage */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3D-Storm-Damage.webp"
                alt="Storm water damage restoration Brisbane - emergency roof leak repair ceiling collapse gutter overflow - thermal imaging moisture detection industrial dehumidifiers Brisbane Queensland"
                title="Storm Water Damage Repair Brisbane | Emergency Roof Leak Response | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Roof Leaks & Storm Damage</h3>
              <p className="text-gray-600 mb-4">
                Severe storm damage, roof penetration, ceiling collapse, gutter overflow. Emergency tarping and water extraction. Thermal imaging to detect hidden moisture.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Zap className="w-4 h-4" style={{ color: colors.storm[600] }} aria-hidden="true" />
                <span><strong>Technology: </strong>Thermal imaging, moisture meters, industrial dehumidifiers</span>
              </div>
              <Link
                href="/services/water-damage/roof-leak-damage"
                className="font-bold inline-flex items-center"
                style={{ color: colors.storm[600] }}
              >
                Storm Response <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Air Movement Drying */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-air-movement-drying-carpet.webp"
                alt="Structural drying Brisbane IICRC Master Restorer - carpet water damage restoration industrial air movers LGR dehumidifiers thermal imaging moisture control Brisbane Ipswich Logan Queensland"
                title="Professional Structural Drying Brisbane | IICRC Master Certified Carpet Restoration | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Structural Drying & Dehumidification</h3>
              <p className="text-gray-600 mb-4">
                Complete structural drying using industrial air movers, LGR dehumidifiers, and thermal imaging. Prevents mould growth and structural damage. IICRC Master certified processes.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Award className="w-4 h-4" style={{ color: colors.gold[600] }} aria-hidden="true" />
                <span><strong>Certification: </strong>IICRC Master Restorer - highest industry credential</span>
              </div>
              <Link
                href="/services/water-damage-restoration/structural-drying"
                className="font-bold inline-flex items-center"
                style={{ color: colors.storm[600] }}
              >
                Structural Drying <ArrowRight className="w-4 h-4 ml-1" />
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
            <strong>Also handling:</strong> Washing machine floods, dishwasher leaks, toilet overflows, ceiling leaks, shower leaks, hot water system bursts, air conditioner leaks
          </p>
          <FluidCTA
            text="Call for Any Water Emergency"
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

// Process Section (continuing with more sections...)
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
            Our Master Restorer Water Damage Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC certified 7-step emergency water restoration process developed by Master Restorer Phill McGurk
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
              description: "Master Restorer team arrives within 60 minutes (Brisbane CBD/inner suburbs). Assess damage severity and water category.",
              icon: Clock,
            },
            {
              step: "3",
              title: "Water Extraction",
              description: "Industrial pumps and truck-mounted extractors remove standing water. Prevent further absorption into materials.",
              icon: Waves,
            },
            {
              step: "4",
              title: "Moisture Detection",
              description: "Thermal imaging and moisture meters map all affected areas. Locate hidden moisture in walls, floors, ceilings.",
              icon: Thermometer,
            },
            {
              step: "5",
              title: "Structural Drying",
              description: "Industrial air movers and LGR dehumidifiers create optimal drying conditions. Monitor daily with moisture readings.",
              icon: Wind,
              },
            {
              step: "6",
              title: "Sanitization",
              description: "Antimicrobial treatment prevents mould and bacteria growth. HEPA filtration for air quality. Safe for occupants.",
              icon: Shield,
            },
            {
              step: "7",
              title: "Final Inspection",
              description: "Master Restorer final verification. All areas returned to pre-loss moisture levels. Documentation for insurance claim.",
              icon: CheckCircle,
            },
            {
              step: "8",
              title: "Insurance Support",
              description: "Complete documentation, photos, moisture reports. Direct billing to all major insurers. No upfront costs for insurance work.",
              icon: Building2,
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.storm[100] }}
              >
                <process.icon className="w-8 h-8" style={{ color: colors.storm[700] }} aria-hidden="true" />
              </div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: colors.storm[600] }}
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
              description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in water damage restoration. One of a limited number in Brisbane and QLD. Your property deserves master-level expertise, not basic technician work.",
            },
            {
              icon: Clock,
              bgColor: colors.emergency[600],
              title: "60-Minute Emergency Response",
              description: "Call 1300 309 361 - we arrive within 60 minutes across Brisbane CBD, Hamilton, Ascot, New Farm, Toowong. 90 minutes for greater Brisbane, Ipswich, Logan. Industrial extraction equipment on every truck.",
            },
            {
              icon: Shield,
              bgColor: colors.storm[600],
              title: "All Major Insurers - Direct Billing",
              description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct. We handle complete claim documentation - moisture reports, photos, assessor meetings. No upfront costs for insurance work.",
            },
            {
              icon: Home,
              bgColor: colors.success[600],
              title: "Brisbane Local - We Know Your Property",
              description: "Based in Wacol, QLD. Specialist experience with Brisbane Queenslander homes, flood zones, weather patterns, building codes. High-value Hamilton, Ascot, New Farm property expertise.",
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
            Water Damage Emergency Response - Brisbane, Ipswich, Logan
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
              color: colors.storm[600],
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
            Visual Guide: Water Damage Restoration Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our IICRC Master certified process transforms water-damaged properties back to pre-loss condition
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
                src="/images/optimized/damage/3d-burst-water-pipe.webp"
                alt="Before water extraction Brisbane - standing water saturated carpet flooding emergency water damage requiring immediate IICRC Master Restorer response to prevent mould structural damage"
                title="Water Damage Before Restoration Brisbane | Emergency Flood Standing Water | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full mb-3">
                BEFORE
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Initial Water Damage</h3>
              <p className="text-gray-600 text-sm">
                Standing water, saturated materials, immediate action required to prevent structural damage and mould growth.
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
                src="/images/optimized/damage/3d-air-movement-drying-carpet.webp"
                alt="During water damage restoration Brisbane - industrial air movers dehumidifiers working 24/7 thermal imaging moisture monitoring IICRC Master certified drying process Brisbane Queensland"
                title="Active Water Damage Restoration Brisbane | Industrial Drying Equipment | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mb-3">
                DURING
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Active Restoration</h3>
              <p className="text-gray-600 text-sm">
                Industrial air movers and dehumidifiers working 24/7. Thermal imaging monitoring. Daily moisture readings.
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
                alt="After water damage restoration Brisbane - property returned to pre-loss moisture levels IICRC Master Restorer certified completion ready for rebuilding occupancy Brisbane Ipswich Logan"
                title="Water Damage Restoration Complete Brisbane | Master Restorer Certified | 1300 309 361"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">
                AFTER
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Restoration Complete</h3>
              <p className="text-gray-600 text-sm">
                Property returned to pre-loss moisture levels. Master Restorer certified completion. Ready for rebuilding or occupancy.
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
    <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            🚨 WATER DAMAGE EMERGENCY? Call Master Restorer NOW
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane Water Damage Emergency?
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            Every Minute Counts - Don't Wait for Mould Growth
          </p>

          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes. Industrial equipment. Direct insurance billing. No upfront costs for insurance work.
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
