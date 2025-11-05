"use client";

import { useState } from "react";
import { dialogue, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils/currency";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  invoiceTotal: number;
  remainingBalance?: number;
  onPaymentRecorded: () => void;
}

type PaymentMethod = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER" | "INSURANCE";

export function PaymentModal({
  open,
  onOpenChange,
  invoiceId,
  invoiceTotal,
  remainingBalance,
  onPaymentRecorded,
}: PaymentModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultAmount = remainingBalance ?? invoiceTotal;

  const [formData, setFormData] = useState({
    amount: defaultAmount,
    paymentMethod: "" as PaymentMethod | "",
    paymentDate: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/invoices/${invoiceId}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          paymentMethod: formData.paymentMethod,
          paymentDate: formData.paymentDate,
          reference: formData.reference,
          notes: formData.notes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Payment Recorded",
          description: `Payment of ${formatCurrency(formData.amount)} recorded successfully.`,
        });
        onPaymentRecorded();
        onOpenChange(false);
        // Reset form
        setFormData({
          amount: defaultAmount,
          paymentMethod: "",
          paymentDate: new Date().toISOString().split("T")[0],
          reference: "",
          notes: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to record payment",
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

  const balance = remainingBalance ?? invoiceTotal;
  const isPartialPayment = formData.amount < balance;
  const remainingAfterPayment = balance - formData.amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Record a payment for invoice {invoiceId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount (AUD) *</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              max={balance}
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              Outstanding balance: {formatCurrency(balance)}
            </p>
            {isPartialPayment && formData.amount > 0 && (
              <p className="text-xs text-orange-600">
                Remaining balance after payment: {formatCurrency(remainingAfterPayment)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value: PaymentMethod) =>
                setFormData({ ...formData, paymentMethod: value })
              }
              required
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                <SelectItem value="INSURANCE">Insurance Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date *</Label>
            <Input
              id="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e) =>
                setFormData({ ...formData, paymentDate: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference / Transaction ID</Label>
            <Input
              id="reference"
              type="text"
              placeholder="e.g., CHQ123456 or TXN789"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Additional payment notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.paymentMethod}>
              {loading ? "Recording..." : "Record Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
