import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, Shield, CheckCircle, ArrowRight, AlertCircle, Star } from 'lucide-react';
import { ServiceCard } from '@/components/ui/card-enhanced';
import { EmergencyCallButton } from '@/components/ui/button-enhanced';

interface ServicePageTemplateProps {
  // Hero Section
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;

  // Service Details
  description: string;
  features: string[];
  process: {
    step: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];

  // Emergency Info
  responseTime: string;
  availability: string;

  // Trust Signals
  certifications?: string[];
  insurance?: string[];

  // Related Services
  relatedServices?: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }[];

  // FAQ
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export default function ServicePageTemplate({
  title,
  subtitle,
  heroImage,
  heroImageAlt,
  description,
  features,
  process,
  responseTime,
  availability,
  certifications = ['IICRC Certified', 'RAI Master Restorer'],
  insurance = ['All Major Insurers Approved'],
  relatedServices,
  faqs,
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/85 to-neutral-900/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom py-20 text-center">
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emergency-600/90 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-8 shadow-2xl border border-white/10">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <Clock className="w-4 h-4" />
            {responseTime} Response • {availability}
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <EmergencyCallButton phoneNumber="1300309361" size="xl" />

            <Link
              href="/book-service"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/95 backdrop-blur-sm text-neutral-900 font-bold text-lg rounded-xl hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105"
            >
              Book Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-premium-400" />
                <span className="text-sm font-semibold">{cert}</span>
              </div>
            ))}
            {insurance.map((ins, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <CheckCircle className="w-4 h-4 text-success-400" />
                <span className="text-sm font-semibold">{ins}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 bg-white">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-neutral-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              What We <span className="gradient-text-primary">Provide</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Comprehensive service backed by Master Restorer certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center border border-primary-200">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-neutral-700 font-medium leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              Our <span className="gradient-text-primary">Process</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Proven methodology developed over 20+ years
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-100 -z-10"></div>
                )}

                <div className="card-premium text-center">
                  {/* Step Number */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary-200">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-neutral-700 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-display text-4xl md:text-5xl mb-6">
                Related <span className="gradient-text-primary">Services</span>
              </h2>
              <p className="text-xl text-neutral-600">
                Complete restoration solutions for your property
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  variant="primary"
                >
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 hover:gap-3 transition-all duration-200"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </ServiceCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-narrow">
            <div className="text-center mb-16">
              <h2 className="heading-display text-4xl md:text-5xl mb-6">
                Frequently Asked <span className="gradient-text-primary">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-neutral-900 hover:text-primary-600 transition-colors">
                    {faq.question}
                    <svg
                      className="w-6 h-6 flex-shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Emergency CTA */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emergency-600 via-emergency-700 to-emergency-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-sm mb-8 border border-white/20">
            <AlertCircle className="w-4 h-4 animate-pulse" />
            Need This Service Now?
          </div>

          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
            {responseTime} Emergency Response
          </h2>
          <p className="text-xl text-white/90 mb-12 font-semibold">
            Call now for immediate assistance from IICRC Master Restorer
          </p>

          <EmergencyCallButton phoneNumber="1300309361" size="2xl" />

          <p className="mt-8 text-lg text-white/80 font-semibold">
            {availability} • All Major Insurers Approved • Brisbane, Ipswich & Logan
          </p>
        </div>
      </section>
    </div>
  );
}
