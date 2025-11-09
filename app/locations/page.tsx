'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Shield,
  Award,
  Star,
  Home,
  Building2,
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
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
  colors,
  typography,
  spacing,
} from '@/lib/design-system';

// Locations Hub Page - Service Areas Overview
export default function LocationsPage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Service - Brisbane, Ipswich & Logan"
        sticky
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Service Areas Overview */}
      <ServiceAreasSection />

      {/* Coverage Map */}
      <CoverageSection />

      {/* Services by Location */}
      <ServicesByLocationSection />

      {/* Response Times */}
      <ResponseTimesSection />

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
          src="/images/hero/landing-page-hero.png"
          alt="Brisbane Ipswich Logan Service Areas - IICRC Master Restorer Emergency Response"
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
          <h1
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['5xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Brisbane, Ipswich & Logan Service Areas
          </h1>

          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            Master Restorer Emergency Response Across All Brisbane Metro
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            <strong>Phill McGurk - IICRC Master Restorer</strong> provides rapid emergency restoration services across Brisbane, Ipswich, and Logan. 60-minute response to priority suburbs, 90-minute response metro-wide.
          </p>

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
          </FluidCTAGroup>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Service Areas Section
function ServiceAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const locations = [
    {
      region: 'Brisbane',
      color: colors.storm[600],
      icon: MapPin,
      suburbs: [
        { name: 'Hamilton', href: '/locations/hamilton', priority: true },
        { name: 'Ascot', href: '/locations/ascot', priority: true },
        { name: 'New Farm', href: '/locations/new-farm', priority: true },
        { name: 'Toowong', href: '/locations/toowong', priority: true },
      ],
      description: 'High-value riverside suburbs with 60-minute priority response. Expert flood recovery and premium property restoration.',
      allAreas: 'CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Paddington, Bulimba, Chermside, Carindale, Mt Gravatt, Indooroopilly',
    },
    {
      region: 'Ipswich',
      color: '#9333ea',
      icon: Home,
      suburbs: [
        { name: 'Karalee', href: '/locations/karalee', priority: true },
        { name: 'Brookwater', href: '/locations/brookwater', priority: true },
        { name: 'Springfield Lakes', href: '/locations/springfield-lakes', priority: true },
      ],
      description: 'Premium residential areas and growing commercial centers. Rapid emergency response for Ipswich properties.',
      allAreas: 'Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt, North Ipswich',
    },
    {
      region: 'Logan',
      color: '#ea580c',
      icon: Building2,
      suburbs: [],
      description: 'Commercial and industrial focus with comprehensive residential coverage. Logan Central priority response.',
      allAreas: 'Logan Central, Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby, Marsden, Park Ridge',
    },
  ];

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
            Our Service Area Coverage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive emergency restoration services across all Brisbane metro, Ipswich, and Logan areas
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {locations.map((location, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <location.icon className="w-10 h-10" style={{ color: location.color }} aria-hidden="true" />
                <h3 className="text-3xl font-bold text-gray-900">{location.region}</h3>
              </div>

              <p className="text-gray-600 mb-6">{location.description}</p>

              {location.suburbs.length > 0 && (
                <>
                  <p className="font-semibold mb-3" style={{ color: location.color }}>
                    Premium Suburbs (60-Min Response):
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {location.suburbs.map((suburb, idx) => (
                      <Link
                        key={idx}
                        href={suburb.href}
                        className="text-sm px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700 hover:text-gray-900"
                      >
                        {suburb.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <p className="font-semibold text-gray-900 mb-2">All {location.region} Areas:</p>
              <p className="text-gray-600 text-sm mb-6">{location.allAreas}</p>

              <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4" style={{ color: location.color }} aria-hidden="true" />
                <span><strong>Response:</strong> 60-90 minutes</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Coverage Section
function CoverageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 border-2 border-blue-200">
            <div className="text-center mb-8">
              <h2
                className="font-bold text-gray-900 mb-4"
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: typography.sizes['4xl'],
                  fontWeight: typography.weights.bold,
                }}
              >
                Complete Metropolitan Coverage
              </h2>
              <p className="text-xl text-gray-700">
                From Caboolture to the Gold Coast - Our emergency response network covers all major Brisbane metro areas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-blue-600" aria-hidden="true" />
                <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
                <div className="text-gray-600">Major Regions</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <Home className="w-12 h-12 mx-auto mb-3 text-blue-600" aria-hidden="true" />
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Suburbs Covered</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" aria-hidden="true" />
                <div className="text-3xl font-bold text-gray-900 mb-2">60-90</div>
                <div className="text-gray-600">Minute Response</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Services by Location Section
function ServicesByLocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Droplets,
      title: 'Water Damage Restoration',
      color: colors.storm[600],
      description: 'Emergency flood recovery, burst pipes, storm water damage, structural drying',
      href: '/services/water-damage-restoration',
    },
    {
      icon: Flame,
      title: 'Fire Damage Restoration',
      color: colors.emergency[600],
      description: 'Smoke removal, soot cleanup, odor elimination, complete fire recovery',
      href: '/services/fire-damage-restoration',
    },
    {
      icon: AlertTriangle,
      title: 'Mould Remediation',
      color: colors.success[600],
      description: 'Professional mould removal, HEPA filtration, air quality testing',
      href: '/services/mould-remediation',
    },
    {
      icon: Wind,
      title: 'Storm Damage Restoration',
      color: '#6366f1',
      description: 'Emergency tarping, roof repairs, hail damage, wind damage recovery',
      href: '/services/storm-damage-restoration',
    },
  ];

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
            Emergency Services Available Across All Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Full range of IICRC Master certified restoration services in Brisbane, Ipswich, and Logan
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="w-8 h-8" style={{ color: service.color }} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 font-semibold hover:underline"
                style={{ color: service.color }}
              >
                View Service Details <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Response Times Section
function ResponseTimesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2
            className="mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Our Location-Based Response Guarantee
          </h2>

          <p className="text-xl mb-12 text-red-100 max-w-3xl mx-auto">
            Strategically positioned for rapid emergency response across all Brisbane metro areas
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Clock className="w-12 h-12 mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold mb-2">60 Minutes</div>
              <p className="text-red-100 mb-2">Priority Response Areas</p>
              <p className="text-sm text-red-200">
                Hamilton, Ascot, New Farm, Toowong, Karalee, Brookwater, Springfield Lakes, Brisbane CBD
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <MapPin className="w-12 h-12 mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold mb-2">90 Minutes</div>
              <p className="text-red-100 mb-2">Greater Metro Areas</p>
              <p className="text-sm text-red-200">
                All Brisbane suburbs, Ipswich region, Logan region, surrounding areas
              </p>
            </div>
          </div>

          <FluidCTA
            text="Emergency: 1300 309 361"
            href="tel:1300309361"
            variant="emergency"
            size="xl"
            icon="phone"
            magnetic
            ripple
            pulse
            className="bg-white text-red-600 hover:bg-gray-100"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-bold text-gray-900 mb-6"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes['4xl'],
              fontWeight: typography.weights.bold,
            }}
          >
            Need Emergency Restoration? We're Ready to Help
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Available 24/7/365 across Brisbane, Ipswich, and Logan. Master Restorer certified emergency response.
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
            />
            <FluidCTA
              text="View All Services"
              href="/services"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          <p className="mt-8 text-gray-600">
            Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Surrounding Areas
          </p>
        </div>
      </div>
    </section>
  );
}
