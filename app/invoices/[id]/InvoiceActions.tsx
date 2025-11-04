"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendInvoiceButton } from "@/components/invoices/SendInvoiceButton";
import { PaymentModal } from "@/components/invoices/PaymentModal";
import { RefundModal } from "@/components/invoices/RefundModal";
import { useToast } from "@/hooks/use-toast";
import { DollarSignIcon, XCircleIcon, UndoIcon } from "lucide-react";

interface InvoiceActionsProps {
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
    client: {
      email: string;
    };
  };
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
}

export function InvoiceActions({
  invoice,
  totalAmount,
  paidAmount,
  remainingBalance,
}: InvoiceActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancelInvoice = async () => {
    if (!confirm("Are you sure you want to cancel this invoice? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Invoice Cancelled",
          description: "Invoice has been cancelled successfully.",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to cancel invoice",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRecorded = () => {
    router.refresh();
  };

  const handleRefundProcessed = () => {
    router.refresh();
  };

  const handleInvoiceSent = () => {
    router.refresh();
  };

  return (
    <>
      <Card className="print:hidden">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {/* Send Invoice - for DRAFT and SENT */}
            {(invoice.status === "DRAFT" || invoice.status === "SENT") && (
              <SendInvoiceButton
                invoiceId={invoice.invoiceNumber}
                clientEmail={invoice.client.email}
                onSent={handleInvoiceSent}
              />
            )}

            {/* Record Payment - for SENT and OVERDUE */}
            {(invoice.status === "SENT" || invoice.status === "OVERDUE") &&
              remainingBalance > 0 && (
                <Button onClick={() => setShowPaymentModal(true)}>
                  <DollarSignIcon className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              )}

            {/* Process Refund - for PAID */}
            {invoice.status === "PAID" && paidAmount > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowRefundModal(true)}
              >
                <UndoIcon className="h-4 w-4 mr-2" />
                Process Refund
              </Button>
            )}

            {/* Cancel Invoice - for DRAFT and SENT */}
            {(invoice.status === "DRAFT" || invoice.status === "SENT") && (
              <Button
                variant="destructive"
                onClick={handleCancelInvoice}
                disabled={loading}
              >
                <XCircleIcon className="h-4 w-4 mr-2" />
                Cancel Invoice
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        invoiceId={invoice.invoiceNumber}
        invoiceTotal={totalAmount}
        remainingBalance={remainingBalance > 0 ? remainingBalance : undefined}
        onPaymentRecorded={handlePaymentRecorded}
      />

      <RefundModal
        open={showRefundModal}
        onOpenChange={setShowRefundModal}
        invoiceId={invoice.invoiceNumber}
        paidAmount={paidAmount}
        onRefundProcessed={handleRefundProcessed}
      />
    </>
  );
}
