'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designTokens } from '@/lib/design-tokens';

const iconVariants = cva('inline-flex items-center justify-center shrink-0', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
      '3xl': 'w-12 h-12',
      emergency: 'w-10 h-10',
      education: 'w-8 h-8',
      hero: 'w-20 h-20',
      service: 'w-16 h-16',
    },
    variant: {
      default: '',
      outline: 'stroke-current fill-none',
      filled: 'fill-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string;
  gradient?: keyof typeof designTokens.iconGradients;
  strokeWidth?: number;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  children?: React.ReactNode;
}

/**
 * Unified Icon component for custom NRPG disaster recovery icons
 * Supports gradients, sizing, and accessibility
 *
 * @example
 * <Icon size="service" gradient="water" aria-label="Water Damage">
 *   <path d="..." />
 * </Icon>
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size,
      variant,
      gradient,
      className,
      strokeWidth,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = !ariaLabel,
      children,
      ...props
    },
    ref,
  ) => {
    const gradientId = gradient
      ? `icon-gradient-${gradient}-${Math.random().toString(36).substr(2, 9)}`
      : undefined;

    const gradientConfig = gradient ? designTokens.iconGradients[gradient] : null;

    return (
      <svg
        ref={ref}
        className={cn(iconVariants({ size, variant }), className)}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      >
        {gradient && gradientConfig && (
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={gradientConfig.from} />
              <stop offset="100%" stopColor={gradientConfig.to} />
            </linearGradient>
          </defs>
        )}

        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          // Apply gradient to stroke if specified
          if (gradient && gradientConfig) {
            return React.cloneElement(child as React.ReactElement<any>, {
              stroke: `url(#${gradientId})`,
            });
          }

          return child;
        })}
      </svg>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
