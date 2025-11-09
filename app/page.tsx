'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Shield, Star, CheckCircle, Clock, ArrowRight, Award, Users, Building2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

// Homepage for Disaster Recovery Brisbane - Full website with header and navigation handled by layout.tsx
export default function HomePage() {
  // FAQ Schema Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you respond to water damage emergencies in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We respond to Brisbane water damage emergencies within 60 minutes for Brisbane CBD and inner suburbs like Hamilton, Ascot, New Farm, and Toowong. Greater Brisbane, Ipswich, and Logan receive response within 90 minutes. Call 1300 309 361 24/7 - our Master Restorer team is always ready with industrial water extraction equipment."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Phill McGurk different from other Brisbane restoration companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phill McGurk is one of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. This means your property receives master-level expertise, not basic restoration. Most companies only have technician-level certification. Master Restorers have extensive experience, advanced training, and proven track records on complex high-value property restoration."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with all insurance companies in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We're approved by all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, AAMI, and more. We handle direct billing - no upfront costs for insurance work. Our team manages all documentation, photos, moisture reports, and works directly with your insurance assessor to ensure smooth claim approval."
        }
      },
      {
        "@type": "Question",
        "name": "What areas of Brisbane do you service for emergency restoration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We service all Brisbane suburbs, Ipswich, and Logan. High-value suburbs like Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba get priority 60-minute response. We also cover Brisbane CBD, West End, Fortitude Valley, Chermside, Carindale, Mt Gravatt, Indooroopilly, Springfield Lakes, Karalee, Brookwater, Logan Central, Springwood, and all surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do immediately after water or fire damage in my Brisbane home?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Call us immediately at 1300 309 361 - even before your insurance company. For water damage: turn off water source if safe, move valuables to dry areas, don't use home appliances. For fire damage: don't enter until cleared by fire services, don't disturb soot or debris. We'll guide you through emergency steps and dispatch our Brisbane team within 60 minutes. Every minute counts in preventing secondary damage and mould growth."
        }
      },
      {
        "@type": "Question",
        "name": "How much does emergency restoration cost in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Costs vary by damage severity: minor water damage $1,500-$3,500, moderate $3,500-$6,000, major $6,000-$15,000+. Fire damage restoration ranges $2,000-$50,000+ depending on extent. Most Brisbane insurance policies cover disaster restoration costs. We provide free on-site assessments, detailed quotes, and handle direct insurance billing - no upfront payment required for insured work."
        }
      }
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disasterrecovery.com.au"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="home"
        faqs={faqSchema.mainEntity.map(entity => ({
          question: entity.name,
          answer: entity.acceptedAnswer.text
        }))}
        breadcrumbs={breadcrumbSchema.itemListElement.map(item => ({
          name: item.name,
          url: item.item
        }))}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message="24/7 Emergency Water Damage & Fire Restoration"
        sticky
      />

      {/* Hero Section - Storm & Fire Landing Page */}
      <motion.section
        className="relative min-h-[400px] flex items-center justify-center text-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/landing-page-hero.png"
            alt="Emergency Water Damage Restoration Brisbane by IICRC Master Restorer Phill McGurk - 24/7 emergency response for water, fire, and storm damage across Brisbane, Ipswich, and Logan - 60-minute arrival guarantee"
            title="Emergency Water & Fire Damage Restoration Brisbane | Master Restorer Phill McGurk | 1300 309 361"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Image already contains text and buttons - no overlay needed */}
      </motion.section>

      {/* Trust Indicators */}
      <TrustIndicatorsSection />

      {/* Emergency Services */}
      <EmergencyServicesSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Service Areas */}
      <ServiceAreasSection />

      {/* Mobile Showcase Section */}
      <MobileShowcaseSection />

      {/* FAQ Section */}
      <FAQSection />

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

// Trust Indicators Section Component
function TrustIndicatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white"
      style={{ backgroundColor: colors.storm[800] }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['3xl'],
            }}
          >
            Why Brisbane Trusts Phill McGurk
          </h2>
          <p className="text-blue-200">
            Master Restorer Credentials • Proven Track Record • 24/7 Availability
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { icon: Award, title: "Master Restorer", subtitle: "IICRC Certified", badge: "Limited in QLD" },
            { icon: Clock, title: "60 Minutes", subtitle: "Response Time", badge: "Brisbane Metro" },
            { icon: Shield, title: "All Insurers", subtitle: "Direct Billing", badge: "No Upfront Costs" },
            { icon: Star, title: "500+ Jobs", subtitle: "Completed", badge: "Brisbane & Ipswich" },
            { icon: Building2, title: "24/7/365", subtitle: "Emergency Service", badge: "Always Available" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all"
            >
              <motion.div variants={hoverLift} initial="rest" whileHover="hover">
                <item.icon className="w-12 h-12 mx-auto mb-3" style={{ color: colors.gold[400] }} aria-hidden="true" />
                <div className="text-2xl font-bold mb-1">{item.title}</div>
                <div className="text-sm opacity-90">{item.subtitle}</div>
                <div className="text-xs mt-2" style={{ color: colors.gold[300] }}>{item.badge}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Emergency Services Section Component
function EmergencyServicesSection() {
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
            🚨 24/7 Brisbane Emergency Service
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            IICRC Master Restorer Emergency Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Phill McGurk - IICRC Master Restorer</strong> responds to Brisbane, Ipswich & Logan emergencies with proven expertise in water, fire, and storm damage restoration
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              color: colors.storm[600],
              title: "Water Damage Restoration Brisbane",
              description: "Emergency water extraction 24/7. Burst pipes, floods, storm water in Hamilton, Ascot, New Farm, Toowong. Industrial pumps, thermal imaging, complete structural drying. Prevent mould within hours.",
              link: "/emergency/water-damage-brisbane",
              hoverColor: colors.storm[500],
            },
            {
              color: colors.emergency[600],
              title: "Fire & Smoke Damage Brisbane",
              description: "Complete fire restoration. Kitchen fires, electrical fires, smoke odour removal. Thermal fogging, hydroxyl treatment. Ipswich, Logan, Brisbane CBD. Contents cleaning, structural repairs.",
              link: "/emergency/fire-damage-brisbane",
              hoverColor: colors.emergency[500],
            },
            {
              color: colors.success[600],
              title: "Mould Remediation Brisbane",
              description: "Professional mould removal. Black mould, bathroom mould, post-flood contamination. HEPA filtration, antimicrobial treatment. Air quality testing. Brisbane properties, health-safe results.",
              link: "/services/mould-remediation",
              hoverColor: colors.success[500],
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all"
              style={{
                borderWidth: '2px',
                borderColor: 'transparent',
              }}
              whileHover={{
                borderColor: service.color,
              }}
            >
              <div className="mb-4" style={{ color: service.color }}>
                {index === 0 && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="mb-4 text-sm text-gray-700">
                ✓ 60-min response • ✓ Insurance approved • ✓ IICRC Master certified
              </div>
              <Link
                href={service.link}
                className="font-bold hover:underline inline-flex items-center"
                style={{ color: service.color }}
              >
                {index === 2 ? 'Learn More' : 'Emergency Service'} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
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
              text="Free Emergency Quote"
              href="/quote"
              variant="primary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Us Section Component
function WhyChooseUsSection() {
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
            ⭐ Master Restorer Excellence
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Why High-Value Brisbane Properties Choose Phill McGurk
          </h2>
          <p className="text-xl text-gray-600">
            One of Brisbane and Queensland&apos;s Limited Master Restorer Certified Professionals
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
              bgColor: colors.gold[500],
              icon: CheckCircle,
              title: "Master Restorer Certified - Rare in Brisbane",
              description: "Phill McGurk holds IICRC Master Restorer certification - the highest credential in disaster recovery. One of a limited number in Brisbane and QLD. Your high-value property deserves master-level expertise.",
            },
            {
              bgColor: colors.storm[600],
              icon: Shield,
              title: "All Major Insurers - Direct Billing",
              description: "Approved by Suncorp, RACQ, Allianz, QBE, NRMA and all major insurers. We handle your entire claim process - documentation, photos, moisture reports, assessor meetings. No upfront costs for insurance work.",
            },
            {
              bgColor: colors.emergency[600],
              icon: Clock,
              title: "60-Minute Emergency Response Brisbane",
              description: "Call 1300 309 361 - 24/7/365. Rapid response to Hamilton, Ascot, New Farm, Toowong, Brisbane CBD within 60 minutes. Every minute counts in minimizing water and fire damage. Industrial equipment on every truck.",
            },
            {
              bgColor: colors.success[600],
              icon: Building2,
              title: "Brisbane Local - We Know Your Property",
              description: "Based in Wacol, QLD. Deep knowledge of Brisbane Queenslander homes, weather patterns, flood zones, insurance requirements. Specialist experience with high-value Hamilton, Ascot, New Farm properties.",
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

// Service Areas Section Component
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Brisbane, Ipswich & Logan Service Areas
          </h2>
          <p className="text-xl text-gray-600">
            Master Restorer emergency response across all Brisbane metro suburbs
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
              color: colors.storm[600],
              icon: MapPin,
              title: "Brisbane",
              premium: "Hamilton • Ascot • New Farm • Toowong • Paddington • Bulimba",
              areas: "CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly",
              link: "/locations/brisbane",
            },
            {
              color: '#9333ea', // purple-600
              icon: MapPin,
              title: "Ipswich",
              premium: "Karalee • Brookwater • Springfield Lakes",
              areas: "Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt",
              link: "/locations/ipswich",
            },
            {
              color: '#ea580c', // orange-600
              icon: MapPin,
              title: "Logan",
              premium: "Logan Central business district, industrial areas",
              areas: "Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby",
              link: "/locations/logan",
            },
          ].map((area, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <area.icon className="w-8 h-8" style={{ color: area.color }} aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2" style={{ color: area.color }}>
                  {index === 0 ? 'High-Value Suburbs:' : index === 1 ? 'Premium Areas:' : 'Commercial Focus:'}
                </p>
                <p className="text-gray-700 text-sm mb-3">{area.premium}</p>
                <p className="font-semibold text-gray-900 mb-2">
                  {index === 0 ? 'All Brisbane Areas:' : index === 1 ? 'All Ipswich Region:' : 'All Logan Areas:'}
                </p>
                <p className="text-gray-600 text-sm">{area.areas}</p>
              </div>
              <Link
                href={area.link}
                className="font-bold hover:underline inline-flex items-center"
                style={{ color: area.color }}
              >
                View {area.title} Coverage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-gray-700">
            <strong>Emergency Response Times:</strong> 60 minutes Brisbane CBD & inner suburbs • 90 minutes greater Brisbane, Ipswich, Logan
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Mobile Showcase Section Component (keeping original as-is for now)
function MobileShowcaseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-700 text-white font-semibold rounded-full">
            📱 Access Emergency Services Anywhere
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Us on Mobile - 24/7 Emergency Response
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access IICRC Master Restorer Phill McGurk&apos;s emergency disaster recovery services from any device - iPhone, Android, tablet, or desktop
          </p>
        </div>

        {/* Mobile Showcase Images */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <Image
              src="/images/mobile-showcase.webp"
              alt="Mobile emergency restoration services Brisbane - IICRC Master Restorer Phill McGurk 24/7 water damage fire damage mould remediation accessible on iPhone Android smartphones tablets - instant emergency contact 1300 309 361"
              title="24/7 Mobile Emergency Restoration Brisbane | Call Master Restorer Phill McGurk 1300 309 361"
              width={1200}
              height={800}
              loading="lazy"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Feature Graphics */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Image
              src="/images/optimized/branding/disaster-recovery-logo.webp"
              alt="Disaster Recovery Brisbane professional branding - IICRC Master Restorer certified water damage fire damage storm damage restoration services - trusted emergency response Brisbane Ipswich Logan"
              title="Professional Disaster Recovery Brisbane | Master Restorer Certified | 1300 309 361"
              width={800}
              height={600}
              loading="lazy"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Image
              src="/images/disaster-response-mobile.webp"
              alt="Emergency disaster response Brisbane mobile app - instant contact IICRC Master Restorer Phill McGurk 24/7 emergency water damage fire damage flood restoration smartphone access Brisbane Ipswich Logan Queensland"
              title="Instant Emergency Contact Brisbane | Master Restorer Phill McGurk | Call Now 1300 309 361"
              width={800}
              height={600}
              loading="lazy"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Mobile Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Mobile-Optimized</h3>
            <p className="text-gray-600 text-sm">
              Fast-loading, responsive design works perfectly on all smartphones and tablets
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">One-Tap Calling</h3>
            <p className="text-gray-600 text-sm">
              Call 1300 309 361 instantly from your mobile device for emergency response
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Expert Information</h3>
            <p className="text-gray-600 text-sm">
              Access Master Restorer expertise, service details, and emergency guidance on-the-go
            </p>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-red-700 to-red-800 rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Emergency? Call Now from Your Mobile
          </h3>
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
            aria-label="Call 1300 309 361 for emergency service"
          >
            <Phone className="w-6 h-6 mr-2 animate-pulse" aria-hidden="true" />
            1300 309 361
          </a>
          <p className="mt-4 text-red-100 text-sm">
            24/7 Emergency Response • 60-Minute Arrival Brisbane • Master Restorer Certified
          </p>
        </div>
      </div>
    </section>
  );
}

// FAQ Section Component (keeping original structure)
function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Brisbane Disaster Recovery - Common Questions
          </h2>
          <p className="text-xl text-gray-600">Expert answers from IICRC Master Restorer Phill McGurk</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "How quickly can you respond to water damage emergencies in Brisbane?",
              answer: "We respond to Brisbane water damage emergencies within 60 minutes for Brisbane CBD and inner suburbs like Hamilton, Ascot, New Farm, and Toowong. Greater Brisbane, Ipswich, and Logan receive response within 90 minutes. Call 1300 309 361 24/7 - our Master Restorer team is always ready with industrial water extraction equipment."
            },
            {
              question: "What makes Phill McGurk different from other Brisbane restoration companies?",
              answer: "Phill McGurk is one of Brisbane's limited IICRC Master Restorer certified professionals - the highest credential in disaster recovery. This means your property receives master-level expertise, not basic restoration. Most companies only have technician-level certification. Master Restorers have extensive experience, advanced training, and proven track records on complex high-value property restoration."
            },
            {
              question: "Do you work with all insurance companies in Brisbane?",
              answer: "Yes! We're approved by all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA, Budget Direct, AAMI, and more. We handle direct billing - no upfront costs for insurance work. Our team manages all documentation, photos, moisture reports, and works directly with your insurance assessor to ensure smooth claim approval."
            },
            {
              question: "What areas of Brisbane do you service for emergency restoration?",
              answer: "We service all Brisbane suburbs, Ipswich, and Logan. High-value suburbs like Hamilton, Ascot, New Farm, Toowong, Paddington, Bulimba get priority 60-minute response. We also cover Brisbane CBD, West End, Fortitude Valley, Chermside, Carindale, Mt Gravatt, Indooroopilly, Springfield Lakes, Karalee, Brookwater, Logan Central, Springwood, and all surrounding areas."
            },
            {
              question: "What should I do immediately after water or fire damage in my Brisbane home?",
              answer: "Call us immediately at 1300 309 361 - even before your insurance company. For water damage: turn off water source if safe, move valuables to dry areas, don't use home appliances. For fire damage: don't enter until cleared by fire services, don't disturb soot or debris. We'll guide you through emergency steps and dispatch our Brisbane team within 60 minutes. Every minute counts in preventing secondary damage and mould growth."
            },
            {
              question: "How much does emergency restoration cost in Brisbane?",
              answer: "Costs vary by damage severity: minor water damage $1,500-$3,500, moderate $3,500-$6,000, major $6,000-$15,000+. Fire damage restoration ranges $2,000-$50,000+ depending on extent. Most Brisbane insurance policies cover disaster restoration costs. We provide free on-site assessments, detailed quotes, and handle direct insurance billing - no upfront payment required for insured work."
            },
          ].map((faq, index) => (
            <details key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section Component
function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-700 via-red-700 to-red-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            🚨 EMERGENCY? Call Master Restorer NOW
          </motion.div>
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Brisbane Water or Fire Damage Emergency?
          </h2>
          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            Every Minute Counts - Don&apos;t Wait
          </p>
          <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes across Brisbane. Industrial equipment. Direct insurance billing. No upfront costs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <FluidCTA
              text="1300 309 361"
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
              aria-label="Email us for service booking"
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
