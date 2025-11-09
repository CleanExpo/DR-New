'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { PhoneIcon, ClockIcon, ShieldCheckIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { FluidEmergencyBanner } from '@/components/fluid-cta/FluidEmergencyBanner';
import { FluidFloatingCTA } from '@/components/fluid-cta/FluidFloatingCTA';
import { FluidCTA } from '@/components/fluid-cta/FluidCTA';

const metadata: Metadata = {
  title: 'New Farm Flood Recovery & Water Damage Restoration | IICRC Master Restorer Brisbane',
  description: 'Emergency flood recovery, water damage & fire restoration in New Farm, Brisbane. IICRC Master Restorer Phill McGurk. 30-min response. Insurance approved. Serving New Farm riverside properties. Call 1300 309 361.',
  keywords: 'water damage restoration new farm brisbane, flood recovery new farm, emergency restoration new farm, fire damage new farm, master restorer new farm, riverside property restoration new farm, mould removal new farm, 24/7 emergency new farm brisbane',
  openGraph: {
    title: 'New Farm Brisbane Emergency Restoration | Master Restorer 24/7',
    description: 'IICRC Master Restorer serving New Farm riverside properties. 30-minute emergency response. Water, fire & flood damage specialists.',
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/new-farm'
  }
};

// Enhanced schema using comprehensive schema library
const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Disaster Recovery New Farm Brisbane",
  "description": "IICRC Master Restorer providing 24/7 emergency water damage, flood recovery, fire damage, and storm restoration services in New Farm, Brisbane. Specializing in riverside properties and heritage homes.",
  "telephone": "+61-1300-309-361",
  "email": "info@disasterrecoverybrisbane.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4/17 Tile St",
    "addressLocality": "Wacol",
    "addressRegion": "QLD",
    "postalCode": "4076",
    "addressCountry": "AU"
  },
  "areaServed": {
    "@type": "City",
    "name": "New Farm",
    "containedInPlace": {
      "@type": "City",
      "name": "Brisbane",
      "containedInPlace": {
        "@type": "State",
        "name": "Queensland"
      }
    }
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4688,
    "longitude": 153.0515
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "New Farm Emergency Restoration Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Flood Recovery New Farm",
          "description": "24/7 emergency flood recovery and water extraction for New Farm riverside properties"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Water Damage Restoration New Farm",
          "description": "Complete water damage restoration for New Farm heritage and contemporary homes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fire Damage Restoration New Farm",
          "description": "Complete fire and smoke damage restoration for New Farm properties"
        }
      }
    ]
  }
};

export default function NewFarmPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Fluid Emergency Banner */}
        <FluidEmergencyBanner
          phone="1300 309 361"
          message="24/7 Emergency Restoration New Farm - 60-Min Response"
          sticky
        />

        {/* Hero Section - New Farm Specific */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/suburbs/new-farm-commercial-storm-damage-recovery.webp"
              alt="New Farm Brisbane emergency disaster restoration services - IICRC Master Restorer Phill McGurk specializing in water damage, fire damage, and flood restoration for New Farm riverside properties"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/90 via-red-800/90 to-slate-900/90" />
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                IICRC MASTER RESTORER BRISBANE
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                New Farm Emergency
                <span className="block text-red-400 mt-2">
                  Disaster Restoration
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-4 text-red-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                24/7 Flood Recovery • Water Damage • Fire Restoration
              </motion.p>

              <motion.p
                className="text-lg mb-8 text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Serving New Farm's riverside and heritage properties with IICRC-certified emergency restoration
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
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
                  text="Get Emergency Help"
                  href="/get-help"
                  variant="secondary"
                  size="xl"
                  icon="arrow"
                  magnetic
                  ripple
                  className="bg-red-800 text-white hover:bg-red-900 border-2 border-white"
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-6 text-sm text-red-100 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>&lt; 60 Min Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5" />
                  <span>Flood Zone Specialists</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-slate-900 text-white border-y border-red-600">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold">Master Restorer Phill McGurk</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">Brisbane River Flood Specialists</div>
              <div className="hidden md:block w-px h-8 bg-gray-600" />
              <div className="font-semibold">24/7 Emergency Dispatch</div>
            </div>
          </div>
        </section>

        {/* Why New Farm Residents Trust Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
                Why New Farm Residents Trust Us
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Specialized expertise for New Farm's unique riverside location and diverse property types
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-4">🌊</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Flood Zone Experts
                  </h3>
                  <p className="text-gray-700">
                    Deep understanding of Brisbane River flood patterns and New Farm's flood-prone areas.
                    Rapid response protocols for riverside properties with specialized extraction equipment.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Heritage Property Specialists
                  </h3>
                  <p className="text-gray-700">
                    Expert restoration of New Farm's iconic Queenslander homes and heritage buildings.
                    Specialized techniques preserving original features while meeting modern standards.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Contemporary Apartment Expertise
                  </h3>
                  <p className="text-gray-700">
                    Proven experience with New Farm's modern riverside apartments and high-rise buildings.
                    Body corporate coordination and strata management specialists.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Available in New Farm */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
                Emergency Services Available in New Farm
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Comprehensive disaster recovery for all property types in New Farm
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-t-4 border-blue-600"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-4xl">💧</span>
                    Water Damage & Flood Recovery
                  </h3>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Emergency flood water extraction (Brisbane River flooding)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Storm water intrusion and drainage issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Burst pipe and plumbing emergency response</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Structural drying with thermal imaging technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span>Hardwood floor drying and restoration specialists</span>
                    </li>
                  </ul>
                  <FluidCTA
                    text="Learn More"
                    href="/services/water-damage"
                    variant="primary"
                    size="md"
                    icon="arrow"
                    magnetic
                    ripple
                  />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-t-4 border-red-600"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-4xl">🔥</span>
                    Fire Damage Restoration
                  </h3>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span>Smoke and soot damage cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span>Odor elimination and air purification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span>Contents restoration and pack-out services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span>Structural cleaning and deodorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span>Heritage feature restoration and preservation</span>
                    </li>
                  </ul>
                  <FluidCTA
                    text="Learn More"
                    href="/services/fire-damage"
                    variant="emergency"
                    size="md"
                    icon="arrow"
                    magnetic
                    ripple
                  />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-t-4 border-green-600"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-4xl">🦠</span>
                    Mould Remediation
                  </h3>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span>Professional mould inspection and testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span>IICRC-certified mould remediation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span>Air quality restoration and monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span>Moisture source identification and repair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span>Riverside property humidity control</span>
                    </li>
                  </ul>
                  <FluidCTA
                    text="Learn More"
                    href="/services/mould-remediation"
                    variant="primary"
                    size="md"
                    icon="arrow"
                    magnetic
                    ripple
                  />
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-cyan-50 to-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-t-4 border-cyan-600"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-4xl">⛈️</span>
                    Storm Damage Restoration
                  </h3>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                      <span>Emergency roof tarping and board-up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                      <span>Wind and hail damage repair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                      <span>Tree impact damage restoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                      <span>Structural water intrusion repair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircleIcon className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
                      <span>Heritage Queenslander storm protection</span>
                    </li>
                  </ul>
                  <FluidCTA
                    text="Learn More"
                    href="/services/storm-damage"
                    variant="primary"
                    size="md"
                    icon="arrow"
                    magnetic
                    ripple
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Local Response Promise */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our New Farm Response Promise
                </h2>
                <p className="text-xl text-gray-300">
                  Dedicated emergency service for New Farm's unique challenges
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-slate-800 rounded-xl p-8 border border-red-600 hover:border-red-400 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold mb-3 text-red-400">60-Minute Response</h3>
                  <p className="text-gray-300">
                    Close proximity to New Farm ensures rapid emergency response. Average arrival time under 60 minutes from initial contact.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-slate-800 rounded-xl p-8 border border-blue-600 hover:border-blue-400 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl mb-4">🛡️</div>
                  <h3 className="text-2xl font-bold mb-3 text-blue-400">Insurance Direct Billing</h3>
                  <p className="text-gray-300">
                    Work directly with all major Australian insurance companies. No upfront costs for approved claims. Complete documentation support.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-slate-800 rounded-xl p-8 border border-green-600 hover:border-green-400 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold mb-3 text-green-400">Master Restorer Certified</h3>
                  <p className="text-gray-300">
                    Phill McGurk is one of limited IICRC Master Restorers in Queensland. Highest professional certification for disaster restoration.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white relative overflow-hidden">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '40px 40px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                New Farm Emergency? We're Here 24/7
              </h2>
              <p className="text-xl mb-8 text-red-100">
                Don't wait - every minute counts in disaster recovery. Call now for immediate assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <FluidCTA
                  text="Call 1300 309 361"
                  href="tel:1300309361"
                  variant="emergency"
                  size="xl"
                  icon="phone"
                  magnetic
                  ripple
                  pulse
                  className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl"
                />
                <FluidCTA
                  text="Submit Emergency Claim"
                  href="/claim"
                  variant="secondary"
                  size="xl"
                  icon="arrow"
                  magnetic
                  ripple
                  className="bg-red-800 text-white hover:bg-red-900 border-2 border-white shadow-2xl"
                />
              </div>

              <p className="text-red-200 text-lg">
                Serving New Farm • Hamilton • Ascot • Toowong • All Brisbane
              </p>
            </motion.div>
          </div>
        </section>

        {/* Floating CTA */}
        <FluidFloatingCTA
          phone="1300 309 361"
          showAfterScroll={400}
          position="bottom-right"
        />
      </div>
    </>
  );
}
