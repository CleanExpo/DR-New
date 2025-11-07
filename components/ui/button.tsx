import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary button - Main CTAs with premium hover effect
        default:
          "bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-500/40 active:translate-y-0 active:shadow-md rounded-lg",

        // Emergency button - Red with pulse animation
        emergency:
          "bg-emergency-600 text-white shadow-lg shadow-emergency-500/30 hover:bg-emergency-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emergency-500/40 active:translate-y-0 active:shadow-md rounded-lg emergency-pulse",

        // Success button - Green for confirmations
        success:
          "bg-success-600 text-white shadow-lg shadow-success-500/30 hover:bg-success-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-success-500/40 active:translate-y-0 active:shadow-md rounded-lg",

        // Secondary button - Outlined primary
        secondary:
          "bg-white text-primary-700 border-2 border-primary-600 shadow-md hover:bg-primary-50 hover:border-primary-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm rounded-lg",

        // Outline button - Neutral outlined
        outline:
          "bg-white text-neutral-700 border-2 border-neutral-300 shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm rounded-lg",

        // Ghost button - Minimal, for tertiary actions
        ghost:
          "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 rounded-lg",

        // Link button - Text only
        link:
          "bg-transparent text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 active:text-primary-800",

        // Premium button - Gradient for special offers
        premium:
          "bg-gradient-to-r from-premium-500 via-primary-600 to-success-600 text-white shadow-lg shadow-premium-500/30 hover:shadow-xl hover:shadow-premium-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md rounded-lg bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-300",
      },
      size: {
        sm: "h-10 min-h-[2.5rem] px-4 text-sm rounded-md",
        default: "h-11 min-h-[2.75rem] px-6 text-base rounded-lg",
        lg: "h-14 min-h-[3.5rem] px-8 text-lg rounded-lg",
        xl: "h-16 min-h-[4rem] px-10 text-xl rounded-xl",
        icon: "h-11 w-11 min-h-[2.75rem] min-w-[2.75rem] rounded-lg",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
