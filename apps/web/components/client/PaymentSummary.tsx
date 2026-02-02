'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Download,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal' | 'other';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  isDefault?: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  currency?: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  description: string;
  requestId?: string;
  requestTitle?: string;
  date: string;
  invoiceUrl?: string;
  method?: PaymentMethod;
}

interface PaymentSummaryProps {
  totalSpent: number;
  pendingPayments: number;
  recentPayments: Payment[];
  currency?: string;
  onViewAllPayments?: () => void;
  onDownloadInvoice?: (paymentId: string) => void;
  onManagePaymentMethods?: () => void;
  title?: string;
  showPaymentMethods?: boolean;
  className?: string;
}

const formatCurrency = (amount: number, currency = 'AUD'): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getStatusConfig = (status: Payment['status']) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Completed',
        icon: CheckCircle,
        className: 'bg-green-100 text-green-700 border-green-200',
      };
    case 'pending':
      return {
        label: 'Pending',
        icon: Clock,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      };
    case 'failed':
      return {
        label: 'Failed',
        icon: AlertCircle,
        className: 'bg-red-100 text-red-700 border-red-200',
      };
    case 'refunded':
      return {
        label: 'Refunded',
        icon: TrendingUp,
        className: 'bg-blue-100 text-blue-700 border-blue-200',
      };
  }
};

export function PaymentSummary({
  totalSpent,
  pendingPayments,
  recentPayments,
  currency = 'AUD',
  onViewAllPayments,
  onDownloadInvoice,
  onManagePaymentMethods,
  title = 'Payment Summary',
  showPaymentMethods = false,
  className = '',
}: PaymentSummaryProps) {
  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          {onManagePaymentMethods && (
            <Button
              variant="outline"
              size="sm"
              onClick={onManagePaymentMethods}
              className="border-portal-border hover:border-semantic-contractor"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Methods
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Total Spent */}
          <div className="bg-gradient-to-br from-semantic-contractor/10 to-blue-500/10 rounded-xl p-4 border border-semantic-contractor/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-portal-muted text-sm font-medium mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalSpent, currency)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-semantic-contractor" />
              </div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-portal-muted text-sm font-medium mb-1">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(pendingPayments, currency)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Recent Payments</h4>
            {onViewAllPayments && recentPayments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAllPayments}
                className="text-semantic-contractor hover:text-semantic-contractor/80"
              >
                View All
              </Button>
            )}
          </div>

          {recentPayments.length === 0 ? (
            <div className="text-center py-12 bg-portal-hover rounded-lg">
              <CreditCard className="h-12 w-12 text-portal-muted mx-auto mb-3 opacity-50" />
              <p className="text-portal-muted text-sm">No payment history yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={payment.id}
                    className="flex items-start gap-4 p-4 bg-portal-hover rounded-lg border border-portal-border
                             hover:border-semantic-contractor/30 transition-colors group"
                  >
                    {/* Status Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig.className.split(' ')[0]}`}
                    >
                      <StatusIcon className="h-5 w-5" />
                    </div>

                    {/* Payment Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {payment.description}
                          </p>
                          {payment.requestTitle && (
                            <p className="text-xs text-portal-muted truncate">
                              {payment.requestTitle}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                          {formatCurrency(payment.amount, payment.currency || currency)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${statusConfig.className}`}
                        >
                          {statusConfig.label}
                        </Badge>
                        <span className="text-xs text-portal-muted">
                          {formatDate(payment.date)}
                        </span>
                        {payment.method && (
                          <span className="text-xs text-portal-muted">
                            {payment.method.brand} •••• {payment.method.last4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Download Invoice */}
                    {payment.invoiceUrl && onDownloadInvoice && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity
                                 hover:bg-semantic-contractor/10 hover:text-semantic-contractor"
                        onClick={() => onDownloadInvoice(payment.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
