import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-elevated rounded-xl bg-white border border-neutral-200 text-neutral-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardPremium = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-premium",
      className
    )}
    {...props}
  />
))
CardPremium.displayName = "CardPremium"

const CardEmergency = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "emergency-card",
      className
    )}
    {...props}
  />
))
CardEmergency.displayName = "CardEmergency"

const CardGlass = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass-card rounded-2xl p-6",
      className
    )}
    {...props}
  />
))
CardGlass.displayName = "CardGlass"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "heading-section text-2xl font-bold leading-tight tracking-tight text-neutral-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-neutral-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Service Card Component
const ServiceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode
    title: string
    description: string
    href?: string
    variant?: 'primary' | 'emergency' | 'success'
  }
>(({ className, icon, title, description, href, variant = 'primary', children, ...props }, ref) => {
  const variantStyles = {
    primary: 'from-primary-100 to-primary-50 border-primary-200 text-primary-600',
    emergency: 'from-emergency-100 to-emergency-50 border-emergency-200 text-emergency-600',
    success: 'from-success-100 to-success-50 border-success-200 text-success-600',
  }

  return (
    <div ref={ref} className={cn("card-premium group", className)} {...props}>
      <div className="relative z-10">
        {icon && (
          <div className={cn(
            "w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-300",
            variantStyles[variant]
          )}>
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">{title}</h3>
        <p className="text-neutral-700 mb-6 leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  )
})
ServiceCard.displayName = "ServiceCard"

// Trust Badge Card
const TrustBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode
    value: string
    label: string
    variant?: 'primary' | 'emergency' | 'success' | 'premium'
  }
>(({ className, icon, value, label, variant = 'primary', ...props }, ref) => {
  const variantStyles = {
    primary: 'bg-primary-500/20 border-primary-400/30',
    emergency: 'bg-emergency-500/20 border-emergency-400/30',
    success: 'bg-success-500/20 border-success-400/30',
    premium: 'bg-premium-500/20 border-premium-400/30',
  }

  return (
    <div ref={ref} className={cn("text-center group", className)} {...props}>
      <div className={cn(
        "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300",
        variantStyles[variant]
      )}>
        {icon}
      </div>
      <div className="text-3xl font-black mb-2">{value}</div>
      <div className="text-sm text-neutral-200 font-semibold">{label}</div>
    </div>
  )
})
TrustBadge.displayName = "TrustBadge"

export {
  Card,
  CardPremium,
  CardEmergency,
  CardGlass,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ServiceCard,
  TrustBadge,
}
