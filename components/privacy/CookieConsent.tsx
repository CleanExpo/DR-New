'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Settings, Shield, Cookie } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  companyName?: string;
  onAccept?: (preferences: CookiePreferences) => void;
  onDecline?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  privacyPolicyUrl = '/privacy',
  cookiePolicyUrl = '/cookies',
  companyName = 'Disaster Recovery Brisbane',
  onAccept,
  onDecline
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  // Check if consent has been given
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    const consentTimestamp = localStorage.getItem('cookie-consent-timestamp');

    if (!hasConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else if (consentTimestamp) {
      // Check if consent is older than 365 days (GDPR requirement)
      const timestamp = parseInt(consentTimestamp, 10);
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp > oneYear) {
        setTimeout(() => setIsVisible(true), 1000);
      }
    }
  }, []);

  const saveCookiePreferences = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString());

    // Set cookie for server-side checking
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
    document.cookie = `cookie-consent=${JSON.stringify(prefs)}; max-age=${maxAge}; path=/; SameSite=Strict; Secure`;

    // Trigger Google Analytics based on preferences
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable GA if consented
      (window as any).gtag?.('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else {
      // Disable GA if not consented
      (window as any).gtag?.('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // Handle marketing cookies
    if (prefs.marketing) {
      (window as any).gtag?.('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    } else {
      (window as any).gtag?.('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
    onAccept?.(allAccepted);
  }, [saveCookiePreferences, onAccept]);

  const handleAcceptSelected = useCallback(() => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
    onAccept?.(preferences);
  }, [preferences, saveCookiePreferences, onAccept]);

  const handleDeclineAll = useCallback(() => {
    const declined: CookiePreferences = {
      necessary: true, // Always required
      functional: false,
      analytics: false,
      marketing: false
    };
    saveCookiePreferences(declined);
    setIsVisible(false);
    onDecline?.();
  }, [saveCookiePreferences, onDecline]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
        onClick={() => setShowDetails(false)}
        aria-hidden="true"
      />

      {/* Cookie Consent Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-4 border-blue-600 shadow-2xl transform transition-transform"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-8 h-8 text-blue-600" aria-hidden="true" />
              <h2 id="cookie-consent-title" className="text-2xl font-bold text-gray-900">
                Cookie Settings
              </h2>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close cookie consent"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Main Content */}
          <div id="cookie-consent-description" className="mb-6">
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              We use cookies to enhance your experience on our website. By continuing to use {companyName} services,
              you agree to our use of cookies as described in our{' '}
              <a href={cookiePolicyUrl} className="text-blue-600 underline hover:text-blue-800 font-semibold">
                Cookie Policy
              </a>{' '}
              and{' '}
              <a href={privacyPolicyUrl} className="text-blue-600 underline hover:text-blue-800 font-semibold">
                Privacy Policy
              </a>.
            </p>

            {/* Cookie Categories */}
            {showDetails && (
              <div className="mt-6 space-y-4 border-t pt-6">
                {/* Necessary Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="necessary-cookies"
                    checked={preferences.necessary}
                    disabled
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                    aria-describedby="necessary-description"
                  />
                  <div className="flex-1">
                    <label htmlFor="necessary-cookies" className="font-semibold text-gray-900 text-lg">
                      Necessary Cookies
                      <span className="ml-2 text-sm text-gray-500">(Always Active)</span>
                    </label>
                    <p id="necessary-description" className="mt-1 text-gray-600">
                      Essential for website functionality, security, and accessibility. These cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="functional-cookies"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    aria-describedby="functional-description"
                  />
                  <div className="flex-1">
                    <label htmlFor="functional-cookies" className="font-semibold text-gray-900 text-lg cursor-pointer">
                      Functional Cookies
                    </label>
                    <p id="functional-description" className="mt-1 text-gray-600">
                      Enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="analytics-cookies"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    aria-describedby="analytics-description"
                  />
                  <div className="flex-1">
                    <label htmlFor="analytics-cookies" className="font-semibold text-gray-900 text-lg cursor-pointer">
                      Analytics Cookies
                    </label>
                    <p id="analytics-description" className="mt-1 text-gray-600">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="marketing-cookies"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    aria-describedby="marketing-description"
                  />
                  <div className="flex-1">
                    <label htmlFor="marketing-cookies" className="font-semibold text-gray-900 text-lg cursor-pointer">
                      Marketing Cookies
                    </label>
                    <p id="marketing-description" className="mt-1 text-gray-600">
                      Used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={showDetails}
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              {showDetails ? 'Hide' : 'Customize'} Settings
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleDeclineAll}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Decline All
              </button>

              {showDetails ? (
                <button
                  onClick={handleAcceptSelected}
                  className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Accept Selected
                </button>
              ) : (
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Accept All
                </button>
              )}
            </div>
          </div>

          {/* Privacy Shield Badge */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Your privacy is protected under GDPR and Australian Privacy Principles</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;