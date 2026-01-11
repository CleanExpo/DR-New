/**
 * DesignOS Emergency CTA Component
 *
 * Dual-path CTA for crisis users:
 * - Call Now (phone - immediate)
 * - Get Help Online (form - slightly less urgent)
 *
 * Strategic decision: Reduce decision paralysis by offering both options
 * Mobile: Full-width stacked
 * Desktop: Side-by-side cards
 */

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../Button/Button';
import { EmergencyAlert, ChatMessage } from '@/icons';
import { EMERGENCY_PRICING } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

export interface EmergencyCTAProps {
  onlineHelpUrl?: string;
  className?: string;
}

export function EmergencyCTA({
  onlineHelpUrl = '/claim/step-1?pricing_disclosed=true',
  className,
}: EmergencyCTAProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Emergency Service Card - Online Request Only */}
      <Card className="border-red-500 hover:border-red-600 transition-colors cursor-pointer group">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <EmergencyAlert size="lg" className="text-white" gradient="emergency" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-600">🚨 EMERGENCY SERVICE</h3>
              <p className="text-sm text-muted-foreground">{EMERGENCY_PRICING.display}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {EMERGENCY_PRICING.description} - Available 24/7
          </p>
          <ul className="text-xs text-muted-foreground mb-4 space-y-1">
            {EMERGENCY_PRICING.includes.map((item, idx) => (
              <li key={idx}>✓ {item}</li>
            ))}
          </ul>
          <Button
            variant="emergency-primary"
            size="crisis-full"
            className="w-full"
            onClick={() => window.location.href = onlineHelpUrl}
          >
            <ChatMessage size="md" className="mr-2" />
            Request Emergency Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Mobile-optimized Emergency CTA (sticky bottom)
 * Use on emergency intake forms for persistent access
 */
export function StickyEmergencyCTA({ onlineHelpUrl = '/claim/step-1?pricing_disclosed=true' }: { onlineHelpUrl?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent shadow-lg z-50 md:hidden">
      <Button
        variant="emergency-primary"
        size="crisis-full"
        className="w-full"
        onClick={() => window.location.href = onlineHelpUrl}
      >
        <ChatMessage size="md" className="mr-2" />
        Request Emergency Service - {EMERGENCY_PRICING.display}
      </Button>
    </div>
  );
}
