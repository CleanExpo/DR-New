'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Emergency Alert icon
 * Represents urgent alerts and 24/7 emergency services
 */
export const EmergencyAlert = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        gradient="emergency"
        aria-label="Emergency Alert"
        {...props}
      >
        {/* Emergency Alert - Siren Bell */}
        <path d="M4 6l2-3h12l2 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 8h14v8c0 3.866-2.686 7-6 7h-2c-3.314 0-6-3.134-6-7V8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="3" r="1.5" fill="currentColor" />
        <circle cx="16" cy="3" r="1.5" fill="currentColor" />
      </Icon>
    );
  },
);

EmergencyAlert.displayName = 'EmergencyAlert';
