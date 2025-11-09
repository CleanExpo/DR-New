'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Wrench, CheckCircle, Clock } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'call',
    title: 'Emergency Call',
    description: 'Call 1300 309 361 - speak to our emergency team immediately',
    time: '0 min',
    icon: <Phone className="w-6 h-6" />,
    color: 'emergency',
  },
  {
    id: 'dispatch',
    title: 'Team Dispatch',
    description: 'IICRC certified team dispatched to your location with equipment',
    time: '5 min',
    icon: <MapPin className="w-6 h-6" />,
    color: 'primary',
  },
  {
    id: 'arrival',
    title: 'On-Site Arrival',
    description: 'Master Restorer arrives and begins damage assessment',
    time: '30-60 min',
    icon: <Clock className="w-6 h-6" />,
    color: 'primary',
  },
  {
    id: 'mitigation',
    title: 'Damage Mitigation',
    description: 'Immediate action to prevent further damage and secure property',
    time: '60-90 min',
    icon: <Wrench className="w-6 h-6" />,
    color: 'success',
  },
  {
    id: 'stabilization',
    title: 'Stabilization',
    description: 'Property secured, drying equipment installed, restoration plan ready',
    time: '2-4 hours',
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'success',
  },
];

const COLOR_SCHEMES = {
  emergency: {
    bg: 'bg-emergency-500',
    border: 'border-emergency-500',
    text: 'text-emergency-600',
    light: 'bg-emergency-50',
  },
  primary: {
    bg: 'bg-primary-500',
    border: 'border-primary-500',
    text: 'text-primary-600',
    light: 'bg-primary-50',
  },
  success: {
    bg: 'bg-success-500',
    border: 'border-success-500',
    text: 'text-success-600',
    light: 'bg-success-50',
  },
};

export function EmergencyTimeline({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-3">
          60-Minute Emergency Response Guarantee
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          From your call to on-site action - here's our proven emergency response process
        </p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block relative">
        {/* Connecting Line */}
        <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-emergency-500 via-primary-500 to-success-500" />

        {/* Steps */}
        <div className="grid grid-cols-5 gap-4">
          {TIMELINE_STEPS.map((step, index) => {
            const colors = COLOR_SCHEMES[step.color as keyof typeof COLOR_SCHEMES];

            return (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Time Badge */}
                <div className="flex justify-center mb-4">
                  <div className={`${colors.bg} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {step.time}
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    className={`w-16 h-16 ${colors.bg} text-white rounded-full flex items-center justify-center shadow-xl relative z-10`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`${colors.light} border-2 ${colors.border} rounded-xl p-4 min-h-[160px]`}>
                  <h3 className={`${colors.text} font-bold text-lg mb-2`}>
                    {step.title}
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Number */}
                <div className="absolute -top-4 -left-2 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-6">
        {TIMELINE_STEPS.map((step, index) => {
          const colors = COLOR_SCHEMES[step.color as keyof typeof COLOR_SCHEMES];

          return (
            <motion.div
              key={step.id}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Vertical Line */}
              {index < TIMELINE_STEPS.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-1 bg-neutral-200" />
              )}

              {/* Step Number & Icon */}
              <div className="absolute left-0 top-0">
                <div className={`w-12 h-12 ${colors.bg} text-white rounded-full flex items-center justify-center shadow-xl relative z-10`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`${colors.light} border-2 ${colors.border} rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`${colors.text} font-bold text-lg`}>
                    {step.title}
                  </h3>
                  <div className={`${colors.bg} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {step.time}
                  </div>
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-emergency-600 to-emergency-700 rounded-xl p-8 text-center text-white shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-3">
          Every Minute Counts in an Emergency
        </h3>
        <p className="text-emergency-100 mb-6 max-w-2xl mx-auto">
          Our certified team is ready 24/7/365 to respond to your emergency. Don't wait - call now.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:1300309361"
            className="w-full sm:w-auto bg-white text-emergency-600 hover:bg-emergency-50 font-bold py-4 px-8 rounded-lg transition-colors shadow-lg inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call 1300 309 361
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto bg-emergency-800 hover:bg-emergency-900 text-white font-semibold py-4 px-8 rounded-lg transition-colors"
          >
            Request Callback
          </a>
        </div>
      </motion.div>
    </div>
  );
}
