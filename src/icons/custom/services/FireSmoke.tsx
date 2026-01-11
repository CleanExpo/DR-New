'use client';

import * as React from 'react';
import { Icon, IconProps } from '../../lib/Icon';

/**
 * Fire & Smoke Restoration icon
 * Represents fire damage and smoke remediation services
 */
export const FireSmoke = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon
        ref={ref}
        gradient="fire"
        aria-label="Fire & Smoke Restoration"
        {...props}
      >
        {/* Fire & Smoke - Flame Concept */}
        <path d="M12 2c.552 0 1 .448 1 1v5c0 .552-.448 1-1 1s-1-.448-1-1V3c0-.552.448-1 1-1z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 8c-1.5 1-2.5 2.5-2.5 4.5 0 3.314 2.239 6 5 6s5-2.686 5-6c0-2-1-3.5-2.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M10 14c0 1.105.895 2 2 2s2-.895 2-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </Icon>
    );
  },
);

FireSmoke.displayName = 'FireSmoke';
