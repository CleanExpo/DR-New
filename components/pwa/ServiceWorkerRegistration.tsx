'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      setRegistration(reg);
      console.log('[PWA] Service Worker registered successfully');

      // Check for updates on load and every hour
      reg.update();
      setInterval(() => {
        reg.update();
      }, 60 * 60 * 1000);

      // Listen for updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) {return;}

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
            console.log('[PWA] New version available');
          }
        });
      });

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New Service Worker activated');
        window.location.reload();
      });

    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
    }
  };

  const updateServiceWorker = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-8 lg:max-w-md z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl shadow-2xl p-5 border border-blue-600">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-base mb-1">Update Available</h3>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">
              A new version of the app is ready. Refresh to get the latest features and improvements.
            </p>

            <div className="flex gap-2">
              <button
                onClick={updateServiceWorker}
                className="flex-1 min-h-[44px] bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm"
              >
                Update Now
              </button>
              <button
                onClick={() => setUpdateAvailable(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 rounded-xl transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
