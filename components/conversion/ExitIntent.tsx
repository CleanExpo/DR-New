'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, AlertCircle, Clock } from 'lucide-react';

interface ExitIntentProps {
  enabled?: boolean;
  delay?: number;
  onClose?: () => void;
}

export function ExitIntent({ enabled = true, delay = 3000, onClose }: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!enabled || hasShown) {return;}

    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        timeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
        }, 200);
      }
    };

    // Show after delay if user hasn't already triggered it
    const delayTimeout = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, delay);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [enabled, hasShown, delay]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();

    // Store in sessionStorage to prevent showing again this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('exitIntentShown', 'true');
    }
  };

  const handleCTAClick = () => {
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_conversion', {
        event_category: 'engagement',
        event_label: 'exit_intent_phone_call',
      });
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with urgency banner */}
              <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 px-6 py-4 relative">
                <div className="flex items-center gap-3 text-white">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <AlertCircle className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">Wait! Emergency Help Available</h2>
                    <p className="text-emergency-100 text-sm">
                      Don't let damage get worse - immediate response available
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Main Message */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    Every Minute Counts in Water & Fire Damage
                  </h3>
                  <p className="text-lg text-neutral-700 mb-6">
                    Waiting can cost thousands in additional damage. Our IICRC Master Restorer team
                    can be on-site in 60 minutes or less.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <p className="font-semibold text-neutral-900">60-Min Response</p>
                    <p className="text-sm text-neutral-600">Guaranteed arrival time</p>
                  </div>

                  <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-center">
                    <svg
                      className="w-8 h-8 text-success-600 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <p className="font-semibold text-neutral-900">Insurance Direct Billing</p>
                    <p className="text-sm text-neutral-600">Work with all insurers</p>
                  </div>

                  <div className="bg-premium-50 border border-premium-200 rounded-xl p-4 text-center">
                    <svg
                      className="w-8 h-8 text-premium-600 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <p className="font-semibold text-neutral-900">Master Certified</p>
                    <p className="text-sm text-neutral-600">IICRC credentials</p>
                  </div>
                </div>

                {/* Urgency Timer */}
                <div className="bg-emergency-50 border-2 border-emergency-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-emergency-900">Special Offer Expires:</p>
                    <motion.div
                      className="text-2xl font-bold text-emergency-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <CountdownTimer />
                    </motion.div>
                  </div>
                  <p className="text-sm text-emergency-800">
                    Call now for FREE emergency assessment (normally $299)
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <a
                    href="tel:1300309361"
                    onClick={handleCTAClick}
                    className="block w-full bg-emergency-600 hover:bg-emergency-700 text-white text-center font-bold py-4 px-6 rounded-xl transition-colors shadow-lg group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Phone className="w-6 h-6" />
                      </motion.div>
                      <span className="text-lg">Call Now: 1300 309 361</span>
                    </div>
                    <span className="text-sm text-emergency-100 block mt-1">
                      Available 24/7 - Speak to emergency specialist
                    </span>
                  </a>

                  <button
                    onClick={handleClose}
                    className="block w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-center font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-xs text-neutral-600 text-center mb-3">
                    Trusted by 10,000+ Brisbane homeowners and businesses
                  </p>
                  <div className="flex items-center justify-center gap-6 opacity-60">
                    <div className="text-xs font-semibold text-neutral-700">IICRC Certified</div>
                    <div className="text-xs font-semibold text-neutral-700">Insurance Approved</div>
                    <div className="text-xs font-semibold text-neutral-700">Licensed & Insured</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Simple countdown timer component
function CountdownTimer() {
  const [time, setTime] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <span>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
}
