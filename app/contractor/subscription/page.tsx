"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SubscriptionTierCard, SUBSCRIPTION_TIERS } from "@/components/contractor/SubscriptionTierCard"
import { CoverageMapFallback } from "@/components/contractor/CoverageMap"
import {
  CreditCard,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Receipt,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Subscription {
  id: string
  tierId: string
  tierName: string
  monthlyFee: number
  radius: number
  baseLocation: { lat: number; lng: number; address: string }
  autoRenew: boolean
  nextBillingDate: string
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE"
  startDate: string
}

interface BillingHistory {
  id: string
  invoiceNumber: string
  amount: number
  date: string
  status: "PAID" | "PENDING" | "FAILED"
  paymentMethod: string
}

export default function SubscriptionPage() {
  const { toast } = useToast()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  const fetchSubscriptionData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/subscriptions?contractorId=contractor-1')
      // const data = await response.json()

      // Mock data
      setSubscription({
        id: "sub-1",
        tierId: "radius_50",
        tierName: "Professional",
        monthlyFee: 199,
        radius: 50,
        baseLocation: {
          lat: -27.4698,
          lng: 153.0251,
          address: "Brisbane CBD, QLD 4000",
        },
        autoRenew: true,
        nextBillingDate: "2025-11-15",
        status: "ACTIVE",
        startDate: "2024-05-01",
      })

      const mockHistory: BillingHistory[] = [
        {
          id: "1",
          invoiceNumber: "SUB-2025-11",
          amount: 199,
          date: "2025-11-01",
          status: "PAID",
          paymentMethod: "Visa ****1234",
        },
        {
          id: "2",
          invoiceNumber: "SUB-2025-10",
          amount: 199,
          date: "2025-10-01",
          status: "PAID",
          paymentMethod: "Visa ****1234",
        },
        {
          id: "3",
          invoiceNumber: "SUB-2025-09",
          amount: 199,
          date: "2025-09-01",
          status: "PAID",
          paymentMethod: "Visa ****1234",
        },
      ]

      setBillingHistory(mockHistory)
    } catch (error) {
      console.error("Failed to fetch subscription data:", error)
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAutoRenew = async (enabled: boolean) => {
    try {
      // TODO: API call to update auto-renew
      setSubscription((prev) => (prev ? { ...prev, autoRenew: enabled } : null))
      toast({
        title: "Auto-renew updated",
        description: `Auto-renew has been ${enabled ? "enabled" : "disabled"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update auto-renew",
        variant: "destructive",
      })
    }
  }

  const handleUpgrade = async (tierId: string) => {
    try {
      // TODO: API call to upgrade subscription
      const newTier = SUBSCRIPTION_TIERS.find((t) => t.id === tierId)
      if (newTier && subscription) {
        setSubscription({
          ...subscription,
          tierId: newTier.id,
          tierName: newTier.name,
          monthlyFee: newTier.price,
          radius: newTier.radius,
        })
      }
      setShowUpgradeDialog(false)
      toast({
        title: "Subscription upgraded",
        description: "Your subscription has been upgraded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upgrade subscription",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async () => {
    try {
      // TODO: API call to cancel subscription
      setSubscription((prev) => (prev ? { ...prev, status: "CANCELLED", autoRenew: false } : null))
      setShowCancelDialog(false)
      toast({
        title: "Subscription cancelled",
        description: "Your subscription will remain active until the end of the current billing period",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string; icon: any }> = {
      ACTIVE: { color: "bg-green-100 text-green-800", label: "Active", icon: CheckCircle },
      CANCELLED: { color: "bg-gray-100 text-gray-800", label: "Cancelled", icon: AlertCircle },
      PAST_DUE: { color: "bg-red-100 text-red-800", label: "Past Due", icon: AlertCircle },
    }
    const variant = variants[status] || variants.ACTIVE
    const Icon = variant.icon
    return (
      <Badge className={variant.color}>
        <Icon className="h-3 w-3 mr-1" />
        {variant.label}
      </Badge>
    )
  }

  const getBillingStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      PAID: "bg-green-100 text-green-800",
      PENDING: "bg-amber-100 text-amber-800",
      FAILED: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[status] || ""}>{status}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-muted-foreground">Loading subscription details...</p>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-4">No active subscription found</p>
        <Button onClick={() => setShowUpgradeDialog(true)}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Select a Plan
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CreditCard className="h-8 w-8" />
          Subscription
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your NRPG subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            {getStatusBadge(subscription.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-3xl font-bold">{subscription.tierName}</h3>
                <Badge className="bg-blue-600">
                  {subscription.radius}km Radius
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Monthly Fee</Label>
                  <p className="text-2xl font-bold">
                    ${subscription.monthlyFee}
                    <span className="text-base font-normal text-muted-foreground">/month</span>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Base Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{subscription.baseLocation.address}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Next Billing Date</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(subscription.nextBillingDate).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Member Since</Label>
                  <p className="mt-1">
                    {new Date(subscription.startDate).toLocaleDateString("en-AU", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-2 block">Coverage Area</Label>
              <CoverageMapFallback radius={subscription.radius} height="300px" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="auto-renew" className="text-base font-medium">
                Auto-Renewal
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically renew subscription each month
              </p>
            </div>
            <Switch
              id="auto-renew"
              checked={subscription.autoRenew}
              onCheckedChange={handleToggleAutoRenew}
              disabled={subscription.status !== "ACTIVE"}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setShowUpgradeDialog(true)} className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Change Plan
            </Button>
            <Button variant="outline" className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
            {subscription.status === "ACTIVE" && (
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setShowCancelDialog(true)}
              >
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>Your subscription payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString("en-AU")}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${item.amount.toLocaleString("en-AU")}
                  </TableCell>
                  <TableCell>{item.paymentMethod}</TableCell>
                  <TableCell>{getBillingStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Select a new plan that fits your coverage needs
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 py-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <SubscriptionTierCard
                key={tier.id}
                tier={tier}
                currentTier={tier.id === subscription.tierId}
                onSelect={() => {
                  setSelectedTier(tier.id)
                  if (tier.id !== subscription.tierId) {
                    handleUpgrade(tier.id)
                  }
                }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Important</h4>
                  <p className="text-sm text-amber-800">
                    Your subscription will remain active until{" "}
                    {new Date(subscription.nextBillingDate).toLocaleDateString("en-AU")}.
                    After this date, you will no longer receive job assignments through the NRPG platform.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You can reactivate your subscription at any time before the end of the current billing period.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
