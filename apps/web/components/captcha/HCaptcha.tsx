/**
 * hCaptcha Component
 *
 * React wrapper for hCaptcha verification widget
 *
 * Setup:
 * 1. Create account at https://www.hcaptcha.com/
 * 2. Get site key from dashboard
 * 3. Set environment variables:
 *    - NEXT_PUBLIC_HCAPTCHA_SITE_KEY (client-side)
 *    - HCAPTCHA_SECRET (server-side)
 */

'use client';

import * as React from 'react';
import Script from 'next/script';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    hcaptcha?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark';
          size?: 'normal' | 'compact' | 'invisible';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
    onHCaptchaLoad?: () => void;
  }
}

export interface HCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
  className?: string;
}

export function HCaptcha({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = '',
}: HCaptchaProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  // Check if site key is configured
  React.useEffect(() => {
    if (!siteKey) {
      setError('hCaptcha not configured');
      setIsLoading(false);
      if (process.env.NODE_ENV === 'development') {
        console.warn('hCaptcha not configured. Development mode bypass available.');
      }
    }
  }, [siteKey]);

  // Initialise the widget once the hCaptcha script has loaded
  React.useEffect(() => {
    if (!scriptLoaded || !siteKey || !containerRef.current) return;

    const initCaptcha = async () => {
      try {
        // Wait for hCaptcha global to be available (script sets it asynchronously)
        let attempts = 0;
        while (!window.hcaptcha && attempts < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.hcaptcha) {
          throw new Error('hCaptcha failed to initialise');
        }

        if (containerRef.current && !widgetIdRef.current) {
          widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              setIsVerified(true);
              setError(null);
              onVerify(token);
            },
            'error-callback': () => {
              setError('Verification failed. Please try again.');
              onError?.('Verification failed');
            },
            'expired-callback': () => {
              setIsVerified(false);
              onExpire?.();
            },
            theme,
            size,
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('hCaptcha initialisation error:', err);
        setError('Failed to load verification widget');
        setIsLoading(false);
        onError?.(err instanceof Error ? err.message : 'Initialisation failed');
      }
    };

    initCaptcha();

    return () => {
      if (widgetIdRef.current && window.hcaptcha) {
        try {
          window.hcaptcha.remove(widgetIdRef.current);
        } catch {
          // Widget may already be removed
        }
        widgetIdRef.current = null;
      }
    };
  }, [scriptLoaded, siteKey, theme, size, onVerify, onExpire, onError]);

  // Reset function exposed via ref if needed
  const reset = React.useCallback(() => {
    if (widgetIdRef.current && window.hcaptcha) {
      window.hcaptcha.reset(widgetIdRef.current);
      setIsVerified(false);
    }
  }, []);

  // Development mode bypass
  if (!siteKey && process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`bg-yellow-50 border border-yellow-300 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">
            Development Mode
          </span>
        </div>
        <p className="text-sm text-yellow-700 mb-3">
          hCaptcha not configured. Click below to bypass for development.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsVerified(true);
            onVerify('development_bypass_token');
          }}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Bypass for Development
        </button>
      </div>
    );
  }

  // Error state
  if (error && !siteKey) {
    return (
      <div
        className={`bg-red-50 border border-red-300 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`bg-gray-100 border border-gray-300 rounded-lg p-6 flex items-center justify-center ${className}`}
      >
        <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
        <span className="ml-2 text-gray-400">Loading verification...</span>
      </div>
    );
  }

  // Verified state
  if (isVerified) {
    return (
      <div
        className={`bg-green-50 border border-green-300 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">
            Verification complete
          </span>
        </div>
      </div>
    );
  }

  // hCaptcha widget container
  return (
    <div className={`${className}`}>
      {/* Load hCaptcha via Next.js Script to avoid manual document.head.appendChild */}
      {siteKey && (
        <Script
          src="https://js.hcaptcha.com/1/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
          onError={() => {
            setError('Failed to load verification widget');
            setIsLoading(false);
            onError?.('Script load failed');
          }}
        />
      )}
      <div
        ref={containerRef}
        className="flex justify-center"
        style={{ minHeight: size === 'compact' ? '70px' : '78px' }}
      />
      {error && (
        <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}

export default HCaptcha;
