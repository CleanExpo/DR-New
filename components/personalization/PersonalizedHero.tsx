// Personalized Hero Component
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalization } from '@/lib/personalization';
import { Button } from '@/components/ui/button';
import { Phone, AlertCircle, Clock, Shield } from 'lucide-react';

export function PersonalizedHero() {
  const {
    getHeroContent,
    isEmergency,
    getLocationContent,
    getWeatherContent,
    trackInteraction,
    loading
  } = usePersonalization();

  const [heroContent, setHeroContent] = useState<any>(null);
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);

  useEffect(() => {
    if (!loading) {
      const content = getHeroContent();
      setHeroContent(content);
      setShowEmergencyBanner(isEmergency());
    }
  }, [loading, getHeroContent, isEmergency]);

  const handleCTAClick = () => {
    trackInteraction({
      type: 'click',
      target: 'hero_cta',
      timestamp: Date.now(),
      metadata: {
        isEmergency: isEmergency(),
        ctaText: heroContent?.cta?.text
      }
    });

    if (heroContent?.cta?.action.startsWith('tel:')) {
      window.location.href = heroContent.cta.action;
    } else {
      window.location.href = heroContent?.cta?.action || '/quote';
    }
  };

  const locationContent = getLocationContent();
  const weatherContent = getWeatherContent();

  if (loading) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto" />
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Emergency Banner */}
      <AnimatePresence>
        {showEmergencyBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-50 bg-red-600 text-white p-4"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 animate-pulse" />
                <span className="font-semibold">
                  Emergency Response Available Now - Call 1300 309 361
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.href = 'tel:1300309361'}
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather Alert */}
      {weatherContent?.hasActiveWeatherEvent && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-20 right-4 z-40 bg-amber-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Weather Alert</p>
              <p className="text-sm mt-1">
                {weatherContent.severity === 'extreme' ? 'Extreme' : 'Active'} {weatherContent.condition} conditions in your area
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroContent?.image || '/images/hero/disaster-recovery-services.jpg'}
          alt="Disaster Recovery Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Location Badge */}
          {locationContent?.isInServiceArea && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                Servicing {locationContent.city || 'your area'} - Response in 30-60 min
              </span>
            </motion.div>
          )}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {heroContent?.message || 'Professional Disaster Recovery Services'}
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/90 mb-8">
            {isEmergency()
              ? 'Our emergency response team is standing by to help you right now'
              : 'Brisbane\'s trusted disaster recovery experts - Available 24/7'}
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-5 w-5" />
              <span className="text-sm">24/7 Emergency</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Insurance Approved</span>
            </div>
            {locationContent?.isInServiceArea && (
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-5 w-5" />
                <span className="text-sm">Local Team Ready</span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={handleCTAClick}
              className={`
                ${isEmergency()
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700'}
                text-white px-8 py-6 text-lg font-semibold shadow-xl
              `}
            >
              <Phone className="h-5 w-5 mr-2" />
              {heroContent?.cta?.text || 'Get Help Now'}
            </Button>

            {!isEmergency() && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  trackInteraction({
                    type: 'click',
                    target: 'hero_secondary_cta',
                    timestamp: Date.now()
                  });
                  window.location.href = '/quote';
                }}
                className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 px-8 py-6 text-lg"
              >
                Get Free Quote
              </Button>
            )}
          </div>

          {/* Emergency Phone Number */}
          {isEmergency() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <a
                href="tel:1300309361"
                className="inline-flex items-center gap-3 text-white text-2xl font-bold hover:underline"
              >
                <Phone className="h-8 w-8 animate-bounce" />
                1300 309 361
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!isEmergency() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}