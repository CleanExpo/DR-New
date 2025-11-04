import React from 'react';
import { OnboardingProvider } from '@/lib/contexts/OnboardingContext';
import Image from 'next/image';

export const metadata = {
  title: 'Contractor Registration | NRPG',
  description: 'Join the National Restoration Professionals Group and start receiving job opportunities',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-blue-600">NRPG</div>
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Contractor Registration
                  </h1>
                  <p className="text-sm text-gray-600">
                    Join the National Restoration Professionals Group
                  </p>
                </div>
              </div>

              {/* Help link */}
              <a
                href="/help/onboarding"
                target="_blank"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Need Help?
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                Questions about registration?{' '}
                <a href="mailto:support@nrpg.com.au" className="text-blue-600 hover:underline">
                  Contact our support team
                </a>
              </p>
              <p className="mt-2">
                &copy; {new Date().getFullYear()} National Restoration Professionals Group. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </OnboardingProvider>
  );
}
