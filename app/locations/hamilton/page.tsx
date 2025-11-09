'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Clock,
  Shield,
  Award,
  MapPin,
  Home,
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
  CheckCircle,
  Star,
  Building2,
  Zap,
  ArrowRight,
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
import StructuredData, { GEO_COORDS } from '@/components/seo/StructuredData';

// Hamilton Location Page - Premium Riverside Suburb Focus
export default function HamiltonPage() {
  const faqs = [
    {
      question: "How quickly can you respond to emergencies in Hamilton?",
      answer: "We provide 60-minute emergency response to Hamilton and surrounding Brisbane riverside suburbs. Our team is based in Wacol with direct access to Hamilton via the Centenary Highway and Story Bridge."
    },
    {
      question: "Do you specialize in Queenslander homes in Hamilton?",
      answer: "Yes! Our IICRC Master Restorer has extensive experience with Hamilton's heritage Queenslander homes. We understand the unique construction, elevated designs, timber features, and specific restoration requirements of these high-value properties."
    },
    {
      question: "What makes Hamilton properties unique for disaster restoration?",
      answer: "Hamilton's riverside location means higher flood risk, heritage Queenslander construction requires specialized knowledge, and high property values demand master-level restoration expertise. We're one of the few Brisbane companies with IICRC Master Restorer certification specifically experienced in Hamilton properties."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="location"
        location={{
          locationName: "Hamilton",
          suburb: "Hamilton",
          coordinates: GEO_COORDS.hamilton,
          description: "24/7 emergency disaster recovery in Hamilton Brisbane. IICRC Master Restorer specializing in Queenslander homes. Water damage, fire damage, flood restoration. 60-minute response to this premium riverside suburb.",
          serviceRadius: "5000"
        }}
        faqs={faqs}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Locations", url: "https://disasterrecovery.com.au/locations" },
          { name: "Hamilton", url: "https://disasterrecovery.com.au/locations/hamilton" }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Restoration Hamilton - 60-Min Response"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustSection />

      {/* Why Hamilton Trusts Us */}
      <WhyHamiltonSection />

      {/* Services Available */}
      <ServicesSection />

      {/* Local Response Promise */}
      <LocalResponseSection />

      {/* Hamilton Specific Expertise */}
      <HamiltonExpertiseSection />

      {/* Recent Projects */}
      <RecentProjectsSection />

      {/* Insurance Section */}
      <InsuranceSection />

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

// Hero Section
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
          src="/images/suburbs/hamilton-luxury-property-water-damage-restoration.webp"
          alt="Hamilton Brisbane emergency disaster restoration by IICRC Master Restorer Phill McGurk - luxury riverside property water damage fire damage flood recovery specialists - 60-minute response Hamilton Ascot New Farm Queensland"
          title="Hamilton Brisbane Emergency Restoration | Luxury Riverside Properties Master Restorer | 1300 309 361"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-red-900/70" />
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
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-lg">Serving Hamilton's Prestige Riverside Properties</span>
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
            Hamilton Emergency Disaster Restoration
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            60-Minute Response • IICRC Master Restorer • Insurance Approved
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - One of Queensland's Limited Master Restorers</strong> specializing in high-value Hamilton properties. Expert flood recovery, water damage restoration, fire damage, and mould remediation. 24/7/365 emergency service.
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
              text="Get Emergency Help"
              href="/get-help"
              variant="secondary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={staggerContainer}
          >
            {[
              { icon: Clock, label: '<60 Min Response', value: 'Hamilton Priority' },
              { icon: Award, label: 'Master Restorer', value: 'IICRC Certified' },
              { icon: Shield, label: 'Insurance Approved', value: 'All Major Insurers' },
              { icon: Star, label: 'Premium Service', value: 'Luxury Properties' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                variants={staggerItem}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-300" aria-hidden="true" />
                <p className="text-sm text-blue-200 font-semibold">{stat.label}</p>
                <p className="text-xs text-white/80 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Trust Section
function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="py-8 bg-slate-900 text-white border-y border-red-600"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" aria-hidden="true" />
            <span className="font-semibold">Phill McGurk - Master Restorer</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-600" />
          <div className="font-semibold">One of Limited Master Restorers in QLD</div>
          <div className="hidden md:block w-px h-8 bg-gray-600" />
          <div className="font-semibold">24/7 Emergency Dispatch Hamilton</div>
          <div className="hidden md:block w-px h-8 bg-gray-600" />
          <div className="font-semibold">Riverside Property Specialists</div>
        </div>
      </div>
    </motion.section>
  );
}

// Why Hamilton Trusts Us
function WhyHamiltonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const reasons = [
    {
      icon: Award,
      title: 'Master Restorer Certified',
      description: 'Phill McGurk holds one of the limited Master Restorer certifications in Brisbane and Queensland - the highest professional credential for disaster restoration.',
      gradient: 'from-blue-500 to-blue-800',
    },
    {
      icon: Zap,
      title: '60-Minute Hamilton Response',
      description: 'Priority response for Hamilton properties with dedicated emergency dispatch. Average arrival time under 60 minutes to minimize damage and protect your riverside investment.',
      gradient: 'from-red-500 to-red-800',
    },
    {
      icon: Home,
      title: 'Luxury Home Specialists',
      description: 'Extensive experience with Hamilton\'s prestigious riverside estates, heritage Queenslanders, and modern architectural properties. Specialized techniques for high-value finishes.',
      gradient: 'from-green-500 to-green-700',
    },
    {
      icon: Droplets,
      title: 'Flood Risk Expertise',
      description: 'Deep understanding of Brisbane River flood patterns affecting Hamilton. Comprehensive flood recovery, structural drying, and preventative moisture control for riverside locations.',
      gradient: 'from-cyan-500 to-cyan-700',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
              color: colors.text.primary,
            }}
          >
            Why Hamilton Property Owners Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by Hamilton's most prestigious addresses for emergency restoration and disaster recovery
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      icon: Droplets,
      title: 'Water Damage Restoration',
      color: 'blue',
      items: [
        'Emergency flood recovery (Brisbane River)',
        'Burst pipe and storm water extraction',
        'Structural drying with thermal imaging',
        'Hardwood floor drying and restoration',
        'Ceiling and wall cavity moisture removal',
      ],
      href: '/services/water-damage',
    },
    {
      icon: Flame,
      title: 'Fire Damage Restoration',
      color: 'red',
      items: [
        'Smoke and soot damage cleaning',
        'Odor elimination and air purification',
        'Contents restoration and pack-out',
        'Structural cleaning and deodorization',
        'Complete fire damage reconstruction',
      ],
      href: '/services/fire-damage',
    },
    {
      icon: AlertTriangle,
      title: 'Mould Remediation',
      color: 'green',
      items: [
        'Professional mould inspection and testing',
        'IICRC-certified mould remediation',
        'Air quality restoration and monitoring',
        'Moisture source identification and repair',
        'Post-remediation verification testing',
      ],
      href: '/services/mould-remediation',
    },
    {
      icon: Wind,
      title: 'Storm Damage Restoration',
      color: 'cyan',
      items: [
        'Emergency roof tarping and board-up',
        'Wind and hail damage repair',
        'Tree impact damage restoration',
        'Structural water intrusion repair',
        'Complete storm damage reconstruction',
      ],
      href: '/services/storm-damage',
    },
  ];

  const colorClasses = {
    blue: {
      border: 'border-blue-700',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
    },
    red: {
      border: 'border-red-600',
      text: 'text-red-600',
      bg: 'bg-red-50',
      hover: 'hover:bg-red-100',
    },
    green: {
      border: 'border-green-600',
      text: 'text-green-600',
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100',
    },
    cyan: {
      border: 'border-cyan-600',
      text: 'text-cyan-600',
      bg: 'bg-cyan-50',
      hover: 'hover:bg-cyan-100',
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
              color: colors.text.primary,
            }}
          >
            Emergency Restoration Services in Hamilton
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized disaster recovery for Hamilton's high-value riverside properties
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 ${colorClasses[service.color].border}`}
              variants={staggerItem}
              whileHover={{ y: -8 }}
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full ${colorClasses[service.color].bg} flex items-center justify-center`}>
                    <service.icon className={`w-7 h-7 ${colorClasses[service.color].text}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorClasses[service.color].text}`} aria-hidden="true" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-2 ${colorClasses[service.color].text} font-semibold ${colorClasses[service.color].hover} px-4 py-2 rounded-lg transition-colors duration-200`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Local Response Promise
function LocalResponseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <MapPin className="w-10 h-10" aria-hidden="true" />
          </div>

          <h2
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Our Hamilton Response Promise
          </h2>

          <div className="space-y-6 text-lg">
            <p className="text-xl">
              <strong className="text-2xl">60-Minute Response Guarantee</strong>
            </p>
            <p className="text-red-100">
              We understand the urgency of disaster recovery in Hamilton's high-value properties. Our dedicated emergency team is strategically positioned to reach Hamilton from our Brisbane base within 60 minutes of your call.
            </p>
            <p className="text-red-100">
              With deep knowledge of Hamilton's unique flood risk proximity to the Brisbane River, heritage property construction, and modern luxury finishes, we provide specialized restoration services that protect your significant property investment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Clock, label: 'Response Time', value: '<60 Minutes' },
              { icon: MapPin, label: 'Service Area', value: 'All Hamilton Suburbs' },
              { icon: Phone, label: 'Emergency Line', value: '24/7/365 Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3" aria-hidden="true" />
                <p className="text-sm text-red-200 font-semibold mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Hamilton Specific Expertise
function HamiltonExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const expertise = [
    {
      icon: Home,
      title: 'Heritage Queenslanders',
      description: 'Specialized restoration for Hamilton\'s iconic heritage homes with traditional VJ walls, tongue-and-groove flooring, and historic architectural details.',
    },
    {
      icon: Building2,
      title: 'Modern Luxury Estates',
      description: 'Expert care for contemporary Hamilton properties featuring premium finishes, imported materials, and high-end architectural elements.',
    },
    {
      icon: Droplets,
      title: 'Riverside Flood Recovery',
      description: 'Comprehensive flood restoration expertise specific to Brisbane River proximity, including rapid water extraction and structural drying.',
    },
    {
      icon: Shield,
      title: 'High-Value Insurance Claims',
      description: 'Experienced in working with premium insurance policies for Hamilton\'s high-value properties, ensuring maximum coverage and professional documentation.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
              color: colors.text.primary,
            }}
          >
            Hamilton Property Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized knowledge of Hamilton's unique property characteristics and restoration requirements
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-red-400 hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -8 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Recent Projects Section
function RecentProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
              color: colors.text.primary,
            }}
          >
            Trusted by Hamilton Homeowners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional restoration services delivered to Hamilton's most prestigious addresses
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-red-600"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <Star className="w-8 h-8 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Serving Hamilton's Premium Properties
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              From heritage Queenslanders to modern riverside estates, we've successfully restored some of Hamilton's most prestigious properties following floods, fires, storms, and water damage events.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Hamilton Properties Restored</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Emergency Availability</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">&lt;60min</div>
                <div className="text-sm text-gray-600">Average Response Time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Insurance Section
function InsuranceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2
              className="mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes['4xl'],
                fontWeight: typography.weights.bold,
              }}
            >
              Insurance Work Our Specialty
            </h2>
            <p className="text-xl text-gray-300">
              Direct billing with all major Australian insurance companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" aria-hidden="true" />
                <h3 className="text-xl font-bold">No Upfront Costs</h3>
              </div>
              <p className="text-gray-300">
                We bill your insurance company directly for approved claims. No out-of-pocket expenses for Hamilton property owners with comprehensive coverage.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-blue-400" aria-hidden="true" />
                <h3 className="text-xl font-bold">Claims Assistance</h3>
              </div>
              <p className="text-gray-300">
                Complete documentation, moisture mapping, and professional reporting throughout the entire insurance claims process to maximize your coverage.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Hamilton Emergency? Call Master Restorer Now
          </h2>

          <p className="text-xl mb-8 text-red-100">
            Available 24/7 for immediate emergency restoration assistance across all Hamilton suburbs
          </p>

          <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
            <FluidCTA
              text="Call 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="xl"
              icon="phone"
              magnetic
              ripple
              pulse
              className="bg-white text-red-600 hover:bg-gray-100"
            />
            <FluidCTA
              text="Submit Emergency Claim"
              href="/claim"
              variant="secondary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          <p className="mt-8 text-red-200">
            Serving Hamilton • Ascot • New Farm • Toowong • All Brisbane
          </p>
        </motion.div>
      </div>
    </section>
  );
}
