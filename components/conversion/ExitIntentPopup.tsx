'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionTracking } from '@/lib/conversion-tracking';

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [offerType, setOfferType] = useState<'emergency' | 'assessment' | 'discount'>('emergency');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'residential',
    urgency: 'immediate'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { trackConversion, trackEngagement } = useConversionTracking();

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('exitIntentShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    let exitIntentTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop when mouse leaves viewport from top
      if (e.clientY <= 0 && !hasShown && !showPopup) {
        // Delay slightly to avoid accidental triggers
        exitIntentTimer = setTimeout(() => {
          setShowPopup(true);
          setHasShown(true);
          sessionStorage.setItem('exitIntentShown', 'true');
          trackEngagement('exit_intent_triggered');

          // Choose offer type based on user behavior
          const timeOnSite = Date.now() - performance.timing.navigationStart;
          if (timeOnSite < 30000) {
            setOfferType('emergency');
          } else if (timeOnSite < 120000) {
            setOfferType('assessment');
          } else {
            setOfferType('discount');
          }
        }, 100);
      }
    };

    // Mobile detection - show after scroll behavior
    const handleMobileExitIntent = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const timeOnSite = Date.now() - performance.timing.navigationStart;

      if (scrollPercentage > 70 && timeOnSite > 20000 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        trackEngagement('mobile_exit_intent_triggered');
        setOfferType('assessment');
      }
    };

    // Add event listeners
    document.addEventListener('mouseout', handleMouseLeave);

    // Mobile handling
    if ('ontouchstart' in window) {
      window.addEventListener('scroll', handleMobileExitIntent);
    }

    // Also trigger on tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        trackEngagement('tab_switch_exit_intent');
        setOfferType('emergency');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleMobileExitIntent);
      if (exitIntentTimer) clearTimeout(exitIntentTimer);
    };
  }, [hasShown, showPopup, trackEngagement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track conversion
    trackConversion('exit_intent_lead_captured', 100, {
      offerType,
      urgency: formData.urgency,
      propertyType: formData.propertyType
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowThankYou(true);

    // Auto-close after showing thank you
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  const getOfferContent = () => {
    switch (offerType) {
      case 'emergency':
        return {
          title: "⚠️ WAIT! Your Property May Be At Risk!",
          subtitle: "Every minute counts when disaster strikes. Get immediate help now!",
          offer: "Priority Emergency Response + 20% OFF First Hour",
          cta: "Claim Emergency Offer",
          urgencyText: "This offer expires when you leave this page"
        };
      case 'assessment':
        return {
          title: "🔍 Don't Leave Without Your FREE Assessment!",
          subtitle: "Get a professional evaluation of your damage risk - absolutely FREE",
          offer: "FREE Property Damage Assessment (Value: $299)",
          cta: "Get Free Assessment",
          urgencyText: "Limited to first 10 properties this week"
        };
      case 'discount':
        return {
          title: "💰 EXCLUSIVE One-Time Offer!",
          subtitle: "Save hundreds on professional disaster recovery services",
          offer: "30% OFF Any Service + FREE Mould Inspection",
          cta: "Claim Your Discount",
          urgencyText: "This discount won't be offered again"
        };
    }
  };

  const offer = getOfferContent();

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            onClick={() => setShowPopup(false)}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto z-[9999]"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {!showThankYou ? (
                <div className="grid md:grid-cols-2">
                  {/* Left Side - Offer */}
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{offer.title}</h2>
                    <p className="text-lg mb-6">{offer.subtitle}</p>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                      <p className="text-2xl font-bold mb-2">{offer.offer}</p>
                      <p className="text-sm opacity-90">{offer.urgencyText}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 Emergency Response</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>IICRC Certified Technicians</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Insurance Direct Billing</span>
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mt-6 bg-red-700/50 rounded-lg p-3 text-center">
                      <p className="text-sm mb-1">Offer expires in:</p>
                      <CountdownDisplay />
                    </div>
                  </div>

                  {/* Right Side - Form */}
                  <div className="p-8 md:p-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Claim Your {offerType === 'emergency' ? 'Emergency' : offerType === 'assessment' ? 'Free Assessment' : 'Discount'} Now
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="residential">Residential Property</option>
                          <option value="commercial">Commercial Property</option>
                          <option value="industrial">Industrial Property</option>
                        </select>
                      </div>

                      <div>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="immediate">Immediate Emergency</option>
                          <option value="today">Need Help Today</option>
                          <option value="thisweek">This Week</option>
                          <option value="planning">Planning Ahead</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          offer.cta
                        )}
                      </button>

                      <p className="text-xs text-gray-600 text-center mt-3">
                        By submitting, you agree to our terms. We respect your privacy.
                      </p>
                    </form>

                    {/* Trust Indicators */}
                    <div className="mt-6 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4.9/5 from 847 reviews</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Thank You Screen
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Your {offerType === 'emergency' ? 'emergency offer' : offerType === 'assessment' ? 'free assessment' : 'discount'} has been secured!
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-800 font-semibold mb-2">What happens next:</p>
                    <ul className="text-left text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        Our team will call you within 15 minutes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        Your offer code has been saved to your account
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        Priority response has been activated
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <p className="text-gray-600">Need immediate help?</p>
                    <a href="tel:1300309361" className="text-2xl font-bold text-red-600">
                      1300 309 361
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Countdown Display Component
function CountdownDisplay() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-2xl font-bold font-mono">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}