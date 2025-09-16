/**
 * DR-New Design System - Implementation Examples
 * ===============================================
 * Practical examples showing how to implement the design system
 * in real components for the disaster recovery website
 */

import React from 'react';
import Image from 'next/image';
import {
  colors,
  spacing,
  typography,
  buttonClass,
  cardClass,
  sectionClass,
  containerClass,
  stylePresets,
  semanticTokens,
} from './index';

// ============================================================================
// EMERGENCY HERO SECTION
// ============================================================================

/**
 * Hero section with emergency response focus
 * Demonstrates: Emergency design patterns, responsive typography, accessibility
 */
export const EmergencyHero: React.FC = () => {
  return (
    <section
      className="relative min-h-[600px] lg:min-h-[700px] flex items-center"
      role="banner"
      aria-label="Emergency disaster recovery services"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/disaster-recovery-services.jpg"
          alt="Professional disaster recovery team in action"
          fill
          priority
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className={containerClass('xl', 'relative z-10')}>
        <div className="max-w-3xl">
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emergency-600 text-white rounded-full mb-6 animate-pulse-slow">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span className="text-sm font-semibold">24/7 EMERGENCY RESPONSE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 hero-text-shadow">
            Brisbane's Trusted
            <span className="text-primary-400"> Disaster Recovery</span> Experts
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 hero-text-shadow">
            Professional water, fire, and storm damage restoration.
            Insurance approved. 1-hour emergency response guaranteed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1300309361"
              className={buttonClass('emergency', 'lg', 'emergency-pulse')}
              aria-label="Call emergency hotline 1300 309 361"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call 1300 309 361
            </a>
            <button
              className={buttonClass('secondary', 'lg')}
              onClick={() => {/* Handle quote request */}}
            >
              Get Free Quote
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-4 mt-8">
            <TrustBadge icon="⚡" text="1 Hour Response" />
            <TrustBadge icon="✓" text="Insurance Approved" />
            <TrustBadge icon="🏆" text="IICRC Certified" />
          </div>
        </div>
      </div>

      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
      >
        Skip to main content
      </a>
    </section>
  );
};

// ============================================================================
// SERVICE CARDS GRID
// ============================================================================

/**
 * Service cards showcasing main services
 * Demonstrates: Card patterns, responsive grid, hover states
 */
export const ServiceCardsGrid: React.FC = () => {
  const services = [
    {
      id: 'water',
      title: 'Water Damage Restoration',
      description: 'Fast water extraction, structural drying, and mould prevention for floods and leaks.',
      image: '/images/services/water-damage.jpg',
      urgent: true,
      features: ['24/7 Emergency Response', 'Insurance Claims Help', 'Mould Prevention'],
    },
    {
      id: 'fire',
      title: 'Fire & Smoke Damage',
      description: 'Complete fire damage restoration, smoke removal, and odor elimination services.',
      image: '/images/services/fire-damage.jpg',
      urgent: true,
      features: ['Soot & Smoke Removal', 'Odor Elimination', 'Structural Repairs'],
    },
    {
      id: 'mould',
      title: 'Mould Remediation',
      description: 'Safe mould removal, air quality testing, and prevention strategies.',
      image: '/images/services/mould-remediation.jpg',
      urgent: false,
      features: ['Safe Removal', 'Air Quality Testing', 'Prevention Plans'],
    },
  ];

  return (
    <section className={sectionClass('lg')} id="main-content">
      <div className={containerClass('xl')}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Our Emergency Services
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Professional disaster recovery services available 24/7 across Brisbane, Ipswich, and Logan
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-neutral-700 mb-6">
            Need immediate assistance with a disaster situation?
          </p>
          <a
            href="tel:1300309361"
            className={buttonClass('emergency', 'lg')}
          >
            Call Emergency Hotline
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EMERGENCY CONTACT FORM
// ============================================================================

/**
 * Emergency contact form with validation
 * Demonstrates: Form patterns, accessibility, validation states
 */
export const EmergencyContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    emergencyType: '',
    message: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className={sectionClass('md', 'bg-neutral-50')}>
      <div className={containerClass('sm')}>
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-emergency-200">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emergency-100 text-emergency-700 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-emergency-600 rounded-full" />
              URGENT ASSISTANCE
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Get Emergency Help Now
            </h2>
            <p className="text-neutral-600">
              We'll respond within 1 hour, guaranteed
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Your Name <span className="text-emergency-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-emergency-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Phone Number <span className="text-emergency-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                aria-required="true"
                placeholder="0400 000 000"
              />
            </div>

            {/* Emergency Type */}
            <div>
              <label
                htmlFor="emergencyType"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Type of Emergency <span className="text-emergency-600">*</span>
              </label>
              <select
                id="emergencyType"
                name="emergencyType"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.emergencyType}
                onChange={(e) => setFormData({...formData, emergencyType: e.target.value})}
                aria-required="true"
              >
                <option value="">Select emergency type</option>
                <option value="water">Water Damage / Flooding</option>
                <option value="fire">Fire & Smoke Damage</option>
                <option value="storm">Storm Damage</option>
                <option value="mould">Mould Problem</option>
                <option value="sewage">Sewage Backup</option>
                <option value="other">Other Emergency</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Describe Your Situation
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Please describe your emergency situation..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={buttonClass('emergency', 'lg', 'w-full')}
            >
              Get Emergency Help Now
            </button>

            {/* Alternative Contact */}
            <div className="text-center pt-4 border-t border-neutral-200">
              <p className="text-sm text-neutral-600 mb-2">
                Need immediate assistance?
              </p>
              <a
                href="tel:1300309361"
                className="inline-flex items-center gap-2 text-emergency-600 font-semibold hover:text-emergency-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call 1300 309 361
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENT HELPERS
// ============================================================================

/**
 * Trust Badge Component
 */
const TrustBadge: React.FC<{ icon: string; text: string }> = ({ icon, text }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-md text-white">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

/**
 * Service Card Component
 */
const ServiceCard: React.FC<{
  title: string;
  description: string;
  image: string;
  urgent: boolean;
  features: string[];
}> = ({ title, description, image, urgent, features }) => {
  return (
    <article className={cardClass('interactive', 'group h-full')}>
      {/* Image */}
      <div className="relative h-48 -m-6 mb-6 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {urgent && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-emergency-600 text-white text-xs font-bold rounded">
            24/7 URGENT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-900 mb-3">
          {title}
        </h3>
        <p className="text-neutral-600 mb-4">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
              <svg className="w-5 h-5 text-success-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className={buttonClass('primary', 'md', 'w-full')}>
          Get Help Now
        </button>
      </div>
    </article>
  );
};

// ============================================================================
// PROCESS SHOWCASE
// ============================================================================

/**
 * Step-by-step process visualization
 * Demonstrates: Process patterns, timeline design, icons
 */
export const ProcessShowcase: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Emergency Call',
      description: 'Contact our 24/7 hotline for immediate assistance',
      icon: '📞',
      time: 'Immediate',
    },
    {
      number: '2',
      title: 'Rapid Response',
      description: 'Our team arrives within 1 hour to assess damage',
      icon: '🚨',
      time: '< 1 hour',
    },
    {
      number: '3',
      title: 'Damage Assessment',
      description: 'Complete evaluation and restoration plan',
      icon: '📋',
      time: 'On arrival',
    },
    {
      number: '4',
      title: 'Restoration Work',
      description: 'Professional restoration using latest equipment',
      icon: '🔧',
      time: '1-5 days',
    },
    {
      number: '5',
      title: 'Final Inspection',
      description: 'Quality check and insurance documentation',
      icon: '✅',
      time: 'Completion',
    },
  ];

  return (
    <section className={sectionClass('lg')}>
      <div className={containerClass('xl')}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Our Restoration Process
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            From emergency call to complete restoration - we handle everything
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-4xl">{step.icon}</span>
                    <div>
                      <div className="text-sm text-primary-600 font-semibold">
                        STEP {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-2">{step.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-primary-600 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {step.time}
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  EmergencyHero,
  ServiceCardsGrid,
  EmergencyContactForm,
  ProcessShowcase,
};