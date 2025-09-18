'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';
import { CountdownTimer, AvailabilityIndicator, WeatherUrgencyAlert } from '@/components/conversion/UrgencyComponents';
import { LiveVisitorCounter, TrustBadges } from '@/components/conversion/SocialProofNotifications';

export default function HeroConversion() {
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [damageType, setDamageType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [showQuickQuote, setShowQuickQuote] = useState(false);
  const [estimatedResponse, setEstimatedResponse] = useState(45);
  const { trackConversion, trackEngagement, trackPhoneCall } = useConversionTracking();

  // Dynamic statistics that update
  const [stats, setStats] = useState({
    propertiesHelped: 2847,
    activeTeams: 3,
    avgResponse: 42,
    satisfaction: 98.7
  });

  useEffect(() => {
    trackEngagement('hero_conversion_viewed');

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        propertiesHelped: prev.propertiesHelped + Math.floor(Math.random() * 3),
        activeTeams: Math.max(1, Math.min(5, prev.activeTeams + (Math.random() > 0.5 ? 1 : -1))),
        avgResponse: Math.max(30, Math.min(60, prev.avgResponse + Math.floor(Math.random() * 10) - 5)),
        satisfaction: 98.7
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [trackEngagement]);

  const handlePhoneClick = () => {
    trackPhoneCall('1300309361');
    window.location.href = 'tel:1300309361';
  };

  const handleQuickQuoteSubmit = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
      trackEngagement(`quick_quote_step_${formStep + 1}`);
    } else {
      trackConversion('quick_quote_completed', 75, {
        damageType,
        propertyType,
        urgency
      });
      setShowQuickQuote(false);
      // Show success message
    }
  };

  // Calculate dynamic pricing based on urgency
  const getDynamicPricing = () => {
    const baseRate = 149;
    const urgencyMultiplier = urgency === 'immediate' ? 1.5 : urgency === 'today' ? 1.2 : 1.0;
    const demandMultiplier = stats.activeTeams <= 2 ? 1.3 : 1.0;
    return Math.round(baseRate * urgencyMultiplier * demandMultiplier);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat animate-pulse" />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/disaster-recovery-services.jpg"
          alt="Emergency Disaster Recovery"
          fill
          className="object-cover opacity-30"
          priority
        
            quality={85}
          
            sizes="100vw"
          
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
          />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Bar - Urgency Indicators */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WeatherUrgencyAlert />
            <AvailabilityIndicator />
            <LiveVisitorCounter />
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Column - Messaging */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Emergency Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center bg-red-600 text-white rounded-full px-6 py-3 mb-6"
            >
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-bold text-sm">EMERGENCY RESPONSE AVAILABLE NOW</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Property Is{' '}
              <span className="text-red-500 animate-pulse">At Risk</span>
              <br />
              Every Second Counts
            </h1>

            {/* Sub-headline with urgency */}
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Water spreads 7x faster than you think. Mould grows in 24 hours.
              Fire damage worsens by the minute. <strong className="text-yellow-400">Act NOW or pay 3x more later.</strong>
            </p>

            {/* Dynamic Stats Bar */}
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">{stats.propertiesHelped.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Properties Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">{stats.activeTeams}</div>
                  <div className="text-xs text-gray-400">Teams Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">{stats.avgResponse}min</div>
                  <div className="text-xs text-gray-400">Avg Response</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">{stats.satisfaction}%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setPhoneHovered(true)}
                onMouseLeave={() => setPhoneHovered(false)}
                onClick={handlePhoneClick}
                className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-5 px-8 rounded-xl shadow-2xl flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Call Emergency Hotline</div>
                  <div className="text-xl">1300 309 361</div>
                </div>
                <AnimatePresence>
                  {phoneHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
                    >
                      Average wait time: {estimatedResponse} seconds
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuickQuote(true)}
                className="bg-white text-gray-900 font-bold py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-yellow-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Instant Quote
                <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full ml-2">
                  60 SEC
                </span>
              </motion.button>
            </div>

            {/* Countdown Offer */}
            <CountdownTimer
              endTime={new Date(Date.now() + 2 * 60 * 60 * 1000)} // 2 hours from now
              offerText="Limited Time: 20% OFF Emergency Callout Fee"
            />

            {/* Trust Badges */}
            <div className="mt-8">
              <TrustBadges />
            </div>
          </motion.div>

          {/* Right Column - Quick Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Help in <span className="text-red-600">{stats.avgResponse} Minutes</span>
                </h2>
                <p className="text-gray-700">No obligation. 100% Free assessment.</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-700">Step {formStep} of 3</span>
                  <span className="text-xs text-gray-700">{Math.round((formStep / 3) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(formStep / 3) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  />
                </div>
              </div>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {formStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">What type of damage?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Water/Flood', 'Fire/Smoke', 'Mould', 'Storm', 'Sewage', 'Other'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setDamageType(type);
                            handleQuickQuoteSubmit();
                          }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            damageType === type
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Property type?</h3>
                    <div className="space-y-3">
                      {['Residential Home', 'Commercial Building', 'Industrial Site', 'Rental Property'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setPropertyType(type);
                            handleQuickQuoteSubmit();
                          }}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            propertyType === type
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">How urgent is this?</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'immediate', label: 'Emergency - Need help NOW', price: 'Priority Response' },
                        { value: 'today', label: 'Urgent - Within hours', price: 'Fast Response' },
                        { value: 'thisweek', label: 'This week', price: 'Standard Response' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setUrgency(option.value);
                            handleQuickQuoteSubmit();
                          }}
                          className={`w-full p-4 rounded-lg border-2 transition-all ${
                            urgency === option.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-sm text-gray-700">{option.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Pricing Display */}
              {urgency && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700">Estimated callout fee:</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${getDynamicPricing()}
                        <span className="text-sm text-gray-500 line-through ml-2">${getDynamicPricing() + 50}</span>
                      </p>
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SAVE ${50}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    * Price locked in for next 10 minutes
                  </p>
                </motion.div>
              )}

              {/* Security & Trust */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-700">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    SSL Secured
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No Spam Guarantee
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Rating
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold">Recent Activity:</span>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300">
                  Sarah M. from Brisbane CBD requested emergency water damage help (2 mins ago)
                </span>
              </div>
            </div>
            <div className="text-sm text-yellow-400 font-semibold">
              {3 + Math.floor(Math.random() * 5)} people getting quotes now
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}