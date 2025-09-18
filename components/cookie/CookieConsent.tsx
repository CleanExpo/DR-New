'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Shield, BarChart, Target } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Apply saved preferences
      try {
        const savedPrefs = JSON.parse(cookieChoice);
        applyPreferences(savedPrefs);
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply preferences to various tracking scripts
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (prefs.analytics) {
        window.gtag = window.gtag || function() {
          (window.dataLayer = window.dataLayer || []).push(arguments);
        };
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      } else {
        window.gtag = window.gtag || function() {
          (window.dataLayer = window.dataLayer || []).push(arguments);
        };
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }

      // Marketing cookies
      if (prefs.marketing) {
        window.gtag && window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      } else {
        window.gtag && window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(preferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const rejectAll = () => {
    const rejected = {
      necessary: true, // Cannot reject necessary cookies
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(rejected);
    localStorage.setItem('cookieConsent', JSON.stringify(rejected));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    applyPreferences(rejected);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center mb-2">
                <Cookie className="w-6 h-6 text-blue-600 mr-2" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-gray-900">Cookie Preferences</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                We use cookies to enhance your experience, analyse site traffic, and deliver personalised content.
                Your privacy is important to us.
              </p>

              {!showDetails ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    aria-label="Reject all optional cookies"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    aria-label="Customize cookie preferences"
                  >
                    Customize
                  </button>
                  <Link
                    href="/privacy-policy"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cookie Categories */}
                  <div className="space-y-3">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-3" aria-hidden="true" />
                        <div>
                          <h3 className="font-medium text-gray-900">Necessary Cookies</h3>
                          <p className="text-xs text-gray-600">Required for website functionality</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded cursor-not-allowed opacity-50"
                        aria-label="Necessary cookies (always enabled)"
                      />
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <BarChart className="w-5 h-5 text-blue-600 mr-3" aria-hidden="true" />
                        <div>
                          <h3 className="font-medium text-gray-900">Analytics Cookies</h3>
                          <p className="text-xs text-gray-600">Help us understand how you use our website</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label="Enable analytics cookies"
                      />
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-3" aria-hidden="true" />
                        <div>
                          <h3 className="font-medium text-gray-900">Marketing Cookies</h3>
                          <p className="text-xs text-gray-600">Used for targeted advertising</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label="Enable marketing cookies"
                      />
                    </div>

                    {/* Preference Cookies */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Cookie className="w-5 h-5 text-orange-600 mr-3" aria-hidden="true" />
                        <div>
                          <h3 className="font-medium text-gray-900">Preference Cookies</h3>
                          <p className="text-xs text-gray-600">Remember your settings and preferences</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label="Enable preference cookies"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={acceptSelected}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      aria-label="Save cookie preferences"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                      aria-label="Go back to simple options"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for accessibility */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        aria-hidden="true"
        onClick={() => setShowBanner(false)}
      />
    </>
  );
}

// Add TypeScript global window interface extension
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}