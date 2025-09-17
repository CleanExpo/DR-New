'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Camera, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyMobileCTAProps {
  primaryPhone?: string;
  showChat?: boolean;
  showPhotoUpload?: boolean;
}

export default function StickyMobileCTA({
  primaryPhone = '1300 309 361',
  showChat = true,
  showPhotoUpload = true
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    setIsVisible(isMobile);

    // Handle resize
    const handleResize = () => {
      setIsVisible(window.innerWidth <= 768);
    };

    // Handle scroll for smart hiding
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide expanded menu
        setIsExpanded(false);
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    // Check for emergency mode
    const checkEmergency = () => {
      const params = new URLSearchParams(window.location.search);
      const emergency = params.get('emergency') === 'true';
      const path = window.location.pathname;
      const isEmergencyPage = path.includes('emergency') || path.includes('water-damage');

      setIsEmergencyMode(emergency || isEmergencyPage);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    checkEmergency();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  if (!isVisible) return null;

  const handlePhoneCall = () => {
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXX/XXXXXX',
        event_category: 'Emergency Call',
        event_label: 'Sticky Mobile CTA',
        value: 1
      });
    }
  };

  const handlePhotoUpload = () => {
    // Create input element for photo upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.multiple = true;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        // Handle file upload
        console.log('Files selected:', files);
        // You would implement the actual upload logic here
        alert('Photos selected. Our team will contact you immediately.');
      }
    };

    input.click();
  };

  return (
    <>
      {/* Main Sticky CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{
          y: scrollDirection === 'up' || isExpanded ? 0 : 80
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Emergency Mode Pulse Effect */}
        {isEmergencyMode && (
          <div className="absolute inset-0 bg-red-600 animate-pulse opacity-30 pointer-events-none" />
        )}

        {/* Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-t border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Quick Actions */}
                <div className="font-semibold text-gray-900 text-sm mb-2">
                  Quick Actions
                </div>

                {/* Photo Upload */}
                {showPhotoUpload && (
                  <button
                    onClick={handlePhotoUpload}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Send Photos</div>
                        <div className="text-xs text-gray-600">Show us the damage</div>
                      </div>
                    </div>
                    <ChevronUp className="w-4 h-4 text-gray-400 -rotate-90" />
                  </button>
                )}

                {/* Live Chat */}
                {showChat && (
                  <button
                    onClick={() => {
                      // Implement chat opening logic
                      if (typeof window !== 'undefined' && (window as any).openChat) {
                        (window as any).openChat();
                      }
                    }}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Live Chat</div>
                        <div className="text-xs text-gray-600">Get help now</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    </div>
                  </button>
                )}

                {/* Get Quote */}
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Get Quote</div>
                      <div className="text-xs text-gray-600">Free assessment</div>
                    </div>
                  </div>
                  <ChevronUp className="w-4 h-4 text-gray-400 -rotate-90" />
                </Link>

                {/* Service Areas */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600 text-center">
                    Servicing Brisbane • Ipswich • Logan • Gold Coast
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main CTA Buttons */}
        <div className={`${isEmergencyMode ? 'bg-red-600' : 'bg-blue-600'} shadow-2xl`}>
          <div className="flex items-stretch">
            {/* Expand/Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 bg-black/10 hover:bg-black/20 transition-colors border-r border-white/20"
              aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            >
              {isExpanded ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <ChevronUp className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Primary Call Button */}
            <Link
              href={`tel:${primaryPhone.replace(/\s/g, '')}`}
              onClick={handlePhoneCall}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 text-white hover:bg-black/10 transition-colors"
            >
              <Phone className={`w-5 h-5 ${isEmergencyMode ? 'animate-pulse' : ''}`} />
              <div className="text-left">
                <div className="text-xs uppercase tracking-wide opacity-90">
                  {isEmergencyMode ? 'Emergency' : '24/7 Hotline'}
                </div>
                <div className="text-lg font-bold">
                  {primaryPhone}
                </div>
              </div>
            </Link>

            {/* Secondary Action */}
            {showChat && (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).openChat) {
                    (window as any).openChat();
                  } else {
                    setIsExpanded(true);
                  }
                }}
                className="px-6 bg-black/10 hover:bg-black/20 transition-colors border-l border-white/20"
                aria-label="Open chat"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                {/* Online indicator */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </button>
            )}
          </div>

          {/* Emergency Mode Banner */}
          {isEmergencyMode && (
            <div className="bg-red-800 text-white text-center py-1 text-xs font-medium animate-pulse">
              EMERGENCY RESPONSE AVAILABLE NOW
            </div>
          )}
        </div>
      </motion.div>

      {/* Spacer to prevent content overlap */}
      {isVisible && (
        <div className="md:hidden h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      )}
    </>
  );
}