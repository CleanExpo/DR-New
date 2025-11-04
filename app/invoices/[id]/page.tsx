import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge";
import { formatCurrency, formatAustralianDate, calculateGST } from "@/lib/utils/currency";
import { ArrowLeftIcon, DownloadIcon, Edit2Icon, PrinterIcon } from "lucide-react";
import { InvoiceActions } from "./InvoiceActions";

interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
  createdAt: string;
  dueDate: string;
  paymentTerms: string;
  notes?: string;
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  workOrder?: {
    id: string;
    jobNumber: string;
  };
  lineItems: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  payments?: Array<{
    id: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    reference?: string;
  }>;
}

async function getInvoice(id: string): Promise<InvoiceDetails | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/invoices/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.data;
}

async function getPayments(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/invoices/${id}/payments`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.data || [];
}

export default async function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = await getInvoice(params.id);

  if (!invoice) {
    notFound();
  }

  const payments = await getPayments(params.id);

  // Calculate totals
  const subtotal = invoice.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const gst = calculateGST(subtotal);
  const total = subtotal + gst;

  const totalPaid = payments.reduce((sum: number, p: any) => sum + p.amount, 0);
  const remainingBalance = total - totalPaid;

  return (
    <div className="container mx-auto py-8 px-4 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Link href="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{invoice.invoiceNumber}</h1>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <p className="text-muted-foreground">
              Created {formatAustralianDate(invoice.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => window.print()}>
            <PrinterIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          {invoice.status === "DRAFT" && (
            <Link href={`/invoices/${invoice.id}/edit`}>
              <Button variant="outline">
                <Edit2Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Invoice Preview */}
      <Card className="print:shadow-none">
        <CardContent className="p-8">
          {/* Business & Client Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* From */}
            <div>
              <h3 className="font-bold text-lg mb-2">Disaster Recovery</h3>
              <p className="text-sm text-muted-foreground">
                4/17 Tile St, Wacol, QLD 4076
                <br />
                Phone: 1300 309 361
                <br />
                Email: admin@disasterrecovery.com.au
                <br />
                ABN: [ABN Number]
              </p>
            </div>

            {/* To */}
            <div className="text-right">
              <h3 className="font-bold text-sm mb-1">BILL TO</h3>
              <p className="font-semibold">{invoice.client.name}</p>
              <p className="text-sm text-muted-foreground">
                {invoice.client.email}
                <br />
                {invoice.client.phone}
                <br />
                {invoice.client.address}
              </p>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Invoice Date</p>
              <p className="font-semibold">{formatAustralianDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-semibold">{formatAustralianDate(invoice.dueDate)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment Terms</p>
              <p className="font-semibold">{invoice.paymentTerms}</p>
            </div>
          </div>

          {invoice.workOrder && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">Work Order:</span>{" "}
                <Link
                  href={`/jobs/${invoice.workOrder.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {invoice.workOrder.jobNumber}
                </Link>
              </p>
            </div>
          )}

          {/* Line Items */}
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-pre-wrap">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (10%):</span>
                <span className="font-medium">{formatCurrency(gst)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total (AUD):</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {totalPaid > 0 && (
                <>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Paid:</span>
                    <span className="font-medium">-{formatCurrency(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Balance Due:</span>
                    <span
                      className={remainingBalance > 0 ? "text-red-600" : "text-green-600"}
                    >
                      {formatCurrency(remainingBalance)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-semibold mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {invoice.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      {payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatAustralianDate(payment.paymentDate)}</TableCell>
                    <TableCell className="capitalize">
                      {payment.paymentMethod.replace("_", " ").toLowerCase()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.reference || "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <InvoiceActions
        invoice={invoice}
        totalAmount={total}
        paidAmount={totalPaid}
        remainingBalance={remainingBalance}
      />
    </div>
  );
}
