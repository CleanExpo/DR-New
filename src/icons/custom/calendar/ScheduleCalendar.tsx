'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Schedule Calendar icon
 * Represents appointment scheduling and booking
 */
export const ScheduleCalendar = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        aria-label="Schedule Appointment"
        {...props}
      >
        {/* Schedule Calendar - Calendar Grid */}
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 2v3M18 2v3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 8h18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Icon>
    );
  },
);

ScheduleCalendar.displayName = 'ScheduleCalendar';
