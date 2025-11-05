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
import { AlertTriangleIcon } from "lucide-react";

interface RefundModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  paidAmount: number;
  onRefundProcessed: () => void;
}

export function RefundModal({
  open,
  onOpenChange,
  invoiceId,
  paidAmount,
  onRefundProcessed,
}: RefundModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    amount: paidAmount,
    reason: "",
    notes: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/invoices/${invoiceId}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: formData.amount,
          reason: formData.reason,
          notes: formData.notes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Refund Processed",
          description: `Refund of ${formatCurrency(formData.amount)} processed successfully.`,
        });
        onRefundProcessed();
        onOpenChange(false);
        setShowConfirmation(false);
        // Reset form
        setFormData({
          amount: paidAmount,
          reason: "",
          notes: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to process refund",
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-centre gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              Confirm Refund
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to process this refund? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-red-900 mb-2">Refund Details:</p>
              <div className="space-y-1 text-sm text-red-800">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold">{formatCurrency(formData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reason:</span>
                  <span>{formData.reason || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={loading}
            >
              Go Back
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Process Refund</DialogTitle>
          <DialogDescription>
            Process a refund for invoice {invoiceId}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refundAmount">Refund Amount (AUD) *</Label>
            <Input
              id="refundAmount"
              type="number"
              min="0.01"
              step="0.01"
              max={paidAmount}
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              Maximum refund amount: {formatCurrency(paidAmount)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Refund Reason *</Label>
            <Select
              value={formData.reason}
              onValueChange={(value) =>
                setFormData({ ...formData, reason: value })
              }
              required
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select refund reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER_REQUEST">Customer Request</SelectItem>
                <SelectItem value="OVERPAYMENT">Overpayment</SelectItem>
                <SelectItem value="SERVICE_NOT_PROVIDED">Service Not Provided</SelectItem>
                <SelectItem value="BILLING_ERROR">Billing Error</SelectItem>
                <SelectItem value="INSURANCE_ADJUSTMENT">Insurance Adjustment</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundNotes">Notes *</Label>
            <Textarea
              id="refundNotes"
              rows={4}
              placeholder="Please provide detailed notes about the reason for this refund..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              required
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
            <Button type="submit" variant="destructive" disabled={loading || !formData.reason}>
              Continue to Confirmation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
