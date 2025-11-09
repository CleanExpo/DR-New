import Link from 'next/link';
import { WifiOff, Phone, Home, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline - No Connection',
  description: 'You are currently offline. Emergency assistance: 1300 309 361',
  robots: {
    index: false,
    follow: false
  }
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <WifiOff className="w-10 h-10 text-red-700 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              You're Offline
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              It looks like you've lost your internet connection. Don't worry - some content may still be available from your cache.
            </p>

            {/* Emergency Alert */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Phone className="w-6 h-6 text-red-700" />
                <h2 className="font-bold text-red-900 text-lg">Emergency?</h2>
              </div>
              <p className="text-sm text-red-700 mb-4">
                For immediate assistance, call us when you have connection:
              </p>
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center min-h-[52px] px-6 bg-red-700 text-white font-bold text-lg rounded-xl hover:bg-red-800 active:bg-red-900 transition-colors shadow-lg w-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                1300 309 361
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <Link
              href="/"
              className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
          </div>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-3">What you can do:</h3>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Try switching between WiFi and mobile data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Some cached pages may still be available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Call us directly for urgent assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Disaster Recovery Brisbane
            <br />
            24/7 Emergency Restoration Services
          </p>
        </div>
      </div>
    </div>
  );
}
