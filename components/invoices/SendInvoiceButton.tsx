"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dialogue, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { MailIcon } from "lucide-react";

interface SendInvoiceButtonProps {
  invoiceId: string;
  clientEmail?: string;
  onSent?: () => void;
}

export function SendInvoiceButton({ invoiceId, clientEmail, onSent }: SendInvoiceButtonProps) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/invoices/${invoiceId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Invoice Sent",
          description: `Invoice successfully sent to ${clientEmail || "client"}`,
        });
        setShowDialog(false);
        if (onSent) onSent();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send invoice",
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

  return (
    <>
      <Button onClick={() => setShowDialog(true)} variant="outline">
        <MailIcon className="h-4 w-4 mr-2" />
        Send Invoice
      </Button>

      <dialogue open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invoice via Email</DialogTitle>
            <DialogDescription>
              Send invoice {invoiceId} to the client via email.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              The invoice will be sent to:{" "}
              <span className="font-semibold text-foreground">
                {clientEmail || "the client's registered email"}
              </span>
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send Invoice"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </dialogue>
    </>
  );
}
