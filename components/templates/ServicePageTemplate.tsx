'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  CheckCircle,
  Clock,
  Shield,
  Award,
  AlertTriangle,
  ArrowRight,
  LucideIcon,
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
} from '@/lib/design-system';
import StructuredData from '@/components/seo/StructuredData';

export interface ServicePageTemplateProps {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;

  // Service Overview
  serviceIcon?: LucideIcon;
  serviceOverview: string;

  // Key Benefits
  benefits: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;

  // Process Steps
  processSteps: Array<{
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;

  // FAQs
  faqs: Array<{
    question: string;
    answer: string;
  }>;

  // SEO & Schema
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>;

  // Optional Sections
  beforeAfterImages?: Array<{
    before: string;
    after: string;
    description: string;
  }>;
  relatedServices?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
  emergencyMessage?: string;
}

export function ServicePageTemplate({
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroImage,
  heroImageAlt,
  serviceIcon,
  serviceOverview,
  benefits,
  processSteps,
  faqs,
  serviceName,
  serviceDescription,
  serviceUrl,
  breadcrumbs,
  beforeAfterImages,
  relatedServices,
  emergencyMessage = "24/7 Emergency Response - 60-Min Response Brisbane",
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        page="service"
        service={{
          name: serviceName,
          description: serviceDescription,
          serviceType: serviceName,
          url: serviceUrl,
          offers: {
            price: "1500",
            priceCurrency: "AUD",
            availability: "https://schema.org/InStock"
          }
        }}
        faqs={faqs}
        howTo={processSteps.length > 0 ? {
          name: `${serviceName} Process`,
          description: `Professional ${serviceName.toLowerCase()} in ${processSteps.length} steps`,
          totalTime: "PT24H",
          steps: processSteps.map(s => ({
            name: s.title,
            text: s.description
          }))
        } : undefined}
        breadcrumbs={breadcrumbs}
      />

      {/* Emergency Banner */}
      <FluidEmergencyBanner
        phone="1300 309 361"
        message={emergencyMessage}
        sticky
      />

      {/* Hero Section */}
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        description={heroDescription}
        image={heroImage}
        imageAlt={heroImageAlt}
      />

      {/* Service Overview */}
      <ServiceOverviewSection
        overview={serviceOverview}
        icon={serviceIcon}
      />

      {/* Key Benefits */}
      <BenefitsSection benefits={benefits} />

      {/* Process Steps */}
      <ProcessSection steps={processSteps} serviceName={serviceName} />

      {/* Before/After Gallery */}
      {beforeAfterImages && beforeAfterImages.length > 0 && (
        <BeforeAfterSection images={beforeAfterImages} />
      )}

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <RelatedServicesSection services={relatedServices} />
      )}

      {/* Final CTA */}
      <FinalCTASection serviceName={serviceName} />

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
function HeroSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <motion.section
      className="relative min-h-[600px] flex items-center justify-center text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
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
            <span className="font-bold text-lg">Emergency? Call Now - Every Minute Counts!</span>
          </motion.div>

          {/* Main Heading */}
          <h1
            className="mb-6"
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-2xl mb-4 text-blue-200 font-semibold">
            {subtitle}
          </p>

          <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
            {description}
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

// Service Overview Section
function ServiceOverviewSection({
  overview,
  icon,
}: {
  overview: string;
  icon?: LucideIcon;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const IconComponent = icon;

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {IconComponent && (
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.storm[100] }}
            >
              <IconComponent className="w-10 h-10" style={{ color: colors.storm[700] }} aria-hidden="true" />
            </div>
          )}
          <p className="text-xl text-gray-700 leading-relaxed">
            {overview}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection({
  benefits,
}: {
  benefits: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
  }>;
}) {
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Why Choose Our Professional Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC Master Restorer certified expertise with 24/7 emergency response
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.storm[100] }}
              >
                <benefit.icon className="w-8 h-8" style={{ color: colors.storm[700] }} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection({
  steps,
  serviceName,
}: {
  steps: Array<{
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  serviceName: string;
}) {
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Our {serviceName} Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IICRC certified {steps.length}-step process developed by Master Restorer Phill McGurk
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((process, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
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

// Before/After Section
function BeforeAfterSection({
  images,
}: {
  images: Array<{
    before: string;
    after: string;
    description: string;
  }>;
}) {
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Our Results Speak For Themselves
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              variants={staggerItem}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="relative h-64">
                  <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded">
                    BEFORE
                  </div>
                  <Image
                    src={image.before}
                    alt={`Before restoration - ${image.description}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-64">
                  <div className="absolute top-2 left-2 z-10 px-3 py-1 bg-green-600 text-white text-sm font-bold rounded">
                    AFTER
                  </div>
                  <Image
                    src={image.after}
                    alt={`After restoration - ${image.description}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({
  faqs,
}: {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}) {
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold mb-3 text-gray-900 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: colors.success[600] }} aria-hidden="true" />
                {faq.question}
              </h3>
              <p className="text-gray-700 ml-9">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Related Services Section
function RelatedServicesSection({
  services,
}: {
  services: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}) {
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
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Related Services
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              <Link
                href={service.href}
                className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center font-bold" style={{ color: colors.storm[600] }}>
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection({ serviceName }: { serviceName: string }) {
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
            Need {serviceName}?
          </h2>

          <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
            Every Minute Counts - Don't Wait
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

export default ServicePageTemplate;
