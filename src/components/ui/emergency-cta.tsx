'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, MapPin } from 'lucide-react';
import Link from 'next/link';

interface EmergencyCTAProps {
  variant?: 'default' | 'urgent' | 'hero';
  text?: string;
  className?: string;
}

export function EmergencyCTA(...args: any[]): void {
  const getButtonStyle = () => {
    switch(variant) {
      case 'urgent':
        return 'bg-red-700 hover:bg-red-800 text-white animate-pulse';
      case 'hero':
        return 'bg-blue-700 hover:bg-orange-700 text-white text-lg px-8 py-6';
      default:
        return 'bg-blue-700 hover:bg-blue-800 text-white';
    }
  };

  return (
    <Link href="/get-help">
      <Button size="lg" className={`${getButtonStyle()} ${className}`}>
        {variant === 'urgent' && <AlertTriangle className="mr-2 h-5 w-5" />}
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
}

export function LocationCTA(...args: any[]): void {
  const text = city && service 
    ? `Get ${service} Quote in ${city}`
    : city 
    ? `Get Help in ${city}`
    : 'Get Instant Quote';

  return (
    <Link href="/get-help">
      <Button size="lg" className="bg-green-600 hover:bg-green-800 text-white">
        <MapPin className="mr-2 h-5 w-5" />
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
}