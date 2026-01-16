'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Mould Remediation icon
 * Represents mould growth remediation and mitigation services
 */
export const MouldRemediation = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        gradient="mould"
        aria-label="Mould Remediation"
        {...props}
      >
        {/* Mould Remediation - Shield/Protection Concept */}
        <path d="M12 2l6 3v5c0 4.5-4 7-6 8-2-1-6-3.5-6-8V5l6-3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    );
  },
);

MouldRemediation.displayName = 'MouldRemediation';
