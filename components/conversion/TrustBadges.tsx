'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

interface TrustBadge {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'iicrc-master',
    title: 'IICRC Master Restorer',
    description: 'Highest industry certification - Phill McGurk',
    icon: <Award className="w-8 h-8" />,
  },
  {
    id: 'insurance-approved',
    title: 'All Insurers Approved',
    description: 'Direct billing with AAMI, Suncorp, IAG & more',
    icon: <Shield className="w-8 h-8" />,
  },
  {
    id: '247-emergency',
    title: '24/7 Emergency Service',
    description: '60-minute response guarantee',
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    id: '10k-customers',
    title: '10,000+ Customers',
    description: '5-star rated across Brisbane',
    icon: <Star className="w-8 h-8" />,
  },
];

const INSURANCE_LOGOS = [
  { name: 'AAMI', slug: 'aami' },
  { name: 'Suncorp', slug: 'suncorp' },
  { name: 'NRMA', slug: 'nrma' },
  { name: 'Allianz', slug: 'allianz' },
  { name: 'Budget Direct', slug: 'budget-direct' },
  { name: 'RACQ', slug: 'racq' },
];

interface TrustBadgesProps {
  variant?: 'grid' | 'inline' | 'compact';
  showInsuranceLogos?: boolean;
  className?: string;
}

export function TrustBadges({
  variant = 'grid',
  showInsuranceLogos = true,
  className = '',
}: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {TRUST_BADGES.slice(0, 3).map((badge, index) => (
          <motion.div
            key={badge.id}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-primary-600">{badge.icon}</div>
            <span className="text-sm font-semibold text-neutral-900 whitespace-nowrap">
              {badge.title}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {TRUST_BADGES.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">{badge.title}</p>
                <p className="text-xs text-neutral-600">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insurance Logos */}
        {showInsuranceLogos && (
          <div className="border-t border-neutral-200 pt-6">
            <p className="text-sm text-neutral-600 text-center mb-4 font-semibold">
              Approved by All Major Insurance Companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {INSURANCE_LOGOS.map((logo, index) => (
                <motion.div
                  key={logo.slug}
                  className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                >
                  <div className="w-20 h-12 bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200">
                    <span className="text-xs font-semibold text-neutral-700">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className={className}>
      {/* Trust Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {TRUST_BADGES.map((badge, index) => (
          <motion.div
            key={badge.id}
            className="bg-white border-2 border-neutral-200 hover:border-primary-300 rounded-xl p-6 text-center transition-all shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {badge.icon}
            </div>
            <h3 className="font-bold text-neutral-900 mb-2">{badge.title}</h3>
            <p className="text-sm text-neutral-600">{badge.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Insurance Partners Section */}
      {showInsuranceLogos && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              Approved Insurance Partner
            </h3>
            <p className="text-neutral-600">
              We work directly with all major insurance companies for seamless claims processing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INSURANCE_LOGOS.map((logo, index) => (
              <motion.div
                key={logo.slug}
                className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Placeholder for actual logos */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-lg mb-2 mx-auto flex items-center justify-center">
                    <Shield className="w-8 h-8 text-neutral-400" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-700">{logo.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              <strong>Direct Billing Available</strong> - We handle the entire claims process for you
            </p>
          </div>
        </div>
      )}

      {/* Certifications & Memberships */}
      <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-900">IICRC Certified</p>
              <p className="text-xs text-primary-700">Master Restorer Level</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-primary-300" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success-600 text-white rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-success-900">Fully Licensed</p>
              <p className="text-xs text-success-700">QLD QBCC Licensed</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-primary-300" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-premium-600 text-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-premium-900">$20M Insured</p>
              <p className="text-xs text-premium-700">Public Liability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
