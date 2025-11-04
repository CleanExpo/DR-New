"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceBuilder, LineItem } from "@/components/invoices/InvoiceBuilder";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon, SaveIcon, SendIcon } from "lucide-react";

export default function NewInvoicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    workOrderId: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    paymentTerms: "Net 30",
    dueDate: "",
    notes: "",
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  const handleSubmit = async (saveAsDraft: boolean) => {
    // Validation
    if (!formData.clientName || !formData.clientEmail) {
      toast({
        title: "Validation Error",
        description: "Client name and email are required",
        variant: "destructive",
      });
      return;
    }

    if (lineItems.some((item) => !item.description || item.quantity <= 0)) {
      toast({
        title: "Validation Error",
        description: "All line items must have a description and quantity greater than 0",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lineItems: lineItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          status: saveAsDraft ? "DRAFT" : "SENT",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: saveAsDraft ? "Invoice Saved" : "Invoice Created & Sent",
          description: saveAsDraft
            ? "Invoice saved as draft"
            : "Invoice created and sent to client",
        });
        router.push(`/invoices/${result.data.id}`);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create invoice",
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
    <div className="container mx-auto py-8 px-4 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/invoices">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Invoice</h1>
          <p className="text-muted-foreground">
            Create a new invoice for your client
          </p>
        </div>
      </div>

      {/* Client Details */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workOrderId">Work Order (Optional)</Label>
              <Select
                value={formData.workOrderId}
                onValueChange={(value) =>
                  setFormData({ ...formData, workOrderId: value })
                }
              >
                <SelectTrigger id="workOrderId">
                  <SelectValue placeholder="Select work order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {/* Work orders would be fetched from API */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms *</Label>
              <Select
                value={formData.paymentTerms}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentTerms: value })
                }
                required
              >
                <SelectTrigger id="paymentTerms">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="Net 7">Net 7 Days</SelectItem>
                  <SelectItem value="Net 14">Net 14 Days</SelectItem>
                  <SelectItem value="Net 30">Net 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                placeholder="John Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) =>
                  setFormData({ ...formData, clientPhone: e.target.value })
                }
                placeholder="0400 123 456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              rows={2}
              value={formData.clientAddress}
              onChange={(e) =>
                setFormData({ ...formData, clientAddress: e.target.value })
              }
              placeholder="123 Main St, Brisbane QLD 4000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <InvoiceBuilder lineItems={lineItems} onLineItemsChange={setLineItems} />

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Add any additional notes or payment instructions..."
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Link href="/invoices">
          <Button variant="outline" disabled={loading}>
            Cancel
          </Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => handleSubmit(true)}
          disabled={loading}
        >
          <SaveIcon className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        <Button onClick={() => handleSubmit(false)} disabled={loading}>
          <SendIcon className="h-4 w-4 mr-2" />
          {loading ? "Creating..." : "Create & Send"}
        </Button>
      </div>
    </div>
  );
}
