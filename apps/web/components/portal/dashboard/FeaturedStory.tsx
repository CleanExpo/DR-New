/**
 * NRPG Growth Portal - Featured Story Card
 *
 * Large magazine-style card with:
 * - Hero image with gradient overlay
 * - Featured badge
 * - Title, description, and CTA
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface FeaturedStoryProps {
  badge?: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  className?: string;
}

export function FeaturedStory({
  badge = 'Featured Story',
  title,
  description,
  imageUrl,
  href,
  className,
}: FeaturedStoryProps) {
  return (
    <div
      className={cn(
        'bg-portal-card rounded-xl overflow-hidden shadow-lg',
        'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
    >
      {/* Hero Image */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
          <span className="px-3 py-1 bg-nrpg-teal/80 text-white text-xs font-bold font-heading rounded-full uppercase tracking-widest">
            {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-portal-text font-heading leading-tight">
          {title}
        </h3>
        <p className="text-portal-muted text-sm font-body line-clamp-3">
          {description}
        </p>
        <Link
          href={href}
          className="w-full px-4 py-2 bg-earth-primary text-white text-xs font-bold font-heading rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-earth-secondary transition-colors"
        >
          Learn More <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export default FeaturedStory;
