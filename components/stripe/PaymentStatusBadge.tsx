/**
 * Payment Status Badge Component
 * Displays payment/subscription status with color coding
 */

'use client';

interface PaymentStatusBadgeProps {
  status: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  ACTIVE: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  PAST_DUE: {
    label: 'Past Due',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  SUSPENDED: {
    label: 'Suspended',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  EXPIRED: {
    label: 'Expired',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  COMPLETED: {
    label: 'Paid',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  PAID: {
    label: 'Paid',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  REFUNDED: {
    label: 'Refunded',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  PROCESSING: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  ISSUED: {
    label: 'Issued',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  OVERDUE: {
    label: 'Overdue',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  DRAFT: {
    label: 'Draft',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-centre px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
