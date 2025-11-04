import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type JobStatus = "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

interface JobStatusBadgeProps {
  status: JobStatus
  className?: string
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  const variants: Record<JobStatus, { color: string; label: string }> = {
    ASSIGNED: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Assigned",
    },
    IN_PROGRESS: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      label: "In Progress",
    },
    COMPLETED: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Completed",
    },
    CANCELLED: {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Cancelled",
    },
  }

  const variant = variants[status] || variants.ASSIGNED

  return (
    <Badge className={cn(variant.color, "border", className)}>
      {variant.label}
    </Badge>
  )
}
