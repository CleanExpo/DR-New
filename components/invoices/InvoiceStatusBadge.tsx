import { Badge } from "@/components/ui/badge";

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const statusConfig = {
    DRAFT: {
      variant: "secondary" as const,
      label: "Draft",
      className: "bg-gray-500 text-white hover:bg-gray-600",
    },
    SENT: {
      variant: "default" as const,
      label: "Sent",
      className: "bg-blue-500 text-white hover:bg-blue-600",
    },
    PAID: {
      variant: "certified" as const,
      label: "Paid",
      className: "bg-green-500 text-white hover:bg-green-600",
    },
    OVERDUE: {
      variant: "destructive" as const,
      label: "Overdue",
      className: "bg-red-500 text-white hover:bg-red-600",
    },
    CANCELLED: {
      variant: "outline" as const,
      label: "Cancelled",
      className: "bg-gray-800 text-gray-300 hover:bg-gray-700",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={`${config.className} ${className || ""}`}>
      {config.label}
    </Badge>
  );
}
