'use client';

import { useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useNetworkStatus } from '@/lib/pwa/offline-fallback';

export default function OfflineIndicator() {
  const { isOnline, wasOffline } = useNetworkStatus();

  useEffect(() => {
    if (isOnline && wasOffline) {
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-slide-down';
      toast.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span class="font-semibold">Back Online</span>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  }, [isOnline, wasOffline]);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-50 bg-red-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3">
          <WifiOff className="w-5 h-5 animate-pulse" />
          <div className="text-center">
            <p className="font-bold text-sm">You're Offline</p>
            <p className="text-xs text-red-100">Some features may be limited. For emergencies, call 1300 309 361</p>
          </div>
        </div>
      </div>
    </div>
  );
}
