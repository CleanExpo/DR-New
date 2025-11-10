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
  CheckCircle,
  Star,
  ArrowRight,
  AlertTriangle,
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
  emergencyPulse,
} from '@/lib/design-system';
import { colors, typography } from '@/lib/design-system/tokens';
import StructuredData from '@/components/seo/StructuredData';

// Location-Service specific data interface
export interface LocationServiceData {
  // Location Info
  locationName: string;
  locationSlug: string;
  locationDescription: string;
  coordinates: { lat: number; lng: number };
  neighborhoods?: string[];

  // Service Info
  serviceName: string;
  serviceSlug: string;
  serviceDescription: string;
  serviceIcon: any;
  serviceColor: 'blue' | 'red' | 'green' | 'cyan';

  // Combined Content
  heroImage: string;
  heroImageAlt: string;
  responseTime?: string;

  // Local Issues
  localIssues: Array<{
    title: string;
    description: string;
    icon?: any;
  }>;

  // Process Steps
  processSteps: Array<{
    name: string;
    text: string;
  }>;

  // FAQs
  faqs: Array<{
    question: string;
    answer: string;
  }>;

  // Related Services
  relatedServices?: Array<{
    name: string;
    href: string;
    icon: any;
  }>;
}

interface LocationServiceTemplateProps {
  data: LocationServiceData;
}

export function LocationServiceTemplate({ data }: LocationServiceTemplateProps) {
  const colorClasses = {
    blue: {
      border: 'border-blue-700',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
      gradient: 'from-blue-500 to-blue-800',
    },
    red: {
      border: 'border-red-600',
      text: 'text-red-600',
      bg: 'bg-red-50',
      hover: 'hover:bg-red-100',
      gradient: 'from-red-500 to-red-800',
    },
    green: {
      border: 'border-green-600',
      text: 'text-green-600',
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100',
      gradient: 'from-green-500 to-green-700',
    },
    cyan: {
      border: 'border-cyan-600',
      text: 'text-cyan-600',
      bg: 'bg-cyan-50',
      hover: 'hover:bg-cyan-100',
      gradient: 'from-cyan-500 to-cyan-700',
    },
  };

  const currentColor = colorClasses[data.serviceColor];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: `${data.serviceName} ${data.locationName}`,
          description: `${data.serviceDescription} Professional ${data.serviceName.toLowerCase()} serving ${data.locationName} and surrounding areas. 24/7 emergency response, IICRC Master Restorer certified.`,
          serviceType: data.serviceName,
          url: `https://disasterrecovery.com.au/locations/${data.locationSlug}/${data.serviceSlug}`,
          offers: {
            price: "1500",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        location={{
          locationName: data.locationName,
          suburb: data.locationSlug,
          coordinates: data.coordinates,
          description: data.locationDescription,
          serviceRadius: "5000"
        }}
        faqs={data.faqs}
        howTo={{
          name: `${data.serviceName} Process in ${data.locationName}`,
          description: `Professional ${data.serviceName.toLowerCase()} process`,
          totalTime: "PT24H",
          steps: data.processSteps
        }}
        breadcrumbs={[
          { name: "Home", url: "https://disasterrecovery.com.au" },
          { name: "Locations", url: "https://disasterrecovery.com.au/locations" },
          { name: data.locationName, url: `https://disasterrecovery.com.au/locations/${data.locationSlug}` },
          { name: data.serviceName, url: `https://disasterrecovery.com.au/locations/${data.locationSlug}/${data.serviceSlug}` }
        ]}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message={`24/7 ${data.serviceName} ${data.locationName} - ${data.responseTime || '60-Min'} Response`}
        sticky
      />

      {/* Hero Section */}
      <HeroSection data={data} currentColor={currentColor} />

      {/* Local Issues Section */}
      <LocalIssuesSection data={data} currentColor={currentColor} />

      {/* Process Section */}
      <ProcessSection data={data} currentColor={currentColor} />

      {/* Why Choose Us for This Location */}
      <WhyChooseSection data={data} />

      {/* Related Services */}
      {data.relatedServices && data.relatedServices.length > 0 && (
        <RelatedServicesSection data={data} />
      )}

      {/* Service Areas */}
      <ServiceAreasSection data={data} />

      {/* FAQs */}
      <FAQSection data={data} />

      {/* Final CTA */}
      <FinalCTASection data={data} />

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
function HeroSection({ data, currentColor }: { data: LocationServiceData; currentColor: any }) {
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
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-red-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          {/* Emergency Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 md:px-6 py-3 bg-red-700/90 backdrop-blur-sm rounded-full mb-6"
            variants={emergencyPulse}
            animate="animate"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            <span className="font-bold text-sm md:text-lg">
              {data.serviceName} in {data.locationName}
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1
            className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            {data.serviceName} {data.locationName}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl mb-4 text-blue-200 font-semibold">
            {data.responseTime || '60-Minute'} Response • IICRC Master Restorer • Insurance Approved
          </p>

          <p className="text-base md:text-xl mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto px-4">
            <strong>Phill McGurk - One of Queensland's Limited Master Restorers</strong> specializing in {data.locationName} properties.
            {data.serviceDescription} 24/7/365 emergency service for all {data.locationName} areas.
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12"
            variants={staggerContainer}
          >
            {[
              { icon: Clock, label: `${data.responseTime?.replace('-Minute', '-Min') || '60-Min'} Response`, value: `${data.locationName} Priority` },
              { icon: Award, label: 'Master Restorer', value: 'IICRC Certified' },
              { icon: Shield, label: 'Insurance Approved', value: 'Direct Billing' },
              { icon: Star, label: 'Local Experts', value: '24/7 Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20"
                variants={staggerItem}
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-300" aria-hidden="true" />
                <p className="text-xs md:text-sm text-blue-200 font-semibold">{stat.label}</p>
                <p className="text-xs text-white/80 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Local Issues Section
function LocalIssuesSection({ data, currentColor }: { data: LocationServiceData; currentColor: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
            }}
          >
            Common {data.serviceName} Issues in {data.locationName}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding local property challenges and providing specialized solutions
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.localIssues.map((issue, index) => {
            const Icon = issue.icon || AlertTriangle;
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 ${currentColor.border}`}
                variants={staggerItem}
                whileHover={{ y: -8 }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${currentColor.gradient} flex items-center justify-center mb-4 md:mb-6`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                  {issue.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {issue.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection({ data, currentColor }: { data: LocationServiceData; currentColor: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
            }}
          >
            Our {data.serviceName} Process in {data.locationName}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Professional, systematic approach to every {data.locationName} emergency
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6 md:space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={staggerItem}
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${currentColor.gradient} flex items-center justify-center text-white font-bold text-lg md:text-2xl`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    {step.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <FluidCTA
            text="Start Your Restoration Now"
            href="tel:1300309361"
            variant="emergency"
            size="lg"
            icon="phone"
            magnetic
            ripple
          />
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection({ data }: { data: LocationServiceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Award,
      title: 'IICRC Master Restorer',
      description: `Phill McGurk holds one of Queensland's limited Master Restorer certifications - the highest credential for disaster restoration.`,
    },
    {
      icon: Zap,
      title: `${data.responseTime || '60-Minute'} ${data.locationName} Response`,
      description: `Priority emergency dispatch for ${data.locationName} properties. Average arrival time under ${data.responseTime?.toLowerCase() || '60 minutes'}.`,
    },
    {
      icon: MapPin,
      title: `Local ${data.locationName} Specialists`,
      description: `Extensive experience with ${data.locationName}'s unique property characteristics and restoration requirements.`,
    },
    {
      icon: Shield,
      title: 'Insurance Approved',
      description: `Direct billing with all major insurers. No upfront costs for approved ${data.serviceName.toLowerCase()} claims.`,
    },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Why Choose Us for {data.serviceName} in {data.locationName}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by {data.locationName} property owners for professional disaster recovery
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4 md:mb-6">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Related Services Section
function RelatedServicesSection({ data }: { data: LocationServiceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
            }}
          >
            Other Services in {data.locationName}
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.relatedServices?.map((service, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Link
                href={service.href}
                className="group block bg-gray-50 rounded-lg md:rounded-xl p-6 hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                <service.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 flex items-center justify-between">
                  {service.name}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </h3>
                <p className="text-xs md:text-sm text-gray-600">24/7 Emergency Service</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Service Areas Section
function ServiceAreasSection({ data }: { data: LocationServiceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-red-700 to-red-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <MapPin className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6" aria-hidden="true" />
          <h2
            className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Serving {data.locationName} and Surrounding Areas
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-red-100">
            {data.responseTime || '60-minute'} emergency response to {data.locationName}
            {data.neighborhoods && data.neighborhoods.length > 0 && ` including ${data.neighborhoods.join(', ')}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FluidCTA
              text="Call Now: 1300 309 361"
              href="tel:1300309361"
              variant="emergency"
              size="lg"
              icon="phone"
              magnetic
              ripple
              pulse
              className="bg-white text-red-600 hover:bg-gray-100"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ data }: { data: LocationServiceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Common questions about {data.serviceName.toLowerCase()} in {data.locationName}
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-4 md:space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg md:rounded-xl p-6 md:p-8 shadow-md"
              variants={staggerItem}
            >
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm md:text-base font-bold">
                  Q
                </span>
                <span className="flex-1">{faq.question}</span>
              </h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed ml-9 md:ml-10">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection({ data }: { data: LocationServiceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: typography.fontFamily.display,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Need {data.serviceName} in {data.locationName}? Call Master Restorer Now
          </h2>

          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-300">
            Available 24/7 for immediate emergency assistance throughout {data.locationName} and surrounding areas
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
              href={`/locations/${data.locationSlug}`}
              variant="secondary"
              size="xl"
              icon="arrow"
              magnetic
              ripple
            />
          </FluidCTAGroup>

          <p className="mt-6 md:mt-8 text-sm md:text-base text-gray-400">
            {data.neighborhoods && data.neighborhoods.length > 0
              ? `Serving ${data.neighborhoods.join(' • ')} • All Brisbane • Ipswich • Logan`
              : `Serving ${data.locationName} • All Brisbane • Ipswich • Logan`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
