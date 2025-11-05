'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, Shield, Clock, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmergencyMobileLayoutProps {
  children: React.ReactNode;
  emergencyNumber?: string;
  emergencyMessage?: string;
}

/**
 * Emergency Mobile Layout Component
 * Features:
 * - Sticky emergency call button on mobile
 * - High contrast for emergency situations
 * - Large touch targets for stressed users
 * - Quick access to critical information
 * - Simplified navigation for urgency
 */
export default function EmergencyMobileLayout({
  children,
  emergencyNumber = '1300309361',
  emergencyMessage = 'Emergency? Tap to call now!'
}: EmergencyMobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showEmergencyBar, setShowEmergencyBar] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Detect mobile device
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Handle scroll for emergency bar visibility
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Show emergency bar when scrolling up or at top
      if (position < 100) {
        setShowEmergencyBar(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Emergency call handler
  const handleEmergencyCall = () => {
    // Track emergency call attempt (for analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'emergency_call', {
        event_category: 'emergency',
        event_label: 'mobile_emergency_button'
      });
    }

    window.location.href = `tel:${emergencyNumber}`;
  };

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <div className={isMobile ? 'pb-20' : ''}>{children}</div>

      {/* Mobile Emergency Elements */}
      {isMobile && (
        <>
          {/* Emergency Top Bar */}
          <AnimatePresence>
            {showEmergencyBar && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white shadow-lg"
              >
                <div className="flex items-centre justify-between px-4 py-3">
                  <div className="flex items-centre gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-semibold">{emergencyMessage}</span>
                  </div>
                  <button
                    onClick={() => setShowEmergencyBar(false)}
                    className="p-1 rounded hover:bg-red-700 transition-colors"
                    aria-label="Close emergency banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Emergency Call Button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              size="lg"
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full w-16 h-16 p-0 flex items-centre justify-centre"
              aria-label={`Emergency call ${emergencyNumber}`}
            >
              <Phone className="w-8 h-8" />
            </Button>

            {/* Pulse animation for attention */}
            <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-30" />
          </motion.div>

          {/* Quick Action Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
          >
            <div className="flex items-centre justify-around py-3 px-2">
              {/* Emergency Call */}
              <button
                onClick={handleEmergencyCall}
                className="flex flex-col items-centre gap-1 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors min-w-0 flex-1"
              >
                <Phone className="w-6 h-6 text-red-600" />
                <span className="text-xs font-semibold text-red-600">Call Now</span>
              </button>

              {/* Services */}
              <button
                onClick={() => window.location.href = '/services'}
                className="flex flex-col items-centre gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors min-w-0 flex-1"
              >
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">Services</span>
              </button>

              {/* Response Time */}
              <div className="flex flex-col items-centre gap-1 px-3 py-2 min-w-0 flex-1">
                <Clock className="w-6 h-6 text-green-600" />
                <span className="text-xs font-medium text-green-600">60min</span>
              </div>

              {/* Scroll to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behaviour: 'smooth' })}
                className="flex flex-col items-centre gap-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors min-w-0 flex-1"
              >
                <ChevronUp className="w-6 h-6 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">Top</span>
              </button>
            </div>
          </motion.div>

          {/* Emergency Information Card (shows on first visit) */}
          {scrollPosition < 200 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="fixed top-20 left-4 right-4 z-40"
            >
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-orange-900 mb-1">
                        Emergency Situation?
                      </h3>
                      <p className="text-sm text-orange-800 mb-3">
                        For immediate assistance with water damage, fire damage,
                        or hazardous situations - call now for 60-minute response.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleEmergencyCall}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call {emergencyNumber}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setScrollPosition(300)}
                          className="text-orange-700 border-orange-300"
                        >
                          View Services
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}

      {/* High Contrast Mode for Emergency Situations */}
      <style jsx global>{`
        @media (max-width: 767px) {
          /* Enhance text contrast for emergency situations */
          .emergency-high-contrast {
            color: #000000;
            background-color: #ffffff;
            text-shadow: none;
          }

          /* Larger touch targets for stressed users */
          .emergency-touch-target {
            min-height: 44px;
            min-width: 44px;
          }

          /* Simplified focus styles for emergency situations */
          .emergency-focus:focus {
            outline: 3px solid #dc2626;
            outline-offset: 2px;
          }
        }
      `}</style>
    </div>
  );
}