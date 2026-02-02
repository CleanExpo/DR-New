/**
 * Insurance Partners Logo Section Component
 *
 * Displays logos of major Australian insurers that trust NRPG
 * - NRMA Insurance
 * - RACV
 * - AAMI
 * - Suncorp
 * - Allianz Australia
 *
 * These partnerships establish institutional trust
 * Insurance partnerships = "vetted by financial institutions"
 * Critical E.E.A.T signal for property damage claims
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, StatCard } from '@/src/design-system';

interface InsurancePartner {
  name: string;
  logo: string;
  url: string;
  description: string;
}

const INSURANCE_PARTNERS: InsurancePartner[] = [
  {
    name: 'NRMA Insurance',
    logo: '/logos/nrma-insurance.svg',
    url: 'https://nrma.com.au',
    description: 'Major Australian insurer, approved for emergency restoration claims',
  },
  {
    name: 'RACV',
    logo: '/logos/racv.svg',
    url: 'https://racv.com.au',
    description: 'Victorian insurance partner for home and business coverage',
  },
  {
    name: 'AAMI',
    logo: '/logos/aami.svg',
    url: 'https://aami.com.au',
    description: 'Home and car insurance, integrated claims process',
  },
  {
    name: 'Suncorp',
    logo: '/logos/suncorp.svg',
    url: 'https://suncorp.com.au',
    description: 'Home insurance partner across all states',
  },
  {
    name: 'Allianz',
    logo: '/logos/allianz.svg',
    url: 'https://allianz.com.au',
    description: 'Comprehensive insurance coverage coordination',
  },
];

export function InsurancePartners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Trusted by Major Australian Insurers
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          NRPG contractors are approved and preferred by leading Australian insurance companies.
          Direct billing, standardized documentation, and transparent pricing eliminate disputes.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
        {INSURANCE_PARTNERS.map(partner => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
            onMouseEnter={() => setHoveredPartner(partner.name)}
            onMouseLeave={() => setHoveredPartner(null)}
          >
            {/* Logo Placeholder - In production, use Next.js Image */}
            <div className="w-24 h-16 mb-3 flex items-center justify-center bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <span className="text-center text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors px-2">
                {partner.name}
              </span>
            </div>

            {/* Partner Name */}
            <p className="font-bold text-slate-900 text-center text-sm mb-1">
              {partner.name}
            </p>

            {/* Hover Description */}
            {hoveredPartner === partner.name && (
              <p className="text-xs text-slate-600 text-center absolute bg-white rounded-lg p-2 w-32 z-10 shadow-md">
                {partner.description}
              </p>
            )}
          </a>
        ))}
      </div>

      {/* Bottom Trust Statement - Premium StatCard Components */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Direct Billing"
            value="$0"
            subtitle="No upfront payment required"
            variant="success"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
          />
          <StatCard
            title="Availability"
            value="24/7"
            subtitle="Emergency claims support"
            variant="info"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Certification Rate"
            value="100%"
            subtitle="IICRC-certified contractors"
            variant="success"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* CTA - Premium Button Component */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-700 mb-4">
          Have an insurance claim to process?
        </p>
        <Button
          size="lg"
          variant="emergency"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          }
          iconPosition="right"
        >
          Request Emergency Service
        </Button>
      </div>
    </div>
  );
}
