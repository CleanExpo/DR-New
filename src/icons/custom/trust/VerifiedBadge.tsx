'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Verified badge icon
 * Represents verified contractors and professional credentials
 */
export const VerifiedBadge = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        aria-label="Verified Contractor"
        {...props}
      >
        {/* Verified Badge - Shield with Checkmark */}
        <path d="M12 2L18 5v5c0 4.5-6 8.5-6 8.5s-6-4-6-8.5V5l6-3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    );
  },
);

VerifiedBadge.displayName = 'VerifiedBadge';
