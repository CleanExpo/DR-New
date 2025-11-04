"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificationCard } from "@/components/contractor/CertificationCard"
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Upload,
  Save,
  Award,
  FileText,
  Shield,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BusinessInfo {
  businessName: string
  abn: string
  phone: string
  email: string
  address: string
  suburb: string
  state: string
  postcode: string
  website?: string
  description?: string
  logo?: string
}

interface Certification {
  id: string
  name: string
  code: string
  certificationNumber: string
  expiryDate: string
  verified: boolean
  serviceTypes: string[]
}

interface Insurance {
  id: string
  type: "public_liability" | "professional_indemnity" | "workers_comp"
  provider: string
  policyNumber: string
  coverageAmount: number
  expiryDate: string
  documentUrl?: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("business")
  const [loading, setLoading] = useState(false)
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: "Smith Restoration Services",
    abn: "12 345 678 901",
    phone: "0412 345 678",
    email: "john@smithrestoration.com.au",
    address: "123 Commercial Rd",
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4000",
    website: "www.smithrestoration.com.au",
    description:
      "Professional restoration services specialising in water damage, fire restoration, and mould remediation across Brisbane and Ipswich.",
    logo: undefined,
  })

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Water Damage Restoration Technician",
      code: "WRT",
      certificationNumber: "IICRC-WRT-12345",
      expiryDate: "2026-06-30",
      verified: true,
      serviceTypes: ["Water Damage", "Structural Drying", "Emergency Water Extraction"],
    },
    {
      id: "2",
      name: "Fire & Smoke Restoration Technician",
      code: "FSRT",
      certificationNumber: "IICRC-FSRT-67890",
      expiryDate: "2026-03-15",
      verified: true,
      serviceTypes: ["Fire Damage", "Smoke Damage", "Soot Removal"],
    },
    {
      id: "3",
      name: "Applied Microbial Remediation Technician",
      code: "AMRT",
      certificationNumber: "IICRC-AMRT-54321",
      expiryDate: "2025-12-20",
      verified: false,
      serviceTypes: ["Mould Remediation", "Microbial Growth", "Indoor Air Quality"],
    },
  ])

  const [insurance, setInsurance] = useState<Insurance[]>([
    {
      id: "1",
      type: "public_liability",
      provider: "QBE Insurance",
      policyNumber: "PL-2025-123456",
      coverageAmount: 20000000,
      expiryDate: "2026-06-30",
    },
    {
      id: "2",
      type: "professional_indemnity",
      provider: "Allianz",
      policyNumber: "PI-2025-789012",
      coverageAmount: 5000000,
      expiryDate: "2026-06-30",
    },
  ])

  const [serviceAreas, setServiceAreas] = useState<string[]>([
    "Brisbane CBD",
    "Ascot",
    "New Farm",
    "Hamilton",
    "Toowong",
    "Indooroopilly",
    "Ipswich CBD",
    "Springfield",
  ])

  const handleSaveBusinessInfo = async () => {
    setLoading(true)
    try {
      // TODO: API call to save business info
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Profile updated",
        description: "Your business information has been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // TODO: Upload to server/cloud storage
      const reader = new FileReader()
      reader.onloadend = () => {
        setBusinessInfo((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)

      toast({
        title: "Logo uploaded",
        description: "Your business logo has been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      })
    }
  }

  const handleCertificationUpload = () => {
    toast({
      title: "Upload certification",
      description: "Certificate upload functionality coming soon",
    })
  }

  const handleCertificationVerify = (certId: string) => {
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === certId ? { ...cert, verified: true } : cert
      )
    )
    toast({
      title: "Verification submitted",
      description: "Your certification has been submitted for NRPG verification",
    })
  }

  const getInsuranceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      public_liability: "Public Liability",
      professional_indemnity: "Professional Indemnity",
      workers_comp: "Workers Compensation",
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-8 w-8" />
          Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your business information and qualifications
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="areas">Service Areas</TabsTrigger>
        </TabsList>

        {/* Business Information */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Your business details displayed to clients and on the NRPG platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div>
                <Label>Business Logo</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={businessInfo.logo} />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">
                      {businessInfo.businessName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label htmlFor="logo-upload">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </span>
                      </Button>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 2MB. Recommended: 400x400px
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessInfo.businessName}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, businessName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="abn">ABN</Label>
                  <Input
                    id="abn"
                    value={businessInfo.abn}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, abn: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={businessInfo.website}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, website: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <Label>Business Address</Label>
                <Input
                  placeholder="Street Address"
                  value={businessInfo.address}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, address: e.target.value })
                  }
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Suburb"
                    value={businessInfo.suburb}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, suburb: e.target.value })
                    }
                  />
                  <Input
                    placeholder="State"
                    value={businessInfo.state}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, state: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Postcode"
                    value={businessInfo.postcode}
                    onChange={(e) =>
                      setBusinessInfo({ ...businessInfo, postcode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={businessInfo.description}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, description: e.target.value })
                  }
                  placeholder="Brief description of your services and expertise..."
                />
              </div>

              <Button onClick={handleSaveBusinessInfo} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    IICRC Certifications
                  </CardTitle>
                  <CardDescription>
                    Manage your IICRC certifications and NRPG verification status
                  </CardDescription>
                </div>
                <Button onClick={handleCertificationUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {certifications.map((cert) => (
                  <CertificationCard
                    key={cert.id}
                    certification={cert}
                    onUpload={handleCertificationUpload}
                    onVerify={() => handleCertificationVerify(cert.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance */}
        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Insurance Documentation
                  </CardTitle>
                  <CardDescription>
                    Maintain current insurance certificates
                  </CardDescription>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Add Insurance
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurance.map((ins) => (
                  <Card key={ins.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                              {getInsuranceTypeLabel(ins.type)}
                            </h3>
                            <Badge className="bg-green-600">Active</Badge>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                              <Label className="text-muted-foreground">Provider</Label>
                              <p className="font-medium">{ins.provider}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Policy Number</Label>
                              <p className="font-medium">{ins.policyNumber}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Coverage Amount</Label>
                              <p className="font-medium">
                                ${ins.coverageAmount.toLocaleString("en-AU")}
                              </p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Expiry Date</Label>
                              <p className="font-medium">
                                {new Date(ins.expiryDate).toLocaleDateString("en-AU")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Areas */}
        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Service Areas
              </CardTitle>
              <CardDescription>
                Suburbs and regions where you provide services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-sm px-3 py-1">
                      {area}
                      <button
                        onClick={() =>
                          setServiceAreas((prev) => prev.filter((a) => a !== area))
                        }
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add new service area..." />
                  <Button>Add Area</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: Your subscription coverage radius determines the maximum distance for job
                  assignments. Service areas help refine your preferences within that radius.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
