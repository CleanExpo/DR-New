/**
 * NRPG Growth Portal - Brand & Compliance Section
 *
 * Certification and compliance tracking with:
 * - Status badges
 * - Progress indicators
 * - Achievement tracking
 * - Next steps CTA
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, PlusCircle, Shield, Star, Award, Scale } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'complete' | 'pending' | 'action';
  icon: 'shield' | 'star' | 'award' | 'scale';
}

interface ComplianceSectionProps {
  items?: ComplianceItem[];
  nextSession?: string;
  progress?: number;
  className?: string;
}

const defaultItems: ComplianceItem[] = [
  {
    id: 'partner-status',
    title: 'NRPG Elite Partner Status',
    subtitle: 'Achieved: Jan 2024',
    status: 'complete',
    icon: 'shield',
  },
  {
    id: 'brand-alignment',
    title: 'Brand Alignment Review',
    subtitle: 'Status: Excellent',
    status: 'complete',
    icon: 'star',
  },
  {
    id: 'regulatory',
    title: 'Regulatory Compliance',
    subtitle: 'Last Audit: Oct 2024',
    status: 'complete',
    icon: 'scale',
  },
  {
    id: 'sustainability',
    title: 'NRPG Sustainability Initiative',
    subtitle: 'Join the program',
    status: 'action',
    icon: 'award',
  },
];

const iconMap = {
  shield: Shield,
  star: Star,
  award: Award,
  scale: Scale,
};

export function ComplianceSection({
  items = defaultItems,
  nextSession = 'Dec 5, 2024',
  progress = 75,
  className,
}: ComplianceSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-portal-text flex items-center gap-2 font-heading">
          <Award className="size-8 text-earth-secondary" />
          Brand & Compliance
        </h3>
        <span className="text-portal-success text-xs font-bold font-heading uppercase tracking-widest">
          Optimised Status
        </span>
      </div>

      {/* Card */}
      <div className="bg-portal-card rounded-xl border border-portal-border p-6 space-y-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        {/* Compliance Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center justify-between',
                  item.status === 'action' && 'group cursor-pointer'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'size-8 rounded flex items-center justify-center',
                      item.status === 'action' ? 'bg-portal-border text-portal-muted' : 'bg-nrpg-teal/10 text-nrpg-teal'
                    )}
                  >
                    {item.status === 'action' ? (
                      <PlusCircle className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </div>
                  <div>
                    <p
                      className={cn(
                        'text-sm font-bold font-heading',
                        item.status === 'action'
                          ? 'text-portal-text group-hover:text-earth-primary transition-colors'
                          : 'text-portal-text'
                      )}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-portal-muted font-body">{item.subtitle}</p>
                  </div>
                </div>
                {item.status === 'complete' && (
                  <CheckCircle className="size-5 text-portal-success" />
                )}
                {item.status === 'pending' && (
                  <Clock className="size-5 text-amber-500" />
                )}
                {item.status === 'action' && (
                  <Clock className="size-5 text-portal-border" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Section */}
        <div className="pt-4 border-t border-portal-border">
          <p className="text-xs text-portal-muted mb-3 font-body">
            Next Strategy Session: {nextSession}
          </p>
          <div className="w-full bg-portal-border rounded-full h-1.5">
            <div
              className="bg-nrpg-teal h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button className="w-full mt-6 py-2 border border-portal-border hover:bg-portal-border text-portal-text text-xs font-bold font-heading rounded-lg transition-colors uppercase tracking-widest">
            Enhance Firm Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplianceSection;
