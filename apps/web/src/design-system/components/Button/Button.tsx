
/**
 * DesignOS Button Component
 *
 * Context-aware button with support for:
 * - Emergency context (red, no animations, large tap targets)
 * - Education context (teal, subtle animations)
 * - NRPG brand (navy/gold professional)
 *
 * Strategic decisions:
 * - Crisis pages: No animations, instant response, large targets
 * - Education pages: Subtle hover effects, engaging
 * - Dual CTAs on mobile: Full-width stacked
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { buttonPressAnimation, rippleVariants, rippleTransition } from '@/lib/animations';

const buttonVariants = cva(
  // Base styles (all buttons)
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[background-color,border-color,color] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 active:transition-transform active:duration-100 [active:transition-timing-function:cubic-bezier(0.19,1,0.22,1)]',
  {
    variants: {
      variant: {
        // Default variants (existing)
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // NEW: Semantic Color System (2026)
        'primary': 'bg-semantic-primary text-white hover:bg-semantic-primary-hover',
        'emergency': 'bg-semantic-emergency text-white hover:bg-semantic-emergency-hover transition-none',
        'emergency-outline': 'border-2 border-semantic-emergency text-semantic-emergency hover:bg-semantic-emergency-bg transition-none',
        'contractor-accent': 'bg-semantic-contractor text-white hover:bg-semantic-contractor-hover',

        // DesignOS: Emergency variants (no transition animations)
        'emergency-primary': 'bg-dr-emergency text-white hover:bg-dr-emergency-hover transition-none',
        'emergency-secondary': 'border-2 border-dr-emergency text-dr-emergency hover:bg-dr-emergency-bg transition-none',

        // DesignOS: Education variants (subtle animations allowed)
        'education-primary': 'bg-dr-education text-white hover:bg-dr-education-hover',
        'education-secondary': 'border border-dr-education-border text-dr-education hover:bg-dr-education-bg',

        // DesignOS: NRPG variants (professional network)
        'nrpg-primary': 'bg-nrpg-primary text-white hover:bg-nrpg-primary-hover',
        'nrpg-secondary': 'bg-nrpg-secondary text-white hover:bg-nrpg-secondary-hover',
        'nrpg-outline': 'border border-nrpg-border text-nrpg-text hover:bg-nrpg-bg',
      },
      size: {
        // Mobile-optimized: 48px minimum touch targets (Android Material Design guideline)
        // Desktop: 40px standard size
        default: 'sm:h-10 h-12 px-4 py-2 sm:py-2 py-3',
        sm: 'sm:h-9 h-10 rounded-md px-3',
        lg: 'sm:h-11 h-12 rounded-md px-8',
        xl: 'sm:h-14 h-14 rounded-lg px-10 text-lg', // Larger for emphasis
        icon: 'sm:h-10 sm:w-10 h-12 w-12', // 48x48 on mobile, 40x40 on desktop

        // DesignOS: Crisis-optimized (large tap targets)
        crisis: 'h-14 px-8 text-lg min-h-[56px]', // 56px minimum for panic users
        'crisis-full': 'h-14 px-8 text-lg min-h-[56px] w-full', // Full-width mobile

        // DesignOS: Call CTA (extra prominent)
        call: 'h-16 px-12 text-xl min-h-[64px] font-semibold', // Hero CTAs
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, icon, iconPosition = 'left', children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;
    const { isAnimationEnabled, isMobile } = useAnimation();
    const [isRippling, setIsRippling] = React.useState(false);
    const [ripplePos, setRipplePos] = React.useState({ x: 0, y: 0 });
    const [isPressed, setIsPressed] = React.useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isAnimationEnabled || disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      setRipplePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsRippling(true);

      setTimeout(() => setIsRippling(false), 600);
    };

    const handleTouchStart = () => {
      if (disabled || loading) return;
      setIsPressed(true);
    };

    const handleTouchEnd = () => {
      setIsPressed(false);
    };

    const motionProps = isAnimationEnabled && !disabled && !loading
      ? {
          ...buttonPressAnimation,
          onMouseDown: handleMouseDown,
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
        }
      : {
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
        };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          'relative overflow-hidden'
        )}
        ref={ref}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {/* Ripple effect */}
        {isRippling && isAnimationEnabled && (
          <motion.span
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
              left: ripplePos.x,
              top: ripplePos.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            transition={rippleTransition}
          />
        )}

        {/* Button content */}
        <span className="relative z-10 flex items-center">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {children}
            </>
          ) : (
            <>
              {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
              {children}
              {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
            </>
          )}
        </span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
