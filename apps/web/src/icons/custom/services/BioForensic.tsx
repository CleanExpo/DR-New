'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Bio & Forensic Cleaning icon
 * Represents biohazard and forensic cleaning services
 */
export const BioForensic = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        gradient="bio"
        aria-label="Bio & Forensic Cleaning"
        {...props}
      >
        {/* Biohazard - Molecule/Hazard Concept */}
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M10 9.5l2 4m2-4l-2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </Icon>
    );
  },
);

BioForensic.displayName = 'BioForensic';
