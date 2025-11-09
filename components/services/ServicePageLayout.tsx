/**
 * Service Page Layout Component
 * Standard layout for all service pages
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

interface ServicePageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showCTA?: boolean;
}

export function ServicePageLayout({
  children,
  title,
  description,
  showCTA = true
}: ServicePageLayoutProps) {
  return (
    <div className="service-page-layout min-h-screen">
      {/* Optional Header Section */}
      {(title || description) && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-6">
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-xl text-gray-600 max-w-3xl">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Optional Emergency CTA */}
      {showCTA && (
        <section className="py-16 bg-red-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Emergency Assistance?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Call our 24/7 emergency line now for immediate response across Brisbane, Ipswich, and Logan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                aria-label="Call 1300 309 361 for emergency service"
              >
                <Phone className="w-6 h-6 mr-2" />
                1300 309 361
              </a>
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold text-xl rounded-lg border-2 border-white hover:bg-white hover:text-red-600 transition-all"
              >
                Start Online Claim
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ServicePageLayout;
