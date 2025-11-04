import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, AlertCircle, CheckCircle, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certification {
  id: string
  name: string
  code: string
  certificationNumber: string
  expiryDate: string
  verified: boolean
  serviceTypes: string[]
}

interface CertificationCardProps {
  certification: Certification
  onUpload?: () => void
  onVerify?: () => void
}

export function CertificationCard({
  certification,
  onUpload,
  onVerify,
}: CertificationCardProps) {
  const daysUntilExpiry = Math.ceil(
    (new Date(certification.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  const getExpiryStatus = () => {
    if (daysUntilExpiry < 0) {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        status: "Expired",
        icon: AlertCircle,
      }
    }
    if (daysUntilExpiry < 30) {
      return {
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        status: "Urgent",
        icon: AlertCircle,
      }
    }
    if (daysUntilExpiry < 60) {
      return {
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        status: "Expiring Soon",
        icon: AlertCircle,
      }
    }
    return {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      status: "Valid",
      icon: CheckCircle,
    }
  }

  const expiryStatus = getExpiryStatus()
  const StatusIcon = expiryStatus.icon

  return (
    <Card className={cn("border", expiryStatus.borderColor)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn("rounded-lg p-2", expiryStatus.bgColor)}>
              <Award className={cn("h-5 w-5", expiryStatus.color)} />
            </div>
            <div>
              <CardTitle className="text-base">{certification.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{certification.code}</p>
            </div>
          </div>
          {certification.verified && (
            <Badge className="bg-blue-600">NRPG Verified</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Certificate #</p>
            <p className="font-medium">{certification.certificationNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expiry Date</p>
            <p className="font-medium">
              {new Date(certification.expiryDate).toLocaleDateString("en-AU")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <StatusIcon className={cn("h-4 w-4", expiryStatus.color)} />
          <span className={cn("font-medium", expiryStatus.color)}>
            {expiryStatus.status}
            {daysUntilExpiry >= 0 && ` - ${daysUntilExpiry} days remaining`}
          </span>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Linked Service Types</p>
          <div className="flex flex-wrap gap-2">
            {certification.serviceTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {onUpload && (
            <Button variant="outline" size="sm" onClick={onUpload} className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          )}
          {onVerify && !certification.verified && (
            <Button size="sm" onClick={onVerify} className="flex-1">
              Submit for Verification
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
