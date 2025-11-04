import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/invoices/InvoiceStatusBadge";
import { FinancialSummary } from "@/components/invoices/FinancialSummary";
import { formatCurrency, formatAustralianDate } from "@/lib/utils/currency";
import { PlusIcon, EyeIcon, Edit2Icon } from "lucide-react";
import { InvoiceFilters } from "./InvoiceFilters";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
  };
  totalAmount: number;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
  dueDate: string;
  createdAt: string;
}

async function getInvoices(searchParams: {
  status?: string;
  search?: string;
  page?: string;
}) {
  // Build query string
  const params = new URLSearchParams();
  if (searchParams.status) params.append("status", searchParams.status);
  if (searchParams.search) params.append("search", searchParams.search);
  if (searchParams.page) params.append("page", searchParams.page);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/invoices?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { invoices: [], total: 0, page: 1, totalPages: 1 };
  }

  const data = await response.json();
  return data.data || { invoices: [], total: 0, page: 1, totalPages: 1 };
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; page?: string };
}) {
  const { invoices, total, page, totalPages } = await getInvoices(searchParams);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage your invoices and payments</p>
        </div>
        <Link href="/invoices/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Financial Summary */}
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse h-32" />
            ))}
          </div>
        }
      >
        <FinancialSummary />
      </Suspense>

      {/* Filters */}
      <InvoiceFilters />

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices ({total})</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No invoices found</p>
              <Link href="/invoices/new">
                <Button variant="outline">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Your First Invoice
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice: Invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell>{invoice.client.name}</TableCell>
                        <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                        <TableCell>
                          <InvoiceStatusBadge status={invoice.status} />
                        </TableCell>
                        <TableCell>
                          {formatAustralianDate(invoice.dueDate)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatAustralianDate(invoice.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/invoices/${invoice.id}`}>
                              <Button variant="ghost" size="icon">
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                            </Link>
                            {invoice.status === "DRAFT" && (
                              <Link href={`/invoices/${invoice.id}/edit`}>
                                <Button variant="ghost" size="icon">
                                  <Edit2Icon className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/invoices?${new URLSearchParams({
                        ...searchParams,
                        page: p.toString(),
                      }).toString()}`}
                    >
                      <Button variant={p === page ? "default" : "outline"} size="sm">
                        {p}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
