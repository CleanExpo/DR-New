'use client';

import { Award, Shield, CheckCircle2, Clock, Users, BadgeCheck } from 'lucide-react';
import Image from 'next/image';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact' | 'footer';
  showAll?: boolean;
  className?: string;
}

export default function TrustBadges({
  variant = 'horizontal',
  showAll = true,
  className = ''
}: TrustBadgesProps) {
  const badges = [
    {
      id: 'iicrc',
      icon: Award,
      title: 'IICRC Certified',
      description: 'International standards in water, fire, mould & biohazard restoration',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      priority: 1
    },
    {
      id: 'carsi',
      icon: BadgeCheck,
      title: 'CARSI Member',
      description: 'Certified Australian Restoration Services Industry member',
      color: 'text-green-600',
      bg: 'bg-green-50',
      priority: 2
    },
    {
      id: 'insurance',
      icon: Shield,
      title: '$20M Coverage',
      description: 'Public liability insurance for your peace of mind',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      priority: 3
    },
    {
      id: 'response',
      icon: Clock,
      title: '1-Hour Response',
      description: '24/7 emergency response guarantee across Brisbane',
      color: 'text-red-600',
      bg: 'bg-red-50',
      priority: 4
    },
    {
      id: 'experience',
      icon: Users,
      title: '25+ Years',
      description: 'Industry experience and thousands of successful restorations',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      priority: 5
    },
    {
      id: 'approved',
      icon: CheckCircle2,
      title: 'Insurance Approved',
      description: 'Trusted by QBE, IAG, RACQ, Allianz & major insurers',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      priority: 6
    }
  ];

  const displayBadges = showAll ? badges : badges.slice(0, 4);

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {displayBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`inline-flex items-center gap-2 px-3 py-1.5 ${badge.bg} rounded-full`}
              title={badge.description}
            >
              <Icon className={`w-4 h-4 ${badge.color}`} />
              <span className="text-sm font-medium text-gray-800">{badge.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        {displayBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center text-center p-3"
            >
              <div className={`w-12 h-12 ${badge.bg} rounded-full flex items-center justify-center mb-2`}>
                <Icon className={`w-6 h-6 ${badge.color}`} />
              </div>
              <div className="text-xs font-semibold text-gray-700">{badge.title}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {displayBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`flex items-start gap-4 p-4 ${badge.bg} rounded-lg border-l-4 ${badge.color.replace('text-', 'border-')}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${badge.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-700">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default: horizontal variant
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {displayBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.id}
            className={`flex items-start gap-4 p-6 bg-white rounded-lg shadow-md border-t-4 ${badge.color.replace('text-', 'border-')} hover:shadow-lg transition-shadow`}
          >
            <div className={`flex-shrink-0 w-12 h-12 ${badge.bg} rounded-lg flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${badge.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Specialised badge for certification logos
export function CertificationLogos({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-200 h-24 w-32 flex items-center justify-center mb-2">
          <div className="text-blue-600 font-bold text-lg">IICRC</div>
        </div>
        <p className="text-xs text-gray-600 font-medium">Certified Firm</p>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-200 h-24 w-32 flex items-center justify-center mb-2">
          <div className="text-green-600 font-bold text-lg">CARSI</div>
        </div>
        <p className="text-xs text-gray-600 font-medium">Member Company</p>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-200 h-24 w-32 flex items-center justify-center mb-2">
          <Shield className="w-12 h-12 text-purple-600" />
        </div>
        <p className="text-xs text-gray-600 font-medium">$20M Insured</p>
      </div>

      <div className="text-center">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-orange-200 h-24 w-32 flex items-center justify-center mb-2">
          <div className="text-orange-600 font-bold text-sm">Master<br/>Restorer</div>
        </div>
        <p className="text-xs text-gray-600 font-medium">Qualified Team</p>
      </div>
    </div>
  );
}

// Insurance partner logos
export function InsurancePartnerLogos({ className = '' }: { className?: string }) {
  const partners = [
    { name: 'QBE', color: 'text-blue-700' },
    { name: 'IAG', color: 'text-red-600' },
    { name: 'RACQ', color: 'text-yellow-600' },
    { name: 'Allianz', color: 'text-blue-800' },
    { name: 'Suncorp', color: 'text-orange-600' },
    { name: 'AAMI', color: 'text-red-700' }
  ];

  return (
    <div className={className}>
      <h3 className="text-center text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
        Trusted by Major Insurers
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`font-bold text-lg ${partner.color}`}>
              {partner.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
