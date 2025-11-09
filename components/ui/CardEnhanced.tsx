import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./LoadingStates"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
    interactive?: boolean
    loading?: boolean
  }
>(({ className, variant = 'default', interactive = false, loading = false, children, ...props }, ref) => {
  const variants = {
    default: "bg-white border-2 border-neutral-200 shadow-md",
    elevated: "bg-white border-2 border-neutral-200 shadow-lg",
    outlined: "bg-white border-2 border-neutral-300 shadow-none",
    ghost: "bg-transparent border-2 border-transparent shadow-none",
  }

  if (loading) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 space-y-4",
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" className="w-12 h-12" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-1/3" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl text-neutral-900 transition-all duration-300",
        variants[variant],
        interactive && "hover:shadow-xl hover:-translate-y-1 hover:border-primary-500 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref as any}
    className={cn(
      "font-display text-2xl font-bold leading-tight tracking-tight text-neutral-900",
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
    className={cn("text-base text-neutral-600 leading-relaxed", className)}
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
    className={cn("flex items-center gap-4 p-6 pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/* Service Card Pattern */
interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  action?: {
    label: string
    onClick: () => void
  }
  loading?: boolean
}

export const ServiceCard = ({
  icon,
  title,
  description,
  features,
  action,
  loading = false,
}: ServiceCardProps) => {
  return (
    <Card variant="default" interactive loading={loading}>
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-6 h-6 text-primary-600 group-hover:text-white transition-colors"
          })}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-neutral-700">
              <svg
                className="w-4 h-4 text-success-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      {action && (
        <CardFooter>
          <button
            onClick={action.onClick}
            className="w-full h-11 px-6 rounded-lg bg-white text-neutral-700 border-2 border-neutral-300 font-semibold text-base hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200"
          >
            {action.label}
          </button>
        </CardFooter>
      )}
    </Card>
  )
}

/* Stats Card Pattern */
interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change?: {
    value: string
    trend: 'up' | 'down' | 'neutral'
  }
  loading?: boolean
}

export const StatsCard = ({
  icon,
  label,
  value,
  change,
  loading = false,
}: StatsCardProps) => {
  const trendColors = {
    up: 'text-success-600',
    down: 'text-emergency-600',
    neutral: 'text-neutral-600',
  }

  return (
    <Card variant="default" loading={loading}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-600">{label}</p>
            <p className="text-4xl font-bold text-neutral-900 mt-2">{value}</p>
            {change && (
              <p className={cn("text-sm mt-1 flex items-center gap-1", trendColors[change.trend])}>
                {change.trend === 'up' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {change.trend === 'down' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
                <span>{change.value}</span>
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, {
              className: "w-6 h-6 text-primary-600"
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
