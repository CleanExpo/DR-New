'use client';
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


import { useState } from 'react';
import Image from 'next/image';

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
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] cursor-pointer hover:-translate-y-1"
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

      {/* Bottom Trust Statement */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-blue-600 mb-1">$0</div>
            <p className="text-sm text-slate-600">Direct billing to insurer available</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-600 mb-1">24/7</div>
            <p className="text-sm text-slate-600">Emergency claims processing support</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-600 mb-1">100%</div>
            <p className="text-sm text-slate-600">IICRC-certified contractors</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-700 mb-4">
          Have an insurance claim to process?
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
          Request Emergency Service →
        </button>
      </div>
    </div>
  );
}
