'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Clock,
  Phone,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  Zap,
  MapPin,
  Building2,
  Home,
  Waves,
  Flame,
  Wind,
  Droplets,
  Users,
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
export default function EmergencyRestorationBrisbanePage() {
  const faqs = [
    {
      question: "How quickly can you respond to emergencies in Brisbane?",
      answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, Toowong, Paddington, and Bulimba. 90-minute response to greater Brisbane, Ipswich, and Logan. IICRC Master Restorer Phill McGurk leads our 24/7/365 emergency team with industrial equipment ready to deploy immediately."
    },
    {
      question: "What types of emergencies do you handle?",
      answer: "We handle all disaster restoration emergencies: water damage (burst pipes, flooding, storm damage), fire and smoke damage, mould remediation, storm damage, sewage backups, and biohazard cleanup. Our Master Restorer certification covers all disaster scenarios with proper IICRC protocols."
    },
    {
      question: "Do you work with insurance companies?",
      answer: "Yes, we work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, and Budget Direct. We handle complete claim documentation, assessor meetings, and direct billing. No upfront costs for approved insurance work. Our Master Restorer certification streamlines insurance approvals."
    },
    {
      question: "Are you available on weekends and public holidays?",
      answer: "Absolutely. We operate 24/7/365 including weekends, public holidays, Christmas, and New Year. Disasters don't wait for business hours - neither do we. Call 1300 309 361 anytime for immediate emergency dispatch."
    },
    {
      question: "What areas do you cover for emergency response?",
      answer: "We provide emergency response across all Brisbane suburbs, Ipswich region, and Logan area. Priority 60-minute response zones include Brisbane CBD, Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba, Fortitude Valley, West End, and Indooroopilly."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: "Emergency Restoration Brisbane",
          description: "24/7 emergency disaster restoration Brisbane. IICRC Master Restorer. Water damage, fire damage, storm damage, mould remediation. 60-minute response. Insurance approved.",
          serviceType: "Emergency Restoration Services",
          url: "https://disasterrecovery.com.au/services/emergency-restoration-brisbane",
          offers: {
            price: "1500",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Services", url: "https://disasterrecovery.com.au/services" },
          { name: "Emergency Restoration Brisbane", url: "https://disasterrecovery.com.au/services/emergency-restoration-brisbane" }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Restoration - 60-Min Response Brisbane"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Response Section */}
      <EmergencyResponseSection />

      {/* Services We Handle */}
      <EmergencyServicesSection />

      {/* 24/7 Availability */}
      <TwentyFourSevenSection />

      {/* Why Choose Master Restorer */}
      <WhyChooseSection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* Emergency Process */}
      <EmergencyProcessSection />

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
          src="/images/hero/fire-water-damage-restoration.webp"
          alt="24/7 emergency disaster restoration Brisbane by IICRC Master Restorer Phill McGurk - 60-minute response water damage fire damage storm damage mould remediation emergency services Brisbane Ipswich Logan"
          title="Emergency Restoration Brisbane | Master Restorer 60-Min Response 24/7 | 1300 309 361"
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
            <span className="font-bold text-lg">24/7/365 Emergency Response - Call Now!</span>
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
            Emergency Restoration Brisbane
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            60-Minute Response • IICRC Master Restorer • Available 24/7/365
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - Master Restorer</strong> and team provide immediate emergency response for water damage, fire damage, storm damage, and mould emergencies across Brisbane, Ipswich, and Logan. Every minute counts in disaster restoration.
          </p>

          {/* CTA Buttons */}
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
              <Clock className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>60-Min Emergency Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>All Insurers Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" style={{ color: colors.gold[400] }} aria-hidden="true" />
              <span>24/7/365 Availability</span>
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
            🚨 Why Immediate Emergency Response Matters
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            The First 60 Minutes Are Critical in Disaster Restoration
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Damage escalates exponentially in the first hours after a disaster. Our <strong>IICRC Master Restorer</strong> emergency team responds within <strong>60 minutes</strong> to minimize damage, prevent secondary issues, and reduce restoration costs.
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
              title: "60-Minute Response Guarantee",
              description: "From your emergency call to our team arriving on-site in Brisbane CBD and inner suburbs (Hamilton, Ascot, New Farm, Toowong). 90 minutes for greater Brisbane, Ipswich, Logan. Industrial equipment on every emergency vehicle.",
              color: colors.emergency[600],
            },
            {
              icon: Clock,
              title: "24/7/365 Availability",
              description: "Disasters strike at any time - weekends, public holidays, 3am emergencies. Our Master Restorer team is always ready with fully stocked emergency vehicles and industrial equipment. No delays, no waiting for business hours.",
              color: colors.storm[600],
            },
            {
              icon: Shield,
              title: "Immediate Damage Control",
              description: "Emergency water extraction, temporary power, emergency board-up, tarping, safety assessments. We stop damage progression in the first hour, preventing mould growth, structural collapse, and escalating costs.",
              color: colors.gold[600],
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
            Don't Wait - Every Minute Increases Damage and Costs
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Water spreads through porous materials. Mould begins growing within 24-48 hours. Fire soot becomes permanent. Storm damage worsens with weather. <strong>Call Master Restorer Phill McGurk NOW for immediate emergency response.</strong>
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
        </motion.div>
      </div>
    </section>
  );
}

// Emergency Services Section
function EmergencyServicesSection() {
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
            Emergency Restoration Services - Brisbane, Ipswich, Logan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Restorer certified emergency response for all disaster scenarios
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
              icon: Waves,
              title: "Emergency Water Damage Restoration",
              description: "Burst pipes, flooding, storm water intrusion, roof leaks, sewage backups, hot water system failures. Industrial water extraction, structural drying, thermal imaging, moisture monitoring. 60-minute response prevents mould growth and structural damage.",
              link: "/services/water-damage-restoration",
              linkText: "Water Damage Services",
              color: colors.storm[600],
            },
            {
              icon: Flame,
              title: "Emergency Fire & Smoke Damage",
              description: "Kitchen fires, electrical fires, bushfire smoke, fire suppression system activation. Emergency board-up, soot removal, smoke odor elimination, structural cleaning. Prevent permanent smoke damage with immediate response.",
              link: "/services/fire-damage-restoration",
              linkText: "Fire Damage Services",
              color: '#ea580c',
            },
            {
              icon: Wind,
              title: "Emergency Storm Damage Repair",
              description: "Severe storms, roof damage, fallen trees, hail damage, wind damage, gutter collapse. Emergency tarping, temporary repairs, water extraction, debris removal. Protect your property from further weather damage.",
              link: "/services/storm-damage-restoration",
              linkText: "Storm Damage Services",
              color: '#6366f1',
            },
            {
              icon: AlertTriangle,
              title: "Emergency Mould Remediation",
              description: "Toxic mould growth, black mould, hidden mould colonies, health hazards. HEPA filtration, containment barriers, antimicrobial treatment, air quality testing. Critical for Brisbane's humid climate - act within 24-48 hours.",
              link: "/services/mould-remediation",
              linkText: "Mould Remediation",
              color: '#16a34a',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="rounded-full p-4 flex-shrink-0"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href={service.link}
                className="inline-flex items-center font-bold"
                style={{ color: service.color }}
              >
                {service.linkText}
                <CheckCircle className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 24/7 Availability Section
function TwentyFourSevenSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            24/7/365 Emergency Response - Brisbane Never Waits
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Disasters don't follow business hours. Neither do we.
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
              time: "Weekends",
              description: "Full emergency response Saturday and Sunday. Same 60-minute response time. Same Master Restorer expertise. No weekend surcharges for insurance work.",
              icon: "🕐",
            },
            {
              time: "Public Holidays",
              description: "Christmas, New Year, Easter, Australia Day - we're always available. Disasters don't take holidays. Our emergency team is on standby 24/7 including all public holidays.",
              icon: "🎉",
            },
            {
              time: "After Hours",
              description: "2am burst pipe? 4am fire damage? Midnight storm damage? Call 1300 309 361 anytime. Our emergency dispatch answers immediately, not voicemail or call-back services.",
              icon: "🌙",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.time}</h3>
              <p className="text-red-100">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-2xl font-bold mb-6">
            Call Now - Real People Answer, Not Voicemail
          </p>
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
    <section ref={ref} className="py-20 bg-gray-50">
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
            Why Brisbane Trusts Master Restorer Phill McGurk for Emergencies
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
              title: "Master Restorer Certified - Highest Credential",
              description: "Phill McGurk holds IICRC Master Restorer certification - the highest level in disaster restoration. One of very few in Brisbane and Queensland. Your emergency deserves master-level expertise, not basic technician work. All major certifications: Water Damage (WRT), Applied Structural Drying (ASD), Fire & Smoke (FSRT), Mould Remediation (AMRT).",
            },
            {
              icon: Clock,
              title: "Genuine 60-Minute Emergency Response",
              description: "Not a promise - a guarantee. We respond within 60 minutes to Brisbane CBD, Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba, Fortitude Valley. 90 minutes to greater Brisbane, Ipswich, Logan. Industrial equipment already loaded on emergency vehicles. GPS dispatch ensures fastest route.",
            },
            {
              icon: Shield,
              title: "All Major Insurers - No Upfront Costs",
              description: "Direct billing relationships with Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct, GIO, Youi, Coles Insurance. We handle complete claim process - documentation, photos, moisture reports, assessor meetings. Master Restorer certification streamlines approvals. No upfront payment for insurance work.",
            },
            {
              icon: Home,
              title: "Brisbane Local - We Know Your Property",
              description: "Based in Wacol, QLD since [year]. Deep expertise in Brisbane Queenslander homes, flood zones, subtropical climate, building codes. We've responded to Hamilton riverside estates, Ascot heritage homes, Brisbane CBD high-rises, Ipswich commercial properties. Local knowledge saves time in emergencies.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
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

// Service Areas Section
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
            Emergency Response Service Areas
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
              priority: "Hamilton • Ascot • New Farm • Toowong • Paddington • Bulimba",
              areas: "Brisbane CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly, Hawthorne, Clayfield, Kedron",
            },
            {
              title: "Ipswich",
              color: '#9333ea',
              priority: "Karalee • Brookwater • Springfield Lakes",
              areas: "Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt, Ripley",
            },
            {
              title: "Logan",
              color: '#ea580c',
              priority: "Logan Central • Commercial Areas",
              areas: "Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby, Marsden",
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

// Emergency Process Section
function EmergencyProcessSection() {
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
            What Happens When You Call Our Emergency Line
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From your emergency call to complete restoration - here's our proven Master Restorer process
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              step: "1",
              time: "0-5 Minutes",
              title: "Emergency Call & Triage",
              description: "Call 1300 309 361 - real person answers immediately (not voicemail). We assess emergency type, severity, location. Provide immediate safety guidance while dispatching Master Restorer team. GPS tracking shows exact arrival time.",
            },
            {
              step: "2",
              time: "5-60 Minutes",
              title: "Master Restorer Team Dispatched",
              description: "Fully equipped emergency vehicle dispatched within 5 minutes. Industrial equipment already loaded: water extractors, air movers, dehumidifiers, generators, emergency supplies. Arrival within 60 minutes (Brisbane CBD/inner suburbs), 90 minutes (greater Brisbane/Ipswich/Logan).",
            },
            {
              step: "3",
              time: "60-90 Minutes",
              title: "Initial Assessment & Emergency Mitigation",
              description: "Safety assessment first - electrical hazards, structural integrity, contamination. Immediate damage control: water extraction, emergency board-up, tarping, power restoration. Thermal imaging detects hidden moisture. Photography for insurance documentation.",
            },
            {
              step: "4",
              time: "2-4 Hours",
              title: "Insurance Notification & Scope",
              description: "We contact your insurer immediately with detailed damage assessment, photos, moisture readings. Master Restorer certification expedites approvals. Detailed scope of works prepared. Direct billing arranged - no upfront costs for insurance work.",
            },
            {
              step: "5",
              time: "Day 1-3",
              title: "Active Restoration & Monitoring",
              description: "Industrial drying equipment deployed 24/7. Daily moisture monitoring with thermal imaging. Antimicrobial treatment prevents mould growth. Contents pack-out if required. Progress updates to you and insurer.",
            },
            {
              step: "6",
              time: "Day 3-7",
              title: "Final Drying & Verification",
              description: "Master Restorer final inspection ensures all areas returned to pre-loss moisture levels. IICRC standards met. Air quality testing. Certificate of completion. Full documentation package for insurance claim.",
            },
          ].map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg mb-6 flex gap-6"
            >
              <div
                className="w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{ backgroundColor: colors.emergency[600] }}
              >
                {process.step}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{process.title}</h3>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: colors.storm[100], color: colors.storm[700] }}
                  >
                    {process.time}
                  </span>
                </div>
                <p className="text-gray-600">{process.description}</p>
              </div>
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
              Complete Insurance Support - No Upfront Costs
            </h2>
            <p className="text-xl text-gray-600">
              We handle your entire insurance claim from emergency response to final payment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "Complete Documentation",
                description: "Detailed damage assessment, professional photography, thermal imaging reports, moisture readings, scope of works. Master Restorer certification adds credibility to claims.",
              },
              {
                icon: Users,
                title: "Assessor Meetings",
                description: "We meet directly with insurance assessors on-site. Master Restorer expertise ensures accurate scoping. Prevent claim disputes with proper documentation from day one.",
              },
              {
                icon: Shield,
                title: "Direct Billing",
                description: "Approved by all major insurers. We bill your insurance company directly - no upfront payment required for insurance work. You receive final invoice only after insurer approval.",
              },
              {
                icon: CheckCircle,
                title: "Claim Advocacy",
                description: "Section 54 rights in Queensland mean you choose your own restorer. We advocate for proper scope and pricing. Master Restorer certification streamlines approvals and reduces claim rejections.",
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

          <div className="mt-8 bg-blue-50 border-2 border-blue-400 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Approved by All Major Insurance Companies
            </h3>
            <p className="text-gray-700 mb-4">
              <strong>Insurers we work with:</strong> Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, Budget Direct, GIO, Youi, Coles Insurance, Woolworths Insurance, IAG, CGU, and more.
            </p>
            <p className="text-gray-700">
              Our IICRC Master Restorer certification is recognized and trusted by insurance companies Australia-wide. Faster approvals, fewer disputes, professional service.
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
            Emergency Restoration FAQs
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
            🚨 EMERGENCY? Call Master Restorer NOW - 24/7/365
          </motion.div>

          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Don't Wait - Call Emergency Response Now
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            60-Minute Response • Master Restorer Team • Industrial Equipment Ready
          </p>

          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>Every minute counts</strong> in disaster restoration. Call IICRC Master Restorer Phill McGurk now for immediate emergency response across Brisbane, Ipswich, and Logan.
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
              Email Emergency Team
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
              <div className="text-3xl font-bold mb-2">🕐 24/7/365</div>
              <div className="text-red-100">Always Available</div>
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
