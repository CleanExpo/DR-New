import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary button - Main CTAs with premium hover effect
        default:
          "bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-500/40 active:translate-y-0 active:shadow-md focus-visible:ring-primary-600",

        // Emergency button - Red with pulse animation
        emergency:
          "bg-emergency-600 text-white shadow-lg shadow-emergency-500/30 hover:bg-emergency-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emergency-500/40 active:translate-y-0 active:shadow-md focus-visible:ring-emergency-600 animate-pulse-subtle",

        // Success button - Green for confirmations
        success:
          "bg-success-600 text-white shadow-lg shadow-success-500/30 hover:bg-success-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-success-500/40 active:translate-y-0 active:shadow-md focus-visible:ring-success-600",

        // Warning button - Amber for cautionary actions
        warning:
          "bg-warning-600 text-white shadow-lg shadow-warning-500/30 hover:bg-warning-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-warning-500/40 active:translate-y-0 active:shadow-md focus-visible:ring-warning-600",

        // Secondary button - Outlined primary
        secondary:
          "bg-white text-primary-700 border-2 border-primary-600 shadow-md hover:bg-primary-50 hover:border-primary-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm focus-visible:ring-primary-600",

        // Outline button - Neutral outlined
        outline:
          "bg-white text-neutral-700 border-2 border-neutral-300 shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus-visible:ring-neutral-600",

        // Ghost button - Minimal, for tertiary actions
        ghost:
          "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus-visible:ring-neutral-600",

        // Link button - Text only
        link:
          "bg-transparent text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 active:text-primary-800 focus-visible:ring-primary-600",

        // Premium button - Gradient for special offers
        premium:
          "bg-gradient-to-r from-premium-500 via-primary-600 to-success-600 text-white shadow-lg shadow-premium-500/30 hover:shadow-xl hover:shadow-premium-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus-visible:ring-premium-600 bg-[length:200%_100%] hover:bg-[position:100%_0]",

        // Destructive button - For delete/remove actions
        destructive:
          "bg-emergency-600 text-white border-2 border-emergency-700 shadow-md hover:bg-emergency-700 hover:border-emergency-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm focus-visible:ring-emergency-600",
      },
      size: {
        sm: "h-9 min-h-[2.25rem] px-3 text-sm rounded-md [&_svg]:size-4",
        default: "h-11 min-h-[2.75rem] px-6 text-base rounded-lg [&_svg]:size-5",
        lg: "h-14 min-h-[3.5rem] px-8 text-lg rounded-lg [&_svg]:size-6",
        xl: "h-16 min-h-[4rem] px-10 text-xl rounded-xl [&_svg]:size-6",
        icon: "h-11 w-11 min-h-[2.75rem] min-w-[2.75rem] rounded-lg [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    const content = loading ? (
      <>
        <Loader2 className="animate-spin" aria-hidden="true" />
        <span>{loadingText || children}</span>
      </>
    ) : (
      <>
        {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
