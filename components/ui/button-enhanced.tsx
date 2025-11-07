import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary - Main CTAs
        primary:
          "btn-primary",

        // Emergency - Critical actions
        emergency:
          "btn-emergency",

        // Success - Positive confirmations
        success:
          "bg-gradient-to-r from-success-600 to-success-700 text-white shadow-lg shadow-success-500/30 hover:from-success-700 hover:to-success-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-success-500/40 active:translate-y-0 active:shadow-md rounded-lg",

        // Secondary - Outlined primary
        secondary:
          "bg-white text-primary-700 border-2 border-primary-600 shadow-md hover:bg-primary-50 hover:border-primary-700 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-sm rounded-lg",

        // Outline - Neutral outlined
        outline:
          "bg-white text-neutral-700 border-2 border-neutral-300 shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm rounded-lg",

        // Ghost - Minimal
        ghost:
          "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 rounded-lg",

        // Link - Text only
        link:
          "bg-transparent text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 active:text-primary-800",

        // Premium - Gradient for special offers
        premium:
          "bg-gradient-to-r from-premium-500 via-primary-600 to-success-600 text-white shadow-lg shadow-premium-500/30 hover:shadow-xl hover:shadow-premium-500/50 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 active:shadow-md rounded-lg bg-[length:200%_100%] hover:bg-[position:100%_0]",

        // Glass - Modern glassmorphism
        glass:
          "bg-white/10 backdrop-blur-lg text-white border border-white/20 shadow-lg hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 rounded-lg",
      },
      size: {
        sm: "h-10 min-h-[2.5rem] px-4 text-sm rounded-lg",
        default: "h-12 min-h-[3rem] px-6 text-base rounded-lg",
        lg: "h-14 min-h-[3.5rem] px-8 text-lg rounded-xl",
        xl: "h-16 min-h-[4rem] px-10 text-xl rounded-xl",
        "2xl": "h-20 min-h-[5rem] px-12 text-2xl rounded-2xl",
        icon: "h-12 w-12 min-h-[3rem] min-w-[3rem] rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
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

// Emergency Call Button Component
const EmergencyCallButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    phoneNumber?: string
    showIcon?: boolean
    size?: 'default' | 'lg' | 'xl' | '2xl'
  }
>(({ className, phoneNumber = "1300309361", showIcon = true, size = 'lg', children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={`tel:${phoneNumber}`}
      className={cn(
        buttonVariants({ variant: 'emergency', size }),
        "group",
        className
      )}
      {...props}
    >
      {showIcon && (
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:animate-pulse">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
      )}
      <div className="text-left">
        <div className="text-xs opacity-90 font-semibold">Emergency Hotline</div>
        <div className="text-xl font-black">{phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</div>
      </div>
    </a>
  )
})
EmergencyCallButton.displayName = "EmergencyCallButton"

// Icon Button with Tooltip
const IconButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    icon: React.ReactNode
    label: string
  }
>(({ className, icon, label, variant = 'outline', size = 'icon', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  )
})
IconButton.displayName = "IconButton"

export { Button, EmergencyCallButton, IconButton, buttonVariants }
