'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Droplets,
  Wind,
  Award,
  Phone,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  MapPin,
  Microscope,
  Home,
  Building2,
  Heart,
  Zap,
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

// Metadata will be generated separately - this is a client component
export default function MouldRemediationPage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Mould Remediation Emergency - 60-Min Response Brisbane"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Response Section */}
      <EmergencyResponseSection />

      {/* Mould Types Section */}
      <MouldTypesSection />

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
          src="/images/optimized/damage/3d-mould-on-ceiling.webp"
          alt="Professional Mould Remediation Brisbane - IICRC Master Restorer - Safe Removal"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/90 backdrop-blur-sm rounded-full mb-6"
            variants={emergencyPulse}
            animate="animate"
          >
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-lg">Mould Problem? Professional Remediation Available Now!</span>
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
            Professional Mould Remediation Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-green-200 font-semibold">
            Safe, Certified Mould Removal • IICRC Master Restorer • Health-Focused Solutions
          </p>

          <p className="text-xl mb-10 text-green-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> and team provide professional mould inspection, testing, removal and prevention across Brisbane, Ipswich, and Logan. Protecting your health and property.
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
              text="Free Mould Assessment"
              href="/quote"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>IICRC Master Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>Safe Removal Protocols</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>Health-Focused Service</span>
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
            Health Warning: Mould Exposure Risks
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Why Professional Mould Remediation Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mould exposure causes serious health issues including <strong>respiratory problems, allergic reactions, and toxic effects</strong>. DIY removal can spread spores and worsen contamination. Our Master Restorer team uses <strong>containment, HEPA filtration, and safe removal protocols</strong>.
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
              title: "Respiratory Issues",
              description: "Asthma attacks, chronic coughing, wheezing, difficulty breathing. Especially dangerous for children and elderly.",
              color: colors.emergency[600],
              icon: Wind,
            },
            {
              title: "Allergic Reactions",
              description: "Skin rashes, eye irritation, nasal congestion, severe allergic responses to mould spores.",
              color: colors.emergency[600],
              icon: Heart,
            },
            {
              title: "Toxic Effects",
              description: "Black mould (Stachybotrys) produces mycotoxins causing neurological symptoms, immune suppression.",
              color: colors.emergency[700],
              icon: AlertTriangle,
            },
            {
              title: "Property Damage",
              description: "Structural deterioration, material destruction, decreased property value. Worsens over time.",
              color: colors.storm[700],
              icon: Home,
            },
          ].map((risk, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
              style={{
                borderTop: `4px solid ${risk.color}`,
              }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${risk.color}20` }}
              >
                <risk.icon className="w-8 h-8" style={{ color: risk.color }} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{risk.title}</h3>
              <p className="text-sm text-gray-600">{risk.description}</p>
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
              Don't Risk Your Health - Call Professional Mould Remediation Now
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our IICRC Master certified team uses containment barriers, negative air pressure, and HEPA filtration to safely remove mould without spreading spores. We identify the moisture source and prevent recurrence.
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

// Mould Types Section
function MouldTypesSection() {
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
            Common Mould Problems We Remediate - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From black mould to bathroom mould - Master Restorer certified safe removal for all mould types
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Image: Black Mould */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/mould-remediation-black-mould.webp"
                alt="Black mould removal Brisbane - IICRC Master Restorer toxic mould remediation"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Black Mould (Stachybotrys)</h3>
              <p className="text-gray-600 mb-4">
                Highly toxic black mould producing mycotoxins. Causes severe health issues including neurological symptoms. Common after water damage, flooding, high humidity. Requires professional containment and removal.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <AlertTriangle className="w-4 h-4" style={{ color: colors.emergency[600] }} aria-hidden="true" />
                <span><strong>Danger Level: </strong>Extreme - Professional removal essential</span>
              </div>
              <Link
                href="/services/mould-remediation/black-mould"
                className="font-bold inline-flex items-center"
                style={{ color: colors.success[600] }}
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Ceiling Mould */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-water-damage-mould-on-ceiling.webp"
                alt="Ceiling mould remediation Brisbane - roof leak mould removal"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Ceiling & Roof Leak Mould</h3>
              <p className="text-gray-600 mb-4">
                Mould growth from roof leaks, ceiling water damage, poor ventilation. Common in Brisbane humidity and storm damage. Spreads rapidly through ceiling cavities. Thermal imaging to detect hidden growth.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Microscope className="w-4 h-4" style={{ color: colors.success[600] }} aria-hidden="true" />
                <span><strong>Detection: </strong>Thermal imaging, moisture mapping, air quality testing</span>
              </div>
              <Link
                href="/services/mould-remediation/ceiling-mould"
                className="font-bold inline-flex items-center"
                style={{ color: colors.success[600] }}
              >
                Ceiling Mould Removal <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: General Mould Damage */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-mould-damage.webp"
                alt="Bathroom and wall mould removal Brisbane - professional remediation"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Bathroom & Wall Mould</h3>
              <p className="text-gray-600 mb-4">
                Bathroom mould from poor ventilation, shower leaks, grout deterioration. Wall mould from condensation, plumbing leaks, rising damp. Green, white, or black varieties. Antimicrobial treatment prevents return.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Shield className="w-4 h-4" style={{ color: colors.success[600] }} aria-hidden="true" />
                <span><strong>Treatment: </strong>HEPA filtration, antimicrobial coating, moisture control</span>
              </div>
              <Link
                href="/services/mould-remediation/bathroom-mould"
                className="font-bold inline-flex items-center"
                style={{ color: colors.success[600] }}
              >
                Bathroom Mould <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image: Mould on Ceiling */}
          <motion.div
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            variants={staggerItem}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative h-64">
              <Image
                src="/images/optimized/damage/3d-mould-on-ceiling.webp"
                alt="Flood mould remediation Brisbane - post-flood mould removal"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Flood & Water Damage Mould</h3>
              <p className="text-gray-600 mb-4">
                Rapid mould growth after flooding, burst pipes, storm damage. Mould begins within 24-48 hours of water exposure. Brisbane flood zones - Hamilton, New Farm, West End. Complete structural drying prevents recurrence.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                <Award className="w-4 h-4" style={{ color: colors.gold[600] }} aria-hidden="true" />
                <span><strong>Certification: </strong>IICRC Master Restorer - water damage and mould specialist</span>
              </div>
              <Link
                href="/services/mould-remediation/flood-mould"
                className="font-bold inline-flex items-center"
                style={{ color: colors.success[600] }}
              >
                Flood Mould Recovery <ArrowRight className="w-4 h-4 ml-1" />
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
            <strong>Also remediating:</strong> Aspergillus (green mould), Penicillium (white mould), Cladosporium, Alternaria, attic mould, basement mould, crawl space mould, HVAC mould
          </p>
          <FluidCTA
            text="Call for Mould Assessment"
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
            Our Master Restorer Mould Remediation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC certified 7-step safe mould removal process developed by Master Restorer Phill McGurk
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
              title: "Inspection & Testing",
              description: "Comprehensive mould inspection, moisture mapping, air quality testing. Thermal imaging detects hidden growth.",
              icon: Microscope,
            },
            {
              step: "2",
              title: "Containment Setup",
              description: "Physical barriers isolate affected areas. Negative air pressure prevents spore spread to clean areas.",
              icon: Shield,
            },
            {
              step: "3",
              title: "HEPA Filtration",
              description: "Industrial HEPA air scrubbers capture airborne spores. Continuous filtration throughout remediation.",
              icon: Wind,
            },
            {
              step: "4",
              title: "Safe Removal",
              description: "Careful removal of mould-contaminated materials using proper PPE. Safe disposal following regulations.",
              icon: CheckCircle,
            },
            {
              step: "5",
              title: "Antimicrobial Treatment",
              description: "Professional antimicrobial application kills remaining spores. Prevents regrowth on treated surfaces.",
              icon: Droplets,
            },
            {
              step: "6",
              title: "Structural Drying",
              description: "Complete drying of affected structures. Industrial dehumidifiers eliminate moisture - mould's source.",
              icon: Zap,
            },
            {
              step: "7",
              title: "Final Testing",
              description: "Post-remediation air quality testing verifies successful removal. Master Restorer certification of completion.",
              icon: Award,
            },
            {
              step: "8",
              title: "Prevention Plan",
              description: "Moisture control recommendations, ventilation improvements. Prevent future mould growth with expert guidance.",
              icon: Home,
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.success[100] }}
              >
                <process.icon className="w-8 h-8" style={{ color: colors.success[700] }} aria-hidden="true" />
              </div>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: colors.success[600] }}
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
            IICRC Master Restorer Excellence
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Why Brisbane Trusts Master Restorer Phill McGurk for Mould Remediation
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
              title: "Master Restorer Mould Certification - Rare in Brisbane",
              description: "Phill McGurk holds IICRC Master Restorer certification with specialized mould remediation credentials. One of a limited number in Brisbane and QLD. Your health deserves master-level expertise, not basic mould removal.",
            },
            {
              icon: Shield,
              bgColor: colors.success[600],
              title: "Safe Containment & HEPA Filtration",
              description: "Professional containment barriers prevent spore spread. Negative air pressure systems. Industrial HEPA air scrubbers. Proper PPE for all technicians. Safe for occupants during and after remediation.",
            },
            {
              icon: Microscope,
              bgColor: colors.storm[600],
              title: "Laboratory Air Quality Testing",
              description: "Pre-remediation and post-remediation air quality testing. Laboratory analysis identifies mould species and toxicity levels. Certified completion when spore counts return to safe levels.",
            },
            {
              icon: Home,
              bgColor: colors.emergency[600],
              title: "Brisbane Local - Humidity & Flood Expertise",
              description: "Based in Wacol, QLD. Expert in Brisbane's high humidity, flood zones, Queenslander homes, weather patterns. Specialist knowledge of Hamilton, Ascot, New Farm properties affected by floods and mould.",
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
            Mould Remediation Service Areas - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600">
            Professional mould removal across all Brisbane metro areas - residential and commercial properties
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
              color: colors.success[600],
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
                  High Priority Suburbs:
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
            Visual Guide: Mould Remediation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our IICRC Master certified process safely removes mould and restores healthy indoor air quality
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
                src="/images/optimized/damage/3d-mould-damage.webp"
                alt="Before mould remediation - Brisbane mould contamination"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full mb-3">
                BEFORE
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Mould Contamination</h3>
              <p className="text-gray-600 text-sm">
                Visible mould growth, health risks from spore exposure, property damage, musty odors. Requires professional remediation.
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
                src="/images/optimized/damage/3d-mould-on-ceiling.webp"
                alt="During mould removal process - HEPA filtration and containment Brisbane"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mb-3">
                DURING
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Active Remediation</h3>
              <p className="text-gray-600 text-sm">
                Containment barriers, negative air pressure, HEPA filtration running. Safe removal by certified technicians with proper PPE.
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
                alt="After mould remediation - Brisbane Master Restorer certified clean air"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">
                AFTER
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Remediation Complete</h3>
              <p className="text-gray-600 text-sm">
                All mould removed, air quality testing confirms safe levels. Master Restorer certified completion. Healthy indoor environment restored.
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
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            MOULD PROBLEM? Call Master Restorer NOW
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane Mould Remediation Emergency?
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-green-100 font-semibold">
            Protect Your Health - Professional Mould Removal Available Now
          </p>

          <p className="text-xl mb-10 text-green-100 max-w-3xl mx-auto">
            <strong>IICRC Master Restorer Phill McGurk</strong> and team provide safe, certified mould remediation. HEPA filtration. Air quality testing. Health-focused solutions. Prevent recurrence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
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
            <a
              href="mailto:admin@disasterrecovery.com.au"
              className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
              aria-label="Email for mould assessment"
            >
              Email for Assessment
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Master Restorer</div>
              <div className="text-green-100">IICRC Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">HEPA Filtration</div>
              <div className="text-green-100">Safe Removal</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Air Testing</div>
              <div className="text-green-100">Certified Clean</div>
            </div>
          </div>

          <p className="mt-8 text-lg text-green-100">
            Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs
          </p>
        </div>
      </div>
    </section>
  );
}
