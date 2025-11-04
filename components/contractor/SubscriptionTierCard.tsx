import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubscriptionTier {
  id: string
  name: string
  price: number
  radius: number
  features: string[]
  popular?: boolean
}

interface SubscriptionTierCardProps {
  tier: SubscriptionTier
  currentTier?: boolean
  onSelect?: () => void
}

export function SubscriptionTierCard({
  tier,
  currentTier = false,
  onSelect,
}: SubscriptionTierCardProps) {
  return (
    <Card
      className={cn(
        "relative",
        currentTier && "border-blue-500 shadow-lg",
        tier.popular && !currentTier && "border-amber-500"
      )}
    >
      {tier.popular && !currentTier && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500">
          Most Popular
        </Badge>
      )}
      {currentTier && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
          Current Plan
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <CardDescription>{tier.radius}km Coverage Radius</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${tier.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {tier.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        {onSelect && (
          <Button
            onClick={onSelect}
            className="w-full"
            variant={currentTier ? "outline" : "default"}
            disabled={currentTier}
          >
            {currentTier ? "Current Plan" : "Select Plan"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "radius_25",
    name: "Starter",
    price: 99,
    radius: 25,
    features: [
      "25km coverage radius",
      "Access to local rotation queue",
      "Basic job notifications",
      "Standard support",
      "Monthly billing",
    ],
  },
  {
    id: "radius_50",
    name: "Professional",
    price: 199,
    radius: 50,
    popular: true,
    features: [
      "50km coverage radius",
      "Priority in rotation queue",
      "Real-time job notifications",
      "Priority support",
      "Monthly or annual billing",
      "Performance analytics",
    ],
  },
  {
    id: "radius_100",
    name: "Premium",
    price: 349,
    radius: 100,
    features: [
      "100km coverage radius",
      "Top priority in queue",
      "Instant job notifications",
      "24/7 priority support",
      "Flexible billing options",
      "Advanced analytics",
      "Marketing support",
    ],
  },
  {
    id: "rural",
    name: "Rural Coverage",
    price: 499,
    radius: 200,
    features: [
      "200km+ coverage radius",
      "Exclusive rural territories",
      "Emergency job priority",
      "Dedicated account manager",
      "Custom billing terms",
      "Full marketing suite",
      "Premium insurance partnerships",
    ],
  },
]
