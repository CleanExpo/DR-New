'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneCall, Clock, MapPin } from 'lucide-react';

interface CallTrackerProps {
  phoneNumber?: string;
  className?: string;
  variant?: 'fixed' | 'inline' | 'header';
}

export function CallTracker({
  phoneNumber = '1300309361',
  className = '',
  variant = 'fixed',
}: CallTrackerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const trackCall = () => {
    // Track analytics (integrate with Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'call_initiated', {
        event_category: 'engagement',
        event_label: 'emergency_phone_call',
        value: 1,
      });
    }

    // You can also send to your backend for tracking
    fetch('/api/track-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        timestamp: new Date().toISOString(),
        variant,
      }),
    }).catch(() => {
      // Silent fail - don't block the call
    });
  };

  const formattedNumber = phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  const callUrl = `tel:${phoneNumber}`;

  // Fixed floating button variant
  if (variant === 'fixed') {
    return (
      <motion.a
        href={callUrl}
        onClick={trackCall}
        className={`fixed bottom-6 left-6 z-40 bg-emergency-600 hover:bg-emergency-700 text-white rounded-full shadow-2xl transition-all ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Call emergency line: ${formattedNumber}`}
      >
        <div className="flex items-center gap-3 p-4">
          <motion.div
            animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Phone className="w-6 h-6" />
          </motion.div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="pr-4">
              <p className="text-sm font-semibold">{formattedNumber}</p>
              <p className="text-xs text-emergency-100">24/7 Emergency</p>
            </div>
          </motion.div>
        </div>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-emergency-400 rounded-full -z-10"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Status Indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full" />
      </motion.a>
    );
  }

  // Header variant (compact)
  if (variant === 'header') {
    return (
      <a
        href={callUrl}
        onClick={trackCall}
        className={`inline-flex items-center gap-2 bg-emergency-600 hover:bg-emergency-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg ${className}`}
        aria-label={`Call emergency line: ${formattedNumber}`}
      >
        <PhoneCall className="w-4 h-4 animate-pulse" />
        <span className="hidden sm:inline">{formattedNumber}</span>
        <span className="sm:hidden">Call Now</span>
      </a>
    );
  }

  // Inline variant (full-width card)
  return (
    <motion.a
      href={callUrl}
      onClick={trackCall}
      className={`block bg-gradient-to-r from-emergency-600 to-emergency-700 hover:from-emergency-700 hover:to-emergency-800 text-white rounded-xl shadow-xl overflow-hidden transition-all ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Call emergency line: ${formattedNumber}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-emergency-100 font-medium">
                24/7 Emergency Line
              </p>
              <p className="text-2xl font-bold">{formattedNumber}</p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PhoneCall className="w-8 h-8" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emergency-200" />
            <span className="text-sm text-emergency-100">
              60-min response
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emergency-200" />
            <span className="text-sm text-emergency-100">
              Brisbane Wide
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-emergency-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
              <span className="text-sm text-emergency-100">
                Available Now
              </span>
            </div>
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              Tap to Call
            </span>
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </motion.a>
  );
}
