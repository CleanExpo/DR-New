'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Phone Call icon
 * Represents phone contact and emergency call actions
 */
export const PhoneCall = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        aria-label="Call for Service"
        {...props}
      >
        {/* Phone Call - Handset Design */}
        <path d="M4 3h3a1 1 0 011 1v3.5a1 1 0 01-.5.866L5.5 9.5c2 2 3.5 3.5 5.5 5.5l1.134-1.5A1 1 0 0114.5 13h3.5a1 1 0 011 1v3a2 2 0 01-2.18 2c-4.3 0-8.5-2-11-4.5-3-3-4.5-7-4.5-11A2 2 0 014 3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    );
  },
);

PhoneCall.displayName = 'PhoneCall';
