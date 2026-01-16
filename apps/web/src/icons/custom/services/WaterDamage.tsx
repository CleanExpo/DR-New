'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Water Damage Restoration icon
 * Represents water, flood, and restoration services
 */
export const WaterDamage = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        gradient="water"
        aria-label="Water Damage Restoration"
        {...props}
      >
        {/* Water Damage - Wave/Flood Concept */}
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 12c1.5-2 3-3 5-3s3.5 1 5 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M9 15c.667-1 1.333-1.5 3-1.5s2.333.5 3 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </Icon>
    );
  },
);

WaterDamage.displayName = 'WaterDamage';
