"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { SubscriptionTierCard, SUBSCRIPTION_TIERS } from "@/components/contractor/SubscriptionTierCard"
import {
  CheckCircle,
  Building2,
  Award,
  MapPin,
  CreditCard,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type OnboardingStep = 1 | 2 | 3 | 4 | 5

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [saving, setSaving] = useState(false)

  // Step 1: Business Details
  const [businessName, setBusinessName] = useState("")
  const [abn, setAbn] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")

  // Step 2: IICRC Certifications
  const [certifications, setCertifications] = useState<Array<{ type: string; number: string; file?: File }>>([])

  // Step 3: Service Areas
  const [serviceAreas, setServiceAreas] = useState<string[]>([])
  const [newArea, setNewArea] = useState("")

  // Step 4: Subscription Plan
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Step 5: Payment Setup
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardName, setCardName] = useState("")

  const availableCertTypes = [
    "Water Damage Restoration Technician (WRT)",
    "Fire & Smoke Restoration Technician (FSRT)",
    "Applied Microbial Remediation Technician (AMRT)",
    "Odour Control Technician (OCT)",
    "Upholstery & Fabric Cleaning Technician (UFT)",
  ]

  const suggestedAreas = [
    "Brisbane CBD",
    "Ascot",
    "New Farm",
    "Hamilton",
    "Toowong",
    "Indooroopilly",
    "Ipswich CBD",
    "Springfield",
    "Logan Central",
    "Browns Plains",
  ]

  const progress = (currentStep / 5) * 100

  const handleNext = async () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!businessName || !abn || !phone || !email) {
        toast({
          title: "Required fields missing",
          description: "Please fill in all business details",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep === 2) {
      if (certifications.length === 0) {
        toast({
          title: "Certifications required",
          description: "Please add at least one IICRC certification",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep === 3) {
      if (serviceAreas.length === 0) {
        toast({
          title: "Service areas required",
          description: "Please select at least one service area",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep === 4) {
      if (!selectedPlan) {
        toast({
          title: "Plan selection required",
          description: "Please select a subscription plan",
          variant: "destructive",
        })
        return
      }
    }

    if (currentStep === 5) {
      await handleComplete()
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5) as OnboardingStep)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as OnboardingStep)
  }

  const handleComplete = async () => {
    setSaving(true)
    try {
      // TODO: Submit onboarding data to API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Welcome to NRPG!",
        description: "Your contractor profile has been created successfully",
      })

      router.push("/contractor")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addCertification = () => {
    setCertifications([...certifications, { type: "", number: "" }])
  }

  const addServiceArea = () => {
    if (newArea && !serviceAreas.includes(newArea)) {
      setServiceAreas([...serviceAreas, newArea])
      setNewArea("")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to NRPG Platform</h1>
        <p className="text-muted-foreground mt-2">
          Let's get your contractor profile set up in a few simple steps
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Step {currentStep} of 5</span>
          <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 1 && <><Building2 className="h-6 w-6" /> Business Details</>}
            {currentStep === 2 && <><Award className="h-6 w-6" /> IICRC Certifications</>}
            {currentStep === 3 && <><MapPin className="h-6 w-6" /> Service Areas</>}
            {currentStep === 4 && <><CreditCard className="h-6 w-6" /> Choose Your Plan</>}
            {currentStep === 5 && <><CreditCard className="h-6 w-6" /> Payment Setup</>}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Tell us about your restoration business"}
            {currentStep === 2 && "Upload your IICRC certification details"}
            {currentStep === 3 && "Select the areas where you provide services"}
            {currentStep === 4 && "Select the subscription plan that suits your coverage needs"}
            {currentStep === 5 && "Set up your payment method for subscription billing"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Business Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Smith Restoration Services"
                  />
                </div>
                <div>
                  <Label htmlFor="abn">ABN *</Label>
                  <Input
                    id="abn"
                    value={abn}
                    onChange={(e) => setAbn(e.target.value)}
                    placeholder="12 345 678 901"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0412 345 678"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Business Address *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Commercial Rd, Brisbane QLD 4000"
                />
              </div>
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Brief description of your services and expertise..."
                />
              </div>
            </div>
          )}

          {/* Step 2: IICRC Certifications */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Certification Type</Label>
                        <select
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                          value={cert.type}
                          onChange={(e) => {
                            const updated = [...certifications]
                            updated[index].type = e.target.value
                            setCertifications(updated)
                          }}
                        >
                          <option value="">Select certification...</option>
                          {availableCertTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Certification Number</Label>
                        <Input
                          value={cert.number}
                          onChange={(e) => {
                            const updated = [...certifications]
                            updated[index].number = e.target.value
                            setCertifications(updated)
                          }}
                          placeholder="IICRC-WRT-12345"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Upload Certificate</Label>
                      <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addCertification}>
                Add Another Certification
              </Button>
            </div>
          )}

          {/* Step 3: Service Areas */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Select Service Areas</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {suggestedAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <Checkbox
                        id={area}
                        checked={serviceAreas.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setServiceAreas([...serviceAreas, area])
                          } else {
                            setServiceAreas(serviceAreas.filter((a) => a !== area))
                          }
                        }}
                      />
                      <Label htmlFor={area} className="cursor-pointer">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Add Custom Area</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="Enter suburb name..."
                  />
                  <Button onClick={addServiceArea}>Add</Button>
                </div>
              </div>
              {serviceAreas.length > 0 && (
                <div>
                  <Label>Selected Areas ({serviceAreas.length})</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {serviceAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Subscription Plan */}
          {currentStep === 4 && (
            <div className="grid gap-6 md:grid-cols-2">
              {SUBSCRIPTION_TIERS.map((tier) => (
                <SubscriptionTierCard
                  key={tier.id}
                  tier={tier}
                  currentTier={selectedPlan === tier.id}
                  onSelect={() => setSelectedPlan(tier.id)}
                />
              ))}
            </div>
          )}

          {/* Step 5: Payment Setup */}
          {currentStep === 5 && (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input
                    id="cardExpiry"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Your payment information is securely processed by Stripe.
                  You won't be charged until your onboarding is approved.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || saving}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={saving}>
          {currentStep === 5 ? (
            <>
              {saving ? "Completing..." : "Complete Setup"}
              <CheckCircle className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
